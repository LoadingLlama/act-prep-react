/**
 * Add image_url column to math and science tables
 * This allows storing images for specific questions and passages
 */

import { createClient } from '@supabase/supabase-js';
import * as dotenv from 'dotenv';

dotenv.config();

const supabase = createClient(
  process.env.REACT_APP_SUPABASE_URL,
  process.env.SUPABASE_SERVICE_ROLE_KEY
);

async function addImageUrlColumn() {
  console.log('📊 Adding image_url column to math and science questions tables...\n');

  try {
    // Check if column already exists in math table
    const { data: mathData, error: mathCheckError } = await supabase
      .from('practice_test_math_questions')
      .select('image_url')
      .limit(1);

    if (mathCheckError && mathCheckError.code === '42703') {
      console.log('Adding image_url column to practice_test_math_questions...');

      const { error: mathError } = await supabase.rpc('exec_sql', {
        sql: 'ALTER TABLE practice_test_math_questions ADD COLUMN image_url TEXT;'
      });

      if (mathError) {
        console.log('Note: You may need to add this column manually in Supabase Dashboard:');
        console.log('ALTER TABLE practice_test_math_questions ADD COLUMN image_url TEXT;');
      } else {
        console.log('✅ Added image_url to practice_test_math_questions');
      }
    } else {
      console.log('✅ image_url column already exists in practice_test_math_questions');
    }

    // Check if column already exists in science table
    const { data: scienceData, error: scienceCheckError } = await supabase
      .from('practice_test_science_questions')
      .select('image_url')
      .limit(1);

    if (scienceCheckError && scienceCheckError.code === '42703') {
      console.log('Adding image_url column to practice_test_science_questions...');

      const { error: scienceError } = await supabase.rpc('exec_sql', {
        sql: 'ALTER TABLE practice_test_science_questions ADD COLUMN image_url TEXT;'
      });

      if (scienceError) {
        console.log('Note: You may need to add this column manually in Supabase Dashboard:');
        console.log('ALTER TABLE practice_test_science_questions ADD COLUMN image_url TEXT;');
      } else {
        console.log('✅ Added image_url to practice_test_science_questions');
      }
    } else {
      console.log('✅ image_url column already exists in practice_test_science_questions');
    }

    // Check if column already exists in science passages table
    const { data: sciencePassagesData, error: sciencePassagesCheckError } = await supabase
      .from('practice_test_science_passages')
      .select('image_url')
      .limit(1);

    if (sciencePassagesCheckError && sciencePassagesCheckError.code === '42703') {
      console.log('Adding image_url column to practice_test_science_passages...');

      const { error: sciencePassagesError } = await supabase.rpc('exec_sql', {
        sql: 'ALTER TABLE practice_test_science_passages ADD COLUMN image_url TEXT;'
      });

      if (sciencePassagesError) {
        console.log('Note: You may need to add this column manually in Supabase Dashboard:');
        console.log('ALTER TABLE practice_test_science_passages ADD COLUMN image_url TEXT;');
      } else {
        console.log('✅ Added image_url to practice_test_science_passages');
      }
    } else {
      console.log('✅ image_url column already exists in practice_test_science_passages');
    }

    console.log('\n✅ Migration complete!');
    console.log('\n📝 Manual SQL (if needed):');
    console.log('ALTER TABLE practice_test_math_questions ADD COLUMN IF NOT EXISTS image_url TEXT;');
    console.log('ALTER TABLE practice_test_science_questions ADD COLUMN IF NOT EXISTS image_url TEXT;');
    console.log('ALTER TABLE practice_test_science_passages ADD COLUMN IF NOT EXISTS image_url TEXT;');

  } catch (error) {
    console.error('❌ Error:', error.message);
  }
}

addImageUrlColumn();
