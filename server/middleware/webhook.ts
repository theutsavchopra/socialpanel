import { Request, Response, NextFunction } from 'express';
import { generateCryptomusSignature } from '../utils/cryptomus';
import Stripe from 'stripe';

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!);

export function validateStripeSignature(req: Request, res: Response, next: NextFunction) {
  const signature = req.headers['stripe-signature'];

  try {
    stripe.webhooks.constructEvent(
      req.body,
      signature as string,
      process.env.STRIPE_WEBHOOK_SECRET!
    );
    next();
  } catch (error) {
    console.error('Stripe signature verification failed:', error);
    res.status(400).json({ error: 'Invalid signature' });
  }
}

export function validateCryptomusSignature(req: Request, res: Response, next: NextFunction) {
  const signature = req.headers['sign'];
  const payload = req.body;

  try {
    const calculatedSignature = generateCryptomusSignature(payload);
    if (signature !== calculatedSignature) {
      throw new Error('Invalid signature');
    }
    next();
  } catch (error) {
    console.error('Cryptomus signature verification failed:', error);
    res.status(400).json({ error: 'Invalid signature' });
  }
}
