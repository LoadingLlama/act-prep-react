-- ============================================
-- ADD is_practice COLUMN TO learning_path_items
-- ============================================
-- Description: Add support for practice activities in learning paths
-- Date: 2025-11-15
-- ============================================

-- Add is_practice column to learning_path_items table
ALTER TABLE learning_path_items
  ADD COLUMN IF NOT EXISTS is_practice BOOLEAN DEFAULT false;

-- Add index for filtering practice items
CREATE INDEX IF NOT EXISTS idx_path_items_practice
  ON learning_path_items(is_practice)
  WHERE is_practice = true;

-- Add comment
COMMENT ON COLUMN learning_path_items.is_practice IS 'True if this is a practice activity for a previously completed lesson, false if new lesson content';

-- Verify the column was added
SELECT column_name, data_type, column_default
FROM information_schema.columns
WHERE table_name = 'learning_path_items' AND column_name = 'is_practice';
