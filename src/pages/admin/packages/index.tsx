import { useEffect } from 'react';
import PackageFilters from './PackageFilters';
import PackageTable from './PackageTable';
import BulkActions from './BulkActions';
import { usePackageStore } from '@/stores/packageStore';
import { useAdminPackageStore } from '@/stores/adminPackageStore';

export default function PackageManagement() {
  const packages = usePackageStore(state => state.packages);
  const setAdminPackages = useAdminPackageStore(state => state.setPackages);

  // Initialize admin packages from the main package store
  useEffect(() => {
    const adminPackages = packages.map(pkg => ({
      ...pkg,
      isActive: true,
      sortOrder: 0
    }));
    setAdminPackages(adminPackages);
  }, [packages, setAdminPackages]);

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-2xl font-semibold text-gray-900">Package Management</h2>
          <p className="text-gray-600 mt-1">Manage your package prices and discounts</p>
        </div>
      </div>

      <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
        <PackageFilters />
        <BulkActions />
        <PackageTable />
      </div>
    </div>
  );
}
