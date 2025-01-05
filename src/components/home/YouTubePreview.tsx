import { Play, Eye, ThumbsUp } from 'lucide-react';
import { Counter } from '@/components/ui/counter';

export default function YouTubePreview() {
  return (
    <div className="relative">
      {/* Main preview card */}
      <div className="glass-card rounded-2xl p-4 relative">
        <div className="aspect-video bg-black/80 rounded-lg overflow-hidden relative">
          <div className="absolute inset-0 flex items-center justify-center">
            <Play className="h-16 w-16 text-white/80" />
          </div>
          <div className="absolute bottom-0 left-0 right-0 h-12 bg-gradient-to-t from-black to-transparent"></div>
        </div>
        <div className="mt-4 space-y-2">
          <div className="h-4 bg-white/10 rounded-full w-3/4"></div>
          <div className="h-4 bg-white/10 rounded-full w-1/2"></div>
        </div>
      </div>

      {/* Floating Stats Cards with higher z-index */}
      <div className="absolute -right-8 top-1/4 glass-card p-3 rounded-lg animate-float z-10">
        <div className="flex items-center gap-2">
          <Eye className="h-5 w-5 text-red-500" />
          <span className="text-sm font-medium text-white">
            +<Counter end={2500000} prefix="" suffix=" views" />
          </span>
        </div>
      </div>
      <div className="absolute -left-8 bottom-1/4 glass-card p-3 rounded-lg animate-float delay-150 z-10">
        <div className="flex items-center gap-2">
          <ThumbsUp className="h-5 w-5 text-red-500" />
          <span className="text-sm font-medium text-white">
            +<Counter end={125000} prefix="" suffix=" likes" />
          </span>
        </div>
      </div>
    </div>
  );
}
