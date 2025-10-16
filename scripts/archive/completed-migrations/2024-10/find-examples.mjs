import { createClient } from '@supabase/supabase-js';
import * as dotenv from 'dotenv';
import { fileURLToPath } from 'url';
import { dirname, resolve } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
dotenv.config({ path: resolve(__dirname, '../.env') });

const supabase = createClient(process.env.REACT_APP_SUPABASE_URL, process.env.SUPABASE_SERVICE_ROLE_KEY);

async function findExamples() {
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

  const html = content.content;

  console.log('Total HTML length:', html.length);
  console.log('\nSearching for example headers...\n');

  // Try different patterns
  const patterns = [
    { name: 'Simple "Example"', pattern: /Example/gi },
    { name: 'H4 with Example', pattern: /<h4[^>]*>Example/gi },
    { name: 'Border-left red', pattern: /border-left:[^;]*#b91c1c/gi },
    { name: 'Key Takeaways', pattern: /Key Takeaways/gi },
    { name: 'H3 Key Takeaways', pattern: /<h3[^>]*>Key Takeaways<\/h3>/gi },
  ];

  patterns.forEach(({ name, pattern }) => {
    const matches = html.match(pattern);
    console.log(`${name}: ${matches ? matches.length : 0} matches`);
    if (matches && matches.length > 0 && matches.length <= 5) {
      matches.forEach((m, i) => console.log(`  ${i + 1}. ${m.substring(0, 80)}`));
    }
  });

  // Search for specific example text
  console.log('\nSearching for "Example 1"...');
  const example1Index = html.indexOf('Example 1');
  if (example1Index !== -1) {
    console.log(`Found at position ${example1Index}`);
    console.log('Context:');
    console.log(html.substring(example1Index - 200, example1Index + 300));
  } else {
    console.log('NOT FOUND');
  }
}

findExamples();
