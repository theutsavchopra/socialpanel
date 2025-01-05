import { Package } from '@/types';
import { useAuthStore } from '@/stores/authStore';
import { usePaymentStore } from '@/stores/paymentStore';
import PaymentMethodSelector from './PaymentMethodSelector';
import PaymentSummary from './PaymentSummary';
import CryptoPayment from './CryptoPayment';
import StripePayment from './StripePayment';
import WalletPayment from './WalletPayment';
import AuthRequiredPayment from './AuthRequiredPayment';

interface PaymentFlowProps {
  packageDetails: Package;
  orderId: string;
}

export default function PaymentFlow({ packageDetails, orderId }: PaymentFlowProps) {
  const { user } = useAuthStore();
  const { method } = usePaymentStore();

  const handlePaymentSuccess = () => {
    window.location.href = '/payment/success';
  };

  // Get current URL for return after login
  const currentUrl = window.location.href;

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
      
      {method === 'stripe' && (
        user ? (
          <StripePayment
            packageDetails={packageDetails}
            orderId={orderId}
            onSuccess={handlePaymentSuccess}
          />
        ) : (
          <AuthRequiredPayment 
            amount={packageDetails.price}
            returnUrl={currentUrl}
          />
        )
      )}
      
      {method === 'wallet' && (
        user ? (
          <WalletPayment
            packageDetails={packageDetails}
            orderId={orderId}
            onSuccess={handlePaymentSuccess}
          />
        ) : (
          <AuthRequiredPayment 
            amount={packageDetails.price}
            returnUrl={currentUrl}
          />
        )
      )}
    </div>
  );
}
