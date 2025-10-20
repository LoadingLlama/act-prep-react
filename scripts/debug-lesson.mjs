#!/usr/bin/env node

import { createClient } from '@supabase/supabase-js';
import dotenv from 'dotenv';
import * as cheerio from 'cheerio';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
dotenv.config({ path: path.join(__dirname, '../.env') });

const supabaseUrl = process.env.REACT_APP_SUPABASE_URL || process.env.VITE_SUPABASE_URL;
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY || process.env.SUPABASE_SERVICE_KEY;

const supabase = createClient(supabaseUrl, supabaseServiceKey);

async function debugLesson() {
  const { data: lesson, error } = await supabase
    .from('lesson_metadata')
    .select('*')
    .eq('lesson_key', '6.2')
    .single();

  if (error) throw error;

  const { data: sections } = await supabase
    .from('lesson_sections')
    .select('*')
    .eq('lesson_id', lesson.id)
    .order('order_index');

  const { data: contents } = await supabase
    .from('lesson_section_content')
    .select('*')
    .eq('section_id', sections[0].id)
    .order('order_index');

  const html = contents[0].content;
  const $ = cheerio.load(html);

  console.log('\nAll H3 headings in lesson 6.2:');
  console.log('================================');

  $('h3').each((i, el) => {
    const text = $(el).text().trim();
    console.log(`${i + 1}. "${text}" (length: ${text.length})`);
  });
}

debugLesson().catch(console.error);
