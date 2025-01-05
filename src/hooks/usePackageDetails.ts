import { usePackageStore } from '@/stores/packageStore';

export function usePackageDetails(packageId: string | null) {
  const getPackageById = usePackageStore(state => state.getPackageById);
  
  if (!packageId) return null;
  return getPackageById(packageId);
}
