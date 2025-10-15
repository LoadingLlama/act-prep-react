#!/usr/bin/env node

/**
 * Migration Script: Split Lessons into Modular Structure
 * This script:
 * 1. Creates the modular tables if they don't exist
 * 2. Fetches existing lessons from the 'lessons' table
 * 3. Parses HTML content and splits into sections
 * 4. Migrates data to the new modular tables
 */

import { createClient } from '@supabase/supabase-js';
import * as cheerio from 'cheerio';
import dotenv from 'dotenv';

// Load environment variables
dotenv.config();

const supabaseUrl = process.env.REACT_APP_SUPABASE_URL;
const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

if (!supabaseUrl || !supabaseKey) {
  console.error('❌ Missing Supabase credentials in .env file');
  process.exit(1);
}

const supabase = createClient(supabaseUrl, supabaseKey);

console.log('🚀 Starting lesson migration to modular structure...\n');

// Step 1: Check if tables exist
async function checkTablesExist() {
  console.log('📊 Checking if modular tables exist...');

  const { data, error } = await supabase
    .from('lesson_metadata')
    .select('id')
    .limit(1);

  if (error && error.code === '42P01') {
    console.log('❌ Modular tables do not exist. Creating them...\n');
    return false;
  }

  console.log('✅ Modular tables already exist.\n');
  return true;
}

// Step 2: Create modular tables
async function createModularTables() {
  console.log('🔨 Creating modular tables...');

  const createTablesSql = `
    -- 1. LESSON METADATA (Core lesson information)
    CREATE TABLE IF NOT EXISTS lesson_metadata (
      id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
      lesson_key VARCHAR(100) UNIQUE NOT NULL,
      title VARCHAR(255) NOT NULL,
      subject VARCHAR(50) NOT NULL,
      category VARCHAR(100),
      difficulty_level INTEGER DEFAULT 1,
      duration_minutes INTEGER DEFAULT 30,
      order_index INTEGER DEFAULT 0,
      is_published BOOLEAN DEFAULT true,
      created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
      updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
    );

    -- 2. LESSON SECTIONS (Break lessons into logical sections)
    CREATE TABLE IF NOT EXISTS lesson_sections (
      id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
      lesson_id UUID REFERENCES lesson_metadata(id) ON DELETE CASCADE,
      section_key VARCHAR(100) NOT NULL,
      title VARCHAR(255) NOT NULL,
      section_type VARCHAR(50) NOT NULL,
      order_index INTEGER DEFAULT 0,
      created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
      UNIQUE(lesson_id, section_key)
    );

    -- 3. SECTION CONTENT (Actual content for each section)
    CREATE TABLE IF NOT EXISTS section_content (
      id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
      section_id UUID REFERENCES lesson_sections(id) ON DELETE CASCADE,
      content_type VARCHAR(50) NOT NULL,
      content TEXT NOT NULL,
      order_index INTEGER DEFAULT 0,
      metadata JSONB,
      created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
    );

    -- 4. LESSON EXAMPLES
    CREATE TABLE IF NOT EXISTS lesson_examples (
      id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
      lesson_id UUID REFERENCES lesson_metadata(id) ON DELETE CASCADE,
      section_id UUID REFERENCES lesson_sections(id) ON DELETE SET NULL,
      title VARCHAR(255),
      problem_text TEXT NOT NULL,
      solution_text TEXT,
      explanation TEXT,
      difficulty INTEGER DEFAULT 1,
      order_index INTEGER DEFAULT 0,
      tags TEXT[],
      created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
    );

    -- Indexes
    CREATE INDEX IF NOT EXISTS idx_lesson_metadata_key ON lesson_metadata(lesson_key);
    CREATE INDEX IF NOT EXISTS idx_lesson_sections_lesson_id ON lesson_sections(lesson_id);
    CREATE INDEX IF NOT EXISTS idx_section_content_section_id ON section_content(section_id);
    CREATE INDEX IF NOT EXISTS idx_lesson_examples_lesson_id ON lesson_examples(lesson_id);

    -- RLS Policies
    ALTER TABLE lesson_metadata ENABLE ROW LEVEL SECURITY;
    ALTER TABLE lesson_sections ENABLE ROW LEVEL SECURITY;
    ALTER TABLE section_content ENABLE ROW LEVEL SECURITY;
    ALTER TABLE lesson_examples ENABLE ROW LEVEL SECURITY;

    DROP POLICY IF EXISTS "Public read access" ON lesson_metadata;
    DROP POLICY IF EXISTS "Public read access" ON lesson_sections;
    DROP POLICY IF EXISTS "Public read access" ON section_content;
    DROP POLICY IF EXISTS "Public read access" ON lesson_examples;

    CREATE POLICY "Public read access" ON lesson_metadata FOR SELECT USING (true);
    CREATE POLICY "Public read access" ON lesson_sections FOR SELECT USING (true);
    CREATE POLICY "Public read access" ON section_content FOR SELECT USING (true);
    CREATE POLICY "Public read access" ON lesson_examples FOR SELECT USING (true);
  `;

  // Execute via SQL
  const { error } = await supabase.rpc('exec_sql', { sql: createTablesSql });

  if (error) {
    console.log('⚠️  Could not create tables via RPC. Tables may already exist or need manual creation.');
    console.log('   Error:', error.message);
    return false;
  }

  console.log('✅ Modular tables created successfully.\n');
  return true;
}

// Step 3: Fetch existing lessons
async function fetchExistingLessons() {
  console.log('📚 Fetching existing lessons from database...');

  const { data, error } = await supabase
    .from('lessons')
    .select('*')
    .order('order_index', { ascending: true });

  if (error) {
    console.error('❌ Error fetching lessons:', error.message);
    return [];
  }

  console.log(`✅ Found ${data.length} lessons to migrate.\n`);
  return data;
}

// Step 4: Parse HTML content into sections
function parseHtmlContent(html, lessonKey) {
  const $ = cheerio.load(html || '');
  const sections = [];
  let sectionIndex = 0;

  // Look for major headings (h1, h2) as section breaks
  const headings = $('h1, h2, h3').toArray();

  if (headings.length === 0) {
    // No headings, treat entire content as one section
    sections.push({
      section_key: `${lessonKey}-main`,
      title: 'Main Content',
      section_type: 'content',
      order_index: 0,
      content: [{
        content_type: 'html',
        content: html,
        order_index: 0
      }]
    });
  } else {
    // Split by headings
    let currentSection = null;
    let contentBuffer = [];

    $('body').children().each((idx, elem) => {
      const tagName = elem.tagName.toLowerCase();

      if (tagName === 'h1' || tagName === 'h2' || tagName === 'h3') {
        // Save previous section
        if (currentSection) {
          currentSection.content = contentBuffer.map((c, i) => ({
            content_type: 'html',
            content: c,
            order_index: i
          }));
          sections.push(currentSection);
        }

        // Start new section
        const title = $(elem).text().trim();
        currentSection = {
          section_key: `${lessonKey}-section-${sectionIndex}`,
          title: title || `Section ${sectionIndex + 1}`,
          section_type: determineSectionType(title),
          order_index: sectionIndex
        };
        contentBuffer = [];
        sectionIndex++;
      } else {
        // Add to current section
        contentBuffer.push($.html(elem));
      }
    });

    // Save last section
    if (currentSection) {
      currentSection.content = contentBuffer.map((c, i) => ({
        content_type: 'html',
        content: c,
        order_index: i
      }));
      sections.push(currentSection);
    }
  }

  return sections;
}

function determineSectionType(title) {
  const lower = title.toLowerCase();

  if (lower.includes('introduction') || lower.includes('overview')) return 'introduction';
  if (lower.includes('example')) return 'example';
  if (lower.includes('practice') || lower.includes('exercise')) return 'practice';
  if (lower.includes('summary') || lower.includes('key takeaway')) return 'summary';
  if (lower.includes('concept') || lower.includes('theory')) return 'concept';

  return 'content';
}

// Step 5: Migrate a single lesson
async function migrateLesson(lesson) {
  console.log(`  📝 Migrating: ${lesson.title} (${lesson.lesson_key})`);

  try {
    // 1. Insert lesson metadata
    const { data: metadata, error: metadataError } = await supabase
      .from('lesson_metadata')
      .upsert({
        lesson_key: lesson.lesson_key,
        title: lesson.title,
        subject: lesson.subject || 'general',
        category: lesson.category,
        difficulty_level: lesson.difficulty || 1,
        duration_minutes: lesson.duration || 30,
        order_index: lesson.order_index || 0,
        is_published: true
      }, { onConflict: 'lesson_key' })
      .select()
      .single();

    if (metadataError) {
      console.error(`     ❌ Error inserting metadata: ${metadataError.message}`);
      return false;
    }

    const lessonId = metadata.id;

    // 2. Parse content into sections
    const sections = parseHtmlContent(lesson.content, lesson.lesson_key);
    console.log(`     → Split into ${sections.length} sections`);

    // 3. Insert sections and content
    for (const section of sections) {
      const { data: sectionData, error: sectionError } = await supabase
        .from('lesson_sections')
        .insert({
          lesson_id: lessonId,
          section_key: section.section_key,
          title: section.title,
          section_type: section.section_type,
          order_index: section.order_index
        })
        .select()
        .single();

      if (sectionError) {
        console.error(`     ❌ Error inserting section: ${sectionError.message}`);
        continue;
      }

      // Insert content blocks
      if (section.content && section.content.length > 0) {
        const contentToInsert = section.content.map(c => ({
          section_id: sectionData.id,
          content_type: c.content_type,
          content: c.content,
          order_index: c.order_index
        }));

        const { error: contentError } = await supabase
          .from('section_content')
          .insert(contentToInsert);

        if (contentError) {
          console.error(`     ❌ Error inserting content: ${contentError.message}`);
        }
      }
    }

    console.log(`     ✅ Successfully migrated`);
    return true;
  } catch (err) {
    console.error(`     ❌ Unexpected error: ${err.message}`);
    return false;
  }
}

// Main migration function
async function runMigration() {
  // Check if tables exist
  const tablesExist = await checkTablesExist();

  if (!tablesExist) {
    console.log('⚠️  Modular tables need to be created manually.');
    console.log('   Run the SQL file: database/migrations/002_restructure_lessons_modular.sql');
    console.log('   Or use Supabase SQL Editor to create the tables.\n');
    console.log('   After creating tables, run this script again.');
    process.exit(1);
  }

  // Fetch existing lessons
  const lessons = await fetchExistingLessons();

  if (lessons.length === 0) {
    console.log('⚠️  No lessons found to migrate.');
    process.exit(0);
  }

  // Migrate each lesson
  console.log('🔄 Starting migration...\n');
  let successCount = 0;
  let failCount = 0;

  for (const lesson of lessons) {
    const success = await migrateLesson(lesson);
    if (success) {
      successCount++;
    } else {
      failCount++;
    }
  }

  console.log('\n🎉 Migration complete!');
  console.log(`   ✅ Successfully migrated: ${successCount}`);
  console.log(`   ❌ Failed: ${failCount}`);
  console.log(`   📊 Total: ${lessons.length}`);
}

// Run the migration
runMigration().catch(err => {
  console.error('💥 Migration failed:', err);
  process.exit(1);
});
