require('dotenv').config();
const { createClient } = require('@supabase/supabase-js');

const supabase = createClient(
  'https://rabavobdklnwvwsldbix.supabase.co',
  process.env.SUPABASE_SERVICE_ROLE_KEY
);

const LESSON_KEY = '5.2';

const questions = [
  // ALL HARD DIFFICULTY (1-50)
  {pos:1,diff:'hard',text:'A store increases prices by 25% then offers a 20% discount. What is the net percent change?',ch:[{letter:'A',text:'0% increase'},{letter:'B',text:'5% decrease'},{letter:'C',text:'5% increase'},{letter:'D',text:'No change'}],ans:'A',sol:'**Calculate final price.**\n```\nStart: 100\nAfter 25% increase: 125\nAfter 20% discount: 125 × 0.8 = 100\nNet change: 0%\n```'},

  {pos:2,diff:'hard',text:'If 30% of *x* equals 45% of *y*, what percent of *x* is *y*?',ch:[{letter:'A',text:'66⅔%'},{letter:'B',text:'150%'},{letter:'C',text:'75%'},{letter:'D',text:'133⅓%'}],ans:'A',sol:'**Set up equation.**\n```\n0.3*x* = 0.45*y*\n*y*/*x* = 0.3/0.45 = 2/3\n*y* = (2/3)*x* = 66⅔% of *x*\n```'},

  {pos:3,diff:'hard',text:'A population decreased by 20% then increased by 20%. What is the overall percent change?',ch:[{letter:'A',text:'4% decrease'},{letter:'B',text:'No change'},{letter:'C',text:'4% increase'},{letter:'D',text:'2% decrease'}],ans:'A',sol:'**Calculate final value.**\n```\nStart: 100\nAfter -20%: 80\nAfter +20%: 80 × 1.2 = 96\nChange: 96 - 100 = -4%\n```'},

  {pos:4,diff:'hard',text:'If *x* is 40% less than *y*, then *y* is what percent more than *x*?',ch:[{letter:'A',text:'66⅔%'},{letter:'B',text:'40%'},{letter:'C',text:'60%'},{letter:'D',text:'150%'}],ans:'A',sol:'**Set up relationship.**\n```\n*x* = 0.6*y*\n*y* = *x*/0.6 = (5/3)*x*\n*y* is 5/3 - 1 = 2/3 = 66⅔% more\n```'},

  {pos:5,diff:'hard',text:'A number is increased by 50%, then decreased by 50%. What percent of the original is the result?',ch:[{letter:'A',text:'75%'},{letter:'B',text:'100%'},{letter:'C',text:'50%'},{letter:'D',text:'25%'}],ans:'A',sol:'**Track changes.**\n```\nStart: 100\nAfter +50%: 150\nAfter -50%: 75\nResult is 75% of original\n```'},

  {pos:6,diff:'hard',text:'If a price increased from $80 to $100, what was the percent increase?',ch:[{letter:'A',text:'25%'},{letter:'B',text:'20%'},{letter:'C',text:'30%'},{letter:'D',text:'15%'}],ans:'A',sol:'**Calculate percent change.**\n```\nChange = 100 - 80 = 20\nPercent = 20/80 = 1/4 = 25%\n```'},

  {pos:7,diff:'hard',text:'What number is 150% of 60?',ch:[{letter:'A',text:'90'},{letter:'B',text:'40'},{letter:'C',text:'100'},{letter:'D',text:'120'}],ans:'A',sol:'**Multiply.**\n```\n1.5 × 60 = 90\n```'},

  {pos:8,diff:'hard',text:'If 35% of a number is 70, what is the number?',ch:[{letter:'A',text:'200'},{letter:'B',text:'245'},{letter:'C',text:'100'},{letter:'D',text:'175'}],ans:'A',sol:'**Divide by percent.**\n```\n*n* = 70 / 0.35\n  = 200\n```'},

  {pos:9,diff:'hard',text:'A shirt originally $50 is on sale for $35. What is the percent discount?',ch:[{letter:'A',text:'30%'},{letter:'B',text:'15%'},{letter:'C',text:'25%'},{letter:'D',text:'20%'}],ans:'A',sol:'**Calculate discount.**\n```\nDiscount = 50 - 35 = 15\nPercent = 15/50 = 30%\n```'},

  {pos:10,diff:'hard',text:'If 80% of students passed, what percent failed?',ch:[{letter:'A',text:'20%'},{letter:'B',text:'25%'},{letter:'C',text:'15%'},{letter:'D',text:'10%'}],ans:'A',sol:'**Subtract from 100%.**\n```\n100% - 80% = 20%\n```'},

  {pos:11,diff:'hard',text:'A stock price increased 50% Monday and decreased 50% Tuesday. What is the Tuesday closing price if Monday opening was $40?',ch:[{letter:'A',text:'$30'},{letter:'B',text:'$40'},{letter:'C',text:'$20'},{letter:'D',text:'$35'}],ans:'A',sol:'**Apply changes sequentially.**\n```\nMonday close: 40 × 1.5 = 60\nTuesday close: 60 × 0.5 = 30\n```'},

  {pos:12,diff:'hard',text:'If a quantity doubles, what is the percent increase?',ch:[{letter:'A',text:'100%'},{letter:'B',text:'200%'},{letter:'C',text:'50%'},{letter:'D',text:'150%'}],ans:'A',sol:'**Calculate increase.**\n```\nChange = 2*n* - *n* = *n*\nPercent = *n*/*n* = 100%\n```'},

  {pos:13,diff:'hard',text:'What is 12.5% expressed as a fraction in lowest terms?',ch:[{letter:'A',text:'1/8'},{letter:'B',text:'1/10'},{letter:'C',text:'1/12'},{letter:'D',text:'1/9'}],ans:'A',sol:'**Convert to fraction.**\n```\n12.5% = 12.5/100\n      = 125/1000\n      = 1/8\n```'},

  {pos:14,diff:'hard',text:'If 60% of 90 equals 40% of *x*, what is *x*?',ch:[{letter:'A',text:'135'},{letter:'B',text:'120'},{letter:'C',text:'150'},{letter:'D',text:'108'}],ans:'A',sol:'**Solve equation.**\n```\n0.6 × 90 = 0.4*x*\n54 = 0.4*x*\n*x* = 135\n```'},

  {pos:15,diff:'hard',text:'A value increased from 75 to 90. What was the percent increase?',ch:[{letter:'A',text:'20%'},{letter:'B',text:'15%'},{letter:'C',text:'25%'},{letter:'D',text:'16⅔%'}],ans:'A',sol:'**Calculate percent change.**\n```\nChange = 90 - 75 = 15\nPercent = 15/75 = 1/5 = 20%\n```'},

  {pos:16,diff:'hard',text:'If a price decreased by 25%, by what percent must it increase to return to the original price?',ch:[{letter:'A',text:'33⅓%'},{letter:'B',text:'25%'},{letter:'C',text:'50%'},{letter:'D',text:'20%'}],ans:'A',sol:'**Calculate required increase.**\n```\nAfter -25%: 0.75*P*\nNeed: 0.75*P* × *r* = *P*\n*r* = 1/0.75 = 4/3\nIncrease = 4/3 - 1 = 1/3 = 33⅓%\n```'},

  {pos:17,diff:'hard',text:'What percent of 120 is 30?',ch:[{letter:'A',text:'25%'},{letter:'B',text:'20%'},{letter:'C',text:'30%'},{letter:'D',text:'15%'}],ans:'A',sol:'**Divide and convert.**\n```\n30/120 = 1/4 = 25%\n```'},

  {pos:18,diff:'hard',text:'A car depreciates 15% each year. After 2 years, what percent of the original value remains?',ch:[{letter:'A',text:'72.25%'},{letter:'B',text:'70%'},{letter:'C',text:'85%'},{letter:'D',text:'75%'}],ans:'A',sol:'**Apply depreciation twice.**\n```\nAfter year 1: 85%\nAfter year 2: 0.85 × 0.85 = 0.7225 = 72.25%\n```'},

  {pos:19,diff:'hard',text:'If *a* is 25% of *b*, and *b* is 40% of *c*, what percent of *c* is *a*?',ch:[{letter:'A',text:'10%'},{letter:'B',text:'15%'},{letter:'C',text:'16%'},{letter:'D',text:'12.5%'}],ans:'A',sol:'**Multiply percentages.**\n```\n*a* = 0.25*b*\n*b* = 0.4*c*\n*a* = 0.25 × 0.4*c* = 0.1*c* = 10% of *c*\n```'},

  {pos:20,diff:'hard',text:'A number decreased by 60% equals 20. What is the number?',ch:[{letter:'A',text:'50'},{letter:'B',text:'32'},{letter:'C',text:'80'},{letter:'D',text:'40'}],ans:'A',sol:'**Set up equation.**\n```\n*n* - 0.6*n* = 20\n0.4*n* = 20\n*n* = 50\n```'},

  {pos:21,diff:'hard',text:'A store marks up items 60% above cost. If an item sells for $80, what was the cost?',ch:[{letter:'A',text:'$50'},{letter:'B',text:'$48'},{letter:'C',text:'$55'},{letter:'D',text:'$60'}],ans:'A',sol:'**Reverse markup.**\n```\n1.6*C* = 80\n*C* = 80/1.6 = 50\n```'},

  {pos:22,diff:'hard',text:'If 75% of a class passed and 18 students failed, how many students total?',ch:[{letter:'A',text:'72'},{letter:'B',text:'64'},{letter:'C',text:'80'},{letter:'D',text:'90'}],ans:'A',sol:'**Set up equation.**\n```\n25% of total = 18\n0.25*n* = 18\n*n* = 72\n```'},

  {pos:23,diff:'hard',text:'What is 37.5% as a fraction in simplest form?',ch:[{letter:'A',text:'3/8'},{letter:'B',text:'2/5'},{letter:'C',text:'1/3'},{letter:'D',text:'5/12'}],ans:'A',sol:'**Convert to fraction.**\n```\n37.5% = 37.5/100\n      = 375/1000\n      = 3/8\n```'},

  {pos:24,diff:'hard',text:'A population of 8000 increased to 10000. What was the percent increase?',ch:[{letter:'A',text:'25%'},{letter:'B',text:'20%'},{letter:'C',text:'30%'},{letter:'D',text:'15%'}],ans:'A',sol:'**Calculate percent change.**\n```\nChange = 10000 - 8000 = 2000\nPercent = 2000/8000 = 1/4 = 25%\n```'},

  {pos:25,diff:'hard',text:'If *x* increased by 120% equals 110, what is *x*?',ch:[{letter:'A',text:'50'},{letter:'B',text:'55'},{letter:'C',text:'45'},{letter:'D',text:'60'}],ans:'A',sol:'**Set up equation.**\n```\n*x* + 1.2*x* = 110\n2.2*x* = 110\n*x* = 50\n```'},

  {pos:26,diff:'hard',text:'A solution is 30% alcohol. How many liters of pure alcohol are in 40 liters of solution?',ch:[{letter:'A',text:'12'},{letter:'B',text:'10'},{letter:'C',text:'14'},{letter:'D',text:'15'}],ans:'A',sol:'**Multiply by percent.**\n```\n0.3 × 40 = 12 liters\n```'},

  {pos:27,diff:'hard',text:'If a price increased 80% then decreased 40%, what is the net percent change from original?',ch:[{letter:'A',text:'8% increase'},{letter:'B',text:'10% increase'},{letter:'C',text:'40% increase'},{letter:'D',text:'No change'}],ans:'A',sol:'**Apply changes.**\n```\nStart: 100\nAfter +80%: 180\nAfter -40%: 180 × 0.6 = 108\nNet: 8% increase\n```'},

  {pos:28,diff:'hard',text:'What percent of 75 is 15?',ch:[{letter:'A',text:'20%'},{letter:'B',text:'25%'},{letter:'C',text:'15%'},{letter:'D',text:'30%'}],ans:'A',sol:'**Divide.**\n```\n15/75 = 1/5 = 20%\n```'},

  {pos:29,diff:'hard',text:'A value is increased by 25%, then the new value is increased by 25%. What is the total percent increase from the original?',ch:[{letter:'A',text:'56.25%'},{letter:'B',text:'50%'},{letter:'C',text:'62.5%'},{letter:'D',text:'60%'}],ans:'A',sol:'**Calculate compound increase.**\n```\nFinal = 100 × 1.25 × 1.25\n     = 156.25\nIncrease = 56.25%\n```'},

  {pos:30,diff:'hard',text:'If 40% of *x* is 16, what is 75% of *x*?',ch:[{letter:'A',text:'30'},{letter:'B',text:'28'},{letter:'C',text:'32'},{letter:'D',text:'36'}],ans:'A',sol:'**Find *x* first.**\n```\n0.4*x* = 16\n*x* = 40\n0.75 × 40 = 30\n```'},

  {pos:31,diff:'hard',text:'A jacket priced at $120 is discounted 25%, then an additional 10% off the sale price. What is the final price?',ch:[{letter:'A',text:'$81'},{letter:'B',text:'$84'},{letter:'C',text:'$78'},{letter:'D',text:'$90'}],ans:'A',sol:'**Apply discounts sequentially.**\n```\nAfter 25% off: 120 × 0.75 = 90\nAfter 10% off: 90 × 0.9 = 81\n```'},

  {pos:32,diff:'hard',text:'If a number is decreased by 75%, what percent is the result of the original?',ch:[{letter:'A',text:'25%'},{letter:'B',text:'20%'},{letter:'C',text:'30%'},{letter:'D',text:'15%'}],ans:'A',sol:'**Calculate remainder.**\n```\n100% - 75% = 25%\n```'},

  {pos:33,diff:'hard',text:'A factory increased production from 500 to 650 units. What is the percent increase?',ch:[{letter:'A',text:'30%'},{letter:'B',text:'25%'},{letter:'C',text:'35%'},{letter:'D',text:'20%'}],ans:'A',sol:'**Calculate percent change.**\n```\nChange = 650 - 500 = 150\nPercent = 150/500 = 3/10 = 30%\n```'},

  {pos:34,diff:'hard',text:'If 85% of a number is 170, what is 60% of that number?',ch:[{letter:'A',text:'120'},{letter:'B',text:'102'},{letter:'C',text:'136'},{letter:'D',text:'110'}],ans:'A',sol:'**Find the number first.**\n```\n0.85*n* = 170\n*n* = 200\n0.6 × 200 = 120\n```'},

  {pos:35,diff:'hard',text:'A price increased from $40 to $70. What is the percent increase?',ch:[{letter:'A',text:'75%'},{letter:'B',text:'42.9%'},{letter:'C',text:'50%'},{letter:'D',text:'60%'}],ans:'A',sol:'**Calculate percent change.**\n```\nChange = 70 - 40 = 30\nPercent = 30/40 = 3/4 = 75%\n```'},

  {pos:36,diff:'hard',text:'If a value decreased 20%, then increased 25%, what is the overall percent change?',ch:[{letter:'A',text:'0% (no net change)'},{letter:'B',text:'5% decrease'},{letter:'C',text:'5% increase'},{letter:'D',text:'2.5% increase'}],ans:'A',sol:'**Apply changes.**\n```\nStart: 100\nAfter -20%: 80\nAfter +25%: 80 × 1.25 = 100\nNet: 0%\n```'},

  {pos:37,diff:'hard',text:'What is 0.125 as a percent?',ch:[{letter:'A',text:'12.5%'},{letter:'B',text:'1.25%'},{letter:'C',text:'125%'},{letter:'D',text:'0.125%'}],ans:'A',sol:'**Multiply by 100.**\n```\n0.125 × 100 = 12.5%\n```'},

  {pos:38,diff:'hard',text:'If *x* is 30% of *y*, and *y* is 150, what is *x*?',ch:[{letter:'A',text:'45'},{letter:'B',text:'50'},{letter:'C',text:'40'},{letter:'D',text:'35'}],ans:'A',sol:'**Multiply.**\n```\n*x* = 0.3 × 150 = 45\n```'},

  {pos:39,diff:'hard',text:'A student scored 80% on a test worth 125 points. How many points did they score?',ch:[{letter:'A',text:'100'},{letter:'B',text:'105'},{letter:'C',text:'95'},{letter:'D',text:'90'}],ans:'A',sol:'**Multiply by percent.**\n```\n0.8 × 125 = 100 points\n```'},

  {pos:40,diff:'hard',text:'If a population decreased from 12000 to 9000, what is the percent decrease?',ch:[{letter:'A',text:'25%'},{letter:'B',text:'33.3%'},{letter:'C',text:'20%'},{letter:'D',text:'30%'}],ans:'A',sol:'**Calculate percent change.**\n```\nChange = 12000 - 9000 = 3000\nPercent = 3000/12000 = 1/4 = 25%\n```'},

  {pos:41,diff:'hard',text:'If an investment grows from $5000 to $6500, what is the percent gain?',ch:[{letter:'A',text:'30%'},{letter:'B',text:'23%'},{letter:'C',text:'25%'},{letter:'D',text:'35%'}],ans:'A',sol:'**Calculate percent change.**\n```\nGain = 6500 - 5000 = 1500\nPercent = 1500/5000 = 3/10 = 30%\n```'},

  {pos:42,diff:'hard',text:'What number is 225% of 40?',ch:[{letter:'A',text:'90'},{letter:'B',text:'80'},{letter:'C',text:'100'},{letter:'D',text:'85'}],ans:'A',sol:'**Multiply.**\n```\n2.25 × 40 = 90\n```'},

  {pos:43,diff:'hard',text:'If 16 is 20% of a number, what is the number?',ch:[{letter:'A',text:'80'},{letter:'B',text:'64'},{letter:'C',text:'100'},{letter:'D',text:'75'}],ans:'A',sol:'**Divide by percent.**\n```\n*n* = 16/0.2 = 80\n```'},

  {pos:44,diff:'hard',text:'A tax of 8% is added to a $50 purchase. What is the total cost?',ch:[{letter:'A',text:'$54'},{letter:'B',text:'$58'},{letter:'C',text:'$52'},{letter:'D',text:'$56'}],ans:'A',sol:'**Calculate total.**\n```\nTax = 50 × 0.08 = 4\nTotal = 50 + 4 = 54\n```'},

  {pos:45,diff:'hard',text:'If a $200 item is marked up 40% then discounted 25%, what is the final price?',ch:[{letter:'A',text:'$210'},{letter:'B',text:'$230'},{letter:'C',text:'$220'},{letter:'D',text:'$200'}],ans:'A',sol:'**Apply changes sequentially.**\n```\nAfter markup: 200 × 1.4 = 280\nAfter discount: 280 × 0.75 = 210\n```'},

  {pos:46,diff:'hard',text:'What percent of 240 is 60?',ch:[{letter:'A',text:'25%'},{letter:'B',text:'20%'},{letter:'C',text:'30%'},{letter:'D',text:'15%'}],ans:'A',sol:'**Divide.**\n```\n60/240 = 1/4 = 25%\n```'},

  {pos:47,diff:'hard',text:'If a quantity triples, what is the percent increase?',ch:[{letter:'A',text:'200%'},{letter:'B',text:'300%'},{letter:'C',text:'100%'},{letter:'D',text:'150%'}],ans:'A',sol:'**Calculate increase.**\n```\nChange = 3*n* - *n* = 2*n*\nPercent = 2*n*/*n* = 200%\n```'},

  {pos:48,diff:'hard',text:'A salary of $40000 increased to $50000. What is the percent raise?',ch:[{letter:'A',text:'25%'},{letter:'B',text:'20%'},{letter:'C',text:'30%'},{letter:'D',text:'15%'}],ans:'A',sol:'**Calculate percent change.**\n```\nRaise = 50000 - 40000 = 10000\nPercent = 10000/40000 = 1/4 = 25%\n```'},

  {pos:49,diff:'hard',text:'If 120% of *x* is 96, what is *x*?',ch:[{letter:'A',text:'80'},{letter:'B',text:'75'},{letter:'C',text:'85'},{letter:'D',text:'90'}],ans:'A',sol:'**Solve equation.**\n```\n1.2*x* = 96\n*x* = 96/1.2 = 80\n```'},

  {pos:50,diff:'hard',text:'A store offers 30% off everything, then an additional 10% off clearance items. What is the total discount on a clearance item?',ch:[{letter:'A',text:'37%'},{letter:'B',text:'40%'},{letter:'C',text:'33%'},{letter:'D',text:'35%'}],ans:'A',sol:'**Apply discounts sequentially.**\n```\nAfter 30% off: 70% remains\nAfter 10% off: 70% × 0.9 = 63%\nTotal discount = 100% - 63% = 37%\n```'},
];

async function insertQuestions() {
  const lessonResult = await supabase
    .from('lessons')
    .select('id')
    .eq('lesson_key', LESSON_KEY)
    .single();

  if (!lessonResult.data) {
    console.error('Percentages lesson not found');
    return;
  }

  const lessonUUID = lessonResult.data.id;

  console.log('=== DELETING OLD PERCENTAGES QUESTIONS ===\n');
  await supabase
    .from('practice_questions')
    .delete()
    .eq('lesson_id', lessonUUID);
  console.log('✅ Deleted\n');

  console.log('=== INSERTING 50 PERCENTAGES QUESTIONS (ALL HARD) ===\n');

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
        title: `Percentages Question ${q.pos}`,
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
