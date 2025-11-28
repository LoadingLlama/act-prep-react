-- ================================================================
-- FIX diagnostic_test_results.question_id TYPE
-- ================================================================
-- The practice_test_*_questions tables use INTEGER for id, not UUID
-- So diagnostic_test_results.question_id should also be INTEGER
-- ================================================================

-- Step 1: Drop the existing table and recreate with correct type
DROP TABLE IF EXISTS diagnostic_test_results CASCADE;

-- Step 2: Recreate with INTEGER question_id
CREATE TABLE diagnostic_test_results (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  diagnostic_session_id UUID NOT NULL REFERENCES diagnostic_test_sessions(id) ON DELETE CASCADE,
  question_id INTEGER NOT NULL,  -- Changed from UUID to INTEGER
  user_answer TEXT,
  is_correct BOOLEAN NOT NULL,
  time_spent_seconds INTEGER DEFAULT 0,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc', NOW())
);

-- Step 3: Add indexes
CREATE INDEX IF NOT EXISTS idx_diagnostic_results_user
  ON diagnostic_test_results(user_id);

CREATE INDEX IF NOT EXISTS idx_diagnostic_results_session
  ON diagnostic_test_results(diagnostic_session_id);

CREATE INDEX IF NOT EXISTS idx_diagnostic_results_question
  ON diagnostic_test_results(question_id);

-- Step 4: Enable RLS
ALTER TABLE diagnostic_test_results ENABLE ROW LEVEL SECURITY;

-- Step 5: Create RLS policies
DROP POLICY IF EXISTS "Users can view own results" ON diagnostic_test_results;
DROP POLICY IF EXISTS "Users can create results" ON diagnostic_test_results;
DROP POLICY IF EXISTS "Service role can manage results" ON diagnostic_test_results;

CREATE POLICY "Users can view own results"
  ON diagnostic_test_results FOR SELECT
  USING (auth.uid() = user_id);

CREATE POLICY "Users can create results"
  ON diagnostic_test_results FOR INSERT
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Service role can manage results"
  ON diagnostic_test_results FOR ALL
  USING (auth.role() = 'service_role');

-- Step 6: Grant permissions
GRANT ALL ON diagnostic_test_results TO authenticated;
GRANT ALL ON diagnostic_test_results TO service_role;

-- Add comment
COMMENT ON COLUMN diagnostic_test_results.question_id IS
  'INTEGER ID from practice_test_*_questions tables (english/math/reading/science). No FK constraint due to multiple possible tables.';

-- Verify
SELECT column_name, data_type, is_nullable
FROM information_schema.columns
WHERE table_name = 'diagnostic_test_results'
ORDER BY ordinal_position;
