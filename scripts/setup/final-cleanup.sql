-- =====================================================
-- FINAL CLEANUP - ADD CONSTRAINTS AND DROP OLD TABLE
-- =====================================================

-- STEP 1: Add foreign key constraints to reading questions
-- =====================================================

ALTER TABLE act_reading_questions
  ADD CONSTRAINT act_reading_questions_passage_id_fkey
  FOREIGN KEY (passage_id) REFERENCES act_reading_passages(id);

-- STEP 2: Add foreign key constraints to science questions
-- =====================================================

ALTER TABLE act_science_questions
  ADD CONSTRAINT act_science_questions_passage_id_fkey
  FOREIGN KEY (passage_id) REFERENCES act_science_passages(id);

-- STEP 3: Add foreign key constraint to english questions
-- =====================================================

ALTER TABLE act_english_questions
  ADD CONSTRAINT act_english_questions_passage_id_fkey
  FOREIGN KEY (passage_id) REFERENCES act_english_passages(id);

-- STEP 4: Drop the old act_passages table
-- =====================================================

DROP TABLE IF EXISTS act_passages CASCADE;

-- =====================================================
-- FINAL TABLE STRUCTURE:
-- =====================================================
--
-- ACT PRACTICE TEST TABLES (act_ prefix):
--   - act_english_questions (75 per test)
--   - act_english_passages (5 per test) ⚠️ Need to create passages
--   - act_math_questions (60 per test)
--   - act_reading_questions (40 per test)
--   - act_reading_passages (4 per test) ✅ Migrated
--   - act_science_questions (40 per test)
--   - act_science_passages (7 per test) ✅ Migrated
--   - act_extraction_progress (admin/meta)
--   - act_questions (legacy unified table - can be dropped later)
--
-- CORE SYSTEM TABLES (no prefix):
--   - lessons (84 total)
--
-- =====================================================
