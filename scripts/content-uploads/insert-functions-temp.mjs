import { createClient } from '@supabase/supabase-js';
import { readFileSync } from 'fs';
import * as dotenv from 'dotenv';

dotenv.config();

const supabase = createClient(
  process.env.REACT_APP_SUPABASE_URL,
  process.env.SUPABASE_SERVICE_ROLE_KEY
);

const html = readFileSync('formatted-functions.html', 'utf-8');

const { data: lesson } = await supabase
  .from('lesson_metadata')
  .select('id')
  .eq('lesson_key', 'functions')
  .single();

let section;
const { data: existingSection } = await supabase
  .from('lesson_sections')
  .select('id')
  .eq('lesson_id', lesson.id)
  .eq('section_key', 'main_content')
  .single();

if (existingSection) {
  section = existingSection;
} else {
  const { data: newSection } = await supabase
    .from('lesson_sections')
    .insert({
      lesson_id: lesson.id,
      section_key: 'main_content',
      title: 'Main Content',
      section_type: 'content',
      order_index: 1
    })
    .select()
    .single();
  section = newSection;
}

const { data: existingContent } = await supabase
  .from('section_content')
  .select('id')
  .eq('section_id', section.id)
  .single();

if (existingContent) {
  await supabase
    .from('section_content')
    .update({ content: html })
    .eq('id', existingContent.id);
  console.log('Updated existing content');
} else {
  await supabase
    .from('section_content')
    .insert({
      section_id: section.id,
      content_type: 'html',
      content: html,
      order_index: 1
    });
  console.log('Inserted new content');
}

const { data: existingQuiz } = await supabase
  .from('quizzes')
  .select('id')
  .eq('lesson_id', lesson.id)
  .eq('quiz_type', 'mastery')
  .single();

let quizId;
if (existingQuiz) {
  quizId = existingQuiz.id;
  await supabase.from('quiz_questions').delete().eq('quiz_id', quizId);
  console.log('Using existing quiz, deleted old questions');
} else {
  const { data: newQuiz } = await supabase
    .from('quizzes')
    .insert({
      lesson_id: lesson.id,
      title: 'Functions Mastery Check',
      quiz_type: 'mastery',
      position: 9999,
      is_required: true
    })
    .select()
    .single();
  quizId = newQuiz.id;
  console.log('Created new quiz');
}

const questions = [
  {
    text: 'Expand (3x + 2)(x + 4). What is the result?',
    options: [
      { text: '3x² + 8', is_correct: false, explanation: 'This forgets the middle terms. Use FOIL: First, Outer, Inner, Last.' },
      { text: '3x² + 14x + 8', is_correct: true, explanation: 'Using FOIL: First (3x)(x) = 3x², Outer (3x)(4) = 12x, Inner (2)(x) = 2x, Last (2)(4) = 8. Combine: 3x² + 14x + 8 ✓' },
      { text: '3x² + 12x + 8', is_correct: false, explanation: 'You calculated Outer correctly but forgot Inner. Inner term is (2)(x) = 2x, so middle term is 12x + 2x = 14x.' },
      { text: '3x² + 6x + 8', is_correct: false, explanation: 'Middle terms are incorrect. Outer: (3x)(4) = 12x. Inner: (2)(x) = 2x. Total middle: 14x.' },
      { text: '3x² + 10x + 8', is_correct: false, explanation: 'Middle terms are incorrect. Use FOIL to get 12x + 2x = 14x, not 10x.' }
    ]
  },
  {
    text: 'What is (x + 7)²?',
    options: [
      { text: 'x² + 49', is_correct: false, explanation: 'Don\'t forget the middle term! (x + 7)² ≠ x² + 49.' },
      { text: 'x² + 7x + 49', is_correct: false, explanation: 'Close, but middle term should be 2(7x) = 14x, not 7x.' },
      { text: 'x² + 14x + 49', is_correct: true, explanation: '(x + 7)² = (x + 7)(x + 7) = x² + 7x + 7x + 49 = x² + 14x + 49 ✓' },
      { text: 'x² + 14x + 7', is_correct: false, explanation: 'Last term should be 7 × 7 = 49, not 7.' },
      { text: '2x + 14', is_correct: false, explanation: 'This is not how squaring works. Use (x + 7)(x + 7) and FOIL.' }
    ]
  },
  {
    text: 'Factor x² − 64.',
    options: [
      { text: '(x − 8)(x − 8)', is_correct: false, explanation: 'This would give x² − 16x + 64, not x² − 64.' },
      { text: '(x + 8)(x + 8)', is_correct: false, explanation: 'This would give x² + 16x + 64, not x² − 64.' },
      { text: '(x + 8)(x − 8)', is_correct: true, explanation: 'This is difference of squares: x² − 64 = x² − 8² = (x + 8)(x − 8) ✓' },
      { text: '(x − 4)(x + 16)', is_correct: false, explanation: 'This would give x² + 12x − 64, not x² − 64.' },
      { text: 'Cannot be factored', is_correct: false, explanation: 'This can be factored using difference of squares: (x + 8)(x − 8).' }
    ]
  },
  {
    text: 'What are the solutions to x² − 5x + 6 = 0?',
    options: [
      { text: 'x = −2 and x = −3', is_correct: false, explanation: 'Signs are wrong. Factor: (x − 2)(x − 3) = 0 gives positive solutions.' },
      { text: 'x = 2 and x = 3', is_correct: true, explanation: 'Factor: (x − 2)(x − 3) = 0. Set each factor to zero: x = 2 and x = 3 ✓' },
      { text: 'x = −5 and x = 6', is_correct: false, explanation: 'These would give (x + 5)(x − 6) = x² − x − 30, not x² − 5x + 6.' },
      { text: 'x = 1 and x = 6', is_correct: false, explanation: 'These would give (x − 1)(x − 6) = x² − 7x + 6, not x² − 5x + 6.' },
      { text: 'x = 5 and x = 6', is_correct: false, explanation: 'If x = 5: 25 − 25 + 6 = 6 ≠ 0. Not solutions.' }
    ]
  },
  {
    text: 'If x² + 8x + k can be written as (x + 4)², what is k?',
    options: [
      { text: '4', is_correct: false, explanation: 'Expand (x + 4)² = x² + 8x + 16. So k = 16, not 4.' },
      { text: '8', is_correct: false, explanation: 'The 8 is the coefficient of x, not the constant term. Expand: (x + 4)² = x² + 8x + 16.' },
      { text: '12', is_correct: false, explanation: '(x + 4)² = x² + 8x + 16, so k = 16, not 12.' },
      { text: '16', is_correct: true, explanation: 'Expand (x + 4)² = (x + 4)(x + 4) = x² + 8x + 16. Therefore k = 16 ✓' },
      { text: '32', is_correct: false, explanation: '(x + 4)² = x² + 8x + 16, not x² + 8x + 32.' }
    ]
  },
  {
    text: 'What is the sum of the roots of f(x) = x² − 9x + 20?',
    options: [
      { text: '4', is_correct: false, explanation: 'Factor: (x − 4)(x − 5) = 0. Roots are 4 and 5. Sum: 4 + 5 = 9.' },
      { text: '5', is_correct: false, explanation: 'Factor: (x − 4)(x − 5) = 0. Roots are 4 and 5. Sum: 4 + 5 = 9, not just 5.' },
      { text: '9', is_correct: true, explanation: 'Factor: (x − 4)(x − 5) = 0. Roots are x = 4 and x = 5. Sum: 4 + 5 = 9 ✓' },
      { text: '20', is_correct: false, explanation: 'That\'s the constant term. The roots are 4 and 5, which sum to 9.' },
      { text: '−9', is_correct: false, explanation: 'Watch the sign! Roots are 4 and 5. Sum is positive 9, not −9.' }
    ]
  },
  {
    text: 'Using the quadratic formula, what are the solutions to 2x² + 3x − 2 = 0?',
    options: [
      { text: 'x = (−3 ± √25) / 4', is_correct: true, explanation: 'Using x = (−b ± √(b² − 4ac)) / 2a with a=2, b=3, c=−2: x = (−3 ± √(9 + 16)) / 4 = (−3 ± √25) / 4 = (−3 ± 5) / 4. Solutions: x = 1/2 or x = −2 ✓' },
      { text: 'x = (−3 ± √1) / 4', is_correct: false, explanation: 'Discriminant is wrong. b² − 4ac = 9 − 4(2)(−2) = 9 + 16 = 25, not 1.' },
      { text: 'x = (3 ± √25) / 4', is_correct: false, explanation: 'Wrong sign on b. Should be −b = −3, not +3.' },
      { text: 'x = (−3 ± √17) / 4', is_correct: false, explanation: 'Discriminant calculation error. b² − 4ac = 9 − 4(2)(−2) = 9 + 16 = 25, not 17.' },
      { text: 'x = (−3 ± √9) / 2', is_correct: false, explanation: 'Wrong denominator (should be 2a = 4) and wrong discriminant (should be 25).' }
    ]
  },
  {
    text: 'How many real solutions does x² + 2x + 5 = 0 have?',
    options: [
      { text: '0', is_correct: true, explanation: 'Calculate discriminant: b² − 4ac = 4 − 4(1)(5) = 4 − 20 = −16. Negative discriminant means 0 real solutions ✓' },
      { text: '1', is_correct: false, explanation: 'For 1 solution, discriminant must equal 0. Here: 4 − 20 = −16 < 0.' },
      { text: '2', is_correct: false, explanation: 'For 2 solutions, discriminant must be positive. Here: 4 − 20 = −16 < 0.' },
      { text: '3', is_correct: false, explanation: 'Functions can have at most 2 real solutions. Here the discriminant is negative, so 0 real solutions.' },
      { text: 'Infinite', is_correct: false, explanation: 'Functions have a finite number of solutions. Use discriminant: −16 < 0 means 0 real solutions.' }
    ]
  },
  {
    text: 'For what value of k does x² − 6x + k = 0 have exactly one solution?',
    options: [
      { text: '3', is_correct: false, explanation: 'For exactly one solution, discriminant must equal 0: (−6)² − 4(1)(k) = 0. Solve: 36 − 4k = 0, so k = 9.' },
      { text: '6', is_correct: false, explanation: 'Set discriminant to 0: 36 − 4k = 0. Solving: 4k = 36, k = 9, not 6.' },
      { text: '9', is_correct: true, explanation: 'For one solution, discriminant = 0: b² − 4ac = 0. So (−6)² − 4(1)(k) = 0. Solve: 36 = 4k, k = 9 ✓' },
      { text: '12', is_correct: false, explanation: 'Discriminant = 36 − 4k = 36 − 48 = −8 < 0. This gives 0 real solutions, not 1.' },
      { text: '36', is_correct: false, explanation: 'Discriminant = 36 − 4(36) = 36 − 144 = −108 < 0. This gives 0 real solutions.' }
    ]
  },
  {
    text: 'What is the vertex of y = (x − 3)² + 7?',
    options: [
      { text: '(−3, 7)', is_correct: false, explanation: 'Watch the sign! Vertex form is y = a(x − h)² + k with vertex (h, k). Here h = 3, not −3.' },
      { text: '(3, −7)', is_correct: false, explanation: 'The y-coordinate is wrong. Vertex form gives (h, k) = (3, 7), not (3, −7).' },
      { text: '(3, 7)', is_correct: true, explanation: 'Vertex form is y = a(x − h)² + k with vertex at (h, k). Here h = 3, k = 7, so vertex is (3, 7) ✓' },
      { text: '(−3, −7)', is_correct: false, explanation: 'Both coordinates have wrong signs. From y = (x − 3)² + 7, vertex is (3, 7).' },
      { text: '(0, 16)', is_correct: false, explanation: 'That\'s not from the vertex form. Vertex form y = a(x − h)² + k gives vertex (h, k) = (3, 7).' }
    ]
  }
];

for (let i = 0; i < questions.length; i++) {
  const q = questions[i];

  const { data: question } = await supabase
    .from('quiz_questions')
    .insert({
      quiz_id: quizId,
      question_text: q.text,
      question_order: i + 1
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
        option_order: j + 1,
        is_correct: opt.is_correct,
        explanation: opt.explanation
      });
  }

  console.log(`Inserted question ${i + 1} with ${q.options.length} options`);
}

console.log('✅ Functions lesson complete!');
