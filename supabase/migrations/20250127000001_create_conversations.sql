-- Create conversations table for multiple chat threads
CREATE TABLE IF NOT EXISTS conversations (
  id uuid PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id uuid REFERENCES auth.users(id) ON DELETE CASCADE,
  title text NOT NULL,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Create indexes for efficient lookups
CREATE INDEX IF NOT EXISTS idx_conversations_user_id ON conversations(user_id);
CREATE INDEX IF NOT EXISTS idx_conversations_updated_at ON conversations(updated_at DESC);

-- Enable RLS
ALTER TABLE conversations ENABLE ROW LEVEL SECURITY;

-- RLS Policy: Users can view their own conversations
CREATE POLICY "Users can view own conversations"
  ON conversations
  FOR SELECT
  USING (auth.uid() = user_id);

-- RLS Policy: Users can insert their own conversations
CREATE POLICY "Users can insert own conversations"
  ON conversations
  FOR INSERT
  WITH CHECK (auth.uid() = user_id);

-- RLS Policy: Users can update their own conversations
CREATE POLICY "Users can update own conversations"
  ON conversations
  FOR UPDATE
  USING (auth.uid() = user_id)
  WITH CHECK (auth.uid() = user_id);

-- RLS Policy: Users can delete their own conversations
CREATE POLICY "Users can delete own conversations"
  ON conversations
  FOR DELETE
  USING (auth.uid() = user_id);

-- Add conversation_id column to ai_logs table
ALTER TABLE ai_logs 
  ADD COLUMN IF NOT EXISTS conversation_id uuid REFERENCES conversations(id) ON DELETE CASCADE;

-- Add version_number column to ai_logs table (for regenerate functionality)
ALTER TABLE ai_logs 
  ADD COLUMN IF NOT EXISTS version_number int DEFAULT 1;

-- Create index for conversation_id lookups
CREATE INDEX IF NOT EXISTS idx_ai_logs_conversation_id ON ai_logs(conversation_id);

-- Create function to update updated_at timestamp
CREATE OR REPLACE FUNCTION update_conversation_updated_at()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Create trigger to automatically update updated_at
CREATE TRIGGER update_conversations_updated_at
  BEFORE UPDATE ON conversations
  FOR EACH ROW
  EXECUTE FUNCTION update_conversation_updated_at();

