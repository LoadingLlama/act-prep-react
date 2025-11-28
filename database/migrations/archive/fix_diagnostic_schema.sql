-- ================================================================
-- FIX DIAGNOSTIC SCHEMA ISSUES
-- ================================================================
-- This fixes two critical issues:
-- 1. lesson_id should be TEXT (not UUID) to match lessons.id
-- 2. diagnostic_test_results.question_id references wrong table
-- ================================================================

-- PART 1: Add lesson_id columns to practice test tables
-- lesson_id is UUID because lessons.id is UUID
-- ================================================================

ALTER TABLE practice_test_english_questions
  ADD COLUMN IF NOT EXISTS lesson_id UUID;

ALTER TABLE practice_test_math_questions
  ADD COLUMN IF NOT EXISTS lesson_id UUID;

ALTER TABLE practice_test_reading_questions
  ADD COLUMN IF NOT EXISTS lesson_id UUID;

ALTER TABLE practice_test_science_questions
  ADD COLUMN IF NOT EXISTS lesson_id UUID;

-- Add foreign key constraints AFTER columns exist
ALTER TABLE practice_test_english_questions
  DROP CONSTRAINT IF EXISTS practice_test_english_questions_lesson_id_fkey;
ALTER TABLE practice_test_english_questions
  ADD CONSTRAINT practice_test_english_questions_lesson_id_fkey
  FOREIGN KEY (lesson_id) REFERENCES lessons(id) ON DELETE SET NULL;

ALTER TABLE practice_test_math_questions
  DROP CONSTRAINT IF EXISTS practice_test_math_questions_lesson_id_fkey;
ALTER TABLE practice_test_math_questions
  ADD CONSTRAINT practice_test_math_questions_lesson_id_fkey
  FOREIGN KEY (lesson_id) REFERENCES lessons(id) ON DELETE SET NULL;

ALTER TABLE practice_test_reading_questions
  DROP CONSTRAINT IF EXISTS practice_test_reading_questions_lesson_id_fkey;
ALTER TABLE practice_test_reading_questions
  ADD CONSTRAINT practice_test_reading_questions_lesson_id_fkey
  FOREIGN KEY (lesson_id) REFERENCES lessons(id) ON DELETE SET NULL;

ALTER TABLE practice_test_science_questions
  DROP CONSTRAINT IF EXISTS practice_test_science_questions_lesson_id_fkey;
ALTER TABLE practice_test_science_questions
  ADD CONSTRAINT practice_test_science_questions_lesson_id_fkey
  FOREIGN KEY (lesson_id) REFERENCES lessons(id) ON DELETE SET NULL;

-- Add indexes for performance
CREATE INDEX IF NOT EXISTS idx_english_questions_lesson
  ON practice_test_english_questions(lesson_id);
CREATE INDEX IF NOT EXISTS idx_math_questions_lesson
  ON practice_test_math_questions(lesson_id);
CREATE INDEX IF NOT EXISTS idx_reading_questions_lesson
  ON practice_test_reading_questions(lesson_id);
CREATE INDEX IF NOT EXISTS idx_science_questions_lesson
  ON practice_test_science_questions(lesson_id);

-- ================================================================
-- PART 2: Fix diagnostic_test_results table
-- The question_id should reference practice_test_*_questions, not diagnostic_test_questions
-- But we can't have a foreign key to multiple tables, so we remove the constraint
-- ================================================================

-- Drop the foreign key constraint on question_id
ALTER TABLE diagnostic_test_results
  DROP CONSTRAINT IF EXISTS diagnostic_test_results_question_id_fkey;

-- question_id is UUID from practice_test_*_questions tables
-- No foreign key constraint (can't reference 4 different tables)

-- Add a comment to document this
COMMENT ON COLUMN diagnostic_test_results.question_id IS
  'UUID from practice_test_*_questions tables (english/math/reading/science). No FK constraint due to multiple possible tables.';

-- ================================================================
-- VERIFICATION QUERIES
-- ================================================================

-- Check lesson_id columns were added
SELECT
  table_name,
  column_name,
  data_type,
  is_nullable
FROM information_schema.columns
WHERE table_name IN (
  'practice_test_english_questions',
  'practice_test_math_questions',
  'practice_test_reading_questions',
  'practice_test_science_questions'
)
AND column_name = 'lesson_id'
ORDER BY table_name;

-- Check indexes
SELECT
  tablename,
  indexname
FROM pg_indexes
WHERE indexname LIKE 'idx_%_questions_lesson'
ORDER BY tablename;

-- Check foreign key constraints
SELECT
  tc.table_name,
  tc.constraint_name,
  tc.constraint_type,
  kcu.column_name,
  ccu.table_name AS foreign_table_name,
  ccu.column_name AS foreign_column_name
FROM information_schema.table_constraints AS tc
JOIN information_schema.key_column_usage AS kcu
  ON tc.constraint_name = kcu.constraint_name
  AND tc.table_schema = kcu.table_schema
JOIN information_schema.constraint_column_usage AS ccu
  ON ccu.constraint_name = tc.constraint_name
  AND ccu.table_schema = tc.table_schema
WHERE tc.constraint_type = 'FOREIGN KEY'
  AND tc.table_name LIKE 'practice_test%questions'
  AND kcu.column_name = 'lesson_id'
ORDER BY tc.table_name;
