const { createClient } = require('@supabase/supabase-js');
const fs = require('fs');
require('dotenv').config();

const supabase = createClient(
  process.env.REACT_APP_SUPABASE_URL,
  process.env.REACT_APP_SUPABASE_ANON_KEY
);

async function auditAllPracticeQuestions() {
  console.log('='.repeat(100));
  console.log('COMPREHENSIVE AUDIT - ALL 2,248 PRACTICE QUESTIONS');
  console.log('='.repeat(100));
  console.log();

  // Get all questions in batches
  let allQuestions = [];
  let offset = 0;
  const batchSize = 1000;

  console.log('Fetching all questions...');
  while (true) {
    const { data, error } = await supabase
      .from('practice_questions')
      .select('*')
      .range(offset, offset + batchSize - 1);

    if (error) {
      console.error('Error fetching questions:', error);
      break;
    }

    if (data.length === 0) break;

    allQuestions = allQuestions.concat(data);
    console.log(`  Fetched ${allQuestions.length} questions...`);

    if (data.length < batchSize) break;
    offset += batchSize;
  }

  console.log(`\n✓ Retrieved ${allQuestions.length} total questions\n`);
  console.log('='.repeat(100));

  // Quality analysis
  const stats = {
    total: allQuestions.length,
    validChoices: 0,
    hasOverallExplanation: 0,
    hasChoiceExplanations: 0,
    hasSolutionSteps: 0,

    // Issues
    noChoices: [],
    wrongChoiceCount: [],
    missingOverallExplanation: [],
    missingChoiceExplanations: [],
    tooShort: [], // < 40 chars
    veryShort: [], // < 20 chars
    tooEasy: [],
    noDifficulty: [],

    // By difficulty
    byDifficulty: {
      easy: 0,
      medium: 0,
      hard: 0,
      null: 0
    },

    // By subject
    bySubject: {}
  };

  console.log('Analyzing questions...\n');

  allQuestions.forEach((q, idx) => {
    if (idx % 500 === 0 && idx > 0) {
      console.log(`  Analyzed ${idx}/${allQuestions.length} questions...`);
    }

    // Track subjects
    const subject = q.subject || 'unknown';
    if (!stats.bySubject[subject]) {
      stats.bySubject[subject] = { count: 0, issues: 0 };
    }
    stats.bySubject[subject].count++;

    // Check difficulty
    if (q.difficulty) {
      stats.byDifficulty[q.difficulty] = (stats.byDifficulty[q.difficulty] || 0) + 1;
      if (q.difficulty === 'easy') {
        stats.tooEasy.push({ id: q.id, title: q.title, subject: q.subject });
      }
    } else {
      stats.byDifficulty.null++;
      stats.noDifficulty.push({ id: q.id, title: q.title, subject: q.subject });
    }

    // Check choices
    const isArray = Array.isArray(q.choices);
    const choiceCount = isArray ? q.choices.length : 0;

    if (choiceCount === 4) {
      stats.validChoices++;
    } else {
      stats.bySubject[subject].issues++;
      if (!isArray) {
        stats.noChoices.push({ id: q.id, title: q.title, subject: q.subject });
      } else {
        stats.wrongChoiceCount.push({ id: q.id, title: q.title, subject: q.subject, count: choiceCount });
      }
    }

    // Check overall explanation
    if (q.answer_explanation && q.answer_explanation.length > 30) {
      stats.hasOverallExplanation++;
    } else {
      stats.bySubject[subject].issues++;
      stats.missingOverallExplanation.push({ id: q.id, title: q.title, subject: q.subject });
    }

    // Check choice-level explanations
    if (isArray && choiceCount === 4) {
      const hasAllExpl = q.choices.every(c => c.explanation && c.explanation.length > 20);
      if (hasAllExpl) {
        stats.hasChoiceExplanations++;
      } else {
        stats.bySubject[subject].issues++;
        stats.missingChoiceExplanations.push({ id: q.id, title: q.title, subject: q.subject });
      }
    }

    // Check solution steps
    if (q.solution_steps && q.solution_steps.length > 0) {
      stats.hasSolutionSteps++;
    }

    // Check problem length
    const problemLength = q.problem_text ? q.problem_text.length : 0;
    if (problemLength < 20) {
      stats.bySubject[subject].issues++;
      stats.veryShort.push({ id: q.id, title: q.title, subject: q.subject, length: problemLength, text: q.problem_text });
    } else if (problemLength < 40) {
      stats.tooShort.push({ id: q.id, title: q.title, subject: q.subject, length: problemLength, text: q.problem_text });
    }
  });

  console.log('\n' + '='.repeat(100));
  console.log('QUALITY METRICS:');
  console.log('='.repeat(100));
  console.log(`Total Questions:                   ${stats.total}`);
  console.log(`Valid Choices (4 items):           ${stats.validChoices}/${stats.total} (${(stats.validChoices/stats.total*100).toFixed(1)}%)`);
  console.log(`Has Overall Explanation:           ${stats.hasOverallExplanation}/${stats.total} (${(stats.hasOverallExplanation/stats.total*100).toFixed(1)}%)`);
  console.log(`Has Choice-Level Explanations:     ${stats.hasChoiceExplanations}/${stats.total} (${(stats.hasChoiceExplanations/stats.total*100).toFixed(1)}%)`);
  console.log(`Has Solution Steps:                ${stats.hasSolutionSteps}/${stats.total} (${(stats.hasSolutionSteps/stats.total*100).toFixed(1)}%)`);

  console.log('\n' + '-'.repeat(100));
  console.log('ISSUES FOUND:');
  console.log('-'.repeat(100));
  console.log(`No Choices Array:                  ${stats.noChoices.length}`);
  console.log(`Wrong Choice Count (!= 4):         ${stats.wrongChoiceCount.length}`);
  console.log(`Missing Overall Explanation:       ${stats.missingOverallExplanation.length}`);
  console.log(`Missing Choice Explanations:       ${stats.missingChoiceExplanations.length}`);
  console.log(`Very Short (< 20 chars):           ${stats.veryShort.length}`);
  console.log(`Too Short (< 40 chars):            ${stats.tooShort.length}`);
  console.log(`Marked as Easy:                    ${stats.tooEasy.length}`);
  console.log(`No Difficulty Rating:              ${stats.noDifficulty.length}`);

  console.log('\n' + '-'.repeat(100));
  console.log('BY DIFFICULTY:');
  console.log('-'.repeat(100));
  Object.entries(stats.byDifficulty).forEach(([diff, count]) => {
    console.log(`${diff.padEnd(10)}: ${count} (${(count/stats.total*100).toFixed(1)}%)`);
  });

  console.log('\n' + '-'.repeat(100));
  console.log('BY SUBJECT:');
  console.log('-'.repeat(100));
  Object.entries(stats.bySubject)
    .sort((a, b) => b[1].count - a[1].count)
    .forEach(([subject, data]) => {
      const issueRate = ((data.issues / data.count) * 100).toFixed(1);
      console.log(`${subject.padEnd(30)}: ${data.count.toString().padStart(4)} questions, ${data.issues.toString().padStart(4)} issues (${issueRate}%)`);
    });

  console.log('\n' + '='.repeat(100));

  // Save detailed report
  const report = {
    summary: {
      total: stats.total,
      validChoices: stats.validChoices,
      hasOverallExplanation: stats.hasOverallExplanation,
      hasChoiceExplanations: stats.hasChoiceExplanations,
      hasSolutionSteps: stats.hasSolutionSteps,
      byDifficulty: stats.byDifficulty,
      bySubject: stats.bySubject
    },
    issueCount: {
      noChoices: stats.noChoices.length,
      wrongChoiceCount: stats.wrongChoiceCount.length,
      missingOverallExplanation: stats.missingOverallExplanation.length,
      missingChoiceExplanations: stats.missingChoiceExplanations.length,
      veryShort: stats.veryShort.length,
      tooShort: stats.tooShort.length,
      tooEasy: stats.tooEasy.length,
      noDifficulty: stats.noDifficulty.length
    },
    issues: {
      noChoices: stats.noChoices,
      wrongChoiceCount: stats.wrongChoiceCount,
      missingOverallExplanation: stats.missingOverallExplanation,
      missingChoiceExplanations: stats.missingChoiceExplanations,
      veryShort: stats.veryShort,
      tooShort: stats.tooShort,
      tooEasy: stats.tooEasy,
      noDifficulty: stats.noDifficulty
    }
  };

  fs.writeFileSync('/tmp/practice_questions_audit.json', JSON.stringify(report, null, 2));
  console.log('📄 Full audit report saved to: /tmp/practice_questions_audit.json');
  console.log('='.repeat(100));
}

auditAllPracticeQuestions().catch(console.error);
