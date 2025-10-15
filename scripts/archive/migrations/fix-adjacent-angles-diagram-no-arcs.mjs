/**
 * Fix Rule 2 (Adjacent Angles) diagram - remove arcs to avoid confusion
 * Just use colored circles, no arcs
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
 * Generate clean adjacent angles teaching diagram - NO ARCS, just colored circles
 */
function generateCleanAdjacentAnglesTeachingDiagram() {
  const cx = 250;
  const cy = 150;
  const lineLength = 110;

  // Lines at 55° angle for visual clarity
  const angle = 55;
  const p1 = polarToCartesian(cx, cy, lineLength, -angle);
  const p2 = polarToCartesian(cx, cy, lineLength, 180 - angle);
  const p3 = polarToCartesian(cx, cy, lineLength, 0);
  const p4 = polarToCartesian(cx, cy, lineLength, 180);

  // Label positions - focus on two ADJACENT angles (next to each other)
  const labelRadius = 50;
  const acuteLabelPos = polarToCartesian(cx, cy, labelRadius, -angle / 2); // Right acute
  const obtuseLabelPos = polarToCartesian(cx, cy, labelRadius, (-angle + 180) / 2); // Top obtuse (adjacent)

  return `<svg width="500" height="320" viewBox="0 0 500 320" xmlns="http://www.w3.org/2000/svg" style="background: white; max-width: 100%; height: auto;">
    <!-- Two intersecting lines -->
    <line x1="${p1.x.toFixed(1)}" y1="${p1.y.toFixed(1)}" x2="${p2.x.toFixed(1)}" y2="${p2.y.toFixed(1)}" stroke="#1f2937" stroke-width="3"/>
    <line x1="${p3.x.toFixed(1)}" y1="${p3.y.toFixed(1)}" x2="${p4.x.toFixed(1)}" y2="${p4.y.toFixed(1)}" stroke="#1f2937" stroke-width="3"/>

    <!-- Center point -->
    <circle cx="${cx}" cy="${cy}" r="4" fill="#1f2937"/>

    <!-- Highlight the two ADJACENT angles with colored circles ONLY - NO ARCS -->
    <!-- Acute angle (blue) -->
    <circle cx="${acuteLabelPos.x.toFixed(1)}" cy="${acuteLabelPos.y.toFixed(1)}" r="22" fill="#3b82f6" opacity="0.85"/>
    <text x="${acuteLabelPos.x.toFixed(1)}" y="${acuteLabelPos.y.toFixed(1)}" font-family="Arial, sans-serif" font-size="24" font-weight="bold" fill="#fff" text-anchor="middle" dominant-baseline="middle">a</text>

    <!-- Obtuse angle (red) - ADJACENT to the blue angle -->
    <circle cx="${obtuseLabelPos.x.toFixed(1)}" cy="${obtuseLabelPos.y.toFixed(1)}" r="22" fill="#ef4444" opacity="0.85"/>
    <text x="${obtuseLabelPos.x.toFixed(1)}" y="${obtuseLabelPos.y.toFixed(1)}" font-family="Arial, sans-serif" font-size="24" font-weight="bold" fill="#fff" text-anchor="middle" dominant-baseline="middle">b</text>

    <!-- Legend -->
    <rect x="60" y="270" width="380" height="38" fill="#fef2f2" stroke="#ef4444" stroke-width="2.5" rx="6"/>
    <text x="250" y="289" font-family="Arial, sans-serif" font-size="17" font-weight="600" fill="#1f2937" text-anchor="middle" dominant-baseline="middle">
      Adjacent angles sum to 180°: a + b = 180°
    </text>
</svg>`;
}

async function fixDiagram() {
  console.log('🔧 Fixing Rule 2 diagram - removing arcs to avoid confusion...\n');

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

  // Find Rule 2 section
  const rule2Start = content.indexOf('<h4>Rule 2: Adjacent Angles Sum to 180°</h4>');
  if (rule2Start === -1) {
    console.error('❌ Could not find Rule 2 section');
    return false;
  }

  // Find the SVG in Rule 2 section (should be after "In the diagram below")
  const rule2End = content.indexOf('<h4>Example 1</h4>', rule2Start);
  const rule2Section = content.substring(rule2Start, rule2End);

  const svgStart = rule2Section.indexOf('<svg');
  const svgEnd = rule2Section.indexOf('</svg>') + 6;

  if (svgStart === -1 || svgEnd <= svgStart) {
    console.error('❌ Could not find SVG in Rule 2');
    return false;
  }

  const newDiagram = generateCleanAdjacentAnglesTeachingDiagram();

  // Replace the diagram
  const before = content.substring(0, rule2Start);
  const after = content.substring(rule2End);
  const updatedRule2 = rule2Section
    .substring(0, svgStart) + newDiagram + rule2Section.substring(svgEnd);

  const updatedContent = before + updatedRule2 + after;

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

  console.log('✅ Rule 2 diagram fixed!\n');
  console.log('📊 Changes:');
  console.log('  ✅ Removed arcs (were causing visual confusion)');
  console.log('  ✅ Kept colored circles to show adjacent angles');
  console.log('  ✅ Clean, simple visual\n');

  return true;
}

async function main() {
  console.log('🚀 Fixing adjacent angles diagram...\n');
  console.log('='.repeat(70));
  console.log('\n');

  const success = await fixDiagram();

  console.log('='.repeat(70));
  if (success) {
    console.log('\n✨ Diagram fixed - no more overlapping arcs!\n');
  } else {
    console.log('\n❌ Error occurred. Check logs above.\n');
  }
}

main();
