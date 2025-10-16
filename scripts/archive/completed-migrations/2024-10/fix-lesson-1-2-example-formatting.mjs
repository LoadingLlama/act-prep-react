import { createClient } from '@supabase/supabase-js';
import * as dotenv from 'dotenv';
import { fileURLToPath } from 'url';
import { dirname, resolve } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
dotenv.config({ path: resolve(__dirname, '../.env') });

const supabase = createClient(
  process.env.REACT_APP_SUPABASE_URL,
  process.env.SUPABASE_SERVICE_ROLE_KEY
);

// Better formatted examples with styled answer choices
const contentBlock1 = `<p style="font-size: 16px; line-height: 1.7; margin: 0.5rem 0 1rem 0;">The <strong style="color: #2563eb; font-weight: 600; text-decoration: underline;">number substitution technique</strong>, also called <strong style="color: #2563eb; font-weight: 600; text-decoration: underline;">plugging in numbers</strong>, is a powerful ACT strategy that transforms abstract algebra into simple arithmetic. Instead of manipulating variables and expressions, you <strong style="color: #2563eb; font-weight: 600; text-decoration: underline;">substitute actual numbers</strong> for variables to test which answer choice works. This technique is especially effective when answer choices contain variables or when the algebra looks overwhelming.</p>

<h3 style="margin-top: 5rem; margin-bottom: 0.75rem; font-weight: 700;">1. What Is Number Substitution?</h3>

<p style="font-size: 16px; line-height: 1.7; margin: 0.5rem 0 1rem 0;"><strong style="color: #2563eb; font-weight: 600; text-decoration: underline;">Number substitution</strong> means picking your own numbers to replace variables in the problem. You calculate a target answer using your chosen numbers, then test each answer choice with those same numbers to see which one matches your target.</p>

<ul style="margin: 0.3rem 0 0.5rem 0; padding-left: 1.5rem; line-height: 1.5;">
  <li style="margin: 0.15rem 0;">Key advantages:
    <ul style="margin: 0.15rem 0 0.15rem 0; padding-left: 1.5rem;">
      <li>Converts complex algebra into simple arithmetic</li>
      <li>Reduces chance of algebraic manipulation errors</li>
      <li>Works excellently when answer choices contain variables</li>
      <li>Often faster than traditional algebra</li>
    </ul>
  </li>
  <li style="margin: 0.15rem 0;"><strong style="color: #2563eb; font-weight: 600; text-decoration: underline;">When to Use Substitution</strong>:
    <ul style="margin: 0.15rem 0 0.15rem 0; padding-left: 1.5rem;">
      <li>Answer choices contain variables (like <em>x</em>, <em>n</em>, <em>a</em> + <em>b</em>)</li>
      <li>The problem says "in terms of" another variable</li>
      <li>The algebra involves multiple variables or complex expressions</li>
      <li>You can easily pick numbers that satisfy the problem's conditions</li>
    </ul>
  </li>
</ul>

<h4 style="margin: 0 0 1rem 0; padding-left: 0.75rem; border-left: 4px solid #b91c1c; color: #000000; font-weight: 700;">Example 1: Basic Substitution</h4>

<p style="font-size: 16px; line-height: 1.7; margin: 0.5rem 0 1rem 0;">For all values of <em>x</em>, which of the following is equivalent to (<em>x</em> + 3)(<em>x</em> + 5)?</p>

<div style="margin: 0.75rem 0; padding: 0.75rem 1rem; background: #f9fafb; border-left: 3px solid #d1d5db;">
  <div style="font-family: 'Times New Roman', Times, Georgia, serif; line-height: 1.9;">
    <div style="margin: 0.3rem 0;"><strong>A.</strong> <em>x</em><sup>2</sup> + 15</div>
    <div style="margin: 0.3rem 0;"><strong>B.</strong> <em>x</em><sup>2</sup> + 8<em>x</em> + 8</div>
    <div style="margin: 0.3rem 0;"><strong>C.</strong> <em>x</em><sup>2</sup> + 8<em>x</em> + 15</div>
    <div style="margin: 0.3rem 0;"><strong>D.</strong> 2<em>x</em> + 8</div>
    <div style="margin: 0.3rem 0;"><strong>E.</strong> <em>x</em><sup>2</sup> + 15<em>x</em></div>
  </div>
</div>

<p style="margin: 1.5rem 0 0.75rem 0;"><strong>Solution:</strong></p>

<ul style="margin: 0.3rem 0 0.5rem 0; padding-left: 1.5rem; line-height: 1.5;">
  <li style="margin: 0.15rem 0;">Pick <em>x</em> = 2 (simple number, not 0 or 1)</li>
  <li style="margin: 0.15rem 0;">Calculate target: (2 + 3)(2 + 5) = (5)(7) = 35</li>
  <li style="margin: 0.15rem 0;">Test C: 2<sup>2</sup> + 8(2) + 15 = 4 + 16 + 15 = 35 ✓</li>
</ul>

<p style="font-size: 16px; line-height: 1.7; margin: 0.5rem 0 1rem 0;"><strong>Answer: C</strong></p>

<h3 style="margin-top: 5rem; margin-bottom: 0.75rem; font-weight: 700;">2. The Substitution Process</h3>

<p style="font-size: 16px; line-height: 1.7; margin: 0.5rem 0 1rem 0;">Follow these four steps to substitute numbers effectively:</p>

<h4 style="margin-top: 2rem; margin-bottom: 0.3rem; font-weight: 400;">Step 1: Choose Smart Numbers</h4>

<ul style="margin: 0.3rem 0 0.5rem 0; padding-left: 1.5rem; line-height: 1.5;">
  <li style="margin: 0.15rem 0;">Pick numbers that make calculations easy but avoid common traps:
    <ul style="margin: 0.15rem 0 0.15rem 0; padding-left: 1.5rem;">
      <li>✓ Use simple numbers like 2, 3, 4, 5, 10</li>
      <li>✗ Avoid 0 (causes division by zero, special cases)</li>
      <li>✗ Avoid 1 (neutral for multiplication, masks patterns)</li>
      <li>✗ Avoid -1 (can create confusing results)</li>
      <li>✓ If problem involves fractions, pick numbers that simplify easily</li>
      <li>✓ If problem involves percent, consider using 100</li>
    </ul>
  </li>
</ul>

<h4 style="margin-top: 2rem; margin-bottom: 0.3rem; font-weight: 400;">Step 2: Calculate Your Target</h4>

<ul style="margin: 0.3rem 0 0.5rem 0; padding-left: 1.5rem; line-height: 1.5;">
  <li style="margin: 0.15rem 0;">Use your chosen numbers to work through the problem
    <ul style="margin: 0.15rem 0 0.15rem 0; padding-left: 1.5rem;">
      <li>Calculate what the answer should be with your numbers</li>
      <li>This becomes your <strong style="color: #2563eb; font-weight: 600; text-decoration: underline;">target value</strong></li>
      <li>Write it down clearly</li>
    </ul>
  </li>
</ul>

<h4 style="margin-top: 2rem; margin-bottom: 0.3rem; font-weight: 400;">Step 3: Test Each Answer Choice</h4>

<ul style="margin: 0.3rem 0 0.5rem 0; padding-left: 1.5rem; line-height: 1.5;">
  <li style="margin: 0.15rem 0;">Plug your chosen numbers into each answer choice
    <ul style="margin: 0.15rem 0 0.15rem 0; padding-left: 1.5rem;">
      <li>Substitute carefully - one variable at a time</li>
      <li>Calculate the result for each choice</li>
      <li>Compare with your target value</li>
    </ul>
  </li>
</ul>

<h4 style="margin-top: 2rem; margin-bottom: 0.3rem; font-weight: 400;">Step 4: Verify Your Answer</h4>

<ul style="margin: 0.3rem 0 0.5rem 0; padding-left: 1.5rem; line-height: 1.5;">
  <li style="margin: 0.15rem 0;">The choice that matches your target is correct
    <ul style="margin: 0.15rem 0 0.15rem 0; padding-left: 1.5rem;">
      <li>If multiple choices match, pick different numbers and test again</li>
      <li>This rarely happens with well-chosen numbers</li>
    </ul>
  </li>
</ul>`;

const contentBlock2 = `<h4 style="margin: 0 0 1rem 0; padding-left: 0.75rem; border-left: 4px solid #b91c1c; color: #000000; font-weight: 700;">Example 2: Percent Problem with Substitution</h4>

<p style="font-size: 16px; line-height: 1.7; margin: 0.5rem 0 1rem 0;">A store increases all prices by <em>p</em>% then decreases the new prices by <em>p</em>%. What is the net percent change?</p>

<div style="margin: 0.75rem 0; padding: 0.75rem 1rem; background: #f9fafb; border-left: 3px solid #d1d5db;">
  <div style="font-family: 'Times New Roman', Times, Georgia, serif; line-height: 1.9;">
    <div style="margin: 0.3rem 0;"><strong>F.</strong> 0%</div>
    <div style="margin: 0.3rem 0;"><strong>G.</strong> −<em>p</em>%</div>
    <div style="margin: 0.3rem 0;"><strong>H.</strong> −<em>p</em><sup>2</sup>/100%</div>
    <div style="margin: 0.3rem 0;"><strong>J.</strong> <em>p</em><sup>2</sup>%</div>
    <div style="margin: 0.3rem 0;"><strong>K.</strong> −2<em>p</em>%</div>
  </div>
</div>

<p style="margin: 1.5rem 0 0.75rem 0;"><strong>Solution:</strong></p>

<ul style="margin: 0.3rem 0 0.5rem 0; padding-left: 1.5rem; line-height: 1.5;">
  <li style="margin: 0.15rem 0;">Step 1: Pick <em>p</em> = 10 and original price = $100</li>
  <li style="margin: 0.15rem 0;">Step 2: After 10% increase: $100 × 1.10 = $110</li>
  <li style="margin: 0.15rem 0;">After 10% decrease: $110 × 0.90 = $99</li>
  <li style="margin: 0.15rem 0;">Target: $99 − $100 = −$1, which is −1%</li>
  <li style="margin: 0.15rem 0;">Step 3: Test H: −(10)<sup>2</sup>/100 = −100/100 = −1% ✓</li>
</ul>

<p style="font-size: 16px; line-height: 1.7; margin: 0.5rem 0 1rem 0;"><strong>Answer: H</strong></p>

<h4 style="margin: 0 0 1rem 0; padding-left: 0.75rem; border-left: 4px solid #b91c1c; color: #000000; font-weight: 700;">Example 3: Variables in Answer Choices</h4>

<p style="font-size: 16px; line-height: 1.7; margin: 0.5rem 0 1rem 0;">If <em>x</em> + <em>y</em> = 10 and <em>x</em> − <em>y</em> = 4, what is <em>x</em><sup>2</sup> − <em>y</em><sup>2</sup>?</p>

<div style="margin: 0.75rem 0; padding: 0.75rem 1rem; background: #f9fafb; border-left: 3px solid #d1d5db;">
  <div style="font-family: 'Times New Roman', Times, Georgia, serif; line-height: 1.9;">
    <div style="margin: 0.3rem 0;"><strong>A.</strong> 6</div>
    <div style="margin: 0.3rem 0;"><strong>B.</strong> 14</div>
    <div style="margin: 0.3rem 0;"><strong>C.</strong> 40</div>
    <div style="margin: 0.3rem 0;"><strong>D.</strong> 100</div>
    <div style="margin: 0.3rem 0;"><strong>E.</strong> 116</div>
  </div>
</div>

<p style="margin: 1.5rem 0 0.75rem 0;"><strong>Solution:</strong></p>

<ul style="margin: 0.3rem 0 0.5rem 0; padding-left: 1.5rem; line-height: 1.5;">
  <li style="margin: 0.15rem 0;">From the two equations, solve to get <em>x</em> = 7, <em>y</em> = 3</li>
  <li style="margin: 0.15rem 0;">Calculate target: <em>x</em><sup>2</sup> − <em>y</em><sup>2</sup> = 7<sup>2</sup> − 3<sup>2</sup> = 49 − 9 = 40 ✓</li>
  <li style="margin: 0.15rem 0;">Notice: This also equals (<em>x</em> + <em>y</em>)(<em>x</em> − <em>y</em>) = 10 × 4 = 40</li>
</ul>

<p style="font-size: 16px; line-height: 1.7; margin: 0.5rem 0 1rem 0;"><strong>Answer: C</strong></p>

<h3 style="margin-top: 5rem; margin-bottom: 0.75rem; font-weight: 700;">3. Common Pitfalls and ACT Tips</h3>

<p style="font-size: 16px; line-height: 1.7; margin: 0.5rem 0 1rem 0;">Avoid these mistakes and master these ACT-specific strategies:</p>

<ul style="margin: 0.3rem 0 0.5rem 0; padding-left: 1.5rem; line-height: 1.5;">
  <li style="margin: 0.15rem 0;"><strong>Avoid Special Numbers:</strong> Never use 0, 1, or -1—they can make wrong answers appear correct due to their unique mathematical properties</li>
  <li style="margin: 0.15rem 0;"><strong>Calculator Advantage:</strong> Substitution lets you use your calculator even on algebra problems, giving you speed and accuracy</li>
  <li style="margin: 0.15rem 0;"><strong>When NOT to Substitute:</strong> If the algebra is very simple (like 2<em>x</em> + 5 = 13), just solve it directly—substitution would waste time</li>
  <li style="margin: 0.15rem 0;"><strong>If Two Match:</strong> Rarely happens, but if two answer choices give the same result, pick different numbers and test only those two again</li>
  <li style="margin: 0.15rem 0;"><strong>Don't Overthink:</strong> Simple numbers like 2, 3, 5, or 10 almost always work perfectly</li>
</ul>

<p style="height: 1px; margin: 0; padding: 0;"></p>

<h3 style="margin-top: 5rem; margin-bottom: 0.75rem; font-weight: 700; visibility: hidden; height: 0; margin: 0; padding: 0; overflow: hidden;">.</h3>

<h3 style="color: #2e7d32; font-size: 1.4rem; font-weight: 700; margin: 3rem 0 1.5rem 0;">Key Takeaways</h3>

<ul style="list-style: none; padding: 0; margin: 0;">
  <li style="margin-bottom: 0.8rem; color: #2e7d32; font-size: 16px; line-height: 1.6;">
    <span style="color: #4caf50; font-weight: bold; margin-right: 0.5rem;">✓</span>Number substitution converts abstract algebra into concrete arithmetic
  </li>
  <li style="margin-bottom: 0.8rem; color: #2e7d32; font-size: 16px; line-height: 1.6;">
    <span style="color: #4caf50; font-weight: bold; margin-right: 0.5rem;">✓</span>Use substitution when answer choices contain variables or expressions
  </li>
  <li style="margin-bottom: 0.8rem; color: #2e7d32; font-size: 16px; line-height: 1.6;">
    <span style="color: #4caf50; font-weight: bold; margin-right: 0.5rem;">✓</span>Choose simple numbers like 2, 3, 5, or 10—avoid 0, 1, and -1
  </li>
  <li style="margin-bottom: 0.8rem; color: #2e7d32; font-size: 16px; line-height: 1.6;">
    <span style="color: #4caf50; font-weight: bold; margin-right: 0.5rem;">✓</span>Follow 4 steps: choose numbers, calculate target, test choices, verify answer
  </li>
  <li style="margin-bottom: 0.8rem; color: #2e7d32; font-size: 16px; line-height: 1.6;">
    <span style="color: #4caf50; font-weight: bold; margin-right: 0.5rem;">✓</span>The answer choice that matches your target value is correct
  </li>
  <li style="margin-bottom: 0.8rem; color: #2e7d32; font-size: 16px; line-height: 1.6;">
    <span style="color: #4caf50; font-weight: bold; margin-right: 0.5rem;">✓</span>Substitution often saves time and reduces algebraic errors on the ACT
  </li>
</ul>`;

async function fixExampleFormatting() {
  console.log('Fixing example answer choice formatting...\n');

  const { data: lesson } = await supabase
    .from('lesson_metadata')
    .select('id')
    .eq('lesson_key', 'substitution')
    .single();

  const { data: mainSection } = await supabase
    .from('lesson_sections')
    .select('id')
    .eq('lesson_id', lesson.id)
    .eq('section_key', 'substitution-main')
    .single();

  await supabase
    .from('section_content')
    .delete()
    .eq('section_id', mainSection.id);

  await supabase
    .from('section_content')
    .insert([
      {
        section_id: mainSection.id,
        content_type: 'html',
        content: contentBlock1,
        order_index: 0
      },
      {
        section_id: mainSection.id,
        content_type: 'html',
        content: contentBlock2,
        order_index: 1
      }
    ]);

  console.log('✅ Fixed! Answer choices now in styled boxes.');
  console.log('');
  console.log('Note: Examples are TEACHING EXAMPLES with solutions shown.');
  console.log('      They are NOT interactive - you read through the solution.');
  console.log('');
  console.log('The INTERACTIVE QUIZ (Mastery Check) appears at the end of the lesson.');
  console.log('Scroll to the bottom to find the 10-question quiz where you CAN click answers.');
  console.log('');
  console.log('Refresh your browser!');
}

fixExampleFormatting().catch(console.error);
