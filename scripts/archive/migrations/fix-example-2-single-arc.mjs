/**
 * Fix Example 2 - ONLY ONE ARC for the given angle
 * No arc for the unknown angle - just the label
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

function generateSingleArcAdjacentDiagram(givenAngle = 55) {
  const cx = 150;
  const cy = 90;
  const lineLength = 70;

  // One slanted line at the given angle from horizontal
  const angle1 = givenAngle;
  const p1 = polarToCartesian(cx, cy, lineLength, -angle1);
  const p2 = polarToCartesian(cx, cy, lineLength, 180 - angle1);

  // Horizontal line
  const p3 = polarToCartesian(cx, cy, lineLength, 0);
  const p4 = polarToCartesian(cx, cy, lineLength, 180);

  // ONLY ONE ARC - for the given angle (between horizontal and slanted line)
  const arcRadius = 18;
  const arcStart = polarToCartesian(cx, cy, arcRadius, 0);
  const arcEnd = polarToCartesian(cx, cy, arcRadius, -angle1);

  // Label positions
  const givenLabelPos = polarToCartesian(cx, cy, 32, -angle1 / 2);
  const unknownLabelPos = polarToCartesian(cx, cy, 32, (-angle1 + 180) / 2);

  return `<svg width="300" height="180" viewBox="0 0 300 180" xmlns="http://www.w3.org/2000/svg" style="background: white; max-width: 100%; height: auto;">
    <line x1="${p1.x.toFixed(1)}" y1="${p1.y.toFixed(1)}" x2="${p2.x.toFixed(1)}" y2="${p2.y.toFixed(1)}" stroke="#000" stroke-width="1.5"/>
    <line x1="${p3.x.toFixed(1)}" y1="${p3.y.toFixed(1)}" x2="${p4.x.toFixed(1)}" y2="${p4.y.toFixed(1)}" stroke="#000" stroke-width="1.5"/>
    <circle cx="${cx}" cy="${cy}" r="2.5" fill="#000"/>
    <path d="M ${arcStart.x.toFixed(1)},${arcStart.y.toFixed(1)} A ${arcRadius},${arcRadius} 0 0,0 ${arcEnd.x.toFixed(1)},${arcEnd.y.toFixed(1)}" stroke="#000" fill="none" stroke-width="1.2"/>
    <text x="${givenLabelPos.x.toFixed(1)}" y="${givenLabelPos.y.toFixed(1)}" font-family="Times New Roman, serif" font-size="14" fill="#000" text-anchor="middle" dominant-baseline="middle">${givenAngle}°</text>
    <text x="${unknownLabelPos.x.toFixed(1)}" y="${unknownLabelPos.y.toFixed(1)}" font-family="Times New Roman, serif" font-size="15" font-style="italic" fill="#000" text-anchor="middle" dominant-baseline="middle">?</text>
</svg>`;
}

async function fixExample2SingleArc() {
  console.log('🔧 Fixing Example 2 - ONE ARC ONLY...\n');
  console.log('='.repeat(70));
  console.log('\n');

  const { data: lesson } = await supabase
    .from('lessons')
    .select('*')
    .eq('lesson_key', 'geometry-angles')
    .single();

  let content = lesson.content;

  console.log('📝 Generating diagram with ONLY ONE arc (for 55°)...\n');

  const newDiagram = generateSingleArcAdjacentDiagram(55);

  // Find Example 2's SVG and replace it
  const ex2Match = content.match(/<h4[^>]*>Example 2<\/h4>([\s\S]*?)(?=<h4[^>]*>Example 3|$)/);

  if (!ex2Match) {
    console.log('❌ Example 2 not found');
    return false;
  }

  const ex2Content = ex2Match[1];

  // Find the SVG
  const svgMatch = ex2Content.match(/<svg[\s\S]*?<\/svg>/);

  if (!svgMatch) {
    console.log('❌ No SVG in Example 2');
    return false;
  }

  const oldSVG = svgMatch[0];

  // Replace the SVG
  content = content.replace(oldSVG, newDiagram);

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

  console.log('✅ Example 2 fixed!\n');
  console.log('📊 Changes:');
  console.log('  ✅ ONLY ONE arc (18px radius)');
  console.log('  ✅ Arc shows the 55° given angle');
  console.log('  ✅ Unknown angle (?) has NO arc - just a label');
  console.log('  ✅ Clean, minimal, no unnecessary information\n');

  return true;
}

async function main() {
  const success = await fixExample2SingleArc();

  console.log('='.repeat(70));
  if (success) {
    console.log('\n✨ Example 2 now has only ONE arc!\n');
  } else {
    console.log('\n❌ Error occurred.\n');
  }
}

main();
