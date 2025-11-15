-- ================================================================
-- FIX DIAGNOSTIC_TEST_RESULTS FOREIGN KEY CONSTRAINT
-- ================================================================
-- The diagnostic test uses practice test questions, not diagnostic
-- questions, so we need to remove the FK constraint to diagnostic_test_questions
-- and make question_id an integer to match practice test IDs
-- ================================================================

-- 1. Drop the existing foreign key constraint
ALTER TABLE diagnostic_test_results
DROP CONSTRAINT IF EXISTS diagnostic_test_results_question_id_fkey;

-- 2. Change question_id from UUID to INTEGER
-- First, drop the old column
ALTER TABLE diagnostic_test_results
DROP COLUMN IF EXISTS question_id;

-- Add it back as INTEGER
ALTER TABLE diagnostic_test_results
ADD COLUMN question_id INTEGER NOT NULL;

-- 3. Recreate the index
DROP INDEX IF EXISTS idx_diagnostic_results_question;
CREATE INDEX idx_diagnostic_results_question
ON diagnostic_test_results(question_id);

-- 4. Verify the changes
SELECT
  column_name,
  data_type,
  is_nullable
FROM information_schema.columns
WHERE table_name = 'diagnostic_test_results'
ORDER BY ordinal_position;

-- Show current RLS policies
SELECT
  schemaname,
  tablename,
  policyname,
  permissive,
  roles,
  cmd,
  qual
FROM pg_policies
WHERE tablename = 'diagnostic_test_results';
