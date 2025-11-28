const { createClient } = require('@supabase/supabase-js');

const SUPABASE_URL = 'https://rabavobdklnwvwsldbix.supabase.co';
const SERVICE_ROLE_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InJhYmF2b2Jka2xud3Z3c2xkYml4Iiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc1OTc2NTQ3OCwiZXhwIjoyMDc1MzQxNDc4fQ.81SeH703keXgF3IevQlRS7OYmn1J2GUVIkn3OJiviM4';

const supabase = createClient(SUPABASE_URL, SERVICE_ROLE_KEY);
const LESSON_ID = 'b8c03bf0-99df-460d-be21-0015eebe7920';

const questions = [
  // EASY 1-17
  {pos: 1, diff: 'easy', text: 'What is 2^3?', choices: [{letter:'A',text:'6'},{letter:'B',text:'8'},{letter:'C',text:'9'},{letter:'D',text:'5'}], ans: 'B', sol: '**Multiply 2 by itself 3 times.**\n```\n2^3 = 2 × 2 × 2 = 8\n```'},
  {pos: 2, diff: 'easy', text: 'What is √(25)?', choices: [{letter:'A',text:'5'},{letter:'B',text:'12.5'},{letter:'C',text:'25'},{letter:'D',text:'50'}], ans: 'A', sol: '**Find the number that when squared equals 25.**\n```\n√(25) = 5\nBecause 5 × 5 = 25\n```'},
  {pos: 3, diff: 'easy', text: 'Simplify: x^2 × x^3', choices: [{letter:'A',text:'x^5'},{letter:'B',text:'x^6'},{letter:'C',text:'x^23'},{letter:'D',text:'2x^5'}], ans: 'A', sol: '**Add the exponents when multiplying powers with the same base.**\n```\nx^2 × x^3 = x^(2+3) = x^5\n```'},
  {pos: 4, diff: 'easy', text: 'What is 5^2?', choices: [{letter:'A',text:'10'},{letter:'B',text:'25'},{letter:'C',text:'7'},{letter:'D',text:'15'}], ans: 'B', sol: '**Multiply 5 by itself 2 times.**\n```\n5^2 = 5 × 5 = 25\n```'},
  {pos: 5, diff: 'easy', text: 'What is √(16)?', choices: [{letter:'A',text:'8'},{letter:'B',text:'256'},{letter:'C',text:'4'},{letter:'D',text:'2'}], ans: 'C', sol: '**Find the number that when squared equals 16.**\n```\n√(16) = 4\nBecause 4 × 4 = 16\n```'},
  {pos: 6, diff: 'easy', text: 'Simplify: x^5 ÷ x^2', choices: [{letter:'A',text:'x^3'},{letter:'B',text:'x^7'},{letter:'C',text:'x^10'},{letter:'D',text:'x^2.5'}], ans: 'A', sol: '**Subtract the exponents when dividing powers with the same base.**\n```\nx^5 ÷ x^2 = x^(5-2) = x^3\n```'},
  {pos: 7, diff: 'easy', text: 'What is 3^4?', choices: [{letter:'A',text:'12'},{letter:'B',text:'64'},{letter:'C',text:'81'},{letter:'D',text:'27'}], ans: 'C', sol: '**Multiply 3 by itself 4 times.**\n```\n3^4 = 3 × 3 × 3 × 3 = 81\n```'},
  {pos: 8, diff: 'easy', text: 'What is √(100)?', choices: [{letter:'A',text:'50'},{letter:'B',text:'10'},{letter:'C',text:'20'},{letter:'D',text:'1000'}], ans: 'B', sol: '**Find the number that when squared equals 100.**\n```\n√(100) = 10\nBecause 10 × 10 = 100\n```'},
  {pos: 9, diff: 'easy', text: 'Simplify: (x^3)^2', choices: [{letter:'A',text:'x^5'},{letter:'B',text:'x^6'},{letter:'C',text:'x^9'},{letter:'D',text:'2x^3'}], ans: 'B', sol: '**Multiply the exponents when raising a power to a power.**\n```\n(x^3)^2 = x^(3×2) = x^6\n```'},
  {pos: 10, diff: 'easy', text: 'What is 4^3?', choices: [{letter:'A',text:'12'},{letter:'B',text:'16'},{letter:'C',text:'64'},{letter:'D',text:'81'}], ans: 'C', sol: '**Multiply 4 by itself 3 times.**\n```\n4^3 = 4 × 4 × 4 = 64\n```'},
  {pos: 11, diff: 'easy', text: 'What is √(49)?', choices: [{letter:'A',text:'7'},{letter:'B',text:'24.5'},{letter:'C',text:'14'},{letter:'D',text:'98'}], ans: 'A', sol: '**Find the number that when squared equals 49.**\n```\n√(49) = 7\nBecause 7 × 7 = 49\n```'},
  {pos: 12, diff: 'easy', text: 'Simplify: a^4 × a^5', choices: [{letter:'A',text:'a^9'},{letter:'B',text:'a^20'},{letter:'C',text:'a^1'},{letter:'D',text:'2a^9'}], ans: 'A', sol: '**Add the exponents when multiplying powers with the same base.**\n```\na^4 × a^5 = a^(4+5) = a^9\n```'},
  {pos: 13, diff: 'easy', text: 'What is 10^2?', choices: [{letter:'A',text:'20'},{letter:'B',text:'100'},{letter:'C',text:'12'},{letter:'D',text:'1000'}], ans: 'B', sol: '**Multiply 10 by itself 2 times.**\n```\n10^2 = 10 × 10 = 100\n```'},
  {pos: 14, diff: 'easy', text: 'What is √(64)?', choices: [{letter:'A',text:'8'},{letter:'B',text:'32'},{letter:'C',text:'16'},{letter:'D',text:'128'}], ans: 'A', sol: '**Find the number that when squared equals 64.**\n```\n√(64) = 8\nBecause 8 × 8 = 64\n```'},
  {pos: 15, diff: 'easy', text: 'Simplify: y^7 ÷ y^4', choices: [{letter:'A',text:'y^3'},{letter:'B',text:'y^11'},{letter:'C',text:'y^28'},{letter:'D',text:'y^1.75'}], ans: 'A', sol: '**Subtract the exponents when dividing powers with the same base.**\n```\ny^7 ÷ y^4 = y^(7-4) = y^3\n```'},
  {pos: 16, diff: 'easy', text: 'What is 2^5?', choices: [{letter:'A',text:'10'},{letter:'B',text:'25'},{letter:'C',text:'32'},{letter:'D',text:'16'}], ans: 'C', sol: '**Multiply 2 by itself 5 times.**\n```\n2^5 = 2 × 2 × 2 × 2 × 2 = 32\n```'},
  {pos: 17, diff: 'easy', text: 'What is √(81)?', choices: [{letter:'A',text:'9'},{letter:'B',text:'40.5'},{letter:'C',text:'18'},{letter:'D',text:'162'}], ans: 'A', sol: '**Find the number that when squared equals 81.**\n```\n√(81) = 9\nBecause 9 × 9 = 81\n```'},

  // MEDIUM 18-34
  {pos: 18, diff: 'medium', text: 'Simplify: x^3 × x^4 ÷ x^2', choices: [{letter:'A',text:'x^5'},{letter:'B',text:'x^9'},{letter:'C',text:'x^24'},{letter:'D',text:'x^7'}], ans: 'A', sol: '**Add exponents for multiplication, subtract for division.**\n```\nx^3 × x^4 ÷ x^2 = x^(3+4-2) = x^5\n```'},
  {pos: 19, diff: 'medium', text: 'What is 3^(-2)?', choices: [{letter:'A',text:'-9'},{letter:'B',text:'1/9'},{letter:'C',text:'-6'},{letter:'D',text:'9'}], ans: 'B', sol: '**A negative exponent means take the reciprocal.**\n```\n3^(-2) = 1/(3^2) = 1/9\n```'},
  {pos: 20, diff: 'medium', text: 'Simplify: √(50)', choices: [{letter:'A',text:'5√(2)'},{letter:'B',text:'25'},{letter:'C',text:'2√(5)'},{letter:'D',text:'√(50)'}], ans: 'A', sol: '**Factor out perfect squares.**\n```\n√(50) = √(25 × 2) = √(25) × √(2) = 5√(2)\n```'},
  {pos: 21, diff: 'medium', text: 'What is 16^(1/2)?', choices: [{letter:'A',text:'8'},{letter:'B',text:'4'},{letter:'C',text:'2'},{letter:'D',text:'16'}], ans: 'B', sol: '**A fractional exponent of 1/2 means square root.**\n```\n16^(1/2) = √(16) = 4\n```'},
  {pos: 22, diff: 'medium', text: 'Simplify: (2x^3)^3', choices: [{letter:'A',text:'8x^9'},{letter:'B',text:'6x^9'},{letter:'C',text:'2x^9'},{letter:'D',text:'8x^6'}], ans: 'A', sol: '**Raise both the coefficient and the variable to the power.**\n```\n(2x^3)^3 = 2^3 × (x^3)^3 = 8x^9\n```'},
  {pos: 23, diff: 'medium', text: 'What is 5^(-1)?', choices: [{letter:'A',text:'-5'},{letter:'B',text:'1/5'},{letter:'C',text:'5'},{letter:'D',text:'0'}], ans: 'B', sol: '**A negative exponent means take the reciprocal.**\n```\n5^(-1) = 1/5\n```'},
  {pos: 24, diff: 'medium', text: 'Simplify: √(72)', choices: [{letter:'A',text:'6√(2)'},{letter:'B',text:'36'},{letter:'C',text:'2√(6)'},{letter:'D',text:'8√(2)'}], ans: 'A', sol: '**Factor out perfect squares.**\n```\n√(72) = √(36 × 2) = √(36) × √(2) = 6√(2)\n```'},
  {pos: 25, diff: 'medium', text: 'What is 27^(1/3)?', choices: [{letter:'A',text:'9'},{letter:'B',text:'3'},{letter:'C',text:'27'},{letter:'D',text:'81'}], ans: 'B', sol: '**A fractional exponent of 1/3 means cube root.**\n```\n27^(1/3) = ∛(27) = 3\nBecause 3^3 = 27\n```'},
  {pos: 26, diff: 'medium', text: 'Simplify: (3a^2b^3)^2', choices: [{letter:'A',text:'9a^4b^6'},{letter:'B',text:'6a^4b^6'},{letter:'C',text:'9a^4b^5'},{letter:'D',text:'3a^4b^6'}], ans: 'A', sol: '**Raise each factor to the power.**\n```\n(3a^2b^3)^2 = 3^2 × (a^2)^2 × (b^3)^2 = 9a^4b^6\n```'},
  {pos: 27, diff: 'medium', text: 'What is 4^(-3)?', choices: [{letter:'A',text:'-64'},{letter:'B',text:'1/64'},{letter:'C',text:'-12'},{letter:'D',text:'64'}], ans: 'B', sol: '**A negative exponent means take the reciprocal.**\n```\n4^(-3) = 1/(4^3) = 1/64\n```'},
  {pos: 28, diff: 'medium', text: 'Simplify: √(98)', choices: [{letter:'A',text:'7√(2)'},{letter:'B',text:'49'},{letter:'C',text:'2√(7)'},{letter:'D',text:'14'}], ans: 'A', sol: '**Factor out perfect squares.**\n```\n√(98) = √(49 × 2) = √(49) × √(2) = 7√(2)\n```'},
  {pos: 29, diff: 'medium', text: 'What is 8^(1/3)?', choices: [{letter:'A',text:'2'},{letter:'B',text:'4'},{letter:'C',text:'8/3'},{letter:'D',text:'3'}], ans: 'A', sol: '**A fractional exponent of 1/3 means cube root.**\n```\n8^(1/3) = ∛(8) = 2\nBecause 2^3 = 8\n```'},
  {pos: 30, diff: 'medium', text: 'Simplify: x^6 × x^(-2)', choices: [{letter:'A',text:'x^4'},{letter:'B',text:'x^8'},{letter:'C',text:'x^(-12)'},{letter:'D',text:'x^3'}], ans: 'A', sol: '**Add the exponents (including negative ones).**\n```\nx^6 × x^(-2) = x^(6+(-2)) = x^4\n```'},
  {pos: 31, diff: 'medium', text: 'What is (1/2)^(-3)?', choices: [{letter:'A',text:'-1/8'},{letter:'B',text:'8'},{letter:'C',text:'1/8'},{letter:'D',text:'-8'}], ans: 'B', sol: '**Negative exponent means flip the fraction, then apply the power.**\n```\n(1/2)^(-3) = (2/1)^3 = 2^3 = 8\n```'},
  {pos: 32, diff: 'medium', text: 'Simplify: √(18) × √(2)', choices: [{letter:'A',text:'6'},{letter:'B',text:'√(36)'},{letter:'C',text:'3√(4)'},{letter:'D',text:'2√(9)'}], ans: 'A', sol: '**Multiply under the same radical, then simplify.**\n```\n√(18) × √(2) = √(18 × 2) = √(36) = 6\n```'},
  {pos: 33, diff: 'medium', text: 'What is 125^(1/3)?', choices: [{letter:'A',text:'5'},{letter:'B',text:'25'},{letter:'C',text:'15'},{letter:'D',text:'41.67'}], ans: 'A', sol: '**A fractional exponent of 1/3 means cube root.**\n```\n125^(1/3) = ∛(125) = 5\nBecause 5^3 = 125\n```'},
  {pos: 34, diff: 'medium', text: 'Simplify: (x^4)^(1/2)', choices: [{letter:'A',text:'x^2'},{letter:'B',text:'x^4'},{letter:'C',text:'x^8'},{letter:'D',text:'x^(4.5)'}], ans: 'A', sol: '**Multiply the exponents.**\n```\n(x^4)^(1/2) = x^(4 × 1/2) = x^2\n```'},

  // HARD 35-50
  {pos: 35, diff: 'hard', text: 'Simplify: (2x^3y^2)^3 ÷ (4x^2y)^2', choices: [{letter:'A',text:'(x^5y^4)/2'},{letter:'B',text:'2x^5y^4'},{letter:'C',text:'x^5y^4'},{letter:'D',text:'(x^5y^4)/4'}], ans: 'A', sol: '**Expand both expressions.**\n```\n(2x^3y^2)^3 = 8x^9y^6\n(4x^2y)^2 = 16x^4y^2\n```\n\n**Divide.**\n```\n8x^9y^6 ÷ 16x^4y^2 = (8/16) × x^(9-4) × y^(6-2)\n= (1/2) × x^5 × y^4\n= x^5y^4/2\n```'},
  {pos: 36, diff: 'hard', text: 'Rationalize: 1/√(3)', choices: [{letter:'A',text:'√(3)/3'},{letter:'B',text:'1/3'},{letter:'C',text:'√(3)'},{letter:'D',text:'3/√(3)'}], ans: 'A', sol: '**Multiply numerator and denominator by √(3).**\n```\n1/√(3) × √(3)/√(3) = √(3)/3\n```'},
  {pos: 37, diff: 'hard', text: 'What is 16^(3/4)?', choices: [{letter:'A',text:'8'},{letter:'B',text:'12'},{letter:'C',text:'64'},{letter:'D',text:'4'}], ans: 'A', sol: '**Rewrite as (16^(1/4))^3.**\n```\n16^(1/4) = ⁴√(16) = 2\n2^3 = 8\n```'},
  {pos: 38, diff: 'hard', text: 'Simplify: √(12) + √(27)', choices: [{letter:'A',text:'√(39)'},{letter:'B',text:'5√(3)'},{letter:'C',text:'3√(3)'},{letter:'D',text:'√(12) + √(27)'}], ans: 'B', sol: '**Simplify each radical first.**\n```\n√(12) = √(4 × 3) = 2√(3)\n√(27) = √(9 × 3) = 3√(3)\n```\n\n**Add like radicals.**\n```\n2√(3) + 3√(3) = 5√(3)\n```'},
  {pos: 39, diff: 'hard', text: 'Simplify: (x^(-2)y^3)^(-2)', choices: [{letter:'A',text:'x^4/y^6'},{letter:'B',text:'x^4y^6'},{letter:'C',text:'x^(-4)y^(-6)'},{letter:'D',text:'y^6/x^4'}], ans: 'A', sol: '**Multiply each exponent by -2.**\n```\n(x^(-2)y^3)^(-2) = x^((-2)×(-2)) × y^(3×(-2))\n= x^4 × y^(-6)\n= x^4/y^6\n```'},
  {pos: 40, diff: 'hard', text: 'Rationalize: 2/√(5)', choices: [{letter:'A',text:'2√(5)/5'},{letter:'B',text:'2/5'},{letter:'C',text:'√(5)/2'},{letter:'D',text:'2√(5)'}], ans: 'A', sol: '**Multiply numerator and denominator by √(5).**\n```\n2/√(5) × √(5)/√(5) = 2√(5)/5\n```'},
  {pos: 41, diff: 'hard', text: 'What is 32^(2/5)?', choices: [{letter:'A',text:'4'},{letter:'B',text:'8'},{letter:'C',text:'16'},{letter:'D',text:'2'}], ans: 'A', sol: '**Rewrite as (32^(1/5))^2.**\n```\n32^(1/5) = ⁵√(32) = 2\n2^2 = 4\n```'},
  {pos: 42, diff: 'hard', text: 'Simplify: √(20) - √(5)', choices: [{letter:'A',text:'√(15)'},{letter:'B',text:'√(5)'},{letter:'C',text:'3√(5)'},{letter:'D',text:'2√(5)'}], ans: 'B', sol: '**Simplify √(20) first.**\n```\n√(20) = √(4 × 5) = 2√(5)\n```\n\n**Subtract like radicals.**\n```\n2√(5) - √(5) = √(5)\n```'},
  {pos: 43, diff: 'hard', text: 'Simplify: (a^10b^(-5)) ÷ (a^3b^3)', choices: [{letter:'A',text:'b^8/a^7'},{letter:'B',text:'a^7b^8'},{letter:'C',text:'a^7/b^8'},{letter:'D',text:'a^(-7)b^8'}], ans: 'C', sol: '**Subtract exponents when dividing.**\n```\na^10b^(-5) ÷ a^3b^3 = a^(10-3) × b^(-5-3)\n= a^7 × b^(-8)\n= a^7/b^8\n```'},
  {pos: 44, diff: 'hard', text: 'Rationalize: 3/(2√(2))', choices: [{letter:'A',text:'3√(2)/4'},{letter:'B',text:'3/4'},{letter:'C',text:'√(2)/3'},{letter:'D',text:'3√(2)/2'}], ans: 'A', sol: '**Multiply numerator and denominator by √(2).**\n```\n3/(2√(2)) × √(2)/√(2) = 3√(2)/(2×2) = 3√(2)/4\n```'},
  {pos: 45, diff: 'hard', text: 'What is 64^(2/3)?', choices: [{letter:'A',text:'16'},{letter:'B',text:'32'},{letter:'C',text:'8'},{letter:'D',text:'4'}], ans: 'A', sol: '**Rewrite as (64^(1/3))^2.**\n```\n64^(1/3) = ∛(64) = 4\n4^2 = 16\n```'},
  {pos: 46, diff: 'hard', text: 'Simplify: √(8) × √(18)', choices: [{letter:'A',text:'12'},{letter:'B',text:'6√(2)'},{letter:'C',text:'144'},{letter:'D',text:'√(144)'}], ans: 'A', sol: '**Multiply under the same radical.**\n```\n√(8) × √(18) = √(8 × 18) = √(144) = 12\n```'},
  {pos: 47, diff: 'hard', text: 'Simplify: (x^(2/3))^6 ÷ x^2', choices: [{letter:'A',text:'x^2'},{letter:'B',text:'x^4'},{letter:'C',text:'x^6'},{letter:'D',text:'x^8'}], ans: 'A', sol: '**Simplify the numerator first.**\n```\n(x^(2/3))^6 = x^(2/3 × 6) = x^4\n```\n\n**Divide.**\n```\nx^4 ÷ x^2 = x^(4-2) = x^2\n```'},
  {pos: 48, diff: 'hard', text: 'Rationalize and simplify: 5/√(10)', choices: [{letter:'A',text:'√(10)/2'},{letter:'B',text:'5√(10)/10'},{letter:'C',text:'√(10)/5'},{letter:'D',text:'5/10'}], ans: 'A', sol: '**Multiply numerator and denominator by √(10).**\n```\n5/√(10) × √(10)/√(10) = 5√(10)/10\n```\n\n**Simplify by dividing both by 5.**\n```\n5√(10)/10 = √(10)/2\n```'},
  {pos: 49, diff: 'hard', text: 'What is (1/27)^(1/3)?', choices: [{letter:'A',text:'1/3'},{letter:'B',text:'1/9'},{letter:'C',text:'3'},{letter:'D',text:'1/27'}], ans: 'A', sol: '**Take the cube root of numerator and denominator.**\n```\n(1/27)^(1/3) = ∛(1)/∛(27) = 1/3\n```'},
  {pos: 50, diff: 'hard', text: 'Simplify: √(48) + √(75) - √(12)', choices: [{letter:'A',text:'8√(3)'},{letter:'B',text:'7√(3)'},{letter:'C',text:'6√(3)'},{letter:'D',text:'9√(3)'}], ans: 'B', sol: '**Simplify each radical.**\n```\n√(48) = √(16 × 3) = 4√(3)\n√(75) = √(25 × 3) = 5√(3)\n√(12) = √(4 × 3) = 2√(3)\n```\n\n**Combine like radicals.**\n```\n4√(3) + 5√(3) - 2√(3) = 7√(3)\n```'}
];

async function insertAll() {
  console.log('\n========================================');
  console.log('DELETING OLD EXPONENTS/ROOTS QUESTIONS');
  console.log('========================================\n');

  await supabase.from('practice_questions').delete().eq('lesson_id', LESSON_ID);
  console.log('✅ Old questions deleted\n');

  console.log('========================================');
  console.log('INSERTING 50 NEW QUESTIONS');
  console.log('========================================\n');

  let success = 0, errors = 0;

  for (const q of questions) {
    const { error } = await supabase.from('practice_questions').insert([{
      lesson_id: LESSON_ID,
      subject: 'math',
      position: q.pos,
      difficulty: q.diff,
      title: `Exponents and Roots Practice ${q.pos}`,
      problem_text: q.text,
      choices: JSON.stringify(q.choices),
      correct_answer: q.ans,
      answer_explanation: q.sol,
      solution_steps: [],
      diagram_svg: null
    }]);

    if (error) {
      console.error(`❌ Q${q.pos} failed:`, error.message);
      errors++;
    } else {
      console.log(`✅ Question ${q.pos} inserted (${q.diff})`);
      success++;
    }
  }

  console.log('\n========================================');
  console.log('INSERTION COMPLETE');
  console.log(`✅ Success: ${success}/50`);
  console.log(`❌ Errors: ${errors}/50`);
  console.log('========================================\n');
}

insertAll().catch(console.error);
