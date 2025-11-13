/**
 * Run user_goals table migration
 */

const { createClient } = require('@supabase/supabase-js');
require('dotenv').config();

const supabaseUrl = process.env.REACT_APP_SUPABASE_URL;
const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

if (!supabaseUrl || !supabaseKey) {
  console.error('Missing Supabase credentials in .env file');
  process.exit(1);
}

const supabase = createClient(supabaseUrl, supabaseKey, {
  auth: {
    autoRefreshToken: false,
    persistSession: false
  }
});

const createUserGoalsTableSQL = `
-- Create user_goals table
CREATE TABLE IF NOT EXISTS public.user_goals (
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
  preferred_study_time TEXT,

  -- Focus areas
  focus_sections JSONB,
  weak_areas JSONB,

  -- Preferences
  learning_pace TEXT DEFAULT 'moderate' CHECK (learning_pace IN ('slow', 'moderate', 'fast')),
  reminder_frequency TEXT DEFAULT 'daily' CHECK (reminder_frequency IN ('daily', 'twice_daily', 'weekly', 'none')),

  -- Timestamps
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),

  UNIQUE(user_id)
);

-- Create index
CREATE INDEX IF NOT EXISTS idx_user_goals_user ON public.user_goals(user_id);

-- Enable RLS
ALTER TABLE public.user_goals ENABLE ROW LEVEL SECURITY;

-- Drop existing policies if they exist
DROP POLICY IF EXISTS "Users can view their own goals" ON public.user_goals;
DROP POLICY IF EXISTS "Users can insert their own goals" ON public.user_goals;
DROP POLICY IF EXISTS "Users can update their own goals" ON public.user_goals;
DROP POLICY IF EXISTS "Users can delete their own goals" ON public.user_goals;

-- Create policies
CREATE POLICY "Users can view their own goals"
  ON public.user_goals
  FOR SELECT
  USING (auth.uid() = user_id);

CREATE POLICY "Users can insert their own goals"
  ON public.user_goals
  FOR INSERT
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update their own goals"
  ON public.user_goals
  FOR UPDATE
  USING (auth.uid() = user_id)
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can delete their own goals"
  ON public.user_goals
  FOR DELETE
  USING (auth.uid() = user_id);
`;

async function runMigration() {
  try {
    console.log('🚀 Starting user_goals table migration...\n');

    // Execute the SQL using the REST API directly
    const response = await fetch(`${supabaseUrl}/rest/v1/rpc/exec`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'apikey': supabaseKey,
        'Authorization': `Bearer ${supabaseKey}`
      },
      body: JSON.stringify({ query: createUserGoalsTableSQL })
    });

    // Try using Supabase query method
    console.log('Executing SQL migration...');
    const { data, error } = await supabase.rpc('exec', {
      query: createUserGoalsTableSQL
    });

    if (error) {
      console.error('❌ RPC method failed, trying direct query...');

      // Split into individual statements and execute them
      const statements = createUserGoalsTableSQL
        .split(';')
        .map(s => s.trim())
        .filter(s => s.length > 0 && !s.startsWith('--'));

      console.log(`Found ${statements.length} SQL statements to execute\n`);

      for (let i = 0; i < statements.length; i++) {
        const stmt = statements[i];
        if (stmt.length > 0) {
          console.log(`Executing statement ${i + 1}/${statements.length}...`);

          try {
            // Use fetch to execute raw SQL
            const response = await fetch(`${supabaseUrl}/rest/v1/`, {
              method: 'POST',
              headers: {
                'Content-Type': 'application/json',
                'apikey': supabaseKey,
                'Authorization': `Bearer ${supabaseKey}`,
                'Prefer': 'return=minimal'
              },
              body: JSON.stringify({ query: stmt })
            });

            if (!response.ok) {
              console.log(`⚠️  Statement ${i + 1} response: ${response.status}`);
            } else {
              console.log(`✓ Statement ${i + 1} executed`);
            }
          } catch (err) {
            console.log(`⚠️  Statement ${i + 1} error:`, err.message);
          }
        }
      }
    } else {
      console.log('✓ Migration executed via RPC');
    }

    // Verify the table exists by trying to query it
    console.log('\n🔍 Verifying table creation...');
    const { data: testData, error: testError } = await supabase
      .from('user_goals')
      .select('id')
      .limit(1);

    if (testError) {
      console.error('❌ Table verification failed:', testError.message);
      console.log('\n📝 Please run the SQL manually in Supabase Dashboard:');
      console.log('   1. Go to: https://rabavobdklnwvwsldbix.supabase.co');
      console.log('   2. Navigate to SQL Editor');
      console.log('   3. Copy the contents of: database/migrations/001_create_user_goals.sql');
      console.log('   4. Click "Run"\n');
    } else {
      console.log('✅ user_goals table verified successfully!\n');
    }

  } catch (err) {
    console.error('❌ Migration failed:', err.message);
    console.log('\n📝 Please run the SQL manually in Supabase Dashboard:');
    console.log('   1. Go to: https://rabavobdklnwvwsldbix.supabase.co');
    console.log('   2. Navigate to SQL Editor');
    console.log('   3. Copy the contents of: database/migrations/001_create_user_goals.sql');
    console.log('   4. Click "Run"\n');
    process.exit(1);
  }
}

runMigration();
