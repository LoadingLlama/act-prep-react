-- ============================================
-- QUESTION-SKILL MAPPING - SEED DATA
-- ============================================
-- Maps existing diagnostic questions to skills
-- Uses lesson_title to infer skill relationships
-- ============================================

-- Temporary function to help with mapping
CREATE OR REPLACE FUNCTION map_question_to_skill(
    p_lesson_title TEXT,
    p_section TEXT
) RETURNS UUID AS $$
DECLARE
    v_skill_id UUID;
BEGIN
    -- English mappings
    IF p_section = 'english' THEN
        CASE
            WHEN p_lesson_title ILIKE '%sentence structure%' OR
                 p_lesson_title ILIKE '%complete sentence%' THEN
                SELECT id INTO v_skill_id FROM skills WHERE skill_code = 'ENG_SENT_STRUCT';
            WHEN p_lesson_title ILIKE '%comma%' THEN
                SELECT id INTO v_skill_id FROM skills WHERE skill_code = 'ENG_COMMAS';
            WHEN p_lesson_title ILIKE '%semicolon%' THEN
                SELECT id INTO v_skill_id FROM skills WHERE skill_code = 'ENG_SEMICOLONS';
            WHEN p_lesson_title ILIKE '%colon%' THEN
                SELECT id INTO v_skill_id FROM skills WHERE skill_code = 'ENG_COLONS';
            WHEN p_lesson_title ILIKE '%apostrophe%' THEN
                SELECT id INTO v_skill_id FROM skills WHERE skill_code = 'ENG_APOSTROPHES';
            WHEN p_lesson_title ILIKE '%punctuation%' THEN
                SELECT id INTO v_skill_id FROM skills WHERE skill_code = 'ENG_PUNCTUATION';
            WHEN p_lesson_title ILIKE '%verb%' THEN
                SELECT id INTO v_skill_id FROM skills WHERE skill_code = 'ENG_VERBS';
            WHEN p_lesson_title ILIKE '%pronoun%' THEN
                SELECT id INTO v_skill_id FROM skills WHERE skill_code = 'ENG_PRONOUNS';
            WHEN p_lesson_title ILIKE '%modifier%' THEN
                SELECT id INTO v_skill_id FROM skills WHERE skill_code = 'ENG_MODIFIERS';
            WHEN p_lesson_title ILIKE '%parallel%' THEN
                SELECT id INTO v_skill_id FROM skills WHERE skill_code = 'ENG_PARALLEL';
            WHEN p_lesson_title ILIKE '%redundancy%' OR p_lesson_title ILIKE '%wordiness%' THEN
                SELECT id INTO v_skill_id FROM skills WHERE skill_code = 'ENG_REDUNDANCY';
            WHEN p_lesson_title ILIKE '%transition%' THEN
                SELECT id INTO v_skill_id FROM skills WHERE skill_code = 'ENG_TRANSITIONS';
            WHEN p_lesson_title ILIKE '%add%' OR p_lesson_title ILIKE '%delet%' THEN
                SELECT id INTO v_skill_id FROM skills WHERE skill_code = 'ENG_ADD_DELETE';
            WHEN p_lesson_title ILIKE '%placement%' OR p_lesson_title ILIKE '%organization%' THEN
                SELECT id INTO v_skill_id FROM skills WHERE skill_code = 'ENG_PLACEMENT';
            ELSE
                -- Default to general grammar
                SELECT id INTO v_skill_id FROM skills WHERE skill_code = 'ENG_GRAMMAR';
        END CASE;

    -- Math mappings
    ELSIF p_section = 'math' THEN
        CASE
            WHEN p_lesson_title ILIKE '%angle%' OR p_lesson_title ILIKE '%line%' THEN
                SELECT id INTO v_skill_id FROM skills WHERE skill_code = 'MATH_ANGLES';
            WHEN p_lesson_title ILIKE '%triangle%' THEN
                SELECT id INTO v_skill_id FROM skills WHERE skill_code = 'MATH_TRIANGLES';
            WHEN p_lesson_title ILIKE '%area%' OR p_lesson_title ILIKE '%volume%' THEN
                SELECT id INTO v_skill_id FROM skills WHERE skill_code = 'MATH_AREA_VOLUME';
            WHEN p_lesson_title ILIKE '%fraction%' THEN
                SELECT id INTO v_skill_id FROM skills WHERE skill_code = 'MATH_FRACTIONS';
            WHEN p_lesson_title ILIKE '%percent%' THEN
                SELECT id INTO v_skill_id FROM skills WHERE skill_code = 'MATH_PERCENTAGES';
            WHEN p_lesson_title ILIKE '%ratio%' OR p_lesson_title ILIKE '%proportion%' THEN
                SELECT id INTO v_skill_id FROM skills WHERE skill_code = 'MATH_RATIOS';
            WHEN p_lesson_title ILIKE '%slope%' OR p_lesson_title ILIKE '%line%' THEN
                SELECT id INTO v_skill_id FROM skills WHERE skill_code = 'MATH_LINES';
            WHEN p_lesson_title ILIKE '%quadratic%' THEN
                SELECT id INTO v_skill_id FROM skills WHERE skill_code = 'MATH_QUADRATICS';
            WHEN p_lesson_title ILIKE '%function%' THEN
                SELECT id INTO v_skill_id FROM skills WHERE skill_code = 'MATH_FUNCTIONS';
            WHEN p_lesson_title ILIKE '%trig%' THEN
                SELECT id INTO v_skill_id FROM skills WHERE skill_code = 'MATH_TRIG_BASIC';
            WHEN p_lesson_title ILIKE '%exponent%' OR p_lesson_title ILIKE '%radical%' THEN
                SELECT id INTO v_skill_id FROM skills WHERE skill_code = 'MATH_EXPONENTS';
            WHEN p_lesson_title ILIKE '%system%' OR p_lesson_title ILIKE '%equation%' THEN
                SELECT id INTO v_skill_id FROM skills WHERE skill_code = 'MATH_SYSTEMS';
            WHEN p_lesson_title ILIKE '%statistic%' OR p_lesson_title ILIKE '%mean%' OR p_lesson_title ILIKE '%median%' THEN
                SELECT id INTO v_skill_id FROM skills WHERE skill_code = 'MATH_STATISTICS';
            ELSE
                -- Default to pre-algebra
                SELECT id INTO v_skill_id FROM skills WHERE skill_code = 'MATH_PRE_ALG';
        END CASE;

    -- Reading mappings
    ELSIF p_section = 'reading' THEN
        CASE
            WHEN p_lesson_title ILIKE '%main idea%' OR p_lesson_title ILIKE '%theme%' THEN
                SELECT id INTO v_skill_id FROM skills WHERE skill_code = 'READ_MAIN_IDEA';
            WHEN p_lesson_title ILIKE '%detail%' THEN
                SELECT id INTO v_skill_id FROM skills WHERE skill_code = 'READ_DETAILS';
            WHEN p_lesson_title ILIKE '%inference%' OR p_lesson_title ILIKE '%implication%' THEN
                SELECT id INTO v_skill_id FROM skills WHERE skill_code = 'READ_INFERENCE';
            WHEN p_lesson_title ILIKE '%vocabulary%' OR p_lesson_title ILIKE '%context%' THEN
                SELECT id INTO v_skill_id FROM skills WHERE skill_code = 'READ_VOCAB';
            WHEN p_lesson_title ILIKE '%purpose%' OR p_lesson_title ILIKE '%author%' THEN
                SELECT id INTO v_skill_id FROM skills WHERE skill_code = 'READ_PURPOSE';
            WHEN p_lesson_title ILIKE '%compar%' THEN
                SELECT id INTO v_skill_id FROM skills WHERE skill_code = 'READ_COMPARISON';
            ELSE
                -- Default to main idea
                SELECT id INTO v_skill_id FROM skills WHERE skill_code = 'READ_MAIN_IDEA';
        END CASE;

    -- Science mappings
    ELSIF p_section = 'science' THEN
        CASE
            WHEN p_lesson_title ILIKE '%data%' OR p_lesson_title ILIKE '%chart%' OR p_lesson_title ILIKE '%graph%' THEN
                SELECT id INTO v_skill_id FROM skills WHERE skill_code = 'SCI_SPECIFIC_DATA';
            WHEN p_lesson_title ILIKE '%trend%' THEN
                SELECT id INTO v_skill_id FROM skills WHERE skill_code = 'SCI_TRENDS';
            WHEN p_lesson_title ILIKE '%experiment%' THEN
                SELECT id INTO v_skill_id FROM skills WHERE skill_code = 'SCI_EXP_DESIGN';
            WHEN p_lesson_title ILIKE '%conflicting%' OR p_lesson_title ILIKE '%viewpoint%' THEN
                SELECT id INTO v_skill_id FROM skills WHERE skill_code = 'SCI_CONFLICTING';
            ELSE
                -- Default to data representation
                SELECT id INTO v_skill_id FROM skills WHERE skill_code = 'SCI_DATA_REP';
        END CASE;
    END IF;

    RETURN v_skill_id;
END;
$$ LANGUAGE plpgsql;

-- Map all existing questions to skills
INSERT INTO question_skills (question_id, skill_id, importance)
SELECT
    q.id,
    map_question_to_skill(q.lesson_title, q.section),
    1.0
FROM diagnostic_test_questions q
WHERE map_question_to_skill(q.lesson_title, q.section) IS NOT NULL
ON CONFLICT (question_id, skill_id) DO NOTHING;

-- Add secondary skills for complex questions
-- English questions often test multiple skills simultaneously

-- Comma questions often also test sentence structure
INSERT INTO question_skills (question_id, skill_id, importance)
SELECT
    q.id,
    (SELECT id FROM skills WHERE skill_code = 'ENG_SENT_STRUCT'),
    0.5
FROM diagnostic_test_questions q
WHERE q.section = 'english'
  AND q.lesson_title ILIKE '%comma%'
  AND NOT EXISTS (
      SELECT 1 FROM question_skills qs
      WHERE qs.question_id = q.id
        AND qs.skill_id = (SELECT id FROM skills WHERE skill_code = 'ENG_SENT_STRUCT')
  )
ON CONFLICT (question_id, skill_id) DO NOTHING;

-- Sentence structure questions may involve punctuation
INSERT INTO question_skills (question_id, skill_id, importance)
SELECT
    q.id,
    (SELECT id FROM skills WHERE skill_code = 'ENG_PUNCTUATION'),
    0.5
FROM diagnostic_test_questions q
WHERE q.section = 'english'
  AND q.lesson_title ILIKE '%sentence structure%'
  AND NOT EXISTS (
      SELECT 1 FROM question_skills qs
      WHERE qs.question_id = q.id
        AND qs.skill_id = (SELECT id FROM skills WHERE skill_code = 'ENG_PUNCTUATION')
  )
ON CONFLICT (question_id, skill_id) DO NOTHING;

-- Math geometry questions often involve algebra
INSERT INTO question_skills (question_id, skill_id, importance)
SELECT
    q.id,
    (SELECT id FROM skills WHERE skill_code = 'MATH_ALG_BASICS'),
    0.3
FROM diagnostic_test_questions q
WHERE q.section = 'math'
  AND (q.lesson_title ILIKE '%area%' OR q.lesson_title ILIKE '%volume%')
  AND NOT EXISTS (
      SELECT 1 FROM question_skills qs
      WHERE qs.question_id = q.id
        AND qs.skill_id = (SELECT id FROM skills WHERE skill_code = 'MATH_ALG_BASICS')
  )
ON CONFLICT (question_id, skill_id) DO NOTHING;

-- Clean up temporary function
DROP FUNCTION map_question_to_skill(TEXT, TEXT);

-- Verification and reporting
DO $$
DECLARE
    total_questions INTEGER;
    mapped_questions INTEGER;
    unmapped_questions INTEGER;
    total_mappings INTEGER;
    avg_skills_per_question NUMERIC;
BEGIN
    -- Count questions
    SELECT COUNT(*) INTO total_questions FROM diagnostic_test_questions;

    SELECT COUNT(DISTINCT question_id) INTO mapped_questions FROM question_skills;

    unmapped_questions := total_questions - mapped_questions;

    SELECT COUNT(*) INTO total_mappings FROM question_skills;

    SELECT ROUND(AVG(skill_count), 2) INTO avg_skills_per_question
    FROM (
        SELECT question_id, COUNT(*) as skill_count
        FROM question_skills
        GROUP BY question_id
    ) subquery;

    RAISE NOTICE '========================================';
    RAISE NOTICE 'QUESTION-SKILL MAPPING COMPLETE';
    RAISE NOTICE '========================================';
    RAISE NOTICE 'Total questions: %', total_questions;
    RAISE NOTICE 'Mapped questions: %', mapped_questions;
    RAISE NOTICE 'Unmapped questions: %', unmapped_questions;
    RAISE NOTICE 'Total mappings: %', total_mappings;
    RAISE NOTICE 'Avg skills per question: %', avg_skills_per_question;
    RAISE NOTICE '========================================';

    IF unmapped_questions > 0 THEN
        RAISE WARNING 'There are % unmapped questions that need manual review', unmapped_questions;
    END IF;
END $$;

-- Show sample mappings for verification
SELECT
    q.section,
    q.lesson_title,
    s.skill_name,
    qs.importance,
    COUNT(*) OVER (PARTITION BY q.section) as section_count
FROM diagnostic_test_questions q
JOIN question_skills qs ON q.id = qs.question_id
JOIN skills s ON qs.skill_id = s.id
ORDER BY q.section, q.lesson_title
LIMIT 20;
