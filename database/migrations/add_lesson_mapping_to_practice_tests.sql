-- ================================================================
-- ADD LESSON MAPPING TO PRACTICE TEST QUESTIONS
-- ================================================================
-- This migration adds lesson_id column to all practice test question tables
-- so that every question can be mapped to a specific lesson for:
--   1. Diagnostic analysis (identify weak lessons)
--   2. Learning path generation (recommend specific lessons)
--   3. Adaptive testing (select questions from weak lessons)
-- ================================================================

-- Add lesson_id column to English questions
ALTER TABLE practice_test_english_questions
ADD COLUMN IF NOT EXISTS lesson_id TEXT REFERENCES lessons(id);

-- Add lesson_id column to Math questions
ALTER TABLE practice_test_math_questions
ADD COLUMN IF NOT EXISTS lesson_id TEXT REFERENCES lessons(id);

-- Add lesson_id column to Reading questions
ALTER TABLE practice_test_reading_questions
ADD COLUMN IF NOT EXISTS lesson_id TEXT REFERENCES lessons(id);

-- Add lesson_id column to Science questions
ALTER TABLE practice_test_science_questions
ADD COLUMN IF NOT EXISTS lesson_id TEXT REFERENCES lessons(id);

-- Create indexes for efficient querying by lesson
CREATE INDEX IF NOT EXISTS idx_english_questions_lesson
ON practice_test_english_questions(lesson_id);

CREATE INDEX IF NOT EXISTS idx_math_questions_lesson
ON practice_test_math_questions(lesson_id);

CREATE INDEX IF NOT EXISTS idx_reading_questions_lesson
ON practice_test_reading_questions(lesson_id);

CREATE INDEX IF NOT EXISTS idx_science_questions_lesson
ON practice_test_science_questions(lesson_id);

-- ================================================================
-- VERIFICATION QUERIES
-- ================================================================
-- Run these after migration to verify:
--
-- Check that columns were added:
-- SELECT column_name, data_type FROM information_schema.columns
-- WHERE table_name IN (
--   'practice_test_english_questions',
--   'practice_test_math_questions',
--   'practice_test_reading_questions',
--   'practice_test_science_questions'
-- ) AND column_name = 'lesson_id';
--
-- Check that indexes were created:
-- SELECT tablename, indexname FROM pg_indexes
-- WHERE indexname LIKE 'idx_%_questions_lesson';
-- ================================================================
