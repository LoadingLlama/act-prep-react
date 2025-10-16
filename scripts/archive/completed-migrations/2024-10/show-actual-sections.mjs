import { createClient } from '@supabase/supabase-js';
import { splitIntoTextSections } from '../src/utils/splitIntoTextSections.js';
import dotenv from 'dotenv';

dotenv.config();

const supabase = createClient(
  process.env.REACT_APP_SUPABASE_URL,
  process.env.REACT_APP_SUPABASE_ANON_KEY
);

async function showActualSections() {
  const { data: lesson } = await supabase
    .from('lessons')
    .select('*')
    .eq('lesson_key', 'commas')
    .single();

  const sections = splitIntoTextSections(lesson.content);

  console.log('=== ACTUAL TEXT SECTIONS (as student sees them) ===\n');
  console.log(`Total sections: ${sections.length}\n`);

  sections.forEach((section, index) => {
    const preview = section.content
      .replace(/<[^>]*>/g, ' ')
      .trim()
      .substring(0, 100)
      .replace(/\s+/g, ' ');

    console.log(`Section ${index + 1}:`);
    console.log(`  ${preview}...`);

    // Check for crossing-out
    if (section.content.toLowerCase().includes('crossing-out') || section.content.toLowerCase().includes('crossing out')) {
      console.log(`  ⭐ TEACHES: Crossing-Out Trick!`);
    }

    // Check for ing/ed
    if (section.content.toLowerCase().includes('"ing"') && section.content.toLowerCase().includes('"ed"')) {
      console.log(`  ⭐ TEACHES: "ing" and "ed" Phrases!`);
    }

    console.log('');
  });

  console.log('\n=== QUIZ INSERTION POINTS ===\n');
  console.log('Position 5: Quiz appears AFTER section 5');
  console.log('Position 8: Quiz appears AFTER section 8');
  console.log('Position 12: Quiz appears AFTER section 12');
  console.log('Position 16: Quiz appears AFTER section 16\n');

  console.log('=== PROBLEM CHECK ===\n');
  console.log('Quiz 1 (position 5) asks about crossing-out trick...');

  let foundCrossingOut = false;
  for (let i = 0; i < Math.min(5, sections.length); i++) {
    if (sections[i].content.toLowerCase().includes('crossing-out') ||
        sections[i].content.toLowerCase().includes('crossing out')) {
      foundCrossingOut = true;
      console.log(`✅ Crossing-out trick IS taught in section ${i + 1} (before quiz at position 5)`);
      break;
    }
  }

  if (!foundCrossingOut) {
    console.log(`❌ Crossing-out trick NOT taught before position 5!`);
    console.log(`   Students will be tested on content they haven't learned yet!`);
  }
}

showActualSections();
