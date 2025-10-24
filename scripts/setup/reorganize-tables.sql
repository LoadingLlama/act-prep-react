-- =====================================================
-- REORGANIZE ALL TABLES WITH PROPER PREFIXES AND SPLIT PASSAGES
-- =====================================================

-- STEP 1: Create properly named passage tables
-- =====================================================

-- English Passages (5 passages per test)
CREATE TABLE IF NOT EXISTS act_english_passages (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  test_number INTEGER NOT NULL,
  passage_number INTEGER NOT NULL, -- 1-5
  title TEXT,
  introduction TEXT, -- Context about the passage
  passage_text TEXT NOT NULL, -- The full passage text
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  UNIQUE(test_number, passage_number)
);

-- Reading Passages (4 passages per test)
CREATE TABLE IF NOT EXISTS act_reading_passages (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  test_number INTEGER NOT NULL,
  passage_number INTEGER NOT NULL, -- 1-4
  passage_type TEXT NOT NULL, -- 'LITERARY NARRATIVE', 'SOCIAL SCIENCE', 'HUMANITIES', 'NATURAL SCIENCE'
  title TEXT,
  author TEXT,
  source TEXT,
  introduction TEXT, -- The italicized intro (e.g., "LITERARY NARRATIVE: This passage is adapted from...")
  passage_text TEXT NOT NULL, -- The full passage text
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  UNIQUE(test_number, passage_number)
);

-- Science Passages (6-7 passages per test)
CREATE TABLE IF NOT EXISTS act_science_passages (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  test_number INTEGER NOT NULL,
  passage_number INTEGER NOT NULL, -- 1-7
  passage_type TEXT NOT NULL, -- 'DATA REPRESENTATION', 'RESEARCH SUMMARIES', 'CONFLICTING VIEWPOINTS'
  title TEXT,
  introduction TEXT, -- Context/description
  passage_text TEXT NOT NULL, -- Tables, graphs, experiment descriptions
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  UNIQUE(test_number, passage_number)
);

-- STEP 2: Rename existing question tables with act_ prefix
-- =====================================================

-- Rename english_questions to act_english_questions
ALTER TABLE IF EXISTS english_questions RENAME TO act_english_questions;

-- Rename math_questions to act_math_questions
ALTER TABLE IF EXISTS math_questions RENAME TO act_math_questions;

-- Rename reading_questions to act_reading_questions
ALTER TABLE IF EXISTS reading_questions RENAME TO act_reading_questions;

-- Rename science_questions to act_science_questions
ALTER TABLE IF EXISTS science_questions RENAME TO act_science_questions;

-- STEP 3: Update foreign key references in renamed tables
-- =====================================================

-- Update reading_questions to reference new reading_passages table
ALTER TABLE IF EXISTS act_reading_questions
  DROP CONSTRAINT IF EXISTS reading_questions_passage_id_fkey;

ALTER TABLE IF EXISTS act_reading_questions
  ADD CONSTRAINT act_reading_questions_passage_id_fkey
  FOREIGN KEY (passage_id) REFERENCES act_reading_passages(id);

-- Update science_questions to reference new science_passages table
ALTER TABLE IF EXISTS act_science_questions
  DROP CONSTRAINT IF EXISTS science_questions_passage_id_fkey;

ALTER TABLE IF EXISTS act_science_questions
  ADD CONSTRAINT act_science_questions_passage_id_fkey
  FOREIGN KEY (passage_id) REFERENCES act_science_passages(id);

-- STEP 4: Add passage_id to English questions
-- =====================================================

-- Add passage_id column to English questions to link to passages
ALTER TABLE IF EXISTS act_english_questions
  ADD COLUMN IF NOT EXISTS passage_id UUID REFERENCES act_english_passages(id);

-- STEP 5: Rename extraction_progress
-- =====================================================

ALTER TABLE IF EXISTS extraction_progress RENAME TO act_extraction_progress;

-- STEP 6: Create indexes for new passage tables
-- =====================================================

CREATE INDEX IF NOT EXISTS idx_english_passages_test ON act_english_passages(test_number);
CREATE INDEX IF NOT EXISTS idx_reading_passages_test ON act_reading_passages(test_number);
CREATE INDEX IF NOT EXISTS idx_reading_passages_type ON act_reading_passages(passage_type);
CREATE INDEX IF NOT EXISTS idx_science_passages_test ON act_science_passages(test_number);
CREATE INDEX IF NOT EXISTS idx_science_passages_type ON act_science_passages(passage_type);

CREATE INDEX IF NOT EXISTS idx_english_questions_passage ON act_english_questions(passage_id);

-- STEP 7: Update existing index names to match new table names
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

-- STEP 8: Drop old act_passages table
-- =====================================================

DROP TABLE IF EXISTS act_passages CASCADE;

-- =====================================================
-- FINAL TABLE STRUCTURE:
-- =====================================================
--
-- ACT PRACTICE TEST TABLES (act_ prefix):
--   - act_english_questions (75 per test)
--   - act_english_passages (5 per test)
--   - act_math_questions (60 per test)
--   - act_reading_questions (40 per test)
--   - act_reading_passages (4 per test)
--   - act_science_questions (40 per test)
--   - act_science_passages (6-7 per test)
--   - act_extraction_progress (admin/meta)
--   - act_questions (legacy unified table - can be dropped later)
--
-- CORE SYSTEM TABLES (no prefix):
--   - lessons (84 total)
--
-- =====================================================
