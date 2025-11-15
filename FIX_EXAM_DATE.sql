-- Fix exam date from Dec 12 to Dec 11
-- Run this in Supabase SQL Editor to correct the stored exam date

-- Update user_goals table
UPDATE user_goals
SET target_exam_date = '2025-12-11'
WHERE target_exam_date = '2025-12-12';

-- Update learning_path_items table (exam_day items)
UPDATE learning_path_items
SET scheduled_date = '2025-12-11'
WHERE item_type = 'exam_day'
AND scheduled_date = '2025-12-12';

-- Verify the changes
SELECT 'user_goals' as table_name, target_exam_date as exam_date
FROM user_goals
UNION ALL
SELECT 'learning_path_items', scheduled_date
FROM learning_path_items
WHERE item_type = 'exam_day';
