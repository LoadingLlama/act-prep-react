-- ============================================================
-- INSERT LESSON 2.3: Lines
-- Comprehensive lesson on coordinate geometry and lines
-- ============================================================

-- Step 1: Insert Lesson Metadata
INSERT INTO lesson_metadata (id, lesson_key, title, subject, category, difficulty_level, duration_minutes, order_index, is_published)
VALUES (
  'a2b3c4d5-e6f7-8901-bcde-f23456789012'::uuid,
  '2.3',
  'Topic 2.3 - Lines',
  'math',
  'Geometry',
  2,
  40,
  23,
  true
);

-- Step 2: Insert Lesson Section
INSERT INTO lesson_sections (id, lesson_id, section_key, title, section_type, order_index)
VALUES (
  'b3c4d5e6-f7a8-9012-cdef-123456789023'::uuid,
  'a2b3c4d5-e6f7-8901-bcde-f23456789012'::uuid,
  '2.3-main',
  'Main Content',
  'content',
  0
);

-- Step 3: Insert Section Content (Main Lesson HTML)
INSERT INTO section_content (id, section_id, content_type, content, order_index)
VALUES (
  'c4d5e6f7-a8b9-0123-defg-234567890123'::uuid,
  'b3c4d5e6-f7a8-9012-cdef-123456789023'::uuid,
  'html',
  '<p style="font-size: 16px; line-height: 1.7; margin: 0.5rem 0 1rem 0;">Lines and coordinate geometry are fundamental to ACT Math success. These concepts appear in 6-10 questions on every test, covering everything from <strong style="color: #2563eb; font-weight: 600; text-decoration: underline;">slope</strong> calculations to writing equations of lines. This comprehensive lesson will teach you every formula, technique, and strategy you need to master line questions on the ACT.</p>

<h3 style="margin-top: 5rem; margin-bottom: 0.75rem; font-weight: 700;">1. Understanding Slope</h3>

<p style="font-size: 16px; line-height: 1.7; margin: 0.5rem 0 1rem 0;"><strong style="color: #2563eb; font-weight: 600; text-decoration: underline;">Slope</strong> measures how steep a line is - specifically, how much the line rises (or falls) for every unit it moves horizontally. The ACT tests slope in multiple ways, so understanding it deeply is critical.</p>

<h4 style="margin-top: 2rem; margin-bottom: 0.3rem; font-weight: 400;">The Slope Formula</h4>

<ul style="margin: 0.3rem 0 0.5rem 0; padding-left: 1.5rem; line-height: 1.5;">
  <li style="margin: 0.15rem 0;"><strong style="color: #2563eb; font-weight: 600; text-decoration: underline;">Formula:</strong> m = (y₂ − y₁)/(x₂ − x₁)
    <ul style="margin: 0.15rem 0 0.15rem 0; padding-left: 1.5rem;">
      <li>m represents slope</li>
      <li>(x₁, y₁) and (x₂, y₂) are two points on the line</li>
      <li>Read as "rise over run" or "change in y over change in x"</li>
      <li>Order doesn''t matter as long as you''re consistent</li>
    </ul>
  </li>
  <li style="margin: 0.15rem 0;"><strong>Why it works:</strong> Slope is the ratio of vertical change to horizontal change. If you go up 3 units while moving right 2 units, the slope is 3/2.</li>
</ul>

<h4 style="margin-top: 2rem; margin-bottom: 0.3rem; font-weight: 400;">Positive and Negative Slope</h4>

<ul style="margin: 0.3rem 0 0.5rem 0; padding-left: 1.5rem; line-height: 1.5;">
  <li style="margin: 0.15rem 0;"><strong style="color: #2563eb; font-weight: 600; text-decoration: underline;">Positive slope:</strong> Line rises from left to right
    <ul style="margin: 0.15rem 0 0.15rem 0; padding-left: 1.5rem;">
      <li>As x increases, y increases</li>
      <li>Example: m = 2, m = 1/3, m = 5</li>
    </ul>
  </li>
  <li style="margin: 0.15rem 0;"><strong style="color: #2563eb; font-weight: 600; text-decoration: underline;">Negative slope:</strong> Line falls from left to right
    <ul style="margin: 0.15rem 0 0.15rem 0; padding-left: 1.5rem;">
      <li>As x increases, y decreases</li>
      <li>Example: m = −2, m = −1/4, m = −3</li>
    </ul>
  </li>
  <li style="margin: 0.15rem 0;"><strong style="color: #2563eb; font-weight: 600; text-decoration: underline;">Zero slope:</strong> Horizontal line (perfectly flat)
    <ul style="margin: 0.15rem 0 0.15rem 0; padding-left: 1.5rem;">
      <li>No vertical change (rise = 0)</li>
      <li>Equation form: y = c (constant)</li>
      <li>Example: y = 5 has slope m = 0</li>
    </ul>
  </li>
  <li style="margin: 0.15rem 0;"><strong style="color: #2563eb; font-weight: 600; text-decoration: underline;">Undefined slope:</strong> Vertical line (perfectly vertical)
    <ul style="margin: 0.15rem 0 0.15rem 0; padding-left: 1.5rem;">
      <li>No horizontal change (run = 0), so division by zero</li>
      <li>Equation form: x = c (constant)</li>
      <li>Example: x = 3 has undefined slope</li>
    </ul>
  </li>
</ul>

<h4 style="margin: 0 0 1rem 0; padding-left: 0.75rem; border-left: 4px solid #b91c1c; color: #000000; font-weight: 700;">Example 1: Finding Slope from Two Points</h4>

<p style="font-size: 16px; line-height: 1.7; margin: 0.5rem 0 1rem 0;">What is the slope of the line passing through the points (3, 8) and (7, 14)?</p>

<p style="margin: 0.3rem 0 0.5rem 0;">
<span style="font-family: ''Times New Roman'', Times, Georgia, serif;">A. <sup>2</sup>⁄<sub>3</sub></span><br>
<span style="font-family: ''Times New Roman'', Times, Georgia, serif;">B. 1</span><br>
<span style="font-family: ''Times New Roman'', Times, Georgia, serif;">C. <sup>3</sup>⁄<sub>2</sub></span><br>
<span style="font-family: ''Times New Roman'', Times, Georgia, serif;">D. 2</span><br>
<span style="font-family: ''Times New Roman'', Times, Georgia, serif;">E. 3</span>
</p>

<p style="margin: 1.5rem 0 0.75rem 0;"><strong>Solution:</strong></p>

<ul style="margin: 0.3rem 0 0.5rem 0; padding-left: 1.5rem; line-height: 1.5;">
  <li style="margin: 0.15rem 0;">Step 1: Identify the two points: (x₁, y₁) = (3, 8) and (x₂, y₂) = (7, 14)</li>
  <li style="margin: 0.15rem 0;">Step 2: Apply slope formula: m = (y₂ − y₁)/(x₂ − x₁)</li>
  <li style="margin: 0.15rem 0;">Step 3: Substitute: m = (14 − 8)/(7 − 3) = 6/4 = 3/2</li>
</ul>

<p style="font-size: 16px; line-height: 1.7; margin: 0.5rem 0 1rem 0;">Answer: C</p>

<h3 style="margin-top: 5rem; margin-bottom: 0.75rem; font-weight: 700;">2. Parallel and Perpendicular Lines</h3>

<p style="font-size: 16px; line-height: 1.7; margin: 0.5rem 0 1rem 0;">The ACT frequently tests your understanding of the relationship between slopes of parallel and perpendicular lines.</p>

<h4 style="margin-top: 2rem; margin-bottom: 0.3rem; font-weight: 400;">Parallel Lines</h4>

<ul style="margin: 0.3rem 0 0.5rem 0; padding-left: 1.5rem; line-height: 1.5;">
  <li style="margin: 0.15rem 0;"><strong style="color: #2563eb; font-weight: 600; text-decoration: underline;">Definition:</strong> Lines that never intersect (same direction)
    <ul style="margin: 0.15rem 0 0.15rem 0; padding-left: 1.5rem;">
      <li><strong>Key Rule:</strong> Parallel lines have equal slopes: m₁ = m₂</li>
      <li>Example: Lines with slopes 3 and 3 are parallel</li>
      <li>Example: y = 2x + 5 and y = 2x − 3 are parallel (both have slope 2)</li>
    </ul>
  </li>
</ul>

<h4 style="margin-top: 2rem; margin-bottom: 0.3rem; font-weight: 400;">Perpendicular Lines</h4>

<ul style="margin: 0.3rem 0 0.5rem 0; padding-left: 1.5rem; line-height: 1.5;">
  <li style="margin: 0.15rem 0;"><strong style="color: #2563eb; font-weight: 600; text-decoration: underline;">Definition:</strong> Lines that intersect at 90° (right angle)
    <ul style="margin: 0.15rem 0 0.15rem 0; padding-left: 1.5rem;">
      <li><strong>Key Rule:</strong> Slopes are negative reciprocals: m₁ × m₂ = −1</li>
      <li>If m₁ = a/b, then m₂ = −b/a</li>
      <li>Example: Lines with slopes 2 and −1/2 are perpendicular (2 × (−1/2) = −1)</li>
      <li>Example: Lines with slopes 3/4 and −4/3 are perpendicular</li>
    </ul>
  </li>
  <li style="margin: 0.15rem 0;"><strong>Why this works:</strong> Perpendicular lines create a right angle, which requires this specific slope relationship.</li>
  <li style="margin: 0.15rem 0;"><strong>Special cases:</strong>
    <ul style="margin: 0.15rem 0 0.15rem 0; padding-left: 1.5rem;">
      <li>Horizontal line (slope 0) is perpendicular to vertical line (undefined slope)</li>
      <li>x = 5 and y = 3 are perpendicular</li>
    </ul>
  </li>
</ul>

<h4 style="margin: 0 0 1rem 0; padding-left: 0.75rem; border-left: 4px solid #b91c1c; color: #000000; font-weight: 700;">Example 2: Perpendicular Lines</h4>

<p style="font-size: 16px; line-height: 1.7; margin: 0.5rem 0 1rem 0;">A line has a slope of 5. What is the slope of a line perpendicular to it?</p>

<p style="margin: 0.3rem 0 0.5rem 0;">
<span style="font-family: ''Times New Roman'', Times, Georgia, serif;">A. −5</span><br>
<span style="font-family: ''Times New Roman'', Times, Georgia, serif;">B. −<sup>1</sup>⁄<sub>5</sub></span><br>
<span style="font-family: ''Times New Roman'', Times, Georgia, serif;">C. <sup>1</sup>⁄<sub>5</sub></span><br>
<span style="font-family: ''Times New Roman'', Times, Georgia, serif;">D. 5</span><br>
<span style="font-family: ''Times New Roman'', Times, Georgia, serif;">E. 10</span>
</p>

<p style="margin: 1.5rem 0 0.75rem 0;"><strong>Solution:</strong></p>

<ul style="margin: 0.3rem 0 0.5rem 0; padding-left: 1.5rem; line-height: 1.5;">
  <li style="margin: 0.15rem 0;">Perpendicular lines have slopes that are negative reciprocals</li>
  <li style="margin: 0.15rem 0;">Original slope: m₁ = 5 = 5/1</li>
  <li style="margin: 0.15rem 0;">Perpendicular slope: m₂ = −1/5</li>
</ul>

<p style="font-size: 16px; line-height: 1.7; margin: 0.5rem 0 1rem 0;">Answer: B</p>

<h3 style="margin-top: 5rem; margin-bottom: 0.75rem; font-weight: 700;">3. Slope-Intercept Form</h3>

<p style="font-size: 16px; line-height: 1.7; margin: 0.5rem 0 1rem 0;">The <strong style="color: #2563eb; font-weight: 600; text-decoration: underline;">slope-intercept form</strong> is the most commonly used equation form on the ACT. You must know it thoroughly.</p>

<h4 style="margin-top: 2rem; margin-bottom: 0.3rem; font-weight: 400;">The Form: y = mx + b</h4>

<ul style="margin: 0.3rem 0 0.5rem 0; padding-left: 1.5rem; line-height: 1.5;">
  <li style="margin: 0.15rem 0;"><strong>m</strong> = slope (how steep the line is)</li>
  <li style="margin: 0.15rem 0;"><strong>b</strong> = y-intercept (where line crosses y-axis)
    <ul style="margin: 0.15rem 0 0.15rem 0; padding-left: 1.5rem;">
      <li>This is the y-value when x = 0</li>
      <li>Point (0, b) is on the line</li>
    </ul>
  </li>
  <li style="margin: 0.15rem 0;"><strong>Example:</strong> y = 3x + 7
    <ul style="margin: 0.15rem 0 0.15rem 0; padding-left: 1.5rem;">
      <li>Slope: m = 3</li>
      <li>y-intercept: b = 7</li>
      <li>Line crosses y-axis at point (0, 7)</li>
    </ul>
  </li>
</ul>

<h4 style="margin-top: 2rem; margin-bottom: 0.3rem; font-weight: 400;">Writing Equations in Slope-Intercept Form</h4>

<ul style="margin: 0.3rem 0 0.5rem 0; padding-left: 1.5rem; line-height: 1.5;">
  <li style="margin: 0.15rem 0;"><strong>Given slope and y-intercept:</strong>
    <ul style="margin: 0.15rem 0 0.15rem 0; padding-left: 1.5rem;">
      <li>Just plug into y = mx + b</li>
      <li>Example: Slope 4, y-intercept −2 → y = 4x − 2</li>
    </ul>
  </li>
  <li style="margin: 0.15rem 0;"><strong>Given slope and a point:</strong>
    <ul style="margin: 0.15rem 0 0.15rem 0; padding-left: 1.5rem;">
      <li>Plug point and slope into y = mx + b</li>
      <li>Solve for b</li>
      <li>Example: Slope 2, point (3, 11): 11 = 2(3) + b → 11 = 6 + b → b = 5 → y = 2x + 5</li>
    </ul>
  </li>
  <li style="margin: 0.15rem 0;"><strong>Given two points:</strong>
    <ul style="margin: 0.15rem 0 0.15rem 0; padding-left: 1.5rem;">
      <li>Find slope using m = (y₂ − y₁)/(x₂ − x₁)</li>
      <li>Use one point to find b</li>
    </ul>
  </li>
</ul>

<h4 style="margin: 0 0 1rem 0; padding-left: 0.75rem; border-left: 4px solid #b91c1c; color: #000000; font-weight: 700;">Example 3: Writing Equation from Graph</h4>

<p style="font-size: 16px; line-height: 1.7; margin: 0.5rem 0 1rem 0;">A line passes through points (0, −4) and (2, 2). What is the equation of the line in slope-intercept form?</p>

<p style="margin: 0.3rem 0 0.5rem 0;">
<span style="font-family: ''Times New Roman'', Times, Georgia, serif;">A. y = 3x − 4</span><br>
<span style="font-family: ''Times New Roman'', Times, Georgia, serif;">B. y = 3x + 4</span><br>
<span style="font-family: ''Times New Roman'', Times, Georgia, serif;">C. y = −3x + 4</span><br>
<span style="font-family: ''Times New Roman'', Times, Georgia, serif;">D. y = 2x − 4</span><br>
<span style="font-family: ''Times New Roman'', Times, Georgia, serif;">E. y = −2x − 4</span>
</p>

<p style="margin: 1.5rem 0 0.75rem 0;"><strong>Solution:</strong></p>

<ul style="margin: 0.3rem 0 0.5rem 0; padding-left: 1.5rem; line-height: 1.5;">
  <li style="margin: 0.15rem 0;">Step 1: Find slope using m = (y₂ − y₁)/(x₂ − x₁) = (2 − (−4))/(2 − 0) = 6/2 = 3</li>
  <li style="margin: 0.15rem 0;">Step 2: Notice that (0, −4) is the y-intercept, so b = −4</li>
  <li style="margin: 0.15rem 0;">Step 3: Write equation: y = 3x − 4</li>
</ul>

<p style="font-size: 16px; line-height: 1.7; margin: 0.5rem 0 1rem 0;">Answer: A</p>

<h3 style="margin-top: 5rem; margin-bottom: 0.75rem; font-weight: 700;">4. Point-Slope Form</h3>

<p style="font-size: 16px; line-height: 1.7; margin: 0.5rem 0 1rem 0;">While less common than slope-intercept form, <strong style="color: #2563eb; font-weight: 600; text-decoration: underline;">point-slope form</strong> is useful when you know a point and the slope.</p>

<h4 style="margin-top: 2rem; margin-bottom: 0.3rem; font-weight: 400;">The Form: y − y₁ = m(x − x₁)</h4>

<ul style="margin: 0.3rem 0 0.5rem 0; padding-left: 1.5rem; line-height: 1.5;">
  <li style="margin: 0.15rem 0;"><strong>m</strong> = slope</li>
  <li style="margin: 0.15rem 0;"><strong>(x₁, y₁)</strong> = a known point on the line</li>
  <li style="margin: 0.15rem 0;"><strong>When to use:</strong> You''re given slope and one point</li>
  <li style="margin: 0.15rem 0;"><strong>Example:</strong> Slope 4, point (2, 5) → y − 5 = 4(x − 2)</li>
  <li style="margin: 0.15rem 0;"><strong>Converting to slope-intercept:</strong>
    <ul style="margin: 0.15rem 0 0.15rem 0; padding-left: 1.5rem;">
      <li>Distribute: y − 5 = 4x − 8</li>
      <li>Add 5: y = 4x − 3</li>
    </ul>
  </li>
</ul>

<h3 style="margin-top: 5rem; margin-bottom: 0.75rem; font-weight: 700;">5. Standard Form</h3>

<p style="font-size: 16px; line-height: 1.7; margin: 0.5rem 0 1rem 0;">The <strong style="color: #2563eb; font-weight: 600; text-decoration: underline;">standard form</strong> of a linear equation is Ax + By = C, where A, B, and C are integers and A is positive.</p>

<h4 style="margin-top: 2rem; margin-bottom: 0.3rem; font-weight: 400;">The Form: Ax + By = C</h4>

<ul style="margin: 0.3rem 0 0.5rem 0; padding-left: 1.5rem; line-height: 1.5;">
  <li style="margin: 0.15rem 0;"><strong>A, B, C</strong> should be integers (whole numbers)</li>
  <li style="margin: 0.15rem 0;"><strong>A</strong> should be positive (convention)</li>
  <li style="margin: 0.15rem 0;"><strong>Example:</strong> 3x + 2y = 12</li>
  <li style="margin: 0.15rem 0;"><strong>Finding slope from standard form:</strong>
    <ul style="margin: 0.15rem 0 0.15rem 0; padding-left: 1.5rem;">
      <li>Solve for y to convert to slope-intercept</li>
      <li>Or use formula: m = −A/B</li>
      <li>Example: 3x + 2y = 12 has slope m = −3/2</li>
    </ul>
  </li>
  <li style="margin: 0.15rem 0;"><strong>Finding intercepts from standard form:</strong>
    <ul style="margin: 0.15rem 0 0.15rem 0; padding-left: 1.5rem;">
      <li>x-intercept: Set y = 0, solve for x</li>
      <li>y-intercept: Set x = 0, solve for y</li>
      <li>Example in 3x + 2y = 12: x-intercept is (4, 0), y-intercept is (0, 6)</li>
    </ul>
  </li>
</ul>

<h4 style="margin: 0 0 1rem 0; padding-left: 0.75rem; border-left: 4px solid #b91c1c; color: #000000; font-weight: 700;">Example 4: Converting Between Forms</h4>

<p style="font-size: 16px; line-height: 1.7; margin: 0.5rem 0 1rem 0;">What is the slope of the line represented by the equation 4x − 6y = 24?</p>

<p style="margin: 0.3rem 0 0.5rem 0;">
<span style="font-family: ''Times New Roman'', Times, Georgia, serif;">A. −<sup>3</sup>⁄<sub>2</sub></span><br>
<span style="font-family: ''Times New Roman'', Times, Georgia, serif;">B. −<sup>2</sup>⁄<sub>3</sub></span><br>
<span style="font-family: ''Times New Roman'', Times, Georgia, serif;">C. <sup>2</sup>⁄<sub>3</sub></span><br>
<span style="font-family: ''Times New Roman'', Times, Georgia, serif;">D. <sup>3</sup>⁄<sub>2</sub></span><br>
<span style="font-family: ''Times New Roman'', Times, Georgia, serif;">E. 4</span>
</p>

<p style="margin: 1.5rem 0 0.75rem 0;"><strong>Solution:</strong></p>

<ul style="margin: 0.3rem 0 0.5rem 0; padding-left: 1.5rem; line-height: 1.5;">
  <li style="margin: 0.15rem 0;">Method 1 (Quick formula): m = −A/B = −4/(−6) = 4/6 = 2/3</li>
  <li style="margin: 0.15rem 0;">Method 2 (Solve for y): 4x − 6y = 24 → −6y = −4x + 24 → y = (2/3)x − 4, so m = 2/3</li>
</ul>

<p style="font-size: 16px; line-height: 1.7; margin: 0.5rem 0 1rem 0;">Answer: C</p>

<h3 style="margin-top: 5rem; margin-bottom: 0.75rem; font-weight: 700;">6. Midpoint and Distance Formulas</h3>

<p style="font-size: 16px; line-height: 1.7; margin: 0.5rem 0 1rem 0;">These coordinate geometry formulas appear regularly on the ACT.</p>

<h4 style="margin-top: 2rem; margin-bottom: 0.3rem; font-weight: 400;">Midpoint Formula</h4>

<ul style="margin: 0.3rem 0 0.5rem 0; padding-left: 1.5rem; line-height: 1.5;">
  <li style="margin: 0.15rem 0;"><strong style="color: #2563eb; font-weight: 600; text-decoration: underline;">Formula:</strong> M = ((x₁ + x₂)/2, (y₁ + y₂)/2)
    <ul style="margin: 0.15rem 0 0.15rem 0; padding-left: 1.5rem;">
      <li>Average the x-coordinates, average the y-coordinates</li>
      <li>Gives the exact middle point between two points</li>
      <li>Example: Midpoint of (2, 5) and (8, 13) is ((2+8)/2, (5+13)/2) = (5, 9)</li>
    </ul>
  </li>
  <li style="margin: 0.15rem 0;"><strong>Using midpoint to find missing endpoint:</strong>
    <ul style="margin: 0.15rem 0 0.15rem 0; padding-left: 1.5rem;">
      <li>If midpoint is (5, 9) and one endpoint is (2, 5), find other endpoint</li>
      <li>Set up: ((2 + x)/2, (5 + y)/2) = (5, 9)</li>
      <li>(2 + x)/2 = 5 → x = 8; (5 + y)/2 = 9 → y = 13</li>
      <li>Other endpoint: (8, 13)</li>
    </ul>
  </li>
</ul>

<h4 style="margin-top: 2rem; margin-bottom: 0.3rem; font-weight: 400;">Distance Formula</h4>

<ul style="margin: 0.3rem 0 0.5rem 0; padding-left: 1.5rem; line-height: 1.5;">
  <li style="margin: 0.15rem 0;"><strong style="color: #2563eb; font-weight: 600; text-decoration: underline;">Formula:</strong> d = √[(x₂ − x₁)² + (y₂ − y₁)²]
    <ul style="margin: 0.15rem 0 0.15rem 0; padding-left: 1.5rem;">
      <li>Derived from the Pythagorean theorem</li>
      <li>Finds straight-line distance between two points</li>
      <li>Example: Distance from (1, 2) to (4, 6) is √[(4−1)² + (6−2)²] = √[9 + 16] = √25 = 5</li>
    </ul>
  </li>
  <li style="margin: 0.15rem 0;"><strong>When to use vs. Pythagorean theorem:</strong>
    <ul style="margin: 0.15rem 0 0.15rem 0; padding-left: 1.5rem;">
      <li>Distance formula IS Pythagorean theorem applied to coordinates</li>
      <li>Use distance formula when given coordinates</li>
      <li>Use Pythagorean theorem when given triangle with sides</li>
    </ul>
  </li>
</ul>

<h4 style="margin: 0 0 1rem 0; padding-left: 0.75rem; border-left: 4px solid #b91c1c; color: #000000; font-weight: 700;">Example 5: Midpoint Formula</h4>

<p style="font-size: 16px; line-height: 1.7; margin: 0.5rem 0 1rem 0;">What is the midpoint of the line segment with endpoints (−3, 7) and (5, −1)?</p>

<p style="margin: 0.3rem 0 0.5rem 0;">
<span style="font-family: ''Times New Roman'', Times, Georgia, serif;">A. (1, 3)</span><br>
<span style="font-family: ''Times New Roman'', Times, Georgia, serif;">B. (1, 4)</span><br>
<span style="font-family: ''Times New Roman'', Times, Georgia, serif;">C. (2, 3)</span><br>
<span style="font-family: ''Times New Roman'', Times, Georgia, serif;">D. (2, 4)</span><br>
<span style="font-family: ''Times New Roman'', Times, Georgia, serif;">E. (4, 3)</span>
</p>

<p style="margin: 1.5rem 0 0.75rem 0;"><strong>Solution:</strong></p>

<ul style="margin: 0.3rem 0 0.5rem 0; padding-left: 1.5rem; line-height: 1.5;">
  <li style="margin: 0.15rem 0;">Step 1: Use midpoint formula M = ((x₁ + x₂)/2, (y₁ + y₂)/2)</li>
  <li style="margin: 0.15rem 0;">Step 2: Substitute: M = ((−3 + 5)/2, (7 + (−1))/2)</li>
  <li style="margin: 0.15rem 0;">Step 3: Simplify: M = (2/2, 6/2) = (1, 3)</li>
</ul>

<p style="font-size: 16px; line-height: 1.7; margin: 0.5rem 0 1rem 0;">Answer: A</p>

<h3 style="margin-top: 5rem; margin-bottom: 0.75rem; font-weight: 700;">7. Finding x- and y-Intercepts</h3>

<p style="font-size: 16px; line-height: 1.7; margin: 0.5rem 0 1rem 0;">Intercepts are where a line crosses the axes. The ACT tests these frequently.</p>

<ul style="margin: 0.3rem 0 0.5rem 0; padding-left: 1.5rem; line-height: 1.5;">
  <li style="margin: 0.15rem 0;"><strong style="color: #2563eb; font-weight: 600; text-decoration: underline;">x-intercept:</strong> Where line crosses x-axis
    <ul style="margin: 0.15rem 0 0.15rem 0; padding-left: 1.5rem;">
      <li>At x-intercept, y = 0</li>
      <li>Set y = 0 and solve for x</li>
      <li>Written as point (x, 0)</li>
      <li>Example: For y = 2x − 6, set 0 = 2x − 6 → x = 3 → x-intercept is (3, 0)</li>
    </ul>
  </li>
  <li style="margin: 0.15rem 0;"><strong style="color: #2563eb; font-weight: 600; text-decoration: underline;">y-intercept:</strong> Where line crosses y-axis
    <ul style="margin: 0.15rem 0 0.15rem 0; padding-left: 1.5rem;">
      <li>At y-intercept, x = 0</li>
      <li>Set x = 0 and solve for y</li>
      <li>Written as point (0, y)</li>
      <li>In y = mx + b form, y-intercept is simply b</li>
      <li>Example: For y = 2x − 6, y-intercept is (0, −6)</li>
    </ul>
  </li>
</ul>

<h4 style="margin: 0 0 1rem 0; padding-left: 0.75rem; border-left: 4px solid #b91c1c; color: #000000; font-weight: 700;">Example 6: Finding Intercepts</h4>

<p style="font-size: 16px; line-height: 1.7; margin: 0.5rem 0 1rem 0;">What is the x-intercept of the line 3x + 4y = 24?</p>

<p style="margin: 0.3rem 0 0.5rem 0;">
<span style="font-family: ''Times New Roman'', Times, Georgia, serif;">A. (6, 0)</span><br>
<span style="font-family: ''Times New Roman'', Times, Georgia, serif;">B. (8, 0)</span><br>
<span style="font-family: ''Times New Roman'', Times, Georgia, serif;">C. (0, 6)</span><br>
<span style="font-family: ''Times New Roman'', Times, Georgia, serif;">D. (0, 8)</span><br>
<span style="font-family: ''Times New Roman'', Times, Georgia, serif;">E. (3, 4)</span>
</p>

<p style="margin: 1.5rem 0 0.75rem 0;"><strong>Solution:</strong></p>

<ul style="margin: 0.3rem 0 0.5rem 0; padding-left: 1.5rem; line-height: 1.5;">
  <li style="margin: 0.15rem 0;">Step 1: At x-intercept, y = 0</li>
  <li style="margin: 0.15rem 0;">Step 2: Substitute y = 0 into equation: 3x + 4(0) = 24</li>
  <li style="margin: 0.15rem 0;">Step 3: Solve: 3x = 24 → x = 8</li>
  <li style="margin: 0.15rem 0;">Step 4: x-intercept is (8, 0)</li>
</ul>

<p style="font-size: 16px; line-height: 1.7; margin: 0.5rem 0 1rem 0;">Answer: B</p>

<p style="height: 1px; margin: 0; padding: 0;"></p>

<h3 style="margin-top: 5rem; margin-bottom: 0.75rem; font-weight: 700; visibility: hidden; height: 0; margin: 0; padding: 0; overflow: hidden;">.</h3>

<h3 style="color: #2e7d32; font-size: 1.4rem; font-weight: 700; margin: 3rem 0 1.5rem 0;">Key Takeaways</h3>

<ul style="list-style: none; padding: 0; margin: 0;">
  <li style="margin-bottom: 0.8rem; color: #2e7d32; font-size: 16px; line-height: 1.6;">
    <span style="color: #4caf50; font-weight: bold; margin-right: 0.5rem;">✓</span>Slope formula: m = (y₂ − y₁)/(x₂ − x₁) measures rise over run
  </li>
  <li style="margin-bottom: 0.8rem; color: #2e7d32; font-size: 16px; line-height: 1.6;">
    <span style="color: #4caf50; font-weight: bold; margin-right: 0.5rem;">✓</span>Parallel lines have equal slopes (m₁ = m₂); perpendicular lines have negative reciprocal slopes (m₁ × m₂ = −1)
  </li>
  <li style="margin-bottom: 0.8rem; color: #2e7d32; font-size: 16px; line-height: 1.6;">
    <span style="color: #4caf50; font-weight: bold; margin-right: 0.5rem;">✓</span>Slope-intercept form (y = mx + b) is most common: m is slope, b is y-intercept
  </li>
  <li style="margin-bottom: 0.8rem; color: #2e7d32; font-size: 16px; line-height: 1.6;">
    <span style="color: #4caf50; font-weight: bold; margin-right: 0.5rem;">✓</span>Point-slope form: y − y₁ = m(x − x₁); Standard form: Ax + By = C with slope m = −A/B
  </li>
  <li style="margin-bottom: 0.8rem; color: #2e7d32; font-size: 16px; line-height: 1.6;">
    <span style="color: #4caf50; font-weight: bold; margin-right: 0.5rem;">✓</span>Midpoint formula: M = ((x₁+x₂)/2, (y₁+y₂)/2) averages coordinates
  </li>
  <li style="margin-bottom: 0.8rem; color: #2e7d32; font-size: 16px; line-height: 1.6;">
    <span style="color: #4caf50; font-weight: bold; margin-right: 0.5rem;">✓</span>Distance formula: d = √[(x₂−x₁)² + (y₂−y₁)²] from Pythagorean theorem
  </li>
  <li style="margin-bottom: 0.8rem; color: #2e7d32; font-size: 16px; line-height: 1.6;">
    <span style="color: #4caf50; font-weight: bold; margin-right: 0.5rem;">✓</span>x-intercept: set y = 0; y-intercept: set x = 0
  </li>
</ul>',
  0
);

-- Step 4: Insert Quiz
INSERT INTO quizzes (id, lesson_id, title, intro, quiz_type, position, is_required)
VALUES (
  'd5e6f7a8-b9c0-1234-efgh-345678901234'::uuid,
  'a2b3c4d5-e6f7-8901-bcde-f23456789012'::uuid,
  'Mastery Check: Lines',
  'Test your understanding of lines, slopes, and coordinate geometry with these 10 ACT-style questions.',
  'practice',
  1,
  true
);

-- Step 5: Insert Quiz Questions
-- Question 1 (Easy)
INSERT INTO quiz_questions (id, quiz_id, question_text, question_order)
VALUES ('e6f7a8b9-c0d1-2345-fghi-456789012345'::uuid, 'd5e6f7a8-b9c0-1234-efgh-345678901234'::uuid,
'What is the slope of the line passing through points (2, 3) and (6, 11)?', 1);

INSERT INTO quiz_options (question_id, option_text, is_correct, explanation, option_order) VALUES
('e6f7a8b9-c0d1-2345-fghi-456789012345'::uuid, '1', false, null, 1),
('e6f7a8b9-c0d1-2345-fghi-456789012345'::uuid, '2', true, 'Slope m = (y₂ − y₁)/(x₂ − x₁) = (11 − 3)/(6 − 2) = 8/4 = 2', 2),
('e6f7a8b9-c0d1-2345-fghi-456789012345'::uuid, '3', false, null, 3),
('e6f7a8b9-c0d1-2345-fghi-456789012345'::uuid, '4', false, null, 4),
('e6f7a8b9-c0d1-2345-fghi-456789012345'::uuid, '8', false, null, 5);

-- Question 2 (Easy)
INSERT INTO quiz_questions (id, quiz_id, question_text, question_order)
VALUES ('f7a8b9c0-d1e2-3456-ghij-567890123456'::uuid, 'd5e6f7a8-b9c0-1234-efgh-345678901234'::uuid,
'What is the y-intercept of the line y = 5x − 7?', 2);

INSERT INTO quiz_options (question_id, option_text, is_correct, explanation, option_order) VALUES
('f7a8b9c0-d1e2-3456-ghij-567890123456'::uuid, '(0, −7)', true, 'In slope-intercept form y = mx + b, the y-intercept is b = −7, which is the point (0, −7)', 1),
('f7a8b9c0-d1e2-3456-ghij-567890123456'::uuid, '(0, 5)', false, null, 2),
('f7a8b9c0-d1e2-3456-ghij-567890123456'::uuid, '(0, 7)', false, null, 3),
('f7a8b9c0-d1e2-3456-ghij-567890123456'::uuid, '(5, 0)', false, null, 4),
('f7a8b9c0-d1e2-3456-ghij-567890123456'::uuid, '(−7, 0)', false, null, 5);

-- Question 3 (Easy)
INSERT INTO quiz_questions (id, quiz_id, question_text, question_order)
VALUES ('a8b9c0d1-e2f3-4567-hijk-678901234567'::uuid, 'd5e6f7a8-b9c0-1234-efgh-345678901234'::uuid,
'A line has slope −3. What is the slope of a line parallel to it?', 3);

INSERT INTO quiz_options (question_id, option_text, is_correct, explanation, option_order) VALUES
('a8b9c0d1-e2f3-4567-hijk-678901234567'::uuid, '−3', true, 'Parallel lines have equal slopes, so the parallel line also has slope −3', 1),
('a8b9c0d1-e2f3-4567-hijk-678901234567'::uuid, '−1/3', false, null, 2),
('a8b9c0d1-e2f3-4567-hijk-678901234567'::uuid, '1/3', false, null, 3),
('a8b9c0d1-e2f3-4567-hijk-678901234567'::uuid, '3', false, null, 4),
('a8b9c0d1-e2f3-4567-hijk-678901234567'::uuid, '0', false, null, 5);

-- Question 4 (Medium)
INSERT INTO quiz_questions (id, quiz_id, question_text, question_order)
VALUES ('b9c0d1e2-f3a4-5678-ijkl-789012345678'::uuid, 'd5e6f7a8-b9c0-1234-efgh-345678901234'::uuid,
'What is the midpoint of the segment connecting (−4, 6) and (8, −2)?', 4);

INSERT INTO quiz_options (question_id, option_text, is_correct, explanation, option_order) VALUES
('b9c0d1e2-f3a4-5678-ijkl-789012345678'::uuid, '(2, 2)', true, 'Midpoint = ((−4+8)/2, (6+(−2))/2) = (4/2, 4/2) = (2, 2)', 1),
('b9c0d1e2-f3a4-5678-ijkl-789012345678'::uuid, '(2, 4)', false, null, 2),
('b9c0d1e2-f3a4-5678-ijkl-789012345678'::uuid, '(4, 2)', false, null, 3),
('b9c0d1e2-f3a4-5678-ijkl-789012345678'::uuid, '(6, 4)', false, null, 4),
('b9c0d1e2-f3a4-5678-ijkl-789012345678'::uuid, '(12, 4)', false, null, 5);

-- Question 5 (Medium)
INSERT INTO quiz_questions (id, quiz_id, question_text, question_order)
VALUES ('c0d1e2f3-a4b5-6789-jklm-890123456789'::uuid, 'd5e6f7a8-b9c0-1234-efgh-345678901234'::uuid,
'A line has slope 2/3. What is the slope of a line perpendicular to it?', 5);

INSERT INTO quiz_options (question_id, option_text, is_correct, explanation, option_order) VALUES
('c0d1e2f3-a4b5-6789-jklm-890123456789'::uuid, '−3/2', true, 'Perpendicular lines have negative reciprocal slopes. Reciprocal of 2/3 is 3/2, then negate: −3/2', 1),
('c0d1e2f3-a4b5-6789-jklm-890123456789'::uuid, '−2/3', false, null, 2),
('c0d1e2f3-a4b5-6789-jklm-890123456789'::uuid, '2/3', false, null, 3),
('c0d1e2f3-a4b5-6789-jklm-890123456789'::uuid, '3/2', false, null, 4),
('c0d1e2f3-a4b5-6789-jklm-890123456789'::uuid, '−1', false, null, 5);

-- Question 6 (Medium)
INSERT INTO quiz_questions (id, quiz_id, question_text, question_order)
VALUES ('d1e2f3a4-b5c6-7890-klmn-901234567890'::uuid, 'd5e6f7a8-b9c0-1234-efgh-345678901234'::uuid,
'What is the equation in slope-intercept form of the line with slope 4 that passes through the point (3, 5)?', 6);

INSERT INTO quiz_options (question_id, option_text, is_correct, explanation, option_order) VALUES
('d1e2f3a4-b5c6-7890-klmn-901234567890'::uuid, 'y = 4x − 7', true, 'Use y = mx + b with m = 4. Substitute point (3, 5): 5 = 4(3) + b → 5 = 12 + b → b = −7. So y = 4x − 7', 1),
('d1e2f3a4-b5c6-7890-klmn-901234567890'::uuid, 'y = 4x + 5', false, null, 2),
('d1e2f3a4-b5c6-7890-klmn-901234567890'::uuid, 'y = 4x − 12', false, null, 3),
('d1e2f3a4-b5c6-7890-klmn-901234567890'::uuid, 'y = 3x + 4', false, null, 4),
('d1e2f3a4-b5c6-7890-klmn-901234567890'::uuid, 'y = 4x + 17', false, null, 5);

-- Question 7 (Medium)
INSERT INTO quiz_questions (id, quiz_id, question_text, question_order)
VALUES ('e2f3a4b5-c6d7-8901-lmno-012345678901'::uuid, 'd5e6f7a8-b9c0-1234-efgh-345678901234'::uuid,
'What is the x-intercept of the line 2x − 5y = 20?', 7);

INSERT INTO quiz_options (question_id, option_text, is_correct, explanation, option_order) VALUES
('e2f3a4b5-c6d7-8901-lmno-012345678901'::uuid, '(10, 0)', true, 'At x-intercept, y = 0. Substitute: 2x − 5(0) = 20 → 2x = 20 → x = 10. x-intercept is (10, 0)', 1),
('e2f3a4b5-c6d7-8901-lmno-012345678901'::uuid, '(4, 0)', false, null, 2),
('e2f3a4b5-c6d7-8901-lmno-012345678901'::uuid, '(0, −4)', false, null, 3),
('e2f3a4b5-c6d7-8901-lmno-012345678901'::uuid, '(0, 10)', false, null, 4),
('e2f3a4b5-c6d7-8901-lmno-012345678901'::uuid, '(20, 0)', false, null, 5);

-- Question 8 (Hard)
INSERT INTO quiz_questions (id, quiz_id, question_text, question_order)
VALUES ('f3a4b5c6-d7e8-9012-mnop-123456789012'::uuid, 'd5e6f7a8-b9c0-1234-efgh-345678901234'::uuid,
'What is the slope of the line 6x + 9y = 18?', 8);

INSERT INTO quiz_options (question_id, option_text, is_correct, explanation, option_order) VALUES
('f3a4b5c6-d7e8-9012-mnop-123456789012'::uuid, '−2/3', true, 'From standard form Ax + By = C, slope m = −A/B = −6/9 = −2/3', 1),
('f3a4b5c6-d7e8-9012-mnop-123456789012'::uuid, '−3/2', false, null, 2),
('f3a4b5c6-d7e8-9012-mnop-123456789012'::uuid, '2/3', false, null, 3),
('f3a4b5c6-d7e8-9012-mnop-123456789012'::uuid, '3/2', false, null, 4),
('f3a4b5c6-d7e8-9012-mnop-123456789012'::uuid, '6/9', false, null, 5);

-- Question 9 (Hard)
INSERT INTO quiz_questions (id, quiz_id, question_text, question_order)
VALUES ('a4b5c6d7-e8f9-0123-nopq-234567890123'::uuid, 'd5e6f7a8-b9c0-1234-efgh-345678901234'::uuid,
'What is the distance between points (−2, 1) and (3, 13)?', 9);

INSERT INTO quiz_options (question_id, option_text, is_correct, explanation, option_order) VALUES
('a4b5c6d7-e8f9-0123-nopq-234567890123'::uuid, '13', true, 'Distance = √[(3−(−2))² + (13−1)²] = √[5² + 12²] = √[25 + 144] = √169 = 13', 1),
('a4b5c6d7-e8f9-0123-nopq-234567890123'::uuid, '5', false, null, 2),
('a4b5c6d7-e8f9-0123-nopq-234567890123'::uuid, '12', false, null, 3),
('a4b5c6d7-e8f9-0123-nopq-234567890123'::uuid, '15', false, null, 4),
('a4b5c6d7-e8f9-0123-nopq-234567890123'::uuid, '17', false, null, 5);

-- Question 10 (Hard)
INSERT INTO quiz_questions (id, quiz_id, question_text, question_order)
VALUES ('b5c6d7e8-f9a0-1234-opqr-345678901234'::uuid, 'd5e6f7a8-b9c0-1234-efgh-345678901234'::uuid,
'Line L passes through (1, 4) and (5, 12). Line M is perpendicular to Line L and passes through (2, 7). What is the equation of Line M in slope-intercept form?', 10);

INSERT INTO quiz_options (question_id, option_text, is_correct, explanation, option_order) VALUES
('b5c6d7e8-f9a0-1234-opqr-345678901234'::uuid, 'y = −1/2 x + 8', true, 'Line L slope: (12−4)/(5−1) = 8/4 = 2. Perpendicular slope: −1/2. Use point (2, 7): 7 = (−1/2)(2) + b → 7 = −1 + b → b = 8. Equation: y = −1/2 x + 8', 1),
('b5c6d7e8-f9a0-1234-opqr-345678901234'::uuid, 'y = 2x + 3', false, null, 2),
('b5c6d7e8-f9a0-1234-opqr-345678901234'::uuid, 'y = −1/2 x + 6', false, null, 3),
('b5c6d7e8-f9a0-1234-opqr-345678901234'::uuid, 'y = −2x + 11', false, null, 4),
('b5c6d7e8-f9a0-1234-opqr-345678901234'::uuid, 'y = 1/2 x + 6', false, null, 5);

-- Verify insertion
SELECT 'Lesson 2.3 inserted successfully!' AS status;
