/**
 * Replace a/b Labels with Actual Degree Numbers
 * Rule 1: 70° and 110°
 * Rule 2: 55° and 125°
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

// RULE 1: Vertical Angles with DEGREE NUMBERS
function generateRule1WithNumbers() {
  const cx = 250;
  const cy = 150;
  const lineLength = 80;
  const angle = 70;

  const p1 = polarToCartesian(cx, cy, lineLength, -angle);
  const p2 = polarToCartesian(cx, cy, lineLength, 180 - angle);
  const p3 = polarToCartesian(cx, cy, lineLength, 0);
  const p4 = polarToCartesian(cx, cy, lineLength, 180);

  const arcRadius = 22;

  const arc1Start = polarToCartesian(cx, cy, arcRadius, 0);
  const arc1End = polarToCartesian(cx, cy, arcRadius, -angle);

  const arc2Start = polarToCartesian(cx, cy, arcRadius, -angle);
  const arc2End = polarToCartesian(cx, cy, arcRadius, 180);

  const arc3Start = polarToCartesian(cx, cy, arcRadius, 180);
  const arc3End = polarToCartesian(cx, cy, arcRadius, 180 - angle);

  const arc4Start = polarToCartesian(cx, cy, arcRadius, 180 - angle);
  const arc4End = polarToCartesian(cx, cy, arcRadius, 360);

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

    <!-- Labels with DEGREE NUMBERS -->
    <text x="${label1Pos.x.toFixed(1)}" y="${label1Pos.y.toFixed(1)}" font-family="Times New Roman, serif" font-size="18" font-style="italic" fill="#3b82f6" text-anchor="middle" dominant-baseline="middle" font-weight="bold">70°</text>
    <text x="${label2Pos.x.toFixed(1)}" y="${label2Pos.y.toFixed(1)}" font-family="Times New Roman, serif" font-size="18" font-style="italic" fill="#ef4444" text-anchor="middle" dominant-baseline="middle" font-weight="bold">110°</text>
    <text x="${label3Pos.x.toFixed(1)}" y="${label3Pos.y.toFixed(1)}" font-family="Times New Roman, serif" font-size="18" font-style="italic" fill="#3b82f6" text-anchor="middle" dominant-baseline="middle" font-weight="bold">70°</text>
    <text x="${label4Pos.x.toFixed(1)}" y="${label4Pos.y.toFixed(1)}" font-family="Times New Roman, serif" font-size="18" font-style="italic" fill="#ef4444" text-anchor="middle" dominant-baseline="middle" font-weight="bold">110°</text>
</svg>`;
}

// RULE 2: Adjacent Angles with DEGREE NUMBERS
function generateRule2WithNumbers() {
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
  const label2Pos = polarToCartesian(cx, cy, 48, (-angle - 180) / 2); // FIXED formula

  return `<svg width="500" height="300" viewBox="0 0 500 300" xmlns="http://www.w3.org/2000/svg" style="background: white; max-width: 100%; height: auto;">
    <line x1="${p1.x.toFixed(1)}" y1="${p1.y.toFixed(1)}" x2="${p2.x.toFixed(1)}" y2="${p2.y.toFixed(1)}" stroke="#000" stroke-width="2"/>
    <line x1="${p3.x.toFixed(1)}" y1="${p3.y.toFixed(1)}" x2="${p4.x.toFixed(1)}" y2="${p4.y.toFixed(1)}" stroke="#000" stroke-width="2"/>
    <circle cx="${cx}" cy="${cy}" r="3" fill="#000"/>

    <!-- Arcs -->
    <path d="M ${arc1Start.x.toFixed(1)},${arc1Start.y.toFixed(1)} A ${arcRadius1},${arcRadius1} 0 0,0 ${arc1End.x.toFixed(1)},${arc1End.y.toFixed(1)}" stroke="#3b82f6" fill="none" stroke-width="2.5"/>
    <path d="M ${arc2Start.x.toFixed(1)},${arc2Start.y.toFixed(1)} A ${arcRadius2},${arcRadius2} 0 0,0 ${arc2End.x.toFixed(1)},${arc2End.y.toFixed(1)}" stroke="#ef4444" fill="none" stroke-width="2.5"/>

    <!-- Labels with DEGREE NUMBERS -->
    <text x="${label1Pos.x.toFixed(1)}" y="${label1Pos.y.toFixed(1)}" font-family="Times New Roman, serif" font-size="18" font-style="italic" fill="#3b82f6" text-anchor="middle" dominant-baseline="middle" font-weight="bold">55°</text>
    <text x="${label2Pos.x.toFixed(1)}" y="${label2Pos.y.toFixed(1)}" font-family="Times New Roman, serif" font-size="18" font-style="italic" fill="#ef4444" text-anchor="middle" dominant-baseline="middle" font-weight="bold">125°</text>
</svg>`;
}

async function replaceLabelsWithNumbers() {
  console.log('🔧 Replacing a/b labels with degree numbers...\n');
  console.log('='.repeat(70));
  console.log('\n');

  const { data: lesson } = await supabase
    .from('lessons')
    .select('*')
    .eq('lesson_key', 'geometry-angles')
    .single();

  let content = lesson.content;

  // Replace Rule 1 diagram
  console.log('📝 Updating Rule 1 diagram with 70° and 110°...\n');
  const rule1Diagram = generateRule1WithNumbers();
  const rule1Match = content.match(/(<h4[^>]*>Rule 1: Vertical Angles Are Equal<\/h4>[\s\S]*?<div[^>]*>)\s*<svg[\s\S]*?<\/svg>\s*(<\/div>)/);
  if (rule1Match) {
    content = content.replace(rule1Match[0], rule1Match[1] + '\n    ' + rule1Diagram + '\n' + rule1Match[2]);
    console.log('  ✅ Rule 1: Now shows 70° and 110°\n');
  }

  // Replace Rule 2 diagram
  console.log('📝 Updating Rule 2 diagram with 55° and 125°...\n');
  const rule2Diagram = generateRule2WithNumbers();
  const rule2Match = content.match(/(<h4[^>]*>Rule 2: Adjacent Angles Sum to 180°<\/h4>[\s\S]*?<div[^>]*>)\s*<svg[\s\S]*?<\/svg>\s*(<\/div>)/);
  if (rule2Match) {
    content = content.replace(rule2Match[0], rule2Match[1] + '\n    ' + rule2Diagram + '\n' + rule2Match[2]);
    console.log('  ✅ Rule 2: Now shows 55° and 125°\n');
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

  console.log('✅ All diagrams updated with degree numbers!\n');
  console.log('📊 Changes:');
  console.log('  ✅ Rule 1: 70° (acute, blue) and 110° (obtuse, red)');
  console.log('  ✅ Rule 2: 55° (acute, blue) and 125° (obtuse, red)');
  console.log('  ✅ More concrete and easier to understand\n');

  return true;
}

async function main() {
  const success = await replaceLabelsWithNumbers();

  console.log('='.repeat(70));
  if (success) {
    console.log('\n✨ Teaching diagrams now use actual degree numbers!\n');
  } else {
    console.log('\n❌ Error occurred.\n');
  }
}

main();
