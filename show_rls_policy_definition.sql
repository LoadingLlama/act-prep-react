-- ================================================================
-- SHOW EXACT RLS POLICY DEFINITIONS
-- ================================================================

-- This will show the exact SQL used in the USING clause of each policy
SELECT
  schemaname,
  tablename,
  policyname,
  permissive,
  roles,
  cmd AS command_type,
  qual AS using_expression,
  with_check AS with_check_expression
FROM pg_policies
WHERE tablename = 'diagnostic_test_results'
ORDER BY policyname;

-- Also check if there's a policy that references diagnostic_test_questions
SELECT
  policyname,
  pg_get_expr(polqual, polrelid) AS policy_definition
FROM pg_policy
WHERE polrelid = 'diagnostic_test_results'::regclass;
