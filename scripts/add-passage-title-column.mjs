import { createClient } from '@supabase/supabase-js';
import dotenv from 'dotenv';
dotenv.config();

const sb = createClient(process.env.REACT_APP_SUPABASE_URL, process.env.SUPABASE_SERVICE_ROLE_KEY);

console.log('📝 ADDING passage_title COLUMN TO practice_test_english_passages\n');
console.log('='.repeat(80));

// Add passage_title column using SQL
const { data, error } = await sb.rpc('exec_sql', {
  sql: `
    ALTER TABLE practice_test_english_passages
    ADD COLUMN IF NOT EXISTS passage_title TEXT;
  `
});

if (error) {
  console.log('⚠️  Direct SQL failed, trying alternative approach...');
  console.log('Error:', error.message);
  console.log('\n📋 MANUAL STEP REQUIRED:');
  console.log('Please run this SQL in your Supabase SQL editor:');
  console.log('\nALTER TABLE practice_test_english_passages ADD COLUMN IF NOT EXISTS passage_title TEXT;');
} else {
  console.log('✅ Successfully added passage_title column!');
}

console.log('\n' + '='.repeat(80));
