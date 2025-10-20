#!/usr/bin/env node

import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';
import fetch from 'node-fetch';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
dotenv.config({ path: path.join(__dirname, '../.env') });

const supabaseUrl = process.env.REACT_APP_SUPABASE_URL || process.env.VITE_SUPABASE_URL;
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY || process.env.SUPABASE_SERVICE_KEY;

if (!supabaseUrl || !supabaseServiceKey) {
  console.error('❌ Missing Supabase credentials');
  process.exit(1);
}

// Extract project ref from URL
const projectRef = supabaseUrl.match(/https:\/\/([^.]+)\.supabase\.co/)[1];

async function executeSQL(sql) {
  console.log('\n╔═══════════════════════════════════════════════════╗');
  console.log('║    Executing Table Rename via REST API            ║');
  console.log('╚═══════════════════════════════════════════════════╝\n');

  try {
    const response = await fetch(`${supabaseUrl}/rest/v1/rpc/exec`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'apikey': supabaseServiceKey,
        'Authorization': `Bearer ${supabaseServiceKey}`
      },
      body: JSON.stringify({ query: sql })
    });

    console.log('Response status:', response.status);
    const text = await response.text();
    console.log('Response:', text);

    if (!response.ok) {
      console.log('\n❌ SQL execution via REST API not available.');
      console.log('📝 You need to run the SQL commands manually in Supabase SQL Editor.');
      console.log('\nThe SQL Editor is open, and commands are in your clipboard.');
      console.log('Just paste and run them.\n');
      return false;
    }

    return true;
  } catch (err) {
    console.log('\n❌ Error:', err.message);
    console.log('\n📝 Please run the SQL commands manually in Supabase SQL Editor:');
    console.log('\n   ALTER TABLE section_content RENAME TO lesson_section_content;');
    console.log('   ALTER TABLE examples RENAME TO lesson_examples;');
    console.log('   ALTER TABLE term_definitions RENAME TO lesson_term_definitions;\n');
    return false;
  }
}

const sql = `
ALTER TABLE section_content RENAME TO lesson_section_content;
ALTER TABLE examples RENAME TO lesson_examples;
ALTER TABLE term_definitions RENAME TO lesson_term_definitions;
`;

executeSQL(sql);
