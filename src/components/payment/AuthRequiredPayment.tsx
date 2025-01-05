import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { LogIn } from 'lucide-react';

interface AuthRequiredPaymentProps {
  amount: number;
  returnUrl: string;
}

export default function AuthRequiredPayment({ amount, returnUrl }: AuthRequiredPaymentProps) {
  const navigate = useNavigate();

  const handleLogin = () => {
    // Encode the return URL to preserve special characters
    const encodedReturnUrl = encodeURIComponent(returnUrl);
    navigate(`/auth/login?returnUrl=${encodedReturnUrl}`);
  };

  return (
    <Button
      onClick={handleLogin}
      className="w-full bg-blue-600 hover:bg-blue-700 text-lg py-6"
    >
      <LogIn className="mr-2 h-5 w-5" />
      Login to Continue Payment (${amount.toFixed(2)})
    </Button>
  );
}
