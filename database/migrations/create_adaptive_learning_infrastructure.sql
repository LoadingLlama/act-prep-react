-- ================================================================
-- ADAPTIVE LEARNING ALGORITHM INFRASTRUCTURE
-- ================================================================
-- This creates all tables needed for the personalized learning system:
--   1. Track user performance by lesson
--   2. Generate personalized learning paths
--   3. Create daily study recommendations
--   4. Adapt based on ongoing performance
-- ================================================================

-- ================================================================
-- 1. USER LESSON PERFORMANCE TRACKING
-- ================================================================
-- Tracks user's performance on each lesson across all question sources
-- (diagnostic, practice tests, lesson practice, examples)
CREATE TABLE IF NOT EXISTS user_lesson_performance (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  lesson_id TEXT NOT NULL REFERENCES lessons(id) ON DELETE CASCADE,

  -- Performance metrics
  total_questions_attempted INTEGER DEFAULT 0,
  correct_answers INTEGER DEFAULT 0,
  accuracy_percentage DECIMAL(5,2) DEFAULT 0,

  -- Mastery tracking (0-5 stars)
  mastery_level INTEGER DEFAULT 0 CHECK (mastery_level >= 0 AND mastery_level <= 5),

  -- Time tracking
  total_time_spent_seconds INTEGER DEFAULT 0,
  average_time_per_question DECIMAL(8,2),

  -- Source tracking (where questions came from)
  diagnostic_questions INTEGER DEFAULT 0,
  diagnostic_correct INTEGER DEFAULT 0,
  practice_test_questions INTEGER DEFAULT 0,
  practice_test_correct INTEGER DEFAULT 0,
  lesson_practice_questions INTEGER DEFAULT 0,
  lesson_practice_correct INTEGER DEFAULT 0,

  -- Status
  is_weak_area BOOLEAN DEFAULT false,
  priority_level INTEGER DEFAULT 0, -- 0=not priority, 1-5=priority level
  last_practiced_at TIMESTAMP WITH TIME ZONE,

  -- Timestamps
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),

  UNIQUE(user_id, lesson_id)
);

CREATE INDEX IF NOT EXISTS idx_user_lesson_perf_user ON user_lesson_performance(user_id);
CREATE INDEX IF NOT EXISTS idx_user_lesson_perf_lesson ON user_lesson_performance(lesson_id);
CREATE INDEX IF NOT EXISTS idx_user_lesson_perf_weak ON user_lesson_performance(user_id, is_weak_area);
CREATE INDEX IF NOT EXISTS idx_user_lesson_perf_priority ON user_lesson_performance(user_id, priority_level);

-- ================================================================
-- 2. USER LEARNING PATHS
-- ================================================================
-- Stores the personalized learning path generated for each user
CREATE TABLE IF NOT EXISTS user_learning_paths (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,

  -- Path metadata
  path_name TEXT NOT NULL, -- e.g., "ACT Prep - June 2025 Exam"
  exam_date DATE,
  daily_study_minutes INTEGER,
  target_score INTEGER,
  current_estimated_score INTEGER,

  -- Path status
  is_active BOOLEAN DEFAULT true,
  completion_percentage DECIMAL(5,2) DEFAULT 0,

  -- Timestamps
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  last_recalculated_at TIMESTAMP WITH TIME ZONE,

  UNIQUE(user_id, is_active) -- Only one active path per user
);

CREATE INDEX IF NOT EXISTS idx_user_paths_user ON user_learning_paths(user_id);
CREATE INDEX IF NOT EXISTS idx_user_paths_active ON user_learning_paths(user_id, is_active);

-- ================================================================
-- 3. LEARNING PATH ITEMS
-- ================================================================
-- Individual lessons/activities in the learning path
CREATE TABLE IF NOT EXISTS learning_path_items (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  learning_path_id UUID NOT NULL REFERENCES user_learning_paths(id) ON DELETE CASCADE,
  lesson_id TEXT NOT NULL REFERENCES lessons(id) ON DELETE CASCADE,

  -- Sequencing
  sequence_order INTEGER NOT NULL,
  week_number INTEGER,
  day_number INTEGER,

  -- Status
  status TEXT DEFAULT 'pending' CHECK (status IN ('pending', 'in_progress', 'completed', 'skipped')),
  is_priority BOOLEAN DEFAULT false,

  -- Timing
  estimated_minutes INTEGER,
  actual_minutes_spent INTEGER DEFAULT 0,
  scheduled_date DATE,
  completed_at TIMESTAMP WITH TIME ZONE,

  -- Performance
  completion_score DECIMAL(5,2),
  mastery_achieved INTEGER DEFAULT 0 CHECK (mastery_achieved >= 0 AND mastery_achieved <= 5),

  -- Timestamps
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),

  UNIQUE(learning_path_id, lesson_id)
);

CREATE INDEX IF NOT EXISTS idx_path_items_path ON learning_path_items(learning_path_id);
CREATE INDEX IF NOT EXISTS idx_path_items_lesson ON learning_path_items(lesson_id);
CREATE INDEX IF NOT EXISTS idx_path_items_sequence ON learning_path_items(learning_path_id, sequence_order);
CREATE INDEX IF NOT EXISTS idx_path_items_status ON learning_path_items(learning_path_id, status);
CREATE INDEX IF NOT EXISTS idx_path_items_scheduled ON learning_path_items(learning_path_id, scheduled_date);

-- ================================================================
-- 4. DAILY RECOMMENDATIONS
-- ================================================================
-- What the user should study today
CREATE TABLE IF NOT EXISTS daily_recommendations (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  learning_path_id UUID NOT NULL REFERENCES user_learning_paths(id) ON DELETE CASCADE,

  -- Date
  recommendation_date DATE NOT NULL,

  -- Content
  recommended_lessons JSONB, -- Array of lesson_ids with metadata
  estimated_total_minutes INTEGER,

  -- Status
  is_viewed BOOLEAN DEFAULT false,
  is_completed BOOLEAN DEFAULT false,
  completion_percentage DECIMAL(5,2) DEFAULT 0,

  -- Actual performance
  actual_minutes_spent INTEGER DEFAULT 0,
  lessons_completed INTEGER DEFAULT 0,

  -- Timestamps
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),

  UNIQUE(user_id, recommendation_date)
);

CREATE INDEX IF NOT EXISTS idx_daily_recs_user ON daily_recommendations(user_id);
CREATE INDEX IF NOT EXISTS idx_daily_recs_date ON daily_recommendations(user_id, recommendation_date);
CREATE INDEX IF NOT EXISTS idx_daily_recs_path ON daily_recommendations(learning_path_id);

-- ================================================================
-- 5. USER GOALS & PREFERENCES
-- ================================================================
-- Store onboarding data and user preferences
CREATE TABLE IF NOT EXISTS user_goals (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,

  -- Goal setting
  target_exam_date DATE,
  current_score INTEGER,
  target_score INTEGER,
  score_improvement_needed INTEGER,

  -- Availability
  daily_study_minutes INTEGER,
  study_days_per_week INTEGER,
  preferred_study_time TEXT, -- 'morning', 'afternoon', 'evening'

  -- Focus areas
  focus_sections JSONB, -- ['english', 'math', 'reading', 'science']
  weak_areas JSONB, -- Lessons marked as weak from diagnostic

  -- Preferences
  learning_pace TEXT DEFAULT 'moderate' CHECK (learning_pace IN ('slow', 'moderate', 'fast')),
  reminder_frequency TEXT DEFAULT 'daily' CHECK (reminder_frequency IN ('daily', 'twice_daily', 'weekly', 'none')),

  -- Timestamps
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),

  UNIQUE(user_id)
);

CREATE INDEX IF NOT EXISTS idx_user_goals_user ON user_goals(user_id);

-- ================================================================
-- 6. DIAGNOSTIC TEST ANALYSIS
-- ================================================================
-- Analysis of diagnostic test results by lesson
CREATE TABLE IF NOT EXISTS diagnostic_analysis (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  diagnostic_session_id UUID REFERENCES diagnostic_test_sessions(id) ON DELETE CASCADE,

  -- Overall performance
  total_questions INTEGER,
  total_correct INTEGER,
  overall_accuracy DECIMAL(5,2),
  overall_score INTEGER,

  -- Section breakdown
  english_score INTEGER,
  math_score INTEGER,
  reading_score INTEGER,
  science_score INTEGER,

  -- Lesson-level analysis (JSON array of lesson performance)
  lesson_breakdown JSONB,
  /*
  Example structure:
  [
    {
      "lesson_id": "reading-1.1",
      "lesson_title": "Main Idea",
      "questions_attempted": 5,
      "correct": 2,
      "accuracy": 40.0,
      "is_weak": true,
      "priority": 5
    },
    ...
  ]
  */

  -- Weak areas identified
  weak_lessons JSONB, -- Array of lesson_ids
  priority_lessons JSONB, -- Array of lesson_ids with priority levels

  -- Recommendations
  recommended_study_time_weeks INTEGER,
  estimated_improvement_potential INTEGER,

  -- Timestamps
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),

  UNIQUE(user_id, diagnostic_session_id)
);

CREATE INDEX IF NOT EXISTS idx_diagnostic_analysis_user ON diagnostic_analysis(user_id);
CREATE INDEX IF NOT EXISTS idx_diagnostic_analysis_session ON diagnostic_analysis(diagnostic_session_id);

-- ================================================================
-- 7. ALGORITHM METADATA
-- ================================================================
-- Track algorithm runs and performance
CREATE TABLE IF NOT EXISTS algorithm_runs (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,

  -- Algorithm type
  algorithm_type TEXT NOT NULL CHECK (algorithm_type IN (
    'diagnostic_analysis',
    'path_generation',
    'daily_recommendation',
    'path_update',
    'priority_recalculation'
  )),

  -- Input/Output
  input_data JSONB,
  output_data JSONB,

  -- Performance
  execution_time_ms INTEGER,
  success BOOLEAN DEFAULT true,
  error_message TEXT,

  -- Timestamps
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS idx_algorithm_runs_user ON algorithm_runs(user_id);
CREATE INDEX IF NOT EXISTS idx_algorithm_runs_type ON algorithm_runs(algorithm_type);
CREATE INDEX IF NOT EXISTS idx_algorithm_runs_created ON algorithm_runs(created_at);

-- ================================================================
-- AUTO-UPDATE TRIGGERS
-- ================================================================

-- Trigger to update updated_at timestamp
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Apply to all tables
CREATE TRIGGER update_user_lesson_perf_updated_at
  BEFORE UPDATE ON user_lesson_performance
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_user_paths_updated_at
  BEFORE UPDATE ON user_learning_paths
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_path_items_updated_at
  BEFORE UPDATE ON learning_path_items
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_daily_recs_updated_at
  BEFORE UPDATE ON daily_recommendations
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_user_goals_updated_at
  BEFORE UPDATE ON user_goals
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

-- ================================================================
-- ROW LEVEL SECURITY
-- ================================================================

ALTER TABLE user_lesson_performance ENABLE ROW LEVEL SECURITY;
ALTER TABLE user_learning_paths ENABLE ROW LEVEL SECURITY;
ALTER TABLE learning_path_items ENABLE ROW LEVEL SECURITY;
ALTER TABLE daily_recommendations ENABLE ROW LEVEL SECURITY;
ALTER TABLE user_goals ENABLE ROW LEVEL SECURITY;
ALTER TABLE diagnostic_analysis ENABLE ROW LEVEL SECURITY;
ALTER TABLE algorithm_runs ENABLE ROW LEVEL SECURITY;

-- Drop existing policies if they exist (for re-runs)
DROP POLICY IF EXISTS "Users can view own performance" ON user_lesson_performance;
DROP POLICY IF EXISTS "Users can insert own performance" ON user_lesson_performance;
DROP POLICY IF EXISTS "Users can update own performance" ON user_lesson_performance;
DROP POLICY IF EXISTS "Users can view own paths" ON user_learning_paths;
DROP POLICY IF EXISTS "Users can create own paths" ON user_learning_paths;
DROP POLICY IF EXISTS "Users can update own paths" ON user_learning_paths;
DROP POLICY IF EXISTS "Users can view own path items" ON learning_path_items;
DROP POLICY IF EXISTS "Users can create own path items" ON learning_path_items;
DROP POLICY IF EXISTS "Users can update own path items" ON learning_path_items;
DROP POLICY IF EXISTS "Users can view own recommendations" ON daily_recommendations;
DROP POLICY IF EXISTS "Users can create own recommendations" ON daily_recommendations;
DROP POLICY IF EXISTS "Users can update own recommendations" ON daily_recommendations;
DROP POLICY IF EXISTS "Users can view own goals" ON user_goals;
DROP POLICY IF EXISTS "Users can create own goals" ON user_goals;
DROP POLICY IF EXISTS "Users can update own goals" ON user_goals;
DROP POLICY IF EXISTS "Users can view own diagnostic analysis" ON diagnostic_analysis;
DROP POLICY IF EXISTS "Users can create own diagnostic analysis" ON diagnostic_analysis;
DROP POLICY IF EXISTS "Users can view own algorithm runs" ON algorithm_runs;
DROP POLICY IF EXISTS "Users can create own algorithm runs" ON algorithm_runs;

-- USER_LESSON_PERFORMANCE policies
CREATE POLICY "Users can view own performance"
  ON user_lesson_performance FOR SELECT
  USING (auth.uid() = user_id);

CREATE POLICY "Users can insert own performance"
  ON user_lesson_performance FOR INSERT
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update own performance"
  ON user_lesson_performance FOR UPDATE
  USING (auth.uid() = user_id);

-- USER_LEARNING_PATHS policies
CREATE POLICY "Users can view own paths"
  ON user_learning_paths FOR SELECT
  USING (auth.uid() = user_id);

CREATE POLICY "Users can create own paths"
  ON user_learning_paths FOR INSERT
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update own paths"
  ON user_learning_paths FOR UPDATE
  USING (auth.uid() = user_id);

-- LEARNING_PATH_ITEMS policies
CREATE POLICY "Users can view own path items"
  ON learning_path_items FOR SELECT
  USING (auth.uid() IN (SELECT user_id FROM user_learning_paths WHERE id = learning_path_id));

CREATE POLICY "Users can create own path items"
  ON learning_path_items FOR INSERT
  WITH CHECK (auth.uid() IN (SELECT user_id FROM user_learning_paths WHERE id = learning_path_id));

CREATE POLICY "Users can update own path items"
  ON learning_path_items FOR UPDATE
  USING (auth.uid() IN (SELECT user_id FROM user_learning_paths WHERE id = learning_path_id));

-- DAILY_RECOMMENDATIONS policies
CREATE POLICY "Users can view own recommendations"
  ON daily_recommendations FOR SELECT
  USING (auth.uid() = user_id);

CREATE POLICY "Users can create own recommendations"
  ON daily_recommendations FOR INSERT
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update own recommendations"
  ON daily_recommendations FOR UPDATE
  USING (auth.uid() = user_id);

-- USER_GOALS policies
CREATE POLICY "Users can view own goals"
  ON user_goals FOR SELECT
  USING (auth.uid() = user_id);

CREATE POLICY "Users can create own goals"
  ON user_goals FOR INSERT
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update own goals"
  ON user_goals FOR UPDATE
  USING (auth.uid() = user_id);

-- DIAGNOSTIC_ANALYSIS policies
CREATE POLICY "Users can view own diagnostic analysis"
  ON diagnostic_analysis FOR SELECT
  USING (auth.uid() = user_id);

CREATE POLICY "Users can create own diagnostic analysis"
  ON diagnostic_analysis FOR INSERT
  WITH CHECK (auth.uid() = user_id);

-- ALGORITHM_RUNS policies (read-only for users)
CREATE POLICY "Users can view own algorithm runs"
  ON algorithm_runs FOR SELECT
  USING (auth.uid() = user_id);

CREATE POLICY "Users can create own algorithm runs"
  ON algorithm_runs FOR INSERT
  WITH CHECK (auth.uid() = user_id);
