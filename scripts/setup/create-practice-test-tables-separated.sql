-- =====================================================
-- PRACTICE TEST TABLES - SEPARATED BY SECTION
-- =====================================================
-- This schema separates each test section into its own table
-- with dedicated passage tables for sections that use passages
-- =====================================================

-- =====================================================
-- PASSAGES TABLES
-- =====================================================

-- English Passages (5 passages per test, 15 questions each)
CREATE TABLE IF NOT EXISTS practice_test_english_passages (
  id SERIAL PRIMARY KEY,
  test_number INTEGER NOT NULL,
  passage_number INTEGER NOT NULL, -- 1-5
  passage_type TEXT NOT NULL, -- 'literary_narrative', 'social_studies', 'natural_science', 'humanities', 'personal_essay'
  passage_text TEXT NOT NULL,
  word_count INTEGER,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  UNIQUE(test_number, passage_number)
);

-- Reading Passages (4 passages per test, 10 questions each)
CREATE TABLE IF NOT EXISTS practice_test_reading_passages (
  id SERIAL PRIMARY KEY,
  test_number INTEGER NOT NULL,
  passage_number INTEGER NOT NULL, -- 1-4
  passage_type TEXT NOT NULL, -- 'literary_narrative', 'social_science', 'humanities', 'natural_science'
  passage_title TEXT,
  passage_text TEXT NOT NULL,
  word_count INTEGER,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  UNIQUE(test_number, passage_number)
);

-- Science Passages (6-7 passages per test, varying question counts)
CREATE TABLE IF NOT EXISTS practice_test_science_passages (
  id SERIAL PRIMARY KEY,
  test_number INTEGER NOT NULL,
  passage_number INTEGER NOT NULL, -- 1-7
  passage_type TEXT NOT NULL, -- 'data_representation', 'research_summary', 'conflicting_viewpoints'
  passage_title TEXT,
  passage_text TEXT NOT NULL,
  passage_data JSONB, -- For tables, graphs, experimental data
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  UNIQUE(test_number, passage_number)
);

-- =====================================================
-- QUESTIONS TABLES
-- =====================================================

-- English Questions (75 per test)
CREATE TABLE IF NOT EXISTS practice_test_english_questions (
  id SERIAL PRIMARY KEY,
  test_number INTEGER NOT NULL,
  question_number INTEGER NOT NULL, -- 1-75
  passage_id INTEGER REFERENCES practice_test_english_passages(id) ON DELETE CASCADE,
  question_text TEXT NOT NULL, -- The underlined portion or sentence being tested
  question_prompt TEXT, -- Optional additional context or instruction
  choices JSONB NOT NULL, -- Array: ["A. NO CHANGE", "B. ...", "C. ...", "D. ..."]
  correct_answer INTEGER NOT NULL, -- 0-based index (0=A, 1=B, 2=C, 3=D)
  explanation TEXT,
  question_type TEXT, -- 'grammar', 'punctuation', 'style', 'rhetorical_skills', 'organization', etc.
  difficulty TEXT, -- 'easy', 'medium', 'hard'
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  UNIQUE(test_number, question_number)
);

-- Math Questions (60 per test) - No passages
CREATE TABLE IF NOT EXISTS practice_test_math_questions (
  id SERIAL PRIMARY KEY,
  test_number INTEGER NOT NULL,
  question_number INTEGER NOT NULL, -- 1-60
  question_text TEXT NOT NULL,
  question_image_url TEXT, -- Optional image for diagrams
  choices JSONB NOT NULL, -- Array: ["A. ...", "B. ...", "C. ...", "D. ...", "E. ..."]
  correct_answer INTEGER NOT NULL, -- 0-based index (0=A, 1=B, 2=C, 3=D, 4=E)
  explanation TEXT,
  question_type TEXT, -- 'algebra', 'geometry', 'trigonometry', 'statistics', etc.
  difficulty TEXT, -- 'easy', 'medium', 'hard'
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  UNIQUE(test_number, question_number)
);

-- Reading Questions (40 per test)
CREATE TABLE IF NOT EXISTS practice_test_reading_questions (
  id SERIAL PRIMARY KEY,
  test_number INTEGER NOT NULL,
  question_number INTEGER NOT NULL, -- 1-40
  passage_id INTEGER REFERENCES practice_test_reading_passages(id) ON DELETE CASCADE,
  question_text TEXT NOT NULL,
  line_reference TEXT, -- e.g., "Lines 23-25" if applicable
  choices JSONB NOT NULL, -- Array: ["A. ...", "B. ...", "C. ...", "D. ..."]
  correct_answer INTEGER NOT NULL, -- 0-based index (0=A, 1=B, 2=C, 3=D)
  explanation TEXT,
  question_type TEXT, -- 'main_idea', 'detail', 'inference', 'vocabulary', 'author_purpose', etc.
  difficulty TEXT, -- 'easy', 'medium', 'hard'
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  UNIQUE(test_number, question_number)
);

-- Science Questions (40 per test)
CREATE TABLE IF NOT EXISTS practice_test_science_questions (
  id SERIAL PRIMARY KEY,
  test_number INTEGER NOT NULL,
  question_number INTEGER NOT NULL, -- 1-40
  passage_id INTEGER REFERENCES practice_test_science_passages(id) ON DELETE CASCADE,
  question_text TEXT NOT NULL,
  choices JSONB NOT NULL, -- Array: ["A. ...", "B. ...", "C. ...", "D. ..."]
  correct_answer INTEGER NOT NULL, -- 0-based index (0=A, 1=B, 2=C, 3=D)
  explanation TEXT,
  question_type TEXT, -- 'data_interpretation', 'experimental_design', 'hypothesis_testing', etc.
  difficulty TEXT, -- 'easy', 'medium', 'hard'
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  UNIQUE(test_number, question_number)
);

-- =====================================================
-- INDEXES FOR PERFORMANCE
-- =====================================================

-- English
CREATE INDEX IF NOT EXISTS idx_english_passages_test ON practice_test_english_passages(test_number);
CREATE INDEX IF NOT EXISTS idx_english_questions_test ON practice_test_english_questions(test_number);
CREATE INDEX IF NOT EXISTS idx_english_questions_passage ON practice_test_english_questions(passage_id);

-- Math
CREATE INDEX IF NOT EXISTS idx_math_questions_test ON practice_test_math_questions(test_number);

-- Reading
CREATE INDEX IF NOT EXISTS idx_reading_passages_test ON practice_test_reading_passages(test_number);
CREATE INDEX IF NOT EXISTS idx_reading_questions_test ON practice_test_reading_questions(test_number);
CREATE INDEX IF NOT EXISTS idx_reading_questions_passage ON practice_test_reading_questions(passage_id);

-- Science
CREATE INDEX IF NOT EXISTS idx_science_passages_test ON practice_test_science_passages(test_number);
CREATE INDEX IF NOT EXISTS idx_science_questions_test ON practice_test_science_questions(test_number);
CREATE INDEX IF NOT EXISTS idx_science_questions_passage ON practice_test_science_questions(passage_id);

-- =====================================================
-- ROW LEVEL SECURITY (RLS)
-- =====================================================

-- Enable RLS on all tables
ALTER TABLE practice_test_english_passages ENABLE ROW LEVEL SECURITY;
ALTER TABLE practice_test_english_questions ENABLE ROW LEVEL SECURITY;
ALTER TABLE practice_test_math_questions ENABLE ROW LEVEL SECURITY;
ALTER TABLE practice_test_reading_passages ENABLE ROW LEVEL SECURITY;
ALTER TABLE practice_test_reading_questions ENABLE ROW LEVEL SECURITY;
ALTER TABLE practice_test_science_passages ENABLE ROW LEVEL SECURITY;
ALTER TABLE practice_test_science_questions ENABLE ROW LEVEL SECURITY;

-- Create policies for public read access
CREATE POLICY "Enable read access for all users" ON practice_test_english_passages FOR SELECT TO public USING (true);
CREATE POLICY "Enable read access for all users" ON practice_test_english_questions FOR SELECT TO public USING (true);
CREATE POLICY "Enable read access for all users" ON practice_test_math_questions FOR SELECT TO public USING (true);
CREATE POLICY "Enable read access for all users" ON practice_test_reading_passages FOR SELECT TO public USING (true);
CREATE POLICY "Enable read access for all users" ON practice_test_reading_questions FOR SELECT TO public USING (true);
CREATE POLICY "Enable read access for all users" ON practice_test_science_passages FOR SELECT TO public USING (true);
CREATE POLICY "Enable read access for all users" ON practice_test_science_questions FOR SELECT TO public USING (true);

-- =====================================================
-- VERIFICATION
-- =====================================================

-- Show all created tables
SELECT
  table_name,
  (SELECT COUNT(*) FROM information_schema.columns WHERE table_name = t.table_name) as column_count
FROM information_schema.tables t
WHERE table_name LIKE 'practice_test_%'
AND table_schema = 'public'
ORDER BY table_name;
