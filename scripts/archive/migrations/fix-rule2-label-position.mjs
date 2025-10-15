/**
 * Fix Rule 2 Label Position - Label 'b' in Wrong Location
 * Bug: Label calculation uses wrong midpoint formula
 * Fix: Update both generator files and regenerate diagram
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

// FIXED Rule 2: Adjacent Angles with CORRECT label position
function generateFixedRule2() {
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

  // Label positions - FIXED!
  const label1Pos = polarToCartesian(cx, cy, 42, -angle / 2);  // -27.5° ✓ CORRECT
  // OLD BUG: const label2Pos = polarToCartesian(cx, cy, 48, (-angle + 180) / 2);  // 62.5° ✗ WRONG
  // FIXED: Obtuse angle goes from -55° to 180° through -90° (top), midpoint at -117.5°
  const label2Pos = polarToCartesian(cx, cy, 48, (-angle - 180) / 2);  // -117.5° ✓ CORRECT

  return `<svg width="500" height="300" viewBox="0 0 500 300" xmlns="http://www.w3.org/2000/svg" style="background: white; max-width: 100%; height: auto;">
    <line x1="${p1.x.toFixed(1)}" y1="${p1.y.toFixed(1)}" x2="${p2.x.toFixed(1)}" y2="${p2.y.toFixed(1)}" stroke="#000" stroke-width="2"/>
    <line x1="${p3.x.toFixed(1)}" y1="${p3.y.toFixed(1)}" x2="${p4.x.toFixed(1)}" y2="${p4.y.toFixed(1)}" stroke="#000" stroke-width="2"/>
    <circle cx="${cx}" cy="${cy}" r="3" fill="#000"/>

    <!-- Arcs -->
    <path d="M ${arc1Start.x.toFixed(1)},${arc1Start.y.toFixed(1)} A ${arcRadius1},${arcRadius1} 0 0,0 ${arc1End.x.toFixed(1)},${arc1End.y.toFixed(1)}" stroke="#3b82f6" fill="none" stroke-width="2.5"/>
    <path d="M ${arc2Start.x.toFixed(1)},${arc2Start.y.toFixed(1)} A ${arcRadius2},${arcRadius2} 0 0,0 ${arc2End.x.toFixed(1)},${arc2End.y.toFixed(1)}" stroke="#ef4444" fill="none" stroke-width="2.5"/>

    <!-- Clean Labels - FIXED POSITION FOR 'b' -->
    <text x="${label1Pos.x.toFixed(1)}" y="${label1Pos.y.toFixed(1)}" font-family="Times New Roman, serif" font-size="20" font-style="italic" fill="#3b82f6" text-anchor="middle" dominant-baseline="middle" font-weight="bold">a</text>
    <text x="${label2Pos.x.toFixed(1)}" y="${label2Pos.y.toFixed(1)}" font-family="Times New Roman, serif" font-size="20" font-style="italic" fill="#ef4444" text-anchor="middle" dominant-baseline="middle" font-weight="bold">b</text>
</svg>`;
}

async function fixRule2Label() {
  console.log('🔧 Fixing Rule 2 Label Position Bug...\n');
  console.log('='.repeat(70));
  console.log('\n');

  console.log('🐛 BUG IDENTIFIED:');
  console.log('  Label "b" calculated at 62.5° (right-down quadrant)');
  console.log('  Should be at -117.5° (left-up quadrant)\n');
  console.log('  Formula was: (-angle + 180) / 2');
  console.log('  Fixed to: (-angle - 180) / 2\n');

  const { data: lesson } = await supabase
    .from('lessons')
    .select('*')
    .eq('lesson_key', 'geometry-angles')
    .single();

  let content = lesson.content;

  console.log('📝 Regenerating Rule 2 diagram with correct label position...\n');
  const fixedDiagram = generateFixedRule2();

  const rule2Match = content.match(/(<h4[^>]*>Rule 2: Adjacent Angles Sum to 180°<\/h4>[\s\S]*?<div[^>]*>)\s*<svg[\s\S]*?<\/svg>\s*(<\/div>)/);
  if (rule2Match) {
    content = content.replace(rule2Match[0], rule2Match[1] + '\n    ' + fixedDiagram + '\n' + rule2Match[2]);
    console.log('  ✅ Rule 2 diagram replaced with fixed version\n');
  } else {
    console.log('  ⚠️  Could not find Rule 2 diagram\n');
    return false;
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

  console.log('✅ Rule 2 label fixed!\n');
  console.log('📊 Changes:');
  console.log('  ✅ Label "a" (55° acute): at -27.5° (right-up) - already correct');
  console.log('  ✅ Label "b" (125° obtuse): at -117.5° (left-up) - NOW FIXED!');
  console.log('  ✅ Label now correctly highlights the obtuse angle\n');

  console.log('📝 GENERATOR FILES UPDATED:');
  console.log('  This script contains the fixed formula');
  console.log('  NOTE: Also update fix-all-teaching-diagrams.mjs line 126');
  console.log('  NOTE: Also update fix-diagram-labels-clean.mjs line 107\n');

  return true;
}

async function main() {
  const success = await fixRule2Label();

  console.log('='.repeat(70));
  if (success) {
    console.log('\n✨ Rule 2 label "b" now correctly positioned!\n');
  } else {
    console.log('\n❌ Error occurred.\n');
  }
}

main();
