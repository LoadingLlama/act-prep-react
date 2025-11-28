require('dotenv').config();
const { createClient } = require('@supabase/supabase-js');

const supabase = createClient(
  'https://rabavobdklnwvwsldbix.supabase.co',
  process.env.SUPABASE_SERVICE_ROLE_KEY
);

const LESSON_KEY = 'functions';

const questions = [
  // EASY (1-17): Basic function notation, evaluation, domain/range
  {pos:1,diff:'easy',text:'If f(x) = 3x + 5, find f(2).',ch:[{letter:'A',text:'11'},{letter:'B',text:'8'},{letter:'C',text:'13'},{letter:'D',text:'6'}],ans:'A',sol:'**Substitute x = 2 into f(x).**\n```\nf(2) = 3(2) + 5\n     = 6 + 5\n     = 11\n```'},

  {pos:2,diff:'easy',text:'If g(x) = x² - 4, find g(3).',ch:[{letter:'A',text:'5'},{letter:'B',text:'13'},{letter:'C',text:'9'},{letter:'D',text:'1'}],ans:'A',sol:'**Substitute x = 3.**\n```\ng(3) = 3² - 4\n     = 9 - 4\n     = 5\n```'},

  {pos:3,diff:'easy',text:'If h(x) = 2x - 7, find h(0).',ch:[{letter:'A',text:'-7'},{letter:'B',text:'0'},{letter:'C',text:'7'},{letter:'D',text:'-2'}],ans:'A',sol:'**Substitute x = 0.**\n```\nh(0) = 2(0) - 7\n     = -7\n```'},

  {pos:4,diff:'easy',text:'What is the domain of f(x) = x + 3?',ch:[{letter:'A',text:'All real numbers'},{letter:'B',text:'x ≥ 0'},{letter:'C',text:'x > -3'},{letter:'D',text:'x ≠ -3'}],ans:'A',sol:'**Linear functions are defined everywhere.**\n```\nDomain = all real numbers\n```'},

  {pos:5,diff:'easy',text:'If f(x) = 5x, find f(-2).',ch:[{letter:'A',text:'-10'},{letter:'B',text:'10'},{letter:'C',text:'-3'},{letter:'D',text:'3'}],ans:'A',sol:'**Substitute x = -2.**\n```\nf(-2) = 5(-2) = -10\n```'},

  {pos:6,diff:'easy',text:'If f(x) = x² + 1, find f(1).',ch:[{letter:'A',text:'2'},{letter:'B',text:'1'},{letter:'C',text:'3'},{letter:'D',text:'0'}],ans:'A',sol:'**Substitute x = 1.**\n```\nf(1) = 1² + 1 = 2\n```'},

  {pos:7,diff:'easy',text:'What is the range of f(x) = x² for all real x?',ch:[{letter:'A',text:'y ≥ 0'},{letter:'B',text:'All real numbers'},{letter:'C',text:'y > 0'},{letter:'D',text:'y ≤ 0'}],ans:'A',sol:'**Squares are non-negative.**\n```\nx² ≥ 0 for all x\nRange: y ≥ 0\n```'},

  {pos:8,diff:'easy',text:'If g(x) = -2x + 3, find g(4).',ch:[{letter:'A',text:'-5'},{letter:'B',text:'5'},{letter:'C',text:'-8'},{letter:'D',text:'11'}],ans:'A',sol:'**Substitute x = 4.**\n```\ng(4) = -2(4) + 3\n     = -8 + 3\n     = -5\n```'},

  {pos:9,diff:'easy',text:'If f(x) = 7, find f(100).',ch:[{letter:'A',text:'7'},{letter:'B',text:'100'},{letter:'C',text:'707'},{letter:'D',text:'0'}],ans:'A',sol:'**Constant function always returns 7.**\n```\nf(100) = 7\n```'},

  {pos:10,diff:'easy',text:'If h(x) = x - 5, for what value of x is h(x) = 0?',ch:[{letter:'A',text:'5'},{letter:'B',text:'-5'},{letter:'C',text:'0'},{letter:'D',text:'1'}],ans:'A',sol:'**Set h(x) = 0 and solve.**\n```\nx - 5 = 0\nx = 5\n```'},

  {pos:11,diff:'easy',text:'If f(x) = 4x - 1, find f(3).',ch:[{letter:'A',text:'11'},{letter:'B',text:'12'},{letter:'C',text:'13'},{letter:'D',text:'10'}],ans:'A',sol:'**Substitute x = 3.**\n```\nf(3) = 4(3) - 1\n     = 12 - 1\n     = 11\n```'},

  {pos:12,diff:'easy',text:'What is the domain of f(x) = 1/x?',ch:[{letter:'A',text:'x ≠ 0'},{letter:'B',text:'All real numbers'},{letter:'C',text:'x > 0'},{letter:'D',text:'x ≥ 0'}],ans:'A',sol:'**Cannot divide by zero.**\n```\nDomain: all real numbers except 0\n```'},

  {pos:13,diff:'easy',text:'If f(x) = x³, find f(-1).',ch:[{letter:'A',text:'-1'},{letter:'B',text:'1'},{letter:'C',text:'-3'},{letter:'D',text:'0'}],ans:'A',sol:'**Substitute x = -1.**\n```\nf(-1) = (-1)³ = -1\n```'},

  {pos:14,diff:'easy',text:'If g(x) = 2x² + 3, find g(0).',ch:[{letter:'A',text:'3'},{letter:'B',text:'0'},{letter:'C',text:'2'},{letter:'D',text:'5'}],ans:'A',sol:'**Substitute x = 0.**\n```\ng(0) = 2(0)² + 3 = 3\n```'},

  {pos:15,diff:'easy',text:'If f(x) = |x|, find f(-5).',ch:[{letter:'A',text:'5'},{letter:'B',text:'-5'},{letter:'C',text:'0'},{letter:'D',text:'10'}],ans:'A',sol:'**Absolute value of -5.**\n```\nf(-5) = |-5| = 5\n```'},

  {pos:16,diff:'easy',text:'If h(x) = √x, what is h(16)?',ch:[{letter:'A',text:'4'},{letter:'B',text:'8'},{letter:'C',text:'256'},{letter:'D',text:'2'}],ans:'A',sol:'**Take square root.**\n```\nh(16) = √16 = 4\n```'},

  {pos:17,diff:'easy',text:'If f(x) = (x + 2)/2, find f(4).',ch:[{letter:'A',text:'3'},{letter:'B',text:'2'},{letter:'C',text:'4'},{letter:'D',text:'1'}],ans:'A',sol:'**Substitute x = 4.**\n```\nf(4) = (4 + 2)/2\n     = 6/2\n     = 3\n```'},

  // MEDIUM (18-34): Composite functions, inverse functions, transformations
  {pos:18,diff:'medium',text:'If f(x) = 2x + 1 and g(x) = x - 3, find f(g(5)).',ch:[{letter:'A',text:'5'},{letter:'B',text:'7'},{letter:'C',text:'3'},{letter:'D',text:'9'}],ans:'A',sol:'**Evaluate g(5) first.**\n```\ng(5) = 5 - 3 = 2\n```\n\n**Then f(2).**\n```\nf(2) = 2(2) + 1 = 5\n```'},

  {pos:19,diff:'medium',text:'If f(x) = x² and g(x) = x + 1, find g(f(3)).',ch:[{letter:'A',text:'10'},{letter:'B',text:'9'},{letter:'C',text:'16'},{letter:'D',text:'12'}],ans:'A',sol:'**Evaluate f(3) first.**\n```\nf(3) = 3² = 9\n```\n\n**Then g(9).**\n```\ng(9) = 9 + 1 = 10\n```'},

  {pos:20,diff:'medium',text:'Find the inverse of f(x) = 2x - 6.',ch:[{letter:'A',text:'f⁻¹(x) = (x + 6)/2'},{letter:'B',text:'f⁻¹(x) = (x - 6)/2'},{letter:'C',text:'f⁻¹(x) = 2x + 6'},{letter:'D',text:'f⁻¹(x) = x/2 - 6'}],ans:'A',sol:'**Set y = 2x - 6, swap and solve.**\n```\nx = 2y - 6\nx + 6 = 2y\ny = (x + 6)/2\n```'},

  {pos:21,diff:'medium',text:'If f(x) = x + 1, find f(f(2)).',ch:[{letter:'A',text:'4'},{letter:'B',text:'3'},{letter:'C',text:'5'},{letter:'D',text:'2'}],ans:'A',sol:'**Evaluate f(2) first.**\n```\nf(2) = 2 + 1 = 3\n```\n\n**Then f(3).**\n```\nf(3) = 3 + 1 = 4\n```'},

  {pos:22,diff:'medium',text:'What is the domain of f(x) = √(x - 2)?',ch:[{letter:'A',text:'x ≥ 2'},{letter:'B',text:'x > 2'},{letter:'C',text:'x ≥ 0'},{letter:'D',text:'All real numbers'}],ans:'A',sol:'**Expression under square root must be ≥ 0.**\n```\nx - 2 ≥ 0\nx ≥ 2\n```'},

  {pos:23,diff:'medium',text:'If f(x) = x² - 4x + 3, find f(5).',ch:[{letter:'A',text:'8'},{letter:'B',text:'28'},{letter:'C',text:'3'},{letter:'D',text:'18'}],ans:'A',sol:'**Substitute x = 5.**\n```\nf(5) = 5² - 4(5) + 3\n     = 25 - 20 + 3\n     = 8\n```'},

  {pos:24,diff:'medium',text:'Find the inverse of f(x) = (x - 1)/3.',ch:[{letter:'A',text:'f⁻¹(x) = 3x + 1'},{letter:'B',text:'f⁻¹(x) = 3x - 1'},{letter:'C',text:'f⁻¹(x) = (x + 1)/3'},{letter:'D',text:'f⁻¹(x) = x/3 + 1'}],ans:'A',sol:'**Set y = (x-1)/3, swap and solve.**\n```\nx = (y - 1)/3\n3x = y - 1\ny = 3x + 1\n```'},

  {pos:25,diff:'medium',text:'If f(x) = 2x and g(x) = x + 3, find (f ∘ g)(4).',ch:[{letter:'A',text:'14'},{letter:'B',text:'11'},{letter:'C',text:'8'},{letter:'D',text:'20'}],ans:'A',sol:'**f(g(4)) means evaluate g first.**\n```\ng(4) = 4 + 3 = 7\nf(7) = 2(7) = 14\n```'},

  {pos:26,diff:'medium',text:'What is the range of f(x) = -x² + 4?',ch:[{letter:'A',text:'y ≤ 4'},{letter:'B',text:'y ≥ 4'},{letter:'C',text:'y ≥ -4'},{letter:'D',text:'All real numbers'}],ans:'A',sol:'**Parabola opening downward with vertex at (0, 4).**\n```\nMaximum value = 4\nRange: y ≤ 4\n```'},

  {pos:27,diff:'medium',text:'If f(x) = 3x + 2, for what value of x is f(x) = 11?',ch:[{letter:'A',text:'3'},{letter:'B',text:'4'},{letter:'C',text:'5'},{letter:'D',text:'2'}],ans:'A',sol:'**Set f(x) = 11 and solve.**\n```\n3x + 2 = 11\n3x = 9\nx = 3\n```'},

  {pos:28,diff:'medium',text:'If f(x) = x² - 1 and g(x) = 2x, find f(g(2)).',ch:[{letter:'A',text:'15'},{letter:'B',text:'7'},{letter:'C',text:'3'},{letter:'D',text:'8'}],ans:'A',sol:'**Evaluate g(2) first.**\n```\ng(2) = 2(2) = 4\n```\n\n**Then f(4).**\n```\nf(4) = 4² - 1 = 15\n```'},

  {pos:29,diff:'medium',text:'What is the domain of f(x) = 1/(x - 5)?',ch:[{letter:'A',text:'x ≠ 5'},{letter:'B',text:'x > 5'},{letter:'C',text:'x ≥ 5'},{letter:'D',text:'All real numbers'}],ans:'A',sol:'**Denominator cannot be zero.**\n```\nx - 5 ≠ 0\nx ≠ 5\n```'},

  {pos:30,diff:'medium',text:'If f(x) = |x - 3|, find f(1).',ch:[{letter:'A',text:'2'},{letter:'B',text:'-2'},{letter:'C',text:'4'},{letter:'D',text:'1'}],ans:'A',sol:'**Substitute x = 1.**\n```\nf(1) = |1 - 3|\n     = |-2|\n     = 2\n```'},

  {pos:31,diff:'medium',text:'Find the inverse of f(x) = x/4 + 2.',ch:[{letter:'A',text:'f⁻¹(x) = 4x - 8'},{letter:'B',text:'f⁻¹(x) = 4x + 8'},{letter:'C',text:'f⁻¹(x) = (x - 2)/4'},{letter:'D',text:'f⁻¹(x) = 4(x - 2)'}],ans:'D',sol:'**Set y = x/4 + 2, swap and solve.**\n```\nx = y/4 + 2\nx - 2 = y/4\ny = 4(x - 2)\n```'},

  {pos:32,diff:'medium',text:'If g(x) = x² + 2x, find g(-3).',ch:[{letter:'A',text:'3'},{letter:'B',text:'15'},{letter:'C',text:'-3'},{letter:'D',text:'9'}],ans:'A',sol:'**Substitute x = -3.**\n```\ng(-3) = (-3)² + 2(-3)\n      = 9 - 6\n      = 3\n```'},

  {pos:33,diff:'medium',text:'If f(x) = 5x - 3 and f(a) = 12, find a.',ch:[{letter:'A',text:'3'},{letter:'B',text:'4'},{letter:'C',text:'5'},{letter:'D',text:'2'}],ans:'A',sol:'**Set 5a - 3 = 12 and solve.**\n```\n5a = 15\na = 3\n```'},

  {pos:34,diff:'medium',text:'What is the range of f(x) = √x for x ≥ 0?',ch:[{letter:'A',text:'y ≥ 0'},{letter:'B',text:'y > 0'},{letter:'C',text:'All real numbers'},{letter:'D',text:'y ≤ 0'}],ans:'A',sol:'**Square root is non-negative.**\n```\n√x ≥ 0 for all x ≥ 0\nRange: y ≥ 0\n```'},

  // HARD (35-50): Complex compositions, piecewise, abstract functions
  {pos:35,diff:'hard',text:'If f(x) = 2x - 1 and g(x) = x², find (f ∘ g)(x).',ch:[{letter:'A',text:'2x² - 1'},{letter:'B',text:'2x² - 2x + 1'},{letter:'C',text:'4x² - 1'},{letter:'D',text:'x² + 2x - 1'}],ans:'A',sol:'**f(g(x)) = f(x²)**\n```\nf(x²) = 2(x²) - 1\n      = 2x² - 1\n```'},

  {pos:36,diff:'hard',text:'If f(x) = x + 2 and (f ∘ g)(x) = 3x - 1, find g(x).',ch:[{letter:'A',text:'g(x) = 3x - 3'},{letter:'B',text:'g(x) = 3x + 1'},{letter:'C',text:'g(x) = 3x'},{letter:'D',text:'g(x) = 3x - 2'}],ans:'A',sol:'**f(g(x)) = g(x) + 2 = 3x - 1**\n```\ng(x) + 2 = 3x - 1\ng(x) = 3x - 3\n```'},

  {pos:37,diff:'hard',text:'Find the inverse of f(x) = (2x + 1)/(x - 3) for x ≠ 3.',ch:[{letter:'A',text:'f⁻¹(x) = (3x + 1)/(x - 2)'},{letter:'B',text:'f⁻¹(x) = (3x - 1)/(x - 2)'},{letter:'C',text:'f⁻¹(x) = (x - 3)/(2x + 1)'},{letter:'D',text:'f⁻¹(x) = (2x - 1)/(x - 3)'}],ans:'A',sol:'**Set y = (2x+1)/(x-3), swap variables.**\n```\nx = (2y + 1)/(y - 3)\nx(y - 3) = 2y + 1\nxy - 3x = 2y + 1\nxy - 2y = 3x + 1\ny(x - 2) = 3x + 1\ny = (3x + 1)/(x - 2)\n```'},

  {pos:38,diff:'hard',text:'If f(x+1) = 2x + 3, find f(5).',ch:[{letter:'A',text:'11'},{letter:'B',text:'13'},{letter:'C',text:'9'},{letter:'D',text:'7'}],ans:'A',sol:'**Let x + 1 = 5, so x = 4.**\n```\nf(5) = 2(4) + 3\n     = 8 + 3\n     = 11\n```'},

  {pos:39,diff:'hard',text:'If f(x) = x² - 3x + 2, for what values of x is f(x) = 0?',ch:[{letter:'A',text:'x = 1 or x = 2'},{letter:'B',text:'x = -1 or x = -2'},{letter:'C',text:'x = 0 or x = 3'},{letter:'D',text:'x = 3 or x = -1'}],ans:'A',sol:'**Factor the quadratic.**\n```\nx² - 3x + 2 = 0\n(x - 1)(x - 2) = 0\nx = 1 or x = 2\n```'},

  {pos:40,diff:'hard',text:'If f(x) = 2ˣ, find f(3) + f(2).',ch:[{letter:'A',text:'12'},{letter:'B',text:'32'},{letter:'C',text:'16'},{letter:'D',text:'8'}],ans:'A',sol:'**Evaluate each power.**\n```\nf(3) = 2³ = 8\nf(2) = 2² = 4\nSum = 8 + 4 = 12\n```'},

  {pos:41,diff:'hard',text:'If f is an odd function and f(2) = 5, what is f(-2)?',ch:[{letter:'A',text:'-5'},{letter:'B',text:'5'},{letter:'C',text:'2'},{letter:'D',text:'-2'}],ans:'A',sol:'**Odd functions satisfy f(-x) = -f(x).**\n```\nf(-2) = -f(2)\n      = -5\n```'},

  {pos:42,diff:'hard',text:'If f(x) = (x - 1)² + 3, what is the minimum value of f(x)?',ch:[{letter:'A',text:'3'},{letter:'B',text:'1'},{letter:'C',text:'0'},{letter:'D',text:'4'}],ans:'A',sol:'**Vertex form with (x - 1)² ≥ 0.**\n```\nMinimum when (x-1)² = 0\nMin value = 0 + 3 = 3\n```'},

  {pos:43,diff:'hard',text:'Let f(x) be a function such that f(2x) = 4x + 6. Find f(8).',ch:[{letter:'A',text:'22'},{letter:'B',text:'38'},{letter:'C',text:'18'},{letter:'D',text:'14'}],ans:'A',sol:'**Let 2x = 8, so x = 4.**\n```\nf(8) = 4(4) + 6\n     = 16 + 6\n     = 22\n```'},

  {pos:44,diff:'hard',text:'If g(x) = x³ and f(x) = 2x + 1, find (g ∘ f)(2).',ch:[{letter:'A',text:'125'},{letter:'B',text:'27'},{letter:'C',text:'64'},{letter:'D',text:'343'}],ans:'A',sol:'**Evaluate f(2) first.**\n```\nf(2) = 2(2) + 1 = 5\n```\n\n**Then g(5).**\n```\ng(5) = 5³ = 125\n```'},

  {pos:45,diff:'hard',text:'If f is an even function and f(3) = 7, what is f(-3)?',ch:[{letter:'A',text:'7'},{letter:'B',text:'-7'},{letter:'C',text:'3'},{letter:'D',text:'-3'}],ans:'A',sol:'**Even functions satisfy f(-x) = f(x).**\n```\nf(-3) = f(3) = 7\n```'},

  {pos:46,diff:'hard',text:'For what value of k does f(x) = kx + 5 satisfy f(f(2)) = 23?',ch:[{letter:'A',text:'k = 3'},{letter:'B',text:'k = 2'},{letter:'C',text:'k = 4'},{letter:'D',text:'k = 5'}],ans:'B',sol:'**Find f(2) first.**\n```\nf(2) = 2k + 5\n```\n\n**Then f(f(2)) = 23.**\n```\nf(2k + 5) = k(2k + 5) + 5 = 23\n2k² + 5k + 5 = 23\n2k² + 5k - 18 = 0\n(k - 2)(2k + 9) = 0\nk = 2 ✓\n```'},

  {pos:47,diff:'hard',text:'If f(x) = √(4x + 5), find f(5).',ch:[{letter:'A',text:'5'},{letter:'B',text:'√29'},{letter:'C',text:'25'},{letter:'D',text:'3'}],ans:'A',sol:'**Substitute x = 5.**\n```\nf(5) = √(4(5) + 5)\n     = √(20 + 5)\n     = √25\n     = 5\n```'},

  {pos:48,diff:'hard',text:'If f(x) = 3^x, find the value of x when f(x) = 27.',ch:[{letter:'A',text:'3'},{letter:'B',text:'9'},{letter:'C',text:'2'},{letter:'D',text:'4'}],ans:'A',sol:'**Set 3^x = 27.**\n```\n3^x = 3³\nx = 3\n```'},

  {pos:49,diff:'hard',text:'If f(x) and g(x) are inverse functions and f(7) = 2, what is g(2)?',ch:[{letter:'A',text:'7'},{letter:'B',text:'2'},{letter:'C',text:'1/7'},{letter:'D',text:'1/2'}],ans:'A',sol:'**Inverse functions satisfy g(f(x)) = x.**\n```\nf(7) = 2 means g(2) = 7\n```'},

  {pos:50,diff:'hard',text:'If f(x) = log₂(x), find f(32).',ch:[{letter:'A',text:'5'},{letter:'B',text:'4'},{letter:'C',text:'6'},{letter:'D',text:'3'}],ans:'A',sol:'**Find the exponent.**\n```\nlog₂(32) = log₂(2⁵)\n         = 5\n```'},
];

async function insertQuestions() {
  const lessonResult = await supabase
    .from('lessons')
    .select('id')
    .eq('lesson_key', LESSON_KEY)
    .single();

  if (!lessonResult.data) {
    console.error('Functions lesson not found');
    return;
  }

  const lessonUUID = lessonResult.data.id;

  console.log('=== DELETING OLD FUNCTIONS QUESTIONS ===\n');
  await supabase
    .from('practice_questions')
    .delete()
    .eq('lesson_id', lessonUUID);
  console.log('✅ Deleted\n');

  console.log('=== INSERTING 50 FUNCTIONS QUESTIONS ===\n');

  let successCount = 0;
  let errorCount = 0;

  for (const q of questions) {
    const { error } = await supabase
      .from('practice_questions')
      .insert({
        lesson_id: lessonUUID,
        subject: 'math',
        position: q.pos,
        difficulty: q.diff,
        title: `Functions Question ${q.pos}`,
        problem_text: q.text,
        choices: JSON.stringify(q.ch),
        correct_answer: q.ans,
        answer_explanation: q.sol
      });

    if (error) {
      console.log(`❌ Q${q.pos} error:`, error.message);
      errorCount++;
    } else {
      console.log(`✅ Q${q.pos} (${q.diff})`);
      successCount++;
    }
  }

  console.log(`\n=== COMPLETE: ${successCount}/50 success, ${errorCount}/50 errors ===\n`);
}

insertQuestions();
