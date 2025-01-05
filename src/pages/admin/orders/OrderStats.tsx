import { useOrderStore } from '@/stores/orderStore';
import { ShoppingCart, Clock, CheckCircle, DollarSign } from 'lucide-react';
import { formatPrice } from '@/lib/utils';

export default function OrderStats() {
  const { orders } = useOrderStore();

  const stats = {
    totalOrders: orders.length,
    pendingOrders: orders.filter(o => o.status === 'pending').length,
    completedOrders: orders.filter(o => o.status === 'completed').length,
    totalRevenue: orders.reduce((sum, order) => sum + order.package.price, 0)
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
      <StatCard
        icon={ShoppingCart}
        label="Total Orders"
        value={stats.totalOrders.toString()}
        color="blue"
      />
      <StatCard
        icon={Clock}
        label="Pending Orders"
        value={stats.pendingOrders.toString()}
        color="yellow"
      />
      <StatCard
        icon={CheckCircle}
        label="Completed Orders"
        value={stats.completedOrders.toString()}
        color="green"
      />
      <StatCard
        icon={DollarSign}
        label="Total Revenue"
        value={formatPrice(stats.totalRevenue)}
        color="red"
      />
    </div>
  );
}

interface StatCardProps {
  icon: React.ElementType;
  label: string;
  value: string;
  color: 'blue' | 'yellow' | 'green' | 'red';
}

function StatCard({ icon: Icon, label, value, color }: StatCardProps) {
  const colors = {
    blue: 'bg-blue-50 text-blue-600',
    yellow: 'bg-yellow-50 text-yellow-600',
    green: 'bg-green-50 text-green-600',
    red: 'bg-red-50 text-red-600'
  };

  return (
    <div className="bg-white rounded-xl p-6 border border-gray-200">
      <div className="flex items-center gap-4">
        <div className={`p-3 rounded-lg ${colors[color]}`}>
          <Icon className="h-6 w-6" />
        </div>
        <div>
          <div className="text-sm text-gray-600">{label}</div>
          <div className="text-2xl font-semibold mt-1">{value}</div>
        </div>
      </div>
    </div>
  );
}
