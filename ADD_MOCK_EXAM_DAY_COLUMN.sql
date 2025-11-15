-- Add review_day and mock_exam_day columns to user_goals table
-- These columns store the preferred days of the week for review sessions and mock exams

-- Add review_day column
ALTER TABLE user_goals
ADD COLUMN IF NOT EXISTS review_day TEXT DEFAULT 'sunday';

-- Add mock_exam_day column
ALTER TABLE user_goals
ADD COLUMN IF NOT EXISTS mock_exam_day TEXT DEFAULT 'saturday';

-- Add comments to explain the columns
COMMENT ON COLUMN user_goals.review_day IS
'Preferred day of the week for review sessions (e.g., sunday, monday, etc.)';

COMMENT ON COLUMN user_goals.mock_exam_day IS
'Preferred day of the week for mock exams (e.g., saturday, sunday, etc.)';

SELECT '✅ review_day and mock_exam_day columns added to user_goals' as status;

-- Verify the columns exist
SELECT column_name, data_type, is_nullable, column_default
FROM information_schema.columns
WHERE table_name = 'user_goals'
AND column_name IN ('review_day', 'mock_exam_day')
ORDER BY column_name;
