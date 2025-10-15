import { createClient } from '@supabase/supabase-js';
import * as dotenv from 'dotenv';
import { fileURLToPath } from 'url';
import { dirname, resolve } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
dotenv.config({ path: resolve(__dirname, '../.env') });

const supabase = createClient(process.env.REACT_APP_SUPABASE_URL, process.env.SUPABASE_SERVICE_ROLE_KEY);

const lessons = {
  'trigonometry': {
    title: 'Trigonometry',
    definitions: [
      { term: 'trigonometry', definition: 'Study of relationships between angles and sides in triangles' },
      { term: 'sine (sin)', definition: 'In right triangle: sin(θ) = opposite/hypotenuse' },
      { term: 'cosine (cos)', definition: 'In right triangle: cos(θ) = adjacent/hypotenuse' },
      { term: 'tangent (tan)', definition: 'In right triangle: tan(θ) = opposite/adjacent = sin(θ)/cos(θ)' },
      { term: 'SOH-CAH-TOA', definition: 'Mnemonic: Sine=Opposite/Hypotenuse, Cosine=Adjacent/Hypotenuse, Tangent=Opposite/Adjacent' },
      { term: 'unit circle', definition: 'Circle with radius 1 centered at origin. Used to define trig functions for all angles.' },
      { term: 'Pythagorean identity', definition: 'sin²(θ) + cos²(θ) = 1 for all angles θ' },
      { term: 'complementary angles', definition: 'Two angles that sum to 90°. sin(θ) = cos(90°-θ)' },
      { term: 'radian', definition: 'Angle measure. π radians = 180°. Formula: radians = (π/180)×degrees' }
    ],
    questions: [
      { text: 'In a right triangle, if sin(θ) = 3/5, what is the length of the opposite side when hypotenuse = 10?', options: ['3', '6', '8', '10', '15'], correct: 1, exp: 'sin(θ) = opposite/hypotenuse. 3/5 = opp/10. So opp = 6' },
      { text: 'If cos(θ) = 4/5, what is sin(θ)? (Assume θ is acute)', options: ['1/5', '2/5', '3/5', '4/5', '1'], correct: 2, exp: 'sin²+cos² = 1. sin² = 1 - (4/5)² = 1 - 16/25 = 9/25. So sin = 3/5' },
      { text: 'What is tan(45°)?', options: ['0', '1/2', '√2/2', '1', '√3'], correct: 3, exp: 'In 45-45-90 triangle, opposite = adjacent, so tan(45°) = 1' },
      { text: 'Convert 90° to radians', options: ['π/4', 'π/3', 'π/2', 'π', '2π'], correct: 2, exp: 'radians = (π/180)×90 = 90π/180 = π/2' },
      { text: 'If tan(θ) = 2, what is sin(θ)/cos(θ)?', options: ['0', '1', '2', '1/2', 'Cannot determine'], correct: 2, exp: 'tan(θ) = sin(θ)/cos(θ), so sin(θ)/cos(θ) = 2' },
      { text: 'In a right triangle with legs 3 and 4, what is sin(θ) where θ is opposite the side of length 3?', options: ['3/4', '4/3', '3/5', '4/5', '5/3'], correct: 2, exp: 'Hypotenuse = √(3²+4²) = 5. sin(θ) = opposite/hypotenuse = 3/5' },
      { text: 'What is sin(30°)?', options: ['0', '1/2', '√2/2', '√3/2', '1'], correct: 1, exp: 'Special angle: sin(30°) = 1/2' }
    ]
  },
  'complex-numbers': {
    title: 'Complex Numbers',
    definitions: [
      { term: 'complex number', definition: 'Number in form a + bi where a, b are real and i = √(-1)' },
      { term: 'imaginary unit', definition: 'i = √(-1). Property: i² = -1' },
      { term: 'real part', definition: 'In a + bi, the real part is a' },
      { term: 'imaginary part', definition: 'In a + bi, the imaginary part is b (coefficient of i)' },
      { term: 'complex conjugate', definition: 'Conjugate of a + bi is a - bi. Multiply to eliminate i.' },
      { term: 'adding complex numbers', definition: '(a+bi) + (c+di) = (a+c) + (b+d)i. Add real parts, add imaginary parts.' },
      { term: 'multiplying complex numbers', definition: 'Use FOIL and i² = -1. (a+bi)(c+di) = (ac-bd) + (ad+bc)i' },
      { term: 'absolute value', definition: '|a + bi| = √(a² + b²). Distance from origin in complex plane.' }
    ],
    questions: [
      { text: 'What is i²?', options: ['-1', '0', '1', 'i', '-i'], correct: 0, exp: 'By definition, i² = -1' },
      { text: 'Simplify: (3 + 2i) + (1 + 4i)', options: ['4 + 6i', '4 + 2i', '3 + 6i', '2 + 6i', '4 + 8i'], correct: 0, exp: 'Add real parts: 3+1=4. Add imaginary: 2i+4i=6i. Answer: 4+6i' },
      { text: 'What is the conjugate of 5 - 3i?', options: ['5 + 3i', '-5 + 3i', '-5 - 3i', '3 - 5i', '5 - 3i'], correct: 0, exp: 'Conjugate: flip sign of imaginary part. 5 - 3i → 5 + 3i' },
      { text: 'Multiply: (2 + i)(3 - i)', options: ['5 + i', '6 - i', '7 + i', '5 + 5i', '7 - i'], correct: 2, exp: 'FOIL: 6 - 2i + 3i - i² = 6 + i - (-1) = 7 + i' },
      { text: 'What is i³?', options: ['-1', '-i', '1', 'i', '0'], correct: 1, exp: 'i³ = i² × i = (-1) × i = -i' },
      { text: 'Subtract: (7 + 5i) - (2 + 3i)', options: ['5 + 2i', '5 + 8i', '9 + 8i', '9 + 2i', '5 - 2i'], correct: 0, exp: 'Subtract real: 7-2=5. Subtract imaginary: 5i-3i=2i. Answer: 5+2i' },
      { text: 'What is |3 + 4i|?', options: ['1', '5', '7', '12', '25'], correct: 1, exp: '|3+4i| = √(3²+4²) = √(9+16) = √25 = 5' }
    ]
  },
  'vectors': {
    title: 'Vectors',
    definitions: [
      { term: 'vector', definition: 'A quantity with both magnitude (size) and direction. Written as <a, b> or ai + bj' },
      { term: 'magnitude', definition: 'Length of vector <a, b> = √(a² + b²)' },
      { term: 'direction', definition: 'The angle or orientation of the vector in space' },
      { term: 'component form', definition: 'Vector written as <x, y> where x is horizontal, y is vertical component' },
      { term: 'unit vector', definition: 'Vector with magnitude 1. i = <1,0>, j = <0,1>' },
      { term: 'adding vectors', definition: '<a,b> + <c,d> = <a+c, b+d>. Add corresponding components.' },
      { term: 'scalar multiplication', definition: 'k<a,b> = <ka, kb>. Multiply each component by scalar k.' },
      { term: 'zero vector', definition: '<0, 0>. Has magnitude 0 and no specific direction.' }
    ],
    questions: [
      { text: 'What is the magnitude of vector <3, 4>?', options: ['1', '3', '4', '5', '7'], correct: 3, exp: 'Magnitude = √(3²+4²) = √(9+16) = √25 = 5' },
      { text: 'Add vectors: <2, 5> + <3, 1>', options: ['<5, 6>', '<6, 5>', '<5, 4>', '<1, 4>', '<6, 6>'], correct: 0, exp: 'Add components: <2+3, 5+1> = <5, 6>' },
      { text: 'Multiply: 3<2, -1>', options: ['<5, 2>', '<6, -3>', '<6, 3>', '<2, -3>', '<3, -1>'], correct: 1, exp: 'Scalar multiplication: <3×2, 3×(-1)> = <6, -3>' },
      { text: 'What is the magnitude of <5, 12>?', options: ['7', '13', '17', '60', '169'], correct: 1, exp: 'Magnitude = √(5²+12²) = √(25+144) = √169 = 13' },
      { text: 'Subtract: <7, 3> - <2, 1>', options: ['<5, 2>', '<9, 4>', '<5, 4>', '<4, 2>', '<9, 2>'], correct: 0, exp: 'Subtract components: <7-2, 3-1> = <5, 2>' },
      { text: 'Which vector has magnitude 1?', options: ['<1, 1>', '<0, 1>', '<2, 0>', '<1, 2>', '<3, 4>'], correct: 1, exp: '<0,1> has magnitude √(0²+1²) = 1. It\'s a unit vector.' },
      { text: 'If v = <4, -3>, what is -v?', options: ['<-4, 3>', '<4, 3>', '<-4, -3>', '<3, -4>', '<-3, 4>'], correct: 0, exp: 'Opposite vector: -v = <-4, -(-3)> = <-4, 3>' }
    ]
  },
  'matrices': {
    title: 'Matrices',
    definitions: [
      { term: 'matrix', definition: 'Rectangular array of numbers in rows and columns. Example: [1 2; 3 4]' },
      { term: 'element', definition: 'Individual number in a matrix. Element aᵢⱼ is in row i, column j.' },
      { term: 'dimension', definition: 'Size of matrix as rows × columns. [1 2; 3 4] is 2×2.' },
      { term: 'adding matrices', definition: 'Add corresponding elements. Must have same dimensions.' },
      { term: 'scalar multiplication', definition: 'Multiply every element by the scalar.' },
      { term: 'matrix multiplication', definition: 'Row × column multiplication. (AB)ᵢⱼ = sum of (row i of A) × (column j of B)' },
      { term: 'identity matrix', definition: 'Square matrix with 1s on diagonal, 0s elsewhere. Acts like "1" for matrices.' },
      { term: 'zero matrix', definition: 'Matrix with all elements equal to 0.' }
    ],
    questions: [
      { text: 'What is [1 2; 3 4] + [5 6; 7 8]?', options: ['[6 8; 10 12]', '[5 12; 21 32]', '[6 7; 8 9]', '[1 2; 3 4]', '[5 6; 7 8]'], correct: 0, exp: 'Add elements: [1+5 2+6; 3+7 4+8] = [6 8; 10 12]' },
      { text: 'What is 3[2 1; 0 4]?', options: ['[5 4; 3 7]', '[6 3; 0 12]', '[6 1; 0 4]', '[2 3; 0 12]', '[6 4; 3 12]'], correct: 1, exp: 'Multiply each element by 3: [3×2 3×1; 3×0 3×4] = [6 3; 0 12]' },
      { text: 'What is the dimension of [1 2 3; 4 5 6]?', options: ['2×2', '2×3', '3×2', '3×3', '6×1'], correct: 1, exp: '2 rows, 3 columns = 2×3 matrix' },
      { text: 'What is the 2×2 identity matrix?', options: ['[0 0; 0 0]', '[1 1; 1 1]', '[1 0; 0 1]', '[0 1; 1 0]', '[2 0; 0 2]'], correct: 2, exp: 'Identity has 1s on diagonal: [1 0; 0 1]' },
      { text: 'Subtract: [5 3; 2 8] - [1 1; 1 3]', options: ['[4 2; 1 5]', '[6 4; 3 11]', '[4 4; 1 5]', '[4 2; 3 5]', '[5 2; 1 5]'], correct: 0, exp: 'Subtract elements: [5-1 3-1; 2-1 8-3] = [4 2; 1 5]' },
      { text: 'Can you add a 2×3 matrix to a 3×2 matrix?', options: ['Yes', 'No', 'Only if square', 'Only if identity', 'Sometimes'], correct: 1, exp: 'Matrix addition requires same dimensions. 2×3 ≠ 3×2, so no.' },
      { text: 'What is [2 0; 0 2] called?', options: ['Zero matrix', 'Identity matrix', 'Scalar matrix', 'Diagonal matrix', 'Both C and D'], correct: 4, exp: 'Diagonal (non-zero only on diagonal) and scalar (diagonal all equal)' }
    ]
  }
};

async function addAll() {
  console.log('📚 Batch adding 4 advanced Math lessons...\n');

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
      console.log(`  ✓ ${data.questions.length} questions\n`);
    } catch (e) {
      console.error(`❌ Error with ${key}:`, e.message);
    }
  }

  console.log('🎉 Advanced Math batch complete! Now at 30/82 lessons.');
}

addAll();
