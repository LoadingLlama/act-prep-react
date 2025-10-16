-- ============================================================
-- INSERT LESSON 2.2: Areas, Volumes & Triangles
-- Run this in Supabase SQL Editor or via psql
-- ============================================================

-- Step 1: Insert Lesson Metadata
INSERT INTO lesson_metadata (id, lesson_key, title, subject, category, difficulty_level, duration_minutes, order_index, is_published)
VALUES (
  'a1b2c3d4-e5f6-7890-abcd-ef1234567890'::uuid,
  '2.2',
  'Topic 2.2 - Areas, Volumes & Triangles',
  'math',
  'Geometry',
  2,
  45,
  22,
  true
);

-- Step 2: Insert Lesson Section
INSERT INTO lesson_sections (id, lesson_id, section_key, title, section_type, order_index)
VALUES (
  'b2c3d4e5-f6a7-8901-bcde-f12345678901'::uuid,
  'a1b2c3d4-e5f6-7890-abcd-ef1234567890'::uuid,
  '2.2-main',
  'Main Content',
  'content',
  0
);

-- Step 3: Insert Section Content (Main Lesson HTML)
INSERT INTO section_content (id, section_id, content_type, content, order_index)
VALUES (
  'c3d4e5f6-a7b8-9012-cdef-123456789012'::uuid,
  'b2c3d4e5-f6a7-8901-bcde-f12345678901'::uuid,
  'html',
  '<p style="font-size: 16px; line-height: 1.7; margin: 0.5rem 0 1rem 0;">Understanding areas, volumes, and triangles is absolutely essential for ACT Math success. These concepts appear in 8-12 questions on every test, making them some of the highest-yield topics you can master. This lesson provides comprehensive coverage of every formula, concept, and technique you need to tackle these questions with confidence.</p>

<h3 style="margin-top: 5rem; margin-bottom: 0.75rem; font-weight: 700;">1. Area Formulas - Complete Coverage</h3>

<p style="font-size: 16px; line-height: 1.7; margin: 0.5rem 0 1rem 0;">The ACT tests area formulas constantly. You must know these formulas cold and understand when to apply each one.</p>

<h4 style="margin-top: 2rem; margin-bottom: 0.3rem; font-weight: 400;">Rectangle Area</h4>

<ul style="margin: 0.3rem 0 0.5rem 0; padding-left: 1.5rem; line-height: 1.5;">
  <li style="margin: 0.15rem 0;"><strong style="color: #2563eb; font-weight: 600; text-decoration: underline;">Formula:</strong> A = lw (length × width)
    <ul style="margin: 0.15rem 0 0.15rem 0; padding-left: 1.5rem;">
      <li>Length and width are the two perpendicular sides</li>
      <li>Units: If length is in feet and width is in feet, area is in square feet (ft²)</li>
      <li>Example: A rectangle with length 8 ft and width 5 ft has area A = 8 × 5 = 40 ft²</li>
    </ul>
  </li>
  <li style="margin: 0.15rem 0;"><strong>Why it works:</strong> A rectangle can be divided into rows and columns of unit squares. The number of rows is the length, and the number of columns is the width. Multiply to get total squares.</li>
</ul>

<h4 style="margin-top: 2rem; margin-bottom: 0.3rem; font-weight: 400;">Square Area</h4>

<ul style="margin: 0.3rem 0 0.5rem 0; padding-left: 1.5rem; line-height: 1.5;">
  <li style="margin: 0.15rem 0;"><strong style="color: #2563eb; font-weight: 600; text-decoration: underline;">Formula:</strong> A = s² (side squared)
    <ul style="margin: 0.15rem 0 0.15rem 0; padding-left: 1.5rem;">
      <li>A square is a special rectangle where length = width</li>
      <li>Example: A square with side 6 cm has area A = 6² = 36 cm²</li>
    </ul>
  </li>
</ul>

<h4 style="margin-top: 2rem; margin-bottom: 0.3rem; font-weight: 400;">Triangle Area</h4>

<ul style="margin: 0.3rem 0 0.5rem 0; padding-left: 1.5rem; line-height: 1.5;">
  <li style="margin: 0.15rem 0;"><strong style="color: #2563eb; font-weight: 600; text-decoration: underline;">Formula:</strong> A = ½bh (half of base × height)
    <ul style="margin: 0.15rem 0 0.15rem 0; padding-left: 1.5rem;">
      <li>Base: Any side of the triangle</li>
      <li>Height: Perpendicular distance from base to opposite vertex</li>
      <li><strong>Critical:</strong> Height must be perpendicular (at 90°) to the base</li>
      <li>Example: Triangle with base 10 in and height 6 in has area A = ½(10)(6) = 30 in²</li>
    </ul>
  </li>
  <li style="margin: 0.15rem 0;"><strong>Why it works:</strong> Every triangle is exactly half of a rectangle. If you draw a rectangle around a triangle using its base and height, the triangle takes up exactly half the rectangle''s area.</li>
</ul>

<h4 style="margin-top: 2rem; margin-bottom: 0.3rem; font-weight: 400;">Circle Area</h4>

<ul style="margin: 0.3rem 0 0.5rem 0; padding-left: 1.5rem; line-height: 1.5;">
  <li style="margin: 0.15rem 0;"><strong style="color: #2563eb; font-weight: 600; text-decoration: underline;">Formula:</strong> A = πr² (pi × radius squared)
    <ul style="margin: 0.15rem 0 0.15rem 0; padding-left: 1.5rem;">
      <li>Radius (r): Distance from center to edge</li>
      <li>Diameter (d): Distance across circle through center, d = 2r</li>
      <li>Use π ≈ 3.14 or use π button on calculator</li>
      <li>Example: Circle with radius 4 m has area A = π(4)² = 16π ≈ 50.27 m²</li>
    </ul>
  </li>
  <li style="margin: 0.15rem 0;"><strong>Common mistake:</strong> Using diameter instead of radius. If given diameter, divide by 2 first!</li>
</ul>

<h4 style="margin-top: 2rem; margin-bottom: 0.3rem; font-weight: 400;">Trapezoid Area</h4>

<ul style="margin: 0.3rem 0 0.5rem 0; padding-left: 1.5rem; line-height: 1.5;">
  <li style="margin: 0.15rem 0;"><strong style="color: #2563eb; font-weight: 600; text-decoration: underline;">Formula:</strong> A = ½(b₁ + b₂)h (average of two bases × height)
    <ul style="margin: 0.15rem 0 0.15rem 0; padding-left: 1.5rem;">
      <li>b₁ and b₂: The two parallel sides (bases)</li>
      <li>h: Perpendicular distance between the parallel sides</li>
      <li>Example: Trapezoid with bases 8 and 12, height 5 has area A = ½(8 + 12)(5) = ½(20)(5) = 50</li>
    </ul>
  </li>
  <li style="margin: 0.15rem 0;"><strong>Why it works:</strong> The average of the two bases gives you the width of an equivalent rectangle with the same area.</li>
</ul>

<h4 style="margin-top: 2rem; margin-bottom: 0.3rem; font-weight: 400;">Parallelogram Area</h4>

<ul style="margin: 0.3rem 0 0.5rem 0; padding-left: 1.5rem; line-height: 1.5;">
  <li style="margin: 0.15rem 0;"><strong style="color: #2563eb; font-weight: 600; text-decoration: underline;">Formula:</strong> A = bh (base × height)
    <ul style="margin: 0.15rem 0 0.15rem 0; padding-left: 1.5rem;">
      <li>Base: Length of the bottom side</li>
      <li>Height: Perpendicular distance from base to opposite side</li>
      <li><strong>Not</strong> the slanted side length!</li>
      <li>Example: Parallelogram with base 9 and height 4 has area A = 9 × 4 = 36</li>
    </ul>
  </li>
</ul>

<h4 style="margin: 0 0 1rem 0; padding-left: 0.75rem; border-left: 4px solid #b91c1c; color: #000000; font-weight: 700;">Example 1: Multiple Area Formulas</h4>

<p style="font-size: 16px; line-height: 1.7; margin: 0.5rem 0 1rem 0;">A rectangular garden measures 15 feet by 8 feet. A circular fountain with a radius of 2 feet is placed in the center. What is the area of the garden not occupied by the fountain, to the nearest square foot?</p>

<p style="margin: 0.3rem 0 0.5rem 0;">
<span style="font-family: ''Times New Roman'', Times, Georgia, serif;">A. 107</span><br>
<span style="font-family: ''Times New Roman'', Times, Georgia, serif;">B. 113</span><br>
<span style="font-family: ''Times New Roman'', Times, Georgia, serif;">C. 120</span><br>
<span style="font-family: ''Times New Roman'', Times, Georgia, serif;">D. 133</span><br>
<span style="font-family: ''Times New Roman'', Times, Georgia, serif;">E. 140</span>
</p>

<p style="margin: 1.5rem 0 0.75rem 0;"><strong>Solution:</strong></p>

<ul style="margin: 0.3rem 0 0.5rem 0; padding-left: 1.5rem; line-height: 1.5;">
  <li style="margin: 0.15rem 0;">Step 1: Find area of rectangular garden: A = lw = 15 × 8 = 120 ft²</li>
  <li style="margin: 0.15rem 0;">Step 2: Find area of circular fountain: A = πr² = π(2)² = 4π ≈ 12.57 ft²</li>
  <li style="margin: 0.15rem 0;">Step 3: Subtract: 120 − 12.57 ≈ 107.43 ≈ 107 ft²</li>
</ul>

<p style="font-size: 16px; line-height: 1.7; margin: 0.5rem 0 1rem 0;">Answer: A</p>

<h3 style="margin-top: 5rem; margin-bottom: 0.75rem; font-weight: 700;">2. Perimeter and Circumference</h3>

<p style="font-size: 16px; line-height: 1.7; margin: 0.5rem 0 1rem 0;">While area measures the space inside a shape, <strong style="color: #2563eb; font-weight: 600; text-decoration: underline;">perimeter</strong> measures the distance around the outside. The ACT tests this frequently, especially in word problems.</p>

<h4 style="margin-top: 2rem; margin-bottom: 0.3rem; font-weight: 400;">Rectangle Perimeter</h4>

<ul style="margin: 0.3rem 0 0.5rem 0; padding-left: 1.5rem; line-height: 1.5;">
  <li style="margin: 0.15rem 0;"><strong style="color: #2563eb; font-weight: 600; text-decoration: underline;">Formula:</strong> P = 2l + 2w
    <ul style="margin: 0.15rem 0 0.15rem 0; padding-left: 1.5rem;">
      <li>Add all four sides: two lengths and two widths</li>
      <li>Example: Rectangle 10 by 6 has perimeter P = 2(10) + 2(6) = 20 + 12 = 32</li>
    </ul>
  </li>
</ul>

<h4 style="margin-top: 2rem; margin-bottom: 0.3rem; font-weight: 400;">Circle Circumference</h4>

<ul style="margin: 0.3rem 0 0.5rem 0; padding-left: 1.5rem; line-height: 1.5;">
  <li style="margin: 0.15rem 0;"><strong style="color: #2563eb; font-weight: 600; text-decoration: underline;">Formula:</strong> C = 2πr or C = πd
    <ul style="margin: 0.15rem 0 0.15rem 0; padding-left: 1.5rem;">
      <li>Both formulas are equivalent since diameter = 2 × radius</li>
      <li>Example: Circle with radius 5 has circumference C = 2π(5) = 10π ≈ 31.42</li>
    </ul>
  </li>
</ul>

<h3 style="margin-top: 5rem; margin-bottom: 0.75rem; font-weight: 700;">3. Volume Formulas - Complete Coverage</h3>

<p style="font-size: 16px; line-height: 1.7; margin: 0.5rem 0 1rem 0;">Volume measures three-dimensional space. The ACT tests these formulas regularly, often in real-world contexts like storage tanks or containers.</p>

<h4 style="margin-top: 2rem; margin-bottom: 0.3rem; font-weight: 400;">Rectangular Prism (Box)</h4>

<ul style="margin: 0.3rem 0 0.5rem 0; padding-left: 1.5rem; line-height: 1.5;">
  <li style="margin: 0.15rem 0;"><strong style="color: #2563eb; font-weight: 600; text-decoration: underline;">Formula:</strong> V = lwh (length × width × height)
    <ul style="margin: 0.15rem 0 0.15rem 0; padding-left: 1.5rem;">
      <li>Units: Cubic units (ft³, cm³, m³)</li>
      <li>Example: Box measuring 5 ft by 3 ft by 2 ft has volume V = 5 × 3 × 2 = 30 ft³</li>
    </ul>
  </li>
</ul>

<h4 style="margin-top: 2rem; margin-bottom: 0.3rem; font-weight: 400;">Cube</h4>

<ul style="margin: 0.3rem 0 0.5rem 0; padding-left: 1.5rem; line-height: 1.5;">
  <li style="margin: 0.15rem 0;"><strong style="color: #2563eb; font-weight: 600; text-decoration: underline;">Formula:</strong> V = s³ (side cubed)
    <ul style="margin: 0.15rem 0 0.15rem 0; padding-left: 1.5rem;">
      <li>All sides equal length</li>
      <li>Example: Cube with side 4 cm has volume V = 4³ = 64 cm³</li>
    </ul>
  </li>
</ul>

<h4 style="margin-top: 2rem; margin-bottom: 0.3rem; font-weight: 400;">Cylinder</h4>

<ul style="margin: 0.3rem 0 0.5rem 0; padding-left: 1.5rem; line-height: 1.5;">
  <li style="margin: 0.15rem 0;"><strong style="color: #2563eb; font-weight: 600; text-decoration: underline;">Formula:</strong> V = πr²h (area of base × height)
    <ul style="margin: 0.15rem 0 0.15rem 0; padding-left: 1.5rem;">
      <li>r = radius of circular base</li>
      <li>h = height of cylinder</li>
      <li>Example: Cylinder with radius 3 and height 10 has volume V = π(3)²(10) = 90π ≈ 282.74</li>
    </ul>
  </li>
  <li style="margin: 0.15rem 0;"><strong>Why it works:</strong> A cylinder is a stack of circles. The area of each circle is πr², and you stack h units high.</li>
</ul>

<h4 style="margin-top: 2rem; margin-bottom: 0.3rem; font-weight: 400;">Sphere</h4>

<ul style="margin: 0.3rem 0 0.5rem 0; padding-left: 1.5rem; line-height: 1.5;">
  <li style="margin: 0.15rem 0;"><strong style="color: #2563eb; font-weight: 600; text-decoration: underline;">Formula:</strong> V = (4/3)πr³
    <ul style="margin: 0.15rem 0 0.15rem 0; padding-left: 1.5rem;">
      <li>Given on ACT formula sheet</li>
      <li>Example: Sphere with radius 3 has volume V = (4/3)π(3)³ = (4/3)π(27) = 36π ≈ 113.10</li>
    </ul>
  </li>
</ul>

<h4 style="margin-top: 2rem; margin-bottom: 0.3rem; font-weight: 400;">Cone</h4>

<ul style="margin: 0.3rem 0 0.5rem 0; padding-left: 1.5rem; line-height: 1.5;">
  <li style="margin: 0.15rem 0;"><strong style="color: #2563eb; font-weight: 600; text-decoration: underline;">Formula:</strong> V = (1/3)πr²h
    <ul style="margin: 0.15rem 0 0.15rem 0; padding-left: 1.5rem;">
      <li>Exactly 1/3 the volume of a cylinder with same base and height</li>
      <li>Example: Cone with radius 4 and height 9 has volume V = (1/3)π(4)²(9) = 48π ≈ 150.80</li>
    </ul>
  </li>
  <li style="margin: 0.15rem 0;"><strong>Why 1/3?</strong> Three identical cones can perfectly fill a cylinder with the same base and height.</li>
</ul>

<h4 style="margin-top: 2rem; margin-bottom: 0.3rem; font-weight: 400;">Pyramid</h4>

<ul style="margin: 0.3rem 0 0.5rem 0; padding-left: 1.5rem; line-height: 1.5;">
  <li style="margin: 0.15rem 0;"><strong style="color: #2563eb; font-weight: 600; text-decoration: underline;">Formula:</strong> V = (1/3)Bh where B = area of base
    <ul style="margin: 0.15rem 0 0.15rem 0; padding-left: 1.5rem;">
      <li>Works for any pyramid (square base, rectangular base, etc.)</li>
      <li>Find base area first, then multiply by (1/3) × height</li>
      <li>Example: Square pyramid with base side 6 and height 9 has B = 6² = 36, so V = (1/3)(36)(9) = 108</li>
    </ul>
  </li>
</ul>

<h4 style="margin: 0 0 1rem 0; padding-left: 0.75rem; border-left: 4px solid #b91c1c; color: #000000; font-weight: 700;">Example 2: Volume Application</h4>

<p style="font-size: 16px; line-height: 1.7; margin: 0.5rem 0 1rem 0;">A cylindrical water tank has a radius of 5 feet and a height of 12 feet. How many cubic feet of water can the tank hold? (Use π ≈ 3.14)</p>

<p style="margin: 0.3rem 0 0.5rem 0;">
<span style="font-family: ''Times New Roman'', Times, Georgia, serif;">A. 300</span><br>
<span style="font-family: ''Times New Roman'', Times, Georgia, serif;">B. 753</span><br>
<span style="font-family: ''Times New Roman'', Times, Georgia, serif;">C. 942</span><br>
<span style="font-family: ''Times New Roman'', Times, Georgia, serif;">D. 1,884</span><br>
<span style="font-family: ''Times New Roman'', Times, Georgia, serif;">E. 2,260</span>
</p>

<p style="margin: 1.5rem 0 0.75rem 0;"><strong>Solution:</strong></p>

<ul style="margin: 0.3rem 0 0.5rem 0; padding-left: 1.5rem; line-height: 1.5;">
  <li style="margin: 0.15rem 0;">Step 1: Use cylinder volume formula: V = πr²h</li>
  <li style="margin: 0.15rem 0;">Step 2: Substitute: V = (3.14)(5)²(12)</li>
  <li style="margin: 0.15rem 0;">Step 3: Calculate: V = (3.14)(25)(12) = (3.14)(300) = 942 ft³</li>
</ul>

<p style="font-size: 16px; line-height: 1.7; margin: 0.5rem 0 1rem 0;">Answer: C</p>

<h3 style="margin-top: 5rem; margin-bottom: 0.75rem; font-weight: 700;">4. Unit Conversions for Area and Volume</h3>

<p style="font-size: 16px; line-height: 1.7; margin: 0.5rem 0 1rem 0;">The ACT loves to test whether you understand how units work with area and volume. This is a common source of errors.</p>

<h4 style="margin-top: 2rem; margin-bottom: 0.3rem; font-weight: 400;">Area Unit Conversions</h4>

<ul style="margin: 0.3rem 0 0.5rem 0; padding-left: 1.5rem; line-height: 1.5;">
  <li style="margin: 0.15rem 0;"><strong style="color: #2563eb; font-weight: 600; text-decoration: underline;">Key Concept:</strong> Square the linear conversion factor
    <ul style="margin: 0.15rem 0 0.15rem 0; padding-left: 1.5rem;">
      <li>1 foot = 12 inches, so 1 ft² = (12 in)² = 144 in²</li>
      <li>Example: Convert 3 ft² to in²: 3 × 144 = 432 in²</li>
    </ul>
  </li>
  <li style="margin: 0.15rem 0;"><strong>Why square?</strong> Area is two-dimensional. If you double the length and double the width, you quadruple (2²) the area.</li>
</ul>

<h4 style="margin-top: 2rem; margin-bottom: 0.3rem; font-weight: 400;">Volume Unit Conversions</h4>

<ul style="margin: 0.3rem 0 0.5rem 0; padding-left: 1.5rem; line-height: 1.5;">
  <li style="margin: 0.15rem 0;"><strong style="color: #2563eb; font-weight: 600; text-decoration: underline;">Key Concept:</strong> Cube the linear conversion factor
    <ul style="margin: 0.15rem 0 0.15rem 0; padding-left: 1.5rem;">
      <li>1 foot = 12 inches, so 1 ft³ = (12 in)³ = 1,728 in³</li>
      <li>Example: Convert 2 ft³ to in³: 2 × 1,728 = 3,456 in³</li>
    </ul>
  </li>
  <li style="margin: 0.15rem 0;"><strong>Why cube?</strong> Volume is three-dimensional. All three dimensions are multiplied by the conversion factor.</li>
</ul>

<h3 style="margin-top: 5rem; margin-bottom: 0.75rem; font-weight: 700;">5. Right Triangles and Pythagorean Theorem</h3>

<p style="font-size: 16px; line-height: 1.7; margin: 0.5rem 0 1rem 0;">The <strong style="color: #2563eb; font-weight: 600; text-decoration: underline;">Pythagorean Theorem</strong> is one of the most important formulas on the ACT. It appears in 3-5 questions on every test.</p>

<h4 style="margin-top: 2rem; margin-bottom: 0.3rem; font-weight: 400;">The Pythagorean Theorem</h4>

<ul style="margin: 0.3rem 0 0.5rem 0; padding-left: 1.5rem; line-height: 1.5;">
  <li style="margin: 0.15rem 0;"><strong style="color: #2563eb; font-weight: 600; text-decoration: underline;">Formula:</strong> a² + b² = c²
    <ul style="margin: 0.15rem 0 0.15rem 0; padding-left: 1.5rem;">
      <li>a and b are the legs (the two sides that form the right angle)</li>
      <li>c is the hypotenuse (the longest side, opposite the right angle)</li>
      <li>Only works for RIGHT triangles (one 90° angle)</li>
    </ul>
  </li>
  <li style="margin: 0.15rem 0;"><strong>Finding the hypotenuse:</strong> If legs are 3 and 4, then c² = 3² + 4² = 9 + 16 = 25, so c = 5</li>
  <li style="margin: 0.15rem 0;"><strong>Finding a leg:</strong> If hypotenuse is 13 and one leg is 5, then 5² + b² = 13², so 25 + b² = 169, so b² = 144, so b = 12</li>
</ul>

<h4 style="margin-top: 2rem; margin-bottom: 0.3rem; font-weight: 400;">Pythagorean Triples</h4>

<ul style="margin: 0.3rem 0 0.5rem 0; padding-left: 1.5rem; line-height: 1.5;">
  <li style="margin: 0.15rem 0;"><strong style="color: #2563eb; font-weight: 600; text-decoration: underline;">Common triples</strong> (memorize these!):
    <ul style="margin: 0.15rem 0 0.15rem 0; padding-left: 1.5rem;">
      <li>3-4-5 (most common)</li>
      <li>5-12-13</li>
      <li>8-15-17</li>
      <li>7-24-25</li>
    </ul>
  </li>
  <li style="margin: 0.15rem 0;"><strong style="color: #2563eb; font-weight: 600; text-decoration: underline;">Multiples also work:</strong>
    <ul style="margin: 0.15rem 0 0.15rem 0; padding-left: 1.5rem;">
      <li>6-8-10 (multiply 3-4-5 by 2)</li>
      <li>9-12-15 (multiply 3-4-5 by 3)</li>
      <li>10-24-26 (multiply 5-12-13 by 2)</li>
    </ul>
  </li>
  <li style="margin: 0.15rem 0;"><strong>ACT Strategy:</strong> Always check if the triangle matches a Pythagorean triple before doing calculations!</li>
</ul>

<h4 style="margin: 0 0 1rem 0; padding-left: 0.75rem; border-left: 4px solid #b91c1c; color: #000000; font-weight: 700;">Example 3: Pythagorean Theorem</h4>

<p style="font-size: 16px; line-height: 1.7; margin: 0.5rem 0 1rem 0;">A right triangle has legs measuring 9 cm and 12 cm. What is the length of the hypotenuse in centimeters?</p>

<p style="margin: 0.3rem 0 0.5rem 0;">
<span style="font-family: ''Times New Roman'', Times, Georgia, serif;">A. 10</span><br>
<span style="font-family: ''Times New Roman'', Times, Georgia, serif;">B. 13</span><br>
<span style="font-family: ''Times New Roman'', Times, Georgia, serif;">C. 15</span><br>
<span style="font-family: ''Times New Roman'', Times, Georgia, serif;">D. 18</span><br>
<span style="font-family: ''Times New Roman'', Times, Georgia, serif;">E. 21</span>
</p>

<p style="margin: 1.5rem 0 0.75rem 0;"><strong>Solution:</strong></p>

<ul style="margin: 0.3rem 0 0.5rem 0; padding-left: 1.5rem; line-height: 1.5;">
  <li style="margin: 0.15rem 0;">Method 1 (Recognition): 9-12-? is a multiple of 3-4-5 (multiply by 3), so hypotenuse = 5 × 3 = 15</li>
  <li style="margin: 0.15rem 0;">Method 2 (Formula): 9² + 12² = c² → 81 + 144 = c² → 225 = c² → c = 15</li>
</ul>

<p style="font-size: 16px; line-height: 1.7; margin: 0.5rem 0 1rem 0;">Answer: C</p>

<h3 style="margin-top: 5rem; margin-bottom: 0.75rem; font-weight: 700;">6. Special Right Triangles</h3>

<p style="font-size: 16px; line-height: 1.7; margin: 0.5rem 0 1rem 0;">Two special triangles appear constantly on the ACT. Memorizing their side ratios will save you significant time.</p>

<h4 style="margin-top: 2rem; margin-bottom: 0.3rem; font-weight: 400;">45-45-90 Triangle</h4>

<ul style="margin: 0.3rem 0 0.5rem 0; padding-left: 1.5rem; line-height: 1.5;">
  <li style="margin: 0.15rem 0;"><strong style="color: #2563eb; font-weight: 600; text-decoration: underline;">Side ratio:</strong> x : x : x√2
    <ul style="margin: 0.15rem 0 0.15rem 0; padding-left: 1.5rem;">
      <li>Two legs are equal (both length x)</li>
      <li>Hypotenuse is x√2</li>
      <li>Example: If legs are 5, hypotenuse is 5√2 ≈ 7.07</li>
    </ul>
  </li>
  <li style="margin: 0.15rem 0;"><strong>Where it comes from:</strong> Cut a square diagonally. The diagonal is √2 times the side of the square.</li>
</ul>

<h4 style="margin-top: 2rem; margin-bottom: 0.3rem; font-weight: 400;">30-60-90 Triangle</h4>

<ul style="margin: 0.3rem 0 0.5rem 0; padding-left: 1.5rem; line-height: 1.5;">
  <li style="margin: 0.15rem 0;"><strong style="color: #2563eb; font-weight: 600; text-decoration: underline;">Side ratio:</strong> x : x√3 : 2x
    <ul style="margin: 0.15rem 0 0.15rem 0; padding-left: 1.5rem;">
      <li>Short leg (opposite 30°): x</li>
      <li>Long leg (opposite 60°): x√3</li>
      <li>Hypotenuse (opposite 90°): 2x</li>
      <li>Example: If short leg is 3, long leg is 3√3 ≈ 5.20 and hypotenuse is 6</li>
    </ul>
  </li>
  <li style="margin: 0.15rem 0;"><strong>Where it comes from:</strong> Cut an equilateral triangle in half vertically.</li>
</ul>

<h4 style="margin: 0 0 1rem 0; padding-left: 0.75rem; border-left: 4px solid #b91c1c; color: #000000; font-weight: 700;">Example 4: Special Right Triangle</h4>

<p style="font-size: 16px; line-height: 1.7; margin: 0.5rem 0 1rem 0;">In a 30-60-90 triangle, the shortest side measures 6 inches. What is the length of the hypotenuse?</p>

<p style="margin: 0.3rem 0 0.5rem 0;">
<span style="font-family: ''Times New Roman'', Times, Georgia, serif;">A. 6√2</span><br>
<span style="font-family: ''Times New Roman'', Times, Georgia, serif;">B. 6√3</span><br>
<span style="font-family: ''Times New Roman'', Times, Georgia, serif;">C. 9</span><br>
<span style="font-family: ''Times New Roman'', Times, Georgia, serif;">D. 12</span><br>
<span style="font-family: ''Times New Roman'', Times, Georgia, serif;">E. 18</span>
</p>

<p style="margin: 1.5rem 0 0.75rem 0;"><strong>Solution:</strong></p>

<ul style="margin: 0.3rem 0 0.5rem 0; padding-left: 1.5rem; line-height: 1.5;">
  <li style="margin: 0.15rem 0;">Ratio is x : x√3 : 2x</li>
  <li style="margin: 0.15rem 0;">Short side = x = 6</li>
  <li style="margin: 0.15rem 0;">Hypotenuse = 2x = 2(6) = 12</li>
</ul>

<p style="font-size: 16px; line-height: 1.7; margin: 0.5rem 0 1rem 0;">Answer: D</p>

<h3 style="margin-top: 5rem; margin-bottom: 0.75rem; font-weight: 700;">7. Similar Triangles</h3>

<p style="font-size: 16px; line-height: 1.7; margin: 0.5rem 0 1rem 0;"><strong style="color: #2563eb; font-weight: 600; text-decoration: underline;">Similar triangles</strong> have the same shape but different sizes. Their corresponding sides are proportional.</p>

<ul style="margin: 0.3rem 0 0.5rem 0; padding-left: 1.5rem; line-height: 1.5;">
  <li style="margin: 0.15rem 0;">Corresponding angles are equal</li>
  <li style="margin: 0.15rem 0;">Corresponding sides are in the same ratio (scale factor)</li>
  <li style="margin: 0.15rem 0;">Set up proportions to solve: a/b = c/d where a and c are corresponding sides</li>
  <li style="margin: 0.15rem 0;">Example: If triangle 1 has sides 3-4-5 and similar triangle 2 has smallest side 9, then scale factor is 3, so sides are 9-12-15</li>
</ul>

<h3 style="margin-top: 5rem; margin-bottom: 0.75rem; font-weight: 700;">8. Other Important Triangle Properties</h3>

<h4 style="margin-top: 2rem; margin-bottom: 0.3rem; font-weight: 400;">Equilateral Triangles</h4>

<ul style="margin: 0.3rem 0 0.5rem 0; padding-left: 1.5rem; line-height: 1.5;">
  <li style="margin: 0.15rem 0;">All three sides equal length</li>
  <li style="margin: 0.15rem 0;">All three angles are 60°</li>
  <li style="margin: 0.15rem 0;">Area formula: A = (s²√3)/4 where s = side length</li>
  <li style="margin: 0.15rem 0;">Height formula: h = (s√3)/2</li>
</ul>

<h4 style="margin-top: 2rem; margin-bottom: 0.3rem; font-weight: 400;">Isosceles Triangles</h4>

<ul style="margin: 0.3rem 0 0.5rem 0; padding-left: 1.5rem; line-height: 1.5;">
  <li style="margin: 0.15rem 0;">Two sides equal (the legs)</li>
  <li style="margin: 0.15rem 0;">Two angles equal (the base angles, opposite the equal sides)</li>
  <li style="margin: 0.15rem 0;">If vertex angle (between equal sides) is known, base angles = (180° − vertex angle)/2</li>
</ul>

<h4 style="margin-top: 2rem; margin-bottom: 0.3rem; font-weight: 400;">Triangle Inequality Theorem</h4>

<ul style="margin: 0.3rem 0 0.5rem 0; padding-left: 1.5rem; line-height: 1.5;">
  <li style="margin: 0.15rem 0;"><strong style="color: #2563eb; font-weight: 600; text-decoration: underline;">Rule:</strong> Sum of any two sides > third side
    <ul style="margin: 0.15rem 0 0.15rem 0; padding-left: 1.5rem;">
      <li>Can sides 3, 5, and 10 form a triangle? No, because 3 + 5 = 8, which is not greater than 10</li>
      <li>Can sides 4, 5, and 6 form a triangle? Yes, because 4 + 5 > 6, and all other pairs also work</li>
    </ul>
  </li>
</ul>

<h4 style="margin-top: 2rem; margin-bottom: 0.3rem; font-weight: 400;">Angle Sum Property</h4>

<ul style="margin: 0.3rem 0 0.5rem 0; padding-left: 1.5rem; line-height: 1.5;">
  <li style="margin: 0.15rem 0;">Interior angles of any triangle sum to 180°</li>
  <li style="margin: 0.15rem 0;">If two angles are 50° and 70°, third angle = 180° − 50° − 70° = 60°</li>
</ul>

<p style="height: 1px; margin: 0; padding: 0;"></p>

<h3 style="margin-top: 5rem; margin-bottom: 0.75rem; font-weight: 700; visibility: hidden; height: 0; margin: 0; padding: 0; overflow: hidden;">.</h3>

<h3 style="color: #2e7d32; font-size: 1.4rem; font-weight: 700; margin: 3rem 0 1.5rem 0;">Key Takeaways</h3>

<ul style="list-style: none; padding: 0; margin: 0;">
  <li style="margin-bottom: 0.8rem; color: #2e7d32; font-size: 16px; line-height: 1.6;">
    <span style="color: #4caf50; font-weight: bold; margin-right: 0.5rem;">✓</span>Area formulas: Rectangle (lw), Square (s²), Triangle (½bh), Circle (πr²), Trapezoid (½(b₁+b₂)h), Parallelogram (bh)
  </li>
  <li style="margin-bottom: 0.8rem; color: #2e7d32; font-size: 16px; line-height: 1.6;">
    <span style="color: #4caf50; font-weight: bold; margin-right: 0.5rem;">✓</span>Volume formulas: Box (lwh), Cube (s³), Cylinder (πr²h), Sphere ((4/3)πr³), Cone ((1/3)πr²h), Pyramid ((1/3)Bh)
  </li>
  <li style="margin-bottom: 0.8rem; color: #2e7d32; font-size: 16px; line-height: 1.6;">
    <span style="color: #4caf50; font-weight: bold; margin-right: 0.5rem;">✓</span>Area unit conversions square the linear factor; volume conversions cube the linear factor
  </li>
  <li style="margin-bottom: 0.8rem; color: #2e7d32; font-size: 16px; line-height: 1.6;">
    <span style="color: #4caf50; font-weight: bold; margin-right: 0.5rem;">✓</span>Pythagorean Theorem (a² + b² = c²) only applies to right triangles
  </li>
  <li style="margin-bottom: 0.8rem; color: #2e7d32; font-size: 16px; line-height: 1.6;">
    <span style="color: #4caf50; font-weight: bold; margin-right: 0.5rem;">✓</span>Memorize Pythagorean triples: 3-4-5, 5-12-13, 8-15-17, 7-24-25 and their multiples
  </li>
  <li style="margin-bottom: 0.8rem; color: #2e7d32; font-size: 16px; line-height: 1.6;">
    <span style="color: #4caf50; font-weight: bold; margin-right: 0.5rem;">✓</span>Special right triangles: 45-45-90 (x:x:x√2) and 30-60-90 (x:x√3:2x)
  </li>
  <li style="margin-bottom: 0.8rem; color: #2e7d32; font-size: 16px; line-height: 1.6;">
    <span style="color: #4caf50; font-weight: bold; margin-right: 0.5rem;">✓</span>Similar triangles have proportional sides and equal corresponding angles
  </li>
</ul>',
  0
);

-- Step 4: Insert Quiz
INSERT INTO quizzes (id, lesson_id, title, intro, quiz_type, position, is_required)
VALUES (
  'd4e5f6a7-b8c9-0123-defg-234567890123'::uuid,
  'a1b2c3d4-e5f6-7890-abcd-ef1234567890'::uuid,
  'Mastery Check: Areas, Volumes & Triangles',
  'Test your understanding of areas, volumes, and triangle concepts with these 10 ACT-style questions.',
  'practice',
  1,
  true
);

-- Step 5: Insert Quiz Questions and Options
-- Question 1
INSERT INTO quiz_questions (id, quiz_id, question_text, question_order)
VALUES ('e5f6a7b8-c9d0-1234-efgh-345678901234'::uuid, 'd4e5f6a7-b8c9-0123-defg-234567890123'::uuid,
'A rectangle has a length of 12 feet and a width of 7 feet. What is the area of the rectangle in square feet?', 1);

INSERT INTO quiz_options (question_id, option_text, is_correct, explanation, option_order) VALUES
('e5f6a7b8-c9d0-1234-efgh-345678901234'::uuid, '38', false, null, 1),
('e5f6a7b8-c9d0-1234-efgh-345678901234'::uuid, '68', false, null, 2),
('e5f6a7b8-c9d0-1234-efgh-345678901234'::uuid, '84', true, 'Area of rectangle = length × width = 12 × 7 = 84 ft²', 3),
('e5f6a7b8-c9d0-1234-efgh-345678901234'::uuid, '91', false, null, 4),
('e5f6a7b8-c9d0-1234-efgh-345678901234'::uuid, '144', false, null, 5);

-- Question 2
INSERT INTO quiz_questions (id, quiz_id, question_text, question_order)
VALUES ('f6a7b8c9-d0e1-2345-fghi-456789012345'::uuid, 'd4e5f6a7-b8c9-0123-defg-234567890123'::uuid,
'A triangle has a base of 14 cm and a height of 9 cm. What is the area of the triangle in square centimeters?', 2);

INSERT INTO quiz_options (question_id, option_text, is_correct, explanation, option_order) VALUES
('f6a7b8c9-d0e1-2345-fghi-456789012345'::uuid, '46', false, null, 1),
('f6a7b8c9-d0e1-2345-fghi-456789012345'::uuid, '56', false, null, 2),
('f6a7b8c9-d0e1-2345-fghi-456789012345'::uuid, '63', true, 'Area of triangle = ½ × base × height = ½ × 14 × 9 = 63 cm²', 3),
('f6a7b8c9-d0e1-2345-fghi-456789012345'::uuid, '126', false, null, 4),
('f6a7b8c9-d0e1-2345-fghi-456789012345'::uuid, '252', false, null, 5);

-- Question 3
INSERT INTO quiz_questions (id, quiz_id, question_text, question_order)
VALUES ('a7b8c9d0-e1f2-3456-ghij-567890123456'::uuid, 'd4e5f6a7-b8c9-0123-defg-234567890123'::uuid,
'A circle has a radius of 6 inches. What is the area of the circle in square inches? (Use π ≈ 3.14)', 3);

INSERT INTO quiz_options (question_id, option_text, is_correct, explanation, option_order) VALUES
('a7b8c9d0-e1f2-3456-ghij-567890123456'::uuid, '18.84', false, null, 1),
('a7b8c9d0-e1f2-3456-ghij-567890123456'::uuid, '37.68', false, null, 2),
('a7b8c9d0-e1f2-3456-ghij-567890123456'::uuid, '75.36', false, null, 3),
('a7b8c9d0-e1f2-3456-ghij-567890123456'::uuid, '113.04', true, 'Area = πr² = 3.14 × 6² = 3.14 × 36 = 113.04 in²', 4),
('a7b8c9d0-e1f2-3456-ghij-567890123456'::uuid, '226.08', false, null, 5);

-- Question 4
INSERT INTO quiz_questions (id, quiz_id, question_text, question_order)
VALUES ('b8c9d0e1-f2a3-4567-hijk-678901234567'::uuid, 'd4e5f6a7-b8c9-0123-defg-234567890123'::uuid,
'A rectangular box has dimensions 4 ft by 5 ft by 3 ft. What is the volume of the box in cubic feet?', 4);

INSERT INTO quiz_options (question_id, option_text, is_correct, explanation, option_order) VALUES
('b8c9d0e1-f2a3-4567-hijk-678901234567'::uuid, '12', false, null, 1),
('b8c9d0e1-f2a3-4567-hijk-678901234567'::uuid, '20', false, null, 2),
('b8c9d0e1-f2a3-4567-hijk-678901234567'::uuid, '48', false, null, 3),
('b8c9d0e1-f2a3-4567-hijk-678901234567'::uuid, '60', true, 'Volume = length × width × height = 4 × 5 × 3 = 60 ft³', 4),
('b8c9d0e1-f2a3-4567-hijk-678901234567'::uuid, '120', false, null, 5);

-- Question 5
INSERT INTO quiz_questions (id, quiz_id, question_text, question_order)
VALUES ('c9d0e1f2-a3b4-5678-ijkl-789012345678'::uuid, 'd4e5f6a7-b8c9-0123-defg-234567890123'::uuid,
'A cylinder has a radius of 4 cm and a height of 10 cm. What is the volume of the cylinder in cubic centimeters? (Use π ≈ 3.14)', 5);

INSERT INTO quiz_options (question_id, option_text, is_correct, explanation, option_order) VALUES
('c9d0e1f2-a3b4-5678-ijkl-789012345678'::uuid, '125.6', false, null, 1),
('c9d0e1f2-a3b4-5678-ijkl-789012345678'::uuid, '251.2', false, null, 2),
('c9d0e1f2-a3b4-5678-ijkl-789012345678'::uuid, '376.8', false, null, 3),
('c9d0e1f2-a3b4-5678-ijkl-789012345678'::uuid, '502.4', true, 'Volume = πr²h = 3.14 × 4² × 10 = 3.14 × 16 × 10 = 502.4 cm³', 4),
('c9d0e1f2-a3b4-5678-ijkl-789012345678'::uuid, '628.0', false, null, 5);

-- Question 6
INSERT INTO quiz_questions (id, quiz_id, question_text, question_order)
VALUES ('d0e1f2a3-b4c5-6789-jklm-890123456789'::uuid, 'd4e5f6a7-b8c9-0123-defg-234567890123'::uuid,
'A right triangle has legs of 8 meters and 15 meters. What is the length of the hypotenuse in meters?', 6);

INSERT INTO quiz_options (question_id, option_text, is_correct, explanation, option_order) VALUES
('d0e1f2a3-b4c5-6789-jklm-890123456789'::uuid, '17', true, 'Using Pythagorean theorem: 8² + 15² = c² → 64 + 225 = 289 → c = 17. This is the 8-15-17 Pythagorean triple.', 1),
('d0e1f2a3-b4c5-6789-jklm-890123456789'::uuid, '19', false, null, 2),
('d0e1f2a3-b4c5-6789-jklm-890123456789'::uuid, '21', false, null, 3),
('d0e1f2a3-b4c5-6789-jklm-890123456789'::uuid, '23', false, null, 4),
('d0e1f2a3-b4c5-6789-jklm-890123456789'::uuid, '25', false, null, 5);

-- Question 7
INSERT INTO quiz_questions (id, quiz_id, question_text, question_order)
VALUES ('e1f2a3b4-c5d6-7890-klmn-901234567890'::uuid, 'd4e5f6a7-b8c9-0123-defg-234567890123'::uuid,
'In a 45-45-90 triangle, each leg measures 8 inches. What is the length of the hypotenuse in inches?', 7);

INSERT INTO quiz_options (question_id, option_text, is_correct, explanation, option_order) VALUES
('e1f2a3b4-c5d6-7890-klmn-901234567890'::uuid, '8', false, null, 1),
('e1f2a3b4-c5d6-7890-klmn-901234567890'::uuid, '8√2', true, 'In a 45-45-90 triangle, the side ratio is x:x:x√2. With legs of 8, hypotenuse = 8√2.', 2),
('e1f2a3b4-c5d6-7890-klmn-901234567890'::uuid, '12', false, null, 3),
('e1f2a3b4-c5d6-7890-klmn-901234567890'::uuid, '16', false, null, 4),
('e1f2a3b4-c5d6-7890-klmn-901234567890'::uuid, '16√2', false, null, 5);

-- Question 8
INSERT INTO quiz_questions (id, quiz_id, question_text, question_order)
VALUES ('f2a3b4c5-d6e7-8901-lmno-012345678901'::uuid, 'd4e5f6a7-b8c9-0123-defg-234567890123'::uuid,
'In a 30-60-90 triangle, the hypotenuse measures 20 cm. What is the length of the shortest side in centimeters?', 8);

INSERT INTO quiz_options (question_id, option_text, is_correct, explanation, option_order) VALUES
('f2a3b4c5-d6e7-8901-lmno-012345678901'::uuid, '5', false, null, 1),
('f2a3b4c5-d6e7-8901-lmno-012345678901'::uuid, '10', true, 'In a 30-60-90 triangle, ratio is x:x√3:2x. If hypotenuse = 2x = 20, then x = 10.', 2),
('f2a3b4c5-d6e7-8901-lmno-012345678901'::uuid, '10√3', false, null, 3),
('f2a3b4c5-d6e7-8901-lmno-012345678901'::uuid, '15', false, null, 4),
('f2a3b4c5-d6e7-8901-lmno-012345678901'::uuid, '20√3', false, null, 5);

-- Question 9
INSERT INTO quiz_questions (id, quiz_id, question_text, question_order)
VALUES ('a3b4c5d6-e7f8-9012-mnop-123456789012'::uuid, 'd4e5f6a7-b8c9-0123-defg-234567890123'::uuid,
'How many square inches are in 2 square feet?', 9);

INSERT INTO quiz_options (question_id, option_text, is_correct, explanation, option_order) VALUES
('a3b4c5d6-e7f8-9012-mnop-123456789012'::uuid, '24', false, null, 1),
('a3b4c5d6-e7f8-9012-mnop-123456789012'::uuid, '48', false, null, 2),
('a3b4c5d6-e7f8-9012-mnop-123456789012'::uuid, '144', false, null, 3),
('a3b4c5d6-e7f8-9012-mnop-123456789012'::uuid, '288', true, '1 ft = 12 in, so 1 ft² = (12 in)² = 144 in². Therefore, 2 ft² = 2 × 144 = 288 in².', 4),
('a3b4c5d6-e7f8-9012-mnop-123456789012'::uuid, '576', false, null, 5);

-- Question 10
INSERT INTO quiz_questions (id, quiz_id, question_text, question_order)
VALUES ('b4c5d6e7-f8a9-0123-nopq-234567890123'::uuid, 'd4e5f6a7-b8c9-0123-defg-234567890123'::uuid,
'A cone has a radius of 6 feet and a height of 8 feet. What is the volume of the cone in cubic feet? (Use π ≈ 3.14)', 10);

INSERT INTO quiz_options (question_id, option_text, is_correct, explanation, option_order) VALUES
('b4c5d6e7-f8a9-0123-nopq-234567890123'::uuid, '100.48', false, null, 1),
('b4c5d6e7-f8a9-0123-nopq-234567890123'::uuid, '150.72', false, null, 2),
('b4c5d6e7-f8a9-0123-nopq-234567890123'::uuid, '226.08', false, null, 3),
('b4c5d6e7-f8a9-0123-nopq-234567890123'::uuid, '301.44', true, 'Volume = (1/3)πr²h = (1/3) × 3.14 × 6² × 8 = (1/3) × 3.14 × 36 × 8 = 301.44 ft³', 4),
('b4c5d6e7-f8a9-0123-nopq-234567890123'::uuid, '904.32', false, null, 5);

-- Verify the insertion
SELECT 'Lesson 2.2 inserted successfully!' AS status;
