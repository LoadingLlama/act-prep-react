/**
 * Check Lessons Table Schema
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
  console.log('🔍 Checking lessons table schema...\\n');

  const { data, error } = await supabase
    .from('lessons')
    .select('*')
    .eq('lesson_key', 'geometry-angles')
    .single();

  if (error) {
    console.error('❌ Error:', error);
    process.exit(1);
  }

  console.log('📋 Available columns:');
  console.log('─'.repeat(80));
  Object.keys(data).forEach(key => {
    const valueType = Array.isArray(data[key]) ? 'array' : typeof data[key];
    const preview = data[key] === null ? 'null' :
                    typeof data[key] === 'string' && data[key].length > 50 ?
                    data[key].substring(0, 50) + '...' :
                    JSON.stringify(data[key]);
    console.log(`  ${key} (${valueType}): ${preview}`);
  });
  console.log();
}

checkSchema();
