-- ================================================================
-- FIX READING QUESTION IDS TO AVOID COLLISION WITH SCIENCE
-- ================================================================
-- Current:
--   Science: 401-440
--   Reading: 417-456 (overlaps with Science!)
--
-- Solution: Renumber Reading questions to 201-240
-- ================================================================

-- IMPORTANT: Run this in a transaction so we can rollback if something goes wrong
BEGIN;

-- Step 1: Temporarily disable the trigger if any
-- (No triggers expected, but good practice)

-- Step 2: Update reading question IDs
-- Shift all IDs by -216 (417 -> 201, 456 -> 240)
UPDATE practice_test_reading_questions
SET id = id - 216
WHERE test_number = 1
  AND id >= 417
  AND id <= 456;

-- Step 3: Verify the changes
SELECT
  MIN(id) as min_id,
  MAX(id) as max_id,
  COUNT(*) as total_questions
FROM practice_test_reading_questions
WHERE test_number = 1;

-- Step 4: Check for any ID collisions with other sections
SELECT 'Checking for collisions...' as status;

-- If everything looks good, COMMIT
-- If something is wrong, ROLLBACK
COMMIT;

-- ================================================================
-- VERIFICATION
-- ================================================================
SELECT 'Reading Questions' as section, MIN(id) as min_id, MAX(id) as max_id, COUNT(*) as count
FROM practice_test_reading_questions WHERE test_number = 1
UNION ALL
SELECT 'Science Questions', MIN(id), MAX(id), COUNT(*)
FROM practice_test_science_questions WHERE test_number = 1
UNION ALL
SELECT 'Math Questions', MIN(id), MAX(id), COUNT(*)
FROM practice_test_math_questions WHERE test_number = 1
UNION ALL
SELECT 'English Questions', MIN(id), MAX(id), COUNT(*)
FROM practice_test_english_questions WHERE test_number = 1
ORDER BY min_id;
