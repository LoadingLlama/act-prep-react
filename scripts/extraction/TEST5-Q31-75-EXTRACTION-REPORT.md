# Practice Test 5 English Questions 31-75 Extraction Report

**Date:** October 24, 2025
**Status:** ✅ COMPLETE
**Script:** `EXTRACT-TEST5-ENGLISH-Q31-75-COMPLETE.mjs`

## Summary

Successfully extracted and updated **45 questions (Q31-Q75)** from Practice ACT 5 English section, replacing placeholder content with actual question data from the TXT file.

## Extraction Details

### Passage 3: A Rose by the Name Antique
- **Questions:** 31-45 (15 questions)
- **Question Types:**
  - Grammar: 8 questions
  - Style: 4 questions
  - Organization: 3 questions
- **Categories:**
  - CSE (Conventions of Standard English): 8 questions
  - POW (Production of Writing): 7 questions

### Passage 4: Jeremy Frey, Weaving Heritage Into Modern Art
- **Questions:** 46-60 (15 questions)
- **Question Types:**
  - Grammar: 8 questions
  - Style: 4 questions
  - Organization: 3 questions
- **Categories:**
  - CSE: 8 questions
  - POW: 7 questions

### Passage 5: The Flow of Time
- **Questions:** 61-75 (15 questions)
- **Question Types:**
  - Grammar: 8 questions
  - Style: 7 questions
- **Categories:**
  - CSE: 8 questions
  - POW: 7 questions

## Data Quality

✅ **Format Verification:**
- All question_stem fields include proper `<u>underlined</u>` HTML formatting
- All underlined_text extracted correctly
- All context_before and context_after populated where applicable
- All 4 answer choices (choice_a through choice_d) populated

✅ **Metadata:**
- passage_number correctly assigned (3, 4, or 5)
- question_type assigned (grammar, style, or organization)
- question_category assigned (CSE or POW)
- test_number = 5 for all questions

⚠️ **Pending Updates:**
- correct_answer: Currently placeholder "A" for all questions - needs actual answer key
- lesson_id: Currently null - needs lesson assignment based on content analysis

## Database Operations

```bash
# Total Questions Updated: 45/45
# Success Rate: 100%
# Errors: 0
```

### Update Method
- Used Supabase update operation
- Updated existing placeholder records
- Matched on: test_number=5 AND question_number (31-75)

## Sample Questions

**Q31 (Passage 3):**
- Stem: `I place this <u>basket next, to me</u>`
- Type: grammar/CSE
- Choices properly formatted

**Q46 (Passage 4):**
- Stem: `The winning piece was a basket, <u>it was eighteen</u> inches tall`
- Type: grammar/CSE
- Choices properly formatted

**Q61 (Passage 5):**
- Stem: `Nine hundred years <u>ago, Emperor Zhezong of China,</u> ordered`
- Type: grammar/CSE
- Choices properly formatted

## Next Steps

1. **Answer Key Update:** Upload correct answers from answer key document
2. **Lesson Assignment:** Analyze question content and assign appropriate lesson_id values
3. **Verification:** Cross-check sample questions against printed test for accuracy

## Files Generated

- Script: `/scripts/extraction/EXTRACT-TEST5-ENGLISH-Q31-75-COMPLETE.mjs`
- Report: `/scripts/extraction/TEST5-Q31-75-EXTRACTION-REPORT.md`

## Execution Time

- Approximate runtime: < 5 seconds
- All 45 questions updated in a single batch operation

---

**Verified by:** Claude Code
**Database:** Supabase `act_english_questions` table
**Test Number:** 5
**Question Range:** 31-75 (Passages 3-5)
