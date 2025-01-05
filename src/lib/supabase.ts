import { createClient } from '@supabase/supabase-js';

// Get environment variables
const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

// Validate required environment variables
if (!supabaseUrl || !supabaseAnonKey) {
  console.warn(
    'Missing Supabase configuration. Some features may not work properly.\n' +
    'Please click "Connect to Supabase" button to set up your project.'
  );
}

// Create Supabase client
export const supabase = createClient(
  supabaseUrl || 'https://placeholder.supabase.co',
  supabaseAnonKey || 'placeholder'
);

// Helper to check if Supabase is properly configured
export function isSupabaseConfigured(): boolean {
  return Boolean(supabaseUrl && supabaseAnonKey);
}

// Helper to check admin status without Supabase
export async function checkAdminStatusFallback(email: string): Promise<boolean> {
  // For development/demo purposes, consider these emails as admins
  const defaultAdmins = [
    'admin@example.com',
    'admin@test.com'
  ];
  return defaultAdmins.includes(email.toLowerCase());
}
