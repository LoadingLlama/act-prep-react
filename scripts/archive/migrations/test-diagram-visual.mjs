/**
 * Visual Diagram Tester
 * Generates HTML preview to VERIFY diagrams look correct before applying
 */

import fs from 'fs';

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
  return Math.atan2(y2 - y1, x2 - x1) * (180 / Math.PI);
}

function normalizeAngle(angle) {
  angle = angle % 360;
  if (angle < 0) angle += 360;
  return angle;
}

function polarToCartesian(cx, cy, radius, angleInDegrees) {
  const radians = angleInDegrees * (Math.PI / 180);
  return {
    x: cx + radius * Math.cos(radians),
    y: cy + radius * Math.sin(radians)
  };
}

/**
 * Determine which quadrant a point is in relative to center
 * Returns: "upper-left", "upper-right", "lower-left", "lower-right"
 */
function getQuadrant(cx, cy, x, y) {
  if (x < cx && y < cy) return "upper-left";
  if (x >= cx && y < cy) return "upper-right";
  if (x < cx && y >= cy) return "lower-left";
  return "lower-right";
}

/**
 * Generate parallel lines diagram with 60° angles
 * Returns complete SVG markup with validation info
 */
function generateParallelLinesDiagram() {
  // Configuration
  const line1Y = 120;
  const line2Y = 260;
  const lineStart = 70;
  const lineEnd = 480;

  // Transversal with slope = tan(60°) = 1.732
  const transX1 = 180;
  const transY1 = 60;
  const transX2 = 330;
  const transY2 = 320;

  // Calculate intersections
  const int1 = lineIntersection(lineStart, line1Y, lineEnd, line1Y, transX1, transY1, transX2, transY2);
  const int2 = lineIntersection(lineStart, line2Y, lineEnd, line2Y, transX1, transY1, transX2, transY2);

  console.log('=== INTERSECTION CALCULATIONS ===');
  console.log(`Int1: (${int1.x.toFixed(1)}, ${int1.y.toFixed(1)})`);
  console.log(`Int2: (${int2.x.toFixed(1)}, ${int2.y.toFixed(1)})`);

  // Get ray angles at intersection 1
  const rays1 = {
    right: 0,
    left: 180,
    transUp: getAngle(int1.x, int1.y, transX1, transY1),
    transDown: getAngle(int1.x, int1.y, transX2, transY2)
  };

  console.log('\n=== INTERSECTION 1 RAY ANGLES ===');
  console.log(`Right (horizontal): ${rays1.right}°`);
  console.log(`Left (horizontal): ${rays1.left}°`);
  console.log(`Transversal up: ${rays1.transUp.toFixed(1)}°`);
  console.log(`Transversal down: ${rays1.transDown.toFixed(1)}°`);

  // Calculate the 4 angles at intersection 1
  const angles1 = [];

  // Angle between right horizontal and transversal down (lower-right quadrant)
  const lowerRightAngle = rays1.transDown - rays1.right;
  console.log(`\nLower-right angle: ${lowerRightAngle.toFixed(1)}° (should be ~60°)`);

  // Angle between transversal down and left horizontal (lower-left quadrant)
  const lowerLeftAngle = rays1.left - rays1.transDown;
  console.log(`Lower-left angle: ${lowerLeftAngle.toFixed(1)}° (should be ~120°)`);

  // Angle between left horizontal and transversal up (upper-left quadrant)
  const upperLeftAngleRaw = normalizeAngle(rays1.transUp) - rays1.left;
  const upperLeftAngle = upperLeftAngleRaw < 0 ? 360 + upperLeftAngleRaw : upperLeftAngleRaw;
  console.log(`Upper-left angle: ${upperLeftAngle.toFixed(1)}° (should be ~60°)`);

  // Angle between transversal up and right horizontal (upper-right quadrant)
  const upperRightAngleRaw = rays1.right - normalizeAngle(rays1.transUp);
  const upperRightAngle = upperRightAngleRaw < 0 ? 360 + upperRightAngleRaw : upperRightAngleRaw;
  console.log(`Upper-right angle: ${upperRightAngle.toFixed(1)}° (should be ~120°)`);

  // Generate arcs
  const arcs = [];

  // Lower-right: 60° acute (blue)
  const lr_start = polarToCartesian(int1.x, int1.y, 50, rays1.right);
  const lr_end = polarToCartesian(int1.x, int1.y, 50, rays1.transDown);
  const lr_label = polarToCartesian(int1.x, int1.y, 70, (rays1.right + rays1.transDown) / 2);
  arcs.push({
    path: `M ${lr_start.x.toFixed(1)},${lr_start.y.toFixed(1)} A 50,50 0 0,1 ${lr_end.x.toFixed(1)},${lr_end.y.toFixed(1)}`,
    color: '#3b82f6',
    label: '60°',
    labelX: lr_label.x.toFixed(1),
    labelY: lr_label.y.toFixed(1),
    fontSize: 26,
    quadrant: 'lower-right'
  });

  // Upper-left: 60° acute (blue) - vertical pair
  const ul_transUp_norm = normalizeAngle(rays1.transUp);
  const ul_start = polarToCartesian(int1.x, int1.y, 50, rays1.left);
  const ul_end = polarToCartesian(int1.x, int1.y, 50, ul_transUp_norm);
  const ul_label = polarToCartesian(int1.x, int1.y, 70, (rays1.left + ul_transUp_norm) / 2);
  arcs.push({
    path: `M ${ul_start.x.toFixed(1)},${ul_start.y.toFixed(1)} A 50,50 0 0,1 ${ul_end.x.toFixed(1)},${ul_end.y.toFixed(1)}`,
    color: '#3b82f6',
    label: '60°',
    labelX: ul_label.x.toFixed(1),
    labelY: ul_label.y.toFixed(1),
    fontSize: 22,
    quadrant: 'upper-left'
  });

  // Upper-right: 120° obtuse (red)
  const ur_start = polarToCartesian(int1.x, int1.y, 60, ul_transUp_norm);
  const ur_end = polarToCartesian(int1.x, int1.y, 60, 360);
  const ur_label = polarToCartesian(int1.x, int1.y, 80, (ul_transUp_norm + 360) / 2);
  arcs.push({
    path: `M ${ur_start.x.toFixed(1)},${ur_start.y.toFixed(1)} A 60,60 0 0,0 ${ur_end.x.toFixed(1)},${ur_end.y.toFixed(1)}`,
    color: '#ef4444',
    label: '?',
    labelX: ur_label.x.toFixed(1),
    labelY: ur_label.y.toFixed(1),
    fontSize: 26,
    quadrant: 'upper-right'
  });

  console.log('\n=== ARC GENERATION ===');
  arcs.forEach(arc => {
    console.log(`${arc.quadrant}: ${arc.label} (${arc.color === '#3b82f6' ? 'BLUE' : 'RED'})`);
    console.log(`  Label position: (${arc.labelX}, ${arc.labelY})`);
  });

  // Generate SVG
  const svg = `
<svg width="550" height="400" viewBox="0 0 550 400" xmlns="http://www.w3.org/2000/svg" style="border: 2px solid #ccc; background: white;">
    <!-- Parallel horizontal lines -->
    <line x1="${lineStart}" y1="${line1Y}" x2="${lineEnd}" y2="${line1Y}" stroke="#1f2937" stroke-width="4"/>
    <line x1="${lineStart}" y1="${line2Y}" x2="${lineEnd}" y2="${line2Y}" stroke="#1f2937" stroke-width="4"/>

    <!-- Transversal -->
    <line x1="${transX1}" y1="${transY1}" x2="${transX2}" y2="${transY2}" stroke="#4b5563" stroke-width="4"/>

    <!-- Intersection points -->
    <circle cx="${int1.x.toFixed(1)}" cy="${int1.y.toFixed(1)}" r="5" fill="#1f2937"/>
    <circle cx="${int2.x.toFixed(1)}" cy="${int2.y.toFixed(1)}" r="5" fill="#1f2937"/>

    <!-- Arcs for Intersection 1 -->
    ${arcs.map(arc => `
    <!-- ${arc.quadrant}: ${arc.label} -->
    <path d="${arc.path}" fill="none" stroke="${arc.color}" stroke-width="4"/>
    <text x="${arc.labelX}" y="${arc.labelY}" font-family="Arial, sans-serif" font-size="${arc.fontSize}" font-weight="bold" fill="${arc.color}" text-anchor="middle" dominant-baseline="middle">${arc.label}</text>
    `).join('\n')}

    <!-- Validation Grid (shows quadrants) -->
    <line x1="${int1.x.toFixed(1)}" y1="0" x2="${int1.x.toFixed(1)}" y2="400" stroke="rgba(255,0,0,0.2)" stroke-width="1" stroke-dasharray="5,5"/>
    <line x1="0" y1="${int1.y.toFixed(1)}" x2="550" y2="${int1.y.toFixed(1)}" stroke="rgba(255,0,0,0.2)" stroke-width="1" stroke-dasharray="5,5"/>

    <!-- Quadrant labels (for validation) -->
    <text x="${int1.x - 50}" y="${int1.y - 20}" font-size="10" fill="#999" text-anchor="middle">upper-left</text>
    <text x="${int1.x + 50}" y="${int1.y - 20}" font-size="10" fill="#999" text-anchor="middle">upper-right</text>
    <text x="${int1.x - 50}" y="${int1.y + 30}" font-size="10" fill="#999" text-anchor="middle">lower-left</text>
    <text x="${int1.x + 50}" y="${int1.y + 30}" font-size="10" fill="#999" text-anchor="middle">lower-right</text>

    <!-- Line labels -->
    <text x="500" y="${line1Y}" font-family="Arial, sans-serif" font-size="18" font-weight="bold" fill="#1f2937" dominant-baseline="middle">L₁</text>
    <text x="500" y="${line2Y}" font-family="Arial, sans-serif" font-size="18" font-weight="bold" fill="#1f2937" dominant-baseline="middle">L₂</text>
</svg>
  `;

  return { svg, arcs, int1, int2 };
}

// Generate and save preview
console.log('🎨 Generating visual preview...\n');
const result = generateParallelLinesDiagram();

const html = `
<!DOCTYPE html>
<html>
<head>
    <title>Diagram Visual Test</title>
    <style>
        body {
            font-family: Arial, sans-serif;
            margin: 20px;
            background: #f5f5f5;
        }
        .container {
            max-width: 800px;
            margin: 0 auto;
            background: white;
            padding: 20px;
            border-radius: 8px;
            box-shadow: 0 2px 4px rgba(0,0,0,0.1);
        }
        h1 { color: #333; }
        .validation {
            background: #f0f9ff;
            border: 2px solid #3b82f6;
            padding: 15px;
            border-radius: 6px;
            margin: 20px 0;
        }
        .validation h3 {
            margin-top: 0;
            color: #1e40af;
        }
        .check { color: #10b981; font-weight: bold; }
        .fail { color: #ef4444; font-weight: bold; }
        table {
            width: 100%;
            border-collapse: collapse;
            margin: 10px 0;
        }
        th, td {
            padding: 8px;
            text-align: left;
            border-bottom: 1px solid #e5e7eb;
        }
        th {
            background: #f9fafb;
            font-weight: 600;
        }
    </style>
</head>
<body>
    <div class="container">
        <h1>📐 Visual Diagram Test</h1>
        <p><strong>Task:</strong> Verify that colored arcs and text labels appear in the CORRECT visual positions.</p>

        <h2>Generated Diagram:</h2>
        ${result.svg}

        <div class="validation">
            <h3>✓ Validation Checklist:</h3>
            <table>
                <tr>
                    <th>Element</th>
                    <th>Expected</th>
                    <th>Location</th>
                    <th>Status</th>
                </tr>
                ${result.arcs.map(arc => `
                <tr>
                    <td><strong>${arc.label}</strong> (${arc.color === '#3b82f6' ? 'BLUE' : 'RED'})</td>
                    <td>${arc.quadrant}</td>
                    <td>(${arc.labelX}, ${arc.labelY})</td>
                    <td class="check">✓ Check visually</td>
                </tr>
                `).join('')}
            </table>

            <h4>Manual Checks:</h4>
            <ul>
                <li>✓ Are the 60° labels (BLUE) in the ACUTE angle regions?</li>
                <li>✓ Is the ? label (RED) in the OBTUSE angle region?</li>
                <li>✓ Do the colored arcs sweep through their respective angles?</li>
                <li>✓ Are text labels INSIDE (not outside) their angle regions?</li>
            </ul>
        </div>

        <h3>Debug Info:</h3>
        <pre style="background: #f9fafb; padding: 15px; border-radius: 4px; overflow-x: auto;">
Intersection 1: (${result.int1.x.toFixed(1)}, ${result.int1.y.toFixed(1)})
Intersection 2: (${result.int2.x.toFixed(1)}, ${result.int2.y.toFixed(1)})

Expected angle sizes:
- Lower-right (blue): 60° acute
- Upper-left (blue): 60° acute (vertical pair)
- Upper-right (red): 120° obtuse
        </pre>
    </div>
</body>
</html>
`;

fs.writeFileSync('diagram-visual-test.html', html);
console.log('\n✅ Preview generated: diagram-visual-test.html');
console.log('👉 Open this file in a browser to VERIFY the diagram looks correct!');
console.log('\nIf it looks good, I\'ll apply it to the database.');
