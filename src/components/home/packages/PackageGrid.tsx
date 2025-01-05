import { useState } from 'react';
import PackageCard from './PackageCard';
import PackageDialog from './PackageDialog';
import { usePackageStore } from '@/stores/packageStore';

interface PackageGridProps {
  type: 'regular' | 'premium';
}

export default function PackageGrid({ type }: PackageGridProps) {
  const [selectedPackage, setSelectedPackage] = useState<string | null>(null);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const packages = usePackageStore(state => state.packages);
  
  const filteredPackages = packages.filter(pkg => pkg.category === type);

  const handleSelect = (packageId: string) => {
    setSelectedPackage(packageId);
    setIsDialogOpen(true);
  };

  return (
    <>
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
        {filteredPackages.map((pkg) => (
          <PackageCard
            key={pkg.id}
            package={pkg}
            onSelect={handleSelect}
          />
        ))}
      </div>

      <PackageDialog 
        isOpen={isDialogOpen}
        onClose={() => {
          setIsDialogOpen(false);
          setSelectedPackage(null);
        }}
        packageId={selectedPackage}
      />
    </>
  );
}
