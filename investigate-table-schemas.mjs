#!/usr/bin/env node

/**
 * INVESTIGATE ACT TABLE SCHEMAS
 * Check the actual table structures to fix insertion issues
 */

import { createClient } from '@supabase/supabase-js';
import * as dotenv from 'dotenv';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
dotenv.config({ path: join(__dirname, '.env') });

const supabase = createClient(process.env.REACT_APP_SUPABASE_URL, process.env.SUPABASE_SERVICE_ROLE_KEY);

console.log('🔍 INVESTIGATING ACT TABLE SCHEMAS');
console.log('='.repeat(50));

async function investigateTableSchema(tableName) {
  console.log(`\n📋 ${tableName.toUpperCase()} TABLE SCHEMA:`);

  // Get sample data to see actual fields
  const { data: sampleData } = await supabase
    .from(tableName)
    .select('*')
    .limit(1);

  if (sampleData && sampleData.length > 0) {
    console.log('Available fields:');
    Object.keys(sampleData[0]).forEach(field => {
      console.log(`  • ${field}`);
    });

    console.log('\nSample record:');
    const sample = sampleData[0];
    Object.entries(sample).forEach(([key, value]) => {
      const displayValue = typeof value === 'string' && value.length > 50
        ? value.substring(0, 50) + '...'
        : value;
      console.log(`  ${key}: ${displayValue}`);
    });
  } else {
    console.log('No data found in table');
  }
}

async function main() {
  const tables = [
    'act_english_questions',
    'act_english_passages',
    'act_math_questions',
    'act_reading_questions',
    'act_reading_passages',
    'act_science_questions',
    'act_science_passages'
  ];

  for (const table of tables) {
    await investigateTableSchema(table);
  }
}

main().catch(console.error);