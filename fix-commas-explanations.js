const { createClient } = require('@supabase/supabase-js');
const supabase = createClient('https://rabavobdklnwvwsldbix.supabase.co', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InJhYmF2b2Jka2xud3Z3c2xkYml4Iiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc1OTc2NTQ3OCwiZXhwIjoyMDc1MzQxNDc4fQ.81SeH703keXgF3IevQlRS7OYmn1J2GUVIkn3OJiviM4');

const specificExplanations = {
  1: { // "The debate team took first place in California, and then won..."
    A: "Incorrect. This places a comma before 'and then' creating a pause in a compound predicate where the subject 'debate team' performs two actions ('took first place' and 'won the grand prize') - compound predicates with one subject don't need commas before coordinating conjunctions.",
    B: "Incorrect. Adding 'it' creates a second independent clause, but this is unnecessary because we already have the subject 'debate team' - this creates redundancy and awkward phrasing ('and then it won').",
    C: "Correct. Removes the comma because this is a compound predicate: one subject ('the debate team') performing two actions ('took first place in California' and 'won the grand prize') - no comma is needed between compound verbs sharing the same subject.",
    D: "Incorrect. 'Yet' implies contrast or surprise, but there's no contrast between taking first place in California and winning the grand prize nationally - these are sequential achievements building on each other, not opposing ideas, plus 'it' adds unnecessary redundancy."
  },
  2: { // "Mr. Alvin a very popular teacher among the students cancelled..."
    A: "Incorrect. The phrase 'a very popular teacher among the students' is non-essential information about Mr. Alvin - it needs commas on BOTH sides to set it off from the main sentence ('Mr. Alvin cancelled the final exam').",
    B: "Incorrect. While this places commas on both sides of the non-essential phrase, the second comma is in the wrong position - it should come after 'students' (the end of the phrase), not after 'popular' (in the middle of the phrase).",
    C: "Incorrect. Non-essential phrases need commas on both sides - this only has one comma after 'popular', leaving the phrase improperly punctuated and creating a run-on between 'students' and 'cancelled'.",
    D: "Correct. Places commas on both sides of the non-essential phrase 'a very popular teacher among the students' - this properly sets off the extra information about Mr. Alvin from the main sentence ('Mr. Alvin cancelled the final exam')."
  },
  3: { // "I expected...boots; however, I found a sale..."
    A: "Correct. The semicolon joins two independent clauses ('I expected to pay over $100' and 'I found a sale'), and the comma after the transitional word 'however' properly separates it from the rest of the second clause.",
    B: "Incorrect. A comma alone cannot join two independent clauses - this creates a comma splice. The two complete sentences need a semicolon before 'however' (or a period, or a comma with a FANBOYS conjunction).",
    C: "Incorrect. While 'however' can begin a sentence with just a comma after it, using only a comma before 'however' creates a comma splice - two independent clauses need a semicolon, not a comma, before transitional words like 'however'.",
    D: "Incorrect. When 'however' is used as a transitional word between two independent clauses (not just meaning 'in whatever way'), it needs a comma after it to separate it from the rest of the clause - without this comma, the sentence reads awkwardly."
  },
  4: { // "Electric vehicles, thousands of them, already on the road..."
    A: "Incorrect. The phrase 'thousands of them' is parenthetical information about 'electric vehicles' - but with commas on both sides, combined with another phrase 'already on the road in America' (also set off by commas), the sentence becomes confusing with too many interruptions before reaching the verb 'are'.",
    B: "Incorrect. This places the second comma after 'thousands' instead of after 'them', cutting the phrase in half - 'thousands, of them' is incorrectly punctuated, and the meaning becomes unclear.",
    C: "Correct. Removing the commas makes 'thousands of them' essential to identify WHICH electric vehicles we're discussing - the sentence flows better with just one parenthetical phrase ('already on the road in America') rather than two nested interruptions.",
    D: "Incorrect. Placing a comma between 'of' and 'them' breaks up the prepositional phrase 'of them' incorrectly - prepositional phrases should not have internal commas, and this creates awkward, unclear punctuation."
  },
  6: { // "The museum opens at 9 AM but the special exhibit doesn't start..."
    A: "Incorrect. This creates a run-on sentence - two independent clauses ('The museum opens at 9 AM' and 'the special exhibit doesn't start until noon') joined by the FANBOYS conjunction 'but' require a comma before 'but'.",
    B: "Correct. Places a comma before 'but' to properly join two independent clauses - both 'The museum opens at 9 AM' and 'the special exhibit doesn't start until noon' can stand alone as complete sentences, so a comma is required before the coordinating conjunction.",
    C: "Incorrect. A semicolon before 'but' is incorrect - semicolons are used to join independent clauses WITHOUT conjunctions, or with transitional words like 'however'. When using FANBOYS conjunctions ('but', 'and', 'or'), use a comma, not a semicolon.",
    D: "Incorrect. 'And but' is not a valid conjunction - you cannot combine two FANBOYS conjunctions together. This creates ungrammatical phrasing that doesn't follow standard English conventions."
  }
};

async function fixCommasExplanations() {
  console.log('Fixing commas lesson generic explanations...\n');
  console.log('='.repeat(80));

  const { data: lesson } = await supabase.from('lessons').select('id').eq('lesson_key', 'commas').single();

  let updatedCount = 0;

  for (const pos of [1, 2, 3, 4, 6]) {
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
  console.log(`✓ Successfully updated ${updatedCount}/5 commas questions with specific explanations`);
  console.log('='.repeat(80));
}

fixCommasExplanations();
