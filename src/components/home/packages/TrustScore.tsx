import { Star } from 'lucide-react';

const avatars = [
  'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop',
  'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&h=100&fit=crop',
  'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=100&h=100&fit=crop',
  'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100&h=100&fit=crop',
  'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&h=100&fit=crop'
];

export default function TrustScore() {
  return (
    <div className="mt-4 p-3 bg-white/60 backdrop-blur-lg border border-gray-100 rounded-xl">
      <div className="flex items-center gap-2">
        <div>
          <div className="font-outfit text-base font-semibold">Excellent</div>
          <div className="flex text-green-500 mt-0.5">
            {Array.from({ length: 5 }).map((_, i) => (
              <Star key={i} className="h-4 w-4 fill-current" />
            ))}
          </div>
        </div>
        <div className="ml-auto text-right">
          <div className="font-outfit text-2xl font-bold text-green-500">5.0</div>
          <div className="text-xs text-gray-600">Trust Score</div>
        </div>
      </div>
      <div className="mt-3 flex items-center gap-2">
        <div className="flex -space-x-1.5">
          {avatars.map((avatar, i) => (
            <div
              key={i}
              className="w-6 h-6 rounded-full border-2 border-white bg-gray-200"
              style={{
                backgroundImage: `url(${avatar})`,
                backgroundSize: 'cover',
                backgroundPosition: 'center'
              }}
            />
          ))}
        </div>
        <div className="text-xs text-gray-600">
          Based on 1,000+ reviews
        </div>
      </div>
    </div>
  );
}
