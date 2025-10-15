/**
 * Add multiple-choice answer options to all examples
 */

import { createClient } from '@supabase/supabase-js';
import dotenv from 'dotenv';

dotenv.config();

const supabase = createClient(
  process.env.REACT_APP_SUPABASE_URL,
  process.env.SUPABASE_SERVICE_ROLE_KEY
);

console.log('╔══════════════════════════════════════════════════════════╗');
console.log('║     ADDING ANSWER CHOICES TO EXAMPLES                   ║');
console.log('╚══════════════════════════════════════════════════════════╝\n');

const { data } = await supabase
  .from('lessons')
  .select('lesson_key, content')
  .in('lesson_key', ['geometry-angles', 'geometry-shapes']);

// GEOMETRY-ANGLES - Add answer choices to examples
const anglesLesson = data.find(l => l.lesson_key === 'geometry-angles');
let anglesContent = anglesLesson.content;

console.log('geometry-angles:');

// Example 1: Complement and Supplement
anglesContent = anglesContent.replace(
  /<h4[^>]*>Example 1<\/h4>\s*<p[^>]*>\s*<strong>Problem:<\/strong>\s*An angle measures 35°\. What is its complement\? What is its supplement\?<\/p>\s*<p[^>]*>\s*<strong>Solution:<\/strong>\s*<\/p>\s*<ul[^>]*>[\s\S]*?<\/ul>/,
  `<h4 style="margin-top: 3rem; padding-top: 2rem; margin-bottom: 0.5rem; font-weight: 600; border-top: 2px solid #e5e7eb; color: #2563eb;">Example 1</h4>

<p style="font-size: 0.9rem; line-height: 1.6; margin: 0.5rem 0 1rem 0;">
<strong>Problem:</strong> An angle measures 35°. What is its complement? What is its supplement?
</p>

<p style="font-size: 0.9rem; line-height: 1.6; margin: 0.5rem 0 0.5rem 0;">
<span style="display: inline-block; margin: 0.3rem 0;">A. Complement: 55°, Supplement: 145°</span><br>
<span style="display: inline-block; margin: 0.3rem 0;">B. Complement: 145°, Supplement: 55°</span><br>
<span style="display: inline-block; margin: 0.3rem 0;">C. Complement: 45°, Supplement: 155°</span><br>
<span style="display: inline-block; margin: 0.3rem 0;">D. Complement: 65°, Supplement: 125°</span><br>
<span style="display: inline-block; margin: 0.3rem 0;">E. Complement: 35°, Supplement: 180°</span>
</p>

<p style="font-size: 0.9rem; line-height: 1.6; margin: 0.5rem 0 1rem 0;">
<strong>Solution:</strong>
</p>

<ul style="margin: 1rem 0; padding-left: 1.5rem; line-height: 2;">
  <li style="margin: 0.4rem 0;"><strong>Complement:</strong> 90° - 35° = <strong>55°</strong></li>
  <li style="margin: 0.4rem 0;"><strong>Supplement:</strong> 180° - 35° = <strong>145°</strong></li>
</ul>

<p style="font-size: 0.9rem; line-height: 1.6; margin: 0.5rem 0 1rem 0;">
<strong>Answer: A</strong>
</p>`
);

// Example 2: Vertical angles
anglesContent = anglesContent.replace(
  /<h4[^>]*>Example 2<\/h4>\s*<p[^>]*>\s*<strong>Problem:<\/strong>\s*Two lines intersect, creating four angles\. One of the angles measures 125°\. What are the measures of the other three angles\?<\/p>\s*<p[^>]*>\s*<strong>Solution:<\/strong>\s*<\/p>\s*<ul[^>]*>[\s\S]*?<\/ul>/,
  `<h4 style="margin-top: 3rem; padding-top: 2rem; margin-bottom: 0.5rem; font-weight: 600; border-top: 2px solid #e5e7eb; color: #2563eb;">Example 2</h4>

<p style="font-size: 0.9rem; line-height: 1.6; margin: 0.5rem 0 1rem 0;">
<strong>Problem:</strong> Two lines intersect, creating four angles. One of the angles measures 125°. What are the measures of the other three angles?
</p>

<p style="font-size: 0.9rem; line-height: 1.6; margin: 0.5rem 0 0.5rem 0;">
<span style="display: inline-block; margin: 0.3rem 0;">A. 55°, 55°, 125°</span><br>
<span style="display: inline-block; margin: 0.3rem 0;">B. 125°, 125°, 55°</span><br>
<span style="display: inline-block; margin: 0.3rem 0;">C. 55°, 125°, 125°</span><br>
<span style="display: inline-block; margin: 0.3rem 0;">D. 125°, 55°, 55°</span><br>
<span style="display: inline-block; margin: 0.3rem 0;">E. 62.5°, 62.5°, 62.5°</span>
</p>

<p style="font-size: 0.9rem; line-height: 1.6; margin: 0.5rem 0 1rem 0;">
<strong>Solution:</strong>
</p>

<ul style="margin: 1rem 0; padding-left: 1.5rem; line-height: 2;">
  <li style="margin: 0.4rem 0;">The angle <strong>opposite</strong> to 125° is also 125° (vertical angles are equal)</li>
  <li style="margin: 0.4rem 0;">The two <strong>adjacent</strong> angles are supplements to 125°: 180° - 125° = <strong>55°</strong></li>
  <li style="margin: 0.4rem 0;">So the angles are: <strong>125°, 55°, 125°, 55°</strong></li>
</ul>

<p style="font-size: 0.9rem; line-height: 1.6; margin: 0.5rem 0 1rem 0;">
<strong>Answer: C</strong> (55°, 125°, 125°)
</p>`
);

// Example 3: Parallel lines and transversals
anglesContent = anglesContent.replace(
  /<h4[^>]*>Example 3<\/h4>\s*<p[^>]*>\s*<strong>Problem:<\/strong>\s*Two parallel lines are cut by a transversal\. One of the angles formed measures 65°\. What are the possible measures of the other seven angles\?<\/p>\s*<p[^>]*>\s*<strong>Solution:<\/strong>[\s\S]*?(?=<h[34]|$)/,
  `<h4 style="margin-top: 3rem; padding-top: 2rem; margin-bottom: 0.5rem; font-weight: 600; border-top: 2px solid #e5e7eb; color: #2563eb;">Example 3</h4>

<p style="font-size: 0.9rem; line-height: 1.6; margin: 0.5rem 0 1rem 0;">
<strong>Problem:</strong> Two parallel lines are cut by a transversal. One of the angles formed measures 65°. What are the possible measures of the other seven angles?
</p>

<p style="font-size: 0.9rem; line-height: 1.6; margin: 0.5rem 0 0.5rem 0;">
<span style="display: inline-block; margin: 0.3rem 0;">A. All seven angles are 65°</span><br>
<span style="display: inline-block; margin: 0.3rem 0;">B. Three angles are 65° and four are 115°</span><br>
<span style="display: inline-block; margin: 0.3rem 0;">C. Four angles are 65° and three are 115°</span><br>
<span style="display: inline-block; margin: 0.3rem 0;">D. Six angles are 65° and one is 115°</span><br>
<span style="display: inline-block; margin: 0.3rem 0;">E. All eight angles are different</span>
</p>

<p style="font-size: 0.9rem; line-height: 1.6; margin: 0.5rem 0 1rem 0;">
<strong>Solution:</strong>
</p>

<ul style="margin: 1rem 0; padding-left: 1.5rem; line-height: 2;">
  <li style="margin: 0.4rem 0;">With parallel lines and a transversal, we get <strong>two</strong> sets of angles</li>
  <li style="margin: 0.4rem 0;">One set: <strong>4 angles that measure 65°</strong> (corresponding, alternate interior, alternate exterior, vertical)</li>
  <li style="margin: 0.4rem 0;">Other set: <strong>4 angles that are supplementary</strong> to 65° = 180° - 65° = <strong>115°</strong></li>
  <li style="margin: 0.4rem 0;">Total: <strong>Four 65° angles and four 115° angles</strong></li>
</ul>

<p style="font-size: 0.9rem; line-height: 1.6; margin: 0.5rem 0 1rem 0;">
<strong>Answer: B</strong> (Three other angles are 65° and four are 115°, for a total of four 65° and four 115°)
</p>

`
);

console.log('  ✅ Added answer choices to 3 examples');

await supabase
  .from('lessons')
  .update({
    content: anglesContent,
    updated_at: new Date().toISOString()
  })
  .eq('lesson_key', 'geometry-angles');

console.log('  ✅ Updated geometry-angles\n');

// GEOMETRY-SHAPES - Add answer choices to examples
const shapesLesson = data.find(l => l.lesson_key === 'geometry-shapes');
let shapesContent = shapesLesson.content;

console.log('geometry-shapes:');

// Example 1: Rectangle
shapesContent = shapesContent.replace(
  /<h4[^>]*>Example 1<\/h4>\s*<p[^>]*>\s*<strong>Problem:<\/strong>\s*A rectangle has a length of 12 inches and a width of 5 inches\. Find the perimeter and area\.<\/p>\s*<p[^>]*>\s*<strong>Solution:<\/strong>\s*<\/p>\s*<ul[^>]*>[\s\S]*?<\/ul>/,
  `<h4 style="margin-top: 3rem; padding-top: 2rem; margin-bottom: 0.5rem; font-weight: 600; border-top: 2px solid #e5e7eb; color: #2563eb;">Example 1</h4>

<p style="font-size: 0.9rem; line-height: 1.6; margin: 0.5rem 0 1rem 0;">
<strong>Problem:</strong> A rectangle has a length of 12 inches and a width of 5 inches. Find the perimeter and area.
</p>

<p style="font-size: 0.9rem; line-height: 1.6; margin: 0.5rem 0 0.5rem 0;">
<span style="display: inline-block; margin: 0.3rem 0;">A. Perimeter: 34 in, Area: 60 in²</span><br>
<span style="display: inline-block; margin: 0.3rem 0;">B. Perimeter: 17 in, Area: 60 in²</span><br>
<span style="display: inline-block; margin: 0.3rem 0;">C. Perimeter: 34 in, Area: 120 in²</span><br>
<span style="display: inline-block; margin: 0.3rem 0;">D. Perimeter: 24 in, Area: 48 in²</span><br>
<span style="display: inline-block; margin: 0.3rem 0;">E. Perimeter: 60 in, Area: 34 in²</span>
</p>

<p style="font-size: 0.9rem; line-height: 1.6; margin: 0.5rem 0 1rem 0;">
<strong>Solution:</strong>
</p>

<ul style="margin: 1rem 0; padding-left: 1.5rem; line-height: 2;">
  <li style="margin: 0.4rem 0;"><strong>Perimeter:</strong> P = 2(l + w) = 2(12 + 5) = 2(17) = <strong>34 inches</strong></li>
  <li style="margin: 0.4rem 0;"><strong>Area:</strong> A = l × w = 12 × 5 = <strong>60 square inches</strong></li>
</ul>

<p style="font-size: 0.9rem; line-height: 1.6; margin: 0.5rem 0 1rem 0;">
<strong>Answer: A</strong>
</p>`
);

// Example 2: Square
shapesContent = shapesContent.replace(
  /<h4[^>]*>Example 2<\/h4>\s*<p[^>]*>\s*<strong>Problem:<\/strong>\s*A square has a side length of 9 cm\. Find the perimeter and area\.<\/p>\s*<p[^>]*>\s*<strong>Solution:<\/strong>\s*<\/p>\s*<ul[^>]*>[\s\S]*?<\/ul>/,
  `<h4 style="margin-top: 3rem; padding-top: 2rem; margin-bottom: 0.5rem; font-weight: 600; border-top: 2px solid #e5e7eb; color: #2563eb;">Example 2</h4>

<p style="font-size: 0.9rem; line-height: 1.6; margin: 0.5rem 0 1rem 0;">
<strong>Problem:</strong> A square has a side length of 9 cm. Find the perimeter and area.
</p>

<p style="font-size: 0.9rem; line-height: 1.6; margin: 0.5rem 0 0.5rem 0;">
<span style="display: inline-block; margin: 0.3rem 0;">A. Perimeter: 36 cm, Area: 81 cm²</span><br>
<span style="display: inline-block; margin: 0.3rem 0;">B. Perimeter: 18 cm, Area: 81 cm²</span><br>
<span style="display: inline-block; margin: 0.3rem 0;">C. Perimeter: 36 cm, Area: 36 cm²</span><br>
<span style="display: inline-block; margin: 0.3rem 0;">D. Perimeter: 81 cm, Area: 36 cm²</span><br>
<span style="display: inline-block; margin: 0.3rem 0;">E. Perimeter: 27 cm, Area: 81 cm²</span>
</p>

<p style="font-size: 0.9rem; line-height: 1.6; margin: 0.5rem 0 1rem 0;">
<strong>Solution:</strong>
</p>

<ul style="margin: 1rem 0; padding-left: 1.5rem; line-height: 2;">
  <li style="margin: 0.4rem 0;"><strong>Perimeter:</strong> P = 4s = 4(9) = <strong>36 cm</strong></li>
  <li style="margin: 0.4rem 0;"><strong>Area:</strong> A = s² = 9² = <strong>81 cm²</strong></li>
</ul>

<p style="font-size: 0.9rem; line-height: 1.6; margin: 0.5rem 0 1rem 0;">
<strong>Answer: A</strong>
</p>`
);

// Example 3: Triangle
shapesContent = shapesContent.replace(
  /<h4[^>]*>Example 3<\/h4>\s*<p[^>]*>\s*<strong>Problem:<\/strong>\s*A triangle has a base of 10 feet and a height of 6 feet\. What is its area\?<\/p>\s*<p[^>]*>\s*<strong>Solution:<\/strong>\s*<\/p>\s*<ul[^>]*>[\s\S]*?<\/ul>/,
  `<h4 style="margin-top: 3rem; padding-top: 2rem; margin-bottom: 0.5rem; font-weight: 600; border-top: 2px solid #e5e7eb; color: #2563eb;">Example 3</h4>

<p style="font-size: 0.9rem; line-height: 1.6; margin: 0.5rem 0 1rem 0;">
<strong>Problem:</strong> A triangle has a base of 10 feet and a height of 6 feet. What is its area?
</p>

<p style="font-size: 0.9rem; line-height: 1.6; margin: 0.5rem 0 0.5rem 0;">
<span style="display: inline-block; margin: 0.3rem 0;">A. 30 ft²</span><br>
<span style="display: inline-block; margin: 0.3rem 0;">B. 60 ft²</span><br>
<span style="display: inline-block; margin: 0.3rem 0;">C. 16 ft²</span><br>
<span style="display: inline-block; margin: 0.3rem 0;">D. 32 ft²</span><br>
<span style="display: inline-block; margin: 0.3rem 0;">E. 15 ft²</span>
</p>

<p style="font-size: 0.9rem; line-height: 1.6; margin: 0.5rem 0 1rem 0;">
<strong>Solution:</strong>
</p>

<ul style="margin: 1rem 0; padding-left: 1.5rem; line-height: 2;">
  <li style="margin: 0.4rem 0;"><strong>Formula:</strong> A = ½bh</li>
  <li style="margin: 0.4rem 0;"><strong>Calculation:</strong> A = ½(10)(6) = ½(60) = <strong>30 ft²</strong></li>
</ul>

<p style="font-size: 0.9rem; line-height: 1.6; margin: 0.5rem 0 1rem 0;">
<strong>Answer: A</strong>
</p>`
);

// Example 4: Circle
shapesContent = shapesContent.replace(
  /<h4[^>]*>Example 4<\/h4>\s*<p[^>]*>\s*<strong>Problem:<\/strong>\s*A circle has a radius of 7 inches\. Find the circumference and area\.<\/p>\s*<p[^>]*>\s*<strong>Solution:<\/strong>\s*<\/p>\s*<ul[^>]*>[\s\S]*?<\/ul>/,
  `<h4 style="margin-top: 3rem; padding-top: 2rem; margin-bottom: 0.5rem; font-weight: 600; border-top: 2px solid #e5e7eb; color: #2563eb;">Example 4</h4>

<p style="font-size: 0.9rem; line-height: 1.6; margin: 0.5rem 0 1rem 0;">
<strong>Problem:</strong> A circle has a radius of 7 inches. Find the circumference and area.
</p>

<p style="font-size: 0.9rem; line-height: 1.6; margin: 0.5rem 0 0.5rem 0;">
<span style="display: inline-block; margin: 0.3rem 0;">A. Circumference: 44 in, Area: 154 in²</span><br>
<span style="display: inline-block; margin: 0.3rem 0;">B. Circumference: 22 in, Area: 154 in²</span><br>
<span style="display: inline-block; margin: 0.3rem 0;">C. Circumference: 44 in, Area: 49 in²</span><br>
<span style="display: inline-block; margin: 0.3rem 0;">D. Circumference: 14 in, Area: 49 in²</span><br>
<span style="display: inline-block; margin: 0.3rem 0;">E. Circumference: 154 in, Area: 44 in²</span>
</p>

<p style="font-size: 0.9rem; line-height: 1.6; margin: 0.5rem 0 1rem 0;">
<strong>Solution:</strong>
</p>

<ul style="margin: 1rem 0; padding-left: 1.5rem; line-height: 2;">
  <li style="margin: 0.4rem 0;"><strong>Circumference:</strong> C = 2πr = 2π(7) = 14π ≈ <strong>44 inches</strong></li>
  <li style="margin: 0.4rem 0;"><strong>Area:</strong> A = πr² = π(7²) = 49π ≈ <strong>154 in²</strong></li>
</ul>

<p style="font-size: 0.9rem; line-height: 1.6; margin: 0.5rem 0 1rem 0;">
<strong>Answer: A</strong>
</p>`
);

// Example 5: Trapezoid
shapesContent = shapesContent.replace(
  /<h4[^>]*>Example 5<\/h4>\s*<p[^>]*>\s*<strong>Problem:<\/strong>\s*A trapezoid has bases of length 8 cm and 12 cm, and a height of 5 cm\. What is its area\?<\/p>\s*<p[^>]*>\s*<strong>Solution:<\/strong>[\s\S]*?(?=<h[34]|$)/,
  `<h4 style="margin-top: 3rem; padding-top: 2rem; margin-bottom: 0.5rem; font-weight: 600; border-top: 2px solid #e5e7eb; color: #2563eb;">Example 5</h4>

<p style="font-size: 0.9rem; line-height: 1.6; margin: 0.5rem 0 1rem 0;">
<strong>Problem:</strong> A trapezoid has bases of length 8 cm and 12 cm, and a height of 5 cm. What is its area?
</p>

<p style="font-size: 0.9rem; line-height: 1.6; margin: 0.5rem 0 0.5rem 0;">
<span style="display: inline-block; margin: 0.3rem 0;">A. 50 cm²</span><br>
<span style="display: inline-block; margin: 0.3rem 0;">B. 100 cm²</span><br>
<span style="display: inline-block; margin: 0.3rem 0;">C. 60 cm²</span><br>
<span style="display: inline-block; margin: 0.3rem 0;">D. 40 cm²</span><br>
<span style="display: inline-block; margin: 0.3rem 0;">E. 25 cm²</span>
</p>

<p style="font-size: 0.9rem; line-height: 1.6; margin: 0.5rem 0 1rem 0;">
<strong>Solution:</strong>
</p>

<ul style="margin: 1rem 0; padding-left: 1.5rem; line-height: 2;">
  <li style="margin: 0.4rem 0;"><strong>Formula:</strong> A = ½h(b₁ + b₂)</li>
  <li style="margin: 0.4rem 0;"><strong>Calculation:</strong> A = ½(5)(8 + 12) = ½(5)(20) = ½(100) = <strong>50 cm²</strong></li>
</ul>

<p style="font-size: 0.9rem; line-height: 1.6; margin: 0.5rem 0 1rem 0;">
<strong>Answer: A</strong>
</p>

`
);

console.log('  ✅ Added answer choices to 5 examples');

await supabase
  .from('lessons')
  .update({
    content: shapesContent,
    updated_at: new Date().toISOString()
  })
  .eq('lesson_key', 'geometry-shapes');

console.log('  ✅ Updated geometry-shapes\n');

console.log('✅ All examples now have answer choices!');
console.log('\nFormat:');
console.log('  - Problem statement');
console.log('  - Multiple choice options A-E (using <span> and <br>)');
console.log('  - Solution with step-by-step explanation');
console.log('  - Correct answer (e.g., "Answer: A")');
