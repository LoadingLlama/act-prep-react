import { createClient } from '@supabase/supabase-js';
import * as dotenv from 'dotenv';
import { fileURLToPath } from 'url';
import { dirname, resolve } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
dotenv.config({ path: resolve(__dirname, '../.env') });

const supabase = createClient(process.env.REACT_APP_SUPABASE_URL, process.env.SUPABASE_SERVICE_ROLE_KEY);

const definitions = [
  { term: 'absolute value', definition: 'The distance from zero on the number line. Always non-negative. Symbol: |x|', lesson_key: 'absolute-value' },
  { term: 'distance', definition: 'In absolute value context: |x| represents the distance of x from 0', lesson_key: 'absolute-value' },
  { term: 'absolute value equation', definition: 'Equation involving absolute value: |x| = a has solutions x = a and x = -a (if a ≥ 0)', lesson_key: 'absolute-value' },
  { term: 'absolute value inequality', definition: 'Inequality with absolute values: |x| < a means -a < x < a; |x| > a means x < -a or x > a', lesson_key: 'absolute-value' },
  { term: 'two solutions', definition: 'Absolute value equations typically have two solutions (positive and negative)', lesson_key: 'absolute-value' }
];

const questions = [
  {
    text: 'What is the value of |−7|?',
    options: ['−7', '7', '0', '14', '−14'],
    correct_answer: 1,
    explanation: 'The absolute value of any number is its distance from zero, which is always positive. |−7| = 7'
  },
  {
    text: 'Solve: |x| = 12',
    options: ['x = 12 only', 'x = −12 only', 'x = 12 or x = −12', 'x = 0', 'No solution'],
    correct_answer: 2,
    explanation: 'Absolute value equation |x| = 12 has two solutions: x = 12 or x = −12 (both are 12 units from zero)'
  },
  {
    text: 'Solve: |x − 5| = 3',
    options: ['x = 2 or x = 8', 'x = 3 or x = 5', 'x = −2 or x = 8', 'x = 5 only', 'x = 2 only'],
    correct_answer: 0,
    explanation: 'If |x − 5| = 3, then x − 5 = 3 or x − 5 = −3. Solving: x = 8 or x = 2'
  },
  {
    text: 'Which inequality represents |x| < 5?',
    options: ['x < 5', 'x > −5', '−5 < x < 5', 'x < −5 or x > 5', 'x ≤ 5'],
    correct_answer: 2,
    explanation: '|x| < 5 means x is less than 5 units from zero, so −5 < x < 5'
  },
  {
    text: 'What values of x satisfy |2x| = 10?',
    options: ['x = 5 only', 'x = −5 only', 'x = 5 or x = −5', 'x = 10 or x = −10', 'x = 20 or x = −20'],
    correct_answer: 2,
    explanation: 'If |2x| = 10, then 2x = 10 or 2x = −10. Solving: x = 5 or x = −5'
  },
  {
    text: 'Evaluate: |6 − 10|',
    options: ['−4', '4', '16', '−16', '10'],
    correct_answer: 1,
    explanation: 'First calculate inside: 6 − 10 = −4. Then take absolute value: |−4| = 4'
  },
  {
    text: 'For what values of x is |x + 3| = 7?',
    options: ['x = 4 or x = −10', 'x = 7 or x = −7', 'x = 4 or x = 10', 'x = −4 or x = 10', 'x = 3 or x = −3'],
    correct_answer: 0,
    explanation: 'If |x + 3| = 7, then x + 3 = 7 or x + 3 = −7. Solving: x = 4 or x = −10'
  }
];

async function add() {
  const { data: lesson } = await supabase.from('lessons').select('id, title').eq('lesson_key', 'absolute-value').single();
  console.log(`✅ ${lesson.title}`);
  
  await supabase.from('term_definitions').delete().eq('lesson_key', 'absolute-value');
  await supabase.from('term_definitions').insert(definitions);
  console.log(`✓ ${definitions.length} definitions`);
  
  await supabase.from('quizzes').delete().eq('lesson_id', lesson.id);
  const { data: quiz } = await supabase.from('quizzes').insert([{
    lesson_id: lesson.id, title: 'Absolute Value Practice', intro: 'Test your understanding.',
    quiz_type: 'practice', position: 999, is_required: false
  }]).select().single();
  
  const qData = await supabase.from('quiz_questions').insert(
    questions.map((q, i) => ({ quiz_id: quiz.id, question_text: q.text, question_order: i }))
  ).select();
  
  const opts = [];
  qData.data.forEach((dbQ, i) => {
    questions[i].options.forEach((opt, j) => {
      opts.push({
        question_id: dbQ.id, option_text: opt, option_order: j,
        is_correct: j === questions[i].correct_answer,
        explanation: j === questions[i].correct_answer ? questions[i].explanation : null
      });
    });
  });
  await supabase.from('quiz_options').insert(opts);
  console.log(`✓ ${questions.length} questions\n`);
}

add();
