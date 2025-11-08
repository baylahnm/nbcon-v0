-- Create user_credits table for daily token tracking
CREATE TABLE IF NOT EXISTS user_credits (
  id uuid PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id uuid REFERENCES auth.users(id) ON DELETE CASCADE,
  subscription_tier text NOT NULL DEFAULT 'free',
  daily_tokens_used int DEFAULT 0,
  daily_tokens_limit int NOT NULL,
  last_reset_date date NOT NULL DEFAULT CURRENT_DATE,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now(),
  UNIQUE(user_id)
);

-- Create indexes for efficient lookups
CREATE INDEX IF NOT EXISTS idx_user_credits_user_id ON user_credits(user_id);
CREATE INDEX IF NOT EXISTS idx_user_credits_reset_date ON user_credits(last_reset_date);
CREATE INDEX IF NOT EXISTS idx_user_credits_tier ON user_credits(subscription_tier);

-- Enable RLS
ALTER TABLE user_credits ENABLE ROW LEVEL SECURITY;

-- RLS Policy: Users can view their own credits
CREATE POLICY "Users can view own credits"
  ON user_credits
  FOR SELECT
  USING (auth.uid() = user_id);

-- RLS Policy: Users can insert their own credits
CREATE POLICY "Users can insert own credits"
  ON user_credits
  FOR INSERT
  WITH CHECK (auth.uid() = user_id);

-- Function to reset daily credits at midnight UTC
CREATE OR REPLACE FUNCTION reset_daily_credits()
RETURNS void AS $$
BEGIN
  UPDATE user_credits
  SET 
    daily_tokens_used = 0,
    last_reset_date = CURRENT_DATE,
    updated_at = now()
  WHERE last_reset_date < CURRENT_DATE;
END;
$$ LANGUAGE plpgsql;

-- Function to initialize credits for a user (called on signup or tier change)
-- SECURITY DEFINER allows the function to bypass RLS when inserting/updating credits
CREATE OR REPLACE FUNCTION initialize_user_credits(p_user_id uuid, p_tier text)
RETURNS void AS $$
DECLARE
  v_limit int;
BEGIN
  -- Set token limit based on tier
  CASE p_tier
    WHEN 'free' THEN v_limit := 50;
    WHEN 'basic' THEN v_limit := 500;
    WHEN 'pro' THEN v_limit := 2000;
    WHEN 'enterprise' THEN v_limit := 999999; -- Unlimited
    ELSE v_limit := 50; -- Default to free
  END CASE;

  -- Insert or update user credits
  INSERT INTO user_credits (user_id, subscription_tier, daily_tokens_limit, daily_tokens_used, last_reset_date)
  VALUES (p_user_id, p_tier, v_limit, 0, CURRENT_DATE)
  ON CONFLICT (user_id) 
  DO UPDATE SET
    subscription_tier = p_tier,
    daily_tokens_limit = v_limit,
    daily_tokens_used = 0,
    last_reset_date = CURRENT_DATE,
    updated_at = now();
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Function to deduct tokens from user credits
CREATE OR REPLACE FUNCTION deduct_user_credits(p_user_id uuid, p_tokens int)
RETURNS void AS $$
DECLARE
  v_current_used int;
  v_limit int;
  v_tier text;
BEGIN
  -- Get current credits
  SELECT daily_tokens_used, daily_tokens_limit, subscription_tier
  INTO v_current_used, v_limit, v_tier
  FROM user_credits
  WHERE user_id = p_user_id;

  -- If no record exists, initialize it
  IF NOT FOUND THEN
    -- Get tier from profiles
    SELECT subscription_tier INTO v_tier
    FROM profiles
    WHERE id = p_user_id;

    IF NOT FOUND THEN
      v_tier := 'free';
    END IF;

    PERFORM initialize_user_credits(p_user_id, v_tier);
    
    -- Get the initialized values
    SELECT daily_tokens_used, daily_tokens_limit, subscription_tier
    INTO v_current_used, v_limit, v_tier
    FROM user_credits
    WHERE user_id = p_user_id;
  END IF;

  -- Enterprise tier has unlimited credits
  IF v_tier = 'enterprise' THEN
    RETURN;
  END IF;

  -- Update tokens used
  UPDATE user_credits
  SET 
    daily_tokens_used = LEAST(v_current_used + p_tokens, v_limit),
    updated_at = now()
  WHERE user_id = p_user_id;
END;
$$ LANGUAGE plpgsql;

