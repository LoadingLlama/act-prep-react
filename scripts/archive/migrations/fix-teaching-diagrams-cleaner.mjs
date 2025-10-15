/**
 * Make Teaching Diagrams Cleaner - Less Bubbly, More Clear
 * Add arcs to show angles clearly, reduce bubble effect
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
 * Generate CLEAN Rule 1: Vertical Angles diagram
 * Clear arcs showing the angles, simple labels
 */
function generateCleanVerticalAnglesTeachingDiagram() {
  const cx = 250;
  const cy = 150;
  const lineLength = 110;

  // Lines at 70° angle
  const angle = 70;
  const p1 = polarToCartesian(cx, cy, lineLength, -angle);
  const p2 = polarToCartesian(cx, cy, lineLength, 180 - angle);
  const p3 = polarToCartesian(cx, cy, lineLength, 0);
  const p4 = polarToCartesian(cx, cy, lineLength, 180);

  // Arcs for the angles
  const arcRadius = 35;

  // Acute angle 'a' on right
  const arc1Start = polarToCartesian(cx, cy, arcRadius, 0);
  const arc1End = polarToCartesian(cx, cy, arcRadius, -angle);

  // Acute angle 'a' on left (vertical to right)
  const arc2Start = polarToCartesian(cx, cy, arcRadius, 180);
  const arc2End = polarToCartesian(cx, cy, arcRadius, 180 - angle);

  // Obtuse angle 'b' on top
  const arc3Start = polarToCartesian(cx, cy, arcRadius, -angle);
  const arc3End = polarToCartesian(cx, cy, arcRadius, 180);

  // Obtuse angle 'b' on bottom
  const arc4Start = polarToCartesian(cx, cy, arcRadius, 0);
  const arc4End = polarToCartesian(cx, cy, arcRadius, 180 - angle);

  // Label positions - OUTSIDE the arcs
  const labelRadius = 55;
  const label1Pos = polarToCartesian(cx, cy, labelRadius, -angle / 2);
  const label2Pos = polarToCartesian(cx, cy, labelRadius, 180 - angle / 2);
  const label3Pos = polarToCartesian(cx, cy, labelRadius, (-angle + 180) / 2);
  const label4Pos = polarToCartesian(cx, cy, labelRadius, (360 - angle) / 2);

  return `<svg width="500" height="320" viewBox="0 0 500 320" xmlns="http://www.w3.org/2000/svg" style="background: white; max-width: 100%; height: auto;">
    <!-- Two intersecting lines -->
    <line x1="${p1.x.toFixed(1)}" y1="${p1.y.toFixed(1)}" x2="${p2.x.toFixed(1)}" y2="${p2.y.toFixed(1)}" stroke="#1f2937" stroke-width="3"/>
    <line x1="${p3.x.toFixed(1)}" y1="${p3.y.toFixed(1)}" x2="${p4.x.toFixed(1)}" y2="${p4.y.toFixed(1)}" stroke="#1f2937" stroke-width="3"/>
    <circle cx="${cx}" cy="${cy}" r="4" fill="#1f2937"/>

    <!-- BLUE arcs for acute angles (a) -->
    <path d="M ${arc1Start.x.toFixed(1)},${arc1Start.y.toFixed(1)} A ${arcRadius},${arcRadius} 0 0,0 ${arc1End.x.toFixed(1)},${arc1End.y.toFixed(1)}" stroke="#3b82f6" fill="none" stroke-width="4"/>
    <path d="M ${arc2Start.x.toFixed(1)},${arc2Start.y.toFixed(1)} A ${arcRadius},${arcRadius} 0 0,0 ${arc2End.x.toFixed(1)},${arc2End.y.toFixed(1)}" stroke="#3b82f6" fill="none" stroke-width="4"/>

    <!-- RED arcs for obtuse angles (b) -->
    <path d="M ${arc3Start.x.toFixed(1)},${arc3Start.y.toFixed(1)} A ${arcRadius},${arcRadius} 0 1,1 ${arc3End.x.toFixed(1)},${arc3End.y.toFixed(1)}" stroke="#ef4444" fill="none" stroke-width="4"/>
    <path d="M ${arc4Start.x.toFixed(1)},${arc4Start.y.toFixed(1)} A ${arcRadius},${arcRadius} 0 1,0 ${arc4End.x.toFixed(1)},${arc4End.y.toFixed(1)}" stroke="#ef4444" fill="none" stroke-width="4"/>

    <!-- Simple text labels (no bubbles) -->
    <text x="${label1Pos.x.toFixed(1)}" y="${label1Pos.y.toFixed(1)}" font-family="Arial, sans-serif" font-size="22" font-weight="bold" fill="#3b82f6" text-anchor="middle" dominant-baseline="middle">a</text>
    <text x="${label2Pos.x.toFixed(1)}" y="${label2Pos.y.toFixed(1)}" font-family="Arial, sans-serif" font-size="22" font-weight="bold" fill="#3b82f6" text-anchor="middle" dominant-baseline="middle">a</text>
    <text x="${label3Pos.x.toFixed(1)}" y="${label3Pos.y.toFixed(1)}" font-family="Arial, sans-serif" font-size="22" font-weight="bold" fill="#ef4444" text-anchor="middle" dominant-baseline="middle">b</text>
    <text x="${label4Pos.x.toFixed(1)}" y="${label4Pos.y.toFixed(1)}" font-family="Arial, sans-serif" font-size="22" font-weight="bold" fill="#ef4444" text-anchor="middle" dominant-baseline="middle">b</text>

    <!-- Legend -->
    <rect x="80" y="270" width="340" height="38" fill="#eff6ff" stroke="#3b82f6" stroke-width="2.5" rx="6"/>
    <text x="250" y="289" font-family="Arial, sans-serif" font-size="17" font-weight="600" fill="#1f2937" text-anchor="middle" dominant-baseline="middle">
      Vertical angles are equal: a = a
    </text>
</svg>`;
}

/**
 * Generate CLEAN Rule 2: Adjacent Angles diagram
 * Clear arcs showing the adjacent angles, simple labels
 */
function generateCleanAdjacentAnglesTeachingDiagram() {
  const cx = 250;
  const cy = 150;
  const lineLength = 110;

  // Lines at 55° angle
  const angle = 55;
  const p1 = polarToCartesian(cx, cy, lineLength, -angle);
  const p2 = polarToCartesian(cx, cy, lineLength, 180 - angle);
  const p3 = polarToCartesian(cx, cy, lineLength, 0);
  const p4 = polarToCartesian(cx, cy, lineLength, 180);

  // Arcs for the TWO ADJACENT angles
  const arcRadius = 35;

  // Acute angle 'a' (blue)
  const arc1Start = polarToCartesian(cx, cy, arcRadius, 0);
  const arc1End = polarToCartesian(cx, cy, arcRadius, -angle);

  // Obtuse angle 'b' (red) - ADJACENT to 'a'
  const arc2Start = polarToCartesian(cx, cy, arcRadius, -angle);
  const arc2End = polarToCartesian(cx, cy, arcRadius, 180);

  // Label positions - OUTSIDE the arcs
  const labelRadius = 55;
  const label1Pos = polarToCartesian(cx, cy, labelRadius, -angle / 2);
  const label2Pos = polarToCartesian(cx, cy, labelRadius, (-angle + 180) / 2);

  return `<svg width="500" height="320" viewBox="0 0 500 320" xmlns="http://www.w3.org/2000/svg" style="background: white; max-width: 100%; height: auto;">
    <!-- Two intersecting lines -->
    <line x1="${p1.x.toFixed(1)}" y1="${p1.y.toFixed(1)}" x2="${p2.x.toFixed(1)}" y2="${p2.y.toFixed(1)}" stroke="#1f2937" stroke-width="3"/>
    <line x1="${p3.x.toFixed(1)}" y1="${p3.y.toFixed(1)}" x2="${p4.x.toFixed(1)}" y2="${p4.y.toFixed(1)}" stroke="#1f2937" stroke-width="3"/>
    <circle cx="${cx}" cy="${cy}" r="4" fill="#1f2937"/>

    <!-- BLUE arc for acute angle (a) -->
    <path d="M ${arc1Start.x.toFixed(1)},${arc1Start.y.toFixed(1)} A ${arcRadius},${arcRadius} 0 0,0 ${arc1End.x.toFixed(1)},${arc1End.y.toFixed(1)}" stroke="#3b82f6" fill="none" stroke-width="4"/>

    <!-- RED arc for obtuse angle (b) - ADJACENT to blue -->
    <path d="M ${arc2Start.x.toFixed(1)},${arc2Start.y.toFixed(1)} A ${arcRadius},${arcRadius} 0 1,1 ${arc2End.x.toFixed(1)},${arc2End.y.toFixed(1)}" stroke="#ef4444" fill="none" stroke-width="4"/>

    <!-- Simple text labels (no bubbles) -->
    <text x="${label1Pos.x.toFixed(1)}" y="${label1Pos.y.toFixed(1)}" font-family="Arial, sans-serif" font-size="22" font-weight="bold" fill="#3b82f6" text-anchor="middle" dominant-baseline="middle">a</text>
    <text x="${label2Pos.x.toFixed(1)}" y="${label2Pos.y.toFixed(1)}" font-family="Arial, sans-serif" font-size="22" font-weight="bold" fill="#ef4444" text-anchor="middle" dominant-baseline="middle">b</text>

    <!-- Legend -->
    <rect x="60" y="270" width="380" height="38" fill="#fef2f2" stroke="#ef4444" stroke-width="2.5" rx="6"/>
    <text x="250" y="289" font-family="Arial, sans-serif" font-size="17" font-weight="600" fill="#1f2937" text-anchor="middle" dominant-baseline="middle">
      Adjacent angles sum to 180°: a + b = 180°
    </text>
</svg>`;
}

async function fixTeachingDiagrams() {
  console.log('🔧 Making teaching diagrams cleaner - less bubbly, clearer angles...\n');

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

  // Fix Rule 1 diagram
  console.log('📝 Updating Rule 1 (Vertical Angles) diagram...');
  const rule1Start = content.indexOf('<h4>Rule 1: Vertical Angles Are Equal</h4>');
  const rule2Start = content.indexOf('<h4>Rule 2: Adjacent Angles Sum to 180°</h4>');

  if (rule1Start !== -1 && rule2Start !== -1) {
    const rule1Section = content.substring(rule1Start, rule2Start);
    const svg1Start = rule1Section.indexOf('<svg');
    const svg1End = rule1Section.indexOf('</svg>') + 6;

    if (svg1Start !== -1 && svg1End > svg1Start) {
      const newDiagram1 = generateCleanVerticalAnglesTeachingDiagram();
      const before1 = content.substring(0, rule1Start);
      const after1 = content.substring(rule2Start);
      const updatedRule1 = rule1Section.substring(0, svg1Start) + newDiagram1 + rule1Section.substring(svg1End);
      content = before1 + updatedRule1 + after1;
      console.log('✅ Rule 1 diagram updated');
    }
  }

  // Fix Rule 2 diagram
  console.log('📝 Updating Rule 2 (Adjacent Angles) diagram...');
  const rule2StartNew = content.indexOf('<h4>Rule 2: Adjacent Angles Sum to 180°</h4>');
  const example1Start = content.indexOf('<h4', rule2StartNew + 10);

  if (rule2StartNew !== -1 && example1Start !== -1) {
    const rule2Section = content.substring(rule2StartNew, example1Start);
    const svg2Start = rule2Section.indexOf('<svg');
    const svg2End = rule2Section.indexOf('</svg>') + 6;

    if (svg2Start !== -1 && svg2End > svg2Start) {
      const newDiagram2 = generateCleanAdjacentAnglesTeachingDiagram();
      const before2 = content.substring(0, rule2StartNew);
      const after2 = content.substring(example1Start);
      const updatedRule2 = rule2Section.substring(0, svg2Start) + newDiagram2 + rule2Section.substring(svg2End);
      content = before2 + updatedRule2 + after2;
      console.log('✅ Rule 2 diagram updated');
    }
  }

  // Update database
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

  console.log('\n✅ Teaching diagrams updated successfully!\n');
  console.log('📊 Changes:');
  console.log('  ✅ Added colored ARCS to clearly show the angles');
  console.log('  ✅ Removed bubble circles (less cluttered)');
  console.log('  ✅ Simple text labels outside the arcs');
  console.log('  ✅ Blue arcs for acute angles (a)');
  console.log('  ✅ Red arcs for obtuse angles (b)');
  console.log('  ✅ Much clearer which angles are being highlighted\n');

  return true;
}

async function main() {
  console.log('🚀 Cleaning up teaching diagrams...\n');
  console.log('='.repeat(70));
  console.log('\n');

  const success = await fixTeachingDiagrams();

  console.log('='.repeat(70));
  if (success) {
    console.log('\n✨ Teaching diagrams are now clean and clear!\n');
    console.log('Students can clearly see which ANGLES are being highlighted.\n');
  } else {
    console.log('\n❌ Error occurred. Check logs above.\n');
  }
}

main();
