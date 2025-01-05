/*
  # Admin Policies Migration
  
  1. Changes
    - Creates admin role enum if not exists
    - Creates admin policies with proper checks
    - Adds RLS policies for admin access
*/

-- Create admin role enum if it doesn't exist
DO $$
BEGIN
  IF NOT EXISTS (SELECT 1 FROM pg_type WHERE typname = 'admin_role') THEN
    CREATE TYPE admin_role AS ENUM ('admin', 'super_admin');
  END IF;
END
$$;

-- Drop existing policies if they exist
DO $$
BEGIN
  DROP POLICY IF EXISTS "Admins can view other admins" ON admins;
  DROP POLICY IF EXISTS "Super admins can manage admins" ON admins;
END
$$;

-- Create new policies
CREATE POLICY "Admins can view other admins"
  ON admins
  FOR SELECT
  TO authenticated
  USING (EXISTS (
    SELECT 1 FROM admins a WHERE a.id = auth.uid()
  ));

CREATE POLICY "Super admins can manage admins"
  ON admins
  FOR ALL
  TO authenticated
  USING (EXISTS (
    SELECT 1 FROM admins a 
    WHERE a.id = auth.uid() AND a.role = 'super_admin'::admin_role
  ));

-- Create test admin user if it doesn't exist
DO $$
DECLARE
  admin_id uuid;
BEGIN
  -- Get or create admin user
  SELECT id INTO admin_id
  FROM auth.users
  WHERE email = 'admin@test.com';

  -- Add admin role if user exists
  IF admin_id IS NOT NULL THEN
    INSERT INTO admins (id, email, role)
    VALUES (admin_id, 'admin@test.com', 'super_admin')
    ON CONFLICT (id) DO NOTHING;
  END IF;
END
$$;
