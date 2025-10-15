/**
 * Verify Font Consistency - Double check everything is 0.9rem
 */

import { createClient } from '@supabase/supabase-js';
import dotenv from 'dotenv';

dotenv.config();

const supabase = createClient(
  process.env.REACT_APP_SUPABASE_URL,
  process.env.SUPABASE_SERVICE_ROLE_KEY
);

async function verifyFonts() {
  console.log('🔍 Verifying font consistency...\n');
  console.log('='.repeat(70));
  console.log('\n');

  // Get lesson content
  const { data: lesson } = await supabase
    .from('lessons')
    .select('content')
    .eq('lesson_key', 'geometry-angles')
    .single();

  const content = lesson.content;

  console.log('📊 Analyzing lesson content fonts:\n');

  // Check for any non-standard font sizes
  const fontSizeRegex = /font-size:\s*([0-9.]+rem)/g;
  const allFonts = [...content.matchAll(fontSizeRegex)];

  const fontSizes = {};
  allFonts.forEach(match => {
    const size = match[1];
    fontSizes[size] = (fontSizes[size] || 0) + 1;
  });

  console.log('Font sizes found:');
  Object.entries(fontSizes).sort().forEach(([size, count]) => {
    const isStandard = size === '0.9rem' || size === '1.15rem' || size === '1.1rem';
    const icon = isStandard ? '✅' : '⚠️';
    console.log(`  ${icon} ${size}: ${count} instances`);
  });

  console.log('\n📋 Checking specific elements:\n');

  // Check paragraphs
  const paragraphs09 = (content.match(/font-size: 0\.9rem/g) || []).length;
  console.log(`  ✅ Paragraphs with 0.9rem: ${paragraphs09}`);

  // Check for old sizes
  const old085 = (content.match(/font-size: 0\.85rem/g) || []).length;
  const old088 = (content.match(/font-size: 0\.88rem/g) || []).length;
  const old095 = (content.match(/font-size: 0\.95rem/g) || []).length;

  if (old085 > 0) console.log(`  ⚠️  Found 0.85rem: ${old085} instances`);
  if (old088 > 0) console.log(`  ⚠️  Found 0.88rem: ${old088} instances`);
  if (old095 > 0) console.log(`  ⚠️  Found 0.95rem: ${old095} instances`);

  if (old085 === 0 && old088 === 0 && old095 === 0) {
    console.log('  ✅ No old irregular font sizes found!');
  }

  // Check line heights
  console.log('\n📏 Line heights:');
  const lineHeight15 = (content.match(/line-height: 1\.5/g) || []).length;
  const lineHeight14 = (content.match(/line-height: 1\.4/g) || []).length;
  console.log(`  - 1.5: ${lineHeight15} instances`);
  console.log(`  - 1.4: ${lineHeight14} instances`);

  // Check quiz questions
  console.log('\n📝 Checking quiz questions:\n');

  const { data: quizzes } = await supabase
    .from('quizzes')
    .select('id')
    .eq('lesson_id', lesson.id);

  if (quizzes && quizzes.length > 0) {
    const { data: questions } = await supabase
      .from('quiz_questions')
      .select('question_text')
      .eq('quiz_id', quizzes[0].id)
      .order('question_order');

    questions.forEach((q, i) => {
      const has09 = q.question_text.includes('font-size: 0.9rem');
      const has15 = q.question_text.includes('line-height: 1.5');
      console.log(`  Question ${i + 1}: ${has09 ? '✅' : '⚠️'} 0.9rem, ${has15 ? '✅' : '⚠️'} 1.5 line-height`);
    });
  }

  console.log('\n' + '='.repeat(70));
  console.log('\n✨ Verification complete!\n');

  return true;
}

verifyFonts();
