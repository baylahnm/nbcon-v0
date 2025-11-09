-- Create feedback table for like/dislike feedback on AI responses
CREATE TABLE IF NOT EXISTS feedback (
  id uuid PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id uuid REFERENCES auth.users(id) ON DELETE CASCADE,
  message_id uuid REFERENCES ai_logs(id) ON DELETE CASCADE,
  feedback_type text NOT NULL CHECK (feedback_type IN ('like', 'dislike')),
  feedback_reason text,
  created_at timestamptz DEFAULT now()
);

-- Create indexes for efficient lookups
CREATE INDEX IF NOT EXISTS idx_feedback_message_id ON feedback(message_id);
CREATE INDEX IF NOT EXISTS idx_feedback_user_id ON feedback(user_id);
CREATE INDEX IF NOT EXISTS idx_feedback_type ON feedback(feedback_type);

-- Enable RLS
ALTER TABLE feedback ENABLE ROW LEVEL SECURITY;

-- RLS Policy: Users can view their own feedback
CREATE POLICY "Users can view own feedback"
  ON feedback
  FOR SELECT
  USING (auth.uid() = user_id);

-- RLS Policy: Users can insert their own feedback
CREATE POLICY "Users can insert own feedback"
  ON feedback
  FOR INSERT
  WITH CHECK (auth.uid() = user_id);

-- RLS Policy: Users can update their own feedback
CREATE POLICY "Users can update own feedback"
  ON feedback
  FOR UPDATE
  USING (auth.uid() = user_id)
  WITH CHECK (auth.uid() = user_id);

-- RLS Policy: Users can delete their own feedback
CREATE POLICY "Users can delete own feedback"
  ON feedback
  FOR DELETE
  USING (auth.uid() = user_id);

-- Create unique constraint: one feedback per user per message
CREATE UNIQUE INDEX IF NOT EXISTS idx_feedback_user_message_unique 
  ON feedback(user_id, message_id);

