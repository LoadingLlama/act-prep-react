-- Create lesson_questions table for storing practice questions
-- Run this in your Supabase SQL Editor before running the migration script

CREATE TABLE IF NOT EXISTS lesson_questions (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  lesson_id UUID REFERENCES lessons(id) ON DELETE CASCADE,
  practice_section_title TEXT,
  practice_section_description TEXT,
  question_id INTEGER,
  passage TEXT,
  question TEXT,
  choices JSONB,
  correct_answer INTEGER,
  explanation TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create indexes for better query performance
CREATE INDEX IF NOT EXISTS idx_lesson_questions_lesson_id ON lesson_questions(lesson_id);
CREATE INDEX IF NOT EXISTS idx_lesson_questions_question_id ON lesson_questions(question_id);

-- Add a unique constraint to prevent duplicate questions
CREATE UNIQUE INDEX IF NOT EXISTS idx_lesson_questions_unique ON lesson_questions(lesson_id, practice_section_title, question_id);
