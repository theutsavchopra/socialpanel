import { useWalletStore } from '@/stores/walletStore';
import { useWalletData } from '@/hooks/useWalletData';
import WalletCard from '@/components/wallet/WalletCard';
import TransactionList from '@/components/wallet/TransactionList';
import WalletSkeleton from './WalletSkeleton';

export default function WalletPage() {
  const { isLoading } = useWalletStore();
  useWalletData();

  if (isLoading) {
    return <WalletSkeleton />;
  }

  return (
    <div className="container py-8 max-w-4xl">
      <h1 className="text-3xl font-bold mb-8">My Wallet</h1>
      <div className="space-y-8">
        <WalletCard />
        <div>
          <h2 className="text-xl font-semibold mb-4">Transaction History</h2>
          <TransactionList />
        </div>
      </div>
    </div>
  );
}
