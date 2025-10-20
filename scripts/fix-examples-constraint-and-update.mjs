#!/usr/bin/env node

/**
 * Fix lesson_examples foreign key constraint and update references
 *
 * Steps:
 * 1. Drop the old foreign key constraint (references lesson_metadata)
 * 2. Update all lesson_ids to reference the new lessons table
 * 3. Create new foreign key constraint (references lessons)
 */

import { createClient } from '@supabase/supabase-js';
import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
dotenv.config({ path: path.join(__dirname, '../.env') });

const supabaseUrl = process.env.REACT_APP_SUPABASE_URL || process.env.VITE_SUPABASE_URL;
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY || process.env.SUPABASE_SERVICE_KEY;

const supabase = createClient(supabaseUrl, supabaseServiceKey);

async function fixExamplesConstraint() {
  console.log('\n╔════════════════════════════════════════════════════════╗');
  console.log('║  Fixing lesson_examples Foreign Key Constraint        ║');
  console.log('╚════════════════════════════════════════════════════════╝\n');

  // Step 1: Drop the old foreign key constraint
  console.log('🔓 Step 1: Dropping old foreign key constraint...\n');

  const dropConstraintSQL = `
    ALTER TABLE lesson_examples
    DROP CONSTRAINT IF EXISTS examples_lesson_id_fkey;
  `;

  const { error: dropError } = await supabase.rpc('exec_sql', { sql_query: dropConstraintSQL });

  if (dropError) {
    console.log('⚠️  Could not drop constraint via RPC, trying direct SQL...');
    // Try using a Supabase SQL query instead
    console.log('   (You may need to run this SQL manually in Supabase SQL Editor):');
    console.log('   ' + dropConstraintSQL.trim());
    console.log('');
  } else {
    console.log('✅ Old constraint dropped\n');
  }

  // Step 2: Build mappings
  console.log('🔄 Step 2: Building UUID mappings...\n');

  const { data: metadata } = await supabase
    .from('lesson_metadata')
    .select('id, lesson_key');

  const oldUUIDtoLessonKey = {};
  metadata.forEach(m => {
    oldUUIDtoLessonKey[m.id] = m.lesson_key;
  });

  const { data: lessons } = await supabase
    .from('lessons')
    .select('id, lesson_key');

  const lessonKeyToNewUUID = {};
  lessons.forEach(l => {
    lessonKeyToNewUUID[l.lesson_key] = l.id;
  });

  console.log(`✅ Mapped ${Object.keys(oldUUIDtoLessonKey).length} old UUIDs`);
  console.log(`✅ Mapped ${Object.keys(lessonKeyToNewUUID).length} new UUIDs\n`);

  // Step 3: Update examples - build a mapping of old_id -> new_id
  console.log('💾 Step 3: Preparing batch update...\n');

  const updates = [];

  for (const [oldUUID, lessonKey] of Object.entries(oldUUIDtoLessonKey)) {
    const newUUID = lessonKeyToNewUUID[lessonKey];
    if (newUUID) {
      updates.push({ oldUUID, newUUID, lessonKey });
    }
  }

  console.log(`📊 Prepared ${updates.length} UUID mappings\n`);

  // Since we can't drop the constraint via Supabase API, let's output SQL commands
  console.log('╔════════════════════════════════════════════════════════╗');
  console.log('║  SQL COMMANDS TO RUN IN SUPABASE SQL EDITOR           ║');
  console.log('╚════════════════════════════════════════════════════════╝\n');

  console.log('-- Step 1: Drop old foreign key constraint');
  console.log('ALTER TABLE lesson_examples DROP CONSTRAINT IF EXISTS examples_lesson_id_fkey;\n');

  console.log('-- Step 2: Update lesson_ids to reference new lessons table');
  for (const { oldUUID, newUUID, lessonKey } of updates.slice(0, 5)) {
    console.log(`UPDATE lesson_examples SET lesson_id = '${newUUID}' WHERE lesson_id = '${oldUUID}'; -- ${lessonKey}`);
  }
  console.log(`-- ... ${updates.length - 5} more updates ...\n`);

  console.log('-- Step 3: Add new foreign key constraint');
  console.log('ALTER TABLE lesson_examples');
  console.log('  ADD CONSTRAINT lesson_examples_lesson_id_fkey');
  console.log('  FOREIGN KEY (lesson_id) REFERENCES lessons(id) ON DELETE CASCADE;\n');

  // Generate complete SQL file
  console.log('\n📄 Generating complete SQL file...\n');

  let sqlFile = '-- Fix lesson_examples foreign key to reference lessons table\n\n';
  sqlFile += '-- Step 1: Drop old foreign key constraint\n';
  sqlFile += 'ALTER TABLE lesson_examples DROP CONSTRAINT IF EXISTS examples_lesson_id_fkey;\n\n';
  sqlFile += '-- Step 2: Update all lesson_ids\n';

  for (const { oldUUID, newUUID, lessonKey } of updates) {
    sqlFile += `UPDATE lesson_examples SET lesson_id = '${newUUID}' WHERE lesson_id = '${oldUUID}'; -- ${lessonKey}\n`;
  }

  sqlFile += '\n-- Step 3: Add new foreign key constraint\n';
  sqlFile += 'ALTER TABLE lesson_examples\n';
  sqlFile += '  ADD CONSTRAINT lesson_examples_lesson_id_fkey\n';
  sqlFile += '  FOREIGN KEY (lesson_id) REFERENCES lessons(id) ON DELETE CASCADE;\n';

  // Write to file
  const fs = await import('fs');
  const sqlFilePath = path.join(__dirname, 'FIX_LESSON_EXAMPLES_FK.sql');
  fs.writeFileSync(sqlFilePath, sqlFile);

  console.log(`✅ SQL file generated: ${sqlFilePath}\n`);
  console.log('📋 Next steps:');
  console.log('   1. Open Supabase SQL Editor');
  console.log('   2. Copy and paste the contents of FIX_LESSON_EXAMPLES_FK.sql');
  console.log('   3. Run the SQL commands');
  console.log('   4. Verify with: SELECT * FROM lesson_examples LIMIT 1;\n');
}

fixExamplesConstraint().catch(err => {
  console.error('\n❌ Fatal error:', err);
  process.exit(1);
});
