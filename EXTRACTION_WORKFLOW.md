# ACT Question Bank - Manual Extraction Workflow

**Created**: 2025-10-22
**Purpose**: Systematic manual extraction of 1,680 questions from 7 ACT practice tests
**Estimated Time**: 3-4 weeks (20-30 hours per test)

---

## 📋 WORKFLOW OVERVIEW

### Phase 1: Setup (1 day)
1. Set up Supabase database
2. Create extraction spreadsheet template
3. Prepare source files

### Phase 2: Extract Test 1 (Pilot) (4-5 days)
- Extract English (75 Q) - 1.5 days
- Extract Math (60 Q) - 1.5 days
- Extract Reading (40 Q) - 1 day
- Extract Science (40 Q) - 1 day
- Validate & QA - 0.5 day

### Phase 3: Refine & Scale (Remaining tests 2-7)
- Apply lessons learned from Test 1
- Streamline process
- Extract tests 2-7 (3-4 days each)

---

## 🎯 EXTRACTION TEMPLATE (Per Question)

### Core Fields
```
test_number: 1
section: "E" | "M" | "R" | "S"
question_number: 1-75 (English), 1-60 (Math), 1-40 (Reading/Science)
passage_id: (if applicable)
question_stem: "Full question text"
choice_a: "First answer choice"
choice_b: "Second answer choice"
choice_c: "Third answer choice"
choice_d: "Fourth answer choice"
choice_e: "Fifth answer choice (Math only)" | null
correct_answer: "A" | "B" | "C" | "D" | "E"
has_figure: true | false
figure_reference: "Description of figure/diagram" | null
```

### Additional Fields (from master plan)
```
difficulty_level: "easy" | "medium" | "hard" (estimate based on position)
question_type: (classify later in Phase 3)
primary_lesson_key: (tag later)
notes: "Any special formatting, issues, or context"
```

---

## 📝 SECTION-SPECIFIC GUIDELINES

### ENGLISH SECTION (75 Questions, 5 Passages)

**Structure**:
- Questions 1-15: Passage I
- Questions 16-30: Passage II
- Questions 31-45: Passage III
- Questions 46-60: Passage IV
- Questions 61-75: Passage V

**Answer Choices**: A, B, C, D (or F, G, H, J)

**Special Handling**:
1. **Underlined portions**: Include in question_stem
2. **"NO CHANGE" option**: Always include as first choice
3. **Questions about passage as whole**: Note in question_stem
4. **"DELETE the underlined portion"**: Include exact wording

**Example**:
```json
{
  "test_number": 1,
  "section": "E",
  "question_number": 1,
  "passage_id": "test-1-english-passage-1",
  "question_stem": "There are thousands of new animal species identified each year, the vast majority are small or geographically isolated.",
  "choice_a": "NO CHANGE",
  "choice_b": "Scientists say thousands of new animal species are",
  "choice_c": "Of the thousands of new animal species",
  "choice_d": "Thousands of new animal species are",
  "correct_answer": "C",
  "has_figure": false,
  "notes": "Question 1, Passage I about manta rays"
}
```

---

### MATH SECTION (60 Questions)

**Answer Choices**: A-E (1st question of pair) or F-K (2nd question of pair)

**Special Handling**:
1. **Figures**: Mark has_figure=true, describe in figure_reference
2. **Mathematical notation**: Preserve as text (use LaTeX if needed)
3. **Multiple parts**: Keep as single question if same stem
4. **Word problems**: Include full context

**Example**:
```json
{
  "test_number": 1,
  "section": "M",
  "question_number": 1,
  "passage_id": null,
  "question_stem": "A function, f, is defined by f(x,y) = 3x² - 4y. What is the value of f(3,2)?",
  "choice_a": "0",
  "choice_b": "10",
  "choice_c": "19",
  "choice_d": "24",
  "choice_e": "28",
  "correct_answer": "B",
  "has_figure": false,
  "notes": "Function evaluation problem"
}
```

**Example with Figure**:
```json
{
  "test_number": 1,
  "section": "M",
  "question_number": 2,
  "question_stem": "In the figure below, ∠BAC measures 35°, ∠ABC measures 95°, and points B, C, and D are collinear. What is the measure of ∠ACD?",
  "choice_f": "95°",
  "choice_g": "125°",
  "choice_h": "130°",
  "choice_j": "140°",
  "choice_k": "145°",
  "correct_answer": "K",
  "has_figure": true,
  "figure_reference": "Triangle ABC with angle measurements, point D extends line BC",
  "notes": "Geometry - exterior angles"
}
```

---

### READING SECTION (40 Questions, 4 Passages)

**Passage Types**:
1. Literary Narrative (Questions 1-10)
2. Social Science (Questions 11-20)
3. Humanities (Questions 21-30)
4. Natural Science (Questions 31-40)

**Answer Choices**: A, B, C, D (or F, G, H, J)

**Special Handling**:
1. **Line references**: Include in question_stem (e.g., "lines 15-20")
2. **Passage A/B**: Note which passage for dual passages
3. **Direct quotes**: Keep exact quotation marks
4. **"According to the passage"**: Include full context

**Example**:
```json
{
  "test_number": 1,
  "section": "R",
  "question_number": 1,
  "passage_id": "test-1-reading-passage-1-literary",
  "question_stem": "The third paragraph (lines 33-46) marks a shift from:",
  "choice_a": "a description of the narrator's past to a reflection on the present.",
  "choice_b": "general observations to specific anecdotes.",
  "choice_c": "external details to internal thoughts.",
  "choice_d": "objective reporting to personal opinion.",
  "correct_answer": "B",
  "has_figure": false,
  "notes": "Passage structure question"
}
```

---

### SCIENCE SECTION (40 Questions, 6-7 Passages)

**Passage Types**:
- Data Representation (graphs, tables, charts)
- Research Summaries (experiments)
- Conflicting Viewpoints (2+ perspectives)

**Answer Choices**: A, B, C, D (or F, G, H, J)

**Special Handling**:
1. **Tables/Figures**: ALWAYS has_figure=true, detailed description
2. **Variable references**: Include units (e.g., "temperature in °C")
3. **Experiment numbers**: Note which experiment (Experiment 1, 2, etc.)
4. **Student/Scientist viewpoints**: Specify which perspective

**Example**:
```json
{
  "test_number": 1,
  "section": "S",
  "question_number": 1,
  "passage_id": "test-1-science-passage-1",
  "question_stem": "Each fly was placed in a separate enclosure containing a food source. Based on Table 1, which of the following statements about food consumption is correct?",
  "choice_a": "Flies in Group A consumed more food than Group B.",
  "choice_b": "Flies in Group B consumed more food than Group A.",
  "choice_c": "Both groups consumed equal amounts.",
  "choice_d": "The data does not support any conclusion.",
  "correct_answer": "A",
  "has_figure": true,
  "figure_reference": "Table 1: Food consumption data for Groups A and B over 24 hours",
  "notes": "Data interpretation from table"
}
```

---

## 📊 EXTRACTION SPREADSHEET FORMAT

Create a Google Sheet or Excel file with these columns:

| Column | Description | Example |
|--------|-------------|---------|
| test_number | Test 1-7 | 1 |
| section | E/M/R/S | E |
| question_number | 1-75 | 1 |
| passage_id | Unique ID | test-1-english-passage-1 |
| question_stem | Full question | "There are thousands..." |
| choice_a | First choice | "NO CHANGE" |
| choice_b | Second choice | "Scientists say..." |
| choice_c | Third choice | "Of the thousands..." |
| choice_d | Fourth choice | "Thousands of..." |
| choice_e | Fifth (Math only) | null |
| correct_answer | A-E | C |
| has_figure | true/false | false |
| figure_reference | Description | null |
| difficulty_level | easy/medium/hard | medium |
| notes | Any notes | "Question 1, Passage I" |

---

## ⚙️ EXTRACTION PROCESS (Per Question)

### Step 1: Read Question in Source File
- Locate question number
- Read full question stem
- Identify all answer choices

### Step 2: Extract Answer from Key
- Find correct answer in answer key section
- Verify answer letter matches

### Step 3: Fill Template
- Copy question stem (clean up line breaks)
- Copy each answer choice
- Enter correct answer
- Note if figure is referenced
- Add any relevant notes

### Step 4: Quick Validation
- ✅ Question number correct?
- ✅ All answer choices present?
- ✅ Correct answer from key?
- ✅ Figure noted if present?

### Step 5: Save to Spreadsheet
- Add row to extraction sheet
- Move to next question

---

## 🔍 QUALITY CHECKS (Per Section)

### After Each Section:
1. **Count**: Verify question count matches expected
   - English: 75 questions
   - Math: 60 questions
   - Reading: 40 questions
   - Science: 40 questions

2. **Answer Distribution**: Check for patterns
   - Each answer (A-E) should appear roughly equally
   - Flag if one answer appears >30% of time

3. **Completeness**: Verify no missing data
   - All questions have stems
   - All have 4-5 choices
   - All have correct answers
   - All have section/test numbers

4. **Figures**: Count and verify
   - Math: ~20 figures
   - Science: ~40 figures
   - Reading: 0 figures
   - English: 0 figures

---

## 📈 PROGRESS TRACKING

### Daily Log Template:
```markdown
## Date: 2025-10-22

**Test**: 1
**Section**: English
**Questions Extracted**: 1-25
**Time Spent**: 2 hours
**Issues Encountered**:
- Question 12: Unclear formatting on choice C
- Question 18: Figure reference unclear

**Questions Remaining**: 50
**Estimated Completion**: Tomorrow
```

### Weekly Summary:
- Total questions extracted
- Tests completed
- Estimated time to completion
- Issues to address

---

## 🚨 COMMON ISSUES & SOLUTIONS

### Issue 1: Question Split Across Multiple Lines
**Solution**: Carefully reconstruct, preserving meaning

### Issue 2: Answer Choices Unclear
**Solution**: Read context from source file, use best judgment, add note

### Issue 3: Figure Not Visible in Text File
**Solution**: Mark has_figure=true, describe from context clues, photograph from PDF if available

### Issue 4: Correct Answer Ambiguous
**Solution**: Check answer key multiple times, flag for review

### Issue 5: Passage Text Too Long
**Solution**: Store passage separately, reference by passage_id

---

## 📁 FILE ORGANIZATION

```
/act-prep-react
├── extraction/
│   ├── test-1-extraction.csv          # Extracted questions
│   ├── test-1-passages.md             # Full passage text
│   ├── test-1-figures/                # Figure screenshots
│   │   ├── math-q5-triangle.png
│   │   ├── science-q12-table.png
│   ├── test-1-notes.md                # Issues, observations
│   └── test-1-progress.md             # Daily tracking
├── source-files/
│   └── Practice ACT 1.txt             # Original file
└── database/
    └── import-scripts/                # Scripts to load into Supabase
```

---

## ✅ TEST 1 EXTRACTION CHECKLIST

### Pre-Extraction:
- [ ] Supabase database set up
- [ ] Extraction spreadsheet created
- [ ] Source file accessible
- [ ] Answer key section identified

### English Section (75 Q):
- [ ] Passage I: Questions 1-15
- [ ] Passage II: Questions 16-30
- [ ] Passage III: Questions 31-45
- [ ] Passage IV: Questions 46-60
- [ ] Passage V: Questions 61-75
- [ ] QA: 75 questions, answer distribution checked

### Math Section (60 Q):
- [ ] Questions 1-20
- [ ] Questions 21-40
- [ ] Questions 41-60
- [ ] Figures extracted/documented
- [ ] QA: 60 questions, figures noted

### Reading Section (40 Q):
- [ ] Passage I Literary: Questions 1-10
- [ ] Passage II Social Science: Questions 11-20
- [ ] Passage III Humanities: Questions 21-30
- [ ] Passage IV Natural Science: Questions 31-40
- [ ] QA: 40 questions

### Science Section (40 Q):
- [ ] Passage I: Questions 1-7
- [ ] Passage II: Questions 8-14
- [ ] Passage III: Questions 15-21
- [ ] Passage IV: Questions 22-28
- [ ] Passage V: Questions 29-34
- [ ] Passage VI: Questions 35-40
- [ ] Figures extracted/documented
- [ ] QA: 40 questions, all figures noted

### Post-Extraction:
- [ ] Total: 215 questions verified
- [ ] All answer keys match
- [ ] Passages stored separately
- [ ] Figures documented
- [ ] Ready for database import

---

## 🎯 SUCCESS METRICS

**Test 1 Pilot Goals**:
- ✅ <5% error rate in answer keys
- ✅ 100% question coverage
- ✅ All figures documented
- ✅ Extraction time: <30 hours
- ✅ Process documented for tests 2-7

---

## 📞 NEXT STEPS

After completing this workflow document:

1. **Set up Supabase database** (following Phase 1 plan)
2. **Create extraction spreadsheet template**
3. **Start Test 1 English section** (Questions 1-15)
4. **Validate first 15 questions**
5. **Refine process based on learnings**
6. **Continue with remaining sections**

**Estimated Timeline**:
- Setup: 0.5 day
- Test 1: 4-5 days
- Tests 2-7: 3-4 days each (21-28 days)
- **Total**: ~4-5 weeks

---

**Status**: Ready to begin extraction
**Next Action**: Set up Supabase database or create extraction spreadsheet
