-- ================================================================
-- POPULATE ACTIVE LEARNING PATH WITH 60 LESSONS (12 WEEKS)
-- ================================================================
-- Path ID: b1d15fd6-f6cc-4fda-9348-39984f8b6113
-- ================================================================

-- Step 1: Clear existing items
DELETE FROM learning_path_items WHERE learning_path_id = 'b1d15fd6-f6cc-4fda-9348-39984f8b6113';

-- Step 2: Insert 60 lessons across 12 weeks (5 lessons per week)
INSERT INTO learning_path_items (
  learning_path_id,
  lesson_id,
  sequence_order,
  week_number,
  day_number,
  is_priority,
  estimated_minutes,
  scheduled_date,
  status
)
SELECT
  'b1d15fd6-f6cc-4fda-9348-39984f8b6113'::uuid,
  l.id,
  ROW_NUMBER() OVER (ORDER BY
    CASE
      WHEN l.lesson_key ~ '^english' THEN 1
      WHEN l.lesson_key ~ '^math' THEN 2
      WHEN l.lesson_key ~ '^reading' THEN 3
      WHEN l.lesson_key ~ '^science' THEN 4
      ELSE 5
    END,
    l.lesson_key
  ) as sequence_order,
  CEIL(ROW_NUMBER() OVER (ORDER BY
    CASE
      WHEN l.lesson_key ~ '^english' THEN 1
      WHEN l.lesson_key ~ '^math' THEN 2
      WHEN l.lesson_key ~ '^reading' THEN 3
      WHEN l.lesson_key ~ '^science' THEN 4
      ELSE 5
    END,
    l.lesson_key
  )::float / 5.0) as week_number,
  ROW_NUMBER() OVER (ORDER BY
    CASE
      WHEN l.lesson_key ~ '^english' THEN 1
      WHEN l.lesson_key ~ '^math' THEN 2
      WHEN l.lesson_key ~ '^reading' THEN 3
      WHEN l.lesson_key ~ '^science' THEN 4
      ELSE 5
    END,
    l.lesson_key
  ) as day_number,
  CASE WHEN ROW_NUMBER() OVER (ORDER BY l.lesson_key) <= 20 THEN true ELSE false END as is_priority,
  30 as estimated_minutes,
  (CURRENT_DATE + (ROW_NUMBER() OVER (ORDER BY l.lesson_key) - 1) * INTERVAL '1 day')::date as scheduled_date,
  'pending' as status
FROM lessons l
WHERE l.lesson_key ~ '^(english|math|reading|science)_'
ORDER BY
  CASE
    WHEN l.lesson_key ~ '^english' THEN 1
    WHEN l.lesson_key ~ '^math' THEN 2
    WHEN l.lesson_key ~ '^reading' THEN 3
    WHEN l.lesson_key ~ '^science' THEN 4
  END,
  l.lesson_key
LIMIT 60;

-- Step 3: Verify the result
SELECT '=== VERIFICATION ===' as info;

SELECT
  week_number,
  COUNT(*) as lessons_count,
  MIN(scheduled_date) as week_start,
  MAX(scheduled_date) as week_end
FROM learning_path_items
WHERE learning_path_id = 'b1d15fd6-f6cc-4fda-9348-39984f8b6113'::uuid
GROUP BY week_number
ORDER BY week_number;

-- Step 4: Show total count
SELECT COUNT(*) as total_items
FROM learning_path_items
WHERE learning_path_id = 'b1d15fd6-f6cc-4fda-9348-39984f8b6113'::uuid;

SELECT '✅ Active learning path populated with 60 lessons across 12 weeks!' as status;
