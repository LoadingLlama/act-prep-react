/**
 * Generate Example 3 diagram with 60° angles and arcs
 */

import { polarToCartesian, getAngle, bisector } from './geometry-diagram-generator.mjs';

function generateExample3Diagram() {
  const line1Y = 120;
  const line2Y = 260;
  const transversal = { x1: 180, y1: 60, x2: 420, y2: 320 };
  const lineStart = 70;
  const lineEnd = 480;

  // Calculate intersection points
  function lineIntersection(x1, y1, x2, y2, x3, y3, x4, y4) {
    const denominator = (x1 - x2) * (y3 - y4) - (y1 - y2) * (x3 - x4);
    if (Math.abs(denominator) < 0.0001) return null;
    const t = ((x1 - x3) * (y3 - y4) - (y1 - y3) * (x3 - x4)) / denominator;
    return {
      x: x1 + t * (x2 - x1),
      y: y1 + t * (y2 - y1)
    };
  }

  const int1 = lineIntersection(
    lineStart, line1Y, lineEnd, line1Y,
    transversal.x1, transversal.y1, transversal.x2, transversal.y2
  );

  const int2 = lineIntersection(
    lineStart, line2Y, lineEnd, line2Y,
    transversal.x1, transversal.y1, transversal.x2, transversal.y2
  );

  console.log('Int1:', int1);
  console.log('Int2:', int2);

  // Calculate ray angles
  const int1Angles = {
    right: 0,
    left: 180,
    transUp: getAngle(int1.x, int1.y, transversal.x1, transversal.y1),
    transDown: getAngle(int1.x, int1.y, transversal.x2, transversal.y2)
  };

  const int2Angles = {
    right: 0,
    left: 180,
    transUp: getAngle(int2.x, int2.y, transversal.x1, transversal.y1),
    transDown: getAngle(int2.x, int2.y, transversal.x2, transversal.y2)
  };

  console.log('Int1 angles:', int1Angles);
  console.log('Int2 angles:', int2Angles);

  // The acute angle between the transversal and horizontal
  const acuteAngle = int1Angles.transDown; // This is the angle from 0° (right) to the transversal going down
  console.log('Acute angle from horizontal:', acuteAngle);

  // Generate arcs for the acute angles (60°) at intersection 1
  // Acute angle 1 (lower-right): from right (0°) to transDown
  const arc1Start = polarToCartesian(int1.x, int1.y, 45, 0);
  const arc1End = polarToCartesian(int1.x, int1.y, 45, int1Angles.transDown);
  const arc1 = `M ${arc1Start.x.toFixed(1)},${arc1Start.y.toFixed(1)} A 45,45 0 0,1 ${arc1End.x.toFixed(1)},${arc1End.y.toFixed(1)}`;
  const label1Pos = polarToCartesian(int1.x, int1.y, 60, acuteAngle / 2);

  // Acute angle 2 (upper-left): from left (180°) to transUp
  // The angle from left to transUp
  let angle2Start = int1Angles.left;
  let angle2End = int1Angles.transUp;
  // Normalize transUp to positive
  if (angle2End < 0) angle2End += 360;

  const arc2Start = polarToCartesian(int1.x, int1.y, 45, angle2Start);
  const arc2End = polarToCartesian(int1.x, int1.y, 45, angle2End);
  // Since we're going from 180° to ~241°, we go clockwise (sweep=1)
  const arc2 = `M ${arc2Start.x.toFixed(1)},${arc2Start.y.toFixed(1)} A 45,45 0 0,1 ${arc2End.x.toFixed(1)},${arc2End.y.toFixed(1)}`;
  const label2Pos = polarToCartesian(int1.x, int1.y, 60, (angle2Start + angle2End) / 2);

  // Obtuse angle (upper-right): from transUp to right (360°/0°)
  // This is the supplementary angle
  const obtuseStart = polarToCartesian(int1.x, int1.y, 55, angle2End);
  const obtuseEnd = polarToCartesian(int1.x, int1.y, 55, 360);
  const obtuseArc = `M ${obtuseStart.x.toFixed(1)},${obtuseStart.y.toFixed(1)} A 55,55 0 0,0 ${obtuseEnd.x.toFixed(1)},${obtuseEnd.y.toFixed(1)}`;
  const obtuseLabelPos = polarToCartesian(int1.x, int1.y, 70, (angle2End + 360) / 2);

  console.log('\n=== INTERSECTION 1 SVG ===');
  console.log(`<!-- Acute 60° (lower-right) -->`);
  console.log(`<path d="${arc1}" fill="none" stroke="#3b82f6" stroke-width="4"/>`);
  console.log(`<text x="${label1Pos.x.toFixed(1)}" y="${label1Pos.y.toFixed(1)}" font-family="Arial, sans-serif" font-size="26" font-weight="bold" fill="#3b82f6" text-anchor="middle" dominant-baseline="middle">60°</text>`);

  console.log(`\n<!-- Acute 60° (upper-left) -->`);
  console.log(`<path d="${arc2}" fill="none" stroke="#3b82f6" stroke-width="4"/>`);
  console.log(`<text x="${label2Pos.x.toFixed(1)}" y="${label2Pos.y.toFixed(1)}" font-family="Arial, sans-serif" font-size="22" fill="#3b82f6" text-anchor="middle" dominant-baseline="middle">60°</text>`);

  console.log(`\n<!-- Obtuse 120° (upper-right) -->`);
  console.log(`<path d="${obtuseArc}" fill="none" stroke="#ef4444" stroke-width="4"/>`);
  console.log(`<text x="${obtuseLabelPos.x.toFixed(1)}" y="${obtuseLabelPos.y.toFixed(1)}" font-family="Arial, sans-serif" font-size="26" font-weight="bold" fill="#ef4444" text-anchor="middle" dominant-baseline="middle">?</text>`);

  // Generate for intersection 2
  const arc1Start2 = polarToCartesian(int2.x, int2.y, 45, 0);
  const arc1End2 = polarToCartesian(int2.x, int2.y, 45, int2Angles.transDown);
  const arc1_2 = `M ${arc1Start2.x.toFixed(1)},${arc1Start2.y.toFixed(1)} A 45,45 0 0,1 ${arc1End2.x.toFixed(1)},${arc1End2.y.toFixed(1)}`;
  const label1Pos2 = polarToCartesian(int2.x, int2.y, 60, acuteAngle / 2);

  let angle2Start2 = int2Angles.left;
  let angle2End2 = int2Angles.transUp;
  if (angle2End2 < 0) angle2End2 += 360;

  const arc2Start2 = polarToCartesian(int2.x, int2.y, 45, angle2Start2);
  const arc2End2 = polarToCartesian(int2.x, int2.y, 45, angle2End2);
  const arc2_2 = `M ${arc2Start2.x.toFixed(1)},${arc2Start2.y.toFixed(1)} A 45,45 0 0,1 ${arc2End2.x.toFixed(1)},${arc2End2.y.toFixed(1)}`;
  const label2Pos2 = polarToCartesian(int2.x, int2.y, 60, (angle2Start2 + angle2End2) / 2);

  const obtuseStart2 = polarToCartesian(int2.x, int2.y, 55, angle2End2);
  const obtuseEnd2 = polarToCartesian(int2.x, int2.y, 55, 360);
  const obtuseArc2 = `M ${obtuseStart2.x.toFixed(1)},${obtuseStart2.y.toFixed(1)} A 55,55 0 0,0 ${obtuseEnd2.x.toFixed(1)},${obtuseEnd2.y.toFixed(1)}`;
  const obtuseLabelPos2 = polarToCartesian(int2.x, int2.y, 70, (angle2End2 + 360) / 2);

  console.log('\n=== INTERSECTION 2 SVG ===');
  console.log(`<!-- Acute 60° (lower-right) -->`);
  console.log(`<path d="${arc1_2}" fill="none" stroke="#3b82f6" stroke-width="4"/>`);
  console.log(`<text x="${label1Pos2.x.toFixed(1)}" y="${label1Pos2.y.toFixed(1)}" font-family="Arial, sans-serif" font-size="26" font-weight="bold" fill="#3b82f6" text-anchor="middle" dominant-baseline="middle">60°</text>`);

  console.log(`\n<!-- Acute 60° (upper-left) -->`);
  console.log(`<path d="${arc2_2}" fill="none" stroke="#3b82f6" stroke-width="4"/>`);
  console.log(`<text x="${label2Pos2.x.toFixed(1)}" y="${label2Pos2.y.toFixed(1)}" font-family="Arial, sans-serif" font-size="22" fill="#3b82f6" text-anchor="middle" dominant-baseline="middle">60°</text>`);

  console.log(`\n<!-- Obtuse 120° (upper-right) -->`);
  console.log(`<path d="${obtuseArc2}" fill="none" stroke="#ef4444" stroke-width="4"/>`);
  console.log(`<text x="${obtuseLabelPos2.x.toFixed(1)}" y="${obtuseLabelPos2.y.toFixed(1)}" font-family="Arial, sans-serif" font-size="26" font-weight="bold" fill="#ef4444" text-anchor="middle" dominant-baseline="middle">?</text>`);
}

generateExample3Diagram();
