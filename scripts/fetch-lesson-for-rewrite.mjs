#!/usr/bin/env node

/**
 * Fetch a lesson's current content for rewriting
 */

import { createClient } from '@supabase/supabase-js';
import dotenv from 'dotenv';
import fs from 'fs';

dotenv.config();

const supabase = createClient(
  process.env.REACT_APP_SUPABASE_URL,
  process.env.SUPABASE_SERVICE_ROLE_KEY
);

const lessonKey = process.argv[2];

if (!lessonKey) {
  console.error('❌ Please provide lesson key as argument');
  console.log('Usage: node fetch-lesson-for-rewrite.mjs <lesson-key>');
  process.exit(1);
}

console.log(`📚 Fetching lesson: ${lessonKey}...\n`);

async function fetchLesson() {
  // Get lesson metadata
  const { data: lesson, error: lessonError } = await supabase
    .from('lesson_metadata')
    .select('*')
    .eq('lesson_key', lessonKey)
    .eq('subject', 'english')
    .single();

  if (lessonError || !lesson) {
    console.error('❌ Lesson not found:', lessonError);
    return;
  }

  console.log(`✅ Found: ${lesson.title}`);
  console.log(`   Category: ${lesson.category}`);
  console.log(`   ID: ${lesson.id}\n`);

  // Get sections
  const { data: sections } = await supabase
    .from('lesson_sections')
    .select('*')
    .eq('lesson_id', lesson.id)
    .order('order_index', { ascending: true });

  console.log(`📑 Sections: ${sections.length}\n`);

  // Get all content
  let fullContent = '';
  for (const section of sections) {
    const { data: content } = await supabase
      .from('section_content')
      .select('*')
      .eq('section_id', section.id)
      .order('order_index', { ascending: true });

    const sectionText = content.map(c => c.content).join('\n\n');
    fullContent += `\n<!-- ========== SECTION: ${section.title} ========== -->\n`;
    fullContent += sectionText + '\n';

    console.log(`  📄 ${section.title}: ${sectionText.length} chars`);
  }

  // Save to file
  const outputPath = `/Users/cadenchiang/Desktop/act-prep-react/docs/CURRENT_${lessonKey.toUpperCase()}.html`;
  fs.writeFileSync(outputPath, fullContent);

  console.log(`\n✅ Saved to: ${outputPath}`);
  console.log(`📊 Total: ${fullContent.length} characters\n`);

  // Save metadata
  const metaPath = `/Users/cadenchiang/Desktop/act-prep-react/docs/CURRENT_${lessonKey.toUpperCase()}_META.json`;
  fs.writeFileSync(metaPath, JSON.stringify({ lesson, sections }, null, 2));
  console.log(`✅ Metadata: ${metaPath}\n`);
}

fetchLesson();
