import { Shield, Users, PiggyBank, BadgeCheck } from 'lucide-react';

const usps = [
  {
    icon: Shield,
    title: '100% Real and Safe Views',
    description: 'High-quality views from genuine users that comply with YouTube policies'
  },
  {
    icon: Users,
    title: 'No Third Party Involved',
    description: 'Direct service delivery ensuring maximum security and reliability'
  },
  {
    icon: PiggyBank,
    title: 'Affordable Pricing',
    description: 'Best market rates with flexible packages for every budget'
  },
  {
    icon: BadgeCheck,
    title: 'Money Back Guarantee',
    description: 'Risk-free service with 100% satisfaction guarantee'
  }
];

export default function MainUSP() {
  return (
    <section className="relative py-20 bg-gradient-to-b from-white via-gray-50/50 to-white">
      {/* Decorative elements for glass effect visibility */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -left-40 top-20 w-80 h-80 bg-red-200 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob"></div>
        <div className="absolute -right-40 top-40 w-80 h-80 bg-orange-200 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob animation-delay-2000"></div>
        <div className="absolute left-40 bottom-20 w-80 h-80 bg-pink-200 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob animation-delay-4000"></div>
      </div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="font-outfit text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            Why We're Far Better
          </h2>
          <p className="font-inter text-xl text-gray-600">
            Experience the best YouTube views service in the market
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {usps.map((usp, index) => {
            const Icon = usp.icon;
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
                    {usp.title}
                  </h3>
                  <p className="font-inter text-gray-600 line-clamp-2">
                    {usp.description}
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
