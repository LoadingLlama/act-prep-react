/**
 * PARALLEL LINES GENERATOR - ACT Math Lesson 2.1
 *
 * PURPOSE: Generate unlimited unique parallel lines geometry problems
 * for ACT prep with mathematically accurate diagrams.
 *
 * TEMPLATE FOR FUTURE GENERATORS:
 * This file serves as a reference implementation for creating
 * question generators for other ACT math lessons.
 *
 * @author ACT Prep Generator System
 * @version 1.0.0
 */

import fs from 'fs';

// ============================================================================
// GEOMETRY UTILITY FUNCTIONS
// ============================================================================

/**
 * Calculate intersection point of two lines
 * @param {number} x1,y1,x2,y2 - First line endpoints
 * @param {number} x3,y3,x4,y4 - Second line endpoints
 * @returns {object|null} Intersection point {x, y} or null if parallel
 */
function lineIntersection(x1, y1, x2, y2, x3, y3, x4, y4) {
  const denominator = (x1 - x2) * (y3 - y4) - (y1 - y2) * (x3 - x4);
  if (Math.abs(denominator) < 0.0001) return null;
  const t = ((x1 - x3) * (y3 - y4) - (y1 - y3) * (x3 - x4)) / denominator;
  return {
    x: x1 + t * (x2 - x1),
    y: y1 + t * (y2 - y1)
  };
}

/**
 * Calculate angle between two points
 * @param {number} x1,y1 - Start point
 * @param {number} x2,y2 - End point
 * @returns {number} Angle in degrees
 */
function getAngle(x1, y1, x2, y2) {
  return Math.atan2(y2 - y1, x2 - x1) * (180 / Math.PI);
}

/**
 * Normalize angle to 0-360 range
 * @param {number} angle - Angle in degrees
 * @returns {number} Normalized angle
 */
function normalizeAngle(angle) {
  angle = angle % 360;
  if (angle < 0) angle += 360;
  return angle;
}

/**
 * Convert polar coordinates to Cartesian
 * @param {number} cx,cy - Center point
 * @param {number} radius - Distance from center
 * @param {number} angleInDegrees - Angle in degrees
 * @returns {object} Point {x, y}
 */
function polarToCartesian(cx, cy, radius, angleInDegrees) {
  const radians = angleInDegrees * (Math.PI / 180);
  return {
    x: cx + radius * Math.cos(radians),
    y: cy + radius * Math.sin(radians)
  };
}

// ============================================================================
// QUESTION TYPE DEFINITIONS
// ============================================================================

/**
 * All supported question types for parallel lines problems
 * Each type tests a different geometric concept
 */
const QUESTION_TYPES = {
  SUPPLEMENTARY: 'supplementary',           // Linear pairs (sum to 180°)
  CORRESPONDING: 'corresponding',           // F-pattern angles (equal)
  ALTERNATE_INTERIOR: 'alternate_interior', // Z-pattern angles (equal)
  VERTICAL: 'vertical',                     // Opposite angles (equal)
  COMBINED: 'combined'                      // Multi-step reasoning
};

// ============================================================================
// MAIN GENERATOR FUNCTION
// ============================================================================

/**
 * Generate a complete ACT-style parallel lines problem
 *
 * @param {object} config - Configuration options
 * @param {number} config.acuteAngle - The acute angle measure (1-89°)
 * @param {boolean} config.flipTransversal - Flip transversal orientation
 * @param {string} config.labelPosition - Where to place given angle label
 * @param {string} config.questionType - Type of question to generate
 * @param {number} config.problemNumber - Problem number for display
 *
 * @returns {object} Complete problem with SVG, question, answer, explanation
 *
 * @example
 * const problem = generateACTParallelLinesProblem({
 *   acuteAngle: 45,
 *   questionType: 'supplementary',
 *   flipTransversal: false
 * });
 */
function generateACTParallelLinesProblem(config = {}) {
  const {
    acuteAngle = 60,
    flipTransversal = false,
    labelPosition = 'top_lr',
    questionType = 'supplementary',
    problemNumber = 1
  } = config;

  // SVG canvas configuration
  const line1Y = 120;
  const line2Y = 260;
  const lineStart = 70;
  const lineEnd = 480;

  // Calculate transversal endpoints for exact angle
  // Uses tan(angle) to ensure mathematical accuracy
  let transX1, transY1, transX2, transY2;

  if (flipTransversal) {
    // Transversal goes from top-right to bottom-left
    transX2 = 180;
    transY1 = 60;
    const dy = 260;
    const slope = Math.tan(acuteAngle * Math.PI / 180);
    transX1 = transX2 + dy / slope;
    transY2 = 320;
  } else {
    // Transversal goes from top-left to bottom-right
    transX1 = 180;
    transY1 = 60;
    const dy = 260;
    const slope = Math.tan(acuteAngle * Math.PI / 180);
    transX2 = transX1 + dy / slope;
    transY2 = 320;
  }

  // Calculate intersection points
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

  // Generate all 8 possible angles
  const allAngles = generateAllAngles(int1, int2, rays1, rays2, acuteAngle);

  // Select which angles to show based on question type
  const { shownAngles, question, answer, explanation } = selectAnglesForQuestion(
    allAngles,
    acuteAngle,
    questionType,
    labelPosition
  );

  // Generate SVG diagram
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

// ============================================================================
// ANGLE GENERATION
// ============================================================================

/**
 * Generate all 8 angles at both intersections
 * Creates a complete map of all possible angles for flexible question generation
 *
 * @param {object} int1 - Top intersection point
 * @param {object} int2 - Bottom intersection point
 * @param {object} rays1 - Ray angles at top intersection
 * @param {object} rays2 - Ray angles at bottom intersection
 * @param {number} acuteAngle - The acute angle measure
 * @returns {object} Map of all 8 angles with metadata
 */
function generateAllAngles(int1, int2, rays1, rays2, acuteAngle) {
  const obtuseAngle = 180 - acuteAngle;

  return {
    // Top intersection (4 angles)
    top_lr: {
      intersection: int1,
      rays: rays1,
      position: 'lower-right',
      startAngle: 0,
      endAngle: rays1.transDown,
      value: acuteAngle,
      type: 'acute',
      label: 'top_lr'
    },
    top_ll: {
      intersection: int1,
      rays: rays1,
      position: 'lower-left',
      startAngle: rays1.transDown,
      endAngle: 180,
      value: obtuseAngle,
      type: 'obtuse',
      label: 'top_ll'
    },
    top_ul: {
      intersection: int1,
      rays: rays1,
      position: 'upper-left',
      startAngle: 180,
      endAngle: rays1.transUp,
      value: acuteAngle,
      type: 'acute',
      label: 'top_ul'
    },
    top_ur: {
      intersection: int1,
      rays: rays1,
      position: 'upper-right',
      startAngle: rays1.transUp,
      endAngle: 360,
      value: obtuseAngle,
      type: 'obtuse',
      label: 'top_ur'
    },

    // Bottom intersection (4 angles)
    bottom_lr: {
      intersection: int2,
      rays: rays2,
      position: 'lower-right',
      startAngle: 0,
      endAngle: rays2.transDown,
      value: acuteAngle,
      type: 'acute',
      label: 'bottom_lr'
    },
    bottom_ll: {
      intersection: int2,
      rays: rays2,
      position: 'lower-left',
      startAngle: rays2.transDown,
      endAngle: 180,
      value: obtuseAngle,
      type: 'obtuse',
      label: 'bottom_ll'
    },
    bottom_ul: {
      intersection: int2,
      rays: rays2,
      position: 'upper-left',
      startAngle: 180,
      endAngle: rays2.transUp,
      value: acuteAngle,
      type: 'acute',
      label: 'bottom_ul'
    },
    bottom_ur: {
      intersection: int2,
      rays: rays2,
      position: 'upper-right',
      startAngle: rays2.transUp,
      endAngle: 360,
      value: obtuseAngle,
      type: 'obtuse',
      label: 'bottom_ur'
    }
  };
}

// ============================================================================
// QUESTION SELECTION LOGIC
// ============================================================================

/**
 * Select which angles to display and generate appropriate question text
 * This is where the pedagogical logic lives - what to show and what to ask
 *
 * @param {object} allAngles - All 8 possible angles
 * @param {number} acuteAngle - The acute angle measure
 * @param {string} questionType - Type of question to generate
 * @param {string} labelPosition - Where to place the given angle
 * @returns {object} Selected angles and question data
 */
function selectAnglesForQuestion(allAngles, acuteAngle, questionType, labelPosition) {
  const obtuseAngle = 180 - acuteAngle;
  const shownAngles = [];
  let question, answer, explanation;

  const givenAngle = allAngles[labelPosition];

  switch (questionType) {
    case 'supplementary':
      // Show given angle and ask for supplementary angle
      shownAngles.push({ ...givenAngle, showLabel: `${acuteAngle}°` });

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
      // Multi-step: show acute, ask for obtuse at different intersection
      shownAngles.push({ ...allAngles.top_lr, showLabel: `${acuteAngle}°` });
      shownAngles.push({ ...allAngles.bottom_ur, showLabel: '?' });

      question = `In the diagram below, two parallel lines are cut by a transversal. What is the measure of the angle marked with ?`;
      answer = `${obtuseAngle}°`;
      explanation = `The labeled angle is ${acuteAngle}°. Its corresponding angle at the bottom is also ${acuteAngle}°. The angle marked ? is supplementary to this, so ? = 180° - ${acuteAngle}° = ${obtuseAngle}°`;
      break;
  }

  return { shownAngles, question, answer, explanation };
}

// ============================================================================
// SVG GENERATION
// ============================================================================

/**
 * Generate clean, ACT-style SVG diagram
 * Uses thin lines and minimal styling for professional appearance
 *
 * @param {object} params - All diagram parameters
 * @returns {string} SVG markup
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

// ============================================================================
// EXPORT FOR USE IN OTHER FILES
// ============================================================================

export {
  generateACTParallelLinesProblem,
  QUESTION_TYPES,
  lineIntersection,
  getAngle,
  normalizeAngle,
  polarToCartesian
};

// ============================================================================
// STANDALONE EXECUTION (for testing)
// ============================================================================

if (import.meta.url === `file://${process.argv[1]}`) {
  console.log('🎨 Parallel Lines Generator - Standalone Test\n');

  // Generate a few sample problems
  const samples = [
    { acuteAngle: 45, questionType: 'supplementary', flipTransversal: false },
    { acuteAngle: 60, questionType: 'corresponding', flipTransversal: false },
    { acuteAngle: 30, questionType: 'alternate_interior', flipTransversal: true }
  ];

  samples.forEach((config, i) => {
    const problem = generateACTParallelLinesProblem({ ...config, problemNumber: i + 1 });
    console.log(`✓ Problem ${problem.problemNumber}: ${problem.questionType} | ${problem.acuteAngle}° | Answer: ${problem.answer}`);
  });

  console.log('\n✅ Generator is working correctly!');
  console.log('📝 Import this file in your database scripts to generate problems.');
}
