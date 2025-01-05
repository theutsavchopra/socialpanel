import { supabase } from '@/lib/supabase/client';
import type { LoginCredentials, SignupCredentials } from '@/types/auth';

export async function login({ email, password }: LoginCredentials) {
  const { data: { session }, error } = await supabase.auth.signInWithPassword({
    email,
    password
  });

  if (error) throw error;
  if (!session?.user) throw new Error('Login failed');

  // Check admin status
  const { data: admin } = await supabase
    .from('admins')
    .select('role')
    .eq('email', email)
    .single();

  return {
    id: session.user.id,
    email: session.user.email!,
    emailVerified: true,
    isAdmin: !!admin,
    adminRole: admin?.role
  };
}

export async function signup({ email, password }: SignupCredentials) {
  const { data: { session }, error } = await supabase.auth.signUp({
    email,
    password,
    options: {
      emailRedirectTo: `${window.location.origin}/auth/callback`
    }
  });

  if (error) throw error;
  if (!session?.user) throw new Error('Signup failed');

  return {
    id: session.user.id,
    email: session.user.email!,
    emailVerified: false,
    isAdmin: false
  };
}

export async function signOut() {
  const { error } = await supabase.auth.signOut();
  if (error) throw error;
}

export function onAuthChange(callback: (user: any) => void) {
  return supabase.auth.onAuthStateChange(async (event, session) => {
    if (session?.user) {
      // Check admin status
      const { data: admin } = await supabase
        .from('admins')
        .select('role')
        .eq('email', session.user.email)
        .single();

      callback({
        id: session.user.id,
        email: session.user.email!,
        emailVerified: true,
        isAdmin: !!admin,
        adminRole: admin?.role
      });
    } else {
      callback(null);
    }
  });
}
