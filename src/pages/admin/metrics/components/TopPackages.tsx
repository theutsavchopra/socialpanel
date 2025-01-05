import { Card } from '@/components/ui/card';
import { useMetricsStore } from '@/stores/metricsStore';
import { formatPrice } from '@/lib/utils';
import { Package, TrendingUp, TrendingDown } from 'lucide-react';

interface TopPackagesProps {
  dateRange: string;
  customRange: { from: Date; to: Date } | null;
}

export default function TopPackages({ dateRange, customRange }: TopPackagesProps) {
  const { getTopPackages } = useMetricsStore();
  const packages = getTopPackages(dateRange, customRange);

  return (
    <Card className="p-6">
      <div className="flex items-center justify-between mb-4">
        <div>
          <h3 className="text-sm font-medium text-gray-600">Top Packages</h3>
          <p className="text-2xl font-semibold mt-1">Performance Overview</p>
        </div>
        <div className="text-sm text-gray-500 bg-gray-50 px-2 py-1 rounded">
          {packages.length} packages
        </div>
      </div>

      <div className="space-y-3">
        {packages.map((pkg, index) => (
          <div 
            key={pkg.id} 
            className="relative group p-3 rounded-lg border border-gray-100 bg-white/50
                       hover:bg-white hover:border-gray-200 transition-all duration-200"
          >
            {/* Left accent */}
            <div className="absolute -left-[2px] top-1/2 -translate-y-1/2 w-[3px] h-6 
                          bg-gradient-to-b from-red-500/60 to-red-500/20 rounded-full
                          group-hover:h-[calc(100%-8px)] group-hover:from-red-500 group-hover:to-red-500/50 
                          transition-all duration-300" />

            <div className="flex items-center gap-3">
              {/* Icon */}
              <div className="flex-shrink-0 w-10 h-10 rounded-lg bg-red-50 
                            flex items-center justify-center transition-transform duration-200
                            group-hover:scale-110 group-hover:bg-red-100/80">
                <Package className="h-5 w-5 text-red-500" />
              </div>

              {/* Content */}
              <div className="flex-grow min-w-0">
                <div className="flex items-center justify-between">
                  <h4 className="text-sm font-medium text-gray-700 truncate">{pkg.name}</h4>
                  <span className="text-sm font-semibold ml-2">{formatPrice(pkg.revenue)}</span>
                </div>

                <div className="flex items-center gap-3 mt-1">
                  <span className="text-xs font-medium px-1.5 py-0.5 rounded-full 
                                 bg-green-50 text-green-700 border border-green-100">
                    {pkg.orders} orders
                  </span>
                  <div className="flex items-center gap-1">
                    {pkg.percentageOfTotal > 20 ? (
                      <TrendingUp className="h-3.5 w-3.5 text-green-500" />
                    ) : (
                      <TrendingDown className="h-3.5 w-3.5 text-red-500" />
                    )}
                    <span className={`text-xs font-medium
                      ${pkg.percentageOfTotal > 20 ? 'text-green-600' : 'text-red-600'}`}>
                      {pkg.percentageOfTotal}%
                    </span>
                  </div>
                </div>

                {/* Progress bar */}
                <div className="mt-2 h-1 w-full bg-gray-100 rounded-full overflow-hidden">
                  <div 
                    className="h-full rounded-full transition-all duration-500
                             bg-gradient-to-r from-red-500 to-red-400"
                    style={{ width: `${pkg.percentageOfTotal}%` }}
                  />
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </Card>
  );
}
