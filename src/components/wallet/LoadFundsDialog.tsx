import { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { useToast } from '@/components/ui/use-toast';
import { loadFunds } from '@/lib/api/wallet';
import PaymentMethodSelector from './LoadFundsDialog/PaymentMethodSelector';
import AmountInput from './LoadFundsDialog/AmountInput';

interface LoadFundsDialogProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function LoadFundsDialog({ isOpen, onClose }: LoadFundsDialogProps) {
  const { toast } = useToast();
  const [amount, setAmount] = useState('50');
  const [isLoading, setIsLoading] = useState(false);
  const [selectedMethod, setSelectedMethod] = useState<'stripe' | 'cryptomus' | null>(null);

  const handleLoadFunds = async () => {
    if (!selectedMethod) {
      toast({
        title: "Error",
        description: "Please select a payment method",
        variant: "destructive"
      });
      return;
    }

    const numAmount = parseFloat(amount);
    if (isNaN(numAmount) || numAmount < 50) {
      toast({
        title: "Invalid Amount",
        description: "Minimum amount to load is $50",
        variant: "destructive"
      });
      return;
    }

    setIsLoading(true);
    try {
      const result = await loadFunds({
        amount: numAmount,
        paymentMethod: selectedMethod
      });

      if (result.redirectUrl) {
        window.location.href = result.redirectUrl;
      }
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to process request",
        variant: "destructive"
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Load Funds to Wallet</DialogTitle>
        </DialogHeader>

        <div className="grid gap-6 py-4">
          <AmountInput value={amount} onChange={setAmount} />
          <PaymentMethodSelector />

          <Button 
            onClick={handleLoadFunds} 
            disabled={isLoading || !selectedMethod}
            className="w-full"
          >
            {isLoading ? 'Processing...' : 'Continue to Payment'}
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
