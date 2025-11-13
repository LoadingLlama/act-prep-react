/**
 * Test adding difficulty field by inserting a dummy record
 */

const { createClient } = require('@supabase/supabase-js');
require('dotenv').config();

const supabaseUrl = process.env.REACT_APP_SUPABASE_URL;
const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

const supabase = createClient(supabaseUrl, supabaseKey);

async function testAddDifficulty() {
  console.log('🔧 Attempting to add difficulty field...\n');

  const lessonId = 'a5fd241f-9832-4a5d-a7e9-90cb6232c4ac';

  try {
    // Try to update the first record with difficulty
    const { data: firstRecord } = await supabase
      .from('lesson_examples')
      .select('id')
      .eq('lesson_id', lessonId)
      .eq('position', 1)
      .single();

    if (!firstRecord) {
      console.error('❌ No record found');
      return;
    }

    console.log('📝 Trying to update record with difficulty field...');
    const { data, error } = await supabase
      .from('lesson_examples')
      .update({ difficulty: 'medium' })
      .eq('id', firstRecord.id)
      .select();

    if (error) {
      console.error('❌ Error:', error.message);
      console.log('\n📋 You need to add the column manually:');
      console.log('1. Go to: https://rabavobdklnwvwsldbix.supabase.co/project/_/editor');
      console.log('2. Click on SQL Editor');
      console.log('3. Run this SQL:');
      console.log('\n   ALTER TABLE lesson_examples ADD COLUMN difficulty TEXT;\n');
      console.log('4. Then run: node database/migrations/add_difficulty_field.js');
    } else {
      console.log('✅ Success! Difficulty field was added.');
      console.log('Now run: node database/migrations/add_difficulty_field.js');
    }

  } catch (error) {
    console.error('❌ Error:', error.message);
  }
}

testAddDifficulty();
