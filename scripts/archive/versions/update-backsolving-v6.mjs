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

  <div style="margin: 3rem 0; padding: 2rem; background: #f8fafb !important; border: 2px solid #e5e7eb; border-radius: 12px;">
    <h4 style="margin: 0 0 1.5rem 0; padding-bottom: 0.75rem; border-bottom: 2px solid #4CAF50; color: #2c3e50; font-size: 1.2rem;">Example 1</h4>

    <div style="margin-bottom: 2rem; padding: 1.5rem; background: #e8f5e9 !important; border-radius: 8px;">
      <p style="margin: 0 0 1rem 0; font-weight: 600; color: #1b5e20;">PROBLEM:</p>
      <p style="margin: 0 0 1rem 0;">If <span style="white-space: nowrap;">√<span style="text-decoration: overline;">(x + 10)</span></span> − 2<span style="white-space: nowrap;">√<span style="text-decoration: overline;">(x − 2)</span></span> = 0, what is the value of x?</p>
      <p style="margin: 0;">A. 2<br>B. 6<br>C. 14<br>D. 18</p>
    </div>

    <div style="margin-bottom: 0; padding: 1.5rem; background: #fff3e0 !important; border-radius: 8px;">
      <p style="margin: 0 0 1rem 0; font-weight: 600; color: #e65100;">SOLUTION:</p>
      <p style="margin: 0 0 1.5rem 0;">The quickest and easiest way to solve this question is backsolving. Finding the correct answer is just a process of guess-and-check. Below, you can see how the correct answer B, when x = 6, makes the equation true.</p>

      <div style="text-align: center; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Arial, sans-serif; font-size: 1.1rem; line-height: 2.2; margin: 1.5rem 0; padding: 1.25rem; background: rgba(255, 255, 255, 0.8) !important; border-radius: 6px;">
        <div><span style="white-space: nowrap;">√<span style="text-decoration: overline;">(6 + 10)</span></span> − 2<span style="white-space: nowrap;">√<span style="text-decoration: overline;">(6 − 2)</span></span> = 0</div>
        <div><span style="white-space: nowrap;">√<span style="text-decoration: overline;">16</span></span> − 2<span style="white-space: nowrap;">√<span style="text-decoration: overline;">4</span></span> = 0</div>
        <div>4 − 2(2) = 0</div>
        <div>4 − 4 = 0</div>
        <div style="color: #2e7d32; font-weight: 600;">0 = 0 ✓</div>
      </div>

      <p style="margin: 1.5rem 0 0 0; font-weight: 600; color: #2c3e50;">Answer: B</p>
    </div>
  </div>

  <div style="margin: 3rem 0; padding: 2rem; background: #f8fafb !important; border: 2px solid #e5e7eb; border-radius: 12px;">
    <h4 style="margin: 0 0 1.5rem 0; padding-bottom: 0.75rem; border-bottom: 2px solid #4CAF50; color: #2c3e50; font-size: 1.2rem;">Example 2</h4>

    <div style="margin-bottom: 2rem; padding: 1.5rem; background: #e8f5e9 !important; border-radius: 8px;">
      <p style="margin: 0 0 1rem 0; font-weight: 600; color: #1b5e20;">PROBLEM:</p>
      <p style="margin: 0 0 1rem 0;">Which of the following is a solution to the equation x³ + 5x² + 6x = 0?</p>
      <p style="margin: 0;">A. -3<br>B. -1<br>C. 1<br>D. 2</p>
    </div>

    <div style="margin-bottom: 0; padding: 1.5rem; background: #fff3e0 !important; border-radius: 8px;">
      <p style="margin: 0 0 1rem 0; font-weight: 600; color: #e65100;">SOLUTION:</p>
      <p style="margin: 0 0 1.5rem 0;">Most students look at this question and think, "Oh no, I need to factor this to solve." However, the easiest way to solve this question is backsolving! We plug the answer choices into the equation to see which one makes it equal 0.</p>

      <div style="text-align: center; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Arial, sans-serif; font-size: 1.1rem; line-height: 2.2; margin: 1.5rem 0; padding: 1.25rem; background: rgba(255, 255, 255, 0.8) !important; border-radius: 6px;">
        <div>(−3)³ + 5(−3)² + 6(−3) = 0</div>
        <div>−27 + 45 − 18 = 0</div>
        <div style="color: #2e7d32; font-weight: 600;">0 = 0 ✓</div>
      </div>

      <p style="margin: 1.5rem 0 0 0; font-weight: 600; color: #2c3e50;">Answer: A</p>
    </div>
  </div>

  <h3>Backsolving With Points</h3>

  <p>For questions with points in the question or answer choices, it is often effective to backsolve with points. For this method, we will use the point(s) to test which equation works correctly. Remember, if a point is on a graph, it must make the equation of the graph true.</p>

  <div style="margin: 3rem 0; padding: 2rem; background: #f8fafb !important; border: 2px solid #e5e7eb; border-radius: 12px;">
    <h4 style="margin: 0 0 1.5rem 0; padding-bottom: 0.75rem; border-bottom: 2px solid #4CAF50; color: #2c3e50; font-size: 1.2rem;">Example 3</h4>

    <div style="margin-bottom: 2rem; padding: 1.5rem; background: #e8f5e9 !important; border-radius: 8px;">
      <p style="margin: 0 0 1rem 0; font-weight: 600; color: #1b5e20;">PROBLEM:</p>
      <p style="margin: 0 0 1rem 0;">A linear function f passes through the points (1, 5), (3, 9), and (7, 17). Which of the following equations defines f?</p>
      <p style="margin: 0;">A. f(x) = 2x + 5<br>B. f(x) = x + 5<br>C. f(x) = 4x + 1<br>D. f(x) = 2x + 3</p>
    </div>

    <div style="margin-bottom: 0; padding: 1.5rem; background: #fff3e0 !important; border-radius: 8px;">
      <p style="margin: 0 0 1rem 0; font-weight: 600; color: #e65100;">SOLUTION:</p>
      <p style="margin: 0 0 1.5rem 0;">Here, the simplest way to solve is to test the answer choices using the points in the question. Let's start with the point (1, 5). When we plug in x = 1, we need to get f(1) = 5.</p>

      <div style="text-align: center; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Arial, sans-serif; font-size: 1.05rem; line-height: 2.2; margin: 1.5rem 0; padding: 1.25rem; background: rgba(255, 255, 255, 0.8) !important; border-radius: 6px;">
        <div><strong>Choice A:</strong> f(1) = 2(1) + 5 = 7 <span style="color: #d32f2f;">✗</span></div>
        <div><strong>Choice B:</strong> f(1) = 1 + 5 = 6 <span style="color: #d32f2f;">✗</span></div>
        <div><strong>Choice C:</strong> f(1) = 4(1) + 1 = 5 <span style="color: #2e7d32;">✓</span></div>
        <div><strong>Choice D:</strong> f(1) = 2(1) + 3 = 5 <span style="color: #2e7d32;">✓</span></div>
      </div>

      <p style="margin: 0 0 1.5rem 0;">Answer choices A and B do not work, so we can eliminate those. Answer choices C and D both work, so we need to use a second point. Let's use the point (3, 9).</p>

      <div style="text-align: center; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Arial, sans-serif; font-size: 1.05rem; line-height: 2.2; margin: 1.5rem 0; padding: 1.25rem; background: rgba(255, 255, 255, 0.8) !important; border-radius: 6px;">
        <div><strong>Choice C:</strong> f(3) = 4(3) + 1 = 13 <span style="color: #d32f2f;">✗</span></div>
        <div><strong>Choice D:</strong> f(3) = 2(3) + 3 = 9 <span style="color: #2e7d32;">✓</span></div>
      </div>

      <p style="margin: 1.5rem 0 0 0; font-weight: 600; color: #2c3e50;">Answer: D</p>
    </div>
  </div>

  <div style="margin: 3rem 0 2rem 0; padding: 1.5rem; background: #e3f2fd !important; border-left: 4px solid #2196F3; border-radius: 8px;">
    <h4 style="margin: 0 0 0.75rem 0; color: #1565c0; font-size: 1.1rem;">💡 Key Takeaway</h4>
    <p style="margin: 0; line-height: 1.7;">Backsolving is one of the most powerful test-taking strategies for the ACT Math section. Use it whenever you see answer choices that are numbers or when you get stuck on a question. It's often faster than solving algebraically!</p>
  </div>
</div>
`.trim();

async function updateBacksolvingLesson() {
  console.log('Updating Backsolving lesson with better math formatting...\\n');

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
    console.log('Typography improvements:');
    console.log('  ✓ Changed to readable sans-serif font (Arial/Segoe UI)');
    console.log('  ✓ Square roots now have overline covering entire expression');
    console.log('  ✓ Used text-decoration: overline for radical vinculum');
    console.log('  ✓ Larger font size (1.1rem) for better readability');
    console.log('  ✓ Increased line-height for breathing room');
    console.log('  ✓ Color-coded checkmarks (green ✓) and x marks (red ✗)');
  }
}

updateBacksolvingLesson();
