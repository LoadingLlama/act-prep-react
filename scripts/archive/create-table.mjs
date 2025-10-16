import { createClient } from '@supabase/supabase-js';
import { supabaseUrl, supabaseAnonKey } from './config.mjs';

// supabaseUrl imported from config.mjs
// supabaseAnonKey imported from config.mjs

const supabase = createClient(supabaseUrl, supabaseAnonKey);

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
