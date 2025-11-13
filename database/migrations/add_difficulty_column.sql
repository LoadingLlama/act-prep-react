-- Add difficulty column to lesson_examples table
ALTER TABLE lesson_examples
ADD COLUMN IF NOT EXISTS difficulty TEXT;

-- Add a comment to document the column
COMMENT ON COLUMN lesson_examples.difficulty IS 'Difficulty level: easy, medium, hard, or ultrathink';
