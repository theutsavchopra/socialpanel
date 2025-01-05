import { supabase } from '@/lib/supabase/client';
import { useAuthStore } from '@/stores/authStore';
import type { WalletTransaction } from '@/types/wallet';

export async function getWalletBalance() {
  const user = useAuthStore.getState().user;
  if (!user) throw new Error('User not authenticated');

  const { data: wallet, error } = await supabase
    .from('wallets')
    .select('balance')
    .eq('user_id', user.id)
    .single();

  if (error) throw error;
  return wallet?.balance || 0;
}

export async function getTransactions() {
  const user = useAuthStore.getState().user;
  if (!user) throw new Error('User not authenticated');

  const { data: wallet } = await supabase
    .from('wallets')
    .select('id')
    .eq('user_id', user.id)
    .single();

  if (!wallet) {
    // Create wallet if it doesn't exist
    const { data: newWallet, error: createError } = await supabase
      .from('wallets')
      .insert([{ user_id: user.id, balance: 0 }])
      .select()
      .single();

    if (createError) throw createError;
    return [];
  }

  const { data: transactions, error } = await supabase
    .from('wallet_transactions')
    .select('*')
    .eq('wallet_id', wallet.id)
    .order('created_at', { ascending: false });

  if (error) throw error;
  return transactions as WalletTransaction[];
}

export async function createTransaction(data: {
  type: 'deposit' | 'withdrawal' | 'payment';
  amount: number;
  paymentMethod?: 'stripe' | 'cryptomus';
}) {
  const user = useAuthStore.getState().user;
  if (!user) throw new Error('User not authenticated');

  const { data: wallet } = await supabase
    .from('wallets')
    .select('id')
    .eq('user_id', user.id)
    .single();

  if (!wallet) throw new Error('Wallet not found');

  const { data: transaction, error } = await supabase
    .from('wallet_transactions')
    .insert([{
      wallet_id: wallet.id,
      type: data.type,
      amount: data.amount,
      payment_method: data.paymentMethod,
      status: 'pending'
    }])
    .select()
    .single();

  if (error) throw error;
  return transaction;
}
