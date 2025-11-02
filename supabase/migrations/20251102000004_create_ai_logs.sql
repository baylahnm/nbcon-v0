-- Create ai_logs table for AI agent execution logging
CREATE TABLE IF NOT EXISTS ai_logs (
  id uuid PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id uuid REFERENCES auth.users(id) ON DELETE CASCADE,
  agent text NOT NULL,
  input text NOT NULL,
  output text,
  tokens_used int DEFAULT 0,
  created_at timestamptz DEFAULT now()
);

-- Create index for faster queries
CREATE INDEX IF NOT EXISTS idx_ai_logs_user_id ON ai_logs(user_id);
CREATE INDEX IF NOT EXISTS idx_ai_logs_agent ON ai_logs(agent);
CREATE INDEX IF NOT EXISTS idx_ai_logs_created_at ON ai_logs(created_at);

-- Enable RLS
ALTER TABLE ai_logs ENABLE ROW LEVEL SECURITY;

-- RLS Policy: Users can view their own AI logs
CREATE POLICY "Users can view own AI logs"
  ON ai_logs
  FOR SELECT
  USING (auth.uid() = user_id);

-- RLS Policy: Users can insert their own AI logs
CREATE POLICY "Users can insert own AI logs"
  ON ai_logs
  FOR INSERT
  WITH CHECK (auth.uid() = user_id);

