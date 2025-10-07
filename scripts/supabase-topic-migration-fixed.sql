-- Add topic-related columns to lessons table
ALTER TABLE lessons
ADD COLUMN IF NOT EXISTS topic_number INTEGER,
ADD COLUMN IF NOT EXISTS topic_lesson_number INTEGER,
ADD COLUMN IF NOT EXISTS topic_title TEXT,
ADD COLUMN IF NOT EXISTS full_topic_code TEXT;

-- Update the existing sentence-structure lesson to Topic 1.1
UPDATE lessons
SET
  title = 'Sentence Structure',
  topic_number = 1,
  topic_lesson_number = 1,
  topic_title = 'Sentence Structure & Grammar Fundamentals',
  full_topic_code = '1.1'
WHERE lesson_key = 'sentence-structure';

-- Create an index on topic_number for faster queries
CREATE INDEX IF NOT EXISTS idx_lessons_topic_number ON lessons(topic_number);

-- Verify the update (using correct column name: subject instead of section)
SELECT
  lesson_key,
  title,
  subject,
  topic_number,
  topic_lesson_number,
  topic_title,
  full_topic_code
FROM lessons
WHERE lesson_key = 'sentence-structure';
