require('dotenv').config();
const { createClient } = require('@supabase/supabase-js');

const supabase = createClient(
  process.env.REACT_APP_SUPABASE_URL,
  process.env.SUPABASE_SERVICE_ROLE_KEY
);

async function checkScienceQuestions() {
  console.log('\n🔍 Checking Science Questions in Database\n');

  // Get all science questions from practice_test_science_questions
  const { data: scienceQuestions, error } = await supabase
    .from('practice_test_science_questions')
    .select('id, question_number, question_text, test_number')
    .eq('test_number', 1)
    .order('question_number', { ascending: true });

  if (error) {
    console.error('❌ Error loading science questions:', error);
    return;
  }

  console.log(`📊 Total science questions found: ${scienceQuestions.length}`);
  console.log('\n📋 Question breakdown:');

  scienceQuestions.forEach((q, idx) => {
    console.log(`  Q${q.question_number}: ID=${q.id} | Text=${q.question_text?.substring(0, 50)}...`);
  });

  // Check for gaps
  const questionNumbers = scienceQuestions.map(q => q.question_number).sort((a, b) => a - b);
  console.log('\n📐 Question numbers:', questionNumbers.join(', '));

  // Find missing numbers
  const missing = [];
  for (let i = 1; i <= 40; i++) {
    if (!questionNumbers.includes(i)) {
      missing.push(i);
    }
  }

  if (missing.length > 0) {
    console.log('\n⚠️  MISSING QUESTIONS:', missing.join(', '));
  } else {
    console.log('\n✅ All questions 1-40 present');
  }

  // Check if questions 17-40 exist
  const q17to40 = scienceQuestions.filter(q => q.question_number >= 17 && q.question_number <= 40);
  console.log(`\n🔍 Questions 17-40: ${q17to40.length} found`);

  if (q17to40.length < 24) {
    console.log('❌ CRITICAL: Missing questions in range 17-40!');
  }
}

checkScienceQuestions()
  .then(() => process.exit(0))
  .catch(err => {
    console.error('💥 Fatal error:', err);
    process.exit(1);
  });
