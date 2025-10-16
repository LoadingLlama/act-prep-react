import { createClient } from '@supabase/supabase-js';
import * as dotenv from 'dotenv';
import { fileURLToPath } from 'url';
import { dirname, resolve } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
dotenv.config({ path: resolve(__dirname, '../.env') });

const supabase = createClient(process.env.REACT_APP_SUPABASE_URL, process.env.SUPABASE_SERVICE_ROLE_KEY);

const lessons = {
  'exponents-roots': {
    title: 'Exponents and Roots',
    definitions: [
      { term: 'exponent', definition: 'The power to which a number is raised. In x^n, n is the exponent.' },
      { term: 'base', definition: 'The number being raised to a power. In x^n, x is the base.' },
      { term: 'power rule', definition: '(x^a)^b = x^(ab). Multiply exponents when raising a power to a power.' },
      { term: 'product rule', definition: 'x^a × x^b = x^(a+b). Add exponents when multiplying same bases.' },
      { term: 'quotient rule', definition: 'x^a ÷ x^b = x^(a-b). Subtract exponents when dividing same bases.' },
      { term: 'negative exponent', definition: 'x^(-n) = 1/x^n. Negative exponent means reciprocal.' },
      { term: 'zero exponent', definition: 'x^0 = 1 for any x ≠ 0' },
      { term: 'square root', definition: '√x is the number that when squared gives x. √x = x^(1/2)' },
      { term: 'cube root', definition: '∛x is the number that when cubed gives x. ∛x = x^(1/3)' },
      { term: 'radical', definition: 'An expression with a root symbol (√, ∛, etc.)' },
      { term: 'simplifying radicals', definition: 'Breaking down radicals: √(ab) = √a × √b' }
    ],
    questions: [
      { text: 'Simplify: 2^3 × 2^4', options: ['2^7', '2^12', '4^7', '8^4', '2^1'], correct: 0, exp: 'Product rule: x^a × x^b = x^(a+b). So 2^3 × 2^4 = 2^(3+4) = 2^7' },
      { text: 'Simplify: (3^2)^4', options: ['3^6', '3^8', '9^4', '3^16', '81'], correct: 1, exp: 'Power rule: (x^a)^b = x^(ab). So (3^2)^4 = 3^(2×4) = 3^8' },
      { text: 'What is 5^(-2)?', options: ['-25', '-10', '1/10', '1/25', '25'], correct: 3, exp: 'Negative exponent: x^(-n) = 1/x^n. So 5^(-2) = 1/5^2 = 1/25' },
      { text: 'Simplify: x^6 ÷ x^2', options: ['x^3', 'x^4', 'x^8', 'x^12', 'x^2'], correct: 1, exp: 'Quotient rule: x^a ÷ x^b = x^(a-b). So x^6 ÷ x^2 = x^(6-2) = x^4' },
      { text: 'What is √64?', options: ['4', '6', '8', '16', '32'], correct: 2, exp: '√64 = 8 because 8 × 8 = 64' },
      { text: 'Simplify: √(16 × 9)', options: ['12', '25', '√144', '144', '5'], correct: 0, exp: '√(ab) = √a × √b. So √(16×9) = √16 × √9 = 4 × 3 = 12' },
      { text: 'What is ∛27?', options: ['3', '9', '13.5', '27', '81'], correct: 0, exp: '∛27 = 3 because 3 × 3 × 3 = 27' }
    ]
  },
  'algebra-skills': {
    title: 'Algebra Skills',
    definitions: [
      { term: 'variable', definition: 'A letter (like x, y) that represents an unknown number' },
      { term: 'coefficient', definition: 'The number multiplying a variable. In 5x, 5 is the coefficient.' },
      { term: 'constant', definition: 'A number without a variable. In 3x + 7, 7 is a constant.' },
      { term: 'term', definition: 'A part of an expression separated by + or -. In 3x + 2y - 5, there are 3 terms.' },
      { term: 'like terms', definition: 'Terms with the same variable and exponent. 3x and 5x are like terms.' },
      { term: 'combining like terms', definition: 'Adding or subtracting coefficients of like terms: 3x + 5x = 8x' },
      { term: 'distributive property', definition: 'a(b + c) = ab + ac. Multiply the term outside by each term inside.' },
      { term: 'factoring', definition: 'Rewriting an expression as a product: 6x + 9 = 3(2x + 3)' },
      { term: 'solving for a variable', definition: 'Isolating the variable on one side of the equation' },
      { term: 'substitution', definition: 'Replacing a variable with a specific value' }
    ],
    questions: [
      { text: 'Simplify: 5x + 3x - 2x', options: ['6x', '8x', '10x', '4x', 'x'], correct: 0, exp: 'Combine like terms: 5x + 3x - 2x = (5+3-2)x = 6x' },
      { text: 'Expand: 3(2x + 5)', options: ['5x + 8', '6x + 5', '6x + 15', '2x + 15', '3x + 5'], correct: 2, exp: 'Distributive property: 3(2x + 5) = 3×2x + 3×5 = 6x + 15' },
      { text: 'Solve for x: 2x + 7 = 19', options: ['x = 6', 'x = 13', 'x = 26', 'x = 12', 'x = 9.5'], correct: 0, exp: 'Subtract 7: 2x = 12. Divide by 2: x = 6' },
      { text: 'Factor: 12x + 18', options: ['2(6x + 9)', '3(4x + 6)', '6(2x + 3)', '12(x + 18)', '(12x)(18)'], correct: 2, exp: 'GCF is 6: 12x + 18 = 6(2x + 3)' },
      { text: 'If x = 4, what is 3x - 5?', options: ['7', '12', '17', '2', '11'], correct: 0, exp: 'Substitute x = 4: 3(4) - 5 = 12 - 5 = 7' },
      { text: 'Simplify: 2(x + 3) + 4(x - 1)', options: ['6x + 2', '6x + 10', '6x - 2', '2x + 2', '6x'], correct: 0, exp: '2(x+3) + 4(x-1) = 2x+6 + 4x-4 = 6x + 2' },
      { text: 'Solve: 5x - 3 = 2x + 9', options: ['x = 2', 'x = 3', 'x = 4', 'x = 6', 'x = 12'], correct: 2, exp: 'Subtract 2x: 3x - 3 = 9. Add 3: 3x = 12. Divide: x = 4' }
    ]
  },
  'inequalities': {
    title: 'Inequalities',
    definitions: [
      { term: 'inequality', definition: 'A mathematical statement comparing two expressions using <, >, ≤, or ≥' },
      { term: 'less than', definition: 'Symbol: <. Means the left side is smaller than the right side.' },
      { term: 'greater than', definition: 'Symbol: >. Means the left side is larger than the right side.' },
      { term: 'less than or equal to', definition: 'Symbol: ≤. Includes the boundary value.' },
      { term: 'greater than or equal to', definition: 'Symbol: ≥. Includes the boundary value.' },
      { term: 'flip the inequality', definition: 'When multiplying or dividing by a negative number, reverse the inequality sign.' },
      { term: 'compound inequality', definition: 'Two inequalities combined: -3 < x < 5 means x > -3 AND x < 5' },
      { term: 'solution set', definition: 'All values that make the inequality true' }
    ],
    questions: [
      { text: 'Solve: x + 5 > 12', options: ['x > 7', 'x > 17', 'x < 7', 'x > 60', 'x < 17'], correct: 0, exp: 'Subtract 5 from both sides: x > 12 - 5, so x > 7' },
      { text: 'Solve: 3x ≤ 15', options: ['x ≤ 5', 'x ≤ 18', 'x ≥ 5', 'x < 5', 'x ≤ 12'], correct: 0, exp: 'Divide both sides by 3: x ≤ 15÷3, so x ≤ 5' },
      { text: 'Solve: -2x > 8', options: ['x > -4', 'x < -4', 'x > 4', 'x < 4', 'x > -16'], correct: 1, exp: 'Divide by -2 and FLIP the inequality: x < 8÷(-2), so x < -4' },
      { text: 'Which value satisfies x - 3 < 7?', options: ['10', '11', '9', '12', '15'], correct: 2, exp: 'Solve: x < 10. Only 9 is less than 10.' },
      { text: 'Solve: 2x + 3 ≥ 11', options: ['x ≥ 4', 'x ≥ 7', 'x ≥ 14', 'x ≤ 4', 'x > 4'], correct: 0, exp: 'Subtract 3: 2x ≥ 8. Divide by 2: x ≥ 4' },
      { text: 'What does -1 < x ≤ 5 mean?', options: ['x > -1 and x < 5', 'x > -1 and x ≤ 5', 'x ≥ -1 and x ≤ 5', 'x < -1 or x ≤ 5', 'x = 5'], correct: 1, exp: 'Compound inequality: x is greater than -1 (not equal) AND less than or equal to 5' },
      { text: 'Solve: -x ≤ 6', options: ['x ≥ -6', 'x ≤ -6', 'x ≥ 6', 'x ≤ 6', 'x > -6'], correct: 0, exp: 'Divide by -1 and flip: x ≥ -6' }
    ]
  },
  'fractions': {
    title: 'Fractions',
    definitions: [
      { term: 'numerator', definition: 'The top number in a fraction' },
      { term: 'denominator', definition: 'The bottom number in a fraction' },
      { term: 'simplifying fractions', definition: 'Dividing numerator and denominator by their GCF: 6/8 = 3/4' },
      { term: 'adding fractions', definition: 'Find common denominator, then add numerators: 1/4 + 1/6 = 3/12 + 2/12 = 5/12' },
      { term: 'multiplying fractions', definition: 'Multiply numerators, multiply denominators: (a/b)(c/d) = ac/bd' },
      { term: 'dividing fractions', definition: 'Multiply by the reciprocal: (a/b)÷(c/d) = (a/b)(d/c)' },
      { term: 'reciprocal', definition: 'Flip the fraction: reciprocal of 3/4 is 4/3' },
      { term: 'mixed number', definition: 'Whole number + fraction: 2 1/2 = 5/2' },
      { term: 'improper fraction', definition: 'Numerator ≥ denominator: 7/4' }
    ],
    questions: [
      { text: 'Simplify: 12/16', options: ['3/4', '6/8', '4/3', '2/3', '1/2'], correct: 0, exp: 'Divide both by GCF 4: 12÷4 = 3, 16÷4 = 4, so 3/4' },
      { text: 'Calculate: 2/3 + 1/6', options: ['3/9', '5/6', '1/2', '4/6', '2/9'], correct: 1, exp: 'Common denominator 6: 2/3 = 4/6. So 4/6 + 1/6 = 5/6' },
      { text: 'Calculate: 3/5 × 2/7', options: ['5/12', '6/35', '6/12', '5/35', '1/2'], correct: 1, exp: 'Multiply numerators and denominators: (3×2)/(5×7) = 6/35' },
      { text: 'Calculate: 2/3 ÷ 4/5', options: ['8/15', '10/12', '5/6', '6/5', '2/3'], correct: 2, exp: 'Multiply by reciprocal: (2/3) × (5/4) = 10/12 = 5/6' },
      { text: 'What is 3 1/2 as an improper fraction?', options: ['3/2', '4/2', '7/2', '6/2', '5/2'], correct: 2, exp: '3 1/2 = (3×2 + 1)/2 = 7/2' },
      { text: 'Calculate: 5/8 - 1/4', options: ['4/4', '1/2', '3/8', '1/4', '2/8'], correct: 2, exp: 'Common denominator 8: 1/4 = 2/8. So 5/8 - 2/8 = 3/8' },
      { text: 'What is the reciprocal of 5/3?', options: ['3/5', '5/3', '-5/3', '15', '1'], correct: 0, exp: 'Flip the fraction: reciprocal of 5/3 is 3/5' }
    ]
  }
};

async function addAll() {
  console.log('📚 Batch adding 4 algebra lessons...\\n');
  
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
  
  console.log('🎉 Batch complete!');
}

addAll();
