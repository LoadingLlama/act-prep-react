-- ============================================
-- ADAPTIVE LEARNING SYSTEM - MIGRATION 001
-- ============================================
-- Description: Add adaptive testing and personalized learning capabilities
-- Author: ACT Prep Platform Team
-- Date: 2025-10-06
-- Version: 1.0
--
-- IMPORTANT: Before running this migration:
-- 1. Create a full backup via Supabase Dashboard
-- 2. Test in a staging environment first
-- 3. Run during low-traffic period
-- ============================================

-- Enable UUID extension if not already enabled
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- ============================================
-- TABLE 1: SKILLS TAXONOMY
-- ============================================
-- Hierarchical structure of ACT skills
-- Enables granular skill tracking and gap analysis

CREATE TABLE IF NOT EXISTS skills (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  skill_code VARCHAR(50) UNIQUE NOT NULL,
  skill_name VARCHAR(200) NOT NULL,
  section VARCHAR(20) NOT NULL CHECK (section IN ('english', 'math', 'reading', 'science')),
  parent_skill_id UUID REFERENCES skills(id) ON DELETE SET NULL,
  description TEXT,
  difficulty_level INTEGER CHECK (difficulty_level BETWEEN 1 AND 5),
  prerequisite_skill_ids UUID[],
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Indexes for performance
CREATE INDEX IF NOT EXISTS idx_skills_section ON skills(section);
CREATE INDEX IF NOT EXISTS idx_skills_parent ON skills(parent_skill_id);
CREATE INDEX IF NOT EXISTS idx_skills_code ON skills(skill_code);

-- Add comment
COMMENT ON TABLE skills IS 'Hierarchical taxonomy of ACT test skills across all sections';

-- ============================================
-- TABLE 2: QUESTION-SKILL MAPPING
-- ============================================
-- Many-to-many relationship between questions and skills
-- Allows questions to test multiple skills

CREATE TABLE IF NOT EXISTS question_skills (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  question_id UUID NOT NULL REFERENCES diagnostic_test_questions(id) ON DELETE CASCADE,
  skill_id UUID NOT NULL REFERENCES skills(id) ON DELETE CASCADE,
  importance DECIMAL(2,1) DEFAULT 1.0 CHECK (importance BETWEEN 0.1 AND 1.0),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  UNIQUE(question_id, skill_id)
);

-- Indexes
CREATE INDEX IF NOT EXISTS idx_question_skills_question ON question_skills(question_id);
CREATE INDEX IF NOT EXISTS idx_question_skills_skill ON question_skills(skill_id);

COMMENT ON TABLE question_skills IS 'Maps questions to the skills they assess';
COMMENT ON COLUMN question_skills.importance IS 'Weight of this skill for the question (0.1-1.0)';

-- ============================================
-- TABLE 3: ENHANCE EXISTING QUESTIONS TABLE
-- ============================================
-- Add IRT parameters and metadata for adaptive testing

-- Add columns to existing table (safe - won't delete data)
ALTER TABLE diagnostic_test_questions
  ADD COLUMN IF NOT EXISTS difficulty DECIMAL(4,2) DEFAULT 0.0,
  ADD COLUMN IF NOT EXISTS discrimination DECIMAL(3,2) DEFAULT 1.0,
  ADD COLUMN IF NOT EXISTS guessing DECIMAL(3,2) DEFAULT 0.25,
  ADD COLUMN IF NOT EXISTS exposure_rate INTEGER DEFAULT 0,
  ADD COLUMN IF NOT EXISTS last_calibrated TIMESTAMP WITH TIME ZONE,
  ADD COLUMN IF NOT EXISTS is_adaptive BOOLEAN DEFAULT true,
  ADD COLUMN IF NOT EXISTS time_limit_seconds INTEGER DEFAULT 60,
  ADD COLUMN IF NOT EXISTS explanation TEXT,
  ADD COLUMN IF NOT EXISTS updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW();

-- Add constraints
ALTER TABLE diagnostic_test_questions
  ADD CONSTRAINT IF NOT EXISTS chk_difficulty CHECK (difficulty BETWEEN -3.0 AND 3.0),
  ADD CONSTRAINT IF NOT EXISTS chk_discrimination CHECK (discrimination BETWEEN 0.0 AND 3.0),
  ADD CONSTRAINT IF NOT EXISTS chk_guessing CHECK (guessing BETWEEN 0.0 AND 0.5);

-- Index for filtering adaptive questions
CREATE INDEX IF NOT EXISTS idx_questions_adaptive ON diagnostic_test_questions(is_adaptive) WHERE is_adaptive = true;
CREATE INDEX IF NOT EXISTS idx_questions_difficulty ON diagnostic_test_questions(difficulty);

COMMENT ON COLUMN diagnostic_test_questions.difficulty IS 'IRT difficulty parameter (b): -3 to +3';
COMMENT ON COLUMN diagnostic_test_questions.discrimination IS 'IRT discrimination parameter (a): 0 to 3';
COMMENT ON COLUMN diagnostic_test_questions.guessing IS 'IRT guessing parameter (c): 0 to 0.5';
COMMENT ON COLUMN diagnostic_test_questions.exposure_rate IS 'Number of times question has been shown';

-- ============================================
-- TABLE 4: USER PROFILES
-- ============================================
-- Extended user information beyond auth.users

CREATE TABLE IF NOT EXISTS user_profiles (
  id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  display_name VARCHAR(100),
  email VARCHAR(255) UNIQUE,
  target_score INTEGER CHECK (target_score BETWEEN 1 AND 36),
  test_date DATE,
  grade_level VARCHAR(20),
  study_hours_per_week INTEGER,
  preferences JSONB DEFAULT '{}',
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS idx_profiles_email ON user_profiles(email);

COMMENT ON TABLE user_profiles IS 'Extended user profile information for personalization';

-- ============================================
-- TABLE 5: ASSESSMENT SESSIONS
-- ============================================
-- Track each adaptive assessment session

CREATE TABLE IF NOT EXISTS assessment_sessions (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID REFERENCES user_profiles(id) ON DELETE CASCADE,
  section VARCHAR(20) NOT NULL CHECK (section IN ('english', 'math', 'reading', 'science')),
  session_type VARCHAR(50) NOT NULL DEFAULT 'diagnostic',
  started_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  completed_at TIMESTAMP WITH TIME ZONE,
  current_ability_estimate DECIMAL(4,2) DEFAULT 0.0,
  standard_error DECIMAL(4,2) DEFAULT 2.0,
  questions_completed INTEGER DEFAULT 0,
  questions_correct INTEGER DEFAULT 0,
  is_complete BOOLEAN DEFAULT false,
  metadata JSONB DEFAULT '{}',
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Indexes
CREATE INDEX IF NOT EXISTS idx_sessions_user ON assessment_sessions(user_id);
CREATE INDEX IF NOT EXISTS idx_sessions_complete ON assessment_sessions(is_complete);
CREATE INDEX IF NOT EXISTS idx_sessions_started ON assessment_sessions(started_at DESC);

COMMENT ON TABLE assessment_sessions IS 'Individual adaptive assessment sessions';
COMMENT ON COLUMN assessment_sessions.current_ability_estimate IS 'Theta estimate: current ability level';
COMMENT ON COLUMN assessment_sessions.standard_error IS 'Standard error of theta estimate';

-- ============================================
-- TABLE 6: USER RESPONSES
-- ============================================
-- Individual question responses within sessions

CREATE TABLE IF NOT EXISTS user_responses (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  session_id UUID NOT NULL REFERENCES assessment_sessions(id) ON DELETE CASCADE,
  question_id UUID NOT NULL REFERENCES diagnostic_test_questions(id) ON DELETE CASCADE,
  user_id UUID NOT NULL REFERENCES user_profiles(id) ON DELETE CASCADE,
  selected_answer VARCHAR(10),
  correct_answer VARCHAR(10) NOT NULL,
  is_correct BOOLEAN NOT NULL,
  time_spent_seconds INTEGER,
  ability_before DECIMAL(4,2),
  ability_after DECIMAL(4,2),
  question_difficulty DECIMAL(4,2),
  confidence_level INTEGER CHECK (confidence_level BETWEEN 1 AND 5),
  answered_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  flagged BOOLEAN DEFAULT false
);

-- Indexes for common queries
CREATE INDEX IF NOT EXISTS idx_responses_session ON user_responses(session_id);
CREATE INDEX IF NOT EXISTS idx_responses_user ON user_responses(user_id);
CREATE INDEX IF NOT EXISTS idx_responses_question ON user_responses(question_id);
CREATE INDEX IF NOT EXISTS idx_responses_correct ON user_responses(is_correct);
CREATE INDEX IF NOT EXISTS idx_responses_answered ON user_responses(answered_at DESC);

COMMENT ON TABLE user_responses IS 'Individual question responses for analysis and IRT calibration';

-- ============================================
-- TABLE 7: USER SKILL ASSESSMENTS
-- ============================================
-- Track mastery level for each skill per user

CREATE TABLE IF NOT EXISTS user_skill_assessments (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID NOT NULL REFERENCES user_profiles(id) ON DELETE CASCADE,
  skill_id UUID NOT NULL REFERENCES skills(id) ON DELETE CASCADE,
  ability_estimate DECIMAL(4,2) DEFAULT 0.0,
  standard_error DECIMAL(4,2) DEFAULT 2.0,
  mastery_level VARCHAR(20) DEFAULT 'beginner' CHECK (mastery_level IN ('beginner', 'developing', 'proficient', 'advanced', 'expert')),
  questions_attempted INTEGER DEFAULT 0,
  questions_correct INTEGER DEFAULT 0,
  last_practiced TIMESTAMP WITH TIME ZONE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  UNIQUE(user_id, skill_id)
);

-- Indexes
CREATE INDEX IF NOT EXISTS idx_skill_assessments_user ON user_skill_assessments(user_id);
CREATE INDEX IF NOT EXISTS idx_skill_assessments_skill ON user_skill_assessments(skill_id);
CREATE INDEX IF NOT EXISTS idx_skill_assessments_mastery ON user_skill_assessments(mastery_level);
CREATE INDEX IF NOT EXISTS idx_skill_assessments_updated ON user_skill_assessments(updated_at DESC);

COMMENT ON TABLE user_skill_assessments IS 'Per-skill ability estimates for each user';

-- ============================================
-- TABLE 8: LEARNING PATHS
-- ============================================
-- Personalized learning paths for users

CREATE TABLE IF NOT EXISTS learning_paths (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID NOT NULL REFERENCES user_profiles(id) ON DELETE CASCADE,
  path_name VARCHAR(200),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  target_improvement_areas JSONB DEFAULT '[]',
  estimated_completion_hours INTEGER,
  is_active BOOLEAN DEFAULT true,
  completion_percentage INTEGER DEFAULT 0 CHECK (completion_percentage BETWEEN 0 AND 100)
);

CREATE INDEX IF NOT EXISTS idx_paths_user ON learning_paths(user_id);
CREATE INDEX IF NOT EXISTS idx_paths_active ON learning_paths(is_active) WHERE is_active = true;

COMMENT ON TABLE learning_paths IS 'Personalized learning paths generated from skill gaps';

-- ============================================
-- TABLE 9: LEARNING PATH ITEMS
-- ============================================
-- Individual lessons within a learning path

CREATE TABLE IF NOT EXISTS learning_path_items (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  path_id UUID NOT NULL REFERENCES learning_paths(id) ON DELETE CASCADE,
  lesson_key VARCHAR(100) NOT NULL,
  skill_id UUID REFERENCES skills(id) ON DELETE SET NULL,
  sequence_order INTEGER NOT NULL,
  priority VARCHAR(20) DEFAULT 'medium' CHECK (priority IN ('low', 'medium', 'high', 'critical')),
  status VARCHAR(20) DEFAULT 'not_started' CHECK (status IN ('not_started', 'in_progress', 'completed', 'skipped')),
  started_at TIMESTAMP WITH TIME ZONE,
  completed_at TIMESTAMP WITH TIME ZONE,
  time_spent_minutes INTEGER DEFAULT 0,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Indexes
CREATE INDEX IF NOT EXISTS idx_path_items_path ON learning_path_items(path_id);
CREATE INDEX IF NOT EXISTS idx_path_items_status ON learning_path_items(status);
CREATE INDEX IF NOT EXISTS idx_path_items_sequence ON learning_path_items(path_id, sequence_order);

COMMENT ON TABLE learning_path_items IS 'Individual lesson items within personalized learning paths';

-- ============================================
-- TABLE 10: PROGRESS SNAPSHOTS
-- ============================================
-- Daily progress tracking for analytics

CREATE TABLE IF NOT EXISTS daily_progress_snapshots (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID NOT NULL REFERENCES user_profiles(id) ON DELETE CASCADE,
  snapshot_date DATE NOT NULL,
  section VARCHAR(20) CHECK (section IN ('english', 'math', 'reading', 'science', 'overall')),
  estimated_score INTEGER CHECK (estimated_score BETWEEN 1 AND 36),
  questions_practiced INTEGER DEFAULT 0,
  time_spent_minutes INTEGER DEFAULT 0,
  skills_improved INTEGER DEFAULT 0,
  lessons_completed INTEGER DEFAULT 0,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  UNIQUE(user_id, snapshot_date, section)
);

-- Indexes
CREATE INDEX IF NOT EXISTS idx_snapshots_user_date ON daily_progress_snapshots(user_id, snapshot_date DESC);
CREATE INDEX IF NOT EXISTS idx_snapshots_section ON daily_progress_snapshots(section);

COMMENT ON TABLE daily_progress_snapshots IS 'Daily snapshots of user progress for trend analysis';

-- ============================================
-- FUNCTIONS & TRIGGERS
-- ============================================

-- Function to update updated_at timestamp
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = NOW();
    RETURN NEW;
END;
$$ language 'plpgsql';

-- Triggers for updated_at
CREATE TRIGGER update_user_profiles_updated_at BEFORE UPDATE ON user_profiles
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_skills_updated_at BEFORE UPDATE ON skills
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_skill_assessments_updated_at BEFORE UPDATE ON user_skill_assessments
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_learning_paths_updated_at BEFORE UPDATE ON learning_paths
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_questions_updated_at BEFORE UPDATE ON diagnostic_test_questions
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

-- ============================================
-- ROW LEVEL SECURITY (RLS)
-- ============================================

-- Enable RLS on all user-specific tables
ALTER TABLE user_profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE assessment_sessions ENABLE ROW LEVEL SECURITY;
ALTER TABLE user_responses ENABLE ROW LEVEL SECURITY;
ALTER TABLE user_skill_assessments ENABLE ROW LEVEL SECURITY;
ALTER TABLE learning_paths ENABLE ROW LEVEL SECURITY;
ALTER TABLE learning_path_items ENABLE ROW LEVEL SECURITY;
ALTER TABLE daily_progress_snapshots ENABLE ROW LEVEL SECURITY;

-- Policies for user_profiles
CREATE POLICY "Users can view own profile" ON user_profiles
    FOR SELECT USING (auth.uid() = id);

CREATE POLICY "Users can update own profile" ON user_profiles
    FOR UPDATE USING (auth.uid() = id);

CREATE POLICY "Users can insert own profile" ON user_profiles
    FOR INSERT WITH CHECK (auth.uid() = id);

-- Policies for assessment_sessions
CREATE POLICY "Users can view own sessions" ON assessment_sessions
    FOR SELECT USING (auth.uid() = user_id);

CREATE POLICY "Users can create own sessions" ON assessment_sessions
    FOR INSERT WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update own sessions" ON assessment_sessions
    FOR UPDATE USING (auth.uid() = user_id);

-- Policies for user_responses
CREATE POLICY "Users can view own responses" ON user_responses
    FOR SELECT USING (auth.uid() = user_id);

CREATE POLICY "Users can create own responses" ON user_responses
    FOR INSERT WITH CHECK (auth.uid() = user_id);

-- Policies for user_skill_assessments
CREATE POLICY "Users can view own skill assessments" ON user_skill_assessments
    FOR SELECT USING (auth.uid() = user_id);

CREATE POLICY "Users can update own skill assessments" ON user_skill_assessments
    FOR UPDATE USING (auth.uid() = user_id);

CREATE POLICY "Users can insert own skill assessments" ON user_skill_assessments
    FOR INSERT WITH CHECK (auth.uid() = user_id);

-- Policies for learning_paths
CREATE POLICY "Users can view own learning paths" ON learning_paths
    FOR SELECT USING (auth.uid() = user_id);

CREATE POLICY "Users can create own learning paths" ON learning_paths
    FOR INSERT WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update own learning paths" ON learning_paths
    FOR UPDATE USING (auth.uid() = user_id);

-- Policies for learning_path_items (through path ownership)
CREATE POLICY "Users can view own path items" ON learning_path_items
    FOR SELECT USING (
        EXISTS (
            SELECT 1 FROM learning_paths
            WHERE learning_paths.id = learning_path_items.path_id
            AND learning_paths.user_id = auth.uid()
        )
    );

CREATE POLICY "Users can manage own path items" ON learning_path_items
    FOR ALL USING (
        EXISTS (
            SELECT 1 FROM learning_paths
            WHERE learning_paths.id = learning_path_items.path_id
            AND learning_paths.user_id = auth.uid()
        )
    );

-- Policies for progress snapshots
CREATE POLICY "Users can view own snapshots" ON daily_progress_snapshots
    FOR SELECT USING (auth.uid() = user_id);

CREATE POLICY "Users can create own snapshots" ON daily_progress_snapshots
    FOR INSERT WITH CHECK (auth.uid() = user_id);

-- Public read access to skills and question_skills
ALTER TABLE skills ENABLE ROW LEVEL SECURITY;
ALTER TABLE question_skills ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Skills are viewable by everyone" ON skills
    FOR SELECT USING (true);

CREATE POLICY "Question skills are viewable by everyone" ON question_skills
    FOR SELECT USING (true);

-- ============================================
-- VERIFICATION QUERIES
-- ============================================

-- Count tables created
DO $$
DECLARE
    table_count INTEGER;
BEGIN
    SELECT COUNT(*) INTO table_count
    FROM information_schema.tables
    WHERE table_schema = 'public'
    AND table_name IN (
        'skills',
        'question_skills',
        'user_profiles',
        'assessment_sessions',
        'user_responses',
        'user_skill_assessments',
        'learning_paths',
        'learning_path_items',
        'daily_progress_snapshots'
    );

    RAISE NOTICE 'Created % new tables for adaptive learning system', table_count;
END $$;

-- Verify columns added to diagnostic_test_questions
DO $$
DECLARE
    column_count INTEGER;
BEGIN
    SELECT COUNT(*) INTO column_count
    FROM information_schema.columns
    WHERE table_name = 'diagnostic_test_questions'
    AND column_name IN ('difficulty', 'discrimination', 'guessing', 'explanation');

    RAISE NOTICE 'Added % IRT columns to diagnostic_test_questions', column_count;
END $$;

-- ============================================
-- MIGRATION COMPLETE
-- ============================================

-- Log migration completion
DO $$
BEGIN
    RAISE NOTICE '========================================';
    RAISE NOTICE 'MIGRATION 001 COMPLETED SUCCESSFULLY';
    RAISE NOTICE 'Adaptive Learning Schema Deployed';
    RAISE NOTICE 'Timestamp: %', NOW();
    RAISE NOTICE '========================================';
END $$;
