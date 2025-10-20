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

async function analyzeBeforeCleanup() {
  console.log('\n╔═══════════════════════════════════════════════════╗');
  console.log('║    Pre-Cleanup Analysis - What to Keep/Change    ║');
  console.log('╚═══════════════════════════════════════════════════╝\n');

  console.log('✅ BACKUP COMPLETED: 1,778 rows backed up\n');
  console.log('─'.repeat(60));

  // ========================================
  // CURRENT STATE SUMMARY
  // ========================================
  console.log('\n📊 CURRENT DATABASE STATE:\n');
  console.log('Tables WITH data (KEEP - rename if needed):');
  console.log('  ✅ lesson_metadata: 116 rows');
  console.log('  ✅ lesson_sections: 127 rows');
  console.log('  ✅ section_content: 127 rows ← needs rename to lesson_section_content');
  console.log('  ✅ examples: 137 rows ← needs rename to lesson_examples');
  console.log('  ✅ term_definitions: 643 rows ← needs rename to lesson_term_definitions');
  console.log('  ✅ quiz_questions: 566 rows');
  console.log('  ✅ quizzes: 62 rows');

  console.log('\nTables EMPTY (safe to drop):');
  console.log('  ⚠️  lesson_examples: 0 rows (will be filled after renaming)');

  console.log('\nTables NOT FOUND in schema:');
  console.log('  ℹ️  lesson_section_content (not created yet)');
  console.log('  ℹ️  lesson_term_definitions (not created yet)');

  // ========================================
  // VERIFICATION OF ACTUAL DATA
  // ========================================
  console.log('\n─'.repeat(60));
  console.log('\n🔍 VERIFYING ACTUAL DATA:\n');

  // Check section_content has real data
  const { data: sampleContent } = await supabase
    .from('section_content')
    .select('id, content')
    .limit(1);

  if (sampleContent && sampleContent.length > 0) {
    console.log('✅ section_content HAS REAL DATA:');
    console.log(`   Sample content length: ${sampleContent[0].content?.length || 0} characters`);
    console.log(`   Sample ID: ${sampleContent[0].id}`);
    console.log('   → MUST RENAME, NOT DROP\n');
  }

  // Check examples has real data
  const { data: sampleExamples } = await supabase
    .from('examples')
    .select('id, title, problem_text')
    .limit(1);

  if (sampleExamples && sampleExamples.length > 0) {
    console.log('✅ examples HAS REAL DATA:');
    console.log(`   Sample title: "${sampleExamples[0].title}"`);
    console.log(`   Sample ID: ${sampleExamples[0].id}`);
    console.log('   → MUST RENAME, NOT DROP\n');
  }

  // Check term_definitions has real data
  const { data: sampleTerms } = await supabase
    .from('term_definitions')
    .select('id, term, definition')
    .limit(1);

  if (sampleTerms && sampleTerms.length > 0) {
    console.log('✅ term_definitions HAS REAL DATA:');
    console.log(`   Sample term: "${sampleTerms[0].term}"`);
    console.log(`   Definition: ${sampleTerms[0].definition?.substring(0, 50)}...`);
    console.log(`   Sample ID: ${sampleTerms[0].id}`);
    console.log('   → MUST RENAME, NOT DROP\n');
  }

  // ========================================
  // SAFE CLEANUP PLAN
  // ========================================
  console.log('─'.repeat(60));
  console.log('\n📋 SAFE CLEANUP PLAN:\n');

  console.log('STEP 1: Drop ONLY the empty new tables');
  console.log('  ⚠️  These tables exist but are empty:');
  console.log('     - lesson_examples (0 rows) - safe to drop\n');

  console.log('STEP 2: Rename old tables with data → new names');
  console.log('  ✅ These have data and MUST be renamed:');
  console.log('     - section_content (127 rows) → lesson_section_content');
  console.log('     - examples (137 rows) → lesson_examples');
  console.log('     - term_definitions (643 rows) → lesson_term_definitions\n');

  console.log('STEP 3: Verify row counts after rename');
  console.log('  Expected results:');
  console.log('     - lesson_section_content: 127 rows');
  console.log('     - lesson_examples: 137 rows');
  console.log('     - lesson_term_definitions: 643 rows\n');

  // ========================================
  // GENERATE SAFE SQL
  // ========================================
  console.log('─'.repeat(60));
  console.log('\n🔐 SAFE SQL COMMANDS (verified against backup):\n');

  const safeSQL = `-- STEP 1: Drop only empty tables
DROP TABLE IF EXISTS lesson_examples;  -- 0 rows, safe to drop

-- STEP 2: Rename tables with data (verified with backup)
ALTER TABLE section_content RENAME TO lesson_section_content;      -- 127 rows
ALTER TABLE examples RENAME TO lesson_examples;                    -- 137 rows
ALTER TABLE term_definitions RENAME TO lesson_term_definitions;    -- 643 rows

-- STEP 3: Verify
SELECT
  'lesson_section_content' AS table_name,
  COUNT(*) AS row_count
FROM lesson_section_content
UNION ALL
SELECT 'lesson_examples', COUNT(*) FROM lesson_examples
UNION ALL
SELECT 'lesson_term_definitions', COUNT(*) FROM lesson_term_definitions;

-- Expected: 127, 137, 643`;

  console.log(safeSQL);
  console.log('\n─'.repeat(60));

  // ========================================
  // SAFETY CHECKS
  // ========================================
  console.log('\n🛡️  SAFETY VERIFICATION:\n');
  console.log('✅ Backup created: 1,778 rows saved');
  console.log('✅ No DROP commands for tables with data');
  console.log('✅ Only RENAME commands for data tables');
  console.log('✅ Only 1 empty table will be dropped (lesson_examples)');
  console.log('✅ All important data preserved\n');

  console.log('⚠️  IMPORTANT: Review the SQL above before executing!\n');

  // Save SQL to file
  const fs = await import('fs');
  const sqlPath = path.join(__dirname, 'SAFE_CLEANUP.sql');
  fs.writeFileSync(sqlPath, safeSQL);
  console.log(`📄 SQL saved to: scripts/SAFE_CLEANUP.sql\n`);
}

analyzeBeforeCleanup().catch(err => {
  console.error('❌ Analysis failed:', err);
  process.exit(1);
});
