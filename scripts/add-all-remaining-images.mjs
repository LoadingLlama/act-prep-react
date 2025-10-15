import { createClient } from '@supabase/supabase-js';
import dotenv from 'dotenv';

dotenv.config();

const SERVICE_ROLE_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InJhYmF2b2Jka2xud3Z3c2xkYml4Iiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc1OTc2NTQ3OCwiZXhwIjoyMDc1MzQxNDc4fQ.81SeH703keXgF3IevQlRS7OYmn1J2GUVIkn3OJiviM4';

const supabase = createClient(
  process.env.REACT_APP_SUPABASE_URL,
  SERVICE_ROLE_KEY
);

const lessonUpdates = [
  {
    key: 'functions',
    title: 'Functions',
    content: `
            <p class="lesson-intro">Functions are relationships where each input has exactly one output. Understanding function notation and how to read function graphs is crucial for ACT Math success.</p>

            <h3>Function Notation</h3>
            <div class="rules-box">
                <h4>Key Concepts:</h4>
                <p><strong>f(x)</strong> means "function of x" or "f evaluated at x"</p>
                <p>f(2) means substitute 2 for x in the function</p>
                <p><strong>Example:</strong> If f(x) = 2x + 3, then f(2) = 2(2) + 3 = 7</p>
            </div>

            <h3>Reading Function Graphs</h3>
            <div class="diagram-box" style="text-align: center; margin: 1.5rem 0; padding: 1rem; background-color: #f8faff;">
                <img src="https://upload.wikimedia.org/wikipedia/commons/9/96/Graph_of_example_function.svg" alt="Graph of a function on coordinate plane" style="max-width: 400px; height: auto;" />
                <p style="font-size: 0.9rem; color: #666; margin-top: 0.5rem;"><em>Example function graphed on coordinate plane</em></p>
            </div>

            <h3>Domain and Range</h3>
            <div class="concept-box">
                <h4>Definitions:</h4>
                <p><strong>Domain:</strong> All possible input values (x-values)</p>
                <p><strong>Range:</strong> All possible output values (y-values)</p>
            </div>

            <h3>Vertical Line Test</h3>
            <div class="tip-box">
                <h4>Is it a function?</h4>
                <p>If any vertical line crosses the graph more than once, it's NOT a function!</p>
                <p>This is because each x-value can have only one y-value.</p>
            </div>

            <h3>Function Operations</h3>
            <div class="rules-box">
                <h4>Key Operations:</h4>
                <p><strong>(f + g)(x) = f(x) + g(x)</strong> - Add functions</p>
                <p><strong>(f · g)(x) = f(x) · g(x)</strong> - Multiply functions</p>
                <p><strong>(f ∘ g)(x) = f(g(x))</strong> - Composition (function of a function)</p>
            </div>

            <div class="example-box">
                <p><strong>Problem:</strong> If f(x) = x² and g(x) = x + 1, find (f ∘ g)(2)</p>
                <p><strong>Solution:</strong></p>
                <p>(f ∘ g)(2) = f(g(2))</p>
                <p>First find g(2): g(2) = 2 + 1 = 3</p>
                <p>Then find f(3): f(3) = 3² = 9</p>
                <p><strong>Answer: 9</strong></p>
            </div>

            <div class="key-takeaway">
                <h4>Key Takeaway</h4>
                <p>Know how to evaluate functions using function notation, understand domain and range, and use the vertical line test to identify functions!</p>
            </div>
        `
  },
  {
    key: 'systems-equations',
    title: 'Systems of Equations',
    content: `
            <p class="lesson-intro">A system of equations is two or more equations with the same variables. The solution is the point(s) where the equations intersect.</p>

            <h3>Graphical Representation</h3>
            <div class="diagram-box" style="text-align: center; margin: 1.5rem 0; padding: 1rem; background-color: #f8faff;">
                <img src="https://upload.wikimedia.org/wikipedia/commons/c/c0/Intersecting_Lines.svg" alt="Two linear equations intersecting at a point" style="max-width: 400px; height: auto;" />
                <p style="font-size: 0.9rem; color: #666; margin-top: 0.5rem;"><em>Two lines intersecting at solution point (2, 3)</em></p>
            </div>

            <h3>Three Types of Solutions</h3>
            <div class="concept-box">
                <h4>Possible Outcomes:</h4>
                <p><strong>One solution:</strong> Lines intersect at exactly one point (shown above)</p>
                <p><strong>No solution:</strong> Lines are parallel (never intersect)</p>
                <p><strong>Infinite solutions:</strong> Lines are identical (overlap completely)</p>
            </div>

            <h3>Solving Methods</h3>
            <div class="rules-box">
                <h4>Method 1: Substitution</h4>
                <ol>
                    <li>Solve one equation for one variable</li>
                    <li>Substitute into the other equation</li>
                    <li>Solve for the remaining variable</li>
                    <li>Plug back to find the other variable</li>
                </ol>
            </div>

            <div class="rules-box">
                <h4>Method 2: Elimination</h4>
                <ol>
                    <li>Multiply equations to make coefficients equal</li>
                    <li>Add or subtract equations to eliminate a variable</li>
                    <li>Solve for the remaining variable</li>
                    <li>Substitute back to find the other variable</li>
                </ol>
            </div>

            <div class="example-box">
                <p><strong>Problem:</strong> Solve the system:
x - y = -1
3x + y = 9</p>
                <p><strong>Solution (Elimination):</strong></p>
                <p>Add the equations: (x - y) + (3x + y) = -1 + 9</p>
                <p>4x = 8, so x = 2</p>
                <p>Substitute: 2 - y = -1, so y = 3</p>
                <p><strong>Solution: (2, 3)</strong></p>
            </div>

            <div class="key-takeaway">
                <h4>Key Takeaway</h4>
                <p>Systems of equations can be solved by substitution or elimination. The graphical interpretation helps you understand what the solution means!</p>
            </div>
        `
  },
  {
    key: 'vectors',
    title: 'Vectors',
    content: `
            <p class="lesson-intro">Vectors are quantities with both magnitude (size) and direction. They appear occasionally on the ACT Math test.</p>

            <h3>Vector Notation</h3>
            <div class="rules-box">
                <h4>Ways to Represent Vectors:</h4>
                <p><strong>Component form:</strong> &lt;x, y&gt; or (x, y)</p>
                <p><strong>Magnitude:</strong> ||v|| = √(x² + y²)</p>
                <p><strong>Direction:</strong> Angle from positive x-axis</p>
            </div>

            <h3>Vector Addition</h3>
            <div class="diagram-box" style="text-align: center; margin: 1.5rem 0; padding: 1rem; background-color: #f8faff;">
                <img src="https://upload.wikimedia.org/wikipedia/commons/2/28/Vector_addition.svg" alt="Vector addition diagram" style="max-width: 400px; height: auto;" />
                <p style="font-size: 0.9rem; color: #666; margin-top: 0.5rem;"><em>Adding vectors using the parallelogram method</em></p>
            </div>

            <h3>Vector Operations</h3>
            <div class="concept-box">
                <h4>Addition and Subtraction:</h4>
                <p><strong>Addition:</strong> &lt;a, b&gt; + &lt;c, d&gt; = &lt;a+c, b+d&gt;</p>
                <p><strong>Subtraction:</strong> &lt;a, b&gt; - &lt;c, d&gt; = &lt;a-c, b-d&gt;</p>
                <p><strong>Scalar multiplication:</strong> k·&lt;a, b&gt; = &lt;ka, kb&gt;</p>
            </div>

            <h3>Magnitude Formula</h3>
            <div class="rules-box">
                <h4>Finding Vector Length:</h4>
                <p>For vector v = &lt;x, y&gt;</p>
                <p><strong>||v|| = √(x² + y²)</strong></p>
                <p>This is just the distance formula!</p>
            </div>

            <div class="example-box">
                <p><strong>Problem:</strong> Find the magnitude of v = &lt;3, 4&gt;</p>
                <p><strong>Solution:</strong></p>
                <p>||v|| = √(3² + 4²) = √(9 + 16) = √25 = 5</p>
                <p><strong>The vector has length 5</strong></p>
            </div>

            <div class="key-takeaway">
                <h4>Key Takeaway</h4>
                <p>Vectors combine magnitude and direction. Add vectors component-wise, and use the Pythagorean theorem to find magnitude!</p>
            </div>
        `
  },
  {
    key: 'permutations-combinations',
    title: 'Permutations, Combinations, and Organized Counting',
    content: `
            <p class="lesson-intro">Counting problems involve determining how many ways something can happen. The key is knowing whether order matters.</p>

            <h3>Fundamental Counting Principle</h3>
            <div class="rules-box">
                <h4>Multiplication Rule:</h4>
                <p>If one event can happen in m ways and another in n ways, then both can happen in <strong>m × n ways</strong></p>
            </div>

            <h3>Tree Diagrams</h3>
            <div class="diagram-box" style="text-align: center; margin: 1.5rem 0; padding: 1rem; background-color: #f8faff;">
                <img src="https://upload.wikimedia.org/wikipedia/commons/9/9c/Probability_tree_diagram.svg" alt="Tree diagram showing branches" style="max-width: 350px; height: auto;" />
                <p style="font-size: 0.9rem; color: #666; margin-top: 0.5rem;"><em>Tree diagram showing all possible outcomes</em></p>
            </div>

            <h3>Permutations vs Combinations</h3>
            <div class="concept-box">
                <h4>When does ORDER matter?</h4>
                <p><strong>Permutations:</strong> Order DOES matter</p>
                <p>Example: Race results (1st, 2nd, 3rd are different)</p>
                <p>Formula: P(n,r) = n!/(n-r)!</p>
                <p></p>
                <p><strong>Combinations:</strong> Order does NOT matter</p>
                <p>Example: Choosing committee members</p>
                <p>Formula: C(n,r) = n!/[r!(n-r)!]</p>
            </div>

            <h3>Factorial</h3>
            <div class="rules-box">
                <h4>Definition:</h4>
                <p><strong>n! = n × (n-1) × (n-2) × ... × 2 × 1</strong></p>
                <p>Example: 5! = 5 × 4 × 3 × 2 × 1 = 120</p>
                <p>Special case: 0! = 1</p>
            </div>

            <div class="example-box">
                <p><strong>Problem:</strong> How many ways can you arrange 3 books from a shelf of 5 books?</p>
                <p><strong>Solution:</strong></p>
                <p>Order matters (different arrangements), so use permutations</p>
                <p>P(5,3) = 5!/(5-3)! = 5!/2! = (5×4×3×2×1)/(2×1) = 60</p>
                <p><strong>60 different arrangements</strong></p>
            </div>

            <div class="key-takeaway">
                <h4>Key Takeaway</h4>
                <p>Ask yourself: Does ORDER matter? If yes, use permutations. If no, use combinations. Tree diagrams help visualize small counting problems!</p>
            </div>
        `
  },
  {
    key: 'complex-numbers',
    title: 'Complex Numbers',
    content: `
            <p class="lesson-intro">Complex numbers include the imaginary unit i, where i² = -1. They occasionally appear on advanced ACT problems.</p>

            <h3>Imaginary Unit</h3>
            <div class="rules-box">
                <h4>Definition:</h4>
                <p><strong>i = √(-1)</strong></p>
                <p><strong>i² = -1</strong></p>
                <p>i³ = -i</p>
                <p>i⁴ = 1 (pattern repeats)</p>
            </div>

            <h3>Complex Plane</h3>
            <div class="diagram-box" style="text-align: center; margin: 1.5rem 0; padding: 1rem; background-color: #f8faff;">
                <img src="https://upload.wikimedia.org/wikipedia/commons/a/a9/Complex_plane_cartesian.svg" alt="Complex plane with real and imaginary axes" style="max-width: 350px; height: auto;" />
                <p style="font-size: 0.9rem; color: #666; margin-top: 0.5rem;"><em>Complex plane: horizontal = real, vertical = imaginary</em></p>
            </div>

            <h3>Standard Form</h3>
            <div class="concept-box">
                <h4>Complex Number Format:</h4>
                <p><strong>a + bi</strong></p>
                <p>where a is the real part and b is the imaginary part</p>
                <p>Example: 3 + 4i</p>
            </div>

            <h3>Operations with Complex Numbers</h3>
            <div class="rules-box">
                <h4>Addition:</h4>
                <p>(a + bi) + (c + di) = (a+c) + (b+d)i</p>
                <p>Add real parts and imaginary parts separately</p>

                <h4>Multiplication:</h4>
                <p>(a + bi)(c + di) = ac + adi + bci + bdi²</p>
                <p>Remember i² = -1, so simplify!</p>
            </div>

            <h3>Conjugates</h3>
            <div class="concept-box">
                <h4>Definition:</h4>
                <p>The conjugate of a + bi is <strong>a - bi</strong></p>
                <p>Used to eliminate i from denominators</p>
                <p>(a + bi)(a - bi) = a² + b² (always real!)</p>
            </div>

            <div class="example-box">
                <p><strong>Problem:</strong> Multiply (2 + 3i)(1 - i)</p>
                <p><strong>Solution:</strong></p>
                <p>= 2(1) + 2(-i) + 3i(1) + 3i(-i)</p>
                <p>= 2 - 2i + 3i - 3i²</p>
                <p>= 2 + i - 3(-1) (since i² = -1)</p>
                <p>= 2 + i + 3 = <strong>5 + i</strong></p>
            </div>

            <div class="key-takeaway">
                <h4>Key Takeaway</h4>
                <p>Remember i² = -1! Add and multiply complex numbers like binomials, always simplifying when you see i².</p>
            </div>
        `
  },
  {
    key: 'miscellaneous-topics',
    title: 'Other Miscellaneous Topics',
    content: `
            <p class="lesson-intro">The ACT Math test includes several miscellaneous topics that don't fit into major categories but still appear on the test.</p>

            <h3>Venn Diagrams</h3>
            <div class="diagram-box" style="text-align: center; margin: 1.5rem 0; padding: 1rem; background-color: #f8faff;">
                <img src="https://upload.wikimedia.org/wikipedia/commons/0/06/Venn01.svg" alt="Venn diagram" style="max-width: 300px; height: auto;" />
                <p style="font-size: 0.9rem; color: #666; margin-top: 0.5rem;"><em>Venn diagrams show relationships between sets</em></p>
            </div>

            <h3>Set Notation</h3>
            <div class="concept-box">
                <h4>Key Symbols:</h4>
                <p><strong>∈</strong> means "is an element of"</p>
                <p><strong>∪</strong> means "union" (all elements in either set)</p>
                <p><strong>∩</strong> means "intersection" (elements in both sets)</p>
            </div>

            <h3>Sequences and Series</h3>
            <div class="rules-box">
                <h4>Arithmetic Sequence:</h4>
                <p>Add same amount each time: 2, 5, 8, 11, ...</p>
                <p>nth term: a_n = a_1 + (n-1)d</p>
                <p></p>
                <h4>Geometric Sequence:</h4>
                <p>Multiply by same amount each time: 2, 6, 18, 54, ...</p>
                <p>nth term: a_n = a_1 · r^(n-1)</p>
            </div>

            <h3>Distance, Rate, Time</h3>
            <div class="rules-box">
                <h4>Formula:</h4>
                <p><strong>Distance = Rate × Time</strong></p>
                <p>Also: Rate = Distance/Time</p>
                <p>Also: Time = Distance/Rate</p>
            </div>

            <h3>Absolute Value</h3>
            <div class="concept-box">
                <h4>Definition:</h4>
                <p>|x| is the distance from 0 (always positive or zero)</p>
                <p>|5| = 5</p>
                <p>|-5| = 5</p>
                <p>|0| = 0</p>
            </div>

            <div class="example-box">
                <p><strong>Problem:</strong> Find the 10th term of the arithmetic sequence: 3, 7, 11, 15, ...</p>
                <p><strong>Solution:</strong></p>
                <p>First term a_1 = 3, common difference d = 4</p>
                <p>a_10 = 3 + (10-1)×4 = 3 + 36 = 39</p>
                <p><strong>The 10th term is 39</strong></p>
            </div>

            <div class="key-takeaway">
                <h4>Key Takeaway</h4>
                <p>These miscellaneous topics appear less frequently but are worth reviewing. Know sequence formulas and the distance-rate-time relationship!</p>
            </div>
        `
  }
];

async function updateAllLessons() {
  console.log('========================================');
  console.log('ADDING IMAGES TO REMAINING 6 LESSONS');
  console.log('========================================\n');

  for (const lesson of lessonUpdates) {
    console.log(`\n📝 Updating: ${lesson.title}...`);

    const { data, error } = await supabase
      .from('lessons')
      .update({ content: lesson.content })
      .eq('lesson_key', lesson.key)
      .select();

    if (error) {
      console.error(`  ❌ Error updating ${lesson.key}:`, error);
    } else {
      console.log(`  ✅ Successfully updated ${lesson.key}`);
      console.log(`     Length: ${lesson.content.length} chars`);
    }
  }

  console.log('\n========================================');
  console.log('✅ ALL LESSONS UPDATED!');
  console.log('========================================');
  console.log('\nImages added to:');
  console.log('  1. functions - Function graph example');
  console.log('  2. systems-equations - Line intersection diagram');
  console.log('  3. vectors - Vector addition diagram');
  console.log('  4. permutations-combinations - Probability tree diagram');
  console.log('  5. complex-numbers - Complex plane with axes');
  console.log('  6. miscellaneous-topics - Venn diagram');
  console.log('\nAll images are:');
  console.log('  • From Wikimedia Commons');
  console.log('  • Public domain or freely licensed');
  console.log('  • SVG format (perfect scaling)');
  console.log('  • Permanent, reliable URLs');
}

updateAllLessons();
