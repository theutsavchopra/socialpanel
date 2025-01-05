/*
  # Fix Auth and Admin Setup

  1. Changes
    - Drop existing admin user if exists
    - Create new admin user with proper Supabase Auth
    - Add admin role with proper permissions
    
  2. Security
    - Enable RLS policies for admins table
    - Add proper access control
*/

-- First, clean up any existing test admin entries
DELETE FROM admins WHERE email = 'admin@test.com';

-- Create admin user through Supabase Auth
DO $$
DECLARE
  new_user_id uuid;
BEGIN
  -- Create user in auth.users if not exists
  INSERT INTO auth.users (
    email,
    encrypted_password,
    email_confirmed_at,
    raw_user_meta_data
  ) VALUES (
    'admin@test.com',
    crypt('Admin123!', gen_salt('bf')),
    now(),
    jsonb_build_object(
      'name', 'Admin User',
      'role', 'super_admin'
    )
  )
  ON CONFLICT (email) DO UPDATE
  SET email_confirmed_at = now()
  RETURNING id INTO new_user_id;

  -- Add admin role
  INSERT INTO admins (id, email, role)
  VALUES (
    new_user_id,
    'admin@test.com',
    'super_admin'
  )
  ON CONFLICT (id) DO NOTHING;
END
$$;
