import { useState } from 'react';
import OrdersTable from './OrdersTable';
import OrderStats from './OrderStats';
import OrderFilters from './OrderFilters';

export default function OrderManagement() {
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState<string | null>(null);

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-semibold text-gray-900">Order Management</h2>
        <p className="text-gray-600 mt-1">View and manage all orders</p>
      </div>

      <OrderStats />
      
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
        <OrderFilters 
          searchQuery={searchQuery}
          onSearchChange={setSearchQuery}
          statusFilter={statusFilter}
          onStatusChange={setStatusFilter}
        />
        <OrdersTable searchQuery={searchQuery} statusFilter={statusFilter} />
      </div>
    </div>
  );
}
