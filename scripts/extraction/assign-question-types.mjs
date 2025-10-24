#!/usr/bin/env node

/**
 * ASSIGN QUESTION TYPES - Add question_type to all Math, Reading, Science questions
 */

import { createClient } from '@supabase/supabase-js';
import * as dotenv from 'dotenv';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

dotenv.config({ path: join(__dirname, '../../.env') });

const supabase = createClient(process.env.REACT_APP_SUPABASE_URL, process.env.SUPABASE_SERVICE_ROLE_KEY);

console.log('📝 Assigning question_type to all questions...\n');

// MATH question types based on notes
function getMathQuestionType(notes) {
  if (!notes) return 'math-problem-solving';

  const n = notes.toLowerCase();

  // Geometry types
  if (n.includes('geometry') || n.includes('angles') || n.includes('triangle') || n.includes('circle') ||
      n.includes('area') || n.includes('volume') || n.includes('perimeter') || n.includes('pythagorean')) {
    return 'geometry';
  }

  // Trigonometry
  if (n.includes('trigonometry') || n.includes('sin') || n.includes('cos') || n.includes('tan') ||
      n.includes('law of cosines') || n.includes('law of sines')) {
    return 'trigonometry';
  }

  // Algebra
  if (n.includes('algebra') || n.includes('equation') || n.includes('inequality') || n.includes('solving') ||
      n.includes('system') || n.includes('quadratic') || n.includes('linear')) {
    return 'algebra';
  }

  // Functions
  if (n.includes('function') || n.includes('composition') || n.includes('domain') || n.includes('range')) {
    return 'functions';
  }

  // Exponents/Logarithms
  if (n.includes('exponent') || n.includes('logarithm') || n.includes('exponential')) {
    return 'exponents-logarithms';
  }

  // Statistics/Probability
  if (n.includes('probability') || n.includes('mean') || n.includes('median') || n.includes('statistics')) {
    return 'statistics-probability';
  }

  // Coordinate Geometry
  if (n.includes('coordinate') || n.includes('slope') || n.includes('distance') || n.includes('midpoint') || n.includes('intercept')) {
    return 'coordinate-geometry';
  }

  // Word Problems
  if (n.includes('word problem')) {
    return 'word-problem';
  }

  // Number Theory
  if (n.includes('integer') || n.includes('rational') || n.includes('number theory') || n.includes('fraction')) {
    return 'number-theory';
  }

  // Advanced Topics
  if (n.includes('matrix') || n.includes('matrices')) return 'matrices';
  if (n.includes('vector')) return 'vectors';
  if (n.includes('complex')) return 'complex-numbers';
  if (n.includes('sequence')) return 'sequences';
  if (n.includes('permutation') || n.includes('combination') || n.includes('combinatorics')) return 'counting';

  // Default
  return 'math-problem-solving';
}

// READING question types based on notes
function getReadingQuestionType(notes) {
  if (!notes) return 'comprehension';

  const n = notes.toLowerCase();

  if (n.includes('main idea') || n.includes('purpose') || n.includes('main purpose')) return 'main-idea';
  if (n.includes('detail') || n.includes('clear evidence')) return 'detail';
  if (n.includes('inference') || n.includes('infer')) return 'inference';
  if (n.includes('vocabulary') || n.includes('words in context') || n.includes('word')) return 'vocabulary';
  if (n.includes('tone')) return 'tone';
  if (n.includes('structure')) return 'structure';
  if (n.includes('comparison') || n.includes('comparing') || n.includes('dual passage')) return 'comparison';
  if (n.includes('chronological') || n.includes('sequence')) return 'sequence';
  if (n.includes('character')) return 'characterization';
  if (n.includes('perspective') || n.includes('point of view')) return 'perspective';
  if (n.includes('interpretation')) return 'interpretation';

  return 'comprehension';
}

// SCIENCE question types based on notes
function getScienceQuestionType(notes) {
  if (!notes) return 'data-interpretation';

  const n = notes.toLowerCase();

  if (n.includes('reading tables') || n.includes('reading charts') || n.includes('reading graphs') ||
      n.includes('specific data')) return 'data-interpretation';
  if (n.includes('trends')) return 'trends';
  if (n.includes('two-part')) return 'two-part-reasoning';
  if (n.includes('scientific thinking') || n.includes('hypothesis') || n.includes('experimental')) return 'experimental-design';
  if (n.includes('conflicting viewpoints')) return 'conflicting-viewpoints';
  if (n.includes('interpolation') || n.includes('extrapolation') || n.includes('approximation')) return 'approximation';
  if (n.includes('comparison')) return 'comparison';
  if (n.includes('ordering')) return 'ordering-data';
  if (n.includes('application')) return 'application';
  if (n.includes('finding info')) return 'finding-information';
  if (n.includes('assessing')) return 'evaluating-information';

  return 'data-interpretation';
}

// Get all questions without question_type
const { data: questions } = await supabase
  .from('act_questions')
  .select('*')
  .eq('test_number', 1)
  .order('section')
  .order('question_number');

let updated = 0;

for (const q of questions) {
  let questionType = q.question_type;

  // Only update if question_type is missing
  if (!questionType) {
    if (q.section === 'M') {
      questionType = getMathQuestionType(q.notes);
    } else if (q.section === 'R') {
      questionType = getReadingQuestionType(q.notes);
    } else if (q.section === 'S') {
      questionType = getScienceQuestionType(q.notes);
    }

    if (questionType) {
      const { error } = await supabase
        .from('act_questions')
        .update({ question_type: questionType })
        .eq('id', q.id);

      if (!error) {
        console.log(`✅ ${q.section}Q${q.question_number} → ${questionType}`);
        updated++;
      }
    }
  }
}

console.log(`\n📊 Results:`);
console.log(`  ✅ Updated: ${updated}`);
console.log(`  📝 Total questions checked: ${questions.length}`);

// Verify completion
const { data: remaining } = await supabase
  .from('act_questions')
  .select('section')
  .eq('test_number', 1)
  .is('question_type', null);

console.log(`  ⚠️  Still missing question_type: ${remaining.length}`);

if (remaining.length === 0) {
  console.log('\n🎉 ALL QUESTIONS NOW HAVE question_type!');
}
