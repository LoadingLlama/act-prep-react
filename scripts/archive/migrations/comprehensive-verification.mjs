/**
 * Comprehensive Verification - Check ALL aspects
 */

import { createClient } from '@supabase/supabase-js';
import dotenv from 'dotenv';

dotenv.config();

const supabase = createClient(
  process.env.REACT_APP_SUPABASE_URL,
  process.env.SUPABASE_SERVICE_ROLE_KEY
);

async function comprehensiveVerification() {
  console.log('🔍 COMPREHENSIVE VERIFICATION\n');
  console.log('='.repeat(70));
  console.log('\n');

  const { data: lesson } = await supabase
    .from('lessons')
    .select('*')
    .eq('lesson_key', 'geometry-angles')
    .single();

  const content = lesson.content;

  console.log('📋 LESSON 2.1: Understanding Angles & Lines\n');
  console.log('='.repeat(70));
  console.log('\n');

  // ====================================================================
  // CHECK 1: All 3 Examples
  // ====================================================================
  console.log('✅ CHECK 1: EXAMPLES\n');

  for (let i = 1; i <= 3; i++) {
    const exRegex = new RegExp(`<h4[^>]*>Example ${i}<\\/h4>([\\s\\S]*?)(?=<h4|$)`);
    const exMatch = content.match(exRegex);

    if (!exMatch) {
      console.log(`❌ Example ${i}: NOT FOUND\n`);
      continue;
    }

    const exContent = exMatch[1];
    console.log(`📝 Example ${i}:`);

    // Check for SVG diagram
    const hasSVG = exContent.includes('<svg');
    const svgMatch = exContent.match(/<svg[^>]*width="(\d+)"[^>]*height="(\d+)"/);
    const dimensions = svgMatch ? `${svgMatch[1]}x${svgMatch[2]}` : 'unknown';
    console.log(`  Diagram: ${hasSVG ? '✅ Present (' + dimensions + ')' : '❌ MISSING'}`);

    // Check for Problem section
    const hasProblem = exContent.includes('<strong>Problem:</strong>');
    console.log(`  Problem section: ${hasProblem ? '✅' : '❌'}`);

    // Check problem text paragraph
    const problemTextMatch = exContent.match(/<p style="font-size: 0\.9rem[^"]*"[^>]*>([^<]+)</);
    if (problemTextMatch) {
      const problemPreview = problemTextMatch[1].substring(0, 50);
      console.log(`  Problem text: ✅ "${problemPreview}..."`);
    } else {
      console.log(`  Problem text: ⚠️  Not found with expected styling`);
    }

    // Check answer choices - should all be in span tags
    const choiceMatches = exContent.match(/<span[^>]*>([A-E])\.\s*([^<]+)<\/span>/g) || [];
    console.log(`  Answer choices: ${choiceMatches.length === 5 ? '✅' : '⚠️'} Found ${choiceMatches.length}/5`);

    if (choiceMatches.length > 0) {
      choiceMatches.forEach((choice, idx) => {
        console.log(`    ${idx + 1}. ${choice.match(/>([^<]+)</)[1].substring(0, 30)}...`);
      });
    }

    // Check for Solution section
    const hasSolution = exContent.includes('<strong>Solution:</strong>');
    console.log(`  Solution section: ${hasSolution ? '✅' : '❌'}`);

    // Check for Answer
    const answerMatch = exContent.match(/<strong>Answer:\s*([A-E])<\/strong>/);
    console.log(`  Answer: ${answerMatch ? '✅ ' + answerMatch[1] : '❌ Not found'}`);

    console.log('');
  }

  // ====================================================================
  // CHECK 2: Font Consistency
  // ====================================================================
  console.log('='.repeat(70));
  console.log('\n✅ CHECK 2: FONT CONSISTENCY\n');

  const fontSizeRegex = /font-size:\s*([0-9.]+(?:rem|px))/gi;
  const matches = [...content.matchAll(fontSizeRegex)];

  const fontGroups = {};
  matches.forEach(match => {
    const size = match[1];
    fontGroups[size] = (fontGroups[size] || 0) + 1;
  });

  console.log('Font sizes in lesson content:');
  Object.keys(fontGroups).sort().forEach(size => {
    const count = fontGroups[size];
    const isStandard = ['0.9rem', '1.15rem', '14px'].includes(size);
    const icon = isStandard ? '✅' : '⚠️';
    console.log(`  ${icon} ${size}: ${count}x`);
  });

  // Check for irregular sizes
  const irregularSizes = Object.keys(fontGroups).filter(
    s => !['0.9rem', '1.15rem', '14px'].includes(s)
  );

  if (irregularSizes.length > 0) {
    console.log(`\n⚠️  Found ${irregularSizes.length} non-standard font sizes:`);
    irregularSizes.forEach(s => console.log(`    - ${s} (${fontGroups[s]}x)`));
  } else {
    console.log('\n✅ All fonts are standard sizes!');
  }

  // ====================================================================
  // CHECK 3: HTML Validation
  // ====================================================================
  console.log('\n' + '='.repeat(70));
  console.log('\n✅ CHECK 3: HTML VALIDATION\n');

  // Check for broken tags
  const openSpans = (content.match(/<span[^>]*>/g) || []).length;
  const closeSpans = (content.match(/<\/span>/g) || []).length;
  console.log(`<span> tags: ${openSpans} open, ${closeSpans} close ${openSpans === closeSpans ? '✅' : '❌ MISMATCH'}`);

  const openDivs = (content.match(/<div[^>]*>/g) || []).length;
  const closeDivs = (content.match(/<\/div>/g) || []).length;
  console.log(`<div> tags: ${openDivs} open, ${closeDivs} close ${openDivs === closeDivs ? '✅' : '❌ MISMATCH'}`);

  const openPs = (content.match(/<p[^>]*>/g) || []).length;
  const closePs = (content.match(/<\/p>/g) || []).length;
  console.log(`<p> tags: ${openPs} open, ${closePs} close ${openPs === closePs ? '✅' : '❌ MISMATCH'}`);

  const openSvgs = (content.match(/<svg[^>]*>/g) || []).length;
  const closeSvgs = (content.match(/<\/svg>/g) || []).length;
  console.log(`<svg> tags: ${openSvgs} open, ${closeSvgs} close ${openSvgs === closeSvgs ? '✅' : '❌ MISMATCH'}`);

  // Check for unstyled paragraphs
  const unstyledPs = (content.match(/<p>(?!<\/p>)/g) || []).length;
  console.log(`\nUnstyled <p> tags: ${unstyledPs === 0 ? '✅ None' : '⚠️ ' + unstyledPs + ' found'}`);

  // ====================================================================
  // CHECK 4: Quiz Questions
  // ====================================================================
  console.log('\n' + '='.repeat(70));
  console.log('\n✅ CHECK 4: QUIZ QUESTIONS\n');

  const { data: quizzes } = await supabase
    .from('quizzes')
    .select('*')
    .eq('lesson_id', lesson.id);

  if (!quizzes || quizzes.length === 0) {
    console.log('❌ No quiz found!\n');
  } else {
    console.log(`Quiz: "${quizzes[0].title}"\n`);

    const { data: questions } = await supabase
      .from('quiz_questions')
      .select('*')
      .eq('quiz_id', quizzes[0].id)
      .order('question_order');

    console.log(`Total questions: ${questions.length}\n`);

    let allGood = true;

    questions.forEach((q, i) => {
      const text = q.question_text;

      const has09 = text.includes('font-size: 0.9rem');
      const hasLH = text.includes('line-height: 1.5');
      const hasSVG = text.includes('<svg');

      const status = has09 && hasLH && hasSVG ? '✅' : '⚠️';

      console.log(`Question ${i + 1}: ${status}`);
      if (!has09) console.log(`  ⚠️  Missing 0.9rem font`);
      if (!hasLH) console.log(`  ⚠️  Missing 1.5 line-height`);
      if (!hasSVG) console.log(`  ⚠️  Missing diagram`);

      if (!has09 || !hasLH || !hasSVG) allGood = false;
    });

    console.log(`\n${allGood ? '✅ All quiz questions perfect!' : '⚠️ Some quiz questions have issues'}`);
  }

  // ====================================================================
  // CHECK 5: React Component
  // ====================================================================
  console.log('\n' + '='.repeat(70));
  console.log('\n✅ CHECK 5: REACT COMPONENT CHECK\n');

  const fs = await import('fs');
  const componentPath = '/Users/cadenchiang/Desktop/act-prep-react/src/components/InteractiveExample.js';

  try {
    const componentCode = fs.readFileSync(componentPath, 'utf8');

    // Check if it extracts diagram
    const extractsDiagram = componentCode.includes('diagramMatch');
    console.log(`Extracts diagram: ${extractsDiagram ? '✅' : '❌'}`);

    // Check if it renders diagram
    const rendersDiagram = componentCode.includes('diagramHTML &&');
    console.log(`Renders diagram: ${rendersDiagram ? '✅' : '❌'}`);

    // Check if it has compact styles
    const hasCompactFont = componentCode.includes('0.95rem');
    console.log(`Uses compact font (0.95rem): ${hasCompactFont ? '✅' : '❌'}`);

    const hasCompactPadding = componentCode.includes('0.35rem');
    console.log(`Uses compact padding (0.35rem): ${hasCompactPadding ? '✅' : '❌'}`);

  } catch (err) {
    console.log('⚠️  Could not read React component file');
  }

  // ====================================================================
  // FINAL SUMMARY
  // ====================================================================
  console.log('\n' + '='.repeat(70));
  console.log('\n📊 FINAL SUMMARY\n');

  const examplesOK = content.match(/<svg/g)?.length >= 3;
  const fontsOK = irregularSizes.length === 0;
  const htmlOK = openSpans === closeSpans && openDivs === closeDivs && openPs === closePs;
  const quizOK = quizzes && quizzes.length > 0;

  console.log(`Examples with diagrams: ${examplesOK ? '✅ All 3' : '⚠️ Missing some'}`);
  console.log(`Font consistency: ${fontsOK ? '✅ Perfect' : '⚠️ Has irregular sizes'}`);
  console.log(`HTML validity: ${htmlOK ? '✅ Valid' : '⚠️ Broken tags'}`);
  console.log(`Quiz present: ${quizOK ? '✅ Yes' : '❌ No'}`);

  const allGood = examplesOK && fontsOK && htmlOK && quizOK;

  console.log('\n' + '='.repeat(70));
  console.log(`\n${allGood ? '✅✅✅ EVERYTHING LOOKS PERFECT! ✅✅✅' : '⚠️⚠️⚠️ ISSUES FOUND - SEE ABOVE ⚠️⚠️⚠️'}\n`);
  console.log('='.repeat(70));
}

comprehensiveVerification();
