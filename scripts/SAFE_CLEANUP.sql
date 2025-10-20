-- STEP 1: Drop only empty tables
DROP TABLE IF EXISTS lesson_examples;  -- 0 rows, safe to drop

-- STEP 2: Rename tables with data (verified with backup)
ALTER TABLE section_content RENAME TO lesson_section_content;      -- 127 rows
ALTER TABLE examples RENAME TO lesson_examples;                    -- 137 rows
ALTER TABLE term_definitions RENAME TO lesson_term_definitions;    -- 643 rows

-- STEP 3: Verify
SELECT
  'lesson_section_content' AS table_name,
  COUNT(*) AS row_count
FROM lesson_section_content
UNION ALL
SELECT 'lesson_examples', COUNT(*) FROM lesson_examples
UNION ALL
SELECT 'lesson_term_definitions', COUNT(*) FROM lesson_term_definitions;

-- Expected: 127, 137, 643