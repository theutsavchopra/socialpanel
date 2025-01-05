import { Shield, Clock, Award, Lock, Star, Users } from 'lucide-react';

const features = [
  {
    icon: Lock,
    title: 'Privacy & Discretion Assured',
    description: 'Your personal data and account information are protected with enterprise-grade security'
  },
  {
    icon: Shield,
    title: '100% Risk-Free Guaranteed',
    description: 'Advanced Smart Delivery Technology ensures complete safety for your YouTube account'
  },
  {
    icon: Clock,
    title: '24/7 Support',
    description: 'Our dedicated support team is always ready to help you with any questions'
  },
  {
    icon: Award,
    title: 'Service Guarantee',
    description: 'Comprehensive 30-day guarantee with full support and monitoring'
  },
  {
    icon: Star,
    title: 'Higher Quality Results',
    description: 'Continuous service improvement with real-time delivery oversight'
  },
  {
    icon: Users,
    title: 'Simple & Secure Process',
    description: 'Just provide your video URL - no password or sensitive data required'
  }
];

export default function WhyChooseUs() {
  return (
    <section className="py-24 relative overflow-hidden bg-gradient-to-b from-gray-50 via-white to-gray-50">
      {/* Animated background elements */}
      <div className="absolute inset-0">
        <div className="absolute top-1/4 left-0 w-[500px] h-[500px] bg-red-100/40 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob"></div>
        <div className="absolute top-1/4 right-0 w-[500px] h-[500px] bg-orange-100/40 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob animation-delay-2000"></div>
      </div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="font-outfit text-4xl font-bold text-gray-900 mb-4">
            Why Choose Us?
          </h2>
          <p className="font-inter text-xl text-gray-600 max-w-3xl mx-auto">
            Experience premium YouTube promotion services with unmatched quality and security
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => {
            const Icon = feature.icon;
            return (
              <div
                key={index}
                className="group relative rounded-2xl p-6 transition-all duration-300
                          backdrop-blur-[12px] bg-white/40
                          border border-white
                          shadow-[0_0_1px_1px_rgba(0,0,0,0.05)]
                          hover:shadow-[0_0_40px_-15px_rgba(239,68,68,0.3)]
                          hover:bg-white/60"
              >
                {/* Card inner glow effect */}
                <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-white/50 via-white/25 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                
                <div className="relative">
                  <div className="inline-flex items-center justify-center w-14 h-14 
                                rounded-xl bg-gradient-to-br from-red-500/10 to-red-500/5 mb-5 
                                group-hover:scale-110 group-hover:from-red-500/20 group-hover:to-red-500/10 
                                transition-all duration-300 ease-out
                                shadow-[0_0_20px_-3px_rgba(239,68,68,0.3)]">
                    <Icon className="h-7 w-7 text-red-500" />
                  </div>
                  <h3 className="font-outfit text-xl font-semibold text-gray-900 mb-2">
                    {feature.title}
                  </h3>
                  <p className="font-inter text-gray-600">
                    {feature.description}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
