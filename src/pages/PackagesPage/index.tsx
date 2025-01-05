import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import PackageList from './PackageList';
import type { PackageType } from './types';

export default function PackagesPage() {
  return (
    <div className="container py-8">
      <h1 className="text-3xl font-bold text-center mb-8">Choose Your Package</h1>
      
      <Tabs defaultValue="worldwide" className="w-full">
        <div className="flex justify-center mb-8">
          <TabsList className="grid w-full max-w-md grid-cols-2">
            <TabsTrigger value="worldwide" className="px-8 py-3">Worldwide Views</TabsTrigger>
            <TabsTrigger value="geo" className="px-8 py-3">GEO Targeted Views</TabsTrigger>
          </TabsList>
        </div>

        <TabsContent value="worldwide">
          <PackageList type="worldwide" />
        </TabsContent>

        <TabsContent value="geo">
          <PackageList type="geo" />
        </TabsContent>
      </Tabs>
    </div>
  );
}
