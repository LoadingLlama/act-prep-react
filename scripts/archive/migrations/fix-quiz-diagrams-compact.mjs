/**
 * Update Quiz Question Diagrams to be Compact with Reduced Whitespace
 */

import { createClient } from '@supabase/supabase-js';
import dotenv from 'dotenv';

dotenv.config();

const supabase = createClient(
  process.env.REACT_APP_SUPABASE_URL,
  process.env.SUPABASE_SERVICE_ROLE_KEY
);

// ============================================================================
// GEOMETRY UTILITIES
// ============================================================================

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
  return { x: x1 + t * (x2 - x1), y: y1 + t * (y2 - y1) };
}

// ============================================================================
// COMPACT DIAGRAM GENERATORS
// ============================================================================

function generateVerticalAnglesDiagram(givenAngle) {
  const cx = 200;
  const cy = 120;
  const lineLength = 100;

  const angle1 = givenAngle;
  const p1 = polarToCartesian(cx, cy, lineLength, -angle1);
  const p2 = polarToCartesian(cx, cy, lineLength, 180 - angle1);
  const p3 = polarToCartesian(cx, cy, lineLength, 0);
  const p4 = polarToCartesian(cx, cy, lineLength, 180);

  const arcRadius = 25;
  const arcStart = polarToCartesian(cx, cy, arcRadius, 0);
  const arcEnd = polarToCartesian(cx, cy, arcRadius, -angle1);
  const vertArcStart = polarToCartesian(cx, cy, arcRadius, 180);
  const vertArcEnd = polarToCartesian(cx, cy, arcRadius, 180 - angle1);

  const givenLabelPos = polarToCartesian(cx, cy, 45, -angle1 / 2);
  const vertLabelPos = polarToCartesian(cx, cy, 45, 180 - angle1 / 2);

  return `<svg width="400" height="240" viewBox="0 0 400 240" xmlns="http://www.w3.org/2000/svg" style="background: white; max-width: 100%; height: auto;">
    <line x1="${p1.x.toFixed(1)}" y1="${p1.y.toFixed(1)}" x2="${p2.x.toFixed(1)}" y2="${p2.y.toFixed(1)}" stroke="#000" stroke-width="2"/>
    <line x1="${p3.x.toFixed(1)}" y1="${p3.y.toFixed(1)}" x2="${p4.x.toFixed(1)}" y2="${p4.y.toFixed(1)}" stroke="#000" stroke-width="2"/>
    <circle cx="${cx}" cy="${cy}" r="3" fill="#000"/>
    <path d="M ${arcStart.x.toFixed(1)},${arcStart.y.toFixed(1)} A ${arcRadius},${arcRadius} 0 0,0 ${arcEnd.x.toFixed(1)},${arcEnd.y.toFixed(1)}" stroke="#000" fill="none" stroke-width="1.5"/>
    <path d="M ${vertArcStart.x.toFixed(1)},${vertArcStart.y.toFixed(1)} A ${arcRadius},${arcRadius} 0 0,0 ${vertArcEnd.x.toFixed(1)},${vertArcEnd.y.toFixed(1)}" stroke="#000" fill="none" stroke-width="1.5"/>
    <text x="${givenLabelPos.x.toFixed(1)}" y="${givenLabelPos.y.toFixed(1)}" font-family="Times New Roman, serif" font-size="17" fill="#000" text-anchor="middle" dominant-baseline="middle">${givenAngle}°</text>
    <text x="${vertLabelPos.x.toFixed(1)}" y="${vertLabelPos.y.toFixed(1)}" font-family="Times New Roman, serif" font-size="19" font-style="italic" fill="#000" text-anchor="middle" dominant-baseline="middle">?</text>
</svg>`;
}

function generateAdjacentAnglesDiagram(givenAngle) {
  const cx = 200;
  const cy = 120;
  const lineLength = 100;

  const angle1 = givenAngle;
  const p1 = polarToCartesian(cx, cy, lineLength, -angle1);
  const p2 = polarToCartesian(cx, cy, lineLength, 180 - angle1);
  const p3 = polarToCartesian(cx, cy, lineLength, 0);
  const p4 = polarToCartesian(cx, cy, lineLength, 180);

  const arcRadius1 = 25;
  const arcStart1 = polarToCartesian(cx, cy, arcRadius1, 0);
  const arcEnd1 = polarToCartesian(cx, cy, arcRadius1, -angle1);

  const arcRadius2 = 30;
  const adjArcStart = polarToCartesian(cx, cy, arcRadius2, -angle1);
  const adjArcEnd = polarToCartesian(cx, cy, arcRadius2, 180);

  const givenLabelPos = polarToCartesian(cx, cy, 45, -angle1 / 2);
  const adjLabelPos = polarToCartesian(cx, cy, 55, (-angle1 + 180) / 2);

  return `<svg width="400" height="240" viewBox="0 0 400 240" xmlns="http://www.w3.org/2000/svg" style="background: white; max-width: 100%; height: auto;">
    <line x1="${p1.x.toFixed(1)}" y1="${p1.y.toFixed(1)}" x2="${p2.x.toFixed(1)}" y2="${p2.y.toFixed(1)}" stroke="#000" stroke-width="2"/>
    <line x1="${p3.x.toFixed(1)}" y1="${p3.y.toFixed(1)}" x2="${p4.x.toFixed(1)}" y2="${p4.y.toFixed(1)}" stroke="#000" stroke-width="2"/>
    <circle cx="${cx}" cy="${cy}" r="3" fill="#000"/>
    <path d="M ${arcStart1.x.toFixed(1)},${arcStart1.y.toFixed(1)} A ${arcRadius1},${arcRadius1} 0 0,0 ${arcEnd1.x.toFixed(1)},${arcEnd1.y.toFixed(1)}" stroke="#000" fill="none" stroke-width="1.5"/>
    <path d="M ${adjArcStart.x.toFixed(1)},${adjArcStart.y.toFixed(1)} A ${arcRadius2},${arcRadius2} 0 1,1 ${adjArcEnd.x.toFixed(1)},${adjArcEnd.y.toFixed(1)}" stroke="#000" fill="none" stroke-width="1.5"/>
    <text x="${givenLabelPos.x.toFixed(1)}" y="${givenLabelPos.y.toFixed(1)}" font-family="Times New Roman, serif" font-size="17" fill="#000" text-anchor="middle" dominant-baseline="middle">${givenAngle}°</text>
    <text x="${adjLabelPos.x.toFixed(1)}" y="${adjLabelPos.y.toFixed(1)}" font-family="Times New Roman, serif" font-size="19" font-style="italic" fill="#000" text-anchor="middle" dominant-baseline="middle">?</text>
</svg>`;
}

function generateParallelLinesDiagram(givenAngle, unknownVariable = 'x') {
  const line1Y = 120;
  const line2Y = 240;
  const lineStart = 50;
  const lineEnd = 450;

  const transX1 = 130;
  const transY1 = 60;
  const dy = 220;
  const slope = Math.tan(givenAngle * Math.PI / 180);
  const transX2 = transX1 + dy / slope;
  const transY2 = 280;

  const int1 = lineIntersection(lineStart, line1Y, lineEnd, line1Y, transX1, transY1, transX2, transY2);
  const int2 = lineIntersection(lineStart, line2Y, lineEnd, line2Y, transX1, transY1, transX2, transY2);

  const givenLabelPos = polarToCartesian(int1.x, int1.y, 50, givenAngle / 2);
  const transUpAngle = Math.atan2(transY1 - int2.y, transX1 - int2.x) * (180 / Math.PI);
  const unknownLabelPos = polarToCartesian(int2.x, int2.y, 50, (transUpAngle + 360) / 2 + 180);

  const transDownAngle = Math.atan2(transY2 - int1.y, transX2 - int1.x) * (180 / Math.PI);
  const transUpAngle2 = Math.atan2(transY1 - int2.y, transX1 - int2.x) * (180 / Math.PI);

  const givenArcStart = polarToCartesian(int1.x, int1.y, 22, 0);
  const givenArcEnd = polarToCartesian(int1.x, int1.y, 22, transDownAngle);
  const unknownArcStart = polarToCartesian(int2.x, int2.y, 22, transUpAngle2);
  const unknownArcEnd = polarToCartesian(int2.x, int2.y, 22, 0);

  return `<svg width="500" height="340" viewBox="0 0 500 340" xmlns="http://www.w3.org/2000/svg" style="background: white; max-width: 100%; height: auto;">
    <line x1="${lineStart}" y1="${line1Y}" x2="${lineEnd}" y2="${line1Y}" stroke="#000" stroke-width="2"/>
    <line x1="${lineStart}" y1="${line2Y}" x2="${lineEnd}" y2="${line2Y}" stroke="#000" stroke-width="2"/>
    <line x1="${transX1.toFixed(1)}" y1="${transY1}" x2="${transX2.toFixed(1)}" y2="${transY2}" stroke="#000" stroke-width="2"/>
    <path d="M ${givenArcStart.x.toFixed(1)},${givenArcStart.y.toFixed(1)} A 22,22 0 0,1 ${givenArcEnd.x.toFixed(1)},${givenArcEnd.y.toFixed(1)}" stroke="#000" fill="none" stroke-width="1.5"/>
    <path d="M ${unknownArcStart.x.toFixed(1)},${unknownArcStart.y.toFixed(1)} A 22,22 0 0,1 ${unknownArcEnd.x.toFixed(1)},${unknownArcEnd.y.toFixed(1)}" stroke="#000" fill="none" stroke-width="1.5"/>
    <text x="${givenLabelPos.x.toFixed(1)}" y="${givenLabelPos.y.toFixed(1)}" font-family="Times New Roman, serif" font-size="17" fill="#000" text-anchor="middle" dominant-baseline="middle">${givenAngle}°</text>
    <text x="${unknownLabelPos.x.toFixed(1)}" y="${unknownLabelPos.y.toFixed(1)}" font-family="Times New Roman, serif" font-size="19" font-style="italic" fill="#000" text-anchor="middle" dominant-baseline="middle">${unknownVariable}°</text>
</svg>`;
}

function generateAlgebraicDiagram() {
  const cx = 200;
  const cy = 120;
  const angle = 40;
  const lineLength = 100;

  const p1 = polarToCartesian(cx, cy, lineLength, -angle);
  const p2 = polarToCartesian(cx, cy, lineLength, 180 - angle);
  const p3 = polarToCartesian(cx, cy, lineLength, 0);
  const p4 = polarToCartesian(cx, cy, lineLength, 180);

  const arc1Start = polarToCartesian(cx, cy, 25, 0);
  const arc1End = polarToCartesian(cx, cy, 25, -angle);
  const arc2Start = polarToCartesian(cx, cy, 30, -angle);
  const arc2End = polarToCartesian(cx, cy, 30, 180);

  const label1Pos = polarToCartesian(cx, cy, 45, -angle / 2);
  const label2Pos = polarToCartesian(cx, cy, 60, (-angle + 180) / 2);

  return `<svg width="400" height="240" viewBox="0 0 400 240" xmlns="http://www.w3.org/2000/svg" style="background: white; max-width: 100%; height: auto;">
    <line x1="${p1.x.toFixed(1)}" y1="${p1.y.toFixed(1)}" x2="${p2.x.toFixed(1)}" y2="${p2.y.toFixed(1)}" stroke="#000" stroke-width="2"/>
    <line x1="${p3.x.toFixed(1)}" y1="${p3.y.toFixed(1)}" x2="${p4.x.toFixed(1)}" y2="${p4.y.toFixed(1)}" stroke="#000" stroke-width="2"/>
    <circle cx="${cx}" cy="${cy}" r="3" fill="#000"/>
    <path d="M ${arc1Start.x.toFixed(1)},${arc1Start.y.toFixed(1)} A 25,25 0 0,0 ${arc1End.x.toFixed(1)},${arc1End.y.toFixed(1)}" stroke="#000" fill="none" stroke-width="1.5"/>
    <path d="M ${arc2Start.x.toFixed(1)},${arc2Start.y.toFixed(1)} A 30,30 0 1,1 ${arc2End.x.toFixed(1)},${arc2End.y.toFixed(1)}" stroke="#000" fill="none" stroke-width="1.5"/>
    <text x="${label1Pos.x.toFixed(1)}" y="${label1Pos.y.toFixed(1)}" font-family="Times New Roman, serif" font-size="16" font-style="italic" fill="#000" text-anchor="middle" dominant-baseline="middle">3x°</text>
    <text x="${label2Pos.x.toFixed(1)}" y="${label2Pos.y.toFixed(1)}" font-family="Times New Roman, serif" font-size="16" font-style="italic" fill="#000" text-anchor="middle" dominant-baseline="middle">(x + 80)°</text>
</svg>`;
}

// ============================================================================
// UPDATE QUIZ QUESTIONS
// ============================================================================

async function updateQuizDiagrams() {
  console.log('🔧 Updating quiz diagrams to compact format...\n');

  // Find the quiz
  const { data: lesson } = await supabase
    .from('lessons')
    .select('id')
    .eq('lesson_key', 'geometry-angles')
    .single();

  const { data: quizzes } = await supabase
    .from('quizzes')
    .select('*')
    .eq('lesson_id', lesson.id);

  if (!quizzes || quizzes.length === 0) {
    console.error('❌ No quiz found');
    return false;
  }

  const quiz = quizzes[0];

  const { data: questions } = await supabase
    .from('quiz_questions')
    .select('*')
    .eq('quiz_id', quiz.id)
    .order('question_order');

  if (!questions || questions.length === 0) {
    console.error('❌ No questions found');
    return false;
  }

  console.log(`Found ${questions.length} questions\n`);

  const updates = [
    {
      id: questions[0].id,
      diagram: generateVerticalAnglesDiagram(40),
      text: 'In the figure below, two lines intersect. What is the value of the angle marked with a question mark?',
      name: 'Question 1 (Vertical - 40°)'
    },
    {
      id: questions[1].id,
      diagram: generateAdjacentAnglesDiagram(75),
      text: 'In the figure below, two lines intersect. What is the value of the angle marked with a question mark?',
      name: 'Question 2 (Adjacent - 75°)'
    },
    {
      id: questions[2].id,
      diagram: generateParallelLinesDiagram(50, 'x'),
      text: 'In the figure below, two parallel lines are cut by a transversal. What is the value of <em>x</em>?',
      name: 'Question 3 (Parallel - 50°)'
    },
    {
      id: questions[3].id,
      diagram: generateParallelLinesDiagram(65, 'y'),
      text: 'In the figure below, two parallel lines are cut by a transversal. What is the value of <em>y</em>?',
      name: 'Question 4 (Parallel - 65°)'
    },
    {
      id: questions[4].id,
      diagram: generateAlgebraicDiagram(),
      text: 'In the figure below, two lines intersect creating four angles. If one angle measures 3<em>x</em> and an adjacent angle measures <em>x</em> + 80, what is the value of <em>x</em>?',
      name: 'Question 5 (Algebraic)'
    }
  ];

  for (const update of updates) {
    const fullQuestion = `<div style="margin: 0.5rem 0;">
  <p>${update.text}</p>
  <div style="text-align: center; margin: 0.5rem 0;">
    ${update.diagram}
  </div>
</div>`.trim();

    const { error } = await supabase
      .from('quiz_questions')
      .update({ question_text: fullQuestion })
      .eq('id', update.id);

    if (error) {
      console.error(`❌ Error updating ${update.name}:`, error);
    } else {
      console.log(`✅ Updated ${update.name}`);
    }
  }

  console.log('\n✅ All quiz diagrams updated to compact format!\n');
  console.log('📊 Changes:');
  console.log('  ✅ Reduced diagram heights (450px → 240px for intersecting, 340px for parallel)');
  console.log('  ✅ Reduced margins (20px → 0.5rem ~8px)');
  console.log('  ✅ Maintained ACT-authentic styling\n');

  return true;
}

// ============================================================================
// MAIN
// ============================================================================

async function main() {
  console.log('🚀 Updating quiz diagrams to compact format...\n');
  console.log('='.repeat(70));
  console.log('\n');

  const success = await updateQuizDiagrams();

  console.log('='.repeat(70));
  if (success) {
    console.log('\n✨ All done! Test in your React app.\n');
  } else {
    console.log('\n❌ Some errors occurred. Check logs above.\n');
  }
}

main();
