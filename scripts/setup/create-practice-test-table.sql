-- Create practice_test_questions table (similar to diagnostic_test_questions)
CREATE TABLE IF NOT EXISTS practice_test_questions (
  id SERIAL PRIMARY KEY,
  test_number INTEGER NOT NULL, -- 1, 2, 3, etc.
  section TEXT NOT NULL, -- 'english', 'math', 'reading', 'science'
  question_number INTEGER NOT NULL, -- 1-75 for English, 1-60 for Math, etc.
  passage TEXT, -- For English/Reading/Science questions with passages
  question TEXT NOT NULL,
  choices JSONB NOT NULL, -- Array of choice strings ["A. ...", "B. ...", etc.]
  correct_answer INTEGER NOT NULL, -- 0-based index (0=A, 1=B, 2=C, 3=D, 4=E for Math)
  explanation TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  UNIQUE(test_number, section, question_number)
);

-- Enable RLS
ALTER TABLE practice_test_questions ENABLE ROW LEVEL SECURITY;

-- Allow public read access
CREATE POLICY "Enable read access for all users"
ON practice_test_questions
FOR SELECT
TO public
USING (true);

-- Create index for faster queries
CREATE INDEX IF NOT EXISTS idx_practice_test_questions_test_section
ON practice_test_questions(test_number, section);

-- Verify table was created
SELECT
  column_name,
  data_type,
  is_nullable
FROM information_schema.columns
WHERE table_name = 'practice_test_questions'
ORDER BY ordinal_position;
