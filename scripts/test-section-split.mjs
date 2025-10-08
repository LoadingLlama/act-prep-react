import { createClient } from '@supabase/supabase-js';
import dotenv from 'dotenv';
import { splitIntoTextSections } from '../src/utils/splitIntoTextSections.js';

dotenv.config();

const supabase = createClient(
  process.env.REACT_APP_SUPABASE_URL,
  process.env.REACT_APP_SUPABASE_ANON_KEY
);

const { data: lesson } = await supabase
  .from('lessons')
  .select('*')
  .eq('lesson_key', 'sentence-structure')
  .single();

const sections = splitIntoTextSections(lesson.content);

console.log(`Total sections created: ${sections.length}\n`);

sections.forEach((section, index) => {
  const preview = section.content
    .replace(/<[^>]+>/g, '')
    .substring(0, 100)
    .trim();
  console.log(`Section ${index}: ${preview}...`);
});

console.log('\n\nRecommended quiz positions:');
console.log(`- Clause Quiz: After section ${Math.floor(sections.length * 0.3)} (30% through)`);
console.log(`- FANBOYS Quiz: After section ${Math.floor(sections.length * 0.5)} (50% through)`);
console.log(`- Comma Splice Quiz: After section ${Math.floor(sections.length * 0.7)} (70% through)`);
console.log(`- Final Quiz: After section ${sections.length} (end)`);
