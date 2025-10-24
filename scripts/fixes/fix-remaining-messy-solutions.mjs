import { createClient } from '@supabase/supabase-js';

const supabase = createClient(
  'https://rabavobdklnwvwsldbix.supabase.co',
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InJhYmF2b2Jka2xud3Z3c2xkYml4Iiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc1OTc2NTQ3OCwiZXhwIjoyMDc1MzQxNDc4fQ.81SeH703keXgF3IevQlRS7OYmn1J2GUVIkn3OJiviM4'
);

console.log('🧹 Final cleanup of messy solutions...\n');

function deepCleanSolution(text) {
  if (!text) return text;

  let cleaned = text;

  // 1. Fix malformed bold patterns
  cleaned = cleaned.replace(/\*\*\s*Step/g, 'Step');
  cleaned = cleaned.replace(/\*\*-/g, '');
  cleaned = cleaned.replace(/-\*\*/g, '');

  // 2. Remove leftover double asterisks
  cleaned = cleaned.replace(/\*\*/g, '');

  // 3. Fix broken line breaks - remove single newlines within paragraphs but keep double newlines
  const lines = cleaned.split('\n');
  const processedLines = [];
  let buffer = '';

  for (let i = 0; i < lines.length; i++) {
    const line = lines[i].trim();

    if (line === '') {
      // Empty line - flush buffer and add empty line
      if (buffer) {
        processedLines.push(buffer);
        buffer = '';
      }
      processedLines.push('');
    } else if (line.match(/^(Step \d+:|Answer:|Why [A-E])/)) {
      // Header line - flush buffer first
      if (buffer) {
        processedLines.push(buffer);
        buffer = '';
      }
      processedLines.push(line);
    } else if (line.match(/^[A-E][\.\(]/)) {
      // Choice line - flush buffer first
      if (buffer) {
        processedLines.push(buffer);
        buffer = '';
      }
      processedLines.push(line);
    } else if (line.match(/^The answer is/)) {
      // Answer line - flush buffer first
      if (buffer) {
        processedLines.push(buffer);
        buffer = '';
      }
      processedLines.push(line);
    } else {
      // Regular text - add to buffer with space
      if (buffer) {
        buffer += ' ' + line;
      } else {
        buffer = line;
      }
    }
  }

  // Flush remaining buffer
  if (buffer) {
    processedLines.push(buffer);
  }

  cleaned = processedLines.join('\n');

  // 4. Remove excessive spacing again
  cleaned = cleaned.replace(/\n{3,}/g, '\n\n');

  // 5. Add proper spacing before headers
  cleaned = cleaned.replace(/\n(Step \d+:)/g, '\n\n$1');
  cleaned = cleaned.replace(/\n(Why [A-E])/g, '\n\n$1');

  // 6. Remove leading/trailing whitespace
  cleaned = cleaned.trim();

  // 7. Fix "Why **Why" duplication issue
  cleaned = cleaned.replace(/Why \*\*Why/g, 'Why');

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
  const cleaned = deepCleanSolution(original);

  if (cleaned !== original) {
    const { error: updateError } = await supabase
      .from('lesson_examples')
      .update({ answer_explanation: cleaned })
      .eq('id', example.id);

    if (updateError) {
      console.log(`  ❌ Error: ${example.title}`);
    } else {
      console.log(`  ✅ Deep cleaned: ${example.title}`);
      updatedCount++;
    }
  }
}

console.log('\n' + '='.repeat(60));
console.log('✅ Final Solution Cleanup Complete');
console.log('='.repeat(60));
console.log(`Updated: ${updatedCount} examples`);
