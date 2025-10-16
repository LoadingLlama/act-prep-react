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
  <h2>Backsolving</h2>

  <p class="lesson-intro">In the first two lessons, you will learn two important test-taking techniques: backsolving and substitution. As you work through these lessons, use these techniques whenever you can to solve questions.</p>

  <h3>What is Backsolving?</h3>

  <p>Backsolving is plugging the answer choices back into the question. On the ACT, you are given 4 answer choices for multiple choice questions, and one of those 4 choices must be correct. Rather than solving the question algebraically and determining whether your answer matches one of the answer choices, you can guess-and-check with the answer choices to find which one is correct.</p>

  <p>Backsolving is often the fastest and easiest way to solve ACT questions, especially if you get stuck and cannot solve a question algebraically, so use it to your advantage.</p>

  <h3>How to Backsolve: 5 Steps</h3>

  <ol class="instruction-list">
    <li><strong>Start with B or C.</strong> Plug the value in the answer choice back into the question. The answer choices are always in order of smallest to largest or largest to smallest, so starting in the middle saves you time.</li>

    <li><strong>Solve the question using this value.</strong> Find any other unknowns if necessary.</li>

    <li><strong>If this answer choice works correctly, you're done!</strong> Bubble it in and move on.</li>

    <li><strong>If this answer choice does not work, cross it off.</strong> If you know the correct answer needs to be smaller or larger than the value you just tried, cross off any other incorrect answers.</li>

    <li><strong>Pick one of the remaining answer choices and plug it back into the question.</strong> Repeat this until you find the correct answer. Remember, one of the 4 answer choices must work!</li>
  </ol>

  <h3>Example Problems</h3>

  <div class="example-box" style="margin: 2rem 0; padding: 0; background: #f8f9fa; border-left: 4px solid #4CAF50; border-radius: 4px; overflow: hidden;">
    <div style="background: #e8f5e9; padding: 1rem 1.5rem; border-bottom: 2px solid #4CAF50;">
      <h4 style="margin: 0 0 0.5rem 0; color: #2c3e50; font-size: 1.1rem;">Example 1</h4>
      <p style="margin: 0;"><strong>Problem:</strong> If √(x + 10) − 2√(x − 2) = 0, what is the value of x?</p>
      <ul style="list-style: none; padding-left: 0; margin: 0.5rem 0 0 0;">
        <li>A. 2</li>
        <li>B. 6</li>
        <li>C. 14</li>
        <li>D. 18</li>
      </ul>
    </div>
    <div style="background: #fff3e0; padding: 1rem 1.5rem;">
      <p style="margin: 0 0 0.5rem 0;"><strong>Solution:</strong></p>
      <p style="margin: 0.5rem 0;">The quickest and easiest way to solve this question is backsolving. Finding the correct answer is just a process of guess-and-check. Below, you can see how the correct answer B, when x = 6, makes the equation true.</p>
      <div style="background: white; padding: 1rem; margin: 0.75rem 0; border-radius: 4px; border: 1px solid #ddd;">
        <p style="margin: 0.25rem 0;">√(6 + 10) − 2√(6 − 2) = 0</p>
        <p style="margin: 0.25rem 0;">√16 − 2√4 = 0</p>
        <p style="margin: 0.25rem 0;">4 − 2(2) = 0</p>
        <p style="margin: 0.25rem 0;">4 − 4 = 0</p>
        <p style="margin: 0.25rem 0;">0 = 0 ✓</p>
      </div>
      <p style="margin: 0.5rem 0 0 0;"><strong>Answer: B</strong></p>
      <p style="margin: 0.25rem 0 0 0; font-size: 0.95rem;">If we plug in any of the other answer choices, we will get an equation that is not equal on both sides.</p>
    </div>
  </div>

  <div class="example-box" style="margin: 2rem 0; padding: 0; background: #f8f9fa; border-left: 4px solid #4CAF50; border-radius: 4px; overflow: hidden;">
    <div style="background: #e8f5e9; padding: 1rem 1.5rem; border-bottom: 2px solid #4CAF50;">
      <h4 style="margin: 0 0 0.5rem 0; color: #2c3e50; font-size: 1.1rem;">Example 2</h4>
      <p style="margin: 0;"><strong>Problem:</strong> Which of the following is a solution to the equation x³ + 5x² + 6x = 0?</p>
      <ul style="list-style: none; padding-left: 0; margin: 0.5rem 0 0 0;">
        <li>A. -3</li>
        <li>B. -1</li>
        <li>C. 1</li>
        <li>D. 2</li>
      </ul>
    </div>
    <div style="background: #fff3e0; padding: 1rem 1.5rem;">
      <p style="margin: 0 0 0.5rem 0;"><strong>Solution:</strong></p>
      <p style="margin: 0.5rem 0;">Most students look at this question and think, "Oh no, I need to factor this to solve." However, the easiest way to solve this question is backsolving! We plug the answer choices into the equation to see which one makes it equal 0.</p>
      <div style="background: white; padding: 1rem; margin: 0.75rem 0; border-radius: 4px; border: 1px solid #ddd;">
        <p style="margin: 0.25rem 0;">(−3)³ + 5(−3)² + 6(−3) = 0</p>
        <p style="margin: 0.25rem 0;">−27 + 45 − 18 = 0</p>
        <p style="margin: 0.25rem 0;">0 = 0 ✓</p>
      </div>
      <p style="margin: 0.5rem 0 0 0;"><strong>Answer: A</strong></p>
      <p style="margin: 0.25rem 0 0 0; font-size: 0.95rem;">If we plug in any other answer choices, the equation will not equal 0.</p>
    </div>
  </div>

  <h3>Backsolving With Points</h3>

  <p>For questions with points in the question or answer choices, it is often effective to backsolve with points. For this method, we will use the point(s) to test which equation works correctly. Remember, if a point is on a graph, it must make the equation of the graph true.</p>

  <div class="example-box" style="margin: 2rem 0; padding: 0; background: #f8f9fa; border-left: 4px solid #4CAF50; border-radius: 4px; overflow: hidden;">
    <div style="background: #e8f5e9; padding: 1rem 1.5rem; border-bottom: 2px solid #4CAF50;">
      <h4 style="margin: 0 0 0.5rem 0; color: #2c3e50; font-size: 1.1rem;">Example 3</h4>
      <p style="margin: 0;"><strong>Problem:</strong> A linear function f passes through the points (1, 5), (3, 9), and (7, 17). Which of the following equations defines f?</p>
      <ul style="list-style: none; padding-left: 0; margin: 0.5rem 0 0 0;">
        <li>A. f(x) = 2x + 5</li>
        <li>B. f(x) = x + 5</li>
        <li>C. f(x) = 4x + 1</li>
        <li>D. f(x) = 2x + 3</li>
      </ul>
    </div>
    <div style="background: #fff3e0; padding: 1rem 1.5rem;">
      <p style="margin: 0 0 0.5rem 0;"><strong>Solution:</strong></p>
      <p style="margin: 0.5rem 0;">Here, the simplest way to solve is to test the answer choices using the points in the question. Let's start with the point (1, 5). When we plug in x = 1, we need to get f(1) = 5.</p>
      <div style="background: white; padding: 1rem; margin: 0.75rem 0; border-radius: 4px; border: 1px solid #ddd;">
        <p style="margin: 0.25rem 0;"><strong>For answer choice A:</strong> f(1) = 2(1) + 5 → f(1) = 7 (incorrect)</p>
        <p style="margin: 0.25rem 0;"><strong>For answer choice B:</strong> f(1) = 1 + 5 → f(1) = 6 (incorrect)</p>
        <p style="margin: 0.25rem 0;"><strong>For answer choice C:</strong> f(1) = 4(1) + 1 → f(1) = 5 ✓ (works)</p>
        <p style="margin: 0.25rem 0;"><strong>For answer choice D:</strong> f(1) = 2(1) + 3 → f(1) = 5 ✓ (works)</p>
      </div>
      <p style="margin: 0.5rem 0;">Answer choices A and B do not work, so we can eliminate those. Answer choices C and D both work, so we need to use a second point. Let's use the point (3, 9).</p>
      <div style="background: white; padding: 1rem; margin: 0.75rem 0; border-radius: 4px; border: 1px solid #ddd;">
        <p style="margin: 0.25rem 0;"><strong>For answer choice C:</strong> f(3) = 4(3) + 1 → f(3) = 13 (incorrect)</p>
        <p style="margin: 0.25rem 0;"><strong>For answer choice D:</strong> f(3) = 2(3) + 3 → f(3) = 9 ✓ (correct)</p>
      </div>
      <p style="margin: 0.5rem 0 0 0;"><strong>Answer: D</strong></p>
      <p style="margin: 0.25rem 0 0 0; font-size: 0.95rem;">As you can see, we can solve this question by backsolving with points. This method is much easier than solving algebraically.</p>
    </div>
  </div>

  <div class="tip-box" style="margin: 2rem 0; padding: 1.5rem; background: #e3f2fd; border-left: 4px solid #2196F3; border-radius: 4px;">
    <h4 style="margin: 0 0 0.5rem 0; color: #1976d2;">Key Takeaway</h4>
    <p style="margin: 0;">Backsolving is one of the most powerful test-taking strategies for the ACT Math section. Use it whenever you see answer choices that are numbers or when you get stuck on a question. It's often faster than solving algebraically!</p>
  </div>
</div>
`.trim();

async function updateBacksolvingLesson() {
  console.log('Updating Backsolving lesson with improved visual distinction...\n');

  const { data, error } = await supabase
    .from('lessons')
    .update({ content: cleanContent })
    .eq('lesson_key', 'backsolving')
    .select();

  if (error) {
    console.error('❌ Error updating lesson:', error);
  } else {
    console.log('✅ Successfully updated Backsolving lesson!');
    console.log(`   Lesson ID: ${data[0].id}`);
    console.log(`   New content length: ${cleanContent.length} characters`);
    console.log('');
    console.log('Visual improvements:');
    console.log('  ✓ Problem section: Light green background (#e8f5e9)');
    console.log('  ✓ Solution section: Light orange background (#fff3e0)');
    console.log('  ✓ Work shown: White boxes with borders');
    console.log('  ✓ Clear visual separation between sections');
  }
}

updateBacksolvingLesson();
