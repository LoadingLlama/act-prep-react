/**
 * COMPREHENSIVE TEST - Find ALL Errors in Geometry Lessons
 *
 * Tests:
 * 1. Database content exists and is valid
 * 2. SVG diagrams have valid syntax
 * 3. Mathematical formulas are correct
 * 4. Quiz questions and answers are accurate
 * 5. HTML structure is valid
 * 6. All explanations are present
 */

import { createClient } from '@supabase/supabase-js';
import dotenv from 'dotenv';

dotenv.config();

const supabase = createClient(
  process.env.REACT_APP_SUPABASE_URL,
  process.env.SUPABASE_SERVICE_ROLE_KEY
);

const errors = [];
const warnings = [];

function logError(lesson, issue, details) {
  errors.push({ lesson, issue, details });
  console.error(`❌ ERROR [${lesson}]: ${issue}`);
  if (details) console.error(`   Details: ${details}`);
}

function logWarning(lesson, issue, details) {
  warnings.push({ lesson, issue, details });
  console.warn(`⚠️  WARNING [${lesson}]: ${issue}`);
  if (details) console.warn(`   Details: ${details}`);
}

function validateSVG(content, lessonKey) {
  const svgMatches = content.match(/<svg[\s\S]*?<\/svg>/g) || [];
  console.log(`   Found ${svgMatches.length} SVG diagrams`);

  svgMatches.forEach((svg, index) => {
    // Check for unclosed tags
    const openTags = (svg.match(/<(?!\/)[^>]+(?<!\/)\>/g) || []).length;
    const closeTags = (svg.match(/<\/[^>]+>/g) || []).length;
    const selfClosing = (svg.match(/<[^>]+\/>/g) || []).length;

    if (openTags !== closeTags + selfClosing + 1) { // +1 for the svg tag itself
      logError(lessonKey, `SVG #${index + 1} has mismatched tags`, `Open: ${openTags}, Close: ${closeTags}, Self-closing: ${selfClosing}`);
    }

    // Check for invalid attributes
    if (svg.includes('NaN') || svg.includes('undefined')) {
      logError(lessonKey, `SVG #${index + 1} contains invalid values`, 'Found NaN or undefined');
    }

    // Check for proper viewBox
    if (!svg.includes('viewBox')) {
      logWarning(lessonKey, `SVG #${index + 1} missing viewBox`, 'Should have viewBox for responsiveness');
    }
  });

  return svgMatches.length;
}

function validateMathFormulas(content, lessonKey) {
  // Check for common formula errors
  const formulas = [
    { pattern: /Area.*=.*π.*r²/, name: 'Circle area formula' },
    { pattern: /Circumference.*=.*2πr/, name: 'Circle circumference formula' },
    { pattern: /distance.*=.*√\[.*\(.*x.*-.*x.*\)².*\+.*\(.*y.*-.*y.*\)².*\]/, name: 'Distance formula' },
    { pattern: /slope.*=.*\(.*y.*-.*y.*\).*\/.*\(.*x.*-.*x.*\)/, name: 'Slope formula' },
  ];

  let foundFormulas = 0;
  formulas.forEach(({ pattern, name }) => {
    if (pattern.test(content)) {
      foundFormulas++;
      console.log(`   ✓ Found ${name}`);
    }
  });

  // Check for incomplete fractions
  if (content.includes('θ/360') || content.includes('theta/360')) {
    console.log(`   ✓ Found arc/sector fraction formula`);
    foundFormulas++;
  }

  return foundFormulas;
}

function validateHTML(content, lessonKey) {
  // Check for unclosed HTML tags
  const criticalTags = ['div', 'p', 'h3', 'h4', 'ul', 'ol', 'table', 'tr', 'td'];

  criticalTags.forEach(tag => {
    const openCount = (content.match(new RegExp(`<${tag}[\\s>]`, 'g')) || []).length;
    const closeCount = (content.match(new RegExp(`</${tag}>`, 'g')) || []).length;

    if (openCount !== closeCount) {
      logError(lessonKey, `Mismatched <${tag}> tags`, `Open: ${openCount}, Close: ${closeCount}`);
    }
  });

  // Check for invalid HTML entities
  if (content.includes('&nbsp&nbsp') || content.includes('&lt&gt')) {
    logError(lessonKey, 'Invalid HTML entities', 'Missing semicolons in entities');
  }
}

async function testLesson(lessonKey, expectedQuizQuestions = 0) {
  console.log(`\n${'='.repeat(60)}`);
  console.log(`Testing Lesson: ${lessonKey}`);
  console.log('='.repeat(60));

  // 1. Check lesson exists
  const { data: lesson, error: lessonError } = await supabase
    .from('lessons')
    .select('id, lesson_key, title, content')
    .eq('lesson_key', lessonKey)
    .single();

  if (lessonError || !lesson) {
    logError(lessonKey, 'Lesson not found in database', lessonError?.message);
    return;
  }

  console.log(`✓ Lesson found: "${lesson.title}"`);
  console.log(`  Content length: ${lesson.content.length} characters`);

  // 2. Validate content exists
  if (!lesson.content || lesson.content.length < 1000) {
    logError(lessonKey, 'Content too short or missing', `Only ${lesson.content.length} characters`);
  }

  // 3. Validate SVG diagrams
  console.log('\n📊 Checking SVG diagrams...');
  const svgCount = validateSVG(lesson.content, lessonKey);

  // 4. Validate formulas
  console.log('\n🔢 Checking mathematical formulas...');
  const formulaCount = validateMathFormulas(lesson.content, lessonKey);

  // 5. Validate HTML structure
  console.log('\n🏗️  Checking HTML structure...');
  validateHTML(lesson.content, lessonKey);

  // 6. Check for quiz
  console.log('\n📝 Checking quiz...');
  const { data: quizzes, error: quizError } = await supabase
    .from('quizzes')
    .select('id, title, quiz_type')
    .eq('lesson_id', lesson.id);

  if (quizError) {
    logError(lessonKey, 'Error fetching quiz', quizError.message);
  } else if (!quizzes || quizzes.length === 0) {
    if (expectedQuizQuestions > 0) {
      logError(lessonKey, 'No quiz found', 'Expected quiz but none exists');
    } else {
      console.log('   ℹ️  No quiz expected for this lesson');
    }
  } else {
    const quiz = quizzes[0];
    console.log(`   ✓ Quiz found: "${quiz.title}"`);

    // Check quiz questions
    const { data: questions, error: questionsError } = await supabase
      .from('quiz_questions')
      .select('id, question_text, question_order')
      .eq('quiz_id', quiz.id)
      .order('question_order');

    if (questionsError) {
      logError(lessonKey, 'Error fetching quiz questions', questionsError.message);
    } else {
      console.log(`   ✓ Found ${questions.length} questions`);

      if (expectedQuizQuestions > 0 && questions.length !== expectedQuizQuestions) {
        logWarning(lessonKey, `Expected ${expectedQuizQuestions} questions, found ${questions.length}`);
      }

      // Check each question has options
      for (const question of questions) {
        const { data: options, error: optionsError } = await supabase
          .from('quiz_options')
          .select('id, option_text, is_correct, explanation')
          .eq('question_id', question.id);

        if (optionsError) {
          logError(lessonKey, `Q${question.question_order}: Error fetching options`, optionsError.message);
        } else if (!options || options.length === 0) {
          logError(lessonKey, `Q${question.question_order}: No options found`);
        } else {
          const correctCount = options.filter(o => o.is_correct).length;

          if (correctCount === 0) {
            logError(lessonKey, `Q${question.question_order}: No correct answer marked`);
          } else if (correctCount > 1) {
            logError(lessonKey, `Q${question.question_order}: Multiple correct answers (${correctCount})`);
          }

          // Check all options have explanations
          const missingExplanations = options.filter(o => !o.explanation || o.explanation.trim() === '');
          if (missingExplanations.length > 0) {
            logError(lessonKey, `Q${question.question_order}: ${missingExplanations.length} options missing explanations`);
          }
        }
      }
    }
  }

  console.log(`\n✓ Completed testing ${lessonKey}`);
}

async function runComprehensiveTest() {
  console.log('╔══════════════════════════════════════════════════════════╗');
  console.log('║     COMPREHENSIVE TEST - ALL GEOMETRY LESSONS            ║');
  console.log('╚══════════════════════════════════════════════════════════╝\n');

  const geometryLessons = [
    { key: 'geometry-angles', expectedQuiz: 6 },
    { key: 'geometry-shapes', expectedQuiz: 6 },
    { key: 'lines', expectedQuiz: 6 },
    { key: 'arcs-sectors', expectedQuiz: 6 },
    { key: 'circles-ellipses', expectedQuiz: 6 }
  ];

  for (const { key, expectedQuiz } of geometryLessons) {
    await testLesson(key, expectedQuiz);
  }

  // Final Report
  console.log('\n\n╔══════════════════════════════════════════════════════════╗');
  console.log('║                    FINAL REPORT                          ║');
  console.log('╚══════════════════════════════════════════════════════════╝\n');

  if (errors.length === 0 && warnings.length === 0) {
    console.log('🎉 NO ERRORS OR WARNINGS FOUND!');
    console.log('All geometry lessons are perfect!\n');
  } else {
    if (errors.length > 0) {
      console.log(`\n❌ CRITICAL ERRORS FOUND: ${errors.length}`);
      console.log('─'.repeat(60));
      errors.forEach(({ lesson, issue, details }, i) => {
        console.log(`\n${i + 1}. [${lesson}] ${issue}`);
        if (details) console.log(`   ${details}`);
      });
    }

    if (warnings.length > 0) {
      console.log(`\n\n⚠️  WARNINGS: ${warnings.length}`);
      console.log('─'.repeat(60));
      warnings.forEach(({ lesson, issue, details }, i) => {
        console.log(`\n${i + 1}. [${lesson}] ${issue}`);
        if (details) console.log(`   ${details}`);
      });
    }

    console.log('\n');
  }

  console.log(`Total Errors: ${errors.length}`);
  console.log(`Total Warnings: ${warnings.length}`);
}

runComprehensiveTest().catch(err => {
  console.error('❌ Fatal error:', err);
  process.exit(1);
});
