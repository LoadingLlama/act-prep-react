#!/usr/bin/env node

import { createClient } from '@supabase/supabase-js';
import * as dotenv from 'dotenv';
dotenv.config();

const supabase = createClient(process.env.REACT_APP_SUPABASE_URL, process.env.SUPABASE_SERVICE_ROLE_KEY);

async function checkExistingFormat() {
  console.log('🔍 CHECKING EXISTING DATABASE FORMAT');
  console.log('=' .repeat(60));

  // Check each table for existing data format
  const tables = [
    'act_english_questions',
    'act_math_questions',
    'act_reading_questions',
    'act_science_questions',
    'act_english_passages',
    'act_reading_passages',
    'act_science_passages'
  ];

  for (const table of tables) {
    const { data, error } = await supabase
      .from(table)
      .select('*')
      .limit(2);

    if (!error && data && data.length > 0) {
      console.log(`\n📋 ${table.toUpperCase()} - SAMPLE DATA:`);
      console.log(`  Records found: ${data.length}`);
      const sample = data[0];
      Object.entries(sample).forEach(([key, value]) => {
        const type = typeof value;
        const preview = String(value).slice(0, 40);
        console.log(`  ${key.padEnd(20)}: ${type.padEnd(8)} | ${preview}${String(value).length > 40 ? '...' : ''}`);
      });
    } else {
      console.log(`\n📋 ${table.toUpperCase()}: No existing data`);
    }
  }

  console.log('\n🎯 FORMAT ANALYSIS COMPLETE');
}

checkExistingFormat().catch(console.error);