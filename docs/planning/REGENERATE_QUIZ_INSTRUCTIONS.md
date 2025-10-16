# English Mastery Quiz Regeneration Guide

## What This Does

Regenerates all English lesson mastery quizzes using Claude API to create 10 authentic, short ACT-style grammar questions per lesson.

## Prerequisites

### 1. Add Anthropic API Key to .env

```bash
# Add this line to your .env file
ANTHROPIC_API_KEY=sk-ant-api03-...your-key-here...
```

Get your API key from: https://console.anthropic.com/settings/keys

### 2. Verify Supabase Credentials

Make sure your `.env` has:
```bash
REACT_APP_SUPABASE_URL=https://your-project.supabase.co
SUPABASE_SERVICE_KEY=your-service-role-key-here
```

## Running the Script

```bash
node scripts/regenerate-english-mastery-quizzes.mjs
```

## What It Does

1. **Fetches all English lessons** from `lesson_metadata` table
2. **For each lesson:**
   - Calls Claude API with lesson content
   - Generates 10 short, ACT-style questions
   - Updates existing questions in `quiz_questions` table
   - Replaces answer options in `quiz_options` table
   - Sets `correct_answer_id` to the correct option
3. **Rate limiting:** 2-second delay between API calls
4. **Error handling:** Continues to next lesson if one fails
5. **Verification:** Shows summary of updated questions

## Expected Output

```
🚀 Starting English Mastery Quiz Regeneration

📚 Fetching English lessons from database...
✅ Found 22 English lessons

📖 Fetching lesson content...
✅ Loaded content for 22 lessons

📝 [1/22] Building Complete Sentences
  🤖 Calling Claude API...
  ✅ Generated 10 questions
  💾 Updating database...
  ✅ Database updated for sentence-structure
  ⏳ Waiting 2 seconds (rate limiting)...

[... continues for all lessons ...]

═══════════════════════════════════════════
📊 SUMMARY
═══════════════════════════════════════════
✅ Successfully processed: 22 lessons
📝 Total lessons: 22

🔍 Running verification query...

📋 Verification Results:
✅ Building Complete Sentences: 10 mastery questions
✅ Essential Comma Rules: 10 mastery questions
✅ Advanced Punctuation: 10 mastery questions
[... etc ...]

🎉 English Mastery Quiz Regeneration Complete!
```

## Question Format Generated

Each question follows this structure:

```
The scientist who had been working tirelessly, finally completed her research.

Which choice provides the best punctuation?

A. NO CHANGE
B. tirelessly finally
C. tirelessly; finally  ← CORRECT
D. tirelessly. Finally

Explanation: Option C correctly uses a semicolon to separate two independent clauses...
```

## Verification

After running, check in Supabase:

```sql
-- Verify all English lessons have 10 updated questions
SELECT
  lm.title,
  lm.lesson_key,
  COUNT(qq.id) as question_count,
  MAX(qq.updated_at) as last_updated
FROM lesson_metadata lm
LEFT JOIN quiz_questions qq ON lm.id = qq.lesson_id
WHERE lm.subject = 'english' AND qq.quiz_type = 'mastery'
GROUP BY lm.title, lm.lesson_key
ORDER BY last_updated DESC;
```

Expected: Every lesson shows `question_count: 10` with recent timestamps.

## Test in App

1. Start your dev server: `npm start`
2. Navigate to any English lesson
3. Complete the lesson and check the mastery quiz
4. Verify:
   - Questions are short (1-2 sentences)
   - 4 answer choices
   - Questions test the lesson concept
   - Explanations are clear

## Troubleshooting

### "Missing ANTHROPIC_API_KEY"
- Add `ANTHROPIC_API_KEY` to your `.env` file
- Restart the script

### "Claude API error: 401"
- Your API key is invalid
- Get a new key from https://console.anthropic.com/settings/keys

### "Failed to fetch lessons"
- Check Supabase credentials in `.env`
- Verify `SUPABASE_SERVICE_KEY` is the service role key (not anon key)

### "Rate limit exceeded"
- Script already includes 2-second delays
- If you hit limits, wait and run again
- It will resume from where it left off

### "No existing mastery questions found"
- Script will create new questions automatically
- This is expected for new lessons

## Cost Estimate

- Claude API: ~$0.015 per lesson (using Claude 3.5 Sonnet)
- 22 English lessons = ~$0.33 total
- Very affordable!

## Notes

- Script uses `claude-3-5-sonnet-20241022` model (latest)
- Questions are generated based on lesson content
- Existing questions are updated (not deleted and recreated)
- Safe to run multiple times (idempotent)
- Logs progress to console for monitoring

## Next Steps

After successful run:
1. ✅ Test questions in the app
2. ✅ Review a few questions manually in Supabase
3. ✅ Confirm difficulty levels are appropriate
4. ✅ Check explanations cite the correct grammar rules

---

**Script location:** `/scripts/regenerate-english-mastery-quizzes.mjs`
**Database tables updated:** `quiz_questions`, `quiz_options`
**API used:** Anthropic Claude 3.5 Sonnet
