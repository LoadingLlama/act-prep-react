# PRACTICE TEST 5 - EXTRACTION PLAN
**Date:** October 24, 2025
**Goal:** Extract Practice Test 5 with 100% accuracy using manual review approach

---

## 📋 EXTRACTION STRATEGY

Based on our successful extraction of Tests 1-4, we will use the **MANUAL EXTRACTION** approach with the following workflow:

### Phase 1: Setup & Answer Keys ✅
1. ✅ Read and analyze Test 5 source files
2. ⏳ Extract answer keys (IN PROGRESS - manual entry required)

### Phase 2: English Section (75 questions + 5 passages)
1. Extract passage titles and text
2. Extract questions manually (Q1-Q75)
3. Assign lesson_id to each question
4. Verify format: `context_before + <u>underlined_text</u> + context_after`

### Phase 3: Math Section (60 questions)
1. Extract questions manually (Q1-Q60)
2. Assign lesson_id to each question
3. Ensure all 5 choices (A-E) present

### Phase 4: Reading Section (40 questions + 4 passages)
1. Extract 4 passages with titles, types, and text
2. Extract questions manually (Q1-Q40)
3. Link questions to passages
4. Assign lesson_id to each question

### Phase 5: Science Section (40 questions + ~7 passages)
1. Extract passages with titles, types, and descriptions
2. Note which passages have figures
3. Extract questions manually (Q1-Q40)
4. Link questions to passages
5. Assign lesson_id to each question

### Phase 6: Verification
1. Run comprehensive accuracy check
2. Verify all 215 questions extracted
3. Verify all answer keys correct
4. Verify all passage linkages
5. Verify all lesson_id assignments
6. Create final extraction report

---

## 📊 SOURCE FILES

**TXT File:** `/Users/cadenchiang/Desktop/actprep copy/actclass.org/practice acts/Practice ACT 5.txt`
- Total lines: 7,093
- Contains questions and passages (answer keys appear corrupted)

**PDF File:** `/Users/cadenchiang/Desktop/actprep copy/actclass.org/practice acts/ocr_Practice ACT 5.pdf`
- Use for visual verification
- Use for answer key verification
- Use for figure identification

---

## 🎯 ANSWER KEYS (MANUAL ENTRY REQUIRED)

The answer keys from the TXT file appear to be OCR-corrupted. We need to manually verify and enter the answer keys from the PDF.

**Format:** We'll create a JSON file with the following structure:

```json
{
  "english": {
    "1": "C", "2": "J", "3": "B", ...
  },
  "math": {
    "1": "E", "2": "J", "3": "D", ...
  },
  "reading": {
    "1": "A", "2": "G", "3": "C", ...
  },
  "science": {
    "1": "C", "2": "H", "3": "B", ...
  }
}
```

**Note:** All answers should be normalized to A/B/C/D (or A-E for math) before insertion.

---

## 🔧 EXTRACTION SCRIPTS TO CREATE

1. **`extract-test5-english.mjs`**
   - Manual extraction template for English section
   - Handles passage extraction
   - Handles question extraction with proper formatting
   - Assigns lesson_id based on question type

2. **`extract-test5-math.mjs`**
   - Manual extraction template for Math section
   - Handles question extraction
   - Assigns lesson_id based on question type

3. **`extract-test5-reading.mjs`**
   - Manual extraction template for Reading section
   - Handles passage extraction with types
   - Handles question extraction
   - Links questions to passages
   - Assigns lesson_id

4. **`extract-test5-science.mjs`**
   - Manual extraction template for Science section
   - Handles passage extraction with figure tracking
   - Handles question extraction
   - Links questions to passages
   - Assigns lesson_id

5. **`verify-test5-complete.mjs`**
   - Comprehensive verification script
   - Checks all 215 questions
   - Verifies answer keys
   - Verifies passage linkages
   - Verifies lesson_id assignments
   - Generates accuracy report

---

## ✅ SUCCESS CRITERIA

- [  ] All 75 English questions extracted with proper format
- [  ] All 5 English passages extracted
- [  ] All 60 Math questions extracted
- [  ] All 40 Reading questions extracted
- [  ] All 4 Reading passages extracted with correct types
- [  ] All 40 Science questions extracted
- [  ] All ~7 Science passages extracted with figure tracking
- [  ] All 215 questions have correct answer keys
- [  ] All English questions have lesson_id assigned
- [  ] All Math questions have lesson_id assigned
- [  ] All Reading questions have lesson_id assigned
- [  ] All Science questions have lesson_id assigned
- [  ] 100% accuracy verification passed
- [  ] Final extraction report created

---

## 📝 NEXT IMMEDIATE STEPS

1. **Manual Answer Key Entry:** Create answer key JSON file by reading from PDF
2. **Start English Extraction:** Begin with Passage 1, Questions 1-15
3. **Verify Format:** Ensure matches Tests 1-4 format standards

---

**Status:** Ready to begin manual extraction
**Estimated Time:** ~4-6 hours for complete extraction with 100% accuracy
**Approach:** Same proven manual review process used for Tests 1-4
