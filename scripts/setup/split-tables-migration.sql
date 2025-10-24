-- =====================================================
-- SPLIT ACT_QUESTIONS INTO SECTION-SPECIFIC TABLES
-- =====================================================

-- 1. CREATE ENGLISH_QUESTIONS TABLE
CREATE TABLE IF NOT EXISTS english_questions (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  test_number INTEGER NOT NULL,
  question_number INTEGER NOT NULL,
  passage_number INTEGER, -- Which passage (1-5)
  question_stem TEXT NOT NULL,
  underlined_text TEXT,
  context_before TEXT,
  context_after TEXT,
  choice_a TEXT NOT NULL,
  choice_b TEXT NOT NULL,
  choice_c TEXT NOT NULL,
  choice_d TEXT NOT NULL,
  correct_answer TEXT NOT NULL,
  question_type TEXT NOT NULL, -- comma-splice, verb-tense, etc.
  question_category TEXT NOT NULL, -- CSE, KLA, POW
  lesson_id UUID REFERENCES lessons(id),
  difficulty_level TEXT,
  notes TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  UNIQUE(test_number, question_number)
);

-- 2. CREATE MATH_QUESTIONS TABLE
CREATE TABLE IF NOT EXISTS math_questions (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  test_number INTEGER NOT NULL,
  question_number INTEGER NOT NULL,
  question_stem TEXT NOT NULL,
  choice_a TEXT NOT NULL,
  choice_b TEXT NOT NULL,
  choice_c TEXT NOT NULL,
  choice_d TEXT NOT NULL,
  choice_e TEXT NOT NULL,
  correct_answer TEXT NOT NULL,
  question_type TEXT NOT NULL, -- algebra, geometry, functions, etc.
  question_category TEXT NOT NULL, -- PHM-A, PHM-G, PHM-N, PHM-F, PHM-S, IES
  lesson_id UUID REFERENCES lessons(id),
  has_figure BOOLEAN DEFAULT false,
  figure_url TEXT,
  difficulty_level TEXT,
  notes TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  UNIQUE(test_number, question_number)
);

-- 3. CREATE READING_QUESTIONS TABLE
CREATE TABLE IF NOT EXISTS reading_questions (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  test_number INTEGER NOT NULL,
  question_number INTEGER NOT NULL,
  passage_id UUID REFERENCES act_passages(id),
  question_stem TEXT NOT NULL,
  choice_a TEXT NOT NULL,
  choice_b TEXT NOT NULL,
  choice_c TEXT NOT NULL,
  choice_d TEXT NOT NULL,
  correct_answer TEXT NOT NULL,
  question_type TEXT NOT NULL, -- main-idea, detail, inference, vocabulary, etc.
  question_category TEXT NOT NULL, -- KID, CS, IKI
  lesson_id UUID REFERENCES lessons(id),
  difficulty_level TEXT,
  notes TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  UNIQUE(test_number, question_number)
);

-- 4. CREATE SCIENCE_QUESTIONS TABLE
CREATE TABLE IF NOT EXISTS science_questions (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  test_number INTEGER NOT NULL,
  question_number INTEGER NOT NULL,
  passage_id UUID REFERENCES act_passages(id),
  question_stem TEXT NOT NULL,
  choice_a TEXT NOT NULL,
  choice_b TEXT NOT NULL,
  choice_c TEXT NOT NULL,
  choice_d TEXT NOT NULL,
  correct_answer TEXT NOT NULL,
  question_type TEXT NOT NULL, -- data-interpretation, trends, experimental-design, etc.
  question_category TEXT NOT NULL, -- IOD, SIN, EMI
  lesson_id UUID REFERENCES lessons(id),
  has_figure BOOLEAN DEFAULT false,
  figure_url TEXT,
  difficulty_level TEXT,
  notes TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  UNIQUE(test_number, question_number)
);

-- 5. ENHANCE ACT_PASSAGES TABLE
DROP TABLE IF EXISTS act_passages CASCADE;
CREATE TABLE act_passages (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  test_number INTEGER NOT NULL,
  section TEXT NOT NULL, -- 'R' for Reading, 'S' for Science
  passage_number INTEGER NOT NULL, -- 1-4 for Reading, varies for Science
  passage_type TEXT, -- 'LITERARY', 'SOCIAL SCIENCE', 'HUMANITIES', 'NATURAL SCIENCE' for Reading
                      -- 'DATA REPRESENTATION', 'RESEARCH SUMMARIES', 'CONFLICTING VIEWPOINTS' for Science
  title TEXT,
  passage_text TEXT NOT NULL,
  author TEXT,
  source TEXT,
  introduction TEXT, -- The italicized intro before passage
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  UNIQUE(test_number, section, passage_number)
);

-- Create indexes
CREATE INDEX IF NOT EXISTS idx_english_questions_test ON english_questions(test_number);
CREATE INDEX IF NOT EXISTS idx_english_questions_lesson ON english_questions(lesson_id);
CREATE INDEX IF NOT EXISTS idx_english_questions_category ON english_questions(question_category);

CREATE INDEX IF NOT EXISTS idx_math_questions_test ON math_questions(test_number);
CREATE INDEX IF NOT EXISTS idx_math_questions_lesson ON math_questions(lesson_id);
CREATE INDEX IF NOT EXISTS idx_math_questions_category ON math_questions(question_category);

CREATE INDEX IF NOT EXISTS idx_reading_questions_test ON reading_questions(test_number);
CREATE INDEX IF NOT EXISTS idx_reading_questions_passage ON reading_questions(passage_id);
CREATE INDEX IF NOT EXISTS idx_reading_questions_lesson ON reading_questions(lesson_id);
CREATE INDEX IF NOT EXISTS idx_reading_questions_category ON reading_questions(question_category);

CREATE INDEX IF NOT EXISTS idx_science_questions_test ON science_questions(test_number);
CREATE INDEX IF NOT EXISTS idx_science_questions_passage ON science_questions(passage_id);
CREATE INDEX IF NOT EXISTS idx_science_questions_lesson ON science_questions(lesson_id);
CREATE INDEX IF NOT EXISTS idx_science_questions_category ON science_questions(question_category);

CREATE INDEX IF NOT EXISTS idx_passages_test_section ON act_passages(test_number, section);

-- Grant permissions (adjust as needed for your setup)
-- ALTER TABLE english_questions ENABLE ROW LEVEL SECURITY;
-- ALTER TABLE math_questions ENABLE ROW LEVEL SECURITY;
-- ALTER TABLE reading_questions ENABLE ROW LEVEL SECURITY;
-- ALTER TABLE science_questions ENABLE ROW LEVEL SECURITY;
-- ALTER TABLE act_passages ENABLE ROW LEVEL SECURITY;
