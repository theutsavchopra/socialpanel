import { useState, useEffect } from 'react';
import { Package } from '@/types';
import { createPayment, getPaymentStatus } from '@/lib/api/cryptomus/payment';
import { PaymentStatus } from '@/lib/api/cryptomus/types';
import { Button } from '@/components/ui/button';
import { useToast } from '@/components/ui/use-toast';
import { CRYPTOMUS_CONFIG } from '@/config/cryptomus';

interface CryptoPaymentFlowProps {
  packageDetails: Package;
  orderId: string;
  onSuccess: () => void;
}

export default function CryptoPaymentFlow({ packageDetails, orderId, onSuccess }: CryptoPaymentFlowProps) {
  const { toast } = useToast();
  const [isLoading, setIsLoading] = useState(false);
  const [paymentId, setPaymentId] = useState<string>();
  const [status, setStatus] = useState<PaymentStatus>();
  const [walletAddress, setWalletAddress] = useState<string>();

  useEffect(() => {
    let intervalId: number;

    if (paymentId) {
      intervalId = window.setInterval(async () => {
        try {
          const status = await getPaymentStatus(paymentId);
          setStatus(status);

          if (status === 'completed') {
            onSuccess();
            clearInterval(intervalId);
          } else if (status === 'expired') {
            toast({
              title: "Payment Expired",
              description: "The payment session has expired. Please try again.",
              variant: "destructive"
            });
            clearInterval(intervalId);
          }
        } catch (error) {
          console.error('Payment status check failed:', error);
        }
      }, 10000);
    }

    return () => {
      if (intervalId) clearInterval(intervalId);
    };
  }, [paymentId, onSuccess, toast]);

  const handlePayment = async () => {
    setIsLoading(true);
    try {
      const result = await createPayment({
        orderId,
        amount: packageDetails.price,
        currency: CRYPTOMUS_CONFIG.PAYMENT.CURRENCIES.USDT
      });

      setPaymentId(result.paymentId);
      setWalletAddress(result.walletAddress);
      setStatus(result.status);
    } catch (error) {
      toast({
        title: "Payment Error",
        description: error instanceof Error ? error.message : "Failed to create payment",
        variant: "destructive"
      });
    } finally {
      setIsLoading(false);
    }
  };

  if (status === 'pending' && walletAddress) {
    return (
      <div className="space-y-4">
        <div className="p-6 bg-gray-50 rounded-lg border border-gray-200">
          <h3 className="font-medium text-lg mb-4">Send payment to this address:</h3>
          <div className="bg-white p-4 rounded-lg border border-gray-200 break-all font-mono">
            {walletAddress}
          </div>
          <div className="mt-4 text-sm text-gray-600">
            <p>• Payment will be confirmed automatically</p>
            <p>• Do not close this window until payment is confirmed</p>
            <p>• Payment expires in {CRYPTOMUS_CONFIG.PAYMENT.LIFETIME / 3600} hours</p>
          </div>
        </div>
      </div>
    );
  }

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
