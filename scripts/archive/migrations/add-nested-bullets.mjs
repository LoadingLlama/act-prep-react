/**
 * Add nested bullet points to geometry lessons for better readability
 * Only add where it makes sense (grouping related sub-points)
 */

import { createClient } from '@supabase/supabase-js';
import dotenv from 'dotenv';
import fs from 'fs';

dotenv.config();

const supabase = createClient(
  process.env.REACT_APP_SUPABASE_URL,
  process.env.SUPABASE_SERVICE_ROLE_KEY
);

// Read current versions
const { data: lessons } = await supabase
  .from('lessons')
  .select('lesson_key, content')
  .in('lesson_key', ['geometry-angles', 'geometry-shapes']);

// GEOMETRY-ANGLES: Add nested bullets
const anglesContent = lessons.find(l => l.lesson_key === 'geometry-angles').content;

let updatedAngles = anglesContent;

// Update "What Is an Angle?" section - nest the facts
updatedAngles = updatedAngles.replace(
  /<ul style="margin: 1rem 0; padding-left: 1\.5rem; line-height: 2;">[\s\S]*?<\/ul>/,
  `<ul style="margin: 1rem 0; padding-left: 1.5rem; line-height: 2;">
  <li style="margin: 0.4rem 0;"><strong>Basic components:</strong>
    <ul style="margin: 0.5rem 0; padding-left: 1.5rem;">
      <li>The two rays are called the <strong>sides</strong> of the angle</li>
      <li>We measure angles in <strong>degrees (°)</strong></li>
      <li>A full rotation around a point is <strong>360°</strong></li>
    </ul>
  </li>
  <li style="margin: 0.4rem 0;"><strong>Notation:</strong> Angles are typically labeled with three letters (like ∠ABC) or a single letter/number</li>
</ul>`
);

// Update each angle type with nested structure
updatedAngles = updatedAngles.replace(
  /<h4 style="margin-top: 2rem; margin-bottom: 0\.5rem;">a\) Acute Angles<\/h4>[\s\S]*?<ul style="margin: 1rem 0; padding-left: 1\.5rem; line-height: 2;">[\s\S]*?<\/ul>/,
  `<h4 style="margin-top: 2rem; margin-bottom: 0.5rem;">a) Acute Angles</h4>

<ul style="margin: 1rem 0; padding-left: 1.5rem; line-height: 2;">
  <li style="margin: 0.4rem 0;"><strong>Definition:</strong> Any angle less than 90°
    <ul style="margin: 0.5rem 0; padding-left: 1.5rem;">
      <li><strong>Examples:</strong> 30°, 45°, 60°, 89°</li>
      <li><strong>Think of it as:</strong> A "small" or "sharp" angle</li>
    </ul>
  </li>
</ul>`
);

updatedAngles = updatedAngles.replace(
  /<h4 style="margin-top: 2rem; margin-bottom: 0\.5rem;">b\) Right Angles<\/h4>[\s\S]*?<ul style="margin: 1rem 0; padding-left: 1\.5rem; line-height: 2;">[\s\S]*?<\/ul>/,
  `<h4 style="margin-top: 2rem; margin-bottom: 0.5rem;">b) Right Angles</h4>

<ul style="margin: 1rem 0; padding-left: 1.5rem; line-height: 2;">
  <li style="margin: 0.4rem 0;"><strong>Definition:</strong> Exactly 90°
    <ul style="margin: 0.5rem 0; padding-left: 1.5rem;">
      <li><strong>Symbol:</strong> Usually marked with a small square in the corner</li>
      <li><strong>Common places:</strong> Corners of rectangles, squares, and perpendicular lines</li>
    </ul>
  </li>
</ul>`
);

updatedAngles = updatedAngles.replace(
  /<h4 style="margin-top: 2rem; margin-bottom: 0\.5rem;">c\) Obtuse Angles<\/h4>[\s\S]*?<ul style="margin: 1rem 0; padding-left: 1\.5rem; line-height: 2;">[\s\S]*?<\/ul>/,
  `<h4 style="margin-top: 2rem; margin-bottom: 0.5rem;">c) Obtuse Angles</h4>

<ul style="margin: 1rem 0; padding-left: 1.5rem; line-height: 2;">
  <li style="margin: 0.4rem 0;"><strong>Definition:</strong> Greater than 90° but less than 180°
    <ul style="margin: 0.5rem 0; padding-left: 1.5rem;">
      <li><strong>Examples:</strong> 100°, 120°, 135°, 179°</li>
      <li><strong>Think of it as:</strong> A "wide" angle that's opened beyond 90°</li>
    </ul>
  </li>
</ul>`
);

updatedAngles = updatedAngles.replace(
  /<h4 style="margin-top: 2rem; margin-bottom: 0\.5rem;">d\) Straight Angles<\/h4>[\s\S]*?<ul style="margin: 1rem 0; padding-left: 1\.5rem; line-height: 2;">[\s\S]*?<\/ul>/,
  `<h4 style="margin-top: 2rem; margin-bottom: 0.5rem;">d) Straight Angles</h4>

<ul style="margin: 1rem 0; padding-left: 1.5rem; line-height: 2;">
  <li style="margin: 0.4rem 0;"><strong>Definition:</strong> Exactly 180°
    <ul style="margin: 0.5rem 0; padding-left: 1.5rem;">
      <li><strong>Looks like:</strong> A straight line</li>
      <li><strong>Key fact:</strong> The two rays point in opposite directions</li>
    </ul>
  </li>
</ul>`
);

// Update complementary angles with nested examples
updatedAngles = updatedAngles.replace(
  /<h4 style="margin-top: 2rem; margin-bottom: 0\.5rem;">a\) Complementary Angles<\/h4>[\s\S]*?<ul style="margin: 1rem 0; padding-left: 1\.5rem; line-height: 2;">[\s\S]*?<\/ul>/,
  `<h4 style="margin-top: 2rem; margin-bottom: 0.5rem;">a) Complementary Angles</h4>

<ul style="margin: 1rem 0; padding-left: 1.5rem; line-height: 2;">
  <li style="margin: 0.4rem 0;"><strong>Definition:</strong> Two angles that <strong style="color: #2563eb; text-decoration: underline;">add up to 90°</strong>
    <ul style="margin: 0.5rem 0; padding-left: 1.5rem;">
      <li>30° and 60° are complementary (30 + 60 = 90)</li>
      <li>45° and 45° are complementary</li>
    </ul>
  </li>
  <li style="margin: 0.4rem 0;"><strong>Memory trick:</strong> "C" for Complementary, "C" for Corner (90° = right angle = corner)</li>
</ul>`
);

// Update supplementary angles with nested examples
updatedAngles = updatedAngles.replace(
  /<h4 style="margin-top: 2rem; margin-bottom: 0\.5rem;">b\) Supplementary Angles<\/h4>[\s\S]*?<ul style="margin: 1rem 0; padding-left: 1\.5rem; line-height: 2;">[\s\S]*?<\/ul>/,
  `<h4 style="margin-top: 2rem; margin-bottom: 0.5rem;">b) Supplementary Angles</h4>

<ul style="margin: 1rem 0; padding-left: 1.5rem; line-height: 2;">
  <li style="margin: 0.4rem 0;"><strong>Definition:</strong> Two angles that <strong style="color: #2563eb; text-decoration: underline;">add up to 180°</strong>
    <ul style="margin: 0.5rem 0; padding-left: 1.5rem;">
      <li>110° and 70° are supplementary (110 + 70 = 180)</li>
      <li>90° and 90° are supplementary</li>
    </ul>
  </li>
  <li style="margin: 0.4rem 0;"><strong>Memory trick:</strong> "S" for Supplementary, "S" for Straight line (180°)</li>
</ul>`
);

// Update key terminology section
updatedAngles = updatedAngles.replace(
  /<h4 style="margin-top: 2rem; margin-bottom: 0\.5rem;">a\) Key Terminology<\/h4>[\s\S]*?<ul style="margin: 1rem 0; padding-left: 1\.5rem; line-height: 2;">[\s\S]*?<\/ul>/,
  `<h4 style="margin-top: 2rem; margin-bottom: 0.5rem;">a) Key Terminology</h4>

<ul style="margin: 1rem 0; padding-left: 1.5rem; line-height: 2;">
  <li style="margin: 0.4rem 0;"><strong>Parallel lines:</strong> Lines that never intersect
    <ul style="margin: 0.5rem 0; padding-left: 1.5rem;">
      <li>Always the same distance apart</li>
      <li>Marked with matching arrow symbols (|| or arrows)</li>
    </ul>
  </li>
  <li style="margin: 0.4rem 0;"><strong>Transversal:</strong> A line that crosses two or more other lines</li>
</ul>`
);

console.log('✅ Updated geometry-angles with nested bullets');

// GEOMETRY-SHAPES: Add nested bullets
const shapesContent = lessons.find(l => l.lesson_key === 'geometry-shapes').content;
let updatedShapes = shapesContent;

// Add nested structure to "Common Mistakes" section
updatedShapes = updatedShapes.replace(
  /<h3 style="margin-top: 5rem; margin-bottom: 0\.75rem; font-weight: 500;">Common Mistakes to Avoid<\/h3>[\s\S]*?<ul style="margin: 1rem 0; padding-left: 1\.5rem; line-height: 2;">[\s\S]*?<\/ul>/,
  `<h3 style="margin-top: 5rem; margin-bottom: 0.75rem; font-weight: 500;">Common Mistakes to Avoid</h3>

<ul style="margin: 1rem 0; padding-left: 1.5rem; line-height: 2;">
  <li style="margin: 0.4rem 0;"><strong>Confusing area and perimeter</strong>
    <ul style="margin: 0.5rem 0; padding-left: 1.5rem;">
      <li>Read the question carefully!</li>
      <li>Perimeter = distance around, Area = space inside</li>
    </ul>
  </li>
  <li style="margin: 0.4rem 0;"><strong>Circle formula errors:</strong>
    <ul style="margin: 0.5rem 0; padding-left: 1.5rem;">
      <li>Using diameter instead of radius — Divide diameter by 2 first</li>
      <li>Forgetting to square the radius (A = πr², not πr)</li>
    </ul>
  </li>
  <li style="margin: 0.4rem 0;"><strong>Triangle and trapezoid errors:</strong>
    <ul style="margin: 0.5rem 0; padding-left: 1.5rem;">
      <li>Using a slanted side as height — Height must be perpendicular!</li>
      <li>Forgetting the ½ in formulas</li>
    </ul>
  </li>
  <li style="margin: 0.4rem 0;"><strong>Wrong units</strong>
    <ul style="margin: 0.5rem 0; padding-left: 1.5rem;">
      <li>Perimeter is linear (cm)</li>
      <li>Area is square (cm²)</li>
    </ul>
  </li>
</ul>`
);

console.log('✅ Updated geometry-shapes with nested bullets');

// Update both lessons
await supabase
  .from('lessons')
  .update({
    content: updatedAngles,
    updated_at: new Date().toISOString()
  })
  .eq('lesson_key', 'geometry-angles');

await supabase
  .from('lessons')
  .update({
    content: updatedShapes,
    updated_at: new Date().toISOString()
  })
  .eq('lesson_key', 'geometry-shapes');

console.log('\n✅ All nested bullets added!');
console.log('\nNested bullet improvements:');
console.log('  geometry-angles:');
console.log('    - What Is an Angle? (basic components)');
console.log('    - All 4 angle types (definition → examples → think of it as)');
console.log('    - Complementary angles (definition → examples)');
console.log('    - Supplementary angles (definition → examples)');
console.log('    - Key terminology (parallel lines details)');
console.log('  geometry-shapes:');
console.log('    - Common Mistakes (grouped by category with details)');
