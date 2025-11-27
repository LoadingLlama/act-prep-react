const { createClient } = require('@supabase/supabase-js');
const supabase = createClient('https://rabavobdklnwvwsldbix.supabase.co', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InJhYmF2b2Jka2xud3Z3c2xkYml4Iiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc1OTc2NTQ3OCwiZXhwIjoyMDc1MzQxNDc4fQ.81SeH703keXgF3IevQlRS7OYmn1J2GUVIkn3OJiviM4');

const specificExplanations = {
  1: { // Affect vs. Effect (NOUN usage)
    A: "Correct. 'Effect' is a noun meaning 'result' or 'consequence' - the documentary explored the RESULT (effect) that social media has on teenagers, not the verb 'affect' (to influence).",
    B: "Incorrect. 'Affect' is a verb meaning 'to influence' - but 'the effect that' requires a noun (the result), not a verb. The documentary explored the RESULT (effect), not the action of influencing (affect).",
    C: "Incorrect. 'Effective' is an adjective meaning 'producing the desired result' - but 'the _____ that social media has' requires a noun (effect = result), not an adjective describing something as successful.",
    D: "Incorrect. 'Affecting' is a verb form (present participle) meaning 'influencing' - but the sentence needs a noun to complete 'the _____ that social media has', not a verb. Use 'effect' (result) as the noun."
  },
  2: { // Than vs. Then (comparison)
    A: "Correct. 'Than' is used for comparisons - the coach is comparing MORE practice (greater amount) to natural talent, showing that one exceeds the other. 'Than' always follows comparative words like 'more', 'less', 'better'.",
    B: "Incorrect. 'Then' indicates time sequence (what happens next) or consequence - but the coach is making a COMPARISON between practice and talent, not describing a time sequence. Comparisons with 'more' require 'than'.",
    C: "Incorrect. 'Than' requires no apostrophe - 'than' (comparison) vs 'then' (time) are two completely different words, neither using an apostrophe. Adding an apostrophe creates a nonexistent word.",
    D: "Incorrect. 'Then' with an apostrophe doesn't exist as a word - you're confusing 'then' (time) with a possessive form. The sentence needs 'than' (comparison) to show that practice exceeds natural talent."
  },
  3: { // Have vs. Of (modal verb + have)
    A: "Incorrect. 'Could of' is always wrong - while it sounds like 'could've' when spoken, the correct form is 'could have'. 'Could' is a modal verb that must be followed by 'have' + past participle, never by 'of'.",
    B: "Correct. 'Could have earned' is grammatically correct - 'could' is a modal verb that requires 'have' (not 'of') followed by the past participle 'earned'. This forms the past conditional to show what was possible.",
    C: "Incorrect. 'Could of had earned' mixes two errors - it uses wrong 'of' instead of 'have', plus adds unnecessary 'had'. The correct form is simply 'could have earned' (modal + have + past participle).",
    D: "Incorrect. 'Could had earned' is ungrammatical - modal verbs like 'could' require 'have' (not 'had') before the past participle. 'Could had' is never correct in English; it must be 'could have'."
  },
  4: { // Countable (number of) vs. Non-countable (amount of)
    A: "Incorrect. 'Amount of students' is wrong - 'amount' is used for non-countable nouns (amount of water, amount of time), but 'students' are countable (you can count individual students), requiring 'number of students'.",
    B: "Correct. 'Number of students' is correct - 'students' are countable (1 student, 2 students, etc.), so we use 'number of' for countable nouns, while 'amount of' is reserved for non-countable nouns like 'water' or 'information'.",
    C: "Incorrect. 'Many students' changes the meaning - while 'many' is correct for countable nouns, the original phrasing 'the _____ of students participating' requires 'number' to maintain the structure discussing a specific quantity.",
    D: "Incorrect. 'Quantity of students' sounds awkward - while 'quantity' can technically work with countable nouns, 'number of' is the standard, preferred phrasing for countable items like students in formal writing."
  },
  5: { // Active vs. Passive Voice
    A: "Incorrect. 'Was announced by the principal' is passive voice - while grammatically correct, active voice ('the principal announced the new policy') is clearer, more direct, and generally preferred in good writing.",
    B: "Correct. 'The principal announced' converts to active voice - this is clearer and more direct than passive voice, with the principal (the doer) as the subject performing the action (announcing) on the object (the policy).",
    C: "Incorrect. 'Was being announced by the principal' is passive progressive - this is even more wordy than simple passive, adding unnecessary words ('was being') when active voice ('the principal announced') is much clearer.",
    D: "Incorrect. 'Had been announced by the principal' is passive past perfect - this adds complexity with 'had been' suggesting an earlier time, when simple active voice ('the principal announced') during the assembly is clearer."
  },
  6: { // Prepositional Idioms: afraid OF
    A: "Incorrect. 'Afraid by' is not idiomatic English - while 'by' can indicate agency (done BY someone), emotions like 'afraid' require the preposition 'of' in standard English (afraid OF something).",
    B: "Incorrect. 'Afraid from' is not idiomatic English - 'from' suggests movement or origin, but emotional states like 'afraid' require 'of' to indicate the source of the fear (afraid OF the thunderstorm).",
    C: "Correct. 'Afraid of' is the correct idiomatic expression - English requires specific prepositions with certain adjectives, and 'afraid' always pairs with 'of' to indicate what someone fears (afraid OF heights, afraid OF spiders).",
    D: "Incorrect. 'Afraid with' is not idiomatic English - 'with' suggests accompaniment or manner, but emotions like 'afraid' require 'of' to indicate the object of fear (afraid OF the thunderstorm)."
  },
  45: { // Prepositional Idioms: concerned ABOUT
    A: "Incorrect. 'Concerned of' is not idiomatic English - while 'of' indicates possession or relationship, the adjective 'concerned' requires 'about' or 'with' to indicate the subject of concern, never 'of'.",
    B: "Correct. 'Concerned about' is the standard idiomatic expression - when worried or concerned about something, English uses 'about' (not 'of') to indicate the subject of the concern (concerned about the impact).",
    C: "Incorrect. 'Concerned by' can work in some contexts (concerned BY results = worried BECAUSE OF them), but 'concerned about' (worried REGARDING the impact) is more natural and idiomatic for expressing worry about potential future effects.",
    D: "Incorrect. 'Concerned on' is not idiomatic English - 'on' suggests position or topic, but 'concerned' as an emotional state requires 'about' to indicate what someone is worried about (concerned ABOUT the impact)."
  },
  46: { // Effect vs. Affect (VERB usage)
    A: "Incorrect. 'Effect' as a verb means 'to cause' or 'to bring about' (rare usage) - but the sentence means the changes will INFLUENCE operations, requiring the verb 'affect' (to influence), not 'effect' (to cause).",
    B: "Correct. 'Affect' is the verb meaning 'to influence' or 'to have an impact on' - the policy changes will INFLUENCE (affect) business operations. Remember: affect is usually the verb, effect is usually the noun.",
    C: "Incorrect. 'Effective' is an adjective meaning 'producing results' - but 'will greatly ______ small business operations' needs a verb (to affect = to influence), not an adjective describing effectiveness.",
    D: "Incorrect. 'Affecting' might seem right as a present participle, but 'will' + 'affecting' is ungrammatical - modal verbs like 'will' require the base form of the verb: 'will affect', not 'will affecting'."
  },
  47: { // Active vs. Passive Voice - when passive is better
    A: "Incorrect. This maintains passive voice throughout - while 'had been written by the author' is passive (correctly showing the manuscript was completed earlier), the underlined portion should convert to active for clarity and directness.",
    B: "Correct. Converts the main clause to active voice while maintaining the passive subordinate clause - 'the author' becomes the subject performing the action (discovered), creating clearer, more direct writing: 'the author discovered'.",
    C: "Incorrect. 'Was being discovered by the author' is passive progressive - this is wordy and awkward, using passive voice when active ('the author discovered') would be much clearer and more direct.",
    D: "Incorrect. 'Discovery was made by the author' is passive and wordy - this nominalization (turning the verb 'discover' into the noun 'discovery') adds unnecessary words when active voice ('the author discovered') is simpler."
  },
  49: { // Word Choice: Precision (nice vs. skillful/deft)
    A: "Incorrect. 'Nice' is too informal and vague - in formal/academic writing, 'nice' is a weak word that doesn't precisely describe HOW the diplomat handled negotiations. Use specific adjectives that convey exact meaning.",
    B: "Incorrect. 'Good' is also vague and imprecise - while less informal than 'nice', 'good' doesn't specifically describe the diplomat's skills. Precise writing requires specific adjectives like 'skillful' or 'diplomatic'.",
    C: "Correct. 'Skillful' is precise and appropriate for formal writing - it specifically describes the diplomat's expert ability to handle delicate negotiations, conveying the competence that prevented a crisis.",
    D: "Incorrect. 'Great' is vague and informal - like 'nice' and 'good', 'great' doesn't precisely describe the specific quality of the diplomat's work. Formal writing demands specific adjectives that convey exact meaning."
  },
  50: { // Idiomatic Expression: opportunity TO do vs opportunity OF doing
    A: "Incorrect. 'Opportunity of studying' is not standard - while 'of' can follow 'opportunity' with a noun (opportunity of a lifetime), when followed by a verb, the idiomatic form is 'opportunity TO study', not 'opportunity OF studying'.",
    B: "Correct. 'Opportunity to study' is the standard idiomatic expression - when 'opportunity' is followed by a verb, English requires the infinitive form 'to study' (not the gerund 'of studying'). Think: opportunity TO do something.",
    C: "Incorrect. 'Opportunity for study' changes the meaning slightly - while grammatically possible, this treats 'study' as a noun rather than an action, and doesn't match the original phrasing's intent of students actively studying abroad.",
    D: "Incorrect. 'Opportunity in studying' is not idiomatic - 'in' suggests location or method, but the standard English expression is 'opportunity TO study' when followed by a verb indicating the action students can take."
  }
};

async function fixMiscTopicsExplanations() {
  console.log('Fixing misc-topics lesson generic explanations...\n');
  console.log('='.repeat(80));

  const { data: lesson } = await supabase.from('lessons').select('id').eq('lesson_key', 'misc-topics').single();

  let updatedCount = 0;
  const positions = [1, 2, 3, 4, 5, 6, 45, 46, 47, 49, 50];

  for (const pos of positions) {
    const { data: q } = await supabase.from('lesson_examples').select('*').eq('lesson_id', lesson.id).eq('position', pos).single();

    const newExplanations = specificExplanations[pos];
    if (!newExplanations) {
      console.log(`⚠️  No explanations defined for position ${pos}`);
      continue;
    }

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
  console.log(`✓ Successfully updated ${updatedCount}/${positions.length} misc-topics questions with specific explanations`);
  console.log('='.repeat(80));
}

fixMiscTopicsExplanations();
