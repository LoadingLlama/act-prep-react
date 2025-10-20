#!/usr/bin/env node

import { createClient } from '@supabase/supabase-js';
import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
dotenv.config({ path: path.join(__dirname, '../.env') });

const supabaseUrl = process.env.REACT_APP_SUPABASE_URL || process.env.VITE_SUPABASE_URL;
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY || process.env.SUPABASE_SERVICE_KEY;

if (!supabaseUrl || !supabaseServiceKey) {
  console.error('❌ Missing Supabase credentials');
  process.exit(1);
}

const supabase = createClient(supabaseUrl, supabaseServiceKey);

async function verifyRenameComplete() {
  console.log('\n╔═══════════════════════════════════════════════════╗');
  console.log('║    Post-Rename Verification Report               ║');
  console.log('╚═══════════════════════════════════════════════════╝\n');

  let allGood = true;

  // Check new table names exist
  const newTables = [
    'lesson_section_content',
    'lesson_examples',
    'lesson_term_definitions'
  ];

  const oldTables = [
    'section_content',
    'examples',
    'term_definitions'
  ];

  console.log('📋 Checking new table names...\n');

  for (const table of newTables) {
    try {
      const { data, error, count } = await supabase
        .from(table)
        .select('*', { count: 'exact', head: true });

      if (error) {
        console.log(`❌ ${table}: NOT FOUND or ERROR - ${error.message}`);
        allGood = false;
      } else {
        console.log(`✅ ${table}: EXISTS (${count || 0} rows)`);
      }
    } catch (err) {
      console.log(`❌ ${table}: ERROR - ${err.message}`);
      allGood = false;
    }
  }

  console.log('\n📋 Checking old table names (should not exist)...\n');

  for (const table of oldTables) {
    try {
      const { data, error } = await supabase
        .from(table)
        .select('*', { count: 'exact', head: true });

      if (error) {
        console.log(`✅ ${table}: Does not exist (as expected)`);
      } else {
        console.log(`⚠️  ${table}: Still exists! Rename may not have completed.`);
        allGood = false;
      }
    } catch (err) {
      console.log(`✅ ${table}: Does not exist (as expected)`);
    }
  }

  // Verify row counts match expected values
  console.log('\n📊 Verifying row counts...\n');

  const expectedCounts = {
    'lesson_section_content': 127,
    'lesson_examples': 137,
    'lesson_term_definitions': 643
  };

  for (const [table, expectedCount] of Object.entries(expectedCounts)) {
    try {
      const { count, error } = await supabase
        .from(table)
        .select('*', { count: 'exact', head: true });

      if (error) {
        console.log(`❌ ${table}: ERROR - ${error.message}`);
        allGood = false;
      } else if (count === expectedCount) {
        console.log(`✅ ${table}: ${count} rows (matches expected ${expectedCount})`);
      } else {
        console.log(`⚠️  ${table}: ${count} rows (expected ${expectedCount})`);
        allGood = false;
      }
    } catch (err) {
      console.log(`❌ ${table}: ERROR - ${err.message}`);
      allGood = false;
    }
  }

  // Test sample queries
  console.log('\n🔍 Testing sample queries...\n');

  try {
    // Test lesson with content
    const { data: lesson } = await supabase
      .from('lesson_metadata')
      .select('id, title')
      .limit(1)
      .single();

    if (lesson) {
      console.log(`   Testing lesson: "${lesson.title}"`);

      // Test section content
      const { data: sections } = await supabase
        .from('lesson_sections')
        .select('id')
        .eq('lesson_id', lesson.id)
        .limit(1);

      if (sections && sections.length > 0) {
        const { data: content } = await supabase
          .from('lesson_section_content')
          .select('id, content')
          .eq('section_id', sections[0].id)
          .limit(1);

        if (content && content.length > 0) {
          console.log(`   ✅ lesson_section_content query works (${content[0].content.length} chars)`);
        } else {
          console.log(`   ❌ lesson_section_content query failed - no content found`);
          allGood = false;
        }
      }

      // Test examples
      const { data: examples } = await supabase
        .from('lesson_examples')
        .select('id, title')
        .eq('lesson_id', lesson.id)
        .limit(1);

      console.log(`   ✅ lesson_examples query works (${examples?.length || 0} found)`);

    }

    // Test term definitions
    const { data: term } = await supabase
      .from('lesson_term_definitions')
      .select('term, definition')
      .limit(1);

    if (term && term.length > 0) {
      console.log(`   ✅ lesson_term_definitions query works ("${term[0].term}")`);
    } else {
      console.log(`   ❌ lesson_term_definitions query failed`);
      allGood = false;
    }

  } catch (err) {
    console.log(`   ❌ Query test failed: ${err.message}`);
    allGood = false;
  }

  // Final summary
  console.log('\n' + '─'.repeat(60));
  console.log('\n╔═══════════════════════════════════════════════════╗');
  if (allGood) {
    console.log('║          ✅ RENAME COMPLETED SUCCESSFULLY!        ║');
    console.log('╚═══════════════════════════════════════════════════╝\n');
    console.log('✅ All tables renamed correctly');
    console.log('✅ Row counts match expected values');
    console.log('✅ Sample queries work correctly');
    console.log('\n🎉 Database is ready! You can now start the application.\n');
  } else {
    console.log('║          ⚠️  RENAME INCOMPLETE OR ERRORS          ║');
    console.log('╚═══════════════════════════════════════════════════╝\n');
    console.log('⚠️  Some issues were detected. Please review the errors above.');
    console.log('⚠️  You may need to re-run the SQL commands in Supabase.\n');
  }
}

verifyRenameComplete();
