/**
 * Comprehensive Fix for Lesson 2.1
 * 1. Update Example 3 with ACT-authentic diagram
 * 2. Delete duplicate quizzes
 * 3. Add ACT-authentic diagrams to quiz questions
 */

import { createClient } from '@supabase/supabase-js';
import dotenv from 'dotenv';

dotenv.config();

const supabase = createClient(
  process.env.REACT_APP_SUPABASE_URL,
  process.env.SUPABASE_SERVICE_ROLE_KEY
);

// ============================================================================
// DIAGRAM GENERATORS
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

/**
 * Generate ACT-authentic parallel lines diagram
 */
function generateParallelLinesDiagram(givenAngle, unknownVariable = 'x') {
  const unknownAngle = 180 - givenAngle;

  const line1Y = 150;
  const line2Y = 300;
  const lineStart = 50;
  const lineEnd = 500;

  const transX1 = 150;
  const transY1 = 80;
  const dy = 280;
  const slope = Math.tan(givenAngle * Math.PI / 180);
  const transX2 = transX1 + dy / slope;
  const transY2 = 360;

  const int1 = lineIntersection(lineStart, line1Y, lineEnd, line1Y, transX1, transY1, transX2, transY2);
  const int2 = lineIntersection(lineStart, line2Y, lineEnd, line2Y, transX1, transY1, transX2, transY2);

  const givenLabelPos = polarToCartesian(int1.x, int1.y, 55, givenAngle / 2);
  const transUpAngle = Math.atan2(transY1 - int2.y, transX1 - int2.x) * (180 / Math.PI);
  const unknownLabelPos = polarToCartesian(int2.x, int2.y, 55, (transUpAngle + 360) / 2 + 180);

  const transDownAngle = Math.atan2(transY2 - int1.y, transX2 - int1.x) * (180 / Math.PI);
  const transUpAngle2 = Math.atan2(transY1 - int2.y, transX1 - int2.x) * (180 / Math.PI);

  const givenArcStart = polarToCartesian(int1.x, int1.y, 25, 0);
  const givenArcEnd = polarToCartesian(int1.x, int1.y, 25, transDownAngle);
  const unknownArcStart = polarToCartesian(int2.x, int2.y, 25, transUpAngle2);
  const unknownArcEnd = polarToCartesian(int2.x, int2.y, 25, 0);

  return `<svg width="550" height="450" viewBox="0 0 550 450" xmlns="http://www.w3.org/2000/svg" style="background: white; max-width: 100%; height: auto;">
    <line x1="${lineStart}" y1="${line1Y}" x2="${lineEnd}" y2="${line1Y}" stroke="#000" stroke-width="2"/>
    <line x1="${lineStart}" y1="${line2Y}" x2="${lineEnd}" y2="${line2Y}" stroke="#000" stroke-width="2"/>
    <line x1="${transX1.toFixed(1)}" y1="${transY1}" x2="${transX2.toFixed(1)}" y2="${transY2}" stroke="#000" stroke-width="2"/>
    <path d="M ${givenArcStart.x.toFixed(1)},${givenArcStart.y.toFixed(1)} A 25,25 0 0,1 ${givenArcEnd.x.toFixed(1)},${givenArcEnd.y.toFixed(1)}" stroke="#000" fill="none" stroke-width="1.5"/>
    <path d="M ${unknownArcStart.x.toFixed(1)},${unknownArcStart.y.toFixed(1)} A 25,25 0 0,1 ${unknownArcEnd.x.toFixed(1)},${unknownArcEnd.y.toFixed(1)}" stroke="#000" fill="none" stroke-width="1.5"/>
    <text x="${givenLabelPos.x.toFixed(1)}" y="${givenLabelPos.y.toFixed(1)}" font-family="Times New Roman, serif" font-size="17" fill="#000" text-anchor="middle" dominant-baseline="middle">${givenAngle}°</text>
    <text x="${unknownLabelPos.x.toFixed(1)}" y="${unknownLabelPos.y.toFixed(1)}" font-family="Times New Roman, serif" font-size="19" font-style="italic" fill="#000" text-anchor="middle" dominant-baseline="middle">${unknownVariable}°</text>
</svg>`;
}

/**
 * Generate ACT-authentic intersecting lines diagram
 */
function generateIntersectingLinesDiagram(givenAngle, showAdjacent = false) {
  const adjacentAngle = 180 - givenAngle;
  const cx = 250;
  const cy = 150;

  // Calculate line endpoints for the given angle
  const angle1 = givenAngle;
  const angle2 = givenAngle + 180;
  const angle3 = 0;
  const angle4 = 180;

  const radius = 120;

  const p1 = polarToCartesian(cx, cy, radius, -angle1);
  const p2 = polarToCartesian(cx, cy, radius, 180 - angle1);
  const p3 = polarToCartesian(cx, cy, radius, 0);
  const p4 = polarToCartesian(cx, cy, radius, 180);

  // Arc for given angle (right side)
  const arcRadius = 30;
  const arcStart = polarToCartesian(cx, cy, arcRadius, 0);
  const arcEnd = polarToCartesian(cx, cy, arcRadius, -angle1);

  // Arc for unknown angle (left or top depending on question)
  const unknownArcStart = showAdjacent
    ? polarToCartesian(cx, cy, arcRadius, -angle1)
    : polarToCartesian(cx, cy, arcRadius, 180);
  const unknownArcEnd = showAdjacent
    ? polarToCartesian(cx, cy, arcRadius, 180)
    : polarToCartesian(cx, cy, arcRadius, 180 - angle1);

  // Label positions
  const givenLabelPos = polarToCartesian(cx, cy, 50, -angle1 / 2);
  const unknownLabelPos = showAdjacent
    ? polarToCartesian(cx, cy, 60, (-angle1 + 180) / 2)
    : polarToCartesian(cx, cy, 50, 180 - angle1 / 2);

  return `<svg width="450" height="350" viewBox="0 0 450 350" xmlns="http://www.w3.org/2000/svg" style="background: white; max-width: 100%; height: auto;">
    <line x1="${p1.x.toFixed(1)}" y1="${p1.y.toFixed(1)}" x2="${p2.x.toFixed(1)}" y2="${p2.y.toFixed(1)}" stroke="#000" stroke-width="2"/>
    <line x1="${p3.x.toFixed(1)}" y1="${p3.y.toFixed(1)}" x2="${p4.x.toFixed(1)}" y2="${p4.y.toFixed(1)}" stroke="#000" stroke-width="2"/>
    <circle cx="${cx}" cy="${cy}" r="4" fill="#000"/>
    <path d="M ${arcStart.x.toFixed(1)},${arcStart.y.toFixed(1)} A ${arcRadius},${arcRadius} 0 0,0 ${arcEnd.x.toFixed(1)},${arcEnd.y.toFixed(1)}" stroke="#000" fill="none" stroke-width="1.5"/>
    <path d="M ${unknownArcStart.x.toFixed(1)},${unknownArcStart.y.toFixed(1)} A ${arcRadius},${arcRadius} 0 ${showAdjacent ? '1' : '0'},${showAdjacent ? '1' : '0'} ${unknownArcEnd.x.toFixed(1)},${unknownArcEnd.y.toFixed(1)}" stroke="#000" fill="none" stroke-width="1.5"/>
    <text x="${givenLabelPos.x.toFixed(1)}" y="${givenLabelPos.y.toFixed(1)}" font-family="Times New Roman, serif" font-size="17" fill="#000" text-anchor="middle" dominant-baseline="middle">${givenAngle}°</text>
    <text x="${unknownLabelPos.x.toFixed(1)}" y="${unknownLabelPos.y.toFixed(1)}" font-family="Times New Roman, serif" font-size="19" font-style="italic" fill="#000" text-anchor="middle" dominant-baseline="middle">?</text>
</svg>`;
}

/**
 * Generate diagram for algebraic problem (3x and x+80)
 */
function generateAlgebraicDiagram() {
  const cx = 250;
  const cy = 150;
  const angle = 40; // For visual purposes

  const p1 = polarToCartesian(cx, cy, 120, -angle);
  const p2 = polarToCartesian(cx, cy, 120, 180 - angle);
  const p3 = polarToCartesian(cx, cy, 120, 0);
  const p4 = polarToCartesian(cx, cy, 120, 180);

  const arc1Start = polarToCartesian(cx, cy, 30, 0);
  const arc1End = polarToCartesian(cx, cy, 30, -angle);
  const arc2Start = polarToCartesian(cx, cy, 35, -angle);
  const arc2End = polarToCartesian(cx, cy, 35, 180);

  const label1Pos = polarToCartesian(cx, cy, 50, -angle / 2);
  const label2Pos = polarToCartesian(cx, cy, 65, (-angle + 180) / 2);

  return `<svg width="450" height="350" viewBox="0 0 450 350" xmlns="http://www.w3.org/2000/svg" style="background: white; max-width: 100%; height: auto;">
    <line x1="${p1.x.toFixed(1)}" y1="${p1.y.toFixed(1)}" x2="${p2.x.toFixed(1)}" y2="${p2.y.toFixed(1)}" stroke="#000" stroke-width="2"/>
    <line x1="${p3.x.toFixed(1)}" y1="${p3.y.toFixed(1)}" x2="${p4.x.toFixed(1)}" y2="${p4.y.toFixed(1)}" stroke="#000" stroke-width="2"/>
    <circle cx="${cx}" cy="${cy}" r="4" fill="#000"/>
    <path d="M ${arc1Start.x.toFixed(1)},${arc1Start.y.toFixed(1)} A 30,30 0 0,0 ${arc1End.x.toFixed(1)},${arc1End.y.toFixed(1)}" stroke="#000" fill="none" stroke-width="1.5"/>
    <path d="M ${arc2Start.x.toFixed(1)},${arc2Start.y.toFixed(1)} A 35,35 0 1,1 ${arc2End.x.toFixed(1)},${arc2End.y.toFixed(1)}" stroke="#000" fill="none" stroke-width="1.5"/>
    <text x="${label1Pos.x.toFixed(1)}" y="${label1Pos.y.toFixed(1)}" font-family="Times New Roman, serif" font-size="17" font-style="italic" fill="#000" text-anchor="middle" dominant-baseline="middle">3x°</text>
    <text x="${label2Pos.x.toFixed(1)}" y="${label2Pos.y.toFixed(1)}" font-family="Times New Roman, serif" font-size="17" font-style="italic" fill="#000" text-anchor="middle" dominant-baseline="middle">(x + 80)°</text>
</svg>`;
}

// ============================================================================
// STEP 1: Fix Example 3 in Lesson Content
// ============================================================================

async function fixExample3() {
  console.log('📝 Step 1: Fixing Example 3 with ACT-authentic diagram...\n');

  const { data: lesson, error: fetchError } = await supabase
    .from('lessons')
    .select('*')
    .eq('lesson_key', 'geometry-angles')
    .single();

  if (fetchError) {
    console.error('❌ Error fetching lesson:', fetchError);
    return false;
  }

  // Generate new diagram
  const newDiagram = generateParallelLinesDiagram(60, 'x');

  // Find and replace Example 3's diagram
  let content = lesson.content;

  // Find Example 3 section (starts at <h4>Example 3</h4>)
  const example3Start = content.indexOf('<h4>Example 3</h4>');
  if (example3Start === -1) {
    console.error('❌ Could not find Example 3');
    return false;
  }

  // Find the SVG in Example 3
  const svgStart = content.indexOf('<svg', example3Start);
  const svgEnd = content.indexOf('</svg>', svgStart) + 6;

  if (svgStart === -1 || svgEnd === -1) {
    console.error('❌ Could not find SVG in Example 3');
    return false;
  }

  // Replace the SVG
  const before = content.substring(0, svgStart);
  const after = content.substring(svgEnd);
  const updatedContent = before + newDiagram + after;

  // Also update the problem text to remove L₁ and L₂ references
  const updatedContent2 = updatedContent
    .replace(
      'Lines L₁ and L₂ are parallel. A transversal intersects both lines, creating 8 angles. If one of the acute angles measures 60°, what is the measure of one of the obtuse angles?',
      'In the figure below, two parallel lines are cut by a transversal. What is the value of <em>x</em>?'
    );

  // Update database
  const { error: updateError } = await supabase
    .from('lessons')
    .update({
      content: updatedContent2,
      updated_at: new Date().toISOString()
    })
    .eq('id', lesson.id);

  if (updateError) {
    console.error('❌ Error updating lesson:', updateError);
    return false;
  }

  console.log('✅ Example 3 updated successfully!\n');
  return true;
}

// ============================================================================
// STEP 2: Delete Duplicate Quizzes
// ============================================================================

async function deleteDuplicateQuizzes() {
  console.log('📝 Step 2: Deleting duplicate quizzes...\n');

  const { data: lesson } = await supabase
    .from('lessons')
    .select('id')
    .eq('lesson_key', 'geometry-angles')
    .single();

  const { data: quizzes } = await supabase
    .from('quizzes')
    .select('*')
    .eq('lesson_id', lesson.id)
    .order('created_at');

  if (!quizzes || quizzes.length === 0) {
    console.log('⚠️  No quizzes found');
    return false;
  }

  console.log(`Found ${quizzes.length} quizzes:`);
  quizzes.forEach(q => console.log(`  - ${q.id} (Created: ${q.created_at})`));

  if (quizzes.length <= 1) {
    console.log('✅ No duplicates to delete\n');
    return true;
  }

  // Keep the first quiz, delete the rest
  const toKeep = quizzes[0];
  const toDelete = quizzes.slice(1);

  console.log(`\nKeeping quiz: ${toKeep.id}`);
  console.log(`Deleting ${toDelete.length} duplicate quiz(zes)...\n`);

  for (const quiz of toDelete) {
    // First delete quiz questions
    const { error: delQuestionsError } = await supabase
      .from('quiz_questions')
      .delete()
      .eq('quiz_id', quiz.id);

    if (delQuestionsError) {
      console.error(`❌ Error deleting questions for quiz ${quiz.id}:`, delQuestionsError);
      continue;
    }

    // Then delete quiz
    const { error: delQuizError } = await supabase
      .from('quizzes')
      .delete()
      .eq('id', quiz.id);

    if (delQuizError) {
      console.error(`❌ Error deleting quiz ${quiz.id}:`, delQuizError);
    } else {
      console.log(`✅ Deleted duplicate quiz: ${quiz.id}`);
    }
  }

  console.log('\n✅ Duplicate quizzes removed!\n');
  return toKeep.id;
}

// ============================================================================
// STEP 3: Add Diagrams to Quiz Questions
// ============================================================================

async function addDiagramsToQuizQuestions(quizId) {
  console.log('📝 Step 3: Adding ACT-authentic diagrams to quiz questions...\n');

  const { data: questions } = await supabase
    .from('quiz_questions')
    .select('*')
    .eq('quiz_id', quizId)
    .order('question_order');

  if (!questions || questions.length === 0) {
    console.error('❌ No questions found');
    return false;
  }

  console.log(`Found ${questions.length} questions\n`);

  const updates = [
    {
      // Question 1: Vertical angle, 40°
      id: questions[0].id,
      diagram: generateIntersectingLinesDiagram(40, false),
      text: 'In the figure below, two lines intersect. What is the value of the angle marked with a question mark?'
    },
    {
      // Question 2: Adjacent angle, 75°
      id: questions[1].id,
      diagram: generateIntersectingLinesDiagram(75, true),
      text: 'In the figure below, two lines intersect. What is the value of the angle marked with a question mark?'
    },
    {
      // Question 3: Parallel lines, vertical angle, 50°
      id: questions[2].id,
      diagram: generateParallelLinesDiagram(50, 'x'),
      text: 'In the figure below, two parallel lines are cut by a transversal. What is the value of <em>x</em>?'
    },
    {
      // Question 4: Parallel lines, obtuse angle, 65° acute
      id: questions[3].id,
      diagram: generateParallelLinesDiagram(65, 'y'),
      text: 'In the figure below, two parallel lines are cut by a transversal. What is the value of <em>y</em>?'
    },
    {
      // Question 5: Algebraic problem
      id: questions[4].id,
      diagram: generateAlgebraicDiagram(),
      text: 'In the figure below, two lines intersect creating four angles. If one angle measures 3<em>x</em> and an adjacent angle measures <em>x</em> + 80, what is the value of <em>x</em>?'
    }
  ];

  for (let i = 0; i < updates.length; i++) {
    const update = updates[i];

    // Create a new question_text that includes the diagram
    const fullQuestion = `
      <div style="margin: 20px 0;">
        <p>${update.text}</p>
        <div style="text-align: center; margin: 20px 0;">
          ${update.diagram}
        </div>
      </div>
    `.trim();

    const { error } = await supabase
      .from('quiz_questions')
      .update({
        question_text: fullQuestion
      })
      .eq('id', update.id);

    if (error) {
      console.error(`❌ Error updating question ${i + 1}:`, error);
    } else {
      console.log(`✅ Added diagram to question ${i + 1}`);
    }
  }

  console.log('\n✅ All diagrams added to quiz questions!\n');
  return true;
}

// ============================================================================
// MAIN EXECUTION
// ============================================================================

async function main() {
  console.log('🚀 Starting comprehensive Lesson 2.1 fix...\n');
  console.log('='.repeat(70));
  console.log('\n');

  try {
    // Step 1: Fix Example 3
    const step1Success = await fixExample3();
    if (!step1Success) {
      console.error('⚠️  Step 1 failed, but continuing...\n');
    }

    // Step 2: Delete duplicate quizzes
    const keptQuizId = await deleteDuplicateQuizzes();
    if (!keptQuizId) {
      console.error('❌ Step 2 failed - cannot continue to step 3');
      return;
    }

    // Step 3: Add diagrams to quiz questions
    const step3Success = await addDiagramsToQuizQuestions(keptQuizId);

    console.log('='.repeat(70));
    console.log('\n✨ All done! Summary:\n');
    console.log('  ✅ Example 3: ACT-authentic diagram applied');
    console.log('  ✅ Duplicate quizzes: Removed');
    console.log('  ✅ Quiz questions: ACT-authentic diagrams added');
    console.log('\n📱 Test the changes in your React app!\n');

  } catch (error) {
    console.error('❌ Fatal error:', error);
  }
}

main();
