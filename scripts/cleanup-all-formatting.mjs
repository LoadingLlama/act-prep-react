/**
 * Apply general formatting cleanup rules to all examples
 */

import { createClient } from '@supabase/supabase-js';
import dotenv from 'dotenv';

dotenv.config();

const supabase = createClient(
  process.env.REACT_APP_SUPABASE_URL,
  process.env.SUPABASE_SERVICE_ROLE_KEY
);

function cleanExplanation(text) {
  if (!text) return text;

  let cleaned = text;

  // Remove verbose introductions
  cleaned = cleaned.replace(/^This is a classic .*? question[.,]\s*/i, '');
  cleaned = cleaned.replace(/^This tests? .*?\.\s*/i, '');
  cleaned = cleaned.replace(/^This sentence .*?\.\s*/i, '');

  // Fix missing line breaks after "Step X:"
  cleaned = cleaned.replace(/(Step \d+:)([A-Z])/g, '$1\n$2');

  // Fix missing line breaks after question text
  cleaned = cleaned.replace(/(identify the problem)(The )/g, '$1\n$2');
  cleaned = cleaned.replace(/(Find the split point)(The )/g, '$1\n$2');

  // Standardize choice formatting - remove weird markers like "Fragment! -"
  cleaned = cleaned.replace(/Fragment!\s*-/g, '✗');
  cleaned = cleaned.replace(/Incorrect!\s*$/gm, '✗');
  cleaned = cleaned.replace(/Correct!\s*$/gm, '✓');

  // Remove overly verbose transition phrases
  cleaned = cleaned.replace(/Let's test different options:/gi, 'Test the choices:');
  cleaned = cleaned.replace(/Let me reconsider\.\.\./gi, '');
  cleaned = cleaned.replace(/Actually, looking more carefully:/gi, '');
  cleaned = cleaned.replace(/Wait! /gi, '');

  // Remove unnecessary "Why X is correct:" sections
  cleaned = cleaned.replace(/Why [A-E] is is correct:/gi, '');

  // Clean up multiple blank lines
  cleaned = cleaned.replace(/\n{3,}/g, '\n\n');

  // Trim whitespace
  cleaned = cleaned.trim();

  return cleaned;
}

async function cleanupAllFormatting() {
  console.log('🧹 Applying formatting cleanup to all examples...\n');

  const { data: examples, error: fetchError } = await supabase
    .from('lesson_examples')
    .select('id, answer_explanation');

  if (fetchError) {
    console.error('Error fetching examples:', fetchError);
    return;
  }

  console.log(`Processing ${examples.length} examples...\n`);

  let successCount = 0;
  let errorCount = 0;
  let unchangedCount = 0;

  for (const example of examples) {
    const original = example.answer_explanation || '';
    const cleaned = cleanExplanation(original);

    // Only update if something changed
    if (cleaned !== original) {
      try {
        const { error } = await supabase
          .from('lesson_examples')
          .update({ answer_explanation: cleaned })
          .eq('id', example.id);

        if (error) {
          console.error(`❌ Error updating ${example.id.substring(0, 8)}:`, error);
          errorCount++;
        } else {
          console.log(`✅ Cleaned ${example.id.substring(0, 8)}... (${original.length} → ${cleaned.length} chars)`);
          successCount++;
        }
      } catch (err) {
        console.error(`❌ Exception updating ${example.id}:`, err);
        errorCount++;
      }
    } else {
      unchangedCount++;
    }
  }

  console.log('\n' + '='.repeat(80));
  console.log(`📊 SUMMARY:`);
  console.log(`   ✅ Cleaned and updated: ${successCount} examples`);
  console.log(`   ⏭️  No changes needed: ${unchangedCount} examples`);
  console.log(`   ❌ Errors: ${errorCount} examples`);
  console.log('='.repeat(80));
}

cleanupAllFormatting().then(() => {
  console.log('\n✅ Cleanup complete!');
  process.exit(0);
}).catch(err => {
  console.error('❌ Error:', err);
  process.exit(1);
});
