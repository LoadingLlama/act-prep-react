-- Migration: Move excess teaching examples to practice questions
-- Keeps 4 teaching examples per lesson, moves rest to practice

-- Disable RLS for this migration (re-enable at the end)
ALTER TABLE practice_questions DISABLE ROW LEVEL SECURITY;

-- Create temporary function to migrate examples for a single lesson
CREATE OR REPLACE FUNCTION migrate_lesson_examples(p_lesson_id UUID, p_keep_count INTEGER DEFAULT 4)
RETURNS TABLE (
  moved_count INTEGER,
  kept_count INTEGER
) AS $$
DECLARE
  v_example RECORD;
  v_next_position INTEGER;
  v_moved INTEGER := 0;
  v_kept INTEGER := 0;
BEGIN
  -- Get next available position in practice_questions for this lesson
  SELECT COALESCE(MAX(position), 0) + 1 INTO v_next_position
  FROM practice_questions
  WHERE lesson_id = p_lesson_id;

  -- Process examples ordered by position
  FOR v_example IN
    SELECT *
    FROM lesson_examples
    WHERE lesson_id = p_lesson_id
    ORDER BY position ASC
  LOOP
    v_kept := v_kept + 1;

    -- If we've kept enough, start moving to practice
    IF v_kept > p_keep_count THEN
      -- Insert into practice_questions
      INSERT INTO practice_questions (
        lesson_id,
        subject,
        position,
        difficulty,
        title,
        problem_text,
        choices,
        correct_answer,
        answer_explanation,
        solution_steps,
        diagram_svg
      )
      SELECT
        v_example.lesson_id,
        l.subject,
        v_next_position,
        'medium', -- default difficulty
        v_example.title,
        v_example.problem_text,
        v_example.choices,
        v_example.correct_answer,
        v_example.answer_explanation,
        COALESCE(v_example.solution_steps, '[]'::jsonb),
        v_example.diagram_svg
      FROM lessons l
      WHERE l.id = v_example.lesson_id;

      -- Delete from lesson_examples
      DELETE FROM lesson_examples WHERE id = v_example.id;

      v_moved := v_moved + 1;
      v_next_position := v_next_position + 1;
    END IF;
  END LOOP;

  -- Return counts
  moved_count := v_moved;
  kept_count := p_keep_count;
  RETURN NEXT;
END;
$$ LANGUAGE plpgsql;

-- Run migration for all lessons with examples
DO $$
DECLARE
  v_lesson RECORD;
  v_result RECORD;
BEGIN
  RAISE NOTICE 'Starting migration...';
  RAISE NOTICE '';

  FOR v_lesson IN
    SELECT l.id, l.lesson_key, l.title, COUNT(le.*) as example_count
    FROM lessons l
    INNER JOIN lesson_examples le ON le.lesson_id = l.id
    GROUP BY l.id, l.lesson_key, l.title
    HAVING COUNT(le.*) > 4
    ORDER BY l.lesson_key
  LOOP
    RAISE NOTICE 'Migrating: % (% examples)', v_lesson.lesson_key, v_lesson.example_count;

    SELECT * INTO v_result FROM migrate_lesson_examples(v_lesson.id, 4);

    RAISE NOTICE '  Kept: 4 teaching, Moved: % to practice', v_result.moved_count;
  END LOOP;

  RAISE NOTICE '';
  RAISE NOTICE 'Migration complete!';
END $$;

-- Drop the temporary function
DROP FUNCTION migrate_lesson_examples;

-- Re-enable RLS
ALTER TABLE practice_questions ENABLE ROW LEVEL SECURITY;

-- Show final distribution
SELECT
  l.lesson_key,
  l.title,
  COUNT(DISTINCT le.id) as teaching_examples,
  COUNT(DISTINCT pq.id) as practice_questions,
  COUNT(DISTINCT le.id) + COUNT(DISTINCT pq.id) as total
FROM lessons l
LEFT JOIN lesson_examples le ON le.lesson_id = l.id
LEFT JOIN practice_questions pq ON pq.lesson_id = l.id
WHERE l.lesson_key IS NOT NULL
GROUP BY l.id, l.lesson_key, l.title
HAVING COUNT(DISTINCT le.id) > 0 OR COUNT(DISTINCT pq.id) > 0
ORDER BY l.lesson_key;
