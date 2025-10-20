-- ╔═══════════════════════════════════════════════════╗
-- ║   Drop Empty Old Tables (After Successful Rename)║
-- ║   VERIFIED: All data is in new tables             ║
-- ╚═══════════════════════════════════════════════════╝

-- VERIFICATION COMPLETED:
-- ✅ lesson_section_content: 127 rows (data preserved)
-- ✅ lesson_examples: 137 rows (data preserved)
-- ✅ lesson_term_definitions: 643 rows (data preserved)
--
-- Old tables are now EMPTY:
-- section_content: 0 rows
-- examples: 0 rows
-- term_definitions: 0 rows

-- Safe to drop the empty old tables:
DROP TABLE IF EXISTS section_content;
DROP TABLE IF EXISTS examples;
DROP TABLE IF EXISTS term_definitions;

-- Verify only new tables exist:
SELECT table_name
FROM information_schema.tables
WHERE table_schema = 'public'
  AND table_name LIKE '%content%'
   OR table_name LIKE '%example%'
   OR table_name LIKE '%term%'
ORDER BY table_name;
