import { createClient } from '@supabase/supabase-js';

const supabase = createClient(
  'https://rabavobdklnwvwsldbix.supabase.co',
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InJhYmF2b2Jka2xud3Z3c2xkYml4Iiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc1OTc2NTQ3OCwiZXhwIjoyMDc1MzQxNDc4fQ.81SeH703keXgF3IevQlRS7OYmn1J2GUVIkn3OJiviM4'
);

console.log('🧹 Final solution cleanup - making them clean and readable...\n');

function properlyCleanSolution(text) {
  if (!text) return text;

  let cleaned = text;

  // 1. Fix "Why Why" duplication
  cleaned = cleaned.replace(/Why Why/g, 'Why');

  // 2. Add line breaks after sentences (periods followed by capital letter)
  cleaned = cleaned.replace(/\.\s*([A-Z])/g, '.\n$1');

  // 3. Add line breaks before Step headers
  cleaned = cleaned.replace(/([^\n])(Step \d+:)/g, '$1\n\n$2');

  // 4. Add line breaks before choice letters at start of explanation
  cleaned = cleaned.replace(/([^\n\-])([A-E] \()/g, '$1\n$2');

  // 5. Keep dashes with choices
  cleaned = cleaned.replace(/\n-([A-E])/g, '\n\n$1');

  // 6. Add line breaks before "Why" explanations
  cleaned = cleaned.replace(/([^\n])(Why [A-E])/g, '$1\n\n$2');

  // 7. Fix "The answer is" to be on its own line
  cleaned = cleaned.replace(/([^\n])(The answer is)/g, '$1\n\n$2');

  // 8. Remove excessive newlines (more than 2)
  cleaned = cleaned.replace(/\n{3,}/g, '\n\n');

  // 9. Trim each line
  const lines = cleaned.split('\n');
  cleaned = lines.map(line => line.trim()).join('\n');

  // 10. Final trim
  cleaned = cleaned.trim();

  return cleaned;
}

// Get all examples
const { data: examples, error } = await supabase
  .from('lesson_examples')
  .select('*');

if (error) {
  console.error('Error:', error);
  process.exit(1);
}

console.log(`Processing ${examples.length} examples...\n`);

let updatedCount = 0;

for (const example of examples) {
  if (!example.answer_explanation) continue;

  const original = example.answer_explanation;
  const cleaned = properlyCleanSolution(original);

  if (cleaned !== original) {
    const { error: updateError } = await supabase
      .from('lesson_examples')
      .update({ answer_explanation: cleaned })
      .eq('id', example.id);

    if (updateError) {
      console.log(`  ❌ Error: ${example.title}`);
    } else {
      console.log(`  ✅ Cleaned: ${example.title}`);
      updatedCount++;
    }
  }
}

console.log('\n' + '='.repeat(60));
console.log('✅ Final Cleanup Complete');
console.log('='.repeat(60));
console.log(`Updated: ${updatedCount} examples`);
