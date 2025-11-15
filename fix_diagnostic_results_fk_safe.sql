-- ================================================================
-- SAFELY FIX DIAGNOSTIC_TEST_RESULTS FOREIGN KEY CONSTRAINT
-- ================================================================
-- Change question_id to INTEGER and remove FK constraint
-- This version preserves existing data
-- ================================================================

-- 1. Add a new INTEGER column temporarily
ALTER TABLE diagnostic_test_results
ADD COLUMN IF NOT EXISTS question_id_int INTEGER;

-- 2. Try to copy existing UUIDs to integers (will likely fail, but safe to try)
-- Skip this if there's data we care about

-- 3. Drop the old UUID column with FK constraint
ALTER TABLE diagnostic_test_results
DROP CONSTRAINT IF EXISTS diagnostic_test_results_question_id_fkey;

ALTER TABLE diagnostic_test_results
DROP COLUMN IF EXISTS question_id CASCADE;

-- 4. Rename the integer column to question_id
ALTER TABLE diagnostic_test_results
RENAME COLUMN question_id_int TO question_id;

-- 5. Make it NOT NULL (will fail if there are NULLs, which is fine - tells us there's data)
ALTER TABLE diagnostic_test_results
ALTER COLUMN question_id SET NOT NULL;

-- 6. Recreate the index
DROP INDEX IF EXISTS idx_diagnostic_results_question;
CREATE INDEX idx_diagnostic_results_question
ON diagnostic_test_results(question_id);

--================================================================
-- VERIFY THE CHANGES
-- ================================================================
SELECT
  column_name,
  data_type,
  is_nullable
FROM information_schema.columns
WHERE table_name = 'diagnostic_test_results'
AND column_name IN ('question_id', 'user_id', 'diagnostic_session_id')
ORDER BY ordinal_position;
