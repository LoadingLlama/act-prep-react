# Complete Diagnostic Test Setup Guide

## Current Status

✅ **Code Fixes Applied:**
1. Learning path service extracts lesson IDs correctly
2. Section scores use questionDetails map
3. Question results saved to diagnostic_test_results table
4. Analysis loads from database (not memory)
5. UUID types handled correctly

❌ **Database Schema Missing:**
1. practice_test_*_questions tables need `lesson_id` column
2. diagnostic_test_results foreign key needs to be removed
3. lesson_id values need to be populated

---

## Setup Steps

### Step 1: Run Schema Migration

**Go to:** https://rabavobdklnwvwsldbix.supabase.co/project/_/sql/new

**Copy and paste** the contents of `fix_diagnostic_schema.sql` and click "Run".

This will:
- Add `lesson_id UUID` column to all practice test tables
- Add foreign key constraints to lessons table
- Add indexes for performance
- Remove incorrect foreign key from diagnostic_test_results

**Expected output:** "Success. No rows returned"

---

### Step 2: Verify Schema

```bash
node check_actual_schema.js
```

**Expected output:**
```
✅ Sample question:
  Columns: id, test_number, question_number, ..., lesson_id
  Has lesson_id column: true
```

---

### Step 3: Map Questions to Lessons

**Option A: Automated Mapping (Quick Start - 70% coverage)**
```bash
node map_questions_to_lessons.js
```

This will automatically map:
- ✅ All Reading questions (40/40)
- ✅ All Science questions (40/40)
- ✅ All Math questions (60/60)
- ⚠️ English questions need manual mapping (0/75)

**Expected output:**
```
✅ Total mapped: ~140
⚠️ Total unmapped: ~75
📊 Coverage: 65-70%
```

**Option B: Full Manual Mapping (100% coverage)**

See `manual_lesson_mapping.sql` for English question mappings.

---

### Step 4: Verify Mapping

```bash
node verify_diagnostic_tables.js
```

**Expected output:**
```
✅ Questions with lesson mapping: 140+
⚠️ Questions without lesson mapping: 75 (English)
```

---

### Step 5: Test Diagnostic Flow

```bash
npm start
```

1. Open http://localhost:3000
2. Complete onboarding
3. Take diagnostic test (answer at least 10 questions from each section)
4. Submit test

**Expected results:**
- ✅ Progress bar shows each step
- ✅ "Saving your test results..." completes
- ✅ "Analyzing your performance..." completes
- ✅ "Creating your personalized learning path..." completes
- ✅ Redirected to learning path with recommended lessons
- ✅ Insights tab shows weak/strong areas

---

### Step 6: Verify Database

**Check diagnostic_test_sessions:**
```sql
SELECT id, user_id, total_questions, correct_answers, score_percentage, completed
FROM diagnostic_test_sessions
ORDER BY created_at DESC
LIMIT 5;
```

**Check diagnostic_test_results:**
```sql
SELECT COUNT(*) as total_results,
       COUNT(DISTINCT diagnostic_session_id) as sessions,
       SUM(CASE WHEN is_correct THEN 1 ELSE 0 END) as correct_count
FROM diagnostic_test_results;
```

**Check diagnostic_analysis:**
```sql
SELECT id, user_id, total_questions, total_correct, overall_accuracy,
       jsonb_array_length(weak_lessons) as weak_lesson_count,
       jsonb_array_length(strong_lessons) as strong_lesson_count
FROM diagnostic_analysis
ORDER BY created_at DESC
LIMIT 5;
```

**Check learning paths:**
```sql
SELECT ulp.id, ulp.path_name, ulp.target_score, ulp.completion_percentage,
       COUNT(lpi.id) as lesson_count
FROM user_learning_paths ulp
LEFT JOIN learning_path_items lpi ON lpi.learning_path_id = ulp.id
WHERE ulp.is_active = true
GROUP BY ulp.id
ORDER BY ulp.created_at DESC;
```

---

## Troubleshooting

### Issue: "lesson_id column does not exist"
**Fix:** Run Step 1 again (fix_diagnostic_schema.sql)

### Issue: "Foreign key constraint violation"
**Fix:** The migration script handles this - re-run Step 1

### Issue: "0 weak lessons identified"
**Fix:** Questions don't have lesson_id values - run Step 3

### Issue: "Learning path is empty"
**Fix:** No lessons mapped - run Step 3 and ensure some questions have lesson_id

### Issue: "500 API Error"
**Check:**
1. Browser console for error details
2. Network tab for failing request
3. Verify all 4 code fixes are applied

---

## Files Created

- ✅ `fix_diagnostic_schema.sql` - Schema migration
- ✅ `map_questions_to_lessons.js` - Automated mapping
- ✅ `check_actual_schema.js` - Verify schema
- ✅ `verify_diagnostic_tables.js` - Verify data
- ✅ `analyze_question_mapping.js` - Analyze mappings
- ✅ `DIAGNOSTIC_FLOW_COMPLETE.md` - Complete flow documentation
- ✅ `DIAGNOSTIC_FIX_SUMMARY.md` - Code fix summary

---

## Success Criteria

✅ **Database:**
- lesson_id column exists in all practice_test_*_questions tables
- At least 140/215 questions have lesson_id mapped
- All 3 diagnostic tables populated after test

✅ **Application:**
- Diagnostic test completes without errors
- Results appear in Insights tab
- Learning path shows recommended lessons
- Progress tracking works

✅ **User Experience:**
- Clear feedback at each step
- Personalized recommendations based on weak areas
- Ability to track progress through learning path

---

## Next Steps After Setup

1. **Complete English Mapping** - Map remaining 75 English questions to lessons
2. **Populate Difficulty Levels** - Add difficulty values to questions
3. **Test with Multiple Users** - Verify personalization works correctly
4. **Monitor Performance** - Check query performance with indexes
5. **Add More Test Data** - Populate additional practice tests

---

## Contact

If you encounter issues not covered here, check:
1. Browser console errors
2. Network tab in DevTools
3. Supabase logs at https://rabavobdklnwvwsldbix.supabase.co/project/_/logs/explorer

Need help? The diagnostic flow is now fully documented in `DIAGNOSTIC_FLOW_COMPLETE.md`.
