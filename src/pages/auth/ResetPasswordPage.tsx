import { useState } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { useToast } from '@/components/ui/use-toast';
import { sendResetPasswordEmail, resetPassword } from '@/lib/api/auth';
import { Lock, Mail } from 'lucide-react';

const requestResetSchema = z.object({
  email: z.string().email('Please enter a valid email')
});

const resetSchema = z.object({
  password: z.string()
    .min(8, 'Password must be at least 8 characters')
    .regex(/[A-Z]/, 'Password must contain at least one uppercase letter')
    .regex(/[a-z]/, 'Password must contain at least one lowercase letter')
    .regex(/[0-9]/, 'Password must contain at least one number'),
  confirmPassword: z.string()
}).refine((data) => data.password === data.confirmPassword, {
  message: "Passwords don't match",
  path: ["confirmPassword"],
});

export default function ResetPasswordPage() {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const { toast } = useToast();
  const [isLoading, setIsLoading] = useState(false);

  const oobCode = searchParams.get('oobCode');

  const requestForm = useForm({
    resolver: zodResolver(requestResetSchema),
    defaultValues: { email: '' }
  });

  const resetForm = useForm({
    resolver: zodResolver(resetSchema),
    defaultValues: { 
      password: '',
      confirmPassword: ''
    }
  });

  const handleRequestReset = async (data: { email: string }) => {
    setIsLoading(true);
    try {
      await sendResetPasswordEmail(data.email);
      toast({
        title: 'Reset email sent',
        description: 'Please check your inbox for password reset instructions.',
        variant: 'success'
      });
    } catch (error) {
      toast({
        title: 'Failed to send reset email',
        description: error instanceof Error ? error.message : 'Please try again',
        variant: 'destructive'
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleReset = async (data: { password: string }) => {
    if (!oobCode) return;
    
    setIsLoading(true);
    try {
      await resetPassword(oobCode, data.password);
      toast({
        title: 'Password reset successful',
        description: 'You can now log in with your new password.',
        variant: 'success'
      });
      navigate('/auth/login');
    } catch (error) {
      toast({
        title: 'Failed to reset password',
        description: error instanceof Error ? error.message : 'Please try again',
        variant: 'destructive'
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8">
        <div className="text-center">
          <h2 className="text-3xl font-bold text-gray-900">Reset Password</h2>
          <p className="mt-2 text-gray-600">
            {oobCode 
              ? 'Enter your new password'
              : 'Enter your email to receive reset instructions'
            }
          </p>
        </div>

        <div className="bg-white p-8 rounded-xl shadow-sm border">
          {oobCode ? (
            <Form {...resetForm}>
              <form onSubmit={resetForm.handleSubmit(handleReset)} className="space-y-6">
                <FormField
                  control={resetForm.control}
                  name="password"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>New Password</FormLabel>
                      <FormControl>
                        <div className="relative">
                          <Lock className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
                          <Input 
                            type="password" 
                            className="pl-9"
                            placeholder="••••••••" 
                            {...field} 
                          />
                        </div>
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={resetForm.control}
                  name="confirmPassword"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Confirm Password</FormLabel>
                      <FormControl>
                        <div className="relative">
                          <Lock className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
                          <Input 
                            type="password" 
                            className="pl-9"
                            placeholder="••••••••" 
                            {...field} 
                          />
                        </div>
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <Button 
                  type="submit" 
                  className="w-full bg-red-500 hover:bg-red-600"
                  disabled={isLoading}
                >
                  {isLoading ? 'Resetting...' : 'Reset Password'}
                </Button>
              </form>
            </Form>
          ) : (
            <Form {...requestForm}>
              <form onSubmit={requestForm.handleSubmit(handleRequestReset)} className="space-y-6">
                <FormField
                  control={requestForm.control}
                  name="email"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Email address</FormLabel>
                      <FormControl>
                        <div className="relative">
                          <Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
                          <Input className="pl-9" placeholder="you@example.com" {...field} />
                        </div>
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <Button 
                  type="submit" 
                  className="w-full bg-red-500 hover:bg-red-600"
                  disabled={isLoading}
                >
                  {isLoading ? 'Sending...' : 'Send Reset Instructions'}
                </Button>
              </form>
            </Form>
          )}

          <div className="mt-6 text-center">
            <Button
              variant="link"
              className="text-gray-600 hover:text-gray-900"
              onClick={() => navigate('/auth/login')}
            >
              Back to login
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
