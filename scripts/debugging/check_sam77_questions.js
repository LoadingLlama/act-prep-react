/**
 * Check Sam77 questions (Test 5 Math Q35-38)
 * Verify they have the correct passage/image data
 */

const { createClient } = require('@supabase/supabase-js');
require('dotenv').config();

const supabase = createClient(
  process.env.REACT_APP_SUPABASE_URL,
  process.env.SUPABASE_SERVICE_ROLE_KEY
);

async function checkSam77Questions() {
  console.log('🔍 CHECKING SAM77 QUESTIONS (Test 5 Math Q35-38)\n');
  console.log('='.repeat(80));

  // Get questions 35-38 from Test 5 Math
  const { data: questions, error: qError } = await supabase
    .from('practice_test_math_questions')
    .select('*')
    .eq('test_number', 5)
    .in('question_number', [35, 36, 37, 38])
    .order('question_number', { ascending: true });

  if (qError || !questions) {
    console.log('❌ Error fetching questions:', qError);
    return;
  }

  console.log(`✓ Found ${questions.length} questions\n`);

  questions.forEach(q => {
    console.log(`\n📝 QUESTION ${q.question_number}`);
    console.log('-'.repeat(80));
    console.log('Question Text:');
    console.log(q.question_text);
    console.log('\nHas passage_id:', q.passage_id || 'NO');
    console.log('Has image_url:', q.image_url || 'NO');

    if (q.image_url) {
      console.log('Image URL:', q.image_url);
    }

    // Check for italic spacing issues
    const hasSpacingIssue = /\w<\/?i>|<\/?i>\w/.test(q.question_text);
    if (hasSpacingIssue) {
      console.log('⚠️ SPACING ISSUE DETECTED around <i> tags');

      // Show the specific issues
      const matches = q.question_text.match(/\w<\/?i>|<\/?i>\w/g);
      console.log('Issues found:', matches);
    }

    try {
      console.log('\nChoices:', typeof q.choices === 'string' ? JSON.parse(q.choices) : q.choices);
    } catch (e) {
      console.log('\nChoices (raw):', q.choices);
      console.log('⚠️ JSON parse error:', e.message);
    }
  });

  // Check if there's a "passage" that these questions might share
  console.log('\n' + '='.repeat(80));
  console.log('\n🔍 CHECKING FOR SHARED PASSAGE/TABLE\n');

  // Math doesn't have passages table, but let's check if these questions
  // should have a shared image_url (table)
  const uniqueImageUrls = [...new Set(questions.map(q => q.image_url).filter(Boolean))];

  if (uniqueImageUrls.length > 0) {
    console.log(`✓ Found ${uniqueImageUrls.length} unique image URL(s) for these questions:`);
    uniqueImageUrls.forEach(url => {
      console.log(`  ${url}`);
      const questionsWithThisImage = questions.filter(q => q.image_url === url);
      console.log(`  Used by questions: ${questionsWithThisImage.map(q => q.question_number).join(', ')}`);
    });
  } else {
    console.log('⚠️ NO image URLs found for these questions');
    console.log('   These questions might need a shared table/image added to the database');
  }

  console.log('\n' + '='.repeat(80));
  console.log('CHECK COMPLETE\n');
}

checkSam77Questions().catch(console.error);
