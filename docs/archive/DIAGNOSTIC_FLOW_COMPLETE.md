# COMPLETE DIAGNOSTIC TEST FLOW VERIFICATION

## Current Database State

### Confirmed Schema (from database inspection):

1. **`lessons` table**
   - `id`: UUID (e.g., "c22d531f-b59a-41fe-8b19-bf2f8e063b48")
   - `subject`: TEXT (e.g., "reading")
   - `lesson_key`: TEXT (e.g., "words-in-context")
   - `title`: TEXT

2. **`practice_test_english_questions`** (and math/reading/science)
   - `id`: UUID
   - `test_number`: INTEGER
   - `question_number`: INTEGER
   - `question_text`: TEXT
   - `choices`: JSONB
   - `correct_answer`: TEXT
   - `explanation`: TEXT
   - `question_type`: TEXT
   - `difficulty`: TEXT
   - `chapter`: TEXT
   - ❌ `lesson_id`: **MISSING - NEEDS TO BE ADDED**

3. **`diagnostic_test_sessions`**
   - ✅ EXISTS and ready

4. **`diagnostic_test_results`**
   - ✅ EXISTS and ready
   - `question_id`: UUID (should reference practice_test_*_questions.id)

5. **`diagnostic_analysis`**
   - ✅ EXISTS and ready

---

## Complete Data Flow (Step by Step)

### STEP 1: User Takes Diagnostic Test

**Component:** `DiagnosticTest.jsx`

```javascript
// Load questions from practice test tables
const questions = await DiagnosticService.getDiagnosticQuestions();
// Returns questions from practice_test_*_questions WHERE test_number = 1
```

**Database Query:**
```sql
SELECT * FROM practice_test_english_questions WHERE test_number = 1;
SELECT * FROM practice_test_math_questions WHERE test_number = 1;
SELECT * FROM practice_test_reading_questions WHERE test_number = 1;
SELECT * FROM practice_test_science_questions WHERE test_number = 1;
```

**Returns:** Array of questions with:
- `id` (UUID)
- `question_text`
- `answers` (parsed from choices)
- `correctAnswer`
- `section`
- `lesson_id` (NULL until populated)

---

### STEP 2: Create Diagnostic Session

**Service:** `DiagnosticService.createDiagnosticSession()`

```javascript
const session = await DiagnosticService.createDiagnosticSession(
  userId,
  'full',
  totalQuestions
);
```

**Database Insert:**
```sql
INSERT INTO diagnostic_test_sessions (user_id, section, total_questions)
VALUES (userId, 'full', 215);
```

**Returns:** Session object with `id` (UUID)

---

### STEP 3: User Answers Questions

**Frontend:** User selects answers in the UI
**Storage:** Results stored in component state

```javascript
allQuestionResults = [
  { questionNum: 1, userAnswer: 'A', isCorrect: true, timeSpent: 45 },
  { questionNum: 2, userAnswer: 'B', isCorrect: false, timeSpent: 30 },
  ...
]
```

---

### STEP 4: Complete Session

**Service:** `DiagnosticService.completeDiagnosticSession()`

```javascript
await DiagnosticService.completeDiagnosticSession(
  sessionId,
  correctAnswers,
  scorePercentage
);
```

**Database Update:**
```sql
UPDATE diagnostic_test_sessions
SET
  session_end = NOW(),
  correct_answers = 150,
  score_percentage = 69.77,
  completed = true
WHERE id = sessionId;
```

---

### STEP 5: Save Individual Question Results ✅ FIXED

**Service:** `DiagnosticService.saveDiagnosticAnswer()` (called for each question)

```javascript
for (const result of allQuestionResults) {
  const question = allDiagnosticQuestions.find(q => q.question_number === result.questionNum);
  await DiagnosticService.saveDiagnosticAnswer(
    userId,
    sessionId,
    question.id,  // UUID from practice_test_*_questions
    result.userAnswer,
    result.isCorrect,
    result.timeSpent
  );
}
```

**Database Inserts:** (215 times, one per question)
```sql
INSERT INTO diagnostic_test_results (
  user_id,
  diagnostic_session_id,
  question_id,  -- UUID from practice_test_*_questions
  user_answer,
  is_correct,
  time_spent_seconds
) VALUES (...);
```

---

### STEP 6: Analyze Results

**Service:** `DiagnosticAnalysisService.analyzeDiagnosticResults()`

```javascript
const analysis = await DiagnosticAnalysisService.analyzeDiagnosticResults(
  userId,
  sessionId
  // No third parameter - loads from database
);
```

**Database Query:**
```sql
-- 1. Load results
SELECT * FROM diagnostic_test_results
WHERE user_id = userId AND diagnostic_session_id = sessionId;

-- 2. Get question details with lesson mapping
SELECT id, lesson_id, chapter, question_number, question_type, difficulty
FROM practice_test_english_questions
WHERE id IN (...);
-- (Repeats for math, reading, science)

-- 3. Get lesson titles
SELECT id, title FROM lessons
WHERE id IN (...);
```

**Analysis Process:**
1. Group results by `lesson_id`
2. Calculate accuracy per lesson
3. Identify weak lessons (< 70% accuracy)
4. Calculate priority levels (1-5)
5. Analyze by question type
6. Calculate section scores

**Database Insert:**
```sql
INSERT INTO diagnostic_analysis (
  user_id,
  diagnostic_session_id,
  total_questions,
  total_correct,
  overall_accuracy,
  overall_score,
  lesson_breakdown,      -- JSONB
  weak_lessons,          -- JSONB array of {lesson_id, lesson_title, accuracy, section}
  strong_lessons,        -- JSONB
  priority_lessons,      -- JSONB
  question_type_breakdown,  -- JSONB
  ...
) VALUES (...);
```

**⚠️ CRITICAL ISSUE:** This step will fail if `lesson_id` is NULL in practice test questions!

---

### STEP 7: Generate Learning Path

**Service:** `LearningPathService.generateLearningPath()`

```javascript
const learningPath = await LearningPathService.generateLearningPath(
  userId,
  userGoals,
  analysis
);
```

**Uses:**
- `analysis.weak_lessons` (array of objects with `lesson_id`)
- `analysis.priority_lessons`

**Database Queries:**
```sql
-- 1. Deactivate old paths
UPDATE user_learning_paths SET is_active = false
WHERE user_id = userId AND is_active = true;

-- 2. Create new path
INSERT INTO user_learning_paths (user_id, path_name, exam_date, ...)
VALUES (...);

-- 3. Get lesson details for weak areas
SELECT * FROM lessons
WHERE id IN (weakLessonIds);  -- ✅ FIXED: Now extracts IDs correctly

-- 4. Create path items
INSERT INTO learning_path_items (learning_path_id, lesson_id, sequence_order, ...)
VALUES (...);
```

---

### STEP 8: Display Results to User

**Learning Path Tab:**
- Shows `user_learning_paths` with `learning_path_items`
- Each item shows `lesson.title`, estimated time, priority
- User can track progress

**Insights Tab:**
- Shows `diagnostic_analysis` results
- Displays:
  - Overall score
  - Section scores
  - Weak lessons with titles
  - Strong lessons
  - Question type breakdown
  - Recommended study time

---

## REMAINING ISSUES TO FIX

### ❌ Issue #1: `lesson_id` Column Missing
**Problem:** Practice test tables don't have `lesson_id` column
**Fix:** Run `fix_diagnostic_schema.sql`
**Status:** SQL file ready, needs to be executed

### ❌ Issue #2: `lesson_id` Values are NULL
**Problem:** Even after adding column, all values will be NULL
**Impact:** Analysis will show "0 lessons analyzed" because no questions map to lessons
**Fix Required:** Populate `lesson_id` values for each question
**Example:**
```sql
UPDATE practice_test_reading_questions
SET lesson_id = (SELECT id FROM lessons WHERE lesson_key = 'words-in-context')
WHERE question_type = 'words_in_context';
```

### ✅ Issue #3: Data Flow (FIXED)
- ✅ Questions saved to `diagnostic_test_results`
- ✅ Analysis loads from database
- ✅ Learning path extracts lesson IDs correctly
- ✅ Section scores use questionDetails map

---

## EXECUTION PLAN

### Step 1: Run Schema Migration ✅
Run `fix_diagnostic_schema.sql` in Supabase SQL Editor to add `lesson_id` columns.

### Step 2: Verify Migration ✅
```bash
node check_actual_schema.js
```
Should show `lesson_id` column in practice test tables.

### Step 3: Populate lesson_id Values ⚠️ REQUIRED
Map each question to a lesson based on:
- `question_type` field
- `chapter` field
- Question content analysis

This is a MANUAL step that requires domain knowledge of which questions belong to which lessons.

### Step 4: Test Diagnostic Flow ✅
1. Start app: `npm start`
2. Take diagnostic test
3. Verify:
   - Results saved to `diagnostic_test_results`
   - Analysis created in `diagnostic_analysis`
   - Learning path created with lessons
   - UI shows results correctly

---

## CRITICAL PATH BLOCKER

**⚠️ WITHOUT lesson_id VALUES, THE DIAGNOSTIC WILL:**
- ✅ Save results to database
- ✅ Complete analysis without errors
- ❌ **Show 0 weak/strong lessons** (because lesson_id is NULL)
- ❌ **Generate empty learning path** (no lessons to recommend)
- ❌ **Provide no useful insights** (can't map to lessons)

**THE DIAGNOSTIC WILL TECHNICALLY WORK, BUT PROVIDE NO VALUE TO USERS.**

---

## RECOMMENDATION

1. ✅ Run `fix_diagnostic_schema.sql` NOW to add columns
2. ⚠️ Create a lesson mapping strategy:
   - Option A: Manual mapping based on content experts
   - Option B: AI-assisted mapping based on question analysis
   - Option C: Hybrid approach
3. ✅ Populate lesson_id for at least the diagnostic test questions (test_number = 1)
4. ✅ Test end-to-end with real data

**TIMELINE:**
- Schema fix: 1 minute
- Lesson mapping: Hours to days (depending on approach)
- Testing: 30 minutes

---

Would you like me to create a script to help populate the lesson_id values based on the existing data?
