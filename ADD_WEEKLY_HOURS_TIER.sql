-- Add weekly_hours_tier column to user_goals table
-- This allows users to select their target weekly study commitment

ALTER TABLE user_goals
ADD COLUMN IF NOT EXISTS weekly_hours_tier TEXT DEFAULT 'moderate';

-- Add comment to explain the column
COMMENT ON COLUMN user_goals.weekly_hours_tier IS
'User selected weekly study hour commitment tier: light (1-5 hours), moderate (5-10 hours), intensive (10-15 hours), extreme (15+ hours)';

-- Add check constraint to ensure valid values
ALTER TABLE user_goals
DROP CONSTRAINT IF EXISTS weekly_hours_tier_check;

ALTER TABLE user_goals
ADD CONSTRAINT weekly_hours_tier_check
CHECK (weekly_hours_tier IN ('light', 'moderate', 'intensive', 'extreme'));

SELECT '✅ weekly_hours_tier column added to user_goals' as status;

-- Verify the column exists
SELECT column_name, data_type, is_nullable, column_default
FROM information_schema.columns
WHERE table_name = 'user_goals'
AND column_name = 'weekly_hours_tier';
