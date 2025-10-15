#!/usr/bin/env node

/**
 * Direct Migration Script - Uses Raw PostgreSQL Connection
 * Bypasses Supabase schema cache issues
 */

import pg from 'pg';
import dotenv from 'dotenv';
import * as cheerio from 'cheerio';

dotenv.config();

const { Client } = pg;

// Extract project details from Supabase URL
const supabaseUrl = process.env.REACT_APP_SUPABASE_URL;
const projectRef = supabaseUrl?.split('//')[1]?.split('.')[0];

if (!projectRef) {
  console.error('❌ Could not parse Supabase URL');
  process.exit(1);
}

console.log('🚀 Direct PostgreSQL Migration\n');
console.log('📊 Note: This script needs the database password.');
console.log('   Find it in: Supabase Dashboard → Settings → Database → Connection String\n');

// For now, let's use a workaround with the Supabase REST API
import { createClient } from '@supabase/supabase-js';

const supabase = createClient(
  process.env.REACT_APP_SUPABASE_URL,
  process.env.SUPABASE_SERVICE_ROLE_KEY,
  {
    db: {
      schema: 'public'
    },
    auth: {
      autoRefreshToken: false,
      persistSession: false
    },
    global: {
      headers: {
        'X-Client-Info': 'supabase-js-node'
      }
    }
  }
);

console.log('📚 Fetching lessons...\n');

// Fetch lessons
const { data: lessons, error: fetchError } = await supabase
  .from('lessons')
  .select('*')
  .order('order_index', { ascending: true });

if (fetchError) {
  console.error('❌ Error fetching lessons:', fetchError.message);
  process.exit(1);
}

console.log(`✅ Found ${lessons.length} lessons\n`);
console.log('🔄 Migrating lessons...\n');

function parseHtmlContent(html, lessonKey) {
  const $ = cheerio.load(html || '<div>No content</div>');
  const sections = [];
  let sectionIndex = 0;

  // Look for major headings
  const headings = $('h1, h2, h3').toArray();

  if (headings.length === 0) {
    // No headings - one main section
    sections.push({
      section_key: `${lessonKey}-main`,
      title: 'Main Content',
      section_type: 'content',
      order_index: 0,
      content: [html]
    });
  } else {
    // Split by headings
    let currentSection = null;
    let contentBuffer = [];

    $('body').children().each((idx, elem) => {
      const tagName = elem.tagName?.toLowerCase();

      if (tagName === 'h1' || tagName === 'h2' || tagName === 'h3') {
        // Save previous section
        if (currentSection) {
          currentSection.content = contentBuffer;
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
        contentBuffer.push($.html(elem));
      }
    });

    // Save last section
    if (currentSection) {
      currentSection.content = contentBuffer;
      sections.push(currentSection);
    }
  }

  return sections;
}

function determineSectionType(title) {
  const lower = title.toLowerCase();
  if (lower.includes('introduction') || lower.includes('overview')) return 'introduction';
  if (lower.includes('example')) return 'example';
  if (lower.includes('practice')) return 'practice';
  if (lower.includes('summary') || lower.includes('key takeaway')) return 'summary';
  return 'content';
}

let successCount = 0;
let failCount = 0;

for (const lesson of lessons.slice(0, 10)) { // Start with first 10 for testing
  console.log(`  📝 ${lesson.title} (${lesson.lesson_key})`);

  try {
    // 1. Insert metadata using upsert
    const metadataPayload = {
      lesson_key: lesson.lesson_key,
      title: lesson.title,
      subject: lesson.subject || 'general',
      category: lesson.category || 'General',
      difficulty_level: lesson.difficulty || 1,
      duration_minutes: lesson.duration || 30,
      order_index: lesson.order_index || 0,
      is_published: true
    };

    const { data: metadata, error: metaError } = await supabase
      .from('lesson_metadata')
      .upsert(metadataPayload, {
        onConflict: 'lesson_key',
        ignoreDuplicates: false
      })
      .select()
      .single();

    if (metaError) {
      console.log(`     ❌ Metadata error: ${metaError.message}`);
      failCount++;
      continue;
    }

    // 2. Parse content
    const sections = parseHtmlContent(lesson.content, lesson.lesson_key);
    console.log(`     → ${sections.length} sections`);

    // 3. Insert sections
    for (const section of sections) {
      const { data: sectionData, error: sectionError } = await supabase
        .from('lesson_sections')
        .upsert({
          lesson_id: metadata.id,
          section_key: section.section_key,
          title: section.title,
          section_type: section.section_type,
          order_index: section.order_index
        }, {
          onConflict: 'lesson_id,section_key',
          ignoreDuplicates: false
        })
        .select()
        .single();

      if (sectionError) {
        console.log(`     ⚠️  Section error: ${sectionError.message}`);
        continue;
      }

      // 4. Insert content
      if (section.content && section.content.length > 0) {
        const contentBlocks = section.content.map((c, i) => ({
          section_id: sectionData.id,
          content_type: 'html',
          content: c,
          order_index: i
        }));

        const { error: contentError } = await supabase
          .from('section_content')
          .insert(contentBlocks);

        if (contentError) {
          console.log(`     ⚠️  Content error: ${contentError.message}`);
        }
      }
    }

    console.log(`     ✅ Migrated`);
    successCount++;

  } catch (err) {
    console.log(`     ❌ Error: ${err.message}`);
    failCount++;
  }

  // Small delay to avoid rate limiting
  await new Promise(resolve => setTimeout(resolve, 200));
}

console.log('\n✅ Migration complete!');
console.log(`   Success: ${successCount}`);
console.log(`   Failed: ${failCount}`);
console.log(`   Total: ${successCount + failCount}\n`);
