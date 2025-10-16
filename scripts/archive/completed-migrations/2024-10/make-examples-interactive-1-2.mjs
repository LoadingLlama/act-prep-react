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

// Interactive examples with hidden solutions
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

<div class="interactive-example" style="margin: 2rem 0; padding: 1.5rem; background: #f8fafc; border: 2px solid #e2e8f0; border-radius: 8px;">
  <h4 style="margin: 0 0 1rem 0; padding-left: 0.75rem; border-left: 4px solid #b91c1c; color: #000000; font-weight: 700;">Example 1: Basic Substitution</h4>

  <p style="font-size: 16px; line-height: 1.7; margin: 0.5rem 0 1rem 0;">For all values of <em>x</em>, which of the following is equivalent to (<em>x</em> + 3)(<em>x</em> + 5)?</p>

  <div class="example-choices" style="margin: 1rem 0;">
    <label class="example-choice" style="display: block; padding: 0.75rem; margin: 0.5rem 0; background: white; border: 2px solid #e2e8f0; border-radius: 6px; cursor: pointer; transition: all 0.2s;" onmouseover="this.style.borderColor='#3b82f6'; this.style.background='#eff6ff';" onmouseout="this.style.borderColor='#e2e8f0'; this.style.background='white';" onclick="this.parentElement.querySelectorAll('.example-choice').forEach(el => el.style.borderColor='#e2e8f0'); this.style.borderColor='#10b981'; this.style.background='#d1fae5'; this.parentElement.parentElement.querySelector('.example-solution').style.display='block';">
      <input type="radio" name="ex1" value="A" style="margin-right: 0.5rem;">
      <span style="font-family: 'Times New Roman', Times, Georgia, serif;"><strong>A.</strong> <em>x</em><sup>2</sup> + 15</span>
    </label>
    <label class="example-choice" style="display: block; padding: 0.75rem; margin: 0.5rem 0; background: white; border: 2px solid #e2e8f0; border-radius: 6px; cursor: pointer; transition: all 0.2s;" onmouseover="this.style.borderColor='#3b82f6'; this.style.background='#eff6ff';" onmouseout="this.style.borderColor='#e2e8f0'; this.style.background='white';" onclick="this.parentElement.querySelectorAll('.example-choice').forEach(el => el.style.borderColor='#e2e8f0'); this.style.borderColor='#10b981'; this.style.background='#d1fae5'; this.parentElement.parentElement.querySelector('.example-solution').style.display='block';">
      <input type="radio" name="ex1" value="B" style="margin-right: 0.5rem;">
      <span style="font-family: 'Times New Roman', Times, Georgia, serif;"><strong>B.</strong> <em>x</em><sup>2</sup> + 8<em>x</em> + 8</span>
    </label>
    <label class="example-choice" style="display: block; padding: 0.75rem; margin: 0.5rem 0; background: white; border: 2px solid #10b981; border-radius: 6px; cursor: pointer; transition: all 0.2s;" onmouseover="this.style.borderColor='#3b82f6'; this.style.background='#eff6ff';" onmouseout="if(!this.querySelector('input').checked) { this.style.borderColor='#e2e8f0'; this.style.background='white'; } else { this.style.borderColor='#10b981'; this.style.background='#d1fae5'; }" onclick="this.parentElement.querySelectorAll('.example-choice').forEach(el => el.style.borderColor='#e2e8f0'); this.style.borderColor='#10b981'; this.style.background='#d1fae5'; this.parentElement.parentElement.querySelector('.example-solution').style.display='block';">
      <input type="radio" name="ex1" value="C" style="margin-right: 0.5rem;">
      <span style="font-family: 'Times New Roman', Times, Georgia, serif;"><strong>C.</strong> <em>x</em><sup>2</sup> + 8<em>x</em> + 15</span>
      <span style="margin-left: 0.5rem; color: #10b981; font-weight: bold;">✓ CORRECT</span>
    </label>
    <label class="example-choice" style="display: block; padding: 0.75rem; margin: 0.5rem 0; background: white; border: 2px solid #e2e8f0; border-radius: 6px; cursor: pointer; transition: all 0.2s;" onmouseover="this.style.borderColor='#3b82f6'; this.style.background='#eff6ff';" onmouseout="this.style.borderColor='#e2e8f0'; this.style.background='white';" onclick="this.parentElement.querySelectorAll('.example-choice').forEach(el => el.style.borderColor='#e2e8f0'); this.style.borderColor='#10b981'; this.style.background='#d1fae5'; this.parentElement.parentElement.querySelector('.example-solution').style.display='block';">
      <input type="radio" name="ex1" value="D" style="margin-right: 0.5rem;">
      <span style="font-family: 'Times New Roman', Times, Georgia, serif;"><strong>D.</strong> 2<em>x</em> + 8</span>
    </label>
    <label class="example-choice" style="display: block; padding: 0.75rem; margin: 0.5rem 0; background: white; border: 2px solid #e2e8f0; border-radius: 6px; cursor: pointer; transition: all 0.2s;" onmouseover="this.style.borderColor='#3b82f6'; this.style.background='#eff6ff';" onmouseout="this.style.borderColor='#e2e8f0'; this.style.background='white';" onclick="this.parentElement.querySelectorAll('.example-choice').forEach(el => el.style.borderColor='#e2e8f0'); this.style.borderColor='#10b981'; this.style.background='#d1fae5'; this.parentElement.parentElement.querySelector('.example-solution').style.display='block';">
      <input type="radio" name="ex1" value="E" style="margin-right: 0.5rem;">
      <span style="font-family: 'Times New Roman', Times, Georgia, serif;"><strong>E.</strong> <em>x</em><sup>2</sup> + 15<em>x</em></span>
    </label>
  </div>

  <div class="example-solution" style="display: none; margin-top: 1.5rem; padding: 1rem; background: #fef3c7; border-left: 4px solid #f59e0b; border-radius: 4px;">
    <p style="margin: 0 0 0.75rem 0;"><strong>Solution:</strong></p>
    <ul style="margin: 0.3rem 0 0.5rem 0; padding-left: 1.5rem; line-height: 1.5;">
      <li style="margin: 0.15rem 0;">Pick <em>x</em> = 2 (simple number, not 0 or 1)</li>
      <li style="margin: 0.15rem 0;">Calculate target: (2 + 3)(2 + 5) = (5)(7) = 35</li>
      <li style="margin: 0.15rem 0;">Test C: 2<sup>2</sup> + 8(2) + 15 = 4 + 16 + 15 = 35 ✓</li>
    </ul>
    <p style="font-size: 16px; line-height: 1.7; margin: 0.5rem 0 0 0;"><strong>Answer: C</strong></p>
  </div>
</div>

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

const contentBlock2 = `<div class="interactive-example" style="margin: 2rem 0; padding: 1.5rem; background: #f8fafc; border: 2px solid #e2e8f0; border-radius: 8px;">
  <h4 style="margin: 0 0 1rem 0; padding-left: 0.75rem; border-left: 4px solid #b91c1c; color: #000000; font-weight: 700;">Example 2: Percent Problem with Substitution</h4>

  <p style="font-size: 16px; line-height: 1.7; margin: 0.5rem 0 1rem 0;">A store increases all prices by <em>p</em>% then decreases the new prices by <em>p</em>%. What is the net percent change?</p>

  <div class="example-choices" style="margin: 1rem 0;">
    <label class="example-choice" style="display: block; padding: 0.75rem; margin: 0.5rem 0; background: white; border: 2px solid #e2e8f0; border-radius: 6px; cursor: pointer; transition: all 0.2s;" onmouseover="this.style.borderColor='#3b82f6'; this.style.background='#eff6ff';" onmouseout="this.style.borderColor='#e2e8f0'; this.style.background='white';" onclick="this.parentElement.querySelectorAll('.example-choice').forEach(el => el.style.borderColor='#e2e8f0'); this.style.borderColor='#10b981'; this.style.background='#d1fae5'; this.parentElement.parentElement.querySelector('.example-solution').style.display='block';">
      <input type="radio" name="ex2" value="F" style="margin-right: 0.5rem;">
      <span style="font-family: 'Times New Roman', Times, Georgia, serif;"><strong>F.</strong> 0%</span>
    </label>
    <label class="example-choice" style="display: block; padding: 0.75rem; margin: 0.5rem 0; background: white; border: 2px solid #e2e8f0; border-radius: 6px; cursor: pointer; transition: all 0.2s;" onmouseover="this.style.borderColor='#3b82f6'; this.style.background='#eff6ff';" onmouseout="this.style.borderColor='#e2e8f0'; this.style.background='white';" onclick="this.parentElement.querySelectorAll('.example-choice').forEach(el => el.style.borderColor='#e2e8f0'); this.style.borderColor='#10b981'; this.style.background='#d1fae5'; this.parentElement.parentElement.querySelector('.example-solution').style.display='block';">
      <input type="radio" name="ex2" value="G" style="margin-right: 0.5rem;">
      <span style="font-family: 'Times New Roman', Times, Georgia, serif;"><strong>G.</strong> −<em>p</em>%</span>
    </label>
    <label class="example-choice" style="display: block; padding: 0.75rem; margin: 0.5rem 0; background: white; border: 2px solid #10b981; border-radius: 6px; cursor: pointer; transition: all 0.2s;" onmouseover="this.style.borderColor='#3b82f6'; this.style.background='#eff6ff';" onmouseout="if(!this.querySelector('input').checked) { this.style.borderColor='#e2e8f0'; this.style.background='white'; } else { this.style.borderColor='#10b981'; this.style.background='#d1fae5'; }" onclick="this.parentElement.querySelectorAll('.example-choice').forEach(el => el.style.borderColor='#e2e8f0'); this.style.borderColor='#10b981'; this.style.background='#d1fae5'; this.parentElement.parentElement.querySelector('.example-solution').style.display='block';">
      <input type="radio" name="ex2" value="H" style="margin-right: 0.5rem;">
      <span style="font-family: 'Times New Roman', Times, Georgia, serif;"><strong>H.</strong> −<em>p</em><sup>2</sup>/100%</span>
      <span style="margin-left: 0.5rem; color: #10b981; font-weight: bold;">✓ CORRECT</span>
    </label>
    <label class="example-choice" style="display: block; padding: 0.75rem; margin: 0.5rem 0; background: white; border: 2px solid #e2e8f0; border-radius: 6px; cursor: pointer; transition: all 0.2s;" onmouseover="this.style.borderColor='#3b82f6'; this.style.background='#eff6ff';" onmouseout="this.style.borderColor='#e2e8f0'; this.style.background='white';" onclick="this.parentElement.querySelectorAll('.example-choice').forEach(el => el.style.borderColor='#e2e8f0'); this.style.borderColor='#10b981'; this.style.background='#d1fae5'; this.parentElement.parentElement.querySelector('.example-solution').style.display='block';">
      <input type="radio" name="ex2" value="J" style="margin-right: 0.5rem;">
      <span style="font-family: 'Times New Roman', Times, Georgia, serif;"><strong>J.</strong> <em>p</em><sup>2</sup>%</span>
    </label>
    <label class="example-choice" style="display: block; padding: 0.75rem; margin: 0.5rem 0; background: white; border: 2px solid #e2e8f0; border-radius: 6px; cursor: pointer; transition: all 0.2s;" onmouseover="this.style.borderColor='#3b82f6'; this.style.background='#eff6ff';" onmouseout="this.style.borderColor='#e2e8f0'; this.style.background='white';" onclick="this.parentElement.querySelectorAll('.example-choice').forEach(el => el.style.borderColor='#e2e8f0'); this.style.borderColor='#10b981'; this.style.background='#d1fae5'; this.parentElement.parentElement.querySelector('.example-solution').style.display='block';">
      <input type="radio" name="ex2" value="K" style="margin-right: 0.5rem;">
      <span style="font-family: 'Times New Roman', Times, Georgia, serif;"><strong>K.</strong> −2<em>p</em>%</span>
    </label>
  </div>

  <div class="example-solution" style="display: none; margin-top: 1.5rem; padding: 1rem; background: #fef3c7; border-left: 4px solid #f59e0b; border-radius: 4px;">
    <p style="margin: 0 0 0.75rem 0;"><strong>Solution:</strong></p>
    <ul style="margin: 0.3rem 0 0.5rem 0; padding-left: 1.5rem; line-height: 1.5;">
      <li style="margin: 0.15rem 0;">Step 1: Pick <em>p</em> = 10 and original price = $100</li>
      <li style="margin: 0.15rem 0;">Step 2: After 10% increase: $100 × 1.10 = $110</li>
      <li style="margin: 0.15rem 0;">After 10% decrease: $110 × 0.90 = $99</li>
      <li style="margin: 0.15rem 0;">Target: $99 − $100 = −$1, which is −1%</li>
      <li style="margin: 0.15rem 0;">Step 3: Test H: −(10)<sup>2</sup>/100 = −100/100 = −1% ✓</li>
    </ul>
    <p style="font-size: 16px; line-height: 1.7; margin: 0.5rem 0 0 0;"><strong>Answer: H</strong></p>
  </div>
</div>

<div class="interactive-example" style="margin: 2rem 0; padding: 1.5rem; background: #f8fafc; border: 2px solid #e2e8f0; border-radius: 8px;">
  <h4 style="margin: 0 0 1rem 0; padding-left: 0.75rem; border-left: 4px solid #b91c1c; color: #000000; font-weight: 700;">Example 3: Variables in Answer Choices</h4>

  <p style="font-size: 16px; line-height: 1.7; margin: 0.5rem 0 1rem 0;">If <em>x</em> + <em>y</em> = 10 and <em>x</em> − <em>y</em> = 4, what is <em>x</em><sup>2</sup> − <em>y</em><sup>2</sup>?</p>

  <div class="example-choices" style="margin: 1rem 0;">
    <label class="example-choice" style="display: block; padding: 0.75rem; margin: 0.5rem 0; background: white; border: 2px solid #e2e8f0; border-radius: 6px; cursor: pointer; transition: all 0.2s;" onmouseover="this.style.borderColor='#3b82f6'; this.style.background='#eff6ff';" onmouseout="this.style.borderColor='#e2e8f0'; this.style.background='white';" onclick="this.parentElement.querySelectorAll('.example-choice').forEach(el => el.style.borderColor='#e2e8f0'); this.style.borderColor='#10b981'; this.style.background='#d1fae5'; this.parentElement.parentElement.querySelector('.example-solution').style.display='block';">
      <input type="radio" name="ex3" value="A" style="margin-right: 0.5rem;">
      <span style="font-family: 'Times New Roman', Times, Georgia, serif;"><strong>A.</strong> 6</span>
    </label>
    <label class="example-choice" style="display: block; padding: 0.75rem; margin: 0.5rem 0; background: white; border: 2px solid #e2e8f0; border-radius: 6px; cursor: pointer; transition: all 0.2s;" onmouseover="this.style.borderColor='#3b82f6'; this.style.background='#eff6ff';" onmouseout="this.style.borderColor='#e2e8f0'; this.style.background='white';" onclick="this.parentElement.querySelectorAll('.example-choice').forEach(el => el.style.borderColor='#e2e8f0'); this.style.borderColor='#10b981'; this.style.background='#d1fae5'; this.parentElement.parentElement.querySelector('.example-solution').style.display='block';">
      <input type="radio" name="ex3" value="B" style="margin-right: 0.5rem;">
      <span style="font-family: 'Times New Roman', Times, Georgia, serif;"><strong>B.</strong> 14</span>
    </label>
    <label class="example-choice" style="display: block; padding: 0.75rem; margin: 0.5rem 0; background: white; border: 2px solid #10b981; border-radius: 6px; cursor: pointer; transition: all 0.2s;" onmouseover="this.style.borderColor='#3b82f6'; this.style.background='#eff6ff';" onmouseout="if(!this.querySelector('input').checked) { this.style.borderColor='#e2e8f0'; this.style.background='white'; } else { this.style.borderColor='#10b981'; this.style.background='#d1fae5'; }" onclick="this.parentElement.querySelectorAll('.example-choice').forEach(el => el.style.borderColor='#e2e8f0'); this.style.borderColor='#10b981'; this.style.background='#d1fae5'; this.parentElement.parentElement.querySelector('.example-solution').style.display='block';">
      <input type="radio" name="ex3" value="C" style="margin-right: 0.5rem;">
      <span style="font-family: 'Times New Roman', Times, Georgia, serif;"><strong>C.</strong> 40</span>
      <span style="margin-left: 0.5rem; color: #10b981; font-weight: bold;">✓ CORRECT</span>
    </label>
    <label class="example-choice" style="display: block; padding: 0.75rem; margin: 0.5rem 0; background: white; border: 2px solid #e2e8f0; border-radius: 6px; cursor: pointer; transition: all 0.2s;" onmouseover="this.style.borderColor='#3b82f6'; this.style.background='#eff6ff';" onmouseout="this.style.borderColor='#e2e8f0'; this.style.background='white';" onclick="this.parentElement.querySelectorAll('.example-choice').forEach(el => el.style.borderColor='#e2e8f0'); this.style.borderColor='#10b981'; this.style.background='#d1fae5'; this.parentElement.parentElement.querySelector('.example-solution').style.display='block';">
      <input type="radio" name="ex3" value="D" style="margin-right: 0.5rem;">
      <span style="font-family: 'Times New Roman', Times, Georgia, serif;"><strong>D.</strong> 100</span>
    </label>
    <label class="example-choice" style="display: block; padding: 0.75rem; margin: 0.5rem 0; background: white; border: 2px solid #e2e8f0; border-radius: 6px; cursor: pointer; transition: all 0.2s;" onmouseover="this.style.borderColor='#3b82f6'; this.style.background='#eff6ff';" onmouseout="this.style.borderColor='#e2e8f0'; this.style.background='white';" onclick="this.parentElement.querySelectorAll('.example-choice').forEach(el => el.style.borderColor='#e2e8f0'); this.style.borderColor='#10b981'; this.style.background='#d1fae5'; this.parentElement.parentElement.querySelector('.example-solution').style.display='block';">
      <input type="radio" name="ex3" value="E" style="margin-right: 0.5rem;">
      <span style="font-family: 'Times New Roman', Times, Georgia, serif;"><strong>E.</strong> 116</span>
    </label>
  </div>

  <div class="example-solution" style="display: none; margin-top: 1.5rem; padding: 1rem; background: #fef3c7; border-left: 4px solid #f59e0b; border-radius: 4px;">
    <p style="margin: 0 0 0.75rem 0;"><strong>Solution:</strong></p>
    <ul style="margin: 0.3rem 0 0.5rem 0; padding-left: 1.5rem; line-height: 1.5;">
      <li style="margin: 0.15rem 0;">From the two equations, solve to get <em>x</em> = 7, <em>y</em> = 3</li>
      <li style="margin: 0.15rem 0;">Calculate target: <em>x</em><sup>2</sup> − <em>y</em><sup>2</sup> = 7<sup>2</sup> − 3<sup>2</sup> = 49 − 9 = 40 ✓</li>
      <li style="margin: 0.15rem 0;">Notice: This also equals (<em>x</em> + <em>y</em>)(<em>x</em> − <em>y</em>) = 10 × 4 = 40</li>
    </ul>
    <p style="font-size: 16px; line-height: 1.7; margin: 0.5rem 0 0 0;"><strong>Answer: C</strong></p>
  </div>
</div>

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

async function makeInteractive() {
  console.log('Making examples interactive...\n');

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

  console.log('✅ Examples are now INTERACTIVE!');
  console.log('');
  console.log('How it works:');
  console.log('  1. Click any answer choice');
  console.log('  2. Solution appears below');
  console.log('  3. Correct answer is marked with green ✓');
  console.log('');
  console.log('Refresh your browser to see the interactive examples!');
}

makeInteractive().catch(console.error);
