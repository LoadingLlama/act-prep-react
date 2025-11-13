/**
 * Fix lesson_examples using the JSON backup mapping
 */

require('dotenv').config({ path: '../../.env' });
const { createClient } = require('@supabase/supabase-js');
const fs = require('fs');

const SUPABASE_URL = process.env.REACT_APP_SUPABASE_URL;
const SERVICE_KEY = process.env.SUPABASE_SERVICE_ROLE_KEY;
const JSON_BACKUP = '/Users/cadenchiang/Desktop/act-prep-react/backups/database-backup-2025-10-21.json';

const supabase = createClient(SUPABASE_URL, SERVICE_KEY);

console.log('🔧 Fixing lesson_examples from JSON backup...\n');

async function main() {
  // Read JSON backup
  console.log('📖 Reading JSON backup...');
  const backup = JSON.parse(fs.readFileSync(JSON_BACKUP, 'utf8'));

  // Extract UUID → lesson_key mapping from lessons
  const mapping = {};
  backup.lessons.forEach(lesson => {
    mapping[lesson.id] = lesson.lesson_key;
  });

  console.log(`✅ Extracted ${Object.keys(mapping).length} UUID → lesson_key mappings\n`);

  // Get all lesson_examples
  const { data: examples, error } = await supabase
    .from('lesson_examples')
    .select('*');

  if (error) {
    console.error('❌ Error:', error.message);
    return;
  }

  console.log(`📝 Found ${examples.length} lesson_examples\n`);

  // Update each example
  let successCount = 0;
  let errorCount = 0;
  let notFoundCount = 0;

  for (let i = 0; i < examples.length; i++) {
    const example = examples[i];
    const oldUUID = example.lesson_id;
    const newTextId = mapping[oldUUID];

    process.stdout.write(`   [${i + 1}/${examples.length}] `);

    if (!newTextId) {
      console.log(`⚠️  ${oldUUID.substring(0, 8)} → No mapping`);
      notFoundCount++;
      continue;
    }

    try {
      const { error: updateError } = await supabase
        .from('lesson_examples')
        .update({ lesson_id: newTextId })
        .eq('id', example.id);

      if (updateError) {
        console.log(`❌ ${updateError.message}`);
        errorCount++;
      } else {
        console.log(`✅ ${oldUUID.substring(0, 8)} → ${newTextId}`);
        successCount++;
      }
    } catch (err) {
      console.log(`❌ ${err.message}`);
      errorCount++;
    }

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
