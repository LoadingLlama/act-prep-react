import { createClient } from '@supabase/supabase-js';
import * as dotenv from 'dotenv';
import { fileURLToPath } from 'url';
import { dirname, resolve } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
dotenv.config({ path: resolve(__dirname, '../.env') });

const supabase = createClient(process.env.REACT_APP_SUPABASE_URL, process.env.SUPABASE_SERVICE_ROLE_KEY);

async function checkContent() {
  const { data: lesson } = await supabase
    .from('lesson_metadata')
    .select('id')
    .eq('lesson_key', '3.4')
    .single();

  const { data: section } = await supabase
    .from('lesson_sections')
    .select('id')
    .eq('lesson_id', lesson.id)
    .eq('section_key', '3.4-main')
    .single();

  const { data: content } = await supabase
    .from('section_content')
    .select('content')
    .eq('section_id', section.id)
    .eq('content_type', 'html')
    .single();

  // Print first 3000 chars to see structure
  console.log('First 3000 characters of lesson 3.4:');
  console.log('='.repeat(80));
  console.log(content.content.substring(0, 3000));
  console.log('='.repeat(80));

  // Check for example headers
  const exampleMatches = content.content.match(/<h4[^>]*>Example/gi);
  console.log(`\nFound ${exampleMatches ? exampleMatches.length : 0} Example headers`);

  if (exampleMatches) {
    console.log('\nExample headers found:');
    exampleMatches.forEach((match, i) => {
      const startIdx = content.content.indexOf(match);
      const snippet = content.content.substring(startIdx, startIdx + 200);
      console.log(`${i + 1}. ${snippet.substring(0, 150)}...`);
    });
  }
}

checkContent();
