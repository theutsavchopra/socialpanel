import { enc, HmacSHA256 } from 'crypto-js';
import { CRYPTOMUS_CONFIG } from '@/config/cryptomus';

export function generateSignature(payload: Record<string, any>): string {
  const payloadString = JSON.stringify(payload);
  const base64Payload = enc.Base64.stringify(
    enc.Utf8.parse(payloadString)
  );
  return HmacSHA256(base64Payload, CRYPTOMUS_CONFIG.PAYMENT_KEY).toString();
}
