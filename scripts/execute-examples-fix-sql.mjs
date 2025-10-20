#!/usr/bin/env node

import { createClient } from '@supabase/supabase-js';
import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';
import fs from 'fs';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
dotenv.config({ path: path.join(__dirname, '../.env') });

const supabaseUrl = process.env.REACT_APP_SUPABASE_URL || process.env.VITE_SUPABASE_URL;
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY || process.env.SUPABASE_SERVICE_KEY;

const supabase = createClient(supabaseUrl, supabaseServiceKey);

async function executeSQL() {
  console.log('\n╔════════════════════════════════════════════════════════╗');
  console.log('║  Executing lesson_examples Foreign Key Fix            ║');
  console.log('╚════════════════════════════════════════════════════════╝\n');

  const sqlFilePath = path.join(__dirname, 'FIX_LESSON_EXAMPLES_FK.sql');
  const sql = fs.readFileSync(sqlFilePath, 'utf-8');

  // Split by semicolon to get individual statements
  const statements = sql
    .split(';')
    .map(s => s.trim())
    .filter(s => s.length > 0 && !s.startsWith('--'));

  console.log(`📋 Found ${statements.length} SQL statements to execute\n`);

  let executed = 0;
  let errors = 0;

  for (let i = 0; i < statements.length; i++) {
    const stmt = statements[i];

    // Skip comments
    if (stmt.startsWith('--')) continue;

    const preview = stmt.substring(0, 80).replace(/\n/g, ' ');
    console.log(`[${i + 1}/${statements.length}] ${preview}...`);

    try {
      // For ALTER TABLE and UPDATE statements, we need to use a raw SQL execution
      // Supabase doesn't provide direct SQL execution via client, so we'll use individual updates

      if (stmt.includes('ALTER TABLE')) {
        console.log('   ⚠️  Skipping ALTER TABLE (must run in Supabase SQL Editor)\n');
        continue;
      }

      if (stmt.includes('UPDATE lesson_examples')) {
        // Extract the UUIDs from the UPDATE statement
        const match = stmt.match(/SET lesson_id = '([^']+)' WHERE lesson_id = '([^']+)'/);
        if (match) {
          const [, newId, oldId] = match;

          // Perform the update
          const { error } = await supabase
            .from('lesson_examples')
            .update({ lesson_id: newId })
            .eq('lesson_id', oldId);

          if (error) {
            console.log(`   ❌ Error: ${error.message}\n`);
            errors++;
          } else {
            console.log(`   ✅ Updated\n`);
            executed++;
          }
        }
      }
    } catch (err) {
      console.log(`   ❌ Exception: ${err.message}\n`);
      errors++;
    }
  }

  console.log('\n╔════════════════════════════════════════════════════════╗');
  console.log('║  EXECUTION SUMMARY                                     ║');
  console.log('╚════════════════════════════════════════════════════════╝\n');

  console.log(`✅ Executed: ${executed} statements`);
  console.log(`❌ Errors: ${errors} statements\n`);

  if (errors > 0) {
    console.log('⚠️  NOTE: ALTER TABLE statements must be run manually in Supabase SQL Editor:');
    console.log('   1. ALTER TABLE lesson_examples DROP CONSTRAINT IF EXISTS examples_lesson_id_fkey;');
    console.log('   2. ALTER TABLE lesson_examples');
    console.log('      ADD CONSTRAINT lesson_examples_lesson_id_fkey');
    console.log('      FOREIGN KEY (lesson_id) REFERENCES lessons(id) ON DELETE CASCADE;\n');
  }
}

executeSQL().catch(err => {
  console.error('\n❌ Fatal error:', err);
  process.exit(1);
});
