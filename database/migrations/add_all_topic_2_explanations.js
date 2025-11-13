const { createClient } = require('@supabase/supabase-js');
require('dotenv').config();

const supabase = createClient(process.env.REACT_APP_SUPABASE_URL, process.env.SUPABASE_SERVICE_ROLE_KEY);

const TOPICS = {
  '2.1': '9eef3d0e-d5a2-4104-b9a9-3e575e8e6734', // Redundancy & Wordiness
  '2.2': '04df2a09-a910-4456-8fe5-2f8e7f62c50f', // Word Choice
  '2.3': '7aae3763-017b-4762-ad5a-346aac1f027b', // Transitions
  '2.4': '29b59c9d-ef2e-4f7f-aae2-464222884d3a', // Which Choice Questions
  '2.5': '784a146b-8809-4189-a1b4-4b2fdcaf8199', // Adding or Deleting Information
  '2.6': '7dd5f9a2-c597-4d33-a0a0-e98d58075eb4'  // Logical Placement
};

// I'll process one topic at a time to keep this manageable
// Starting with Topic 2.1 - Redundancy & Wordiness

async function addTopic21Explanations() {
  console.log('Adding explanations to Topic 2.1 - Redundancy & Wordiness...\n');

  const { data: examples } = await supabase
    .from('lesson_examples')
    .select('*')
    .eq('lesson_id', TOPICS['2.1'])
    .in('position', [1, 2, 3, 4])
    .order('position');

  for (const example of examples) {
    let updatedChoices;

    if (example.position === 1) {
      // Redundancy in Context
      updatedChoices = [
        { ...example.choices[0], explanation: `<em>"Returned back"</em> is redundant. <em>"Returned"</em> already means to go back, so adding <em>"back"</em> is unnecessary repetition. Use either <em>"returned home"</em> or <em>"went back home."</em>` },
        { ...example.choices[1], explanation: `This correctly eliminates redundancy by using only <em>"returned home."</em> Since <em>"return"</em> means to go back, no additional <em>"back"</em> is needed.` },
        { ...example.choices[2], explanation: `While not redundant, <em>"came back"</em> is less precise than <em>"returned."</em> <em>"Returned"</em> specifically means going back to a previous place, making it the better choice here.` },
        { ...example.choices[3], explanation: `This keeps the redundancy problem by using <em>"returned back"</em> together, and it also omits <em>"home,"</em> leaving the destination unclear.` }
      ];
    } else if (example.position === 2) {
      // Eliminating Wordiness
      updatedChoices = [
        { ...example.choices[0], explanation: `<em>"At this point in time"</em> is unnecessarily wordy—it uses five words to say what <em>"now"</em> says in one. The ACT prefers concise, direct language.` },
        { ...example.choices[1], explanation: `This is even wordier than the original, using six words (<em>"currently at the present moment"</em>) to express a simple concept. Both <em>"currently"</em> and <em>"at the present moment"</em> mean the same thing.` },
        { ...example.choices[2], explanation: `This correctly replaces the wordy phrase with the concise <em>"now."</em> Always choose the shortest option that preserves the original meaning.` },
        { ...example.choices[3], explanation: `<em>"In the current time period"</em> is also wordy, using five words where one (<em>"now"</em>) would suffice. This adds no additional meaning or clarity.` }
      ];
    } else if (example.position === 3) {
      // Removing Irrelevant Information
      updatedChoices = [
        { ...example.choices[0], explanation: `This historical fact about 1896 is completely irrelevant to the narrative about a specific runner winning a race. It interrupts the flow without adding value to the story being told.` },
        { ...example.choices[1], explanation: `The marathon distance is also irrelevant to this specific moment of the runner crossing the finish line and the crowd's reaction. This fact doesn't connect to the narrative.` },
        { ...example.choices[2], explanation: `While this mentions training, it shifts focus away from the immediate moment being described. The paragraph is about the finish, not preparation. Though better than A or B, it still interrupts the flow.` },
        { ...example.choices[3], explanation: `This correctly deletes the irrelevant sentence. The paragraph flows naturally from finishing first to the crowd's reaction without the interrupting historical fact.` }
      ];
    } else if (example.position === 4) {
      // Identifying Question Type
      updatedChoices = [
        { ...example.choices[0], explanation: `<em>"For local dog shelters"</em> is redundant because <em>"Walk for Wags"</em> (a play on "dogs") already implies it's for dogs/shelters. The context makes this information unnecessary.` },
        { ...example.choices[1], explanation: `This is the least redundant option. <em>"This year"</em> provides useful temporal information that isn't implied elsewhere in the sentence. The event name and amount raised don't tell us when it happened.` },
        { ...example.choices[2], explanation: `Keeping only <em>"for local dog shelters"</em> is redundant for the same reason as Choice A—the event name <em>"Walk for Wags"</em> already indicates it's dog-related.` },
        { ...example.choices[3], explanation: `<em>"In July"</em> is redundant because <em>"July 4th"</em> already appears in the event name, making it unnecessary to repeat the month.` }
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

  console.log('\n✓ Complete! Added explanations to Topic 2.1 examples.');
}

addTopic21Explanations();
