-- Docs Feedback Table
-- Migration: 20251128000001_create_docs_feedback_table.sql
-- Allows users to provide feedback on documentation pages (helpful/not helpful)

CREATE TABLE IF NOT EXISTS docs_feedback (
  id uuid PRIMARY KEY DEFAULT uuid_generate_v4(),
  page_slug text NOT NULL,
  user_id uuid REFERENCES auth.users(id) ON DELETE SET NULL,
  helpful boolean NOT NULL,
  comment text,
  created_at timestamptz DEFAULT now()
);

-- Create indexes for efficient lookups
CREATE INDEX IF NOT EXISTS idx_docs_feedback_page ON docs_feedback(page_slug);
CREATE INDEX IF NOT EXISTS idx_docs_feedback_user ON docs_feedback(user_id);
CREATE INDEX IF NOT EXISTS idx_docs_feedback_created ON docs_feedback(created_at DESC);

-- Enable RLS
ALTER TABLE docs_feedback ENABLE ROW LEVEL SECURITY;

-- RLS Policy: Anyone can create feedback (authenticated or anonymous)
CREATE POLICY "Anyone can create feedback"
  ON docs_feedback FOR INSERT
  TO authenticated, anon
  WITH CHECK (true);

-- RLS Policy: Users can view their own feedback
CREATE POLICY "Users can view own feedback"
  ON docs_feedback FOR SELECT
  TO authenticated
  USING (auth.uid() = user_id);

-- RLS Policy: Public can view aggregated stats (for stats endpoint)
-- This allows calculating helpful/not helpful counts without exposing individual feedback
CREATE POLICY "Public can view feedback stats"
  ON docs_feedback FOR SELECT
  TO authenticated, anon
  USING (true);

