/**
 * Create Term Definitions for Backsolving Lesson
 * Store in term_definitions table
 */

const { createClient } = require('@supabase/supabase-js');
require('dotenv').config();

const supabase = createClient(
  process.env.REACT_APP_SUPABASE_URL,
  process.env.SUPABASE_SERVICE_ROLE_KEY
);

const backsolvingTerms = [
  {
    term: 'Backsolving',
    definition: 'A problem-solving strategy where you test answer choices by substituting them back into the problem to find which one works.',
    context: 'Backsolving is especially useful on the ACT when algebraic setup is complex or time-consuming. It converts algebra into simple arithmetic.',
    related_terms: ['Answer Choices', 'Substitution'],
    lesson_key: 'backsolving'
  }
];

async function main() {
  console.log('='.repeat(80));
  console.log('CREATING TERM DEFINITIONS FOR BACKSOLVING LESSON');
  console.log('='.repeat(80));
  console.log();

  // First, delete any existing backsolving terms
  console.log('Cleaning up existing backsolving terms...');
  const { error: deleteError } = await supabase
    .from('term_definitions')
    .delete()
    .eq('lesson_key', 'backsolving');

  if (deleteError) {
    console.error('Warning during cleanup:', deleteError.message);
  } else {
    console.log('✓ Cleaned up existing terms');
  }

  // Insert new terms
  console.log('\\nInserting new term definitions...');
  console.log();

  for (const term of backsolvingTerms) {
    console.log(`Creating: ${term.term}`);
    console.log(`  Definition: ${term.definition}`);
    console.log(`  Context: ${term.context}`);

    const { data, error } = await supabase
      .from('term_definitions')
      .insert({
        ...term,
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString()
      })
      .select();

    if (error) {
      console.error(`  ❌ Error:`, error.message);
    } else {
      console.log(`  ✓ Created successfully`);
    }
    console.log();
  }

  // Verify
  console.log('='.repeat(80));
  console.log('VERIFICATION');
  console.log('='.repeat(80));

  const { data: verifyData, error: verifyError } = await supabase
    .from('term_definitions')
    .select('*')
    .eq('lesson_key', 'backsolving');

  if (verifyError) {
    console.error('Verification error:', verifyError);
  } else {
    console.log(`✓ Total backsolving terms in database: ${verifyData.length}`);
    verifyData.forEach(term => {
      console.log(`  - ${term.term}`);
    });
  }

  process.exit(0);
}

main();
