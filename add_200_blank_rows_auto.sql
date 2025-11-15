-- =====================================================
-- ADD 200 BLANK ROWS - AUTO DETECT NEXT TEST NUMBER
-- =====================================================
-- First, let's find what test numbers already exist
-- =====================================================

-- Check existing test numbers
SELECT 'English' as section, COALESCE(MAX(test_number), 0) as max_test_number
FROM practice_test_english_questions
UNION ALL
SELECT 'Math' as section, COALESCE(MAX(test_number), 0) as max_test_number
FROM practice_test_math_questions
UNION ALL
SELECT 'Reading' as section, COALESCE(MAX(test_number), 0) as max_test_number
FROM practice_test_reading_questions
UNION ALL
SELECT 'Science' as section, COALESCE(MAX(test_number), 0) as max_test_number
FROM practice_test_science_questions
ORDER BY max_test_number DESC;

-- =====================================================
-- INSTRUCTIONS:
-- Look at the output above and find the highest test_number
-- Then run the INSERT statements below, replacing 999 with
-- (highest_test_number + 1)
--
-- For example, if max is 2, use test_number = 3
-- =====================================================

-- =====================================================
-- ENGLISH QUESTIONS (200 rows)
-- =====================================================
INSERT INTO practice_test_english_questions (
  test_number,
  question_number,
  question_text,
  choices,
  correct_answer,
  explanation,
  question_type,
  difficulty
)
SELECT
  3 as test_number,  -- CHANGE THIS NUMBER
  generate_series as question_number,
  '[PLACEHOLDER] Question text here' as question_text,
  '["A. Option A", "B. Option B", "C. Option C", "D. Option D"]'::jsonb as choices,
  0 as correct_answer,
  '[PLACEHOLDER] Explanation here' as explanation,
  'grammar' as question_type,
  'medium' as difficulty
FROM generate_series(1, 200);

-- =====================================================
-- MATH QUESTIONS (200 rows)
-- =====================================================
INSERT INTO practice_test_math_questions (
  test_number,
  question_number,
  question_text,
  choices,
  correct_answer,
  explanation,
  question_type,
  difficulty
)
SELECT
  3 as test_number,  -- CHANGE THIS NUMBER
  generate_series as question_number,
  '[PLACEHOLDER] Question text here' as question_text,
  '["A. Option A", "B. Option B", "C. Option C", "D. Option D", "E. Option E"]'::jsonb as choices,
  0 as correct_answer,
  '[PLACEHOLDER] Explanation here' as explanation,
  'algebra' as question_type,
  'medium' as difficulty
FROM generate_series(1, 200);

-- =====================================================
-- READING QUESTIONS (200 rows)
-- =====================================================
INSERT INTO practice_test_reading_questions (
  test_number,
  question_number,
  question_text,
  choices,
  correct_answer,
  explanation,
  question_type,
  difficulty
)
SELECT
  3 as test_number,  -- CHANGE THIS NUMBER
  generate_series as question_number,
  '[PLACEHOLDER] Question text here' as question_text,
  '["A. Option A", "B. Option B", "C. Option C", "D. Option D"]'::jsonb as choices,
  0 as correct_answer,
  '[PLACEHOLDER] Explanation here' as explanation,
  'main_idea' as question_type,
  'medium' as difficulty
FROM generate_series(1, 200);

-- =====================================================
-- SCIENCE QUESTIONS (200 rows)
-- =====================================================
INSERT INTO practice_test_science_questions (
  test_number,
  question_number,
  question_text,
  choices,
  correct_answer,
  explanation,
  question_type,
  difficulty
)
SELECT
  3 as test_number,  -- CHANGE THIS NUMBER
  generate_series as question_number,
  '[PLACEHOLDER] Question text here' as question_text,
  '["A. Option A", "B. Option B", "C. Option C", "D. Option D"]'::jsonb as choices,
  0 as correct_answer,
  '[PLACEHOLDER] Explanation here' as explanation,
  'data_interpretation' as question_type,
  'medium' as difficulty
FROM generate_series(1, 200);

-- =====================================================
-- VERIFICATION
-- =====================================================
SELECT
  'English' as section,
  COUNT(*) as total_rows,
  COUNT(*) FILTER (WHERE test_number = 3) as test_3_rows
FROM practice_test_english_questions

UNION ALL

SELECT
  'Math' as section,
  COUNT(*) as total_rows,
  COUNT(*) FILTER (WHERE test_number = 3) as test_3_rows
FROM practice_test_math_questions

UNION ALL

SELECT
  'Reading' as section,
  COUNT(*) as total_rows,
  COUNT(*) FILTER (WHERE test_number = 3) as test_3_rows
FROM practice_test_reading_questions

UNION ALL

SELECT
  'Science' as section,
  COUNT(*) as total_rows,
  COUNT(*) FILTER (WHERE test_number = 3) as test_3_rows
FROM practice_test_science_questions;
