-- ╔═══════════════════════════════════════════════════╗
-- ║   Force Drop Old Empty Tables                     ║
-- ║   Using CASCADE to handle any dependencies        ║
-- ╚═══════════════════════════════════════════════════╝

-- Verified: These tables are EMPTY (0 rows)
-- All data is in the new lesson_* tables

DROP TABLE IF EXISTS section_content CASCADE;
DROP TABLE IF EXISTS examples CASCADE;
DROP TABLE IF EXISTS term_definitions CASCADE;

-- Verify they're gone:
SELECT
  table_name
FROM information_schema.tables
WHERE table_schema = 'public'
  AND table_name IN ('section_content', 'examples', 'term_definitions');
-- Should return 0 rows
