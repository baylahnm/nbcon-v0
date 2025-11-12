-- Create changelog_entries table
CREATE TABLE IF NOT EXISTS changelog_entries (
  id uuid PRIMARY KEY DEFAULT uuid_generate_v4(),
  version text NOT NULL UNIQUE,
  date date NOT NULL,
  type text NOT NULL CHECK (type IN ('major', 'minor', 'patch', 'hotfix')),
  highlights text[] DEFAULT '{}',
  categories jsonb DEFAULT '{}',
  full_notes text,
  related_docs text[] DEFAULT '{}',
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Create email_subscriptions table for changelog updates
CREATE TABLE IF NOT EXISTS changelog_email_subscriptions (
  id uuid PRIMARY KEY DEFAULT uuid_generate_v4(),
  email text NOT NULL,
  frequency text DEFAULT 'weekly' CHECK (frequency IN ('weekly', 'monthly', 'immediate')),
  verified boolean DEFAULT false,
  verification_token text,
  unsubscribed boolean DEFAULT false,
  unsubscribed_at timestamptz,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now(),
  UNIQUE(email)
);

-- Create indexes for faster queries
CREATE INDEX IF NOT EXISTS idx_changelog_entries_version ON changelog_entries(version);
CREATE INDEX IF NOT EXISTS idx_changelog_entries_date ON changelog_entries(date DESC);
CREATE INDEX IF NOT EXISTS idx_changelog_entries_type ON changelog_entries(type);
CREATE INDEX IF NOT EXISTS idx_changelog_email_subscriptions_email ON changelog_email_subscriptions(email);
CREATE INDEX IF NOT EXISTS idx_changelog_email_subscriptions_verified ON changelog_email_subscriptions(verified, unsubscribed);

-- Enable RLS
ALTER TABLE changelog_entries ENABLE ROW LEVEL SECURITY;
ALTER TABLE changelog_email_subscriptions ENABLE ROW LEVEL SECURITY;

-- RLS Policy: Everyone can read changelog entries
CREATE POLICY "Anyone can view changelog entries"
  ON changelog_entries
  FOR SELECT
  USING (true);

-- RLS Policy: Only authenticated admins can insert/update changelog entries
CREATE POLICY "Admins can manage changelog entries"
  ON changelog_entries
  FOR ALL
  USING (
    EXISTS (
      SELECT 1 FROM profiles
      WHERE profiles.id = auth.uid()
      AND profiles.is_admin = true
    )
  );

-- RLS Policy: Anyone can subscribe to email updates
CREATE POLICY "Anyone can subscribe to email updates"
  ON changelog_email_subscriptions
  FOR INSERT
  WITH CHECK (true);

-- RLS Policy: Users can update their own subscription (for unsubscribe)
CREATE POLICY "Users can update own subscription"
  ON changelog_email_subscriptions
  FOR UPDATE
  USING (true)
  WITH CHECK (true);

-- Function to update updated_at timestamp
CREATE OR REPLACE FUNCTION update_changelog_updated_at()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Trigger to auto-update updated_at
CREATE TRIGGER update_changelog_entries_updated_at
  BEFORE UPDATE ON changelog_entries
  FOR EACH ROW
  EXECUTE FUNCTION update_changelog_updated_at();

CREATE TRIGGER update_changelog_email_subscriptions_updated_at
  BEFORE UPDATE ON changelog_email_subscriptions
  FOR EACH ROW
  EXECUTE FUNCTION update_changelog_updated_at();

-- Function to generate verification token
CREATE OR REPLACE FUNCTION generate_verification_token()
RETURNS text AS $$
BEGIN
  RETURN encode(gen_random_bytes(32), 'hex');
END;
$$ LANGUAGE plpgsql;

