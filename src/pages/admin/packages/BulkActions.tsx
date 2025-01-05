import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { useAdminPackageStore } from '@/stores/adminPackageStore';
import { usePackageStore } from '@/stores/packageStore';
import { Percent, DollarSign } from 'lucide-react';

export default function BulkActions() {
  const { selectedCategory, categories } = useAdminPackageStore();
  const { bulkUpdatePrices: updateMainPrices, bulkUpdateDiscounts: updateMainDiscounts } = usePackageStore();
  const [priceMultiplier, setPriceMultiplier] = useState('1');
  const [discount, setDiscount] = useState('0');

  const selectedCategoryName = selectedCategory 
    ? categories.find(c => c.id === selectedCategory)?.name 
    : 'selected packages';

  const handleBulkPriceUpdate = () => {
    if (!selectedCategory) return;
    const multiplier = parseFloat(priceMultiplier);
    if (!isNaN(multiplier)) {
      updateMainPrices(selectedCategory, multiplier);
    }
  };

  const handleBulkDiscountUpdate = () => {
    if (!selectedCategory) return;
    const discountValue = parseFloat(discount);
    if (!isNaN(discountValue)) {
      updateMainDiscounts(selectedCategory, discountValue);
    }
  };

  if (!selectedCategory) {
    return (
      <div className="bg-blue-50 text-blue-700 px-4 py-3 rounded-lg mb-6">
        Please select a category to perform bulk actions
      </div>
    );
  }

  return (
    <div className="flex flex-col sm:flex-row gap-4 mb-6 p-4 bg-gray-50 rounded-lg">
      <div className="flex-1 space-y-2">
        <label className="block text-sm font-medium text-gray-700">
          Update Prices for {selectedCategoryName}
        </label>
        <div className="flex gap-2">
          <div className="relative flex-1">
            <DollarSign className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
            <Input
              type="number"
              value={priceMultiplier}
              onChange={(e) => setPriceMultiplier(e.target.value)}
              className="pl-9"
              step="0.01"
              min="0.1"
              placeholder="Price multiplier"
            />
          </div>
          <Button 
            onClick={handleBulkPriceUpdate}
            disabled={!selectedCategory}
          >
            Update Prices
          </Button>
        </div>
      </div>

      <div className="flex-1 space-y-2">
        <label className="block text-sm font-medium text-gray-700">
          Set Discount for {selectedCategoryName}
        </label>
        <div className="flex gap-2">
          <div className="relative flex-1">
            <Percent className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
            <Input
              type="number"
              value={discount}
              onChange={(e) => setDiscount(e.target.value)}
              className="pl-9"
              min="0"
              max="100"
              placeholder="Discount percentage"
            />
          </div>
          <Button 
            onClick={handleBulkDiscountUpdate}
            disabled={!selectedCategory}
          >
            Set Discount
          </Button>
        </div>
      </div>
    </div>
  );
}
