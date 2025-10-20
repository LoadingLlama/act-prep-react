import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://rabavobdklnwvwsldbix.supabase.co';
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InJhYmF2b2Jka2xud3Z3c2xkYml4Iiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc1OTc2NTQ3OCwiZXhwIjoyMDc1MzQxNDc4fQ.81SeH703keXgF3IevQlRS7OYmn1J2GUVIkn3OJiviM4';

const supabase = createClient(supabaseUrl, supabaseKey);

async function createGlossaryTerms() {
  console.log('Creating glossary terms for Math 1.1 (Backsolving)...\n');

  const terms = [
    // Core strategy terms
    {
      term: 'backsolving',
      definition: 'A problem-solving strategy where you test answer choices by plugging them into the problem conditions instead of solving algebraically.',
      lesson_key: 'backsolving'
    },
    {
      term: 'working backwards',
      definition: 'Another name for backsolving; starting with the answer choices and testing which one satisfies all problem conditions.',
      lesson_key: 'backsolving'
    },
    {
      term: 'middle value strategy',
      definition: 'Starting with answer choice B or C (the middle values) when backsolving, which allows you to eliminate multiple choices with a single test.',
      lesson_key: 'backsolving'
    },
    // Problem type terms
    {
      term: 'radical equations',
      definition: 'Equations that contain variables inside square roots, cube roots, or other radicals (e.g., √(x + 5) = 7).',
      lesson_key: 'backsolving'
    },
    {
      term: 'systems of equations',
      definition: 'Two or more equations with multiple variables that must be solved simultaneously to find values that satisfy all equations.',
      lesson_key: 'backsolving'
    },
    {
      term: 'word problems',
      definition: 'Math problems presented in written narrative form that require translating real-world scenarios into mathematical expressions and equations.',
      lesson_key: 'backsolving'
    },
    // Mathematical concepts
    {
      term: 'algebraic expressions',
      definition: 'Mathematical phrases containing variables, numbers, and operations (like 2x + 3 or a²b) but no equals sign.',
      lesson_key: 'backsolving'
    },
    {
      term: 'answer choices',
      definition: 'The five options (A, B, C, D, E) provided for each ACT Math question, arranged in ascending or descending numerical order.',
      lesson_key: 'backsolving'
    },
    {
      term: 'systematic elimination',
      definition: 'The process of ruling out incorrect answer choices in an organized way based on whether they are too large, too small, or don\'t satisfy problem conditions.',
      lesson_key: 'backsolving'
    }
  ];

  for (const term of terms) {
    // Check if term already exists
    const { data: existing } = await supabase
      .from('lesson_term_definitions')
      .select('*')
      .eq('term', term.term)
      .single();

    if (existing) {
      console.log(`⏭️  Term already exists: ${term.term}`);
      continue;
    }

    const { data, error } = await supabase
      .from('lesson_term_definitions')
      .insert(term)
      .select();

    if (error) {
      console.error(`❌ Failed to create term "${term.term}":`, error);
    } else {
      console.log(`✅ Created term: ${term.term}`);
    }
  }

  console.log('\n✅ All glossary terms processed successfully!');
}

createGlossaryTerms();
