import { useUsersStore } from '@/stores/usersStore';
import { Users, DollarSign, ShoppingCart, UserCheck } from 'lucide-react';
import { formatPrice } from '@/lib/utils';

export default function UserStats() {
  const { users } = useUsersStore();

  const stats = {
    totalUsers: users.length,
    activeUsers: users.filter(u => u.isActive).length,
    totalOrders: users.reduce((sum, user) => sum + user.totalOrders, 0),
    totalRevenue: users.reduce((sum, user) => sum + user.totalSpent, 0)
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
      <StatCard
        icon={Users}
        label="Total Users"
        value={stats.totalUsers.toString()}
        color="blue"
      />
      <StatCard
        icon={UserCheck}
        label="Active Users"
        value={stats.activeUsers.toString()}
        color="green"
      />
      <StatCard
        icon={ShoppingCart}
        label="Total Orders"
        value={stats.totalOrders.toString()}
        color="purple"
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
  color: 'blue' | 'green' | 'purple' | 'red';
}

function StatCard({ icon: Icon, label, value, color }: StatCardProps) {
  const colors = {
    blue: 'bg-blue-50 text-blue-600',
    green: 'bg-green-50 text-green-600',
    purple: 'bg-purple-50 text-purple-600',
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
