const { createClient } = require('@supabase/supabase-js');
require('dotenv').config();

const supabase = createClient(process.env.REACT_APP_SUPABASE_URL, process.env.SUPABASE_SERVICE_ROLE_KEY);

const LESSON_ID = '3c3585a1-f137-4331-8390-29ef1f5e889f'; // Topic 1.5 - Pronouns

async function addExplanations() {
  console.log('Adding explanations to Topic 1.5 examples...\n');

  const { data: examples } = await supabase
    .from('lesson_examples')
    .select('*')
    .eq('lesson_id', LESSON_ID)
    .in('position', [1, 2, 3, 4])
    .order('position');

  for (const example of examples) {
    let updatedChoices;

    if (example.position === 1) {
      // Who vs. Whom in Descriptive Phrases
      updatedChoices = [
        { ...example.choices[0], explanation: `<em>"Who"</em> is correct because it's the subject of the verb <em>"opened"</em> in the relative clause. The florists are performing the action, so we use <em>"who"</em> (subject form) rather than <em>"whom"</em> (object form).` },
        { ...example.choices[1], explanation: `<em>"Whom"</em> is the object form, used when the pronoun receives the action. Here, the florists are performing the action of opening, so we need the subject form <em>"who."</em>` },
        { ...example.choices[2], explanation: `<em>"Which"</em> is used for things or animals, not people. Since we're referring to florists (people), we need <em>"who."</em>` },
        { ...example.choices[3], explanation: `While <em>"that"</em> can refer to people in some contexts, <em>"who"</em> is more appropriate and precise when referring to specific people performing an action.` }
      ];
    } else if (example.position === 2) {
      // Possessive Pronouns with Group Nouns
      updatedChoices = [
        { ...example.choices[0], explanation: `<em>"Their"</em> is plural, but <em>"team"</em> acts as a single unit here. When a collective noun performs one action together (picking up one trophy), treat it as singular and use <em>"its."</em>` },
        { ...example.choices[1], explanation: `This correctly uses the singular possessive <em>"its"</em> to match the collective noun <em>"team."</em> The team is acting as one unit, not as individual members, so singular agreement is needed.` },
        { ...example.choices[2], explanation: `<em>"It's"</em> is a contraction meaning <em>"it is"</em> or <em>"it has,"</em> not a possessive pronoun. We need the possessive form <em>"its"</em> (no apostrophe).` },
        { ...example.choices[3], explanation: `<em>"There"</em> indicates location or existence, not possession. We need a possessive pronoun to show the trophy belongs to the team.` }
      ];
    } else if (example.position === 3) {
      // Pronoun Agreement with Singular Antecedents
      updatedChoices = [
        { ...example.choices[0], explanation: `<em>"Their"</em> is plural, but the antecedent is <em>"each member,"</em> which is grammatically singular. <em>"Each"</em> treats members individually, requiring a singular pronoun.` },
        { ...example.choices[1], explanation: `This correctly uses the singular feminine pronoun <em>"her"</em> to agree with <em>"each member."</em> Since it's the women's track team, <em>"her"</em> is appropriate and agrees with the singular <em>"each."</em>` },
        { ...example.choices[2], explanation: `<em>"His or her"</em> is unnecessarily wordy when the context clearly identifies the gender. Since it's the women's track team, <em>"her"</em> alone is sufficient and more concise.` },
        { ...example.choices[3], explanation: `<em>"Its"</em> is used for things or animals, not people. We need a personal pronoun (<em>"her"</em>) to refer to human team members.` }
      ];
    } else if (example.position === 4) {
      // Ambiguous Pronouns
      updatedChoices = [
        { ...example.choices[0], explanation: `<em>"He"</em> is ambiguous because both <em>"owner"</em> and <em>"customer"</em> could be male. The reader cannot tell who is smiling, making this pronoun reference unclear.` },
        { ...example.choices[1], explanation: `This correctly replaces the ambiguous pronoun <em>"he"</em> with the specific noun <em>"the owner,"</em> making it clear who is performing the action of smiling.` },
        { ...example.choices[2], explanation: `<em>"They"</em> is plural and doesn't make sense in this context. We're referring to a single person (either the owner or the customer), so we need a singular form.` },
        { ...example.choices[3], explanation: `While this removes ambiguity, the context suggests the owner is the one who always smiles when greeting customers, not the customer. <em>"The owner"</em> makes more logical sense.` }
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

  console.log('\n✓ Complete! Added explanations to Topic 1.5 examples.');
}

addExplanations();
