-- Update titles for Test 1 Reading passages
UPDATE practice_test_reading_passages
SET passage_title = CASE passage_number
  WHEN 1 THEN 'The Art of Quilting: A Grandmother''s Legacy'
  WHEN 2 THEN 'Food Deserts: Access and Inequality in Urban America'
  WHEN 3 THEN 'The Harlem Renaissance: A Cultural Awakening'
  WHEN 4 THEN 'Coral Reefs: Rainforests of the Sea'
END
WHERE test_number = 1;

-- Verify
SELECT passage_number, passage_type, passage_title
FROM practice_test_reading_passages
WHERE test_number = 1
ORDER BY passage_number;
