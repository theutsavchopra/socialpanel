import { useEffect } from 'react';
import { useAuthStore } from '@/stores/authStore';
import { useWalletStore } from '@/stores/walletStore';
import { getWalletBalance, getTransactions } from '@/lib/api/wallet';
import { useToast } from '@/components/ui/use-toast';

export function useWalletData() {
  const { user } = useAuthStore();
  const { setBalance, setTransactions, setLoading, setError } = useWalletStore();
  const { toast } = useToast();

  useEffect(() => {
    async function loadData() {
      if (!user) return;
      
      setLoading(true);
      setError(null);
      try {
        const [balance, transactions] = await Promise.all([
          getWalletBalance(),
          getTransactions()
        ]);
        
        setBalance(balance);
        setTransactions(transactions);
      } catch (error) {
        const message = error instanceof Error ? error.message : 'Failed to load wallet data';
        setError(message);
        toast({
          title: 'Error',
          description: message,
          variant: 'destructive'
        });
      } finally {
        setLoading(false);
      }
    }

    loadData();
  }, [user, setBalance, setTransactions, setLoading, setError, toast]);
}
