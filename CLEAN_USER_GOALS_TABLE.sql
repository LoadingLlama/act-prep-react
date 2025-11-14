-- Clean user_goals table to match EXACTLY what's in onboarding
-- Removes all fields that aren't shown in the onboarding form

-- Drop columns that aren't in onboarding
ALTER TABLE user_goals DROP COLUMN IF EXISTS daily_study_minutes;
ALTER TABLE user_goals DROP COLUMN IF EXISTS study_days_per_week;
ALTER TABLE user_goals DROP COLUMN IF EXISTS study_hours_per_week;
ALTER TABLE user_goals DROP COLUMN IF EXISTS preferred_study_time;
ALTER TABLE user_goals DROP COLUMN IF EXISTS learning_pace;
ALTER TABLE user_goals DROP COLUMN IF EXISTS reminder_frequency;
ALTER TABLE user_goals DROP COLUMN IF EXISTS weakest_section;
ALTER TABLE user_goals DROP COLUMN IF EXISTS focus_sections;
ALTER TABLE user_goals DROP COLUMN IF EXISTS weak_areas;
ALTER TABLE user_goals DROP COLUMN IF EXISTS grade;
ALTER TABLE user_goals DROP COLUMN IF EXISTS study_experience;

-- Ensure all required onboarding columns exist
ALTER TABLE user_goals ADD COLUMN IF NOT EXISTS target_exam_date DATE;
ALTER TABLE user_goals ADD COLUMN IF NOT EXISTS current_score INTEGER;
ALTER TABLE user_goals ADD COLUMN IF NOT EXISTS target_score INTEGER DEFAULT 28;

-- Add per-day study hours (Week 1)
ALTER TABLE user_goals ADD COLUMN IF NOT EXISTS study_hours JSONB DEFAULT
'{"monday": 0.75, "tuesday": 1, "wednesday": 0, "thursday": 0.75, "friday": 1, "saturday": 2, "sunday": 2}'::jsonb;

-- Add per-day study hours (Week 2) for alternating schedules
ALTER TABLE user_goals ADD COLUMN IF NOT EXISTS study_hours_week2 JSONB DEFAULT
'{"monday": 0.75, "tuesday": 1, "wednesday": 0, "thursday": 0.75, "friday": 1, "saturday": 2, "sunday": 2}'::jsonb;

-- Add alternating weeks flag
ALTER TABLE user_goals ADD COLUMN IF NOT EXISTS use_alternating_weeks BOOLEAN DEFAULT FALSE;

-- Add review day (Weekly Review Day)
ALTER TABLE user_goals ADD COLUMN IF NOT EXISTS review_day TEXT DEFAULT 'sunday';

-- Add mock exam day (Mock Exam Day)
ALTER TABLE user_goals ADD COLUMN IF NOT EXISTS mock_exam_day TEXT DEFAULT 'saturday';

-- Add comments for clarity
COMMENT ON COLUMN user_goals.target_exam_date IS 'Date of the ACT exam';
COMMENT ON COLUMN user_goals.current_score IS 'Current ACT score (1-36), NULL if not taken';
COMMENT ON COLUMN user_goals.target_score IS 'Target ACT score (1-36), default 28';
COMMENT ON COLUMN user_goals.study_hours IS 'Week 1 study hours per day as JSON: {monday: 0.75, tuesday: 1, ...}';
COMMENT ON COLUMN user_goals.study_hours_week2 IS 'Week 2 study hours per day (for alternating schedules)';
COMMENT ON COLUMN user_goals.use_alternating_weeks IS 'Whether to alternate between study_hours and study_hours_week2';
COMMENT ON COLUMN user_goals.review_day IS 'Day of week for weekly review (sunday, monday, ...)';
COMMENT ON COLUMN user_goals.mock_exam_day IS 'Day of week for mock exams (saturday, sunday, ...)';

SELECT '✅ user_goals table cleaned - only onboarding fields remain' as status;

-- Show final structure
SELECT column_name, data_type, is_nullable, column_default
FROM information_schema.columns
WHERE table_name = 'user_goals'
ORDER BY ordinal_position;
