-- ============================================
-- INITIALIZE IRT PARAMETERS - SEED DATA
-- ============================================
-- Set initial IRT parameter estimates for all questions
-- These will be calibrated with real student data
-- ============================================

-- Initialize all questions with baseline parameters
UPDATE diagnostic_test_questions
SET
    difficulty = 0.0,           -- Neutral difficulty
    discrimination = 1.0,       -- Moderate discrimination
    guessing = 0.25,            -- 25% for 4-choice questions
    exposure_rate = 0,
    is_adaptive = true,
    time_limit_seconds = 60,    -- 60 seconds default
    last_calibrated = NOW()
WHERE difficulty IS NULL;

-- Adjust difficulty based on question_id (simulating difficulty progression)
-- Lower numbered questions are typically easier
UPDATE diagnostic_test_questions
SET difficulty = CASE
    -- Questions 1-10: Easy (difficulty -1.0 to -0.5)
    WHEN question_id <= 10 THEN -1.0 + (question_id - 1) * 0.05
    -- Questions 11-25: Easy-Medium (difficulty -0.5 to 0.0)
    WHEN question_id <= 25 THEN -0.5 + (question_id - 11) * 0.033
    -- Questions 26-35: Medium (difficulty 0.0 to 0.5)
    WHEN question_id <= 35 THEN 0.0 + (question_id - 26) * 0.05
    -- Questions 36-40: Hard (difficulty 0.5 to 1.5)
    WHEN question_id <= 40 THEN 0.5 + (question_id - 36) * 0.2
    -- Fallback
    ELSE 0.0
END;

-- Adjust discrimination based on section
-- Some sections have clearer right/wrong answers (higher discrimination)
UPDATE diagnostic_test_questions
SET discrimination = CASE
    WHEN section = 'math' THEN 1.5      -- Math has clear answers
    WHEN section = 'science' THEN 1.3   -- Science mostly clear
    WHEN section = 'english' THEN 1.1   -- English somewhat subjective
    WHEN section = 'reading' THEN 1.0   -- Reading more subjective
    ELSE 1.0
END;

-- Adjust time limits by section
UPDATE diagnostic_test_questions
SET time_limit_seconds = CASE
    WHEN section = 'english' THEN 36    -- 75 questions in 45 min = 36s each
    WHEN section = 'math' THEN 60       -- 60 questions in 60 min = 60s each
    WHEN section = 'reading' THEN 52    -- 40 questions in 35 min = 52s each
    WHEN section = 'science' THEN 52    -- 40 questions in 35 min = 52s each
    ELSE 60
END;

-- Add some variability to make parameters more realistic
-- Using question_id as a seed for pseudo-randomness
UPDATE diagnostic_test_questions
SET
    difficulty = difficulty + (
        -- Add small random variation between -0.2 and +0.2
        ((question_id * 123456789) % 100 - 50) * 0.004
    ),
    discrimination = discrimination + (
        -- Add small random variation between -0.1 and +0.1
        ((question_id * 987654321) % 100 - 50) * 0.002
    );

-- Ensure parameters stay within valid ranges
UPDATE diagnostic_test_questions
SET
    difficulty = GREATEST(-3.0, LEAST(3.0, difficulty)),
    discrimination = GREATEST(0.5, LEAST(2.5, discrimination)),
    guessing = GREATEST(0.0, LEAST(0.5, guessing));

-- Add special handling for science conflicting viewpoints (only 7 questions)
-- These are typically harder
UPDATE diagnostic_test_questions
SET
    difficulty = difficulty + 0.5,
    discrimination = discrimination + 0.2
WHERE section = 'science'
  AND (lesson_title ILIKE '%conflict%' OR lesson_title ILIKE '%viewpoint%')
  AND difficulty < 2.0;  -- Cap at reasonable difficulty

-- Questions that appear later in sections are typically harder
-- Add progressive difficulty within each section
WITH ranked_questions AS (
    SELECT
        id,
        ROW_NUMBER() OVER (PARTITION BY section ORDER BY question_id) as rank,
        COUNT(*) OVER (PARTITION BY section) as section_total
    FROM diagnostic_test_questions
)
UPDATE diagnostic_test_questions q
SET difficulty = q.difficulty + (
    SELECT
        CASE
            -- First third: reduce difficulty by 0.3
            WHEN r.rank <= r.section_total / 3 THEN -0.3
            -- Middle third: neutral
            WHEN r.rank <= 2 * r.section_total / 3 THEN 0.0
            -- Last third: increase difficulty by 0.3
            ELSE 0.3
        END
    FROM ranked_questions r
    WHERE r.id = q.id
);

-- Final bounds check
UPDATE diagnostic_test_questions
SET
    difficulty = GREATEST(-2.5, LEAST(2.5, difficulty)),
    discrimination = GREATEST(0.5, LEAST(2.5, discrimination));

-- Verification and statistics
DO $$
DECLARE
    total_questions INTEGER;
    avg_difficulty NUMERIC;
    avg_discrimination NUMERIC;
    min_difficulty NUMERIC;
    max_difficulty NUMERIC;
BEGIN
    SELECT
        COUNT(*),
        ROUND(AVG(difficulty), 3),
        ROUND(AVG(discrimination), 3),
        ROUND(MIN(difficulty), 3),
        ROUND(MAX(difficulty), 3)
    INTO
        total_questions,
        avg_difficulty,
        avg_discrimination,
        min_difficulty,
        max_difficulty
    FROM diagnostic_test_questions;

    RAISE NOTICE '========================================';
    RAISE NOTICE 'IRT PARAMETERS INITIALIZED';
    RAISE NOTICE '========================================';
    RAISE NOTICE 'Total questions: %', total_questions;
    RAISE NOTICE 'Avg difficulty (b): %', avg_difficulty;
    RAISE NOTICE 'Avg discrimination (a): %', avg_discrimination;
    RAISE NOTICE 'Difficulty range: % to %', min_difficulty, max_difficulty;
    RAISE NOTICE '========================================';
END $$;

-- Show distribution by section
SELECT
    section,
    COUNT(*) as question_count,
    ROUND(AVG(difficulty), 2) as avg_difficulty,
    ROUND(MIN(difficulty), 2) as min_difficulty,
    ROUND(MAX(difficulty), 2) as max_difficulty,
    ROUND(AVG(discrimination), 2) as avg_discrimination,
    ROUND(AVG(time_limit_seconds), 0) as avg_time_limit
FROM diagnostic_test_questions
GROUP BY section
ORDER BY section;

-- Show difficulty distribution
SELECT
    CASE
        WHEN difficulty < -1.0 THEN 'Very Easy'
        WHEN difficulty < -0.5 THEN 'Easy'
        WHEN difficulty < 0.0 THEN 'Below Average'
        WHEN difficulty < 0.5 THEN 'Average'
        WHEN difficulty < 1.0 THEN 'Above Average'
        WHEN difficulty < 1.5 THEN 'Hard'
        ELSE 'Very Hard'
    END as difficulty_category,
    COUNT(*) as question_count,
    ROUND(AVG(discrimination), 2) as avg_discrimination
FROM diagnostic_test_questions
GROUP BY difficulty_category
ORDER BY
    CASE
        WHEN difficulty_category = 'Very Easy' THEN 1
        WHEN difficulty_category = 'Easy' THEN 2
        WHEN difficulty_category = 'Below Average' THEN 3
        WHEN difficulty_category = 'Average' THEN 4
        WHEN difficulty_category = 'Above Average' THEN 5
        WHEN difficulty_category = 'Hard' THEN 6
        ELSE 7
    END;
