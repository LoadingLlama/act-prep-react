-- Create diagnostic test questions table
CREATE TABLE IF NOT EXISTS diagnostic_test_questions (
  id SERIAL PRIMARY KEY,
  lesson_id TEXT NOT NULL,
  lesson_title TEXT NOT NULL,
  question_id INTEGER NOT NULL,
  passage TEXT NOT NULL,
  question TEXT,
  choices JSONB NOT NULL,
  correct_answer INTEGER NOT NULL,
  explanation TEXT NOT NULL,
  section TEXT NOT NULL, -- 'english', 'math', 'reading', 'science'
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create user diagnostic test results table
CREATE TABLE IF NOT EXISTS diagnostic_test_results (
  id SERIAL PRIMARY KEY,
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
  question_id INTEGER REFERENCES diagnostic_test_questions(id) ON DELETE CASCADE,
  user_answer INTEGER NOT NULL,
  is_correct BOOLEAN NOT NULL,
  time_spent_seconds INTEGER,
  completed_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  UNIQUE(user_id, question_id, completed_at)
);

-- Create user diagnostic test sessions table
CREATE TABLE IF NOT EXISTS diagnostic_test_sessions (
  id SERIAL PRIMARY KEY,
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
  session_start TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  session_end TIMESTAMP WITH TIME ZONE,
  total_questions INTEGER,
  correct_answers INTEGER,
  score_percentage DECIMAL(5,2),
  section TEXT NOT NULL,
  completed BOOLEAN DEFAULT FALSE
);

-- Create indexes for better query performance
CREATE INDEX IF NOT EXISTS idx_diagnostic_questions_lesson ON diagnostic_test_questions(lesson_id);
CREATE INDEX IF NOT EXISTS idx_diagnostic_questions_section ON diagnostic_test_questions(section);
CREATE INDEX IF NOT EXISTS idx_diagnostic_results_user ON diagnostic_test_results(user_id);
CREATE INDEX IF NOT EXISTS idx_diagnostic_results_question ON diagnostic_test_results(question_id);
CREATE INDEX IF NOT EXISTS idx_diagnostic_sessions_user ON diagnostic_test_sessions(user_id);

-- Enable Row Level Security
ALTER TABLE diagnostic_test_questions ENABLE ROW LEVEL SECURITY;
ALTER TABLE diagnostic_test_results ENABLE ROW LEVEL SECURITY;
ALTER TABLE diagnostic_test_sessions ENABLE ROW LEVEL SECURITY;

-- Create policies for diagnostic_test_questions (public read)
CREATE POLICY "Anyone can view diagnostic questions"
  ON diagnostic_test_questions FOR SELECT
  USING (true);

-- Create policies for diagnostic_test_results (users can only see their own)
CREATE POLICY "Users can view their own results"
  ON diagnostic_test_results FOR SELECT
  USING (auth.uid() = user_id);

CREATE POLICY "Users can insert their own results"
  ON diagnostic_test_results FOR INSERT
  WITH CHECK (auth.uid() = user_id);

-- Create policies for diagnostic_test_sessions (users can only see their own)
CREATE POLICY "Users can view their own sessions"
  ON diagnostic_test_sessions FOR SELECT
  USING (auth.uid() = user_id);

CREATE POLICY "Users can insert their own sessions"
  ON diagnostic_test_sessions FOR INSERT
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update their own sessions"
  ON diagnostic_test_sessions FOR UPDATE
  USING (auth.uid() = user_id);
