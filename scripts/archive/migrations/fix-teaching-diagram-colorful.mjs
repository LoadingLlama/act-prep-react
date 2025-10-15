/**
 * Fix Teaching Diagram - Make it COLORFUL and PLAYFUL for learning
 * Teaching visuals should be engaging, not ACT-authentic
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
 * Generate colorful, playful teaching diagram for parallel lines
 * Blue = acute angles, Red = obtuse angles
 */
function generateColorfulTeachingDiagram() {
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

  // Label positions for angles
  const labelRadius = 40;

  // Top intersection - 4 angles
  const top_angle1 = polarToCartesian(int1X, line1Y, labelRadius, 30);
  const top_angle2 = polarToCartesian(int1X, line1Y, labelRadius, 150);
  const top_angle3 = polarToCartesian(int1X, line1Y, labelRadius, 210);
  const top_angle4 = polarToCartesian(int1X, line1Y, labelRadius, 330);

  // Bottom intersection - 4 angles
  const bot_angle5 = polarToCartesian(int2X, line2Y, labelRadius, 30);
  const bot_angle6 = polarToCartesian(int2X, line2Y, labelRadius, 150);
  const bot_angle7 = polarToCartesian(int2X, line2Y, labelRadius, 210);
  const bot_angle8 = polarToCartesian(int2X, line2Y, labelRadius, 330);

  return `<svg width="600" height="440" viewBox="0 0 600 440" xmlns="http://www.w3.org/2000/svg" style="background: white; max-width: 100%; height: auto;">
    <!-- Parallel lines - dark gray -->
    <line x1="${lineStart}" y1="${line1Y}" x2="${lineEnd}" y2="${line1Y}" stroke="#1f2937" stroke-width="3"/>
    <line x1="${lineStart}" y1="${line2Y}" x2="${lineEnd}" y2="${line2Y}" stroke="#1f2937" stroke-width="3"/>

    <!-- Transversal - dark gray -->
    <line x1="${transX1}" y1="${transY1}" x2="${transX2.toFixed(1)}" y2="${transY2}" stroke="#4b5563" stroke-width="3"/>

    <!-- Intersection points -->
    <circle cx="${int1X.toFixed(1)}" cy="${line1Y}" r="4" fill="#1f2937"/>
    <circle cx="${int2X.toFixed(1)}" cy="${line2Y}" r="4" fill="#1f2937"/>

    <!-- Top intersection - BLUE acute angles (1, 3) -->
    <circle cx="${top_angle1.x.toFixed(1)}" cy="${top_angle1.y.toFixed(1)}" r="18" fill="#3b82f6" opacity="0.9"/>
    <text x="${top_angle1.x.toFixed(1)}" y="${top_angle1.y.toFixed(1)}" font-family="Arial, sans-serif" font-size="20" font-weight="bold" fill="#fff" text-anchor="middle" dominant-baseline="middle">1</text>

    <circle cx="${top_angle3.x.toFixed(1)}" cy="${top_angle3.y.toFixed(1)}" r="18" fill="#3b82f6" opacity="0.9"/>
    <text x="${top_angle3.x.toFixed(1)}" y="${top_angle3.y.toFixed(1)}" font-family="Arial, sans-serif" font-size="20" font-weight="bold" fill="#fff" text-anchor="middle" dominant-baseline="middle">3</text>

    <!-- Top intersection - RED obtuse angles (2, 4) -->
    <circle cx="${top_angle2.x.toFixed(1)}" cy="${top_angle2.y.toFixed(1)}" r="18" fill="#ef4444" opacity="0.9"/>
    <text x="${top_angle2.x.toFixed(1)}" y="${top_angle2.y.toFixed(1)}" font-family="Arial, sans-serif" font-size="20" font-weight="bold" fill="#fff" text-anchor="middle" dominant-baseline="middle">2</text>

    <circle cx="${top_angle4.x.toFixed(1)}" cy="${top_angle4.y.toFixed(1)}" r="18" fill="#ef4444" opacity="0.9"/>
    <text x="${top_angle4.x.toFixed(1)}" y="${top_angle4.y.toFixed(1)}" font-family="Arial, sans-serif" font-size="20" font-weight="bold" fill="#fff" text-anchor="middle" dominant-baseline="middle">4</text>

    <!-- Bottom intersection - BLUE acute angles (5, 7) -->
    <circle cx="${bot_angle5.x.toFixed(1)}" cy="${bot_angle5.y.toFixed(1)}" r="18" fill="#3b82f6" opacity="0.9"/>
    <text x="${bot_angle5.x.toFixed(1)}" y="${bot_angle5.y.toFixed(1)}" font-family="Arial, sans-serif" font-size="20" font-weight="bold" fill="#fff" text-anchor="middle" dominant-baseline="middle">5</text>

    <circle cx="${bot_angle7.x.toFixed(1)}" cy="${bot_angle7.y.toFixed(1)}" r="18" fill="#3b82f6" opacity="0.9"/>
    <text x="${bot_angle7.x.toFixed(1)}" y="${bot_angle7.y.toFixed(1)}" font-family="Arial, sans-serif" font-size="20" font-weight="bold" fill="#fff" text-anchor="middle" dominant-baseline="middle">7</text>

    <!-- Bottom intersection - RED obtuse angles (6, 8) -->
    <circle cx="${bot_angle6.x.toFixed(1)}" cy="${bot_angle6.y.toFixed(1)}" r="18" fill="#ef4444" opacity="0.9"/>
    <text x="${bot_angle6.x.toFixed(1)}" y="${bot_angle6.y.toFixed(1)}" font-family="Arial, sans-serif" font-size="20" font-weight="bold" fill="#fff" text-anchor="middle" dominant-baseline="middle">6</text>

    <circle cx="${bot_angle8.x.toFixed(1)}" cy="${bot_angle8.y.toFixed(1)}" r="18" fill="#ef4444" opacity="0.9"/>
    <text x="${bot_angle8.x.toFixed(1)}" y="${bot_angle8.y.toFixed(1)}" font-family="Arial, sans-serif" font-size="20" font-weight="bold" fill="#fff" text-anchor="middle" dominant-baseline="middle">8</text>

    <!-- Legend - colorful boxes -->
    <rect x="60" y="355" width="480" height="38" fill="#eff6ff" stroke="#3b82f6" stroke-width="2.5" rx="6"/>
    <circle cx="90" cy="374" r="12" fill="#3b82f6"/>
    <text x="115" y="374" font-family="Arial, sans-serif" font-size="17" font-weight="600" fill="#1f2937" dominant-baseline="middle">
      Acute angles (1, 3, 5, 7): All equal
    </text>

    <rect x="60" y="400" width="480" height="38" fill="#fef2f2" stroke="#ef4444" stroke-width="2.5" rx="6"/>
    <circle cx="90" cy="419" r="12" fill="#ef4444"/>
    <text x="115" y="419" font-family="Arial, sans-serif" font-size="17" font-weight="600" fill="#1f2937" dominant-baseline="middle">
      Obtuse angles (2, 4, 6, 8): All equal
    </text>
</svg>`;
}

async function fixTeachingDiagram() {
  console.log('🎨 Making teaching diagram colorful and playful...\n');

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

  // Find the large SVG diagram
  const example3Pos = content.indexOf('<h4>Example 3</h4>');
  const searchArea = content.substring(sectionStart, example3Pos);

  const svgStart = searchArea.indexOf('<svg width="600"');
  const svgEnd = searchArea.indexOf('</svg>', svgStart) + 6;

  if (svgStart === -1 || svgEnd <= svgStart) {
    console.error('❌ Could not find teaching diagram SVG');
    return false;
  }

  const newDiagram = generateColorfulTeachingDiagram();

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
  console.log('🎨 Changes:');
  console.log('  ✅ BLUE circles for acute angles (1, 3, 5, 7)');
  console.log('  ✅ RED circles for obtuse angles (2, 4, 6, 8)');
  console.log('  ✅ White numbers on colored circles (easy to see!)');
  console.log('  ✅ Colorful legend boxes (blue & red backgrounds)');
  console.log('  ✅ Clean, playful, engaging design');
  console.log('  ✅ Visual pattern is instantly recognizable\n');

  return true;
}

async function main() {
  console.log('🚀 Making teaching diagram colorful...\n');
  console.log('='.repeat(70));
  console.log('\n');

  const success = await fixTeachingDiagram();

  console.log('='.repeat(70));
  if (success) {
    console.log('\n✨ Teaching diagram is now colorful and fun! 🎨\n');
  } else {
    console.log('\n❌ Error occurred. Check logs above.\n');
  }
}

main();
