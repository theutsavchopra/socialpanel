import { useState } from 'react';
import { Package } from '@/types';
import { createStripeSession } from '@/lib/api/stripe';
import { useToast } from '@/components/ui/use-toast';
import { Button } from '@/components/ui/button';
import { CreditCard } from 'lucide-react';

interface StripePaymentProps {
  packageDetails: Package;
  orderId: string;
  onSuccess?: () => void;
}

export default function StripePayment({ packageDetails, orderId, onSuccess }: StripePaymentProps) {
  const { toast } = useToast();
  const [isLoading, setIsLoading] = useState(false);

  const handlePayment = async () => {
    setIsLoading(true);
    try {
      const result = await createStripeSession({
        orderId,
        amount: packageDetails.price,
        currency: 'USD'
      });

      if (result.sessionUrl) {
        window.location.href = result.sessionUrl;
        onSuccess?.();
      } else {
        throw new Error('Invalid session URL');
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
      className="w-full bg-blue-600 hover:bg-blue-700 text-lg py-6"
    >
      <CreditCard className="mr-2 h-5 w-5" />
      {isLoading ? 'Processing...' : `Pay ${packageDetails.price.toFixed(2)} USD`}
    </Button>
  );
}
