import { createClient } from '@supabase/supabase-js';
import dotenv from 'dotenv';
dotenv.config();

const supabase = createClient(
  process.env.REACT_APP_SUPABASE_URL,
  process.env.SUPABASE_SERVICE_ROLE_KEY
);

const content = `<h3 style="margin-top: 2rem; margin-bottom: 0.75rem; font-weight: 700;">Chapter 2: Substitution</h3>

<p style="font-size: 16px; line-height: 1.7; margin: 0.5rem 0 1rem 0;">Do you prefer working with numbers or variables? We would guess your answer is numbers! On the ACT, some questions have many unknown variables and few or no numbers at all. Students often find these questions more difficult. If you prefer to work with numbers, let's work with numbers! With substitution, we substitute simple numbers in for variables and solve the question using numbers instead of relying on more complex algebra with variables.</p>

<p style="font-size: 16px; line-height: 1.7; margin: 0.5rem 0 1rem 0;">Substitution can be done with these four steps:</p>

<p style="font-size: 16px; line-height: 1.7; margin: 0.5rem 0 0.5rem 0;"><strong>1. Pick a number for the variable(s) in the question.</strong></p>

<ul style="margin: 0.3rem 0 0.5rem 0; padding-left: 1.5rem; line-height: 1.5;">
  <li style="margin: 0.15rem 0;">Pick easy numbers...avoid using 0 and 1. Use 2, 3, 4 or other easy numbers. Use 10 for percent problems, 10 or 20 for group size, etc.</li>
  <li style="margin: 0.15rem 0;">Select different numbers for each variable. For example, if a question has an x and a y, pick x = 2 and y = 3.</li>
  <li style="margin: 0.15rem 0;">Follow any rules in the question. For example, if a question says x is a number that is negative and even, pick x = -2.</li>
</ul>

<p style="font-size: 16px; line-height: 1.7; margin: 0.5rem 0 0.5rem 0;"><strong>2. Write down the number(s) that you have picked.</strong></p>

<p style="font-size: 16px; line-height: 1.7; margin: 0.5rem 0 0.5rem 0;"><strong>3. Use your number(s) to work your way through the question and find your answer.</strong></p>

<p style="font-size: 16px; line-height: 1.7; margin: 0.5rem 0 0.5rem 0;"><strong>4. Plug your number(s) into the answer choices. The correct answer will be the one that matches your answer.</strong></p>

<p style="font-size: 16px; line-height: 1.7; margin: 0.5rem 0 1rem 0;">Substitution may seem a bit confusing just reading the steps, so let's take a look at some example questions to see how useful this technique can be.</p>

<h4 style="margin-top: 1.5rem; margin-bottom: 0.5rem; font-weight: 600;">Example 1:</h4>

<p style="font-size: 16px; line-height: 1.7; margin: 0.5rem 0 1rem 0;">Jeremy has <em>n</em> boxes of candy bars. Each box contains <em>m</em> bars of candy. Jeremy has to sell 70% of his candy bars to make enough money for rent. Which of the following expresses the number of candy bars Jeremy must sell in terms of <em>m</em> and <em>n</em>?</p>

<p style="font-size: 16px; line-height: 1.7; margin: 0.5rem 0 0.5rem 1.5rem;">A. 0.7(<em>m</em> + <em>n</em>)</p>
<p style="font-size: 16px; line-height: 1.7; margin: 0.5rem 0 0.5rem 1.5rem;">B. 70<em>nm</em></p>
<p style="font-size: 16px; line-height: 1.7; margin: 0.5rem 0 0.5rem 1.5rem;">C. <em>nm</em> + <em>m</em></p>
<p style="font-size: 16px; line-height: 1.7; margin: 0.5rem 0 0.5rem 1.5rem;">D. 0.7<em>nm</em></p>

<p style="font-size: 16px; line-height: 1.7; margin: 0.5rem 0 1rem 0;"><strong>Solution:</strong> This question may at first seem intimidating with all the variables. To make this question easier, let's plug in numbers. We can say that Jeremy has 2 boxes of candy, so <em>n</em> = 2, and that each box contains 5 bars of candy, so <em>m</em> = 5. With our numbers, Jeremy has a total of 10 candy bars. He needs to sell 70% to make enough money for rent, so we can find the total candy bars that he must sell by finding 70% of 10.</p>

<p style="font-size: 16px; line-height: 1.7; margin: 0.5rem 0 1rem 0;">0.7(10) = 7</p>

<p style="font-size: 16px; line-height: 1.7; margin: 0.5rem 0 1rem 0;">With our numbers, Jeremy must sell 7 candy bars, so our answer is 7. Now, we can plug in the values we selected for <em>n</em> and <em>m</em> into the answer choices and see which one is equal to 7. Here, we find that D works.</p>

<p style="font-size: 16px; line-height: 1.7; margin: 0.5rem 0 1rem 0;">0.7<em>nm</em> = 0.7(2)(5) = 7</p>

<p style="font-size: 16px; line-height: 1.7; margin: 0.5rem 0 1rem 0;">None of the other answer choices are equal to 7 when we plug in our values for <em>n</em> and <em>m</em>. No matter what numbers you pick for <em>n</em> and <em>m</em>, you will find that D is the answer.</p>

<h4 style="margin-top: 1.5rem; margin-bottom: 0.5rem; font-weight: 600;">Example 2:</h4>

<p style="font-size: 16px; line-height: 1.7; margin: 0.5rem 0 1rem 0;">If cos(2<em>x</em>°) = <em>a</em>, which of the following must be true for all values of <em>x</em>, in degrees?</p>

<p style="font-size: 16px; line-height: 1.7; margin: 0.5rem 0 0.5rem 1.5rem;">A. sin(2<em>x</em>°) = <em>a</em></p>
<p style="font-size: 16px; line-height: 1.7; margin: 0.5rem 0 0.5rem 1.5rem;">B. sin(<em>x</em>° + 90°) = <em>a</em></p>
<p style="font-size: 16px; line-height: 1.7; margin: 0.5rem 0 0.5rem 1.5rem;">C. cos(90° - 2<em>x</em>°) = <em>a</em></p>
<p style="font-size: 16px; line-height: 1.7; margin: 0.5rem 0 0.5rem 1.5rem;">D. sin(90° - 2<em>x</em>°) = <em>a</em></p>

<p style="font-size: 16px; line-height: 1.7; margin: 0.5rem 0 1rem 0;"><strong>Solution:</strong> The easiest way to solve this question is to pick a value for <em>x</em> and use your calculator. Let's pick <em>x</em> = 10°. First, we need to find out what <em>a</em> equals if <em>x</em> = 10°.</p>

<p style="font-size: 16px; line-height: 1.7; margin: 0.5rem 0 1rem 0;">cos(20°) = 0.9397</p>

<p style="font-size: 16px; line-height: 1.7; margin: 0.5rem 0 1rem 0;">Now that we know what <em>a</em> equals, we can plug in <em>x</em> = 10° for the x-values in the answer choices to see which is equal to 0.9397. Here, we can see how the correct answer choice of D works.</p>

<p style="font-size: 16px; line-height: 1.7; margin: 0.5rem 0 1rem 0;">sin(90° - 20°) = sin(70°) = 0.9397</p>

<p style="font-size: 16px; line-height: 1.7; margin: 0.5rem 0 1rem 0;">This trick will work for any value of <em>x</em> that we pick. The answer is D. Note that since we are solving in degrees, your calculator must be in degree mode. If you get a value other than cos(20) = 0.9397 when you input cos(20) in your calculator, your calculator is in radian mode.</p>

<h4 style="margin-top: 1.5rem; margin-bottom: 0.5rem; font-weight: 600;">Example 3:</h4>

<p style="font-size: 16px; line-height: 1.7; margin: 0.5rem 0 1rem 0;">If the length of a rectangle is tripled and the width is halved, how many times larger is the area of the new rectangle than the area of the original rectangle?</p>

<p style="font-size: 16px; line-height: 1.7; margin: 0.5rem 0 0.5rem 1.5rem;">A. 1.5</p>
<p style="font-size: 16px; line-height: 1.7; margin: 0.5rem 0 0.5rem 1.5rem;">B. 2</p>
<p style="font-size: 16px; line-height: 1.7; margin: 0.5rem 0 0.5rem 1.5rem;">C. 3</p>
<p style="font-size: 16px; line-height: 1.7; margin: 0.5rem 0 0.5rem 1.5rem;">D. 4</p>

<p style="font-size: 16px; line-height: 1.7; margin: 0.5rem 0 1rem 0;"><strong>Solution:</strong> To make this question easier, we can pick values for the length and width of the rectangle. Let's make the length 3 and the width 2. Now, we just follow the steps in the questions.</p>

<table style="margin: 1rem 0; width: 100%; border-collapse: collapse;">
  <tr>
    <td style="padding: 0.5rem; border: 1px solid #ddd;"><strong>Original</strong></td>
    <td style="padding: 0.5rem; border: 1px solid #ddd;"></td>
  </tr>
  <tr>
    <td style="padding: 0.5rem; border: 1px solid #ddd;">The length is tripled: 3(3) = 9</td>
    <td style="padding: 0.5rem; border: 1px solid #ddd;">The new length is 9.</td>
  </tr>
  <tr>
    <td style="padding: 0.5rem; border: 1px solid #ddd;"><strong>New</strong></td>
    <td style="padding: 0.5rem; border: 1px solid #ddd;"></td>
  </tr>
  <tr>
    <td style="padding: 0.5rem; border: 1px solid #ddd;">The width is halved: 2(1/2) = 1</td>
    <td style="padding: 0.5rem; border: 1px solid #ddd;">The new width is 1.</td>
  </tr>
</table>

<p style="font-size: 16px; line-height: 1.7; margin: 0.5rem 0 1rem 0;">Next, we find the areas of the rectangles and compare. The new rectangle has an area of 9. The original rectangle has an area of 6, so we find that the new rectangle is 1.5 times as large. The answer is A.</p>`;

async function fixLesson() {
  console.log('Fixing substitution lesson with actual PrepPros content...\n');

  const { error } = await supabase
    .from('lessons')
    .update({
      content: content,
      updated_at: new Date().toISOString()
    })
    .eq('lesson_key', 'substitution');

  if (error) {
    console.log('Error: ' + error.message);
  } else {
    console.log('✅ Successfully updated with actual PrepPros content!');
    console.log('Content length: ' + content.length + ' characters');
  }
}

fixLesson().catch(console.error);
