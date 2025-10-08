-- Add UPDATE policy for quizzes table
DROP POLICY IF EXISTS "Allow quiz updates" ON quizzes;
CREATE POLICY "Allow quiz updates" ON quizzes FOR UPDATE USING (true) WITH CHECK (true);

DROP POLICY IF EXISTS "Allow quiz question updates" ON quiz_questions;
CREATE POLICY "Allow quiz question updates" ON quiz_questions FOR UPDATE USING (true) WITH CHECK (true);

DROP POLICY IF EXISTS "Allow quiz option updates" ON quiz_options;
CREATE POLICY "Allow quiz option updates" ON quiz_options FOR UPDATE USING (true) WITH CHECK (true);
