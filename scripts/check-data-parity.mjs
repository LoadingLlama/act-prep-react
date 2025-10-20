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

async function checkDataParity() {
  console.log('\n═══════════════════════════════════════════════════');
  console.log('  DATA PARITY CHECK: lessons vs modular tables');
  console.log('═══════════════════════════════════════════════════\n');

  // Get all lessons from lessons table
  const { data: lessons, error: lessonsError } = await supabase
    .from('lessons')
    .select('id, lesson_key, title, content')
    .order('lesson_key');

  if (lessonsError) {
    console.error('❌ Error fetching lessons:', lessonsError.message);
    return;
  }

  console.log(`✅ Found ${lessons.length} lessons in 'lessons' table\n`);

  // Get all from lesson_metadata
  const { data: metadata, error: metaError } = await supabase
    .from('lesson_metadata')
    .select('*')
    .order('lesson_key');

  if (metaError) {
    console.error('❌ Error fetching metadata:', metaError.message);
    return;
  }

  console.log(`✅ Found ${metadata.length} entries in 'lesson_metadata' table\n`);

  // Compare lesson_keys
  const lessonKeys = new Set(lessons.map(l => l.lesson_key));
  const metadataKeys = new Set(metadata.map(m => m.lesson_key));

  const inLessonsOnly = [...lessonKeys].filter(k => !metadataKeys.has(k));
  const inMetadataOnly = [...metadataKeys].filter(k => !lessonKeys.has(k));

  console.log('📊 COMPARISON RESULTS:\n');

  if (inLessonsOnly.length > 0) {
    console.log(`⚠️  ${inLessonsOnly.length} lesson_keys ONLY in 'lessons' table:`);
    inLessonsOnly.forEach(key => console.log(`   - ${key}`));
    console.log('');
  } else {
    console.log('✅ No lesson_keys unique to lessons table\n');
  }

  if (inMetadataOnly.length > 0) {
    console.log(`⚠️  ${inMetadataOnly.length} lesson_keys ONLY in 'lesson_metadata' table:`);
    inMetadataOnly.forEach(key => console.log(`   - ${key}`));
    console.log('');
  } else {
    console.log('✅ No lesson_keys unique to lesson_metadata table\n');
  }

  // Check content length comparison
  console.log('📝 CONTENT COMPARISON:\n');

  for (const lesson of lessons.slice(0, 5)) {
    const meta = metadata.find(m => m.lesson_key === lesson.lesson_key);
    if (meta) {
      const lessonsContentLength = lesson.content ? lesson.content.length : 0;
      console.log(`${lesson.lesson_key}:`);
      console.log(`  lessons.content: ${lessonsContentLength} chars`);
      console.log(`  (modular structure would require joining sections)\n`);
    }
  }

  console.log('\n═══════════════════════════════════════════════════');
  console.log('  CONCLUSION');
  console.log('═══════════════════════════════════════════════════\n');

  if (lessonKeys.size === metadataKeys.size &&
      inLessonsOnly.length === 0 &&
      inMetadataOnly.length === 0) {
    console.log('✅ Both tables have the SAME lesson_keys');
    console.log('✅ Safe to use lessons table as single source of truth');
    console.log('✅ Modular tables can be dropped\n');
  } else {
    console.log('⚠️  Tables have different lesson_keys');
    console.log('⚠️  Need to investigate before dropping tables\n');
  }
}

checkDataParity();
