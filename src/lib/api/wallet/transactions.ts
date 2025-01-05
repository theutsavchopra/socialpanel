import axios from 'axios';
import type { WalletTransaction } from '@/types/wallet';

export async function getTransactions() {
  const response = await axios.get('/api/wallet/transactions');
  return response.data as WalletTransaction[];
}
