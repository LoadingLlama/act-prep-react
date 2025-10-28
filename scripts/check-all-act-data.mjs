#!/usr/bin/env node
import { createClient } from '@supabase/supabase-js';
import dotenv from 'dotenv';
dotenv.config();

const supabase = createClient(
  process.env.REACT_APP_SUPABASE_URL,
  process.env.SUPABASE_SERVICE_ROLE_KEY
);

async function checkAllActData() {
  console.log('🔍 COMPLETE ACT_ TABLES CHECK\n');
  console.log('='.repeat(80) + '\n');

  const sections = [
    { name: 'English', table: 'act_english_questions' },
    { name: 'Math', table: 'act_math_questions' },
    { name: 'Reading', table: 'act_reading_questions' },
    { name: 'Science', table: 'act_science_questions' }
  ];

  for (const section of sections) {
    console.log(`\n${section.name.toUpperCase()} (${section.table}):`);
    console.log('-'.repeat(80));

    const { count } = await supabase
      .from(section.table)
      .select('*', { count: 'exact', head: true });

    console.log(`Total rows: ${count || 0}\n`);

    if (count > 0) {
      // Get all test numbers
      const { data } = await supabase
        .from(section.table)
        .select('test_number');

      if (data) {
        const testNums = [...new Set(data.map(q => q.test_number))].sort((a,b) => a-b);

        for (const testNum of testNums) {
          const { count: tc } = await supabase
            .from(section.table)
            .select('*', { count: 'exact', head: true })
            .eq('test_number', testNum);

          console.log(`  Test ${testNum}: ${tc} questions`);
        }
      }
    }
  }

  // Check passages
  console.log('\n\n' + '='.repeat(80));
  console.log('\nPASSAGES:\n');

  const passageTables = [
    { name: 'Reading Passages', table: 'act_reading_passages' },
    { name: 'Science Passages', table: 'act_science_passages' }
  ];

  for (const pt of passageTables) {
    console.log(`\n${pt.name} (${pt.table}):`);
    console.log('-'.repeat(80));

    const { count } = await supabase
      .from(pt.table)
      .select('*', { count: 'exact', head: true });

    console.log(`Total: ${count || 0}\n`);

    if (count > 0) {
      const { data } = await supabase
        .from(pt.table)
        .select('test_number');

      if (data) {
        const testNums = [...new Set(data.map(p => p.test_number))].sort((a,b) => a-b);

        for (const testNum of testNums) {
          const { count: tc } = await supabase
            .from(pt.table)
            .select('*', { count: 'exact', head: true })
            .eq('test_number', testNum);

          console.log(`  Test ${testNum}: ${tc} passages`);
        }
      }
    }
  }

  console.log('\n' + '='.repeat(80) + '\n');
}

checkAllActData().catch(console.error);
