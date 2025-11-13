const { createClient } = require('@supabase/supabase-js');
require('dotenv').config();

const supabase = createClient(process.env.REACT_APP_SUPABASE_URL, process.env.SUPABASE_SERVICE_ROLE_KEY);

const LESSON_ID = 'e6153221-e330-4db4-8cc7-9c5a1d51a301'; // Topic 1.7 - Parallel Structure

async function addExplanations() {
  console.log('Adding explanations to Topic 1.7 examples...\n');

  const { data: examples } = await supabase
    .from('lesson_examples')
    .select('*')
    .eq('lesson_id', LESSON_ID)
    .in('position', [1, 2, 3, 4])
    .order('position');

  for (const example of examples) {
    let updatedChoices;

    if (example.position === 1) {
      // Basic List Parallelism
      updatedChoices = [
        { ...example.choices[0], explanation: `<em>"Cleaning the shelves"</em> breaks parallel structure. The list contains <em>"made"</em> (past tense) and <em>"swept"</em> (past tense), so the middle item needs to match: <em>"cleaned"</em> (past tense), not <em>"cleaning"</em> (gerund).` },
        { ...example.choices[1], explanation: `This correctly maintains parallel structure by using three past tense verbs in the list: <em>"made,"</em> <em>"cleaned,"</em> and <em>"swept."</em> All items in a list must use the same grammatical form.` },
        { ...example.choices[2], explanation: `Adding <em>"she"</em> before <em>"cleaned"</em> breaks parallelism. The first and third items don't include the subject (<em>"she made"</em> and <em>"swept"</em>), so the middle item shouldn't either.` },
        { ...example.choices[3], explanation: `<em>"Was cleaning"</em> uses progressive tense while the other verbs (<em>"made"</em> and <em>"swept"</em>) use simple past. All three verbs in the list must have the same tense and form.` }
      ];
    } else if (example.position === 2) {
      // Two-Item List Comparison
      updatedChoices = [
        { ...example.choices[0], explanation: `This mixes verb forms: <em>"get"</em> (infinitive without "to") and <em>"paying"</em> (gerund). In <em>"would rather...than"</em> constructions, both sides must use the same form—either both infinitives or both gerunds.` },
        { ...example.choices[1], explanation: `This correctly uses parallel infinitives: <em>"get"</em> (implied infinitive after "would rather") is balanced with <em>"to pay"</em> (infinitive). Both sides of the comparison now use infinitive forms.` },
        { ...example.choices[2], explanation: `While this maintains parallel structure using two gerunds (<em>"getting"</em> and <em>"paying"</em>), it doesn't work with <em>"would rather,"</em> which requires infinitive forms, not gerunds.` },
        { ...example.choices[3], explanation: `Using <em>"to get"</em> creates redundancy with <em>"would rather,"</em> which already implies the infinitive. The construction is <em>"would rather [verb]...than [verb],"</em> not <em>"would rather to [verb]."</em>` }
      ];
    } else if (example.position === 3) {
      // Not Only/But Also
      updatedChoices = [
        { ...example.choices[0], explanation: `Adding <em>"she"</em> after <em>"but also"</em> breaks parallel structure. After <em>"not only,"</em> there's no pronoun before <em>"took,"</em> so <em>"but also"</em> should directly precede <em>"locked"</em> without a pronoun.` },
        { ...example.choices[1], explanation: `This correctly maintains parallel structure: <em>"not only took...but also locked."</em> Both verbs appear in the same position relative to their conjunctions, creating balanced, parallel phrasing.` },
        { ...example.choices[2], explanation: `Placing <em>"she"</em> before <em>"also"</em> still breaks parallelism. The structure after <em>"not only"</em> is simply the verb <em>"took,"</em> so the structure after <em>"but also"</em> should be simply the verb <em>"locked."</em>` },
        { ...example.choices[3], explanation: `<em>"Was also locking"</em> uses progressive tense while <em>"took"</em> uses simple past. The verb forms must match in <em>"not only...but also"</em> constructions to maintain parallelism.` }
      ];
    } else if (example.position === 4) {
      // Both/And Structure
      updatedChoices = [
        { ...example.choices[0], explanation: `This mixes a noun (<em>"a scholar"</em>) with an adjective phrase (<em>"quite athletic"</em>). In <em>"both...and"</em> constructions, the two elements must be the same grammatical type—both nouns or both adjectives.` },
        { ...example.choices[1], explanation: `This correctly uses two parallel nouns: <em>"a scholar"</em> and <em>"an athlete."</em> Both elements in the <em>"both...and"</em> structure are now nouns with articles, creating perfect parallel structure.` },
        { ...example.choices[2], explanation: `While this uses two adjectives (<em>"scholarly"</em> and <em>"athletic"</em>) which creates parallelism, <em>"quite athletic"</em> includes the modifier <em>"quite"</em> while <em>"scholarly"</em> has no modifier, creating slight imbalance.` },
        { ...example.choices[3], explanation: `Removing <em>"Both"</em> eliminates the parallel construction entirely and keeps the problematic mixing of a noun (<em>"scholar"</em>) with an adjective phrase (<em>"quite athletic"</em>).` }
      ];
    }

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

  console.log('\n✓ Complete! Added explanations to Topic 1.7 examples.');
}

addExplanations();
