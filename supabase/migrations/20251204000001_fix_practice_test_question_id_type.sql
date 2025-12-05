-- Fix practice_test_results.question_id to use INTEGER instead of UUID
-- Practice test questions use integer IDs, not UUIDs

ALTER TABLE practice_test_results
  ALTER COLUMN question_id TYPE INTEGER USING question_id::text::integer;

-- Update index if needed
DROP INDEX IF EXISTS idx_practice_results_question_id;
CREATE INDEX idx_practice_results_question_id ON practice_test_results(question_id);

COMMENT ON COLUMN practice_test_results.question_id IS 'Reference to practice test question ID (integer, not UUID)';
