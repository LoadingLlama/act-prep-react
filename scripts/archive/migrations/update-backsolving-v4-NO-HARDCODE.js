/**
 * Update Backsolving Lesson - v4 NO HARDCODED DEFINITIONS
 * Definitions stored in term_definitions table
 * Frontend will fetch and display them dynamically
 */

const { createClient } = require('@supabase/supabase-js');
require('dotenv').config();

const supabase = createClient(
  process.env.REACT_APP_SUPABASE_URL,
  process.env.SUPABASE_SERVICE_ROLE_KEY
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

// NO HARDCODED DEFINITIONS - frontend fetches from term_definitions table
const newContent = `<p style="${STYLES.paragraph}"><strong style="${STYLES.blueUnderline}">Backsolving</strong> is one of the most powerful strategies for the ACT Math section. Instead of solving a problem algebraically, you test the answer choices by plugging them back into the question. This lesson will teach you when and how to use this efficient approach.</p>

<h3 style="${STYLES.h3}">1. What Is Backsolving?</h3>

<p style="${STYLES.paragraph}">When you use <strong style="${STYLES.blueUnderline}">backsolving</strong>, you test answer choices by substituting them into the problem to see which one works.</p>

<ul style="${STYLES.ul}">
  <li style="${STYLES.li}">The key principle:
    <ul style="${STYLES.nested_ul}">
      <li>Every ACT math problem provides answer choices</li>
      <li>One choice must be correct</li>
      <li>Test each choice systematically until you find it</li>
    </ul>
  </li>
  <li style="${STYLES.li}">Why it works:
    <ul style="${STYLES.nested_ul}">
      <li>Converts complex algebra into simple arithmetic</li>
      <li>Eliminates setup errors</li>
      <li>Often faster than traditional solving</li>
    </ul>
  </li>
</ul>

<h3 style="${STYLES.h3}">2. When to Use Backsolving</h3>

<p style="${STYLES.paragraph}">Backsolving works best in specific situations. Learn to recognize them:</p>

<ul style="${STYLES.ul}">
  <li style="${STYLES.li}">Question asks for a specific numeric value:
    <ul style="${STYLES.nested_ul}">
      <li>"What is x?"</li>
      <li>"How old is Sarah?"</li>
      <li>"What is the width of the rectangle?"</li>
    </ul>
  </li>
  <li style="${STYLES.li}">Problem involves equations:
    <ul style="${STYLES.nested_ul}">
      <li>Linear equations</li>
      <li>Quadratic equations</li>
      <li>Systems of equations</li>
    </ul>
  </li>
  <li style="${STYLES.li}">Word problems with multiple conditions:
    <ul style="${STYLES.nested_ul}">
      <li>Age relationships</li>
      <li>Distance/rate/time scenarios</li>
      <li>Number relationship problems</li>
    </ul>
  </li>
  <li style="${STYLES.li}">You're stuck after 30 seconds:
    <ul style="${STYLES.nested_ul}">
      <li>Can't figure out how to set up the equation</li>
      <li>Backsolving becomes your backup strategy</li>
    </ul>
  </li>
</ul>

<h4 style="${STYLES.h4Section}">When NOT to Backsolve</h4>

<ul style="${STYLES.ul}">
  <li style="${STYLES.li}">Answer choices are algebraic expressions:
    <ul style="${STYLES.nested_ul}">
      <li>Choices like "2x + 3" or "πr²" can't be tested</li>
    </ul>
  </li>
  <li style="${STYLES.li}">Direct calculation is obviously simpler:
    <ul style="${STYLES.nested_ul}">
      <li>One-step equations: just solve directly</li>
    </ul>
  </li>
</ul>

<h3 style="${STYLES.h3}">3. The Backsolving Method</h3>

<p style="${STYLES.paragraph}">Follow these steps every time you backsolve:</p>

<h4 style="${STYLES.h4Section}">Step 1: Start with B or C</h4>

<ul style="${STYLES.ul}">
  <li style="${STYLES.li}">Why start in the middle?
    <ul style="${STYLES.nested_ul}">
      <li>Answer choices are always in order</li>
      <li>Testing middle first helps eliminate faster</li>
      <li>If B is too small, try larger choices</li>
      <li>If B is too large, only A remains</li>
    </ul>
  </li>
  <li style="${STYLES.li}">Choose B or C based on simplicity:
    <ul style="${STYLES.nested_ul}">
      <li>Pick whichever has simpler numbers</li>
      <li>Avoid messy fractions when possible</li>
    </ul>
  </li>
</ul>

<h4 style="${STYLES.h4Section}">Step 2: Substitute the Value</h4>

<ul style="${STYLES.ul}">
  <li style="${STYLES.li}">Replace the unknown in the problem:
    <ul style="${STYLES.nested_ul}">
      <li>If question asks "What is x?", plug in your test value for x</li>
      <li>Be careful to substitute in the correct location</li>
    </ul>
  </li>
</ul>

<h4 style="${STYLES.h4Section}">Step 3: Calculate and Check</h4>

<ul style="${STYLES.ul}">
  <li style="${STYLES.li}">Work through the arithmetic:
    <ul style="${STYLES.nested_ul}">
      <li>Follow order of operations</li>
      <li>Check if both sides of the equation balance</li>
      <li>Verify all problem conditions are met</li>
    </ul>
  </li>
</ul>

<h4 style="${STYLES.h4Section}">Step 4: Adjust if Needed</h4>

<ul style="${STYLES.ul}">
  <li style="${STYLES.li}">If it works—you're done!
  </li>
  <li style="${STYLES.li}">If it doesn't work:
    <ul style="${STYLES.nested_ul}">
      <li>Cross off that choice</li>
      <li>Determine if you need a larger or smaller value</li>
      <li>Eliminate other impossible choices</li>
      <li>Test another choice</li>
    </ul>
  </li>
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
  <li style="${STYLES.li}">Start with C (x = 4):
    <ul style="${STYLES.nested_ul}">
      <li>3(4) + 5 = 12 + 5 = 17</li>
      <li>17 ≠ 20, so C is wrong</li>
      <li>We got 17 but need 20, so try a larger value</li>
    </ul>
  </li>
  <li style="${STYLES.li}">Try D (x = 5):
    <ul style="${STYLES.nested_ul}">
      <li>3(5) + 5 = 15 + 5 = 20</li>
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
  <li style="${STYLES.li}">Set up: Sarah's age = 2 × (brother's age) + 3</li>
  <li style="${STYLES.li}">Test C (brother is 5):
    <ul style="${STYLES.nested_ul}">
      <li>2(5) + 3 = 10 + 3 = 13</li>
      <li>13 = 13 ✓</li>
    </ul>
  </li>
</ul>

<p style="${STYLES.paragraph}">
Answer: C
</p>

<h3 style="${STYLES.h3}">4. Backsolving with Coordinate Points</h3>

<p style="${STYLES.paragraph}">A special case: testing which equation passes through given points.</p>

<h4 style="${STYLES.h4Section}">The Key Principle</h4>

<ul style="${STYLES.ul}">
  <li style="${STYLES.li}">If point (x, y) lies on a graph:
    <ul style="${STYLES.nested_ul}">
      <li>Plugging in the x-value must give you the y-value</li>
      <li>Example: Does (2, 7) lie on y = 3x + 1?</li>
      <li>Test: 3(2) + 1 = 7 ✓ Yes, it does</li>
    </ul>
  </li>
  <li style="${STYLES.li}">With multiple points:
    <ul style="${STYLES.nested_ul}">
      <li>Test one point at a time</li>
      <li>Eliminate choices that don't work</li>
      <li>Continue until one choice remains</li>
    </ul>
  </li>
</ul>

<h4 style="${STYLES.exampleHeader}">Example 3</h4>

<p style="${STYLES.paragraph}">A linear function f passes through (1, 5) and (3, 9). Which equation defines f?</p>

<p style="margin: 0.3rem 0 0.5rem 0;">
<span style="${STYLES.choiceText}">A. f(x) = x + 4</span><br>
<span style="${STYLES.choiceText}">B. f(x) = 2x + 3</span><br>
<span style="${STYLES.choiceText}">C. f(x) = 3x + 2</span><br>
<span style="${STYLES.choiceText}">D. f(x) = 4x + 1</span><br>
<span style="${STYLES.choiceText}">E. f(x) = x + 5</span>
</p>

<p style="margin: 1.5rem 0 0.75rem 0;"><strong>Solution:</strong></p>

<ul style="${STYLES.ul}">
  <li style="${STYLES.li}">Test point (1, 5) — when x = 1, f(1) should equal 5:
    <ul style="${STYLES.nested_ul}">
      <li>A: 1 + 4 = 5 ✓</li>
      <li>B: 2(1) + 3 = 5 ✓</li>
      <li>C: 3(1) + 2 = 5 ✓</li>
      <li>D: 4(1) + 1 = 5 ✓</li>
      <li>E: 1 + 5 = 6 ✗ Eliminate E</li>
    </ul>
  </li>
  <li style="${STYLES.li}">Test point (3, 9) — when x = 3, f(3) should equal 9:
    <ul style="${STYLES.nested_ul}">
      <li>A: 3 + 4 = 7 ✗ Eliminate A</li>
      <li>B: 2(3) + 3 = 9 ✓</li>
      <li>C: 3(3) + 2 = 11 ✗ Eliminate C</li>
      <li>D: 4(3) + 1 = 13 ✗ Eliminate D</li>
    </ul>
  </li>
  <li style="${STYLES.li}">Only B remains</li>
</ul>

<p style="${STYLES.paragraph}">
Answer: B
</p>

<p style="height: 1px; margin: 0; padding: 0;"></p>

<h3 style="margin-top: 5rem; margin-bottom: 0.75rem; font-weight: 700; visibility: hidden; height: 0; margin: 0; padding: 0; overflow: hidden;">.</h3>

<h3 style="${STYLES.keyTakeawaysH3}">Key Takeaways</h3>

<ul style="list-style: none; padding: 0; margin: 0;">
  <li style="${STYLES.keyTakeawayLi}">
    <span style="${STYLES.checkmark}">✓</span>Backsolving tests answer choices by substituting them into the problem
  </li>
  <li style="${STYLES.keyTakeawayLi}">
    <span style="${STYLES.checkmark}">✓</span>Always start with B or C (middle choices) to eliminate faster
  </li>
  <li style="${STYLES.keyTakeawayLi}">
    <span style="${STYLES.checkmark}">✓</span>Best for: numeric answers, equations, word problems, coordinate points
  </li>
  <li style="${STYLES.keyTakeawayLi}">
    <span style="${STYLES.checkmark}">✓</span>For coordinate points: plug in x-values and verify you get the correct y-values
  </li>
  <li style="${STYLES.keyTakeawayLi}">
    <span style="${STYLES.checkmark}">✓</span>If testing takes too long, switch back to algebraic solving
  </li>
</ul>`;

async function main() {
  console.log('='.repeat(80));
  console.log('FINAL UPDATE - NO HARDCODED DEFINITIONS');
  console.log('Definitions fetched from term_definitions table');
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
      console.error('❌ Error:', error);
      process.exit(1);
    }

    console.log('✓ Successfully updated');
    console.log('  - Content length:', newContent.length, 'characters');
    console.log('  - Blue underlined terms: 1 ("Backsolving")');
    console.log('  - Definition stored in term_definitions table');
    console.log('  - Examples: 3');
    console.log('  - Updated at:', new Date().toISOString());

    process.exit(0);
  } catch (error) {
    console.error('❌ Fatal error:', error);
    process.exit(1);
  }
}

main();
