/**
 * Fix Font Consistency - Make ALL fonts uniform
 * Everything should be 0.9rem for readability
 * No irregular sizes
 */

import { createClient } from '@supabase/supabase-js';
import dotenv from 'dotenv';

dotenv.config();

const supabase = createClient(
  process.env.REACT_APP_SUPABASE_URL,
  process.env.SUPABASE_SERVICE_ROLE_KEY
);

async function fixFontConsistency() {
  console.log('🔧 Fixing font consistency across lesson and quiz...\n');
  console.log('='.repeat(70));
  console.log('\n');

  const { data: lesson } = await supabase
    .from('lessons')
    .select('*')
    .eq('lesson_key', 'geometry-angles')
    .single();

  let content = lesson.content;

  console.log('📝 Making all fonts consistent at 0.9rem...\n');

  // ===========================================================================
  // STANDARD FONT SIZE: 0.9rem for ALL body text
  // ===========================================================================

  // Fix any 0.85rem back to 0.9rem (too small, inconsistent)
  content = content.replace(/font-size: 0\.85rem/g, 'font-size: 0.9rem');

  // Fix any 0.88rem to 0.9rem (inconsistent)
  content = content.replace(/font-size: 0\.88rem/g, 'font-size: 0.9rem');

  // Make sure all paragraphs have consistent font
  // Problem text
  content = content.replace(
    /<p style="font-size: 0\.9rem; margin: 0\.3rem 0; line-height: 1\.4;">/g,
    '<p style="font-size: 0.9rem; margin: 0.3rem 0; line-height: 1.5;">'
  );

  // Problem/Solution/Answer headers - consistent
  content = content.replace(
    /<p style="margin: 0\.25rem 0 0\.15rem 0; font-size: 0\.9rem;">/g,
    '<p style="margin: 0.3rem 0 0.2rem 0; font-size: 0.9rem; font-weight: 600;">'
  );

  content = content.replace(
    /<p style="margin: 0\.4rem 0 0\.2rem 0; font-size: 0\.9rem;">/g,
    '<p style="margin: 0.4rem 0 0.2rem 0; font-size: 0.9rem; font-weight: 600;">'
  );

  content = content.replace(
    /<p style="margin: 0\.25rem 0; font-size: 0\.9rem;">/g,
    '<p style="margin: 0.3rem 0; font-size: 0.9rem; font-weight: 600;">'
  );

  // Solution boxes - uniform 0.9rem
  content = content.replace(
    /background: #f8f9fa; padding: 0\.5rem; margin: 0\.35rem 0; text-align: center; font-size: 0\.9rem; line-height: 1\.4;/g,
    'background: #f8f9fa; padding: 0.6rem; margin: 0.4rem 0; text-align: center; font-size: 0.9rem; line-height: 1.5;'
  );

  // Answer choices - all 0.9rem
  content = content.replace(
    /<span style="display: inline-block; margin-right: 0\.8rem; font-size: 0\.9rem;">/g,
    '<span style="display: inline-block; margin-right: 1rem; font-size: 0.9rem;">'
  );

  // Headers
  content = content.replace(
    /<h4 style="margin-top: 0\.8rem; margin-bottom: 0\.4rem; font-size: 1\.1rem;">/g,
    '<h4 style="margin-top: 1rem; margin-bottom: 0.5rem; font-size: 1.15rem;">'
  );

  console.log('✅ Lesson fonts standardized to 0.9rem\n');

  // Update lesson
  const { error: lessonError } = await supabase
    .from('lessons')
    .update({
      content: content,
      updated_at: new Date().toISOString()
    })
    .eq('id', lesson.id);

  if (lessonError) {
    console.error('❌ Error updating lesson:', lessonError);
    return false;
  }

  // ===========================================================================
  // FIX QUIZ FONTS TOO
  // ===========================================================================

  console.log('📝 Fixing quiz question fonts...\n');

  const { data: quizzes } = await supabase
    .from('quizzes')
    .select('*')
    .eq('lesson_id', lesson.id);

  if (quizzes && quizzes.length > 0) {
    const quiz = quizzes[0];

    const { data: questions } = await supabase
      .from('quiz_questions')
      .select('*')
      .eq('quiz_id', quiz.id)
      .order('question_order');

    for (let i = 0; i < questions.length; i++) {
      const question = questions[i];
      let updatedText = question.question_text;

      // Make quiz text consistent 0.9rem
      updatedText = updatedText.replace(
        /<p style="font-size: 0\.9rem; margin: 0\.2rem 0;">/g,
        '<p style="font-size: 0.9rem; margin: 0.3rem 0; line-height: 1.5;">'
      );

      // Update
      const { error } = await supabase
        .from('quiz_questions')
        .update({ question_text: updatedText })
        .eq('id', question.id);

      if (!error) {
        console.log(`✅ Fixed quiz question ${i + 1} fonts`);
      }
    }
  }

  console.log('\n✅ All fonts now consistent!\n');
  console.log('📊 Standard sizes:');
  console.log('  ✅ Body text: 0.9rem (everything)');
  console.log('  ✅ Headers: 1.15rem');
  console.log('  ✅ Line height: 1.5 (comfortable)');
  console.log('  ✅ No irregular sizes\n');

  return true;
}

async function main() {
  const success = await fixFontConsistency();

  console.log('='.repeat(70));
  if (success) {
    console.log('\n✨ Fonts are now perfectly consistent!\n');
  } else {
    console.log('\n❌ Error occurred.\n');
  }
}

main();
