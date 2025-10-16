import { createClient } from '@supabase/supabase-js';
import * as dotenv from 'dotenv';
import { fileURLToPath } from 'url';
import { dirname, resolve } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
dotenv.config({ path: resolve(__dirname, '../.env') });

const supabase = createClient(process.env.REACT_APP_SUPABASE_URL, process.env.SUPABASE_SERVICE_ROLE_KEY);

const lessonKeys = ['2.2', '2.3', '2.4', '2.5', '3.1', '3.2', '3.3', '3.4', '3.5', '3.6'];

/**
 * Verify that all blue underlined terms in the database have definitions
 * and no problematic terms remain (single letters underlined or terms with colons)
 */
async function verifyDatabaseTerms() {
  console.log('\n✅ VERIFYING DATABASE TERMS');
  console.log('='.repeat(80));

  // Get all definitions from database
  const { data: definitions } = await supabase
    .from('term_definitions')
    .select('term, definition, lesson_key');

  const definitionMap = {};
  definitions.forEach(d => {
    definitionMap[d.term] = d;
  });

  console.log(`\nTotal definitions in database: ${definitions.length}\n`);

  const allTerms = new Set();
  const termsWithDefinitions = [];
  const termsWithoutDefinitions = [];
  const problematicTerms = [];

  for (const lessonKey of lessonKeys) {
    // Get lesson content from database
    const { data: lessonData } = await supabase
      .from('lesson_metadata')
      .select('id')
      .eq('lesson_key', lessonKey)
      .single();

    const { data: sections } = await supabase
      .from('lesson_sections')
      .select('id')
      .eq('lesson_id', lessonData.id);

    const sectionIds = sections.map(s => s.id);

    const { data: contentBlocks } = await supabase
      .from('section_content')
      .select('content')
      .in('section_id', sectionIds)
      .eq('content_type', 'html');

    const content = contentBlocks.map(b => b.content).join('\n');

    // Extract blue underlined terms
    const regex = /<strong[^>]*text-decoration: underline;[^>]*>([^<]+)<\/strong>/g;
    let match;

    while ((match = regex.exec(content)) !== null) {
      const term = match[1].trim();
      allTerms.add(term);

      // Check for problematic terms (excluding special case "e" which is Euler's number)
      const isProblematic = (term.length === 1 && term !== 'e') || term.match(/^[A-Z]$/) || term.includes(':');
      if (isProblematic) {
        problematicTerms.push({ lesson: lessonKey, term });
      } else if (definitionMap[term]) {
        termsWithDefinitions.push({ lesson: lessonKey, term });
      } else {
        termsWithoutDefinitions.push({ lesson: lessonKey, term });
      }
    }
  }

  console.log('📊 RESULTS:');
  console.log('='.repeat(80));
  console.log(`Total unique blue underlined terms: ${allTerms.size}`);
  console.log(`✅ Terms with definitions: ${new Set(termsWithDefinitions.map(t => t.term)).size}`);
  console.log(`❌ Terms missing definitions: ${new Set(termsWithoutDefinitions.map(t => t.term)).size}`);
  console.log(`⚠️  Problematic terms (single letters or with colons): ${problematicTerms.length}`);

  if (termsWithoutDefinitions.length > 0) {
    console.log('\n\n❌ TERMS MISSING DEFINITIONS:');
    console.log('='.repeat(80));
    const uniqueMissing = [...new Set(termsWithoutDefinitions.map(t => t.term))];
    uniqueMissing.forEach(term => console.log(`  - ${term}`));
  }

  if (problematicTerms.length > 0) {
    console.log('\n\n⚠️  PROBLEMATIC TERMS:');
    console.log('='.repeat(80));
    problematicTerms.forEach(({ lesson, term }) => {
      console.log(`  - Lesson ${lesson}: "${term}"`);
    });
  }

  if (termsWithoutDefinitions.length === 0 && problematicTerms.length === 0) {
    console.log('\n\n🎉 SUCCESS!');
    console.log('='.repeat(80));
    console.log('All blue underlined terms in the database have definitions!');
    console.log('No problematic terms found.');
    console.log('The hover tooltips should now work correctly for all terms.');
  }

  console.log('\n' + '='.repeat(80) + '\n');
}

verifyDatabaseTerms();
