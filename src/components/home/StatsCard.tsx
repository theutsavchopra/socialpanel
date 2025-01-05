import { LucideIcon } from 'lucide-react';

interface StatsCardProps {
  icon: LucideIcon;
  value: string;
  label: string;
}

export default function StatsCard({ icon: Icon, value, label }: StatsCardProps) {
  return (
    <div className="glass-card p-6 rounded-xl backdrop-blur-md">
      <div className="flex items-center gap-4">
        <div className="flex-shrink-0">
          <div className="p-2.5 rounded-lg bg-red-500/10">
            <Icon className="h-6 w-6 text-red-500" />
          </div>
        </div>
        <div>
          <div className="text-3xl font-space font-bold text-white tracking-tight">{value}</div>
          <div className="text-sm font-jakarta text-gray-300 mt-1 tracking-wide">{label}</div>
        </div>
      </div>
    </div>
  );
}
