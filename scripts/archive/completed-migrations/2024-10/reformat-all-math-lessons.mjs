import { createClient } from '@supabase/supabase-js';
import * as dotenv from 'dotenv';
import { fileURLToPath } from 'url';
import { dirname, resolve } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
dotenv.config({ path: resolve(__dirname, '../.env') });

const supabase = createClient(
  process.env.REACT_APP_SUPABASE_URL,
  process.env.SUPABASE_SERVICE_ROLE_KEY
);

// All 35 lessons in order
const lessons = [
  // Unit 1: Test-Taking Strategies (already done)
  { key: 'backsolving', skip: true },
  { key: 'substitution', skip: true },

  // Unit 2: Geometry
  { key: 'geometry-angles', skip: true }, // Already done as example
  { key: 'geometry-shapes', title: 'Topic 2.2 - Areas, Volumes & Triangles' },
  { key: 'lines', title: 'Topic 2.3 - Lines' },
  { key: 'arcs-sectors', title: 'Topic 2.4 - Arcs and Sectors' },
  { key: 'circles-ellipses', title: 'Topic 2.5 - Circles, Ellipses, and Hyperbolas' },

  // Unit 3: Algebra Fundamentals
  { key: 'algebra-skills', title: 'Topic 3.1 - Algebra Skills' },
  { key: 'fractions', title: 'Topic 3.2 - Fractions' },
  { key: 'exponents-roots', title: 'Topic 3.3 - Exponents and Roots' },
  { key: 'logarithms', title: 'Topic 3.4 - Logarithms' },
  { key: 'inequalities', title: 'Topic 3.5 - Inequalities' },
  { key: 'absolute-value', title: 'Topic 3.6 - Absolute Value' },

  // Unit 4: Advanced Algebra
  { key: 'systems-equations', title: 'Topic 4.1 - Systems of Equations' },
  { key: 'quadratics', title: 'Topic 4.2 - Quadratics' },
  { key: 'functions', title: 'Topic 4.3 - Functions' },
  { key: 'transforming-functions', title: 'Topic 4.4 - Shifting and Transforming Functions' },
  { key: 'exponential-growth', title: 'Topic 4.5 - Exponential Growth and Decay' },
  { key: 'sequences', title: 'Topic 4.6 - Sequences' },

  // Unit 5: Numbers & Operations
  { key: 'number-theory', title: 'Topic 5.1 - Number Theory' },
  { key: 'percentages', title: 'Topic 5.2 - Percentages' },
  { key: 'ratios-proportions', title: 'Topic 5.3 - Ratios and Proportions' },
  { key: 'unit-conversion', title: 'Topic 5.4 - Unit Conversion' },
  { key: 'scientific-notation', title: 'Topic 5.5 - Scientific Notation' },
  { key: 'repeating-patterns', title: 'Topic 5.6 - Repeating Patterns' },

  // Unit 6: Statistics & Probability
  { key: 'statistics-basics', title: 'Topic 6.1 - Mean, Median, Mode, and Range' },
  { key: 'statistics-advanced', title: 'Topic 6.2 - Statistics' },
  { key: 'probability', title: 'Topic 6.3 - Probability' },
  { key: 'permutations-combinations', title: 'Topic 6.4 - Permutations, Combinations, and Organized Counting' },

  // Unit 7: Advanced Topics
  { key: 'trigonometry', title: 'Topic 7.1 - Trigonometry' },
  { key: 'complex-numbers', title: 'Topic 7.2 - Complex Numbers' },
  { key: 'matrices', title: 'Topic 7.3 - Matrices' },
  { key: 'vectors', title: 'Topic 7.4 - Vectors' },
  { key: 'word-problems', title: 'Topic 7.5 - Word Problems' },
  { key: 'miscellaneous-topics', title: 'Topic 7.6 - Miscellaneous Topics' }
];

console.log('📚 Reformatting all 35 math lessons...\n');
console.log('This script will list which lessons need reformatting.\n');

let needsReformat = 0;
let alreadyDone = 0;

for (const lesson of lessons) {
  if (lesson.skip) {
    console.log(`✓ ${lesson.key} - Already properly formatted`);
    alreadyDone++;
  } else {
    console.log(`⚠️  ${lesson.key} - Needs reformatting`);
    needsReformat++;
  }
}

console.log(`\n📊 Summary:`);
console.log(`   Already done: ${alreadyDone}`);
console.log(`   Need reformatting: ${needsReformat}`);
console.log(`\nNext step: Create formatted content for each lesson from PrepPros source material`);
