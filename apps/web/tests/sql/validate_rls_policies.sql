-- SQL Policy Validation Tests
-- Run via: psql $DATABASE_URL -f apps/web/tests/sql/validate_rls_policies.sql

DO $$
DECLARE
  profile_policy_count INTEGER;
  billing_policy_count INTEGER;
  ai_logs_policy_count INTEGER;
BEGIN
  -- Check profiles table RLS
  SELECT COUNT(*) INTO profile_policy_count
  FROM pg_policies
  WHERE tablename = 'profiles' AND schemaname = 'public';

  IF profile_policy_count = 0 THEN
    RAISE EXCEPTION 'RLS policy missing for profiles table';
  END IF;

  -- Check billing_events table RLS
  SELECT COUNT(*) INTO billing_policy_count
  FROM pg_policies
  WHERE tablename = 'billing_events' AND schemaname = 'public';

  IF billing_policy_count = 0 THEN
    RAISE EXCEPTION 'RLS policy missing for billing_events table';
  END IF;

  -- Check ai_logs table RLS
  SELECT COUNT(*) INTO ai_logs_policy_count
  FROM pg_policies
  WHERE tablename = 'ai_logs' AND schemaname = 'public';

  IF ai_logs_policy_count = 0 THEN
    RAISE EXCEPTION 'RLS policy missing for ai_logs table';
  END IF;

  RAISE NOTICE 'All RLS policies validated successfully';
END $$;

