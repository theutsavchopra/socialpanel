import { Package } from '@/types';
import { usePaymentStore } from '@/stores/paymentStore';
import PaymentMethodSelector from './PaymentMethodSelector';
import PaymentSummary from './PaymentSummary';
import CryptoPayment from '@/components/payment/CryptoPayment';

interface PaymentFlowProps {
  packageDetails: Package;
  orderId: string;
}

export default function PaymentFlow({ packageDetails, orderId }: PaymentFlowProps) {
  const { method } = usePaymentStore();

  const handlePaymentSuccess = () => {
    window.location.href = '/payment/success';
  };

  return (
    <div className="space-y-6">
      <PaymentSummary packageDetails={packageDetails} />
      <PaymentMethodSelector />
      
      {method === 'cryptomus' && (
        <CryptoPayment
          packageDetails={packageDetails}
          orderId={orderId}
          onSuccess={handlePaymentSuccess}
        />
      )}
    </div>
  );
}
