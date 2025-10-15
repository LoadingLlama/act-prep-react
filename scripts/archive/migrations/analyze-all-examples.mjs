import { createClient } from '@supabase/supabase-js';
import dotenv from 'dotenv';
import * as cheerio from 'cheerio';

dotenv.config();

const supabase = createClient(
  process.env.REACT_APP_SUPABASE_URL,
  process.env.SUPABASE_SERVICE_ROLE_KEY
);

function analyzeLesson(html, lessonTitle) {
  const $ = cheerio.load(html, { xmlMode: false, decodeEntities: false });
  const issues = [];

  // Check for broken square root formulas
  let brokenSquareRoots = 0;
  $('span').each(function() {
    const text = $(this).text().trim();
    if (text === '√' || text.match(/^√+$/)) {
      brokenSquareRoots++;
    }
  });
  if (brokenSquareRoots > 0) {
    issues.push(`❌ ${brokenSquareRoots} broken square root spans`);
  }

  // Check for broken formulas (multiple formula-like p tags in a row)
  let consecutiveFormulaLines = 0;
  let maxConsecutive = 0;
  $('p').each(function() {
    const text = $(this).text().trim();
    if (text.match(/^[0-9\s\-+×÷=()√.<>]+$/) && text.length < 30) {
      consecutiveFormulaLines++;
      maxConsecutive = Math.max(maxConsecutive, consecutiveFormulaLines);
    } else {
      consecutiveFormulaLines = 0;
    }
  });
  if (maxConsecutive > 2) {
    issues.push(`⚠️  Fragmented formula (${maxConsecutive} consecutive lines)`);
  }

  // Check for "Answer: X:" patterns
  let answerColonIssues = 0;
  $('*').each(function() {
    const html = $(this).html();
    if (html && html.match(/Answer:\s*[A-D]:\s*(<strong>|$)/)) {
      answerColonIssues++;
    }
  });
  if (answerColonIssues > 0) {
    issues.push(`⚠️  ${answerColonIssues} malformed "Answer: X:" patterns`);
  }

  // Check for duplicate content
  const seenText = new Set();
  let duplicates = 0;
  $('p').each(function() {
    const text = $(this).text().trim().toLowerCase().substring(0, 80);
    if (text.length > 10) {
      if (seenText.has(text)) {
        duplicates++;
      } else {
        seenText.add(text);
      }
    }
  });
  if (duplicates > 0) {
    issues.push(`⚠️  ${duplicates} duplicate paragraphs`);
  }

  // Count examples
  const exampleCount = $('h4').filter(function() {
    return $(this).text().match(/Example\s*\d*/i);
  }).length;

  // Check for empty elements
  const emptySpans = $('span:empty').length;
  if (emptySpans > 0) {
    issues.push(`⚠️  ${emptySpans} empty spans`);
  }

  return {
    exampleCount,
    issues,
    hasIssues: issues.length > 0
  };
}

async function analyzeAllLessons() {
  console.log('🔍 ANALYZING ALL 35 MATH LESSONS FOR ISSUES...\n');
  console.log('='.repeat(70));

  const { data: lessons, error } = await supabase
    .from('lessons')
    .select('*')
    .eq('subject', 'math')
    .order('order_index');

  if (error) {
    console.error('❌ Error:', error);
    return;
  }

  let totalIssues = 0;
  const lessonsWithIssues = [];

  for (let i = 0; i < lessons.length; i++) {
    const lesson = lessons[i];
    const analysis = analyzeLesson(lesson.content, lesson.title);

    console.log(`\n[${i + 1}/35] ${lesson.title}`);
    console.log(`   📝 ${analysis.exampleCount} example${analysis.exampleCount !== 1 ? 's' : ''}`);

    if (analysis.hasIssues) {
      analysis.issues.forEach(issue => console.log(`   ${issue}`));
      totalIssues += analysis.issues.length;
      lessonsWithIssues.push({
        index: i + 1,
        title: lesson.title,
        id: lesson.id,
        issues: analysis.issues
      });
    } else {
      console.log('   ✅ No issues detected');
    }
  }

  console.log('\n' + '='.repeat(70));
  console.log(`\n📊 SUMMARY:`);
  console.log(`   Total lessons: ${lessons.length}`);
  console.log(`   Lessons with issues: ${lessonsWithIssues.length}`);
  console.log(`   Total issues found: ${totalIssues}`);

  if (lessonsWithIssues.length > 0) {
    console.log('\n🔧 LESSONS REQUIRING FIXES:');
    lessonsWithIssues.forEach(lesson => {
      console.log(`   ${lesson.index}. ${lesson.title} (${lesson.issues.length} issue${lesson.issues.length !== 1 ? 's' : ''})`);
    });
  } else {
    console.log('\n🎉 ALL LESSONS ARE PERFECT!');
  }

  console.log('\n' + '='.repeat(70));
}

analyzeAllLessons();
