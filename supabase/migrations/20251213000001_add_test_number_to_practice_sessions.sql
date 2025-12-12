-- Add test_number column to practice_test_sessions table
-- This tracks which practice test (1-6) was taken
ALTER TABLE practice_test_sessions
ADD COLUMN IF NOT EXISTS test_number INTEGER;

-- Add index for better query performance
CREATE INDEX IF NOT EXISTS idx_practice_sessions_test_number
ON practice_test_sessions(user_id, test_number);

-- Add comment for documentation
COMMENT ON COLUMN practice_test_sessions.test_number IS 'Practice test number (2-7 in DB, displayed as 1-6 to users)';
