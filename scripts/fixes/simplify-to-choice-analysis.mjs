import { createClient } from '@supabase/supabase-js';

const supabase = createClient(
  'https://rabavobdklnwvwsldbix.supabase.co',
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InJhYmF2b2Jka2xud3Z3c2xkYml4Iiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc1OTc2NTQ3OCwiZXhwIjoyMDc1MzQxNDc4fQ.81SeH703keXgF3IevQlRS7OYmn1J2GUVIkn3OJiviM4'
);

console.log('📝 Simplifying solutions to just show why each answer is right/wrong...\n');

function extractChoiceAnalysis(text, correctAnswer) {
  if (!text) return text;

  // Look for lines that analyze each choice
  const lines = text.split('\n');
  const choiceLines = [];

  for (let i = 0; i < lines.length; i++) {
    const line = lines[i].trim();

    // Match lines that start with A., B., C., D., E. or A (, B (, etc.
    if (line.match(/^[A-E][\.\(]/)) {
      choiceLines.push(line);
    }
  }

  // If we found choice analysis, use it
  if (choiceLines.length >= 2) {
    return choiceLines.join('\n\n');
  }

  // Otherwise return simplified version of original
  return text;
}

// Get all examples with choices
const { data: examples, error } = await supabase
  .from('lesson_examples')
  .select('*')
  .not('choices', 'is', null);

if (error) {
  console.error('Error:', error);
  process.exit(1);
}

console.log(`Processing ${examples.length} examples with choices...\n`);

let updatedCount = 0;
let skippedCount = 0;

for (const example of examples) {
  if (!example.answer_explanation) {
    skippedCount++;
    continue;
  }

  const simplified = extractChoiceAnalysis(example.answer_explanation, example.correct_answer);

  if (simplified !== example.answer_explanation) {
    const { error: updateError } = await supabase
      .from('lesson_examples')
      .update({ answer_explanation: simplified })
      .eq('id', example.id);

    if (updateError) {
      console.log(`  ❌ Error: ${example.title}`);
    } else {
      console.log(`  ✅ Simplified: ${example.title}`);
      updatedCount++;
    }
  } else {
    skippedCount++;
  }
}

console.log('\n' + '='.repeat(60));
console.log('✅ Simplification Complete');
console.log('='.repeat(60));
console.log(`Updated: ${updatedCount} examples`);
console.log(`Skipped: ${skippedCount} examples (no choice analysis found)`);
