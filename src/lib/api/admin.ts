import { supabase } from '@/lib/supabase';

export async function checkAdminAccess(email: string): Promise<boolean> {
  try {
    const { data, error } = await supabase
      .from('admins')
      .select('id, role')
      .eq('email', email)
      .single();

    if (error) throw error;
    return !!data;
  } catch (error) {
    console.error('Failed to check admin access:', error);
    return false;
  }
}

export async function getAdminPermissions(email: string) {
  try {
    const { data, error } = await supabase
      .from('admin_permissions')
      .select(`
        name,
        admins!inner(email)
      `)
      .eq('admins.email', email);

    if (error) throw error;
    return data.map(p => p.name);
  } catch (error) {
    console.error('Failed to get admin permissions:', error);
    return [];
  }
}
