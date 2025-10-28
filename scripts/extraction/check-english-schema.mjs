#!/usr/bin/env node

import { createClient } from '@supabase/supabase-js';
import * as dotenv from 'dotenv';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
dotenv.config({ path: join(__dirname, '../../.env') });

const supabase = createClient(process.env.REACT_APP_SUPABASE_URL, process.env.SUPABASE_SERVICE_ROLE_KEY);

console.log('🔍 CHECKING ACT ENGLISH QUESTIONS SCHEMA\n');

// Get a sample question from Test 2
const { data, error } = await supabase
  .from('act_english_questions')
  .select('*')
  .eq('test_number', 2)
  .eq('question_number', 1)
  .single();

if (error) {
  console.error('❌ Error:', error);
} else {
  console.log('✅ Sample English Question (Test 2, Q1):');
  console.log(JSON.stringify(data, null, 2));
  console.log('\n📋 Available columns:');
  console.log(Object.keys(data).join(', '));
}
