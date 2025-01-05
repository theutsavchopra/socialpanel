import { Shield, Clock, Award } from 'lucide-react';

const badges = [
  {
    icon: Shield,
    title: "100% Secure Payment",
    description: "Your payment information is fully encrypted"
  },
  {
    icon: Clock,
    title: "Instant Delivery",
    description: "Views start within 24-48 hours"
  },
  {
    icon: Award,
    title: "Money Back Guarantee",
    description: "30-day satisfaction guarantee"
  }
];

export default function SecurityBadges() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
      {badges.map(({ icon: Icon, title, description }) => (
        <div 
          key={title}
          className="flex items-center gap-3 p-4 rounded-lg bg-white/60 backdrop-blur-sm
                     border border-gray-100 shadow-sm hover:shadow-md transition-shadow"
        >
          <div className="flex-shrink-0">
            <div className="w-10 h-10 rounded-full bg-red-50 flex items-center justify-center">
              <Icon className="h-5 w-5 text-red-500" />
            </div>
          </div>
          <div>
            <h3 className="font-outfit text-sm font-medium text-gray-900">{title}</h3>
            <p className="text-xs text-gray-500">{description}</p>
          </div>
        </div>
      ))}
    </div>
  );
}
