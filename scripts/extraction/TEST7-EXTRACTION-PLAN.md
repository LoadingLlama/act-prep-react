# PRACTICE TEST 7 - COMPLETE EXTRACTION PLAN

## Overview
Extract all 215 questions + 15 passages from Practice ACT 7 with 100% accuracy.

## Verified Answer Keys
```javascript
const ANSWER_KEYS = {
  english: ['A','C','A','D','C','A','C','D','B','C','B','A','C','B','D','A','C','D','D','B','B','A','B','B','C','C','C','A','C','C','A','D','D','D','B','C','C','C','C','C','C','A','D','D','B','B','B','B','B','A','B','A','A','D','C','C','B','A','A','A','C','D','B','B','A','A','D','D','A','B','B','A','D','A','D'],
  math: ['A','B','D','C','B','E','B','C','A','B','D','D','C','A','E','B','D','E','B','C','B','A','D','D','B','C','A','B','A','D','B','E','A','C','C','E','A','B','E','C','D','C','A','B','A','D','C','B','E','D','D','B','E','D','E','A','C','B','D','A'],
  reading: ['D','B','A','C','A','D','B','A','C','D','A','D','C','B','C','A','A','D','C','B','C','C','A','B','D','B','C','D','A','A','D','B','B','C','D','A','C','B','A','D'],
  science: ['C','A','D','B','A','B','C','A','C','B','D','A','B','C','D','C','B','D','C','A','B','D','A','C','C','B','A','D','C','A','D','C','A','B','D','B','C','A','B','D']
};
```

## Source File Analysis
**File:** `/Users/cadenchiang/Desktop/actprep copy/actclass.org/practice acts/Practice ACT 7.txt`
**Total Lines:** 7,023

### Section Boundaries
- **English:** Lines 65-1390 (5 passages, 75 questions)
- **Math:** Lines 1390-2675 (60 questions)
- **Reading:** Lines 2675-3801 (4 passages, 40 questions)
- **Science:** Lines 3801-7023 (6-7 passages, 40 questions)

### English Passages
1. **Passage 1** (Line 65): "King Tut's Space Bug" - Q1-15
2. **Passage 2** (Line 306): "Not All It's Krakened Up to Be" - Q16-30
3. **Passage 3** (Line 564): "Programmed for Success" - Q31-45
4. **Passage 4** (Line 820): "Painting Outside the Lines" - Q46-60
5. **Passage 5** (Line 1099): "In Tune" - Q61-75

## Extraction Strategy

### Phase 1: Create Extraction Scripts ✅
Following the exact format of Test 6 extraction scripts:
- `EXTRACT-TEST7-ENGLISH-COMPLETE.mjs`
- `EXTRACT-TEST7-MATH-COMPLETE.mjs`
- `EXTRACT-TEST7-READING-COMPLETE.mjs`
- `EXTRACT-TEST7-SCIENCE-COMPLETE.mjs`

### Phase 2: Manual Data Extraction
Each script needs the following data manually extracted from the TXT file:

#### For English:
```javascript
const passage = {
  test_number: 7,
  passage_number: 1,
  title: "Passage Title",
  passage_text: `Complete passage text...`
};

const question = {
  test_number: 7,
  question_number: 1,
  passage_number: 1,
  question_stem: "Full question with <u>underlined</u> portions...",
  underlined_text: "text that was underlined",
  context_before: "text before underline",
  context_after: "text after underline",
  choice_a: "NO CHANGE",
  choice_b: "option B",
  choice_c: "option C",
  choice_d: "option D",
  correct_answer: "A", // from answer key
  question_type: "punctuation|usage|style|organization|revision",
  question_category: "CSE|KLA|POW"
};
```

#### For Math:
```javascript
const question = {
  test_number: 7,
  question_number: 1,
  question_stem: "Full question text...",
  choice_a: "Option A",
  choice_b: "Option B (or F for even questions)",
  choice_c: "Option C (or G)",
  choice_d: "Option D (or H)",
  choice_e: "Option E (or K)",
  correct_answer: "A", // from answer key, normalized to A-E
  question_type: "algebra|geometry|probability|etc",
  question_category: "ALG|GEO"
};
```

#### For Reading:
```javascript
const passage = {
  test_number: 7,
  passage_number: 1,
  title: "Passage Title",
  passage_text: `Complete passage text...`,
  passage_type: "Prose Fiction|Social Science|Humanities|Natural Science"
};

const question = {
  test_number: 7,
  question_number: 1,
  passage_number: 1,
  question_stem: "Full question text...",
  choice_a: "Option A",
  choice_b: "Option B (or F)",
  choice_c: "Option C (or G)",
  choice_d: "Option D (or H)",
  correct_answer: "D", // from answer key
  question_type: "detail|inference|main_idea|etc",
  question_category: "RDG"
};
```

#### For Science:
```javascript
const passage = {
  test_number: 7,
  passage_number: 1,
  title: "Study/Experiment Title",
  passage_text: `Complete passage with tables/figures described...`,
  passage_type: "Data Representation|Research Summaries|Conflicting Viewpoints"
};

const question = {
  test_number: 7,
  question_number: 1,
  passage_number: 1,
  question_stem: "Full question text...",
  choice_a: "Option A",
  choice_b: "Option B (or F)",
  choice_c: "Option C (or G)",
  choice_d: "Option D (or H)",
  correct_answer: "C", // from answer key
  question_type: "data_interpretation|scientific_investigation|etc",
  question_category: "SCI"
};
```

### Phase 3: Execute Extraction Scripts
```bash
# Run each script in sequence
node scripts/extraction/EXTRACT-TEST7-ENGLISH-COMPLETE.mjs
node scripts/extraction/EXTRACT-TEST7-MATH-COMPLETE.mjs
node scripts/extraction/EXTRACT-TEST7-READING-COMPLETE.mjs
node scripts/extraction/EXTRACT-TEST7-SCIENCE-COMPLETE.mjs
```

### Phase 4: Update Lesson Assignment
Modify `INTELLIGENT-LESSON-ASSIGNMENT-ALL-TESTS.mjs`:
```javascript
// Change from:
for (let testNum = 1; testNum <= 6; testNum++)

// To:
for (let testNum = 1; testNum <= 7; testNum++)
```

### Phase 5: Run Lesson Assignment
```bash
node scripts/lessons/INTELLIGENT-LESSON-ASSIGNMENT-ALL-TESTS.mjs
```

### Phase 6: Verify
```bash
# Check database counts
# Should show:
# - 215 new questions (7 * ~30.7 avg)
# - 15 new passages (5 English + 4 Reading + 6-7 Science)
# - All answers match verified answer keys
# - All questions have lesson_id assigned
```

## Reference Files
Study these Test 6 files for exact format:
- `EXTRACT-TEST6-ENGLISH-Q1-30-COMPLETE.mjs`
- `EXTRACT-TEST6-ENGLISH-Q31-75-COMPLETE.mjs`
- `EXTRACT-TEST6-MATH-COMPLETE.mjs`
- `EXTRACT-TEST6-READING-COMPLETE.mjs`
- `EXTRACT-TEST6-SCIENCE-COMPLETE.mjs`

## Quality Checklist
- [ ] All 215 questions extracted
- [ ] All 15 passages extracted
- [ ] Underlined portions properly marked with `<u>` tags (English only)
- [ ] All answer keys match verified keys
- [ ] Question types and categories assigned
- [ ] Passage types assigned
- [ ] Database insertion successful
- [ ] Lesson IDs assigned to all questions
- [ ] No duplicate questions
- [ ] No formatting errors

## Estimated Effort
- English: 3-4 hours (complex with underlined portions)
- Math: 2-3 hours (straightforward)
- Reading: 2-3 hours (passages + questions)
- Science: 2-3 hours (passages + questions)
- **Total: 9-13 hours of manual extraction work**

## Notes
- Maintain 100% accuracy - verify each question against source
- Use exact wording from source file
- Preserve all formatting, punctuation, and special characters
- Test each script before moving to next section
- Commit after each successful section extraction
