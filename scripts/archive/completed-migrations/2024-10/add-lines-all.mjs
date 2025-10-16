/**
 * Add Definitions and Quiz for Lines Lesson - Combined
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
  { term: 'slope', definition: 'The steepness of a line. Formula: m = (y₂ - y₁) / (x₂ - x₁) = rise/run', lesson_key: 'lines' },
  { term: 'y-intercept', definition: 'The y-coordinate where a line crosses the y-axis (where x = 0). In y = mx + b, it\'s the value b.', lesson_key: 'lines' },
  { term: 'slope-intercept form', definition: 'Linear equation format: y = mx + b, where m is slope and b is y-intercept', lesson_key: 'lines' },
  { term: 'point-slope form', definition: 'Linear equation format: y - y₁ = m(x - x₁), useful when you know a point and the slope', lesson_key: 'lines' },
  { term: 'standard form', definition: 'Linear equation format: Ax + By = C, where A, B, C are integers', lesson_key: 'lines' },
  { term: 'parallel lines', definition: 'Lines that never intersect and have the same slope. If line 1 has slope m, line 2 parallel to it also has slope m.', lesson_key: 'lines' },
  { term: 'perpendicular lines', definition: 'Lines that intersect at 90°. Their slopes are negative reciprocals: if line 1 has slope m, perpendicular line has slope -1/m.', lesson_key: 'lines' },
  { term: 'distance formula', definition: 'Formula to find distance between two points: d = √[(x₂-x₁)² + (y₂-y₁)²]', lesson_key: 'lines' },
  { term: 'midpoint formula', definition: 'Formula to find the midpoint between two points: M = ((x₁+x₂)/2, (y₁+y₂)/2)', lesson_key: 'lines' },
  { term: 'rise', definition: 'The vertical change between two points (change in y). Used in slope calculation.', lesson_key: 'lines' },
  { term: 'run', definition: 'The horizontal change between two points (change in x). Used in slope calculation.', lesson_key: 'lines' },
  { term: 'linear equation', definition: 'An equation whose graph is a straight line. General form: y = mx + b', lesson_key: 'lines' }
];

const questions = [
  {
    text: 'What is the slope of the line passing through points (2, 3) and (6, 11)?',
    options: ['2', '3', '4', '1/2', '8'],
    correct_answer: 0,
    explanation: 'Slope = (y₂ - y₁) / (x₂ - x₁) = (11 - 3) / (6 - 2) = 8 / 4 = 2'
  },
  {
    text: 'A line has equation y = -3x + 7. What is its y-intercept?',
    options: ['-3', '3', '7', '-7', '0'],
    correct_answer: 2,
    explanation: 'In y = mx + b form, b is the y-intercept. Here b = 7.'
  },
  {
    text: 'Line A has slope 5. Line B is perpendicular to Line A. What is the slope of Line B?',
    options: ['5', '-5', '1/5', '-1/5', '0'],
    correct_answer: 3,
    explanation: 'Perpendicular lines have slopes that are negative reciprocals. If m = 5, then perpendicular slope = -1/5.'
  },
  {
    text: 'Two lines are parallel. One line has equation y = 2x + 3. Which equation represents a line parallel to it?',
    options: ['y = 2x - 5', 'y = -2x + 3', 'y = (1/2)x + 3', 'y = -1/2x + 3', 'y = 3x + 2'],
    correct_answer: 0,
    explanation: 'Parallel lines have the same slope. The original has slope 2, so y = 2x - 5 is parallel (same slope, different intercept).'
  },
  {
    text: 'What is the distance between points (1, 2) and (4, 6)?',
    options: ['3', '4', '5', '7', '25'],
    correct_answer: 2,
    explanation: 'Distance = √[(x₂-x₁)² + (y₂-y₁)²] = √[(4-1)² + (6-2)²] = √[9 + 16] = √25 = 5'
  },
  {
    text: 'What is the midpoint of the segment connecting (2, 8) and (10, 4)?',
    options: ['(4, 2)', '(6, 6)', '(8, 12)', '(12, 12)', '(5, 6)'],
    correct_answer: 1,
    explanation: 'Midpoint = ((x₁+x₂)/2, (y₁+y₂)/2) = ((2+10)/2, (8+4)/2) = (12/2, 12/2) = (6, 6)'
  },
  {
    text: 'A line passes through (3, 5) with slope 4. What is the equation in point-slope form?',
    options: ['y - 5 = 4(x - 3)', 'y + 5 = 4(x + 3)', 'y - 3 = 4(x - 5)', 'y = 4x + 3', 'y = 4x - 7'],
    correct_answer: 0,
    explanation: 'Point-slope form: y - y₁ = m(x - x₁). With (3, 5) and m = 4: y - 5 = 4(x - 3)'
  }
];

async function addAll() {
  console.log('📚 Adding definitions and quiz for Lines...\\n');

  const { data: lesson } = await supabase.from('lessons').select('id, title').eq('lesson_key', 'lines').single();
  console.log(`✅ Found: ${lesson.title}\\n`);

  // Definitions
  await supabase.from('term_definitions').delete().eq('lesson_key', 'lines');
  const { data: defs } = await supabase.from('term_definitions').insert(termDefinitions).select();
  console.log(`✅ Added ${defs.length} definitions\\n`);

  // Quiz
  await supabase.from('quizzes').delete().eq('lesson_id', lesson.id);
  const { data: quiz } = await supabase.from('quizzes').insert([{
    lesson_id: lesson.id,
    title: 'Lines & Slopes Practice',
    intro: 'Test your understanding of slopes, equations, and distance.',
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
  console.log('✅ Lines lesson complete! ✓ 12 definitions ✓ 7 questions');
}

addAll();
