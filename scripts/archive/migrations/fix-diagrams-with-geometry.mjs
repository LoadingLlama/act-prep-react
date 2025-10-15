import { createClient } from '@supabase/supabase-js';
import dotenv from 'dotenv';

dotenv.config();

const supabase = createClient(
  process.env.REACT_APP_SUPABASE_URL,
  process.env.SUPABASE_SERVICE_ROLE_KEY
);

const LESSON_ID = '32cbf6f8-bf7e-4dd8-955e-449814417fff';

// ====== GEOMETRY LIBRARY ======
function getAngle(x1, y1, x2, y2) {
  const dx = x2 - x1;
  const dy = y2 - y1;
  const radians = Math.atan2(dy, dx);
  const degrees = radians * (180 / Math.PI);
  return degrees;
}

function normalizeAngle(angle) {
  angle = angle % 360;
  if (angle < 0) angle += 360;
  return angle;
}

function bisector(angle1, angle2) {
  angle1 = normalizeAngle(angle1);
  angle2 = normalizeAngle(angle2);
  let diff = angle2 - angle1;
  if (diff < 0) diff += 360;
  if (diff > 180) {
    return normalizeAngle(angle1 - (360 - diff) / 2);
  } else {
    return normalizeAngle(angle1 + diff / 2);
  }
}

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
  return {
    x: x1 + t * (x2 - x1),
    y: y1 + t * (y2 - y1)
  };
}

// ====== MAIN PARALLEL LINES DIAGRAM ======
function generateMainDiagram() {
  const line1Y = 110;
  const line2Y = 300;
  const transversal = { x1: 220, y1: 30, x2: 410, y2: 380 };
  const lineStart = 60;
  const lineEnd = 540;

  const int1 = lineIntersection(
    lineStart, line1Y, lineEnd, line1Y,
    transversal.x1, transversal.y1, transversal.x2, transversal.y2
  );

  const int2 = lineIntersection(
    lineStart, line2Y, lineEnd, line2Y,
    transversal.x1, transversal.y1, transversal.x2, transversal.y2
  );

  const angles1 = {
    right: 0,
    left: 180,
    transUp: getAngle(int1.x, int1.y, transversal.x1, transversal.y1),
    transDown: getAngle(int1.x, int1.y, transversal.x2, transversal.y2)
  };

  const angles2 = {
    right: 0,
    left: 180,
    transUp: getAngle(int2.x, int2.y, transversal.x1, transversal.y1),
    transDown: getAngle(int2.x, int2.y, transversal.x2, transversal.y2)
  };

  // Generate labels for all 8 angles
  const labels = [];

  // Int1: Angle 1 (upper-left, acute, blue)
  const a1 = bisector(angles1.left, angles1.transUp < 0 ? angles1.transUp + 360 : angles1.transUp);
  const p1 = polarToCartesian(int1.x, int1.y, 30, a1);
  labels.push(`<text x="${p1.x.toFixed(1)}" y="${p1.y.toFixed(1)}" font-family="Arial, sans-serif" font-size="22" font-weight="bold" fill="#3b82f6" text-anchor="middle" dominant-baseline="middle">1</text>`);

  // Int1: Angle 2 (upper-right, obtuse, red)
  const a2 = bisector(angles1.transUp < 0 ? angles1.transUp + 360 : angles1.transUp, 360);
  const p2 = polarToCartesian(int1.x, int1.y, 30, a2);
  labels.push(`<text x="${p2.x.toFixed(1)}" y="${p2.y.toFixed(1)}" font-family="Arial, sans-serif" font-size="22" font-weight="bold" fill="#ef4444" text-anchor="middle" dominant-baseline="middle">2</text>`);

  // Int1: Angle 3 (lower-right, acute, blue)
  const a3 = bisector(0, angles1.transDown);
  const p3 = polarToCartesian(int1.x, int1.y, 30, a3);
  labels.push(`<text x="${p3.x.toFixed(1)}" y="${p3.y.toFixed(1)}" font-family="Arial, sans-serif" font-size="22" font-weight="bold" fill="#3b82f6" text-anchor="middle" dominant-baseline="middle">3</text>`);

  // Int1: Angle 4 (lower-left, obtuse, red)
  const a4 = bisector(angles1.transDown, 180);
  const p4 = polarToCartesian(int1.x, int1.y, 30, a4);
  labels.push(`<text x="${p4.x.toFixed(1)}" y="${p4.y.toFixed(1)}" font-family="Arial, sans-serif" font-size="22" font-weight="bold" fill="#ef4444" text-anchor="middle" dominant-baseline="middle">4</text>`);

  // Int2: Angle 5 (upper-left, acute, blue)
  const a5 = bisector(angles2.left, angles2.transUp < 0 ? angles2.transUp + 360 : angles2.transUp);
  const p5 = polarToCartesian(int2.x, int2.y, 30, a5);
  labels.push(`<text x="${p5.x.toFixed(1)}" y="${p5.y.toFixed(1)}" font-family="Arial, sans-serif" font-size="22" font-weight="bold" fill="#3b82f6" text-anchor="middle" dominant-baseline="middle">5</text>`);

  // Int2: Angle 6 (upper-right, obtuse, red)
  const a6 = bisector(angles2.transUp < 0 ? angles2.transUp + 360 : angles2.transUp, 360);
  const p6 = polarToCartesian(int2.x, int2.y, 30, a6);
  labels.push(`<text x="${p6.x.toFixed(1)}" y="${p6.y.toFixed(1)}" font-family="Arial, sans-serif" font-size="22" font-weight="bold" fill="#ef4444" text-anchor="middle" dominant-baseline="middle">6</text>`);

  // Int2: Angle 7 (lower-right, acute, blue)
  const a7 = bisector(0, angles2.transDown);
  const p7 = polarToCartesian(int2.x, int2.y, 30, a7);
  labels.push(`<text x="${p7.x.toFixed(1)}" y="${p7.y.toFixed(1)}" font-family="Arial, sans-serif" font-size="22" font-weight="bold" fill="#3b82f6" text-anchor="middle" dominant-baseline="middle">7</text>`);

  // Int2: Angle 8 (lower-left, obtuse, red)
  const a8 = bisector(angles2.transDown, 180);
  const p8 = polarToCartesian(int2.x, int2.y, 30, a8);
  labels.push(`<text x="${p8.x.toFixed(1)}" y="${p8.y.toFixed(1)}" font-family="Arial, sans-serif" font-size="22" font-weight="bold" fill="#ef4444" text-anchor="middle" dominant-baseline="middle">8</text>`);

  return labels.join('\n                    ');
}

// ====== EXAMPLE 3 DIAGRAM ======
function generateExample3() {
  const line1Y = 120;
  const line2Y = 260;
  const transversal = { x1: 180, y1: 60, x2: 420, y2: 320 };
  const lineStart = 70;
  const lineEnd = 480;

  const int1 = lineIntersection(
    lineStart, line1Y, lineEnd, line1Y,
    transversal.x1, transversal.y1, transversal.x2, transversal.y2
  );

  const int2 = lineIntersection(
    lineStart, line2Y, lineEnd, line2Y,
    transversal.x1, transversal.y1, transversal.x2, transversal.y2
  );

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
    transDown: getAntml:parameter>
</invoke>