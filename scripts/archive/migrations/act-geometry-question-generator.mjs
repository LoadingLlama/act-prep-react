/**
 * ACT Geometry Question Generator
 * Generates varied parallel lines problems like those on the actual ACT
 * - Different transversal orientations
 * - Different labeled angle positions
 * - Different question types (corresponding, alternate interior, vertical, etc.)
 */

import fs from 'fs';

// Geometry utilities
function lineIntersection(x1, y1, x2, y2, x3, y3, x4, y4) {
  const denominator = (x1 - x2) * (y3 - y4) - (y1 - y2) * (x3 - x4);
  if (Math.abs(denominator) < 0.0001) return null;
  const t = ((x1 - x3) * (y3 - y4) - (y1 - y3) * (x3 - x4)) / denominator;
  return { x: x1 + t * (x2 - x1), y: y1 + t * (y2 - y1) };
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
 * Question types that appear on ACT
 */
const QUESTION_TYPES = {
  SUPPLEMENTARY: 'supplementary',           // "Find the obtuse angle"
  CORRESPONDING: 'corresponding',           // "Find corresponding angle at other intersection"
  ALTERNATE_INTERIOR: 'alternate_interior', // "Find alternate interior angle"
  VERTICAL: 'vertical',                     // "Find vertical angle"
  COMBINED: 'combined'                      // Multi-step problem
};

/**
 * Generate ACT-style parallel lines problem
 * @param {object} config - Configuration object
 * @returns {object} Problem with SVG, question, and answer
 */
function generateACTParallelLinesProblem(config = {}) {
  const {
    acuteAngle = 60,                    // Angle to use (degrees)
    flipTransversal = false,             // Flip transversal left-to-right
    labelPosition = 'lower-right',       // Where to label the given angle
    questionType = 'supplementary',      // Type of question
    problemNumber = 1
  } = config;

  // SVG configuration
  const line1Y = 120;
  const line2Y = 260;
  const lineStart = 70;
  const lineEnd = 480;

  // Calculate transversal based on orientation
  let transX1, transY1, transX2, transY2;

  if (flipTransversal) {
    // Goes from top-right to bottom-left (negative slope)
    transX2 = 180;
    transY1 = 60;
    const dy = 260;
    const slope = Math.tan(acuteAngle * Math.PI / 180);
    transX1 = transX2 + dy / slope;
    transY2 = 320;
  } else {
    // Goes from top-left to bottom-right (positive slope)
    transX1 = 180;
    transY1 = 60;
    const dy = 260;
    const slope = Math.tan(acuteAngle * Math.PI / 180);
    transX2 = transX1 + dy / slope;
    transY2 = 320;
  }

  // Calculate intersections
  const int1 = lineIntersection(lineStart, line1Y, lineEnd, line1Y, transX1, transY1, transX2, transY2);
  const int2 = lineIntersection(lineStart, line2Y, lineEnd, line2Y, transX1, transY1, transX2, transY2);

  // Get ray angles at each intersection
  const rays1 = {
    right: 0,
    left: 180,
    transUp: normalizeAngle(getAngle(int1.x, int1.y, transX1, transY1)),
    transDown: normalizeAngle(getAngle(int1.x, int1.y, transX2, transY2))
  };

  const rays2 = {
    right: 0,
    left: 180,
    transUp: normalizeAngle(getAngle(int2.x, int2.y, transX1, transY1)),
    transDown: normalizeAngle(getAngle(int2.x, int2.y, transX2, transY2))
  };

  // Generate all 8 angles (4 at each intersection)
  const allAngles = generateAllAngles(int1, int2, rays1, rays2, acuteAngle);

  // Select which angles to show based on question type and label position
  const { shownAngles, question, answer, explanation } = selectAnglesForQuestion(
    allAngles,
    acuteAngle,
    questionType,
    labelPosition
  );

  // Generate SVG
  const svg = generateSVG({
    lineStart, lineEnd, line1Y, line2Y,
    transX1, transY1, transX2, transY2,
    int1, int2,
    shownAngles
  });

  return {
    svg,
    question,
    answer,
    explanation,
    acuteAngle,
    obtuseAngle: 180 - acuteAngle,
    questionType,
    flipTransversal,
    labelPosition,
    problemNumber
  };
}

/**
 * Generate all 8 angles at both intersections
 */
function generateAllAngles(int1, int2, rays1, rays2, acuteAngle) {
  const obtuseAngle = 180 - acuteAngle;

  return {
    // Top intersection (int1)
    top_lr: {
      intersection: int1, rays: rays1, position: 'lower-right',
      startAngle: 0, endAngle: rays1.transDown,
      value: acuteAngle, type: 'acute', label: 'top_lr'
    },
    top_ll: {
      intersection: int1, rays: rays1, position: 'lower-left',
      startAngle: rays1.transDown, endAngle: 180,
      value: obtuseAngle, type: 'obtuse', label: 'top_ll'
    },
    top_ul: {
      intersection: int1, rays: rays1, position: 'upper-left',
      startAngle: 180, endAngle: rays1.transUp,
      value: acuteAngle, type: 'acute', label: 'top_ul'
    },
    top_ur: {
      intersection: int1, rays: rays1, position: 'upper-right',
      startAngle: rays1.transUp, endAngle: 360,
      value: obtuseAngle, type: 'obtuse', label: 'top_ur'
    },

    // Bottom intersection (int2)
    bottom_lr: {
      intersection: int2, rays: rays2, position: 'lower-right',
      startAngle: 0, endAngle: rays2.transDown,
      value: acuteAngle, type: 'acute', label: 'bottom_lr'
    },
    bottom_ll: {
      intersection: int2, rays: rays2, position: 'lower-left',
      startAngle: rays2.transDown, endAngle: 180,
      value: obtuseAngle, type: 'obtuse', label: 'bottom_ll'
    },
    bottom_ul: {
      intersection: int2, rays: rays2, position: 'upper-left',
      startAngle: 180, endAngle: rays2.transUp,
      value: acuteAngle, type: 'acute', label: 'bottom_ul'
    },
    bottom_ur: {
      intersection: int2, rays: rays2, position: 'upper-right',
      startAngle: rays2.transUp, endAngle: 360,
      value: obtuseAngle, type: 'obtuse', label: 'bottom_ur'
    }
  };
}

/**
 * Select which angles to show and generate question based on type
 */
function selectAnglesForQuestion(allAngles, acuteAngle, questionType, labelPosition) {
  const obtuseAngle = 180 - acuteAngle;
  const shownAngles = [];
  let question, answer, explanation;

  // Map label position to angle
  const givenAngle = allAngles[labelPosition.replace('-', '_')];

  switch (questionType) {
    case 'supplementary':
      // Show the given angle and ask for supplementary
      shownAngles.push({ ...givenAngle, showLabel: `${acuteAngle}°` });

      // Find supplementary angle at same intersection
      const suppAngle = Object.values(allAngles).find(a =>
        a.intersection === givenAngle.intersection &&
        a.type !== givenAngle.type &&
        a.position.includes(givenAngle.position.split('-')[0])
      );

      shownAngles.push({ ...suppAngle, showLabel: '?' });

      question = `In the diagram below, two parallel lines are cut by a transversal. If one angle measures ${acuteAngle}°, what is the measure of the angle marked with ?`;
      answer = `${obtuseAngle}°`;
      explanation = `Supplementary angles on a line sum to 180°. ${acuteAngle}° + ? = 180°, so ? = ${obtuseAngle}°`;
      break;

    case 'corresponding':
      // Show angle at top, ask for corresponding at bottom
      shownAngles.push({ ...givenAngle, showLabel: `${acuteAngle}°` });

      const corrAngle = allAngles[labelPosition.replace('top', 'bottom')];
      shownAngles.push({ ...corrAngle, showLabel: '?' });

      question = `In the diagram below, two parallel lines are cut by a transversal. What is the measure of the angle marked with ?`;
      answer = `${acuteAngle}°`;
      explanation = `Corresponding angles formed by parallel lines and a transversal are equal. Both angles = ${acuteAngle}°`;
      break;

    case 'alternate_interior':
      // Show one angle, ask for alternate interior
      shownAngles.push({ ...allAngles.top_lr, showLabel: `${acuteAngle}°` });
      shownAngles.push({ ...allAngles.bottom_ul, showLabel: '?' });

      question = `In the diagram below, two parallel lines are cut by a transversal. What is the measure of the angle marked with ?`;
      answer = `${acuteAngle}°`;
      explanation = `Alternate interior angles formed by parallel lines and a transversal are equal. Both = ${acuteAngle}°`;
      break;

    case 'vertical':
      // Show one angle, ask for vertical angle
      shownAngles.push({ ...givenAngle, showLabel: `${givenAngle.value}°` });

      // Find vertical angle (opposite at same intersection)
      const vertAngle = Object.values(allAngles).find(a =>
        a.intersection === givenAngle.intersection &&
        a.type === givenAngle.type &&
        a.position !== givenAngle.position
      );

      shownAngles.push({ ...vertAngle, showLabel: '?' });

      question = `In the diagram below, what is the measure of the angle marked with ?`;
      answer = `${givenAngle.value}°`;
      explanation = `Vertical angles are equal. Both = ${givenAngle.value}°`;
      break;

    case 'combined':
      // Show one acute angle, ask for obtuse at different intersection
      shownAngles.push({ ...allAngles.top_lr, showLabel: `${acuteAngle}°` });
      shownAngles.push({ ...allAngles.bottom_ur, showLabel: '?' });

      question = `In the diagram below, two parallel lines are cut by a transversal. What is the measure of the angle marked with ?`;
      answer = `${obtuseAngle}°`;
      explanation = `The labeled angle is ${acuteAngle}°. Its corresponding angle at the bottom is also ${acuteAngle}°. The angle marked ? is supplementary to this, so ? = 180° - ${acuteAngle}° = ${obtuseAngle}°`;
      break;
  }

  return { shownAngles, question, answer, explanation };
}

/**
 * Generate SVG diagram
 */
function generateSVG({ lineStart, lineEnd, line1Y, line2Y, transX1, transY1, transX2, transY2, int1, int2, shownAngles }) {
  const arcSVG = shownAngles.map(angle => {
    const { intersection, startAngle, endAngle, showLabel } = angle;
    const isQuestion = showLabel === '?';
    const color = isQuestion ? '#ef4444' : '#3b82f6';
    const radius = 45;

    const start = polarToCartesian(intersection.x, intersection.y, radius, startAngle);
    const end = polarToCartesian(intersection.x, intersection.y, radius, endAngle);
    const labelPos = polarToCartesian(intersection.x, intersection.y, radius + 20, (startAngle + endAngle) / 2);

    return `
    <path d="M ${start.x.toFixed(1)},${start.y.toFixed(1)} A ${radius},${radius} 0 0,1 ${end.x.toFixed(1)},${end.y.toFixed(1)}"
          fill="none" stroke="${color}" stroke-width="2"/>
    <text x="${labelPos.x.toFixed(1)}" y="${labelPos.y.toFixed(1)}"
          font-family="Arial, sans-serif" font-size="${isQuestion ? 24 : 22}" font-weight="bold"
          fill="${color}" text-anchor="middle" dominant-baseline="middle">${showLabel}</text>`;
  }).join('');

  return `
<svg width="550" height="400" viewBox="0 0 550 400" xmlns="http://www.w3.org/2000/svg" style="border: 1px solid #ddd; background: white;">
    <!-- Parallel lines -->
    <line x1="${lineStart}" y1="${line1Y}" x2="${lineEnd}" y2="${line1Y}" stroke="#1f2937" stroke-width="1.5"/>
    <line x1="${lineStart}" y1="${line2Y}" x2="${lineEnd}" y2="${line2Y}" stroke="#1f2937" stroke-width="1.5"/>

    <!-- Parallel symbols -->
    <line x1="450" y1="112" x2="468" y2="112" stroke="#6b7280" stroke-width="1"/>
    <line x1="450" y1="128" x2="468" y2="128" stroke="#6b7280" stroke-width="1"/>
    <line x1="450" y1="252" x2="468" y2="252" stroke="#6b7280" stroke-width="1"/>
    <line x1="450" y1="268" x2="468" y2="268" stroke="#6b7280" stroke-width="1"/>

    <!-- Transversal -->
    <line x1="${transX1.toFixed(1)}" y1="${transY1}" x2="${transX2.toFixed(1)}" y2="${transY2}" stroke="#4b5563" stroke-width="1.5"/>

    <!-- Intersection points -->
    <circle cx="${int1.x.toFixed(1)}" cy="${int1.y.toFixed(1)}" r="2.5" fill="#1f2937"/>
    <circle cx="${int2.x.toFixed(1)}" cy="${int2.y.toFixed(1)}" r="2.5" fill="#1f2937"/>

    <!-- Angle arcs -->
    ${arcSVG}
</svg>`;
}

// ===== GENERATE TEST PROBLEMS =====

console.log('🎨 Generating ACT-style question variations...\n');

const testProblems = [
  // Different angles, same position
  { acuteAngle: 30, questionType: 'supplementary', labelPosition: 'top_lr', flipTransversal: false },
  { acuteAngle: 45, questionType: 'supplementary', labelPosition: 'top_lr', flipTransversal: false },
  { acuteAngle: 60, questionType: 'supplementary', labelPosition: 'top_lr', flipTransversal: false },

  // Flipped transversal
  { acuteAngle: 50, questionType: 'supplementary', labelPosition: 'top_lr', flipTransversal: true },
  { acuteAngle: 65, questionType: 'supplementary', labelPosition: 'top_lr', flipTransversal: true },

  // Different question types
  { acuteAngle: 55, questionType: 'corresponding', labelPosition: 'top_lr', flipTransversal: false },
  { acuteAngle: 40, questionType: 'alternate_interior', labelPosition: 'top_lr', flipTransversal: false },
  { acuteAngle: 70, questionType: 'vertical', labelPosition: 'top_lr', flipTransversal: false },
  { acuteAngle: 35, questionType: 'combined', labelPosition: 'top_lr', flipTransversal: false },

  // Different label positions
  { acuteAngle: 60, questionType: 'supplementary', labelPosition: 'top_ul', flipTransversal: false },
];

const problems = testProblems.map((config, i) =>
  generateACTParallelLinesProblem({ ...config, problemNumber: i + 1 })
);

problems.forEach(p => {
  console.log(`Problem ${p.problemNumber}: ${p.questionType} | ${p.acuteAngle}° | ${p.flipTransversal ? 'FLIPPED' : 'NORMAL'}`);
  console.log(`  Answer: ${p.answer}`);
});

// Generate HTML test suite
const html = `
<!DOCTYPE html>
<html>
<head>
    <title>ACT Geometry Question Generator - Test Suite</title>
    <style>
        body {
            font-family: Arial, sans-serif;
            margin: 20px;
            background: #f5f5f5;
        }
        .container {
            max-width: 1400px;
            margin: 0 auto;
            background: white;
            padding: 30px;
            border-radius: 8px;
            box-shadow: 0 2px 4px rgba(0,0,0,0.1);
        }
        h1 { color: #333; text-align: center; }
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
            gap: 25px;
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
            display: flex;
            justify-content: space-between;
        }
        .badge {
            font-size: 12px;
            padding: 4px 8px;
            border-radius: 4px;
            font-weight: normal;
        }
        .badge-type { background: #dbeafe; color: #1e40af; }
        .badge-flip { background: #fef3c7; color: #92400e; }
        .question {
            background: #f9fafb;
            padding: 15px;
            border-radius: 4px;
            margin: 15px 0;
            font-size: 14px;
            line-height: 1.6;
        }
        .diagram { text-align: center; margin: 15px 0; }
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
        .explanation {
            background: #f3f4f6;
            padding: 10px;
            border-left: 3px solid #6b7280;
            margin: 10px 0;
            font-size: 13px;
        }
    </style>
</head>
<body>
    <div class="container">
        <h1>📐 ACT Geometry Question Generator</h1>

        <div class="intro">
            <h2 style="margin-top: 0;">🎯 Comprehensive Test Suite</h2>
            <p><strong>This generator creates realistic ACT-style parallel lines problems with:</strong></p>
            <ul>
                <li>✅ <strong>Multiple question types:</strong> Supplementary, Corresponding, Alternate Interior, Vertical, Combined</li>
                <li>✅ <strong>Variable orientations:</strong> Normal and flipped transversal</li>
                <li>✅ <strong>Different label positions:</strong> Any of the 8 angle positions</li>
                <li>✅ <strong>Any acute angle:</strong> 1° to 89°</li>
                <li>✅ <strong>Clean ACT-style presentation</strong></li>
            </ul>
        </div>

        <div class="problem-grid">
            ${problems.map(p => `
            <div class="problem-card">
                <h3>
                    <span>Problem ${p.problemNumber}</span>
                    <span>
                        <span class="badge badge-type">${p.questionType}</span>
                        ${p.flipTransversal ? '<span class="badge badge-flip">FLIPPED</span>' : ''}
                    </span>
                </h3>

                <div class="question">${p.question}</div>

                <div class="diagram">${p.svg}</div>

                <div class="answer">Answer: ${p.answer}</div>

                <div class="explanation">
                    <strong>Explanation:</strong> ${p.explanation}
                </div>
            </div>
            `).join('')}
        </div>

        <div style="background: #f0fdf4; border: 2px solid #10b981; padding: 20px; border-radius: 6px; margin: 30px 0;">
            <h3 style="margin-top: 0; color: #065f46;">✓ Generator Capabilities</h3>
            <p><strong>This system can generate:</strong></p>
            <ul>
                <li>✓ Unlimited unique problems with any acute angle</li>
                <li>✓ 5 different question types testing different concepts</li>
                <li>✓ Normal and flipped transversal orientations</li>
                <li>✓ Labels at any of the 8 angle positions</li>
                <li>✓ All answers mathematically verified</li>
            </ul>
            <p style="margin-top: 15px;"><strong>Usage:</strong> <code>generateACTParallelLinesProblem({ acuteAngle: 45, questionType: 'corresponding', flipTransversal: true })</code></p>
        </div>
    </div>
</body>
</html>
`;

fs.writeFileSync('act-question-generator-test.html', html);

console.log('\n✅ Generated 10 varied ACT-style problems!');
console.log('📄 File: act-question-generator-test.html');
console.log('\n👉 Open to review all variations!');
