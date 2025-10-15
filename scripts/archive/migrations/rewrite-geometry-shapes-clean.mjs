/**
 * COMPLETE REWRITE: geometry-shapes lesson
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

const newContent = `<h3 style="margin-top: 3rem; margin-bottom: 0.75rem;">Geometry: Area and Perimeter of Shapes</h3>

<p style="font-size: 0.9rem; line-height: 1.6; margin: 0.5rem 0 1rem 0;">Understanding area and perimeter is essential for the ACT Math section. Nearly every geometry question involves calculating one or both of these measurements. This lesson will teach you all the formulas you need, when to use them, and how to avoid common mistakes.</p>

<h3 style="margin-top: 3rem; margin-bottom: 0.75rem;">Area vs. Perimeter: What's the Difference?</h3>

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

<h4 style="margin-top: 2rem; margin-bottom: 0.5rem;">Key Variables</h4>

<ul style="margin: 1rem 0; padding-left: 1.5rem; line-height: 2;">
  <li style="margin: 0.4rem 0;"><strong>l</strong> = length (the longer side)</li>
  <li style="margin: 0.4rem 0;"><strong>w</strong> = width (the shorter side)</li>
</ul>

<h4 style="margin-top: 2rem; margin-bottom: 0.5rem;">Formulas</h4>

<ul style="margin: 1rem 0; padding-left: 1.5rem; line-height: 2;">
  <li style="margin: 0.4rem 0;"><strong>Perimeter:</strong> P = 2l + 2w  <em>or</em>  P = 2(l + w)</li>
  <li style="margin: 0.4rem 0;"><strong>Area:</strong> A = l × w</li>
</ul>

<h4 style="margin-top: 2rem; margin-bottom: 0.5rem;">Example: Rectangle Problem</h4>

<p style="font-size: 0.9rem; line-height: 1.6; margin: 0.5rem 0 1rem 0;"><strong>Problem:</strong> A rectangle has a length of 12 inches and a width of 5 inches. Find the perimeter and area.</p>

<p style="font-size: 0.9rem; line-height: 1.6; margin: 0.5rem 0 1rem 0;"><strong>Solution:</strong></p>

<ul style="margin: 1rem 0; padding-left: 1.5rem; line-height: 2;">
  <li style="margin: 0.4rem 0;"><strong>Perimeter:</strong> P = 2(12) + 2(5) = 24 + 10 = <strong>34 inches</strong></li>
  <li style="margin: 0.4rem 0;"><strong>Area:</strong> A = 12 × 5 = <strong>60 square inches</strong></li>
</ul>

<h3 style="margin-top: 3rem; margin-bottom: 0.75rem;">Squares</h3>

<p style="font-size: 0.9rem; line-height: 1.6; margin: 0.5rem 0 1rem 0;">A square is a special type of rectangle where <strong>all four sides are equal</strong>. This simplifies the formulas significantly.</p>

<h4 style="margin-top: 2rem; margin-bottom: 0.5rem;">Key Variable</h4>

<ul style="margin: 1rem 0; padding-left: 1.5rem; line-height: 2;">
  <li style="margin: 0.4rem 0;"><strong>s</strong> = side length (all sides are equal)</li>
</ul>

<h4 style="margin-top: 2rem; margin-bottom: 0.5rem;">Formulas</h4>

<ul style="margin: 1rem 0; padding-left: 1.5rem; line-height: 2;">
  <li style="margin: 0.4rem 0;"><strong>Perimeter:</strong> P = 4s</li>
  <li style="margin: 0.4rem 0;"><strong>Area:</strong> A = s²</li>
</ul>

<h4 style="margin-top: 2rem; margin-bottom: 0.5rem;">Example: Square Problem</h4>

<p style="font-size: 0.9rem; line-height: 1.6; margin: 0.5rem 0 1rem 0;"><strong>Problem:</strong> A square has a side length of 9 cm. Find the perimeter and area.</p>

<p style="font-size: 0.9rem; line-height: 1.6; margin: 0.5rem 0 1rem 0;"><strong>Solution:</strong></p>

<ul style="margin: 1rem 0; padding-left: 1.5rem; line-height: 2;">
  <li style="margin: 0.4rem 0;"><strong>Perimeter:</strong> P = 4(9) = <strong>36 cm</strong></li>
  <li style="margin: 0.4rem 0;"><strong>Area:</strong> A = 9² = <strong>81 cm²</strong></li>
</ul>

<h3 style="margin-top: 3rem; margin-bottom: 0.75rem;">Triangles</h3>

<p style="font-size: 0.9rem; line-height: 1.6; margin: 0.5rem 0 1rem 0;">The triangle area formula works for <strong>all types of triangles</strong>—right, acute, obtuse, equilateral, isosceles, and scalene.</p>

<h4 style="margin-top: 2rem; margin-bottom: 0.5rem;">Key Variables</h4>

<ul style="margin: 1rem 0; padding-left: 1.5rem; line-height: 2;">
  <li style="margin: 0.4rem 0;"><strong>b</strong> = base (any side can be the base)</li>
  <li style="margin: 0.4rem 0;"><strong>h</strong> = height (must be <strong style="color: #2563eb; text-decoration: underline;">perpendicular</strong> to the base)</li>
  <li style="margin: 0.4rem 0;"><strong>a, b, c</strong> = the three side lengths (for perimeter)</li>
</ul>

<h4 style="margin-top: 2rem; margin-bottom: 0.5rem;">Formulas</h4>

<ul style="margin: 1rem 0; padding-left: 1.5rem; line-height: 2;">
  <li style="margin: 0.4rem 0;"><strong>Perimeter:</strong> P = a + b + c  (add all three sides)</li>
  <li style="margin: 0.4rem 0;"><strong>Area:</strong> A = ½bh  <em>or</em>  A = (b × h) / 2</li>
</ul>

<h4 style="margin-top: 2rem; margin-bottom: 0.5rem;">⚠️ Critical Point: The Height Must Be Perpendicular</h4>

<p style="font-size: 0.9rem; line-height: 1.6; margin: 0.5rem 0 1rem 0;">This is the <strong>most common mistake</strong> students make with triangle area:</p>

<ul style="margin: 1rem 0; padding-left: 1.5rem; line-height: 2;">
  <li style="margin: 0.4rem 0;">The height MUST form a <strong>90° angle</strong> with the base</li>
  <li style="margin: 0.4rem 0;">The height is NOT always a side of the triangle</li>
  <li style="margin: 0.4rem 0;">In a right triangle, one leg can be the base and the other leg is the height</li>
  <li style="margin: 0.4rem 0;">In obtuse or acute triangles, the height might be drawn inside or outside the triangle</li>
</ul>

<h4 style="margin-top: 2rem; margin-bottom: 0.5rem;">Example: Triangle Problem</h4>

<p style="font-size: 0.9rem; line-height: 1.6; margin: 0.5rem 0 1rem 0;"><strong>Problem:</strong> A triangle has a base of 10 feet and a height of 6 feet. What is its area?</p>

<p style="font-size: 0.9rem; line-height: 1.6; margin: 0.5rem 0 1rem 0;"><strong>Solution:</strong></p>

<ul style="margin: 1rem 0; padding-left: 1.5rem; line-height: 2;">
  <li style="margin: 0.4rem 0;"><strong>Formula:</strong> A = ½bh</li>
  <li style="margin: 0.4rem 0;"><strong>Substitute:</strong> A = ½(10)(6)</li>
  <li style="margin: 0.4rem 0;"><strong>Calculate:</strong> A = ½(60) = <strong>30 square feet</strong></li>
</ul>

<h3 style="margin-top: 3rem; margin-bottom: 0.75rem;">Circles</h3>

<p style="font-size: 0.9rem; line-height: 1.6; margin: 0.5rem 0 1rem 0;">Circles are unique because they don't have sides like other shapes. Instead, we use the <strong style="color: #2563eb; text-decoration: underline;">radius</strong> to calculate both circumference and area.</p>

<h4 style="margin-top: 2rem; margin-bottom: 0.5rem;">Key Variables</h4>

<ul style="margin: 1rem 0; padding-left: 1.5rem; line-height: 2;">
  <li style="margin: 0.4rem 0;"><strong>r</strong> = radius (distance from center to edge)</li>
  <li style="margin: 0.4rem 0;"><strong>d</strong> = diameter (distance across the circle through the center) = 2r</li>
  <li style="margin: 0.4rem 0;"><strong>π</strong> = pi ≈ 3.14159 (use the π button on your calculator)</li>
</ul>

<h4 style="margin-top: 2rem; margin-bottom: 0.5rem;">Formulas</h4>

<ul style="margin: 1rem 0; padding-left: 1.5rem; line-height: 2;">
  <li style="margin: 0.4rem 0;"><strong>Circumference:</strong> C = 2πr  <em>or</em>  C = πd</li>
  <li style="margin: 0.4rem 0;"><strong>Area:</strong> A = πr²</li>
</ul>

<p style="font-size: 0.9rem; line-height: 1.6; margin: 0.5rem 0 1rem 0;"><strong>Note:</strong> Circumference is the circle's version of perimeter—it's the distance around the circle.</p>

<h4 style="margin-top: 2rem; margin-bottom: 0.5rem;">Common Mistake: Diameter vs. Radius</h4>

<ul style="margin: 1rem 0; padding-left: 1.5rem; line-height: 2;">
  <li style="margin: 0.4rem 0;">If the problem gives you the <strong>diameter</strong>, divide by 2 to get the radius first!</li>
  <li style="margin: 0.4rem 0;">Both formulas require the <strong>radius</strong>, not the diameter</li>
  <li style="margin: 0.4rem 0;">Example: If diameter = 10, then radius = 5</li>
</ul>

<h4 style="margin-top: 2rem; margin-bottom: 0.5rem;">Example: Circle Problem</h4>

<p style="font-size: 0.9rem; line-height: 1.6; margin: 0.5rem 0 1rem 0;"><strong>Problem:</strong> A circle has a radius of 7 inches. Find the circumference and area.</p>

<p style="font-size: 0.9rem; line-height: 1.6; margin: 0.5rem 0 1rem 0;"><strong>Solution:</strong></p>

<ul style="margin: 1rem 0; padding-left: 1.5rem; line-height: 2;">
  <li style="margin: 0.4rem 0;"><strong>Circumference:</strong> C = 2π(7) = 14π ≈ <strong>43.98 inches</strong></li>
  <li style="margin: 0.4rem 0;"><strong>Area:</strong> A = π(7)² = 49π ≈ <strong>153.94 square inches</strong></li>
</ul>

<p style="font-size: 0.9rem; line-height: 1.6; margin: 0.5rem 0 1rem 0;"><strong>ACT Tip:</strong> Answer choices are often given in terms of π (like "49π"), so you don't always need to multiply out the decimal.</p>

<h3 style="margin-top: 3rem; margin-bottom: 0.75rem;">Trapezoids</h3>

<p style="font-size: 0.9rem; line-height: 1.6; margin: 0.5rem 0 1rem 0;">A trapezoid is a four-sided shape with exactly <strong>two parallel sides</strong> called bases. These parallel sides usually have different lengths.</p>

<h4 style="margin-top: 2rem; margin-bottom: 0.5rem;">Key Variables</h4>

<ul style="margin: 1rem 0; padding-left: 1.5rem; line-height: 2;">
  <li style="margin: 0.4rem 0;"><strong>b₁</strong> = first base (one of the parallel sides)</li>
  <li style="margin: 0.4rem 0;"><strong>b₂</strong> = second base (the other parallel side)</li>
  <li style="margin: 0.4rem 0;"><strong>h</strong> = height (perpendicular distance between the two bases)</li>
</ul>

<h4 style="margin-top: 2rem; margin-bottom: 0.5rem;">Formula</h4>

<ul style="margin: 1rem 0; padding-left: 1.5rem; line-height: 2;">
  <li style="margin: 0.4rem 0;"><strong>Area:</strong> A = ½h(b₁ + b₂)  <em>or</em>  A = h(b₁ + b₂) / 2</li>
  <li style="margin: 0.4rem 0;"><strong>Think of it as:</strong> Average the two bases, then multiply by height</li>
</ul>

<h4 style="margin-top: 2rem; margin-bottom: 0.5rem;">Example: Trapezoid Problem</h4>

<p style="font-size: 0.9rem; line-height: 1.6; margin: 0.5rem 0 1rem 0;"><strong>Problem:</strong> A trapezoid has bases of length 8 cm and 12 cm, and a height of 5 cm. What is its area?</p>

<p style="font-size: 0.9rem; line-height: 1.6; margin: 0.5rem 0 1rem 0;"><strong>Solution:</strong></p>

<ul style="margin: 1rem 0; padding-left: 1.5rem; line-height: 2;">
  <li style="margin: 0.4rem 0;"><strong>Formula:</strong> A = ½h(b₁ + b₂)</li>
  <li style="margin: 0.4rem 0;"><strong>Substitute:</strong> A = ½(5)(8 + 12)</li>
  <li style="margin: 0.4rem 0;"><strong>Simplify:</strong> A = ½(5)(20)</li>
  <li style="margin: 0.4rem 0;"><strong>Calculate:</strong> A = ½(100) = <strong>50 cm²</strong></li>
</ul>

<h3 style="margin-top: 3rem; margin-bottom: 0.75rem;">Parallelograms</h3>

<p style="font-size: 0.9rem; line-height: 1.6; margin: 0.5rem 0 1rem 0;">A parallelogram is a four-sided shape where <strong>both pairs of opposite sides are parallel</strong>. Think of it as a "pushed over" rectangle.</p>

<h4 style="margin-top: 2rem; margin-bottom: 0.5rem;">Key Variables</h4>

<ul style="margin: 1rem 0; padding-left: 1.5rem; line-height: 2;">
  <li style="margin: 0.4rem 0;"><strong>b</strong> = base (the bottom side)</li>
  <li style="margin: 0.4rem 0;"><strong>h</strong> = height (perpendicular distance from base to top)</li>
</ul>

<h4 style="margin-top: 2rem; margin-bottom: 0.5rem;">Formula</h4>

<ul style="margin: 1rem 0; padding-left: 1.5rem; line-height: 2;">
  <li style="margin: 0.4rem 0;"><strong>Area:</strong> A = b × h</li>
  <li style="margin: 0.4rem 0;"><strong>Note:</strong> Just like triangles, the height must be perpendicular to the base!</li>
</ul>

<h3 style="margin-top: 3rem; margin-bottom: 0.75rem;">Formula Summary Chart</h3>

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

<h4 style="margin-top: 2rem; margin-bottom: 0.5rem;">Parallelogram</h4>
<ul style="margin: 0.5rem 0; padding-left: 1.5rem; line-height: 2;">
  <li style="margin: 0.2rem 0;">Area: A = b × h</li>
</ul>

<h3 style="margin-top: 3rem; margin-bottom: 0.75rem;">ACT-Style Practice Question</h3>

<p style="font-size: 0.9rem; line-height: 1.6; margin: 0.5rem 0 1rem 0;"><strong>Problem:</strong> A rectangular garden has a length of 15 meters and a width of 8 meters. If you want to put a fence around the entire garden, how many meters of fencing do you need?</p>

<p style="font-size: 0.9rem; line-height: 1.6; margin: 0.5rem 0 1rem 0;">
  <strong>A.</strong> 23 m<br>
  <strong>B.</strong> 30 m<br>
  <strong>C.</strong> 46 m<br>
  <strong>D.</strong> 60 m<br>
  <strong>E.</strong> 120 m
</p>

<p style="font-size: 0.9rem; line-height: 1.6; margin: 0.5rem 0 1rem 0;"><strong>Solution:</strong></p>

<ul style="margin: 1rem 0; padding-left: 1.5rem; line-height: 2;">
  <li style="margin: 0.4rem 0;"><strong>Step 1:</strong> Identify what we're looking for. "Fence around" means we need the <strong>perimeter</strong>, not area</li>
  <li style="margin: 0.4rem 0;"><strong>Step 2:</strong> Use the rectangle perimeter formula: P = 2l + 2w</li>
  <li style="margin: 0.4rem 0;"><strong>Step 3:</strong> Substitute: P = 2(15) + 2(8)</li>
  <li style="margin: 0.4rem 0;"><strong>Step 4:</strong> Calculate: P = 30 + 16 = 46 meters</li>
</ul>

<p style="font-size: 0.9rem; line-height: 1.6; margin: 0.5rem 0 1rem 0;"><strong>Answer: C (46 m)</strong></p>

<p style="font-size: 0.9rem; line-height: 1.6; margin: 0.5rem 0 1rem 0;"><strong>Common trap:</strong> Answer choice A (23 m) is what you'd get if you only added length + width once. Answer choice E (120 m) is the area, not the perimeter!</p>

<h3 style="margin-top: 3rem; margin-bottom: 0.75rem;">Problem-Solving Strategy</h3>

<p style="font-size: 0.9rem; line-height: 1.6; margin: 0.5rem 0 1rem 0;">Follow this systematic approach for every area and perimeter question:</p>

<ol style="margin: 1rem 0; padding-left: 1.5rem; line-height: 2;">
  <li style="margin: 0.4rem 0;"><strong>Read carefully:</strong> Are they asking for area or perimeter/circumference?</li>
  <li style="margin: 0.4rem 0;"><strong>Identify the shape:</strong> Rectangle, triangle, circle, trapezoid, etc.</li>
  <li style="margin: 0.4rem 0;"><strong>Write the formula:</strong> Don't skip this step—it prevents careless errors</li>
  <li style="margin: 0.4rem 0;"><strong>Identify the given values:</strong> What measurements does the problem provide?</li>
  <li style="margin: 0.4rem 0;"><strong>Substitute and calculate:</strong> Plug in the numbers and solve</li>
  <li style="margin: 0.4rem 0;"><strong>Check units:</strong> Perimeter uses linear units, area uses square units</li>
  <li style="margin: 0.4rem 0;"><strong>Verify your answer:</strong> Does it make sense? Is it reasonable?</li>
</ol>

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
    <li style="margin: 0.4rem 0;"><strong>Perimeter</strong> measures the distance around (linear units); <strong>Area</strong> measures space inside (square units)</li>
    <li style="margin: 0.4rem 0;"><strong>Rectangle:</strong> P = 2l + 2w, A = l × w</li>
    <li style="margin: 0.4rem 0;"><strong>Square:</strong> P = 4s, A = s²</li>
    <li style="margin: 0.4rem 0;"><strong>Triangle:</strong> A = ½bh (height must be perpendicular to base)</li>
    <li style="margin: 0.4rem 0;"><strong>Circle:</strong> C = 2πr, A = πr² (use radius, not diameter)</li>
    <li style="margin: 0.4rem 0;"><strong>Trapezoid:</strong> A = ½h(b₁ + b₂)</li>
    <li style="margin: 0.4rem 0;">Always write the formula first before substituting values</li>
    <li style="margin: 0.4rem 0;">Check that your answer has the correct units (linear for perimeter, square for area)</li>
  </ul>
</div>`;

async function rewriteLesson() {
  console.log('╔══════════════════════════════════════════════════════════╗');
  console.log('║     REWRITING GEOMETRY-SHAPES LESSON                    ║');
  console.log('║     Clean Lumisource Style - No Visuals                 ║');
  console.log('╚══════════════════════════════════════════════════════════╝\n');

  console.log('✓ Removed all SVG diagrams (6 diagrams removed)');
  console.log('✓ Removed tables and complex formatting');
  console.log('✓ Rewrote with bullet-point structure');
  console.log('✓ Added blue underlined keywords strategically');
  console.log('✓ Organized with logical progression:');
  console.log('    1. Area vs. Perimeter (key difference)');
  console.log('    2. Rectangles (formulas & examples)');
  console.log('    3. Squares (special rectangle)');
  console.log('    4. Triangles (with perpendicular height warning)');
  console.log('    5. Circles (radius vs diameter)');
  console.log('    6. Trapezoids');
  console.log('    7. Parallelograms');
  console.log('    8. Formula summary chart');
  console.log('    9. ACT practice question');
  console.log('    10. Problem-solving strategy');
  console.log('    11. Common mistakes');
  console.log('✓ Added green takeaway box at end\n');

  const { error } = await supabase
    .from('lessons')
    .update({
      content: newContent,
      updated_at: new Date().toISOString()
    })
    .eq('lesson_key', 'geometry-shapes');

  if (error) {
    console.error('❌ Error:', error.message);
    return false;
  }

  console.log('✅ Successfully rewrote geometry-shapes lesson!');
  console.log('\nNew lesson features:');
  console.log('  ✓ Clean, organized bullet-point format');
  console.log('  ✓ No visual diagrams (text-only)');
  console.log('  ✓ Logical progression from basics to advanced');
  console.log('  ✓ Strategic use of blue keywords');
  console.log('  ✓ Multiple examples with step-by-step solutions');
  console.log('  ✓ Comprehensive formula summary');
  console.log('  ✓ ACT-specific strategies and common mistakes');
  console.log('  ✓ Green takeaway box summarizing key concepts');

  return true;
}

rewriteLesson().catch(console.error);
