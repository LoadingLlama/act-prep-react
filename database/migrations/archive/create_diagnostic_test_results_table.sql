-- Create diagnostic_test_results table
CREATE TABLE IF NOT EXISTS public.diagnostic_test_results (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  diagnostic_session_id UUID NOT NULL REFERENCES diagnostic_test_sessions(id) ON DELETE CASCADE,
  question_id UUID NOT NULL,
  user_answer TEXT,
  is_correct BOOLEAN NOT NULL,
  time_spent_seconds INTEGER DEFAULT 0,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc', NOW())
);

-- Create indexes for better query performance
CREATE INDEX IF NOT EXISTS idx_diagnostic_test_results_user_id ON diagnostic_test_results(user_id);
CREATE INDEX IF NOT EXISTS idx_diagnostic_test_results_session_id ON diagnostic_test_results(diagnostic_session_id);
CREATE INDEX IF NOT EXISTS idx_diagnostic_test_results_question_id ON diagnostic_test_results(question_id);

-- Enable Row Level Security
ALTER TABLE diagnostic_test_results ENABLE ROW LEVEL SECURITY;

-- Create RLS policies
CREATE POLICY "Users can view their own diagnostic test results"
  ON diagnostic_test_results FOR SELECT
  USING (auth.uid() = user_id);

CREATE POLICY "Users can insert their own diagnostic test results"
  ON diagnostic_test_results FOR INSERT
  WITH CHECK (auth.uid() = user_id);

-- Grant permissions
GRANT ALL ON diagnostic_test_results TO authenticated;
GRANT ALL ON diagnostic_test_results TO service_role;

-- Add comment
COMMENT ON TABLE diagnostic_test_results IS 'Stores individual question answers from diagnostic test attempts';
