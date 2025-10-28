-- Enable RLS on lesson_examples table if not already enabled
ALTER TABLE lesson_examples ENABLE ROW LEVEL SECURITY;

-- Drop existing policy if it exists
DROP POLICY IF EXISTS "Enable read access for all users" ON lesson_examples;

-- Create policy to allow public read access
CREATE POLICY "Enable read access for all users"
ON lesson_examples
FOR SELECT
TO public
USING (true);

-- Verify the policy was created
SELECT schemaname, tablename, policyname, permissive, roles, cmd, qual
FROM pg_policies
WHERE tablename = 'lesson_examples';
