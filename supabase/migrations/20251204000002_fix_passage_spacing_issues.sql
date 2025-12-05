-- Fix spacing issues in passage text where words are concatenated
-- Common pattern: "word1word2" should be "word1 word2"

-- Fix "onRjukan" to "on Rjukan" in practice test passage tables
UPDATE practice_test_reading_passages
SET passage_text = REPLACE(passage_text, 'onRjukan', 'on Rjukan')
WHERE passage_text LIKE '%onRjukan%';

UPDATE practice_test_science_passages
SET passage_text = REPLACE(passage_text, 'onRjukan', 'on Rjukan')
WHERE passage_text LIKE '%onRjukan%';
