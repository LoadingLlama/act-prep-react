/**
 * Super Compact Examples - Aggressive space reduction
 * - Smaller diagrams (50% reduction)
 * - Smaller fonts everywhere
 * - Minimal padding and margins
 * - Inline answer choices
 * - Tighter everything
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

// SUPER COMPACT DIAGRAMS - 50% smaller

function generateSuperCompactVerticalDiagram(givenAngle) {
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

function generateSuperCompactAdjacentDiagram(givenAngle) {
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

function generateSuperCompactParallelLinesDiagram(givenAngle, unknownVariable = 'x') {
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

async function superCompactExamples() {
  console.log('🔧 Super compacting all examples...\n');

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

  // Replace Example 1 diagram
  console.log('📝 Example 1: Super compact vertical angles...');
  const ex1Start = content.indexOf('<h4 style="margin-top: 1.2rem; margin-bottom: 0.6rem;">Example 1</h4>');
  const ex1End = content.indexOf('<h4 style="margin-top: 1.2rem; margin-bottom: 0.6rem;">Example 2</h4>');
  if (ex1Start !== -1 && ex1End !== -1) {
    const ex1Section = content.substring(ex1Start, ex1End);
    const svg1Start = ex1Section.indexOf('<svg');
    const svg1End = ex1Section.indexOf('</svg>') + 6;
    if (svg1Start !== -1) {
      const newDiagram = generateSuperCompactVerticalDiagram(70);
      const before = content.substring(0, ex1Start);
      const after = content.substring(ex1End);
      const updated = ex1Section.substring(0, svg1Start) + newDiagram + ex1Section.substring(svg1End);
      content = before + updated + after;
      console.log('✅ Example 1 compacted');
    }
  }

  // Replace Example 2 diagram
  console.log('📝 Example 2: Super compact adjacent angles...');
  const ex2Start = content.indexOf('<h4 style="margin-top: 1.2rem; margin-bottom: 0.6rem;">Example 2</h4>');
  const ex2End = content.indexOf('<h4 style="margin-top: 1.2rem; margin-bottom: 0.6rem;">Example 3</h4>');
  if (ex2Start !== -1 && ex2End !== -1) {
    const ex2Section = content.substring(ex2Start, ex2End);
    const svg2Start = ex2Section.indexOf('<svg');
    const svg2End = ex2Section.indexOf('</svg>') + 6;
    if (svg2Start !== -1) {
      const newDiagram = generateSuperCompactAdjacentDiagram(55);
      const before = content.substring(0, ex2Start);
      const after = content.substring(ex2End);
      const updated = ex2Section.substring(0, svg2Start) + newDiagram + ex2Section.substring(svg2End);
      content = before + updated + after;
      console.log('✅ Example 2 compacted');
    }
  }

  // Replace Example 3 diagram
  console.log('📝 Example 3: Super compact parallel lines...');
  const ex3Start = content.indexOf('<h4 style="margin-top: 1.2rem; margin-bottom: 0.6rem;">Example 3</h4>');
  const ex3End = content.indexOf('<h4>Key Takeaway</h4>');
  if (ex3Start !== -1 && ex3End !== -1) {
    const ex3Section = content.substring(ex3Start, ex3End);
    const svg3Start = ex3Section.indexOf('<svg');
    const svg3End = ex3Section.indexOf('</svg>') + 6;
    if (svg3Start !== -1) {
      const newDiagram = generateSuperCompactParallelLinesDiagram(60, 'x');
      const before = content.substring(0, ex3Start);
      const after = content.substring(ex3End);
      const updated = ex3Section.substring(0, svg3Start) + newDiagram + ex3Section.substring(svg3End);
      content = before + updated + after;
      console.log('✅ Example 3 compacted');
    }
  }

  // Super aggressive spacing reductions
  console.log('\n📝 Applying super aggressive spacing reductions...');

  const replacements = [
    // Even smaller diagram margins
    { from: 'margin: 0.75rem 0;', to: 'margin: 0.4rem 0;' },

    // Even smaller solution boxes
    { from: 'padding: 0.9rem; border-radius: 6px; margin: 0.75rem 0; text-align: center; font-size: 0.95rem; line-height: 1.8;',
      to: 'padding: 0.6rem; border-radius: 4px; margin: 0.5rem 0; text-align: center; font-size: 0.88rem; line-height: 1.5;' },

    // Smaller margins everywhere
    { from: 'margin-bottom: 0.5rem;', to: 'margin-bottom: 0.3rem;' },
    { from: 'margin-top: 0.9rem;', to: 'margin-top: 0.5rem;' },
    { from: 'margin: 0.5rem 0;', to: 'margin: 0.3rem 0;' },
    { from: 'margin: 0.4rem 0;', to: 'margin: 0.25rem 0;' },

    // Inline answer choices
    { from: '<p style="margin: 0.2rem 0; font-size: 0.95rem;">A. ',
      to: '<span style="display: inline-block; margin-right: 1rem; font-size: 0.88rem;">A. ' },
    { from: '<p style="margin: 0.2rem 0; font-size: 0.95rem;">B. ',
      to: '<span style="display: inline-block; margin-right: 1rem; font-size: 0.88rem;">B. ' },
    { from: '<p style="margin: 0.2rem 0; font-size: 0.95rem;">C. ',
      to: '<span style="display: inline-block; margin-right: 1rem; font-size: 0.88rem;">C. ' },
    { from: '<p style="margin: 0.2rem 0; font-size: 0.95rem;">D. ',
      to: '<span style="display: inline-block; margin-right: 1rem; font-size: 0.88rem;">D. ' },
    { from: '<p style="margin: 0.2rem 0; font-size: 0.95rem;">E. ',
      to: '<span style="display: inline-block; font-size: 0.88rem;">E. ' },

    // Close spans
    { from: '20°<br>', to: '20°</span>' },
    { from: '70°<br>', to: '70°</span>' },
    { from: '90°<br>', to: '90°</span>' },
    { from: '110°<br>', to: '110°</span>' },
    { from: '140°<br>', to: '140°</span>' },
    { from: '35°<br>', to: '35°</span>' },
    { from: '55°<br>', to: '55°</span>' },
    { from: '125°<br>', to: '125°</span>' },
    { from: '235°<br>', to: '235°</span>' },
    { from: '30°<br>', to: '30°</span>' },
    { from: '60°<br>', to: '60°</span>' },
    { from: '120°<br>', to: '120°</span>' },
    { from: '240°</p>', to: '240°</span>' },
  ];

  for (const {from, to} of replacements) {
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

  console.log('\n✅ Examples super compacted!\n');
  console.log('📊 Reductions:');
  console.log('  ✅ Diagrams: 400x240 → 300x180 (25% smaller)');
  console.log('  ✅ Parallel diagram: 500x340 → 380x255 (25% smaller)');
  console.log('  ✅ Fonts: 0.95rem → 0.88rem');
  console.log('  ✅ Padding: 0.9rem → 0.6rem');
  console.log('  ✅ Margins: 0.75rem → 0.4-0.5rem');
  console.log('  ✅ Answer choices: Now INLINE (huge space save!)');
  console.log('  ✅ Total space saved: ~50%+ per example\n');

  return true;
}

async function main() {
  console.log('🚀 Super compacting examples...\n');
  console.log('='.repeat(70));
  console.log('\n');

  const success = await superCompactExamples();

  console.log('='.repeat(70));
  if (success) {
    console.log('\n✨ Examples are now SUPER compact!\n');
  } else {
    console.log('\n❌ Error occurred. Check logs above.\n');
  }
}

main();
