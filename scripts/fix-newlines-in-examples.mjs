#!/usr/bin/env node

/**
 * Fix \n\n newline characters in example problem_text
 */

import { createClient } from '@supabase/supabase-js';
import dotenv from 'dotenv';

dotenv.config();

const supabase = createClient(
  process.env.REACT_APP_SUPABASE_URL,
  process.env.SUPABASE_SERVICE_ROLE_KEY
);

async function fixNewlinesInExamples() {
  console.log('🔧 Fixing newline characters in examples...\n');

  const { data: examples } = await supabase
    .from('lesson_examples')
    .select('*');

  let totalUpdates = 0;

  for (const example of examples) {
    if (!example.problem_text) continue;

    let updatedText = example.problem_text;
    let hasChanges = false;

    // Replace literal \n\n with <br><br>
    if (updatedText.includes('\\n\\n')) {
      updatedText = updatedText.replace(/\\n\\n/g, '<br><br>');
      hasChanges = true;
    }

    // Replace literal \n with <br>
    if (updatedText.includes('\\n')) {
      updatedText = updatedText.replace(/\\n/g, '<br>');
      hasChanges = true;
    }

    // Clean up any triple or quadruple breaks
    updatedText = updatedText.replace(/<br><br><br><br>/g, '<br><br>');
    updatedText = updatedText.replace(/<br><br><br>/g, '<br><br>');

    if (hasChanges) {
      const { error } = await supabase
        .from('lesson_examples')
        .update({ problem_text: updatedText })
        .eq('id', example.id);

      if (!error) {
        totalUpdates++;
        console.log(`✅ ${totalUpdates}. Fixed "${example.title}"`);
      } else {
        console.error(`❌ Error updating ${example.title}:`, error.message);
      }
    }
  }

  console.log(`\n✅ Updated ${totalUpdates} examples`);
  console.log('All examples should now display cleanly without \\n characters');
}

fixNewlinesInExamples().then(() => process.exit(0));
