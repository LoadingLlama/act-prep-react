require('dotenv').config();
const { createClient } = require('@supabase/supabase-js');

const supabase = createClient(
  'https://rabavobdklnwvwsldbix.supabase.co',
  process.env.SUPABASE_SERVICE_ROLE_KEY
);

const LESSON_KEY = 'exponential-growth';

const questions = [
  // EASY (1-17): Basic exponential evaluation and growth/decay identification
  {pos:1,diff:'easy',text:'Evaluate 2³.',ch:[{letter:'A',text:'8'},{letter:'B',text:'6'},{letter:'C',text:'9'},{letter:'D',text:'16'}],ans:'A',sol:'**Multiply 2 three times.**\n```\n2³ = 2 × 2 × 2 = 8\n```'},

  {pos:2,diff:'easy',text:'If a population doubles every year starting at 100, what is the population after 1 year?',ch:[{letter:'A',text:'200'},{letter:'B',text:'100'},{letter:'C',text:'300'},{letter:'D',text:'400'}],ans:'A',sol:'**Doubles means multiply by 2.**\n```\n100 × 2 = 200\n```'},

  {pos:3,diff:'easy',text:'Evaluate 3⁴.',ch:[{letter:'A',text:'81'},{letter:'B',text:'64'},{letter:'C',text:'12'},{letter:'D',text:'27'}],ans:'A',sol:'**Multiply 3 four times.**\n```\n3⁴ = 3 × 3 × 3 × 3 = 81\n```'},

  {pos:4,diff:'easy',text:'A quantity decreases by 50% each hour. After 1 hour, what fraction remains?',ch:[{letter:'A',text:'1/2'},{letter:'B',text:'1/4'},{letter:'C',text:'3/4'},{letter:'D',text:'2/3'}],ans:'A',sol:'**50% decrease leaves 50%.**\n```\nRemaining = 1/2\n```'},

  {pos:5,diff:'easy',text:'If f(x) = 2ˣ, find f(0).',ch:[{letter:'A',text:'1'},{letter:'B',text:'0'},{letter:'C',text:'2'},{letter:'D',text:'undefined'}],ans:'A',sol:'**Any number to the zero power equals 1.**\n```\n2⁰ = 1\n```'},

  {pos:6,diff:'easy',text:'A bacteria population triples every day. If there are 10 bacteria today, how many tomorrow?',ch:[{letter:'A',text:'30'},{letter:'B',text:'20'},{letter:'C',text:'13'},{letter:'D',text:'40'}],ans:'A',sol:'**Triples means multiply by 3.**\n```\n10 × 3 = 30\n```'},

  {pos:7,diff:'easy',text:'Evaluate 5².',ch:[{letter:'A',text:'25'},{letter:'B',text:'10'},{letter:'C',text:'32'},{letter:'D',text:'15'}],ans:'A',sol:'**Multiply 5 two times.**\n```\n5² = 5 × 5 = 25\n```'},

  {pos:8,diff:'easy',text:'If y = 2ˣ, what is y when x = 3?',ch:[{letter:'A',text:'8'},{letter:'B',text:'6'},{letter:'C',text:'9'},{letter:'D',text:'16'}],ans:'A',sol:'**Substitute *x* = 3.**\n```\ny = 2³ = 8\n```'},

  {pos:9,diff:'easy',text:'A car depreciates 20% per year. After 1 year, what percentage of original value remains?',ch:[{letter:'A',text:'80%'},{letter:'B',text:'20%'},{letter:'C',text:'100%'},{letter:'D',text:'60%'}],ans:'A',sol:'**Subtract 20% from 100%.**\n```\n100% - 20% = 80%\n```'},

  {pos:10,diff:'easy',text:'Evaluate 10³.',ch:[{letter:'A',text:'1000'},{letter:'B',text:'100'},{letter:'C',text:'30'},{letter:'D',text:'10000'}],ans:'A',sol:'**Multiply 10 three times.**\n```\n10³ = 10 × 10 × 10 = 1000\n```'},

  {pos:11,diff:'easy',text:'If f(x) = 3ˣ, find f(2).',ch:[{letter:'A',text:'9'},{letter:'B',text:'6'},{letter:'C',text:'8'},{letter:'D',text:'27'}],ans:'A',sol:'**Substitute *x* = 2.**\n```\nf(2) = 3² = 9\n```'},

  {pos:12,diff:'easy',text:'A quantity grows by 100% each period. What is the growth factor?',ch:[{letter:'A',text:'2'},{letter:'B',text:'1'},{letter:'C',text:'100'},{letter:'D',text:'3'}],ans:'A',sol:'**100% growth means doubling.**\n```\nGrowth factor = 2\n```'},

  {pos:13,diff:'easy',text:'Evaluate 4³.',ch:[{letter:'A',text:'64'},{letter:'B',text:'12'},{letter:'C',text:'16'},{letter:'D',text:'81'}],ans:'A',sol:'**Calculate 4³.**\n```\n4³ = 4 × 4 × 4 = 64\n```'},

  {pos:14,diff:'easy',text:'If y = 10ˣ and y = 100, what is x?',ch:[{letter:'A',text:'2'},{letter:'B',text:'10'},{letter:'C',text:'100'},{letter:'D',text:'3'}],ans:'A',sol:'**10² = 100.**\n```\nx = 2\n```'},

  {pos:15,diff:'easy',text:'A population decreases by 25% each year. What is the decay factor?',ch:[{letter:'A',text:'0.75'},{letter:'B',text:'0.25'},{letter:'C',text:'1.25'},{letter:'D',text:'0.5'}],ans:'A',sol:'**Remaining = 100% - 25% = 75%.**\n```\nDecay factor = 0.75\n```'},

  {pos:16,diff:'easy',text:'Evaluate 2⁵.',ch:[{letter:'A',text:'32'},{letter:'B',text:'10'},{letter:'C',text:'16'},{letter:'D',text:'64'}],ans:'A',sol:'**Calculate 2⁵.**\n```\n2⁵ = 2 × 2 × 2 × 2 × 2 = 32\n```'},

  {pos:17,diff:'easy',text:'If f(x) = 5ˣ, find f(1).',ch:[{letter:'A',text:'5'},{letter:'B',text:'1'},{letter:'C',text:'25'},{letter:'D',text:'10'}],ans:'A',sol:'**Substitute x = 1.**\n```\nf(1) = 5¹ = 5\n```'},

  // MEDIUM (18-34): Growth/decay formulas, compound interest
  {pos:18,diff:'medium',text:'A population of 500 grows at 10% per year. What is the population after 1 year?',ch:[{letter:'A',text:'550'},{letter:'B',text:'510'},{letter:'C',text:'600'},{letter:'D',text:'450'}],ans:'A',sol:'**Growth: multiply by 1.10.**\n```\n500 × 1.10 = 550\n```'},

  {pos:19,diff:'medium',text:'An investment of $1000 grows at 5% annual interest compounded annually. What is the value after 2 years?',ch:[{letter:'A',text:'$1102.50'},{letter:'B',text:'$1100'},{letter:'C',text:'$1050'},{letter:'D',text:'$1105'}],ans:'A',sol:'**Use A = P(1 + r)ᵗ.**\n```\nA = 1000(1.05)²\n  = 1000(1.1025)\n  = 1102.50\n```'},

  {pos:20,diff:'medium',text:'A bacteria colony doubles every 3 hours. Starting with 100 bacteria, how many after 6 hours?',ch:[{letter:'A',text:'400'},{letter:'B',text:'200'},{letter:'C',text:'300'},{letter:'D',text:'800'}],ans:'A',sol:'**6 hours = 2 doubling periods.**\n```\n100 × 2 × 2 = 400\n```'},

  {pos:21,diff:'medium',text:'A car worth $20,000 depreciates 15% per year. What is its value after 1 year?',ch:[{letter:'A',text:'$17,000'},{letter:'B',text:'$18,000'},{letter:'C',text:'$3,000'},{letter:'D',text:'$17,500'}],ans:'A',sol:'**Multiply by 0.85 (100% - 15%).**\n```\n20,000 × 0.85 = 17,000\n```'},

  {pos:22,diff:'medium',text:'If y = 2ˣ and x increases from 2 to 5, by what factor does y increase?',ch:[{letter:'A',text:'8'},{letter:'B',text:'4'},{letter:'C',text:'3'},{letter:'D',text:'16'}],ans:'A',sol:'**Calculate y at both values.**\n```\nAt x=2: y = 4\nAt x=5: y = 32\nFactor = 32/4 = 8\n```'},

  {pos:23,diff:'medium',text:'A radioactive substance has a half-life of 10 years. Starting with 80 grams, how much remains after 20 years?',ch:[{letter:'A',text:'20 grams'},{letter:'B',text:'40 grams'},{letter:'C',text:'10 grams'},{letter:'D',text:'60 grams'}],ans:'A',sol:'**20 years = 2 half-lives.**\n```\n80 → 40 → 20\nRemaining = 20 grams\n```'},

  {pos:24,diff:'medium',text:'An account earns 8% annual interest compounded annually. How many years to double (approximately)?',ch:[{letter:'A',text:'9 years'},{letter:'B',text:'8 years'},{letter:'C',text:'12.5 years'},{letter:'D',text:'10 years'}],ans:'A',sol:'**Use rule of 72: 72/8 = 9.**\n```\nApproximately 9 years\n```'},

  {pos:25,diff:'medium',text:'A population of 1000 decreases by 5% each year. What is the population after 2 years?',ch:[{letter:'A',text:'902.5'},{letter:'B',text:'900'},{letter:'C',text:'950'},{letter:'D',text:'905'}],ans:'A',sol:'**Multiply by 0.95 twice.**\n```\n1000 × 0.95 × 0.95\n= 1000 × 0.9025\n= 902.5\n```'},

  {pos:26,diff:'medium',text:'If f(x) = 100(2)ˣ, find f(3).',ch:[{letter:'A',text:'800'},{letter:'B',text:'600'},{letter:'C',text:'200'},{letter:'D',text:'300'}],ans:'A',sol:'**Substitute x = 3.**\n```\nf(3) = 100(2)³\n     = 100 × 8\n     = 800\n```'},

  {pos:27,diff:'medium',text:'A substance decays at 20% per hour. Starting with 500 mg, how much remains after 2 hours?',ch:[{letter:'A',text:'320 mg'},{letter:'B',text:'400 mg'},{letter:'C',text:'300 mg'},{letter:'D',text:'360 mg'}],ans:'A',sol:'**Multiply by 0.80 twice.**\n```\n500 × 0.80 × 0.80\n= 500 × 0.64\n= 320 mg\n```'},

  {pos:28,diff:'medium',text:'An investment triples in value every 5 years. Starting with $1000, what is it worth after 10 years?',ch:[{letter:'A',text:'$9,000'},{letter:'B',text:'$3,000'},{letter:'C',text:'$6,000'},{letter:'D',text:'$27,000'}],ans:'A',sol:'**10 years = 2 tripling periods.**\n```\n1000 × 3 × 3 = 9,000\n```'},

  {pos:29,diff:'medium',text:'If P(t) = 200(1.06)ᵗ represents population after t years, what is the annual growth rate?',ch:[{letter:'A',text:'6%'},{letter:'B',text:'1.06%'},{letter:'C',text:'106%'},{letter:'D',text:'0.06%'}],ans:'A',sol:'**Growth factor 1.06 = 1 + 0.06.**\n```\nGrowth rate = 6%\n```'},

  {pos:30,diff:'medium',text:'A bacteria population quadruples every day. Starting with 50, how many after 3 days?',ch:[{letter:'A',text:'3,200'},{letter:'B',text:'200'},{letter:'C',text:'800'},{letter:'D',text:'12,800'}],ans:'A',sol:'**Quadruple = multiply by 4.**\n```\n50 × 4 × 4 × 4\n= 50 × 64\n= 3,200\n```'},

  {pos:31,diff:'medium',text:'If y = 3ˣ⁺¹, what is y when x = 2?',ch:[{letter:'A',text:'27'},{letter:'B',text:'9'},{letter:'C',text:'81'},{letter:'D',text:'6'}],ans:'A',sol:'**When *x* = 2, the exponent is 2+1 = 3.**\n```\ny = 3³ = 27\n```'},

  {pos:32,diff:'medium',text:'A car depreciates 12% annually. Starting at $25,000, what is it worth after 2 years?',ch:[{letter:'A',text:'$19,360'},{letter:'B',text:'$22,000'},{letter:'C',text:'$21,120'},{letter:'D',text:'$18,500'}],ans:'A',sol:'**Multiply by 0.88 twice.**\n```\n25,000 × 0.88 × 0.88\n= 25,000 × 0.7744\n= 19,360\n```'},

  {pos:33,diff:'medium',text:'If 2ˣ = 16, what is x?',ch:[{letter:'A',text:'4'},{letter:'B',text:'8'},{letter:'C',text:'2'},{letter:'D',text:'3'}],ans:'A',sol:'**2⁴ = 16.**\n```\nx = 4\n```'},

  {pos:34,diff:'medium',text:'A population grows from 1000 to 1210 in 2 years. What is the annual growth rate (assuming constant)?',ch:[{letter:'A',text:'10%'},{letter:'B',text:'21%'},{letter:'C',text:'5%'},{letter:'D',text:'20%'}],ans:'A',sol:'**Use (1+r)² = 1210/1000 = 1.21.**\n```\n1+r = √1.21 = 1.1\nr = 0.1 = 10%\n```'},

  // HARD (35-50): Complex exponential equations, continuous growth
  {pos:35,diff:'hard',text:'Solve for x: 2²ˣ = 64',ch:[{letter:'A',text:'x = 3'},{letter:'B',text:'x = 6'},{letter:'C',text:'x = 4'},{letter:'D',text:'x = 2'}],ans:'A',sol:'**Rewrite 64 as a power of 2.**\n```\n64 = 2⁶\n```\n\n**Set exponents equal.**\n```\n2*x* = 6\n*x* = 3\n```'},

  {pos:36,diff:'hard',text:'An investment of $5000 grows to $8000 in 6 years with annual compounding. What is the annual rate?',ch:[{letter:'A',text:'Approximately 8%'},{letter:'B',text:'10%'},{letter:'C',text:'12%'},{letter:'D',text:'6%'}],ans:'A',sol:'**Find the 6th root of the growth factor.**\n```\n(1+*r*)⁶ = 8000/5000 = 1.6\n1+*r* = ⁶√1.6 ≈ 1.081\n*r* ≈ 8.1%\n```'},

  {pos:37,diff:'hard',text:'If f(x) = 2ˣ and g(x) = 3ˣ, find x where f(x) = g(x).',ch:[{letter:'A',text:'x = 0'},{letter:'B',text:'x = 1'},{letter:'C',text:'x = -1'},{letter:'D',text:'No solution'}],ans:'A',sol:'**Set the functions equal.**\n```\n2ˣ = 3ˣ\n```\n\n**Only true when *x* = 0:**\n```\n2⁰ = 3⁰ = 1 ✓\n```'},

  {pos:38,diff:'hard',text:'A radioactive isotope decays to 1/8 of its original amount in 60 days. What is its half-life?',ch:[{letter:'A',text:'20 days'},{letter:'B',text:'30 days'},{letter:'C',text:'15 days'},{letter:'D',text:'40 days'}],ans:'A',sol:'**Recognize 1/8 as (1/2)³.**\n```\n1/8 = (1/2)³\n```\n\n**This means 3 half-lives occurred.**\n```\n60 days ÷ 3 = 20 days per half-life\n```'},

  {pos:39,diff:'hard',text:'Solve: 3ˣ⁺² = 81',ch:[{letter:'A',text:'x = 2'},{letter:'B',text:'x = 4'},{letter:'C',text:'x = 6'},{letter:'D',text:'x = 1'}],ans:'A',sol:'**Rewrite 81 as a power of 3.**\n```\n81 = 3⁴\n```\n\n**Set exponents equal.**\n```\n*x* + 2 = 4\n*x* = 2\n```'},

  {pos:40,diff:'hard',text:'The population of a city grows according to P(t) = 50,000(1.03)ᵗ. How long until the population reaches 100,000?',ch:[{letter:'A',text:'Approximately 23 years'},{letter:'B',text:'33 years'},{letter:'C',text:'20 years'},{letter:'D',text:'30 years'}],ans:'A',sol:'**Divide both sides by 50,000.**\n```\n(1.03)ᵗ = 2\n```\n\n**Use logarithms to solve for *t*.**\n```\n*t*·log(1.03) = log(2)\n*t* = log(2)/log(1.03) ≈ 23.4 years\n```'},

  {pos:41,diff:'hard',text:'If 5ˣ = 125 and 5ʸ = 25, what is x + y?',ch:[{letter:'A',text:'5'},{letter:'B',text:'7'},{letter:'C',text:'6'},{letter:'D',text:'4'}],ans:'A',sol:'**Express as powers of 5.**\n```\n5ˣ = 5³, so *x* = 3\n5ʸ = 5², so *y* = 2\n*x* + *y* = 5\n```'},

  {pos:42,diff:'hard',text:'A substance has 25% remaining after 40 hours. Assuming exponential decay, what percentage remains after 20 hours?',ch:[{letter:'A',text:'50%'},{letter:'B',text:'12.5%'},{letter:'C',text:'75%'},{letter:'D',text:'37.5%'}],ans:'A',sol:'**25% is half of 50%, meaning one half-life in 20 hrs.**\n```\nAfter 20 hrs: 100% × 0.5 = 50%\n```'},

  {pos:43,diff:'hard',text:'Solve for x: 4ˣ = 2ˣ⁺⁴',ch:[{letter:'A',text:'x = 4'},{letter:'B',text:'x = 2'},{letter:'C',text:'x = 8'},{letter:'D',text:'x = 1'}],ans:'A',sol:'**Rewrite 4 as 2².**\n```\n(2²)ˣ = 2ˣ⁺⁴\n2²ˣ = 2ˣ⁺⁴\n```\n\n**Set exponents equal.**\n```\n2*x* = *x* + 4\n*x* = 4\n```'},

  {pos:44,diff:'hard',text:'An account with $P grows to $2P in 8 years at rate r compounded annually. How long to grow to $4P?',ch:[{letter:'A',text:'16 years'},{letter:'B',text:'12 years'},{letter:'C',text:'24 years'},{letter:'D',text:'20 years'}],ans:'A',sol:'**Doubling time is 8 years.**\n```\n$P → $2P (8 yrs) → $4P (another 8 yrs)\nTotal: 16 years\n```'},

  {pos:45,diff:'hard',text:'If f(x) = a·bˣ passes through (0, 5) and (2, 20), find b.',ch:[{letter:'A',text:'2'},{letter:'B',text:'4'},{letter:'C',text:'3'},{letter:'D',text:'5'}],ans:'A',sol:'**From (0, 5): *a* = 5.**\n**From (2, 20): 5*b*² = 20.**\n```\n*b*² = 4\n*b* = 2\n```'},

  {pos:46,diff:'hard',text:'Solve: 9ˣ = 3²ˣ⁺²',ch:[{letter:'A',text:'All real numbers'},{letter:'B',text:'x = 1'},{letter:'C',text:'x = 2'},{letter:'D',text:'No solution'}],ans:'D',sol:'**Rewrite 9 as 3².**\n```\n(3²)ˣ = 3²ˣ⁺²\n3²ˣ = 3²ˣ⁺²\n```\n\n**Set exponents equal.**\n```\n2*x* = 2*x* + 2\n0 = 2 (false)\n```\n\n**No solution.**'},

  {pos:47,diff:'hard',text:'The value V of a machine after t years is V = 40,000(0.85)ᵗ. When does V = $20,000?',ch:[{letter:'A',text:'Approximately 4.3 years'},{letter:'B',text:'5 years'},{letter:'C',text:'3 years'},{letter:'D',text:'6 years'}],ans:'A',sol:'**Divide both sides by 40,000.**\n```\n(0.85)ᵗ = 0.5\n```\n\n**Use logarithms to solve for *t*.**\n```\n*t*·log(0.85) = log(0.5)\n*t* = log(0.5)/log(0.85) ≈ 4.27 years\n```'},

  {pos:48,diff:'hard',text:'If 2ˣ² = 2³ˣ⁺⁴, what are the possible values of x?',ch:[{letter:'A',text:'x = 4 or x = -1'},{letter:'B',text:'x = 4 only'},{letter:'C',text:'x = -1 only'},{letter:'D',text:'x = 2 or x = -2'}],ans:'A',sol:'**Set the exponents equal.**\n```\n*x*² = 3*x* + 4\n*x*² - 3*x* - 4 = 0\n```\n\n**Factor.**\n```\n(*x* - 4)(*x* + 1) = 0\n*x* = 4 or *x* = -1\n```'},

  {pos:49,diff:'hard',text:'A bacteria population follows P(t) = 1000(2)ᵗ/³ where t is in hours. What is the doubling time?',ch:[{letter:'A',text:'3 hours'},{letter:'B',text:'6 hours'},{letter:'C',text:'1.5 hours'},{letter:'D',text:'2 hours'}],ans:'A',sol:'**Population doubles when the base-2 exponent equals 1.**\n```\n*t*/3 = 1\n*t* = 3 hours\n```'},

  {pos:50,diff:'hard',text:'Solve for x: 5²ˣ⁻¹ = 125',ch:[{letter:'A',text:'x = 2'},{letter:'B',text:'x = 3'},{letter:'C',text:'x = 1'},{letter:'D',text:'x = 4'}],ans:'A',sol:'**Rewrite 125 as a power of 5.**\n```\n125 = 5³\n```\n\n**Set exponents equal.**\n```\n2*x* - 1 = 3\n2*x* = 4\n*x* = 2\n```'},
];

async function insertQuestions() {
  const lessonResult = await supabase
    .from('lessons')
    .select('id')
    .eq('lesson_key', LESSON_KEY)
    .single();

  if (!lessonResult.data) {
    console.error('Exponential Growth lesson not found');
    return;
  }

  const lessonUUID = lessonResult.data.id;

  console.log('=== DELETING OLD EXPONENTIAL GROWTH QUESTIONS ===\n');
  await supabase
    .from('practice_questions')
    .delete()
    .eq('lesson_id', lessonUUID);
  console.log('✅ Deleted\n');

  console.log('=== INSERTING 50 EXPONENTIAL GROWTH QUESTIONS ===\n');

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
        title: `Exponential Growth Question ${q.pos}`,
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
