import HeroSection from '@/components/home/HeroSection';
import MainUSP from '@/components/home/MainUSP';
import PackagesSection from '@/components/home/PackagesSection';
import HowItWorks from '@/components/home/HowItWorks';
import SocialProof from '@/components/home/SocialProof';
import WhyChooseUs from '@/components/home/WhyChooseUs';
import FAQ from '@/components/home/FAQ';

export default function LandingPage() {
  return (
    <div className="min-h-screen">
      <HeroSection />
      <MainUSP />
      <PackagesSection />
      <HowItWorks />
      <SocialProof />
      <WhyChooseUs />
      <FAQ />
    </div>
  );
}
