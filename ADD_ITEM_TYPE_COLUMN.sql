-- Add item_type column to learning_path_items table
-- This column distinguishes between regular lessons, review days, and mock exams

ALTER TABLE learning_path_items 
ADD COLUMN IF NOT EXISTS item_type TEXT;

-- Add comment to explain the column
COMMENT ON COLUMN learning_path_items.item_type IS 
'Type of learning path item: NULL for regular lessons, "review" for review days, "mock_exam" for mock exams';

-- Create index for filtering by type
CREATE INDEX IF NOT EXISTS idx_learning_path_items_type 
ON learning_path_items(item_type);

SELECT '✅ item_type column added to learning_path_items' as status;

-- Verify the column exists
SELECT column_name, data_type, is_nullable
FROM information_schema.columns
WHERE table_name = 'learning_path_items'
AND column_name = 'item_type';
