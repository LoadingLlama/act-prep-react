import { createClient } from '@supabase/supabase-js';
import * as dotenv from 'dotenv';
import { fileURLToPath } from 'url';
import { dirname, resolve } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
dotenv.config({ path: resolve(__dirname, '../.env') });

const supabase = createClient(
  process.env.REACT_APP_SUPABASE_URL,
  process.env.SUPABASE_SERVICE_ROLE_KEY
);

async function checkLesson21() {
  console.log('Checking lesson 2.1 (geometry-angles) example format...\n');

  const { data: lesson } = await supabase
    .from('lesson_metadata')
    .select('id')
    .eq('lesson_key', 'geometry-angles')
    .single();

  if (!lesson) {
    console.log('Lesson 2.1 not found');
    return;
  }

  const { data: sections } = await supabase
    .from('lesson_sections')
    .select('*')
    .eq('lesson_id', lesson.id)
    .order('order_index');

  console.log(`Found ${sections?.length} sections\n`);

  for (const section of sections || []) {
    const { data: content } = await supabase
      .from('section_content')
      .select('*')
      .eq('section_id', section.id)
      .order('order_index');

    for (const block of content || []) {
      // Look for examples
      if (block.content.includes('Example') && block.content.includes('Solution')) {
        console.log('='.repeat(80));
        console.log('FOUND EXAMPLE:');
        console.log('='.repeat(80));
        // Show the part with answer choices and solution
        const exampleMatch = block.content.match(/(Example[^]*?Answer:[^<]*)/);
        if (exampleMatch) {
          console.log(exampleMatch[1].substring(0, 2000));
        }
        console.log('\n');
      }
    }
  }
}

checkLesson21().catch(console.error);
