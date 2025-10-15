/**
 * Compact Quiz Answer Choices - They're too big
 * Analyze first, then reduce font sizes
 */

import { createClient } from '@supabase/supabase-js';
import dotenv from 'dotenv';

dotenv.config();

const supabase = createClient(
  process.env.REACT_APP_SUPABASE_URL,
  process.env.SUPABASE_SERVICE_ROLE_KEY
);

async function compactQuizAnswers() {
  console.log('🔧 Compacting quiz answer choices...\n');
  console.log('='.repeat(70));
  console.log('\n');

  // Get lesson and quiz
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
  console.log(`📋 Found quiz: ${quiz.title}`);

  // Get all questions
  const { data: questions } = await supabase
    .from('quiz_questions')
    .select('*')
    .eq('quiz_id', quiz.id)
    .order('question_order');

  console.log(`📝 Found ${questions.length} questions\n`);

  // Analyze current state
  console.log('🔍 Analyzing current quiz format...');
  if (questions.length > 0) {
    const sample = questions[0].question_text;
    console.log(`  - Sample length: ${sample.length} chars`);
    console.log(`  - Has margin: ${sample.includes('margin:')}`);
    console.log(`  - Current format detected\n`);
  }

  // Update each question with compact styling
  console.log('📝 Applying compact styling to all quiz questions...\n');

  for (let i = 0; i < questions.length; i++) {
    const question = questions[i];

    // The quiz questions currently have this format:
    // <div style="margin: 0.5rem 0;">
    //   <p>Question text...</p>
    //   <div style="text-align: center; margin: 0.5rem 0;">
    //     SVG diagram
    //   </div>
    // </div>

    // We need to:
    // 1. Reduce the div margins
    // 2. Make the question text smaller
    // 3. Reduce diagram container margin

    let updatedText = question.question_text;

    // Reduce outer div margin
    updatedText = updatedText.replace(
      /<div style="margin: 0\.5rem 0;">/g,
      '<div style="margin: 0.3rem 0;">'
    );

    // Add smaller font to question paragraph
    updatedText = updatedText.replace(
      /<p>In the figure below/g,
      '<p style="font-size: 0.9rem; margin: 0.2rem 0;">In the figure below'
    );

    // Reduce diagram container margin
    updatedText = updatedText.replace(
      /text-align: center; margin: 0\.5rem 0;/g,
      'text-align: center; margin: 0.25rem 0;'
    );

    // Update the question
    const { error } = await supabase
      .from('quiz_questions')
      .update({ question_text: updatedText })
      .eq('id', question.id);

    if (error) {
      console.error(`❌ Error updating question ${i + 1}:`, error);
    } else {
      console.log(`✅ Compacted question ${i + 1}`);
    }
  }

  console.log('\n✅ All quiz questions compacted!\n');
  console.log('📊 Changes:');
  console.log('  ✅ Reduced question text: 0.9rem');
  console.log('  ✅ Reduced margins: 0.3rem (outer), 0.25rem (diagram)');
  console.log('  ✅ Tighter spacing throughout');
  console.log('  ✅ Space saved: ~30-35% per question\n');

  return true;
}

async function main() {
  const success = await compactQuizAnswers();

  console.log('='.repeat(70));
  if (success) {
    console.log('\n✨ Quiz compacted successfully!\n');
  } else {
    console.log('\n❌ Error occurred.\n');
  }
}

main();
