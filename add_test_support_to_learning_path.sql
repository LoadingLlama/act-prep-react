-- Add support for practice tests in learning path items

-- Add columns for test support
ALTER TABLE learning_path_items
ADD COLUMN IF NOT EXISTS item_type TEXT DEFAULT 'lesson',
ADD COLUMN IF NOT EXISTS item_metadata JSONB DEFAULT NULL;

-- Update existing rows to have item_type = 'lesson'
UPDATE learning_path_items
SET item_type = 'lesson'
WHERE item_type IS NULL;

-- Add comment explaining the columns
COMMENT ON COLUMN learning_path_items.item_type IS 'Type of item: "lesson" or "test"';
COMMENT ON COLUMN learning_path_items.item_metadata IS 'JSON metadata for tests: {test_number, section, title}';

-- Make lesson_id nullable (since tests don't have lesson_id)
ALTER TABLE learning_path_items
ALTER COLUMN lesson_id DROP NOT NULL;

SELECT '✅ Added test support to learning_path_items table' as status;
