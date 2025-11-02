import { createClient } from '@supabase/supabase-js';
import dotenv from 'dotenv';

dotenv.config();

const supabaseUrl = process.env.REACT_APP_SUPABASE_URL;
const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY;
const supabase = createClient(supabaseUrl, supabaseKey);

/**
 * Extracts all blue underlined terms from HTML content
 * Pattern: <strong style="color: #2563eb; ... text-decoration: underline">term</strong>
 */
function extractBlueUnderlinedTerms(htmlContent) {
  const terms = new Set();

  // Match strong tags with blue color and underline
  const regex = /<strong[^>]*style="[^"]*color:\s*#2563eb[^"]*text-decoration:\s*underline[^"]*"[^>]*>(.*?)<\/strong>/gi;

  let match;
  while ((match = regex.exec(htmlContent)) !== null) {
    const term = match[1].trim();
    if (term) {
      terms.add(term);
    }
  }

  return Array.from(terms);
}

async function findMissingTermDefinitions() {
  console.log('🔍 ANALYZING BLUE UNDERLINED TERMS IN LESSONS\n');

  // Step 1: Fetch all existing term definitions
  console.log('📚 Step 1: Fetching existing term definitions...');
  const { data: definitions, error: defsError } = await supabase
    .from('lesson_term_definitions')
    .select('term');

  if (defsError) {
    console.error('❌ Error fetching term definitions:', defsError);
    return;
  }

  const existingTerms = new Set(definitions.map(d => d.term));
  console.log(`✅ Found ${existingTerms.size} existing term definitions\n`);

  // Step 2: Fetch all lessons
  console.log('📖 Step 2: Fetching all lessons...');
  const { data: lessons, error: lessonsError } = await supabase
    .from('lessons')
    .select('lesson_key, title, content, content_json');

  if (lessonsError) {
    console.error('❌ Error fetching lessons:', lessonsError);
    return;
  }

  console.log(`✅ Found ${lessons.length} lessons\n`);

  // Step 3: Extract all blue underlined terms from lessons
  console.log('🔎 Step 3: Extracting blue underlined terms from lessons...');
  const lessonTerms = new Map(); // lesson_key -> [terms]
  const allTermsInLessons = new Set();

  for (const lesson of lessons) {
    const content = lesson.content_json || lesson.content || '';
    const terms = extractBlueUnderlinedTerms(content);

    if (terms.length > 0) {
      lessonTerms.set(lesson.lesson_key, {
        title: lesson.title,
        terms: terms
      });
      terms.forEach(term => allTermsInLessons.add(term));
    }
  }

  console.log(`✅ Found ${allTermsInLessons.size} unique blue underlined terms across all lessons\n`);

  // Step 4: Find terms without definitions
  console.log('🔍 Step 4: Identifying terms without definitions...');
  const missingTerms = Array.from(allTermsInLessons).filter(term => !existingTerms.has(term));

  console.log(`\n${'='.repeat(80)}`);
  console.log(`📊 ANALYSIS RESULTS`);
  console.log(`${'='.repeat(80)}\n`);

  console.log(`Total blue underlined terms in lessons: ${allTermsInLessons.size}`);
  console.log(`Terms with definitions: ${allTermsInLessons.size - missingTerms.length}`);
  console.log(`Terms WITHOUT definitions: ${missingTerms.length}\n`);

  if (missingTerms.length > 0) {
    console.log(`${'='.repeat(80)}`);
    console.log(`❌ MISSING TERM DEFINITIONS (${missingTerms.length})`);
    console.log(`${'='.repeat(80)}\n`);

    // Group by lesson
    const missingByLesson = new Map();

    for (const [lessonKey, lessonData] of lessonTerms.entries()) {
      const missingInLesson = lessonData.terms.filter(term => missingTerms.includes(term));
      if (missingInLesson.length > 0) {
        missingByLesson.set(lessonKey, {
          title: lessonData.title,
          terms: missingInLesson
        });
      }
    }

    // Display by lesson
    for (const [lessonKey, data] of missingByLesson.entries()) {
      console.log(`📚 ${data.title} (${lessonKey})`);
      console.log(`   Missing definitions for ${data.terms.length} terms:`);
      data.terms.forEach(term => {
        console.log(`   • "${term}"`);
      });
      console.log();
    }

    // Show unique missing terms alphabetically
    console.log(`${'='.repeat(80)}`);
    console.log(`📝 ALL MISSING TERMS (Alphabetical)`);
    console.log(`${'='.repeat(80)}\n`);

    const sortedMissing = [...missingTerms].sort();
    sortedMissing.forEach((term, index) => {
      console.log(`${(index + 1).toString().padStart(3, ' ')}. "${term}"`);
    });
  } else {
    console.log('✅ All blue underlined terms have definitions!');
  }

  console.log(`\n${'='.repeat(80)}\n`);
}

findMissingTermDefinitions().catch(console.error);
