#!/usr/bin/env node
import { createClient } from '@supabase/supabase-js';
import * as dotenv from 'dotenv';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';
import fs from 'fs';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
dotenv.config({ path: join(__dirname, '../../.env') });

const supabase = createClient(process.env.REACT_APP_SUPABASE_URL, process.env.SUPABASE_SERVICE_ROLE_KEY);

console.log('🔬 ULTRA-MOLECULAR DATABASE ANALYSIS');
console.log('Extracting generative blueprints for 1:1 ACT test recreation...\n');
console.log('='.repeat(80));

const analysis = {
  metadata: {
    generatedAt: new Date().toISOString(),
    purpose: '1:1 ACT Test Generation Blueprint',
    totalDataPoints: 0,
  },
  linguistic: {},
  structural: {},
  patterns: {},
  templates: {},
  blueprints: {},
};

// ============================================================================
// 1. LINGUISTIC ANALYSIS - Sentence Structure & Vocabulary
// ============================================================================
console.log('\n📚 1. LINGUISTIC ANALYSIS\n');

const analyzeLinguistics = (text) => {
  if (!text) return null;

  const sentences = text.split(/[.!?]+/).filter(s => s.trim().length > 0);
  const words = text.split(/\s+/).filter(w => w.length > 0);
  const chars = text.length;

  return {
    sentenceCount: sentences.length,
    wordCount: words.length,
    charCount: chars,
    avgWordsPerSentence: sentences.length > 0 ? (words.length / sentences.length).toFixed(2) : 0,
    avgCharsPerWord: words.length > 0 ? (chars / words.length).toFixed(2) : 0,
    sentences: sentences.map(s => ({
      text: s.trim().substring(0, 100),
      wordCount: s.trim().split(/\s+/).length,
    })).slice(0, 3), // Sample first 3 sentences
  };
};

// Analyze question stems
const { data: allQuestions } = await supabase
  .from('act_english_questions')
  .select('question_stem, underlined_text, question_type, question_category')
  .limit(1000);

const stemLinguistics = {
  avgLength: 0,
  avgWords: 0,
  avgSentences: 0,
  patterns: {},
  byType: {},
};

let totalChars = 0;
let totalWords = 0;

allQuestions.forEach(q => {
  const analysis = analyzeLinguistics(q.question_stem);
  if (analysis) {
    totalChars += analysis.charCount;
    totalWords += analysis.wordCount;

    if (!stemLinguistics.byType[q.question_type]) {
      stemLinguistics.byType[q.question_type] = {
        count: 0,
        avgLength: 0,
        samples: [],
      };
    }

    stemLinguistics.byType[q.question_type].count++;
    stemLinguistics.byType[q.question_type].samples.push(q.question_stem.substring(0, 150));
  }
});

stemLinguistics.avgLength = (totalChars / allQuestions.length).toFixed(2);
stemLinguistics.avgWords = (totalWords / allQuestions.length).toFixed(2);

console.log(`Analyzed ${allQuestions.length} English question stems`);
console.log(`Avg stem length: ${stemLinguistics.avgLength} chars`);
console.log(`Avg stem words: ${stemLinguistics.avgWords} words`);

analysis.linguistic.questionStems = stemLinguistics;

// ============================================================================
// 2. STRUCTURAL PATTERNS - Question Construction
// ============================================================================
console.log('\n🏗️  2. STRUCTURAL PATTERNS\n');

const { data: englishFull } = await supabase
  .from('act_english_questions')
  .select('*')
  .order('test_number, question_number');

// Analyze choice patterns
const choicePatterns = {
  noChangeUsage: 0,
  deleteUsage: 0,
  avgChoiceLength: { A: 0, B: 0, C: 0, D: 0 },
  choiceLengthDistribution: [],
  commonPatterns: {},
};

let choiceLengths = { A: [], B: [], C: [], D: [] };

englishFull.forEach(q => {
  if (q.choice_a?.includes('NO CHANGE')) choicePatterns.noChangeUsage++;
  if (q.choice_d?.includes('DELETE') || q.choice_d?.includes('OMIT')) choicePatterns.deleteUsage++;

  if (q.choice_a) choiceLengths.A.push(q.choice_a.length);
  if (q.choice_b) choiceLengths.B.push(q.choice_b.length);
  if (q.choice_c) choiceLengths.C.push(q.choice_c.length);
  if (q.choice_d) choiceLengths.D.push(q.choice_d.length);

  const lengths = [
    q.choice_a?.length || 0,
    q.choice_b?.length || 0,
    q.choice_c?.length || 0,
    q.choice_d?.length || 0,
  ];

  const pattern = lengths.map(l =>
    l < 10 ? 'short' : l < 30 ? 'medium' : l < 60 ? 'long' : 'verylong'
  ).join('-');

  choicePatterns.commonPatterns[pattern] = (choicePatterns.commonPatterns[pattern] || 0) + 1;
});

choicePatterns.avgChoiceLength.A = (choiceLengths.A.reduce((a,b) => a+b, 0) / choiceLengths.A.length).toFixed(2);
choicePatterns.avgChoiceLength.B = (choiceLengths.B.reduce((a,b) => a+b, 0) / choiceLengths.B.length).toFixed(2);
choicePatterns.avgChoiceLength.C = (choiceLengths.C.reduce((a,b) => a+b, 0) / choiceLengths.C.length).toFixed(2);
choicePatterns.avgChoiceLength.D = (choiceLengths.D.reduce((a,b) => a+b, 0) / choiceLengths.D.length).toFixed(2);

console.log(`NO CHANGE usage: ${choicePatterns.noChangeUsage} questions (${(choicePatterns.noChangeUsage/englishFull.length*100).toFixed(1)}%)`);
console.log(`DELETE option usage: ${choicePatterns.deleteUsage} questions (${(choicePatterns.deleteUsage/englishFull.length*100).toFixed(1)}%)`);

analysis.structural.choicePatterns = choicePatterns;

// ============================================================================
// 3. ANSWER DISTRIBUTION PATTERNS
// ============================================================================
console.log('\n📊 3. ANSWER DISTRIBUTION PATTERNS\n');

const analyzeAnswerPatterns = async (table, section) => {
  const { data: questions } = await supabase
    .from(table)
    .select('question_number, correct_answer, question_type, test_number')
    .order('test_number, question_number');

  const patterns = {
    overall: {},
    byType: {},
    byPosition: {},
    sequences: {},
  };

  questions.forEach(q => {
    // Overall distribution
    patterns.overall[q.correct_answer] = (patterns.overall[q.correct_answer] || 0) + 1;

    // By type
    if (!patterns.byType[q.question_type]) {
      patterns.byType[q.question_type] = {};
    }
    patterns.byType[q.question_type][q.correct_answer] =
      (patterns.byType[q.question_type][q.correct_answer] || 0) + 1;

    // By position (first 10, middle 10, last 10 of each test)
    const pos = q.question_number <= 10 ? 'first' :
                q.question_number >= (section === 'English' ? 66 : section === 'Math' ? 51 : 31) ? 'last' : 'middle';

    if (!patterns.byPosition[pos]) patterns.byPosition[pos] = {};
    patterns.byPosition[pos][q.correct_answer] = (patterns.byPosition[pos][q.correct_answer] || 0) + 1;
  });

  // Analyze sequences (AAA, BBB, CCC patterns)
  for (let testNum = 1; testNum <= 7; testNum++) {
    const testQuestions = questions.filter(q => q.test_number === testNum);
    const answers = testQuestions.map(q => q.correct_answer);

    for (let i = 0; i < answers.length - 2; i++) {
      if (answers[i] === answers[i+1] && answers[i] === answers[i+2]) {
        const seq = answers[i] + answers[i] + answers[i];
        patterns.sequences[seq] = (patterns.sequences[seq] || 0) + 1;
      }
    }
  }

  return patterns;
};

const englishAnswers = await analyzeAnswerPatterns('act_english_questions', 'English');
const mathAnswers = await analyzeAnswerPatterns('act_math_questions', 'Math');
const readingAnswers = await analyzeAnswerPatterns('act_reading_questions', 'Reading');
const scienceAnswers = await analyzeAnswerPatterns('act_science_questions', 'Science');

console.log('English answer distribution:', englishAnswers.overall);
console.log('Math answer distribution:', mathAnswers.overall);

analysis.patterns.answers = {
  english: englishAnswers,
  math: mathAnswers,
  reading: readingAnswers,
  science: scienceAnswers,
};

// ============================================================================
// 4. QUESTION TYPE TAXONOMY
// ============================================================================
console.log('\n🔬 4. QUESTION TYPE TAXONOMY\n');

const buildTypeTaxonomy = async (table, section) => {
  const { data: questions } = await supabase
    .from(table)
    .select('question_type, question_category, question_stem, choice_a, choice_b, choice_c, choice_d')
    .limit(1000);

  const taxonomy = {};

  questions.forEach(q => {
    if (!taxonomy[q.question_type]) {
      taxonomy[q.question_type] = {
        count: 0,
        category: q.question_category,
        examples: [],
        choicePatterns: [],
      };
    }

    taxonomy[q.question_type].count++;

    if (taxonomy[q.question_type].examples.length < 3) {
      taxonomy[q.question_type].examples.push({
        stem: q.question_stem?.substring(0, 150),
        choices: [
          q.choice_a?.substring(0, 50),
          q.choice_b?.substring(0, 50),
          q.choice_c?.substring(0, 50),
          q.choice_d?.substring(0, 50),
        ],
      });
    }
  });

  return taxonomy;
};

const englishTaxonomy = await buildTypeTaxonomy('act_english_questions', 'English');
const mathTaxonomy = await buildTypeTaxonomy('act_math_questions', 'Math');

console.log(`English question types: ${Object.keys(englishTaxonomy).length}`);
console.log(`Math question types: ${Object.keys(mathTaxonomy).length}`);

Object.entries(englishTaxonomy)
  .sort(([,a], [,b]) => b.count - a.count)
  .slice(0, 10)
  .forEach(([type, data]) => {
    console.log(`  ${type}: ${data.count} questions (${data.category})`);
  });

analysis.patterns.taxonomy = {
  english: englishTaxonomy,
  math: mathTaxonomy,
};

// ============================================================================
// 5. PASSAGE BLUEPRINTS
// ============================================================================
console.log('\n📖 5. PASSAGE BLUEPRINTS\n');

const analyzePassages = async (table, section) => {
  const { data: passages } = await supabase
    .from(table)
    .select('*')
    .order('test_number, passage_number');

  const blueprint = {
    count: passages.length,
    avgLength: 0,
    avgWords: 0,
    avgSentences: 0,
    lengthDistribution: [],
    typeDistribution: {},
    samples: [],
  };

  let totalChars = 0;
  let totalWords = 0;
  let totalSentences = 0;

  passages.forEach(p => {
    const text = p.passage_text || '';
    const words = text.split(/\s+/).filter(w => w.length > 0);
    const sentences = text.split(/[.!?]+/).filter(s => s.trim().length > 0);

    totalChars += text.length;
    totalWords += words.length;
    totalSentences += sentences.length;

    blueprint.lengthDistribution.push({
      test: p.test_number,
      passage: p.passage_number,
      chars: text.length,
      words: words.length,
      sentences: sentences.length,
    });

    if (p.passage_type) {
      blueprint.typeDistribution[p.passage_type] = (blueprint.typeDistribution[p.passage_type] || 0) + 1;
    }

    if (blueprint.samples.length < 3) {
      blueprint.samples.push({
        type: p.passage_type,
        length: text.length,
        preview: text.substring(0, 200),
        firstSentence: sentences[0]?.trim(),
      });
    }
  });

  blueprint.avgLength = Math.round(totalChars / passages.length);
  blueprint.avgWords = Math.round(totalWords / passages.length);
  blueprint.avgSentences = Math.round(totalSentences / passages.length);

  return blueprint;
};

const englishPassageBlueprint = await analyzePassages('act_english_passages', 'English');
const readingPassageBlueprint = await analyzePassages('act_reading_passages', 'Reading');
const sciencePassageBlueprint = await analyzePassages('act_science_passages', 'Science');

console.log(`English passages: ${englishPassageBlueprint.count} @ ${englishPassageBlueprint.avgWords} words avg`);
console.log(`Reading passages: ${readingPassageBlueprint.count} @ ${readingPassageBlueprint.avgWords} words avg`);
console.log(`Science passages: ${sciencePassageBlueprint.count} @ ${sciencePassageBlueprint.avgWords} words avg`);

analysis.blueprints.passages = {
  english: englishPassageBlueprint,
  reading: readingPassageBlueprint,
  science: sciencePassageBlueprint,
};

// ============================================================================
// 6. LESSON MAPPING
// ============================================================================
console.log('\n🎓 6. LESSON MAPPING\n');

const { data: lessons } = await supabase
  .from('lessons')
  .select('*');

const { data: englishWithLessons } = await supabase
  .from('act_english_questions')
  .select('lesson_id, question_type');

const lessonMapping = {};

englishWithLessons.forEach(q => {
  if (q.lesson_id) {
    if (!lessonMapping[q.lesson_id]) {
      const lesson = lessons.find(l => l.id === q.lesson_id);
      lessonMapping[q.lesson_id] = {
        key: lesson?.lesson_key,
        title: lesson?.title,
        subject: lesson?.subject,
        count: 0,
        types: new Set(),
      };
    }
    lessonMapping[q.lesson_id].count++;
    lessonMapping[q.lesson_id].types.add(q.question_type);
  }
});

// Convert Sets to Arrays for JSON
Object.values(lessonMapping).forEach(mapping => {
  mapping.types = Array.from(mapping.types);
});

console.log(`Total lessons mapped: ${Object.keys(lessonMapping).length}`);

const topLessons = Object.entries(lessonMapping)
  .sort(([,a], [,b]) => b.count - a.count)
  .slice(0, 10);

console.log('Top 10 most used lessons:');
topLessons.forEach(([id, data]) => {
  console.log(`  ${data.key}: ${data.count} questions (${data.types.slice(0, 3).join(', ')})`);
});

analysis.blueprints.lessons = lessonMapping;

// ============================================================================
// 7. GENERATIVE TEMPLATES
// ============================================================================
console.log('\n🧬 7. GENERATIVE TEMPLATES\n');

const extractTemplates = (questions) => {
  const templates = {};

  questions.slice(0, 100).forEach(q => {
    // Extract template structure
    const stemWords = q.question_stem?.split(/\s+/).length || 0;
    const hasUnderline = q.question_stem?.includes('<u>');
    const choiceAPattern = q.choice_a?.includes('NO CHANGE') ? 'NO_CHANGE' :
                          q.choice_a?.length < 10 ? 'SHORT' :
                          q.choice_a?.length < 30 ? 'MEDIUM' : 'LONG';

    const templateKey = `${q.question_type}_${hasUnderline ? 'U' : 'N'}_${choiceAPattern}`;

    if (!templates[templateKey]) {
      templates[templateKey] = {
        type: q.question_type,
        category: q.question_category,
        hasUnderline,
        choiceAPattern,
        count: 0,
        example: {
          stem: q.question_stem?.substring(0, 100),
          choices: [q.choice_a, q.choice_b, q.choice_c, q.choice_d].map(c => c?.substring(0, 50)),
        },
      };
    }

    templates[templateKey].count++;
  });

  return templates;
};

const englishTemplates = extractTemplates(englishFull.slice(0, 200));

console.log(`Extracted ${Object.keys(englishTemplates).length} unique question templates`);

Object.entries(englishTemplates)
  .sort(([,a], [,b]) => b.count - a.count)
  .slice(0, 5)
  .forEach(([key, data]) => {
    console.log(`  ${key}: ${data.count} instances`);
  });

analysis.templates.english = englishTemplates;

// ============================================================================
// SAVE ANALYSIS
// ============================================================================
console.log('\n' + '='.repeat(80));
console.log('\n💾 Saving ultra-molecular analysis...\n');

const outputPath = join(__dirname, '../../reports/ultra-molecular-analysis.json');
fs.writeFileSync(outputPath, JSON.stringify(analysis, null, 2));

console.log(`✅ Analysis saved to: ${outputPath}`);
console.log(`\n📊 Summary:`);
console.log(`  - ${Object.keys(englishTaxonomy).length} English question types mapped`);
console.log(`  - ${Object.keys(englishTemplates).length} generative templates extracted`);
console.log(`  - ${Object.keys(lessonMapping).length} lessons mapped with usage patterns`);
console.log(`  - ${englishPassageBlueprint.count + readingPassageBlueprint.count + sciencePassageBlueprint.count} passage blueprints analyzed`);
console.log(`  - Answer distribution patterns for all sections`);
console.log(`  - Linguistic analysis of sentence structure`);
console.log('\n🎯 This analysis provides complete blueprints for 1:1 ACT test generation\n');
console.log('='.repeat(80));
