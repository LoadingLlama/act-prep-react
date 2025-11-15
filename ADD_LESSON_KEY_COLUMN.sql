-- Add lesson_key column to learning_path_items table
-- This column stores the lessonStructure ID (e.g., "getting-started", "sentence-structure")
-- since we're using lessonStructure data file instead of database lessons table

ALTER TABLE learning_path_items
ADD COLUMN IF NOT EXISTS lesson_key TEXT;

-- Add comment to explain the column
COMMENT ON COLUMN learning_path_items.lesson_key IS
'Lesson identifier from lessonStructure data file (e.g., "getting-started", "sentence-structure"). Used instead of lesson_id UUID for lessons from data file.';

-- Create index for faster lookups
CREATE INDEX IF NOT EXISTS idx_learning_path_items_lesson_key
ON learning_path_items(lesson_key);

SELECT '✅ lesson_key column added to learning_path_items' as status;

-- Verify the column exists
SELECT column_name, data_type, is_nullable
FROM information_schema.columns
WHERE table_name = 'learning_path_items'
AND column_name = 'lesson_key';
