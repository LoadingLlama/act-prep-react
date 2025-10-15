import { createClient } from '@supabase/supabase-js';
import dotenv from 'dotenv';

dotenv.config();

const supabase = createClient(
  process.env.REACT_APP_SUPABASE_URL,
  process.env.SUPABASE_SERVICE_ROLE_KEY
);

const LESSON_ID = '84020949-093d-4d24-8aa1-7dc985581e48';

const updatedContent = `
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
            <p>Jeremy has n boxes of candy bars. Each box contains m bars of candy. Jeremy has to sell 70% of his candy bars to make enough money for rent. Which of the following expresses the number of candy bars Jeremy must sell in terms of m and n?</p>

            <p>A. 7(m + n)<br>
            B. 70nm<br>
            C. nm + m<br>
            D. 0.7nm<br>
            E. 0.07nm</p>

            <p><strong>Solution:</strong></p>
            <p>This question may seem intimidating with all the variables. To make it easier, let's plug in numbers!</p>

            <p style="text-align: center; font-weight: 600; color: #374151; margin: 1.5rem 0; font-size: 1.05rem;">Let's pick: n = 2 boxes and m = 5 bars per box</p>

            <div style="background: #f8f9fa; padding: 1.5rem; border-radius: 8px; margin: 1rem 0; text-align: center; font-size: 1.15rem; line-height: 2.5;">
                <div style="margin-bottom: 0.8rem;">Total candy bars: 2 × 5 = 10 bars</div>
                <div style="margin-bottom: 0.8rem;">Must sell 70%: 0.7 × 10 = 7 bars</div>
                <div style="color: #10b981; font-weight: bold;">Our answer with these numbers: 7 ✓</div>
            </div>

            <p style="text-align: center; margin: 1.5rem 0;">Now plug n = 2 and m = 5 into each answer choice to see which equals 7:</p>

            <div style="background: #f8f9fa; padding: 1.5rem; border-radius: 8px; margin: 1rem 0; text-align: center; font-size: 1.05rem; line-height: 2;">
                <div style="margin-bottom: 0.5rem;"><strong>Choice A:</strong> 7(5 + 2) = 7(7) = 49 ✗</div>
                <div style="margin-bottom: 0.5rem;"><strong>Choice B:</strong> 70(2)(5) = 700 ✗</div>
                <div style="margin-bottom: 0.5rem;"><strong>Choice C:</strong> (2)(5) + 5 = 15 ✗</div>
                <div style="margin-bottom: 0.5rem; color: #10b981;"><strong>Choice D:</strong> 0.7(2)(5) = 7 ✓</div>
                <div><strong>Choice E:</strong> 0.07(2)(5) = 0.7 ✗</div>
            </div>

            <p style="text-align: center; font-style: italic; color: #6b7280; margin: 1rem 0;">Only D works! This will be true no matter what numbers you pick for n and m.</p>

            <p style="text-align: center; font-size: 1.1rem; margin-top: 1.5rem;"><strong>Answer: D</strong></p>

            <br><br>

            <h4>Example 2</h4>

            <p><strong>Problem:</strong></p>
            <p>If cos(2x°) = a, which of the following equations is also true for all values of x?</p>

            <p>A. sin(2x°) = a<br>
            B. sin(x° + 90°) = a<br>
            C. cos(90° − 2x°) = a<br>
            D. sin(90° − 2x°) = a<br>
            E. cos(x°) = a</p>

            <p><strong>Solution:</strong></p>
            <p>The easiest way to solve this question is to pick a value for x and use your calculator. Let's pick x = 10°.</p>

            <p style="text-align: center; font-weight: 600; color: #374151; margin: 1.5rem 0; font-size: 1.05rem;">First, find what a equals when x = 10°:</p>

            <div style="background: #f8f9fa; padding: 1.5rem; border-radius: 8px; margin: 1rem 0; text-align: center; font-size: 1.15rem; line-height: 2.5;">
                <div style="margin-bottom: 0.8rem;">cos(2x°) = a</div>
                <div style="margin-bottom: 0.8rem;">cos(20°) = a</div>
                <div style="color: #10b981; font-weight: bold;">a = 0.9397 ✓</div>
            </div>

            <p style="text-align: center; margin: 1.5rem 0;">Now test which answer choice also equals 0.9397 when x = 10°:</p>

            <div style="background: #f8f9fa; padding: 1.5rem; border-radius: 8px; margin: 1rem 0; text-align: center; font-size: 1.05rem; line-height: 2;">
                <div style="margin-bottom: 0.5rem;"><strong>Choice A:</strong> sin(20°) = 0.3420 ✗</div>
                <div style="margin-bottom: 0.5rem;"><strong>Choice B:</strong> sin(100°) = 0.9848 ✗</div>
                <div style="margin-bottom: 0.5rem;"><strong>Choice C:</strong> cos(70°) = 0.3420 ✗</div>
                <div style="margin-bottom: 0.5rem; color: #10b981;"><strong>Choice D:</strong> sin(90° − 20°) = sin(70°) = 0.9397 ✓</div>
                <div><strong>Choice E:</strong> cos(10°) = 0.9848 ✗</div>
            </div>

            <p style="text-align: center; font-style: italic; color: #6b7280; margin: 1rem 0;">Make sure your calculator is in degree mode!</p>

            <p style="text-align: center; font-size: 1.1rem; margin-top: 1.5rem;"><strong>Answer: D</strong></p>

            <br><br>

            <h4>Example 3</h4>

            <p><strong>Problem:</strong></p>
            <p>The length of a rectangle is tripled and the width of the rectangle is halved to create a new rectangle. How many times as large is the area of the new rectangle than the area of the original rectangle?</p>

            <p>A. 1.5<br>
            B. 2<br>
            C. 2.5<br>
            D. 3<br>
            E. 6</p>

            <p><strong>Solution:</strong></p>
            <p>To make this easier, let's pick values for the length and width. Let's make the length 4 and the width 2.</p>

            <p style="text-align: center; font-weight: 600; color: #374151; margin: 1.5rem 0; font-size: 1.05rem;">Original rectangle:</p>

            <div style="background: #f8f9fa; padding: 1.5rem; border-radius: 8px; margin: 1rem 0; text-align: center; font-size: 1.15rem; line-height: 2.5;">
                <div style="margin-bottom: 0.8rem;">Length = 4, Width = 2</div>
                <div style="color: #3b82f6; font-weight: bold;">Area = 4 × 2 = 8</div>
            </div>

            <p style="text-align: center; font-weight: 600; color: #374151; margin: 1.5rem 0; font-size: 1.05rem;">New rectangle:</p>

            <div style="background: #f8f9fa; padding: 1.5rem; border-radius: 8px; margin: 1rem 0; text-align: center; font-size: 1.15rem; line-height: 2.5;">
                <div style="margin-bottom: 0.8rem;">Length tripled: 4 × 3 = 12</div>
                <div style="margin-bottom: 0.8rem;">Width halved: 2 × ½ = 1</div>
                <div style="color: #3b82f6; font-weight: bold;">Area = 12 × 1 = 12</div>
            </div>

            <p style="text-align: center; margin: 1.5rem 0;">Now compare the areas:</p>

            <div style="background: #f8f9fa; padding: 1.5rem; border-radius: 8px; margin: 1rem 0; text-align: center; font-size: 1.15rem; line-height: 2.5;">
                <div style="margin-bottom: 0.8rem;">New area ÷ Original area</div>
                <div style="margin-bottom: 0.8rem;">12 ÷ 8 = 1.5</div>
                <div style="color: #10b981; font-weight: bold;">The new rectangle is 1.5 times as large ✓</div>
            </div>

            <p style="text-align: center; font-size: 1.1rem; margin-top: 1.5rem;"><strong>Answer: A</strong></p>

            <br><br>

            <h4>Key Takeaway</h4>

            <p>Substitution is a powerful technique when you encounter questions with many variables and few numbers. By picking simple numbers and testing the answer choices, you can turn abstract algebraic problems into concrete arithmetic that's much easier to solve!</p>
        `;

async function fixLesson12Syntax() {
  console.log('📝 Fixing Lesson 1.2 answer choice syntax...\n');

  const { error } = await supabase
    .from('lessons')
    .update({
      content: updatedContent,
      updated_at: new Date().toISOString()
    })
    .eq('id', LESSON_ID);

  if (error) {
    console.log('❌ Error:', error.message);
  } else {
    console.log('✅ Lesson 1.2 syntax fixed!');
    console.log('   - Removed <em> tags from answer choices');
    console.log('   - All 5 choices (A-E) now display correctly');
    console.log('   - Example 1: A. 7(m + n), B. 70nm, C. nm + m, D. 0.7nm, E. 0.07nm');
    console.log('   - Example 2: All 5 trig choices display correctly');
    console.log('   - Example 3: All 5 numeric choices display correctly');
  }
}

fixLesson12Syntax();
