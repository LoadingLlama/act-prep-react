// Enhanced Math Lessons - Sample (Chapters 1-3)
// These lessons include better structure, clearer examples, and interactive quizzes

const enhancedMathLessons = {
    'backsolving': {
        title: 'Chapter 1: Backsolving',
        content: `
            <div class="lesson-intro">
                <h2>Chapter 1: Backsolving</h2>
                <p><strong>Backsolving</strong> is one of the most powerful test-taking strategies on the ACT Math section. Instead of solving a problem algebraically, you work backwards from the answer choices to find the correct answer.</p>
                <p><strong>Why it works:</strong> The ACT gives you 5 answer choices, and one of them MUST be correct. Sometimes it's faster to test the answers than to solve algebraically!</p>
            </div>

            <div class="concept-box">
                <h3>🎯 When to Use Backsolving</h3>
                <p>Backsolving works best when:</p>
                <ul>
                    <li>✓ The question asks "what is the value of x?" or similar</li>
                    <li>✓ The answer choices are specific numbers (not variables or expressions)</li>
                    <li>✓ Setting up an algebraic equation seems complicated or time-consuming</li>
                    <li>✓ You're running short on time and need a quick solution</li>
                    <li>✓ The problem involves word problems with multiple steps</li>
                </ul>
            </div>

            <div class="rules-box">
                <h3>📋 The Backsolving Process</h3>
                <h4>Step-by-Step:</h4>
                <ol>
                    <li><strong>Start with answer choice C</strong> (the middle value) - this is smart because answers are usually in order</li>
                    <li><strong>Substitute this value</strong> back into the original problem</li>
                    <li><strong>Check if it satisfies the condition</strong> - does it make the equation true?</li>
                    <li><strong>If C doesn't work:</strong>
                        <ul>
                            <li>If your result is too small, try D or E</li>
                            <li>If your result is too large, try A or B</li>
                        </ul>
                    </li>
                    <li><strong>Repeat until you find the answer that works</strong></li>
                </ol>
            </div>

            <div class="example-box">
                <h3>📝 Example 1: Simple Equation</h3>
                <p><strong>Problem:</strong> If 3x + 7 = 22, what is the value of x?</p>
                <p style="padding-left: 20px;">
                    A. 3<br>
                    B. 4<br>
                    C. 5<br>
                    D. 6<br>
                    E. 7
                </p>

                <p><strong>Solution using Backsolving:</strong></p>
                <p>Start with <strong>C (x = 5)</strong>:</p>
                <p style="padding-left: 20px;">
                    3(5) + 7 = 15 + 7 = 22 ✓
                </p>
                <p><strong>Answer: C</strong></p>
                <p class="tip-box">💡 This worked on the first try! You saved time by not having to solve algebraically.</p>
            </div>

            <div class="example-box">
                <h3>📝 Example 2: Square Roots (Harder)</h3>
                <p><strong>Problem:</strong> If √(x + 10) - 2√(x - 2) = 0, what is the value of x?</p>
                <p style="padding-left: 20px;">
                    A. 2<br>
                    B. 6<br>
                    C. 14<br>
                    D. 18<br>
                    E. 22
                </p>

                <p><strong>Solution using Backsolving:</strong></p>
                <p>Start with <strong>C (x = 14)</strong>:</p>
                <p style="padding-left: 20px;">
                    √(14 + 10) - 2√(14 - 2) = √24 - 2√12 = 4.90 - 6.93 ≠ 0 ✗
                </p>

                <p>Try <strong>B (x = 6)</strong>:</p>
                <p style="padding-left: 20px;">
                    √(6 + 10) - 2√(6 - 2) = √16 - 2√4 = 4 - 2(2) = 4 - 4 = 0 ✓
                </p>
                <p><strong>Answer: B</strong></p>
                <p class="tip-box">💡 Solving this algebraically would take much longer and be error-prone!</p>
            </div>

            <div class="example-box">
                <h3>📝 Example 3: Polynomial</h3>
                <p><strong>Problem:</strong> Which of the following is a solution to the equation x³ + 5x² + 6x = 0?</p>
                <p style="padding-left: 20px;">
                    A. -3<br>
                    B. -1<br>
                    C. 0<br>
                    D. 1<br>
                    E. 2
                </p>

                <p><strong>Solution using Backsolving:</strong></p>
                <p>Start with <strong>C (x = 0)</strong>:</p>
                <p style="padding-left: 20px;">
                    (0)³ + 5(0)² + 6(0) = 0 + 0 + 0 = 0 ✓
                </p>
                <p><strong>Answer: C</strong></p>
                <p class="tip-box">💡 Always check x = 0 first when it's an option - it's the fastest to test!</p>
            </div>

            <div class="example-box">
                <h3>📝 Example 4: Word Problem</h3>
                <p><strong>Problem:</strong> Sarah has some money. If she spends $15, then doubles what she has left, she'll have $50. How much money did Sarah start with?</p>
                <p style="padding-left: 20px;">
                    F. $20<br>
                    G. $25<br>
                    H. $32.50<br>
                    J. $40<br>
                    K. $55
                </p>

                <p><strong>Solution using Backsolving:</strong></p>
                <p>Start with <strong>H ($32.50)</strong>:</p>
                <p style="padding-left: 20px;">
                    Start with $32.50<br>
                    Spend $15: $32.50 - $15 = $17.50<br>
                    Double it: $17.50 × 2 = $35 ✗ (We need $50)
                </p>

                <p>Too small! Try <strong>J ($40)</strong>:</p>
                <p style="padding-left: 20px;">
                    Start with $40<br>
                    Spend $15: $40 - $15 = $25<br>
                    Double it: $25 × 2 = $50 ✓
                </p>
                <p><strong>Answer: J</strong></p>
            </div>

            <!-- INTERACTIVE_PRACTICE_0 -->

            <div class="tip-box">
                <h3>⚡ Pro Tips for Backsolving</h3>
                <ul>
                    <li><strong>Always start with C</strong> - it helps you know which direction to go</li>
                    <li><strong>Use your calculator efficiently</strong> - store values to avoid retyping</li>
                    <li><strong>Look for shortcuts</strong> - if x = 0 or x = 1 is an option, test it first</li>
                    <li><strong>Watch for negative answers</strong> - they can catch you off guard</li>
                    <li><strong>Don't backsolve everything</strong> - simple algebra is still faster sometimes</li>
                </ul>
            </div>

            <div class="warning-box">
                <h3>⚠️ When NOT to Backsolve</h3>
                <ul>
                    <li>Answer choices contain variables (like "2x + 3")</li>
                    <li>The question asks "which is NOT true" - you'd have to test all 5 answers</li>
                    <li>Simple one-step algebra would be faster</li>
                    <li>The problem requires finding multiple values</li>
                </ul>
            </div>

            <div class="key-takeaway">
                <h3>🎯 Key Takeaways</h3>
                <ul>
                    <li>Backsolving turns hard algebra into simple arithmetic</li>
                    <li>Start with answer choice C and adjust based on your result</li>
                    <li>This strategy is especially powerful for word problems and complex equations</li>
                    <li>Practice identifying when to backsolve vs. when to solve algebraically</li>
                </ul>
            </div>
        `
    },

    'substitution': {
        title: 'Chapter 2: Substitution (Plugging In)',
        content: `
            <div class="lesson-intro">
                <h2>Chapter 2: Substitution Strategy</h2>
                <p><strong>Substitution</strong> (also called "Plugging In") is a powerful test-taking strategy where you replace abstract variables with specific numbers to make problems easier to solve.</p>
                <p><strong>The key insight:</strong> When both the question AND answer choices have variables, you can make up your own numbers!</p>
            </div>

            <div class="concept-box">
                <h3>🎯 When to Use Substitution</h3>
                <p>Use substitution when you see:</p>
                <ul>
                    <li>✓ Variables in both the question AND the answer choices</li>
                    <li>✓ Abstract algebraic expressions that seem complicated</li>
                    <li>✓ Percent problems with unknown values</li>
                    <li>✓ Word problems where relationships are unclear</li>
                    <li>✓ "In terms of" questions (like "express y in terms of x")</li>
                </ul>
                <p class="tip-box">💡 <strong>Key Rule:</strong> If you see variables in the answers, PLUG IN!</p>
            </div>

            <div class="rules-box">
                <h3>📋 The Substitution Process</h3>
                <h4>Step-by-Step:</h4>
                <ol>
                    <li><strong>Pick simple, convenient numbers</strong> for the variables
                        <ul>
                            <li>Avoid: 0, 1, and numbers that appear in the problem</li>
                            <li>Good choices: 2, 3, 4, 5, 10, 100</li>
                            <li>For percents: Use 100 (makes calculations easy!)</li>
                        </ul>
                    </li>
                    <li><strong>Substitute your numbers</strong> into the problem</li>
                    <li><strong>Solve the problem</strong> with your specific numbers to get a target answer</li>
                    <li><strong>Test each answer choice</strong> with the same numbers you picked</li>
                    <li><strong>The choice that matches your target is correct!</strong></li>
                </ol>
            </div>

            <div class="example-box">
                <h3>📝 Example 1: Percent Problem</h3>
                <p><strong>Problem:</strong> If x is 20% of y, then y is what percent of x?</p>
                <p style="padding-left: 20px;">
                    F. 20%<br>
                    G. 80%<br>
                    H. 120%<br>
                    J. 500%<br>
                    K. 2000%
                </p>

                <p><strong>Solution using Substitution:</strong></p>
                <p><strong>Step 1:</strong> Pick numbers - Let's say x = 20 and y = 100</p>
                <p style="padding-left: 20px;">
                    (We chose these because 20 is 20% of 100 - this satisfies the given condition!)
                </p>

                <p><strong>Step 2:</strong> Now answer the question with our numbers:</p>
                <p style="padding-left: 20px;">
                    "y is what percent of x?" becomes "100 is what percent of 20?"<br>
                    100 ÷ 20 = 5 = 500%
                </p>

                <p><strong>Step 3:</strong> Find 500% in the answer choices</p>
                <p><strong>Answer: J (500%)</strong></p>
            </div>

            <div class="example-box">
                <h3>📝 Example 2: Algebraic Expression</h3>
                <p><strong>Problem:</strong> If a = 2b + 3, what is b in terms of a?</p>
                <p style="padding-left: 20px;">
                    A. (a - 3)/2<br>
                    B. (a + 3)/2<br>
                    C. 2a - 3<br>
                    D. 2(a - 3)<br>
                    E. a/2 - 3
                </p>

                <p><strong>Solution using Substitution:</strong></p>
                <p><strong>Step 1:</strong> Pick a simple number for b - Let's use b = 5</p>

                <p><strong>Step 2:</strong> Find a using our value of b:</p>
                <p style="padding-left: 20px;">
                    a = 2(5) + 3 = 10 + 3 = 13
                </p>

                <p><strong>Step 3:</strong> Now we know: when b = 5, a must equal 13</p>

                <p><strong>Step 4:</strong> Test each answer choice with a = 13 to see which gives us b = 5:</p>
                <p style="padding-left: 20px;">
                    A. (13 - 3)/2 = 10/2 = 5 ✓<br>
                    B. (13 + 3)/2 = 16/2 = 8 ✗<br>
                    C. 2(13) - 3 = 23 ✗
                </p>

                <p><strong>Answer: A</strong></p>
                <p class="tip-box">💡 We only needed to check A and B - once A worked, we're done!</p>
            </div>

            <div class="example-box">
                <h3>📝 Example 3: Word Problem</h3>
                <p><strong>Problem:</strong> A store marks up the wholesale price of an item by p percent. During a sale, the item is discounted by p percent. If the wholesale price is w dollars, what is the sale price in terms of w and p?</p>
                <p style="padding-left: 20px;">
                    F. w<br>
                    G. w(1 - p²/10000)<br>
                    H. w(1 + p/100)(1 - p/100)<br>
                    J. w(100 + p)(100 - p)/100<br>
                    K. wp/100
                </p>

                <p><strong>Solution using Substitution:</strong></p>
                <p><strong>Step 1:</strong> Pick simple numbers - Let w = 100 and p = 20</p>

                <p><strong>Step 2:</strong> Calculate the sale price with these numbers:</p>
                <p style="padding-left: 20px;">
                    Wholesale price: $100<br>
                    Mark up by 20%: $100 + $20 = $120<br>
                    Discount by 20% of $120: $120 - $24 = $96
                </p>

                <p><strong>Step 3:</strong> Our target answer is $96</p>

                <p><strong>Step 4:</strong> Test H with w = 100, p = 20:</p>
                <p style="padding-left: 20px;">
                    100(1 + 20/100)(1 - 20/100)<br>
                    = 100(1.20)(0.80)<br>
                    = 100(0.96)<br>
                    = 96 ✓
                </p>

                <p><strong>Answer: H</strong></p>
            </div>

            <!-- INTERACTIVE_PRACTICE_1 -->

            <div class="tip-box">
                <h3>⚡ Pro Tips for Substitution</h3>
                <ul>
                    <li><strong>Pick "smart" numbers:</strong>
                        <ul>
                            <li>For fractions: Use common denominators or multiples</li>
                            <li>For percents: Use 100 (easiest to calculate)</li>
                            <li>For even/odd: Pick appropriate parity</li>
                        </ul>
                    </li>
                    <li><strong>Avoid problem numbers:</strong> Don't use 0, 1, or numbers already in the problem</li>
                    <li><strong>Write down your numbers:</strong> You'll need them to test answer choices</li>
                    <li><strong>Test F or A first:</strong> Sometimes all answers are close, start from the top</li>
                </ul>
            </div>

            <div class="warning-box">
                <h3>⚠️ Common Mistakes</h3>
                <ul>
                    <li><strong>Using 0 or 1:</strong> These can make multiple answer choices work</li>
                    <li><strong>Forgetting to test all answers:</strong> Sometimes two answers are close</li>
                    <li><strong>Picking numbers that don't satisfy conditions:</strong> Make sure your numbers work with what's given!</li>
                    <li><strong>Making arithmetic errors:</strong> Double-check your calculations</li>
                </ul>
            </div>

            <div class="key-takeaway">
                <h3>🎯 Key Takeaways</h3>
                <ul>
                    <li>Substitution turns abstract algebra into concrete arithmetic</li>
                    <li>If there are variables in the answer choices, PLUG IN numbers</li>
                    <li>Pick simple numbers that satisfy the given conditions</li>
                    <li>Calculate your target answer, then test each choice</li>
                    <li>This strategy makes hard problems easy!</li>
                </ul>
            </div>
        `
    },

    'geometry-angles': {
        title: 'Chapter 3: Angles and Lines',
        content: `
            <div class="lesson-intro">
                <h2>Chapter 3: Angles and Lines</h2>
                <p>Understanding <strong>angle relationships</strong> is fundamental to ACT geometry success. These concepts appear on nearly every ACT Math test and form the foundation for more complex geometry problems.</p>
                <p><strong>Master these rules and you'll solve angle problems in seconds!</strong></p>
            </div>

            <div class="concept-box">
                <h3>📐 Fundamental Angle Rules</h3>
                <h4>Basic Facts:</h4>
                <ul>
                    <li><strong>Straight line = 180°</strong> (supplementary angles)</li>
                    <li><strong>Full circle = 360°</strong></li>
                    <li><strong>Right angle = 90°</strong></li>
                    <li><strong>Acute angle:</strong> Less than 90°</li>
                    <li><strong>Obtuse angle:</strong> Between 90° and 180°</li>
                </ul>
            </div>

            <div class="rules-box">
                <h3>🔄 Intersecting Lines</h3>
                <p>When two lines intersect, they create 4 angles:</p>

                <h4>Rule 1: Vertical Angles are Equal</h4>
                <p>Angles across from each other are called <strong>vertical angles</strong> and they're always equal.</p>
                <div style="padding-left: 20px;">
                    <p>If two lines intersect and one angle is 50°, the angle across from it is also 50°.</p>
                </div>

                <h4>Rule 2: Adjacent Angles are Supplementary</h4>
                <p>Angles next to each other on a line add up to <strong>180°</strong>.</p>
                <div style="padding-left: 20px;">
                    <p>If one angle is 50°, the angle next to it is 180° - 50° = 130°.</p>
                </div>
            </div>

            <div class="example-box">
                <h3>📝 Example 1: Intersecting Lines</h3>
                <p><strong>Problem:</strong> Two lines intersect. If one angle measures 35°, what are the measures of the other three angles?</p>

                <p><strong>Solution:</strong></p>
                <p style="padding-left: 20px;">
                    <strong>Vertical angle:</strong> 35° (across from the given angle)<br>
                    <strong>Adjacent angles:</strong> 180° - 35° = 145° (both of them)
                </p>

                <p><strong>Answer:</strong> The four angles are 35°, 145°, 35°, 145°</p>
                <p class="tip-box">💡 Notice: Vertical angles are equal, and adjacent angles sum to 180°!</p>
            </div>

            <div class="rules-box">
                <h3>📏 Parallel Lines Cut by a Transversal</h3>
                <p>When a line crosses two parallel lines, it creates <strong>8 angles</strong> with special relationships:</p>

                <h4>Equal Angle Pairs:</h4>
                <ul>
                    <li><strong>Corresponding angles</strong> (same position, different lines) are equal</li>
                    <li><strong>Alternate interior angles</strong> (inside, opposite sides) are equal</li>
                    <li><strong>Alternate exterior angles</strong> (outside, opposite sides) are equal</li>
                </ul>

                <h4>Supplementary Angle Pairs:</h4>
                <ul>
                    <li><strong>Co-interior angles</strong> (same side interior) add to 180°</li>
                </ul>

                <p class="tip-box">💡 <strong>Quick Trick:</strong> With parallel lines, there are really only TWO different angle measures - all acute angles are equal, and all obtuse angles are equal!</p>
            </div>

            <div class="example-box">
                <h3>📝 Example 2: Parallel Lines</h3>
                <p><strong>Problem:</strong> Lines l and m are parallel. A transversal crosses them creating an angle of 65° with line l. What is the measure of the corresponding angle at line m?</p>

                <p><strong>Solution:</strong></p>
                <p style="padding-left: 20px;">
                    Corresponding angles are equal when lines are parallel.<br>
                    <strong>Answer: 65°</strong>
                </p>
            </div>

            <div class="example-box">
                <h3>📝 Example 3: Mixed Angles</h3>
                <p><strong>Problem:</strong> Lines j and k are parallel. A transversal creates an angle of 110° on the top-left of line j. What is the co-interior angle at line k?</p>

                <p><strong>Solution:</strong></p>
                <p style="padding-left: 20px;">
                    Co-interior angles are supplementary (add to 180°)<br>
                    180° - 110° = 70°<br>
                    <strong>Answer: 70°</strong>
                </p>
            </div>

            <div class="rules-box">
                <h3>🔺 Triangle Angles</h3>
                <h4>The Golden Rule of Triangles:</h4>
                <p><strong>Interior angles of ANY triangle sum to 180°</strong></p>
                <p style="padding-left: 20px;">a + b + c = 180°</p>

                <h4>Special Triangles:</h4>
                <ul>
                    <li><strong>Equilateral triangle:</strong> All angles = 60°</li>
                    <li><strong>Isosceles triangle:</strong> Two equal angles (base angles)</li>
                    <li><strong>Right triangle:</strong> One 90° angle, other two sum to 90°</li>
                </ul>
            </div>

            <div class="rules-box">
                <h3>🔷 Polygon Interior Angles</h3>
                <h4>Formula for Sum of Interior Angles:</h4>
                <p><strong>Sum = 180(n - 2)°</strong></p>
                <p style="padding-left: 20px;">where n = number of sides</p>

                <table style="margin: 15px 20px; border-collapse: collapse;">
                    <tr style="border-bottom: 2px solid #333;">
                        <th style="padding: 8px; text-align: left;">Shape</th>
                        <th style="padding: 8px; text-align: left;">Sides (n)</th>
                        <th style="padding: 8px; text-align: left;">Sum of Angles</th>
                    </tr>
                    <tr>
                        <td style="padding: 8px;">Triangle</td>
                        <td style="padding: 8px;">3</td>
                        <td style="padding: 8px;">180(3-2) = 180°</td>
                    </tr>
                    <tr>
                        <td style="padding: 8px;">Quadrilateral</td>
                        <td style="padding: 8px;">4</td>
                        <td style="padding: 8px;">180(4-2) = 360°</td>
                    </tr>
                    <tr>
                        <td style="padding: 8px;">Pentagon</td>
                        <td style="padding: 8px;">5</td>
                        <td style="padding: 8px;">180(5-2) = 540°</td>
                    </tr>
                    <tr>
                        <td style="padding: 8px;">Hexagon</td>
                        <td style="padding: 8px;">6</td>
                        <td style="padding: 8px;">180(6-2) = 720°</td>
                    </tr>
                </table>

                <p class="tip-box">💡 <strong>Memorize:</strong> Triangle = 180°, Quadrilateral = 360°. For others, use the formula!</p>
            </div>

            <div class="example-box">
                <h3>📝 Example 4: Pentagon Angles</h3>
                <p><strong>Problem:</strong> A regular pentagon has how many degrees in each interior angle?</p>

                <p><strong>Solution:</strong></p>
                <p style="padding-left: 20px;">
                    <strong>Step 1:</strong> Find total degrees: 180(5 - 2) = 540°<br>
                    <strong>Step 2:</strong> Divide by number of angles: 540° ÷ 5 = 108°<br>
                    <strong>Answer: 108°</strong>
                </p>
            </div>

            <!-- INTERACTIVE_PRACTICE_2 -->

            <div class="rules-box">
                <h3>🎨 Exterior Angles</h3>
                <h4>Polygon Exterior Angles:</h4>
                <p><strong>The exterior angles of ANY polygon always sum to 360°!</strong></p>
                <p>For a regular polygon:</p>
                <p style="padding-left: 20px;">Each exterior angle = 360° ÷ n (where n = number of sides)</p>

                <h4>Triangle Exterior Angle Theorem:</h4>
                <p>An exterior angle of a triangle equals the sum of the two non-adjacent interior angles.</p>
            </div>

            <div class="tip-box">
                <h3>⚡ ACT Test-Taking Tips</h3>
                <ul>
                    <li><strong>Figures drawn to scale:</strong> If the problem doesn't say "not drawn to scale," you can estimate angles!</li>
                    <li><strong>Mark up your diagram:</strong> Write angle measures as you find them</li>
                    <li><strong>Look for parallel lines:</strong> They create equal angles everywhere</li>
                    <li><strong>Remember vertical angles:</strong> Free equal angles!</li>
                    <li><strong>Use 180° trick:</strong> Angles on a line always sum to 180°</li>
                </ul>
            </div>

            <div class="warning-box">
                <h3>⚠️ Common Mistakes</h3>
                <ul>
                    <li><strong>Confusing angle types:</strong> Corresponding vs. alternate interior - practice these!</li>
                    <li><strong>Forgetting parallel line requirement:</strong> Special angles only work when lines are parallel!</li>
                    <li><strong>Using wrong formula:</strong> Interior angles: 180(n-2), Exterior angles: always 360°</li>
                    <li><strong>Not checking the diagram scale:</strong> Read carefully - can you estimate or must you calculate?</li>
                </ul>
            </div>

            <div class="key-takeaway">
                <h3>🎯 Key Formulas to Memorize</h3>
                <ul>
                    <li><strong>Straight line:</strong> 180°</li>
                    <li><strong>Vertical angles:</strong> Equal</li>
                    <li><strong>Triangle interior angles:</strong> Sum to 180°</li>
                    <li><strong>Polygon interior angles:</strong> 180(n - 2)</li>
                    <li><strong>Any polygon exterior angles:</strong> Sum to 360°</li>
                    <li><strong>Parallel lines + transversal:</strong> Creates equal corresponding and alternate interior angles</li>
                </ul>
            </div>
        `
    }
};

module.exports = enhancedMathLessons;
