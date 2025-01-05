export interface WalletTransaction {
  id: string;
  userId: string;
  type: 'deposit' | 'withdrawal' | 'payment';
  amount: number;
  status: 'pending' | 'completed' | 'failed';
  paymentMethod?: 'stripe' | 'cryptomus';
  createdAt: string;
  updatedAt: string;
}

export interface Wallet {
  id: string;
  userId: string;
  balance: number;
  createdAt: string;
  updatedAt: string;
}

export interface LoadFundsData {
  amount: number;
  paymentMethod: 'stripe' | 'cryptomus';
}
