#!/usr/bin/env node

/**
 * CHECK ALL DATABASE SCHEMAS
 * Verify every column in every table to ensure extraction fills everything
 */

import { createClient } from '@supabase/supabase-js';
import * as dotenv from 'dotenv';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
dotenv.config({ path: join(__dirname, '.env') });

const supabase = createClient(process.env.REACT_APP_SUPABASE_URL, process.env.SUPABASE_SERVICE_ROLE_KEY);

console.log('🔍 CHECKING ALL DATABASE SCHEMAS FOR COMPLETE EXTRACTION');
console.log('=' .repeat(80));

async function checkTableSchema(tableName) {
  try {
    console.log(`\n📋 TABLE: ${tableName.toUpperCase()}`);

    // Get table schema by querying with limit 0
    const { data, error } = await supabase
      .from(tableName)
      .select('*')
      .limit(1);

    if (error) {
      console.log(`❌ Error accessing ${tableName}: ${error.message}`);
      return null;
    }

    // Get column info by inspecting the first row structure or use RPC
    const { data: schemaData, error: schemaError } = await supabase
      .rpc('get_table_columns', { table_name: tableName })
      .select();

    if (schemaError) {
      // Fallback: try to get sample data to infer schema
      const { data: sampleData, error: sampleError } = await supabase
        .from(tableName)
        .select('*')
        .limit(1);

      if (!sampleError && sampleData && sampleData.length > 0) {
        const columns = Object.keys(sampleData[0]);
        console.log(`📊 Columns found (${columns.length}):`);
        columns.forEach((col, index) => {
          console.log(`  ${(index + 1).toString().padStart(2)}. ${col}`);
        });
        return columns;
      } else {
        console.log(`⚠️ Could not determine schema for ${tableName}`);
        return null;
      }
    }

    return schemaData;

  } catch (error) {
    console.log(`❌ Error checking ${tableName}: ${error.message}`);
    return null;
  }
}

async function checkAllTables() {
  const tables = [
    'act_english_questions',
    'act_math_questions',
    'act_reading_questions',
    'act_science_questions',
    'act_english_passages',
    'act_reading_passages',
    'act_science_passages',
    'lessons'
  ];

  const schemas = {};

  for (const table of tables) {
    schemas[table] = await checkTableSchema(table);
  }

  return schemas;
}

// Try direct SQL query to get schemas
async function getTableSchemas() {
  console.log('\n🔍 GETTING DETAILED SCHEMA INFORMATION...');

  const tables = [
    'act_english_questions',
    'act_math_questions',
    'act_reading_questions',
    'act_science_questions',
    'act_english_passages',
    'act_reading_passages',
    'act_science_passages'
  ];

  for (const tableName of tables) {
    try {
      // Try to get a sample row to see the actual structure
      const { data, error } = await supabase
        .from(tableName)
        .select('*')
        .limit(1);

      if (!error) {
        if (data && data.length > 0) {
          console.log(`\n✅ ${tableName.toUpperCase()} - ACTUAL COLUMNS:`);
          const columns = Object.keys(data[0]);
          columns.forEach((col, index) => {
            const value = data[0][col];
            const type = typeof value;
            console.log(`  ${(index + 1).toString().padStart(2)}. ${col.padEnd(25)} (${type})`);
          });
        } else {
          console.log(`\n📋 ${tableName.toUpperCase()} - EMPTY TABLE, trying insert test...`);

          // Try inserting a minimal test record to see what columns are required
          const testData = {
            test_number: 999,
            created_at: new Date().toISOString()
          };

          const { data: insertData, error: insertError } = await supabase
            .from(tableName)
            .insert([testData])
            .select();

          if (insertError) {
            console.log(`  ❌ Insert test failed: ${insertError.message}`);

            // Parse error message for column hints
            if (insertError.message.includes('column') || insertError.message.includes('field')) {
              console.log(`  💡 Error suggests required columns in the message above`);
            }
          } else {
            console.log(`  ✅ Test insert successful, deleting test record...`);
            await supabase
              .from(tableName)
              .delete()
              .eq('test_number', 999);
          }
        }
      } else {
        console.log(`\n❌ ${tableName.toUpperCase()} - Error: ${error.message}`);
      }
    } catch (err) {
      console.log(`\n💥 ${tableName.toUpperCase()} - Exception: ${err.message}`);
    }
  }
}

async function main() {
  await getTableSchemas();

  console.log('\n🎯 EXTRACTION REQUIREMENTS ANALYSIS:');
  console.log('Based on the schema check above, the extraction system must populate:');
  console.log('\n📝 FOR QUESTIONS:');
  console.log('  • test_number, question_number, section');
  console.log('  • question_stem, choice_a, choice_b, choice_c, choice_d');
  console.log('  • correct_answer, question_type, question_category');
  console.log('  • passage_number, lesson_id, difficulty_level');
  console.log('  • underlined_text, context_before, context_after');
  console.log('  • notes, created_at');

  console.log('\n📖 FOR PASSAGES:');
  console.log('  • test_number, passage_number, section');
  console.log('  • title, introduction, passage_text');
  console.log('  • flesch_kincaid_grade, overall_complexity');
  console.log('  • word_count, sentence_count, avg_sentence_length');
  console.log('  • created_at');

  console.log('\n🔧 NEXT STEPS:');
  console.log('  1. Update extraction to fill ALL columns');
  console.log('  2. Add fallback values for optional fields');
  console.log('  3. Ensure proper data types for all fields');
  console.log('  4. Test with comprehensive validation');
}

main().catch(console.error);