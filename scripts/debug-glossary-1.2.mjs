import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://rabavobdklnwvwsldbix.supabase.co';
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InJhYmF2b2Jka2xud3Z3c2xkYml4Iiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc1OTc2NTQ3OCwiZXhwIjoyMDc1MzQxNDc4fQ.81SeH703keXgF3IevQlRS7OYmn1J2GUVIkn3OJiviM4';

const supabase = createClient(supabaseUrl, supabaseKey);

async function debugGlossary() {
  console.log('Checking glossary terms for substitution lesson...\n');
  
  const { data, error } = await supabase
    .from('lesson_term_definitions')
    .select('*')
    .eq('lesson_key', 'substitution');

  if (error) {
    console.error('Error:', error);
    return;
  }

  console.log('Found ' + data.length + ' terms in database:\n');
  data.forEach((term, i) => {
    console.log((i + 1) + '. "' + term.term + '"');
  });
  
  console.log('\n\nTerms used in HTML (from restructured-math-1.2-v1.html):');
  const htmlTerms = [
    'Number substitution',
    'number substitution',
    'algebraic expressions',
    'variables',
    'Answer choices',
    'answer choices',
    'Percent problems',
    'percent problems',
    'Geometry transformation',
    'geometry transformation',
    'trigonometry'
  ];
  
  console.log('\nHTML terms:');
  htmlTerms.forEach(t => console.log('  - "' + t + '"'));
  
  console.log('\n\nCase-insensitive match check:');
  htmlTerms.forEach(htmlTerm => {
    const match = data.find(dbTerm => dbTerm.term.toLowerCase() === htmlTerm.toLowerCase());
    if (match) {
      console.log('✅ HTML: "' + htmlTerm + '" → DB: "' + match.term + '"');
    } else {
      console.log('❌ HTML: "' + htmlTerm + '" → NO MATCH in database');
    }
  });
}

debugGlossary();
