import { createClient } from '@supabase/supabase-js';
import * as dotenv from 'dotenv';
import { fileURLToPath } from 'url';
import { dirname, resolve } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
dotenv.config({ path: resolve(__dirname, '../.env') });

const supabase = createClient(process.env.REACT_APP_SUPABASE_URL, process.env.SUPABASE_SERVICE_ROLE_KEY);

const lessons = {
  'logarithms': {
    title: 'Logarithms',
    definitions: [
      { term: 'logarithm', definition: 'The inverse of exponentiation. log_b(x) = y means b^y = x' },
      { term: 'natural logarithm', definition: 'Logarithm with base e (≈2.718). Symbol: ln(x) = log_e(x)' },
      { term: 'common logarithm', definition: 'Logarithm with base 10. Symbol: log(x) = log_10(x)' },
      { term: 'log product rule', definition: 'log(xy) = log(x) + log(y)' },
      { term: 'log quotient rule', definition: 'log(x/y) = log(x) - log(y)' },
      { term: 'log power rule', definition: 'log(x^n) = n·log(x)' }
    ],
    questions: [
      { text: 'If log_2(8) = x, what is x?', options: ['2', '3', '4', '6', '16'], correct: 1, exp: '2^x = 8. Since 2^3 = 8, x = 3' },
      { text: 'Simplify: log_5(5^4)', options: ['1', '4', '5', '20', '625'], correct: 1, exp: 'Power rule: log_b(b^n) = n. So log_5(5^4) = 4' },
      { text: 'If log(x) + log(y) = log(20), what is xy?', options: ['10', '20', '40', '100', '400'], correct: 1, exp: 'Product rule: log(x) + log(y) = log(xy). So log(xy) = log(20), thus xy = 20' },
      { text: 'What is log_10(100)?', options: ['1', '2', '10', '50', '100'], correct: 1, exp: '10^x = 100. Since 10^2 = 100, x = 2' },
      { text: 'Simplify: log(x) - log(y)', options: ['log(x-y)', 'log(x/y)', 'log(xy)', 'x/y', 'x-y'], correct: 1, exp: 'Quotient rule: log(x) - log(y) = log(x/y)' },
      { text: 'If log_3(27) = x, what is x?', options: ['2', '3', '9', '27', '81'], correct: 1, exp: '3^x = 27. Since 3^3 = 27, x = 3' },
      { text: 'Simplify: 3·log(x)', options: ['log(3x)', 'log(x^3)', 'log(x+3)', '3x', 'x^3'], correct: 1, exp: 'Power rule: n·log(x) = log(x^n). So 3·log(x) = log(x^3)' }
    ]
  },
  'functions': {
    title: 'Functions',
    definitions: [
      { term: 'function', definition: 'A relation where each input has exactly one output. Notation: f(x)' },
      { term: 'domain', definition: 'All possible input values (x-values) for a function' },
      { term: 'range', definition: 'All possible output values (y-values) for a function' },
      { term: 'function notation', definition: 'f(x) represents the output when x is the input. f(3) means "evaluate f when x = 3"' },
      { term: 'composite function', definition: 'f(g(x)) means apply g first, then apply f to the result' },
      { term: 'inverse function', definition: 'f^(-1) undoes what f does. If f(a) = b, then f^(-1)(b) = a' },
      { term: 'vertical line test', definition: 'A graph is a function if any vertical line crosses it at most once' }
    ],
    questions: [
      { text: 'If f(x) = 2x + 5, what is f(3)?', options: ['8', '11', '16', '6', '23'], correct: 1, exp: 'Substitute x = 3: f(3) = 2(3) + 5 = 6 + 5 = 11' },
      { text: 'If g(x) = x^2 - 4, what is g(-2)?', options: ['-8', '-4', '0', '4', '8'], correct: 2, exp: 'g(-2) = (-2)^2 - 4 = 4 - 4 = 0' },
      { text: 'If f(x) = 3x and g(x) = x + 2, what is f(g(1))?', options: ['5', '9', '6', '11', '3'], correct: 1, exp: 'First g(1) = 1 + 2 = 3. Then f(3) = 3(3) = 9' },
      { text: 'What is the domain of f(x) = 1/(x-3)?', options: ['All real numbers', 'x ≠ 3', 'x > 3', 'x < 3', 'x ≠ 0'], correct: 1, exp: 'Cannot divide by zero. x - 3 ≠ 0, so x ≠ 3' },
      { text: 'If f(x) = x/2, what is f^(-1)(6)?', options: ['3', '12', '6', '2', '18'], correct: 1, exp: 'Inverse undoes f. If f(a) = 6, then a/2 = 6, so a = 12' },
      { text: 'If h(t) = t^2 + 1, what is h(0)?', options: ['0', '1', '2', '-1', 'undefined'], correct: 1, exp: 'h(0) = 0^2 + 1 = 0 + 1 = 1' },
      { text: 'If f(x) = 5x - 3 and f(a) = 12, what is a?', options: ['2', '3', '9', '15', '57'], correct: 1, exp: '5a - 3 = 12. Add 3: 5a = 15. Divide: a = 3' }
    ]
  },
  'quadratic-equations': {
    title: 'Quadratic Equations',
    definitions: [
      { term: 'quadratic equation', definition: 'Equation in form ax^2 + bx + c = 0 where a ≠ 0' },
      { term: 'parabola', definition: 'U-shaped graph of a quadratic function' },
      { term: 'vertex', definition: 'The highest or lowest point on a parabola' },
      { term: 'x-intercepts', definition: 'Where the parabola crosses the x-axis (solutions to equation)' },
      { term: 'quadratic formula', definition: 'x = (-b ± √(b^2-4ac)) / (2a). Solves any quadratic equation.' },
      { term: 'discriminant', definition: 'b^2 - 4ac. Determines number of solutions: >0: two, =0: one, <0: none' },
      { term: 'factoring', definition: 'Rewriting ax^2+bx+c as (px+q)(rx+s) to find solutions' },
      { term: 'completing the square', definition: 'Method to solve quadratics by creating a perfect square trinomial' }
    ],
    questions: [
      { text: 'Solve: x^2 - 9 = 0', options: ['x = 3 only', 'x = -3 only', 'x = ±3', 'x = 9', 'x = ±9'], correct: 2, exp: 'x^2 = 9, so x = ±3' },
      { text: 'Factor: x^2 + 5x + 6', options: ['(x+2)(x+3)', '(x+1)(x+6)', '(x+5)(x+1)', '(x-2)(x-3)', '(x+6)'], correct: 0, exp: 'Find two numbers that multiply to 6 and add to 5: 2 and 3. So (x+2)(x+3)' },
      { text: 'Solve: x^2 + 4x + 4 = 0', options: ['x = -2', 'x = 2', 'x = ±2', 'x = 4', 'x = -4'], correct: 0, exp: 'Factor as (x+2)^2 = 0, so x = -2 (one solution)' },
      { text: 'How many solutions does x^2 + 6x + 10 = 0 have?', options: ['0', '1', '2', '3', 'Infinite'], correct: 0, exp: 'Discriminant: 6^2 - 4(1)(10) = 36 - 40 = -4 < 0, so no real solutions' },
      { text: 'What is the vertex form of y = x^2?', options: ['y = (x-0)^2 + 0', 'y = x + 0', 'y = 0', 'y = 1', 'y = x'], correct: 0, exp: 'Vertex is at (0,0), so y = (x-0)^2 + 0' },
      { text: 'If (x-3)(x+2) = 0, what are the solutions?', options: ['x = 3, x = 2', 'x = -3, x = 2', 'x = 3, x = -2', 'x = -3, x = -2', 'x = 0'], correct: 2, exp: 'Set each factor to zero: x - 3 = 0 gives x = 3, x + 2 = 0 gives x = -2' },
      { text: 'A parabola opens downward. What is true about a in y = ax^2 + bx + c?', options: ['a > 0', 'a < 0', 'a = 0', 'a = 1', 'b < 0'], correct: 1, exp: 'If a < 0, parabola opens downward' }
    ]
  },
  'systems-equations': {
    title: 'Systems of Equations',
    definitions: [
      { term: 'system of equations', definition: 'Two or more equations with the same variables' },
      { term: 'solution', definition: 'Values that satisfy all equations simultaneously' },
      { term: 'substitution method', definition: 'Solve one equation for a variable, substitute into the other' },
      { term: 'elimination method', definition: 'Add or subtract equations to eliminate a variable' },
      { term: 'consistent system', definition: 'System with at least one solution' },
      { term: 'inconsistent system', definition: 'System with no solution (parallel lines)' },
      { term: 'dependent system', definition: 'System with infinitely many solutions (same line)' }
    ],
    questions: [
      { text: 'Solve: x + y = 7 and x - y = 3', options: ['x=5, y=2', 'x=4, y=3', 'x=3, y=4', 'x=2, y=5', 'x=7, y=0'], correct: 0, exp: 'Add equations: 2x = 10, so x = 5. Then y = 7 - 5 = 2' },
      { text: 'If 2x + y = 8 and y = 4, what is x?', options: ['1', '2', '3', '4', '6'], correct: 1, exp: 'Substitute y = 4: 2x + 4 = 8. So 2x = 4, x = 2' },
      { text: 'Solve: 3x + 2y = 12 and x = 2', options: ['y=3', 'y=2', 'y=6', 'y=4', 'y=1'], correct: 0, exp: 'Substitute x = 2: 3(2) + 2y = 12. So 6 + 2y = 12, 2y = 6, y = 3' },
      { text: 'Two lines are parallel. How many solutions does their system have?', options: ['0', '1', '2', 'Infinitely many', 'Cannot determine'], correct: 0, exp: 'Parallel lines never intersect, so no solution' },
      { text: 'Solve: x + 2y = 10 and 2x + 4y = 20', options: ['x=0, y=5', 'x=2, y=4', 'Infinitely many', 'No solution', 'x=10, y=0'], correct: 2, exp: 'Second equation is 2× the first, so same line = infinitely many solutions' },
      { text: 'If x + y = 5 and x - y = 1, what is x?', options: ['1', '2', '3', '4', '5'], correct: 2, exp: 'Add equations: 2x = 6, so x = 3' },
      { text: 'What method is best when one equation is already solved for a variable?', options: ['Graphing', 'Elimination', 'Substitution', 'Factoring', 'Quadratic formula'], correct: 2, exp: 'Substitution is easiest when one variable is already isolated' }
    ]
  }
};

async function addAll() {
  console.log('📚 Batch adding Functions lessons...\\n');
  
  for (const [key, data] of Object.entries(lessons)) {
    try {
      const { data: lesson } = await supabase.from('lessons').select('id, title').eq('lesson_key', key).single();
      console.log(`✅ ${lesson.title}`);
      
      await supabase.from('term_definitions').delete().eq('lesson_key', key);
      const defs = data.definitions.map(d => ({ ...d, lesson_key: key }));
      await supabase.from('term_definitions').insert(defs);
      console.log(`  ✓ ${defs.length} definitions`);
      
      await supabase.from('quizzes').delete().eq('lesson_id', lesson.id);
      const { data: quiz } = await supabase.from('quizzes').insert([{
        lesson_id: lesson.id, title: `${data.title} Practice`, intro: 'Test your understanding.',
        quiz_type: 'practice', position: 999, is_required: false
      }]).select().single();
      
      const qData = await supabase.from('quiz_questions').insert(
        data.questions.map((q, i) => ({ quiz_id: quiz.id, question_text: q.text, question_order: i }))
      ).select();
      
      const opts = [];
      qData.data.forEach((dbQ, i) => {
        data.questions[i].options.forEach((opt, j) => {
          opts.push({
            question_id: dbQ.id, option_text: opt, option_order: j,
            is_correct: j === data.questions[i].correct,
            explanation: j === data.questions[i].correct ? data.questions[i].exp : null
          });
        });
      });
      await supabase.from('quiz_options').insert(opts);
      console.log(`  ✓ ${data.questions.length} questions\\n`);
    } catch (e) {
      console.error(`❌ Error with ${key}:`, e.message);
    }
  }
  
  console.log('🎉 Functions batch complete! 4 more lessons done.');
}

addAll();
