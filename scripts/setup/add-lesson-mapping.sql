-- Add lesson mapping columns to act_questions table
-- Run this in Supabase Dashboard > SQL Editor

ALTER TABLE act_questions
  ADD COLUMN IF NOT EXISTS underlined_text TEXT,
  ADD COLUMN IF NOT EXISTS context_before TEXT,
  ADD COLUMN IF NOT EXISTS context_after TEXT,
  ADD COLUMN IF NOT EXISTS lesson_id UUID REFERENCES lessons(id),
  ADD COLUMN IF NOT EXISTS question_category TEXT;

-- Create index for lesson lookups
CREATE INDEX IF NOT EXISTS idx_questions_lesson ON act_questions(lesson_id);

-- Verify columns were added
SELECT column_name, data_type
FROM information_schema.columns
WHERE table_name = 'act_questions'
ORDER BY ordinal_position;
