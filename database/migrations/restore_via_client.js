/**
 * Restore lesson content using Supabase JavaScript client
 * This bypasses SQL editor size limits by inserting data programmatically
 *
 * Usage: node restore_via_client.js
 *
 * Requirements:
 * - SUPABASE_URL and SUPABASE_SERVICE_KEY in .env file
 * - @supabase/supabase-js installed
 */

require('dotenv').config({ path: '../../.env' });
const { createClient } = require('@supabase/supabase-js');
const fs = require('fs');

// Configuration
const SUPABASE_URL = process.env.REACT_APP_SUPABASE_URL || process.env.SUPABASE_URL;
const SUPABASE_KEY = process.env.SUPABASE_SERVICE_KEY || process.env.REACT_APP_SUPABASE_ANON_KEY;
const SQL_FILE = './RESTORE_FULL_CONTENT.sql';
const BATCH_SIZE = 10; // Insert 10 lessons at a time

console.log('🔄 Starting content restoration via Supabase client...\n');

// Validate environment variables
if (!SUPABASE_URL || !SUPABASE_KEY) {
  console.error('❌ Error: SUPABASE_URL and SUPABASE_SERVICE_KEY must be set');
  console.error('   Add them to your .env file\n');
  process.exit(1);
}

console.log(`🔗 Supabase URL: ${SUPABASE_URL}`);
console.log(`📄 SQL File: ${SQL_FILE}\n`);

// Initialize Supabase client
const supabase = createClient(SUPABASE_URL, SUPABASE_KEY);

/**
 * Parse SQL INSERT statements into lesson objects
 */
function parseSqlFile(filepath) {
  const content = fs.readFileSync(filepath, 'utf8');
  const lessons = [];

  // Match INSERT INTO lessons statements
  const insertRegex = /INSERT INTO lessons \(id, section, title, description, difficulty, estimated_minutes, order_index, content\) VALUES\s*\(([^;]+)\)/gs;

  let match;
  let count = 0;

  while ((match = insertRegex.exec(content)) !== null) {
    count++;
    const values = match[1];

    try {
      // Parse the values - this is tricky because of quotes and HTML
      const parsed = parseInsertValues(values);
      if (parsed) {
        lessons.push(parsed);
      }
    } catch (error) {
      console.warn(`⚠️  Warning: Failed to parse lesson ${count}:`, error.message);
    }
  }

  return lessons;
}

/**
 * Parse VALUES clause into lesson object
 */
function parseInsertValues(valuesStr) {
  // Extract fields using a more robust approach
  const fields = [];
  let current = '';
  let inString = false;
  let stringChar = null;
  let depth = 0;

  for (let i = 0; i < valuesStr.length; i++) {
    const char = valuesStr[i];
    const prevChar = i > 0 ? valuesStr[i - 1] : null;

    if ((char === "'" || char === '"') && prevChar !== '\\') {
      if (!inString) {
        inString = true;
        stringChar = char;
      } else if (char === stringChar) {
        inString = false;
        stringChar = null;
      }
    }

    if (char === '(' && !inString) depth++;
    if (char === ')' && !inString) depth--;

    if (char === ',' && !inString && depth === 0) {
      fields.push(current.trim());
      current = '';
    } else {
      current += char;
    }
  }

  if (current.trim()) {
    fields.push(current.trim());
  }

  if (fields.length !== 8) {
    throw new Error(`Expected 8 fields, got ${fields.length}`);
  }

  // Clean up quoted strings
  const cleanField = (field) => {
    field = field.trim();
    if ((field.startsWith("'") && field.endsWith("'")) ||
        (field.startsWith('"') && field.endsWith('"'))) {
      field = field.slice(1, -1);
      // Unescape quotes
      field = field.replace(/''/g, "'").replace(/\\'/g, "'");
    }
    return field;
  };

  return {
    id: cleanField(fields[0]),
    section: cleanField(fields[1]),
    title: cleanField(fields[2]),
    description: cleanField(fields[3]),
    difficulty: cleanField(fields[4]),
    estimated_minutes: parseInt(cleanField(fields[5])),
    order_index: parseInt(cleanField(fields[6])),
    content: cleanField(fields[7])
  };
}

/**
 * Insert lessons in batches
 */
async function insertLessons(lessons) {
  let successCount = 0;
  let errorCount = 0;

  console.log(`📊 Total lessons to restore: ${lessons.length}\n`);

  for (let i = 0; i < lessons.length; i += BATCH_SIZE) {
    const batch = lessons.slice(i, i + BATCH_SIZE);
    const batchNum = Math.floor(i / BATCH_SIZE) + 1;
    const totalBatches = Math.ceil(lessons.length / BATCH_SIZE);

    console.log(`⏳ Processing batch ${batchNum}/${totalBatches} (${batch.length} lessons)...`);

    // Use upsert to handle conflicts
    const { data, error } = await supabase
      .from('lessons')
      .upsert(batch, {
        onConflict: 'id',
        ignoreDuplicates: false
      });

    if (error) {
      console.error(`   ❌ Batch ${batchNum} failed:`, error.message);
      errorCount += batch.length;
    } else {
      console.log(`   ✅ Batch ${batchNum} completed successfully`);
      successCount += batch.length;
    }

    // Small delay to avoid rate limits
    await new Promise(resolve => setTimeout(resolve, 100));
  }

  return { successCount, errorCount };
}

/**
 * Main execution
 */
async function main() {
  try {
    // Parse SQL file
    console.log('📖 Parsing SQL file...');
    const lessons = parseSqlFile(SQL_FILE);
    console.log(`✅ Parsed ${lessons.length} lessons\n`);

    if (lessons.length === 0) {
      console.error('❌ No lessons found in SQL file');
      process.exit(1);
    }

    // Insert lessons
    const { successCount, errorCount } = await insertLessons(lessons);

    // Summary
    console.log('\n' + '='.repeat(50));
    console.log('📊 RESTORATION SUMMARY');
    console.log('='.repeat(50));
    console.log(`✅ Successfully restored: ${successCount} lessons`);
    console.log(`❌ Failed: ${errorCount} lessons`);
    console.log(`📈 Success rate: ${((successCount / lessons.length) * 100).toFixed(1)}%`);
    console.log('='.repeat(50) + '\n');

    if (errorCount > 0) {
      console.log('⚠️  Some lessons failed to restore. Check errors above.');
      process.exit(1);
    } else {
      console.log('🎉 All content restored successfully!');
    }

  } catch (error) {
    console.error('\n❌ Fatal error:', error.message);
    console.error(error.stack);
    process.exit(1);
  }
}

// Run the script
main();
