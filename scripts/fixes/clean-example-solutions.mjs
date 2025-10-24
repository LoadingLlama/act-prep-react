import { createClient } from '@supabase/supabase-js';

const supabase = createClient(
  'https://rabavobdklnwvwsldbix.supabase.co',
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InJhYmF2b2Jka2xud3Z3c2xkYml4Iiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc1OTc2NTQ3OCwiZXhwIjoyMDc1MzQxNDc4fQ.81SeH703keXgF3IevQlRS7OYmn1J2GUVIkn3OJiviM4'
);

console.log('🧹 Cleaning up example solution formatting...\n');

// Get all examples
const { data: examples, error } = await supabase
  .from('lesson_examples')
  .select('*');

if (error) {
  console.error('Error fetching examples:', error);
  process.exit(1);
}

console.log(`Found ${examples.length} examples\n`);

let updatedCount = 0;
let skippedCount = 0;

for (const example of examples) {
  if (!example.answer_explanation) {
    skippedCount++;
    continue;
  }

  let original = example.answer_explanation;
  let cleaned = original;

  // Track if we made any changes
  let changed = false;

  // 1. Replace literal \n with actual newlines
  if (cleaned.includes('\\n')) {
    cleaned = cleaned.replace(/\\n/g, '\n');
    changed = true;
  }

  // 2. Remove excessive spacing (more than 2 consecutive newlines)
  const beforeSpacing = cleaned;
  cleaned = cleaned.replace(/\n{3,}/g, '\n\n');
  if (cleaned !== beforeSpacing) changed = true;

  // 3. Ensure proper spacing around "Step X:" headers
  const beforeStepSpacing = cleaned;
  cleaned = cleaned.replace(/\n?(Step \d+:)/g, '\n\n$1');
  cleaned = cleaned.replace(/^(Step \d+:)/, '$1'); // Remove leading newline from first step
  if (cleaned !== beforeStepSpacing) changed = true;

  // 4. Clean up spacing around bold markdown
  const beforeBold = cleaned;
  cleaned = cleaned.replace(/\*\*\s+/g, '**');
  cleaned = cleaned.replace(/\s+\*\*/g, '**');
  if (cleaned !== beforeBold) changed = true;

  // 5. Remove trailing whitespace from lines
  const beforeTrim = cleaned;
  cleaned = cleaned.split('\n').map(line => line.trimEnd()).join('\n');
  if (cleaned !== beforeTrim) changed = true;

  // 6. Trim overall string
  cleaned = cleaned.trim();

  // Only update if we made changes
  if (changed && cleaned !== original) {
    const { error: updateError } = await supabase
      .from('lesson_examples')
      .update({ answer_explanation: cleaned })
      .eq('id', example.id);

    if (updateError) {
      console.log(`  ❌ Error updating "${example.title}": ${updateError.message}`);
    } else {
      console.log(`  ✅ Cleaned "${example.title}"`);
      updatedCount++;
    }
  } else {
    skippedCount++;
  }
}

console.log('\n' + '='.repeat(60));
console.log('✅ Solution Formatting Cleanup Complete');
console.log('='.repeat(60));
console.log(`Updated: ${updatedCount} examples`);
console.log(`Skipped: ${skippedCount} examples (no changes needed)`);
