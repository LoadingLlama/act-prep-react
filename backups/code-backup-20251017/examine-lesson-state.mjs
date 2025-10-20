#!/usr/bin/env node

import { createClient } from '@supabase/supabase-js';
import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';
import fs from 'fs';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
dotenv.config({ path: path.join(__dirname, '../.env') });

const supabaseUrl = process.env.REACT_APP_SUPABASE_URL || process.env.VITE_SUPABASE_URL;
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY || process.env.SUPABASE_SERVICE_KEY;

const supabase = createClient(supabaseUrl, supabaseServiceKey);

async function examineState() {
  // Sample lessons to check from different subjects
  const lessonsToCheck = [
    'backsolving',           // Math - just uploaded
    'sentence-structure',    // English
    'geometry-angles',       // Math
    'core-principles',       // Reading
    'science-introduction'   // Science
  ];

  console.log('\n╔═══════════════════════════════════════════════════╗');
  console.log('║          Examining Current Lesson State           ║');
  console.log('╚═══════════════════════════════════════════════════╝\n');

  for (const lessonKey of lessonsToCheck) {
    console.log('\n' + '='.repeat(60));
    console.log(`Lesson: ${lessonKey}`);
    console.log('='.repeat(60));

    const { data: lesson } = await supabase
      .from('lesson_metadata')
      .select('id, title')
      .eq('lesson_key', lessonKey)
      .single();

    if (!lesson) {
      console.log('❌ Not found');
      continue;
    }

    console.log(`Title: ${lesson.title}`);

    const { data: sections } = await supabase
      .from('lesson_sections')
      .select('id')
      .eq('lesson_id', lesson.id)
      .order('order_index')
      .limit(1)
      .single();

    if (!sections) {
      console.log('❌ No sections');
      continue;
    }

    const { data: content } = await supabase
      .from('section_content')
      .select('content')
      .eq('section_id', sections.id)
      .order('order_index')
      .limit(1)
      .single();

    if (!content) {
      console.log('❌ No content');
      continue;
    }

    const html = content.content;

    console.log(`\nLength: ${html.length} chars`);
    console.log('\nFirst 800 chars:');
    console.log(html.substring(0, 800));
    console.log('\n...');

    // Check for issues
    console.log('\n🔍 Checks:');
    console.log(`  Has <html> wrapper: ${html.includes('<html>')}`);
    console.log(`  Has clean paragraph styling: ${html.includes('margin: 0.5rem 0 1rem 0')}`);
    console.log(`  Has clean H3 styling: ${html.includes('margin-top: 5rem')}`);
    console.log(`  Has Key Takeaways green: ${html.includes('#2e7d32')}`);
    console.log(`  Has checkmarks: ${html.includes('✓')}`);
    console.log(`  Has example border: ${html.includes('border-left: 4px solid #b91c1c')}`);
  }

  console.log('\n\n');
}

examineState();
