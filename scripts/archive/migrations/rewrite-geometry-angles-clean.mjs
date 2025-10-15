/**
 * COMPLETE REWRITE: geometry-angles lesson
 * - Remove ALL SVG diagrams and visuals
 * - Lumisource style: bullet points, clean text, blue keywords
 * - Logical progression that makes complete sense
 * - One green takeaway box at end
 */

import { createClient } from '@supabase/supabase-js';
import dotenv from 'dotenv';

dotenv.config();

const supabase = createClient(
  process.env.REACT_APP_SUPABASE_URL,
  process.env.SUPABASE_SERVICE_ROLE_KEY
);

const newContent = `<h3 style="margin-top: 3rem; margin-bottom: 0.75rem;">Understanding Angles</h3>

<p style="font-size: 0.9rem; line-height: 1.6; margin: 0.5rem 0 1rem 0;">Angles are one of the most fundamental concepts in geometry. They appear in almost every ACT geometry question, so mastering them is essential. This lesson will teach you everything you need to know about angles—from basic definitions to the key relationships that show up on the test.</p>

<h3 style="margin-top: 3rem; margin-bottom: 0.75rem;">What Is an Angle?</h3>

<p style="font-size: 0.9rem; line-height: 1.6; margin: 0.5rem 0 1rem 0;">An <strong style="color: #2563eb; text-decoration: underline;">angle</strong> is formed when two rays (or line segments) share a common endpoint called the <strong style="color: #2563eb; text-decoration: underline;">vertex</strong>.</p>

<ul style="margin: 1rem 0; padding-left: 1.5rem; line-height: 2;">
  <li style="margin: 0.4rem 0;">The two rays are called the <strong>sides</strong> of the angle</li>
  <li style="margin: 0.4rem 0;">We measure angles in <strong>degrees (°)</strong></li>
  <li style="margin: 0.4rem 0;">A full rotation around a point is <strong>360°</strong></li>
  <li style="margin: 0.4rem 0;">Angles are typically labeled with three letters (like ∠ABC) or a single letter/number</li>
</ul>

<h3 style="margin-top: 3rem; margin-bottom: 0.75rem;">Types of Angles</h3>

<p style="font-size: 0.9rem; line-height: 1.6; margin: 0.5rem 0 1rem 0;">Angles are classified by their measure. Here are the four main types you need to know:</p>

<h4 style="margin-top: 2rem; margin-bottom: 0.5rem;">1. Acute Angles</h4>

<ul style="margin: 1rem 0; padding-left: 1.5rem; line-height: 2;">
  <li style="margin: 0.4rem 0;"><strong>Definition:</strong> Any angle less than 90°</li>
  <li style="margin: 0.4rem 0;"><strong>Examples:</strong> 30°, 45°, 60°, 89°</li>
  <li style="margin: 0.4rem 0;"><strong>Think of it as:</strong> A "small" or "sharp" angle</li>
</ul>

<h4 style="margin-top: 2rem; margin-bottom: 0.5rem;">2. Right Angles</h4>

<ul style="margin: 1rem 0; padding-left: 1.5rem; line-height: 2;">
  <li style="margin: 0.4rem 0;"><strong>Definition:</strong> Exactly 90°</li>
  <li style="margin: 0.4rem 0;"><strong>Symbol:</strong> Usually marked with a small square in the corner</li>
  <li style="margin: 0.4rem 0;"><strong>Common places:</strong> Corners of rectangles, squares, and perpendicular lines</li>
</ul>

<h4 style="margin-top: 2rem; margin-bottom: 0.5rem;">3. Obtuse Angles</h4>

<ul style="margin: 1rem 0; padding-left: 1.5rem; line-height: 2;">
  <li style="margin: 0.4rem 0;"><strong>Definition:</strong> Greater than 90° but less than 180°</li>
  <li style="margin: 0.4rem 0;"><strong>Examples:</strong> 100°, 120°, 135°, 179°</li>
  <li style="margin: 0.4rem 0;"><strong>Think of it as:</strong> A "wide" angle that's opened beyond 90°</li>
</ul>

<h4 style="margin-top: 2rem; margin-bottom: 0.5rem;">4. Straight Angles</h4>

<ul style="margin: 1rem 0; padding-left: 1.5rem; line-height: 2;">
  <li style="margin: 0.4rem 0;"><strong>Definition:</strong> Exactly 180°</li>
  <li style="margin: 0.4rem 0;"><strong>Looks like:</strong> A straight line</li>
  <li style="margin: 0.4rem 0;"><strong>Key fact:</strong> The two rays point in opposite directions</li>
</ul>

<h3 style="margin-top: 3rem; margin-bottom: 0.75rem;">Angle Pairs: Complementary and Supplementary</h3>

<p style="font-size: 0.9rem; line-height: 1.6; margin: 0.5rem 0 1rem 0;">The ACT frequently tests two important angle relationships. Understanding these will help you solve many problems quickly.</p>

<h4 style="margin-top: 2rem; margin-bottom: 0.5rem;">Complementary Angles</h4>

<ul style="margin: 1rem 0; padding-left: 1.5rem; line-height: 2;">
  <li style="margin: 0.4rem 0;"><strong>Definition:</strong> Two angles that <strong style="color: #2563eb; text-decoration: underline;">add up to 90°</strong></li>
  <li style="margin: 0.4rem 0;"><strong>Example:</strong> 30° and 60° are complementary (30 + 60 = 90)</li>
  <li style="margin: 0.4rem 0;"><strong>Example:</strong> 45° and 45° are complementary</li>
  <li style="margin: 0.4rem 0;"><strong>Memory trick:</strong> "C" for Complementary, "C" for Corner (90° = right angle = corner)</li>
</ul>

<h4 style="margin-top: 2rem; margin-bottom: 0.5rem;">Supplementary Angles</h4>

<ul style="margin: 1rem 0; padding-left: 1.5rem; line-height: 2;">
  <li style="margin: 0.4rem 0;"><strong>Definition:</strong> Two angles that <strong style="color: #2563eb; text-decoration: underline;">add up to 180°</strong></li>
  <li style="margin: 0.4rem 0;"><strong>Example:</strong> 110° and 70° are supplementary (110 + 70 = 180)</li>
  <li style="margin: 0.4rem 0;"><strong>Example:</strong> 90° and 90° are supplementary</li>
  <li style="margin: 0.4rem 0;"><strong>Memory trick:</strong> "S" for Supplementary, "S" for Straight line (180°)</li>
</ul>

<h4 style="margin-top: 2rem; margin-bottom: 0.5rem;">Example 1: Finding Complementary and Supplementary Angles</h4>

<p style="font-size: 0.9rem; line-height: 1.6; margin: 0.5rem 0 1rem 0;"><strong>Problem:</strong> An angle measures 35°. What is its complement? What is its supplement?</p>

<p style="font-size: 0.9rem; line-height: 1.6; margin: 0.5rem 0 1rem 0;"><strong>Solution:</strong></p>

<ul style="margin: 1rem 0; padding-left: 1.5rem; line-height: 2;">
  <li style="margin: 0.4rem 0;"><strong>Complement:</strong> 90° - 35° = <strong>55°</strong></li>
  <li style="margin: 0.4rem 0;"><strong>Supplement:</strong> 180° - 35° = <strong>145°</strong></li>
</ul>

<h3 style="margin-top: 3rem; margin-bottom: 0.75rem;">Angles Formed by Intersecting Lines</h3>

<p style="font-size: 0.9rem; line-height: 1.6; margin: 0.5rem 0 1rem 0;">When two straight lines intersect (cross each other), they create four angles. These angles have special properties that the ACT tests frequently.</p>

<h4 style="margin-top: 2rem; margin-bottom: 0.5rem;">Vertical Angles</h4>

<ul style="margin: 1rem 0; padding-left: 1.5rem; line-height: 2;">
  <li style="margin: 0.4rem 0;"><strong>Definition:</strong> Angles that are <strong>opposite each other</strong> when two lines intersect</li>
  <li style="margin: 0.4rem 0;"><strong style="color: #2563eb; text-decoration: underline;">KEY RULE: Vertical angles are ALWAYS equal</strong></li>
  <li style="margin: 0.4rem 0;">If one angle is 70°, the angle across from it is also 70°</li>
  <li style="margin: 0.4rem 0;">This is one of the most tested angle relationships on the ACT</li>
</ul>

<h4 style="margin-top: 2rem; margin-bottom: 0.5rem;">Adjacent Angles on a Line</h4>

<ul style="margin: 1rem 0; padding-left: 1.5rem; line-height: 2;">
  <li style="margin: 0.4rem 0;"><strong>Definition:</strong> Angles that are <strong>next to each other</strong> and share a side</li>
  <li style="margin: 0.4rem 0;"><strong>KEY RULE: Adjacent angles on a straight line are supplementary (add to 180°)</strong></li>
  <li style="margin: 0.4rem 0;">If one angle is 70°, the angle next to it is 180° - 70° = 110°</li>
</ul>

<h4 style="margin-top: 2rem; margin-bottom: 0.5rem;">Example 2: Intersecting Lines</h4>

<p style="font-size: 0.9rem; line-height: 1.6; margin: 0.5rem 0 1rem 0;"><strong>Problem:</strong> Two lines intersect, creating four angles. One of the angles measures 125°. What are the measures of the other three angles?</p>

<p style="font-size: 0.9rem; line-height: 1.6; margin: 0.5rem 0 1rem 0;"><strong>Solution:</strong></p>

<ul style="margin: 1rem 0; padding-left: 1.5rem; line-height: 2;">
  <li style="margin: 0.4rem 0;"><strong>Step 1:</strong> Find the vertical angle: It must also be <strong>125°</strong> (vertical angles are equal)</li>
  <li style="margin: 0.4rem 0;"><strong>Step 2:</strong> Find one adjacent angle: 180° - 125° = <strong>55°</strong></li>
  <li style="margin: 0.4rem 0;"><strong>Step 3:</strong> The other adjacent angle is also <strong>55°</strong> (it's vertical to the one we just found)</li>
  <li style="margin: 0.4rem 0;"><strong>Final answer:</strong> The four angles are 125°, 55°, 125°, and 55°</li>
</ul>

<h3 style="margin-top: 3rem; margin-bottom: 0.75rem;">Parallel Lines Cut by a Transversal</h3>

<p style="font-size: 0.9rem; line-height: 1.6; margin: 0.5rem 0 1rem 0;">This is one of the most important angle concepts on the ACT. When a line (called a <strong style="color: #2563eb; text-decoration: underline;">transversal</strong>) crosses two parallel lines, it creates eight angles with predictable relationships.</p>

<h4 style="margin-top: 2rem; margin-bottom: 0.5rem;">Key Terminology</h4>

<ul style="margin: 1rem 0; padding-left: 1.5rem; line-height: 2;">
  <li style="margin: 0.4rem 0;"><strong>Parallel lines:</strong> Lines that never intersect (always the same distance apart)</li>
  <li style="margin: 0.4rem 0;"><strong>Transversal:</strong> A line that crosses two or more other lines</li>
  <li style="margin: 0.4rem 0;"><strong>Parallel symbol:</strong> Two parallel lines are marked with matching arrow symbols (|| or arrows)</li>
</ul>

<h4 style="margin-top: 2rem; margin-bottom: 0.5rem;">The Pattern of Eight Angles</h4>

<p style="font-size: 0.9rem; line-height: 1.6; margin: 0.5rem 0 1rem 0;">When a transversal crosses two parallel lines, the eight angles formed follow a simple pattern:</p>

<ul style="margin: 1rem 0; padding-left: 1.5rem; line-height: 2;">
  <li style="margin: 0.4rem 0;"><strong>Four angles will be acute</strong> (all equal to each other)</li>
  <li style="margin: 0.4rem 0;"><strong>Four angles will be obtuse</strong> (all equal to each other)</li>
  <li style="margin: 0.4rem 0;">Each acute angle + each obtuse angle = <strong>180°</strong></li>
</ul>

<h4 style="margin-top: 2rem; margin-bottom: 0.5rem;">Important Angle Pairs</h4>

<p style="font-size: 0.9rem; line-height: 1.6; margin: 0.5rem 0 1rem 0;">There are several types of equal angles when parallel lines are cut by a transversal:</p>

<ul style="margin: 1rem 0; padding-left: 1.5rem; line-height: 2;">
  <li style="margin: 0.4rem 0;"><strong>Corresponding angles:</strong> Angles in the same position at each intersection (equal)</li>
  <li style="margin: 0.4rem 0;"><strong>Alternate interior angles:</strong> Angles on opposite sides of the transversal, between the parallel lines (equal)</li>
  <li style="margin: 0.4rem 0;"><strong>Alternate exterior angles:</strong> Angles on opposite sides of the transversal, outside the parallel lines (equal)</li>
</ul>

<p style="font-size: 0.9rem; line-height: 1.6; margin: 0.5rem 0 1rem 0;"><strong>ACT Shortcut:</strong> You don't need to memorize all these names. Just remember: when you see parallel lines, there are only TWO different angle measures, and they add up to 180°.</p>

<h4 style="margin-top: 2rem; margin-bottom: 0.5rem;">Example 3: Parallel Lines Problem</h4>

<p style="font-size: 0.9rem; line-height: 1.6; margin: 0.5rem 0 1rem 0;"><strong>Problem:</strong> Two parallel lines are cut by a transversal. One of the angles formed measures 65°. What are the possible measures of the other seven angles?</p>

<p style="font-size: 0.9rem; line-height: 1.6; margin: 0.5rem 0 1rem 0;"><strong>Solution:</strong></p>

<ul style="margin: 1rem 0; padding-left: 1.5rem; line-height: 2;">
  <li style="margin: 0.4rem 0;"><strong>Step 1:</strong> Identify that 65° is an acute angle</li>
  <li style="margin: 0.4rem 0;"><strong>Step 2:</strong> All four acute angles = <strong>65°</strong></li>
  <li style="margin: 0.4rem 0;"><strong>Step 3:</strong> Find the obtuse angle: 180° - 65° = <strong>115°</strong></li>
  <li style="margin: 0.4rem 0;"><strong>Step 4:</strong> All four obtuse angles = <strong>115°</strong></li>
  <li style="margin: 0.4rem 0;"><strong>Final answer:</strong> Four angles measure 65°, and four angles measure 115°</li>
</ul>

<h3 style="margin-top: 3rem; margin-bottom: 0.75rem;">ACT-Style Practice Question</h3>

<p style="font-size: 0.9rem; line-height: 1.6; margin: 0.5rem 0 1rem 0;"><strong>Problem:</strong> In the figure, lines l and m are parallel, and they are intersected by transversal t. If one angle measures 42°, which of the following could NOT be the measure of another angle in the figure?</p>

<p style="font-size: 0.9rem; line-height: 1.6; margin: 0.5rem 0 1rem 0;">
  <strong>A.</strong> 42°<br>
  <strong>B.</strong> 84°<br>
  <strong>C.</strong> 138°<br>
  <strong>D.</strong> 180°<br>
  <strong>E.</strong> None of these
</p>

<p style="font-size: 0.9rem; line-height: 1.6; margin: 0.5rem 0 1rem 0;"><strong>Solution:</strong></p>

<ul style="margin: 1rem 0; padding-left: 1.5rem; line-height: 2;">
  <li style="margin: 0.4rem 0;">With parallel lines, we only have TWO angle measures</li>
  <li style="margin: 0.4rem 0;">Given angle: <strong>42°</strong></li>
  <li style="margin: 0.4rem 0;">Supplementary angle: 180° - 42° = <strong>138°</strong></li>
  <li style="margin: 0.4rem 0;">So the only possible angle measures are 42° and 138°</li>
  <li style="margin: 0.4rem 0;"><strong>84°</strong> doesn't fit this pattern</li>
</ul>

<p style="font-size: 0.9rem; line-height: 1.6; margin: 0.5rem 0 1rem 0;"><strong>Answer: B (84° could NOT be an angle measure)</strong></p>

<h3 style="margin-top: 3rem; margin-bottom: 0.75rem;">Problem-Solving Strategy for Angle Questions</h3>

<p style="font-size: 0.9rem; line-height: 1.6; margin: 0.5rem 0 1rem 0;">When you encounter an angle problem on the ACT, use this systematic approach:</p>

<ol style="margin: 1rem 0; padding-left: 1.5rem; line-height: 2;">
  <li style="margin: 0.4rem 0;"><strong>Identify what you know:</strong> Mark all given angle measures on the diagram</li>
  <li style="margin: 0.4rem 0;"><strong>Look for key relationships:</strong>
    <ul style="margin: 0.5rem 0; padding-left: 1.5rem;">
      <li>Are the lines parallel? (Look for parallel markers)</li>
      <li>Do you see vertical angles? (They're equal)</li>
      <li>Are angles on a straight line? (They sum to 180°)</li>
      <li>Are angles in a triangle? (They sum to 180°)</li>
    </ul>
  </li>
  <li style="margin: 0.4rem 0;"><strong>Apply the rules:</strong> Use the angle relationships you identified</li>
  <li style="margin: 0.4rem 0;"><strong>Check your answer:</strong> Does it make sense? Is it in the right range?</li>
</ol>

<div style="background: #f0fdf4; padding: 1.5rem 2rem; border-radius: 8px; margin: 3rem 0 2rem 0; border-left: 4px solid #10b981;">
  <h4 style="margin-top: 0; margin-bottom: 1rem;">✓ Key Takeaways</h4>
  <ul style="margin: 0.5rem 0; padding-left: 1.5rem; line-height: 2;">
    <li style="margin: 0.4rem 0;"><strong>Angle types:</strong> Acute (&lt;90°), Right (90°), Obtuse (90°-180°), Straight (180°)</li>
    <li style="margin: 0.4rem 0;"><strong>Complementary angles</strong> add to 90°; <strong>supplementary angles</strong> add to 180°</li>
    <li style="margin: 0.4rem 0;"><strong>Vertical angles are always equal</strong> when two lines intersect</li>
    <li style="margin: 0.4rem 0;"><strong>Adjacent angles on a straight line</strong> are supplementary (sum to 180°)</li>
    <li style="margin: 0.4rem 0;"><strong>Parallel lines + transversal</strong> create only TWO angle measures that sum to 180°</li>
    <li style="margin: 0.4rem 0;">All acute angles are equal to each other, and all obtuse angles are equal to each other</li>
  </ul>
</div>`;

async function rewriteLesson() {
  console.log('╔══════════════════════════════════════════════════════════╗');
  console.log('║     REWRITING GEOMETRY-ANGLES LESSON                    ║');
  console.log('║     Clean Lumisource Style - No Visuals                 ║');
  console.log('╚══════════════════════════════════════════════════════════╝\n');

  console.log('✓ Removed all SVG diagrams (3 diagrams removed)');
  console.log('✓ Removed tables and complex formatting');
  console.log('✓ Rewrote with bullet-point structure');
  console.log('✓ Added blue underlined keywords strategically');
  console.log('✓ Organized with logical progression:');
  console.log('    1. What is an angle?');
  console.log('    2. Types of angles');
  console.log('    3. Complementary and supplementary');
  console.log('    4. Intersecting lines (vertical angles)');
  console.log('    5. Parallel lines with transversal');
  console.log('    6. Practice problems');
  console.log('    7. Problem-solving strategy');
  console.log('✓ Added green takeaway box at end\n');

  const { error } = await supabase
    .from('lessons')
    .update({
      content: newContent,
      updated_at: new Date().toISOString()
    })
    .eq('lesson_key', 'geometry-angles');

  if (error) {
    console.error('❌ Error:', error.message);
    return false;
  }

  console.log('✅ Successfully rewrote geometry-angles lesson!');
  console.log('\nNew lesson features:');
  console.log('  ✓ Clean, organized bullet-point format');
  console.log('  ✓ No visual diagrams (text-only)');
  console.log('  ✓ Logical progression from basics to advanced');
  console.log('  ✓ Strategic use of blue keywords');
  console.log('  ✓ Multiple examples with step-by-step solutions');
  console.log('  ✓ ACT-specific problem-solving strategies');
  console.log('  ✓ Green takeaway box summarizing key concepts');

  return true;
}

rewriteLesson().catch(console.error);
