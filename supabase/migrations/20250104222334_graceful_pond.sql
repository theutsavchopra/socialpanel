/*
  # Add Test Accounts

  1. New Data
    - Test admin account
    - Test user account
    - Initial wallet for test user
  
  2. Security
    - Passwords are hashed with bcrypt
    - Admin role is set to 'super_admin'
*/

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

-- Create initial wallet for test user
INSERT INTO wallets (user_id, balance)
SELECT id, 100.00
FROM auth.users
WHERE email = 'user@test.com'
ON CONFLICT (user_id) DO NOTHING;
