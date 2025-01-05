import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuthStore } from '@/stores/authStore';
import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { useToast } from '@/components/ui/use-toast';
import { 
  LogIn, 
  LogOut, 
  User, 
  Settings, 
  Shield,
  ChevronDown,
  Wallet,
  ShoppingBag
} from 'lucide-react';

export default function UserMenu() {
  const navigate = useNavigate();
  const { user, logout } = useAuthStore();
  const { toast } = useToast();
  const [isLoading, setIsLoading] = useState(false);

  const handleLogout = async () => {
    setIsLoading(true);
    try {
      await logout();
      toast({
        title: 'Logged out',
        description: 'You have been successfully logged out.',
        variant: 'success'
      });
      navigate('/');
    } catch (error) {
      toast({
        title: 'Logout failed',
        description: error instanceof Error ? error.message : 'Please try again',
        variant: 'destructive'
      });
    } finally {
      setIsLoading(false);
    }
  };

  if (!user) {
    return (
      <div className="flex items-center gap-2">
        <Link to="/auth/signup">
          <Button variant="ghost">Sign up</Button>
        </Link>
        <Link to="/auth/login">
          <Button className="bg-red-500 hover:bg-red-600">
            <LogIn className="h-4 w-4 mr-2" />
            Login
          </Button>
        </Link>
      </div>
    );
  }

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button 
          variant="ghost" 
          className="flex items-center gap-2"
          disabled={isLoading}
        >
          <User className="h-4 w-4" />
          <span className="hidden sm:inline-block">{user.email}</span>
          <ChevronDown className="h-4 w-4" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-56">
        <DropdownMenuItem asChild>
          <Link to="/dashboard" className="flex items-center">
            <User className="h-4 w-4 mr-2" />
            Dashboard
          </Link>
        </DropdownMenuItem>
        <DropdownMenuItem asChild>
          <Link to="/orders" className="flex items-center">
            <ShoppingBag className="h-4 w-4 mr-2" />
            My Orders
          </Link>
        </DropdownMenuItem>
        <DropdownMenuItem asChild>
          <Link to="/wallet" className="flex items-center">
            <Wallet className="h-4 w-4 mr-2" />
            Wallet
          </Link>
        </DropdownMenuItem>
        {user.isAdmin && (
          <>
            <DropdownMenuSeparator />
            <DropdownMenuItem asChild>
              <Link to="/admin" className="flex items-center">
                <Shield className="h-4 w-4 mr-2" />
                Admin Dashboard
              </Link>
            </DropdownMenuItem>
          </>
        )}
        <DropdownMenuSeparator />
        <DropdownMenuItem 
          className="text-red-600 focus:text-red-600 focus:bg-red-50"
          onClick={handleLogout}
          disabled={isLoading}
        >
          <LogOut className="h-4 w-4 mr-2" />
          {isLoading ? 'Logging out...' : 'Logout'}
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
