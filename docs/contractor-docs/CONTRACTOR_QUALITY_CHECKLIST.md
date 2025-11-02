# Quality Control Checklist for Reviewing Contractor Work

Use this checklist to verify each completed test before approving payment.

---

## Quick Verification Process (5 min per test)

### 1. Random Sample Check
Pick 5 random questions from each section and verify:

**English:**
- [ ] Open test in browser
- [ ] Navigate to 5 random questions (e.g., Q5, Q17, Q32, Q48, Q63)
- [ ] Check: Question text matches PDF
- [ ] Check: All answer choices present and correct
- [ ] Check: Passage text displays and is readable
- [ ] Check: Formatting preserved (bold, italic, underline)

**Math:**
- [ ] Navigate to 5 random questions
- [ ] Check: Question text matches PDF
- [ ] Check: All answer choices A-E present
- [ ] For questions with diagrams:
  - [ ] Image displays correctly
  - [ ] Image is clear and readable
  - [ ] Image loads quickly

**Reading:**
- [ ] Check 2 random passages
- [ ] Check 3 random questions
- [ ] Verify passage links to correct questions
- [ ] Check formatting and paragraph breaks

**Science:**
- [ ] Check 2 random passages
- [ ] Check 3 random questions
- [ ] Verify tables/data formatted correctly
- [ ] If images used, verify they display

---

## Database Verification (3 min per test)

### Check Table Counts
Run this to verify all content is entered:

```sql
-- English
SELECT test_number, COUNT(*) as question_count
FROM practice_test_english_questions
WHERE test_number = 1
GROUP BY test_number;
-- Should return: 75 questions

SELECT test_number, COUNT(*) as passage_count
FROM practice_test_english_passages
WHERE test_number = 1
GROUP BY test_number;
-- Should return: 5 passages

-- Math
SELECT test_number, COUNT(*) as question_count
FROM practice_test_math_questions
WHERE test_number = 1
GROUP BY test_number;
-- Should return: 60 questions

-- Reading
SELECT test_number, COUNT(*) as question_count
FROM practice_test_reading_questions
WHERE test_number = 1
GROUP BY test_number;
-- Should return: 40 questions

SELECT test_number, COUNT(*) as passage_count
FROM practice_test_reading_passages
WHERE test_number = 1
GROUP BY test_number;
-- Should return: 4 passages

-- Science
SELECT test_number, COUNT(*) as question_count
FROM practice_test_science_questions
WHERE test_number = 1
GROUP BY test_number;
-- Should return: 40 questions

SELECT test_number, COUNT(*) as passage_count
FROM practice_test_science_passages
WHERE test_number = 1
GROUP BY test_number;
-- Should return: 7 passages
```

---

## Common Issues to Look For

### ❌ JSON Format Errors
Check a few questions for proper JSON:
```sql
-- This will show questions with invalid JSON
SELECT id, question_number, choices
FROM practice_test_math_questions
WHERE test_number = 1
AND choices NOT LIKE '%"A":%';
```

### ❌ Missing Images
Check that all diagrams have URLs:
```sql
-- Math questions that might need images but don't have them
SELECT question_number, question_text
FROM practice_test_math_questions
WHERE test_number = 1
AND (question_text LIKE '%figure%' OR question_text LIKE '%diagram%' OR question_text LIKE '%shown below%')
AND (image_url IS NULL OR image_url = '');
```

### ❌ Broken Image Links
Verify 5 random image URLs by clicking them:
```sql
-- Get all image URLs for a test
SELECT question_number, image_url
FROM practice_test_math_questions
WHERE test_number = 1
AND image_url IS NOT NULL;
```
Click each URL - should open image in browser.

### ❌ Wrong Answer Letters
Check that correct_answer is always A, B, C, D, or E:
```sql
-- Find invalid answer letters
SELECT question_number, correct_answer
FROM practice_test_math_questions
WHERE test_number = 1
AND correct_answer NOT IN ('A', 'B', 'C', 'D', 'E');
```

---

## Full Test Verification (15 min per test)

### Take the Test Yourself
1. Go to localhost practice tests
2. Select Test 1
3. Start with English
4. Skim through all 75 questions
5. Look for:
   - [ ] Missing text
   - [ ] Garbled formatting
   - [ ] Broken images
   - [ ] Wrong answer choices
6. Repeat for Math, Reading, Science

---

## Feedback Template for Contractor

If you find issues, send this:

```
Test #1 Review Feedback:

ISSUES FOUND:

English:
- Q17: Missing bold formatting on "however"
- Q42: Choice C has typo: "runnning" should be "running"
- Passage 3: Missing paragraph break after line 2

Math:
- Q25: Image not uploaded (diagram missing)
- Q38: Answer choices have wrong letters (shows F, G, H instead of A, B, C)

Reading:
- Passage 2: Text runs together, needs paragraph breaks
- Q15: Question text incomplete, cuts off mid-sentence

Science:
- Passage 4: Table formatting broken, needs to be redone
- Q28: Linked to wrong passage

OVERALL:
- Total issues: 10
- Severity: Medium
- Please fix and resubmit

Next steps:
1. Fix all issues listed above
2. Reply when complete
3. I'll re-review within 24 hours
```

---

## Approval Criteria

✅ **APPROVE** if:
- [ ] All 215 questions present (75 English + 60 Math + 40 Reading + 40 Science)
- [ ] All passages present (5 English + 4 Reading + 7 Science)
- [ ] Random sample shows 95%+ accuracy
- [ ] No major formatting issues
- [ ] All images load correctly
- [ ] Test is fully playable on localhost

⚠️ **REQUEST FIXES** if:
- Minor typos (3-5 found)
- Some missing formatting
- 1-2 broken image links
- Small table formatting issues

❌ **REJECT** if:
- Missing 5+ questions
- Missing entire passages
- Many broken images (5+)
- Invalid JSON prevents questions from displaying
- Test doesn't work on localhost

---

## Payment Approval Process

1. **Contractor marks test complete** → Sends notification
2. **You run quick verification** (8 min) → Check counts and random sample
3. **If issues found** → Send feedback, wait for fixes
4. **If approved** → Mark as complete, release payment
5. **Bonus eligibility** → Zero issues found in full review = bonus

---

## Time Tracking

Expected times per test section:
- English: 2-3 hours
- Math: 2-3 hours
- Reading: 2 hours
- Science: 2-3 hours

**Red Flag:** If contractor claims < 6 hours for a full test, quality may be rushed. Do extra thorough review.

**Green Flag:** If contractor takes 9-12 hours, they're being careful. Still verify, but likely good quality.
