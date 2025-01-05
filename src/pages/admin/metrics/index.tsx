import { useState } from 'react';
import MetricsHeader from './components/MetricsHeader';
import RevenueChart from './components/RevenueChart';
import OrdersChart from './components/OrdersChart';
import TopPackages from './components/TopPackages';
import MetricsCards from './components/MetricsCards';
import DateRangeSelector from './components/DateRangeSelector';

export default function MetricsDashboard() {
  const [dateRange, setDateRange] = useState<'this_month' | 'last_month' | 'this_week' | 'last_week' | 'custom'>('this_month');
  const [customRange, setCustomRange] = useState<{ from: Date; to: Date } | null>(null);

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <MetricsHeader />
        <DateRangeSelector
          value={dateRange}
          onChange={setDateRange}
          onCustomRange={setCustomRange}
        />
      </div>

      <MetricsCards dateRange={dateRange} customRange={customRange} />

      <div className="grid lg:grid-cols-2 gap-6">
        <RevenueChart dateRange={dateRange} customRange={customRange} />
        <OrdersChart dateRange={dateRange} customRange={customRange} />
      </div>

      <TopPackages dateRange={dateRange} customRange={customRange} />
    </div>
  );
}
