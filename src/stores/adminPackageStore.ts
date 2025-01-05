import { create } from 'zustand';
import type { AdminPackage, PackageCategory, PackageType } from '@/types/admin';

interface AdminPackageStore {
  packages: AdminPackage[];
  categories: PackageCategory[];
  types: PackageType[];
  selectedCategory: string | null;
  selectedType: string | null;
  setSelectedCategory: (id: string | null) => void;
  setSelectedType: (id: string | null) => void;
  setPackages: (packages: AdminPackage[]) => void;
  updatePackage: (id: string, updates: Partial<AdminPackage>) => void;
  bulkUpdatePrices: (categoryId: string, priceMultiplier: number) => void;
  bulkUpdateDiscounts: (categoryId: string, discount: number) => void;
}

export const useAdminPackageStore = create<AdminPackageStore>((set) => ({
  packages: [],
  categories: [
    { id: 'regular', name: 'Regular Views', description: 'Standard worldwide views' },
    { id: 'premium', name: 'Premium Views', description: 'High retention worldwide views' }
  ],
  types: [
    { id: 'worldwide', name: 'Worldwide', description: 'Views from all countries' },
    { id: 'geo', name: 'Geo-Targeted', description: 'Country specific views' }
  ],
  selectedCategory: null,
  selectedType: null,
  
  setSelectedCategory: (id) => set({ selectedCategory: id }),
  setSelectedType: (id) => set({ selectedType: id }),
  setPackages: (packages) => set({ packages }),
  
  updatePackage: (id, updates) => set((state) => ({
    packages: state.packages.map((pkg) => 
      pkg.id === id ? { ...pkg, ...updates } : pkg
    )
  })),

  bulkUpdatePrices: (categoryId, multiplier) => set((state) => ({
    packages: state.packages.map((pkg) => 
      pkg.category === categoryId 
        ? { ...pkg, price: pkg.price * multiplier }
        : pkg
    )
  })),

  bulkUpdateDiscounts: (categoryId, discount) => set((state) => ({
    packages: state.packages.map((pkg) => 
      pkg.category === categoryId 
        ? { ...pkg, discount }
        : pkg
    )
  }))
}));
