import { CRYPTOMUS_CONFIG } from '@/config/cryptomus';

export const API_CONFIG = {
  baseURL: CRYPTOMUS_CONFIG.API.BASE_URL,
  headers: {
    'Content-Type': 'application/json',
    'Accept': 'application/json'
  },
  timeout: 10000
};
