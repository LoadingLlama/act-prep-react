#!/usr/bin/env node

/**
 * Retrieve full lesson content from database
 */

import { createClient } from '@supabase/supabase-js';
import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';
import fs from 'fs';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
dotenv.config({ path: path.join(__dirname, '../.env') });

const supabaseUrl = process.env.REACT_APP_SUPABASE_URL || process.env.VITE_SUPABASE_URL;
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY || process.env.SUPABASE_SERVICE_KEY;

if (!supabaseUrl || !supabaseServiceKey) {
  console.error('❌ Missing Supabase credentials');
  process.exit(1);
}

const supabase = createClient(supabaseUrl, supabaseServiceKey);

async function getLessonContent(lessonKey) {
  try {
    console.log(`\n🔍 Fetching lesson: ${lessonKey}...`);

    // Get lesson metadata
    const { data: lesson, error: lessonError } = await supabase
      .from('lesson_metadata')
      .select('*')
      .eq('lesson_key', lessonKey)
      .single();

    if (lessonError) throw lessonError;

    console.log(`✅ Found: ${lesson.title}`);

    // Get sections
    const { data: sections, error: sectionsError } = await supabase
      .from('lesson_sections')
      .select('*')
      .eq('lesson_id', lesson.id)
      .order('order_index');

    if (sectionsError) throw sectionsError;

    console.log(`📑 Sections: ${sections.length}`);

    // Get content for each section
    let fullContent = '';
    for (const section of sections) {
      const { data: contents, error: contentsError } = await supabase
        .from('lesson_section_content')
        .select('*')
        .eq('section_id', section.id)
        .order('order_index');

      if (contentsError) throw contentsError;

      for (const content of contents) {
        fullContent += content.content + '\n\n';
      }
    }

    // Save to file
    const filename = `lesson_${lessonKey.replace(/\./g, '_')}_content.html`;
    const filepath = path.join(__dirname, 'lesson-analysis', filename);

    // Create directory if it doesn't exist
    const dir = path.dirname(filepath);
    if (!fs.existsSync(dir)) {
      fs.mkdirSync(dir, { recursive: true });
    }

    fs.writeFileSync(filepath, fullContent);

    console.log(`💾 Saved to: ${filepath}`);
    console.log(`📊 Content length: ${fullContent.length} characters\n`);

    return fullContent;

  } catch (error) {
    console.error('❌ Error:', error.message);
    process.exit(1);
  }
}

const lessonKey = process.argv[2] || 'backsolving';
getLessonContent(lessonKey);
