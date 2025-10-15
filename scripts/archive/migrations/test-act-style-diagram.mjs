/**
 * ACT-Style Diagram - Clean and Minimal
 * Shows only what's needed to solve the problem
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

console.log('🎨 Generating ACT-style diagram...\n');

// Configuration - ACT style
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

console.log('Top intersection:', int1);
console.log('Bottom intersection:', int2);

// Get rays
const rays1 = {
  transDown: getAngle(int1.x, int1.y, transX2, transY2)
};

const rays2 = {
  transDown: getAngle(int2.x, int2.y, transX2, transY2)
};

console.log('Transversal angle:', rays1.transDown.toFixed(1), '° (should be 60°)');

// Generate ONLY the angles we show in an ACT problem:
// Top intersection: Show 60° (lower-right) and vertical 60° (upper-left)
// Bottom intersection: Show 60° (lower-right) and the QUESTION ? (upper-right)

// TOP: 60° lower-right
const t1_lr_start = polarToCartesian(int1.x, int1.y, 45, 0);
const t1_lr_end = polarToCartesian(int1.x, int1.y, 45, rays1.transDown);
const t1_lr_label = polarToCartesian(int1.x, int1.y, 65, rays1.transDown / 2);

// TOP: 60° upper-left (vertical pair)
const transUp1 = normalizeAngle(getAngle(int1.x, int1.y, transX1, transY1));
const t1_ul_start = polarToCartesian(int1.x, int1.y, 45, 180);
const t1_ul_end = polarToCartesian(int1.x, int1.y, 45, transUp1);
const t1_ul_label = polarToCartesian(int1.x, int1.y, 65, (180 + transUp1) / 2);

// BOTTOM: 60° lower-right
const t2_lr_start = polarToCartesian(int2.x, int2.y, 45, 0);
const t2_lr_end = polarToCartesian(int2.x, int2.y, 45, rays2.transDown);
const t2_lr_label = polarToCartesian(int2.x, int2.y, 65, rays2.transDown / 2);

// BOTTOM: ? upper-right (the question)
const transUp2 = normalizeAngle(getAngle(int2.x, int2.y, transX1, transY1));
const t2_ur_start = polarToCartesian(int2.x, int2.y, 45, transUp2);
const t2_ur_end = polarToCartesian(int2.x, int2.y, 45, 360);
const t2_ur_label = polarToCartesian(int2.x, int2.y, 65, (transUp2 + 360) / 2);

console.log('\nArcs generated:');
console.log('  Top lower-right: 60° blue');
console.log('  Top upper-left: 60° blue (vertical pair)');
console.log('  Bottom lower-right: 60° blue');
console.log('  Bottom upper-right: ? red (answer)');

// Generate SVG
const svg = `
<svg width="550" height="400" viewBox="0 0 550 400" xmlns="http://www.w3.org/2000/svg" style="border: 1px solid #ddd; background: white;">
    <!-- Parallel horizontal lines - THINNER -->
    <line x1="${lineStart}" y1="${line1Y}" x2="${lineEnd}" y2="${line1Y}" stroke="#1f2937" stroke-width="1.5"/>
    <line x1="${lineStart}" y1="${line2Y}" x2="${lineEnd}" y2="${line2Y}" stroke="#1f2937" stroke-width="1.5"/>

    <!-- Parallel symbols -->
    <line x1="450" y1="112" x2="468" y2="112" stroke="#6b7280" stroke-width="1"/>
    <line x1="450" y1="128" x2="468" y2="128" stroke="#6b7280" stroke-width="1"/>
    <line x1="450" y1="252" x2="468" y2="252" stroke="#6b7280" stroke-width="1"/>
    <line x1="450" y1="268" x2="468" y2="268" stroke="#6b7280" stroke-width="1"/>

    <!-- Transversal - THINNER -->
    <line x1="${transX1}" y1="${transY1}" x2="${transX2}" y2="${transY2}" stroke="#4b5563" stroke-width="1.5"/>

    <!-- Intersection points - SMALLER -->
    <circle cx="${int1.x.toFixed(1)}" cy="${int1.y.toFixed(1)}" r="3" fill="#1f2937"/>
    <circle cx="${int2.x.toFixed(1)}" cy="${int2.y.toFixed(1)}" r="3" fill="#1f2937"/>

    <!-- TOP INTERSECTION: Show 60° and its vertical pair -->
    <path d="M ${t1_lr_start.x.toFixed(1)},${t1_lr_start.y.toFixed(1)} A 45,45 0 0,1 ${t1_lr_end.x.toFixed(1)},${t1_lr_end.y.toFixed(1)}" fill="none" stroke="#3b82f6" stroke-width="2"/>
    <text x="${t1_lr_label.x.toFixed(1)}" y="${t1_lr_label.y.toFixed(1)}" font-family="Arial, sans-serif" font-size="22" font-weight="bold" fill="#3b82f6" text-anchor="middle" dominant-baseline="middle">60°</text>

    <path d="M ${t1_ul_start.x.toFixed(1)},${t1_ul_start.y.toFixed(1)} A 45,45 0 0,1 ${t1_ul_end.x.toFixed(1)},${t1_ul_end.y.toFixed(1)}" fill="none" stroke="#3b82f6" stroke-width="2"/>
    <text x="${t1_ul_label.x.toFixed(1)}" y="${t1_ul_label.y.toFixed(1)}" font-family="Arial, sans-serif" font-size="20" font-weight="bold" fill="#3b82f6" text-anchor="middle" dominant-baseline="middle">60°</text>

    <!-- BOTTOM INTERSECTION: Show 60° and the question mark -->
    <path d="M ${t2_lr_start.x.toFixed(1)},${t2_lr_start.y.toFixed(1)} A 45,45 0 0,1 ${t2_lr_end.x.toFixed(1)},${t2_lr_end.y.toFixed(1)}" fill="none" stroke="#3b82f6" stroke-width="2"/>
    <text x="${t2_lr_label.x.toFixed(1)}" y="${t2_lr_label.y.toFixed(1)}" font-family="Arial, sans-serif" font-size="22" font-weight="bold" fill="#3b82f6" text-anchor="middle" dominant-baseline="middle">60°</text>

    <path d="M ${t2_ur_start.x.toFixed(1)},${t2_ur_start.y.toFixed(1)} A 45,45 0 0,1 ${t2_ur_end.x.toFixed(1)},${t2_ur_end.y.toFixed(1)}" fill="none" stroke="#ef4444" stroke-width="2"/>
    <text x="${t2_ur_label.x.toFixed(1)}" y="${t2_ur_label.y.toFixed(1)}" font-family="Arial, sans-serif" font-size="24" font-weight="bold" fill="#ef4444" text-anchor="middle" dominant-baseline="middle">?</text>

    <!-- Line labels -->
    <text x="500" y="${line1Y}" font-family="Arial, sans-serif" font-size="16" font-weight="bold" fill="#1f2937" dominant-baseline="middle">L₁</text>
    <text x="500" y="${line2Y}" font-family="Arial, sans-serif" font-size="16" font-weight="bold" fill="#1f2937" dominant-baseline="middle">L₂</text>
</svg>
`;

const html = `
<!DOCTYPE html>
<html>
<head>
    <title>ACT-Style Diagram Test</title>
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
            padding: 30px;
            border-radius: 8px;
            box-shadow: 0 2px 4px rgba(0,0,0,0.1);
        }
        h1 { color: #333; margin-bottom: 10px; }
        .problem {
            background: #f9fafb;
            border-left: 4px solid #3b82f6;
            padding: 20px;
            margin: 20px 0;
            font-size: 15px;
            line-height: 1.6;
        }
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
            font-size: 18px;
        }
        .checklist ul {
            margin: 10px 0;
        }
        .checklist li {
            margin: 8px 0;
            font-size: 14px;
        }
        .approve {
            background: #10b981;
            color: white;
            border: none;
            padding: 12px 24px;
            font-size: 16px;
            font-weight: bold;
            border-radius: 6px;
            cursor: pointer;
            margin: 20px 0;
        }
        .approve:hover {
            background: #059669;
        }
    </style>
</head>
<body>
    <div class="container">
        <h1>📐 ACT-Style Diagram (Clean & Minimal)</h1>
        <p style="color: #666; margin-bottom: 30px;">This is what students will see - only essential info!</p>

        <div class="problem">
            <strong>Problem:</strong> Lines L₁ and L₂ are parallel. A transversal intersects both lines, creating 8 angles. If one of the acute angles measures 60°, what is the measure of one of the obtuse angles?
        </div>

        <div style="text-align: center; margin: 30px 0;">
            ${svg}
        </div>

        <div class="checklist">
            <h3>✓ ACT-Style Checklist:</h3>
            <ul>
                <li>✅ Clean, minimal design (not cluttered)</li>
                <li>✅ Only 4 angles shown (not all 8)</li>
                <li>✅ Thinner lines (1.5px instead of 4px)</li>
                <li>✅ Shows what's GIVEN (60° blue angles)</li>
                <li>✅ Shows what to FIND (? red angle)</li>
                <li>✅ Demonstrates concept (vertical angle pair at top)</li>
            </ul>

            <h4 style="margin-top: 20px; color: #1e40af;">Visual Validation:</h4>
            <ul>
                <li>✓ Are the 60° labels INSIDE the acute angles?</li>
                <li>✓ Is the ? label INSIDE the obtuse angle?</li>
                <li>✓ Are the arcs properly positioned?</li>
                <li>✓ Does it look clean and professional?</li>
            </ul>
        </div>

        <div style="text-align: center; margin-top: 30px;">
            <p><strong>If this looks good, I'll apply it to the database!</strong></p>
            <button class="approve" onclick="alert('Tell me: APPROVED or tell me what to fix!')">
                This looks good ✓
            </button>
        </div>

        <div style="background: #fef2f2; border: 2px solid #ef4444; padding: 15px; border-radius: 6px; margin: 20px 0;">
            <h4 style="margin-top: 0; color: #991b1b;">Still see issues?</h4>
            <p style="margin: 0;">Tell me specifically what's wrong:</p>
            <ul style="margin: 10px 0;">
                <li>Text position incorrect?</li>
                <li>Arc in wrong place?</li>
                <li>Lines too thick/thin?</li>
                <li>Colors wrong?</li>
            </ul>
        </div>
    </div>
</body>
</html>
`;

fs.writeFileSync('diagram-act-style-test.html', html);
console.log('\n✅ ACT-style test generated: diagram-act-style-test.html');
console.log('👉 This shows a clean, minimal diagram like real ACT problems!');
console.log('\n📊 What\'s shown:');
console.log('   - Top intersection: 2 angles (both 60° - shows vertical pair concept)');
console.log('   - Bottom intersection: 2 angles (60° given, ? to solve)');
console.log('   - Thinner lines (1.5px for lines, 2px for arcs)');
console.log('   - All arcs same radius (45px) for consistency');
console.log('   - Clean, professional look');
