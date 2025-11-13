-- ================================================================
-- FIX LESSON_EXAMPLES TABLE
-- ================================================================
-- Step 1: Change lesson_id column from UUID to TEXT
-- Step 2: Update all UUID values to TEXT lesson keys
-- ================================================================

-- Step 1: Change column type from UUID to TEXT
ALTER TABLE lesson_examples
ALTER COLUMN lesson_id TYPE TEXT;

-- Step 2: Update all the UUIDs to their corresponding TEXT IDs
-- This mapping comes from the October 21 backup

UPDATE lesson_examples SET lesson_id = 'adding-deleting' WHERE lesson_id = '784a146b-8809-4189-a1b4-4b2fdcaf8199';
UPDATE lesson_examples SET lesson_id = 'geometry-angles' WHERE lesson_id = '3e2c98a9-98e3-40e3-8301-11f38aa0c15b';
UPDATE lesson_examples SET lesson_id = '2.2' WHERE lesson_id = 'd2ae4a84-cb54-4006-8dee-8c325e443c2d';
UPDATE lesson_examples SET lesson_id = '5.6' WHERE lesson_id = 'd946c7ef-0543-46fd-a938-79592c05c044';
UPDATE lesson_examples SET lesson_id = 'substitution' WHERE lesson_id = '56a20188-c413-48c6-b1ba-6cbddf9ba247';
UPDATE lesson_examples SET lesson_id = 'transforming-functions' WHERE lesson_id = 'c3c04aee-0641-470f-97d1-eeabce912c87';
UPDATE lesson_examples SET lesson_id = 'logical-placement' WHERE lesson_id = '7dd5f9a2-c597-4d33-a0a0-e98d58075eb4';
UPDATE lesson_examples SET lesson_id = 'multiple-figures' WHERE lesson_id = '8a05747a-31df-4a21-822f-3cc6d7739416';
UPDATE lesson_examples SET lesson_id = '2.5' WHERE lesson_id = '0b4b783a-9945-47b9-b3fc-e194374d6818';
UPDATE lesson_examples SET lesson_id = '3.1' WHERE lesson_id = '8d9e41b9-d906-48f6-a1d3-eecb02a7be9f';
UPDATE lesson_examples SET lesson_id = '3.2' WHERE lesson_id = 'a8cd8513-f0a8-4bb1-9890-f21dc053939a';
UPDATE lesson_examples SET lesson_id = '3.3' WHERE lesson_id = 'b8c03bf0-99df-460d-be21-0015eebe7920';
UPDATE lesson_examples SET lesson_id = '6.1' WHERE lesson_id = '4b3fd0c3-4de3-4e74-bd87-f78f5fb0ad17';
UPDATE lesson_examples SET lesson_id = '6.3' WHERE lesson_id = 'b5f5c943-7bcd-431a-aa94-df51be6612e2';
UPDATE lesson_examples SET lesson_id = '3.5' WHERE lesson_id = '60e3cd06-406b-45bc-b9d7-e887ef8eeca6';
UPDATE lesson_examples SET lesson_id = '2.4' WHERE lesson_id = '928ee683-cf5c-46ab-a148-77da4e887e3b';
UPDATE lesson_examples SET lesson_id = 'water-knowledge' WHERE lesson_id = '3dd67429-a421-4449-86be-4f622d21e7ce';
UPDATE lesson_examples SET lesson_id = 'backsolving' WHERE lesson_id = '06685249-874d-431f-9b7f-1c711d64a9cf';
UPDATE lesson_examples SET lesson_id = '3.4' WHERE lesson_id = 'a0fbdb59-614b-4597-99c1-344c4f3ad47e';
UPDATE lesson_examples SET lesson_id = '3.6' WHERE lesson_id = '34e50480-0a09-4f9f-add4-c1121f66776b';
UPDATE lesson_examples SET lesson_id = 'word-problems' WHERE lesson_id = 'ec9b95cf-47f7-4c01-8118-91aef61f7170';
UPDATE lesson_examples SET lesson_id = 'systems-equations' WHERE lesson_id = '9fec6937-fba1-40f2-9a28-5ff838420384';
UPDATE lesson_examples SET lesson_id = 'quadratics' WHERE lesson_id = 'f7516c41-afb2-48fb-a4e2-df9fe41d8b23';
UPDATE lesson_examples SET lesson_id = 'trigonometry' WHERE lesson_id = 'a0cddccc-a9e8-4ec0-a0b2-ef1cc46a161a';
UPDATE lesson_examples SET lesson_id = 'sentence-structure' WHERE lesson_id = 'a5fd241f-9832-4a5d-a7e9-90cb6232c4ac';
UPDATE lesson_examples SET lesson_id = '2.3' WHERE lesson_id = '8e92077d-ae10-48ce-a80d-348cc56969c3';
UPDATE lesson_examples SET lesson_id = 'exponential-growth' WHERE lesson_id = 'da718634-9257-4c01-845e-a948650dd68c';
UPDATE lesson_examples SET lesson_id = 'functions' WHERE lesson_id = '89b5a825-cb28-4e50-a4a7-de9d73922bc9';
UPDATE lesson_examples SET lesson_id = 'equations-as-answers' WHERE lesson_id = '65784d86-bf0d-4dbe-aca9-a6fca2383101';
UPDATE lesson_examples SET lesson_id = 'sequences' WHERE lesson_id = 'ad844a99-7156-4315-ac86-958f52468df2';
UPDATE lesson_examples SET lesson_id = 'trends' WHERE lesson_id = 'b8825e84-e3de-4642-913e-fc5c1ea70690';
UPDATE lesson_examples SET lesson_id = '5.2' WHERE lesson_id = '6203e4a3-6648-4e0c-9c31-52e35ee2c735';
UPDATE lesson_examples SET lesson_id = '5.5' WHERE lesson_id = '4d711b65-dcda-4fb5-9740-7bfaae194ff2';
UPDATE lesson_examples SET lesson_id = 'specific-data-point' WHERE lesson_id = '53c5676d-0fa7-4416-8848-38268483599e';
UPDATE lesson_examples SET lesson_id = '6.2' WHERE lesson_id = 'cd5f10f6-2970-4d73-82b1-029645565ae7';
UPDATE lesson_examples SET lesson_id = 'approximation' WHERE lesson_id = '4ca7c266-f0e2-48ff-adbd-204ae486d503';
UPDATE lesson_examples SET lesson_id = 'inverse-trends-multiple-axes' WHERE lesson_id = '9b8da732-182a-44c5-b3d2-3a95d8718fbb';
UPDATE lesson_examples SET lesson_id = 'scatter-plots' WHERE lesson_id = 'a30dfe02-47a0-4c7c-86a6-b5dde55a467a';
UPDATE lesson_examples SET lesson_id = 'pronouns' WHERE lesson_id = '3c3585a1-f137-4331-8390-29ef1f5e889f';
UPDATE lesson_examples SET lesson_id = 'redundancy' WHERE lesson_id = '9eef3d0e-d5a2-4104-b9a9-3e575e8e6734';
UPDATE lesson_examples SET lesson_id = '5.3' WHERE lesson_id = '27833f99-7aa1-4e5d-92e4-c953fadebc0d';
UPDATE lesson_examples SET lesson_id = 'cannot-be-determined' WHERE lesson_id = '2f7ab93c-af8f-408c-9c2a-f7114b57002b';
UPDATE lesson_examples SET lesson_id = '5.1' WHERE lesson_id = '74013e77-3111-4dc6-beca-ff15948e4351';
UPDATE lesson_examples SET lesson_id = 'word-choice' WHERE lesson_id = '04df2a09-a910-4456-8fe5-2f8e7f62c50f';
UPDATE lesson_examples SET lesson_id = 'mixing' WHERE lesson_id = '9292b9a2-0e17-433a-adb5-c49f39a3e018';
UPDATE lesson_examples SET lesson_id = 'figures-text' WHERE lesson_id = '8d819556-9a8d-4cf0-9d8e-a42c4d6442cf';
UPDATE lesson_examples SET lesson_id = 'miscellaneous-topics' WHERE lesson_id = '15d5d79e-44fe-4aa6-a257-9e6260c83720';
UPDATE lesson_examples SET lesson_id = 'complex-numbers' WHERE lesson_id = '0090877d-e7d2-4ac4-80b4-87a42502a214';
UPDATE lesson_examples SET lesson_id = 'matrices' WHERE lesson_id = '6e95c291-2e8a-4ae9-8f7e-10caad8588b9';
UPDATE lesson_examples SET lesson_id = 'vectors' WHERE lesson_id = '7af23229-16aa-4455-a777-66cdd8011dff';
UPDATE lesson_examples SET lesson_id = 'commas' WHERE lesson_id = '3e8f0696-1bf7-4b5c-880d-fb5359923b7d';
UPDATE lesson_examples SET lesson_id = 'modifiers' WHERE lesson_id = 'f7ac1d6c-6416-47fd-9720-807224100517';
UPDATE lesson_examples SET lesson_id = 'punctuation' WHERE lesson_id = '66776383-9334-4efb-bd72-74b1bbeab8ac';
UPDATE lesson_examples SET lesson_id = 'outside-knowledge' WHERE lesson_id = 'e735446e-a5c1-4ba3-b952-e6a5bc05c2ca';
UPDATE lesson_examples SET lesson_id = 'two-part-answers' WHERE lesson_id = 'eb0ae215-47e8-4b48-8251-250067974600';
UPDATE lesson_examples SET lesson_id = '5.4' WHERE lesson_id = 'c59913aa-4a4e-4bc3-bdaf-596b9414ff81';
UPDATE lesson_examples SET lesson_id = 'misc-topics' WHERE lesson_id = '4a9e06f8-5ee5-4e5d-9e5d-2ce9b7c6bf16';
UPDATE lesson_examples SET lesson_id = 'transitions' WHERE lesson_id = '7aae3763-017b-4762-ad5a-346aac1f027b';
UPDATE lesson_examples SET lesson_id = 'parallel-structure' WHERE lesson_id = 'e6153221-e330-4db4-8cc7-9c5a1d51a301';
UPDATE lesson_examples SET lesson_id = 'experimental-setup' WHERE lesson_id = '1513e653-31c1-418d-9e7f-f91253d9438b';
UPDATE lesson_examples SET lesson_id = 'which-choice' WHERE lesson_id = '29b59c9d-ef2e-4f7f-aae2-464222884d3a';
UPDATE lesson_examples SET lesson_id = 'math-on-science' WHERE lesson_id = '69db2ad0-40cb-4e75-8a57-b62673b41694';
UPDATE lesson_examples SET lesson_id = 'conflicting-viewpoints' WHERE lesson_id = '6f9652ad-13d6-447f-bc9f-df706d1e45aa';
UPDATE lesson_examples SET lesson_id = 'verbs' WHERE lesson_id = '10fff941-59e1-4d3a-84b7-d0fe8f9985ef';

-- Verify the fix
SELECT
  COUNT(*) as total_examples,
  COUNT(DISTINCT lesson_id) as unique_lessons
FROM lesson_examples;

-- Show sample of fixed examples
SELECT
  id,
  lesson_id,
  title,
  LEFT(problem_text, 50) as problem_preview
FROM lesson_examples
LIMIT 10;
