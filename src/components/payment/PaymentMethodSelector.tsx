import { usePaymentStore } from '@/stores/paymentStore';
import { useAuthStore } from '@/stores/authStore';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { CreditCard, Wallet, Bitcoin } from 'lucide-react';

export default function PaymentMethodSelector() {
  const { method, setMethod } = usePaymentStore();
  const { user } = useAuthStore();

  return (
    <div className="space-y-4">
      <label className="block text-sm font-medium text-gray-700 mb-1">
        Select Payment Method
      </label>
      <Select
        value={method || ''}
        onValueChange={setMethod}
      >
        <SelectTrigger className="w-full">
          <SelectValue placeholder="Choose payment method" />
        </SelectTrigger>
        <SelectContent>
          {user ? (
            <>
              <SelectItem value="stripe">
                <div className="flex items-center gap-2">
                  <CreditCard className="h-5 w-5" />
                  <span>Credit/Debit Card</span>
                </div>
              </SelectItem>
              <SelectItem value="wallet">
                <div className="flex items-center gap-2">
                  <Wallet className="h-5 w-5" />
                  <span>Pay with Wallet</span>
                </div>
              </SelectItem>
            </>
          ) : (
            <SelectItem value="cryptomus">
              <div className="flex items-center gap-2">
                <Bitcoin className="h-5 w-5" />
                <span>Pay with Crypto</span>
              </div>
            </SelectItem>
          )}
        </SelectContent>
      </Select>
      
      {method === 'stripe' && (
        <p className="text-sm text-gray-500">
          Secure payment via credit/debit card
        </p>
      )}
      {method === 'wallet' && (
        <p className="text-sm text-gray-500">
          Pay using your account balance
        </p>
      )}
      {method === 'cryptomus' && (
        <p className="text-sm text-gray-500">
          Supports Bitcoin, Ethereum, USDT, and 100+ other cryptocurrencies
        </p>
      )}
    </div>
  );
}
