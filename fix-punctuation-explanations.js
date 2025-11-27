const { createClient } = require('@supabase/supabase-js');
const supabase = createClient('https://rabavobdklnwvwsldbix.supabase.co', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InJhYmF2b2Jka2xud3Z3c2xkYml4Iiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc1OTc2NTQ3OCwiZXhwIjoyMDc1MzQxNDc4fQ.81SeH703keXgF3IevQlRS7OYmn1J2GUVIkn3OJiviM4');

const specificExplanations = {
  1: { // "Strawberries are...grow; however, the ones in my garden die..."
    A: "Correct. The semicolon properly joins two independent clauses ('Strawberries are supposed to be easy to grow' and 'the ones in my garden die every year'), and the comma after 'however' correctly separates the transitional word from the rest of the clause.",
    B: "Incorrect. A comma alone cannot join two independent clauses - using just a comma before 'however' creates a comma splice. Two complete sentences need a semicolon (or period) before transitional words like 'however'.",
    C: "Incorrect. While the semicolon before 'however' is correct for joining independent clauses, the transitional word 'however' needs a comma after it to separate it from the main clause ('the ones in my garden die every year') - without this comma, the sentence reads awkwardly.",
    D: "Incorrect. Using just a comma before 'however' creates a comma splice - two independent clauses cannot be joined with only a comma, even when using a transitional word. This needs a semicolon or period before 'however', plus a comma after it."
  },
  2: { // "...three simple steps paddle hard, stand up, and ride..."
    A: "Incorrect. There's no punctuation between 'steps' and 'paddle', creating a run-on - the word 'paddle' starts a list explaining the three steps, which needs a colon after 'steps' to introduce it.",
    B: "Correct. The colon after 'steps' properly introduces the list that explains what the three steps are: 'paddle hard, stand up, and ride the wave' - colons are used after complete clauses to introduce lists, explanations, or elaborations.",
    C: "Incorrect. You cannot use a colon after an incomplete clause - 'steps, including:' is incomplete because the preposition 'including' requires an object. Remove 'including' and just use the colon: 'steps: paddle'.",
    D: "Incorrect. Running 'steps paddle' together with no punctuation creates confusion - readers need a colon after 'steps' to signal that what follows is the list explaining the three steps mentioned."
  },
  3: { // "All of Tommy's favorite toys, his toy cars, his marbles...were lost"
    A: "Incorrect. Starting with a comma creates mismatched punctuation - the list 'his toy cars, his marbles, and his Legos' is set off with a dash at the end but only a comma at the beginning. Both sides need dashes for symmetry.",
    B: "Correct. The pair of dashes properly sets off the parenthetical list 'his toy cars, his marbles, and his Legos' - using dashes on both sides (before 'his toy cars' and after 'Legos') creates balanced punctuation around the interrupting information.",
    C: "Incorrect. Without any punctuation before 'his toy cars', the sentence runs together confusingly - the list needs to be set off from the main sentence 'All of Tommy's favorite toys were lost' with punctuation on both sides, and the closing dash requires an opening dash.",
    D: "Incorrect. A colon cannot have a matching dash - colons introduce what follows but aren't used in pairs. The interrupting list needs matching punctuation (a dash at the beginning to match the dash at the end), not mismatched marks."
  },
  4: { // "...enthralled with pro soccer player's and their signature moves"
    A: "Incorrect. 'Player's' is possessive (meaning something belonging to one player), but Raheem is interested in multiple players, not something one player owns - the plural 'players' is needed here, not the possessive 'player's'.",
    B: "Incorrect. 'Players'' is plural possessive (meaning something belonging to multiple players), but the sentence isn't about something the players own - it's about the players themselves and their moves, requiring the simple plural 'players'.",
    C: "Correct. 'Players' is the simple plural form - Raheem became enthralled with the players (multiple people) and their signature moves. No apostrophe is needed because we're not showing possession, just referring to multiple players.",
    D: "Incorrect. 'Players'' is plural possessive, but this would mean something belonging to the players - however, 'and their signature moves' comes next, already showing possession with 'their', so 'players' shouldn't also be possessive."
  },
  5: { // "...said to herself, "who would buy..."
    A: "Correct. The comma after 'herself' properly introduces the spoken dialogue, and the opening quotation mark signals the start of the direct quote - this is standard punctuation for introducing what someone said or thought.",
    B: "Incorrect. The text appears identical to choice A, but if there is a difference it would be in capitalization or spacing - choice A follows the correct standard format with a comma before the quotation mark.",
    C: "Incorrect. Missing the comma after 'herself' - when introducing dialogue with phrases like 'she said' or 'he thought', you need a comma before the opening quotation mark to separate the speaker tag from the dialogue.",
    D: "Incorrect. Missing the comma after 'herself' - dialogue must be introduced with a comma after the speaker tag ('said to herself') and before the opening quotation mark, otherwise the sentence runs together without proper separation."
  }
};

async function fixPunctuationExplanations() {
  console.log('Fixing punctuation lesson generic explanations...\n');
  console.log('='.repeat(80));

  const { data: lesson } = await supabase.from('lessons').select('id').eq('lesson_key', 'punctuation').single();

  let updatedCount = 0;

  for (const pos of [1, 2, 3, 4, 5]) {
    const { data: q } = await supabase.from('lesson_examples').select('*').eq('lesson_id', lesson.id).eq('position', pos).single();

    const newExplanations = specificExplanations[pos];
    const updatedChoices = q.choices.map(choice => ({
      ...choice,
      explanation: newExplanations[choice.letter]
    }));

    const { error } = await supabase.from('lesson_examples').update({ choices: updatedChoices }).eq('id', q.id);

    if (error) {
      console.log(`✗ Failed to update position ${pos}: ${error.message}`);
    } else {
      console.log(`✓ Updated position ${pos}: ${q.title}`);
      updatedCount++;
    }
  }

  console.log('\n' + '='.repeat(80));
  console.log(`✓ Successfully updated ${updatedCount}/5 punctuation questions with specific explanations`);
  console.log('='.repeat(80));
}

fixPunctuationExplanations();
