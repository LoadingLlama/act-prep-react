#!/usr/bin/env node

/**
 * INTELLIGENT LESSON ASSIGNMENT - ALL TESTS (1-6)
 *
 * Applies intelligent content-based lesson matching to all 1,290 questions
 * Uses the same sophisticated analysis developed for Test 5
 */

import { createClient } from '@supabase/supabase-js';
import * as dotenv from 'dotenv';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
dotenv.config({ path: join(__dirname, '../../.env') });

const supabase = createClient(process.env.REACT_APP_SUPABASE_URL, process.env.SUPABASE_SERVICE_ROLE_KEY);

console.log('🧠 INTELLIGENT LESSON ASSIGNMENT - ALL TESTS (1-7)\n');
console.log('Applying content-based analysis to all 1,505 questions\n');
console.log('='.repeat(80));

// ============================================================================
// FETCH LESSONS
// ============================================================================

const { data: allLessons } = await supabase.from('lessons').select('*');
const lessonsByKey = {};
for (const lesson of allLessons || []) {
  lessonsByKey[lesson.lesson_key] = lesson;
}

console.log('\nFetched ' + allLessons.length + ' lessons from database\n');

// ============================================================================
// ANALYSIS FUNCTIONS (same as Test 5)
// ============================================================================

function analyzeEnglishQuestion(q) {
  const stem = q.question_stem.toLowerCase();
  const underlined = (q.underlined_text || '').toLowerCase();
  const allChoices = [q.choice_a, q.choice_b, q.choice_c, q.choice_d].join(' ').toLowerCase();

  // Organization questions
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
  if (underlined.match(/\\b(is|are|was|were|be|been|being|have|has|had)\\b/) ||
      allChoices.match(/\\b(is|are|was|were|will|would|has|have|had)\\b/)) {
    if (allChoices.match(/\\b(is|are|was|were|has|have)\\b.*\\b(is|are|was|were|has|have)\\b/)) {
      return { key: 'verbs', reason: 'Verb tense/agreement' };
    }
  }

  // Pronouns
  if (underlined.match(/\\b(who|whom|whose|which|that|it|its|their|they|them)\\b/) ||
      allChoices.match(/\\b(who|whom|which|that)\\b/)) {
    return { key: 'pronouns', reason: 'Pronoun usage' };
  }

  // Modifiers
  if (stem.includes('modifier') || underlined.match(/\\b(very|extremely|quite|rather)\\b/)) {
    return { key: 'modifiers', reason: 'Modifier placement' };
  }

  // Parallel structure
  if (underlined.includes(' and ') || underlined.includes(', and ') || underlined.includes(' or ')) {
    if (allChoices.match(/(ing|ed|to \\w+).*\\band\\b.*(ing|ed|to \\w+)/)) {
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

function analyzeMathQuestion(q) {
  const stem = q.question_stem.toLowerCase();
  const type = q.question_type;

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

// ============================================================================
// PROCESS ALL TESTS
// ============================================================================

let totalUpdated = 0;
let totalErrors = 0;

for (let testNum = 1; testNum <= 7; testNum++) {
  console.log('Processing Test ' + testNum + '...\n');

  // -------------------------------------------------------------------------
  // ENGLISH
  // -------------------------------------------------------------------------
  const { data: engQuestions } = await supabase
    .from('act_english_questions')
    .select('*')
    .eq('test_number', testNum)
    .order('question_number');

  for (const q of engQuestions || []) {
    const analysis = analyzeEnglishQuestion(q);
    const lesson_id = lessonsByKey[analysis.key]?.id;

    if (lesson_id) {
      const { error } = await supabase
        .from('act_english_questions')
        .update({ lesson_id })
        .eq('test_number', testNum)
        .eq('question_number', q.question_number);

      if (error) {
        totalErrors++;
      } else {
        totalUpdated++;
      }
    }
  }

  // -------------------------------------------------------------------------
  // MATH
  // -------------------------------------------------------------------------
  const { data: mathQuestions } = await supabase
    .from('act_math_questions')
    .select('*')
    .eq('test_number', testNum)
    .order('question_number');

  for (const q of mathQuestions || []) {
    const analysis = analyzeMathQuestion(q);
    const lesson_id = lessonsByKey[analysis.key]?.id || lessonsByKey['3.1']?.id;

    if (lesson_id) {
      const { error } = await supabase
        .from('act_math_questions')
        .update({ lesson_id })
        .eq('test_number', testNum)
        .eq('question_number', q.question_number);

      if (error) {
        totalErrors++;
      } else {
        totalUpdated++;
      }
    }
  }

  // -------------------------------------------------------------------------
  // READING
  // -------------------------------------------------------------------------
  const { data: readingQuestions } = await supabase
    .from('act_reading_questions')
    .select('*')
    .eq('test_number', testNum);

  const readingLessonId = lessonsByKey['core-principles']?.id;

  for (const q of readingQuestions || []) {
    if (readingLessonId) {
      const { error } = await supabase
        .from('act_reading_questions')
        .update({ lesson_id: readingLessonId })
        .eq('test_number', testNum)
        .eq('question_number', q.question_number);

      if (error) {
        totalErrors++;
      } else {
        totalUpdated++;
      }
    }
  }

  // -------------------------------------------------------------------------
  // SCIENCE
  // -------------------------------------------------------------------------
  const { data: scienceQuestions } = await supabase
    .from('act_science_questions')
    .select('*')
    .eq('test_number', testNum);

  for (const q of scienceQuestions || []) {
    let lessonKey = 'passage-approach';

    if (q.question_type === 'scientific-investigation') {
      lessonKey = 'experimental-setup';
    } else if (q.question_type === 'evaluation') {
      lessonKey = 'question-diagnosis';
    }

    const lesson_id = lessonsByKey[lessonKey]?.id;

    if (lesson_id) {
      const { error } = await supabase
        .from('act_science_questions')
        .update({ lesson_id })
        .eq('test_number', testNum)
        .eq('question_number', q.question_number);

      if (error) {
        totalErrors++;
      } else {
        totalUpdated++;
      }
    }
  }

  console.log('  ✅ Test ' + testNum + ' complete\n');
}

console.log('='.repeat(80));
console.log('\n✅ INTELLIGENT LESSON ASSIGNMENT COMPLETE\n');
console.log('Total questions updated: ' + totalUpdated);
console.log('Errors encountered: ' + totalErrors);
console.log('\n='.repeat(80) + '\n');
