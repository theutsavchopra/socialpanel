interface EnvConfig {
  CRYPTOMUS_MERCHANT_ID: string;
  CRYPTOMUS_PAYMENT_KEY: string;
}

export function loadEnvConfig(): EnvConfig {
  return {
    CRYPTOMUS_MERCHANT_ID: import.meta.env.VITE_CRYPTOMUS_MERCHANT_ID ?? '',
    CRYPTOMUS_PAYMENT_KEY: import.meta.env.VITE_CRYPTOMUS_PAYMENT_KEY ?? ''
  };
}
