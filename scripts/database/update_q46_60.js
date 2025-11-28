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
  46: {
    correct: `"tree-covered bluffs," creates a parallel series of three noun phrases describing the gorge: "flowing water," "tree-covered bluffs," and "roaring waterfalls." The comma properly separates items in this series without unnecessary words.`,
    F: `"there are tree-covered bluffs," breaks the parallel structure by inserting "there are" before the second item. The series should read "flowing water, tree-covered bluffs, and roaring waterfalls," not "flowing water, there are tree-covered bluffs, and roaring waterfalls."`,
    G: `"tree-covered bluffs flank the river," disrupts the parallel structure by turning the second item into a full clause with a verb ("flank"). This doesn't match the noun phrase structure of the other items in the series.`,
    H: `"featuring tree-covered bluffs," uses the participle "featuring," which breaks the parallel structure. The series needs three parallel noun phrases, not "flowing water," "featuring tree-covered bluffs," and "roaring waterfalls."`
  },
  47: {
    correct: `"daunted would-be" effectively conveys that the features intimidated or discouraged potential road builders. "Daunted" precisely captures the sense of being intimidated by the challenge, and "would-be" correctly indicates these were prospective builders who didn't attempt construction.`,
    B: `"posed problems for" is wordier and less vivid than "daunted." While it conveys difficulty, it doesn't capture the sense of intimidation or discouragement that prevented road building for so long.`,
    C: `"slowed potential" is awkward phrasing. "Potential" is an adjective or noun, and using it as the object of "slowed" creates unclear meaning. The phrase should identify what was slowed (road builders), not an abstract quality.`,
    D: `"challenged" is weaker than "daunted" and doesn't fully convey why road building didn't happen until 1913. People can accept challenges; "daunted" better suggests the features were so intimidating that builders were discouraged from trying.`
  },
  48: {
    correct: `"practicalities:" correctly uses a colon to introduce the explanation of what the design showcased. The colon signals that what follows will elaborate on how the design went beyond mere practicalities.`,
    F: `"practicalities" with no punctuation creates a run-on sentence. Two independent clauses ("Their design went beyond practicalities" and "it showcased the scenic grandeur") cannot be joined without punctuation or a conjunction.`,
    G: `"practicalities: and" incorrectly combines a colon with the conjunction "and." When using a colon to introduce an explanation, you don't need "and"—the colon alone properly introduces what follows.`,
    J: `"practicalities," creates a comma splice by joining two independent clauses with only a comma. The clauses need a semicolon, period, or colon (since the second clause explains the first).`
  },
  49: {
    correct: `"gorge." is concise and avoids redundancy. The passage has already established that the gorge is where the Columbia River is located (first sentence: "the Columbia River Gorge"), so adding "where the Columbia River is located" is unnecessary.`,
    A: `"gorge where the Columbia River is located." is redundant because the first sentence already identifies this as "the Columbia River Gorge." Repeating that the river is in the gorge wastes words stating information already established.`,
    B: `"gorge, which is over eighty-five miles long." is also redundant—the first sentence already states the gorge "is eighty-five miles." Repeating this information is unnecessary.`,
    C: `"gorge and its scenery." is redundant because "scenic grandeur" already refers to the gorge's scenery. Saying "grandeur of the gorge and its scenery" is repetitive.`
  },
  50: {
    correct: `Deleting "for sitting by the road" eliminates redundancy. The sentence already states that the overlooks had "benches," and benches are inherently for sitting. Additionally, "by the road" is obvious since roadside overlooks are by definition alongside the road.`,
    F: `"for sitting by the road" is redundant because benches are obviously for sitting, and "roadside overlooks" already indicates they're by the road. This phrase adds no new information.`,
    G: `"alongside the road" is redundant with "roadside overlooks." If the overlooks are roadside, they're obviously alongside the road.`,
    H: `"for travelers" is somewhat redundant since the sentence already mentions "travelers" who would use these benches. The phrase adds little value.`
  },
  51: {
    correct: `"in" is the correct preposition for the phrasal verb "take in," which means to view or observe. "Take in a view" is the standard idiom for experiencing or observing a scene.`,
    B: `"up" would create "take up a view," which is incorrect. "Take up" means to begin or occupy space, not to observe a view.`,
    C: `"on" would create "take on a view," which is incorrect. "Take on" means to accept a challenge or acquire a quality, not to observe scenery.`,
    D: `Deleting the preposition would create "take a view," which, while grammatically possible, is less idiomatic than "take in a view" for describing the experience of observing scenery.`
  },
  52: {
    correct: `"road and" correctly completes the parallel structure "between road and environment." This creates a clear comparison between two things: the road and the natural environment.`,
    F: `"that and" creates vague reference. "That" is unclear—it seems to refer back to "the route" or "rock," but the logical comparison should be between the road (or route) and the environment.`,
    G: `"this and the" also creates vague reference with "this." Like "that," it's unclear what "this" refers to, making the comparison ambiguous.`,
    J: `"it and it's" has two errors: "it" is vague (unclear referent), and "it's" is the contraction for "it is," which makes no sense in the phrase "blurred the distinction between it and it is environment."`
  },
  53: {
    correct: `Yes, because the detail "made of local rock" highlights impressive design. Using local materials shows thoughtful design that helps the guardrails blend with the natural environment—this demonstrates the engineers' careful attention to aesthetic integration.`,
    B: `This is incorrect because "made of local rock" doesn't hint at how engineers made tunnel openings. Guardrails and tunnels are separate features, and rock guardrails don't explain tunnel construction techniques.`,
    C: `This is incorrect because the detail is related to the sentence's point about blurring "the distinction between road and environment." Using local rock for guardrails directly supports this idea of integration with surroundings.`,
    D: `This is incorrect because the phrase doesn't suggest creating tunnels was "easy." The detail is about guardrails, not tunnels, and it emphasizes thoughtful design rather than ease of construction.`
  },
  54: {
    correct: `"tunnel, enabling" uses a comma followed by a participial phrase to show how creating openings allowed motorists to see the river. This structure correctly indicates that the openings enabled the views.`,
    F: `"tunnel; enabling" incorrectly uses a semicolon before the participial phrase "enabling motorists...to glimpse the river." Semicolons separate independent clauses, but "enabling motorists surrounded by rock to glimpse the river below" is a dependent phrase, not an independent clause.`,
    G: `"tunnel; an achievement that enabled" uses a semicolon incorrectly (before a dependent phrase) and adds the wordy appositive "an achievement that enabled" where simple "enabling" is more concise.`,
    H: `"tunnel, this enabled" creates a comma splice by joining two independent clauses with only a comma. "Engineers created openings in the side of one tunnel" and "this enabled motorists...to glimpse the river" are both independent clauses.`
  },
  55: {
    correct: `"When" provides the most logical transition by indicating the time relationship. The sentence explains what happened when ("When Oregon built a new road") in response to the previous statement about the highway being outmoded.`,
    A: `"In time" is vague about when events occurred. It suggests eventually or gradually, but doesn't clearly indicate the cause-and-effect relationship between the highway being outmoded and Oregon building a new road.`,
    C: `"Soon" suggests quick timing but doesn't establish the logical connection between the highway's obsolescence and the building of a new road as clearly as "When" does.`,
    D: `Deleting the transition removes the logical connection between the highway being outmoded and Oregon's response of building a new road. Some transition word is needed for clarity.`
  },
  56: {
    correct: `"original road was still in use," is concise and clear, directly stating that the western third of the original highway continued to be used. This is the most straightforward phrasing.`,
    G: `"road that first existed continued in a functional capacity," is unnecessarily wordy. "That first existed" means "original," and "in a functional capacity" is verbose for "in use."`,
    H: `"highway that was completed in 1922 continued to be utilized," is wordy and repetitive. The passage already established the 1922 completion date, and "continued to be utilized" is longer than "was still in use."`,
    J: `"original highway was still being utilized by the driving populace," is overly formal and wordy. "Being utilized by the driving populace" is unnecessarily complex compared to "in use."`
  },
  57: {
    correct: `"rekindled" precisely conveys that interest was revived or renewed after having faded. This metaphor effectively captures the idea that interest in the highway had diminished but was reignited in the 1980s.`,
    A: `"abounded" means "existed in large quantities" but doesn't convey the renewal aspect. The passage implies interest had waned and then returned, not that it had always existed in abundance.`,
    B: `"took hold" means began to take effect or become established, but doesn't capture the idea of interest returning after a period of decline. It suggests new interest, not renewed interest.`,
    D: `"set in" suggests something negative beginning (like decay or winter setting in). This doesn't fit the positive context of people wanting to restore the highway.`
  },
  58: {
    correct: `"Rubble-filled tunnels have been emptied and strengthened." is clear and maintains parallel structure with the previous sentences. It follows the same pattern as "guardrails...have been repaired" and "bridges and viaducts have been rebuilt," using passive voice consistently.`,
    F: `"Tunnels, now empty and strong, had rubble removed from them." awkwardly mixes "now empty and strong" (present state) with "had rubble removed" (past perfect tense), creating confusing tense inconsistency with the present perfect used in surrounding sentences.`,
    H: `"The tunnels have had the rubble removed from them, and people have strengthened them." is wordy and unnecessarily adds "people" when the focus should remain on the restoration work, not the workers. It also breaks the parallel passive voice structure.`,
    J: `"Once filled with rubble, tunnels have been emptied and strengthened." starts with "Once filled with rubble," which, while not grammatically wrong, is less concise than simply saying "Rubble-filled tunnels."`
  },
  59: {
    correct: `"the splendor of the highway that Hill and Lancaster envisioned over one hundred years ago." provides the most effective conclusion by connecting back to the passage's beginning, referencing the original designers (Hill and Lancaster) and emphasizing that their vision is now being experienced. This creates satisfying thematic closure.`,
    A: `"a site that became a National Historic Landmark in 2000." provides factual information but doesn't create thematic closure or connect to the passage's emphasis on Hill and Lancaster's original vision being preserved.`,
    B: `"the gorge on sections of the road where it wasn't feasible to restore motor vehicle traffic," focuses on limitations and logistics rather than celebrating the achievement of preserving the historic highway's beauty.`,
    D: `"a beautiful path that has become a popular tourist destination." is generic and doesn't connect to the specific historical significance or the original designers' vision that the passage has emphasized.`
  },
  60: {
    correct: `Point D in Paragraph 3 is the most logical placement for a sentence about the total cost of restoration. Paragraph 3 discusses the restoration efforts that began in the 1980s and continues through "today," making it the natural place to discuss the financial investment in restoration. Points A, B, and C all come before any mention of restoration.`,
    F: `Point A in Paragraph 1 discusses the original construction in 1913, not restoration. A sentence about restoration costs would be out of place before restoration is even mentioned.`,
    G: `Point B in Paragraph 2 discusses features of the original highway design (overlooks, guardrails, tunnels), not restoration. Restoration costs don't fit here.`,
    H: `Point C in Paragraph 2 is still discussing the original highway's completion in 1922. Restoration hasn't been mentioned yet, so discussing restoration costs would be illogical here.`
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
  for (let i = 46; i <= 60; i++) {
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
  console.log('Questions 46-60 updated!');
}

updateQuestions().catch(console.error);
