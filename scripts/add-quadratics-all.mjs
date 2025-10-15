/**
 * Add Definitions and Quiz for Quadratic Equations Lesson
 * Fixed: Using correct lesson key 'quadratics'
 */

import { createClient } from '@supabase/supabase-js';
import * as dotenv from 'dotenv';
import { fileURLToPath } from 'url';
import { dirname, resolve } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
dotenv.config({ path: resolve(__dirname, '../.env') });

const supabase = createClient(process.env.REACT_APP_SUPABASE_URL, process.env.SUPABASE_SERVICE_ROLE_KEY);

const definitions = [
  { term: 'quadratic equation', definition: 'Equation in form ax² + bx + c = 0 where a ≠ 0', lesson_key: 'quadratics' },
  { term: 'parabola', definition: 'U-shaped graph of a quadratic function', lesson_key: 'quadratics' },
  { term: 'vertex', definition: 'The highest or lowest point on a parabola', lesson_key: 'quadratics' },
  { term: 'x-intercepts', definition: 'Where the parabola crosses the x-axis (solutions to equation)', lesson_key: 'quadratics' },
  { term: 'quadratic formula', definition: 'x = (-b ± √(b²-4ac)) / (2a). Solves any quadratic equation.', lesson_key: 'quadratics' },
  { term: 'discriminant', definition: 'b² - 4ac. Determines number of solutions: >0: two, =0: one, <0: none', lesson_key: 'quadratics' },
  { term: 'factoring', definition: 'Rewriting ax²+bx+c as (px+q)(rx+s) to find solutions', lesson_key: 'quadratics' },
  { term: 'completing the square', definition: 'Method to solve quadratics by creating a perfect square trinomial', lesson_key: 'quadratics' }
];

const questions = [
  { text: 'Solve: x² - 9 = 0', options: ['x = 3 only', 'x = -3 only', 'x = ±3', 'x = 9', 'x = ±9'], correct: 2, exp: 'x² = 9, so x = ±3' },
  { text: 'Factor: x² + 5x + 6', options: ['(x+2)(x+3)', '(x+1)(x+6)', '(x+5)(x+1)', '(x-2)(x-3)', '(x+6)'], correct: 0, exp: 'Find two numbers that multiply to 6 and add to 5: 2 and 3. So (x+2)(x+3)' },
  { text: 'Solve: x² + 4x + 4 = 0', options: ['x = -2', 'x = 2', 'x = ±2', 'x = 4', 'x = -4'], correct: 0, exp: 'Factor as (x+2)² = 0, so x = -2 (one solution)' },
  { text: 'How many solutions does x² + 6x + 10 = 0 have?', options: ['0', '1', '2', '3', 'Infinite'], correct: 0, exp: 'Discriminant: 6² - 4(1)(10) = 36 - 40 = -4 < 0, so no real solutions' },
  { text: 'What is the vertex form of y = x²?', options: ['y = (x-0)² + 0', 'y = x + 0', 'y = 0', 'y = 1', 'y = x'], correct: 0, exp: 'Vertex is at (0,0), so y = (x-0)² + 0' },
  { text: 'If (x-3)(x+2) = 0, what are the solutions?', options: ['x = 3, x = 2', 'x = -3, x = 2', 'x = 3, x = -2', 'x = -3, x = -2', 'x = 0'], correct: 2, exp: 'Set each factor to zero: x - 3 = 0 gives x = 3, x + 2 = 0 gives x = -2' },
  { text: 'A parabola opens downward. What is true about a in y = ax² + bx + c?', options: ['a > 0', 'a < 0', 'a = 0', 'a = 1', 'b < 0'], correct: 1, exp: 'If a < 0, parabola opens downward' }
];

async function add() {
  console.log('📚 Adding Quadratic Equations (FIXED)...\n');

  const { data: lesson } = await supabase.from('lessons').select('id, title').eq('lesson_key', 'quadratics').single();
  console.log(`✅ ${lesson.title}`);

  await supabase.from('term_definitions').delete().eq('lesson_key', 'quadratics');
  await supabase.from('term_definitions').insert(definitions);
  console.log(`  ✓ ${definitions.length} definitions`);

  await supabase.from('quizzes').delete().eq('lesson_id', lesson.id);
  const { data: quiz } = await supabase.from('quizzes').insert([{
    lesson_id: lesson.id, title: 'Quadratic Equations Practice', intro: 'Test your understanding.',
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
        is_correct: j === questions[i].correct,
        explanation: j === questions[i].correct ? questions[i].exp : null
      });
    });
  });
  await supabase.from('quiz_options').insert(opts);
  console.log(`  ✓ ${questions.length} questions\n`);
  console.log('✅ Quadratics complete! Now at 14/82 lessons.');
}

add();
