import pg from 'pg';
import dotenv from 'dotenv';
dotenv.config();

const { Client } = pg;

// Extract connection details from Supabase URL
const supabaseUrl = process.env.REACT_APP_SUPABASE_URL;
const serviceKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

console.log('🔧 Running Direct PostgreSQL Migration\n');
console.log('='.repeat(80));

// For Supabase, we need to use the postgres connection string
// Format: postgres://[user]:[password]@[host]:[port]/[database]
console.log('\n⚠️  This requires a direct PostgreSQL connection string.');
console.log('Please provide your Supabase database connection string (starts with postgres://...)');
console.log('\nAlternatively, run this SQL directly in Supabase SQL Editor:');
console.log('\n--- SQL TO RUN ---');
console.log(`
-- Add passage_title column to practice_test_english_passages
ALTER TABLE practice_test_english_passages
ADD COLUMN IF NOT EXISTS passage_title TEXT;

-- Update titles for Test 1 English passages
UPDATE practice_test_english_passages
SET passage_title = CASE passage_number
  WHEN 1 THEN 'Urban Farming: Growing Communities'
  WHEN 2 THEN 'Katherine Johnson: Hidden Figure of NASA'
  WHEN 3 THEN 'Revitalizing Small-Town Main Streets'
  WHEN 4 THEN 'The Art and Science of Botanical Illustration'
  WHEN 5 THEN 'Rising Seas: Coastal Communities at Risk'
END
WHERE test_number = 1;

-- Verify
SELECT passage_number, passage_title FROM practice_test_english_passages WHERE test_number = 1 ORDER BY passage_number;
`);
console.log('--- END SQL ---\n');
console.log('='.repeat(80));
