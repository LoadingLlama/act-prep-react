import { createClient } from '@supabase/supabase-js';
import dotenv from 'dotenv';

dotenv.config();

const supabase = createClient(
  process.env.REACT_APP_SUPABASE_URL,
  process.env.REACT_APP_SUPABASE_ANON_KEY
);

function simpleSplit(content) {
  const sections = [];

  if (content.includes('<h3')) {
    const h3Parts = content.split(/(?=<h3[^>]*>)/);

    for (let part of h3Parts) {
      part = part.trim();
      if (!part || part.length < 50) continue;

      const wordCount = (part.match(/\b\w+\b/g) || []).length;

      if (wordCount > 200) {
        // Long section - would be split further
        // For now just mark it
        sections.push({
          content: part,
          isLong: true,
          wordCount
        });
      } else {
        sections.push({
          content: part,
          isLong: false,
          wordCount
        });
      }
    }
  }

  return sections;
}

async function showSections() {
  const { data: lesson } = await supabase
    .from('lessons')
    .select('*')
    .eq('lesson_key', 'commas')
    .single();

  const sections = simpleSplit(lesson.content);

  console.log('=== TEXT SECTIONS BREAKDOWN ===\n');

  let sectionNumber = 1;
  sections.forEach((section, index) => {
    const title = section.content.match(/<h3[^>]*>([^<]+)<\/h3>/)?.[1] || `Section ${index}`;
    const preview = section.content
      .replace(/<[^>]*>/g, ' ')
      .trim()
      .substring(0, 120)
      .replace(/\s+/g, ' ');

    console.log(`H3 Section ${index}: ${title}`);
    console.log(`  Words: ${section.wordCount}${section.isLong ? ' (WILL BE SPLIT INTO MULTIPLE)' : ''}`);
    console.log(`  Preview: ${preview}...`);

    // Check for key concepts
    const hasCrossingOut = section.content.toLowerCase().includes('crossing-out') ||
                           section.content.toLowerCase().includes('crossing out');
    const hasIngEd = section.content.toLowerCase().includes('"ing"') &&
                     section.content.toLowerCase().includes('"ed"');

    if (hasCrossingOut) console.log(`  ⭐ TEACHES: Crossing-Out Trick`);
    if (hasIngEd) console.log(`  ⭐ TEACHES: ing/ed Phrases`);

    console.log('');

    // Estimate text sections
    if (section.isLong) {
      const estimatedSections = Math.ceil(section.wordCount / 150);
      console.log(`  → This will become approximately ${estimatedSections} text sections (${sectionNumber}-${sectionNumber + estimatedSections - 1})`);
      sectionNumber += estimatedSections;
    } else {
      console.log(`  → This will be text section ${sectionNumber}`);
      sectionNumber++;
    }
    console.log('');
  });

  console.log('\n=== QUIZ POSITIONS ===');
  console.log('Position 5: After text section 5');
  console.log('Position 8: After text section 8');
  console.log('Position 12: After text section 12');
  console.log('Position 16: After text section 16\n');
}

showSections();
