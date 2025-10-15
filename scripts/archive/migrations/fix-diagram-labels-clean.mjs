/**
 * Fix Diagram Labels - Make them clean and accurate
 * Remove blobby circles, use clean text with subtle backgrounds
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

function lineIntersection(x1, y1, x2, y2, x3, y3, x4, y4) {
  const denominator = (x1 - x2) * (y3 - y4) - (y1 - y2) * (x3 - x4);
  if (Math.abs(denominator) < 0.0001) return null;
  const t = ((x1 - x3) * (y3 - y4) - (y1 - y3) * (x3 - x4)) / denominator;
  return { x: x1 + t * (x2 - x1), y: y1 + t * (y2 - y1) };
}

// RULE 1: Clean Vertical Angles
function generateCleanRule1() {
  const cx = 250;
  const cy = 150;
  const lineLength = 80;
  const angle = 70;

  const p1 = polarToCartesian(cx, cy, lineLength, -angle);
  const p2 = polarToCartesian(cx, cy, lineLength, 180 - angle);
  const p3 = polarToCartesian(cx, cy, lineLength, 0);
  const p4 = polarToCartesian(cx, cy, lineLength, 180);

  const arcRadius = 22;

  // Acute angle 1 (bottom right) - BLUE
  const arc1Start = polarToCartesian(cx, cy, arcRadius, 0);
  const arc1End = polarToCartesian(cx, cy, arcRadius, -angle);

  // Obtuse angle 2 (top right) - RED
  const arc2Start = polarToCartesian(cx, cy, arcRadius, -angle);
  const arc2End = polarToCartesian(cx, cy, arcRadius, 180);

  // Acute angle 3 (top left) - BLUE
  const arc3Start = polarToCartesian(cx, cy, arcRadius, 180);
  const arc3End = polarToCartesian(cx, cy, arcRadius, 180 - angle);

  // Obtuse angle 4 (bottom left) - RED
  const arc4Start = polarToCartesian(cx, cy, arcRadius, 180 - angle);
  const arc4End = polarToCartesian(cx, cy, arcRadius, 360);

  // Label positions - farther out for clarity
  const label1Pos = polarToCartesian(cx, cy, 45, -angle / 2);
  const label2Pos = polarToCartesian(cx, cy, 45, (-angle + 180) / 2);
  const label3Pos = polarToCartesian(cx, cy, 45, 180 - angle / 2);
  const label4Pos = polarToCartesian(cx, cy, 45, (180 - angle + 360) / 2);

  return `<svg width="500" height="300" viewBox="0 0 500 300" xmlns="http://www.w3.org/2000/svg" style="background: white; max-width: 100%; height: auto;">
    <line x1="${p1.x.toFixed(1)}" y1="${p1.y.toFixed(1)}" x2="${p2.x.toFixed(1)}" y2="${p2.y.toFixed(1)}" stroke="#000" stroke-width="2"/>
    <line x1="${p3.x.toFixed(1)}" y1="${p3.y.toFixed(1)}" x2="${p4.x.toFixed(1)}" y2="${p4.y.toFixed(1)}" stroke="#000" stroke-width="2"/>
    <circle cx="${cx}" cy="${cy}" r="3" fill="#000"/>

    <!-- Arcs -->
    <path d="M ${arc1Start.x.toFixed(1)},${arc1Start.y.toFixed(1)} A ${arcRadius},${arcRadius} 0 0,0 ${arc1End.x.toFixed(1)},${arc1End.y.toFixed(1)}" stroke="#3b82f6" fill="none" stroke-width="2.5"/>
    <path d="M ${arc2Start.x.toFixed(1)},${arc2Start.y.toFixed(1)} A ${arcRadius},${arcRadius} 0 0,0 ${arc2End.x.toFixed(1)},${arc2End.y.toFixed(1)}" stroke="#ef4444" fill="none" stroke-width="2.5"/>
    <path d="M ${arc3Start.x.toFixed(1)},${arc3Start.y.toFixed(1)} A ${arcRadius},${arcRadius} 0 0,0 ${arc3End.x.toFixed(1)},${arc3End.y.toFixed(1)}" stroke="#3b82f6" fill="none" stroke-width="2.5"/>
    <path d="M ${arc4Start.x.toFixed(1)},${arc4Start.y.toFixed(1)} A ${arcRadius},${arcRadius} 0 0,0 ${arc4End.x.toFixed(1)},${arc4End.y.toFixed(1)}" stroke="#ef4444" fill="none" stroke-width="2.5"/>

    <!-- Clean Labels - just italic text, no circles -->
    <text x="${label1Pos.x.toFixed(1)}" y="${label1Pos.y.toFixed(1)}" font-family="Times New Roman, serif" font-size="20" font-style="italic" fill="#3b82f6" text-anchor="middle" dominant-baseline="middle" font-weight="bold">a</text>
    <text x="${label2Pos.x.toFixed(1)}" y="${label2Pos.y.toFixed(1)}" font-family="Times New Roman, serif" font-size="20" font-style="italic" fill="#ef4444" text-anchor="middle" dominant-baseline="middle" font-weight="bold">b</text>
    <text x="${label3Pos.x.toFixed(1)}" y="${label3Pos.y.toFixed(1)}" font-family="Times New Roman, serif" font-size="20" font-style="italic" fill="#3b82f6" text-anchor="middle" dominant-baseline="middle" font-weight="bold">a</text>
    <text x="${label4Pos.x.toFixed(1)}" y="${label4Pos.y.toFixed(1)}" font-family="Times New Roman, serif" font-size="20" font-style="italic" fill="#ef4444" text-anchor="middle" dominant-baseline="middle" font-weight="bold">b</text>
</svg>`;
}

// RULE 2: Clean Adjacent Angles
function generateCleanRule2() {
  const cx = 250;
  const cy = 150;
  const lineLength = 80;
  const angle = 55;

  const p1 = polarToCartesian(cx, cy, lineLength, -angle);
  const p2 = polarToCartesian(cx, cy, lineLength, 180 - angle);
  const p3 = polarToCartesian(cx, cy, lineLength, 0);
  const p4 = polarToCartesian(cx, cy, lineLength, 180);

  const arcRadius1 = 22;
  const arc1Start = polarToCartesian(cx, cy, arcRadius1, 0);
  const arc1End = polarToCartesian(cx, cy, arcRadius1, -angle);

  const arcRadius2 = 26;
  const arc2Start = polarToCartesian(cx, cy, arcRadius2, -angle);
  const arc2End = polarToCartesian(cx, cy, arcRadius2, 180);

  const label1Pos = polarToCartesian(cx, cy, 42, -angle / 2);
  // FIXED: Obtuse angle goes from -55° to 180° through -90° (top), midpoint at -117.5°
  const label2Pos = polarToCartesian(cx, cy, 48, (-angle - 180) / 2);

  return `<svg width="500" height="300" viewBox="0 0 500 300" xmlns="http://www.w3.org/2000/svg" style="background: white; max-width: 100%; height: auto;">
    <line x1="${p1.x.toFixed(1)}" y1="${p1.y.toFixed(1)}" x2="${p2.x.toFixed(1)}" y2="${p2.y.toFixed(1)}" stroke="#000" stroke-width="2"/>
    <line x1="${p3.x.toFixed(1)}" y1="${p3.y.toFixed(1)}" x2="${p4.x.toFixed(1)}" y2="${p4.y.toFixed(1)}" stroke="#000" stroke-width="2"/>
    <circle cx="${cx}" cy="${cy}" r="3" fill="#000"/>

    <!-- Arcs -->
    <path d="M ${arc1Start.x.toFixed(1)},${arc1Start.y.toFixed(1)} A ${arcRadius1},${arcRadius1} 0 0,0 ${arc1End.x.toFixed(1)},${arc1End.y.toFixed(1)}" stroke="#3b82f6" fill="none" stroke-width="2.5"/>
    <path d="M ${arc2Start.x.toFixed(1)},${arc2Start.y.toFixed(1)} A ${arcRadius2},${arcRadius2} 0 0,0 ${arc2End.x.toFixed(1)},${arc2End.y.toFixed(1)}" stroke="#ef4444" fill="none" stroke-width="2.5"/>

    <!-- Clean Labels - just italic text, no circles -->
    <text x="${label1Pos.x.toFixed(1)}" y="${label1Pos.y.toFixed(1)}" font-family="Times New Roman, serif" font-size="20" font-style="italic" fill="#3b82f6" text-anchor="middle" dominant-baseline="middle" font-weight="bold">a</text>
    <text x="${label2Pos.x.toFixed(1)}" y="${label2Pos.y.toFixed(1)}" font-family="Times New Roman, serif" font-size="20" font-style="italic" fill="#ef4444" text-anchor="middle" dominant-baseline="middle" font-weight="bold">b</text>
</svg>`;
}

// PARALLEL LINES: Clean labels
function generateCleanParallel() {
  const line1Y = 100;
  const line2Y = 200;
  const lineStart = 50;
  const lineEnd = 450;

  const transAngle = 65;
  const transX1 = 150;
  const transY1 = 40;
  const dy = 220;
  const slope = Math.tan(transAngle * Math.PI / 180);
  const transX2 = transX1 + dy / slope;
  const transY2 = 260;

  const int1 = lineIntersection(lineStart, line1Y, lineEnd, line1Y, transX1, transY1, transX2, transY2);
  const int2 = lineIntersection(lineStart, line2Y, lineEnd, line2Y, transX1, transY1, transX2, transY2);

  if (!int1 || !int2) return '';

  const arcRadius = 25;
  const transDownAngle = Math.atan2(transY2 - int1.y, transX2 - int1.x) * (180 / Math.PI);
  const arcStart1 = polarToCartesian(int1.x, int1.y, arcRadius, 0);
  const arcEnd1 = polarToCartesian(int1.x, int1.y, arcRadius, transDownAngle);

  const transDownAngle2 = Math.atan2(transY2 - int2.y, transX2 - int2.x) * (180 / Math.PI);
  const arcStart2 = polarToCartesian(int2.x, int2.y, arcRadius, 0);
  const arcEnd2 = polarToCartesian(int2.x, int2.y, arcRadius, transDownAngle2);

  const label1Pos = polarToCartesian(int1.x, int1.y, 45, transDownAngle / 2);
  const label2Pos = polarToCartesian(int2.x, int2.y, 45, transDownAngle2 / 2);

  return `<svg width="500" height="300" viewBox="0 0 500 300" xmlns="http://www.w3.org/2000/svg" style="background: white; max-width: 100%; height: auto;">
    <!-- Parallel lines -->
    <line x1="${lineStart}" y1="${line1Y}" x2="${lineEnd}" y2="${line1Y}" stroke="#555" stroke-width="2"/>
    <line x1="${lineStart}" y1="${line2Y}" x2="${lineEnd}" y2="${line2Y}" stroke="#555" stroke-width="2"/>

    <!-- Transversal -->
    <line x1="${transX1.toFixed(1)}" y1="${transY1}" x2="${transX2.toFixed(1)}" y2="${transY2}" stroke="#000" stroke-width="2"/>

    <!-- Intersection points -->
    <circle cx="${int1.x.toFixed(1)}" cy="${int1.y.toFixed(1)}" r="3" fill="#000"/>
    <circle cx="${int2.x.toFixed(1)}" cy="${int2.y.toFixed(1)}" r="3" fill="#000"/>

    <!-- Arcs -->
    <path d="M ${arcStart1.x.toFixed(1)},${arcStart1.y.toFixed(1)} A ${arcRadius},${arcRadius} 0 0,1 ${arcEnd1.x.toFixed(1)},${arcEnd1.y.toFixed(1)}" stroke="#3b82f6" fill="none" stroke-width="2.5"/>
    <path d="M ${arcStart2.x.toFixed(1)},${arcStart2.y.toFixed(1)} A ${arcRadius},${arcRadius} 0 0,1 ${arcEnd2.x.toFixed(1)},${arcEnd2.y.toFixed(1)}" stroke="#3b82f6" fill="none" stroke-width="2.5"/>

    <!-- Clean Labels - just italic text, no circles -->
    <text x="${label1Pos.x.toFixed(1)}" y="${label1Pos.y.toFixed(1)}" font-family="Times New Roman, serif" font-size="20" font-style="italic" fill="#3b82f6" text-anchor="middle" dominant-baseline="middle" font-weight="bold">a</text>
    <text x="${label2Pos.x.toFixed(1)}" y="${label2Pos.y.toFixed(1)}" font-family="Times New Roman, serif" font-size="20" font-style="italic" fill="#3b82f6" text-anchor="middle" dominant-baseline="middle" font-weight="bold">a</text>
</svg>`;
}

async function fixDiagramLabels() {
  console.log('🔧 Fixing diagram labels to be clean and accurate...\n');
  console.log('='.repeat(70));
  console.log('\n');

  const { data: lesson } = await supabase
    .from('lessons')
    .select('*')
    .eq('lesson_key', 'geometry-angles')
    .single();

  let content = lesson.content;

  // FIX RULE 1
  console.log('📝 Fixing Rule 1 labels...\n');
  const rule1Diagram = generateCleanRule1();
  const rule1Match = content.match(/(<h4[^>]*>Rule 1: Vertical Angles Are Equal<\/h4>[\s\S]*?<div[^>]*>)\s*<svg[\s\S]*?<\/svg>\s*(<\/div>)/);
  if (rule1Match) {
    content = content.replace(rule1Match[0], rule1Match[1] + '\n    ' + rule1Diagram + '\n' + rule1Match[2]);
    console.log('  ✅ Rule 1 labels cleaned\n');
  }

  // FIX RULE 2
  console.log('📝 Fixing Rule 2 labels...\n');
  const rule2Diagram = generateCleanRule2();
  const rule2Match = content.match(/(<h4[^>]*>Rule 2: Adjacent Angles Sum to 180°<\/h4>[\s\S]*?<div[^>]*>)\s*<svg[\s\S]*?<\/svg>\s*(<\/div>)/);
  if (rule2Match) {
    content = content.replace(rule2Match[0], rule2Match[1] + '\n    ' + rule2Diagram + '\n' + rule2Match[2]);
    console.log('  ✅ Rule 2 labels cleaned\n');
  }

  // FIX PARALLEL LINES
  console.log('📝 Fixing Parallel Lines labels...\n');
  const parallelDiagram = generateCleanParallel();
  const parallelMatch = content.match(/(<h3>Parallel Lines Cut by a Transversal<\/h3>[\s\S]*?<div[^>]*>)\s*<svg[\s\S]*?<\/svg>\s*(<\/div>)/);
  if (parallelMatch) {
    content = content.replace(parallelMatch[0], parallelMatch[1] + '\n    ' + parallelDiagram + '\n' + parallelMatch[2]);
    console.log('  ✅ Parallel Lines labels cleaned\n');
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

  console.log('✅ All diagram labels fixed!\n');
  console.log('📊 Changes:');
  console.log('  ✅ Removed blobby circles');
  console.log('  ✅ Clean italic text labels (Times New Roman)');
  console.log('  ✅ Colored text (blue/red) matching arcs');
  console.log('  ✅ Bold font weight for clarity');
  console.log('  ✅ Professional ACT-style appearance\n');

  return true;
}

async function main() {
  const success = await fixDiagramLabels();

  console.log('='.repeat(70));
  if (success) {
    console.log('\n✨ Diagram labels are now clean and accurate!\n');
  } else {
    console.log('\n❌ Error occurred.\n');
  }
}

main();
