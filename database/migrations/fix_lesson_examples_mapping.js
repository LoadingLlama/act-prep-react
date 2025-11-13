/**
 * Fix lesson_examples by updating UUID lesson_ids to TEXT IDs
 * using the mapping from the backup file
 */

require('dotenv').config({ path: '../../.env' });
const { createClient } = require('@supabase/supabase-js');
const fs = require('fs');

const SUPABASE_URL = process.env.REACT_APP_SUPABASE_URL;
const SERVICE_KEY = process.env.SUPABASE_SERVICE_ROLE_KEY;
const BACKUP_FILE = '/Users/cadenchiang/Desktop/act-prep-react/backups/actprep_backup_2025-10-17.sql';

const supabase = createClient(SUPABASE_URL, SERVICE_KEY);

console.log('🔧 Fixing lesson_examples mapping...\n');

// Extract UUID → lesson_key mapping from backup
function extractMapping(backupContent) {
  const mapping = {};

  const insertRegex = /INSERT INTO lesson_metadata \([^)]+\) VALUES \(([a-f0-9-]+), '([^']+)'/g;

  let match;
  while ((match = insertRegex.exec(backupContent)) !== null) {
    const uuid = match[1];
    const lessonKey = match[2];
    mapping[uuid] = lessonKey;
  }

  return mapping;
}

async function main() {
  // Read backup file
  console.log('📖 Reading backup file...');
  const backup = fs.readFileSync(BACKUP_FILE, 'utf8');

  const mapping = extractMapping(backup);
  console.log(`✅ Extracted ${Object.keys(mapping).length} UUID → lesson_key mappings\n`);

  // Get all lesson_examples
  const { data: examples, error } = await supabase
    .from('lesson_examples')
    .select('*');

  if (error) {
    console.error('❌ Error fetching lesson_examples:', error.message);
    return;
  }

  console.log(`📝 Found ${examples.length} lesson_examples to update\n`);

  // Update each example
  let successCount = 0;
  let errorCount = 0;
  let notFoundCount = 0;

  for (let i = 0; i < examples.length; i++) {
    const example = examples[i];
    const oldUUID = example.lesson_id;
    const newTextId = mapping[oldUUID];

    process.stdout.write(`   [${i + 1}/${examples.length}] ${example.id.substring(0, 8)}...`);

    if (!newTextId) {
      console.log(` ⚠️  No mapping found for UUID: ${oldUUID}`);
      notFoundCount++;
      continue;
    }

    try {
      const { error: updateError } = await supabase
        .from('lesson_examples')
        .update({ lesson_id: newTextId })
        .eq('id', example.id);

      if (updateError) {
        console.log(` ❌ ${updateError.message}`);
        errorCount++;
      } else {
        console.log(` ✅ ${oldUUID.substring(0, 8)} → ${newTextId}`);
        successCount++;
      }
    } catch (err) {
      console.log(` ❌ ${err.message}`);
      errorCount++;
    }

    // Small delay
    await new Promise(resolve => setTimeout(resolve, 50));
  }

  console.log('\n' + '='.repeat(60));
  console.log('📊 UPDATE SUMMARY');
  console.log('='.repeat(60));
  console.log(`✅ Successfully updated: ${successCount} examples`);
  console.log(`❌ Failed: ${errorCount} examples`);
  console.log(`⚠️  No mapping found: ${notFoundCount} examples`);
  console.log('='.repeat(60) + '\n');

  if (successCount > 0) {
    console.log('🎉 lesson_examples table fixed!\n');
  }
}

main();
