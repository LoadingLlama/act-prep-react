#!/usr/bin/env node

/**
 * ASSIGN QUESTION CATEGORIES - ACT reporting categories for all questions
 */

import { createClient } from '@supabase/supabase-js';
import * as dotenv from 'dotenv';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

dotenv.config({ path: join(__dirname, '../../.env') });

const supabase = createClient(process.env.REACT_APP_SUPABASE_URL, process.env.SUPABASE_SERVICE_ROLE_KEY);

console.log('🏷️  Assigning ACT reporting categories...\n');

// ENGLISH Categories: CSE, KLA, POW
const englishTypeToCategory = {
  'comma-splice': 'CSE',
  'run-on': 'CSE',
  'fragment': 'CSE',
  'comma-usage': 'CSE',
  'comma-unnecessary': 'CSE',
  'semicolon': 'CSE',
  'colon': 'CSE',
  'dash': 'CSE',
  'verb-tense': 'CSE',
  'verb-form': 'CSE',
  'verb-agreement': 'CSE',
  'pronoun-case': 'CSE',
  'pronoun-ambiguous': 'CSE',
  'parallel-structure': 'CSE',
  'idiom': 'CSE',
  'modifier-misplaced': 'CSE',
  'modifier-dangling': 'CSE',
  'redundancy': 'KLA',
  'wordiness': 'KLA',
  'word-choice': 'KLA',
  'transition': 'POW',
  'which-choice': 'POW',
  'adding-sentence': 'POW',
  'adding-info': 'POW',
  'deleting-sentence': 'POW',
  'deleting-info': 'POW',
  'sentence-placement': 'POW',
  'logical-placement': 'POW',
  'main-idea': 'POW'
};

// MATH Categories: PHM (Preparing for Higher Math), IES (Integrating Essential Skills)
// PHM subcategories: N (Number & Quantity), A (Algebra), F (Functions), G (Geometry), S (Statistics & Probability)
function getMathCategory(questionType, notes) {
  const n = (notes || '').toLowerCase();
  const t = questionType.toLowerCase();

  // IES - basic arithmetic, rates, percentages, proportions
  if (t.includes('word-problem') || n.includes('word problem') || n.includes('unit rate') ||
      n.includes('percentage') && !n.includes('exponential')) {
    return 'IES';
  }

  // PHM-N (Number & Quantity)
  if (t.includes('number') || t.includes('fraction') || n.includes('fraction') ||
      n.includes('integer') || n.includes('rational') || n.includes('scientific notation')) {
    return 'PHM-N';
  }

  // PHM-A (Algebra)
  if (t.includes('algebra') || t.includes('equation') || t.includes('inequality') ||
      n.includes('algebra') || n.includes('solving') || n.includes('system')) {
    return 'PHM-A';
  }

  // PHM-F (Functions)
  if (t.includes('function') || t.includes('exponent') || t.includes('logarithm') ||
      n.includes('function') || n.includes('exponential') || n.includes('logarithm')) {
    return 'PHM-F';
  }

  // PHM-G (Geometry)
  if (t.includes('geometry') || t.includes('trigonometry') || t.includes('coordinate') ||
      n.includes('geometry') || n.includes('triangle') || n.includes('circle') ||
      n.includes('area') || n.includes('volume') || n.includes('angle') || n.includes('trigonometry')) {
    return 'PHM-G';
  }

  // PHM-S (Statistics & Probability)
  if (t.includes('statistics') || t.includes('probability') || t.includes('counting') ||
      n.includes('probability') || n.includes('mean') || n.includes('median') ||
      n.includes('permutation') || n.includes('combination')) {
    return 'PHM-S';
  }

  // Complex numbers, matrices, vectors, sequences
  if (t.includes('complex') || t.includes('matrix') || t.includes('vector') || t.includes('sequence') ||
      n.includes('complex') || n.includes('matrix') || n.includes('vector') || n.includes('sequence')) {
    return 'PHM-N';
  }

  return 'PHM-A'; // Default to Algebra
}

// READING Categories: KID (Key Ideas & Details), CS (Craft & Structure), IKI (Integration of Knowledge & Ideas)
function getReadingCategory(questionType) {
  const t = questionType.toLowerCase();

  // KID - main ideas, details, sequences, inferences
  if (t.includes('main-idea') || t.includes('detail') || t.includes('sequence') ||
      t.includes('inference') || t.includes('characterization')) {
    return 'KID';
  }

  // CS - word choice, structure, purpose, point of view
  if (t.includes('vocabulary') || t.includes('structure') || t.includes('tone') ||
      t.includes('perspective')) {
    return 'CS';
  }

  // IKI - comparison, analysis across texts
  if (t.includes('comparison') || t.includes('interpretation')) {
    return 'IKI';
  }

  return 'KID'; // Default
}

// SCIENCE Categories: IOD (Interpretation of Data), SIN (Scientific Investigation), EMI (Evaluation of Models)
function getScienceCategory(questionType) {
  const t = questionType.toLowerCase();

  // IOD - reading graphs, tables, trends
  if (t.includes('data-interpretation') || t.includes('trends') || t.includes('approximation') ||
      t.includes('ordering') || t.includes('comparison')) {
    return 'IOD';
  }

  // SIN - experimental design, methodology
  if (t.includes('experimental') || t.includes('application') || t.includes('two-part')) {
    return 'SIN';
  }

  // EMI - conflicting viewpoints, evaluating hypotheses
  if (t.includes('conflicting') || t.includes('evaluating') || t.includes('finding-information')) {
    return 'EMI';
  }

  return 'IOD'; // Default
}

// Get all questions
const { data: questions } = await supabase
  .from('act_questions')
  .select('*')
  .eq('test_number', 1)
  .order('section')
  .order('question_number');

let updated = 0;

for (const q of questions) {
  let category = null;

  if (q.section === 'E') {
    category = englishTypeToCategory[q.question_type];
  } else if (q.section === 'M') {
    category = getMathCategory(q.question_type, q.notes);
  } else if (q.section === 'R') {
    category = getReadingCategory(q.question_type);
  } else if (q.section === 'S') {
    category = getScienceCategory(q.question_type);
  }

  if (category) {
    const { error } = await supabase
      .from('act_questions')
      .update({ question_category: category })
      .eq('id', q.id);

    if (!error) {
      console.log(`✅ ${q.section}Q${q.question_number} → ${category} (${q.question_type})`);
      updated++;
    }
  }
}

console.log(`\n📊 Results:`);
console.log(`  ✅ Updated: ${updated}`);
console.log(`  📝 Total: ${questions.length}`);

// Verify
const { data: remaining } = await supabase
  .from('act_questions')
  .select('section')
  .eq('test_number', 1)
  .is('question_category', null);

console.log(`  ⚠️  Still missing: ${remaining.length}`);

if (remaining.length === 0) {
  console.log('\n🎉 ALL QUESTIONS NOW HAVE question_category!');
}
