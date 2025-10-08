# Quiz System Setup Instructions

This guide will help you set up the quiz system in Supabase for your ACT Prep application.

## Overview

The quiz system has been migrated from hardcoded JavaScript to Supabase for better scalability and management. Quizzes are now:
- Stored in Supabase database tables
- Fetched dynamically per lesson
- Track user progress and completion
- **Block lesson progression until completed** (for required quizzes)

## Database Schema

The quiz system uses 4 main tables:
1. **quizzes** - Quiz metadata (title, intro, type, position in lesson)
2. **quiz_questions** - Individual questions for each quiz
3. **quiz_options** - Answer options for each question
4. **user_quiz_progress** - Tracks user completion and scores

## Setup Steps

### Step 1: Create Database Tables

Run the SQL schema in your Supabase SQL editor:

```bash
# Copy the contents of create-quiz-tables.sql and run it in Supabase
cat scripts/create-quiz-tables.sql
```

Or go to your Supabase project → SQL Editor → New Query, then paste and execute the contents of `scripts/create-quiz-tables.sql`.

### Step 2: Migrate Quiz Data

After creating the tables, populate them with quiz data:

```bash
node scripts/migrate-quizzes-to-supabase.mjs
```

This will:
- Fetch all quizzes from `lessonQuizData.js`
- Link them to the appropriate lesson
- Insert all questions and answer options
- Set quiz positions and types

### Step 3: Verify Migration

Check that quizzes were created successfully:

```sql
-- In Supabase SQL Editor
SELECT
  q.id,
  q.title,
  q.quiz_type,
  q.position,
  COUNT(qq.id) as question_count,
  l.title as lesson_title
FROM quizzes q
LEFT JOIN quiz_questions qq ON qq.quiz_id = q.id
LEFT JOIN lessons l ON l.id = q.lesson_id
GROUP BY q.id, l.title
ORDER BY q.position;
```

## Quiz Types

- **practice** - Practice quizzes throughout the lesson
- **checkpoint** - Mid-lesson assessment
- **final** - Final mastery test (shows special completion message)

## Quiz Positions

Quizzes are inserted at specific positions in the lesson:
- **0** - Before any content (intro quiz)
- **1** - After first text section
- **2** - After second text section
- **N** - After Nth text section

Example for Sentence Structure lesson:
- Position 1: Clause Identification Quiz (practice)
- Position 2: FANBOYS & Compound Sentences (checkpoint)
- Position 3: Comma Splices & Fragments (practice)
- Position 4: Final Mastery Test (final)

## How It Works

### In the Code

1. **ProgressiveLessonRenderer.js** fetches quizzes when lesson loads:
   ```javascript
   const quizzes = await QuizzesService.getQuizzesByLessonId(lesson.id);
   ```

2. Quizzes are inserted into the lesson flow based on `position` field

3. **InteractiveQuiz.js** displays the quiz and tracks completion

4. Users **cannot advance** past a quiz until they complete it (handled by `LessonSection.js` and `ProgressiveLessonRenderer.js`)

### User Progress Tracking

When a user completes a quiz:
```javascript
QuizzesService.saveQuizProgress(userId, quizId, score, totalQuestions, answers);
```

This saves to `user_quiz_progress` table with:
- Score
- Total questions
- User's answers (JSON)
- Completion timestamp

## Adding New Quizzes

### Via Supabase UI

1. Insert into `quizzes` table:
   ```sql
   INSERT INTO quizzes (lesson_id, title, intro, quiz_type, position, is_required)
   VALUES (1, 'My New Quiz', 'Test your knowledge', 'practice', 2, true);
   ```

2. Insert questions into `quiz_questions`:
   ```sql
   INSERT INTO quiz_questions (quiz_id, question_text, question_order)
   VALUES (5, 'What is a clause?', 0);
   ```

3. Insert options into `quiz_options`:
   ```sql
   INSERT INTO quiz_options (question_id, option_text, is_correct, explanation, option_order)
   VALUES (10, 'A group of words with subject and verb', true, 'Correct!', 0);
   ```

### Via Migration Script

1. Add quiz data to `lessonQuizData.js`
2. Update `migrate-quizzes-to-supabase.mjs` with new quiz ID mapping
3. Run the migration script again

## Checking Quiz Completion

To check if a user has completed all required quizzes for a lesson:

```javascript
const allCompleted = await QuizzesService.hasCompletedRequiredQuizzes(userId, lessonId);
```

This is used to determine if the "Next Lesson" button should be enabled.

## Row Level Security (RLS)

The tables have RLS enabled:
- **Quizzes/Questions/Options**: Readable by everyone
- **User Quiz Progress**: Users can only see/modify their own progress

## Troubleshooting

### Quizzes not appearing
- Check that `lesson.id` is correctly set
- Verify quizzes exist in database for that lesson_id
- Check browser console for errors

### User progress not saving
- Verify user is authenticated (userId exists)
- Check RLS policies are correctly set
- Ensure `user_quiz_progress` table exists

### Migration script fails
- Ensure `.env` has correct Supabase credentials
- Check that lesson exists with `lesson_key = 'sentence-structure'`
- Verify tables were created first

## Next Steps

1. ✅ Tables created in Supabase
2. ✅ Quiz data migrated
3. ✅ Quiz service implemented
4. ✅ ProgressiveLessonRenderer updated to fetch from Supabase
5. ✅ Quizzes block progression until completed
6. 🔄 Add quizzes to other lessons as needed
7. 🔄 Build admin UI for managing quizzes (optional)

## Benefits

- **Scalable**: Add quizzes without code changes
- **Centralized**: All quiz data in one place
- **User Progress**: Track what students have completed
- **Flexible**: Easy to reorder, edit, or add new quizzes
- **Required Quizzes**: Block progression until mastery is demonstrated
