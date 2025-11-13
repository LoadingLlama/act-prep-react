/**
 * Add difficulty field to lesson_examples and update all records
 */

const { createClient } = require('@supabase/supabase-js');
require('dotenv').config();

const supabaseUrl = process.env.REACT_APP_SUPABASE_URL;
const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

const supabase = createClient(supabaseUrl, supabaseKey);

async function addDifficultyField() {
  console.log('🚀 Adding difficulty field and updating records...\n');

  const lessonId = 'a5fd241f-9832-4a5d-a7e9-90cb6232c4ac';

  try {
    // Note: Column should be added via Supabase dashboard or SQL
    // This script will update the difficulty values for each position

    // Define difficulty mapping based on position
    const difficultyMap = {
      // Questions 1-4 (original)
      1: 'medium', 2: 'medium', 3: 'medium', 4: 'medium',
      // Questions 5-14 (easy)
      5: 'easy', 6: 'easy', 7: 'easy', 8: 'easy', 9: 'easy',
      10: 'easy', 11: 'easy', 12: 'easy', 13: 'easy', 14: 'easy',
      // Questions 15-34 (medium)
      15: 'medium', 16: 'medium', 17: 'medium', 18: 'medium', 19: 'medium',
      20: 'medium', 21: 'medium', 22: 'medium', 23: 'medium', 24: 'medium',
      25: 'medium', 26: 'medium', 27: 'medium', 28: 'medium', 29: 'medium',
      30: 'medium', 31: 'medium', 32: 'medium', 33: 'medium', 34: 'medium',
      // Questions 35-44 (hard)
      35: 'hard', 36: 'hard', 37: 'hard', 38: 'hard', 39: 'hard',
      40: 'hard', 41: 'hard', 42: 'hard', 43: 'hard', 44: 'hard',
      // Questions 45-50 (ultrathink)
      45: 'ultrathink', 46: 'ultrathink', 47: 'ultrathink', 48: 'ultrathink',
      49: 'ultrathink', 50: 'ultrathink'
    };

    console.log('📝 Updating difficulty for each question...\n');

    for (let position = 1; position <= 50; position++) {
      const difficulty = difficultyMap[position];

      const { error } = await supabase
        .from('lesson_examples')
        .update({ difficulty })
        .eq('lesson_id', lessonId)
        .eq('position', position);

      if (error) {
        console.error(`  ❌ Error updating position ${position}:`, error.message);
      } else {
        console.log(`  ✅ Position ${position}: ${difficulty}`);
      }
    }

    // Verify
    console.log('\n🔍 Verifying updates...');
    const { data, error: verifyError } = await supabase
      .from('lesson_examples')
      .select('position, title, difficulty')
      .eq('lesson_id', lessonId)
      .order('position');

    if (verifyError) {
      console.error('❌ Verification error:', verifyError.message);
    } else {
      console.log('\n📊 Difficulty distribution:');
      const counts = {
        easy: data.filter(d => d.difficulty === 'easy').length,
        medium: data.filter(d => d.difficulty === 'medium').length,
        hard: data.filter(d => d.difficulty === 'hard').length,
        ultrathink: data.filter(d => d.difficulty === 'ultrathink').length
      };
      console.table(counts);

      console.log('\n📋 First 10 questions:');
      console.table(data.slice(0, 10));
    }

    console.log('\n✅ All difficulty levels updated!');

  } catch (error) {
    console.error('\n❌ Error:', error);
    process.exit(1);
  }
}

addDifficultyField();
