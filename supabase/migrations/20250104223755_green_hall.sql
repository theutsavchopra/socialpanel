/*
  # Create Admin User Migration
  
  1. Changes
    - Creates admin user in auth.users table
    - Adds admin role and permissions
    - Uses proper Supabase auth functions
*/

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
