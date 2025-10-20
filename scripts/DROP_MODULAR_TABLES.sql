-- Drop all deprecated modular lesson tables
-- Run this after verifying the lessons table migration was successful

-- Drop tables in order (respecting dependencies)
DROP TABLE IF EXISTS lesson_sections CASCADE;
DROP TABLE IF EXISTS lesson_section_content CASCADE;
DROP TABLE IF EXISTS lesson_metadata CASCADE;

-- Drop old empty tables
DROP TABLE IF EXISTS section_content CASCADE;
DROP TABLE IF EXISTS examples CASCADE;
DROP TABLE IF EXISTS term_definitions CASCADE;

-- Verify cleanup
SELECT table_name
FROM information_schema.tables
WHERE table_schema = 'public'
  AND table_name LIKE 'lesson%'
ORDER BY table_name;
