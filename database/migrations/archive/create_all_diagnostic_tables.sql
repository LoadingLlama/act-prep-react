-- ===================================
-- CREATE ALL DIAGNOSTIC TEST TABLES
-- ===================================

-- 1. Create diagnostic_test_sessions table
CREATE TABLE IF NOT EXISTS public.diagnostic_test_sessions (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  section TEXT,
  total_questions INTEGER NOT NULL,
  correct_answers INTEGER DEFAULT 0,
  score_percentage NUMERIC(5,2) DEFAULT 0,
  session_start TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc', NOW()),
  session_end TIMESTAMP WITH TIME ZONE,
  completed BOOLEAN DEFAULT FALSE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc', NOW())
);

-- 2. Create diagnostic_test_results table
CREATE TABLE IF NOT EXISTS public.diagnostic_test_results (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  diagnostic_session_id UUID NOT NULL REFERENCES diagnostic_test_sessions(id) ON DELETE CASCADE,
  question_id UUID NOT NULL,
  user_answer TEXT,
  is_correct BOOLEAN NOT NULL,
  time_spent_seconds INTEGER DEFAULT 0,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc', NOW())
);

-- 3. Create diagnostic_analysis table
CREATE TABLE IF NOT EXISTS public.diagnostic_analysis (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  diagnostic_session_id UUID NOT NULL REFERENCES diagnostic_test_sessions(id) ON DELETE CASCADE,
  total_questions INTEGER NOT NULL,
  total_correct INTEGER NOT NULL,
  overall_accuracy NUMERIC(5,2) NOT NULL,
  overall_score INTEGER NOT NULL,
  english_score INTEGER DEFAULT 0,
  math_score INTEGER DEFAULT 0,
  reading_score INTEGER DEFAULT 0,
  science_score INTEGER DEFAULT 0,
  lesson_breakdown JSONB,
  weak_lessons JSONB,
  strong_lessons JSONB,
  priority_lessons JSONB,
  question_type_breakdown JSONB,
  recommended_study_time_weeks INTEGER,
  estimated_improvement_potential INTEGER,
  validation_info JSONB,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc', NOW())
);

-- ===================================
-- CREATE INDEXES
-- ===================================

-- diagnostic_test_sessions indexes
CREATE INDEX IF NOT EXISTS idx_diagnostic_sessions_user_id ON diagnostic_test_sessions(user_id);
CREATE INDEX IF NOT EXISTS idx_diagnostic_sessions_completed ON diagnostic_test_sessions(completed);

-- diagnostic_test_results indexes
CREATE INDEX IF NOT EXISTS idx_diagnostic_results_user_id ON diagnostic_test_results(user_id);
CREATE INDEX IF NOT EXISTS idx_diagnostic_results_session_id ON diagnostic_test_results(diagnostic_session_id);
CREATE INDEX IF NOT EXISTS idx_diagnostic_results_question_id ON diagnostic_test_results(question_id);

-- diagnostic_analysis indexes
CREATE INDEX IF NOT EXISTS idx_diagnostic_analysis_user_id ON diagnostic_analysis(user_id);
CREATE INDEX IF NOT EXISTS idx_diagnostic_analysis_session_id ON diagnostic_analysis(diagnostic_session_id);

-- ===================================
-- ENABLE ROW LEVEL SECURITY
-- ===================================

ALTER TABLE diagnostic_test_sessions ENABLE ROW LEVEL SECURITY;
ALTER TABLE diagnostic_test_results ENABLE ROW LEVEL SECURITY;
ALTER TABLE diagnostic_analysis ENABLE ROW LEVEL SECURITY;

-- ===================================
-- CREATE RLS POLICIES
-- ===================================

-- diagnostic_test_sessions policies
CREATE POLICY "Users can view their own diagnostic sessions"
  ON diagnostic_test_sessions FOR SELECT
  USING (auth.uid() = user_id);

CREATE POLICY "Users can insert their own diagnostic sessions"
  ON diagnostic_test_sessions FOR INSERT
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update their own diagnostic sessions"
  ON diagnostic_test_sessions FOR UPDATE
  USING (auth.uid() = user_id);

-- diagnostic_test_results policies
CREATE POLICY "Users can view their own diagnostic results"
  ON diagnostic_test_results FOR SELECT
  USING (auth.uid() = user_id);

CREATE POLICY "Users can insert their own diagnostic results"
  ON diagnostic_test_results FOR INSERT
  WITH CHECK (auth.uid() = user_id);

-- diagnostic_analysis policies
CREATE POLICY "Users can view their own diagnostic analysis"
  ON diagnostic_analysis FOR SELECT
  USING (auth.uid() = user_id);

CREATE POLICY "Users can insert their own diagnostic analysis"
  ON diagnostic_analysis FOR INSERT
  WITH CHECK (auth.uid() = user_id);

-- ===================================
-- GRANT PERMISSIONS
-- ===================================

GRANT ALL ON diagnostic_test_sessions TO authenticated;
GRANT ALL ON diagnostic_test_sessions TO service_role;

GRANT ALL ON diagnostic_test_results TO authenticated;
GRANT ALL ON diagnostic_test_results TO service_role;

GRANT ALL ON diagnostic_analysis TO authenticated;
GRANT ALL ON diagnostic_analysis TO service_role;

-- ===================================
-- ADD COMMENTS
-- ===================================

COMMENT ON TABLE diagnostic_test_sessions IS 'Stores diagnostic test session metadata';
COMMENT ON TABLE diagnostic_test_results IS 'Stores individual question answers from diagnostic tests';
COMMENT ON TABLE diagnostic_analysis IS 'Stores comprehensive analysis of diagnostic test performance';
