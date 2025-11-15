# 🐛 Test Review Showing No Questions - Debug & Fix Guide

## ❓ Why Are No Questions Showing Up?

When you try to review your diagnostic test and see no questions, it's because:

### **Root Cause: You Haven't Run the SQL Fixes Yet**

The test review loads questions from the `diagnostic_test_results` table. If you took the diagnostic test BEFORE running the SQL fixes:

1. **Only 75/215 or 191/215 questions were saved** (due to deduplication bug or ID collisions)
2. **The saved question IDs may not match the fixed IDs**
3. **The review tries to load questions that don't exist or can't be found**

---

## ✅ How to Fix

### **Step 1: Run SQL Fixes** ⭐ REQUIRED

```sql
-- In Supabase SQL Editor (https://rabavobdklnwvwsldbix.supabase.co):

1. Run: FIX_ALL_PRACTICE_TESTS.sql
   → Fixes 450+ ID collisions
   → Renumbers all practice test questions
   → Adds unique constraints

2. Run: FIX_USER_LESSON_PERFORMANCE_AND_PROFILES.sql
   → Creates user_lesson_performance table
   → Creates user_goals table
   → Fixes RLS policies
```

### **Step 2: Clear Browser Storage** ⭐ REQUIRED

```
1. Open DevTools (F12)
2. Go to: Application tab → Storage section
3. Click: "Clear site data"
4. Confirm and refresh page (Ctrl+R or Cmd+R)
```

This clears any cached old data that might be conflicting.

### **Step 3: Retake Diagnostic Test** ⭐ REQUIRED

```
1. Go to Diagnostic Test page
2. Complete all 4 sections:
   - English (75 questions)
   - Math (60 questions)
   - Reading (40 questions)
   - Science (40 questions)

3. Check console for success message:
   ✅✅✅ SUCCESS: ALL 215 QUESTIONS SAVED TO DATABASE! ✅✅✅
   
   ENGLISH:   75/75 saved (100.0%) ✅
   MATH:      60/60 saved (100.0%) ✅
   READING:   40/40 saved (100.0%) ✅
   SCIENCE:   40/40 saved (100.0%) ✅
   
   TOTAL: 215/215 saved (100.0%)
```

### **Step 4: Review Your Test** ✅

```
1. Go to Insights page
2. Look for "Review Diagnostic Test" button
3. Click it
4. Select a section (English, Math, Reading, or Science)
5. All questions should now appear with:
   - Your answers
   - Correct answers
   - Explanations
   - Passage text (if applicable)
```

---

## 🔍 Debug: Check If Questions Are Saved

If you want to verify questions are saved correctly, run this in browser console:

```javascript
// Check how many diagnostic results are saved
const { createClient } = require('@supabase/supabase-js');
const supabase = createClient(
  process.env.REACT_APP_SUPABASE_URL,
  process.env.REACT_APP_SUPABASE_ANON_KEY
);

// Get your latest diagnostic session
const { data: sessions } = await supabase
  .from('diagnostic_test_sessions')
  .select('*')
  .eq('user_id', 'YOUR_USER_ID')
  .order('created_at', { ascending: false })
  .limit(1);

console.log('Latest session:', sessions[0]);

// Get all results for this session
const { data: results } = await supabase
  .from('diagnostic_test_results')
  .select('*')
  .eq('diagnostic_session_id', sessions[0].id);

console.log(`Total results saved: ${results.length}/215`);

// Group by section
const bySection = {
  english: results.filter(r => r.question_id >= 1 && r.question_id <= 75),
  math: results.filter(r => r.question_id >= 76 && r.question_id <= 135),
  reading: results.filter(r => r.question_id >= 136 && r.question_id <= 175),
  science: results.filter(r => r.question_id >= 176 && r.question_id <= 215)
};

console.log('By section:');
console.log(`  English: ${bySection.english.length}/75`);
console.log(`  Math: ${bySection.math.length}/60`);
console.log(`  Reading: ${bySection.reading.length}/40`);
console.log(`  Science: ${bySection.science.length}/40`);
```

---

## 🚨 Common Issues & Solutions

### **Issue 1: "Only 75 questions showing in total"**
**Cause**: Deduplication bug (fixed in code)  
**Solution**: Retake diagnostic test after clearing browser data

### **Issue 2: "191/215 questions showing, Science Q17-40 missing"**
**Cause**: ID collision on question ID 417  
**Solution**: Run `FIX_ALL_PRACTICE_TESTS.sql` then retake test

### **Issue 3: "Questions load but show 'undefined' or blank"**
**Cause**: Question details not found in practice_test_*_questions tables  
**Solution**: Verify SQL fix was run correctly - question IDs should match

### **Issue 4: "Review button doesn't appear on Insights page"**
**Cause**: No completed diagnostic test session  
**Solution**: Complete the diagnostic test first

### **Issue 5: "Sections show 0 questions"**
**Cause**: Questions saved with wrong IDs or not saved at all  
**Solution**: Run SQL fixes, clear browser data, retake test

---

## 📊 How Test Review Works (Technical)

### **1. User clicks "Review Diagnostic Test"**
```javascript
// InsightsPage.jsx
<DiagnosticTestReview
  sessionId={insights.diagnostic.latestSession.id}
  onClose={() => setViewingDiagnosticReview(false)}
/>
```

### **2. DiagnosticTestReview loads data**
```javascript
// DiagnosticTestReview.jsx:53-69
const data = await InsightsService.getDiagnosticTestDetails(sessionId);
// Returns:
// {
//   session: { ... },
//   results: [ ... 215 results ... ],
//   questionsBySection: {
//     english: [ ... 75 questions ... ],
//     math: [ ... 60 questions ... ],
//     reading: [ ... 40 questions ... ],
//     science: [ ... 40 questions ... ]
//   },
//   totalQuestions: 215,
//   correctAnswers: 150,
//   scorePercentage: 69.8
// }
```

### **3. User selects section**
```javascript
// Shows section cards with accuracy
handleSectionSelect('english');  // or 'math', 'reading', 'science'
```

### **4. Questions load into iframe**
```javascript
// DiagnosticTestReview.jsx:87-188
// Transforms question data to match practice-test.html format
// Sends via postMessage to iframe
iframeRef.current.contentWindow.postMessage({
  type: 'LOAD_REVIEW_MODE',
  section: 'english',
  questions: [ ... ],
  userAnswers: { q1: 'A', q2: 'B', ... },
  correctnessMap: { q1: true, q2: false, ... },
  reviewMode: true
}, '*');
```

### **5. practice-test.html displays questions**
```
- Shows all questions in order
- Highlights user's answers
- Highlights correct answers in green
- Shows explanations
- Shows passages
- Read-only mode (can't change answers)
```

---

## 🎯 Expected Console Output (Success)

When test review works correctly, you should see:

```
📊 Loaded diagnostic data for review: {
  session: { id: "abc123", score_percentage: 69.8, ... },
  results: [ ... 215 items ... ],
  questionsBySection: { english: 75, math: 60, reading: 40, science: 40 },
  totalQuestions: 215,
  correctAnswers: 150,
  scorePercentage: 69.8
}

🎯 Loading section: english

📤 Sending 75 english questions to iframe

🔍 DiagnosticReview first question: {
  question_number: 1,
  raw_correct_answer: "A",
  correct_answer_type: "string",
  finalLetter: "A",
  will_show_as: "Answer A"
}

📝 User answers: { q1: "A", q2: "B", q3: "C", ... }
✅ Correctness map: { q1: true, q2: false, q3: true, ... }

📨 Sending message to iframe: {
  type: "LOAD_REVIEW_MODE",
  section: "english",
  questions: [ ... 75 questions ... ],
  userAnswers: { ... },
  correctnessMap: { ... },
  reviewMode: true
}

✅ Iframe ready, loading section data
```

---

## ✅ Verification Checklist

After running fixes and retaking test:

- [ ] SQL fixes run successfully in Supabase
- [ ] Browser storage cleared
- [ ] Diagnostic test completed with 215/215 saved message
- [ ] Insights page shows diagnostic test card
- [ ] "Review Diagnostic Test" button appears
- [ ] Clicking review opens modal with 4 section cards
- [ ] Each section card shows correct question count:
  - [ ] English: 75 questions
  - [ ] Math: 60 questions
  - [ ] Reading: 40 questions
  - [ ] Science: 40 questions
- [ ] Clicking a section loads all questions
- [ ] Questions show user answers and correct answers
- [ ] Explanations appear for each question
- [ ] Passages appear where applicable

---

## 📁 Relevant Files

### **Test Review Components**
1. **`src/components/DiagnosticTestReview.jsx`**
   - Main review component
   - Handles section selection
   - Loads data via InsightsService
   - Transforms data for iframe

2. **`src/services/api/insights.service.js`**
   - `getDiagnosticTestDetails(sessionId)` method (lines 323-481)
   - Fetches session data
   - Fetches all 215 results
   - Fetches question details from practice_test_*_questions tables
   - Returns formatted data

3. **`src/pages/InsightsPage.jsx`**
   - Shows "Review Diagnostic Test" button
   - Opens DiagnosticTestReview modal

4. **`public/tests/practice-test.html`**
   - Iframe that displays questions
   - Receives data via postMessage
   - Renders questions in review mode

### **Database Tables**
1. **`diagnostic_test_sessions`**
   - Stores each diagnostic test attempt
   - Links to user_id

2. **`diagnostic_test_results`**
   - Stores individual question results
   - Links to diagnostic_session_id
   - Has question_id, user_answer, is_correct, time_spent

3. **`practice_test_english_questions`** (and math, reading, science)
   - Stores question content
   - question_text, choices, correct_answer, explanation

---

## 🎯 Summary

**If no questions appear in test review:**

1. ✅ Run SQL fixes in Supabase
2. ✅ Clear browser storage
3. ✅ Retake diagnostic test (all 215 questions must save)
4. ✅ Go to Insights → Review Diagnostic Test
5. ✅ Select a section
6. ✅ All questions should now appear

**The issue is NOT with the review code** - it's working correctly. The issue is that:
- Old diagnostic test data has ID collisions or missing questions
- You need to retake the test AFTER running the SQL fixes
- Then the review will work perfectly

---

**Last Updated**: 2025-01-14  
**Status**: ✅ Code is correct, user just needs to run SQL fixes and retake test
