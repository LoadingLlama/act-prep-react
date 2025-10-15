/**
 * Comprehensive Font Audit - Check EVERYTHING
 * Leave no stone unturned
 */

import { createClient } from '@supabase/supabase-js';
import dotenv from 'dotenv';

dotenv.config();

const supabase = createClient(
  process.env.REACT_APP_SUPABASE_URL,
  process.env.SUPABASE_SERVICE_ROLE_KEY
);

async function comprehensiveAudit() {
  console.log('🔍 COMPREHENSIVE FONT AUDIT\n');
  console.log('='.repeat(70));
  console.log('\n');

  // Get lesson
  const { data: lesson } = await supabase
    .from('lessons')
    .select('*')
    .eq('lesson_key', 'geometry-angles')
    .single();

  const content = lesson.content;

  console.log('📊 LESSON CONTENT ANALYSIS\n');

  // Extract ALL font-size declarations with context
  const fontSizeRegex = /font-size:\s*([0-9.]+(?:rem|px|em))/gi;
  const matches = [...content.matchAll(fontSizeRegex)];

  console.log(`Total font-size declarations: ${matches.length}\n`);

  // Group by size
  const fontGroups = {};
  matches.forEach(match => {
    const size = match[1];
    if (!fontGroups[size]) fontGroups[size] = [];

    // Find context around the match
    const index = match.index;
    const contextStart = Math.max(0, index - 50);
    const contextEnd = Math.min(content.length, index + 100);
    const context = content.substring(contextStart, contextEnd).replace(/\n/g, ' ');

    fontGroups[size].push(context);
  });

  // Display by font size
  console.log('Font sizes breakdown:\n');
  Object.keys(fontGroups).sort().forEach(size => {
    const count = fontGroups[size].length;
    const isStandard = size === '0.9rem' || size === '1.15rem';
    const icon = isStandard ? '✅' : '⚠️ WARNING';

    console.log(`${icon} ${size}: ${count} occurrences`);

    // Show first 2 examples for non-standard sizes
    if (!isStandard && fontGroups[size].length > 0) {
      console.log('  Examples:');
      fontGroups[size].slice(0, 2).forEach((ctx, i) => {
        console.log(`    ${i + 1}. ...${ctx}...`);
      });
    }
  });

  // Check for unstyled elements
  console.log('\n📝 CHECKING FOR UNSTYLED ELEMENTS\n');

  // Plain <p> tags without style attribute
  const unstyledPRegex = /<p>(?!.*style=)/g;
  const unstyledPs = [...content.matchAll(unstyledPRegex)];
  console.log(`Plain <p> tags (no style): ${unstyledPs.length}`);

  if (unstyledPs.length > 0) {
    console.log('⚠️  WARNING: Found unstyled paragraphs:');
    unstyledPs.slice(0, 3).forEach((match, i) => {
      const idx = match.index;
      const context = content.substring(idx, idx + 100);
      console.log(`  ${i + 1}. ${context}...`);
    });
  } else {
    console.log('✅ All paragraphs have style attributes');
  }

  // Plain <span> tags without style
  const unstyledSpanRegex = /<span>(?!.*style=)/g;
  const unstyledSpans = [...content.matchAll(unstyledSpanRegex)];
  console.log(`\nPlain <span> tags (no style): ${unstyledSpans.length}`);

  if (unstyledSpans.length > 0) {
    console.log('⚠️  WARNING: Found unstyled spans');
  } else {
    console.log('✅ All spans have style attributes');
  }

  // Plain <div> tags - these are OK, just informational
  const divs = (content.match(/<div/g) || []).length;
  console.log(`\nTotal <div> tags: ${divs}`);

  // Check line-height consistency
  console.log('\n📏 LINE HEIGHT ANALYSIS\n');

  const lineHeightRegex = /line-height:\s*([0-9.]+)/g;
  const lineHeights = [...content.matchAll(lineHeightRegex)];

  const lineHeightGroups = {};
  lineHeights.forEach(match => {
    const lh = match[1];
    lineHeightGroups[lh] = (lineHeightGroups[lh] || 0) + 1;
  });

  console.log('Line heights found:');
  Object.keys(lineHeightGroups).sort().forEach(lh => {
    const isStandard = lh === '1.5';
    const icon = isStandard ? '✅' : '⚠️';
    console.log(`  ${icon} ${lh}: ${lineHeightGroups[lh]} occurrences`);
  });

  // Now check quiz questions
  console.log('\n' + '='.repeat(70));
  console.log('\n📋 QUIZ QUESTIONS ANALYSIS\n');

  const { data: quizzes } = await supabase
    .from('quizzes')
    .select('*')
    .eq('lesson_id', lesson.id);

  if (!quizzes || quizzes.length === 0) {
    console.log('❌ No quiz found!');
    return;
  }

  console.log(`Quiz: "${quizzes[0].title}"\n`);

  const { data: questions } = await supabase
    .from('quiz_questions')
    .select('*')
    .eq('quiz_id', quizzes[0].id)
    .order('question_order');

  console.log(`Total questions: ${questions.length}\n`);

  let allQuizConsistent = true;

  questions.forEach((q, i) => {
    const text = q.question_text;

    console.log(`Question ${i + 1}:`);

    // Extract all font sizes
    const qFonts = [...text.matchAll(fontSizeRegex)];
    const qFontSizes = new Set(qFonts.map(m => m[1]));

    console.log(`  Font sizes: ${[...qFontSizes].join(', ') || 'NONE SPECIFIED'}`);

    // Check for 0.9rem
    const has09 = text.includes('font-size: 0.9rem');
    console.log(`  Has 0.9rem: ${has09 ? '✅' : '❌'}`);

    // Check line height
    const hasLH15 = text.includes('line-height: 1.5');
    console.log(`  Has line-height 1.5: ${hasLH15 ? '✅' : '❌'}`);

    // Check for any non-0.9rem sizes
    const hasOtherSizes = [...qFontSizes].some(s => s !== '0.9rem');
    if (hasOtherSizes) {
      console.log(`  ⚠️  WARNING: Has non-standard font sizes!`);
      allQuizConsistent = false;
    }

    // Show beginning of question
    const preview = text.substring(0, 150).replace(/\n/g, ' ');
    console.log(`  Preview: ${preview}...\n`);
  });

  console.log('='.repeat(70));
  console.log('\n📊 FINAL SUMMARY\n');

  const lessonStandardSizes = Object.keys(fontGroups).filter(s => s === '0.9rem' || s === '1.15rem');
  const lessonNonStandardSizes = Object.keys(fontGroups).filter(s => s !== '0.9rem' && s !== '1.15rem');

  console.log('Lesson Content:');
  console.log(`  ✅ Standard sizes (0.9rem, 1.15rem): ${lessonStandardSizes.length} types`);
  if (lessonNonStandardSizes.length > 0) {
    console.log(`  ⚠️  Non-standard sizes: ${lessonNonStandardSizes.join(', ')}`);
  } else {
    console.log(`  ✅ No non-standard sizes found`);
  }

  console.log(`\nQuiz Questions:`);
  console.log(`  ${allQuizConsistent ? '✅' : '❌'} All questions consistent`);

  console.log(`\n${lessonNonStandardSizes.length === 0 && allQuizConsistent ? '✅ PERFECT CONSISTENCY ACHIEVED!' : '⚠️  ISSUES FOUND - SEE ABOVE'}\n`);
  console.log('='.repeat(70));
}

comprehensiveAudit();
