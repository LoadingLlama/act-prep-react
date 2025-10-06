-- ACT Prep Lessons Database Schema

-- Create lessons table
CREATE TABLE IF NOT EXISTS lessons (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    subject VARCHAR(50) NOT NULL, -- 'math', 'english', 'reading', 'science'
    lesson_key VARCHAR(100) NOT NULL, -- unique identifier like 'backsolving', 'sentence-structure'
    title TEXT NOT NULL,
    content TEXT NOT NULL,
    order_index INTEGER, -- for ordering lessons within a subject
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    UNIQUE(subject, lesson_key)
);

-- Create index for faster queries
CREATE INDEX IF NOT EXISTS idx_lessons_subject ON lessons(subject);
CREATE INDEX IF NOT EXISTS idx_lessons_key ON lessons(lesson_key);
CREATE INDEX IF NOT EXISTS idx_lessons_subject_order ON lessons(subject, order_index);

-- Enable Row Level Security (optional, for future auth)
ALTER TABLE lessons ENABLE ROW LEVEL SECURITY;

-- Create a policy that allows anyone to read lessons
CREATE POLICY "Allow public read access" ON lessons
    FOR SELECT
    USING (true);

-- Create a policy for insert/update (you'll need to adjust this based on your auth setup)
CREATE POLICY "Allow authenticated insert/update" ON lessons
    FOR ALL
    USING (auth.role() = 'authenticated');
