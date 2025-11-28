const { createClient } = require('@supabase/supabase-js');

const supabaseUrl = "https://rabavobdklnwvwsldbix.supabase.co";
const supabaseServiceKey = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InJhYmF2b2Jka2xud3Z3c2xkYml4Iiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc1OTc2NTQ3OCwiZXhwIjoyMDc1MzQxNDc4fQ.81SeH703keXgF3IevQlRS7OYmn1J2GUVIkn3OJiviM4";
const supabase = createClient(supabaseUrl, supabaseServiceKey);

async function verifyOneFix() {
  // Check adding-deleting question that should have been fixed
  const testId = '3d06bded-490f-4dc0-bd09-57566f14d8f4';

  const { data } = await supabase
    .from('lesson_examples')
    .select('title, answer_explanation, choices')
    .eq('id', testId)
    .single();

  console.log('Question: Adding Information - Read Paragraph Twice\n');
  console.log('Answer Explanation:');
  console.log(data.answer_explanation);
  console.log('\n' + '='.repeat(80));
  console.log('\nChoice A Explanation:');
  console.log(data.choices[0].explanation);
  console.log('\n' + '='.repeat(80));
  console.log('\nChoice C (correct) Explanation:');
  console.log(data.choices[2].explanation);

  // Check for generic patterns
  const hasGeneric =
    data.answer_explanation.includes("doesn't satisfy the requirements") ||
    data.answer_explanation.includes("doesn't best fulfill the requirements") ||
    data.answer_explanation.includes("might seem plausible at first");

  console.log('\n' + '='.repeat(80));
  if (hasGeneric) {
    console.log('❌ STILL HAS GENERIC EXPLANATIONS');
  } else {
    console.log('✓ Has specific explanations!');
  }
}

verifyOneFix();
