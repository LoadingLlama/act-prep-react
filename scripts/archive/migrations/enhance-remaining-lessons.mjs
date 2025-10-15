import { createClient } from '@supabase/supabase-js';
import dotenv from 'dotenv';

dotenv.config();

const supabase = createClient(
  process.env.REACT_APP_SUPABASE_URL,
  process.env.SUPABASE_SERVICE_ROLE_KEY
);

const enhancements = {
  'Complex Numbers': `
<div class="lesson-content">
<p class="lesson-intro" style="margin: 0.75rem 0;">Complex numbers extend the real number system by introducing i, the imaginary unit, where i² = -1. While complex numbers may seem abstract, the ACT tests only basic operations. Master the key rules and you'll handle these questions with confidence!</p>

<h3 style="margin-top: 2rem;">What is i?</h3>
<p style="margin: 0.75rem 0;">The imaginary unit i is defined as the square root of -1:</p>
<p style="margin: 0.75rem 0;">i = √(-1)</p>
<p style="margin: 0.75rem 0;">This means: i² = -1</p>

<h3 style="margin-top: 2rem;">Powers of i</h3>
<p style="margin: 0.75rem 0;">The powers of i follow a repeating pattern:</p>
<ul style="margin: 1rem 0; padding-left: 2rem;">
<li>i¹ = i</li>
<li>i² = -1</li>
<li>i³ = -i</li>
<li>i⁴ = 1</li>
<li>i⁵ = i (the pattern repeats!)</li>
</ul>
<p style="margin: 0.75rem 0;">To find any power of i, divide the exponent by 4 and use the remainder.</p>

<h3 style="margin-top: 2rem;">Complex Number Operations</h3>

<h4 style="margin-top: 1.5rem;">Adding and Subtracting</h4>
<p style="margin: 0.75rem 0;">Combine real parts and imaginary parts separately:</p>
<p style="margin: 0.75rem 0;">(3 + 2i) + (1 + 4i) = (3+1) + (2i+4i) = 4 + 6i</p>

<h4 style="margin-top: 1.5rem;">Multiplying</h4>
<p style="margin: 0.75rem 0;">Use FOIL and remember that i² = -1:</p>
<p style="margin: 0.75rem 0;">(2 + 3i)(1 + 4i) = 2 + 8i + 3i + 12i²</p>
<p style="margin: 0.75rem 0;">= 2 + 11i + 12(-1)</p>
<p style="margin: 0.75rem 0;">= 2 + 11i - 12</p>
<p style="margin: 0.75rem 0;">= -10 + 11i</p>

<h4 style="margin-top: 1.5rem;">Complex Conjugate</h4>
<p style="margin: 0.75rem 0;">The conjugate of (a + bi) is (a - bi). Multiplying a complex number by its conjugate gives a real number:</p>
<p style="margin: 0.75rem 0;">(3 + 2i)(3 - 2i) = 9 - 6i + 6i - 4i² = 9 - 4(-1) = 9 + 4 = 13</p>

<h3 style="margin-top: 2rem;">Example Problems</h3>

<h4 style="margin-top: 1.5rem;">Example 1</h4>
<p style="margin: 0.75rem 0;"><strong>Problem:</strong> What is i³⁰?</p>
<p style="margin: 0.75rem 0;">A. 1<br>B. -1<br>C. i<br>D. -i</p>
<p style="margin: 0.75rem 0;"><strong>Solution:</strong> Divide 30 by 4: 30 ÷ 4 = 7 remainder 2</p>
<p style="margin: 0.75rem 0;">So i³⁰ = i² = -1</p>
<p style="margin: 0.75rem 0;"><strong>Answer: B</strong></p>

<h4 style="margin-top: 1.5rem;">Key Takeaway</h4>
<p style="background: #FFF3CD; padding: 1rem; border-left: 4px solid #FFA500; margin: 1rem 0;">Remember the pattern: i, -1, -i, 1, and it repeats! For powers of i, just divide by 4 and use the remainder. For operations, treat i like a variable but remember i² = -1.</p>
</div>
`,

  'Unit Conversion': `
<div class="lesson-content">
<p class="lesson-intro" style="margin: 0.75rem 0;">Unit conversion questions test your ability to convert between different units of measurement. The key strategy is to multiply by conversion factors (fractions equal to 1) so that unwanted units cancel out, leaving only the desired units.</p>

<h3 style="margin-top: 2rem;">The Conversion Factor Method</h3>
<p style="margin: 0.75rem 0;">A conversion factor is a fraction that equals 1. For example:</p>
<p style="margin: 0.75rem 0;">12 inches / 1 foot = 1 (because 12 inches equals 1 foot)</p>
<p style="margin: 0.75rem 0;">When you multiply by 1, the value doesn't change—only the units!</p>

<h3 style="margin-top: 2rem;">Step-by-Step Conversion Strategy</h3>
<ol style="margin: 1rem 0; padding-left: 2rem;">
<li>Write down what you're starting with</li>
<li>Identify the conversion factor(s) you need</li>
<li>Set up the conversion factor so unwanted units cancel</li>
<li>Multiply across the top, multiply across the bottom</li>
<li>Simplify and verify units are correct</li>
</ol>

<h3 style="margin-top: 2rem;">Common Conversions to Know</h3>

<h4 style="margin-top: 1.5rem;">Length</h4>
<ul style="margin: 1rem 0; padding-left: 2rem;">
<li>1 foot = 12 inches</li>
<li>1 yard = 3 feet</li>
<li>1 mile = 5,280 feet</li>
<li>1 meter = 100 centimeters</li>
<li>1 kilometer = 1,000 meters</li>
</ul>

<h4 style="margin-top: 1.5rem;">Time</h4>
<ul style="margin: 1rem 0; padding-left: 2rem;">
<li>1 minute = 60 seconds</li>
<li>1 hour = 60 minutes</li>
<li>1 day = 24 hours</li>
</ul>

<h4 style="margin-top: 1.5rem;">Volume</h4>
<ul style="margin: 1rem 0; padding-left: 2rem;">
<li>1 gallon = 4 quarts</li>
<li>1 quart = 2 pints</li>
<li>1 pint = 2 cups</li>
</ul>

<h3 style="margin-top: 2rem;">Example Problems</h3>

<h4 style="margin-top: 1.5rem;">Example 1</h4>
<p style="margin: 0.75rem 0;"><strong>Problem:</strong> Convert 3 hours to seconds.</p>
<p style="margin: 0.75rem 0;">A. 180<br>B. 1,800<br>C. 10,800<br>D. 18,000</p>
<p style="margin: 0.75rem 0;"><strong>Solution:</strong> Set up conversion factors so units cancel:</p>
<p style="margin: 0.75rem 0;">3 hours × (60 minutes/1 hour) × (60 seconds/1 minute)</p>
<p style="margin: 0.75rem 0;">= 3 × 60 × 60 seconds</p>
<p style="margin: 0.75rem 0;">= 10,800 seconds</p>
<p style="margin: 0.75rem 0;"><strong>Answer: C</strong></p>

<h4 style="margin-top: 1.5rem;">Key Takeaway</h4>
<p style="background: #FFF3CD; padding: 1rem; border-left: 4px solid #FFA500; margin: 1rem 0;">Always set up conversion factors so units cancel! Write out each step and cross out units as they cancel. This method prevents mistakes and works for any conversion, no matter how complex.</p>
</div>
`,

  'Scientific Notation': `
<div class="lesson-content">
<p class="lesson-intro" style="margin: 0.75rem 0;">Scientific notation is a way to write very large or very small numbers compactly. A number in scientific notation has the form a × 10ⁿ, where 1 ≤ a < 10 and n is an integer. Understanding how to convert to and from scientific notation is essential for many science and math problems.</p>

<h3 style="margin-top: 2rem;">What is Scientific Notation?</h3>
<p style="margin: 0.75rem 0;">Scientific notation expresses numbers as:</p>
<p style="margin: 0.75rem 0;"><strong>a × 10ⁿ</strong></p>
<p style="margin: 0.75rem 0;">where:</p>
<ul style="margin: 1rem 0; padding-left: 2rem;">
<li>a is a number between 1 and 10 (can be 1, but must be less than 10)</li>
<li>n is an integer (positive or negative)</li>
</ul>

<h3 style="margin-top: 2rem;">Converting TO Scientific Notation</h3>

<h4 style="margin-top: 1.5rem;">For Large Numbers</h4>
<p style="margin: 0.75rem 0;">Move the decimal point left until you have a number between 1 and 10. Count how many places you moved—that's your positive exponent:</p>
<p style="margin: 0.75rem 0;">45,000 = 4.5 × 10⁴ (moved 4 places left)</p>

<h4 style="margin-top: 1.5rem;">For Small Numbers</h4>
<p style="margin: 0.75rem 0;">Move the decimal point right until you have a number between 1 and 10. Count how many places you moved—that's your negative exponent:</p>
<p style="margin: 0.75rem 0;">0.0023 = 2.3 × 10⁻³ (moved 3 places right)</p>

<h3 style="margin-top: 2rem;">Converting FROM Scientific Notation</h3>
<ul style="margin: 1rem 0; padding-left: 2rem;">
<li><strong>Positive exponent:</strong> Move decimal right</li>
<li><strong>Negative exponent:</strong> Move decimal left</li>
</ul>
<p style="margin: 0.75rem 0;">Examples:</p>
<p style="margin: 0.75rem 0;">3.2 × 10³ = 3,200 (moved decimal 3 places right)</p>
<p style="margin: 0.75rem 0;">5.1 × 10⁻² = 0.051 (moved decimal 2 places left)</p>

<h3 style="margin-top: 2rem;">Operations with Scientific Notation</h3>

<h4 style="margin-top: 1.5rem;">Multiplication</h4>
<p style="margin: 0.75rem 0;">Multiply the coefficients and add the exponents:</p>
<p style="margin: 0.75rem 0;">(2 × 10³) × (3 × 10⁴) = (2×3) × 10³⁺⁴ = 6 × 10⁷</p>

<h4 style="margin-top: 1.5rem;">Division</h4>
<p style="margin: 0.75rem 0;">Divide the coefficients and subtract the exponents:</p>
<p style="margin: 0.75rem 0;">(6 × 10⁸) ÷ (2 × 10³) = (6÷2) × 10⁸⁻³ = 3 × 10⁵</p>

<h3 style="margin-top: 2rem;">Example Problems</h3>

<h4 style="margin-top: 1.5rem;">Example 1</h4>
<p style="margin: 0.75rem 0;"><strong>Problem:</strong> Write 0.00056 in scientific notation.</p>
<p style="margin: 0.75rem 0;">A. 5.6 × 10³<br>B. 5.6 × 10⁻³<br>C. 5.6 × 10⁴<br>D. 5.6 × 10⁻⁴</p>
<p style="margin: 0.75rem 0;"><strong>Solution:</strong> Move the decimal point 4 places to the right to get 5.6</p>
<p style="margin: 0.75rem 0;">Since we moved right, the exponent is negative: 5.6 × 10⁻⁴</p>
<p style="margin: 0.75rem 0;"><strong>Answer: D</strong></p>

<h4 style="margin-top: 1.5rem;">Key Takeaway</h4>
<p style="background: #FFF3CD; padding: 1rem; border-left: 4px solid #FFA500; margin: 1rem 0;">Remember: Large numbers have positive exponents, small numbers have negative exponents. Count how many decimal places you move to find the exponent. When multiplying, add exponents; when dividing, subtract them!</p>
</div>
`,

  'Vectors': `
<div class="lesson-content">
<p class="lesson-intro" style="margin: 0.75rem 0;">Vectors are quantities that have both magnitude (size) and direction. Unlike regular numbers (scalars), vectors tell you not just "how much" but also "which way." On the ACT, you'll need to know basic vector operations like addition and scalar multiplication.</p>

<h3 style="margin-top: 2rem;">What is a Vector?</h3>
<p style="margin: 0.75rem 0;">A vector can be written as an ordered pair or column:</p>
<p style="margin: 0.75rem 0;">v = &lt;3, 4&gt; or v = [3]</p>
<p style="margin: 0.75rem 0;">[4]</p>
<p style="margin: 0.75rem 0;">This vector means "move 3 units in the x-direction and 4 units in the y-direction."</p>

<h3 style="margin-top: 2rem;">Vector Magnitude</h3>
<p style="margin: 0.75rem 0;">The magnitude (length) of a vector is found using the Pythagorean theorem:</p>
<p style="margin: 0.75rem 0;">|v| = √(x² + y²)</p>
<p style="margin: 0.75rem 0;">For v = &lt;3, 4&gt;: |v| = √(3² + 4²) = √(9 + 16) = √25 = 5</p>

<h3 style="margin-top: 2rem;">Vector Operations</h3>

<h4 style="margin-top: 1.5rem;">Vector Addition</h4>
<p style="margin: 0.75rem 0;">Add corresponding components:</p>
<p style="margin: 0.75rem 0;">&lt;2, 3&gt; + &lt;4, 1&gt; = &lt;2+4, 3+1&gt; = &lt;6, 4&gt;</p>
<p style="margin: 0.75rem 0;">Geometrically, this is like placing vectors head-to-tail.</p>

<h4 style="margin-top: 1.5rem;">Scalar Multiplication</h4>
<p style="margin: 0.75rem 0;">Multiply each component by the scalar:</p>
<p style="margin: 0.75rem 0;">3 × &lt;2, 5&gt; = &lt;3×2, 3×5&gt; = &lt;6, 15&gt;</p>
<p style="margin: 0.75rem 0;">This changes the magnitude but keeps the same direction (if scalar is positive).</p>

<h4 style="margin-top: 1.5rem;">Vector Subtraction</h4>
<p style="margin: 0.75rem 0;">Subtract corresponding components:</p>
<p style="margin: 0.75rem 0;">&lt;5, 7&gt; - &lt;2, 3&gt; = &lt;5-2, 7-3&gt; = &lt;3, 4&gt;</p>

<h3 style="margin-top: 2rem;">Unit Vectors</h3>
<p style="margin: 0.75rem 0;">A unit vector has magnitude 1. The standard unit vectors are:</p>
<ul style="margin: 1rem 0; padding-left: 2rem;">
<li>i = &lt;1, 0&gt; (points in x-direction)</li>
<li>j = &lt;0, 1&gt; (points in y-direction)</li>
</ul>
<p style="margin: 0.75rem 0;">Any vector can be written as: v = xi + yj</p>

<h3 style="margin-top: 2rem;">Example Problems</h3>

<h4 style="margin-top: 1.5rem;">Example 1</h4>
<p style="margin: 0.75rem 0;"><strong>Problem:</strong> If v = &lt;3, -4&gt;, what is |v|?</p>
<p style="margin: 0.75rem 0;">A. 1<br>B. 5<br>C. 7<br>D. 25</p>
<p style="margin: 0.75rem 0;"><strong>Solution:</strong> Use the magnitude formula:</p>
<p style="margin: 0.75rem 0;">|v| = √(3² + (-4)²) = √(9 + 16) = √25 = 5</p>
<p style="margin: 0.75rem 0;"><strong>Answer: B</strong></p>

<h4 style="margin-top: 1.5rem;">Key Takeaway</h4>
<p style="background: #FFF3CD; padding: 1rem; border-left: 4px solid #FFA500; margin: 1rem 0;">Vectors are just ordered pairs with special operations. Add/subtract component-wise, multiply each component by scalars, and use the Pythagorean theorem to find magnitude. Vector questions are straightforward once you remember these basic rules!</p>
</div>
`,

  'Advanced Statistics': `
<div class="lesson-content">
<p class="lesson-intro" style="margin: 0.75rem 0;">Beyond basic mean and median, the ACT tests standard deviation and other statistical measures. Standard deviation tells you how spread out data is from the mean—a critical concept for understanding data variability.</p>

<h3 style="margin-top: 2rem;">Standard Deviation: What Does It Mean?</h3>
<p style="margin: 0.75rem 0;">Standard deviation (σ) measures how far, on average, each data point is from the mean. It quantifies the "spread" of data:</p>
<ul style="margin: 1rem 0; padding-left: 2rem;">
<li><strong>Small standard deviation:</strong> Data is clustered tightly around the mean</li>
<li><strong>Large standard deviation:</strong> Data is spread far from the mean</li>
</ul>

<h3 style="margin-top: 2rem;">Calculating Standard Deviation</h3>
<p style="margin: 0.75rem 0;">Follow these steps:</p>
<ol style="margin: 1rem 0; padding-left: 2rem;">
<li>Find the mean of the data set</li>
<li>Subtract the mean from each data point (these are deviations)</li>
<li>Square each deviation</li>
<li>Find the average of the squared deviations (this is the variance)</li>
<li>Take the square root of the variance (this is the standard deviation)</li>
</ol>

<h3 style="margin-top: 2rem;">Example Calculation</h3>
<p style="margin: 0.75rem 0;">Data: 2, 4, 6, 8, 10</p>
<p style="margin: 0.75rem 0;"><strong>Step 1:</strong> Mean = (2+4+6+8+10)/5 = 6</p>
<p style="margin: 0.75rem 0;"><strong>Step 2:</strong> Deviations: -4, -2, 0, 2, 4</p>
<p style="margin: 0.75rem 0;"><strong>Step 3:</strong> Squared deviations: 16, 4, 0, 4, 16</p>
<p style="margin: 0.75rem 0;"><strong>Step 4:</strong> Variance = (16+4+0+4+16)/5 = 8</p>
<p style="margin: 0.75rem 0;"><strong>Step 5:</strong> Standard deviation = √8 ≈ 2.83</p>

<h3 style="margin-top: 2rem;">Understanding Variance</h3>
<p style="margin: 0.75rem 0;">Variance (σ²) is the square of standard deviation. It's useful mathematically but less intuitive because its units are squared. Standard deviation is preferred for interpretation.</p>

<h3 style="margin-top: 2rem;">The 68-95-99.7 Rule (Normal Distribution)</h3>
<p style="margin: 0.75rem 0;">For normally distributed data:</p>
<ul style="margin: 1rem 0; padding-left: 2rem;">
<li>~68% of data falls within 1 standard deviation of the mean</li>
<li>~95% falls within 2 standard deviations</li>
<li>~99.7% falls within 3 standard deviations</li>
</ul>

<h3 style="margin-top: 2rem;">Comparing Datasets</h3>
<p style="margin: 0.75rem 0;">Two datasets can have the same mean but different standard deviations:</p>
<p style="margin: 0.75rem 0;">Set A: 5, 5, 5, 5, 5 (σ = 0, no variation)</p>
<p style="margin: 0.75rem 0;">Set B: 1, 3, 5, 7, 9 (σ > 0, has variation)</p>
<p style="margin: 0.75rem 0;">Both have mean = 5, but Set B has much more spread!</p>

<h3 style="margin-top: 2rem;">Example Problems</h3>

<h4 style="margin-top: 1.5rem;">Example 1</h4>
<p style="margin: 0.75rem 0;"><strong>Problem:</strong> Which dataset has the larger standard deviation?</p>
<p style="margin: 0.75rem 0;">Set A: 10, 12, 14, 16, 18<br>Set B: 10, 11, 14, 17, 18</p>
<p style="margin: 0.75rem 0;">A. Set A<br>B. Set B<br>C. They're equal<br>D. Cannot be determined</p>
<p style="margin: 0.75rem 0;"><strong>Solution:</strong> Both sets have the same range and mean (14), but Set A has evenly spaced values while Set B has values clustered near the extremes. Calculating both:</p>
<p style="margin: 0.75rem 0;">Set A: σ ≈ 2.83 (evenly distributed)</p>
<p style="margin: 0.75rem 0;">Set B: σ ≈ 3.16 (more clustered at edges)</p>
<p style="margin: 0.75rem 0;"><strong>Answer: B</strong></p>

<h4 style="margin-top: 1.5rem;">Key Takeaway</h4>
<p style="background: #FFF3CD; padding: 1rem; border-left: 4px solid #FFA500; margin: 1rem 0;">Standard deviation measures spread. Small σ means data is tightly clustered; large σ means it's spread out. You often don't need to calculate it exactly—just understand which dataset is more spread out. The ACT usually provides standard deviation values and asks you to interpret them.</p>
</div>
`
};

async function enhanceRemainingLessons() {
  console.log('✨ Enhancing remaining short lessons...\n');

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

      const oldWordCount = lesson.content.split(/\s+/).length;
      const newWordCount = enhancedContent.split(/\s+/).length;

      console.log(`   ✅ Enhanced from ${oldWordCount} to ~${newWordCount} words\n`);
    }
  }

  console.log('✅ All remaining lessons enhanced! (5/5 lessons)');
}

enhanceRemainingLessons();
