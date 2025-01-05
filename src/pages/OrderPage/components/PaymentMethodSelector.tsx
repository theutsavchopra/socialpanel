import { usePaymentStore } from '@/stores/paymentStore';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

export default function PaymentMethodSelector() {
  const { method, setMethod } = usePaymentStore();

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
          <SelectItem value="cryptomus">
            <div className="flex items-center gap-2">
              <img src="/payment-icons/crypto.svg" alt="Cryptomus" className="h-5 w-5" />
              <span>Pay with Crypto</span>
            </div>
          </SelectItem>
        </SelectContent>
      </Select>
      {method === 'cryptomus' && (
        <p className="text-sm text-gray-500">
          Supports Bitcoin, Ethereum, USDT, and 100+ other cryptocurrencies
        </p>
      )}
    </div>
  );
}
