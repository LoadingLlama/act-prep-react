# Ultimate ACT Test Generation Blueprint - Master Plan

## Goal
Create a molecular-level analysis document that captures EVERY detail needed to generate a 1:1 accurate ACT test.

## Data Sources (All from Supabase with actual fields)

### English Section
- **Tables**: `act_english_questions`, `act_english_passages`
- **Key Fields**:
  - Questions: question_type, question_category, underlined_text, context_before, context_after, difficulty_level, lesson_id
  - Passages: title, introduction, passage_text, passage_number

### Math Section
- **Tables**: `act_math_questions`
- **Key Fields**: question_type, question_category, has_figure, figure_url, figure_data, difficulty_level, lesson_id

### Reading Section
- **Tables**: `act_reading_questions`, `act_reading_passages`
- **Key Fields**:
  - Questions: question_type, question_category, difficulty_level, lesson_id
  - Passages: passage_type, title, author, source, introduction, passage_text

### Science Section
- **Tables**: `act_science_questions`, `act_science_passages`
- **Key Fields**:
  - Questions: question_type, question_category, has_figure, figure_url, difficulty_level, lesson_id
  - Passages: passage_type, title, introduction, passage_text, figures

## Deep Analysis Required

### 1. ENGLISH (525 questions, 35 passages)

#### A. Question Type Analysis (ACTUAL from DB)
- **Usage/Mechanics**: grammar (84), punctuation (34), usage-mechanics (36)
  - Specific: comma-usage (21), verb-tense (11), verb-agreement (5), pronoun (12), etc.
- **Style**: style (74), word-choice (11), redundancy (15), wordiness (2)
- **Organization**: organization (37), sentence-placement (3), logical-placement (7), transitions (10)
- **Rhetorical Skills**: rhetorical-skills (39), main-idea (8), adding-deleting (15), which-choice (18)

#### B. Category Distribution (ACTUAL from DB)
- **CSE** (Conventions of Standard English): 223 questions (~42%)
- **POW** (Production of Writing): 238 questions (~45%)
- **KLA** (Knowledge of Language): 64 questions (~12%)

#### C. Passage Content Patterns
For EACH passage across all 7 tests, analyze:
- Word count, sentence count, paragraph count
- Readability scores (Flesch, Flesch-Kincaid)
- Vocabulary richness (unique words / total words)
- Sentence complexity (avg words per sentence, complex sentences %)
- Punctuation patterns (semicolons, colons, dashes, parentheses)
- Theme/topic (personal narrative, historical, scientific, arts/culture, nature)
- Passage structure (introduction type, body flow, conclusion type)

#### D. Difficulty Progression
- Map difficulty_level across question_number (1-75)
- Show how difficulty builds within each passage (Q1-15, Q16-30, etc.)
- Identify patterns in placement of hard questions

#### E. Lesson Integration
- Map each question_type to lesson_id
- Show which lessons cover which grammatical concepts
- Create lesson distribution requirements

### 2. MATH (420 questions)

#### A. Question Type Analysis (ACTUAL from DB)
- **Algebra**: algebra (82), linear_equations (4), quadratics (1), inequalities (2), expressions (2)
- **Geometry**: geometry (79), plane_geometry (11), solid_geometry (1), coordinate_geometry (11)
- **Trigonometry**: trigonometry (20)
- **Functions**: functions (12)
- **Statistics/Probability**: probability (11), statistics (12), statistics-probability (16)
- **Arithmetic/PreAlgebra**: prealgebra (23), arithmetic (19), percentages (2), fractions (2)
- **Advanced**: complex-numbers (1+3), matrices (3), vectors (2), logarithms (3)

#### B. Category Distribution (ACTUAL from DB)
- **ALG** (Algebra): 125 questions (~30%)
- **GEO** (Geometry): 55 questions (~13%)
- **PHM-A** (Preparing for Higher Math - Algebra): 55
- **PHM-G** (Preparing for Higher Math - Geometry): 46
- **PHM-N** (Preparing for Higher Math - Number): 31
- **PHM-S** (Preparing for Higher Math - Statistics): 20
- **PHM-F** (Preparing for Higher Math - Functions): 14

#### C. Difficulty Progression Patterns
- Q1-20: Easy arithmetic, basic algebra, simple geometry
- Q21-40: Intermediate algebra, coordinate geometry, basic trig
- Q41-60: Advanced algebra, complex geometry, advanced trig, functions

#### D. Figure Usage
- has_figure: TRUE/FALSE distribution
- Types of figures (graphs, diagrams, geometric shapes)
- When figures appear vs. pure algebraic questions

#### E. Question Complexity Metrics
- Word count in question_stem
- Number of steps required (inferred from solution complexity)
- Presence of variables, equations, calculations

### 3. READING (280 questions, 28 passages)

#### A. Question Type Analysis (ACTUAL from DB)
- **Main Idea**: main-idea (52), main_idea (2)
- **Detail**: detail (33)
- **Inference**: inference (25)
- **Reading Comprehension**: reading-comprehension (40), reading (40)
- **Structure/Purpose**: structure (9), purpose (8)
- **Vocabulary**: vocabulary (7), vocab (2)
- **Literary Elements**: characterization (1), tone (5), perspective (1)
- **By Passage Type**: literary-narrative (20), social-science (10), natural-science (10)

#### B. Category Distribution (ACTUAL from DB)
- **KEY** (Key Ideas and Details): 120 questions (~43%)
- **KID** (Key Ideas and Details): 95 questions (~34%)
- **CS** (Craft and Structure): 43 questions (~15%)
- **IKI** (Integration of Knowledge and Ideas): 22 questions (~8%)

#### C. Passage Content Breakdown
For EACH of 28 passages:
- **Genre**: Literary Fiction, Social Science, Humanities, Natural Science
- **Specific topic/theme**
- **Word count** (target: 700-900 words)
- **Passage structure**: intro, body paragraphs, conclusion
- **Readability level** (Flesch score, grade level)
- **Narrative elements**: POV (1st/3rd person), tense, dialogue presence
- **Author, source, title** (if provided)
- **Introduction text** (contextual setup)

#### D. Question Distribution per Passage
- Always 10 questions per passage
- Mix of question types within each passage
- Placement of easier vs. harder questions

### 4. SCIENCE (280 questions, 42 passages)

#### A. Question Type Analysis (ACTUAL from DB)
- **Data Interpretation**: data-interpretation (85), data-analysis (26)
- **Research Summaries**: research-summaries (21)
- **Conflicting Viewpoints**: conflicting-viewpoints (10)
- **Specific Skills**: trends (21), evaluation (8), comparison (3), application (3)
- **Content Areas**: biological-processes (15), chemical-properties (10), earth-processes (10), physics-mechanics (5)

#### B. Category Distribution (ACTUAL from DB)
- **IOD** (Interpretation of Data): 165 questions (~59%)
- **SIN** (Scientific Investigation): 84 questions (~30%)
- **EMI** (Evaluation of Models, Inferences): 24 questions (~9%)
- **EVA** (Evaluation): 4 questions
- **INT** (Integration): 2 questions

#### C. Passage Type Breakdown
- **Data Representation**: ~3 per test, 5 questions each
  - Single experiment or data set
  - 2-3 figures (graphs, tables, charts)
- **Research Summaries**: ~2 per test, 6-7 questions each
  - 2-3 related experiments
  - Multiple figures showing results
- **Conflicting Viewpoints**: ~1 per test, 11-13 questions
  - 2-3 scientist perspectives
  - Each viewpoint 150-200 words

#### D. Figure Analysis
- has_figure distribution
- Types: line graphs, bar graphs, tables, diagrams, scatter plots
- Complexity: single variable vs. multiple variables
- Labels, units, legends

## Output Structure

### Tabbed Interface with 8 Tabs:
1. **Overview** - High-level stats and test structure
2. **English Content** - Deep passage analysis, question type formulas
3. **English Structure** - Difficulty progression, lesson mapping
4. **Math Content** - Topic distribution, concept patterns
5. **Math Structure** - Difficulty progression, figure usage
6. **Reading Content** - Passage breakdowns, themes, authors
7. **Reading Structure** - Question type distribution, difficulty
8. **Science Content** - Passage type analysis, figure patterns
9. **Science Structure** - Question distribution, experimental design patterns
10. **Generation Guide** - Step-by-step replication instructions

### For Each Tab, Include:
- **Exact Counts**: Use real data from database
- **Distributions**: Percentages and ratios
- **Patterns**: How things change across question numbers
- **Examples**: Show actual data from specific tests
- **Replication Instructions**: How to create similar content
- **Quality Metrics**: What makes content authentic

## Key Metrics to Calculate

### Linguistic Analysis (for all passages):
- Flesch Reading Ease score
- Flesch-Kincaid Grade Level
- Average words per sentence
- Average syllables per word
- Vocabulary richness (type-token ratio)
- Long word percentage (7+ characters)
- Complex punctuation count

### Difficulty Analysis:
- Difficulty distribution by question number range
- Difficulty by question type
- Difficulty by category
- Correlation between difficulty and lesson complexity

### Content Balance:
- Topic/theme distribution
- Genre distribution
- Scientific domain distribution
- Question type balance within passages

## Success Criteria

The blueprint must enable someone to:
1. Generate a passage that matches ACT linguistic complexity
2. Create questions that match ACT question type distributions
3. Balance difficulty across 75/60/40/40 questions
4. Map questions to appropriate lessons
5. Use authentic content themes and structures
6. Match figure complexity and presentation
7. Replicate experimental design patterns
8. Create viewpoints that match ACT style

## Implementation Notes

- Use ONLY actual database values (no guessing)
- Calculate ALL metrics from real data
- Show test-by-test variations
- Include visual indicators (badges, colors) for quick scanning
- Make actionable: each section should have "How to Replicate" guidance
- Cross-reference: show how categories map to question types map to lessons
