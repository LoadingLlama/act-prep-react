const { createClient } = require('@supabase/supabase-js');
require('dotenv').config();

const supabaseUrl = process.env.REACT_APP_SUPABASE_URL;
const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY;
const supabase = createClient(supabaseUrl, supabaseKey);

// Lesson content for all 30 lessons
const lessons = {
  // CHAPTER 2: GEOMETRY
  'geometry-shapes': {
    title: 'Geometry: Shapes & Triangles',
    content: `<div class="lesson-content">
  <p class="lesson-intro">The ACT frequently tests geometry concepts including areas, volumes, and special triangles. This lesson covers essential formulas for shapes and the critical triangle rules you'll need, including the Pythagorean theorem and special right triangles (30-60-90 and 45-45-90).</p>

  <h3>Areas and Perimeters</h3>

  <p>You must memorize these fundamental area and perimeter formulas:</p>

  <p><strong>Rectangle:</strong> Area = lw, Perimeter = 2l + 2w</p>
  <p><strong>Square:</strong> Area = s², Perimeter = 4s</p>
  <p><strong>Triangle:</strong> Area = ½bh</p>
  <p><strong>Circle:</strong> Area = πr², Circumference = 2πr</p>
  <p><strong>Trapezoid:</strong> Area = ½(b₁ + b₂)h</p>

  <h3>Volumes</h3>

  <p><strong>Rectangular Prism:</strong> V = lwh</p>
  <p><strong>Cube:</strong> V = s³</p>
  <p><strong>Cylinder:</strong> V = πr²h</p>
  <p><strong>General Formula:</strong> V = Bh (where B is the area of the base)</p>

  <h3>Example Problems</h3>

  <h4>Example 1</h4>

  <p style="margin: 1.5rem 0 0.5rem 0; padding-left: 1rem; border-left: 3px solid #4CAF50;"><strong>Problem:</strong></p>
  <p style="margin: 0 0 0.5rem 0; padding-left: 1rem; font-size: 1.05rem;">A rectangular garden has a length of 12 feet and a width of 8 feet. If a square patio with the same area is built, what is the side length of the square patio in feet?</p>
  <p style="margin: 0 0 2rem 0; padding-left: 1rem; line-height: 1.8; font-size: 1.05rem;">A. 9<br>B. <span style="display: inline-block; position: relative; padding-top: 2px;">√<span style="border-top: 1.5px solid currentColor; padding: 0 2px;">96</span></span><br>C. 10<br>D. 20</p>

  <p style="margin: 1.5rem 0 0.5rem 0; padding-left: 1rem; border-left: 3px solid #FF9800;"><strong>Solution:</strong></p>
  <p style="margin: 0 0 1rem 0; padding-left: 1rem; font-size: 1.05rem; line-height: 1.75;">First, find the area of the rectangular garden, then use that to find the side length of the square.</p>

  <div style="text-align: center; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', system-ui, sans-serif; font-size: 1.15rem; line-height: 2.5; margin: 1.5rem 0; padding: 1.5rem 0;">
    <div>Area of rectangle = lw = 12 × 8 = 96 square feet</div>
    <div>Area of square = s²</div>
    <div>96 = s²</div>
    <div>s = <span style="display: inline-block; position: relative; padding-top: 2px;">√<span style="border-top: 1.5px solid currentColor; padding: 0 2px;">96</span></span></div>
  </div>

  <p style="margin: 1.5rem 0 0 0; padding-left: 1rem; font-weight: 600; font-size: 1.05rem;">Answer: B</p>

  <h4>Example 2</h4>

  <p style="margin: 1.5rem 0 0.5rem 0; padding-left: 1rem; border-left: 3px solid #4CAF50;"><strong>Problem:</strong></p>
  <p style="margin: 0 0 0.5rem 0; padding-left: 1rem; font-size: 1.05rem;">A cylindrical water tank has a radius of 5 meters and a height of 8 meters. What is the volume of the tank in cubic meters?</p>
  <p style="margin: 0 0 2rem 0; padding-left: 1rem; line-height: 1.8; font-size: 1.05rem;">A. 40π<br>B. 80π<br>C. 200π<br>D. 400π</p>

  <p style="margin: 1.5rem 0 0.5rem 0; padding-left: 1rem; border-left: 3px solid #FF9800;"><strong>Solution:</strong></p>
  <p style="margin: 0 0 1rem 0; padding-left: 1rem; font-size: 1.05rem; line-height: 1.75;">Use the cylinder volume formula V = πr²h.</p>

  <div style="text-align: center; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', system-ui, sans-serif; font-size: 1.15rem; line-height: 2.5; margin: 1.5rem 0; padding: 1.5rem 0;">
    <div>V = πr²h</div>
    <div>V = π(5)²(8)</div>
    <div>V = π(25)(8)</div>
    <div style="color: #2e7d32; font-weight: 600;">V = 200π cubic meters</div>
  </div>

  <p style="margin: 1.5rem 0 0 0; padding-left: 1rem; font-weight: 600; font-size: 1.05rem;">Answer: C</p>

  <h3>The Pythagorean Theorem</h3>

  <p>For any right triangle with legs a and b and hypotenuse c: <strong>a² + b² = c²</strong></p>

  <p>Common Pythagorean triples to recognize: 3-4-5, 5-12-13, 8-15-17, and their multiples (6-8-10, 9-12-15, etc.).</p>

  <h3>Special Right Triangles</h3>

  <p><strong>45-45-90 Triangle:</strong> If the legs are x, the hypotenuse is x√2</p>
  <p><strong>30-60-90 Triangle:</strong> If the short leg is x, the long leg is x√3, and the hypotenuse is 2x</p>

  <h4>Example 3</h4>

  <p style="margin: 1.5rem 0 0.5rem 0; padding-left: 1rem; border-left: 3px solid #4CAF50;"><strong>Problem:</strong></p>
  <p style="margin: 0 0 0.5rem 0; padding-left: 1rem; font-size: 1.05rem;">In a 30-60-90 triangle, the hypotenuse is 20 inches. What is the length of the shortest side?</p>
  <p style="margin: 0 0 2rem 0; padding-left: 1rem; line-height: 1.8; font-size: 1.05rem;">A. 5<br>B. 10<br>C. 10√3<br>D. 20√3</p>

  <p style="margin: 1.5rem 0 0.5rem 0; padding-left: 1rem; border-left: 3px solid #FF9800;"><strong>Solution:</strong></p>
  <p style="margin: 0 0 1rem 0; padding-left: 1rem; font-size: 1.05rem; line-height: 1.75;">In a 30-60-90 triangle, the shortest side (opposite the 30° angle) is always half the hypotenuse.</p>

  <div style="text-align: center; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', system-ui, sans-serif; font-size: 1.15rem; line-height: 2.5; margin: 1.5rem 0; padding: 1.5rem 0;">
    <div>Hypotenuse = 2x = 20</div>
    <div>x = 10</div>
  </div>

  <p style="margin: 1.5rem 0 0 0; padding-left: 1rem; font-weight: 600; font-size: 1.05rem;">Answer: B</p>

  <div style="margin: 4rem 0 2rem 0; padding: 1.5rem; padding-left: 1.5rem; background: #f0f9ff !important; border-left: 4px solid #2196F3; border-radius: 4px;">
    <p style="margin: 0 0 0.5rem 0; font-weight: 600; color: #1565c0; font-size: 1.05rem;">💡 Key Takeaway</p>
    <p style="margin: 0; line-height: 1.7; font-size: 1.05rem;">Memorize the area and volume formulas along with the special right triangle ratios. These appear frequently on the ACT and are not provided on the test. Recognizing Pythagorean triples can save you valuable time!</p>
  </div>
</div>`
  },

  'lines': {
    title: 'Lines: Slope, Equations & Distance',
    content: `<div class="lesson-content">
  <p class="lesson-intro">Understanding lines is essential for ACT Math success. This lesson covers slope, various forms of line equations, midpoint, and distance formulas—all crucial concepts that appear regularly on the test.</p>

  <h3>Slope</h3>

  <p>The slope m of a line through points (x₁, y₁) and (x₂, y₂) is:</p>
  <p><strong>m = (y₂ − y₁)/(x₂ − x₁)</strong> or "rise over run"</p>

  <p>• Positive slope: line rises from left to right</p>
  <p>• Negative slope: line falls from left to right</p>
  <p>• Zero slope: horizontal line</p>
  <p>• Undefined slope: vertical line</p>

  <h3>Line Equations</h3>

  <p><strong>Slope-intercept form:</strong> y = mx + b (m is slope, b is y-intercept)</p>
  <p><strong>Point-slope form:</strong> y − y₁ = m(x − x₁)</p>
  <p><strong>Standard form:</strong> Ax + By = C</p>

  <h3>Example Problems</h3>

  <h4>Example 1</h4>

  <p style="margin: 1.5rem 0 0.5rem 0; padding-left: 1rem; border-left: 3px solid #4CAF50;"><strong>Problem:</strong></p>
  <p style="margin: 0 0 0.5rem 0; padding-left: 1rem; font-size: 1.05rem;">What is the slope of the line passing through the points (3, 7) and (−1, −5)?</p>
  <p style="margin: 0 0 2rem 0; padding-left: 1rem; line-height: 1.8; font-size: 1.05rem;">A. −3<br>B. −1/3<br>C. 1/3<br>D. 3</p>

  <p style="margin: 1.5rem 0 0.5rem 0; padding-left: 1rem; border-left: 3px solid #FF9800;"><strong>Solution:</strong></p>
  <p style="margin: 0 0 1rem 0; padding-left: 1rem; font-size: 1.05rem; line-height: 1.75;">Use the slope formula with the two given points.</p>

  <div style="text-align: center; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', system-ui, sans-serif; font-size: 1.15rem; line-height: 2.5; margin: 1.5rem 0; padding: 1.5rem 0;">
    <div>m = (y₂ − y₁)/(x₂ − x₁)</div>
    <div>m = (−5 − 7)/(−1 − 3)</div>
    <div>m = (−12)/(−4)</div>
    <div style="color: #2e7d32; font-weight: 600;">m = 3</div>
  </div>

  <p style="margin: 1.5rem 0 0 0; padding-left: 1rem; font-weight: 600; font-size: 1.05rem;">Answer: D</p>

  <h4>Example 2</h4>

  <p style="margin: 1.5rem 0 0.5rem 0; padding-left: 1rem; border-left: 3px solid #4CAF50;"><strong>Problem:</strong></p>
  <p style="margin: 0 0 0.5rem 0; padding-left: 1rem; font-size: 1.05rem;">Which equation represents a line with slope 2 passing through the point (4, 5)?</p>
  <p style="margin: 0 0 2rem 0; padding-left: 1rem; line-height: 1.8; font-size: 1.05rem;">A. y = 2x − 3<br>B. y = 2x + 5<br>C. y = 2x + 13<br>D. y = 4x + 5</p>

  <p style="margin: 1.5rem 0 0.5rem 0; padding-left: 1rem; border-left: 3px solid #FF9800;"><strong>Solution:</strong></p>
  <p style="margin: 0 0 1rem 0; padding-left: 1rem; font-size: 1.05rem; line-height: 1.75;">Use point-slope form, then convert to slope-intercept form. Or simply test each equation with the point (4, 5).</p>

  <div style="text-align: center; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', system-ui, sans-serif; font-size: 1.15rem; line-height: 2.5; margin: 1.5rem 0; padding: 1.5rem 0;">
    <div>Testing choice A: y = 2x − 3</div>
    <div>5 = 2(4) − 3</div>
    <div>5 = 8 − 3</div>
    <div style="color: #2e7d32; font-weight: 600;">5 = 5 ✓</div>
  </div>

  <p style="margin: 1.5rem 0 0 0; padding-left: 1rem; font-weight: 600; font-size: 1.05rem;">Answer: A</p>

  <h3>Midpoint and Distance</h3>

  <p><strong>Midpoint formula:</strong> M = ((x₁ + x₂)/2, (y₁ + y₂)/2)</p>
  <p><strong>Distance formula:</strong> d = <span style="display: inline-block; position: relative; padding-top: 2px;">√<span style="border-top: 1.5px solid currentColor; padding: 0 2px;">((x₂ − x₁)² + (y₂ − y₁)²)</span></span></p>

  <h4>Example 3</h4>

  <p style="margin: 1.5rem 0 0.5rem 0; padding-left: 1rem; border-left: 3px solid #4CAF50;"><strong>Problem:</strong></p>
  <p style="margin: 0 0 0.5rem 0; padding-left: 1rem; font-size: 1.05rem;">What is the distance between the points (2, 3) and (6, 6)?</p>
  <p style="margin: 0 0 2rem 0; padding-left: 1rem; line-height: 1.8; font-size: 1.05rem;">A. 3<br>B. 4<br>C. 5<br>D. 7</p>

  <p style="margin: 1.5rem 0 0.5rem 0; padding-left: 1rem; border-left: 3px solid #FF9800;"><strong>Solution:</strong></p>
  <p style="margin: 0 0 1rem 0; padding-left: 1rem; font-size: 1.05rem; line-height: 1.75;">Apply the distance formula.</p>

  <div style="text-align: center; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', system-ui, sans-serif; font-size: 1.15rem; line-height: 2.5; margin: 1.5rem 0; padding: 1.5rem 0;">
    <div>d = <span style="display: inline-block; position: relative; padding-top: 2px;">√<span style="border-top: 1.5px solid currentColor; padding: 0 2px;">((6 − 2)² + (6 − 3)²)</span></span></div>
    <div>d = <span style="display: inline-block; position: relative; padding-top: 2px;">√<span style="border-top: 1.5px solid currentColor; padding: 0 2px;">(4² + 3²)</span></span></div>
    <div>d = <span style="display: inline-block; position: relative; padding-top: 2px;">√<span style="border-top: 1.5px solid currentColor; padding: 0 2px;">(16 + 9)</span></span></div>
    <div>d = <span style="display: inline-block; position: relative; padding-top: 2px;">√<span style="border-top: 1.5px solid currentColor; padding: 0 2px;">25</span></span></div>
    <div style="color: #2e7d32; font-weight: 600;">d = 5</div>
  </div>

  <p style="margin: 1.5rem 0 0 0; padding-left: 1rem; font-weight: 600; font-size: 1.05rem;">Answer: C</p>

  <div style="margin: 4rem 0 2rem 0; padding: 1.5rem; padding-left: 1.5rem; background: #f0f9ff !important; border-left: 4px solid #2196F3; border-radius: 4px;">
    <p style="margin: 0 0 0.5rem 0; font-weight: 600; color: #1565c0; font-size: 1.05rem;">💡 Key Takeaway</p>
    <p style="margin: 0; line-height: 1.7; font-size: 1.05rem;">Master the slope formula and be comfortable converting between different forms of line equations. The midpoint and distance formulas are essential—memorize them! Remember: parallel lines have equal slopes, while perpendicular lines have slopes that are negative reciprocals.</p>
  </div>
</div>`
  },

  'arcs-sectors': {
    title: 'Arcs and Sectors',
    content: `<div class="lesson-content">
  <p class="lesson-intro">Arcs and sectors are portions of circles that appear frequently on the ACT. Understanding how to calculate arc length and sector area using central angles is a crucial skill for test success.</p>

  <h3>Key Definitions</h3>

  <p><strong>Arc:</strong> A portion of the circumference of a circle</p>
  <p><strong>Sector:</strong> A "slice" of a circle, like a piece of pie</p>
  <p><strong>Central Angle:</strong> An angle whose vertex is at the center of the circle</p>

  <h3>Arc Length Formula</h3>

  <p>Arc length = (θ/360°) × 2πr</p>
  <p>where θ is the central angle in degrees and r is the radius</p>

  <h3>Sector Area Formula</h3>

  <p>Sector area = (θ/360°) × πr²</p>
  <p>where θ is the central angle in degrees and r is the radius</p>

  <h3>Example Problems</h3>

  <h4>Example 1</h4>

  <p style="margin: 1.5rem 0 0.5rem 0; padding-left: 1rem; border-left: 3px solid #4CAF50;"><strong>Problem:</strong></p>
  <p style="margin: 0 0 0.5rem 0; padding-left: 1rem; font-size: 1.05rem;">A circle has a radius of 6 inches. What is the length of an arc with a central angle of 60°?</p>
  <p style="margin: 0 0 2rem 0; padding-left: 1rem; line-height: 1.8; font-size: 1.05rem;">A. π<br>B. 2π<br>C. 3π<br>D. 6π</p>

  <p style="margin: 1.5rem 0 0.5rem 0; padding-left: 1rem; border-left: 3px solid #FF9800;"><strong>Solution:</strong></p>
  <p style="margin: 0 0 1rem 0; padding-left: 1rem; font-size: 1.05rem; line-height: 1.75;">Use the arc length formula with θ = 60° and r = 6.</p>

  <div style="text-align: center; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', system-ui, sans-serif; font-size: 1.15rem; line-height: 2.5; margin: 1.5rem 0; padding: 1.5rem 0;">
    <div>Arc length = (θ/360°) × 2πr</div>
    <div>Arc length = (60°/360°) × 2π(6)</div>
    <div>Arc length = (1/6) × 12π</div>
    <div style="color: #2e7d32; font-weight: 600;">Arc length = 2π inches</div>
  </div>

  <p style="margin: 1.5rem 0 0 0; padding-left: 1rem; font-weight: 600; font-size: 1.05rem;">Answer: B</p>

  <h4>Example 2</h4>

  <p style="margin: 1.5rem 0 0.5rem 0; padding-left: 1rem; border-left: 3px solid #4CAF50;"><strong>Problem:</strong></p>
  <p style="margin: 0 0 0.5rem 0; padding-left: 1rem; font-size: 1.05rem;">A sector of a circle with radius 10 cm has a central angle of 72°. What is the area of the sector?</p>
  <p style="margin: 0 0 2rem 0; padding-left: 1rem; line-height: 1.8; font-size: 1.05rem;">A. 10π<br>B. 20π<br>C. 50π<br>D. 100π</p>

  <p style="margin: 1.5rem 0 0.5rem 0; padding-left: 1rem; border-left: 3px solid #FF9800;"><strong>Solution:</strong></p>
  <p style="margin: 0 0 1rem 0; padding-left: 1rem; font-size: 1.05rem; line-height: 1.75;">Use the sector area formula with θ = 72° and r = 10.</p>

  <div style="text-align: center; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', system-ui, sans-serif; font-size: 1.15rem; line-height: 2.5; margin: 1.5rem 0; padding: 1.5rem 0;">
    <div>Sector area = (θ/360°) × πr²</div>
    <div>Sector area = (72°/360°) × π(10)²</div>
    <div>Sector area = (1/5) × 100π</div>
    <div style="color: #2e7d32; font-weight: 600;">Sector area = 20π cm²</div>
  </div>

  <p style="margin: 1.5rem 0 0 0; padding-left: 1rem; font-weight: 600; font-size: 1.05rem;">Answer: B</p>

  <h4>Example 3</h4>

  <p style="margin: 1.5rem 0 0.5rem 0; padding-left: 1rem; border-left: 3px solid #4CAF50;"><strong>Problem:</strong></p>
  <p style="margin: 0 0 0.5rem 0; padding-left: 1rem; font-size: 1.05rem;">A pizza with a 14-inch diameter is cut into 8 equal slices. What is the central angle of each slice?</p>
  <p style="margin: 0 0 2rem 0; padding-left: 1rem; line-height: 1.8; font-size: 1.05rem;">A. 30°<br>B. 36°<br>C. 45°<br>D. 60°</p>

  <p style="margin: 1.5rem 0 0.5rem 0; padding-left: 1rem; border-left: 3px solid #FF9800;"><strong>Solution:</strong></p>
  <p style="margin: 0 0 1rem 0; padding-left: 1rem; font-size: 1.05rem; line-height: 1.75;">A full circle is 360°. Divide by the number of slices to find the central angle of each slice.</p>

  <div style="text-align: center; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', system-ui, sans-serif; font-size: 1.15rem; line-height: 2.5; margin: 1.5rem 0; padding: 1.5rem 0;">
    <div>Central angle per slice = 360° ÷ 8</div>
    <div style="color: #2e7d32; font-weight: 600;">Central angle = 45°</div>
  </div>

  <p style="margin: 1.5rem 0 0 0; padding-left: 1rem; font-weight: 600; font-size: 1.05rem;">Answer: C</p>

  <div style="margin: 4rem 0 2rem 0; padding: 1.5rem; padding-left: 1.5rem; background: #f0f9ff !important; border-left: 4px solid #2196F3; border-radius: 4px;">
    <p style="margin: 0 0 0.5rem 0; font-weight: 600; color: #1565c0; font-size: 1.05rem;">💡 Key Takeaway</p>
    <p style="margin: 0; line-height: 1.7; font-size: 1.05rem;">Arc length and sector area problems use similar formulas—both involve the fraction (θ/360°) of the full circle. For arc length, multiply by the circumference; for sector area, multiply by the total area. Remember to use the radius, not the diameter!</p>
  </div>
</div>`
  },

  'circles-ellipses': {
    title: 'Circles and Ellipses',
    content: `<div class="lesson-content">
  <p class="lesson-intro">Circles and ellipses are conic sections that appear on advanced ACT Math questions. This lesson covers the standard equations for circles and ellipses, as well as how to identify their key features.</p>

  <h3>Circle Equations</h3>

  <p><strong>Standard form:</strong> (x − h)² + (y − k)² = r²</p>
  <p>• Center: (h, k)</p>
  <p>• Radius: r</p>

  <p><strong>General form:</strong> x² + y² + Dx + Ey + F = 0</p>
  <p>(Complete the square to convert to standard form)</p>

  <h3>Ellipse Equations</h3>

  <p><strong>Standard form:</strong> (x − h)²/a² + (y − k)²/b² = 1</p>
  <p>• Center: (h, k)</p>
  <p>• If a > b: horizontal major axis with length 2a</p>
  <p>• If b > a: vertical major axis with length 2b</p>

  <h3>Example Problems</h3>

  <h4>Example 1</h4>

  <p style="margin: 1.5rem 0 0.5rem 0; padding-left: 1rem; border-left: 3px solid #4CAF50;"><strong>Problem:</strong></p>
  <p style="margin: 0 0 0.5rem 0; padding-left: 1rem; font-size: 1.05rem;">What is the radius of the circle with equation (x − 3)² + (y + 2)² = 25?</p>
  <p style="margin: 0 0 2rem 0; padding-left: 1rem; line-height: 1.8; font-size: 1.05rem;">A. 2<br>B. 3<br>C. 5<br>D. 25</p>

  <p style="margin: 1.5rem 0 0.5rem 0; padding-left: 1rem; border-left: 3px solid #FF9800;"><strong>Solution:</strong></p>
  <p style="margin: 0 0 1rem 0; padding-left: 1rem; font-size: 1.05rem; line-height: 1.75;">The equation is in standard form (x − h)² + (y − k)² = r². Compare to find r².</p>

  <div style="text-align: center; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', system-ui, sans-serif; font-size: 1.15rem; line-height: 2.5; margin: 1.5rem 0; padding: 1.5rem 0;">
    <div>(x − 3)² + (y + 2)² = 25</div>
    <div>r² = 25</div>
    <div style="color: #2e7d32; font-weight: 600;">r = 5</div>
  </div>

  <p style="margin: 1.5rem 0 0 0; padding-left: 1rem; font-weight: 600; font-size: 1.05rem;">Answer: C</p>

  <h4>Example 2</h4>

  <p style="margin: 1.5rem 0 0.5rem 0; padding-left: 1rem; border-left: 3px solid #4CAF50;"><strong>Problem:</strong></p>
  <p style="margin: 0 0 0.5rem 0; padding-left: 1rem; font-size: 1.05rem;">A circle has center (−1, 4) and passes through the point (3, 7). What is the equation of this circle?</p>
  <p style="margin: 0 0 2rem 0; padding-left: 1rem; line-height: 1.8; font-size: 1.05rem;">A. (x + 1)² + (y − 4)² = 5<br>B. (x + 1)² + (y − 4)² = 25<br>C. (x − 1)² + (y + 4)² = 25<br>D. (x + 1)² + (y − 4)² = 50</p>

  <p style="margin: 1.5rem 0 0.5rem 0; padding-left: 1rem; border-left: 3px solid #FF9800;"><strong>Solution:</strong></p>
  <p style="margin: 0 0 1rem 0; padding-left: 1rem; font-size: 1.05rem; line-height: 1.75;">Find the radius using the distance formula, then write the equation.</p>

  <div style="text-align: center; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', system-ui, sans-serif; font-size: 1.15rem; line-height: 2.5; margin: 1.5rem 0; padding: 1.5rem 0;">
    <div>r = <span style="display: inline-block; position: relative; padding-top: 2px;">√<span style="border-top: 1.5px solid currentColor; padding: 0 2px;">((3 − (−1))² + (7 − 4)²)</span></span></div>
    <div>r = <span style="display: inline-block; position: relative; padding-top: 2px;">√<span style="border-top: 1.5px solid currentColor; padding: 0 2px;">(16 + 9)</span></span> = <span style="display: inline-block; position: relative; padding-top: 2px;">√<span style="border-top: 1.5px solid currentColor; padding: 0 2px;">25</span></span> = 5</div>
    <div>r² = 25</div>
    <div style="color: #2e7d32; font-weight: 600;">(x + 1)² + (y − 4)² = 25</div>
  </div>

  <p style="margin: 1.5rem 0 0 0; padding-left: 1rem; font-weight: 600; font-size: 1.05rem;">Answer: B</p>

  <h4>Example 3</h4>

  <p style="margin: 1.5rem 0 0.5rem 0; padding-left: 1rem; border-left: 3px solid #4CAF50;"><strong>Problem:</strong></p>
  <p style="margin: 0 0 0.5rem 0; padding-left: 1rem; font-size: 1.05rem;">What is the center of the ellipse x²/16 + y²/9 = 1?</p>
  <p style="margin: 0 0 2rem 0; padding-left: 1rem; line-height: 1.8; font-size: 1.05rem;">A. (0, 0)<br>B. (4, 3)<br>C. (16, 9)<br>D. (−4, −3)</p>

  <p style="margin: 1.5rem 0 0.5rem 0; padding-left: 1rem; border-left: 3px solid #FF9800;"><strong>Solution:</strong></p>
  <p style="margin: 0 0 1rem 0; padding-left: 1rem; font-size: 1.05rem; line-height: 1.75;">The equation is in standard form with h = 0 and k = 0.</p>

  <div style="text-align: center; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', system-ui, sans-serif; font-size: 1.15rem; line-height: 2.5; margin: 1.5rem 0; padding: 1.5rem 0;">
    <div>x²/16 + y²/9 = 1</div>
    <div>(x − 0)²/16 + (y − 0)²/9 = 1</div>
    <div style="color: #2e7d32; font-weight: 600;">Center = (0, 0)</div>
  </div>

  <p style="margin: 1.5rem 0 0 0; padding-left: 1rem; font-weight: 600; font-size: 1.05rem;">Answer: A</p>

  <div style="margin: 4rem 0 2rem 0; padding: 1.5rem; padding-left: 1.5rem; background: #f0f9ff !important; border-left: 4px solid #2196F3; border-radius: 4px;">
    <p style="margin: 0 0 0.5rem 0; font-weight: 600; color: #1565c0; font-size: 1.05rem;">💡 Key Takeaway</p>
    <p style="margin: 0; line-height: 1.7; font-size: 1.05rem;">For circles, remember that r² appears on the right side of the equation, so take the square root to find the radius. For ellipses, the larger denominator tells you the direction of the major axis. Both shapes have center (h, k) in their standard forms.</p>
  </div>
</div>`
  },

  // CHAPTER 3: ALGEBRA FUNDAMENTALS
  'algebra-skills': {
    title: 'Algebra Skills',
    content: `<div class="lesson-content">
  <p class="lesson-intro">Mastering fundamental algebra skills is essential for ACT Math success. This lesson covers PEMDAS, working with negative numbers, combining like terms, and other core algebraic techniques that appear throughout the test.</p>

  <h3>PEMDAS: Order of Operations</h3>

  <p>Always follow this order when solving expressions:</p>
  <p><strong>P</strong>arentheses → <strong>E</strong>xponents → <strong>M</strong>ultiplication/<strong>D</strong>ivision (left to right) → <strong>A</strong>ddition/<strong>S</strong>ubtraction (left to right)</p>

  <h3>Example Problems</h3>

  <h4>Example 1</h4>

  <p style="margin: 1.5rem 0 0.5rem 0; padding-left: 1rem; border-left: 3px solid #4CAF50;"><strong>Problem:</strong></p>
  <p style="margin: 0 0 0.5rem 0; padding-left: 1rem; font-size: 1.05rem;">What is the value of 3² + 4 × 2 − 6 ÷ 3?</p>
  <p style="margin: 0 0 2rem 0; padding-left: 1rem; line-height: 1.8; font-size: 1.05rem;">A. 13<br>B. 15<br>C. 17<br>D. 26</p>

  <p style="margin: 1.5rem 0 0.5rem 0; padding-left: 1rem; border-left: 3px solid #FF9800;"><strong>Solution:</strong></p>
  <p style="margin: 0 0 1rem 0; padding-left: 1rem; font-size: 1.05rem; line-height: 1.75;">Follow PEMDAS step by step.</p>

  <div style="text-align: center; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', system-ui, sans-serif; font-size: 1.15rem; line-height: 2.5; margin: 1.5rem 0; padding: 1.5rem 0;">
    <div>3² + 4 × 2 − 6 ÷ 3</div>
    <div>= 9 + 4 × 2 − 6 ÷ 3 (Exponents)</div>
    <div>= 9 + 8 − 2 (Multiply and divide, left to right)</div>
    <div style="color: #2e7d32; font-weight: 600;">= 15 (Add and subtract, left to right)</div>
  </div>

  <p style="margin: 1.5rem 0 0 0; padding-left: 1rem; font-weight: 600; font-size: 1.05rem;">Answer: B</p>

  <h3>Negative Numbers</h3>

  <p><strong>Key Rules:</strong></p>
  <p>• Subtracting a negative: a − (−b) = a + b</p>
  <p>• Multiplying/dividing same signs: positive result</p>
  <p>• Multiplying/dividing different signs: negative result</p>
  <p>• −x² ≠ (−x)²: The first equals −(x²), the second equals x²</p>

  <h4>Example 2</h4>

  <p style="margin: 1.5rem 0 0.5rem 0; padding-left: 1rem; border-left: 3px solid #4CAF50;"><strong>Problem:</strong></p>
  <p style="margin: 0 0 0.5rem 0; padding-left: 1rem; font-size: 1.05rem;">What is the value of 5x − (3x − 8) when x = 2?</p>
  <p style="margin: 0 0 2rem 0; padding-left: 1rem; line-height: 1.8; font-size: 1.05rem;">A. −2<br>B. 2<br>C. 10<br>D. 12</p>

  <p style="margin: 1.5rem 0 0.5rem 0; padding-left: 1rem; border-left: 3px solid #FF9800;"><strong>Solution:</strong></p>
  <p style="margin: 0 0 1rem 0; padding-left: 1rem; font-size: 1.05rem; line-height: 1.75;">Distribute the negative sign carefully, then substitute x = 2.</p>

  <div style="text-align: center; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', system-ui, sans-serif; font-size: 1.15rem; line-height: 2.5; margin: 1.5rem 0; padding: 1.5rem 0;">
    <div>5x − (3x − 8)</div>
    <div>= 5x − 3x + 8</div>
    <div>= 2x + 8</div>
    <div>= 2(2) + 8</div>
    <div style="color: #2e7d32; font-weight: 600;">= 12</div>
  </div>

  <p style="margin: 1.5rem 0 0 0; padding-left: 1rem; font-weight: 600; font-size: 1.05rem;">Answer: D</p>

  <h3>Combining Like Terms</h3>

  <p>Like terms have the same variable raised to the same power. Combine them by adding or subtracting their coefficients.</p>

  <h4>Example 3</h4>

  <p style="margin: 1.5rem 0 0.5rem 0; padding-left: 1rem; border-left: 3px solid #4CAF50;"><strong>Problem:</strong></p>
  <p style="margin: 0 0 0.5rem 0; padding-left: 1rem; font-size: 1.05rem;">Simplify: 4x² + 3x − 2x² + 5x − 7</p>
  <p style="margin: 0 0 2rem 0; padding-left: 1rem; line-height: 1.8; font-size: 1.05rem;">A. 2x² + 8x − 7<br>B. 6x² + 8x − 7<br>C. 2x² + 2x − 7<br>D. 2x³ + 8x − 7</p>

  <p style="margin: 1.5rem 0 0.5rem 0; padding-left: 1rem; border-left: 3px solid #FF9800;"><strong>Solution:</strong></p>
  <p style="margin: 0 0 1rem 0; padding-left: 1rem; font-size: 1.05rem; line-height: 1.75;">Group and combine like terms.</p>

  <div style="text-align: center; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', system-ui, sans-serif; font-size: 1.15rem; line-height: 2.5; margin: 1.5rem 0; padding: 1.5rem 0;">
    <div>4x² + 3x − 2x² + 5x − 7</div>
    <div>= (4x² − 2x²) + (3x + 5x) − 7</div>
    <div style="color: #2e7d32; font-weight: 600;">= 2x² + 8x − 7</div>
  </div>

  <p style="margin: 1.5rem 0 0 0; padding-left: 1rem; font-weight: 600; font-size: 1.05rem;">Answer: A</p>

  <h3>Cross Multiplication</h3>

  <p>When two fractions are equal, cross multiply: If a/b = c/d, then ad = bc</p>

  <h4>Example 4</h4>

  <p style="margin: 1.5rem 0 0.5rem 0; padding-left: 1rem; border-left: 3px solid #4CAF50;"><strong>Problem:</strong></p>
  <p style="margin: 0 0 0.5rem 0; padding-left: 1rem; font-size: 1.05rem;">If x/7 = 4/5, what is the value of x?</p>
  <p style="margin: 0 0 2rem 0; padding-left: 1rem; line-height: 1.8; font-size: 1.05rem;">A. 28/5<br>B. 20/7<br>C. 35/4<br>D. 5/7</p>

  <p style="margin: 1.5rem 0 0.5rem 0; padding-left: 1rem; border-left: 3px solid #FF9800;"><strong>Solution:</strong></p>
  <p style="margin: 0 0 1rem 0; padding-left: 1rem; font-size: 1.05rem; line-height: 1.75;">Cross multiply and solve for x.</p>

  <div style="text-align: center; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', system-ui, sans-serif; font-size: 1.15rem; line-height: 2.5; margin: 1.5rem 0; padding: 1.5rem 0;">
    <div>x/7 = 4/5</div>
    <div>5x = 28</div>
    <div style="color: #2e7d32; font-weight: 600;">x = 28/5</div>
  </div>

  <p style="margin: 1.5rem 0 0 0; padding-left: 1rem; font-weight: 600; font-size: 1.05rem;">Answer: A</p>

  <div style="margin: 4rem 0 2rem 0; padding: 1.5rem; padding-left: 1.5rem; background: #f0f9ff !important; border-left: 4px solid #2196F3; border-radius: 4px;">
    <p style="margin: 0 0 0.5rem 0; font-weight: 600; color: #1565c0; font-size: 1.05rem;">💡 Key Takeaway</p>
    <p style="margin: 0; line-height: 1.7; font-size: 1.05rem;">Master these fundamental skills and apply them carefully. Most algebra mistakes come from rushing—take your time with negative signs, distribute correctly, and always follow PEMDAS. Use your calculator when possible to avoid arithmetic errors!</p>
  </div>
</div>`
  }
};

// Function to update a lesson
async function updateLesson(slug, data) {
  try {
    const { data: result, error } = await supabase
      .from('topics')
      .update({
        title: data.title,
        content: data.content,
        updated_at: new Date().toISOString()
      })
      .eq('slug', slug);

    if (error) throw error;
    console.log(`✓ Updated: ${slug}`);
    return true;
  } catch (error) {
    console.error(`✗ Error updating ${slug}:`, error.message);
    return false;
  }
}

// Main execution
async function main() {
  console.log('Starting lesson updates...\n');

  let successCount = 0;
  let failCount = 0;

  for (const [slug, data] of Object.entries(lessons)) {
    const success = await updateLesson(slug, data);
    if (success) {
      successCount++;
    } else {
      failCount++;
    }
    // Small delay to avoid rate limiting
    await new Promise(resolve => setTimeout(resolve, 500));
  }

  console.log(`\n=== Update Summary ===`);
  console.log(`Successful: ${successCount}`);
  console.log(`Failed: ${failCount}`);
  console.log(`Total: ${successCount + failCount}`);
}

main().catch(console.error);
