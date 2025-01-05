import { Package } from '@/types/index';
import { formatPrice } from '@/lib/utils';

interface PaymentSummaryProps {
  packageDetails: Package;
}

export default function PaymentSummary({ packageDetails }: PaymentSummaryProps) {
  const originalPrice = packageDetails.discount 
    ? packageDetails.price / (1 - packageDetails.discount / 100) 
    : packageDetails.price;

  return (
    <div className="rounded-lg bg-gray-50 p-6">
      <h3 className="font-outfit text-lg font-semibold mb-4">Order Summary</h3>
      
      <div className="space-y-3">
        <div className="flex justify-between">
          <span className="text-gray-600">Package</span>
          <span className="font-medium">{packageDetails.name}</span>
        </div>
        
        <div className="flex justify-between">
          <span className="text-gray-600">Views</span>
          <span className="font-medium">{packageDetails.viewCount.toLocaleString()}</span>
        </div>

        {packageDetails.discount && (
          <div className="flex justify-between text-green-600">
            <span>Discount</span>
            <span>{packageDetails.discount}% OFF</span>
          </div>
        )}

        {packageDetails.discount && (
          <div className="flex justify-between text-gray-500">
            <span>Original Price</span>
            <span className="line-through">{formatPrice(originalPrice)}</span>
          </div>
        )}

        <div className="pt-3 border-t">
          <div className="flex justify-between text-lg font-semibold">
            <span>Total</span>
            <span className="text-red-500">{formatPrice(packageDetails.price)}</span>
          </div>
        </div>
      </div>
    </div>
  );
}
