import { useState } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { useWalletStore } from '@/stores/walletStore';
import { Wallet as WalletIcon, Plus } from 'lucide-react';
import { formatPrice } from '@/lib/utils';
import LoadFundsDialog from './LoadFundsDialog';

export default function WalletCard() {
  const { balance, isLoading } = useWalletStore();
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  return (
    <>
      <Card className="p-6">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="p-2 rounded-lg bg-green-50">
              <WalletIcon className="h-6 w-6 text-green-600" />
            </div>
            <div>
              <h3 className="font-medium text-gray-900">Wallet Balance</h3>
              <p className="text-2xl font-semibold text-green-600">
                {isLoading ? '...' : formatPrice(balance)}
              </p>
            </div>
          </div>
          <Button onClick={() => setIsDialogOpen(true)}>
            <Plus className="h-4 w-4 mr-2" />
            Load Funds
          </Button>
        </div>
      </Card>

      <LoadFundsDialog 
        isOpen={isDialogOpen}
        onClose={() => setIsDialogOpen(false)}
      />
    </>
  );
}
