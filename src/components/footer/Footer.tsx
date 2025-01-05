import { Youtube } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useSettingsStore } from '@/stores/settingsStore';
import FooterLinks from './FooterLinks';
import FooterNewsletter from './FooterNewsletter';
import FooterSocials from './FooterSocials';

export default function Footer() {
  const { siteName, supportEmail } = useSettingsStore(state => state.settings);
  const currentYear = new Date().getFullYear();

  return (
    <footer className="relative bg-gray-900">
      {/* Gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-b from-gray-900/50 to-gray-900"></div>
      
      {/* Animated background elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -left-40 top-0 w-96 h-96 bg-red-500/5 rounded-full mix-blend-overlay filter blur-3xl"></div>
        <div className="absolute -right-40 top-20 w-96 h-96 bg-orange-500/5 rounded-full mix-blend-overlay filter blur-3xl"></div>
      </div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Main footer content */}
        <div className="py-12 lg:py-16">
          <div className="grid lg:grid-cols-2 gap-12 lg:gap-8">
            {/* Left column */}
            <div className="space-y-8">
              {/* Logo */}
              <Link to="/" className="flex items-center gap-2">
                <Youtube className="h-8 w-8 text-red-500" />
                <span className="text-xl font-bold text-white font-outfit">
                  {siteName}
                </span>
              </Link>
              
              {/* Description */}
              <p className="text-gray-400 max-w-md">
                Your trusted partner for YouTube growth. We provide high-quality views 
                and engagement services to help your content reach its full potential.
              </p>
              
              {/* Social links */}
              <FooterSocials />
            </div>

            {/* Right column */}
            <div className="grid gap-12">
              <FooterLinks />
            </div>
          </div>
        </div>

        {/* Newsletter section */}
        <div className="py-16">
          <FooterNewsletter />
        </div>

        {/* Bottom border */}
        <div className="border-t border-white/5"></div>

        {/* Bottom bar */}
        <div className="py-6">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-gray-400 text-sm">
              © {currentYear} {siteName}. All rights reserved.
            </p>
            <div className="flex gap-6">
              <Link to="/terms" className="text-gray-400 hover:text-white text-sm">
                Terms
              </Link>
              <Link to="/privacy" className="text-gray-400 hover:text-white text-sm">
                Privacy
              </Link>
              <a 
                href={`mailto:${supportEmail}`} 
                className="text-gray-400 hover:text-white text-sm"
              >
                Contact
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
