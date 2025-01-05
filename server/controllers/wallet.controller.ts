import { Request, Response } from 'express';
import { WalletService } from '../services/wallet.service';
import { validateLoadFunds } from '../validators/wallet';
import { createStripeSession } from '../services/stripe.service';
import { createCryptomusPayment } from '../services/cryptomus.service';

export class WalletController {
  private walletService = WalletService.getInstance();

  async getBalance(req: Request, res: Response) {
    try {
      const userId = req.user!.id;
      const balance = await this.walletService.getBalance(userId);
      return res.json({ balance });
    } catch (error) {
      console.error('Failed to get balance:', error);
      return res.status(500).json({ error: 'Failed to get balance' });
    }
  }

  async getTransactions(req: Request, res: Response) {
    try {
      const userId = req.user!.id;
      const transactions = await this.walletService.getTransactions(userId);
      return res.json(transactions);
    } catch (error) {
      console.error('Failed to get transactions:', error);
      return res.status(500).json({ error: 'Failed to get transactions' });
    }
  }

  async loadFunds(req: Request, res: Response) {
    try {
      const validation = validateLoadFunds(req.body);
      if (!validation.success) {
        return res.status(400).json({ 
          error: 'Invalid request data',
          details: validation.error.issues 
        });
      }

      const { amount, paymentMethod } = validation.data;
      const userId = req.user!.id;

      // Create pending transaction
      const transaction = await this.walletService.createTransaction({
        userId,
        type: 'deposit',
        amount,
        paymentMethod
      });

      // Generate payment URL based on method
      let redirectUrl: string;
      if (paymentMethod === 'stripe') {
        const session = await createStripeSession({
          transactionId: transaction.id,
          amount,
          currency: 'USD'
        });
        redirectUrl = session.url;
      } else {
        const payment = await createCryptomusPayment({
          transactionId: transaction.id,
          amount,
          currency: 'USD'
        });
        redirectUrl = payment.url;
      }

      return res.json({ transactionId: transaction.id, redirectUrl });
    } catch (error) {
      console.error('Failed to load funds:', error);
      return res.status(500).json({ error: 'Failed to process request' });
    }
  }

  async processPayment(req: Request, res: Response) {
    try {
      const { orderId, amount } = req.body;
      const userId = req.user!.id;

      const result = await this.walletService.processPayment(userId, orderId, amount);
      return res.json(result);
    } catch (error) {
      console.error('Payment processing failed:', error);
      return res.status(500).json({ error: 'Payment processing failed' });
    }
  }
}
