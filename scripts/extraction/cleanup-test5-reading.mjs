#!/usr/bin/env node

import { createClient } from '@supabase/supabase-js';
import * as dotenv from 'dotenv';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

dotenv.config({ path: join(__dirname, '../../.env') });

const supabase = createClient(process.env.REACT_APP_SUPABASE_URL, process.env.SUPABASE_SERVICE_ROLE_KEY);

async function cleanup() {
  console.log('Deleting Test 5 Reading data...\n');
  
  // Delete questions first (due to foreign key constraint)
  const { error: questionsError } = await supabase
    .from('act_reading_questions')
    .delete()
    .eq('test_number', 5);
  
  if (questionsError) {
    console.error('Error deleting questions:', questionsError);
  } else {
    console.log('✓ Deleted Test 5 Reading questions');
  }
  
  // Delete passages
  const { error: passagesError } = await supabase
    .from('act_reading_passages')
    .delete()
    .eq('test_number', 5);
  
  if (passagesError) {
    console.error('Error deleting passages:', passagesError);
  } else {
    console.log('✓ Deleted Test 5 Reading passages');
  }
  
  console.log('\nCleanup complete!\n');
}

cleanup().catch(console.error);
