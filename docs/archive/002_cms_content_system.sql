-- ============================================
-- CMS CONTENT SYSTEM MIGRATION
-- ============================================
-- Purpose: Move ALL hardcoded content to database
-- Organization: Tables prefixed by function
--   cms_*       = Content Management System tables
--   lesson_*    = Lesson/Education tables
--   ai_*        = AI Chat tables
--   analytics_* = Performance/Analytics tables
--   config_*    = Application configuration
-- ============================================

-- Enable UUID extension
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- ============================================
-- SECTION 1: CMS TABLES (Content Management)
-- Purpose: Landing page and marketing content
-- ============================================

-- Table: cms_site_content
-- Purpose: Flexible storage for ANY site content (hero, features, copy, etc.)
-- Usage: Universal content bucket with JSONB for flexibility
CREATE TABLE IF NOT EXISTS cms_site_content (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),

  -- Identification
  content_key TEXT UNIQUE NOT NULL,        -- e.g., 'hero_title', 'cta_button_text'
  section TEXT NOT NULL,                   -- 'hero', 'features', 'testimonials', etc.

  -- Content
  content_type TEXT NOT NULL,              -- 'text', 'html', 'json', 'array'
  content_value JSONB NOT NULL,            -- Actual content stored as JSON

  -- Organization
  display_order INTEGER DEFAULT 0,
  is_active BOOLEAN DEFAULT true,

  -- Metadata
  metadata JSONB DEFAULT '{}',             -- Extra data: {tooltip, icon, color, etc.}

  -- Timestamps
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),

  -- Constraints
  CONSTRAINT valid_content_type CHECK (content_type IN ('text', 'html', 'json', 'array', 'number', 'boolean'))
);

COMMENT ON TABLE cms_site_content IS 'Flexible content storage for all site text, copy, and marketing content';
COMMENT ON COLUMN cms_site_content.content_key IS 'Unique identifier for this content piece (e.g., hero_title)';
COMMENT ON COLUMN cms_site_content.section IS 'Page section this content belongs to (hero, features, pricing, etc.)';
COMMENT ON COLUMN cms_site_content.content_value IS 'Actual content stored as JSONB for flexibility';

-- Indexes for cms_site_content
CREATE INDEX idx_cms_site_content_section ON cms_site_content(section) WHERE is_active = true;
CREATE INDEX idx_cms_site_content_active ON cms_site_content(is_active);
CREATE INDEX idx_cms_site_content_order ON cms_site_content(display_order);

-- ============================================

-- Table: cms_social_proof
-- Purpose: Social proof notifications ("Sarah from CA just joined")
-- Usage: Rotating signup notifications on landing page
CREATE TABLE IF NOT EXISTS cms_social_proof (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),

  -- Content
  signup_text TEXT NOT NULL,               -- 'Sarah from California just joined'

  -- Organization
  display_order INTEGER DEFAULT 0,
  is_active BOOLEAN DEFAULT true,

  -- Timestamps
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

COMMENT ON TABLE cms_social_proof IS 'Social proof notifications for landing page (rotating signups)';
COMMENT ON COLUMN cms_social_proof.signup_text IS 'Full text of signup notification';

-- Indexes for cms_social_proof
CREATE INDEX idx_cms_social_proof_active ON cms_social_proof(is_active, display_order);

-- ============================================

-- Table: cms_features
-- Purpose: Feature cards/sections on landing page
-- Usage: Highlight product features with icons and descriptions
CREATE TABLE IF NOT EXISTS cms_features (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),

  -- Content
  title TEXT NOT NULL,
  description TEXT NOT NULL,
  icon TEXT,                               -- Icon name or emoji

  -- Styling
  highlight_color TEXT DEFAULT '#007aff',  -- Hex color
  badge_text TEXT,                         -- Optional badge (e.g., "NEW", "POPULAR")

  -- CTA
  cta_text TEXT,                           -- Call to action text
  cta_link TEXT,                           -- Link URL

  -- Organization
  display_order INTEGER DEFAULT 0,
  is_active BOOLEAN DEFAULT true,

  -- Extra data
  metadata JSONB DEFAULT '{}',

  -- Timestamps
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

COMMENT ON TABLE cms_features IS 'Feature cards displayed on landing page';
COMMENT ON COLUMN cms_features.icon IS 'Icon identifier (emoji, icon name, or SVG reference)';
COMMENT ON COLUMN cms_features.metadata IS 'Extra feature data like animations, stats, etc.';

-- Indexes for cms_features
CREATE INDEX idx_cms_features_active ON cms_features(is_active, display_order);

-- ============================================

-- Table: cms_testimonials
-- Purpose: Student testimonials and reviews
-- Usage: Social proof from real students
CREATE TABLE IF NOT EXISTS cms_testimonials (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),

  -- Student info
  student_name TEXT NOT NULL,
  student_location TEXT,                   -- 'California', 'New York'
  student_photo_url TEXT,
  student_school TEXT,

  -- Scores
  score_before INTEGER,
  score_after INTEGER,

  -- Testimonial
  testimonial_text TEXT NOT NULL,
  testimonial_title TEXT,                  -- Optional headline

  -- Organization
  display_order INTEGER DEFAULT 0,
  is_featured BOOLEAN DEFAULT false,       -- Featured on homepage
  is_active BOOLEAN DEFAULT true,

  -- Metadata
  metadata JSONB DEFAULT '{}',             -- Video URL, social links, etc.

  -- Timestamps
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

COMMENT ON TABLE cms_testimonials IS 'Student testimonials and success stories';
COMMENT ON COLUMN cms_testimonials.is_featured IS 'Show on homepage if true';
COMMENT ON COLUMN cms_testimonials.metadata IS 'Extra data: video URL, social proof, etc.';

-- Indexes for cms_testimonials
CREATE INDEX idx_cms_testimonials_featured ON cms_testimonials(is_featured) WHERE is_active = true;
CREATE INDEX idx_cms_testimonials_active ON cms_testimonials(is_active, display_order);

-- ============================================

-- Table: cms_pricing_tiers
-- Purpose: Pricing plan tiers (Basic, Pro, Elite, etc.)
-- Usage: Dynamic pricing table
CREATE TABLE IF NOT EXISTS cms_pricing_tiers (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),

  -- Tier info
  tier_name TEXT NOT NULL,                 -- 'Basic', 'Pro', 'Elite'
  tier_subtitle TEXT,                      -- 'Most Popular', 'Best Value'

  -- Pricing
  price_monthly DECIMAL(10, 2),
  price_yearly DECIMAL(10, 2),
  currency TEXT DEFAULT 'USD',

  -- Features
  features JSONB NOT NULL DEFAULT '[]',    -- Array of feature strings

  -- Highlighting
  is_popular BOOLEAN DEFAULT false,        -- Highlight this tier
  highlight_color TEXT DEFAULT '#007aff',
  badge_text TEXT,                         -- 'POPULAR', 'BEST VALUE'

  -- CTA
  cta_text TEXT DEFAULT 'Get Started',
  cta_link TEXT,

  -- Organization
  display_order INTEGER DEFAULT 0,
  is_active BOOLEAN DEFAULT true,

  -- Metadata
  metadata JSONB DEFAULT '{}',

  -- Timestamps
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

COMMENT ON TABLE cms_pricing_tiers IS 'Pricing plan tiers for subscription model';
COMMENT ON COLUMN cms_pricing_tiers.features IS 'Array of feature strings included in this tier';
COMMENT ON COLUMN cms_pricing_tiers.is_popular IS 'Highlight and badge this tier as most popular';

-- Indexes for cms_pricing_tiers
CREATE INDEX idx_cms_pricing_active ON cms_pricing_tiers(is_active, display_order);

-- ============================================

-- Table: cms_faq_items
-- Purpose: FAQ section questions and answers
-- Usage: Searchable FAQ with categories
CREATE TABLE IF NOT EXISTS cms_faq_items (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),

  -- Content
  question TEXT NOT NULL,
  answer TEXT NOT NULL,

  -- Organization
  category TEXT DEFAULT 'general',         -- 'general', 'pricing', 'technical', 'billing'
  display_order INTEGER DEFAULT 0,
  is_active BOOLEAN DEFAULT true,

  -- SEO
  tags JSONB DEFAULT '[]',                 -- Search tags

  -- Timestamps
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

COMMENT ON TABLE cms_faq_items IS 'FAQ section with categorized questions and answers';
COMMENT ON COLUMN cms_faq_items.category IS 'FAQ category for filtering and organization';
COMMENT ON COLUMN cms_faq_items.tags IS 'Search tags for FAQ search functionality';

-- Indexes for cms_faq_items
CREATE INDEX idx_cms_faq_category ON cms_faq_items(category) WHERE is_active = true;
CREATE INDEX idx_cms_faq_active ON cms_faq_items(is_active, display_order);

-- ============================================
-- SECTION 2: LESSON TABLES
-- Purpose: Lesson catalog and organization
-- ============================================

-- Table: lesson_catalog
-- Purpose: Lesson metadata and organization (replaces hardcoded lessonStructure)
-- Usage: Links to existing 'lessons' table content
CREATE TABLE IF NOT EXISTS lesson_catalog (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),

  -- Identification
  lesson_key TEXT UNIQUE NOT NULL,         -- 'sentence-structure', 'commas'
  lesson_id UUID REFERENCES lessons(id),   -- Link to actual lesson content

  -- Organization
  section TEXT NOT NULL,                   -- 'english', 'math', 'reading', 'science', 'all'
  chapter_number INTEGER,

  -- Content
  title TEXT NOT NULL,
  description TEXT,

  -- Ordering
  display_order INTEGER NOT NULL,

  -- Learning metadata
  prerequisites JSONB DEFAULT '[]',        -- Array of prerequisite lesson_keys
  estimated_duration INTEGER,              -- Minutes
  difficulty_level TEXT DEFAULT 'beginner',

  -- Categorization
  tags JSONB DEFAULT '[]',                 -- ['grammar', 'writing', 'english']

  -- Status
  is_active BOOLEAN DEFAULT true,

  -- Extra data
  metadata JSONB DEFAULT '{}',             -- Extra info like videos, resources

  -- Timestamps
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),

  -- Constraints
  CONSTRAINT valid_section CHECK (section IN ('english', 'math', 'reading', 'science', 'all')),
  CONSTRAINT valid_difficulty CHECK (difficulty_level IN ('beginner', 'intermediate', 'advanced'))
);

COMMENT ON TABLE lesson_catalog IS 'Lesson catalog metadata (replaces hardcoded lessonStructure array)';
COMMENT ON COLUMN lesson_catalog.lesson_key IS 'Unique slug for URL routing (e.g., sentence-structure)';
COMMENT ON COLUMN lesson_catalog.lesson_id IS 'Foreign key to lessons table with actual content';
COMMENT ON COLUMN lesson_catalog.prerequisites IS 'Array of lesson_key values that must be completed first';

-- Indexes for lesson_catalog
CREATE INDEX idx_lesson_catalog_section ON lesson_catalog(section) WHERE is_active = true;
CREATE INDEX idx_lesson_catalog_order ON lesson_catalog(display_order);
CREATE INDEX idx_lesson_catalog_difficulty ON lesson_catalog(difficulty_level);

-- ============================================
-- SECTION 3: ANALYTICS TABLES
-- Purpose: Performance charts and data visualization
-- ============================================

-- Table: analytics_chart_data
-- Purpose: Chart data for performance comparisons
-- Usage: Traditional vs Launch Prep comparison chart
CREATE TABLE IF NOT EXISTS analytics_chart_data (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),

  -- Chart identification
  chart_key TEXT NOT NULL,                 -- 'performance_comparison', 'progress_chart'
  data_point_label TEXT NOT NULL,          -- 'Week 1', 'Month 1'

  -- Data values
  data_values JSONB NOT NULL,              -- { traditional: 45, launchPrep: 35 }

  -- Display
  tooltip_text TEXT,
  display_order INTEGER DEFAULT 0,

  -- Metadata
  metadata JSONB DEFAULT '{}',             -- Colors, icons, etc.

  -- Status
  is_active BOOLEAN DEFAULT true,

  -- Timestamps
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

COMMENT ON TABLE analytics_chart_data IS 'Chart data points for analytics visualizations';
COMMENT ON COLUMN analytics_chart_data.chart_key IS 'Identifies which chart this data belongs to';
COMMENT ON COLUMN analytics_chart_data.data_values IS 'JSONB object with all data values for this point';

-- Indexes for analytics_chart_data
CREATE INDEX idx_analytics_chart_key ON analytics_chart_data(chart_key) WHERE is_active = true;
CREATE INDEX idx_analytics_chart_order ON analytics_chart_data(chart_key, display_order);

-- ============================================
-- SECTION 4: AI TABLES
-- Purpose: AI chat responses and prompts
-- ============================================

-- Table: ai_chat_responses
-- Purpose: AI fallback responses and templated replies
-- Usage: When AI can't generate response, use these templates
CREATE TABLE IF NOT EXISTS ai_chat_responses (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),

  -- Identification
  response_key TEXT UNIQUE NOT NULL,
  response_type TEXT NOT NULL,             -- 'fallback', 'greeting', 'help', 'error'

  -- Content
  response_text TEXT NOT NULL,

  -- Triggers
  trigger_keywords JSONB DEFAULT '[]',     -- Keywords that trigger this response

  -- Organization
  display_order INTEGER DEFAULT 0,
  is_active BOOLEAN DEFAULT true,

  -- Metadata
  metadata JSONB DEFAULT '{}',             -- Variations, tone, etc.

  -- Timestamps
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),

  -- Constraints
  CONSTRAINT valid_response_type CHECK (response_type IN ('fallback', 'greeting', 'help', 'error', 'clarification'))
);

COMMENT ON TABLE ai_chat_responses IS 'AI chat fallback responses and templated replies';
COMMENT ON COLUMN ai_chat_responses.response_type IS 'Type of response (fallback, greeting, help, error)';
COMMENT ON COLUMN ai_chat_responses.trigger_keywords IS 'Array of keywords that can trigger this response';

-- Indexes for ai_chat_responses
CREATE INDEX idx_ai_responses_type ON ai_chat_responses(response_type) WHERE is_active = true;

-- ============================================
-- SECTION 5: CONFIGURATION TABLES
-- Purpose: Global app settings and feature flags
-- ============================================

-- Table: config_app_settings
-- Purpose: Application-wide configuration
-- Usage: Feature flags, limits, constants
CREATE TABLE IF NOT EXISTS config_app_settings (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),

  -- Setting identification
  setting_key TEXT UNIQUE NOT NULL,
  setting_group TEXT NOT NULL,             -- 'features', 'limits', 'ui', 'integrations'

  -- Value
  setting_value JSONB NOT NULL,
  value_type TEXT NOT NULL,                -- 'string', 'number', 'boolean', 'object', 'array'

  -- Documentation
  description TEXT,
  default_value JSONB,

  -- Access control
  is_public BOOLEAN DEFAULT false,         -- Can be fetched without auth

  -- Timestamps
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),

  -- Constraints
  CONSTRAINT valid_value_type CHECK (value_type IN ('string', 'number', 'boolean', 'object', 'array'))
);

COMMENT ON TABLE config_app_settings IS 'Global application configuration and feature flags';
COMMENT ON COLUMN config_app_settings.setting_key IS 'Unique key for this setting (e.g., max_lessons_per_day)';
COMMENT ON COLUMN config_app_settings.is_public IS 'If true, can be fetched without authentication';
COMMENT ON COLUMN config_app_settings.setting_group IS 'Group settings for organization (features, limits, ui, etc.)';

-- Indexes for config_app_settings
CREATE INDEX idx_config_group ON config_app_settings(setting_group);
CREATE INDEX idx_config_public ON config_app_settings(is_public);

-- ============================================
-- TRIGGERS: Auto-update timestamps
-- ============================================

-- Function to update updated_at timestamp
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Apply to all tables with updated_at
CREATE TRIGGER update_cms_site_content_updated_at BEFORE UPDATE ON cms_site_content FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_cms_features_updated_at BEFORE UPDATE ON cms_features FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_cms_pricing_updated_at BEFORE UPDATE ON cms_pricing_tiers FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_cms_faq_updated_at BEFORE UPDATE ON cms_faq_items FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_lesson_catalog_updated_at BEFORE UPDATE ON lesson_catalog FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_config_settings_updated_at BEFORE UPDATE ON config_app_settings FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

-- ============================================
-- ROW LEVEL SECURITY (RLS)
-- ============================================

-- Enable RLS on all tables
ALTER TABLE cms_site_content ENABLE ROW LEVEL SECURITY;
ALTER TABLE cms_social_proof ENABLE ROW LEVEL SECURITY;
ALTER TABLE cms_features ENABLE ROW LEVEL SECURITY;
ALTER TABLE cms_testimonials ENABLE ROW LEVEL SECURITY;
ALTER TABLE cms_pricing_tiers ENABLE ROW LEVEL SECURITY;
ALTER TABLE cms_faq_items ENABLE ROW LEVEL SECURITY;
ALTER TABLE lesson_catalog ENABLE ROW LEVEL SECURITY;
ALTER TABLE analytics_chart_data ENABLE ROW LEVEL SECURITY;
ALTER TABLE ai_chat_responses ENABLE ROW LEVEL SECURITY;
ALTER TABLE config_app_settings ENABLE ROW LEVEL SECURITY;

-- Public READ access to all CMS content (anyone can view)
CREATE POLICY "Public read access to cms_site_content" ON cms_site_content FOR SELECT USING (is_active = true);
CREATE POLICY "Public read access to cms_social_proof" ON cms_social_proof FOR SELECT USING (is_active = true);
CREATE POLICY "Public read access to cms_features" ON cms_features FOR SELECT USING (is_active = true);
CREATE POLICY "Public read access to cms_testimonials" ON cms_testimonials FOR SELECT USING (is_active = true);
CREATE POLICY "Public read access to cms_pricing_tiers" ON cms_pricing_tiers FOR SELECT USING (is_active = true);
CREATE POLICY "Public read access to cms_faq_items" ON cms_faq_items FOR SELECT USING (is_active = true);
CREATE POLICY "Public read access to lesson_catalog" ON lesson_catalog FOR SELECT USING (is_active = true);
CREATE POLICY "Public read access to analytics_chart_data" ON analytics_chart_data FOR SELECT USING (is_active = true);
CREATE POLICY "Public read access to ai_chat_responses" ON ai_chat_responses FOR SELECT USING (is_active = true);
CREATE POLICY "Public read access to config_app_settings" ON config_app_settings FOR SELECT USING (is_public = true);

-- ============================================
-- VIEWS: Commonly used queries
-- ============================================

-- View: Active hero content
CREATE OR REPLACE VIEW v_hero_content AS
SELECT content_key, content_value, metadata
FROM cms_site_content
WHERE section = 'hero' AND is_active = true
ORDER BY display_order;

COMMENT ON VIEW v_hero_content IS 'All active hero section content ordered for display';

-- View: Active features
CREATE OR REPLACE VIEW v_active_features AS
SELECT id, title, description, icon, highlight_color, badge_text, cta_text, cta_link, metadata
FROM cms_features
WHERE is_active = true
ORDER BY display_order;

COMMENT ON VIEW v_active_features IS 'All active features ordered for display';

-- View: Featured testimonials
CREATE OR REPLACE VIEW v_featured_testimonials AS
SELECT student_name, student_location, score_before, score_after, testimonial_text, testimonial_title
FROM cms_testimonials
WHERE is_active = true AND is_featured = true
ORDER BY display_order;

COMMENT ON VIEW v_featured_testimonials IS 'Featured testimonials for homepage';

-- View: Lesson catalog by section
CREATE OR REPLACE VIEW v_lessons_by_section AS
SELECT
  section,
  lesson_key,
  title,
  description,
  chapter_number,
  difficulty_level,
  estimated_duration,
  display_order
FROM lesson_catalog
WHERE is_active = true
ORDER BY section, display_order;

COMMENT ON VIEW v_lessons_by_section IS 'All active lessons organized by section';

-- ============================================
-- MIGRATION COMPLETE
-- ============================================

DO $$
BEGIN
  RAISE NOTICE '';
  RAISE NOTICE '================================================';
  RAISE NOTICE '  CMS CONTENT SYSTEM MIGRATION COMPLETE';
  RAISE NOTICE '================================================';
  RAISE NOTICE '  Created tables:';
  RAISE NOTICE '    ✓ cms_site_content       (Universal content)';
  RAISE NOTICE '    ✓ cms_social_proof       (Social notifications)';
  RAISE NOTICE '    ✓ cms_features           (Feature cards)';
  RAISE NOTICE '    ✓ cms_testimonials       (Student reviews)';
  RAISE NOTICE '    ✓ cms_pricing_tiers      (Pricing plans)';
  RAISE NOTICE '    ✓ cms_faq_items          (FAQ section)';
  RAISE NOTICE '    ✓ lesson_catalog         (Lesson metadata)';
  RAISE NOTICE '    ✓ analytics_chart_data   (Chart data)';
  RAISE NOTICE '    ✓ ai_chat_responses      (AI fallbacks)';
  RAISE NOTICE '    ✓ config_app_settings    (App config)';
  RAISE NOTICE '';
  RAISE NOTICE '  Next steps:';
  RAISE NOTICE '    1. Run seed data migration';
  RAISE NOTICE '    2. Update frontend to use ContentService';
  RAISE NOTICE '    3. Test all content loads correctly';
  RAISE NOTICE '================================================';
  RAISE NOTICE '';
END $$;
