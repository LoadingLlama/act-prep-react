import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://rabavobdklnwvwsldbix.supabase.co';
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InJhYmF2b2Jka2xud3Z3c2xkYml4Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTk3NjU0NzgsImV4cCI6MjA3NTM0MTQ3OH0.z_1N3TG-cS9Bc1s7UAif91PkIjhBKvicrUqupiNP80Y';

const supabase = createClient(supabaseUrl, supabaseKey);

async function createTable() {
  console.log('Creating lesson_questions table...\n');

  const sql = `
    CREATE TABLE IF NOT EXISTS lesson_questions (
      id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
      lesson_id UUID REFERENCES lessons(id) ON DELETE CASCADE,
      practice_section_title TEXT,
      practice_section_description TEXT,
      question_id INTEGER,
      passage TEXT,
      question TEXT,
      choices JSONB,
      correct_answer INTEGER,
      explanation TEXT,
      created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
      updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
    );

    CREATE INDEX IF NOT EXISTS idx_lesson_questions_lesson_id ON lesson_questions(lesson_id);
    CREATE INDEX IF NOT EXISTS idx_lesson_questions_question_id ON lesson_questions(question_id);
    CREATE UNIQUE INDEX IF NOT EXISTS idx_lesson_questions_unique ON lesson_questions(lesson_id, practice_section_title, question_id);
  `;

  // Note: The anon key typically doesn't have permissions to create tables
  // You'll need to run this SQL in the Supabase SQL Editor
  console.log('Please run this SQL in your Supabase SQL Editor:\n');
  console.log(sql);
  console.log('\nAlternatively, you can use the service role key with RPC, but for security reasons,');
  console.log('it is recommended to create the table through the Supabase dashboard.');
}

createTable();
