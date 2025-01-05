import { Package } from '@/types';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { formatPrice } from '@/lib/utils';
import { Check } from 'lucide-react';

interface PackageCardProps {
  package: Package;
  onSelect: (packageId: string) => void;
}

export default function PackageCard({ package: pkg, onSelect }: PackageCardProps) {
  const features = [
    'High Quality Views',
    'No Password Required',
    'Instant Start',
    '24/7 Support',
    'Money Back Guarantee'
  ];

  return (
    <Card className="flex flex-col hover:shadow-lg transition-shadow">
      <CardHeader className="text-center bg-gradient-to-b from-blue-50 to-white">
        <CardTitle className="font-outfit text-2xl">{pkg.name}</CardTitle>
        <div className="font-outfit text-4xl font-bold text-blue-600 mt-4">{formatPrice(pkg.price)}</div>
      </CardHeader>
      <CardContent className="flex-grow pt-6">
        <div className="font-outfit text-lg mb-4">{pkg.viewCount.toLocaleString()} Views</div>
        <ul className="space-y-3">
          {features.map((feature, index) => (
            <li key={index} className="flex items-center font-inter text-gray-600">
              <Check className="h-5 w-5 text-green-500 mr-2" />
              {feature}
            </li>
          ))}
        </ul>
      </CardContent>
      <CardFooter>
        <Button 
          className="w-full bg-blue-600 hover:bg-blue-700 font-inter" 
          onClick={() => onSelect(pkg.id)}
        >
          Select Package
        </Button>
      </CardFooter>
    </Card>
  );
}
