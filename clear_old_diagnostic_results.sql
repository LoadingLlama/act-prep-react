-- ================================================================
-- CLEAR OLD DIAGNOSTIC TEST RESULTS
-- ================================================================
-- These results use the old question IDs which will be renumbered
-- We need to delete them before renumbering
-- ================================================================

BEGIN;

-- Delete all diagnostic test results
DELETE FROM diagnostic_test_results;

-- Delete all diagnostic test sessions
DELETE FROM diagnostic_test_sessions;

-- Verify deletion
SELECT
  'diagnostic_test_results' as table_name,
  COUNT(*) as remaining_rows
FROM diagnostic_test_results
UNION ALL
SELECT
  'diagnostic_test_sessions',
  COUNT(*)
FROM diagnostic_test_sessions;

COMMIT;

SELECT '✅ Old diagnostic data cleared - ready for ID reorganization' as status;
