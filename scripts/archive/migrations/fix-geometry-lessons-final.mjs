/**
 * FIX BOTH GEOMETRY LESSONS:
 * 1. Fix heading hierarchy (h3 for major sections, h4 for subsections - resets at each h3)
 * 2. Fix examples format (must have proper structure for parser)
 * 3. Keep clean Lumisource style, no visuals
 */

import { createClient } from '@supabase/supabase-js';
import dotenv from 'dotenv';

dotenv.config();

const supabase = createClient(
  process.env.REACT_APP_SUPABASE_URL,
  process.env.SUPABASE_SERVICE_ROLE_KEY
);

// LESSON 1: geometry-angles
const anglesContent = `<h3 style="margin-top: 3rem; margin-bottom: 0.75rem;">Understanding Angles</h3>

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

<h4 style="margin-top: 2rem; margin-bottom: 0.5rem;">Acute Angles</h4>

<ul style="margin: 1rem 0; padding-left: 1.5rem; line-height: 2;">
  <li style="margin: 0.4rem 0;"><strong>Definition:</strong> Any angle less than 90°</li>
  <li style="margin: 0.4rem 0;"><strong>Examples:</strong> 30°, 45°, 60°, 89°</li>
  <li style="margin: 0.4rem 0;"><strong>Think of it as:</strong> A "small" or "sharp" angle</li>
</ul>

<h4 style="margin-top: 2rem; margin-bottom: 0.5rem;">Right Angles</h4>

<ul style="margin: 1rem 0; padding-left: 1.5rem; line-height: 2;">
  <li style="margin: 0.4rem 0;"><strong>Definition:</strong> Exactly 90°</li>
  <li style="margin: 0.4rem 0;"><strong>Symbol:</strong> Usually marked with a small square in the corner</li>
  <li style="margin: 0.4rem 0;"><strong>Common places:</strong> Corners of rectangles, squares, and perpendicular lines</li>
</ul>

<h4 style="margin-top: 2rem; margin-bottom: 0.5rem;">Obtuse Angles</h4>

<ul style="margin: 1rem 0; padding-left: 1.5rem; line-height: 2;">
  <li style="margin: 0.4rem 0;"><strong>Definition:</strong> Greater than 90° but less than 180°</li>
  <li style="margin: 0.4rem 0;"><strong>Examples:</strong> 100°, 120°, 135°, 179°</li>
  <li style="margin: 0.4rem 0;"><strong>Think of it as:</strong> A "wide" angle that's opened beyond 90°</li>
</ul>

<h4 style="margin-top: 2rem; margin-bottom: 0.5rem;">Straight Angles</h4>

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

<h4 style="margin-top: 2rem; margin-bottom: 0.5rem;">Example 1</h4>

<p style="font-size: 0.9rem; line-height: 1.6; margin: 0.5rem 0 1rem 0;">
<strong>Problem:</strong> An angle measures 35°. What is its complement? What is its supplement?
</p>

<p style="font-size: 0.9rem; line-height: 1.6; margin: 0.5rem 0 1rem 0;">
<strong>Solution:</strong>
</p>

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

<h4 style="margin-top: 2rem; margin-bottom: 0.5rem;">Example 2</h4>

<p style="font-size: 0.9rem; line-height: 1.6; margin: 0.5rem 0 1rem 0;">
<strong>Problem:</strong> Two lines intersect, creating four angles. One of the angles measures 125°. What are the measures of the other three angles?
</p>

<p style="font-size: 0.9rem; line-height: 1.6; margin: 0.5rem 0 1rem 0;">
<strong>Solution:</strong>
</p>

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

<p style="font-size: 0.9rem; line-height: 1.6; margin: 0.5rem 0 1rem 0;"><strong>ACT Shortcut:</strong> When you see parallel lines, there are only TWO different angle measures, and they add up to 180°.</p>

<h4 style="margin-top: 2rem; margin-bottom: 0.5rem;">Example 3</h4>

<p style="font-size: 0.9rem; line-height: 1.6; margin: 0.5rem 0 1rem 0;">
<strong>Problem:</strong> Two parallel lines are cut by a transversal. One of the angles formed measures 65°. What are the possible measures of the other seven angles?
</p>

<p style="font-size: 0.9rem; line-height: 1.6; margin: 0.5rem 0 1rem 0;">
<strong>Solution:</strong>
</p>

<ul style="margin: 1rem 0; padding-left: 1.5rem; line-height: 2;">
  <li style="margin: 0.4rem 0;"><strong>Step 1:</strong> Identify that 65° is an acute angle</li>
  <li style="margin: 0.4rem 0;"><strong>Step 2:</strong> All four acute angles = <strong>65°</strong></li>
  <li style="margin: 0.4rem 0;"><strong>Step 3:</strong> Find the obtuse angle: 180° - 65° = <strong>115°</strong></li>
  <li style="margin: 0.4rem 0;"><strong>Step 4:</strong> All four obtuse angles = <strong>115°</strong></li>
  <li style="margin: 0.4rem 0;"><strong>Final answer:</strong> Four angles measure 65°, and four angles measure 115°</li>
</ul>

<h3 style="margin-top: 3rem; margin-bottom: 0.75rem;">Problem-Solving Strategy</h3>

<p style="font-size: 0.9rem; line-height: 1.6; margin: 0.5rem 0 1rem 0;">When you encounter an angle problem on the ACT, use this systematic approach:</p>

<ol style="margin: 1rem 0; padding-left: 1.5rem; line-height: 2;">
  <li style="margin: 0.4rem 0;"><strong>Identify what you know:</strong> Mark all given angle measures on the diagram</li>
  <li style="margin: 0.4rem 0;"><strong>Look for key relationships:</strong>
    <ul style="margin: 0.5rem 0; padding-left: 1.5rem;">
      <li>Are the lines parallel? (Look for parallel markers)</li>
      <li>Do you see vertical angles? (They're equal)</li>
      <li>Are angles on a straight line? (They sum to 180°)</li>
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
  </ul>
</div>`;

// LESSON 2: geometry-shapes
const shapesContent = `<h3 style="margin-top: 3rem; margin-bottom: 0.75rem;">Area and Perimeter of Shapes</h3>

<p style="font-size: 0.9rem; line-height: 1.6; margin: 0.5rem 0 1rem 0;">Understanding area and perimeter is essential for the ACT Math section. Nearly every geometry question involves calculating one or both of these measurements. This lesson will teach you all the formulas you need, when to use them, and how to avoid common mistakes.</p>

<h3 style="margin-top: 3rem; margin-bottom: 0.75rem;">Area vs. Perimeter</h3>

<p style="font-size: 0.9rem; line-height: 1.6; margin: 0.5rem 0 1rem 0;">Before diving into formulas, let's make sure you understand the fundamental difference between these two concepts:</p>

<h4 style="margin-top: 2rem; margin-bottom: 0.5rem;">Perimeter</h4>

<ul style="margin: 1rem 0; padding-left: 1.5rem; line-height: 2;">
  <li style="margin: 0.4rem 0;"><strong>Definition:</strong> The <strong style="color: #2563eb; text-decoration: underline;">distance around</strong> the outside of a shape</li>
  <li style="margin: 0.4rem 0;"><strong>Think of it as:</strong> The length of fence needed to surround a yard</li>
  <li style="margin: 0.4rem 0;"><strong>Units:</strong> Linear units (inches, feet, meters, cm)</li>
  <li style="margin: 0.4rem 0;"><strong>How to find it:</strong> Add up the lengths of all sides</li>
</ul>

<h4 style="margin-top: 2rem; margin-bottom: 0.5rem;">Area</h4>

<ul style="margin: 1rem 0; padding-left: 1.5rem; line-height: 2;">
  <li style="margin: 0.4rem 0;"><strong>Definition:</strong> The amount of <strong style="color: #2563eb; text-decoration: underline;">space inside</strong> a shape</li>
  <li style="margin: 0.4rem 0;"><strong>Think of it as:</strong> The amount of carpet needed to cover a floor</li>
  <li style="margin: 0.4rem 0;"><strong>Units:</strong> Square units (square inches, square feet, m², cm²)</li>
  <li style="margin: 0.4rem 0;"><strong>How to find it:</strong> Use the formula specific to that shape</li>
</ul>

<p style="font-size: 0.9rem; line-height: 1.6; margin: 0.5rem 0 1rem 0;"><strong>Critical distinction:</strong> Perimeter measures the <em>outside edge</em>, while area measures the <em>inside space</em>. Make sure you know which one the problem is asking for!</p>

<h3 style="margin-top: 3rem; margin-bottom: 0.75rem;">Rectangles</h3>

<p style="font-size: 0.9rem; line-height: 1.6; margin: 0.5rem 0 1rem 0;">Rectangles have four sides with opposite sides equal. They're one of the most common shapes on the ACT.</p>

<h4 style="margin-top: 2rem; margin-bottom: 0.5rem;">Formulas</h4>

<ul style="margin: 1rem 0; padding-left: 1.5rem; line-height: 2;">
  <li style="margin: 0.4rem 0;"><strong>Perimeter:</strong> P = 2l + 2w  <em>or</em>  P = 2(l + w)</li>
  <li style="margin: 0.4rem 0;"><strong>Area:</strong> A = l × w</li>
  <li style="margin: 0.4rem 0;">Where l = length and w = width</li>
</ul>

<h4 style="margin-top: 2rem; margin-bottom: 0.5rem;">Example 1</h4>

<p style="font-size: 0.9rem; line-height: 1.6; margin: 0.5rem 0 1rem 0;">
<strong>Problem:</strong> A rectangle has a length of 12 inches and a width of 5 inches. Find the perimeter and area.
</p>

<p style="font-size: 0.9rem; line-height: 1.6; margin: 0.5rem 0 1rem 0;">
<strong>Solution:</strong>
</p>

<ul style="margin: 1rem 0; padding-left: 1.5rem; line-height: 2;">
  <li style="margin: 0.4rem 0;"><strong>Perimeter:</strong> P = 2(12) + 2(5) = 24 + 10 = <strong>34 inches</strong></li>
  <li style="margin: 0.4rem 0;"><strong>Area:</strong> A = 12 × 5 = <strong>60 square inches</strong></li>
</ul>

<h3 style="margin-top: 3rem; margin-bottom: 0.75rem;">Squares</h3>

<p style="font-size: 0.9rem; line-height: 1.6; margin: 0.5rem 0 1rem 0;">A square is a special type of rectangle where <strong>all four sides are equal</strong>. This simplifies the formulas significantly.</p>

<h4 style="margin-top: 2rem; margin-bottom: 0.5rem;">Formulas</h4>

<ul style="margin: 1rem 0; padding-left: 1.5rem; line-height: 2;">
  <li style="margin: 0.4rem 0;"><strong>Perimeter:</strong> P = 4s</li>
  <li style="margin: 0.4rem 0;"><strong>Area:</strong> A = s²</li>
  <li style="margin: 0.4rem 0;">Where s = side length</li>
</ul>

<h4 style="margin-top: 2rem; margin-bottom: 0.5rem;">Example 2</h4>

<p style="font-size: 0.9rem; line-height: 1.6; margin: 0.5rem 0 1rem 0;">
<strong>Problem:</strong> A square has a side length of 9 cm. Find the perimeter and area.
</p>

<p style="font-size: 0.9rem; line-height: 1.6; margin: 0.5rem 0 1rem 0;">
<strong>Solution:</strong>
</p>

<ul style="margin: 1rem 0; padding-left: 1.5rem; line-height: 2;">
  <li style="margin: 0.4rem 0;"><strong>Perimeter:</strong> P = 4(9) = <strong>36 cm</strong></li>
  <li style="margin: 0.4rem 0;"><strong>Area:</strong> A = 9² = <strong>81 cm²</strong></li>
</ul>

<h3 style="margin-top: 3rem; margin-bottom: 0.75rem;">Triangles</h3>

<p style="font-size: 0.9rem; line-height: 1.6; margin: 0.5rem 0 1rem 0;">The triangle area formula works for <strong>all types of triangles</strong>—right, acute, obtuse, equilateral, isosceles, and scalene.</p>

<h4 style="margin-top: 2rem; margin-bottom: 0.5rem;">Formulas</h4>

<ul style="margin: 1rem 0; padding-left: 1.5rem; line-height: 2;">
  <li style="margin: 0.4rem 0;"><strong>Perimeter:</strong> P = a + b + c  (add all three sides)</li>
  <li style="margin: 0.4rem 0;"><strong>Area:</strong> A = ½bh  <em>or</em>  A = (b × h) / 2</li>
  <li style="margin: 0.4rem 0;">Where b = base and h = height</li>
</ul>

<h4 style="margin-top: 2rem; margin-bottom: 0.5rem;">⚠️ Critical: Height Must Be Perpendicular</h4>

<p style="font-size: 0.9rem; line-height: 1.6; margin: 0.5rem 0 1rem 0;">This is the <strong>most common mistake</strong> students make with triangle area:</p>

<ul style="margin: 1rem 0; padding-left: 1.5rem; line-height: 2;">
  <li style="margin: 0.4rem 0;">The height MUST form a <strong>90° angle</strong> with the base</li>
  <li style="margin: 0.4rem 0;">The height is NOT always a side of the triangle</li>
  <li style="margin: 0.4rem 0;">In a right triangle, one leg can be the base and the other leg is the height</li>
</ul>

<h4 style="margin-top: 2rem; margin-bottom: 0.5rem;">Example 3</h4>

<p style="font-size: 0.9rem; line-height: 1.6; margin: 0.5rem 0 1rem 0;">
<strong>Problem:</strong> A triangle has a base of 10 feet and a height of 6 feet. What is its area?
</p>

<p style="font-size: 0.9rem; line-height: 1.6; margin: 0.5rem 0 1rem 0;">
<strong>Solution:</strong>
</p>

<ul style="margin: 1rem 0; padding-left: 1.5rem; line-height: 2;">
  <li style="margin: 0.4rem 0;"><strong>Formula:</strong> A = ½bh</li>
  <li style="margin: 0.4rem 0;"><strong>Substitute:</strong> A = ½(10)(6)</li>
  <li style="margin: 0.4rem 0;"><strong>Calculate:</strong> A = ½(60) = <strong>30 square feet</strong></li>
</ul>

<h3 style="margin-top: 3rem; margin-bottom: 0.75rem;">Circles</h3>

<p style="font-size: 0.9rem; line-height: 1.6; margin: 0.5rem 0 1rem 0;">Circles are unique because they don't have sides like other shapes. Instead, we use the <strong style="color: #2563eb; text-decoration: underline;">radius</strong> to calculate both circumference and area.</p>

<h4 style="margin-top: 2rem; margin-bottom: 0.5rem;">Formulas</h4>

<ul style="margin: 1rem 0; padding-left: 1.5rem; line-height: 2;">
  <li style="margin: 0.4rem 0;"><strong>Circumference:</strong> C = 2πr  <em>or</em>  C = πd</li>
  <li style="margin: 0.4rem 0;"><strong>Area:</strong> A = πr²</li>
  <li style="margin: 0.4rem 0;">Where r = radius, d = diameter = 2r, π ≈ 3.14159</li>
</ul>

<p style="font-size: 0.9rem; line-height: 1.6; margin: 0.5rem 0 1rem 0;"><strong>Note:</strong> Circumference is the circle's version of perimeter—it's the distance around the circle.</p>

<h4 style="margin-top: 2rem; margin-bottom: 0.5rem;">Common Mistake: Diameter vs. Radius</h4>

<ul style="margin: 1rem 0; padding-left: 1.5rem; line-height: 2;">
  <li style="margin: 0.4rem 0;">If the problem gives you the <strong>diameter</strong>, divide by 2 to get the radius first!</li>
  <li style="margin: 0.4rem 0;">Both formulas require the <strong>radius</strong>, not the diameter</li>
  <li style="margin: 0.4rem 0;">Example: If diameter = 10, then radius = 5</li>
</ul>

<h4 style="margin-top: 2rem; margin-bottom: 0.5rem;">Example 4</h4>

<p style="font-size: 0.9rem; line-height: 1.6; margin: 0.5rem 0 1rem 0;">
<strong>Problem:</strong> A circle has a radius of 7 inches. Find the circumference and area.
</p>

<p style="font-size: 0.9rem; line-height: 1.6; margin: 0.5rem 0 1rem 0;">
<strong>Solution:</strong>
</p>

<ul style="margin: 1rem 0; padding-left: 1.5rem; line-height: 2;">
  <li style="margin: 0.4rem 0;"><strong>Circumference:</strong> C = 2π(7) = 14π ≈ <strong>43.98 inches</strong></li>
  <li style="margin: 0.4rem 0;"><strong>Area:</strong> A = π(7)² = 49π ≈ <strong>153.94 square inches</strong></li>
</ul>

<h3 style="margin-top: 3rem; margin-bottom: 0.75rem;">Trapezoids</h3>

<p style="font-size: 0.9rem; line-height: 1.6; margin: 0.5rem 0 1rem 0;">A trapezoid is a four-sided shape with exactly <strong>two parallel sides</strong> called bases. These parallel sides usually have different lengths.</p>

<h4 style="margin-top: 2rem; margin-bottom: 0.5rem;">Formula</h4>

<ul style="margin: 1rem 0; padding-left: 1.5rem; line-height: 2;">
  <li style="margin: 0.4rem 0;"><strong>Area:</strong> A = ½h(b₁ + b₂)</li>
  <li style="margin: 0.4rem 0;">Where b₁ and b₂ are the two bases, h = height</li>
  <li style="margin: 0.4rem 0;"><strong>Think of it as:</strong> Average the two bases, then multiply by height</li>
</ul>

<h4 style="margin-top: 2rem; margin-bottom: 0.5rem;">Example 5</h4>

<p style="font-size: 0.9rem; line-height: 1.6; margin: 0.5rem 0 1rem 0;">
<strong>Problem:</strong> A trapezoid has bases of length 8 cm and 12 cm, and a height of 5 cm. What is its area?
</p>

<p style="font-size: 0.9rem; line-height: 1.6; margin: 0.5rem 0 1rem 0;">
<strong>Solution:</strong>
</p>

<ul style="margin: 1rem 0; padding-left: 1.5rem; line-height: 2;">
  <li style="margin: 0.4rem 0;"><strong>Formula:</strong> A = ½h(b₁ + b₂)</li>
  <li style="margin: 0.4rem 0;"><strong>Substitute:</strong> A = ½(5)(8 + 12)</li>
  <li style="margin: 0.4rem 0;"><strong>Simplify:</strong> A = ½(5)(20) = ½(100)</li>
  <li style="margin: 0.4rem 0;"><strong>Calculate:</strong> A = <strong>50 cm²</strong></li>
</ul>

<h3 style="margin-top: 3rem; margin-bottom: 0.75rem;">Formula Summary</h3>

<p style="font-size: 0.9rem; line-height: 1.6; margin: 0.5rem 0 1rem 0;">Here's a quick reference for all the formulas you need to memorize:</p>

<h4 style="margin-top: 2rem; margin-bottom: 0.5rem;">Rectangle</h4>
<ul style="margin: 0.5rem 0; padding-left: 1.5rem; line-height: 2;">
  <li style="margin: 0.2rem 0;">Perimeter: P = 2l + 2w</li>
  <li style="margin: 0.2rem 0;">Area: A = l × w</li>
</ul>

<h4 style="margin-top: 2rem; margin-bottom: 0.5rem;">Square</h4>
<ul style="margin: 0.5rem 0; padding-left: 1.5rem; line-height: 2;">
  <li style="margin: 0.2rem 0;">Perimeter: P = 4s</li>
  <li style="margin: 0.2rem 0;">Area: A = s²</li>
</ul>

<h4 style="margin-top: 2rem; margin-bottom: 0.5rem;">Triangle</h4>
<ul style="margin: 0.5rem 0; padding-left: 1.5rem; line-height: 2;">
  <li style="margin: 0.2rem 0;">Perimeter: P = a + b + c</li>
  <li style="margin: 0.2rem 0;">Area: A = ½bh</li>
</ul>

<h4 style="margin-top: 2rem; margin-bottom: 0.5rem;">Circle</h4>
<ul style="margin: 0.5rem 0; padding-left: 1.5rem; line-height: 2;">
  <li style="margin: 0.2rem 0;">Circumference: C = 2πr</li>
  <li style="margin: 0.2rem 0;">Area: A = πr²</li>
</ul>

<h4 style="margin-top: 2rem; margin-bottom: 0.5rem;">Trapezoid</h4>
<ul style="margin: 0.5rem 0; padding-left: 1.5rem; line-height: 2;">
  <li style="margin: 0.2rem 0;">Area: A = ½h(b₁ + b₂)</li>
</ul>

<h3 style="margin-top: 3rem; margin-bottom: 0.75rem;">Common Mistakes to Avoid</h3>

<ul style="margin: 1rem 0; padding-left: 1.5rem; line-height: 2;">
  <li style="margin: 0.4rem 0;"><strong>Confusing area and perimeter</strong> — Read the question carefully!</li>
  <li style="margin: 0.4rem 0;"><strong>Using diameter instead of radius</strong> for circles — Divide diameter by 2 first</li>
  <li style="margin: 0.4rem 0;"><strong>Forgetting to square the radius</strong> in circle area (A = πr², not πr)</li>
  <li style="margin: 0.4rem 0;"><strong>Using a slanted side as height</strong> in triangles — Height must be perpendicular!</li>
  <li style="margin: 0.4rem 0;"><strong>Forgetting the ½</strong> in triangle and trapezoid formulas</li>
  <li style="margin: 0.4rem 0;"><strong>Wrong units</strong> — Perimeter is linear (cm), area is square (cm²)</li>
</ul>

<div style="background: #f0fdf4; padding: 1.5rem 2rem; border-radius: 8px; margin: 3rem 0 2rem 0; border-left: 4px solid #10b981;">
  <h4 style="margin-top: 0; margin-bottom: 1rem;">✓ Key Takeaways</h4>
  <ul style="margin: 0.5rem 0; padding-left: 1.5rem; line-height: 2;">
    <li style="margin: 0.4rem 0;"><strong>Perimeter</strong> = distance around (linear units); <strong>Area</strong> = space inside (square units)</li>
    <li style="margin: 0.4rem 0;"><strong>Rectangle:</strong> P = 2l + 2w, A = l × w</li>
    <li style="margin: 0.4rem 0;"><strong>Square:</strong> P = 4s, A = s²</li>
    <li style="margin: 0.4rem 0;"><strong>Triangle:</strong> A = ½bh (height must be perpendicular)</li>
    <li style="margin: 0.4rem 0;"><strong>Circle:</strong> C = 2πr, A = πr² (use radius, not diameter)</li>
    <li style="margin: 0.4rem 0;"><strong>Trapezoid:</strong> A = ½h(b₁ + b₂)</li>
  </ul>
</div>`;

async function fixLessons() {
  console.log('╔══════════════════════════════════════════════════════════╗');
  console.log('║     FIXING GEOMETRY LESSONS                             ║');
  console.log('║     1. Fix heading hierarchy                            ║');
  console.log('║     2. Fix example format                               ║');
  console.log('╚══════════════════════════════════════════════════════════╝\n');

  // Update geometry-angles
  const { error: error1 } = await supabase
    .from('lessons')
    .update({
      content: anglesContent,
      updated_at: new Date().toISOString()
    })
    .eq('lesson_key', 'geometry-angles');

  if (error1) {
    console.error('❌ Error updating geometry-angles:', error1.message);
    return false;
  }

  console.log('✅ Fixed geometry-angles');
  console.log('  - H3 headings for major sections');
  console.log('  - H4 headings reset at each H3');
  console.log('  - Examples properly formatted (Example 1, 2, 3 with Problem/Solution)');
  console.log('');

  // Update geometry-shapes
  const { error: error2 } = await supabase
    .from('lessons')
    .update({
      content: shapesContent,
      updated_at: new Date().toISOString()
    })
    .eq('lesson_key', 'geometry-shapes');

  if (error2) {
    console.error('❌ Error updating geometry-shapes:', error2.message);
    return false;
  }

  console.log('✅ Fixed geometry-shapes');
  console.log('  - H3 headings for major sections');
  console.log('  - H4 headings reset at each H3');
  console.log('  - Examples properly formatted (Example 1-5 with Problem/Solution)');
  console.log('');

  console.log('✅ All lessons fixed!');
  console.log('\nHeading structure:');
  console.log('  H3: Major section (Understanding Angles, Types of Angles, etc.)');
  console.log('  H4: Subsections that reset at each H3');
  console.log('\nExample structure:');
  console.log('  <h4>Example 1</h4>');
  console.log('  <strong>Problem:</strong> ...');
  console.log('  <strong>Solution:</strong> ...');

  return true;
}

fixLessons().catch(console.error);
