import { useAuthStore } from '@/stores/authStore';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';
import { ShoppingBag, Wallet, Settings, History } from 'lucide-react';

export default function UserDashboard() {
  const { user } = useAuthStore();

  return (
    <div className="container py-8 max-w-6xl">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900">Welcome back!</h1>
        <p className="text-gray-600 mt-2">Manage your orders and account settings</p>
      </div>

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        <Link to="/orders">
          <Card className="p-6 hover:shadow-md transition-shadow">
            <div className="flex items-center gap-4">
              <div className="p-3 rounded-lg bg-blue-50">
                <ShoppingBag className="h-6 w-6 text-blue-500" />
              </div>
              <div>
                <h3 className="font-semibold text-lg">My Orders</h3>
                <p className="text-sm text-gray-600">View your order history</p>
              </div>
            </div>
          </Card>
        </Link>

        <Link to="/wallet">
          <Card className="p-6 hover:shadow-md transition-shadow">
            <div className="flex items-center gap-4">
              <div className="p-3 rounded-lg bg-green-50">
                <Wallet className="h-6 w-6 text-green-500" />
              </div>
              <div>
                <h3 className="font-semibold text-lg">My Wallet</h3>
                <p className="text-sm text-gray-600">Manage your funds</p>
              </div>
            </div>
          </Card>
        </Link>

        <Link to="/settings">
          <Card className="p-6 hover:shadow-md transition-shadow">
            <div className="flex items-center gap-4">
              <div className="p-3 rounded-lg bg-purple-50">
                <Settings className="h-6 w-6 text-purple-500" />
              </div>
              <div>
                <h3 className="font-semibold text-lg">Settings</h3>
                <p className="text-sm text-gray-600">Update your preferences</p>
              </div>
            </div>
          </Card>
        </Link>
      </div>

      <div className="mt-12">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-xl font-semibold">Recent Orders</h2>
          <Button variant="outline" size="sm">
            <History className="h-4 w-4 mr-2" />
            View All
          </Button>
        </div>

        {/* Recent orders table */}
        <Card>
          <div className="p-6">
            <div className="text-center text-gray-500">
              No recent orders found
            </div>
          </div>
        </Card>
      </div>
    </div>
  );
}
