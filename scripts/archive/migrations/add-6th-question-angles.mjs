/**
 * FIX: Add 6th question to geometry-angles quiz
 * Topic: Supplementary angles
 */

import { createClient } from '@supabase/supabase-js';
import dotenv from 'dotenv';

dotenv.config();

const supabase = createClient(
  process.env.REACT_APP_SUPABASE_URL,
  process.env.SUPABASE_SERVICE_ROLE_KEY
);

function generateQ6() {
  return {
    text: `<div style="margin: 0.3rem 0;">
  <p style="font-size: 0.9rem; margin: 0.3rem 0; line-height: 1.5;">Two angles are supplementary, and one angle measures 115°. What is the measure of the other angle?</p>
</div>`,
    options: [
      { text: '25°', isCorrect: false, explanation: 'Not quite. Complementary angles add to 90°, but supplementary angles add to 180°. Try 180° − 115° = 65°.' },
      { text: '65°', isCorrect: true, explanation: 'Correct! Supplementary angles add to 180°. So 180° − 115° = 65° ✓' },
      { text: '75°', isCorrect: false, explanation: 'Not quite. Supplementary angles add to 180°, not 190°. Calculate: 180° − 115° = 65°.' },
      { text: '85°', isCorrect: false, explanation: 'Not quite. Supplementary means the angles add to 180°. So 180° − 115° = 65°.' },
      { text: '115°', isCorrect: false, explanation: 'Not quite. The other angle must be different. Supplementary angles add to 180°, so 180° − 115° = 65°.' }
    ]
  };
}

async function addSixthQuestion() {
  console.log('╔══════════════════════════════════════════════════════════╗');
  console.log('║    FIX: Adding 6th question to geometry-angles quiz     ║');
  console.log('╚══════════════════════════════════════════════════════════╝\n');

  // Get lesson ID
  const { data: lesson } = await supabase
    .from('lessons')
    .select('id')
    .eq('lesson_key', 'geometry-angles')
    .single();

  console.log('✓ Found lesson:', lesson.id);

  // Get quiz
  const { data: quizzes } = await supabase
    .from('quizzes')
    .select('id')
    .eq('lesson_id', lesson.id);

  const quiz = quizzes[0];
  console.log('✓ Found quiz:', quiz.id);

  // Check current question count
  const { data: currentQuestions } = await supabase
    .from('quiz_questions')
    .select('id, question_order')
    .eq('quiz_id', quiz.id)
    .order('question_order');

  console.log(`✓ Current questions: ${currentQuestions.length}`);
  console.log('');

  const q6 = generateQ6();

  // Insert question 6
  console.log('📝 Adding Question 6: Supplementary Angles...');

  const { data: questionData, error: qError } = await supabase
    .from('quiz_questions')
    .insert({
      quiz_id: quiz.id,
      question_text: q6.text,
      question_order: 6
    })
    .select()
    .single();

  if (qError) {
    console.error('❌ Error creating question:', qError);
    return false;
  }

  console.log('   ✓ Question created:', questionData.id);

  // Insert options
  for (let j = 0; j < q6.options.length; j++) {
    const opt = q6.options[j];
    const { error: optError } = await supabase
      .from('quiz_options')
      .insert({
        question_id: questionData.id,
        option_text: opt.text,
        is_correct: opt.isCorrect,
        explanation: opt.explanation,
        option_order: j
      });

    if (optError) {
      console.error(`❌ Error creating option ${j + 1}:`, optError);
    }
  }

  console.log(`   ✓ Added ${q6.options.length} options\n`);

  // Verify
  const { data: updatedQuestions } = await supabase
    .from('quiz_questions')
    .select('id')
    .eq('quiz_id', quiz.id);

  console.log('✅ SUCCESS!');
  console.log(`   Total questions now: ${updatedQuestions.length}\n`);

  return true;
}

addSixthQuestion().catch(err => {
  console.error('❌ Fatal error:', err);
  process.exit(1);
});
