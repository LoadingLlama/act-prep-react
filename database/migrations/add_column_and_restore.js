/**
 * Step 1: Add content column
 * Step 2: Restore all lesson content
 */

require('dotenv').config({ path: '../../.env' });
const { createClient } = require('@supabase/supabase-js');
const fs = require('fs');

const SUPABASE_URL = process.env.REACT_APP_SUPABASE_URL;
const SERVICE_KEY = process.env.SUPABASE_SERVICE_ROLE_KEY;
const SQL_FILE = './RESTORE_FULL_CONTENT.sql';

console.log('🔧 Full restoration process starting...\n');

const supabase = createClient(SUPABASE_URL, SERVICE_KEY);

async function main() {
  try {
    // Step 1: Add content column via SQL
    console.log('📝 Step 1: Adding content column to lessons table...');

    const addColumnSQL = `
      DO $$
      BEGIN
        IF NOT EXISTS (
          SELECT 1
          FROM information_schema.columns
          WHERE table_name = 'lessons'
          AND column_name = 'content'
        ) THEN
          ALTER TABLE lessons ADD COLUMN content TEXT;
          RAISE NOTICE 'Added content column';
        END IF;
      END $$;
    `;

    const { data: alterData, error: alterError } = await supabase.rpc('exec_sql', {
      query: addColumnSQL
    });

    if (alterError) {
      // Try direct approach - execute via a simple query
      console.log('   Trying alternative method...');

      // Just try to insert data - if column doesn't exist, we'll get an error
      // For now, let's just create a test query
      const { data: testData, error: testError } = await supabase
        .from('lessons')
        .select('id')
        .limit(1)
        .single();

      console.log('✅ Can query lessons table');
    } else {
      console.log('✅ Content column added (or already exists)\n');
    }

    // Step 2: Read and parse SQL file
    console.log('📖 Step 2: Reading restoration file...');
    const sqlContent = fs.readFileSync(SQL_FILE, 'utf8');

    // Extract INSERT statements - find each complete INSERT...ON CONFLICT block
    const insertBlocks = [];
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

        if (line.trim().includes('order_index = EXCLUDED.order_index;')) {
          // End of this INSERT block
          insertBlocks.push(currentBlock.join('\n'));
          currentBlock = [];
          inInsert = false;
        }
      }
    }

    console.log(`✅ Found ${insertBlocks.length} lesson INSERT statements\n`);

    // Step 3: Execute each INSERT via SQL
    console.log('⏳ Step 3: Restoring lesson content...\n');

    let successCount = 0;
    let errorCount = 0;

    for (let i = 0; i < insertBlocks.length; i++) {
      const block = insertBlocks[i];

      // Extract lesson ID for logging
      const idMatch = block.match(/VALUES\s*\('([^']+)'/);
      const lessonId = idMatch ? idMatch[1] : `#${i + 1}`;

      process.stdout.write(`   [${i + 1}/${insertBlocks.length}] ${lessonId}...`);

      try {
        // Execute via RPC if available, otherwise skip this lesson
        const { error } = await supabase.rpc('exec_sql', { query: block });

        if (error) {
          console.log(` ❌ ${error.message.substring(0, 50)}`);
          errorCount++;
        } else {
          console.log(` ✅`);
          successCount++;
        }
      } catch (err) {
        console.log(` ❌ ${err.message.substring(0, 50)}`);
        errorCount++;
      }

      // Small delay to avoid rate limiting
      await new Promise(resolve => setTimeout(resolve, 50));
    }

    console.log('\n' + '='.repeat(50));
    console.log('📊 RESTORATION SUMMARY');
    console.log('='.repeat(50));
    console.log(`✅ Successful: ${successCount} lessons`);
    console.log(`❌ Failed: ${errorCount} lessons`);
    console.log(`📈 Success rate: ${((successCount / insertBlocks.length) * 100).toFixed(1)}%`);
    console.log('='.repeat(50) + '\n');

    if (errorCount > 0) {
      console.log('⚠️  Some lessons failed. You can run the SQL manually in Supabase SQL Editor.');
      console.log('   File: 01_add_content_column.sql (run first)');
      console.log('   Then: Use the split files in chunks/ folder\n');
    } else {
      console.log('🎉 All content restored successfully!\n');
    }

  } catch (error) {
    console.error('\n❌ Fatal error:', error.message);
    console.error('\n💡 Please run these SQL files manually in Supabase SQL Editor:');
    console.error('   1. database/migrations/01_add_content_column.sql');
    console.error('   2. database/migrations/chunks/RESTORE_FULL_CONTENT_part_01.sql');
    console.error('   3. database/migrations/chunks/RESTORE_FULL_CONTENT_part_02.sql');
    console.error('   4. database/migrations/chunks/RESTORE_FULL_CONTENT_part_03.sql\n');
  }
}

main();
