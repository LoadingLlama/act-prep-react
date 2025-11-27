-- SQL function to efficiently get practice question counts grouped by lesson_key
-- This aggregates counts in the database instead of fetching all rows
-- Run this in your Supabase SQL editor

CREATE OR REPLACE FUNCTION get_practice_question_counts()
RETURNS TABLE (lesson_key text, count bigint)
LANGUAGE sql
STABLE
AS $$
  SELECT
    l.lesson_key,
    COUNT(pq.id)::bigint as count
  FROM lessons l
  LEFT JOIN practice_questions pq ON pq.lesson_id = l.id
  GROUP BY l.lesson_key
  HAVING COUNT(pq.id) > 0
  ORDER BY l.lesson_key;
$$;

-- Grant execute permission to authenticated users
GRANT EXECUTE ON FUNCTION get_practice_question_counts() TO authenticated;
GRANT EXECUTE ON FUNCTION get_practice_question_counts() TO anon;
