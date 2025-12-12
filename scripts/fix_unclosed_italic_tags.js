/**
 * Find and fix unclosed <i> tags in practice test questions
 * Unclosed tags cause all text after them to be italicized
 */

const { createClient } = require('@supabase/supabase-js');
require('dotenv').config();

const supabase = createClient(
  process.env.REACT_APP_SUPABASE_URL,
  process.env.SUPABASE_SERVICE_ROLE_KEY
);

/**
 * Count opening and closing italic tags in text
 */
function checkItalicTags(text) {
  if (!text) return { balanced: true, openCount: 0, closeCount: 0 };

  const openTags = (text.match(/<i>/g) || []).length;
  const closeTags = (text.match(/<\/i>/g) || []).length;

  return {
    balanced: openTags === closeTags,
    openCount: openTags,
    closeCount: closeTags,
    difference: openTags - closeTags
  };
}

/**
 * Fix unclosed italic tags by adding missing closing tags
 */
function fixUnclosedTags(text) {
  if (!text) return text;

  const analysis = checkItalicTags(text);

  if (analysis.balanced) return text;

  // More opening tags than closing - add missing closing tags
  if (analysis.difference > 0) {
    return text + '</i>'.repeat(analysis.difference);
  }

  // More closing tags than opening - add missing opening tags at start
  if (analysis.difference < 0) {
    return '<i>'.repeat(Math.abs(analysis.difference)) + text;
  }

  return text;
}

async function findAndFixUnbalancedTags() {
  console.log('🔍 CHECKING FOR UNBALANCED <i> TAGS\n');
  console.log('='.repeat(80));

  const sections = ['english', 'math', 'reading', 'science'];
  const testNumbers = [1, 2, 3, 4, 5, 6, 7]; // All tests including diagnostic

  let totalUnbalanced = 0;
  const issues = [];

  for (const testNum of testNumbers) {
    for (const section of sections) {
      const questionTable = `practice_test_${section}_questions`;

      const { data: questions, error } = await supabase
        .from(questionTable)
        .select('id, test_number, question_number, question_text, question_prompt, choices')
        .eq('test_number', testNum);

      if (error || !questions) {
        console.log(`⚠️  Could not load ${section} test ${testNum}`);
        continue;
      }

      for (const q of questions) {
        const questionText = q.question_text || q.question_prompt || '';
        const analysis = checkItalicTags(questionText);

        if (!analysis.balanced) {
          totalUnbalanced++;
          issues.push({
            table: questionTable,
            test: testNum,
            section,
            questionNum: q.question_number,
            id: q.id,
            openTags: analysis.openCount,
            closeTags: analysis.closeCount,
            difference: analysis.difference,
            field: 'question_text',
            preview: questionText.substring(0, 150) + '...'
          });
        }

        // Check choices
        if (q.choices) {
          const choicesText = JSON.stringify(q.choices);
          const choicesAnalysis = checkItalicTags(choicesText);

          if (!choicesAnalysis.balanced) {
            totalUnbalanced++;
            issues.push({
              table: questionTable,
              test: testNum,
              section,
              questionNum: q.question_number,
              id: q.id,
              openTags: choicesAnalysis.openCount,
              closeTags: choicesAnalysis.closeCount,
              difference: choicesAnalysis.difference,
              field: 'choices',
              preview: choicesText.substring(0, 150) + '...'
            });
          }
        }
      }
    }
  }

  console.log('\n' + '='.repeat(80));
  console.log(`\n📊 SUMMARY: Found ${totalUnbalanced} unbalanced italic tags\n`);

  if (issues.length > 0) {
    console.log('❌ ISSUES FOUND:\n');

    // Group by section
    const bySection = {};
    issues.forEach(issue => {
      if (!bySection[issue.section]) bySection[issue.section] = [];
      bySection[issue.section].push(issue);
    });

    Object.entries(bySection).forEach(([section, sectionIssues]) => {
      console.log(`\n${section.toUpperCase()}: ${sectionIssues.length} issues`);

      sectionIssues.slice(0, 10).forEach(issue => {
        console.log(`\n  Test ${issue.test} Q${issue.questionNum} (${issue.field})`);
        console.log(`  Open: ${issue.openTags}, Close: ${issue.closeCount}, Diff: ${issue.difference > 0 ? '+' + issue.difference : issue.difference}`);
        console.log(`  Preview: ${issue.preview.substring(0, 100)}...`);
      });

      if (sectionIssues.length > 10) {
        console.log(`  ... and ${sectionIssues.length - 10} more`);
      }
    });

    console.log('\n\n' + '='.repeat(80));
    console.log('🔧 Would you like to FIX these issues? (This will update the database)');
    console.log('   Run with --fix flag to apply fixes');
    console.log('='.repeat(80) + '\n');
  } else {
    console.log('✅ No unbalanced italic tags found!\n');
  }

  return issues;
}

async function fixIssues(issues) {
  console.log(`\n🔧 FIXING ${issues.length} unbalanced italic tags...\n`);

  let fixed = 0;
  let failed = 0;

  for (const issue of issues) {
    const { data: question } = await supabase
      .from(issue.table)
      .select('*')
      .eq('id', issue.id)
      .single();

    if (!question) {
      console.log(`❌ Could not find question ${issue.id}`);
      failed++;
      continue;
    }

    const updates = {};

    if (issue.field === 'question_text') {
      const fixedText = fixUnclosedTags(question.question_text || question.question_prompt);
      updates.question_text = fixedText;
    } else if (issue.field === 'choices') {
      // Fix each choice individually
      const fixedChoices = {};
      Object.entries(question.choices || {}).forEach(([key, value]) => {
        fixedChoices[key] = fixUnclosedTags(value);
      });
      updates.choices = fixedChoices;
    }

    const { error } = await supabase
      .from(issue.table)
      .update(updates)
      .eq('id', issue.id);

    if (error) {
      console.log(`❌ Failed to fix ${issue.section} Test ${issue.test} Q${issue.questionNum}: ${error.message}`);
      failed++;
    } else {
      console.log(`✅ Fixed ${issue.section} Test ${issue.test} Q${issue.questionNum}`);
      fixed++;
    }
  }

  console.log(`\n📊 RESULTS: ${fixed} fixed, ${failed} failed\n`);
}

async function main() {
  const issues = await findAndFixUnbalancedTags();

  // Check if --fix flag was passed
  if (process.argv.includes('--fix') && issues.length > 0) {
    await fixIssues(issues);
  }
}

main();
