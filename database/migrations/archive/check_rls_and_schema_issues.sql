-- ================================================================
-- CHECK RLS POLICIES AND SCHEMA ISSUES
-- ================================================================

-- 1. Check if user_lesson_performance table exists
SELECT EXISTS (
  SELECT FROM information_schema.tables
  WHERE table_schema = 'public'
  AND table_name = 'user_lesson_performance'
) as table_exists;

-- 2. Check RLS policies on user_lesson_performance
SELECT
  schemaname,
  tablename,
  policyname,
  permissive,
  roles,
  cmd,
  qual as using_expression,
  with_check as with_check_expression
FROM pg_policies
WHERE tablename = 'user_lesson_performance';

-- 3. Check if RLS is enabled
SELECT
  relname AS table_name,
  relrowsecurity AS rls_enabled,
  relforcerowsecurity AS rls_forced
FROM pg_class
WHERE relname = 'user_lesson_performance';

-- 4. Check profiles table structure (for the 400 error)
SELECT
  column_name,
  data_type,
  is_nullable,
  column_default
FROM information_schema.columns
WHERE table_name = 'profiles'
AND column_name IN ('id', 'has_completed_diagnostic', 'diagnostic_completed_at', 'diagnostic_completed')
ORDER BY ordinal_position;

-- 5. Check RLS policies on profiles table
SELECT
  policyname,
  permissive,
  roles,
  cmd,
  qual as using_expression,
  with_check as with_check_expression
FROM pg_policies
WHERE tablename = 'profiles';

-- 6. Check constraints on profiles
SELECT
  conname as constraint_name,
  contype as constraint_type,
  pg_get_constraintdef(oid) as definition
FROM pg_constraint
WHERE conrelid = 'profiles'::regclass;
