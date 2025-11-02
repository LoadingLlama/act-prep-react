#!/usr/bin/env node

/**
 * Run migration to add image_url columns directly in Supabase
 */

import { createClient } from '@supabase/supabase-js';
import dotenv from 'dotenv';

dotenv.config();

const supabase = createClient(
  process.env.REACT_APP_SUPABASE_URL,
  process.env.SUPABASE_SERVICE_ROLE_KEY
);

async function runMigration() {
  console.log('🔧 Running migration to add image_url columns...\n');

  try {
    // Use Supabase RPC to execute raw SQL
    // Note: This requires a database function to be created first, OR
    // we need to use the REST API directly

    // For now, let's try using the SQL endpoint
    const { data, error } = await supabase.rpc('exec_sql', {
      sql: `
        ALTER TABLE practice_test_science_passages
        ADD COLUMN IF NOT EXISTS image_url_1 TEXT,
        ADD COLUMN IF NOT EXISTS image_url_2 TEXT,
        ADD COLUMN IF NOT EXISTS image_url_3 TEXT,
        ADD COLUMN IF NOT EXISTS image_url_4 TEXT,
        ADD COLUMN IF NOT EXISTS image_url_5 TEXT;

        ALTER TABLE practice_test_reading_passages
        ADD COLUMN IF NOT EXISTS image_url_1 TEXT,
        ADD COLUMN IF NOT EXISTS image_url_2 TEXT,
        ADD COLUMN IF NOT EXISTS image_url_3 TEXT;

        ALTER TABLE practice_test_english_passages
        ADD COLUMN IF NOT EXISTS image_url_1 TEXT,
        ADD COLUMN IF NOT EXISTS image_url_2 TEXT;
      `
    });

    if (error) {
      console.error('❌ Error running migration:', error.message);
      console.log('\n📋 Please run this SQL manually in Supabase Dashboard → SQL Editor:\n');
      console.log(`
ALTER TABLE practice_test_science_passages
ADD COLUMN IF NOT EXISTS image_url_1 TEXT,
ADD COLUMN IF NOT EXISTS image_url_2 TEXT,
ADD COLUMN IF NOT EXISTS image_url_3 TEXT,
ADD COLUMN IF NOT EXISTS image_url_4 TEXT,
ADD COLUMN IF NOT EXISTS image_url_5 TEXT;

ALTER TABLE practice_test_reading_passages
ADD COLUMN IF NOT EXISTS image_url_1 TEXT,
ADD COLUMN IF NOT EXISTS image_url_2 TEXT,
ADD COLUMN IF NOT EXISTS image_url_3 TEXT;

ALTER TABLE practice_test_english_passages
ADD COLUMN IF NOT EXISTS image_url_1 TEXT,
ADD COLUMN IF NOT EXISTS image_url_2 TEXT;
      `);
      return;
    }

    console.log('✅ Successfully added image_url columns!');
    console.log('\n📋 Columns added:');
    console.log('   - practice_test_science_passages: image_url_1 through image_url_5');
    console.log('   - practice_test_reading_passages: image_url_1 through image_url_3');
    console.log('   - practice_test_english_passages: image_url_1 through image_url_2');
    console.log('\n🎉 Ready to add images to passages!\n');

  } catch (error) {
    console.error('❌ Error:', error.message);
    console.log('\n📋 Please run the SQL manually in Supabase Dashboard → SQL Editor');
  }
}

runMigration().then(() => process.exit(0));
