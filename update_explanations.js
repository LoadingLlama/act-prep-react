const https = require('https');

const SUPABASE_URL = 'rabavobdklnwvwsldbix.supabase.co';
const SUPABASE_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InJhYmF2b2Jka2xud3Z3c2xkYml4Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTk3NjU0NzgsImV4cCI6MjA3NTM0MTQ3OH0.z_1N3TG-cS9Bc1s7UAif91PkIjhBKvicrUqupiNP80Y';

// Helper function to make API requests
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

// Specific explanations for each question
const explanations = {
  1: {
    correct: `This choice transforms "There are thousands of new animal species" into "Of the thousands of new animal species," creating a subordinate prepositional phrase instead of an independent clause. This eliminates the comma splice error that occurs when the original version joins two independent clauses ("There are thousands of new animal species identified each year" and "the vast majority are small") with only a comma.`,
    A: `"There are thousands of new animal species identified each year, the vast majority are small" creates a comma splice by joining two independent clauses with only a comma. Both clauses can stand alone as complete sentences, so they cannot be connected with just a comma.`,
    B: `"Scientists say thousands of new animal species are identified each year, the vast majority are small" still contains the same comma splice error. While it adds "Scientists say," it doesn't address the fundamental problem of two independent clauses being improperly joined.`,
    D: `"Thousands of new animal species are identified each year, the vast majority are small" also creates a comma splice. Like choice A, this joins two complete thoughts with only a comma instead of using proper punctuation (semicolon, period, or conjunction with comma).`
  },
  2: {
    correct: `"Mantas are" correctly establishes the subject "Mantas" with the plural verb "are," creating a grammatically complete independent clause. This properly connects the subject to the predicate "plankton-eating relatives of stingrays."`,
    F: `"Mantas, which are" creates a non-restrictive relative clause beginning with "which are," but this makes the sentence fragment because the main clause lacks a verb. The sentence would read "Mantas, which are plankton-eating relatives...flying slowly through the water" with no main verb for "Mantas."`,
    H: `"Mantas," with only a comma creates a sentence fragment. The subject "Mantas" is left without a verb, making the entire construction incomplete.`,
    J: `Deleting the underlined portion entirely would create "Mantas plankton-eating relatives of stingrays" which is a sentence fragment lacking a verb and proper grammatical structure.`
  },
  3: {
    correct: `The original punctuation "wings—up to twenty-five feet wide—" correctly uses a pair of em dashes to set off the parenthetical information "up to twenty-five feet wide." Em dashes are appropriate here because they emphasize the impressive size detail while keeping it clearly separated from the main clause.`,
    B: `"wings: up to twenty-five feet wide—" incorrectly mixes punctuation marks by using a colon to open the parenthetical but an em dash to close it. Paired parenthetical elements must use matching punctuation (two dashes, two commas, or two parentheses).`,
    C: `"wings, up to twenty-five feet wide—" incorrectly uses a comma to open the parenthetical but an em dash to close it. This creates inconsistent punctuation that violates the rule requiring matching pairs.`,
    D: `"wings, up to twenty-five feet wide:" incorrectly uses a comma to open and a colon to close the parenthetical phrase. Additionally, colons should introduce what follows, not conclude a phrase, making this usage grammatically incorrect.`
  },
  4: {
    correct: `"variations in the mantas" uses the correct prepositional idiom "variations in" without unnecessary commas. The phrase flows naturally as "physical variations in the mantas she swam amongst," where "in the mantas" is an essential prepositional phrase that shouldn't be separated by punctuation.`,
    F: `"variations, in the mantas," incorrectly places commas around "in the mantas," treating it as a non-essential phrase. However, "in the mantas" is essential to specify where the variations occurred, so it should not be set off with commas.`,
    G: `"variations—in the mantas" uses an em dash before "in the mantas," suggesting this is parenthetical or emphatic information. However, this phrase is essential to the meaning and doesn't require special punctuation or emphasis.`,
    H: `"variations, in the mantas," is identical to choice F, incorrectly treating the essential prepositional phrase as non-essential by surrounding it with commas.`
  },
  5: {
    correct: `Yes, because the sentence "Her beachside lodgings in Mozambique now house the Marine Megafauna Research Center" interrupts the logical flow from Marshall observing physical variations to her suspecting two species exist. The sentence about her lodgings is off-topic information that breaks the narrative about her scientific observations and hypothesis formation.`,
    B: `This is incorrect because whether the sentence clarifies why Marshall did research in Mozambique is irrelevant. The real issue is that the sentence disrupts the paragraph's focus on Marshall's scientific observations and hypothesis, not the location justification.`,
    C: `This misrepresents what the sentence says. The sentence doesn't explain how Marshall created a large institution from being a lone researcher—it simply states that her lodgings now house a research center, which is a minor detail unrelated to the paragraph's main point.`,
    D: `While the sentence does clarify Marshall's connection to the Marine Megafauna Center, this information interrupts the logical progression of the paragraph about her scientific observations and hypothesis. The organizational detail is irrelevant to the narrative flow.`
  },
  6: {
    correct: `"is" correctly agrees with the singular subject "The skin." Despite "all mantas" appearing closer to the verb, the true subject is "skin" (singular), which requires the singular verb "is." The phrase "of all mantas" is a prepositional phrase modifying "skin."`,
    G: `"happen to be" is plural and doesn't agree with the singular subject "The skin." This phrase also adds unnecessary words that make the sentence awkward and verbose.`,
    H: `"were" is both plural (disagreeing with singular "skin") and past tense, which doesn't match the present tense context of the passage describing the general characteristics of manta skin.`,
    J: `"are" is plural and doesn't agree with the singular subject "The skin." The prepositional phrase "of all mantas" doesn't change the fact that "skin" is singular.`
  },
  7: {
    correct: `"was that" correctly connects the subject "Another discovery" with the noun clause "that some mantas had egg-shaped masses." No comma should separate the linking verb "was" from its predicate noun clause.`,
    A: `"was: that" incorrectly places a colon between the verb "was" and the noun clause "that some mantas had egg-shaped masses." Colons should not separate verbs from their complements.`,
    B: `"was, that," incorrectly surrounds "that" with commas. The word "that" introduces an essential noun clause that serves as the predicate nominative and should not be separated from the verb or the clause.`,
    D: `"was, that" incorrectly places a comma between the linking verb "was" and the noun clause beginning with "that." This separates the verb from its necessary complement.`
  },
  8: {
    correct: `After Sentence 1 is the most logical placement because Sentence 1 states "To investigate, Marshall began collecting data," and the new sentence "Some of the data were basic, such as manta coloration and size" directly provides examples of what data Marshall collected, creating a clear and immediate connection.`,
    G: `After Sentence 2 ("Other data required a closer look") doesn't work logically because you cannot reference "Other data" before first establishing what the basic data were. This would create a confusing sequence.`,
    H: `After Sentence 3 ("The skin of all mantas, for example, is embedded with tiny, toothlike 'denticles'") doesn't fit because Sentence 3 is already providing specific detailed data about denticles, so introducing "basic" data here would be out of sequence.`,
    J: `After Sentence 4 (about denticle spacing patterns) is too late in the paragraph. The new sentence introduces the concept of basic data, which should come early in the discussion of data collection, not after detailed examples.`
  },
  9: {
    correct: `"had the evidence to announce" directly conveys that Marshall's announcement was backed by scientific data. The phrase "had the evidence" explicitly indicates that her announcement was supported by research findings.`,
    A: `"announced, with two other scientists," doesn't convey anything about scientific data backing the announcement. It only indicates who made the announcement, not whether it was evidence-based.`,
    B: `"surprised many scientists by announcing" emphasizes the reaction to the announcement rather than indicating it was backed by data. Being surprising doesn't mean being evidence-based.`,
    D: `"at long last announced" emphasizes the timing or delay of the announcement, not whether it was supported by scientific evidence. This phrase suggests anticipation rather than scientific rigor.`
  },
  10: {
    correct: `"are" correctly agrees with the plural subject "two manta species." The verb must be plural to match the plural noun "species" modified by "two."`,
    F: `"is" is singular and doesn't agree with the plural subject "two manta species." Even though "is" might sound acceptable in casual speech, formal written English requires subject-verb agreement.`,
    G: `"exists" is singular and doesn't agree with the plural subject "two manta species." Additionally, "exist" would be the better verb choice, but even that would need to be "exist" (plural), not "exists."`,
    H: `"was" is both singular (disagreeing with "two manta species") and past tense, which doesn't fit the context since the passage is discussing the present reality that two species exist.`
  },
  11: {
    correct: `"rarely ventures far from its home territory" maintains an appropriate academic and formal tone while clearly conveying that the reef manta stays in one area. This phrasing is precise and scientifically appropriate.`,
    A: `"kind of sticks around one area" uses informal, colloquial language ("kind of sticks around") that is inappropriate for scientific writing. This casual phrasing doesn't match the formal tone of the passage.`,
    C: `"doesn't delight in slogging long distances" uses awkward, anthropomorphic language that attributes human emotions ("delight") and informal word choice ("slogging") to the fish, creating an inappropriately casual and imprecise tone.`,
    D: `"loves hanging around its neighborhood" uses highly informal, colloquial language ("loves," "hanging around," "neighborhood") that is completely inappropriate for scientific writing and anthropomorphizes the animal.`
  },
  12: {
    correct: `"that" correctly introduces the noun clause "that such large animals went undifferentiated for so long," which serves as the object of the preposition "The fact." The construction "The fact that" is the correct prepositional idiom.`,
    G: `"whether" would change the meaning to introduce doubt or alternatives, as in "The fact whether such large animals went undifferentiated," which doesn't make logical sense. "Whether" is used for alternatives, not for stating facts.`,
    H: `"which" would create "The fact which such large animals went undifferentiated," which is grammatically incorrect. "Which" cannot introduce a noun clause in this construction.`,
    J: `"how" would create "The fact how such large animals went undifferentiated," which is grammatically incorrect. While "how" can introduce clauses, it doesn't work with "The fact" in this context.`
  },
  13: {
    correct: `"for so long highlights how little scientists know" correctly places the time phrase "for so long" immediately after "went undifferentiated" (the action it modifies) and before "highlights" (the main verb). This creates clear meaning: the animals went undifferentiated for a long time, and this fact highlights scientific knowledge gaps.`,
    A: `"highlights how little scientists know for so long" incorrectly places "for so long" at the end, making it seem like scientists "know for so long" rather than the animals "went undifferentiated for so long." This creates a misplaced modifier error that changes the intended meaning.`,
    C: `"highlights for so long how little scientists know" incorrectly places "for so long" between "highlights" and its object "how little scientists know," creating awkward phrasing that suggests the highlighting action occurred for a long time, which doesn't make logical sense.`,
    D: `"highlights how for so long little scientists know" creates completely garbled syntax by placing "for so long" in the middle of the noun clause "how little scientists know," making the sentence ungrammatical and incomprehensible.`
  },
  14: {
    correct: `"Fortunately, mantas have a devoted and expert researcher in Dr. Marshall" best concludes the essay by suggesting continued scientific study. The word "Fortunately" combined with having a "devoted and expert researcher" implies ongoing research and future study of manta rays.`,
    F: `"At the moment, manta ray populations face an array of threats worldwide" introduces a new topic about threats to mantas, which doesn't conclude the essay or suggest continued scientific study. This creates an abrupt shift in focus.`,
    G: `"A 2009 documentary film about Dr. Marshall related the story of her manta-species discovery" mentions a documentary but doesn't suggest that scientific study will continue. This is about past documentation, not future research.`,
    H: `"Dr. Marshall once described the manta ray as like the largest, most beautiful underwater bird" is a poetic description but doesn't suggest continued scientific study. It's merely a metaphor, not a statement about ongoing research.`
  },
  15: {
    correct: `No, the essay would not accomplish the purpose of surveying the scientific community's response because it focuses on how Marshall's research led to the discovery of the two manta species. The essay describes Marshall's methodology, observations, and announcement, not how other scientists reacted to or responded to her identification.`,
    A: `This is incorrect because the essay doesn't explain that the scientific community "enthusiastically accepted" the identification. There's no discussion of the community's response at all.`,
    B: `While the essay does relate that Marshall's research was thorough and documented, this doesn't address whether the essay surveys the scientific community's response. Thoroughness of research is different from community response.`,
    C: `This is incorrect because the essay doesn't even present one scientist's response to the identification—it presents Marshall's process of making the discovery, not anyone's response to it after the fact.`
  }
};

// Function to generate HTML explanation
function generateExplanation(questionNum) {
  const exp = explanations[questionNum];
  if (!exp) return null;

  const correctChoice = exp.correct;
  const wrongChoices = Object.keys(exp).filter(k => k !== 'correct').sort();

  const wrongChoicesHTML = wrongChoices.map(choice =>
    `<div style="margin-bottom: 0.375rem;"><strong>Choice ${choice}${choice === 'F' || choice === 'G' || choice === 'H' || choice === 'J' ? '' : choice === 'A' ? ' (NO CHANGE)' : ''}:</strong> ${exp[choice]}</div>`
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

// Update questions 1-15
async function updateQuestions() {
  for (let i = 1; i <= 15; i++) {
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
  console.log('First 15 questions updated!');
}

updateQuestions().catch(console.error);
