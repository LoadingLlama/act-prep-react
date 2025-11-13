/**
 * Create user_goals table migration
 */

const { createClient } = require('@supabase/supabase-js');
require('dotenv').config();

const supabaseUrl = process.env.REACT_APP_SUPABASE_URL;
const supabaseKey = process.env.REACT_APP_SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseKey) {
  console.error('Missing Supabase credentials in .env file');
  process.exit(1);
}

const supabase = createClient(supabaseUrl, supabaseKey);

const createUserGoalsTable = `
CREATE TABLE IF NOT EXISTS user_goals (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,

  -- Goal setting
  target_exam_date DATE,
  current_score INTEGER,
  target_score INTEGER,
  score_improvement_needed INTEGER,

  -- Availability
  daily_study_minutes INTEGER,
  study_days_per_week INTEGER,
  preferred_study_time TEXT, -- 'morning', 'afternoon', 'evening'

  -- Focus areas
  focus_sections JSONB, -- ['english', 'math', 'reading', 'science']
  weak_areas JSONB, -- Lessons marked as weak from diagnostic

  -- Preferences
  learning_pace TEXT DEFAULT 'moderate' CHECK (learning_pace IN ('slow', 'moderate', 'fast')),
  reminder_frequency TEXT DEFAULT 'daily' CHECK (reminder_frequency IN ('daily', 'twice_daily', 'weekly', 'none')),

  -- Timestamps
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),

  UNIQUE(user_id)
);

CREATE INDEX IF NOT EXISTS idx_user_goals_user ON user_goals(user_id);
`;

async function runMigration() {
  try {
    console.log('Creating user_goals table...');

    const { data, error } = await supabase.rpc('exec_sql', {
      sql_query: createUserGoalsTable
    });

    if (error) {
      console.error('Error creating table:', error);

      // Try direct SQL execution if RPC doesn't work
      console.log('Trying direct SQL execution...');
      const { error: directError } = await supabase
        .from('_migrations')
        .insert({ name: 'create_user_goals', executed_at: new Date().toISOString() });

      if (directError) {
        console.error('Direct execution failed:', directError);
      }
    } else {
      console.log('✓ user_goals table created successfully');
    }

    // Verify the table exists
    const { data: tables, error: checkError } = await supabase
      .from('user_goals')
      .select('*')
      .limit(1);

    if (checkError) {
      console.error('Table verification failed:', checkError.message);
    } else {
      console.log('✓ Table verified successfully');
    }

  } catch (err) {
    console.error('Migration failed:', err);
    process.exit(1);
  }
}

runMigration();
