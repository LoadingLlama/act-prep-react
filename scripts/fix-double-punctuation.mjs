import { createClient } from '@supabase/supabase-js';
import dotenv from 'dotenv';

dotenv.config();

const supabase = createClient(
  process.env.REACT_APP_SUPABASE_URL,
  process.env.REACT_APP_SUPABASE_ANON_KEY
);

async function fixDoublePunctuation() {
  console.log('Fetching all quiz options...\n');

  const { data: options, error } = await supabase
    .from('quiz_options')
    .select('*')
    .order('id');

  if (error) {
    console.error('Error fetching options:', error);
    return;
  }

  console.log(`Found ${options.length} total options\n`);

  let updatedCount = 0;

  for (const option of options) {
    let newText = option.option_text;

    // Remove double punctuation patterns
    newText = newText.replace(/,\.$/g, '');      // comma-period at end
    newText = newText.replace(/-\.$/g, '');      // dash-period at end
    newText = newText.replace(/—\.$/g, '');      // em-dash-period at end
    newText = newText.replace(/\.\.$/g, '.');    // double period at end

    if (newText !== option.option_text) {
      console.log(`Fixing: "${option.option_text}" → "${newText}"`);

      const { error: updateError } = await supabase
        .from('quiz_options')
        .update({ option_text: newText })
        .eq('id', option.id);

      if (updateError) {
        console.error(`Error updating option ${option.id}:`, updateError);
      } else {
        updatedCount++;
      }
    }
  }

  console.log(`\n✓ Fixed ${updatedCount} options with double punctuation`);
}

fixDoublePunctuation();
