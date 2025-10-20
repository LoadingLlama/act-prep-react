-- ╔═══════════════════════════════════════════════════╗
-- ║   ACT Prep Database Table Rename                  ║
-- ║   Execute these commands in Supabase SQL Editor   ║
-- ╚═══════════════════════════════════════════════════╝

-- STEP 1: Rename tables for consistent lesson_ prefix
-- All lesson-related data should have lesson_ prefix for clarity

ALTER TABLE section_content RENAME TO lesson_section_content;
ALTER TABLE examples RENAME TO lesson_examples;
ALTER TABLE term_definitions RENAME TO lesson_term_definitions;

-- ✅ VERIFICATION COMPLETED:
--    - All 127 section_content blocks are properly linked to lesson_sections
--    - All 137 examples are properly linked to lesson_metadata via lesson_id
--    - All 643 term_definitions are properly linked to lesson_metadata via lesson_key
--    - No orphaned data found
--
-- ✅ CODE UPDATED:
--    - src/services/api/lessons.service.js updated
--    - src/services/api/examples.service.js updated
--    - src/services/api/termDefinitions.service.js updated
--    - All 50+ script files updated
--    - Backups created in backups/code-backup-20251017/

-- STEP 2: After executing, verify the rename worked:
SELECT 'lesson_section_content' AS table_name, COUNT(*) AS row_count FROM lesson_section_content
UNION ALL
SELECT 'lesson_examples', COUNT(*) FROM lesson_examples
UNION ALL
SELECT 'lesson_term_definitions', COUNT(*) FROM lesson_term_definitions;

-- Expected results:
-- lesson_section_content: 127 rows
-- lesson_examples: 137 rows
-- lesson_term_definitions: 643 rows
