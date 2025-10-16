import { createClient } from '@supabase/supabase-js';
import * as dotenv from 'dotenv';
import { fileURLToPath } from 'url';
import { dirname, resolve } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
dotenv.config({ path: resolve(__dirname, '../.env') });

const supabase = createClient(process.env.REACT_APP_SUPABASE_URL, process.env.SUPABASE_SERVICE_ROLE_KEY);

const lessons = {
  'percentages': {
    title: 'Percentages',
    definitions: [
      { term: 'percent', definition: 'Parts per hundred. Symbol: %. Example: 25% = 25/100 = 0.25' },
      { term: 'converting to decimal', definition: 'Divide by 100: 45% = 45÷100 = 0.45' },
      { term: 'converting to fraction', definition: 'Put over 100 and simplify: 60% = 60/100 = 3/5' },
      { term: 'finding percent of a number', definition: 'Multiply: 20% of 80 = 0.20 × 80 = 16' },
      { term: 'percent increase', definition: 'New value is original + increase. Formula: Original × (1 + rate)' },
      { term: 'percent decrease', definition: 'New value is original - decrease. Formula: Original × (1 - rate)' },
      { term: 'finding what percent', definition: 'Part/Whole × 100%. Example: 15 is what % of 60? → 15/60 × 100% = 25%' },
      { term: 'percent change', definition: '(New - Old)/Old × 100%. Positive = increase, negative = decrease' }
    ],
    questions: [
      { text: 'What is 15% of 200?', options: ['15', '20', '30', '35', '40'], correct: 2, exp: '0.15 × 200 = 30' },
      { text: 'Convert 3/4 to a percent', options: ['34%', '43%', '70%', '75%', '80%'], correct: 3, exp: '3/4 = 0.75 = 75%' },
      { text: 'A $50 item is increased by 20%. What is the new price?', options: ['$10', '$40', '$60', '$70', '$100'], correct: 2, exp: 'New price = 50 × (1 + 0.20) = 50 × 1.20 = $60' },
      { text: '18 is what percent of 72?', options: ['4%', '18%', '25%', '40%', '72%'], correct: 2, exp: '18/72 × 100% = 0.25 × 100% = 25%' },
      { text: 'A $80 item is on sale for 25% off. What is the sale price?', options: ['$20', '$55', '$60', '$65', '$75'], correct: 2, exp: 'Sale price = 80 × (1 - 0.25) = 80 × 0.75 = $60' },
      { text: 'A value increases from 40 to 50. What is the percent increase?', options: ['10%', '20%', '25%', '50%', '80%'], correct: 2, exp: '(50-40)/40 × 100% = 10/40 × 100% = 25%' },
      { text: 'What is 0.08 as a percent?', options: ['0.08%', '0.8%', '8%', '80%', '800%'], correct: 2, exp: '0.08 × 100% = 8%' }
    ]
  },
  'ratios-proportions': {
    title: 'Ratios and Proportions',
    definitions: [
      { term: 'ratio', definition: 'Comparison of two quantities. Written as a:b or a/b. Example: 3:4 or 3/4' },
      { term: 'proportion', definition: 'An equation stating two ratios are equal. Example: a/b = c/d' },
      { term: 'cross multiplication', definition: 'If a/b = c/d, then ad = bc. Used to solve proportions.' },
      { term: 'unit rate', definition: 'A ratio with denominator of 1. Example: 60 miles/1 hour = 60 mph' },
      { term: 'scale factor', definition: 'The ratio of corresponding measurements in similar figures' },
      { term: 'part-to-part ratio', definition: 'Compares two parts. Example: boys to girls = 3:2' },
      { term: 'part-to-whole ratio', definition: 'Compares one part to total. Example: boys to all students = 3:5' },
      { term: 'direct proportion', definition: 'As one quantity increases, the other increases proportionally. y = kx' }
    ],
    questions: [
      { text: 'If 3 apples cost $2, how much do 12 apples cost?', options: ['$4', '$6', '$8', '$10', '$12'], correct: 2, exp: 'Set up proportion: 3/2 = 12/x. Cross multiply: 3x = 24, x = 8' },
      { text: 'Simplify the ratio 15:25', options: ['1:2', '2:3', '3:5', '5:3', '15:25'], correct: 2, exp: 'Divide both by GCF 5: 15÷5 = 3, 25÷5 = 5. Answer: 3:5' },
      { text: 'A recipe uses flour and sugar in ratio 4:1. If you use 12 cups of flour, how much sugar?', options: ['1 cup', '3 cups', '4 cups', '6 cups', '48 cups'], correct: 1, exp: '4/1 = 12/x. Cross multiply: 4x = 12, x = 3' },
      { text: 'If a car travels 180 miles in 3 hours, what is its unit rate (mph)?', options: ['30 mph', '40 mph', '50 mph', '60 mph', '90 mph'], correct: 3, exp: '180 miles ÷ 3 hours = 60 mph' },
      { text: 'The ratio of boys to girls is 2:3. If there are 10 boys, how many girls?', options: ['6', '10', '12', '15', '20'], correct: 3, exp: '2/3 = 10/x. Cross multiply: 2x = 30, x = 15' },
      { text: 'Two similar triangles have sides in ratio 2:5. If the smaller has perimeter 12, what is the larger perimeter?', options: ['24', '28', '30', '36', '60'], correct: 2, exp: '2/5 = 12/x. Cross multiply: 2x = 60, x = 30' },
      { text: 'Solve for x: x/6 = 10/15', options: ['2', '4', '6', '9', '25'], correct: 1, exp: 'Cross multiply: 15x = 60, x = 4' }
    ]
  },
  'unit-conversion': {
    title: 'Unit Conversion',
    definitions: [
      { term: 'unit conversion', definition: 'Changing a measurement from one unit to another. Example: feet to inches' },
      { term: 'conversion factor', definition: 'A ratio equal to 1 used to convert units. Example: 12 inches/1 foot' },
      { term: 'dimensional analysis', definition: 'Method using conversion factors to change units. Cancel units algebraically.' },
      { term: 'metric system', definition: 'System using powers of 10. Units: meter, liter, gram. Prefixes: kilo-, centi-, milli-' },
      { term: 'customary system', definition: 'US system. Length: inch, foot, yard, mile. Weight: ounce, pound, ton' },
      { term: 'area conversion', definition: 'Area units squared. Example: 1 ft² = 144 in² (12² = 144)' },
      { term: 'volume conversion', definition: 'Volume units cubed. Example: 1 ft³ = 1728 in³ (12³ = 1728)' }
    ],
    questions: [
      { text: 'Convert 5 feet to inches', options: ['12 in', '24 in', '48 in', '60 in', '72 in'], correct: 3, exp: '5 feet × 12 inches/foot = 60 inches' },
      { text: 'How many meters are in 3.5 kilometers?', options: ['35 m', '350 m', '3,500 m', '35,000 m', '350,000 m'], correct: 2, exp: '3.5 km × 1000 m/km = 3,500 m (kilo = 1000)' },
      { text: 'Convert 120 minutes to hours', options: ['1 hour', '2 hours', '3 hours', '4 hours', '7,200 hours'], correct: 1, exp: '120 min ÷ 60 min/hour = 2 hours' },
      { text: 'How many square inches are in 2 square feet?', options: ['24 in²', '144 in²', '288 in²', '576 in²', '1728 in²'], correct: 2, exp: '2 ft² × (12 in/ft)² = 2 × 144 = 288 in²' },
      { text: 'Convert 500 centimeters to meters', options: ['0.5 m', '5 m', '50 m', '5,000 m', '50,000 m'], correct: 1, exp: '500 cm ÷ 100 cm/m = 5 m (centi = 1/100)' },
      { text: 'A car travels at 60 mph for 30 minutes. How far does it travel?', options: ['15 miles', '20 miles', '30 miles', '60 miles', '90 miles'], correct: 2, exp: '30 min = 0.5 hours. Distance = 60 mph × 0.5 h = 30 miles' },
      { text: 'How many milliliters are in 2.5 liters?', options: ['0.25 mL', '25 mL', '250 mL', '2,500 mL', '25,000 mL'], correct: 3, exp: '2.5 L × 1000 mL/L = 2,500 mL (milli = 1/1000, so 1 L = 1000 mL)' }
    ]
  },
  'scientific-notation': {
    title: 'Scientific Notation',
    definitions: [
      { term: 'scientific notation', definition: 'Form: a × 10ⁿ where 1 ≤ |a| < 10 and n is an integer. Example: 3.5 × 10⁴' },
      { term: 'coefficient', definition: 'The number a in a × 10ⁿ. Must be between 1 and 10 (or -1 and -10)' },
      { term: 'exponent', definition: 'The power n in a × 10ⁿ. Positive for large numbers, negative for small numbers' },
      { term: 'converting to standard', definition: 'Move decimal n places: right if n > 0, left if n < 0. Example: 4.2×10³ = 4,200' },
      { term: 'converting to scientific', definition: 'Move decimal to get coefficient 1-10, count moves for exponent' },
      { term: 'multiplying in scientific notation', definition: 'Multiply coefficients, add exponents: (a×10ᵐ)(b×10ⁿ) = (ab)×10^(m+n)' },
      { term: 'dividing in scientific notation', definition: 'Divide coefficients, subtract exponents: (a×10ᵐ)/(b×10ⁿ) = (a/b)×10^(m-n)' }
    ],
    questions: [
      { text: 'Write 5,600 in scientific notation', options: ['5.6 × 10²', '5.6 × 10³', '56 × 10²', '0.56 × 10⁴', '5.6 × 10⁴'], correct: 1, exp: 'Move decimal 3 places left: 5.6 × 10³' },
      { text: 'Write 0.00042 in scientific notation', options: ['4.2 × 10⁻³', '4.2 × 10⁻⁴', '4.2 × 10³', '42 × 10⁻⁵', '4.2 × 10⁵'], correct: 1, exp: 'Move decimal 4 places right: 4.2 × 10⁻⁴' },
      { text: 'What is 3.2 × 10⁴ in standard form?', options: ['320', '3,200', '32,000', '320,000', '3,200,000'], correct: 2, exp: 'Move decimal 4 places right: 32,000' },
      { text: 'Multiply: (2 × 10³)(3 × 10⁴)', options: ['5 × 10⁷', '6 × 10⁷', '5 × 10¹²', '6 × 10¹²', '6 × 10⁴'], correct: 1, exp: 'Multiply coefficients: 2×3=6. Add exponents: 3+4=7. Answer: 6×10⁷' },
      { text: 'Divide: (8 × 10⁶) ÷ (2 × 10²)', options: ['4 × 10³', '4 × 10⁴', '4 × 10⁸', '16 × 10⁴', '6 × 10⁴'], correct: 1, exp: 'Divide coefficients: 8÷2=4. Subtract exponents: 6-2=4. Answer: 4×10⁴' },
      { text: 'Which is largest: 4.5×10⁵, 3.2×10⁶, 7.1×10⁴?', options: ['4.5×10⁵', '3.2×10⁶', '7.1×10⁴', 'All equal', 'Cannot determine'], correct: 1, exp: 'Compare exponents first: 10⁶ > 10⁵ > 10⁴. So 3.2×10⁶ is largest' },
      { text: 'What is 7.5 × 10⁻³ in standard form?', options: ['0.00075', '0.0075', '0.075', '750', '7,500'], correct: 1, exp: 'Move decimal 3 places left: 0.0075' }
    ]
  }
};

async function addAll() {
  console.log('📚 Batch adding 4 Number & Operations lessons...\n');

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

  console.log('🎉 Number & Operations batch complete! Now at 22/82 lessons.');
}

addAll();
