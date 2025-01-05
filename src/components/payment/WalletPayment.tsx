import { useState } from 'react';
import { Package } from '@/types';
import { createWalletPayment } from '@/lib/api/wallet';
import { useToast } from '@/components/ui/use-toast';
import { Button } from '@/components/ui/button';
import { Wallet } from 'lucide-react';

interface WalletPaymentProps {
  packageDetails: Package;
  orderId: string;
  onSuccess?: () => void;
}

export default function WalletPayment({ packageDetails, orderId, onSuccess }: WalletPaymentProps) {
  const { toast } = useToast();
  const [isLoading, setIsLoading] = useState(false);

  const handlePayment = async () => {
    setIsLoading(true);
    try {
      const result = await createWalletPayment({
        orderId,
        amount: packageDetails.price,
        currency: 'USD'
      });

      if (result.success) {
        toast({
          title: "Payment Successful",
          description: "Your payment has been processed successfully",
          variant: "success"
        });
        onSuccess?.();
      }
    } catch (error) {
      toast({
        title: "Payment Error",
        description: error instanceof Error ? error.message : "Failed to process payment",
        variant: "destructive"
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Button
      onClick={handlePayment}
      disabled={isLoading}
      className="w-full bg-green-600 hover:bg-green-700 text-lg py-6"
    >
      <Wallet className="mr-2 h-5 w-5" />
      {isLoading ? 'Processing...' : `Pay with Wallet ($${packageDetails.price.toFixed(2)})`}
    </Button>
  );
}
