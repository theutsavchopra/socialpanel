import OrdersTable from './orders/OrdersTable';

export default function OrderManagement() {
  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-semibold text-gray-900">Order Management</h2>
        <p className="text-gray-600 mt-1">View and manage all orders</p>
      </div>

      <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
        <OrdersTable />
      </div>
    </div>
  );
}
