import { Input } from '@/components/ui/input';

interface AmountInputProps {
  value: string;
  onChange: (value: string) => void;
}

export default function AmountInput({ value, onChange }: AmountInputProps) {
  return (
    <div className="space-y-2">
      <label className="text-sm font-medium">Amount (USD)</label>
      <Input
        type="number"
        min="50"
        step="10"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder="Minimum $50"
      />
      <p className="text-xs text-gray-500">Minimum amount: $50</p>
    </div>
  );
}
