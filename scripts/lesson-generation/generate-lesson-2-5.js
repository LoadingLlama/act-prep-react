const { insertLesson } = require('./generate-and-insert-lesson');
const { v4: uuidv4 } = require('uuid');

// Generate UUIDs for lesson 2.5
const lessonId = 'd3e4f5a6-b7c8-9012-cdef-345678901234';
const mainSectionId = 'e4f5a6b7-c8d9-0123-def0-456789012345';
const quizId = 'f5a6b7c8-d901-2345-ef01-567890123456';

// Quiz question IDs (10 questions)
const q1Id = uuidv4();
const q2Id = uuidv4();
const q3Id = uuidv4();
const q4Id = uuidv4();
const q5Id = uuidv4();
const q6Id = uuidv4();
const q7Id = uuidv4();
const q8Id = uuidv4();
const q9Id = uuidv4();
const q10Id = uuidv4();

const lesson25Data = {
  metadata: {
    id: lessonId,
    lesson_key: '2.5',
    title: 'Topic 2.5 - Circles, Ellipses, and Hyperbolas',
    subject: 'math',
    category: 'Geometry',
    difficulty_level: 3,
    duration_minutes: 50,
    order_index: 25,
    is_published: true
  },

  sections: [
    {
      id: mainSectionId,
      lesson_id: lessonId,
      section_key: 'main_content',
      title: 'Main Content',
      section_type: 'teaching',
      order_index: 1
    }
  ],

  content: {
    [mainSectionId]: [
      {
        id: uuidv4(),
        section_id: mainSectionId,
        content_type: 'html',
        content: `<p style="font-size: 16px; line-height: 1.7; margin: 0.5rem 0 1rem 0;">Conic sections—<strong style="color: #2563eb; font-weight: 600; text-decoration: underline;">circles</strong>, <strong style="color: #2563eb; font-weight: 600; text-decoration: underline;">ellipses</strong>, <strong style="color: #2563eb; font-weight: 600; text-decoration: underline;">parabolas</strong>, and <strong style="color: #2563eb; font-weight: 600; text-decoration: underline;">hyperbolas</strong>—are curves formed by slicing a double cone at different angles. On the ACT Math section, you'll encounter these shapes primarily through their <strong style="color: #2563eb; font-weight: 600; text-decoration: underline;">algebraic equations</strong> and <strong style="color: #2563eb; font-weight: 600; text-decoration: underline;">geometric properties</strong>. This lesson focuses on the three most commonly tested conic sections: circles, ellipses, and hyperbolas.</p>

<h3 style="margin-top: 5rem; margin-bottom: 0.75rem; font-weight: 700;">1. Circles: The Perfect Conic</h3>

<p style="font-size: 16px; line-height: 1.7; margin: 0.5rem 0 1rem 0;">A <strong style="color: #2563eb; font-weight: 600; text-decoration: underline;">circle</strong> is the set of all points in a plane that are equidistant from a fixed point called the <strong style="color: #2563eb; font-weight: 600; text-decoration: underline;">center</strong>.</p>

<h4 style="margin-top: 2rem; margin-bottom: 0.3rem; font-weight: 400;">Standard Form of a Circle</h4>

<p style="font-size: 16px; line-height: 1.7; margin: 0.5rem 0 1rem 0;">The equation of a circle with center <strong>(h, k)</strong> and radius <strong>r</strong> is:</p>

<p style="font-family: 'Times New Roman', Times, Georgia, serif; font-size: 18px; text-align: center; margin: 1.5rem 0;">(x − h)² + (y − k)² = r²</p>

<ul style="margin: 0.3rem 0 0.5rem 0; padding-left: 1.5rem; line-height: 1.5;">
  <li style="margin: 0.15rem 0;"><strong>(h, k)</strong> = center coordinates</li>
  <li style="margin: 0.15rem 0;"><strong>r</strong> = radius (always positive)</li>
  <li style="margin: 0.15rem 0;">If the center is at the origin (0, 0), the equation simplifies to: <strong>x² + y² = r²</strong></li>
</ul>

<h4 style="margin: 2rem 0 1rem 0; padding-left: 0.75rem; border-left: 4px solid #b91c1c; color: #000000; font-weight: 700;">Example 1: Finding Center and Radius</h4>

<p style="font-size: 16px; line-height: 1.7; margin: 0.5rem 0 1rem 0;">What are the center and radius of the circle (x + 3)² + (y − 5)² = 49?</p>

<p style="margin: 1.5rem 0 0.75rem 0;"><strong>Solution:</strong></p>

<ul style="margin: 0.3rem 0 0.5rem 0; padding-left: 1.5rem; line-height: 1.5;">
  <li style="margin: 0.15rem 0;">Rewrite in standard form: (x − (−3))² + (y − 5)² = 7²</li>
  <li style="margin: 0.15rem 0;">Center: <strong>(−3, 5)</strong></li>
  <li style="margin: 0.15rem 0;">Radius: <strong>r = 7</strong> (since r² = 49)</li>
</ul>

<h4 style="margin-top: 2rem; margin-bottom: 0.3rem; font-weight: 400;">General Form of a Circle</h4>

<p style="font-size: 16px; line-height: 1.7; margin: 0.5rem 0 1rem 0;">Sometimes circles are given in <strong style="color: #2563eb; font-weight: 600; text-decoration: underline;">general form</strong>:</p>

<p style="font-family: 'Times New Roman', Times, Georgia, serif; font-size: 18px; text-align: center; margin: 1.5rem 0;">x² + y² + Dx + Ey + F = 0</p>

<p style="font-size: 16px; line-height: 1.7; margin: 0.5rem 0 1rem 0;">To find the center and radius, you must <strong style="color: #2563eb; font-weight: 600; text-decoration: underline;">complete the square</strong> for both x and y terms.</p>

<h4 style="margin: 2rem 0 1rem 0; padding-left: 0.75rem; border-left: 4px solid #b91c1c; color: #000000; font-weight: 700;">Example 2: Completing the Square</h4>

<p style="font-size: 16px; line-height: 1.7; margin: 0.5rem 0 1rem 0;">Find the center and radius of x² + y² − 6x + 8y + 9 = 0.</p>

<p style="margin: 1.5rem 0 0.75rem 0;"><strong>Solution:</strong></p>

<ul style="margin: 0.3rem 0 0.5rem 0; padding-left: 1.5rem; line-height: 1.5;">
  <li style="margin: 0.15rem 0;">Group x and y terms: (x² − 6x) + (y² + 8y) = −9</li>
  <li style="margin: 0.15rem 0;">Complete the square for x: x² − 6x + 9 = (x − 3)²</li>
  <li style="margin: 0.15rem 0;">Complete the square for y: y² + 8y + 16 = (y + 4)²</li>
  <li style="margin: 0.15rem 0;">Add 9 and 16 to right side: (x − 3)² + (y + 4)² = −9 + 9 + 16 = 16</li>
  <li style="margin: 0.15rem 0;">Center: <strong>(3, −4)</strong></li>
  <li style="margin: 0.15rem 0;">Radius: <strong>r = 4</strong></li>
</ul>

<h3 style="margin-top: 5rem; margin-bottom: 0.75rem; font-weight: 700;">2. Ellipses: Stretched Circles</h3>

<p style="font-size: 16px; line-height: 1.7; margin: 0.5rem 0 1rem 0;">An <strong style="color: #2563eb; font-weight: 600; text-decoration: underline;">ellipse</strong> is an oval-shaped curve. It's the set of all points where the sum of distances to two fixed points (called <strong style="color: #2563eb; font-weight: 600; text-decoration: underline;">foci</strong>) is constant.</p>

<h4 style="margin-top: 2rem; margin-bottom: 0.3rem; font-weight: 400;">Standard Form of an Ellipse</h4>

<p style="font-size: 16px; line-height: 1.7; margin: 0.5rem 0 1rem 0;">For an ellipse centered at <strong>(h, k)</strong>:</p>

<p style="font-family: 'Times New Roman', Times, Georgia, serif; font-size: 18px; text-align: center; margin: 1.5rem 0;">(x − h)²/a² + (y − k)²/b² = 1</p>

<ul style="margin: 0.3rem 0 0.5rem 0; padding-left: 1.5rem; line-height: 1.5;">
  <li style="margin: 0.15rem 0;"><strong>(h, k)</strong> = center</li>
  <li style="margin: 0.15rem 0;"><strong>a</strong> = semi-major axis (longer radius)</li>
  <li style="margin: 0.15rem 0;"><strong>b</strong> = semi-minor axis (shorter radius)</li>
  <li style="margin: 0.15rem 0;">If <strong>a² is under x²</strong>, the ellipse is <strong>horizontal</strong></li>
  <li style="margin: 0.15rem 0;">If <strong>a² is under y²</strong>, the ellipse is <strong>vertical</strong></li>
</ul>

<h4 style="margin: 2rem 0 1rem 0; padding-left: 0.75rem; border-left: 4px solid #b91c1c; color: #000000; font-weight: 700;">Example 3: Ellipse Properties</h4>

<p style="font-size: 16px; line-height: 1.7; margin: 0.5rem 0 1rem 0;">Identify the center, major axis length, and minor axis length of: (x − 2)²/25 + (y + 1)²/9 = 1</p>

<p style="margin: 1.5rem 0 0.75rem 0;"><strong>Solution:</strong></p>

<ul style="margin: 0.3rem 0 0.5rem 0; padding-left: 1.5rem; line-height: 1.5;">
  <li style="margin: 0.15rem 0;">Center: <strong>(2, −1)</strong></li>
  <li style="margin: 0.15rem 0;">a² = 25, so a = 5 (semi-major axis)</li>
  <li style="margin: 0.15rem 0;">b² = 9, so b = 3 (semi-minor axis)</li>
  <li style="margin: 0.15rem 0;">Major axis length = <strong>2a = 10</strong></li>
  <li style="margin: 0.15rem 0;">Minor axis length = <strong>2b = 6</strong></li>
  <li style="margin: 0.15rem 0;">Since a² is under x², this is a <strong>horizontal ellipse</strong></li>
</ul>

<h4 style="margin-top: 2rem; margin-bottom: 0.3rem; font-weight: 400;">Key Ellipse Facts</h4>

<ul style="margin: 0.3rem 0 0.5rem 0; padding-left: 1.5rem; line-height: 1.5;">
  <li style="margin: 0.15rem 0;">The longest diameter is called the <strong style="color: #2563eb; font-weight: 600; text-decoration: underline;">major axis</strong> (length = 2a)</li>
  <li style="margin: 0.15rem 0;">The shortest diameter is called the <strong style="color: #2563eb; font-weight: 600; text-decoration: underline;">minor axis</strong> (length = 2b)</li>
  <li style="margin: 0.15rem 0;">When a = b, the ellipse becomes a <strong>circle</strong></li>
  <li style="margin: 0.15rem 0;">The foci are located along the major axis, distance <strong>c</strong> from center, where c² = a² − b²</li>
</ul>

<h4 style="margin: 2rem 0 1rem 0; padding-left: 0.75rem; border-left: 4px solid #b91c1c; color: #000000; font-weight: 700;">Example 4: Writing Ellipse Equations</h4>

<p style="font-size: 16px; line-height: 1.7; margin: 0.5rem 0 1rem 0;">Write the equation of an ellipse centered at (−3, 2) with a horizontal major axis of length 12 and minor axis of length 8.</p>

<p style="margin: 1.5rem 0 0.75rem 0;"><strong>Solution:</strong></p>

<ul style="margin: 0.3rem 0 0.5rem 0; padding-left: 1.5rem; line-height: 1.5;">
  <li style="margin: 0.15rem 0;">Center: (h, k) = (−3, 2)</li>
  <li style="margin: 0.15rem 0;">Major axis = 12, so a = 6, thus a² = 36</li>
  <li style="margin: 0.15rem 0;">Minor axis = 8, so b = 4, thus b² = 16</li>
  <li style="margin: 0.15rem 0;">Since horizontal, a² goes under x²</li>
  <li style="margin: 0.15rem 0;">Equation: <strong>(x + 3)²/36 + (y − 2)²/16 = 1</strong></li>
</ul>

<h3 style="margin-top: 5rem; margin-bottom: 0.75rem; font-weight: 700;">3. Hyperbolas: Curves with Two Branches</h3>

<p style="font-size: 16px; line-height: 1.7; margin: 0.5rem 0 1rem 0;">A <strong style="color: #2563eb; font-weight: 600; text-decoration: underline;">hyperbola</strong> consists of two separate curves (branches) that mirror each other. It's the set of all points where the <strong>difference</strong> of distances to two foci is constant.</p>

<h4 style="margin-top: 2rem; margin-bottom: 0.3rem; font-weight: 400;">Standard Form of a Hyperbola</h4>

<p style="font-size: 16px; line-height: 1.7; margin: 0.5rem 0 1rem 0;">For a hyperbola centered at <strong>(h, k)</strong>:</p>

<p style="font-family: 'Times New Roman', Times, Georgia, serif; font-size: 18px; text-align: center; margin: 1.5rem 0;"><strong>Horizontal opening:</strong> (x − h)²/a² − (y − k)²/b² = 1</p>

<p style="font-family: 'Times New Roman', Times, Georgia, serif; font-size: 18px; text-align: center; margin: 1.5rem 0;"><strong>Vertical opening:</strong> (y − k)²/a² − (x − h)²/b² = 1</p>

<ul style="margin: 0.3rem 0 0.5rem 0; padding-left: 1.5rem; line-height: 1.5;">
  <li style="margin: 0.15rem 0;"><strong>(h, k)</strong> = center</li>
  <li style="margin: 0.15rem 0;">The <strong>positive term</strong> determines the opening direction</li>
  <li style="margin: 0.15rem 0;">If x² term is positive, branches open <strong>left and right</strong></li>
  <li style="margin: 0.15rem 0;">If y² term is positive, branches open <strong>up and down</strong></li>
</ul>

<h4 style="margin: 2rem 0 1rem 0; padding-left: 0.75rem; border-left: 4px solid #b91c1c; color: #000000; font-weight: 700;">Example 5: Identifying Hyperbola Direction</h4>

<p style="font-size: 16px; line-height: 1.7; margin: 0.5rem 0 1rem 0;">Which direction do the branches open for: (y + 2)²/16 − (x − 3)²/9 = 1?</p>

<p style="margin: 1.5rem 0 0.75rem 0;"><strong>Solution:</strong></p>

<ul style="margin: 0.3rem 0 0.5rem 0; padding-left: 1.5rem; line-height: 1.5;">
  <li style="margin: 0.15rem 0;">The <strong>y² term is positive</strong></li>
  <li style="margin: 0.15rem 0;">Therefore, branches open <strong>up and down</strong> (vertical)</li>
  <li style="margin: 0.15rem 0;">Center: <strong>(3, −2)</strong></li>
</ul>

<h4 style="margin-top: 2rem; margin-bottom: 0.3rem; font-weight: 400;">Asymptotes of a Hyperbola</h4>

<p style="font-size: 16px; line-height: 1.7; margin: 0.5rem 0 1rem 0;"><strong style="color: #2563eb; font-weight: 600; text-decoration: underline;">Asymptotes</strong> are diagonal lines that the hyperbola branches approach but never touch. They pass through the center (h, k).</p>

<p style="font-size: 16px; line-height: 1.7; margin: 0.5rem 0 1rem 0;">For horizontal hyperbola (x − h)²/a² − (y − k)²/b² = 1:</p>
<p style="font-family: 'Times New Roman', Times, Georgia, serif; font-size: 18px; text-align: center; margin: 1.5rem 0;">y − k = ±(b/a)(x − h)</p>

<p style="font-size: 16px; line-height: 1.7; margin: 0.5rem 0 1rem 0;">For vertical hyperbola (y − k)²/a² − (x − h)²/b² = 1:</p>
<p style="font-family: 'Times New Roman', Times, Georgia, serif; font-size: 18px; text-align: center; margin: 1.5rem 0;">y − k = ±(a/b)(x − h)</p>

<h4 style="margin: 2rem 0 1rem 0; padding-left: 0.75rem; border-left: 4px solid #b91c1c; color: #000000; font-weight: 700;">Example 6: Finding Asymptotes</h4>

<p style="font-size: 16px; line-height: 1.7; margin: 0.5rem 0 1rem 0;">Find the asymptotes of: x²/9 − y²/16 = 1</p>

<p style="margin: 1.5rem 0 0.75rem 0;"><strong>Solution:</strong></p>

<ul style="margin: 0.3rem 0 0.5rem 0; padding-left: 1.5rem; line-height: 1.5;">
  <li style="margin: 0.15rem 0;">This is a horizontal hyperbola centered at (0, 0)</li>
  <li style="margin: 0.15rem 0;">a² = 9, so a = 3; b² = 16, so b = 4</li>
  <li style="margin: 0.15rem 0;">Asymptotes: y = ±(b/a)x = ±(4/3)x</li>
  <li style="margin: 0.15rem 0;">Final equations: <strong>y = (4/3)x and y = −(4/3)x</strong></li>
</ul>

<h3 style="margin-top: 5rem; margin-bottom: 0.75rem; font-weight: 700;">4. Distinguishing Between Conic Sections</h3>

<p style="font-size: 16px; line-height: 1.7; margin: 0.5rem 0 1rem 0;">When given an equation, use these quick checks:</p>

<table style="border-collapse: collapse; width: 100%; margin: 1.5rem 0;">
  <thead>
    <tr>
      <th style="border: 1px solid #ddd; padding: 12px; background: #f0f0f0; text-align: left;">Conic Section</th>
      <th style="border: 1px solid #ddd; padding: 12px; background: #f0f0f0; text-align: left;">Key Feature</th>
      <th style="border: 1px solid #ddd; padding: 12px; background: #f0f0f0; text-align: left;">General Form</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td style="border: 1px solid #ddd; padding: 12px;"><strong>Circle</strong></td>
      <td style="border: 1px solid #ddd; padding: 12px;">Coefficients of x² and y² are equal</td>
      <td style="border: 1px solid #ddd; padding: 12px;">(x − h)² + (y − k)² = r²</td>
    </tr>
    <tr>
      <td style="border: 1px solid #ddd; padding: 12px;"><strong>Ellipse</strong></td>
      <td style="border: 1px solid #ddd; padding: 12px;">Both terms positive, different coefficients</td>
      <td style="border: 1px solid #ddd; padding: 12px;">(x − h)²/a² + (y − k)²/b² = 1</td>
    </tr>
    <tr>
      <td style="border: 1px solid #ddd; padding: 12px;"><strong>Hyperbola</strong></td>
      <td style="border: 1px solid #ddd; padding: 12px;">One term positive, one negative (subtraction)</td>
      <td style="border: 1px solid #ddd; padding: 12px;">(x − h)²/a² − (y − k)²/b² = 1</td>
    </tr>
  </tbody>
</table>

<h3 style="margin-top: 5rem; margin-bottom: 0.75rem; font-weight: 700;">5. ACT Strategy Tips</h3>

<ul style="margin: 0.3rem 0 0.5rem 0; padding-left: 1.5rem; line-height: 1.5;">
  <li style="margin: 0.15rem 0;"><strong>Check the signs:</strong> Addition (+) means circle or ellipse; subtraction (−) means hyperbola</li>
  <li style="margin: 0.15rem 0;"><strong>Look for equal coefficients:</strong> If x² and y² have the same coefficient, it's a circle</li>
  <li style="margin: 0.15rem 0;"><strong>Complete the square:</strong> If the equation isn't in standard form, completing the square reveals the center</li>
  <li style="margin: 0.15rem 0;"><strong>Read carefully:</strong> Pay attention to what the question asks for (center, radius, axis length, asymptotes, etc.)</li>
  <li style="margin: 0.15rem 0;"><strong>Use symmetry:</strong> All conic sections are symmetric about their center</li>
</ul>

<h4 style="margin: 2rem 0 1rem 0; padding-left: 0.75rem; border-left: 4px solid #b91c1c; color: #000000; font-weight: 700;">Example 7: Comprehensive Problem</h4>

<p style="font-size: 16px; line-height: 1.7; margin: 0.5rem 0 1rem 0;">The equation x² + 4y² − 6x + 16y + 21 = 0 represents which conic section? Find its center.</p>

<p style="margin: 1.5rem 0 0.75rem 0;"><strong>Solution:</strong></p>

<ul style="margin: 0.3rem 0 0.5rem 0; padding-left: 1.5rem; line-height: 1.5;">
  <li style="margin: 0.15rem 0;">Both x² and y² have positive coefficients but different values (1 and 4), so this is an <strong>ellipse</strong></li>
  <li style="margin: 0.15rem 0;">Complete the square for x: x² − 6x → (x − 3)² − 9</li>
  <li style="margin: 0.15rem 0;">Complete the square for y: 4y² + 16y = 4(y² + 4y) = 4[(y + 2)² − 4] = 4(y + 2)² − 16</li>
  <li style="margin: 0.15rem 0;">Substitute back: (x − 3)² − 9 + 4(y + 2)² − 16 + 21 = 0</li>
  <li style="margin: 0.15rem 0;">Simplify: (x − 3)² + 4(y + 2)² = 4</li>
  <li style="margin: 0.15rem 0;">Divide by 4: (x − 3)²/4 + (y + 2)²/1 = 1</li>
  <li style="margin: 0.15rem 0;">Center: <strong>(3, −2)</strong></li>
</ul>

<p style="height: 1px; margin: 0; padding: 0;"></p>

<h3 style="margin-top: 5rem; margin-bottom: 0.75rem; font-weight: 700; visibility: hidden; height: 0; margin: 0; padding: 0; overflow: hidden;">.</h3>

<h3 style="color: #2e7d32; font-size: 1.4rem; font-weight: 700; margin: 3rem 0 1.5rem 0;">Key Takeaways</h3>

<ul style="list-style: none; padding: 0; margin: 0;">
  <li style="margin-bottom: 0.8rem; color: #2e7d32; font-size: 16px; line-height: 1.6;">
    <span style="color: #4caf50; font-weight: bold; margin-right: 0.5rem;">✓</span>Circle: (x − h)² + (y − k)² = r² — all points equidistant from center
  </li>
  <li style="margin-bottom: 0.8rem; color: #2e7d32; font-size: 16px; line-height: 1.6;">
    <span style="color: #4caf50; font-weight: bold; margin-right: 0.5rem;">✓</span>Ellipse: (x − h)²/a² + (y − k)²/b² = 1 — stretched circle with major and minor axes
  </li>
  <li style="margin-bottom: 0.8rem; color: #2e7d32; font-size: 16px; line-height: 1.6;">
    <span style="color: #4caf50; font-weight: bold; margin-right: 0.5rem;">✓</span>Hyperbola: has subtraction between terms — two branches with asymptotes
  </li>
  <li style="margin-bottom: 0.8rem; color: #2e7d32; font-size: 16px; line-height: 1.6;">
    <span style="color: #4caf50; font-weight: bold; margin-right: 0.5rem;">✓</span>Complete the square to convert general form to standard form
  </li>
  <li style="margin-bottom: 0.8rem; color: #2e7d32; font-size: 16px; line-height: 1.6;">
    <span style="color: #4caf50; font-weight: bold; margin-right: 0.5rem;">✓</span>Check signs and coefficients to quickly identify conic type
  </li>
</ul>`,
        order_index: 1
      }
    ]
  },

  quiz: {
    id: quizId,
    lesson_id: lessonId,
    title: 'Mastery Check: Circles, Ellipses, and Hyperbolas',
    intro: 'Test your understanding of conic sections with these 10 ACT-style questions.',
    quiz_type: 'mastery_check',
    position: 1,
    is_required: true
  },

  questions: [
    // Easy Questions (1-3)
    {
      id: q1Id,
      quiz_id: quizId,
      question_text: 'What are the center coordinates of the circle (x − 7)² + (y + 3)² = 25?',
      question_order: 1
    },
    {
      id: q2Id,
      quiz_id: quizId,
      question_text: 'What is the radius of the circle x² + y² = 64?',
      question_order: 2
    },
    {
      id: q3Id,
      quiz_id: quizId,
      question_text: 'Which conic section is represented by the equation x²/16 + y²/9 = 1?',
      question_order: 3
    },
    // Medium Questions (4-7)
    {
      id: q4Id,
      quiz_id: quizId,
      question_text: 'Find the center of the circle x² + y² + 10x − 4y + 13 = 0.',
      question_order: 4
    },
    {
      id: q5Id,
      quiz_id: quizId,
      question_text: 'For the ellipse (x − 2)²/36 + (y + 1)²/16 = 1, what is the length of the major axis?',
      question_order: 5
    },
    {
      id: q6Id,
      quiz_id: quizId,
      question_text: 'Which direction do the branches of the hyperbola x²/25 − y²/9 = 1 open?',
      question_order: 6
    },
    {
      id: q7Id,
      quiz_id: quizId,
      question_text: 'Write the equation of a circle centered at (−4, 5) with radius 6.',
      question_order: 7
    },
    // Hard Questions (8-10)
    {
      id: q8Id,
      quiz_id: quizId,
      question_text: 'What are the equations of the asymptotes for the hyperbola (y + 3)²/16 − (x − 2)²/9 = 1?',
      question_order: 8
    },
    {
      id: q9Id,
      quiz_id: quizId,
      question_text: 'The equation 9x² + 4y² − 18x + 16y − 11 = 0 represents which conic section?',
      question_order: 9
    },
    {
      id: q10Id,
      quiz_id: quizId,
      question_text: 'A circle has center (3, −2) and passes through the point (7, 1). What is the equation of the circle?',
      question_order: 10
    }
  ],

  options: [
    // Q1 options
    { question_id: q1Id, option_text: '(7, −3)', is_correct: true, explanation: 'The standard form is (x − h)² + (y − k)² = r². Here, h = 7 and k = −3, so the center is (7, −3).', option_order: 1 },
    { question_id: q1Id, option_text: '(−7, 3)', is_correct: false, explanation: 'Remember to reverse the signs inside the parentheses. (x − 7) means h = 7, not −7.', option_order: 2 },
    { question_id: q1Id, option_text: '(7, 3)', is_correct: false, explanation: '(y + 3) is the same as (y − (−3)), so k = −3, not 3.', option_order: 3 },
    { question_id: q1Id, option_text: '(−7, −3)', is_correct: false, explanation: 'Both coordinates have incorrect signs.', option_order: 4 },
    { question_id: q1Id, option_text: '(5, 0)', is_correct: false, explanation: 'This doesn\'t match the equation at all.', option_order: 5 },

    // Q2 options
    { question_id: q2Id, option_text: '8', is_correct: true, explanation: 'Since r² = 64, we take the square root: r = √64 = 8.', option_order: 1 },
    { question_id: q2Id, option_text: '64', is_correct: false, explanation: '64 is r², not r. The radius is the square root of 64.', option_order: 2 },
    { question_id: q2Id, option_text: '16', is_correct: false, explanation: 'This would be correct if the equation were x² + y² = 256.', option_order: 3 },
    { question_id: q2Id, option_text: '32', is_correct: false, explanation: 'This is not the square root of 64.', option_order: 4 },
    { question_id: q2Id, option_text: '4', is_correct: false, explanation: 'This is too small; √64 = 8.', option_order: 5 },

    // Q3 options
    { question_id: q3Id, option_text: 'Ellipse', is_correct: true, explanation: 'Both terms are positive with different denominators (16 ≠ 9), which indicates an ellipse.', option_order: 1 },
    { question_id: q3Id, option_text: 'Circle', is_correct: false, explanation: 'For a circle, the denominators must be equal.', option_order: 2 },
    { question_id: q3Id, option_text: 'Hyperbola', is_correct: false, explanation: 'Hyperbolas have a subtraction sign between the terms, not addition.', option_order: 3 },
    { question_id: q3Id, option_text: 'Parabola', is_correct: false, explanation: 'Parabolas have only one squared term.', option_order: 4 },
    { question_id: q3Id, option_text: 'Line', is_correct: false, explanation: 'Lines don\'t have squared terms.', option_order: 5 },

    // Q4 options
    { question_id: q4Id, option_text: '(−5, 2)', is_correct: true, explanation: 'Complete the square: (x² + 10x + 25) + (y² − 4y + 4) = −13 + 25 + 4 → (x + 5)² + (y − 2)² = 16. Center: (−5, 2).', option_order: 1 },
    { question_id: q4Id, option_text: '(5, −2)', is_correct: false, explanation: 'The signs are reversed. After completing the square, you get (x + 5)² and (y − 2)².', option_order: 2 },
    { question_id: q4Id, option_text: '(−10, 4)', is_correct: false, explanation: 'You must divide the linear coefficients by 2 before squaring when completing the square.', option_order: 3 },
    { question_id: q4Id, option_text: '(10, −4)', is_correct: false, explanation: 'Both the method and signs are incorrect.', option_order: 4 },
    { question_id: q4Id, option_text: '(0, 0)', is_correct: false, explanation: 'The center is not at the origin for this circle.', option_order: 5 },

    // Q5 options
    { question_id: q5Id, option_text: '12', is_correct: true, explanation: 'a² = 36, so a = 6. The major axis length is 2a = 2(6) = 12.', option_order: 1 },
    { question_id: q5Id, option_text: '6', is_correct: false, explanation: 'This is the semi-major axis (a), not the full major axis (2a).', option_order: 2 },
    { question_id: q5Id, option_text: '36', is_correct: false, explanation: 'This is a², not the major axis length.', option_order: 3 },
    { question_id: q5Id, option_text: '8', is_correct: false, explanation: 'This is the length of the minor axis, not the major axis.', option_order: 4 },
    { question_id: q5Id, option_text: '16', is_correct: false, explanation: 'This is b², not the major axis length.', option_order: 5 },

    // Q6 options
    { question_id: q6Id, option_text: 'Left and right (horizontal)', is_correct: true, explanation: 'The x² term is positive, so the hyperbola opens horizontally (left and right).', option_order: 1 },
    { question_id: q6Id, option_text: 'Up and down (vertical)', is_correct: false, explanation: 'If the y² term were positive, it would open vertically.', option_order: 2 },
    { question_id: q6Id, option_text: 'All four directions', is_correct: false, explanation: 'Hyperbolas have only two branches.', option_order: 3 },
    { question_id: q6Id, option_text: 'Diagonally', is_correct: false, explanation: 'Hyperbola branches open horizontally or vertically, not diagonally.', option_order: 4 },
    { question_id: q6Id, option_text: 'It doesn\'t open; it\'s a closed curve', is_correct: false, explanation: 'Hyperbolas are open curves with two branches.', option_order: 5 },

    // Q7 options
    { question_id: q7Id, option_text: '(x + 4)² + (y − 5)² = 36', is_correct: true, explanation: 'Use (x − h)² + (y − k)² = r² with h = −4, k = 5, r = 6, so r² = 36.', option_order: 1 },
    { question_id: q7Id, option_text: '(x − 4)² + (y + 5)² = 36', is_correct: false, explanation: 'The signs are reversed for both h and k.', option_order: 2 },
    { question_id: q7Id, option_text: '(x + 4)² + (y − 5)² = 6', is_correct: false, explanation: 'The equation needs r², not r. So it should be 36, not 6.', option_order: 3 },
    { question_id: q7Id, option_text: '(x − 4)² + (y − 5)² = 36', is_correct: false, explanation: 'The x term has the wrong sign; h = −4 gives (x + 4)².', option_order: 4 },
    { question_id: q7Id, option_text: '(x + 4)² + (y + 5)² = 36', is_correct: false, explanation: 'The y term has the wrong sign; k = 5 gives (y − 5)².', option_order: 5 },

    // Q8 options
    { question_id: q8Id, option_text: 'y + 3 = ±(4/3)(x − 2)', is_correct: true, explanation: 'For vertical hyperbola (y − k)²/a² − (x − h)²/b² = 1, asymptotes are y − k = ±(a/b)(x − h). Here: a = 4, b = 3, so y + 3 = ±(4/3)(x − 2).', option_order: 1 },
    { question_id: q8Id, option_text: 'y − 3 = ±(4/3)(x + 2)', is_correct: false, explanation: 'The signs on k and h are reversed.', option_order: 2 },
    { question_id: q8Id, option_text: 'y + 3 = ±(3/4)(x − 2)', is_correct: false, explanation: 'The slope ratio is inverted. For vertical hyperbolas, use a/b, not b/a.', option_order: 3 },
    { question_id: q8Id, option_text: 'y = ±(4/3)x', is_correct: false, explanation: 'This would be correct if the center were at the origin, but it\'s at (2, −3).', option_order: 4 },
    { question_id: q8Id, option_text: 'x − 2 = ±(4/3)(y + 3)', is_correct: false, explanation: 'The variables are swapped; asymptotes should be in the form y = ...', option_order: 5 },

    // Q9 options
    { question_id: q9Id, option_text: 'Ellipse', is_correct: true, explanation: 'Both squared terms are positive with different coefficients (9 ≠ 4), indicating an ellipse.', option_order: 1 },
    { question_id: q9Id, option_text: 'Circle', is_correct: false, explanation: 'The coefficients of x² and y² must be equal for a circle.', option_order: 2 },
    { question_id: q9Id, option_text: 'Hyperbola', is_correct: false, explanation: 'Hyperbolas have one negative squared term (subtraction).', option_order: 3 },
    { question_id: q9Id, option_text: 'Parabola', is_correct: false, explanation: 'Parabolas have only one squared term, not two.', option_order: 4 },
    { question_id: q9Id, option_text: 'Line', is_correct: false, explanation: 'This equation has squared terms, so it can\'t be a line.', option_order: 5 },

    // Q10 options
    { question_id: q10Id, option_text: '(x − 3)² + (y + 2)² = 25', is_correct: true, explanation: 'Find radius using distance formula: r = √[(7−3)² + (1−(−2))²] = √[16 + 9] = √25 = 5. So r² = 25. Equation: (x − 3)² + (y + 2)² = 25.', option_order: 1 },
    { question_id: q10Id, option_text: '(x − 3)² + (y + 2)² = 5', is_correct: false, explanation: 'The equation needs r², not r. Since r = 5, r² = 25.', option_order: 2 },
    { question_id: q10Id, option_text: '(x + 3)² + (y − 2)² = 25', is_correct: false, explanation: 'The center coordinates have reversed signs.', option_order: 3 },
    { question_id: q10Id, option_text: '(x − 7)² + (y − 1)² = 25', is_correct: false, explanation: 'This uses the point on the circle as the center instead of the given center (3, −2).', option_order: 4 },
    { question_id: q10Id, option_text: '(x − 3)² + (y + 2)² = 13', is_correct: false, explanation: 'The radius calculation is incorrect. Using the distance formula gives r = 5, so r² = 25.', option_order: 5 }
  ]
};

// Execute the insertion
(async () => {
  const success = await insertLesson(lesson25Data);
  if (success) {
    console.log('\n✅ Lesson 2.5 successfully inserted into Supabase!');
  } else {
    console.log('\n❌ Failed to insert Lesson 2.5');
    process.exit(1);
  }
})();
