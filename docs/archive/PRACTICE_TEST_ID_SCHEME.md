# Practice Test Question ID Allocation Scheme

## 🎯 Overview

All practice test questions use a systematic ID allocation scheme to prevent collisions across tests and sections.

## 📐 Formula

For Practice Test #N:
```
Base ID = (N - 1) × 1000
```

Within each test (215 questions total):
- **English** (75 questions):  `base + 1` to `base + 75`
- **Math** (60 questions):     `base + 76` to `base + 135`
- **Reading** (40 questions):  `base + 136` to `base + 175`
- **Science** (40 questions):  `base + 176` to `base + 215`

## 📊 ID Ranges by Test

| Test | Base | English | Math | Reading | Science | Total IDs |
|------|------|---------|------|---------|---------|-----------|
| 1 | 0 | 1-75 | 76-135 | 136-175 | 176-215 | 215 |
| 2 | 1000 | 1001-1075 | 1076-1135 | 1136-1175 | 1176-1215 | 215 |
| 3 | 2000 | 2001-2075 | 2076-2135 | 2136-2175 | 2176-2215 | 215 |
| 4 | 3000 | 3001-3075 | 3076-3135 | 3136-3175 | 3176-3215 | 215 |
| 5 | 4000 | 4001-4075 | 4076-4135 | 4136-4175 | 4176-4215 | 215 |
| 6 | 5000 | 5001-5075 | 5076-5135 | 5136-5175 | 5176-5215 | 215 |
| 7 | 6000 | 6001-6075 | 6076-6135 | 6136-6175 | 6176-6215 | 215 |
| 8 | 7000 | 7001-7075 | 7076-7135 | 7136-7175 | 7176-7215 | 215 |
| ... | ... | ... | ... | ... | ... | ... |
| N | (N-1)×1000 | See formula above | | | | 215 |

## ✅ Benefits

1. **Zero Collisions**: Each test has its own 1000-ID block
2. **Scalable**: Supports up to 999 practice tests
3. **Predictable**: Easy to calculate IDs programmatically
4. **Section-Aware**: IDs within each test group by section
5. **Future-Proof**: Clear pattern for adding new tests

## 🔧 Adding a New Practice Test

When adding **Practice Test #8**:

1. **Calculate base ID**: `(8 - 1) × 1000 = 7000`
2. **Assign IDs**:
   - English Q1-75: IDs 7001-7075
   - Math Q1-60: IDs 7076-7135
   - Reading Q1-40: IDs 7136-7175
   - Science Q1-40: IDs 7176-7215

### SQL Template for New Tests

```sql
-- Add Practice Test #N
-- Replace N with the actual test number

-- Calculate base: (N - 1) * 1000
-- Example for Test 8: base = 7000

-- Insert English questions (75)
INSERT INTO practice_test_english_questions (id, test_number, question_number, ...)
VALUES
  (7001, 8, 1, ...),  -- base + 1
  (7002, 8, 2, ...),  -- base + 2
  ...
  (7075, 8, 75, ...); -- base + 75

-- Insert Math questions (60)
INSERT INTO practice_test_math_questions (id, test_number, question_number, ...)
VALUES
  (7076, 8, 1, ...),  -- base + 76
  (7077, 8, 2, ...),  -- base + 77
  ...
  (7135, 8, 60, ...); -- base + 135

-- Insert Reading questions (40)
INSERT INTO practice_test_reading_questions (id, test_number, question_number, ...)
VALUES
  (7136, 8, 1, ...),  -- base + 136
  (7137, 8, 2, ...),  -- base + 137
  ...
  (7175, 8, 40, ...); -- base + 175

-- Insert Science questions (40)
INSERT INTO practice_test_science_questions (id, test_number, question_number, ...)
VALUES
  (7176, 8, 1, ...),  -- base + 176
  (7177, 8, 2, ...),  -- base + 177
  ...
  (7215, 8, 40, ...); -- base + 215
```

## 🚨 Important Notes

1. **Never reuse IDs**: Even if you delete a test, don't reuse its ID range
2. **Use the formula**: Always calculate IDs using the formula to avoid collisions
3. **Test verification**: After adding a new test, verify no collisions:
   ```sql
   -- Check for duplicate IDs across all sections
   SELECT id, COUNT(*) as collision_count
   FROM (
     SELECT id FROM practice_test_english_questions
     UNION ALL SELECT id FROM practice_test_math_questions
     UNION ALL SELECT id FROM practice_test_reading_questions
     UNION ALL SELECT id FROM practice_test_science_questions
   ) all_questions
   GROUP BY id
   HAVING COUNT(*) > 1;
   ```

   This query should return **zero rows** if there are no collisions.

## 📝 Change Log

- **2025-01-14**: Implemented systematic ID scheme for Tests 1-7 (fixed 450+ collisions)
- **2025-01-14**: Documented scheme for future tests

## 🎓 Example: Looking Up Question IDs

To find the ID for a specific question:

```javascript
function getQuestionId(testNumber, section, questionNumber) {
  const base = (testNumber - 1) * 1000;

  const sectionOffsets = {
    'english': 0,
    'math': 75,
    'reading': 135,
    'science': 175
  };

  return base + sectionOffsets[section] + questionNumber;
}

// Example: Test 3, Science Q17
const id = getQuestionId(3, 'science', 17);
// Result: 2000 + 175 + 17 = 2192
```

## 🔒 Database Constraints

The following constraint ensures no duplicate question IDs per session:

```sql
ALTER TABLE diagnostic_test_results
ADD CONSTRAINT diagnostic_test_results_session_question_unique
UNIQUE (diagnostic_session_id, question_id);
```

This prevents the same question from being saved twice in a single test session.
