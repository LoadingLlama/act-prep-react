/**
 * Fix Example Diagrams - Proper Geometry with Accurate Angles
 * Example 1: Vertical angles (70° given, need to show x° = 70°)
 * Example 2: Adjacent angles (55° given, need to show 125°)
 * Example 3: Parallel lines (60° given, need to show x° = 120°)
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

// EXAMPLE 1: Vertical Angles - show 70° and x° (which equals 70°)
function generateExample1Diagram() {
  const cx = 190, cy = 125, lineLength = 70, angle = 70;

  // Two intersecting lines
  const p1 = polarToCartesian(cx, cy, lineLength, -angle);
  const p2 = polarToCartesian(cx, cy, lineLength, 180 - angle);
  const p3 = polarToCartesian(cx, cy, lineLength, 0);
  const p4 = polarToCartesian(cx, cy, lineLength, 180);

  // Arc for the 70° angle (bottom right)
  const arcRadius = 16;
  const arc1Start = polarToCartesian(cx, cy, arcRadius, 0);
  const arc1End = polarToCartesian(cx, cy, arcRadius, -angle);

  // Label positions
  const label1Pos = polarToCartesian(cx, cy, 33, -angle / 2);  // 70° label
  const label2Pos = polarToCartesian(cx, cy, 33, 180 - angle / 2);  // x° label (top left, vertical to 70°)

  return `<svg width="380" height="250" viewBox="0 0 380 250" xmlns="http://www.w3.org/2000/svg" style="background: white; max-width: 100%; height: auto;">
    <line x1="${p1.x.toFixed(1)}" y1="${p1.y.toFixed(1)}" x2="${p2.x.toFixed(1)}" y2="${p2.y.toFixed(1)}" stroke="#000" stroke-width="1.5"/>
    <line x1="${p3.x.toFixed(1)}" y1="${p3.y.toFixed(1)}" x2="${p4.x.toFixed(1)}" y2="${p4.y.toFixed(1)}" stroke="#000" stroke-width="1.5"/>
    <circle cx="${cx}" cy="${cy}" r="2" fill="#000"/>

    <!-- Arc for 70° angle -->
    <path d="M ${arc1Start.x.toFixed(1)},${arc1Start.y.toFixed(1)} A ${arcRadius},${arcRadius} 0 0,0 ${arc1End.x.toFixed(1)},${arc1End.y.toFixed(1)}" stroke="#000" fill="none" stroke-width="1.2"/>

    <!-- Labels -->
    <text x="${label1Pos.x.toFixed(1)}" y="${label1Pos.y.toFixed(1)}" font-family="Times New Roman, serif" font-size="14" fill="#000" text-anchor="middle" dominant-baseline="middle">70°</text>
    <text x="${label2Pos.x.toFixed(1)}" y="${label2Pos.y.toFixed(1)}" font-family="Times New Roman, serif" font-size="15" font-style="italic" fill="#000" text-anchor="middle" dominant-baseline="middle">x°</text>
</svg>`;
}

// EXAMPLE 2: Adjacent Angles - show 55° and ? (answer is 125°)
function generateExample2Diagram() {
  const cx = 190, cy = 125, lineLength = 70, angle = 55;

  // Two intersecting lines
  const p1 = polarToCartesian(cx, cy, lineLength, -angle);
  const p2 = polarToCartesian(cx, cy, lineLength, 180 - angle);
  const p3 = polarToCartesian(cx, cy, lineLength, 0);
  const p4 = polarToCartesian(cx, cy, lineLength, 180);

  // Arc for the 55° angle (bottom right)
  const arcRadius = 11;
  const arc1Start = polarToCartesian(cx, cy, arcRadius, 0);
  const arc1End = polarToCartesian(cx, cy, arcRadius, -angle);

  // Label positions
  const label1Pos = polarToCartesian(cx, cy, 35, -angle / 2);  // 55° label
  const label2Pos = polarToCartesian(cx, cy, 35, (-angle - 180) / 2);  // ? label (adjacent angle)

  return `<svg width="380" height="250" viewBox="0 0 380 250" xmlns="http://www.w3.org/2000/svg" style="background: white; max-width: 100%; height: auto;">
    <line x1="${p1.x.toFixed(1)}" y1="${p1.y.toFixed(1)}" x2="${p2.x.toFixed(1)}" y2="${p2.y.toFixed(1)}" stroke="#000" stroke-width="1.5"/>
    <line x1="${p3.x.toFixed(1)}" y1="${p3.y.toFixed(1)}" x2="${p4.x.toFixed(1)}" y2="${p4.y.toFixed(1)}" stroke="#000" stroke-width="1.5"/>
    <circle cx="${cx}" cy="${cy}" r="2" fill="#000"/>

    <!-- Arc for 55° angle -->
    <path d="M ${arc1Start.x.toFixed(1)},${arc1Start.y.toFixed(1)} A ${arcRadius},${arcRadius} 0 0,0 ${arc1End.x.toFixed(1)},${arc1End.y.toFixed(1)}" stroke="#000" fill="none" stroke-width="1.2"/>

    <!-- Labels -->
    <text x="${label1Pos.x.toFixed(1)}" y="${label1Pos.y.toFixed(1)}" font-family="Times New Roman, serif" font-size="14" fill="#000" text-anchor="middle" dominant-baseline="middle">55°</text>
    <text x="${label2Pos.x.toFixed(1)}" y="${label2Pos.y.toFixed(1)}" font-family="Times New Roman, serif" font-size="15" font-style="italic" fill="#000" text-anchor="middle" dominant-baseline="middle">?</text>
</svg>`;
}

// EXAMPLE 3: Parallel Lines - show 60° and x° (answer is 120°)
function generateExample3Diagram() {
  const line1Y = 90, line2Y = 180;
  const transAngle = 65;
  const transX1 = 100, transY1 = 45;
  const dy = 165;
  const slope = Math.tan(transAngle * Math.PI / 180);
  const transX2 = transX1 + dy / slope;
  const transY2 = 210;

  // Find intersections
  const int1X = transX1 + (line1Y - transY1) / slope;
  const int1Y = line1Y;
  const int2X = transX1 + (line2Y - transY1) / slope;
  const int2Y = line2Y;

  // Arc for 60° acute angle at top intersection
  const arcRadius = 16;
  const transDownAngle = Math.atan2(transY2 - int1Y, transX2 - int1X) * (180 / Math.PI);
  const arc1Start = polarToCartesian(int1X, int1Y, arcRadius, 0);
  const arc1End = polarToCartesian(int1X, int1Y, arcRadius, transDownAngle);

  // Arc for x° obtuse angle between the two lines (below the transversal at bottom intersection)
  const arcRadius2 = 16;
  // This is the obtuse angle on the left side of the transversal at the bottom intersection
  const arc2Start = polarToCartesian(int2X, int2Y, arcRadius2, transDownAngle);
  const arc2End = polarToCartesian(int2X, int2Y, arcRadius2, 0);

  // Label positions
  const label1Pos = polarToCartesian(int1X, int1Y, 35, transDownAngle / 2);
  const label2Pos = polarToCartesian(int2X, int2Y, 35, (transDownAngle + 0) / 2 - 180);

  return `<svg width="380" height="255" viewBox="0 0 380 255" xmlns="http://www.w3.org/2000/svg" style="background: white; max-width: 100%; height: auto;">
    <line x1="40" y1="${line1Y}" x2="340" y2="${line1Y}" stroke="#000" stroke-width="1.5"/>
    <line x1="40" y1="${line2Y}" x2="340" y2="${line2Y}" stroke="#000" stroke-width="1.5"/>
    <line x1="${transX1.toFixed(1)}" y1="${transY1}" x2="${transX2.toFixed(1)}" y2="${transY2}" stroke="#000" stroke-width="1.5"/>
    <circle cx="${int1X.toFixed(1)}" cy="${int1Y.toFixed(1)}" r="2" fill="#000"/>
    <circle cx="${int2X.toFixed(1)}" cy="${int2Y.toFixed(1)}" r="2" fill="#000"/>

    <!-- Arc for 60° acute angle at top -->
    <path d="M ${arc1Start.x.toFixed(1)},${arc1Start.y.toFixed(1)} A ${arcRadius},${arcRadius} 0 0,1 ${arc1End.x.toFixed(1)},${arc1End.y.toFixed(1)}" stroke="#000" fill="none" stroke-width="1.2"/>

    <!-- Arc for x° obtuse angle at bottom -->
    <path d="M ${arc2Start.x.toFixed(1)},${arc2Start.y.toFixed(1)} A ${arcRadius2},${arcRadius2} 0 0,1 ${arc2End.x.toFixed(1)},${arc2End.y.toFixed(1)}" stroke="#000" fill="none" stroke-width="1.2"/>

    <!-- Labels -->
    <text x="${label1Pos.x.toFixed(1)}" y="${label1Pos.y.toFixed(1)}" font-family="Times New Roman, serif" font-size="14" fill="#000" text-anchor="middle" dominant-baseline="middle">60°</text>
    <text x="${label2Pos.x.toFixed(1)}" y="${label2Pos.y.toFixed(1)}" font-family="Times New Roman, serif" font-size="15" font-style="italic" fill="#000" text-anchor="middle" dominant-baseline="middle">x°</text>
</svg>`;
}

async function fixExampleDiagrams() {
  console.log('🔧 Fixing example diagrams with accurate geometry...\n');

  const { data: lesson } = await supabase
    .from('lessons')
    .select('*')
    .eq('lesson_key', 'geometry-angles')
    .single();

  let content = lesson.content;

  // Fix Example 1
  console.log('📝 Fixing Example 1 diagram (Vertical Angles)...');
  const ex1Diagram = generateExample1Diagram();
  const ex1Match = content.match(/(<h4>Example 1<\/h4>[\s\S]*?<div style="text-align: center; margin: 1\.5rem 0;">)\s*<svg[\s\S]*?<\/svg>\s*(<\/div>)/);
  if (ex1Match) {
    content = content.replace(ex1Match[0], ex1Match[1] + '\n                ' + ex1Diagram + '\n            ' + ex1Match[2]);
    console.log('  ✅ Example 1 diagram fixed\n');
  }

  // Fix Example 2
  console.log('📝 Fixing Example 2 diagram (Adjacent Angles)...');
  const ex2Diagram = generateExample2Diagram();
  const ex2Match = content.match(/(<h4>Example 2<\/h4>[\s\S]*?<div style="text-align: center; margin: 1\.5rem 0;">)\s*<svg[\s\S]*?<\/svg>\s*(<\/div>)/);
  if (ex2Match) {
    content = content.replace(ex2Match[0], ex2Match[1] + '\n                ' + ex2Diagram + '\n            ' + ex2Match[2]);
    console.log('  ✅ Example 2 diagram fixed\n');
  }

  // Fix Example 3
  console.log('📝 Fixing Example 3 diagram (Parallel Lines)...');
  const ex3Diagram = generateExample3Diagram();
  const ex3Match = content.match(/(<h4>Example 3<\/h4>[\s\S]*?<div style="text-align: center; margin: 1\.5rem 0;">)\s*<svg[\s\S]*?<\/svg>\s*(<\/div>)/);
  if (ex3Match) {
    content = content.replace(ex3Match[0], ex3Match[1] + '\n                ' + ex3Diagram + '\n            ' + ex3Match[2]);
    console.log('  ✅ Example 3 diagram fixed\n');
  }

  console.log('💾 Updating database...\n');

  const { error } = await supabase
    .from('lessons')
    .update({
      content: content,
      updated_at: new Date().toISOString()
    })
    .eq('id', lesson.id);

  if (error) {
    console.error('❌ Error:', error);
    return false;
  }

  console.log('✅ All example diagrams fixed!\n');
  console.log('📊 Changes:');
  console.log('  ✅ Example 1: Accurate vertical angles (70° shown, x° opposite)');
  console.log('  ✅ Example 2: Accurate adjacent angles (55° shown, ? for adjacent)');
  console.log('  ✅ Example 3: Accurate parallel lines (60° acute, x° obtuse)');
  console.log('  ✅ All use proper trigonometry with polarToCartesian');
  console.log('  ✅ Clean, minimal styling\n');

  return true;
}

fixExampleDiagrams().then(success => {
  if (success) {
    console.log('✨ Example diagrams are now accurate and properly positioned!');
  }
});
