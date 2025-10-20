import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://rabavobdklnwvwsldbix.supabase.co';
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InJhYmF2b2Jka2xud3Z3c2xkYml4Iiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc1OTc2NTQ3OCwiZXhwIjoyMDc1MzQxNDc4fQ.81SeH703keXgF3IevQlRS7OYmn1J2GUVIkn3OJiviM4';

const supabase = createClient(supabaseUrl, supabaseKey);

// Terms that should remain (used in the HTML)
const validTerms = [
  'backsolving',
  'middle value strategy',
  'radical equations',
  'systems of equations',
  'word problems',
  'algebraic expressions',
  'answer choices',
  'systematic elimination'
];

async function cleanupDuplicates() {
  console.log('Fetching all glossary terms for backsolving lesson...\n');
  
  const { data: allTerms, error } = await supabase
    .from('lesson_term_definitions')
    .select('*')
    .eq('lesson_key', 'backsolving');

  if (error) {
    console.error('Error fetching terms:', error);
    return;
  }

  console.log('Found ' + allTerms.length + ' terms total\n');

  for (const term of allTerms) {
    if (!validTerms.includes(term.term)) {
      console.log('Deleting invalid term: "' + term.term + '"');
      const { error: deleteError } = await supabase
        .from('lesson_term_definitions')
        .delete()
        .eq('id', term.id);
      
      if (deleteError) {
        console.error('  Error deleting:', deleteError);
      } else {
        console.log('  ✅ Deleted');
      }
    } else {
      console.log('Keeping valid term: "' + term.term + '"');
    }
  }
  
  console.log('\nCleanup complete!');
}

cleanupDuplicates();
