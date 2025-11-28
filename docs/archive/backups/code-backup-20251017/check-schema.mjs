#!/usr/bin/env node

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

async function checkSchema() {
  try {
    // Check lesson_sections columns
    const { data: sections, error } = await supabase
      .from('lesson_sections')
      .select('*')
      .limit(1);

    if (error) throw error;

    console.log('\n📊 lesson_sections columns:');
    if (sections && sections.length > 0) {
      console.log(Object.keys(sections[0]));
    }

    // Check section_content columns
    const { data: content, error: contentError } = await supabase
      .from('section_content')
      .select('*')
      .limit(1);

    if (contentError) throw contentError;

    console.log('\n📊 section_content columns:');
    if (content && content.length > 0) {
      console.log(Object.keys(content[0]));
    }

    // Get a sample lesson with sections
    const { data: lesson } = await supabase
      .from('lesson_metadata')
      .select('*')
      .limit(1)
      .single();

    console.log('\n📊 Sample lesson:');
    console.log(lesson);

    const { data: sampleSections } = await supabase
      .from('lesson_sections')
      .select('*')
      .eq('lesson_id', lesson.id)
      .limit(1);

    console.log('\n📊 Sample section:');
    console.log(sampleSections);

  } catch (error) {
    console.error('❌ Error:', error.message);
  }
}

checkSchema();
