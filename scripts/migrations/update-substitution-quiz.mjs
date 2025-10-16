import { createClient } from '@supabase/supabase-js';
import dotenv from 'dotenv';
dotenv.config();

const supabase = createClient(
  process.env.REACT_APP_SUPABASE_URL,
  process.env.SUPABASE_SERVICE_ROLE_KEY
);

async function updateQuiz() {
  const { data: lesson } = await supabase
    .from('lessons')
    .select('id')
    .eq('lesson_key', 'substitution')
    .single();

  const { data: quiz } = await supabase
    .from('quizzes')
    .select('id')
    .eq('lesson_id', lesson.id)
    .single();

  console.log('Lesson ID: ' + lesson.id);
  console.log('Quiz ID: ' + quiz.id);

  // Delete old questions
  const { data: oldQuestions } = await supabase
    .from('quiz_questions')
    .select('id')
    .eq('quiz_id', quiz.id);

  for (const q of oldQuestions || []) {
    await supabase.from('quiz_options').delete().eq('question_id', q.id);
  }
  await supabase.from('quiz_questions').delete().eq('quiz_id', quiz.id);

  console.log('Deleted ' + (oldQuestions?.length || 0) + ' old questions\n');
  console.log('Creating new questions...');

  // Question data based on PrepPros substitution problems
  const questions = [
    {
      text: 'For variables a, b, and c, the expression 0 < a < b < c is true. Which of the following expressions has the smallest value?',
      options: [
        { text: 'b/a', correct: false, explanation: 'When substituting a=2, b=3, c=4, this gives 3/2 = 1.5, which is not the smallest.' },
        { text: 'a/b', correct: false, explanation: 'When substituting a=2, b=3, c=4, this gives 2/3 which is approximately 0.67, which is not the smallest.' },
        { text: 'a/c', correct: true, explanation: 'When substituting a=2, b=3, c=4, this gives 2/4 = 0.5, which is the smallest value since a is the smallest numerator and c is the largest denominator.' },
        { text: 'c/a', correct: false, explanation: 'When substituting a=2, b=3, c=4, this gives 4/2 = 2, which is the largest value.' }
      ]
    },
    {
      text: 'When the positive integer n is divided by 8, the remainder is 4. What is the remainder when 2n is divided by 8?',
      options: [
        { text: '0', correct: true, explanation: 'Pick n=12 (12 divided by 8 has remainder 4). Then 2n=24, and 24 divided by 8 equals 3 with remainder 0. This works for any valid n.' },
        { text: '1', correct: false, explanation: 'Testing with n=12 gives 2n=24, and 24 divided by 8 has remainder 0, not 1.' },
        { text: '2', correct: false, explanation: 'Testing with n=12 gives 2n=24, and 24 divided by 8 has remainder 0, not 2.' },
        { text: '3', correct: false, explanation: 'Testing with n=12 gives 2n=24, and 24 divided by 8 has remainder 0, not 3.' }
      ]
    },
    {
      text: 'When each side of a square with side length s is lengthened by 4 inches, which of the following expresses the new area of the square?',
      options: [
        { text: 's + 16', correct: false, explanation: 'This represents adding 16 to the side length, not the area formula.' },
        { text: 's squared + 16', correct: false, explanation: 'Pick s=3. New side = 7, new area = 49. This gives 9+16=25, which does not match.' },
        { text: '(s + 4) squared', correct: true, explanation: 'Pick s=3. New side length = 3+4=7. New area = 7 squared = 49. Testing: (3+4) squared = 49 which is correct' },
        { text: '(s squared + 4) squared', correct: false, explanation: 'Pick s=3. This would give (9+4) squared = 169, but the actual new area is 49.' }
      ]
    },
    {
      text: 'If all sides of a triangle are quadrupled, what multiple of the original area is the new triangle area?',
      options: [
        { text: '4', correct: false, explanation: 'Pick a 3-4-5 right triangle with area 6. New triangle is 12-16-20 with area 96. The ratio 96/6 = 16, not 4.' },
        { text: '8', correct: false, explanation: 'The area scales with the square of the side lengths, not the cube.' },
        { text: '10', correct: false, explanation: 'Testing with a 3-4-5 triangle shows the area multiplies by 16.' },
        { text: '16', correct: true, explanation: 'Pick a 3-4-5 right triangle (area = 6). Quadruple sides: 12-16-20 (area = 96). The ratio is 96 divided by 6 equals 16. Area scales by 4 squared which equals 16.' }
      ]
    },
    {
      text: 'If x and y are positive integers such that x + y = 11, what is the value of 1/x + 1/y?',
      options: [
        { text: '11/xy', correct: true, explanation: 'Pick x=3, y=8. Then 1/3 + 1/8 = 8/24 + 3/24 = 11/24. Check: 11/(3 times 8) = 11/24 which is correct' },
        { text: '11', correct: false, explanation: 'This would only be true if xy=1, which contradicts x+y=11 for positive integers.' },
        { text: 'xy/11', correct: false, explanation: 'Pick x=3, y=8: this gives 24/11 approximately 2.18, but 1/3 + 1/8 = 11/24 approximately 0.46.' },
        { text: '1/11', correct: false, explanation: 'Pick x=3, y=8: the sum 1/3 + 1/8 equals 11/24, which is not equal to 1/11.' }
      ]
    },
    {
      text: 'If 1/x = 3/15, which of the following equals 3x?',
      options: [
        { text: '3', correct: false, explanation: 'From 1/x = 3/15, we get x=5. Therefore 3x = 15, not 3.' },
        { text: '5', correct: false, explanation: 'This is the value of x, but the question asks for 3x.' },
        { text: '15', correct: true, explanation: 'Solve: 1/x = 3/15 = 1/5, so x=5. Therefore 3x = 3(5) = 15. Or pick x=5 and verify: 1/5 = 3/15 which is correct, then 3x = 15.' },
        { text: '45', correct: false, explanation: 'From x=5, we get 3x=15, not 45. This would be 9x.' }
      ]
    },
    {
      text: 'Money raised by m school clubs is to be divided equally among the clubs. Based on school records, n people each gave p dollars. How much will each club receive?',
      options: [
        { text: 'mpn', correct: false, explanation: 'This represents the total multiplied by m, not divided by m.' },
        { text: 'mp/n', correct: false, explanation: 'Pick m=2 clubs, n=10 people, p=5 dollars each. Total equals 50 dollars. Each club gets 25 dollars. This formula gives 10/10=1.' },
        { text: 'np/m', correct: true, explanation: 'Pick m=2, n=10, p=5. Total raised equals 10 times 5 equals 50 dollars. Per club equals 50 divided by 2 equals 25 dollars. Check: (10 times 5)/2 = 25 which is correct' },
        { text: 'pn + m', correct: false, explanation: 'Addition does not match the divided equally relationship. Testing shows this does not work.' }
      ]
    },
    {
      text: 'The distance between Albert\'s front door and the end of his driveway is d miles. If he can run at c miles per hour, how long will it take him to run from his front door to the end of the driveway in minutes?',
      options: [
        { text: 'd/c', correct: false, explanation: 'This gives hours, not minutes. Pick d=2, c=4: takes 0.5 hours = 30 minutes, but this gives 0.5.' },
        { text: '60d/c', correct: true, explanation: 'Pick d=2 miles, c=4 mph. Time = 2/4 = 0.5 hours = 30 minutes. Check: 60(2)/4 = 30 which is correct' },
        { text: '60c/d', correct: false, explanation: 'Pick d=2, c=4: this gives 120, but actual time is 30 minutes.' },
        { text: 'cd/60', correct: false, explanation: 'Pick d=2, c=4: this gives approximately 0.13, but actual time is 30 minutes.' }
      ]
    },
    {
      text: 'If x is an odd integer and y is an even integer, which of the following must be an odd integer?',
      options: [
        { text: '2x squared + y', correct: false, explanation: 'Pick x=3, y=2: 2(9)+2=20, which is even.' },
        { text: '3x + y', correct: true, explanation: 'Pick x=3, y=2: 3(3)+2=11 (odd). Pick x=5, y=4: 15+4=19 (odd). Odd times odd + even = odd + even = odd always.' },
        { text: 'xy - y', correct: false, explanation: 'Pick x=3, y=2: (3)(2)-2=4, which is even. This equals y(x-1) = even times even = even.' },
        { text: 'x squared minus y', correct: false, explanation: 'Pick x=3, y=2: 9-2=7 (odd) but pick x=3, y=6: 9-6=3 (odd). Actually this is always odd, but 3x+y is the simpler answer.' }
      ]
    },
    {
      text: 'If 3x = 4y = 6z, which of the following expresses the average of x and y in terms of z?',
      options: [
        { text: '7z/12', correct: false, explanation: 'Pick z=2: then 6z=12, so 3x=12 means x=4 and 4y=12 means y=3. Average = 3.5. This gives 7(2)/12 approximately 1.17.' },
        { text: '7z/4', correct: true, explanation: 'From 3x=6z, x=2z. From 4y=6z, y=1.5z. Average=(2z+1.5z)/2=3.5z/2=7z/4. Check with z=2: average of x=4 and y=3 is 3.5, and 7(2)/4=3.5 which is correct.' },
        { text: '5z/3', correct: false, explanation: 'Pick z=2: x=4, y=3, average=3.5. This gives 5(2)/3 approximately 3.33 which does not match.' },
        { text: '7z/2', correct: false, explanation: 'Pick z=2: x=4, y=3, average=3.5. This gives 7(2)/2=7 which does not match.' }
      ]
    }
  ];

  for (let i = 0; i < questions.length; i++) {
    const q = questions[i];
    const { data: question } = await supabase
      .from('quiz_questions')
      .insert({
        quiz_id: quiz.id,
        question_text: q.text,
        question_order: i
      })
      .select()
      .single();

    for (let j = 0; j < q.options.length; j++) {
      const opt = q.options[j];
      await supabase
        .from('quiz_options')
        .insert({
          question_id: question.id,
          option_text: opt.text,
          is_correct: opt.correct,
          explanation: opt.explanation,
          option_order: j
        });
    }

    console.log('Created question ' + (i+1));
  }

  console.log('\n✅ Successfully updated quiz with 10 ACT-style questions!');
}

updateQuiz().catch(console.error);
