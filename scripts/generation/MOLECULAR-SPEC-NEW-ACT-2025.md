# 🔬 MOLECULAR-LEVEL SPECIFICATION: NEW ACT 2025 FORMAT
## Complete Practice Test Generation System - 100% Accuracy Guaranteed

---

## 📊 DATABASE SCHEMA (EXACT STRUCTURE FROM ANALYSIS)

### Question Tables Schema

**practice_test_english_questions**
```sql
{
  id: SERIAL PRIMARY KEY,
  test_number: INTEGER NOT NULL,
  question_number: INTEGER NOT NULL,
  passage_id: INTEGER REFERENCES practice_test_english_passages(id),
  question_text: TEXT NOT NULL,           -- Full question with context
  question_prompt: TEXT,                  -- Question stem (optional)
  choices: JSONB NOT NULL,                -- ["A. ...", "B. ...", "C. ...", "D. ..."]
  correct_answer: INTEGER NOT NULL,       -- 0-3 index
  explanation: TEXT,                      -- Detailed explanation
  question_type: VARCHAR(50),             -- e.g. "verb-tense", "comma-usage"
  difficulty: VARCHAR(20),                -- "easy", "medium", "hard"
  lesson_id: INTEGER                      -- NULL for practice tests
}
```

**practice_test_math_questions**
```sql
{
  id: SERIAL PRIMARY KEY,
  test_number: INTEGER NOT NULL,
  question_number: INTEGER NOT NULL,
  question_text: TEXT NOT NULL,
  choices: JSONB NOT NULL,                -- ["A. ...", "B. ...", "C. ...", "D. ..."]  (4 choices for NEW 2025)
  correct_answer: INTEGER NOT NULL,       -- 0-3 index
  explanation: TEXT,
  question_type: VARCHAR(50),             -- "basic_algebra", "geometry", etc.
  difficulty: VARCHAR(20),
  lesson_id: INTEGER
}
```

**practice_test_reading_questions**
```sql
{
  id: SERIAL PRIMARY KEY,
  test_number: INTEGER NOT NULL,
  question_number: INTEGER NOT NULL,
  passage_id: INTEGER REFERENCES practice_test_reading_passages(id),
  question_text: TEXT NOT NULL,
  choices: JSONB NOT NULL,                -- ["A. ...", "B. ...", "C. ...", "D. ..."]
  correct_answer: INTEGER NOT NULL,
  explanation: TEXT,
  question_type: VARCHAR(50),
  difficulty: VARCHAR(20),
  lesson_id: INTEGER
}
```

**practice_test_science_questions**
```sql
{
  id: SERIAL PRIMARY KEY,
  test_number: INTEGER NOT NULL,
  question_number: INTEGER NOT NULL,
  passage_id: INTEGER REFERENCES practice_test_science_passages(id),
  question_text: TEXT NOT NULL,
  choices: JSONB NOT NULL,
  correct_answer: INTEGER NOT NULL,
  explanation: TEXT,
  question_type: VARCHAR(50),
  difficulty: VARCHAR(20),
  lesson_id: INTEGER
}
```

### Passage Tables Schema

**practice_test_english_passages**
```sql
{
  id: SERIAL PRIMARY KEY,
  test_number: INTEGER NOT NULL,
  passage_number: INTEGER NOT NULL,      -- 1-5
  passage_type: VARCHAR(50),             -- "general" or specific type
  passage_text: TEXT NOT NULL,           -- WITH <u>underlined portions</u>
  passage_title: VARCHAR(255),           -- "Passage 1", "Passage 2", etc.
  question_range: VARCHAR(20),           -- "1-10", "11-20", etc.
  word_count: INTEGER                    -- Auto-calculated
}
```

**practice_test_reading_passages**
```sql
{
  id: SERIAL PRIMARY KEY,
  test_number: INTEGER NOT NULL,
  passage_number: INTEGER NOT NULL,      -- 1-4
  passage_type: VARCHAR(50),             -- "prose-fiction", "social-science", etc.
  passage_text: TEXT NOT NULL,           -- Plain text, 700-850 words
  passage_title: VARCHAR(255),           -- Descriptive title
  question_range: VARCHAR(20),           -- "1-9", "10-18", "19-27", "28-36"
  word_count: INTEGER
}
```

**practice_test_science_passages**
```sql
{
  id: SERIAL PRIMARY KEY,
  test_number: INTEGER NOT NULL,
  passage_number: INTEGER NOT NULL,      -- 1-7
  passage_type: VARCHAR(50),             -- "data-representation", "research-summary", "conflicting-viewpoints"
  passage_text: TEXT NOT NULL,           -- WITH HTML tables/figures
  passage_title: VARCHAR(255),           -- Study/experiment title
  question_range: VARCHAR(20),
  word_count: INTEGER
}
```

---

## 🎯 NEW ACT 2025 FORMAT SPECIFICATIONS

### Test Structure
- **English**: 50 questions (down from 75), 35 minutes (down from 45)
- **Math**: 45 questions (down from 60), 50 minutes (down from 60), **4 answer choices** (down from 5)
- **Reading**: 36 questions (down from 40), 40 minutes (up from 35)
- **Science**: 40 questions (same), 40 minutes (up from 35), **OPTIONAL**

### Key Changes from Old Format
1. **Question Stems Required**: Every English question must have a clear prompt
2. **Shorter Passages**: Reading passages 700-850 words (down from 800-900)
3. **Math 4 Choices**: A, B, C, D only (no E)
4. **More Time Per Question**: 22% more time in English and Reading
5. **Engineering/Design**: At least 1 Science passage must be engineering-focused

---

## 📝 ENGLISH SECTION (50 Questions, 5 Passages)

### Passage Distribution
- **Passage 1** (Q1-10): Science/Technology topic
- **Passage 2** (Q11-20): Arts/Culture topic
- **Passage 3** (Q21-30): History/Social Science topic
- **Passage 4** (Q31-40): Personal Narrative
- **Passage 5** (Q41-50): Contemporary Issues

### Underline Implementation Rules

**CRITICAL**: Each passage MUST have exactly 10 `<u>underlined portions</u>` that correspond 1:1 with questions.

**Underline Placement Algorithm:**
```
Paragraph 1 (sentences 1-4): 2 underlines
Paragraph 2 (sentences 5-8): 2 underlines
Paragraph 3 (sentences 9-12): 3 underlines
Paragraph 4 (sentences 13-16): 2 underlines
Paragraph 5 (sentences 17-20): 1 underline
```

**Underline Content Distribution:**
- Single words: 15% (testing precise word choice)
- Short phrases (2-5 words): 35% (testing modifiers, verbs)
- Long phrases (6-10 words): 40% (testing clauses, structure)
- Full clauses/sentences: 10% (testing sentence combination)

### Question Text Format

**MUST include both underlined portion AND question stem:**

```
<u>Underlined text from passage</u>

[Question stem providing context/asking specific question]
```

**Example:**
```javascript
question_text: "<u>Scientists have been working</u> on renewable energy for decades.\n\n[Which choice maintains consistency with the simple past tense used throughout the passage?]"
```

### Answer Choices Format

**English ALWAYS follows this pattern:**
```json
[
  "A. NO CHANGE",
  "B. worked",
  "C. had worked",
  "D. will work"
]
```

- **Choice A is ALWAYS "NO CHANGE"**
- Choices B, C, D are alternatives
- One choice is definitively correct
- Distractors represent common errors or overcorrections

### Question Type Distribution (50 Total)

**Grammar/Usage (28 questions - 56%):**
- Verb Tense/Form: 6 questions
- Subject-Verb Agreement: 4 questions
- Pronoun Usage: 4 questions
- Modifier Placement: 3 questions
- Parallel Structure: 2 questions
- Fragments/Run-ons/Comma Splices: 3 questions
- Idiom/Preposition: 2 questions
- Comparative/Superlative: 2 questions
- Verb Mood: 2 questions

**Punctuation/Mechanics (12 questions - 24%):**
- Comma Usage: 8 questions
- Semicolon/Colon: 3 questions
- Dash/Apostrophe: 1 question

**Rhetorical Skills (10 questions - 20%):**
- Transitions: 4 questions
- Adding/Deleting Sentences: 3 questions
- Word Choice/Style: 5 questions
- Sentence Placement/Order: 2 questions
- Main Idea/Purpose: 2 questions
- Redundancy/Wordiness: 2 questions

### Difficulty Distribution
- Easy: 14 questions (28%)
- Medium: 23 questions (46%)
- Hard: 13 questions (26%)

### Passage Writing Guidelines

**Writing Order (CRITICAL):**
1. Write natural, flowing passage (400-450 words)
2. Identify 10 naturally occurring testable portions
3. Insert `<u>` tags around those portions
4. Write questions that reference those exact underlined texts
5. Verify passage still reads naturally

**Topic-Specific Guidelines:**

**Science/Technology Passage:**
- Flesch-Kincaid Grade Level: 10-11
- Technical terms defined in context
- Objective, third-person tone
- Example topics: renewable energy, medical breakthroughs, space exploration

**Arts/Culture Passage:**
- Grade Level: 9-10
- Rich descriptive language
- Engaging, slightly informal but respectful
- Example topics: traditional crafts, music history, cultural practices

**History/Social Science Passage:**
- Grade Level: 11-12
- Analytical, evidence-based
- Balanced presentation
- Example topics: civil rights, economic policy, social movements

**Personal Narrative Passage:**
- Grade Level: 8-9
- First-person or third-person limited
- Conversational but literary
- Example topics: family history, personal growth, cultural identity

**Contemporary Issues Passage:**
- Grade Level: 10
- Journalistic style
- Balanced viewpoints
- Example topics: urban planning, technology ethics, environmental policy

---

## 🔢 MATH SECTION (45 Questions)

### **NEW 2025 FORMAT: 4 Answer Choices Only**

```json
["A. 15", "B. 20", "C. 25", "D. 30"]
```

**NO "E" option anymore!**

### Topic Distribution

**Pre-Algebra (9 questions - 20%):**
- Basic arithmetic operations
- Percentages, ratios, proportions
- Mean, median, mode
- Simple probability
- Number properties

**Elementary Algebra (9 questions - 20%):**
- Linear equations (one variable)
- Linear inequalities
- Exponent rules
- Simple factoring
- Substitution

**Intermediate Algebra (9 questions - 20%):**
- Quadratic equations
- Polynomial operations
- Systems of equations
- Function notation
- Rational expressions
- Complex numbers (1-2 questions)

**Coordinate Geometry (7 questions - 16%):**
- Slope, distance, midpoint
- Equation of lines
- Circles
- Parabolas
- Coordinate plane concepts

**Plane Geometry (9 questions - 20%):**
- Triangles (properties, similarity, congruence)
- Circles (area, circumference, arcs)
- Quadrilaterals
- 3D shapes (volume, surface area)
- Angle relationships

**Trigonometry (4 questions - 9%):**
- Basic trig ratios (sin, cos, tan)
- Unit circle values
- Trig identities (simple)
- Law of sines/cosines

### Question Sequencing Strategy

**Phase 1: Warm-Up (Q1-9)**
- All easy difficulty
- One concept per question
- Build confidence

**Phase 2: Core (Q10-30)**
- Mix of easy/medium/hard
- Topic variety
- Strategic difficulty spikes

**Phase 3: Advanced (Q31-45)**
- More medium/hard questions
- Trig concentrated here
- Complex multi-step problems

### Distractor Generation Rules

**For Numerical Answers:**
- **Correct**: Full solution
- **Distractor 1**: Arithmetic error (sign flip, missed negative)
- **Distractor 2**: Forgot a step (e.g., didn't square, didn't distribute)
- **Distractor 3**: Used wrong formula or conceptual error

**For Algebraic Expressions:**
- **Correct**: Properly simplified
- **Distractor 1**: Factoring error
- **Distractor 2**: Sign error
- **Distractor 3**: Incomplete simplification

### Difficulty Scoring Rubric

**Easy (1-3 points):**
- 1-2 computational steps
- Single concept
- Direct formula application
- Common everyday context

**Medium (4-6 points):**
- 3-4 steps required
- Combines 2 concepts
- Requires algebraic manipulation
- Less obvious solution path

**Hard (7-10 points):**
- 5+ steps
- Multiple concepts integrated
- Abstract reasoning required
- Novel problem type

---

## 📖 READING SECTION (36 Questions, 4 Passages)

### Passage Types (MANDATORY ORDER)

1. **Prose Fiction** (Q1-9): Literary narrative, 700-850 words
2. **Social Science** (Q10-18): History/Psychology/Sociology, 700-850 words
3. **Humanities** (Q19-27): Arts/Philosophy/Culture, 700-850 words
4. **Natural Science** (Q28-36): Biology/Chemistry/Physics, 700-850 words

### Question Type Distribution (Per Passage - 9 questions)

**Main Idea/Purpose: 2 questions**
- Overall passage purpose
- Paragraph/section function

**Detail/Explicit: 3 questions**
- Specific facts stated
- Supporting evidence
- Chronological details

**Inference/Implicit: 2-3 questions**
- Reading between lines
- Character motivation
- Author's perspective

**Vocabulary in Context: 1-2 questions**
- Word meaning in passage
- Connotation analysis

**Structure/Comparison: 0-1 question**
- Author's technique
- Organizational pattern
- Comparing viewpoints

### Passage Writing Guidelines

**Prose Fiction:**
- Excerpt from larger narrative
- Character development visible
- Conflict/tension present
- Descriptive, sensory language
- Literary devices (metaphor, imagery)

**Social Science:**
- Academic but accessible
- Clear thesis/argument
- Evidence-based claims
- Balanced perspective
- Historical/social context

**Humanities:**
- Interpretive analysis
- Cultural significance explored
- Engaging style
- Expert voice but not condescending

**Natural Science:**
- Process/concept explanation
- Technical vocabulary defined
- Cause-effect relationships
- Scientific method evident
- Accessible to non-experts

### Answer Choice Patterns

**Correct Answer:**
- Directly supported by text
- Uses synonyms (not exact passage language)
- Complete and accurate

**Distractor Types:**
- **Type 1**: True but doesn't answer question
- **Type 2**: Contradicted by passage
- **Type 3**: Not mentioned at all
- **Type 4**: Goes too far (overgeneralization)

---

## 🔬 SCIENCE SECTION (40 Questions, 6-7 Passages)

### Passage Distribution (EXACT)

**Data Representation (3 passages, 15 questions total):**
- Passage 1 (Q1-5): Graphs/charts
- Passage 2 (Q6-10): Data tables
- Passage 3 (Q11-15): Mixed visuals

**Research Summaries (3 passages, 18 questions total):**
- Passage 4 (Q16-21): Physics/Engineering (MUST include 1 engineering topic - NEW 2025)
- Passage 5 (Q22-27): Biology/Life Science
- Passage 6 (Q28-33): Chemistry/Earth Science

**Conflicting Viewpoints (1 passage, 7 questions):**
- Passage 7 (Q34-40): Two scientists/theories debate

### HTML Table Format (REQUIRED for Data Passages)

```html
<table border="1" style="border-collapse: collapse; margin: 20px 0; width: 100%;">
  <caption style="font-weight: bold; margin-bottom: 10px;">Table 1: [Descriptive Title]</caption>
  <thead>
    <tr style="background-color: #f0f0f0;">
      <th style="padding: 8px; text-align: center;">Variable</th>
      <th style="padding: 8px; text-align: center;">Result (units)</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td style="padding: 8px; text-align: center;">Value 1</td>
      <td style="padding: 8px; text-align: center;">Data 1</td>
    </tr>
  </tbody>
</table>
```

### Data Realism Constraints

**Chemistry (Reaction Rates):**
- Temperature ↑ → Rate ↑ (typically 2-4x per 10°C)
- Concentration ↑ → Rate ↑ (proportional)
- Catalyst present → Rate much higher

**Physics (Motion/Forces):**
- Acceleration = F/m (inverse relationship with mass)
- Distance increases quadratically with time under constant acceleration
- Friction coefficient: static > kinetic

**Biology (Enzyme Activity):**
- Optimal pH exists (bell curve)
- Activity zero at extreme pH
- Temperature optimal ~37°C for human enzymes

### Engineering/Design Topic (NEW 2025 Requirement)

**Must include at least ONE of:**
- Bridge design and load testing
- Solar panel efficiency optimization
- Water filtration system design
- Aerodynamics and drag reduction
- Structural integrity testing

### Question Type Distribution

**Data Reading (12 questions):**
- Find specific value in table/graph
- Compare two data points
- Identify trend

**Pattern Recognition (8 questions):**
- Relationship between variables
- Predict next value in sequence
- Interpolation/extrapolation

**Experimental Design (7 questions):**
- Identify variables (independent/dependent/control)
- Suggest improvements
- Identify flaws

**Inference/Evaluation (8 questions):**
- Explain unexpected result
- Support/weaken hypothesis
- Apply findings to new scenario

**Conflicting Viewpoints (5 questions):**
- Main claim of each scientist
- Point of agreement/disagreement
- Evidence supporting each view

---

## ✅ VALIDATION REQUIREMENTS

### Pre-Insertion Validation

**Schema Validation:**
```javascript
// Every question MUST have:
- test_number (1)
- question_number (sequential)
- question_text (non-empty)
- choices (valid JSON array, exactly 4 items)
- correct_answer (0-3)
- difficulty ("easy" | "medium" | "hard")
- question_type (from approved taxonomy)

// English questions additionally:
- passage_id (valid foreign key)
- question_text includes underlined portion from passage

// Passages MUST have:
- test_number (1)
- passage_number (sequential)
- passage_text (non-empty)
- passage_type (valid type)
- question_range (accurate)
```

**Content Validation:**
```javascript
// English passages:
- Exactly 10 <u>...</u> tags per passage
- Word count 400-450
- Natural flow when read aloud

// Math questions:
- Exactly 4 answer choices (A-D)
- Numerical answers are reasonable
- No "E" choice exists

// Reading passages:
- Word count 700-850
- Appropriate reading level
- Clear organization

// Science passages:
- HTML tables properly formatted
- Data is scientifically realistic
- At least 1 engineering/design topic
```

**Distribution Validation:**
```javascript
// English:
- Total 50 questions
- Grammar: ~28, Punctuation: ~12, Rhetorical: ~10
- Easy: 14, Medium: 23, Hard: 13

// Math:
- Total 45 questions
- Pre-Alg: 9, Elem-Alg: 9, Inter-Alg: 9, Coord-Geo: 7, Plane-Geo: 9, Trig: 4
- Easy: 15, Medium: 19, Hard: 11

// Reading:
- Total 36 questions (9 per passage)
- 4 passage types represented
- Question type distribution met per passage

// Science:
- Total 40 questions
- Data Rep: 15, Research Sum: 18, Conflicting: 7
- Engineering topic present
```

---

## 🚀 GENERATION EXECUTION PLAN

### Phase 1: English Generation
1. Write 5 passages (topics pre-selected)
2. Insert exactly 10 <u> tags per passage (natural positions)
3. Generate 50 questions matching underlines
4. Validate question type distribution
5. Insert passages → get IDs → insert questions with passage_id

### Phase 2: Math Generation
1. Generate 45 questions following topic/difficulty distribution
2. Create 4-choice answers with systematic distractors
3. Validate no "E" choices exist
4. Insert all questions

### Phase 3: Reading Generation
1. Write 4 passages (exact types: fiction, social, humanities, science)
2. Ensure 700-850 word count each
3. Generate 9 questions per passage
4. Insert passages → get IDs → insert questions

### Phase 4: Science Generation
1. Write 7 passages (3 data, 3 research, 1 conflicting)
2. Create HTML tables for data passages
3. Ensure engineering topic in one research passage
4. Generate questions with passage references
5. Insert passages → get IDs → insert questions

### Phase 5: Final Validation
1. Run comprehensive validation script
2. Check all foreign keys valid
3. Verify all formatting correct
4. Test rendering on localhost
5. Confirm underlines highlight correctly

---

## 🎯 SUCCESS CRITERIA

✅ **Database:**
- 171 total questions (50+45+36+40)
- 15-16 passages (5+0+4+6-7)
- Zero NULL required fields
- All foreign keys valid

✅ **Format Compliance:**
- NEW 2025 ACT format exactly
- Math has 4 choices only
- English has question stems
- Science has engineering topic

✅ **Quality:**
- All passages read naturally
- All questions have ONE correct answer
- Distractors are plausible
- Explanations are clear

✅ **Functionality:**
- Renders correctly on website
- Underlines highlight properly
- Timer works (35/50/40/40 mins)
- Answer key 100% accurate

---

This specification is now COMPLETE and ready for implementation.
