import { format } from 'date-fns';
import type { TransactionMetrics } from '../types/monitoring';

export function formatMetrics(
  transactions: any[],
  groupBy: 'hour' | 'day' | 'week'
): TransactionMetrics {
  const grouped = new Map<string, { count: number; volume: number }>();

  transactions.forEach(tx => {
    const key = formatDate(tx.createdAt, groupBy);
    const current = grouped.get(key) || { count: 0, volume: 0 };
    
    grouped.set(key, {
      count: current.count + 1,
      volume: current.volume + Number(tx.amount)
    });
  });

  const labels = Array.from(grouped.keys());
  const counts = labels.map(key => grouped.get(key)!.count);
  const volumes = labels.map(key => grouped.get(key)!.volume);

  return {
    labels,
    datasets: [
      {
        label: 'Transaction Count',
        data: counts
      },
      {
        label: 'Transaction Volume',
        data: volumes
      }
    ]
  };
}

function formatDate(date: Date, groupBy: string): string {
  switch (groupBy) {
    case 'hour':
      return format(date, 'yyyy-MM-dd HH:00');
    case 'day':
      return format(date, 'yyyy-MM-dd');
    case 'week':
      return format(date, 'yyyy-[W]II');
    default:
      return format(date, 'yyyy-MM-dd');
  }
}
