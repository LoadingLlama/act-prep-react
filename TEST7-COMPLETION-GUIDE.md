# Practice Test 7 - Completion Guide

**Status:** Math Complete (60/215 = 28%) | Manual extraction required for remaining sections
**Date:** October 24, 2025

---

## ✅ COMPLETED WORK

### Math Section - 100% COMPLETE
- **Questions:** 60/60 inserted ✓
- **Answer Accuracy:** 100% verified ✓
- **Script:** `scripts/extraction/EXTRACT-TEST7-MATH-COMPLETE.mjs`
- **Execution Time:** ~30 minutes (automated agent extraction)
- **Database Status:** READY

---

## 📋 STEP-BY-STEP COMPLETION PLAN

### Phase 1: Science Section (Recommended Next - Least Copyright-Sensitive)

**Why Science First:**
- Contains experimental data, tables, and graphs (less copyright-sensitive than literary passages)
- 6 passages identified (DATA_REPRESENTATION, RESEARCH_SUMMARY types)
- Clear structure with numbered trials and results

**Extraction Steps:**

1. **Create Science Extraction Script:**
   ```bash
   # Template exists at:
   scripts/extraction/EXTRACT-TEST6-SCIENCE-COMPLETE.mjs

   # Create Test 7 version:
   cp scripts/extraction/EXTRACT-TEST6-SCIENCE-COMPLETE.mjs \
      scripts/extraction/EXTRACT-TEST7-SCIENCE-COMPLETE.mjs
   ```

2. **Extract 6 Science Passages:**
   - Passage I: Amoeba limax experiments (Q1-7)
   - Passage II: Amino acid production hypotheses (Q8-14)
   - Passage III: Physics motion experiments (Q15-21)
   - Passage IV: Soil compressive strength (Q22-27)
   - Passage V: (Q28-33)
   - Passage VI: (Q34-40)

3. **Source Lines:** 3801-5335 in Practice ACT 7.txt

4. **Answer Key (verify after extraction):**
   ```
   C,A,D,B,A,B,C,A,C,B,D,A,B,C,D,C,B,D,C,A,
   B,D,A,C,C,B,A,D,C,A,D,C,A,B,D,B,C,A,B,D
   ```

5. **Execute and Verify:**
   ```bash
   node scripts/extraction/EXTRACT-TEST7-SCIENCE-COMPLETE.mjs
   node scripts/extraction/VERIFY-TEST7-SCIENCE.mjs
   ```

**Estimated Time:** 2-3 hours

---

### Phase 2: Reading Section

**Extraction Steps:**

1. **Split into 2 batches** (easier to manage):
   - Script 1: Q1-20 (Passages 1-2)
   - Script 2: Q21-40 (Passages 3-4)

2. **Passages Identified:**
   - Passage 1 (Q1-10): LITERARY_NARRATIVE - "City Kid" by Nelson George
   - Passage 2 (Q11-20): SOCIAL_SCIENCE - Dual passage about gestures
   - Passage 3 (Q21-30): HUMANITIES
   - Passage 4 (Q31-40): NATURAL_SCIENCE

3. **Source Lines:** 2675-3801

4. **Answer Key:**
   ```
   D,B,A,C,A,D,B,A,C,D,A,D,C,B,C,A,A,D,C,B,
   C,C,A,B,D,B,C,D,A,A,D,B,B,C,D,A,C,B,A,D
   ```

5. **Template:**
   ```bash
   scripts/extraction/EXTRACT-TEST6-READING-COMPLETE.mjs
   ```

**Estimated Time:** 2-3 hours

---

### Phase 3: English Section (Most Complex - Do Last)

**Extraction Steps:**

1. **Split into 3 batches:**
   - Q1-25 (Passages 1-2)
   - Q26-50 (Passages 3-4)
   - Q51-75 (Passage 5)

2. **Special Requirements:**
   - Add `<u>underlined text</u>` HTML tags
   - Extract `context_before` and `context_after` for each question
   - Extract `underlined_text` field
   - 5 passages with full text

3. **Source Lines:** 50-1390

4. **Answer Key:**
   ```
   A,C,A,D,C,A,C,D,B,C,B,A,C,B,D,A,C,D,D,B,
   B,A,B,B,C,C,C,A,C,C,A,D,D,D,B,C,C,C,C,C,
   C,A,D,D,B,B,B,B,B,A,B,A,A,D,C,C,B,A,A,A,
   C,D,B,B,A,A,D,D,A,B,B,A,D,A,D
   ```

5. **Template:**
   ```bash
   scripts/extraction/EXTRACT-TEST6-ENGLISH-Q1-30-COMPLETE.mjs
   scripts/extraction/EXTRACT-TEST6-ENGLISH-Q31-75-COMPLETE.mjs
   ```

**Estimated Time:** 3-4 hours

---

## 🔧 POST-EXTRACTION CHECKLIST

Once all 215 questions are extracted:

### 1. Update Lesson Assignment Script
```javascript
// File: scripts/extraction/INTELLIGENT-LESSON-ASSIGNMENT-ALL-TESTS.mjs
// Line 187: Change from 6 to 7
for (let testNum = 1; testNum <= 7; testNum++) {  // ← Change this
```

### 2. Run Lesson Assignment
```bash
node scripts/extraction/INTELLIGENT-LESSON-ASSIGNMENT-ALL-TESTS.mjs
```

Expected output:
```
Processing Test 7...
  ✅ Test 7 complete

✅ INTELLIGENT LESSON ASSIGNMENT COMPLETE
Total questions updated: 1505
Errors encountered: 0
```

### 3. Create Verification Script
```javascript
// File: scripts/extraction/VERIFY-TEST7-COMPLETE.mjs
// Verify:
// - 215/215 questions inserted
// - 15/15 passages inserted
// - 100% answer accuracy
// - All lesson_ids assigned
```

### 4. Run Format Consistency Check
```bash
node scripts/extraction/CHECK-TEST7-FORMAT-CONSISTENCY.mjs
```

---

## 📊 FINAL SUCCESS CRITERIA

Test 7 will be 100% complete when:

- ✅ **Math:** 60/60 questions (DONE)
- ⏳ **Science:** 40/40 questions + 6 passages
- ⏳ **Reading:** 40/40 questions + 4 passages
- ⏳ **English:** 75/75 questions + 5 passages
- ⏳ **Lessons:** All 215 questions have lesson_id assigned
- ⏳ **Accuracy:** 100% answer key verification
- ⏳ **Consistency:** Format matches Tests 1-6

**Database Target:**
- Current: 1,350 questions (Tests 1-6 + Test 7 Math)
- Goal: 1,505 questions (all 7 tests complete)
- Remaining: 155 questions

---

## 💡 EXTRACTION TIPS

### General Workflow:
1. **Read source TXT** for section boundaries
2. **Extract in small batches** (10-15 questions at a time)
3. **Test frequently** - run script after each batch
4. **Verify answers** against official key immediately
5. **Check PDF** when OCR quality is poor
6. **Use Test 6 as reference** for exact formatting

### For Science:
- Extract experimental descriptions carefully
- Include all table data
- Note passage types (DATA_REPRESENTATION vs RESEARCH_SUMMARY)

### For Reading:
- Extract complete passage text (no truncation)
- Identify passage types correctly
- Link questions to passages via UUID

### For English:
- Use `<u>tags</u>` for underlined portions
- Extract context (5-10 words before/after)
- Note: "NO CHANGE" is always choice A when applicable

---

## 🎯 ESTIMATED COMPLETION TIME

| Section | Time | Status |
|---------|------|--------|
| Math | 0.5 hrs | ✅ DONE |
| Science | 2-3 hrs | ⏳ PENDING |
| Reading | 2-3 hrs | ⏳ PENDING |
| English | 3-4 hrs | ⏳ PENDING |
| Lesson Assignment | 0.5 hrs | ⏳ PENDING |
| Verification | 0.5 hrs | ⏳ PENDING |
| **TOTAL** | **9-13 hrs** | **28% COMPLETE** |

---

## 📁 KEY FILES

### Templates:
- `scripts/extraction/EXTRACT-TEST6-MATH-COMPLETE.mjs`
- `scripts/extraction/EXTRACT-TEST6-SCIENCE-COMPLETE.mjs`
- `scripts/extraction/EXTRACT-TEST6-READING-COMPLETE.mjs`
- `scripts/extraction/EXTRACT-TEST6-ENGLISH-Q1-30-COMPLETE.mjs`

### Test 7 Scripts Created:
- ✅ `scripts/extraction/EXTRACT-TEST7-MATH-COMPLETE.mjs`
- ✅ `scripts/extraction/VERIFY-TEST7-MATH.mjs`
- ⏳ `scripts/extraction/EXTRACT-TEST7-SCIENCE-COMPLETE.mjs` (to create)
- ⏳ `scripts/extraction/EXTRACT-TEST7-READING-COMPLETE.mjs` (to create)
- ⏳ `scripts/extraction/EXTRACT-TEST7-ENGLISH-Q1-75-COMPLETE.mjs` (to create)

### Documentation:
- `TEST7-EXTRACTION-STATUS.md` (initial status)
- `TEST7-PROGRESS-REPORT.md` (current progress)
- `TEST7-COMPLETION-GUIDE.md` (this file - action plan)

---

**Last Updated:** October 24, 2025
**Next Action:** Begin Science section extraction following Phase 1 steps above
**Current Progress:** 60/215 questions (28%)
**Target:** 100% extraction of all 215 questions with 100% accuracy
