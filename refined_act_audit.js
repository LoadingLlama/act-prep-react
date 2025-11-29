const { createClient } = require('@supabase/supabase-js');
const fs = require('fs');
require('dotenv').config();

const supabase = createClient(
  process.env.REACT_APP_SUPABASE_URL,
  process.env.REACT_APP_SUPABASE_ANON_KEY
);

function assessACTQuality(question) {
  const text = question.problem_text || '';
  const length = text.length;
  const difficulty = question.difficulty;

  // DEFINITELY TOO EASY - Elementary calculations
  const isTooEasy =
    // "What is 5 + 3?" type questions
    /^What is ([-\d]+\s*[\+\-\*\/÷×]\s*[-\d]+(\s*[\+\-\*\/÷×]\s*[-\d]+)?)[\?\s]*$/i.test(text) ||
    // "Calculate 2^5" without context
    /^(Evaluate|Calculate)\s+[-\d]+[\^⁰¹²³⁴⁵⁶⁷⁸⁹]+[\?\s]*$/i.test(text) ||
    // "What is (-2) × (-5)?"
    /^What is \([-\d]+\)\s*[×\*]\s*\([-\d]+\)[\?\s]*$/i.test(text) ||
    // Very short and marked easy
    (length < 25 && difficulty === 'easy');

  // QUESTIONABLE - Probably too simple
  const isQuestionable =
    // Simple unit conversions
    (/^How many (millimeters|centimeters|meters|kilometers|grams|kilograms|pounds|tons|days|hours|minutes|seconds|liters|milliliters) (are in|in|equals)/i.test(text) && length < 50) ||
    // Simple "Find the next term" with no context
    (/^Find the next term:/i.test(text) && length < 50) ||
    // "What is the [simple property]?" for very short questions
    (/^What is the (sum|product|difference|quotient) of/i.test(text) && length < 40) ||
    // Marked easy and no real-world names/context
    (difficulty === 'easy' && length < 60 && !text.match(/[A-Z][a-z]+ (has|needs|wants|is|are|measures|travels|costs|buys|sells|pays|earns)/));

  // GOOD - Has context and complexity
  const isGood =
    length >= 70 &&
    (
      // Has real-world context with names
      text.match(/([A-Z][a-z]+|An? [a-z]+) (has|needs|wants|is planning|travels|costs|buys|sells|pays|earns|starts with|doubles|triples|grows)/i) ||
      // Multi-step indicated by multiple sentences
      (text.match(/\./g) || []).length >= 1
    );

  if (isTooEasy) return 'TOO_EASY';
  if (isGood) return 'GOOD';
  if (isQuestionable) return 'QUESTIONABLE';
  return 'ACCEPTABLE';
}

async function refinedACTAudit() {
  console.log('='.repeat(100));
  console.log('REFINED ACT STANDARDS AUDIT - Based on Real ACT Question Analysis');
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
  console.log('Analyzing...\n');

  const categories = {
    TOO_EASY: [],
    QUESTIONABLE: [],
    ACCEPTABLE: [],
    GOOD: []
  };

  allQuestions.forEach((q, idx) => {
    if (idx % 500 === 0 && idx > 0) {
      console.log(`  Analyzed ${idx}/${allQuestions.length}...`);
    }

    const quality = assessACTQuality(q);
    categories[quality].push({
      id: q.id,
      title: q.title,
      subject: q.subject,
      difficulty: q.difficulty,
      text: q.problem_text,
      length: q.problem_text?.length || 0
    });
  });

  console.log('\n' + '='.repeat(100));
  console.log('REFINED ACT ASSESSMENT:');
  console.log('='.repeat(100));
  console.log(`\nTotal Questions: ${allQuestions.length}\n`);

  console.log('QUALITY BREAKDOWN:');
  console.log('-'.repeat(100));
  console.log(`❌ TOO EASY (elementary, no ACT level):    ${categories.TOO_EASY.length.toString().padStart(4)} (${(categories.TOO_EASY.length/allQuestions.length*100).toFixed(1)}%)`);
  console.log(`⚠️  QUESTIONABLE (weak for ACT):           ${categories.QUESTIONABLE.length.toString().padStart(4)} (${(categories.QUESTIONABLE.length/allQuestions.length*100).toFixed(1)}%)`);
  console.log(`✓  ACCEPTABLE (minimal ACT):               ${categories.ACCEPTABLE.length.toString().padStart(4)} (${(categories.ACCEPTABLE.length/allQuestions.length*100).toFixed(1)}%)`);
  console.log(`✅ GOOD (solid ACT quality):               ${categories.GOOD.length.toString().padStart(4)} (${(categories.GOOD.length/allQuestions.length*100).toFixed(1)}%)`);

  const needsWork = categories.TOO_EASY.length + categories.QUESTIONABLE.length;
  const percentNeedsWork = (needsWork/allQuestions.length*100).toFixed(1);

  console.log(`\n${'='.repeat(100)}`);
  console.log(`⚠️  TOTAL BELOW ACT STANDARDS: ${needsWork} questions (${percentNeedsWork}%)`);
  console.log('='.repeat(100));

  // Show examples
  console.log('\n\n❌ TOO EASY - Elementary Level (first 30):');
  console.log('-'.repeat(100));
  categories.TOO_EASY.slice(0, 30).forEach((q, i) => {
    console.log(`${(i+1).toString().padStart(3)}. [${q.difficulty}] ${q.title}`);
    console.log(`     "${q.text}"`);
  });

  console.log('\n\n⚠️  QUESTIONABLE - Weak for ACT (first 30):');
  console.log('-'.repeat(100));
  categories.QUESTIONABLE.slice(0, 30).forEach((q, i) => {
    console.log(`${(i+1).toString().padStart(3)}. [${q.difficulty}] ${q.title}`);
    console.log(`     "${q.text}"`);
  });

  console.log('\n\n✅ GOOD - Meets ACT Standards (first 20):');
  console.log('-'.repeat(100));
  categories.GOOD.slice(0, 20).forEach((q, i) => {
    console.log(`${(i+1).toString().padStart(3)}. [${q.difficulty}] ${q.title}`);
    console.log(`     "${q.text}"`);
  });

  // Save report
  fs.writeFileSync('/tmp/refined_act_audit.json', JSON.stringify({
    summary: {
      total: allQuestions.length,
      tooEasy: categories.TOO_EASY.length,
      questionable: categories.QUESTIONABLE.length,
      acceptable: categories.ACCEPTABLE.length,
      good: categories.GOOD.length,
      needsWork,
      percentNeedsWork
    },
    categories
  }, null, 2));

  console.log('\n' + '='.repeat(100));
  console.log('📄 Report saved to: /tmp/refined_act_audit.json');
  console.log('='.repeat(100));
}

refinedACTAudit().catch(console.error);
