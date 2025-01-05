import { loadEnvConfig } from '../utils/env';

const env = loadEnvConfig();

export const CRYPTOMUS_CONFIG = {
  MERCHANT_ID: env.CRYPTOMUS_MERCHANT_ID,
  PAYMENT_KEY: env.CRYPTOMUS_PAYMENT_KEY,
  API: {
    BASE_URL: 'https://api.cryptomus.com/v1',
    ENDPOINTS: {
      PAYMENT: '/payment',
      PAYMENT_STATUS: '/payment/info'
    }
  }
} as const;
