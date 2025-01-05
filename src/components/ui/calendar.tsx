import * as React from "react"
import { ChevronLeft, ChevronRight } from "lucide-react"
import { cn } from "@/lib/utils"
import { buttonVariants } from "@/components/ui/button"

export type CalendarProps = React.HTMLAttributes<HTMLDivElement> & {
  mode?: 'single' | 'range' | 'multiple';
  selected?: Date | Date[] | { from: Date; to: Date };
  onSelect?: (date: Date | undefined) => void;
  disabled?: { from: Date; to: Date } | Date[];
  initialFocus?: boolean;
}

function Calendar({
  className,
  mode = 'single',
  selected,
  onSelect,
  disabled,
  initialFocus,
  ...props
}: CalendarProps) {
  const [currentMonth, setCurrentMonth] = React.useState(new Date());

  const daysInMonth = new Date(
    currentMonth.getFullYear(),
    currentMonth.getMonth() + 1,
    0
  ).getDate();

  const firstDayOfMonth = new Date(
    currentMonth.getFullYear(),
    currentMonth.getMonth(),
    1
  ).getDay();

  const handlePreviousMonth = () => {
    setCurrentMonth(prev => new Date(prev.getFullYear(), prev.getMonth() - 1));
  };

  const handleNextMonth = () => {
    setCurrentMonth(prev => new Date(prev.getFullYear(), prev.getMonth() + 1));
  };

  const isSelected = (date: Date) => {
    if (!selected) return false;
    if (selected instanceof Date) {
      return date.toDateString() === selected.toDateString();
    }
    return false;
  };

  const isDisabled = (date: Date) => {
    if (!disabled) return false;
    if (Array.isArray(disabled)) {
      return disabled.some(d => d.toDateString() === date.toDateString());
    }
    return date >= disabled.from && date <= disabled.to;
  };

  return (
    <div className={cn("p-3", className)} {...props}>
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <button
            onClick={handlePreviousMonth}
            className={cn(
              buttonVariants({ variant: "outline" }),
              "h-7 w-7 bg-transparent p-0 opacity-50 hover:opacity-100"
            )}
          >
            <ChevronLeft className="h-4 w-4" />
          </button>
          <div className="font-medium">
            {currentMonth.toLocaleString('default', { 
              month: 'long', 
              year: 'numeric' 
            })}
          </div>
          <button
            onClick={handleNextMonth}
            className={cn(
              buttonVariants({ variant: "outline" }),
              "h-7 w-7 bg-transparent p-0 opacity-50 hover:opacity-100"
            )}
          >
            <ChevronRight className="h-4 w-4" />
          </button>
        </div>
        <div className="grid grid-cols-7 gap-1 text-center text-sm">
          {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map(day => (
            <div key={day} className="text-muted-foreground">
              {day}
            </div>
          ))}
          {Array.from({ length: firstDayOfMonth }).map((_, i) => (
            <div key={`empty-${i}`} />
          ))}
          {Array.from({ length: daysInMonth }).map((_, i) => {
            const date = new Date(
              currentMonth.getFullYear(),
              currentMonth.getMonth(),
              i + 1
            );
            return (
              <button
                key={i}
                onClick={() => onSelect?.(date)}
                disabled={isDisabled(date)}
                className={cn(
                  "h-9 w-9 rounded-md text-sm p-0 font-normal",
                  isSelected(date) && "bg-primary text-primary-foreground",
                  !isSelected(date) && "hover:bg-accent",
                  isDisabled(date) && "opacity-50 cursor-not-allowed"
                )}
              >
                {i + 1}
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
}

Calendar.displayName = "Calendar"

export { Calendar }
