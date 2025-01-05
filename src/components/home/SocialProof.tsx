import { Users, Shield, Award, BadgeCheck } from 'lucide-react';

const reviews = [
  {
    name: 'Sarah Johnson',
    role: 'Content Creator',
    rating: 5,
    review: 'The worldwide views were delivered naturally and helped my video reach a broader audience. Great retention rate!',
    avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&h=100&fit=crop',
    metrics: { subscribers: '125K', views: '2.5M' }
  },
  {
    name: 'Michael Chen',
    role: 'Tech Reviewer',
    rating: 5,
    review: 'Premium views package exceeded expectations. High retention and engagement from USA viewers. Worth every penny!',
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop',
    metrics: { subscribers: '89K', views: '1.8M' }
  },
  {
    name: 'Emma Davis',
    role: 'Lifestyle Vlogger',
    rating: 5,
    review: 'The German targeted views helped my channel grow in the DACH region. Excellent geographic targeting!',
    avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100&h=100&fit=crop',
    metrics: { subscribers: '200K', views: '4.2M' }
  },
  {
    name: 'David Kim',
    role: 'Gaming Creator',
    rating: 5,
    review: 'Regular views package provided consistent growth. Perfect for gaming content targeting worldwide audience.',
    avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=100&h=100&fit=crop',
    metrics: { subscribers: '75K', views: '1.2M' }
  },
  {
    name: 'Sophie Martin',
    role: 'Educational Content',
    rating: 5,
    review: 'UK targeted views helped establish my educational channel in the British market. Excellent regional growth!',
    avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=100&h=100&fit=crop',
    metrics: { subscribers: '150K', views: '3.1M' }
  },
  {
    name: 'Alex Thompson',
    role: 'Music Artist',
    rating: 5,
    review: 'Premium worldwide views gave my music video the boost it needed. Amazing retention and engagement rates!',
    avatar: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=100&h=100&fit=crop',
    metrics: { subscribers: '95K', views: '2.8M' }
  },
  {
    name: 'Maria Garcia',
    role: 'Cooking Channel',
    rating: 5,
    review: 'The USA & Canada targeted views package helped my cooking channel reach North American audiences effectively.',
    avatar: 'https://images.unsplash.com/photo-1487412720507-e7ab37603c6f?w=100&h=100&fit=crop',
    metrics: { subscribers: '180K', views: '3.5M' }
  },
  {
    name: 'James Wilson',
    role: 'Business Coach',
    rating: 5,
    review: 'Australian targeted views delivered exactly as promised. Great way to build presence in the APAC region.',
    avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&h=100&fit=crop',
    metrics: { subscribers: '110K', views: '2.2M' }
  },
  {
    name: 'Lisa Anderson',
    role: 'Travel Vlogger',
    rating: 5,
    review: 'Premium European views helped my travel content reach the right audience. Excellent targeting and retention!',
    avatar: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=100&h=100&fit=crop',
    metrics: { subscribers: '165K', views: '3.8M' }
  }
];

const stats = [
  { value: '50Bn+', label: 'Views Delivered', icon: Users },
  { value: '99.9%', label: 'Satisfaction Rate', icon: Shield },
  { value: '24/7', label: 'Customer Support', icon: BadgeCheck },
  { value: '100%', label: 'Money Back Guarantee', icon: Award },
];

export default function SocialProof() {
  return (
    <section className="py-16 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="font-outfit text-3xl font-bold">Trusted by YouTubers Worldwide</h2>
          <p className="font-inter text-xl text-gray-600 mt-4">Join thousands of content creators who trust us</p>
        </div>

        {/* Reviews Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-16">
          {reviews.map((review, index) => (
            <div key={index} className="bg-gray-50 rounded-xl p-6 hover:shadow-lg transition-shadow">
              {/* Trustpilot-style Rating */}
              <div className="flex items-center mb-4">
                <div className="bg-[#00b67a] px-3 py-1.5 rounded flex items-center">
                  <svg className="h-5 w-5 text-white" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z" />
                  </svg>
                  <span className="text-white font-semibold ml-1 text-sm">Excellent</span>
                </div>
                <div className="text-[#00b67a] font-semibold ml-2 text-sm">5.0</div>
              </div>

              {/* Review Content */}
              <p className="font-inter text-sm text-gray-600 mb-4 line-clamp-3">{review.review}</p>

              {/* Reviewer Info */}
              <div className="flex items-center">
                <img 
                  src={review.avatar} 
                  alt={review.name} 
                  className="w-10 h-10 rounded-full object-cover"
                />
                <div className="ml-3">
                  <div className="font-outfit text-sm font-semibold text-gray-900">{review.name}</div>
                  <div className="font-inter text-xs text-gray-500">{review.role}</div>
                </div>
              </div>

              {/* Channel Metrics */}
              <div className="mt-4 grid grid-cols-2 gap-4 pt-4 border-t">
                <div>
                  <div className="font-outfit text-sm font-semibold text-gray-900">{review.metrics.subscribers}</div>
                  <div className="font-inter text-xs text-gray-500">Subscribers</div>
                </div>
                <div>
                  <div className="font-outfit text-sm font-semibold text-gray-900">{review.metrics.views}</div>
                  <div className="font-inter text-xs text-gray-500">Total Views</div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Stats Grid */}
        <div className="max-w-4xl mx-auto">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 py-8 px-6 bg-gradient-to-r from-gray-50 via-white to-gray-50 rounded-2xl border border-gray-100 shadow-sm">
            {stats.map((stat, index) => {
              const Icon = stat.icon;
              return (
                <div key={index} className="text-center">
                  <div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-red-100 mb-4">
                    <Icon className="h-6 w-6 text-red-600" />
                  </div>
                  <div className="font-outfit text-2xl font-bold text-gray-900">{stat.value}</div>
                  <div className="font-inter text-sm text-gray-600 mt-1">{stat.label}</div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
