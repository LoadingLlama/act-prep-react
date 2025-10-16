const { insertLesson } = require('./generate-and-insert-lesson');
const { v4: uuidv4 } = require('uuid');

// Generate UUIDs for lesson 3.1
const lessonId = uuidv4();
const mainSectionId = uuidv4();
const quizId = uuidv4();

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

const lesson31Data = {
  metadata: {
    id: lessonId,
    lesson_key: '3.1',
    title: 'Topic 3.1 - Solving Linear Equations and Inequalities',
    subject: 'math',
    category: 'Algebra Fundamentals',
    difficulty_level: 1,
    duration_minutes: 35,
    order_index: 31,
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
        content: `<p style="font-size: 16px; line-height: 1.7; margin: 0.5rem 0 1rem 0;">Solving equations and inequalities is the cornerstone of algebra and appears on every ACT. You'll see <strong style="color: #2563eb; font-weight: 600; text-decoration: underline;">linear equations</strong> and <strong style="color: #2563eb; font-weight: 600; text-decoration: underline;">inequalities</strong> in at least 8-12 questions per test. Mastering these techniques will give you a strong foundation for all ACT algebra questions.</p>

<h3 style="margin-top: 5rem; margin-bottom: 0.75rem; font-weight: 700;">1. Solving One-Step and Two-Step Equations</h3>

<p style="font-size: 16px; line-height: 1.7; margin: 0.5rem 0 1rem 0;">The simplest equations require only one or two operations to isolate the variable.</p>

<h4 style="margin-top: 2rem; margin-bottom: 0.3rem; font-weight: 400;">One-Step Equations</h4>

<ul style="margin: 0.3rem 0 0.5rem 0; padding-left: 1.5rem; line-height: 1.5;">
  <li style="margin: 0.15rem 0;"><strong>Addition/Subtraction:</strong> x + 5 = 12 → x = 7</li>
  <li style="margin: 0.15rem 0;"><strong>Multiplication/Division:</strong> 3x = 15 → x = 5</li>
  <li style="margin: 0.15rem 0;"><strong>Key principle:</strong> Perform the inverse operation to both sides</li>
</ul>

<h4 style="margin-top: 2rem; margin-bottom: 0.3rem; font-weight: 400;">Two-Step Equations</h4>

<ul style="margin: 0.3rem 0 0.5rem 0; padding-left: 1.5rem; line-height: 1.5;">
  <li style="margin: 0.15rem 0;"><strong>Standard form:</strong> ax + b = c</li>
  <li style="margin: 0.15rem 0;"><strong>Step 1:</strong> Subtract/add to eliminate the constant term</li>
  <li style="margin: 0.15rem 0;"><strong>Step 2:</strong> Divide/multiply to isolate the variable</li>
  <li style="margin: 0.15rem 0;"><strong>Example:</strong> 2x + 7 = 19
    <ul style="margin: 0.15rem 0 0.15rem 0; padding-left: 1.5rem;">
      <li>Subtract 7: 2x = 12</li>
      <li>Divide by 2: x = 6</li>
    </ul>
  </li>
</ul>

<h4 style="margin: 2rem 0 1rem 0; padding-left: 0.75rem; border-left: 4px solid #b91c1c; color: #000000; font-weight: 700;">Example 1: Two-Step Equation</h4>

<p style="font-size: 16px; line-height: 1.7; margin: 0.5rem 0 1rem 0;">Solve for x: 5x − 8 = 27</p>

<p style="margin: 1.5rem 0 0.75rem 0;"><strong>Solution:</strong></p>

<ul style="margin: 0.3rem 0 0.5rem 0; padding-left: 1.5rem; line-height: 1.5;">
  <li style="margin: 0.15rem 0;">Step 1: Add 8 to both sides → 5x = 35</li>
  <li style="margin: 0.15rem 0;">Step 2: Divide both sides by 5 → x = 7</li>
</ul>

<h3 style="margin-top: 5rem; margin-bottom: 0.75rem; font-weight: 700;">2. Multi-Step Equations</h3>

<p style="font-size: 16px; line-height: 1.7; margin: 0.5rem 0 1rem 0;">More complex equations require combining like terms, using the distributive property, or dealing with fractions.</p>

<h4 style="margin-top: 2rem; margin-bottom: 0.3rem; font-weight: 400;">Equations with Variables on Both Sides</h4>

<ul style="margin: 0.3rem 0 0.5rem 0; padding-left: 1.5rem; line-height: 1.5;">
  <li style="margin: 0.15rem 0;"><strong>Goal:</strong> Get all variable terms on one side, constants on the other</li>
  <li style="margin: 0.15rem 0;"><strong>Example:</strong> 3x + 5 = x + 13
    <ul style="margin: 0.15rem 0 0.15rem 0; padding-left: 1.5rem;">
      <li>Subtract x from both sides: 2x + 5 = 13</li>
      <li>Subtract 5: 2x = 8</li>
      <li>Divide by 2: x = 4</li>
    </ul>
  </li>
</ul>

<h4 style="margin-top: 2rem; margin-bottom: 0.3rem; font-weight: 400;">Using the Distributive Property</h4>

<ul style="margin: 0.3rem 0 0.5rem 0; padding-left: 1.5rem; line-height: 1.5;">
  <li style="margin: 0.15rem 0;"><strong>When you see:</strong> a(b + c) = d</li>
  <li style="margin: 0.15rem 0;"><strong>Distribute first:</strong> ab + ac = d</li>
  <li style="margin: 0.15rem 0;"><strong>Example:</strong> 3(x + 4) = 21
    <ul style="margin: 0.15rem 0 0.15rem 0; padding-left: 1.5rem;">
      <li>Distribute: 3x + 12 = 21</li>
      <li>Subtract 12: 3x = 9</li>
      <li>Divide by 3: x = 3</li>
    </ul>
  </li>
</ul>

<h4 style="margin: 2rem 0 1rem 0; padding-left: 0.75rem; border-left: 4px solid #b91c1c; color: #000000; font-weight: 700;">Example 2: Multi-Step with Distribution</h4>

<p style="font-size: 16px; line-height: 1.7; margin: 0.5rem 0 1rem 0;">Solve: 2(x − 3) + 5 = x + 7</p>

<p style="margin: 1.5rem 0 0.75rem 0;"><strong>Solution:</strong></p>

<ul style="margin: 0.3rem 0 0.5rem 0; padding-left: 1.5rem; line-height: 1.5;">
  <li style="margin: 0.15rem 0;">Distribute: 2x − 6 + 5 = x + 7</li>
  <li style="margin: 0.15rem 0;">Combine like terms: 2x − 1 = x + 7</li>
  <li style="margin: 0.15rem 0;">Subtract x: x − 1 = 7</li>
  <li style="margin: 0.15rem 0;">Add 1: x = 8</li>
</ul>

<h3 style="margin-top: 5rem; margin-bottom: 0.75rem; font-weight: 700;">3. Equations with Fractions</h3>

<p style="font-size: 16px; line-height: 1.7; margin: 0.5rem 0 1rem 0;">Fractional equations can be solved by <strong style="color: #2563eb; font-weight: 600; text-decoration: underline;">clearing the fractions</strong> first.</p>

<h4 style="margin-top: 2rem; margin-bottom: 0.3rem; font-weight: 400;">Method: Multiply by the LCD</h4>

<ul style="margin: 0.3rem 0 0.5rem 0; padding-left: 1.5rem; line-height: 1.5;">
  <li style="margin: 0.15rem 0;"><strong>Find the LCD</strong> (Least Common Denominator) of all fractions</li>
  <li style="margin: 0.15rem 0;"><strong>Multiply every term</strong> by the LCD to eliminate fractions</li>
  <li style="margin: 0.15rem 0;"><strong>Solve the resulting equation</strong></li>
  <li style="margin: 0.15rem 0;"><strong>Example:</strong> (x/2) + 3 = 7
    <ul style="margin: 0.15rem 0 0.15rem 0; padding-left: 1.5rem;">
      <li>Multiply everything by 2: x + 6 = 14</li>
      <li>Subtract 6: x = 8</li>
    </ul>
  </li>
</ul>

<h3 style="margin-top: 5rem; margin-bottom: 0.75rem; font-weight: 700;">4. Linear Inequalities</h3>

<p style="font-size: 16px; line-height: 1.7; margin: 0.5rem 0 1rem 0;">Inequalities work exactly like equations, with ONE crucial difference.</p>

<h4 style="margin-top: 2rem; margin-bottom: 0.3rem; font-weight: 400;">The Golden Rule of Inequalities</h4>

<ul style="margin: 0.3rem 0 0.5rem 0; padding-left: 1.5rem; line-height: 1.5;">
  <li style="margin: 0.15rem 0;"><strong style="color: #dc2626;">FLIP THE INEQUALITY SIGN</strong> when multiplying or dividing by a negative number</li>
  <li style="margin: 0.15rem 0;">Example: −2x > 6
    <ul style="margin: 0.15rem 0 0.15rem 0; padding-left: 1.5rem;">
      <li>Divide by −2 AND flip the sign: x < −3</li>
    </ul>
  </li>
  <li style="margin: 0.15rem 0;">You do NOT flip when adding or subtracting</li>
</ul>

<h4 style="margin-top: 2rem; margin-bottom: 0.3rem; font-weight: 400;">Inequality Symbols</h4>

<table style="border-collapse: collapse; width: 100%; margin: 1.5rem 0;">
  <thead>
    <tr>
      <th style="border: 1px solid #ddd; padding: 12px; background: #f0f0f0; text-align: left;">Symbol</th>
      <th style="border: 1px solid #ddd; padding: 12px; background: #f0f0f0; text-align: left;">Meaning</th>
      <th style="border: 1px solid #ddd; padding: 12px; background: #f0f0f0; text-align: left;">Example</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td style="border: 1px solid #ddd; padding: 12px;"><strong>&lt;</strong></td>
      <td style="border: 1px solid #ddd; padding: 12px;">Less than</td>
      <td style="border: 1px solid #ddd; padding: 12px;">x < 5 (x is less than 5)</td>
    </tr>
    <tr>
      <td style="border: 1px solid #ddd; padding: 12px;"><strong>&gt;</strong></td>
      <td style="border: 1px solid #ddd; padding: 12px;">Greater than</td>
      <td style="border: 1px solid #ddd; padding: 12px;">x > 3 (x is greater than 3)</td>
    </tr>
    <tr>
      <td style="border: 1px solid #ddd; padding: 12px;"><strong>≤</strong></td>
      <td style="border: 1px solid #ddd; padding: 12px;">Less than or equal to</td>
      <td style="border: 1px solid #ddd; padding: 12px;">x ≤ 7 (x can be 7 or less)</td>
    </tr>
    <tr>
      <td style="border: 1px solid #ddd; padding: 12px;"><strong>≥</strong></td>
      <td style="border: 1px solid #ddd; padding: 12px;">Greater than or equal to</td>
      <td style="border: 1px solid #ddd; padding: 12px;">x ≥ 2 (x can be 2 or more)</td>
    </tr>
  </tbody>
</table>

<h4 style="margin: 2rem 0 1rem 0; padding-left: 0.75rem; border-left: 4px solid #b91c1c; color: #000000; font-weight: 700;">Example 3: Solving an Inequality</h4>

<p style="font-size: 16px; line-height: 1.7; margin: 0.5rem 0 1rem 0;">Solve: −3x + 7 ≤ 22</p>

<p style="margin: 1.5rem 0 0.75rem 0;"><strong>Solution:</strong></p>

<ul style="margin: 0.3rem 0 0.5rem 0; padding-left: 1.5rem; line-height: 1.5;">
  <li style="margin: 0.15rem 0;">Subtract 7: −3x ≤ 15</li>
  <li style="margin: 0.15rem 0;">Divide by −3 and FLIP: x ≥ −5</li>
</ul>

<h3 style="margin-top: 5rem; margin-bottom: 0.75rem; font-weight: 700;">5. Compound Inequalities</h3>

<p style="font-size: 16px; line-height: 1.7; margin: 0.5rem 0 1rem 0;"><strong style="color: #2563eb; font-weight: 600; text-decoration: underline;">Compound inequalities</strong> combine two inequalities with "and" or "or".</p>

<h4 style="margin-top: 2rem; margin-bottom: 0.3rem; font-weight: 400;">"And" Compound Inequalities</h4>

<ul style="margin: 0.3rem 0 0.5rem 0; padding-left: 1.5rem; line-height: 1.5;">
  <li style="margin: 0.15rem 0;"><strong>Form:</strong> a < x < b</li>
  <li style="margin: 0.15rem 0;"><strong>Meaning:</strong> x is between a and b</li>
  <li style="margin: 0.15rem 0;"><strong>Example:</strong> −2 < x ≤ 5
    <ul style="margin: 0.15rem 0 0.15rem 0; padding-left: 1.5rem;">
      <li>x must be greater than −2 AND less than or equal to 5</li>
      <li>Solutions: all numbers between −2 and 5, including 5</li>
    </ul>
  </li>
</ul>

<h4 style="margin-top: 2rem; margin-bottom: 0.3rem; font-weight: 400;">"Or" Compound Inequalities</h4>

<ul style="margin: 0.3rem 0 0.5rem 0; padding-left: 1.5rem; line-height: 1.5;">
  <li style="margin: 0.15rem 0;"><strong>Form:</strong> x < a OR x > b</li>
  <li style="margin: 0.15rem 0;"><strong>Meaning:</strong> x is outside the range between a and b</li>
  <li style="margin: 0.15rem 0;"><strong>Example:</strong> x < −3 OR x > 2
    <ul style="margin: 0.15rem 0 0.15rem 0; padding-left: 1.5rem;">
      <li>Solutions: all numbers less than −3 or greater than 2</li>
    </ul>
  </li>
</ul>

<h4 style="margin: 2rem 0 1rem 0; padding-left: 0.75rem; border-left: 4px solid #b91c1c; color: #000000; font-weight: 700;">Example 4: Compound Inequality</h4>

<p style="font-size: 16px; line-height: 1.7; margin: 0.5rem 0 1rem 0;">Solve: −1 ≤ 2x + 3 < 9</p>

<p style="margin: 1.5rem 0 0.75rem 0;"><strong>Solution:</strong></p>

<ul style="margin: 0.3rem 0 0.5rem 0; padding-left: 1.5rem; line-height: 1.5;">
  <li style="margin: 0.15rem 0;">Subtract 3 from all parts: −4 ≤ 2x < 6</li>
  <li style="margin: 0.15rem 0;">Divide all parts by 2: −2 ≤ x < 3</li>
</ul>

<h3 style="margin-top: 5rem; margin-bottom: 0.75rem; font-weight: 700;">6. Absolute Value Equations</h3>

<p style="font-size: 16px; line-height: 1.7; margin: 0.5rem 0 1rem 0;"><strong style="color: #2563eb; font-weight: 600; text-decoration: underline;">Absolute value</strong> measures distance from zero, so |x| = 5 has two solutions: x = 5 or x = −5.</p>

<h4 style="margin-top: 2rem; margin-bottom: 0.3rem; font-weight: 400;">Solving |x + a| = b</h4>

<ul style="margin: 0.3rem 0 0.5rem 0; padding-left: 1.5rem; line-height: 1.5;">
  <li style="margin: 0.15rem 0;"><strong>Step 1:</strong> Isolate the absolute value</li>
  <li style="margin: 0.15rem 0;"><strong>Step 2:</strong> Create two equations:
    <ul style="margin: 0.15rem 0 0.15rem 0; padding-left: 1.5rem;">
      <li>x + a = b (positive case)</li>
      <li>x + a = −b (negative case)</li>
    </ul>
  </li>
  <li style="margin: 0.15rem 0;"><strong>Step 3:</strong> Solve both equations</li>
</ul>

<h4 style="margin: 2rem 0 1rem 0; padding-left: 0.75rem; border-left: 4px solid #b91c1c; color: #000000; font-weight: 700;">Example 5: Absolute Value</h4>

<p style="font-size: 16px; line-height: 1.7; margin: 0.5rem 0 1rem 0;">Solve: |x − 4| = 7</p>

<p style="margin: 1.5rem 0 0.75rem 0;"><strong>Solution:</strong></p>

<ul style="margin: 0.3rem 0 0.5rem 0; padding-left: 1.5rem; line-height: 1.5;">
  <li style="margin: 0.15rem 0;">Case 1: x − 4 = 7 → x = 11</li>
  <li style="margin: 0.15rem 0;">Case 2: x − 4 = −7 → x = −3</li>
  <li style="margin: 0.15rem 0;">Solutions: x = 11 or x = −3</li>
</ul>

<h3 style="margin-top: 5rem; margin-bottom: 0.75rem; font-weight: 700;">7. ACT Strategy Tips</h3>

<ul style="margin: 0.3rem 0 0.5rem 0; padding-left: 1.5rem; line-height: 1.5;">
  <li style="margin: 0.15rem 0;"><strong>Work systematically:</strong> Perform the same operation on both sides</li>
  <li style="margin: 0.15rem 0;"><strong>Check your answer:</strong> Plug it back into the original equation</li>
  <li style="margin: 0.15rem 0;"><strong>Remember to flip:</strong> When dividing/multiplying by negative in inequalities</li>
  <li style="margin: 0.15rem 0;"><strong>Absolute value = two solutions:</strong> Always solve both cases</li>
  <li style="margin: 0.15rem 0;"><strong>Fractions:</strong> Clear them by multiplying by LCD first</li>
</ul>

<p style="height: 1px; margin: 0; padding: 0;"></p>

<h3 style="margin-top: 5rem; margin-bottom: 0.75rem; font-weight: 700; visibility: hidden; height: 0; margin: 0; padding: 0; overflow: hidden;">.</h3>

<h3 style="color: #2e7d32; font-size: 1.4rem; font-weight: 700; margin: 3rem 0 1.5rem 0;">Key Takeaways</h3>

<ul style="list-style: none; padding: 0; margin: 0;">
  <li style="margin-bottom: 0.8rem; color: #2e7d32; font-size: 16px; line-height: 1.6;">
    <span style="color: #4caf50; font-weight: bold; margin-right: 0.5rem;">✓</span>Use inverse operations to isolate variables
  </li>
  <li style="margin-bottom: 0.8rem; color: #2e7d32; font-size: 16px; line-height: 1.6;">
    <span style="color: #4caf50; font-weight: bold; margin-right: 0.5rem;">✓</span>Flip inequality signs when multiplying/dividing by negatives
  </li>
  <li style="margin-bottom: 0.8rem; color: #2e7d32; font-size: 16px; line-height: 1.6;">
    <span style="color: #4caf50; font-weight: bold; margin-right: 0.5rem;">✓</span>Absolute value equations have two solutions
  </li>
  <li style="margin-bottom: 0.8rem; color: #2e7d32; font-size: 16px; line-height: 1.6;">
    <span style="color: #4caf50; font-weight: bold; margin-right: 0.5rem;">✓</span>Clear fractions by multiplying by LCD
  </li>
  <li style="margin-bottom: 0.8rem; color: #2e7d32; font-size: 16px; line-height: 1.6;">
    <span style="color: #4caf50; font-weight: bold; margin-right: 0.5rem;">✓</span>Always check your solutions by substituting back
  </li>
</ul>`,
        order_index: 1
      }
    ]
  },

  quiz: {
    id: quizId,
    lesson_id: lessonId,
    title: 'Mastery Check: Solving Linear Equations and Inequalities',
    intro: 'Test your understanding of linear equations and inequalities with these 10 ACT-style questions.',
    quiz_type: 'mastery_check',
    position: 1,
    is_required: true
  },

  questions: [
    // Easy Questions (1-3)
    {
      id: q1Id,
      quiz_id: quizId,
      question_text: 'Solve for x: 2x + 5 = 17',
      question_order: 1
    },
    {
      id: q2Id,
      quiz_id: quizId,
      question_text: 'Solve for x: x − 8 = 3',
      question_order: 2
    },
    {
      id: q3Id,
      quiz_id: quizId,
      question_text: 'Solve for x: 3x = 21',
      question_order: 3
    },
    // Medium Questions (4-7)
    {
      id: q4Id,
      quiz_id: quizId,
      question_text: 'Solve for x: 4x − 7 = 2x + 9',
      question_order: 4
    },
    {
      id: q5Id,
      quiz_id: quizId,
      question_text: 'Solve for x: 2(x + 3) = 18',
      question_order: 5
    },
    {
      id: q6Id,
      quiz_id: quizId,
      question_text: 'Solve for x: −5x > 20',
      question_order: 6
    },
    {
      id: q7Id,
      quiz_id: quizId,
      question_text: 'Solve for x: x/4 + 2 = 7',
      question_order: 7
    },
    // Hard Questions (8-10)
    {
      id: q8Id,
      quiz_id: quizId,
      question_text: 'Solve for x: 3(x − 2) + 4 = 2x + 5',
      question_order: 8
    },
    {
      id: q9Id,
      quiz_id: quizId,
      question_text: 'Solve for x: |x + 3| = 8',
      question_order: 9
    },
    {
      id: q10Id,
      quiz_id: quizId,
      question_text: 'Solve for x: −2 ≤ 3x − 5 < 10',
      question_order: 10
    }
  ],

  options: [
    // Q1 options
    { question_id: q1Id, option_text: '6', is_correct: true, explanation: 'Subtract 5: 2x = 12, then divide by 2: x = 6', option_order: 1 },
    { question_id: q1Id, option_text: '5', is_correct: false, explanation: null, option_order: 2 },
    { question_id: q1Id, option_text: '7', is_correct: false, explanation: null, option_order: 3 },
    { question_id: q1Id, option_text: '8', is_correct: false, explanation: null, option_order: 4 },
    { question_id: q1Id, option_text: '11', is_correct: false, explanation: null, option_order: 5 },

    // Q2 options
    { question_id: q2Id, option_text: '11', is_correct: true, explanation: 'Add 8 to both sides: x = 3 + 8 = 11', option_order: 1 },
    { question_id: q2Id, option_text: '−5', is_correct: false, explanation: null, option_order: 2 },
    { question_id: q2Id, option_text: '5', is_correct: false, explanation: null, option_order: 3 },
    { question_id: q2Id, option_text: '−11', is_correct: false, explanation: null, option_order: 4 },
    { question_id: q2Id, option_text: '24', is_correct: false, explanation: null, option_order: 5 },

    // Q3 options
    { question_id: q3Id, option_text: '7', is_correct: true, explanation: 'Divide both sides by 3: x = 21/3 = 7', option_order: 1 },
    { question_id: q3Id, option_text: '6', is_correct: false, explanation: null, option_order: 2 },
    { question_id: q3Id, option_text: '18', is_correct: false, explanation: null, option_order: 3 },
    { question_id: q3Id, option_text: '63', is_correct: false, explanation: null, option_order: 4 },
    { question_id: q3Id, option_text: '24', is_correct: false, explanation: null, option_order: 5 },

    // Q4 options
    { question_id: q4Id, option_text: '8', is_correct: true, explanation: 'Subtract 2x: 2x − 7 = 9. Add 7: 2x = 16. Divide by 2: x = 8', option_order: 1 },
    { question_id: q4Id, option_text: '4', is_correct: false, explanation: null, option_order: 2 },
    { question_id: q4Id, option_text: '2', is_correct: false, explanation: null, option_order: 3 },
    { question_id: q4Id, option_text: '16', is_correct: false, explanation: null, option_order: 4 },
    { question_id: q4Id, option_text: '1', is_correct: false, explanation: null, option_order: 5 },

    // Q5 options
    { question_id: q5Id, option_text: '6', is_correct: true, explanation: 'Distribute: 2x + 6 = 18. Subtract 6: 2x = 12. Divide by 2: x = 6', option_order: 1 },
    { question_id: q5Id, option_text: '9', is_correct: false, explanation: null, option_order: 2 },
    { question_id: q5Id, option_text: '12', is_correct: false, explanation: null, option_order: 3 },
    { question_id: q5Id, option_text: '3', is_correct: false, explanation: null, option_order: 4 },
    { question_id: q5Id, option_text: '15', is_correct: false, explanation: null, option_order: 5 },

    // Q6 options
    { question_id: q6Id, option_text: 'x < −4', is_correct: true, explanation: 'Divide by −5 and FLIP the inequality sign: x < −4', option_order: 1 },
    { question_id: q6Id, option_text: 'x > −4', is_correct: false, explanation: null, option_order: 2 },
    { question_id: q6Id, option_text: 'x < 4', is_correct: false, explanation: null, option_order: 3 },
    { question_id: q6Id, option_text: 'x > 4', is_correct: false, explanation: null, option_order: 4 },
    { question_id: q6Id, option_text: 'x < −100', is_correct: false, explanation: null, option_order: 5 },

    // Q7 options
    { question_id: q7Id, option_text: '20', is_correct: true, explanation: 'Subtract 2: x/4 = 5. Multiply by 4: x = 20', option_order: 1 },
    { question_id: q7Id, option_text: '5', is_correct: false, explanation: null, option_order: 2 },
    { question_id: q7Id, option_text: '36', is_correct: false, explanation: null, option_order: 3 },
    { question_id: q7Id, option_text: '9', is_correct: false, explanation: null, option_order: 4 },
    { question_id: q7Id, option_text: '28', is_correct: false, explanation: null, option_order: 5 },

    // Q8 options
    { question_id: q8Id, option_text: '7', is_correct: true, explanation: 'Distribute: 3x − 6 + 4 = 2x + 5 → 3x − 2 = 2x + 5. Subtract 2x: x − 2 = 5. Add 2: x = 7', option_order: 1 },
    { question_id: q8Id, option_text: '3', is_correct: false, explanation: null, option_order: 2 },
    { question_id: q8Id, option_text: '5', is_correct: false, explanation: null, option_order: 3 },
    { question_id: q8Id, option_text: '11', is_correct: false, explanation: null, option_order: 4 },
    { question_id: q8Id, option_text: '9', is_correct: false, explanation: null, option_order: 5 },

    // Q9 options
    { question_id: q9Id, option_text: 'x = 5 or x = −11', is_correct: true, explanation: 'Case 1: x + 3 = 8 → x = 5. Case 2: x + 3 = −8 → x = −11', option_order: 1 },
    { question_id: q9Id, option_text: 'x = 5 only', is_correct: false, explanation: null, option_order: 2 },
    { question_id: q9Id, option_text: 'x = 11 or x = −5', is_correct: false, explanation: null, option_order: 3 },
    { question_id: q9Id, option_text: 'x = 8 or x = −8', is_correct: false, explanation: null, option_order: 4 },
    { question_id: q9Id, option_text: 'x = −5 only', is_correct: false, explanation: null, option_order: 5 },

    // Q10 options
    { question_id: q10Id, option_text: '1 ≤ x < 5', is_correct: true, explanation: 'Add 5 to all parts: 3 ≤ 3x < 15. Divide all by 3: 1 ≤ x < 5', option_order: 1 },
    { question_id: q10Id, option_text: '−2 ≤ x < 10', is_correct: false, explanation: null, option_order: 2 },
    { question_id: q10Id, option_text: '3 ≤ x < 15', is_correct: false, explanation: null, option_order: 3 },
    { question_id: q10Id, option_text: '−1 ≤ x < 3', is_correct: false, explanation: null, option_order: 4 },
    { question_id: q10Id, option_text: '−7 ≤ x < 5', is_correct: false, explanation: null, option_order: 5 }
  ]
};

// Execute the insertion
(async () => {
  const success = await insertLesson(lesson31Data);
  if (success) {
    console.log('\n✅ Lesson 3.1 successfully inserted into Supabase!');
  } else {
    console.log('\n❌ Failed to insert Lesson 3.1');
    process.exit(1);
  }
})();
