# PHASE 2: DATA EXTRACTION
**Duration**: 3-4 weeks | **Deliverable**: All 1,680 questions extracted with explanations

**📖 Navigation**: [← Phase 1](./02-PHASE-1-SETUP.md) | [Index](./00-MASTER-INDEX.md) | [Next: Phase 3 Analysis →](./04-PHASE-3-ANALYSIS.md)

---

## OVERVIEW

Extract all questions from 7 practice tests:
- **Per test**: 215 questions (75 English + 60 Math + 40 Reading + 40 Science)
- **Total**: 1,505 questions
- **Plus**: ~420 figures/diagrams
- **Plus**: Explanations for all questions
- **Plus**: Lesson tags for all questions

**Timeline**: 3-4 weeks

---

## TEST BREAKDOWN

| Section | Questions/Test | Passages/Test | Figures/Test | Total (7 tests) |
|---------|----------------|---------------|--------------|-----------------|
| English | 75 | 5 | 0 | 525 Q, 35 passages |
| Math | 60 | 0 | ~20 | 420 Q, 140 diagrams |
| Reading | 40 | 4 | 0 | 280 Q, 28 passages |
| Science | 40 | 6-7 | ~40 | 280 Q, ~45 passages, 280 figures |
| **TOTAL** | **215** | **15-16** | **~60** | **1,505 Q, ~108 passages, ~420 figures** |

---

## EXTRACTION STRATEGY

### Recommended Order (Easiest → Hardest)
1. **English** (most structured, clear format)
2. **Reading** (similar to English, clean passages)
3. **Math** (standalone questions, some diagrams)
4. **Science** (most complex, heavy figure processing)

### Per-Test Workflow
1. Extract all questions & passages
2. **🆕 Digitize figures** (Gap 1)
3. Tag questions to lessons
4. **🆕 Generate explanations** (Gap 2)
5. **🆕 Run duplicate detection** (Gap 3)
6. **🆕 3-tier QA process** (Gap 4)
7. Mark test as complete
8. Checkpoint & backup

---

## TASK 2.1: BUILD BASE PARSER

**Duration**: 2-3 days

### Create Parser Infrastructure

```javascript
// scripts/extraction/base-parser.mjs
import fs from 'fs/promises';
import path from 'path';

export class ACTParser {
  constructor(testFilePath) {
    this.testNumber = this.extractTestNumber(testFilePath);
    this.testPath = testFilePath;
    this.rawText = null;
  }

  async load() {
    this.rawText = await fs.readFile(this.testPath, 'utf-8');
    return this;
  }

  extractTestNumber(filePath) {
    const match = filePath.match(/Practice ACT (\d)/);
    return match ? parseInt(match[1]) : null;
  }

  extractSections() {
    // Split into English, Math, Reading, Science
    const sections = {
      english: this.extractEnglish(),
      math: this.extractMath(),
      reading: this.extractReading(),
      science: this.extractScience()
    };
    return sections;
  }

  extractEnglish() {
    // Find section boundaries
    const start = this.rawText.indexOf('ENGLISH TEST');
    const end = this.rawText.indexOf('MATHEMATICS TEST');
    return this.rawText.slice(start, end);
  }

  // ... similar for math, reading, science
}

// Question parser
export class QuestionParser {
  static parseQuestion(questionText, section) {
    const parts = {
      questionNumber: this.extractQuestionNumber(questionText),
      stem: this.extractStem(questionText),
      choices: this.extractChoices(questionText, section),
      underlinedPortion: section === 'english' ? this.extractUnderlined(questionText) : null
    };

    return parts;
  }

  static extractChoices(text, section) {
    // Math has A-E, others have A-D
    const letters = section === 'math' ? ['A', 'B', 'C', 'D', 'E'] : ['A', 'B', 'C', 'D'];
    const choices = {};

    for (const letter of letters) {
      const regex = new RegExp(`${letter}\\.\\s*(.+?)(?=${letters.join('|')}\\.|$)`, 's');
      const match = text.match(regex);
      if (match) {
        choices[`choice_${letter.toLowerCase()}`] = match[1].trim();
      }
    }

    return choices;
  }
}
```

### Validation Framework

```javascript
// scripts/extraction/validators.mjs
export function validateExtraction(extractedData, expected) {
  const errors = [];

  // Check question count
  if (extractedData.questions.length !== expected.totalQuestions) {
    errors.push(`Expected ${expected.totalQuestions} questions, got ${extractedData.questions.length}`);
  }

  // Check all have answers
  const missingAnswers = extractedData.questions.filter(q => !q.correct_answer);
  if (missingAnswers.length > 0) {
    errors.push(`${missingAnswers.length} questions missing answers`);
  }

  // Check all have 4-5 choices
  for (const q of extractedData.questions) {
    const choiceCount = [q.choice_a, q.choice_b, q.choice_c, q.choice_d, q.choice_e].filter(Boolean).length;
    const expectedChoices = q.section === 'math' ? 5 : 4;

    if (choiceCount !== expectedChoices) {
      errors.push(`Question ${q.question_number} has ${choiceCount} choices, expected ${expectedChoices}`);
    }
  }

  return {
    valid: errors.length === 0,
    errors,
    warnings: []
  };
}
```

---

## TASK 2.X: FIGURE DIGITIZATION

**Duration**: 2-3 hours per test (14-20 hours total)
**Why Important**: Without digitized figures, 40% of Science and 30% of Math questions would be incomplete

### Strategy: Hybrid Approach (Screenshot + Manual)

#### Step 1: Extract Figures from PDFs

**Tools Needed**:
- Original ACT tests (PDF format)
- Screenshot tool OR `pdftoppm` command-line tool

**Process**:
```bash
# Convert PDF pages to images
pdftoppm -png practice-act-1.pdf figures/test-1/page

# Or use screenshot tool:
# - Open PDF
# - Screenshot each figure
# - Save as test-{N}-{section}-{type}-{ref}.png
```

#### Step 2: Naming Convention

```
Format: test-{testNum}-{section}-{type}-{reference}.png

Examples:
- test-1-science-figure-1.png
- test-1-science-table-2.png
- test-3-math-q47-diagram.png
- test-5-science-passage-3-graph-1.png
```

#### Step 3: Upload to Supabase Storage

```javascript
// scripts/extraction/upload-figures.mjs
import { supabase } from '../database/db-utils.mjs';
import fs from 'fs';
import path from 'path';

export async function uploadFigure(filePath, testNumber, section) {
  const fileName = path.basename(filePath);
  const fileBuffer = fs.readFileSync(filePath);

  const { data, error } = await supabase.storage
    .from('act-figures')
    .upload(`test-${testNumber}/${section}/${fileName}`, fileBuffer, {
      contentType: 'image/png',
      upsert: true
    });

  if (error) throw error;

  // Get public URL
  const { data: urlData } = supabase.storage
    .from('act-figures')
    .getPublicUrl(data.path);

  return urlData.publicUrl;
}

// Batch upload
export async function uploadAllFigures(testNumber) {
  const figuresDir = `data/figures/test-${testNumber}`;
  const files = fs.readdirSync(figuresDir, { recursive: true });

  const urls = {};

  for (const file of files) {
    if (!file.endsWith('.png')) continue;

    const fullPath = path.join(figuresDir, file);
    const section = file.includes('science') ? 'science' : 'math';

    const url = await uploadFigure(fullPath, testNumber, section);
    urls[file] = url;

    console.log(`✅ Uploaded: ${file}`);
  }

  return urls;
}
```

#### Step 4: Link Figures to Questions

```javascript
// Update question with diagram URL
await supabase
  .from('act_questions')
  .update({
    diagram_url: figureUrl,
    diagram_description: 'Graph showing temperature vs time',
    figure_reference: 'Figure 1'
  })
  .eq('test_number', 1)
  .eq('question_number', 23);
```

#### Alt Text for Accessibility

```javascript
// Generate alt text descriptions
const altTextDescriptions = {
  'test-1-science-figure-1.png': 'Line graph showing temperature increasing from 20°C to 80°C over 10 minutes',
  'test-3-math-q47-diagram.png': 'Right triangle with legs of 3 and 4 units, hypotenuse unlabeled'
};
```

### Figure Digitization Checklist (Per Test)
- [ ] Extract all Science figures (~40 figures)
- [ ] Extract all Math diagrams (~20 diagrams)
- [ ] Name files using convention
- [ ] Upload to Supabase Storage
- [ ] Get public URLs
- [ ] Update questions with `diagram_url`
- [ ] Add alt text descriptions
- [ ] Verify all figures accessible

**Time**: 2-3 hours per test

---

## TASK 2.Y: ANSWER EXPLANATIONS

**Duration**: 1-2 hours per test (automated + review)
**Why Important**: Explanations are essential for students to learn from their mistakes and understand concepts

### Strategy: AI-Generated + Manual Review

#### Step 1: Create Explanation Generator

```javascript
// scripts/extraction/generate-explanations.mjs
import Anthropic from '@anthropic-ai/sdk';

const anthropic = new Anthropic({
  apiKey: process.env.ANTHROPIC_API_KEY
});

export async function generateExplanation(question) {
  const prompt = `You are an expert ACT tutor. Generate a clear, concise explanation for this question.

Section: ${question.section}
Question: ${question.question_stem}

Choices:
A) ${question.choice_a}
B) ${question.choice_b}
C) ${question.choice_c}
D) ${question.choice_d}
${question.choice_e ? `E) ${question.choice_e}` : ''}

Correct Answer: ${question.correct_answer}

Generate:
1. **Why the correct answer is right** (2-3 sentences)
2. **Key concept tested** (1-2 words, e.g., "Subject-Verb Agreement", "Pythagorean Theorem")
3. **Step-by-step solution** (for Math only, 3-5 steps)
4. **Why each wrong answer is wrong** (1 sentence each)

Format as JSON:
{
  "correctExplanation": "...",
  "keyConcept": "...",
  "solutionSteps": ["Step 1: ...", "Step 2: ..."], // Math only
  "distractorExplanations": {
    "A": "...",
    "B": "...",
    "C": "...",
    "D": "..."
  }
}`;

  const message = await anthropic.messages.create({
    model: 'claude-3-5-sonnet-20241022',
    max_tokens: 1500,
    messages: [{
      role: 'user',
      content: prompt
    }]
  });

  const response = message.content[0].text;
  return JSON.parse(response);
}
```

#### Step 2: Batch Generate for Test

```javascript
// Generate explanations for all questions in test
export async function generateTestExplanations(testNumber) {
  const { data: questions } = await supabase
    .from('act_questions')
    .select('*')
    .eq('test_number', testNumber);

  console.log(`Generating explanations for ${questions.length} questions...`);

  for (const question of questions) {
    const explanation = await generateExplanation(question);

    // Update question
    await supabase
      .from('act_questions')
      .update({
        correct_answer_explanation: explanation.correctExplanation,
        key_concept: explanation.keyConcept,
        solution_walkthrough: question.section === 'math' ? {
          steps: explanation.solutionSteps
        } : null
      })
      .eq('id', question.id);

    // Insert distractor explanations
    for (const [letter, explanation] of Object.entries(explanation.distractorExplanations)) {
      if (letter !== question.correct_answer) {
        await supabase
          .from('act_distractors')
          .insert({
            question_id: question.id,
            choice_letter: letter,
            choice_text: question[`choice_${letter.toLowerCase()}`],
            why_wrong: explanation,
            distractor_type: 'needs_classification' // Classify in Phase 3
          });
      }
    }

    console.log(`✅ Generated explanation for Q${question.question_number}`);

    // Rate limit: 1 request per 2 seconds
    await new Promise(resolve => setTimeout(resolve, 2000));
  }

  console.log(`✅ All explanations generated for Test ${testNumber}`);
}
```

#### Step 3: Manual Review (20% Sample)

```javascript
// scripts/extraction/review-explanations.mjs
export async function sampleForReview(testNumber, sampleRate = 0.2) {
  const { data: questions } = await supabase
    .from('act_questions')
    .select('*')
    .eq('test_number', testNumber)
    .order('RANDOM()')
    .limit(Math.floor(215 * sampleRate));

  // Generate review report
  console.log('\n=== EXPLANATION REVIEW REPORT ===\n');

  for (const q of questions) {
    console.log(`\n--- Question ${q.question_number} (${q.section}) ---`);
    console.log(`Stem: ${q.question_stem.substring(0, 100)}...`);
    console.log(`\nExplanation: ${q.correct_answer_explanation}`);
    console.log(`\n[ ] Accurate?`);
    console.log(`[ ] Clear?`);
    console.log(`[ ] ACT tone/style?`);
    console.log(`Notes: __________________________`);
  }
}
```

### Explanation Generation Checklist (Per Test)
- [ ] Generate explanations for all 215 questions
- [ ] Insert distractor explanations
- [ ] Sample 20% for manual review (~43 questions)
- [ ] Fix any inaccurate explanations
- [ ] Verify ACT tone/style matches

**Time**:
- Generation: ~10 minutes (automated, API calls)
- Review: 1-2 hours (manual)
- **Cost**: ~$5-10 per test in API fees

---

## TASK 2.Z: DUPLICATE DETECTION

**Duration**: 30 minutes per test
**Why Important**: Ensures students don't see the same question multiple times, which would reduce practice effectiveness

### Strategy: Embedding-Based Similarity

```javascript
// scripts/extraction/detect-duplicates.mjs
import { OpenAI } from 'openai';

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY
});

// Generate embedding for question
async function getEmbedding(text) {
  const response = await openai.embeddings.create({
    model: 'text-embedding-ada-002',
    input: text
  });

  return response.data[0].embedding;
}

// Calculate cosine similarity
function cosineSimilarity(a, b) {
  const dotProduct = a.reduce((sum, val, i) => sum + val * b[i], 0);
  const magA = Math.sqrt(a.reduce((sum, val) => sum + val * val, 0));
  const magB = Math.sqrt(b.reduce((sum, val) => sum + val * val, 0));
  return dotProduct / (magA * magB);
}

// Detect duplicates for new test
export async function detectDuplicates(testNumber) {
  // Get all questions from this test
  const { data: newQuestions } = await supabase
    .from('act_questions')
    .select('*')
    .eq('test_number', testNumber);

  // Get all questions from previous tests
  const { data: existingQuestions } = await supabase
    .from('act_questions')
    .select('*')
    .lt('test_number', testNumber);

  console.log(`Checking ${newQuestions.length} new questions against ${existingQuestions.length} existing...`);

  const duplicates = [];

  for (const newQ of newQuestions) {
    const newText = `${newQ.question_stem} ${newQ.choice_a} ${newQ.choice_b} ${newQ.choice_c} ${newQ.choice_d}`;
    const newEmbedding = await getEmbedding(newText);

    for (const existingQ of existingQuestions) {
      const existingText = `${existingQ.question_stem} ${existingQ.choice_a} ${existingQ.choice_b} ${existingQ.choice_c} ${existingQ.choice_d}`;
      const existingEmbedding = await getEmbedding(existingText);

      const similarity = cosineSimilarity(newEmbedding, existingEmbedding);

      if (similarity > 0.95) {
        // Mark as duplicate
        await supabase
          .from('act_questions')
          .update({
            is_duplicate: true,
            original_question_id: existingQ.id,
            similarity_score: similarity
          })
          .eq('id', newQ.id);

        duplicates.push({
          new: `Test ${newQ.test_number}, Q${newQ.question_number}`,
          existing: `Test ${existingQ.test_number}, Q${existingQ.question_number}`,
          similarity: similarity.toFixed(3)
        });

        console.log(`🔄 Duplicate found: ${duplicates[duplicates.length - 1].new} ≈ ${duplicates[duplicates.length - 1].existing}`);
      }
    }

    // Rate limit
    await new Promise(resolve => setTimeout(resolve, 500));
  }

  console.log(`\n✅ Found ${duplicates.length} duplicates`);
  return duplicates;
}
```

### Duplicate Detection Checklist (Per Test)
- [ ] Run duplicate detection after extraction
- [ ] Review high-similarity matches (>0.95)
- [ ] Mark confirmed duplicates
- [ ] Generate duplicate report

**Time**: 30 min per test
**Cost**: ~$5 per test (embeddings API)

---

## TASK 2.W: 3-TIER QA PROCESS

**Duration**: 30-120 min per test
**Why Important**: Quality assurance prevents hundreds of errors from entering the database and ensures data accuracy

### Tier 1: Automated Validation (100% Coverage)

```javascript
// scripts/extraction/tier1-validation.mjs
export function runTier1Validation(extractedData, testNumber) {
  const validations = [
    {
      name: 'Correct question count',
      check: () => extractedData.questions.length === 215,
      critical: true
    },
    {
      name: 'All questions have answers',
      check: () => extractedData.questions.every(q => q.correct_answer),
      critical: true
    },
    {
      name: 'All have 4-5 choices',
      check: () => extractedData.questions.every(q => {
        const count = [q.choice_a, q.choice_b, q.choice_c, q.choice_d, q.choice_e].filter(Boolean).length;
        return q.section === 'math' ? count === 5 : count === 4;
      }),
      critical: true
    },
    {
      name: 'Valid answer letters',
      check: () => extractedData.questions.every(q => {
        const valid = q.section === 'math' ? ['A','B','C','D','E'] : ['A','B','C','D'];
        return valid.includes(q.correct_answer);
      }),
      critical: true
    },
    {
      name: 'No duplicate question IDs',
      check: () => {
        const ids = extractedData.questions.map(q => q.id);
        return ids.length === new Set(ids).size;
      },
      critical: true
    },
    {
      name: 'Passages linked (English/Reading/Science)',
      check: () => {
        const passageQuestions = extractedData.questions.filter(q => ['english', 'reading', 'science'].includes(q.section));
        return passageQuestions.every(q => q.passage_id);
      },
      critical: false
    },
    {
      name: 'Figures uploaded (Science/Math)',
      check: () => {
        const figureQuestions = extractedData.questions.filter(q =>
          (q.section === 'science' || q.section === 'math') && q.figure_reference
        );
        return figureQuestions.every(q => q.diagram_url);
      },
      critical: false
    }
  ];

  const results = validations.map(v => ({
    ...v,
    passed: v.check()
  }));

  const criticalFailures = results.filter(r => r.critical && !r.passed);
  const warnings = results.filter(r => !r.critical && !r.passed);

  console.log('\n=== TIER 1 VALIDATION RESULTS ===\n');

  for (const result of results) {
    const icon = result.passed ? '✅' : (result.critical ? '❌' : '⚠️');
    console.log(`${icon} ${result.name}`);
  }

  console.log(`\n${criticalFailures.length} critical failures, ${warnings.length} warnings\n`);

  return {
    passed: criticalFailures.length === 0,
    criticalFailures,
    warnings
  };
}
```

**Pass Criteria**: 100% of critical checks must pass

### Tier 2: Random Sample Review (10% Coverage)

```javascript
// scripts/extraction/tier2-review.mjs
export async function generateTier2Review(testNumber) {
  const sampleSize = {
    english: 8,
    math: 6,
    reading: 4,
    science: 4
  };

  const review = {};

  for (const [section, count] of Object.entries(sampleSize)) {
    const { data: questions } = await supabase
      .from('act_questions')
      .select('*')
      .eq('test_number', testNumber)
      .eq('section', section)
      .order('RANDOM()')
      .limit(count);

    review[section] = questions;
  }

  // Generate review report
  console.log(`\n=== TIER 2 MANUAL REVIEW - TEST ${testNumber} ===\n`);
  console.log(`Sample: ${Object.values(sampleSize).reduce((a,b) => a+b, 0)} questions (10%)\n`);

  for (const [section, questions] of Object.entries(review)) {
    console.log(`\n--- ${section.toUpperCase()} (${questions.length} questions) ---\n`);

    for (const q of questions) {
      console.log(`\nQ${q.question_number}: ${q.question_stem.substring(0, 80)}...`);
      console.log(`\nChecklist:`);
      console.log(`[ ] Text matches source`);
      console.log(`[ ] All answer choices correct`);
      console.log(`[ ] Correct answer is actually correct`);
      console.log(`[ ] No typos or formatting errors`);
      console.log(`[ ] Passage linked correctly`);
      console.log(`[ ] Figures referenced correctly`);
      console.log(`[ ] Question type classification seems right`);
      console.log(`\nIssues: __________________________\n`);
    }
  }

  return review;
}
```

**Error Rate Calculation**:
```javascript
const issuesFound = 3; // From manual review
const questionsReviewed = 22;
const errorRate = issuesFound / questionsReviewed; // 0.136 = 13.6%

if (errorRate < 0.05) {
  console.log('✅ Quality acceptable (<5% error rate)');
} else if (errorRate < 0.10) {
  console.log('⚠️ Quality warning (5-10% error rate) - Review entire test');
} else {
  console.log('❌ Quality failure (>10% error rate) - Re-extract test');
}
```

### Tier 3: Targeted Deep Review (High-Risk Areas)

Focus on:
- Science questions with figures
- Math questions with diagrams
- "Which choice..." rhetorical questions
- First/last 5 questions of each section

**Time**: 1-2 hours if triggered

### QA Checklist (Per Test)
- [ ] Run Tier 1 automated validation → MUST PASS 100%
- [ ] Run Tier 2 manual review → Calculate error rate
- [ ] If error rate >5%, run Tier 3 on problem areas
- [ ] If error rate >10%, re-extract entire test
- [ ] Fix all critical errors
- [ ] Document non-critical issues
- [ ] Mark test as "QA Approved"

---

## FULL WORKFLOW (PER TEST)

### Day-by-Day Example (Test 1)

**Day 1: Extraction**
1. Parse English section (75 Q) - 3 hours
2. Parse Reading section (40 Q) - 2 hours
3. Parse Math section (60 Q) - 3 hours
4. Parse Science section (40 Q) - 4 hours
5. Extract answer keys - 1 hour
**Total**: 13 hours (1.5 days)

**Day 2: Figures & Explanations**
1. Screenshot/extract figures (60 figures) - 3 hours
2. Upload to Supabase Storage - 30 min
3. Link figures to questions - 30 min
4. Generate AI explanations (215 Q) - 15 min automated
5. Wait for API calls to complete - 30 min
**Total**: 5 hours

**Day 3: QA & Finalization**
1. Run duplicate detection - 30 min
2. Run Tier 1 validation - 5 min
3. Generate Tier 2 review report - 10 min
4. Manual review (22 questions) - 2 hours
5. Fix errors found - 1 hour
6. Final validation - 15 min
7. Tag questions to lessons - 1 hour
8. Backup & checkpoint - 10 min
**Total**: 5 hours

**Total per test**: 2-3 days

---

## PROGRESS TRACKING

```javascript
// Update progress after each section
await supabase
  .from('extraction_progress')
  .update({
    extracted_count: 75,
    extraction_status: 'completed',
    completed_at: new Date().toISOString()
  })
  .eq('test_number', 1)
  .eq('section', 'english');
```

---

## DELIVERABLES

After Phase 2, you will have:

- [ ] All 1,505 questions extracted
- [ ] All ~108 passages extracted
- [ ] ~420 figures digitized & uploaded
- [ ] Full explanations for all questions
- [ ] Duplicate questions marked
- [ ] <5% error rate validated
- [ ] All questions tagged to lessons
- [ ] 7 complete test extractions
- [ ] Daily backups

**Time Spent**: 3-4 weeks
**Cost**: ~$100-150 (API fees)

---

## NEXT PHASE

**Ready for analysis?** → **[Phase 3: Pattern Analysis →](./04-PHASE-3-ANALYSIS.md)**

Phase 3 covers:
- Question type classification
- Distractor taxonomy
- Template extraction
- Difficulty scoring

---

**📖 Navigation**: [← Phase 1](./02-PHASE-1-SETUP.md) | [Index](./00-MASTER-INDEX.md) | [Next: Phase 3 Analysis →](./04-PHASE-3-ANALYSIS.md)
