#!/usr/bin/env node

/**
 * INTELLIGENT LESSON ASSIGNMENT FOR TEST 5
 *
 * Deep content analysis to match each question to the most appropriate lesson
 * based on actual question content, underlined text, and answer choices
 */

import { createClient } from '@supabase/supabase-js';
import * as dotenv from 'dotenv';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';
import fs from 'fs';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
dotenv.config({ path: join(__dirname, '../../.env') });

const supabase = createClient(process.env.REACT_APP_SUPABASE_URL, process.env.SUPABASE_SERVICE_ROLE_KEY);

console.log('🧠 INTELLIGENT LESSON ASSIGNMENT - PRACTICE TEST 5\n');
console.log('Deep content analysis for accurate lesson matching\n');
console.log('='.repeat(80));

// ============================================================================
// STEP 1: FETCH LESSONS
// ============================================================================

const { data: allLessons } = await supabase.from('lessons').select('*');
const lessonsByKey = {};
for (const lesson of allLessons || []) {
  lessonsByKey[lesson.lesson_key] = lesson;
}

console.log('\nFetched ' + allLessons.length + ' lessons from database');

// ============================================================================
// STEP 2: INTELLIGENT ENGLISH LESSON MATCHING
// ============================================================================

const { data: engQuestions } = await supabase
  .from('act_english_questions')
  .select('*')
  .eq('test_number', 5)
  .order('question_number');

console.log('\nAnalyzing ' + engQuestions.length + ' English questions...\n');

function analyzeEnglishQuestion(q) {
  const stem = q.question_stem.toLowerCase();
  const underlined = (q.underlined_text || '').toLowerCase();
  const allChoices = [q.choice_a, q.choice_b, q.choice_c, q.choice_d].join(' ').toLowerCase();

  // Organization questions (usually Q15, 30, 45, 60, 75)
  if (stem.includes('suppose the writer') || stem.includes('primary purpose')) {
    return { key: 'which-choice', reason: 'Essay purpose question' };
  }

  if (stem.includes('delete') || stem.includes('add')) {
    if (stem.includes('sentence') || stem.includes('paragraph')) {
      return { key: 'adding-deleting', reason: 'Adding/deleting sentence' };
    }
  }

  if (stem.includes('placed here') || stem.includes('most logical') || stem.includes('best place')) {
    return { key: 'logical-placement', reason: 'Sentence placement' };
  }

  if (stem.includes('most effective') || stem.includes('best accomplish') || stem.includes('best convey')) {
    return { key: 'which-choice', reason: 'Which choice question' };
  }

  // Transition words
  if (allChoices.includes('however') || allChoices.includes('therefore') ||
      allChoices.includes('moreover') || allChoices.includes('furthermore') ||
      allChoices.includes('nevertheless') || allChoices.includes('consequently')) {
    return { key: 'transitions', reason: 'Transition word choices' };
  }

  // Comma rules
  if (underlined.match(/,.*,/) || (underlined.includes(',') && allChoices.match(/,.*,/))) {
    return { key: 'commas', reason: 'Multiple commas in question' };
  }

  // Punctuation (semicolons, colons, dashes)
  if (underlined.includes(';') || underlined.includes(':') || underlined.includes('—') ||
      allChoices.includes(';') || allChoices.includes(':')) {
    return { key: 'punctuation', reason: 'Advanced punctuation' };
  }

  // Verbs (tense, agreement)
  if (underlined.match(/\b(is|are|was|were|be|been|being|have|has|had)\b/) ||
      allChoices.match(/\b(is|are|was|were|will|would|has|have|had)\b/)) {
    if (allChoices.match(/\b(is|are|was|were|has|have)\b.*\b(is|are|was|were|has|have)\b/)) {
      return { key: 'verbs', reason: 'Verb tense/agreement' };
    }
  }

  // Pronouns
  if (underlined.match(/\b(who|whom|whose|which|that|it|its|their|they|them)\b/) ||
      allChoices.match(/\b(who|whom|which|that)\b/)) {
    return { key: 'pronouns', reason: 'Pronoun usage' };
  }

  // Modifiers
  if (stem.includes('modifier') || underlined.match(/\b(very|extremely|quite|rather)\b/)) {
    return { key: 'modifiers', reason: 'Modifier placement' };
  }

  // Parallel structure
  if (underlined.includes(' and ') || underlined.includes(', and ') || underlined.includes(' or ')) {
    if (allChoices.match(/(ing|ed|to \w+).*\band\b.*(ing|ed|to \w+)/)) {
      return { key: 'parallel-structure', reason: 'Parallel structure in list' };
    }
  }

  // Redundancy
  if (q.question_type === 'style' && allChoices.includes('delete')) {
    return { key: 'redundancy', reason: 'DELETE option for wordiness' };
  }

  if (stem.includes('concise') || stem.includes('wordy') || stem.includes('redundant')) {
    return { key: 'redundancy', reason: 'Wordiness/conciseness' };
  }

  // Sentence structure (fragments, run-ons)
  if (underlined.includes('.') || underlined.includes(';')) {
    return { key: 'sentence-structure', reason: 'Sentence boundary' };
  }

  // Default based on category
  if (q.question_category === 'CSE') {
    return { key: 'sentence-structure', reason: 'Default CSE' };
  } else {
    return { key: 'redundancy', reason: 'Default POW' };
  }
}

const englishAssignments = [];
for (const q of engQuestions || []) {
  const analysis = analyzeEnglishQuestion(q);
  englishAssignments.push({
    question_number: q.question_number,
    lesson_id: lessonsByKey[analysis.key]?.id,
    lesson_key: analysis.key,
    reason: analysis.reason
  });
}

// ============================================================================
// STEP 3: MATH LESSON MATCHING
// ============================================================================

const { data: mathQuestions } = await supabase
  .from('act_math_questions')
  .select('*')
  .eq('test_number', 5)
  .order('question_number');

console.log('Analyzing ' + mathQuestions.length + ' Math questions...\n');

function analyzeMathQuestion(q) {
  const stem = q.question_stem.toLowerCase();
  const type = q.question_type;

  // Map based on question_type with more specificity
  if (type === 'probability') return { key: '4.2', reason: 'Probability' };
  if (type === 'statistics') return { key: '4.2', reason: 'Statistics' };
  if (type === 'trigonometry') return { key: '2.1', reason: 'Trigonometry' };
  if (type === 'coordinate_geometry') return { key: '2.3', reason: 'Coordinate geometry' };

  if (type === 'geometry') {
    if (stem.includes('area') || stem.includes('volume') || stem.includes('perimeter')) {
      return { key: '2.2', reason: 'Area/Volume' };
    }
    if (stem.includes('circle') || stem.includes('arc') || stem.includes('sector')) {
      return { key: '2.4', reason: 'Circles/Arcs' };
    }
    if (stem.includes('line') || stem.includes('slope')) {
      return { key: '2.3', reason: 'Lines' };
    }
    return { key: '2.2', reason: 'General geometry' };
  }

  if (type === 'algebra') {
    if (stem.includes('fraction')) return { key: '3.2', reason: 'Fractions' };
    if (stem.includes('exponent') || stem.includes('power') || stem.includes('√')) {
      return { key: '3.3', reason: 'Exponents/Roots' };
    }
    if (stem.includes('log')) return { key: '3.4', reason: 'Logarithms' };
    if (stem.includes('<') || stem.includes('>') || stem.includes('≤') || stem.includes('≥')) {
      return { key: '3.5', reason: 'Inequalities' };
    }
    if (stem.includes('|') || stem.includes('absolute')) {
      return { key: '3.6', reason: 'Absolute value' };
    }
    return { key: '3.1', reason: 'Algebra skills' };
  }

  if (type === 'arithmetic') {
    if (stem.includes('%') || stem.includes('percent')) return { key: '5.2', reason: 'Percentages' };
    if (stem.includes('ratio') || stem.includes('proportion')) return { key: '5.3', reason: 'Ratios' };
    return { key: '3.1', reason: 'Arithmetic' };
  }

  if (type === 'functions') return { key: '3.7', reason: 'Functions' };
  if (type === 'number_theory') return { key: '5.1', reason: 'Number theory' };

  return { key: '3.1', reason: 'Default algebra' };
}

const mathAssignments = [];
for (const q of mathQuestions || []) {
  const analysis = analyzeMathQuestion(q);
  mathAssignments.push({
    question_number: q.question_number,
    lesson_id: lessonsByKey[analysis.key]?.id || lessonsByKey['3.1']?.id,
    lesson_key: analysis.key,
    reason: analysis.reason
  });
}

// ============================================================================
// STEP 4: READING & SCIENCE (Use defaults - passage-based)
// ============================================================================

const { data: readingQuestions } = await supabase
  .from('act_reading_questions')
  .select('*')
  .eq('test_number', 5);

const { data: scienceQuestions } = await supabase
  .from('act_science_questions')
  .select('*')
  .eq('test_number', 5);

const readingAssignments = [];
for (const q of readingQuestions || []) {
  readingAssignments.push({
    question_number: q.question_number,
    lesson_id: lessonsByKey['core-principles']?.id,
    lesson_key: 'core-principles',
    reason: 'Core reading strategy'
  });
}

const scienceAssignments = [];
for (const q of scienceQuestions || []) {
  let key = 'passage-approach';
  let reason = 'Data analysis';

  if (q.question_type === 'scientific-investigation') {
    key = 'experimental-setup';
    reason = 'Experimental design';
  } else if (q.question_type === 'evaluation') {
    key = 'question-diagnosis';
    reason = 'Evaluation of models';
  }

  scienceAssignments.push({
    question_number: q.question_number,
    lesson_id: lessonsByKey[key]?.id,
    lesson_key: key,
    reason: reason
  });
}

// ============================================================================
// STEP 5: GENERATE SUMMARY
// ============================================================================

console.log('📊 INTELLIGENT LESSON ASSIGNMENT SUMMARY:\n');

const summary = {
  english: {},
  math: {},
  reading: {},
  science: {}
};

for (const a of englishAssignments) {
  if (!summary.english[a.lesson_key]) summary.english[a.lesson_key] = 0;
  summary.english[a.lesson_key]++;
}

for (const a of mathAssignments) {
  if (!summary.math[a.lesson_key]) summary.math[a.lesson_key] = 0;
  summary.math[a.lesson_key]++;
}

for (const a of readingAssignments) {
  if (!summary.reading[a.lesson_key]) summary.reading[a.lesson_key] = 0;
  summary.reading[a.lesson_key]++;
}

for (const a of scienceAssignments) {
  if (!summary.science[a.lesson_key]) summary.science[a.lesson_key] = 0;
  summary.science[a.lesson_key]++;
}

console.log('ENGLISH (75 questions):');
for (const [key, count] of Object.entries(summary.english).sort((a, b) => b[1] - a[1])) {
  console.log('  [' + key + ']: ' + count + ' questions');
}

console.log('\nMATH (60 questions):');
for (const [key, count] of Object.entries(summary.math).sort((a, b) => b[1] - a[1])) {
  console.log('  [' + key + ']: ' + count + ' questions');
}

console.log('\nREADING (40 questions):');
for (const [key, count] of Object.entries(summary.reading)) {
  console.log('  [' + key + ']: ' + count + ' questions');
}

console.log('\nSCIENCE (40 questions):');
for (const [key, count] of Object.entries(summary.science)) {
  console.log('  [' + key + ']: ' + count + ' questions');
}

// Save detailed assignment plan
const reportPath = join(__dirname, '../../TEST5-INTELLIGENT-LESSON-ASSIGNMENTS.json');
fs.writeFileSync(reportPath, JSON.stringify({
  timestamp: new Date().toISOString(),
  english: englishAssignments,
  math: mathAssignments,
  reading: readingAssignments,
  science: scienceAssignments,
  summary: summary
}, null, 2));

console.log('\n' + '='.repeat(80));
console.log('\n✅ Intelligent lesson assignments generated');
console.log('📄 Saved to: TEST5-INTELLIGENT-LESSON-ASSIGNMENTS.json');
console.log('\n✨ Ready to apply to database\n');
console.log('='.repeat(80) + '\n');
