-- Create response_versions table for tracking multiple versions of AI responses
CREATE TABLE IF NOT EXISTS response_versions (
  id uuid PRIMARY KEY DEFAULT uuid_generate_v4(),
  message_id uuid REFERENCES ai_logs(id) ON DELETE CASCADE,
  version_number int NOT NULL,
  content text NOT NULL,
  tokens_used int DEFAULT 0,
  created_at timestamptz DEFAULT now(),
  UNIQUE(message_id, version_number)
);

-- Create indexes for efficient lookups
CREATE INDEX IF NOT EXISTS idx_response_versions_message_id ON response_versions(message_id);
CREATE INDEX IF NOT EXISTS idx_response_versions_version_number ON response_versions(message_id, version_number);

-- Enable RLS
ALTER TABLE response_versions ENABLE ROW LEVEL SECURITY;

-- RLS Policy: Users can view their own response versions
CREATE POLICY "Users can view own response versions"
  ON response_versions
  FOR SELECT
  USING (EXISTS (
    SELECT 1 FROM ai_logs 
    WHERE ai_logs.id = response_versions.message_id 
    AND ai_logs.user_id = auth.uid()
  ));

-- RLS Policy: Users can insert their own response versions
CREATE POLICY "Users can insert own response versions"
  ON response_versions
  FOR INSERT
  WITH CHECK (EXISTS (
    SELECT 1 FROM ai_logs 
    WHERE ai_logs.id = response_versions.message_id 
    AND ai_logs.user_id = auth.uid()
  ));

-- RLS Policy: Users can update their own response versions
CREATE POLICY "Users can update own response versions"
  ON response_versions
  FOR UPDATE
  USING (EXISTS (
    SELECT 1 FROM ai_logs 
    WHERE ai_logs.id = response_versions.message_id 
    AND ai_logs.user_id = auth.uid()
  ))
  WITH CHECK (EXISTS (
    SELECT 1 FROM ai_logs 
    WHERE ai_logs.id = response_versions.message_id 
    AND ai_logs.user_id = auth.uid()
  ));

-- RLS Policy: Users can delete their own response versions
CREATE POLICY "Users can delete own response versions"
  ON response_versions
  FOR DELETE
  USING (EXISTS (
    SELECT 1 FROM ai_logs 
    WHERE ai_logs.id = response_versions.message_id 
    AND ai_logs.user_id = auth.uid()
  ));

-- Function to get the next version number for a message
CREATE OR REPLACE FUNCTION get_next_version_number(p_message_id uuid)
RETURNS int AS $$
DECLARE
  v_max_version int;
BEGIN
  SELECT COALESCE(MAX(version_number), 0) INTO v_max_version
  FROM response_versions
  WHERE message_id = p_message_id;
  
  RETURN v_max_version + 1;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

