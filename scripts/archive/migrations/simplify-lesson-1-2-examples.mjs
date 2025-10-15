import { createClient } from '@supabase/supabase-js';
import dotenv from 'dotenv';

dotenv.config();

const supabase = createClient(
  process.env.REACT_APP_SUPABASE_URL,
  process.env.SUPABASE_SERVICE_ROLE_KEY
);

const LESSON_ID = '84020949-093d-4d24-8aa1-7dc985581e48';

const simplifiedContent = `
            <h3>What is Substitution?</h3>

            <p>Do you prefer working with numbers or variables? We would guess your answer is numbers! On the ACT, some questions have many unknown variables and few or no numbers at all. Students often find these questions more difficult.</p>

            <p>If you prefer to work with numbers, let's work with numbers! With substitution, we substitute simple numbers in for variables and solve the question using numbers instead of relying on more complex algebra with variables.</p>

            <br><br>

            <h3>How to Use Substitution: 4 Steps</h3>

            <ol>
                <li><strong>Pick a number for the variable(s) in the question.</strong> Use easy numbers like 2, 3, 4, or 5. Avoid using 0 and 1 as they can give misleading results. For percent problems, use 10 or 100.</li>
                <li><strong>Select different numbers for each variable.</strong> For example, if a question has an x and a y, pick x = 2 and y = 3.</li>
                <li><strong>Follow any rules in the question.</strong> For example, if a question says x is a negative even number, pick x = −2.</li>
                <li><strong>Plug your numbers into the answer choices.</strong> The correct answer will be the one that matches your result.</li>
            </ol>

            <p>Substitution may seem confusing just reading the steps, so let's look at some examples!</p>

            <br><br>

            <h3>Example Problems</h3>

            <br>

            <h4>Example 1</h4>

            <p><strong>Problem:</strong></p>
            <p>Maria buys x apples at $2 each. Which expression represents the total cost in dollars?</p>

            <p>A. x<br>
            B. 2x<br>
            C. x + 2<br>
            D. 2 + x<br>
            E. x/2</p>

            <p><strong>Solution:</strong></p>
            <p>This question has a variable x, but we can make it easier by picking a number!</p>

            <p style="text-align: center; font-weight: 600; color: #374151; margin: 1.5rem 0; font-size: 1.05rem;">Let's pick: x = 3 apples</p>

            <div style="background: #f8f9fa; padding: 1.5rem; border-radius: 8px; margin: 1rem 0; text-align: center; font-size: 1.15rem; line-height: 2.5;">
                <div style="margin-bottom: 0.8rem;">Number of apples: 3</div>
                <div style="margin-bottom: 0.8rem;">Cost per apple: $2</div>
                <div style="margin-bottom: 0.8rem;">Total cost: 3 × $2 = $6</div>
                <div style="color: #10b981; font-weight: bold;">Our answer with x = 3 is $6 ✓</div>
            </div>

            <p style="text-align: center; margin: 1.5rem 0;">Now plug x = 3 into each answer choice to see which equals 6:</p>

            <div style="background: #f8f9fa; padding: 1.5rem; border-radius: 8px; margin: 1rem 0; text-align: center; font-size: 1.05rem; line-height: 2;">
                <div style="margin-bottom: 0.5rem;"><strong>Choice A:</strong> x = 3 ✗</div>
                <div style="margin-bottom: 0.5rem; color: #10b981;"><strong>Choice B:</strong> 2x = 2(3) = 6 ✓</div>
                <div style="margin-bottom: 0.5rem;"><strong>Choice C:</strong> x + 2 = 3 + 2 = 5 ✗</div>
                <div style="margin-bottom: 0.5rem;"><strong>Choice D:</strong> 2 + x = 2 + 3 = 5 ✗</div>
                <div><strong>Choice E:</strong> x/2 = 3/2 = 1.5 ✗</div>
            </div>

            <p style="text-align: center; font-style: italic; color: #6b7280; margin: 1rem 0;">Only B works! No matter what number you pick for x, the answer will always be B.</p>

            <p style="text-align: center; font-size: 1.1rem; margin-top: 1.5rem;"><strong>Answer: B</strong></p>

            <br><br>

            <h4>Example 2</h4>

            <p><strong>Problem:</strong></p>
            <p>If n is an even number, which of the following must be odd?</p>

            <p>A. n + 2<br>
            B. n - 1<br>
            C. 2n<br>
            D. n/2<br>
            E. n + 4</p>

            <p><strong>Solution:</strong></p>
            <p>Instead of trying to figure this out with algebra, let's just pick an even number and test it! Let's pick n = 4.</p>

            <p style="text-align: center; font-weight: 600; color: #374151; margin: 1.5rem 0; font-size: 1.05rem;">Test each choice with n = 4:</p>

            <div style="background: #f8f9fa; padding: 1.5rem; border-radius: 8px; margin: 1rem 0; text-align: center; font-size: 1.05rem; line-height: 2;">
                <div style="margin-bottom: 0.5rem;"><strong>Choice A:</strong> n + 2 = 4 + 2 = 6 (even) ✗</div>
                <div style="margin-bottom: 0.5rem; color: #10b981;"><strong>Choice B:</strong> n - 1 = 4 - 1 = 3 (odd) ✓</div>
                <div style="margin-bottom: 0.5rem;"><strong>Choice C:</strong> 2n = 2(4) = 8 (even) ✗</div>
                <div style="margin-bottom: 0.5rem;"><strong>Choice D:</strong> n/2 = 4/2 = 2 (even) ✗</div>
                <div><strong>Choice E:</strong> n + 4 = 4 + 4 = 8 (even) ✗</div>
            </div>

            <p style="text-align: center; font-style: italic; color: #6b7280; margin: 1rem 0;">Try another even number like 6 or 8—you'll see that B is always odd!</p>

            <p style="text-align: center; font-size: 1.1rem; margin-top: 1.5rem;"><strong>Answer: B</strong></p>

            <br><br>

            <h4>Example 3</h4>

            <p><strong>Problem:</strong></p>
            <p>A store sells pencils for p cents each and notebooks for n cents each. If you buy 3 pencils and 2 notebooks, what is the total cost in cents?</p>

            <p>A. 5(p + n)<br>
            B. 3p + 2n<br>
            C. 5pn<br>
            D. p + n + 5<br>
            E. 6p + 4n</p>

            <p><strong>Solution:</strong></p>
            <p>Let's pick easy numbers! Say pencils cost 10 cents and notebooks cost 20 cents.</p>

            <p style="text-align: center; font-weight: 600; color: #374151; margin: 1.5rem 0; font-size: 1.05rem;">Let's pick: p = 10 cents and n = 20 cents</p>

            <div style="background: #f8f9fa; padding: 1.5rem; border-radius: 8px; margin: 1rem 0; text-align: center; font-size: 1.15rem; line-height: 2.5;">
                <div style="margin-bottom: 0.8rem;">3 pencils at 10¢ each: 3 × 10 = 30¢</div>
                <div style="margin-bottom: 0.8rem;">2 notebooks at 20¢ each: 2 × 20 = 40¢</div>
                <div style="margin-bottom: 0.8rem;">Total cost: 30 + 40 = 70¢</div>
                <div style="color: #10b981; font-weight: bold;">Our answer is 70 cents ✓</div>
            </div>

            <p style="text-align: center; margin: 1.5rem 0;">Now plug p = 10 and n = 20 into each answer choice to see which equals 70:</p>

            <div style="background: #f8f9fa; padding: 1.5rem; border-radius: 8px; margin: 1rem 0; text-align: center; font-size: 1.05rem; line-height: 2;">
                <div style="margin-bottom: 0.5rem;"><strong>Choice A:</strong> 5(10 + 20) = 5(30) = 150 ✗</div>
                <div style="margin-bottom: 0.5rem; color: #10b981;"><strong>Choice B:</strong> 3(10) + 2(20) = 30 + 40 = 70 ✓</div>
                <div style="margin-bottom: 0.5rem;"><strong>Choice C:</strong> 5(10)(20) = 1000 ✗</div>
                <div style="margin-bottom: 0.5rem;"><strong>Choice D:</strong> 10 + 20 + 5 = 35 ✗</div>
                <div><strong>Choice E:</strong> 6(10) + 4(20) = 60 + 80 = 140 ✗</div>
            </div>

            <p style="text-align: center; font-size: 1.1rem; margin-top: 1.5rem;"><strong>Answer: B</strong></p>

            <br><br>

            <h4>Key Takeaway</h4>

            <p>Substitution is a powerful technique when you encounter questions with many variables and few numbers. By picking simple numbers and testing the answer choices, you can turn abstract algebraic problems into concrete arithmetic that's much easier to solve!</p>
        `;

async function simplifyLesson12() {
  console.log('📝 Simplifying examples in Lesson 1.2...\n');

  const { error } = await supabase
    .from('lessons')
    .update({
      content: simplifiedContent,
      updated_at: new Date().toISOString()
    })
    .eq('id', LESSON_ID);

  if (error) {
    console.log('❌ Error:', error.message);
  } else {
    console.log('✅ Lesson 1.2 simplified!');
    console.log('   - Example 1: Maria buying apples (x apples at $2 each) → Answer: B (2x)');
    console.log('   - Example 2: Even/odd numbers (if n is even, which is odd?) → Answer: B (n-1)');
    console.log('   - Example 3: Buying pencils and notebooks (3p + 2n) → Answer: B (3p + 2n)');
    console.log('   - All examples are now beginner-friendly with simple arithmetic');
    console.log('   - Removed complex trigonometry example');
  }
}

simplifyLesson12();
