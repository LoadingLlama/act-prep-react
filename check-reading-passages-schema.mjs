#!/usr/bin/env node

/**
 * CHECK READING PASSAGES TABLE SCHEMA
 */

import { createClient } from '@supabase/supabase-js';
import * as dotenv from 'dotenv';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
dotenv.config({ path: join(__dirname, '.env') });

const supabase = createClient(process.env.REACT_APP_SUPABASE_URL, process.env.SUPABASE_SERVICE_ROLE_KEY);

async function checkReadingPassagesSchema() {
  console.log('📊 CHECKING READING PASSAGES TABLE SCHEMA...');

  try {
    // Try to select all columns to see what exists
    const { data, error } = await supabase
      .from('act_reading_passages')
      .select('*')
      .limit(1);

    if (error) {
      console.log('❌ Error accessing table:', error.message);
    } else {
      console.log('✅ Reading passages table exists');
      console.log('📋 Sample data structure:', data);
    }

    // Also check if there are any existing passages
    const { data: existingPassages, error: countError } = await supabase
      .from('act_reading_passages')
      .select('id, passage_number, title, passage_type')
      .eq('test_number', 3);

    if (countError) {
      console.log('❌ Error checking existing passages:', countError.message);
    } else {
      console.log(`📚 Existing Reading passages for Test 3: ${existingPassages?.length || 0}`);
      if (existingPassages?.length > 0) {
        existingPassages.forEach(p => {
          console.log(`  Passage ${p.passage_number}: ${p.title} (${p.passage_type})`);
        });
      }
    }

  } catch (err) {
    console.log('❌ Error:', err.message);
  }
}

checkReadingPassagesSchema().catch(console.error);