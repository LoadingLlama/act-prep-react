/**
 * Fix Example 2 - Remove duplicate arcs (should be one arc per angle)
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

/**
 * Generate FIXED adjacent angles diagram - ONE arc per angle only
 */
function generateFixedAdjacentAnglesDiagram(givenAngle) {
  const cx = 200;
  const cy = 120;
  const lineLength = 100;

  const angle1 = givenAngle;
  const p1 = polarToCartesian(cx, cy, lineLength, -angle1);
  const p2 = polarToCartesian(cx, cy, lineLength, 180 - angle1);
  const p3 = polarToCartesian(cx, cy, lineLength, 0);
  const p4 = polarToCartesian(cx, cy, lineLength, 180);

  // Arc for given angle (right side, acute) - ONLY THIS ONE
  const arcRadius1 = 25;
  const arcStart1 = polarToCartesian(cx, cy, arcRadius1, 0);
  const arcEnd1 = polarToCartesian(cx, cy, arcRadius1, -angle1);

  // Arc for UNKNOWN adjacent angle (left side, obtuse) - ONLY THIS ONE
  const arcRadius2 = 30;
  const adjArcStart = polarToCartesian(cx, cy, arcRadius2, -angle1);
  const adjArcEnd = polarToCartesian(cx, cy, arcRadius2, 180);

  // Label positions
  const givenLabelPos = polarToCartesian(cx, cy, 45, -angle1 / 2);
  const adjLabelPos = polarToCartesian(cx, cy, 55, (-angle1 + 180) / 2);

  return `<svg width="400" height="240" viewBox="0 0 400 240" xmlns="http://www.w3.org/2000/svg" style="background: white; max-width: 100%; height: auto;">
    <!-- Two intersecting lines -->
    <line x1="${p1.x.toFixed(1)}" y1="${p1.y.toFixed(1)}" x2="${p2.x.toFixed(1)}" y2="${p2.y.toFixed(1)}" stroke="#000" stroke-width="2"/>
    <line x1="${p3.x.toFixed(1)}" y1="${p3.y.toFixed(1)}" x2="${p4.x.toFixed(1)}" y2="${p4.y.toFixed(1)}" stroke="#000" stroke-width="2"/>

    <!-- Center point -->
    <circle cx="${cx}" cy="${cy}" r="3" fill="#000"/>

    <!-- Arc for GIVEN angle (acute, right side) -->
    <path d="M ${arcStart1.x.toFixed(1)},${arcStart1.y.toFixed(1)} A ${arcRadius1},${arcRadius1} 0 0,0 ${arcEnd1.x.toFixed(1)},${arcEnd1.y.toFixed(1)}" stroke="#000" fill="none" stroke-width="1.5"/>

    <!-- Arc for UNKNOWN adjacent angle (obtuse, left side) -->
    <path d="M ${adjArcStart.x.toFixed(1)},${adjArcStart.y.toFixed(1)} A ${arcRadius2},${arcRadius2} 0 1,1 ${adjArcEnd.x.toFixed(1)},${adjArcEnd.y.toFixed(1)}" stroke="#000" fill="none" stroke-width="1.5"/>

    <!-- Labels -->
    <text x="${givenLabelPos.x.toFixed(1)}" y="${givenLabelPos.y.toFixed(1)}" font-family="Times New Roman, serif" font-size="17" fill="#000" text-anchor="middle" dominant-baseline="middle">${givenAngle}°</text>
    <text x="${adjLabelPos.x.toFixed(1)}" y="${adjLabelPos.y.toFixed(1)}" font-family="Times New Roman, serif" font-size="19" font-style="italic" fill="#000" text-anchor="middle" dominant-baseline="middle">?</text>
</svg>`;
}

async function fixExample2() {
  console.log('🔧 Fixing Example 2 arc issue...\n');

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

  // Find Example 2
  const example2Start = content.indexOf('<h4>Example 2</h4>');
  if (example2Start === -1) {
    console.error('❌ Could not find Example 2');
    return false;
  }

  const example2End = content.indexOf('<h4>Example 3</h4>', example2Start);
  const example2Section = content.substring(example2Start, example2End);

  // Find the SVG in Example 2
  const svg2Start = example2Section.indexOf('<svg');
  const svg2End = example2Section.indexOf('</svg>') + 6;

  if (svg2Start === -1 || svg2End <= svg2Start) {
    console.error('❌ Could not find SVG in Example 2');
    return false;
  }

  const newDiagram = generateFixedAdjacentAnglesDiagram(55);

  // Replace the diagram
  const before = content.substring(0, example2Start);
  const after = content.substring(example2End);
  const updatedExample2 = example2Section
    .substring(0, svg2Start) + newDiagram + example2Section.substring(svg2End);

  const updatedContent = before + updatedExample2 + after;

  // Update database
  const { error: updateError } = await supabase
    .from('lessons')
    .update({
      content: updatedContent,
      updated_at: new Date().toISOString()
    })
    .eq('id', lesson.id);

  if (updateError) {
    console.error('❌ Error updating lesson:', updateError);
    return false;
  }

  console.log('✅ Example 2 fixed successfully!\n');
  console.log('📊 Changes:');
  console.log('  ✅ Fixed arc display - only ONE arc per angle');
  console.log('  ✅ Given angle (55°): single arc on right');
  console.log('  ✅ Unknown angle (?): single arc on left');
  console.log('  ✅ Clean, proper geometry\n');

  return true;
}

async function main() {
  console.log('🚀 Fixing Example 2 arc issue...\n');
  console.log('='.repeat(70));
  console.log('\n');

  const success = await fixExample2();

  console.log('='.repeat(70));
  if (success) {
    console.log('\n✨ Example 2 fixed! Each angle now has exactly one arc.\n');
  } else {
    console.log('\n❌ Error occurred. Check logs above.\n');
  }
}

main();
