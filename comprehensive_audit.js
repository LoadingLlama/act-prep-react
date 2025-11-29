const { createClient } = require('@supabase/supabase-js');
require('dotenv').config();

const supabase = createClient(
  process.env.REACT_APP_SUPABASE_URL,
  process.env.REACT_APP_SUPABASE_ANON_KEY
);

async function comprehensiveAudit() {
  console.log('='.repeat(100));
  console.log('COMPREHENSIVE AUDIT - ALL PRACTICE QUESTIONS');
  console.log('='.repeat(100));
  console.log();

  // Get total count first
  const { count: totalCount, error: countError } = await supabase
    .from('lesson_examples')
    .select('*', { count: 'exact', head: true });

  if (countError) {
    console.error('Error getting count:', countError);
    return;
  }

  console.log(`Total practice questions in database: ${totalCount}\n`);

  // Get all questions
  const { data: allQuestions, error } = await supabase
    .from('lesson_examples')
    .select('*')
    .order('created_at');

  if (error) {
    console.error('Error:', error);
    return;
  }

  console.log(`Retrieved ${allQuestions.length} questions for analysis\n`);
  console.log('='.repeat(100));

  // Quality metrics
  let stats = {
    totalQuestions: allQuestions.length,
    validChoices: 0,
    hasOverallExplanation: 0,
    hasChoiceExplanations: 0,
    problematicLength: [], // Less than 40 chars
    noChoices: [],
    wrongChoiceCount: [],
    missingOverallExplanation: [],
    missingChoiceExplanations: [],
    tooEasy: []
  };

  allQuestions.forEach((q, idx) => {
    // Check choices structure
    const isArrayChoices = Array.isArray(q.choices);
    const choiceCount = isArrayChoices ? q.choices.length : 0;

    if (choiceCount === 4) stats.validChoices++;
    if (!isArrayChoices) stats.noChoices.push(q);
    if (isArrayChoices && choiceCount !== 4) stats.wrongChoiceCount.push(q);

    // Check overall explanation
    const hasOverallExpl = q.answer_explanation && q.answer_explanation.length > 30;
    if (hasOverallExpl) stats.hasOverallExplanation++;
    if (!hasOverallExpl) stats.missingOverallExplanation.push(q);

    // Check choice-level explanations
    let hasAllChoiceExpl = false;
    if (isArrayChoices && choiceCount === 4) {
      hasAllChoiceExpl = q.choices.every(c => c.explanation && c.explanation.length > 20);
      if (hasAllChoiceExpl) stats.hasChoiceExplanations++;
      if (!hasAllChoiceExpl) stats.missingChoiceExplanations.push(q);
    }

    // Check problem length
    const problemLength = q.problem_text ? q.problem_text.length : 0;
    if (problemLength < 40) {
      stats.problematicLength.push({ ...q, length: problemLength });
    }

    // Flag potentially too easy questions
    if (q.problem_text && q.problem_text.length < 30 && q.title &&
        (q.title.toLowerCase().includes('basic') ||
         q.title.toLowerCase().includes('simple') ||
         q.title.toLowerCase().includes('practice'))) {
      stats.tooEasy.push(q);
    }
  });

  console.log('\nQUALITY SUMMARY:');
  console.log('-'.repeat(100));
  console.log(`Valid Choices (4 items):           ${stats.validChoices}/${stats.totalQuestions} (${(stats.validChoices/stats.totalQuestions*100).toFixed(1)}%)`);
  console.log(`Has Overall Explanation:           ${stats.hasOverallExplanation}/${stats.totalQuestions} (${(stats.hasOverallExplanation/stats.totalQuestions*100).toFixed(1)}%)`);
  console.log(`Has Choice-Level Explanations:     ${stats.hasChoiceExplanations}/${stats.totalQuestions} (${(stats.hasChoiceExplanations/stats.totalQuestions*100).toFixed(1)}%)`);
  console.log(`Problem Text Length < 40 chars:    ${stats.problematicLength.length}`);
  console.log(`Potentially Too Easy:              ${stats.tooEasy.length}`);

  console.log('\n' + '='.repeat(100));
  console.log('DETAILED ISSUES:');
  console.log('='.repeat(100));

  if (stats.noChoices.length > 0) {
    console.log(`\n❌ NO CHOICES ARRAY (${stats.noChoices.length} questions):`);
    stats.noChoices.slice(0, 10).forEach(q => {
      console.log(`  - ${q.title} (ID: ${q.id})`);
    });
    if (stats.noChoices.length > 10) console.log(`  ... and ${stats.noChoices.length - 10} more`);
  }

  if (stats.wrongChoiceCount.length > 0) {
    console.log(`\n⚠️  WRONG CHOICE COUNT (${stats.wrongChoiceCount.length} questions):`);
    stats.wrongChoiceCount.slice(0, 10).forEach(q => {
      console.log(`  - ${q.title} (${q.choices.length} choices) (ID: ${q.id})`);
    });
    if (stats.wrongChoiceCount.length > 10) console.log(`  ... and ${stats.wrongChoiceCount.length - 10} more`);
  }

  if (stats.missingOverallExplanation.length > 0) {
    console.log(`\n⚠️  MISSING OVERALL EXPLANATION (${stats.missingOverallExplanation.length} questions):`);
    stats.missingOverallExplanation.slice(0, 10).forEach(q => {
      console.log(`  - ${q.title} (ID: ${q.id})`);
    });
    if (stats.missingOverallExplanation.length > 10) console.log(`  ... and ${stats.missingOverallExplanation.length - 10} more`);
  }

  if (stats.missingChoiceExplanations.length > 0) {
    console.log(`\n⚠️  MISSING CHOICE-LEVEL EXPLANATIONS (${stats.missingChoiceExplanations.length} questions):`);
    stats.missingChoiceExplanations.slice(0, 10).forEach(q => {
      console.log(`  - ${q.title} (ID: ${q.id})`);
    });
    if (stats.missingChoiceExplanations.length > 10) console.log(`  ... and ${stats.missingChoiceExplanations.length - 10} more`);
  }

  if (stats.problematicLength.length > 0) {
    console.log(`\n⚠️  PROBLEM TEXT TOO SHORT (${stats.problematicLength.length} questions):`);
    stats.problematicLength.slice(0, 10).forEach(q => {
      console.log(`  - ${q.title} (${q.length} chars): "${q.problem_text.substring(0, 50)}..."`);
    });
    if (stats.problematicLength.length > 10) console.log(`  ... and ${stats.problematicLength.length - 10} more`);
  }

  console.log('\n' + '='.repeat(100));

  // Export full report to file
  const fs = require('fs');
  fs.writeFileSync('/tmp/full_audit_report.json', JSON.stringify({
    summary: {
      totalQuestions: stats.totalQuestions,
      validChoices: stats.validChoices,
      hasOverallExplanation: stats.hasOverallExplanation,
      hasChoiceExplanations: stats.hasChoiceExplanations,
      issuesCount: {
        noChoices: stats.noChoices.length,
        wrongChoiceCount: stats.wrongChoiceCount.length,
        missingOverallExplanation: stats.missingOverallExplanation.length,
        missingChoiceExplanations: stats.missingChoiceExplanations.length,
        problematicLength: stats.problematicLength.length,
        tooEasy: stats.tooEasy.length
      }
    },
    issues: {
      noChoices: stats.noChoices.map(q => ({ id: q.id, title: q.title })),
      wrongChoiceCount: stats.wrongChoiceCount.map(q => ({ id: q.id, title: q.title, count: q.choices.length })),
      missingOverallExplanation: stats.missingOverallExplanation.map(q => ({ id: q.id, title: q.title })),
      missingChoiceExplanations: stats.missingChoiceExplanations.map(q => ({ id: q.id, title: q.title })),
      problematicLength: stats.problematicLength.map(q => ({ id: q.id, title: q.title, length: q.length, text: q.problem_text })),
      tooEasy: stats.tooEasy.map(q => ({ id: q.id, title: q.title, text: q.problem_text }))
    }
  }, null, 2));

  console.log('📄 Full report saved to: /tmp/full_audit_report.json');
  console.log('='.repeat(100));
}

comprehensiveAudit().catch(console.error);
