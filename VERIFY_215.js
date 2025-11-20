#!/usr/bin/env node

const { createClient } = require('@supabase/supabase-js');

const SUPABASE_URL = 'https://rabavobdklnwvwsldbix.supabase.co';
const SUPABASE_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InJhYmF2b2Jka2xud3Z3c2xkYml4Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTk3NjU0NzgsImV4cCI6MjA3NTM0MTQ3OH0.z_1N3TG-cS9Bc1s7UAif91PkIjhBKvicrUqupiNP80Y';

const supabase = createClient(SUPABASE_URL, SUPABASE_KEY);

const TABLES = [
  { name: 'practice_test_english_questions', expected: 75 },
  { name: 'practice_test_math_questions', expected: 60 },
  { name: 'practice_test_reading_questions', expected: 40 },
  { name: 'practice_test_science_questions', expected: 40 }
];

async function verify() {
  console.log('\nVerifying all 215 explanations...\n');

  let total = 0;

  for (const table of TABLES) {
    const { data, error } = await supabase
      .from(table.name)
      .select('id, question_number, explanation')
      .eq('test_number', 1)
      .order('question_number', { ascending: true })
      .limit(table.expected);

    if (error) {
      console.error('Error:', error);
      continue;
    }

    const withExplanations = data.filter(q => q.explanation !== null && q.explanation !== '');
    const withoutExplanations = data.filter(q => q.explanation === null || q.explanation === '');

    const subject = table.name.split('_')[2].toUpperCase();
    console.log(`${subject}:`);
    console.log(`  Total: ${data.length}/${table.expected}`);
    console.log(`  With explanations: ${withExplanations.length}`);
    console.log(`  Without explanations: ${withoutExplanations.length}`);

    if (withoutExplanations.length > 0) {
      console.log(`  Missing: ${withoutExplanations.map(q => q.question_number).join(', ')}`);
    }

    total += withExplanations.length;
    console.log('');
  }

  console.log('='.repeat(50));
  console.log(`TOTAL: ${total}/215 explanations in database`);
  console.log('='.repeat(50));

  if (total === 215) {
    console.log('\n✅ All 215 explanations confirmed in database!');
  } else {
    console.log(`\n⚠️ Missing ${215 - total} explanations`);
  }
}

verify().catch(console.error);
