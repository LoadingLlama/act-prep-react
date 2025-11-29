const { createClient } = require('@supabase/supabase-js');
require('dotenv').config();

const supabase = createClient(
  process.env.REACT_APP_SUPABASE_URL,
  process.env.REACT_APP_SUPABASE_ANON_KEY
);

async function fixSentenceStructure() {
  console.log('Adding 4th choice to sentence-structure question...\n');

  const update = {
    choices: [
      {
        letter: "A",
        text: "sport, but",
        explanation: "This choice correctly uses the comma + coordinating conjunction \"but\" to show the contrast between \"Hockey is my favorite sport\" and \"I cannot skate very well.\""
      },
      {
        letter: "B",
        text: "sport even though",
        explanation: "This choice creates a run-on sentence by placing the subordinating conjunction \"even though\" without a comma before it."
      },
      {
        letter: "C",
        text: "sport, so",
        explanation: "This choice incorrectly uses \"so\" which suggests causation when the relationship between \"my favorite sport\" and \"cannot skate well\" is actually contrast."
      },
      {
        letter: "D",
        text: "sport. Although",
        explanation: "This choice creates a sentence fragment by starting a new sentence with the subordinating conjunction \"Although\" without completing the thought."
      }
    ]
  };

  const { error } = await supabase
    .from('lesson_examples')
    .update(update)
    .eq('id', '458b63bc-3505-4f22-9884-42d3d47b3944');

  if (error) {
    console.error('✗ Error updating:', error.message);
  } else {
    console.log('✓ Successfully added 4th choice to "Fixing Comma Splices"');
  }
}

fixSentenceStructure().catch(console.error);
