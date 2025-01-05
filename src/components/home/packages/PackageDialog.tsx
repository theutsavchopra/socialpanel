import { useNavigate } from 'react-router-dom';
import { Check } from 'lucide-react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { usePackageStore } from '@/stores/packageStore';

interface PackageDialogProps {
  isOpen: boolean;
  onClose: () => void;
  packageId: string | null;
}

export default function PackageDialog({ isOpen, onClose, packageId }: PackageDialogProps) {
  const navigate = useNavigate();
  const getPackageById = usePackageStore(state => state.getPackageById);
  
  const selectedPackage = packageId ? getPackageById(packageId) : null;
  
  if (!selectedPackage) return null;

  const features = [
    'High Quality Views',
    'No Password Required',
    'Instant Start',
    '24/7 Support',
    'Money Back Guarantee'
  ];

  const handleBuyNow = () => {
    navigate(`/order?package=${selectedPackage.id}`);
  };

  const originalPrice = selectedPackage.discount 
    ? selectedPackage.price / (1 - selectedPackage.discount / 100) 
    : selectedPackage.price;

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle className="text-center font-outfit">Package Summary</DialogTitle>
        </DialogHeader>
        <div className="mt-4">
          <div className="text-center mb-6">
            <div className="font-outfit text-3xl font-bold text-gray-900">
              {selectedPackage.viewCount >= 1000 
                ? `${selectedPackage.viewCount / 1000}K` 
                : selectedPackage.viewCount} Views
            </div>
            <div className="flex items-center justify-center gap-2 mt-2">
              <div className="font-outfit text-2xl font-bold text-red-500">
                ${selectedPackage.price.toFixed(2)}
              </div>
              {selectedPackage.discount && (
                <>
                  <div className="text-sm text-gray-400 line-through">
                    ${originalPrice.toFixed(2)}
                  </div>
                  <div className="text-sm text-green-600 font-medium">
                    ({selectedPackage.discount}% OFF)
                  </div>
                </>
              )}
            </div>
          </div>

          <div className="space-y-3 mb-6">
            {features.map((feature, index) => (
              <div key={index} className="flex items-center gap-2">
                <Check className="h-5 w-5 text-green-500 flex-shrink-0" />
                <span className="font-inter text-gray-700">{feature}</span>
              </div>
            ))}
          </div>

          <div className="space-y-3">
            <Button 
              className="w-full bg-red-500 hover:bg-red-600" 
              onClick={handleBuyNow}
            >
              Buy Now
            </Button>
            <p className="text-xs text-gray-500 text-center px-4">
              *Video should be public and open to all countries. Don't buy from other websites at the same time!
            </p>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
