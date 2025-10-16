-- ============================================================
-- CREATE MODULAR LESSON TABLES
-- Run this in Supabase SQL Editor
-- ============================================================

-- 1. LESSON METADATA (Core lesson information)
CREATE TABLE IF NOT EXISTS lesson_metadata (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  lesson_key VARCHAR(100) UNIQUE NOT NULL,
  title VARCHAR(255) NOT NULL,
  subject VARCHAR(50) NOT NULL,
  category VARCHAR(100),
  difficulty_level INTEGER DEFAULT 1,
  duration_minutes INTEGER DEFAULT 30,
  order_index INTEGER DEFAULT 0,
  is_published BOOLEAN DEFAULT true,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 2. LESSON SECTIONS (Break lessons into logical parts)
CREATE TABLE IF NOT EXISTS lesson_sections (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  lesson_id UUID REFERENCES lesson_metadata(id) ON DELETE CASCADE,
  section_key VARCHAR(100) NOT NULL,
  title VARCHAR(255) NOT NULL,
  section_type VARCHAR(50) NOT NULL,
  order_index INTEGER DEFAULT 0,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  UNIQUE(lesson_id, section_key)
);

-- 3. SECTION CONTENT (Actual content - max 2000 chars per block)
CREATE TABLE IF NOT EXISTS section_content (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  section_id UUID REFERENCES lesson_sections(id) ON DELETE CASCADE,
  content_type VARCHAR(50) NOT NULL DEFAULT 'html',
  content TEXT NOT NULL,
  order_index INTEGER DEFAULT 0,
  metadata JSONB,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 4. LESSON EXAMPLES (Problems and solutions)
CREATE TABLE IF NOT EXISTS lesson_examples (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  lesson_id UUID REFERENCES lesson_metadata(id) ON DELETE CASCADE,
  section_id UUID REFERENCES lesson_sections(id) ON DELETE SET NULL,
  title VARCHAR(255),
  problem_text TEXT NOT NULL,
  solution_text TEXT,
  explanation TEXT,
  difficulty INTEGER DEFAULT 1,
  order_index INTEGER DEFAULT 0,
  tags TEXT[],
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- ============================================================
-- CREATE INDEXES FOR PERFORMANCE
-- ============================================================

CREATE INDEX IF NOT EXISTS idx_lesson_metadata_key ON lesson_metadata(lesson_key);
CREATE INDEX IF NOT EXISTS idx_lesson_metadata_subject ON lesson_metadata(subject);
CREATE INDEX IF NOT EXISTS idx_lesson_sections_lesson_id ON lesson_sections(lesson_id);
CREATE INDEX IF NOT EXISTS idx_section_content_section_id ON section_content(section_id);
CREATE INDEX IF NOT EXISTS idx_lesson_examples_lesson_id ON lesson_examples(lesson_id);

-- ============================================================
-- ENABLE ROW LEVEL SECURITY
-- ============================================================

ALTER TABLE lesson_metadata ENABLE ROW LEVEL SECURITY;
ALTER TABLE lesson_sections ENABLE ROW LEVEL SECURITY;
ALTER TABLE section_content ENABLE ROW LEVEL SECURITY;
ALTER TABLE lesson_examples ENABLE ROW LEVEL SECURITY;

-- ============================================================
-- CREATE PUBLIC READ POLICIES
-- ============================================================

-- Drop existing policies if they exist
DROP POLICY IF EXISTS "Allow public read" ON lesson_metadata;
DROP POLICY IF EXISTS "Allow public read" ON lesson_sections;
DROP POLICY IF EXISTS "Allow public read" ON section_content;
DROP POLICY IF EXISTS "Allow public read" ON lesson_examples;

-- Create new policies
CREATE POLICY "Allow public read" ON lesson_metadata FOR SELECT USING (true);
CREATE POLICY "Allow public read" ON lesson_sections FOR SELECT USING (true);
CREATE POLICY "Allow public read" ON section_content FOR SELECT USING (true);
CREATE POLICY "Allow public read" ON lesson_examples FOR SELECT USING (true);

-- ============================================================
-- VERIFICATION QUERIES
-- ============================================================

-- Check that tables were created
SELECT table_name
FROM information_schema.tables
WHERE table_schema = 'public'
AND table_name IN ('lesson_metadata', 'lesson_sections', 'section_content', 'lesson_examples')
ORDER BY table_name;
