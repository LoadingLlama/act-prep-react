/**
 * Add letter labels (a, b, c...) to all H4 headings
 * Letters reset at each H3 section
 */

import { createClient } from '@supabase/supabase-js';
import dotenv from 'dotenv';

dotenv.config();

const supabase = createClient(
  process.env.REACT_APP_SUPABASE_URL,
  process.env.SUPABASE_SERVICE_ROLE_KEY
);

function addLetterLabels(content) {
  // Split content by H3 tags to process each section
  const h3Sections = content.split(/(<h3[^>]*>.*?<\/h3>)/);

  let result = '';
  let currentLetter = 0; // a=0, b=1, c=2, etc.

  for (let i = 0; i < h3Sections.length; i++) {
    const section = h3Sections[i];

    // Check if this is an H3 tag
    if (section.match(/<h3[^>]*>.*?<\/h3>/)) {
      // Reset letter counter for new H3 section
      currentLetter = 0;
      result += section;
    } else {
      // Process H4 tags in this section
      let updatedSection = section;

      // Find all H4 tags
      updatedSection = updatedSection.replace(/<h4([^>]*)>(.*?)<\/h4>/g, (match, attrs, content) => {
        // Skip if already has a letter label
        if (content.match(/^[a-z]\)/)) {
          return match;
        }

        // Skip if it's a special heading (Key Takeaways, etc)
        if (content.includes('✓')) {
          return match;
        }

        // Add letter label
        const letter = String.fromCharCode(97 + currentLetter); // 97 = 'a'
        currentLetter++;

        return `<h4${attrs}>${letter}) ${content}</h4>`;
      });

      result += updatedSection;
    }
  }

  return result;
}

async function updateLessons() {
  console.log('╔══════════════════════════════════════════════════════════╗');
  console.log('║     ADDING LETTER LABELS TO H4 HEADINGS                 ║');
  console.log('║     Labels reset at each H3 section                     ║');
  console.log('╚══════════════════════════════════════════════════════════╝\n');

  // Fetch both lessons
  const { data: lessons } = await supabase
    .from('lessons')
    .select('lesson_key, content')
    .in('lesson_key', ['geometry-angles', 'geometry-shapes']);

  for (const lesson of lessons) {
    console.log(`Processing ${lesson.lesson_key}...`);

    const updatedContent = addLetterLabels(lesson.content);

    // Count changes
    const originalH4s = (lesson.content.match(/<h4/g) || []).length;
    const labeledH4s = (updatedContent.match(/<h4[^>]*>[a-z]\)/g) || []).length;

    console.log(`  - Total H4 headings: ${originalH4s}`);
    console.log(`  - Labeled with letters: ${labeledH4s}`);

    // Update database
    const { error } = await supabase
      .from('lessons')
      .update({
        content: updatedContent,
        updated_at: new Date().toISOString()
      })
      .eq('lesson_key', lesson.lesson_key);

    if (error) {
      console.error(`❌ Error updating ${lesson.lesson_key}:`, error.message);
    } else {
      console.log(`✅ Updated ${lesson.lesson_key}\n`);
    }
  }

  console.log('✅ All lessons updated with letter labels!');
  console.log('\nStructure:');
  console.log('  H3: Major Section (no label)');
  console.log('  H4: a) First subsection');
  console.log('  H4: b) Second subsection');
  console.log('  H4: c) Third subsection');
  console.log('  H3: Next Major Section (no label)');
  console.log('  H4: a) First subsection (resets to a)');
  console.log('  H4: b) Second subsection');
}

updateLessons().catch(console.error);
