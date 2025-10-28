# ✅ CORRECTED DATABASE SCHEMA (VERIFIED AGAINST ACTUAL DB)

## Question Tables - ALL SECTIONS

### practice_test_english_questions
```javascript
{
  id: AUTO,
  test_number: 1,
  question_number: 1-50,
  question_text: "full question text",
  question_image_url: null,  // Usually null
  choices: '["A. NO CHANGE", "B. ...", "C. ...", "D. ..."]',
  correct_answer: 0-3,
  explanation: "detailed explanation",
  question_type: "verb-tense|comma-usage|etc",
  difficulty: "easy|medium|hard",
  passage_id: foreign_key_or_null,
  created_at: AUTO,
  updated_at: AUTO
}
```

### practice_test_math_questions
```javascript
{
  id: AUTO,
  test_number: 1,
  question_number: 1-45,
  question_text: "problem statement",
  question_image_url: null,
  choices: '["A. 5", "B. 10", "C. 15", "D. 20"]',  // 4 choices only!
  correct_answer: 0-3,
  explanation: "step-by-step solution",
  question_type: "basic_algebra|geometry|etc",
  difficulty: "easy|medium|hard",
  created_at: AUTO,
  updated_at: AUTO
}
```

### practice_test_reading_questions
```javascript
{
  id: AUTO,
  test_number: 1,
  question_number: 1-36,
  question_text: "question",
  question_image_url: null,
  choices: '["A. ...", "B. ...", "C. ...", "D. ..."]',
  correct_answer: 0-3,
  explanation: "why this answer",
  question_type: "main-idea|inference|etc",
  difficulty: "easy|medium|hard",
  passage_id: foreign_key,
  created_at: AUTO,
  updated_at: AUTO
}
```

### practice_test_science_questions
```javascript
{
  id: AUTO,
  test_number: 1,
  question_number: 1-40,
  question_text: "question",
  question_image_url: null,
  choices: '["A. ...", "B. ...", "C. ...", "D. ..."]',
  correct_answer: 0-3,
  explanation: "explanation",
  question_type: "data-interpretation|etc",
  difficulty: "easy|medium|hard",
  passage_id: foreign_key,
  created_at: AUTO,
  updated_at: AUTO
}
```

## Passage Tables

### practice_test_english_passages
```javascript
{
  id: AUTO,
  test_number: 1,
  passage_number: 1-5,
  passage_type: "general" or specific type,
  passage_text: "text with <u>underlines</u>",
  passage_title: "Passage 1",
  word_count: calculated_int,
  created_at: AUTO,
  updated_at: AUTO
}
```
**NO `question_range` column!**

### practice_test_reading_passages
```javascript
{
  id: AUTO,
  test_number: 1,
  passage_number: 1-4,
  passage_type: "prose-fiction|social-science|humanities|natural-science",
  passage_title: "Descriptive Title",
  passage_text: "full passage 700-850 words",
  word_count: calculated_int,
  created_at: AUTO,
  updated_at: AUTO
}
```
**NO `question_range` column!**

### practice_test_science_passages
```javascript
{
  id: AUTO,
  test_number: 1,
  passage_number: 1-7,
  passage_type: "data-representation|research-summary|conflicting-viewpoints",
  passage_title: "Study Title",
  passage_text: "description + HTML tables",
  passage_data: null,  // Optional JSON field
  created_at: AUTO,
  updated_at: AUTO
}
```
**NO `word_count` - has `passage_data` instead!**

---

## CORRECTED MATH TOPIC DISTRIBUTION (must sum to 45)

- Pre-Algebra: 9 questions
- Elementary Algebra: 9 questions
- Intermediate Algebra: 8 questions ⬅️ CHANGED from 9 to 8
- Coordinate Geometry: 7 questions
- Plane Geometry: 9 questions
- Trigonometry: 3 questions ⬅️ CHANGED from 4 to 3

**Total: 9 + 9 + 8 + 7 + 9 + 3 = 45** ✅

---

## CORRECTED WORD COUNT CALCULATION

```javascript
// WRONG (counts empty strings):
const wordCount = text.split(/\s+/).length;

// CORRECT (filters empty):
const wordCount = text.split(/\s+/).filter(w => w.length > 0).length;
```

---

## INSERTION ORDER (CRITICAL)

1. Insert passages FIRST (get their IDs)
2. Map passage IDs to passage_numbers
3. Insert questions with correct passage_id foreign keys
4. NO lesson_id needed (column doesn't exist)
5. NO question_range needed (column doesn't exist)

This is the 100% accurate schema.
