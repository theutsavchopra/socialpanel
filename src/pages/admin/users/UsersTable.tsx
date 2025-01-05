import { useState } from 'react';
import { useUsersStore } from '@/stores/usersStore';
import { formatPrice, formatDate } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { Lock, Mail, Power } from 'lucide-react';
import { useToast } from '@/components/ui/use-toast';
import ResetPasswordDialog from './ResetPasswordDialog';

interface UsersTableProps {
  searchQuery: string;
  sortBy: 'recent' | 'spent';
}

export default function UsersTable({ searchQuery, sortBy }: UsersTableProps) {
  const { users, toggleUserStatus } = useUsersStore();
  const { toast } = useToast();
  const [selectedUserId, setSelectedUserId] = useState<string | null>(null);

  const filteredUsers = users.filter(user => 
    user.email.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const sortedUsers = [...filteredUsers].sort((a, b) => {
    if (sortBy === 'recent') {
      return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
    }
    return b.totalSpent - a.totalSpent;
  });

  const handleStatusToggle = (userId: string, currentStatus: boolean) => {
    toggleUserStatus(userId);
    toast({
      title: `User ${currentStatus ? 'Deactivated' : 'Activated'}`,
      description: `User account has been ${currentStatus ? 'deactivated' : 'activated'} successfully.`,
      variant: currentStatus ? 'warning' : 'success'
    });
  };

  return (
    <div className="mt-6 overflow-x-auto">
      <table className="w-full border-collapse">
        <thead>
          <tr className="bg-gray-50 border-y border-gray-200">
            <th className="text-left py-3 px-4">Email</th>
            <th className="text-left py-3 px-4">Joined</th>
            <th className="text-right py-3 px-4">Total Orders</th>
            <th className="text-right py-3 px-4">Total Spent</th>
            <th className="text-center py-3 px-4">Status</th>
            <th className="text-right py-3 px-4">Actions</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-gray-200">
          {sortedUsers.map((user) => (
            <tr key={user.id} className="hover:bg-gray-50">
              <td className="py-3 px-4">
                <div className="flex items-center gap-2">
                  <Mail className="h-4 w-4 text-gray-400" />
                  {user.email}
                </div>
              </td>
              <td className="py-3 px-4">{formatDate(user.createdAt)}</td>
              <td className="py-3 px-4 text-right">{user.totalOrders}</td>
              <td className="py-3 px-4 text-right">{formatPrice(user.totalSpent)}</td>
              <td className="py-3 px-4">
                <div className="flex justify-center">
                  <span className={`px-2 py-1 rounded-full text-xs font-medium
                    ${user.isActive 
                      ? 'bg-green-100 text-green-800 border border-green-200' 
                      : 'bg-gray-100 text-gray-800 border border-gray-200'}`}>
                    {user.isActive ? 'Active' : 'Inactive'}
                  </span>
                </div>
              </td>
              <td className="py-3 px-4">
                <div className="flex justify-end gap-2">
                  <Button
                    size="sm"
                    variant="outline"
                    onClick={() => handleStatusToggle(user.id, user.isActive)}
                    className={user.isActive ? 'text-red-600 hover:text-red-700' : 'text-green-600 hover:text-green-700'}
                  >
                    <Power className="h-4 w-4" />
                  </Button>
                  <Button
                    size="sm"
                    variant="outline"
                    onClick={() => setSelectedUserId(user.id)}
                  >
                    <Lock className="h-4 w-4" />
                  </Button>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      <ResetPasswordDialog
        isOpen={!!selectedUserId}
        onClose={() => setSelectedUserId(null)}
        userId={selectedUserId}
      />
    </div>
  );
}
