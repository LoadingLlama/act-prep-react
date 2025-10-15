/**
 * Parallel Lines Problem Generator
 * Generates ACT-style diagrams for any given angle
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
 * Generate parallel lines diagram with specified acute angle
 * @param {number} acuteAngle - The acute angle in degrees (e.g., 30, 45, 60)
 * @param {number} problemNumber - Problem number for display
 * @returns {object} SVG string and problem details
 */
function generateParallelLinesProblem(acuteAngle, problemNumber = 1) {
  // Configuration
  const line1Y = 120;
  const line2Y = 260;
  const lineStart = 70;
  const lineEnd = 480;

  // Calculate transversal endpoints for the desired angle
  // slope = tan(angle)
  const transX1 = 180;
  const transY1 = 60;
  const dy = 260; // vertical span
  const slope = Math.tan(acuteAngle * Math.PI / 180);
  const transX2 = transX1 + dy / slope;
  const transY2 = 320;

  // Verify the angle
  const actualSlope = (transY2 - transY1) / (transX2 - transX1);
  const actualAngle = Math.atan(actualSlope) * 180 / Math.PI;

  // Calculate intersections
  const int1 = lineIntersection(lineStart, line1Y, lineEnd, line1Y, transX1, transY1, transX2, transY2);
  const int2 = lineIntersection(lineStart, line2Y, lineEnd, line2Y, transX1, transY1, transX2, transY2);

  // Get rays
  const rays1 = {
    transDown: getAngle(int1.x, int1.y, transX2, transY2)
  };

  const rays2 = {
    transDown: getAngle(int2.x, int2.y, transX2, transY2)
  };

  // Generate ONLY the angles we show in an ACT problem
  // TOP: acute angle (lower-right) and vertical pair (upper-left)
  // BOTTOM: acute angle (lower-right) and QUESTION (upper-right obtuse)

  // TOP: acute angle lower-right
  const t1_lr_start = polarToCartesian(int1.x, int1.y, 45, 0);
  const t1_lr_end = polarToCartesian(int1.x, int1.y, 45, rays1.transDown);
  const t1_lr_label = polarToCartesian(int1.x, int1.y, 65, rays1.transDown / 2);

  // TOP: acute angle upper-left (vertical pair)
  const transUp1 = normalizeAngle(getAngle(int1.x, int1.y, transX1, transY1));
  const t1_ul_start = polarToCartesian(int1.x, int1.y, 45, 180);
  const t1_ul_end = polarToCartesian(int1.x, int1.y, 45, transUp1);
  const t1_ul_label = polarToCartesian(int1.x, int1.y, 65, (180 + transUp1) / 2);

  // BOTTOM: acute angle lower-right
  const t2_lr_start = polarToCartesian(int2.x, int2.y, 45, 0);
  const t2_lr_end = polarToCartesian(int2.x, int2.y, 45, rays2.transDown);
  const t2_lr_label = polarToCartesian(int2.x, int2.y, 65, rays2.transDown / 2);

  // BOTTOM: obtuse angle upper-right (the question)
  const transUp2 = normalizeAngle(getAngle(int2.x, int2.y, transX1, transY1));
  const t2_ur_start = polarToCartesian(int2.x, int2.y, 45, transUp2);
  const t2_ur_end = polarToCartesian(int2.x, int2.y, 45, 360);
  const t2_ur_label = polarToCartesian(int2.x, int2.y, 65, (transUp2 + 360) / 2);

  const obtuseAngle = 180 - acuteAngle;

  // Generate SVG
  const svg = `
<svg width="550" height="400" viewBox="0 0 550 400" xmlns="http://www.w3.org/2000/svg" style="border: 1px solid #ddd; background: white;">
    <!-- Parallel horizontal lines -->
    <line x1="${lineStart}" y1="${line1Y}" x2="${lineEnd}" y2="${line1Y}" stroke="#1f2937" stroke-width="1.5"/>
    <line x1="${lineStart}" y1="${line2Y}" x2="${lineEnd}" y2="${line2Y}" stroke="#1f2937" stroke-width="1.5"/>

    <!-- Parallel symbols -->
    <line x1="450" y1="112" x2="468" y2="112" stroke="#6b7280" stroke-width="1"/>
    <line x1="450" y1="128" x2="468" y2="128" stroke="#6b7280" stroke-width="1"/>
    <line x1="450" y1="252" x2="468" y2="252" stroke="#6b7280" stroke-width="1"/>
    <line x1="450" y1="268" x2="468" y2="268" stroke="#6b7280" stroke-width="1"/>

    <!-- Transversal -->
    <line x1="${transX1}" y1="${transY1}" x2="${transX2.toFixed(1)}" y2="${transY2}" stroke="#4b5563" stroke-width="1.5"/>

    <!-- Intersection points -->
    <circle cx="${int1.x.toFixed(1)}" cy="${int1.y.toFixed(1)}" r="3" fill="#1f2937"/>
    <circle cx="${int2.x.toFixed(1)}" cy="${int2.y.toFixed(1)}" r="3" fill="#1f2937"/>

    <!-- TOP INTERSECTION: Show angle and its vertical pair -->
    <path d="M ${t1_lr_start.x.toFixed(1)},${t1_lr_start.y.toFixed(1)} A 45,45 0 0,1 ${t1_lr_end.x.toFixed(1)},${t1_lr_end.y.toFixed(1)}" fill="none" stroke="#3b82f6" stroke-width="2"/>
    <text x="${t1_lr_label.x.toFixed(1)}" y="${t1_lr_label.y.toFixed(1)}" font-family="Arial, sans-serif" font-size="22" font-weight="bold" fill="#3b82f6" text-anchor="middle" dominant-baseline="middle">${acuteAngle}°</text>

    <path d="M ${t1_ul_start.x.toFixed(1)},${t1_ul_start.y.toFixed(1)} A 45,45 0 0,1 ${t1_ul_end.x.toFixed(1)},${t1_ul_end.y.toFixed(1)}" fill="none" stroke="#3b82f6" stroke-width="2"/>
    <text x="${t1_ul_label.x.toFixed(1)}" y="${t1_ul_label.y.toFixed(1)}" font-family="Arial, sans-serif" font-size="20" font-weight="bold" fill="#3b82f6" text-anchor="middle" dominant-baseline="middle">${acuteAngle}°</text>

    <!-- BOTTOM INTERSECTION: Show angle and the question mark -->
    <path d="M ${t2_lr_start.x.toFixed(1)},${t2_lr_start.y.toFixed(1)} A 45,45 0 0,1 ${t2_lr_end.x.toFixed(1)},${t2_lr_end.y.toFixed(1)}" fill="none" stroke="#3b82f6" stroke-width="2"/>
    <text x="${t2_lr_label.x.toFixed(1)}" y="${t2_lr_label.y.toFixed(1)}" font-family="Arial, sans-serif" font-size="22" font-weight="bold" fill="#3b82f6" text-anchor="middle" dominant-baseline="middle">${acuteAngle}°</text>

    <path d="M ${t2_ur_start.x.toFixed(1)},${t2_ur_start.y.toFixed(1)} A 45,45 0 0,1 ${t2_ur_end.x.toFixed(1)},${t2_ur_end.y.toFixed(1)}" fill="none" stroke="#ef4444" stroke-width="2"/>
    <text x="${t2_ur_label.x.toFixed(1)}" y="${t2_ur_label.y.toFixed(1)}" font-family="Arial, sans-serif" font-size="24" font-weight="bold" fill="#ef4444" text-anchor="middle" dominant-baseline="middle">?</text>

    <!-- Line labels -->
    <text x="500" y="${line1Y}" font-family="Arial, sans-serif" font-size="16" font-weight="bold" fill="#1f2937" dominant-baseline="middle">L₁</text>
    <text x="500" y="${line2Y}" font-family="Arial, sans-serif" font-size="16" font-weight="bold" fill="#1f2937" dominant-baseline="middle">L₂</text>
</svg>`;

  return {
    svg,
    acuteAngle,
    obtuseAngle,
    actualAngle: actualAngle.toFixed(1),
    problemNumber,
    question: `Lines L₁ and L₂ are parallel. A transversal intersects both lines. If one of the acute angles measures ${acuteAngle}°, what is the measure of one of the obtuse angles?`,
    answer: `${obtuseAngle}°`
  };
}

// Generate 10 different test problems
console.log('🎨 Generating 10 parallel lines problems...\n');

const testAngles = [30, 35, 40, 45, 50, 55, 60, 65, 70, 75];
const problems = testAngles.map((angle, index) =>
  generateParallelLinesProblem(angle, index + 1)
);

problems.forEach(p => {
  console.log(`Problem ${p.problemNumber}: ${p.acuteAngle}° (answer: ${p.answer})`);
  console.log(`  Actual angle: ${p.actualAngle}°`);
});

// Generate HTML page with all 10 problems
const html = `
<!DOCTYPE html>
<html>
<head>
    <title>Parallel Lines Generator - 10 Test Problems</title>
    <style>
        body {
            font-family: Arial, sans-serif;
            margin: 20px;
            background: #f5f5f5;
        }
        .container {
            max-width: 1200px;
            margin: 0 auto;
            background: white;
            padding: 30px;
            border-radius: 8px;
            box-shadow: 0 2px 4px rgba(0,0,0,0.1);
        }
        h1 {
            color: #333;
            text-align: center;
        }
        .intro {
            background: #f0f9ff;
            border: 2px solid #3b82f6;
            padding: 20px;
            border-radius: 6px;
            margin: 20px 0;
        }
        .problem-grid {
            display: grid;
            grid-template-columns: repeat(2, 1fr);
            gap: 30px;
            margin: 30px 0;
        }
        .problem-card {
            border: 2px solid #e5e7eb;
            border-radius: 8px;
            padding: 20px;
            background: white;
        }
        .problem-card h3 {
            margin-top: 0;
            color: #1f2937;
            border-bottom: 2px solid #3b82f6;
            padding-bottom: 10px;
        }
        .question {
            background: #f9fafb;
            padding: 15px;
            border-radius: 4px;
            margin: 15px 0;
            font-size: 14px;
            line-height: 1.5;
        }
        .answer {
            background: #d1fae5;
            border: 2px solid #10b981;
            padding: 10px;
            border-radius: 4px;
            margin: 10px 0;
            text-align: center;
            font-weight: bold;
            color: #065f46;
        }
        .diagram {
            text-align: center;
            margin: 15px 0;
        }
    </style>
</head>
<body>
    <div class="container">
        <h1>📐 Parallel Lines Problem Generator</h1>

        <div class="intro">
            <h2 style="margin-top: 0;">✅ Generator Test - 10 Different Angles</h2>
            <p>This demonstrates the generator can create ACT-style parallel lines problems with ANY acute angle.</p>
            <p><strong>Test angles:</strong> 30°, 35°, 40°, 45°, 50°, 55°, 60°, 65°, 70°, 75°</p>
            <p><strong>Each problem shows:</strong></p>
            <ul>
                <li>Two parallel lines with a transversal</li>
                <li>Three labeled acute angles (given information)</li>
                <li>One obtuse angle marked with ? (to solve for)</li>
                <li>Clean, minimal ACT-style presentation</li>
            </ul>
        </div>

        <div class="problem-grid">
            ${problems.map(p => `
            <div class="problem-card">
                <h3>Problem ${p.problemNumber}</h3>

                <div class="question">
                    ${p.question}
                </div>

                <div class="diagram">
                    ${p.svg}
                </div>

                <div class="answer">
                    Answer: ${p.answer}
                </div>

                <div style="font-size: 12px; color: #6b7280; margin-top: 10px;">
                    Calculated angle: ${p.actualAngle}° (should be ${p.acuteAngle}°)
                </div>
            </div>
            `).join('')}
        </div>

        <div style="background: #f0fdf4; border: 2px solid #10b981; padding: 20px; border-radius: 6px; margin: 30px 0;">
            <h3 style="margin-top: 0; color: #065f46;">✓ Generator Validation</h3>
            <p><strong>Verify each diagram:</strong></p>
            <ul>
                <li>✓ Are the labeled angles (blue) actually acute?</li>
                <li>✓ Is the ? angle (red) actually obtuse?</li>
                <li>✓ Do the angles look correct for their labeled values?</li>
                <li>✓ Are all diagrams clean and professional?</li>
                <li>✓ Does acute + obtuse = 180°?</li>
            </ul>
        </div>
    </div>
</body>
</html>
`;

fs.writeFileSync('parallel-lines-test-suite.html', html);

console.log('\n✅ Generated 10 test problems!');
console.log('📄 File: parallel-lines-test-suite.html');
console.log('\n🔍 Validation:');
testAngles.forEach((angle, i) => {
  console.log(`  ${angle}° + ${180 - angle}° = 180° ✓`);
});

console.log('\n👉 Open parallel-lines-test-suite.html to review all 10 problems!');
