-- ================================================================
-- CREATE DIAGNOSTIC TEST TABLES (IF MISSING)
-- ================================================================
-- **RUN THIS FIRST** before the other migrations
-- This ensures diagnostic tables exist with proper foreign keys
-- ================================================================

-- ================================================================
-- 0. ENSURE LESSONS TABLE HAS CORRECT STRUCTURE
-- ================================================================
-- Check if lessons table exists with UUID id and fix it
DO $$
DECLARE
  lessons_id_type text;
BEGIN
  -- Check if lessons table exists and what type its id is
  SELECT data_type INTO lessons_id_type
  FROM information_schema.columns
  WHERE table_name = 'lessons' AND column_name = 'id';

  -- If lessons uses UUID, we need to drop and recreate with TEXT id
  -- because lesson identifiers like 'reading-1.1' are TEXT
  IF lessons_id_type = 'uuid' THEN
    -- Drop dependent tables that will be recreated in other migrations
    DROP TABLE IF EXISTS learning_path_items CASCADE;
    DROP TABLE IF EXISTS user_lesson_performance CASCADE;
    DROP TABLE IF EXISTS diagnostic_test_results CASCADE;
    DROP TABLE IF EXISTS diagnostic_test_questions CASCADE;

    -- NOTE: Practice test tables are NOT dropped here - they're handled in migration #2
    -- If they exist with UUID lesson_id references, migration #2 will handle them

    -- Drop and recreate lessons table with TEXT id
    DROP TABLE IF EXISTS lessons CASCADE;

    CREATE TABLE lessons (
      id TEXT PRIMARY KEY,
      section TEXT NOT NULL CHECK (section IN ('english', 'math', 'reading', 'science', 'getting-started')),
      title TEXT NOT NULL,
      description TEXT,
      content TEXT,
      difficulty TEXT CHECK (difficulty IN ('beginner', 'intermediate', 'advanced')),
      estimated_minutes INTEGER,
      order_index INTEGER,
      created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
      updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
    );

    -- Enable RLS
    ALTER TABLE lessons ENABLE ROW LEVEL SECURITY;

    -- Everyone can read lessons
    DROP POLICY IF EXISTS "Lessons are viewable by everyone" ON lessons;
    CREATE POLICY "Lessons are viewable by everyone"
      ON lessons FOR SELECT
      USING (true);
  END IF;
END $$;

-- ================================================================
-- 1. CHECK AND HANDLE EXISTING DIAGNOSTIC TABLES
-- ================================================================
-- If diagnostic_test_sessions exists with INTEGER id, drop all diagnostic tables
DO $$
DECLARE
  sessions_id_type text;
BEGIN
  SELECT data_type INTO sessions_id_type
  FROM information_schema.columns
  WHERE table_name = 'diagnostic_test_sessions' AND column_name = 'id';

  IF sessions_id_type = 'integer' THEN
    -- Old structure, drop everything and recreate
    DROP TABLE IF EXISTS diagnostic_test_results CASCADE;
    DROP TABLE IF EXISTS diagnostic_test_sessions CASCADE;
    DROP TABLE IF EXISTS diagnostic_test_questions CASCADE;
  END IF;
END $$;

-- ================================================================
-- 2. DIAGNOSTIC TEST QUESTIONS TABLE
-- ================================================================
-- Questions for the diagnostic test
CREATE TABLE IF NOT EXISTS diagnostic_test_questions (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  lesson_id TEXT REFERENCES lessons(id) ON DELETE SET NULL,
  section TEXT NOT NULL CHECK (section IN ('english', 'math', 'reading', 'science')),
  question_id INTEGER,
  question_number INTEGER,
  question_text TEXT NOT NULL,
  choices JSONB,
  correct_answer TEXT NOT NULL,
  explanation TEXT,
  difficulty TEXT CHECK (difficulty IN ('easy', 'medium', 'hard')),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS idx_diagnostic_questions_lesson
ON diagnostic_test_questions(lesson_id);

CREATE INDEX IF NOT EXISTS idx_diagnostic_questions_section
ON diagnostic_test_questions(section);

-- ================================================================
-- 3. DIAGNOSTIC TEST SESSIONS TABLE
-- ================================================================
-- Tracks when users take diagnostic tests
CREATE TABLE IF NOT EXISTS diagnostic_test_sessions (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  section TEXT CHECK (section IN ('english', 'math', 'reading', 'science', 'full')),
  total_questions INTEGER,
  correct_answers INTEGER DEFAULT 0,
  score_percentage DECIMAL(5,2),
  completed BOOLEAN DEFAULT false,
  session_start TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  session_end TIMESTAMP WITH TIME ZONE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS idx_diagnostic_sessions_user
ON diagnostic_test_sessions(user_id);

CREATE INDEX IF NOT EXISTS idx_diagnostic_sessions_completed
ON diagnostic_test_sessions(user_id, completed);

-- ================================================================
-- 4. DIAGNOSTIC TEST RESULTS TABLE
-- ================================================================
-- Stores individual question answers from diagnostic tests
CREATE TABLE IF NOT EXISTS diagnostic_test_results (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  diagnostic_session_id UUID REFERENCES diagnostic_test_sessions(id) ON DELETE CASCADE,
  question_id UUID NOT NULL REFERENCES diagnostic_test_questions(id) ON DELETE CASCADE,
  user_answer TEXT,
  is_correct BOOLEAN NOT NULL,
  time_spent_seconds INTEGER,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS idx_diagnostic_results_user
ON diagnostic_test_results(user_id);

CREATE INDEX IF NOT EXISTS idx_diagnostic_results_session
ON diagnostic_test_results(diagnostic_session_id);

CREATE INDEX IF NOT EXISTS idx_diagnostic_results_question
ON diagnostic_test_results(question_id);

-- ================================================================
-- ROW LEVEL SECURITY
-- ================================================================
ALTER TABLE diagnostic_test_questions ENABLE ROW LEVEL SECURITY;
ALTER TABLE diagnostic_test_sessions ENABLE ROW LEVEL SECURITY;
ALTER TABLE diagnostic_test_results ENABLE ROW LEVEL SECURITY;

-- Drop existing policies if they exist (for re-runs)
DROP POLICY IF EXISTS "Questions are viewable by everyone" ON diagnostic_test_questions;
DROP POLICY IF EXISTS "Users can view own sessions" ON diagnostic_test_sessions;
DROP POLICY IF EXISTS "Users can create sessions" ON diagnostic_test_sessions;
DROP POLICY IF EXISTS "Users can update own sessions" ON diagnostic_test_sessions;
DROP POLICY IF EXISTS "Users can view own results" ON diagnostic_test_results;
DROP POLICY IF EXISTS "Users can create results" ON diagnostic_test_results;
DROP POLICY IF EXISTS "Service role can manage questions" ON diagnostic_test_questions;
DROP POLICY IF EXISTS "Service role can manage sessions" ON diagnostic_test_sessions;
DROP POLICY IF EXISTS "Service role can manage results" ON diagnostic_test_results;

-- Everyone can read questions
CREATE POLICY "Questions are viewable by everyone"
  ON diagnostic_test_questions FOR SELECT
  USING (true);

-- Users can view their own sessions
CREATE POLICY "Users can view own sessions"
  ON diagnostic_test_sessions FOR SELECT
  USING (auth.uid() = user_id);

-- Users can create sessions
CREATE POLICY "Users can create sessions"
  ON diagnostic_test_sessions FOR INSERT
  WITH CHECK (auth.uid() = user_id);

-- Users can update their own sessions
CREATE POLICY "Users can update own sessions"
  ON diagnostic_test_sessions FOR UPDATE
  USING (auth.uid() = user_id);

-- Users can view their own results
CREATE POLICY "Users can view own results"
  ON diagnostic_test_results FOR SELECT
  USING (auth.uid() = user_id);

-- Users can create results
CREATE POLICY "Users can create results"
  ON diagnostic_test_results FOR INSERT
  WITH CHECK (auth.uid() = user_id);

-- Service role can manage everything
CREATE POLICY "Service role can manage questions"
  ON diagnostic_test_questions FOR ALL
  USING (auth.role() = 'service_role');

CREATE POLICY "Service role can manage sessions"
  ON diagnostic_test_sessions FOR ALL
  USING (auth.role() = 'service_role');

CREATE POLICY "Service role can manage results"
  ON diagnostic_test_results FOR ALL
  USING (auth.role() = 'service_role');
