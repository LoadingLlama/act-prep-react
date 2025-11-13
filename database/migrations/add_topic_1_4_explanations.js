const { createClient } = require('@supabase/supabase-js');
require('dotenv').config();

const supabase = createClient(process.env.REACT_APP_SUPABASE_URL, process.env.SUPABASE_SERVICE_ROLE_KEY);

const LESSON_ID = '10fff941-59e1-4d3a-84b7-d0fe8f9985ef'; // Topic 1.4 - Verbs

async function addExplanations() {
  console.log('Adding explanations to Topic 1.4 examples...\n');

  // Get all 4 examples
  const { data: examples } = await supabase
    .from('lesson_examples')
    .select('*')
    .eq('lesson_id', LESSON_ID)
    .in('position', [1, 2, 3, 4])
    .order('position');

  for (const example of examples) {
    let updatedChoices;

    if (example.position === 1) {
      // Subject-Verb Agreement with Prepositional Phrases
      updatedChoices = [
        { ...example.choices[0], explanation: `The base form <em>"groom"</em> is only correct with plural subjects. Here, the subject is <em>"stable hand"</em> (singular), not <em>"owners,"</em> which is part of a prepositional phrase.` },
        { ...example.choices[1], explanation: `This correctly uses the singular verb <em>"grooms"</em> to agree with the singular subject <em>"stable hand."</em> The phrase <em>"hired by the farm owners"</em> is descriptive and doesn't affect subject-verb agreement.` },
        { ...example.choices[2], explanation: `This plural verb form doesn't agree with the singular subject <em>"stable hand."</em> Don't be fooled by <em>"owners"</em> in the middle—it's part of a descriptive phrase.` },
        { ...example.choices[3], explanation: `This plural verb form doesn't agree with the singular subject <em>"stable hand."</em> The progressive tense is also unnecessary here.` }
      ];
    } else if (example.position === 2) {
      // Verb Tense Matching Context
      updatedChoices = [
        { ...example.choices[0], explanation: `Present tense <em>"causes"</em> doesn't match the past tense context. The sentence uses <em>"delayed"</em> (past tense) to describe a completed event.` },
        { ...example.choices[1], explanation: `This correctly uses past tense <em>"caused"</em> to match <em>"delayed."</em> Both verbs describe actions that happened in the past and must use the same tense.` },
        { ...example.choices[2], explanation: `Future tense <em>"will cause"</em> doesn't match the past tense context established by <em>"delayed."</em> The accident already happened.` },
        { ...example.choices[3], explanation: `Present perfect <em>"has caused"</em> emphasizes ongoing effects, but the sentence simply describes two past actions that happened together, requiring simple past tense.` }
      ];
    } else if (example.position === 3) {
      // Irregular Verbs - "a" vs. "u" Rule
      updatedChoices = [
        { ...example.choices[0], explanation: `<em>"Swam"</em> is the simple past form (e.g., <em>"I swam yesterday"</em>). With <em>"had"</em> (past perfect), you need the past participle, which uses <em>"u"</em> instead of <em>"a."</em>` },
        { ...example.choices[1], explanation: `This correctly uses the past participle <em>"swum"</em> after <em>"had."</em> The <em>"a"</em> vs. <em>"u"</em> rule: simple past uses <em>"a"</em> (swam), past participle uses <em>"u"</em> (swum).` },
        { ...example.choices[2], explanation: `The present participle <em>"swimming"</em> would require a helping verb like <em>"was"</em> or <em>"been,"</em> not <em>"had."</em>` },
        { ...example.choices[3], explanation: `Present tense <em>"swims"</em> doesn't work with <em>"had,"</em> which requires a past participle to form the past perfect tense.` }
      ];
    } else if (example.position === 4) {
      // Identifying Subject-Verb Agreement vs. Tense Questions
      updatedChoices = [
        { ...example.choices[0], explanation: `<em>"Has"</em> correctly agrees with the singular subject <em>"row."</em> Though <em>"townhouses"</em> appears right before the verb, it's part of the prepositional phrase <em>"of the townhouses,"</em> not the subject.` },
        { ...example.choices[1], explanation: `The gerund <em>"having"</em> cannot function as the main verb of the sentence. It would need a helping verb to be grammatically correct.` },
        { ...example.choices[2], explanation: `Plural <em>"have"</em> doesn't agree with the singular subject <em>"row."</em> This is a common trap—the plural noun closest to the verb isn't always the subject.` },
        { ...example.choices[3], explanation: `The conditional <em>"would have"</em> is unnecessary here. The sentence states a fact about the present, not a hypothetical situation.` }
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

  console.log('\n✓ Complete! Added explanations to Topic 1.4 examples.');
}

addExplanations();
