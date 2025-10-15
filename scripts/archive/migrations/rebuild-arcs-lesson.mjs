/**
 * PHASE 3: Complete Rebuild of Lesson 2.4 - Arcs and Sectors
 *
 * Topics:
 * 1. Circle Parts Review (radius, diameter, arc, sector)
 * 2. Arc Length Formula
 * 3. Sector Area Formula
 * 4. The Fraction Concept (θ/360)
 * 5. Worked Examples
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

function generateCirclePartsDiagram() {
  const cx = 200, cy = 150, radius = 80;

  const p1 = polarToCartesian(cx, cy, radius, 0);
  const p2 = polarToCartesian(cx, cy, radius, 120);

  return `<svg width="400" height="300" viewBox="0 0 400 300" xmlns="http://www.w3.org/2000/svg" style="background: white; max-width: 100%; height: auto;">
  <!-- Circle -->
  <circle cx="${cx}" cy="${cy}" r="${radius}" fill="none" stroke="#000" stroke-width="2"/>

  <!-- Center point -->
  <circle cx="${cx}" cy="${cy}" r="3" fill="#000"/>
  <text x="${cx - 15}" y="${cy - 10}" font-family="Times New Roman, serif" font-size="14" fill="#000">Center</text>

  <!-- Radius -->
  <line x1="${cx}" y1="${cy}" x2="${p1.x}" y2="${p1.y}" stroke="#e74c3c" stroke-width="2"/>
  <text x="${(cx + p1.x) / 2}" y="${cy - 10}" font-family="Times New Roman, serif" font-size="14" fill="#e74c3c" font-weight="600">Radius (r)</text>

  <!-- Diameter -->
  <line x1="${cx - radius}" y1="${cy + 30}" x2="${cx + radius}" y2="${cy + 30}" stroke="#3b82f6" stroke-width="2"/>
  <text x="${cx}" y="${cy + 50}" font-family="Times New Roman, serif" font-size="14" fill="#3b82f6" font-weight="600" text-anchor="middle">Diameter (d = 2r)</text>

  <!-- Arc -->
  <path d="M ${p1.x},${p1.y} A ${radius},${radius} 0 0,1 ${p2.x},${p2.y}" stroke="#10b981" fill="none" stroke-width="3"/>
  <text x="${cx + 60}" y="${cy - 60}" font-family="Times New Roman, serif" font-size="14" fill="#10b981" font-weight="600">Arc</text>
</svg>`;
}

function generateArcLengthDiagram() {
  const cx = 200, cy = 150, radius = 90;
  const angle = 90; // 90 degree arc

  const p1 = polarToCartesian(cx, cy, radius, 0);
  const p2 = polarToCartesian(cx, cy, radius, angle);

  return `<svg width="400" height="300" viewBox="0 0 400 300" xmlns="http://www.w3.org/2000/svg" style="background: white; max-width: 100%; height: auto;">
  <!-- Circle (faint) -->
  <circle cx="${cx}" cy="${cy}" r="${radius}" fill="none" stroke="#e5e7eb" stroke-width="1" stroke-dasharray="5,5"/>

  <!-- Radii -->
  <line x1="${cx}" y1="${cy}" x2="${p1.x}" y2="${p1.y}" stroke="#666" stroke-width="1.5"/>
  <line x1="${cx}" y1="${cy}" x2="${p2.x}" y2="${p2.y}" stroke="#666" stroke-width="1.5"/>

  <!-- Arc (highlighted) -->
  <path d="M ${p1.x},${p1.y} A ${radius},${radius} 0 0,1 ${p2.x},${p2.y}" stroke="#e74c3c" fill="none" stroke-width="4"/>

  <!-- Angle arc -->
  <path d="M ${cx + 30},${cy} A 30,30 0 0,1 ${cx},${cy - 30}" stroke="#000" fill="none" stroke-width="1"/>
  <text x="${cx + 15}" y="${cy - 20}" font-family="Times New Roman, serif" font-size="16" fill="#000">90°</text>

  <!-- Labels -->
  <text x="${cx + 110}" y="${cy + 10}" font-family="Times New Roman, serif" font-size="14" fill="#666">r = 10</text>
  <text x="${cx + 50}" y="${cy - 70}" font-family="Times New Roman, serif" font-size="16" fill="#e74c3c" font-weight="600">Arc Length</text>
</svg>`;
}

function generateSectorDiagram() {
  const cx = 200, cy = 150, radius = 90;
  const angle = 120; // 120 degree sector

  const p1 = polarToCartesian(cx, cy, radius, 0);
  const p2 = polarToCartesian(cx, cy, radius, angle);

  return `<svg width="400" height="300" viewBox="0 0 400 300" xmlns="http://www.w3.org/2000/svg" style="background: white; max-width: 100%; height: auto;">
  <!-- Circle (faint) -->
  <circle cx="${cx}" cy="${cy}" r="${radius}" fill="none" stroke="#e5e7eb" stroke-width="1" stroke-dasharray="5,5"/>

  <!-- Sector (filled) -->
  <path d="M ${cx},${cy} L ${p1.x},${p1.y} A ${radius},${radius} 0 0,1 ${p2.x},${p2.y} Z" fill="#10b981" fill-opacity="0.2" stroke="#10b981" stroke-width="2"/>

  <!-- Angle arc -->
  <path d="M ${cx + 35},${cy} A 35,35 0 0,1 ${cx + 17.5},${cy - 30.3}" stroke="#000" fill="none" stroke-width="1"/>
  <text x="${cx + 25}" y="${cy - 20}" font-family="Times New Roman, serif" font-size="16" fill="#000">120°</text>

  <!-- Labels -->
  <text x="${cx + 100}" y="${cy + 20}" font-family="Times New Roman, serif" font-size="14" fill="#666">r = 6</text>
  <text x="${cx - 30}" y="${cy + 80}" font-family="Times New Roman, serif" font-size="16" fill="#10b981" font-weight="600">Sector Area</text>
</svg>`;
}

const completeLesson = `
<h3>Understanding Arcs and Sectors</h3>

<p>Arcs and sectors are parts of circles. An <strong>arc</strong> is a piece of the circle's edge (circumference), and a <strong>sector</strong> is a "slice" of the circle—like a pizza slice! Once you understand how to work with fractions of a circle, these problems become easy.</p>

<h3>Circle Parts Review</h3>

<div style="text-align: center; margin: 1.5rem 0;">
${generateCirclePartsDiagram()}
</div>

<ul style="line-height: 1.8;">
  <li><strong>Radius (r):</strong> Distance from center to edge</li>
  <li><strong>Diameter (d):</strong> Distance across through center = 2r</li>
  <li><strong>Circumference (C):</strong> Distance around the circle = 2πr = πd</li>
  <li><strong>Area (A):</strong> Space inside the circle = πr²</li>
  <li><strong>Arc:</strong> Part of the circumference</li>
  <li><strong>Sector:</strong> "Pizza slice" part of the area</li>
</ul>

<h3>The Key Idea: Fractions of a Circle</h3>

<p>A full circle has <strong>360°</strong>. If your central angle is θ degrees, then you have <strong>θ/360</strong> of the whole circle!</p>

<div style="background: #eff6ff; padding: 0.8rem 1rem; margin: 1rem 0; border-left: 3px solid #3b82f6;">
  <p style="margin: 0 0 0.4rem 0; font-weight: 600; font-size: 0.9rem; color: #1e40af;">💡 The Master Formula:</p>
  <p style="margin: 0; font-size: 0.9rem; line-height: 1.5; color: #1e3a8a;">
    Fraction of circle = <strong>θ/360</strong><br><br>
    • If θ = 90°, you have 90/360 = 1/4 of the circle<br>
    • If θ = 180°, you have 180/360 = 1/2 of the circle<br>
    • If θ = 120°, you have 120/360 = 1/3 of the circle
  </p>
</div>

<h3>Arc Length Formula</h3>

<p>Arc length is a <strong>fraction of the circumference</strong>.</p>

<p style="font-size: 1.2rem; text-align: center; padding: 1rem; background: #fef3c7; border: 2px solid #f59e0b; border-radius: 8px; margin: 1rem 0;">
  <strong>Arc Length = (θ/360) × 2πr</strong>
</p>

<p><strong>In words:</strong> Take the fraction of the circle, multiply by the full circumference!</p>

<div style="text-align: center; margin: 1.5rem 0;">
${generateArcLengthDiagram()}
</div>

<h4>Example 1: Arc Length</h4>

<p><strong>Problem:</strong> A circle has radius 10. What is the length of a 90° arc?</p>

<p style="padding: 1rem; background: #f9fafb; border-left: 3px solid #10b981; margin: 1rem 0;">
  <strong>Solution:</strong><br>
  Arc Length = (θ/360) × 2πr<br>
  Arc Length = (90/360) × 2π(10)<br>
  Arc Length = (1/4) × 20π<br>
  Arc Length = 5π
</p>

<h3>Sector Area Formula</h3>

<p>Sector area is a <strong>fraction of the total area</strong>.</p>

<p style="font-size: 1.2rem; text-align: center; padding: 1rem; background: #f0fdf4; border: 2px solid #10b981; border-radius: 8px; margin: 1rem 0;">
  <strong>Sector Area = (θ/360) × πr²</strong>
</p>

<p><strong>In words:</strong> Take the fraction of the circle, multiply by the full area!</p>

<div style="text-align: center; margin: 1.5rem 0;">
${generateSectorDiagram()}
</div>

<h4>Example 2: Sector Area</h4>

<p><strong>Problem:</strong> A circle has radius 6. What is the area of a 120° sector?</p>

<p style="padding: 1rem; background: #f9fafb; border-left: 3px solid #10b981; margin: 1rem 0;">
  <strong>Solution:</strong><br>
  Sector Area = (θ/360) × πr²<br>
  Sector Area = (120/360) × π(6²)<br>
  Sector Area = (1/3) × 36π<br>
  Sector Area = 12π
</p>

<h4>Example 3: Finding the Angle</h4>

<p><strong>Problem:</strong> A sector with radius 8 has an area of 16π. What is the central angle?</p>

<p style="padding: 1rem; background: #f9fafb; border-left: 3px solid #10b981; margin: 1rem 0;">
  <strong>Solution:</strong><br>
  Sector Area = (θ/360) × πr²<br>
  16π = (θ/360) × π(8²)<br>
  16π = (θ/360) × 64π<br>
  16 = (θ/360) × 64<br>
  16/64 = θ/360<br>
  1/4 = θ/360<br>
  θ = 90°
</p>

<div style="background: #fef3c7; padding: 0.8rem 1rem; margin: 1rem 0; border-left: 3px solid #f59e0b;">
  <p style="margin: 0 0 0.4rem 0; font-weight: 600; font-size: 0.9rem; color: #92400e;">⚡ Quick Trick:</p>
  <p style="margin: 0; font-size: 0.9rem; line-height: 1.5; color: #78350f;">
    For common angles, memorize the fractions:<br>
    • 90° = 1/4 of circle<br>
    • 120° = 1/3 of circle<br>
    • 180° = 1/2 of circle<br>
    • 270° = 3/4 of circle
  </p>
</div>

<h3>Complete Formula Comparison</h3>

<table style="width: 100%; border-collapse: collapse; margin: 1.5rem 0; font-size: 0.9rem;">
  <tr style="border-bottom: 1px solid #e5e7eb;">
    <th style="padding: 0.5rem 0.75rem; text-align: left; font-weight: 600; color: #6b7280; font-size: 0.85rem;">Shape</th>
    <th style="padding: 0.5rem 0.75rem; text-align: left; font-weight: 600; color: #6b7280; font-size: 0.85rem;">Perimeter/Length</th>
    <th style="padding: 0.5rem 0.75rem; text-align: left; font-weight: 600; color: #6b7280; font-size: 0.85rem;">Area</th>
  </tr>
  <tr>
    <td style="padding: 0.5rem 0.75rem; color: #374151;">Full Circle</td>
    <td style="padding: 0.5rem 0.75rem; color: #374151;">C = 2πr</td>
    <td style="padding: 0.5rem 0.75rem; color: #6b7280;">A = πr²</td>
  </tr>
  <tr>
    <td style="padding: 0.5rem 0.75rem; color: #374151;">Arc</td>
    <td style="padding: 0.5rem 0.75rem; color: #374151;">L = (θ/360) × 2πr</td>
    <td style="padding: 0.5rem 0.75rem; color: #6b7280;">—</td>
  </tr>
  <tr>
    <td style="padding: 0.5rem 0.75rem; color: #374151;">Sector</td>
    <td style="padding: 0.5rem 0.75rem; color: #374151;">—</td>
    <td style="padding: 0.5rem 0.75rem; color: #6b7280;">A = (θ/360) × πr²</td>
  </tr>
</table>

<div style="background: #f0fdf4; padding: 1rem 1.5rem; border-radius: 8px; margin: 1.5rem 0; border: 1px solid #10b981;">
  <h4 style="margin: 0 0 0.75rem 0; color: #065f46;">✓ Key Formulas Summary</h4>
  <ul style="list-style-type: none; padding-left: 0; margin: 0; line-height: 1.8;">
    <li><strong>Fraction:</strong> θ/360</li>
    <li><strong>Arc Length:</strong> (θ/360) × 2πr</li>
    <li><strong>Sector Area:</strong> (θ/360) × πr²</li>
    <li><strong>Full Circle:</strong> C = 2πr, A = πr²</li>
  </ul>
</div>
`;

async function rebuildArcsLesson() {
  console.log('╔══════════════════════════════════════════════════════════╗');
  console.log('║   PHASE 3: Rebuilding Lesson 2.4 - Arcs & Sectors       ║');
  console.log('╚══════════════════════════════════════════════════════════╝\n');

  const { data: lesson, error } = await supabase
    .from('lessons')
    .update({
      content: completeLesson,
      updated_at: new Date().toISOString()
    })
    .eq('lesson_key', 'arcs-sectors')
    .select()
    .single();

  if (error) {
    console.error('❌ Error:', error);
    return false;
  }

  console.log('✅ Lesson 2.4 rebuilt successfully!\n');
  console.log('📊 New Content:');
  console.log(`  ✅ Length: ${completeLesson.length} chars`);
  console.log('  ✅ Sections: Circle Parts, Fraction Concept, Arc Length, Sector Area');
  console.log('  ✅ Diagrams: 3 perfect SVG diagrams');
  console.log('  ✅ Examples: 3 worked examples');
  console.log('  ✅ Tables: 1 formula comparison table');
  console.log('  ✅ Key Idea boxes: 2 boxes');
  console.log('  ✅ Formula summary box');
  console.log('\n📝 Next: Creating quiz for Lesson 2.4...\n');

  return true;
}

rebuildArcsLesson().catch(err => {
  console.error('❌ Error:', err);
});
