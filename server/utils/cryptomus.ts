import crypto from 'crypto';
import { CRYPTOMUS_CONFIG } from '../config/cryptomus';

export function generateSignature(payload: Record<string, any>): string {
  const payloadString = JSON.stringify(payload);
  const base64Payload = Buffer.from(payloadString).toString('base64');
  return crypto
    .createHmac('sha256', CRYPTOMUS_CONFIG.PAYMENT_KEY)
    .update(base64Payload)
    .digest('hex');
}
