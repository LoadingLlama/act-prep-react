import { createClient } from '@supabase/supabase-js';
import dotenv from 'dotenv';

dotenv.config();

const supabase = createClient(
  process.env.REACT_APP_SUPABASE_URL,
  process.env.REACT_APP_SUPABASE_ANON_KEY
);

// Helper function to determine if text needs a period
function needsPeriod(text) {
  // Already has ending punctuation
  if (text.match(/[.!?;,]$/)) return false;

  // NO CHANGE or single word options
  if (text === 'NO CHANGE' || text.split(' ').length === 1) return false;

  // Phrases without verb (heuristic: look for common patterns)
  const phrasePhrases = ['Independent clause', 'Dependent clause', 'Phrase', 'and', 'but', 'or', 'so',
    'Missing conjunction', 'Wrong punctuation', 'No error', 'Preceded by a comma',
    'Followed by a semicolon', 'Used without commas', 'Both are complete sentences',
    'A is a phrase, B is a dependent clause', 'Both are dependent clauses',
    'Run-on sentence', 'Comma splice with unclear structure', 'Missing conjunction only'];

  if (phrasePhrases.includes(text)) return false;

  // Complete sentences - look for sentences with verbs and subjects
  // This is a simple heuristic: if it has multiple words and doesn't match the phrase list, likely needs period
  if (text.split(' ').length > 3 && !text.match(/^(NO CHANGE|and|but|or|so|for|nor|yet)/)) {
    return true;
  }

  return false;
}

async function fixQuizOptionPeriods() {
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
    if (needsPeriod(option.option_text)) {
      const newText = option.option_text + '.';

      console.log(`Updating: "${option.option_text}" → "${newText}"`);

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

  console.log(`\n✓ Updated ${updatedCount} options with missing periods`);
}

fixQuizOptionPeriods();
