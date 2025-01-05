import { BarChart2 } from 'lucide-react';

export default function MetricsHeader() {
  return (
    <div className="flex items-center gap-3">
      <div className="p-2 rounded-lg bg-red-50">
        <BarChart2 className="h-6 w-6 text-red-500" />
      </div>
      <div>
        <h2 className="text-2xl font-semibold text-gray-900">Analytics Dashboard</h2>
        <p className="text-gray-600 mt-1">Track your business performance and growth</p>
      </div>
    </div>
  );
}
