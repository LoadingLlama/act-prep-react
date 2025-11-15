-- ================================================================
-- CHECK RLS POLICIES ON diagnostic_test_results
-- ================================================================

-- Show all RLS policies on the table
SELECT
  schemaname,
  tablename,
  policyname,
  permissive,
  roles,
  cmd,
  qual,
  with_check
FROM pg_policies
WHERE tablename = 'diagnostic_test_results';

-- Check if RLS is enabled
SELECT
  relname AS table_name,
  relrowsecurity AS rls_enabled,
  relforcerowsecurity AS rls_forced
FROM pg_class
WHERE relname = 'diagnostic_test_results';
