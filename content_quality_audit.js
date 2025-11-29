const { createClient } = require('@supabase/supabase-js');
const fs = require('fs');
require('dotenv').config();

const supabase = createClient(
  process.env.REACT_APP_SUPABASE_URL,
  process.env.REACT_APP_SUPABASE_ANON_KEY
);

async function contentQualityAudit() {
  console.log('='.repeat(100));
  console.log('CONTENT QUALITY AUDIT - Focus on Question Difficulty & Explanations');
  console.log('='.repeat(100));
  console.log();

  // Get all questions
  let allQuestions = [];
  let offset = 0;
  const batchSize = 1000;

  console.log('Fetching all questions...');
  while (true) {
    const { data, error } = await supabase
      .from('practice_questions')
      .select('*')
      .range(offset, offset + batchSize - 1);

    if (error) break;
    if (data.length === 0) break;

    allQuestions = allQuestions.concat(data);
    console.log(`  Fetched ${allQuestions.length} questions...`);

    if (data.length < batchSize) break;
    offset += batchSize;
  }

  console.log(`\n✓ Retrieved ${allQuestions.length} total questions\n`);

  const issues = {
    tooShort: [], // < 40 chars
    tooEasy: [], // Simple calculations, basic facts
    missingChoiceExplanations: [],
    missingOverallExplanation: [],
    noContextOrApplication: [], // Just "calculate X" without real-world context

    goodQuestions: []
  };

  console.log('Analyzing content quality...\n');

  allQuestions.forEach((q, idx) => {
    if (idx % 500 === 0 && idx > 0) {
      console.log(`  Analyzed ${idx}/${allQuestions.length}...`);
    }

    // Parse choices if they're strings
    let choices = q.choices;
    if (typeof choices === 'string') {
      try {
        choices = JSON.parse(choices);
      } catch (e) {
        choices = [];
      }
    }

    const problemText = q.problem_text || '';
    const problemLength = problemText.length;

    // Check problem length
    if (problemLength < 40) {
      issues.tooShort.push({
        id: q.id,
        title: q.title,
        subject: q.subject,
        difficulty: q.difficulty,
        length: problemLength,
        text: problemText
      });
    }

    // Check if question is too easy (basic calculation without context)
    const easyPatterns = [
      /^(Evaluate|Calculate|What is|Simplify)\s+\d+[\+\-\*\/\^].*/i,
      /^What is \d+/i,
      /^How many (millimeters|centimeters|meters|grams|kilograms)/i,
      /^Convert \d+/i
    ];

    const isBasicCalculation = easyPatterns.some(pattern => pattern.test(problemText));
    const isShortAndBasic = problemLength < 50 && (
      problemText.includes('What is') ||
      problemText.includes('Calculate') ||
      problemText.includes('Evaluate')
    );

    if ((isBasicCalculation || isShortAndBasic) && q.difficulty === 'easy') {
      issues.tooEasy.push({
        id: q.id,
        title: q.title,
        subject: q.subject,
        difficulty: q.difficulty,
        text: problemText
      });
    }

    // Check for lack of context/application
    const hasNoContext = problemLength < 60 && !problemText.match(/[A-Z][a-z]+ (has|needs|wants|is|are|measures|travels|costs|buys|sells)/);
    if (hasNoContext && !problemText.includes('?') && q.difficulty !== 'hard') {
      issues.noContextOrApplication.push({
        id: q.id,
        title: q.title,
        subject: q.subject,
        text: problemText
      });
    }

    // Check overall explanation
    if (!q.answer_explanation || q.answer_explanation.length < 50) {
      issues.missingOverallExplanation.push({
        id: q.id,
        title: q.title,
        subject: q.subject
      });
    }

    // Check choice-level explanations
    if (Array.isArray(choices) && choices.length === 4) {
      const allHaveExplanations = choices.every(c => c.explanation && c.explanation.length > 30);
      if (!allHaveExplanations) {
        const missingCount = choices.filter(c => !c.explanation || c.explanation.length < 30).length;
        issues.missingChoiceExplanations.push({
          id: q.id,
          title: q.title,
          subject: q.subject,
          missingCount
        });
      } else {
        // This is a good question
        if (problemLength >= 40 && q.answer_explanation && q.answer_explanation.length >= 50) {
          issues.goodQuestions.push({
            id: q.id,
            title: q.title,
            subject: q.subject,
            difficulty: q.difficulty
          });
        }
      }
    }
  });

  console.log('\n' + '='.repeat(100));
  console.log('CONTENT QUALITY SUMMARY:');
  console.log('='.repeat(100));
  console.log(`Total Questions:                        ${allQuestions.length}`);
  console.log(`\nCONTENT ISSUES:`);
  console.log(`  Too Short (< 40 chars):               ${issues.tooShort.length} (${(issues.tooShort.length/allQuestions.length*100).toFixed(1)}%)`);
  console.log(`  Too Easy (basic calc, no context):    ${issues.tooEasy.length} (${(issues.tooEasy.length/allQuestions.length*100).toFixed(1)}%)`);
  console.log(`  No Context/Application:               ${issues.noContextOrApplication.length} (${(issues.noContextOrApplication.length/allQuestions.length*100).toFixed(1)}%)`);
  console.log(`  Missing Overall Explanation (< 50ch): ${issues.missingOverallExplanation.length} (${(issues.missingOverallExplanation.length/allQuestions.length*100).toFixed(1)}%)`);
  console.log(`  Missing Choice Explanations:          ${issues.missingChoiceExplanations.length} (${(issues.missingChoiceExplanations.length/allQuestions.length*100).toFixed(1)}%)`);
  console.log(`\nQUALITY:`);
  console.log(`  High Quality Questions:               ${issues.goodQuestions.length} (${(issues.goodQuestions.length/allQuestions.length*100).toFixed(1)}%)`);

  // Show examples of issues
  console.log('\n' + '='.repeat(100));
  console.log('EXAMPLES OF ISSUES:');
  console.log('='.repeat(100));

  if (issues.tooShort.length > 0) {
    console.log('\n📏 TOO SHORT (first 10):');
    issues.tooShort.slice(0, 10).forEach((q, i) => {
      console.log(`  ${i+1}. [${q.difficulty}] ${q.title}`);
      console.log(`     "${q.text}"`);
      console.log(`     Length: ${q.length} chars\n`);
    });
  }

  if (issues.tooEasy.length > 0) {
    console.log('\n😴 TOO EASY (first 10):');
    issues.tooEasy.slice(0, 10).forEach((q, i) => {
      console.log(`  ${i+1}. [${q.difficulty}] ${q.title}`);
      console.log(`     "${q.text}"\n`);
    });
  }

  console.log('\n' + '='.repeat(100));

  // Save report
  fs.writeFileSync('/tmp/content_quality_report.json', JSON.stringify({
    summary: {
      total: allQuestions.length,
      tooShort: issues.tooShort.length,
      tooEasy: issues.tooEasy.length,
      noContext: issues.noContextOrApplication.length,
      missingOverallExpl: issues.missingOverallExplanation.length,
      missingChoiceExpl: issues.missingChoiceExplanations.length,
      highQuality: issues.goodQuestions.length
    },
    issues
  }, null, 2));

  console.log('📄 Full content quality report saved to: /tmp/content_quality_report.json');
  console.log('='.repeat(100));
}

contentQualityAudit().catch(console.error);
