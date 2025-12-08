/**
 * Comprehensive verification of all explanations in database
 */

const { createClient } = require('@supabase/supabase-js');
require('dotenv').config();

const supabaseUrl = process.env.REACT_APP_SUPABASE_URL;
const supabaseKey = process.env.REACT_APP_SUPABASE_ANON_KEY;
const supabase = createClient(supabaseUrl, supabaseKey);

async function comprehensiveCheck() {
  console.log('🔍 COMPREHENSIVE DATABASE CHECK\n');
  console.log('='.repeat(70));

  // Check English questions specifically
  console.log('\n📝 ENGLISH QUESTIONS - DETAILED CHECK\n');

  for (let testNum = 1; testNum <= 7; testNum++) {
    const { data, error } = await supabase
      .from('practice_test_english_questions')
      .select('question_number, explanation')
      .eq('test_number', testNum)
      .order('question_number');

    if (error) {
      console.error(`❌ Error fetching Test ${testNum}:`, error);
      continue;
    }

    // Count explanations
    const withExplanation = data.filter(q => q.explanation && q.explanation.trim() !== '').length;
    const withoutExplanation = data.filter(q => !q.explanation || q.explanation.trim() === '').length;
    const detailedExplanations = data.filter(q => q.explanation && q.explanation.includes('Why Other Answers Are Wrong')).length;

    console.log(`Test ${testNum}:`);
    console.log(`  Total Questions: ${data.length}`);
    console.log(`  ✅ With Explanations: ${withExplanation}/${data.length}`);
    console.log(`  ❌ Without Explanations: ${withoutExplanation}`);
    console.log(`  📋 Detailed Format: ${detailedExplanations}`);
    console.log(`  ⚠️  Basic/Placeholder: ${withExplanation - detailedExplanations}`);

    if (withoutExplanation > 0) {
      const missing = data.filter(q => !q.explanation || q.explanation.trim() === '').map(q => q.question_number);
      console.log(`  Missing: Q${missing.join(', Q')}`);
    }
    console.log('');
  }

  // Summary
  console.log('='.repeat(70));
  console.log('\n📊 OVERALL SUMMARY\n');

  const { data: allEnglish } = await supabase
    .from('practice_test_english_questions')
    .select('test_number, explanation');

  const totalEnglish = allEnglish.length;
  const withExp = allEnglish.filter(q => q.explanation && q.explanation.trim() !== '').length;
  const detailed = allEnglish.filter(q => q.explanation && q.explanation.includes('Why Other Answers Are Wrong')).length;

  console.log(`English Questions:`);
  console.log(`  Total: ${totalEnglish}`);
  console.log(`  With Explanations: ${withExp} (${((withExp/totalEnglish)*100).toFixed(1)}%)`);
  console.log(`  Detailed Format: ${detailed} (${((detailed/totalEnglish)*100).toFixed(1)}%)`);
  console.log(`  Basic/Placeholder: ${withExp - detailed} (${(((withExp-detailed)/totalEnglish)*100).toFixed(1)}%)`);

  // Check other subjects
  const subjects = ['math', 'reading', 'science'];
  console.log('\n📚 OTHER SUBJECTS:\n');

  for (const subject of subjects) {
    const { data } = await supabase
      .from(`practice_test_${subject}_questions`)
      .select('explanation');

    const total = data.length;
    const withExp = data.filter(q => q.explanation && q.explanation.trim() !== '').length;

    console.log(`${subject.charAt(0).toUpperCase() + subject.slice(1)}:`);
    console.log(`  Total: ${total}`);
    console.log(`  With Explanations: ${withExp} (${((withExp/total)*100).toFixed(1)}%)`);
  }

  console.log('\n' + '='.repeat(70));
  console.log('\n✅ CHECK COMPLETE\n');
}

comprehensiveCheck()
  .then(() => process.exit(0))
  .catch(err => {
    console.error('Error:', err);
    process.exit(1);
  });
