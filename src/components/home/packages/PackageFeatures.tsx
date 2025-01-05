import { Check } from 'lucide-react';

interface PackageFeaturesProps {
  type?: 'regular' | 'premium';
}

const features = {
  regular: [
    '100% Real worldwide views',
    'Natural & drip-feed delivery',
    '24/7 Customer support',
    'Lifetime guaranteed',
    'Order starts instantly',
    'Overdeliver with every order'
  ],
  premium: [
    '100% Real targeted views',
    'Higher retention rate (70%+)',
    'Priority support 24/7',
    'Faster delivery speed',
    'Advanced analytics dashboard',
    'Custom delivery schedule',
    'Geographic targeting',
    'Age & gender targeting',
    'Detailed retention reports'
  ]
};

export default function PackageFeatures({ type = 'regular' }: PackageFeaturesProps) {
  return (
    <ul className="space-y-2">
      {features[type].map((feature, index) => (
        <li key={index} className="flex items-center gap-2 font-inter text-sm text-gray-600">
          <Check className="h-4 w-4 text-green-500 flex-shrink-0" />
          {feature}
        </li>
      ))}
    </ul>
  );
}
