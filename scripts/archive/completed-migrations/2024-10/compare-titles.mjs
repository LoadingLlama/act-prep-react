import { createClient } from '@supabase/supabase-js';
import dotenv from 'dotenv';
import { supabaseUrl, supabaseServiceKey } from './config.mjs';

dotenv.config();

const SERVICE_ROLE_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InJhYmF2b2Jka2xud3Z3c2xkYml4Iiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc1OTc2NTQ3OCwiZXhwIjoyMDc1MzQxNDc4fQ.81SeH703keXgF3IevQlRS7OYmn1J2GUVIkn3OJiviM4';

const supabase = createClient(
  process.env.REACT_APP_SUPABASE_URL,
  SERVICE_ROLE_KEY
);

// Expected titles from PrepPros
const expectedTitles = {
  'backsolving': 'Backsolving',
  'substitution': 'Substitution',
  'geometry-angles': 'Geometry Part 1 — Angles',
  'geometry-shapes': 'Geometry Part 2 — Shapes',
  'lines': 'Lines',
  'fractions': 'Fractions',
  'algebra-skills': 'Algebra Skills',
  'number-theory': 'Number Theory',
  'percentages': 'Percentages',
  'ratios-proportions': 'Ratios and Proportions',
  'functions': 'Functions',
  'statistics-basics': 'Mean, Median, Mode, and Range',
  'exponents-roots': 'Exponents and Roots',
  'logarithms': 'Logarithms',
  'systems-equations': 'Systems of Equations',
  'quadratics': 'Quadratics',
  'trigonometry': 'Trigonometry',
  'absolute-value': 'Absolute Value',
  'matrices': 'Matrices',
  'repeating-patterns': 'Repeating Patterns',
  'circles-ellipses': 'Circles, Ellipses, and Hyperbolas',
  'probability': 'Probability',
  'permutations-combinations': 'Factorial, Permutations, Combinations, and Organized Counting',
  'sequences': 'Sequences',
  'complex-numbers': 'Complex Numbers',
  'word-problems': 'Word Problems',
  'inequalities': 'Inequalities',
  'exponential-growth': 'Exponential Growth and Decay',
  'unit-conversion': 'Unit Conversion',
  'scientific-notation': 'Scientific Notation',
  'arcs-sectors': 'Arcs and Sectors',
  'vectors': 'Vectors',
  'transforming-functions': 'Shifting and Transforming Functions',
  'statistics-advanced': 'Statistics',
  'miscellaneous-topics': 'Miscellaneous Topics'
};

async function compareTitles() {
  console.log('\n' + '='.repeat(70));
  console.log('COMPARING CHAPTER TITLES');
  console.log('='.repeat(70) + '\n');

  const { data: lessons, error } = await supabase
    .from('lessons')
    .select('lesson_key, title')
    .eq('subject', 'math')
    .order('lesson_key');

  if (error) {
    console.error('Error:', error);
    return;
  }

  const mismatches = [];

  for (const lesson of lessons) {
    const expected = expectedTitles[lesson.lesson_key];
    if (!expected) {
      console.log(`⚠️  ${lesson.lesson_key}: No expected title found`);
      continue;
    }

    // Remove "Chapter X: " prefix from current title if it exists
    let currentTitle = lesson.title;
    const chapterMatch = currentTitle.match(/^Chapter \d+:\s*/);
    if (chapterMatch) {
      currentTitle = currentTitle.replace(chapterMatch[0], '');
    }

    if (currentTitle !== expected) {
      mismatches.push({
        lessonKey: lesson.lesson_key,
        current: lesson.title,
        expected: expected
      });
      console.log(`❌ ${lesson.lesson_key}:`);
      console.log(`   Current:  "${lesson.title}"`);
      console.log(`   Expected: "${expected}"`);
      console.log('');
    } else {
      console.log(`✅ ${lesson.lesson_key}: "${expected}"`);
    }
  }

  console.log('\n' + '='.repeat(70));
  console.log(`SUMMARY: ${mismatches.length} mismatches found`);
  console.log('='.repeat(70) + '\n');

  if (mismatches.length > 0) {
    console.log('Mismatches:');
    mismatches.forEach(m => {
      console.log(`  - ${m.lessonKey}: "${m.current}" → "${m.expected}"`);
    });
  }

  return mismatches;
}

compareTitles();
