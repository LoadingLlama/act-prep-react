-- QUICK SETUP: Copy this entire file and paste into Supabase SQL Editor
-- Then click "RUN" to create all tables

-- Table 1: ACT Questions
CREATE TABLE IF NOT EXISTS act_questions (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  test_number INTEGER NOT NULL,
  section TEXT NOT NULL,
  question_number INTEGER NOT NULL,
  passage_id UUID,
  question_stem TEXT NOT NULL,
  choice_a TEXT,
  choice_b TEXT,
  choice_c TEXT,
  choice_d TEXT,
  choice_e TEXT,
  correct_answer TEXT NOT NULL,
  has_figure BOOLEAN DEFAULT false,
  figure_url TEXT,
  figure_reference TEXT,
  question_type TEXT,
  difficulty_level TEXT,
  notes TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  UNIQUE(test_number, section, question_number)
);

-- Table 2: ACT Passages
CREATE TABLE IF NOT EXISTS act_passages (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  test_number INTEGER NOT NULL,
  section TEXT NOT NULL,
  passage_number INTEGER NOT NULL,
  passage_title TEXT,
  passage_text TEXT,
  passage_type TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  UNIQUE(test_number, section, passage_number)
);

-- Table 3: Extraction Progress
CREATE TABLE IF NOT EXISTS extraction_progress (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  test_number INTEGER NOT NULL,
  section TEXT NOT NULL,
  total_questions INTEGER NOT NULL,
  questions_extracted INTEGER DEFAULT 0,
  questions_validated INTEGER DEFAULT 0,
  status TEXT DEFAULT 'pending',
  started_at TIMESTAMP WITH TIME ZONE,
  completed_at TIMESTAMP WITH TIME ZONE,
  UNIQUE(test_number, section)
);

-- Create indexes
CREATE INDEX IF NOT EXISTS idx_questions_test_section ON act_questions(test_number, section);
CREATE INDEX IF NOT EXISTS idx_questions_passage ON act_questions(passage_id);
CREATE INDEX IF NOT EXISTS idx_passages_test_section ON act_passages(test_number, section);

-- Insert progress tracking for all 28 extraction tasks
INSERT INTO extraction_progress (test_number, section, total_questions) VALUES
  (1, 'E', 75), (1, 'M', 60), (1, 'R', 40), (1, 'S', 40),
  (2, 'E', 75), (2, 'M', 60), (2, 'R', 40), (2, 'S', 40),
  (3, 'E', 75), (3, 'M', 60), (3, 'R', 40), (3, 'S', 40),
  (4, 'E', 75), (4, 'M', 60), (4, 'R', 40), (4, 'S', 40),
  (5, 'E', 75), (5, 'M', 60), (5, 'R', 40), (5, 'S', 40),
  (6, 'E', 75), (6, 'M', 60), (6, 'R', 40), (6, 'S', 40),
  (7, 'E', 75), (7, 'M', 60), (7, 'R', 40), (7, 'S', 40)
ON CONFLICT (test_number, section) DO NOTHING;

-- Verify setup
SELECT 'Setup complete! Tables created:' AS message;
SELECT table_name FROM information_schema.tables
WHERE table_schema = 'public'
AND table_name IN ('act_questions', 'act_passages', 'extraction_progress')
ORDER BY table_name;
