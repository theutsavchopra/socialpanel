import { Package } from '@/types';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { formatPrice } from '@/lib/utils';

interface PackageCardProps {
  package: Package;
  onSelect: (packageId: string) => void;
}

export default function PackageCard({ package: pkg, onSelect }: PackageCardProps) {
  return (
    <Card className="flex flex-col">
      <CardHeader>
        <CardTitle className="text-xl">{pkg.name}</CardTitle>
      </CardHeader>
      <CardContent className="flex-grow">
        <div className="text-3xl font-bold mb-4">{formatPrice(pkg.price)}</div>
        <div className="text-lg mb-2">{pkg.viewCount.toLocaleString()} Views</div>
        <p className="text-gray-600">{pkg.description}</p>
      </CardContent>
      <CardFooter>
        <Button className="w-full" onClick={() => onSelect(pkg.id)}>
          Select Package
        </Button>
      </CardFooter>
    </Card>
  );
}
