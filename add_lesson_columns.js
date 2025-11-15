/**
 * Add lesson_id columns to practice test tables
 * Simple script to add the missing columns needed for diagnostic analysis
 */

const { createClient } = require('@supabase/supabase-js');
require('dotenv').config();

const supabase = createClient(
  process.env.REACT_APP_SUPABASE_URL,
  process.env.SUPABASE_SERVICE_ROLE_KEY
);

async function addLessonColumns() {
  console.log('🔨 Adding lesson_id columns to practice test tables...\n');

  const sections = ['english', 'math', 'reading', 'science'];

  for (const section of sections) {
    const tableName = `practice_test_${section}_questions`;
    console.log(`📊 Processing ${tableName}...`);

    try {
      // Try to query with lesson_id to see if column exists
      const { data, error } = await supabase
        .from(tableName)
        .select('lesson_id')
        .limit(1);

      if (error) {
        if (error.message.includes('does not exist')) {
          console.log(`  ⚠️ lesson_id column missing - need to add it via Supabase SQL Editor`);
          console.log(`  📝 Run this SQL in Supabase Dashboard > SQL Editor:`);
          console.log(`     ALTER TABLE ${tableName} ADD COLUMN IF NOT EXISTS lesson_id TEXT REFERENCES lessons(id) ON DELETE SET NULL;`);
          console.log(`     CREATE INDEX IF NOT EXISTS idx_${section}_questions_lesson ON ${tableName}(lesson_id);`);
        } else {
          console.log(`  ❌ Error: ${error.message}`);
        }
      } else {
        console.log(`  ✅ lesson_id column already exists`);
      }
    } catch (err) {
      console.error(`  ❌ Unexpected error: ${err.message}`);
    }

    console.log('');
  }

  console.log('💡 To add the columns, please run the following SQL in your Supabase Dashboard:\n');
  console.log('-- Add lesson_id columns');
  console.log('ALTER TABLE practice_test_english_questions ADD COLUMN IF NOT EXISTS lesson_id TEXT REFERENCES lessons(id) ON DELETE SET NULL;');
  console.log('ALTER TABLE practice_test_math_questions ADD COLUMN IF NOT EXISTS lesson_id TEXT REFERENCES lessons(id) ON DELETE SET NULL;');
  console.log('ALTER TABLE practice_test_reading_questions ADD COLUMN IF NOT EXISTS lesson_id TEXT REFERENCES lessons(id) ON DELETE SET NULL;');
  console.log('ALTER TABLE practice_test_science_questions ADD COLUMN IF NOT EXISTS lesson_id TEXT REFERENCES lessons(id) ON DELETE SET NULL;');
  console.log('\n-- Add indexes');
  console.log('CREATE INDEX IF NOT EXISTS idx_english_questions_lesson ON practice_test_english_questions(lesson_id);');
  console.log('CREATE INDEX IF NOT EXISTS idx_math_questions_lesson ON practice_test_math_questions(lesson_id);');
  console.log('CREATE INDEX IF NOT EXISTS idx_reading_questions_lesson ON practice_test_reading_questions(lesson_id);');
  console.log('CREATE INDEX IF NOT EXISTS idx_science_questions_lesson ON practice_test_science_questions(lesson_id);');
  console.log('\n🔗 Go to: https://rabavobdklnwvwsldbix.supabase.co/project/_/sql');
}

addLessonColumns();
