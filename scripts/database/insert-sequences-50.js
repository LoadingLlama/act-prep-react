require('dotenv').config();
const { createClient } = require('@supabase/supabase-js');

const supabase = createClient(
  'https://rabavobdklnwvwsldbix.supabase.co',
  process.env.SUPABASE_SERVICE_ROLE_KEY
);

const LESSON_KEY = 'sequences';

const questions = [
  // EASY (1-17): Basic arithmetic and geometric sequences
  {pos:1,diff:'easy',text:'Find the next term in the sequence: 2, 5, 8, 11, ...',ch:[{letter:'A',text:'14'},{letter:'B',text:'13'},{letter:'C',text:'15'},{letter:'D',text:'12'}],ans:'A',sol:'**Add the common difference of 3.**\n```\n11 + 3 = 14\n```'},

  {pos:2,diff:'easy',text:'What is the common difference in the sequence: 10, 7, 4, 1, ...?',ch:[{letter:'A',text:'-3'},{letter:'B',text:'3'},{letter:'C',text:'-4'},{letter:'D',text:'4'}],ans:'A',sol:'**Subtract consecutive terms.**\n```\n7 - 10 = -3\n```'},

  {pos:3,diff:'easy',text:'Find the 5th term of the sequence: 3, 6, 9, 12, ...',ch:[{letter:'A',text:'15'},{letter:'B',text:'18'},{letter:'C',text:'14'},{letter:'D',text:'16'}],ans:'A',sol:'**Pattern adds 3 each time.**\n```\n12 + 3 = 15\n```'},

  {pos:4,diff:'easy',text:'What type of sequence is 2, 6, 18, 54, ...?',ch:[{letter:'A',text:'Geometric'},{letter:'B',text:'Arithmetic'},{letter:'C',text:'Neither'},{letter:'D',text:'Both'}],ans:'A',sol:'**Each term is multiplied by 3.**\n```\nGeometric sequence\n```'},

  {pos:5,diff:'easy',text:'Find the next term: 1, 4, 7, 10, ...',ch:[{letter:'A',text:'13'},{letter:'B',text:'12'},{letter:'C',text:'14'},{letter:'D',text:'11'}],ans:'A',sol:'**Add 3 to previous term.**\n```\n10 + 3 = 13\n```'},

  {pos:6,diff:'easy',text:'What is the common ratio in: 2, 6, 18, 54, ...?',ch:[{letter:'A',text:'3'},{letter:'B',text:'4'},{letter:'C',text:'2'},{letter:'D',text:'6'}],ans:'A',sol:'**Divide consecutive terms.**\n```\n6 ÷ 2 = 3\n```'},

  {pos:7,diff:'easy',text:'Find the 4th term: 5, 10, 15, 20, ...',ch:[{letter:'A',text:'20'},{letter:'B',text:'25'},{letter:'C',text:'15'},{letter:'D',text:'30'}],ans:'A',sol:'**The 4th term is listed.**\n```\n4th term = 20\n```'},

  {pos:8,diff:'easy',text:'Is the sequence 1, 2, 4, 8, ... arithmetic or geometric?',ch:[{letter:'A',text:'Geometric'},{letter:'B',text:'Arithmetic'},{letter:'C',text:'Both'},{letter:'D',text:'Neither'}],ans:'A',sol:'**Each term doubles (×2).**\n```\nGeometric sequence\n```'},

  {pos:9,diff:'easy',text:'Find the next term: 20, 15, 10, 5, ...',ch:[{letter:'A',text:'0'},{letter:'B',text:'-5'},{letter:'C',text:'1'},{letter:'D',text:'5'}],ans:'A',sol:'**Subtract 5 each time.**\n```\n5 - 5 = 0\n```'},

  {pos:10,diff:'easy',text:'What is the first term of the sequence: ..., 7, 11, 15, 19?',ch:[{letter:'A',text:'3'},{letter:'B',text:'5'},{letter:'C',text:'1'},{letter:'D',text:'2'}],ans:'A',sol:'**Subtract the common difference 4.**\n```\n7 - 4 = 3\n```'},

  {pos:11,diff:'easy',text:'Find the 3rd term: 100, 50, 25, ...',ch:[{letter:'A',text:'25'},{letter:'B',text:'12.5'},{letter:'C',text:'50'},{letter:'D',text:'20'}],ans:'A',sol:'**The 3rd term is listed.**\n```\n3rd term = 25\n```'},

  {pos:12,diff:'easy',text:'What is the common difference: 6, 10, 14, 18, ...?',ch:[{letter:'A',text:'4'},{letter:'B',text:'3'},{letter:'C',text:'5'},{letter:'D',text:'2'}],ans:'A',sol:'**Subtract consecutive terms.**\n```\n10 - 6 = 4\n```'},

  {pos:13,diff:'easy',text:'Find the next term: 3, 9, 27, 81, ...',ch:[{letter:'A',text:'243'},{letter:'B',text:'162'},{letter:'C',text:'324'},{letter:'D',text:'108'}],ans:'A',sol:'**Multiply by 3.**\n```\n81 × 3 = 243\n```'},

  {pos:14,diff:'easy',text:'Is 2, 5, 8, 11, ... an arithmetic sequence?',ch:[{letter:'A',text:'Yes'},{letter:'B',text:'No'},{letter:'C',text:'Cannot determine'},{letter:'D',text:'Only if it continues'}],ans:'A',sol:'**Common difference of 3.**\n```\nYes, arithmetic\n```'},

  {pos:15,diff:'easy',text:'Find the 6th term: 1, 3, 5, 7, 9, ...',ch:[{letter:'A',text:'11'},{letter:'B',text:'10'},{letter:'C',text:'12'},{letter:'D',text:'13'}],ans:'A',sol:'**Add 2 to the 5th term.**\n```\n9 + 2 = 11\n```'},

  {pos:16,diff:'easy',text:'What is the common ratio: 5, 10, 20, 40, ...?',ch:[{letter:'A',text:'2'},{letter:'B',text:'5'},{letter:'C',text:'3'},{letter:'D',text:'4'}],ans:'A',sol:'**Divide consecutive terms.**\n```\n10 ÷ 5 = 2\n```'},

  {pos:17,diff:'easy',text:'Find the next term: 12, 9, 6, 3, ...',ch:[{letter:'A',text:'0'},{letter:'B',text:'-3'},{letter:'C',text:'1'},{letter:'D',text:'2'}],ans:'A',sol:'**Subtract 3.**\n```\n3 - 3 = 0\n```'},

  // MEDIUM (18-34): Formulas, finding nth term
  {pos:18,diff:'medium',text:'Find the 10th term of the arithmetic sequence with first term 3 and common difference 4.',ch:[{letter:'A',text:'39'},{letter:'B',text:'43'},{letter:'C',text:'35'},{letter:'D',text:'37'}],ans:'A',sol:'**Use formula *aₙ* = *a₁* + (*n*-1)*d***\n```\n*a*₁₀ = 3 + (10-1)(4)\n    = 3 + 36\n    = 39\n```'},

  {pos:19,diff:'medium',text:'What is the 8th term of: 2, 5, 8, 11, ...?',ch:[{letter:'A',text:'23'},{letter:'B',text:'24'},{letter:'C',text:'22'},{letter:'D',text:'25'}],ans:'A',sol:'**Common difference is 3.**\n```\n*a*₈ = 2 + (8-1)(3)\n   = 2 + 21\n   = 23\n```'},

  {pos:20,diff:'medium',text:'Find the 5th term of the geometric sequence: 3, 6, 12, 24, ...',ch:[{letter:'A',text:'48'},{letter:'B',text:'36'},{letter:'C',text:'96'},{letter:'D',text:'72'}],ans:'A',sol:'**Common ratio is 2.**\n```\n24 × 2 = 48\n```'},

  {pos:21,diff:'medium',text:'In an arithmetic sequence, *a*₁ = 5 and *a*₅ = 21. What is the common difference?',ch:[{letter:'A',text:'4'},{letter:'B',text:'3'},{letter:'C',text:'5'},{letter:'D',text:'6'}],ans:'A',sol:'**Use *a*₅ = *a*₁ + 4*d***\n```\n21 = 5 + 4*d*\n16 = 4*d*\n*d* = 4\n```'},

  {pos:22,diff:'medium',text:'Find the 6th term of the geometric sequence with *a*₁ = 2 and *r* = 3.',ch:[{letter:'A',text:'486'},{letter:'B',text:'162'},{letter:'C',text:'243'},{letter:'D',text:'729'}],ans:'A',sol:'**Use formula *aₙ* = *a*₁ · *r*⁽ⁿ⁻¹⁾**\n```\n*a*₆ = 2 · 3⁵\n    = 2 · 243\n    = 486\n```'},

  {pos:23,diff:'medium',text:'The 3rd term of an arithmetic sequence is 14 and the 7th term is 30. Find the first term.',ch:[{letter:'A',text:'6'},{letter:'B',text:'8'},{letter:'C',text:'10'},{letter:'D',text:'4'}],ans:'A',sol:'**Find common difference first.**\n```\n*a*₇ - *a*₃ = 4*d*\n30 - 14 = 4*d*\n*d* = 4\n```\n\n**Work backwards from *a*₃.**\n```\n*a*₁ = 14 - 2(4) = 6\n```'},

  {pos:24,diff:'medium',text:'How many terms are in the sequence: 5, 8, 11, 14, ..., 50?',ch:[{letter:'A',text:'16'},{letter:'B',text:'15'},{letter:'C',text:'17'},{letter:'D',text:'14'}],ans:'A',sol:'**Use 50 = 5 + (*n*-1)(3)**\n```\n45 = (*n*-1)(3)\n15 = *n* - 1\n*n* = 16\n```'},

  {pos:25,diff:'medium',text:'Find the sum of the first 5 terms: 2, 4, 6, 8, 10.',ch:[{letter:'A',text:'30'},{letter:'B',text:'20'},{letter:'C',text:'25'},{letter:'D',text:'35'}],ans:'A',sol:'**Add all terms.**\n```\n2 + 4 + 6 + 8 + 10 = 30\n```'},

  {pos:26,diff:'medium',text:'In a geometric sequence, *a*₂ = 6 and *a*₄ = 54. Find the common ratio.',ch:[{letter:'A',text:'3'},{letter:'B',text:'9'},{letter:'C',text:'2'},{letter:'D',text:'6'}],ans:'A',sol:'**Use *a*₄ = *a*₂ · *r*²**\n```\n54 = 6 · *r*²\n*r*² = 9\n*r* = 3\n```'},

  {pos:27,diff:'medium',text:'Find the 12th term: 7, 4, 1, -2, ...',ch:[{letter:'A',text:'-26'},{letter:'B',text:'-23'},{letter:'C',text:'-29'},{letter:'D',text:'-20'}],ans:'A',sol:'**Common difference is -3.**\n```\n*a*₁₂ = 7 + (12-1)(-3)\n     = 7 - 33\n     = -26\n```'},

  {pos:28,diff:'medium',text:'Which term equals 97 in the sequence: 1, 5, 9, 13, ...?',ch:[{letter:'A',text:'25th'},{letter:'B',text:'24th'},{letter:'C',text:'26th'},{letter:'D',text:'23rd'}],ans:'A',sol:'**Set up equation.**\n```\n97 = 1 + (*n*-1)(4)\n96 = 4(*n*-1)\n24 = *n* - 1\n*n* = 25\n```'},

  {pos:29,diff:'medium',text:'Find the 7th term of the sequence: 1, 1/2, 1/4, 1/8, ...',ch:[{letter:'A',text:'1/64'},{letter:'B',text:'1/128'},{letter:'C',text:'1/32'},{letter:'D',text:'1/16'}],ans:'A',sol:'**Common ratio is 1/2.**\n```\n*a*₇ = 1 · (1/2)⁶\n    = 1/64\n```'},

  {pos:30,diff:'medium',text:'In an arithmetic sequence, *a*₄ = 17 and *d* = 3. Find *a*₁.',ch:[{letter:'A',text:'8'},{letter:'B',text:'11'},{letter:'C',text:'5'},{letter:'D',text:'14'}],ans:'A',sol:'**Work backwards.**\n```\n*a*₁ = *a*₄ - 3*d*\n   = 17 - 3(3)\n   = 17 - 9\n   = 8\n```'},

  {pos:31,diff:'medium',text:'Find the 10th term: 100, 50, 25, 12.5, ...',ch:[{letter:'A',text:'100/512'},{letter:'B',text:'100/256'},{letter:'C',text:'0.195'},{letter:'D',text:'0.390'}],ans:'A',sol:'**Common ratio is 1/2.**\n```\n*a*₁₀ = 100 · (1/2)⁹\n     = 100/512\n```'},

  {pos:32,diff:'medium',text:'What is the 15th term of: 3, 7, 11, 15, ...?',ch:[{letter:'A',text:'59'},{letter:'B',text:'63'},{letter:'C',text:'55'},{letter:'D',text:'61'}],ans:'A',sol:'**Common difference is 4.**\n```\n*a*₁₅ = 3 + (15-1)(4)\n     = 3 + 56\n     = 59\n```'},

  {pos:33,diff:'medium',text:'Find the sum of the first 10 terms of: 1, 2, 3, 4, ...',ch:[{letter:'A',text:'55'},{letter:'B',text:'50'},{letter:'C',text:'45'},{letter:'D',text:'60'}],ans:'A',sol:'**Use sum formula *Sₙ* = *n*(*n*+1)/2**\n```\n*S*₁₀ = 10(11)/2\n     = 110/2\n     = 55\n```'},

  {pos:34,diff:'medium',text:'In a geometric sequence, *a*₁ = 4 and *a*₃ = 36. Find *a*₅.',ch:[{letter:'A',text:'324'},{letter:'B',text:'108'},{letter:'C',text:'216'},{letter:'D',text:'162'}],ans:'A',sol:'**Find *r* first: 36 = 4*r*²**\n```\n*r*² = 9, so *r* = 3\n*a*₅ = 4 · 3⁴\n    = 4 · 81\n    = 324\n```'},

  // HARD (35-50): Series sums, complex sequences
  {pos:35,diff:'hard',text:'Find the sum of the first 20 terms of the arithmetic sequence: 5, 9, 13, 17, ...',ch:[{letter:'A',text:'860'},{letter:'B',text:'840'},{letter:'C',text:'880'},{letter:'D',text:'900'}],ans:'A',sol:'**Use *Sₙ* = (*n*/2)[2*a*₁ + (*n*-1)*d*]**\n```\n*S*₂₀ = (20/2)[2(5) + 19(4)]\n     = 10[10 + 76]\n     = 10(86)\n     = 860\n```'},

  {pos:36,diff:'hard',text:'Find the sum of the geometric series: 3 + 6 + 12 + 24 + ... (8 terms)',ch:[{letter:'A',text:'765'},{letter:'B',text:'381'},{letter:'C',text:'762'},{letter:'D',text:'1530'}],ans:'A',sol:'**Use *Sₙ* = *a*₁(*rⁿ* - 1)/(*r* - 1)**\n```\n*S*₈ = 3(2⁸ - 1)/(2 - 1)\n    = 3(256 - 1)\n    = 3(255)\n    = 765\n```'},

  {pos:37,diff:'hard',text:'The sum of the first *n* terms of an arithmetic sequence is *Sₙ* = *n*² + 2*n*. Find the 5th term.',ch:[{letter:'A',text:'11'},{letter:'B',text:'9'},{letter:'C',text:'10'},{letter:'D',text:'12'}],ans:'A',sol:'**Find *S*₅ and *S*₄, then subtract.**\n```\n*S*₅ = 25 + 10 = 35\n*S*₄ = 16 + 8 = 24\n*a*₅ = 35 - 24 = 11\n```'},

  {pos:38,diff:'hard',text:'Find the sum: 1 + 1/3 + 1/9 + 1/27 + ... (infinite geometric series)',ch:[{letter:'A',text:'3/2'},{letter:'B',text:'2'},{letter:'C',text:'1'},{letter:'D',text:'4/3'}],ans:'A',sol:'**Use *S* = *a*₁/(1 - *r*) where |*r*| < 1**\n```\n*S* = 1/(1 - 1/3)\n   = 1/(2/3)\n   = 3/2\n```'},

  {pos:39,diff:'hard',text:'Find the sum of the first 12 terms of the arithmetic sequence with *a*₁ = 3 and *d* = 5.',ch:[{letter:'A',text:'366'},{letter:'B',text:'360'},{letter:'C',text:'372'},{letter:'D',text:'350'}],ans:'A',sol:'**Use sum formula.**\n```\n*S*₁₂ = (12/2)[2(3) + 11(5)]\n     = 6[6 + 55]\n     = 6(61)\n     = 366\n```'},

  {pos:40,diff:'hard',text:'For which value of *n* does the sum 2 + 4 + 6 + ... equal 420?',ch:[{letter:'A',text:'20'},{letter:'B',text:'21'},{letter:'C',text:'19'},{letter:'D',text:'22'}],ans:'A',sol:'**Use *Sₙ* = *n*(*n* + 1)**\n```\n420 = *n*(*n* + 1)\n420 = *n*² + *n*\n*n*² + *n* - 420 = 0\n(*n* - 20)(*n* + 21) = 0\n*n* = 20\n```'},

  {pos:41,diff:'hard',text:'Find the sum of all multiples of 7 between 1 and 100.',ch:[{letter:'A',text:'735'},{letter:'B',text:'714'},{letter:'C',text:'700'},{letter:'D',text:'749'}],ans:'A',sol:'**Sequence: 7, 14, 21, ..., 98 (14 terms)**\n```\n*S*₁₄ = (14/2)(7 + 98)\n     = 7(105)\n     = 735\n```'},

  {pos:42,diff:'hard',text:'A geometric sequence has *a*₁ = 2 and sum of first 5 terms is 62. Find the common ratio.',ch:[{letter:'A',text:'2'},{letter:'B',text:'3'},{letter:'C',text:'4'},{letter:'D',text:'1.5'}],ans:'A',sol:'**Use *Sₙ* = *a*₁(*rⁿ* - 1)/(*r* - 1)**\n```\n62 = 2(*r*⁵ - 1)/(*r* - 1)\n```\n\n**Test *r* = 2:**\n```\n*S*₅ = 2(32 - 1)/(2 - 1)\n    = 2(31)\n    = 62 ✓\n```'},

  {pos:43,diff:'hard',text:'The 4th term of a geometric sequence is 24 and the 7th term is 192. Find the first term.',ch:[{letter:'A',text:'3'},{letter:'B',text:'6'},{letter:'C',text:'2'},{letter:'D',text:'4'}],ans:'A',sol:'**Find *r*: *a*₇/*a*₄ = *r*³**\n```\n192/24 = *r*³\n*r*³ = 8\n*r* = 2\n```\n\n**Find *a*₁: *a*₄ = *a*₁*r*³**\n```\n24 = *a*₁(8)\n*a*₁ = 3\n```'},

  {pos:44,diff:'hard',text:'Find the sum: 1 - 1/2 + 1/4 - 1/8 + ... (infinite series)',ch:[{letter:'A',text:'2/3'},{letter:'B',text:'1'},{letter:'C',text:'3/4'},{letter:'D',text:'1/2'}],ans:'A',sol:'**Geometric series with *r* = -1/2**\n```\n*S* = 1/(1 - (-1/2))\n   = 1/(3/2)\n   = 2/3\n```'},

  {pos:45,diff:'hard',text:'The sum of an infinite geometric series is 12 and the first term is 4. Find the common ratio.',ch:[{letter:'A',text:'2/3'},{letter:'B',text:'1/2'},{letter:'C',text:'1/3'},{letter:'D',text:'3/4'}],ans:'A',sol:'**Use *S* = *a*₁/(1 - *r*)**\n```\n12 = 4/(1 - *r*)\n12(1 - *r*) = 4\n12 - 12*r* = 4\n12*r* = 8\n*r* = 2/3\n```'},

  {pos:46,diff:'hard',text:'Find the sum of 50 + 48 + 46 + ... + 2.',ch:[{letter:'A',text:'650'},{letter:'B',text:'625'},{letter:'C',text:'675'},{letter:'D',text:'600'}],ans:'A',sol:'**Find number of terms: 50 - 2*n* = 2**\n```\n48 = 2(*n* - 1)\n*n* = 25\n```\n\n**Calculate sum.**\n```\n*S*₂₅ = (25/2)(50 + 2)\n     = 12.5(52)\n     = 650\n```'},

  {pos:47,diff:'hard',text:'In a geometric sequence, the product of the first 3 terms is 1728. If the second term is 12, find the first term.',ch:[{letter:'A',text:'6'},{letter:'B',text:'4'},{letter:'C',text:'8'},{letter:'D',text:'3'}],ans:'A',sol:'**Product: *a*₁ · *a*₂ · *a*₃ = 1728**\n```\n*a*₁ · 12 · (*a*₁*r*²) = 1728\nSince *a*₂ = *a*₁*r* = 12\n*a*₁² · *r*³ = 1728/12 = 144\n```\n\n**Also *a*₃ = 12*r*, so:**\n```\n*a*₁ · 12 · 12*r* = 1728\n*a*₁ · 144*r* = 1728\nBut *a*₁*r* = 12\nSo *a*₁ · 144*r* = *a*₁*r* · 144 = 12 · 144 = 1728 ✓\n```\n\n**Try *a*₁ = 6:**\n```\n*r* = 12/6 = 2\n*a*₃ = 6 · 2² = 24\nProduct = 6 · 12 · 24 = 1728 ✓\n```'},

  {pos:48,diff:'hard',text:'The arithmetic mean of two numbers is 15 and one number is 3 more than the other. Find the larger number.',ch:[{letter:'A',text:'16.5'},{letter:'B',text:'18'},{letter:'C',text:'15'},{letter:'D',text:'17'}],ans:'A',sol:'**Let numbers be *x* and *x* + 3.**\n```\n(*x* + *x* + 3)/2 = 15\n2*x* + 3 = 30\n2*x* = 27\n*x* = 13.5\n```\n\n**Larger number:**\n```\n13.5 + 3 = 16.5\n```'},

  {pos:49,diff:'hard',text:'Find the value of *k* if 3, *k*, 12 form a geometric sequence.',ch:[{letter:'A',text:'6'},{letter:'B',text:'9'},{letter:'C',text:'7.5'},{letter:'D',text:'8'}],ans:'A',sol:'**In geometric sequence: *k*² = 3 · 12**\n```\n*k*² = 36\n*k* = 6 (taking positive)\n```'},

  {pos:50,diff:'hard',text:'The sum of the first *n* natural numbers is 210. Find *n*.',ch:[{letter:'A',text:'20'},{letter:'B',text:'21'},{letter:'C',text:'19'},{letter:'D',text:'18'}],ans:'A',sol:'**Use *n*(*n* + 1)/2 = 210**\n```\n*n*(*n* + 1) = 420\n*n*² + *n* - 420 = 0\n(*n* - 20)(*n* + 21) = 0\n*n* = 20\n```'},
];

async function insertQuestions() {
  const lessonResult = await supabase
    .from('lessons')
    .select('id')
    .eq('lesson_key', LESSON_KEY)
    .single();

  if (!lessonResult.data) {
    console.error('Sequences lesson not found');
    return;
  }

  const lessonUUID = lessonResult.data.id;

  console.log('=== DELETING OLD SEQUENCES QUESTIONS ===\n');
  await supabase
    .from('practice_questions')
    .delete()
    .eq('lesson_id', lessonUUID);
  console.log('✅ Deleted\n');

  console.log('=== INSERTING 50 SEQUENCES QUESTIONS ===\n');

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
        title: `Sequences Question ${q.pos}`,
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
