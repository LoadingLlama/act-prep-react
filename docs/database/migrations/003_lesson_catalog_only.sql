/**
 * Lesson Catalog Migration
 *
 * Purpose: Move the large lessonStructure array (~50+ lessons) from App.js to database
 * This is the ONLY large hardcoded dataset that should be in the database
 * Small arrays (social proof, features, etc.) remain hardcoded in components
 */

-- ============================================================================
-- TABLE: lesson_catalog
-- Purpose: Replace hardcoded lessonStructure array in App.js (Line 619)
-- ============================================================================

CREATE TABLE IF NOT EXISTS lesson_catalog (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  lesson_key TEXT UNIQUE NOT NULL,
  section TEXT NOT NULL CHECK (section IN ('all', 'english', 'math', 'reading', 'science')),
  chapter_number INTEGER,
  title TEXT NOT NULL,
  description TEXT,
  content_id UUID REFERENCES lessons(id),
  display_order INTEGER NOT NULL,
  is_active BOOLEAN DEFAULT true,
  prerequisites JSONB DEFAULT '[]',
  estimated_duration INTEGER,
  difficulty_level TEXT CHECK (difficulty_level IN ('beginner', 'intermediate', 'advanced')),
  tags JSONB DEFAULT '[]',
  metadata JSONB DEFAULT '{}',
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

COMMENT ON TABLE lesson_catalog IS
'Lesson catalog - replaces the large hardcoded lessonStructure array in App.js';

COMMENT ON COLUMN lesson_catalog.lesson_key IS
'Unique lesson identifier (e.g., sentence-structure, commas)';

COMMENT ON COLUMN lesson_catalog.section IS
'Lesson section: all, english, math, reading, science';

COMMENT ON COLUMN lesson_catalog.content_id IS
'Foreign key to lessons table for actual lesson content';

-- Indexes
CREATE INDEX idx_lesson_catalog_section ON lesson_catalog(section);
CREATE INDEX idx_lesson_catalog_display_order ON lesson_catalog(display_order);
CREATE INDEX idx_lesson_catalog_active ON lesson_catalog(is_active);

-- Auto-update timestamp trigger
CREATE OR REPLACE FUNCTION update_lesson_catalog_updated_at()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER lesson_catalog_updated_at
BEFORE UPDATE ON lesson_catalog
FOR EACH ROW
EXECUTE FUNCTION update_lesson_catalog_updated_at();

-- RLS Policies (public read access)
ALTER TABLE lesson_catalog ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Allow public read access to active lessons"
ON lesson_catalog FOR SELECT
USING (is_active = true);

-- Helpful view
CREATE VIEW active_lessons_by_section AS
SELECT
  lesson_key,
  section,
  chapter_number,
  title,
  description,
  display_order,
  difficulty_level,
  tags
FROM lesson_catalog
WHERE is_active = true
ORDER BY section, display_order;

COMMENT ON VIEW active_lessons_by_section IS
'Quick view of all active lessons organized by section';
