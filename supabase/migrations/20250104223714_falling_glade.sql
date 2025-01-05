/*
  # Create Admin User

  1. Changes
    - Create admin user with email and password
    - Add admin role and permissions
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

  -- If user doesn't exist, create it
  IF new_user_id IS NULL THEN
    -- Create user in auth.users
    INSERT INTO auth.users (
      email,
      raw_user_meta_data,
      email_confirmed_at
    ) VALUES (
      'admin@test.com',
      jsonb_build_object(
        'name', 'Admin User',
        'role', 'super_admin'
      ),
      now()
    )
    RETURNING id INTO new_user_id;

    -- Set password using auth.users
    UPDATE auth.users
    SET encrypted_password = crypt('Admin123!', gen_salt('bf'))
    WHERE id = new_user_id;
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
