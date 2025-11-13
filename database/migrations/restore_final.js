/**
 * Final restoration script - handles multiline content properly
 */

require('dotenv').config({ path: '../../.env' });
const { createClient } = require('@supabase/supabase-js');
const fs = require('fs');

const SUPABASE_URL = process.env.REACT_APP_SUPABASE_URL;
const SERVICE_KEY = process.env.SUPABASE_SERVICE_ROLE_KEY;
const SQL_FILE = './RESTORE_FULL_CONTENT.sql';

console.log('🔄 Starting lesson restoration...\n');

const supabase = createClient(SUPABASE_URL, SERVICE_KEY);

/**
 * Extract complete INSERT blocks from SQL file
 */
function extractInsertBlocks(sqlContent) {
  const blocks = [];
  const lines = sqlContent.split('\n');

  let currentBlock = [];
  let inInsert = false;

  for (let i = 0; i < lines.length; i++) {
    const line = lines[i];

    if (line.trim().startsWith('INSERT INTO lessons')) {
      inInsert = true;
      currentBlock = [line];
      continue;
    }

    if (inInsert) {
      currentBlock.push(line);

      // Check if we've reached the end of this INSERT block
      if (line.includes('order_index = EXCLUDED.order_index;')) {
        blocks.push(currentBlock.join('\n'));
        currentBlock = [];
        inInsert = false;
      }
    }
  }

  return blocks;
}

/**
 * Parse a single INSERT block into a lesson object
 */
function parseInsertBlock(block) {
  // Extract the VALUES part
  const valuesMatch = block.match(/VALUES\s*\(([\s\S]+?)\)\s*ON CONFLICT/);
  if (!valuesMatch) {
    throw new Error('Could not find VALUES clause');
  }

  const valuesStr = valuesMatch[1];

  // Parse fields more carefully
  // We need to handle: 'string', number, 'multiline
  // string with ''escaped quotes'''

  const fields = [];
  let current = '';
  let inQuote = false;
  let parenDepth = 0;

  for (let i = 0; i < valuesStr.length; i++) {
    const char = valuesStr[i];
    const next = i < valuesStr.length - 1 ? valuesStr[i + 1] : '';

    if (char === "'" && !inQuote) {
      inQuote = true;
      current += char;
    } else if (char === "'" && inQuote) {
      // Check if it's an escaped quote ('')
      if (next === "'") {
        current += char + next;
        i++; // Skip next quote
      } else {
        // End of quoted string
        inQuote = false;
        current += char;
      }
    } else if (char === '(' && !inQuote) {
      parenDepth++;
      current += char;
    } else if (char === ')' && !inQuote) {
      parenDepth--;
      current += char;
    } else if (char === ',' && !inQuote && parenDepth === 0) {
      // Field separator
      fields.push(current.trim());
      current = '';
    } else {
      current += char;
    }
  }

  // Add last field
  if (current.trim()) {
    fields.push(current.trim());
  }

  if (fields.length < 8) {
    throw new Error(`Expected 8 fields, got ${fields.length}`);
  }

  // Clean field values
  const cleanField = (field) => {
    field = field.trim();
    // Remove outer quotes
    if (field.startsWith("'") && field.endsWith("'")) {
      field = field.slice(1, -1);
    }
    // Unescape doubled quotes
    field = field.replace(/''/g, "'");
    return field;
  };

  return {
    id: cleanField(fields[0]),
    section: cleanField(fields[1]),
    title: cleanField(fields[2]),
    description: cleanField(fields[3]),
    difficulty: cleanField(fields[4]),
    estimated_minutes: parseInt(cleanField(fields[5])) || 30,
    order_index: parseInt(cleanField(fields[6])) || 0,
    content: cleanField(fields[7])
  };
}

async function main() {
  try {
    // Step 1: Read and parse SQL file
    console.log('📖 Reading SQL file...');
    const sqlContent = fs.readFileSync(SQL_FILE, 'utf8');

    console.log('🔍 Extracting INSERT blocks...');
    const blocks = extractInsertBlocks(sqlContent);

    console.log(`✅ Found ${blocks.length} INSERT statements\n`);

    if (blocks.length === 0) {
      console.error('❌ No INSERT statements found');
      process.exit(1);
    }

    // Step 2: Parse each block
    console.log('📊 Parsing lessons...');
    const lessons = [];

    for (let i = 0; i < blocks.length; i++) {
      try {
        const lesson = parseInsertBlock(blocks[i]);
        lessons.push(lesson);
      } catch (error) {
        console.warn(`⚠️  Warning: Failed to parse block ${i + 1}: ${error.message}`);
      }
    }

    console.log(`✅ Parsed ${lessons.length} lessons successfully\n`);

    if (lessons.length === 0) {
      console.error('❌ No lessons could be parsed');
      process.exit(1);
    }

    // Step 3: Restore to database
    console.log('⏳ Restoring to Supabase...\n');

    let successCount = 0;
    let errorCount = 0;

    for (let i = 0; i < lessons.length; i++) {
      const lesson = lessons[i];

      process.stdout.write(`   [${i + 1}/${lessons.length}] ${lesson.id.padEnd(25)}...`);

      try {
        const { error } = await supabase
          .from('lessons')
          .upsert(lesson, {
            onConflict: 'id'
          });

        if (error) {
          console.log(` ❌`);
          console.error(`      Error: ${error.message.substring(0, 80)}`);
          errorCount++;
        } else {
          console.log(` ✅`);
          successCount++;
        }
      } catch (err) {
        console.log(` ❌`);
        console.error(`      Error: ${err.message.substring(0, 80)}`);
        errorCount++;
      }

      // Small delay to avoid rate limiting
      await new Promise(resolve => setTimeout(resolve, 100));
    }

    console.log('\n' + '='.repeat(60));
    console.log('📊 RESTORATION SUMMARY');
    console.log('='.repeat(60));
    console.log(`✅ Successfully restored: ${successCount} lessons`);
    console.log(`❌ Failed: ${errorCount} lessons`);
    console.log(`📈 Success rate: ${((successCount / lessons.length) * 100).toFixed(1)}%`);
    console.log('='.repeat(60) + '\n');

    if (successCount > 0) {
      console.log('🎉 Restoration complete!\n');

      // Verify
      const { count, error } = await supabase
        .from('lessons')
        .select('*', { count: 'exact', head: true });

      if (!error) {
        console.log(`✅ Total lessons in database: ${count}\n`);
      }
    }

  } catch (error) {
    console.error('\n❌ Fatal error:', error.message);
    console.error(error.stack);
    process.exit(1);
  }
}

main();
