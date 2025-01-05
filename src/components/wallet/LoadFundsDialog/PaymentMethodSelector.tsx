import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { CreditCard, Bitcoin } from 'lucide-react';

interface PaymentMethodSelectorProps {
  value: 'stripe' | 'cryptomus' | null;
  onChange: (value: 'stripe' | 'cryptomus') => void;
}

export default function PaymentMethodSelector({ value, onChange }: PaymentMethodSelectorProps) {
  return (
    <div className="space-y-4">
      <label className="block text-sm font-medium text-gray-700">
        Select Payment Method
      </label>
      <Select value={value || ''} onValueChange={onChange}>
        <SelectTrigger className="w-full">
          <SelectValue placeholder="Choose payment method" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="stripe">
            <div className="flex items-center gap-2">
              <CreditCard className="h-4 w-4" />
              <span>Credit/Debit Card</span>
            </div>
          </SelectItem>
          <SelectItem value="cryptomus">
            <div className="flex items-center gap-2">
              <Bitcoin className="h-4 w-4" />
              <span>Cryptocurrency</span>
            </div>
          </SelectItem>
        </SelectContent>
      </Select>
    </div>
  );
}
