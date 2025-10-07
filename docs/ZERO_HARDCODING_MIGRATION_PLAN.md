# Zero Hardcoding Migration Plan

**Date**: 2025-10-06
**Objective**: Move ALL hardcoded data to Supabase for complete dynamic content management

---

## Currently Hardcoded Data

### 1. **Landing Page Data** (`CompleteLandingPage.jsx`)

#### Hardcoded Arrays:
```javascript
// Line 38-47: Social proof signups
const recentSignups = [
  'Sarah from California just joined',
  'Michael from New York just joined',
  // ... 8 items
];

// Line 50-58: Hero dynamic texts
const dynamicTexts = [
  'Elite Preparation',
  'Expert Personal Tutors',
  // ... 7 items
];

// Line 61-71: Performance chart data
const chartData = [
  { week: 1, traditional: 45, launchPrep: 35, ... },
  // ... 9 weeks of data
];
```

#### Other Hardcoded Content:
- Navigation links
- Feature cards (features section)
- Testimonials
- Pricing tiers
- FAQ items
- All text content and copy

---

### 2. **Lesson Structure** (`App.js`)

#### Massive Hardcoded Array:
```javascript
// Line 619: Complete lesson structure
const lessonStructure = [
  { id: 'getting-started', section: 'all', title: 'ACT Test Basics & Overview', ... },
  { id: 'sentence-structure', section: 'english', title: 'Chapter 1: Building Complete Sentences', ... },
  // ... ~50+ lessons
];
```

**Issues:**
- Hard to add/edit lessons
- No versioning
- No A/B testing capability
- Can't update without deploying code

---

### 3. **AI Chat Fallbacks** (`AIChat.js`)

```javascript
const fallbacks = [
  "Could you provide more details?",
  "I'm here to help with ACT prep questions!",
  // ... fallback responses
];
```

---

## Proposed Supabase Schema

### Table 1: `site_content`
**Purpose**: All landing page content, dynamically editable

```sql
CREATE TABLE site_content (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  content_key TEXT UNIQUE NOT NULL,  -- e.g., 'hero_badge_text', 'cta_button_text'
  content_type TEXT NOT NULL,        -- 'text', 'html', 'json', 'array'
  content_value JSONB NOT NULL,      -- Flexible storage for any content
  section TEXT NOT NULL,             -- 'hero', 'features', 'testimonials', 'pricing', 'faq'
  display_order INTEGER,             -- For ordering lists
  is_active BOOLEAN DEFAULT true,
  metadata JSONB,                    -- Extra fields like { tooltip, icon, color }
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Example rows:
INSERT INTO site_content (content_key, content_type, content_value, section, display_order) VALUES
('hero_dynamic_texts', 'array', '["Elite Preparation", "Expert Personal Tutors", "Science-Based Methods", "Full-Tailored Courses", "Precision Analytics", "Diagnostic Test", "AI-Powered Learning"]', 'hero', 1),
('hero_badge_text', 'text', '"Unlock Your Full Academic Potential"', 'hero', 2),
('hero_title', 'html', '"The <span>Future</span> of<br/>ACT Preparation"', 'hero', 3);
```

---

### Table 2: `social_proof_signups`
**Purpose**: Recent signup notifications for social proof

```sql
CREATE TABLE social_proof_signups (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  signup_text TEXT NOT NULL,         -- 'Sarah from California just joined'
  display_order INTEGER,
  is_active BOOLEAN DEFAULT true,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Example rows:
INSERT INTO social_proof_signups (signup_text, display_order) VALUES
('Sarah from California just joined', 1),
('Michael from New York just joined', 2),
('Emma from Texas just joined', 3);
```

---

### Table 3: `performance_chart_data`
**Purpose**: Chart data for comparison graphs

```sql
CREATE TABLE performance_chart_data (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  week INTEGER NOT NULL,
  traditional_score INTEGER NOT NULL,
  launch_prep_score INTEGER NOT NULL,
  tooltip_text TEXT,
  display_order INTEGER,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Example rows:
INSERT INTO performance_chart_data (week, traditional_score, launch_prep_score, tooltip_text, display_order) VALUES
(1, 45, 35, 'Traditional: 45% vs Launch Prep: 35%', 1),
(2, 60, 40, 'Traditional: 60% vs Launch Prep: 40%', 2);
```

---

### Table 4: `features`
**Purpose**: Feature cards on landing page

```sql
CREATE TABLE features (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  title TEXT NOT NULL,
  description TEXT NOT NULL,
  icon TEXT,                         -- Icon name or SVG
  highlight_color TEXT,              -- Hex color
  display_order INTEGER,
  is_active BOOLEAN DEFAULT true,
  metadata JSONB,                    -- { badge, ctaText, ctaLink }
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Example rows:
INSERT INTO features (title, description, icon, highlight_color, display_order) VALUES
('AI-Powered Learning', 'Personalized study plans adapted to your learning style', 'brain', '#007aff', 1),
('Expert Tutors', '1-on-1 guidance from top ACT scorers', 'user-graduate', '#34c759', 2);
```

---

### Table 5: `testimonials`
**Purpose**: Student testimonials

```sql
CREATE TABLE testimonials (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  student_name TEXT NOT NULL,
  student_location TEXT,             -- 'California', 'New York'
  student_photo_url TEXT,
  score_before INTEGER,
  score_after INTEGER,
  testimonial_text TEXT NOT NULL,
  display_order INTEGER,
  is_featured BOOLEAN DEFAULT false,
  is_active BOOLEAN DEFAULT true,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Example rows:
INSERT INTO testimonials (student_name, student_location, score_before, score_after, testimonial_text, display_order) VALUES
('Sarah Johnson', 'California', 24, 34, 'Launch Prep helped me improve my score by 10 points!', 1);
```

---

### Table 6: `pricing_tiers`
**Purpose**: Pricing plans

```sql
CREATE TABLE pricing_tiers (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  tier_name TEXT NOT NULL,           -- 'Basic', 'Pro', 'Elite'
  tier_subtitle TEXT,
  price_monthly DECIMAL(10, 2),
  price_yearly DECIMAL(10, 2),
  is_popular BOOLEAN DEFAULT false,
  features JSONB NOT NULL,           -- Array of feature strings
  cta_text TEXT DEFAULT 'Get Started',
  cta_link TEXT,
  display_order INTEGER,
  is_active BOOLEAN DEFAULT true,
  metadata JSONB,                    -- { badge, highlight_color }
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Example rows:
INSERT INTO pricing_tiers (tier_name, tier_subtitle, price_monthly, price_yearly, features, is_popular, display_order) VALUES
('Pro', 'Most Popular', 49.99, 479.88, '["Full lesson access", "AI tutoring", "Practice tests", "Progress tracking"]', true, 2);
```

---

### Table 7: `faq_items`
**Purpose**: FAQ section

```sql
CREATE TABLE faq_items (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  question TEXT NOT NULL,
  answer TEXT NOT NULL,
  category TEXT,                     -- 'general', 'pricing', 'technical'
  display_order INTEGER,
  is_active BOOLEAN DEFAULT true,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Example rows:
INSERT INTO faq_items (question, answer, category, display_order) VALUES
('How does the AI tutoring work?', 'Our AI analyzes your performance and creates personalized study plans...', 'general', 1);
```

---

### Table 8: `lesson_catalog`
**Purpose**: Replace hardcoded lessonStructure

```sql
CREATE TABLE lesson_catalog (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  lesson_key TEXT UNIQUE NOT NULL,   -- 'sentence-structure', 'commas'
  section TEXT NOT NULL,             -- 'english', 'math', 'reading', 'science', 'all'
  chapter_number INTEGER,
  title TEXT NOT NULL,
  description TEXT,
  content_id UUID REFERENCES lessons(id),  -- Link to existing lessons table
  display_order INTEGER NOT NULL,
  is_active BOOLEAN DEFAULT true,
  prerequisites JSONB,               -- Array of prerequisite lesson_keys
  estimated_duration INTEGER,        -- Minutes
  difficulty_level TEXT,             -- 'beginner', 'intermediate', 'advanced'
  tags JSONB,                        -- ['grammar', 'writing', 'english']
  metadata JSONB,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Example rows:
INSERT INTO lesson_catalog (lesson_key, section, chapter_number, title, description, display_order, difficulty_level) VALUES
('getting-started', 'all', 0, 'ACT Test Basics & Overview', 'Test format, timing, and scoring overview', 1, 'beginner'),
('sentence-structure', 'english', 1, 'Building Complete Sentences', 'Independent clauses, dependent clauses, compound sentences', 2, 'beginner');
```

---

### Table 9: `ai_chat_responses`
**Purpose**: AI fallback responses and templates

```sql
CREATE TABLE ai_chat_responses (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  response_key TEXT UNIQUE NOT NULL,
  response_text TEXT NOT NULL,
  response_type TEXT NOT NULL,       -- 'fallback', 'greeting', 'help', 'error'
  trigger_keywords JSONB,            -- Array of keywords that trigger this response
  display_order INTEGER,
  is_active BOOLEAN DEFAULT true,
  metadata JSONB,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Example rows:
INSERT INTO ai_chat_responses (response_key, response_text, response_type, trigger_keywords) VALUES
('fallback_1', 'Could you provide more details?', 'fallback', '[]'),
('greeting', 'Hi! I'm here to help with ACT prep. What would you like to know?', 'greeting', '["hi", "hello", "hey"]');
```

---

### Table 10: `app_config`
**Purpose**: Global application settings

```sql
CREATE TABLE app_config (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  config_key TEXT UNIQUE NOT NULL,
  config_value JSONB NOT NULL,
  config_type TEXT NOT NULL,         -- 'string', 'number', 'boolean', 'object', 'array'
  description TEXT,
  is_public BOOLEAN DEFAULT false,   -- Can be fetched without auth
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Example rows:
INSERT INTO app_config (config_key, config_value, config_type, is_public) VALUES
('signup_count_start', '7567', 'number', true),
('enable_ai_chat', 'true', 'boolean', true),
('max_lesson_sections', '10', 'number', false);
```

---

## Migration Services

### Service: `content.service.js`

```javascript
/**
 * Content Service
 * Fetches all dynamic content from Supabase
 */

import { supabase } from './supabase.service';
import logger from '../logging/logger';

const ContentService = {
  /**
   * Get all site content by section
   */
  async getSiteContent(section = null) {
    let query = supabase.from('site_content').select('*').eq('is_active', true);

    if (section) {
      query = query.eq('section', section);
    }

    const { data, error } = await query.order('display_order');

    if (error) {
      logger.error('ContentService', 'getSiteContent', { section }, error);
      return null;
    }

    logger.info('ContentService', 'getSiteContent', { section, count: data?.length });
    return data;
  },

  /**
   * Get specific content by key
   */
  async getContentByKey(contentKey) {
    const { data, error } = await supabase
      .from('site_content')
      .select('*')
      .eq('content_key', contentKey)
      .eq('is_active', true)
      .single();

    if (error) {
      logger.error('ContentService', 'getContentByKey', { contentKey }, error);
      return null;
    }

    return data?.content_value;
  },

  /**
   * Get social proof signups
   */
  async getSocialProofSignups() {
    const { data, error } = await supabase
      .from('social_proof_signups')
      .select('*')
      .eq('is_active', true)
      .order('display_order');

    if (error) {
      logger.error('ContentService', 'getSocialProofSignups', {}, error);
      return [];
    }

    return data.map(item => item.signup_text);
  },

  /**
   * Get chart data
   */
  async getChartData() {
    const { data, error } = await supabase
      .from('performance_chart_data')
      .select('*')
      .order('display_order');

    if (error) {
      logger.error('ContentService', 'getChartData', {}, error);
      return [];
    }

    return data;
  },

  /**
   * Get features
   */
  async getFeatures() {
    const { data, error } = await supabase
      .from('features')
      .select('*')
      .eq('is_active', true)
      .order('display_order');

    if (error) {
      logger.error('ContentService', 'getFeatures', {}, error);
      return [];
    }

    return data;
  },

  /**
   * Get testimonials
   */
  async getTestimonials(featuredOnly = false) {
    let query = supabase
      .from('testimonials')
      .select('*')
      .eq('is_active', true);

    if (featuredOnly) {
      query = query.eq('is_featured', true);
    }

    const { data, error } = await query.order('display_order');

    if (error) {
      logger.error('ContentService', 'getTestimonials', { featuredOnly }, error);
      return [];
    }

    return data;
  },

  /**
   * Get pricing tiers
   */
  async getPricingTiers() {
    const { data, error } = await supabase
      .from('pricing_tiers')
      .select('*')
      .eq('is_active', true)
      .order('display_order');

    if (error) {
      logger.error('ContentService', 'getPricingTiers', {}, error);
      return [];
    }

    return data;
  },

  /**
   * Get FAQ items
   */
  async getFAQItems(category = null) {
    let query = supabase
      .from('faq_items')
      .select('*')
      .eq('is_active', true);

    if (category) {
      query = query.eq('category', category);
    }

    const { data, error } = await query.order('display_order');

    if (error) {
      logger.error('ContentService', 'getFAQItems', { category }, error);
      return [];
    }

    return data;
  },

  /**
   * Get lesson catalog
   */
  async getLessonCatalog(section = null) {
    let query = supabase
      .from('lesson_catalog')
      .select('*')
      .eq('is_active', true);

    if (section) {
      query = query.eq('section', section);
    }

    const { data, error } = await query.order('display_order');

    if (error) {
      logger.error('ContentService', 'getLessonCatalog', { section }, error);
      return [];
    }

    return data;
  },

  /**
   * Get AI chat responses
   */
  async getAIChatResponses(responseType = null) {
    let query = supabase
      .from('ai_chat_responses')
      .select('*')
      .eq('is_active', true);

    if (responseType) {
      query = query.eq('response_type', responseType);
    }

    const { data, error } = await query.order('display_order');

    if (error) {
      logger.error('ContentService', 'getAIChatResponses', { responseType }, error);
      return [];
    }

    return data;
  },

  /**
   * Get app config value
   */
  async getConfig(configKey) {
    const { data, error } = await supabase
      .from('app_config')
      .select('config_value')
      .eq('config_key', configKey)
      .single();

    if (error) {
      logger.error('ContentService', 'getConfig', { configKey }, error);
      return null;
    }

    return data?.config_value;
  },
};

export default ContentService;
```

---

## Migration Steps

### Phase 1: Create Tables (1 hour)
1. Run SQL migrations in Supabase
2. Create all 10 tables with proper indexes
3. Set up RLS policies for read access

### Phase 2: Seed Initial Data (2 hours)
1. Extract all hardcoded data
2. Create seed SQL scripts
3. Import data into Supabase

### Phase 3: Update Frontend (3 hours)
1. Replace hardcoded arrays with API calls
2. Add loading states
3. Add error handling with fallbacks

### Phase 4: Testing (1 hour)
1. Verify all content loads correctly
2. Test error scenarios
3. Performance testing

---

## Benefits

### ✅ **Zero Hardcoding**
- All content in database
- Update without code deployment
- A/B testing capability

### ✅ **Content Management**
- Non-technical staff can edit
- Version history
- Schedule content updates

### ✅ **Scalability**
- Add new lessons easily
- Internationalization ready
- Multi-tenancy support

### ✅ **Performance**
- Cache content server-side
- CDN-ready
- Reduce bundle size

---

## SQL Migration File

Create: `database/migrations/002_dynamic_content_schema.sql`

---

Would you like me to:
1. ✅ Generate the complete SQL migration file?
2. ✅ Create the ContentService implementation?
3. ✅ Update components to use dynamic data?
4. ✅ Create seed data scripts?

