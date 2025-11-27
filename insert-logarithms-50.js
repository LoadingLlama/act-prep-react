const { createClient } = require('@supabase/supabase-js');
const SUPABASE_URL = 'https://rabavobdklnwvwsldbix.supabase.co';
const SERVICE_ROLE_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InJhYmF2b2Jka2xud3Z3c2xkYml4Iiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc1OTc2NTQ3OCwiZXhwIjoyMDc1MzQxNDc4fQ.81SeH703keXgF3IevQlRS7OYmn1J2GUVIkn3OJiviM4';
const supabase = createClient(SUPABASE_URL, SERVICE_ROLE_KEY);
const LESSON_ID = 'a0fbdb59-614b-4597-99c1-344c4f3ad47e';

const q = [
  // EASY 1-17
  {pos:1,diff:'easy',text:'What is log₂(8)?',ch:[{letter:'A',text:'2'},{letter:'B',text:'3'},{letter:'C',text:'4'},{letter:'D',text:'8'}],ans:'B',sol:'**Find the exponent that gives 8 when 2 is raised to it.**\n```\nlog₂(8) = 3\nBecause 2³ = 8\n```'},
  {pos:2,diff:'easy',text:'What is log₁₀(100)?',ch:[{letter:'A',text:'1'},{letter:'B',text:'2'},{letter:'C',text:'10'},{letter:'D',text:'100'}],ans:'B',sol:'**Find the exponent that gives 100 when 10 is raised to it.**\n```\nlog₁₀(100) = 2\nBecause 10² = 100\n```'},
  {pos:3,diff:'easy',text:'What is log₅(25)?',ch:[{letter:'A',text:'2'},{letter:'B',text:'5'},{letter:'C',text:'25'},{letter:'D',text:'3'}],ans:'A',sol:'**Find the exponent that gives 25 when 5 is raised to it.**\n```\nlog₅(25) = 2\nBecause 5² = 25\n```'},
  {pos:4,diff:'easy',text:'What is log₃(9)?',ch:[{letter:'A',text:'1'},{letter:'B',text:'2'},{letter:'C',text:'3'},{letter:'D',text:'9'}],ans:'B',sol:'**Find the exponent that gives 9 when 3 is raised to it.**\n```\nlog₃(9) = 2\nBecause 3² = 9\n```'},
  {pos:5,diff:'easy',text:'What is log₁₀(1000)?',ch:[{letter:'A',text:'2'},{letter:'B',text:'3'},{letter:'C',text:'10'},{letter:'D',text:'100'}],ans:'B',sol:'**Find the exponent that gives 1000 when 10 is raised to it.**\n```\nlog₁₀(1000) = 3\nBecause 10³ = 1000\n```'},
  {pos:6,diff:'easy',text:'What is log₂(16)?',ch:[{letter:'A',text:'2'},{letter:'B',text:'3'},{letter:'C',text:'4'},{letter:'D',text:'8'}],ans:'C',sol:'**Find the exponent that gives 16 when 2 is raised to it.**\n```\nlog₂(16) = 4\nBecause 2⁴ = 16\n```'},
  {pos:7,diff:'easy',text:'What is log₄(16)?',ch:[{letter:'A',text:'1'},{letter:'B',text:'2'},{letter:'C',text:'3'},{letter:'D',text:'4'}],ans:'B',sol:'**Find the exponent that gives 16 when 4 is raised to it.**\n```\nlog₄(16) = 2\nBecause 4² = 16\n```'},
  {pos:8,diff:'easy',text:'What is log₁₀(10)?',ch:[{letter:'A',text:'0'},{letter:'B',text:'1'},{letter:'C',text:'10'},{letter:'D',text:'100'}],ans:'B',sol:'**Find the exponent that gives 10 when 10 is raised to it.**\n```\nlog₁₀(10) = 1\nBecause 10¹ = 10\n```'},
  {pos:9,diff:'easy',text:'What is log₇(49)?',ch:[{letter:'A',text:'1'},{letter:'B',text:'2'},{letter:'C',text:'7'},{letter:'D',text:'49'}],ans:'B',sol:'**Find the exponent that gives 49 when 7 is raised to it.**\n```\nlog₇(49) = 2\nBecause 7² = 49\n```'},
  {pos:10,diff:'easy',text:'What is log₂(32)?',ch:[{letter:'A',text:'3'},{letter:'B',text:'4'},{letter:'C',text:'5'},{letter:'D',text:'6'}],ans:'C',sol:'**Find the exponent that gives 32 when 2 is raised to it.**\n```\nlog₂(32) = 5\nBecause 2⁵ = 32\n```'},
  {pos:11,diff:'easy',text:'What is log₆(36)?',ch:[{letter:'A',text:'1'},{letter:'B',text:'2'},{letter:'C',text:'3'},{letter:'D',text:'6'}],ans:'B',sol:'**Find the exponent that gives 36 when 6 is raised to it.**\n```\nlog₆(36) = 2\nBecause 6² = 36\n```'},
  {pos:12,diff:'easy',text:'What is log₁₀(1)?',ch:[{letter:'A',text:'0'},{letter:'B',text:'1'},{letter:'C',text:'10'},{letter:'D',text:'-1'}],ans:'A',sol:'**Any number to the power of 0 equals 1.**\n```\nlog₁₀(1) = 0\nBecause 10⁰ = 1\n```'},
  {pos:13,diff:'easy',text:'What is log₃(27)?',ch:[{letter:'A',text:'2'},{letter:'B',text:'3'},{letter:'C',text:'9'},{letter:'D',text:'27'}],ans:'B',sol:'**Find the exponent that gives 27 when 3 is raised to it.**\n```\nlog₃(27) = 3\nBecause 3³ = 27\n```'},
  {pos:14,diff:'easy',text:'What is log₂(64)?',ch:[{letter:'A',text:'4'},{letter:'B',text:'5'},{letter:'C',text:'6'},{letter:'D',text:'7'}],ans:'C',sol:'**Find the exponent that gives 64 when 2 is raised to it.**\n```\nlog₂(64) = 6\nBecause 2⁶ = 64\n```'},
  {pos:15,diff:'easy',text:'What is log₈(64)?',ch:[{letter:'A',text:'1'},{letter:'B',text:'2'},{letter:'C',text:'3'},{letter:'D',text:'8'}],ans:'B',sol:'**Find the exponent that gives 64 when 8 is raised to it.**\n```\nlog₈(64) = 2\nBecause 8² = 64\n```'},
  {pos:16,diff:'easy',text:'What is log₅(125)?',ch:[{letter:'A',text:'2'},{letter:'B',text:'3'},{letter:'C',text:'5'},{letter:'D',text:'25'}],ans:'B',sol:'**Find the exponent that gives 125 when 5 is raised to it.**\n```\nlog₅(125) = 3\nBecause 5³ = 125\n```'},
  {pos:17,diff:'easy',text:'What is log₉(81)?',ch:[{letter:'A',text:'1'},{letter:'B',text:'2'},{letter:'C',text:'3'},{letter:'D',text:'9'}],ans:'B',sol:'**Find the exponent that gives 81 when 9 is raised to it.**\n```\nlog₉(81) = 2\nBecause 9² = 81\n```'},
  
  // MEDIUM 18-34
  {pos:18,diff:'medium',text:'Simplify: log₃(9) + log₃(3)',ch:[{letter:'A',text:'2'},{letter:'B',text:'3'},{letter:'C',text:'4'},{letter:'D',text:'5'}],ans:'B',sol:'**Use the product rule: log(a) + log(b) = log(ab).**\n```\nlog₃(9) + log₃(3) = log₃(9 × 3) = log₃(27)\n```\n\n**Evaluate.**\n```\nlog₃(27) = 3\nBecause 3³ = 27\n```'},
  {pos:19,diff:'medium',text:'Simplify: log₂(32) - log₂(4)',ch:[{letter:'A',text:'2'},{letter:'B',text:'3'},{letter:'C',text:'4'},{letter:'D',text:'5'}],ans:'B',sol:'**Use the quotient rule: log(a) - log(b) = log(a/b).**\n```\nlog₂(32) - log₂(4) = log₂(32/4) = log₂(8)\n```\n\n**Evaluate.**\n```\nlog₂(8) = 3\nBecause 2³ = 8\n```'},
  {pos:20,diff:'medium',text:'Simplify: 3·log₅(5)',ch:[{letter:'A',text:'1'},{letter:'B',text:'3'},{letter:'C',text:'5'},{letter:'D',text:'15'}],ans:'B',sol:'**Evaluate log₅(5) first.**\n```\nlog₅(5) = 1\n```\n\n**Multiply.**\n```\n3 × 1 = 3\n```'},
  {pos:21,diff:'medium',text:'Simplify: log₄(x) + log₄(y)',ch:[{letter:'A',text:'log₄(x+y)'},{letter:'B',text:'log₄(xy)'},{letter:'C',text:'log₄(x/y)'},{letter:'D',text:'log₄(x-y)'}],ans:'B',sol:'**Use the product rule: log(a) + log(b) = log(ab).**\n```\nlog₄(x) + log₄(y) = log₄(xy)\n```'},
  {pos:22,diff:'medium',text:'Simplify: 2·log₃(x)',ch:[{letter:'A',text:'log₃(2x)'},{letter:'B',text:'log₃(x²)'},{letter:'C',text:'log₃(x) + 2'},{letter:'D',text:'2 + log₃(x)'}],ans:'B',sol:'**Use the power rule: n·log(a) = log(aⁿ).**\n```\n2·log₃(x) = log₃(x²)\n```'},
  {pos:23,diff:'medium',text:'Simplify: log₆(x) - log₆(y)',ch:[{letter:'A',text:'log₆(x-y)'},{letter:'B',text:'log₆(x+y)'},{letter:'C',text:'log₆(x/y)'},{letter:'D',text:'log₆(xy)'}],ans:'C',sol:'**Use the quotient rule: log(a) - log(b) = log(a/b).**\n```\nlog₆(x) - log₆(y) = log₆(x/y)\n```'},
  {pos:24,diff:'medium',text:'What is log₁₀(10⁵)?',ch:[{letter:'A',text:'2'},{letter:'B',text:'5'},{letter:'C',text:'10'},{letter:'D',text:'50'}],ans:'B',sol:'**Use the inverse property: logₐ(aˣ) = x.**\n```\nlog₁₀(10⁵) = 5\n```'},
  {pos:25,diff:'medium',text:'Simplify: log₇(49) + log₇(7)',ch:[{letter:'A',text:'2'},{letter:'B',text:'3'},{letter:'C',text:'4'},{letter:'D',text:'5'}],ans:'B',sol:'**Use the product rule.**\n```\nlog₇(49) + log₇(7) = log₇(49 × 7) = log₇(343)\n```\n\n**Evaluate.**\n```\nlog₇(343) = 3\nBecause 7³ = 343\n```'},
  {pos:26,diff:'medium',text:'Simplify: log₅(25) - log₅(5)',ch:[{letter:'A',text:'0'},{letter:'B',text:'1'},{letter:'C',text:'2'},{letter:'D',text:'5'}],ans:'B',sol:'**Use the quotient rule.**\n```\nlog₅(25) - log₅(5) = log₅(25/5) = log₅(5)\n```\n\n**Evaluate.**\n```\nlog₅(5) = 1\n```'},
  {pos:27,diff:'medium',text:'What is log₂(2⁷)?',ch:[{letter:'A',text:'2'},{letter:'B',text:'4'},{letter:'C',text:'7'},{letter:'D',text:'14'}],ans:'C',sol:'**Use the inverse property: logₐ(aˣ) = x.**\n```\nlog₂(2⁷) = 7\n```'},
  {pos:28,diff:'medium',text:'Simplify: 5·log₂(2)',ch:[{letter:'A',text:'2'},{letter:'B',text:'5'},{letter:'C',text:'7'},{letter:'D',text:'10'}],ans:'B',sol:'**Evaluate log₂(2) first.**\n```\nlog₂(2) = 1\n```\n\n**Multiply.**\n```\n5 × 1 = 5\n```'},
  {pos:29,diff:'medium',text:'Simplify: log₈(4) + log₈(16)',ch:[{letter:'A',text:'1'},{letter:'B',text:'2'},{letter:'C',text:'3'},{letter:'D',text:'4'}],ans:'B',sol:'**Use the product rule.**\n```\nlog₈(4) + log₈(16) = log₈(4 × 16) = log₈(64)\n```\n\n**Evaluate.**\n```\nlog₈(64) = 2\nBecause 8² = 64\n```'},
  {pos:30,diff:'medium',text:'Simplify: 3·log₄(4)',ch:[{letter:'A',text:'1'},{letter:'B',text:'3'},{letter:'C',text:'4'},{letter:'D',text:'12'}],ans:'B',sol:'**Evaluate log₄(4) first.**\n```\nlog₄(4) = 1\n```\n\n**Multiply.**\n```\n3 × 1 = 3\n```'},
  {pos:31,diff:'medium',text:'Simplify: log₁₀(100) - log₁₀(10)',ch:[{letter:'A',text:'0'},{letter:'B',text:'1'},{letter:'C',text:'2'},{letter:'D',text:'10'}],ans:'B',sol:'**Use the quotient rule.**\n```\nlog₁₀(100) - log₁₀(10) = log₁₀(100/10) = log₁₀(10)\n```\n\n**Evaluate.**\n```\nlog₁₀(10) = 1\n```'},
  {pos:32,diff:'medium',text:'What is 10^(log₁₀(7))?',ch:[{letter:'A',text:'1'},{letter:'B',text:'7'},{letter:'C',text:'10'},{letter:'D',text:'70'}],ans:'B',sol:'**Use the inverse property: aˡᵒᵍₐ⁽ˣ⁾ = x.**\n```\n10^(log₁₀(7)) = 7\n```'},
  {pos:33,diff:'medium',text:'Simplify: log₃(x²)',ch:[{letter:'A',text:'2·log₃(x)'},{letter:'B',text:'log₃(2x)'},{letter:'C',text:'(log₃(x))²'},{letter:'D',text:'log₃(x) + 2'}],ans:'A',sol:'**Use the power rule: log(aⁿ) = n·log(a).**\n```\nlog₃(x²) = 2·log₃(x)\n```'},
  {pos:34,diff:'medium',text:'What is 2^(log₂(15))?',ch:[{letter:'A',text:'2'},{letter:'B',text:'8'},{letter:'C',text:'15'},{letter:'D',text:'30'}],ans:'C',sol:'**Use the inverse property: aˡᵒᵍₐ⁽ˣ⁾ = x.**\n```\n2^(log₂(15)) = 15\n```'},
  
  // HARD 35-50
  {pos:35,diff:'hard',text:'Use change of base to evaluate log₅(125) using common logarithms.',ch:[{letter:'A',text:'2'},{letter:'B',text:'3'},{letter:'C',text:'5'},{letter:'D',text:'125'}],ans:'B',sol:'**Use change of base formula: logₐ(b) = log(b)/log(a).**\n```\nlog₅(125) = log₁₀(125)/log₁₀(5)\n```\n\n**We know 125 = 5³ and 5 = 5¹.**\n```\n= log₁₀(5³)/log₁₀(5)\n= 3·log₁₀(5)/log₁₀(5)\n= 3\n```'},
  {pos:36,diff:'hard',text:'Solve for x: log₂(x) = 5',ch:[{letter:'A',text:'10'},{letter:'B',text:'25'},{letter:'C',text:'32'},{letter:'D',text:'64'}],ans:'C',sol:'**Convert to exponential form.**\n```\nlog₂(x) = 5\nx = 2⁵\nx = 32\n```'},
  {pos:37,diff:'hard',text:'Simplify: log₃(27x³)',ch:[{letter:'A',text:'3 + 3·log₃(x)'},{letter:'B',text:'27 + 3x'},{letter:'C',text:'3·log₃(x)'},{letter:'D',text:'3 + log₃(x)'}],ans:'A',sol:'**Use the product rule.**\n```\nlog₃(27x³) = log₃(27) + log₃(x³)\n```\n\n**Apply power rule and evaluate.**\n```\n= 3 + 3·log₃(x)\n```'},
  {pos:38,diff:'hard',text:'Solve for x: log₅(x+2) = 2',ch:[{letter:'A',text:'23'},{letter:'B',text:'25'},{letter:'C',text:'27'},{letter:'D',text:'30'}],ans:'A',sol:'**Convert to exponential form.**\n```\nlog₅(x+2) = 2\nx + 2 = 5²\nx + 2 = 25\n```\n\n**Solve for x.**\n```\nx = 23\n```'},
  {pos:39,diff:'hard',text:'Simplify: log₄(64/x²)',ch:[{letter:'A',text:'3 - 2·log₄(x)'},{letter:'B',text:'3 + 2·log₄(x)'},{letter:'C',text:'3/log₄(x)'},{letter:'D',text:'3·log₄(x)'}],ans:'A',sol:'**Use the quotient rule.**\n```\nlog₄(64/x²) = log₄(64) - log₄(x²)\n```\n\n**Evaluate and apply power rule.**\n```\n= 3 - 2·log₄(x)\n```'},
  {pos:40,diff:'hard',text:'Use change of base: What is log₂(8) in terms of natural logarithms?',ch:[{letter:'A',text:'ln(8)/ln(2)'},{letter:'B',text:'ln(2)/ln(8)'},{letter:'C',text:'ln(8)·ln(2)'},{letter:'D',text:'ln(8)+ln(2)'}],ans:'A',sol:'**Use change of base formula: logₐ(b) = ln(b)/ln(a).**\n```\nlog₂(8) = ln(8)/ln(2)\n```\n\n**This equals 3 because 2³ = 8.**'},
  {pos:41,diff:'hard',text:'Solve for x: log₃(x) + log₃(x-2) = 1',ch:[{letter:'A',text:'1'},{letter:'B',text:'3'},{letter:'C',text:'-1'},{letter:'D',text:'5'}],ans:'B',sol:'**Use the product rule.**\n```\nlog₃(x(x-2)) = 1\n```\n\n**Convert to exponential form.**\n```\nx(x-2) = 3¹\nx² - 2x = 3\nx² - 2x - 3 = 0\n```\n\n**Factor and solve.**\n```\n(x-3)(x+1) = 0\nx = 3 or x = -1\n```\n\n**Check: x must be positive for log to be defined.**\n```\nx = 3\n```'},
  {pos:42,diff:'hard',text:'Simplify: log₇(√(49x))',ch:[{letter:'A',text:'1 + (1/2)·log₇(x)'},{letter:'B',text:'2 + log₇(x)'},{letter:'C',text:'(1/2) + log₇(x)'},{letter:'D',text:'1 + log₇(x)'}],ans:'A',sol:'**Rewrite as a power.**\n```\nlog₇(√(49x)) = log₇((49x)^(1/2))\n```\n\n**Apply power rule.**\n```\n= (1/2)·log₇(49x)\n= (1/2)·[log₇(49) + log₇(x)]\n= (1/2)·[2 + log₇(x)]\n= 1 + (1/2)·log₇(x)\n```'},
  {pos:43,diff:'hard',text:'Solve for x: log₂(x-1) = 4',ch:[{letter:'A',text:'15'},{letter:'B',text:'16'},{letter:'C',text:'17'},{letter:'D',text:'18'}],ans:'C',sol:'**Convert to exponential form.**\n```\nlog₂(x-1) = 4\nx - 1 = 2⁴\nx - 1 = 16\n```\n\n**Solve for x.**\n```\nx = 17\n```'},
  {pos:44,diff:'hard',text:'Simplify: log₅(x³/25)',ch:[{letter:'A',text:'3·log₅(x) - 2'},{letter:'B',text:'3·log₅(x) + 2'},{letter:'C',text:'3·log₅(x)/2'},{letter:'D',text:'log₅(x³) - 25'}],ans:'A',sol:'**Use quotient and power rules.**\n```\nlog₅(x³/25) = log₅(x³) - log₅(25)\n= 3·log₅(x) - 2\n```'},
  {pos:45,diff:'hard',text:'Solve for x: 2·log₄(x) = 4',ch:[{letter:'A',text:'8'},{letter:'B',text:'16'},{letter:'C',text:'32'},{letter:'D',text:'64'}],ans:'B',sol:'**Divide both sides by 2.**\n```\nlog₄(x) = 2\n```\n\n**Convert to exponential form.**\n```\nx = 4²\nx = 16\n```'},
  {pos:46,diff:'hard',text:'Simplify: log₂(8x⁴)',ch:[{letter:'A',text:'3 + 4·log₂(x)'},{letter:'B',text:'8 + 4·log₂(x)'},{letter:'C',text:'3·log₂(x) + 4'},{letter:'D',text:'12·log₂(x)'}],ans:'A',sol:'**Use product and power rules.**\n```\nlog₂(8x⁴) = log₂(8) + log₂(x⁴)\n= 3 + 4·log₂(x)\n```'},
  {pos:47,diff:'hard',text:'Solve for x: log₆(x) - log₆(3) = 2',ch:[{letter:'A',text:'36'},{letter:'B',text:'72'},{letter:'C',text:'108'},{letter:'D',text:'216'}],ans:'C',sol:'**Use the quotient rule.**\n```\nlog₆(x/3) = 2\n```\n\n**Convert to exponential form.**\n```\nx/3 = 6²\nx/3 = 36\nx = 108\n```'},
  {pos:48,diff:'hard',text:'What is log₈(2) using change of base with base 2?',ch:[{letter:'A',text:'1/2'},{letter:'B',text:'1/3'},{letter:'C',text:'1/4'},{letter:'D',text:'3'}],ans:'B',sol:'**Use change of base: logₐ(b) = log₂(b)/log₂(a).**\n```\nlog₈(2) = log₂(2)/log₂(8)\n= 1/3\n```\n\n**Because log₂(2) = 1 and log₂(8) = 3.**'},
  {pos:49,diff:'hard',text:'Solve for x: log₃(2x-1) = 3',ch:[{letter:'A',text:'13'},{letter:'B',text:'14'},{letter:'C',text:'15'},{letter:'D',text:'28'}],ans:'B',sol:'**Convert to exponential form.**\n```\nlog₃(2x-1) = 3\n2x - 1 = 3³\n2x - 1 = 27\n```\n\n**Solve for x.**\n```\n2x = 28\nx = 14\n```'},
  {pos:50,diff:'hard',text:'Simplify: log₁₀(100x²/y)',ch:[{letter:'A',text:'2 + 2·log₁₀(x) - log₁₀(y)'},{letter:'B',text:'100 + 2x - y'},{letter:'C',text:'2·log₁₀(x) - log₁₀(y)'},{letter:'D',text:'2 + log₁₀(x²/y)'}],ans:'A',sol:'**Use product and quotient rules.**\n```\nlog₁₀(100x²/y) = log₁₀(100) + log₁₀(x²) - log₁₀(y)\n```\n\n**Apply power rule.**\n```\n= 2 + 2·log₁₀(x) - log₁₀(y)\n```'}
];

async function insert() {
  console.log('\n=== DELETING OLD LOGARITHMS QUESTIONS ===\n');
  await supabase.from('practice_questions').delete().eq('lesson_id',LESSON_ID);
  console.log('✅ Deleted\n\n=== INSERTING 50 NEW QUESTIONS ===\n');
  
  let s=0,e=0;
  for(const i of q){
    const {error} = await supabase.from('practice_questions').insert([{
      lesson_id:LESSON_ID,subject:'math',position:i.pos,difficulty:i.diff,
      title:`Logarithms Practice ${i.pos}`,problem_text:i.text,
      choices:JSON.stringify(i.ch),correct_answer:i.ans,
      answer_explanation:i.sol,solution_steps:[],diagram_svg:null
    }]);
    if(error){console.error(`❌ Q${i.pos}:`,error.message);e++;}
    else{console.log(`✅ Q${i.pos} (${i.diff})`);s++;}
  }
  console.log(`\n=== COMPLETE: ${s}/50 success, ${e}/50 errors ===\n`);
}
insert().catch(console.error);
