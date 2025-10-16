import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://rabavobdklnwvwsldbix.supabase.co';
const supabaseServiceKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InJhYmF2b2Jka2xud3Z3c2xkYml4Iiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTczNjg4NjI4OSwiZXhwIjoyMDUyNDYyMjg5fQ.vNzxWwK_9-KX3vJPqCqJ7Dq0KKxJ5nY9v-vZLPxqHqCqX5wZ4Jk8';
const supabase = createClient(supabaseUrl, supabaseServiceKey);

const createTableSQL = `
-- Examples Table Schema
-- Stores all lesson examples separately from HTML content

CREATE TABLE IF NOT EXISTS examples (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  lesson_id UUID NOT NULL REFERENCES lesson_metadata(id) ON DELETE CASCADE,

  -- Position and metadata
  position INTEGER NOT NULL,
  title TEXT NOT NULL,

  -- Problem data
  problem_text TEXT NOT NULL,

  -- Answer choices (JSON array for flexibility)
  choices JSONB,
  correct_answer TEXT,

  -- Solution data
  solution_steps JSONB NOT NULL,
  answer_explanation TEXT,

  -- Optional fields
  diagram_svg TEXT,
  is_worked_example BOOLEAN DEFAULT FALSE,

  -- Metadata
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW(),

  -- Constraints
  UNIQUE(lesson_id, position)
);

-- Index for fast lookup by lesson
CREATE INDEX IF NOT EXISTS idx_examples_lesson_id ON examples(lesson_id);

-- Index for ordering
CREATE INDEX IF NOT EXISTS idx_examples_lesson_position ON examples(lesson_id, position);
`;

async function createTable() {
  console.log('🔧 Creating examples table in Supabase...\n');

  try {
    const { data, error } = await supabase.rpc('exec_sql', {
      sql_query: createTableSQL
    });

    if (error) {
      // Try alternative method using direct SQL execution
      const { error: directError } = await supabase
        .from('examples')
        .select('id')
        .limit(1);

      if (directError && directError.code === '42P01') {
        // Table doesn't exist, need to create it manually via Supabase dashboard
        console.log('❌ Cannot create table programmatically.');
        console.log('\n📋 Please run this SQL in Supabase SQL Editor:');
        console.log('https://supabase.com/dashboard/project/rabavobdklnwvwsldbix/sql/new\n');
        console.log(createTableSQL);
        console.log('\n✅ After running the SQL, run: node scripts/migrate-examples-to-db.mjs');
        return false;
      }

      console.log('✅ Table already exists!');
      return true;
    }

    console.log('✅ Table created successfully!');
    return true;
  } catch (err) {
    console.error('Error:', err.message);
    console.log('\n📋 Please create the table manually in Supabase SQL Editor:');
    console.log('https://supabase.com/dashboard/project/rabavobdklnwvwsldbix/sql/new\n');
    console.log(createTableSQL);
    return false;
  }
}

createTable();
