window.mathLessons = {
    'backsolving': {
        title: 'Chapter 1: Backsolving',
        content: `
            <p class="lesson-intro">Backsolving is one of the most powerful test-taking strategies on the ACT Math section. Instead of solving a problem algebraically, you work backwards from the answer choices to find the correct answer.</p>
            
            <h3>When to Use Backsolving</h3>
            <p>Backsolving works best when:</p>
            <ul>
                <li>The question asks "what is the value of x?" or similar</li>
                <li>The answer choices are numbers (not expressions)</li>
                <li>Setting up an algebraic equation seems complicated</li>
                <li>You're running short on time</li>
            </ul>
            
            <h3>How Backsolving Works</h3>
            <div class="rules-box">
                <h4>Step-by-Step Process:</h4>
                <ol>
                    <li><strong>Start with answer choice C</strong> (the middle value)</li>
                    <li><strong>Substitute this value</strong> back into the original problem</li>
                    <li><strong>Check if it works</strong></li>
                    <li><strong>Repeat until you find the correct answer</strong></li>
                </ol>
            </div>
            
            <div class="example-box">
                <p><strong>Problem:</strong> If 3x + 7 = 22, what is the value of x?</p>
                <p>A. 3 &nbsp;&nbsp; B. 4 &nbsp;&nbsp; C. 5 &nbsp;&nbsp; D. 6 &nbsp;&nbsp; E. 7</p>
                <p><strong>Solution:</strong> Start with C. If x = 5: 3(5) + 7 = 22 ✓</p>
            </div>
            
            <div class="key-takeaway">
                <h4>Key Takeaway</h4>
                <p>Backsolving can save time and help you solve complex problems by working backwards from answer choices. Start with the middle choice and work systematically!</p>
            </div>
        `
    },
    'substitution': {
        title: 'Chapter 2: Substitution',
        content: `
            <p class="lesson-intro">Substitution is another powerful test-taking strategy where you replace variables with specific numbers to make problems easier to solve. This technique is especially useful for abstract problems with variables.</p>
            
            <h3>When to Use Substitution</h3>
            <ul>
                <li>Problems with variables in both the question and answer choices</li>
                <li>Abstract algebraic expressions that seem complicated</li>
                <li>Percent problems with unknown values</li>
                <li>Word problems where relationships are unclear</li>
            </ul>
            
            <h3>How Substitution Works</h3>
            <div class="rules-box">
                <h4>Step-by-Step Process:</h4>
                <ol>
                    <li><strong>Pick simple numbers</strong> for the variables (avoid 0, 1, and negatives initially)</li>
                    <li><strong>Substitute these numbers</strong> into the problem</li>
                    <li><strong>Solve the problem</strong> using your chosen numbers</li>
                    <li><strong>Test each answer choice</strong> with the same numbers</li>
                    <li><strong>The choice that gives the same result is correct</strong></li>
                </ol>
            </div>
            
            <div class="example-box">
                <p><strong>Problem:</strong> If x is 20% of y, then y is what percent of x?</p>
                <p>F. 20% &nbsp;&nbsp; G. 80% &nbsp;&nbsp; H. 120% &nbsp;&nbsp; J. 500% &nbsp;&nbsp; K. 2000%</p>
                <p><strong>Solution:</strong> Let x = 20 and y = 100 (since 20 is 20% of 100)</p>
                <p>Question becomes: 100 is what percent of 20? Answer: 500%</p>
            </div>
            
            <div class="key-takeaway">
                <h4>Key Takeaway</h4>
                <p>Substitution turns abstract problems into concrete calculations. Choose simple, convenient numbers and test systematically!</p>
            </div>
        `
    },
    'geometry-angles': {
        title: 'Chapter 3: Geometry Part 1 - Angles',
        content: `
            <p class="lesson-intro">Angle relationships are fundamental to ACT geometry. Understanding how angles work with intersecting lines, parallel lines, and polygons will help you solve many geometry problems quickly.</p>
            
            <h3>Intersecting Lines</h3>
            <div class="rules-box">
                <h4>Key Rules:</h4>
                <ul>
                    <li><strong>Vertical angles are equal</strong></li>
                    <li><strong>Adjacent angles are supplementary</strong> (add to 180°)</li>
                </ul>
            </div>
            
            <h3>Parallel Lines</h3>
            <div class="rules-box">
                <h4>When parallel lines are cut by a transversal:</h4>
                <ul>
                    <li><strong>Corresponding angles are equal</strong></li>
                    <li><strong>Alternate interior angles are equal</strong></li>
                    <li><strong>Alternate exterior angles are equal</strong></li>
                    <li><strong>Co-interior angles are supplementary</strong></li>
                </ul>
            </div>
            
            <h3>Interior Angles in Polygons</h3>
            <div class="rules-box">
                <h4>Sum of Interior Angles:</h4>
                <p><strong>Sum = 180°(n - 2)</strong> where n is the number of sides</p>
                <ul>
                    <li>Triangle: 180°</li>
                    <li>Quadrilateral: 360°</li>
                    <li>Pentagon: 540°</li>
                    <li>Hexagon: 720°</li>
                </ul>
            </div>
            
            <div class="tip-box">
                <h4>Figures Drawn to Scale Trick</h4>
                <p>If a problem says figures are NOT drawn to scale, you usually need to calculate. If it doesn't mention scale, you can often estimate by measuring the diagram!</p>
            </div>
            
            <div class="key-takeaway">
                <h4>Key Takeaway</h4>
                <p>Master the basic angle relationships and the polygon angle formula. These concepts appear on almost every ACT Math test!</p>
            </div>
        `
    },
    'geometry-shapes': {
        title: 'Chapter 4: Geometry Part 2 - Shapes',
        content: `
            <p class="lesson-intro">Area, volume, and triangle relationships are heavily tested on the ACT. Memorizing the key formulas and understanding special triangles will help you solve these problems quickly.</p>
            
            <h3>Essential Area and Volume Formulas</h3>
            <div class="rules-box">
                <h4>Areas:</h4>
                <ul>
                    <li><strong>Rectangle:</strong> A = lw</li>
                    <li><strong>Triangle:</strong> A = ½bh</li>
                    <li><strong>Circle:</strong> A = πr²</li>
                    <li><strong>Trapezoid:</strong> A = ½(b₁ + b₂)h</li>
                </ul>
                
                <h4>Volumes:</h4>
                <ul>
                    <li><strong>Rectangular prism:</strong> V = lwh</li>
                    <li><strong>Cylinder:</strong> V = πr²h</li>
                    <li><strong>Cube:</strong> V = s³</li>
                </ul>
            </div>
            
            <h3>Right Triangles</h3>
            <div class="rules-box">
                <h4>Pythagorean Theorem:</h4>
                <p><strong>a² + b² = c²</strong></p>
                <p>Common Pythagorean triples: 3-4-5, 5-12-13, 8-15-17</p>
            </div>
            
            <h3>Special Right Triangles</h3>
            <div class="concept-box">
                <h4>45-45-90 Triangle:</h4>
                <p>Sides in ratio <strong>1 : 1 : √2</strong></p>
                
                <h4>30-60-90 Triangle:</h4>
                <p>Sides in ratio <strong>1 : √3 : 2</strong></p>
            </div>
            
            <h3>Similar Triangles</h3>
            <div class="rules-box">
                <h4>Key Rules:</h4>
                <ul>
                    <li><strong>Corresponding sides are proportional</strong></li>
                    <li><strong>Corresponding angles are equal</strong></li>
                    <li><strong>Areas are proportional to the square of the scale factor</strong></li>
                </ul>
            </div>
            
            <div class="example-box">
                <p><strong>Problem:</strong> A rectangle has length 8 and width 6. What is its area?</p>
                <p><strong>Solution:</strong> A = lw = 8 × 6 = 48</p>
            </div>
            
            <div class="key-takeaway">
                <h4>Key Takeaway</h4>
                <p>Memorize the basic area and volume formulas, Pythagorean theorem, and special right triangle ratios. These appear on every ACT Math test!</p>
            </div>
        `
    },
    'lines': {
        title: 'Chapter 5: Lines',
        content: `
            <p class="lesson-intro">Linear equations and coordinate geometry are fundamental ACT topics. Understanding slope, different forms of linear equations, and distance/midpoint formulas will help you solve many coordinate plane problems.</p>
            
            <h3>Slope</h3>
            <div class="rules-box">
                <h4>Slope Formula:</h4>
                <p><strong>m = (y₂ - y₁)/(x₂ - x₁)</strong></p>
                <ul>
                    <li><strong>Positive slope:</strong> line goes up from left to right</li>
                    <li><strong>Negative slope:</strong> line goes down from left to right</li>
                    <li><strong>Zero slope:</strong> horizontal line</li>
                    <li><strong>Undefined slope:</strong> vertical line</li>
                </ul>
            </div>
            
            <h3>Parallel and Perpendicular Lines</h3>
            <div class="rules-box">
                <h4>Key Rules:</h4>
                <ul>
                    <li><strong>Parallel lines:</strong> same slope</li>
                    <li><strong>Perpendicular lines:</strong> slopes are negative reciprocals (m₁ × m₂ = -1)</li>
                </ul>
            </div>
            
            <h3>Forms of Linear Equations</h3>
            <div class="concept-box">
                <h4>Slope-Intercept Form:</h4>
                <p><strong>y = mx + b</strong> (m = slope, b = y-intercept)</p>
                
                <h4>Point-Slope Form:</h4>
                <p><strong>y - y₁ = m(x - x₁)</strong></p>
                
                <h4>Standard Form:</h4>
                <p><strong>Ax + By = C</strong></p>
            </div>
            
            <h3>Distance and Midpoint</h3>
            <div class="rules-box">
                <h4>Formulas:</h4>
                <p><strong>Distance:</strong> d = √[(x₂-x₁)² + (y₂-y₁)²]</p>
                <p><strong>Midpoint:</strong> ((x₁+x₂)/2, (y₁+y₂)/2)</p>
            </div>
            
            <div class="example-box">
                <p><strong>Problem:</strong> What is the slope of the line passing through (2, 3) and (6, 11)?</p>
                <p><strong>Solution:</strong> m = (11-3)/(6-2) = 8/4 = 2</p>
            </div>
            
            <div class="key-takeaway">
                <h4>Key Takeaway</h4>
                <p>Master slope calculations and the three forms of linear equations. The distance and midpoint formulas are also frequently tested!</p>
            </div>
        `
    },
    'fractions': {
        title: 'Chapter 6: Fractions',
        content: `
            <p class="lesson-intro">Fraction operations appear frequently on the ACT, both in pure fraction problems and mixed with other topics. Understanding how to add, subtract, multiply, and divide fractions efficiently is essential.</p>
            
            <h3>Adding and Subtracting Fractions</h3>
            <div class="rules-box">
                <h4>With Same Denominators:</h4>
                <p><strong>a/c + b/c = (a+b)/c</strong></p>
                
                <h4>With Different Denominators:</h4>
                <p><strong>Find common denominator first</strong></p>
                <p>a/b + c/d = (ad + bc)/(bd)</p>
            </div>
            
            <h3>Multiplying and Dividing Fractions</h3>
            <div class="rules-box">
                <h4>Multiplication:</h4>
                <p><strong>a/b × c/d = (ac)/(bd)</strong></p>
                
                <h4>Division:</h4>
                <p><strong>a/b ÷ c/d = a/b × d/c</strong> (flip and multiply)</p>
            </div>
            
            <h3>Simplifying Fractions</h3>
            <div class="concept-box">
                <h4>Steps:</h4>
                <ol>
                    <li>Find the greatest common factor (GCD) of numerator and denominator</li>
                    <li>Divide both by the GCD</li>
                </ol>
            </div>
            
            <h3>Calculator Tips for Fractions</h3>
            <div class="tip-box">
                <h4>Useful Techniques:</h4>
                <ul>
                    <li><strong>Convert to decimals</strong> for easier calculations</li>
                    <li><strong>Use parentheses</strong> when entering complex fractions</li>
                    <li><strong>Check if your calculator has a fraction mode</strong></li>
                </ul>
            </div>
            
            <div class="example-box">
                <p><strong>Problem:</strong> What is 2/3 + 1/4?</p>
                <p><strong>Solution:</strong> 2/3 + 1/4 = 8/12 + 3/12 = 11/12</p>
            </div>
            
            <div class="key-takeaway">
                <h4>Key Takeaway</h4>
                <p>Practice fraction operations until they become automatic. Use your calculator strategically, especially for complex fraction problems!</p>
            </div>
        `
    },
    'algebra-skills': {
        title: 'Chapter 7: Algebra Skills',
        content: `
            <p class="lesson-intro">Strong algebra skills are the foundation of ACT Math success. These fundamental techniques appear in many different types of problems throughout the test.</p>
            
            <h3>Order of Operations (PEMDAS)</h3>
            <div class="rules-box">
                <h4>Remember: Please Excuse My Dear Aunt Sally</h4>
                <ol>
                    <li><strong>P</strong>arentheses</li>
                    <li><strong>E</strong>xponents</li>
                    <li><strong>M</strong>ultiplication and <strong>D</strong>ivision (left to right)</li>
                    <li><strong>A</strong>ddition and <strong>S</strong>ubtraction (left to right)</li>
                </ol>
            </div>
            
            <h3>Working with Negative Numbers</h3>
            <div class="concept-box">
                <h4>Key Rules:</h4>
                <ul>
                    <li><strong>(-) + (-) = (-)</strong></li>
                    <li><strong>(-) - (-) = (-) + (+)</strong></li>
                    <li><strong>(-) × (-) = (+)</strong></li>
                    <li><strong>(-) ÷ (-) = (+)</strong></li>
                </ul>
            </div>
            
            <h3>Combining Like Terms</h3>
            <div class="rules-box">
                <h4>Process:</h4>
                <p>Add or subtract coefficients of terms with the same variable part</p>
                <p><strong>Example:</strong> 3x + 5x - 2x = 6x</p>
            </div>
            
            <h3>Cross Multiplication</h3>
            <div class="concept-box">
                <h4>For equations like a/b = c/d:</h4>
                <p><strong>Cross multiply:</strong> ad = bc</p>
            </div>
            
            <h3>Inequalities</h3>
            <div class="rules-box">
                <h4>Critical Rule:</h4>
                <p><strong>When multiplying or dividing by a negative number, flip the inequality sign!</strong></p>
            </div>
            
            <div class="example-box">
                <p><strong>Problem:</strong> Solve for x: 3x + 7 = 2x - 5</p>
                <p><strong>Solution:</strong> 3x - 2x = -5 - 7 → x = -12</p>
            </div>
            
            <div class="key-takeaway">
                <h4>Key Takeaway</h4>
                <p>These algebra fundamentals appear throughout the ACT Math test. Practice until these operations become second nature!</p>
            </div>
        `
    },
    'number-theory': {
        title: 'Chapter 8: Number Theory',
        content: `
            <p class="lesson-intro">Number theory concepts help you understand different types of numbers and their properties. These topics appear regularly on the ACT and are essential for solving various math problems.</p>
            
            <h3>Types of Numbers</h3>
            <div class="concept-box">
                <h4>Key Definitions:</h4>
                <ul>
                    <li><strong>Integers:</strong> Whole numbers (..., -2, -1, 0, 1, 2, ...)</li>
                    <li><strong>Rational numbers:</strong> Can be expressed as a/b where b ≠ 0</li>
                    <li><strong>Irrational numbers:</strong> Cannot be expressed as a fraction (π, √2)</li>
                    <li><strong>Prime numbers:</strong> Only divisible by 1 and themselves (2, 3, 5, 7, 11...)</li>
                    <li><strong>Composite numbers:</strong> Have factors other than 1 and themselves</li>
                </ul>
            </div>
            
            <h3>Even and Odd Properties</h3>
            <div class="rules-box">
                <h4>Key Rules:</h4>
                <ul>
                    <li><strong>Even + Even = Even</strong></li>
                    <li><strong>Odd + Odd = Even</strong></li>
                    <li><strong>Even + Odd = Odd</strong></li>
                    <li><strong>Even × Even = Even</strong></li>
                    <li><strong>Odd × Odd = Odd</strong></li>
                    <li><strong>Even × Odd = Even</strong></li>
                </ul>
            </div>
            
            <h3>Greatest Common Factor (GCD)</h3>
            <div class="concept-box">
                <h4>Definition:</h4>
                <p>The largest positive integer that divides evenly into all numbers in a set</p>
                <p><strong>Example:</strong> GCD of 12 and 18 is 6</p>
            </div>
            
            <h3>Least Common Multiple (LCM)</h3>
            <div class="concept-box">
                <h4>Definition:</h4>
                <p>The smallest positive integer that is divisible by all numbers in a set</p>
                <p><strong>Example:</strong> LCM of 4 and 6 is 12</p>
            </div>
            
            <h3>Solution Types for Systems</h3>
            <div class="rules-box">
                <h4>Three Possibilities:</h4>
                <ul>
                    <li><strong>One solution:</strong> Lines intersect at one point</li>
                    <li><strong>No solution:</strong> Parallel lines (same slope, different y-intercepts)</li>
                    <li><strong>Infinite solutions:</strong> Same line (identical equations)</li>
                </ul>
            </div>
            
            <div class="key-takeaway">
                <h4>Key Takeaway</h4>
                <p>Understanding number types and their properties helps with many ACT problems. Focus on even/odd rules and GCD/LCM concepts!</p>
            </div>
        `
    },
    'percentages': {
        title: 'Chapter 9: Percentages',
        content: `
            <p class="lesson-intro">Percentage problems appear frequently on the ACT in various forms. Mastering the basic percentage formulas and understanding percent change will help you solve these problems quickly.</p>
            
            <h3>Basic Percentage Formula</h3>
            <div class="rules-box">
                <h4>The Fundamental Relationship:</h4>
                <p><strong>Part/Whole = Percent/100</strong></p>
                <p>Or: <strong>Part = Whole × (Percent/100)</strong></p>
            </div>
            
            <h3>Percent Change</h3>
            <div class="rules-box">
                <h4>Formula:</h4>
                <p><strong>Percent Change = (New Value - Original Value)/Original Value × 100</strong></p>
                <ul>
                    <li>Positive result = percent increase</li>
                    <li>Negative result = percent decrease</li>
                </ul>
            </div>
            
            <h3>Percent Greater/Less Than</h3>
            <div class="concept-box">
                <h4>Key Formulas:</h4>
                <p><strong>Percent greater than:</strong> New/Original = (100 + %)/ 100</p>
                <p><strong>Percent less than:</strong> New/Original = (100 - %)/ 100</p>
            </div>
            
            <h3>Common Percentage Scenarios</h3>
            <div class="example-box">
                <h4>Typical Problems:</h4>
                <ul>
                    <li><strong>Sales tax:</strong> If tax is 8%, total = price × 1.08</li>
                    <li><strong>Discounts:</strong> If discount is 25%, sale price = price × 0.75</li>
                    <li><strong>Tips:</strong> If tip is 15%, total = bill × 1.15</li>
                </ul>
            </div>
            
            <div class="tip-box">
                <h4>Calculator Tips:</h4>
                <ul>
                    <li>To find 15% of 80: 80 × 0.15 = 12</li>
                    <li>To increase by 20%: multiply by 1.20</li>
                    <li>To decrease by 30%: multiply by 0.70</li>
                </ul>
            </div>
            
            <div class="example-box">
                <p><strong>Problem:</strong> A $200 item is marked down 25%. What is the sale price?</p>
                <p><strong>Solution:</strong> Sale price = $200 × 0.75 = $150</p>
            </div>
            
            <div class="key-takeaway">
                <h4>Key Takeaway</h4>
                <p>Master the basic percentage formula and percent change formula. Practice converting between percent increase/decrease and decimal multipliers!</p>
            </div>
        `
    },
    'ratios-proportions': {
        title: 'Chapter 10: Ratios and Proportions',
        content: `
            <p class="lesson-intro">Ratios and proportions are fundamental concepts that appear in many ACT math problems. Understanding how to set up and solve proportions will help you tackle word problems, geometry problems, and scaling questions.</p>
            
            <h3>Understanding Ratios</h3>
            <div class="concept-box">
                <h4>Definition:</h4>
                <p>A ratio compares two quantities: a:b or a/b</p>
                <p><strong>Example:</strong> If there are 3 cats and 2 dogs, the ratio of cats to dogs is 3:2</p>
            </div>
            
            <h3>Setting Up Proportions</h3>
            <div class="rules-box">
                <h4>Proportion Format:</h4>
                <p><strong>a/b = c/d</strong></p>
                <p>Cross multiply: <strong>ad = bc</strong></p>
            </div>
            
            <h3>The "X" Trick for Ratios</h3>
            <div class="tip-box">
                <h4>When you have ratios and a total:</h4>
                <p>If the ratio is a:b and the total is T, then:</p>
                <ul>
                    <li>First part = a/(a+b) × T</li>
                    <li>Second part = b/(a+b) × T</li>
                </ul>
            </div>
            
            <h3>Direct and Inverse Variation</h3>
            <div class="concept-box">
                <h4>Direct Variation:</h4>
                <p><strong>y = kx</strong> (as one increases, the other increases)</p>
                
                <h4>Inverse Variation:</h4>
                <p><strong>y = k/x</strong> (as one increases, the other decreases)</p>
            </div>
            
            <div class="example-box">
                <p><strong>Problem:</strong> In a class of 30 students, the ratio of boys to girls is 3:2. How many boys are there?</p>
                <p><strong>Solution:</strong> Boys = 3/(3+2) × 30 = 3/5 × 30 = 18</p>
            </div>
            
            <div class="example-box">
                <p><strong>Problem:</strong> If 3 pounds of apples cost $4.50, how much do 5 pounds cost?</p>
                <p><strong>Solution:</strong> Set up proportion: 3/4.50 = 5/x → x = $7.50</p>
            </div>
            
            <div class="key-takeaway">
                <h4>Key Takeaway</h4>
                <p>Ratios and proportions are powerful tools for solving many ACT problems. Practice setting up proportions and using cross multiplication!</p>
            </div>
        `
    },
    'functions': {
        title: 'Chapter 11: Functions',
        content: `
            <p class="lesson-intro">Function notation and function operations are common on the ACT. Understanding how to evaluate functions, work with composite functions, and determine domain and range is essential.</p>
            
            <h3>Function Notation</h3>
            <div class="concept-box">
                <h4>Basic Notation:</h4>
                <p><strong>f(x)</strong> means "f of x" or "the function f at input x"</p>
                <p><strong>Example:</strong> If f(x) = 2x + 3, then f(5) = 2(5) + 3 = 13</p>
            </div>
            
            <h3>Evaluating Functions</h3>
            <div class="rules-box">
                <h4>Steps:</h4>
                <ol>
                    <li>Replace every x in the function with the given input</li>
                    <li>Simplify using order of operations</li>
                </ol>
            </div>
            
            <h3>Composite Functions</h3>
            <div class="concept-box">
                <h4>Notation: (f ∘ g)(x) = f(g(x))</h4>
                <p>Work from the inside out!</p>
                <p><strong>Example:</strong> If f(x) = x + 1 and g(x) = 2x, then f(g(3)) = f(6) = 7</p>
            </div>
            
            <h3>Domain and Range</h3>
            <div class="rules-box">
                <h4>Definitions:</h4>
                <ul>
                    <li><strong>Domain:</strong> All possible input values (x-values)</li>
                    <li><strong>Range:</strong> All possible output values (y-values)</li>
                </ul>
                
                <h4>Domain Restrictions:</h4>
                <ul>
                    <li>Cannot divide by zero</li>
                    <li>Cannot take square root of negative numbers (in real numbers)</li>
                </ul>
            </div>
            
            <h3>Functions on Graphs</h3>
            <div class="tip-box">
                <h4>Reading Function Values:</h4>
                <ul>
                    <li>f(a) is the y-coordinate when x = a</li>
                    <li>If f(a) = b, then the point (a, b) is on the graph</li>
                </ul>
            </div>
            
            <div class="example-box">
                <p><strong>Problem:</strong> If f(x) = x² - 3x + 2, find f(-1).</p>
                <p><strong>Solution:</strong> f(-1) = (-1)² - 3(-1) + 2 = 1 + 3 + 2 = 6</p>
            </div>
            
            <div class="key-takeaway">
                <h4>Key Takeaway</h4>
                <p>Function problems are about substitution and careful arithmetic. Practice evaluating functions and working with composite functions!</p>
            </div>
        `
    },
    'statistics-basics': {
        title: 'Chapter 12: Mean, Median, Mode, and Range',
        content: `
            <p class="lesson-intro">Basic statistics concepts appear regularly on the ACT. Understanding how to calculate and interpret mean, median, mode, and range is essential for data analysis problems.</p>
            
            <h3>Definitions</h3>
            <div class="concept-box">
                <h4>The Big Four:</h4>
                <ul>
                    <li><strong>Mean:</strong> The average (sum ÷ count)</li>
                    <li><strong>Median:</strong> The middle value when arranged in order</li>
                    <li><strong>Mode:</strong> The most frequently occurring value</li>
                    <li><strong>Range:</strong> The difference between highest and lowest values</li>
                </ul>
            </div>
            
            <h3>Calculating the Mean</h3>
            <div class="rules-box">
                <h4>Formula:</h4>
                <p><strong>Mean = Sum of all values / Number of values</strong></p>
            </div>
            
            <h3>Finding the Median</h3>
            <div class="rules-box">
                <h4>Steps:</h4>
                <ol>
                    <li>Arrange values in order from least to greatest</li>
                    <li>If odd number of values: middle value</li>
                    <li>If even number of values: average of two middle values</li>
                </ol>
            </div>
            
            <h3>Weighted Average</h3>
            <div class="concept-box">
                <h4>Formula:</h4>
                <p><strong>Weighted Average = (value₁ × weight₁ + value₂ × weight₂ + ...) / (weight₁ + weight₂ + ...)</strong></p>
            </div>
            
            <div class="example-box">
                <p><strong>Problem:</strong> Find the mean, median, mode, and range of: 3, 7, 3, 9, 5, 7, 3</p>
                <p><strong>Solution:</strong></p>
                <p>Ordered: 3, 3, 3, 5, 7, 7, 9</p>
                <p>Mean = 37/7 ≈ 5.3</p>
                <p>Median = 5</p>
                <p>Mode = 3</p>
                <p>Range = 9 - 3 = 6</p>
            </div>
            
            <div class="key-takeaway">
                <h4>Key Takeaway</h4>
                <p>Know how to calculate all four measures of central tendency. Pay attention to whether problems ask for mean, median, or mode specifically!</p>
            </div>
        `
    },
    'exponents-roots': {
        title: 'Chapter 13: Exponents and Roots',
        content: `
            <p class="lesson-intro">Exponent and radical operations are fundamental algebra skills that appear throughout the ACT Math test. Mastering these rules will help you simplify expressions and solve equations efficiently.</p>
            
            <h3>Basic Exponent Rules</h3>
            <div class="rules-box">
                <h4>Essential Rules:</h4>
                <ul>
                    <li><strong>a^m × a^n = a^(m+n)</strong></li>
                    <li><strong>a^m ÷ a^n = a^(m-n)</strong></li>
                    <li><strong>(a^m)^n = a^(mn)</strong></li>
                    <li><strong>a^(-n) = 1/a^n</strong></li>
                    <li><strong>a^0 = 1</strong> (when a ≠ 0)</li>
                    <li><strong>a^(1/n) = ⁿ√a</strong></li>
                </ul>
            </div>
            
            <h3>Working with Radicals</h3>
            <div class="concept-box">
                <h4>Key Properties:</h4>
                <ul>
                    <li><strong>√(ab) = √a × √b</strong></li>
                    <li><strong>√(a/b) = √a / √b</strong></li>
                    <li><strong>√(a²) = |a|</strong></li>
                </ul>
            </div>
            
            <h3>Simplifying Square Roots</h3>
            <div class="rules-box">
                <h4>Process:</h4>
                <ol>
                    <li>Factor out perfect squares</li>
                    <li>Take the square root of perfect squares</li>
                    <li>Leave non-perfect squares under the radical</li>
                </ol>
                <p><strong>Example:</strong> √72 = √(36 × 2) = 6√2</p>
            </div>
            
            <h3>Fractional Exponents</h3>
            <div class="concept-box">
                <h4>Key Relationship:</h4>
                <p><strong>a^(m/n) = ⁿ√(a^m) = (ⁿ√a)^m</strong></p>
                <p><strong>Example:</strong> 8^(2/3) = (∛8)² = 2² = 4</p>
            </div>
            
            <div class="example-box">
                <p><strong>Problem:</strong> Simplify x⁶ × x⁻² × x³</p>
                <p><strong>Solution:</strong> x⁶ × x⁻² × x³ = x^(6-2+3) = x⁷</p>
            </div>
            
            <div class="key-takeaway">
                <h4>Key Takeaway</h4>
                <p>Memorize the exponent rules and practice simplifying radicals. These skills are essential for many algebra and pre-calculus problems!</p>
            </div>
        `
    },
    'logarithms': {
        title: 'Chapter 14: Logarithms',
        content: `
            <p class="lesson-intro">Logarithms are the inverse of exponentials and appear on more advanced ACT problems. Understanding the basic definition and key properties will help you solve logarithmic equations.</p>
            
            <h3>Definition of Logarithms</h3>
            <div class="concept-box">
                <h4>Fundamental Relationship:</h4>
                <p><strong>log_b(a) = c</strong> is equivalent to <strong>b^c = a</strong></p>
                <p>The logarithm asks: "To what power must we raise b to get a?"</p>
            </div>
            
            <h3>Common and Natural Logarithms</h3>
            <div class="rules-box">
                <h4>Special Cases:</h4>
                <ul>
                    <li><strong>Common log:</strong> log(x) = log₁₀(x)</li>
                    <li><strong>Natural log:</strong> ln(x) = log_e(x)</li>
                </ul>
            </div>
            
            <h3>Logarithm Properties</h3>
            <div class="rules-box">
                <h4>Essential Rules:</h4>
                <ul>
                    <li><strong>log_b(xy) = log_b(x) + log_b(y)</strong></li>
                    <li><strong>log_b(x/y) = log_b(x) - log_b(y)</strong></li>
                    <li><strong>log_b(x^n) = n × log_b(x)</strong></li>
                    <li><strong>log_b(1) = 0</strong></li>
                    <li><strong>log_b(b) = 1</strong></li>
                </ul>
            </div>
            
            <h3>Change of Base Formula</h3>
            <div class="concept-box">
                <h4>Formula:</h4>
                <p><strong>log_b(a) = log(a)/log(b) = ln(a)/ln(b)</strong></p>
                <p>Use this when your calculator doesn't have the specific base you need</p>
            </div>
            
            <div class="example-box">
                <p><strong>Problem:</strong> Solve for x: log₂(x) = 5</p>
                <p><strong>Solution:</strong> Convert to exponential form: 2⁵ = x, so x = 32</p>
            </div>
            
            <div class="key-takeaway">
                <h4>Key Takeaway</h4>
                <p>Remember that logarithms and exponentials are inverses. Convert between logarithmic and exponential form to solve problems!</p>
            </div>
        `
    },
    'systems-equations': {
        title: 'Chapter 15: Systems of Equations',
        content: `
            <p class="lesson-intro">Systems of equations involve finding values that satisfy multiple equations simultaneously. The ACT tests both algebraic methods and word problem applications.</p>
            
            <h3>Elimination Method</h3>
            <div class="rules-box">
                <h4>Steps:</h4>
                <ol>
                    <li>Align equations with like terms</li>
                    <li>Multiply one or both equations to create opposite coefficients</li>
                    <li>Add or subtract equations to eliminate one variable</li>
                    <li>Solve for the remaining variable</li>
                    <li>Substitute back to find the other variable</li>
                </ol>
            </div>
            
            <h3>Substitution Method</h3>
            <div class="rules-box">
                <h4>Steps:</h4>
                <ol>
                    <li>Solve one equation for one variable</li>
                    <li>Substitute this expression into the other equation</li>
                    <li>Solve for the remaining variable</li>
                    <li>Substitute back to find the other variable</li>
                </ol>
            </div>
            
            <h3>Types of Solutions</h3>
            <div class="concept-box">
                <h4>Three Possibilities:</h4>
                <ul>
                    <li><strong>One solution:</strong> Lines intersect at one point</li>
                    <li><strong>No solution:</strong> Parallel lines (inconsistent system)</li>
                    <li><strong>Infinite solutions:</strong> Same line (dependent system)</li>
                </ul>
            </div>
            
            <div class="example-box">
                <p><strong>Problem:</strong> Solve the system:</p>
                <p>2x + 3y = 7</p>
                <p>x - y = 1</p>
                <p><strong>Solution using substitution:</strong></p>
                <p>From equation 2: x = y + 1</p>
                <p>Substitute: 2(y + 1) + 3y = 7</p>
                <p>2y + 2 + 3y = 7 → 5y = 5 → y = 1</p>
                <p>Therefore: x = 1 + 1 = 2</p>
                <p>Solution: (2, 1)</p>
            </div>
            
            <div class="key-takeaway">
                <h4>Key Takeaway</h4>
                <p>Practice both elimination and substitution methods. Choose the method that seems most efficient for each problem!</p>
            </div>
        `
    },
    'quadratics': {
        title: 'Chapter 16: Quadratics',
        content: `
            <p class="lesson-intro">Quadratic equations and functions are major topics on the ACT. Understanding factoring, the quadratic formula, and graphing properties is essential for success.</p>
            
            <h3>Standard Form</h3>
            <div class="concept-box">
                <h4>Quadratic Equation:</h4>
                <p><strong>ax² + bx + c = 0</strong> (where a ≠ 0)</p>
            </div>
            
            <h3>Factoring Quadratics</h3>
            <div class="rules-box">
                <h4>For x² + bx + c:</h4>
                <p>Find two numbers that multiply to c and add to b</p>
                <p><strong>Example:</strong> x² + 5x + 6 = (x + 2)(x + 3)</p>
                
                <h4>For ax² + bx + c (a ≠ 1):</h4>
                <p>Use the AC method or trial and error</p>
            </div>
            
            <h3>Quadratic Formula</h3>
            <div class="rules-box">
                <h4>Formula:</h4>
                <p><strong>x = (-b ± √(b² - 4ac))/2a</strong></p>
                <p>Use when factoring is difficult or impossible</p>
            </div>
            
            <h3>The Discriminant</h3>
            <div class="concept-box">
                <h4>b² - 4ac tells us:</h4>
                <ul>
                    <li><strong>Positive:</strong> Two real solutions</li>
                    <li><strong>Zero:</strong> One real solution (repeated root)</li>
                    <li><strong>Negative:</strong> No real solutions (two complex solutions)</li>
                </ul>
            </div>
            
            <h3>Vertex Form</h3>
            <div class="rules-box">
                <h4>Form:</h4>
                <p><strong>y = a(x - h)² + k</strong></p>
                <p>Vertex at (h, k)</p>
                <p>Axis of symmetry: x = h</p>
            </div>
            
            <div class="example-box">
                <p><strong>Problem:</strong> Solve x² - 5x + 6 = 0</p>
                <p><strong>Solution by factoring:</strong></p>
                <p>Need two numbers that multiply to 6 and add to -5: -2 and -3</p>
                <p>(x - 2)(x - 3) = 0</p>
                <p>Solutions: x = 2 or x = 3</p>
            </div>
            
            <div class="key-takeaway">
                <h4>Key Takeaway</h4>
                <p>Learn to factor quadratics quickly, but know the quadratic formula as backup. Understanding the vertex form helps with graphing!</p>
            </div>
        `
    },
    'trigonometry': {
        title: 'Chapter 17: Trigonometry',
        content: `
            <p class="lesson-intro">Trigonometry problems on the ACT focus mainly on right triangle trigonometry and basic trig functions. Mastering SOH-CAH-TOA and understanding the unit circle will help you solve these problems.</p>
            
            <h3>SOH-CAH-TOA</h3>
            <div class="rules-box">
                <h4>Basic Trigonometric Ratios:</h4>
                <ul>
                    <li><strong>sin(θ) = Opposite/Hypotenuse</strong></li>
                    <li><strong>cos(θ) = Adjacent/Hypotenuse</strong></li>
                    <li><strong>tan(θ) = Opposite/Adjacent</strong></li>
                </ul>
            </div>
            
            <h3>Reciprocal Functions</h3>
            <div class="concept-box">
                <h4>Less Common Functions:</h4>
                <ul>
                    <li><strong>csc(θ) = 1/sin(θ)</strong></li>
                    <li><strong>sec(θ) = 1/cos(θ)</strong></li>
                    <li><strong>cot(θ) = 1/tan(θ)</strong></li>
                </ul>
            </div>
            
            <h3>Pythagorean Identity</h3>
            <div class="rules-box">
                <h4>Fundamental Identity:</h4>
                <p><strong>sin²(θ) + cos²(θ) = 1</strong></p>
            </div>
            
            <h3>Special Angle Values</h3>
            <div class="concept-box">
                <h4>Common Angles:</h4>
                <ul>
                    <li><strong>30°:</strong> sin = 1/2, cos = √3/2, tan = 1/√3</li>
                    <li><strong>45°:</strong> sin = √2/2, cos = √2/2, tan = 1</li>
                    <li><strong>60°:</strong> sin = √3/2, cos = 1/2, tan = √3</li>
                </ul>
            </div>
            
            <h3>Law of Sines and Cosines</h3>
            <div class="rules-box">
                <h4>For any triangle:</h4>
                <p><strong>Law of Sines:</strong> a/sin(A) = b/sin(B) = c/sin(C)</p>
                <p><strong>Law of Cosines:</strong> c² = a² + b² - 2ab cos(C)</p>
            </div>
            
            <div class="example-box">
                <p><strong>Problem:</strong> In a right triangle, if the angle is 30° and the hypotenuse is 10, find the opposite side.</p>
                <p><strong>Solution:</strong> sin(30°) = opposite/10</p>
                <p>1/2 = opposite/10</p>
                <p>opposite = 5</p>
            </div>
            
            <div class="key-takeaway">
                <h4>Key Takeaway</h4>
                <p>Memorize SOH-CAH-TOA and the special angle values. These are the foundation for most ACT trigonometry problems!</p>
            </div>
        `
    },
    'absolute-value': {
        title: 'Chapter 18: Absolute Value',
        content: `
            <p class="lesson-intro">Absolute value represents distance from zero on the number line. Understanding how to solve absolute value equations and inequalities is important for ACT success.</p>
            
            <h3>Definition</h3>
            <div class="concept-box">
                <h4>Absolute Value:</h4>
                <p><strong>|x| = distance from x to 0</strong></p>
                <ul>
                    <li>If x ≥ 0, then |x| = x</li>
                    <li>If x < 0, then |x| = -x</li>
                </ul>
            </div>
            
            <h3>Solving Absolute Value Equations</h3>
            <div class="rules-box">
                <h4>For |x| = a (where a > 0):</h4>
                <p><strong>x = a or x = -a</strong></p>
                
                <h4>For |f(x)| = a:</h4>
                <p><strong>f(x) = a or f(x) = -a</strong></p>
            </div>
            
            <h3>Absolute Value Inequalities</h3>
            <div class="rules-box">
                <h4>Two Cases:</h4>
                <p><strong>|x| < a means -a < x < a</strong> (between)</p>
                <p><strong>|x| > a means x < -a or x > a</strong> (outside)</p>
            </div>
            
            <div class="example-box">
                <p><strong>Problem:</strong> Solve |2x - 3| = 7</p>
                <p><strong>Solution:</strong></p>
                <p>Case 1: 2x - 3 = 7 → x = 5</p>
                <p>Case 2: 2x - 3 = -7 → x = -2</p>
                <p>Solutions: x = 5 or x = -2</p>
            </div>
            
            <div class="example-box">
                <p><strong>Problem:</strong> Solve |x - 2| < 5</p>
                <p><strong>Solution:</strong></p>
                <p>-5 < x - 2 < 5</p>
                <p>-3 < x < 7</p>
            </div>
            
            <div class="key-takeaway">
                <h4>Key Takeaway</h4>
                <p>Remember that absolute value equations typically have two solutions, while inequalities give ranges. Think about distance on the number line!</p>
            </div>
        `
    },
    'matrices': {
        title: 'Chapter 19: Matrices',
        content: `
            <p class="lesson-intro">Matrices are rectangular arrays of numbers that appear occasionally on the ACT. Understanding basic matrix operations and determinants will help you solve these problems.</p>
            
            <h3>Matrix Basics</h3>
            <div class="concept-box">
                <h4>Definition:</h4>
                <p>A matrix is a rectangular array of numbers arranged in rows and columns</p>
                <p><strong>Dimensions:</strong> m × n (m rows, n columns)</p>
            </div>
            
            <h3>Matrix Addition and Subtraction</h3>
            <div class="rules-box">
                <h4>Rule:</h4>
                <p>Matrices must have the same dimensions</p>
                <p>Add or subtract corresponding elements</p>
            </div>
            
            <h3>Matrix Multiplication</h3>
            <div class="rules-box">
                <h4>Requirements:</h4>
                <p>Number of columns in first matrix = number of rows in second matrix</p>
                <p>Result has dimensions: (rows of first) × (columns of second)</p>
            </div>
            
            <h3>Determinant of 2×2 Matrix</h3>
            <div class="rules-box">
                <h4>Formula:</h4>
                <p>For matrix [a b; c d]:</p>
                <p><strong>det = ad - bc</strong></p>
            </div>
            
            <div class="example-box">
                <p><strong>Problem:</strong> Add the matrices:</p>
                <p>[2 3] + [1 4] = ?</p>
                <p>[1 5]   [2 1]</p>
                <p><strong>Solution:</strong></p>
                <p>[2+1 3+4] = [3 7]</p>
                <p>[1+2 5+1]   [3 6]</p>
            </div>
            
            <div class="tip-box">
                <h4>Calculator Tip:</h4>
                <p>Many calculators can perform matrix operations. Check if yours has matrix functions to save time!</p>
            </div>
            
            <div class="key-takeaway">
                <h4>Key Takeaway</h4>
                <p>Matrix problems on the ACT are usually straightforward applications of basic operations. Know the determinant formula for 2×2 matrices!</p>
            </div>
        `
    },
    'repeating-patterns': {
        title: 'Chapter 20: Repeating Patterns',
        content: `
            <p class="lesson-intro">Pattern recognition problems test your ability to identify cycles in sequences, decimals, and powers. Understanding how to find and use repeating patterns can help solve these efficiently.</p>
            
            <h3>Repeating Decimals</h3>
            <div class="concept-box">
                <h4>Converting Fractions:</h4>
                <p>Some fractions create repeating decimal patterns</p>
                <p><strong>Example:</strong> 1/3 = 0.333... (period = 1)</p>
                <p><strong>Example:</strong> 1/7 = 0.142857142857... (period = 6)</p>
            </div>
            
            <h3>Powers and Units Digits</h3>
            <div class="rules-box">
                <h4>Common Patterns:</h4>
                <ul>
                    <li><strong>2ⁿ units digits:</strong> 2, 4, 8, 6, 2, 4, 8, 6... (period 4)</li>
                    <li><strong>3ⁿ units digits:</strong> 3, 9, 7, 1, 3, 9, 7, 1... (period 4)</li>
                    <li><strong>4ⁿ units digits:</strong> 4, 6, 4, 6... (period 2)</li>
                    <li><strong>Powers of i:</strong> i, -1, -i, 1, i, -1, -i, 1... (period 4)</li>
                </ul>
            </div>
            
            <h3>Finding Pattern Position</h3>
            <div class="rules-box">
                <h4>Strategy:</h4>
                <ol>
                    <li>Identify the repeating pattern</li>
                    <li>Find the period (length of pattern)</li>
                    <li>Use modular arithmetic: position mod period</li>
                    <li>If remainder is 0, use the last element of pattern</li>
                </ol>
            </div>
            
            <div class="example-box">
                <p><strong>Problem:</strong> What is the units digit of 3²⁰?</p>
                <p><strong>Solution:</strong></p>
                <p>Pattern of 3ⁿ units digits: 3, 9, 7, 1 (period 4)</p>
                <p>20 ÷ 4 = 5 remainder 0</p>
                <p>When remainder is 0, use last element: 1</p>
            </div>
            
            <div class="key-takeaway">
                <h4>Key Takeaway</h4>
                <p>Look for patterns in sequences and use modular arithmetic to find specific terms efficiently. Many ACT pattern problems have cycles of 2, 3, 4, or 6!</p>
            </div>
        `
    },
    'circles-ellipses': {
        title: 'Chapter 21: Circles, Ellipses, and Hyperbolas',
        content: `
            <p class="lesson-intro">Conic sections appear on advanced ACT problems. Understanding the standard forms and key properties of circles, ellipses, and hyperbolas will help you solve coordinate geometry problems.</p>
            
            <h3>Circle Equations</h3>
            <div class="rules-box">
                <h4>Standard Form:</h4>
                <p><strong>(x - h)² + (y - k)² = r²</strong></p>
                <p>Center: (h, k), Radius: r</p>
                
                <h4>General Form:</h4>
                <p><strong>x² + y² + Dx + Ey + F = 0</strong></p>
                <p>Complete the square to convert to standard form</p>
            </div>
            
            <h3>Ellipse Equations</h3>
            <div class="rules-box">
                <h4>Standard Form:</h4>
                <p><strong>(x - h)²/a² + (y - k)²/b² = 1</strong></p>
                <p>Center: (h, k)</p>
                <p>If a > b: horizontal major axis, length 2a</p>
                <p>If b > a: vertical major axis, length 2b</p>
            </div>
            
            <h3>Hyperbola Equations</h3>
            <div class="concept-box">
                <h4>Two Types:</h4>
                <p><strong>Horizontal:</strong> (x - h)²/a² - (y - k)²/b² = 1</p>
                <p><strong>Vertical:</strong> (y - k)²/a² - (x - h)²/b² = 1</p>
            </div>
            
            <h3>Key Circle Properties</h3>
            <div class="tip-box">
                <h4>Important Facts:</h4>
                <ul>
                    <li>Tangent lines are perpendicular to radii at point of tangency</li>
                    <li>Chords equidistant from center are equal in length</li>
                    <li>Inscribed angles are half the central angle</li>
                </ul>
            </div>
            
            <div class="example-box">
                <p><strong>Problem:</strong> Find the center and radius of x² + y² - 6x + 4y + 9 = 0</p>
                <p><strong>Solution:</strong></p>
                <p>Complete the square:</p>
                <p>(x² - 6x + 9) + (y² + 4y + 4) = -9 + 9 + 4</p>
                <p>(x - 3)² + (y + 2)² = 4</p>
                <p>Center: (3, -2), Radius: 2</p>
            </div>
            
            <div class="key-takeaway">
                <h4>Key Takeaway</h4>
                <p>Know the standard forms of conic sections. Practice completing the square to convert between general and standard forms!</p>
            </div>
        `
    },
    'probability': {
        title: 'Chapter 22: Probability',
        content: `
            <p class="lesson-intro">Probability measures the likelihood of events occurring. Understanding basic probability rules and how to calculate probabilities from data will help you solve these ACT problems.</p>
            
            <h3>Basic Probability</h3>
            <div class="rules-box">
                <h4>Definition:</h4>
                <p><strong>P(event) = Number of favorable outcomes / Total number of possible outcomes</strong></p>
                <p>Probability values range from 0 to 1 (or 0% to 100%)</p>
            </div>
            
            <h3>Essential Probability Rules</h3>
            <div class="rules-box">
                <h4>Three Key Rules:</h4>
                <ol>
                    <li><strong>Sum Rule:</strong> All probabilities add to 1</li>
                    <li><strong>OR Rule:</strong> P(A or B) = P(A) + P(B) - P(A and B)</li>
                    <li><strong>AND Rule:</strong> P(A and B) = P(A) × P(B) for independent events</li>
                </ol>
            </div>
            
            <h3>Independent vs. Dependent Events</h3>
            <div class="concept-box">
                <h4>Key Difference:</h4>
                <ul>
                    <li><strong>Independent:</strong> One event doesn't affect the other</li>
                    <li><strong>Dependent:</strong> One event affects the probability of the other</li>
                </ul>
            </div>
            
            <h3>Expected Value</h3>
            <div class="rules-box">
                <h4>Formula:</h4>
                <p><strong>E(X) = Σ[probability × value]</strong></p>
                <p>Sum of each outcome's value times its probability</p>
            </div>
            
            <div class="example-box">
                <p><strong>Problem:</strong> A bag contains 3 red balls and 2 blue balls. What is the probability of drawing a red ball?</p>
                <p><strong>Solution:</strong> P(red) = 3/(3+2) = 3/5 = 0.6 or 60%</p>
            </div>
            
            <div class="example-box">
                <p><strong>Problem:</strong> What is the probability of rolling a 6 on a die twice in a row?</p>
                <p><strong>Solution:</strong> P(6 and 6) = P(6) × P(6) = 1/6 × 1/6 = 1/36</p>
            </div>
            
            <div class="key-takeaway">
                <h4>Key Takeaway</h4>
                <p>Master the basic probability formula and the three essential rules. Practice identifying whether events are independent or dependent!</p>
            </div>
        `
    },
    'permutations-combinations': {
        title: 'Chapter 23: Permutations, Combinations, and Organized Counting',
        content: `
            <p class="lesson-intro">Counting problems appear on the ACT in various forms. Understanding when to use permutations, combinations, and organized counting will help you solve these systematically.</p>
            
            <h3>Factorial Notation</h3>
            <div class="concept-box">
                <h4>Definition:</h4>
                <p><strong>n! = n × (n-1) × (n-2) × ... × 2 × 1</strong></p>
                <p><strong>Examples:</strong> 5! = 5×4×3×2×1 = 120, 0! = 1</p>
            </div>
            
            <h3>Permutations (Order Matters)</h3>
            <div class="rules-box">
                <h4>Formula:</h4>
                <p><strong>nPr = n!/(n-r)!</strong></p>
                <p>Number of ways to arrange r objects from n objects where order matters</p>
            </div>
            
            <h3>Combinations (Order Doesn't Matter)</h3>
            <div class="rules-box">
                <h4>Formula:</h4>
                <p><strong>nCr = n!/(r!(n-r)!)</strong></p>
                <p>Number of ways to choose r objects from n objects where order doesn't matter</p>
            </div>
            
            <h3>When to Use Which Method</h3>
            <div class="concept-box">
                <h4>Decision Guide:</h4>
                <ul>
                    <li><strong>Permutations:</strong> Arranging, ordering, first/second/third place</li>
                    <li><strong>Combinations:</strong> Selecting, choosing, committees, groups</li>
                    <li><strong>Organized counting:</strong> Multi-step problems, tree diagrams</li>
                </ul>
            </div>
            
            <div class="example-box">
                <p><strong>Problem:</strong> How many ways can 5 people be arranged in a line?</p>
                <p><strong>Solution:</strong> This is a permutation: 5! = 120 ways</p>
            </div>
            
            <div class="example-box">
                <p><strong>Problem:</strong> How many ways can you choose 3 people from a group of 8 for a committee?</p>
                <p><strong>Solution:</strong> This is a combination: 8C3 = 8!/(3!×5!) = 56 ways</p>
            </div>
            
            <div class="key-takeaway">
                <h4>Key Takeaway</h4>
                <p>Determine whether order matters to choose between permutations and combinations. Use your calculator's nPr and nCr functions when available!</p>
            </div>
        `
    },
    'sequences': {
        title: 'Chapter 24: Sequences',
        content: `
            <p class="lesson-intro">Sequences are ordered lists of numbers that follow specific patterns. Understanding arithmetic and geometric sequences will help you find terms and sums efficiently.</p>
            
            <h3>Arithmetic Sequences</h3>
            <div class="rules-box">
                <h4>Definition:</h4>
                <p>Each term is found by adding a constant (common difference) to the previous term</p>
                <p><strong>Formula for nth term:</strong> an = a1 + (n-1)d</p>
                <p>where a1 is first term, d is common difference</p>
            </div>
            
            <h3>Geometric Sequences</h3>
            <div class="rules-box">
                <h4>Definition:</h4>
                <p>Each term is found by multiplying the previous term by a constant (common ratio)</p>
                <p><strong>Formula for nth term:</strong> an = a1 × r^(n-1)</p>
                <p>where a1 is first term, r is common ratio</p>
            </div>
            
            <h3>Recursive Sequences</h3>
            <div class="concept-box">
                <h4>Definition:</h4>
                <p>Each term is defined in terms of previous terms</p>
                <p><strong>Example:</strong> an = an-1 + an-2 (like Fibonacci sequence)</p>
            </div>
            
            <div class="example-box">
                <p><strong>Problem:</strong> Find the 10th term of the arithmetic sequence: 3, 7, 11, 15, ...</p>
                <p><strong>Solution:</strong></p>
                <p>a1 = 3, d = 4</p>
                <p>a10 = 3 + (10-1)×4 = 3 + 36 = 39</p>
            </div>
            
            <div class="example-box">
                <p><strong>Problem:</strong> Find the 6th term of the geometric sequence: 2, 6, 18, 54, ...</p>
                <p><strong>Solution:</strong></p>
                <p>a1 = 2, r = 3</p>
                <p>a6 = 2 × 3^(6-1) = 2 × 3^5 = 2 × 243 = 486</p>
            </div>
            
            <div class="key-takeaway">
                <h4>Key Takeaway</h4>
                <p>Identify the pattern first: arithmetic (constant difference) or geometric (constant ratio). Then apply the appropriate formula!</p>
            </div>
        `
    },
    'complex-numbers': {
        title: 'Chapter 25: Complex Numbers',
        content: `
            <p class="lesson-intro">Complex numbers extend the real number system to include imaginary numbers. Understanding basic operations with complex numbers will help you solve advanced algebra problems.</p>
            
            <h3>The Imaginary Unit</h3>
            <div class="concept-box">
                <h4>Definition:</h4>
                <p><strong>i = √(-1)</strong></p>
                <p><strong>i² = -1</strong></p>
            </div>
            
            <h3>Complex Number Form</h3>
            <div class="rules-box">
                <h4>Standard Form:</h4>
                <p><strong>a + bi</strong></p>
                <p>where a is the real part and b is the imaginary part</p>
            </div>
            
            <h3>Powers of i</h3>
            <div class="concept-box">
                <h4>Pattern (repeats every 4):</h4>
                <ul>
                    <li><strong>i¹ = i</strong></li>
                    <li><strong>i² = -1</strong></li>
                    <li><strong>i³ = -i</strong></li>
                    <li><strong>i⁴ = 1</strong></li>
                </ul>
            </div>
            
            <h3>Basic Operations</h3>
            <div class="rules-box">
                <h4>Addition/Subtraction:</h4>
                <p>(a + bi) ± (c + di) = (a ± c) + (b ± d)i</p>
                
                <h4>Multiplication:</h4>
                <p>Use FOIL and remember i² = -1</p>
                
                <h4>Complex Conjugate:</h4>
                <p>Conjugate of (a + bi) is (a - bi)</p>
            </div>
            
            <h3>Complex Plane</h3>
            <div class="concept-box">
                <h4>Graphing:</h4>
                <p>Plot a + bi at point (a, b) where:</p>
                <ul>
                    <li>x-axis represents real part</li>
                    <li>y-axis represents imaginary part</li>
                </ul>
            </div>
            
            <div class="example-box">
                <p><strong>Problem:</strong> Simplify (3 + 2i) + (1 - 4i)</p>
                <p><strong>Solution:</strong> (3 + 1) + (2 - 4)i = 4 - 2i</p>
            </div>
            
            <div class="example-box">
                <p><strong>Problem:</strong> Find i²⁵</p>
                <p><strong>Solution:</strong> 25 ÷ 4 = 6 remainder 1, so i²⁵ = i¹ = i</p>
            </div>
            
            <div class="key-takeaway">
                <h4>Key Takeaway</h4>
                <p>Remember that i² = -1 and the powers of i repeat every 4. Treat complex numbers like binomials when doing operations!</p>
            </div>
        `
    },
    'word-problems': {
        title: 'Chapter 26: Word Problems',
        content: `
            <p class="lesson-intro">Word problems appear throughout the ACT Math test in various forms. Having a systematic approach to translate words into mathematical expressions will help you solve these efficiently.</p>
            
            <h3>Four-Step Strategy</h3>
            <div class="rules-box">
                <h4>Systematic Approach:</h4>
                <ol>
                    <li><strong>Read carefully</strong> and identify what you're looking for</li>
                    <li><strong>Define variables</strong> for unknown quantities</li>
                    <li><strong>Set up equations</strong> or expressions</li>
                    <li><strong>Solve and check</strong> your answer</li>
                </ol>
            </div>
            
            <h3>Common Word Problem Types</h3>
            <div class="concept-box">
                <h4>Frequent Categories:</h4>
                <ul>
                    <li><strong>Age problems</strong></li>
                    <li><strong>Distance/rate/time problems</strong></li>
                    <li><strong>Work rate problems</strong></li>
                    <li><strong>Mixture problems</strong></li>
                    <li><strong>Percent and interest problems</strong></li>
                    <li><strong>Geometry applications</strong></li>
                </ul>
            </div>
            
            <h3>Key Translation Phrases</h3>
            <div class="tip-box">
                <h4>Mathematical Translations:</h4>
                <ul>
                    <li><strong>"is" or "equals"</strong> → =</li>
                    <li><strong>"more than"</strong> → +</li>
                    <li><strong>"less than"</strong> → -</li>
                    <li><strong>"of"</strong> → × (multiplication)</li>
                    <li><strong>"per"</strong> → ÷ (division)</li>
                </ul>
            </div>
            
            <div class="example-box">
                <p><strong>Problem:</strong> Sarah is 3 years older than twice her brother's age. If Sarah is 19, how old is her brother?</p>
                <p><strong>Solution:</strong></p>
                <p>Let b = brother's age</p>
                <p>Sarah's age = 2b + 3</p>
                <p>19 = 2b + 3</p>
                <p>16 = 2b</p>
                <p>b = 8 years old</p>
            </div>
            
            <div class="example-box">
                <p><strong>Problem:</strong> A car travels 240 miles in 4 hours. What is its average speed?</p>
                <p><strong>Solution:</strong></p>
                <p>Speed = Distance ÷ Time = 240 ÷ 4 = 60 mph</p>
            </div>
            
            <div class="key-takeaway">
                <h4>Key Takeaway</h4>
                <p>Take time to understand what the problem is asking. Define variables clearly and translate the words into mathematical relationships step by step!</p>
            </div>
        `
    },
    'inequalities': {
        title: 'Chapter 27: Inequalities',
        content: `
            <p class="lesson-intro">Inequalities express relationships where quantities are not equal. Understanding how to solve and graph inequalities will help you tackle range and boundary problems on the ACT.</p>
            
            <h3>Inequality Symbols</h3>
            <div class="concept-box">
                <h4>Four Types:</h4>
                <ul>
                    <li><strong>></strong> greater than</li>
                    <li><strong><</strong> less than</li>
                    <li><strong>≥</strong> greater than or equal to</li>
                    <li><strong>≤</strong> less than or equal to</li>
                </ul>
            </div>
            
            <h3>Solving Linear Inequalities</h3>
            <div class="rules-box">
                <h4>Key Rule:</h4>
                <p><strong>When multiplying or dividing by a negative number, flip the inequality sign!</strong></p>
            </div>
            
            <h3>Graphing Inequalities</h3>
            <div class="rules-box">
                <h4>On a coordinate plane:</h4>
                <ul>
                    <li><strong>< or ></strong> use dashed line</li>
                    <li><strong>≤ or ≥</strong> use solid line</li>
                    <li><strong>> or ≥</strong> shade above the line</li>
                    <li><strong>< or ≤</strong> shade below the line</li>
                </ul>
            </div>
            
            <h3>Systems of Inequalities</h3>
            <div class="concept-box">
                <h4>Solution:</h4>
                <p>The overlapping shaded region where all inequalities are satisfied</p>
            </div>
            
            <div class="example-box">
                <p><strong>Problem:</strong> Solve -3x + 6 > 12</p>
                <p><strong>Solution:</strong></p>
                <p>-3x + 6 > 12</p>
                <p>-3x > 6</p>
                <p>x < -2 (inequality flips when dividing by -3)</p>
            </div>
            
            <div class="example-box">
                <p><strong>Problem:</strong> Graph y ≤ 2x + 1</p>
                <p><strong>Solution:</strong></p>
                <p>Draw solid line y = 2x + 1</p>
                <p>Shade below the line (since y ≤)</p>
            </div>
            
            <div class="key-takeaway">
                <h4>Key Takeaway</h4>
                <p>Remember to flip the inequality sign when multiplying or dividing by negative numbers. Use solid vs. dashed lines correctly when graphing!</p>
            </div>
        `
    },
    'exponential-growth': {
        title: 'Chapter 28: Exponential Growth and Decay',
        content: `
            <p class="lesson-intro">Exponential functions model growth and decay in real-world situations. Understanding these formulas will help you solve compound interest, population, and radioactive decay problems.</p>
            
            <h3>Exponential Growth</h3>
            <div class="rules-box">
                <h4>Formula:</h4>
                <p><strong>A = P(1 + r)^t</strong></p>
                <ul>
                    <li>A = final amount</li>
                    <li>P = initial amount</li>
                    <li>r = growth rate (as decimal)</li>
                    <li>t = time</li>
                </ul>
            </div>
            
            <h3>Exponential Decay</h3>
            <div class="rules-box">
                <h4>Formula:</h4>
                <p><strong>A = P(1 - r)^t</strong></p>
                <p>Same variables, but r represents decay rate</p>
            </div>
            
            <h3>Compound Interest</h3>
            <div class="concept-box">
                <h4>Formula:</h4>
                <p><strong>A = P(1 + r/n)^(nt)</strong></p>
                <ul>
                    <li>n = number of times compounded per year</li>
                    <li>r = annual interest rate</li>
                    <li>t = time in years</li>
                </ul>
            </div>
            
            <h3>General Exponential Form</h3>
            <div class="rules-box">
                <h4>Form:</h4>
                <p><strong>y = ab^x</strong></p>
                <ul>
                    <li>a = y-intercept</li>
                    <li>b = base (growth factor)</li>
                    <li>If b > 1: growth</li>
                    <li>If 0 < b < 1: decay</li>
                </ul>
            </div>
            
            <div class="example-box">
                <p><strong>Problem:</strong> $1000 is invested at 5% annual interest, compounded annually. What is the amount after 3 years?</p>
                <p><strong>Solution:</strong></p>
                <p>A = 1000(1 + 0.05)³ = 1000(1.05)³ = 1000(1.157625) = $1157.63</p>
            </div>
            
            <div class="example-box">
                <p><strong>Problem:</strong> A population of 1000 decreases by 10% each year. What is the population after 2 years?</p>
                <p><strong>Solution:</strong></p>
                <p>A = 1000(1 - 0.10)² = 1000(0.90)² = 1000(0.81) = 810</p>
            </div>
            
            <div class="key-takeaway">
                <h4>Key Takeaway</h4>
                <p>Identify whether the problem involves growth or decay, then use the appropriate formula. Remember that the base determines the behavior!</p>
            </div>
        `
    },
    'unit-conversion': {
        title: 'Chapter 29: Unit Conversion',
        content: `
            <p class="lesson-intro">Unit conversion problems test your ability to change between different measurement systems. Understanding dimensional analysis will help you solve these systematically.</p>
            
            <h3>Basic Unit Conversion</h3>
            <div class="concept-box">
                <h4>Strategy:</h4>
                <p>Multiply by conversion factors equal to 1</p>
                <p><strong>Example:</strong> 1 foot = 12 inches, so 12 in/1 ft = 1</p>
            </div>
            
            <h3>Common Conversions</h3>
            <div class="rules-box">
                <h4>Length:</h4>
                <ul>
                    <li>1 foot = 12 inches</li>
                    <li>1 yard = 3 feet</li>
                    <li>1 mile = 5,280 feet</li>
                </ul>
                
                <h4>Time:</h4>
                <ul>
                    <li>1 minute = 60 seconds</li>
                    <li>1 hour = 60 minutes</li>
                    <li>1 day = 24 hours</li>
                </ul>
            </div>
            
            <h3>Dimensional Analysis</h3>
            <div class="rules-box">
                <h4>Multi-Step Process:</h4>
                <ol>
                    <li>Write the given measurement</li>
                    <li>Multiply by conversion factors</li>
                    <li>Cancel units that appear in both numerator and denominator</li>
                    <li>Calculate the result</li>
                </ol>
            </div>
            
            <div class="example-box">
                <p><strong>Problem:</strong> Convert 2.5 hours to seconds</p>
                <p><strong>Solution:</strong></p>
                <p>2.5 hours × (60 min/1 hour) × (60 sec/1 min) = 2.5 × 60 × 60 = 9,000 seconds</p>
            </div>
            
            <div class="example-box">
                <p><strong>Problem:</strong> A car travels at 60 mph. How many feet per second is this?</p>
                <p><strong>Solution:</strong></p>
                <p>60 mph × (5280 ft/1 mi) × (1 hr/3600 sec) = 60 × 5280/3600 = 88 ft/sec</p>
            </div>
            
            <div class="key-takeaway">
                <h4>Key Takeaway</h4>
                <p>Set up conversion factors so unwanted units cancel out. Work systematically and check that your final units are correct!</p>
            </div>
        `
    },
    'scientific-notation': {
        title: 'Chapter 30: Scientific Notation',
        content: `
            <p class="lesson-intro">Scientific notation is used to express very large or very small numbers efficiently. Understanding how to work with scientific notation will help you solve problems involving extreme values.</p>
            
            <h3>Standard Form</h3>
            <div class="rules-box">
                <h4>Format:</h4>
                <p><strong>a × 10^n</strong></p>
                <ul>
                    <li>1 ≤ a < 10</li>
                    <li>n is an integer</li>
                </ul>
            </div>
            
            <h3>Converting to Scientific Notation</h3>
            <div class="rules-box">
                <h4>Steps:</h4>
                <ol>
                    <li>Move decimal point to create a number between 1 and 10</li>
                    <li>Count the number of places moved</li>
                    <li>If moved left: positive exponent</li>
                    <li>If moved right: negative exponent</li>
                </ol>
            </div>
            
            <h3>Operations in Scientific Notation</h3>
            <div class="concept-box">
                <h4>Multiplication:</h4>
                <p>(a × 10^m) × (b × 10^n) = (a × b) × 10^(m+n)</p>
                
                <h4>Division:</h4>
                <p>(a × 10^m) ÷ (b × 10^n) = (a ÷ b) × 10^(m-n)</p>
            </div>
            
            <div class="example-box">
                <p><strong>Problem:</strong> Write 0.0000045 in scientific notation</p>
                <p><strong>Solution:</strong></p>
                <p>Move decimal 6 places right: 4.5 × 10^(-6)</p>
            </div>
            
            <div class="example-box">
                <p><strong>Problem:</strong> Write 3,400,000 in scientific notation</p>
                <p><strong>Solution:</strong></p>
                <p>Move decimal 6 places left: 3.4 × 10^6</p>
            </div>
            
            <div class="example-box">
                <p><strong>Problem:</strong> Multiply (2 × 10^3) × (3 × 10^5)</p>
                <p><strong>Solution:</strong></p>
                <p>(2 × 3) × 10^(3+5) = 6 × 10^8</p>
            </div>
            
            <div class="key-takeaway">
                <h4>Key Takeaway</h4>
                <p>Remember the direction rule: moving decimal left gives positive exponent, moving right gives negative exponent. Use exponent rules for operations!</p>
            </div>
        `
    },
    'arcs-sectors': {
        title: 'Chapter 31: Arcs and Sectors',
        content: `
            <p class="lesson-intro">Arc length and sector area problems involve portions of circles. Understanding the relationships between central angles, arc lengths, and sector areas will help you solve these geometry problems.</p>
            
            <h3>Arc Length</h3>
            <div class="rules-box">
                <h4>Formula:</h4>
                <p><strong>Arc length = (θ/360°) × 2πr</strong></p>
                <p>Or: <strong>s = rθ</strong> (when θ is in radians)</p>
                <ul>
                    <li>θ = central angle</li>
                    <li>r = radius</li>
                    <li>s = arc length</li>
                </ul>
            </div>
            
            <h3>Sector Area</h3>
            <div class="rules-box">
                <h4>Formula:</h4>
                <p><strong>Sector area = (θ/360°) × πr²</strong></p>
                <p>Or: <strong>A = (1/2)r²θ</strong> (when θ is in radians)</p>
            </div>
            
            <h3>Inscribed Angle Theorem</h3>
            <div class="concept-box">
                <h4>Key Rule:</h4>
                <p><strong>Inscribed angle = (1/2) × Central angle</strong></p>
                <p>An inscribed angle is half the central angle that subtends the same arc</p>
            </div>
            
            <div class="example-box">
                <p><strong>Problem:</strong> Find the arc length of a circle with radius 6 and central angle 60°</p>
                <p><strong>Solution:</strong></p>
                <p>Arc length = (60°/360°) × 2π(6) = (1/6) × 12π = 2π</p>
            </div>
            
            <div class="example-box">
                <p><strong>Problem:</strong> Find the sector area of a circle with radius 4 and central angle 90°</p>
                <p><strong>Solution:</strong></p>
                <p>Sector area = (90°/360°) × π(4)² = (1/4) × 16π = 4π</p>
            </div>
            
            <div class="key-takeaway">
                <h4>Key Takeaway</h4>
                <p>Remember that arc length and sector area are proportional to the central angle. Use the fraction of the circle (θ/360°) as your multiplier!</p>
            </div>
        `
    },
    'vectors': {
        title: 'Chapter 32: Vectors',
        content: `
            <p class="lesson-intro">Vectors represent quantities with both magnitude and direction. Understanding vector operations and components will help you solve physics and geometry problems on the ACT.</p>
            
            <h3>Vector Notation</h3>
            <div class="concept-box">
                <h4>Two Forms:</h4>
                <p><strong>Component form:</strong> <a, b></p>
                <p><strong>Unit vector form:</strong> ai + bj</p>
                <p>Both represent the same vector</p>
            </div>
            
            <h3>Vector Addition and Subtraction</h3>
            <div class="rules-box">
                <h4>Component-wise Operations:</h4>
                <p><strong>Addition:</strong> <a₁, b₁> + <a₂, b₂> = <a₁ + a₂, b₁ + b₂></p>
                <p><strong>Subtraction:</strong> <a₁, b₁> - <a₂, b₂> = <a₁ - a₂, b₁ - b₂></p>
            </div>
            
            <h3>Vector Magnitude</h3>
            <div class="rules-box">
                <h4>Formula:</h4>
                <p><strong>|v| = √(a² + b²)</strong></p>
                <p>For vector v = <a, b></p>
            </div>
            
            <h3>Tip-to-Tail Method</h3>
            <div class="concept-box">
                <h4>Graphical Addition:</h4>
                <ol>
                    <li>Draw first vector from origin</li>
                    <li>Draw second vector starting from tip of first</li>
                    <li>Resultant vector goes from origin to final tip</li>
                </ol>
            </div>
            
            <div class="example-box">
                <p><strong>Problem:</strong> Add vectors u = <3, 4> and v = <1, -2></p>
                <p><strong>Solution:</strong></p>
                <p>u + v = <3 + 1, 4 + (-2)> = <4, 2></p>
            </div>
            
            <div class="example-box">
                <p><strong>Problem:</strong> Find the magnitude of vector w = <5, 12></p>
                <p><strong>Solution:</strong></p>
                <p>|w| = √(5² + 12²) = √(25 + 144) = √169 = 13</p>
            </div>
            
            <div class="key-takeaway">
                <h4>Key Takeaway</h4>
                <p>Vectors combine component-wise for addition and subtraction. Use the Pythagorean theorem to find magnitude!</p>
            </div>
        `
    },
    'transforming-functions': {
        title: 'Chapter 33: Shifting and Transforming Functions',
        content: `
            <p class="lesson-intro">Function transformations show how graphs change when we modify the function equation. Understanding these patterns will help you predict and sketch transformed graphs.</p>
            
            <h3>Basic Transformations</h3>
            <div class="rules-box">
                <h4>For function f(x):</h4>
                <ul>
                    <li><strong>f(x) + k:</strong> shift up k units</li>
                    <li><strong>f(x) - k:</strong> shift down k units</li>
                    <li><strong>f(x + h):</strong> shift left h units</li>
                    <li><strong>f(x - h):</strong> shift right h units</li>
                    <li><strong>af(x):</strong> vertical stretch by factor a</li>
                    <li><strong>f(bx):</strong> horizontal compression by factor 1/b</li>
                    <li><strong>-f(x):</strong> reflect over x-axis</li>
                    <li><strong>f(-x):</strong> reflect over y-axis</li>
                </ul>
            </div>
            
            <h3>Combined Transformations</h3>
            <div class="concept-box">
                <h4>General Form:</h4>
                <p><strong>y = a·f(b(x - h)) + k</strong></p>
                <ul>
                    <li>a: vertical stretch/compression</li>
                    <li>b: horizontal stretch/compression</li>
                    <li>h: horizontal shift</li>
                    <li>k: vertical shift</li>
                </ul>
            </div>
            
            <div class="example-box">
                <p><strong>Problem:</strong> Describe the transformation of y = 2(x - 3)² + 1 compared to y = x²</p>
                <p><strong>Solution:</strong></p>
                <p>• Shift right 3 units (x - 3)</p>
                <p>• Vertical stretch by factor 2</p>
                <p>• Shift up 1 unit</p>
            </div>
            
            <div class="key-takeaway">
                <h4>Key Takeaway</h4>
                <p>Remember: inside the function affects x-direction, outside affects y-direction. Positive h moves right, positive k moves up!</p>
            </div>
        `
    },
    'statistics-advanced': {
        title: 'Chapter 34: Statistics',
        content: `
            <p class="lesson-intro">Advanced statistics topics include standard deviation, distributions, and data analysis. Understanding these concepts will help you interpret and analyze data sets effectively.</p>
            
            <h3>Standard Deviation</h3>
            <div class="concept-box">
                <h4>Meaning:</h4>
                <p>Measures how spread out data points are from the mean</p>
                <ul>
                    <li><strong>Small standard deviation:</strong> data clustered near mean</li>
                    <li><strong>Large standard deviation:</strong> data spread far from mean</li>
                </ul>
            </div>
            
            <h3>Normal Distribution</h3>
            <div class="rules-box">
                <h4>Empirical Rule (68-95-99.7 Rule):</h4>
                <ul>
                    <li><strong>68%</strong> of data within 1 standard deviation</li>
                    <li><strong>95%</strong> of data within 2 standard deviations</li>
                    <li><strong>99.7%</strong> of data within 3 standard deviations</li>
                </ul>
            </div>
            
            <h3>Types of Distributions</h3>
            <div class="concept-box">
                <h4>Shapes:</h4>
                <ul>
                    <li><strong>Normal:</strong> bell-shaped, symmetric</li>
                    <li><strong>Skewed right:</strong> tail extends to the right</li>
                    <li><strong>Skewed left:</strong> tail extends to the left</li>
                    <li><strong>Uniform:</strong> roughly equal frequencies</li>
                </ul>
            </div>
            
            <h3>Box and Whisker Plots</h3>
            <div class="rules-box">
                <h4>Five Number Summary:</h4>
                <ol>
                    <li>Minimum</li>
                    <li>First Quartile (Q1)</li>
                    <li>Median (Q2)</li>
                    <li>Third Quartile (Q3)</li>
                    <li>Maximum</li>
                </ol>
            </div>
            
            <div class="key-takeaway">
                <h4>Key Takeaway</h4>
                <p>Focus on interpreting what statistics tell you about data sets. The empirical rule is especially important for normal distributions!</p>
            </div>
        `
    },
    'miscellaneous-topics': {
        title: 'Chapter 35: Miscellaneous Topics',
        content: `
            <p class="lesson-intro">This chapter covers various advanced topics that appear occasionally on the ACT. Understanding these concepts will help you tackle the most challenging problems.</p>
            
            <h3>Venn Diagrams</h3>
            <div class="concept-box">
                <h4>Purpose:</h4>
                <p>Show relationships between sets using overlapping circles</p>
                <p>Use for problems involving "both," "either," "neither"</p>
            </div>
            
            <h3>Logic</h3>
            <div class="rules-box">
                <h4>Contrapositive Rule:</h4>
                <p>If "If p, then q" is true, then "If not q, then not p" is also true</p>
            </div>
            
            <h3>Pascal's Triangle</h3>
            <div class="concept-box">
                <h4>Pattern:</h4>
                <p>Each number is the sum of the two numbers above it</p>
                <p>Row n gives coefficients for (a + b)ⁿ</p>
            </div>
            
            <h3>Asymptotes</h3>
            <div class="rules-box">
                <h4>Vertical Asymptotes:</h4>
                <p>Occur when denominator equals zero (and numerator doesn't)</p>
                
                <h4>Horizontal Asymptotes:</h4>
                <ul>
                    <li>Degree of denominator > numerator: y = 0</li>
                    <li>Degrees equal: y = ratio of leading coefficients</li>
                    <li>Degree of numerator > denominator: no horizontal asymptote</li>
                </ul>
            </div>
            
            <h3>Made-Up Math</h3>
            <div class="tip-box">
                <h4>Strategy:</h4>
                <p>When ACT creates new operations or symbols, follow the given definition exactly and apply it step-by-step</p>
            </div>
            
            <div class="example-box">
                <p><strong>Problem:</strong> If a * b = 2a + 3b, find 4 * 5</p>
                <p><strong>Solution:</strong> 4 * 5 = 2(4) + 3(5) = 8 + 15 = 23</p>
            </div>
            
            <div class="key-takeaway">
                <h4>Key Takeaway</h4>
                <p>These topics appear infrequently but can be worth points for high-scoring students. Focus on understanding the underlying patterns and logic!</p>
            </div>
        `
    }
};


// Math lessons are now available as window.mathLessons