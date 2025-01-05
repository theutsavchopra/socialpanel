export const CRYPTOMUS_CONFIG = {
  API: {
    BASE_URL: 'https://api.cryptomus.com/v1',
    TIMEOUT: 10000,
    ENDPOINTS: {
      PAYMENT: '/payment'
    }
  },
  PAYMENT: {
    LIFETIME: 7200, // 2 hours
    DEFAULT_CURRENCY: 'USDT',
    CURRENCIES: {
      BTC: 'BTC',
      ETH: 'ETH',
      USDT: 'USDT',
      USD: 'USD'
    } as const
  }
} as const;
