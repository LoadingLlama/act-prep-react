/**
 * Restore the original lesson content with proper formatting
 */

import { createClient } from '@supabase/supabase-js';
import dotenv from 'dotenv';

dotenv.config();

const supabase = createClient(
  process.env.REACT_APP_SUPABASE_URL,
  process.env.SUPABASE_SERVICE_ROLE_KEY
);

// This is the full original content with all 3 examples
const fullContent = `<p style="font-size: 16px; line-height: 1.7; margin: 0.5rem 0 1rem 0;">Angles are one of the most fundamental concepts in geometry. They appear in almost every ACT geometry question, so mastering them is essential. This lesson will teach you everything you need to know about angles—from basic definitions to the key relationships that show up on the test.</p>

<h3 style="margin-top: 5rem; margin-bottom: 0.75rem; font-weight: 700;">1. What Is an Angle?</h3>

<p style="font-size: 16px; line-height: 1.7; margin: 0.5rem 0 1rem 0;">An angle is formed when two rays (or line segments) share a common endpoint called the vertex.</p>

<ul style="margin: 0.3rem 0 0.5rem 0; padding-left: 1.5rem; line-height: 1.5;">
  <li style="margin: 0.15rem 0;">Basic components:
    <ul style="margin: 0.15rem 0 0.15rem 0; padding-left: 1.5rem;">
      <li>The two rays are called the sides of the angle</li>
      <li>We measure angles in degrees °</li>
      <li>A full rotation around a point is 360°</li>
    </ul>
  </li>
  <li style="margin: 0.15rem 0;">Notation: Angles are typically labeled with three letters (like ∠ABC) or a single letter/number</li>
</ul>

<h3 style="margin-top: 5rem; margin-bottom: 0.75rem; font-weight: 700;">2. Types of Angles</h3>

<p style="font-size: 16px; line-height: 1.7; margin: 0.5rem 0 1rem 0;">Angles are classified by their measure. Here are the four main types you need to know:</p>

<h4 style="margin-top: 2rem; margin-bottom: 0.3rem; font-weight: 400;"><strong style="color: #2563eb; font-weight: 600; text-decoration: underline;">Acute Angles</strong></h4>

<ul style="margin: 0.3rem 0 0.5rem 0; padding-left: 1.5rem; line-height: 1.5;">
  <li style="margin: 0.15rem 0;">Definition: Any angle less than 90°
    <ul style="margin: 0.15rem 0 0.15rem 0; padding-left: 1.5rem;">
      <li>Examples: 30°, 45°, 60°, 89°</li>
      <li>Think of it as: A "small" or "sharp" angle</li>
    </ul>
  </li>
</ul>

<h4 style="margin-top: 2rem; margin-bottom: 0.3rem; font-weight: 400;"><strong style="color: #2563eb; font-weight: 600; text-decoration: underline;">Right Angles</strong></h4>

<ul style="margin: 0.3rem 0 0.5rem 0; padding-left: 1.5rem; line-height: 1.5;">
  <li style="margin: 0.15rem 0;">Definition: Exactly 90°
    <ul style="margin: 0.15rem 0 0.15rem 0; padding-left: 1.5rem;">
      <li>Shown with a small square symbol at the vertex</li>
      <li>Represents perpendicular lines</li>
    </ul>
  </li>
</ul>

<h4 style="margin-top: 2rem; margin-bottom: 0.3rem; font-weight: 400;"><strong style="color: #2563eb; font-weight: 600; text-decoration: underline;">Obtuse Angles</strong></h4>

<ul style="margin: 0.3rem 0 0.5rem 0; padding-left: 1.5rem; line-height: 1.5;">
  <li style="margin: 0.15rem 0;">Definition: Between 90° and 180°
    <ul style="margin: 0.15rem 0 0.15rem 0; padding-left: 1.5rem;">
      <li>Examples: 100°, 120°, 150°, 179°</li>
      <li>Think of it as: A "wide" angle</li>
    </ul>
  </li>
</ul>

<h4 style="margin-top: 2rem; margin-bottom: 0.3rem; font-weight: 400;"><strong style="color: #2563eb; font-weight: 600; text-decoration: underline;">Straight Angles</strong></h4>

<ul style="margin: 0.3rem 0 0.5rem 0; padding-left: 1.5rem; line-height: 1.5;">
  <li style="margin: 0.15rem 0;">Definition: Exactly 180°
    <ul style="margin: 0.15rem 0 0.15rem 0; padding-left: 1.5rem;">
      <li>Forms a straight line</li>
      <li>Important for <strong style="color: #2563eb; font-weight: 600; text-decoration: underline;">Supplementary Angles</strong> (discussed below)</li>
    </ul>
  </li>
</ul>

<h3 style="margin-top: 5rem; margin-bottom: 0.75rem; font-weight: 700;">3. Angle Relationships</h3>

<p style="font-size: 16px; line-height: 1.7; margin: 0.5rem 0 1rem 0;">Now we get to the key relationships. These are tested constantly on the ACT.</p>

<h4 style="margin-top: 2rem; margin-bottom: 0.3rem; font-weight: 400;"><strong style="color: #2563eb; font-weight: 600; text-decoration: underline;">Complementary Angles</strong></h4>

<ul style="margin: 0.3rem 0 0.5rem 0; padding-left: 1.5rem; line-height: 1.5;">
  <li style="margin: 0.15rem 0;">Definition: Two angles that add up to 90°
    <ul style="margin: 0.15rem 0 0.15rem 0; padding-left: 1.5rem;">
      <li>Example: If one angle is 30°, its complement is 60° (because 30° + 60° = 90°)</li>
      <li>Formula: If angle A is x°, its complement is (90° - x)</li>
    </ul>
  </li>
</ul>

<h4 style="margin-top: 2rem; margin-bottom: 0.3rem; font-weight: 400;"><strong style="color: #2563eb; font-weight: 600; text-decoration: underline;">Supplementary Angles</strong></h4>

<ul style="margin: 0.3rem 0 0.5rem 0; padding-left: 1.5rem; line-height: 1.5;">
  <li style="margin: 0.15rem 0;">Definition: Two angles that add up to 180°
    <ul style="margin: 0.15rem 0 0.15rem 0; padding-left: 1.5rem;">
      <li>Example: If one angle is 110°, its supplement is 70° (because 110° + 70° = 180°)</li>
      <li>Formula: If angle A is x°, its supplement is (180° - x)</li>
    </ul>
  </li>
</ul>

<h4 style="margin-top: 2rem; margin-bottom: 0.3rem; font-weight: 400;"><strong style="color: #2563eb; font-weight: 600; text-decoration: underline;">Vertical Angles</strong></h4>

<ul style="margin: 0.3rem 0 0.5rem 0; padding-left: 1.5rem; line-height: 1.5;">
  <li style="margin: 0.15rem 0;">Definition: When two lines intersect, they create two pairs of opposite angles called vertical angles
    <ul style="margin: 0.15rem 0 0.15rem 0; padding-left: 1.5rem;">
      <li>Key fact: <strong>Vertical angles are always equal</strong></li>
      <li>This is one of the most tested relationships on the ACT</li>
    </ul>
  </li>
</ul>

<h4 style="margin-top: 2rem; margin-bottom: 0.3rem; font-weight: 400;"><strong style="color: #2563eb; font-weight: 600; text-decoration: underline;">Adjacent Angles</strong></h4>

<ul style="margin: 0.3rem 0 0.5rem 0; padding-left: 1.5rem; line-height: 1.5;">
  <li style="margin: 0.15rem 0;">Definition: Two angles that share a common side and vertex
    <ul style="margin: 0.15rem 0 0.15rem 0; padding-left: 1.5rem;">
      <li>On a straight line: Adjacent angles are supplementary (add to 180°)</li>
      <li>This is how we solve for unknown angles</li>
    </ul>
  </li>
</ul>

<h3 style="margin-top: 5rem; margin-bottom: 0.75rem; font-weight: 700;">4. Parallel Lines and Transversals</h3>

<p style="font-size: 16px; line-height: 1.7; margin: 0.5rem 0 1rem 0;">When a line (called a transversal) crosses two parallel lines, it creates eight angles. Understanding this pattern is crucial for the ACT.</p>

<h4 style="margin-top: 2rem; margin-bottom: 0.3rem; font-weight: 400;">The Two-Value Pattern</h4>

<ul style="margin: 0.3rem 0 0.5rem 0; padding-left: 1.5rem; line-height: 1.5;">
  <li style="margin: 0.15rem 0;">KEY INSIGHT: All eight angles will have only TWO different measures
    <ul style="margin: 0.15rem 0 0.15rem 0; padding-left: 1.5rem;">
      <li>Four angles will be acute (same measure)</li>
      <li>Four angles will be obtuse (same measure)</li>
      <li>Each acute angle + each obtuse angle = 180° (supplementary)</li>
    </ul>
  </li>
</ul>

<h4 style="margin-top: 2rem; margin-bottom: 0.3rem; font-weight: 400;">Corresponding Angles</h4>

<ul style="margin: 0.3rem 0 0.5rem 0; padding-left: 1.5rem; line-height: 1.5;">
  <li style="margin: 0.15rem 0;">When parallel lines are cut by a transversal, corresponding angles are equal
    <ul style="margin: 0.15rem 0 0.15rem 0; padding-left: 1.5rem;">
      <li>They're in the same "position" at each intersection</li>
    </ul>
  </li>
</ul>

<h4 style="margin-top: 2rem; margin-bottom: 0.3rem; font-weight: 400;">Alternate Interior Angles</h4>

<ul style="margin: 0.3rem 0 0.5rem 0; padding-left: 1.5rem; line-height: 1.5;">
  <li style="margin: 0.15rem 0;">Angles on opposite sides of the transversal, between the parallel lines
    <ul style="margin: 0.15rem 0 0.15rem 0; padding-left: 1.5rem;">
      <li>These are also equal when lines are parallel</li>
    </ul>
  </li>
</ul>

<h3 style="margin-top: 5rem; margin-bottom: 0.75rem; font-weight: 700;">Examples</h3>

<h4 style="margin: 0 0 1rem 0; padding-left: 0.75rem; border-left: 4px solid #b91c1c; color: #000000; font-weight: 700;">Example 1</h4>

<p style="font-size: 16px; line-height: 1.7; margin: 0.5rem 0 1rem 0;">An angle measures 35°. What is its complement? What is its supplement?</p>

<p style="margin: 0.3rem 0 0.5rem 0;">
<span style="font-family: 'Times New Roman', Times, Georgia, serif;">A. Complement: 55°, Supplement: 145°</span><br>
<span style="font-family: 'Times New Roman', Times, Georgia, serif;">B. Complement: 145°, Supplement: 55°</span><br>
<span style="font-family: 'Times New Roman', Times, Georgia, serif;">C. Complement: 45°, Supplement: 155°</span><br>
<span style="font-family: 'Times New Roman', Times, Georgia, serif;">D. Complement: 65°, Supplement: 125°</span><br>
<span style="font-family: 'Times New Roman', Times, Georgia, serif;">E. Complement: 35°, Supplement: 180°</span>
</p>

<p style="font-weight: 600; margin: 1.5rem 0 0.75rem 0; color: #374151;">Solution:</p>

<ul style="margin: 0.3rem 0 0.5rem 0; padding-left: 1.5rem; line-height: 1.5;">
  <li style="margin: 0.15rem 0;">Complement: 90° - 35° = 55°</li>
  <li style="margin: 0.15rem 0;">Supplement: 180° - 35° = 145°</li>
</ul>

<p style="font-size: 16px; line-height: 1.7; margin: 0.5rem 0 1rem 0;">
Answer: A
</p>

<h4 style="margin: 0 0 1rem 0; padding-left: 0.75rem; border-left: 4px solid #b91c1c; color: #000000; font-weight: 700;">Example 2</h4>

<p style="font-size: 16px; line-height: 1.7; margin: 0.5rem 0 1rem 0;">Two lines intersect, creating four angles. One of the angles measures 125°. What are the measures of the other three angles?</p>

<p style="margin: 0.3rem 0 0.5rem 0;">
<span style="font-family: 'Times New Roman', Times, Georgia, serif;">A. 55°, 55°, 125°</span><br>
<span style="font-family: 'Times New Roman', Times, Georgia, serif;">B. 125°, 125°, 55°</span><br>
<span style="font-family: 'Times New Roman', Times, Georgia, serif;">C. 55°, 125°, 125°</span><br>
<span style="font-family: 'Times New Roman', Times, Georgia, serif;">D. 125°, 55°, 55°</span><br>
<span style="font-family: 'Times New Roman', Times, Georgia, serif;">E. 62.5°, 62.5°, 62.5°</span>
</p>

<p style="font-weight: 600; margin: 1.5rem 0 0.75rem 0; color: #374151;">Solution:</p>

<ul style="margin: 0.3rem 0 0.5rem 0; padding-left: 1.5rem; line-height: 1.5;">
  <li style="margin: 0.15rem 0;">Step 1: Find the vertical angle: It must also be 125° (vertical angles are equal)</li>
  <li style="margin: 0.15rem 0;">Step 2: Find one adjacent angle: 180° - 125° = 55°</li>
  <li style="margin: 0.15rem 0;">Step 3: The other adjacent angle is also 55° (it's vertical to the one we just found)</li>
  <li style="margin: 0.15rem 0;">Final answer: The four angles are 125°, 55°, 125°, and 55°</li>
</ul>

<p style="font-size: 16px; line-height: 1.7; margin: 0.5rem 0 1rem 0;">
Answer: C
</p>

<h4 style="margin: 0 0 1rem 0; padding-left: 0.75rem; border-left: 4px solid #b91c1c; color: #000000; font-weight: 700;">Example 3</h4>

<p style="font-size: 16px; line-height: 1.7; margin: 0.5rem 0 1rem 0;">Two parallel lines are cut by a transversal. One of the angles formed measures 65°. What are the possible measures of the other seven angles?</p>

<p style="margin: 0.3rem 0 0.5rem 0;">
<span style="font-family: 'Times New Roman', Times, Georgia, serif;">A. All seven angles are 65°</span><br>
<span style="font-family: 'Times New Roman', Times, Georgia, serif;">B. Three angles are 65° and four are 115°</span><br>
<span style="font-family: 'Times New Roman', Times, Georgia, serif;">C. Four angles are 65° and three are 115°</span><br>
<span style="font-family: 'Times New Roman', Times, Georgia, serif;">D. Six angles are 65° and one is 115°</span><br>
<span style="font-family: 'Times New Roman', Times, Georgia, serif;">E. All eight angles are different</span>
</p>

<p style="font-weight: 600; margin: 1.5rem 0 0.75rem 0; color: #374151;">Solution:</p>

<ul style="margin: 0.3rem 0 0.5rem 0; padding-left: 1.5rem; line-height: 1.5;">
  <li style="margin: 0.15rem 0;">Step 1: Identify that 65° is an acute angle</li>
  <li style="margin: 0.15rem 0;">Step 2: All four acute angles = 65°</li>
  <li style="margin: 0.15rem 0;">Step 3: Find the obtuse angle: 180° - 65° = 115°</li>
  <li style="margin: 0.15rem 0;">Step 4: All four obtuse angles = 115°</li>
  <li style="margin: 0.15rem 0;">Final answer: Four angles measure 65°, and four angles measure 115°</li>
</ul>

<p style="font-size: 16px; line-height: 1.7; margin: 0.5rem 0 1rem 0;">
Answer: B
</p>

<h3 style="margin-top: 5rem; margin-bottom: 0.75rem; font-weight: 700;">Key Takeaways</h3>

<ul style="list-style: none; padding-left: 0; margin: 0;">
  <li style="padding-left: 2rem; margin-bottom: 1rem; position: relative; color: #1b5e20; font-size: 16px; line-height: 1.7;">
    <span style="position: absolute; left: 0; color: #4caf50; font-weight: bold; font-size: 1.2rem;">✓</span>
    Angle types: Acute (<90°), Right (90°), Obtuse (90°-180°), Straight (180°)
  </li>
  <li style="padding-left: 2rem; margin-bottom: 1rem; position: relative; color: #1b5e20; font-size: 16px; line-height: 1.7;">
    <span style="position: absolute; left: 0; color: #4caf50; font-weight: bold; font-size: 1.2rem;">✓</span>
    <strong style="color: #2563eb; font-weight: 600; text-decoration: underline;">Complementary Angles</strong> add to 90°; <strong style="color: #2563eb; font-weight: 600; text-decoration: underline;">Supplementary Angles</strong> add to 180°
  </li>
  <li style="padding-left: 2rem; margin-bottom: 1rem; position: relative; color: #1b5e20; font-size: 16px; line-height: 1.7;">
    <span style="position: absolute; left: 0; color: #4caf50; font-weight: bold; font-size: 1.2rem;">✓</span>
    <strong style="color: #2563eb; font-weight: 600; text-decoration: underline;">Vertical angles</strong> are always equal when two lines intersect
  </li>
  <li style="padding-left: 2rem; margin-bottom: 1rem; position: relative; color: #1b5e20; font-size: 16px; line-height: 1.7;">
    <span style="position: absolute; left: 0; color: #4caf50; font-weight: bold; font-size: 1.2rem;">✓</span>
    Adjacent angles on a straight line are supplementary (sum to 180°)
  </li>
  <li style="padding-left: 2rem; margin-bottom: 1rem; position: relative; color: #1b5e20; font-size: 16px; line-height: 1.7;">
    <span style="position: absolute; left: 0; color: #4caf50; font-weight: bold; font-size: 1.2rem;">✓</span>
    Parallel lines + transversal create only TWO angle measures that sum to 180°
  </li>
</ul>`;

console.log('Restoring original content...\n');

const { error: updateError } = await supabase
  .from('lessons')
  .update({ content: fullContent })
  .eq('lesson_key', 'geometry-angles');

if (updateError) {
  console.error('❌ Error updating:', updateError);
  process.exit(1);
}

console.log('✅ Successfully restored lesson content!');
console.log('All 3 examples are back with proper formatting');
