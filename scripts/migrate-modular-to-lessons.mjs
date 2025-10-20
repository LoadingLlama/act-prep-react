#!/usr/bin/env node

/**
 * Migration Script: Consolidate Modular Tables into Single Lessons Table
 *
 * This script migrates all data from the modular lesson structure
 * (lesson_metadata, lesson_sections, lesson_section_content, lesson_examples, lesson_term_definitions)
 * back into a single 'lessons' table.
 *
 * Steps:
 * 1. Fetch all lesson_metadata records
 * 2. For each lesson, fetch and join all related data
 * 3. Reconstruct full lesson content from sections and content blocks
 * 4. Upsert into lessons table
 */

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

/**
 * Fetch all sections and content for a lesson and reconstruct HTML content
 */
async function reconstructLessonContent(lessonId) {
  // Fetch all sections for this lesson
  const { data: sections, error: sectionsError } = await supabase
    .from('lesson_sections')
    .select('id, section_key, title, section_type, order_index')
    .eq('lesson_id', lessonId)
    .order('order_index', { ascending: true });

  if (sectionsError || !sections || sections.length === 0) {
    console.log(`   ⚠️  No sections found`);
    return '';
  }

  let fullContent = '';

  // For each section, fetch content blocks
  for (const section of sections) {
    const { data: contentBlocks, error: contentError } = await supabase
      .from('lesson_section_content')
      .select('content, content_type, order_index')
      .eq('section_id', section.id)
      .order('order_index', { ascending: true });

    if (contentError || !contentBlocks || contentBlocks.length === 0) {
      console.log(`   ⚠️  No content for section: ${section.section_key}`);
      continue;
    }

    // Join all content blocks for this section
    const sectionContent = contentBlocks.map(block => block.content).join('\n');
    fullContent += sectionContent + '\n\n';
  }

  return fullContent.trim();
}

/**
 * Main migration function
 */
async function migrateModularToLessons() {
  console.log('\n╔═════════════════════════════════════════════════════════╗');
  console.log('║  MIGRATION: Modular Tables → Single Lessons Table      ║');
  console.log('╚═════════════════════════════════════════════════════════╝\n');

  // Step 1: Fetch all lesson metadata
  console.log('📊 Step 1: Fetching all lessons from lesson_metadata...\n');

  const { data: metadataRecords, error: fetchError } = await supabase
    .from('lesson_metadata')
    .select('*')
    .order('order_index', { ascending: true });

  if (fetchError) {
    console.error('❌ Error fetching lesson_metadata:', fetchError.message);
    process.exit(1);
  }

  console.log(`✅ Found ${metadataRecords.length} lessons to migrate\n`);

  // Step 2: For each lesson, reconstruct full content and prepare for insertion
  console.log('🔄 Step 2: Reconstructing lesson content from modular tables...\n');

  const lessonsToInsert = [];
  let successCount = 0;
  let errorCount = 0;

  for (const metadata of metadataRecords) {
    try {
      console.log(`Processing: ${metadata.lesson_key} - ${metadata.title}`);

      // Reconstruct content from sections and content blocks
      const content = await reconstructLessonContent(metadata.id);

      const lessonRecord = {
        subject: metadata.subject,
        lesson_key: metadata.lesson_key,
        title: metadata.title,
        content: content,
        order_index: metadata.order_index,
        created_at: metadata.created_at,
        updated_at: metadata.updated_at || new Date().toISOString()
      };

      // Check if we need to add topic fields (for math lessons)
      if (metadata.lesson_key && metadata.lesson_key.includes('.')) {
        const parts = metadata.lesson_key.split('.');
        lessonRecord.topic_number = parseInt(parts[0], 10);
        lessonRecord.topic_lesson_number = parseInt(parts[1], 10);
        lessonRecord.full_topic_code = metadata.lesson_key;
      }

      lessonsToInsert.push(lessonRecord);
      console.log(`   ✅ Reconstructed (${content.length} chars)\n`);
      successCount++;

    } catch (err) {
      console.error(`   ❌ Error processing ${metadata.lesson_key}:`, err.message, '\n');
      errorCount++;
    }
  }

  console.log(`\n📈 Reconstruction Summary: ${successCount} successful, ${errorCount} errors\n`);

  // Step 3: Clear old data from lessons table
  console.log('🗑️  Step 3: Clearing old data from lessons table...\n');

  const { error: deleteError } = await supabase
    .from('lessons')
    .delete()
    .neq('id', '00000000-0000-0000-0000-000000000000'); // Delete all

  if (deleteError) {
    console.error('❌ Error clearing lessons table:', deleteError.message);
    console.log('⚠️  Proceeding anyway (will upsert)...\n');
  } else {
    console.log('✅ Old data cleared\n');
  }

  // Step 4: Insert all lessons into lessons table
  console.log('💾 Step 4: Inserting consolidated lessons into lessons table...\n');

  let insertedCount = 0;
  let insertErrors = 0;

  // Insert in batches of 10 to avoid overwhelming the database
  const batchSize = 10;
  for (let i = 0; i < lessonsToInsert.length; i += batchSize) {
    const batch = lessonsToInsert.slice(i, i + batchSize);

    const { data, error: insertError } = await supabase
      .from('lessons')
      .insert(batch)
      .select();

    if (insertError) {
      console.error(`❌ Batch ${Math.floor(i / batchSize) + 1} error:`, insertError.message);
      insertErrors += batch.length;
    } else {
      console.log(`✅ Batch ${Math.floor(i / batchSize) + 1}: Inserted ${data.length} lessons`);
      insertedCount += data.length;
    }
  }

  console.log('\n╔═════════════════════════════════════════════════════════╗');
  console.log('║  MIGRATION COMPLETE                                     ║');
  console.log('╚═════════════════════════════════════════════════════════╝\n');

  console.log(`✅ Successfully migrated: ${insertedCount} lessons`);
  console.log(`❌ Errors: ${insertErrors} lessons\n`);

  // Step 5: Verify the migration
  console.log('🔍 Step 5: Verifying migration...\n');

  const { count: finalCount } = await supabase
    .from('lessons')
    .select('*', { count: 'exact', head: true });

  console.log(`📊 Final count in lessons table: ${finalCount} rows`);

  if (finalCount === metadataRecords.length) {
    console.log('✅ Migration verified! All lessons successfully migrated.\n');
  } else {
    console.log(`⚠️  Warning: Expected ${metadataRecords.length} but got ${finalCount}\n`);
  }

  console.log('✅ Next steps:');
  console.log('   1. Update backend services to use lessons table only');
  console.log('   2. Test the application');
  console.log('   3. Drop modular tables once verified\n');
}

// Run the migration
migrateModularToLessons().catch(err => {
  console.error('\n❌ Fatal error:', err);
  process.exit(1);
});
