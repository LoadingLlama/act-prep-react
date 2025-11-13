/**
 * Fix chapter column type from INTEGER to TEXT
 * This allows storing multiple chapters like "2, 3"
 */

-- Change chapter column to TEXT in English questions
ALTER TABLE practice_test_english_questions
ALTER COLUMN chapter TYPE TEXT;

-- Change chapter column to TEXT in Math questions
ALTER TABLE practice_test_math_questions
ALTER COLUMN chapter TYPE TEXT;

-- Change chapter column to TEXT in Reading questions
ALTER TABLE practice_test_reading_questions
ALTER COLUMN chapter TYPE TEXT;

-- Change chapter column to TEXT in Science questions
ALTER TABLE practice_test_science_questions
ALTER COLUMN chapter TYPE TEXT;
