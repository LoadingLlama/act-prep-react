-- =====================================================
-- ADD 200 BLANK TEMPLATE ROWS TO EACH QUESTION TABLE
-- =====================================================
-- This creates template rows for Practice Test #2
-- You can then update these rows with actual question data
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
  2 as test_number,
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
  2 as test_number,
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
  2 as test_number,
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
  2 as test_number,
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

-- Check row counts
SELECT
  'English' as section,
  COUNT(*) as total_rows,
  COUNT(*) FILTER (WHERE test_number = 2) as test_2_rows
FROM practice_test_english_questions

UNION ALL

SELECT
  'Math' as section,
  COUNT(*) as total_rows,
  COUNT(*) FILTER (WHERE test_number = 2) as test_2_rows
FROM practice_test_math_questions

UNION ALL

SELECT
  'Reading' as section,
  COUNT(*) as total_rows,
  COUNT(*) FILTER (WHERE test_number = 2) as test_2_rows
FROM practice_test_reading_questions

UNION ALL

SELECT
  'Science' as section,
  COUNT(*) as total_rows,
  COUNT(*) FILTER (WHERE test_number = 2) as test_2_rows
FROM practice_test_science_questions;

-- Show sample of inserted rows
SELECT 'English' as section, question_number, question_text, choices
FROM practice_test_english_questions
WHERE test_number = 2
ORDER BY question_number
LIMIT 5;
