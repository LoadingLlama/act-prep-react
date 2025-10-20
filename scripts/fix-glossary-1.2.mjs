import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://rabavobdklnwvwsldbix.supabase.co';
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InJhYmF2b2Jka2xud3Z3c2xkYml4Iiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc1OTc2NTQ3OCwiZXhwIjoyMDc1MzQxNDc4fQ.81SeH703keXgF3IevQlRS7OYmn1J2GUVIkn3OJiviM4';

const supabase = createClient(supabaseUrl, supabaseKey);

async function fixGlossary() {
  console.log('Adding missing glossary terms for substitution...\n');

  const missingTerms = [
    {
      term: 'algebraic expressions',
      definition: 'Mathematical phrases containing variables, numbers, and operations (like 2x + 3 or nm) but no equals sign.',
      lesson_key: 'substitution'
    },
    {
      term: 'answer choices',
      definition: 'The five options (A, B, C, D, E) provided for each ACT Math question, arranged in ascending or descending numerical order.',
      lesson_key: 'substitution'
    },
    {
      term: 'trigonometry',
      definition: 'The branch of mathematics dealing with relationships between angles and sides of triangles, using functions like sine, cosine, and tangent.',
      lesson_key: 'substitution'
    }
  ];

  for (const term of missingTerms) {
    // Check if already exists
    const { data: existing } = await supabase
      .from('lesson_term_definitions')
      .select('*')
      .eq('term', term.term)
      .eq('lesson_key', 'substitution')
      .single();

    if (existing) {
      console.log('⏭️  Term already exists: ' + term.term);
      continue;
    }

    const { data, error } = await supabase
      .from('lesson_term_definitions')
      .insert(term)
      .select();

    if (error) {
      console.error('❌ Failed to create term "' + term.term + '":', error);
    } else {
      console.log('✅ Created term: ' + term.term);
    }
  }

  console.log('\n✅ Missing terms added!');
  
  // Now remove unwanted terms
  console.log('\nRemoving unwanted terms...\n');
  
  const unwantedTerms = [
    'choosing smart numbers',
    'testing with values',
    'variable expressions',
    'consistency',
    'picking numbers'
  ];
  
  for (const termName of unwantedTerms) {
    const { error } = await supabase
      .from('lesson_term_definitions')
      .delete()
      .eq('term', termName)
      .eq('lesson_key', 'substitution');
    
    if (error) {
      console.error('❌ Failed to delete "' + termName + '":', error);
    } else {
      console.log('✅ Deleted: ' + termName);
    }
  }
  
  console.log('\n✅ Cleanup complete!');
}

fixGlossary();
