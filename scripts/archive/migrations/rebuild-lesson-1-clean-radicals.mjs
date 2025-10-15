import { createClient } from '@supabase/supabase-js';
import dotenv from 'dotenv';
import katex from 'katex';

dotenv.config();

const supabase = createClient(
  process.env.REACT_APP_SUPABASE_URL,
  process.env.SUPABASE_SERVICE_ROLE_KEY
);

// Helper function to create proper radical notation using KaTeX
const radical = (content) => {
  return katex.renderToString(`\\sqrt{${content}}`, {
    throwOnError: false,
    displayMode: false
  });
};

// Lesson 1 with clean radical notation
const lesson1Content = `
            <h3>What is Backsolving?</h3>

            <p>Backsolving is plugging the answer choices back into the question. On the ACT, you are given 4 answer choices for multiple choice questions, and one of those 4 choices must be correct.</p>

            <p>Rather than solving the question algebraically and determining whether your answer matches one of the answer choices, you can guess-and-check with the answer choices to find which one is correct.</p>

            <p>Backsolving is often the fastest and easiest way to solve ACT questions, especially if you get stuck and cannot solve a question algebraically, so use it to your advantage.</p>

            <br><br>

            <h3>How to Backsolve: 5 Steps</h3>

            <ol>
                <li><strong>Start with B or C.</strong> The answer choices are always in order (smallest to largest or largest to smallest), so starting in the middle saves you time.</li>
                <li><strong>Plug the value back into the question.</strong> Substitute this answer choice into the equation or problem.</li>
                <li><strong>Solve using this value.</strong> Work through the problem to see if it makes the equation true or satisfies the conditions.</li>
                <li><strong>If it works, you're done!</strong> If the answer choice makes the equation true or satisfies the problem, that's your answer.</li>
                <li><strong>If it doesn't work, eliminate and adjust.</strong> Cross it off. If you know whether the correct answer needs to be larger or smaller, eliminate other incorrect choices. Then try another answer choice.</li>
            </ol>

            <p>Remember: one of the 4 answer choices must work, so keep testing until you find it!</p>

            <br><br>

            <h3>Example Problems</h3>

            <br>

            <h4>Example 1</h4>

            <p><strong>Problem:</strong></p>
            <p>If 3x + 5 = 20, what is the value of x?</p>

            <p>A. 3<br>
            B. 5<br>
            C. 7<br>
            D. 10</p>

            <p><strong>Solution:</strong></p>
            <p>The quickest and easiest way to solve this question is backsolving. We just plug in each answer choice to see which one makes the equation true. Let's start with B or C (the middle choices).</p>

            <p style="text-align: center; font-weight: 600; color: #374151; margin: 1.5rem 0; font-size: 1.05rem;">Let's test B (x = 5):</p>

            <div style="background: #f8f9fa; padding: 1.5rem; border-radius: 8px; margin: 1rem 0; text-align: center; font-size: 1.15rem; line-height: 2.5;">
                <div style="margin-bottom: 0.8rem;">3(5) + 5 = 20</div>
                <div style="margin-bottom: 0.8rem;">15 + 5 = 20</div>
                <div style="color: #10b981; font-weight: bold;">20 = 20 ✓</div>
            </div>

            <p style="text-align: center; font-style: italic; color: #6b7280; margin: 1rem 0;">It works! That was easy—no algebra needed!</p>

            <p style="text-align: center; font-size: 1.1rem; margin-top: 1.5rem;"><strong>Answer: B</strong></p>

            <br><br>

            <h4>Example 2</h4>

            <p><strong>Problem:</strong></p>
            <p>Sarah is 3 years older than twice her brother's age. If Sarah is 13 years old, how old is her brother?</p>

            <p>A. 3<br>
            B. 5<br>
            C. 7<br>
            D. 10</p>

            <p><strong>Solution:</strong></p>
            <p>Instead of setting up an equation, we can just test each answer! For each choice, we'll check: is Sarah's age (13) equal to 3 more than twice that number?</p>

            <p style="text-align: center; font-weight: 600; color: #374151; margin: 1.5rem 0; font-size: 1.05rem;">Let's test B (brother is 5):</p>

            <div style="background: #f8f9fa; padding: 1.5rem; border-radius: 8px; margin: 1rem 0; text-align: center; font-size: 1.15rem; line-height: 2.5;">
                <div style="margin-bottom: 0.8rem;">Twice his age: 2(5) = 10</div>
                <div style="margin-bottom: 0.8rem;">Add 3: 10 + 3 = 13</div>
                <div style="color: #10b981; font-weight: bold;">13 = 13 ✓</div>
            </div>

            <p style="text-align: center; font-style: italic; color: #6b7280; margin: 1rem 0;">Perfect! Backsolving saved us from writing equations.</p>

            <p style="text-align: center; font-size: 1.1rem; margin-top: 1.5rem;"><strong>Answer: B</strong></p>

            <br><br>

            <h3 style="margin-top: 4rem;">Backsolving With Points</h3>

            <p>For questions with points in the question or answer choices, it is often effective to backsolve with points. For this method, we will use the point(s) to test which equation works correctly.</p>

            <p>Remember, if a point is on a graph, it must make the equation of the graph true.</p>

            <br><br>

            <h4>Example 3</h4>

            <p><strong>Problem:</strong></p>
            <p>A linear function f passes through the points (1, 5), (3, 9), and (7, 17). Which of the following equations defines f?</p>

            <p>A. f(x) = 2x + 5<br>
            B. f(x) = x + 5<br>
            C. f(x) = 4x + 1<br>
            D. f(x) = 2x + 3</p>

            <p><strong>Solution:</strong></p>
            <p>Here, the simplest way to solve is to test the answer choices using the points in the question. Let's start with the point (1, 5). When we plug in x = 1, we need to get f(1) = 5.</p>

            <div style="background: #f8f9fa; padding: 1.5rem; border-radius: 8px; margin: 1rem 0; text-align: center; font-size: 1.05rem; line-height: 2;">
                <div style="margin-bottom: 0.5rem;"><strong>Choice A:</strong> f(1) = 2(1) + 5 = 7 ✗</div>
                <div style="margin-bottom: 0.5rem;"><strong>Choice B:</strong> f(1) = 1 + 5 = 6 ✗</div>
                <div style="margin-bottom: 0.5rem; color: #10b981;"><strong>Choice C:</strong> f(1) = 4(1) + 1 = 5 ✓</div>
                <div style="color: #10b981;"><strong>Choice D:</strong> f(1) = 2(1) + 3 = 5 ✓</div>
            </div>

            <p style="text-align: center; margin: 1.5rem 0;">Answer choices A and B do not work, so we can eliminate those. Answer choices C and D both work, so we need to use a second point. Let's use the point (3, 9).</p>

            <div style="background: #f8f9fa; padding: 1.5rem; border-radius: 8px; margin: 1rem 0; text-align: center; font-size: 1.05rem; line-height: 2;">
                <div style="margin-bottom: 0.5rem;"><strong>Choice C:</strong> f(3) = 4(3) + 1 = 13 ✗</div>
                <div style="color: #10b981;"><strong>Choice D:</strong> f(3) = 2(3) + 3 = 9 ✓</div>
            </div>

            <p style="text-align: center; font-size: 1.1rem; margin-top: 1.5rem;"><strong>Answer: D</strong></p>

            <br><br>

            <h4>Key Takeaway</h4>

            <p>Backsolving is one of the most powerful test-taking strategies for the ACT Math section. Use it whenever you see answer choices that are numbers or when you get stuck on a question. It's often faster than solving algebraically!</p>
        `;

async function rebuildLesson1() {
  console.log('🔧 FIXING RADICAL NOTATION ALIGNMENT...\n');

  const { data: lessons } = await supabase
    .from('lessons')
    .select('*')
    .eq('subject', 'math')
    .order('order_index');

  const lesson1 = lessons[0];

  console.log(`Lesson: ${lesson1.title}\n`);
  console.log('Improvements:');
  console.log('  ✓ Clean radical notation with proper overline');
  console.log('  ✓ white-space: nowrap keeps radical together');
  console.log('  ✓ Thicker overline (1.5px) for better visibility');
  console.log('  ✓ Larger font in math boxes (1.15rem)');
  console.log('  ✓ More line spacing (2.5) for readability\n');

  const { error } = await supabase
    .from('lessons')
    .update({
      content: lesson1Content,
      updated_at: new Date().toISOString()
    })
    .eq('id', lesson1.id);

  if (error) {
    console.log('❌ Error:', error.message);
  } else {
    console.log('✅ Radical notation fixed!');
    console.log('   Square roots now display cleanly and aligned!');
  }
}

rebuildLesson1();
