/**
 * Add missing columns to user_goals table
 */
const { createClient } = require('@supabase/supabase-js');
require('dotenv').config();

const supabaseUrl = process.env.REACT_APP_SUPABASE_URL;
const serviceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY;
const supabase = createClient(supabaseUrl, serviceRoleKey);

async function addColumns() {
  console.log('🔄 Adding missing columns to user_goals table...\n');

  try {
    // Check if we can add columns via SQL
    const { error } = await supabase.rpc('exec_sql', {
      sql: `
        -- Add study_hours_per_week column if it doesn't exist
        DO $$
        BEGIN
          IF NOT EXISTS (
            SELECT 1 FROM information_schema.columns
            WHERE table_name = 'user_goals' AND column_name = 'study_hours_per_week'
          ) THEN
            ALTER TABLE user_goals ADD COLUMN study_hours_per_week INTEGER DEFAULT 6;
          END IF;
        END $$;

        -- Add grade column if it doesn't exist
        DO $$
        BEGIN
          IF NOT EXISTS (
            SELECT 1 FROM information_schema.columns
            WHERE table_name = 'user_goals' AND column_name = 'grade'
          ) THEN
            ALTER TABLE user_goals ADD COLUMN grade TEXT;
          END IF;
        END $$;

        -- Add study_experience column if it doesn't exist
        DO $$
        BEGIN
          IF NOT EXISTS (
            SELECT 1 FROM information_schema.columns
            WHERE table_name = 'user_goals' AND column_name = 'study_experience'
          ) THEN
            ALTER TABLE user_goals ADD COLUMN study_experience TEXT DEFAULT 'never';
          END IF;
        END $$;
      `
    });

    if (error) {
      console.log('⚠️ RPC method not available. You need to add these columns manually in Supabase:');
      console.log('');
      console.log('ALTER TABLE user_goals ADD COLUMN IF NOT EXISTS study_hours_per_week INTEGER DEFAULT 6;');
      console.log('ALTER TABLE user_goals ADD COLUMN IF NOT EXISTS grade TEXT;');
      console.log('ALTER TABLE user_goals ADD COLUMN IF NOT EXISTS study_experience TEXT DEFAULT \'never\';');
      console.log('');
      console.log('Run these SQL commands in the Supabase SQL Editor.');
    } else {
      console.log('✅ Columns added successfully!');
    }
  } catch (err) {
    console.error('❌ Error:', err.message);
    console.log('');
    console.log('Please add these columns manually in Supabase SQL Editor:');
    console.log('');
    console.log('ALTER TABLE user_goals ADD COLUMN IF NOT EXISTS study_hours_per_week INTEGER DEFAULT 6;');
    console.log('ALTER TABLE user_goals ADD COLUMN IF NOT EXISTS grade TEXT;');
    console.log('ALTER TABLE user_goals ADD COLUMN IF NOT EXISTS study_experience TEXT DEFAULT \'never\';');
  }
}

addColumns().catch(console.error);
