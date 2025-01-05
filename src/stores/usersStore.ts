import { create } from 'zustand';
import type { User } from '@/types/user';

interface UsersState {
  users: (User & {
    totalOrders: number;
    totalSpent: number;
  })[];
  toggleUserStatus: (userId: string) => void;
  resetPassword: (userId: string) => Promise<string>;
}

// Mock data for demonstration
const mockUsers = [
  {
    id: '1',
    email: 'john@example.com',
    isActive: true,
    createdAt: '2024-03-01T10:00:00Z',
    updatedAt: '2024-03-01T10:00:00Z',
    totalOrders: 5,
    totalSpent: 249.95
  },
  {
    id: '2',
    email: 'sarah@example.com',
    isActive: true,
    createdAt: '2024-02-15T15:30:00Z',
    updatedAt: '2024-02-15T15:30:00Z',
    totalOrders: 3,
    totalSpent: 149.97
  },
  {
    id: '3',
    email: 'mike@example.com',
    isActive: false,
    createdAt: '2024-01-20T09:15:00Z',
    updatedAt: '2024-01-20T09:15:00Z',
    totalOrders: 1,
    totalSpent: 49.99
  }
];

export const useUsersStore = create<UsersState>((set) => ({
  users: mockUsers,
  
  toggleUserStatus: (userId) => set((state) => ({
    users: state.users.map((user) => 
      user.id === userId 
        ? { ...user, isActive: !user.isActive }
        : user
    )
  })),

  resetPassword: async (userId) => {
    // In production, this would make an API call
    const tempPassword = Math.random().toString(36).slice(-8).toUpperCase();
    await new Promise(resolve => setTimeout(resolve, 1000));
    return tempPassword;
  }
}));
