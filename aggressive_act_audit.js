const { createClient } = require('@supabase/supabase-js');
const fs = require('fs');
require('dotenv').config();

const supabase = createClient(
  process.env.REACT_APP_SUPABASE_URL,
  process.env.REACT_APP_SUPABASE_ANON_KEY
);

// Real ACT standards - strict
function meetsACTStandards(question) {
  const text = question.problem_text || '';
  const length = text.length;
  const difficulty = question.difficulty;

  // FAILS - Single-step calculations with no context
  const failReasons = [];

  // Elementary arithmetic
  if (/^What is ([-\d\(\)]+\s*[\+\-\*\/÷×]\s*[-\d\(\)]+)+[\?\s]*$/i.test(text)) {
    failReasons.push('Elementary arithmetic');
  }

  // Simple "Evaluate X" or "Calculate X"
  if (/^(Evaluate|Calculate|Simplify)\s+[^\.]+(\.)?$/i.test(text) && length < 50) {
    failReasons.push('Simple calculation without context');
  }

  // "What is [fraction operation]?"
  if (/^What is \d+\/\d+\s*[\+\-\*\/÷×]\s*\d+\/\d+[\?\s]*$/i.test(text)) {
    failReasons.push('Simple fraction arithmetic');
  }

  // Simple "Solve: [equation]" without word problem
  if (/^Solve:\s*[^\.]+(\.)?$/i.test(text) && length < 40) {
    failReasons.push('Equation solving without application');
  }

  // "Find the next term:" sequences
  if (/^Find the (next term|4th term|3rd term):/i.test(text) && length < 60) {
    failReasons.push('Pattern recognition without context');
  }

  // Simple unit conversions
  if (/^How many (millimeters|centimeters|meters|grams|pounds|days|hours)/i.test(text) && length < 50) {
    failReasons.push('Simple unit conversion');
  }

  // "What is the [simple property]" for math facts
  if (/^What is the (prime factorization|GCF|LCM|smallest prime|common ratio)/i.test(text) && length < 60) {
    failReasons.push('Math fact without application');
  }

  // Single vector operation without context
  if (/^(What is|If).{0,80}vector.{0,80}\?$/i.test(text) && length < 70 &&
      !text.match(/(travels|force|velocity|displacement|moves from)/i)) {
    failReasons.push('Vector operation without physics context');
  }

  // Too short = likely too simple
  if (length < 40) {
    failReasons.push('Too short (<40 chars)');
  }

  // Marked easy and short = definitely too easy
  if (difficulty === 'easy' && length < 70) {
    failReasons.push('Marked easy and short');
  }

  // PASSES - Has real-world context and complexity
  const passReasons = [];

  // Has real-world narrative
  if (text.match(/([A-Z][a-z]+|An? [a-z]+) (has|needs|wants|is planning|travels|costs|buys|sells|pays|earns|starts with|doubles|triples|grows|works|completes|takes|deposits|withdraws)/i)) {
    passReasons.push('Real-world narrative');
  }

  // Multi-step problem (multiple sentences)
  if ((text.match(/\./g) || []).length >= 2 || (text.match(/\?/g) || []).length >= 1 && length >= 80) {
    passReasons.push('Multi-step complexity');
  }

  // Physics/science context
  if (text.match(/(force|velocity|acceleration|work|energy|displacement|bacteria|population|compound|depreciate|appreciate)/i)) {
    passReasons.push('Science/physics application');
  }

  // Financial context
  if (text.match(/(interest|investment|profit|revenue|cost|price|earns|percent|discount|tax)/i) && length >= 60) {
    passReasons.push('Financial application');
  }

  // Decision
  if (failReasons.length > 0 && passReasons.length === 0) {
    return { meets: false, reasons: failReasons };
  }
  if (passReasons.length >= 1 && length >= 60) {
    return { meets: true, reasons: passReasons };
  }
  // Borderline - needs manual review but likely weak
  return { meets: false, reasons: ['Borderline - no strong pass criteria'] };
}

async function aggressiveAudit() {
  console.log('='.repeat(100));
  console.log('AGGRESSIVE ACT AUDIT - Real ACT Standards');
  console.log('='.repeat(100));
  console.log();

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

  console.log(`\n✓ Retrieved ${allQuestions.length} questions\n`);
  console.log('Analyzing with strict ACT standards...\n');

  const categories = {
    PASSES: [],
    FAILS: []
  };

  allQuestions.forEach((q, idx) => {
    if (idx % 500 === 0 && idx > 0) {
      console.log(`  Analyzed ${idx}/${allQuestions.length}...`);
    }

    const assessment = meetsACTStandards(q);
    const category = assessment.meets ? 'PASSES' : 'FAILS';

    categories[category].push({
      id: q.id,
      title: q.title,
      subject: q.subject,
      difficulty: q.difficulty,
      text: q.problem_text,
      length: q.problem_text?.length || 0,
      reasons: assessment.reasons
    });
  });

  console.log('\n' + '='.repeat(100));
  console.log('AGGRESSIVE ACT AUDIT RESULTS:');
  console.log('='.repeat(100));
  console.log(`\nTotal Questions: ${allQuestions.length}\n`);

  const passRate = (categories.PASSES.length / allQuestions.length * 100).toFixed(1);
  const failRate = (categories.FAILS.length / allQuestions.length * 100).toFixed(1);

  console.log('FINAL VERDICT:');
  console.log('-'.repeat(100));
  console.log(`✅ MEETS ACT STANDARDS:         ${categories.PASSES.length.toString().padStart(4)} (${passRate}%)`);
  console.log(`❌ BELOW ACT STANDARDS:         ${categories.FAILS.length.toString().padStart(4)} (${failRate}%)`);
  console.log(`\n${'='.repeat(100)}`);
  console.log(`⚠️  ${categories.FAILS.length} QUESTIONS NEED REPLACEMENT/UPGRADE`);
  console.log('='.repeat(100));

  // Group failures by reason
  const reasonCounts = {};
  categories.FAILS.forEach(q => {
    q.reasons.forEach(reason => {
      reasonCounts[reason] = (reasonCounts[reason] || 0) + 1;
    });
  });

  console.log('\nREASONS FOR FAILURE:');
  console.log('-'.repeat(100));
  Object.entries(reasonCounts)
    .sort((a, b) => b[1] - a[1])
    .forEach(([reason, count]) => {
      console.log(`  ${reason.padEnd(50)}: ${count}`);
    });

  // Show samples
  console.log('\n\n❌ SAMPLE OF FAILED QUESTIONS (first 50):');
  console.log('-'.repeat(100));
  categories.FAILS.slice(0, 50).forEach((q, i) => {
    console.log(`\n${(i+1).toString().padStart(3)}. [${q.difficulty}] ${q.title}`);
    console.log(`     "${q.text}"`);
    console.log(`     Reasons: ${q.reasons.join(', ')}`);
  });

  console.log('\n\n✅ SAMPLE OF PASSED QUESTIONS (first 30):');
  console.log('-'.repeat(100));
  categories.PASSES.slice(0, 30).forEach((q, i) => {
    console.log(`\n${(i+1).toString().padStart(3)}. [${q.difficulty}] ${q.title}`);
    console.log(`     "${q.text}"`);
    console.log(`     Reasons: ${q.reasons.join(', ')}`);
  });

  // Save report
  fs.writeFileSync('/tmp/aggressive_act_audit.json', JSON.stringify({
    summary: {
      total: allQuestions.length,
      passes: categories.PASSES.length,
      fails: categories.FAILS.length,
      passRate,
      failRate
    },
    reasonCounts,
    categories
  }, null, 2));

  console.log('\n' + '='.repeat(100));
  console.log('📄 Full report saved to: /tmp/aggressive_act_audit.json');
  console.log('='.repeat(100));
}

aggressiveAudit().catch(console.error);
