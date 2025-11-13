const { createClient } = require('@supabase/supabase-js');
require('dotenv').config();

const supabase = createClient(process.env.REACT_APP_SUPABASE_URL, process.env.SUPABASE_SERVICE_ROLE_KEY);

const LESSON_ID = '66776383-9334-4efb-bd72-74b1bbeab8ac'; // Topic 1.3 - Advanced Punctuation

async function addExplanations() {
  console.log('Adding explanations to Topic 1.3 original examples...\n');

  // Get the first 5 examples
  const { data: examples } = await supabase
    .from('lesson_examples')
    .select('*')
    .eq('lesson_id', LESSON_ID)
    .in('position', [1, 2, 3, 4, 5])
    .order('position');

  for (const example of examples) {
    let updatedChoices;

    if (example.position === 1) {
      // Testing Semicolons Between Clauses
      updatedChoices = [
        { ...example.choices[0], explanation: 'This correctly uses a semicolon before <em>"however"</em> and a comma after it to join two independent clauses with a transitional word.' },
        { ...example.choices[1], explanation: 'A comma alone cannot join two independent clauses; this creates a comma splice.' },
        { ...example.choices[2], explanation: 'A comma is required after <em>"however"</em> when it introduces an independent clause.' },
        { ...example.choices[3], explanation: 'A semicolon or period is needed before <em>"however"</em> to properly separate the two independent clauses.' }
      ];
    } else if (example.position === 2) {
      // Colon Introducing a List
      updatedChoices = [
        { ...example.choices[0], explanation: 'A colon should not follow a verb directly. What comes before a colon must be a complete sentence.' },
        { ...example.choices[1], explanation: 'This correctly uses a colon after a complete sentence (<em>"The museum features work from several periods"</em>) to introduce the list.' },
        { ...example.choices[2], explanation: 'Adding <em>"including"</em> makes the colon unnecessary and creates wordiness.' },
        { ...example.choices[3], explanation: 'A semicolon is used to join independent clauses, not to introduce a list.' }
      ];
    } else if (example.position === 3) {
      // Pair of Dashes for Unnecessary Information
      updatedChoices = [
        { ...example.choices[0], explanation: 'This correctly uses a pair of em dashes to set off the parenthetical phrase with emphasis.' },
        { ...example.choices[1], explanation: 'Mixing a dash with a comma is inconsistent. Use matching punctuation for both sides of a parenthetical element.' },
        { ...example.choices[2], explanation: 'While commas work, dashes create more emphasis for this significant biographical detail.' },
        { ...example.choices[3], explanation: 'Parentheses would de-emphasize this important information about the author\'s prolific career.' }
      ];
    } else if (example.position === 4) {
      // Possessive vs. Plural Nouns
      updatedChoices = [
        { ...example.choices[0], explanation: 'This is possessive, showing that something belongs to the student, but the sentence simply needs a plural (multiple students).' },
        { ...example.choices[1], explanation: 'This correctly uses the simple plural form without an apostrophe to refer to multiple students.' },
        { ...example.choices[2], explanation: 'This is plural possessive, but nothing belongs to the students in this sentence.' },
        { ...example.choices[3], explanation: 'This is singular, but the sentence refers to multiple students based on the verb <em>"were."</em>' }
      ];
    } else if (example.position === 5) {
      // Quotation Marks with Spoken Dialogue
      updatedChoices = [
        { ...example.choices[0], explanation: 'This correctly places the comma inside the closing quotation mark, which is standard American English style.' },
        { ...example.choices[1], explanation: 'The comma should come before the closing quotation mark, not after.' },
        { ...example.choices[2], explanation: 'A period would end the sentence entirely, but <em>"she said"</em> continues it.' },
        { ...example.choices[3], explanation: 'A comma is needed before the dialogue tag <em>"she said"</em> to properly connect it to the quotation.' }
      ];
    }

    // Update the example
    const { error } = await supabase
      .from('lesson_examples')
      .update({ choices: updatedChoices })
      .eq('id', example.id);

    if (error) {
      console.error(`✗ Error updating example ${example.position}:`, error.message);
    } else {
      console.log(`✓ Updated example ${example.position}: ${example.title}`);
    }
  }

  console.log('\n✓ Complete! Added explanations to Topic 1.3 original examples.');
}

addExplanations();
