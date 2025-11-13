const { createClient } = require('@supabase/supabase-js');
require('dotenv').config();

const supabase = createClient(process.env.REACT_APP_SUPABASE_URL, process.env.SUPABASE_SERVICE_ROLE_KEY);

const mathFundamentalsContent = `<!--
LESSON TEMPLATE v4.0
Subject: Math
Topic: Math Section Overview & Strategy
Lesson Key: introduction-to-act-math
-->

<!-- ========================================
     SECTION 1: OPENING (2 SENTENCES MAX)
     CRITICAL: Must have:
     - MAXIMUM 2 sentences
     - ACT context (# of questions or %)
     - NO blue underlined terms here
     ======================================== -->

<p style="font-size: 16px; line-height: 1.7; margin: 0.5rem 0 1rem 0;">
The ACT Math section consists of 60 questions in 60 minutes, testing pre-algebra, algebra, geometry, trigonometry, and basic statistics. Understanding the test format, scoring system, and strategic approaches is essential before diving into specific math content.
</p>

<!-- ========================================
     SECTION 2: CONTENT (EXACTLY 4 H3 SECTIONS)
     Each H3 = Major Concept
     Use BULLET POINTS with indents, NOT paragraphs
     ======================================== -->

<h3 style="margin-top: 5rem; margin-bottom: 0.75rem; font-weight: 700;">
1. Test Format and Content Areas
</h3>

<h4 style="margin-top: 2rem; margin-bottom: 0.3rem; font-weight: 600;">
Section Overview
</h4>

<ul style="margin: 0.5rem 0 1rem 0; padding-left: 1.5rem; line-height: 1.7;">
  <li style="margin: 0.3rem 0;"><strong style="color: #2563eb; font-weight: 600; text-decoration: underline;">60 questions</strong> in 60 minutes = exactly 1 minute per question
    <ul style="margin: 0.3rem 0; padding-left: 1.5rem;">
      <li style="margin: 0.2rem 0;">Questions progress from easiest to hardest (roughly)</li>
      <li style="margin: 0.2rem 0;">All questions are worth the same—1 point each</li>
      <li style="margin: 0.2rem 0;">Calculator is permitted for the entire section</li>
    </ul>
  </li>
</ul>

<h4 style="margin-top: 2rem; margin-bottom: 0.3rem; font-weight: 600;">
Content Distribution
</h4>

<ul style="margin: 0.5rem 0 1rem 0; padding-left: 1.5rem; line-height: 1.7;">
  <li style="margin: 0.3rem 0;"><strong style="color: #2563eb; font-weight: 600; text-decoration: underline;">Pre-Algebra</strong> (20-25%): 12-15 questions
    <ul style="margin: 0.3rem 0; padding-left: 1.5rem;">
      <li style="margin: 0.2rem 0;">Operations with integers, fractions, decimals, and percentages</li>
      <li style="margin: 0.2rem 0;">Factors, multiples, primes, absolute value, square roots</li>
      <li style="margin: 0.2rem 0;">Ratios, proportions, and percent problems</li>
      <li style="margin: 0.2rem 0;">Linear inequalities and simple probability</li>
    </ul>
  </li>
  <li style="margin: 0.3rem 0;"><strong style="color: #2563eb; font-weight: 600; text-decoration: underline;">Elementary Algebra</strong> (15-20%): 9-12 questions
    <ul style="margin: 0.3rem 0; padding-left: 1.5rem;">
      <li style="margin: 0.2rem 0;">Properties of exponents and square roots</li>
      <li style="margin: 0.2rem 0;">Solving linear equations and inequalities</li>
      <li style="margin: 0.2rem 0;">Substitution and evaluating algebraic expressions</li>
      <li style="margin: 0.2rem 0;">Factoring simple quadratic expressions</li>
    </ul>
  </li>
  <li style="margin: 0.3rem 0;"><strong style="color: #2563eb; font-weight: 600; text-decoration: underline;">Intermediate Algebra</strong> (15-20%): 9-12 questions
    <ul style="margin: 0.3rem 0; padding-left: 1.5rem;">
      <li style="margin: 0.2rem 0;">Quadratic formula and completing the square</li>
      <li style="margin: 0.2rem 0;">Systems of equations and inequalities</li>
      <li style="margin: 0.2rem 0;">Functions, domain, range, and function notation</li>
      <li style="margin: 0.2rem 0;">Matrices, sequences, exponential growth</li>
      <li style="margin: 0.2rem 0;">Complex numbers and logarithms</li>
    </ul>
  </li>
  <li style="margin: 0.3rem 0;"><strong style="color: #2563eb; font-weight: 600; text-decoration: underline;">Coordinate Geometry</strong> (15-20%): 9-12 questions
    <ul style="margin: 0.3rem 0; padding-left: 1.5rem;">
      <li style="margin: 0.2rem 0;">Graphing points and equations on the coordinate plane</li>
      <li style="margin: 0.2rem 0;">Slope, distance, and midpoint formulas</li>
      <li style="margin: 0.2rem 0;">Equations of lines and circles</li>
      <li style="margin: 0.2rem 0;">Transformations and conic sections</li>
    </ul>
  </li>
  <li style="margin: 0.3rem 0;"><strong style="color: #2563eb; font-weight: 600; text-decoration: underline;">Plane Geometry</strong> (20-25%): 12-15 questions
    <ul style="margin: 0.3rem 0; padding-left: 1.5rem;">
      <li style="margin: 0.2rem 0;">Properties of angles, parallel lines, and perpendicular lines</li>
      <li style="margin: 0.2rem 0;">Properties of triangles, including right triangles</li>
      <li style="margin: 0.2rem 0;">Polygons, circles, perimeter, area, and volume</li>
      <li style="margin: 0.2rem 0;">Transformations and similarity</li>
    </ul>
  </li>
  <li style="margin: 0.3rem 0;"><strong style="color: #2563eb; font-weight: 600; text-decoration: underline;">Trigonometry</strong> (5-10%): 3-6 questions
    <ul style="margin: 0.3rem 0; padding-left: 1.5rem;">
      <li style="margin: 0.2rem 0;">Right triangle trigonometry (SOH-CAH-TOA)</li>
      <li style="margin: 0.2rem 0;">Trigonometric values and identities</li>
      <li style="margin: 0.2rem 0;">Graphing trigonometric functions</li>
    </ul>
  </li>
</ul>

<h3 style="margin-top: 5rem; margin-bottom: 0.75rem; font-weight: 700;">
2. Key Strategies for Success
</h3>

<h4 style="margin-top: 2rem; margin-bottom: 0.3rem; font-weight: 600;">
Time Management
</h4>

<ul style="margin: 0.5rem 0 1rem 0; padding-left: 1.5rem; line-height: 1.7;">
  <li style="margin: 0.3rem 0;">Work at a pace of <strong style="color: #2563eb; font-weight: 600; text-decoration: underline;">1 minute per question</strong> to leave time for review
    <ul style="margin: 0.3rem 0; padding-left: 1.5rem;">
      <li style="margin: 0.2rem 0;">Answer the first 40 questions in 40 minutes (easier questions)</li>
      <li style="margin: 0.2rem 0;">Spend remaining 20 minutes on last 20 questions and review</li>
      <li style="margin: 0.2rem 0;">Don't spend more than 90 seconds on any single question</li>
    </ul>
  </li>
  <li style="margin: 0.3rem 0;">Skip difficult questions and return to them later
    <ul style="margin: 0.3rem 0; padding-left: 1.5rem;">
      <li style="margin: 0.2rem 0;">Circle skipped questions in your test booklet</li>
      <li style="margin: 0.2rem 0;">Bubble in your best guess before moving on (no penalty for wrong answers)</li>
      <li style="margin: 0.2rem 0;">Return to skipped questions if time permits</li>
    </ul>
  </li>
</ul>

<h4 style="margin: 0rem; margin-bottom: 0.3rem; font-weight: 600;">
Calculator Strategy
</h4>

<ul style="margin: 0.5rem 0 1rem 0; padding-left: 1.5rem; line-height: 1.7;">
  <li style="margin: 0.3rem 0;">Bring a <strong style="color: #2563eb; font-weight: 600; text-decoration: underline;">calculator you're familiar with</strong>
    <ul style="margin: 0.3rem 0; padding-left: 1.5rem;">
      <li style="margin: 0.2rem 0;">Graphing calculators are allowed (TI-84, TI-Nspire CX)</li>
      <li style="margin: 0.2rem 0;">Scientific calculators work fine for most problems</li>
      <li style="margin: 0.2rem 0;">No smartphone calculators or devices with internet</li>
    </ul>
  </li>
  <li style="margin: 0.3rem 0;">Use your calculator strategically, not automatically
    <ul style="margin: 0.3rem 0; padding-left: 1.5rem;">
      <li style="margin: 0.2rem 0;">Some questions are faster to solve without a calculator</li>
      <li style="margin: 0.2rem 0;">Use it for complex arithmetic and checking your work</li>
      <li style="margin: 0.2rem 0;">Graph functions when working with equations</li>
    </ul>
  </li>
</ul>

<h4 style="margin: 2rem 0 0.3rem 0; font-weight: 600;">
Answer-Choice Strategies
</h4>

<ul style="margin: 0.5rem 0 1rem 0; padding-left: 1.5rem; line-height: 1.7;">
  <li style="margin: 0.3rem 0;"><strong style="color: #2563eb; font-weight: 600; text-decoration: underline;">Backsolving</strong>: Plug answer choices into the problem
    <ul style="margin: 0.3rem 0; padding-left: 1.5rem;">
      <li style="margin: 0.2rem 0;">Start with choice C (middle value) first</li>
      <li style="margin: 0.2rem 0;">Particularly useful for word problems and complex equations</li>
      <li style="margin: 0.2rem 0;">If C is too large, try A; if too small, try E</li>
    </ul>
  </li>
  <li style="margin: 0.3rem 0;"><strong style="color: #2563eb; font-weight: 600; text-decoration: underline;">Plugging in numbers</strong>: Use real numbers for variables
    <ul style="margin: 0.3rem 0; padding-left: 1.5rem;">
      <li style="margin: 0.2rem 0;">Choose simple numbers like 2, 3, or 10</li>
      <li style="margin: 0.2rem 0;">Avoid 0, 1, or numbers that appear in the problem</li>
      <li style="margin: 0.2rem 0;">Test each answer choice with your chosen numbers</li>
    </ul>
  </li>
  <li style="margin: 0.3rem 0;">Eliminate impossible answers immediately
    <ul style="margin: 0.3rem 0; padding-left: 1.5rem;">
      <li style="margin: 0.2rem 0;">Cross out choices that are clearly wrong (negative when positive expected)</li>
      <li style="margin: 0.2rem 0;">Check units (answer in feet vs. inches)</li>
      <li style="margin: 0.2rem 0;">Use estimation to eliminate unreasonable values</li>
    </ul>
  </li>
</ul>

<h3 style="margin-top: 5rem; margin-bottom: 0.75rem; font-weight: 700;">
3. Essential Test-Taking Tips
</h3>

<h4 style="margin-top: 2rem; margin-bottom: 0.3rem; font-weight: 600;">
Read Carefully and Underline Key Information
</h4>

<ul style="margin: 0.5rem 0 1rem 0; padding-left: 1.5rem; line-height: 1.7;">
  <li style="margin: 0.3rem 0;">Math questions often contain crucial details buried in the text
    <ul style="margin: 0.3rem 0; padding-left: 1.5rem;">
      <li style="margin: 0.2rem 0;">Underline what the question is asking for (perimeter vs. area, x vs. y)</li>
      <li style="margin: 0.2rem 0;">Circle given values and units</li>
      <li style="margin: 0.2rem 0;">Watch for words like "NOT," "EXCEPT," "closest," and "approximately"</li>
    </ul>
  </li>
</ul>

<h4 style="margin-top: 2rem; margin-bottom: 0.3rem; font-weight: 600;">
Draw Diagrams and Write Things Down
</h4>

<ul style="margin: 0.5rem 0 1rem 0; padding-left: 1.5rem; line-height: 1.7;">
  <li style="margin: 0.3rem 0;">Visual representations help solve problems faster
    <ul style="margin: 0.3rem 0; padding-left: 1.5rem;">
      <li style="margin: 0.2rem 0;">Sketch figures for geometry problems, even if one is provided</li>
      <li style="margin: 0.2rem 0;">Label diagrams with given information</li>
      <li style="margin: 0.2rem 0;">Write out multi-step solutions to avoid mental math errors</li>
    </ul>
  </li>
</ul>

<h4 style="margin-top: 2rem; margin-bottom: 0.3rem; font-weight: 600;">
Check Your Work Strategically
</h4>

<ul style="margin: 0.5rem 0 1rem 0; padding-left: 1.5rem; line-height: 1.7;">
  <li style="margin: 0.3rem 0;">Verify your answer makes sense in context
    <ul style="margin: 0.3rem 0; padding-left: 1.5rem;">
      <li style="margin: 0.2rem 0;">If solving for age, can't be negative or 500 years old</li>
      <li style="margin: 0.2rem 0;">If solving for area, answer must be positive</li>
      <li style="margin: 0.2rem 0;">Plug your answer back into the original equation when possible</li>
    </ul>
  </li>
  <li style="margin: 0.3rem 0;">Common mistakes to watch for
    <ul style="margin: 0.3rem 0; padding-left: 1.5rem;">
      <li style="margin: 0.2rem 0;">Solving for x when the question asks for 2x or x + 5</li>
      <li style="margin: 0.2rem 0;">Mixing up radius and diameter</li>
      <li style="margin: 0.2rem 0;">Calculator entry errors (parentheses, order of operations)</li>
    </ul>
  </li>
</ul>

<h4 style="margin-top: 2rem; margin-bottom: 0.3rem; font-weight: 600;">
Never Leave Questions Blank
</h4>

<ul style="margin: 0.5rem 0 1rem 0; padding-left: 1.5rem; line-height: 1.7;">
  <li style="margin: 0.3rem 0;">There is <strong style="color: #2563eb; font-weight: 600; text-decoration: underline;">no penalty</strong> for wrong answers on the ACT
    <ul style="margin: 0.3rem 0; padding-left: 1.5rem;">
      <li style="margin: 0.2rem 0;">Guess on every question, even if you have no idea</li>
      <li style="margin: 0.2rem 0;">With 5 answer choices, you have a 20% chance of guessing correctly</li>
      <li style="margin: 0.2rem 0;">Strategic guessing after eliminating 1-2 choices improves your odds</li>
    </ul>
  </li>
</ul>

<h3 style="margin-top: 5rem; margin-bottom: 0.75rem; font-weight: 700;">
4. Formulas and What to Memorize
</h3>

<h4 style="margin-top: 2rem; margin-bottom: 0.3rem; font-weight: 600;">
Formulas NOT Provided on the Test
</h4>

<ul style="margin: 0.5rem 0 1rem 0; padding-left: 1.5rem; line-height: 1.7;">
  <li style="margin: 0.3rem 0;"><strong style="color: #2563eb; font-weight: 600; text-decoration: underline;">Area and Perimeter</strong>
    <ul style="margin: 0.3rem 0; padding-left: 1.5rem;">
      <li style="margin: 0.2rem 0;">Rectangle: Area = length × width, Perimeter = 2(length + width)</li>
      <li style="margin: 0.2rem 0;">Triangle: Area = ½ × base × height</li>
      <li style="margin: 0.2rem 0;">Circle: Area = πr², Circumference = 2πr</li>
      <li style="margin: 0.2rem 0;">Trapezoid: Area = ½(base₁ + base₂) × height</li>
    </ul>
  </li>
  <li style="margin: 0.3rem 0;"><strong style="color: #2563eb; font-weight: 600; text-decoration: underline;">Volume</strong>
    <ul style="margin: 0.3rem 0; padding-left: 1.5rem;">
      <li style="margin: 0.2rem 0;">Rectangular prism: V = length × width × height</li>
      <li style="margin: 0.2rem 0;">Cylinder: V = πr²h</li>
      <li style="margin: 0.2rem 0;">Sphere: V = (4/3)πr³</li>
      <li style="margin: 0.2rem 0;">Cone: V = (1/3)πr²h</li>
    </ul>
  </li>
  <li style="margin: 0.3rem 0;"><strong style="color: #2563eb; font-weight: 600; text-decoration: underline;">Coordinate Geometry</strong>
    <ul style="margin: 0.3rem 0; padding-left: 1.5rem;">
      <li style="margin: 0.2rem 0;">Slope: m = (y₂ - y₁)/(x₂ - x₁)</li>
      <li style="margin: 0.2rem 0;">Distance: d = √[(x₂ - x₁)² + (y₂ - y₁)²]</li>
      <li style="margin: 0.2rem 0;">Midpoint: ((x₁ + x₂)/2, (y₁ + y₂)/2)</li>
    </ul>
  </li>
  <li style="margin: 0.3rem 0;"><strong style="color: #2563eb; font-weight: 600; text-decoration: underline;">Algebra</strong>
    <ul style="margin: 0.3rem 0; padding-left: 1.5rem;">
      <li style="margin: 0.2rem 0;">Quadratic formula: x = [-b ± √(b² - 4ac)] / (2a)</li>
      <li style="margin: 0.2rem 0;">Difference of squares: a² - b² = (a + b)(a - b)</li>
      <li style="margin: 0.2rem 0;">Perfect square: (a ± b)² = a² ± 2ab + b²</li>
    </ul>
  </li>
  <li style="margin: 0.3rem 0;"><strong style="color: #2563eb; font-weight: 600; text-decoration: underline;">Triangles</strong>
    <ul style="margin: 0.3rem 0; padding-left: 1.5rem;">
      <li style="margin: 0.2rem 0;">Pythagorean theorem: a² + b² = c²</li>
      <li style="margin: 0.2rem 0;">Special right triangles: 30-60-90 (sides: x, x√3, 2x) and 45-45-90 (sides: x, x, x√2)</li>
      <li style="margin: 0.2rem 0;">Sum of interior angles = 180°</li>
    </ul>
  </li>
  <li style="margin: 0.3rem 0;"><strong style="color: #2563eb; font-weight: 600; text-decoration: underline;">Trigonometry</strong>
    <ul style="margin: 0.3rem 0; padding-left: 1.5rem;">
      <li style="margin: 0.2rem 0;">SOH-CAH-TOA: sin = opposite/hypotenuse, cos = adjacent/hypotenuse, tan = opposite/adjacent</li>
      <li style="margin: 0.2rem 0;">Reciprocal functions: csc = 1/sin, sec = 1/cos, cot = 1/tan</li>
    </ul>
  </li>
</ul>

<h4 style="margin-top: 2rem; margin-bottom: 0.3rem; font-weight: 600;">
Key Math Facts to Remember
</h4>

<ul style="margin: 0.5rem 0 1rem 0; padding-left: 1.5rem; line-height: 1.7;">
  <li style="margin: 0.3rem 0;">Sum of angles in a polygon: (n - 2) × 180° where n = number of sides</li>
  <li style="margin: 0.3rem 0;">Arc length: (angle/360°) × 2πr</li>
  <li style="margin: 0.3rem 0;">Sector area: (angle/360°) × πr²</li>
  <li style="margin: 0.3rem 0;">Slope-intercept form: y = mx + b</li>
  <li style="margin: 0.3rem 0;">Point-slope form: y - y₁ = m(x - x₁)</li>
</ul>
</body></html>`;

async function createMathFundamentals() {
  console.log('Creating Math Section Overview & Strategy lesson...\n');

  // First, check if it exists
  const { data: existing } = await supabase
    .from('lessons')
    .select('id')
    .eq('lesson_key', 'introduction-to-act-math')
    .single();

  let result;
  if (existing) {
    // Update existing
    result = await supabase
      .from('lessons')
      .update({
        subject: 'math',
        title: 'Math Section Overview & Strategy',
        content: mathFundamentalsContent,
        duration: '35 min',
        updated_at: new Date().toISOString()
      })
      .eq('lesson_key', 'introduction-to-act-math')
      .select();
  } else {
    // Insert new
    result = await supabase
      .from('lessons')
      .insert({
        subject: 'math',
        lesson_key: 'introduction-to-act-math',
        title: 'Math Section Overview & Strategy',
        content: mathFundamentalsContent,
        duration: '35 min',
        updated_at: new Date().toISOString()
      })
      .select();
  }

  if (result.error) {
    console.error('❌ Error:', result.error.message);
  } else {
    console.log('✅ Successfully created Math Section Overview & Strategy');
    console.log('   Duration: 35 min');
    console.log('   Content length:', mathFundamentalsContent.length, 'chars');
  }
}

createMathFundamentals();
