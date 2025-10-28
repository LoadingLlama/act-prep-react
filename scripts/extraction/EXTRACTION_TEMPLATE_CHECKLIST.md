# ACT Question Extraction Template & Checklist

## ⚠️ CRITICAL: All columns must be filled accurately for each section

This checklist ensures complete and accurate data extraction for all ACT sections.

---

## MATH SECTION REQUIRED FIELDS

### Core Question Data
- [ ] `test_number` - Test number (e.g., 4)
- [ ] `question_number` - Question number (1-60)
- [ ] `question_stem` - Full question text
- [ ] `choice_a` - Choice A text
- [ ] `choice_b` - Choice B text
- [ ] `choice_c` - Choice C text
- [ ] `choice_d` - Choice D text
- [ ] `choice_e` - Choice E text (Math only has 5 choices)
- [ ] `correct_answer` - Correct answer letter (A/B/C/D/E)
  - **NOTE: Convert F/G/H/J/K to A/B/C/D/E**

### Metadata (REQUIRED - Must match system values)
- [ ] `question_type` - Must use EXACT values from system:
  - `algebra`
  - `geometry`
  - `trigonometry`
  - `statistics-probability`
  - `word-problem`
  - `math-problem-solving`
  - `sequences`

- [ ] `question_category` - ACT content area categories:
  - `PHM-A` (Preparing for Higher Math - Algebra)
  - `PHM-G` (PHM - Geometry)
  - `PHM-F` (PHM - Functions)
  - `PHM-N` (PHM - Number & Quantity)
  - `PHM-S` (PHM - Statistics & Probability)
  - `IES` (Integrating Essential Skills)
  - `IM` (Integrating Essential Skills - Modeling)

- [ ] `difficulty_level` - Must be one of:
  - `easy`
  - `medium`
  - `hard`

- [ ] `has_figure` - Boolean (true/false)
  - Set to `true` if question references a diagram, graph, table, or figure
  - Set to `false` if question is text-only

- [ ] `lesson_id` - UUID linking to lesson
  - Default for Practice Tests: `406a197f-f7d0-4c0d-9582-594dbb1bd8a0`

- [ ] `notes` - Descriptive note
  - Format: `"Practice Test [N] Math Question [Q]"`
  - Example: `"Practice Test 4 Math Question 25"`

### Optional Fields
- [ ] `figure_url` - URL to figure image (if applicable)
- [ ] `figure_data` - JSON data for figures (if applicable)

---

## ENGLISH SECTION REQUIRED FIELDS

### Core Question Data
- [ ] `test_number`
- [ ] `question_number` (1-75)
- [ ] `question_stem` - **Must include passage context, not just answer choices**
- [ ] `choice_a`
- [ ] `choice_b`
- [ ] `choice_c`
- [ ] `choice_d` (English has 4 choices)
- [ ] `correct_answer` - (A/B/C/D or F/G/H/J - convert to A/B/C/D)

### Metadata
- [ ] `question_type` - English question types:
  - `grammar-usage`
  - `punctuation`
  - `sentence-structure`
  - `strategy`
  - `organization`
  - `style`
  - `conventions`

- [ ] `question_category` - English categories:
  - `POU` (Production of Writing)
  - `KLA` (Knowledge of Language)
  - `CSE` (Conventions of Standard English)

- [ ] `passage_number` - Which passage (1-5)
- [ ] `lesson_id`
- [ ] `difficulty_level` (easy/medium/hard)
- [ ] `has_figure` (usually false for English)
- [ ] `notes` - Format: `"Practice Test [N] English Question [Q]"`

### Passage Data Required
- [ ] Extract all 5 passages to `act_english_passages` table:
  - `test_number`
  - `passage_number` (1-5)
  - `title`
  - `passage_text` - Full passage text
  - `notes`

---

## READING SECTION REQUIRED FIELDS

### Core Question Data
- [ ] `test_number`
- [ ] `question_number` (1-40)
- [ ] `question_stem`
- [ ] `choice_a`
- [ ] `choice_b`
- [ ] `choice_c`
- [ ] `choice_d`
- [ ] `correct_answer` (A/B/C/D or F/G/H/J - convert to A/B/C/D)

### Metadata
- [ ] `question_type` - Reading question types:
  - `main-idea`
  - `detail`
  - `inference`
  - `vocabulary`
  - `function`
  - `comparison`

- [ ] `question_category` - Reading categories:
  - `KOI` (Key Ideas and Details)
  - `CSI` (Craft and Structure)
  - `INT` (Integration of Knowledge and Ideas)

- [ ] `passage_id` - UUID linking to passage (NOT passage_number)
- [ ] `lesson_id`
- [ ] `difficulty_level`
- [ ] `has_figure` (usually false)
- [ ] `notes` - Format: `"Practice Test [N] Reading Question [Q]"`

### Passage Data Required
- [ ] Extract all 4 passages to `act_reading_passages` table:
  - `test_number`
  - `passage_number` (1-4)
  - `title`
  - `passage_text`
  - `passage_type` - One of:
    - `Literary Narrative`
    - `Social Science`
    - `Humanities`
    - `Natural Science`
  - `notes`

---

## SCIENCE SECTION REQUIRED FIELDS

### Core Question Data
- [ ] `test_number`
- [ ] `question_number` (1-40)
- [ ] `question_stem`
- [ ] `choice_a`
- [ ] `choice_b`
- [ ] `choice_c`
- [ ] `choice_d`
- [ ] `correct_answer` (A/B/C/D or F/G/H/J - convert to A/B/C/D)

### Metadata
- [ ] `question_type` - Science question types:
  - `data-representation`
  - `research-summaries`
  - `conflicting-viewpoints`

- [ ] `question_category` - Science categories:
  - `INT` (Interpretation of Data)
  - `SIN` (Scientific Investigation)
  - `EME` (Evaluation of Models, Inferences, and Experimental Results)

- [ ] `passage_id` - UUID linking to passage
- [ ] `lesson_id`
- [ ] `difficulty_level`
- [ ] `has_figure` (often true for Science)
- [ ] `notes` - Format: `"Practice Test [N] Science Question [Q]"`

### Passage Data Required
- [ ] Extract all 6-7 passages to `act_science_passages` table:
  - `test_number`
  - `passage_number` (1-7)
  - `title`
  - `passage_text`
  - `passage_type` - One of:
    - `Data Representation`
    - `Research Summaries`
    - `Conflicting Viewpoints`
  - `has_figure` - Boolean
  - `figure_url` - If applicable
  - `notes`

---

## VALIDATION CHECKLIST

### Before Upload
- [ ] All question numbers sequential and complete (no gaps)
- [ ] All answer choices filled (no empty strings)
- [ ] Correct answers verified against answer key
- [ ] Answer letter format converted if needed (F→A, G→B, H→C, J→D, K→E)
- [ ] question_type uses EXACT system values (check existing data)
- [ ] question_category uses EXACT system values
- [ ] has_figure set correctly for questions with diagrams
- [ ] lesson_id assigned
- [ ] difficulty_level assigned
- [ ] notes added

### After Upload
- [ ] Run verification script
- [ ] Check sample questions for completeness
- [ ] Verify question_type distribution matches expected patterns
- [ ] Verify all metadata fields populated
- [ ] Check passages linked correctly

---

## COMMON MISTAKES TO AVOID

❌ **DON'T:**
- Use custom question_type values (e.g., "counting_probability" instead of "statistics-probability")
- Leave has_figure as null
- Skip difficulty_level assignment
- Use generic question_category values
- Forget to convert F/G/H/J/K to A/B/C/D/E for Math
- Put only answer choices in question_stem (English needs passage context)
- Leave notes empty

✅ **DO:**
- Check existing questions in database for correct field values
- Verify question_type against system before upload
- Set has_figure for ALL questions with diagrams/graphs/tables
- Assign proper ACT content categories
- Add descriptive notes
- Test with small batch before full upload

---

## REFERENCE COMMANDS

Check existing question_type values:
```bash
node -e "
import { createClient } from '@supabase/supabase-js';
import * as dotenv from 'dotenv';
dotenv.config();
const supabase = createClient(process.env.REACT_APP_SUPABASE_URL, process.env.SUPABASE_SERVICE_ROLE_KEY);
const { data } = await supabase.from('act_math_questions').select('question_type').eq('test_number', 2);
console.log([...new Set(data?.map(t => t.question_type))]);
"
```

Verify uploaded data:
```bash
node scripts/verification/practice-act-4-final-report.mjs
```

---

## TEMPLATE SCRIPT STRUCTURE

```javascript
const mathQuestions = [
  {
    question_number: 1,
    question_stem: "Full question text here",
    choice_a: "Choice A text",
    choice_b: "Choice B text",
    choice_c: "Choice C text",
    choice_d: "Choice D text",
    choice_e: "Choice E text", // Math only
    // Metadata added during upload:
    test_number: TEST_NUMBER,
    correct_answer: ANSWERS[1], // From answer key
    question_type: 'algebra', // Must match system values
    question_category: 'PHM-A',
    difficulty_level: 'easy',
    has_figure: false,
    lesson_id: LESSON_ID,
    notes: `Practice Test ${TEST_NUMBER} Math Question 1`
  }
];
```

---

## ANSWER KEY FORMAT

Always convert ACT format to database format:

**Math:** F/G/H/J/K → A/B/C/D/E
**English (odd):** A/B/C/D → A/B/C/D
**English (even):** F/G/H/J → A/B/C/D
**Reading (odd):** A/B/C/D → A/B/C/D
**Reading (even):** F/G/H/J → A/B/C/D
**Science (odd):** A/B/C/D → A/B/C/D
**Science (even):** F/G/H/J → A/B/C/D

---

## COMPLETION CHECKLIST PER SECTION

### Math (60 questions)
- [ ] All 60 questions extracted
- [ ] All metadata fields filled
- [ ] question_type verified against system
- [ ] has_figure set for questions with diagrams
- [ ] Verification script run
- [ ] Sample questions checked

### English (75 questions + 5 passages)
- [ ] All 75 questions extracted with passage context
- [ ] All 5 passages extracted
- [ ] Questions linked to passages
- [ ] All metadata fields filled
- [ ] Verification script run

### Reading (40 questions + 4 passages)
- [ ] All 40 questions extracted
- [ ] All 4 passages extracted
- [ ] Questions linked to passages (by passage_id)
- [ ] Passage types assigned
- [ ] All metadata fields filled
- [ ] Verification script run

### Science (40 questions + 6-7 passages)
- [ ] All 40 questions extracted
- [ ] All 6-7 passages extracted
- [ ] Questions linked to passages
- [ ] has_figure set correctly
- [ ] All metadata fields filled
- [ ] Verification script run

---

**Last Updated:** 2025-10-24
**Status:** Template created after Practice ACT 4 Math complete extraction
