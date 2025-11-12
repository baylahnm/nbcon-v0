-- Create forum_categories table
CREATE TABLE IF NOT EXISTS forum_categories (
  id uuid PRIMARY KEY DEFAULT uuid_generate_v4(),
  slug text NOT NULL UNIQUE,
  name text NOT NULL,
  description text,
  icon text,
  color text DEFAULT '#6366f1',
  sort_order integer DEFAULT 0,
  thread_count integer DEFAULT 0,
  post_count integer DEFAULT 0,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Create forum_tags table
CREATE TABLE IF NOT EXISTS forum_tags (
  id uuid PRIMARY KEY DEFAULT uuid_generate_v4(),
  name text NOT NULL UNIQUE,
  color text DEFAULT '#6366f1',
  usage_count integer DEFAULT 0,
  created_at timestamptz DEFAULT now()
);

-- Create forum_threads table
CREATE TABLE IF NOT EXISTS forum_threads (
  id uuid PRIMARY KEY DEFAULT uuid_generate_v4(),
  title text NOT NULL,
  content text NOT NULL,
  author_id uuid REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
  category_id uuid REFERENCES forum_categories(id) ON DELETE SET NULL,
  views integer DEFAULT 0,
  votes integer DEFAULT 0,
  reply_count integer DEFAULT 0,
  is_pinned boolean DEFAULT false,
  is_locked boolean DEFAULT false,
  is_solved boolean DEFAULT false,
  last_activity_at timestamptz DEFAULT now(),
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Create forum_posts table (replies to threads)
CREATE TABLE IF NOT EXISTS forum_posts (
  id uuid PRIMARY KEY DEFAULT uuid_generate_v4(),
  thread_id uuid REFERENCES forum_threads(id) ON DELETE CASCADE NOT NULL,
  content text NOT NULL,
  author_id uuid REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
  votes integer DEFAULT 0,
  is_best_answer boolean DEFAULT false,
  parent_post_id uuid REFERENCES forum_posts(id) ON DELETE CASCADE,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Create forum_thread_tags junction table
CREATE TABLE IF NOT EXISTS forum_thread_tags (
  thread_id uuid REFERENCES forum_threads(id) ON DELETE CASCADE,
  tag_id uuid REFERENCES forum_tags(id) ON DELETE CASCADE,
  PRIMARY KEY (thread_id, tag_id)
);

-- Create forum_votes table
CREATE TABLE IF NOT EXISTS forum_votes (
  id uuid PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id uuid REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
  thread_id uuid REFERENCES forum_threads(id) ON DELETE CASCADE,
  post_id uuid REFERENCES forum_posts(id) ON DELETE CASCADE,
  vote_type text CHECK (vote_type IN ('up', 'down')) NOT NULL,
  created_at timestamptz DEFAULT now(),
  UNIQUE(user_id, thread_id),
  UNIQUE(user_id, post_id),
  CHECK (
    (thread_id IS NOT NULL AND post_id IS NULL) OR
    (thread_id IS NULL AND post_id IS NOT NULL)
  )
);

-- Create forum_thread_views table for tracking views
CREATE TABLE IF NOT EXISTS forum_thread_views (
  thread_id uuid REFERENCES forum_threads(id) ON DELETE CASCADE,
  user_id uuid REFERENCES auth.users(id) ON DELETE CASCADE,
  viewed_at timestamptz DEFAULT now(),
  PRIMARY KEY (thread_id, user_id)
);

-- Create indexes for performance
CREATE INDEX IF NOT EXISTS idx_forum_threads_category ON forum_threads(category_id);
CREATE INDEX IF NOT EXISTS idx_forum_threads_author ON forum_threads(author_id);
CREATE INDEX IF NOT EXISTS idx_forum_threads_created ON forum_threads(created_at DESC);
CREATE INDEX IF NOT EXISTS idx_forum_threads_last_activity ON forum_threads(last_activity_at DESC);
CREATE INDEX IF NOT EXISTS idx_forum_threads_pinned ON forum_threads(is_pinned DESC, created_at DESC);
CREATE INDEX IF NOT EXISTS idx_forum_posts_thread ON forum_posts(thread_id);
CREATE INDEX IF NOT EXISTS idx_forum_posts_author ON forum_posts(author_id);
CREATE INDEX IF NOT EXISTS idx_forum_posts_created ON forum_posts(created_at DESC);
CREATE INDEX IF NOT EXISTS idx_forum_thread_tags_thread ON forum_thread_tags(thread_id);
CREATE INDEX IF NOT EXISTS idx_forum_thread_tags_tag ON forum_thread_tags(tag_id);
CREATE INDEX IF NOT EXISTS idx_forum_votes_thread ON forum_votes(thread_id);
CREATE INDEX IF NOT EXISTS idx_forum_votes_post ON forum_votes(post_id);
CREATE INDEX IF NOT EXISTS idx_forum_votes_user ON forum_votes(user_id);

-- Enable RLS
ALTER TABLE forum_categories ENABLE ROW LEVEL SECURITY;
ALTER TABLE forum_tags ENABLE ROW LEVEL SECURITY;
ALTER TABLE forum_threads ENABLE ROW LEVEL SECURITY;
ALTER TABLE forum_posts ENABLE ROW LEVEL SECURITY;
ALTER TABLE forum_thread_tags ENABLE ROW LEVEL SECURITY;
ALTER TABLE forum_votes ENABLE ROW LEVEL SECURITY;
ALTER TABLE forum_thread_views ENABLE ROW LEVEL SECURITY;

-- RLS Policies: Everyone can read categories and tags
CREATE POLICY "Anyone can view categories"
  ON forum_categories
  FOR SELECT
  USING (true);

CREATE POLICY "Anyone can view tags"
  ON forum_tags
  FOR SELECT
  USING (true);

-- RLS Policies: Everyone can read threads and posts
CREATE POLICY "Anyone can view threads"
  ON forum_threads
  FOR SELECT
  USING (true);

CREATE POLICY "Anyone can view posts"
  ON forum_posts
  FOR SELECT
  USING (true);

-- RLS Policies: Authenticated users can create threads and posts
CREATE POLICY "Authenticated users can create threads"
  ON forum_threads
  FOR INSERT
  WITH CHECK (auth.uid() = author_id);

CREATE POLICY "Users can update own threads"
  ON forum_threads
  FOR UPDATE
  USING (auth.uid() = author_id)
  WITH CHECK (auth.uid() = author_id);

CREATE POLICY "Users can delete own threads"
  ON forum_threads
  FOR DELETE
  USING (auth.uid() = author_id);

CREATE POLICY "Authenticated users can create posts"
  ON forum_posts
  FOR INSERT
  WITH CHECK (auth.uid() = author_id);

CREATE POLICY "Users can update own posts"
  ON forum_posts
  FOR UPDATE
  USING (auth.uid() = author_id)
  WITH CHECK (auth.uid() = author_id);

CREATE POLICY "Users can delete own posts"
  ON forum_posts
  FOR DELETE
  USING (auth.uid() = author_id);

-- RLS Policies: Authenticated users can vote
CREATE POLICY "Authenticated users can vote"
  ON forum_votes
  FOR ALL
  USING (auth.uid() = user_id)
  WITH CHECK (auth.uid() = user_id);

-- RLS Policies: Authenticated users can track views
CREATE POLICY "Authenticated users can track views"
  ON forum_thread_views
  FOR ALL
  USING (auth.uid() = user_id)
  WITH CHECK (auth.uid() = user_id);

-- Functions to update timestamps
CREATE OR REPLACE FUNCTION update_forum_updated_at()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Triggers for updated_at
CREATE TRIGGER update_forum_categories_updated_at
  BEFORE UPDATE ON forum_categories
  FOR EACH ROW
  EXECUTE FUNCTION update_forum_updated_at();

CREATE TRIGGER update_forum_threads_updated_at
  BEFORE UPDATE ON forum_threads
  FOR EACH ROW
  EXECUTE FUNCTION update_forum_updated_at();

CREATE TRIGGER update_forum_posts_updated_at
  BEFORE UPDATE ON forum_posts
  FOR EACH ROW
  EXECUTE FUNCTION update_forum_updated_at();

-- Function to update thread reply count
CREATE OR REPLACE FUNCTION update_thread_reply_count()
RETURNS TRIGGER AS $$
BEGIN
  IF TG_OP = 'INSERT' THEN
    UPDATE forum_threads
    SET reply_count = reply_count + 1,
        last_activity_at = now()
    WHERE id = NEW.thread_id;
  ELSIF TG_OP = 'DELETE' THEN
    UPDATE forum_threads
    SET reply_count = GREATEST(0, reply_count - 1)
    WHERE id = OLD.thread_id;
  END IF;
  RETURN NULL;
END;
$$ LANGUAGE plpgsql;

-- Trigger to update reply count
CREATE TRIGGER update_thread_reply_count_trigger
  AFTER INSERT OR DELETE ON forum_posts
  FOR EACH ROW
  EXECUTE FUNCTION update_thread_reply_count();

-- Function to update thread vote count
CREATE OR REPLACE FUNCTION update_thread_vote_count()
RETURNS TRIGGER AS $$
BEGIN
  IF TG_OP = 'INSERT' THEN
    UPDATE forum_threads
    SET votes = votes + CASE WHEN NEW.vote_type = 'up' THEN 1 ELSE -1 END
    WHERE id = NEW.thread_id;
  ELSIF TG_OP = 'DELETE' THEN
    UPDATE forum_threads
    SET votes = votes - CASE WHEN OLD.vote_type = 'up' THEN 1 ELSE -1 END
    WHERE id = OLD.thread_id;
  ELSIF TG_OP = 'UPDATE' THEN
    UPDATE forum_threads
    SET votes = votes + CASE WHEN NEW.vote_type = 'up' THEN 2 ELSE -2 END
    WHERE id = NEW.thread_id;
  END IF;
  RETURN NULL;
END;
$$ LANGUAGE plpgsql;

-- Trigger to update thread vote count
CREATE TRIGGER update_thread_vote_count_trigger
  AFTER INSERT OR UPDATE OR DELETE ON forum_votes
  FOR EACH ROW
  WHEN (thread_id IS NOT NULL)
  EXECUTE FUNCTION update_thread_vote_count();

-- Function to update post vote count
CREATE OR REPLACE FUNCTION update_post_vote_count()
RETURNS TRIGGER AS $$
BEGIN
  IF TG_OP = 'INSERT' THEN
    UPDATE forum_posts
    SET votes = votes + CASE WHEN NEW.vote_type = 'up' THEN 1 ELSE -1 END
    WHERE id = NEW.post_id;
  ELSIF TG_OP = 'DELETE' THEN
    UPDATE forum_posts
    SET votes = votes - CASE WHEN OLD.vote_type = 'up' THEN 1 ELSE -1 END
    WHERE id = OLD.post_id;
  ELSIF TG_OP = 'UPDATE' THEN
    UPDATE forum_posts
    SET votes = votes + CASE WHEN NEW.vote_type = 'up' THEN 2 ELSE -2 END
    WHERE id = NEW.post_id;
  END IF;
  RETURN NULL;
END;
$$ LANGUAGE plpgsql;

-- Trigger to update post vote count
CREATE TRIGGER update_post_vote_count_trigger
  AFTER INSERT OR UPDATE OR DELETE ON forum_votes
  FOR EACH ROW
  WHEN (post_id IS NOT NULL)
  EXECUTE FUNCTION update_post_vote_count();

-- Function to update category counts
CREATE OR REPLACE FUNCTION update_category_counts()
RETURNS TRIGGER AS $$
BEGIN
  IF TG_OP = 'INSERT' THEN
    UPDATE forum_categories
    SET thread_count = thread_count + 1
    WHERE id = NEW.category_id;
  ELSIF TG_OP = 'DELETE' THEN
    UPDATE forum_categories
    SET thread_count = GREATEST(0, thread_count - 1)
    WHERE id = OLD.category_id;
  END IF;
  RETURN NULL;
END;
$$ LANGUAGE plpgsql;

-- Trigger to update category thread count
CREATE TRIGGER update_category_thread_count_trigger
  AFTER INSERT OR DELETE ON forum_threads
  FOR EACH ROW
  EXECUTE FUNCTION update_category_counts();

-- Insert default categories
INSERT INTO forum_categories (slug, name, description, icon, color, sort_order) VALUES
  ('general', 'General Discussion', 'Welcome & Introductions, General chat, Off-topic discussions', 'Users', '#6366f1', 1),
  ('qa', 'Q&A & Support', 'How-to questions, Troubleshooting, Technical support', 'MessageSquare', '#10b981', 2),
  ('features', 'Feature Requests', 'New feature ideas, Enhancement suggestions, Voting on requests', 'TrendingUp', '#f59e0b', 3),
  ('showcase', 'Showcase & Projects', 'Project showcases, Success stories, Portfolio sharing', 'ArrowRight', '#8b5cf6', 4),
  ('integrations', 'Integrations & Plugins', 'Integration guides, Plugin development, Third-party tools', 'Plug', '#ec4899', 5),
  ('bugs', 'Bug Reports', 'Bug reporting, Issue tracking, GitHub integration', 'Bug', '#ef4444', 6)
ON CONFLICT (slug) DO NOTHING;

