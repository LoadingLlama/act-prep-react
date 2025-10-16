import { createClient } from '@supabase/supabase-js';
import * as dotenv from 'dotenv';
import { fileURLToPath } from 'url';
import { dirname, resolve } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
dotenv.config({ path: resolve(__dirname, '../.env') });

const supabase = createClient(process.env.REACT_APP_SUPABASE_URL, process.env.SUPABASE_SERVICE_ROLE_KEY);

async function checkSchema() {
  console.log('\n🔍 CHECKING LESSON_SECTIONS TABLE SCHEMA');
  console.log('='.repeat(80));

  // Get one existing section to see the structure
  const { data: sections, error } = await supabase
    .from('lesson_sections')
    .select('*')
    .limit(1);

  if (error) {
    console.error('❌ Error:', error.message);
    return;
  }

  if (sections && sections.length > 0) {
    console.log('\n📊 Available columns:');
    console.log(Object.keys(sections[0]));
    console.log('\n📝 Example section:');
    console.log(JSON.stringify(sections[0], null, 2));
  }

  console.log('\n' + '='.repeat(80));
}

checkSchema();
