-- Create term_definitions table
CREATE TABLE IF NOT EXISTS term_definitions (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  term TEXT NOT NULL,
  definition TEXT NOT NULL,
  context TEXT,
  related_terms TEXT[],
  lesson_key TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc', NOW()),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc', NOW())
);

-- Create index for faster lookups
CREATE INDEX IF NOT EXISTS idx_term_definitions_term ON term_definitions(term);
CREATE INDEX IF NOT EXISTS idx_term_definitions_lesson_key ON term_definitions(lesson_key);

-- Enable RLS (Row Level Security)
ALTER TABLE term_definitions ENABLE ROW LEVEL SECURITY;

-- Create policy to allow public read access
CREATE POLICY "Allow public read access" ON term_definitions
  FOR SELECT USING (true);
