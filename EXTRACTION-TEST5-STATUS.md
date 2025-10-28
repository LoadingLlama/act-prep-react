# PRACTICE TEST 5 - EXTRACTION STATUS

**Date:** October 24, 2025
**Current Status:** In Progress - Preparing for manual extraction

---

## 📋 EXTRACTION APPROACH

Due to database schema requirements and to ensure 100% accuracy, we need the following for each question:

### Required Fields Per Question:
- ✅ question_number, test_number, passage_number
- ✅ question_stem (with `<u>underlined</u>` format)
- ✅ underlined_text, context_before, context_after
- ✅ choice_a, choice_b, choice_c, choice_d
- ⏳ **correct_answer** (you will upload)
- ⏳ **question_type** (requires categorization)
- ⏳ **question_category** (POW/KLA/CSE for English)
- ⏳ **lesson_id** (requires assignment)
- 📝 difficulty_level (optional)
- 📝 notes (optional)

---

## 🎯 RECOMMENDED WORKFLOW

### Phase 1: Initial Extraction (Questions + Passages Only)
Extract all 215 questions with:
- Proper formatting
- All choice text
- Placeholder values for: correct_answer ('A'), question_type ('general'), question_category ('CSE')
- NULL for lesson_id (will assign later)

**Benefit:** Gets all questions in database quickly, then we enhance with metadata

### Phase 2: Answer Key Upload
- You provide all 215 answer keys
- Update all correct_answer fields in one operation
- Verify 100% accuracy

### Phase 3: Categorization & Lesson Assignment
- Assign question_type and question_category to each question
- Assign lesson_id based on question type
- Similar to Tests 1-4

### Phase 4: Final Verification
- Run comprehensive accuracy check
- Verify all 215 questions complete
- Generate extraction report

---

## 💡 DECISION NEEDED

**Would you like me to:**

1. **Extract all 215 questions now with placeholders** (faster, then you upload answer keys)
   - I'll extract all questions with proper formatting
   - Use placeholders for answer keys/types
   - You upload answer keys when ready
   - We assign question types/lessons afterward
   - **Estimated time: 2-3 hours**

2. **Wait for answer keys first, then extract** (slower, but more complete from start)
   - You upload answer keys first
   - I extract with correct answers from the start
   - Still need to assign types/lessons later
   - **Estimated time: Answer keys + 2-3 hours**

3. **Do complete extraction with all metadata** (slowest, most thorough)
   - Extract each question with full categorization
   - Requires analyzing each question individually
   - **Estimated time: 6-8 hours**

---

## ✅ CURRENT PROGRESS

- ✅ Test 5 source files analyzed
- ✅ Passage 1 text extracted and ready
- ✅ Questions 1-15 formatted and ready
- ⏳ Database insertion pending (needs placeholder strategy)

---

## 📊 EXTRACTION SCOPE

**Total work required:**
- 75 English questions + 5 passages
- 60 Math questions
- 40 Reading questions + 4 passages
- 40 Science questions + ~7 passages
- **TOTAL: 215 questions + ~16 passages**

---

**Waiting for direction on which approach to take...**
