import { createClient } from '@supabase/supabase-js';
import * as dotenv from 'dotenv';
import { fileURLToPath } from 'url';
import { dirname, resolve } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
dotenv.config({ path: resolve(__dirname, '../.env') });

const supabase = createClient(process.env.REACT_APP_SUPABASE_URL, process.env.SUPABASE_SERVICE_ROLE_KEY);

async function checkSchema() {
  console.log('\n🔍 CHECKING SECTION_CONTENT TABLE SCHEMA');
  console.log('='.repeat(80));

  // Get one existing content to see the structure
  const { data: contents, error } = await supabase
    .from('section_content')
    .select('*')
    .limit(1);

  if (error) {
    console.error('❌ Error:', error.message);
    return;
  }

  if (contents && contents.length > 0) {
    console.log('\n📊 Available columns:');
    console.log(Object.keys(contents[0]));
    console.log('\n📝 Example content (truncated):');
    const example = { ...contents[0] };
    if (example.content_html) {
      example.content_html = example.content_html.substring(0, 100) + '...';
    }
    console.log(JSON.stringify(example, null, 2));
  }

  console.log('\n' + '='.repeat(80));
}

checkSchema();
