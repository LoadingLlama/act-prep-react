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

if (!supabaseUrl || !supabaseServiceKey) {
  console.error('❌ Missing Supabase credentials');
  process.exit(1);
}

const supabase = createClient(supabaseUrl, supabaseServiceKey);

async function fetchSample() {
  // Fetch backsolving lesson
  const { data: lesson } = await supabase
    .from('lesson_metadata')
    .select('id')
    .eq('lesson_key', 'backsolving')
    .single();

  const { data: sections } = await supabase
    .from('lesson_sections')
    .select('id')
    .eq('lesson_id', lesson.id)
    .order('order_index')
    .limit(1)
    .single();

  const { data: content } = await supabase
    .from('section_content')
    .select('content')
    .eq('section_id', sections.id)
    .order('order_index')
    .limit(1)
    .single();

  fs.writeFileSync('/tmp/current-lesson-sample.html', content.content);
  console.log('✅ Saved current lesson to /tmp/current-lesson-sample.html');
  console.log(`   Length: ${content.content.length} chars`);
}

fetchSample();
