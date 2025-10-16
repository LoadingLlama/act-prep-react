import { createClient } from '@supabase/supabase-js';
import dotenv from 'dotenv';
import { supabaseUrl, supabaseServiceKey } from './config.mjs';

dotenv.config();

const SERVICE_ROLE_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InJhYmF2b2Jka2xud3Z3c2xkYml4Iiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc1OTc2NTQ3OCwiZXhwIjoyMDc1MzQxNDc4fQ.81SeH703keXgF3IevQlRS7OYmn1J2GUVIkn3OJiviM4';

const supabase = createClient(
  process.env.REACT_APP_SUPABASE_URL,
  SERVICE_ROLE_KEY
);

const cleanContent = `
<div class="lesson-content">
  <h2>Substitution</h2>

  <p class="lesson-intro">In the first two lessons, you will learn two important test-taking techniques: backsolving and substitution. As you work through these lessons, use these techniques whenever you can to solve questions.</p>

  <h3>What is Substitution?</h3>

  <p>Do you prefer working with numbers or variables? We would guess your answer is numbers! On the ACT, some questions have many unknown variables and few or no numbers at all. Students often find these questions more difficult. If you prefer to work with numbers, let's work with numbers! With substitution, we substitute simple numbers in for variables and solve the question using numbers instead of relying on more complex algebra with variables.</p>

  <h3>How to Use Substitution: 4 Steps</h3>

  <ol class="instruction-list">
    <li>
      <strong>Pick a number for the variable(s) in the question.</strong>
      <ul style="margin-top: 0.5rem; padding-left: 1.5rem;">
        <li>Pick easy numbers...avoid using 0 and 1. Use 2, 3, 4 or other easy numbers. Use 10 for percent problems, 10 or 20 for group size, etc.</li>
        <li>Select different numbers for each variable. For example, if a question has an <em>x</em> and a <em>y</em>, pick <em>x</em> = 2 and <em>y</em> = 3.</li>
        <li>Follow any rules in the question. For example, if a question says <em>x</em> is a number that is negative and even, pick <em>x</em> = −2.</li>
      </ul>
    </li>

    <li><strong>Write down the number(s) that you have picked.</strong></li>

    <li><strong>Use your number(s) to work your way through the question and find your answer.</strong></li>

    <li><strong>Plug your number(s) into the answer choices.</strong> The correct answer will be the one that matches your answer.</li>
  </ol>

  <p>Substitution may seem a bit confusing just reading the steps, so let's take a look at some example questions to see how useful this technique can be.</p>

  <h3>Example Problems</h3>

  <div class="example-box" style="margin: 2rem 0; padding: 0; background: #f8f9fa; border-left: 4px solid #4CAF50; border-radius: 4px; overflow: hidden;">
    <div style="background: #e8f5e9; padding: 1rem 1.5rem; border-bottom: 2px solid #4CAF50;">
      <h4 style="margin: 0 0 0.5rem 0; color: #2c3e50; font-size: 1.1rem;">Example 1</h4>
      <p style="margin: 0;"><strong>Problem:</strong> Jeremy has <em>n</em> boxes of candy bars. Each box contains <em>m</em> bars of candy. Jeremy has to sell 70% of his candy bars to make enough money for rent. Which of the following expresses the number of candy bars Jeremy must sell in terms of <em>m</em> and <em>n</em>?</p>
      <ul style="list-style: none; padding-left: 0; margin: 0.5rem 0 0 0;">
        <li>A. 7(<em>m</em> + <em>n</em>)</li>
        <li>B. 70<em>nm</em></li>
        <li>C. <em>nm</em> + <em>m</em></li>
        <li>D. 0.7<em>nm</em></li>
      </ul>
    </div>
    <div style="background: #fff3e0; padding: 1rem 1.5rem;">
      <p style="margin: 0 0 0.5rem 0;"><strong>Solution:</strong></p>
      <p style="margin: 0.5rem 0;">This question may at first seem intimidating with all the variables. To make this question easier, let's plug in numbers. We can say that Jeremy has 2 boxes of candy, so <em>n</em> = 2, and that each box contains 5 bars of candy, so <em>m</em> = 5. With our numbers, Jeremy has a total of 10 candy bars. He needs to sell 70% to make enough money for rent, so we can find the total candy bars that he must sell by finding 70% of 10.</p>
      <div style="background: white; padding: 1rem; margin: 0.75rem 0; border-radius: 4px; border: 1px solid #ddd;">
        <p style="margin: 0.25rem 0;">0.7(10) = 7</p>
      </div>
      <p style="margin: 0.5rem 0;">With our numbers, Jeremy must sell 7 candy bars, so our answer is 7. Now, we can plug in the values we selected for <em>n</em> and <em>m</em> into the answer choices and see which one is equal to 7. Here, we find that D works:</p>
      <div style="background: white; padding: 1rem; margin: 0.75rem 0; border-radius: 4px; border: 1px solid #ddd;">
        <p style="margin: 0.25rem 0;">0.7<em>nm</em> = 0.7(2)(5) = 7 ✓</p>
      </div>
      <p style="margin: 0.5rem 0 0 0;"><strong>Answer: D</strong></p>
      <p style="margin: 0.25rem 0 0 0; font-size: 0.95rem;">None of the other answer choices are equal to 7 when we plug in our values for <em>n</em> and <em>m</em>. No matter what numbers you pick for <em>n</em> and <em>m</em>, you will find that D is the answer.</p>
    </div>
  </div>

  <div class="example-box" style="margin: 2rem 0; padding: 0; background: #f8f9fa; border-left: 4px solid #4CAF50; border-radius: 4px; overflow: hidden;">
    <div style="background: #e8f5e9; padding: 1rem 1.5rem; border-bottom: 2px solid #4CAF50;">
      <h4 style="margin: 0 0 0.5rem 0; color: #2c3e50; font-size: 1.1rem;">Example 2</h4>
      <p style="margin: 0;"><strong>Problem:</strong> If cos(2<em>x</em>°) = <em>a</em>, which of the following equations is also true for all values of <em>x</em>?</p>
      <ul style="list-style: none; padding-left: 0; margin: 0.5rem 0 0 0;">
        <li>A. sin(2<em>x</em>°) = <em>a</em></li>
        <li>B. sin(<em>x</em>° + 90°) = <em>a</em></li>
        <li>C. cos(90° − 2<em>x</em>°) = <em>a</em></li>
        <li>D. sin(90° − 2<em>x</em>°) = <em>a</em></li>
      </ul>
    </div>
    <div style="background: #fff3e0; padding: 1rem 1.5rem;">
      <p style="margin: 0 0 0.5rem 0;"><strong>Solution:</strong></p>
      <p style="margin: 0.5rem 0;">The easiest way to solve this question is to pick a value for <em>x</em> and use your calculator. Let's pick <em>x</em> = 10°. First, we need to find out what <em>a</em> equals if <em>x</em> = 10°.</p>
      <div style="background: white; padding: 1rem; margin: 0.75rem 0; border-radius: 4px; border: 1px solid #ddd;">
        <p style="margin: 0.25rem 0;">cos(2<em>x</em>°) = <em>a</em></p>
        <p style="margin: 0.25rem 0;">cos(20°) = <em>a</em></p>
        <p style="margin: 0.25rem 0;"><em>a</em> = 0.9397</p>
      </div>
      <p style="margin: 0.5rem 0;">Now that we know what <em>a</em> equals, we can plug in <em>x</em> = 10° for the <em>x</em>-values in the answer choices to see which is equal to 0.9397. Here, we can see how the correct answer choice of D works:</p>
      <div style="background: white; padding: 1rem; margin: 0.75rem 0; border-radius: 4px; border: 1px solid #ddd;">
        <p style="margin: 0.25rem 0;">sin(90° − 2<em>x</em>°) = <em>a</em></p>
        <p style="margin: 0.25rem 0;">sin(90° − 20°) = sin(70°)</p>
        <p style="margin: 0.25rem 0;">sin(70°) = 0.9397 ✓</p>
      </div>
      <p style="margin: 0.5rem 0 0 0;"><strong>Answer: D</strong></p>
      <p style="margin: 0.25rem 0 0 0; font-size: 0.95rem;">This trick will work for any value of <em>x</em> that we pick. Note that since we are solving in degrees, your calculator must be in degree mode. If you get a value other than cos(20°) = 0.9397 when you input cos(20) in your calculator, your calculator is in radian mode.</p>
    </div>
  </div>

  <div class="example-box" style="margin: 2rem 0; padding: 0; background: #f8f9fa; border-left: 4px solid #4CAF50; border-radius: 4px; overflow: hidden;">
    <div style="background: #e8f5e9; padding: 1rem 1.5rem; border-bottom: 2px solid #4CAF50;">
      <h4 style="margin: 0 0 0.5rem 0; color: #2c3e50; font-size: 1.1rem;">Example 3</h4>
      <p style="margin: 0;"><strong>Problem:</strong> The length of a rectangle is tripled and the width of the rectangle is halved to create a new rectangle. How many times as large is the area of the new rectangle than the area of the original rectangle?</p>
      <ul style="list-style: none; padding-left: 0; margin: 0.5rem 0 0 0;">
        <li>A. 1.5</li>
        <li>B. 2</li>
        <li>C. 3</li>
        <li>D. 4</li>
      </ul>
    </div>
    <div style="background: #fff3e0; padding: 1rem 1.5rem;">
      <p style="margin: 0 0 0.5rem 0;"><strong>Solution:</strong></p>
      <p style="margin: 0.5rem 0;">To make this question easier, we can pick values for the length and width of the rectangle. Let's make the length 3 and the width 2. Now, we just follow the steps in the question.</p>
      <div style="background: white; padding: 1rem; margin: 0.75rem 0; border-radius: 4px; border: 1px solid #ddd;">
        <p style="margin: 0.25rem 0;"><strong>Original rectangle:</strong></p>
        <p style="margin: 0.25rem 0;">Length = 3, Width = 2</p>
        <p style="margin: 0.25rem 0;">Area = 3 × 2 = 6</p>
        <p style="margin: 0.75rem 0 0.25rem 0;"><strong>New rectangle:</strong></p>
        <p style="margin: 0.25rem 0;">The length is tripled: 3(3) = 9</p>
        <p style="margin: 0.25rem 0;">The width is halved: 2(½) = 1</p>
        <p style="margin: 0.25rem 0;">Area = 9 × 1 = 9</p>
      </div>
      <p style="margin: 0.5rem 0;">Next, we find the areas of the rectangles and compare. The new rectangle has an area of 9. The original rectangle has an area of 6, so we find that the new rectangle is 1.5 times as large (9 ÷ 6 = 1.5).</p>
      <p style="margin: 0.5rem 0 0 0;"><strong>Answer: A</strong></p>
    </div>
  </div>

  <div class="tip-box" style="margin: 2rem 0; padding: 1.5rem; background: #e3f2fd; border-left: 4px solid #2196F3; border-radius: 4px;">
    <h4 style="margin: 0 0 0.5rem 0; color: #1976d2;">Key Takeaway</h4>
    <p style="margin: 0;">Substitution is a powerful technique when you encounter questions with many variables and few numbers. By picking simple numbers and testing the answer choices, you can turn abstract algebraic problems into concrete arithmetic that's much easier to solve!</p>
  </div>
</div>
`.trim();

async function updateSubstitutionLesson() {
  console.log('Updating Substitution lesson with clean formatting...\\n');

  const { data, error } = await supabase
    .from('lessons')
    .update({ content: cleanContent })
    .eq('lesson_key', 'substitution')
    .select();

  if (error) {
    console.error('❌ Error updating lesson:', error);
  } else {
    console.log('✅ Successfully updated Substitution lesson!');
    console.log(`   Lesson ID: ${data[0].id}`);
    console.log(`   New content length: ${cleanContent.length} characters`);
    console.log('');
    console.log('Changes made:');
    console.log('  ✓ Removed duplicate "Lesson:" text');
    console.log('  ✓ Converted 4 steps into proper ordered list with nested sub-steps');
    console.log('  ✓ Fixed all 3 examples with proper structure and complete problem statements');
    console.log('  ✓ Added two-tone example boxes (green Problem, orange Solution)');
    console.log('  ✓ Added solution boxes with clean formatting');
    console.log('  ✓ Added "Key Takeaway" tip box');
    console.log('  ✓ Removed all broken HTML and formatting issues');
    console.log('  ✓ Clean headings (1 h2, 3 h3 tags only)');
  }
}

updateSubstitutionLesson();
