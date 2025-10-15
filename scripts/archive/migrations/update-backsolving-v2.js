/**
 * Update Backsolving Lesson (Topic 1.1) - Version 2
 * Rewrite with MORE bullet points and shorter sentences like geometry-angles
 */

const { createClient } = require('@supabase/supabase-js');
require('dotenv').config();

const supabase = createClient(
  process.env.REACT_APP_SUPABASE_URL,
  process.env.SUPABASE_SERVICE_ROLE_KEY || process.env.REACT_APP_SUPABASE_ANON_KEY
);

const STYLES = {
  blueUnderline: 'color: #2563eb; font-weight: 600; text-decoration: underline;',
  paragraph: 'font-size: 16px; line-height: 1.7; margin: 0.5rem 0 1rem 0;',
  h3: 'margin-top: 5rem; margin-bottom: 0.75rem; font-weight: 700;',
  h4Section: 'margin-top: 2rem; margin-bottom: 0.3rem; font-weight: 400;',
  exampleHeader: 'margin: 0 0 1rem 0; padding-left: 0.75rem; border-left: 4px solid #b91c1c; color: #000000; font-weight: 700;',
  ul: 'margin: 0.3rem 0 0.5rem 0; padding-left: 1.5rem; line-height: 1.5;',
  li: 'margin: 0.15rem 0;',
  nested_ul: 'margin: 0.15rem 0 0.15rem 0; padding-left: 1.5rem;',
  keyTakeawaysH3: 'color: #2e7d32; font-size: 1.4rem; font-weight: 700; margin: 3rem 0 1.5rem 0;',
  keyTakeawayLi: 'margin-bottom: 0.8rem; color: #2e7d32; font-size: 16px; line-height: 1.6;',
  checkmark: 'color: #4caf50; font-weight: bold; margin-right: 0.5rem;',
  choiceText: 'font-family: \'Times New Roman\', Times, Georgia, serif;',
};

const newContent = `<p style="${STYLES.paragraph}">The <strong style="${STYLES.blueUnderline}">backsolving strategy</strong> is one of the most powerful techniques for the ACT Math section. Instead of solving algebraically, you test answer choices by plugging them into the question. This lesson will teach you exactly when and how to use this game-changing approach.</p>

<h3 style="${STYLES.h3}">1. What Is Backsolving?</h3>

<p style="${STYLES.paragraph}"><strong style="${STYLES.blueUnderline}">Backsolving</strong> means testing answer choices by plugging them back into the problem.</p>

<ul style="${STYLES.ul}">
  <li style="${STYLES.li}">The core idea:
    <ul style="${STYLES.nested_ul}">
      <li>Every ACT math problem gives you answer choices</li>
      <li>One of those choices MUST be correct</li>
      <li>Test each choice until you find the one that works</li>
    </ul>
  </li>
  <li style="${STYLES.li}">Why it works:
    <ul style="${STYLES.nested_ul}">
      <li>You're not solving—you're checking</li>
      <li>Simple arithmetic instead of complex algebra</li>
      <li>No chance of setup errors</li>
    </ul>
  </li>
</ul>

<h3 style="${STYLES.h3}">2. When to Use Backsolving</h3>

<p style="${STYLES.paragraph}">Not every problem is a good candidate for backsolving. Learn to recognize the perfect situations:</p>

<h4 style="${STYLES.h4Section}"><strong style="${STYLES.blueUnderline}">Perfect Backsolving Situations</strong></h4>

<ul style="${STYLES.ul}">
  <li style="${STYLES.li}">Question asks for a specific numeric value:
    <ul style="${STYLES.nested_ul}">
      <li>Example: "What is x?"</li>
      <li>Example: "How old is Sarah?"</li>
      <li>The answer is a number, not an expression</li>
    </ul>
  </li>
  <li style="${STYLES.li}">The problem involves an equation:
    <ul style="${STYLES.nested_ul}">
      <li>Linear equations: 3x + 5 = 20</li>
      <li>Quadratic equations: x² - 5x + 6 = 0</li>
      <li>System of equations</li>
    </ul>
  </li>
  <li style="${STYLES.li}">Word problems with multiple conditions:
    <ul style="${STYLES.nested_ul}">
      <li>Age problems</li>
      <li>Distance/rate/time problems</li>
      <li>Number relationship problems</li>
    </ul>
  </li>
  <li style="${STYLES.li}">You're stuck on the algebra:
    <ul style="${STYLES.nested_ul}">
      <li>After 30 seconds, can't figure out how to set up the equation</li>
      <li>Backsolving becomes your "Plan B"</li>
      <li>Often faster than struggling with algebra</li>
    </ul>
  </li>
</ul>

<h4 style="${STYLES.h4Section}"><strong style="${STYLES.blueUnderline}">When NOT to Backsolve</strong></h4>

<ul style="${STYLES.ul}">
  <li style="${STYLES.li}">Answer choices are expressions:
    <ul style="${STYLES.nested_ul}">
      <li>Choices like "2x + 3" or "πr²"</li>
      <li>Can't test these without knowing the variables</li>
    </ul>
  </li>
  <li style="${STYLES.li}">Direct calculation is obviously faster:
    <ul style="${STYLES.nested_ul}">
      <li>Example: "2x + 5 = 11" → just solve for x = 3</li>
      <li>Don't backsolve simple one-step problems</li>
    </ul>
  </li>
  <li style="${STYLES.li}">Testing would require complex calculations:
    <ul style="${STYLES.nested_ul}">
      <li>If each test takes 30+ seconds</li>
      <li>Better to solve algebraically</li>
    </ul>
  </li>
</ul>

<h3 style="${STYLES.h3}">3. The 5-Step Backsolving Process</h3>

<p style="${STYLES.paragraph}">Follow this systematic approach every time you backsolve:</p>

<h4 style="${STYLES.h4Section}">Step 1: <strong style="${STYLES.blueUnderline}">Start with B or C</strong></h4>

<ul style="${STYLES.ul}">
  <li style="${STYLES.li}">Why the middle choices?
    <ul style="${STYLES.nested_ul}">
      <li>Answer choices are always in order (smallest to largest or vice versa)</li>
      <li>Starting middle helps you eliminate faster</li>
      <li>If B is too small, you know C, D, E are possibilities</li>
      <li>If B is too large, you know only A remains</li>
    </ul>
  </li>
  <li style="${STYLES.li}">Choosing between B and C:
    <ul style="${STYLES.nested_ul}">
      <li>Pick whichever looks easier to calculate</li>
      <li>Round numbers (5, 10, 100) are usually faster</li>
      <li>Avoid messy fractions or decimals if possible</li>
    </ul>
  </li>
</ul>

<h4 style="${STYLES.h4Section}">Step 2: <strong style="${STYLES.blueUnderline}">Plug the Value Into the Question</strong></h4>

<ul style="${STYLES.ul}">
  <li style="${STYLES.li}">Replace the unknown:
    <ul style="${STYLES.nested_ul}">
      <li>If question asks "What is x?", substitute your test value for x</li>
      <li>If it asks "How many books?", use that number</li>
      <li>Be careful to substitute in the RIGHT place</li>
    </ul>
  </li>
</ul>

<h4 style="${STYLES.h4Section}">Step 3: <strong style="${STYLES.blueUnderline}">Calculate Carefully</strong></h4>

<ul style="${STYLES.ul}">
  <li style="${STYLES.li}">Work through the arithmetic:
    <ul style="${STYLES.nested_ul}">
      <li>Follow order of operations (PEMDAS)</li>
      <li>Write out each step—don't skip</li>
      <li>Check if the equation balances</li>
      <li>Verify all conditions are met</li>
    </ul>
  </li>
</ul>

<h4 style="${STYLES.h4Section}">Step 4: <strong style="${STYLES.blueUnderline}">If It Works—You're Done!</strong></h4>

<ul style="${STYLES.ul}">
  <li style="${STYLES.li}">Success indicators:
    <ul style="${STYLES.nested_ul}">
      <li>Both sides of the equation are equal</li>
      <li>All conditions in the word problem are satisfied</li>
      <li>Answer makes logical sense in context</li>
    </ul>
  </li>
  <li style="${STYLES.li}">Mark your answer and move on—don't second-guess!</li>
</ul>

<h4 style="${STYLES.h4Section}">Step 5: <strong style="${STYLES.blueUnderline}">If It Doesn't Work—Eliminate and Adjust</strong></h4>

<ul style="${STYLES.ul}">
  <li style="${STYLES.li}">Cross off the wrong choice
  </li>
  <li style="${STYLES.li}">Determine direction:
    <ul style="${STYLES.nested_ul}">
      <li>Did you get a number too large or too small?</li>
      <li>This tells you which direction to go</li>
      <li>Eliminate other impossible choices</li>
    </ul>
  </li>
  <li style="${STYLES.li}">Test another choice systematically</li>
  <li style="${STYLES.li}">One choice MUST work—keep testing!</li>
</ul>

<h4 style="${STYLES.exampleHeader}">Example 1</h4>

<p style="${STYLES.paragraph}">If 3x + 5 = 20, what is the value of x?</p>

<p style="margin: 0.3rem 0 0.5rem 0;">
<span style="${STYLES.choiceText}">A. 2</span><br>
<span style="${STYLES.choiceText}">B. 3</span><br>
<span style="${STYLES.choiceText}">C. 4</span><br>
<span style="${STYLES.choiceText}">D. 5</span><br>
<span style="${STYLES.choiceText}">E. 6</span>
</p>

<p style="margin: 1.5rem 0 0.75rem 0;"><strong>Solution:</strong></p>

<ul style="${STYLES.ul}">
  <li style="${STYLES.li}">Step 1: Start with C
  </li>
  <li style="${STYLES.li}">Step 2: Test x = 4
    <ul style="${STYLES.nested_ul}">
      <li>Substitute: 3(4) + 5 = 20</li>
    </ul>
  </li>
  <li style="${STYLES.li}">Step 3: Calculate
    <ul style="${STYLES.nested_ul}">
      <li>3(4) = 12</li>
      <li>12 + 5 = 17</li>
      <li>Result: 17 ≠ 20</li>
    </ul>
  </li>
  <li style="${STYLES.li}">Step 5: Analyze and adjust
    <ul style="${STYLES.nested_ul}">
      <li>We got 17 but need 20</li>
      <li>We need a larger x value</li>
      <li>Eliminate A, B, C</li>
      <li>Try D next</li>
    </ul>
  </li>
  <li style="${STYLES.li}">Test x = 5:
    <ul style="${STYLES.nested_ul}">
      <li>3(5) + 5 = 20</li>
      <li>15 + 5 = 20</li>
      <li>20 = 20 ✓</li>
    </ul>
  </li>
</ul>

<p style="${STYLES.paragraph}">
Answer: D
</p>

<h4 style="${STYLES.exampleHeader}">Example 2</h4>

<p style="${STYLES.paragraph}">Sarah is 3 years older than twice her brother's age. If Sarah is 13 years old, how old is her brother?</p>

<p style="margin: 0.3rem 0 0.5rem 0;">
<span style="${STYLES.choiceText}">A. 3</span><br>
<span style="${STYLES.choiceText}">B. 4</span><br>
<span style="${STYLES.choiceText}">C. 5</span><br>
<span style="${STYLES.choiceText}">D. 6</span><br>
<span style="${STYLES.choiceText}">E. 7</span>
</p>

<p style="margin: 1.5rem 0 0.75rem 0;"><strong>Solution:</strong></p>

<ul style="${STYLES.ul}">
  <li style="${STYLES.li}">Translate the word problem:
    <ul style="${STYLES.nested_ul}">
      <li>Sarah's age = 2 × (brother's age) + 3</li>
      <li>We know Sarah is 13</li>
      <li>So: 13 = 2 × (brother's age) + 3</li>
    </ul>
  </li>
  <li style="${STYLES.li}">Test C (brother is 5):
    <ul style="${STYLES.nested_ul}">
      <li>Twice his age: 2 × 5 = 10</li>
      <li>Add 3: 10 + 3 = 13</li>
      <li>Check: Does Sarah's age = 13? Yes! ✓</li>
    </ul>
  </li>
  <li style="${STYLES.li}">The first choice we tested worked!</li>
</ul>

<p style="${STYLES.paragraph}">
Answer: C
</p>

<h3 style="${STYLES.h3}">4. Backsolving with Coordinate Points</h3>

<p style="${STYLES.paragraph}">A special application: testing which equation passes through given points.</p>

<h4 style="${STYLES.h4Section}"><strong style="${STYLES.blueUnderline}">The Core Principle</strong></h4>

<ul style="${STYLES.ul}">
  <li style="${STYLES.li}">If point (x, y) is on a graph:
    <ul style="${STYLES.nested_ul}">
      <li>Plugging in the x-value must give you the y-value</li>
      <li>This is how we test whether a point "works"</li>
    </ul>
  </li>
  <li style="${STYLES.li}">Example check:
    <ul style="${STYLES.nested_ul}">
      <li>Point: (2, 7)</li>
      <li>Equation: y = 3x + 1</li>
      <li>Test: 3(2) + 1 = 6 + 1 = 7 ✓</li>
      <li>The point is on the line!</li>
    </ul>
  </li>
</ul>

<h4 style="${STYLES.h4Section}"><strong style="${STYLES.blueUnderline}">Strategy for Multiple Points</strong></h4>

<ul style="${STYLES.ul}">
  <li style="${STYLES.li}">Use one point at a time:
    <ul style="${STYLES.nested_ul}">
      <li>Start with the simplest point (smallest numbers)</li>
      <li>Eliminate choices that don't work</li>
      <li>If multiple choices work, test a second point</li>
      <li>Repeat until only one choice remains</li>
    </ul>
  </li>
</ul>

<h4 style="${STYLES.exampleHeader}">Example 3</h4>

<p style="${STYLES.paragraph}">A linear function f passes through the points (1, 5), (3, 9), and (7, 17). Which equation defines f?</p>

<p style="margin: 0.3rem 0 0.5rem 0;">
<span style="${STYLES.choiceText}">A. f(x) = x + 4</span><br>
<span style="${STYLES.choiceText}">B. f(x) = 2x + 3</span><br>
<span style="${STYLES.choiceText}">C. f(x) = 3x + 2</span><br>
<span style="${STYLES.choiceText}">D. f(x) = 4x + 1</span><br>
<span style="${STYLES.choiceText}">E. f(x) = x + 5</span>
</p>

<p style="margin: 1.5rem 0 0.75rem 0;"><strong>Solution:</strong></p>

<ul style="${STYLES.ul}">
  <li style="${STYLES.li}">Round 1: Test point (1, 5)
    <ul style="${STYLES.nested_ul}">
      <li>Plug in x = 1, should get f(1) = 5</li>
    </ul>
  </li>
  <li style="${STYLES.li}">Test each choice:
    <ul style="${STYLES.nested_ul}">
      <li>A: f(1) = 1 + 4 = 5 ✓</li>
      <li>B: f(1) = 2(1) + 3 = 5 ✓</li>
      <li>C: f(1) = 3(1) + 2 = 5 ✓</li>
      <li>D: f(1) = 4(1) + 1 = 5 ✓</li>
      <li>E: f(1) = 1 + 5 = 6 ✗ (Eliminate E)</li>
    </ul>
  </li>
  <li style="${STYLES.li}">Round 2: Test point (3, 9)
    <ul style="${STYLES.nested_ul}">
      <li>Plug in x = 3, should get f(3) = 9</li>
    </ul>
  </li>
  <li style="${STYLES.li}">Test remaining choices:
    <ul style="${STYLES.nested_ul}">
      <li>A: f(3) = 3 + 4 = 7 ✗ (Eliminate A)</li>
      <li>B: f(3) = 2(3) + 3 = 9 ✓</li>
      <li>C: f(3) = 3(3) + 2 = 11 ✗ (Eliminate C)</li>
      <li>D: f(3) = 4(3) + 1 = 13 ✗ (Eliminate D)</li>
    </ul>
  </li>
  <li style="${STYLES.li}">Only B remains!</li>
  <li style="${STYLES.li}">Optional verification with (7, 17):
    <ul style="${STYLES.nested_ul}">
      <li>f(7) = 2(7) + 3 = 14 + 3 = 17 ✓</li>
    </ul>
  </li>
</ul>

<p style="${STYLES.paragraph}">
Answer: B
</p>

<h3 style="${STYLES.h3}">5. Advanced Backsolving Tips</h3>

<h4 style="${STYLES.h4Section}"><strong style="${STYLES.blueUnderline}">Use Logic to Eliminate First</strong></h4>

<ul style="${STYLES.ul}">
  <li style="${STYLES.li}">Before testing, look for clues:
    <ul style="${STYLES.nested_ul}">
      <li>Problem states "less than 10" → eliminate choices ≥ 10</li>
      <li>Problem involves money → answer must be positive</li>
      <li>Context clues narrow your options</li>
    </ul>
  </li>
  <li style="${STYLES.li}">Estimate before calculating:
    <ul style="${STYLES.nested_ul}">
      <li>If 5x = 47, x should be close to 10 (since 5 × 10 = 50)</li>
      <li>Eliminate obviously wrong choices</li>
    </ul>
  </li>
</ul>

<h4 style="${STYLES.h4Section}"><strong style="${STYLES.blueUnderline}">Choose the Easiest Test Value</strong></h4>

<ul style="${STYLES.ul}">
  <li style="${STYLES.li}">Not all middle choices are equal:
    <ul style="${STYLES.nested_ul}">
      <li>C = 7/13 vs B = 3 → Start with B</li>
      <li>C = √17 vs B = 4 → Start with B</li>
      <li>Pick the simpler number to test</li>
    </ul>
  </li>
</ul>

<h4 style="${STYLES.h4Section}"><strong style="${STYLES.blueUnderline}">Know When to Switch Strategies</strong></h4>

<ul style="${STYLES.ul}">
  <li style="${STYLES.li}">If the first test is very messy:
    <ul style="${STYLES.nested_ul}">
      <li>Reconsider: would algebra be faster?</li>
      <li>BUT if you're already halfway through, finish testing</li>
      <li>Switching mid-problem wastes time</li>
    </ul>
  </li>
</ul>

<h4 style="${STYLES.exampleHeader}">Example 4</h4>

<p style="${STYLES.paragraph}">A rectangle has length 4 inches greater than its width. If the perimeter is 32 inches, what is the width?</p>

<p style="margin: 0.3rem 0 0.5rem 0;">
<span style="${STYLES.choiceText}">A. 4 inches</span><br>
<span style="${STYLES.choiceText}">B. 6 inches</span><br>
<span style="${STYLES.choiceText}">C. 8 inches</span><br>
<span style="${STYLES.choiceText}">D. 10 inches</span><br>
<span style="${STYLES.choiceText}">E. 12 inches</span>
</p>

<p style="margin: 1.5rem 0 0.75rem 0;"><strong>Solution:</strong></p>

<ul style="${STYLES.ul}">
  <li style="${STYLES.li}">Set up the relationships:
    <ul style="${STYLES.nested_ul}">
      <li>Length = width + 4</li>
      <li>Perimeter = 2(length) + 2(width)</li>
      <li>Perimeter = 32</li>
    </ul>
  </li>
  <li style="${STYLES.li}">Test C (width = 8):
    <ul style="${STYLES.nested_ul}">
      <li>Length = 8 + 4 = 12</li>
      <li>Perimeter = 2(12) + 2(8)</li>
      <li>= 24 + 16 = 40</li>
      <li>40 ≠ 32 ✗</li>
      <li>Too large—need smaller width</li>
    </ul>
  </li>
  <li style="${STYLES.li}">Test B (width = 6):
    <ul style="${STYLES.nested_ul}">
      <li>Length = 6 + 4 = 10</li>
      <li>Perimeter = 2(10) + 2(6)</li>
      <li>= 20 + 12 = 32</li>
      <li>32 = 32 ✓</li>
    </ul>
  </li>
</ul>

<p style="${STYLES.paragraph}">
Answer: B
</p>

<p style="height: 1px; margin: 0; padding: 0;"></p>

<h3 style="margin-top: 5rem; margin-bottom: 0.75rem; font-weight: 700; visibility: hidden; height: 0; margin: 0; padding: 0; overflow: hidden;">.</h3>

<h3 style="${STYLES.keyTakeawaysH3}">Key Takeaways</h3>

<ul style="list-style: none; padding: 0; margin: 0;">
  <li style="${STYLES.keyTakeawayLi}">
    <span style="${STYLES.checkmark}">✓</span>Backsolving = testing answer choices by plugging them into the problem
  </li>
  <li style="${STYLES.keyTakeawayLi}">
    <span style="${STYLES.checkmark}">✓</span>Always start with B or C (middle choices) to maximize elimination efficiency
  </li>
  <li style="${STYLES.keyTakeawayLi}">
    <span style="${STYLES.checkmark}">✓</span>Best for: numeric answers, equations, word problems, coordinate point questions
  </li>
  <li style="${STYLES.keyTakeawayLi}">
    <span style="${STYLES.checkmark}">✓</span>Avoid: algebraic expression answers or obviously-simple problems
  </li>
  <li style="${STYLES.keyTakeawayLi}">
    <span style="${STYLES.checkmark}">✓</span>For coordinate points: plug in x, verify you get the correct y
  </li>
  <li style="${STYLES.keyTakeawayLi}">
    <span style="${STYLES.checkmark}">✓</span>Use logic and estimation to eliminate choices before testing
  </li>
  <li style="${STYLES.keyTakeawayLi}">
    <span style="${STYLES.checkmark}">✓</span>One answer MUST work—test systematically until you find it
  </li>
</ul>`;

async function main() {
  console.log('='.repeat(80));
  console.log('REWRITING BACKSOLVING LESSON WITH MORE BULLET POINTS');
  console.log('='.repeat(80));
  console.log();

  try {
    const { data, error } = await supabase
      .from('lessons')
      .update({
        content: newContent,
        updated_at: new Date().toISOString()
      })
      .eq('id', 'b699563d-216b-477f-aa3f-fe7b6f6afd80')
      .select();

    if (error) {
      console.error('❌ Error updating lesson:', error);
      process.exit(1);
    }

    console.log('✓ Successfully updated backsolving lesson');
    console.log();
    console.log('Changes Applied:');
    console.log('  - Massively increased bullet point usage');
    console.log('  - Broke long sentences into multiple short bullets');
    console.log('  - Added nested bullets for all major concepts');
    console.log('  - Every step now has sub-bullet explanations');
    console.log('  - Examples broken into step-by-step bullets');
    console.log('  - Blue underlined key terms throughout');
    console.log('  - Red-bordered examples with detailed solutions');
    console.log('  - Green Key Takeaways section');
    console.log('  - Content length:', newContent.length, 'characters');
    console.log();
    console.log('Interactive quizzes already exist in Supabase and will render separately');

    process.exit(0);
  } catch (error) {
    console.error('❌ Fatal error:', error);
    process.exit(1);
  }
}

main();
