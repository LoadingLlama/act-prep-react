/**
 * Parse the SQL file and restore lessons using Supabase client
 * This bypasses SQL escaping issues entirely
 */

require('dotenv').config({ path: '../../.env' });
const { createClient } = require('@supabase/supabase-js');
const fs = require('fs');

const SUPABASE_URL = process.env.REACT_APP_SUPABASE_URL;
const SERVICE_KEY = process.env.SUPABASE_SERVICE_ROLE_KEY;
const SQL_FILE = './RESTORE_FULL_CONTENT.sql';

console.log('🔄 Starting lesson restoration (bypassing SQL parsing)...\n');

const supabase = createClient(SUPABASE_URL, SERVICE_KEY, {
  db: { schema: 'public' },
  auth: { persistSession: false }
});

/**
 * Extract lessons from SQL file using regex
 * This extracts the actual data values from INSERT statements
 */
function extractLessonsFromSQL(sqlContent) {
  const lessons = [];

  // Split by INSERT statements
  const insertPattern = /INSERT INTO lessons \([^)]+\) VALUES\s*\(([^;]+)\)\s*ON CONFLICT/gs;

  let match;
  while ((match = insertPattern.exec(sqlContent)) !== null) {
    const valuesStr = match[1];

    try {
      // Parse the values more carefully
      // Format: ('id', 'section', 'title', 'description', 'difficulty', minutes, order_index, 'content')

      // Find each field by looking for quoted strings and numbers
      const fields = [];
      let current = '';
      let inQuote = false;
      let quoteChar = null;
      let depth = 0;

      for (let i = 0; i < valuesStr.length; i++) {
        const char = valuesStr[i];
        const prev = i > 0 ? valuesStr[i - 1] : '';
        const next = i < valuesStr.length - 1 ? valuesStr[i + 1] : '';

        // Handle quotes
        if ((char === "'" || char === '"') && prev !== '\\') {
          if (!inQuote) {
            inQuote = true;
            quoteChar = char;
            current += char;
          } else if (char === quoteChar) {
            // Check if it's an escaped quote (doubled)
            if (next === quoteChar) {
              current += char + next;
              i++; // Skip next char
            } else {
              inQuote = false;
              quoteChar = null;
              current += char;
            }
          } else {
            current += char;
          }
          continue;
        }

        // Handle parentheses depth
        if (char === '(' && !inQuote) depth++;
        if (char === ')' && !inQuote) depth--;

        // Handle commas (field separators)
        if (char === ',' && !inQuote && depth === 0) {
          fields.push(current.trim());
          current = '';
          continue;
        }

        current += char;
      }

      // Add last field
      if (current.trim()) {
        fields.push(current.trim());
      }

      if (fields.length >= 8) {
        // Clean each field
        const cleanField = (field) => {
          field = field.trim();
          // Remove outer quotes
          if ((field.startsWith("'") && field.endsWith("'")) ||
              (field.startsWith('"') && field.endsWith('"'))) {
            field = field.slice(1, -1);
          }
          // Unescape doubled quotes
          field = field.replace(/''/g, "'");
          return field;
        };

        const lesson = {
          id: cleanField(fields[0]),
          section: cleanField(fields[1]),
          title: cleanField(fields[2]),
          description: cleanField(fields[3]),
          difficulty: cleanField(fields[4]),
          estimated_minutes: parseInt(cleanField(fields[5])) || 30,
          order_index: parseInt(cleanField(fields[6])) || 0,
          content: cleanField(fields[7])
        };

        lessons.push(lesson);
      }
    } catch (error) {
      console.error('⚠️  Warning: Failed to parse a lesson:', error.message);
    }
  }

  return lessons;
}

async function main() {
  try {
    // Step 1: Ensure content column exists
    console.log('📝 Step 1: Ensuring content column exists...');

    const { data: schemaData, error: schemaError } = await supabase
      .from('lessons')
      .select('*')
      .limit(1);

    if (schemaError) {
      console.error('❌ Error checking schema:', schemaError.message);
      console.log('\n💡 Please run this SQL in Supabase SQL Editor first:');
      console.log('   ALTER TABLE lessons ADD COLUMN IF NOT EXISTS content TEXT;\n');
      process.exit(1);
    }

    console.log('✅ Schema check passed\n');

    // Step 2: Parse SQL file
    console.log('📖 Step 2: Parsing SQL file...');
    const sqlContent = fs.readFileSync(SQL_FILE, 'utf8');
    const lessons = extractLessonsFromSQL(sqlContent);

    console.log(`✅ Extracted ${lessons.length} lessons\n`);

    if (lessons.length === 0) {
      console.error('❌ No lessons found in SQL file');
      process.exit(1);
    }

    // Step 3: Restore lessons one by one
    console.log('⏳ Step 3: Restoring lessons...\n');

    let successCount = 0;
    let errorCount = 0;

    for (let i = 0; i < lessons.length; i++) {
      const lesson = lessons[i];

      process.stdout.write(`   [${i + 1}/${lessons.length}] ${lesson.id}...`);

      try {
        const { error } = await supabase
          .from('lessons')
          .upsert(lesson, {
            onConflict: 'id',
            ignoreDuplicates: false
          });

        if (error) {
          console.log(` ❌`);
          console.error(`      Error: ${error.message}`);
          errorCount++;
        } else {
          console.log(` ✅`);
          successCount++;
        }
      } catch (err) {
        console.log(` ❌`);
        console.error(`      Error: ${err.message}`);
        errorCount++;
      }

      // Small delay to avoid rate limiting
      await new Promise(resolve => setTimeout(resolve, 100));
    }

    console.log('\n' + '='.repeat(50));
    console.log('📊 RESTORATION SUMMARY');
    console.log('='.repeat(50));
    console.log(`✅ Successfully restored: ${successCount} lessons`);
    console.log(`❌ Failed: ${errorCount} lessons`);
    console.log(`📈 Success rate: ${((successCount / lessons.length) * 100).toFixed(1)}%`);
    console.log('='.repeat(50) + '\n');

    if (successCount > 0) {
      console.log('🎉 Restoration complete!\n');
    }

  } catch (error) {
    console.error('\n❌ Fatal error:', error.message);
    console.error(error.stack);
    process.exit(1);
  }
}

main();
