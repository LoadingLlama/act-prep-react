import { createClient } from '@supabase/supabase-js';
import * as dotenv from 'dotenv';
import { fileURLToPath } from 'url';
import { dirname, resolve } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
dotenv.config({ path: resolve(__dirname, '../.env') });

const supabase = createClient(process.env.REACT_APP_SUPABASE_URL, process.env.SUPABASE_SERVICE_ROLE_KEY);

async function show() {
  const lessonKey = 'geometry-angles'; // Gold standard

  const { data: lesson } = await supabase
    .from('lessons')
    .select('content')
    .eq('lesson_key', lessonKey)
    .single();

  console.log('Current content (first 1000 chars):');
  console.log('=====================================');
  console.log(lesson.content.substring(0, 1000));
  console.log('\n...\n');

  // Check for term-link spans
  const hasTermLinks = lesson.content.includes('term-link');
  console.log('Has blue underlined terms (term-link):', hasTermLinks);

  // Count existing term-links
  const matches = lesson.content.match(/class="term-link"/g);
  console.log('Number of term-link spans:', matches?.length || 0);
}

show();
