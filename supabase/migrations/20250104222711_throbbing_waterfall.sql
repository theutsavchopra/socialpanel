/*
  # Authentication and Roles Setup

  1. Tables
    - profiles: User profiles linked to auth.users
    - admins: Admin users with role management
  
  2. Security
    - Enable RLS on all tables
    - Add policies for data access
    - Create triggers for user creation

  3. Initial Data
    - Create test admin and user accounts
*/

-- Create profiles table if not exists
CREATE TABLE IF NOT EXISTS profiles (
  id uuid PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  email text UNIQUE NOT NULL,
  created_at timestamptz DEFAULT now() NOT NULL,
  updated_at timestamptz DEFAULT now() NOT NULL
);

-- Create admins table if not exists
CREATE TABLE IF NOT EXISTS admins (
  id uuid PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  email text UNIQUE NOT NULL,
  role text DEFAULT 'admin' NOT NULL,
  created_at timestamptz DEFAULT now() NOT NULL,
  updated_at timestamptz DEFAULT now() NOT NULL
);

-- Enable RLS
ALTER TABLE profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE admins ENABLE ROW LEVEL SECURITY;

-- Create policies
CREATE POLICY "Users can view own profile"
  ON profiles
  FOR SELECT
  TO authenticated
  USING (auth.uid() = id);

CREATE POLICY "Users can update own profile"
  ON profiles
  FOR UPDATE
  TO authenticated
  USING (auth.uid() = id);

CREATE POLICY "Admins can view all profiles"
  ON profiles
  FOR SELECT
  TO authenticated
  USING (EXISTS (
    SELECT 1 FROM admins WHERE admins.id = auth.uid()
  ));

-- Create updated_at trigger
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ language 'plpgsql';

-- Add triggers
CREATE TRIGGER update_profiles_updated_at
  BEFORE UPDATE ON profiles
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_admins_updated_at
  BEFORE UPDATE ON admins
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();

-- Create function to handle new user profiles
CREATE OR REPLACE FUNCTION handle_new_user()
RETURNS TRIGGER AS $$
BEGIN
  INSERT INTO profiles (id, email)
  VALUES (NEW.id, NEW.email);
  RETURN NEW;
END;
$$ language 'plpgsql';

-- Add trigger for new users
CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW
  EXECUTE FUNCTION handle_new_user();

-- Create test accounts using Supabase auth functions
DO $$
DECLARE
  admin_id uuid;
  user_id uuid;
BEGIN
  -- Create admin user
  SELECT id INTO admin_id
  FROM auth.users
  WHERE email = 'admin@test.com';

  IF admin_id IS NULL THEN
    INSERT INTO auth.users (email, encrypted_password, email_confirmed_at)
    VALUES (
      'admin@test.com',
      crypt('Admin123!', gen_salt('bf')),
      now()
    )
    RETURNING id INTO admin_id;
  END IF;

  -- Create regular user
  SELECT id INTO user_id
  FROM auth.users
  WHERE email = 'user@test.com';

  IF user_id IS NULL THEN
    INSERT INTO auth.users (email, encrypted_password, email_confirmed_at)
    VALUES (
      'user@test.com',
      crypt('User123!', gen_salt('bf')),
      now()
    )
    RETURNING id INTO user_id;
  END IF;

  -- Add admin role
  INSERT INTO admins (id, email, role)
  VALUES (admin_id, 'admin@test.com', 'super_admin')
  ON CONFLICT (id) DO NOTHING;
END;
$$;
