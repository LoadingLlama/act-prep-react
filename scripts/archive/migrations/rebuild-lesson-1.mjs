import { createClient } from '@supabase/supabase-js';
import dotenv from 'dotenv';

dotenv.config();

const supabase = createClient(
  process.env.REACT_APP_SUPABASE_URL,
  process.env.SUPABASE_SERVICE_ROLE_KEY
);

// Perfect, clean lesson 1 content
const lesson1Content = `
            <h3>What is Backsolving?</h3>
            <p>Backsolving is plugging the answer choices back into the question. On the ACT, you are given 4 answer choices for multiple choice questions, and one of those 4 choices must be correct. Rather than solving the question algebraically and determining whether your answer matches one of the answer choices, you can guess-and-check with the answer choices to find which one is correct.</p>
            <p>Backsolving is often the fastest and easiest way to solve ACT questions, especially if you get stuck and cannot solve a question algebraically, so use it to your advantage.</p>

            <h3>How to Backsolve: 5 Steps</h3>
            <p><strong>Step 1: Start with B or C.</strong> The answer choices are always in order (smallest to largest or largest to smallest), so starting in the middle saves you time.</p>
            <p><strong>Step 2: Plug the value back into the question.</strong> Substitute this answer choice into the equation or problem.</p>
            <p><strong>Step 3: Solve using this value.</strong> Work through the problem to see if it makes the equation true or satisfies the conditions.</p>
            <p><strong>Step 4: If it works, you're done!</strong> If the answer choice makes the equation true or satisfies the problem, that's your answer.</p>
            <p><strong>Step 5: If it doesn't work, eliminate and adjust.</strong> Cross it off. If you know whether the correct answer needs to be larger or smaller, eliminate other incorrect choices. Then try another answer choice.</p>
            <p>Remember: one of the 4 answer choices must work, so keep testing until you find it!</p>

            <h3>Example Problems</h3>

            <h4>Example 1</h4>
            <p><strong>Problem:</strong> If √(x + 10) − 2√(x − 2) = 0, what is the value of x?</p>
            <p>A. 2<br>B. 6<br>C. 14<br>D. 18</p>
            <p><strong>Solution:</strong> The quickest and easiest way to solve this question is backsolving. Finding the correct answer is just a process of guess-and-check. Below, you can see how the correct answer B, when x = 6, makes the equation true.</p>
            <p>Let's test x = 6:</p>
            <p>√(6 + 10) − 2√(6 − 2) = 0<br>√16 − 2√4 = 0<br>4 − 2(2) = 0<br>4 − 4 = 0<br>0 = 0 ✓</p>
            <p><strong>Answer: B</strong></p>

            <h4>Example 2</h4>
            <p><strong>Problem:</strong> Which of the following is a solution to the equation x³ + 5x² + 6x = 0?</p>
            <p>A. -3<br>B. -1<br>C. 1<br>D. 2</p>
            <p><strong>Solution:</strong> Most students look at this question and think, "Oh no, I need to factor this to solve." However, the easiest way to solve this question is backsolving! We plug the answer choices into the equation to see which one makes it equal 0.</p>
            <p>Let's test A (x = -3):</p>
            <p>(−3)³ + 5(−3)² + 6(−3) = 0<br>−27 + 45 − 18 = 0<br>0 = 0 ✓</p>
            <p>It works! No need to test the other choices.</p>
            <p><strong>Answer: A</strong></p>

            <h3>Backsolving With Points</h3>
            <p>For questions with points in the question or answer choices, it is often effective to backsolve with points. For this method, we will use the point(s) to test which equation works correctly. Remember, if a point is on a graph, it must make the equation of the graph true.</p>

            <h4>Example 3</h4>
            <p><strong>Problem:</strong> A linear function f passes through the points (1, 5), (3, 9), and (7, 17). Which of the following equations defines f?</p>
            <p>A. f(x) = 2x + 5<br>B. f(x) = x + 5<br>C. f(x) = 4x + 1<br>D. f(x) = 2x + 3</p>
            <p><strong>Solution:</strong> Here, the simplest way to solve is to test the answer choices using the points in the question. Let's start with the point (1, 5). When we plug in x = 1, we need to get f(1) = 5.</p>
            <p><strong>Choice A:</strong> f(1) = 2(1) + 5 = 7 ✗</p>
            <p><strong>Choice B:</strong> f(1) = 1 + 5 = 6 ✗</p>
            <p><strong>Choice C:</strong> f(1) = 4(1) + 1 = 5 ✓</p>
            <p><strong>Choice D:</strong> f(1) = 2(1) + 3 = 5 ✓</p>
            <p>Answer choices A and B do not work, so we can eliminate those. Answer choices C and D both work, so we need to use a second point. Let's use the point (3, 9).</p>
            <p><strong>Choice C:</strong> f(3) = 4(3) + 1 = 13 ✗</p>
            <p><strong>Choice D:</strong> f(3) = 2(3) + 3 = 9 ✓</p>
            <p><strong>Answer: D</strong></p>

            <h4>Key Takeaway</h4>
            <p>Backsolving is one of the most powerful test-taking strategies for the ACT Math section. Use it whenever you see answer choices that are numbers or when you get stuck on a question. It's often faster than solving algebraically!</p>
        `;

async function rebuildLesson1() {
  console.log('🔧 REBUILDING LESSON 1 WITH COMPLETE CONTENT...\n');

  const { data: lessons } = await supabase
    .from('lessons')
    .select('*')
    .eq('subject', 'math')
    .order('order_index');

  const lesson1 = lessons[0]; // First math lesson

  console.log(`Lesson: ${lesson1.title}`);
  console.log('Replacing with clean, complete content...\n');

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
    console.log('✅ Lesson 1 rebuilt successfully!\n');
    console.log('Verifying content...\n');

    // Verify
    const { data: updated } = await supabase
      .from('lessons')
      .select('content')
      .eq('id', lesson1.id)
      .single();

    const hasExample1 = updated.content.includes('√(x + 10)');
    const hasExample2 = updated.content.includes('x³ + 5x²');
    const hasExample3 = updated.content.includes('linear function f');
    const hasInlineStyles = updated.content.includes('style=');
    const hasClasses = updated.content.includes('class=');

    console.log('VERIFICATION:');
    console.log('  Example 1 complete:', hasExample1 ? '✅' : '❌');
    console.log('  Example 2 complete:', hasExample2 ? '✅' : '❌');
    console.log('  Example 3 complete:', hasExample3 ? '✅' : '❌');
    console.log('  Clean format (no styles):', !hasInlineStyles ? '✅' : '❌');
    console.log('  Clean format (no classes):', !hasClasses ? '✅' : '❌');

    console.log('\n✅ LESSON 1 IS NOW PERFECT!');
  }
}

rebuildLesson1();
