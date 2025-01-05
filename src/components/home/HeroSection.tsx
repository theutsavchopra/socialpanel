import { ArrowRight, Play, Youtube, ThumbsUp, Eye, Shield } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';
import StatsCard from './StatsCard';
import YouTubePreview from './YouTubePreview';

export default function HeroSection() {
  const stats = [
    { icon: Eye, value: '10M+', label: 'Views Delivered' },
    { icon: ThumbsUp, value: '99%', label: 'Satisfaction Rate' },
    { icon: Shield, value: '24/7', label: 'Active Support' },
  ];

  return (
    <div className="relative min-h-screen bg-gradient-to-b from-gray-900 via-gray-900 to-black overflow-hidden">
      {/* Animated Background Elements */}
      <div className="absolute inset-0 bg-hero-pattern opacity-5"></div>
      <div className="absolute top-20 left-10 w-96 h-96 bg-red-500/10 rounded-full filter blur-[120px] animate-pulse-slow"></div>
      <div className="absolute bottom-20 right-10 w-96 h-96 bg-orange-500/10 rounded-full filter blur-[120px] animate-pulse-slow"></div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-20">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          <div className="text-center lg:text-left">
            <div className="space-y-10">
              <div className="inline-flex items-center px-4 py-2 rounded-full glass-card">
                <Youtube className="h-4 w-4 text-red-500 mr-2" />
                <span className="text-sm text-red-400 font-medium tracking-wide">Trusted by 100K+ YouTubers</span>
              </div>
              
              <h1 className="text-5xl lg:text-7xl font-bold leading-tight text-white tracking-tight font-outfit">
                Boost Your
                <span className="block gradient-text font-extrabold">YouTube Views</span>
              </h1>

              <p className="text-xl text-gray-300 max-w-2xl mx-auto lg:mx-0 font-inter font-light leading-relaxed">
                Get real, high-quality views from genuine viewers. Fast delivery, secure process, 
                and 24/7 support to skyrocket your channel's growth.
              </p>
              
              <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
                <Link to="/packages">
                  <Button size="lg" className="w-full sm:w-auto bg-red-600 hover:bg-red-700 text-white font-medium tracking-wide">
                    Get Started
                    <ArrowRight className="ml-2 h-5 w-5" />
                  </Button>
                </Link>
                <Button 
                  size="lg" 
                  variant="outline" 
                  className="w-full sm:w-auto border-red-500/20 hover:bg-red-500/10 hover:text-red-400 text-red-400 font-medium tracking-wide"
                >
                  How It Works
                  <Play className="ml-2 h-5 w-5" />
                </Button>
              </div>
            </div>
          </div>

          <div className="relative hidden lg:block">
            <YouTubePreview />
          </div>
        </div>

        {/* Stats Section */}
        <div className="mt-20 pb-32">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {stats.map((stat, index) => (
              <StatsCard key={index} {...stat} />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
