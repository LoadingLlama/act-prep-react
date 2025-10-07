-- ============================================
-- ADAPTIVE LEARNING SYSTEM - ROLLBACK 001
-- ============================================
-- Description: Safely rollback adaptive learning schema changes
-- Author: ACT Prep Platform Team
-- Date: 2025-10-06
-- Version: 1.0
--
-- WARNING: This will delete all adaptive learning data
-- Original lesson and question data will be preserved
-- ============================================

-- Drop RLS policies first
DROP POLICY IF EXISTS "Users can view own profile" ON user_profiles;
DROP POLICY IF EXISTS "Users can update own profile" ON user_profiles;
DROP POLICY IF EXISTS "Users can insert own profile" ON user_profiles;
DROP POLICY IF EXISTS "Users can view own sessions" ON assessment_sessions;
DROP POLICY IF EXISTS "Users can create own sessions" ON assessment_sessions;
DROP POLICY IF EXISTS "Users can update own sessions" ON assessment_sessions;
DROP POLICY IF EXISTS "Users can view own responses" ON user_responses;
DROP POLICY IF EXISTS "Users can create own responses" ON user_responses;
DROP POLICY IF EXISTS "Users can view own skill assessments" ON user_skill_assessments;
DROP POLICY IF EXISTS "Users can update own skill assessments" ON user_skill_assessments;
DROP POLICY IF EXISTS "Users can insert own skill assessments" ON user_skill_assessments;
DROP POLICY IF EXISTS "Users can view own learning paths" ON learning_paths;
DROP POLICY IF EXISTS "Users can create own learning paths" ON learning_paths;
DROP POLICY IF EXISTS "Users can update own learning paths" ON learning_paths;
DROP POLICY IF EXISTS "Users can view own path items" ON learning_path_items;
DROP POLICY IF EXISTS "Users can manage own path items" ON learning_path_items;
DROP POLICY IF EXISTS "Users can view own snapshots" ON daily_progress_snapshots;
DROP POLICY IF EXISTS "Users can create own snapshots" ON daily_progress_snapshots;
DROP POLICY IF EXISTS "Skills are viewable by everyone" ON skills;
DROP POLICY IF EXISTS "Question skills are viewable by everyone" ON question_skills;

-- Drop triggers
DROP TRIGGER IF EXISTS update_user_profiles_updated_at ON user_profiles;
DROP TRIGGER IF EXISTS update_skills_updated_at ON skills;
DROP TRIGGER IF EXISTS update_skill_assessments_updated_at ON user_skill_assessments;
DROP TRIGGER IF EXISTS update_learning_paths_updated_at ON learning_paths;
DROP TRIGGER IF EXISTS update_questions_updated_at ON diagnostic_test_questions;

-- Drop function
DROP FUNCTION IF EXISTS update_updated_at_column();

-- Drop tables in reverse dependency order
DROP TABLE IF EXISTS daily_progress_snapshots CASCADE;
DROP TABLE IF EXISTS learning_path_items CASCADE;
DROP TABLE IF EXISTS learning_paths CASCADE;
DROP TABLE IF EXISTS user_skill_assessments CASCADE;
DROP TABLE IF EXISTS user_responses CASCADE;
DROP TABLE IF EXISTS assessment_sessions CASCADE;
DROP TABLE IF EXISTS user_profiles CASCADE;
DROP TABLE IF EXISTS question_skills CASCADE;
DROP TABLE IF EXISTS skills CASCADE;

-- Remove columns from diagnostic_test_questions
ALTER TABLE diagnostic_test_questions
  DROP COLUMN IF EXISTS difficulty,
  DROP COLUMN IF EXISTS discrimination,
  DROP COLUMN IF EXISTS guessing,
  DROP COLUMN IF EXISTS exposure_rate,
  DROP COLUMN IF EXISTS last_calibrated,
  DROP COLUMN IF EXISTS is_adaptive,
  DROP COLUMN IF EXISTS time_limit_seconds,
  DROP COLUMN IF EXISTS explanation,
  DROP COLUMN IF EXISTS updated_at;

-- Drop constraints (if they exist independently)
ALTER TABLE diagnostic_test_questions
  DROP CONSTRAINT IF EXISTS chk_difficulty,
  DROP CONSTRAINT IF EXISTS chk_discrimination,
  DROP CONSTRAINT IF EXISTS chk_guessing;

-- Drop indexes
DROP INDEX IF EXISTS idx_questions_adaptive;
DROP INDEX IF EXISTS idx_questions_difficulty;

-- Verification
DO $$
BEGIN
    RAISE NOTICE '========================================';
    RAISE NOTICE 'ROLLBACK COMPLETED SUCCESSFULLY';
    RAISE NOTICE 'All adaptive learning tables removed';
    RAISE NOTICE 'Original data preserved';
    RAISE NOTICE 'Timestamp: %', NOW();
    RAISE NOTICE '========================================';
END $$;
