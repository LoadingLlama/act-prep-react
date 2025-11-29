const { createClient } = require('@supabase/supabase-js');
const fs = require('fs');
require('dotenv').config();

const supabase = createClient(
  process.env.REACT_APP_SUPABASE_URL,
  process.env.REACT_APP_SUPABASE_ANON_KEY
);

// Strict ACT standards based on real ACT questions
function isACTQuality(question) {
  const text = question.problem_text || '';
  const length = text.length;

  // RED FLAGS - Definitely too easy
  const redFlags = {
    elementaryArithmetic: /^What is ([-\d]+\s*[\+\-\*\/]\s*[-\d]+|[-\d]+\s*[\+\-\*\/]\s*[-\d]+\s*[\+\-\*\/]\s*[-\d]+)/i,
    simpleEvaluate: /^(Evaluate|Calculate)\s+\d+[\^\+\-\*\/].{0,20}$/i,
    basicConversion: /^(How many|What is|Convert)\s+(millimeters|centimeters|meters|grams|pounds).{0,50}$/i,
    noVerb: length < 30 && !text.match(/[A-Z][a-z]+\s+(has|is|are|travels|costs|needs|wants|buys|sells|measures)/),
    markedEasy: question.difficulty === 'easy' && length < 60
  };

  // Count red flags
  const flagCount = Object.values(redFlags).filter(Boolean).length;

  // YELLOW FLAGS - Questionable
  const yellowFlags = {
    tooShort: length < 40,
    noContext: !text.match(/[A-Z][a-z]+\s+(has|is|are|travels|costs|needs|wants|buys|sells|measures|pays|earns|plans)/),
    singleWord: text.split(' ').length < 8,
    noQuestion: !text.includes('?') && length < 50
  };

  const yellowCount = Object.values(yellowFlags).filter(Boolean).length;

  // Decision logic
  if (flagCount >= 1) return { quality: 'TOO_EASY', flags: redFlags, yellowFlags };
  if (yellowCount >= 3) return { quality: 'QUESTIONABLE', flags: redFlags, yellowFlags };
  if (length >= 60 && text.match(/[A-Z][a-z]+\s+(has|is|are|travels|costs|needs)/)) {
    return { quality: 'GOOD', flags: redFlags, yellowFlags };
  }

  return { quality: 'ACCEPTABLE', flags: redFlags, yellowFlags };
}

async function strictACTAudit() {
  console.log('='.repeat(100));
  console.log('STRICT ACT STANDARDS AUDIT - Comparing Against Real ACT Questions');
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
  console.log('Analyzing against strict ACT standards...\n');

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

    const assessment = isACTQuality(q);
    categories[assessment.quality].push({
      id: q.id,
      title: q.title,
      subject: q.subject,
      difficulty: q.difficulty,
      text: q.problem_text,
      length: q.problem_text?.length || 0,
      flags: assessment.flags,
      yellowFlags: assessment.yellowFlags
    });
  });

  console.log('\n' + '='.repeat(100));
  console.log('STRICT ACT STANDARDS RESULTS:');
  console.log('='.repeat(100));
  console.log(`\nTotal Questions: ${allQuestions.length}\n`);

  console.log('QUALITY DISTRIBUTION:');
  console.log('-'.repeat(100));
  console.log(`❌ TOO EASY (elementary level):        ${categories.TOO_EASY.length.toString().padStart(4)} (${(categories.TOO_EASY.length/allQuestions.length*100).toFixed(1)}%)`);
  console.log(`⚠️  QUESTIONABLE (below ACT standard): ${categories.QUESTIONABLE.length.toString().padStart(4)} (${(categories.QUESTIONABLE.length/allQuestions.length*100).toFixed(1)}%)`);
  console.log(`✓  ACCEPTABLE (minimal ACT standard):  ${categories.ACCEPTABLE.length.toString().padStart(4)} (${(categories.ACCEPTABLE.length/allQuestions.length*100).toFixed(1)}%)`);
  console.log(`✅ GOOD (meets ACT standards):         ${categories.GOOD.length.toString().padStart(4)} (${(categories.GOOD.length/allQuestions.length*100).toFixed(1)}%)`);

  const needsWork = categories.TOO_EASY.length + categories.QUESTIONABLE.length;
  console.log(`\n${'='.repeat(100)}`);
  console.log(`TOTAL NEEDING IMPROVEMENT: ${needsWork} (${(needsWork/allQuestions.length*100).toFixed(1)}%)`);
  console.log('='.repeat(100));

  // Show examples
  console.log('\n❌ EXAMPLES OF TOO EASY (first 20):');
  console.log('-'.repeat(100));
  categories.TOO_EASY.slice(0, 20).forEach((q, i) => {
    console.log(`\n${i+1}. [${q.difficulty}] ${q.title} (${q.length} chars)`);
    console.log(`   "${q.text}"`);
    const activeFlags = Object.entries(q.flags).filter(([k, v]) => v).map(([k]) => k);
    if (activeFlags.length > 0) {
      console.log(`   Flags: ${activeFlags.join(', ')}`);
    }
  });

  console.log('\n\n⚠️  EXAMPLES OF QUESTIONABLE (first 20):');
  console.log('-'.repeat(100));
  categories.QUESTIONABLE.slice(0, 20).forEach((q, i) => {
    console.log(`\n${i+1}. [${q.difficulty}] ${q.title} (${q.length} chars)`);
    console.log(`   "${q.text}"`);
    const activeYellow = Object.entries(q.yellowFlags).filter(([k, v]) => v).map(([k]) => k);
    if (activeYellow.length > 0) {
      console.log(`   Issues: ${activeYellow.join(', ')}`);
    }
  });

  console.log('\n\n✅ EXAMPLES OF GOOD QUESTIONS (first 10):');
  console.log('-'.repeat(100));
  categories.GOOD.slice(0, 10).forEach((q, i) => {
    console.log(`\n${i+1}. [${q.difficulty}] ${q.title} (${q.length} chars)`);
    console.log(`   "${q.text}"`);
  });

  // Save detailed report
  fs.writeFileSync('/tmp/strict_act_audit.json', JSON.stringify({
    summary: {
      total: allQuestions.length,
      tooEasy: categories.TOO_EASY.length,
      questionable: categories.QUESTIONABLE.length,
      acceptable: categories.ACCEPTABLE.length,
      good: categories.GOOD.length,
      needsImprovement: needsWork,
      percentNeedsWork: (needsWork/allQuestions.length*100).toFixed(1)
    },
    categories: {
      tooEasy: categories.TOO_EASY,
      questionable: categories.QUESTIONABLE,
      acceptable: categories.ACCEPTABLE,
      good: categories.GOOD
    }
  }, null, 2));

  console.log('\n' + '='.repeat(100));
  console.log('📄 Full strict audit saved to: /tmp/strict_act_audit.json');
  console.log('='.repeat(100));
}

strictACTAudit().catch(console.error);
