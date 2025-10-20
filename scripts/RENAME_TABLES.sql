-- ========================================
-- ACT Prep Database Table Renaming
-- Rename tables for consistent lesson_ prefix
-- ========================================

-- 1. Rename section_content to lesson_section_content
ALTER TABLE section_content RENAME TO lesson_section_content;

-- 2. Rename examples to lesson_examples
ALTER TABLE examples RENAME TO lesson_examples;

-- 3. Rename term_definitions to lesson_term_definitions
ALTER TABLE term_definitions RENAME TO lesson_term_definitions;

-- ========================================
-- Verify table structure
-- ========================================

-- Check lesson_metadata
SELECT COUNT(*) as lesson_count FROM lesson_metadata;

-- Check lesson_sections
SELECT COUNT(*) as section_count FROM lesson_sections;

-- Check lesson_section_content
SELECT COUNT(*) as content_count FROM lesson_section_content;

-- Check lesson_examples
SELECT COUNT(*) as example_count FROM lesson_examples;

-- Check lesson_term_definitions
SELECT COUNT(*) as term_count FROM lesson_term_definitions;

-- ========================================
-- Verify linkages
-- ========================================

-- Find examples without valid lesson_id
SELECT id, title, lesson_id
FROM lesson_examples
WHERE lesson_id NOT IN (SELECT id FROM lesson_metadata)
LIMIT 10;

-- Find term_definitions without valid lesson_key
SELECT id, term, lesson_key
FROM lesson_term_definitions
WHERE lesson_key NOT IN (SELECT lesson_key FROM lesson_metadata)
LIMIT 10;

-- Show examples per lesson
SELECT
  lm.lesson_key,
  lm.title,
  COUNT(le.id) as example_count
FROM lesson_metadata lm
LEFT JOIN lesson_examples le ON lm.id = le.lesson_id
GROUP BY lm.lesson_key, lm.title
ORDER BY example_count DESC;

-- Show terms per lesson
SELECT
  lm.lesson_key,
  lm.title,
  COUNT(td.id) as term_count
FROM lesson_metadata lm
LEFT JOIN lesson_term_definitions td ON lm.lesson_key = td.lesson_key
GROUP BY lm.lesson_key, lm.title
ORDER BY term_count DESC;
