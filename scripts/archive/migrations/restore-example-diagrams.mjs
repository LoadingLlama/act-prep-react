/**
 * Restore Example Diagrams - They went missing!
 * Check current state and restore compact diagrams
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

function lineIntersection(x1, y1, x2, y2, x3, y3, x4, y4) {
  const denominator = (x1 - x2) * (y3 - y4) - (y1 - y2) * (x3 - x4);
  if (Math.abs(denominator) < 0.0001) return null;
  const t = ((x1 - x3) * (y3 - y4) - (y1 - y3) * (x3 - x4)) / denominator;
  return { x: x1 + t * (x2 - x1), y: y1 + t * (y2 - y1) };
}

// Compact diagram generators
function generateCompactVerticalDiagram(givenAngle) {
  const cx = 150;
  const cy = 90;
  const lineLength = 70;

  const angle1 = givenAngle;
  const p1 = polarToCartesian(cx, cy, lineLength, -angle1);
  const p2 = polarToCartesian(cx, cy, lineLength, 180 - angle1);
  const p3 = polarToCartesian(cx, cy, lineLength, 0);
  const p4 = polarToCartesian(cx, cy, lineLength, 180);

  const arcRadius = 18;
  const arcStart = polarToCartesian(cx, cy, arcRadius, 0);
  const arcEnd = polarToCartesian(cx, cy, arcRadius, -angle1);
  const vertArcStart = polarToCartesian(cx, cy, arcRadius, 180);
  const vertArcEnd = polarToCartesian(cx, cy, arcRadius, 180 - angle1);

  const givenLabelPos = polarToCartesian(cx, cy, 32, -angle1 / 2);
  const vertLabelPos = polarToCartesian(cx, cy, 32, 180 - angle1 / 2);

  return `<svg width="300" height="180" viewBox="0 0 300 180" xmlns="http://www.w3.org/2000/svg" style="background: white; max-width: 100%; height: auto;">
    <line x1="${p1.x.toFixed(1)}" y1="${p1.y.toFixed(1)}" x2="${p2.x.toFixed(1)}" y2="${p2.y.toFixed(1)}" stroke="#000" stroke-width="1.5"/>
    <line x1="${p3.x.toFixed(1)}" y1="${p3.y.toFixed(1)}" x2="${p4.x.toFixed(1)}" y2="${p4.y.toFixed(1)}" stroke="#000" stroke-width="1.5"/>
    <circle cx="${cx}" cy="${cy}" r="2.5" fill="#000"/>
    <path d="M ${arcStart.x.toFixed(1)},${arcStart.y.toFixed(1)} A ${arcRadius},${arcRadius} 0 0,0 ${arcEnd.x.toFixed(1)},${arcEnd.y.toFixed(1)}" stroke="#000" fill="none" stroke-width="1.2"/>
    <path d="M ${vertArcStart.x.toFixed(1)},${vertArcStart.y.toFixed(1)} A ${arcRadius},${arcRadius} 0 0,0 ${vertArcEnd.x.toFixed(1)},${vertArcEnd.y.toFixed(1)}" stroke="#000" fill="none" stroke-width="1.2"/>
    <text x="${givenLabelPos.x.toFixed(1)}" y="${givenLabelPos.y.toFixed(1)}" font-family="Times New Roman, serif" font-size="14" fill="#000" text-anchor="middle" dominant-baseline="middle">${givenAngle}°</text>
    <text x="${vertLabelPos.x.toFixed(1)}" y="${vertLabelPos.y.toFixed(1)}" font-family="Times New Roman, serif" font-size="15" font-style="italic" fill="#000" text-anchor="middle" dominant-baseline="middle">?</text>
</svg>`;
}

function generateCompactAdjacentDiagram(givenAngle) {
  const cx = 150;
  const cy = 90;
  const lineLength = 70;

  const angle1 = givenAngle;
  const p1 = polarToCartesian(cx, cy, lineLength, -angle1);
  const p2 = polarToCartesian(cx, cy, lineLength, 180 - angle1);
  const p3 = polarToCartesian(cx, cy, lineLength, 0);
  const p4 = polarToCartesian(cx, cy, lineLength, 180);

  const arcRadius1 = 18;
  const arcStart1 = polarToCartesian(cx, cy, arcRadius1, 0);
  const arcEnd1 = polarToCartesian(cx, cy, arcRadius1, -angle1);

  const arcRadius2 = 22;
  const adjArcStart = polarToCartesian(cx, cy, arcRadius2, -angle1);
  const adjArcEnd = polarToCartesian(cx, cy, arcRadius2, 180);

  const givenLabelPos = polarToCartesian(cx, cy, 32, -angle1 / 2);
  const adjLabelPos = polarToCartesian(cx, cy, 40, (-angle1 + 180) / 2);

  return `<svg width="300" height="180" viewBox="0 0 300 180" xmlns="http://www.w3.org/2000/svg" style="background: white; max-width: 100%; height: auto;">
    <line x1="${p1.x.toFixed(1)}" y1="${p1.y.toFixed(1)}" x2="${p2.x.toFixed(1)}" y2="${p2.y.toFixed(1)}" stroke="#000" stroke-width="1.5"/>
    <line x1="${p3.x.toFixed(1)}" y1="${p3.y.toFixed(1)}" x2="${p4.x.toFixed(1)}" y2="${p4.y.toFixed(1)}" stroke="#000" stroke-width="1.5"/>
    <circle cx="${cx}" cy="${cy}" r="2.5" fill="#000"/>
    <path d="M ${arcStart1.x.toFixed(1)},${arcStart1.y.toFixed(1)} A ${arcRadius1},${arcRadius1} 0 0,0 ${arcEnd1.x.toFixed(1)},${arcEnd1.y.toFixed(1)}" stroke="#000" fill="none" stroke-width="1.2"/>
    <path d="M ${adjArcStart.x.toFixed(1)},${adjArcStart.y.toFixed(1)} A ${arcRadius2},${arcRadius2} 0 1,1 ${adjArcEnd.x.toFixed(1)},${adjArcEnd.y.toFixed(1)}" stroke="#000" fill="none" stroke-width="1.2"/>
    <text x="${givenLabelPos.x.toFixed(1)}" y="${givenLabelPos.y.toFixed(1)}" font-family="Times New Roman, serif" font-size="14" fill="#000" text-anchor="middle" dominant-baseline="middle">${givenAngle}°</text>
    <text x="${adjLabelPos.x.toFixed(1)}" y="${adjLabelPos.y.toFixed(1)}" font-family="Times New Roman, serif" font-size="15" font-style="italic" fill="#000" text-anchor="middle" dominant-baseline="middle">?</text>
</svg>`;
}

function generateCompactParallelLinesDiagram(givenAngle, unknownVariable = 'x') {
  const line1Y = 90;
  const line2Y = 180;
  const lineStart = 40;
  const lineEnd = 340;

  const transX1 = 100;
  const transY1 = 45;
  const dy = 165;
  const slope = Math.tan(givenAngle * Math.PI / 180);
  const transX2 = transX1 + dy / slope;
  const transY2 = 210;

  const int1 = lineIntersection(lineStart, line1Y, lineEnd, line1Y, transX1, transY1, transX2, transY2);
  const int2 = lineIntersection(lineStart, line2Y, lineEnd, line2Y, transX1, transY1, transX2, transY2);

  const givenLabelPos = polarToCartesian(int1.x, int1.y, 38, givenAngle / 2);
  const transUpAngle = Math.atan2(transY1 - int2.y, transX1 - int2.x) * (180 / Math.PI);
  const unknownLabelPos = polarToCartesian(int2.x, int2.y, 38, (transUpAngle + 360) / 2 + 180);

  const transDownAngle = Math.atan2(transY2 - int1.y, transX2 - int1.x) * (180 / Math.PI);
  const transUpAngle2 = Math.atan2(transY1 - int2.y, transX1 - int2.x) * (180 / Math.PI);

  const givenArcStart = polarToCartesian(int1.x, int1.y, 16, 0);
  const givenArcEnd = polarToCartesian(int1.x, int1.y, 16, transDownAngle);
  const unknownArcStart = polarToCartesian(int2.x, int2.y, 16, transUpAngle2);
  const unknownArcEnd = polarToCartesian(int2.x, int2.y, 16, 0);

  return `<svg width="380" height="255" viewBox="0 0 380 255" xmlns="http://www.w3.org/2000/svg" style="background: white; max-width: 100%; height: auto;">
    <line x1="${lineStart}" y1="${line1Y}" x2="${lineEnd}" y2="${line1Y}" stroke="#000" stroke-width="1.5"/>
    <line x1="${lineStart}" y1="${line2Y}" x2="${lineEnd}" y2="${line2Y}" stroke="#000" stroke-width="1.5"/>
    <line x1="${transX1.toFixed(1)}" y1="${transY1}" x2="${transX2.toFixed(1)}" y2="${transY2}" stroke="#000" stroke-width="1.5"/>
    <path d="M ${givenArcStart.x.toFixed(1)},${givenArcStart.y.toFixed(1)} A 16,16 0 0,1 ${givenArcEnd.x.toFixed(1)},${givenArcEnd.y.toFixed(1)}" stroke="#000" fill="none" stroke-width="1.2"/>
    <path d="M ${unknownArcStart.x.toFixed(1)},${unknownArcStart.y.toFixed(1)} A 16,16 0 0,1 ${unknownArcEnd.x.toFixed(1)},${unknownArcEnd.y.toFixed(1)}" stroke="#000" fill="none" stroke-width="1.2"/>
    <text x="${givenLabelPos.x.toFixed(1)}" y="${givenLabelPos.y.toFixed(1)}" font-family="Times New Roman, serif" font-size="14" fill="#000" text-anchor="middle" dominant-baseline="middle">${givenAngle}°</text>
    <text x="${unknownLabelPos.x.toFixed(1)}" y="${unknownLabelPos.y.toFixed(1)}" font-family="Times New Roman, serif" font-size="15" font-style="italic" fill="#000" text-anchor="middle" dominant-baseline="middle">${unknownVariable}°</text>
</svg>`;
}

async function restoreDiagrams() {
  console.log('🔧 Checking and restoring example diagrams...\n');

  const { data: lesson } = await supabase
    .from('lessons')
    .select('*')
    .eq('lesson_key', 'geometry-angles')
    .single();

  let content = lesson.content;

  // Check current state
  const svgCount = (content.match(/<svg/g) || []).length;
  console.log(`📊 Current state: Found ${svgCount} SVG diagrams in lesson\n`);

  // Find each example and check for diagrams
  const examples = [
    { name: 'Example 1', angle: 70, type: 'vertical' },
    { name: 'Example 2', angle: 55, type: 'adjacent' },
    { name: 'Example 3', angle: 60, type: 'parallel' }
  ];

  for (const ex of examples) {
    console.log(`📝 Checking ${ex.name}...`);

    // Find the example section
    const exHeaderRegex = new RegExp(`<h4[^>]*>${ex.name}</h4>`);
    const exMatch = content.match(exHeaderRegex);

    if (!exMatch) {
      console.log(`   ❌ Could not find ${ex.name} header`);
      continue;
    }

    const exStart = content.indexOf(exMatch[0]);
    const nextExHeader = content.indexOf('<h4', exStart + 10);
    const exSection = content.substring(exStart, nextExHeader !== -1 ? nextExHeader : content.length);

    // Check if it has an SVG
    const hasSvg = exSection.includes('<svg');

    if (hasSvg) {
      console.log(`   ✅ ${ex.name} has diagram - OK`);
    } else {
      console.log(`   ⚠️  ${ex.name} MISSING diagram - RESTORING...`);

      // Find where to insert diagram - after "Problem:" paragraph
      const problemMatch = exSection.match(/<p style="margin: 0\.25rem 0 0\.15rem 0; font-size: 0\.9rem;"><strong>Problem:<\/strong><\/p>([\s\S]*?)<p/);

      if (problemMatch) {
        const insertPoint = exStart + exSection.indexOf(problemMatch[0]) + problemMatch[0].length - 2; // Before the closing <p>

        // Generate the appropriate diagram
        let diagram = '';
        if (ex.type === 'vertical') {
          diagram = generateCompactVerticalDiagram(ex.angle);
        } else if (ex.type === 'adjacent') {
          diagram = generateCompactAdjacentDiagram(ex.angle);
        } else if (ex.type === 'parallel') {
          diagram = generateCompactParallelLinesDiagram(ex.angle, 'x');
        }

        const diagramContainer = `\n\n<div style="text-align: center; margin: 0.25rem 0;">\n    ${diagram}\n</div>\n\n`;

        // Insert the diagram
        const before = content.substring(0, insertPoint);
        const after = content.substring(insertPoint);
        content = before + diagramContainer + after;

        console.log(`   ✅ Restored ${ex.name} diagram`);
      } else {
        console.log(`   ❌ Could not find insertion point for ${ex.name}`);
      }
    }
  }

  // Update database
  console.log('\n💾 Updating database...');

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

  console.log('✅ Diagrams restored!\n');
  return true;
}

async function main() {
  console.log('🚀 Restoring example diagrams...\n');
  console.log('='.repeat(70));
  console.log('\n');

  const success = await restoreDiagrams();

  console.log('='.repeat(70));
  if (success) {
    console.log('\n✨ All diagrams restored!\n');
  } else {
    console.log('\n❌ Error occurred.\n');
  }
}

main();
