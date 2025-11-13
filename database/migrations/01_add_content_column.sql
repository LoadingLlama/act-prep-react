-- ================================================================
-- ADD MISSING CONTENT COLUMN TO LESSONS TABLE
-- ================================================================
-- This adds the content column that should exist but is missing
-- Run this FIRST before restoring content
-- ================================================================

-- Add the content column if it doesn't exist
DO $$
BEGIN
  IF NOT EXISTS (
    SELECT 1
    FROM information_schema.columns
    WHERE table_name = 'lessons'
    AND column_name = 'content'
  ) THEN
    ALTER TABLE lessons ADD COLUMN content TEXT;
    RAISE NOTICE 'Added content column to lessons table';
  ELSE
    RAISE NOTICE 'Content column already exists';
  END IF;
END $$;

-- Verify the column was added
SELECT column_name, data_type
FROM information_schema.columns
WHERE table_name = 'lessons'
ORDER BY ordinal_position;
