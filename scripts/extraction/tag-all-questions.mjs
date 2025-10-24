#!/usr/bin/env node

/**
 * TAG ALL QUESTIONS - Maps all questions to appropriate lessons
 */

import { createClient } from '@supabase/supabase-js';
import * as dotenv from 'dotenv';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

dotenv.config({ path: join(__dirname, '../../.env') });

const supabase = createClient(process.env.REACT_APP_SUPABASE_URL, process.env.SUPABASE_SERVICE_ROLE_KEY);

// Fetch all lessons
const { data: lessons } = await supabase.from('lessons').select('*');
const lessonMap = {};
lessons.forEach(l => { lessonMap[l.lesson_key] = l.id; });

console.log('🏷️  Tagging all questions with lesson_ids...\n');

// ENGLISH MAPPINGS (continue from existing lesson-mapper.mjs logic)
const englishTypeToLesson = {
  'comma-splice': 'sentence-structure',
  'run-on': 'sentence-structure',
  'fragment': 'sentence-structure',
  'comma-usage': 'commas',
  'comma-unnecessary': 'commas',
  'semicolon': 'punctuation',
  'colon': 'punctuation',
  'dash': 'punctuation',
  'verb-tense': 'verbs',
  'verb-form': 'verbs',
  'verb-agreement': 'verbs',
  'pronoun-case': 'pronouns',
  'pronoun-ambiguous': 'pronouns',
  'redundancy': 'redundancy',
  'wordiness': 'redundancy',
  'word-choice': 'word-choice',
  'transition': 'transitions',
  'which-choice': 'which-choice',
  'adding-sentence': 'adding-deleting',
  'adding-info': 'adding-deleting',
  'deleting-sentence': 'adding-deleting',
  'sentence-placement': 'logical-placement',
  'logical-placement': 'logical-placement',
  'main-idea': 'which-choice',
  'modifier-misplaced': 'modifiers',
  'modifier-dangling': 'modifiers',
  'parallel-structure': 'parallel-structure',
  'idiom': 'misc-topics'
};

// MATH MAPPINGS
const mathNotesToLesson = {
  'Functions': 'functions',
  'Geometry': 'geometry-angles',
  'Algebra': '3.1',
  'Word problem': 'word-problems',
  'Probability': '6.3',
  'Exponents': '3.3',
  'Lines': '2.3',
  'Mean': '6.1',
  'Systems': 'systems-equations',
  'Percentages': '5.2',
  'Area': '2.2',
  'Volume': '2.2',
  'Pythagorean': '2.2',
  'Trigonometry': 'trigonometry',
  'Quadratics': 'quadratics',
  'Logarithms': '3.4',
  'Unit Conversion': '5.4',
  'Matrices': 'matrices',
  'Exponential': 'exponential-growth',
  'Fractions': '3.2',
  'Sequences': 'sequences',
  'Complex': 'complex-numbers',
  'Absolute': '3.6',
  'Inequalities': '3.5',
  'Permutations': '6.4',
  'Combinatorics': '6.4',
  'Vectors': 'vectors',
  'slope': '2.3',
  'distance': '2.3',
  'intercepts': '2.3',
  'circle': '2.5',
  'arc': '2.4',
  'Integers': '5.1',
  'scientific notation': '5.5',
  'Ratios': '5.3'
};

// READING MAPPINGS
const readingNotesToLesson = {
  'Main idea': 'question-types',
  'Detail': 'question-types',
  'Inference': 'question-types',
  'Vocabulary': 'words-in-context',
  'Purpose': 'question-types',
  'Comparison': 'comparing-passages',
  'Dual passage': 'comparing-passages',
  'Tone': 'question-types',
  'Structure': 'question-types',
  'Character': 'question-types',
  'Chronological': 'question-types',
  'Interpretation': 'question-types',
  'Broad Passage': 'question-types',
  'Clear Evidence': 'finding-correct-answer'
};

// SCIENCE MAPPINGS
const scienceNotesToLesson = {
  'Reading tables': 'specific-data-point',
  'Reading graphs': 'specific-data-point',
  'Reading Charts': 'specific-data-point',
  'Trends': 'trends',
  'Two-part': 'two-part-answers',
  'Scientific thinking': 'experimental-setup',
  'Experimental design': 'experimental-setup',
  'Hypothesis': 'experimental-setup',
  'Conflicting viewpoints': 'conflicting-viewpoints',
  'Finding info in text': 'passage-approach',
  'Assessing new info': 'experimental-setup',
  'Ordering data': 'specific-data-point',
  'Comparison': 'specific-data-point',
  'Data interpretation': 'specific-data-point',
  'Application': 'experimental-setup',
  'Interpolation': 'approximation',
  'Extrapolation': 'approximation',
  'Approximation': 'approximation'
};

function getLessonKey(section, questionType, notes) {
  if (section === 'E') {
    // English - use question_type
    return englishTypeToLesson[questionType] || null;
  } else if (section === 'M') {
    // Math - search notes for keywords
    if (!notes) return null;
    for (const [keyword, lessonKey] of Object.entries(mathNotesToLesson)) {
      if (notes.toLowerCase().includes(keyword.toLowerCase())) {
        return lessonKey;
      }
    }
    return null;
  } else if (section === 'R') {
    // Reading - search notes for keywords
    if (!notes) return null;
    for (const [keyword, lessonKey] of Object.entries(readingNotesToLesson)) {
      if (notes.includes(keyword)) {
        return lessonKey;
      }
    }
    return 'question-types'; // Default for Reading
  } else if (section === 'S') {
    // Science - search notes for keywords
    if (!notes) return null;
    for (const [keyword, lessonKey] of Object.entries(scienceNotesToLesson)) {
      if (notes.includes(keyword)) {
        return lessonKey;
      }
    }
    return 'specific-data-point'; // Default for Science
  }
  return null;
}

// Get all questions
const { data: questions } = await supabase
  .from('act_questions')
  .select('*')
  .eq('test_number', 1)
  .order('section')
  .order('question_number');

let updated = 0;
let failed = 0;

for (const q of questions) {
  const lessonKey = getLessonKey(q.section, q.question_type, q.notes);

  if (lessonKey && lessonMap[lessonKey]) {
    const { error } = await supabase
      .from('act_questions')
      .update({ lesson_id: lessonMap[lessonKey] })
      .eq('id', q.id);

    if (!error) {
      console.log(`✅ ${q.section}Q${q.question_number} → ${lessonKey}`);
      updated++;
    } else {
      console.log(`❌ ${q.section}Q${q.question_number} failed`);
      failed++;
    }
  } else {
    console.log(`⚠️  ${q.section}Q${q.question_number} - no lesson mapping found (type: ${q.question_type}, notes: ${q.notes?.substring(0, 30)})`);
    failed++;
  }
}

console.log(`\n📊 Results:`);
console.log(`  ✅ Updated: ${updated}`);
console.log(`  ❌ Failed/No Mapping: ${failed}`);
console.log(`  📝 Total: ${questions.length}`);
