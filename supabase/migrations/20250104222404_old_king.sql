/*
  # Add Test Accounts

  1. New Tables
    - Create auth schema if not exists
    - Create auth.users table if not exists
    - Create admins table if not exists
  
  2. Test Data
    - Add test admin account
    - Add test user account
    - Create initial wallet for test user
*/

-- Create auth schema if not exists
CREATE SCHEMA IF NOT EXISTS auth;

-- Create auth.users table if not exists
CREATE TABLE IF NOT EXISTS auth.users (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  email text UNIQUE NOT NULL,
  encrypted_password text NOT NULL,
  email_confirmed_at timestamptz,
  role text DEFAULT 'authenticated'
);

-- Create admins table if not exists
CREATE TABLE IF NOT EXISTS admins (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  email text UNIQUE NOT NULL,
  role text DEFAULT 'admin'
);

-- Insert test admin account
INSERT INTO auth.users (
  email,
  encrypted_password,
  email_confirmed_at,
  role
) VALUES (
  'admin@test.com',
  -- Password: Admin123!
  '$2a$10$xJ7Yt1UqKVE/HJ.7MxhPaOllOBGViA9v4pDXYkGJVx.J0Qq1Gq2Wy',
  NOW(),
  'authenticated'
) ON CONFLICT (email) DO NOTHING;

-- Add admin role
INSERT INTO admins (email, role)
VALUES ('admin@test.com', 'super_admin')
ON CONFLICT (email) DO NOTHING;

-- Insert test user account
INSERT INTO auth.users (
  email,
  encrypted_password,
  email_confirmed_at,
  role
) VALUES (
  'user@test.com',
  -- Password: User123!
  '$2a$10$NqmqGPWxNCKHyCS.VX/Xz.YzQhECE1JqGYVB5GbX.ab4Mqd0HBKji',
  NOW(),
  'authenticated'
) ON CONFLICT (email) DO NOTHING;
