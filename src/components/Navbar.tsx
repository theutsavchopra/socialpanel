import { Link } from 'react-router-dom';
import { Button } from './ui/button';
import { Youtube, Shield, LogIn } from 'lucide-react';
import { useAuthStore } from '@/stores/authStore';
import UserMenu from './auth/UserMenu';

export default function Navbar() {
  const { user } = useAuthStore();
  const siteName = "SMM Store";

  return (
    <nav className="fixed w-full z-50 bg-white/80 backdrop-blur-md border-b border-gray-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <Link to="/" className="flex items-center">
            <Youtube className="h-8 w-8 text-red-600" />
            <span className="ml-2 text-xl font-bold font-outfit">{siteName}</span>
          </Link>

          <div className="flex items-center gap-4">
            {user ? (
              <UserMenu />
            ) : (
              <div className="flex items-center gap-2">
                <Link to="/auth/login">
                  <Button variant="ghost" className="gap-2">
                    <LogIn className="h-4 w-4" />
                    Login
                  </Button>
                </Link>
                <Link to="/auth/admin/login">
                  <Button variant="ghost" className="gap-2">
                    <Shield className="h-4 w-4" />
                    Admin
                  </Button>
                </Link>
                <Link to="/auth/signup">
                  <Button className="bg-red-500 hover:bg-red-600">
                    Get Started
                  </Button>
                </Link>
              </div>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
}
