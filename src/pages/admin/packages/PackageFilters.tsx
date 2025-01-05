import { Button } from '@/components/ui/button';
import { useAdminPackageStore } from '@/stores/adminPackageStore';

export default function PackageFilters() {
  const { 
    categories,
    types,
    selectedCategory,
    selectedType,
    setSelectedCategory,
    setSelectedType
  } = useAdminPackageStore();

  return (
    <div className="flex gap-4 mb-6">
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">Category</label>
        <div className="flex gap-2">
          {categories.map((category) => (
            <Button
              key={category.id}
              variant={selectedCategory === category.id ? "default" : "outline"}
              onClick={() => setSelectedCategory(
                selectedCategory === category.id ? null : category.id
              )}
            >
              {category.name}
            </Button>
          ))}
        </div>
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">Type</label>
        <div className="flex gap-2">
          {types.map((type) => (
            <Button
              key={type.id}
              variant={selectedType === type.id ? "default" : "outline"}
              onClick={() => setSelectedType(
                selectedType === type.id ? null : type.id
              )}
            >
              {type.name}
            </Button>
          ))}
        </div>
      </div>
    </div>
  );
}
