-- Add duration column to lessons table
-- Run this in Supabase SQL Editor: https://supabase.com/dashboard/project/rabavobdklnwvwsldbix/sql/new

ALTER TABLE lessons
ADD COLUMN IF NOT EXISTS duration TEXT DEFAULT '5 min';

-- Verify the column was added
SELECT column_name, data_type, column_default
FROM information_schema.columns
WHERE table_name = 'lessons' AND column_name = 'duration';
