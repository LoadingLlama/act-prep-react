# QUESTION-TO-LESSON MAPPING SYSTEM
## Connecting Practice Questions to Learning Content

**Purpose**: When students get a question wrong, immediately direct them to the exact lesson that teaches that concept.

**Created**: 2025-10-22
**Status**: Planning

---

## THE PROBLEM WE'RE SOLVING

**Current State:**
- Student takes practice test
- Gets question wrong
- Has no idea what to study to improve
- Generic "review English grammar" isn't helpful

**Desired State:**
- Student gets question wrong
- System says: "This tests **Subject-Verb Agreement**. Study lesson **1.5 - Verbs** (15 min) to master this concept."
- Student clicks → goes directly to relevant lesson section
- Learns concept → retries similar questions → improves

---

## ARCHITECTURE

### Database Schema Updates

#### **Update `act_questions` table:**

```sql
ALTER TABLE act_questions
  -- Link to lesson(s) that teach this concept
  ADD COLUMN primary_lesson_id UUID REFERENCES lessons(id),
  ADD COLUMN secondary_lesson_ids UUID[], -- Array of related lessons

  -- Alternative: use lesson_key (more flexible)
  ADD COLUMN primary_lesson_key VARCHAR(100),
  ADD COLUMN secondary_lesson_keys VARCHAR(100)[],

  -- Specific concept within lesson
  ADD COLUMN concept_tag VARCHAR(200), -- e.g., "subject_verb_agreement_with_intervening_phrase"
  ADD COLUMN lesson_section VARCHAR(100); -- e.g., "Key Takeaways", "Example 3"

CREATE INDEX idx_questions_primary_lesson ON act_questions(primary_lesson_key);
CREATE INDEX idx_questions_concept ON act_questions(concept_tag);
```

#### **New Table: `concept_to_lesson_mapping`**

Central registry of which lessons teach which concepts:

```sql
CREATE TABLE concept_to_lesson_mapping (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),

  -- The concept being taught
  concept_tag VARCHAR(200) UNIQUE NOT NULL, -- e.g., "subject_verb_agreement"
  concept_name VARCHAR(500) NOT NULL, -- e.g., "Subject-Verb Agreement"
  concept_description TEXT,

  -- Section this concept belongs to
  section VARCHAR(20) NOT NULL, -- 'english', 'math', 'reading', 'science'

  -- Which lesson(s) teach this
  primary_lesson_key VARCHAR(100) NOT NULL, -- Main lesson
  primary_lesson_id UUID REFERENCES lessons(id),

  secondary_lesson_keys VARCHAR(100)[], -- Related lessons

  -- Where in the lesson
  lesson_sections TEXT[], -- e.g., ["Introduction", "Rule 3", "Examples 5-8"]

  -- Difficulty/prerequisite info
  difficulty_level VARCHAR(20), -- 'beginner', 'intermediate', 'advanced'
  prerequisite_concepts VARCHAR(200)[], -- Concepts to learn first

  -- Usage statistics
  question_count INTEGER DEFAULT 0, -- How many questions test this
  student_error_rate DECIMAL(5,2), -- How often students get this wrong

  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE INDEX idx_concept_section ON concept_to_lesson_mapping(section);
CREATE INDEX idx_concept_lesson ON concept_to_lesson_mapping(primary_lesson_key);
```

---

## CONCEPT TAXONOMY

### English Section Concepts → Lessons

Based on your existing lessons:

```javascript
const ENGLISH_CONCEPTS = {
  // Lesson 1.1 - Getting Started
  'act_english_basics': {
    lesson_key: 'getting-started',
    concept_name: 'ACT English Test Basics',
    section: 'english'
  },

  // Lesson 1.2 - Sentence Structure
  'sentence_fragments': {
    lesson_key: 'sentence-structure',
    concept_name: 'Sentence Fragments',
    section: 'english'
  },
  'run_on_sentences': {
    lesson_key: 'sentence-structure',
    concept_name: 'Run-on Sentences',
    section: 'english'
  },
  'comma_splices': {
    lesson_key: 'sentence-structure',
    concept_name: 'Comma Splices',
    section: 'english'
  },

  // Lesson 1.3 - Commas
  'commas_with_clauses': {
    lesson_key: 'commas',
    concept_name: 'Commas with Dependent/Independent Clauses',
    section: 'english'
  },
  'commas_in_lists': {
    lesson_key: 'commas',
    concept_name: 'Commas in Lists',
    section: 'english'
  },
  'commas_with_introductory_phrases': {
    lesson_key: 'commas',
    concept_name: 'Commas with Introductory Phrases',
    section: 'english'
  },

  // Lesson 1.4 - Punctuation
  'semicolons': {
    lesson_key: 'punctuation',
    concept_name: 'Semicolons',
    section: 'english'
  },
  'colons': {
    lesson_key: 'punctuation',
    concept_name: 'Colons',
    section: 'english'
  },
  'apostrophes_possession': {
    lesson_key: 'punctuation',
    concept_name: 'Apostrophes for Possession',
    section: 'english'
  },
  'apostrophes_contractions': {
    lesson_key: 'punctuation',
    concept_name: 'Apostrophes in Contractions',
    section: 'english'
  },
  'dashes': {
    lesson_key: 'punctuation',
    concept_name: 'Dashes',
    section: 'english'
  },

  // Lesson 1.5 - Verbs
  'subject_verb_agreement': {
    lesson_key: 'verbs',
    concept_name: 'Subject-Verb Agreement',
    section: 'english'
  },
  'subject_verb_agreement_with_intervening_phrase': {
    lesson_key: 'verbs',
    concept_name: 'Subject-Verb Agreement with Intervening Phrases',
    section: 'english',
    prerequisite_concepts: ['subject_verb_agreement']
  },
  'verb_tense_consistency': {
    lesson_key: 'verbs',
    concept_name: 'Verb Tense Consistency',
    section: 'english'
  },
  'past_perfect_tense': {
    lesson_key: 'verbs',
    concept_name: 'Past Perfect Tense',
    section: 'english'
  },
  'irregular_verbs': {
    lesson_key: 'verbs',
    concept_name: 'Irregular Verbs',
    section: 'english'
  },

  // Lesson 1.6 - Pronouns
  'pronoun_antecedent_agreement': {
    lesson_key: 'pronouns',
    concept_name: 'Pronoun-Antecedent Agreement',
    section: 'english'
  },
  'pronoun_case': {
    lesson_key: 'pronouns',
    concept_name: 'Pronoun Case (I vs me, who vs whom)',
    section: 'english'
  },
  'relative_pronouns': {
    lesson_key: 'pronouns',
    concept_name: 'Relative Pronouns (who, which, that)',
    section: 'english'
  },

  // Lesson 1.7 - Modifiers
  'misplaced_modifiers': {
    lesson_key: 'modifiers',
    concept_name: 'Misplaced Modifiers',
    section: 'english'
  },
  'dangling_modifiers': {
    lesson_key: 'modifiers',
    concept_name: 'Dangling Modifiers',
    section: 'english'
  },

  // Lesson 1.8 - Parallel Structure
  'parallelism_in_lists': {
    lesson_key: 'parallel-structure',
    concept_name: 'Parallel Structure in Lists',
    section: 'english'
  },
  'parallelism_in_comparisons': {
    lesson_key: 'parallel-structure',
    concept_name: 'Parallel Structure in Comparisons',
    section: 'english'
  },

  // Lesson 1.9 - Miscellaneous Topics
  'word_choice': {
    lesson_key: 'misc-topics',
    concept_name: 'Word Choice and Precision',
    section: 'english'
  },
  'idioms': {
    lesson_key: 'misc-topics',
    concept_name: 'Idiomatic Expressions',
    section: 'english'
  },

  // Lesson 1.10 - Grammar Review
  'comprehensive_grammar': {
    lesson_key: 'grammar-review',
    concept_name: 'Comprehensive Grammar Review',
    section: 'english'
  },

  // Lesson 1.11 - Redundancy
  'redundancy': {
    lesson_key: 'redundancy',
    concept_name: 'Eliminating Redundancy',
    section: 'english'
  },
  'wordiness': {
    lesson_key: 'redundancy',
    concept_name: 'Conciseness and Wordiness',
    section: 'english'
  },

  // Lesson 1.12 - Word Choice
  'formal_vs_informal_register': {
    lesson_key: 'word-choice',
    concept_name: 'Formal vs Informal Language',
    section: 'english'
  },
  'precision': {
    lesson_key: 'word-choice',
    concept_name: 'Precise Word Choice',
    section: 'english'
  },

  // Lesson 1.13 - Transitions
  'transition_words': {
    lesson_key: 'transitions',
    concept_name: 'Transition Words and Phrases',
    section: 'english'
  },
  'logical_flow': {
    lesson_key: 'transitions',
    concept_name: 'Logical Flow Between Ideas',
    section: 'english'
  },

  // Lesson 1.14 - Which Choice Questions
  'rhetorical_strategy': {
    lesson_key: 'which-choice',
    concept_name: 'Rhetorical Strategy Questions',
    section: 'english'
  },
  'purpose_effect': {
    lesson_key: 'which-choice',
    concept_name: 'Purpose and Effect Questions',
    section: 'english'
  },

  // Lesson 1.15 - Adding/Deleting
  'add_delete_decisions': {
    lesson_key: 'adding-deleting',
    concept_name: 'Adding and Deleting Sentences',
    section: 'english'
  },
  'relevance': {
    lesson_key: 'adding-deleting',
    concept_name: 'Relevance and Cohesion',
    section: 'english'
  },

  // Lesson 1.16 - Logical Placement
  'sentence_placement': {
    lesson_key: 'logical-placement',
    concept_name: 'Sentence and Paragraph Placement',
    section: 'english'
  },
  'organizational_logic': {
    lesson_key: 'logical-placement',
    concept_name: 'Organizational Logic',
    section: 'english'
  }
};
```

### Math Section Concepts → Lessons

```javascript
const MATH_CONCEPTS = {
  // Topic 1.1 - Substitution
  'substitution_basic': {
    lesson_key: 'substitution',
    concept_name: 'Basic Substitution',
    section: 'math'
  },
  'substitution_complex': {
    lesson_key: 'substitution',
    concept_name: 'Complex Substitution with Multiple Variables',
    section: 'math'
  },

  // Topic 1.2 - Backsolving
  'backsolving': {
    lesson_key: 'backsolving',
    concept_name: 'Backsolving Strategy',
    section: 'math'
  },

  // Topic 2.1 - Basic Geometry
  'area_formulas': {
    lesson_key: 'basic-geometry',
    concept_name: 'Area Formulas (rectangles, triangles, circles)',
    section: 'math'
  },
  'perimeter_formulas': {
    lesson_key: 'basic-geometry',
    concept_name: 'Perimeter Formulas',
    section: 'math'
  },

  // Topic 2.2 - Areas, Volumes, Triangles
  'triangle_properties': {
    lesson_key: 'areas-volumes-triangles',
    concept_name: 'Triangle Properties',
    section: 'math'
  },
  'pythagorean_theorem': {
    lesson_key: 'areas-volumes-triangles',
    concept_name: 'Pythagorean Theorem',
    section: 'math'
  },
  'volume_formulas': {
    lesson_key: 'areas-volumes-triangles',
    concept_name: 'Volume Formulas (prisms, pyramids, cylinders)',
    section: 'math'
  },

  // Topic 2.3 - Coordinate Geometry
  'distance_formula': {
    lesson_key: 'coordinate-geometry',
    concept_name: 'Distance Formula',
    section: 'math'
  },
  'midpoint_formula': {
    lesson_key: 'coordinate-geometry',
    concept_name: 'Midpoint Formula',
    section: 'math'
  },
  'slope': {
    lesson_key: 'coordinate-geometry',
    concept_name: 'Slope',
    section: 'math'
  },

  // Topic 2.4 - Angles
  'angle_relationships': {
    lesson_key: 'angles',
    concept_name: 'Angle Relationships',
    section: 'math'
  },
  'complementary_supplementary': {
    lesson_key: 'angles',
    concept_name: 'Complementary and Supplementary Angles',
    section: 'math'
  },

  // Topic 2.5 - Circles, Ellipses, Hyperbolas
  'circle_equations': {
    lesson_key: 'circles-ellipses-hyperbolas',
    concept_name: 'Circle Equations',
    section: 'math'
  },
  'arc_length': {
    lesson_key: 'circles-ellipses-hyperbolas',
    concept_name: 'Arc Length and Sector Area',
    section: 'math'
  },

  // Topic 3.1 - Algebra Skills
  'solving_linear_equations': {
    lesson_key: 'algebra-skills',
    concept_name: 'Solving Linear Equations',
    section: 'math'
  },
  'factoring': {
    lesson_key: 'algebra-skills',
    concept_name: 'Factoring',
    section: 'math'
  },

  // ... continue for all math topics
};
```

### Reading Section Concepts → Lessons

```javascript
const READING_CONCEPTS = {
  // Lesson 1.1 - Introduction
  'reading_test_format': {
    lesson_key: 'intro',
    concept_name: 'Reading Test Format and Structure',
    section: 'reading'
  },

  // Lesson 1.2 - Reading Approaches
  'skimming_strategy': {
    lesson_key: 'reading-approaches',
    concept_name: 'Skimming vs Detailed Reading',
    section: 'reading'
  },
  'active_reading': {
    lesson_key: 'reading-approaches',
    concept_name: 'Active Reading Techniques',
    section: 'reading'
  },

  // Lesson 1.3 - Core Principles
  'main_idea': {
    lesson_key: 'core-principles',
    concept_name: 'Identifying Main Ideas',
    section: 'reading'
  },
  'supporting_details': {
    lesson_key: 'core-principles',
    concept_name: 'Finding Supporting Details',
    section: 'reading'
  },
  'author_purpose': {
    lesson_key: 'core-principles',
    concept_name: "Author's Purpose and Tone",
    section: 'reading'
  },

  // Lesson 1.4 - Finding Correct Answer
  'evidence_based_reading': {
    lesson_key: 'finding-correct-answer',
    concept_name: 'Evidence-Based Reading',
    section: 'reading'
  },
  'line_reference_questions': {
    lesson_key: 'finding-correct-answer',
    concept_name: 'Line Reference Questions',
    section: 'reading'
  },

  // Lesson 2.1 - Pacing
  'time_management_reading': {
    lesson_key: 'pacing',
    concept_name: 'Time Management in Reading Section',
    section: 'reading'
  },

  // Lesson 2.2 - Question Types
  'inference_questions': {
    lesson_key: 'question-types',
    concept_name: 'Inference Questions',
    section: 'reading'
  },
  'vocabulary_in_context': {
    lesson_key: 'question-types',
    concept_name: 'Vocabulary in Context',
    section: 'reading'
  },
  'except_questions': {
    lesson_key: 'question-types',
    concept_name: 'EXCEPT and LEAST Questions',
    section: 'reading'
  },

  // Lesson 2.3 - Breaking Down Questions
  'question_stem_analysis': {
    lesson_key: 'breaking-down',
    concept_name: 'Analyzing Question Stems',
    section: 'reading'
  },

  // Lesson 2.4 - Answer Choices
  'eliminating_wrong_answers': {
    lesson_key: 'answer-choices',
    concept_name: 'Process of Elimination',
    section: 'reading'
  },
  'extreme_language_trap': {
    lesson_key: 'answer-choices',
    concept_name: 'Avoiding Extreme Language Traps',
    section: 'reading'
  },

  // Lesson 2.5 - Correct vs Incorrect
  'right_answer_patterns': {
    lesson_key: 'correct-vs-incorrect',
    concept_name: 'Patterns of Correct Answers',
    section: 'reading'
  },
  'wrong_answer_patterns': {
    lesson_key: 'correct-vs-incorrect',
    concept_name: 'Common Wrong Answer Patterns',
    section: 'reading'
  },

  // Lesson 2.6 - Words in Context
  'context_clues': {
    lesson_key: 'words-in-context',
    concept_name: 'Using Context Clues',
    section: 'reading'
  },

  // Lesson 3.1 - Working Backwards
  'reverse_engineering_questions': {
    lesson_key: 'working-backwards',
    concept_name: 'Working Backwards from Answer Choices',
    section: 'reading'
  },

  // Lesson 3.2 - Maximizing Score
  'reading_optimization': {
    lesson_key: 'maximizing-score',
    concept_name: '7 Tips to Maximize Reading Score',
    section: 'reading'
  },

  // Lesson 3.3 - Comparing Passages
  'dual_passage_strategy': {
    lesson_key: 'comparing-passages',
    concept_name: 'Dual Passage Strategy',
    section: 'reading'
  }
};
```

### Science Section Concepts → Lessons

```javascript
const SCIENCE_CONCEPTS = {
  // Lesson 1.1 - Introduction
  'science_test_format': {
    lesson_key: 'introduction',
    concept_name: 'Science Test Format',
    section: 'science'
  },

  // Lesson 1.2 - Passage Approach
  'passage_types_science': {
    lesson_key: 'passage-approach',
    concept_name: 'Science Passage Types',
    section: 'science'
  },
  'reading_graphs_tables': {
    lesson_key: 'passage-approach',
    concept_name: 'Reading Graphs and Tables',
    section: 'science'
  },

  // Lesson 2.1 - Question Diagnosis
  'data_lookup': {
    lesson_key: 'question-diagnosis',
    concept_name: 'Direct Data Lookup Questions',
    section: 'science'
  },
  'trend_analysis': {
    lesson_key: 'question-diagnosis',
    concept_name: 'Trend Analysis Questions',
    section: 'science'
  },

  // Lesson 2.2 - Specific Data Point
  'reading_data_points': {
    lesson_key: 'specific-data-point',
    concept_name: 'Reading Specific Data Points',
    section: 'science'
  },

  // Lesson 2.3 - Trends
  'identifying_trends': {
    lesson_key: 'trends',
    concept_name: 'Identifying Trends in Data',
    section: 'science'
  },
  'direct_inverse_relationships': {
    lesson_key: 'trends',
    concept_name: 'Direct and Inverse Relationships',
    section: 'science'
  },

  // Lesson 2.4 - Approximation
  'estimating_values': {
    lesson_key: 'approximation',
    concept_name: 'Estimating and Approximating Values',
    section: 'science'
  },

  // Lesson 2.5 - Multiple Figures
  'cross_referencing_figures': {
    lesson_key: 'multiple-figures',
    concept_name: 'Cross-Referencing Multiple Figures',
    section: 'science'
  },

  // Lesson 2.6 - Figures and Text
  'integrating_text_figures': {
    lesson_key: 'figures-text',
    concept_name: 'Integrating Text and Figures',
    section: 'science'
  },

  // Lesson 2.7 - Scatter Plots
  'scatter_plot_analysis': {
    lesson_key: 'scatter-plots',
    concept_name: 'Scatter Plot Analysis',
    section: 'science'
  },

  // Lesson 2.8 - Inverse Trends
  'inverse_relationships': {
    lesson_key: 'inverse-trends',
    concept_name: 'Inverse Trends and Relationships',
    section: 'science'
  },

  // Lesson 3.1 - Two-Part Answers
  'two_part_questions': {
    lesson_key: 'two-part',
    concept_name: 'Two-Part Answer Questions',
    section: 'science'
  },

  // Lesson 3.2 - Cannot Be Determined
  'cannot_be_determined': {
    lesson_key: 'cannot-be-determined',
    concept_name: 'Cannot Be Determined Questions',
    section: 'science'
  },

  // Lesson 3.3 - Equations as Answers
  'equation_based_answers': {
    lesson_key: 'equations',
    concept_name: 'Equations as Answer Choices',
    section: 'science'
  },

  // Lesson 3.4 - Mixing
  'mixing_problems': {
    lesson_key: 'mixing',
    concept_name: 'Mixing and Combination Problems',
    section: 'science'
  },

  // Lesson 3.5 - Math on Science
  'calculations_in_science': {
    lesson_key: 'math',
    concept_name: 'Mathematical Calculations in Science',
    section: 'science'
  },

  // Lesson 4.1 - Water Knowledge
  'water_properties': {
    lesson_key: 'water',
    concept_name: 'Water Properties and Behavior',
    section: 'science'
  },

  // Lesson 4.2 - Experimental Setup
  'experimental_design': {
    lesson_key: 'experimental',
    concept_name: 'Experimental Design and Setup',
    section: 'science'
  }
};
```

---

## TAGGING PROCESS

### Manual Tagging (Initial Phase)

**Process**:
1. Review question
2. Identify primary concept tested
3. Find corresponding lesson from our taxonomy
4. Tag question with lesson_key and concept_tag
5. Optionally add secondary lessons

**Script**: `scripts/tagging/tag-questions-to-lessons.mjs`

```javascript
// Manual tagging interface
async function tagQuestion(questionId, tags) {
  await supabase
    .from('act_questions')
    .update({
      primary_lesson_key: tags.primary_lesson_key,
      concept_tag: tags.concept_tag,
      secondary_lesson_keys: tags.secondary_lesson_keys || []
    })
    .eq('id', questionId);
}

// Example usage
await tagQuestion('uuid-question-1', {
  primary_lesson_key: 'verbs',
  concept_tag: 'subject_verb_agreement_with_intervening_phrase',
  secondary_lesson_keys: ['grammar-review'] // Related lessons
});
```

### Semi-Automated Tagging

**Use question_type classification to auto-suggest tags**:

```javascript
// scripts/tagging/auto-suggest-tags.mjs

const QUESTION_TYPE_TO_LESSON = {
  // English
  'subject_verb_agreement': {
    primary_lesson_key: 'verbs',
    concept_tag: 'subject_verb_agreement'
  },
  'comma_splice': {
    primary_lesson_key: 'commas',
    concept_tag: 'comma_splices',
    secondary_lesson_keys: ['sentence-structure']
  },
  'run_on_sentence': {
    primary_lesson_key: 'sentence-structure',
    concept_tag: 'run_on_sentences'
  },
  'misplaced_modifier': {
    primary_lesson_key: 'modifiers',
    concept_tag: 'misplaced_modifiers'
  },
  // ... etc
};

async function autoSuggestTags() {
  const questions = await supabase
    .from('act_questions')
    .select('*')
    .is('primary_lesson_key', null); // Untagged questions

  for (const question of questions.data) {
    const suggestion = QUESTION_TYPE_TO_LESSON[question.question_type];

    if (suggestion) {
      console.log(`Question ${question.question_number}: Suggested → ${suggestion.primary_lesson_key}`);
      // Save suggestion for human review
      await supabase
        .from('act_questions')
        .update({
          primary_lesson_key: suggestion.primary_lesson_key,
          concept_tag: suggestion.concept_tag
        })
        .eq('id', question.id);
    }
  }
}
```

### AI-Assisted Tagging

**Use Claude to analyze question and suggest mapping**:

```javascript
// scripts/tagging/ai-tag-questions.mjs

async function aiTagQuestion(question, availableLessons) {
  const prompt = `You are an ACT test expert. Analyze this question and determine which lesson concept it tests.

QUESTION:
${formatQuestionForAI(question)}

AVAILABLE LESSONS:
${JSON.stringify(availableLessons, null, 2)}

Task: Identify the PRIMARY concept this question tests and map it to the most relevant lesson.

Return JSON:
{
  "primary_lesson_key": "verbs",
  "concept_tag": "subject_verb_agreement_with_intervening_phrase",
  "reasoning": "This question tests whether student can identify subject-verb agreement when there's an intervening prepositional phrase",
  "secondary_lesson_keys": ["grammar-review"],
  "confidence": 0.95
}`;

  const response = await anthropic.messages.create({
    model: "claude-sonnet-4",
    max_tokens: 1024,
    messages: [{ role: "user", content: prompt }]
  });

  return JSON.parse(response.content[0].text);
}
```

---

## USER INTERFACE IMPLEMENTATION

### When Student Gets Question Wrong

**Frontend Flow**:

```javascript
// src/components/PracticeTest.js

async function handleAnswerSubmit(questionId, selectedAnswer, correctAnswer) {
  const isCorrect = selectedAnswer === correctAnswer;

  if (!isCorrect) {
    // Fetch lesson mapping
    const { data: question } = await supabase
      .from('act_questions')
      .select(`
        *,
        primary_lesson:lessons!primary_lesson_key (
          id,
          lesson_key,
          title,
          duration
        )
      `)
      .eq('id', questionId)
      .single();

    // Show feedback with lesson link
    showFeedback({
      correct: false,
      explanation: getExplanation(question),
      recommendedLesson: {
        title: question.primary_lesson.title,
        lesson_key: question.primary_lesson.lesson_key,
        concept: question.concept_tag,
        message: `This question tests ${formatConceptName(question.concept_tag)}. Study "${question.primary_lesson.title}" to master this concept.`
      }
    });
  }
}
```

### Feedback UI Component:

```jsx
// src/components/QuestionFeedback.jsx

function QuestionFeedback({ question, userAnswer, isCorrect }) {
  const { data: lessonMapping } = useQuery(
    ['lesson-mapping', question.id],
    () => fetchLessonMapping(question.id)
  );

  if (isCorrect) {
    return <CorrectFeedback />;
  }

  return (
    <div className="feedback incorrect">
      <h3>❌ Incorrect</h3>

      <div className="explanation">
        <h4>Why this answer is wrong:</h4>
        <p>{question.distractor_explanation[userAnswer]}</p>
      </div>

      <div className="correct-explanation">
        <h4>Why {question.correct_answer} is correct:</h4>
        <p>{question.correct_explanation}</p>
      </div>

      {/* LESSON RECOMMENDATION */}
      <div className="lesson-recommendation">
        <h4>📚 Learn This Concept</h4>
        <div className="concept-card">
          <div className="concept-name">
            {formatConceptName(lessonMapping.concept_tag)}
          </div>
          <div className="lesson-link">
            <span className="duration">{lessonMapping.primary_lesson.duration} min</span>
            <Link to={`/lessons/${lessonMapping.primary_lesson.lesson_key}`}>
              Study: {lessonMapping.primary_lesson.title}
            </Link>
          </div>
          {lessonMapping.lesson_section && (
            <div className="specific-section">
              Jump to: {lessonMapping.lesson_section}
            </div>
          )}
        </div>

        {/* Additional resources */}
        {lessonMapping.secondary_lessons?.length > 0 && (
          <div className="related-lessons">
            <h5>Related Lessons:</h5>
            <ul>
              {lessonMapping.secondary_lessons.map(lesson => (
                <li key={lesson.lesson_key}>
                  <Link to={`/lessons/${lesson.lesson_key}`}>
                    {lesson.title}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>

      {/* Similar practice questions */}
      <div className="similar-questions">
        <h4>Practice Similar Questions</h4>
        <button onClick={() => loadSimilarQuestions(lessonMapping.concept_tag)}>
          Get 5 more "{formatConceptName(lessonMapping.concept_tag)}" questions
        </button>
      </div>
    </div>
  );
}
```

### Test Review Dashboard

**Show concept breakdown**:

```jsx
// src/components/TestReview.jsx

function TestReviewDashboard({ testResults }) {
  const conceptAnalysis = analyzeConceptPerformance(testResults);

  return (
    <div className="test-review">
      <h2>Test Review - Concept Breakdown</h2>

      <div className="score-overview">
        <h3>Score: {testResults.score}/36</h3>
        <p>{testResults.correct}/{testResults.total} questions correct</p>
      </div>

      {/* Concepts to study */}
      <div className="weak-concepts">
        <h3>🎯 Focus on These Concepts:</h3>
        {conceptAnalysis.weak.map(concept => (
          <ConceptCard
            key={concept.tag}
            concept={concept}
            performance={concept.performance}
            recommendedLesson={concept.lesson}
          />
        ))}
      </div>

      {/* Concepts mastered */}
      <div className="strong-concepts">
        <h3>✅ Concepts You've Mastered:</h3>
        {conceptAnalysis.strong.map(concept => (
          <ConceptBadge key={concept.tag} concept={concept} />
        ))}
      </div>
    </div>
  );
}

function analyzeConceptPerformance(results) {
  const conceptStats = {};

  results.questions.forEach(q => {
    const concept = q.concept_tag;
    if (!conceptStats[concept]) {
      conceptStats[concept] = {
        total: 0,
        correct: 0,
        lesson: q.primary_lesson
      };
    }
    conceptStats[concept].total++;
    if (q.user_answer === q.correct_answer) {
      conceptStats[concept].correct++;
    }
  });

  // Categorize
  const weak = [];
  const strong = [];

  Object.entries(conceptStats).forEach(([tag, stats]) => {
    const performance = stats.correct / stats.total;
    const conceptData = { tag, ...stats, performance };

    if (performance < 0.7) {
      weak.push(conceptData);
    } else if (performance >= 0.9) {
      strong.push(conceptData);
    }
  });

  return { weak, strong };
}
```

---

## STUDY PATH GENERATOR

### Based on Wrong Answers → Create Personalized Study Plan

```javascript
// scripts/analysis/generate-study-path.mjs

async function generateStudyPath(studentId, testResults) {
  // 1. Identify weak concepts
  const weakConcepts = identifyWeakConcepts(testResults);

  // 2. Get prerequisite graph
  const prerequisiteGraph = await buildPrerequisiteGraph();

  // 3. Order concepts by prerequisites
  const orderedConcepts = topologicalSort(weakConcepts, prerequisiteGraph);

  // 4. Generate study plan
  const studyPlan = {
    student_id: studentId,
    generated_at: new Date(),
    total_study_time: calculateTotalTime(orderedConcepts),
    milestones: orderedConcepts.map((concept, index) => ({
      order: index + 1,
      concept_tag: concept.tag,
      lesson_key: concept.lesson_key,
      estimated_time: concept.duration,
      why_study: `You answered ${concept.incorrect_count} out of ${concept.total_count} questions wrong on this concept.`,
      practice_questions_count: 10
    }))
  };

  return studyPlan;
}

// Example output:
{
  student_id: 'user-123',
  total_study_time: 120, // minutes
  milestones: [
    {
      order: 1,
      concept_tag: 'subject_verb_agreement',
      lesson_key: 'verbs',
      estimated_time: 15,
      why_study: 'You answered 3 out of 5 questions wrong on this concept.',
      practice_questions_count: 10
    },
    {
      order: 2,
      concept_tag: 'subject_verb_agreement_with_intervening_phrase',
      lesson_key: 'verbs',
      estimated_time: 10,
      why_study: 'You answered 2 out of 3 questions wrong on this concept.',
      practice_questions_count: 10,
      prerequisite_of: ['subject_verb_agreement']
    }
    // ... more milestones
  ]
}
```

---

## ANALYTICS & INSIGHTS

### Track Which Concepts Are Hardest

```sql
-- Most commonly missed concepts
SELECT
  concept_tag,
  concept_name,
  COUNT(*) as total_questions,
  AVG(success_rate) as avg_success_rate,
  primary_lesson_key
FROM act_questions q
JOIN concept_to_lesson_mapping c ON c.concept_tag = q.concept_tag
GROUP BY concept_tag, concept_name, primary_lesson_key
ORDER BY avg_success_rate ASC
LIMIT 20;
```

### Lesson Effectiveness

```sql
-- Which lessons most improve student performance?
SELECT
  l.title,
  l.lesson_key,
  COUNT(DISTINCT ul.user_id) as students_who_studied,
  AVG(ul.improvement_score) as avg_improvement
FROM lessons l
JOIN user_lesson_progress ul ON ul.lesson_id = l.id
GROUP BY l.id, l.title, l.lesson_key
ORDER BY avg_improvement DESC;
```

---

## IMPLEMENTATION CHECKLIST

### Phase 1: Database Updates
- [ ] Add lesson mapping columns to `act_questions` table
- [ ] Create `concept_to_lesson_mapping` table
- [ ] Populate concept taxonomy (all 4 sections)
- [ ] Create indexes for performance

### Phase 2: Tagging Questions
- [ ] Build tagging interface/script
- [ ] Create question_type → lesson_key mapping
- [ ] Tag all English questions (~525)
- [ ] Tag all Math questions (~420)
- [ ] Tag all Reading questions (~280)
- [ ] Tag all Science questions (~280)
- [ ] Validate 100% coverage (all questions tagged)

### Phase 3: Frontend Integration
- [ ] Build `QuestionFeedback` component
- [ ] Add lesson recommendation to wrong answers
- [ ] Create `TestReview` dashboard with concept breakdown
- [ ] Build "Practice Similar Questions" feature
- [ ] Add "Study Path Generator"

### Phase 4: Analytics
- [ ] Track which concepts are hardest
- [ ] Measure lesson effectiveness
- [ ] Build teacher dashboard (see where students struggle)

---

## EXPECTED IMPACT

### Student Experience Improvement

**Before:**
- Gets question wrong
- Sees "Correct answer: C"
- No idea what to study
- Repeat same mistakes

**After:**
- Gets question wrong
- Sees WHY answer is wrong
- Gets directed to exact 15-min lesson
- Studies concept
- Practices 10 similar questions
- Masters concept
- Never misses that question type again

### Measurable Outcomes

1. **Reduced Study Time**: Students study exactly what they need (not everything)
2. **Higher Score Improvement**: Targeted practice → faster improvement
3. **Better Engagement**: Clear path forward keeps students motivated
4. **Data-Driven Teaching**: See exactly which concepts need better lessons

---

**This is the missing link that transforms your app from "practice tests" to "adaptive learning platform"!**
