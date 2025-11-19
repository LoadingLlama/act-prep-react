-- Add time tracking columns to diagnostic_test_results table
ALTER TABLE diagnostic_test_results
ADD COLUMN IF NOT EXISTS time_spent INTEGER DEFAULT 0,
ADD COLUMN IF NOT EXISTS started_at TIMESTAMP WITH TIME ZONE,
ADD COLUMN IF NOT EXISTS completed_at TIMESTAMP WITH TIME ZONE;

-- Add comment explaining the columns
COMMENT ON COLUMN diagnostic_test_results.time_spent IS 'Time spent on question in milliseconds';
COMMENT ON COLUMN diagnostic_test_results.started_at IS 'Timestamp when user started viewing the question';
COMMENT ON COLUMN diagnostic_test_results.completed_at IS 'Timestamp when user submitted the answer';

-- Create index for faster queries on time_spent
CREATE INDEX IF NOT EXISTS idx_diagnostic_results_time_spent ON diagnostic_test_results(time_spent);
