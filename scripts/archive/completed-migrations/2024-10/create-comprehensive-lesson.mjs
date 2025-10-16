import { createClient } from '@supabase/supabase-js';
import * as dotenv from 'dotenv';
import { fileURLToPath } from 'url';
import { dirname, resolve } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
dotenv.config({ path: resolve(__dirname, '../.env') });

const supabase = createClient(process.env.REACT_APP_SUPABASE_URL, process.env.SUPABASE_SERVICE_ROLE_KEY);

const styleTerm = (term) => `<strong style="color: #2563eb; font-weight: 600; text-decoration: underline;">${term}</strong>`;

// Number Substitution Technique comprehensive content
const lessonKey = 'substitution';

const content = `<p style="font-size: 16px; line-height: 1.7; margin: 0.5rem 0 1rem 0;">The ${styleTerm('Number Substitution Technique')}, also called ${styleTerm('plugging in numbers')}, is one of the most versatile problem-solving strategies on the ACT Math test. When you see variables or abstract expressions, you can often simplify the problem by substituting concrete numbers. This transforms complex algebraic problems into simple arithmetic.</p>

<h3 style="margin-top: 5rem; margin-bottom: 0.75rem; font-weight: 700;">1. What Is Backsolving?</h3>

<p style="font-size: 16px; line-height: 1.7; margin: 0.5rem 0 1rem 0;">${styleTerm('Backsolving')} means using the ${styleTerm('answer choices')} to solve the problem. Instead of setting up equations and solving for x, you ${styleTerm('plug in')} each answer choice until you find the one that satisfies the conditions in the problem.</p>

<ul style="margin: 0.3rem 0 0.5rem 0; padding-left: 1.5rem; line-height: 1.5;">
  <li style="margin: 0.15rem 0;">Key advantages:
    <ul style="margin: 0.15rem 0 0.15rem 0; padding-left: 1.5rem;">
      <li>Faster than traditional algebra on many problems</li>
      <li>Less chance of making algebraic mistakes</li>
      <li>Works great when answer choices are concrete numbers</li>
    </ul>
  </li>
  <li style="margin: 0.15rem 0;">When to use it:
    <ul style="margin: 0.15rem 0 0.15rem 0; padding-left: 1.5rem;">
      <li>The problem asks for a specific value</li>
      <li>Answer choices are numbers (not expressions)</li>
      <li>The algebra looks messy or time-consuming</li>
    </ul>
  </li>
</ul>

<h3 style="margin-top: 5rem; margin-bottom: 0.75rem; font-weight: 700;">2. The Backsolving Process</h3>

<p style="font-size: 16px; line-height: 1.7; margin: 0.5rem 0 1rem 0;">Follow these steps to ${styleTerm('backsolve')} efficiently:</p>

<h4 style="margin-top: 2rem; margin-bottom: 0.3rem; font-weight: 400;">Step 1: Start with Choice C</h4>

<ul style="margin: 0.3rem 0 0.5rem 0; padding-left: 1.5rem; line-height: 1.5;">
  <li style="margin: 0.15rem 0;">On the ACT, answer choices are almost always listed in ${styleTerm('ascending order')} (smallest to largest) or ${styleTerm('descending order')} (largest to smallest)
    <ul style="margin: 0.15rem 0 0.15rem 0; padding-left: 1.5rem;">
      <li>Starting with C (the middle value) means you can often eliminate 2-3 choices with one test</li>
      <li>If C is too big, you know D and E are also too big</li>
      <li>If C is too small, you know A and B are also too small</li>
    </ul>
  </li>
</ul>

<h4 style="margin-top: 2rem; margin-bottom: 0.3rem; font-weight: 400;">Step 2: Test the Choice</h4>

<ul style="margin: 0.3rem 0 0.5rem 0; padding-left: 1.5rem; line-height: 1.5;">
  <li style="margin: 0.15rem 0;">Substitute the answer choice into the problem conditions
    <ul style="margin: 0.15rem 0 0.15rem 0; padding-left: 1.5rem;">
      <li>Does it make the equation true?</li>
      <li>Does it satisfy all the constraints?</li>
      <li>Does it produce the correct result?</li>
    </ul>
  </li>
</ul>

<h4 style="margin-top: 2rem; margin-bottom: 0.3rem; font-weight: 400;">Step 3: Adjust as Needed</h4>

<ul style="margin: 0.3rem 0 0.5rem 0; padding-left: 1.5rem; line-height: 1.5;">
  <li style="margin: 0.15rem 0;">If the choice doesn't work:
    <ul style="margin: 0.15rem 0 0.15rem 0; padding-left: 1.5rem;">
      <li>Determine if you need a larger or smaller value</li>
      <li>Test the appropriate remaining choice</li>
      <li>Continue until you find the answer</li>
    </ul>
  </li>
</ul>

<h3 style="margin-top: 5rem; margin-bottom: 0.75rem; font-weight: 700;">3. Classic Backsolving Problems</h3>

<h4 style="margin: 0 0 1rem 0; padding-left: 0.75rem; border-left: 4px solid #b91c1c; color: #000000; font-weight: 700;">Example 1: Basic Backsolving</h4>

<p style="font-size: 16px; line-height: 1.7; margin: 0.5rem 0 1rem 0;">When 5 is added to a number and that sum is doubled, the result is 26. What is the number?</p>

<p style="margin: 0.3rem 0 0.5rem 0;">
<span style="font-family: 'Times New Roman', Times, Georgia, serif;">A. 6</span><br>
<span style="font-family: 'Times New Roman', Times, Georgia, serif;">B. 8</span><br>
<span style="font-family: 'Times New Roman', Times, Georgia, serif;">C. 10</span><br>
<span style="font-family: 'Times New Roman', Times, Georgia, serif;">D. 12</span><br>
<span style="font-family: 'Times New Roman', Times, Georgia, serif;">E. 13</span>
</p>

<p style="margin: 1.5rem 0 0.75rem 0;"><strong>Solution (Backsolving):</strong></p>

<ul style="margin: 0.3rem 0 0.5rem 0; padding-left: 1.5rem; line-height: 1.5;">
  <li style="margin: 0.15rem 0;">Start with C (10): 10 + 5 = 15, then 15 × 2 = 30 ✗ (too big)</li>
  <li style="margin: 0.15rem 0;">We need smaller, try B (8): 8 + 5 = 13, then 13 × 2 = 26 ✓</li>
</ul>

<p style="font-size: 16px; line-height: 1.7; margin: 0.5rem 0 1rem 0;">Answer: B</p>

<p style="margin: 1.5rem 0 0.75rem 0;"><strong>Traditional Method (for comparison):</strong></p>

<ul style="margin: 0.3rem 0 0.5rem 0; padding-left: 1.5rem; line-height: 1.5;">
  <li style="margin: 0.15rem 0;">Let x = the number</li>
  <li style="margin: 0.15rem 0;">2(x + 5) = 26</li>
  <li style="margin: 0.15rem 0;">2x + 10 = 26</li>
  <li style="margin: 0.15rem 0;">2x = 16</li>
  <li style="margin: 0.15rem 0;">x = 8</li>
</ul>

<p style="font-size: 16px; line-height: 1.7; margin: 0.5rem 0 1rem 0;">Notice: Backsolving was faster and required less setup!</p>

<h4 style="margin: 0 0 1rem 0; padding-left: 0.75rem; border-left: 4px solid #b91c1c; color: #000000; font-weight: 700;">Example 2: Systems of Equations</h4>

<p style="font-size: 16px; line-height: 1.7; margin: 0.5rem 0 1rem 0;">Sarah bought 3 apples and 2 oranges for $7. If apples cost $1.50 each, how much does one orange cost?</p>

<p style="margin: 0.3rem 0 0.5rem 0;">
<span style="font-family: 'Times New Roman', Times, Georgia, serif;">A. $0.75</span><br>
<span style="font-family: 'Times New Roman', Times, Georgia, serif;">B. $1.00</span><br>
<span style="font-family: 'Times New Roman', Times, Georgia, serif;">C. $1.25</span><br>
<span style="font-family: 'Times New Roman', Times, Georgia, serif;">D. $1.50</span><br>
<span style="font-family: 'Times New Roman', Times, Georgia, serif;">E. $1.75</span>
</p>

<p style="margin: 1.5rem 0 0.75rem 0;"><strong>Solution (Backsolving):</strong></p>

<ul style="margin: 0.3rem 0 0.5rem 0; padding-left: 1.5rem; line-height: 1.5;">
  <li style="margin: 0.15rem 0;">3 apples cost: 3 × $1.50 = $4.50</li>
  <li style="margin: 0.15rem 0;">So 2 oranges must cost: $7.00 - $4.50 = $2.50</li>
  <li style="margin: 0.15rem 0;">One orange costs: $2.50 ÷ 2 = $1.25</li>
  <li style="margin: 0.15rem 0;">Check C ($1.25): 3($1.50) + 2($1.25) = $4.50 + $2.50 = $7.00 ✓</li>
</ul>

<p style="font-size: 16px; line-height: 1.7; margin: 0.5rem 0 1rem 0;">Answer: C</p>

<h4 style="margin: 0 0 1rem 0; padding-left: 0.75rem; border-left: 4px solid #b91c1c; color: #000000; font-weight: 700;">Example 3: Age Problem</h4>

<p style="font-size: 16px; line-height: 1.7; margin: 0.5rem 0 1rem 0;">John is 3 years older than twice his sister's age. If John is 17, how old is his sister?</p>

<p style="margin: 0.3rem 0 0.5rem 0;">
<span style="font-family: 'Times New Roman', Times, Georgia, serif;">A. 5</span><br>
<span style="font-family: 'Times New Roman', Times, Georgia, serif;">B. 6</span><br>
<span style="font-family: 'Times New Roman', Times, Georgia, serif;">C. 7</span><br>
<span style="font-family: 'Times New Roman', Times, Georgia, serif;">D. 8</span><br>
<span style="font-family: 'Times New Roman', Times, Georgia, serif;">E. 9</span>
</p>

<p style="margin: 1.5rem 0 0.75rem 0;"><strong>Solution (Backsolving):</strong></p>

<ul style="margin: 0.3rem 0 0.5rem 0; padding-left: 1.5rem; line-height: 1.5;">
  <li style="margin: 0.15rem 0;">Start with C (7): Twice 7 is 14, plus 3 is 17 ✓</li>
</ul>

<p style="font-size: 16px; line-height: 1.7; margin: 0.5rem 0 1rem 0;">Answer: C (We got lucky - first try!)</p>

<h3 style="margin-top: 5rem; margin-bottom: 0.75rem; font-weight: 700;">4. When NOT to Backsolve</h3>

<p style="font-size: 16px; line-height: 1.7; margin: 0.5rem 0 1rem 0;">Backsolving isn't always the best strategy. Avoid it when:</p>

<ul style="margin: 0.3rem 0 0.5rem 0; padding-left: 1.5rem; line-height: 1.5;">
  <li style="margin: 0.15rem 0;">Answer choices are ${styleTerm('algebraic expressions')} (not numbers)</li>
  <li style="margin: 0.15rem 0;">The traditional algebra is very simple</li>
  <li style="margin: 0.15rem 0;">Testing answer choices would be more work than solving directly</li>
  <li style="margin: 0.15rem 0;">The problem has multiple variables and complex relationships</li>
</ul>

<h3 style="margin-top: 5rem; margin-bottom: 0.75rem; font-weight: 700;">5. Advanced Backsolving Tips</h3>

<ul style="margin: 0.3rem 0 0.5rem 0; padding-left: 1.5rem; line-height: 1.5;">
  <li style="margin: 0.15rem 0;"><strong>Estimate first:</strong> Before testing, estimate roughly what the answer should be</li>
  <li style="margin: 0.15rem 0;"><strong>Look for ${styleTerm('obvious answers')}:</strong> Sometimes one choice stands out as clearly wrong</li>
  <li style="margin: 0.15rem 0;"><strong>Check units:</strong> Make sure your answer has the correct units (feet, seconds, dollars, etc.)</li>
  <li style="margin: 0.15rem 0;"><strong>Be systematic:</strong> Always start with C, then move logically to eliminate wrong answers</li>
</ul>

<p style="height: 1px; margin: 0; padding: 0;"></p>

<h3 style="margin-top: 5rem; margin-bottom: 0.75rem; font-weight: 700; visibility: hidden; height: 0; margin: 0; padding: 0; overflow: hidden;">.</h3>

<h3 style="color: #2e7d32; font-size: 1.4rem; font-weight: 700; margin: 3rem 0 1.5rem 0;">Key Takeaways</h3>

<ul style="list-style: none; padding: 0; margin: 0;">
  <li style="margin-bottom: 0.8rem; color: #2e7d32; font-size: 16px; line-height: 1.6;">
    <span style="color: #4caf50; font-weight: bold; margin-right: 0.5rem;">✓</span>Backsolving means using answer choices to solve the problem instead of traditional algebra
  </li>
  <li style="margin-bottom: 0.8rem; color: #2e7d32; font-size: 16px; line-height: 1.6;">
    <span style="color: #4caf50; font-weight: bold; margin-right: 0.5rem;">✓</span>Always start with choice C since answers are ordered by value
  </li>
  <li style="margin-bottom: 0.8rem; color: #2e7d32; font-size: 16px; line-height: 1.6;">
    <span style="color: #4caf50; font-weight: bold; margin-right: 0.5rem;">✓</span>Use backsolving when answer choices are concrete numbers and algebra looks messy
  </li>
  <li style="margin-bottom: 0.8rem; color: #2e7d32; font-size: 16px; line-height: 1.6;">
    <span style="color: #4caf50; font-weight: bold; margin-right: 0.5rem;">✓</span>Avoid backsolving when choices are expressions or when algebra is simple
  </li>
  <li style="margin-bottom: 0.8rem; color: #2e7d32; font-size: 16px; line-height: 1.6;">
    <span style="color: #4caf50; font-weight: bold; margin-right: 0.5rem;">✓</span>Testing one choice can often eliminate 2-3 other choices simultaneously
  </li>
</ul>`;

async function updateLesson() {
  await supabase
    .from('lessons')
    .update({ content })
    .eq('lesson_key', lessonKey);

  console.log(`✅ Updated comprehensive content for: ${lessonKey}`);
  console.log(`   Length: ${content.length} characters`);
}

updateLesson();
