#!/usr/bin/env node

import { createClient } from '@supabase/supabase-js';
import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
dotenv.config({ path: path.join(__dirname, '../.env') });

const supabaseUrl = process.env.REACT_APP_SUPABASE_URL || process.env.VITE_SUPABASE_URL;
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY || process.env.SUPABASE_SERVICE_KEY;

const supabase = createClient(supabaseUrl, supabaseServiceKey);

async function investigateDuplicates() {
  console.log('\n╔═══════════════════════════════════════════════════╗');
  console.log('║    Investigating Duplicate Table Names           ║');
  console.log('╚═══════════════════════════════════════════════════╝\n');

  const tablePairs = [
    ['section_content', 'lesson_section_content'],
    ['examples', 'lesson_examples'],
    ['term_definitions', 'lesson_term_definitions']
  ];

  for (const [oldName, newName] of tablePairs) {
    console.log(`\n📊 Comparing: ${oldName} vs ${newName}`);
    console.log('─'.repeat(60));

    try {
      // Get counts and sample data from old table
      const { data: oldData, count: oldCount, error: oldError } = await supabase
        .from(oldName)
        .select('*', { count: 'exact' })
        .limit(1);

      // Get counts and sample data from new table
      const { data: newData, count: newCount, error: newError } = await supabase
        .from(newName)
        .select('*', { count: 'exact' })
        .limit(1);

      if (oldError && newError) {
        console.log('❌ Both tables have errors');
        continue;
      }

      console.log(`\n${oldName}:`);
      console.log(`   Rows: ${oldCount || 0}`);
      if (oldData && oldData.length > 0) {
        console.log(`   Columns: ${Object.keys(oldData[0]).join(', ')}`);
        console.log(`   Sample ID: ${oldData[0].id}`);
      }

      console.log(`\n${newName}:`);
      console.log(`   Rows: ${newCount || 0}`);
      if (newData && newData.length > 0) {
        console.log(`   Columns: ${Object.keys(newData[0]).join(', ')}`);
        console.log(`   Sample ID: ${newData[0].id}`);
      }

      // Compare
      if (oldCount === newCount && oldCount > 0) {
        console.log(`\n✅ Same row count (${oldCount}) - likely duplicates`);

        // Check if same IDs
        if (oldData[0]?.id === newData[0]?.id) {
          console.log(`✅ Same IDs - definitely duplicates or same table`);
        } else {
          console.log(`⚠️  Different IDs - might be separate tables with copied data`);
        }
      } else if (oldCount === 0 && newCount > 0) {
        console.log(`\n⚠️  Old table is EMPTY, new table has ${newCount} rows`);
        console.log(`   → Safe to drop old table: DROP TABLE ${oldName};`);
      } else if (oldCount > 0 && newCount === 0) {
        console.log(`\n⚠️  New table is EMPTY, old table has ${oldCount} rows`);
        console.log(`   → Need to migrate data or rename table`);
      } else {
        console.log(`\n⚠️  Different row counts: old=${oldCount}, new=${newCount}`);
        console.log(`   → Need to investigate which is correct`);
      }

    } catch (err) {
      console.log(`❌ Error: ${err.message}`);
    }
  }

  console.log('\n' + '─'.repeat(60));
  console.log('\n📋 RECOMMENDED ACTION:\n');
  console.log('If the tables are duplicates (same data), drop the old ones:');
  console.log('\nDROP TABLE section_content;');
  console.log('DROP TABLE examples;');
  console.log('DROP TABLE term_definitions;\n');
  console.log('⚠️  Run this ONLY if verification shows they have the same data!\n');
}

investigateDuplicates();
