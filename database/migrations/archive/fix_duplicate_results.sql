-- ================================================================
-- FIX DUPLICATE DIAGNOSTIC RESULTS
-- ================================================================
-- This adds a unique constraint to prevent the same question
-- from being saved multiple times for the same session
-- ================================================================

-- Step 1: Delete existing duplicates
-- Keep only the first occurrence of each question per session
DELETE FROM diagnostic_test_results
WHERE id IN (
  SELECT dtr.id
  FROM diagnostic_test_results dtr
  WHERE EXISTS (
    SELECT 1
    FROM diagnostic_test_results dtr2
    WHERE dtr2.diagnostic_session_id = dtr.diagnostic_session_id
      AND dtr2.question_id = dtr.question_id
      AND dtr2.created_at < dtr.created_at
  )
);

-- Step 2: Add unique constraint to prevent future duplicates
ALTER TABLE diagnostic_test_results
ADD CONSTRAINT unique_session_question
UNIQUE (diagnostic_session_id, question_id);

-- Step 3: Verify
SELECT
  diagnostic_session_id,
  COUNT(*) as total_results,
  COUNT(DISTINCT question_id) as unique_questions
FROM diagnostic_test_results
GROUP BY diagnostic_session_id
ORDER BY diagnostic_session_id;

-- Success message
SELECT 'Duplicate results removed and unique constraint added!' as status;
