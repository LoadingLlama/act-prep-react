-- ================================================================
-- FIX EMPTY LEARNING PATH
-- ================================================================
-- This adds lessons to the empty learning path created during diagnostic
-- ================================================================

-- Step 1: Verify the active learning path
SELECT 'Current Learning Path:' as info;
SELECT id, path_name, is_active, created_at
FROM user_learning_paths
WHERE id = 'a5eb38c8-f4d1-4387-b71b-8d99c06c66a2';

-- Step 2: Check current items (should be 0)
SELECT 'Current Items:' as info;
SELECT COUNT(*) as item_count
FROM learning_path_items
WHERE learning_path_id = 'a5eb38c8-f4d1-4387-b71b-8d99c06c66a2';

-- Step 3: Add 15 foundational lessons (mix from all sections)
INSERT INTO learning_path_items (learning_path_id, lesson_id, sequence_order, is_priority, status)
SELECT
  'a5eb38c8-f4d1-4387-b71b-8d99c06c66a2'::uuid,
  l.id,
  ROW_NUMBER() OVER (PARTITION BY
    CASE
      WHEN l.lesson_key ~ '^english' THEN 'english'
      WHEN l.lesson_key ~ '^math' THEN 'math'
      WHEN l.lesson_key ~ '^reading' THEN 'reading'
      WHEN l.lesson_key ~ '^science' THEN 'science'
      ELSE 'other'
    END
    ORDER BY l.lesson_key
  ),
  true,
  'pending'
FROM lessons l
WHERE l.lesson_key ~ '^(english|math|reading|science)_'
  AND l.lesson_key ~ '_(1_[1-5]|fundamental|basics|intro)' -- Focus on early lessons
ORDER BY
  CASE
    WHEN l.lesson_key ~ '^english' THEN 1
    WHEN l.lesson_key ~ '^math' THEN 2
    WHEN l.lesson_key ~ '^reading' THEN 3
    WHEN l.lesson_key ~ '^science' THEN 4
  END,
  l.lesson_key
LIMIT 15
ON CONFLICT DO NOTHING;

-- Step 4: Verify items were added
SELECT 'New Items Count:' as info;
SELECT COUNT(*) as item_count
FROM learning_path_items
WHERE learning_path_id = 'a5eb38c8-f4d1-4387-b71b-8d99c06c66a2';

-- Step 5: Show the lessons added
SELECT 'Added Lessons:' as info;
SELECT
  lpi.sequence_order,
  l.lesson_key,
  l.title as lesson_title,
  lpi.is_priority
FROM learning_path_items lpi
JOIN lessons l ON l.id = lpi.lesson_id
WHERE lpi.learning_path_id = 'a5eb38c8-f4d1-4387-b71b-8d99c06c66a2'
ORDER BY lpi.sequence_order;

-- Success message
SELECT '✅ Learning path populated with lessons!' as status;
