# PHASE 3: PATTERN ANALYSIS
**Duration**: 2-3 weeks | **Deliverable**: Complete pattern library & distractor taxonomy

**📖 Navigation**: [← Phase 2](./03-PHASE-2-EXTRACTION.md) | [Index](./00-MASTER-INDEX.md) | [Next: Phase 4 Generation →](./05-PHASE-4-GENERATION.md)

---

## OVERVIEW

This is where we extract the **DNA** of ACT questions. Phase 3 is CRITICAL for generation quality.

**Goals**:
1. Classify all 1,680 questions by type
2. Analyze ALL ~6,000 wrong answers (distractors)
3. Extract reusable patterns/templates
4. Calculate difficulty scores
5. Build statistical models

**Why This Matters**: Understanding WHY wrong answers exist is what enables us to generate authentic ACT-quality questions.

---

## TASK 3.1: QUESTION TYPE CLASSIFICATION

**Duration**: 3-5 days

### English Question Types (40-50 types)

#### Grammar & Mechanics (25-30 types)

**Punctuation**:
- `punctuation_commas_list` - Commas in lists
- `punctuation_commas_clauses` - Commas with independent/dependent clauses
- `punctuation_commas_intro` - Commas after introductory phrases
- `punctuation_commas_unnecessary` - Removing unnecessary commas
- `punctuation_semicolons` - Semicolon usage (independent clauses)
- `punctuation_colons` - Colon usage (lists, explanations)
- `punctuation_dashes` - Dash usage (interruption, emphasis)
- `punctuation_apostrophes_possessive` - Possessive apostrophes
- `punctuation_apostrophes_contraction` - Contraction apostrophes

**Subject-Verb Agreement**:
- `subject_verb_simple` - Basic singular/plural agreement
- `subject_verb_intervening` - Agreement with intervening phrases
- `subject_verb_compound` - Compound subjects
- `subject_verb_collective` - Collective nouns

**Verb Tense**:
- `verb_tense_simple` - Present/past/future
- `verb_tense_perfect` - Perfect tenses
- `verb_tense_consistency` - Maintaining consistency
- `verb_tense_sequence` - Sequence of tenses

**Pronouns**:
- `pronoun_antecedent` - Pronoun-antecedent agreement
- `pronoun_case` - Subject/object case
- `pronoun_relative` - Who/whom/which/that
- `pronoun_ambiguous` - Ambiguous reference

**Modifiers**:
- `modifier_misplaced` - Misplaced modifiers
- `modifier_dangling` - Dangling modifiers
- `modifier_placement` - Modifier placement for clarity

**Parallelism**:
- `parallelism_lists` - Parallel structure in lists
- `parallelism_comparisons` - Parallel comparisons
- `parallelism_correlative` - Correlative conjunctions

#### Rhetorical Skills (15-20 types)

**Strategy**:
- `strategy_add_delete` - Add/delete sentence decisions
- `strategy_purpose` - Purpose/effect questions
- `strategy_audience` - Audience awareness
- `strategy_supporting_detail` - Best supporting detail

**Organization**:
- `organization_sentence_placement` - Sentence placement
- `organization_paragraph_order` - Paragraph order
- `organization_transitions` - Transition words/phrases
- `organization_logical_sequence` - Logical flow

**Style**:
- `style_word_choice` - Precision in word choice
- `style_conciseness` - Removing wordiness
- `style_redundancy` - Eliminating redundancy
- `style_tone` - Maintaining appropriate tone
- `style_register` - Formal vs. informal language

### Math Question Types (30-40 types)

**Pre-Algebra** (14 types):
- `prealgebra_operations` - Basic operations
- `prealgebra_fractions` - Fraction operations
- `prealgebra_decimals` - Decimal operations
- `prealgebra_percentages` - Percent calculations
- `prealgebra_ratios` - Ratios and proportions
- `prealgebra_averages` - Mean, median, mode
- `prealgebra_factors` - Factors and multiples
- `prealgebra_sequences` - Number patterns

**Elementary Algebra** (10 types):
- `algebra_elem_solve_linear` - Solve linear equations
- `algebra_elem_inequalities` - Linear inequalities
- `algebra_elem_substitution` - Substitution
- `algebra_elem_word_problems` - Word problems
- `algebra_elem_exponents` - Exponent rules

**Intermediate Algebra** (9 types):
- `algebra_int_quadratics` - Quadratic equations
- `algebra_int_systems` - Systems of equations
- `algebra_int_functions` - Function notation
- `algebra_int_exponential` - Exponential growth/decay
- `algebra_int_radical` - Radical expressions

**Coordinate Geometry** (9 types):
- `coord_geom_slope` - Slope calculations
- `coord_geom_distance` - Distance formula
- `coord_geom_midpoint` - Midpoint formula
- `coord_geom_parallel_perpendicular` - Parallel/perpendicular lines
- `coord_geom_equations` - Equation of a line
- `coord_geom_circles` - Circle equations

**Plane Geometry** (14 types):
- `plane_geom_angles` - Angle measures
- `plane_geom_triangles` - Triangle properties
- `plane_geom_pythagorean` - Pythagorean theorem
- `plane_geom_area_perimeter` - Area and perimeter
- `plane_geom_volume` - Volume calculations
- `plane_geom_circles` - Circle properties
- `plane_geom_similarity` - Similar figures

**Trigonometry** (4 types):
- `trig_ratios` - Sine, cosine, tangent
- `trig_identities` - Trig identities
- `trig_graphing` - Trig function graphs

### Reading Question Types (15-20 types)

**Main Idea & Purpose**:
- `reading_main_idea` - Main idea/central claim
- `reading_author_purpose` - Author's purpose
- `reading_passage_structure` - Passage organization

**Detail Questions**:
- `reading_detail_explicit` - Direct detail questions
- `reading_detail_implicit` - Inference from details
- `reading_sequence` - Chronological order

**Inference Questions**:
- `reading_inference_character` - Character motivations/traits
- `reading_inference_cause_effect` - Cause and effect
- `reading_inference_comparison` - Comparing elements

**Vocabulary**:
- `reading_vocab_context` - Vocabulary in context
- `reading_vocab_meaning` - Word/phrase meaning

**Function Questions**:
- `reading_function_detail` - Why author includes detail
- `reading_function_paragraph` - Purpose of paragraph

**Comparative Questions**:
- `reading_comparative_passages` - Comparing passages
- `reading_comparative_viewpoints` - Comparing viewpoints

### Science Question Types (20-25 types)

**Data Representation** (7-9 types):
- `science_direct_lookup` - Direct data from graph/table
- `science_trend_identification` - Identify trends
- `science_interpolation` - Estimate between data points
- `science_extrapolation` - Extend beyond data range
- `science_compare_data` - Compare data sets
- `science_unit_conversion` - Convert units from data

**Research Summaries** (6-8 types):
- `science_experimental_design` - Experimental setup
- `science_hypothesis` - Hypothesis identification
- `science_variables` - Independent/dependent variables
- `science_control_group` - Control vs. experimental
- `science_methodology` - Experimental procedures

**Conflicting Viewpoints** (4-6 types):
- `science_viewpoint_comparison` - Compare viewpoints
- `science_viewpoint_support` - Evidence for viewpoint
- `science_viewpoint_weakness` - Weaknesses in argument
- `science_viewpoint_synthesis` - Synthesize viewpoints

**Cross-Cutting** (3-4 types):
- `science_calculation` - Mathematical calculations
- `science_cannot_determine` - Cannot be determined from data
- `science_multiple_figures` - Cross-reference multiple figures

### Classification Script

```javascript
// scripts/analysis/classify-question-types.mjs
import { supabase } from '../database/db-utils.mjs';

const classificationRules = {
  english: {
    // Check for comma-related questions
    commas: (q) => {
      const hasComma = [q.choice_a, q.choice_b, q.choice_c, q.choice_d]
        .some(choice => choice.includes(',') || choice === 'NO CHANGE' && q.underlined_portion?.includes(','));
      const stemMentionsComma = q.question_stem.toLowerCase().includes('comma');
      return hasComma || stemMentionsComma ? 'punctuation_commas' : null;
    },

    // Check for subject-verb agreement
    subjectVerb: (q) => {
      const verbForms = ['is/are', 'was/were', 'has/have', 'do/does'];
      const hasVerbChoice = [q.choice_a, q.choice_b, q.choice_c, q.choice_d]
        .some(choice => verbForms.some(v => choice.includes(v)));
      return hasVerbChoice ? 'subject_verb_agreement' : null;
    },

    // Check for word choice/style
    wordChoice: (q) => {
      const isWhichChoice = q.question_stem.includes('Which choice');
      const mentionsWord = q.question_stem.toLowerCase().includes('word') ||
                           q.question_stem.toLowerCase().includes('phrase');
      return isWhichChoice && mentionsWord ? 'style_word_choice' : null;
    }

    // ... more rules
  },

  math: {
    // Check for geometry questions
    geometry: (q) => {
      const geoKeywords = ['triangle', 'circle', 'angle', 'perimeter', 'area', 'volume'];
      const hasGeoKeyword = geoKeywords.some(kw =>
        q.question_stem.toLowerCase().includes(kw)
      );
      const hasDiagram = q.diagram_url !== null;
      return hasGeoKeyword || hasDiagram ? 'plane_geometry' : null;
    },

    // Check for algebra
    algebra: (q) => {
      const hasVariable = /[xy]/i.test(q.question_stem);
      const hasEquation = /=/.test(q.question_stem);
      return hasVariable && hasEquation ? 'algebra_solve' : null;
    }

    // ... more rules
  }
};

// Main classification function
export async function classifyAllQuestions() {
  const { data: questions } = await supabase
    .from('act_questions')
    .select('*')
    .order('test_number', { ascending: true })
    .order('question_number', { ascending: true });

  console.log(`Classifying ${questions.length} questions...`);

  for (const question of questions) {
    const questionType = classifyQuestion(question);

    await supabase
      .from('act_questions')
      .update({ question_type: questionType })
      .eq('id', question.id);

    console.log(`Q${question.test_number}-${question.question_number}: ${questionType}`);
  }

  console.log('✅ Classification complete');
}

function classifyQuestion(question) {
  const rules = classificationRules[question.section];

  for (const [name, rule] of Object.entries(rules)) {
    const result = rule(question);
    if (result) return result;
  }

  return 'uncategorized'; // Manual review needed
}
```

---

## TASK 3.2: DISTRACTOR ANALYSIS

**Duration**: 5-7 days
**🔴 MOST IMPORTANT TASK**: This is what enables authentic generation!

### The Distractor Taxonomy

For each wrong answer, we need to understand:
1. **Type**: What kind of error does this represent?
2. **Why Wrong**: Detailed explanation
3. **Misconception**: What student mistake leads here?
4. **Pattern**: How to generate similar distractors?

### English Distractor Types (20+ types)

```javascript
const englishDistractorTypes = {
  // Punctuation errors
  'punctuation_error': 'Wrong punctuation mark used',
  'punctuation_missing': 'Required punctuation omitted',
  'punctuation_unnecessary': 'Punctuation where none needed',

  // Grammar errors
  'verb_tense_mismatch': 'Incorrect verb tense',
  'verb_number_mismatch': 'Verb doesn't agree with subject',
  'pronoun_case_error': 'Wrong pronoun case (subject/object)',
  'pronoun_agreement_error': 'Pronoun doesn't agree with antecedent',

  // Style issues
  'wordiness': 'Unnecessarily verbose',
  'redundancy': 'Repeats information',
  'informal_register': 'Too casual for context',
  'imprecise_word': 'Word doesn't precisely convey meaning',
  'meaning_change': 'Alters intended meaning',

  // Sentence structure
  'fragment': 'Creates sentence fragment',
  'run_on': 'Creates run-on sentence',
  'comma_splice': 'Comma splice error',
  'misplaced_modifier': 'Modifier in wrong position',

  // Rhetorical
  'off_topic': 'Not relevant to passage purpose',
  'contradicts_passage': 'Contradicts information in passage',
  'wrong_tone': 'Inappropriate tone for context'
};
```

### Math Distractor Types (15+ types)

```javascript
const mathDistractorTypes = {
  'calculation_error': 'Common arithmetic mistake',
  'wrong_formula': 'Applied incorrect formula',
  'sign_error': 'Wrong positive/negative',
  'unit_confusion': 'Wrong units or unit conversion',
  'partial_answer': 'Intermediate step, not final answer',
  'reversal': 'Reciprocal or inverse of correct answer',
  'off_by_one': 'Answer is n±1 of correct value',
  'wrong_operation': 'Used + instead of ×, etc.',
  'decimal_error': 'Decimal point misplaced',
  'order_of_operations': 'Didn't follow order of operations',
  'exponent_error': 'Misapplied exponent rules',
  'radical_error': 'Mishandled radicals/roots',
  'fraction_error': 'Fraction operation error',
  'coordinate_confusion': 'Mixed up x and y coordinates',
  'angle_confusion': 'Mixed up angle measures'
};
```

### Reading Distractor Types (10+ types)

```javascript
const readingDistractorTypes = {
  'too_extreme': 'Overly strong/absolute language',
  'out_of_scope': 'Not supported by passage',
  'reversal': 'Opposite of what passage says',
  'too_narrow': 'Focuses on detail, not main idea',
  'too_broad': 'Too general for specific question',
  'wrong_paragraph': 'Information from different part of passage',
  'inference_too_far': 'Over-inference not supported',
  'wrong_tone': 'Mischaracterizes author's tone',
  'literal_interpretation': 'Takes figurative language literally',
  'chronology_error': 'Wrong time sequence'
};
```

### Science Distractor Types (12+ types)

```javascript
const scienceDistractorTypes = {
  'wrong_figure': 'Data from different graph/table',
  'wrong_axis': 'Read wrong axis on graph',
  'extrapolation_error': 'Extends beyond data range inappropriately',
  'interpolation_error': 'Estimates between points incorrectly',
  'trend_reversal': 'Opposite of actual trend',
  'calculation_error': 'Math mistake in calculation',
  'unit_error': 'Wrong units',
  'control_confusion': 'Confused control and experimental groups',
  'variable_confusion': 'Mixed up independent/dependent variables',
  'cannot_determine': 'Claims answer when data insufficient',
  'hypothesis_confusion': 'Wrong hypothesis attribution',
  'viewpoint_reversal': 'Attributes idea to wrong scientist/viewpoint'
};
```

### Distractor Analysis Script

```javascript
// scripts/analysis/analyze-distractors.mjs
import { supabase } from '../database/db-utils.mjs';
import Anthropic from '@anthropic-ai/sdk';

const anthropic = new Anthropic({ apiKey: process.env.ANTHROPIC_API_KEY });

export async function analyzeDistractors(questionId) {
  // Get question
  const { data: question } = await supabase
    .from('act_questions')
    .select('*')
    .eq('id', questionId)
    .single();

  // Get wrong answer choices
  const choices = ['A', 'B', 'C', 'D', 'E'];
  const wrongChoices = choices.filter(c => c !== question.correct_answer);

  for (const choiceLetter of wrongChoices) {
    if (!question[`choice_${choiceLetter.toLowerCase()}`]) continue;

    const analysis = await analyzeDistractor(question, choiceLetter);

    // Insert distractor analysis
    await supabase
      .from('act_distractors')
      .insert({
        question_id: question.id,
        choice_letter: choiceLetter,
        choice_text: question[`choice_${choiceLetter.toLowerCase()}`],
        distractor_type: analysis.type,
        why_wrong: analysis.whyWrong,
        common_misconception: analysis.misconception,
        pattern_tags: analysis.tags
      });

    console.log(`✅ Analyzed distractor ${choiceLetter} for Q${question.question_number}`);
  }
}

async function analyzeDistractor(question, choiceLetter) {
  const prompt = `Analyze why this ACT answer choice is WRONG.

Section: ${question.section}
Question: ${question.question_stem}
Correct Answer: ${question.correct_answer}) ${question[`choice_${question.correct_answer.toLowerCase()}`]}
Wrong Answer: ${choiceLetter}) ${question[`choice_${choiceLetter.toLowerCase()}`]}

Provide:
1. **Distractor Type**: (e.g., calculation_error, too_extreme, verb_tense_mismatch)
2. **Why Wrong**: Clear explanation (2-3 sentences)
3. **Student Misconception**: What mistake leads a student to choose this? (1 sentence)
4. **Pattern Tags**: List of 2-4 tags for categorization

Format as JSON:
{
  "type": "...",
  "whyWrong": "...",
  "misconception": "...",
  "tags": ["tag1", "tag2", "tag3"]
}`;

  const message = await anthropic.messages.create({
    model: 'claude-3-5-sonnet-20241022',
    max_tokens: 800,
    messages: [{ role: 'user', content: prompt }]
  });

  return JSON.parse(message.content[0].text);
}

// Batch analyze all questions
export async function analyzeAllDistractors() {
  const { data: questions } = await supabase
    .from('act_questions')
    .select('id, question_number, test_number')
    .order('test_number', { ascending: true })
    .order('question_number', { ascending: true });

  console.log(`Analyzing distractors for ${questions.length} questions...`);
  console.log(`Estimated time: ${Math.ceil(questions.length * 3 / 60)} hours`);

  for (const q of questions) {
    await analyzeDistractors(q.id);

    // Rate limit: 1 question per 3 seconds (3 distractors × 1 sec)
    await new Promise(resolve => setTimeout(resolve, 3000));
  }

  console.log('✅ All distractors analyzed!');
}
```

### Distractor Analysis Checklist
- [ ] Classify all wrong answers by type
- [ ] Explain why each is wrong
- [ ] Identify student misconceptions
- [ ] Tag for pattern generation
- [ ] Review sample for accuracy

**Time**: 5-7 days
**Cost**: ~$50-100 (API fees)

---

## TASK 3.3: DIFFICULTY ANALYSIS

**Duration**: 2-3 days

### Difficulty Factors by Section

#### English
1. **Complexity of error** - Subtle vs. obvious
2. **Context required** - Sentence vs. paragraph vs. passage
3. **Number of rules** - Testing 1 rule vs. multiple simultaneously
4. **Distractor similarity** - How close wrong answers are to right answer

#### Math
1. **Number of steps** - 1-step vs. multi-step
2. **Concepts combined** - Pure geometry vs. geometry + algebra
3. **Abstraction level** - Concrete numbers vs. variables
4. **Computational complexity** - Simple arithmetic vs. complex calculations

#### Reading
1. **Inference depth** - Explicit vs. implicit
2. **Text amount** - Sentence vs. paragraph vs. full passage
3. **Answer similarity** - How similar answer choices are
4. **Vocabulary difficulty** - Common vs. advanced words

#### Science
1. **Figure complexity** - Single graph vs. multiple tables
2. **Data manipulation** - Direct lookup vs. calculation vs. extrapolation
3. **Scientific reasoning** - Recall vs. application vs. synthesis
4. **Cross-referencing** - Single figure vs. multiple figures

### Difficulty Scoring Algorithm

```javascript
// scripts/analysis/analyze-difficulty.mjs
function calculateDifficultyScore(question) {
  let score = 0.0;

  // Factor 1: Position in test (30% weight)
  // ACT tests get progressively harder
  const maxQuestions = {
    english: 75,
    math: 60,
    reading: 40,
    science: 40
  };

  const positionScore = question.question_number / maxQuestions[question.section];
  score += positionScore * 0.3;

  // Factor 2: Complexity metrics (40% weight)
  const complexityScore = calculateComplexityMetrics(question);
  score += complexityScore * 0.4;

  // Factor 3: Historical success rate if available (30% weight)
  if (question.success_rate !== null) {
    const difficultyFromPerformance = 1 - (question.success_rate / 100);
    score += difficultyFromPerformance * 0.3;
  } else {
    // If no performance data, weight position more heavily
    score += positionScore * 0.3;
  }

  return Math.min(1.0, Math.max(0.0, score));
}

function calculateComplexityMetrics(question) {
  switch (question.section) {
    case 'english':
      return calculateEnglishComplexity(question);
    case 'math':
      return calculateMathComplexity(question);
    case 'reading':
      return calculateReadingComplexity(question);
    case 'science':
      return calculateScienceComplexity(question);
  }
}

function calculateEnglishComplexity(question) {
  let complexity = 0.0;

  // Context length
  const contextLength = (question.context_before?.length || 0) +
                       (question.context_after?.length || 0);
  if (contextLength > 200) complexity += 0.3;
  else if (contextLength > 100) complexity += 0.2;
  else complexity += 0.1;

  // Rhetorical vs. grammar
  if (question.question_type?.startsWith('strategy_') ||
      question.question_type?.startsWith('organization_')) {
    complexity += 0.3; // Rhetorical skills harder
  } else {
    complexity += 0.1;
  }

  // Number of similar answer choices
  const choices = [question.choice_a, question.choice_b, question.choice_c, question.choice_d];
  const avgLength = choices.reduce((sum, c) => sum + c.length, 0) / 4;
  if (avgLength > 50) complexity += 0.3; // Longer choices = more complex

  return Math.min(1.0, complexity);
}

function calculateMathComplexity(question) {
  let complexity = 0.0;

  // Has diagram
  if (question.diagram_url) complexity += 0.2;

  // Formula required
  if (question.formulas_required && question.formulas_required.length > 0) {
    complexity += question.formulas_required.length * 0.15;
  }

  // Multi-step (check solution_steps)
  if (question.solution_steps && question.solution_steps.length > 3) {
    complexity += 0.4;
  } else if (question.solution_steps && question.solution_steps.length > 1) {
    complexity += 0.2;
  }

  // Calculator needed
  if (question.requires_calculator) complexity += 0.1;

  return Math.min(1.0, complexity);
}

function calculateReadingComplexity(question) {
  let complexity = 0.0;

  // Question type
  const inferenceTypes = ['reading_inference_character', 'reading_inference_cause_effect'];
  if (inferenceTypes.includes(question.question_type)) {
    complexity += 0.4; // Inference harder than detail
  }

  // Answer choice length (longer = more similar = harder)
  const choices = [question.choice_a, question.choice_b, question.choice_c, question.choice_d];
  const avgLength = choices.reduce((sum, c) => sum + c.length, 0) / 4;
  if (avgLength > 60) complexity += 0.3;
  else if (avgLength > 30) complexity += 0.2;

  // Passage complexity (if available)
  // Would need passage reading level here

  return Math.min(1.0, complexity);
}

function calculateScienceComplexity(question) {
  let complexity = 0.0;

  // Figure-based vs. text-based
  if (question.figure_reference) {
    complexity += 0.2;

    // Multiple figures harder
    if (question.figure_reference.includes('and') || question.figure_reference.includes(',')) {
      complexity += 0.3;
    }
  }

  // Data interpretation type
  const complexTypes = ['extrapolation', 'synthesis', 'comparison'];
  if (complexTypes.some(type => question.data_interpretation_type?.includes(type))) {
    complexity += 0.3;
  }

  // Conflicting viewpoints passage (hardest)
  // Would need passage type here

  return Math.min(1.0, complexity);
}

// Assign difficulty levels
function assignDifficultyLevel(score) {
  if (score < 0.33) return 'easy';
  if (score < 0.67) return 'medium';
  return 'hard';
}

// Main function
export async function analyzeAllDifficulty() {
  const { data: questions } = await supabase
    .from('act_questions')
    .select('*');

  for (const question of questions) {
    const score = calculateDifficultyScore(question);
    const level = assignDifficultyLevel(score);

    await supabase
      .from('act_questions')
      .update({
        difficulty_score: score,
        difficulty_level: level
      })
      .eq('id', question.id);

    console.log(`Q${question.test_number}-${question.question_number}: ${level} (${score.toFixed(2)})`);
  }

  console.log('✅ Difficulty analysis complete');
}
```

---

## TASK 3.4: PATTERN TEMPLATE EXTRACTION

**Duration**: 4-6 days

### Template Structure

Each pattern template includes:
1. **Pattern name** - Descriptive identifier
2. **Question type** - From classification
3. **Stem template** - Question with placeholders
4. **Variable examples** - Sample values for placeholders
5. **Correct answer formula** - How to generate right answer
6. **Distractor rules** - How to generate wrong answers

### Example Templates

#### English: Subject-Verb Agreement Template

```javascript
{
  pattern_name: "Subject-Verb Agreement with Intervening Phrase",
  section: "english",
  question_type: "subject_verb_agreement_intervening",

  stem_template: "{subject}, {intervening_phrase}, {verb_choice} {rest_of_sentence}",

  example_variables: {
    subject: [
      "The collection of ancient artifacts",
      "The student who studied for hours",
      "The box of chocolates"
    ],
    intervening_phrase: [
      "along with several documents",
      "as well as her classmates",
      "in addition to the candies"
    ],
    verb_choice: ["was/were", "is/are", "has/have"],
    rest_of_sentence: [
      "discovered in the attic",
      "ready for the exam",
      "sitting on the table"
    ]
  },

  correct_answer_formula: "Verb must agree with main subject (singular collection/student/box), ignore intervening phrase",

  distractor_rules: {
    type_1: {
      description: "Verb agrees with intervening phrase instead of subject",
      example: "The collection... were discovered" (agrees with 'artifacts' not 'collection')
    },
    type_2: {
      description: "Wrong tense but correct number",
      example: "The collection... will be discovered" (future instead of past)
    },
    type_3: {
      description: "Completely wrong form",
      example: "The collection... been discovered" (incomplete verb)
    }
  },

  difficulty_range: "easy-medium",
  frequency_in_tests: 0.85, // Appears in 85% of tests
  example_question_ids: ["uuid1", "uuid2", "uuid3"]
}
```

#### Math: Linear Equation Template

```javascript
{
  pattern_name: "Solve Linear Equation for Variable",
  section: "math",
  question_type: "algebra_elem_solve_linear",

  stem_template: "If {coefficient_a}x + {constant_b} = {constant_c}, what is the value of x?",

  example_variables: {
    coefficient_a: [2, 3, 4, 5, -2, -3],
    constant_b: [5, 7, -3, 10, -8],
    constant_c: [15, 20, 13, 25, 4]
  },

  correct_answer_formula: "x = (c - b) / a",

  distractor_rules: {
    type_1: {
      description: "Student forgets to divide by coefficient",
      formula: "(c - b)", // Missing division by a
      commonness: "high"
    },
    type_2: {
      description: "Student forgets to subtract constant_b",
      formula: "c / a", // Missing subtraction of b
      commonness: "medium"
    },
    type_3: {
      description: "Sign error",
      formula: "(c + b) / a", // Added instead of subtracted
      commonness: "high"
    },
    type_4: {
      description: "Completely wrong operation",
      formula: "c * a - b",
      commonness: "low"
    }
  },

  difficulty_range: "easy",
  frequency_in_tests: 1.0, // Appears in every test
  example_question_ids: ["uuid1", "uuid2", "uuid3", "uuid4", "uuid5"]
}
```

### Template Extraction Script

```javascript
// scripts/analysis/extract-templates.mjs
import { supabase } from '../database/db-utils.mjs';

export async function extractTemplates(questionType, section) {
  // Get all questions of this type
  const { data: questions } = await supabase
    .from('act_questions')
    .select('*')
    .eq('section', section)
    .eq('question_type', questionType);

  if (questions.length < 3) {
    console.log(`⚠️ Only ${questions.length} questions of type ${questionType}, skipping template`);
    return null;
  }

  // Analyze structural similarities
  const template = analyzeQuestionStructure(questions);

  // Extract variable elements
  const variables = extractVariables(questions);

  // Analyze distractors to create generation rules
  const { data: distractors } = await supabase
    .from('act_distractors')
    .select('*')
    .in('question_id', questions.map(q => q.id));

  const distractorRules = analyzeDistractorPatterns(distractors);

  // Create template object
  const patternTemplate = {
    pattern_name: generatePatternName(questionType),
    section,
    question_type: questionType,
    stem_template: template,
    example_variables: variables,
    correct_answer_formula: extractCorrectAnswerPattern(questions),
    distractor_rules: distractorRules,
    difficulty_range: calculateDifficultyRange(questions),
    frequency_in_tests: questions.length / 7, // How many tests have this type
    example_question_ids: questions.slice(0, 5).map(q => q.id)
  };

  // Insert into database
  const { data, error } = await supabase
    .from('act_question_patterns')
    .insert(patternTemplate)
    .select()
    .single();

  if (error) {
    console.error(`Error saving template for ${questionType}:`, error);
  } else {
    console.log(`✅ Created template: ${patternTemplate.pattern_name}`);
  }

  return data;
}

// Extract all templates for a section
export async function extractAllTemplates(section) {
  // Get unique question types
  const { data: types } = await supabase
    .from('act_questions')
    .select('question_type')
    .eq('section', section)
    .not('question_type', 'is', null);

  const uniqueTypes = [...new Set(types.map(t => t.question_type))];

  console.log(`Extracting templates for ${uniqueTypes.length} question types in ${section}...`);

  for (const type of uniqueTypes) {
    await extractTemplates(type, section);
  }

  console.log(`✅ Template extraction complete for ${section}`);
}
```

---

## TASK 3.5: STATISTICAL ANALYSIS

**Duration**: 2-3 days

### Statistics to Calculate

#### Per-Test Statistics
```javascript
{
  test_number: 1,
  total_questions: 215,
  average_difficulty: 0.52,

  difficulty_distribution: {
    easy: 72,    // 33.5%
    medium: 95,  // 44.2%
    hard: 48     // 22.3%
  },

  english_stats: {
    question_type_distribution: {
      punctuation_commas: 15,
      subject_verb_agreement: 4,
      verb_tense: 6,
      transitions: 8,
      word_choice: 10,
      // ... all types
    },

    passage_topics: ["marine_biology", "history", "art", "engineering", "music"],

    avg_passage_word_count: 450,

    rhetorical_vs_grammar: {
      grammar: 45,  // 60%
      rhetorical: 30  // 40%
    }
  },

  math_stats: {
    content_area_distribution: {
      pre_algebra: 14,
      elementary_algebra: 10,
      intermediate_algebra: 9,
      coordinate_geometry: 9,
      plane_geometry: 14,
      trigonometry: 4
    },

    calculator_required: 42,  // 70% of questions
    multi_step_problems: 23,  // 38% of questions

    difficulty_progression: [0.3, 0.4, 0.5, 0.6, 0.7],  // Gets harder

    formula_frequency: {
      pythagorean_theorem: 3,
      quadratic_formula: 2,
      slope_formula: 4,
      // ... all formulas
    }
  },

  reading_stats: {
    passage_types: {
      prose_fiction: 1,
      social_science: 1,
      humanities: 1,
      natural_science: 1
    },

    question_type_distribution: {
      main_idea: 4,
      detail: 12,
      inference: 16,
      vocabulary: 4,
      function: 4
    },

    avg_passage_length: 850,
    avg_reading_level: 11.2  // Grade level
  },

  science_stats: {
    passage_types: {
      data_representation: 3,
      research_summaries: 3,
      conflicting_viewpoints: 1
    },

    figure_count: 15,
    table_count: 8,

    data_interpretation_distribution: {
      direct_lookup: 12,
      trend_analysis: 10,
      calculation: 8,
      extrapolation: 6,
      synthesis: 4
    }
  }
}
```

### Statistical Analysis Script

```javascript
// scripts/analysis/calculate-statistics.mjs
export async function calculateTestStatistics(testNumber) {
  const stats = {
    test_number: testNumber,
    total_questions: 0,
    average_difficulty: 0,
    difficulty_distribution: { easy: 0, medium: 0, hard: 0 },
    english_stats: {},
    math_stats: {},
    reading_stats: {},
    science_stats: {}
  };

  // Get all questions for this test
  const { data: questions } = await supabase
    .from('act_questions')
    .select('*')
    .eq('test_number', testNumber);

  stats.total_questions = questions.length;

  // Calculate average difficulty
  const avgDiff = questions.reduce((sum, q) => sum + (q.difficulty_score || 0), 0) / questions.length;
  stats.average_difficulty = parseFloat(avgDiff.toFixed(2));

  // Difficulty distribution
  questions.forEach(q => {
    stats.difficulty_distribution[q.difficulty_level]++;
  });

  // Section-specific stats
  stats.english_stats = await calculateEnglishStats(testNumber);
  stats.math_stats = await calculateMathStats(testNumber);
  stats.reading_stats = await calculateReadingStats(testNumber);
  stats.science_stats = await calculateScienceStats(testNumber);

  // Save to database
  await supabase
    .from('act_test_statistics')
    .upsert({
      test_number: testNumber,
      total_questions: stats.total_questions,
      average_difficulty: stats.average_difficulty,
      difficulty_distribution: stats.difficulty_distribution,
      english_stats: stats.english_stats,
      math_stats: stats.math_stats,
      reading_stats: stats.reading_stats,
      science_stats: stats.science_stats
    }, {
      onConflict: 'test_number'
    });

  console.log(`✅ Statistics calculated for Test ${testNumber}`);
  return stats;
}

// Calculate all test statistics
export async function calculateAllStatistics() {
  for (let testNum = 1; testNum <= 7; testNum++) {
    await calculateTestStatistics(testNum);
  }

  console.log('✅ All test statistics calculated');
}
```

---

## PHASE 3 DELIVERABLES

At the end of Phase 3, you will have:

- [ ] All 1,680 questions classified by type
- [ ] ~6,000 distractors analyzed with explanations
- [ ] ~100-150 pattern templates extracted
- [ ] Difficulty scores for all questions
- [ ] Statistical analysis for all 7 tests
- [ ] Cross-test comparison report
- [ ] Pattern library ready for generation

**Time Spent**: 2-3 weeks
**Cost**: ~$50-100 (API fees for distractor analysis)

---

## NEXT PHASE

**Ready to generate?** → **[Phase 4: Generation System →](./05-PHASE-4-GENERATION.md)**

Phase 4 covers:
- Template-based generation
- AI-assisted generation
- Hybrid approach
- Full test assembly

---

**📖 Navigation**: [← Phase 2](./03-PHASE-2-EXTRACTION.md) | [Index](./00-MASTER-INDEX.md) | [Next: Phase 4 Generation →](./05-PHASE-4-GENERATION.md)
