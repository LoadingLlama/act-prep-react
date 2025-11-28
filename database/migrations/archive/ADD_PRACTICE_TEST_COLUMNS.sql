-- Add practice test columns to learning_path_items table
-- Run this in Supabase SQL Editor

ALTER TABLE learning_path_items
ADD COLUMN IF NOT EXISTS practice_test_number INTEGER,
ADD COLUMN IF NOT EXISTS practice_test_section TEXT;

COMMENT ON COLUMN learning_path_items.practice_test_number IS
'Test number for practice test items (1, 2, 3, etc.)';

COMMENT ON COLUMN learning_path_items.practice_test_section IS
'Section for practice test items (english, math, reading, science, or null for full test)';

-- Create index for faster queries
CREATE INDEX IF NOT EXISTS idx_learning_path_items_practice_test
ON learning_path_items(practice_test_number, practice_test_section)
WHERE item_type = 'practice_test';
