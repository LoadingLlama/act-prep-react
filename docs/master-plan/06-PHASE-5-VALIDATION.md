# PHASE 5: VALIDATION & TESTING
**Duration**: 1-2 weeks | **Deliverable**: Production-ready system with <5% error rate

**📖 Navigation**: [← Phase 4](./05-PHASE-4-GENERATION.md) | [Index](./00-MASTER-INDEX.md) | [Next: Technical Details →](./07-TECHNICAL-DETAILS.md)

---

## OVERVIEW

Validate the entire system, integrate with production features, and prepare for launch.

**Goals**:
1. Validate question quality (90%+ similarity)
2. Integrate with student data systems
3. Set up production infrastructure
4. Implement versioning & auditing
5. Optimize for performance
6. Document legal considerations

---

## TASK 5.1: SIMILARITY SCORING

**Duration**: 2-3 days

### Compare Generated to Real Questions

```javascript
// scripts/validation/calculate-similarity.mjs
import { supabase } from '../database/db-utils.mjs';
import { OpenAI } from 'openai';

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY
});

export class SimilarityScorer {
  async scoreQuestion(generatedQuestionId) {
    // Get generated question
    const { data: genQ } = await supabase
      .from('generated_questions')
      .select('*')
      .eq('id', generatedQuestionId)
      .single();

    // Get all real questions of same type
    const { data: realQuestions } = await supabase
      .from('act_questions')
      .select('*')
      .eq('section', genQ.section)
      .eq('question_type', genQ.question_type)
      .limit(100);

    // Calculate similarity metrics
    const similarities = await Promise.all(
      realQuestions.map(realQ => this.compareQuestions(genQ, realQ))
    );

    // Find best match
    const bestMatch = similarities.reduce((best, current) =>
      current.overallScore > best.overallScore ? current : best
    );

    // Save similarity score
    await supabase
      .from('generated_questions')
      .update({ similarity_score: bestMatch.overallScore })
      .eq('id', generatedQuestionId);

    return bestMatch;
  }

  async compareQuestions(genQ, realQ) {
    // 1. Structural Similarity (40% weight)
    const structural = this.compareStructure(genQ, realQ);

    // 2. Language Similarity (40% weight)
    const language = await this.compareLanguage(genQ, realQ);

    // 3. Difficulty Alignment (20% weight)
    const difficulty = this.compareDifficulty(genQ, realQ);

    const overallScore = (
      structural * 0.4 +
      language * 0.4 +
      difficulty * 0.2
    );

    return {
      overallScore,
      structural,
      language,
      difficulty,
      realQuestionId: realQ.id
    };
  }

  compareStructure(genQ, realQ) {
    let score = 0.0;

    // Question length similarity
    const lenRatio = Math.min(genQ.question_stem.length, realQ.question_stem.length) /
                     Math.max(genQ.question_stem.length, realQ.question_stem.length);
    score += lenRatio * 0.3;

    // Answer choice count
    const genChoices = [genQ.choice_a, genQ.choice_b, genQ.choice_c, genQ.choice_d, genQ.choice_e].filter(Boolean).length;
    const realChoices = [realQ.choice_a, realQ.choice_b, realQ.choice_c, realQ.choice_d, realQ.choice_e].filter(Boolean).length;

    if (genChoices === realChoices) score += 0.2;

    // Answer choice lengths similar
    const genAvgLen = this.avgChoiceLength(genQ);
    const realAvgLen = this.avgChoiceLength(realQ);
    const choiceLenRatio = Math.min(genAvgLen, realAvgLen) / Math.max(genAvgLen, realAvgLen);
    score += choiceLenRatio * 0.3;

    // Has similar structure (passage-based, diagram, etc.)
    if ((genQ.passage_id !== null) === (realQ.passage_id !== null)) score += 0.1;
    if ((genQ.diagram_url !== null) === (realQ.diagram_url !== null)) score += 0.1;

    return score;
  }

  async compareLanguage(genQ, realQ) {
    // Use embeddings for semantic similarity
    const genEmbedding = await this.getEmbedding(genQ.question_stem);
    const realEmbedding = await this.getEmbedding(realQ.question_stem);

    return this.cosineSimilarity(genEmbedding, realEmbedding);
  }

  compareDifficulty(genQ, realQ) {
    const genDiff = genQ.difficulty_score || 0.5;
    const realDiff = realQ.difficulty_score || 0.5;

    // How close are difficulty scores?
    const difference = Math.abs(genDiff - realDiff);
    return 1 - difference; // 0 difference = 1.0 similarity
  }

  avgChoiceLength(question) {
    const choices = [question.choice_a, question.choice_b, question.choice_c, question.choice_d, question.choice_e].filter(Boolean);
    const totalLen = choices.reduce((sum, c) => sum + c.length, 0);
    return totalLen / choices.length;
  }

  async getEmbedding(text) {
    const response = await openai.embeddings.create({
      model: 'text-embedding-ada-002',
      input: text
    });

    return response.data[0].embedding;
  }

  cosineSimilarity(a, b) {
    const dotProduct = a.reduce((sum, val, i) => sum + val * b[i], 0);
    const magA = Math.sqrt(a.reduce((sum, val) => sum + val * val, 0));
    const magB = Math.sqrt(b.reduce((sum, val) => sum + val * val, 0));
    return dotProduct / (magA * magB);
  }
}

// Batch scoring
export async function scoreAllGeneratedQuestions() {
  const { data: questions } = await supabase
    .from('generated_questions')
    .select('id')
    .is('similarity_score', null);

  const scorer = new SimilarityScorer();

  for (const q of questions) {
    const result = await scorer.scoreQuestion(q.id);
    console.log(`Question ${q.id}: ${(result.overallScore * 100).toFixed(1)}% similar`);

    // Rate limit
    await new Promise(resolve => setTimeout(resolve, 1000));
  }
}
```

**Target**: 90%+ average similarity score

---

## TASK 5.2: BLIND TESTING

**Duration**: 3-4 days

### Can Humans Distinguish Generated from Real?

```javascript
// scripts/validation/prepare-blind-test.mjs
export async function createBlindTest() {
  // Get 50 real questions (random sampling)
  const { data: realQuestions } = await supabase
    .from('act_questions')
    .select('*')
    .order('RANDOM()')
    .limit(50);

  // Get 50 generated questions (high similarity only)
  const { data: genQuestions } = await supabase
    .from('generated_questions')
    .select('*')
    .gte('similarity_score', 0.85)
    .order('RANDOM()')
    .limit(50);

  // Mix and anonymize
  const allQuestions = [
    ...realQuestions.map(q => ({ ...q, source: 'real', display_id: crypto.randomUUID() })),
    ...genQuestions.map(q => ({ ...q, source: 'generated', display_id: crypto.randomUUID() }))
  ];

  // Shuffle
  for (let i = allQuestions.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [allQuestions[i], allQuestions[j]] = [allQuestions[j], allQuestions[i]];
  }

  // Create review form
  const testData = allQuestions.map(q => ({
    display_id: q.display_id,
    question_stem: q.question_stem,
    choice_a: q.choice_a,
    choice_b: q.choice_b,
    choice_c: q.choice_c,
    choice_d: q.choice_d,
    choice_e: q.choice_e,
    correct_answer: q.correct_answer
  }));

  // Save answer key
  const answerKey = allQuestions.map(q => ({
    display_id: q.display_id,
    actual_source: q.source
  }));

  await fs.writeFile('blind-test.json', JSON.stringify(testData, null, 2));
  await fs.writeFile('blind-test-key.json', JSON.stringify(answerKey, null, 2));

  console.log('✅ Blind test created with 100 questions');
  console.log('Send blind-test.json to reviewers');
  console.log('Keep blind-test-key.json secret');
}

// Analyze results
export async function analyzeBlindTestResults(reviewerResponses) {
  const answerKey = JSON.parse(await fs.readFile('blind-test-key.json', 'utf-8'));

  let correctIdentifications = 0;
  let incorrectIdentifications = 0;

  for (const response of reviewerResponses) {
    const correct = answerKey.find(k => k.display_id === response.display_id);

    if (response.guessed_source === correct.actual_source) {
      correctIdentifications++;
    } else {
      incorrectIdentifications++;
    }
  }

  const detectionRate = correctIdentifications / (correctIdentifications + incorrectIdentifications);

  console.log(`\n=== BLIND TEST RESULTS ===`);
  console.log(`Detection Rate: ${(detectionRate * 100).toFixed(1)}%`);
  console.log(`Correct: ${correctIdentifications}`);
  console.log(`Incorrect: ${incorrectIdentifications}`);

  if (detectionRate < 0.60) {
    console.log(`✅ PASS: Reviewers cannot reliably distinguish (< 60%)`);
  } else {
    console.log(`❌ FAIL: Reviewers can distinguish generated questions`);
  }

  return { detectionRate, correctIdentifications, incorrectIdentifications };
}
```

**Success Criteria**: Detection rate < 60%

---

## TASK 5.3: STATISTICAL VALIDATION

**Duration**: 2-3 days

### Compare Distributions

```javascript
// scripts/validation/statistical-validation.mjs
export async function validateTestStatistics(generatedTestId) {
  const report = {
    testPassed: true,
    metrics: []
  };

  // Get generated test
  const genTest = await getGeneratedTest(generatedTestId);

  // Get average stats from real tests
  const realStats = await getAverageRealTestStats();

  // 1. Question Type Distribution
  const typeDistribution = compareDistributions(
    genTest.questionTypeDistribution,
    realStats.questionTypeDistribution,
    'Question Type Distribution',
    0.05 // 5% tolerance
  );
  report.metrics.push(typeDistribution);
  if (!typeDistribution.passed) report.testPassed = false;

  // 2. Difficulty Distribution
  const diffDistribution = compareDistributions(
    genTest.difficultyDistribution,
    realStats.difficultyDistribution,
    'Difficulty Distribution',
    0.10 // 10% tolerance
  );
  report.metrics.push(diffDistribution);
  if (!diffDistribution.passed) report.testPassed = false;

  // 3. Answer Balance
  const answerBalance = checkAnswerBalance(genTest.correctAnswers);
  report.metrics.push(answerBalance);
  if (!answerBalance.passed) report.testPassed = false;

  // 4. Passage Characteristics
  const passageStats = comparePassageStats(genTest.passages, realStats.passages);
  report.metrics.push(passageStats);
  if (!passageStats.passed) report.testPassed = false;

  // Generate report
  console.log('\n=== STATISTICAL VALIDATION REPORT ===\n');

  for (const metric of report.metrics) {
    const icon = metric.passed ? '✅' : '❌';
    console.log(`${icon} ${metric.name}: ${metric.passed ? 'PASS' : 'FAIL'}`);
    if (metric.details) console.log(`   ${metric.details}`);
  }

  console.log(`\n${report.testPassed ? '✅ TEST PASSED' : '❌ TEST FAILED'}\n`);

  return report;
}

function compareDistributions(generated, real, name, tolerance) {
  const differences = {};
  let maxDiff = 0;

  for (const [key, realValue] of Object.entries(real)) {
    const genValue = generated[key] || 0;
    const diff = Math.abs(genValue - realValue);
    differences[key] = diff;

    if (diff > maxDiff) maxDiff = diff;
  }

  const passed = maxDiff <= tolerance;

  return {
    name,
    passed,
    maxDifference: maxDiff,
    tolerance,
    details: passed ? `Max difference: ${(maxDiff * 100).toFixed(1)}%` : `Exceeds tolerance: ${(maxDiff * 100).toFixed(1)}% > ${(tolerance * 100)}%`
  };
}

function checkAnswerBalance(correctAnswers) {
  const counts = { A: 0, B: 0, C: 0, D: 0, E: 0 };

  for (const answer of correctAnswers) {
    counts[answer]++;
  }

  const total = correctAnswers.length;
  const expected = total / Object.keys(counts).filter(k => counts[k] > 0).length;

  // Check if each answer appears within 20% of expected
  const imbalanced = Object.entries(counts)
    .filter(([letter, count]) => count > 0)
    .some(([letter, count]) => Math.abs(count - expected) / expected > 0.20);

  return {
    name: 'Answer Balance',
    passed: !imbalanced,
    distribution: counts,
    details: imbalanced ? 'Answer distribution is imbalanced' : 'Answers well distributed'
  };
}
```

---

## TASK 5.4: STUDENT DATA INTEGRATION

**Duration**: 2-3 days
**Why Important**: Enables personalized practice by tracking student progress and preventing duplicate questions

### Track Question History

```javascript
// scripts/integration/student-data.mjs
export class StudentDataIntegration {
  // Record when student sees a question
  async recordQuestionView(userId, questionId) {
    const { data, error } = await supabase
      .from('student_question_history')
      .upsert({
        user_id: userId,
        question_id: questionId,
        seen_at: new Date().toISOString()
      }, {
        onConflict: 'user_id,question_id',
        ignoreDuplicates: false
      });

    return data;
  }

  // Record answer attempt
  async recordAnswer(userId, questionId, selectedAnswer, timeSpent) {
    const { data: question } = await supabase
      .from('act_questions')
      .select('correct_answer')
      .eq('id', questionId)
      .single();

    const isCorrect = selectedAnswer === question.correct_answer;

    await supabase
      .from('student_question_history')
      .update({
        answered_correctly: isCorrect,
        answer_selected: selectedAnswer,
        time_spent_seconds: timeSpent
      })
      .match({ user_id: userId, question_id: questionId });

    // Update question statistics
    await this.updateQuestionStats(questionId, isCorrect);

    return { isCorrect };
  }

  async updateQuestionStats(questionId, wasCorrect) {
    // Increment counters
    await supabase.rpc('increment_question_stats', {
      question_id: questionId,
      was_correct: wasCorrect
    });

    // Recalculate success rate
    const { data: question } = await supabase
      .from('act_questions')
      .select('times_answered, times_correct')
      .eq('id', questionId)
      .single();

    if (question.times_answered > 0) {
      const successRate = (question.times_correct / question.times_answered) * 100;

      await supabase
        .from('act_questions')
        .update({ success_rate: successRate })
        .eq('id', questionId);
    }
  }

  // Get unseen questions for practice
  async getUnseenQuestions(userId, filters = {}) {
    const {
      section,
      difficulty,
      lessonKey,
      count = 10
    } = filters;

    let query = supabase
      .from('act_questions')
      .select('*')
      .not('id', 'in', `(
        SELECT question_id
        FROM student_question_history
        WHERE user_id = '${userId}'
      )`)
      .eq('is_duplicate', false);

    if (section) query = query.eq('section', section);
    if (difficulty) query = query.eq('difficulty_level', difficulty);
    if (lessonKey) query = query.eq('primary_lesson_key', lessonKey);

    query = query.order('RANDOM()').limit(count);

    const { data } = await query;
    return data || [];
  }

  // Analyze student weak areas
  async analyzeWeakAreas(userId) {
    const { data: history } = await supabase
      .from('student_question_history')
      .select(`
        answered_correctly,
        act_questions (
          section,
          question_type,
          primary_lesson_key
        )
      `)
      .eq('user_id', userId)
      .not('answered_correctly', 'is', null);

    // Group by lesson
    const lessonPerformance = {};

    for (const record of history) {
      const lessonKey = record.act_questions.primary_lesson_key;
      if (!lessonKey) continue;

      if (!lessonPerformance[lessonKey]) {
        lessonPerformance[lessonKey] = { correct: 0, total: 0 };
      }

      lessonPerformance[lessonKey].total++;
      if (record.answered_correctly) {
        lessonPerformance[lessonKey].correct++;
      }
    }

    // Calculate success rates
    const weakAreas = Object.entries(lessonPerformance)
      .map(([lessonKey, stats]) => ({
        lessonKey,
        successRate: stats.correct / stats.total,
        questionsAttempted: stats.total
      }))
      .filter(area => area.questionsAttempted >= 3) // Only if attempted 3+ times
      .sort((a, b) => a.successRate - b.successRate);

    return weakAreas;
  }

  // Smart recommendations
  async recommendLessons(userId) {
    const weakAreas = await this.analyzeWeakAreas(userId);

    // Recommend bottom 3 areas
    const recommendations = weakAreas.slice(0, 3).map(area => ({
      lessonKey: area.lessonKey,
      reason: `${(area.successRate * 100).toFixed(0)}% success rate (${area.questionsAttempted} questions)`,
      priority: area.successRate < 0.5 ? 'high' : 'medium'
    }));

    return recommendations;
  }
}

// Database function for incrementing stats
/*
CREATE OR REPLACE FUNCTION increment_question_stats(
  question_id UUID,
  was_correct BOOLEAN
)
RETURNS VOID AS $$
BEGIN
  UPDATE act_questions
  SET
    times_answered = times_answered + 1,
    times_correct = times_correct + CASE WHEN was_correct THEN 1 ELSE 0 END
  WHERE id = question_id;
END;
$$ LANGUAGE plpgsql;
*/
```

---

## TASK 5.5: BACKUP & RECOVERY

**Duration**: 1 day
**Why Important**: Protects against data loss and enables recovery from errors or system failures

### Automated Backup System

```javascript
// scripts/maintenance/backup-system.mjs
import { exec } from 'child_process';
import { promisify } from 'util';
import fs from 'fs/promises';
import path from 'path';

const execAsync = promisify(exec);

export class BackupSystem {
  constructor() {
    this.backupDir = path.join(process.cwd(), 'backups');
  }

  async dailyBackup() {
    const timestamp = new Date().toISOString().split('T')[0];
    const backupFile = path.join(this.backupDir, `act-db-${timestamp}.sql`);

    // Ensure backup directory exists
    await fs.mkdir(this.backupDir, { recursive: true });

    console.log(`Creating backup: ${backupFile}`);

    // Full database dump
    await execAsync(`pg_dump ${process.env.DATABASE_URL} > ${backupFile}`);

    // Compress
    await execAsync(`gzip ${backupFile}`);

    console.log(`✅ Backup created: ${backupFile}.gz`);

    // Clean old backups (keep 30 days)
    await this.cleanOldBackups(30);

    return `${backupFile}.gz`;
  }

  async cleanOldBackups(keepDays = 30) {
    const files = await fs.readdir(this.backupDir);
    const now = Date.now();

    for (const file of files) {
      if (!file.endsWith('.sql.gz')) continue;

      const filePath = path.join(this.backupDir, file);
      const stats = await fs.stat(filePath);
      const ageInDays = (now - stats.mtimeMs) / (1000 * 60 * 60 * 24);

      if (ageInDays > keepDays) {
        await fs.unlink(filePath);
        console.log(`🗑️  Deleted old backup: ${file} (${ageInDays.toFixed(0)} days old)`);
      }
    }
  }

  async restore(backupFile) {
    console.log(`Restoring from: ${backupFile}`);

    // Decompress if needed
    if (backupFile.endsWith('.gz')) {
      await execAsync(`gunzip ${backupFile}`);
      backupFile = backupFile.replace('.gz', '');
    }

    // Restore
    await execAsync(`psql ${process.env.DATABASE_URL} < ${backupFile}`);

    console.log(`✅ Database restored from ${backupFile}`);
  }

  async createCheckpoint(testNumber, section) {
    // Create checkpoint after completing a test section
    const checkpoint = {
      test_number: testNumber,
      section,
      timestamp: new Date().toISOString(),
      questions_extracted: await this.countExtracted(testNumber, section)
    };

    await supabase
      .from('extraction_checkpoints')
      .insert(checkpoint);

    console.log(`✅ Checkpoint created: Test ${testNumber}, ${section}`);

    return checkpoint;
  }

  async getLastCheckpoint() {
    const { data } = await supabase
      .from('extraction_checkpoints')
      .select('*')
      .order('timestamp', { ascending: false })
      .limit(1)
      .single();

    return data;
  }

  async countExtracted(testNumber, section) {
    const { count } = await supabase
      .from('act_questions')
      .select('*', { count: 'exact', head: true })
      .eq('test_number', testNumber)
      .eq('section', section);

    return count;
  }
}

// Cron job setup (using node-cron)
import cron from 'node-cron';

const backup = new BackupSystem();

// Run daily at 2 AM
cron.schedule('0 2 * * *', async () => {
  console.log('Running daily backup...');
  await backup.dailyBackup();
});

// Export for manual use
export async function manualBackup() {
  const backup = new BackupSystem();
  return await backup.dailyBackup();
}
```

### Checkpoint Table

```sql
CREATE TABLE extraction_checkpoints (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  test_number INTEGER NOT NULL,
  section VARCHAR(20) NOT NULL,
  questions_extracted INTEGER NOT NULL,
  timestamp TIMESTAMPTZ DEFAULT NOW()
);

CREATE INDEX idx_checkpoints_timestamp ON extraction_checkpoints(timestamp);
```

---

## TASK 5.6: API LAYER DESIGN

**Duration**: 2-3 days
**Why Important**: Provides efficient, scalable API for frontend to access questions and track student progress

### Supabase Edge Functions

```typescript
// supabase/functions/generate-practice-set/index.ts
import { serve } from 'https://deno.land/std@0.168.0/http/server.ts'
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2'

serve(async (req) => {
  const { userId, filters } = await req.json()

  const supabase = createClient(
    Deno.env.get('SUPABASE_URL') ?? '',
    Deno.env.get('SUPABASE_SERVICE_ROLE_KEY') ?? ''
  )

  // Get user's seen questions
  const { data: seenQuestions } = await supabase
    .from('student_question_history')
    .select('question_id')
    .eq('user_id', userId)

  const seenIds = seenQuestions?.map(q => q.question_id) || []

  // Get unseen questions matching filters
  let query = supabase
    .from('act_questions')
    .select('*')
    .not('id', 'in', `(${seenIds.join(',')})`)
    .eq('is_duplicate', false)

  if (filters.section) query = query.eq('section', filters.section)
  if (filters.difficulty) query = query.eq('difficulty_level', filters.difficulty)
  if (filters.lessonKey) query = query.eq('primary_lesson_key', filters.lessonKey)

  const { data: questions } = await query
    .order('RANDOM()')
    .limit(filters.count || 10)

  return new Response(
    JSON.stringify({ questions }),
    { headers: { 'Content-Type': 'application/json' } }
  )
})
```

### Common API Queries

```typescript
// lib/api/questions.ts
export class QuestionsAPI {
  // Get random practice questions
  static async getPracticeQuestions(filters: {
    section?: string
    difficulty?: string
    lessonKey?: string
    count?: number
    excludeIds?: string[]
  }) {
    let query = supabase
      .from('act_questions')
      .select('*')
      .eq('is_duplicate', false)

    if (filters.section) query = query.eq('section', filters.section)
    if (filters.difficulty) query = query.eq('difficulty_level', filters.difficulty)
    if (filters.lessonKey) query = query.eq('primary_lesson_key', filters.lessonKey)
    if (filters.excludeIds?.length) query = query.not('id', 'in', `(${filters.excludeIds.join(',')})`)

    return await query
      .order('RANDOM()')
      .limit(filters.count || 10)
  }

  // Get question with full context
  static async getQuestionWithContext(questionId: string) {
    const { data } = await supabase
      .from('act_questions')
      .select(`
        *,
        passage:act_passages(*),
        distractors:act_distractors(*)
      `)
      .eq('id', questionId)
      .single()

    return data
  }

  // Get lesson practice questions
  static async getLessonQuestions(lessonKey: string, count = 10) {
    const { data } = await supabase
      .from('act_questions')
      .select('*')
      .eq('primary_lesson_key', lessonKey)
      .eq('is_duplicate', false)
      .order('difficulty_score', { ascending: true })
      .limit(count)

    return data
  }

  // Get diagnostic test (varied difficulty)
  static async getDiagnosticTest(section: string) {
    // Get questions across all difficulty levels
    const difficulties = ['easy', 'medium', 'hard']
    const questionsPerDifficulty = 5

    const questions = []

    for (const difficulty of difficulties) {
      const { data } = await supabase
        .from('act_questions')
        .select('*')
        .eq('section', section)
        .eq('difficulty_level', difficulty)
        .eq('is_duplicate', false)
        .order('RANDOM()')
        .limit(questionsPerDifficulty)

      questions.push(...(data || []))
    }

    return questions
  }
}
```

---

## TASK 5.7: QUESTION VERSIONING

**Duration**: 1 day
**Why Important**: Maintains audit trail of all question changes and enables rollback if errors are introduced

### Version Tracking System

```javascript
// scripts/maintenance/version-control.mjs
export class QuestionVersioning {
  async updateQuestion(questionId, updates, userId, reason) {
    // Get current version
    const { data: current } = await supabase
      .from('act_questions')
      .select('*')
      .eq('id', questionId)
      .single();

    if (!current) throw new Error('Question not found');

    // Determine version number
    const { data: versions } = await supabase
      .from('question_version_history')
      .select('version_number')
      .eq('question_id', questionId)
      .order('version_number', { ascending: false })
      .limit(1);

    const newVersion = (versions?.[0]?.version_number || 0) + 1;

    // Record what changed
    const changedFields = {};
    for (const [key, newValue] of Object.entries(updates)) {
      if (current[key] !== newValue) {
        changedFields[key] = {
          old: current[key],
          new: newValue
        };
      }
    }

    // Create version record
    await supabase
      .from('question_version_history')
      .insert({
        question_id: questionId,
        version_number: newVersion,
        changed_fields: changedFields,
        changed_by: userId,
        change_reason: reason
      });

    // Apply update
    await supabase
      .from('act_questions')
      .update({
        ...updates,
        updated_at: new Date().toISOString()
      })
      .eq('id', questionId);

    console.log(`✅ Question ${questionId} updated to v${newVersion}`);

    return { version: newVersion, changes: changedFields };
  }

  async getQuestionHistory(questionId) {
    const { data } = await supabase
      .from('question_version_history')
      .select('*')
      .eq('question_id', questionId)
      .order('version_number', { ascending: false });

    return data || [];
  }

  async rollbackQuestion(questionId, targetVersion) {
    const history = await this.getQuestionHistory(questionId);
    const targetRecord = history.find(h => h.version_number === targetVersion);

    if (!targetRecord) {
      throw new Error(`Version ${targetVersion} not found`);
    }

    // Reconstruct question state at target version
    const rollbackUpdates = {};
    for (const [field, change] of Object.entries(targetRecord.changed_fields)) {
      rollbackUpdates[field] = change.old;
    }

    // Apply rollback
    await this.updateQuestion(
      questionId,
      rollbackUpdates,
      'system',
      `Rolled back to version ${targetVersion}`
    );

    console.log(`✅ Rolled back question ${questionId} to v${targetVersion}`);
  }
}
```

---

## TASK 5.8: LEGAL & COPYRIGHT

**Duration**: 1 day
**Why Important**: Ensures legal compliance by documenting fair use justification for educational purposes

### Fair Use Documentation

```markdown
# LEGAL & COPYRIGHT NOTICE

## Source Material
This system uses official ACT practice tests as source material for:
1. Educational analysis
2. Pattern extraction
3. Question generation training

## Fair Use Justification

### 1. Purpose and Character
- **Transformative Use**: We extract patterns and generate NEW questions, not redistribute original content
- **Educational Purpose**: Non-commercial test preparation and student learning
- **Added Value**: Comprehensive explanations, analytics, and personalized learning paths

### 2. Nature of Copyrighted Work
- Practice tests are factual/educational in nature
- Questions test standardized academic concepts

### 3. Amount Used
- Analyzing structure and patterns (not verbatim redistribution)
- Generated questions are original works inspired by patterns
- No full test republication

### 4. Market Effect
- Does not substitute for official ACT practice tests
- Encourages students to practice more (positive effect)
- Adds substantial educational value beyond original

## Precautions Taken
1. ✅ No bulk export or redistribution of original questions
2. ✅ Generated questions are original works
3. ✅ Added original explanations and educational content
4. ✅ Focus on analysis and generation, not republication
5. ✅ Clear attribution of ACT test format

## Recommendations
- Consult with legal counsel before public launch
- Consider licensing agreement with ACT if scaling commercially
- Maintain clear distinction between real and generated questions
- Document transformative nature in user-facing materials

## Contact
For legal questions: [legal contact information]

Last Reviewed: 2025-10-22
```

---

## TASK 5.9: PERFORMANCE OPTIMIZATION

**Duration**: 2-3 days
**Why Important**: Ensures fast query performance as the database grows to thousands of questions

### Advanced Indexing

```sql
-- Already created in Phase 1, but verify:

-- Composite indexes for common queries
CREATE INDEX IF NOT EXISTS idx_questions_composite
  ON act_questions(section, difficulty_level, is_duplicate)
  WHERE is_duplicate = false;

CREATE INDEX IF NOT EXISTS idx_questions_lesson_section
  ON act_questions(primary_lesson_key, section);

-- Full-text search
CREATE INDEX IF NOT EXISTS idx_questions_search
  ON act_questions USING gin(
    to_tsvector('english', question_stem || ' ' || choice_a || ' ' || choice_b || ' ' || choice_c || ' ' || choice_d)
  );

-- Partial indexes for frequently filtered data
CREATE INDEX IF NOT EXISTS idx_questions_not_duplicate
  ON act_questions(section, difficulty_level)
  WHERE is_duplicate = false;
```

### Materialized Views

```sql
-- Question statistics (refresh daily)
CREATE MATERIALIZED VIEW IF NOT EXISTS question_statistics AS
SELECT
  section,
  question_type,
  difficulty_level,
  COUNT(*) as question_count,
  AVG(success_rate) as avg_success_rate,
  AVG(difficulty_score) as avg_difficulty,
  AVG(times_answered) as avg_attempts
FROM act_questions
WHERE is_duplicate = false
GROUP BY section, question_type, difficulty_level;

CREATE INDEX idx_qstats_section ON question_statistics(section);
CREATE INDEX idx_qstats_type ON question_statistics(question_type);

-- Refresh schedule (via cron or scheduled function)
-- REFRESH MATERIALIZED VIEW question_statistics;
```

### Caching Strategy

```typescript
// lib/cache/redis-cache.ts
import Redis from 'ioredis'

const redis = new Redis(process.env.REDIS_URL)

export class QuestionCache {
  // Cache frequently accessed questions
  static async getQuestion(questionId: string) {
    const cached = await redis.get(`question:${questionId}`)

    if (cached) {
      return JSON.parse(cached)
    }

    // Fetch from database
    const { data } = await supabase
      .from('act_questions')
      .select('*')
      .eq('id', questionId)
      .single()

    // Cache for 1 hour
    await redis.setex(`question:${questionId}`, 3600, JSON.stringify(data))

    return data
  }

  // Cache lesson questions
  static async getLessonQuestions(lessonKey: string) {
    const cached = await redis.get(`lesson:${lessonKey}:questions`)

    if (cached) {
      return JSON.parse(cached)
    }

    const { data } = await supabase
      .from('act_questions')
      .select('*')
      .eq('primary_lesson_key', lessonKey)

    // Cache for 4 hours
    await redis.setex(`lesson:${lessonKey}:questions`, 14400, JSON.stringify(data))

    return data
  }

  // Invalidate cache when question updated
  static async invalidateQuestion(questionId: string) {
    await redis.del(`question:${questionId}`)
  }
}
```

### Query Optimization

```typescript
// Optimize common slow queries
export class OptimizedQueries {
  // Instead of: NOT IN subquery (slow)
  // Use: LEFT JOIN with NULL check (faster)
  static async getUnseenQuestionsFast(userId: string, filters: any) {
    const { data } = await supabase.rpc('get_unseen_questions', {
      p_user_id: userId,
      p_section: filters.section,
      p_difficulty: filters.difficulty,
      p_limit: filters.count || 10
    })

    return data
  }
}

// SQL function for better performance
/*
CREATE OR REPLACE FUNCTION get_unseen_questions(
  p_user_id UUID,
  p_section VARCHAR(20),
  p_difficulty VARCHAR(20),
  p_limit INTEGER
)
RETURNS TABLE (
  id UUID,
  question_stem TEXT,
  choice_a TEXT,
  choice_b TEXT,
  choice_c TEXT,
  choice_d TEXT,
  choice_e TEXT,
  correct_answer CHAR(1),
  difficulty_level VARCHAR(20),
  primary_lesson_key VARCHAR(100)
) AS $$
BEGIN
  RETURN QUERY
  SELECT
    q.id,
    q.question_stem,
    q.choice_a,
    q.choice_b,
    q.choice_c,
    q.choice_d,
    q.choice_e,
    q.correct_answer,
    q.difficulty_level,
    q.primary_lesson_key
  FROM act_questions q
  LEFT JOIN student_question_history h
    ON h.question_id = q.id AND h.user_id = p_user_id
  WHERE h.id IS NULL
    AND q.is_duplicate = false
    AND (p_section IS NULL OR q.section = p_section)
    AND (p_difficulty IS NULL OR q.difficulty_level = p_difficulty)
  ORDER BY RANDOM()
  LIMIT p_limit;
END;
$$ LANGUAGE plpgsql;
*/
```

---

## PHASE 5 DELIVERABLES

At the end of Phase 5, you will have:

- [ ] Similarity scores calculated (90%+ average)
- [ ] Blind test results (< 60% detection)
- [ ] Statistical validation passed
- [ ] Student data integration complete
- [ ] Daily backup system running
- [ ] Production API layer ready
- [ ] Question versioning implemented
- [ ] Legal documentation complete
- [ ] Performance optimized
- [ ] System ready for launch

**Time Spent**: 1-2 weeks
**Cost**: ~$50-100 (API fees for testing)

---

## NEXT DOCUMENT

**Learn more** → **[Technical Details →](./07-TECHNICAL-DETAILS.md)**

Technical Details covers:
- Complete tech stack
- Directory structure
- Risk mitigation
- Deployment guide

---

**📖 Navigation**: [← Phase 4](./05-PHASE-4-GENERATION.md) | [Index](./00-MASTER-INDEX.md) | [Next: Technical Details →](./07-TECHNICAL-DETAILS.md)
