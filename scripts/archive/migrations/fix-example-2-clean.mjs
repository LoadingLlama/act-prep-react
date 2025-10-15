/**
 * Fix Example 2 - Clean Adjacent Angles Diagram
 * Make it crystal clear which arc belongs to which angle
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

function generateCleanAdjacentDiagram(givenAngle = 55) {
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

  // Arc for the GIVEN angle (between horizontal and slanted line) - SMALL radius
  const arcRadius1 = 16;
  const arcStart1 = polarToCartesian(cx, cy, arcRadius1, 0);
  const arcEnd1 = polarToCartesian(cx, cy, arcRadius1, -angle1);

  // Arc for the UNKNOWN angle (the adjacent angle) - LARGER radius, clearly separated
  const arcRadius2 = 24;
  const arcStart2 = polarToCartesian(cx, cy, arcRadius2, -angle1);
  const arcEnd2 = polarToCartesian(cx, cy, arcRadius2, 180);

  // Label positions
  const givenLabelPos = polarToCartesian(cx, cy, 30, -angle1 / 2);
  const unknownLabelPos = polarToCartesian(cx, cy, 38, (-angle1 + 180) / 2);

  return `<svg width="300" height="180" viewBox="0 0 300 180" xmlns="http://www.w3.org/2000/svg" style="background: white; max-width: 100%; height: auto;">
    <line x1="${p1.x.toFixed(1)}" y1="${p1.y.toFixed(1)}" x2="${p2.x.toFixed(1)}" y2="${p2.y.toFixed(1)}" stroke="#000" stroke-width="1.5"/>
    <line x1="${p3.x.toFixed(1)}" y1="${p3.y.toFixed(1)}" x2="${p4.x.toFixed(1)}" y2="${p4.y.toFixed(1)}" stroke="#000" stroke-width="1.5"/>
    <circle cx="${cx}" cy="${cy}" r="2.5" fill="#000"/>
    <path d="M ${arcStart1.x.toFixed(1)},${arcStart1.y.toFixed(1)} A ${arcRadius1},${arcRadius1} 0 0,0 ${arcEnd1.x.toFixed(1)},${arcEnd1.y.toFixed(1)}" stroke="#000" fill="none" stroke-width="1.2"/>
    <path d="M ${arcStart2.x.toFixed(1)},${arcStart2.y.toFixed(1)} A ${arcRadius2},${arcRadius2} 0 0,0 ${arcEnd2.x.toFixed(1)},${arcEnd2.y.toFixed(1)}" stroke="#000" fill="none" stroke-width="1.2"/>
    <text x="${givenLabelPos.x.toFixed(1)}" y="${givenLabelPos.y.toFixed(1)}" font-family="Times New Roman, serif" font-size="14" fill="#000" text-anchor="middle" dominant-baseline="middle">${givenAngle}°</text>
    <text x="${unknownLabelPos.x.toFixed(1)}" y="${unknownLabelPos.y.toFixed(1)}" font-family="Times New Roman, serif" font-size="15" font-style="italic" fill="#000" text-anchor="middle" dominant-baseline="middle">?</text>
</svg>`;
}

async function fixExample2() {
  console.log('🔧 Fixing Example 2 with clean adjacent angles diagram...\n');
  console.log('='.repeat(70));
  console.log('\n');

  const { data: lesson } = await supabase
    .from('lessons')
    .select('*')
    .eq('lesson_key', 'geometry-angles')
    .single();

  let content = lesson.content;

  console.log('📝 Generating new clean adjacent angles diagram...\n');

  const newDiagram = generateCleanAdjacentDiagram(55);

  // Find Example 2's SVG and replace it
  const ex2Match = content.match(/<h4[^>]*>Example 2<\/h4>([\s\S]*?)(?=<h4[^>]*>Example 3|$)/);

  if (!ex2Match) {
    console.log('❌ Example 2 not found');
    return false;
  }

  const ex2Start = content.indexOf(ex2Match[0]);
  const ex2Content = ex2Match[1];

  // Find the SVG
  const svgMatch = ex2Content.match(/<svg[\s\S]*?<\/svg>/);

  if (!svgMatch) {
    console.log('❌ No SVG in Example 2');
    return false;
  }

  const oldSVG = svgMatch[0];
  console.log('  Old SVG length:', oldSVG.length, 'chars');
  console.log('  New SVG length:', newDiagram.length, 'chars\n');

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

  console.log('✅ Example 2 diagram fixed!\n');
  console.log('📊 Changes:');
  console.log('  ✅ Two clearly separated arcs (16px and 24px radius)');
  console.log('  ✅ Given angle (55°): small inner arc');
  console.log('  ✅ Unknown angle (?): larger outer arc');
  console.log('  ✅ No overlap or confusion\n');

  return true;
}

async function main() {
  const success = await fixExample2();

  console.log('='.repeat(70));
  if (success) {
    console.log('\n✨ Example 2 now has clean, clear arcs!\n');
  } else {
    console.log('\n❌ Error occurred.\n');
  }
}

main();
