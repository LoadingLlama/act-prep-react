/**
 * Fix "When Two Lines Intersect" Section
 * Separate Rule 1 and Rule 2 into distinct sections with individual visuals
 * Make the lesson slower and clearer
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
 * Generate visual for Rule 1: Vertical Angles (colorful teaching visual)
 */
function generateVerticalAnglesTeachingDiagram() {
  const cx = 250;
  const cy = 150;
  const lineLength = 110;

  // Lines at 70° angle for visual clarity
  const angle = 70;
  const p1 = polarToCartesian(cx, cy, lineLength, -angle);
  const p2 = polarToCartesian(cx, cy, lineLength, 180 - angle);
  const p3 = polarToCartesian(cx, cy, lineLength, 0);
  const p4 = polarToCartesian(cx, cy, lineLength, 180);

  // Label positions for the 4 angles
  const labelRadius = 50;
  const angle1Pos = polarToCartesian(cx, cy, labelRadius, -angle / 2); // Right acute
  const angle2Pos = polarToCartesian(cx, cy, labelRadius, 180 - angle / 2); // Left acute (vertical to angle1)
  const angle3Pos = polarToCartesian(cx, cy, labelRadius, (-angle + 180) / 2); // Top obtuse
  const angle4Pos = polarToCartesian(cx, cy, labelRadius, (180 + (360 - angle)) / 2); // Bottom obtuse

  return `<svg width="500" height="320" viewBox="0 0 500 320" xmlns="http://www.w3.org/2000/svg" style="background: white; max-width: 100%; height: auto;">
    <!-- Two intersecting lines -->
    <line x1="${p1.x.toFixed(1)}" y1="${p1.y.toFixed(1)}" x2="${p2.x.toFixed(1)}" y2="${p2.y.toFixed(1)}" stroke="#1f2937" stroke-width="3"/>
    <line x1="${p3.x.toFixed(1)}" y1="${p3.y.toFixed(1)}" x2="${p4.x.toFixed(1)}" y2="${p4.y.toFixed(1)}" stroke="#1f2937" stroke-width="3"/>

    <!-- Center point -->
    <circle cx="${cx}" cy="${cy}" r="4" fill="#1f2937"/>

    <!-- Highlight vertical angle pairs with matching colors -->
    <!-- Acute angles (blue) - angles 'a' -->
    <circle cx="${angle1Pos.x.toFixed(1)}" cy="${angle1Pos.y.toFixed(1)}" r="22" fill="#3b82f6" opacity="0.85"/>
    <text x="${angle1Pos.x.toFixed(1)}" y="${angle1Pos.y.toFixed(1)}" font-family="Arial, sans-serif" font-size="24" font-weight="bold" fill="#fff" text-anchor="middle" dominant-baseline="middle">a</text>

    <circle cx="${angle2Pos.x.toFixed(1)}" cy="${angle2Pos.y.toFixed(1)}" r="22" fill="#3b82f6" opacity="0.85"/>
    <text x="${angle2Pos.x.toFixed(1)}" y="${angle2Pos.y.toFixed(1)}" font-family="Arial, sans-serif" font-size="24" font-weight="bold" fill="#fff" text-anchor="middle" dominant-baseline="middle">a</text>

    <!-- Obtuse angles (red) - angles 'b' -->
    <circle cx="${angle3Pos.x.toFixed(1)}" cy="${angle3Pos.y.toFixed(1)}" r="22" fill="#ef4444" opacity="0.85"/>
    <text x="${angle3Pos.x.toFixed(1)}" y="${angle3Pos.y.toFixed(1)}" font-family="Arial, sans-serif" font-size="24" font-weight="bold" fill="#fff" text-anchor="middle" dominant-baseline="middle">b</text>

    <circle cx="${angle4Pos.x.toFixed(1)}" cy="${angle4Pos.y.toFixed(1)}" r="22" fill="#ef4444" opacity="0.85"/>
    <text x="${angle4Pos.x.toFixed(1)}" y="${angle4Pos.y.toFixed(1)}" font-family="Arial, sans-serif" font-size="24" font-weight="bold" fill="#fff" text-anchor="middle" dominant-baseline="middle">b</text>

    <!-- Legend -->
    <rect x="80" y="270" width="340" height="38" fill="#eff6ff" stroke="#3b82f6" stroke-width="2.5" rx="6"/>
    <circle cx="110" cy="289" r="10" fill="#3b82f6"/>
    <text x="135" y="289" font-family="Arial, sans-serif" font-size="17" font-weight="600" fill="#1f2937" dominant-baseline="middle">
      Vertical angles are equal: a = a
    </text>
</svg>`;
}

/**
 * Generate visual for Rule 2: Adjacent Angles (colorful teaching visual)
 */
function generateAdjacentAnglesTeachingDiagram() {
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

  // Arc for acute angle
  const arcRadius = 35;
  const acuteArcStart = polarToCartesian(cx, cy, arcRadius, 0);
  const acuteArcEnd = polarToCartesian(cx, cy, arcRadius, -angle);

  // Arc for obtuse angle (adjacent to acute)
  const obtuseArcStart = polarToCartesian(cx, cy, arcRadius + 5, -angle);
  const obtuseArcEnd = polarToCartesian(cx, cy, arcRadius + 5, 180);

  return `<svg width="500" height="320" viewBox="0 0 500 320" xmlns="http://www.w3.org/2000/svg" style="background: white; max-width: 100%; height: auto;">
    <!-- Two intersecting lines -->
    <line x1="${p1.x.toFixed(1)}" y1="${p1.y.toFixed(1)}" x2="${p2.x.toFixed(1)}" y2="${p2.y.toFixed(1)}" stroke="#1f2937" stroke-width="3"/>
    <line x1="${p3.x.toFixed(1)}" y1="${p3.y.toFixed(1)}" x2="${p4.x.toFixed(1)}" y2="${p4.y.toFixed(1)}" stroke="#1f2937" stroke-width="3"/>

    <!-- Center point -->
    <circle cx="${cx}" cy="${cy}" r="4" fill="#1f2937"/>

    <!-- Highlight the two ADJACENT angles -->
    <!-- Acute angle (blue) with arc -->
    <path d="M ${acuteArcStart.x.toFixed(1)},${acuteArcStart.y.toFixed(1)} A ${arcRadius},${arcRadius} 0 0,0 ${acuteArcEnd.x.toFixed(1)},${acuteArcEnd.y.toFixed(1)}" stroke="#3b82f6" fill="none" stroke-width="4"/>
    <circle cx="${acuteLabelPos.x.toFixed(1)}" cy="${acuteLabelPos.y.toFixed(1)}" r="22" fill="#3b82f6" opacity="0.85"/>
    <text x="${acuteLabelPos.x.toFixed(1)}" y="${acuteLabelPos.y.toFixed(1)}" font-family="Arial, sans-serif" font-size="24" font-weight="bold" fill="#fff" text-anchor="middle" dominant-baseline="middle">a</text>

    <!-- Obtuse angle (red) with arc - ADJACENT to the blue angle -->
    <path d="M ${obtuseArcStart.x.toFixed(1)},${obtuseArcStart.y.toFixed(1)} A ${arcRadius + 5},${arcRadius + 5} 0 1,1 ${obtuseArcEnd.x.toFixed(1)},${obtuseArcEnd.y.toFixed(1)}" stroke="#ef4444" fill="none" stroke-width="4"/>
    <circle cx="${obtuseLabelPos.x.toFixed(1)}" cy="${obtuseLabelPos.y.toFixed(1)}" r="22" fill="#ef4444" opacity="0.85"/>
    <text x="${obtuseLabelPos.x.toFixed(1)}" y="${obtuseLabelPos.y.toFixed(1)}" font-family="Arial, sans-serif" font-size="24" font-weight="bold" fill="#fff" text-anchor="middle" dominant-baseline="middle">b</text>

    <!-- Legend -->
    <rect x="60" y="270" width="380" height="38" fill="#fef2f2" stroke="#ef4444" stroke-width="2.5" rx="6"/>
    <text x="250" y="289" font-family="Arial, sans-serif" font-size="17" font-weight="600" fill="#1f2937" text-anchor="middle" dominant-baseline="middle">
      Adjacent angles sum to 180°: a + b = 180°
    </text>
</svg>`;
}

async function fixIntersectingLinesSection() {
  console.log('🔧 Fixing "When Two Lines Intersect" section...\n');
  console.log('Making the lesson slower with separate visuals for each rule\n');

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

  // Find the section we need to replace
  const sectionStart = content.indexOf('<h3>When Two Lines Intersect</h3>');
  const sectionEnd = content.indexOf('<h4>Example 1</h4>');

  if (sectionStart === -1 || sectionEnd === -1) {
    console.error('❌ Could not find section to replace');
    return false;
  }

  // Create the new, slower-paced section
  const newSection = `
            <h3>When Two Lines Intersect</h3>

            <p>When two straight lines cross, they create 4 angles. Let's learn about them <strong>one rule at a time</strong>.</p>

            <br>

            <h4>Rule 1: Vertical Angles Are Equal</h4>

            <p>When two lines cross, the angles that are <strong>across from each other</strong> (called vertical angles) are always equal!</p>

            <p>Look at the diagram below. Notice how the two blue angles (both labeled "a") are across from each other? They're vertical angles, so they're equal. The same is true for the two red angles (both labeled "b").</p>

            <div style="text-align: center; margin: 1.5rem 0;">
                ${generateVerticalAnglesTeachingDiagram()}
            </div>

            <div style="background: #eff6ff; padding: 1.2rem; border-radius: 8px; border-left: 4px solid #3b82f6; margin: 1.5rem 0;">
                <p style="margin: 0; font-weight: 600; color: #1e3a8a; font-size: 1.05rem;">Key Idea:</p>
                <p style="margin: 0.5rem 0 0 0;">Angles across from each other are always equal. If one angle is 70°, the angle across from it is also 70°!</p>
            </div>

            <br>

            <h4>Rule 2: Adjacent Angles Sum to 180°</h4>

            <p>Now let's look at angles that are <strong>next to each other</strong> on a straight line (called adjacent angles). These angles always add up to 180°!</p>

            <p>In the diagram below, the blue angle (a) and the red angle (b) are next to each other on a straight line. No matter what their individual measurements are, they always add up to 180°.</p>

            <div style="text-align: center; margin: 1.5rem 0;">
                ${generateAdjacentAnglesTeachingDiagram()}
            </div>

            <div style="background: #fef2f2; padding: 1.2rem; border-radius: 8px; border-left: 4px solid #ef4444; margin: 1.5rem 0;">
                <p style="margin: 0; font-weight: 600; color: #7f1d1d; font-size: 1.05rem;">Key Idea:</p>
                <p style="margin: 0.5rem 0 0 0;">Angles next to each other on a straight line add up to 180°. If one angle is 55°, the adjacent angle is 180° − 55° = 125°!</p>
            </div>

            <br>

            <div style="background: #f0fdf4; padding: 1.2rem; border-radius: 8px; border-left: 4px solid #10b981; margin: 1.5rem 0;">
                <p style="margin: 0; font-weight: 600; color: #064e3b; font-size: 1.05rem;">✓ Remember These Two Rules:</p>
                <ul style="margin: 0.5rem 0 0 1.5rem;">
                    <li><strong>Vertical angles</strong> (across from each other) are equal</li>
                    <li><strong>Adjacent angles</strong> (next to each other) sum to 180°</li>
                </ul>
            </div>

            <br><br>
`;

  // Replace the old section
  const before = content.substring(0, sectionStart);
  const after = content.substring(sectionEnd);
  const updatedContent = before + newSection + after;

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

  console.log('✅ Section updated successfully!\n');
  console.log('📊 Changes:');
  console.log('  ✅ Separated into Rule 1 and Rule 2 sections');
  console.log('  ✅ Rule 1: Vertical Angles - dedicated visual');
  console.log('  ✅ Rule 2: Adjacent Angles - dedicated visual');
  console.log('  ✅ Colorful teaching diagrams for each rule');
  console.log('  ✅ Key idea boxes for emphasis');
  console.log('  ✅ Summary box at the end');
  console.log('  ✅ Slower, clearer pacing\n');

  return true;
}

async function main() {
  console.log('🚀 Slowing down the lesson - separating rules...\n');
  console.log('='.repeat(70));
  console.log('\n');

  const success = await fixIntersectingLinesSection();

  console.log('='.repeat(70));
  if (success) {
    console.log('\n✨ Lesson is now slower and clearer!\n');
    console.log('Students will learn one rule at a time with dedicated visuals.\n');
  } else {
    console.log('\n❌ Error occurred. Check logs above.\n');
  }
}

main();
