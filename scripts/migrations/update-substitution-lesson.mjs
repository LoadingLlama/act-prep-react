import { createClient } from '@supabase/supabase-js';
import dotenv from 'dotenv';
dotenv.config();

const supabase = createClient(
  process.env.REACT_APP_SUPABASE_URL,
  process.env.SUPABASE_SERVICE_ROLE_KEY
);

const newContent = `<h3 style="margin-top: 2rem; margin-bottom: 0.75rem; font-weight: 700; color: #1e40af;">Substitution (Number Substitution Technique)</h3>

<p style="font-size: 16px; line-height: 1.7; margin: 0.5rem 0 1rem 0;">Substitution is one of the most powerful test-taking strategies for the ACT Math Test. This technique allows you to solve difficult algebra questions with variables by <strong style="color: #2563eb; font-weight: 600;">plugging in real numbers</strong>. Rather than working through complex algebraic manipulations, you can turn abstract problems into simple arithmetic.</p>

<p style="font-size: 16px; line-height: 1.7; margin: 0.5rem 0 1rem 0;">This strategy is especially useful when:</p>

<ul style="margin: 0.3rem 0 0.5rem 0; padding-left: 1.5rem; line-height: 1.5;">
  <li style="margin: 0.15rem 0;">The question has variables in the answer choices</li>
  <li style="margin: 0.15rem 0;">You're asked to find an expression "in terms of" certain variables</li>
  <li style="margin: 0.15rem 0;">The algebraic approach seems too complicated</li>
  <li style="margin: 0.15rem 0;">You want to check your algebraic answer</li>
</ul>

<h4 style="margin-top: 1.5rem; margin-bottom: 0.5rem; font-weight: 600; color: #1e40af;">The 4-Step Substitution Process</h4>

<div style="background-color: #eff6ff; border-left: 4px solid #3b82f6; padding: 1rem; margin: 1rem 0; border-radius: 4px;">
  <p style="margin: 0.5rem 0; font-weight: 600;">Step 1: Pick Easy Numbers</p>
  <ul style="margin: 0.3rem 0; padding-left: 1.5rem;">
    <li>Use simple numbers like 2, 3, 4, or 5</li>
    <li><strong>Avoid 0 and 1</strong> as they have special properties that can give false results</li>
    <li>Use 10 for percent problems, 10 or 20 for group size</li>
    <li>Select different numbers for each variable (if x and y, pick x=2 and y=3)</li>
    <li>Follow any rules in the question (if x must be negative and even, pick x=-2)</li>
  </ul>
  
  <p style="margin: 0.5rem 0; font-weight: 600;">Step 2: Write Down Your Numbers</p>
  <p style="margin: 0.3rem 0; padding-left: 1.5rem;">Always write down what you picked to avoid confusion.</p>
  
  <p style="margin: 0.5rem 0; font-weight: 600;">Step 3: Work Through the Question</p>
  <p style="margin: 0.3rem 0; padding-left: 1.5rem;">Use your numbers to solve the problem and find your answer.</p>
  
  <p style="margin: 0.5rem 0; font-weight: 600;">Step 4: Test the Answer Choices</p>
  <p style="margin: 0.3rem 0; padding-left: 1.5rem;">Plug your numbers into each answer choice. The correct answer will match your result from Step 3.</p>
</div>

<h4 style="margin-top: 1.5rem; margin-bottom: 0.5rem; font-weight: 600; color: #1e40af;">Example 1: Algebra with Multiple Variables</h4>

<p style="font-size: 16px; line-height: 1.7; margin: 0.5rem 0 1rem 0;"><strong>Question:</strong> Jeremy has <em>n</em> boxes of candy bars. Each box contains <em>m</em> bars of candy. Jeremy has to sell 70% of his candy bars to make enough money for rent. Which of the following expresses the number of candy bars Jeremy must sell in terms of <em>m</em> and <em>n</em>?</p>

<p style="font-size: 16px; line-height: 1.7; margin: 0.5rem 0 0.5rem 1.5rem;">A. 0.7(<em>m</em> + <em>n</em>)</p>
<p style="font-size: 16px; line-height: 1.7; margin: 0.5rem 0 0.5rem 1.5rem;">B. 70<em>nm</em></p>
<p style="font-size: 16px; line-height: 1.7; margin: 0.5rem 0 0.5rem 1.5rem;">C. <em>nm</em> + <em>m</em></p>
<p style="font-size: 16px; line-height: 1.7; margin: 0.5rem 0 0.5rem 1.5rem;">D. 0.7<em>nm</em></p>

<div style="background-color: #f0fdf4; border-left: 4px solid #22c55e; padding: 1rem; margin: 1rem 0; border-radius: 4px;">
  <p style="margin: 0.5rem 0; font-weight: 600; color: #15803d;">Solution:</p>
  <p style="margin: 0.5rem 0;"><strong>Step 1 & 2:</strong> Pick numbers: <em>n</em> = 2 boxes, <em>m</em> = 5 bars per box</p>
  <p style="margin: 0.5rem 0;"><strong>Step 3:</strong> Jeremy has 2 × 5 = 10 total candy bars. He must sell 70% of 10 = 0.7(10) = <strong>7 candy bars</strong></p>
  <p style="margin: 0.5rem 0;"><strong>Step 4:</strong> Test answer choices with <em>n</em>=2, <em>m</em>=5:</p>
  <ul style="margin: 0.3rem 0; padding-left: 1.5rem;">
    <li>A. 0.7(5 + 2) = 0.7(7) = 4.9 ✗</li>
    <li>B. 70(2)(5) = 700 ✗</li>
    <li>C. (2)(5) + 5 = 15 ✗</li>
    <li>D. 0.7(2)(5) = 7 ✓</li>
  </ul>
  <p style="margin: 0.5rem 0; font-weight: 600;">Answer: D</p>
</div>

<h4 style="margin-top: 1.5rem; margin-bottom: 0.5rem; font-weight: 600; color: #1e40af;">Example 2: Geometry Transformations</h4>

<p style="font-size: 16px; line-height: 1.7; margin: 0.5rem 0 1rem 0;"><strong>Question:</strong> If the length of a rectangle is tripled and the width is halved, how many times larger is the area of the new rectangle than the area of the original rectangle?</p>

<p style="font-size: 16px; line-height: 1.7; margin: 0.5rem 0 0.5rem 1.5rem;">A. 1.5</p>
<p style="font-size: 16px; line-height: 1.7; margin: 0.5rem 0 0.5rem 1.5rem;">B. 2</p>
<p style="font-size: 16px; line-height: 1.7; margin: 0.5rem 0 0.5rem 1.5rem;">C. 3</p>
<p style="font-size: 16px; line-height: 1.7; margin: 0.5rem 0 0.5rem 1.5rem;">D. 4</p>

<div style="background-color: #f0fdf4; border-left: 4px solid #22c55e; padding: 1rem; margin: 1rem 0; border-radius: 4px;">
  <p style="margin: 0.5rem 0; font-weight: 600; color: #15803d;">Solution:</p>
  <p style="margin: 0.5rem 0;"><strong>Step 1 & 2:</strong> Pick length = 4, width = 2</p>
  <p style="margin: 0.5rem 0;"><strong>Original rectangle:</strong> Area = 4 × 2 = 8</p>
  <p style="margin: 0.5rem 0;"><strong>New rectangle:</strong></p>
  <ul style="margin: 0.3rem 0; padding-left: 1.5rem;">
    <li>Length tripled: 4 × 3 = 12</li>
    <li>Width halved: 2 ÷ 2 = 1</li>
    <li>New area: 12 × 1 = 12</li>
  </ul>
  <p style="margin: 0.5rem 0;"><strong>Comparison:</strong> 12 ÷ 8 = 1.5 times larger</p>
  <p style="margin: 0.5rem 0; font-weight: 600;">Answer: A</p>
</div>

<h4 style="margin-top: 1.5rem; margin-bottom: 0.5rem; font-weight: 600; color: #1e40af;">Example 3: Trigonometry with Calculator</h4>

<p style="font-size: 16px; line-height: 1.7; margin: 0.5rem 0 1rem 0;"><strong>Question:</strong> If cos(2<em>x</em>°) = <em>a</em>, which of the following must be true for all values of <em>x</em>, in degrees?</p>

<p style="font-size: 16px; line-height: 1.7; margin: 0.5rem 0 0.5rem 1.5rem;">A. sin(2<em>x</em>°) = <em>a</em></p>
<p style="font-size: 16px; line-height: 1.7; margin: 0.5rem 0 0.5rem 1.5rem;">B. sin(<em>x</em>° + 90°) = <em>a</em></p>
<p style="font-size: 16px; line-height: 1.7; margin: 0.5rem 0 0.5rem 1.5rem;">C. cos(90° - 2<em>x</em>°) = <em>a</em></p>
<p style="font-size: 16px; line-height: 1.7; margin: 0.5rem 0 0.5rem 1.5rem;">D. sin(90° - 2<em>x</em>°) = <em>a</em></p>

<div style="background-color: #f0fdf4; border-left: 4px solid #22c55e; padding: 1rem; margin: 1rem 0; border-radius: 4px;">
  <p style="margin: 0.5rem 0; font-weight: 600; color: #15803d;">Solution:</p>
  <p style="margin: 0.5rem 0;"><strong>Step 1 & 2:</strong> Pick <em>x</em> = 10°</p>
  <p style="margin: 0.5rem 0;"><strong>Step 3:</strong> cos(20°) = 0.9397 (use calculator in degree mode)</p>
  <p style="margin: 0.5rem 0;">So <em>a</em> = 0.9397</p>
  <p style="margin: 0.5rem 0;"><strong>Step 4:</strong> Test answer choices with <em>x</em>=10°:</p>
  <ul style="margin: 0.3rem 0; padding-left: 1.5rem;">
    <li>A. sin(20°) = 0.3420 ✗</li>
    <li>B. sin(100°) = 0.9848 ✗</li>
    <li>C. cos(70°) = 0.3420 ✗</li>
    <li>D. sin(70°) = 0.9397 ✓</li>
  </ul>
  <p style="margin: 0.5rem 0; font-weight: 600;">Answer: D</p>
  <p style="margin: 0.5rem 0; font-style: italic; color: #666;">Note: Make sure your calculator is in degree mode!</p>
</div>

<h4 style="margin-top: 1.5rem; margin-bottom: 0.5rem; font-weight: 600; color: #1e40af;">Key Tips for Success</h4>

<ul style="margin: 0.3rem 0 0.5rem 0; padding-left: 1.5rem; line-height: 1.5;">
  <li style="margin: 0.15rem 0;"><strong>Time Saver:</strong> Substitution often solves problems faster than pure algebra</li>
  <li style="margin: 0.15rem 0;"><strong>Confidence Check:</strong> Even if you solve algebraically, use substitution to verify your answer</li>
  <li style="margin: 0.15rem 0;"><strong>Consistency:</strong> This method works for any numbers you choose (as long as they follow the rules)</li>
  <li style="margin: 0.15rem 0;"><strong>Calculator Friendly:</strong> Leverage your calculator for complex calculations</li>
</ul>

<div style="background-color: #fef3c7; border-left: 4px solid #f59e0b; padding: 1rem; margin: 1rem 0; border-radius: 4px;">
  <p style="margin: 0.5rem 0; font-weight: 600; color: #92400e;">⚠️ Common Mistakes to Avoid</p>
  <ul style="margin: 0.3rem 0; padding-left: 1.5rem;">
    <li>Don't use 0 or 1 - they can make multiple answer choices seem correct</li>
    <li>Don't pick the same number for different variables</li>
    <li>Don't forget to write down which number represents which variable</li>
    <li>Don't skip checking all answer choices - sometimes more than one might seem to work initially</li>
  </ul>
</div>`;

async function updateLesson() {
  console.log('Updating Substitution lesson...\n');

  const { data, error } = await supabase
    .from('lessons')
    .update({
      content: newContent,
      updated_at: new Date().toISOString()
    })
    .eq('lesson_key', 'substitution');

  if (error) {
    console.log('Error updating lesson: ' + error.message);
  } else {
    console.log('✅ Successfully updated substitution lesson content!');
    console.log('New content length: ' + newContent.length + ' characters');
  }
}

updateLesson().catch(console.error);
