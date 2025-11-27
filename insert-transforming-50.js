require('dotenv').config();
const { createClient } = require('@supabase/supabase-js');

const supabase = createClient(
  'https://rabavobdklnwvwsldbix.supabase.co',
  process.env.SUPABASE_SERVICE_ROLE_KEY
);

const LESSON_KEY = 'transforming-functions';

const questions = [
  // EASY (1-17): Basic shifts and translations
  {pos:1,diff:'easy',text:'If f(x) = x², what is f(x) + 3?',ch:[{letter:'A',text:'x² + 3'},{letter:'B',text:'(x + 3)²'},{letter:'C',text:'x² - 3'},{letter:'D',text:'3x²'}],ans:'A',sol:'**Add 3 to the output.**\n```\nf(x) + 3 = x² + 3\n```'},

  {pos:2,diff:'easy',text:'How does the graph of y = x² + 4 compare to y = x²?',ch:[{letter:'A',text:'Shifted up 4 units'},{letter:'B',text:'Shifted down 4 units'},{letter:'C',text:'Shifted right 4 units'},{letter:'D',text:'Shifted left 4 units'}],ans:'A',sol:'**Adding to output shifts graph up.**\n```\ny = x² + 4 is y = x² shifted up 4\n```'},

  {pos:3,diff:'easy',text:'How does the graph of y = (x - 2)² compare to y = x²?',ch:[{letter:'A',text:'Shifted right 2 units'},{letter:'B',text:'Shifted left 2 units'},{letter:'C',text:'Shifted up 2 units'},{letter:'D',text:'Shifted down 2 units'}],ans:'A',sol:'**Subtracting from input shifts right.**\n```\ny = (x - 2)² is y = x² shifted right 2\n```'},

  {pos:4,diff:'easy',text:'What transformation changes f(x) to f(x) - 5?',ch:[{letter:'A',text:'Shift down 5'},{letter:'B',text:'Shift up 5'},{letter:'C',text:'Shift left 5'},{letter:'D',text:'Shift right 5'}],ans:'A',sol:'**Subtracting from output shifts down.**\n```\nf(x) - 5 shifts graph down 5 units\n```'},

  {pos:5,diff:'easy',text:'How does y = (x + 3)² compare to y = x²?',ch:[{letter:'A',text:'Shifted left 3 units'},{letter:'B',text:'Shifted right 3 units'},{letter:'C',text:'Shifted up 3 units'},{letter:'D',text:'Shifted down 3 units'}],ans:'A',sol:'**Adding to input shifts left.**\n```\ny = (x + 3)² is y = x² shifted left 3\n```'},

  {pos:6,diff:'easy',text:'If g(x) = |x|, what is g(x - 1)?',ch:[{letter:'A',text:'|x - 1|'},{letter:'B',text:'|x| - 1'},{letter:'C',text:'|x + 1|'},{letter:'D',text:'|x| + 1'}],ans:'A',sol:'**Replace x with (x - 1).**\n```\ng(x - 1) = |x - 1|\n```'},

  {pos:7,diff:'easy',text:'What transformation changes y = x² to y = x² - 7?',ch:[{letter:'A',text:'Vertical shift down 7'},{letter:'B',text:'Vertical shift up 7'},{letter:'C',text:'Horizontal shift right 7'},{letter:'D',text:'Horizontal shift left 7'}],ans:'A',sol:'**Subtract 7 from output.**\n```\ny = x² - 7 shifts down 7 units\n```'},

  {pos:8,diff:'easy',text:'The graph of f(x) = x³ is shifted 2 units up. What is the new function?',ch:[{letter:'A',text:'f(x) = x³ + 2'},{letter:'B',text:'f(x) = (x + 2)³'},{letter:'C',text:'f(x) = x³ - 2'},{letter:'D',text:'f(x) = (x - 2)³'}],ans:'A',sol:'**Add 2 to output for upward shift.**\n```\nNew function: x³ + 2\n```'},

  {pos:9,diff:'easy',text:'How does y = -x² compare to y = x²?',ch:[{letter:'A',text:'Reflected over x-axis'},{letter:'B',text:'Reflected over y-axis'},{letter:'C',text:'Shifted down'},{letter:'D',text:'Shifted up'}],ans:'A',sol:'**Negative sign reflects over x-axis.**\n```\ny = -x² is y = x² flipped over x-axis\n```'},

  {pos:10,diff:'easy',text:'If h(x) = √x, what does h(x + 4) equal?',ch:[{letter:'A',text:'√(x + 4)'},{letter:'B',text:'√x + 4'},{letter:'C',text:'√(x - 4)'},{letter:'D',text:'√x - 4'}],ans:'A',sol:'**Replace x with (x + 4).**\n```\nh(x + 4) = √(x + 4)\n```'},

  {pos:11,diff:'easy',text:'What is the effect of replacing f(x) with 2f(x)?',ch:[{letter:'A',text:'Vertical stretch by factor of 2'},{letter:'B',text:'Vertical compression by factor of 2'},{letter:'C',text:'Horizontal stretch by factor of 2'},{letter:'D',text:'Shift up 2 units'}],ans:'A',sol:'**Multiply output by 2.**\n```\n2f(x) stretches vertically by 2\n```'},

  {pos:12,diff:'easy',text:'How does y = (x - 5)² + 1 relate to y = x²?',ch:[{letter:'A',text:'Right 5, up 1'},{letter:'B',text:'Left 5, up 1'},{letter:'C',text:'Right 5, down 1'},{letter:'D',text:'Left 5, down 1'}],ans:'A',sol:'**x - 5 shifts right, +1 shifts up.**\n```\nShifted right 5 and up 1\n```'},

  {pos:13,diff:'easy',text:'If f(x) = x³, what is -f(x)?',ch:[{letter:'A',text:'-x³'},{letter:'B',text:'(-x)³'},{letter:'C',text:'x³'},{letter:'D',text:'1/x³'}],ans:'A',sol:'**Negate the output.**\n```\n-f(x) = -x³\n```'},

  {pos:14,diff:'easy',text:'The graph of y = |x| shifts left 3 units. What is the equation?',ch:[{letter:'A',text:'y = |x + 3|'},{letter:'B',text:'y = |x - 3|'},{letter:'C',text:'y = |x| + 3'},{letter:'D',text:'y = |x| - 3'}],ans:'A',sol:'**Add 3 to input for left shift.**\n```\nNew equation: y = |x + 3|\n```'},

  {pos:15,diff:'easy',text:'What transformation takes f(x) to f(x) + k where k > 0?',ch:[{letter:'A',text:'Shift up k units'},{letter:'B',text:'Shift down k units'},{letter:'C',text:'Shift right k units'},{letter:'D',text:'Shift left k units'}],ans:'A',sol:'**Add k to output.**\n```\nf(x) + k shifts up k units\n```'},

  {pos:16,diff:'easy',text:'How does y = 3x² compare to y = x²?',ch:[{letter:'A',text:'Vertical stretch by 3'},{letter:'B',text:'Vertical compression by 3'},{letter:'C',text:'Shift up 3'},{letter:'D',text:'Shift right 3'}],ans:'A',sol:'**Multiply output by 3.**\n```\ny = 3x² is vertically stretched by 3\n```'},

  {pos:17,diff:'easy',text:'If g(x) = x², what is g(-x)?',ch:[{letter:'A',text:'x²'},{letter:'B',text:'-x²'},{letter:'C',text:'(-x)²'},{letter:'D',text:'Both A and C'}],ans:'D',sol:'**g(-x) = (-x)² = x²**\n```\nBoth are equivalent\n```'},

  // MEDIUM (18-34): Multiple transformations, reflections, stretches
  {pos:18,diff:'medium',text:'The function f(x) = x² is reflected over the x-axis and shifted up 4. What is the new function?',ch:[{letter:'A',text:'-x² + 4'},{letter:'B',text:'-x² - 4'},{letter:'C',text:'-(x² + 4)'},{letter:'D',text:'x² - 4'}],ans:'A',sol:'**Reflect: -x². Then shift up: -x² + 4**\n```\nNew function: -x² + 4\n```'},

  {pos:19,diff:'medium',text:'If f(x) = x³, describe the transformation to get g(x) = (x - 2)³ + 5.',ch:[{letter:'A',text:'Right 2, up 5'},{letter:'B',text:'Left 2, up 5'},{letter:'C',text:'Right 2, down 5'},{letter:'D',text:'Left 2, down 5'}],ans:'A',sol:'**x - 2 shifts right 2, +5 shifts up 5.**\n```\nShifted right 2 and up 5\n```'},

  {pos:20,diff:'medium',text:'How does y = (1/2)x² compare to y = x²?',ch:[{letter:'A',text:'Vertical compression by 1/2'},{letter:'B',text:'Vertical stretch by 2'},{letter:'C',text:'Horizontal compression by 1/2'},{letter:'D',text:'Horizontal stretch by 2'}],ans:'A',sol:'**Multiply output by 1/2 compresses vertically.**\n```\ny = (1/2)x² is compressed vertically\n```'},

  {pos:21,diff:'medium',text:'If f(x) = |x|, what is f(2x)?',ch:[{letter:'A',text:'|2x|'},{letter:'B',text:'2|x|'},{letter:'C',text:'|x|/2'},{letter:'D',text:'Both A and B'}],ans:'D',sol:'**f(2x) = |2x| = 2|x|**\n```\nBoth expressions are equal\n```'},

  {pos:22,diff:'medium',text:'The graph of y = √x is reflected over the x-axis. What is the equation?',ch:[{letter:'A',text:'y = -√x'},{letter:'B',text:'y = √(-x)'},{letter:'C',text:'y = -√(-x)'},{letter:'D',text:'y = 1/√x'}],ans:'A',sol:'**Negate the output.**\n```\ny = -√x\n```'},

  {pos:23,diff:'medium',text:'Starting from f(x) = x², apply a horizontal shift right 3 and vertical shift down 2. What is the result?',ch:[{letter:'A',text:'(x - 3)² - 2'},{letter:'B',text:'(x + 3)² - 2'},{letter:'C',text:'(x - 3)² + 2'},{letter:'D',text:'(x + 3)² + 2'}],ans:'A',sol:'**Right 3: (x - 3)². Down 2: subtract 2.**\n```\n(x - 3)² - 2\n```'},

  {pos:24,diff:'medium',text:'If g(x) = x³ becomes g(x) = -(x + 1)³ + 4, describe all transformations.',ch:[{letter:'A',text:'Left 1, reflect over x-axis, up 4'},{letter:'B',text:'Right 1, reflect over x-axis, up 4'},{letter:'C',text:'Left 1, reflect over y-axis, up 4'},{letter:'D',text:'Right 1, up 4'}],ans:'A',sol:'**(x + 1) shifts left, negative reflects, +4 shifts up.**\n```\nLeft 1, reflect over x-axis, up 4\n```'},

  {pos:25,diff:'medium',text:'How is y = f(-x) related to y = f(x)?',ch:[{letter:'A',text:'Reflected over y-axis'},{letter:'B',text:'Reflected over x-axis'},{letter:'C',text:'Shifted left'},{letter:'D',text:'Shifted right'}],ans:'A',sol:'**Negating input reflects over y-axis.**\n```\nf(-x) is f(x) reflected over y-axis\n```'},

  {pos:26,diff:'medium',text:'If h(x) = x² - 4x + 3 is written as h(x) = (x - 2)² - 1, what is the vertex?',ch:[{letter:'A',text:'(2, -1)'},{letter:'B',text:'(-2, -1)'},{letter:'C',text:'(2, 1)'},{letter:'D',text:'(-2, 1)'}],ans:'A',sol:'**Vertex form (x - h)² + k gives vertex (h, k).**\n```\nVertex: (2, -1)\n```'},

  {pos:27,diff:'medium',text:'Starting with f(x) = |x|, what function results from stretching vertically by 3 and shifting down 2?',ch:[{letter:'A',text:'3|x| - 2'},{letter:'B',text:'3|x| + 2'},{letter:'C',text:'|3x| - 2'},{letter:'D',text:'3|x - 2|'}],ans:'A',sol:'**Stretch: 3|x|. Shift down: subtract 2.**\n```\n3|x| - 2\n```'},

  {pos:28,diff:'medium',text:'The function y = x² becomes y = (x + 5)² - 3. The vertex moved from (0, 0) to:',ch:[{letter:'A',text:'(-5, -3)'},{letter:'B',text:'(5, -3)'},{letter:'C',text:'(-5, 3)'},{letter:'D',text:'(5, 3)'}],ans:'A',sol:'**x + 5 = 0 when x = -5. y = -3**\n```\nVertex: (-5, -3)\n```'},

  {pos:29,diff:'medium',text:'What transformation changes f(x) to -2f(x) + 1?',ch:[{letter:'A',text:'Reflect over x-axis, stretch by 2, up 1'},{letter:'B',text:'Reflect over y-axis, stretch by 2, up 1'},{letter:'C',text:'Stretch by 2, down 1'},{letter:'D',text:'Compress by 2, up 1'}],ans:'A',sol:'**Negative reflects, 2 stretches, +1 shifts up.**\n```\nReflect x-axis, vertical stretch 2, up 1\n```'},

  {pos:30,diff:'medium',text:'If f(x) = 1/x, what is f(x - 3)?',ch:[{letter:'A',text:'1/(x - 3)'},{letter:'B',text:'1/x - 3'},{letter:'C',text:'1/(x + 3)'},{letter:'D',text:'(1/x) - 3'}],ans:'A',sol:'**Replace x with (x - 3).**\n```\nf(x - 3) = 1/(x - 3)\n```'},

  {pos:31,diff:'medium',text:'The graph of y = √x is stretched horizontally by a factor of 2. What is the new equation?',ch:[{letter:'A',text:'y = √(x/2)'},{letter:'B',text:'y = 2√x'},{letter:'C',text:'y = √(2x)'},{letter:'D',text:'y = (1/2)√x'}],ans:'A',sol:'**Horizontal stretch by 2: replace x with x/2.**\n```\ny = √(x/2)\n```'},

  {pos:32,diff:'medium',text:'If g(x) = x² + 3x, what is 2g(x)?',ch:[{letter:'A',text:'2x² + 6x'},{letter:'B',text:'2x² + 3x'},{letter:'C',text:'x² + 6x'},{letter:'D',text:'4x² + 9x'}],ans:'A',sol:'**Multiply entire function by 2.**\n```\n2g(x) = 2(x² + 3x) = 2x² + 6x\n```'},

  {pos:33,diff:'medium',text:'Starting with f(x) = x³, compress vertically by 1/3 and shift left 2. What is the result?',ch:[{letter:'A',text:'(1/3)(x + 2)³'},{letter:'B',text:'(1/3)(x - 2)³'},{letter:'C',text:'3(x + 2)³'},{letter:'D',text:'(x/3 + 2)³'}],ans:'A',sol:'**Compress: (1/3)f(x). Left 2: f(x + 2).**\n```\n(1/3)(x + 2)³\n```'},

  {pos:34,diff:'medium',text:'If h(x) = 2^x, what is h(x + 1)?',ch:[{letter:'A',text:'2^(x+1)'},{letter:'B',text:'2^x + 1'},{letter:'C',text:'2^(x-1)'},{letter:'D',text:'2·2^x'}],ans:'A',sol:'**Replace x with (x + 1).**\n```\nh(x + 1) = 2^(x+1)\n```\n\nNote: 2^(x+1) = 2·2^x, so both A and D are equivalent, but A is the direct answer.'},

  // HARD (35-50): Complex composite transformations
  {pos:35,diff:'hard',text:'If f(x) is transformed to -f(2x) + 3, describe all transformations in order.',ch:[{letter:'A',text:'Horizontal compression by 1/2, reflect x-axis, shift up 3'},{letter:'B',text:'Horizontal stretch by 2, reflect x-axis, shift up 3'},{letter:'C',text:'Vertical compression by 2, reflect x-axis, shift up 3'},{letter:'D',text:'Reflect y-axis, compress by 2, shift up 3'}],ans:'A',sol:'**2x compresses horizontally, negative reflects, +3 shifts up.**\n```\nCompress horizontally 1/2, reflect x-axis, up 3\n```'},

  {pos:36,diff:'hard',text:'The function f(x) = x² has vertex (0, 0). After transformation, the vertex is (-3, 5). What is the transformed function?',ch:[{letter:'A',text:'(x + 3)² + 5'},{letter:'B',text:'(x - 3)² + 5'},{letter:'C',text:'(x + 3)² - 5'},{letter:'D',text:'-(x + 3)² + 5'}],ans:'A',sol:'**Vertex (h, k) gives (x - h)² + k.**\n```\nVertex (-3, 5): (x - (-3))² + 5 = (x + 3)² + 5\n```'},

  {pos:37,diff:'hard',text:'If g(x) = |x| and h(x) = 2|x - 1| + 3, describe the transformation from g to h.',ch:[{letter:'A',text:'Right 1, vertical stretch 2, up 3'},{letter:'B',text:'Left 1, vertical stretch 2, up 3'},{letter:'C',text:'Right 1, vertical compression 2, up 3'},{letter:'D',text:'Right 1, horizontal stretch 2, up 3'}],ans:'A',sol:'**(x - 1) shifts right, 2 stretches vertically, +3 shifts up.**\n```\nRight 1, stretch by 2, up 3\n```'},

  {pos:38,diff:'hard',text:'The point (4, 16) is on f(x) = x². Where is this point on y = f(x - 2) + 1?',ch:[{letter:'A',text:'(6, 17)'},{letter:'B',text:'(2, 17)'},{letter:'C',text:'(6, 15)'},{letter:'D',text:'(2, 15)'}],ans:'A',sol:'**x shifts right 2: 4 + 2 = 6. y shifts up 1: 16 + 1 = 17.**\n```\nNew point: (6, 17)\n```'},

  {pos:39,diff:'hard',text:'If f(x) = x³ - 2x, find f(-x).',ch:[{letter:'A',text:'-x³ + 2x'},{letter:'B',text:'-x³ - 2x'},{letter:'C',text:'x³ + 2x'},{letter:'D',text:'x³ - 2x'}],ans:'A',sol:'**Substitute -x for x.**\n```\nf(-x) = (-x)³ - 2(-x)\n      = -x³ + 2x\n```'},

  {pos:40,diff:'hard',text:'The function y = f(x) passes through (2, 5). Where does y = -f(x + 1) + 3 pass through?',ch:[{letter:'A',text:'(1, -2)'},{letter:'B',text:'(3, -2)'},{letter:'C',text:'(1, 8)'},{letter:'D',text:'(3, 8)'}],ans:'A',sol:'**x shifts left 1: 2 - 1 = 1. y: -5 + 3 = -2.**\n```\nNew point: (1, -2)\n```'},

  {pos:41,diff:'hard',text:'If g(x) = √x is compressed horizontally by factor of 1/4, what is the new function?',ch:[{letter:'A',text:'g(x) = √(4x)'},{letter:'B',text:'g(x) = 4√x'},{letter:'C',text:'g(x) = √(x/4)'},{letter:'D',text:'g(x) = (1/4)√x'}],ans:'A',sol:'**Horizontal compression by 1/4: replace x with 4x.**\n```\ng(4x) = √(4x)\n```'},

  {pos:42,diff:'hard',text:'Starting from f(x) = 1/x, what function results from reflecting over both axes and shifting up 2?',ch:[{letter:'A',text:'-1/(-x) + 2 = 1/x + 2'},{letter:'B',text:'-1/x + 2'},{letter:'C',text:'1/(-x) + 2'},{letter:'D',text:'-1/(-x) - 2'}],ans:'A',sol:'**Reflect over y-axis: f(-x) = 1/(-x) = -1/x.**\n**Reflect over x-axis: -f(-x) = -(-1/x) = 1/x.**\n**Shift up 2: 1/x + 2.**\n```\n1/x + 2\n```'},

  {pos:43,diff:'hard',text:'If the range of f(x) is [0, 10], what is the range of -2f(x) + 5?',ch:[{letter:'A',text:'[-15, 5]'},{letter:'B',text:'[5, 15]'},{letter:'C',text:'[-20, 5]'},{letter:'D',text:'[0, 5]'}],ans:'A',sol:'**Multiply by -2: [0, 10] → [-20, 0].**\n**Add 5: [-20, 0] → [-15, 5].**\n```\nRange: [-15, 5]\n```'},

  {pos:44,diff:'hard',text:'The function f(x) = (x - 3)² + 2 is shifted right 1 and down 3. What is the new vertex?',ch:[{letter:'A',text:'(4, -1)'},{letter:'B',text:'(2, -1)'},{letter:'C',text:'(4, 5)'},{letter:'D',text:'(2, 5)'}],ans:'A',sol:'**Original vertex: (3, 2).**\n**Right 1: 3 + 1 = 4.**\n**Down 3: 2 - 3 = -1.**\n```\nNew vertex: (4, -1)\n```'},

  {pos:45,diff:'hard',text:'If f(x) = x² + 4x + 3 is written in vertex form f(x) = (x + 2)² - 1, what transformations from y = x² are needed?',ch:[{letter:'A',text:'Left 2, down 1'},{letter:'B',text:'Right 2, down 1'},{letter:'C',text:'Left 2, up 1'},{letter:'D',text:'Right 2, up 1'}],ans:'A',sol:'**Form (x + 2)² - 1 means (x - (-2))² + (-1).**\n```\nLeft 2, down 1\n```'},

  {pos:46,diff:'hard',text:'If the domain of f(x) is [-5, 5], what is the domain of f(2x)?',ch:[{letter:'A',text:'[-5/2, 5/2]'},{letter:'B',text:'[-10, 10]'},{letter:'C',text:'[-5, 5]'},{letter:'D',text:'[-2.5, 2.5]'}],ans:'A',sol:'**For f(2x), need -5 ≤ 2x ≤ 5.**\n```\n-5/2 ≤ x ≤ 5/2\nDomain: [-5/2, 5/2]\n```'},

  {pos:47,diff:'hard',text:'The function y = f(x) has a maximum at (3, 7). Where is the maximum of y = 2f(x - 1) + 3?',ch:[{letter:'A',text:'(4, 17)'},{letter:'B',text:'(2, 17)'},{letter:'C',text:'(4, 11)'},{letter:'D',text:'(2, 11)'}],ans:'A',sol:'**x shifts right 1: 3 + 1 = 4.**\n**y: 2(7) + 3 = 17.**\n```\nNew maximum: (4, 17)\n```'},

  {pos:48,diff:'hard',text:'If g(x) = 2^x, which transformation gives g(x) = 2^(x-3) + 5?',ch:[{letter:'A',text:'Right 3, up 5'},{letter:'B',text:'Left 3, up 5'},{letter:'C',text:'Right 3, down 5'},{letter:'D',text:'Left 3, down 5'}],ans:'A',sol:'**(x - 3) shifts right 3, +5 shifts up 5.**\n```\nRight 3, up 5\n```'},

  {pos:49,diff:'hard',text:'If f(x) is an odd function (f(-x) = -f(x)) and g(x) = f(x) + 5, is g(x) odd, even, or neither?',ch:[{letter:'A',text:'Neither'},{letter:'B',text:'Odd'},{letter:'C',text:'Even'},{letter:'D',text:'Cannot determine'}],ans:'A',sol:'**g(-x) = f(-x) + 5 = -f(x) + 5.**\n**g(x) = f(x) + 5.**\n**g(-x) ≠ -g(x) and g(-x) ≠ g(x).**\n```\nNeither odd nor even\n```'},

  {pos:50,diff:'hard',text:'The graph of f(x) passes through (0, 4) and (2, 0). The graph of y = f(3x) passes through:',ch:[{letter:'A',text:'(0, 4) and (2/3, 0)'},{letter:'B',text:'(0, 4) and (6, 0)'},{letter:'C',text:'(0, 12) and (2/3, 0)'},{letter:'D',text:'(0, 12) and (6, 0)'}],ans:'A',sol:'**f(3x): horizontal compression by 1/3.**\n**Point (0, 4): unchanged (0, 4).**\n**Point (2, 0): x becomes 2/3.**\n```\nPasses through (0, 4) and (2/3, 0)\n```'},
];

async function insertQuestions() {
  const lessonResult = await supabase
    .from('lessons')
    .select('id')
    .eq('lesson_key', LESSON_KEY)
    .single();

  if (!lessonResult.data) {
    console.error('Transforming Functions lesson not found');
    return;
  }

  const lessonUUID = lessonResult.data.id;

  console.log('=== DELETING OLD TRANSFORMING FUNCTIONS QUESTIONS ===\n');
  await supabase
    .from('practice_questions')
    .delete()
    .eq('lesson_id', lessonUUID);
  console.log('✅ Deleted\n');

  console.log('=== INSERTING 50 TRANSFORMING FUNCTIONS QUESTIONS ===\n');

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
        title: `Transforming Functions Question ${q.pos}`,
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
