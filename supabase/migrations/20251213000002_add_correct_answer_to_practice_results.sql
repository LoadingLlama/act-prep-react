-- Add correct_answer column to practice_test_results table
-- This stores what the correct answer was for comparison
ALTER TABLE practice_test_results
ADD COLUMN IF NOT EXISTS correct_answer TEXT;

-- Add comment for documentation
COMMENT ON COLUMN practice_test_results.correct_answer IS 'The correct answer for this question (letter A-K)';
