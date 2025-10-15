-- Fix quizzes table foreign key constraint
-- Run this in Supabase SQL Editor

-- Step 1: Drop the old constraint pointing to lessons-backup
ALTER TABLE quizzes
DROP CONSTRAINT IF EXISTS quizzes_lesson_id_fkey;

-- Step 2: Add new constraint pointing to lesson_metadata
ALTER TABLE quizzes
ADD CONSTRAINT quizzes_lesson_id_fkey
FOREIGN KEY (lesson_id)
REFERENCES lesson_metadata(id)
ON DELETE CASCADE;

-- Verify the constraint was updated
SELECT
    tc.table_name,
    tc.constraint_name,
    tc.constraint_type,
    kcu.column_name,
    ccu.table_name AS foreign_table_name,
    ccu.column_name AS foreign_column_name
FROM information_schema.table_constraints AS tc
JOIN information_schema.key_column_usage AS kcu
  ON tc.constraint_name = kcu.constraint_name
JOIN information_schema.constraint_column_usage AS ccu
  ON ccu.constraint_name = tc.constraint_name
WHERE tc.table_name = 'quizzes'
  AND tc.constraint_type = 'FOREIGN KEY';
