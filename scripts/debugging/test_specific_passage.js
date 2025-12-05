/**
 * Test a specific passage to see if image URLs are being processed correctly
 */

const { createClient } = require('@supabase/supabase-js');
require('dotenv').config();

const supabase = createClient(
  process.env.REACT_APP_SUPABASE_URL,
  process.env.SUPABASE_SERVICE_ROLE_KEY
);

async function testSpecificPassage() {
  console.log('🔍 TESTING SPECIFIC PASSAGE RENDERING\n');
  console.log('='.repeat(80));

  // Get Test 2 Science Passage 1 (which has images)
  const { data: passage, error: pError } = await supabase
    .from('practice_test_science_passages')
    .select('*')
    .eq('test_number', 2)
    .eq('passage_number', 1)
    .single();

  if (pError || !passage) {
    console.log('❌ Error fetching passage:', pError);
    return;
  }

  console.log('\n📄 PASSAGE DATA:');
  console.log(`  Passage Number: ${passage.passage_number}`);
  console.log(`  Test Number: ${passage.test_number}`);
  console.log(`  Title: ${passage.passage_title}`);
  console.log('\n📦 IMAGE URLs:');
  for (let i = 1; i <= 5; i++) {
    const urlKey = `image_url_${i}`;
    if (passage[urlKey]) {
      console.log(`  ${urlKey}: ${passage[urlKey]}`);
    }
  }

  console.log('\n📝 PASSAGE TEXT (first 500 chars):');
  console.log(passage.passage_text.substring(0, 500));

  console.log('\n🔍 CHECKING FOR PLACEHOLDERS:');
  const placeholders = passage.passage_text.match(/\{\{image\d+\}\}/g) || [];
  console.log(`  Found ${placeholders.length} placeholders: ${placeholders.join(', ')}`);

  // Now simulate what the service does
  console.log('\n🔧 SIMULATING SERVICE TRANSFORMATION:');
  const imageUrls = {};
  for (let i = 1; i <= 5; i++) {
    const urlKey = `image_url_${i}`;
    if (passage[urlKey]) {
      imageUrls[`image${i}`] = passage[urlKey];
    }
  }
  console.log('  imageUrls object:', JSON.stringify(imageUrls, null, 2));

  // Simulate the replacement
  console.log('\n🎨 SIMULATING PLACEHOLDER REPLACEMENT:');
  let result = passage.passage_text;
  Object.keys(imageUrls).forEach(key => {
    const placeholder = `{{${key}}}`;
    const url = imageUrls[key];
    const imgTag = `<img src="${url}" alt="Figure or Table" class="passage-image" />`;
    console.log(`  Replacing ${placeholder} with <img> tag`);
    result = result.replace(new RegExp(placeholder, 'g'), imgTag);
  });

  console.log('\n✅ RESULT (first 800 chars):');
  console.log(result.substring(0, 800));

  // Check if replacement worked
  const remainingPlaceholders = result.match(/\{\{image\d+\}\}/g) || [];
  if (remainingPlaceholders.length > 0) {
    console.log(`\n❌ WARNING: ${remainingPlaceholders.length} placeholders NOT replaced: ${remainingPlaceholders.join(', ')}`);
  } else {
    console.log('\n✓ All placeholders successfully replaced!');
  }

  // Now check the questions for this passage
  console.log('\n' + '='.repeat(80));
  console.log('\n📋 CHECKING QUESTIONS FOR THIS PASSAGE\n');

  const { data: questions, error: qError } = await supabase
    .from('practice_test_science_questions')
    .select('*')
    .eq('test_number', 2)
    .eq('passage_id', passage.id)
    .order('question_number', { ascending: true });

  if (qError || !questions) {
    console.log('❌ Error fetching questions:', qError);
    return;
  }

  console.log(`Found ${questions.length} questions linked to this passage`);
  questions.forEach(q => {
    console.log(`  Q${q.question_number}: ${q.question_text.substring(0, 60)}...`);
  });

  console.log('\n' + '='.repeat(80));
  console.log('TEST COMPLETE\n');
}

testSpecificPassage().catch(console.error);
