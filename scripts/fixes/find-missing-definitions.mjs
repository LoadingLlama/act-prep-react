import { createClient } from '@supabase/supabase-js';

const supabase = createClient(
  'https://rabavobdklnwvwsldbix.supabase.co',
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InJhYmF2b2Jka2xud3Z3c2xkYml4Iiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc1OTc2NTQ3OCwiZXhwIjoyMDc1MzQxNDc4fQ.81SeH703keXgF3IevQlRS7OYmn1J2GUVIkn3OJiviM4'
);

console.log('🔍 Finding blue underlined terms without definitions...\n');

// Get all existing definitions
const { data: existingDefs } = await supabase
  .from('lesson_term_definitions')
  .select('term');

const existingTerms = new Set(
  existingDefs.map(d => d.term.toLowerCase())
);

console.log(`Found ${existingTerms.size} existing definitions\n`);

// Get all lessons
const { data: lessons } = await supabase
  .from('lessons')
  .select('lesson_key, content')
  .order('subject', { ascending: true })
  .order('order_index', { ascending: true });

// Find all blue underlined terms
const blueUnderlinedPattern = /<strong[^>]*style="[^"]*color:\s*#2563eb[^"]*text-decoration:\s*underline[^"]*"[^>]*>(.*?)<\/strong>/gi;
const blueUnderlinedPattern2 = /<strong[^>]*style="[^"]*text-decoration:\s*underline[^"]*color:\s*#2563eb[^"]*"[^>]*>(.*?)<\/strong>/gi;

const termsInLessons = new Map(); // term -> [lesson_keys]
const missingTerms = new Map(); // term -> [lesson_keys]

for (const lesson of lessons) {
  if (!lesson.content) continue;

  // Try both patterns (color before text-decoration and vice versa)
  const matches1 = [...lesson.content.matchAll(blueUnderlinedPattern)];
  const matches2 = [...lesson.content.matchAll(blueUnderlinedPattern2)];
  const allMatches = [...matches1, ...matches2];

  for (const match of allMatches) {
    const term = match[1]
      .replace(/<[^>]*>/g, '') // Remove any inner HTML tags
      .trim();

    if (!term || term.length === 0) continue;

    // Track all terms
    if (!termsInLessons.has(term)) {
      termsInLessons.set(term, []);
    }
    if (!termsInLessons.get(term).includes(lesson.lesson_key)) {
      termsInLessons.get(term).push(lesson.lesson_key);
    }

    // Check if definition exists
    if (!existingTerms.has(term.toLowerCase())) {
      if (!missingTerms.has(term)) {
        missingTerms.set(term, []);
      }
      if (!missingTerms.get(term).includes(lesson.lesson_key)) {
        missingTerms.get(term).push(lesson.lesson_key);
      }
    }
  }
}

console.log(`Total blue underlined terms found: ${termsInLessons.size}`);
console.log(`Terms missing definitions: ${missingTerms.size}\n`);

if (missingTerms.size > 0) {
  console.log('TERMS MISSING DEFINITIONS:');
  console.log('==========================\n');

  // Sort by number of occurrences (descending)
  const sorted = [...missingTerms.entries()].sort((a, b) => b[1].length - a[1].length);

  sorted.forEach(([term, lessonKeys]) => {
    console.log(`  "${term}" (${lessonKeys.length} lesson${lessonKeys.length > 1 ? 's' : ''})`);
    console.log(`    Used in: ${lessonKeys.join(', ')}`);
    console.log('');
  });
}

console.log('\nSample of terms WITH definitions:');
console.log('==================================\n');
const termsWithDefs = [...termsInLessons.entries()]
  .filter(([term]) => existingTerms.has(term.toLowerCase()))
  .slice(0, 10);

termsWithDefs.forEach(([term, lessonKeys]) => {
  console.log(`  "${term}" (${lessonKeys.length} lessons)`);
});
