import { useQuery } from '@tanstack/react-query';
import type { Package } from '@/types';
import type { PackageType } from '../types';

// Temporary mock data until API integration
const mockPackages: Package[] = [
  {
    id: '1',
    name: 'Starter',
    type: 'worldwide',
    category: 'regular',
    viewCount: 1000,
    price: 9.99,
    description: 'Perfect for new content creators',
  },
  {
    id: '2',
    name: 'Growth',
    type: 'worldwide',
    category: 'regular',
    viewCount: 5000,
    price: 39.99,
    description: 'Boost your video visibility',
  },
  {
    id: '3',
    name: 'Pro',
    type: 'worldwide',
    category: 'premium',
    viewCount: 10000,
    price: 79.99,
    description: 'High retention premium views',
  },
];

export function usePackages(type: PackageType) {
  const { data: packages = mockPackages } = useQuery({
    queryKey: ['packages', type],
    queryFn: async () => {
      // TODO: Replace with actual API call
      return mockPackages.filter(pkg => pkg.type === type);
    },
  });

  return { packages };
}
