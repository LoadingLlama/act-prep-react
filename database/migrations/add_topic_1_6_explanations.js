const { createClient } = require('@supabase/supabase-js');
require('dotenv').config();

const supabase = createClient(process.env.REACT_APP_SUPABASE_URL, process.env.SUPABASE_SERVICE_ROLE_KEY);

const LESSON_ID = 'f7ac1d6c-6416-47fd-9720-807224100517'; // Topic 1.6 - Misplaced Modifiers

async function addExplanations() {
  console.log('Adding explanations to Topic 1.6 examples...\n');

  const { data: examples } = await supabase
    .from('lesson_examples')
    .select('*')
    .eq('lesson_id', LESSON_ID)
    .in('position', [1, 2, 3, 4])
    .order('position');

  for (const example of examples) {
    let updatedChoices;

    if (example.position === 1) {
      // Basic Misplaced Modifier
      updatedChoices = [
        { ...example.choices[0], explanation: `This creates a misplaced modifier. <em>"Consistently erupting"</em> should describe what comes right after the comma, but it's followed by <em>"Jack,"</em> making it seem like Jack is erupting—which is illogical.` },
        { ...example.choices[1], explanation: `This correctly places <em>"the Old Faithful geyser"</em> immediately after <em>"Consistently erupting,"</em> making it clear that the geyser (not Jack) is what's erupting. Modifiers should be next to what they describe.` },
        { ...example.choices[2], explanation: `This still creates the same misplaced modifier problem. Placing <em>"consistently erupting"</em> between commas after <em>"Jack"</em> still incorrectly suggests Jack is erupting.` },
        { ...example.choices[3], explanation: `Changing the word order doesn't fix the problem. <em>"Erupting consistently"</em> still incorrectly modifies <em>"Jack,"</em> creating the same illogical meaning.` }
      ];
    } else if (example.position === 2) {
      // Front Modifier with Multiple Nouns
      updatedChoices = [
        { ...example.choices[0], explanation: `The opening phrase <em>"A brand new approach"</em> should describe what comes after the comma, but <em>"Henry Ford and Ford Motor Company"</em> are people, not an approach. The assembly line is the approach, not the people.` },
        { ...example.choices[1], explanation: `This still incorrectly places <em>"the Ford Motor Company"</em> after the modifier. A company isn't an <em>"approach to automobile manufacturing"</em>—the assembly line is.` },
        { ...example.choices[2], explanation: `This correctly places <em>"the first moving assembly line"</em> right after the opening modifier, making it clear that the assembly line (not the people or company) was the new approach to manufacturing.` },
        { ...example.choices[3], explanation: `This incorrectly suggests that <em>"1913"</em> (a year) was <em>"a brand new approach to automobile manufacturing."</em> A year cannot be an approach—only the assembly line can be.` }
      ];
    } else if (example.position === 3) {
      // Middle/End Modifier with "which"
      updatedChoices = [
        { ...example.choices[0], explanation: `The clause <em>"which arrived at their nesting grounds"</em> incorrectly modifies <em>"research team."</em> Research teams don't have nesting grounds—storks do. The modifier needs to clearly refer to the storks.` },
        { ...example.choices[1], explanation: `This correctly restructures the sentence so <em>"which tracked the movements"</em> describes the research team, and the phrase about arriving at nesting grounds logically refers to the storks later in the sentence.` },
        { ...example.choices[2], explanation: `While <em>"arriving"</em> creates a participial phrase, it still ambiguously modifies <em>"research team"</em> when it should refer to the storks' nesting grounds. The modifier placement remains unclear.` },
        { ...example.choices[3], explanation: `<em>"Having arrived early"</em> still incorrectly suggests the research team has nesting grounds. The modifier needs to be repositioned to clearly describe the storks, not the team.` }
      ];
    } else if (example.position === 4) {
      // Modifier without Commas
      updatedChoices = [
        { ...example.choices[0], explanation: `This is correct. <em>"Chasing the cat"</em> is a restrictive modifier (essential information) that specifies which dog ran into the street, so no commas are needed. The sentence is clear and grammatically correct.` },
        { ...example.choices[1], explanation: `Adding a comma incorrectly makes <em>"chasing the cat"</em> nonrestrictive (extra information), changing the meaning. This suggests all dogs ran into the street and happens to be chasing the cat, which isn't the intended meaning.` },
        { ...example.choices[2], explanation: `<em>"That was chasing"</em> is wordy and awkward. The original participial phrase <em>"chasing the cat"</em> is more concise and equally clear without the extra words.` },
        { ...example.choices[3], explanation: `Adding commas on both sides makes <em>"chasing the cat"</em> nonrestrictive (extra, removable information). This changes the meaning—we need this phrase to identify which specific dog ran into the street.` }
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

  console.log('\n✓ Complete! Added explanations to Topic 1.6 examples.');
}

addExplanations();
