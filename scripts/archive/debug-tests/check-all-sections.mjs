import { createClient } from '@supabase/supabase-js';
import * as dotenv from 'dotenv';
import { fileURLToPath } from 'url';
import { dirname, resolve } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
dotenv.config({ path: resolve(__dirname, '../.env') });

const supabase = createClient(process.env.REACT_APP_SUPABASE_URL, process.env.SUPABASE_SERVICE_ROLE_KEY);

async function checkAllSections() {
  console.log('\n🔍 CHECKING ALL LESSON SECTIONS');
  console.log('='.repeat(80));

  const lessonKeys = ['2.2', '2.3', '3.1', '3.2', '3.3', '3.4', '3.5', '3.6'];

  for (const key of lessonKeys) {
    const { data: lesson } = await supabase
      .from('lesson_metadata')
      .select('id, title')
      .eq('lesson_key', key)
      .single();

    if (!lesson) continue;

    const { data: sections } = await supabase
      .from('lesson_sections')
      .select('section_key, section_type, title')
      .eq('lesson_id', lesson.id)
      .order('order_index');

    console.log(`\n${key} - ${lesson.title}:`);
    if (sections && sections.length > 0) {
      sections.forEach(s => {
        console.log(`  • ${s.section_key} (${s.section_type}): ${s.title}`);
      });
    } else {
      console.log('  (no sections)');
    }
  }

  console.log('\n' + '='.repeat(80));
}

checkAllSections();
