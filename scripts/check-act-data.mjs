#!/usr/bin/env node
import { createClient } from '@supabase/supabase-js';
import dotenv from 'dotenv';
dotenv.config();

const supabase = createClient(
  process.env.REACT_APP_SUPABASE_URL,
  process.env.SUPABASE_SERVICE_ROLE_KEY
);

async function checkActTables() {
  console.log('🔍 ACT_ TABLES - COMPLETE CHECK\n');
  console.log('='.repeat(80) + '\n');

  const tables = [
    'act_math_questions',
    'act_english_questions',
    'act_reading_questions',
    'act_science_questions'
  ];

  for (const table of tables) {
    const { count, error } = await supabase
      .from(table)
      .select('*', { count: 'exact', head: true });

    console.log(`${table}: ${count || 0} rows` + (error ? ` (Error: ${error.message})` : ''));

    if (count > 0) {
      const { data } = await supabase
        .from(table)
        .select('test_number')
        .limit(200);

      if (data) {
        const tests = [...new Set(data.map(q => q.test_number))].sort((a,b) => a-b);
        console.log(`  Tests: ${tests.join(', ')}`);

        for (const testNum of tests) {
          const { count: tc } = await supabase
            .from(table)
            .select('*', { count: 'exact', head: true })
            .eq('test_number', testNum);
          console.log(`    Test ${testNum}: ${tc} questions`);
        }
      }
    }
    console.log('');
  }
}

checkActTables().catch(console.error);
