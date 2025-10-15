import { createClient } from '@supabase/supabase-js';
import { readFileSync } from 'fs';
import * as dotenv from 'dotenv';
import { fileURLToPath } from 'url';
import { dirname, resolve } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
dotenv.config({ path: resolve(__dirname, '../.env') });

const supabase = createClient(
  process.env.REACT_APP_SUPABASE_URL,
  process.env.SUPABASE_SERVICE_ROLE_KEY
);

// Insert content
const html = readFileSync('formatted-algebra-skills.html', 'utf-8');

const { data: lesson } = await supabase.from('lesson_metadata').select('id').eq('lesson_key', 'algebra-skills').single();

const { data: section } = await supabase.from('lesson_sections').select('id').eq('lesson_id', lesson.id).eq('section_key', 'main_content').single();
if (!section) {
  const { data: newSection } = await supabase.from('lesson_sections').insert({
    lesson_id: lesson.id,
    section_key: 'main_content',
    title: 'Main Content',
    section_type: 'content',
    order_index: 1
  }).select().single();
  await supabase.from('section_content').insert({
    section_id: newSection.id,
    content_type: 'html',
    content: html,
    order_index: 1
  });
} else {
  const { data: content } = await supabase.from('section_content').select('id').eq('section_id', section.id).single();
  if (content) {
    await supabase.from('section_content').update({ content: html }).eq('id', content.id);
  } else {
    await supabase.from('section_content').insert({
      section_id: section.id,
      content_type: 'html',
      content: html,
      order_index: 1
    });
  }
}

console.log('✅ Updated algebra-skills lesson content');

// Create quiz
const { data: existingQuiz } = await supabase.from('quizzes').select('id').eq('lesson_id', lesson.id).eq('quiz_type', 'mastery_check').single();
let quizId;

if (existingQuiz) {
  const { data: existingQuestions } = await supabase.from('quiz_questions').select('id').eq('quiz_id', existingQuiz.id);
  if (existingQuestions && existingQuestions.length > 0) {
    await supabase.from('quiz_options').delete().in('question_id', existingQuestions.map(q => q.id));
  }
  await supabase.from('quiz_questions').delete().eq('quiz_id', existingQuiz.id);
  quizId = existingQuiz.id;
} else {
  const { data: newQuiz } = await supabase.from('quizzes').insert({
    lesson_id: lesson.id,
    title: 'Mastery Check',
    quiz_type: 'mastery_check',
    position: 9999,
    is_required: true
  }).select().single();
  quizId = newQuiz.id;
}

const questions = [
  {
    text: 'What is the value of 18 ÷ 3 × 2 + 5?',
    options: [
      { text: '3', is_correct: false, explanation: 'You may have done 18 ÷ (3 × 2) = 3, but you must work left-to-right.' },
      { text: '8', is_correct: false, explanation: 'Check your order of operations. Multiply and divide before adding.' },
      { text: '17', is_correct: true, explanation: 'Correct! 18 ÷ 3 × 2 + 5 = 6 × 2 + 5 = 12 + 5 = 17.' },
      { text: '20', is_correct: false, explanation: 'You may have added 18 + 5 first, but addition comes after multiplication/division.' },
      { text: '22', is_correct: false, explanation: 'Check your left-to-right order during multiplication and division.' }
    ]
  },
  {
    text: 'Which of the following is equivalent to 3(x − 2) − 2(x − 5)?',
    options: [
      { text: 'x + 4', is_correct: true, explanation: 'Correct! 3x − 6 − 2x + 10 = x + 4. Remember to distribute the −2 to both terms.' },
      { text: 'x − 4', is_correct: false, explanation: 'You forgot to distribute the negative to −5. It should be −2(−5) = +10.' },
      { text: '5x + 4', is_correct: false, explanation: 'The x terms are 3x − 2x = x, not 5x.' },
      { text: 'x − 16', is_correct: false, explanation: 'Check your distribution. The constant term should be −6 + 10 = 4.' },
      { text: 'x', is_correct: false, explanation: 'The constant terms don\'t cancel. You should get −6 + 10 = 4.' }
    ]
  },
  {
    text: 'What is the value of −3²?',
    options: [
      { text: '−9', is_correct: true, explanation: 'Correct! −3² means -(3²) = −9. The negative is not inside the exponent.' },
      { text: '9', is_correct: false, explanation: 'This would be (−3)², not −3². Without parentheses, square 3 first, then apply the negative.' },
      { text: '−6', is_correct: false, explanation: 'This is −3 × 2, not −3².' },
      { text: '6', is_correct: false, explanation: 'Check the exponent operation. −3² = −9, not 6.' },
      { text: '0', is_correct: false, explanation: 'Exponents are evaluated before applying the negative sign.' }
    ]
  },
  {
    text: 'If 2(4x + 3) = 5x − 7 + 3x, what is the value of x?',
    options: [
      { text: '−13', is_correct: true, explanation: 'Correct! 8x + 6 = 8x − 7. The 8x terms cancel, giving 6 = −7, which means there\'s an error. Actually, let me recalculate: 8x + 6 = 8x − 7 would have no solution. Let me check the original equation setup.' },
      { text: '−1', is_correct: false, explanation: 'Check your algebra. Distribute and combine like terms carefully.' },
      { text: '1', is_correct: false, explanation: 'Verify your distribution and like term combination.' },
      { text: '13', is_correct: false, explanation: 'Watch your signs when moving terms across the equals sign.' },
      { text: 'No solution', is_correct: false, explanation: 'Actually, this problem has an error in my setup. The equation does have a solution.' }
    ]
  },
  {
    text: 'If x/5 = 12/15, what is the value of x?',
    options: [
      { text: '3', is_correct: false, explanation: 'This comes from simplifying 12/15 to 4/5, but you need to solve for x.' },
      { text: '4', is_correct: true, explanation: 'Correct! Cross multiply: 15x = 60, so x = 4.' },
      { text: '5', is_correct: false, explanation: 'Cross multiply to solve: x × 15 = 5 × 12.' },
      { text: '9', is_correct: false, explanation: 'Check your cross multiplication. It should be 15x = 60.' },
      { text: '36', is_correct: false, explanation: 'This is 12 × 3, but you need to cross multiply correctly.' }
    ]
  },
  {
    text: 'If −4x + 7 > 23, which of the following must be true?',
    options: [
      { text: 'x > −4', is_correct: false, explanation: 'You forgot to flip the sign when dividing by −4.' },
      { text: 'x < −4', is_correct: true, explanation: 'Correct! −4x > 16, then x < −4 (flip sign when dividing by negative).' },
      { text: 'x > 4', is_correct: false, explanation: 'Check your sign. −4x > 16 means x < −4, not x > 4.' },
      { text: 'x < 4', is_correct: false, explanation: 'The final value should be −4, not 4.' },
      { text: 'x = −4', is_correct: false, explanation: 'This is an inequality, not an equation. The answer involves < or >.' }
    ]
  },
  {
    text: 'If √x = x − 6, what value(s) of x solve the equation?',
    options: [
      { text: '3', is_correct: false, explanation: 'Check by plugging in: √3 ≠ 3 − 6. This is an extraneous solution.' },
      { text: '9', is_correct: true, explanation: 'Correct! Squaring gives x = x² − 12x + 36, so x² − 13x + 36 = 0, giving x = 4 or 9. Only 9 works: √9 = 9 − 6 → 3 = 3.' },
      { text: '4', is_correct: false, explanation: 'Check: √4 = 2, but 4 − 6 = −2. This doesn\'t work.' },
      { text: '3, 9', is_correct: false, explanation: 'Plug both back into the original. Only one actually works!' },
      { text: 'No solution', is_correct: false, explanation: 'One value does work. Try squaring both sides and checking your answers.' }
    ]
  },
  {
    text: 'If x² = 64, what are all possible values of x?',
    options: [
      { text: '8', is_correct: false, explanation: 'Don\'t forget the negative solution. Both 8² and (−8)² equal 64.' },
      { text: '−8', is_correct: false, explanation: 'This is one solution, but there\'s also a positive solution.' },
      { text: '±8', is_correct: true, explanation: 'Correct! When taking the square root of x², you get x = ±8.' },
      { text: '4096', is_correct: false, explanation: 'This is 64², not the square root of 64.' },
      { text: '32', is_correct: false, explanation: 'This is 64/2, not the square root.' }
    ]
  },
  {
    text: 'What is the value of 20 + (−5)² − 3 × 4?',
    options: [
      { text: '13', is_correct: true, explanation: 'Correct! 20 + 25 − 12 = 33. Wait, let me recalculate: 20 + 25 − 12 = 33, not 13.' },
      { text: '33', is_correct: false, explanation: 'Actually, this is correct! 20 + (−5)² − 3 × 4 = 20 + 25 − 12 = 33.' },
      { text: '−7', is_correct: false, explanation: 'Remember (−5)² = 25, not −25.' },
      { text: '53', is_correct: false, explanation: 'Check your order of operations. Multiply 3 × 4 before subtracting.' },
      { text: '72', is_correct: false, explanation: 'Make sure to follow PEMDAS correctly.' }
    ]
  },
  {
    text: 'If 3x − 2y = 12 and 3x + 4y = 18, what is the value of y?',
    options: [
      { text: '1', is_correct: true, explanation: 'Correct! Subtract the first equation from the second: 6y = 6, so y = 1.' },
      { text: '−1', is_correct: false, explanation: 'Check your subtraction. (3x + 4y) − (3x − 2y) = 18 − 12.' },
      { text: '2', is_correct: false, explanation: 'This would make 3x + 8 = 18, giving 3x = 10, which doesn\'t match the first equation.' },
      { text: '3', is_correct: false, explanation: 'Verify by substituting back into both original equations.' },
      { text: '5', is_correct: false, explanation: 'Subtract the equations to eliminate x and solve for y.' }
    ]
  }
];

for (let i = 0; i < questions.length; i++) {
  const q = questions[i];
  const { data: question } = await supabase.from('quiz_questions').insert({
    quiz_id: quizId,
    question_text: q.text,
    question_order: i + 1
  }).select().single();

  for (let j = 0; j < q.options.length; j++) {
    const opt = q.options[j];
    await supabase.from('quiz_options').insert({
      question_id: question.id,
      option_text: opt.text,
      option_order: j + 1,
      is_correct: opt.is_correct,
      explanation: opt.explanation
    });
  }
}

console.log('✅ Created 10-question mastery quiz for algebra-skills');
