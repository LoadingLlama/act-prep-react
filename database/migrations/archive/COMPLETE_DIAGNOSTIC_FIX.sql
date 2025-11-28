-- ================================================================
-- COMPLETE DIAGNOSTIC TEST FIX
-- ================================================================
-- This script fixes ALL issues preventing the diagnostic test from working:
-- 1. Adds missing upsert constraint for saving answers
-- 2. Maps all 75 English questions to lessons (currently 0/75 mapped)
-- 3. Verifies Math/Reading/Science are already mapped (140/140)
-- ================================================================

-- ================================================================
-- PART 1: FIX DIAGNOSTIC ANSWER SAVING
-- ================================================================

DO $$
BEGIN
  -- Add unique constraint for upsert operations
  IF NOT EXISTS (
    SELECT 1 FROM pg_constraint
    WHERE conname = 'diagnostic_test_results_session_question_unique'
  ) THEN
    ALTER TABLE diagnostic_test_results
      ADD CONSTRAINT diagnostic_test_results_session_question_unique
      UNIQUE (diagnostic_session_id, question_id);
    RAISE NOTICE '✅ Added upsert constraint - diagnostic answers will now save correctly';
  ELSE
    RAISE NOTICE '✓ Upsert constraint already exists';
  END IF;
END $$;

-- ================================================================
-- PART 2: MAP ALL ENGLISH QUESTIONS TO LESSONS
-- ================================================================

DO $$
DECLARE
  -- English lesson IDs
  topic_1_1 UUID; -- Building Complete Sentences
  topic_1_2 UUID; -- Essential Comma Rules
  topic_1_3 UUID; -- Advanced Punctuation
  topic_1_4 UUID; -- Verbs
  topic_1_5 UUID; -- Pronouns
  topic_1_6 UUID; -- Misplaced Modifiers
  topic_1_7 UUID; -- Parallel Structure
  topic_1_8 UUID; -- Miscellaneous Topics
  topic_2_1 UUID; -- Redundancy & Wordiness
  topic_2_2 UUID; -- Word Choice
  topic_2_3 UUID; -- Transitions
  topic_2_4 UUID; -- Which Choice Questions
  topic_2_5 UUID; -- Adding or Deleting Information
  topic_2_6 UUID; -- Logical Placement

  -- Counters
  updated_count INTEGER := 0;
  before_count INTEGER := 0;
  after_count INTEGER := 0;
BEGIN
  RAISE NOTICE '';
  RAISE NOTICE '=== MAPPING ENGLISH QUESTIONS TO LESSONS ===';
  RAISE NOTICE '';

  -- Count unmapped questions before
  SELECT COUNT(*) INTO before_count
  FROM practice_test_english_questions
  WHERE test_number = 1 AND lesson_id IS NULL;

  RAISE NOTICE 'English questions without lesson_id: %', before_count;

  -- Get lesson IDs from the lessons table (case-insensitive)
  SELECT id INTO topic_1_1 FROM lessons WHERE LOWER(title) = LOWER('Topic 1.1 - Building Complete Sentences');
  SELECT id INTO topic_1_2 FROM lessons WHERE LOWER(title) = LOWER('Topic 1.2 - Essential Comma Rules');
  SELECT id INTO topic_1_3 FROM lessons WHERE LOWER(title) = LOWER('Topic 1.3 - Advanced Punctuation');
  SELECT id INTO topic_1_4 FROM lessons WHERE LOWER(title) = LOWER('Topic 1.4 - Verbs');
  SELECT id INTO topic_1_5 FROM lessons WHERE LOWER(title) = LOWER('Topic 1.5 - Pronouns');
  SELECT id INTO topic_1_6 FROM lessons WHERE LOWER(title) = LOWER('Topic 1.6 - Misplaced Modifiers');
  SELECT id INTO topic_1_7 FROM lessons WHERE LOWER(title) = LOWER('Topic 1.7 - Parallel Structure');
  SELECT id INTO topic_1_8 FROM lessons WHERE LOWER(title) = LOWER('Topic 1.8 - Miscellaneous Topics');
  SELECT id INTO topic_2_1 FROM lessons WHERE LOWER(title) = LOWER('Topic 2.1 - Redundancy & Wordiness');
  SELECT id INTO topic_2_2 FROM lessons WHERE LOWER(title) = LOWER('Topic 2.2 - Word Choice');
  SELECT id INTO topic_2_3 FROM lessons WHERE LOWER(title) = LOWER('Topic 2.3 - Transitions');
  SELECT id INTO topic_2_4 FROM lessons WHERE LOWER(title) = LOWER('Topic 2.4 - Which Choice Questions');
  SELECT id INTO topic_2_5 FROM lessons WHERE LOWER(title) = LOWER('Topic 2.5 - Adding or Deleting Information');
  SELECT id INTO topic_2_6 FROM lessons WHERE LOWER(title) = LOWER('Topic 2.6 - Logical Placement');

  -- Verify we found all lessons
  IF topic_1_1 IS NULL THEN RAISE EXCEPTION 'Could not find lesson: Topic 1.1 - Building Complete Sentences'; END IF;
  IF topic_1_2 IS NULL THEN RAISE EXCEPTION 'Could not find lesson: Topic 1.2 - Essential Comma Rules'; END IF;
  IF topic_1_3 IS NULL THEN RAISE EXCEPTION 'Could not find lesson: Topic 1.3 - Advanced Punctuation'; END IF;
  IF topic_1_4 IS NULL THEN RAISE EXCEPTION 'Could not find lesson: Topic 1.4 - Verbs'; END IF;
  IF topic_1_5 IS NULL THEN RAISE EXCEPTION 'Could not find lesson: Topic 1.5 - Pronouns'; END IF;
  IF topic_1_6 IS NULL THEN RAISE EXCEPTION 'Could not find lesson: Topic 1.6 - Misplaced Modifiers'; END IF;
  IF topic_1_7 IS NULL THEN RAISE EXCEPTION 'Could not find lesson: Topic 1.7 - Parallel Structure'; END IF;
  IF topic_1_8 IS NULL THEN RAISE EXCEPTION 'Could not find lesson: Topic 1.8 - Miscellaneous Topics'; END IF;
  IF topic_2_1 IS NULL THEN RAISE EXCEPTION 'Could not find lesson: Topic 2.1 - Redundancy & Wordiness'; END IF;
  IF topic_2_2 IS NULL THEN RAISE EXCEPTION 'Could not find lesson: Topic 2.2 - Word Choice'; END IF;
  IF topic_2_3 IS NULL THEN RAISE EXCEPTION 'Could not find lesson: Topic 2.3 - Transitions'; END IF;
  IF topic_2_4 IS NULL THEN RAISE EXCEPTION 'Could not find lesson: Topic 2.4 - Which Choice Questions'; END IF;
  IF topic_2_5 IS NULL THEN RAISE EXCEPTION 'Could not find lesson: Topic 2.5 - Adding or Deleting Information'; END IF;
  IF topic_2_6 IS NULL THEN RAISE EXCEPTION 'Could not find lesson: Topic 2.6 - Logical Placement'; END IF;

  RAISE NOTICE '✓ Found all 14 English lessons';
  RAISE NOTICE '';
  RAISE NOTICE 'Mapping questions by chapter number...';

  -- ============================================================
  -- SINGLE CHAPTER MAPPINGS
  -- ============================================================

  -- Chapter 1 → Building Complete Sentences (sentence structure)
  UPDATE practice_test_english_questions SET lesson_id = topic_1_1
  WHERE test_number = 1 AND chapter = '1' AND lesson_id IS NULL;
  GET DIAGNOSTICS updated_count = ROW_COUNT;
  RAISE NOTICE '  Chapter 1 → Building Complete Sentences: % questions', updated_count;

  -- Chapter 2 → Essential Comma Rules (punctuation/commas)
  UPDATE practice_test_english_questions SET lesson_id = topic_1_2
  WHERE test_number = 1 AND chapter = '2' AND lesson_id IS NULL;
  GET DIAGNOSTICS updated_count = ROW_COUNT;
  RAISE NOTICE '  Chapter 2 → Essential Comma Rules: % questions', updated_count;

  -- Chapter 3 → Pronouns (grammar/pronouns)
  UPDATE practice_test_english_questions SET lesson_id = topic_1_5
  WHERE test_number = 1 AND chapter = '3' AND lesson_id IS NULL;
  GET DIAGNOSTICS updated_count = ROW_COUNT;
  RAISE NOTICE '  Chapter 3 → Pronouns: % questions', updated_count;

  -- Chapter 4 → Misplaced Modifiers
  UPDATE practice_test_english_questions SET lesson_id = topic_1_6
  WHERE test_number = 1 AND chapter = '4' AND lesson_id IS NULL;
  GET DIAGNOSTICS updated_count = ROW_COUNT;
  RAISE NOTICE '  Chapter 4 → Misplaced Modifiers: % questions', updated_count;

  -- Chapter 5 → Verbs
  UPDATE practice_test_english_questions SET lesson_id = topic_1_4
  WHERE test_number = 1 AND chapter = '5' AND lesson_id IS NULL;
  GET DIAGNOSTICS updated_count = ROW_COUNT;
  RAISE NOTICE '  Chapter 5 → Verbs: % questions', updated_count;

  -- Chapter 6 → Word Choice
  UPDATE practice_test_english_questions SET lesson_id = topic_2_2
  WHERE test_number = 1 AND chapter = '6' AND lesson_id IS NULL;
  GET DIAGNOSTICS updated_count = ROW_COUNT;
  RAISE NOTICE '  Chapter 6 → Word Choice: % questions', updated_count;

  -- Chapter 7 → Logical Placement (organization)
  UPDATE practice_test_english_questions SET lesson_id = topic_2_6
  WHERE test_number = 1 AND chapter = '7' AND lesson_id IS NULL;
  GET DIAGNOSTICS updated_count = ROW_COUNT;
  RAISE NOTICE '  Chapter 7 → Logical Placement: % questions', updated_count;

  -- Chapter 8 → Transitions
  UPDATE practice_test_english_questions SET lesson_id = topic_2_3
  WHERE test_number = 1 AND chapter = '8' AND lesson_id IS NULL;
  GET DIAGNOSTICS updated_count = ROW_COUNT;
  RAISE NOTICE '  Chapter 8 → Transitions: % questions', updated_count;

  -- Chapter 10 → Parallel Structure
  UPDATE practice_test_english_questions SET lesson_id = topic_1_7
  WHERE test_number = 1 AND chapter = '10' AND lesson_id IS NULL;
  GET DIAGNOSTICS updated_count = ROW_COUNT;
  RAISE NOTICE '  Chapter 10 → Parallel Structure: % questions', updated_count;

  -- Chapter 11 → Redundancy & Wordiness
  UPDATE practice_test_english_questions SET lesson_id = topic_2_1
  WHERE test_number = 1 AND chapter = '11' AND lesson_id IS NULL;
  GET DIAGNOSTICS updated_count = ROW_COUNT;
  RAISE NOTICE '  Chapter 11 → Redundancy & Wordiness: % questions', updated_count;

  -- Chapter 12 → Advanced Punctuation
  UPDATE practice_test_english_questions SET lesson_id = topic_1_3
  WHERE test_number = 1 AND chapter = '12' AND lesson_id IS NULL;
  GET DIAGNOSTICS updated_count = ROW_COUNT;
  RAISE NOTICE '  Chapter 12 → Advanced Punctuation: % questions', updated_count;

  -- Chapter 13 → Which Choice Questions (most common for this chapter)
  UPDATE practice_test_english_questions SET lesson_id = topic_2_4
  WHERE test_number = 1 AND chapter = '13' AND lesson_id IS NULL;
  GET DIAGNOSTICS updated_count = ROW_COUNT;
  RAISE NOTICE '  Chapter 13 → Which Choice Questions: % questions', updated_count;

  -- Chapter 14 → Miscellaneous Topics
  UPDATE practice_test_english_questions SET lesson_id = topic_1_8
  WHERE test_number = 1 AND chapter = '14' AND lesson_id IS NULL;
  GET DIAGNOSTICS updated_count = ROW_COUNT;
  RAISE NOTICE '  Chapter 14 → Miscellaneous Topics: % questions', updated_count;

  -- Chapter 15 → Miscellaneous Topics
  UPDATE practice_test_english_questions SET lesson_id = topic_1_8
  WHERE test_number = 1 AND chapter = '15' AND lesson_id IS NULL;
  GET DIAGNOSTICS updated_count = ROW_COUNT;
  RAISE NOTICE '  Chapter 15 → Miscellaneous Topics: % questions', updated_count;

  -- ============================================================
  -- MULTI-CHAPTER MAPPINGS (questions that test multiple concepts)
  -- ============================================================
  RAISE NOTICE '';
  RAISE NOTICE 'Mapping multi-chapter questions (use first chapter)...';

  -- "1, x" → Building Complete Sentences
  UPDATE practice_test_english_questions SET lesson_id = topic_1_1
  WHERE test_number = 1 AND chapter LIKE '1,%' AND lesson_id IS NULL;
  GET DIAGNOSTICS updated_count = ROW_COUNT;
  RAISE NOTICE '  "1,..." → Building Complete Sentences: % questions', updated_count;

  -- "2, x" → Essential Comma Rules
  UPDATE practice_test_english_questions SET lesson_id = topic_1_2
  WHERE test_number = 1 AND chapter LIKE '2,%' AND lesson_id IS NULL;
  GET DIAGNOSTICS updated_count = ROW_COUNT;
  RAISE NOTICE '  "2,..." → Essential Comma Rules: % questions', updated_count;

  -- "3, x" → Pronouns
  UPDATE practice_test_english_questions SET lesson_id = topic_1_5
  WHERE test_number = 1 AND chapter LIKE '3,%' AND lesson_id IS NULL;
  GET DIAGNOSTICS updated_count = ROW_COUNT;
  RAISE NOTICE '  "3,..." → Pronouns: % questions', updated_count;

  -- Handle questions with NULL chapter → assign to Miscellaneous
  UPDATE practice_test_english_questions SET lesson_id = topic_1_8
  WHERE test_number = 1 AND chapter IS NULL AND lesson_id IS NULL;
  GET DIAGNOSTICS updated_count = ROW_COUNT;
  RAISE NOTICE '  NULL chapter → Miscellaneous Topics: % questions', updated_count;

  -- Count mapped questions after
  SELECT COUNT(*) INTO after_count
  FROM practice_test_english_questions
  WHERE test_number = 1 AND lesson_id IS NOT NULL;

  RAISE NOTICE '';
  RAISE NOTICE '✅ English mapping complete!';
  RAISE NOTICE '   Mapped: % / 75 questions (%.1%%)', after_count, (after_count::FLOAT / 75 * 100);

  IF after_count < 75 THEN
    RAISE NOTICE '   ⚠️  Still % unmapped questions - check chapter values', 75 - after_count;
  END IF;
END $$;

-- ================================================================
-- PART 3: VERIFICATION & SUMMARY
-- ================================================================

DO $$
DECLARE
  english_mapped INTEGER;
  math_mapped INTEGER;
  reading_mapped INTEGER;
  science_mapped INTEGER;
  total_mapped INTEGER;
BEGIN
  RAISE NOTICE '';
  RAISE NOTICE '=== FINAL VERIFICATION ===';
  RAISE NOTICE '';

  -- Count mapped questions by section
  SELECT COUNT(*) INTO english_mapped FROM practice_test_english_questions WHERE test_number = 1 AND lesson_id IS NOT NULL;
  SELECT COUNT(*) INTO math_mapped FROM practice_test_math_questions WHERE test_number = 1 AND lesson_id IS NOT NULL;
  SELECT COUNT(*) INTO reading_mapped FROM practice_test_reading_questions WHERE test_number = 1 AND lesson_id IS NOT NULL;
  SELECT COUNT(*) INTO science_mapped FROM practice_test_science_questions WHERE test_number = 1 AND lesson_id IS NOT NULL;

  total_mapped := english_mapped + math_mapped + reading_mapped + science_mapped;

  RAISE NOTICE 'English:  % / 75  (%.1%%)', english_mapped, (english_mapped::FLOAT / 75 * 100);
  RAISE NOTICE 'Math:     % / 60  (%.1%%)', math_mapped, (math_mapped::FLOAT / 60 * 100);
  RAISE NOTICE 'Reading:  % / 40  (%.1%%)', reading_mapped, (reading_mapped::FLOAT / 40 * 100);
  RAISE NOTICE 'Science:  % / 40  (%.1%%)', science_mapped, (science_mapped::FLOAT / 40 * 100);
  RAISE NOTICE '';
  RAISE NOTICE 'TOTAL:    % / 215 (%.1%%)', total_mapped, (total_mapped::FLOAT / 215 * 100);
  RAISE NOTICE '';

  IF total_mapped = 215 THEN
    RAISE NOTICE '✅ ✅ ✅ ALL QUESTIONS MAPPED! ✅ ✅ ✅';
    RAISE NOTICE '';
    RAISE NOTICE 'The diagnostic test is now fully functional!';
    RAISE NOTICE 'Next steps:';
    RAISE NOTICE '  1. Refresh your app (the dev server should auto-reload)';
    RAISE NOTICE '  2. Take the diagnostic test';
    RAISE NOTICE '  3. Your learning path will include ALL weak areas from ALL sections';
  ELSE
    RAISE NOTICE '⚠️  % questions still unmapped', 215 - total_mapped;
  END IF;
END $$;

-- Show sample mapping results
SELECT
  'English Sample Mapping' as info,
  question_number,
  chapter,
  l.title as mapped_to_lesson
FROM practice_test_english_questions q
LEFT JOIN lessons l ON q.lesson_id = l.id
WHERE q.test_number = 1
ORDER BY q.question_number
LIMIT 10;
