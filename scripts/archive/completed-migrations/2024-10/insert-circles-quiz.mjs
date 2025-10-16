import { createClient } from '@supabase/supabase-js';
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

const { data: lesson } = await supabase.from('lesson_metadata').select('id').eq('lesson_key', 'circles-ellipses').single();

// Create or get quiz
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
  const { data: newQuiz, error: quizError } = await supabase.from('quizzes').insert({
    lesson_id: lesson.id,
    title: 'Mastery Check',
    quiz_type: 'mastery_check',
    position: 9999,
    is_required: true
  }).select().single();

  if (quizError) {
    console.error('Error creating quiz:', quizError);
    process.exit(1);
  }
  quizId = newQuiz.id;
}

const questions = [
  {
    text: 'Which of the following is the equation of a circle with center (−3, 7) and radius 5?',
    options: [
      { text: '(x + 3)² + (y − 7)² = 5', is_correct: false, explanation: 'The right side should be r² = 25, not r = 5.' },
      { text: '(x + 3)² + (y − 7)² = 25', is_correct: true, explanation: 'Correct! Center (−3, 7) gives us (x + 3) and (y − 7), and radius 5 means r² = 25.' },
      { text: '(x − 3)² + (y + 7)² = 25', is_correct: false, explanation: 'The signs are wrong for the center. (x − 3) means x = 3, not x = −3.' },
      { text: '(x − 3)² + (y − 7)² = 5', is_correct: false, explanation: 'Both the signs and the right side are incorrect.' },
      { text: '(x + 3)² + (y + 7)² = 25', is_correct: false, explanation: 'The y sign is wrong. (y + 7) means y = −7, not y = 7.' }
    ]
  },
  {
    text: 'A circle has the equation x² + y² = 49. What is the diameter of this circle?',
    options: [
      { text: '7', is_correct: false, explanation: 'This is the radius. The diameter is twice the radius.' },
      { text: '14', is_correct: true, explanation: 'Correct! Since r² = 49, r = 7, so the diameter = 2r = 14.' },
      { text: '49', is_correct: false, explanation: 'This is r², not the diameter.' },
      { text: '98', is_correct: false, explanation: 'You may have doubled 49, but remember that 49 = r², not r.' },
      { text: '24.5', is_correct: false, explanation: 'This comes from an incorrect calculation.' }
    ]
  },
  {
    text: 'In the xy-plane, points (−2, 3) and (4, 11) are the endpoints of a diameter on a circle. What is the center of the circle?',
    options: [
      { text: '(2, 8)', is_correct: false, explanation: 'Check your midpoint calculation. The x-coordinate is incorrect.' },
      { text: '(1, 7)', is_correct: true, explanation: 'Correct! Midpoint = ((−2+4)/2, (3+11)/2) = (1, 7).' },
      { text: '(3, 4)', is_correct: false, explanation: 'Both coordinates are incorrect. Use the midpoint formula.' },
      { text: '(−2, 11)', is_correct: false, explanation: 'This is not the midpoint; these are coordinates from the given points.' },
      { text: '(6, 14)', is_correct: false, explanation: 'You may have added the coordinates without dividing by 2.' }
    ]
  },
  {
    text: 'Which of the following equations represents an ellipse with center at the origin, x-radius of 5, and y-radius of 3?',
    options: [
      { text: 'x²/25 + y²/9 = 1', is_correct: true, explanation: 'Correct! a = 5 means a² = 25, and b = 3 means b² = 9.' },
      { text: 'x²/5 + y²/3 = 1', is_correct: false, explanation: 'The denominators should be a² and b², not a and b.' },
      { text: 'x²/9 + y²/25 = 1', is_correct: false, explanation: 'You switched the denominators. x²/a² comes first where a is the x-radius.' },
      { text: 'x² + y² = 25', is_correct: false, explanation: 'This is a circle, not an ellipse.' },
      { text: 'x²/25 − y²/9 = 1', is_correct: false, explanation: 'This is a hyperbola (minus sign), not an ellipse.' }
    ]
  },
  {
    text: 'An ellipse has the equation (x − 2)²/16 + (y + 5)²/25 = 1. What is the center of the ellipse?',
    options: [
      { text: '(2, −5)', is_correct: true, explanation: 'Correct! The signs are opposite: (x − 2) means x = 2, and (y + 5) means y = −5.' },
      { text: '(−2, 5)', is_correct: false, explanation: 'The signs should be opposite to what appears in the equation.' },
      { text: '(2, 5)', is_correct: false, explanation: 'The y-coordinate sign is wrong. (y + 5) means y = −5.' },
      { text: '(16, 25)', is_correct: false, explanation: 'These are the values of a² and b², not the center coordinates.' },
      { text: '(4, 5)', is_correct: false, explanation: 'These come from taking square roots of a² and b², not the center.' }
    ]
  },
  {
    text: 'For the ellipse (x + 3)²/9 + (y − 1)²/36 = 1, what are the coordinates of the vertex that is farthest from the center in the y-direction?',
    options: [
      { text: '(−3, 7)', is_correct: true, explanation: 'Correct! Center is (−3, 1), b = 6, so top vertex is 6 units up: (−3, 1+6) = (−3, 7).' },
      { text: '(−3, −5)', is_correct: false, explanation: 'This is the bottom vertex, not the farthest in the positive y-direction.' },
      { text: '(0, 1)', is_correct: false, explanation: 'This would be for the x-direction, and the calculation is wrong.' },
      { text: '(−3, 37)', is_correct: false, explanation: 'You may have added 36 instead of 6. Remember b² = 36 means b = 6.' },
      { text: '(−3, 4)', is_correct: false, explanation: 'You used a = 3 instead of b = 6 for the y-direction.' }
    ]
  },
  {
    text: 'Which of the following equations represents a horizontal hyperbola?',
    options: [
      { text: 'x²/16 − y²/9 = 1', is_correct: true, explanation: 'Correct! The x² term is positive, making it a horizontal hyperbola.' },
      { text: 'y²/16 − x²/9 = 1', is_correct: false, explanation: 'The y² term is positive, so this is a vertical hyperbola.' },
      { text: 'x²/16 + y²/9 = 1', is_correct: false, explanation: 'This has a plus sign, so it is an ellipse, not a hyperbola.' },
      { text: '−x²/16 + y²/9 = 1', is_correct: false, explanation: 'The y² term is positive, making this a vertical hyperbola.' },
      { text: 'x² + y² = 16', is_correct: false, explanation: 'This is a circle, not a hyperbola.' }
    ]
  },
  {
    text: 'A hyperbola has vertices at (5, 2) and (5, 8). What is the center of the hyperbola?',
    options: [
      { text: '(5, 5)', is_correct: true, explanation: 'Correct! The center is the midpoint: ((5+5)/2, (2+8)/2) = (5, 5).' },
      { text: '(5, 10)', is_correct: false, explanation: 'You may have added the y-coordinates without dividing by 2.' },
      { text: '(0, 5)', is_correct: false, explanation: 'The x-coordinate should match the vertices since this is a vertical hyperbola.' },
      { text: '(10, 5)', is_correct: false, explanation: 'The x-coordinates of the vertices are both 5, not 0 and 10.' },
      { text: '(2, 8)', is_correct: false, explanation: 'These are the y-coordinates of the vertices, not the center.' }
    ]
  },
  {
    text: 'Which type of conic section has the equation (x − 1)²/4 + (y + 2)²/4 = 1?',
    options: [
      { text: 'Circle', is_correct: true, explanation: 'Correct! When a² = b² in an ellipse equation, it becomes a circle.' },
      { text: 'Ellipse', is_correct: false, explanation: 'While this looks like an ellipse equation, a² = b² = 4 makes it a special case: a circle.' },
      { text: 'Hyperbola', is_correct: false, explanation: 'Hyperbolas have a minus sign between the terms, not a plus sign.' },
      { text: 'Parabola', is_correct: false, explanation: 'This is not a parabola. Parabolas have only one squared term.' },
      { text: 'Line', is_correct: false, explanation: 'This has squared terms, so it cannot be a line.' }
    ]
  },
  {
    text: 'A circle has center (4, −3) and passes through point (7, 1). What is the equation of the circle?',
    options: [
      { text: '(x − 4)² + (y + 3)² = 5', is_correct: false, explanation: 'The right side should be r², not r. The distance is 5, so r² = 25.' },
      { text: '(x − 4)² + (y + 3)² = 25', is_correct: true, explanation: 'Correct! r = √[(7−4)² + (1−(−3))²] = √[9+16] = 5, so r² = 25.' },
      { text: '(x + 4)² + (y − 3)² = 25', is_correct: false, explanation: 'The signs are wrong for the center coordinates.' },
      { text: '(x − 7)² + (y − 1)² = 25', is_correct: false, explanation: 'This uses the point (7, 1) as the center, not (4, −3).' },
      { text: '(x − 4)² + (y + 3)² = 10', is_correct: false, explanation: 'You may have calculated 9+16 incorrectly, or forgot to square the radius.' }
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

console.log('✅ Created 10-question mastery quiz for circles-ellipses');
