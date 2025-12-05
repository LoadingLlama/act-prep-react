/**
 * Fix Sam77 questions - add missing image_url to Q36, Q37, Q38
 * All 4 questions share the same table image
 */

const { createClient } = require('@supabase/supabase-js');
require('dotenv').config();

const supabase = createClient(
  process.env.REACT_APP_SUPABASE_URL,
  process.env.SUPABASE_SERVICE_ROLE_KEY
);

async function fixSam77Images() {
  console.log('🔧 FIXING SAM77 QUESTIONS - Adding missing image_url\n');
  console.log('='.repeat(80));

  // The image URL that Q35 has
  const imageUrl = 'https://rabavobdklnwvwsldbix.supabase.co/storage/v1/object/public/test-images/M535.jpg';

  // Update Q36, Q37, Q38 to have the same image_url
  const questionsToUpdate = [36, 37, 38];

  for (const qNum of questionsToUpdate) {
    console.log(`\n📝 Updating Question ${qNum}...`);

    const { data, error } = await supabase
      .from('practice_test_math_questions')
      .update({ image_url: imageUrl })
      .eq('test_number', 5)
      .eq('question_number', qNum)
      .select();

    if (error) {
      console.log(`❌ Error updating Q${qNum}:`, error.message);
    } else {
      console.log(`✓ Successfully updated Q${qNum}`);
      console.log(`  Set image_url to: ${imageUrl}`);
    }
  }

  console.log('\n' + '='.repeat(80));
  console.log('\n✅ VERIFICATION - Checking all 4 questions now have the image:\n');

  const { data: questions, error } = await supabase
    .from('practice_test_math_questions')
    .select('question_number, image_url')
    .eq('test_number', 5)
    .in('question_number', [35, 36, 37, 38])
    .order('question_number', { ascending: true });

  if (error) {
    console.log('❌ Error verifying:', error.message);
  } else {
    questions.forEach(q => {
      const hasImage = !!q.image_url;
      console.log(`  Q${q.question_number}: ${hasImage ? '✓' : '❌'} ${hasImage ? 'Has image' : 'Missing image'}`);
    });
  }

  console.log('\n' + '='.repeat(80));
  console.log('FIX COMPLETE\n');
}

fixSam77Images().catch(console.error);
