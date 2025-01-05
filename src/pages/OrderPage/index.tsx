import { useSearchParams } from 'react-router-dom';
import { Youtube } from 'lucide-react';
import OrderForm from './components/OrderForm';
import PaymentFlow from './components/PaymentFlow';
import PaymentMethods from './components/PaymentMethods';
import SecurityBadges from './components/SecurityBadges';
import { usePackageDetails } from '@/hooks/usePackageDetails';
import { useState } from 'react';
import type { OrderFormValues } from '@/lib/validations/order';

export default function OrderPage() {
  const [searchParams] = useSearchParams();
  const packageId = searchParams.get('package');
  const packageDetails = usePackageDetails(packageId);
  const [orderId, setOrderId] = useState<string | null>(null);

  if (!packageDetails) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-900 mb-2">Package Not Found</h1>
          <p className="text-gray-600">Please select a package from our packages page.</p>
        </div>
      </div>
    );
  }

  const handleSubmit = (data: OrderFormValues) => {
    // In production, this would create an order in your backend
    const newOrderId = `ORD-${Math.random().toString(36).substr(2, 9)}`;
    setOrderId(newOrderId);
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 via-white to-gray-50 py-12">
      {/* Background decorative elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-1/4 left-0 w-[500px] h-[500px] bg-red-100/40 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob"></div>
        <div className="absolute top-1/4 right-0 w-[500px] h-[500px] bg-orange-100/40 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob animation-delay-2000"></div>
      </div>

      <div className="relative container max-w-4xl mx-auto px-4">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="font-outfit text-3xl font-bold text-gray-900 mb-2">
            {orderId ? 'Complete Payment' : 'Checkout'}
          </h1>
          <p className="text-gray-600">
            {orderId 
              ? 'Choose your preferred payment method to complete your order'
              : 'Complete your order to start growing your YouTube channel'}
          </p>
        </div>

        {/* Main content */}
        <div className="bg-white/80 backdrop-blur-sm rounded-2xl border border-gray-100 shadow-xl p-8">
          {/* Package summary */}
          <div className="flex items-center justify-center gap-3 p-4 mb-8 rounded-lg bg-gray-50">
            <Youtube className="h-6 w-6 text-red-500" />
            <span className="font-medium text-gray-900">
              {packageDetails.viewCount.toLocaleString()} {packageDetails.name}
            </span>
            <span className="text-gray-400">|</span>
            <span className="font-medium text-red-500">${packageDetails.price.toFixed(2)}</span>
          </div>

          {/* Payment methods */}
          {!orderId && <PaymentMethods />}

          {/* Order form or Payment flow */}
          {orderId ? (
            <PaymentFlow packageDetails={packageDetails} orderId={orderId} />
          ) : (
            <OrderForm onSubmit={handleSubmit} price={packageDetails.price} />
          )}

          {/* Security badges */}
          <div className="mt-8">
            <SecurityBadges />
          </div>
        </div>
      </div>
    </div>
  );
}
