import { useState } from 'react';
import { useAuthStore } from '@/stores/authStore';
import { resendVerificationEmail } from '@/lib/api/auth';
import { useToast } from '@/components/ui/use-toast';
import { AlertTriangle } from 'lucide-react';
import { Button } from '@/components/ui/button';

export default function EmailVerificationBanner() {
  const { user } = useAuthStore();
  const { toast } = useToast();
  const [isResending, setIsResending] = useState(false);

  if (!user || user.emailVerified) return null;

  const handleResend = async () => {
    setIsResending(true);
    try {
      await resendVerificationEmail();
      toast({
        title: 'Verification email sent',
        description: 'Please check your inbox and follow the link to verify your email.',
        variant: 'success'
      });
    } catch (error) {
      toast({
        title: 'Failed to send verification email',
        description: error instanceof Error ? error.message : 'Please try again later',
        variant: 'destructive'
      });
    } finally {
      setIsResending(false);
    }
  };

  return (
    <div className="bg-yellow-50 border-b border-yellow-100">
      <div className="max-w-7xl mx-auto py-3 px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between flex-wrap gap-2">
          <div className="flex items-center">
            <AlertTriangle className="h-5 w-5 text-yellow-600 mr-2" />
            <p className="text-yellow-700">
              Please verify your email address to access all features
            </p>
          </div>
          <Button
            variant="outline"
            size="sm"
            onClick={handleResend}
            disabled={isResending}
            className="text-yellow-700 border-yellow-300 hover:bg-yellow-100"
          >
            {isResending ? 'Sending...' : 'Resend verification email'}
          </Button>
        </div>
      </div>
    </div>
  );
}
