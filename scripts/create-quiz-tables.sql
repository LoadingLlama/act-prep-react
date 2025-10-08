-- Create quizzes table
CREATE TABLE IF NOT EXISTS quizzes (
  id BIGSERIAL PRIMARY KEY,
  lesson_id BIGINT REFERENCES lessons(id) ON DELETE CASCADE,
  title TEXT NOT NULL,
  intro TEXT,
  quiz_type TEXT DEFAULT 'practice', -- 'practice', 'checkpoint', 'final'
  position INTEGER NOT NULL DEFAULT 0, -- Position within the lesson (0 = beginning, 1 = middle, etc.)
  is_required BOOLEAN DEFAULT true, -- Must complete to progress
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Create quiz_questions table
CREATE TABLE IF NOT EXISTS quiz_questions (
  id BIGSERIAL PRIMARY KEY,
  quiz_id BIGINT REFERENCES quizzes(id) ON DELETE CASCADE,
  question_text TEXT NOT NULL,
  question_order INTEGER NOT NULL,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Create quiz_options table
CREATE TABLE IF NOT EXISTS quiz_options (
  id BIGSERIAL PRIMARY KEY,
  question_id BIGINT REFERENCES quiz_questions(id) ON DELETE CASCADE,
  option_text TEXT NOT NULL,
  is_correct BOOLEAN DEFAULT false,
  explanation TEXT,
  option_order INTEGER NOT NULL,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Create user_quiz_progress table to track completion
CREATE TABLE IF NOT EXISTS user_quiz_progress (
  id BIGSERIAL PRIMARY KEY,
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
  quiz_id BIGINT REFERENCES quizzes(id) ON DELETE CASCADE,
  completed BOOLEAN DEFAULT false,
  score INTEGER,
  total_questions INTEGER,
  answers JSONB, -- Store user's answers
  completed_at TIMESTAMPTZ,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW(),
  UNIQUE(user_id, quiz_id)
);

-- Add indexes for performance
CREATE INDEX IF NOT EXISTS idx_quizzes_lesson_id ON quizzes(lesson_id);
CREATE INDEX IF NOT EXISTS idx_quiz_questions_quiz_id ON quiz_questions(quiz_id);
CREATE INDEX IF NOT EXISTS idx_quiz_options_question_id ON quiz_options(question_id);
CREATE INDEX IF NOT EXISTS idx_user_quiz_progress_user_id ON user_quiz_progress(user_id);
CREATE INDEX IF NOT EXISTS idx_user_quiz_progress_quiz_id ON user_quiz_progress(quiz_id);

-- Enable RLS (Row Level Security)
ALTER TABLE quizzes ENABLE ROW LEVEL SECURITY;
ALTER TABLE quiz_questions ENABLE ROW LEVEL SECURITY;
ALTER TABLE quiz_options ENABLE ROW LEVEL SECURITY;
ALTER TABLE user_quiz_progress ENABLE ROW LEVEL SECURITY;

-- Create policies for quizzes (publicly readable)
CREATE POLICY "Quizzes are viewable by everyone" ON quizzes
  FOR SELECT USING (true);

CREATE POLICY "Quiz questions are viewable by everyone" ON quiz_questions
  FOR SELECT USING (true);

CREATE POLICY "Quiz options are viewable by everyone" ON quiz_options
  FOR SELECT USING (true);

-- Create policies for user_quiz_progress (users can only see/modify their own)
CREATE POLICY "Users can view their own quiz progress" ON user_quiz_progress
  FOR SELECT USING (auth.uid() = user_id);

CREATE POLICY "Users can insert their own quiz progress" ON user_quiz_progress
  FOR INSERT WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update their own quiz progress" ON user_quiz_progress
  FOR UPDATE USING (auth.uid() = user_id);
