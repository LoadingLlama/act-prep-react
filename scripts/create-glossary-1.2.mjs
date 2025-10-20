import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://rabavobdklnwvwsldbix.supabase.co';
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InJhYmF2b2Jka2xud3Z3c2xkYml4Iiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc1OTc2NTQ3OCwiZXhwIjoyMDc1MzQxNDc4fQ.81SeH703keXgF3IevQlRS7OYmn1J2GUVIkn3OJiviM4';

const supabase = createClient(supabaseUrl, supabaseKey);

async function createGlossaryTerms() {
  console.log('Creating glossary terms for Math 1.2 (Number Substitution)...\n');

  const terms = [
    // Core strategy term
    {
      term: 'number substitution',
      definition: 'A test-taking strategy where you replace variables in a problem with simple, concrete numbers to solve using arithmetic instead of complex algebra.',
      lesson_key: 'substitution'
    },
    // Mathematical concepts
    {
      term: 'variables',
      definition: 'Letters or symbols (like x, y, n, m) that represent unknown or changing values in mathematical expressions and equations.',
      lesson_key: 'substitution'
    },
    {
      term: 'algebraic expressions',
      definition: 'Mathematical phrases containing variables, numbers, and operations (like 2x + 3 or nm) but no equals sign.',
      lesson_key: 'substitution'
    },
    // ACT-specific term (reused from 1.1)
    {
      term: 'answer choices',
      definition: 'The five options (A, B, C, D, E) provided for each ACT Math question, arranged in ascending or descending numerical order.',
      lesson_key: 'substitution'
    },
    // Problem types
    {
      term: 'percent problems',
      definition: 'Questions that involve calculating percentages, often asking to find a percent of a quantity or express one quantity as a percent of another.',
      lesson_key: 'substitution'
    },
    {
      term: 'geometry transformation',
      definition: 'Changes to geometric shapes such as scaling (enlarging or shrinking), translating (sliding), rotating, or reflecting.',
      lesson_key: 'substitution'
    },
    {
      term: 'trigonometry',
      definition: 'The branch of mathematics dealing with relationships between angles and sides of triangles, using functions like sine, cosine, and tangent.',
      lesson_key: 'substitution'
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
