import { createClient } from '@supabase/supabase-js';
import * as dotenv from 'dotenv';
import { fileURLToPath } from 'url';
import { dirname, resolve } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
dotenv.config({ path: resolve(__dirname, '../.env') });

const supabase = createClient(process.env.REACT_APP_SUPABASE_URL, process.env.SUPABASE_SERVICE_ROLE_KEY);

// Definitions for shapes and slopes (terms that had colons removed)
const newDefinitions = [
  // Shapes from lesson 2.2
  { term: 'Circle', definition: 'A perfectly round 2D shape where every point on the edge is the same distance from the center. Area = πr², Circumference = 2πr.', lesson_key: '2.2' },
  { term: 'Triangle', definition: 'A 3-sided polygon. Sum of angles = 180°. Area = ½ × base × height. Types include right, isosceles, and equilateral.', lesson_key: '2.2' },
  { term: 'Rectangle', definition: 'A 4-sided shape with 4 right angles. Opposite sides are equal. Area = length × width, Perimeter = 2(length + width).', lesson_key: '2.2' },
  { term: 'Trapezoid', definition: 'A 4-sided shape with exactly one pair of parallel sides. Area = ½(base₁ + base₂) × height.', lesson_key: '2.2' },
  { term: 'Rectangular Prism (Box)', definition: 'A 3D box shape with 6 rectangular faces. Volume = length × width × height, Surface Area = 2(lw + lh + wh).', lesson_key: '2.2' },
  { term: 'Cylinder', definition: 'A 3D shape with circular ends and straight sides. Volume = πr²h, Surface Area = 2πr² + 2πrh.', lesson_key: '2.2' },
  { term: 'Sphere', definition: 'A perfectly round 3D object. Volume = (4/3)πr³, Surface Area = 4πr².', lesson_key: '2.2' },
  { term: 'Cone', definition: 'A 3D shape with a circular base tapering to a point. Volume = (1/3)πr²h, Surface Area = πr² + πrl (l = slant height).', lesson_key: '2.2' },

  // Slope types from lesson 2.3
  { term: 'Positive slope', definition: 'A line that rises from left to right (m > 0). As x increases, y increases.', lesson_key: '2.3' },
  { term: 'Negative slope', definition: 'A line that falls from left to right (m < 0). As x increases, y decreases.', lesson_key: '2.3' },
  { term: 'Zero slope', definition: 'A horizontal line (m = 0). No change in y as x changes. Equation: y = constant.', lesson_key: '2.3' },
  { term: 'Undefined slope', definition: 'A vertical line. No change in x as y changes. Division by zero in slope formula. Equation: x = constant.', lesson_key: '2.3' }
];

async function addShapeAndSlopeDefinitions() {
  console.log('\n📐 ADDING SHAPE AND SLOPE DEFINITIONS');
  console.log('='.repeat(80));
  console.log(`Adding ${newDefinitions.length} definitions\n`);

  let successCount = 0;
  let errorCount = 0;

  for (const def of newDefinitions) {
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

addShapeAndSlopeDefinitions();
