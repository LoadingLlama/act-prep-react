const { insertLesson } = require('./generate-and-insert-lesson');
const { v4: uuidv4 } = require('uuid');

const lessonId = uuidv4();
const mainSectionId = uuidv4();
const quizId = uuidv4();
const q1=uuidv4(),q2=uuidv4(),q3=uuidv4(),q4=uuidv4(),q5=uuidv4(),q6=uuidv4(),q7=uuidv4(),q8=uuidv4(),q9=uuidv4(),q10=uuidv4();

const lesson = {
  metadata: { id: lessonId, lesson_key: '3.3', title: 'Topic 3.3 - Quadratic Equations and Factoring', subject: 'math', category: 'Algebra Fundamentals', difficulty_level: 2, duration_minutes: 45, order_index: 33, is_published: true },
  sections: [{ id: mainSectionId, lesson_id: lessonId, section_key: 'main_content', title: 'Main Content', section_type: 'teaching', order_index: 1 }],
  content: { [mainSectionId]: [{
    id: uuidv4(), section_id: mainSectionId, content_type: 'html', order_index: 1,
    content: `<p style="font-size: 16px; line-height: 1.7; margin: 0.5rem 0 1rem 0;"><strong style="color: #2563eb; font-weight: 600; text-decoration: underline;">Quadratic equations</strong> are equations where the highest power of the variable is 2. They appear in 5-8 questions on every ACT. Mastering <strong style="color: #2563eb; font-weight: 600; text-decoration: underline;">factoring</strong>, the <strong style="color: #2563eb; font-weight: 600; text-decoration: underline;">quadratic formula</strong>, and <strong style="color: #2563eb; font-weight: 600; text-decoration: underline;">completing the square</strong> is essential for ACT success.</p>

<h3 style="margin-top: 5rem; margin-bottom: 0.75rem; font-weight: 700;">1. Standard Form and Key Features</h3>

<p style="font-size: 16px; line-height: 1.7; margin: 0.5rem 0 1rem 0;">Standard form: <strong>ax² + bx + c = 0</strong></p>
<ul style="margin: 0.3rem 0 0.5rem 0; padding-left: 1.5rem; line-height: 1.5;">
  <li style="margin: 0.15rem 0;"><strong>a</strong> = coefficient of x² (cannot be zero)</li>
  <li style="margin: 0.15rem 0;"><strong>b</strong> = coefficient of x</li>
  <li style="margin: 0.15rem 0;"><strong>c</strong> = constant term</li>
</ul>

<h3 style="margin-top: 5rem; margin-bottom: 0.75rem; font-weight: 700;">2. Factoring Method</h3>

<p style="font-size: 16px; line-height: 1.7; margin: 0.5rem 0 1rem 0;">When a quadratic can be factored, this is usually the fastest method.</p>

<h4 style="margin-top: 2rem; margin-bottom: 0.3rem; font-weight: 400;">Simple Factoring (a = 1)</h4>
<p style="font-size: 16px; line-height: 1.7; margin: 0.5rem 0 1rem 0;">For x² + bx + c = 0, find two numbers that multiply to c and add to b.</p>
<p style="font-size: 16px; line-height: 1.7; margin: 0.5rem 0 1rem 0;">Example: x² + 5x + 6 = 0 → (x + 2)(x + 3) = 0 → x = −2 or x = −3</p>

<h4 style="margin: 2rem 0 1rem 0; padding-left: 0.75rem; border-left: 4px solid #b91c1c; color: #000000; font-weight: 700;">Example 1: Factoring</h4>
<p style="font-size: 16px; line-height: 1.7; margin: 0.5rem 0 1rem 0;">Solve: x² − 7x + 12 = 0</p>
<ul style="margin: 0.3rem 0 0.5rem 0; padding-left: 1.5rem; line-height: 1.5;">
  <li style="margin: 0.15rem 0;">Find two numbers that multiply to 12 and add to −7: −3 and −4</li>
  <li style="margin: 0.15rem 0;">(x − 3)(x − 4) = 0</li>
  <li style="margin: 0.15rem 0;">x = 3 or x = 4</li>
</ul>

<h3 style="margin-top: 5rem; margin-bottom: 0.75rem; font-weight: 700;">3. Quadratic Formula</h3>
<p style="font-family: 'Times New Roman', Times, Georgia, serif; font-size: 20px; text-align: center; margin: 2rem 0;">x = (−b ± √(b² − 4ac)) / 2a</p>
<p style="font-size: 16px; line-height: 1.7; margin: 0.5rem 0 1rem 0;">This works for ANY quadratic equation. Memorize it!</p>

<h4 style="margin: 2rem 0 1rem 0; padding-left: 0.75rem; border-left: 4px solid #b91c1c; color: #000000; font-weight: 700;">Example 2: Quadratic Formula</h4>
<p style="font-size: 16px; line-height: 1.7; margin: 0.5rem 0 1rem 0;">Solve: 2x² + 3x − 5 = 0</p>
<ul style="margin: 0.3rem 0 0.5rem 0; padding-left: 1.5rem; line-height: 1.5;">
  <li style="margin: 0.15rem 0;">a = 2, b = 3, c = −5</li>
  <li style="margin: 0.15rem 0;">x = (−3 ± √(9 + 40)) / 4 = (−3 ± 7) / 4</li>
  <li style="margin: 0.15rem 0;">x = 1 or x = −2.5</li>
</ul>

<h3 style="margin-top: 5rem; margin-bottom: 0.75rem; font-weight: 700;">4. The Discriminant</h3>
<p style="font-size: 16px; line-height: 1.7; margin: 0.5rem 0 1rem 0;"><strong>Discriminant = b² − 4ac</strong> tells you about solutions:</p>
<ul style="margin: 0.3rem 0 0.5rem 0; padding-left: 1.5rem; line-height: 1.5;">
  <li style="margin: 0.15rem 0;">Positive: two real solutions</li>
  <li style="margin: 0.15rem 0;">Zero: one real solution</li>
  <li style="margin: 0.15rem 0;">Negative: no real solutions</li>
</ul>

<h3 style="color: #2e7d32; font-size: 1.4rem; font-weight: 700; margin: 3rem 0 1.5rem 0;">Key Takeaways</h3>
<ul style="list-style: none; padding: 0; margin: 0;">
  <li style="margin-bottom: 0.8rem; color: #2e7d32; font-size: 16px; line-height: 1.6;">
    <span style="color: #4caf50; font-weight: bold; margin-right: 0.5rem;">✓</span>Factor when possible—fastest method
  </li>
  <li style="margin-bottom: 0.8rem; color: #2e7d32; font-size: 16px; line-height: 1.6;">
    <span style="color: #4caf50; font-weight: bold; margin-right: 0.5rem;">✓</span>Quadratic formula works for all quadratics
  </li>
  <li style="margin-bottom: 0.8rem; color: #2e7d32; font-size: 16px; line-height: 1.6;">
    <span style="color: #4caf50; font-weight: bold; margin-right: 0.5rem;">✓</span>Discriminant predicts number of solutions
  </li>
</ul>`
  }]},
  quiz: { id: quizId, lesson_id: lessonId, title: 'Mastery Check: Quadratics', intro: 'Test your understanding.', quiz_type: 'mastery_check', position: 1, is_required: true },
  questions: [
    {id:q1, quiz_id:quizId, question_text:'Solve: x² − 5x + 6 = 0', question_order:1},
    {id:q2, quiz_id:quizId, question_text:'Factor: x² + 7x + 10', question_order:2},
    {id:q3, quiz_id:quizId, question_text:'Solve: x² = 16', question_order:3},
    {id:q4, quiz_id:quizId, question_text:'Use quadratic formula: x² + 4x + 3 = 0', question_order:4},
    {id:q5, quiz_id:quizId, question_text:'What is discriminant of x² + 2x + 5 = 0?', question_order:5},
    {id:q6, quiz_id:quizId, question_text:'Solve: 2x² − 8 = 0', question_order:6},
    {id:q7, quiz_id:quizId, question_text:'Factor: x² − 9', question_order:7},
    {id:q8, quiz_id:quizId, question_text:'Solve: x² + 6x + 9 = 0', question_order:8},
    {id:q9, quiz_id:quizId, question_text:'How many real solutions: x² + x + 1 = 0?', question_order:9},
    {id:q10, quiz_id:quizId, question_text:'Solve: x² − 3x − 10 = 0', question_order:10}
  ],
  options: [
    {question_id:q1,option_text:'x = 2 or x = 3',is_correct:true,explanation:'Factor: (x−2)(x−3)=0',option_order:1},
    {question_id:q1,option_text:'x = −2 or x = −3',is_correct:false,explanation:null,option_order:2},
    {question_id:q1,option_text:'x = 5 or x = 6',is_correct:false,explanation:null,option_order:3},
    {question_id:q1,option_text:'x = 1 or x = 6',is_correct:false,explanation:null,option_order:4},
    {question_id:q1,option_text:'x = −1 or x = −6',is_correct:false,explanation:null,option_order:5},
    
    {question_id:q2,option_text:'(x+2)(x+5)',is_correct:true,explanation:'2×5=10, 2+5=7',option_order:1},
    {question_id:q2,option_text:'(x+1)(x+10)',is_correct:false,explanation:null,option_order:2},
    {question_id:q2,option_text:'(x−2)(x−5)',is_correct:false,explanation:null,option_order:3},
    {question_id:q2,option_text:'(x+7)(x+10)',is_correct:false,explanation:null,option_order:4},
    {question_id:q2,option_text:'Cannot factor',is_correct:false,explanation:null,option_order:5},
    
    {question_id:q3,option_text:'x = 4 or x = −4',is_correct:true,explanation:'√16 = ±4',option_order:1},
    {question_id:q3,option_text:'x = 4 only',is_correct:false,explanation:null,option_order:2},
    {question_id:q3,option_text:'x = 8 or x = −8',is_correct:false,explanation:null,option_order:3},
    {question_id:q3,option_text:'x = 2 or x = −2',is_correct:false,explanation:null,option_order:4},
    {question_id:q3,option_text:'x = 16',is_correct:false,explanation:null,option_order:5},
    
    {question_id:q4,option_text:'x = −1 or x = −3',is_correct:true,explanation:'x = (−4 ± 2)/2 = −1 or −3',option_order:1},
    {question_id:q4,option_text:'x = 1 or x = 3',is_correct:false,explanation:null,option_order:2},
    {question_id:q4,option_text:'x = −1 or x = 3',is_correct:false,explanation:null,option_order:3},
    {question_id:q4,option_text:'x = 1 or x = −3',is_correct:false,explanation:null,option_order:4},
    {question_id:q4,option_text:'x = −4 or x = 3',is_correct:false,explanation:null,option_order:5},
    
    {question_id:q5,option_text:'−16',is_correct:true,explanation:'b²−4ac = 4−20 = −16',option_order:1},
    {question_id:q5,option_text:'16',is_correct:false,explanation:null,option_order:2},
    {question_id:q5,option_text:'−4',is_correct:false,explanation:null,option_order:3},
    {question_id:q5,option_text:'4',is_correct:false,explanation:null,option_order:4},
    {question_id:q5,option_text:'0',is_correct:false,explanation:null,option_order:5},
    
    {question_id:q6,option_text:'x = 2 or x = −2',is_correct:true,explanation:'2x²=8, x²=4, x=±2',option_order:1},
    {question_id:q6,option_text:'x = 4 or x = −4',is_correct:false,explanation:null,option_order:2},
    {question_id:q6,option_text:'x = 2 only',is_correct:false,explanation:null,option_order:3},
    {question_id:q6,option_text:'x = 8',is_correct:false,explanation:null,option_order:4},
    {question_id:q6,option_text:'x = 1 or x = −1',is_correct:false,explanation:null,option_order:5},
    
    {question_id:q7,option_text:'(x+3)(x−3)',is_correct:true,explanation:'Difference of squares',option_order:1},
    {question_id:q7,option_text:'(x+9)(x−9)',is_correct:false,explanation:null,option_order:2},
    {question_id:q7,option_text:'(x−3)(x−3)',is_correct:false,explanation:null,option_order:3},
    {question_id:q7,option_text:'Cannot factor',is_correct:false,explanation:null,option_order:4},
    {question_id:q7,option_text:'(x+3)(x+3)',is_correct:false,explanation:null,option_order:5},
    
    {question_id:q8,option_text:'x = −3',is_correct:true,explanation:'Perfect square: (x+3)²=0',option_order:1},
    {question_id:q8,option_text:'x = 3',is_correct:false,explanation:null,option_order:2},
    {question_id:q8,option_text:'x = −3 or x = 3',is_correct:false,explanation:null,option_order:3},
    {question_id:q8,option_text:'x = −2 or x = −3',is_correct:false,explanation:null,option_order:4},
    {question_id:q8,option_text:'No solution',is_correct:false,explanation:null,option_order:5},
    
    {question_id:q9,option_text:'Zero',is_correct:true,explanation:'Discriminant = 1−4 = −3 (negative)',option_order:1},
    {question_id:q9,option_text:'One',is_correct:false,explanation:null,option_order:2},
    {question_id:q9,option_text:'Two',is_correct:false,explanation:null,option_order:3},
    {question_id:q9,option_text:'Three',is_correct:false,explanation:null,option_order:4},
    {question_id:q9,option_text:'Infinite',is_correct:false,explanation:null,option_order:5},
    
    {question_id:q10,option_text:'x = 5 or x = −2',is_correct:true,explanation:'(x−5)(x+2)=0',option_order:1},
    {question_id:q10,option_text:'x = −5 or x = 2',is_correct:false,explanation:null,option_order:2},
    {question_id:q10,option_text:'x = 3 or x = 10',is_correct:false,explanation:null,option_order:3},
    {question_id:q10,option_text:'x = −3 or x = −10',is_correct:false,explanation:null,option_order:4},
    {question_id:q10,option_text:'x = 1 or x = −10',is_correct:false,explanation:null,option_order:5}
  ]
};

(async()=>{console.log(await insertLesson(lesson)?'✅ 3.3 done':'❌ Failed');})();
