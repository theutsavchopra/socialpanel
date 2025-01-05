import { create } from 'zustand';
import type { Order, OrderStatus } from '@/types/order';

interface OrderStore {
  orders: Order[];
  updateOrderStatus: (orderId: string, status: OrderStatus) => void;
}

// Mock data for demonstration
const mockOrders: Order[] = [
  {
    id: 'ORD001',
    userId: 'USR001',
    email: 'john@example.com',
    packageId: '1',
    package: {
      id: '1',
      name: '500 Views',
      type: 'worldwide',
      category: 'regular',
      viewCount: 500,
      price: 4.99,
      description: 'Basic views package'
    },
    videoUrl: 'https://youtube.com/watch?v=abc123',
    status: 'pending',
    createdAt: '2024-03-10T10:00:00Z',
    updatedAt: '2024-03-10T10:00:00Z',
    transactionId: 'TXN-123456789'
  },
  {
    id: 'ORD002',
    userId: 'USR002',
    email: 'sarah@example.com',
    packageId: '2',
    package: {
      id: '2',
      name: '1000 Views',
      type: 'worldwide',
      category: 'regular',
      viewCount: 1000,
      price: 8.99,
      description: 'Standard views package'
    },
    videoUrl: 'https://youtube.com/watch?v=def456',
    status: 'in_progress',
    createdAt: '2024-03-09T15:30:00Z',
    updatedAt: '2024-03-09T15:30:00Z',
    transactionId: 'TXN-987654321'
  },
  {
    id: 'ORD003',
    userId: 'USR003',
    email: 'mike@example.com',
    packageId: '3',
    package: {
      id: '3',
      name: '2500 Views',
      type: 'worldwide',
      category: 'regular',
      viewCount: 2500,
      price: 19.99,
      description: 'Advanced views package'
    },
    videoUrl: 'https://youtube.com/watch?v=ghi789',
    status: 'completed',
    createdAt: '2024-03-08T09:15:00Z',
    updatedAt: '2024-03-08T09:15:00Z',
    transactionId: 'TXN-456789123'
  }
];

export const useOrderStore = create<OrderStore>((set) => ({
  orders: mockOrders,
  updateOrderStatus: (orderId, status) => set((state) => ({
    orders: state.orders.map((order) =>
      order.id === orderId
        ? { ...order, status, updatedAt: new Date().toISOString() }
        : order
    )
  }))
}));
