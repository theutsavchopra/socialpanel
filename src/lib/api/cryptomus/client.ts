import axios from 'axios';
import { CRYPTOMUS_CONFIG } from '@/config/cryptomus';
import { generateSignature } from './utils';

export const cryptomusClient = axios.create({
  baseURL: CRYPTOMUS_CONFIG.API.BASE_URL,
  timeout: CRYPTOMUS_CONFIG.API.TIMEOUT,
  headers: {
    'Content-Type': 'application/json',
    'Accept': 'application/json'
  }
});

// Add request interceptor to sign all requests
cryptomusClient.interceptors.request.use((config) => {
  const payload = config.data || {};
  config.headers['merchant'] = CRYPTOMUS_CONFIG.MERCHANT_ID;
  config.headers['sign'] = generateSignature(payload);
  return config;
});
