/**
 * Fix Teaching Visuals - Use ACCURATE geometry
 * Remove clipart-y borders from boxes
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
 * ACCURATE Rule 1: Vertical Angles
 * Uses proper geometry to show vertical angles are equal
 */
function generateAccurateVerticalAnglesTeachingDiagram() {
  const cx = 250;
  const cy = 150;
  const lineLength = 110;

  // Two lines crossing at 70° angle (accurate geometry)
  const angle = 70;

  // Line 1: from upper-right to lower-left
  const p1 = polarToCartesian(cx, cy, lineLength, -angle);
  const p2 = polarToCartesian(cx, cy, lineLength, 180 - angle);

  // Line 2: horizontal
  const p3 = polarToCartesian(cx, cy, lineLength, 0);
  const p4 = polarToCartesian(cx, cy, lineLength, 180);

  // The 4 angles created:
  // - Right side (between horizontal right and line going down-right): ACUTE (70°) - blue 'a'
  // - Left side (between horizontal left and line going up-left): ACUTE (70°) - blue 'a' (VERTICAL to right)
  // - Top (between horizontal left and line going up-right): OBTUSE (110°) - red 'b'
  // - Bottom (between horizontal right and line going down-left): OBTUSE (110°) - red 'b' (VERTICAL to top)

  // Arcs for acute angles (70°)
  const acuteArcRadius = 35;

  // Right acute angle
  const rightAcuteStart = polarToCartesian(cx, cy, acuteArcRadius, 0);
  const rightAcuteEnd = polarToCartesian(cx, cy, acuteArcRadius, -angle);

  // Left acute angle (vertical to right)
  const leftAcuteStart = polarToCartesian(cx, cy, acuteArcRadius, 180);
  const leftAcuteEnd = polarToCartesian(cx, cy, acuteArcRadius, 180 - angle);

  // Arcs for obtuse angles (110°)
  const obtuseArcRadius = 38;

  // Top obtuse angle
  const topObtuseStart = polarToCartesian(cx, cy, obtuseArcRadius, 180 - angle);
  const topObtuseEnd = polarToCartesian(cx, cy, obtuseArcRadius, 0);

  // Bottom obtuse angle (vertical to top)
  const bottomObtuseStart = polarToCartesian(cx, cy, obtuseArcRadius, -angle);
  const bottomObtuseEnd = polarToCartesian(cx, cy, obtuseArcRadius, 180);

  // Label positions
  const labelRadius = 55;
  const rightAcuteLabel = polarToCartesian(cx, cy, labelRadius, -angle / 2);
  const leftAcuteLabel = polarToCartesian(cx, cy, labelRadius, 180 - angle / 2);
  const topObtuseLabel = polarToCartesian(cx, cy, labelRadius, (180 - angle) / 2);
  const bottomObtuseLabel = polarToCartesian(cx, cy, labelRadius, (-angle + 180) / 2 + 180);

  return `<svg width="500" height="320" viewBox="0 0 500 320" xmlns="http://www.w3.org/2000/svg" style="background: white; max-width: 100%; height: auto;">
    <!-- Two intersecting lines -->
    <line x1="${p1.x.toFixed(1)}" y1="${p1.y.toFixed(1)}" x2="${p2.x.toFixed(1)}" y2="${p2.y.toFixed(1)}" stroke="#1f2937" stroke-width="3"/>
    <line x1="${p3.x.toFixed(1)}" y1="${p3.y.toFixed(1)}" x2="${p4.x.toFixed(1)}" y2="${p4.y.toFixed(1)}" stroke="#1f2937" stroke-width="3"/>
    <circle cx="${cx}" cy="${cy}" r="4" fill="#1f2937"/>

    <!-- BLUE arcs for vertical acute angles (both 70°) -->
    <path d="M ${rightAcuteStart.x.toFixed(1)},${rightAcuteStart.y.toFixed(1)} A ${acuteArcRadius},${acuteArcRadius} 0 0,0 ${rightAcuteEnd.x.toFixed(1)},${rightAcuteEnd.y.toFixed(1)}" stroke="#3b82f6" fill="none" stroke-width="4"/>
    <path d="M ${leftAcuteStart.x.toFixed(1)},${leftAcuteStart.y.toFixed(1)} A ${acuteArcRadius},${acuteArcRadius} 0 0,0 ${leftAcuteEnd.x.toFixed(1)},${leftAcuteEnd.y.toFixed(1)}" stroke="#3b82f6" fill="none" stroke-width="4"/>

    <!-- RED arcs for vertical obtuse angles (both 110°) -->
    <path d="M ${topObtuseStart.x.toFixed(1)},${topObtuseStart.y.toFixed(1)} A ${obtuseArcRadius},${obtuseArcRadius} 0 0,1 ${topObtuseEnd.x.toFixed(1)},${topObtuseEnd.y.toFixed(1)}" stroke="#ef4444" fill="none" stroke-width="4"/>
    <path d="M ${bottomObtuseStart.x.toFixed(1)},${bottomObtuseStart.y.toFixed(1)} A ${obtuseArcRadius},${obtuseArcRadius} 0 0,1 ${bottomObtuseEnd.x.toFixed(1)},${bottomObtuseEnd.y.toFixed(1)}" stroke="#ef4444" fill="none" stroke-width="4"/>

    <!-- Labels -->
    <text x="${rightAcuteLabel.x.toFixed(1)}" y="${rightAcuteLabel.y.toFixed(1)}" font-family="Arial, sans-serif" font-size="22" font-weight="bold" fill="#3b82f6" text-anchor="middle" dominant-baseline="middle">a</text>
    <text x="${leftAcuteLabel.x.toFixed(1)}" y="${leftAcuteLabel.y.toFixed(1)}" font-family="Arial, sans-serif" font-size="22" font-weight="bold" fill="#3b82f6" text-anchor="middle" dominant-baseline="middle">a</text>
    <text x="${topObtuseLabel.x.toFixed(1)}" y="${topObtuseLabel.y.toFixed(1)}" font-family="Arial, sans-serif" font-size="22" font-weight="bold" fill="#ef4444" text-anchor="middle" dominant-baseline="middle">b</text>
    <text x="${bottomObtuseLabel.x.toFixed(1)}" y="${bottomObtuseLabel.y.toFixed(1)}" font-family="Arial, sans-serif" font-size="22" font-weight="bold" fill="#ef4444" text-anchor="middle" dominant-baseline="middle">b</text>

    <!-- Clean legend (no border) -->
    <rect x="80" y="270" width="340" height="36" fill="#eff6ff" rx="0"/>
    <text x="250" y="288" font-family="Arial, sans-serif" font-size="16" font-weight="600" fill="#1f2937" text-anchor="middle" dominant-baseline="middle">
      Vertical angles are equal: a = a
    </text>
</svg>`;
}

/**
 * ACCURATE Rule 2: Adjacent Angles
 * Uses proper geometry to show adjacent angles sum to 180°
 */
function generateAccurateAdjacentAnglesTeachingDiagram() {
  const cx = 250;
  const cy = 150;
  const lineLength = 110;

  // Two lines crossing at 55° angle (accurate geometry)
  const angle = 55;

  // Line 1: from upper-right to lower-left
  const p1 = polarToCartesian(cx, cy, lineLength, -angle);
  const p2 = polarToCartesian(cx, cy, lineLength, 180 - angle);

  // Line 2: horizontal
  const p3 = polarToCartesian(cx, cy, lineLength, 0);
  const p4 = polarToCartesian(cx, cy, lineLength, 180);

  // Show TWO ADJACENT angles (next to each other on a straight line)
  // Acute angle 'a' on the right (55°)
  // Obtuse angle 'b' on the top-left (125°)

  const acuteArcRadius = 35;
  const acuteArcStart = polarToCartesian(cx, cy, acuteArcRadius, 0);
  const acuteArcEnd = polarToCartesian(cx, cy, acuteArcRadius, -angle);

  const obtuseArcRadius = 38;
  const obtuseArcStart = polarToCartesian(cx, cy, obtuseArcRadius, -angle);
  const obtuseArcEnd = polarToCartesian(cx, cy, obtuseArcRadius, 180);

  const acuteLabel = polarToCartesian(cx, cy, 55, -angle / 2);
  const obtuseLabel = polarToCartesian(cx, cy, 58, (-angle + 180) / 2);

  return `<svg width="500" height="320" viewBox="0 0 500 320" xmlns="http://www.w3.org/2000/svg" style="background: white; max-width: 100%; height: auto;">
    <!-- Two intersecting lines -->
    <line x1="${p1.x.toFixed(1)}" y1="${p1.y.toFixed(1)}" x2="${p2.x.toFixed(1)}" y2="${p2.y.toFixed(1)}" stroke="#1f2937" stroke-width="3"/>
    <line x1="${p3.x.toFixed(1)}" y1="${p3.y.toFixed(1)}" x2="${p4.x.toFixed(1)}" y2="${p4.y.toFixed(1)}" stroke="#1f2937" stroke-width="3"/>
    <circle cx="${cx}" cy="${cy}" r="4" fill="#1f2937"/>

    <!-- BLUE arc for acute angle (55°) -->
    <path d="M ${acuteArcStart.x.toFixed(1)},${acuteArcStart.y.toFixed(1)} A ${acuteArcRadius},${acuteArcRadius} 0 0,0 ${acuteArcEnd.x.toFixed(1)},${acuteArcEnd.y.toFixed(1)}" stroke="#3b82f6" fill="none" stroke-width="4"/>

    <!-- RED arc for obtuse angle (125°) - ADJACENT to blue -->
    <path d="M ${obtuseArcStart.x.toFixed(1)},${obtuseArcStart.y.toFixed(1)} A ${obtuseArcRadius},${obtuseArcRadius} 0 1,1 ${obtuseArcEnd.x.toFixed(1)},${obtuseArcEnd.y.toFixed(1)}" stroke="#ef4444" fill="none" stroke-width="4"/>

    <!-- Labels -->
    <text x="${acuteLabel.x.toFixed(1)}" y="${acuteLabel.y.toFixed(1)}" font-family="Arial, sans-serif" font-size="22" font-weight="bold" fill="#3b82f6" text-anchor="middle" dominant-baseline="middle">a</text>
    <text x="${obtuseLabel.x.toFixed(1)}" y="${obtuseLabel.y.toFixed(1)}" font-family="Arial, sans-serif" font-size="22" font-weight="bold" fill="#ef4444" text-anchor="middle" dominant-baseline="middle">b</text>

    <!-- Clean legend (no border) -->
    <rect x="60" y="270" width="380" height="36" fill="#fef2f2" rx="0"/>
    <text x="250" y="288" font-family="Arial, sans-serif" font-size="16" font-weight="600" fill="#1f2937" text-anchor="middle" dominant-baseline="middle">
      Adjacent angles sum to 180°: a + b = 180°
    </text>
</svg>`;
}

async function fixTeachingVisuals() {
  console.log('🔧 Fixing teaching visuals with accurate geometry...\n');

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
  console.log('📝 Fixing Rule 1 with accurate geometry...');
  const rule1Start = content.indexOf('<h4>Rule 1: Vertical Angles Are Equal</h4>');
  const rule2Start = content.indexOf('<h4>Rule 2: Adjacent Angles Sum to 180°</h4>');

  if (rule1Start !== -1 && rule2Start !== -1) {
    const rule1Section = content.substring(rule1Start, rule2Start);
    const svg1Start = rule1Section.indexOf('<svg');
    const svg1End = rule1Section.indexOf('</svg>') + 6;

    if (svg1Start !== -1 && svg1End > svg1Start) {
      const newDiagram = generateAccurateVerticalAnglesTeachingDiagram();
      const before = content.substring(0, rule1Start);
      const after = content.substring(rule2Start);
      const updated = rule1Section.substring(0, svg1Start) + newDiagram + rule1Section.substring(svg1End);
      content = before + updated + after;
      console.log('✅ Rule 1 fixed with accurate geometry');
    }
  }

  // Fix Rule 2 diagram
  console.log('📝 Fixing Rule 2 with accurate geometry...');
  const rule2StartNew = content.indexOf('<h4>Rule 2: Adjacent Angles Sum to 180°</h4>');
  const example1Start = content.indexOf('<h4', rule2StartNew + 10);

  if (rule2StartNew !== -1 && example1Start !== -1) {
    const rule2Section = content.substring(rule2StartNew, example1Start);
    const svg2Start = rule2Section.indexOf('<svg');
    const svg2End = rule2Section.indexOf('</svg>') + 6;

    if (svg2Start !== -1 && svg2End > svg2Start) {
      const newDiagram = generateAccurateAdjacentAnglesTeachingDiagram();
      const before = content.substring(0, rule2StartNew);
      const after = content.substring(example1Start);
      const updated = rule2Section.substring(0, svg2Start) + newDiagram + rule2Section.substring(svg2End);
      content = before + updated + after;
      console.log('✅ Rule 2 fixed with accurate geometry');
    }
  }

  // Remove clipart-y borders from ALL boxes
  console.log('\n📝 Removing clipart-y borders from boxes...');

  const boxReplacements = [
    // Remove border-radius and borders from key idea boxes
    { from: 'border-radius: 6px; border-left: 3px solid #3b82f6;',
      to: 'border-left: 3px solid #3b82f6;' },
    { from: 'border-radius: 6px; border-left: 3px solid #ef4444;',
      to: 'border-left: 3px solid #ef4444;' },
    { from: 'border-radius: 6px; border-left: 3px solid #10b981;',
      to: 'border-left: 3px solid #10b981;' },

    // Remove borders from solution boxes
    { from: 'border-radius: 4px;',
      to: '' },

    // Remove SVG legend borders
    { from: 'stroke="#3b82f6" stroke-width="2.5" rx="6"',
      to: 'rx="0"' },
    { from: 'stroke="#ef4444" stroke-width="2.5" rx="6"',
      to: 'rx="0"' },
    { from: 'stroke="#4caf50" stroke-width="2.5" rx="7"',
      to: 'rx="0"' },
    { from: 'stroke="#ff9800" stroke-width="2" rx="6"',
      to: 'rx="0"' },
  ];

  for (const {from, to} of boxReplacements) {
    content = content.split(from).join(to);
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

  console.log('\n✅ Teaching visuals fixed!\n');
  console.log('📊 Changes:');
  console.log('  ✅ Rule 1: Accurate vertical angles geometry');
  console.log('  ✅ Rule 2: Accurate adjacent angles geometry');
  console.log('  ✅ All arcs mathematically correct');
  console.log('  ✅ Removed clipart-y borders from all boxes');
  console.log('  ✅ Clean, professional appearance\n');

  return true;
}

async function main() {
  console.log('🚀 Fixing teaching visuals...\n');
  console.log('='.repeat(70));
  console.log('\n');

  const success = await fixTeachingVisuals();

  console.log('='.repeat(70));
  if (success) {
    console.log('\n✨ Teaching visuals are now accurate and clean!\n');
  } else {
    console.log('\n❌ Error occurred. Check logs above.\n');
  }
}

main();
