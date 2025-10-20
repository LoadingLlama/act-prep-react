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

async function checkAllTables() {
  console.log('\n╔═══════════════════════════════════════════════════╗');
  console.log('║       Complete Database Structure Check          ║');
  console.log('╚═══════════════════════════════════════════════════╝\n');

  // List of potential tables
  const tablesToCheck = [
    'lesson_metadata',
    'lesson_sections',
    'section_content',
    'lessons',
    'examples',
    'term_definitions',
    'glossary',
    'practice_problems',
    'quiz_questions'
  ];

  for (const table of tablesToCheck) {
    try {
      const { data, error, count } = await supabase
        .from(table)
        .select('*', { count: 'exact', head: true });

      if (error) {
        console.log(`❌ ${table}: Does not exist or error - ${error.message}`);
      } else {
        console.log(`✅ ${table}: EXISTS (${count || 0} rows)`);

        // Get a sample row to see structure
        const { data: sample } = await supabase
          .from(table)
          .select('*')
          .limit(1);

        if (sample && sample.length > 0) {
          console.log(`   Columns: ${Object.keys(sample[0]).join(', ')}`);
        }
        console.log('');
      }
    } catch (err) {
      console.log(`❌ ${table}: Error - ${err.message}\n`);
    }
  }

  // Check what I've been updating
  console.log('\n' + '='.repeat(60));
  console.log('WHAT I\'VE BEEN UPDATING:');
  console.log('='.repeat(60) + '\n');

  // Check section_content
  const { data: content, error: contentError } = await supabase
    .from('lesson_section_content')
    .select('id, content')
    .limit(1);

  if (content && content.length > 0) {
    console.log('✅ section_content table:');
    console.log(`   Sample content length: ${content[0].content.length} chars`);
    console.log(`   Contains HTML: ${content[0].content.includes('<h3>') ? 'YES' : 'NO'}`);
    console.log(`   Contains styling: ${content[0].content.includes('style=') ? 'YES' : 'NO'}`);
  }

  console.log('\n');
}

checkAllTables();
