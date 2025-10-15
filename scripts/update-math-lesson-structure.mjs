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

// Desired structure
const desiredLessons = [
  { key: 'backsolving', title: 'Topic 1.1 - Working Backwards Strategy', category: 'Test-Taking Strategies', order: 10 },
  { key: 'substitution', title: 'Topic 1.2 - Number Substitution Technique', category: 'Test-Taking Strategies', order: 12 },
  { key: 'geometry-angles', title: 'Topic 2.1 - Understanding Angles & Lines', category: 'Geometry', order: 21 },
  { key: 'geometry-shapes', title: 'Topic 2.2 - Areas, Volumes & Triangles', category: 'Geometry', order: 22 },
  { key: 'lines', title: 'Topic 2.3 - Lines', category: 'Geometry', order: 23 },
  { key: 'arcs-sectors', title: 'Topic 2.4 - Arcs and Sectors', category: 'Geometry', order: 24 },
  { key: 'circles-ellipses', title: 'Topic 2.5 - Circles, Ellipses, and Hyperbolas', category: 'Geometry', order: 25 },
  { key: 'algebra-skills', title: 'Topic 3.1 - Algebra Skills', category: 'Algebra Fundamentals', order: 31 },
  { key: 'fractions', title: 'Topic 3.2 - Fractions', category: 'Algebra Fundamentals', order: 32 },
  { key: 'exponents-roots', title: 'Topic 3.3 - Exponents and Roots', category: 'Algebra Fundamentals', order: 33 },
  { key: 'logarithms', title: 'Topic 3.4 - Logarithms', category: 'Algebra Fundamentals', order: 34 },
  { key: 'inequalities', title: 'Topic 3.5 - Inequalities', category: 'Algebra Fundamentals', order: 35 },
  { key: 'absolute-value', title: 'Topic 3.6 - Absolute Value', category: 'Algebra Fundamentals', order: 36 },
  { key: 'systems-equations', title: 'Topic 4.1 - Systems of Equations', category: 'Advanced Algebra', order: 41 },
  { key: 'quadratics', title: 'Topic 4.2 - Quadratics', category: 'Advanced Algebra', order: 42 },
  { key: 'functions', title: 'Topic 4.3 - Functions', category: 'Advanced Algebra', order: 43 },
  { key: 'transforming-functions', title: 'Topic 4.4 - Shifting and Transforming Functions', category: 'Advanced Algebra', order: 44 },
  { key: 'exponential-growth', title: 'Topic 4.5 - Exponential Growth and Decay', category: 'Advanced Algebra', order: 45 },
  { key: 'sequences', title: 'Topic 4.6 - Sequences', category: 'Advanced Algebra', order: 46 },
  { key: 'number-theory', title: 'Topic 5.1 - Number Theory', category: 'Numbers & Operations', order: 51 },
  { key: 'percentages', title: 'Topic 5.2 - Percentages', category: 'Numbers & Operations', order: 52 },
  { key: 'ratios-proportions', title: 'Topic 5.3 - Ratios and Proportions', category: 'Numbers & Operations', order: 53 },
  { key: 'unit-conversion', title: 'Topic 5.4 - Unit Conversion', category: 'Numbers & Operations', order: 54 },
  { key: 'scientific-notation', title: 'Topic 5.5 - Scientific Notation', category: 'Numbers & Operations', order: 55 },
  { key: 'repeating-patterns', title: 'Topic 5.6 - Repeating Patterns', category: 'Numbers & Operations', order: 56 },
  { key: 'statistics-basics', title: 'Topic 6.1 - Mean, Median, Mode, and Range', category: 'Statistics & Probability', order: 61 },
  { key: 'statistics-advanced', title: 'Topic 6.2 - Statistics', category: 'Statistics & Probability', order: 62 },
  { key: 'probability', title: 'Topic 6.3 - Probability', category: 'Statistics & Probability', order: 63 },
  { key: 'permutations-combinations', title: 'Topic 6.4 - Permutations, Combinations, and Organized Counting', category: 'Statistics & Probability', order: 64 },
  { key: 'trigonometry', title: 'Topic 7.1 - Trigonometry', category: 'Advanced Topics', order: 71 },
  { key: 'complex-numbers', title: 'Topic 7.2 - Complex Numbers', category: 'Advanced Topics', order: 72 },
  { key: 'matrices', title: 'Topic 7.3 - Matrices', category: 'Advanced Topics', order: 73 },
  { key: 'vectors', title: 'Topic 7.4 - Vectors', category: 'Advanced Topics', order: 74 },
  { key: 'word-problems', title: 'Topic 7.5 - Word Problems', category: 'Advanced Topics', order: 75 },
  { key: 'miscellaneous-topics', title: 'Topic 7.6 - Miscellaneous Topics', category: 'Advanced Topics', order: 76 }
];

async function updateLessons() {
  // Get current lessons
  const { data: currentLessons } = await supabase
    .from('lesson_metadata')
    .select('id, lesson_key, title, category, order_index')
    .eq('subject', 'math');

  console.log(`Current math lessons: ${currentLessons.length}\n`);

  let updated = 0;
  let ok = 0;
  let missing = 0;

  // Update each lesson to match desired structure
  for (const desired of desiredLessons) {
    const existing = currentLessons.find(l => l.lesson_key === desired.key);

    if (existing) {
      // Check if update needed
      const needsUpdate = existing.title !== desired.title ||
                          existing.category !== desired.category ||
                          existing.order_index !== desired.order;

      if (needsUpdate) {
        const { error } = await supabase
          .from('lesson_metadata')
          .update({
            title: desired.title,
            category: desired.category,
            order_index: desired.order
          })
          .eq('id', existing.id);

        if (error) {
          console.log(`❌ Error updating ${desired.key}: ${error.message}`);
        } else {
          console.log(`✅ Updated: ${desired.key}`);
          updated++;
        }
      } else {
        console.log(`✓ OK: ${desired.key}`);
        ok++;
      }
    } else {
      console.log(`⚠️  Missing: ${desired.key} - needs to be created`);
      missing++;
    }
  }

  // Final count
  const { data: final } = await supabase
    .from('lesson_metadata')
    .select('id')
    .eq('subject', 'math');

  console.log(`\n📊 Summary:`);
  console.log(`✅ Updated: ${updated}`);
  console.log(`✓ Already correct: ${ok}`);
  console.log(`⚠️  Missing: ${missing}`);
  console.log(`\nFinal count: ${final.length} math lessons (should be 35)`);
}

updateLessons();
