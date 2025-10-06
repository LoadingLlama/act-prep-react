-- Create lessons table
CREATE TABLE IF NOT EXISTS lessons (
  id TEXT PRIMARY KEY,
  title TEXT NOT NULL,
  duration INTEGER NOT NULL,
  content TEXT NOT NULL,
  section TEXT NOT NULL,
  order_index INTEGER NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create lesson practice questions table
CREATE TABLE IF NOT EXISTS lesson_questions (
  id SERIAL PRIMARY KEY,
  lesson_id TEXT NOT NULL REFERENCES lessons(id) ON DELETE CASCADE,
  practice_section_title TEXT NOT NULL,
  practice_section_description TEXT,
  question_id INTEGER NOT NULL,
  passage TEXT NOT NULL,
  question TEXT,
  choices JSONB NOT NULL,
  correct_answer INTEGER NOT NULL,
  explanation TEXT NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  UNIQUE(lesson_id, practice_section_title, question_id)
);

-- Create user lesson progress table
CREATE TABLE IF NOT EXISTS user_lesson_progress (
  id SERIAL PRIMARY KEY,
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
  lesson_id TEXT NOT NULL REFERENCES lessons(id) ON DELETE CASCADE,
  completed BOOLEAN DEFAULT FALSE,
  score_percentage DECIMAL(5,2),
  time_spent_minutes INTEGER,
  last_accessed TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  UNIQUE(user_id, lesson_id)
);

-- Create indexes
CREATE INDEX IF NOT EXISTS idx_lessons_section ON lessons(section);
CREATE INDEX IF NOT EXISTS idx_lessons_order ON lessons(order_index);
CREATE INDEX IF NOT EXISTS idx_lesson_questions_lesson ON lesson_questions(lesson_id);
CREATE INDEX IF NOT EXISTS idx_user_progress_user ON user_lesson_progress(user_id);
CREATE INDEX IF NOT EXISTS idx_user_progress_lesson ON user_lesson_progress(lesson_id);

-- Enable Row Level Security
ALTER TABLE lessons ENABLE ROW LEVEL SECURITY;
ALTER TABLE lesson_questions ENABLE ROW LEVEL SECURITY;
ALTER TABLE user_lesson_progress ENABLE ROW LEVEL SECURITY;

-- Policies for lessons (public read)
CREATE POLICY "Anyone can view lessons" ON lessons FOR SELECT USING (true);
CREATE POLICY "Anyone can insert lessons" ON lessons FOR INSERT WITH CHECK (true);

-- Policies for lesson_questions (public read)
CREATE POLICY "Anyone can view lesson questions" ON lesson_questions FOR SELECT USING (true);
CREATE POLICY "Anyone can insert lesson questions" ON lesson_questions FOR INSERT WITH CHECK (true);

-- Policies for user_lesson_progress (users can only see their own)
CREATE POLICY "Users can view their own progress" ON user_lesson_progress FOR SELECT USING (auth.uid() = user_id);
CREATE POLICY "Users can insert their own progress" ON user_lesson_progress FOR INSERT WITH CHECK (auth.uid() = user_id);
CREATE POLICY "Users can update their own progress" ON user_lesson_progress FOR UPDATE USING (auth.uid() = user_id);
