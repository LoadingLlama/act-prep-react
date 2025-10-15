/**
 * Fix Quiz Question 2 - Adjacent angles arc issue
 */

import { createClient } from '@supabase/supabase-js';
import dotenv from 'dotenv';

dotenv.config();

const supabase = createClient(
  process.env.REACT_APP_SUPABASE_URL,
  process.env.SUPABASE_SERVICE_ROLE_KEY
);

function polarToCartesian(cx, cy, radius, angleInDegrees) {
  const radians = angleInDegrees * (Math.PI / 180);
  return {
    x: cx + radius * Math.cos(radians),
    y: cy + radius * Math.sin(radians)
  };
}

function generateFixedAdjacentAnglesDiagram(givenAngle) {
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

async function fixQuizQuestion2() {
  console.log('🔧 Fixing Quiz Question 2 arc issue...\n');

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

  if (!questions || questions.length < 2) {
    console.error('❌ Question 2 not found');
    return false;
  }

  // Question 2 is at index 1 (0-indexed)
  const question2 = questions[1];

  const newDiagram = generateFixedAdjacentAnglesDiagram(75);

  const fullQuestion = `<div style="margin: 0.5rem 0;">
  <p>In the figure below, two lines intersect. What is the value of the angle marked with a question mark?</p>
  <div style="text-align: center; margin: 0.5rem 0;">
    ${newDiagram}
  </div>
</div>`.trim();

  const { error } = await supabase
    .from('quiz_questions')
    .update({ question_text: fullQuestion })
    .eq('id', question2.id);

  if (error) {
    console.error('❌ Error updating quiz question 2:', error);
    return false;
  }

  console.log('✅ Quiz Question 2 fixed!\n');
  console.log('📊 Changes:');
  console.log('  ✅ Fixed arc display - only ONE arc per angle');
  console.log('  ✅ Given angle (75°): single arc on right');
  console.log('  ✅ Unknown angle (?): single arc on left\n');

  return true;
}

async function main() {
  console.log('🚀 Fixing Quiz Question 2...\n');
  console.log('='.repeat(70));
  console.log('\n');

  const success = await fixQuizQuestion2();

  console.log('='.repeat(70));
  if (success) {
    console.log('\n✨ Quiz Question 2 fixed!\n');
  } else {
    console.log('\n❌ Error occurred. Check logs above.\n');
  }
}

main();
