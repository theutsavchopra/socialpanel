/*
  # Wallet System Schema

  1. New Tables
    - `wallets`
      - `id` (uuid, primary key)
      - `user_id` (uuid, foreign key)
      - `balance` (numeric)
      - `created_at` (timestamptz)
      - `updated_at` (timestamptz)
    
    - `wallet_transactions`
      - `id` (uuid, primary key)
      - `wallet_id` (uuid, foreign key)
      - `type` (enum: deposit, withdrawal, payment)
      - `amount` (numeric)
      - `status` (enum: pending, completed, failed)
      - `payment_method` (enum: stripe, cryptomus)
      - `metadata` (jsonb)
      - `created_at` (timestamptz)
      - `updated_at` (timestamptz)

  2. Security
    - Enable RLS on all tables
    - Add policies for wallet access
    - Add policies for transaction access
*/

-- Create wallet_transaction_type enum
CREATE TYPE wallet_transaction_type AS ENUM ('deposit', 'withdrawal', 'payment');

-- Create transaction_status enum
CREATE TYPE transaction_status AS ENUM ('pending', 'completed', 'failed');

-- Create payment_method enum
CREATE TYPE payment_method AS ENUM ('stripe', 'cryptomus');

-- Create wallets table
CREATE TABLE IF NOT EXISTS wallets (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
  balance numeric(10,2) NOT NULL DEFAULT 0.00 CHECK (balance >= 0),
  created_at timestamptz DEFAULT now() NOT NULL,
  updated_at timestamptz DEFAULT now() NOT NULL,
  UNIQUE(user_id)
);

-- Create wallet_transactions table
CREATE TABLE IF NOT EXISTS wallet_transactions (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  wallet_id uuid REFERENCES wallets(id) ON DELETE CASCADE NOT NULL,
  type wallet_transaction_type NOT NULL,
  amount numeric(10,2) NOT NULL CHECK (amount > 0),
  status transaction_status NOT NULL DEFAULT 'pending',
  payment_method payment_method,
  metadata jsonb DEFAULT '{}'::jsonb,
  created_at timestamptz DEFAULT now() NOT NULL,
  updated_at timestamptz DEFAULT now() NOT NULL
);

-- Enable RLS
ALTER TABLE wallets ENABLE ROW LEVEL SECURITY;
ALTER TABLE wallet_transactions ENABLE ROW LEVEL SECURITY;

-- Create policies for wallets
CREATE POLICY "Users can view own wallet"
  ON wallets
  FOR SELECT
  TO authenticated
  USING (auth.uid() = user_id);

CREATE POLICY "System can manage all wallets"
  ON wallets
  TO service_role
  USING (true);

-- Create policies for wallet_transactions
CREATE POLICY "Users can view own transactions"
  ON wallet_transactions
  FOR SELECT
  TO authenticated
  USING (
    wallet_id IN (
      SELECT id FROM wallets WHERE user_id = auth.uid()
    )
  );

CREATE POLICY "System can manage all transactions"
  ON wallet_transactions
  TO service_role
  USING (true);

-- Create updated_at trigger function
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ language 'plpgsql';

-- Add triggers
CREATE TRIGGER update_wallets_updated_at
  BEFORE UPDATE ON wallets
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_wallet_transactions_updated_at
  BEFORE UPDATE ON wallet_transactions
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();
