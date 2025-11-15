-- ================================================================
-- REORGANIZE ALL PRACTICE TEST QUESTION IDS
-- ================================================================
-- New ID scheme (matches ACT test order):
--   English:  1-75    (75 questions)
--   Math:     76-135  (60 questions)
--   Reading:  136-175 (40 questions)
--   Science:  176-215 (40 questions)
--   TOTAL: 215 questions
-- ================================================================

BEGIN;

-- ================================================================
-- ENGLISH: 1010-1084 → 1-75
-- ================================================================
UPDATE practice_test_english_questions
SET id = id - 1009  -- 1010 → 1, 1084 → 75
WHERE test_number = 1
  AND id >= 1010
  AND id <= 1084;

SELECT 'English updated' as status, COUNT(*) as count FROM practice_test_english_questions WHERE test_number = 1 AND id >= 1 AND id <= 75;

-- ================================================================
-- MATH: 621-680 → 76-135
-- ================================================================
UPDATE practice_test_math_questions
SET id = id - 545  -- 621 → 76, 680 → 135
WHERE test_number = 1
  AND id >= 621
  AND id <= 680;

SELECT 'Math updated' as status, COUNT(*) as count FROM practice_test_math_questions WHERE test_number = 1 AND id >= 76 AND id <= 135;

-- ================================================================
-- READING: 417-456 → 136-175
-- ================================================================
UPDATE practice_test_reading_questions
SET id = id - 281  -- 417 → 136, 456 → 175
WHERE test_number = 1
  AND id >= 417
  AND id <= 456;

SELECT 'Reading updated' as status, COUNT(*) as count FROM practice_test_reading_questions WHERE test_number = 1 AND id >= 136 AND id <= 175;

-- ================================================================
-- SCIENCE: 401-440 → 176-215
-- ================================================================
UPDATE practice_test_science_questions
SET id = id - 225  -- 401 → 176, 440 → 215
WHERE test_number = 1
  AND id >= 401
  AND id <= 440;

SELECT 'Science updated' as status, COUNT(*) as count FROM practice_test_science_questions WHERE test_number = 1 AND id >= 176 AND id <= 215;

-- ================================================================
-- VERIFY NO OVERLAPS
-- ================================================================
SELECT
  '✅ Final Verification' as status,
  'English' as section,
  MIN(id) as min_id,
  MAX(id) as max_id,
  COUNT(*) as count
FROM practice_test_english_questions
WHERE test_number = 1
UNION ALL
SELECT
  '✅ Final Verification',
  'Math',
  MIN(id),
  MAX(id),
  COUNT(*)
FROM practice_test_math_questions
WHERE test_number = 1
UNION ALL
SELECT
  '✅ Final Verification',
  'Reading',
  MIN(id),
  MAX(id),
  COUNT(*)
FROM practice_test_reading_questions
WHERE test_number = 1
UNION ALL
SELECT
  '✅ Final Verification',
  'Science',
  MIN(id),
  MAX(id),
  COUNT(*)
FROM practice_test_science_questions
WHERE test_number = 1
ORDER BY min_id;

-- If everything looks correct, COMMIT
COMMIT;

-- ================================================================
-- POST-COMMIT VERIFICATION
-- ================================================================
SELECT
  'English' as section,
  1 as expected_min,
  75 as expected_max,
  MIN(id) as actual_min,
  MAX(id) as actual_max,
  COUNT(*) as count,
  CASE WHEN MIN(id) = 1 AND MAX(id) = 75 AND COUNT(*) = 75 THEN '✅' ELSE '❌' END as status
FROM practice_test_english_questions WHERE test_number = 1
UNION ALL
SELECT
  'Math',
  76,
  135,
  MIN(id),
  MAX(id),
  COUNT(*),
  CASE WHEN MIN(id) = 76 AND MAX(id) = 135 AND COUNT(*) = 60 THEN '✅' ELSE '❌' END
FROM practice_test_math_questions WHERE test_number = 1
UNION ALL
SELECT
  'Reading',
  136,
  175,
  MIN(id),
  MAX(id),
  COUNT(*),
  CASE WHEN MIN(id) = 136 AND MAX(id) = 175 AND COUNT(*) = 40 THEN '✅' ELSE '❌' END
FROM practice_test_reading_questions WHERE test_number = 1
UNION ALL
SELECT
  'Science',
  176,
  215,
  MIN(id),
  MAX(id),
  COUNT(*),
  CASE WHEN MIN(id) = 176 AND MAX(id) = 215 AND COUNT(*) = 40 THEN '✅' ELSE '❌' END
FROM practice_test_science_questions WHERE test_number = 1;
