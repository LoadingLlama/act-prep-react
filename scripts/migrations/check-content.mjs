import { createClient } from '@supabase/supabase-js';
import * as dotenv from 'dotenv';

dotenv.config();

const supabase = createClient(
  process.env.REACT_APP_SUPABASE_URL,
  process.env.SUPABASE_SERVICE_ROLE_KEY
);

// Check a few lessons for content issues
const lessonsToCheck = ['percentages', 'exponential-growth', 'transforming-functions'];

for (const lessonKey of lessonsToCheck) {
  const { data: lesson } = await supabase
    .from('lesson_metadata')
    .select('id, title')
    .eq('lesson_key', lessonKey)
    .single();
  
  if (!lesson) continue;
  
  const { data: section } = await supabase
    .from('lesson_sections')
    .select('id')
    .eq('lesson_id', lesson.id)
    .eq('section_key', 'main_content')
    .single();
  
  if (!section) {
    console.log(`\n❌ ${lessonKey}: NO SECTION FOUND`);
    continue;
  }
  
  const { data: content } = await supabase
    .from('section_content')
    .select('content')
    .eq('section_id', section.id)
    .single();
  
  if (!content || !content.content) {
    console.log(`\n❌ ${lessonKey}: NO CONTENT FOUND`);
    continue;
  }
  
  const html = content.content;
  const hasHeadings = (html.match(/<h3/g) || []).length;
  const hasExamples = html.includes('Example');
  const hasTakeaways = html.includes('Key Takeaways');
  const length = html.length;
  
  console.log(`\n✓ ${lessonKey} (${lesson.title}):`);
  console.log(`  - Length: ${length} chars`);
  console.log(`  - Headings (h3): ${hasHeadings}`);
  console.log(`  - Has examples: ${hasExamples}`);
  console.log(`  - Has takeaways: ${hasTakeaways}`);
  
  if (length < 1000) console.log(`  ⚠️ WARNING: Content seems very short!`);
  if (hasHeadings < 3) console.log(`  ⚠️ WARNING: Few headings, may lack structure`);
}
