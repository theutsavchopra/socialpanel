import { useState } from 'react';
import { useUsersStore } from '@/stores/usersStore';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { useToast } from '@/components/ui/use-toast';

interface ResetPasswordDialogProps {
  isOpen: boolean;
  onClose: () => void;
  userId: string | null;
}

export default function ResetPasswordDialog({ 
  isOpen, 
  onClose, 
  userId 
}: ResetPasswordDialogProps) {
  const { resetPassword } = useUsersStore();
  const { toast } = useToast();
  const [isLoading, setIsLoading] = useState(false);

  const handleReset = async () => {
    if (!userId) return;
    
    setIsLoading(true);
    try {
      const newPassword = await resetPassword(userId);
      toast({
        title: "Password Reset Successful",
        description: `New temporary password: ${newPassword}`,
      });
      onClose();
    } catch (error) {
      toast({
        title: "Reset Failed",
        description: "Failed to reset password. Please try again.",
        variant: "destructive"
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Reset User Password</DialogTitle>
        </DialogHeader>
        <div className="py-4">
          <p className="text-gray-600">
            This will generate a new temporary password for the user. They will be required
            to change it upon their next login.
          </p>
        </div>
        <div className="flex justify-end gap-3">
          <Button variant="outline" onClick={onClose}>
            Cancel
          </Button>
          <Button 
            onClick={handleReset} 
            disabled={isLoading}
            className="bg-red-500 hover:bg-red-600"
          >
            {isLoading ? 'Resetting...' : 'Reset Password'}
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
