/**
 * Add Term Definitions for Shapes & Triangles Lesson
 */

import { createClient } from '@supabase/supabase-js';
import * as dotenv from 'dotenv';
import { fileURLToPath } from 'url';
import { dirname, resolve } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

dotenv.config({ path: resolve(__dirname, '../.env') });

const supabaseUrl = process.env.REACT_APP_SUPABASE_URL;
const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

if (!supabaseUrl || !supabaseKey) {
  console.error('❌ Missing Supabase credentials');
  process.exit(1);
}

const supabase = createClient(supabaseUrl, supabaseKey);

const termDefinitions = [
  {
    term: 'perimeter',
    definition: 'The distance around the outside of a shape. Measured in linear units (inches, feet, meters).',
    lesson_key: 'geometry-shapes'
  },
  {
    term: 'area',
    definition: 'The amount of space inside a shape. Measured in square units (square inches, square feet, m²).',
    lesson_key: 'geometry-shapes'
  },
  {
    term: 'rectangle',
    definition: 'A four-sided shape with opposite sides equal and all angles 90°. Perimeter: P = 2l + 2w, Area: A = l × w',
    lesson_key: 'geometry-shapes'
  },
  {
    term: 'square',
    definition: 'A special rectangle where all four sides are equal. Perimeter: P = 4s, Area: A = s²',
    lesson_key: 'geometry-shapes'
  },
  {
    term: 'triangle',
    definition: 'A three-sided polygon. Area: A = ½bh, where b is base and h is the perpendicular height.',
    lesson_key: 'geometry-shapes'
  },
  {
    term: 'circle',
    definition: 'A round shape where all points are equidistant from the center. Circumference: C = 2πr, Area: A = πr²',
    lesson_key: 'geometry-shapes'
  },
  {
    term: 'radius',
    definition: 'The distance from the center of a circle to any point on its edge. Half of the diameter.',
    lesson_key: 'geometry-shapes'
  },
  {
    term: 'diameter',
    definition: 'The distance across a circle through its center. Equal to 2 × radius.',
    lesson_key: 'geometry-shapes'
  },
  {
    term: 'circumference',
    definition: 'The distance around a circle (the circle\'s perimeter). Formula: C = 2πr or C = πd',
    lesson_key: 'geometry-shapes'
  },
  {
    term: 'trapezoid',
    definition: 'A four-sided shape with exactly two parallel sides called bases. Area: A = ½h(b₁ + b₂)',
    lesson_key: 'geometry-shapes'
  },
  {
    term: 'base',
    definition: 'The bottom side of a shape, used as reference in area calculations. In triangles and trapezoids, height is measured perpendicular to the base.',
    lesson_key: 'geometry-shapes'
  },
  {
    term: 'height',
    definition: 'The perpendicular distance from the base to the opposite vertex or side. Must form a 90° angle with the base.',
    lesson_key: 'geometry-shapes'
  },
  {
    term: 'perpendicular',
    definition: 'At a 90-degree angle. Height must be perpendicular to the base for triangle and trapezoid area formulas.',
    lesson_key: 'geometry-shapes'
  }
];

async function addDefinitions() {
  console.log('📚 Adding term definitions for Shapes & Triangles...\\n');

  // Delete existing definitions
  const { data: existing } = await supabase
    .from('term_definitions')
    .select('term')
    .eq('lesson_key', 'geometry-shapes');

  if (existing && existing.length > 0) {
    console.log(`🗑️  Deleting ${existing.length} existing definitions...`);
    await supabase
      .from('term_definitions')
      .delete()
      .eq('lesson_key', 'geometry-shapes');
    console.log('✅ Deleted\\n');
  }

  // Insert new definitions
  const { data, error } = await supabase
    .from('term_definitions')
    .insert(termDefinitions)
    .select();

  if (error) {
    console.error('❌ Error:', error);
    process.exit(1);
  }

  console.log(`✅ Successfully added ${data.length} term definitions\\n`);

  console.log('TERMS ADDED:');
  console.log('─'.repeat(80));
  data.forEach(def => {
    console.log(`  ${def.term}`);
  });
  console.log();
}

addDefinitions();
