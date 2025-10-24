# ACT QUESTION BANK MASTER PLAN
## Complete Analysis & 1:1 Test Generation System

**Goal**: Extract all 1,680+ questions from 7 practice ACT tests into Supabase, analyze patterns, and build a system to generate authentic ACT practice tests with 1:1 accuracy.

**Timeline**: 4-6 weeks
**Status**: Planning Phase
**Created**: 2025-10-22

---

## TABLE OF CONTENTS

1. [Project Overview](#project-overview)
2. **[📚 LESSON TAGGING SYSTEM](./LESSON_TAGGING_INTEGRATION.md)** ← **NEW: Critical Integration**
3. [Database Architecture](#database-architecture)
4. [Phase 1: Database Setup](#phase-1-database-setup)
5. [Phase 2: Data Extraction](#phase-2-data-extraction)
6. [Phase 3: Pattern Analysis](#phase-3-pattern-analysis)
7. [Phase 4: Generation System](#phase-4-generation-system)
8. [Phase 5: Validation & Testing](#phase-5-validation--testing)
9. [Milestones & Metrics](#milestones--metrics)
10. [Technical Stack](#technical-stack)
11. [Risk Mitigation](#risk-mitigation)

---

## PROJECT OVERVIEW

### Current State
- ✅ 7 full official ACT practice tests (raw text format)
- ✅ ~1,500 lines of manual content analysis
- ✅ Question pattern documentation
- ⚠️ Only ~20% of questions systematically analyzed
- ❌ No structured database

### Target State
- ✅ All 1,680+ questions in structured Supabase database
- ✅ Complete passage library with metadata
- ✅ Distractor pattern analysis for every question
- ✅ Statistical models for difficulty and topic distribution
- ✅ AI-assisted generation system with 90-95% ACT similarity
- ✅ Automated validation suite

### Success Metrics
1. **Data Completeness**: 100% of questions extracted and validated (1,680/1,680)
2. **Pattern Coverage**: 95%+ of question types have templates
3. **Generation Quality**: Generated questions pass blind ACT similarity test at 90%+
4. **Distractor Quality**: Wrong answers indistinguishable from real ACT distractors
5. **Difficulty Calibration**: Generated test difficulty distribution matches official tests
6. **🆕 Lesson Coverage**: 100% of questions tagged to curriculum lessons (81 total lessons)

---

## 🆕 LESSON TAGGING INTEGRATION

**🔗 [Full Documentation: LESSON_TAGGING_INTEGRATION.md](./LESSON_TAGGING_INTEGRATION.md)**

**Critical Addition**: Every question extracted from the 7 practice tests will be tagged to your existing 81-lesson curriculum.

### Why This Matters:
1. **Targeted Practice**: Students practice real ACT questions after completing each lesson
2. **Smart Analytics**: Track which lessons are effective based on question performance
3. **Personalized Learning**: Recommend lessons based on weak areas
4. **Auto-Generated Practice**: Generate questions that automatically inherit lesson tags
5. **Complete Learning Path**: Lesson → Practice → Mastery

### Your Current Curriculum:
- **English**: 16 lessons (sentence structure, commas, verbs, pronouns, etc.)
- **Math**: 35 lessons (geometry, algebra, statistics, advanced topics)
- **Reading**: 14 lessons (strategies, question types, answer analysis)
- **Science**: 16 lessons (data interpretation, graphs, experiments)
- **Total**: **81 comprehensive lessons**

### Integration Points:
- **Phase 1**: Add lesson tagging fields to database schema
- **Phase 2**: Auto-tag questions during extraction using question type → lesson mapping
- **Phase 3**: Analyze lesson coverage, identify gaps
- **Phase 4**: Generated questions inherit lesson tags from patterns
- **Phase 5**: Validate tagging accuracy (95%+ target)

See [LESSON_TAGGING_INTEGRATION.md](./LESSON_TAGGING_INTEGRATION.md) for complete question type → lesson mappings, database schema updates, and implementation details.

---

## DATABASE ARCHITECTURE

### Supabase Schema Design

#### **Table 1: `act_passages`**
Stores all reading passages and context for questions

```sql
CREATE TABLE act_passages (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  test_number INTEGER NOT NULL, -- 1-7
  section VARCHAR(20) NOT NULL, -- 'english', 'reading', 'science'
  passage_number INTEGER NOT NULL, -- 1-5 for English, 1-4 for Reading, etc.

  -- Content
  title VARCHAR(500),
  topic_category VARCHAR(100), -- e.g., 'Marine Biology', 'History', 'Physics'
  full_text TEXT NOT NULL,
  summary TEXT,

  -- Metadata
  word_count INTEGER,
  reading_level DECIMAL(3,1), -- Flesch-Kincaid grade level
  writing_style VARCHAR(100), -- e.g., 'Narrative', 'Expository', 'Persuasive'
  themes TEXT[], -- Array of themes

  -- For Science passages
  passage_type VARCHAR(50), -- 'data_representation', 'research_summary', 'conflicting_viewpoints'
  figure_count INTEGER,
  table_count INTEGER,
  graph_types TEXT[], -- e.g., ['line_graph', 'bar_chart']

  -- Timestamps
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW(),

  UNIQUE(test_number, section, passage_number)
);

CREATE INDEX idx_passages_section ON act_passages(section);
CREATE INDEX idx_passages_test ON act_passages(test_number);
CREATE INDEX idx_passages_topic ON act_passages(topic_category);
```

#### **Table 2: `act_questions`**
Every single question from all 7 tests

```sql
CREATE TABLE act_questions (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),

  -- Location identifiers
  test_number INTEGER NOT NULL,
  section VARCHAR(20) NOT NULL, -- 'english', 'math', 'reading', 'science'
  question_number INTEGER NOT NULL, -- 1-75 for English, 1-60 for Math, etc.
  passage_id UUID REFERENCES act_passages(id), -- NULL for standalone questions (Math)

  -- Question content
  question_stem TEXT NOT NULL, -- The actual question text
  underlined_portion TEXT, -- For English questions
  context_before TEXT, -- Text before underlined portion
  context_after TEXT, -- Text after underlined portion

  -- Answer choices
  choice_a TEXT NOT NULL,
  choice_b TEXT NOT NULL,
  choice_c TEXT NOT NULL,
  choice_d TEXT NOT NULL,
  choice_e TEXT, -- For Math (5 choices)
  correct_answer CHAR(1) NOT NULL, -- 'A', 'B', 'C', 'D', or 'E'

  -- Classification
  question_type VARCHAR(100) NOT NULL, -- 'subject_verb_agreement', 'main_idea', 'geometry', etc.
  content_area VARCHAR(100), -- 'Pre-Algebra', 'Coordinate Geometry', etc. (Math)
  skill_tested VARCHAR(100), -- 'Grammar', 'Transitions', 'Data Interpretation', etc.

  -- Difficulty
  difficulty_level VARCHAR(20), -- 'easy', 'medium', 'hard'
  difficulty_score DECIMAL(3,2), -- 0.00-1.00 calculated score
  estimated_time_seconds INTEGER, -- Average time to solve

  -- For Math questions
  requires_calculator BOOLEAN DEFAULT false,
  diagram_description TEXT,
  diagram_url TEXT,
  solution_steps TEXT[], -- Step-by-step solution
  formulas_required TEXT[], -- e.g., ['quadratic_formula', 'pythagorean_theorem']

  -- For Science questions
  figure_reference VARCHAR(50), -- e.g., 'Figure 1', 'Table 2'
  data_interpretation_type VARCHAR(50), -- 'direct_lookup', 'trend_analysis', etc.

  -- Statistics (will be populated from real student data if available)
  times_answered INTEGER DEFAULT 0,
  times_correct INTEGER DEFAULT 0,
  success_rate DECIMAL(5,2), -- Percentage

  -- Timestamps
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW(),

  UNIQUE(test_number, section, question_number)
);

CREATE INDEX idx_questions_section ON act_questions(section);
CREATE INDEX idx_questions_test ON act_questions(test_number);
CREATE INDEX idx_questions_type ON act_questions(question_type);
CREATE INDEX idx_questions_difficulty ON act_questions(difficulty_level);
CREATE INDEX idx_questions_passage ON act_questions(passage_id);
```

#### **Table 3: `act_distractors`**
Analysis of why wrong answers exist (critical for generation!)

```sql
CREATE TABLE act_distractors (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  question_id UUID REFERENCES act_questions(id) ON DELETE CASCADE,

  -- Which wrong answer
  choice_letter CHAR(1) NOT NULL, -- 'A', 'B', 'C', 'D', or 'E'
  choice_text TEXT NOT NULL,

  -- Distractor analysis
  distractor_type VARCHAR(100) NOT NULL, -- See distractor types below
  why_wrong TEXT NOT NULL, -- Detailed explanation
  common_misconception TEXT, -- What student error leads to this choice

  -- Pattern tags
  pattern_tags TEXT[], -- e.g., ['extreme_language', 'out_of_scope', 'reversal']

  -- Statistics
  student_selection_rate DECIMAL(5,2), -- How often students pick this (if data available)

  created_at TIMESTAMPTZ DEFAULT NOW(),

  UNIQUE(question_id, choice_letter)
);

CREATE INDEX idx_distractors_question ON act_distractors(question_id);
CREATE INDEX idx_distractors_type ON act_distractors(distractor_type);
```

**Common Distractor Types:**
```
English Section:
- 'punctuation_error' - Wrong punctuation mark
- 'verb_tense_mismatch' - Incorrect tense
- 'wordiness' - Unnecessarily verbose
- 'informal_register' - Too casual for context
- 'meaning_change' - Alters intended meaning
- 'redundant' - Repeats information
- 'fragment' - Creates sentence fragment
- 'comma_splice' - Improper comma usage

Math Section:
- 'calculation_error' - Common arithmetic mistake
- 'wrong_formula' - Applies incorrect formula
- 'sign_error' - Wrong positive/negative
- 'unit_confusion' - Wrong units or conversion
- 'partial_answer' - Intermediate step, not final answer
- 'reversal' - Reciprocal or inverse of correct answer
- 'off_by_one' - Answer is n±1 of correct value

Reading Section:
- 'too_extreme' - Overly strong language
- 'out_of_scope' - Not supported by passage
- 'reversal' - Opposite of what passage says
- 'too_narrow' - Focuses on detail, not main idea
- 'too_broad' - Too general for specific question
- 'wrong_paragraph' - From different part of passage
- 'inference_too_far' - Over-inference

Science Section:
- 'wrong_figure' - Data from different graph/table
- 'extrapolation_error' - Extends beyond data range
- 'axis_confusion' - Reads wrong axis
- 'trend_reversal' - Opposite of actual trend
- 'calculation_error' - Math mistake
- 'cannot_determine' - Answer requires data not given
```

#### **Table 4: `act_question_patterns`**
Templates for generating new questions

```sql
CREATE TABLE act_question_patterns (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),

  -- Pattern identification
  pattern_name VARCHAR(200) NOT NULL,
  section VARCHAR(20) NOT NULL,
  question_type VARCHAR(100) NOT NULL,

  -- Template structure
  stem_template TEXT NOT NULL, -- With placeholders like {variable}, {context}
  example_variables JSONB, -- Example values for placeholders

  -- Answer construction
  correct_answer_formula TEXT, -- How to generate correct answer
  distractor_rules JSONB, -- Rules for generating wrong answers

  -- Constraints
  difficulty_range VARCHAR(50), -- 'easy-medium', 'medium-hard', etc.
  required_context TEXT[], -- What context/passage elements needed

  -- Examples
  example_question_ids UUID[], -- References to act_questions

  -- Statistics
  frequency_in_tests DECIMAL(5,2), -- % of tests that include this pattern
  average_difficulty DECIMAL(3,2),

  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW(),

  UNIQUE(pattern_name, section)
);

CREATE INDEX idx_patterns_section ON act_question_patterns(section);
CREATE INDEX idx_patterns_type ON act_question_patterns(question_type);
```

#### **Table 5: `act_test_statistics`**
Statistical analysis of each test for validation

```sql
CREATE TABLE act_test_statistics (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  test_number INTEGER NOT NULL UNIQUE,

  -- Section statistics
  english_stats JSONB, -- Question type distribution, difficulty curve, etc.
  math_stats JSONB,
  reading_stats JSONB,
  science_stats JSONB,

  -- Overall metrics
  total_questions INTEGER,
  average_difficulty DECIMAL(3,2),
  difficulty_distribution JSONB, -- e.g., {"easy": 20, "medium": 60, "hard": 20}

  -- Topic distribution
  topic_frequencies JSONB, -- How often each topic appears

  -- Passage metadata
  passage_statistics JSONB, -- Word counts, reading levels, etc.

  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);
```

#### **Table 6: `generated_questions`**
Questions we generate (for comparison and validation)

```sql
CREATE TABLE generated_questions (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),

  -- Generation metadata
  pattern_id UUID REFERENCES act_question_patterns(id),
  generation_method VARCHAR(50), -- 'template', 'ai_assisted', 'hybrid'
  ai_model VARCHAR(100), -- e.g., 'claude-3-opus', 'gpt-4'

  -- Question structure (same as act_questions)
  section VARCHAR(20) NOT NULL,
  question_stem TEXT NOT NULL,
  choice_a TEXT NOT NULL,
  choice_b TEXT NOT NULL,
  choice_c TEXT NOT NULL,
  choice_d TEXT NOT NULL,
  choice_e TEXT,
  correct_answer CHAR(1) NOT NULL,

  -- Classification
  question_type VARCHAR(100),
  difficulty_level VARCHAR(20),

  -- Validation
  similarity_score DECIMAL(3,2), -- 0.00-1.00 vs. real ACT questions
  human_validated BOOLEAN DEFAULT false,
  validation_notes TEXT,
  approved_for_use BOOLEAN DEFAULT false,

  -- Performance tracking
  times_used INTEGER DEFAULT 0,
  student_success_rate DECIMAL(5,2),

  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE INDEX idx_generated_section ON generated_questions(section);
CREATE INDEX idx_generated_pattern ON generated_questions(pattern_id);
CREATE INDEX idx_generated_approved ON generated_questions(approved_for_use);
```

#### **Table 7: `extraction_progress`**
Track which questions have been extracted and validated

```sql
CREATE TABLE extraction_progress (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  test_number INTEGER NOT NULL,
  section VARCHAR(20) NOT NULL,

  -- Progress tracking
  total_questions INTEGER NOT NULL,
  extracted_count INTEGER DEFAULT 0,
  validated_count INTEGER DEFAULT 0,

  -- Status
  extraction_status VARCHAR(20) DEFAULT 'pending', -- 'pending', 'in_progress', 'completed'
  validation_status VARCHAR(20) DEFAULT 'pending',

  -- Assignee (if multiple people working on this)
  extracted_by VARCHAR(100),
  validated_by VARCHAR(100),

  -- Notes
  extraction_notes TEXT,
  issues_found TEXT[],

  -- Timestamps
  started_at TIMESTAMPTZ,
  completed_at TIMESTAMPTZ,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW(),

  UNIQUE(test_number, section)
);

CREATE INDEX idx_progress_status ON extraction_progress(extraction_status);
```

---

## PHASE 1: DATABASE SETUP

**Duration**: 3-5 days
**Deliverable**: Fully functional Supabase database with all tables and relationships

### Tasks

#### 1.1 Supabase Project Setup
- [ ] Create new Supabase project (or use existing)
- [ ] Configure database connection settings
- [ ] Set up Row Level Security (RLS) policies
- [ ] Create API keys for server-side access
- [ ] Document connection credentials in `.env`

**Script**: `scripts/database/setup-supabase-project.mjs`

#### 1.2 Create Database Schema
- [ ] Execute all CREATE TABLE statements
- [ ] Create indexes for performance
- [ ] Set up foreign key relationships
- [ ] Add CHECK constraints for data validation
- [ ] Create database functions for common queries

**SQL File**: `database/schemas/act_question_bank_schema.sql`

**Script**: `scripts/database/create-schema.mjs`

```sql
-- Sample validation constraints
ALTER TABLE act_questions
  ADD CONSTRAINT valid_section
  CHECK (section IN ('english', 'math', 'reading', 'science'));

ALTER TABLE act_questions
  ADD CONSTRAINT valid_answer
  CHECK (correct_answer IN ('A', 'B', 'C', 'D', 'E'));

ALTER TABLE act_questions
  ADD CONSTRAINT valid_difficulty
  CHECK (difficulty_level IN ('easy', 'medium', 'hard'));
```

#### 1.3 Create Database Utilities
- [ ] Connection helper functions
- [ ] Bulk insert utilities
- [ ] Error handling and logging
- [ ] Rollback/restore functions
- [ ] Data validation helpers

**Scripts**:
- `scripts/database/db-utils.mjs` - Common database operations
- `scripts/database/validators.mjs` - Data validation functions
- `scripts/database/backup-restore.mjs` - Backup utilities

#### 1.4 Initialize Progress Tracking
- [ ] Insert rows into `extraction_progress` for all 28 test-sections
  - Tests 1-7 × 4 sections = 28 rows
- [ ] Set initial counts (75 English, 60 Math, 40 Reading, 40 Science per test)
- [ ] Create progress dashboard query

**Script**: `scripts/database/init-progress-tracking.mjs`

#### 1.5 Testing & Validation
- [ ] Test all table relationships
- [ ] Verify indexes are working
- [ ] Test insert/update/delete operations
- [ ] Benchmark query performance
- [ ] Create test data for development

**Script**: `scripts/database/test-schema.mjs`

---

## PHASE 2: DATA EXTRACTION

**Duration**: 2-3 weeks
**Deliverable**: All 1,680 questions extracted and stored in Supabase

### Overview

We have 7 practice tests in text format. Each test needs to be parsed section by section:
- **English**: 75 questions (5 passages × 15 questions)
- **Math**: 60 questions
- **Reading**: 40 questions (4 passages × 10 questions)
- **Science**: 40 questions (6-7 passages)

**Total per test**: 215 questions
**Total all tests**: 1,505 questions

### Extraction Strategy

**Order of Operations** (easiest to hardest):
1. English passages and questions (most structured format)
2. Reading passages and questions (similar to English)
3. Math questions (standalone, clear format)
4. Science passages and questions (complex figures/tables)

### Tasks

#### 2.1 Build Base Parser Infrastructure
- [ ] Create text file reader with encoding detection
- [ ] Build section separator (detect section boundaries)
- [ ] Create question number detector
- [ ] Build answer choice parser (A/B/C/D/E)
- [ ] Create validation framework

**Script**: `scripts/extraction/base-parser.mjs`

```javascript
// Example structure
class ACTParser {
  constructor(testFilePath) {
    this.testNumber = extractTestNumber(testFilePath);
    this.rawText = fs.readFileSync(testFilePath, 'utf-8');
  }

  extractSections() {
    // Split into English, Math, Reading, Science
  }

  parseSection(sectionText, sectionName) {
    // Extract questions from section
  }

  validateExtraction(questions) {
    // Ensure all questions extracted correctly
  }
}
```

#### 2.2 English Section Extraction

**Subtasks**:
- [ ] Extract 5 passages per test (35 total)
- [ ] Parse passage metadata (title, topic, word count)
- [ ] Extract underlined portions and context
- [ ] Parse "NO CHANGE" questions
- [ ] Extract "Which choice..." rhetorical questions
- [ ] Parse "DELETE the underlined portion" questions
- [ ] Extract all answer choices
- [ ] Identify correct answers from answer key

**Script**: `scripts/extraction/extract-english.mjs`

**Parsing Challenges**:
- Underlined portions marked with numbers (1, 2, 3...)
- Answer choices in right column format
- Rhetorical questions in boxes
- Passage-level questions (placement, order)

**Output**: Insert into `act_passages` and `act_questions`

**Progress Tracking**:
```javascript
// After each test section
await updateExtractionProgress({
  test_number: 1,
  section: 'english',
  extracted_count: 75,
  extraction_status: 'completed'
});
```

#### 2.3 Reading Section Extraction

**Subtasks**:
- [ ] Extract 4 passages per test (28 total)
- [ ] Identify passage types (Prose Fiction, Social Science, Humanities, Natural Science)
- [ ] Parse full passage text
- [ ] Extract 10 questions per passage
- [ ] Parse line references (e.g., "lines 23-27")
- [ ] Extract all answer choices
- [ ] Match questions to passages

**Script**: `scripts/extraction/extract-reading.mjs`

**Parsing Challenges**:
- Long passage text (400-900 words)
- Line number references
- Questions may reference specific paragraphs
- Some questions compare two passages (dual passages)

#### 2.4 Math Section Extraction

**Subtasks**:
- [ ] Extract 60 standalone questions per test (420 total)
- [ ] Parse question stems with mathematical notation
- [ ] Detect and describe diagrams/figures
- [ ] Extract 5 answer choices (A through K, odd letters)
- [ ] Identify calculator vs. non-calculator questions
- [ ] Extract any formulas or special symbols

**Script**: `scripts/extraction/extract-math.mjs`

**Parsing Challenges**:
- Mathematical notation in text format (superscripts, fractions, symbols)
- Diagrams described in text or need manual description
- Answer choices use A, B, C, D, E or F, G, H, J, K
- Some questions span multiple lines

**Special Handling**:
- Create placeholder for diagram descriptions
- Flag questions needing diagram digitization
- Parse mathematical expressions carefully

#### 2.5 Science Section Extraction

**Subtasks**:
- [ ] Extract 6-7 passages per test
- [ ] Identify passage types (Data Representation, Research Summaries, Conflicting Viewpoints)
- [ ] Parse passage introduction text
- [ ] Describe figures, tables, graphs
- [ ] Extract questions (5-7 per passage)
- [ ] Link questions to specific figures/tables
- [ ] Extract all answer choices

**Script**: `scripts/extraction/extract-science.mjs`

**Parsing Challenges** (MOST COMPLEX):
- Multiple figures and tables per passage
- Graph descriptions (axis labels, legends, data points)
- Table data extraction
- Experimental procedures
- Conflicting Viewpoints format (Student 1 vs. Student 2)

**Special Handling**:
- Create structured JSON for table data
- Describe graphs systematically (type, axes, trend)
- Flag passages needing figure digitization

#### 2.6 Answer Key Extraction

**Subtasks**:
- [ ] Parse answer key from each test
- [ ] Map correct answers to questions
- [ ] Validate answer letter matches question choices
- [ ] Cross-reference all 215 questions per test

**Script**: `scripts/extraction/extract-answer-keys.mjs`

**Validation**:
```javascript
// Ensure every question has correct answer
const questionsWithoutAnswers = await supabase
  .from('act_questions')
  .select('id')
  .is('correct_answer', null);

if (questionsWithoutAnswers.data.length > 0) {
  throw new Error(`${questionsWithoutAnswers.data.length} questions missing answers`);
}
```

#### 2.7 Manual Review & Correction

**Process**:
1. Extract automated data
2. Generate review reports
3. Manual spot-check (sample 10% of questions)
4. Correct errors found
5. Re-validate

**Script**: `scripts/extraction/generate-review-report.mjs`

**Review Report Should Include**:
- Questions with parsing warnings
- Missing answer choices
- Unusual formatting
- Potential errors flagged by validator

#### 2.8 Extraction Validation

**Validation Checks**:
- [ ] Total question count matches expected (215 per test × 7 = 1,505)
- [ ] All questions have 4-5 answer choices
- [ ] All correct answers are A, B, C, D, or E
- [ ] No duplicate questions
- [ ] All passages have associated questions
- [ ] Reading level scores are reasonable
- [ ] All foreign keys resolve correctly

**Script**: `scripts/extraction/validate-extraction.mjs`

```javascript
const validationChecks = [
  checkTotalQuestionCount(),
  checkAllAnswerChoicesPresent(),
  checkCorrectAnswerValid(),
  checkNoDuplicates(),
  checkPassageReferences(),
  checkForeignKeys()
];

const results = await Promise.all(validationChecks);
generateValidationReport(results);
```

---

## PHASE 3: PATTERN ANALYSIS

**Duration**: 2-3 weeks
**Deliverable**: Complete pattern library and distractor analysis

### Overview

This is where we extract the **DNA** of ACT questions. For each question, we need to understand:
1. What skill/concept is being tested?
2. What patterns does the question follow?
3. Why do the wrong answers exist?
4. How is difficulty created?

### Tasks

#### 3.1 Question Type Taxonomy

**Create comprehensive taxonomy for each section**:

**English Question Types** (40-50 types):
```
Grammar & Mechanics:
- Punctuation
  - Commas (with clauses, lists, introductory phrases)
  - Semicolons (independent clauses)
  - Colons (lists, explanations)
  - Apostrophes (possession, contractions)
  - Dashes (interruption, emphasis)
- Subject-Verb Agreement
  - Singular vs. plural
  - With intervening phrases
  - Compound subjects
- Verb Tense
  - Simple tenses
  - Perfect tenses
  - Consistency
- Pronouns
  - Pronoun-antecedent agreement
  - Pronoun case
  - Relative pronouns (who/whom)
- Modifiers
  - Misplaced modifiers
  - Dangling modifiers
- Parallelism
  - In lists
  - In comparisons

Rhetorical Skills:
- Strategy
  - Add/delete decisions
  - Purpose/effect questions
  - Audience awareness
- Organization
  - Sentence placement
  - Paragraph order
  - Logical sequence
  - Transitions
- Style
  - Word choice
  - Precision
  - Conciseness
  - Tone
  - Redundancy
```

**Script**: `scripts/analysis/classify-question-types.mjs`

**Output**: Update `question_type` field for all questions

#### 3.2 Distractor Analysis (CRITICAL!)

For EVERY wrong answer choice, document:
1. **Distractor Type** (from predefined taxonomy)
2. **Why It's Wrong** (detailed explanation)
3. **Student Misconception** (what error leads here)
4. **Pattern Tags** (for template generation)

**Process**:
1. Query all questions from database
2. For each question, analyze each wrong answer
3. Insert into `act_distractors` table

**Script**: `scripts/analysis/analyze-distractors.mjs`

**Example Analysis**:

```javascript
// Question: "The dog's tail wagged" vs "The dogs' tail wagged"
const distractorAnalysis = {
  question_id: 'uuid-here',
  choice_letter: 'B',
  choice_text: "dogs'",
  distractor_type: 'apostrophe_error',
  why_wrong: "Apostrophe after 's' indicates multiple dogs, but context shows singular dog",
  common_misconception: "Student confused plural possessive with singular possessive",
  pattern_tags: ['punctuation', 'possessive_apostrophe', 'singular_vs_plural']
};
```

**This is the MOST IMPORTANT phase** - understanding distractor patterns is what enables authentic generation!

#### 3.3 Difficulty Analysis

**Determine what makes questions easy vs. hard**:

**Difficulty Factors**:
- **English**:
  - Number of grammar rules tested simultaneously
  - Complexity of sentence structure
  - Subtlety of error
  - Amount of context needed

- **Math**:
  - Number of solution steps
  - Number of concepts combined
  - Computational complexity
  - Abstraction level

- **Reading**:
  - Inference depth required
  - Answer choice similarity
  - Amount of text to analyze
  - Vocabulary difficulty

- **Science**:
  - Number of figures to cross-reference
  - Calculation complexity
  - Extrapolation vs. direct lookup
  - Scientific reasoning depth

**Script**: `scripts/analysis/analyze-difficulty.mjs`

**Output**: Update `difficulty_level` and `difficulty_score` fields

**Difficulty Scoring Algorithm**:
```javascript
function calculateDifficulty(question) {
  let score = 0;

  // Factor 1: Question position (later = harder)
  score += (question.question_number / maxQuestions) * 0.3;

  // Factor 2: Complexity metrics
  score += calculateComplexityScore(question) * 0.4;

  // Factor 3: Historical success rate (if available)
  if (question.success_rate) {
    score += (1 - question.success_rate) * 0.3;
  }

  return score; // 0.0 - 1.0
}
```

#### 3.4 Pattern Template Extraction

**Create reusable templates from real questions**:

**Process**:
1. Group questions by type
2. Identify structural similarities
3. Extract variable elements
4. Create templates with placeholders
5. Document generation rules

**Script**: `scripts/analysis/extract-templates.mjs`

**Example Template**:

```javascript
// Subject-Verb Agreement Template
{
  pattern_name: "Subject-Verb Agreement with Intervening Phrase",
  section: "english",
  question_type: "subject_verb_agreement",
  stem_template: "{subject}, {intervening_phrase}, {verb} {rest_of_sentence}",
  example_variables: {
    subject: ["The dog", "The collection", "The student"],
    intervening_phrase: [
      "along with its puppies",
      "of ancient artifacts",
      "who studied for hours"
    ],
    verb: ["was/were", "is/are", "has/have"],
    rest_of_sentence: ["found in the park", "discovered yesterday", "passed the test"]
  },
  correct_answer_formula: "Match verb to main subject, ignore intervening phrase",
  distractor_rules: {
    type_1: "Verb agrees with intervening phrase instead of subject",
    type_2: "Wrong tense but correct number",
    type_3: "Completely wrong form"
  }
}
```

**Output**: Insert into `act_question_patterns` table

#### 3.5 Statistical Analysis

**Calculate distributions and frequencies**:

**Metrics to Calculate**:
- Question type frequency by section
- Difficulty distribution by test
- Topic distribution (Math content areas)
- Passage characteristics (length, reading level, topic)
- Answer choice distribution (is C more common?)
- Transition word frequency (English)
- Formula frequency (Math)

**Script**: `scripts/analysis/calculate-statistics.mjs`

**Output**: Insert into `act_test_statistics` table

**Example Statistics**:
```json
{
  "test_number": 1,
  "english_stats": {
    "question_type_distribution": {
      "punctuation": 15,
      "subject_verb_agreement": 4,
      "transitions": 8,
      ...
    },
    "difficulty_curve": [0.2, 0.3, 0.5, 0.6, 0.7],
    "passage_topics": ["marine_biology", "history", "art", "engineering", "music"]
  },
  "math_stats": {
    "content_area_distribution": {
      "pre_algebra": 14,
      "elementary_algebra": 10,
      "intermediate_algebra": 9,
      "coordinate_geometry": 9,
      "plane_geometry": 14,
      "trigonometry": 4
    },
    "calculator_required": 42,
    "multi_step_problems": 23
  }
}
```

#### 3.6 Cross-Test Comparison

**Compare patterns across all 7 tests**:

**Questions to Answer**:
- Are question types consistent across tests?
- Does difficulty progression follow same pattern?
- Are certain topics over/under-represented in some tests?
- Are there outlier questions that don't fit patterns?

**Script**: `scripts/analysis/compare-tests.mjs`

**Output**: Analysis report identifying:
- Consistent patterns (high confidence for generation)
- Variable patterns (need more data)
- Unique questions (may need manual creation)

#### 3.7 Vocabulary & Language Analysis

**For Reading and English sections**:

**Extract**:
- Vocabulary difficulty level
- Common transition words used
- Rhetorical question phrasings
- Passage topic vocabulary

**Script**: `scripts/analysis/analyze-language.mjs`

**Output**:
- Vocabulary frequency lists
- Transition word library
- Question stem templates

---

## PHASE 4: GENERATION SYSTEM

**Duration**: 2-3 weeks
**Deliverable**: Working question generation system

### Overview

Now we use our pattern library to generate NEW questions that are indistinguishable from real ACT questions.

### Tasks

#### 4.1 Template-Based Generator (Deterministic)

**For highly structured question types**:

**Approach**: Fill in template variables with valid substitutions

**Best For**:
- Subject-verb agreement (English)
- Basic punctuation (English)
- Pre-algebra (Math)
- Direct data lookup (Science)

**Script**: `scripts/generation/template-generator.mjs`

```javascript
class TemplateGenerator {
  async generateQuestion(patternId, variables = {}) {
    const pattern = await getPattern(patternId);
    const filledStem = fillTemplate(pattern.stem_template, variables);
    const answerChoices = generateAnswerChoices(pattern, variables);

    return {
      question_stem: filledStem,
      ...answerChoices,
      pattern_id: patternId,
      generation_method: 'template'
    };
  }

  generateAnswerChoices(pattern, variables) {
    const correctAnswer = applyFormula(pattern.correct_answer_formula, variables);
    const distractors = generateDistractors(pattern.distractor_rules, correctAnswer);

    return shuffleAndFormat(correctAnswer, distractors);
  }
}
```

#### 4.2 AI-Assisted Generator (For Complex Questions)

**For questions requiring natural language and creativity**:

**Approach**: Use Claude/GPT-4 with carefully crafted prompts based on our analysis

**Best For**:
- Rhetorical skills (English)
- Reading comprehension
- Complex math word problems
- Science research summaries

**Script**: `scripts/generation/ai-generator.mjs`

**Prompt Structure**:
```javascript
const systemPrompt = `You are an expert ACT test writer. Generate questions that match official ACT style exactly.

Key Requirements:
1. Follow the exact pattern and structure provided
2. Match the specified difficulty level
3. Create plausible distractors using the specified distractor types
4. Use authentic ACT language and phrasing

Pattern Details:
${JSON.stringify(pattern, null, 2)}

Example Real Questions:
${exampleQuestions.map(q => formatQuestion(q)).join('\n\n')}

Distractor Guidelines:
${pattern.distractor_rules}
`;

const userPrompt = `Generate 1 new ${questionType} question at ${difficulty} difficulty.

Context: ${context}
Variables: ${JSON.stringify(variables)}

Return in this exact JSON format:
{
  "question_stem": "...",
  "choice_a": "...",
  "choice_b": "...",
  "choice_c": "...",
  "choice_d": "...",
  "correct_answer": "A",
  "explanation": "...",
  "distractor_explanations": {
    "B": "why B is wrong",
    "C": "why C is wrong",
    "D": "why D is wrong"
  }
}`;
```

**Claude API Call**:
```javascript
const response = await anthropic.messages.create({
  model: "claude-sonnet-4",
  max_tokens: 4096,
  messages: [
    { role: "user", content: systemPrompt + "\n\n" + userPrompt }
  ]
});

const generatedQuestion = JSON.parse(response.content[0].text);
```

#### 4.3 Hybrid Generator

**Combine template + AI for best results**:

**Process**:
1. Template generates structure and variables
2. AI enhances natural language quality
3. Template enforces distractor patterns
4. AI adds variety and authenticity

**Script**: `scripts/generation/hybrid-generator.mjs`

#### 4.4 Passage Generator

**For Reading and Science passages**:

**Reading Passage Generation**:
1. Select topic category (from distribution analysis)
2. Generate passage using AI with style constraints
3. Ensure appropriate reading level and word count
4. Generate 10 questions based on passage patterns

**Science Passage Generation**:
1. Select passage type (data representation, research summary, conflicting viewpoints)
2. Generate experimental context
3. Create synthetic data/graphs matching patterns
4. Generate 5-7 questions based on data

**Scripts**:
- `scripts/generation/generate-reading-passage.mjs`
- `scripts/generation/generate-science-passage.mjs`

**Passage Generation Prompt Example**:
```javascript
const passagePrompt = `Generate an ACT Reading passage that matches these specifications:

Type: ${passageType}
Topic: ${topic}
Length: ${wordCount} words (±50)
Reading Level: ${readingLevel} grade
Style: ${writingStyle}

Requirements:
1. Must support 10 reading comprehension questions
2. Include details that can be questioned literally
3. Include themes/arguments that can be inferred
4. Use vocabulary appropriate for high school juniors/seniors
5. Match the tone and style of authentic ACT passages

Example passages of this type:
${examplePassages}

Generate the passage now:`;
```

#### 4.5 Full Test Generator

**Generate a complete 4-section ACT practice test**:

**Process**:
1. Calculate target distributions (from statistics analysis)
2. Select question patterns to match distribution
3. Generate questions maintaining difficulty curve
4. Assemble into test format
5. Validate against statistical benchmarks

**Script**: `scripts/generation/generate-full-test.mjs`

**Difficulty Curve Enforcement**:
```javascript
// English Section: Questions 1-75
const difficultyTargets = [
  { range: [1, 15], avgDifficulty: 0.25 },   // Easy start
  { range: [16, 45], avgDifficulty: 0.50 },  // Medium middle
  { range: [46, 60], avgDifficulty: 0.65 },  // Harder
  { range: [61, 75], avgDifficulty: 0.75 }   // Hardest
];

for (const target of difficultyTargets) {
  const questions = generateQuestionsInRange(
    target.range,
    target.avgDifficulty
  );
  testQuestions.push(...questions);
}
```

#### 4.6 Quality Control Pipeline

**Automated checks before saving generated questions**:

**Checks**:
- [ ] Grammatical correctness
- [ ] Answer choice balance (not all "A" answers)
- [ ] Distractor plausibility
- [ ] Difficulty score within target range
- [ ] No duplicate questions
- [ ] All required fields populated

**Script**: `scripts/generation/quality-control.mjs`

```javascript
async function validateGeneratedQuestion(question) {
  const checks = [
    await checkGrammar(question),
    await checkAnswerBalance(question),
    await checkDistractorQuality(question),
    await checkDifficulty(question),
    await checkDuplicates(question),
    await checkCompleteness(question)
  ];

  const failedChecks = checks.filter(c => !c.passed);

  if (failedChecks.length > 0) {
    return {
      approved: false,
      issues: failedChecks,
      action: 'regenerate'
    };
  }

  return { approved: true };
}
```

---

## PHASE 5: VALIDATION & TESTING

**Duration**: 1-2 weeks
**Deliverable**: Validated generation system with quality metrics

### Tasks

#### 5.1 Similarity Scoring

**Compare generated questions to real ACT questions**:

**Metrics**:
1. **Structural Similarity**: Question format, length, answer choice format
2. **Language Similarity**: Vocabulary, phrasing, tone
3. **Difficulty Alignment**: Generated difficulty matches intended difficulty
4. **Distractor Quality**: Wrong answers are plausible

**Script**: `scripts/validation/calculate-similarity.mjs`

**Scoring Algorithm**:
```javascript
function calculateSimilarityScore(generatedQ, realQuestions) {
  // Find most similar real question
  const similarities = realQuestions.map(realQ => ({
    structural: compareStructure(generatedQ, realQ),
    language: compareLanguage(generatedQ, realQ),
    difficulty: compareDifficulty(generatedQ, realQ)
  }));

  const maxSimilarity = similarities.reduce((max, sim) => {
    const score = (sim.structural * 0.4) + (sim.language * 0.4) + (sim.difficulty * 0.2);
    return score > max ? score : max;
  }, 0);

  return maxSimilarity; // 0.0 - 1.0
}
```

**Target**: 90%+ similarity score

#### 5.2 Blind Testing

**Can humans distinguish generated from real questions?**

**Process**:
1. Create test set: 50 real + 50 generated (mixed)
2. Ask reviewers (teachers, tutors, students) to identify which are real
3. Calculate detection rate
4. Analyze which generated questions were detected and why

**Script**: `scripts/validation/prepare-blind-test.mjs`

**Success Criteria**: Detection rate < 60% (i.e., reviewers can't reliably tell)

#### 5.3 Statistical Validation

**Compare generated test statistics to real test statistics**:

**Comparisons**:
- Question type distribution (should match within 5%)
- Difficulty distribution (should match within 10%)
- Answer choice distribution (should be balanced)
- Passage characteristics (length, reading level)
- Topic coverage (no gaps or over-representation)

**Script**: `scripts/validation/statistical-validation.mjs`

**Output**: Report with pass/fail for each metric

#### 5.4 Expert Review

**Have ACT tutors/teachers review generated questions**:

**Review Criteria**:
1. Does this feel like a real ACT question?
2. Is the correct answer definitively correct?
3. Are distractors plausible but clearly wrong?
4. Is difficulty rating accurate?
5. Is content appropriate and accurate?

**Process**:
1. Select sample of generated questions (10 per section = 40 total)
2. Send to 3-5 expert reviewers
3. Collect feedback
4. Calculate approval rate
5. Identify patterns in rejected questions

**Target**: 85%+ approval rate

#### 5.5 Student Testing (Optional but Ideal)

**Test generated questions with real students**:

**Process**:
1. Administer mix of real + generated questions to students
2. Compare success rates
3. Compare time spent per question
4. Collect student feedback

**Hypothesis**: Students should perform similarly on real vs. generated questions

#### 5.6 Iterative Improvement

**Based on validation results, improve generation**:

**Process**:
1. Analyze failed questions
2. Identify common failure modes
3. Update templates/prompts
4. Regenerate and re-test
5. Repeat until quality targets met

**Script**: `scripts/validation/analyze-failures.mjs`

---

## MILESTONES & METRICS

### Phase 1: Database Setup (Week 1)
- [x] Supabase project created
- [ ] All 7 tables created with relationships
- [ ] Test data inserted and validated
- [ ] Progress tracking initialized

**Success Metric**: All database operations functional, no errors

### Phase 2: Data Extraction (Weeks 2-4)
- [ ] Week 2: English extraction complete (525 questions)
- [ ] Week 3: Reading + Math extraction complete (700 questions)
- [ ] Week 4: Science extraction complete (280 questions)
- [ ] All extractions validated

**Success Metrics**:
- 1,505 questions in database
- 100% of questions have all required fields
- Manual review sample (10%) shows <2% errors

### Phase 3: Pattern Analysis (Weeks 5-7)
- [ ] Week 5: Question classification complete
- [ ] Week 6: Distractor analysis complete
- [ ] Week 7: Pattern templates extracted

**Success Metrics**:
- All 1,505 questions classified by type
- All ~4,500 distractors analyzed (3 per question)
- 100+ pattern templates created
- Statistical analysis complete for all 7 tests

### Phase 4: Generation System (Weeks 8-10)
- [ ] Week 8: Template generator working
- [ ] Week 9: AI-assisted generator working
- [ ] Week 10: Full test generator working

**Success Metrics**:
- Can generate questions for all major question types
- Generated questions pass automated quality checks
- Can generate full 4-section practice test

### Phase 5: Validation (Weeks 11-12)
- [ ] Week 11: Similarity scoring and statistical validation
- [ ] Week 12: Expert review and final improvements

**Success Metrics**:
- Similarity score: 90%+
- Blind test detection rate: <60%
- Statistical validation: All metrics within tolerance
- Expert approval rate: 85%+

---

## TECHNICAL STACK

### Database
- **Supabase** (PostgreSQL)
- **PostgREST** API for database access

### Extraction & Analysis
- **Node.js** (v18+)
- **JavaScript/ESM modules** (.mjs)
- **Cheerio** (if parsing HTML-formatted tests)
- **Natural** (NLP library for language analysis)
- **Compromise** (text processing)

### AI Generation
- **Anthropic Claude API** (claude-sonnet-4)
- **OpenAI API** (GPT-4 as backup)
- **LangChain** (for prompt management, optional)

### Utilities
- **dotenv** (environment variables)
- **@supabase/supabase-js** (Supabase client)
- **zod** (schema validation)
- **chalk** (colored console output)
- **ora** (progress spinners)

### Testing & Validation
- **Jest** (unit testing)
- **Vitest** (alternative)
- **Playwright** (if needed for UI testing)

---

## RISK MITIGATION

### Risk 1: Parsing Errors
**Risk**: Text format inconsistencies cause extraction failures

**Mitigation**:
- Build robust error handling
- Manual review checkpoints
- Incremental extraction (one test at a time)
- Detailed logging of all parsing decisions

### Risk 2: Incomplete Pattern Analysis
**Risk**: Missing subtle patterns leads to inauthentic generation

**Mitigation**:
- Analyze ALL questions, not just samples
- Multiple rounds of pattern extraction
- Cross-validate patterns across tests
- Expert review of pattern library

### Risk 3: AI Generation Quality
**Risk**: AI-generated questions don't match ACT style

**Mitigation**:
- Start with template-based generation (higher reliability)
- Use AI only for complex questions
- Extensive prompt engineering with examples
- Multi-stage validation pipeline
- Human review checkpoint

### Risk 4: Scale/Time
**Risk**: Project takes longer than 6 weeks

**Mitigation**:
- Prioritize high-value question types
- Parallel processing (work on multiple sections simultaneously)
- Automate wherever possible
- Focus on quality over quantity (better to have 500 perfect questions than 1,500 mediocre ones)

### Risk 5: Database Performance
**Risk**: Queries become slow with large dataset

**Mitigation**:
- Proper indexing from start
- Query optimization
- Pagination for large result sets
- Caching frequently accessed data

---

## SUCCESS CRITERIA

### Minimum Viable Product (MVP)
- [ ] All 1,505 questions extracted and in database
- [ ] Question types classified
- [ ] Basic distractor analysis complete
- [ ] Can generate English + Math questions with templates
- [ ] Generated questions pass basic quality checks

### Full Success
- [ ] Complete distractor analysis (all wrong answers explained)
- [ ] 100+ pattern templates
- [ ] Can generate all 4 sections with AI assistance
- [ ] Similarity score 90%+
- [ ] Expert approval rate 85%+
- [ ] Can generate unlimited practice tests on demand

### Stretch Goals
- [ ] Student performance validation
- [ ] Adaptive difficulty system
- [ ] Content-specific generation (e.g., "generate 20 algebra questions")
- [ ] Explanation generator (auto-generate solution explanations)
- [ ] Integration with your existing ACT prep app

---

## NEXT STEPS

1. **Review this plan** - Adjust timeline, scope, or approach as needed
2. **Set up Supabase** - Create project and database
3. **Start Phase 1** - Execute database setup (3-5 days)
4. **Begin extraction** - Start with English section (most structured)
5. **Establish rhythm** - Daily progress tracking and weekly milestones

---

## APPENDIX A: Directory Structure

```
act-prep-react/
├── scripts/
│   ├── database/
│   │   ├── setup-supabase-project.mjs
│   │   ├── create-schema.mjs
│   │   ├── db-utils.mjs
│   │   ├── validators.mjs
│   │   ├── backup-restore.mjs
│   │   └── init-progress-tracking.mjs
│   ├── extraction/
│   │   ├── base-parser.mjs
│   │   ├── extract-english.mjs
│   │   ├── extract-reading.mjs
│   │   ├── extract-math.mjs
│   │   ├── extract-science.mjs
│   │   ├── extract-answer-keys.mjs
│   │   ├── generate-review-report.mjs
│   │   └── validate-extraction.mjs
│   ├── analysis/
│   │   ├── classify-question-types.mjs
│   │   ├── analyze-distractors.mjs
│   │   ├── analyze-difficulty.mjs
│   │   ├── extract-templates.mjs
│   │   ├── calculate-statistics.mjs
│   │   ├── compare-tests.mjs
│   │   └── analyze-language.mjs
│   ├── generation/
│   │   ├── template-generator.mjs
│   │   ├── ai-generator.mjs
│   │   ├── hybrid-generator.mjs
│   │   ├── generate-reading-passage.mjs
│   │   ├── generate-science-passage.mjs
│   │   ├── generate-full-test.mjs
│   │   └── quality-control.mjs
│   └── validation/
│       ├── calculate-similarity.mjs
│       ├── prepare-blind-test.mjs
│       ├── statistical-validation.mjs
│       └── analyze-failures.mjs
├── database/
│   └── schemas/
│       └── act_question_bank_schema.sql
├── docs/
│   ├── ACT_QUESTION_BANK_MASTER_PLAN.md (this file)
│   └── progress-reports/
│       └── (weekly progress updates)
└── data/
    └── practice-tests/
        ├── Practice ACT 1.txt
        ├── Practice ACT 2.txt
        ├── ... (7 tests)
        └── answer-keys/
```

---

## APPENDIX B: Sample Queries

### Get all questions of a specific type
```sql
SELECT * FROM act_questions
WHERE question_type = 'subject_verb_agreement'
ORDER BY difficulty_score ASC;
```

### Get passage with all questions
```sql
SELECT
  p.*,
  json_agg(q.*) as questions
FROM act_passages p
LEFT JOIN act_questions q ON q.passage_id = p.id
WHERE p.id = 'uuid-here'
GROUP BY p.id;
```

### Get distractor analysis for question
```sql
SELECT
  q.question_stem,
  d.choice_letter,
  d.distractor_type,
  d.why_wrong
FROM act_questions q
JOIN act_distractors d ON d.question_id = q.id
WHERE q.id = 'uuid-here';
```

### Get questions by difficulty range
```sql
SELECT * FROM act_questions
WHERE section = 'math'
  AND difficulty_score BETWEEN 0.6 AND 0.8
ORDER BY RANDOM()
LIMIT 10;
```

### Get extraction progress dashboard
```sql
SELECT
  test_number,
  section,
  total_questions,
  extracted_count,
  validated_count,
  ROUND((extracted_count::decimal / total_questions) * 100, 1) as extraction_pct,
  ROUND((validated_count::decimal / total_questions) * 100, 1) as validation_pct,
  extraction_status
FROM extraction_progress
ORDER BY test_number, section;
```

---

**End of Master Plan**

**Last Updated**: 2025-10-22
**Version**: 1.0
**Author**: Claude Code + Caden Chiang
