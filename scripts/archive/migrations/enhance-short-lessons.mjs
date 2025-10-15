import { createClient } from '@supabase/supabase-js';
import dotenv from 'dotenv';
import * as cheerio from 'cheerio';

dotenv.config();

const supabase = createClient(
  process.env.REACT_APP_SUPABASE_URL,
  process.env.SUPABASE_SERVICE_ROLE_KEY
);

// Enhanced content for each short lesson
const enhancements = {
  'Matrices': `
<div class="lesson-content">
<p class="lesson-intro" style="margin: 0.75rem 0;">Matrices are rectangular arrays of numbers arranged in rows and columns. On the ACT, you need to know three basic operations: addition, scalar multiplication, and matrix multiplication. The good news is that matrix questions are rare and usually straightforward!</p>

<h3 style="margin-top: 2rem;">What is a Matrix?</h3>
<p style="margin: 0.75rem 0;">A matrix is a grid of numbers. We describe a matrix by its dimensions: rows × columns.</p>
<p style="margin: 0.75rem 0;">For example, [1 2 3] is a 2×3 matrix (2 rows, 3 columns):</p>
<p style="margin: 0.75rem 0;">[4 5 6]</p>

<h3 style="margin-top: 2rem;">Matrix Addition</h3>
<p style="margin: 0.75rem 0;">To add matrices, they must have the same dimensions. Simply add corresponding elements:</p>
<p style="margin: 0.75rem 0;">[1 2] + [5 6] = [1+5 2+6] = [6 8]</p>
<p style="margin: 0.75rem 0;">[3 4] + [7 8] = [3+7 4+8] = [10 12]</p>
<p style="margin: 0.75rem 0;">Important: You can only add matrices of the same size!</p>

<h3 style="margin-top: 2rem;">Scalar Multiplication</h3>
<p style="margin: 0.75rem 0;">A scalar is just a regular number. To multiply a matrix by a scalar, multiply every element in the matrix by that number:</p>
<p style="margin: 0.75rem 0;">3 × [2 4] = [3×2 3×4] = [6 12]</p>
<p style="margin: 0.75rem 0;">[1 5] [3×1 3×5] [3 15]</p>

<h3 style="margin-top: 2rem;">Matrix Multiplication (Advanced)</h3>
<p style="margin: 0.75rem 0;">Matrix multiplication is more complex. For a 2×2 matrix:</p>
<p style="margin: 0.75rem 0;">[a b] × [e f] = [ae+bg af+bh]</p>
<p style="margin: 0.75rem 0;">[c d] [g h] [ce+dg cf+dh]</p>
<p style="margin: 0.75rem 0;">Note: Matrix multiplication is rarely tested on the ACT.</p>

<h3 style="margin-top: 2rem;">Example Problems</h3>

<h4 style="margin-top: 1.5rem;">Example 1</h4>
<p style="margin: 0.75rem 0;"><strong>Problem:</strong> What is 3 × [2 4]?</p>
<p style="margin: 0.75rem 0;">A. [5 7]<br>B. [6 12]<br>C. [6 7]<br>D. [2 12]</p>
<p style="margin: 0.75rem 0;"><strong>Solution:</strong> This is scalar multiplication. Multiply each element by 3:</p>
<p style="margin: 0.75rem 0;">3 × [2 4] = [3×2 3×4] = [6 12]</p>
<p style="margin: 0.75rem 0;"><strong>Answer: B</strong></p>

<h4 style="margin-top: 1.5rem;">Key Takeaway</h4>
<p style="background: #FFF3CD; padding: 1rem; border-left: 4px solid #FFA500; margin: 1rem 0;">For scalar multiplication, multiply every element by the scalar. For matrix addition, add corresponding elements (matrices must be the same size). Matrix questions on the ACT are usually simple—don't overcomplicate them!</p>
</div>
`,

  'Patterns and Sequences': `
<div class="lesson-content">
<p class="lesson-intro" style="margin: 0.75rem 0;">Pattern recognition questions ask you to identify the rule governing a sequence of numbers or shapes. The key is to look for common operations: addition, subtraction, multiplication, or division between consecutive terms.</p>

<h3 style="margin-top: 2rem;">Finding Patterns in Number Sequences</h3>
<p style="margin: 0.75rem 0;">When you see a sequence like 2, 5, 8, 11, 14..., ask yourself:</p>
<ul style="margin: 1rem 0; padding-left: 2rem;">
<li>What operation connects consecutive numbers?</li>
<li>Is the difference between terms constant? (Arithmetic sequence)</li>
<li>Is the ratio between terms constant? (Geometric sequence)</li>
<li>Is there a more complex pattern? (Squares, powers, factorials, etc.)</li>
</ul>

<h3 style="margin-top: 2rem;">Common Pattern Types</h3>

<h4 style="margin-top: 1.5rem;">1. Adding/Subtracting a Constant</h4>
<p style="margin: 0.75rem 0;">Example: 3, 7, 11, 15... (add 4 each time)</p>

<h4 style="margin-top: 1.5rem;">2. Multiplying/Dividing by a Constant</h4>
<p style="margin: 0.75rem 0;">Example: 2, 6, 18, 54... (multiply by 3 each time)</p>

<h4 style="margin-top: 1.5rem;">3. Perfect Squares or Powers</h4>
<p style="margin: 0.75rem 0;">Example: 1, 4, 9, 16, 25... (1², 2², 3², 4², 5²)</p>

<h4 style="margin-top: 1.5rem;">4. Alternating Patterns</h4>
<p style="margin: 0.75rem 0;">Example: 1, -1, 1, -1... (alternating signs)</p>

<h3 style="margin-top: 2rem;">Step-by-Step Strategy</h3>
<ol style="margin: 1rem 0; padding-left: 2rem;">
<li>Write down the differences between consecutive terms</li>
<li>Check if the differences are constant (arithmetic sequence)</li>
<li>If not, check the ratios between consecutive terms</li>
<li>Look for special sequences (squares, cubes, primes, etc.)</li>
<li>Test your pattern by checking it works for all given terms</li>
</ol>

<h3 style="margin-top: 2rem;">Example Problems</h3>

<h4 style="margin-top: 1.5rem;">Example 1</h4>
<p style="margin: 0.75rem 0;"><strong>Problem:</strong> What is the next number in the sequence: 2, 6, 12, 20, 30, ?</p>
<p style="margin: 0.75rem 0;">A. 36<br>B. 40<br>C. 42<br>D. 44</p>
<p style="margin: 0.75rem 0;"><strong>Solution:</strong> Look at the differences between terms:</p>
<p style="margin: 0.75rem 0;">6-2=4, 12-6=6, 20-12=8, 30-20=10</p>
<p style="margin: 0.75rem 0;">The differences form a pattern: 4, 6, 8, 10... (increasing by 2)</p>
<p style="margin: 0.75rem 0;">So the next difference should be 12, making the next term: 30 + 12 = 42</p>
<p style="margin: 0.75rem 0;"><strong>Answer: C</strong></p>

<h4 style="margin-top: 1.5rem;">Key Takeaway</h4>
<p style="background: #FFF3CD; padding: 1rem; border-left: 4px solid #FFA500; margin: 1rem 0;">Always look at the differences between consecutive terms first. If those differences aren't constant, check if the differences themselves form a pattern. Pattern questions test your ability to spot relationships—practice is key!</p>
</div>
`,

  'Permutations and Combinations': `
<div class="lesson-content">
<p class="lesson-intro" style="margin: 0.75rem 0;">Permutations and combinations are two ways of counting arrangements. The difference is simple: permutations care about order, combinations don't. Understanding when to use each is the key to solving these problems quickly.</p>

<h3 style="margin-top: 2rem;">The Fundamental Difference</h3>
<p style="margin: 0.75rem 0;"><strong>Permutations:</strong> Order matters. "ABC" is different from "BAC".</p>
<p style="margin: 0.75rem 0;"><strong>Combinations:</strong> Order doesn't matter. "ABC" is the same as "BAC".</p>

<h3 style="margin-top: 2rem;">When to Use Each</h3>
<ul style="margin: 1rem 0; padding-left: 2rem;">
<li><strong>Permutations:</strong> Arranging people in a line, assigning positions (1st, 2nd, 3rd), creating passwords</li>
<li><strong>Combinations:</strong> Selecting a committee, choosing pizza toppings, picking lottery numbers</li>
</ul>

<h3 style="margin-top: 2rem;">Formulas</h3>

<h4 style="margin-top: 1.5rem;">Permutations</h4>
<p style="margin: 0.75rem 0;">Number of permutations of n items taken r at a time:</p>
<p style="margin: 0.75rem 0;">P(n,r) = n!/(n-r)!</p>
<p style="margin: 0.75rem 0;">Example: Arranging 3 books from 5 books = 5!/(5-3)! = 5!/2! = 60</p>

<h4 style="margin-top: 1.5rem;">Combinations</h4>
<p style="margin: 0.75rem 0;">Number of combinations of n items taken r at a time:</p>
<p style="margin: 0.75rem 0;">C(n,r) = n!/[r!(n-r)!]</p>
<p style="margin: 0.75rem 0;">Example: Choosing 3 books from 5 books = 5!/[3!(5-3)!] = 5!/(3!2!) = 10</p>

<h3 style="margin-top: 2rem;">Quick Decision Rule</h3>
<p style="background: #FFF3CD; padding: 1rem; border-left: 4px solid #FFA500; margin: 1rem 0;">Ask yourself: "Does the order matter?" If yes, use permutations. If no, use combinations.</p>

<h3 style="margin-top: 2rem;">Example Problems</h3>

<h4 style="margin-top: 1.5rem;">Example 1</h4>
<p style="margin: 0.75rem 0;"><strong>Problem:</strong> A club has 10 members. How many ways can they choose a president, vice president, and treasurer?</p>
<p style="margin: 0.75rem 0;">A. 30<br>B. 120<br>C. 720<br>D. 1000</p>
<p style="margin: 0.75rem 0;"><strong>Solution:</strong> Order matters here (president ≠ vice president), so use permutations:</p>
<p style="margin: 0.75rem 0;">P(10,3) = 10!/(10-3)! = 10!/7! = 10×9×8 = 720</p>
<p style="margin: 0.75rem 0;"><strong>Answer: C</strong></p>

<h4 style="margin-top: 1.5rem;">Key Takeaway</h4>
<p style="background: #FFF3CD; padding: 1rem; border-left: 4px solid #FFA500; margin: 1rem 0;">Remember: Permutations = order matters. Combinations = order doesn't matter. When in doubt, ask yourself if swapping two items would create a different outcome!</p>
</div>
`
};

async function enhanceShortLessons() {
  console.log('✨ Enhancing short lessons with comprehensive content...\n');

  const { data: lessons } = await supabase
    .from('lessons')
    .select('*')
    .eq('subject', 'math')
    .order('order_index');

  for (const [title, enhancedContent] of Object.entries(enhancements)) {
    const lesson = lessons.find(l => l.title === title);

    if (lesson) {
      console.log(`Enhancing: ${title}`);

      await supabase
        .from('lessons')
        .update({
          content: enhancedContent,
          updated_at: new Date().toISOString()
        })
        .eq('id', lesson.id);

      console.log(`   ✅ Enhanced from ${lesson.content.split(/\s+/).length} to ~${enhancedContent.split(/\s+/).length} words\n`);
    }
  }

  console.log('✅ First batch of enhancements complete! (3/8 lessons)');
}

enhanceShortLessons();
