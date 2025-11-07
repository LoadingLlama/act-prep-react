-- Add user info columns to lesson_comments table
ALTER TABLE lesson_comments
ADD COLUMN IF NOT EXISTS user_email TEXT,
ADD COLUMN IF NOT EXISTS user_name TEXT;

-- Update existing comments to populate user info (if any exist)
-- This will need to be done manually or via a script since we can't join auth.users directly
