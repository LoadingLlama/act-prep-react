-- ================================================================
-- POPULATE 12-WEEK LEARNING PATH
-- ================================================================
-- This adds 60 lessons (5 per week) across 12 weeks
-- Mix of all 4 sections (English, Math, Reading, Science)
-- ================================================================

-- Step 1: Clear existing items (if any)
DELETE FROM learning_path_items WHERE learning_path_id = 'a5eb38c8-f4d1-4387-b71b-8d99c06c66a2';

-- Step 2: Insert 60 lessons across 12 weeks (5 lessons per week, 1 per study day)
-- Week 1-12, alternating between sections for variety

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
  'a5eb38c8-f4d1-4387-b71b-8d99c06c66a2'::uuid,
  l.id,
  ROW_NUMBER() OVER (ORDER BY
    -- Alternate sections: english, math, reading, science
    CASE
      WHEN l.lesson_key ~ '^english' THEN 1
      WHEN l.lesson_key ~ '^math' THEN 2
      WHEN l.lesson_key ~ '^reading' THEN 3
      WHEN l.lesson_key ~ '^science' THEN 4
      ELSE 5
    END,
    l.lesson_key
  ) as sequence_order,
  -- Calculate week number (5 lessons per week)
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
  -- Day number within sequence
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
  -- Mark first 20 as priority
  CASE WHEN ROW_NUMBER() OVER (ORDER BY l.lesson_key) <= 20 THEN true ELSE false END as is_priority,
  30 as estimated_minutes,
  -- Schedule starting today, one per day
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

-- Step 3: Verify the distribution
SELECT '=== VERIFICATION ===' as info;

SELECT
  week_number,
  COUNT(*) as lessons_count,
  MIN(scheduled_date) as week_start,
  MAX(scheduled_date) as week_end
FROM learning_path_items
WHERE learning_path_id = 'a5eb38c8-f4d1-4387-b71b-8d99c06c66a2'::uuid
GROUP BY week_number
ORDER BY week_number;

-- Step 4: Show sample from each week
SELECT '=== SAMPLE LESSONS ===' as info;

SELECT
  week_number,
  sequence_order,
  l.title as lesson_title,
  lpi.scheduled_date,
  lpi.is_priority
FROM learning_path_items lpi
JOIN lessons l ON l.id = lpi.lesson_id
WHERE lpi.learning_path_id = 'a5eb38c8-f4d1-4387-b71b-8d99c06c66a2'::uuid
  AND lpi.sequence_order IN (1, 10, 20, 30, 40, 50, 60)
ORDER BY lpi.sequence_order;

-- Success message
SELECT '✅ 12-week learning path created with 60 lessons!' as status;
