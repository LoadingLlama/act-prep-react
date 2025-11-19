-- Create practice test sessions table
CREATE TABLE IF NOT EXISTS practice_test_sessions (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  test_name VARCHAR(255) NOT NULL,
  test_type VARCHAR(50) NOT NULL, -- 'full', 'section', 'custom'
  sections_included TEXT[], -- ['english', 'math', 'reading', 'science']
  total_questions INTEGER NOT NULL DEFAULT 0,
  score_percentage DECIMAL(5,2),
  started_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT NOW(),
  completed_at TIMESTAMP WITH TIME ZONE,
  time_limit_minutes INTEGER, -- Optional time limit
  is_completed BOOLEAN DEFAULT FALSE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create practice test results table (individual question results)
CREATE TABLE IF NOT EXISTS practice_test_results (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  practice_session_id UUID NOT NULL REFERENCES practice_test_sessions(id) ON DELETE CASCADE,
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  question_id UUID NOT NULL,
  section VARCHAR(50) NOT NULL, -- 'english', 'math', 'reading', 'science'
  user_answer TEXT,
  is_correct BOOLEAN,
  time_spent INTEGER DEFAULT 0, -- Time in milliseconds
  started_at TIMESTAMP WITH TIME ZONE,
  completed_at TIMESTAMP WITH TIME ZONE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create indexes for better query performance
CREATE INDEX IF NOT EXISTS idx_practice_sessions_user_id ON practice_test_sessions(user_id);
CREATE INDEX IF NOT EXISTS idx_practice_sessions_completed ON practice_test_sessions(user_id, is_completed);
CREATE INDEX IF NOT EXISTS idx_practice_sessions_created_at ON practice_test_sessions(created_at DESC);

CREATE INDEX IF NOT EXISTS idx_practice_results_session_id ON practice_test_results(practice_session_id);
CREATE INDEX IF NOT EXISTS idx_practice_results_user_id ON practice_test_results(user_id);
CREATE INDEX IF NOT EXISTS idx_practice_results_question_id ON practice_test_results(question_id);
CREATE INDEX IF NOT EXISTS idx_practice_results_time_spent ON practice_test_results(time_spent);

-- Add RLS (Row Level Security) policies
ALTER TABLE practice_test_sessions ENABLE ROW LEVEL SECURITY;
ALTER TABLE practice_test_results ENABLE ROW LEVEL SECURITY;

-- Drop existing policies if they exist
DROP POLICY IF EXISTS "Users can view own practice sessions" ON practice_test_sessions;
DROP POLICY IF EXISTS "Users can insert own practice sessions" ON practice_test_sessions;
DROP POLICY IF EXISTS "Users can update own practice sessions" ON practice_test_sessions;
DROP POLICY IF EXISTS "Users can view own practice results" ON practice_test_results;
DROP POLICY IF EXISTS "Users can insert own practice results" ON practice_test_results;
DROP POLICY IF EXISTS "Users can update own practice results" ON practice_test_results;

-- Users can only see their own practice test sessions
CREATE POLICY "Users can view own practice sessions"
  ON practice_test_sessions FOR SELECT
  USING (auth.uid() = user_id);

CREATE POLICY "Users can insert own practice sessions"
  ON practice_test_sessions FOR INSERT
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update own practice sessions"
  ON practice_test_sessions FOR UPDATE
  USING (auth.uid() = user_id);

-- Users can only see their own practice test results
CREATE POLICY "Users can view own practice results"
  ON practice_test_results FOR SELECT
  USING (auth.uid() = user_id);

CREATE POLICY "Users can insert own practice results"
  ON practice_test_results FOR INSERT
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update own practice results"
  ON practice_test_results FOR UPDATE
  USING (auth.uid() = user_id);

-- Add comments for documentation
COMMENT ON TABLE practice_test_sessions IS 'Stores practice test sessions (full tests or individual sections)';
COMMENT ON TABLE practice_test_results IS 'Stores individual question results for practice tests';

COMMENT ON COLUMN practice_test_sessions.test_type IS 'Type of test: full (all sections), section (single section), custom (selected sections)';
COMMENT ON COLUMN practice_test_sessions.sections_included IS 'Array of section names included in this test';
COMMENT ON COLUMN practice_test_results.time_spent IS 'Time spent on question in milliseconds';
