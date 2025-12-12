-- Add unique constraint for practice_test_results to prevent duplicates
-- This allows upsert operations to work correctly

-- First, remove any existing duplicates
DELETE FROM practice_test_results a
USING practice_test_results b
WHERE a.id > b.id
AND a.practice_session_id = b.practice_session_id
AND a.question_id = b.question_id;

-- Add unique constraint
ALTER TABLE practice_test_results
ADD CONSTRAINT practice_test_results_session_question_unique
UNIQUE (practice_session_id, question_id);

-- Add comment
COMMENT ON CONSTRAINT practice_test_results_session_question_unique ON practice_test_results
IS 'Ensures each question can only be answered once per session';
