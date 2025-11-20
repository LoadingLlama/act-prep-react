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
  31: {
    correct: `"photographer Martin Klimas carefully pours paint" uses active voice with the subject "photographer Martin Klimas" performing the action "pours." This creates a clear, direct, and concise sentence that emphasizes the agent performing the action.`,
    A: `"paint is what photographer Martin Klimas carefully pours" uses passive voice ("paint is") combined with an awkward "what...pours" construction that creates unnecessary wordiness and indirectness. The structure makes the sentence unnecessarily complex.`,
    B: `"there is paint carefully being poured by photographer Martin Klimas" uses both the weak "there is" construction and passive voice ("being poured by"), creating a wordy, indirect sentence that obscures who is performing the action.`,
    C: `"paint is carefully poured by Martin Klimas, a photographer," uses passive voice ("is poured by"), which is less direct than active voice. While grammatically correct, it's wordier and less forceful than having the photographer as the subject performing the action.`
  },
  32: {
    correct: `"colors: rich oranges and powder blues," correctly uses a colon to introduce the list of specific color examples that follow "colors." The comma after "blues" properly sets off the continuation "hot pinks and electric yellows" as additional items in the series.`,
    F: `"colors; rich oranges and powder blues," incorrectly uses a semicolon before the list. Semicolons separate independent clauses or complex list items, but here we're introducing a simple explanatory list, which requires a colon, not a semicolon.`,
    H: `"colors: rich oranges; and powder blues" incorrectly places a semicolon between "oranges" and "and powder blues." List items separated by "and" should use commas, not semicolons, unless the items themselves contain commas.`,
    J: `"colors; rich oranges and powder blues;" uses semicolons incorrectly both before and after the list items. The first semicolon should be a colon (to introduce the list), and the final semicolon should be a comma (to continue the sentence).`
  },
  33: {
    correct: `"tripod and" correctly uses the coordinating conjunction "and" without a comma to connect two parallel verb phrases: "attaches his camera to a tripod" and "positions the camera." When a compound predicate has two verbs sharing the same subject, no comma is needed before "and."`,
    A: `"tripod, and he" unnecessarily adds the pronoun "he" after the comma, creating two independent clauses when the second action could simply be another verb sharing the same subject "Klimas." This makes the sentence wordier than necessary.`,
    C: `"tripod. He" creates two separate sentences, which interrupts the smooth flow of listing Klimas's sequential actions. The actions are closely related steps in the same process and work better in a single sentence.`,
    D: `"tripod; he" uses a semicolon to separate what becomes two independent clauses, but like choice C, this unnecessarily breaks up closely related sequential actions that flow better as a compound predicate in one sentence.`
  },
  34: {
    correct: `"level with" is the correct prepositional idiom for indicating that two things are at the same height or horizontal position. "Level with" is the standard expression in photography and general usage for describing horizontal alignment.`,
    G: `"eye-to-eye with" is an idiom that means confronting someone directly or having a frank conversation, not describing physical positioning or height alignment. This phrase has the wrong meaning in this context.`,
    H: `"the same as" is too general and vague. While it could technically indicate equality, "level with" is the precise, standard term for describing horizontal positioning in photography.`,
    J: `"equal to" suggests mathematical or quantitative equality rather than horizontal alignment or positioning. It's the wrong idiom for describing camera placement.`
  },
  35: {
    correct: `"cranks up the volume to ten" is appropriately informal and vivid for this context. The phrase "cranks up" effectively conveys both the action of increasing volume and the energetic nature of the music and process being described.`,
    B: `"turns the volume knob a bit higher" undermines the dramatic effect by saying "a bit higher" when the text specifies "to ten," which implies maximum volume. "A bit higher" contradicts the full-blast intensity described.`,
    C: `"increases the volume of the output" is unnecessarily technical and formal. This clinical phrasing doesn't match the dynamic, artistic tone of the passage describing Klimas's creative process.`,
    D: `"adjusts the speaker's output level" is overly formal and technical, making the action sound mechanical and scientific rather than artistic and expressive. The tone doesn't fit the creative context.`
  },
  36: {
    correct: `"cause" agrees with the plural subject "vibrations." The complete sentence reads "The vibrations produced by Daft Punk's dance anthem 'Around the World' cause the paint to rise and fall." "Vibrations" is plural, so the verb must be "cause," not "causes."`,
    F: `"has caused" is incorrect for two reasons: it's singular (disagreeing with plural "vibrations") and it uses present perfect tense when simple present is more appropriate for describing the general process that happens repeatedly.`,
    H: `"is causing" uses the singular "is" which doesn't agree with the plural subject "vibrations," and the present progressive tense is unnecessary for describing the general cause-and-effect relationship.`,
    J: `"causes" is singular and doesn't agree with the plural subject "vibrations." The sentence requires the plural verb "cause" to match "vibrations."'`
  },
  37: {
    correct: `"image that Klimas's camera captures—" uses correct punctuation with an em dash to introduce the explanatory phrase "sound visually rendered by the effects of the vibrations on the paint." The structure is clear and the dash appropriately sets off the explanation.`,
    B: `"pic, frozen in time's embrace that Klimas's camera has snapped—" uses overly informal language ("pic") and clichéd phrasing ("frozen in time's embrace") that doesn't match the passage's tone. The construction is also awkward.`,
    C: `"picture that Klimas's photographic paraphernalia has managed to catch—" is unnecessarily wordy ("photographic paraphernalia" instead of "camera") and "has managed to catch" sounds uncertain rather than precise.`,
    D: `"snapshot that Klimas's photographic machine snares—" uses awkward word choices: "photographic machine" is clunky compared to "camera," and "snares" has connotations of trapping that don't fit the technical photography context.`
  },
  38: {
    correct: `"I leave the creation of the picture to the sound itself," is the most relevant quotation because it directly explains Klimas's artistic philosophy—that the sound, not the photographer, creates the image. This connects to the paragraph's focus on how sound vibrations create the visual result.`,
    G: `"The most annoying thing was cleaning up the set thoroughly after every single shot," discusses a practical inconvenience rather than the artistic concept or process. This is tangential information that doesn't support the paragraph's focus on the creative process.`,
    H: `"In general, I use normal photographic equipment and common music stuff," provides technical information about equipment but doesn't illuminate the artistic concept of sound creating the image, which is the paragraph's focus.`,
    J: `"The shooting is mostly about repeating the process again and again," discusses the repetitive nature of the work but doesn't explain the core artistic concept that sound creates the visual result.`
  },
  39: {
    correct: `"was" correctly agrees with the singular subject "Klimas's idea" and uses the past tense to describe when his idea was sparked. Despite the plural word "sculptures" appearing nearby, the true subject is "idea" (singular).`,
    A: `"were" is plural and doesn't agree with the singular subject "Klimas's idea for his sonic sculptures." The subject is "idea," which is singular, not "sculptures," which is part of a prepositional phrase.`,
    B: `"have been" is plural ("have" rather than "has") and uses present perfect tense. The subject "idea" is singular and requires past tense ("was") to match the 1960s timeframe mentioned next.`,
    D: `"are" is plural and doesn't agree with the singular subject "idea," and it uses present tense when past tense is needed to describe the historical inspiration from Jenny's 1960s work.`
  },
  40: {
    correct: `"experiments of Swiss scientist" correctly removes the unnecessary commas that were incorrectly separating "experiments" from its modifier "of Swiss scientist Hans Jenny." The prepositional phrase is essential information that shouldn't be set off with commas.`,
    F: `"experiments, of Swiss scientist," incorrectly places commas around the prepositional phrase "of Swiss scientist," treating essential identifying information as non-essential. The commas incorrectly suggest this information could be removed.`,
    G: `"experiments, of Swiss scientist" removes one comma but still incorrectly places a comma before the essential prepositional phrase "of Swiss scientist Hans Jenny."`,
    H: `"experiments of Swiss scientist" appears to be the same as choice J and would be correct, eliminating the unnecessary commas.`
  },
  41: {
    correct: `"Jenny studied" creates a simple, grammatically complete sentence: "In the 1960s, Jenny studied the effects of sound vibrations on various materials." This provides a clear subject-verb structure in the independent clause.`,
    A: `"Jenny's study on" creates a sentence fragment. The sentence would read "In the 1960s, Jenny's study on the effects of sound vibrations on various materials," which lacks a main verb. "Study" here is a noun, not a verb.`,
    B: `"while Jenny studied" creates a dependent clause beginning with the subordinating conjunction "while," leaving the sentence without an independent clause. This creates a fragment.`,
    C: `"Jenny, to study" creates a fragment with an infinitive phrase rather than a complete verb. The sentence lacks a main verb in a form that can anchor an independent clause.`
  },
  42: {
    correct: `Begin a new paragraph because the essay shifts from Jenny's experiments (described in the previous sentences about how sound vibrations affect materials) to the music Klimas specifically uses for his artwork (discussing Wagner, Bach, Miles Davis, etc.). This is a clear topic change requiring a new paragraph.`,
    F: `This is incorrect because the essay doesn't shift from "harmonics explanation" in the previous paragraph—the previous content discusses Jenny's experiments with sound vibrations on materials, not harmonics theory.`,
    H: `This is incorrect because there is no interruption of Jenny's experiments—the previous paragraph has already concluded describing Jenny's work. The next sentence introduces a new topic about Klimas's music choices.`,
    J: `This is incorrect because the previous paragraph wasn't describing "Klimas's scientific background"—it was describing Jenny's experiments. Additionally, the new paragraph does shift topics, so a new paragraph is appropriate.`
  },
  43: {
    correct: `"sculptures," correctly places a comma after "sculptures" to connect the dependent clause "While he acknowledges that all forms of music can generate sonic sculptures" with the independent clause "Klimas says, 'I typically select something dynamic and percussive.'"`,
    A: `"sculptures." creates a sentence fragment. "While he acknowledges that all forms of music can generate sonic sculptures" is a dependent clause that cannot stand alone as a complete sentence when followed by a period.`,
    B: `"sculptures, and" incorrectly uses the coordinating conjunction "and" after the dependent clause. The construction "While he acknowledges...sculptures, and Klimas says" is grammatically incorrect because "and" should connect independent clauses, not a dependent clause to an independent clause.`,
    D: `"sculptures;" incorrectly uses a semicolon, which should separate two independent clauses. However, "While he acknowledges that all forms of music can generate sonic sculptures" is a dependent clause, not an independent clause.`
  },
  44: {
    correct: `"That makes sense." is the most logical concluding sentence because it connects to the previous statement about Klimas selecting "dynamic and percussive" music. Since he needs the paint to "get up and dance" (requiring energetic movement), choosing dynamic, percussive music logically makes sense.`,
    F: `"That would certainly impress Jenny." is speculative and doesn't logically conclude the essay. There's no basis for claiming Jenny would be impressed, and this shifts focus away from Klimas's artistic process.`,
    G: `"That's simply a matter of taste." contradicts the essay's point. Klimas's choice of dynamic, percussive music isn't just personal preference—it's functional, as he needs the vibrations to create visual effects with the paint.`,
    H: `"That seems unwise." directly contradicts the passage. The essay has been explaining how Klimas's method works successfully, so calling it "unwise" doesn't make sense.`
  },
  45: {
    correct: `Yes, the essay accomplishes the purpose of explaining how Klimas photographs the effects of sound on paint. The essay describes his entire process: pouring paint on a speaker membrane, playing music, using vibrations to make the paint move, and photographing the visual result. This directly explains how he photographs sound's effects on paint.`,
    A: `This is incorrect because while the essay mentions Jenny's experiments, it doesn't focus on how Jenny used an "artistic process similar to Klimas's process." Jenny was a scientist studying sound vibrations, not an artist making photographs like Klimas.`,
    C: `This is incorrect because the essay doesn't focus on the "cultural significance" of Klimas's artwork. There's no discussion of the art's meaning, importance, or impact on culture—just the technical process of creating it.`,
    D: `This is incorrect because the essay doesn't provide a "general overview" of multiple visual artists inspired by Jenny. It specifically and thoroughly explains Klimas's process, not a broad survey of various artists.`
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
  for (let i = 31; i <= 45; i++) {
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
  console.log('Questions 31-45 updated!');
}

updateQuestions().catch(console.error);
