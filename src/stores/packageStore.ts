import { create } from 'zustand';
import type { Package } from '@/types';

interface PackageStore {
  packages: Package[];
  getPackageById: (id: string) => Package | null;
  updatePackage: (id: string, updates: Partial<Package>) => void;
  bulkUpdatePrices: (categoryId: string, priceMultiplier: number) => void;
  bulkUpdateDiscounts: (categoryId: string, discount: number) => void;
}

// Initial packages data
const initialPackages: Package[] = [
  // Regular Worldwide Views
  {
    id: '1',
    name: '500 Views',
    type: 'worldwide',
    category: 'regular',
    viewCount: 500,
    price: 4.99,
    discount: 15,
    description: 'Perfect for new content creators'
  },
  {
    id: '2',
    name: '1000 Views',
    type: 'worldwide',
    category: 'regular',
    viewCount: 1000,
    price: 8.99,
    discount: 19,
    description: 'Boost your video visibility'
  },
  {
    id: '3',
    name: '2500 Views',
    type: 'worldwide',
    category: 'regular',
    viewCount: 2500,
    price: 19.99,
    discount: 25,
    description: 'Ideal for growing channels'
  },
  {
    id: '4',
    name: '5000 Views',
    type: 'worldwide',
    category: 'regular',
    viewCount: 5000,
    price: 34.99,
    discount: 31,
    description: 'Professional visibility boost'
  },
  {
    id: '5',
    name: '10000 Views',
    type: 'worldwide',
    category: 'regular',
    viewCount: 10000,
    price: 59.99,
    discount: 39,
    description: 'Maximum worldwide exposure'
  },
  {
    id: '6',
    name: '25000 Views',
    type: 'worldwide',
    category: 'regular',
    viewCount: 25000,
    price: 129.99,
    discount: 46,
    description: 'Viral growth package'
  },
  {
    id: '7',
    name: '50000 Views',
    type: 'worldwide',
    category: 'regular',
    viewCount: 50000,
    price: 199.99,
    discount: 50,
    description: 'Ultimate visibility package'
  },
  {
    id: '8',
    name: '100000 Views',
    type: 'worldwide',
    category: 'regular',
    viewCount: 100000,
    price: 349.99,
    discount: 56,
    description: 'Mega viral package'
  },

  // Premium Worldwide Views
  {
    id: '9',
    name: '500 Premium Views',
    type: 'worldwide',
    category: 'premium',
    viewCount: 500,
    price: 7.99,
    discount: 10,
    description: 'High retention starter pack'
  },
  {
    id: '10',
    name: '1000 Premium Views',
    type: 'worldwide',
    category: 'premium',
    viewCount: 1000,
    price: 14.99,
    discount: 15,
    description: 'Enhanced engagement boost'
  },
  {
    id: '11',
    name: '2500 Premium Views',
    type: 'worldwide',
    category: 'premium',
    viewCount: 2500,
    price: 29.99,
    discount: 20,
    description: 'Superior visibility package'
  },
  {
    id: '12',
    name: '5000 Premium Views',
    type: 'worldwide',
    category: 'premium',
    viewCount: 5000,
    price: 49.99,
    discount: 25,
    description: 'Professional retention boost'
  },
  {
    id: '13',
    name: '10000 Premium Views',
    type: 'worldwide',
    category: 'premium',
    viewCount: 10000,
    price: 89.99,
    discount: 30,
    description: 'Elite engagement package'
  },
  {
    id: '14',
    name: '25000 Premium Views',
    type: 'worldwide',
    category: 'premium',
    viewCount: 25000,
    price: 199.99,
    discount: 35,
    description: 'Premium viral growth'
  },
  {
    id: '15',
    name: '50000 Premium Views',
    type: 'worldwide',
    category: 'premium',
    viewCount: 50000,
    price: 349.99,
    discount: 40,
    description: 'Ultimate premium exposure'
  },
  {
    id: '16',
    name: '100000 Premium Views',
    type: 'worldwide',
    category: 'premium',
    viewCount: 100000,
    price: 599.99,
    discount: 45,
    description: 'Mega premium viral package'
  }
];

export const usePackageStore = create<PackageStore>((set, get) => ({
  packages: initialPackages,
  
  getPackageById: (id: string) => {
    return get().packages.find(pkg => pkg.id === id) ?? null;
  },

  updatePackage: (id: string, updates: Partial<Package>) => set((state) => ({
    packages: state.packages.map((pkg) => 
      pkg.id === id ? { ...pkg, ...updates } : pkg
    )
  })),

  bulkUpdatePrices: (categoryId: string, multiplier: number) => set((state) => ({
    packages: state.packages.map((pkg) => 
      pkg.category === categoryId 
        ? { ...pkg, price: pkg.price * multiplier }
        : pkg
    )
  })),

  bulkUpdateDiscounts: (categoryId: string, discount: number) => set((state) => ({
    packages: state.packages.map((pkg) => 
      pkg.category === categoryId 
        ? { ...pkg, discount }
        : pkg
    )
  }))
}));
