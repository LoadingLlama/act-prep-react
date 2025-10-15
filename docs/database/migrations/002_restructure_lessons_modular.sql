-- ============================================================
-- MODULAR LESSONS DATABASE STRUCTURE
-- Breaks large lesson content into manageable, editable chunks
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
  is_published BOOLEAN DEFAULT false,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 2. LESSON SECTIONS (Break lessons into logical sections)
CREATE TABLE IF NOT EXISTS lesson_sections (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  lesson_id UUID REFERENCES lesson_metadata(id) ON DELETE CASCADE,
  section_key VARCHAR(100) NOT NULL,
  title VARCHAR(255) NOT NULL,
  section_type VARCHAR(50) NOT NULL, -- 'introduction', 'concept', 'example', 'practice', 'summary'
  order_index INTEGER DEFAULT 0,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  UNIQUE(lesson_id, section_key)
);

-- 3. SECTION CONTENT (Actual content for each section)
CREATE TABLE IF NOT EXISTS section_content (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  section_id UUID REFERENCES lesson_sections(id) ON DELETE CASCADE,
  content_type VARCHAR(50) NOT NULL, -- 'text', 'html', 'markdown', 'latex', 'code'
  content TEXT NOT NULL,
  order_index INTEGER DEFAULT 0,
  metadata JSONB, -- Store any additional data like formatting options
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 4. LESSON EXAMPLES (Separate table for examples)
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
  tags TEXT[], -- Array of tags for filtering
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 5. KEY CONCEPTS (Separate table for important concepts)
CREATE TABLE IF NOT EXISTS lesson_concepts (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  lesson_id UUID REFERENCES lesson_metadata(id) ON DELETE CASCADE,
  concept_key VARCHAR(100) NOT NULL,
  concept_title VARCHAR(255) NOT NULL,
  definition TEXT NOT NULL,
  formula TEXT, -- Mathematical formulas
  visual_aid_url TEXT, -- Link to diagrams/images
  related_concepts TEXT[], -- Array of related concept keys
  order_index INTEGER DEFAULT 0,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  UNIQUE(lesson_id, concept_key)
);

-- 6. LESSON TIPS (Quick tips and hints)
CREATE TABLE IF NOT EXISTS lesson_tips (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  lesson_id UUID REFERENCES lesson_metadata(id) ON DELETE CASCADE,
  tip_type VARCHAR(50) NOT NULL, -- 'hint', 'warning', 'pro_tip', 'common_mistake'
  tip_text TEXT NOT NULL,
  order_index INTEGER DEFAULT 0,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 7. LESSON MEDIA (Images, videos, diagrams)
CREATE TABLE IF NOT EXISTS lesson_media (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  lesson_id UUID REFERENCES lesson_metadata(id) ON DELETE CASCADE,
  section_id UUID REFERENCES lesson_sections(id) ON DELETE SET NULL,
  media_type VARCHAR(50) NOT NULL, -- 'image', 'video', 'diagram', 'interactive'
  media_url TEXT NOT NULL,
  caption TEXT,
  alt_text TEXT,
  order_index INTEGER DEFAULT 0,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 8. LESSON OBJECTIVES (Learning objectives)
CREATE TABLE IF NOT EXISTS lesson_objectives (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  lesson_id UUID REFERENCES lesson_metadata(id) ON DELETE CASCADE,
  objective_text TEXT NOT NULL,
  order_index INTEGER DEFAULT 0,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 9. LESSON PREREQUISITES (What students should know before)
CREATE TABLE IF NOT EXISTS lesson_prerequisites (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  lesson_id UUID REFERENCES lesson_metadata(id) ON DELETE CASCADE,
  prerequisite_lesson_id UUID REFERENCES lesson_metadata(id) ON DELETE SET NULL,
  prerequisite_text TEXT NOT NULL,
  is_required BOOLEAN DEFAULT true,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 10. LESSON RESOURCES (Additional resources and references)
CREATE TABLE IF NOT EXISTS lesson_resources (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  lesson_id UUID REFERENCES lesson_metadata(id) ON DELETE CASCADE,
  resource_type VARCHAR(50) NOT NULL, -- 'article', 'video', 'book', 'website'
  title VARCHAR(255) NOT NULL,
  url TEXT,
  description TEXT,
  order_index INTEGER DEFAULT 0,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- ============================================================
-- INDEXES FOR PERFORMANCE
-- ============================================================

CREATE INDEX idx_lesson_metadata_subject ON lesson_metadata(subject);
CREATE INDEX idx_lesson_metadata_category ON lesson_metadata(category);
CREATE INDEX idx_lesson_metadata_key ON lesson_metadata(lesson_key);
CREATE INDEX idx_lesson_sections_lesson_id ON lesson_sections(lesson_id);
CREATE INDEX idx_section_content_section_id ON section_content(section_id);
CREATE INDEX idx_lesson_examples_lesson_id ON lesson_examples(lesson_id);
CREATE INDEX idx_lesson_concepts_lesson_id ON lesson_concepts(lesson_id);
CREATE INDEX idx_lesson_tips_lesson_id ON lesson_tips(lesson_id);
CREATE INDEX idx_lesson_media_lesson_id ON lesson_media(lesson_id);

-- ============================================================
-- VIEWS FOR EASIER QUERYING
-- ============================================================

-- Complete lesson view (joins all related data)
CREATE OR REPLACE VIEW complete_lessons AS
SELECT
  lm.*,
  COALESCE(
    json_agg(DISTINCT
      jsonb_build_object(
        'id', ls.id,
        'section_key', ls.section_key,
        'title', ls.title,
        'section_type', ls.section_type,
        'order_index', ls.order_index
      )
    ) FILTER (WHERE ls.id IS NOT NULL),
    '[]'::json
  ) as sections,
  COALESCE(
    json_agg(DISTINCT
      jsonb_build_object(
        'id', lc.id,
        'concept_key', lc.concept_key,
        'concept_title', lc.concept_title,
        'definition', lc.definition,
        'formula', lc.formula
      )
    ) FILTER (WHERE lc.id IS NOT NULL),
    '[]'::json
  ) as concepts,
  COALESCE(
    json_agg(DISTINCT
      jsonb_build_object(
        'id', le.id,
        'title', le.title,
        'problem_text', le.problem_text,
        'difficulty', le.difficulty
      )
    ) FILTER (WHERE le.id IS NOT NULL),
    '[]'::json
  ) as examples
FROM lesson_metadata lm
LEFT JOIN lesson_sections ls ON lm.id = ls.lesson_id
LEFT JOIN lesson_concepts lc ON lm.id = lc.lesson_id
LEFT JOIN lesson_examples le ON lm.id = le.lesson_id
GROUP BY lm.id;

-- ============================================================
-- ROW LEVEL SECURITY POLICIES
-- ============================================================

ALTER TABLE lesson_metadata ENABLE ROW LEVEL SECURITY;
ALTER TABLE lesson_sections ENABLE ROW LEVEL SECURITY;
ALTER TABLE section_content ENABLE ROW LEVEL SECURITY;
ALTER TABLE lesson_examples ENABLE ROW LEVEL SECURITY;
ALTER TABLE lesson_concepts ENABLE ROW LEVEL SECURITY;
ALTER TABLE lesson_tips ENABLE ROW LEVEL SECURITY;
ALTER TABLE lesson_media ENABLE ROW LEVEL SECURITY;
ALTER TABLE lesson_objectives ENABLE ROW LEVEL SECURITY;
ALTER TABLE lesson_prerequisites ENABLE ROW LEVEL SECURITY;
ALTER TABLE lesson_resources ENABLE ROW LEVEL SECURITY;

-- Public read access for all lesson content
CREATE POLICY "Lessons are viewable by everyone" ON lesson_metadata FOR SELECT USING (true);
CREATE POLICY "Sections are viewable by everyone" ON lesson_sections FOR SELECT USING (true);
CREATE POLICY "Content is viewable by everyone" ON section_content FOR SELECT USING (true);
CREATE POLICY "Examples are viewable by everyone" ON lesson_examples FOR SELECT USING (true);
CREATE POLICY "Concepts are viewable by everyone" ON lesson_concepts FOR SELECT USING (true);
CREATE POLICY "Tips are viewable by everyone" ON lesson_tips FOR SELECT USING (true);
CREATE POLICY "Media is viewable by everyone" ON lesson_media FOR SELECT USING (true);
CREATE POLICY "Objectives are viewable by everyone" ON lesson_objectives FOR SELECT USING (true);
CREATE POLICY "Prerequisites are viewable by everyone" ON lesson_prerequisites FOR SELECT USING (true);
CREATE POLICY "Resources are viewable by everyone" ON lesson_resources FOR SELECT USING (true);

-- ============================================================
-- HELPER FUNCTIONS
-- ============================================================

-- Function to get complete lesson data
CREATE OR REPLACE FUNCTION get_complete_lesson(p_lesson_key VARCHAR)
RETURNS JSON AS $$
DECLARE
  result JSON;
BEGIN
  SELECT json_build_object(
    'metadata', row_to_json(lm),
    'sections', COALESCE(sections_json.data, '[]'::json),
    'concepts', COALESCE(concepts_json.data, '[]'::json),
    'examples', COALESCE(examples_json.data, '[]'::json),
    'tips', COALESCE(tips_json.data, '[]'::json),
    'objectives', COALESCE(objectives_json.data, '[]'::json)
  ) INTO result
  FROM lesson_metadata lm
  LEFT JOIN LATERAL (
    SELECT json_agg(
      json_build_object(
        'id', ls.id,
        'section_key', ls.section_key,
        'title', ls.title,
        'section_type', ls.section_type,
        'order_index', ls.order_index,
        'content', COALESCE(content_json.data, '[]'::json)
      ) ORDER BY ls.order_index
    ) as data
    FROM lesson_sections ls
    LEFT JOIN LATERAL (
      SELECT json_agg(
        row_to_json(sc) ORDER BY sc.order_index
      ) as data
      FROM section_content sc
      WHERE sc.section_id = ls.id
    ) content_json ON true
    WHERE ls.lesson_id = lm.id
  ) sections_json ON true
  LEFT JOIN LATERAL (
    SELECT json_agg(row_to_json(lc) ORDER BY lc.order_index) as data
    FROM lesson_concepts lc
    WHERE lc.lesson_id = lm.id
  ) concepts_json ON true
  LEFT JOIN LATERAL (
    SELECT json_agg(row_to_json(le) ORDER BY le.order_index) as data
    FROM lesson_examples le
    WHERE le.lesson_id = lm.id
  ) examples_json ON true
  LEFT JOIN LATERAL (
    SELECT json_agg(row_to_json(lt) ORDER BY lt.order_index) as data
    FROM lesson_tips lt
    WHERE lt.lesson_id = lm.id
  ) tips_json ON true
  LEFT JOIN LATERAL (
    SELECT json_agg(row_to_json(lo) ORDER BY lo.order_index) as data
    FROM lesson_objectives lo
    WHERE lo.lesson_id = lm.id
  ) objectives_json ON true
  WHERE lm.lesson_key = p_lesson_key;

  RETURN result;
END;
$$ LANGUAGE plpgsql;

-- ============================================================
-- TRIGGERS FOR UPDATED_AT TIMESTAMP
-- ============================================================

CREATE TRIGGER update_lesson_metadata_updated_at
  BEFORE UPDATE ON lesson_metadata
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();