/*
  # Add Admin Role

  1. Add admin role for test admin account
  2. Set up admin permissions
*/

-- Add admin role for test account
INSERT INTO admins (id, email, role)
SELECT 
  id,
  email,
  'super_admin'
FROM profiles 
WHERE email = 'admin@test.com'
ON CONFLICT (email) DO NOTHING;
