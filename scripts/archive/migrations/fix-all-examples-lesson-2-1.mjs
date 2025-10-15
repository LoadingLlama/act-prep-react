/**
 * Fix ALL Examples in Lesson 2.1 with ACT-Authentic Diagrams
 * - Example 1: Vertical angles (70°)
 * - Example 2: Adjacent angles (55°)
 * - Example 3: Parallel lines (60°)
 * - Reduced whitespace
 */

import { createClient } from '@supabase/supabase-js';
import dotenv from 'dotenv';

dotenv.config();

const supabase = createClient(
  process.env.REACT_APP_SUPABASE_URL,
  process.env.SUPABASE_SERVICE_ROLE_KEY
);

// ============================================================================
// GEOMETRY UTILITIES
// ============================================================================

function polarToCartesian(cx, cy, radius, angleInDegrees) {
  const radians = angleInDegrees * (Math.PI / 180);
  return {
    x: cx + radius * Math.cos(radians),
    y: cy + radius * Math.sin(radians)
  };
}

function lineIntersection(x1, y1, x2, y2, x3, y3, x4, y4) {
  const denominator = (x1 - x2) * (y3 - y4) - (y1 - y2) * (x3 - x4);
  if (Math.abs(denominator) < 0.0001) return null;
  const t = ((x1 - x3) * (y3 - y4) - (y1 - y3) * (x3 - x4)) / denominator;
  return { x: x1 + t * (x2 - x1), y: y1 + t * (y2 - y1) };
}

// ============================================================================
// DIAGRAM GENERATORS - COMPACT VERSIONS
// ============================================================================

/**
 * Generate compact ACT-authentic intersecting lines diagram for vertical angles
 */
function generateVerticalAnglesDiagram(givenAngle) {
  const cx = 200;
  const cy = 120;
  const lineLength = 100;

  // Calculate line angles
  const angle1 = givenAngle;
  const p1 = polarToCartesian(cx, cy, lineLength, -angle1);
  const p2 = polarToCartesian(cx, cy, lineLength, 180 - angle1);
  const p3 = polarToCartesian(cx, cy, lineLength, 0);
  const p4 = polarToCartesian(cx, cy, lineLength, 180);

  // Arc for given angle (right side)
  const arcRadius = 25;
  const arcStart = polarToCartesian(cx, cy, arcRadius, 0);
  const arcEnd = polarToCartesian(cx, cy, arcRadius, -angle1);

  // Arc for vertical angle (left side)
  const vertArcStart = polarToCartesian(cx, cy, arcRadius, 180);
  const vertArcEnd = polarToCartesian(cx, cy, arcRadius, 180 - angle1);

  // Label positions
  const givenLabelPos = polarToCartesian(cx, cy, 45, -angle1 / 2);
  const vertLabelPos = polarToCartesian(cx, cy, 45, 180 - angle1 / 2);

  return `<svg width="400" height="240" viewBox="0 0 400 240" xmlns="http://www.w3.org/2000/svg" style="background: white; max-width: 100%; height: auto;">
    <line x1="${p1.x.toFixed(1)}" y1="${p1.y.toFixed(1)}" x2="${p2.x.toFixed(1)}" y2="${p2.y.toFixed(1)}" stroke="#000" stroke-width="2"/>
    <line x1="${p3.x.toFixed(1)}" y1="${p3.y.toFixed(1)}" x2="${p4.x.toFixed(1)}" y2="${p4.y.toFixed(1)}" stroke="#000" stroke-width="2"/>
    <circle cx="${cx}" cy="${cy}" r="3" fill="#000"/>
    <path d="M ${arcStart.x.toFixed(1)},${arcStart.y.toFixed(1)} A ${arcRadius},${arcRadius} 0 0,0 ${arcEnd.x.toFixed(1)},${arcEnd.y.toFixed(1)}" stroke="#000" fill="none" stroke-width="1.5"/>
    <path d="M ${vertArcStart.x.toFixed(1)},${vertArcStart.y.toFixed(1)} A ${arcRadius},${arcRadius} 0 0,0 ${vertArcEnd.x.toFixed(1)},${vertArcEnd.y.toFixed(1)}" stroke="#000" fill="none" stroke-width="1.5"/>
    <text x="${givenLabelPos.x.toFixed(1)}" y="${givenLabelPos.y.toFixed(1)}" font-family="Times New Roman, serif" font-size="17" fill="#000" text-anchor="middle" dominant-baseline="middle">${givenAngle}°</text>
    <text x="${vertLabelPos.x.toFixed(1)}" y="${vertLabelPos.y.toFixed(1)}" font-family="Times New Roman, serif" font-size="19" font-style="italic" fill="#000" text-anchor="middle" dominant-baseline="middle">?</text>
</svg>`;
}

/**
 * Generate compact ACT-authentic intersecting lines diagram for adjacent angles
 */
function generateAdjacentAnglesDiagram(givenAngle) {
  const cx = 200;
  const cy = 120;
  const lineLength = 100;

  const angle1 = givenAngle;
  const p1 = polarToCartesian(cx, cy, lineLength, -angle1);
  const p2 = polarToCartesian(cx, cy, lineLength, 180 - angle1);
  const p3 = polarToCartesian(cx, cy, lineLength, 0);
  const p4 = polarToCartesian(cx, cy, lineLength, 180);

  // Arc for given angle (right side, acute)
  const arcRadius1 = 25;
  const arcStart1 = polarToCartesian(cx, cy, arcRadius1, 0);
  const arcEnd1 = polarToCartesian(cx, cy, arcRadius1, -angle1);

  // Arc for adjacent angle (left side, obtuse)
  const arcRadius2 = 30;
  const adjArcStart = polarToCartesian(cx, cy, arcRadius2, -angle1);
  const adjArcEnd = polarToCartesian(cx, cy, arcRadius2, 180);

  // Label positions
  const givenLabelPos = polarToCartesian(cx, cy, 45, -angle1 / 2);
  const adjLabelPos = polarToCartesian(cx, cy, 55, (-angle1 + 180) / 2);

  return `<svg width="400" height="240" viewBox="0 0 400 240" xmlns="http://www.w3.org/2000/svg" style="background: white; max-width: 100%; height: auto;">
    <line x1="${p1.x.toFixed(1)}" y1="${p1.y.toFixed(1)}" x2="${p2.x.toFixed(1)}" y2="${p2.y.toFixed(1)}" stroke="#000" stroke-width="2"/>
    <line x1="${p3.x.toFixed(1)}" y1="${p3.y.toFixed(1)}" x2="${p4.x.toFixed(1)}" y2="${p4.y.toFixed(1)}" stroke="#000" stroke-width="2"/>
    <circle cx="${cx}" cy="${cy}" r="3" fill="#000"/>
    <path d="M ${arcStart1.x.toFixed(1)},${arcStart1.y.toFixed(1)} A ${arcRadius1},${arcRadius1} 0 0,0 ${arcEnd1.x.toFixed(1)},${arcEnd1.y.toFixed(1)}" stroke="#000" fill="none" stroke-width="1.5"/>
    <path d="M ${adjArcStart.x.toFixed(1)},${adjArcStart.y.toFixed(1)} A ${arcRadius2},${arcRadius2} 0 1,1 ${adjArcEnd.x.toFixed(1)},${adjArcEnd.y.toFixed(1)}" stroke="#000" fill="none" stroke-width="1.5"/>
    <text x="${givenLabelPos.x.toFixed(1)}" y="${givenLabelPos.y.toFixed(1)}" font-family="Times New Roman, serif" font-size="17" fill="#000" text-anchor="middle" dominant-baseline="middle">${givenAngle}°</text>
    <text x="${adjLabelPos.x.toFixed(1)}" y="${adjLabelPos.y.toFixed(1)}" font-family="Times New Roman, serif" font-size="19" font-style="italic" fill="#000" text-anchor="middle" dominant-baseline="middle">?</text>
</svg>`;
}

/**
 * Generate compact ACT-authentic parallel lines diagram
 */
function generateParallelLinesDiagram(givenAngle, unknownVariable = 'x') {
  const unknownAngle = 180 - givenAngle;

  const line1Y = 120;
  const line2Y = 240;
  const lineStart = 50;
  const lineEnd = 450;

  const transX1 = 130;
  const transY1 = 60;
  const dy = 220;
  const slope = Math.tan(givenAngle * Math.PI / 180);
  const transX2 = transX1 + dy / slope;
  const transY2 = 280;

  const int1 = lineIntersection(lineStart, line1Y, lineEnd, line1Y, transX1, transY1, transX2, transY2);
  const int2 = lineIntersection(lineStart, line2Y, lineEnd, line2Y, transX1, transY1, transX2, transY2);

  const givenLabelPos = polarToCartesian(int1.x, int1.y, 50, givenAngle / 2);
  const transUpAngle = Math.atan2(transY1 - int2.y, transX1 - int2.x) * (180 / Math.PI);
  const unknownLabelPos = polarToCartesian(int2.x, int2.y, 50, (transUpAngle + 360) / 2 + 180);

  const transDownAngle = Math.atan2(transY2 - int1.y, transX2 - int1.x) * (180 / Math.PI);
  const transUpAngle2 = Math.atan2(transY1 - int2.y, transX1 - int2.x) * (180 / Math.PI);

  const givenArcStart = polarToCartesian(int1.x, int1.y, 22, 0);
  const givenArcEnd = polarToCartesian(int1.x, int1.y, 22, transDownAngle);
  const unknownArcStart = polarToCartesian(int2.x, int2.y, 22, transUpAngle2);
  const unknownArcEnd = polarToCartesian(int2.x, int2.y, 22, 0);

  return `<svg width="500" height="340" viewBox="0 0 500 340" xmlns="http://www.w3.org/2000/svg" style="background: white; max-width: 100%; height: auto;">
    <line x1="${lineStart}" y1="${line1Y}" x2="${lineEnd}" y2="${line1Y}" stroke="#000" stroke-width="2"/>
    <line x1="${lineStart}" y1="${line2Y}" x2="${lineEnd}" y2="${line2Y}" stroke="#000" stroke-width="2"/>
    <line x1="${transX1.toFixed(1)}" y1="${transY1}" x2="${transX2.toFixed(1)}" y2="${transY2}" stroke="#000" stroke-width="2"/>
    <path d="M ${givenArcStart.x.toFixed(1)},${givenArcStart.y.toFixed(1)} A 22,22 0 0,1 ${givenArcEnd.x.toFixed(1)},${givenArcEnd.y.toFixed(1)}" stroke="#000" fill="none" stroke-width="1.5"/>
    <path d="M ${unknownArcStart.x.toFixed(1)},${unknownArcStart.y.toFixed(1)} A 22,22 0 0,1 ${unknownArcEnd.x.toFixed(1)},${unknownArcEnd.y.toFixed(1)}" stroke="#000" fill="none" stroke-width="1.5"/>
    <text x="${givenLabelPos.x.toFixed(1)}" y="${givenLabelPos.y.toFixed(1)}" font-family="Times New Roman, serif" font-size="17" fill="#000" text-anchor="middle" dominant-baseline="middle">${givenAngle}°</text>
    <text x="${unknownLabelPos.x.toFixed(1)}" y="${unknownLabelPos.y.toFixed(1)}" font-family="Times New Roman, serif" font-size="19" font-style="italic" fill="#000" text-anchor="middle" dominant-baseline="middle">${unknownVariable}°</text>
</svg>`;
}

// ============================================================================
// FIX ALL EXAMPLES
// ============================================================================

async function fixAllExamples() {
  console.log('🔧 Fixing ALL examples in Lesson 2.1 with ACT-authentic diagrams...\n');

  const { data: lesson, error: fetchError } = await supabase
    .from('lessons')
    .select('*')
    .eq('lesson_key', 'geometry-angles')
    .single();

  if (fetchError) {
    console.error('❌ Error fetching lesson:', fetchError);
    return false;
  }

  let content = lesson.content;

  // ========================================
  // EXAMPLE 1: Vertical Angles (70°)
  // ========================================
  console.log('📝 Updating Example 1 (Vertical Angles - 70°)...');

  const example1Start = content.indexOf('<h4>Example 1</h4>');
  if (example1Start !== -1) {
    const example1End = content.indexOf('<h4>Example 2</h4>', example1Start);
    const example1Section = content.substring(example1Start, example1End);

    // Find the SVG
    const svg1Start = example1Section.indexOf('<svg');
    const svg1End = example1Section.indexOf('</svg>') + 6;

    if (svg1Start !== -1 && svg1End > svg1Start) {
      const newDiagram1 = generateVerticalAnglesDiagram(70);

      // Also update the div style to reduce margin
      const oldDivStyle = 'text-align: center; margin: 1.5rem 0;';
      const newDivStyle = 'text-align: center; margin: 0.75rem 0;';

      const before1 = content.substring(0, example1Start);
      const after1 = content.substring(example1End);
      const updatedExample1 = example1Section
        .substring(0, svg1Start) + newDiagram1 + example1Section.substring(svg1End)
        .replace(oldDivStyle, newDivStyle);

      content = before1 + updatedExample1 + after1;
      console.log('✅ Example 1 updated');
    }
  }

  // ========================================
  // EXAMPLE 2: Adjacent Angles (55°)
  // ========================================
  console.log('📝 Updating Example 2 (Adjacent Angles - 55°)...');

  const example2Start = content.indexOf('<h4>Example 2</h4>');
  if (example2Start !== -1) {
    const example2End = content.indexOf('<h4>Example 3</h4>', example2Start);
    const example2Section = content.substring(example2Start, example2End);

    // Find the SVG
    const svg2Start = example2Section.indexOf('<svg');
    const svg2End = example2Section.indexOf('</svg>') + 6;

    if (svg2Start !== -1 && svg2End > svg2Start) {
      const newDiagram2 = generateAdjacentAnglesDiagram(55);

      const before2 = content.substring(0, example2Start);
      const after2 = content.substring(example2End);
      const updatedExample2 = example2Section
        .substring(0, svg2Start) + newDiagram2 + example2Section.substring(svg2End)
        .replace('text-align: center; margin: 1.5rem 0;', 'text-align: center; margin: 0.75rem 0;');

      content = before2 + updatedExample2 + after2;
      console.log('✅ Example 2 updated');
    }
  }

  // ========================================
  // EXAMPLE 3: Parallel Lines (60°)
  // ========================================
  console.log('📝 Updating Example 3 (Parallel Lines - 60°)...');

  const example3Start = content.indexOf('<h4>Example 3</h4>');
  if (example3Start !== -1) {
    const example3End = content.indexOf('<h4>Key Takeaway</h4>', example3Start);
    const example3Section = content.substring(example3Start, example3End);

    // Find the SVG
    const svg3Start = example3Section.indexOf('<svg');
    const svg3End = example3Section.indexOf('</svg>') + 6;

    if (svg3Start !== -1 && svg3End > svg3Start) {
      const newDiagram3 = generateParallelLinesDiagram(60, 'x');

      const before3 = content.substring(0, example3Start);
      const after3 = content.substring(example3End);
      const updatedExample3 = example3Section
        .substring(0, svg3Start) + newDiagram3 + example3Section.substring(svg3End)
        .replace('text-align: center; margin: 1.5rem 0;', 'text-align: center; margin: 0.75rem 0;');

      content = before3 + updatedExample3 + after3;
      console.log('✅ Example 3 updated');
    }
  }

  // ========================================
  // UPDATE DATABASE
  // ========================================
  console.log('\n💾 Saving changes to database...');

  const { error: updateError } = await supabase
    .from('lessons')
    .update({
      content: content,
      updated_at: new Date().toISOString()
    })
    .eq('id', lesson.id);

  if (updateError) {
    console.error('❌ Error updating lesson:', updateError);
    return false;
  }

  console.log('✅ All examples updated successfully!\n');
  console.log('📊 Summary:');
  console.log('  ✅ Example 1: ACT-authentic vertical angles diagram (70°)');
  console.log('  ✅ Example 2: ACT-authentic adjacent angles diagram (55°)');
  console.log('  ✅ Example 3: ACT-authentic parallel lines diagram (60°)');
  console.log('  ✅ Reduced whitespace (margin: 1.5rem → 0.75rem)');
  console.log('  ✅ Compact diagram sizes for better spacing\n');

  return true;
}

// ============================================================================
// MAIN
// ============================================================================

async function main() {
  console.log('🚀 Starting ACT-authentic diagram updates for all examples...\n');
  console.log('='.repeat(70));
  console.log('\n');

  const success = await fixAllExamples();

  console.log('='.repeat(70));
  if (success) {
    console.log('\n✨ All done! Test in your React app.\n');
  } else {
    console.log('\n❌ Some errors occurred. Check logs above.\n');
  }
}

main();
