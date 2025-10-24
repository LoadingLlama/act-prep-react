# PHASE 4: GENERATION SYSTEM
**Duration**: 2-3 weeks | **Deliverable**: AI-powered question generation system

**📖 Navigation**: [← Phase 3](./04-PHASE-3-ANALYSIS.md) | [Index](./00-MASTER-INDEX.md) | [Next: Phase 5 Validation →](./06-PHASE-5-VALIDATION.md)

---

## OVERVIEW

Use the pattern library from Phase 3 to generate NEW questions that are indistinguishable from real ACT questions.

**Goals**:
1. Build template-based generator (deterministic)
2. Build AI-assisted generator (creative)
3. Build hybrid generator (best of both)
4. Generate complete passages
5. Assemble full practice tests
6. Implement quality control

**Success Metric**: Generated questions achieve 90%+ similarity to real ACT questions

---

## TASK 4.1: TEMPLATE-BASED GENERATOR

**Duration**: 3-4 days

### Approach: Deterministic Pattern Filling

**Best For**:
- Subject-verb agreement (English)
- Basic punctuation (English)
- Pre-algebra calculations (Math)
- Direct data lookup (Science)
- Questions with clear structural patterns

### Template Generator Class

```javascript
// scripts/generation/template-generator.mjs
import { supabase } from '../database/db-utils.mjs';

export class TemplateGenerator {
  constructor() {
    this.patterns = new Map();
  }

  async loadPattern(patternId) {
    const { data: pattern } = await supabase
      .from('act_question_patterns')
      .select('*')
      .eq('id', patternId)
      .single();

    this.patterns.set(patternId, pattern);
    return pattern;
  }

  async generateQuestion(patternId, customVariables = {}) {
    const pattern = this.patterns.get(patternId) || await this.loadPattern(patternId);

    // Select random values for template variables
    const variables = this.selectVariables(pattern, customVariables);

    // Fill template
    const questionStem = this.fillTemplate(pattern.stem_template, variables);

    // Generate correct answer
    const correctAnswer = this.evaluateFormula(pattern.correct_answer_formula, variables);

    // Generate distractors
    const distractors = this.generateDistractors(pattern, correctAnswer, variables);

    // Shuffle and assign letters
    const answerChoices = this.shuffleAnswers(correctAnswer, distractors);

    const generatedQuestion = {
      section: pattern.section,
      question_type: pattern.question_type,
      question_stem: questionStem,
      ...answerChoices.choices,
      correct_answer: answerChoices.correctLetter,
      difficulty_level: this.estimateDifficulty(pattern),
      pattern_id: patternId,
      generation_method: 'template',
      primary_lesson_key: this.inferLessonKey(pattern.question_type)
    };

    return generatedQuestion;
  }

  selectVariables(pattern, customVariables) {
    const variables = { ...customVariables };

    for (const [key, options] of Object.entries(pattern.example_variables)) {
      if (!variables[key]) {
        // Select random option
        variables[key] = options[Math.floor(Math.random() * options.length)];
      }
    }

    return variables;
  }

  fillTemplate(template, variables) {
    let filled = template;

    for (const [key, value] of Object.entries(variables)) {
      const placeholder = `{${key}}`;
      filled = filled.replace(new RegExp(placeholder, 'g'), value);
    }

    return filled;
  }

  evaluateFormula(formula, variables) {
    // Handle different formula types
    if (typeof formula === 'string') {
      // Math formula - evaluate safely
      return this.evaluateMathFormula(formula, variables);
    } else if (typeof formula === 'object') {
      // Rule-based formula
      return this.applyRule(formula, variables);
    }

    return formula;
  }

  evaluateMathFormula(formula, variables) {
    // Replace variables in formula
    let expr = formula;
    for (const [key, value] of Object.entries(variables)) {
      expr = expr.replace(new RegExp(`\\b${key}\\b`, 'g'), value);
    }

    // Safe evaluation (use a math parser library in production)
    try {
      // For demo - in production use math.js or similar
      return eval(expr);
    } catch (error) {
      console.error('Formula evaluation error:', error);
      return null;
    }
  }

  applyRule(rule, variables) {
    // Apply logical rules for non-math questions
    // Example: Subject-verb agreement rules
    if (rule.type === 'agreement') {
      return this.applyAgreementRule(rule, variables);
    }

    return rule.default;
  }

  generateDistractors(pattern, correctAnswer, variables) {
    const distractors = [];

    for (const [type, rule] of Object.entries(pattern.distractor_rules)) {
      const distractor = this.applyDistractorRule(rule, correctAnswer, variables);
      if (distractor !== correctAnswer) {
        distractors.push({
          value: distractor,
          type: type,
          explanation: rule.description || rule
        });
      }
    }

    // Ensure we have exactly 3 distractors (for 4-choice) or 4 (for 5-choice)
    const targetCount = pattern.section === 'math' ? 4 : 3;
    while (distractors.length < targetCount) {
      // Generate additional random distractor
      distractors.push(this.generateFallbackDistractor(correctAnswer));
    }

    return distractors.slice(0, targetCount);
  }

  applyDistractorRule(rule, correctAnswer, variables) {
    if (typeof rule === 'object' && rule.formula) {
      return this.evaluateFormula(rule.formula, variables);
    } else if (typeof rule === 'string') {
      return this.fillTemplate(rule, variables);
    }

    return correctAnswer + ' (error)';
  }

  generateFallbackDistractor(correctAnswer) {
    // Generate plausible wrong answer when rules don't cover
    if (typeof correctAnswer === 'number') {
      const variations = [
        correctAnswer * 2,
        correctAnswer / 2,
        correctAnswer + 1,
        correctAnswer - 1,
        -correctAnswer
      ];
      return variations[Math.floor(Math.random() * variations.length)];
    }

    return correctAnswer + ' (modified)';
  }

  shuffleAnswers(correctAnswer, distractors) {
    const allAnswers = [
      { value: correctAnswer, isCorrect: true },
      ...distractors.map(d => ({ value: d.value || d, isCorrect: false }))
    ];

    // Shuffle
    for (let i = allAnswers.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [allAnswers[i], allAnswers[j]] = [allAnswers[j], allAnswers[i]];
    }

    // Assign letters
    const letters = ['A', 'B', 'C', 'D', 'E'];
    const choices = {};
    let correctLetter = '';

    allAnswers.forEach((answer, index) => {
      const letter = letters[index];
      choices[`choice_${letter.toLowerCase()}`] = answer.value;

      if (answer.isCorrect) {
        correctLetter = letter;
      }
    });

    return { choices, correctLetter };
  }

  estimateDifficulty(pattern) {
    // Estimate from pattern's average difficulty
    const avgDiff = pattern.average_difficulty || 0.5;

    if (avgDiff < 0.33) return 'easy';
    if (avgDiff < 0.67) return 'medium';
    return 'hard';
  }

  inferLessonKey(questionType) {
    // Map question type to lesson (use mapping from lesson tagging)
    const typeToLesson = {
      'subject_verb_agreement': 'verbs',
      'punctuation_commas': 'commas',
      'quadratic_equations': 'quadratics',
      // ... full mapping
    };

    return typeToLesson[questionType] || null;
  }
}

// Usage example
const generator = new TemplateGenerator();
const question = await generator.generateQuestion(patternId);
console.log(question);
```

### Batch Generation

```javascript
// Generate multiple questions from a pattern
export async function generateQuestionBatch(patternId, count = 10) {
  const generator = new TemplateGenerator();
  const questions = [];

  for (let i = 0; i < count; i++) {
    const question = await generator.generateQuestion(patternId);
    questions.push(question);

    // Ensure variety - don't reuse exact same variables
    await new Promise(resolve => setTimeout(resolve, 100));
  }

  return questions;
}
```

---

## TASK 4.2: AI-ASSISTED GENERATOR

**Duration**: 4-5 days

### Approach: Claude-Powered Generation

**Best For**:
- Rhetorical skills (English)
- Reading comprehension questions
- Complex math word problems
- Science research summaries
- Anything requiring natural language creativity

### AI Generator Class

```javascript
// scripts/generation/ai-generator.mjs
import Anthropic from '@anthropic-ai/sdk';
import { supabase } from '../database/db-utils.mjs';

const anthropic = new Anthropic({
  apiKey: process.env.ANTHROPIC_API_KEY
});

export class AIGenerator {
  async generateQuestion(pattern, context = {}) {
    // Get example questions for this pattern
    const examples = await this.getExampleQuestions(pattern);

    // Build comprehensive prompt
    const prompt = this.buildPrompt(pattern, examples, context);

    // Call Claude API
    const response = await anthropic.messages.create({
      model: 'claude-3-5-sonnet-20241022',
      max_tokens: 4096,
      temperature: 0.7, // Some creativity, but controlled
      messages: [{
        role: 'user',
        content: prompt
      }]
    });

    // Parse response
    const generatedQuestion = this.parseResponse(response.content[0].text);

    // Add metadata
    generatedQuestion.pattern_id = pattern.id;
    generatedQuestion.generation_method = 'ai_assisted';
    generatedQuestion.ai_model = 'claude-3-5-sonnet-20241022';
    generatedQuestion.section = pattern.section;
    generatedQuestion.question_type = pattern.question_type;

    return generatedQuestion;
  }

  async getExampleQuestions(pattern) {
    const { data: examples } = await supabase
      .from('act_questions')
      .select('*')
      .in('id', pattern.example_question_ids || [])
      .limit(3);

    return examples || [];
  }

  buildPrompt(pattern, examples, context) {
    const systemContext = `You are an expert ACT test writer with 20+ years of experience. Your job is to generate authentic ACT practice questions that are indistinguishable from official ACT questions.

CRITICAL REQUIREMENTS:
1. Match official ACT style, tone, and difficulty EXACTLY
2. Follow the provided pattern structure precisely
3. Create plausible distractors using specified error types
4. Use appropriate vocabulary for high school juniors/seniors
5. Ensure grammatical perfection
6. Make questions fair and unambiguous

PATTERN DETAILS:
${JSON.stringify(pattern, null, 2)}

DISTRACTOR RULES (CRITICAL):
${this.formatDistractorRules(pattern.distractor_rules)}`;

    const examplesSection = examples.length > 0 ? `

EXAMPLE REAL ACT QUESTIONS OF THIS TYPE:

${examples.map((q, i) => `
Example ${i + 1}:
Question: ${q.question_stem}
A) ${q.choice_a}
B) ${q.choice_b}
C) ${q.choice_c}
D) ${q.choice_d}
${q.choice_e ? `E) ${q.choice_e}` : ''}
Correct Answer: ${q.correct_answer}
`).join('\n')}` : '';

    const generationRequest = `

GENERATION REQUEST:
- Section: ${pattern.section}
- Type: ${pattern.question_type}
- Difficulty: ${context.difficulty || pattern.difficulty_range || 'medium'}
${context.topic ? `- Topic: ${context.topic}` : ''}
${context.passageContext ? `- Passage Context: ${context.passageContext}` : ''}

Generate 1 new question following this EXACT format:

\`\`\`json
{
  "question_stem": "The complete question text here",
  "choice_a": "First answer choice",
  "choice_b": "Second answer choice",
  "choice_c": "Third answer choice",
  "choice_d": "Fourth answer choice",
  ${pattern.section === 'math' ? '"choice_e": "Fifth answer choice (math only)",' : ''}
  "correct_answer": "A",
  "correct_explanation": "Why the correct answer is right (2-3 sentences)",
  "distractor_explanations": {
    "B": "Why B is wrong - include error type",
    "C": "Why C is wrong - include error type",
    "D": "Why D is wrong - include error type"
    ${pattern.section === 'math' ? ',"E": "Why E is wrong - include error type"' : ''}
  },
  "difficulty_score": 0.65,
  "key_concept": "Main concept tested"
}
\`\`\`

IMPORTANT:
- Return ONLY the JSON, no other text
- Ensure distractors match the specified error types
- Make the question authentic and test-worthy
- Correct answer should be definitively correct
- Wrong answers should be plausibly tempting`;

    return systemContext + examplesSection + generationRequest;
  }

  formatDistractorRules(rules) {
    if (!rules || typeof rules !== 'object') return 'Generate plausible distractors';

    return Object.entries(rules)
      .map(([type, rule]) => {
        const description = typeof rule === 'object' ? rule.description : rule;
        return `- ${type}: ${description}`;
      })
      .join('\n');
  }

  parseResponse(responseText) {
    try {
      // Extract JSON from markdown code blocks if present
      const jsonMatch = responseText.match(/```json\s*([\s\S]*?)\s*```/);
      const jsonText = jsonMatch ? jsonMatch[1] : responseText;

      const parsed = JSON.parse(jsonText);

      // Validate required fields
      if (!parsed.question_stem || !parsed.correct_answer) {
        throw new Error('Missing required fields in generated question');
      }

      return parsed;
    } catch (error) {
      console.error('Failed to parse AI response:', error);
      console.error('Response text:', responseText);
      throw error;
    }
  }
}

// Usage
const aiGenerator = new AIGenerator();
const question = await aiGenerator.generateQuestion(pattern, {
  difficulty: 'hard',
  topic: 'photosynthesis'
});
```

### Prompt Engineering Best Practices

```javascript
// Different prompts for different sections
const sectionPrompts = {
  english: {
    grammar: `Focus on creating ONE clear grammatical error that can be corrected.
    - Error must be unambiguous
    - Correction must be definitive
    - Follow standard English conventions exactly`,

    rhetorical: `Create a question that tests:
    - Understanding of author's purpose
    - Effectiveness of word choice
    - Logical organization
    - Appropriate tone and style

    Ensure the "correct" answer genuinely improves the passage.`
  },

  math: {
    wordProblem: `Create a realistic scenario that requires:
    - Clear setup with all necessary information
    - No trick questions or ambiguity
    - Straightforward mathematical solution
    - Answer in the requested units/format`,

    concept: `Test conceptual understanding, not just computation:
    - Question should require understanding WHY, not just HOW
    - Distractors should represent common misconceptions
    - Correct answer should be mathematically sound`
  },

  reading: {
    detail: `Question should:
    - Ask about specific information stated in passage
    - Have ONE clearly correct answer directly from text
    - Include plausible distractors from other parts of passage`,

    inference: `Question should require:
    - Reading between the lines
    - Logical deduction from evidence
    - Understanding of implicit meaning
    - BUT answer must still be definitively supportable`
  },

  science: {
    dataRep: `Create a question that:
    - References specific data from figure/table
    - Tests ability to read graphs/tables accurately
    - May require simple calculation or trend identification
    - Has unambiguous correct answer from the data`
  }
};
```

---

## TASK 4.3: HYBRID GENERATOR

**Duration**: 3-4 days

### Best of Both Worlds

**Approach**: Template provides structure, AI adds authenticity

```javascript
// scripts/generation/hybrid-generator.mjs
import { TemplateGenerator } from './template-generator.mjs';
import { AIGenerator } from './ai-generator.mjs';

export class HybridGenerator {
  constructor() {
    this.templateGen = new TemplateGenerator();
    this.aiGen = new AIGenerator();
  }

  async generateQuestion(pattern, context = {}) {
    // Step 1: Use template to generate structure
    const templateQuestion = await this.templateGen.generateQuestion(pattern.id);

    // Step 2: Use AI to enhance/rewrite for naturalness
    const enhancedQuestion = await this.enhanceWithAI(templateQuestion, pattern);

    // Step 3: Validate and combine best elements
    const finalQuestion = this.combineStrengths(templateQuestion, enhancedQuestion);

    finalQuestion.generation_method = 'hybrid';
    return finalQuestion;
  }

  async enhanceWithAI(templateQuestion, pattern) {
    const enhancementPrompt = `You are refining an ACT question to make it more natural and authentic.

TEMPLATE-GENERATED QUESTION:
${JSON.stringify(templateQuestion, null, 2)}

TASK: Improve the phrasing and naturalness while:
1. KEEPING the same core concept and difficulty
2. KEEPING the same answer choices (reword if needed)
3. KEEPING the same correct answer
4. Making the language more natural and ACT-like
5. Ensuring grammatical perfection

Return the enhanced question in the same JSON format.`;

    const response = await anthropic.messages.create({
      model: 'claude-3-5-sonnet-20241022',
      max_tokens: 2048,
      messages: [{ role: 'user', content: enhancementPrompt }]
    });

    return this.aiGen.parseResponse(response.content[0].text);
  }

  combineStrengths(templateQ, aiQ) {
    // Use template's mathematical correctness
    // Use AI's natural language
    return {
      ...templateQ,
      question_stem: aiQ.question_stem || templateQ.question_stem,
      choice_a: this.selectBetterChoice(templateQ.choice_a, aiQ.choice_a),
      choice_b: this.selectBetterChoice(templateQ.choice_b, aiQ.choice_b),
      choice_c: this.selectBetterChoice(templateQ.choice_c, aiQ.choice_c),
      choice_d: this.selectBetterChoice(templateQ.choice_d, aiQ.choice_d),
      choice_e: templateQ.choice_e ? this.selectBetterChoice(templateQ.choice_e, aiQ.choice_e) : null
    };
  }

  selectBetterChoice(templateChoice, aiChoice) {
    // Prefer AI's natural language if mathematically equivalent
    // Prefer template's if AI changed meaning
    if (!aiChoice) return templateChoice;

    // Simple heuristic: use AI version if reasonable length
    if (aiChoice.length > 0 && aiChoice.length < 200) {
      return aiChoice;
    }

    return templateChoice;
  }
}
```

---

## TASK 4.4: PASSAGE GENERATION

**Duration**: 5-6 days

### Reading Passage Generator

```javascript
// scripts/generation/generate-reading-passage.mjs
export class ReadingPassageGenerator {
  async generatePassage(specifications) {
    const {
      passageType, // 'prose_fiction', 'social_science', 'humanities', 'natural_science'
      topic,
      wordCount = 850,
      readingLevel = 11,
      themes = []
    } = specifications;

    // Get example passages of this type
    const examples = await this.getExamplePassages(passageType);

    const prompt = `Generate an ACT Reading passage with these specifications:

TYPE: ${passageType}
TOPIC: ${topic}
LENGTH: ${wordCount} words (±50 words)
READING LEVEL: Grade ${readingLevel} (Flesch-Kincaid)
THEMES: ${themes.join(', ')}

REQUIREMENTS:
1. Must support 10 reading comprehension questions:
   - 2-3 main idea/purpose questions
   - 3-4 detail questions
   - 3-4 inference questions
   - 1 vocabulary in context question

2. Writing Style Guidelines for ${passageType}:
${this.getStyleGuidelines(passageType)}

3. Structure:
   - Clear introduction
   - Well-organized body paragraphs
   - Coherent conclusion (if applicable)
   - Natural paragraph transitions

4. Content Requirements:
   - Include specific details that can be questioned
   - Present ideas that require inference
   - Include 2-3 vocabulary words suitable for context questions
   - Maintain consistent tone throughout

EXAMPLE PASSAGES OF THIS TYPE:
${examples.map((p, i) => `
Example ${i + 1}:
${p.full_text.substring(0, 500)}...
`).join('\n')}

Generate the complete passage now (return as plain text, ${wordCount} words):`;

    const response = await anthropic.messages.create({
      model: 'claude-3-5-sonnet-20241022',
      max_tokens: 4096,
      messages: [{ role: 'user', content: prompt }]
    });

    const passageText = response.content[0].text;

    // Validate passage
    const validation = await this.validatePassage(passageText, specifications);

    if (!validation.valid) {
      console.warn('Passage validation issues:', validation.issues);
      // Optionally regenerate
    }

    // Generate 10 questions for this passage
    const questions = await this.generateQuestionsForPassage(passageText, passageType);

    return {
      passage: {
        title: topic,
        topic_category: topic,
        full_text: passageText,
        word_count: passageText.split(/\s+/).length,
        reading_level: readingLevel,
        writing_style: passageType,
        themes: themes
      },
      questions: questions
    };
  }

  getStyleGuidelines(passageType) {
    const guidelines = {
      'prose_fiction': `
      - Narrative storytelling with characters and plot
      - Descriptive language and imagery
      - Character development and dialogue
      - Literary devices (metaphor, simile, etc.)`,

      'social_science': `
      - Analytical and explanatory tone
      - Evidence-based arguments
      - Clear thesis and supporting points
      - Academic but accessible language`,

      'humanities': `
      - Thoughtful and reflective tone
      - Discussion of ideas, art, culture, philosophy
      - Balance of description and analysis
      - Sophisticated but not overly technical`,

      'natural_science': `
      - Expository and informative
      - Clear explanations of scientific concepts
      - Use of examples and analogies
      - Precise scientific terminology with context`
    };

    return guidelines[passageType] || '';
  }

  async validatePassage(text, specs) {
    const wordCount = text.split(/\s+/).length;
    const issues = [];

    // Check word count
    if (Math.abs(wordCount - specs.wordCount) > 100) {
      issues.push(`Word count ${wordCount} differs from target ${specs.wordCount}`);
    }

    // Check reading level (would use actual readability formula)
    // For now, simple heuristic: avg sentence length
    const sentences = text.split(/[.!?]+/).length;
    const avgSentenceLength = wordCount / sentences;

    if (avgSentenceLength < 10 || avgSentenceLength > 30) {
      issues.push(`Unusual average sentence length: ${avgSentenceLength}`);
    }

    return {
      valid: issues.length === 0,
      issues: issues
    };
  }

  async generateQuestionsForPassage(passageText, passageType) {
    // Generate 10 questions: varied types
    const questionTypes = [
      { type: 'main_idea', count: 2 },
      { type: 'detail', count: 3 },
      { type: 'inference', count: 4 },
      { type: 'vocabulary', count: 1 }
    ];

    const questions = [];

    for (const { type, count } of questionTypes) {
      for (let i = 0; i < count; i++) {
        const question = await this.generateSingleQuestion(passageText, type);
        questions.push(question);
      }
    }

    return questions;
  }

  async generateSingleQuestion(passageText, questionType) {
    const prompt = `Based on this passage, generate 1 ACT Reading question.

PASSAGE:
${passageText}

QUESTION TYPE: ${questionType}

Generate a ${questionType} question with 4 answer choices.
${this.getQuestionTypeGuidance(questionType)}

Return in JSON format:
{
  "question_stem": "...",
  "choice_a": "...",
  "choice_b": "...",
  "choice_c": "...",
  "choice_d": "...",
  "correct_answer": "A",
  "explanation": "..."
}`;

    const response = await anthropic.messages.create({
      model: 'claude-3-5-sonnet-20241022',
      max_tokens: 1500,
      messages: [{ role: 'user', content: prompt }]
    });

    return JSON.parse(response.content[0].text);
  }

  getQuestionTypeGuidance(type) {
    const guidance = {
      'main_idea': 'Ask about the central theme or main point of the passage. The correct answer should capture the overall purpose, not just a detail.',

      'detail': 'Ask about a specific piece of information stated in the passage. The answer should be directly stated, not inferred.',

      'inference': 'Ask what can be logically concluded from the passage. The answer should be strongly supported by evidence but not explicitly stated.',

      'vocabulary': 'Ask what a specific word or phrase means as used in context. Include the line reference.'
    };

    return guidance[type] || '';
  }

  async getExamplePassages(passageType) {
    const { data } = await supabase
      .from('act_passages')
      .select('*')
      .eq('writing_style', passageType)
      .limit(2);

    return data || [];
  }
}
```

### Science Passage Generator

```javascript
// scripts/generation/generate-science-passage.mjs
export class SciencePassageGenerator {
  async generatePassage(specifications) {
    const {
      passageType, // 'data_representation', 'research_summary', 'conflicting_viewpoints'
      topic,
      figureCount = 2
    } = specifications;

    switch (passageType) {
      case 'data_representation':
        return this.generateDataRepresentation(topic, figureCount);

      case 'research_summary':
        return this.generateResearchSummary(topic);

      case 'conflicting_viewpoints':
        return this.generateConflictingViewpoints(topic);
    }
  }

  async generateDataRepresentation(topic, figureCount) {
    // Generate experimental scenario + synthetic data
    const prompt = `Create an ACT Science Data Representation passage about ${topic}.

REQUIREMENTS:
1. Brief introduction (2-3 sentences) explaining the experiment/observation
2. Description of ${figureCount} figures (graphs, tables, or charts)
3. The figures should present related data that can be questioned

Generate:
1. Introduction text
2. For each figure, provide:
   - Figure type (line graph, bar chart, table, etc.)
   - What the figure shows (axes, variables, units)
   - Sample data points

Return as JSON:
{
  "introduction": "...",
  "figures": [
    {
      "type": "line_graph",
      "title": "...",
      "x_axis": "...",
      "y_axis": "...",
      "description": "...",
      "data_points": [[x1, y1], [x2, y2], ...]
    }
  ]
}`;

    const response = await anthropic.messages.create({
      model: 'claude-3-5-sonnet-20241022',
      max_tokens: 3000,
      messages: [{ role: 'user', content: prompt }]
    });

    const passageData = JSON.parse(response.content[0].text);

    // Generate actual figure images (would use charting library)
    // For now, store data and description

    // Generate 5-7 questions about the data
    const questions = await this.generateDataQuestions(passageData);

    return {
      passage: {
        full_text: passageData.introduction,
        passage_type: 'data_representation',
        topic_category: topic,
        figure_count: figureCount
      },
      figures: passageData.figures,
      questions: questions
    };
  }

  async generateDataQuestions(passageData) {
    // Generate questions that test:
    // - Direct lookup
    // - Trend identification
    // - Comparison
    // - Extrapolation

    const questionTypes = [
      'direct_lookup',
      'direct_lookup',
      'trend_analysis',
      'comparison',
      'extrapolation'
    ];

    const questions = [];

    for (const type of questionTypes) {
      const q = await this.generateDataQuestion(passageData, type);
      questions.push(q);
    }

    return questions;
  }

  // ... similar for research_summary and conflicting_viewpoints
}
```

---

## TASK 4.5: FULL TEST GENERATOR

**Duration**: 3-4 days

### Assemble Complete Practice Test

```javascript
// scripts/generation/generate-full-test.mjs
export class FullTestGenerator {
  async generateTest(testNumber) {
    console.log(`Generating full ACT practice test ${testNumber}...`);

    const test = {
      test_number: testNumber,
      sections: {
        english: await this.generateEnglishSection(),
        math: await this.generateMathSection(),
        reading: await this.generateReadingSection(),
        science: await this.generateScienceSection()
      }
    };

    // Validate test statistics match real ACT distributions
    await this.validateTest(test);

    return test;
  }

  async generateEnglishSection() {
    // Generate 5 passages + 75 questions
    const passages = [];
    const questions = [];

    // Get target question type distribution from real tests
    const distribution = await this.getEnglishDistribution();

    // Generate 5 passages
    for (let i = 1; i <= 5; i++) {
      const passage = await this.generateEnglishPassage();
      passages.push(passage);

      // Generate 15 questions for this passage
      const passageQuestions = await this.generateEnglishQuestions(passage, 15, distribution);
      questions.push(...passageQuestions);
    }

    return { passages, questions };
  }

  async getEnglishDistribution() {
    // Calculate average distribution across all 7 tests
    const { data: stats } = await supabase
      .from('act_test_statistics')
      .select('english_stats');

    // Average the distributions
    const avgDistribution = this.calculateAverageDistribution(stats);

    return avgDistribution;
  }

  async generateEnglishQuestions(passage, count, distribution) {
    const questions = [];
    const typeAllocations = this.allocateQuestionTypes(distribution, count);

    for (const [type, count] of Object.entries(typeAllocations)) {
      const pattern = await this.getPatternForType('english', type);

      for (let i = 0; i < count; i++) {
        const question = await this.hybridGen.generateQuestion(pattern, {
          passageContext: passage.full_text
        });

        questions.push(question);
      }
    }

    // Enforce difficulty curve
    return this.applyDifficultyCurve(questions);
  }

  applyDifficultyCurve(questions) {
    // ACT tests get progressively harder
    // Questions 1-5: easy (avg 0.25)
    // Questions 6-10: medium (avg 0.50)
    // Questions 11-15: medium-hard (avg 0.65)

    const difficultyTargets = [
      { range: [0, 5], target: 0.30 },
      { range: [5, 10], target: 0.50 },
      { range: [10, 15], target: 0.70 }
    ];

    // Sort questions by current difficulty
    const sorted = [...questions].sort((a, b) =>
      (a.difficulty_score || 0.5) - (b.difficulty_score || 0.5)
    );

    // Assign to match curve
    const arranged = [];
    for (const { range, target } of difficultyTargets) {
      const [start, end] = range;
      arranged.push(...sorted.slice(start, end));
    }

    return arranged;
  }

  async generateMathSection() {
    // Generate 60 math questions matching ACT content distribution
    const questions = [];

    const contentAreas = {
      'pre_algebra': 14,
      'elementary_algebra': 10,
      'intermediate_algebra': 9,
      'coordinate_geometry': 9,
      'plane_geometry': 14,
      'trigonometry': 4
    };

    for (const [area, count] of Object.entries(contentAreas)) {
      const areaQuestions = await this.generateMathQuestions(area, count);
      questions.push(...areaQuestions);
    }

    // Apply strong difficulty curve (math gets significantly harder)
    return this.applyMathDifficultyCurve(questions);
  }

  applyMathDifficultyCurve(questions) {
    // Math difficulty curve:
    // Q1-20: 0.20-0.40
    // Q21-40: 0.40-0.60
    // Q41-60: 0.60-0.90

    const targets = [
      { range: [0, 20], min: 0.20, max: 0.40 },
      { range: [20, 40], min: 0.40, max: 0.60 },
      { range: [40, 60], min: 0.60, max: 0.90 }
    ];

    // Sort and distribute
    const sorted = [...questions].sort((a, b) =>
      (a.difficulty_score || 0.5) - (b.difficulty_score || 0.5)
    );

    return sorted;
  }

  async generateReadingSection() {
    // 4 passages, 10 questions each
    const passageTypes = ['prose_fiction', 'social_science', 'humanities', 'natural_science'];
    const passages = [];
    const questions = [];

    for (const type of passageTypes) {
      const readingGen = new ReadingPassageGenerator();
      const result = await readingGen.generatePassage({
        passageType: type,
        topic: this.selectTopic(type),
        wordCount: 850
      });

      passages.push(result.passage);
      questions.push(...result.questions);
    }

    return { passages, questions };
  }

  async generateScienceSection() {
    // 3 data rep + 3 research + 1 conflicting = 7 passages, ~40 questions
    const scienceGen = new SciencePassageGenerator();
    const passages = [];
    const questions = [];

    // 3 Data Representation passages
    for (let i = 0; i < 3; i++) {
      const result = await scienceGen.generatePassage({
        passageType: 'data_representation',
        topic: this.selectScienceTopic(),
        figureCount: 2
      });
      passages.push(result.passage);
      questions.push(...result.questions);
    }

    // 3 Research Summaries
    for (let i = 0; i < 3; i++) {
      const result = await scienceGen.generatePassage({
        passageType: 'research_summary',
        topic: this.selectScienceTopic()
      });
      passages.push(result.passage);
      questions.push(...result.questions);
    }

    // 1 Conflicting Viewpoints
    const cvResult = await scienceGen.generatePassage({
      passageType: 'conflicting_viewpoints',
      topic: this.selectScienceTopic()
    });
    passages.push(cvResult.passage);
    questions.push(...cvResult.questions);

    return { passages, questions };
  }

  async validateTest(test) {
    // Check that generated test matches statistical profile of real tests
    const checks = [
      this.validateQuestionCount(test),
      this.validateDifficultyDistribution(test),
      this.validateTopicDistribution(test),
      this.validateAnswerBalance(test)
    ];

    const results = await Promise.all(checks);
    const failures = results.filter(r => !r.passed);

    if (failures.length > 0) {
      console.warn('Test validation warnings:', failures);
    }

    return failures.length === 0;
  }
}
```

---

## TASK 4.6: QUALITY CONTROL

**Duration**: 2-3 days

### Automated Quality Checks

```javascript
// scripts/generation/quality-control.mjs
export class QualityControl {
  async validateQuestion(question) {
    const checks = [
      await this.checkGrammar(question),
      await this.checkAnswerBalance(question),
      await this.checkDistractorQuality(question),
      await this.checkDifficulty(question),
      await this.checkDuplicates(question),
      await this.checkCompleteness(question),
      await this.checkACTStyle(question)
    ];

    const failed = checks.filter(c => !c.passed);

    return {
      approved: failed.length === 0,
      score: checks.filter(c => c.passed).length / checks.length,
      failures: failed,
      recommendations: failed.map(f => f.recommendation)
    };
  }

  async checkGrammar(question) {
    // Use grammar checking library or API
    const text = `${question.question_stem} ${question.choice_a} ${question.choice_b} ${question.choice_c} ${question.choice_d}`;

    // Placeholder - would use actual grammar checker
    const errors = []; // await grammarChecker.check(text);

    return {
      name: 'Grammar Check',
      passed: errors.length === 0,
      details: errors,
      recommendation: errors.length > 0 ? 'Fix grammatical errors' : null
    };
  }

  async checkAnswerBalance(question) {
    // Check if correct answers are balanced across A, B, C, D
    // (This check would run on a batch of questions)
    return {
      name: 'Answer Balance',
      passed: true, // Placeholder
      details: 'Checked in batch validation'
    };
  }

  async checkDistractorQuality(question) {
    // Are wrong answers plausible?
    // Check: not obviously wrong, not too similar to correct

    const correctChoice = question[`choice_${question.correct_answer.toLowerCase()}`];
    const wrongChoices = ['A', 'B', 'C', 'D', 'E']
      .filter(l => l !== question.correct_answer)
      .map(l => question[`choice_${l.toLowerCase()}`])
      .filter(Boolean);

    // Check similarity
    const tooSimilar = wrongChoices.some(wrong =>
      this.calculateSimilarity(wrong, correctChoice) > 0.95
    );

    return {
      name: 'Distractor Quality',
      passed: !tooSimilar,
      details: tooSimilar ? 'Distractor too similar to correct answer' : 'OK',
      recommendation: tooSimilar ? 'Make distractors more distinct' : null
    };
  }

  async checkDuplicates(question) {
    // Check against existing questions
    const embedding = await this.getEmbedding(question.question_stem);

    // Would check against database of existing questions
    // Placeholder
    return {
      name: 'Duplicate Check',
      passed: true,
      details: 'No duplicates found'
    };
  }

  async checkCompleteness(question) {
    const required = [
      'question_stem',
      'choice_a',
      'choice_b',
      'choice_c',
      'choice_d',
      'correct_answer'
    ];

    if (question.section === 'math') {
      required.push('choice_e');
    }

    const missing = required.filter(field => !question[field]);

    return {
      name: 'Completeness Check',
      passed: missing.length === 0,
      details: missing.length > 0 ? `Missing: ${missing.join(', ')}` : 'Complete',
      recommendation: missing.length > 0 ? 'Fill in all required fields' : null
    };
  }

  async checkACTStyle(question) {
    // Check if question matches ACT style
    // - Appropriate length
    // - Clear and unambiguous
    // - Professional tone

    const stemLength = question.question_stem.length;
    const issues = [];

    if (stemLength < 10) issues.push('Question stem too short');
    if (stemLength > 500) issues.push('Question stem too long');

    // Check for informal language
    const informal = ['gonna', 'wanna', 'kinda', 'sorta'];
    const hasInformal = informal.some(word =>
      question.question_stem.toLowerCase().includes(word)
    );

    if (hasInformal) issues.push('Contains informal language');

    return {
      name: 'ACT Style Check',
      passed: issues.length === 0,
      details: issues.join('; '),
      recommendation: issues.length > 0 ? 'Revise to match ACT style' : null
    };
  }

  calculateSimilarity(str1, str2) {
    // Simple Levenshtein distance or cosine similarity
    // Placeholder
    return 0.5;
  }

  async getEmbedding(text) {
    // Would use OpenAI embeddings
    return [];
  }
}
```

---

## PHASE 4 DELIVERABLES

At the end of Phase 4, you will have:

- [ ] Template-based generator (deterministic patterns)
- [ ] AI-assisted generator (creative questions)
- [ ] Hybrid generator (best of both)
- [ ] Reading passage generator
- [ ] Science passage generator
- [ ] Full test generator
- [ ] Quality control system
- [ ] ~100+ generated questions validated
- [ ] Ability to generate unlimited practice tests

**Time Spent**: 2-3 weeks
**Cost**: ~$200-400 (API fees for AI generation)

---

## NEXT PHASE

**Ready to validate?** → **[Phase 5: Validation & Testing →](./06-PHASE-5-VALIDATION.md)**

Phase 5 covers:
- Similarity scoring
- Blind testing
- Statistical validation
- **6 IMPORTANT GAPS integrated**

---

**📖 Navigation**: [← Phase 3](./04-PHASE-3-ANALYSIS.md) | [Index](./00-MASTER-INDEX.md) | [Next: Phase 5 Validation →](./06-PHASE-5-VALIDATION.md)
