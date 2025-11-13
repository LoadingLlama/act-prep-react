-- ================================================================
-- ADD LESSON MAPPING TO PRACTICE TEST QUESTIONS
-- ================================================================
-- This migration adds lesson_id column to all practice test question tables
-- so that every question can be mapped to a specific lesson for:
--   1. Diagnostic analysis (identify weak lessons)
--   2. Learning path generation (recommend specific lessons)
--   3. Adaptive testing (select questions from weak lessons)
-- ================================================================

-- Create practice test tables if they don't exist
CREATE TABLE IF NOT EXISTS practice_test_english_questions (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  test_number INTEGER NOT NULL,
  question_number INTEGER NOT NULL,
  passage_id UUID,
  question_text TEXT NOT NULL,
  choices JSONB,
  correct_answer TEXT NOT NULL,
  explanation TEXT,
  difficulty TEXT,
  lesson_id TEXT REFERENCES lessons(id) ON DELETE SET NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS practice_test_math_questions (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  test_number INTEGER NOT NULL,
  question_number INTEGER NOT NULL,
  question_text TEXT NOT NULL,
  choices JSONB,
  correct_answer TEXT NOT NULL,
  explanation TEXT,
  difficulty TEXT,
  lesson_id TEXT REFERENCES lessons(id) ON DELETE SET NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS practice_test_reading_questions (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  test_number INTEGER NOT NULL,
  question_number INTEGER NOT NULL,
  passage_id UUID,
  question_text TEXT NOT NULL,
  choices JSONB,
  correct_answer TEXT NOT NULL,
  explanation TEXT,
  difficulty TEXT,
  lesson_id TEXT REFERENCES lessons(id) ON DELETE SET NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS practice_test_science_questions (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  test_number INTEGER NOT NULL,
  question_number INTEGER NOT NULL,
  passage_id UUID,
  question_text TEXT NOT NULL,
  choices JSONB,
  correct_answer TEXT NOT NULL,
  explanation TEXT,
  difficulty TEXT,
  lesson_id TEXT REFERENCES lessons(id) ON DELETE SET NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Add lesson_id column if tables already existed without it
DO $$
BEGIN
  -- English
  IF NOT EXISTS (
    SELECT 1 FROM information_schema.columns
    WHERE table_name = 'practice_test_english_questions' AND column_name = 'lesson_id'
  ) THEN
    ALTER TABLE practice_test_english_questions
    ADD COLUMN lesson_id TEXT REFERENCES lessons(id) ON DELETE SET NULL;
  END IF;

  -- Math
  IF NOT EXISTS (
    SELECT 1 FROM information_schema.columns
    WHERE table_name = 'practice_test_math_questions' AND column_name = 'lesson_id'
  ) THEN
    ALTER TABLE practice_test_math_questions
    ADD COLUMN lesson_id TEXT REFERENCES lessons(id) ON DELETE SET NULL;
  END IF;

  -- Reading
  IF NOT EXISTS (
    SELECT 1 FROM information_schema.columns
    WHERE table_name = 'practice_test_reading_questions' AND column_name = 'lesson_id'
  ) THEN
    ALTER TABLE practice_test_reading_questions
    ADD COLUMN lesson_id TEXT REFERENCES lessons(id) ON DELETE SET NULL;
  END IF;

  -- Science
  IF NOT EXISTS (
    SELECT 1 FROM information_schema.columns
    WHERE table_name = 'practice_test_science_questions' AND column_name = 'lesson_id'
  ) THEN
    ALTER TABLE practice_test_science_questions
    ADD COLUMN lesson_id TEXT REFERENCES lessons(id) ON DELETE SET NULL;
  END IF;
END $$;

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
