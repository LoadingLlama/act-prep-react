const { insertLesson } = require('./generate-and-insert-lesson');
const { v4: uuidv4 } = require('uuid');

const lessonId = uuidv4();
const mainSectionId = uuidv4();
const quizId = uuidv4();

const lesson32Data = {
  metadata: {
    id: lessonId,
    lesson_key: '3.2',
    title: 'Topic 3.2 - Systems of Equations',
    subject: 'math',
    category: 'Algebra Fundamentals',
    difficulty_level: 2,
    duration_minutes: 40,
    order_index: 32,
    is_published: true
  },

  sections: [{
    id: mainSectionId,
    lesson_id: lessonId,
    section_key: 'main_content',
    title: 'Main Content',
    section_type: 'teaching',
    order_index: 1
  }],

  content: {
    [mainSectionId]: [{
      id: uuidv4(),
      section_id: mainSectionId,
      content_type: 'html',
      content: `<p style="font-size: 16px; line-height: 1.7; margin: 0.5rem 0 1rem 0;">A <strong style="color: #2563eb; font-weight: 600; text-decoration: underline;">system of equations</strong> consists of two or more equations that share variables. On the ACT, you'll need to find values that satisfy all equations simultaneously. This lesson covers the three primary methods: <strong style="color: #2563eb; font-weight: 600; text-decoration: underline;">substitution</strong>, <strong style="color: #2563eb; font-weight: 600; text-decoration: underline;">elimination</strong>, and <strong style="color: #2563eb; font-weight: 600; text-decoration: underline;">graphing</strong>.</p>

<h3 style="margin-top: 5rem; margin-bottom: 0.75rem; font-weight: 700;">1. Understanding Systems of Equations</h3>

<p style="font-size: 16px; line-height: 1.7; margin: 0.5rem 0 1rem 0;">A system of two linear equations typically looks like this:</p>

<p style="font-family: 'Times New Roman', Times, Georgia, serif; font-size: 18px; text-align: center; margin: 1.5rem 0;">
  2x + y = 7<br>
  x − y = 2
</p>

<p style="font-size: 16px; line-height: 1.7; margin: 0.5rem 0 1rem 0;">The <strong>solution</strong> is the (x, y) pair that makes both equations true simultaneously.</p>

<h3 style="margin-top: 5rem; margin-bottom: 0.75rem; font-weight: 700;">2. Method 1: Substitution</h3>

<p style="font-size: 16px; line-height: 1.7; margin: 0.5rem 0 1rem 0;"><strong style="color: #2563eb; font-weight: 600; text-decoration: underline;">Substitution</strong> works best when one equation is already solved for a variable (or easily can be).</p>

<h4 style="margin-top: 2rem; margin-bottom: 0.3rem; font-weight: 400;">Steps for Substitution</h4>

<ul style="margin: 0.3rem 0 0.5rem 0; padding-left: 1.5rem; line-height: 1.5;">
  <li style="margin: 0.15rem 0;"><strong>Step 1:</strong> Solve one equation for one variable</li>
  <li style="margin: 0.15rem 0;"><strong>Step 2:</strong> Substitute that expression into the other equation</li>
  <li style="margin: 0.15rem 0;"><strong>Step 3:</strong> Solve for the remaining variable</li>
  <li style="margin: 0.15rem 0;"><strong>Step 4:</strong> Substitute back to find the other variable</li>
</ul>

<h4 style="margin: 2rem 0 1rem 0; padding-left: 0.75rem; border-left: 4px solid #b91c1c; color: #000000; font-weight: 700;">Example 1: Substitution Method</h4>

<p style="font-size: 16px; line-height: 1.7; margin: 0.5rem 0 1rem 0;">Solve the system:<br>
y = 3x − 1<br>
2x + y = 9</p>

<p style="margin: 1.5rem 0 0.75rem 0;"><strong>Solution:</strong></p>

<ul style="margin: 0.3rem 0 0.5rem 0; padding-left: 1.5rem; line-height: 1.5;">
  <li style="margin: 0.15rem 0;">The first equation is already solved for y</li>
  <li style="margin: 0.15rem 0;">Substitute y = 3x − 1 into the second equation:</li>
  <li style="margin: 0.15rem 0;">2x + (3x − 1) = 9</li>
  <li style="margin: 0.15rem 0;">5x − 1 = 9</li>
  <li style="margin: 0.15rem 0;">5x = 10</li>
  <li style="margin: 0.15rem 0;">x = 2</li>
  <li style="margin: 0.15rem 0;">Substitute back: y = 3(2) − 1 = 5</li>
  <li style="margin: 0.15rem 0;"><strong>Solution: (2, 5)</strong></li>
</ul>

<h3 style="margin-top: 5rem; margin-bottom: 0.75rem; font-weight: 700;">3. Method 2: Elimination (Addition Method)</h3>

<p style="font-size: 16px; line-height: 1.7; margin: 0.5rem 0 1rem 0;"><strong style="color: #2563eb; font-weight: 600; text-decoration: underline;">Elimination</strong> involves adding or subtracting equations to eliminate one variable.</p>

<h4 style="margin-top: 2rem; margin-bottom: 0.3rem; font-weight: 400;">Steps for Elimination</h4>

<ul style="margin: 0.3rem 0 0.5rem 0; padding-left: 1.5rem; line-height: 1.5;">
  <li style="margin: 0.15rem 0;"><strong>Step 1:</strong> Align the equations vertically</li>
  <li style="margin: 0.15rem 0;"><strong>Step 2:</strong> Multiply one or both equations to make coefficients of one variable opposites</li>
  <li style="margin: 0.15rem 0;"><strong>Step 3:</strong> Add the equations to eliminate that variable</li>
  <li style="margin: 0.15rem 0;"><strong>Step 4:</strong> Solve for the remaining variable</li>
  <li style="margin: 0.15rem 0;"><strong>Step 5:</strong> Substitute back to find the other variable</li>
</ul>

<h4 style="margin: 2rem 0 1rem 0; padding-left: 0.75rem; border-left: 4px solid #b91c1c; color: #000000; font-weight: 700;">Example 2: Elimination Method</h4>

<p style="font-size: 16px; line-height: 1.7; margin: 0.5rem 0 1rem 0;">Solve the system:<br>
3x + 2y = 16<br>
5x − 2y = 8</p>

<p style="margin: 1.5rem 0 0.75rem 0;"><strong>Solution:</strong></p>

<ul style="margin: 0.3rem 0 0.5rem 0; padding-left: 1.5rem; line-height: 1.5;">
  <li style="margin: 0.15rem 0;">Notice the y coefficients are already opposites (+2y and −2y)</li>
  <li style="margin: 0.15rem 0;">Add the equations:</li>
  <li style="margin: 0.15rem 0;">3x + 2y = 16</li>
  <li style="margin: 0.15rem 0;">+ 5x − 2y = 8</li>
  <li style="margin: 0.15rem 0;">= 8x = 24</li>
  <li style="margin: 0.15rem 0;">x = 3</li>
  <li style="margin: 0.15rem 0;">Substitute into first equation: 3(3) + 2y = 16</li>
  <li style="margin: 0.15rem 0;">9 + 2y = 16</li>
  <li style="margin: 0.15rem 0;">2y = 7</li>
  <li style="margin: 0.15rem 0;">y = 3.5</li>
  <li style="margin: 0.15rem 0;"><strong>Solution: (3, 3.5)</strong></li>
</ul>

<h4 style="margin: 2rem 0 1rem 0; padding-left: 0.75rem; border-left: 4px solid #b91c1c; color: #000000; font-weight: 700;">Example 3: Elimination with Multiplication</h4>

<p style="font-size: 16px; line-height: 1.7; margin: 0.5rem 0 1rem 0;">Solve the system:<br>
2x + 3y = 8<br>
3x − y = 5</p>

<p style="margin: 1.5rem 0 0.75rem 0;"><strong>Solution:</strong></p>

<ul style="margin: 0.3rem 0 0.5rem 0; padding-left: 1.5rem; line-height: 1.5;">
  <li style="margin: 0.15rem 0;">Multiply second equation by 3 to make y coefficients opposites:</li>
  <li style="margin: 0.15rem 0;">2x + 3y = 8 (unchanged)</li>
  <li style="margin: 0.15rem 0;">9x − 3y = 15 (multiplied by 3)</li>
  <li style="margin: 0.15rem 0;">Add equations:</li>
  <li style="margin: 0.15rem 0;">11x = 23</li>
  <li style="margin: 0.15rem 0;">x = 23/11</li>
  <li style="margin: 0.15rem 0;">Substitute back to find y</li>
</ul>

<h3 style="margin-top: 5rem; margin-bottom: 0.75rem; font-weight: 700;">4. Method 3: Graphing</h3>

<p style="font-size: 16px; line-height: 1.7; margin: 0.5rem 0 1rem 0;">The <strong style="color: #2563eb; font-weight: 600; text-decoration: underline;">graphing method</strong> involves plotting both lines and finding their intersection point.</p>

<ul style="margin: 0.3rem 0 0.5rem 0; padding-left: 1.5rem; line-height: 1.5;">
  <li style="margin: 0.15rem 0;"><strong>Advantage:</strong> Visual and intuitive</li>
  <li style="margin: 0.15rem 0;"><strong>Disadvantage:</strong> Can be imprecise if the solution isn't a clean integer</li>
  <li style="margin: 0.15rem 0;"><strong>Best use:</strong> When you have a graph or calculator available</li>
</ul>

<h3 style="margin-top: 5rem; margin-bottom: 0.75rem; font-weight: 700;">5. Special Cases</h3>

<h4 style="margin-top: 2rem; margin-bottom: 0.3rem; font-weight: 400;">No Solution (Parallel Lines)</h4>

<ul style="margin: 0.3rem 0 0.5rem 0; padding-left: 1.5rem; line-height: 1.5;">
  <li style="margin: 0.15rem 0;">Occurs when lines are parallel (same slope, different y-intercepts)</li>
  <li style="margin: 0.15rem 0;">Example: y = 2x + 3 and y = 2x − 5</li>
  <li style="margin: 0.15rem 0;">When solving, you'll get a false statement like 0 = 8</li>
</ul>

<h4 style="margin-top: 2rem; margin-bottom: 0.3rem; font-weight: 400;">Infinitely Many Solutions (Same Line)</h4>

<ul style="margin: 0.3rem 0 0.5rem 0; padding-left: 1.5rem; line-height: 1.5;">
  <li style="margin: 0.15rem 0;">Occurs when both equations represent the same line</li>
  <li style="margin: 0.15rem 0;">Example: 2x + y = 4 and 4x + 2y = 8</li>
  <li style="margin: 0.15rem 0;">When solving, you'll get a true statement like 0 = 0</li>
</ul>

<h3 style="margin-top: 5rem; margin-bottom: 0.75rem; font-weight: 700;">6. ACT Strategy Tips</h3>

<ul style="margin: 0.3rem 0 0.5rem 0; padding-left: 1.5rem; line-height: 1.5;">
  <li style="margin: 0.15rem 0;"><strong>Choose the right method:</strong> Use substitution if one variable is isolated; use elimination if coefficients are similar</li>
  <li style="margin: 0.15rem 0;"><strong>Check your answer:</strong> Plug the solution into both original equations</li>
  <li style="margin: 0.15rem 0;"><strong>Look for shortcuts:</strong> Sometimes adding equations directly eliminates a variable</li>
  <li style="margin: 0.15rem 0;"><strong>Watch for special cases:</strong> Recognize when there's no solution or infinite solutions</li>
</ul>

<h3 style="color: #2e7d32; font-size: 1.4rem; font-weight: 700; margin: 3rem 0 1.5rem 0;">Key Takeaways</h3>

<ul style="list-style: none; padding: 0; margin: 0;">
  <li style="margin-bottom: 0.8rem; color: #2e7d32; font-size: 16px; line-height: 1.6;">
    <span style="color: #4caf50; font-weight: bold; margin-right: 0.5rem;">✓</span>Substitution: solve for one variable, substitute into other equation
  </li>
  <li style="margin-bottom: 0.8rem; color: #2e7d32; font-size: 16px; line-height: 1.6;">
    <span style="color: #4caf50; font-weight: bold; margin-right: 0.5rem;">✓</span>Elimination: add/subtract equations to eliminate a variable
  </li>
  <li style="margin-bottom: 0.8rem; color: #2e7d32; font-size: 16px; line-height: 1.6;">
    <span style="color: #4caf50; font-weight: bold; margin-right: 0.5rem;">✓</span>Parallel lines = no solution; same line = infinite solutions
  </li>
  <li style="margin-bottom: 0.8rem; color: #2e7d32; font-size: 16px; line-height: 1.6;">
    <span style="color: #4caf50; font-weight: bold; margin-right: 0.5rem;">✓</span>Always verify by substituting back into original equations
  </li>
</ul>`,
        order_index: 1
      }]
  },

  quiz: {
    id: quizId,
    lesson_id: lessonId,
    title: 'Mastery Check: Systems of Equations',
    intro: 'Test your understanding of systems of equations with these 10 ACT-style questions.',
    quiz_type: 'mastery_check',
    position: 1,
    is_required: true
  },

  questions: []
};

// Define questions separately
const q1Id = uuidv4(), q2Id = uuidv4(), q3Id = uuidv4(), q4Id = uuidv4(), q5Id = uuidv4();
const q6Id = uuidv4(), q7Id = uuidv4(), q8Id = uuidv4(), q9Id = uuidv4(), q10Id = uuidv4();

lesson32Data.questions = [
  { id: q1Id, quiz_id: quizId, question_text: 'Solve the system: y = x + 2 and y = 2x − 1. What is the value of x?', question_order: 1 },
  { id: q2Id, quiz_id: quizId, question_text: 'Solve the system: x + y = 10 and x − y = 2. What is the value of x?', question_order: 2 },
  { id: q3Id, quiz_id: quizId, question_text: 'Solve the system: 2x + y = 8 and x = 3. What is the value of y?', question_order: 3 },
  { id: q4Id, quiz_id: quizId, question_text: 'Solve using elimination: 3x + 2y = 12 and 3x − 2y = 6. What is x?', question_order: 4 },
  { id: q5Id, quiz_id: quizId, question_text: 'Solve the system: y = 2x and x + y = 9. What is the solution (x, y)?', question_order: 5 },
  { id: q6Id, quiz_id: quizId, question_text: 'What type of solution does this system have: y = 3x + 1 and y = 3x − 2?', question_order: 6 },
  { id: q7Id, quiz_id: quizId, question_text: 'Solve the system: 2x + 3y = 13 and x − y = 1. What is y?', question_order: 7 },
  { id: q8Id, quiz_id: quizId, question_text: 'Solve: 4x + y = 11 and 2x − y = 1. What is the value of x?', question_order: 8 },
  { id: q9Id, quiz_id: quizId, question_text: 'The system 2x + 4y = 8 and x + 2y = 4 has how many solutions?', question_order: 9 },
  { id: q10Id, quiz_id: quizId, question_text: 'Solve: 5x − 2y = 4 and 3x + 2y = 12. What is x?', question_order: 10 }
];

lesson32Data.options = [
  { question_id: q1Id, option_text: '3', is_correct: true, explanation: 'Set equal: x + 2 = 2x − 1 → 3 = x', option_order: 1 },
  { question_id: q1Id, option_text: '2', is_correct: false, explanation: null, option_order: 2 },
  { question_id: q1Id, option_text: '1', is_correct: false, explanation: null, option_order: 3 },
  { question_id: q1Id, option_text: '4', is_correct: false, explanation: null, option_order: 4 },
  { question_id: q1Id, option_text: '5', is_correct: false, explanation: null, option_order: 5 },

  { question_id: q2Id, option_text: '6', is_correct: true, explanation: 'Add equations: 2x = 12, so x = 6', option_order: 1 },
  { question_id: q2Id, option_text: '4', is_correct: false, explanation: null, option_order: 2 },
  { question_id: q2Id, option_text: '8', is_correct: false, explanation: null, option_order: 3 },
  { question_id: q2Id, option_text: '5', is_correct: false, explanation: null, option_order: 4 },
  { question_id: q2Id, option_text: '10', is_correct: false, explanation: null, option_order: 5 },

  { question_id: q3Id, option_text: '2', is_correct: true, explanation: 'Substitute x = 3: 2(3) + y = 8 → y = 2', option_order: 1 },
  { question_id: q3Id, option_text: '3', is_correct: false, explanation: null, option_order: 2 },
  { question_id: q3Id, option_text: '1', is_correct: false, explanation: null, option_order: 3 },
  { question_id: q3Id, option_text: '4', is_correct: false, explanation: null, option_order: 4 },
  { question_id: q3Id, option_text: '5', is_correct: false, explanation: null, option_order: 5 },

  { question_id: q4Id, option_text: '3', is_correct: true, explanation: 'Add equations: 6x = 18, so x = 3', option_order: 1 },
  { question_id: q4Id, option_text: '2', is_correct: false, explanation: null, option_order: 2 },
  { question_id: q4Id, option_text: '4', is_correct: false, explanation: null, option_order: 3 },
  { question_id: q4Id, option_text: '6', is_correct: false, explanation: null, option_order: 4 },
  { question_id: q4Id, option_text: '1', is_correct: false, explanation: null, option_order: 5 },

  { question_id: q5Id, option_text: '(3, 6)', is_correct: true, explanation: 'Substitute: x + 2x = 9 → 3x = 9 → x = 3, y = 6', option_order: 1 },
  { question_id: q5Id, option_text: '(6, 3)', is_correct: false, explanation: null, option_order: 2 },
  { question_id: q5Id, option_text: '(2, 7)', is_correct: false, explanation: null, option_order: 3 },
  { question_id: q5Id, option_text: '(4, 5)', is_correct: false, explanation: null, option_order: 4 },
  { question_id: q5Id, option_text: '(9, 0)', is_correct: false, explanation: null, option_order: 5 },

  { question_id: q6Id, option_text: 'No solution (parallel lines)', is_correct: true, explanation: 'Same slope but different y-intercepts means parallel lines', option_order: 1 },
  { question_id: q6Id, option_text: 'One solution', is_correct: false, explanation: null, option_order: 2 },
  { question_id: q6Id, option_text: 'Infinite solutions', is_correct: false, explanation: null, option_order: 3 },
  { question_id: q6Id, option_text: 'Two solutions', is_correct: false, explanation: null, option_order: 4 },
  { question_id: q6Id, option_text: 'Cannot determine', is_correct: false, explanation: null, option_order: 5 },

  { question_id: q7Id, option_text: '3', is_correct: true, explanation: 'From x − y = 1: x = y + 1. Substitute: 2(y+1) + 3y = 13 → 5y + 2 = 13 → y = 3', option_order: 1 },
  { question_id: q7Id, option_text: '2', is_correct: false, explanation: null, option_order: 2 },
  { question_id: q7Id, option_text: '4', is_correct: false, explanation: null, option_order: 3 },
  { question_id: q7Id, option_text: '1', is_correct: false, explanation: null, option_order: 4 },
  { question_id: q7Id, option_text: '5', is_correct: false, explanation: null, option_order: 5 },

  { question_id: q8Id, option_text: '2', is_correct: true, explanation: 'Add equations: 6x = 12, so x = 2', option_order: 1 },
  { question_id: q8Id, option_text: '1', is_correct: false, explanation: null, option_order: 2 },
  { question_id: q8Id, option_text: '3', is_correct: false, explanation: null, option_order: 3 },
  { question_id: q8Id, option_text: '4', is_correct: false, explanation: null, option_order: 4 },
  { question_id: q8Id, option_text: '11', is_correct: false, explanation: null, option_order: 5 },

  { question_id: q9Id, option_text: 'Infinitely many', is_correct: true, explanation: 'Second equation is first divided by 2 - same line', option_order: 1 },
  { question_id: q9Id, option_text: 'One', is_correct: false, explanation: null, option_order: 2 },
  { question_id: q9Id, option_text: 'None', is_correct: false, explanation: null, option_order: 3 },
  { question_id: q9Id, option_text: 'Two', is_correct: false, explanation: null, option_order: 4 },
  { question_id: q9Id, option_text: 'Three', is_correct: false, explanation: null, option_order: 5 },

  { question_id: q10Id, option_text: '2', is_correct: true, explanation: 'Add equations: 8x = 16, so x = 2', option_order: 1 },
  { question_id: q10Id, option_text: '1', is_correct: false, explanation: null, option_order: 2 },
  { question_id: q10Id, option_text: '3', is_correct: false, explanation: null, option_order: 3 },
  { question_id: q10Id, option_text: '4', is_correct: false, explanation: null, option_order: 4 },
  { question_id: q10Id, option_text: '0', is_correct: false, explanation: null, option_order: 5 }
];

(async () => {
  const success = await insertLesson(lesson32Data);
  console.log(success ? '\n✅ Lesson 3.2 inserted!' : '\n❌ Failed');
})();
