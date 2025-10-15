/**
 * Complete Diagram Test - ALL angles at BOTH intersections
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
 * Generate all 4 angles at an intersection point
 */
function generateIntersectionAngles(intX, intY, rays, arcRadius, labelRadius, showLabels = false) {
  const arcs = [];

  // Normalize angles
  const right = 0;
  const left = 180;
  const transUp = normalizeAngle(rays.transUp);
  const transDown = normalizeAngle(rays.transDown);

  console.log(`\n--- Intersection at (${intX.toFixed(1)}, ${intY.toFixed(1)}) ---`);
  console.log(`Angles: right=${right}, left=${left}, transUp=${transUp.toFixed(1)}, transDown=${transDown.toFixed(1)}`);

  // LOWER-RIGHT: from right (0°) to transDown (60°) - ACUTE 60°
  const lr_start = polarToCartesian(intX, intY, arcRadius, right);
  const lr_end = polarToCartesian(intX, intY, arcRadius, transDown);
  const lr_label = polarToCartesian(intX, intY, labelRadius, (right + transDown) / 2);
  arcs.push({
    path: `M ${lr_start.x.toFixed(1)},${lr_start.y.toFixed(1)} A ${arcRadius},${arcRadius} 0 0,1 ${lr_end.x.toFixed(1)},${lr_end.y.toFixed(1)}`,
    color: '#3b82f6',
    label: showLabels ? '60°' : '',
    labelX: lr_label.x.toFixed(1),
    labelY: lr_label.y.toFixed(1),
    fontSize: 24,
    name: 'lower-right 60°',
    arcSize: transDown - right
  });

  // LOWER-LEFT: from transDown (60°) to left (180°) - OBTUSE 120°
  const ll_start = polarToCartesian(intX, intY, arcRadius + 10, transDown);
  const ll_end = polarToCartesian(intX, intY, arcRadius + 10, left);
  const ll_label = polarToCartesian(intX, intY, labelRadius + 15, (transDown + left) / 2);
  arcs.push({
    path: `M ${ll_start.x.toFixed(1)},${ll_start.y.toFixed(1)} A ${arcRadius + 10},${arcRadius + 10} 0 0,1 ${ll_end.x.toFixed(1)},${ll_end.y.toFixed(1)}`,
    color: '#ef4444',
    label: showLabels ? '?' : '',
    labelX: ll_label.x.toFixed(1),
    labelY: ll_label.y.toFixed(1),
    fontSize: 24,
    name: 'lower-left 120°',
    arcSize: left - transDown
  });

  // UPPER-LEFT: from left (180°) to transUp (240°) - ACUTE 60°
  const ul_start = polarToCartesian(intX, intY, arcRadius, left);
  const ul_end = polarToCartesian(intX, intY, arcRadius, transUp);
  const ul_label = polarToCartesian(intX, intY, labelRadius, (left + transUp) / 2);
  arcs.push({
    path: `M ${ul_start.x.toFixed(1)},${ul_start.y.toFixed(1)} A ${arcRadius},${arcRadius} 0 0,1 ${ul_end.x.toFixed(1)},${ul_end.y.toFixed(1)}`,
    color: '#3b82f6',
    label: showLabels ? '60°' : '',
    labelX: ul_label.x.toFixed(1),
    labelY: ul_label.y.toFixed(1),
    fontSize: 20,
    name: 'upper-left 60°',
    arcSize: transUp - left
  });

  // UPPER-RIGHT: from transUp (240°) to right (360°) - OBTUSE 120°
  const ur_start = polarToCartesian(intX, intY, arcRadius + 10, transUp);
  const ur_end = polarToCartesian(intX, intY, arcRadius + 10, 360);
  const ur_label = polarToCartesian(intX, intY, labelRadius + 15, (transUp + 360) / 2);
  arcs.push({
    path: `M ${ur_start.x.toFixed(1)},${ur_start.y.toFixed(1)} A ${arcRadius + 10},${arcRadius + 10} 0 0,1 ${ur_end.x.toFixed(1)},${ur_end.y.toFixed(1)}`,
    color: '#ef4444',
    label: showLabels ? '?' : '',
    labelX: ur_label.x.toFixed(1),
    labelY: ur_label.y.toFixed(1),
    fontSize: 24,
    name: 'upper-right 120°',
    arcSize: 360 - transUp
  });

  arcs.forEach(arc => {
    console.log(`  ${arc.name}: arc size=${arc.arcSize.toFixed(1)}°, color=${arc.color === '#3b82f6' ? 'BLUE' : 'RED'}, label at (${arc.labelX}, ${arc.labelY})`);
  });

  return arcs;
}

console.log('🎨 Generating COMPLETE diagram test...\n');

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

console.log('=== INTERSECTIONS ===');
console.log(`Int1 (top): (${int1.x.toFixed(1)}, ${int1.y.toFixed(1)})`);
console.log(`Int2 (bottom): (${int2.x.toFixed(1)}, ${int2.y.toFixed(1)})`);

// Get rays at each intersection
const rays1 = {
  transUp: getAngle(int1.x, int1.y, transX1, transY1),
  transDown: getAngle(int1.x, int1.y, transX2, transY2)
};

const rays2 = {
  transUp: getAngle(int2.x, int2.y, transX1, transY1),
  transDown: getAngle(int2.x, int2.y, transX2, transY2)
};

// Generate arcs for both intersections
console.log('\n=== TOP INTERSECTION (L₁) ===');
const arcs1 = generateIntersectionAngles(int1.x, int1.y, rays1, 50, 70, true);

console.log('\n=== BOTTOM INTERSECTION (L₂) ===');
const arcs2 = generateIntersectionAngles(int2.x, int2.y, rays2, 50, 70, true);

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

    <!-- TOP INTERSECTION ARCS -->
    ${arcs1.map(arc => `
    <!-- ${arc.name} -->
    <path d="${arc.path}" fill="none" stroke="${arc.color}" stroke-width="4"/>
    ${arc.label ? `<text x="${arc.labelX}" y="${arc.labelY}" font-family="Arial, sans-serif" font-size="${arc.fontSize}" font-weight="bold" fill="${arc.color}" text-anchor="middle" dominant-baseline="middle">${arc.label}</text>` : ''}
    `).join('\n')}

    <!-- BOTTOM INTERSECTION ARCS -->
    ${arcs2.map(arc => `
    <!-- ${arc.name} -->
    <path d="${arc.path}" fill="none" stroke="${arc.color}" stroke-width="4"/>
    ${arc.label ? `<text x="${arc.labelX}" y="${arc.labelY}" font-family="Arial, sans-serif" font-size="${arc.fontSize}" font-weight="bold" fill="${arc.color}" text-anchor="middle" dominant-baseline="middle">${arc.label}</text>` : ''}
    `).join('\n')}

    <!-- Line labels -->
    <text x="500" y="${line1Y}" font-family="Arial, sans-serif" font-size="18" font-weight="bold" fill="#1f2937" dominant-baseline="middle">L₁</text>
    <text x="500" y="${line2Y}" font-family="Arial, sans-serif" font-size="18" font-weight="bold" fill="#1f2937" dominant-baseline="middle">L₂</text>
</svg>
`;

const html = `
<!DOCTYPE html>
<html>
<head>
    <title>Complete Diagram Test</title>
    <style>
        body {
            font-family: Arial, sans-serif;
            margin: 20px;
            background: #f5f5f5;
        }
        .container {
            max-width: 900px;
            margin: 0 auto;
            background: white;
            padding: 20px;
            border-radius: 8px;
            box-shadow: 0 2px 4px rgba(0,0,0,0.1);
        }
        h1 { color: #333; }
        .checklist {
            background: #f0f9ff;
            border: 2px solid #3b82f6;
            padding: 15px;
            border-radius: 6px;
            margin: 20px 0;
        }
        .checklist h3 {
            margin-top: 0;
            color: #1e40af;
        }
        .checklist ul {
            margin: 10px 0;
        }
        .checklist li {
            margin: 8px 0;
            font-size: 15px;
        }
        .blue { color: #3b82f6; font-weight: bold; }
        .red { color: #ef4444; font-weight: bold; }
        table {
            width: 100%;
            border-collapse: collapse;
            margin: 15px 0;
            font-size: 14px;
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
        <h1>📐 Complete Diagram Test - ALL Angles</h1>
        <p><strong>This shows BOTH intersections with ALL 4 angles each (8 total angles)</strong></p>

        <h2>Generated Diagram:</h2>
        ${svg}

        <div class="checklist">
            <h3>✓ Visual Validation Checklist:</h3>

            <h4>Top Intersection (L₁):</h4>
            <ul>
                <li>✓ Lower-right: <span class="blue">60° blue arc</span> - Should be ACUTE angle</li>
                <li>✓ Lower-left: <span class="red">? red arc</span> - Should be OBTUSE angle (120°)</li>
                <li>✓ Upper-left: <span class="blue">60° blue arc</span> - Should be ACUTE angle (vertical to lower-right)</li>
                <li>✓ Upper-right: <span class="red">? red arc</span> - Should be OBTUSE angle (120°, vertical to lower-left)</li>
            </ul>

            <h4>Bottom Intersection (L₂):</h4>
            <ul>
                <li>✓ Lower-right: <span class="blue">60° blue arc</span> - Should match top</li>
                <li>✓ Lower-left: <span class="red">? red arc</span> - Should match top</li>
                <li>✓ Upper-left: <span class="blue">60° blue arc</span> - Should match top</li>
                <li>✓ Upper-right: <span class="red">? red arc</span> - Should match top</li>
            </ul>

            <h4>Critical Checks:</h4>
            <ul>
                <li>✓ Are ALL text labels <strong>INSIDE</strong> their respective angles?</li>
                <li>✓ Do the arcs sweep through the correct angular regions?</li>
                <li>✓ Are blue arcs SMALLER (60°) than red arcs (120°)?</li>
                <li>✓ Are vertical angles the SAME COLOR?</li>
            </ul>
        </div>

        <h3>Arc Details:</h3>
        <table>
            <tr>
                <th>Intersection</th>
                <th>Angle Name</th>
                <th>Expected Size</th>
                <th>Color</th>
                <th>Label</th>
            </tr>
            ${arcs1.map(arc => `
            <tr>
                <td>Top (L₁)</td>
                <td>${arc.name}</td>
                <td>${arc.arcSize.toFixed(1)}°</td>
                <td style="color: ${arc.color}">${arc.color === '#3b82f6' ? 'BLUE (acute)' : 'RED (obtuse)'}</td>
                <td>${arc.label || 'none'}</td>
            </tr>
            `).join('')}
            ${arcs2.map(arc => `
            <tr>
                <td>Bottom (L₂)</td>
                <td>${arc.name}</td>
                <td>${arc.arcSize.toFixed(1)}°</td>
                <td style="color: ${arc.color}">${arc.color === '#3b82f6' ? 'BLUE (acute)' : 'RED (obtuse)'}</td>
                <td>${arc.label || 'none'}</td>
            </tr>
            `).join('')}
        </table>

        <div style="background: #fef2f2; border: 2px solid #ef4444; padding: 15px; border-radius: 6px; margin: 20px 0;">
            <h3 style="margin-top: 0; color: #991b1b;">⚠️ If Anything Looks Wrong:</h3>
            <p>Check if:</p>
            <ul>
                <li>Text labels are OUTSIDE angles (should be inside)</li>
                <li>Arc colors are wrong (blue should be 60°, red should be 120°)</li>
                <li>Arcs sweep the wrong direction</li>
                <li>Vertical angles have different colors (they should match!)</li>
            </ul>
            <p><strong>Tell me what's wrong and I'll fix it before applying to the database!</strong></p>
        </div>
    </div>
</body>
</html>
`;

fs.writeFileSync('diagram-complete-test.html', html);
console.log('\n✅ Complete test generated: diagram-complete-test.html');
console.log('👉 Open this file to verify ALL 8 angles look correct!');
console.log('\n📊 Summary:');
console.log(`   - Top intersection: 4 angles (2 blue 60°, 2 red 120°)`);
console.log(`   - Bottom intersection: 4 angles (2 blue 60°, 2 red 120°)`);
console.log(`   - Total: 8 angles with proper vertical angle pairs`);
