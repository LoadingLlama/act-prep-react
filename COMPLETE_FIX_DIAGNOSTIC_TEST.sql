-- ================================================================
-- COMPLETE FIX FOR DIAGNOSTIC TEST - RUN THIS IN SUPABASE SQL EDITOR
-- ================================================================
-- This fixes the root cause of Science Q17-40 failing to save:
--   - Overlapping question IDs between sections
--   - Reorganizes all IDs to sequential ranges
-- ================================================================

-- ================================================================
-- STEP 1: Clear old diagnostic test results (they use old IDs)
-- ================================================================
BEGIN;

DELETE FROM diagnostic_test_results;
DELETE FROM diagnostic_test_sessions;

SELECT '✅ Step 1: Cleared old diagnostic data' as status;

COMMIT;

-- ================================================================
-- STEP 2: Reorganize question IDs to eliminate overlaps
-- ================================================================
-- New ID scheme (matches ACT test order):
--   English:  1-75    (75 questions)
--   Math:     76-135  (60 questions)
--   Reading:  136-175 (40 questions)
--   Science:  176-215 (40 questions)
-- ================================================================

BEGIN;

-- English: 1010-1084 → 1-75
UPDATE practice_test_english_questions
SET id = id - 1009
WHERE test_number = 1 AND id >= 1010 AND id <= 1084;

-- Math: 621-680 → 76-135
UPDATE practice_test_math_questions
SET id = id - 545
WHERE test_number = 1 AND id >= 621 AND id <= 680;

-- Reading: 417-456 → 136-175
UPDATE practice_test_reading_questions
SET id = id - 281
WHERE test_number = 1 AND id >= 417 AND id <= 456;

-- Science: 401-440 → 176-215
UPDATE practice_test_science_questions
SET id = id - 225
WHERE test_number = 1 AND id >= 401 AND id <= 440;

SELECT '✅ Step 2: Reorganized all question IDs' as status;

COMMIT;

-- ================================================================
-- STEP 3: Add unique constraint for upsert (if not exists)
-- ================================================================
ALTER TABLE diagnostic_test_results
DROP CONSTRAINT IF EXISTS diagnostic_test_results_session_question_unique;

ALTER TABLE diagnostic_test_results
ADD CONSTRAINT diagnostic_test_results_session_question_unique
UNIQUE (diagnostic_session_id, question_id);

SELECT '✅ Step 3: Added unique constraint' as status;

-- ================================================================
-- VERIFICATION
-- ================================================================
SELECT
  '📊 VERIFICATION' as section,
  'English' as name,
  1 as expected_min,
  75 as expected_max,
  MIN(id) as actual_min,
  MAX(id) as actual_max,
  COUNT(*) as count,
  CASE WHEN MIN(id) = 1 AND MAX(id) = 75 AND COUNT(*) = 75 THEN '✅' ELSE '❌' END as status
FROM practice_test_english_questions WHERE test_number = 1
UNION ALL
SELECT
  '📊 VERIFICATION',
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
  '📊 VERIFICATION',
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
  '📊 VERIFICATION',
  'Science',
  176,
  215,
  MIN(id),
  MAX(id),
  COUNT(*),
  CASE WHEN MIN(id) = 176 AND MAX(id) = 215 AND COUNT(*) = 40 THEN '✅' ELSE '❌' END
FROM practice_test_science_questions WHERE test_number = 1
ORDER BY expected_min;

-- ================================================================
-- CONSTRAINT VERIFICATION
-- ================================================================
SELECT
  conname as constraint_name,
  contype as type,
  pg_get_constraintdef(oid) as definition
FROM pg_constraint
WHERE conrelid = 'diagnostic_test_results'::regclass
  AND conname = 'diagnostic_test_results_session_question_unique';

SELECT '✅ ✅ ✅ ALL FIXES COMPLETE! Now retake the diagnostic test.' as final_status;
