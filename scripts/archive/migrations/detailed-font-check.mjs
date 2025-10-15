/**
 * Detailed Font Check - Find exact locations of all font sizes
 */

import { createClient } from '@supabase/supabase-js';
import dotenv from 'dotenv';

dotenv.config();

const supabase = createClient(
  process.env.REACT_APP_SUPABASE_URL,
  process.env.SUPABASE_SERVICE_ROLE_KEY
);

async function detailedCheck() {
  console.log('🔍 Detailed font analysis...\n');
  console.log('='.repeat(70));
  console.log('\n');

  const { data: lesson } = await supabase
    .from('lessons')
    .select('*')
    .eq('lesson_key', 'geometry-angles')
    .single();

  const content = lesson.content;

  // Find all 1rem instances with context
  console.log('📊 Looking for 1rem font sizes:\n');

  const lines = content.split('\n');
  lines.forEach((line, i) => {
    if (line.includes('font-size: 1rem')) {
      console.log(`Line ${i}: ${line.substring(0, 100)}...`);
    }
  });

  // Check for unstyled paragraphs
  console.log('\n📝 Checking for unstyled paragraphs:\n');

  const unstyledP = content.match(/<p>(?!<\/p>)[^<]*(?:(?!<p).)*/g) || [];
  console.log(`Found ${unstyledP.length} potentially unstyled <p> tags`);

  if (unstyledP.length > 0) {
    console.log('\nSample unstyled paragraphs:');
    unstyledP.slice(0, 3).forEach((p, i) => {
      console.log(`  ${i + 1}. ${p.substring(0, 80)}...`);
    });
  }

  // Check quiz questions in detail
  console.log('\n📋 Checking quiz questions in detail:\n');

  const { data: quizzes } = await supabase
    .from('quizzes')
    .select('*')
    .eq('lesson_id', lesson.id);

  if (quizzes && quizzes.length > 0) {
    console.log(`Found quiz: ${quizzes[0].title}`);

    const { data: questions } = await supabase
      .from('quiz_questions')
      .select('*')
      .eq('quiz_id', quizzes[0].id)
      .order('question_order');

    console.log(`Found ${questions.length} questions\n`);

    questions.forEach((q, i) => {
      const text = q.question_text;

      // Check for font-size
      const hasFontSize = text.includes('font-size:');
      const has09 = text.includes('font-size: 0.9rem');
      const hasLineHeight = text.includes('line-height: 1.5');

      console.log(`Question ${i + 1}:`);
      console.log(`  - Has font-size: ${hasFontSize ? '✅' : '❌'}`);
      console.log(`  - Has 0.9rem: ${has09 ? '✅' : '❌'}`);
      console.log(`  - Has 1.5 line-height: ${hasLineHeight ? '✅' : '❌'}`);

      // Show first 100 chars
      console.log(`  - Preview: ${text.substring(0, 100)}...\n`);
    });
  }

  console.log('='.repeat(70));
  console.log('\n');
}

detailedCheck();
