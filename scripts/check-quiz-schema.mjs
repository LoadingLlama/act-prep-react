/**
 * Check Quizzes Table Schema
 */

import { createClient } from '@supabase/supabase-js';
import * as dotenv from 'dotenv';
import { fileURLToPath } from 'url';
import { dirname, resolve } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

dotenv.config({ path: resolve(__dirname, '../.env') });

const supabaseUrl = process.env.REACT_APP_SUPABASE_URL;
const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

const supabase = createClient(supabaseUrl, supabaseKey);

async function checkSchema() {
  console.log('🔍 Checking quizzes table schema...\\n');

  const { data, error } = await supabase
    .from('quizzes')
    .select('*')
    .limit(1);

  if (error) {
    console.error('❌ Error:', error);
    process.exit(1);
  }

  if (data && data.length > 0) {
    console.log('📋 Available columns:');
    console.log('─'.repeat(80));
    Object.keys(data[0]).forEach(key => {
      const valueType = Array.isArray(data[0][key]) ? 'array' : typeof data[0][key];
      const preview = data[0][key] === null ? 'null' :
                      typeof data[0][key] === 'string' && data[0][key].length > 50 ?
                      data[0][key].substring(0, 50) + '...' :
                      JSON.stringify(data[0][key]).substring(0, 50);
      console.log(`  ${key} (${valueType}): ${preview}`);
    });
  } else {
    console.log('No quizzes found in database');
  }
  console.log();
}

checkSchema();
