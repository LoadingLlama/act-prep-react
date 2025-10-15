#!/usr/bin/env node

/**
 * Compare existing DB lesson with PrepPros textbook
 * Determine if we need to update/enhance existing lessons
 */

import { createClient } from '@supabase/supabase-js';
import dotenv from 'dotenv';
import fs from 'fs';

dotenv.config();

const supabase = createClient(
  process.env.REACT_APP_SUPABASE_URL,
  process.env.SUPABASE_SERVICE_ROLE_KEY
);

console.log('🔍 Comparing Existing DB Lessons with PrepPros Content...\n');

async function compareLesson(lessonKey) {
  // Fetch existing lesson from DB
  const { data: lesson } = await supabase
    .from('lesson_metadata')
    .select('*')
    .eq('lesson_key', lessonKey)
    .single();

  if (!lesson) {
    console.log(`❌ Lesson ${lessonKey} not found in database`);
    return;
  }

  // Fetch sections
  const { data: sections } = await supabase
    .from('lesson_sections')
    .select('*')
    .eq('lesson_id', lesson.id)
    .order('order_index', { ascending: true });

  // Fetch content
  let fullContent = '';
  for (const section of sections) {
    const { data: content } = await supabase
      .from('section_content')
      .select('*')
      .eq('section_id', section.id)
      .order('order_index', { ascending: true });

    fullContent += content.map(c => c.content).join('\n');
  }

  console.log(`📊 Existing Lesson: ${lesson.title} [${lessonKey}]`);
  console.log(`   Content length: ${fullContent.length} characters`);
  console.log(`   Sections: ${sections.length}`);
  console.log(`   Has TIP boxes: ${fullContent.includes('TIP') || fullContent.includes('💡')}`);
  console.log(`   Has Key Takeaways: ${fullContent.includes('Key Takeaways')}`);
  console.log(`   Has practice problems: ${fullContent.includes('Practice Problem')}`);

  // Analyze content structure
  const hasH2 = fullContent.includes('<h2');
  const hasH3 = fullContent.includes('<h3');
  const hasH4 = fullContent.includes('<h4');
  const hasTipBoxes = fullContent.includes('background-color: #eff6ff') || fullContent.includes('💡');
  const hasExampleBoxes = fullContent.includes('border-left: 4px solid');

  console.log(`\n   HTML Structure:`);
  console.log(`   - H2 headers: ${hasH2}`);
  console.log(`   - H3 headers: ${hasH3}`);
  console.log(`   - H4 headers: ${hasH4}`);
  console.log(`   - TIP boxes: ${hasTipBoxes}`);
  console.log(`   - Example boxes: ${hasExampleBoxes}`);

  return {
    lessonKey,
    title: lesson.title,
    contentLength: fullContent.length,
    sections: sections.length,
    structure: { hasH2, hasH3, hasH4, hasTipBoxes, hasExampleBoxes }
  };
}

async function main() {
  // Compare sentence-structure lesson
  console.log('='.repeat(60));
  console.log('SENTENCE STRUCTURE LESSON');
  console.log('='.repeat(60) + '\n');

  const result = await compareLesson('sentence-structure');

  console.log('\n' + '='.repeat(60));
  console.log('PREPPROS TEXTBOOK');
  console.log('='.repeat(60) + '\n');

  // Load PrepPros textbook
  const textbookPath = '/Users/cadenchiang/Desktop/actprep copy/actclass.org/packets/PrepPros ACT English Book (For New Enhanced ACT).txt';
  const content = fs.readFileSync(textbookPath, 'utf-8');
  const lines = content.split('\n');

  // Chapter 1 is lines 302-866 (564 lines)
  const chapter1Lines = lines.slice(302, 866);
  const chapter1Content = chapter1Lines.join('\n');

  console.log(`📖 PrepPros Chapter 1: Sentence Structure`);
  console.log(`   Content length: ${chapter1Content.length} characters`);
  console.log(`   Lines: 564`);
  console.log(`   Has TIP sections: ${chapter1Content.includes('TIP -')}`);
  console.log(`   Has practice problems: ${chapter1Content.includes('Practice:')}`);

  // Count key sections
  const tipCount = (chapter1Content.match(/TIP -/g) || []).length;
  const exampleCount = (chapter1Content.match(/Correct:|Incorrect:/g) || []).length;

  console.log(`\n   Content Analysis:`);
  console.log(`   - TIP sections: ${tipCount}`);
  console.log(`   - Correct/Incorrect examples: ${exampleCount}`);

  console.log('\n' + '='.repeat(60));
  console.log('RECOMMENDATION');
  console.log('='.repeat(60) + '\n');

  if (result.contentLength > chapter1Content.length) {
    console.log('✅ Existing DB lesson is MORE comprehensive than PrepPros');
    console.log('   Recommendation: Keep existing content, but consider:');
    console.log('   - Extracting any unique examples from PrepPros');
    console.log('   - Adding any missing TIP boxes from PrepPros');
  } else {
    console.log('📖 PrepPros textbook has MORE content');
    console.log('   Recommendation: Enhance existing lessons with PrepPros content');
    console.log('   - Extract all TIP boxes and examples');
    console.log('   - Add practice problems');
    console.log('   - Merge with existing content');
  }

  console.log('\n' + '='.repeat(60) + '\n');
}

main().catch(err => console.error('❌ Error:', err.message));
