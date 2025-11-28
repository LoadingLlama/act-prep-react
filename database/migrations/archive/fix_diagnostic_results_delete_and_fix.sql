-- ================================================================
-- FIX DIAGNOSTIC_TEST_RESULTS - DELETE OLD DATA AND FIX SCHEMA
-- ================================================================
-- This will delete all existing diagnostic test results
-- Then fix the schema to use INTEGER question_id
-- ================================================================

-- 1. Delete all existing results (they have bad UUIDs anyway)
DELETE FROM diagnostic_test_results;

-- 2. Drop the FK constraint
ALTER TABLE diagnostic_test_results
DROP CONSTRAINT IF EXISTS diagnostic_test_results_question_id_fkey;

-- 3. Drop and recreate question_id as INTEGER
ALTER TABLE diagnostic_test_results
DROP COLUMN question_id CASCADE;

ALTER TABLE diagnostic_test_results
ADD COLUMN question_id INTEGER NOT NULL;

-- 4. Recreate index
DROP INDEX IF EXISTS idx_diagnostic_results_question;
CREATE INDEX idx_diagnostic_results_question
ON diagnostic_test_results(question_id);

-- 5. Verify the fix
SELECT column_name, data_type, is_nullable
FROM information_schema.columns
WHERE table_name = 'diagnostic_test_results'
AND column_name IN ('question_id', 'user_id', 'diagnostic_session_id')
ORDER BY column_name;

-- 6. Show count (should be 0)
SELECT COUNT(*) as row_count FROM diagnostic_test_results;
