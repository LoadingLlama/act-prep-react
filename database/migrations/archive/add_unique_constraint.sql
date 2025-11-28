-- ================================================================
-- ADD UNIQUE CONSTRAINT FOR UPSERT
-- ================================================================
-- The code uses .upsert() which requires a unique constraint
-- ================================================================

-- Add the unique constraint that was mentioned in COMPLETE_DIAGNOSTIC_FIX.sql
ALTER TABLE diagnostic_test_results
ADD CONSTRAINT diagnostic_test_results_session_question_unique
UNIQUE (diagnostic_session_id, question_id);

-- Verify it was created
SELECT
  conname as constraint_name,
  contype as constraint_type,
  pg_get_constraintdef(oid) as definition
FROM pg_constraint
WHERE conrelid = 'diagnostic_test_results'::regclass
AND conname = 'diagnostic_test_results_session_question_unique';
