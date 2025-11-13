/**
 * Add chapter column to all practice test tables
 * Add question_type column to reading questions table
 */

-- Add chapter column to English questions (TEXT to support multiple chapters like "2, 3")
ALTER TABLE practice_test_english_questions
ADD COLUMN IF NOT EXISTS chapter TEXT;

-- Add chapter column to Math questions
ALTER TABLE practice_test_math_questions
ADD COLUMN IF NOT EXISTS chapter TEXT;

-- Add chapter column to Reading questions
ALTER TABLE practice_test_reading_questions
ADD COLUMN IF NOT EXISTS chapter TEXT;

-- Add question_type column to Reading questions
ALTER TABLE practice_test_reading_questions
ADD COLUMN IF NOT EXISTS question_type TEXT;

-- Add chapter column to Science questions
ALTER TABLE practice_test_science_questions
ADD COLUMN IF NOT EXISTS chapter TEXT;

-- Verify columns were added
SELECT
  'practice_test_english_questions' as table_name,
  column_name,
  data_type
FROM information_schema.columns
WHERE table_name = 'practice_test_english_questions'
  AND column_name IN ('chapter', 'question_type')
UNION ALL
SELECT
  'practice_test_math_questions' as table_name,
  column_name,
  data_type
FROM information_schema.columns
WHERE table_name = 'practice_test_math_questions'
  AND column_name IN ('chapter', 'question_type')
UNION ALL
SELECT
  'practice_test_reading_questions' as table_name,
  column_name,
  data_type
FROM information_schema.columns
WHERE table_name = 'practice_test_reading_questions'
  AND column_name IN ('chapter', 'question_type')
UNION ALL
SELECT
  'practice_test_science_questions' as table_name,
  column_name,
  data_type
FROM information_schema.columns
WHERE table_name = 'practice_test_science_questions'
  AND column_name IN ('chapter', 'question_type');
