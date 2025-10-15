/**
 * Fix the Teaching Diagram (8 angles) to be cleaner
 * This is the large diagram showing all angles created by parallel lines + transversal
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
 * Generate clean ACT-authentic teaching diagram for parallel lines
 * Shows the key pattern: 4 acute angles equal, 4 obtuse angles equal
 */
function generateCleanTeachingDiagram() {
  // Clean, compact layout
  const line1Y = 140;
  const line2Y = 280;
  const lineStart = 80;
  const lineEnd = 520;

  // Transversal at 60° angle
  const angle = 60;
  const transX1 = 180;
  const transY1 = 80;
  const dy = 240;
  const slope = Math.tan(angle * Math.PI / 180);
  const transX2 = transX1 + dy / slope;
  const transY2 = 320;

  // Calculate intersections
  const int1X = transX1 + ((line1Y - transY1) / (transY2 - transY1)) * (transX2 - transX1);
  const int2X = transX1 + ((line2Y - transY1) / (transY2 - transY1)) * (transX2 - transX1);

  // Label positions for angles (small offsets, cleaner)
  const labelRadius = 38;

  // Top intersection - 4 angles
  const top_angle1 = polarToCartesian(int1X, line1Y, labelRadius, 30);  // acute lower-right
  const top_angle2 = polarToCartesian(int1X, line1Y, labelRadius, 150); // obtuse lower-left
  const top_angle3 = polarToCartesian(int1X, line1Y, labelRadius, 210); // acute upper-left
  const top_angle4 = polarToCartesian(int1X, line1Y, labelRadius, 330); // obtuse upper-right

  // Bottom intersection - 4 angles
  const bot_angle5 = polarToCartesian(int2X, line2Y, labelRadius, 30);  // acute lower-right
  const bot_angle6 = polarToCartesian(int2X, line2Y, labelRadius, 150); // obtuse lower-left
  const bot_angle7 = polarToCartesian(int2X, line2Y, labelRadius, 210); // acute upper-left
  const bot_angle8 = polarToCartesian(int2X, line2Y, labelRadius, 330); // obtuse upper-right

  return `<svg width="600" height="420" viewBox="0 0 600 420" xmlns="http://www.w3.org/2000/svg" style="background: white; max-width: 100%; height: auto;">
    <!-- Parallel lines - solid black -->
    <line x1="${lineStart}" y1="${line1Y}" x2="${lineEnd}" y2="${line1Y}" stroke="#000" stroke-width="2.5"/>
    <line x1="${lineStart}" y1="${line2Y}" x2="${lineEnd}" y2="${line2Y}" stroke="#000" stroke-width="2.5"/>

    <!-- Transversal - solid black -->
    <line x1="${transX1}" y1="${transY1}" x2="${transX2.toFixed(1)}" y2="${transY2}" stroke="#000" stroke-width="2.5"/>

    <!-- Intersection points -->
    <circle cx="${int1X.toFixed(1)}" cy="${line1Y}" r="3" fill="#000"/>
    <circle cx="${int2X.toFixed(1)}" cy="${line2Y}" r="3" fill="#000"/>

    <!-- Top intersection - angle labels -->
    <text x="${top_angle1.x.toFixed(1)}" y="${top_angle1.y.toFixed(1)}" font-family="Times New Roman, serif" font-size="20" font-weight="bold" fill="#000" text-anchor="middle" dominant-baseline="middle">1</text>
    <text x="${top_angle2.x.toFixed(1)}" y="${top_angle2.y.toFixed(1)}" font-family="Times New Roman, serif" font-size="20" font-weight="bold" fill="#666" text-anchor="middle" dominant-baseline="middle">2</text>
    <text x="${top_angle3.x.toFixed(1)}" y="${top_angle3.y.toFixed(1)}" font-family="Times New Roman, serif" font-size="20" font-weight="bold" fill="#000" text-anchor="middle" dominant-baseline="middle">3</text>
    <text x="${top_angle4.x.toFixed(1)}" y="${top_angle4.y.toFixed(1)}" font-family="Times New Roman, serif" font-size="20" font-weight="bold" fill="#666" text-anchor="middle" dominant-baseline="middle">4</text>

    <!-- Bottom intersection - angle labels -->
    <text x="${bot_angle5.x.toFixed(1)}" y="${bot_angle5.y.toFixed(1)}" font-family="Times New Roman, serif" font-size="20" font-weight="bold" fill="#000" text-anchor="middle" dominant-baseline="middle">5</text>
    <text x="${bot_angle6.x.toFixed(1)}" y="${bot_angle6.y.toFixed(1)}" font-family="Times New Roman, serif" font-size="20" font-weight="bold" fill="#666" text-anchor="middle" dominant-baseline="middle">6</text>
    <text x="${bot_angle7.x.toFixed(1)}" y="${bot_angle7.y.toFixed(1)}" font-family="Times New Roman, serif" font-size="20" font-weight="bold" fill="#000" text-anchor="middle" dominant-baseline="middle">7</text>
    <text x="${bot_angle8.x.toFixed(1)}" y="${bot_angle8.y.toFixed(1)}" font-family="Times New Roman, serif" font-size="20" font-weight="bold" fill="#666" text-anchor="middle" dominant-baseline="middle">8</text>

    <!-- Legend - clean boxes -->
    <rect x="60" y="355" width="480" height="28" fill="#f8f9fa" stroke="#000" stroke-width="1.5" rx="4"/>
    <text x="300" y="372" font-family="Times New Roman, serif" font-size="16" fill="#000" text-anchor="middle" dominant-baseline="middle">
      Acute angles (1, 3, 5, 7): All equal  •  Obtuse angles (2, 4, 6, 8): All equal
    </text>

    <rect x="60" y="388" width="480" height="24" fill="#fff" stroke="#000" stroke-width="1.5" rx="4"/>
    <text x="300" y="402" font-family="Times New Roman, serif" font-size="15" fill="#000" text-anchor="middle" dominant-baseline="middle">
      Any acute + any obtuse = 180°
    </text>
</svg>`;
}

async function fixTeachingDiagram() {
  console.log('🔧 Fixing teaching diagram (8 angles)...\n');

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

  // Find the section "Parallel Lines Cut by a Transversal"
  const sectionStart = content.indexOf('<h3>Parallel Lines Cut by a Transversal</h3>');
  if (sectionStart === -1) {
    console.error('❌ Could not find teaching section');
    return false;
  }

  // Find the large SVG diagram (the one with width="600" or viewBox with 8 angles)
  // This diagram is BEFORE Example 3
  const example3Pos = content.indexOf('<h4>Example 3</h4>');
  const searchArea = content.substring(sectionStart, example3Pos);

  // Find the large diagram (it's the one with all 8 angle labels)
  const svgStart = searchArea.indexOf('<svg width="600"');
  const svgEnd = searchArea.indexOf('</svg>', svgStart) + 6;

  if (svgStart === -1 || svgEnd <= svgStart) {
    console.error('❌ Could not find teaching diagram SVG');
    return false;
  }

  const newDiagram = generateCleanTeachingDiagram();

  // Replace the old diagram
  const before = content.substring(0, sectionStart + svgStart);
  const after = content.substring(sectionStart + svgEnd);
  const updatedContent = before + newDiagram + after;

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

  console.log('✅ Teaching diagram updated successfully!\n');
  console.log('📊 Changes:');
  console.log('  ✅ Cleaner layout with better spacing');
  console.log('  ✅ Black solid lines (no colored arcs)');
  console.log('  ✅ Times New Roman font');
  console.log('  ✅ Acute angles (1,3,5,7) in black');
  console.log('  ✅ Obtuse angles (2,4,6,8) in gray for contrast');
  console.log('  ✅ Simplified legend (single line format)');
  console.log('  ✅ Compact height (420px vs 520px)\n');

  return true;
}

async function main() {
  console.log('🚀 Updating teaching diagram...\n');
  console.log('='.repeat(70));
  console.log('\n');

  const success = await fixTeachingDiagram();

  console.log('='.repeat(70));
  if (success) {
    console.log('\n✨ Teaching diagram cleaned up! Test in your React app.\n');
  } else {
    console.log('\n❌ Error occurred. Check logs above.\n');
  }
}

main();
