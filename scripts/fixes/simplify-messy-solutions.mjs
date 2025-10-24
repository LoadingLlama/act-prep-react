import { createClient } from '@supabase/supabase-js';

const supabase = createClient(
  'https://rabavobdklnwvwsldbix.supabase.co',
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InJhYmF2b2Jka2xud3Z3c2xkYml4Iiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc1OTc2NTQ3OCwiZXhwIjoyMDc1MzQxNDc4fQ.81SeH703keXgF3IevQlRS7OYmn1J2GUVIkn3OJiviM4'
);

console.log('🧹 Simplifying messy example solutions to be clean and minimalist...\n');

function cleanSolution(text) {
  if (!text) return text;

  let cleaned = text;

  // 1. Remove excessive bold formatting - only keep bold for important headers
  // Remove bold from inline text like **Step 1:** but keep it for actual headers
  cleaned = cleaned.replace(/\*\*Step (\d+):\*\*/g, 'Step $1:');
  cleaned = cleaned.replace(/\*\*A \(/g, 'A (');
  cleaned = cleaned.replace(/\*\*B \(/g, 'B (');
  cleaned = cleaned.replace(/\*\*C \(/g, 'C (');
  cleaned = cleaned.replace(/\*\*D \(/g, 'D (');
  cleaned = cleaned.replace(/\*\*E \(/g, 'E (');
  cleaned = cleaned.replace(/\*\*Why [A-E] is/g, 'Why $& is'.replace('**', ''));

  // 2. Remove bullet points and dashes at start of lines - cleaner without them
  cleaned = cleaned.replace(/^- \*\*/gm, '');
  cleaned = cleaned.replace(/^-\*\*/gm, '');
  cleaned = cleaned.replace(/^- /gm, '');

  // 3. Simplify choice formatting - remove bold from choice labels
  cleaned = cleaned.replace(/\*\*([A-E])\./g, '$1.');
  cleaned = cleaned.replace(/\*\*([A-E]) \(/g, '$1 (');

  // 4. Clean up excessive punctuation and formatting
  cleaned = cleaned.replace(/\*\*:/g, ':');
  cleaned = cleaned.replace(/:\*\*/g, ':');

  // 5. Remove standalone asterisks
  cleaned = cleaned.replace(/\*\*\s*$/gm, '');
  cleaned = cleaned.replace(/^\s*\*\*/gm, '');

  // 6. Clean up spacing around parentheses
  cleaned = cleaned.replace(/\)\*\*/g, ')');
  cleaned = cleaned.replace(/\*\*\(/g, '(');

  // 7. Simplify "The answer is" formatting
  cleaned = cleaned.replace(/The answer is\*\*([A-E])\*\*\./g, 'The answer is $1.');
  cleaned = cleaned.replace(/\*\*The answer is ([A-E])\.\*\*/g, 'The answer is $1.');

  // 8. Remove excessive newlines (more than 2 consecutive)
  cleaned = cleaned.replace(/\n{3,}/g, '\n\n');

  // 9. Clean up step headers to be simple
  cleaned = cleaned.replace(/^##\s*Step (\d+):/gm, 'Step $1:');

  // 10. Remove bold from entire paragraphs
  const lines = cleaned.split('\n');
  const processedLines = lines.map(line => {
    // If line starts and ends with **, and it's not a short header, remove the bold
    if (line.match(/^\*\*.+\*\*$/)) {
      const content = line.replace(/^\*\*/, '').replace(/\*\*$/, '');
      // Only keep bold for very short lines (likely headers)
      if (content.length > 50) {
        return content;
      }
    }
    return line;
  });
  cleaned = processedLines.join('\n');

  // 11. Final trim
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
  const cleaned = cleanSolution(original);

  // Only update if we made changes
  if (cleaned !== original) {
    const { error: updateError } = await supabase
      .from('lesson_examples')
      .update({ answer_explanation: cleaned })
      .eq('id', example.id);

    if (updateError) {
      console.log(`  ❌ Error: ${example.title}`);
    } else {
      console.log(`  ✅ Simplified: ${example.title}`);
      updatedCount++;
    }
  }
}

console.log('\n' + '='.repeat(60));
console.log('✅ Solution Simplification Complete');
console.log('='.repeat(60));
console.log(`Updated: ${updatedCount} examples`);
