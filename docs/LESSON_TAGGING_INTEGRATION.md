# LESSON TAGGING SYSTEM - MASTER PLAN INTEGRATION

**Purpose**: Ensure every question from the 7 practice tests is tagged to at least one lesson in your curriculum.

**Benefits**:
1. Students get targeted practice after completing lessons
2. Analytics show which lessons are most/least effective
3. Smart recommendations based on weak areas
4. Generated questions automatically tagged to correct lessons
5. Complete learning path from lesson → practice → mastery

---

## DATABASE SCHEMA UPDATES

### Add to `act_questions` table:

```sql
ALTER TABLE act_questions
ADD COLUMN primary_lesson_id UUID REFERENCES lesson_metadata(id),
ADD COLUMN primary_lesson_key VARCHAR(100), -- e.g., 'commas', 'quadratics'
ADD COLUMN related_lesson_ids UUID[], -- Array of secondary lessons
ADD COLUMN lesson_tags TEXT[]; -- Additional tags like 'grammar', 'algebra'

CREATE INDEX idx_questions_primary_lesson ON act_questions(primary_lesson_key);
CREATE INDEX idx_questions_lesson_tags ON act_questions USING GIN(lesson_tags);
```

### Create `question_lesson_mapping` table:

```sql
CREATE TABLE question_lesson_mapping (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  question_id UUID REFERENCES act_questions(id) ON DELETE CASCADE,
  lesson_id UUID REFERENCES lesson_metadata(id) ON DELETE CASCADE,
  lesson_key VARCHAR(100) NOT NULL,
  mapping_type VARCHAR(20) DEFAULT 'primary', -- 'primary', 'secondary', 'recommended'
  confidence_score DECIMAL(3,2) DEFAULT 1.00, -- 0.00-1.00 how confident we are in this mapping
  created_at TIMESTAMPTZ DEFAULT NOW(),

  UNIQUE(question_id, lesson_id)
);

CREATE INDEX idx_mapping_question ON question_lesson_mapping(question_id);
CREATE INDEX idx_mapping_lesson ON question_lesson_mapping(lesson_key);
```

### Create `question_type_to_lesson_reference` table:

```sql
-- This is our master reference for auto-tagging
CREATE TABLE question_type_to_lesson_reference (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  question_type VARCHAR(100) NOT NULL, -- e.g., 'punctuation_commas'
  section VARCHAR(20) NOT NULL, -- 'english', 'math', 'reading', 'science'
  lesson_key VARCHAR(100) NOT NULL, -- e.g., 'commas'
  priority INTEGER DEFAULT 1, -- 1 = primary, 2 = secondary, etc.
  notes TEXT, -- Why this mapping exists
  created_at TIMESTAMPTZ DEFAULT NOW(),

  UNIQUE(question_type, section, lesson_key)
);

CREATE INDEX idx_qtl_type ON question_type_to_lesson_reference(question_type);
CREATE INDEX idx_qtl_lesson ON question_type_to_lesson_reference(lesson_key);
```

---

## COMPREHENSIVE QUESTION TYPE → LESSON MAPPING

### **ENGLISH (16 Lessons → ~40 Question Types)**

```javascript
const englishMapping = {
  // GRAMMAR FUNDAMENTALS
  'sentence_fragments': ['sentence-structure'],
  'run_on_sentences': ['sentence-structure'],
  'comma_splice': ['sentence-structure', 'commas'],
  'independent_clauses': ['sentence-structure'],
  'dependent_clauses': ['sentence-structure'],

  // PUNCTUATION
  'punctuation_commas_list': ['commas'],
  'punctuation_commas_unnecessary_info': ['commas'],
  'punctuation_commas_fanboys': ['commas'],
  'punctuation_commas_adjectives': ['commas'],
  'punctuation_semicolons': ['punctuation'],
  'punctuation_colons': ['punctuation'],
  'punctuation_dashes': ['punctuation'],
  'punctuation_apostrophes': ['punctuation'],
  'punctuation_quotation_marks': ['punctuation'],

  // VERBS
  'subject_verb_agreement': ['verbs'],
  'subject_verb_agreement_intervening_phrase': ['verbs'],
  'verb_tense_consistency': ['verbs'],
  'verb_tense_simple': ['verbs'],
  'verb_tense_perfect': ['verbs'],

  // PRONOUNS
  'pronoun_antecedent_agreement': ['pronouns'],
  'pronoun_case': ['pronouns'],
  'pronoun_ambiguous_reference': ['pronouns'],
  'relative_pronouns': ['pronouns'],

  // MODIFIERS
  'misplaced_modifiers': ['modifiers'],
  'dangling_modifiers': ['modifiers'],
  'modifier_placement': ['modifiers'],

  // PARALLEL STRUCTURE
  'parallelism_lists': ['parallel-structure'],
  'parallelism_comparisons': ['parallel-structure'],
  'parallelism_correlative_conjunctions': ['parallel-structure'],

  // RHETORICAL SKILLS
  'redundancy': ['redundancy'],
  'wordiness': ['redundancy'],
  'word_choice_precision': ['word-choice'],
  'word_choice_tone': ['word-choice'],
  'word_choice_register': ['word-choice'],
  'transitions': ['transitions'],
  'transition_logic': ['transitions'],
  'which_choice_questions': ['which-choice'],
  'add_delete_info': ['adding-deleting'],
  'sentence_placement': ['logical-placement'],
  'paragraph_order': ['logical-placement'],
  'paragraph_purpose': ['which-choice'],

  // MISCELLANEOUS
  'idioms': ['misc-topics'],
  'comparisons': ['misc-topics'],
  'logical_comparisons': ['misc-topics']
};
```

### **MATH (35 Lessons → 100+ Question Types)**

```javascript
const mathMapping = {
  // STRATEGIES
  'working_backwards': ['backsolving'],
  'plugging_in_numbers': ['substitution'],
  'plugging_in_answers': ['backsolving'],

  // GEOMETRY - ANGLES & LINES
  'angle_measures': ['geometry-angles'],
  'supplementary_angles': ['geometry-angles'],
  'vertical_angles': ['geometry-angles'],
  'parallel_lines_transversal': ['geometry-angles'],

  // GEOMETRY - SHAPES
  'triangle_area': ['geometry-shapes'],
  'triangle_pythagorean': ['geometry-shapes'],
  'triangle_special_right': ['geometry-shapes'],
  'rectangle_area_perimeter': ['geometry-shapes'],
  'circle_area_circumference': ['geometry-shapes'],
  'volume_rectangular_prism': ['geometry-shapes'],
  'volume_cylinder': ['geometry-shapes'],
  'surface_area': ['geometry-shapes'],

  // COORDINATE GEOMETRY
  'slope': ['lines'],
  'distance_formula': ['lines'],
  'midpoint_formula': ['lines'],
  'equation_of_line': ['lines'],
  'parallel_perpendicular_lines': ['lines'],

  // CIRCLES & CONICS
  'arc_length': ['arcs-sectors'],
  'sector_area': ['arcs-sectors'],
  'circle_equation': ['circles-ellipses'],
  'ellipse_equation': ['circles-ellipses'],
  'hyperbola_equation': ['circles-ellipses'],

  // ALGEBRA FUNDAMENTALS
  'simplifying_expressions': ['algebra-skills'],
  'combining_like_terms': ['algebra-skills'],
  'distributive_property': ['algebra-skills'],
  'factoring': ['algebra-skills'],
  'fraction_operations': ['fractions'],
  'fraction_simplification': ['fractions'],
  'complex_fractions': ['fractions'],
  'exponent_rules': ['exponents-roots'],
  'radical_simplification': ['exponents-roots'],
  'rational_exponents': ['exponents-roots'],
  'logarithm_properties': ['logarithms'],
  'logarithm_equations': ['logarithms'],
  'linear_inequalities': ['inequalities'],
  'compound_inequalities': ['inequalities'],
  'absolute_value_equations': ['absolute-value'],
  'absolute_value_inequalities': ['absolute-value'],

  // ADVANCED ALGEBRA
  'systems_linear_equations': ['systems-equations'],
  'systems_substitution': ['systems-equations'],
  'systems_elimination': ['systems-equations'],
  'quadratic_factoring': ['quadratics'],
  'quadratic_formula': ['quadratics'],
  'quadratic_completing_square': ['quadratics'],
  'function_notation': ['functions'],
  'function_composition': ['functions'],
  'inverse_functions': ['functions'],
  'function_transformations': ['transforming-functions'],
  'vertical_horizontal_shifts': ['transforming-functions'],
  'reflections_stretches': ['transforming-functions'],
  'exponential_growth_decay': ['exponential-growth'],
  'compound_interest': ['exponential-growth'],
  'arithmetic_sequences': ['sequences'],
  'geometric_sequences': ['sequences'],
  'sequence_formulas': ['sequences'],

  // NUMBERS & OPERATIONS
  'prime_factorization': ['number-theory'],
  'divisibility_rules': ['number-theory'],
  'gcf_lcm': ['number-theory'],
  'percent_increase_decrease': ['percentages'],
  'percent_of_quantity': ['percentages'],
  'ratios': ['ratios-proportions'],
  'proportions': ['ratios-proportions'],
  'unit_conversion': ['unit-conversion'],
  'scientific_notation': ['scientific-notation'],
  'repeating_decimal_patterns': ['repeating-patterns'],
  'cyclic_patterns': ['repeating-patterns'],

  // STATISTICS & PROBABILITY
  'mean_median_mode': ['statistics-basics'],
  'range': ['statistics-basics'],
  'weighted_average': ['statistics-advanced'],
  'standard_deviation': ['statistics-advanced'],
  'probability_basic': ['probability'],
  'probability_compound_events': ['probability'],
  'counting_principle': ['permutations-combinations'],
  'permutations': ['permutations-combinations'],
  'combinations': ['permutations-combinations'],

  // ADVANCED TOPICS
  'trig_ratios': ['trigonometry'],
  'unit_circle': ['trigonometry'],
  'trig_identities': ['trigonometry'],
  'complex_number_operations': ['complex-numbers'],
  'imaginary_numbers': ['complex-numbers'],
  'matrix_operations': ['matrices'],
  'vector_operations': ['vectors'],
  'word_problems_general': ['word-problems']
};
```

### **READING (14 Lessons → ~20 Question Types)**

```javascript
const readingMapping = {
  // FUNDAMENTALS
  'main_idea': ['finding-correct-answer'],
  'central_claim': ['finding-correct-answer'],
  'author_purpose': ['core-principles'],
  'passage_structure': ['core-principles'],

  // QUESTION TYPES
  'detail_questions': ['question-types'],
  'inference_questions': ['question-types'],
  'vocabulary_in_context': ['words-in-context', 'question-types'],
  'function_questions': ['question-types'],
  'tone_questions': ['question-types'],
  'comparative_questions': ['comparing-passages'],

  // STRATEGIES
  'eliminating_wrong_answers': ['correct-vs-incorrect'],
  'answer_choice_analysis': ['answer-choices'],
  'working_backwards_reading': ['working-backwards'],
  'question_breakdown': ['breaking-down-questions'],

  // ANSWER CHOICE PATTERNS
  'too_extreme': ['correct-vs-incorrect'],
  'out_of_scope': ['correct-vs-incorrect'],
  'reversal': ['correct-vs-incorrect'],
  'too_narrow': ['correct-vs-incorrect'],
  'too_broad': ['correct-vs-incorrect']
};
```

### **SCIENCE (16 Lessons → ~25 Question Types)**

```javascript
const scienceMapping = {
  // DATA INTERPRETATION
  'direct_data_lookup': ['specific-data-point'],
  'reading_graphs': ['specific-data-point'],
  'reading_tables': ['specific-data-point'],
  'trend_identification': ['trends'],
  'trend_extrapolation': ['trends'],
  'approximation_from_graph': ['approximation'],
  'multiple_figure_synthesis': ['multiple-figures'],
  'figure_and_text_integration': ['figures-text'],
  'inverse_relationships': ['inverse-trends-multiple-axes'],
  'multiple_y_axes': ['inverse-trends-multiple-axes'],
  'scatter_plot_interpretation': ['scatter-plots'],

  // ADVANCED QUESTION TYPES
  'two_part_questions': ['two-part-answers'],
  'cannot_be_determined': ['cannot-be-determined'],
  'equation_matching': ['equations-as-answers'],
  'mixing_concentrations': ['mixing'],
  'dilution_problems': ['mixing'],
  'calculations_on_science': ['math-on-science'],
  'unit_analysis_science': ['math-on-science'],

  // BACKGROUND KNOWLEDGE
  'water_properties': ['water-knowledge'],
  'experimental_design': ['experimental-setup'],
  'control_variables': ['experimental-setup']
};
```

---

## PHASE-BY-PHASE INTEGRATION

### **PHASE 1: Database Setup**
✅ **Task 1.2.1**: Add lesson tagging fields to schema
✅ **Task 1.2.2**: Create mapping tables
✅ **Task 1.2.3**: Populate `question_type_to_lesson_reference` with mappings above

### **PHASE 2: Data Extraction**
**NEW: Task 2.9 - Lesson Tagging During Extraction**

For each question extracted:
1. Classify question type (already part of extraction)
2. **Auto-tag primary lesson** using reference table
3. **Flag unmapped questions** for manual review
4. Store in `question_lesson_mapping` table

```javascript
// Example extraction flow
async function extractAndTagQuestion(questionData) {
  // 1. Extract question normally
  const question = await extractQuestion(questionData);

  // 2. Classify question type
  question.question_type = classifyQuestionType(question);

  // 3. AUTO-TAG to lesson
  const lessonMapping = await getLessonMapping(question.question_type, question.section);

  if (lessonMapping) {
    question.primary_lesson_key = lessonMapping.lesson_key;
    await tagQuestionToLesson(question.id, lessonMapping.lesson_key, 'primary');
  } else {
    // Flag for manual review
    await flagUnmappedQuestion(question.id, question.question_type);
  }

  // 4. Insert question
  await supabase.from('act_questions').insert(question);
}
```

**Task 2.9.1**: Generate unmapped questions report
```sql
SELECT section, question_type, COUNT(*) as count
FROM act_questions
WHERE primary_lesson_key IS NULL
GROUP BY section, question_type
ORDER BY count DESC;
```

### **PHASE 3: Pattern Analysis**
**UPDATED: Task 3.1** - Include lesson tagging in classification

When analyzing question patterns:
1. Group by `primary_lesson_key`
2. Calculate question distribution per lesson
3. Identify lessons with too few/many questions

**NEW: Task 3.8 - Lesson Coverage Analysis**

Generate report:
```sql
-- Questions per lesson
SELECT
  l.lesson_key,
  l.title,
  l.subject,
  COUNT(q.id) as question_count,
  ARRAY_AGG(DISTINCT q.question_type) as question_types_covered
FROM lesson_metadata l
LEFT JOIN act_questions q ON q.primary_lesson_key = l.lesson_key
GROUP BY l.id, l.lesson_key, l.title, l.subject
ORDER BY l.subject, question_count DESC;

-- Lessons with NO questions (gaps!)
SELECT lesson_key, title, subject
FROM lesson_metadata
WHERE lesson_key NOT IN (
  SELECT DISTINCT primary_lesson_key
  FROM act_questions
  WHERE primary_lesson_key IS NOT NULL
)
ORDER BY subject;

// Question types with NO lesson (need new lessons!)
SELECT section, question_type, COUNT(*) as count
FROM act_questions
WHERE primary_lesson_key IS NULL
GROUP BY section, question_type
HAVING COUNT(*) > 5 -- Only show if appears 5+ times
ORDER BY count DESC;
```

### **PHASE 4: Generation System**
**UPDATED**: Generated questions automatically inherit lesson tags

```javascript
async function generateQuestion(patternId, lessonKey) {
  const pattern = await getPattern(patternId);
  const generatedQ = await generateFromPattern(pattern);

  // AUTO-TAG generated question to same lesson as pattern
  generatedQ.primary_lesson_key = lessonKey;
  generatedQ.lesson_tags = [lessonKey];

  return generatedQ;
}

// Generate practice set for a specific lesson
async function generateLessonPracticeSet(lessonKey, count = 10) {
  // Get all question types for this lesson
  const questionTypes = await supabase
    .from('question_type_to_lesson_reference')
    .select('question_type')
    .eq('lesson_key', lessonKey);

  // Generate questions matching those types
  const questions = [];
  for (const type of questionTypes) {
    const pattern = await getPatternForType(type.question_type);
    const q = await generateQuestion(pattern.id, lessonKey);
    questions.push(q);
  }

  return questions.slice(0, count);
}
```

### **PHASE 5: Validation**
**NEW: Task 5.6 - Validate Lesson Tagging Accuracy**

Sample questions and verify lesson tags are correct:
1. Random sample of 50 questions per section
2. Manual review: Does the lesson tag make sense?
3. Calculate tagging accuracy
4. Update mappings based on feedback

---

## USER-FACING FEATURES ENABLED

### 1. **Lesson Practice Mode**
After completing a lesson, students can practice with real ACT questions on that exact topic:
```javascript
// Get practice questions for lesson
const practiceQuestions = await supabase
  .from('act_questions')
  .select('*')
  .eq('primary_lesson_key', 'commas')
  .limit(10)
  .order('RANDOM()');
```

### 2. **Weak Area Analysis**
```javascript
// Find which lessons student struggles with
const weakLessons = await analyzeStudentPerformance(studentId);
// Returns: [
//   { lesson_key: 'commas', success_rate: 0.45 },
//   { lesson_key: 'subject-verb-agreement', success_rate: 0.52 },
// ]
```

### 3. **Smart Recommendations**
"You got 3 questions wrong on commas. Review the 'Essential Comma Rules' lesson."

### 4. **Infinite Practice**
Generate unlimited practice questions for any lesson on demand.

---

## SUCCESS METRICS

1. **100% Coverage**: Every question tagged to at least one lesson
2. **Mapping Accuracy**: 95%+ of auto-tags are correct
3. **Lesson Balance**: Each lesson has 10-50 practice questions available
4. **No Orphans**: Zero question types without a corresponding lesson

---

## PRIORITY ACTIONS

### IMMEDIATE (This Week):
1. ✅ Add lesson tagging fields to `act_questions` table
2. ✅ Create `question_type_to_lesson_reference` table
3. ✅ Populate reference table with English + Math mappings
4. ✅ Update extraction scripts to auto-tag questions

### SHORT-TERM (Next 2 Weeks):
1. Complete all Reading + Science mappings
2. Run extraction with lesson tagging enabled
3. Generate lesson coverage report
4. Manually review and fix unmapped questions

### MEDIUM-TERM (Weeks 3-4):
1. Identify lessons needing to be created (gaps)
2. Create new lessons for common unmapped question types
3. Integrate lesson tagging into generation system
4. Build "Lesson Practice Mode" UI

---

## LESSON GAPS TO FILL

Based on ACT question taxonomy, you'll likely need to create these additional lessons:

**English (Need ~10 more):**
- Apostrophes & Possessives
- Semicolons & Colons
- Dashes & Other Punctuation
- Idioms & Expressions
- Comparisons

**Math (Coverage looks good - 35 comprehensive lessons covering all ACT math topics)**

**Reading (Coverage looks good - 14 lessons)**

**Science (Coverage looks good - 16 lessons)**

---

**BOTTOM LINE**: Every question extracted from the 7 practice tests will be automatically tagged to your existing lessons. Students get targeted practice, you get powerful analytics, and generated questions inherit the right tags. This makes your ACT prep platform incredibly powerful and personalized.
