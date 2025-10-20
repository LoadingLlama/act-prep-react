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

async function checkRelationships() {
  console.log('\n╔═══════════════════════════════════════════════════╗');
  console.log('║  Checking Examples & Terms Relationships         ║');
  console.log('╚═══════════════════════════════════════════════════╝\n');

  // Get a sample lesson from lessons table
  const { data: lesson } = await supabase
    .from('lessons')
    .select('id, lesson_key, title')
    .eq('lesson_key', '2.2')
    .single();

  if (!lesson) {
    console.log('❌ Lesson 2.2 not found in lessons table');
    return;
  }

  console.log('✅ Found lesson:', lesson.lesson_key, '-', lesson.title);
  console.log('   UUID:', lesson.id, '\n');

  // Try to fetch examples using this lesson_id
  const { data: examples } = await supabase
    .from('lesson_examples')
    .select('*')
    .eq('lesson_id', lesson.id);

  console.log('📝 Examples using lesson_id:', examples?.length || 0);

  // Try to fetch term definitions using lesson_key
  const { data: terms } = await supabase
    .from('lesson_term_definitions')
    .select('*')
    .eq('lesson_key', lesson.lesson_key);

  console.log('📚 Term definitions using lesson_key:', terms?.length || 0, '\n');

  // Check what columns lesson_examples has
  const { data: exSample } = await supabase
    .from('lesson_examples')
    .select('*')
    .limit(1);

  if (exSample && exSample[0]) {
    console.log('lesson_examples schema:');
    console.log('  ', Object.keys(exSample[0]).join(', '), '\n');
  }

  // Check what columns lesson_term_definitions has
  const { data: termSample } = await supabase
    .from('lesson_term_definitions')
    .select('*')
    .limit(1);

  if (termSample && termSample[0]) {
    console.log('lesson_term_definitions schema:');
    console.log('  ', Object.keys(termSample[0]).join(', '), '\n');
  }

  // Check if lesson_examples references the NEW lessons table UUIDs or OLD lesson_metadata UUIDs
  console.log('🔍 Checking if examples reference migrated lessons...\n');

  const { data: allExamples } = await supabase
    .from('lesson_examples')
    .select('lesson_id')
    .limit(10);

  if (allExamples && allExamples.length > 0) {
    const exampleLessonId = allExamples[0].lesson_id;

    // Try finding in lessons table
    const { data: inLessons } = await supabase
      .from('lessons')
      .select('id, lesson_key')
      .eq('id', exampleLessonId)
      .single();

    // Try finding in lesson_metadata
    const { data: inMetadata } = await supabase
      .from('lesson_metadata')
      .select('id, lesson_key')
      .eq('id', exampleLessonId)
      .single();

    console.log('Sample example lesson_id:', exampleLessonId);
    console.log('  Found in lessons table?', inLessons ? `✅ (${inLessons.lesson_key})` : '❌');
    console.log('  Found in lesson_metadata?', inMetadata ? `✅ (${inMetadata.lesson_key})` : '❌');
  }
}

checkRelationships();
