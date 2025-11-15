-- ================================================================
-- CHECK EXISTING DIAGNOSTIC DATA AND GENERATE LEARNING PATH
-- ================================================================
-- Run this in Supabase SQL Editor to see what data exists
-- and manually create a learning path from diagnostic results
-- ================================================================

-- 1. Check for diagnostic sessions
SELECT 'DIAGNOSTIC SESSIONS' as check_type, count(*) as count FROM diagnostic_test_sessions;
SELECT * FROM diagnostic_test_sessions ORDER BY created_at DESC LIMIT 5;

-- 2. Check for diagnostic results
SELECT 'DIAGNOSTIC RESULTS' as check_type, count(*) as count FROM diagnostic_test_results;

-- 3. Check for diagnostic analysis
SELECT 'DIAGNOSTIC ANALYSIS' as check_type, count(*) as count FROM diagnostic_analysis;
SELECT * FROM diagnostic_analysis ORDER BY created_at DESC LIMIT 5;

-- 4. Check for learning paths
SELECT 'LEARNING PATHS' as check_type, count(*) as count FROM user_learning_paths;
SELECT * FROM user_learning_paths ORDER BY created_at DESC LIMIT 5;

-- 5. If there's diagnostic data but no learning path, generate one
-- First, get the latest completed diagnostic session
WITH latest_session AS (
  SELECT * FROM diagnostic_test_sessions
  WHERE completed = true
  ORDER BY created_at DESC
  LIMIT 1
),
-- Get all results for that session with lesson info
session_results AS (
  SELECT
    dtr.user_id,
    dtr.question_id,
    dtr.is_correct,
    -- Try to find lesson_id from question tables
    COALESCE(
      (SELECT lesson_id FROM practice_test_english_questions WHERE id = dtr.question_id),
      (SELECT lesson_id FROM practice_test_math_questions WHERE id = dtr.question_id),
      (SELECT lesson_id FROM practice_test_reading_questions WHERE id = dtr.question_id),
      (SELECT lesson_id FROM practice_test_science_questions WHERE id = dtr.question_id)
    ) as lesson_id
  FROM diagnostic_test_results dtr
  WHERE dtr.diagnostic_session_id = (SELECT id FROM latest_session)
),
-- Calculate performance per lesson
lesson_performance AS (
  SELECT
    sr.user_id,
    sr.lesson_id,
    l.lesson_title,
    l.lesson_key,
    COUNT(*) as total_questions,
    SUM(CASE WHEN sr.is_correct THEN 1 ELSE 0 END) as correct_answers,
    ROUND(100.0 * SUM(CASE WHEN sr.is_correct THEN 1 ELSE 0 END) / COUNT(*), 2) as accuracy_percentage
  FROM session_results sr
  LEFT JOIN lessons l ON l.id = sr.lesson_id
  WHERE sr.lesson_id IS NOT NULL
  GROUP BY sr.user_id, sr.lesson_id, l.lesson_title, l.lesson_key
),
-- Identify weak lessons (accuracy < 70%)
weak_lessons AS (
  SELECT * FROM lesson_performance
  WHERE accuracy_percentage < 70
  ORDER BY accuracy_percentage ASC
)
-- Show the weak lessons that should be in the learning path
SELECT
  'WEAK LESSONS TO ADD TO LEARNING PATH' as info,
  lesson_title,
  lesson_key,
  total_questions,
  correct_answers,
  accuracy_percentage || '%' as accuracy
FROM weak_lessons;

-- ================================================================
-- TO MANUALLY CREATE LEARNING PATH, RUN THIS:
-- ================================================================
-- Replace USER_ID with actual user_id from diagnostic_test_sessions

-- INSERT INTO user_learning_paths (user_id, path_name, target_score, is_active)
-- VALUES (
--   'USER_ID_HERE'::uuid,
--   'Diagnostic-Based Learning Path',
--   30,
--   true
-- )
-- RETURNING id;

-- Then insert learning_path_items for each weak lesson:
-- INSERT INTO learning_path_items (learning_path_id, lesson_id, sequence_order, is_priority)
-- SELECT
--   'LEARNING_PATH_ID_HERE'::uuid,
--   lesson_id,
--   ROW_NUMBER() OVER (ORDER BY accuracy_percentage ASC),
--   true
-- FROM (
--   -- Use the weak_lessons query from above
-- );
