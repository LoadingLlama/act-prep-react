# Test Insights Page - Bugs & Inconsistencies Report

**Generated:** December 11, 2025
**Page:** InsightsPage.jsx + TestResultsCard.jsx

---

## 🐛 Critical Bugs

### 1. **Zero Scores Displayed for All Tests**
**Status:** 🔴 CRITICAL BUG

**Symptoms:**
- Diagnostic Test shows: `Score: 0/215` with composite score `0`
- Practice Tests show: `Score: 0/215` with composite score `1`

**Root Cause:**
The `practice_test_results` table has NO data for these test sessions, meaning:
- No question-level results were saved during test submission
- The `getSessionSectionBreakdown()` function returns empty breakdown
- TestResultsCard falls back to showing 0 correct answers

**Why This Happens:**
When practice tests are submitted, the results aren't being properly saved to the `practice_test_results` table. Only the session record in `practice_test_sessions` is created.

**Impact:**
- Users can't review their answers
- No section breakdown available
- Composite ACT scores are meaningless (0 or 1 instead of actual 1-36 scale)
- "View Review" button likely doesn't work properly

**Files Affected:**
- `src/services/practice/practiceTestResultProcessor.js` - Results not being saved
- `src/services/api/practiceTests.service.js:619-681` - getSessionSectionBreakdown returns null
- `src/components/insights/TestResultsCard.jsx:173-214` - Falls back to 0 scores

**Fix Required:**
Ensure practice test submission properly saves all 215 question results to `practice_test_results` table with:
- `practice_session_id`
- `question_id`
- `section` (english/math/reading/science)
- `user_answer`
- `correct_answer`
- `is_correct`

---

### 2. **Inconsistent Composite Score Calculation**
**Status:** 🟡 MEDIUM BUG

**Symptoms:**
- Tests with 0/215 show composite score of `1` instead of `0`
- Minimum ACT score should be 1, but scoring logic is inconsistent

**Root Cause:**
In `TestResultsCard.jsx:275`, when no section data exists:
```javascript
const compositeScore = calculateComposite(actScores);
```

If all sections have 0 correct, `convertToACTScore()` returns 1 (minimum ACT score), but composite calculation may average to 0 or 1 inconsistently.

**Impact:**
- Misleading scores displayed to users
- 0/215 should not show composite score at all, or show "N/A"

**Files Affected:**
- `src/components/insights/TestResultsCard.jsx:270-275`
- `src/utils/actScoreConversion.js` - Score conversion logic

**Fix Required:**
Add validation: if `totalCorrect === 0`, display "No Score" or hide composite score entirely.

---

### 3. **Missing Question-by-Question Review Data**
**Status:** 🔴 CRITICAL BUG

**Symptoms:**
- Clicking "View Review" on practice tests likely shows empty or broken review
- No question-level data to display

**Root Cause:**
The `practice_test_results` table is empty for these sessions, so:
1. `PracticeTestReview` component can't load question details
2. Can't show which questions were wrong
3. Can't show explanations for missed questions

**Files Affected:**
- `src/components/PracticeTestReview.jsx` - Expects results data
- `src/services/api/practiceTests.service.js` - Query returns empty results

**Fix Required:**
Same as Bug #1 - properly save results during test submission.

---

### 4. **Diagnostic Test Score 0/215**
**Status:** 🟠 HIGH PRIORITY

**Symptoms:**
- Diagnostic test completed on 11/17/2025 shows 0/215
- Should have actual results if test was completed

**Root Cause:**
Similar to practice tests - `diagnostic_test_results` table may be empty for this session.

**Verification Needed:**
Check if diagnostic results processor is saving to database properly:
```javascript
// src/services/diagnostic/diagnosticResultProcessor.js
```

**Files Affected:**
- `src/services/diagnostic/diagnosticResultProcessor.js` - May not be saving results
- `src/services/api/insights.service.js:46-128` - getDiagnosticInsights

**Fix Required:**
Verify diagnostic submission saves all 215 results to `diagnostic_test_results` table.

---

## ⚠️ UI/UX Inconsistencies

### 5. **Confusing "Completed" Badge**
**Status:** 🟡 MEDIUM ISSUE

**Symptoms:**
- All tests show green "✓ Completed" badge
- But scores are 0/215 (clearly not actually completed)

**Issue:**
The badge only checks `is_completed` flag in database, not whether results exist.

**Impact:**
- Misleading UI - users think test was properly saved
- No indication that data is missing

**Fix Required:**
Add validation: only show "Completed" if `correct_answers > 0` OR results exist in `*_results` table.

---

### 6. **Inconsistent Test Number Display**
**Status:** 🟢 MINOR ISSUE

**Symptoms:**
- Practice tests show "Practice Test 2", "Practice Test 3", "Practice Test 5"
- DB stores as test_number 3, 4, 6 (adding 1 to display number)

**Impact:**
- Low - this is intentional (DB test 2-7 displays as 1-6)
- But could confuse debugging

**Files Affected:**
- `src/pages/InsightsPage.jsx:743-752` - Backward compatibility conversion
- `src/components/insights/TestResultsCard.jsx:310-312` - Display conversion

**Fix Required:**
None - working as designed. Just document the conversion.

---

### 7. **No "Missing Data" Warning**
**Status:** 🟡 MEDIUM ISSUE

**Symptoms:**
- No warning shown when test has 0 results
- Users don't know their data is missing

**Impact:**
- Poor UX - users assume test data is valid
- No call-to-action to retake test

**Fix Required:**
Add warning badge: "⚠️ Results Missing - Please Retake Test" when `totalCorrect === 0`.

---

## 🔧 Button/Navigation Issues

### 8. **"View Review" Button State**
**Status:** ⚡ NEEDS VERIFICATION

**Symptoms:**
- Unknown if button is disabled for tests with no results
- May crash or show empty review modal

**Verification Needed:**
Test clicking "View Review" on test with 0/215 score.

**Expected Behavior:**
- Should show error message: "No review data available"
- OR disable button entirely with tooltip

**Files Affected:**
- `src/components/PracticeTestReview.jsx`
- `src/components/DiagnosticTestReview.jsx`

---

### 9. **Section Scores Not Displayed**
**Status:** 🟡 MEDIUM ISSUE

**Symptoms:**
- TestResultsCard only shows composite score
- Section breakdown (English: X, Math: Y, Reading: Z, Science: W) not visible on main cards

**Impact:**
- Users can't see which sections they did well/poorly in
- Have to click into review to see breakdown

**Fix Required:**
TestResultsCard.jsx currently hides section scores. Consider showing them:
```javascript
// Currently unused:
const sections = type === 'diagnostic'
  ? calculateDiagnosticSections(testData)
  : calculatePracticeTestSections(testData);
```

These sections are calculated but not rendered in the card.

---

## 📊 Data Integrity Issues

### 10. **Practice Test Dates All Same Day**
**Status:** 🟢 INFORMATIONAL

**Symptoms:**
- All 3 practice tests taken on 12/4/2025
- Diagnostic on 11/17/2025

**Impact:**
- None - this is valid user behavior
- But indicates possible test data issue if user was testing the system

---

## 🎯 Recommended Fixes Priority

### URGENT (Fix Immediately):
1. ✅ **Bug #1**: Fix practice test result saving
2. ✅ **Bug #3**: Ensure question-level data is saved
3. ✅ **Bug #4**: Verify diagnostic results saving

### HIGH (Fix Soon):
4. ✅ **Bug #2**: Fix composite score for 0 results
5. ✅ **Issue #5**: Add proper validation for "Completed" badge
6. ✅ **Issue #7**: Add "Missing Data" warnings

### MEDIUM (Nice to Have):
7. ✅ **Issue #8**: Disable/hide review button when no data
8. ✅ **Issue #9**: Show section scores on cards

---

## 🔍 Debugging Steps

### 1. Check Database for Results

```sql
-- Check diagnostic results
SELECT COUNT(*) FROM diagnostic_test_results
WHERE diagnostic_session_id = '<session_id>';

-- Check practice test results
SELECT COUNT(*) FROM practice_test_results
WHERE practice_session_id = '<session_id>';
```

**Expected:** 215 rows for each completed test
**Actual:** Likely 0 rows

### 2. Check Test Submission Flow

Add logging to:
- `src/services/practice/practiceTestResultProcessor.js`
- `src/services/diagnostic/diagnosticResultProcessor.js`

Log when saving results to database.

### 3. Test Practice Test Flow

1. Start new practice test
2. Answer all questions
3. Submit test
4. Check console for database save logs
5. Query database for results
6. Navigate to Insights page
7. Check if scores display correctly

---

## 📝 Summary

**Total Bugs Found:** 10
**Critical:** 3
**High:** 1
**Medium:** 4
**Minor:** 2

**Main Issue:** Practice test and diagnostic test results are not being saved to the `*_results` tables, causing:
- Zero scores displayed
- No question-by-question review available
- Meaningless composite scores
- Poor user experience

**Root Cause:** The test result processor isn't properly saving individual question results to the database after test submission.

**Recommended Action:** Audit and fix the test submission/processing pipeline to ensure all 215 question results are saved for each test.
