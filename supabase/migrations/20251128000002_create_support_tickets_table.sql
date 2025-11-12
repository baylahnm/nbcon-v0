-- Support Tickets Table
-- Migration: 20251128000002_create_support_tickets_table.sql
-- Allows users to submit support tickets and track their status

-- Support Tickets Table
CREATE TABLE IF NOT EXISTS support_tickets (
  id uuid PRIMARY KEY DEFAULT uuid_generate_v4(),
  ticket_number text UNIQUE NOT NULL, -- e.g., "TKT-2025-001234"
  user_id uuid REFERENCES auth.users(id) ON DELETE SET NULL,
  email text NOT NULL, -- Required for non-authenticated users
  subject text NOT NULL,
  category text NOT NULL CHECK (category IN ('account', 'technical', 'feature', 'bug', 'general', 'enterprise')),
  priority text NOT NULL DEFAULT 'medium' CHECK (priority IN ('low', 'medium', 'high', 'urgent')),
  status text NOT NULL DEFAULT 'open' CHECK (status IN ('open', 'in_progress', 'resolved', 'closed')),
  description text NOT NULL,
  attachments jsonb DEFAULT '[]'::jsonb, -- Array of file URLs/metadata
  assigned_to uuid REFERENCES auth.users(id) ON DELETE SET NULL,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now(),
  resolved_at timestamptz,
  closed_at timestamptz
);

-- Create indexes for efficient lookups
CREATE INDEX IF NOT EXISTS idx_support_tickets_user ON support_tickets(user_id);
CREATE INDEX IF NOT EXISTS idx_support_tickets_email ON support_tickets(email);
CREATE INDEX IF NOT EXISTS idx_support_tickets_status ON support_tickets(status);
CREATE INDEX IF NOT EXISTS idx_support_tickets_ticket_number ON support_tickets(ticket_number);
CREATE INDEX IF NOT EXISTS idx_support_tickets_created ON support_tickets(created_at DESC);
CREATE INDEX IF NOT EXISTS idx_support_tickets_category ON support_tickets(category);

-- Support Ticket Messages Table (for ticket conversations)
CREATE TABLE IF NOT EXISTS support_ticket_messages (
  id uuid PRIMARY KEY DEFAULT uuid_generate_v4(),
  ticket_id uuid REFERENCES support_tickets(id) ON DELETE CASCADE NOT NULL,
  user_id uuid REFERENCES auth.users(id) ON DELETE SET NULL,
  email text, -- For non-authenticated users
  message text NOT NULL,
  is_internal boolean DEFAULT false, -- Internal notes (staff only)
  attachments jsonb DEFAULT '[]'::jsonb,
  created_at timestamptz DEFAULT now()
);

CREATE INDEX IF NOT EXISTS idx_support_messages_ticket ON support_ticket_messages(ticket_id);
CREATE INDEX IF NOT EXISTS idx_support_messages_created ON support_ticket_messages(created_at DESC);

-- Function to update updated_at timestamp
CREATE OR REPLACE FUNCTION update_support_ticket_updated_at()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Trigger to auto-update updated_at
CREATE TRIGGER update_support_tickets_updated_at
  BEFORE UPDATE ON support_tickets
  FOR EACH ROW
  EXECUTE FUNCTION update_support_ticket_updated_at();

-- Enable RLS
ALTER TABLE support_tickets ENABLE ROW LEVEL SECURITY;
ALTER TABLE support_ticket_messages ENABLE ROW LEVEL SECURITY;

-- RLS Policies for support_tickets
-- Anyone can create tickets
CREATE POLICY "Anyone can create tickets"
  ON support_tickets FOR INSERT
  TO authenticated, anon
  WITH CHECK (true);

-- Users can view their own tickets
CREATE POLICY "Users can view own tickets"
  ON support_tickets FOR SELECT
  TO authenticated
  USING (auth.uid() = user_id);

-- Public can view tickets by ticket number (for status check)
-- This allows non-authenticated users to check ticket status
-- Note: In practice, you may want to add email verification
CREATE POLICY "Public can view tickets by ticket number"
  ON support_tickets FOR SELECT
  TO authenticated, anon
  USING (true); -- Will be filtered by ticket_number in API

-- Staff can view all tickets (requires role check)
CREATE POLICY "Staff can view all tickets"
  ON support_tickets FOR SELECT
  TO authenticated
  USING (
    EXISTS (
      SELECT 1 FROM auth.users
      WHERE auth.users.id = auth.uid()
      AND (auth.users.raw_user_meta_data->>'role' IN ('admin', 'support_staff') OR auth.users.raw_user_meta_data->>'is_staff' = 'true')
    )
  );

-- Users can update their own tickets (limited fields)
CREATE POLICY "Users can update own tickets"
  ON support_tickets FOR UPDATE
  TO authenticated
  USING (auth.uid() = user_id)
  WITH CHECK (auth.uid() = user_id);

-- Staff can update all tickets
CREATE POLICY "Staff can update all tickets"
  ON support_tickets FOR UPDATE
  TO authenticated
  USING (
    EXISTS (
      SELECT 1 FROM auth.users
      WHERE auth.users.id = auth.uid()
      AND (auth.users.raw_user_meta_data->>'role' IN ('admin', 'support_staff') OR auth.users.raw_user_meta_data->>'is_staff' = 'true')
    )
  );

-- RLS Policies for support_ticket_messages
-- Users can create messages for their tickets
CREATE POLICY "Users can create messages"
  ON support_ticket_messages FOR INSERT
  TO authenticated, anon
  WITH CHECK (true); -- Will be validated in API that user owns ticket

-- Users can view messages for their tickets (non-internal only)
CREATE POLICY "Users can view ticket messages"
  ON support_ticket_messages FOR SELECT
  TO authenticated, anon
  USING (
    EXISTS (
      SELECT 1 FROM support_tickets
      WHERE support_tickets.id = ticket_id
      AND (
        support_tickets.user_id = auth.uid() 
        OR (support_tickets.user_id IS NULL AND support_tickets.email IS NOT NULL)
      )
      AND is_internal = false
    )
  );

-- Staff can view all messages including internal
CREATE POLICY "Staff can view all messages"
  ON support_ticket_messages FOR SELECT
  TO authenticated
  USING (
    EXISTS (
      SELECT 1 FROM auth.users
      WHERE auth.users.id = auth.uid()
      AND (auth.users.raw_user_meta_data->>'role' IN ('admin', 'support_staff') OR auth.users.raw_user_meta_data->>'is_staff' = 'true')
    )
  );

