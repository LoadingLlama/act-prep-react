/**
 * Update Backsolving Lesson (Topic 1.1)
 * Revamp to match gold standard format
 */

const { createClient } = require('@supabase/supabase-js');
require('dotenv').config();

const supabase = createClient(
  process.env.REACT_APP_SUPABASE_URL,
  process.env.REACT_APP_SUPABASE_ANON_KEY
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

const newContent = `<p style="${STYLES.paragraph}">The <strong style="${STYLES.blueUnderline}">backsolving strategy</strong> is one of the most powerful techniques for the ACT Math section. Instead of solving a problem algebraically from scratch, you test the answer choices by plugging them back into the question. Since one of the choices must be correct, backsolving can often save you time and reduce algebraic errors. This lesson will show you exactly when and how to use this game-changing strategy.</p>

<h3 style="${STYLES.h3}">1. What Is Backsolving?</h3>

<p style="${STYLES.paragraph}"><strong style="${STYLES.blueUnderline}">Backsolving</strong> means taking the answer choices and plugging them back into the problem to see which one works. It's essentially strategic guess-and-check—but done systematically to maximize speed.</p>

<ul style="${STYLES.ul}">
  <li style="${STYLES.li}">Core concept:
    <ul style="${STYLES.nested_ul}">
      <li>On the ACT, you're given answer choices for every math problem</li>
      <li>One of those choices MUST be correct</li>
      <li>Instead of solving algebraically, test the choices until you find the one that works</li>
    </ul>
  </li>
  <li style="${STYLES.li}">Why it's powerful:
    <ul style="${STYLES.nested_ul}">
      <li>Often faster than traditional algebra</li>
      <li>Reduces risk of calculation errors</li>
      <li>Works even when you're stuck on the algebraic approach</li>
      <li>Requires less memorization of formulas</li>
    </ul>
  </li>
</ul>

<h3 style="${STYLES.h3}">2. When Should You Backsolve?</h3>

<p style="${STYLES.paragraph}">Backsolving isn't always the best strategy. Here's how to recognize when it will save you time:</p>

<h4 style="${STYLES.h4Section}"><strong style="${STYLES.blueUnderline}">Perfect Backsolving Situations</strong></h4>

<ul style="${STYLES.ul}">
  <li style="${STYLES.li}">The question asks for a specific value (not an expression)
    <ul style="${STYLES.nested_ul}">
      <li>Example: "What is the value of x?"</li>
      <li>Example: "How old is Sarah?"</li>
      <li>The answer choices are numbers, not expressions like "2x + 3"</li>
    </ul>
  </li>
  <li style="${STYLES.li}">The problem involves equations or word problems
    <ul style="${STYLES.nested_ul}">
      <li>System of equations</li>
      <li>Age problems</li>
      <li>Rate/distance/time problems</li>
      <li>Problems with multiple conditions to satisfy</li>
    </ul>
  </li>
  <li style="${STYLES.li}">You get stuck on the algebraic approach
    <ul style="${STYLES.nested_ul}">
      <li>If you spend more than 30 seconds setting up equations, try backsolving</li>
      <li>It's a perfect "Plan B" strategy</li>
    </ul>
  </li>
</ul>

<h4 style="${STYLES.h4Section}"><strong style="${STYLES.blueUnderline}">When NOT to Backsolve</strong></h4>

<ul style="${STYLES.ul}">
  <li style="${STYLES.li}">When the answer choices are algebraic expressions
    <ul style="${STYLES.nested_ul}">
      <li>Choices like "2x + 3" or "πr²" can't be easily tested</li>
    </ul>
  </li>
  <li style="${STYLES.li}">When direct calculation is faster
    <ul style="${STYLES.nested_ul}">
      <li>If you immediately see how to solve it, just solve it</li>
      <li>Example: "2x + 5 = 11" is faster to solve directly (x = 3) than testing choices</li>
    </ul>
  </li>
  <li style="${STYLES.li}">When testing each choice would take longer than solving
    <ul style="${STYLES.nested_ul}">
      <li>Complex calculations with each answer choice might not save time</li>
    </ul>
  </li>
</ul>

<h3 style="${STYLES.h3}">3. The Backsolving Process: 5 Steps</h3>

<p style="${STYLES.paragraph}">Follow these steps to backsolve efficiently and systematically:</p>

<h4 style="${STYLES.h4Section}"><strong style="${STYLES.blueUnderline}">Step 1: Start with B or C</strong></h4>

<ul style="${STYLES.ul}">
  <li style="${STYLES.li}">Why the middle?
    <ul style="${STYLES.nested_ul}">
      <li>Answer choices are always in order (smallest to largest or vice versa)</li>
      <li>Starting in the middle helps you eliminate faster</li>
      <li>If the middle choice is too small, you know to try larger values</li>
      <li>If it's too large, try smaller values</li>
    </ul>
  </li>
  <li style="${STYLES.li}">Pro tip: Choose B or C based on which looks easier to calculate with</li>
</ul>

<h4 style="${STYLES.h4Section}"><strong style="${STYLES.blueUnderline}">Step 2: Plug the Value Into the Question</strong></h4>

<ul style="${STYLES.ul}">
  <li style="${STYLES.li}">Substitute the answer choice for the variable
    <ul style="${STYLES.nested_ul}">
      <li>If the question asks "What is x?", replace x with your chosen answer</li>
      <li>If it asks "How old is John?", use that age in your calculation</li>
    </ul>
  </li>
</ul>

<h4 style="${STYLES.h4Section}"><strong style="${STYLES.blueUnderline}">Step 3: Work Through the Problem</strong></h4>

<ul style="${STYLES.ul}">
  <li style="${STYLES.li}">Calculate carefully
    <ul style="${STYLES.nested_ul}">
      <li>Follow the order of operations</li>
      <li>Check whether this value makes the equation true</li>
      <li>Or verify if it satisfies all conditions in a word problem</li>
    </ul>
  </li>
</ul>

<h4 style="${STYLES.h4Section}"><strong style="${STYLES.blueUnderline}">Step 4: If It Works, You're Done!</strong></h4>

<ul style="${STYLES.ul}">
  <li style="${STYLES.li}">Success indicators:
    <ul style="${STYLES.nested_ul}">
      <li>The equation balances (both sides equal)</li>
      <li>All conditions in the word problem are satisfied</li>
      <li>The answer makes logical sense in context</li>
    </ul>
  </li>
</ul>

<h4 style="${STYLES.h4Section}"><strong style="${STYLES.blueUnderline}">Step 5: If It Doesn't Work, Adjust</strong></h4>

<ul style="${STYLES.ul}">
  <li style="${STYLES.li}">Eliminate and refine:
    <ul style="${STYLES.nested_ul}">
      <li>Cross off the choice you just tested</li>
      <li>Determine if you need a larger or smaller value</li>
      <li>Eliminate other choices you now know are wrong</li>
      <li>Test another choice</li>
    </ul>
  </li>
  <li style="${STYLES.li}">Remember: One choice MUST work, so keep testing systematically</li>
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
      <li>Plug in: 3(4) + 5 = 20</li>
      <li>Calculate: 12 + 5 = 17</li>
      <li>Result: 17 ≠ 20 ✗</li>
      <li>Analysis: We got 17 but need 20. We need a larger value of x.</li>
    </ul>
  </li>
  <li style="${STYLES.li}">Try D (x = 5):
    <ul style="${STYLES.nested_ul}">
      <li>Plug in: 3(5) + 5 = 20</li>
      <li>Calculate: 15 + 5 = 20</li>
      <li>Result: 20 = 20 ✓</li>
      <li>Success! This works.</li>
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
  <li style="${STYLES.li}">Understanding the problem: Sarah's age (13) = 2 × (brother's age) + 3</li>
  <li style="${STYLES.li}">Start with C (brother is 5):
    <ul style="${STYLES.nested_ul}">
      <li>Twice his age: 2(5) = 10</li>
      <li>Add 3: 10 + 3 = 13</li>
      <li>Result: 13 = 13 ✓</li>
      <li>Perfect! This satisfies the condition.</li>
    </ul>
  </li>
</ul>

<p style="${STYLES.paragraph}">
Answer: C
</p>

<h3 style="${STYLES.h3}">4. Backsolving with Coordinate Points</h3>

<p style="${STYLES.paragraph}">A special application of backsolving involves testing which equation passes through given coordinate points. This is extremely common on the ACT.</p>

<h4 style="${STYLES.h4Section}"><strong style="${STYLES.blueUnderline}">The Key Principle</strong></h4>

<ul style="${STYLES.ul}">
  <li style="${STYLES.li}">If a point (x, y) lies on a graph or satisfies an equation:
    <ul style="${STYLES.nested_ul}">
      <li>Plugging in the x-value must give you the y-value</li>
      <li>Example: If (2, 7) is on the line, and the equation is y = 3x + 1, then 3(2) + 1 must equal 7</li>
      <li>Let's verify: 3(2) + 1 = 6 + 1 = 7 ✓</li>
    </ul>
  </li>
</ul>

<h4 style="${STYLES.h4Section}"><strong style="${STYLES.blueUnderline}">Strategy for Multiple Points</strong></h4>

<ul style="${STYLES.ul}">
  <li style="${STYLES.li}">Test one point at a time
    <ul style="${STYLES.nested_ul}">
      <li>Start with the simplest point (usually the one with smallest numbers)</li>
      <li>Eliminate answer choices that don't work</li>
      <li>If multiple choices work, test a second point to narrow down further</li>
      <li>Continue until only one choice remains</li>
    </ul>
  </li>
</ul>

<h4 style="${STYLES.exampleHeader}">Example 3</h4>

<p style="${STYLES.paragraph}">A linear function f passes through the points (1, 5), (3, 9), and (7, 17). Which of the following equations defines f?</p>

<p style="margin: 0.3rem 0 0.5rem 0;">
<span style="${STYLES.choiceText}">A. f(x) = x + 4</span><br>
<span style="${STYLES.choiceText}">B. f(x) = 2x + 3</span><br>
<span style="${STYLES.choiceText}">C. f(x) = 3x + 2</span><br>
<span style="${STYLES.choiceText}">D. f(x) = 4x + 1</span><br>
<span style="${STYLES.choiceText}">E. f(x) = x + 5</span>
</p>

<p style="margin: 1.5rem 0 0.75rem 0;"><strong>Solution:</strong></p>

<ul style="${STYLES.ul}">
  <li style="${STYLES.li}">Test with point (1, 5) — plug in x = 1, should get f(1) = 5:
    <ul style="${STYLES.nested_ul}">
      <li>Choice A: f(1) = 1 + 4 = 5 ✓</li>
      <li>Choice B: f(1) = 2(1) + 3 = 5 ✓</li>
      <li>Choice C: f(1) = 3(1) + 2 = 5 ✓</li>
      <li>Choice D: f(1) = 4(1) + 1 = 5 ✓</li>
      <li>Choice E: f(1) = 1 + 5 = 6 ✗ (Eliminate E)</li>
    </ul>
  </li>
  <li style="${STYLES.li}">Four choices still work! Test with point (3, 9) — plug in x = 3, should get f(3) = 9:
    <ul style="${STYLES.nested_ul}">
      <li>Choice A: f(3) = 3 + 4 = 7 ✗ (Eliminate A)</li>
      <li>Choice B: f(3) = 2(3) + 3 = 9 ✓</li>
      <li>Choice C: f(3) = 3(3) + 2 = 11 ✗ (Eliminate C)</li>
      <li>Choice D: f(3) = 4(3) + 1 = 13 ✗ (Eliminate D)</li>
    </ul>
  </li>
  <li style="${STYLES.li}">Only B remains! We could verify with (7, 17): f(7) = 2(7) + 3 = 17 ✓</li>
</ul>

<p style="${STYLES.paragraph}">
Answer: B
</p>

<h3 style="${STYLES.h3}">5. Advanced Tips for Backsolving</h3>

<h4 style="${STYLES.h4Section}"><strong style="${STYLES.blueUnderline}">Combining Backsolving with Estimation</strong></h4>

<ul style="${STYLES.ul}">
  <li style="${STYLES.li}">Sometimes you can eliminate choices before testing:
    <ul style="${STYLES.nested_ul}">
      <li>Read the problem carefully for clues about the size of the answer</li>
      <li>Example: "The width is less than 10 feet" immediately eliminates larger choices</li>
      <li>Use logical reasoning to narrow options before calculating</li>
    </ul>
  </li>
</ul>

<h4 style="${STYLES.h4Section}"><strong style="${STYLES.blueUnderline}">Strategic Answer Choice Selection</strong></h4>

<ul style="${STYLES.ul}">
  <li style="${STYLES.li}">Not all B/C choices are created equal:
    <ul style="${STYLES.nested_ul}">
      <li>If C involves messy numbers (like 7/13 or √17), start with B instead</li>
      <li>Choose the middle choice that's easiest to work with</li>
      <li>Round numbers (like 5, 10, 100) are often faster to test</li>
    </ul>
  </li>
</ul>

<h4 style="${STYLES.h4Section}"><strong style="${STYLES.blueUnderline}">When to Switch Strategies</strong></h4>

<ul style="${STYLES.ul}">
  <li style="${STYLES.li}">If testing the first choice is very complicated:
    <ul style="${STYLES.nested_ul}">
      <li>Reconsider whether algebraic solving might be faster</li>
      <li>But if you're already committed, keep going—switching wastes time</li>
    </ul>
  </li>
</ul>

<h4 style="${STYLES.exampleHeader}">Example 4</h4>

<p style="${STYLES.paragraph}">A rectangle has a length that is 4 inches greater than its width. If the perimeter is 32 inches, what is the width?</p>

<p style="margin: 0.3rem 0 0.5rem 0;">
<span style="${STYLES.choiceText}">A. 4 inches</span><br>
<span style="${STYLES.choiceText}">B. 6 inches</span><br>
<span style="${STYLES.choiceText}">C. 8 inches</span><br>
<span style="${STYLES.choiceText}">D. 10 inches</span><br>
<span style="${STYLES.choiceText}">E. 12 inches</span>
</p>

<p style="margin: 1.5rem 0 0.75rem 0;"><strong>Solution:</strong></p>

<ul style="${STYLES.ul}">
  <li style="${STYLES.li}">Set up: Perimeter = 2(length) + 2(width), and length = width + 4</li>
  <li style="${STYLES.li}">Start with C (width = 8):
    <ul style="${STYLES.nested_ul}">
      <li>Length = 8 + 4 = 12</li>
      <li>Perimeter = 2(12) + 2(8) = 24 + 16 = 40</li>
      <li>Result: 40 ≠ 32 ✗</li>
      <li>Analysis: We got 40 but need 32, so the width must be smaller</li>
    </ul>
  </li>
  <li style="${STYLES.li}">Try B (width = 6):
    <ul style="${STYLES.nested_ul}">
      <li>Length = 6 + 4 = 10</li>
      <li>Perimeter = 2(10) + 2(6) = 20 + 12 = 32</li>
      <li>Result: 32 = 32 ✓</li>
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
    <span style="${STYLES.checkmark}">✓</span>Always start with B or C (middle choices) to eliminate faster
  </li>
  <li style="${STYLES.keyTakeawayLi}">
    <span style="${STYLES.checkmark}">✓</span>Best for: specific numeric answers, equations, word problems, coordinate points
  </li>
  <li style="${STYLES.keyTakeawayLi}">
    <span style="${STYLES.checkmark}">✓</span>Not ideal for: algebraic expression answers or when direct solving is obviously faster
  </li>
  <li style="${STYLES.keyTakeawayLi}">
    <span style="${STYLES.checkmark}">✓</span>For coordinate points: plug in x-values and verify you get the correct y-values
  </li>
  <li style="${STYLES.keyTakeawayLi}">
    <span style="${STYLES.checkmark}">✓</span>Use logical reasoning to eliminate choices before testing when possible
  </li>
  <li style="${STYLES.keyTakeawayLi}">
    <span style="${STYLES.checkmark}">✓</span>One answer MUST work—keep testing systematically until you find it
  </li>
</ul>`;

async function main() {
  console.log('Updating backsolving lesson...');

  try {
    const { data, error } = await supabase
      .from('lessons')
      .update({
        content: newContent,
        updated_at: new Date().toISOString()
      })
      .eq('lesson_key', 'backsolving')
      .select();

    if (error) {
      console.error('Error updating lesson:', error);
      process.exit(1);
    }

    console.log('✓ Successfully updated backsolving lesson');
    console.log('  - Added blue underlined key terms');
    console.log('  - Added red-bordered examples');
    console.log('  - Added comprehensive nested bullet points');
    console.log('  - Added Key Takeaways section');
    console.log('  - Applied consistent inline styling');
    console.log('  - Content length:', newContent.length, 'characters');

    process.exit(0);
  } catch (error) {
    console.error('Fatal error:', error);
    process.exit(1);
  }
}

main();
