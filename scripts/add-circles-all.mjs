/**
 * Add Definitions and Quiz for Circles and Ellipses Lesson
 */

import { createClient } from '@supabase/supabase-js';
import * as dotenv from 'dotenv';
import { fileURLToPath } from 'url';
import { dirname, resolve } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

dotenv.config({ path: resolve(__dirname, '../.env') });

const supabaseUrl = process.env.REACT_APP_SUPABASE_URL;
const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

const supabase = createClient(supabaseUrl, supabaseKey);

const termDefinitions = [
  { term: 'circle equation', definition: 'Standard form: (x - h)² + (y - k)² = r², where (h, k) is the center and r is the radius', lesson_key: 'circles-ellipses' },
  { term: 'center', definition: 'The point (h, k) equidistant from all points on the circle', lesson_key: 'circles-ellipses' },
  { term: 'radius', definition: 'The distance from the center to any point on the circle. Symbol: r', lesson_key: 'circles-ellipses' },
  { term: 'diameter', definition: 'The distance across the circle through the center. Equal to 2r', lesson_key: 'circles-ellipses' },
  { term: 'chord', definition: 'A line segment connecting two points on a circle', lesson_key: 'circles-ellipses' },
  { term: 'tangent line', definition: 'A line that touches the circle at exactly one point and is perpendicular to the radius at that point', lesson_key: 'circles-ellipses' },
  { term: 'ellipse', definition: 'An oval-shaped curve. Equation: (x - h)²/a² + (y - k)²/b² = 1, where (h, k) is center', lesson_key: 'circles-ellipses' },
  { term: 'major axis', definition: 'The longest diameter of an ellipse', lesson_key: 'circles-ellipses' },
  { term: 'minor axis', definition: 'The shortest diameter of an ellipse', lesson_key: 'circles-ellipses' },
  { term: 'foci', definition: 'Two special points inside an ellipse. The sum of distances from any point on the ellipse to both foci is constant.', lesson_key: 'circles-ellipses' },
  { term: 'completing the square', definition: 'Algebraic technique to rewrite circle equations from general form to standard form', lesson_key: 'circles-ellipses' }
];

const questions = [
  {
    text: 'What is the center and radius of the circle (x - 3)² + (y + 2)² = 25?',
    options: ['Center: (3, -2), Radius: 5', 'Center: (-3, 2), Radius: 5', 'Center: (3, -2), Radius: 25', 'Center: (3, 2), Radius: 5', 'Center: (-3, -2), Radius: 5'],
    correct_answer: 0,
    explanation: 'Standard form is (x - h)² + (y - k)² = r². Here h = 3, k = -2, r² = 25, so r = 5. Center: (3, -2), Radius: 5'
  },
  {
    text: 'A circle has center (0, 0) and passes through point (6, 8). What is its radius?',
    options: ['6', '8', '10', '14', '100'],
    correct_answer: 2,
    explanation: 'Use distance formula: r = √[(6-0)² + (8-0)²] = √[36 + 64] = √100 = 10'
  },
  {
    text: 'What is the equation of a circle with center (-2, 5) and radius 4?',
    options: ['(x + 2)² + (y - 5)² = 4', '(x - 2)² + (y + 5)² = 16', '(x + 2)² + (y - 5)² = 16', '(x - 2)² + (y - 5)² = 4', '(x + 2)² + (y + 5)² = 16'],
    correct_answer: 2,
    explanation: 'Standard form: (x - h)² + (y - k)² = r². With center (-2, 5) and r = 4: (x - (-2))² + (y - 5)² = 4² → (x + 2)² + (y - 5)² = 16'
  },
  {
    text: 'A diameter of a circle has endpoints at (2, 3) and (8, 11). What is the center of the circle?',
    options: ['(3, 4)', '(5, 7)', '(6, 8)', '(10, 14)', '(4, 5.5)'],
    correct_answer: 1,
    explanation: 'The center is the midpoint of the diameter: ((2+8)/2, (3+11)/2) = (10/2, 14/2) = (5, 7)'
  },
  {
    text: 'A line is tangent to a circle at point P. The radius to point P has slope 2. What is the slope of the tangent line?',
    options: ['2', '-2', '1/2', '-1/2', '0'],
    correct_answer: 3,
    explanation: 'A tangent line is perpendicular to the radius at the point of tangency. Perpendicular slopes are negative reciprocals: if radius slope = 2, tangent slope = -1/2'
  },
  {
    text: 'An ellipse has equation (x - 1)²/9 + (y + 2)²/4 = 1. What is its center?',
    options: ['(1, -2)', '(-1, 2)', '(1, 2)', '(3, 2)', '(9, 4)'],
    correct_answer: 0,
    explanation: 'Ellipse standard form: (x - h)²/a² + (y - k)²/b² = 1. Center is (h, k) = (1, -2)'
  },
  {
    text: 'A circle has equation x² + y² = 49. What is its radius?',
    options: ['7', '14', '49', '√7', '24.5'],
    correct_answer: 0,
    explanation: 'Equation x² + y² = r² means the circle has center (0, 0) and r² = 49, so r = 7'
  }
];

async function addAll() {
  console.log('📚 Adding definitions and quiz for Circles and Ellipses...\\n');

  const { data: lesson } = await supabase.from('lessons').select('id, title').eq('lesson_key', 'circles-ellipses').single();
  console.log(`✅ Found: ${lesson.title}\\n`);

  // Definitions
  await supabase.from('term_definitions').delete().eq('lesson_key', 'circles-ellipses');
  const { data: defs } = await supabase.from('term_definitions').insert(termDefinitions).select();
  console.log(`✅ Added ${defs.length} definitions\\n`);

  // Quiz
  await supabase.from('quizzes').delete().eq('lesson_id', lesson.id);
  const { data: quiz } = await supabase.from('quizzes').insert([{
    lesson_id: lesson.id,
    title: 'Circles & Ellipses Practice',
    intro: 'Test your understanding of circle and ellipse equations.',
    quiz_type: 'practice',
    position: 999,
    is_required: false
  }]).select().single();

  const quizQuestions = questions.map((q, idx) => ({
    quiz_id: quiz.id,
    question_text: q.text,
    question_order: idx
  }));

  const { data: qData } = await supabase.from('quiz_questions').insert(quizQuestions).select();

  const options = [];
  qData.forEach((dbQ, qIdx) => {
    questions[qIdx].options.forEach((opt, optIdx) => {
      options.push({
        question_id: dbQ.id,
        option_text: opt,
        option_order: optIdx,
        is_correct: optIdx === questions[qIdx].correct_answer,
        explanation: optIdx === questions[qIdx].correct_answer ? questions[qIdx].explanation : null
      });
    });
  });

  await supabase.from('quiz_options').insert(options);

  console.log(`✅ Added ${qData.length} questions with 35 options\\n`);
  console.log('✅ Circles lesson complete! ✓ 11 definitions ✓ 7 questions');
  console.log('\\n🎉 ALL 5 GEOMETRY LESSONS COMPLETE!');
}

addAll();
