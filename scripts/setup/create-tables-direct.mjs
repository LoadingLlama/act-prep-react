#!/usr/bin/env node

/**
 * Create database tables using Supabase Management API
 */

import { createClient } from '@supabase/supabase-js';
import * as dotenv from 'dotenv';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

dotenv.config({ path: join(__dirname, '../../.env') });

const supabaseUrl = process.env.REACT_APP_SUPABASE_URL;
const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

const supabase = createClient(supabaseUrl, supabaseKey, {
  db: { schema: 'public' },
  auth: { persistSession: false }
});

console.log('🚀 Creating ACT Question Bank Database\n');

async function createTable(tableName, sql) {
  console.log(`Creating table: ${tableName}...`);

  // For Supabase, we need to use their SQL execution endpoint
  const response = await fetch(`${supabaseUrl}/rest/v1/rpc/exec`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'apikey': supabaseKey,
      'Authorization': `Bearer ${supabaseKey}`
    },
    body: JSON.stringify({ query: sql })
  });

  if (!response.ok) {
    // Table creation via REST API may not be supported
    // Let's try a different approach
    console.log(`⚠️  Cannot create tables via API. Please use SQL Editor.`);
    return false;
  }

  console.log(`✅ Table ${tableName} created`);
  return true;
}

// Simplified approach: Insert directly into tables that might already exist
console.log('Attempting to create tables via Supabase...\n');

// Check if we can create tables
const testSql = 'SELECT 1';
try {
  const { data, error } = await supabase.rpc('exec', { sql: testSql });
  if (error) {
    console.log('⚠️  Direct SQL execution not available via client.');
    console.log('');
    console.log('Please create tables manually:');
    console.log('1. Go to https://app.supabase.com');
    console.log('2. Select your project');
    console.log('3. Go to SQL Editor');
    console.log('4. Run the SQL from: scripts/setup/create-tables.sql');
    console.log('');
    console.log('Then run: node scripts/extraction/extract-test-1.mjs');
  }
} catch (err) {
  console.log('Using alternative approach...\n');

  // Create tables using schema that Supabase can handle
  const tables = {
    act_passages: {
      test_number: 'int4',
      section: 'text',
      passage_number: 'int4',
      passage_title: 'text',
      passage_text: 'text',
      passage_type: 'text'
    },
    act_questions: {
      test_number: 'int4',
      section: 'text',
      question_number: 'int4',
      passage_id: 'uuid',
      question_stem: 'text',
      choice_a: 'text',
      choice_b: 'text',
      choice_c: 'text',
      choice_d: 'text',
      choice_e: 'text',
      correct_answer: 'text',
      has_figure: 'bool',
      figure_url: 'text',
      figure_reference: 'text',
      question_type: 'text',
      difficulty_level: 'text',
      notes: 'text'
    },
    extraction_progress: {
      test_number: 'int4',
      section: 'text',
      total_questions: 'int4',
      questions_extracted: 'int4',
      questions_validated: 'int4',
      status: 'text'
    }
  };

  console.log('Tables need to be created via Supabase Dashboard.');
  console.log('Use SQL Editor with create-tables.sql');
}
