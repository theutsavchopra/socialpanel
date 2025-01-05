import { Request, Response } from 'express';
import { WalletService } from '../services/wallet.service';
import { WebhookService } from '../services/webhook.service';

export class WebhookController {
  private walletService = WalletService.getInstance();
  private webhookService = WebhookService.getInstance();

  async handleStripeWebhook(req: Request, res: Response) {
    try {
      const event = req.body;

      if (event.type === 'payment_intent.succeeded') {
        const transactionId = event.data.object.metadata.transactionId;
        await this.walletService.completeDeposit(transactionId);
        await this.webhookService.logWebhook('stripe', event);
      }

      return res.json({ received: true });
    } catch (error) {
      console.error('Stripe webhook error:', error);
      return res.status(400).json({ error: 'Webhook handler failed' });
    }
  }

  async handleCryptomusWebhook(req: Request, res: Response) {
    try {
      const { payment_status, order_id } = req.body;

      if (payment_status === 'paid') {
        await this.walletService.completeDeposit(order_id);
        await this.webhookService.logWebhook('cryptomus', req.body);
      }

      return res.json({ status: 'ok' });
    } catch (error) {
      console.error('Cryptomus webhook error:', error);
      return res.status(400).json({ error: 'Webhook handler failed' });
    }
  }
}
