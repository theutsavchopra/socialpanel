import { TrendingUp, TrendingDown, DollarSign, ShoppingCart, Users } from 'lucide-react';
import { Card } from '@/components/ui/card';
import { useMetricsStore } from '@/stores/metricsStore';
import { formatPrice } from '@/lib/utils';

interface MetricsCardsProps {
  dateRange: string;
  customRange: { from: Date; to: Date } | null;
}

export default function MetricsCards({ dateRange, customRange }: MetricsCardsProps) {
  const { getMetrics } = useMetricsStore();
  const metrics = getMetrics(dateRange, customRange);

  return (
    <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
      {/* Revenue Cards */}
      <Card className="p-6 bg-gradient-to-br from-red-50 to-white">
        <div className="flex items-center justify-between">
          <div className="p-2 rounded-lg bg-red-500/10">
            <DollarSign className="h-5 w-5 text-red-500" />
          </div>
          <div className={`flex items-center gap-1 text-sm font-medium
            ${metrics.revenueChange >= 0 ? 'text-green-600' : 'text-red-600'}`}>
            {metrics.revenueChange >= 0 ? (
              <TrendingUp className="h-4 w-4" />
            ) : (
              <TrendingDown className="h-4 w-4" />
            )}
            {Math.abs(metrics.revenueChange)}%
          </div>
        </div>
        <div className="mt-4 space-y-4">
          <div>
            <h3 className="text-sm font-medium text-gray-600">Revenue Today</h3>
            <p className="text-2xl font-semibold mt-1">{formatPrice(metrics.revenueToday)}</p>
          </div>
          <div className="grid grid-cols-2 gap-4 pt-4 border-t">
            <div>
              <p className="text-sm text-gray-600">This Month</p>
              <p className="text-lg font-medium mt-1">{formatPrice(metrics.revenueThisMonth)}</p>
            </div>
            <div>
              <p className="text-sm text-gray-600">All Time</p>
              <p className="text-lg font-medium mt-1">{formatPrice(metrics.revenueAllTime)}</p>
            </div>
          </div>
        </div>
      </Card>

      {/* Orders Card */}
      <Card className="p-6 bg-gradient-to-br from-blue-50 to-white">
        <div className="flex items-center justify-between">
          <div className="p-2 rounded-lg bg-blue-500/10">
            <ShoppingCart className="h-5 w-5 text-blue-500" />
          </div>
          <div className={`flex items-center gap-1 text-sm font-medium
            ${metrics.ordersChange >= 0 ? 'text-green-600' : 'text-red-600'}`}>
            {metrics.ordersChange >= 0 ? (
              <TrendingUp className="h-4 w-4" />
            ) : (
              <TrendingDown className="h-4 w-4" />
            )}
            {Math.abs(metrics.ordersChange)}%
          </div>
        </div>
        <div className="mt-4">
          <h3 className="text-sm font-medium text-gray-600">Total Orders</h3>
          <div className="mt-2 flex items-baseline">
            <p className="text-2xl font-semibold">{metrics.orders}</p>
            <p className="ml-2 text-sm text-gray-600">orders</p>
          </div>
          <div className="mt-4 grid grid-cols-2 gap-4 pt-4 border-t">
            <div>
              <p className="text-sm text-gray-600">Completed</p>
              <p className="text-lg font-medium mt-1">{metrics.completedOrders}</p>
            </div>
            <div>
              <p className="text-sm text-gray-600">Pending</p>
              <p className="text-lg font-medium mt-1">{metrics.pendingOrders}</p>
            </div>
          </div>
        </div>
      </Card>

      {/* Customers Card */}
      <Card className="p-6 bg-gradient-to-br from-green-50 to-white">
        <div className="flex items-center justify-between">
          <div className="p-2 rounded-lg bg-green-500/10">
            <Users className="h-5 w-5 text-green-500" />
          </div>
          <div className={`flex items-center gap-1 text-sm font-medium
            ${metrics.customersChange >= 0 ? 'text-green-600' : 'text-red-600'}`}>
            {metrics.customersChange >= 0 ? (
              <TrendingUp className="h-4 w-4" />
            ) : (
              <TrendingDown className="h-4 w-4" />
            )}
            {Math.abs(metrics.customersChange)}%
          </div>
        </div>
        <div className="mt-4">
          <h3 className="text-sm font-medium text-gray-600">Total Customers</h3>
          <div className="mt-2 flex items-baseline">
            <p className="text-2xl font-semibold">{metrics.totalCustomers}</p>
            <p className="ml-2 text-sm text-gray-600">customers</p>
          </div>
          <div className="mt-4 grid grid-cols-2 gap-4 pt-4 border-t">
            <div>
              <p className="text-sm text-gray-600">Active</p>
              <p className="text-lg font-medium mt-1">{metrics.activeCustomers}</p>
            </div>
            <div>
              <p className="text-sm text-gray-600">New Today</p>
              <p className="text-lg font-medium mt-1">{metrics.newCustomersToday}</p>
            </div>
          </div>
        </div>
      </Card>
    </div>
  );
}
