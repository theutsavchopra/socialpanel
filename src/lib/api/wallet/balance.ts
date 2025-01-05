import axios from 'axios';

export async function getWalletBalance() {
  const response = await axios.get('/api/wallet/balance');
  return response.data.balance;
}
