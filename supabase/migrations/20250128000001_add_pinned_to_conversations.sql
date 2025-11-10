-- Add pinned column to conversations table
ALTER TABLE conversations 
  ADD COLUMN IF NOT EXISTS pinned boolean DEFAULT false NOT NULL;

-- Create index for efficient sorting by pinned status
CREATE INDEX IF NOT EXISTS idx_conversations_pinned ON conversations(pinned DESC, updated_at DESC);

-- Update the existing index to include pinned for better query performance
-- Note: PostgreSQL doesn't support modifying indexes directly, so we create a new composite index
-- The existing idx_conversations_updated_at will still work, but this new index is optimized for pinned queries
CREATE INDEX IF NOT EXISTS idx_conversations_pinned_updated_at ON conversations(pinned DESC NULLS LAST, updated_at DESC);

