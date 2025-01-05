import { checkAdminAccess, getAdminPermissions } from '@/lib/api/admin';
import { useAuthStore } from '@/stores/authStore';
import { isSupabaseConfigured, checkAdminStatusFallback } from '@/lib/supabase';

export async function verifyAdminStatus(): Promise<boolean> {
  const user = useAuthStore.getState().user;
  if (!user?.email) return false;

  try {
    // Use fallback check if Supabase is not configured
    const isAdmin = isSupabaseConfigured() 
      ? await checkAdminAccess(user.email)
      : await checkAdminStatusFallback(user.email);

    if (isAdmin) {
      // Set basic admin permissions if Supabase is not available
      const permissions = isSupabaseConfigured()
        ? await getAdminPermissions(user.email)
        : ['manage_users', 'manage_orders', 'manage_packages'];

      useAuthStore.setState(state => ({
        user: {
          ...state.user!,
          isAdmin: true,
          permissions
        }
      }));
    }
    return isAdmin;
  } catch (error) {
    console.error('Error verifying admin status:', error);
    return false;
  }
}
