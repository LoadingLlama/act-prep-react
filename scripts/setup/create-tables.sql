-- ACT Question Bank Database Schema
-- Created: 2025-10-22
-- Purpose: Store 1,680+ questions from 7 ACT practice tests

-- ============================================================================
-- TABLE 1: ACT Passages
-- ============================================================================
CREATE TABLE IF NOT EXISTS act_passages (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  test_number INTEGER NOT NULL CHECK (test_number BETWEEN 1 AND 7),
  section VARCHAR(1) NOT NULL CHECK (section IN ('E', 'M', 'R', 'S')),
  passage_number INTEGER NOT NULL,
  passage_title TEXT,
  passage_text TEXT,
  passage_type VARCHAR(50), -- 'literary_narrative', 'social_science', 'humanities', 'natural_science', 'data_representation', 'research_summary', 'conflicting_viewpoints'
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  UNIQUE(test_number, section, passage_number)
);

-- ============================================================================
-- TABLE 2: ACT Questions (Main table)
-- ============================================================================
CREATE TABLE IF NOT EXISTS act_questions (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  test_number INTEGER NOT NULL CHECK (test_number BETWEEN 1 AND 7),
  section VARCHAR(1) NOT NULL CHECK (section IN ('E', 'M', 'R', 'S')),
  question_number INTEGER NOT NULL CHECK (question_number > 0),
  passage_id UUID REFERENCES act_passages(id) ON DELETE SET NULL,

  -- Question content
  question_stem TEXT NOT NULL,
  choice_a TEXT,
  choice_b TEXT,
  choice_c TEXT,
  choice_d TEXT,
  choice_e TEXT, -- Only for Math (F-K become A-E in storage)
  correct_answer VARCHAR(1) NOT NULL CHECK (correct_answer IN ('A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'J', 'K')),

  -- Figure/diagram info
  has_figure BOOLEAN DEFAULT false,
  figure_url TEXT,
  figure_reference TEXT,

  -- Classification (to be filled later)
  question_type VARCHAR(100),
  difficulty_level VARCHAR(20) CHECK (difficulty_level IN ('easy', 'medium', 'hard')),

  -- Lesson tagging
  primary_lesson_id UUID,
  primary_lesson_key VARCHAR(100),
  related_lesson_ids UUID[],
  lesson_tags TEXT[],

  -- Answer explanation (to be generated)
  correct_answer_explanation TEXT,
  key_concept VARCHAR(100),
  solution_walkthrough JSONB,

  -- Duplicate detection
  is_duplicate BOOLEAN DEFAULT false,
  original_question_id UUID REFERENCES act_questions(id) ON DELETE SET NULL,
  similarity_score DECIMAL(3,2),
  embedding VECTOR(1536), -- For semantic search

  -- Metadata
  notes TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),

  UNIQUE(test_number, section, question_number)
);

-- ============================================================================
-- TABLE 3: ACT Distractors (Wrong answer analysis)
-- ============================================================================
CREATE TABLE IF NOT EXISTS act_distractors (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  question_id UUID NOT NULL REFERENCES act_questions(id) ON DELETE CASCADE,
  choice_letter VARCHAR(1) NOT NULL CHECK (choice_letter IN ('A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'J', 'K')),
  choice_text TEXT NOT NULL,

  -- Analysis (to be filled later in Phase 3)
  distractor_type VARCHAR(100), -- 'punctuation_error', 'verb_tense_mismatch', 'wordiness', etc.
  why_wrong TEXT,
  common_misconception TEXT,

  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),

  UNIQUE(question_id, choice_letter)
);

-- ============================================================================
-- TABLE 4: Extraction Progress (tracking)
-- ============================================================================
CREATE TABLE IF NOT EXISTS extraction_progress (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  test_number INTEGER NOT NULL CHECK (test_number BETWEEN 1 AND 7),
  section VARCHAR(1) NOT NULL CHECK (section IN ('E', 'M', 'R', 'S')),
  total_questions INTEGER NOT NULL,
  questions_extracted INTEGER DEFAULT 0,
  questions_validated INTEGER DEFAULT 0,
  status VARCHAR(20) DEFAULT 'pending' CHECK (status IN ('pending', 'in_progress', 'completed', 'validated')),
  started_at TIMESTAMP WITH TIME ZONE,
  completed_at TIMESTAMP WITH TIME ZONE,
  notes TEXT,

  UNIQUE(test_number, section)
);

-- ============================================================================
-- INDEXES for Performance
-- ============================================================================

-- Questions table indexes
CREATE INDEX IF NOT EXISTS idx_questions_test_section ON act_questions(test_number, section);
CREATE INDEX IF NOT EXISTS idx_questions_passage ON act_questions(passage_id);
CREATE INDEX IF NOT EXISTS idx_questions_type ON act_questions(question_type);
CREATE INDEX IF NOT EXISTS idx_questions_primary_lesson ON act_questions(primary_lesson_key);
CREATE INDEX IF NOT EXISTS idx_questions_duplicate ON act_questions(is_duplicate) WHERE is_duplicate = false;

-- Passages table indexes
CREATE INDEX IF NOT EXISTS idx_passages_test_section ON act_passages(test_number, section);

-- Distractors table indexes
CREATE INDEX IF NOT EXISTS idx_distractors_question ON act_distractors(question_id);

-- Progress table indexes
CREATE INDEX IF NOT EXISTS idx_progress_status ON extraction_progress(status);

-- ============================================================================
-- FUNCTIONS & TRIGGERS
-- ============================================================================

-- Auto-update updated_at timestamp
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ language 'plpgsql';

CREATE TRIGGER update_act_questions_updated_at BEFORE UPDATE ON act_questions
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_act_passages_updated_at BEFORE UPDATE ON act_passages
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

-- ============================================================================
-- INITIAL DATA: Extraction Progress Tracker
-- ============================================================================

-- Insert all 28 extraction tasks (7 tests × 4 sections)
INSERT INTO extraction_progress (test_number, section, total_questions) VALUES
  (1, 'E', 75), (1, 'M', 60), (1, 'R', 40), (1, 'S', 40),
  (2, 'E', 75), (2, 'M', 60), (2, 'R', 40), (2, 'S', 40),
  (3, 'E', 75), (3, 'M', 60), (3, 'R', 40), (3, 'S', 40),
  (4, 'E', 75), (4, 'M', 60), (4, 'R', 40), (4, 'S', 40),
  (5, 'E', 75), (5, 'M', 60), (5, 'R', 40), (5, 'S', 40),
  (6, 'E', 75), (6, 'M', 60), (6, 'R', 40), (6, 'S', 40),
  (7, 'E', 75), (7, 'M', 60), (7, 'R', 40), (7, 'S', 40)
ON CONFLICT (test_number, section) DO NOTHING;

-- ============================================================================
-- VERIFICATION QUERIES
-- ============================================================================

-- Check tables were created
SELECT table_name
FROM information_schema.tables
WHERE table_schema = 'public'
  AND table_name IN ('act_questions', 'act_passages', 'act_distractors', 'extraction_progress')
ORDER BY table_name;

-- Check extraction progress initialized
SELECT test_number, section, total_questions, status
FROM extraction_progress
ORDER BY test_number, section;

-- Summary
SELECT
  'Database setup complete!' as message,
  COUNT(*) as total_extraction_tasks,
  SUM(total_questions) as total_questions_to_extract
FROM extraction_progress;
