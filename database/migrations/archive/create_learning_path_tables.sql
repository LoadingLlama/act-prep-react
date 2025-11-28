-- ================================================================
-- CREATE LEARNING PATH AND SUPPORTING TABLES
-- ================================================================

-- 1. Create user_learning_paths table
CREATE TABLE IF NOT EXISTS user_learning_paths (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  path_name TEXT NOT NULL,
  exam_date DATE,
  daily_study_minutes INTEGER DEFAULT 30,
  target_score INTEGER,
  current_estimated_score INTEGER DEFAULT 0,
  is_active BOOLEAN DEFAULT true,
  completion_percentage DECIMAL(5,2) DEFAULT 0,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc', NOW()),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc', NOW())
);

-- 2. Create learning_path_items table
CREATE TABLE IF NOT EXISTS learning_path_items (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  learning_path_id UUID NOT NULL REFERENCES user_learning_paths(id) ON DELETE CASCADE,
  lesson_id UUID NOT NULL REFERENCES lessons(id) ON DELETE CASCADE,
  sequence_order INTEGER NOT NULL,
  week_number INTEGER,
  day_number INTEGER,
  is_priority BOOLEAN DEFAULT false,
  estimated_minutes INTEGER DEFAULT 30,
  scheduled_date DATE,
  status TEXT DEFAULT 'pending' CHECK (status IN ('pending', 'in_progress', 'completed', 'skipped')),
  completed_at TIMESTAMP WITH TIME ZONE,
  mastery_achieved INTEGER,
  requires_more_practice BOOLEAN DEFAULT false,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc', NOW()),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc', NOW())
);

-- 3. Create user_lesson_performance table
CREATE TABLE IF NOT EXISTS user_lesson_performance (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  lesson_id UUID NOT NULL REFERENCES lessons(id) ON DELETE CASCADE,
  is_weak_area BOOLEAN DEFAULT false,
  priority_level INTEGER DEFAULT 0,
  total_questions_attempted INTEGER DEFAULT 0,
  correct_answers INTEGER DEFAULT 0,
  accuracy_percentage DECIMAL(5,2) DEFAULT 0,
  diagnostic_questions INTEGER DEFAULT 0,
  diagnostic_correct INTEGER DEFAULT 0,
  mastery_level INTEGER DEFAULT 0 CHECK (mastery_level BETWEEN 0 AND 5),
  last_practiced_at TIMESTAMP WITH TIME ZONE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc', NOW()),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc', NOW()),
  UNIQUE(user_id, lesson_id)
);

-- 4. Create algorithm_runs table (for tracking)
CREATE TABLE IF NOT EXISTS algorithm_runs (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
  algorithm_type TEXT NOT NULL,
  input_data JSONB,
  output_data JSONB,
  execution_time_ms INTEGER,
  success BOOLEAN DEFAULT true,
  error_message TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc', NOW())
);

-- ================================================================
-- CREATE INDEXES
-- ================================================================

-- user_learning_paths indexes
CREATE INDEX IF NOT EXISTS idx_learning_paths_user_id
  ON user_learning_paths(user_id);
CREATE INDEX IF NOT EXISTS idx_learning_paths_active
  ON user_learning_paths(user_id, is_active);

-- learning_path_items indexes
CREATE INDEX IF NOT EXISTS idx_path_items_path_id
  ON learning_path_items(learning_path_id);
CREATE INDEX IF NOT EXISTS idx_path_items_lesson_id
  ON learning_path_items(lesson_id);
CREATE INDEX IF NOT EXISTS idx_path_items_status
  ON learning_path_items(learning_path_id, status);

-- user_lesson_performance indexes
CREATE INDEX IF NOT EXISTS idx_lesson_performance_user_id
  ON user_lesson_performance(user_id);
CREATE INDEX IF NOT EXISTS idx_lesson_performance_lesson_id
  ON user_lesson_performance(lesson_id);
CREATE INDEX IF NOT EXISTS idx_lesson_performance_weak_areas
  ON user_lesson_performance(user_id, is_weak_area);

-- algorithm_runs indexes
CREATE INDEX IF NOT EXISTS idx_algorithm_runs_user_id
  ON algorithm_runs(user_id);
CREATE INDEX IF NOT EXISTS idx_algorithm_runs_type
  ON algorithm_runs(algorithm_type);

-- ================================================================
-- ENABLE ROW LEVEL SECURITY
-- ================================================================

ALTER TABLE user_learning_paths ENABLE ROW LEVEL SECURITY;
ALTER TABLE learning_path_items ENABLE ROW LEVEL SECURITY;
ALTER TABLE user_lesson_performance ENABLE ROW LEVEL SECURITY;
ALTER TABLE algorithm_runs ENABLE ROW LEVEL SECURITY;

-- ================================================================
-- CREATE RLS POLICIES
-- ================================================================

-- user_learning_paths policies
DROP POLICY IF EXISTS "Users can view own learning paths" ON user_learning_paths;
DROP POLICY IF EXISTS "Users can create learning paths" ON user_learning_paths;
DROP POLICY IF EXISTS "Users can update own learning paths" ON user_learning_paths;
DROP POLICY IF EXISTS "Service role can manage learning paths" ON user_learning_paths;

CREATE POLICY "Users can view own learning paths"
  ON user_learning_paths FOR SELECT
  USING (auth.uid() = user_id);

CREATE POLICY "Users can create learning paths"
  ON user_learning_paths FOR INSERT
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update own learning paths"
  ON user_learning_paths FOR UPDATE
  USING (auth.uid() = user_id);

CREATE POLICY "Service role can manage learning paths"
  ON user_learning_paths FOR ALL
  USING (auth.role() = 'service_role');

-- learning_path_items policies
DROP POLICY IF EXISTS "Users can view own path items" ON learning_path_items;
DROP POLICY IF EXISTS "Users can create path items" ON learning_path_items;
DROP POLICY IF EXISTS "Users can update path items" ON learning_path_items;
DROP POLICY IF EXISTS "Service role can manage path items" ON learning_path_items;

CREATE POLICY "Users can view own path items"
  ON learning_path_items FOR SELECT
  USING (
    learning_path_id IN (
      SELECT id FROM user_learning_paths WHERE user_id = auth.uid()
    )
  );

CREATE POLICY "Users can create path items"
  ON learning_path_items FOR INSERT
  WITH CHECK (
    learning_path_id IN (
      SELECT id FROM user_learning_paths WHERE user_id = auth.uid()
    )
  );

CREATE POLICY "Users can update path items"
  ON learning_path_items FOR UPDATE
  USING (
    learning_path_id IN (
      SELECT id FROM user_learning_paths WHERE user_id = auth.uid()
    )
  );

CREATE POLICY "Service role can manage path items"
  ON learning_path_items FOR ALL
  USING (auth.role() = 'service_role');

-- user_lesson_performance policies
DROP POLICY IF EXISTS "Users can view own lesson performance" ON user_lesson_performance;
DROP POLICY IF EXISTS "Users can create lesson performance" ON user_lesson_performance;
DROP POLICY IF EXISTS "Users can update lesson performance" ON user_lesson_performance;
DROP POLICY IF EXISTS "Service role can manage lesson performance" ON user_lesson_performance;

CREATE POLICY "Users can view own lesson performance"
  ON user_lesson_performance FOR SELECT
  USING (auth.uid() = user_id);

CREATE POLICY "Users can create lesson performance"
  ON user_lesson_performance FOR INSERT
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update lesson performance"
  ON user_lesson_performance FOR UPDATE
  USING (auth.uid() = user_id);

CREATE POLICY "Service role can manage lesson performance"
  ON user_lesson_performance FOR ALL
  USING (auth.role() = 'service_role');

-- algorithm_runs policies
DROP POLICY IF EXISTS "Users can view own algorithm runs" ON algorithm_runs;
DROP POLICY IF EXISTS "Users can create algorithm runs" ON algorithm_runs;
DROP POLICY IF EXISTS "Service role can manage algorithm runs" ON algorithm_runs;

CREATE POLICY "Users can view own algorithm runs"
  ON algorithm_runs FOR SELECT
  USING (auth.uid() = user_id);

CREATE POLICY "Users can create algorithm runs"
  ON algorithm_runs FOR INSERT
  WITH CHECK (auth.uid() = user_id OR auth.role() = 'service_role');

CREATE POLICY "Service role can manage algorithm runs"
  ON algorithm_runs FOR ALL
  USING (auth.role() = 'service_role');

-- ================================================================
-- GRANT PERMISSIONS
-- ================================================================

GRANT ALL ON user_learning_paths TO authenticated;
GRANT ALL ON user_learning_paths TO service_role;

GRANT ALL ON learning_path_items TO authenticated;
GRANT ALL ON learning_path_items TO service_role;

GRANT ALL ON user_lesson_performance TO authenticated;
GRANT ALL ON user_lesson_performance TO service_role;

GRANT ALL ON algorithm_runs TO authenticated;
GRANT ALL ON algorithm_runs TO service_role;

-- ================================================================
-- VERIFY TABLES CREATED
-- ================================================================

SELECT table_name, table_type
FROM information_schema.tables
WHERE table_schema = 'public'
  AND table_name IN (
    'user_learning_paths',
    'learning_path_items',
    'user_lesson_performance',
    'algorithm_runs'
  )
ORDER BY table_name;
