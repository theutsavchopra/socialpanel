import { useState } from 'react';
import { Package } from '@/types';
import { createPayment } from '@/lib/api/payment';
import { useToast } from '@/components/ui/use-toast';
import { Button } from '@/components/ui/button';

interface CryptoPaymentProps {
  packageDetails: Package;
  orderId: string;
  onSuccess?: () => void;
}

export default function CryptoPayment({ packageDetails, orderId, onSuccess }: CryptoPaymentProps) {
  const { toast } = useToast();
  const [isLoading, setIsLoading] = useState(false);

  const handlePayment = async () => {
    setIsLoading(true);
    try {
      const result = await createPayment({
        orderId,
        amount: packageDetails.price,
        currency: 'USD'
      });

      if (result.paymentUrl) {
        window.location.href = result.paymentUrl;
        onSuccess?.();
      } else {
        throw new Error('Invalid payment URL');
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
      className="w-full bg-red-500 hover:bg-red-600 text-lg py-6"
    >
      {isLoading ? 'Processing...' : `Pay ${packageDetails.price.toFixed(2)} USD`}
    </Button>
  );
}
