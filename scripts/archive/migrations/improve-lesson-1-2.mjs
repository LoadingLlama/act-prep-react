import { createClient } from '@supabase/supabase-js';
import dotenv from 'dotenv';

dotenv.config();

const supabase = createClient(
  process.env.REACT_APP_SUPABASE_URL,
  process.env.SUPABASE_SERVICE_ROLE_KEY
);

const LESSON_ID = '84020949-093d-4d24-8aa1-7dc985581e48';

const improvedContent = `
            <h3>What is Substitution?</h3>

            <p>Do you prefer working with numbers or variables? We would guess your answer is numbers! On the ACT, some questions have many unknown variables and few or no numbers at all. Students often find these questions more difficult.</p>

            <p>If you prefer to work with numbers, let's work with numbers! With substitution, we substitute simple numbers in for variables and solve the question using numbers instead of relying on more complex algebra with variables.</p>

            <br><br>

            <h3>How to Use Substitution: 4 Steps</h3>

            <ol>
                <li><strong>Pick a number for the variable(s) in the question.</strong> Use easy numbers like 2, 3, 4, or 5. Avoid using 0 and 1 as they can give misleading results. For percent problems, use 10 or 100.</li>
                <li><strong>Select different numbers for each variable.</strong> For example, if a question has an <em>x</em> and a <em>y</em>, pick <em>x</em> = 2 and <em>y</em> = 3.</li>
                <li><strong>Follow any rules in the question.</strong> For example, if a question says <em>x</em> is a negative even number, pick <em>x</em> = −2.</li>
                <li><strong>Plug your numbers into the answer choices.</strong> The correct answer will be the one that matches your result.</li>
            </ol>

            <p>Substitution may seem confusing just reading the steps, so let's look at some examples!</p>

            <br><br>

            <h3>Example Problems</h3>

            <br>

            <h4>Example 1</h4>

            <p><strong>Problem:</strong></p>
            <p>Jeremy has <em>n</em> boxes of candy bars. Each box contains <em>m</em> bars of candy. Jeremy has to sell 70% of his candy bars to make enough money for rent. Which of the following expresses the number of candy bars Jeremy must sell in terms of <em>m</em> and <em>n</em>?</p>

            <p>A. 7(<em>m</em> + <em>n</em>)<br>
            B. 70<em>nm</em><br>
            C. <em>nm</em> + <em>m</em><br>
            D. 0.7<em>nm</em></p>

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
                <div style="color: #10b981;"><strong>Choice D:</strong> 0.7(2)(5) = 7 ✓</div>
            </div>

            <p style="text-align: center; font-style: italic; color: #6b7280; margin: 1rem 0;">Only D works! This will be true no matter what numbers you pick for n and m.</p>

            <p style="text-align: center; font-size: 1.1rem; margin-top: 1.5rem;"><strong>Answer: D</strong></p>

            <br><br>

            <h4>Example 2</h4>

            <p><strong>Problem:</strong></p>
            <p>If cos(2<em>x</em>°) = <em>a</em>, which of the following equations is also true for all values of <em>x</em>?</p>

            <p>A. sin(2<em>x</em>°) = <em>a</em><br>
            B. sin(<em>x</em>° + 90°) = <em>a</em><br>
            C. cos(90° − 2<em>x</em>°) = <em>a</em><br>
            D. sin(90° − 2<em>x</em>°) = <em>a</em></p>

            <p><strong>Solution:</strong></p>
            <p>The easiest way to solve this question is to pick a value for <em>x</em> and use your calculator. Let's pick <em>x</em> = 10°.</p>

            <p style="text-align: center; font-weight: 600; color: #374151; margin: 1.5rem 0; font-size: 1.05rem;">First, find what a equals when x = 10°:</p>

            <div style="background: #f8f9fa; padding: 1.5rem; border-radius: 8px; margin: 1rem 0; text-align: center; font-size: 1.15rem; line-height: 2.5;">
                <div style="margin-bottom: 0.8rem;">cos(2<em>x</em>°) = <em>a</em></div>
                <div style="margin-bottom: 0.8rem;">cos(20°) = <em>a</em></div>
                <div style="color: #10b981; font-weight: bold;"><em>a</em> = 0.9397 ✓</div>
            </div>

            <p style="text-align: center; margin: 1.5rem 0;">Now test which answer choice also equals 0.9397 when x = 10°:</p>

            <div style="background: #f8f9fa; padding: 1.5rem; border-radius: 8px; margin: 1rem 0; text-align: center; font-size: 1.05rem; line-height: 2;">
                <div style="margin-bottom: 0.5rem;"><strong>Choice A:</strong> sin(20°) = 0.3420 ✗</div>
                <div style="margin-bottom: 0.5rem;"><strong>Choice B:</strong> sin(100°) = 0.9848 ✗</div>
                <div style="margin-bottom: 0.5rem;"><strong>Choice C:</strong> cos(70°) = 0.3420 ✗</div>
                <div style="color: #10b981;"><strong>Choice D:</strong> sin(90° − 20°) = sin(70°) = 0.9397 ✓</div>
            </div>

            <p style="text-align: center; font-style: italic; color: #6b7280; margin: 1rem 0;">Make sure your calculator is in degree mode!</p>

            <p style="text-align: center; font-size: 1.1rem; margin-top: 1.5rem;"><strong>Answer: D</strong></p>

            <br><br>

            <h4>Example 3</h4>

            <p><strong>Problem:</strong></p>
            <p>The length of a rectangle is tripled and the width of the rectangle is halved to create a new rectangle. How many times as large is the area of the new rectangle than the area of the original rectangle?</p>

            <p>A. 1.5<br>
            B. 2<br>
            C. 3<br>
            D. 4</p>

            <p><strong>Solution:</strong></p>
            <p>To make this easier, let's pick values for the length and width. Let's make the length 3 and the width 2.</p>

            <p style="text-align: center; font-weight: 600; color: #374151; margin: 1.5rem 0; font-size: 1.05rem;">Original rectangle:</p>

            <div style="background: #f8f9fa; padding: 1.5rem; border-radius: 8px; margin: 1rem 0; text-align: center; font-size: 1.15rem; line-height: 2.5;">
                <div style="margin-bottom: 0.8rem;">Length = 3, Width = 2</div>
                <div style="color: #3b82f6; font-weight: bold;">Area = 3 × 2 = 6</div>
            </div>

            <p style="text-align: center; font-weight: 600; color: #374151; margin: 1.5rem 0; font-size: 1.05rem;">New rectangle:</p>

            <div style="background: #f8f9fa; padding: 1.5rem; border-radius: 8px; margin: 1rem 0; text-align: center; font-size: 1.15rem; line-height: 2.5;">
                <div style="margin-bottom: 0.8rem;">Length tripled: 3 × 3 = 9</div>
                <div style="margin-bottom: 0.8rem;">Width halved: 2 × ½ = 1</div>
                <div style="color: #3b82f6; font-weight: bold;">Area = 9 × 1 = 9</div>
            </div>

            <p style="text-align: center; margin: 1.5rem 0;">Now compare the areas:</p>

            <div style="background: #f8f9fa; padding: 1.5rem; border-radius: 8px; margin: 1rem 0; text-align: center; font-size: 1.15rem; line-height: 2.5;">
                <div style="margin-bottom: 0.8rem;">New area ÷ Original area</div>
                <div style="margin-bottom: 0.8rem;">9 ÷ 6 = 1.5</div>
                <div style="color: #10b981; font-weight: bold;">The new rectangle is 1.5 times as large ✓</div>
            </div>

            <p style="text-align: center; font-size: 1.1rem; margin-top: 1.5rem;"><strong>Answer: A</strong></p>

            <br><br>

            <h4>Key Takeaway</h4>

            <p>Substitution is a powerful technique when you encounter questions with many variables and few numbers. By picking simple numbers and testing the answer choices, you can turn abstract algebraic problems into concrete arithmetic that's much easier to solve!</p>
        `;

const checkpointQuestions = [
  {
    text: 'If x is a positive even integer, which of the following must be odd?',
    options: [
      { text: 'x + 2', isCorrect: false, explanation: 'Not quite. If x is even (like 4), then x + 2 = 6, which is also even.' },
      { text: 'x - 1', isCorrect: true, explanation: 'Correct! Try x = 4: then x - 1 = 3, which is odd. Any even number minus 1 is always odd!' },
      { text: '2x', isCorrect: false, explanation: 'Not quite. If x is even (like 4), then 2x = 8, which is also even.' },
      { text: 'x/2', isCorrect: false, explanation: 'Not quite. If x = 4, then x/2 = 2, which is even.' }
    ]
  },
  {
    text: 'If a jar contains m marbles and each marble costs n cents, which expression represents the total cost of all marbles in dollars?',
    options: [
      { text: 'mn', isCorrect: false, explanation: 'Not quite. This gives the cost in cents, not dollars. Try m = 10 marbles, n = 50 cents each: total is 500 cents = $5, but mn = 500.' },
      { text: 'mn/100', isCorrect: true, explanation: 'Correct! Try m = 10, n = 50: total cost is 500 cents = 500/100 = $5 ✓' },
      { text: '100mn', isCorrect: false, explanation: 'Not quite. Try m = 10, n = 50: this gives 50,000, which is way too large!' },
      { text: 'm + n', isCorrect: false, explanation: 'Not quite. This doesn\'t account for multiplying marbles by cost per marble.' }
    ]
  },
  {
    text: 'A number is increased by 25% and then decreased by 20%. The result is what percent of the original number?',
    options: [
      { text: '95%', isCorrect: false, explanation: 'Not quite. Try starting with 100: after +25% you get 125, then -20% of 125 = -25, giving 100.' },
      { text: '100%', isCorrect: true, explanation: 'Correct! Try starting with 100: increase 25% → 125, then decrease 20% → 125 - 25 = 100 ✓' },
      { text: '105%', isCorrect: false, explanation: 'Not quite. Try starting with 100 and work through the steps.' },
      { text: '110%', isCorrect: false, explanation: 'Not quite. Remember to decrease 20% of the NEW amount (125), not the original.' }
    ]
  },
  {
    text: 'If y = 2x + 3, what is the value of 4x - 2y?',
    options: [
      { text: '-6', isCorrect: true, explanation: 'Correct! Try x = 2: then y = 2(2) + 3 = 7, and 4x - 2y = 8 - 14 = -6 ✓' },
      { text: '0', isCorrect: false, explanation: 'Not quite. Try x = 2: y = 7, so 4(2) - 2(7) = 8 - 14 = -6.' },
      { text: '6', isCorrect: false, explanation: 'Not quite. Check your arithmetic - try x = 2 and solve step by step.' },
      { text: '12', isCorrect: false, explanation: 'Not quite. Try x = 2: y = 7, so 4x - 2y = 8 - 14 = -6.' }
    ]
  },
  {
    text: 'If the side length of a square is doubled, the area of the square is multiplied by what factor?',
    options: [
      { text: '2', isCorrect: false, explanation: 'Not quite. Try a square with side = 2: area = 4. Double the side to 4: new area = 16. That\'s 4 times larger!' },
      { text: '3', isCorrect: false, explanation: 'Not quite. Try using numbers: original side = 2, area = 4. New side = 4, new area = 16.' },
      { text: '4', isCorrect: true, explanation: 'Correct! Try side = 2: area = 4. Double to side = 4: area = 16. That\'s 16 ÷ 4 = 4 times larger ✓' },
      { text: '8', isCorrect: false, explanation: 'Not quite. Try side = 2 (area = 4) → side = 4 (area = 16). The factor is 16/4 = 4.' }
    ]
  }
];

async function improveLesson12() {
  console.log('📝 Improving Lesson 1.2...\n');

  try {
    // 1. Update lesson content
    console.log('Updating lesson content...');
    const { error: contentError } = await supabase
      .from('lessons')
      .update({
        content: improvedContent,
        updated_at: new Date().toISOString()
      })
      .eq('id', LESSON_ID);

    if (contentError) {
      console.log('❌ Content error:', contentError.message);
      return;
    }

    console.log('✅ Lesson content updated!');
    console.log('   - Removed HTML wrapper tags');
    console.log('   - Improved formatting with clean spacing');
    console.log('   - Added visual boxes for example solutions');
    console.log('   - Made examples beginner-friendly');

    // 2. Create checkpoint quiz
    console.log('\nCreating checkpoint quiz...');

    const { data: newQuiz, error: quizError } = await supabase
      .from('quizzes')
      .insert([{
        lesson_id: LESSON_ID,
        title: 'Checkpoint: Number Substitution Technique',
        intro: 'Test your understanding of number substitution!',
        quiz_type: 'practice',
        position: 100, // At the very end
        is_required: false
      }])
      .select()
      .single();

    if (quizError) {
      console.log('❌ Quiz error:', quizError.message);
      return;
    }

    const quizId = newQuiz.id;
    console.log('✅ Quiz created');

    // 3. Add questions
    for (let i = 0; i < checkpointQuestions.length; i++) {
      const questionData = checkpointQuestions[i];

      const { data: question, error: questionError } = await supabase
        .from('quiz_questions')
        .insert([{
          quiz_id: quizId,
          question_text: questionData.text,
          question_order: i + 1
        }])
        .select()
        .single();

      if (questionError) {
        console.log(`❌ Question ${i + 1} error:`, questionError.message);
        continue;
      }

      // Add options
      for (let j = 0; j < questionData.options.length; j++) {
        const optionData = questionData.options[j];

        await supabase
          .from('quiz_options')
          .insert([{
            question_id: question.id,
            option_text: optionData.text,
            is_correct: optionData.isCorrect,
            explanation: optionData.explanation,
            option_order: j + 1
          }]);
      }

      console.log(`   ✓ Question ${i + 1} added with 4 options`);
    }

    console.log('\n✅ Lesson 1.2 is now perfect!');
    console.log('   - Clean, professional formatting');
    console.log('   - Visual example solutions with colored boxes');
    console.log('   - 5-question interactive checkpoint quiz');
    console.log('   - Quiz positioned at absolute end (position 100)');
  } catch (error) {
    console.log('❌ Unexpected error:', error.message);
  }
}

improveLesson12();
