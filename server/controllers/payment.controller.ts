import { Request, Response } from 'express';
import { PaymentService } from '../services/payment.service';
import { validateCreatePayment } from '../validators/payment';

export class PaymentController {
  private paymentService = PaymentService.getInstance();

  async createPayment(req: Request, res: Response) {
    try {
      const validation = validateCreatePayment(req.body);
      if (!validation.success) {
        return res.status(400).json({ 
          error: 'Invalid request data',
          details: validation.error.issues 
        });
      }

      const { orderId, amount, currency } = validation.data;
      
      const result = await this.paymentService.createPayment({
        orderId,
        amount,
        currency,
        callbackUrl: `${req.protocol}://${req.get('host')}/api/payment/webhook`,
        returnUrl: `${req.protocol}://${req.get('host')}/payment/success`
      });

      return res.json({
        paymentId: result.uuid,
        paymentUrl: result.url,
        amount: result.amount,
        currency: result.currency
      });
    } catch (error) {
      console.error('Payment creation failed:', error);
      return res.status(500).json({ 
        error: 'Failed to create payment' 
      });
    }
  }

  async handleWebhook(req: Request, res: Response) {
    try {
      const { payment_status, order_id, uuid } = req.body;
      
      // Verify webhook signature
      const signature = req.headers['sign'];
      if (!signature || typeof signature !== 'string') {
        return res.status(401).json({ error: 'Invalid signature' });
      }

      // TODO: Update order status in database
      console.log(`Payment ${uuid} for order ${order_id} status: ${payment_status}`);

      return res.json({ status: 'ok' });
    } catch (error) {
      console.error('Webhook processing failed:', error);
      return res.status(500).json({ 
        error: 'Failed to process webhook' 
      });
    }
  }
}
