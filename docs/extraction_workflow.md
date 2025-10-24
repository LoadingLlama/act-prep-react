# ACT Test Data Extraction Workflow

This document outlines the complete workflow for extracting ACT test data from PDFs and populating the database with properly formatted content.

## Critical Requirements - MUST FOLLOW

### English Questions - ULTRA CRITICAL REQUIREMENTS

#### 1. Underlined Text Breakdown (MANDATORY)
For EVERY English question, you MUST extract and populate ALL of these fields:

- `question_stem`: Full sentence with `<u>underlined portion</u>` embedded
- `underlined_text`: ONLY the text that appears between `<u>` and `</u>`
- `context_before`: Everything BEFORE the underlined portion
- `context_after`: Everything AFTER the underlined portion

**Example Format:**
```
question_stem: "Sugarhill Records signed numerous rap artists<u>;</u> Grandmaster Flash and the Furious Five were among them."
underlined_text: ";"
context_before: "Sugarhill Records signed numerous rap artists"
context_after: " Grandmaster Flash and the Furious Five were among them."
```

#### 2. Lesson Linking (MANDATORY)
Every English question MUST have:
- `lesson_id`: Proper UUID linking to the corresponding lesson
- `difficulty_level`: "easy", "medium", or "hard"
- `question_type`: Specific type (e.g., "comma-splice", "verb-agreement", "word-choice")
- `question_category`: "POW", "KLA", or "CSE"

#### 3. Question Content Extraction
- Extract questions from the actual PDF text, NOT placeholder content
- Questions must include the full sentence context with the underlined portion
- Questions that ask "Which choice..." or "Given that..." are meta-questions and may not have underlined text

### Reading Questions

#### Content Requirements
- `question_stem`: Complete question text
- `passage_id`: Link to the corresponding reading passage
- All 4 multiple choice options (A, B, C, D or F, G, H, J)
- Questions grouped by passage (typically 10 questions per passage)

### Science Questions

#### Content Requirements
- `question_stem`: Complete question text with any figure/table references
- All 4 multiple choice options (A, B, C, D or F, G, H, J)
- Questions grouped by passage (typically 6-7 questions per passage)
- Must reference figures, tables, experiments, or studies mentioned in passage

### Math Questions

#### Content Requirements
- `question_stem`: Complete question text
- All 5 multiple choice options (A, B, C, D, E or F, G, H, J, K)
- May include geometric figures or charts
- Questions 1-60 for each test

## Database Schema Requirements

### English Questions Table
```sql
act_english_questions:
- id (UUID, primary key)
- test_number (integer)
- question_number (integer)
- passage_number (integer)
- question_stem (text) -- Full sentence with <u>underlined</u>
- underlined_text (text) -- ONLY the underlined portion
- context_before (text) -- Text before underlined portion
- context_after (text) -- Text after underlined portion
- choice_a, choice_b, choice_c, choice_d (text)
- correct_answer (text)
- question_type (text) -- e.g., "comma-splice", "verb-agreement"
- question_category (text) -- "POW", "KLA", or "CSE"
- lesson_id (UUID) -- MUST link to proper lesson
- difficulty_level (text) -- "easy", "medium", "hard"
```

### Other Question Tables
Similar structure but without underlined text fields.

## Extraction Workflow Steps

### Phase 1: Emergency Assessment
1. Check current database state
2. Identify missing or placeholder content
3. Use Test 1 as reference format
4. Document what needs to be fixed

### Phase 2: Passage Extraction
1. Extract all passage content from PDF
2. Ensure substantial content (1500+ characters for major passages)
3. Remove any incorrect extra passages (ACT has specific counts)
4. Link passages to questions properly

### Phase 3: Question Extraction by Subject

#### English Questions (CRITICAL - Multiple Steps)
1. **Extract from PDF with proper formatting**
   - Find each question in the PDF text
   - Identify the underlined portion in context
   - Format as: `full sentence <u>underlined part</u> rest of sentence`

2. **Parse underlined breakdown**
   - Extract `underlined_text` from between `<u>` and `</u>`
   - Extract `context_before` (everything before `<u>`)
   - Extract `context_after` (everything after `</u>`)

3. **Assign lesson metadata**
   - Map `question_type` to appropriate `lesson_id`
   - Assign appropriate `difficulty_level`
   - Verify `question_category` is correct

4. **Validation**
   - Ensure NO questions have `lesson_id=null`
   - Ensure NO questions have `difficulty_level=null`
   - Ensure ALL questions have proper underlined breakdown

#### Other Subjects
1. Extract questions with complete content from PDF
2. Ensure proper multiple choice formatting
3. Link to passages where applicable
4. Verify answer choices are complete

### Phase 4: Quality Verification
1. Compare Test 2 format to Test 1
2. Ensure all critical fields are populated
3. Verify no placeholder content remains
4. Check that all questions have real content from PDF

## Common Mistakes to Avoid

### English Questions
- ❌ Using placeholder content instead of PDF extraction
- ❌ Missing `<u>underlined</u>` formatting in question_stem
- ❌ Leaving `underlined_text`, `context_before`, `context_after` empty
- ❌ Not linking `lesson_id` and `difficulty_level`
- ❌ Incorrect question_category assignment

### All Questions
- ❌ Not extracting actual content from PDF
- ❌ Missing answer choices
- ❌ Incorrect question numbering
- ❌ Not linking to passages properly

## Validation Checklist

Before considering extraction complete, verify:

### English Questions
- [ ] All questions have `question_stem` with `<u>underlined</u>` formatting (where applicable)
- [ ] All questions have populated `underlined_text` field
- [ ] All questions have populated `context_before` field
- [ ] All questions have populated `context_after` field
- [ ] All questions have valid `lesson_id` (not null)
- [ ] All questions have valid `difficulty_level` (not null)
- [ ] All questions have proper `question_type` and `question_category`

### All Subjects
- [ ] All questions extracted from actual PDF content (not placeholders)
- [ ] All answer choices are complete and properly formatted
- [ ] Question numbering is sequential and correct
- [ ] Passages are linked to questions properly
- [ ] Content quality matches Test 1 standards

## Tools and Scripts

### Essential Scripts
- `emergency-check-test-status.mjs` - Assess current database state
- `extract-[subject]-questions-[range].mjs` - Extract questions from PDF
- `fix-english-underlined-breakdown.mjs` - Parse underlined text components
- `assign-lesson-metadata.mjs` - Link lessons and difficulty levels

### Database Queries for Validation
```sql
-- Check for missing lesson links
SELECT COUNT(*) FROM act_english_questions
WHERE test_number = 2 AND lesson_id IS NULL;

-- Check for missing underlined breakdown
SELECT COUNT(*) FROM act_english_questions
WHERE test_number = 2 AND underlined_text = '';

-- Compare content quality to Test 1
SELECT AVG(LENGTH(question_stem)) as avg_length
FROM act_english_questions
WHERE test_number IN (1, 2)
GROUP BY test_number;
```

## Success Criteria

Test extraction is complete when:

1. **All questions have real content from PDF** (not placeholders)
2. **English questions have complete underlined breakdown** (4 fields populated)
3. **All questions linked to proper lessons/metadata** (no null values)
4. **Content quality matches Test 1 standards**
5. **All validation checks pass**

## Emergency Recovery

If extraction goes wrong:
1. Use emergency check scripts to assess damage
2. Reference Test 1 format for correct structure
3. Re-extract from PDF with proper formatting
4. Validate each step before proceeding
5. Never deploy incomplete or placeholder content

---

**REMEMBER: Quality over speed. Better to extract correctly once than fix mistakes multiple times.**