/*
  # Create Admin User Migration
  
  1. Changes
    - Creates admin user in auth.users table
    - Adds admin role and permissions
    - Uses proper Supabase auth functions
*/

-- Create admin role enum if it doesn't exist
DO $$
BEGIN
  IF NOT EXISTS (SELECT 1 FROM pg_type WHERE typname = 'admin_role') THEN
    CREATE TYPE admin_role AS ENUM ('admin', 'super_admin');
  END IF;
END
$$;

-- Create or replace admins table
CREATE TABLE IF NOT EXISTS admins (
  id uuid PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  email text UNIQUE NOT NULL,
  role admin_role NOT NULL DEFAULT 'admin',
  created_at timestamptz DEFAULT now() NOT NULL,
  updated_at timestamptz DEFAULT now() NOT NULL
);

-- Enable RLS
ALTER TABLE admins ENABLE ROW LEVEL SECURITY;

-- Create policies
CREATE POLICY "Admins can view other admins"
  ON admins
  FOR SELECT
  TO authenticated
  USING (EXISTS (
    SELECT 1 FROM admins a WHERE a.id = auth.uid()
  ));

CREATE POLICY "Super admins can manage admins"
  ON admins
  USING (EXISTS (
    SELECT 1 FROM admins a 
    WHERE a.id = auth.uid() AND a.role = 'super_admin'
  ));

-- Create admin user if not exists
DO $$
DECLARE
  new_user_id uuid;
BEGIN
  -- First try to get existing user
  SELECT id INTO new_user_id
  FROM auth.users
  WHERE email = 'admin@test.com';

  -- If user doesn't exist, create it using auth.users()
  IF new_user_id IS NULL THEN
    INSERT INTO auth.users (
      instance_id,
      id,
      aud,
      role,
      email,
      encrypted_password,
      email_confirmed_at,
      raw_app_meta_data,
      raw_user_meta_data,
      created_at,
      updated_at,
      confirmation_token,
      email_change,
      email_change_token_new,
      recovery_token
    ) VALUES (
      '00000000-0000-0000-0000-000000000000',
      uuid_generate_v4(),
      'authenticated',
      'authenticated',
      'admin@test.com',
      crypt('Admin123!', gen_salt('bf')),
      now(),
      '{"provider": "email", "providers": ["email"]}',
      '{"name": "Admin User", "role": "super_admin"}',
      now(),
      now(),
      encode(gen_random_bytes(32), 'base64'),
      null,
      null,
      null
    ) RETURNING id INTO new_user_id;
  END IF;

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
