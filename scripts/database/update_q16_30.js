const https = require('https');

const SUPABASE_URL = 'rabavobdklnwvwsldbix.supabase.co';
const SUPABASE_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InJhYmF2b2Jka2xud3Z3c2xkYml4Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTk3NjU0NzgsImV4cCI6MjA3NTM0MTQ3OH0.z_1N3TG-cS9Bc1s7UAif91PkIjhBKvicrUqupiNP80Y';

function apiRequest(method, path, data = null) {
  return new Promise((resolve, reject) => {
    const options = {
      hostname: SUPABASE_URL,
      path: path,
      method: method,
      headers: {
        'apikey': SUPABASE_KEY,
        'Authorization': `Bearer ${SUPABASE_KEY}`,
        'Content-Type': 'application/json',
        'Prefer': 'return=representation'
      }
    };

    const req = https.request(options, (res) => {
      let body = '';
      res.on('data', (chunk) => body += chunk);
      res.on('end', () => {
        try {
          resolve(JSON.parse(body));
        } catch (e) {
          resolve(body);
        }
      });
    });

    req.on('error', reject);
    if (data) req.write(JSON.stringify(data));
    req.end();
  });
}

const explanations = {
  16: {
    correct: `"temperature, helping" correctly uses a comma followed by a participial phrase "helping the plant tolerate heat and cold." This structure properly modifies the entire preceding clause by explaining the additional function of salicylates regulating temperature.`,
    F: `"temperature; in effect, helping" incorrectly uses a semicolon before "in effect, helping." A semicolon should separate two independent clauses, but "in effect, helping the plant tolerate heat and cold" is a dependent participial phrase, not an independent clause.`,
    H: `"temperature, this helps" creates a comma splice by joining two independent clauses ("it produces...temperature" and "this helps the plant") with only a comma. This is a run-on sentence error.`,
    J: `"temperature. As a result, helping" creates a sentence fragment. "As a result, helping the plant tolerate heat and cold" lacks a subject and main verb, making it an incomplete sentence that cannot stand alone after the period.`
  },
  17: {
    correct: `The original "plants, particularly in the bark of the willow tree," correctly uses commas to set off the non-restrictive phrase "particularly in the bark of the willow tree." This phrase provides additional, non-essential information about where salicylic acids are found, so commas are appropriate.`,
    B: `"plants—particularly in the bark—of the willow tree," incorrectly places em dashes around only "particularly in the bark," breaking apart the phrase "in the bark of the willow tree." This creates awkward and confusing punctuation that disrupts the grammatical flow.`,
    C: `"plants; particularly in the bark of the willow tree," incorrectly uses a semicolon. Semicolons separate independent clauses, but "particularly in the bark of the willow tree" is a dependent phrase providing additional detail, not an independent clause.`,
    D: `"plants particularly, in the bark of the willow tree." incorrectly places a comma between "particularly" and "in," separating the adverb "particularly" from the prepositional phrase it modifies. This disrupts the natural flow and meaning of the phrase.`
  },
  18: {
    correct: `"willow is listed among" properly uses the passive voice with "willow" as the subject and "is listed" as the verb. This corrects the fragment issue and uses the correct prepositional idiom "listed among" to indicate willow is one item in a larger group.`,
    F: `"lists willow among" creates a sentence fragment. The sentence begins with "On a Sumerian stone tablet from 3000 BCE," which is a prepositional phrase, so it cannot be followed by just "lists willow," which would need a subject before the verb "lists."`,
    H: `"willow is listed on" uses the wrong prepositional idiom. "Listed on" suggests appearing on a surface or platform, but the context requires "listed among" to mean included as one of many items in a group.`,
    J: `"lists willow on" creates the same fragment error as F (missing subject before "lists") and also uses the incorrect idiom "on" instead of "among."'`
  },
  19: {
    correct: `"about" concisely conveys that the date is approximate. Using a single word eliminates redundancy and maintains clarity.`,
    A: `"approximately about" is redundant because both "approximately" and "about" mean the same thing—near or around a certain value. Using both words together is unnecessarily wordy.`,
    B: `"an estimation of" is wordy and awkward. This phrase uses three words to express what "about" conveys in one word, violating the principle of conciseness.`,
    C: `"in the region of" is an unnecessarily wordy phrase. Like choice B, it uses four words where one word ("about") would suffice, making the sentence less efficient.`
  },
  20: {
    correct: `"While the use of willow bark remained a commonplace method to reduce aches, pains, and fevers around the world," provides the most logical transition by establishing a contrast (using "While") between willow's continued worldwide use and its declining favor in Europe specifically. This creates a clear connection between paragraphs.`,
    F: `"Though willow trees are often found near water and have become religious symbols in many cultures," introduces irrelevant information about willow trees' habitats and symbolism that has nothing to do with the paragraph's topic about medicinal use declining in Europe.`,
    H: `"Though the ancient Egyptian physician Imhotep was worshipped as a god of healing and thought to have used willow bark," introduces a specific historical figure that is tangential to the paragraph's focus on willow's declining use in Europe. This creates a weak, unfocused transition.`,
    J: `"Despite the fact that possible side effects to using willow bark could sometimes include stomach aches and dizziness," introduces new information about side effects that wasn't mentioned earlier and doesn't logically connect to why European apothecaries preferred cinchona bark.`
  },
  21: {
    correct: `"preferred" correctly uses the simple past tense to describe what apothecaries did in the past. The context clearly indicates this is a historical account of past preferences, so past tense is appropriate.`,
    B: `"would of preferred" contains the common error of using "of" instead of "have" (it should be "would have"), and additionally, "would have preferred" (even if corrected) suggests a hypothetical situation rather than describing what actually happened.`,
    C: `"will prefer" uses future tense, which is incorrect because the passage is describing historical events that occurred in the past, not future actions.`,
    D: `"prefer" uses present tense, which doesn't match the historical context. The passage describes what apothecaries did in the past, not what they do currently.`
  },
  22: {
    correct: `"Importing" is concise and directly conveys the relevant information. The sentence continues with "cinchona bark however, was expensive," making it clear that the act of importing was what made it expensive.`,
    F: `"The high cost of importing" is unnecessarily wordy. The phrase "high cost" is redundant when the sentence already states "was expensive," creating repetition.`,
    G: `"Importing the high price tag of" is both wordy and awkward. "Price tag" is informal, and saying "importing the high price tag" doesn't make logical sense—you import bark, not a price tag.`,
    H: `"The high importation cost of" is wordy and uses the noun form "importation" when the simpler gerund "importing" is more concise and natural.`
  },
  23: {
    correct: `"bark; however," correctly uses a semicolon before the conjunctive adverb "however" to join two independent clauses, and places a comma after "however" as required by standard punctuation rules.`,
    A: `"bark however," uses only a comma before "however" without a semicolon or period, creating a comma splice. Two independent clauses cannot be joined with just a comma and a conjunctive adverb.`,
    B: `"bark;however" places a semicolon before "however" but omits the required comma after the conjunctive adverb. Standard punctuation requires a comma after transitional words like "however" when they begin a clause.`,
    D: `"bark;however" is identical to choice B, missing the required comma after "however."'`
  },
  24: {
    correct: `"Consequently" is the correct transition word because it shows cause and effect. The previous paragraph explained that imported cinchona was expensive, so consequently (as a result), Stone sought a cheaper substitute. This logical relationship makes "Consequently" the appropriate choice.`,
    G: `"Nevertheless" indicates contrast or opposition, suggesting that Stone's search for a substitute contradicted or went against the previous information. This doesn't make sense—Stone's actions were a logical result of the high cost, not a contradiction to it.`,
    H: `"Furthermore" adds information or continues a point, but doesn't show the cause-and-effect relationship between the expensive cinchona bark and Stone's search for a substitute. The paragraph needs a word showing consequence, not addition.`,
    J: `"Likewise" suggests similarity or comparison, implying that Stone's actions were similar to something previously mentioned. However, the paragraph is explaining the consequence of the high cost, not drawing a parallel.`
  },
  25: {
    correct: `"began" is the simple past tense, which is correct for describing Stone's actions in the mid-1700s. The simple past is used for completed actions at a specific time in the past.`,
    A: `"had began" incorrectly combines the past perfect "had" with the simple past "began" instead of the past participle "begun." The correct past perfect form would be "had begun," but even that is unnecessary here since simple past tense is appropriate.`,
    B: `"would have begun" is the conditional perfect tense, which suggests a hypothetical or contrary-to-fact situation. However, the passage is describing what actually happened, not what might have happened under different circumstances.`,
    C: `"begun" is the past participle form, which requires a helping verb like "had" or "has." Using "begun" alone creates a grammatical error because past participles cannot stand alone as main verbs.`
  },
  26: {
    correct: `"Believing that the two plants must share similar qualities," provides the most logical transition because it explains Stone's reasoning. The previous sentence established that willow bark tasted similar to cinchona bark, and this choice shows Stone concluded from this similarity that the plants must share medicinal qualities—creating a clear cause-and-effect logical flow.`,
    F: `"Known also for his interest in astronomy," introduces completely irrelevant information about Stone's astronomical interests. This has nothing to do with his medical reasoning about willow bark and breaks the logical flow of the paragraph.`,
    G: `"Assuming diseases and their cures derive from the same environments," introduces a general theory about disease and cures that doesn't logically connect to the specific observation about the similar tastes of willow and cinchona bark mentioned in the previous sentence.`,
    J: `"Living on the outskirts of the town of Chipping Norton," provides geographical information that is irrelevant to Stone's logical reasoning about willow bark's potential medicinal properties. This breaks the cause-and-effect flow of the paragraph.`
  },
  27: {
    correct: `"added its" correctly uses the past tense verb "added" to maintain parallel structure with "pulverized" earlier in the sentence, and uses the possessive pronoun "its" (not the contraction "it's") to indicate the powder belonging to the willow bark.`,
    A: `"adds its" uses present tense "adds," which breaks the parallel structure with the past tense verb "pulverized" in the same sentence. The sentence reads "Stone pulverized some willow bark and adds its powder," mixing past and present tense incorrectly.`,
    B: `"then added it's" incorrectly uses the contraction "it's" (meaning "it is") instead of the possessive pronoun "its." The sentence would read "added it is powder," which is grammatically nonsensical.`,
    D: `"adds it's" contains both errors: it uses present tense "adds" (violating parallel structure with "pulverized") and the contraction "it's" instead of the possessive "its."`
  },
  28: {
    correct: `"He tested his new concoction on" best emphasizes the experimental nature because the words "tested" and "concoction" both highlight experimentation. "Tested" explicitly indicates conducting an experiment, and "concoction" suggests a mixture created through experimentation.`,
    F: `"He administered the medicine to" uses the formal word "administered" and calls it "medicine," which suggests established medical practice rather than experimental testing. This doesn't emphasize the experimental nature.`,
    H: `"The liquid was given to benefit" uses passive voice and the phrase "to benefit," suggesting the liquid was already known to be beneficial rather than being experimentally tested. This downplays the experimental aspect.`,
    J: `"He decided to give the drink to" uses "decided to give," which sounds casual and doesn't emphasize experimentation. Calling it a "drink" also makes it sound less experimental than "concoction."`
  },
  29: {
    correct: `"fevers. It" correctly separates two independent clauses with a period, creating two complete sentences. "He administered the medicine to people suffering from fevers" is one complete thought, and "It worked" (with "It" referring to the medicine) is another complete thought.`,
    A: `"fevers, he then noted that it" creates a comma splice by joining two independent clauses ("He administered the medicine to people suffering from fevers" and "he then noted that it worked") with only a comma.`,
    B: `"fevers, he was elated to find" still creates a comma splice. While it adds emotion ("elated to find"), it still improperly joins two independent clauses with just a comma.`,
    C: `"fevers which" creates a dependent clause that leaves the sentence incomplete. The structure "people suffering from fevers which worked" doesn't make logical sense—fevers don't "work," medicine does.`
  },
  30: {
    correct: `Yes, the essay accomplishes the purpose of outlining the development of a common medicine because it documents the historical use of willow bark as a medicine from ancient Egypt and Sumeria through medieval Europe, then traces its gradual refinement by Stone, von Gerhardt, and Hoffmann into modern aspirin. This is a clear developmental outline.`,
    F: `This is incorrect because the essay doesn't describe how Egyptians "administered" willow bark in detail, nor does it explain an evolution from Sumerian practices to Egyptian ones. The essay mentions both cultures briefly but doesn't show a developmental connection between them.`,
    H: `This is incorrect because the essay doesn't primarily explain the biological function of salicylates in plants or how aspirin affects the human body. These topics are mentioned briefly in the introduction but aren't the essay's main focus—the historical development is.`,
    J: `This is incorrect because while the essay does mention the comparison between willow and cinchona bark, this is only one small section explaining why Stone sought a substitute. The essay's primary purpose is tracing the entire development from ancient times to modern aspirin.`
  }
};

function generateExplanation(questionNum) {
  const exp = explanations[questionNum];
  if (!exp) return null;

  const correctChoice = exp.correct;
  const wrongChoices = Object.keys(exp).filter(k => k !== 'correct').sort();

  const wrongChoicesHTML = wrongChoices.map(choice =>
    `<div style="margin-bottom: 0.375rem;"><strong>Choice ${choice}${choice === 'F' ? ' (NO CHANGE)' : choice === 'A' ? ' (NO CHANGE)' : ''}:</strong> ${exp[choice]}</div>`
  ).join('\n');

  return `<div style="line-height: 1.6; margin-bottom: 0.75rem; color: #374151;">
${correctChoice}
</div>

<div>
<strong style="font-size: 0.875rem; color: #6b7280;">Why Other Answers Are Wrong:</strong>
<div style="margin-top: 0.5rem; line-height: 1.6; color: #374151;">
${wrongChoicesHTML}
</div>
</div>`;
}

async function updateQuestions() {
  for (let i = 16; i <= 30; i++) {
    const explanation = generateExplanation(i);
    if (explanation) {
      console.log(`Updating question ${i}...`);
      const result = await apiRequest('PATCH',
        `/rest/v1/practice_test_english_questions?id=eq.${i}`,
        { explanation }
      );
      console.log(`Question ${i} updated successfully`);
    }
  }
  console.log('Questions 16-30 updated!');
}

updateQuestions().catch(console.error);
