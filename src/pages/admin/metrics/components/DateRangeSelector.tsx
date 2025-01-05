import { useState } from 'react';
import { Calendar } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { Calendar as CalendarComponent } from '@/components/ui/calendar';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

interface DateRangeSelectorProps {
  value: string;
  onChange: (range: 'this_month' | 'last_month' | 'this_week' | 'last_week' | 'custom') => void;
  onCustomRange: (range: { from: Date; to: Date } | null) => void;
}

const ranges = [
  { value: 'this_month', label: 'This Month' },
  { value: 'last_month', label: 'Last Month' },
  { value: 'this_week', label: 'This Week' },
  { value: 'last_week', label: 'Last Week' }
];

export default function DateRangeSelector({ value, onChange, onCustomRange }: DateRangeSelectorProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [date, setDate] = useState<Date | undefined>(new Date());

  const handleSelect = (range: string) => {
    if (range === 'custom') {
      setIsOpen(true);
    } else {
      onChange(range as 'this_month' | 'last_month' | 'this_week' | 'last_week');
      onCustomRange(null);
    }
  };

  const handleDateSelect = (date: Date | undefined) => {
    if (date) {
      setDate(date);
      onChange('custom');
      onCustomRange({ from: date, to: new Date() });
      setIsOpen(false);
    }
  };

  return (
    <div className="flex items-center gap-2">
      <Select value={value} onValueChange={handleSelect}>
        <SelectTrigger className="w-[180px]">
          <SelectValue placeholder="Select date range" />
        </SelectTrigger>
        <SelectContent>
          {ranges.map(range => (
            <SelectItem key={range.value} value={range.value}>
              {range.label}
            </SelectItem>
          ))}
          <SelectItem value="custom">Custom Range</SelectItem>
        </SelectContent>
      </Select>

      <Popover open={isOpen} onOpenChange={setIsOpen}>
        <PopoverTrigger asChild>
          <Button
            variant="outline"
            size="icon"
            className={value === 'custom' ? 'border-red-500 text-red-500' : ''}
          >
            <Calendar className="h-4 w-4" />
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-auto p-0" align="end">
          <CalendarComponent
            mode="single"
            selected={date}
            onSelect={handleDateSelect}
            initialFocus
          />
        </PopoverContent>
      </Popover>
    </div>
  );
}
