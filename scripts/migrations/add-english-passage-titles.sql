-- Add passage_title column to practice_test_english_passages
ALTER TABLE practice_test_english_passages
ADD COLUMN IF NOT EXISTS passage_title TEXT;

-- Add passage titles based on content analysis
UPDATE practice_test_english_passages
SET passage_title = CASE passage_number
  WHEN 1 THEN 'Urban Farming: Growing Communities'
  WHEN 2 THEN 'Katherine Johnson: Hidden Figure of NASA'
  WHEN 3 THEN 'Revitalizing Small-Town Main Streets'
  WHEN 4 THEN 'The Art and Science of Botanical Illustration'
  WHEN 5 THEN 'Rising Seas: Coastal Communities at Risk'
END
WHERE test_number = 1;
