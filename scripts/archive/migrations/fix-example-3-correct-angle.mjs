import { createClient } from '@supabase/supabase-js';
import dotenv from 'dotenv';

dotenv.config();

const supabase = createClient(
  process.env.REACT_APP_SUPABASE_URL,
  process.env.SUPABASE_SERVICE_ROLE_KEY
);

const LESSON_ID = '32cbf6f8-bf7e-4dd8-955e-449814417fff';

/**
 * For a 60° angle:
 * - tan(60°) = √3 ≈ 1.732
 * - We need a transversal with slope = 1.732
 *
 * Line 1 is at y = 120
 * Line 2 is at y = 260
 *
 * Let's design the transversal to start at x=200, y=80 (above line 1)
 * With slope 1.732, when it reaches y=120, x = 200 + (120-80)/1.732 = 200 + 23.1 = 223.1
 * When it reaches y=260, x = 200 + (260-80)/1.732 = 200 + 103.9 = 303.9
 *
 * So transversal: (200, 60) to (400, 320) where (400-200)/(320-60) = 200/260 = 0.769... NO!
 *
 * Let me recalculate properly:
 * slope = dy/dx = 1.732
 * If we go from (x1, 60) to (x2, 320):
 * (320 - 60) / (x2 - x1) = 1.732
 * 260 / (x2 - x1) = 1.732
 * x2 - x1 = 260 / 1.732 = 150.1
 *
 * So if x1 = 180, then x2 = 330.1
 * Transversal: (180, 60) to (330, 320)
 */

// Geometry functions
function lineIntersection(x1, y1, x2, y2, x3, y3, x4, y4) {
  const denominator = (x1 - x2) * (y3 - y4) - (y1 - y2) * (x3 - x4);
  if (Math.abs(denominator) < 0.0001) return null;
  const t = ((x1 - x3) * (y3 - y4) - (y1 - y3) * (x3 - x4)) / denominator;
  return {
    x: x1 + t * (x2 - x1),
    y: y1 + t * (y2 - y1)
  };
}

function getAngle(x1, y1, x2, y2) {
  const dx = x2 - x1;
  const dy = y2 - y1;
  return Math.atan2(dy, dx) * (180 / Math.PI);
}

function polarToCartesian(cx, cy, radius, angleInDegrees) {
  const radians = angleInDegrees * (Math.PI / 180);
  return {
    x: cx + radius * Math.cos(radians),
    y: cy + radius * Math.sin(radians)
  };
}

// Calculate new transversal for 60° angle
const line1Y = 120;
const line2Y = 260;
const transversalSlope = Math.tan(60 * Math.PI / 180); // √3 ≈ 1.732

// Design transversal from (180, 60) with slope 1.732
const transX1 = 180;
const transY1 = 60;
const dx = 260; // vertical span
const transX2 = transX1 + dx / transversalSlope;
const transY2 = 320;

console.log('Transversal for 60° angle:');
console.log(`  From: (${transX1}, ${transY1})`);
console.log(`  To: (${transX2.toFixed(1)}, ${transY2})`);
console.log(`  Slope: ${((transY2 - transY1) / (transX2 - transX1)).toFixed(3)} (should be ${transversalSlope.toFixed(3)})`);

// Calculate intersections
const int1 = lineIntersection(70, line1Y, 480, line1Y, transX1, transY1, transX2, transY2);
const int2 = lineIntersection(70, line2Y, 480, line2Y, transX1, transY1, transX2, transY2);

console.log(`\nIntersection 1: (${int1.x.toFixed(1)}, ${int1.y.toFixed(1)})`);
console.log(`Intersection 2: (${int2.x.toFixed(1)}, ${int2.y.toFixed(1)})`);

// Verify the angle
const angleToHorizontal = getAngle(int1.x, int1.y, transX2, transY2);
console.log(`\nAngle from horizontal: ${angleToHorizontal.toFixed(1)}° (should be 60°)`);

// Generate arcs for 60° angles
const int1Angles = {
  right: 0,
  transDown: getAngle(int1.x, int1.y, transX2, transY2)
};

const int2Angles = {
  right: 0,
  transDown: getAngle(int2.x, int2.y, transX2, transY2)
};

console.log(`\nAngle measurements:`);
console.log(`  Int1 right to transDown: ${int1Angles.transDown.toFixed(1)}°`);
console.log(`  Int2 right to transDown: ${int2Angles.transDown.toFixed(1)}°`);

// Generate SVG for lower-right acute angle (60°)
const arc1Start = polarToCartesian(int1.x, int1.y, 50, 0);
const arc1End = polarToCartesian(int1.x, int1.y, 50, int1Angles.transDown);
const arc1Path = `M ${arc1Start.x.toFixed(1)},${arc1Start.y.toFixed(1)} A 50,50 0 0,1 ${arc1End.x.toFixed(1)},${arc1End.y.toFixed(1)}`;
const label1Pos = polarToCartesian(int1.x, int1.y, 70, int1Angles.transDown / 2);

console.log(`\n=== TOP INTERSECTION 60° ARC (lower-right) ===`);
console.log(`<path d="${arc1Path}" fill="none" stroke="#3b82f6" stroke-width="4"/>`);
console.log(`<text x="${label1Pos.x.toFixed(1)}" y="${label1Pos.y.toFixed(1)}" font-family="Arial, sans-serif" font-size="26" font-weight="bold" fill="#3b82f6" text-anchor="middle" dominant-baseline="middle">60°</text>`);

// Upper-left acute angle (also 60°, vertical to lower-right)
const leftAngle = 180;
const transUp = getAngle(int1.x, int1.y, transX1, transY1);
const arc2Start = polarToCartesian(int1.x, int1.y, 50, leftAngle);
const arc2End = polarToCartesian(int1.x, int1.y, 50, transUp);
const arc2Path = `M ${arc2Start.x.toFixed(1)},${arc2Start.y.toFixed(1)} A 50,50 0 0,1 ${arc2End.x.toFixed(1)},${arc2End.y.toFixed(1)}`;
const label2Pos = polarToCartesian(int1.x, int1.y, 70, (leftAngle + transUp) / 2);

console.log(`\n=== TOP INTERSECTION 60° ARC (upper-left) ===`);
console.log(`<path d="${arc2Path}" fill="none" stroke="#3b82f6" stroke-width="4"/>`);
console.log(`<text x="${label2Pos.x.toFixed(1)}" y="${label2Pos.y.toFixed(1)}" font-family="Arial, sans-serif" font-size="22" fill="#3b82f6" text-anchor="middle" dominant-baseline="middle">60°</text>`);

// Obtuse angle (120°, upper-right)
// From transUp to right (0°/360°)
let obtuseStart = transUp;
if (obtuseStart < 0) obtuseStart += 360;
const obtuseStartPos = polarToCartesian(int1.x, int1.y, 60, obtuseStart);
const obtuseEndPos = polarToCartesian(int1.x, int1.y, 60, 360);
const obtusePath = `M ${obtuseStartPos.x.toFixed(1)},${obtuseStartPos.y.toFixed(1)} A 60,60 0 0,0 ${obtuseEndPos.x.toFixed(1)},${obtuseEndPos.y.toFixed(1)}`;
const obtuseLabelPos = polarToCartesian(int1.x, int1.y, 80, (obtuseStart + 360) / 2);

console.log(`\n=== TOP INTERSECTION 120° ARC (upper-right) ===`);
console.log(`<path d="${obtusePath}" fill="none" stroke="#ef4444" stroke-width="4"/>`);
console.log(`<text x="${obtuseLabelPos.x.toFixed(1)}" y="${obtuseLabelPos.y.toFixed(1)}" font-family="Arial, sans-serif" font-size="26" font-weight="bold" fill="#ef4444" text-anchor="middle" dominant-baseline="middle">?</text>`);

console.log(`\n✅ This transversal creates ACTUAL 60° angles!`);
console.log(`📐 Transversal line: x1="${transX1}" y1="${transY1}" x2="${transX2.toFixed(1)}" y2="${transY2}"`);
