/**
 * PHASE 4: Complete Rebuild of Lesson 2.5 - Circles and Ellipses
 *
 * Topics:
 * 1. Circle Equation (Standard Form)
 * 2. Finding Center and Radius
 * 3. Graphing Circles
 * 4. Completing the Square
 * 5. Ellipse Basics
 * 6. Hyperbola Basics (brief)
 */

import { createClient } from '@supabase/supabase-js';
import dotenv from 'dotenv';

dotenv.config();

const supabase = createClient(
  process.env.REACT_APP_SUPABASE_URL,
  process.env.SUPABASE_SERVICE_ROLE_KEY
);

function polarToCartesian(cx, cy, radius, angleInDegrees) {
  const radians = angleInDegrees * (Math.PI / 180);
  return {
    x: cx + radius * Math.cos(radians),
    y: cy + radius * Math.sin(radians)
  };
}

function generateCircleDiagram() {
  const cx = 250, cy = 150, radius = 60;

  return `<svg width="500" height="300" viewBox="0 0 500 300" xmlns="http://www.w3.org/2000/svg" style="background: white; max-width: 100%; height: auto;">
  <!-- Grid -->
  <defs>
    <pattern id="grid-circle" width="30" height="30" patternUnits="userSpaceOnUse">
      <path d="M 30 0 L 0 0 0 30" fill="none" stroke="#e5e7eb" stroke-width="0.5"/>
    </pattern>
  </defs>
  <rect width="500" height="300" fill="url(#grid-circle)"/>

  <!-- Axes -->
  <line x1="0" y1="150" x2="500" y2="150" stroke="#000" stroke-width="1.5"/>
  <line x1="250" y1="0" x2="250" y2="300" stroke="#000" stroke-width="1.5"/>

  <!-- Circle -->
  <circle cx="${cx}" cy="${cy}" r="${radius}" fill="none" stroke="#3b82f6" stroke-width="2.5"/>

  <!-- Center -->
  <circle cx="${cx}" cy="${cy}" r="3" fill="#e74c3c"/>
  <text x="${cx + 10}" y="${cy - 10}" font-family="Times New Roman, serif" font-size="14" fill="#e74c3c" font-weight="600">(h, k)</text>

  <!-- Radius -->
  <line x1="${cx}" y1="${cy}" x2="${cx + radius}" y2="${cy}" stroke="#10b981" stroke-width="2"/>
  <text x="${cx + radius/2}" y="${cy - 10}" font-family="Times New Roman, serif" font-size="14" fill="#10b981" font-weight="600">r</text>

  <!-- Axis labels -->
  <text x="480" y="140" font-family="Times New Roman, serif" font-size="16" fill="#000">x</text>
  <text x="260" y="20" font-family="Times New Roman, serif" font-size="16" fill="#000">y</text>

  <!-- Equation label -->
  <text x="380" y="80" font-family="Times New Roman, serif" font-size="15" fill="#3b82f6">(x − h)² + (y − k)² = r²</text>
</svg>`;
}

function generateEllipseDiagram() {
  const cx = 250, cy = 150;
  const a = 80, b = 50; // Semi-major and semi-minor axes

  return `<svg width="500" height="300" viewBox="0 0 500 300" xmlns="http://www.w3.org/2000/svg" style="background: white; max-width: 100%; height: auto;">
  <!-- Grid -->
  <defs>
    <pattern id="grid-ellipse" width="30" height="30" patternUnits="userSpaceOnUse">
      <path d="M 30 0 L 0 0 0 30" fill="none" stroke="#e5e7eb" stroke-width="0.5"/>
    </pattern>
  </defs>
  <rect width="500" height="300" fill="url(#grid-ellipse)"/>

  <!-- Axes -->
  <line x1="0" y1="150" x2="500" y2="150" stroke="#000" stroke-width="1.5"/>
  <line x1="250" y1="0" x2="250" y2="300" stroke="#000" stroke-width="1.5"/>

  <!-- Ellipse -->
  <ellipse cx="${cx}" cy="${cy}" rx="${a}" ry="${b}" fill="none" stroke="#9333ea" stroke-width="2.5"/>

  <!-- Center -->
  <circle cx="${cx}" cy="${cy}" r="3" fill="#e74c3c"/>
  <text x="${cx + 10}" y="${cy + 20}" font-family="Times New Roman, serif" font-size="14" fill="#e74c3c" font-weight="600">(h, k)</text>

  <!-- Semi-major axis -->
  <line x1="${cx}" y1="${cy}" x2="${cx + a}" y2="${cy}" stroke="#10b981" stroke-width="2"/>
  <text x="${cx + a/2}" y="${cy - 10}" font-family="Times New Roman, serif" font-size="14" fill="#10b981" font-weight="600">a</text>

  <!-- Semi-minor axis -->
  <line x1="${cx}" y1="${cy}" x2="${cx}" y2="${cy - b}" stroke="#f59e0b" stroke-width="2"/>
  <text x="${cx + 10}" y="${cy - b/2}" font-family="Times New Roman, serif" font-size="14" fill="#f59e0b" font-weight="600">b</text>

  <!-- Axis labels -->
  <text x="480" y="140" font-family="Times New Roman, serif" font-size="16" fill="#000">x</text>
  <text x="260" y="20" font-family="Times New Roman, serif" font-size="16" fill="#000">y</text>

  <!-- Equation label -->
  <text x="350" y="80" font-family="Times New Roman, serif" font-size="14" fill="#9333ea">(x−h)²/a² + (y−k)²/b² = 1</text>
</svg>`;
}

function generateHyperbolaDiagram() {
  const cx = 250, cy = 150;

  return `<svg width="500" height="300" viewBox="0 0 500 300" xmlns="http://www.w3.org/2000/svg" style="background: white; max-width: 100%; height: auto;">
  <!-- Grid -->
  <defs>
    <pattern id="grid-hyp" width="30" height="30" patternUnits="userSpaceOnUse">
      <path d="M 30 0 L 0 0 0 30" fill="none" stroke="#e5e7eb" stroke-width="0.5"/>
    </pattern>
  </defs>
  <rect width="500" height="300" fill="url(#grid-hyp)"/>

  <!-- Axes -->
  <line x1="0" y1="150" x2="500" y2="150" stroke="#000" stroke-width="1.5"/>
  <line x1="250" y1="0" x2="250" y2="300" stroke="#000" stroke-width="1.5"/>

  <!-- Hyperbola branches (approximation) -->
  <path d="M 330,150 Q 340,130 360,100 Q 375,75 400,50" fill="none" stroke="#dc2626" stroke-width="2.5"/>
  <path d="M 330,150 Q 340,170 360,200 Q 375,225 400,250" fill="none" stroke="#dc2626" stroke-width="2.5"/>
  <path d="M 170,150 Q 160,130 140,100 Q 125,75 100,50" fill="none" stroke="#dc2626" stroke-width="2.5"/>
  <path d="M 170,150 Q 160,170 140,200 Q 125,225 100,250" fill="none" stroke="#dc2626" stroke-width="2.5"/>

  <!-- Asymptotes (dashed) -->
  <line x1="150" y1="50" x2="350" y2="250" stroke="#666" stroke-width="1" stroke-dasharray="5,3"/>
  <line x1="150" y1="250" x2="350" y2="50" stroke="#666" stroke-width="1" stroke-dasharray="5,3"/>

  <!-- Center -->
  <circle cx="${cx}" cy="${cy}" r="3" fill="#e74c3c"/>
  <text x="${cx + 10}" y="${cy + 20}" font-family="Times New Roman, serif" font-size="14" fill="#e74c3c" font-weight="600">(h, k)</text>

  <!-- Axis labels -->
  <text x="480" y="140" font-family="Times New Roman, serif" font-size="16" fill="#000">x</text>
  <text x="260" y="20" font-family="Times New Roman, serif" font-size="16" fill="#000">y</text>

  <!-- Equation label -->
  <text x="320" y="270" font-family="Times New Roman, serif" font-size="14" fill="#dc2626">(x−h)²/a² − (y−k)²/b² = 1</text>
</svg>`;
}

const completeLesson = `
<h3>Circle Equations on the Coordinate Plane</h3>

<p>A circle is all points that are the same distance (radius) from a center point. On the coordinate plane, we can write this as an equation!</p>

<h4>Standard Form of a Circle</h4>

<p style="font-size: 1.2rem; text-align: center; padding: 1rem; background: #eff6ff; border: 2px solid #3b82f6; border-radius: 8px; margin: 1rem 0;">
  <strong>(x − h)² + (y − k)² = r²</strong>
</p>

<ul style="line-height: 1.8;">
  <li><strong>(h, k)</strong> = center of the circle</li>
  <li><strong>r</strong> = radius of the circle</li>
  <li><strong>r²</strong> = radius squared (what appears on the right side)</li>
</ul>

<div style="text-align: center; margin: 1.5rem 0;">
${generateCircleDiagram()}
</div>

<div style="background: #eff6ff; padding: 0.8rem 1rem; margin: 1rem 0; border-left: 3px solid #3b82f6;">
  <p style="margin: 0 0 0.4rem 0; font-weight: 600; font-size: 0.9rem; color: #1e40af;">💡 Key Pattern:</p>
  <p style="margin: 0; font-size: 0.9rem; line-height: 1.5; color: #1e3a8a;">
    The signs in the equation tell you the center! If you see (x − 3)², the center x-coordinate is +3. If you see (x + 2)², the center x-coordinate is −2. The signs flip!
  </p>
</div>

<h4>Example 1: Finding Center and Radius</h4>

<p><strong>Problem:</strong> What is the center and radius of the circle (x − 5)² + (y + 2)² = 16?</p>

<p style="padding: 1rem; background: #f9fafb; border-left: 3px solid #10b981; margin: 1rem 0;">
  <strong>Solution:</strong><br>
  Compare to (x − h)² + (y − k)² = r²<br><br>
  (x − 5)² means h = 5 ✓<br>
  (y + 2)² means (y − (−2))², so k = −2 ✓<br>
  r² = 16, so r = 4 ✓<br><br>
  <strong>Center: (5, −2)</strong><br>
  <strong>Radius: 4</strong>
</p>

<h4>Example 2: Writing Circle Equation</h4>

<p><strong>Problem:</strong> Write the equation of a circle with center (−3, 1) and radius 7.</p>

<p style="padding: 1rem; background: #f9fafb; border-left: 3px solid #10b981; margin: 1rem 0;">
  <strong>Solution:</strong><br>
  Use (x − h)² + (y − k)² = r²<br>
  h = −3, k = 1, r = 7<br><br>
  (x − (−3))² + (y − 1)² = 7²<br>
  <strong>(x + 3)² + (y − 1)² = 49</strong>
</p>

<h3>Completing the Square</h3>

<p>Sometimes circle equations aren't in standard form. You'll need to <strong>complete the square</strong> to find the center and radius.</p>

<div style="background: #fef3c7; padding: 0.8rem 1rem; margin: 1rem 0; border-left: 3px solid #f59e0b;">
  <p style="margin: 0 0 0.4rem 0; font-weight: 600; font-size: 0.9rem; color: #92400e;">📝 Steps to Complete the Square:</p>
  <ol style="margin: 0; padding-left: 1.5rem; font-size: 0.9rem; line-height: 1.6; color: #78350f;">
    <li>Group x terms and y terms separately</li>
    <li>Take half of the x coefficient, square it, add to both sides</li>
    <li>Take half of the y coefficient, square it, add to both sides</li>
    <li>Factor each perfect square</li>
  </ol>
</div>

<h4>Example 3: Completing the Square</h4>

<p><strong>Problem:</strong> Convert x² + y² − 4x + 6y + 9 = 0 to standard form.</p>

<p style="padding: 1rem; background: #f9fafb; border-left: 3px solid #10b981; margin: 1rem 0;">
  <strong>Solution:</strong><br>
  Step 1: Group x and y terms<br>
  (x² − 4x) + (y² + 6y) = −9<br><br>
  Step 2: Complete the square for x<br>
  Half of −4 is −2, square it: (−2)² = 4<br>
  (x² − 4x + 4) + (y² + 6y) = −9 + 4<br><br>
  Step 3: Complete the square for y<br>
  Half of 6 is 3, square it: 3² = 9<br>
  (x² − 4x + 4) + (y² + 6y + 9) = −9 + 4 + 9<br><br>
  Step 4: Factor<br>
  <strong>(x − 2)² + (y + 3)² = 4</strong><br><br>
  Center: (2, −3), Radius: 2
</p>

<h3>Ellipse Basics</h3>

<p>An <strong>ellipse</strong> is a stretched circle. It has two axes: a longer one (major axis) and a shorter one (minor axis).</p>

<h4>Standard Form of an Ellipse</h4>

<p style="font-size: 1.1rem; text-align: center; padding: 1rem; background: #faf5ff; border: 2px solid #9333ea; border-radius: 8px; margin: 1rem 0;">
  <strong>(x − h)²/a² + (y − k)²/b² = 1</strong>
</p>

<ul style="line-height: 1.8;">
  <li><strong>(h, k)</strong> = center of the ellipse</li>
  <li><strong>a</strong> = semi-major axis (longer radius)</li>
  <li><strong>b</strong> = semi-minor axis (shorter radius)</li>
</ul>

<div style="text-align: center; margin: 1.5rem 0;">
${generateEllipseDiagram()}
</div>

<h4>Example 4: Ellipse Center and Axes</h4>

<p><strong>Problem:</strong> What is the center of the ellipse (x − 1)²/25 + (y + 2)²/9 = 1?</p>

<p style="padding: 1rem; background: #f9fafb; border-left: 3px solid #10b981; margin: 1rem 0;">
  <strong>Solution:</strong><br>
  Compare to (x − h)²/a² + (y − k)²/b² = 1<br><br>
  (x − 1)² means h = 1<br>
  (y + 2)² means k = −2<br><br>
  <strong>Center: (1, −2)</strong><br>
  Note: a² = 25 so a = 5, b² = 9 so b = 3
</p>

<h3>Hyperbola Basics (Brief Overview)</h3>

<p>A <strong>hyperbola</strong> has two separate curves that open outward. The equation looks similar to an ellipse, but with a minus sign.</p>

<h4>Standard Form of a Hyperbola</h4>

<p style="font-size: 1.1rem; text-align: center; padding: 1rem; background: #fef2f2; border: 2px solid #dc2626; border-radius: 8px; margin: 1rem 0;">
  <strong>(x − h)²/a² − (y − k)²/b² = 1</strong> (opens left-right)<br>
  or<br>
  <strong>(y − k)²/a² − (x − h)²/b² = 1</strong> (opens up-down)
</p>

<div style="text-align: center; margin: 1.5rem 0;">
${generateHyperbolaDiagram()}
</div>

<div style="background: #eff6ff; padding: 0.8rem 1rem; margin: 1rem 0; border-left: 3px solid #3b82f6;">
  <p style="margin: 0 0 0.4rem 0; font-weight: 600; font-size: 0.9rem; color: #1e40af;">🔑 Quick Recognition:</p>
  <p style="margin: 0; font-size: 0.9rem; line-height: 1.5; color: #1e3a8a;">
    • <strong>Circle:</strong> x² + y² (both positive, same coefficients)<br>
    • <strong>Ellipse:</strong> x²/a² + y²/b² = 1 (both positive, different denominators)<br>
    • <strong>Hyperbola:</strong> x²/a² − y²/b² = 1 (one is negative!)
  </p>
</div>

<h3>Summary Table</h3>

<table style="width: 100%; border-collapse: collapse; margin: 1.5rem 0; font-size: 0.85rem;">
  <tr style="border-bottom: 1px solid #e5e7eb;">
    <th style="padding: 0.5rem 0.75rem; text-align: left; font-weight: 600; color: #6b7280; font-size: 0.8rem;">Shape</th>
    <th style="padding: 0.5rem 0.75rem; text-align: left; font-weight: 600; color: #6b7280; font-size: 0.8rem;">Equation</th>
    <th style="padding: 0.5rem 0.75rem; text-align: left; font-weight: 600; color: #6b7280; font-size: 0.8rem;">Center</th>
  </tr>
  <tr>
    <td style="padding: 0.5rem 0.75rem; color: #374151;">Circle</td>
    <td style="padding: 0.5rem 0.75rem; color: #374151;">(x−h)² + (y−k)² = r²</td>
    <td style="padding: 0.5rem 0.75rem; color: #6b7280;">(h, k)</td>
  </tr>
  <tr>
    <td style="padding: 0.5rem 0.75rem; color: #374151;">Ellipse</td>
    <td style="padding: 0.5rem 0.75rem; color: #374151;">(x−h)²/a² + (y−k)²/b² = 1</td>
    <td style="padding: 0.5rem 0.75rem; color: #6b7280;">(h, k)</td>
  </tr>
  <tr>
    <td style="padding: 0.5rem 0.75rem; color: #374151;">Hyperbola</td>
    <td style="padding: 0.5rem 0.75rem; color: #374151;">(x−h)²/a² − (y−k)²/b² = 1</td>
    <td style="padding: 0.5rem 0.75rem; color: #6b7280;">(h, k)</td>
  </tr>
</table>

<div style="background: #f0fdf4; padding: 1rem 1.5rem; border-radius: 8px; margin: 1.5rem 0; border: 1px solid #10b981;">
  <h4 style="margin: 0 0 0.75rem 0; color: #065f46;">✓ Key Takeaways</h4>
  <ul style="list-style-type: none; padding-left: 0; margin: 0; line-height: 1.8;">
    <li>✓ Circle: (x−h)² + (y−k)² = r²</li>
    <li>✓ Signs flip: (x−3) means center x = 3, (y+2) means center y = −2</li>
    <li>✓ Complete the square to convert to standard form</li>
    <li>✓ Ellipse has +, Hyperbola has − (minus sign!)</li>
    <li>✓ Center is always (h, k) for all conic sections</li>
  </ul>
</div>
`;

async function rebuildCirclesLesson() {
  console.log('╔══════════════════════════════════════════════════════════╗');
  console.log('║   PHASE 4: Rebuilding Lesson 2.5 - Circles & Ellipses   ║');
  console.log('╚══════════════════════════════════════════════════════════╝\n');

  const { data: lesson, error } = await supabase
    .from('lessons')
    .update({
      content: completeLesson,
      updated_at: new Date().toISOString()
    })
    .eq('lesson_key', 'circles-ellipses')
    .select()
    .single();

  if (error) {
    console.error('❌ Error:', error);
    return false;
  }

  console.log('✅ Lesson 2.5 rebuilt successfully!\n');
  console.log('📊 New Content:');
  console.log(`  ✅ Length: ${completeLesson.length} chars`);
  console.log('  ✅ Sections: Circles, Completing Square, Ellipses, Hyperbolas');
  console.log('  ✅ Diagrams: 3 perfect SVG diagrams');
  console.log('  ✅ Examples: 4 worked examples');
  console.log('  ✅ Tables: 1 comparison table');
  console.log('  ✅ Key Idea boxes: 3 boxes');
  console.log('  ✅ Formula summary box');
  console.log('\n📝 Next: Creating quiz for Lesson 2.5...\n');

  return true;
}

rebuildCirclesLesson().catch(err => {
  console.error('❌ Error:', err);
});
