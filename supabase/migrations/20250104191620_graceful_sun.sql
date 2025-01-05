/*
  # Admin System Setup

  1. New Tables
    - `admins`
      - `id` (uuid, primary key)
      - `email` (text, unique)
      - `password` (text)
      - `role` (admin_role enum)
      - `created_at` (timestamp)
      - `updated_at` (timestamp)
    
    - `admin_permissions`
      - `id` (uuid, primary key) 
      - `admin_id` (uuid, foreign key)
      - `name` (text)
      - `created_at` (timestamp)

  2. Security
    - Enable RLS on both tables
    - Add policies for admin access
*/

-- Create admin role enum
CREATE TYPE admin_role AS ENUM ('admin', 'super_admin');

-- Create admins table
CREATE TABLE IF NOT EXISTS admins (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  email text UNIQUE NOT NULL,
  password text NOT NULL,
  role admin_role NOT NULL DEFAULT 'admin',
  created_at timestamptz DEFAULT now() NOT NULL,
  updated_at timestamptz DEFAULT now() NOT NULL
);

-- Create admin_permissions table
CREATE TABLE IF NOT EXISTS admin_permissions (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  admin_id uuid REFERENCES admins(id) ON DELETE CASCADE NOT NULL,
  name text NOT NULL,
  created_at timestamptz DEFAULT now() NOT NULL,
  UNIQUE(admin_id, name)
);

-- Enable RLS
ALTER TABLE admins ENABLE ROW LEVEL SECURITY;
ALTER TABLE admin_permissions ENABLE ROW LEVEL SECURITY;

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

-- Create initial super admin
-- Password: Admin123! (hashed)
INSERT INTO admins (email, password, role)
VALUES (
  'admin@example.com',
  '$2a$10$xJ7Yt1UqKVE/HJ.7MxhPaOllOBGViA9v4pDXYkGJVx.J0Qq1Gq2Wy',
  'super_admin'
);

-- Add default permissions
INSERT INTO admin_permissions (admin_id, name)
SELECT 
  id as admin_id,
  unnest(ARRAY[
    'manage_users',
    'manage_orders',
    'manage_packages',
    'view_metrics',
    'manage_settings'
  ]) as name
FROM admins
WHERE email = 'admin@example.com';
