import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import type { WalletTransaction } from '@/types/wallet';

interface WalletState {
  balance: number;
  transactions: WalletTransaction[];
  isLoading: boolean;
  error: string | null;
  setBalance: (balance: number) => void;
  setTransactions: (transactions: WalletTransaction[]) => void;
  setLoading: (isLoading: boolean) => void;
  setError: (error: string | null) => void;
}

export const useWalletStore = create<WalletState>()(
  persist(
    (set) => ({
      balance: 0,
      transactions: [],
      isLoading: false,
      error: null,
      setBalance: (balance) => set({ balance }),
      setTransactions: (transactions) => set({ transactions }),
      setLoading: (isLoading) => set({ isLoading }),
      setError: (error) => set({ error })
    }),
    {
      name: 'wallet-storage',
      partialize: (state) => ({
        balance: state.balance,
        transactions: state.transactions
      })
    }
  )
);
