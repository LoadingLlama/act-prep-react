-- ============================================================
-- FINAL MIGRATION: Create Tables & Migrate Data
-- Uses actual columns from lessons table
-- ============================================================

-- Step 1: Create Tables (if they don't exist)
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

CREATE TABLE IF NOT EXISTS lesson_sections (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  lesson_id UUID REFERENCES lesson_metadata(id) ON DELETE CASCADE,
  section_key VARCHAR(100) NOT NULL,
  title VARCHAR(255) NOT NULL,
  section_type VARCHAR(50) NOT NULL DEFAULT 'content',
  order_index INTEGER DEFAULT 0,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  UNIQUE(lesson_id, section_key)
);

CREATE TABLE IF NOT EXISTS section_content (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  section_id UUID REFERENCES lesson_sections(id) ON DELETE CASCADE,
  content_type VARCHAR(50) NOT NULL DEFAULT 'html',
  content TEXT NOT NULL,
  order_index INTEGER DEFAULT 0,
  metadata JSONB,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

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

-- Step 2: Create Indexes
CREATE INDEX IF NOT EXISTS idx_lesson_metadata_key ON lesson_metadata(lesson_key);
CREATE INDEX IF NOT EXISTS idx_lesson_metadata_subject ON lesson_metadata(subject);
CREATE INDEX IF NOT EXISTS idx_lesson_sections_lesson_id ON lesson_sections(lesson_id);
CREATE INDEX IF NOT EXISTS idx_section_content_section_id ON section_content(section_id);
CREATE INDEX IF NOT EXISTS idx_lesson_examples_lesson_id ON lesson_examples(lesson_id);

-- Step 3: Enable RLS
ALTER TABLE lesson_metadata ENABLE ROW LEVEL SECURITY;
ALTER TABLE lesson_sections ENABLE ROW LEVEL SECURITY;
ALTER TABLE section_content ENABLE ROW LEVEL SECURITY;
ALTER TABLE lesson_examples ENABLE ROW LEVEL SECURITY;

-- Step 4: Create Policies
DROP POLICY IF EXISTS "Allow public read" ON lesson_metadata;
DROP POLICY IF EXISTS "Allow public read" ON lesson_sections;
DROP POLICY IF EXISTS "Allow public read" ON section_content;
DROP POLICY IF EXISTS "Allow public read" ON lesson_examples;

CREATE POLICY "Allow public read" ON lesson_metadata FOR SELECT USING (true);
CREATE POLICY "Allow public read" ON lesson_sections FOR SELECT USING (true);
CREATE POLICY "Allow public read" ON section_content FOR SELECT USING (true);
CREATE POLICY "Allow public read" ON lesson_examples FOR SELECT USING (true);

-- Step 5: Migrate Data - Using ACTUAL columns from lessons table
INSERT INTO lesson_metadata (lesson_key, title, subject, category, difficulty_level, duration_minutes, order_index, is_published)
SELECT
  l.lesson_key,
  l.title,
  l.subject,
  COALESCE(l.topic_title, 'General') as category,
  1 as difficulty_level,
  30 as duration_minutes,
  l.order_index,
  true as is_published
FROM lessons l
ON CONFLICT (lesson_key) DO UPDATE SET
  title = EXCLUDED.title,
  subject = EXCLUDED.subject,
  category = EXCLUDED.category,
  order_index = EXCLUDED.order_index,
  updated_at = NOW();

-- Insert lesson sections (one main section per lesson)
INSERT INTO lesson_sections (lesson_id, section_key, title, section_type, order_index)
SELECT
  lm.id as lesson_id,
  l.lesson_key || '-main' as section_key,
  'Main Content' as title,
  'content' as section_type,
  0 as order_index
FROM lessons l
JOIN lesson_metadata lm ON l.lesson_key = lm.lesson_key
ON CONFLICT (lesson_id, section_key) DO NOTHING;

-- Insert section content (the actual HTML)
INSERT INTO section_content (section_id, content_type, content, order_index)
SELECT
  ls.id as section_id,
  'html' as content_type,
  l.content as content,
  0 as order_index
FROM lessons l
JOIN lesson_metadata lm ON l.lesson_key = lm.lesson_key
JOIN lesson_sections ls ON lm.id = ls.lesson_id AND ls.section_key = l.lesson_key || '-main'
WHERE NOT EXISTS (
  SELECT 1 FROM section_content sc WHERE sc.section_id = ls.id
);

-- Step 6: Verification
SELECT
  'lesson_metadata' as table_name,
  COUNT(*) as row_count
FROM lesson_metadata
UNION ALL
SELECT
  'lesson_sections' as table_name,
  COUNT(*) as row_count
FROM lesson_sections
UNION ALL
SELECT
  'section_content' as table_name,
  COUNT(*) as row_count
FROM section_content
UNION ALL
SELECT
  'lessons (original)' as table_name,
  COUNT(*) as row_count
FROM lessons
ORDER BY table_name;
