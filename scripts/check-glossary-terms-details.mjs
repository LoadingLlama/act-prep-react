import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://rabavobdklnwvwsldbix.supabase.co';
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InJhYmF2b2Jka2xud3Z3c2xkYml4Iiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc1OTc2NTQ3OCwiZXhwIjoyMDc1MzQxNDc4fQ.81SeH703keXgF3IevQlRS7OYmn1J2GUVIkn3OJiviM4';

const supabase = createClient(supabaseUrl, supabaseKey);

async function checkTerms() {
  console.log('Checking all glossary terms in database...');
  
  const { data, error } = await supabase
    .from('lesson_term_definitions')
    .select('*')
    .eq('lesson_key', 'backsolving');

  if (error) {
    console.error('Error:', error);
    return;
  }

  console.log('Found ' + data.length + ' terms:');
  data.forEach((term, i) => {
    console.log((i + 1) + '. "' + term.term + '"');
  });
  
  console.log('\nTerms used in HTML:');
  const htmlTerms = [
    'Backsolving',
    'backsolving', 
    'Answer choices',
    'answer choices',
    'algebraic expressions',
    'middle value strategy',
    'systematic elimination',
    'Radical equations',
    'radical equations',
    'word problems',
    'Systems of equations',
    'systems of equations'
  ];
  htmlTerms.forEach(t => console.log('  - "' + t + '"'));
  
  console.log('\nCase-sensitive match check:');
  data.forEach(dbTerm => {
    const matches = htmlTerms.filter(htmlTerm => htmlTerm.toLowerCase() === dbTerm.term.toLowerCase());
    if (matches.length > 0) {
      console.log('DB: "' + dbTerm.term + '" matches HTML: ' + matches.map(m => '"' + m + '"').join(', '));
    } else {
      console.log('DB: "' + dbTerm.term + '" - NO MATCH IN HTML');
    }
  });
}

checkTerms();
