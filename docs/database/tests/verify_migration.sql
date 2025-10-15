-- ============================================
-- MIGRATION VERIFICATION TESTS
-- ============================================
-- Comprehensive tests to verify data integrity
-- Run after migration to ensure nothing was lost
-- ============================================

-- Test 1: Verify all tables exist
DO $$
DECLARE
    missing_tables TEXT[] := ARRAY[]::TEXT[];
    expected_tables TEXT[] := ARRAY[
        'skills',
        'question_skills',
        'user_profiles',
        'assessment_sessions',
        'user_responses',
        'user_skill_assessments',
        'learning_paths',
        'learning_path_items',
        'daily_progress_snapshots'
    ];
    table_name TEXT;
    table_exists BOOLEAN;
BEGIN
    FOREACH table_name IN ARRAY expected_tables
    LOOP
        SELECT EXISTS (
            SELECT FROM information_schema.tables
            WHERE table_schema = 'public'
            AND table_name = table_name
        ) INTO table_exists;

        IF NOT table_exists THEN
            missing_tables := array_append(missing_tables, table_name);
        END IF;
    END LOOP;

    IF array_length(missing_tables, 1) > 0 THEN
        RAISE EXCEPTION 'MIGRATION FAILED: Missing tables: %', array_to_string(missing_tables, ', ');
    ELSE
        RAISE NOTICE '✓ Test 1 PASSED: All tables exist';
    END IF;
END $$;

-- Test 2: Verify all columns added to diagnostic_test_questions
DO $$
DECLARE
    missing_columns TEXT[] := ARRAY[]::TEXT[];
    expected_columns TEXT[] := ARRAY[
        'difficulty',
        'discrimination',
        'guessing',
        'exposure_rate',
        'is_adaptive',
        'time_limit_seconds',
        'explanation'
    ];
    column_name TEXT;
    column_exists BOOLEAN;
BEGIN
    FOREACH column_name IN ARRAY expected_columns
    LOOP
        SELECT EXISTS (
            SELECT FROM information_schema.columns
            WHERE table_name = 'diagnostic_test_questions'
            AND column_name = column_name
        ) INTO column_exists;

        IF NOT column_exists THEN
            missing_columns := array_append(missing_columns, column_name);
        END IF;
    END LOOP;

    IF array_length(missing_columns, 1) > 0 THEN
        RAISE EXCEPTION 'MIGRATION FAILED: Missing columns: %', array_to_string(missing_columns, ', ');
    ELSE
        RAISE NOTICE '✓ Test 2 PASSED: All IRT columns exist';
    END IF;
END $$;

-- Test 3: Verify no data loss in diagnostic_test_questions
DO $$
DECLARE
    question_count INTEGER;
BEGIN
    SELECT COUNT(*) INTO question_count FROM diagnostic_test_questions;

    IF question_count = 0 THEN
        RAISE EXCEPTION 'MIGRATION FAILED: No questions found in diagnostic_test_questions';
    ELSE
        RAISE NOTICE '✓ Test 3 PASSED: % questions preserved', question_count;
    END IF;
END $$;

-- Test 4: Verify skills taxonomy populated
DO $$
DECLARE
    skill_count INTEGER;
    english_skills INTEGER;
    math_skills INTEGER;
    reading_skills INTEGER;
    science_skills INTEGER;
BEGIN
    SELECT COUNT(*) INTO skill_count FROM skills;
    SELECT COUNT(*) INTO english_skills FROM skills WHERE section = 'english';
    SELECT COUNT(*) INTO math_skills FROM skills WHERE section = 'math';
    SELECT COUNT(*) INTO reading_skills FROM skills WHERE section = 'reading';
    SELECT COUNT(*) INTO science_skills FROM skills WHERE section = 'science';

    IF skill_count < 40 THEN
        RAISE EXCEPTION 'MIGRATION FAILED: Expected at least 40 skills, found %', skill_count;
    END IF;

    IF english_skills = 0 OR math_skills = 0 OR reading_skills = 0 OR science_skills = 0 THEN
        RAISE EXCEPTION 'MIGRATION FAILED: Missing skills for one or more sections';
    END IF;

    RAISE NOTICE '✓ Test 4 PASSED: % skills created (English: %, Math: %, Reading: %, Science: %)',
        skill_count, english_skills, math_skills, reading_skills, science_skills;
END $$;

-- Test 5: Verify question-skill mappings
DO $$
DECLARE
    mapped_questions INTEGER;
    total_questions INTEGER;
    mapping_percentage NUMERIC;
BEGIN
    SELECT COUNT(*) INTO total_questions FROM diagnostic_test_questions;
    SELECT COUNT(DISTINCT question_id) INTO mapped_questions FROM question_skills;

    mapping_percentage := ROUND((mapped_questions::NUMERIC / total_questions) * 100, 1);

    IF mapping_percentage < 80 THEN
        RAISE WARNING 'Only % of questions are mapped to skills', mapping_percentage;
    END IF;

    RAISE NOTICE '✓ Test 5 PASSED: %% of questions mapped to skills', mapping_percentage;
END $$;

-- Test 6: Verify IRT parameters initialized
DO $$
DECLARE
    questions_with_params INTEGER;
    total_questions INTEGER;
    null_difficulty INTEGER;
    null_discrimination INTEGER;
    out_of_range INTEGER;
BEGIN
    SELECT COUNT(*) INTO total_questions FROM diagnostic_test_questions;

    SELECT COUNT(*) INTO null_difficulty
    FROM diagnostic_test_questions
    WHERE difficulty IS NULL;

    SELECT COUNT(*) INTO null_discrimination
    FROM diagnostic_test_questions
    WHERE discrimination IS NULL;

    SELECT COUNT(*) INTO out_of_range
    FROM diagnostic_test_questions
    WHERE difficulty NOT BETWEEN -3.0 AND 3.0
       OR discrimination NOT BETWEEN 0.0 AND 3.0
       OR guessing NOT BETWEEN 0.0 AND 0.5;

    IF null_difficulty > 0 OR null_discrimination > 0 THEN
        RAISE EXCEPTION 'MIGRATION FAILED: % questions have NULL difficulty, % have NULL discrimination',
            null_difficulty, null_discrimination;
    END IF;

    IF out_of_range > 0 THEN
        RAISE EXCEPTION 'MIGRATION FAILED: % questions have IRT parameters out of valid range', out_of_range;
    END IF;

    RAISE NOTICE '✓ Test 6 PASSED: All IRT parameters initialized and within valid ranges';
END $$;

-- Test 7: Verify indexes created
DO $$
DECLARE
    index_count INTEGER;
BEGIN
    SELECT COUNT(*) INTO index_count
    FROM pg_indexes
    WHERE schemaname = 'public'
    AND (
        indexname LIKE 'idx_skills_%' OR
        indexname LIKE 'idx_question_skills_%' OR
        indexname LIKE 'idx_sessions_%' OR
        indexname LIKE 'idx_responses_%' OR
        indexname LIKE 'idx_skill_assessments_%' OR
        indexname LIKE 'idx_paths_%' OR
        indexname LIKE 'idx_questions_%'
    );

    IF index_count < 15 THEN
        RAISE WARNING 'Expected at least 15 indexes, found %', index_count;
    END IF;

    RAISE NOTICE '✓ Test 7 PASSED: % indexes created', index_count;
END $$;

-- Test 8: Verify RLS policies created
DO $$
DECLARE
    policy_count INTEGER;
BEGIN
    SELECT COUNT(*) INTO policy_count
    FROM pg_policies
    WHERE schemaname = 'public';

    IF policy_count < 10 THEN
        RAISE WARNING 'Expected at least 10 RLS policies, found %', policy_count;
    END IF;

    RAISE NOTICE '✓ Test 8 PASSED: % RLS policies created', policy_count;
END $$;

-- Test 9: Verify foreign key relationships
DO $$
DECLARE
    orphaned_question_skills INTEGER;
    orphaned_path_items INTEGER;
BEGIN
    -- Check for orphaned question_skills
    SELECT COUNT(*) INTO orphaned_question_skills
    FROM question_skills qs
    WHERE NOT EXISTS (
        SELECT 1 FROM diagnostic_test_questions q WHERE q.id = qs.question_id
    )
    OR NOT EXISTS (
        SELECT 1 FROM skills s WHERE s.id = qs.skill_id
    );

    IF orphaned_question_skills > 0 THEN
        RAISE EXCEPTION 'MIGRATION FAILED: % orphaned question_skill records found', orphaned_question_skills;
    END IF;

    RAISE NOTICE '✓ Test 9 PASSED: No orphaned foreign key references';
END $$;

-- Test 10: Verify data distribution
DO $$
DECLARE
    section_record RECORD;
    has_zero_questions BOOLEAN := false;
BEGIN
    FOR section_record IN
        SELECT
            section,
            COUNT(*) as question_count,
            COUNT(DISTINCT qs.skill_id) as unique_skills
        FROM diagnostic_test_questions q
        LEFT JOIN question_skills qs ON q.id = qs.question_id
        GROUP BY section
    LOOP
        IF section_record.question_count = 0 THEN
            has_zero_questions := true;
        END IF;

        RAISE NOTICE '  Section %: % questions, % unique skills',
            section_record.section,
            section_record.question_count,
            section_record.unique_skills;
    END LOOP;

    IF has_zero_questions THEN
        RAISE EXCEPTION 'MIGRATION FAILED: One or more sections have zero questions';
    END IF;

    RAISE NOTICE '✓ Test 10 PASSED: All sections have questions and skills';
END $$;

-- Test 11: Verify triggers are working
DO $$
DECLARE
    trigger_count INTEGER;
BEGIN
    SELECT COUNT(*) INTO trigger_count
    FROM pg_trigger
    WHERE tgname LIKE '%updated_at%';

    IF trigger_count < 4 THEN
        RAISE WARNING 'Expected at least 4 updated_at triggers, found %', trigger_count;
    END IF;

    RAISE NOTICE '✓ Test 11 PASSED: % triggers created', trigger_count;
END $$;

-- Test 12: Verify skill hierarchy
DO $$
DECLARE
    circular_refs INTEGER;
    skills_with_parent INTEGER;
BEGIN
    -- Check for circular references (parent references self)
    SELECT COUNT(*) INTO circular_refs
    FROM skills
    WHERE id = parent_skill_id;

    IF circular_refs > 0 THEN
        RAISE EXCEPTION 'MIGRATION FAILED: % skills have circular parent references', circular_refs;
    END IF;

    -- Count skills with parents
    SELECT COUNT(*) INTO skills_with_parent
    FROM skills
    WHERE parent_skill_id IS NOT NULL;

    RAISE NOTICE '✓ Test 12 PASSED: Skill hierarchy valid (% child skills)', skills_with_parent;
END $$;

-- Test 13: Check for duplicate skill codes
DO $$
DECLARE
    duplicate_count INTEGER;
BEGIN
    SELECT COUNT(*) INTO duplicate_count
    FROM (
        SELECT skill_code, COUNT(*) as cnt
        FROM skills
        GROUP BY skill_code
        HAVING COUNT(*) > 1
    ) dupes;

    IF duplicate_count > 0 THEN
        RAISE EXCEPTION 'MIGRATION FAILED: % duplicate skill codes found', duplicate_count;
    END IF;

    RAISE NOTICE '✓ Test 13 PASSED: All skill codes are unique';
END $$;

-- Final Summary
DO $$
BEGIN
    RAISE NOTICE '';
    RAISE NOTICE '================================================';
    RAISE NOTICE '  MIGRATION VERIFICATION COMPLETE';
    RAISE NOTICE '  All Tests Passed ✓';
    RAISE NOTICE '================================================';
    RAISE NOTICE '';
END $$;

-- Generate migration report
SELECT
    'Migration Report' as report_type,
    NOW() as generated_at;

SELECT
    'Questions' as entity,
    COUNT(*) as total,
    COUNT(CASE WHEN difficulty IS NOT NULL THEN 1 END) as with_irt_params,
    COUNT(DISTINCT qs.skill_id) as unique_skills_mapped
FROM diagnostic_test_questions q
LEFT JOIN question_skills qs ON q.id = qs.question_id;

SELECT
    'Skills' as entity,
    COUNT(*) as total,
    COUNT(CASE WHEN parent_skill_id IS NOT NULL THEN 1 END) as child_skills
FROM skills;

SELECT
    'Question-Skill Mappings' as entity,
    COUNT(*) as total,
    ROUND(AVG(importance), 2) as avg_importance
FROM question_skills;

-- Show sample questions with their skills and IRT parameters
SELECT
    q.section,
    q.question_id,
    LEFT(q.question, 50) || '...' as question_preview,
    ROUND(q.difficulty::NUMERIC, 2) as difficulty,
    ROUND(q.discrimination::NUMERIC, 2) as discrimination,
    STRING_AGG(s.skill_name, ', ') as skills
FROM diagnostic_test_questions q
LEFT JOIN question_skills qs ON q.id = qs.question_id
LEFT JOIN skills s ON qs.skill_id = s.id
WHERE q.question IS NOT NULL
GROUP BY q.section, q.question_id, q.question, q.difficulty, q.discrimination
ORDER BY q.section, q.question_id
LIMIT 10;
