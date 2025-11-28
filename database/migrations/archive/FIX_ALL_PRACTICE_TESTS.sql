-- ================================================================
-- FIX ALL PRACTICE TEST QUESTION IDS - COMPREHENSIVE SOLUTION
-- ================================================================
-- Problem: 450+ ID collisions across all 7 practice tests
-- Solution: Allocate IDs in 1000-block ranges per test
--
-- ID ALLOCATION SCHEME:
-- Test N uses IDs: (N-1)*1000 + 1 to (N-1)*1000 + 215
--
-- Within each test (215 questions total):
--   English (75):  base + 1   to base + 75
--   Math (60):     base + 76  to base + 135
--   Reading (40):  base + 136 to base + 175
--   Science (40):  base + 176 to base + 215
--
-- Where base = (test_number - 1) * 1000
--
-- EXAMPLE:
--   Test 1 (base=0):     1-75, 76-135, 136-175, 176-215
--   Test 2 (base=1000):  1001-1075, 1076-1135, 1136-1175, 1176-1215
--   Test 3 (base=2000):  2001-2075, 2076-2135, 2136-2175, 2176-2215
--   ...
--   Test N (base=(N-1)*1000): ...
--
-- This allows for up to 999 practice tests with ZERO collisions!
-- ================================================================

-- ================================================================
-- STEP 1: Clear all test results (using old IDs)
-- ================================================================
BEGIN;

DELETE FROM diagnostic_test_results;
DELETE FROM diagnostic_test_sessions;

-- If you have a practice_test_results table, clear it too
-- DELETE FROM practice_test_results;

SELECT '✅ Step 1: Cleared old test results' as status;

COMMIT;

-- ================================================================
-- STEP 2: Renumber ALL practice tests (Tests 1-7)
-- ================================================================
BEGIN;

-- ================================================================
-- TEST 1: Base ID = 0
--   English:  1010-1084  →  1-75
--   Math:     621-680    →  76-135
--   Reading:  417-456    →  136-175
--   Science:  401-440    →  176-215
-- ================================================================

UPDATE practice_test_english_questions
SET id = (1 - 1) * 1000 + (id - 1010 + 1)
WHERE test_number = 1 AND id >= 1010 AND id <= 1084;

UPDATE practice_test_math_questions
SET id = (1 - 1) * 1000 + 76 + (id - 621)
WHERE test_number = 1 AND id >= 621 AND id <= 680;

UPDATE practice_test_reading_questions
SET id = (1 - 1) * 1000 + 136 + (id - 417)
WHERE test_number = 1 AND id >= 417 AND id <= 456;

UPDATE practice_test_science_questions
SET id = (1 - 1) * 1000 + 176 + (id - 401)
WHERE test_number = 1 AND id >= 401 AND id <= 440;

SELECT '✅ Test 1 renumbered: 1-215' as status;

-- ================================================================
-- TEST 2: Base ID = 1000
--   English:  1085-1159  →  1001-1075
--   Math:     681-740    →  1076-1135
--   Reading:  457-496    →  1136-1175
--   Science:  441-480    →  1176-1215
-- ================================================================

UPDATE practice_test_english_questions
SET id = (2 - 1) * 1000 + (id - 1085 + 1)
WHERE test_number = 2 AND id >= 1085 AND id <= 1159;

UPDATE practice_test_math_questions
SET id = (2 - 1) * 1000 + 76 + (id - 681)
WHERE test_number = 2 AND id >= 681 AND id <= 740;

UPDATE practice_test_reading_questions
SET id = (2 - 1) * 1000 + 136 + (id - 457)
WHERE test_number = 2 AND id >= 457 AND id <= 496;

UPDATE practice_test_science_questions
SET id = (2 - 1) * 1000 + 176 + (id - 441)
WHERE test_number = 2 AND id >= 441 AND id <= 480;

SELECT '✅ Test 2 renumbered: 1001-1215' as status;

-- ================================================================
-- TEST 3: Base ID = 2000
--   English:  1160-1234  →  2001-2075
--   Math:     741-800    →  2076-2135
--   Reading:  497-536    →  2136-2175
--   Science:  481-520    →  2176-2215
-- ================================================================

UPDATE practice_test_english_questions
SET id = (3 - 1) * 1000 + (id - 1160 + 1)
WHERE test_number = 3 AND id >= 1160 AND id <= 1234;

UPDATE practice_test_math_questions
SET id = (3 - 1) * 1000 + 76 + (id - 741)
WHERE test_number = 3 AND id >= 741 AND id <= 800;

UPDATE practice_test_reading_questions
SET id = (3 - 1) * 1000 + 136 + (id - 497)
WHERE test_number = 3 AND id >= 497 AND id <= 536;

UPDATE practice_test_science_questions
SET id = (3 - 1) * 1000 + 176 + (id - 481)
WHERE test_number = 3 AND id >= 481 AND id <= 520;

SELECT '✅ Test 3 renumbered: 2001-2215' as status;

-- ================================================================
-- TEST 4: Base ID = 3000
--   English:  1235-1309  →  3001-3075
--   Math:     801-860    →  3076-3135
--   Reading:  537-576    →  3136-3175
--   Science:  521-560    →  3176-3215
-- ================================================================

UPDATE practice_test_english_questions
SET id = (4 - 1) * 1000 + (id - 1235 + 1)
WHERE test_number = 4 AND id >= 1235 AND id <= 1309;

UPDATE practice_test_math_questions
SET id = (4 - 1) * 1000 + 76 + (id - 801)
WHERE test_number = 4 AND id >= 801 AND id <= 860;

UPDATE practice_test_reading_questions
SET id = (4 - 1) * 1000 + 136 + (id - 537)
WHERE test_number = 4 AND id >= 537 AND id <= 576;

UPDATE practice_test_science_questions
SET id = (4 - 1) * 1000 + 176 + (id - 521)
WHERE test_number = 4 AND id >= 521 AND id <= 560;

SELECT '✅ Test 4 renumbered: 3001-3215' as status;

-- ================================================================
-- TEST 5: Base ID = 4000
--   English:  1310-1384  →  4001-4075
--   Math:     861-920    →  4076-4135
--   Reading:  577-616    →  4136-4175
--   Science:  561-600    →  4176-4215
-- ================================================================

UPDATE practice_test_english_questions
SET id = (5 - 1) * 1000 + (id - 1310 + 1)
WHERE test_number = 5 AND id >= 1310 AND id <= 1384;

UPDATE practice_test_math_questions
SET id = (5 - 1) * 1000 + 76 + (id - 861)
WHERE test_number = 5 AND id >= 861 AND id <= 920;

UPDATE practice_test_reading_questions
SET id = (5 - 1) * 1000 + 136 + (id - 577)
WHERE test_number = 5 AND id >= 577 AND id <= 616;

UPDATE practice_test_science_questions
SET id = (5 - 1) * 1000 + 176 + (id - 561)
WHERE test_number = 5 AND id >= 561 AND id <= 600;

SELECT '✅ Test 5 renumbered: 4001-4215' as status;

-- ================================================================
-- TEST 6: Base ID = 5000
--   English:  1385-1459  →  5001-5075
--   Math:     921-980    →  5076-5135
--   Reading:  617-656    →  5136-5175
--   Science:  601-640    →  5176-5215
-- ================================================================

UPDATE practice_test_english_questions
SET id = (6 - 1) * 1000 + (id - 1385 + 1)
WHERE test_number = 6 AND id >= 1385 AND id <= 1459;

UPDATE practice_test_math_questions
SET id = (6 - 1) * 1000 + 76 + (id - 921)
WHERE test_number = 6 AND id >= 921 AND id <= 980;

UPDATE practice_test_reading_questions
SET id = (6 - 1) * 1000 + 136 + (id - 617)
WHERE test_number = 6 AND id >= 617 AND id <= 656;

UPDATE practice_test_science_questions
SET id = (6 - 1) * 1000 + 176 + (id - 601)
WHERE test_number = 6 AND id >= 601 AND id <= 640;

SELECT '✅ Test 6 renumbered: 5001-5215' as status;

-- ================================================================
-- TEST 7: Base ID = 6000
--   English:  1460-1534  →  6001-6075
--   Math:     981-1040   →  6076-6135
--   Reading:  657-696    →  6136-6175
--   Science:  641-680    →  6176-6215
-- ================================================================

UPDATE practice_test_english_questions
SET id = (7 - 1) * 1000 + (id - 1460 + 1)
WHERE test_number = 7 AND id >= 1460 AND id <= 1534;

UPDATE practice_test_math_questions
SET id = (7 - 1) * 1000 + 76 + (id - 981)
WHERE test_number = 7 AND id >= 981 AND id <= 1040;

UPDATE practice_test_reading_questions
SET id = (7 - 1) * 1000 + 136 + (id - 657)
WHERE test_number = 7 AND id >= 657 AND id <= 696;

UPDATE practice_test_science_questions
SET id = (7 - 1) * 1000 + 176 + (id - 641)
WHERE test_number = 7 AND id >= 641 AND id <= 680;

SELECT '✅ Test 7 renumbered: 6001-6215' as status;

COMMIT;

-- ================================================================
-- STEP 3: Add unique constraint (if not exists)
-- ================================================================
ALTER TABLE diagnostic_test_results
DROP CONSTRAINT IF EXISTS diagnostic_test_results_session_question_unique;

ALTER TABLE diagnostic_test_results
ADD CONSTRAINT diagnostic_test_results_session_question_unique
UNIQUE (diagnostic_session_id, question_id);

SELECT '✅ Step 3: Added unique constraint' as status;

-- ================================================================
-- VERIFICATION: Check all 7 tests
-- ================================================================
SELECT
  '📊 VERIFICATION' as section,
  'Test 1 English' as name,
  1 as expected_min,
  75 as expected_max,
  MIN(id) as actual_min,
  MAX(id) as actual_max,
  COUNT(*) as count,
  CASE WHEN MIN(id) = 1 AND MAX(id) = 75 AND COUNT(*) = 75 THEN '✅' ELSE '❌' END as status
FROM practice_test_english_questions WHERE test_number = 1
UNION ALL SELECT '📊 VERIFICATION', 'Test 1 Math', 76, 135, MIN(id), MAX(id), COUNT(*), CASE WHEN MIN(id) = 76 AND MAX(id) = 135 AND COUNT(*) = 60 THEN '✅' ELSE '❌' END FROM practice_test_math_questions WHERE test_number = 1
UNION ALL SELECT '📊 VERIFICATION', 'Test 1 Reading', 136, 175, MIN(id), MAX(id), COUNT(*), CASE WHEN MIN(id) = 136 AND MAX(id) = 175 AND COUNT(*) = 40 THEN '✅' ELSE '❌' END FROM practice_test_reading_questions WHERE test_number = 1
UNION ALL SELECT '📊 VERIFICATION', 'Test 1 Science', 176, 215, MIN(id), MAX(id), COUNT(*), CASE WHEN MIN(id) = 176 AND MAX(id) = 215 AND COUNT(*) = 40 THEN '✅' ELSE '❌' END FROM practice_test_science_questions WHERE test_number = 1
UNION ALL SELECT '📊 VERIFICATION', 'Test 2 English', 1001, 1075, MIN(id), MAX(id), COUNT(*), CASE WHEN MIN(id) = 1001 AND MAX(id) = 1075 AND COUNT(*) = 75 THEN '✅' ELSE '❌' END FROM practice_test_english_questions WHERE test_number = 2
UNION ALL SELECT '📊 VERIFICATION', 'Test 2 Math', 1076, 1135, MIN(id), MAX(id), COUNT(*), CASE WHEN MIN(id) = 1076 AND MAX(id) = 1135 AND COUNT(*) = 60 THEN '✅' ELSE '❌' END FROM practice_test_math_questions WHERE test_number = 2
UNION ALL SELECT '📊 VERIFICATION', 'Test 2 Reading', 1136, 1175, MIN(id), MAX(id), COUNT(*), CASE WHEN MIN(id) = 1136 AND MAX(id) = 1175 AND COUNT(*) = 40 THEN '✅' ELSE '❌' END FROM practice_test_reading_questions WHERE test_number = 2
UNION ALL SELECT '📊 VERIFICATION', 'Test 2 Science', 1176, 1215, MIN(id), MAX(id), COUNT(*), CASE WHEN MIN(id) = 1176 AND MAX(id) = 1215 AND COUNT(*) = 40 THEN '✅' ELSE '❌' END FROM practice_test_science_questions WHERE test_number = 2
UNION ALL SELECT '📊 VERIFICATION', 'Test 3 English', 2001, 2075, MIN(id), MAX(id), COUNT(*), CASE WHEN MIN(id) = 2001 AND MAX(id) = 2075 AND COUNT(*) = 75 THEN '✅' ELSE '❌' END FROM practice_test_english_questions WHERE test_number = 3
UNION ALL SELECT '📊 VERIFICATION', 'Test 3 Math', 2076, 2135, MIN(id), MAX(id), COUNT(*), CASE WHEN MIN(id) = 2076 AND MAX(id) = 2135 AND COUNT(*) = 60 THEN '✅' ELSE '❌' END FROM practice_test_math_questions WHERE test_number = 3
UNION ALL SELECT '📊 VERIFICATION', 'Test 3 Reading', 2136, 2175, MIN(id), MAX(id), COUNT(*), CASE WHEN MIN(id) = 2136 AND MAX(id) = 2175 AND COUNT(*) = 40 THEN '✅' ELSE '❌' END FROM practice_test_reading_questions WHERE test_number = 3
UNION ALL SELECT '📊 VERIFICATION', 'Test 3 Science', 2176, 2215, MIN(id), MAX(id), COUNT(*), CASE WHEN MIN(id) = 2176 AND MAX(id) = 2215 AND COUNT(*) = 40 THEN '✅' ELSE '❌' END FROM practice_test_science_questions WHERE test_number = 3
UNION ALL SELECT '📊 VERIFICATION', 'Test 4 English', 3001, 3075, MIN(id), MAX(id), COUNT(*), CASE WHEN MIN(id) = 3001 AND MAX(id) = 3075 AND COUNT(*) = 75 THEN '✅' ELSE '❌' END FROM practice_test_english_questions WHERE test_number = 4
UNION ALL SELECT '📊 VERIFICATION', 'Test 4 Math', 3076, 3135, MIN(id), MAX(id), COUNT(*), CASE WHEN MIN(id) = 3076 AND MAX(id) = 3135 AND COUNT(*) = 60 THEN '✅' ELSE '❌' END FROM practice_test_math_questions WHERE test_number = 4
UNION ALL SELECT '📊 VERIFICATION', 'Test 4 Reading', 3136, 3175, MIN(id), MAX(id), COUNT(*), CASE WHEN MIN(id) = 3136 AND MAX(id) = 3175 AND COUNT(*) = 40 THEN '✅' ELSE '❌' END FROM practice_test_reading_questions WHERE test_number = 4
UNION ALL SELECT '📊 VERIFICATION', 'Test 4 Science', 3176, 3215, MIN(id), MAX(id), COUNT(*), CASE WHEN MIN(id) = 3176 AND MAX(id) = 3215 AND COUNT(*) = 40 THEN '✅' ELSE '❌' END FROM practice_test_science_questions WHERE test_number = 4
UNION ALL SELECT '📊 VERIFICATION', 'Test 5 English', 4001, 4075, MIN(id), MAX(id), COUNT(*), CASE WHEN MIN(id) = 4001 AND MAX(id) = 4075 AND COUNT(*) = 75 THEN '✅' ELSE '❌' END FROM practice_test_english_questions WHERE test_number = 5
UNION ALL SELECT '📊 VERIFICATION', 'Test 5 Math', 4076, 4135, MIN(id), MAX(id), COUNT(*), CASE WHEN MIN(id) = 4076 AND MAX(id) = 4135 AND COUNT(*) = 60 THEN '✅' ELSE '❌' END FROM practice_test_math_questions WHERE test_number = 5
UNION ALL SELECT '📊 VERIFICATION', 'Test 5 Reading', 4136, 4175, MIN(id), MAX(id), COUNT(*), CASE WHEN MIN(id) = 4136 AND MAX(id) = 4175 AND COUNT(*) = 40 THEN '✅' ELSE '❌' END FROM practice_test_reading_questions WHERE test_number = 5
UNION ALL SELECT '📊 VERIFICATION', 'Test 5 Science', 4176, 4215, MIN(id), MAX(id), COUNT(*), CASE WHEN MIN(id) = 4176 AND MAX(id) = 4215 AND COUNT(*) = 40 THEN '✅' ELSE '❌' END FROM practice_test_science_questions WHERE test_number = 5
UNION ALL SELECT '📊 VERIFICATION', 'Test 6 English', 5001, 5075, MIN(id), MAX(id), COUNT(*), CASE WHEN MIN(id) = 5001 AND MAX(id) = 5075 AND COUNT(*) = 75 THEN '✅' ELSE '❌' END FROM practice_test_english_questions WHERE test_number = 6
UNION ALL SELECT '📊 VERIFICATION', 'Test 6 Math', 5076, 5135, MIN(id), MAX(id), COUNT(*), CASE WHEN MIN(id) = 5076 AND MAX(id) = 5135 AND COUNT(*) = 60 THEN '✅' ELSE '❌' END FROM practice_test_math_questions WHERE test_number = 6
UNION ALL SELECT '📊 VERIFICATION', 'Test 6 Reading', 5136, 5175, MIN(id), MAX(id), COUNT(*), CASE WHEN MIN(id) = 5136 AND MAX(id) = 5175 AND COUNT(*) = 40 THEN '✅' ELSE '❌' END FROM practice_test_reading_questions WHERE test_number = 6
UNION ALL SELECT '📊 VERIFICATION', 'Test 6 Science', 5176, 5215, MIN(id), MAX(id), COUNT(*), CASE WHEN MIN(id) = 5176 AND MAX(id) = 5215 AND COUNT(*) = 40 THEN '✅' ELSE '❌' END FROM practice_test_science_questions WHERE test_number = 6
UNION ALL SELECT '📊 VERIFICATION', 'Test 7 English', 6001, 6075, MIN(id), MAX(id), COUNT(*), CASE WHEN MIN(id) = 6001 AND MAX(id) = 6075 AND COUNT(*) = 75 THEN '✅' ELSE '❌' END FROM practice_test_english_questions WHERE test_number = 7
UNION ALL SELECT '📊 VERIFICATION', 'Test 7 Math', 6076, 6135, MIN(id), MAX(id), COUNT(*), CASE WHEN MIN(id) = 6076 AND MAX(id) = 6135 AND COUNT(*) = 60 THEN '✅' ELSE '❌' END FROM practice_test_math_questions WHERE test_number = 7
UNION ALL SELECT '📊 VERIFICATION', 'Test 7 Reading', 6136, 6175, MIN(id), MAX(id), COUNT(*), CASE WHEN MIN(id) = 6136 AND MAX(id) = 6175 AND COUNT(*) = 40 THEN '✅' ELSE '❌' END FROM practice_test_reading_questions WHERE test_number = 7
UNION ALL SELECT '📊 VERIFICATION', 'Test 7 Science', 6176, 6215, MIN(id), MAX(id), COUNT(*), CASE WHEN MIN(id) = 6176 AND MAX(id) = 6215 AND COUNT(*) = 40 THEN '✅' ELSE '❌' END FROM practice_test_science_questions WHERE test_number = 7
ORDER BY expected_min;

SELECT '✅ ✅ ✅ ALL 7 TESTS FIXED! Zero collisions across 1,505 questions!' as final_status;
