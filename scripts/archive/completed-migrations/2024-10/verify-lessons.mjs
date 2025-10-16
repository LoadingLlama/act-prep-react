import { createClient } from '@supabase/supabase-js';
import * as dotenv from 'dotenv';
import { fileURLToPath } from 'url';
import { dirname, resolve } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
dotenv.config({ path: resolve(__dirname, '../.env') });

const supabase = createClient(process.env.REACT_APP_SUPABASE_URL, process.env.SUPABASE_SERVICE_ROLE_KEY);

// Check both lessons in detail
const lessons = ['substitution', 'geometry-angles', 'backsolving'];

console.log('\n=== LESSON FORMATTING VERIFICATION ===\n');

for (const lessonKey of lessons) {
  const { data } = await supabase
    .from('lessons')
    .select('lesson_key, content')
    .eq('lesson_key', lessonKey)
    .single();

  const content = data.content;

  console.log(`${lessonKey.toUpperCase()}:`);
  console.log(`  Content length: ${content.length}`);
  console.log(`  Has h3 with 5rem: ${content.includes('<h3 style="margin-top: 5rem') ? 'YES' : 'NO'}`);
  console.log(`  Has h4 with 2rem: ${content.includes('<h4 style="margin-top: 2rem') ? 'YES' : 'NO'}`);
  console.log(`  Has h4 with red border (examples): ${content.includes('border-left: 4px solid #b91c1c') ? 'YES' : 'NO'}`);
  console.log(`  Has Times New Roman: ${content.includes('Times New Roman') ? 'YES' : 'NO'}`);
  console.log(`  Has blue underlined terms: ${content.includes('#2563eb') ? 'YES' : 'NO'}`);
  console.log(`  Has Key Takeaways: ${content.includes('Key Takeaways') ? 'YES' : 'NO'}`);
  console.log(`  Blue terms count: ${(content.match(/color: #2563eb/g) || []).length}`);
  console.log(`  H3 count: ${(content.match(/<h3/g) || []).length}`);
  console.log(`  H4 count: ${(content.match(/<h4/g) || []).length}`);
  console.log('');
}
