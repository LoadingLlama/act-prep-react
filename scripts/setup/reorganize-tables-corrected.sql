-- =====================================================
-- REORGANIZE ALL TABLES - CORRECTED ORDER
-- =====================================================

-- STEP 1: Create new passage tables FIRST (without dropping old table yet)
-- =====================================================

-- English Passages (5 passages per test)
CREATE TABLE IF NOT EXISTS act_english_passages (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  test_number INTEGER NOT NULL,
  passage_number INTEGER NOT NULL, -- 1-5
  title TEXT,
  introduction TEXT,
  passage_text TEXT NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  UNIQUE(test_number, passage_number)
);

-- Reading Passages (4 passages per test)
CREATE TABLE IF NOT EXISTS act_reading_passages (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  test_number INTEGER NOT NULL,
  passage_number INTEGER NOT NULL, -- 1-4
  passage_type TEXT NOT NULL,
  title TEXT,
  author TEXT,
  source TEXT,
  introduction TEXT,
  passage_text TEXT NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  UNIQUE(test_number, passage_number)
);

-- Science Passages (6-7 passages per test)
CREATE TABLE IF NOT EXISTS act_science_passages (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  test_number INTEGER NOT NULL,
  passage_number INTEGER NOT NULL, -- 1-7
  passage_type TEXT NOT NULL,
  title TEXT,
  introduction TEXT,
  passage_text TEXT NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  UNIQUE(test_number, passage_number)
);

-- STEP 2: Create indexes for new passage tables
-- =====================================================

CREATE INDEX IF NOT EXISTS idx_english_passages_test ON act_english_passages(test_number);
CREATE INDEX IF NOT EXISTS idx_reading_passages_test ON act_reading_passages(test_number);
CREATE INDEX IF NOT EXISTS idx_reading_passages_type ON act_reading_passages(passage_type);
CREATE INDEX IF NOT EXISTS idx_science_passages_test ON act_science_passages(test_number);
CREATE INDEX IF NOT EXISTS idx_science_passages_type ON act_science_passages(passage_type);

-- STEP 3: Rename existing question tables with act_ prefix
-- =====================================================

ALTER TABLE IF EXISTS english_questions RENAME TO act_english_questions;
ALTER TABLE IF EXISTS math_questions RENAME TO act_math_questions;
ALTER TABLE IF EXISTS reading_questions RENAME TO act_reading_questions;
ALTER TABLE IF EXISTS science_questions RENAME TO act_science_questions;
ALTER TABLE IF EXISTS extraction_progress RENAME TO act_extraction_progress;

-- STEP 4: Add passage_id to English questions (without FK constraint yet)
-- =====================================================

ALTER TABLE IF EXISTS act_english_questions
  ADD COLUMN IF NOT EXISTS passage_id UUID;

-- STEP 5: Drop old foreign key constraints
-- =====================================================

ALTER TABLE IF EXISTS act_reading_questions
  DROP CONSTRAINT IF EXISTS reading_questions_passage_id_fkey;

ALTER TABLE IF EXISTS act_science_questions
  DROP CONSTRAINT IF EXISTS science_questions_passage_id_fkey;

-- STEP 6: Update old index names
-- =====================================================

DROP INDEX IF EXISTS idx_english_questions_test;
DROP INDEX IF EXISTS idx_english_questions_lesson;
DROP INDEX IF EXISTS idx_english_questions_category;
DROP INDEX IF EXISTS idx_math_questions_test;
DROP INDEX IF EXISTS idx_math_questions_lesson;
DROP INDEX IF EXISTS idx_math_questions_category;
DROP INDEX IF EXISTS idx_reading_questions_test;
DROP INDEX IF EXISTS idx_reading_questions_passage;
DROP INDEX IF EXISTS idx_reading_questions_lesson;
DROP INDEX IF EXISTS idx_reading_questions_category;
DROP INDEX IF EXISTS idx_science_questions_test;
DROP INDEX IF EXISTS idx_science_questions_passage;
DROP INDEX IF EXISTS idx_science_questions_lesson;
DROP INDEX IF EXISTS idx_science_questions_category;

CREATE INDEX IF NOT EXISTS idx_act_english_questions_test ON act_english_questions(test_number);
CREATE INDEX IF NOT EXISTS idx_act_english_questions_lesson ON act_english_questions(lesson_id);
CREATE INDEX IF NOT EXISTS idx_act_english_questions_category ON act_english_questions(question_category);
CREATE INDEX IF NOT EXISTS idx_act_english_questions_passage ON act_english_questions(passage_number);

CREATE INDEX IF NOT EXISTS idx_act_math_questions_test ON act_math_questions(test_number);
CREATE INDEX IF NOT EXISTS idx_act_math_questions_lesson ON act_math_questions(lesson_id);
CREATE INDEX IF NOT EXISTS idx_act_math_questions_category ON act_math_questions(question_category);

CREATE INDEX IF NOT EXISTS idx_act_reading_questions_test ON act_reading_questions(test_number);
CREATE INDEX IF NOT EXISTS idx_act_reading_questions_passage ON act_reading_questions(passage_id);
CREATE INDEX IF NOT EXISTS idx_act_reading_questions_lesson ON act_reading_questions(lesson_id);
CREATE INDEX IF NOT EXISTS idx_act_reading_questions_category ON act_reading_questions(question_category);

CREATE INDEX IF NOT EXISTS idx_act_science_questions_test ON act_science_questions(test_number);
CREATE INDEX IF NOT EXISTS idx_act_science_questions_passage ON act_science_questions(passage_id);
CREATE INDEX IF NOT EXISTS idx_act_science_questions_lesson ON act_science_questions(lesson_id);
CREATE INDEX IF NOT EXISTS idx_act_science_questions_category ON act_science_questions(question_category);

-- =====================================================
-- IMPORTANT: DO NOT ADD FOREIGN KEY CONSTRAINTS YET
-- Run the migration script first to populate the new tables
-- Then run the final SQL to add constraints and drop old table
-- =====================================================
