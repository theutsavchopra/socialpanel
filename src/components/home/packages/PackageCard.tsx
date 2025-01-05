import type { Package } from '@/types';

interface PackageCardProps {
  package: {
    id: string;
    viewCount: number;
    price: number;
    discount?: number;
  };
  onSelect: (id: string) => void;
}

export default function PackageCard({ package: pkg, onSelect }: PackageCardProps) {
  const originalPrice = pkg.discount 
    ? pkg.price / (1 - pkg.discount / 100) 
    : pkg.price;

  return (
    <div className="group relative rounded-lg overflow-hidden transition-all duration-300
                bg-white/40 backdrop-blur-[12px] border border-white
                hover:shadow-lg hover:bg-white/60">
      <div className="p-4">
        {/* Views count */}
        <div className="text-center mb-2">
          <div className="font-outfit text-2xl font-bold text-gray-900">
            {pkg.viewCount >= 1000 
              ? `${pkg.viewCount / 1000}K` 
              : pkg.viewCount}
          </div>
          <div className="font-inter text-xs text-gray-500 uppercase tracking-wide">Views</div>
        </div>

        {/* Price */}
        <div className="text-center mb-3">
          <div className="flex items-center justify-center gap-1.5">
            <span className="font-outfit text-lg font-bold text-red-500">
              ${pkg.price.toFixed(2)}
            </span>
            {pkg.discount && (
              <span className="text-xs text-gray-400 line-through">
                ${originalPrice.toFixed(2)}
              </span>
            )}
          </div>
          {pkg.discount && (
            <div className="text-xs text-green-600 font-medium">
              Save {pkg.discount}%
            </div>
          )}
        </div>

        {/* Button */}
        <button
          onClick={() => onSelect(pkg.id)}
          className="w-full py-1.5 px-3 bg-red-500 hover:bg-red-600 text-white text-sm
                   rounded-md transition-colors font-medium"
        >
          Select
        </button>
      </div>
    </div>
  );
}
