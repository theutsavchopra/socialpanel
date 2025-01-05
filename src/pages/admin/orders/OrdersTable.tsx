import { useOrderStore } from '@/stores/orderStore';
import { formatPrice, formatDate } from '@/lib/utils';
import { ExternalLink, Clock, CheckCircle, AlertCircle, CreditCard } from 'lucide-react';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

interface OrdersTableProps {
  searchQuery: string;
  statusFilter: string | null;
}

const statusConfig = {
  pending: {
    icon: Clock,
    className: 'bg-yellow-50 text-yellow-700 border-yellow-100'
  },
  in_progress: {
    icon: AlertCircle,
    className: 'bg-blue-50 text-blue-700 border-blue-100'
  },
  completed: {
    icon: CheckCircle,
    className: 'bg-green-50 text-green-700 border-green-100'
  }
};

export default function OrdersTable({ searchQuery, statusFilter }: OrdersTableProps) {
  const { orders, updateOrderStatus } = useOrderStore();

  const filteredOrders = orders.filter(order => {
    const matchesSearch = order.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         order.videoUrl.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesStatus = !statusFilter || order.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  return (
    <div className="mt-4 overflow-x-auto rounded-lg border border-gray-200">
      <table className="w-full border-collapse">
        <thead>
          <tr className="bg-gray-50">
            <th className="text-left py-3 px-4 text-xs font-medium text-gray-500 uppercase tracking-wider">Order Info</th>
            <th className="text-left py-3 px-4 text-xs font-medium text-gray-500 uppercase tracking-wider">Customer</th>
            <th className="text-left py-3 px-4 text-xs font-medium text-gray-500 uppercase tracking-wider">Video</th>
            <th className="text-left py-3 px-4 text-xs font-medium text-gray-500 uppercase tracking-wider">Package</th>
            <th className="text-right py-3 px-4 text-xs font-medium text-gray-500 uppercase tracking-wider">Amount</th>
            <th className="text-center py-3 px-4 text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
            <th className="text-right py-3 px-4 text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-gray-200 bg-white">
          {filteredOrders.map((order) => {
            const StatusIcon = statusConfig[order.status].icon;
            return (
              <tr key={order.id} className="group hover:bg-gray-50/50">
                <td className="py-4 px-4">
                  <div className="flex flex-col">
                    <span className="text-sm font-medium text-gray-900">{order.id}</span>
                    <span className="text-xs text-gray-500 mt-1">{formatDate(order.createdAt)}</span>
                  </div>
                </td>
                <td className="py-4 px-4">
                  <div className="flex flex-col max-w-[200px]">
                    <span className="text-sm text-gray-900 truncate">{order.email}</span>
                    {order.transactionId && (
                      <div className="flex items-center gap-1 mt-1">
                        <CreditCard className="h-3 w-3 text-gray-400 flex-shrink-0" />
                        <span className="text-xs text-gray-500 font-mono truncate">
                          {order.transactionId}
                        </span>
                      </div>
                    )}
                  </div>
                </td>
                <td className="py-4 px-4">
                  <a 
                    href={order.videoUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1 text-sm text-blue-600 hover:text-blue-800"
                  >
                    <span className="truncate max-w-[150px]">View Video</span>
                    <ExternalLink className="h-3 w-3 flex-shrink-0" />
                  </a>
                </td>
                <td className="py-4 px-4">
                  <div className="text-sm">
                    <span className="text-gray-900">{order.package.viewCount.toLocaleString()} Views</span>
                    <span className="text-xs text-gray-500 ml-1 capitalize">({order.package.category})</span>
                  </div>
                </td>
                <td className="py-4 px-4 text-right">
                  <span className="text-sm font-medium text-gray-900">
                    {formatPrice(order.package.price)}
                  </span>
                </td>
                <td className="py-4 px-4">
                  <div className="flex justify-center">
                    <div className={`inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-medium border
                      ${statusConfig[order.status].className}`}>
                      <StatusIcon className="h-3 w-3" />
                      <span>{order.status.replace('_', ' ').toUpperCase()}</span>
                    </div>
                  </div>
                </td>
                <td className="py-4 px-4">
                  <div className="flex justify-end">
                    <Select
                      value={order.status}
                      onValueChange={(value) => updateOrderStatus(order.id, value as any)}
                    >
                      <SelectTrigger className="h-8 w-[130px]">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="pending">Pending</SelectItem>
                        <SelectItem value="in_progress">In Progress</SelectItem>
                        <SelectItem value="completed">Completed</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}
