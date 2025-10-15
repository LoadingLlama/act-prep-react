/**
 * Fetch Lesson by Title Search
 * Utility to fetch any lesson by searching its title
 */

import { createClient } from '@supabase/supabase-js';
import * as dotenv from 'dotenv';
import { fileURLToPath } from 'url';
import { dirname, resolve } from 'path';
import fs from 'fs';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// Load environment variables
dotenv.config({ path: resolve(__dirname, '../.env') });

const supabaseUrl = process.env.REACT_APP_SUPABASE_URL;
const supabaseKey = process.env.REACT_APP_SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseKey) {
  console.error('❌ Missing Supabase credentials in .env file');
  process.exit(1);
}

const supabase = createClient(supabaseUrl, supabaseKey);

async function fetchLesson() {
  const searchTerm = process.argv[2];

  if (!searchTerm) {
    console.error('❌ Usage: node fetch-lesson.mjs "search term"');
    process.exit(1);
  }

  console.log(`🔍 Searching for lessons matching: "${searchTerm}"...\\n`);

  // Fetch lessons matching the search term
  const { data: lessons, error } = await supabase
    .from('lessons')
    .select('*')
    .ilike('title', `%${searchTerm}%`);

  if (error) {
    console.error('❌ Error fetching lessons:', error);
    process.exit(1);
  }

  if (!lessons || lessons.length === 0) {
    console.log('⚠️  No lessons found matching that search term');
    return;
  }

  console.log(`✅ Found ${lessons.length} lesson(s):\\n`);

  lessons.forEach((lesson, idx) => {
    console.log(`${idx + 1}. ${lesson.title}`);
    console.log(`   Subject: ${lesson.subject}`);
    console.log(`   Lesson Key: ${lesson.lesson_key}`);
    console.log(`   ID: ${lesson.id}`);
    console.log();
  });

  // Save first match to file
  const lesson = lessons[0];
  const filename = lesson.lesson_key || lesson.title.toLowerCase().replace(/[^a-z0-9]+/g, '-');
  const outputPath = resolve(__dirname, `../LESSON_${filename}.json`);
  fs.writeFileSync(outputPath, JSON.stringify(lesson, null, 2));
  console.log(`💾 Saved first match to: ${outputPath}`);
  console.log();

  // Analyze structure
  console.log('📋 LESSON STRUCTURE:');
  console.log('─'.repeat(80));

  const contentHtml = lesson.content || '';
  const h3Count = (contentHtml.match(/<h3/g) || []).length;
  const h4Count = (contentHtml.match(/<h4/g) || []).length;
  const blueUnderlines = (contentHtml.match(/style="[^"]*color:[^"]*#2563eb[^"]*text-decoration:[^"]*underline/g) || []).length;
  const exampleHeaders = (contentHtml.match(/<h4[^>]*>Example/gi) || []).length;

  console.log(`  Main Sections (h3): ${h3Count}`);
  console.log(`  Subsections (h4): ${h4Count}`);
  console.log(`  Blue underlined terms: ${blueUnderlines}`);
  console.log(`  Example headers: ${exampleHeaders}`);
  console.log(`  Content length: ${contentHtml.length} characters`);
  console.log();
}

fetchLesson();
