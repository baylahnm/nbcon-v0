-- Add subscription columns to profiles table
ALTER TABLE profiles
  ADD COLUMN IF NOT EXISTS subscription_tier text DEFAULT 'free',
  ADD COLUMN IF NOT EXISTS is_admin boolean DEFAULT false;

-- Create billing_events table
CREATE TABLE IF NOT EXISTS billing_events (
  id uuid PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id uuid REFERENCES auth.users(id) ON DELETE CASCADE,
  stripe_event text NOT NULL,
  tier text NOT NULL,
  status text NOT NULL,
  created_at timestamptz DEFAULT now()
);

-- Create index for faster queries
CREATE INDEX IF NOT EXISTS idx_billing_events_user_id ON billing_events(user_id);
CREATE INDEX IF NOT EXISTS idx_billing_events_created_at ON billing_events(created_at);

-- Enable RLS
ALTER TABLE billing_events ENABLE ROW LEVEL SECURITY;

-- RLS Policy: Users can view their own billing events
CREATE POLICY "Users can view own billing events"
  ON billing_events
  FOR SELECT
  USING (auth.uid() = user_id);

-- Update profiles RLS to allow tier updates via service role
-- (Service role will bypass RLS in webhook handler)

