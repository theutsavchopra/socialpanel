import { config } from 'dotenv';

config();

export function loadEnvConfig() {
  const required = [
    'CRYPTOMUS_MERCHANT_ID',
    'CRYPTOMUS_PAYMENT_KEY'
  ];

  for (const key of required) {
    if (!process.env[key]) {
      throw new Error(`Missing required environment variable: ${key}`);
    }
  }

  return {
    CRYPTOMUS_MERCHANT_ID: process.env.CRYPTOMUS_MERCHANT_ID!,
    CRYPTOMUS_PAYMENT_KEY: process.env.CRYPTOMUS_PAYMENT_KEY!,
    NODE_ENV: process.env.NODE_ENV || 'development',
    PORT: parseInt(process.env.PORT || '3000', 10)
  };
}
