-- Update user_goals table to match onboarding structure
-- This adds per-day study hours and removes fields that aren't in onboarding

-- Add study_hours as JSONB to store per-day hours {monday: 0.75, tuesday: 1, ...}
ALTER TABLE user_goals
ADD COLUMN IF NOT EXISTS study_hours JSONB DEFAULT '{"monday": 0.75, "tuesday": 1, "wednesday": 0, "thursday": 0.75, "friday": 1, "saturday": 2, "sunday": 2}'::jsonb;

-- Add study_hours_week2 for alternating weeks
ALTER TABLE user_goals
ADD COLUMN IF NOT EXISTS study_hours_week2 JSONB DEFAULT '{"monday": 0.75, "tuesday": 1, "wednesday": 0, "thursday": 0.75, "friday": 1, "saturday": 2, "sunday": 2}'::jsonb;

-- Add use_alternating_weeks flag
ALTER TABLE user_goals
ADD COLUMN IF NOT EXISTS use_alternating_weeks BOOLEAN DEFAULT FALSE;

-- Add weakest_section
ALTER TABLE user_goals
ADD COLUMN IF NOT EXISTS weakest_section TEXT;

-- Add comments
COMMENT ON COLUMN user_goals.study_hours IS
'Per-day study hours as JSON object with keys: monday, tuesday, wednesday, thursday, friday, saturday, sunday';

COMMENT ON COLUMN user_goals.study_hours_week2 IS
'Second week study hours for alternating schedule (same structure as study_hours)';

COMMENT ON COLUMN user_goals.use_alternating_weeks IS
'Whether to alternate between study_hours and study_hours_week2 each week';

COMMENT ON COLUMN user_goals.weakest_section IS
'The section the user struggles with most (english, math, reading, science)';

SELECT '✅ user_goals table updated to match onboarding structure' as status;

-- Verify the new columns
SELECT column_name, data_type, is_nullable, column_default
FROM information_schema.columns
WHERE table_name = 'user_goals'
AND column_name IN ('study_hours', 'study_hours_week2', 'use_alternating_weeks', 'weakest_section', 'review_day', 'mock_exam_day')
ORDER BY column_name;
