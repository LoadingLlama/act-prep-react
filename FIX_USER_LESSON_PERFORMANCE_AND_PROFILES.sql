-- ================================================================
-- FIX user_lesson_performance, user_goals, AND profiles TABLES
-- ================================================================
-- Fixes:
-- 1. Create user_lesson_performance table if it doesn't exist
-- 2. Create user_goals table if it doesn't exist (editable goals)
-- 3. Add proper RLS policies to allow authenticated users access
-- 4. Add diagnostic_completed column to profiles if missing
-- 5. Fix RLS policies on profiles for updates
-- ================================================================

-- ================================================================
-- PART 1: Fix user_lesson_performance table
-- ================================================================

-- Create table if it doesn't exist
CREATE TABLE IF NOT EXISTS user_lesson_performance (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  lesson_id UUID NOT NULL,
  is_weak_area BOOLEAN DEFAULT false,
  priority_level INTEGER DEFAULT 3,
  diagnostic_questions INTEGER DEFAULT 0,
  diagnostic_correct INTEGER DEFAULT 0,
  practice_questions INTEGER DEFAULT 0,
  practice_correct INTEGER DEFAULT 0,
  last_practiced_at TIMESTAMP WITH TIME ZONE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  UNIQUE(user_id, lesson_id)
);

-- Enable RLS
ALTER TABLE user_lesson_performance ENABLE ROW LEVEL SECURITY;

-- Drop existing policies if any
DROP POLICY IF EXISTS "Users can view own lesson performance" ON user_lesson_performance;
DROP POLICY IF EXISTS "Users can insert own lesson performance" ON user_lesson_performance;
DROP POLICY IF EXISTS "Users can update own lesson performance" ON user_lesson_performance;
DROP POLICY IF EXISTS "Users can delete own lesson performance" ON user_lesson_performance;

-- Create RLS policies for authenticated users
CREATE POLICY "Users can view own lesson performance"
  ON user_lesson_performance
  FOR SELECT
  TO authenticated
  USING (auth.uid() = user_id);

CREATE POLICY "Users can insert own lesson performance"
  ON user_lesson_performance
  FOR INSERT
  TO authenticated
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update own lesson performance"
  ON user_lesson_performance
  FOR UPDATE
  TO authenticated
  USING (auth.uid() = user_id)
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can delete own lesson performance"
  ON user_lesson_performance
  FOR DELETE
  TO authenticated
  USING (auth.uid() = user_id);

-- Create index for faster lookups
CREATE INDEX IF NOT EXISTS idx_user_lesson_performance_user_id
  ON user_lesson_performance(user_id);

CREATE INDEX IF NOT EXISTS idx_user_lesson_performance_lesson_id
  ON user_lesson_performance(lesson_id);

CREATE INDEX IF NOT EXISTS idx_user_lesson_performance_is_weak
  ON user_lesson_performance(user_id, is_weak_area);

SELECT '✅ Part 1: user_lesson_performance table created/updated with RLS policies' as status;

-- ================================================================
-- PART 2: Create/Fix user_goals table (editable by user)
-- ================================================================

-- Create table if it doesn't exist
CREATE TABLE IF NOT EXISTS user_goals (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL UNIQUE REFERENCES auth.users(id) ON DELETE CASCADE,
  target_exam_date DATE,
  current_score INTEGER,
  target_score INTEGER,
  daily_study_minutes INTEGER DEFAULT 30,
  study_days_per_week INTEGER DEFAULT 5,
  study_hours_per_week INTEGER,
  preferred_study_time TEXT,
  focus_sections TEXT[],
  weak_areas TEXT[],
  learning_pace TEXT DEFAULT 'moderate',
  reminder_frequency TEXT DEFAULT 'daily',
  grade TEXT,
  study_experience TEXT,
  review_day TEXT,
  mock_exam_day TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Enable RLS
ALTER TABLE user_goals ENABLE ROW LEVEL SECURITY;

-- Drop existing policies if any
DROP POLICY IF EXISTS "Users can view own goals" ON user_goals;
DROP POLICY IF EXISTS "Users can insert own goals" ON user_goals;
DROP POLICY IF EXISTS "Users can update own goals" ON user_goals;
DROP POLICY IF EXISTS "Users can delete own goals" ON user_goals;

-- Create RLS policies for authenticated users
CREATE POLICY "Users can view own goals"
  ON user_goals
  FOR SELECT
  TO authenticated
  USING (auth.uid() = user_id);

CREATE POLICY "Users can insert own goals"
  ON user_goals
  FOR INSERT
  TO authenticated
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update own goals"
  ON user_goals
  FOR UPDATE
  TO authenticated
  USING (auth.uid() = user_id)
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can delete own goals"
  ON user_goals
  FOR DELETE
  TO authenticated
  USING (auth.uid() = user_id);

-- Create index for faster lookups
CREATE INDEX IF NOT EXISTS idx_user_goals_user_id
  ON user_goals(user_id);

SELECT '✅ Part 2: user_goals table created/updated with RLS policies' as status;

-- ================================================================
-- PART 3: Fix profiles table
-- ================================================================

-- Add diagnostic_completed column if it doesn't exist
DO $$
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM information_schema.columns
    WHERE table_name = 'profiles'
    AND column_name = 'diagnostic_completed'
  ) THEN
    ALTER TABLE profiles ADD COLUMN diagnostic_completed BOOLEAN DEFAULT false;
  END IF;
END $$;

-- Add diagnostic_completed_at column if it doesn't exist
DO $$
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM information_schema.columns
    WHERE table_name = 'profiles'
    AND column_name = 'diagnostic_completed_at'
  ) THEN
    ALTER TABLE profiles ADD COLUMN diagnostic_completed_at TIMESTAMP WITH TIME ZONE;
  END IF;
END $$;

-- Ensure RLS is enabled on profiles
ALTER TABLE profiles ENABLE ROW LEVEL SECURITY;

-- Drop and recreate update policy for profiles
DROP POLICY IF EXISTS "Users can update own profile" ON profiles;

CREATE POLICY "Users can update own profile"
  ON profiles
  FOR UPDATE
  TO authenticated
  USING (auth.uid() = id)
  WITH CHECK (auth.uid() = id);

-- Make sure SELECT policy exists too
DROP POLICY IF EXISTS "Users can view own profile" ON profiles;

CREATE POLICY "Users can view own profile"
  ON profiles
  FOR SELECT
  TO authenticated
  USING (auth.uid() = id);

-- Make sure INSERT policy exists for new users
DROP POLICY IF EXISTS "Users can insert own profile" ON profiles;

CREATE POLICY "Users can insert own profile"
  ON profiles
  FOR INSERT
  TO authenticated
  WITH CHECK (auth.uid() = id);

SELECT '✅ Part 3: profiles table updated with diagnostic_completed column and RLS policies' as status;

-- ================================================================
-- VERIFICATION
-- ================================================================

-- Check user_lesson_performance table
SELECT
  'user_lesson_performance' as table_name,
  EXISTS (
    SELECT FROM information_schema.tables
    WHERE table_name = 'user_lesson_performance'
  ) as exists,
  (SELECT relrowsecurity FROM pg_class WHERE relname = 'user_lesson_performance') as rls_enabled;

-- Check user_goals table
SELECT
  'user_goals' as table_name,
  EXISTS (
    SELECT FROM information_schema.tables
    WHERE table_name = 'user_goals'
  ) as exists,
  (SELECT relrowsecurity FROM pg_class WHERE relname = 'user_goals') as rls_enabled;

-- Check profiles columns
SELECT
  'profiles columns' as check_type,
  column_name,
  data_type,
  is_nullable
FROM information_schema.columns
WHERE table_name = 'profiles'
AND column_name IN ('diagnostic_completed', 'diagnostic_completed_at', 'updated_at')
ORDER BY column_name;

-- Check RLS policies on user_lesson_performance
SELECT
  'user_lesson_performance policies' as table_name,
  policyname,
  cmd as command
FROM pg_policies
WHERE tablename = 'user_lesson_performance'
ORDER BY policyname;

-- Check RLS policies on user_goals
SELECT
  'user_goals policies' as table_name,
  policyname,
  cmd as command
FROM pg_policies
WHERE tablename = 'user_goals'
ORDER BY policyname;

-- Check RLS policies on profiles
SELECT
  'profiles policies' as table_name,
  policyname,
  cmd as command
FROM pg_policies
WHERE tablename = 'profiles'
ORDER BY policyname;

SELECT '✅ ✅ ✅ ALL FIXES COMPLETE! user_goals is now editable from Settings page.' as final_status;
