-- ╔═══════════════════════════════════════════════════╗
-- ║   ACT Prep - Final Table Rename Solution         ║
-- ║   SITUATION: New empty tables exist, old tables  ║
-- ║   have all the data (127, 137, 643 rows)         ║
-- ╚═══════════════════════════════════════════════════╝

-- SOLUTION: Drop empty new tables, rename old tables

-- Step 1: Drop the empty new tables
DROP TABLE IF EXISTS lesson_section_content;
DROP TABLE IF EXISTS lesson_examples;
DROP TABLE IF EXISTS lesson_term_definitions;

-- Step 2: Rename old tables to new names
ALTER TABLE section_content RENAME TO lesson_section_content;
ALTER TABLE examples RENAME TO lesson_examples;
ALTER TABLE term_definitions RENAME TO lesson_term_definitions;

-- Step 3: Verification query
SELECT
  'lesson_section_content' AS table_name,
  COUNT(*) AS row_count
FROM lesson_section_content
UNION ALL
SELECT 'lesson_examples', COUNT(*) FROM lesson_examples
UNION ALL
SELECT 'lesson_term_definitions', COUNT(*) FROM lesson_term_definitions;

-- Expected results:
-- lesson_section_content: 127 rows
-- lesson_examples: 137 rows
-- lesson_term_definitions: 643 rows
