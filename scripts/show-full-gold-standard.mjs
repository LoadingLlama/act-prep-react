import { createClient } from '@supabase/supabase-js';
import * as dotenv from 'dotenv';
import { fileURLToPath } from 'url';
import { dirname, resolve } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
dotenv.config({ path: resolve(__dirname, '../.env') });

const supabase = createClient(process.env.REACT_APP_SUPABASE_URL, process.env.SUPABASE_SERVICE_ROLE_KEY);

async function show() {
  const { data: lesson } = await supabase
    .from('lessons')
    .select('content')
    .eq('lesson_key', 'geometry-angles')
    .single();

  console.log('FULL GOLD STANDARD CONTENT:');
  console.log('='.repeat(80));
  console.log(lesson.content);
  console.log('='.repeat(80));
  console.log(`\nTotal length: ${lesson.content.length} characters`);

  // Count different elements
  const pCount = (lesson.content.match(/<p/g) || []).length;
  const h3Count = (lesson.content.match(/<h3/g) || []).length;
  const ulCount = (lesson.content.match(/<ul/g) || []).length;
  const liCount = (lesson.content.match(/<li/g) || []).length;

  console.log(`\nContent structure:`);
  console.log(`  Paragraphs: ${pCount}`);
  console.log(`  H3 headings: ${h3Count}`);
  console.log(`  Lists: ${ulCount}`);
  console.log(`  List items: ${liCount}`);
}

show();
