import { createClient } from '@supabase/supabase-js';
import * as dotenv from 'dotenv';
import { fileURLToPath } from 'url';
import { dirname, resolve } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
dotenv.config({ path: resolve(__dirname, '../.env') });

const supabase = createClient(process.env.REACT_APP_SUPABASE_URL, process.env.SUPABASE_SERVICE_ROLE_KEY);

// Definitions for missing terms
const missingDefinitions = [
  { term: '3-4-5', definition: 'A Pythagorean triple: a² + b² = c² where (3, 4, 5) satisfies 3² + 4² = 5² (9 + 16 = 25). Commonly scaled to 6-8-10, 9-12-15, etc.', lesson_key: '2.2' },
  { term: '5-12-13', definition: 'A Pythagorean triple: 5² + 12² = 13² (25 + 144 = 169). Useful for quickly finding hypotenuse without calculation.', lesson_key: '2.2' },
  { term: '7-24-25', definition: 'A Pythagorean triple: 7² + 24² = 25² (49 + 576 = 625). Less common but appears on ACT.', lesson_key: '2.2' },
  { term: '8-15-17', definition: 'A Pythagorean triple: 8² + 15² = 17² (64 + 225 = 289). Another right triangle shortcut.', lesson_key: '2.2' },
  { term: 'Arc length', definition: 'The distance along a curved arc. Formula: arc length = (θ/360) × 2πr, where θ is the central angle in degrees.', lesson_key: '2.4' },
  { term: 'Area', definition: 'The amount of space inside a 2D shape, measured in square units (in², ft², cm²).', lesson_key: '2.2' },
  { term: 'Fractional exponents', definition: 'Exponents written as fractions. x^(m/n) = ⁿ√(x^m). For example, 8^(2/3) = ∛(8²) = ∛64 = 4.', lesson_key: '3.3' },
  { term: 'Parallel lines', definition: 'Lines that never intersect and have the same slope. If line 1 has slope m, line 2 parallel to it also has slope m.', lesson_key: '2.3' },
  { term: 'Perpendicular lines', definition: 'Lines that intersect at 90°. Their slopes are negative reciprocals: if line 1 has slope m, line 2 perpendicular to it has slope -1/m.', lesson_key: '2.3' },
  { term: 'Pythagorean theorem', definition: 'For right triangles: a² + b² = c², where a and b are legs and c is the hypotenuse. Used to find missing side lengths.', lesson_key: '2.2' },
  { term: 'Slope', definition: 'The steepness and direction of a line. Formula: m = (y₂ - y₁)/(x₂ - x₁) = rise/run.', lesson_key: '2.3' },
  { term: 'Volume', definition: 'The amount of 3D space inside a solid object, measured in cubic units (in³, ft³, cm³).', lesson_key: '2.2' },
  { term: 'arcs', definition: 'Portions of a circle\'s circumference. Measured by their central angle or by arc length.', lesson_key: '2.4' },
  { term: 'common denominator', definition: 'A shared denominator when adding/subtracting fractions. Find by listing multiples or using LCM.', lesson_key: '3.2' },
  { term: 'complete the square', definition: 'A technique to rewrite x² + bx as a perfect square: add (b/2)² to both sides to get (x + b/2)².', lesson_key: '2.5' },
  { term: 'cross-canceling', definition: 'Simplifying fractions before multiplying by canceling common factors in numerators and denominators.', lesson_key: '3.2' },
  { term: 'ellipses', definition: 'Oval-shaped curves with equation x²/a² + y²/b² = 1. Both terms are positive with different denominators.', lesson_key: '2.5' },
  { term: 'general form', definition: 'Circle equation: x² + y² + Dx + Ey + F = 0. Requires completing the square to find center and radius.', lesson_key: '2.5' },
  { term: 'hyperbolas', definition: 'Two-branched curves with equation x²/a² - y²/b² = 1 or y²/a² - x²/b² = 1. Opposite signs distinguish from ellipses.', lesson_key: '2.5' },
  { term: 'isolate it on one side of the equation', definition: 'Move all terms with the variable to one side and all constants to the other, using inverse operations.', lesson_key: '3.1' },
  { term: 'isosceles right triangle', definition: 'A 45-45-90 triangle. If each leg = a, then hypotenuse = a√2. Ratio is 1 : 1 : √2.', lesson_key: '2.2' },
  { term: 'least common denominator (LCD)', definition: 'The smallest common denominator for adding/subtracting fractions. Equals the LCM of the denominators.', lesson_key: '3.2' },
  { term: 'linear equations', definition: 'Equations that graph as straight lines. Standard form: Ax + By = C. Slope-intercept form: y = mx + b.', lesson_key: '2.3' },
  { term: 'lines', definition: 'Straight paths extending infinitely in both directions. Defined by slope and y-intercept.', lesson_key: '2.3' },
  { term: 'multiply by the reciprocal', definition: 'To divide fractions, flip the second fraction and multiply. a/b ÷ c/d = a/b × d/c.', lesson_key: '3.2' },
  { term: 'negative numbers', definition: 'Numbers less than zero. Rules: negative × negative = positive, negative × positive = negative.', lesson_key: '3.1' },
  { term: 'order of operations', definition: 'PEMDAS: Parentheses, Exponents, Multiplication/Division (left to right), Addition/Subtraction (left to right).', lesson_key: '3.1' },
  { term: 'sectors', definition: 'Pizza-slice regions of circles bounded by two radii and an arc. Area = (θ/360) × πr².', lesson_key: '2.4' },
  { term: 'triangles', definition: '3-sided polygons. Sum of angles = 180°. Area = ½ × base × height. Types: right, isosceles, equilateral.', lesson_key: '2.2' },
  { term: 'volume', definition: 'The amount of 3D space inside an object, measured in cubic units (in³, ft³, m³).', lesson_key: '2.2' }
];

async function addDefinitions() {
  console.log('\n📚 ADDING MISSING TERM DEFINITIONS');
  console.log('='.repeat(80));
  console.log(`Adding ${missingDefinitions.length} definitions\n`);

  let successCount = 0;
  let errorCount = 0;

  for (const def of missingDefinitions) {
    try {
      const { error } = await supabase
        .from('term_definitions')
        .insert({
          term: def.term,
          definition: def.definition,
          lesson_key: def.lesson_key
        });

      if (error) {
        console.error(`✗ ${def.term}: ${error.message}`);
        errorCount++;
      } else {
        console.log(`✓ ${def.term}`);
        successCount++;
      }
    } catch (error) {
      console.error(`✗ ${def.term}: ${error.message}`);
      errorCount++;
    }
  }

  console.log('\n' + '='.repeat(80));
  console.log('📊 SUMMARY');
  console.log('='.repeat(80));
  console.log(`✅ Successfully added: ${successCount}`);
  console.log(`❌ Errors: ${errorCount}`);
  console.log('='.repeat(80) + '\n');
}

addDefinitions();
