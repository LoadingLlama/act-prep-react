import { createClient } from '@supabase/supabase-js';
import * as dotenv from 'dotenv';
import { fileURLToPath } from 'url';
import { dirname, resolve } from 'path';
import { readFileSync } from 'fs';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
dotenv.config({ path: resolve(__dirname, '../.env') });

const supabase = createClient(process.env.REACT_APP_SUPABASE_URL, process.env.SUPABASE_SERVICE_ROLE_KEY);

const lessons = [
  { key: '2.2', file: 'LESSON_2_2_AREAS_VOLUMES_TRIANGLES.html' },
  { key: '2.3', file: 'LESSON_2_3_LINES.html' },
  { key: '2.4', file: 'LESSON_2_4_ARCS_SECTORS.html' },
  { key: '2.5', file: 'LESSON_2_5_CIRCLES_ELLIPSES_HYPERBOLAS.html' },
  { key: '3.1', file: 'LESSON_3_1_ALGEBRA_SKILLS.html' },
  { key: '3.2', file: 'LESSON_3_2_FRACTIONS.html' },
  { key: '3.3', file: 'LESSON_3_3_EXPONENTS_ROOTS.html' }
];

// Extract all blue underlined terms from lessons
function extractTerms() {
  const allTerms = new Set();

  for (const lesson of lessons) {
    const filePath = resolve(__dirname, '../docs', lesson.file);
    const content = readFileSync(filePath, 'utf8');

    const regex = /<strong style="[^"]*color:\s*#2563eb[^"]*text-decoration:\s*underline[^"]*">([^<]+)<\/strong>/gi;
    let match;

    while ((match = regex.exec(content)) !== null) {
      const term = match[1].trim();
      allTerms.add(term);
    }
  }

  return Array.from(allTerms).sort();
}

async function checkDefinitions() {
  console.log('Extracting terms from lessons...\n');
  const terms = extractTerms();
  console.log(`Found ${terms.length} unique terms\n`);

  // Fetch all definitions from database
  console.log('Fetching definitions from database...\n');
  const { data: definitions, error } = await supabase
    .from('term_definitions')
    .select('term, definition, lesson_key');

  if (error) {
    console.error('Error fetching definitions:', error);
    return;
  }

  const definitionMap = {};
  definitions.forEach(d => {
    definitionMap[d.term] = d;
  });

  console.log(`Found ${definitions.length} definitions in database\n`);
  console.log('='.repeat(80));

  const termsWithDefinitions = [];
  const termsWithoutDefinitions = [];
  const problematicTerms = [];

  terms.forEach(term => {
    // Check for problematic terms (single letters, colons at end, etc.)
    if (term.length === 1 || term.match(/^[A-Z]$/) || term.includes(':')) {
      problematicTerms.push(term);
    } else if (definitionMap[term]) {
      termsWithDefinitions.push(term);
    } else {
      termsWithoutDefinitions.push(term);
    }
  });

  console.log('\n✅ TERMS WITH DEFINITIONS (' + termsWithDefinitions.length + '):');
  console.log('='.repeat(80));
  termsWithDefinitions.forEach(term => {
    const def = definitionMap[term];
    console.log(`\n${term}`);
    console.log(`  Lesson: ${def.lesson_key}`);
    console.log(`  Definition: ${def.definition.substring(0, 100)}${def.definition.length > 100 ? '...' : ''}`);
  });

  console.log('\n\n❌ TERMS MISSING DEFINITIONS (' + termsWithoutDefinitions.length + '):');
  console.log('='.repeat(80));
  termsWithoutDefinitions.forEach(term => console.log(`  - ${term}`));

  console.log('\n\n⚠️  PROBLEMATIC TERMS (may need to be fixed in HTML) (' + problematicTerms.length + '):');
  console.log('='.repeat(80));
  problematicTerms.forEach(term => console.log(`  - "${term}"`));

  console.log('\n\n📊 SUMMARY:');
  console.log('='.repeat(80));
  console.log(`Total terms: ${terms.length}`);
  console.log(`With definitions: ${termsWithDefinitions.length}`);
  console.log(`Missing definitions: ${termsWithoutDefinitions.length}`);
  console.log(`Problematic: ${problematicTerms.length}`);
}

checkDefinitions();
