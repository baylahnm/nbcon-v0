-- Add stripe_customer_id column to profiles table
ALTER TABLE profiles
  ADD COLUMN IF NOT EXISTS stripe_customer_id text;

-- Create index for faster lookups
CREATE INDEX IF NOT EXISTS idx_profiles_stripe_customer_id ON profiles(stripe_customer_id);

-- Update existing profiles to have stripe_customer_id nullable
-- (No default value needed - will be populated when user creates checkout session)

