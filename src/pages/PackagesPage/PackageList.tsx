import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import PackageCard from './PackageCard';
import { usePackages } from './hooks/usePackages';
import type { PackageType } from './types';

interface PackageListProps {
  type: PackageType;
}

export default function PackageList({ type }: PackageListProps) {
  const navigate = useNavigate();
  const { packages } = usePackages(type);
  const [category, setCategory] = useState<'regular' | 'premium'>('regular');

  const handleSelectPackage = (packageId: string) => {
    navigate(`/order?package=${packageId}`);
  };

  return (
    <div>
      <Tabs defaultValue="regular" onValueChange={(value) => setCategory(value as 'regular' | 'premium')}>
        <div className="flex justify-center mb-8">
          <TabsList className="grid w-full max-w-md grid-cols-2">
            <TabsTrigger value="regular" className="px-8 py-3">Regular Views</TabsTrigger>
            <TabsTrigger value="premium" className="px-8 py-3">Premium Views</TabsTrigger>
          </TabsList>
        </div>

        <TabsContent value="regular" className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {packages
            .filter(pkg => pkg.category === 'regular')
            .map(pkg => (
              <PackageCard 
                key={pkg.id} 
                package={pkg} 
                onSelect={handleSelectPackage} 
              />
            ))}
        </TabsContent>

        <TabsContent value="premium" className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {packages
            .filter(pkg => pkg.category === 'premium')
            .map(pkg => (
              <PackageCard 
                key={pkg.id} 
                package={pkg} 
                onSelect={handleSelectPackage} 
              />
            ))}
        </TabsContent>
      </Tabs>
    </div>
  );
}
