import { useState } from 'react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { useAdminPackageStore } from '@/stores/adminPackageStore';
import { usePackageStore } from '@/stores/packageStore';
import { Edit2, Save, X } from 'lucide-react';

export default function PackageTable() {
  const { packages, selectedCategory, selectedType } = useAdminPackageStore();
  const { updatePackage: updateMainPackage } = usePackageStore();
  const [editingId, setEditingId] = useState<string | null>(null);
  const [editForm, setEditForm] = useState<{
    price: string;
    discount: string;
  }>({ price: '', discount: '' });

  const filteredPackages = packages.filter((pkg) => {
    if (selectedCategory && pkg.category !== selectedCategory) return false;
    if (selectedType && pkg.type !== selectedType) return false;
    return true;
  });

  const handleEdit = (pkg: typeof packages[0]) => {
    setEditingId(pkg.id);
    setEditForm({
      price: pkg.price.toString(),
      discount: (pkg.discount || '0').toString(),
    });
  };

  const handleSave = (id: string) => {
    const price = parseFloat(editForm.price);
    const discount = parseFloat(editForm.discount);

    if (!isNaN(price) && !isNaN(discount)) {
      // Update both stores
      updateMainPackage(id, { 
        price,
        discount: discount > 0 ? discount : undefined
      });
    }
    setEditingId(null);
  };

  const handleCancel = () => {
    setEditingId(null);
    setEditForm({ price: '', discount: '' });
  };

  return (
    <div className="mt-6 overflow-x-auto">
      <table className="w-full border-collapse">
        <thead>
          <tr className="bg-gray-50 border-y border-gray-200">
            <th className="text-left py-3 px-4 font-medium text-gray-600">Name</th>
            <th className="text-left py-3 px-4 font-medium text-gray-600">Views</th>
            <th className="text-left py-3 px-4 font-medium text-gray-600">Category</th>
            <th className="text-left py-3 px-4 font-medium text-gray-600">Type</th>
            <th className="text-right py-3 px-4 font-medium text-gray-600">Price ($)</th>
            <th className="text-right py-3 px-4 font-medium text-gray-600">Discount (%)</th>
            <th className="text-right py-3 px-4 font-medium text-gray-600">Actions</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-gray-200">
          {filteredPackages.map((pkg) => (
            <tr key={pkg.id} className="hover:bg-gray-50">
              <td className="py-3 px-4">{pkg.name}</td>
              <td className="py-3 px-4">
                {pkg.viewCount >= 1000 
                  ? `${pkg.viewCount / 1000}K` 
                  : pkg.viewCount}
              </td>
              <td className="py-3 px-4 capitalize">{pkg.category}</td>
              <td className="py-3 px-4 capitalize">{pkg.type}</td>
              <td className="py-3 px-4">
                {editingId === pkg.id ? (
                  <Input
                    type="number"
                    value={editForm.price}
                    onChange={(e) => setEditForm({ ...editForm, price: e.target.value })}
                    className="w-24 text-right"
                    step="0.01"
                    min="0"
                  />
                ) : (
                  <div className="text-right">${pkg.price.toFixed(2)}</div>
                )}
              </td>
              <td className="py-3 px-4">
                {editingId === pkg.id ? (
                  <Input
                    type="number"
                    value={editForm.discount}
                    onChange={(e) => setEditForm({ ...editForm, discount: e.target.value })}
                    className="w-24 text-right"
                    step="1"
                    min="0"
                    max="100"
                  />
                ) : (
                  <div className="text-right">{pkg.discount || 0}%</div>
                )}
              </td>
              <td className="py-3 px-4">
                <div className="flex justify-end gap-2">
                  {editingId === pkg.id ? (
                    <>
                      <Button
                        size="sm"
                        variant="outline"
                        onClick={() => handleSave(pkg.id)}
                        className="text-green-600 hover:text-green-700"
                      >
                        <Save className="h-4 w-4" />
                      </Button>
                      <Button
                        size="sm"
                        variant="outline"
                        onClick={handleCancel}
                        className="text-red-600 hover:text-red-700"
                      >
                        <X className="h-4 w-4" />
                      </Button>
                    </>
                  ) : (
                    <Button
                      size="sm"
                      variant="outline"
                      onClick={() => handleEdit(pkg)}
                    >
                      <Edit2 className="h-4 w-4" />
                    </Button>
                  )}
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
