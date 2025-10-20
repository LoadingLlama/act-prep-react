-- ============================================================================
-- Add JSON Migration Tracking Columns
-- ============================================================================
-- This migration adds columns to track the migration status of lessons
-- from HTML content to component-based JSON format.
--
-- Run this migration BEFORE using the migrate-lessons.js script
-- ============================================================================

-- Add content_json column to store the structured lesson data
ALTER TABLE lessons
ADD COLUMN IF NOT EXISTS content_json JSONB DEFAULT NULL;

-- Add migration tracking columns
ALTER TABLE lessons
ADD COLUMN IF NOT EXISTS migrated_to_json BOOLEAN DEFAULT FALSE;

ALTER TABLE lessons
ADD COLUMN IF NOT EXISTS migration_date TIMESTAMP WITH TIME ZONE DEFAULT NULL;

-- Add index for faster querying of migrated/unmigrated lessons
CREATE INDEX IF NOT EXISTS idx_lessons_migrated ON lessons(migrated_to_json);

-- Add index for JSONB content for faster queries
CREATE INDEX IF NOT EXISTS idx_lessons_content_json ON lessons USING GIN (content_json);

-- Add comment for documentation
COMMENT ON COLUMN lessons.content_json IS 'Structured JSON representation of lesson content for component-based rendering';
COMMENT ON COLUMN lessons.migrated_to_json IS 'Indicates whether the lesson has been migrated from HTML to JSON format';
COMMENT ON COLUMN lessons.migration_date IS 'Timestamp when the lesson was migrated to JSON format';

-- ============================================================================
-- VERIFICATION QUERY
-- ============================================================================
-- Run this to verify the migration worked:
--
-- SELECT
--   column_name,
--   data_type,
--   is_nullable,
--   column_default
-- FROM information_schema.columns
-- WHERE table_name = 'lessons'
--   AND column_name IN ('content_json', 'migrated_to_json', 'migration_date')
-- ORDER BY column_name;
-- ============================================================================
