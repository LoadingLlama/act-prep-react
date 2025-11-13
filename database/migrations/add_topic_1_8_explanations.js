const { createClient } = require('@supabase/supabase-js');
require('dotenv').config();

const supabase = createClient(process.env.REACT_APP_SUPABASE_URL, process.env.SUPABASE_SERVICE_ROLE_KEY);

const LESSON_ID = '4a9e06f8-5ee5-4e5d-9e5d-2ce9b7c6bf16'; // Topic 1.8 - Miscellaneous Topics

async function addExplanations() {
  console.log('Adding explanations to Topic 1.8 examples...\n');

  const { data: examples } = await supabase
    .from('lesson_examples')
    .select('*')
    .eq('lesson_id', LESSON_ID)
    .in('position', [1, 2, 3, 4, 5, 6])
    .order('position');

  for (const example of examples) {
    let updatedChoices;

    if (example.position === 1) {
      // Affect vs. Effect
      updatedChoices = [
        { ...example.choices[0], explanation: `This correctly uses <em>"affects"</em> as a verb meaning <em>"influences"</em> or <em>"has an impact on."</em> The sentence describes how connectivity influences mental health, requiring the verb form.` },
        { ...example.choices[1], explanation: `<em>"Effects"</em> is primarily a noun meaning <em>"results"</em> or <em>"consequences."</em> Here we need a verb to describe the action of influencing, not a noun.` },
        { ...example.choices[2], explanation: `<em>"Affect"</em> as a noun is a psychology term meaning emotional expression, not the impact we're discussing here. This phrase is incorrect in this context.` },
        { ...example.choices[3], explanation: `<em>"Effecting"</em> means <em>"bringing about"</em> or <em>"causing to exist."</em> We need <em>"affecting"</em> (influencing), not <em>"effecting"</em> (creating).` }
      ];
    } else if (example.position === 2) {
      // Than vs. Then
      updatedChoices = [
        { ...example.choices[0], explanation: `This correctly uses <em>"than"</em> for making a comparison. <em>"More...than"</em> is the proper construction when comparing two things—here, practice versus natural talent.` },
        { ...example.choices[1], explanation: `<em>"Then"</em> relates to time or sequence (<em>"first this, then that"</em>). We're making a comparison, not describing a sequence, so we need <em>"than,"</em> not <em>"then."</em>` },
        { ...example.choices[2], explanation: `This wordy phrase changes the meaning and creates awkward phrasing. The concise <em>"more...than"</em> construction is clearer and more direct.` },
        { ...example.choices[3], explanation: `<em>"As opposed to"</em> emphasizes contrast rather than degree. <em>"More...than"</em> is the standard construction for comparing quantities or degrees.` }
      ];
    } else if (example.position === 3) {
      // Have vs. Of
      updatedChoices = [
        { ...example.choices[0], explanation: `<em>"Could of"</em> is always incorrect. This error comes from mishearing <em>"could've"</em> (the contraction of "could have"). <em>"Of"</em> is never part of a verb phrase.` },
        { ...example.choices[1], explanation: `This correctly uses <em>"could have,"</em> which forms the conditional perfect tense. <em>"Have"</em> (not "of") is the helping verb needed after modal verbs like "could," "should," and "would."` },
        { ...example.choices[2], explanation: `<em>"Might of"</em> has the same error as "could of." The correct form is <em>"might have."</em> Never use <em>"of"</em> after modal verbs.` },
        { ...example.choices[3], explanation: `<em>"Would of"</em> is incorrect for the same reason. The correct form is <em>"would have."</em> <em>"Of"</em> is a preposition, not a verb.` }
      ];
    } else if (example.position === 4) {
      // Countable vs. Non-countable
      updatedChoices = [
        { ...example.choices[0], explanation: `<em>"Amount"</em> is used for non-countable nouns (money, water, time). Students are countable individuals, so we need <em>"number,"</em> not <em>"amount."</em>` },
        { ...example.choices[1], explanation: `This correctly uses <em>"number of students"</em> for countable nouns. Use <em>"number"</em> when you can count individual items (students, books, cars).` },
        { ...example.choices[2], explanation: `<em>"Less"</em> is used with non-countable nouns (less water, less time). For countable nouns like students, use <em>"fewer"</em> or <em>"number,"</em> not <em>"less."</em>` },
        { ...example.choices[3], explanation: `<em>"Much"</em> is used with non-countable nouns (much water, much time). For countable nouns like students, use <em>"many"</em> or <em>"number,"</em> not <em>"much."</em>` }
      ];
    } else if (example.position === 5) {
      // Active vs. Passive Voice
      updatedChoices = [
        { ...example.choices[0], explanation: `This passive voice construction (<em>"was announced by"</em>) is wordy and less direct. Active voice (<em>"the principal announced"</em>) is usually clearer and more concise.` },
        { ...example.choices[1], explanation: `This correctly uses active voice, making the principal the subject performing the action. Active voice is generally preferred on the ACT for being more direct and concise.` },
        { ...example.choices[2], explanation: `This awkwardly combines a participial phrase with redundant phrasing. It's wordy and unclear compared to the straightforward active voice option.` },
        { ...example.choices[3], explanation: `This is grammatically incorrect and creates an awkward double passive construction with <em>"had been made an announcement."</em> The phrasing is convoluted and unclear.` }
      ];
    } else if (example.position === 6) {
      // Prepositional Idioms
      updatedChoices = [
        { ...example.choices[0], explanation: `<em>"Afraid by"</em> is not idiomatic English. The standard expression is <em>"afraid of"</em> when describing fear of something specific.` },
        { ...example.choices[1], explanation: `<em>"Afraid about"</em> is not standard. While we might worry <em>"about"</em> something, we're <em>"afraid of"</em> something that scares us.` },
        { ...example.choices[2], explanation: `This correctly uses the idiomatic expression <em>"afraid of."</em> Certain adjectives require specific prepositions—<em>"afraid"</em> always pairs with <em>"of."</em>` },
        { ...example.choices[3], explanation: `<em>"Afraid from"</em> is not idiomatic. The preposition <em>"from"</em> doesn't pair with <em>"afraid"</em> in standard English—the correct pairing is <em>"afraid of."</em>` }
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

  console.log('\n✓ Complete! Added explanations to Topic 1.8 examples.');
}

addExplanations();
