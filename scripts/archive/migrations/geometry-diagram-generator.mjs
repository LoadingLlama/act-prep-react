/**
 * Geometric Diagram Generator
 * Automatically calculates and positions angle labels, arcs, and diagrams
 * with mathematical precision
 */

/**
 * Calculate angle in degrees from point1 to point2
 */
function getAngle(x1, y1, x2, y2) {
  const dx = x2 - x1;
  const dy = y2 - y1;
  // atan2 gives angle in radians, convert to degrees
  // Note: SVG Y-axis is inverted (positive Y goes down)
  const radians = Math.atan2(dy, dx);
  const degrees = radians * (180 / Math.PI);
  return degrees;
}

/**
 * Normalize angle to 0-360 range
 */
function normalizeAngle(angle) {
  angle = angle % 360;
  if (angle < 0) angle += 360;
  return angle;
}

/**
 * Calculate angle bisector between two angles
 */
function bisector(angle1, angle2) {
  // Normalize both angles
  angle1 = normalizeAngle(angle1);
  angle2 = normalizeAngle(angle2);

  // Find the smaller angle between them
  let diff = angle2 - angle1;
  if (diff < 0) diff += 360;

  if (diff > 180) {
    // Go the other way
    return normalizeAngle(angle1 - (360 - diff) / 2);
  } else {
    return normalizeAngle(angle1 + diff / 2);
  }
}

/**
 * Get point at distance and angle from origin
 */
function polarToCartesian(cx, cy, radius, angleInDegrees) {
  const radians = angleInDegrees * (Math.PI / 180);
  return {
    x: cx + radius * Math.cos(radians),
    y: cy + radius * Math.sin(radians)
  };
}

/**
 * Calculate intersection point of two lines
 * Line 1: from (x1,y1) to (x2,y2)
 * Line 2: from (x3,y3) to (x4,y4)
 */
function lineIntersection(x1, y1, x2, y2, x3, y3, x4, y4) {
  const denominator = (x1 - x2) * (y3 - y4) - (y1 - y2) * (x3 - x4);
  if (Math.abs(denominator) < 0.0001) return null; // Parallel lines

  const t = ((x1 - x3) * (y3 - y4) - (y1 - y3) * (x3 - x4)) / denominator;

  return {
    x: x1 + t * (x2 - x1),
    y: y1 + t * (y2 - y1)
  };
}

/**
 * Generate parallel lines diagram with transversal
 * Returns complete SVG with correctly positioned angle labels
 */
function generateParallelLinesWithTransversal(config) {
  const {
    width = 600,
    height = 520,
    line1Y = 110,
    line2Y = 300,
    transversal = { x1: 220, y1: 30, x2: 410, y2: 380 },
    lineStart = 60,
    lineEnd = 540
  } = config;

  // Calculate intersection points
  const int1 = lineIntersection(
    lineStart, line1Y, lineEnd, line1Y,
    transversal.x1, transversal.y1, transversal.x2, transversal.y2
  );

  const int2 = lineIntersection(
    lineStart, line2Y, lineEnd, line2Y,
    transversal.x1, transversal.y1, transversal.x2, transversal.y2
  );

  // Calculate angles for each ray at intersection 1
  const angles1 = {
    right: 0,  // Pointing right along horizontal
    left: 180, // Pointing left along horizontal
    transUp: getAngle(int1.x, int1.y, transversal.x1, transversal.y1),
    transDown: getAngle(int1.x, int1.y, transversal.x2, transversal.y2)
  };

  // Calculate angles for each ray at intersection 2
  const angles2 = {
    right: 0,
    left: 180,
    transUp: getAngle(int2.x, int2.y, transversal.x1, transversal.y1),
    transDown: getAngle(int2.x, int2.y, transversal.x2, transversal.y2)
  };

  console.log('Intersection 1:', int1);
  console.log('Angles at int1:', angles1);
  console.log('Intersection 2:', int2);
  console.log('Angles at int2:', angles2);

  // For intersection 1, calculate the 4 angle regions
  // Going counterclockwise from right (0°):
  // Angle 3 (blue, acute): between right (0°) and transDown
  // Angle 4 (red, obtuse): between transDown and left (180°)
  // Angle 1 (blue, acute): between left (180°) and transUp
  // Angle 2 (red, obtuse): between transUp and right (0°/360°)

  const int1Angles = [
    {
      id: 1,
      color: '#3b82f6', // blue (acute)
      startAngle: angles1.left,
      endAngle: angles1.transUp,
      bisectorAngle: bisector(angles1.left, angles1.transUp),
      labelRadius: 30
    },
    {
      id: 2,
      color: '#ef4444', // red (obtuse)
      startAngle: angles1.transUp,
      endAngle: angles1.right + 360, // wrap around
      bisectorAngle: bisector(angles1.transUp, angles1.right + 360),
      labelRadius: 30
    },
    {
      id: 3,
      color: '#3b82f6', // blue (acute)
      startAngle: angles1.right,
      endAngle: angles1.transDown,
      bisectorAngle: bisector(angles1.right, angles1.transDown),
      labelRadius: 30
    },
    {
      id: 4,
      color: '#ef4444', // red (obtuse)
      startAngle: angles1.transDown,
      endAngle: angles1.left,
      bisectorAngle: bisector(angles1.transDown, angles1.left),
      labelRadius: 30
    }
  ];

  const int2Angles = [
    {
      id: 5,
      color: '#3b82f6',
      startAngle: angles2.left,
      endAngle: angles2.transUp,
      bisectorAngle: bisector(angles2.left, angles2.transUp),
      labelRadius: 30
    },
    {
      id: 6,
      color: '#ef4444',
      startAngle: angles2.transUp,
      endAngle: angles2.right + 360,
      bisectorAngle: bisector(angles2.transUp, angles2.right + 360),
      labelRadius: 30
    },
    {
      id: 7,
      color: '#3b82f6',
      startAngle: angles2.right,
      endAngle: angles2.transDown,
      bisectorAngle: bisector(angles2.right, angles2.transDown),
      labelRadius: 30
    },
    {
      id: 8,
      color: '#ef4444',
      startAngle: angles2.transDown,
      endAngle: angles2.left,
      bisectorAngle: bisector(angles2.transDown, angles2.left),
      labelRadius: 30
    }
  ];

  // Generate SVG labels
  let labels = '';

  int1Angles.forEach(angle => {
    const pos = polarToCartesian(int1.x, int1.y, angle.labelRadius, angle.bisectorAngle);
    labels += `
    <!-- Angle ${angle.id} -->
    <text x="${pos.x.toFixed(1)}" y="${pos.y.toFixed(1)}" font-family="Arial, sans-serif" font-size="22" font-weight="bold" fill="${angle.color}" text-anchor="middle" dominant-baseline="middle">${angle.id}</text>`;
  });

  int2Angles.forEach(angle => {
    const pos = polarToCartesian(int2.x, int2.y, angle.labelRadius, angle.bisectorAngle);
    labels += `
    <!-- Angle ${angle.id} -->
    <text x="${pos.x.toFixed(1)}" y="${pos.y.toFixed(1)}" font-family="Arial, sans-serif" font-size="22" font-weight="bold" fill="${angle.color}" text-anchor="middle" dominant-baseline="middle">${angle.id}</text>`;
  });

  return {
    int1,
    int2,
    labels,
    int1Angles,
    int2Angles
  };
}

// Test the function
const result = generateParallelLinesWithTransversal({});
console.log('\n=== GENERATED LABELS ===');
console.log(result.labels);

export { generateParallelLinesWithTransversal, polarToCartesian, getAngle, bisector };
