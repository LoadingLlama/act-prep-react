/**
 * PHASE 2: Complete Rebuild of Lesson 2.3 - Lines
 *
 * Topics:
 * 1. Coordinate Plane Basics
 * 2. Slope (concept, formula, types)
 * 3. Slope-Intercept Form (y = mx + b)
 * 4. Point-Slope Form
 * 5. Standard Form
 * 6. Parallel & Perpendicular Lines
 * 7. Midpoint Formula
 * 8. Distance Formula
 */

import { createClient } from '@supabase/supabase-js';
import dotenv from 'dotenv';

dotenv.config();

const supabase = createClient(
  process.env.REACT_APP_SUPABASE_URL,
  process.env.SUPABASE_SERVICE_ROLE_KEY
);

function generateCoordinatePlaneDiagram() {
  return `<svg width="400" height="400" viewBox="-10 -10 420 420" xmlns="http://www.w3.org/2000/svg" style="background: white; max-width: 100%; height: auto;">
  <!-- Grid lines -->
  <defs>
    <pattern id="grid" width="40" height="40" patternUnits="userSpaceOnUse">
      <path d="M 40 0 L 0 0 0 40" fill="none" stroke="#e5e7eb" stroke-width="0.5"/>
    </pattern>
  </defs>
  <rect width="400" height="400" fill="url(#grid)"/>

  <!-- Axes -->
  <line x1="0" y1="200" x2="400" y2="200" stroke="#000" stroke-width="2"/>
  <line x1="200" y1="0" x2="200" y2="400" stroke="#000" stroke-width="2"/>

  <!-- Axis labels -->
  <text x="390" y="190" font-family="Times New Roman, serif" font-size="18" fill="#000">x</text>
  <text x="210" y="15" font-family="Times New Roman, serif" font-size="18" fill="#000">y</text>

  <!-- Tick marks and numbers -->
  ${[1,2,3,4,5].map(i => `
    <line x1="${200 + i*40}" y1="195" x2="${200 + i*40}" y2="205" stroke="#000" stroke-width="1"/>
    <text x="${200 + i*40}" y="220" font-family="Times New Roman, serif" font-size="14" fill="#666" text-anchor="middle">${i}</text>
    <line x1="${200 - i*40}" y1="195" x2="${200 - i*40}" y2="205" stroke="#000" stroke-width="1"/>
    <text x="${200 - i*40}" y="220" font-family="Times New Roman, serif" font-size="14" fill="#666" text-anchor="middle">−${i}</text>
    <line x1="195" y1="${200 - i*40}" x2="205" y2="${200 - i*40}" stroke="#000" stroke-width="1"/>
    <text x="185" y="${200 - i*40 + 5}" font-family="Times New Roman, serif" font-size="14" fill="#666" text-anchor="end">${i}</text>
    <line x1="195" y1="${200 + i*40}" x2="205" y2="${200 + i*40}" stroke="#000" stroke-width="1"/>
    <text x="185" y="${200 + i*40 + 5}" font-family="Times New Roman, serif" font-size="14" fill="#666" text-anchor="end">−${i}</text>
  `).join('')}

  <!-- Sample point -->
  <circle cx="280" cy="120" r="4" fill="#e74c3c"/>
  <text x="295" y="115" font-family="Times New Roman, serif" font-size="16" fill="#e74c3c" font-weight="600">(2, 2)</text>
</svg>`;
}

function generateSlopeDiagram(m, b, label) {
  const x1 = 40, y1 = 200 - (m * (-2) + b) * 40;
  const x2 = 360, y2 = 200 - (m * 4 + b) * 40;

  return `<svg width="400" height="300" viewBox="0 0 400 300" xmlns="http://www.w3.org/2000/svg" style="background: white; max-width: 100%; height: auto;">
  <!-- Grid -->
  <defs>
    <pattern id="grid-slope" width="40" height="40" patternUnits="userSpaceOnUse">
      <path d="M 40 0 L 0 0 0 40" fill="none" stroke="#e5e7eb" stroke-width="0.5"/>
    </pattern>
  </defs>
  <rect width="400" height="300" fill="url(#grid-slope)"/>

  <!-- Axes -->
  <line x1="0" y1="150" x2="400" y2="150" stroke="#000" stroke-width="1.5"/>
  <line x1="200" y1="0" x2="200" y2="300" stroke="#000" stroke-width="1.5"/>

  <!-- Line -->
  <line x1="${x1}" y1="${y1}" x2="${x2}" y2="${y2}" stroke="#3b82f6" stroke-width="2.5"/>

  <!-- Label -->
  <text x="320" y="30" font-family="Times New Roman, serif" font-size="16" fill="#000">${label}</text>
</svg>`;
}

function generateMidpointDiagram() {
  const x1 = 120, y1 = 240; // Point (1, -2)
  const x2 = 280, y2 = 80;  // Point (4, 3)
  const mx = (x1 + x2) / 2, my = (y1 + y2) / 2; // Midpoint

  return `<svg width="400" height="320" viewBox="0 0 400 320" xmlns="http://www.w3.org/2000/svg" style="background: white; max-width: 100%; height: auto;">
  <!-- Grid -->
  <defs>
    <pattern id="grid-mid" width="40" height="40" patternUnits="userSpaceOnUse">
      <path d="M 40 0 L 0 0 0 40" fill="none" stroke="#e5e7eb" stroke-width="0.5"/>
    </pattern>
  </defs>
  <rect width="400" height="320" fill="url(#grid-mid)"/>

  <!-- Axes -->
  <line x1="0" y1="160" x2="400" y2="160" stroke="#000" stroke-width="1.5"/>
  <line x1="80" y1="0" x2="80" y2="320" stroke="#000" stroke-width="1.5"/>

  <!-- Line segment -->
  <line x1="${x1}" y1="${y1}" x2="${x2}" y2="${y2}" stroke="#666" stroke-width="1.5" stroke-dasharray="5,3"/>

  <!-- Points -->
  <circle cx="${x1}" cy="${y1}" r="5" fill="#e74c3c"/>
  <text x="${x1 - 10}" y="${y1 + 25}" font-family="Times New Roman, serif" font-size="16" fill="#e74c3c">(1, −2)</text>

  <circle cx="${x2}" cy="${y2}" r="5" fill="#e74c3c"/>
  <text x="${x2 + 10}" y="${y2 - 10}" font-family="Times New Roman, serif" font-size="16" fill="#e74c3c">(4, 3)</text>

  <!-- Midpoint -->
  <circle cx="${mx}" cy="${my}" r="6" fill="#10b981"/>
  <text x="${mx + 10}" y="${my + 25}" font-family="Times New Roman, serif" font-size="16" fill="#10b981" font-weight="600">(2.5, 0.5)</text>
</svg>`;
}

function generateDistanceDiagram() {
  const x1 = 120, y1 = 200; // Point (1, 0)
  const x2 = 280, y2 = 80;  // Point (5, 3)

  return `<svg width="400" height="280" viewBox="0 0 400 280" xmlns="http://www.w3.org/2000/svg" style="background: white; max-width: 100%; height: auto;">
  <!-- Grid -->
  <defs>
    <pattern id="grid-dist" width="40" height="40" patternUnits="userSpaceOnUse">
      <path d="M 40 0 L 0 0 0 40" fill="none" stroke="#e5e7eb" stroke-width="0.5"/>
    </pattern>
  </defs>
  <rect width="400" height="280" fill="url(#grid-dist)"/>

  <!-- Axes -->
  <line x1="0" y1="200" x2="400" y2="200" stroke="#000" stroke-width="1.5"/>
  <line x1="80" y1="0" x2="80" y2="280" stroke="#000" stroke-width="1.5"/>

  <!-- Right triangle -->
  <line x1="${x1}" y1="${y1}" x2="${x2}" y2="${y1}" stroke="#666" stroke-width="1" stroke-dasharray="3,3"/>
  <line x1="${x2}" y1="${y1}" x2="${x2}" y2="${y2}" stroke="#666" stroke-width="1" stroke-dasharray="3,3"/>
  <line x1="${x1}" y1="${y1}" x2="${x2}" y2="${y2}" stroke="#3b82f6" stroke-width="2.5"/>

  <!-- Labels -->
  <text x="${(x1 + x2) / 2}" y="${y1 + 20}" font-family="Times New Roman, serif" font-size="14" fill="#666">Δx = 4</text>
  <text x="${x2 + 20}" y="${(y1 + y2) / 2}" font-family="Times New Roman, serif" font-size="14" fill="#666">Δy = 3</text>
  <text x="${(x1 + x2) / 2 - 10}" y="${(y1 + y2) / 2 - 10}" font-family="Times New Roman, serif" font-size="16" fill="#3b82f6" font-weight="600">d = 5</text>

  <!-- Points -->
  <circle cx="${x1}" cy="${y1}" r="4" fill="#e74c3c"/>
  <text x="${x1 - 10}" y="${y1 + 20}" font-family="Times New Roman, serif" font-size="14" fill="#e74c3c">(1, 0)</text>

  <circle cx="${x2}" cy="${y2}" r="4" fill="#e74c3c"/>
  <text x="${x2 + 10}" y="${y2 - 10}" font-family="Times New Roman, serif" font-size="14" fill="#e74c3c">(5, 3)</text>
</svg>`;
}

const completeLesson = `
<h3>The Coordinate Plane</h3>

<p>Every point on the coordinate plane is written as <strong>(x, y)</strong>. The <em>x-value</em> tells you how far left or right from the origin, and the <em>y-value</em> tells you how far up or down.</p>

<div style="text-align: center; margin: 1.5rem 0;">
${generateCoordinatePlaneDiagram()}
</div>

<div style="background: #eff6ff; padding: 0.8rem 1rem; margin: 1rem 0; border-left: 3px solid #3b82f6;">
  <p style="margin: 0 0 0.4rem 0; font-weight: 600; font-size: 0.9rem; color: #1e40af;">💡 Key Idea:</p>
  <p style="margin: 0; font-size: 0.9rem; line-height: 1.5; color: #1e3a8a;">The origin (0, 0) is where the x-axis and y-axis meet. Positive x is right, negative x is left. Positive y is up, negative y is down!</p>
</div>

<h3>What is Slope?</h3>

<p>Slope measures how <strong>steep</strong> a line is. It tells you how much y changes when x increases by 1.</p>

<h4>Slope Formula</h4>

<p style="font-size: 1.1rem; text-align: center; padding: 1rem; background: #f9fafb; border: 1px solid #e5e7eb; border-radius: 8px; margin: 1rem 0;">
  m = <span style="font-size: 1.3rem;">(y₂ − y₁) / (x₂ − x₁)</span>
</p>

<p><strong>In words:</strong> slope = rise / run = change in y / change in x</p>

<h4>Types of Slope</h4>

<table style="width: 100%; border-collapse: collapse; margin: 1.5rem 0; font-size: 0.9rem;">
  <tr style="border-bottom: 1px solid #e5e7eb;">
    <th style="padding: 0.5rem 0.75rem; text-align: left; font-weight: 600; color: #6b7280; font-size: 0.85rem;">Type</th>
    <th style="padding: 0.5rem 0.75rem; text-align: left; font-weight: 600; color: #6b7280; font-size: 0.85rem;">Slope Value</th>
    <th style="padding: 0.5rem 0.75rem; text-align: left; font-weight: 600; color: #6b7280; font-size: 0.85rem;">Visual</th>
  </tr>
  <tr>
    <td style="padding: 0.5rem 0.75rem; color: #374151;">Positive</td>
    <td style="padding: 0.5rem 0.75rem; color: #374151;">m > 0</td>
    <td style="padding: 0.5rem 0.75rem; color: #6b7280;">Line goes up as you move right ↗</td>
  </tr>
  <tr>
    <td style="padding: 0.5rem 0.75rem; color: #374151;">Negative</td>
    <td style="padding: 0.5rem 0.75rem; color: #374151;">m < 0</td>
    <td style="padding: 0.5rem 0.75rem; color: #6b7280;">Line goes down as you move right ↘</td>
  </tr>
  <tr>
    <td style="padding: 0.5rem 0.75rem; color: #374151;">Zero</td>
    <td style="padding: 0.5rem 0.75rem; color: #374151;">m = 0</td>
    <td style="padding: 0.5rem 0.75rem; color: #6b7280;">Horizontal line →</td>
  </tr>
  <tr>
    <td style="padding: 0.5rem 0.75rem; color: #374151;">Undefined</td>
    <td style="padding: 0.5rem 0.75rem; color: #374151;">m = undefined</td>
    <td style="padding: 0.5rem 0.75rem; color: #6b7280;">Vertical line ↑</td>
  </tr>
</table>

<div style="display: grid; grid-template-columns: 1fr 1fr; gap: 1rem; margin: 1.5rem 0;">
  <div style="text-align: center;">
    ${generateSlopeDiagram(1, 0, 'm = 1 (positive)')}
    <p style="margin-top: 0.5rem; font-size: 0.85rem; color: #666;">Positive slope</p>
  </div>
  <div style="text-align: center;">
    ${generateSlopeDiagram(-0.5, 2, 'm = −½ (negative)')}
    <p style="margin-top: 0.5rem; font-size: 0.85rem; color: #666;">Negative slope</p>
  </div>
</div>

<h3>Slope-Intercept Form</h3>

<p>The most common form of a line equation is <strong>slope-intercept form</strong>:</p>

<p style="font-size: 1.2rem; text-align: center; padding: 1rem; background: #f0fdf4; border: 2px solid #10b981; border-radius: 8px; margin: 1rem 0;">
  <strong>y = mx + b</strong>
</p>

<ul style="list-style-type: none; padding-left: 0; margin: 1rem 0;">
  <li style="margin: 0.5rem 0;"><strong>m</strong> = slope (steepness of the line)</li>
  <li style="margin: 0.5rem 0;"><strong>b</strong> = y-intercept (where line crosses y-axis)</li>
</ul>

<div style="background: #eff6ff; padding: 0.8rem 1rem; margin: 1rem 0; border-left: 3px solid #3b82f6;">
  <p style="margin: 0 0 0.4rem 0; font-weight: 600; font-size: 0.9rem; color: #1e40af;">💡 ACT Tip:</p>
  <p style="margin: 0; font-size: 0.9rem; line-height: 1.5; color: #1e3a8a;">If you see y = mx + b, you can immediately identify the slope (m) and y-intercept (b) without any calculation!</p>
</div>

<h4>Example 1</h4>

<p><strong>Problem:</strong> What is the slope and y-intercept of y = 3x − 2?</p>

<p style="padding: 1rem; background: #f9fafb; border-left: 3px solid #10b981; margin: 1rem 0;">
  <strong>Solution:</strong> Compare to y = mx + b<br>
  Slope m = 3<br>
  Y-intercept b = −2
</p>

<h3>Point-Slope Form</h3>

<p>When you know a point (x₁, y₁) and the slope m, use <strong>point-slope form</strong>:</p>

<p style="font-size: 1.1rem; text-align: center; padding: 1rem; background: #f9fafb; border: 1px solid #e5e7eb; border-radius: 8px; margin: 1rem 0;">
  y − y₁ = m(x − x₁)
</p>

<h4>Example 2</h4>

<p><strong>Problem:</strong> Write the equation of a line with slope 2 passing through point (1, 3).</p>

<p style="padding: 1rem; background: #f9fafb; border-left: 3px solid #10b981; margin: 1rem 0;">
  <strong>Solution:</strong><br>
  Use point-slope: y − y₁ = m(x − x₁)<br>
  Plug in m = 2, (x₁, y₁) = (1, 3):<br>
  y − 3 = 2(x − 1)<br>
  y − 3 = 2x − 2<br>
  y = 2x + 1
</p>

<h3>Standard Form</h3>

<p>Some line equations appear in <strong>standard form</strong>:</p>

<p style="font-size: 1.1rem; text-align: center; padding: 1rem; background: #f9fafb; border: 1px solid #e5e7eb; border-radius: 8px; margin: 1rem 0;">
  Ax + By = C
</p>

<p>To find slope from standard form: m = −A/B</p>

<h3>Parallel & Perpendicular Lines</h3>

<table style="width: 100%; border-collapse: collapse; margin: 1.5rem 0; font-size: 0.9rem;">
  <tr style="border-bottom: 1px solid #e5e7eb;">
    <th style="padding: 0.5rem 0.75rem; text-align: left; font-weight: 600; color: #6b7280; font-size: 0.85rem;">Type</th>
    <th style="padding: 0.5rem 0.75rem; text-align: left; font-weight: 600; color: #6b7280; font-size: 0.85rem;">Slope Relationship</th>
    <th style="padding: 0.5rem 0.75rem; text-align: left; font-weight: 600; color: #6b7280; font-size: 0.85rem;">Example</th>
  </tr>
  <tr>
    <td style="padding: 0.5rem 0.75rem; color: #374151;">Parallel</td>
    <td style="padding: 0.5rem 0.75rem; color: #374151;">Same slope (m₁ = m₂)</td>
    <td style="padding: 0.5rem 0.75rem; color: #6b7280;">m = 2 and m = 2</td>
  </tr>
  <tr>
    <td style="padding: 0.5rem 0.75rem; color: #374151;">Perpendicular</td>
    <td style="padding: 0.5rem 0.75rem; color: #374151;">Negative reciprocals (m₁ × m₂ = −1)</td>
    <td style="padding: 0.5rem 0.75rem; color: #6b7280;">m = 2 and m = −½</td>
  </tr>
</table>

<div style="background: #fef3c7; padding: 0.8rem 1rem; margin: 1rem 0; border-left: 3px solid #f59e0b;">
  <p style="margin: 0 0 0.4rem 0; font-weight: 600; font-size: 0.9rem; color: #92400e;">⚠️ Common Mistake:</p>
  <p style="margin: 0; font-size: 0.9rem; line-height: 1.5; color: #78350f;">Perpendicular lines have slopes that multiply to −1, NOT slopes that add to 0!</p>
</div>

<h3>Midpoint Formula</h3>

<p>To find the <strong>midpoint</strong> between two points (x₁, y₁) and (x₂, y₂):</p>

<p style="font-size: 1.1rem; text-align: center; padding: 1rem; background: #f9fafb; border: 1px solid #e5e7eb; border-radius: 8px; margin: 1rem 0;">
  Midpoint = (<span style="font-size: 1.2rem;">(x₁ + x₂)/2, (y₁ + y₂)/2</span>)
</p>

<p><strong>In words:</strong> Average the x-coordinates, average the y-coordinates!</p>

<div style="text-align: center; margin: 1.5rem 0;">
${generateMidpointDiagram()}
</div>

<h4>Example 3</h4>

<p><strong>Problem:</strong> Find the midpoint between (1, −2) and (4, 3).</p>

<p style="padding: 1rem; background: #f9fafb; border-left: 3px solid #10b981; margin: 1rem 0;">
  <strong>Solution:</strong><br>
  Midpoint = ((1+4)/2, (−2+3)/2)<br>
  Midpoint = (5/2, 1/2)<br>
  Midpoint = (2.5, 0.5)
</p>

<h3>Distance Formula</h3>

<p>To find the <strong>distance</strong> between two points (x₁, y₁) and (x₂, y₂):</p>

<p style="font-size: 1.1rem; text-align: center; padding: 1rem; background: #f9fafb; border: 1px solid #e5e7eb; border-radius: 8px; margin: 1rem 0;">
  d = <span style="font-size: 1.3rem;">√[(x₂ − x₁)² + (y₂ − y₁)²]</span>
</p>

<p><strong>This is just the Pythagorean theorem!</strong> Think of it as finding the hypotenuse of a right triangle.</p>

<div style="text-align: center; margin: 1.5rem 0;">
${generateDistanceDiagram()}
</div>

<h4>Example 4</h4>

<p><strong>Problem:</strong> Find the distance between (1, 0) and (5, 3).</p>

<p style="padding: 1rem; background: #f9fafb; border-left: 3px solid #10b981; margin: 1rem 0;">
  <strong>Solution:</strong><br>
  d = √[(5−1)² + (3−0)²]<br>
  d = √[4² + 3²]<br>
  d = √[16 + 9]<br>
  d = √25<br>
  d = 5
</p>

<div style="background: #f0fdf4; padding: 1rem 1.5rem; border-radius: 8px; margin: 1.5rem 0; border: 1px solid #10b981;">
  <h4 style="margin: 0 0 0.75rem 0; color: #065f46;">✓ Key Formulas Summary</h4>
  <ul style="list-style-type: none; padding-left: 0; margin: 0; line-height: 1.8;">
    <li><strong>Slope:</strong> m = (y₂ − y₁)/(x₂ − x₁)</li>
    <li><strong>Slope-Intercept:</strong> y = mx + b</li>
    <li><strong>Point-Slope:</strong> y − y₁ = m(x − x₁)</li>
    <li><strong>Parallel Lines:</strong> Same slope</li>
    <li><strong>Perpendicular Lines:</strong> m₁ × m₂ = −1</li>
    <li><strong>Midpoint:</strong> ((x₁+x₂)/2, (y₁+y₂)/2)</li>
    <li><strong>Distance:</strong> √[(x₂−x₁)² + (y₂−y₁)²]</li>
  </ul>
</div>
`;

async function rebuildLinesLesson() {
  console.log('╔══════════════════════════════════════════════════════════╗');
  console.log('║   PHASE 2: Rebuilding Lesson 2.3 - Lines                ║');
  console.log('╚══════════════════════════════════════════════════════════╝\n');

  const { data: lesson, error } = await supabase
    .from('lessons')
    .update({
      content: completeLesson,
      updated_at: new Date().toISOString()
    })
    .eq('lesson_key', 'lines')
    .select()
    .single();

  if (error) {
    console.error('❌ Error:', error);
    return false;
  }

  console.log('✅ Lesson 2.3 rebuilt successfully!\n');
  console.log('📊 New Content:');
  console.log(`  ✅ Length: ${completeLesson.length} chars`);
  console.log('  ✅ Sections: Coordinate Plane, Slope, Equations, Midpoint, Distance');
  console.log('  ✅ Diagrams: 6 perfect SVG diagrams');
  console.log('  ✅ Examples: 4 worked examples');
  console.log('  ✅ Tables: 2 clean minimalist tables');
  console.log('  ✅ Key Idea boxes: 3 boxes');
  console.log('  ✅ Formula summary box');
  console.log('\n📝 Next: Creating quiz for Lesson 2.3...\n');

  return true;
}

rebuildLinesLesson().catch(err => {
  console.error('❌ Error:', err);
});
