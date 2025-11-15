-- ================================================================
-- CHECK ALL CONSTRAINTS ON diagnostic_test_results
-- ================================================================

-- Check all constraints
SELECT
  conname as constraint_name,
  contype as constraint_type,
  pg_get_constraintdef(oid) as definition
FROM pg_constraint
WHERE conrelid = 'diagnostic_test_results'::regclass
ORDER BY contype, conname;

-- Explain constraint types:
-- p = primary key
-- f = foreign key
-- u = unique constraint
-- c = check constraint
