import axios from 'axios';
import type { LoadFundsData } from '@/types/wallet';

export async function loadFunds(data: LoadFundsData) {
  const response = await axios.post('/api/wallet/load', data);
  return response.data;
}

export async function processWalletPayment(orderId: string, amount: number) {
  const response = await axios.post('/api/wallet/pay', { orderId, amount });
  return response.data;
}
