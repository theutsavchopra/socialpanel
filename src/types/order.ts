export type OrderStatus = 'pending' | 'in_progress' | 'completed';

export interface Order {
  id: string;
  userId: string;
  email: string;
  packageId: string;
  package: Package;
  videoUrl: string;
  status: OrderStatus;
  createdAt: string;
  updatedAt: string;
  transactionId?: string; // Added transaction ID field
}

export interface OrderFilters {
  status?: OrderStatus;
  search?: string;
}
