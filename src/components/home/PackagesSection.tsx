import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Crown, Info } from 'lucide-react';
import PackageGrid from './packages/PackageGrid';
import PackageFeatures from './packages/PackageFeatures';
import TrustScore from './packages/TrustScore';
import { useState } from 'react';

export default function PackagesSection() {
  const [activeTab, setActiveTab] = useState<'regular' | 'premium'>('regular');

  return (
    <section className="py-20 bg-gradient-to-b from-white via-gray-50/50 to-white relative">
      {/* Decorative elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -left-40 top-20 w-80 h-80 bg-red-200 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob"></div>
        <div className="absolute -right-40 top-40 w-80 h-80 bg-orange-200 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob animation-delay-2000"></div>
      </div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="font-outfit text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            Choose Your Package
          </h2>
          <p className="font-inter text-xl text-gray-600">
            Select the perfect views package for your YouTube video
          </p>
        </div>

        <Tabs 
          defaultValue="regular" 
          className="w-full"
          onValueChange={(value) => setActiveTab(value as 'regular' | 'premium')}
        >
          <TabsList className="grid w-full max-w-md mx-auto grid-cols-2 mb-12">
            <TabsTrigger value="regular" className="font-outfit text-base">
              <span className="flex items-center gap-2">
                High Quality Views
              </span>
            </TabsTrigger>
            <TabsTrigger value="premium" className="font-outfit text-base">
              <span className="flex items-center gap-2">
                Premium Quality Views
                <Crown className="h-4 w-4 text-yellow-500" />
              </span>
            </TabsTrigger>
          </TabsList>

          <div className="grid lg:grid-cols-3 gap-8 items-start">
            <div className="lg:col-span-2">
              <TabsContent value="regular">
                <PackageGrid type="regular" />
              </TabsContent>
              <TabsContent value="premium">
                <PackageGrid type="premium" />
              </TabsContent>
            </div>

            <div className="lg:sticky lg:top-24">
              <div className="rounded-2xl p-6 bg-white/60 backdrop-blur-lg border border-gray-100 shadow-lg">
                <div className="flex items-center gap-2 mb-4">
                  <Info className="h-5 w-5 text-blue-500" />
                  <h3 className="font-outfit text-lg font-semibold">What's the difference?</h3>
                </div>
                <PackageFeatures type={activeTab} />
                <TrustScore />
              </div>
            </div>
          </div>
        </Tabs>
      </div>
    </section>
  );
}
