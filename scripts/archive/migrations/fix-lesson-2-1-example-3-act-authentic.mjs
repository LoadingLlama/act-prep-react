/**
 * Fix Example 3 in Lesson 2.1 with ACT-Authentic Diagram
 * Uses the new generator to create a perfect ACT-style parallel lines problem
 */

import { createClient } from '@supabase/supabase-js';
import dotenv from 'dotenv';

dotenv.config();

const supabase = createClient(
  process.env.REACT_APP_SUPABASE_URL,
  process.env.SUPABASE_SERVICE_ROLE_KEY
);

// Geometry utilities
function lineIntersection(x1, y1, x2, y2, x3, y3, x4, y4) {
  const denominator = (x1 - x2) * (y3 - y4) - (y1 - y2) * (x3 - x4);
  if (Math.abs(denominator) < 0.0001) return null;
  const t = ((x1 - x3) * (y3 - y4) - (y1 - y3) * (x3 - x4)) / denominator;
  return { x: x1 + t * (x2 - x1), y: y1 + t * (y2 - y1) };
}

function polarToCartesian(cx, cy, radius, angleInDegrees) {
  const radians = angleInDegrees * (Math.PI / 180);
  return {
    x: cx + radius * Math.cos(radians),
    y: cy + radius * Math.sin(radians)
  };
}

function generateACTDiagram(givenAngle = 60, unknownVariable = 'x') {
  const unknownAngle = 180 - givenAngle;

  const line1Y = 150;
  const line2Y = 300;
  const lineStart = 50;
  const lineEnd = 500;

  const transX1 = 150;
  const transY1 = 80;
  const dy = 280;
  const slope = Math.tan(givenAngle * Math.PI / 180);
  const transX2 = transX1 + dy / slope;
  const transY2 = 360;

  const int1 = lineIntersection(lineStart, line1Y, lineEnd, line1Y, transX1, transY1, transX2, transY2);
  const int2 = lineIntersection(lineStart, line2Y, lineEnd, line2Y, transX1, transY1, transX2, transY2);

  const givenLabelPos = polarToCartesian(int1.x, int1.y, 55, givenAngle / 2);
  const transUpAngle = Math.atan2(transY1 - int2.y, transX1 - int2.x) * (180 / Math.PI);
  const unknownLabelPos = polarToCartesian(int2.x, int2.y, 55, (transUpAngle + 360) / 2 + 180);

  const transDownAngle = Math.atan2(transY2 - int1.y, transX2 - int1.x) * (180 / Math.PI);
  const transUpAngle2 = Math.atan2(transY1 - int2.y, transX1 - int2.x) * (180 / Math.PI);

  const givenArcStart = polarToCartesian(int1.x, int1.y, 25, 0);
  const givenArcEnd = polarToCartesian(int1.x, int1.y, 25, transDownAngle);

  const unknownArcStart = polarToCartesian(int2.x, int2.y, 25, transUpAngle2);
  const unknownArcEnd = polarToCartesian(int2.x, int2.y, 25, 0);

  return `
<svg width="550" height="450" viewBox="0 0 550 450" xmlns="http://www.w3.org/2000/svg" style="background: white;">
    <line x1="${lineStart}" y1="${line1Y}" x2="${lineEnd}" y2="${line1Y}" stroke="#000" stroke-width="2"/>
    <line x1="${lineStart}" y1="${line2Y}" x2="${lineEnd}" y2="${line2Y}" stroke="#000" stroke-width="2"/>
    <line x1="${transX1.toFixed(1)}" y1="${transY1}" x2="${transX2.toFixed(1)}" y2="${transY2}" stroke="#000" stroke-width="2"/>
    <path d="M ${givenArcStart.x.toFixed(1)},${givenArcStart.y.toFixed(1)} A 25,25 0 0,1 ${givenArcEnd.x.toFixed(1)},${givenArcEnd.y.toFixed(1)}" stroke="#000" fill="none" stroke-width="1.5"/>
    <path d="M ${unknownArcStart.x.toFixed(1)},${unknownArcStart.y.toFixed(1)} A 25,25 0 0,1 ${unknownArcEnd.x.toFixed(1)},${unknownArcEnd.y.toFixed(1)}" stroke="#000" fill="none" stroke-width="1.5"/>
    <text x="${givenLabelPos.x.toFixed(1)}" y="${givenLabelPos.y.toFixed(1)}" font-family="Times New Roman, serif" font-size="17" fill="#000" text-anchor="middle" dominant-baseline="middle">${givenAngle}°</text>
    <text x="${unknownLabelPos.x.toFixed(1)}" y="${unknownLabelPos.y.toFixed(1)}" font-family="Times New Roman, serif" font-size="19" font-style="italic" fill="#000" text-anchor="middle" dominant-baseline="middle">${unknownVariable}°</text>
</svg>`.trim();
}

async function fixExample3() {
  console.log('🔧 Fixing Example 3 in Lesson 2.1 with ACT-authentic diagram...\n');

  // Generate the diagram
  const diagram = generateACTDiagram(60, 'x');

  // New Example 3 content with proper formatting
  const example3Content = `
<div class="example-box">
  <h3>Example 3: Finding Unknown Angles</h3>
  <p><strong>Problem:</strong> In the figure below, two parallel lines are cut by a transversal. What is the value of <em>x</em>?</p>

  <div class="diagram-container" style="text-align: center; margin: 20px 0;">
    ${diagram}
  </div>

  <p><strong>Solution:</strong></p>
  <p>The angle measuring 60° and the angle <em>x</em> are supplementary angles because they form a linear pair (they are on the same side of the transversal and add up to 180°).</p>

  <p>Therefore:</p>
  <p style="text-align: center; margin: 15px 0;">60° + <em>x</em> = 180°</p>
  <p style="text-align: center; margin: 15px 0;"><em>x</em> = 180° − 60° = <strong>120°</strong></p>

  <p><strong>Answer:</strong> <em>x</em> = 120°</p>
</div>
`.trim();

  // Update the database
  const { data: existingExample, error: fetchError } = await supabase
    .from('lesson_content')
    .select('*')
    .eq('lesson_id', '2.1')
    .eq('content_type', 'example')
    .eq('order_index', 3)
    .single();

  if (fetchError) {
    console.error('❌ Error fetching Example 3:', fetchError);
    return;
  }

  if (!existingExample) {
    console.error('❌ Example 3 not found');
    return;
  }

  console.log('Found Example 3:', existingExample.title);

  const { error: updateError } = await supabase
    .from('lesson_content')
    .update({
      content: example3Content,
      updated_at: new Date().toISOString()
    })
    .eq('id', existingExample.id);

  if (updateError) {
    console.error('❌ Error updating Example 3:', updateError);
    return;
  }

  console.log('✅ Example 3 updated successfully!');
  console.log('\n📊 Changes:');
  console.log('  - ACT-authentic diagram (black & white, serif font)');
  console.log('  - Solid lines (2px)');
  console.log('  - Small arcs to indicate angles');
  console.log('  - Variables (x°) for unknowns');
  console.log('  - Clean, minimal presentation');
  console.log('  - Fixed text formatting (no overflow)');
}

fixExample3();
