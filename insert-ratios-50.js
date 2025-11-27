require('dotenv').config();
const { createClient } = require('@supabase/supabase-js');

const supabase = createClient(
  'https://rabavobdklnwvwsldbix.supabase.co',
  process.env.SUPABASE_SERVICE_ROLE_KEY
);

const LESSON_KEY = '5.3';

const questions = [
  // ALL HARD DIFFICULTY (1-50)
  {pos:1,diff:'hard',text:'If the ratio of *x* to *y* is 3:5 and *y* = 20, what is *x*?',ch:[{letter:'A',text:'12'},{letter:'B',text:'15'},{letter:'C',text:'10'},{letter:'D',text:'18'}],ans:'A',sol:'**Set up proportion.**\n```\n*x*/*y* = 3/5\n*x*/20 = 3/5\n*x* = 12\n```'},

  {pos:2,diff:'hard',text:'Two numbers are in the ratio 4:7. If their sum is 88, what is the larger number?',ch:[{letter:'A',text:'56'},{letter:'B',text:'32'},{letter:'C',text:'49'},{letter:'D',text:'63'}],ans:'A',sol:'**Let numbers be 4*k* and 7*k*.**\n```\n4*k* + 7*k* = 88\n11*k* = 88\n*k* = 8\nLarger = 7(8) = 56\n```'},

  {pos:3,diff:'hard',text:'If 5*x* = 3*y*, what is the ratio *x*:*y*?',ch:[{letter:'A',text:'3:5'},{letter:'B',text:'5:3'},{letter:'C',text:'2:3'},{letter:'D',text:'3:2'}],ans:'A',sol:'**Solve for ratio.**\n```\n5*x* = 3*y*\n*x*/*y* = 3/5\nRatio is 3:5\n```'},

  {pos:4,diff:'hard',text:'A recipe calls for ingredients in ratio 2:3:5. If the total is 40 cups, how many cups of the third ingredient?',ch:[{letter:'A',text:'20'},{letter:'B',text:'15'},{letter:'C',text:'12'},{letter:'D',text:'8'}],ans:'A',sol:'**Find total parts.**\n```\nTotal parts = 2+3+5 = 10\nThird ingredient = (5/10) × 40 = 20\n```'},

  {pos:5,diff:'hard',text:'If *a*:*b* = 2:3 and *b*:*c* = 4:5, what is *a*:*c*?',ch:[{letter:'A',text:'8:15'},{letter:'B',text:'2:5'},{letter:'C',text:'6:15'},{letter:'D',text:'4:15'}],ans:'A',sol:'**Find common *b* value.**\n```\n*a*:*b* = 2:3 = 8:12\n*b*:*c* = 4:5 = 12:15\n*a*:*c* = 8:15\n```'},

  {pos:6,diff:'hard',text:'Two numbers have ratio 5:8. If the first is 30, what is the second?',ch:[{letter:'A',text:'48'},{letter:'B',text:'40'},{letter:'C',text:'45'},{letter:'D',text:'50'}],ans:'A',sol:'**Set up proportion.**\n```\n30/*y* = 5/8\n*y* = 30 × 8/5 = 48\n```'},

  {pos:7,diff:'hard',text:'A class has boys and girls in ratio 3:5. If there are 15 boys, how many girls?',ch:[{letter:'A',text:'25'},{letter:'B',text:'20'},{letter:'C',text:'30'},{letter:'D',text:'18'}],ans:'A',sol:'**Set up proportion.**\n```\n15/*g* = 3/5\n*g* = 15 × 5/3 = 25\n```'},

  {pos:8,diff:'hard',text:'If *x*:*y* = 2:5 and *x* = 14, what is *x* + *y*?',ch:[{letter:'A',text:'49'},{letter:'B',text:'35'},{letter:'C',text:'42'},{letter:'D',text:'56'}],ans:'A',sol:'**Find *y* first.**\n```\n14/*y* = 2/5\n*y* = 35\n*x* + *y* = 14 + 35 = 49\n```'},

  {pos:9,diff:'hard',text:'Two quantities in ratio 7:12 have a difference of 30. What is the smaller quantity?',ch:[{letter:'A',text:'42'},{letter:'B',text:'35'},{letter:'C',text:'49'},{letter:'D',text:'72'}],ans:'A',sol:'**Set up equation.**\n```\n12*k* - 7*k* = 30\n5*k* = 30\n*k* = 6\nSmaller = 7(6) = 42\n```'},

  {pos:10,diff:'hard',text:'If 3*a* = 4*b*, what is *a*:*b*?',ch:[{letter:'A',text:'4:3'},{letter:'B',text:'3:4'},{letter:'C',text:'1:1'},{letter:'D',text:'12:12'}],ans:'A',sol:'**Solve for ratio.**\n```\n3*a* = 4*b*\n*a*/*b* = 4/3\nRatio is 4:3\n```'},

  {pos:11,diff:'hard',text:'A mixture has components in ratio 1:2:3. If the first component is 5 kg, what is the total mass?',ch:[{letter:'A',text:'30 kg'},{letter:'B',text:'25 kg'},{letter:'C',text:'20 kg'},{letter:'D',text:'35 kg'}],ans:'A',sol:'**Scale up ratio.**\n```\nIf first = 5, then *k* = 5\nTotal = 1(5) + 2(5) + 3(5)\n     = 5 + 10 + 15\n     = 30 kg\n```'},

  {pos:12,diff:'hard',text:'Two numbers are in ratio 5:9. If their difference is 24, what is their sum?',ch:[{letter:'A',text:'84'},{letter:'B',text:'72'},{letter:'C',text:'90'},{letter:'D',text:'96'}],ans:'A',sol:'**Find multiplier.*\n```\n9*k* - 5*k* = 24\n4*k* = 24\n*k* = 6\nSum = 5(6) + 9(6) = 30 + 54 = 84\n```'},

  {pos:13,diff:'hard',text:'If *x*:*y*:*z* = 2:3:4 and *z* = 20, what is *x*?',ch:[{letter:'A',text:'10'},{letter:'B',text:'8'},{letter:'C',text:'12'},{letter:'D',text:'15'}],ans:'A',sol:'**Find multiplier.**\n```\n4*k* = 20\n*k* = 5\n*x* = 2(5) = 10\n```'},

  {pos:14,diff:'hard',text:'A rope is cut in ratio 3:7. If the longer piece is 35 m, what was the original length?',ch:[{letter:'A',text:'50 m'},{letter:'B',text:'45 m'},{letter:'C',text:'40 m'},{letter:'D',text:'60 m'}],ans:'A',sol:'**Find total.**\n```\n7*k* = 35\n*k* = 5\nTotal = 3(5) + 7(5) = 15 + 35 = 50 m\n```'},

  {pos:15,diff:'hard',text:'If *a*:*b* = 3:4 and *a* + *b* = 42, what is *b*?',ch:[{letter:'A',text:'24'},{letter:'B',text:'18'},{letter:'C',text:'28'},{letter:'D',text:'21'}],ans:'A',sol:'**Set up equation.**\n```\n3*k* + 4*k* = 42\n7*k* = 42\n*k* = 6\n*b* = 4(6) = 24\n```'},

  {pos:16,diff:'hard',text:'Three numbers in ratio 4:5:6 have sum 75. What is the middle number?',ch:[{letter:'A',text:'25'},{letter:'B',text:'20'},{letter:'C',text:'30'},{letter:'D',text:'15'}],ans:'A',sol:'**Find multiplier.**\n```\n4*k* + 5*k* + 6*k* = 75\n15*k* = 75\n*k* = 5\nMiddle = 5(5) = 25\n```'},

  {pos:17,diff:'hard',text:'If 2*x* = 5*y* and *x* = 15, what is *y*?',ch:[{letter:'A',text:'6'},{letter:'B',text:'7.5'},{letter:'C',text:'5'},{letter:'D',text:'10'}],ans:'A',sol:'**Solve for *y*.**\n```\n2(15) = 5*y*\n30 = 5*y*\n*y* = 6\n```'},

  {pos:18,diff:'hard',text:'A solution contains water and acid in ratio 5:2. If there are 14 liters of acid, how much water?',ch:[{letter:'A',text:'35 L'},{letter:'B',text:'28 L'},{letter:'C',text:'42 L'},{letter:'D',text:'30 L'}],ans:'A',sol:'**Set up proportion.**\n```\n*w*/14 = 5/2\n*w* = 14 × 5/2 = 35 L\n```'},

  {pos:19,diff:'hard',text:'If *x*:*y* = 7:11 and *y* = 55, what is *x*?',ch:[{letter:'A',text:'35'},{letter:'B',text:'42'},{letter:'C',text:'28'},{letter:'D',text:'49'}],ans:'A',sol:'**Set up proportion.**\n```\n*x*/55 = 7/11\n*x* = 55 × 7/11 = 35\n```'},

  {pos:20,diff:'hard',text:'Two numbers in ratio 8:13 have sum 105. What is the smaller number?',ch:[{letter:'A',text:'40'},{letter:'B',text:'48'},{letter:'C',text:'35'},{letter:'D',text:'56'}],ans:'A',sol:'**Find multiplier.**\n```\n8*k* + 13*k* = 105\n21*k* = 105\n*k* = 5\nSmaller = 8(5) = 40\n```'},

  {pos:21,diff:'hard',text:'If *a*:*b*:*c* = 1:2:5 and *b* = 10, what is *a* + *c*?',ch:[{letter:'A',text:'30'},{letter:'B',text:'25'},{letter:'C',text:'35'},{letter:'D',text:'28'}],ans:'A',sol:'**Find multiplier.**\n```\n2*k* = 10\n*k* = 5\n*a* = 1(5) = 5\n*c* = 5(5) = 25\n*a* + *c* = 5 + 25 = 30\n```'},

  {pos:22,diff:'hard',text:'A bag contains red and blue marbles in ratio 3:7. If there are 60 marbles total, how many are red?',ch:[{letter:'A',text:'18'},{letter:'B',text:'21'},{letter:'C',text:'15'},{letter:'D',text:'24'}],ans:'A',sol:'**Find red marbles.**\n```\nRed = (3/10) × 60 = 18\n```'},

  {pos:23,diff:'hard',text:'If *m*:*n* = 5:8 and *m* = 40, what is *m* - *n*?',ch:[{letter:'A',text:'-24'},{letter:'B',text:'24'},{letter:'C',text:'-16'},{letter:'D',text:'16'}],ans:'A',sol:'**Find *n* first.**\n```\n40/*n* = 5/8\n*n* = 64\n*m* - *n* = 40 - 64 = -24\n```'},

  {pos:24,diff:'hard',text:'Three angles of a triangle are in ratio 2:3:4. What is the largest angle in degrees?',ch:[{letter:'A',text:'80°'},{letter:'B',text:'60°'},{letter:'C',text:'90°'},{letter:'D',text:'72°'}],ans:'A',sol:'**Angles sum to 180°.**\n```\n2*k* + 3*k* + 4*k* = 180\n9*k* = 180\n*k* = 20\nLargest = 4(20) = 80°\n```'},

  {pos:25,diff:'hard',text:'If *p*:*q* = 4:9 and *p* + *q* = 65, what is *p*?',ch:[{letter:'A',text:'20'},{letter:'B',text:'25'},{letter:'C',text:'36'},{letter:'D',text:'15'}],ans:'A',sol:'**Set up equation.**\n```\n4*k* + 9*k* = 65\n13*k* = 65\n*k* = 5\n*p* = 4(5) = 20\n```'},

  {pos:26,diff:'hard',text:'A map has scale 1:50000. If two cities are 3 cm apart on the map, what is the actual distance in km?',ch:[{letter:'A',text:'1.5 km'},{letter:'B',text:'1 km'},{letter:'C',text:'2 km'},{letter:'D',text:'2.5 km'}],ans:'A',sol:'**Scale up distance.**\n```\nActual = 3 × 50000 cm\n      = 150000 cm\n      = 1500 m\n      = 1.5 km\n```'},

  {pos:27,diff:'hard',text:'If 7*a* = 9*b* and *a* = 36, what is *b*?',ch:[{letter:'A',text:'28'},{letter:'B',text:'32'},{letter:'C',text:'24'},{letter:'D',text:'27'}],ans:'A',sol:'**Solve for *b*.**\n```\n7(36) = 9*b*\n252 = 9*b*\n*b* = 28\n```'},

  {pos:28,diff:'hard',text:'Two numbers are in ratio 6:11. If the larger is 77, what is the smaller?',ch:[{letter:'A',text:'42'},{letter:'B',text:'36'},{letter:'C',text:'48'},{letter:'D',text:'54'}],ans:'A',sol:'**Set up proportion.**\n```\n*x*/77 = 6/11\n*x* = 77 × 6/11 = 42\n```'},

  {pos:29,diff:'hard',text:'If *x*:*y*:*z* = 3:5:7 and *x* + *y* + *z* = 90, what is *y*?',ch:[{letter:'A',text:'30'},{letter:'B',text:'35'},{letter:'C',text:'18'},{letter:'D',text:'42'}],ans:'A',sol:'**Find multiplier.**\n```\n3*k* + 5*k* + 7*k* = 90\n15*k* = 90\n*k* = 6\n*y* = 5(6) = 30\n```'},

  {pos:30,diff:'hard',text:'A metal alloy has copper and zinc in ratio 5:3. How many kg of copper in 64 kg of alloy?',ch:[{letter:'A',text:'40 kg'},{letter:'B',text:'32 kg'},{letter:'C',text:'35 kg'},{letter:'D',text:'48 kg'}],ans:'A',sol:'**Find copper fraction.**\n```\nCopper = (5/8) × 64 = 40 kg\n```'},

  {pos:31,diff:'hard',text:'If *a*:*b* = 2:7 and *a*:*c* = 3:5, what is *b*:*c*?',ch:[{letter:'A',text:'21:10'},{letter:'B',text:'14:15'},{letter:'C',text:'10:21'},{letter:'D',text:'7:5'}],ans:'A',sol:'**Find common *a* value.**\n```\n*a*:*b* = 2:7 = 6:21\n*a*:*c* = 3:5 = 6:10\n*b*:*c* = 21:10\n```'},

  {pos:32,diff:'hard',text:'Two quantities in ratio 9:16 differ by 42. What is the larger quantity?',ch:[{letter:'A',text:'96'},{letter:'B',text:'84'},{letter:'C',text:'108'},{letter:'D',text:'72'}],ans:'A',sol:'**Set up equation.**\n```\n16*k* - 9*k* = 42\n7*k* = 42\n*k* = 6\nLarger = 16(6) = 96\n```'},

  {pos:33,diff:'hard',text:'If *x*:*y* = 1:4 and *x* = 7, what is 2*x* + *y*?',ch:[{letter:'A',text:'42'},{letter:'B',text:'35'},{letter:'C',text:'49'},{letter:'D',text:'38'}],ans:'A',sol:'**Find *y* first.**\n```\n7/*y* = 1/4\n*y* = 28\n2*x* + *y* = 2(7) + 28 = 42\n```'},

  {pos:34,diff:'hard',text:'A rectangle has length to width ratio 5:3. If the perimeter is 64 cm, what is the length?',ch:[{letter:'A',text:'20 cm'},{letter:'B',text:'25 cm'},{letter:'C',text:'15 cm'},{letter:'D',text:'18 cm'}],ans:'A',sol:'**Set up perimeter equation.**\n```\n2(5*k*) + 2(3*k*) = 64\n10*k* + 6*k* = 64\n16*k* = 64\n*k* = 4\nLength = 5(4) = 20 cm\n```'},

  {pos:35,diff:'hard',text:'If 4*m* = 7*n* and *m* = 21, what is *n*?',ch:[{letter:'A',text:'12'},{letter:'B',text:'14'},{letter:'C',text:'16'},{letter:'D',text:'15'}],ans:'A',sol:'**Solve for *n*.**\n```\n4(21) = 7*n*\n84 = 7*n*\n*n* = 12\n```'},

  {pos:36,diff:'hard',text:'Three partners invest in ratio 2:5:8. If the total investment is $75000, how much did the second partner invest?',ch:[{letter:'A',text:'$25000'},{letter:'B',text:'$30000'},{letter:'C',text:'$20000'},{letter:'D',text:'$15000'}],ans:'A',sol:'**Find second partner share.**\n```\nSecond = (5/15) × 75000 = 25000\n```'},

  {pos:37,diff:'hard',text:'If *a*:*b* = 3:8 and *b* = 72, what is *a*?',ch:[{letter:'A',text:'27'},{letter:'B',text:'24'},{letter:'C',text:'32'},{letter:'D',text:'36'}],ans:'A',sol:'**Set up proportion.**\n```\n*a*/72 = 3/8\n*a* = 72 × 3/8 = 27\n```'},

  {pos:38,diff:'hard',text:'Two numbers in ratio 7:13 have sum 100. What is the difference?',ch:[{letter:'A',text:'30'},{letter:'B',text:'25'},{letter:'C',text:'35'},{letter:'D',text:'20'}],ans:'A',sol:'**Find multiplier.**\n```\n7*k* + 13*k* = 100\n20*k* = 100\n*k* = 5\nDifference = 13(5) - 7(5) = 65 - 35 = 30\n```'},

  {pos:39,diff:'hard',text:'If *x*:*y*:*z* = 4:7:9 and *z* = 63, what is *x* + *y*?',ch:[{letter:'A',text:'77'},{letter:'B',text:'63'},{letter:'C',text:'84'},{letter:'D',text:'70'}],ans:'A',sol:'**Find multiplier.**\n```\n9*k* = 63\n*k* = 7\n*x* = 4(7) = 28\n*y* = 7(7) = 49\n*x* + *y* = 28 + 49 = 77\n```'},

  {pos:40,diff:'hard',text:'A speed ratio of two cars is 4:5. If the slower car travels at 60 km/h, what is the faster car speed?',ch:[{letter:'A',text:'75 km/h'},{letter:'B',text:'80 km/h'},{letter:'C',text:'70 km/h'},{letter:'D',text:'72 km/h'}],ans:'A',sol:'**Set up proportion.**\n```\n60/*v* = 4/5\n*v* = 60 × 5/4 = 75 km/h\n```'},

  {pos:41,diff:'hard',text:'If 5*x* = 8*y* and *x* = 32, what is *y*?',ch:[{letter:'A',text:'20'},{letter:'B',text:'25'},{letter:'C',text:'16'},{letter:'D',text:'24'}],ans:'A',sol:'**Solve for *y*.**\n```\n5(32) = 8*y*\n160 = 8*y*\n*y* = 20\n```'},

  {pos:42,diff:'hard',text:'A mixture has ingredients in ratio 1:3:5. If total mass is 81 kg, what is the mass of the largest ingredient?',ch:[{letter:'A',text:'45 kg'},{letter:'B',text:'40 kg'},{letter:'C',text:'50 kg'},{letter:'D',text:'35 kg'}],ans:'A',sol:'**Find largest ingredient.**\n```\nLargest = (5/9) × 81 = 45 kg\n```'},

  {pos:43,diff:'hard',text:'If *m*:*n* = 11:17 and *m* = 55, what is *n*?',ch:[{letter:'A',text:'85'},{letter:'B',text:'68'},{letter:'C',text:'77'},{letter:'D',text:'102'}],ans:'A',sol:'**Set up proportion.**\n```\n55/*n* = 11/17\n*n* = 55 × 17/11 = 85\n```'},

  {pos:44,diff:'hard',text:'Two angles are supplementary and in ratio 5:7. What is the smaller angle?',ch:[{letter:'A',text:'75°'},{letter:'B',text:'60°'},{letter:'C',text:'90°'},{letter:'D',text:'105°'}],ans:'A',sol:'**Supplementary sum to 180°.**\n```\n5*k* + 7*k* = 180\n12*k* = 180\n*k* = 15\nSmaller = 5(15) = 75°\n```'},

  {pos:45,diff:'hard',text:'If *a*:*b*:*c* = 2:4:9 and *c* = 54, what is *a* + *b*?',ch:[{letter:'A',text:'36'},{letter:'B',text:'30'},{letter:'C',text:'42'},{letter:'D',text:'48'}],ans:'A',sol:'**Find multiplier.**\n```\n9*k* = 54\n*k* = 6\n*a* = 2(6) = 12\n*b* = 4(6) = 24\n*a* + *b* = 12 + 24 = 36\n```'},

  {pos:46,diff:'hard',text:'Two numbers in ratio 3:10 have product 480. What is the smaller number?',ch:[{letter:'A',text:'12'},{letter:'B',text:'15'},{letter:'C',text:'10'},{letter:'D',text:'18'}],ans:'A',sol:'**Set up equation.**\n```\n3*k* × 10*k* = 480\n30*k*² = 480\n*k*² = 16\n*k* = 4\nSmaller = 3(4) = 12\n```'},

  {pos:47,diff:'hard',text:'If *x*:*y* = 2:9 and *y* - *x* = 35, what is *x*?',ch:[{letter:'A',text:'10'},{letter:'B',text:'14'},{letter:'C',text:'7'},{letter:'D',text:'8'}],ans:'A',sol:'**Set up equation.**\n```\n9*k* - 2*k* = 35\n7*k* = 35\n*k* = 5\n*x* = 2(5) = 10\n```'},

  {pos:48,diff:'hard',text:'A scale model has ratio 1:200. If the model is 15 cm tall, what is the actual height in meters?',ch:[{letter:'A',text:'30 m'},{letter:'B',text:'25 m'},{letter:'C',text:'20 m'},{letter:'D',text:'35 m'}],ans:'A',sol:'**Scale up.**\n```\nActual = 15 × 200 cm\n      = 3000 cm\n      = 30 m\n```'},

  {pos:49,diff:'hard',text:'If 9*p* = 11*q* and *p* = 44, what is *q*?',ch:[{letter:'A',text:'36'},{letter:'B',text:'40'},{letter:'C',text:'33'},{letter:'D',text:'48'}],ans:'A',sol:'**Solve for *q*.**\n```\n9(44) = 11*q*\n396 = 11*q*\n*q* = 36\n```'},

  {pos:50,diff:'hard',text:'Three sides of a triangle are in ratio 5:12:13. If the perimeter is 120 cm, what is the shortest side?',ch:[{letter:'A',text:'20 cm'},{letter:'B',text:'25 cm'},{letter:'C',text:'15 cm'},{letter:'D',text:'30 cm'}],ans:'A',sol:'**Find multiplier.**\n```\n5*k* + 12*k* + 13*k* = 120\n30*k* = 120\n*k* = 4\nShortest = 5(4) = 20 cm\n```'},
];

async function insertQuestions() {
  const lessonResult = await supabase
    .from('lessons')
    .select('id')
    .eq('lesson_key', LESSON_KEY)
    .single();

  if (!lessonResult.data) {
    console.error('Ratios lesson not found');
    return;
  }

  const lessonUUID = lessonResult.data.id;

  console.log('=== DELETING OLD RATIOS QUESTIONS ===\n');
  await supabase
    .from('practice_questions')
    .delete()
    .eq('lesson_id', lessonUUID);
  console.log('✅ Deleted\n');

  console.log('=== INSERTING 50 RATIOS QUESTIONS (ALL HARD) ===\n');

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
        title: `Ratios Question ${q.pos}`,
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
