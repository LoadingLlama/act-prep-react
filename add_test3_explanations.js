/**
 * Add ALL Test 3 English explanations (Q1-75)
 */

const { createClient } = require('@supabase/supabase-js');
require('dotenv').config();

const supabaseUrl = process.env.REACT_APP_SUPABASE_URL;
const supabaseKey = process.env.REACT_APP_SUPABASE_SERVICE_ROLE_KEY || process.env.REACT_APP_SUPABASE_ANON_KEY;
const supabase = createClient(supabaseUrl, supabaseKey);

const EXPLANATIONS = [
  // Passage 1: Solspeil Sun Mirror in Rjukan (Q1-15)
  {
    test: 3,
    question: 1,
    explanation: `<div style="line-height: 1.6; margin-bottom: 0.75rem; color: #000000;">
The correct answer is <strong style="font-weight: 600;">B (Rjukan;)</strong> because a semicolon would create a run-on sentence or be grammatically incorrect. The sentence needs either a comma with an appositive or a dash, but not a semicolon which requires independent clauses on both sides.
</div>

<div>
<strong style="font-size: 0.9375rem; color: #000000; font-weight: 600;">Why Other Answers Are Wrong:</strong>
<div style="margin-top: 0.5rem; line-height: 1.6; color: #000000;">
<div style="margin-bottom: 0.375rem;"><strong style="font-weight: 600;">Choice A ("Rjukan, which is"):</strong> This works correctly, creating a nonrestrictive relative clause.</div>
<div style="margin-bottom: 0.375rem;"><strong style="font-weight: 600;">Choice C ("Rjukan—"):</strong> An em dash can effectively set off the appositive phrase.</div>
<div><strong style="font-weight: 600;">Choice D ("Rjukan:"):</strong> A colon can introduce the explanation that follows.</div>
</div>
</div>`
  },
  {
    test: 3,
    question: 2,
    explanation: `<div style="line-height: 1.6; margin-bottom: 0.75rem; color: #000000;">
The correct answer is <strong style="font-weight: 600;">H (artist Martin Andersen was alarmed by the prolonged winter gloom)</strong> because it places the subject "artist Martin Andersen" immediately after the introductory phrase "After moving to Rjukan in 2001," avoiding a misplaced modifier.
</div>

<div>
<strong style="font-size: 0.9375rem; color: #000000; font-weight: 600;">Why Other Answers Are Wrong:</strong>
<div style="margin-top: 0.5rem; line-height: 1.6; color: #000000;">
<div style="margin-bottom: 0.375rem;"><strong style="font-weight: 600;">Choice F (NO CHANGE):</strong> "The prolonged winter gloom" cannot logically "move to Rjukan"—this creates a misplaced modifier.</div>
<div style="margin-bottom: 0.375rem;"><strong style="font-weight: 600;">Choice G:</strong> This awkward construction also has a misplaced modifier issue.</div>
<div><strong style="font-weight: 600;">Choice J:</strong> Still contains a misplaced modifier problem.</div>
</div>
</div>`
  },
  {
    test: 3,
    question: 3,
    explanation: `<div style="line-height: 1.6; margin-bottom: 0.75rem; color: #000000;">
The correct answer is <strong style="font-weight: 600;">B (Yes, because it more specifically establishes what Andersen hoped to do)</strong> because "redirect sunlight into the town" is much more specific than the vague "change the situation." It clarifies exactly what Andersen's goal was.
</div>

<div>
<strong style="font-size: 0.9375rem; color: #000000; font-weight: 600;">Why Other Answers Are Wrong:</strong>
<div style="margin-top: 0.5rem; line-height: 1.6; color: #000000;">
<div style="margin-bottom: 0.375rem;"><strong style="font-weight: 600;">Choice A:</strong> The revision doesn't indicate materials; it describes the goal.</div>
<div style="margin-bottom: 0.375rem;"><strong style="font-weight: 600;">Choice C:</strong> Andersen's idea is the same as mentioned in the following sentence (mirrors for sunlight).</div>
<div><strong style="font-weight: 600;">Choice D:</strong> While the original is succinct, specificity is more valuable here.</div>
</div>
</div>`
  },
  {
    test: 3,
    question: 4,
    explanation: `<div style="line-height: 1.6; margin-bottom: 0.75rem; color: #000000;">
The correct answer is <strong style="font-weight: 600;">J (and)</strong> because it correctly connects the two parallel ideas: Kittelsen proposed the mirrors AND Eyde considered the idea. Both are positive actions that support the same point.
</div>

<div>
<strong style="font-size: 0.9375rem; color: #000000; font-weight: 600;">Why Other Answers Are Wrong:</strong>
<div style="margin-top: 0.5rem; line-height: 1.6; color: #000000;">
<div style="margin-bottom: 0.375rem;"><strong style="font-weight: 600;">Choice F (NO CHANGE - "and instead"):</strong> "Instead" suggests one replaced the other, but both people supported mirrors.</div>
<div style="margin-bottom: 0.375rem;"><strong style="font-weight: 600;">Choice G ("but"):</strong> "But" indicates contrast, which doesn't fit since both men favored the idea.</div>
<div><strong style="font-weight: 600;">Choice H ("yet"):</strong> "Yet" also suggests contrast that isn't present here.</div>
</div>
</div>`
  },
  {
    test: 3,
    question: 5,
    explanation: `<div style="line-height: 1.6; margin-bottom: 0.75rem; color: #000000;">
The correct answer is <strong style="font-weight: 600;">C (had realized that the necessary technology didn't exist)</strong> because it provides the specific reason why Eyde abandoned the idea—the technology wasn't available in 1913. This adds meaningful information.
</div>

<div>
<strong style="font-size: 0.9375rem; color: #000000; font-weight: 600;">Why Other Answers Are Wrong:</strong>
<div style="margin-top: 0.5rem; line-height: 1.6; color: #000000;">
<div style="margin-bottom: 0.375rem;"><strong style="font-weight: 600;">Choice A (NO CHANGE):</strong> This is redundant—"did not follow through" and "abandoned" mean the same thing.</div>
<div style="margin-bottom: 0.375rem;"><strong style="font-weight: 600;">Choice B:</strong> "Building wasn't feasible" is vague and doesn't explain why.</div>
<div><strong style="font-weight: 600;">Choice D:</strong> "Could not succeed" is also vague without explaining the reason.</div>
</div>
</div>`
  },
  {
    test: 3,
    question: 6,
    explanation: `<div style="line-height: 1.6; margin-bottom: 0.75rem; color: #000000;">
The correct answer is <strong style="font-weight: 600;">F (NO CHANGE - "reality. Three")</strong> because these are two independent clauses that should be separated. The first states Andersen made mirrors a reality; the second describes how many mirrors were used. A period properly separates these complete thoughts.
</div>

<div>
<strong style="font-size: 0.9375rem; color: #000000; font-weight: 600;">Why Other Answers Are Wrong:</strong>
<div style="margin-top: 0.5rem; line-height: 1.6; color: #000000;">
<div style="margin-bottom: 0.375rem;"><strong style="font-weight: 600;">Choice G ("reality. When three"):</strong> "When three...were airlifted" creates a dependent clause fragment.</div>
<div style="margin-bottom: 0.375rem;"><strong style="font-weight: 600;">Choice H ("reality, three"):</strong> This creates a comma splice.</div>
<div><strong style="font-weight: 600;">Choice J ("reality three"):</strong> This creates a run-on sentence.</div>
</div>
</div>`
  },
  {
    test: 3,
    question: 7,
    explanation: `<div style="line-height: 1.6; margin-bottom: 0.75rem; color: #000000;">
The correct answer is <strong style="font-weight: 600;">B (mountain because)</strong> because "because" correctly introduces the reason why helicopters were needed: no roads led to the site. This creates a logical cause-and-effect relationship.
</div>

<div>
<strong style="font-size: 0.9375rem; color: #000000; font-weight: 600;">Why Other Answers Are Wrong:</strong>
<div style="margin-top: 0.5rem; line-height: 1.6; color: #000000;">
<div style="margin-bottom: 0.375rem;"><strong style="font-weight: 600;">Choice A (NO CHANGE - "mountain, moreover,"):</strong> "Moreover" adds information but doesn't show causation.</div>
<div style="margin-bottom: 0.375rem;"><strong style="font-weight: 600;">Choice C ("mountain and"):</strong> "And" doesn't show the causal relationship.</div>
<div><strong style="font-weight: 600;">Choice D ("mountain,"):</strong> A comma alone doesn't clarify the logical connection.</div>
</div>
</div>`
  },
  {
    test: 3,
    question: 8,
    explanation: `<div style="line-height: 1.6; margin-bottom: 0.75rem; color: #000000;">
The correct answer is <strong style="font-weight: 600;">J (led to the cliffside construction site)</strong> because "led" is the past tense (matching "carried"), and "site" means location. The passage describes past events.
</div>

<div>
<strong style="font-size: 0.9375rem; color: #000000; font-weight: 600;">Why Other Answers Are Wrong:</strong>
<div style="margin-top: 0.5rem; line-height: 1.6; color: #000000;">
<div style="margin-bottom: 0.375rem;"><strong style="font-weight: 600;">Choice F (NO CHANGE):</strong> "Lead" is present tense (incorrect) and "cite" means to quote (wrong word).</div>
<div style="margin-bottom: 0.375rem;"><strong style="font-weight: 600;">Choice G:</strong> "Lead" is present tense, and "sight" means vision (wrong word).</div>
<div><strong style="font-weight: 600;">Choice H:</strong> "Lead" is present tense (incorrect).</div>
</div>
</div>`
  },
  {
    test: 3,
    question: 9,
    explanation: `<div style="line-height: 1.6; margin-bottom: 0.75rem; color: #000000;">
The correct answer is <strong style="font-weight: 600;">A (NO CHANGE - "tools such as thirty-foot wooden tripods")</strong> because "such as" doesn't require a comma before it when it introduces an example, and "thirty-foot wooden" doesn't need commas because these are coordinate adjectives that work together.
</div>

<div>
<strong style="font-size: 0.9375rem; color: #000000; font-weight: 600;">Why Other Answers Are Wrong:</strong>
<div style="margin-top: 0.5rem; line-height: 1.6; color: #000000;">
<div style="margin-bottom: 0.375rem;"><strong style="font-weight: 600;">Choice B:</strong> Unnecessary commas disrupt the flow of the descriptive phrase.</div>
<div style="margin-bottom: 0.375rem;"><strong style="font-weight: 600;">Choice C:</strong> The comma after "tripods" incorrectly suggests more examples follow.</div>
<div><strong style="font-weight: 600;">Choice D:</strong> A comma before "such as" is unnecessary in this construction.</div>
</div>
</div>`
  },
  {
    test: 3,
    question: 10,
    explanation: `<div style="line-height: 1.6; margin-bottom: 0.75rem; color: #000000;">
The correct answer is <strong style="font-weight: 600;">H (are synchronized)</strong> because it clearly and precisely describes how the three mirrors work together—they're synchronized to create the light. This is more technical and accurate than casual phrases.
</div>

<div>
<strong style="font-size: 0.9375rem; color: #000000; font-weight: 600;">Why Other Answers Are Wrong:</strong>
<div style="margin-top: 0.5rem; line-height: 1.6; color: #000000;">
<div style="margin-bottom: 0.375rem;"><strong style="font-weight: 600;">Choice F (NO CHANGE - "team up as a group"):</strong> Redundant and informal; "team up" and "as a group" mean similar things.</div>
<div style="margin-bottom: 0.375rem;"><strong style="font-weight: 600;">Choice G ("help each other out"):</strong> Too casual and anthropomorphic for mirrors.</div>
<div><strong style="font-weight: 600;">Choice J ("conspire together"):</strong> "Conspire" has negative connotations and "together" is redundant.</div>
</div>
</div>`
  },
  {
    test: 3,
    question: 11,
    explanation: `<div style="line-height: 1.6; margin-bottom: 0.75rem; color: #000000;">
The correct answer is <strong style="font-weight: 600;">D (specifies why the mirrors adjust throughout the day)</strong> because "To keep the light on the square" explains the purpose/reason for the mirrors adjusting—they need to track the sun to maintain illumination in the correct location.
</div>

<div>
<strong style="font-size: 0.9375rem; color: #000000; font-weight: 600;">Why Other Answers Are Wrong:</strong>
<div style="margin-top: 0.5rem; line-height: 1.6; color: #000000;">
<div style="margin-bottom: 0.375rem;"><strong style="font-weight: 600;">Choice A:</strong> The size and location are mentioned elsewhere, not in this phrase.</div>
<div style="margin-bottom: 0.375rem;"><strong style="font-weight: 600;">Choice B:</strong> This phrase explains why, not how (the mechanism).</div>
<div><strong style="font-weight: 600;">Choice C:</strong> The mirror location was established earlier.</div>
</div>
</div>`
  },
  {
    test: 3,
    question: 12,
    explanation: `<div style="line-height: 1.6; margin-bottom: 0.75rem; color: #000000;">
The correct answer is <strong style="font-weight: 600;">J (Germany and monitored in Rjukan and)</strong> because it creates a parallel structure: "controlled...in Germany and monitored in Rjukan and on the mountain." No extra commas are needed in this series.
</div>

<div>
<strong style="font-size: 0.9375rem; color: #000000; font-weight: 600;">Why Other Answers Are Wrong:</strong>
<div style="margin-top: 0.5rem; line-height: 1.6; color: #000000;">
<div style="margin-bottom: 0.375rem;"><strong style="font-weight: 600;">Choice F (NO CHANGE):</strong> The commas around "monitored" incorrectly interrupt the parallel structure.</div>
<div style="margin-bottom: 0.375rem;"><strong style="font-weight: 600;">Choice G:</strong> The comma after "and" is incorrect.</div>
<div><strong style="font-weight: 600;">Choice H:</strong> The comma after "Rjukan" incorrectly breaks up "in Rjukan and on the mountain."</div>
</div>
</div>`
  },
  {
    test: 3,
    question: 13,
    explanation: `<div style="line-height: 1.6; margin-bottom: 0.75rem; color: #000000;">
The correct answer is <strong style="font-weight: 600;">C (reach the town are)</strong> because "rays" is plural (requiring "reach" and "are"), and the subject is "The light rays," not "light."
</div>

<div>
<strong style="font-size: 0.9375rem; color: #000000; font-weight: 600;">Why Other Answers Are Wrong:</strong>
<div style="margin-top: 0.5rem; line-height: 1.6; color: #000000;">
<div style="margin-bottom: 0.375rem;"><strong style="font-weight: 600;">Choice A (NO CHANGE - "reaches...is"):</strong> Both verbs are singular, but "rays" is plural.</div>
<div style="margin-bottom: 0.375rem;"><strong style="font-weight: 600;">Choice B ("reaches...are"):</strong> Inconsistent verb agreement; "reaches" is singular but "rays" is plural.</div>
<div><strong style="font-weight: 600;">Choice D ("reach...is"):</strong> "Reach" is correct for plural "rays," but "is" is singular.</div>
</div>
</div>`
  },
  {
    test: 3,
    question: 14,
    explanation: `<div style="line-height: 1.6; margin-bottom: 0.75rem; color: #000000;">
The correct answer is <strong style="font-weight: 600;">J (when the Solspeil)</strong> because it's concise and clear. The sentence simply needs to indicate the time when residents rejoiced—when the Solspeil first shone.
</div>

<div>
<strong style="font-size: 0.9375rem; color: #000000; font-weight: 600;">Why Other Answers Are Wrong:</strong>
<div style="margin-top: 0.5rem; line-height: 1.6; color: #000000;">
<div style="margin-bottom: 0.375rem;"><strong style="font-weight: 600;">Choice F (NO CHANGE):</strong> Wordy and awkward; "due to the bright light when" is redundant since the Solspeil shining a bright beam already describes the light.</div>
<div style="margin-bottom: 0.375rem;"><strong style="font-weight: 600;">Choice G:</strong> "Controlled remotely" is irrelevant information here.</div>
<div><strong style="font-weight: 600;">Choice H:</strong> "At the initial time" is wordy and awkward.</div>
</div>
</div>`
  },
  {
    test: 3,
    question: 15,
    explanation: `<div style="line-height: 1.6; margin-bottom: 0.75rem; color: #000000;">
The correct answer is <strong style="font-weight: 600;">B (Yes, because it describes the planning and construction of the Solspeil, which brought the sun to Rjukan residents in winter)</strong> because the essay details Andersen's idea, the history, the construction process, and how it benefited the community by bringing sunlight.
</div>

<div>
<strong style="font-size: 0.9375rem; color: #000000; font-weight: 600;">Why Other Answers Are Wrong:</strong>
<div style="margin-top: 0.5rem; line-height: 1.6; color: #000000;">
<div style="margin-bottom: 0.375rem;"><strong style="font-weight: 600;">Choice A:</strong> The essay doesn't focus on international attention; it focuses on the project itself.</div>
<div style="margin-bottom: 0.375rem;"><strong style="font-weight: 600;">Choice C:</strong> While Eyde is mentioned, he's not the main focus.</div>
<div><strong style="font-weight: 600;">Choice D:</strong> Andersen's other artwork isn't discussed.</div>
</div>
</div>`
  },
  // Passage 2: Anglo-Saxon Scops (Q16-30) - continuing from Q15
  {
    test: 3,
    question: 16,
    explanation: `<div style="line-height: 1.6; margin-bottom: 0.75rem; color: #000000;">
The correct answer is <strong style="font-weight: 600;">G (were)</strong> because the subject "Narratives" is plural, and the passage describes past events in Anglo-Saxon times, requiring the plural past tense verb "were."
</div>

<div>
<strong style="font-size: 0.9375rem; color: #000000; font-weight: 600;">Why Other Answers Are Wrong:</strong>
<div style="margin-top: 0.5rem; line-height: 1.6; color: #000000;">
<div style="margin-bottom: 0.375rem;"><strong style="font-weight: 600;">Choice F (NO CHANGE - "has been"):</strong> Present perfect tense doesn't fit the historical context, and "has" is singular.</div>
<div style="margin-bottom: 0.375rem;"><strong style="font-weight: 600;">Choice H ("was"):</strong> Singular verb doesn't agree with plural "Narratives."</div>
<div><strong style="font-weight: 600;">Choice J ("is"):</strong> Present tense and singular, both incorrect for this context.</div>
</div>
</div>`
  },
  {
    test: 3,
    question: 17,
    explanation: `<div style="line-height: 1.6; margin-bottom: 0.75rem; color: #000000;">
The correct answer is <strong style="font-weight: 600;">C (through spoken word)</strong> because it maintains the formal, academic tone of the passage while clearly describing oral transmission. It's concise and appropriate.
</div>

<div>
<strong style="font-size: 0.9375rem; color: #000000; font-weight: 600;">Why Other Answers Are Wrong:</strong>
<div style="margin-top: 0.5rem; line-height: 1.6; color: #000000;">
<div style="margin-bottom: 0.375rem;"><strong style="font-weight: 600;">Choice A (NO CHANGE - "by people being conversant"):</strong> Awkward and unclear; "being conversant" doesn't mean oral transmission.</div>
<div style="margin-bottom: 0.375rem;"><strong style="font-weight: 600;">Choice B ("by folks rattling them off"):</strong> Too informal and colloquial for this academic passage.</div>
<div><strong style="font-weight: 600;">Choice D ("in chitchat"):</strong> Extremely informal and diminishes the significance of the oral tradition.</div>
</div>
</div>`
  },
  {
    test: 3,
    question: 18,
    explanation: `<div style="line-height: 1.6; margin-bottom: 0.75rem; color: #000000;">
The correct answer is <strong style="font-weight: 600;">G ((performances could last from several minutes to several days))</strong> because it directly explains why great memorization was necessary—scops had to remember enough material for performances that could last days.
</div>

<div>
<strong style="font-size: 0.9375rem; color: #000000; font-weight: 600;">Why Other Answers Are Wrong:</strong>
<div style="margin-top: 0.5rem; line-height: 1.6; color: #000000;">
<div style="margin-bottom: 0.375rem;"><strong style="font-weight: 600;">Choice F (NO CHANGE):</strong> That skills could be honed doesn't explain why they were needed.</div>
<div style="margin-bottom: 0.375rem;"><strong style="font-weight: 600;">Choice H:</strong> Audience size doesn't relate to memorization requirements.</div>
<div><strong style="font-weight: 600;">Choice J:</strong> Comparing to average people doesn't explain why the skill was essential.</div>
</div>
</div>`
  },
  {
    test: 3,
    question: 19,
    explanation: `<div style="line-height: 1.6; margin-bottom: 0.75rem; color: #000000;">
The correct answer is <strong style="font-weight: 600;">C (on a regular basis)</strong> because it's concise and clear, conveying that scops needed to compose frequently without unnecessary wordiness.
</div>

<div>
<strong style="font-size: 0.9375rem; color: #000000; font-weight: 600;">Why Other Answers Are Wrong:</strong>
<div style="margin-top: 0.5rem; line-height: 1.6; color: #000000;">
<div style="margin-bottom: 0.375rem;"><strong style="font-weight: 600;">Choice A (NO CHANGE):</strong> "At an elevated, consistent level of frequency" is extremely wordy and redundant.</div>
<div style="margin-bottom: 0.375rem;"><strong style="font-weight: 600;">Choice B:</strong> "Regularly as part of their usual routine" is redundant—all three phrases mean the same thing.</div>
<div><strong style="font-weight: 600;">Choice D ("a lot"):</strong> Too informal and vague for this academic passage.</div>
</div>
</div>`
  },
  {
    test: 3,
    question: 20,
    explanation: `<div style="line-height: 1.6; margin-bottom: 0.75rem; color: #000000;">
The correct answer is <strong style="font-weight: 600;">J (songs,)</strong> because the sentence is listing what scops kept: "poems, songs, and even the histories." The list requires parallel structure with just the nouns.
</div>

<div>
<strong style="font-size: 0.9375rem; color: #000000; font-weight: 600;">Why Other Answers Are Wrong:</strong>
<div style="margin-top: 0.5rem; line-height: 1.6; color: #000000;">
<div style="margin-bottom: 0.375rem;"><strong style="font-weight: 600;">Choice F (NO CHANGE - "songs were written,"):</strong> This breaks parallel structure in the list.</div>
<div style="margin-bottom: 0.375rem;"><strong style="font-weight: 600;">Choice G ("scops were writers of songs,"):</strong> Also breaks parallel structure and is wordy.</div>
<div><strong style="font-weight: 600;">Choice H ("they wrote songs,"):</strong> Doesn't maintain the parallel noun structure of the list.</div>
</div>
</div>`
  },
  {
    test: 3,
    question: 21,
    explanation: `<div style="line-height: 1.6; margin-bottom: 0.75rem; color: #000000;">
The correct answer is <strong style="font-weight: 600;">C (so)</strong> because it creates the correlation "valued...so highly...rewards for their talents"—meaning they were so highly valued that they received rewards. This shows the cause-effect relationship.
</div>

<div>
<strong style="font-size: 0.9375rem; color: #000000; font-weight: 600;">Why Other Answers Are Wrong:</strong>
<div style="margin-top: 0.5rem; line-height: 1.6; color: #000000;">
<div style="margin-bottom: 0.375rem;"><strong style="font-weight: 600;">Choice A (NO CHANGE - "as"):</strong> "Valued as highly" doesn't complete the correlation structure needed.</div>
<div style="margin-bottom: 0.375rem;"><strong style="font-weight: 600;">Choice B ("for"):</strong> "Valued for highly" is ungrammatical.</div>
<div><strong style="font-weight: 600;">Choice D (DELETE):</strong> "Valued highly in Anglo-Saxon society rewards" is incomplete and unclear.</div>
</div>
</div>`
  },
  {
    test: 3,
    question: 22,
    explanation: `<div style="line-height: 1.6; margin-bottom: 0.75rem; color: #000000;">
The correct answer is <strong style="font-weight: 600;">J (in fact,)</strong> because it introduces evidence that supports the previous claim. The records of royals giving land provide concrete examples proving scops were highly valued.
</div>

<div>
<strong style="font-size: 0.9375rem; color: #000000; font-weight: 600;">Why Other Answers Are Wrong:</strong>
<div style="margin-top: 0.5rem; line-height: 1.6; color: #000000;">
<div style="margin-bottom: 0.375rem;"><strong style="font-weight: 600;">Choice F (NO CHANGE - "generally,"):</strong> "Generally" suggests an approximation, not specific evidence.</div>
<div style="margin-bottom: 0.375rem;"><strong style="font-weight: 600;">Choice G ("in other words,"):</strong> This would restate the previous idea, but the sentence provides new evidence.</div>
<div><strong style="font-weight: 600;">Choice H ("nonetheless,"):</strong> This signals contrast, but the sentence supports the previous claim.</div>
</div>
</div>`
  },
  {
    test: 3,
    question: 23,
    explanation: `<div style="line-height: 1.6; margin-bottom: 0.75rem; color: #000000;">
The correct answer is <strong style="font-weight: 600;">A (NO CHANGE - "scops")</strong> because "deserving scops" is clear and concise. The context already establishes who was deserving (those who were valued for their talents).
</div>

<div>
<strong style="font-size: 0.9375rem; color: #000000; font-weight: 600;">Why Other Answers Are Wrong:</strong>
<div style="margin-top: 0.5rem; line-height: 1.6; color: #000000;">
<div style="margin-bottom: 0.375rem;"><strong style="font-weight: 600;">Choice B:</strong> "When the royals felt they had earned it" is wordy and redundant with "deserving."</div>
<div style="margin-bottom: 0.375rem;"><strong style="font-weight: 600;">Choice C:</strong> "When the scops proved worthy" is also redundant with "deserving."</div>
<div><strong style="font-weight: 600;">Choice D:</strong> Removing "deserving" loses important information about which scops received land.</div>
</div>
</div>`
  },
  {
    test: 3,
    question: 24,
    explanation: `<div style="line-height: 1.6; margin-bottom: 0.75rem; color: #000000;">
The correct answer is <strong style="font-weight: 600;">F (Yes, because the revised phrase more clearly explains why coins and gold rings would be useful to scops)</strong> because explaining they could be used as status symbols provides meaningful context about why these gifts were valuable beyond mere monetary worth.
</div>

<div>
<strong style="font-size: 0.9375rem; color: #000000; font-weight: 600;">Why Other Answers Are Wrong:</strong>
<div style="margin-top: 0.5rem; line-height: 1.6; color: #000000;">
<div style="margin-bottom: 0.375rem;"><strong style="font-weight: 600;">Choice G:</strong> The revision is about scops' use of gifts, not about scops' importance to royals.</div>
<div style="margin-bottom: 0.375rem;"><strong style="font-weight: 600;">Choice H:</strong> The revision does maintain paragraph focus on scops' value in society.</div>
<div><strong style="font-weight: 600;">Choice J:</strong> The revision does explain how gifts were useful (as status symbols).</div>
</div>
</div>`
  },
  {
    test: 3,
    question: 25,
    explanation: `<div style="line-height: 1.6; margin-bottom: 0.75rem; color: #000000;">
The correct answer is <strong style="font-weight: 600;">D (who)</strong> because "who" is the correct subject pronoun for referring to scops (people) who performed the action "did well."
</div>

<div>
<strong style="font-size: 0.9375rem; color: #000000; font-weight: 600;">Why Other Answers Are Wrong:</strong>
<div style="margin-top: 0.5rem; line-height: 1.6; color: #000000;">
<div style="margin-bottom: 0.375rem;"><strong style="font-weight: 600;">Choice A (NO CHANGE - "which"):</strong> "Which" is for things, not people.</div>
<div style="margin-bottom: 0.375rem;"><strong style="font-weight: 600;">Choice B ("for whom"):</strong> Grammatically awkward in this construction.</div>
<div><strong style="font-weight: 600;">Choice C ("whom"):</strong> "Whom" is object form, but we need subject form "who."</div>
</div>
</div>`
  },
  {
    test: 3,
    question: 26,
    explanation: `<div style="line-height: 1.6; margin-bottom: 0.75rem; color: #000000;">
The correct answer is <strong style="font-weight: 600;">J (A scop was also a moral compass for the community)</strong> because the paragraph goes on to explain how scops set moral standards and influenced reputations, which relates to being a moral compass.
</div>

<div>
<strong style="font-size: 0.9375rem; color: #000000; font-weight: 600;">Why Other Answers Are Wrong:</strong>
<div style="margin-top: 0.5rem; line-height: 1.6; color: #000000;">
<div style="margin-bottom: 0.375rem;"><strong style="font-weight: 600;">Choice F:</strong> Travel isn't discussed in this paragraph.</div>
<div style="margin-bottom: 0.375rem;"><strong style="font-weight: 600;">Choice G:</strong> Audience participation isn't the focus of what follows.</div>
<div><strong style="font-weight: 600;">Choice H:</strong> While keeping attention might be mentioned, the paragraph focuses on moral influence, not entertainment skills.</div>
</div>
</div>`
  },
  {
    test: 3,
    question: 27,
    explanation: `<div style="line-height: 1.6; margin-bottom: 0.75rem; color: #000000;">
The correct answer is <strong style="font-weight: 600;">D (DELETE)</strong> because "conveyed history" is the correct idiom—no preposition is needed. "Conveyed" means "transmitted" or "communicated" and takes a direct object.
</div>

<div>
<strong style="font-size: 0.9375rem; color: #000000; font-weight: 600;">Why Other Answers Are Wrong:</strong>
<div style="margin-top: 0.5rem; line-height: 1.6; color: #000000;">
<div style="margin-bottom: 0.375rem;"><strong style="font-weight: 600;">Choice A (NO CHANGE - "through"):</strong> "Conveyed through history" changes the meaning incorrectly.</div>
<div style="margin-bottom: 0.375rem;"><strong style="font-weight: 600;">Choice B ("over"):</strong> "Conveyed over history" is not idiomatic.</div>
<div><strong style="font-weight: 600;">Choice C ("by"):</strong> "Conveyed by history" changes who is doing the conveying.</div>
</div>
</div>`
  },
  {
    test: 3,
    question: 28,
    explanation: `<div style="line-height: 1.6; margin-bottom: 0.75rem; color: #000000;">
The correct answer is <strong style="font-weight: 600;">H (next, Providing)</strong> because it correctly uses a comma to separate clauses and capitalizes "Providing" as the start of a participial phrase that modifies the action of conveying history.
</div>

<div>
<strong style="font-size: 0.9375rem; color: #000000; font-weight: 600;">Why Other Answers Are Wrong:</strong>
<div style="margin-top: 0.5rem; line-height: 1.6; color: #000000;">
<div style="margin-bottom: 0.375rem;"><strong style="font-weight: 600;">Choice F (NO CHANGE):</strong> Capital "To" makes this a new sentence, but it's a fragment.</div>
<div style="margin-bottom: 0.375rem;"><strong style="font-weight: 600;">Choice G:</strong> Creates a sentence fragment with the period.</div>
<div><strong style="font-weight: 600;">Choice J:</strong> Lowercase "providing" without proper punctuation creates a run-on.</div>
</div>
</div>`
  },
  {
    test: 3,
    question: 29,
    explanation: `<div style="line-height: 1.6; margin-bottom: 0.75rem; color: #000000;">
The correct answer is <strong style="font-weight: 600;">C (Point C in Paragraph 2)</strong> because Point C comes right before discussing oral tradition and how narratives were passed on by speaking rather than writing, creating a perfect contrast between modern poets (writers) and historical scops (speakers).
</div>

<div>
<strong style="font-size: 0.9375rem; color: #000000; font-weight: 600;">Why Other Answers Are Wrong:</strong>
<div style="margin-top: 0.5rem; line-height: 1.6; color: #000000;">
<div style="margin-bottom: 0.375rem;"><strong style="font-weight: 600;">Choice A (Point A):</strong> Too early; the contrast hasn't been set up yet.</div>
<div style="margin-bottom: 0.375rem;"><strong style="font-weight: 600;">Choice B (Point B):</strong> Also too early in the essay.</div>
<div><strong style="font-weight: 600;">Choice D (Point D):</strong> Too late; the discussion of scop skills has moved beyond the writing/speaking distinction.</div>
</div>
</div>`
  },
  {
    test: 3,
    question: 30,
    explanation: `<div style="line-height: 1.6; margin-bottom: 0.75rem; color: #000000;">
The correct answer is <strong style="font-weight: 600;">F (Yes, because it describes the role of scops and explains how they safeguarded the history and values of Anglo-Saxon communities)</strong> because the essay focuses entirely on scops—their role, skills, value, and importance in preserving culture and morality.
</div>

<div>
<strong style="font-size: 0.9375rem; color: #000000; font-weight: 600;">Why Other Answers Are Wrong:</strong>
<div style="margin-top: 0.5rem; line-height: 1.6; color: #000000;">
<div style="margin-bottom: 0.375rem;"><strong style="font-weight: 600;">Choice G:</strong> Ceremonies are briefly mentioned but aren't the main focus.</div>
<div style="margin-bottom: 0.375rem;"><strong style="font-weight: 600;">Choice H:</strong> The essay mentions poems but doesn't describe their specific content in detail.</div>
<div><strong style="font-weight: 600;">Choice J:</strong> The essay doesn't discuss the decline of scops.</div>
</div>
</div>`
  },
  // Passage 3: Log Salvaging in Maine (Q31-45)
  {
    test: 3,
    question: 31,
    explanation: `<div style="line-height: 1.6; margin-bottom: 0.75rem; color: #000000;">
The correct answer is <strong style="font-weight: 600;">A (NO CHANGE - "his \"summer office'—a nickname")</strong> because the em dash correctly sets off the appositive phrase explaining what "summer office" means. The construction flows naturally.
</div>

<div>
<strong style="font-size: 0.9375rem; color: #000000; font-weight: 600;">Why Other Answers Are Wrong:</strong>
<div style="margin-top: 0.5rem; line-height: 1.6; color: #000000;">
<div style="margin-bottom: 0.375rem;"><strong style="font-weight: 600;">Choice B:</strong> Parentheses would be acceptable but the em dash provides better flow.</div>
<div style="margin-bottom: 0.375rem;"><strong style="font-weight: 600;">Choice C:</strong> A colon after "his" is grammatically incorrect.</div>
<div><strong style="font-weight: 600;">Choice D:</strong> Without punctuation, the phrase runs together awkwardly.</div>
</div>
</div>`
  },
  {
    test: 3,
    question: 32,
    explanation: `<div style="line-height: 1.6; margin-bottom: 0.75rem; color: #000000;">
The correct answer is <strong style="font-weight: 600;">G (morning we walked to the dock and readied)</strong> because "walked" and "readied" are parallel past tense verbs connected by "and," creating a clear sequence of actions. The sentence completes with "the pontoon" as the object.
</div>

<div>
<strong style="font-size: 0.9375rem; color: #000000; font-weight: 600;">Why Other Answers Are Wrong:</strong>
<div style="margin-top: 0.5rem; line-height: 1.6; color: #000000;">
<div style="margin-bottom: 0.375rem;"><strong style="font-weight: 600;">Choice F (NO CHANGE):</strong> "As we walked...to ready" is awkward and creates a fragment.</div>
<div style="margin-bottom: 0.375rem;"><strong style="font-weight: 600;">Choice H:</strong> The participial phrases "walking" and "readying" don't create proper sentence structure.</div>
<div><strong style="font-weight: 600;">Choice J:</strong> Similar problem with participial phrases creating awkward structure.</div>
</div>
</div>`
  },
  {
    test: 3,
    question: 33,
    explanation: `<div style="line-height: 1.6; margin-bottom: 0.75rem; color: #000000;">
The correct answer is <strong style="font-weight: 600;">D (sonar and piloted)</strong> because "activated" and "piloted" are parallel verbs that don't need a comma between them when connected by "and."
</div>

<div>
<strong style="font-size: 0.9375rem; color: #000000; font-weight: 600;">Why Other Answers Are Wrong:</strong>
<div style="margin-top: 0.5rem; line-height: 1.6; color: #000000;">
<div style="margin-bottom: 0.375rem;"><strong style="font-weight: 600;">Choice A (NO CHANGE):</strong> The comma after "sonar" is unnecessary in this compound predicate.</div>
<div style="margin-bottom: 0.375rem;"><strong style="font-weight: 600;">Choice B:</strong> The comma after "piloted" incorrectly separates the verb from its adverb "slowly."</div>
<div><strong style="font-weight: 600;">Choice C:</strong> The comma after "piloted" creates the same problem as B.</div>
</div>
</div>`
  },
  {
    test: 3,
    question: 34,
    explanation: `<div style="line-height: 1.6; margin-bottom: 0.75rem; color: #000000;">
The correct answer is <strong style="font-weight: 600;">F (NO CHANGE - "showing")</strong> because the participial phrase "showing what looked like..." correctly modifies "images" and describes what the images displayed.
</div>

<div>
<strong style="font-size: 0.9375rem; color: #000000; font-weight: 600;">Why Other Answers Are Wrong:</strong>
<div style="margin-top: 0.5rem; line-height: 1.6; color: #000000;">
<div style="margin-bottom: 0.375rem;"><strong style="font-weight: 600;">Choice G ("the images showed"):</strong> Redundant since we already know images appeared.</div>
<div style="margin-bottom: 0.375rem;"><strong style="font-weight: 600;">Choice H ("they showed"):</strong> Also redundant and less elegant.</div>
<div><strong style="font-weight: 600;">Choice J ("showed"):</strong> Creates a run-on sentence structure.</div>
</div>
</div>`
  },
  {
    test: 3,
    question: 35,
    explanation: `<div style="line-height: 1.6; margin-bottom: 0.75rem; color: #000000;">
The correct answer is <strong style="font-weight: 600;">B (jumble)</strong> because "jumble" most precisely characterizes a haphazard, disorganized arrangement of logs scattered on the lake bottom, like matchsticks dropped randomly.
</div>

<div>
<strong style="font-size: 0.9375rem; color: #000000; font-weight: 600;">Why Other Answers Are Wrong:</strong>
<div style="margin-top: 0.5rem; line-height: 1.6; color: #000000;">
<div style="margin-bottom: 0.375rem;"><strong style="font-weight: 600;">Choice A (NO CHANGE - "collection"):</strong> Too neutral; doesn't convey the haphazard nature.</div>
<div style="margin-bottom: 0.375rem;"><strong style="font-weight: 600;">Choice C ("range"):</strong> Suggests variety or spectrum, not disorder.</div>
<div><strong style="font-weight: 600;">Choice D ("batch"):</strong> Suggests an organized group, not a random scatter.</div>
</div>
</div>`
  },
  {
    test: 3,
    question: 36,
    explanation: `<div style="line-height: 1.6; margin-bottom: 0.75rem; color: #000000;">
The correct answer is <strong style="font-weight: 600;">G (an indication of why the submerged logs have remained in good condition)</strong> because "protected from insects and oxygen" explains the specific factors that preserved the wood underwater.
</div>

<div>
<strong style="font-size: 0.9375rem; color: #000000; font-weight: 600;">Why Other Answers Are Wrong:</strong>
<div style="margin-top: 0.5rem; line-height: 1.6; color: #000000;">
<div style="margin-bottom: 0.375rem;"><strong style="font-weight: 600;">Choice F:</strong> This doesn't differentiate Moosehead from other lakes.</div>
<div style="margin-bottom: 0.375rem;"><strong style="font-weight: 600;">Choice H:</strong> This explains preservation, not quality comparison.</div>
<div><strong style="font-weight: 600;">Choice J:</strong> It doesn't explain the process, just the protective factors.</div>
</div>
</div>`
  },
  {
    test: 3,
    question: 37,
    explanation: `<div style="line-height: 1.6; margin-bottom: 0.75rem; color: #000000;">
The correct answer is <strong style="font-weight: 600;">D (the underwater video camera's view:)</strong> because it's concise and eliminates redundancy. "Showed" is unnecessary since the colon introduces what was displayed.
</div>

<div>
<strong style="font-size: 0.9375rem; color: #000000; font-weight: 600;">Why Other Answers Are Wrong:</strong>
<div style="margin-top: 0.5rem; line-height: 1.6; color: #000000;">
<div style="margin-bottom: 0.375rem;"><strong style="font-weight: 600;">Choice A (NO CHANGE):</strong> "Displayed and showed" is redundant.</div>
<div style="margin-bottom: 0.375rem;"><strong style="font-weight: 600;">Choice B:</strong> The phrase order is awkward and less clear.</div>
<div><strong style="font-weight: 600;">Choice C:</strong> "The boat's underwater video camera" is wordy when "underwater video camera" suffices.</div>
</div>
</div>`
  },
  {
    test: 3,
    question: 38,
    explanation: `<div style="line-height: 1.6; margin-bottom: 0.75rem; color: #000000;">
The correct answer is <strong style="font-weight: 600;">F (NO CHANGE - "that Uncle Lee thought")</strong> because the parenthetical "Uncle Lee thought" doesn't require commas when it's brief and flows naturally within the clause.
</div>

<div>
<strong style="font-size: 0.9375rem; color: #000000; font-weight: 600;">Why Other Answers Are Wrong:</strong>
<div style="margin-top: 0.5rem; line-height: 1.6; color: #000000;">
<div style="margin-bottom: 0.375rem;"><strong style="font-weight: 600;">Choice G:</strong> Commas around "Uncle Lee" incorrectly break up the phrase.</div>
<div style="margin-bottom: 0.375rem;"><strong style="font-weight: 600;">Choice H:</strong> The comma after "that" is incorrect.</div>
<div><strong style="font-weight: 600;">Choice J:</strong> The comma after "thought" separates it from what he thought.</div>
</div>
</div>`
  },
  {
    test: 3,
    question: 39,
    explanation: `<div style="line-height: 1.6; margin-bottom: 0.75rem; color: #000000;">
The correct answer is <strong style="font-weight: 600;">C (pulled)</strong> because it maintains parallel structure with "grasped" and "coaxed"—all past tense verbs describing the arm's sequential actions.
</div>

<div>
<strong style="font-size: 0.9375rem; color: #000000; font-weight: 600;">Why Other Answers Are Wrong:</strong>
<div style="margin-top: 0.5rem; line-height: 1.6; color: #000000;">
<div style="margin-bottom: 0.375rem;"><strong style="font-weight: 600;">Choice A (NO CHANGE - "they pull"):</strong> "They" is incorrect; the arm (singular) pulled, not "they."</div>
<div style="margin-bottom: 0.375rem;"><strong style="font-weight: 600;">Choice B ("pulling"):</strong> Breaks the parallel structure of past tense verbs.</div>
<div><strong style="font-weight: 600;">Choice D ("pull"):</strong> Present tense doesn't match the past tense narrative.</div>
</div>
</div>`
  },
  {
    test: 3,
    question: 40,
    explanation: `<div style="line-height: 1.6; margin-bottom: 0.75rem; color: #000000;">
The correct answer is <strong style="font-weight: 600;">J (a slimy, hefty)</strong> because it uses clear, concrete adjectives that maintain an informal, conversational tone appropriate for the first-person narrative while being descriptive.
</div>

<div>
<strong style="font-size: 0.9375rem; color: #000000; font-weight: 600;">Why Other Answers Are Wrong:</strong>
<div style="margin-top: 0.5rem; line-height: 1.6; color: #000000;">
<div style="margin-bottom: 0.375rem;"><strong style="font-weight: 600;">Choice F (NO CHANGE):</strong> "Gunked-up, mega-big" is too informal and slangy.</div>
<div style="margin-bottom: 0.375rem;"><strong style="font-weight: 600;">Choice G:</strong> "Repugnantly filthy and prodigiously sized" is overly formal and pretentious for this casual narrative.</div>
<div><strong style="font-weight: 600;">Choice H:</strong> "Excessively proportioned, begrimed" is also too formal and awkward.</div>
</div>
</div>`
  },
  {
    test: 3,
    question: 41,
    explanation: `<div style="line-height: 1.6; margin-bottom: 0.75rem; color: #000000;">
The correct answer is <strong style="font-weight: 600;">B (axe, he explained,)</strong> because "he explained" is a parenthetical interruption that requires commas on both sides to set it off from the main clause.
</div>

<div>
<strong style="font-size: 0.9375rem; color: #000000; font-weight: 600;">Why Other Answers Are Wrong:</strong>
<div style="margin-top: 0.5rem; line-height: 1.6; color: #000000;">
<div style="margin-bottom: 0.375rem;"><strong style="font-weight: 600;">Choice A (NO CHANGE):</strong> Missing the comma before "he explained."</div>
<div style="margin-bottom: 0.375rem;"><strong style="font-weight: 600;">Choice C:</strong> Missing the comma after "explained."</div>
<div><strong style="font-weight: 600;">Choice D:</strong> Missing both required commas around the parenthetical.</div>
</div>
</div>`
  },
  {
    test: 3,
    question: 42,
    explanation: `<div style="line-height: 1.6; margin-bottom: 0.75rem; color: #000000;">
The correct answer is <strong style="font-weight: 600;">H (after the word "tree" and before the dash)</strong> because "when it was cut" needs to modify "the age of the tree," indicating the tree's age at the time of cutting. Placing it after "tree" makes the meaning clear.
</div>

<div>
<strong style="font-size: 0.9375rem; color: #000000; font-weight: 600;">Why Other Answers Are Wrong:</strong>
<div style="margin-top: 0.5rem; line-height: 1.6; color: #000000;">
<div style="margin-bottom: 0.375rem;"><strong style="font-weight: 600;">Choice F (where it is now):</strong> Creates confusion about what "when it was cut" modifies.</div>
<div style="margin-bottom: 0.375rem;"><strong style="font-weight: 600;">Choice G (after "age"):</strong> Awkward placement that disrupts the flow.</div>
<div><strong style="font-weight: 600;">Choice J (after "looking"):</strong> Nonsensical placement that changes the meaning entirely.</div>
</div>
</div>`
  },
  {
    test: 3,
    question: 43,
    explanation: `<div style="line-height: 1.6; margin-bottom: 0.75rem; color: #000000;">
The correct answer is <strong style="font-weight: 600;">B (may have started life a century before the Declaration of Independence)</strong> because it provides a specific historical reference point (1776) that helps readers understand the tree's age of ~200 years in concrete terms.
</div>

<div>
<strong style="font-size: 0.9375rem; color: #000000; font-weight: 600;">Why Other Answers Are Wrong:</strong>
<div style="margin-top: 0.5rem; line-height: 1.6; color: #000000;">
<div style="margin-bottom: 0.375rem;"><strong style="font-weight: 600;">Choice A (NO CHANGE):</strong> Vague and lacks specific detail.</div>
<div style="margin-bottom: 0.375rem;"><strong style="font-weight: 600;">Choice C:</strong> Doesn't provide perspective on the actual age, just comparison of underwater vs. land time.</div>
<div><strong style="font-weight: 600;">Choice D:</strong> "Remarkably long time ago" is vague without specific detail.</div>
</div>
</div>`
  },
  {
    test: 3,
    question: 44,
    explanation: `<div style="line-height: 1.6; margin-bottom: 0.75rem; color: #000000;">
The correct answer is <strong style="font-weight: 600;">F (NO CHANGE - "I'd gotten pretty good at")</strong> because "pretty good" indicates moderate proficiency—not perfect mastery, but competent skill, which is what the question asks for.
</div>

<div>
<strong style="font-size: 0.9375rem; color: #000000; font-weight: 600;">Why Other Answers Are Wrong:</strong>
<div style="margin-top: 0.5rem; line-height: 1.6; color: #000000;">
<div style="margin-bottom: 0.375rem;"><strong style="font-weight: 600;">Choice G ("I'd perfected the skill of"):</strong> "Perfected" indicates complete mastery, exceeding moderate proficiency.</div>
<div style="margin-bottom: 0.375rem;"><strong style="font-weight: 600;">Choice H ("I still struggled with"):</strong> Indicates difficulty, not proficiency.</div>
<div><strong style="font-weight: 600;">Choice J ("I'd tried my hand at"):</strong> Suggests mere attempt, not achieving proficiency.</div>
</div>
</div>`
  },
  {
    test: 3,
    question: 45,
    explanation: `<div style="line-height: 1.6; margin-bottom: 0.75rem; color: #000000;">
The correct answer is <strong style="font-weight: 600;">C (Our load of high-quality wood would become beautiful furniture or flooring, complete with an immersing backstory)</strong> because it references both the past (the logs' history) and future (what they'll become), effectively concluding the narrative arc.
</div>

<div>
<strong style="font-size: 0.9375rem; color: #000000; font-weight: 600;">Why Other Answers Are Wrong:</strong>
<div style="margin-top: 0.5rem; line-height: 1.6; color: #000000;">
<div style="margin-bottom: 0.375rem;"><strong style="font-weight: 600;">Choice A (NO CHANGE):</strong> Focuses only on salvaging logistics, not past and future.</div>
<div style="margin-bottom: 0.375rem;"><strong style="font-weight: 600;">Choice B:</strong> Discusses the wood quality but doesn't connect past history to future use.</div>
<div><strong style="font-weight: 600;">Choice D:</strong> Focuses only on the immediate return trip, not the broader narrative.</div>
</div>
</div>`
  },
  // Passage 4: Meenakshi Wadhwa Meteorite Scientist (Q46-60)
  {
    test: 3,
    question: 46,
    explanation: `<div style="line-height: 1.6; margin-bottom: 0.75rem; color: #000000;">
The correct answer is <strong style="font-weight: 600;">H (was pursuing her PhD)</strong> because it creates a complete independent clause before "when." The semicolon in the original creates a fragment after it.
</div>

<div>
<strong style="font-size: 0.9375rem; color: #000000; font-weight: 600;">Why Other Answers Are Wrong:</strong>
<div style="margin-top: 0.5rem; line-height: 1.6; color: #000000;">
<div style="margin-bottom: 0.375rem;"><strong style="font-weight: 600;">Choice F (NO CHANGE):</strong> The semicolon after "PhD" is incorrect because what follows isn't an independent clause.</div>
<div style="margin-bottom: 0.375rem;"><strong style="font-weight: 600;">Choice G ("in pursuit of her PhD"):</strong> Creates a fragment without a main verb.</div>
<div><strong style="font-weight: 600;">Choice J ("pursuing her PhD"):</strong> Also creates a fragment lacking a helping verb.</div>
</div>
</div>`
  },
  {
    test: 3,
    question: 47,
    explanation: `<div style="line-height: 1.6; margin-bottom: 0.75rem; color: #000000;">
The correct answer is <strong style="font-weight: 600;">B (her if she wanted to see a meteorite)</strong> because no comma is needed before "if" in an indirect question. The phrase flows naturally without punctuation breaks.
</div>

<div>
<strong style="font-size: 0.9375rem; color: #000000; font-weight: 600;">Why Other Answers Are Wrong:</strong>
<div style="margin-top: 0.5rem; line-height: 1.6; color: #000000;">
<div style="margin-bottom: 0.375rem;"><strong style="font-weight: 600;">Choice A (NO CHANGE):</strong> The comma after "her" incorrectly breaks up the indirect question.</div>
<div style="margin-bottom: 0.375rem;"><strong style="font-weight: 600;">Choice C:</strong> Commas around "if she wanted to see a meteorite" are unnecessary.</div>
<div><strong style="font-weight: 600;">Choice D:</strong> The comma after "wanted" illogically separates the verb from its infinitive "to see."</div>
</div>
</div>`
  },
  {
    test: 3,
    question: 48,
    explanation: `<div style="line-height: 1.6; margin-bottom: 0.75rem; color: #000000;">
The correct answer is <strong style="font-weight: 600;">J (The)</strong> because "ever since" at the end already indicates ongoing duration from the past. Adding "Thereafter," "After that day," or "Since then" creates redundancy.
</div>

<div>
<strong style="font-size: 0.9375rem; color: #000000; font-weight: 600;">Why Other Answers Are Wrong:</strong>
<div style="margin-top: 0.5rem; line-height: 1.6; color: #000000;">
<div style="margin-bottom: 0.375rem;"><strong style="font-weight: 600;">Choice F (NO CHANGE - "Thereafter, the"):</strong> Redundant with "ever since."</div>
<div style="margin-bottom: 0.375rem;"><strong style="font-weight: 600;">Choice G ("After that day, the"):</strong> Also redundant with "ever since."</div>
<div><strong style="font-weight: 600;">Choice H ("Since then, the"):</strong> Creates the same redundancy issue.</div>
</div>
</div>`
  },
  {
    test: 3,
    question: 49,
    explanation: `<div style="line-height: 1.6; margin-bottom: 0.75rem; color: #000000;">
The correct answer is <strong style="font-weight: 600;">C (where)</strong> because "where" correctly introduces a relative clause describing the location where she conducted research. It's concise and grammatically correct.
</div>

<div>
<strong style="font-size: 0.9375rem; color: #000000; font-weight: 600;">Why Other Answers Are Wrong:</strong>
<div style="margin-top: 0.5rem; line-height: 1.6; color: #000000;">
<div style="margin-bottom: 0.375rem;"><strong style="font-weight: 600;">Choice A (NO CHANGE - "there"):</strong> "There" creates a run-on; needs "where" to properly connect the clauses.</div>
<div style="margin-bottom: 0.375rem;"><strong style="font-weight: 600;">Choice B ("it was there that"):</strong> Wordy and awkward.</div>
<div><strong style="font-weight: 600;">Choice D (DELETE):</strong> Creates a run-on sentence without proper connection between clauses.</div>
</div>
</div>`
  },
  {
    test: 3,
    question: 50,
    explanation: `<div style="line-height: 1.6; margin-bottom: 0.75rem; color: #000000;">
The correct answer is <strong style="font-weight: 600;">H (hinted at)</strong> because mass spectrometers provide clues and suggestions about processes, not definitive identifications of complex geological processes—they require interpretation.
</div>

<div>
<strong style="font-size: 0.9375rem; color: #000000; font-weight: 600;">Why Other Answers Are Wrong:</strong>
<div style="margin-top: 0.5rem; line-height: 1.6; color: #000000;">
<div style="margin-bottom: 0.375rem;"><strong style="font-weight: 600;">Choice F (NO CHANGE - "identified"):</strong> Too definitive; suggests certainty that spectrometry alone can't provide.</div>
<div style="margin-bottom: 0.375rem;"><strong style="font-weight: 600;">Choice G ("determined"):</strong> Also too definitive and certain.</div>
<div><strong style="font-weight: 600;">Choice J ("showed"):</strong> Less precise than "hinted at" for this scientific context.</div>
</div>
</div>`
  },
  {
    test: 3,
    question: 51,
    explanation: `<div style="line-height: 1.6; margin-bottom: 0.75rem; color: #000000;">
The correct answer is <strong style="font-weight: 600;">A (NO CHANGE - "helped")</strong> because it's the simplest, clearest verb that accurately describes how the information aided Wadhwa's understanding. The alternatives are unnecessarily formal synonyms.
</div>

<div>
<strong style="font-size: 0.9375rem; color: #000000; font-weight: 600;">Why Other Answers Are Wrong:</strong>
<div style="margin-top: 0.5rem; line-height: 1.6; color: #000000;">
<div style="margin-bottom: 0.375rem;"><strong style="font-weight: 600;">Choice B ("facilitated"):</strong> Overly formal and pretentious.</div>
<div style="margin-bottom: 0.375rem;"><strong style="font-weight: 600;">Choice C ("assisted"):</strong> Also unnecessarily formal for this context.</div>
<div><strong style="font-weight: 600;">Choice D ("aided"):</strong> More formal than necessary when "helped" works perfectly.</div>
</div>
</div>`
  },
  {
    test: 3,
    question: 52,
    explanation: `<div style="line-height: 1.6; margin-bottom: 0.75rem; color: #000000;">
The correct answer is <strong style="font-weight: 600;">J (Mars and the asteroid belt, the)</strong> because it uses a comma to properly connect the descriptive phrase to the main clause about the collection. This creates proper sentence structure.
</div>

<div>
<strong style="font-size: 0.9375rem; color: #000000; font-weight: 600;">Why Other Answers Are Wrong:</strong>
<div style="margin-top: 0.5rem; line-height: 1.6; color: #000000;">
<div style="margin-bottom: 0.375rem;"><strong style="font-weight: 600;">Choice F (NO CHANGE):</strong> The period creates a fragment "Making the meteorite collection..."</div>
<div style="margin-bottom: 0.375rem;"><strong style="font-weight: 600;">Choice G:</strong> The semicolon is incorrect; what follows isn't independent.</div>
<div><strong style="font-weight: 600;">Choice H:</strong> The period creates the same fragment problem as F.</div>
</div>
</div>`
  },
  {
    test: 3,
    question: 53,
    explanation: `<div style="line-height: 1.6; margin-bottom: 0.75rem; color: #000000;">
The correct answer is <strong style="font-weight: 600;">A (NO CHANGE - "Because")</strong> because it correctly introduces a causal relationship: because meteorites contain pre-Earth material, scientists can learn about early solar system elements.
</div>

<div>
<strong style="font-size: 0.9375rem; color: #000000; font-weight: 600;">Why Other Answers Are Wrong:</strong>
<div style="margin-top: 0.5rem; line-height: 1.6; color: #000000;">
<div style="margin-bottom: 0.375rem;"><strong style="font-weight: 600;">Choice B ("In fact,"):</strong> This adds emphasis but doesn't show the causal connection.</div>
<div style="margin-bottom: 0.375rem;"><strong style="font-weight: 600;">Choice C ("These"):</strong> Makes the sentence about the collection rather than the meteorites' content.</div>
<div><strong style="font-weight: 600;">Choice D ("The"):</strong> Similar problem—shifts focus to the collection.</div>
</div>
</div>`
  },
  {
    test: 3,
    question: 54,
    explanation: `<div style="line-height: 1.6; margin-bottom: 0.75rem; color: #000000;">
The correct answer is <strong style="font-weight: 600;">F (NO CHANGE - "For example,")</strong> because the 2010 study provides a specific example of Wadhwa's research that has "shed light on the early history of the solar system."
</div>

<div>
<strong style="font-size: 0.9375rem; color: #000000; font-weight: 600;">Why Other Answers Are Wrong:</strong>
<div style="margin-top: 0.5rem; line-height: 1.6; color: #000000;">
<div style="margin-bottom: 0.375rem;"><strong style="font-weight: 600;">Choice G ("In other words,"):</strong> The study isn't restating the previous idea; it's providing evidence.</div>
<div style="margin-bottom: 0.375rem;"><strong style="font-weight: 600;">Choice H ("Even so,"):</strong> Suggests contrast, but the sentence supports the previous claim.</div>
<div><strong style="font-weight: 600;">Choice J ("Instead,"):</strong> Incorrectly suggests an alternative rather than an example.</div>
</div>
</div>`
  },
  {
    test: 3,
    question: 55,
    explanation: `<div style="line-height: 1.6; margin-bottom: 0.75rem; color: #000000;">
The correct answer is <strong style="font-weight: 600;">C (supernova that exploded)</strong> because "that exploded" is a restrictive clause identifying which supernova—the one that exploded before planets formed. Restrictive clauses don't use commas.
</div>

<div>
<strong style="font-size: 0.9375rem; color: #000000; font-weight: 600;">Why Other Answers Are Wrong:</strong>
<div style="margin-top: 0.5rem; line-height: 1.6; color: #000000;">
<div style="margin-bottom: 0.375rem;"><strong style="font-weight: 600;">Choice A (NO CHANGE - "supernova exploded"):</strong> Without "that," it's unclear this is one specific supernova.</div>
<div style="margin-bottom: 0.375rem;"><strong style="font-weight: 600;">Choice B ("supernova, which exploded"):</strong> "Which" with commas suggests nonrestrictive, but the timing is essential information.</div>
<div><strong style="font-weight: 600;">Choice D ("supernova, exploding"):</strong> The participial phrase doesn't clearly establish the temporal relationship.</div>
</div>
</div>`
  },
  {
    test: 3,
    question: 56,
    explanation: `<div style="line-height: 1.6; margin-bottom: 0.75rem; color: #000000;">
The correct answer is <strong style="font-weight: 600;">J (No, because it is only loosely related to the content of the paragraph)</strong> because this paragraph discusses Wadhwa's research findings about the solar system's age and formation. Her trips to Antarctica are irrelevant to these discoveries.
</div>

<div>
<strong style="font-size: 0.9375rem; color: #000000; font-weight: 600;">Why Other Answers Are Wrong:</strong>
<div style="margin-top: 0.5rem; line-height: 1.6; color: #000000;">
<div style="margin-bottom: 0.375rem;"><strong style="font-weight: 600;">Choice F:</strong> While it might show passion, it doesn't fit the paragraph's focus on specific research findings.</div>
<div style="margin-bottom: 0.375rem;"><strong style="font-weight: 600;">Choice G:</strong> Antarctica trips don't demonstrate expertise relevant to these discoveries.</div>
<div><strong style="font-weight: 600;">Choice H:</strong> This information wasn't discussed earlier.</div>
</div>
</div>`
  },
  {
    test: 3,
    question: 57,
    explanation: `<div style="line-height: 1.6; margin-bottom: 0.75rem; color: #000000;">
The correct answer is <strong style="font-weight: 600;">A (NO CHANGE - "her,")</strong> because "earned her" is correct—the honors earned her (Wadhwa), making "her" the correct object pronoun.
</div>

<div>
<strong style="font-size: 0.9375rem; color: #000000; font-weight: 600;">Why Other Answers Are Wrong:</strong>
<div style="margin-top: 0.5rem; line-height: 1.6; color: #000000;">
<div style="margin-bottom: 0.375rem;"><strong style="font-weight: 600;">Choice B ("herself,"):</strong> Reflexive pronoun is unnecessary here.</div>
<div style="margin-bottom: 0.375rem;"><strong style="font-weight: 600;">Choice C ("itself,"):</strong> Wrong pronoun; "itself" would refer to the research, not Wadhwa.</div>
<div><strong style="font-weight: 600;">Choice D ("for it,"):</strong> Changes the meaning incorrectly.</div>
</div>
</div>`
  },
  {
    test: 3,
    question: 58,
    explanation: `<div style="line-height: 1.6; margin-bottom: 0.75rem; color: #000000;">
The correct answer is <strong style="font-weight: 600;">H (astronomers Carolyn)</strong> because "Carolyn and Gene Shoemaker" form a compound name that doesn't require comma separation. "Astronomers" is followed directly by their names.
</div>

<div>
<strong style="font-size: 0.9375rem; color: #000000; font-weight: 600;">Why Other Answers Are Wrong:</strong>
<div style="margin-top: 0.5rem; line-height: 1.6; color: #000000;">
<div style="margin-bottom: 0.375rem;"><strong style="font-weight: 600;">Choice F (NO CHANGE):</strong> The comma after "Carolyn" incorrectly separates the first and last names.</div>
<div style="margin-bottom: 0.375rem;"><strong style="font-weight: 600;">Choice G:</strong> Same error with the comma.</div>
<div><strong style="font-weight: 600;">Choice J:</strong> A semicolon is completely inappropriate here.</div>
</div>
</div>`
  },
  {
    test: 3,
    question: 59,
    explanation: `<div style="line-height: 1.6; margin-bottom: 0.75rem; color: #000000;">
The correct answer is <strong style="font-weight: 600;">B (Planet, meaning that one day,)</strong> because "one day" needs to be set off by commas as a parenthetical time reference within the phrase "meaning that one day...she just might have an impact."
</div>

<div>
<strong style="font-size: 0.9375rem; color: #000000; font-weight: 600;">Why Other Answers Are Wrong:</strong>
<div style="margin-top: 0.5rem; line-height: 1.6; color: #000000;">
<div style="margin-bottom: 0.375rem;"><strong style="font-weight: 600;">Choice A (NO CHANGE):</strong> Missing space after "Red" creates "RedPlanet."</div>
<div style="margin-bottom: 0.375rem;"><strong style="font-weight: 600;">Choice C:</strong> The comma after "that" is incorrect placement.</div>
<div><strong style="font-weight: 600;">Choice D:</strong> Comma after "meaning" disrupts the phrase structure.</div>
</div>
</div>`
  },
  {
    test: 3,
    question: 60,
    explanation: `<div style="line-height: 1.6; margin-bottom: 0.75rem; color: #000000;">
The correct answer is <strong style="font-weight: 600;">F (NO CHANGE - "put it,")</strong> because "as Wadhwa put it" is a common idiom meaning "as Wadhwa expressed it/said it." It's clear and concise.
</div>

<div>
<strong style="font-size: 0.9375rem; color: #000000; font-weight: 600;">Why Other Answers Are Wrong:</strong>
<div style="margin-top: 0.5rem; line-height: 1.6; color: #000000;">
<div style="margin-bottom: 0.375rem;"><strong style="font-weight: 600;">Choice G:</strong> "Herself once verbally said" is redundant and wordy.</div>
<div style="margin-bottom: 0.375rem;"><strong style="font-weight: 600;">Choice H:</strong> "Said in her own words" is redundant—all quotes are in someone's own words.</div>
<div><strong style="font-weight: 600;">Choice J:</strong> "Vocally stated" is redundant since speaking is inherently vocal.</div>
</div>
</div>`
  },
  // Passage 5: Stax Records (Q61-75)
  {
    test: 3,
    question: 61,
    explanation: `<div style="line-height: 1.6; margin-bottom: 0.75rem; color: #000000;">
The correct answer is <strong style="font-weight: 600;">B (may be less renowned than)</strong> because "may be" (two words) is the correct verb phrase, and "than" (not "then") is used for comparisons.
</div>

<div>
<strong style="font-size: 0.9375rem; color: #000000; font-weight: 600;">Why Other Answers Are Wrong:</strong>
<div style="margin-top: 0.5rem; line-height: 1.6; color: #000000;">
<div style="margin-bottom: 0.375rem;"><strong style="font-weight: 600;">Choice A (NO CHANGE - "maybe"):</strong> "Maybe" (one word) is an adverb meaning "perhaps," not the verb phrase needed.</div>
<div style="margin-bottom: 0.375rem;"><strong style="font-weight: 600;">Choice C:</strong> Uses correct "may be" but wrong "then" (should be "than" for comparison).</div>
<div><strong style="font-weight: 600;">Choice D:</strong> Both errors: "maybe" and "then."</div>
</div>
</div>`
  },
  {
    test: 3,
    question: 62,
    explanation: `<div style="line-height: 1.6; margin-bottom: 0.75rem; color: #000000;">
The correct answer is <strong style="font-weight: 600;">H (were no)</strong> because "contributions" is plural (requiring "were") and the sentence describes past events (requiring past tense).
</div>

<div>
<strong style="font-size: 0.9375rem; color: #000000; font-weight: 600;">Why Other Answers Are Wrong:</strong>
<div style="margin-top: 0.5rem; line-height: 1.6; color: #000000;">
<div style="margin-bottom: 0.375rem;"><strong style="font-weight: 600;">Choice F (NO CHANGE - "has been no"):</strong> "Has" is singular, but "contributions" is plural.</div>
<div style="margin-bottom: 0.375rem;"><strong style="font-weight: 600;">Choice G ("wasn't any"):</strong> "Wasn't" is singular; doesn't agree with plural "contributions."</div>
<div><strong style="font-weight: 600;">Choice J ("was no"):</strong> Also singular; doesn't match plural subject.</div>
</div>
</div>`
  },
  {
    test: 3,
    question: 63,
    explanation: `<div style="line-height: 1.6; margin-bottom: 0.75rem; color: #000000;">
The correct answer is <strong style="font-weight: 600;">A (NO CHANGE - "Stax had")</strong> because it clearly and concisely indicates that the soul music coming from Stax possessed this grittier sound. The past tense "had" is appropriate for the historical context.
</div>

<div>
<strong style="font-size: 0.9375rem; color: #000000; font-weight: 600;">Why Other Answers Are Wrong:</strong>
<div style="margin-top: 0.5rem; line-height: 1.6; color: #000000;">
<div style="margin-bottom: 0.375rem;"><strong style="font-weight: 600;">Choice B ("Stax, infused with"):</strong> More wordy and less direct.</div>
<div style="margin-bottom: 0.375rem;"><strong style="font-weight: 600;">Choice C ("Stax, which had"):</strong> Adds unnecessary words.</div>
<div><strong style="font-weight: 600;">Choice D ("Stax with"):</strong> Creates awkward phrasing.</div>
</div>
</div>`
  },
  {
    test: 3,
    question: 64,
    explanation: `<div style="line-height: 1.6; margin-bottom: 0.75rem; color: #000000;">
The correct answer is <strong style="font-weight: 600;">J (who)</strong> because "who" is the correct subject pronoun for people (Jim Stewart and Estelle Axton) and serves as the subject of "loved music."
</div>

<div>
<strong style="font-size: 0.9375rem; color: #000000; font-weight: 600;">Why Other Answers Are Wrong:</strong>
<div style="margin-top: 0.5rem; line-height: 1.6; color: #000000;">
<div style="margin-bottom: 0.375rem;"><strong style="font-weight: 600;">Choice F (NO CHANGE - "themselves whom"):</strong> "Whom" is object form; we need subject form. "Themselves" is also unnecessary.</div>
<div style="margin-bottom: 0.375rem;"><strong style="font-weight: 600;">Choice G ("which"):</strong> "Which" is for things, not people.</div>
<div><strong style="font-weight: 600;">Choice H ("whom"):</strong> Object form, but we need the subject form for "loved music."</div>
</div>
</div>`
  },
  {
    test: 3,
    question: 65,
    explanation: `<div style="line-height: 1.6; margin-bottom: 0.75rem; color: #000000;">
The correct answer is <strong style="font-weight: 600;">A (NO CHANGE - "They knew")</strong> because the contrast word "but" in the next clause creates the necessary contrast. "They knew little about...but they had open minds" works perfectly.
</div>

<div>
<strong style="font-size: 0.9375rem; color: #000000; font-weight: 600;">Why Other Answers Are Wrong:</strong>
<div style="margin-top: 0.5rem; line-height: 1.6; color: #000000;">
<div style="margin-bottom: 0.375rem;"><strong style="font-weight: 600;">Choice B ("Although they knew"):</strong> "Although" makes the sentence fragment when combined with "but."</div>
<div style="margin-bottom: 0.375rem;"><strong style="font-weight: 600;">Choice C ("While knowing"):</strong> Creates awkward phrasing and potential fragment.</div>
<div><strong style="font-weight: 600;">Choice D ("Knowing"):</strong> Creates a participial phrase that doesn't work well with the sentence structure.</div>
</div>
</div>`
  },
  {
    test: 3,
    question: 66,
    explanation: `<div style="line-height: 1.6; margin-bottom: 0.75rem; color: #000000;">
The correct answer is <strong style="font-weight: 600;">J (invited)</strong> because "invited collaboration" is the clearest, most straightforward expression. They invited/welcomed collaborative work.
</div>

<div>
<strong style="font-size: 0.9375rem; color: #000000; font-weight: 600;">Why Other Answers Are Wrong:</strong>
<div style="margin-top: 0.5rem; line-height: 1.6; color: #000000;">
<div style="margin-bottom: 0.375rem;"><strong style="font-weight: 600;">Choice F (NO CHANGE - "collected"):</strong> You don't "collect" collaboration; this doesn't make sense.</div>
<div style="margin-bottom: 0.375rem;"><strong style="font-weight: 600;">Choice G ("summoned"):</strong> Too formal and authoritative; implies commanding rather than welcoming.</div>
<div><strong style="font-weight: 600;">Choice H ("convened"):</strong> Means to call together for a meeting; doesn't fit "collaboration" as object.</div>
</div>
</div>`
  },
  {
    test: 3,
    question: 67,
    explanation: `<div style="line-height: 1.6; margin-bottom: 0.75rem; color: #000000;">
The correct answer is <strong style="font-weight: 600;">A (helps explain why talented artists would join a fledgling studio run by people with little experience in the industry)</strong> because the detail that bigger studios ignored these artists explains why they'd be attracted to Stax's open-door policy despite the founders' inexperience.
</div>

<div>
<strong style="font-size: 0.9375rem; color: #000000; font-weight: 600;">Why Other Answers Are Wrong:</strong>
<div style="margin-top: 0.5rem; line-height: 1.6; color: #000000;">
<div style="margin-bottom: 0.375rem;"><strong style="font-weight: 600;">Choice B:</strong> Doesn't suggest why they were overlooked.</div>
<div style="margin-bottom: 0.375rem;"><strong style="font-weight: 600;">Choice C:</strong> Doesn't indicate that bigger studios felt threatened.</div>
<div><strong style="font-weight: 600;">Choice D:</strong> That fact is already established in the sentence.</div>
</div>
</div>`
  },
  {
    test: 3,
    question: 68,
    explanation: `<div style="line-height: 1.6; margin-bottom: 0.75rem; color: #000000;">
The correct answer is <strong style="font-weight: 600;">H (all became a part of the musical "conversation" happening there)</strong> because the next paragraph opens by discussing "That conversation," creating a smooth transition and explaining what "conversation" means.
</div>

<div>
<strong style="font-size: 0.9375rem; color: #000000; font-weight: 600;">Why Other Answers Are Wrong:</strong>
<div style="margin-top: 0.5rem; line-height: 1.6; color: #000000;">
<div style="margin-bottom: 0.375rem;"><strong style="font-weight: 600;">Choice F (NO CHANGE):</strong> "Who recorded hits there" doesn't connect to the next paragraph's topic.</div>
<div style="margin-bottom: 0.375rem;"><strong style="font-weight: 600;">Choice G:</strong> Working with founders doesn't transition to the conversation topic.</div>
<div><strong style="font-weight: 600;">Choice J:</strong> Launching careers doesn't set up the conversation discussion.</div>
</div>
</div>`
  },
  {
    test: 3,
    question: 69,
    explanation: `<div style="line-height: 1.6; margin-bottom: 0.75rem; color: #000000;">
The correct answer is <strong style="font-weight: 600;">D (1960s,)</strong> because the comma properly introduces the independent clause that follows. "Despite the pervasive segregation" is an introductory phrase that needs just one comma.
</div>

<div>
<strong style="font-size: 0.9375rem; color: #000000; font-weight: 600;">Why Other Answers Are Wrong:</strong>
<div style="margin-top: 0.5rem; line-height: 1.6; color: #000000;">
<div style="margin-bottom: 0.375rem;"><strong style="font-weight: 600;">Choice A (NO CHANGE - "1960s, when"):</strong> "When" creates a dependent clause that doesn't complete properly.</div>
<div style="margin-bottom: 0.375rem;"><strong style="font-weight: 600;">Choice B ("1960s, during which"):</strong> Also creates an incomplete dependent clause.</div>
<div><strong style="font-weight: 600;">Choice C ("1960s; both"):</strong> Semicolon is incorrect; "both" doesn't introduce an independent clause.</div>
</div>
</div>`
  },
  {
    test: 3,
    question: 70,
    explanation: `<div style="line-height: 1.6; margin-bottom: 0.75rem; color: #000000;">
The correct answer is <strong style="font-weight: 600;">H (contributing)</strong> because it creates a participial phrase "all contributing to Stax's unique sound" that modifies "people." This is concise and grammatically correct.
</div>

<div>
<strong style="font-size: 0.9375rem; color: #000000; font-weight: 600;">Why Other Answers Are Wrong:</strong>
<div style="margin-top: 0.5rem; line-height: 1.6; color: #000000;">
<div style="margin-bottom: 0.375rem;"><strong style="font-weight: 600;">Choice F (NO CHANGE - "were contributing"):</strong> Creates a run-on or fragment; needs different punctuation.</div>
<div style="margin-bottom: 0.375rem;"><strong style="font-weight: 600;">Choice G ("of this contributed"):</strong> Grammatically incorrect and unclear.</div>
<div><strong style="font-weight: 600;">Choice J ("contributed"):</strong> Creates a run-on without proper connection between clauses.</div>
</div>
</div>`
  },
  {
    test: 3,
    question: 71,
    explanation: `<div style="line-height: 1.6; margin-bottom: 0.75rem; color: #000000;">
The correct answer is <strong style="font-weight: 600;">B (studios, performers worked from)</strong> because it properly separates the introductory phrase "At most studios" from the main clause with a comma.
</div>

<div>
<strong style="font-size: 0.9375rem; color: #000000; font-weight: 600;">Why Other Answers Are Wrong:</strong>
<div style="margin-top: 0.5rem; line-height: 1.6; color: #000000;">
<div style="margin-bottom: 0.375rem;"><strong style="font-weight: 600;">Choice A (NO CHANGE):</strong> The comma after "worked" incorrectly separates the verb from its preposition.</div>
<div style="margin-bottom: 0.375rem;"><strong style="font-weight: 600;">Choice C:</strong> Missing the necessary comma after the introductory phrase.</div>
<div><strong style="font-weight: 600;">Choice D:</strong> Incorrectly places comma after "from."</div>
</div>
</div>`
  },
  {
    test: 3,
    question: 72,
    explanation: `<div style="line-height: 1.6; margin-bottom: 0.75rem; color: #000000;">
The correct answer is <strong style="font-weight: 600;">G (In contrast,)</strong> because it signals the contrast between most studios (using sheet music) and Stax (using spontaneous composition). This transition word clarifies the difference.
</div>

<div>
<strong style="font-size: 0.9375rem; color: #000000; font-weight: 600;">Why Other Answers Are Wrong:</strong>
<div style="margin-top: 0.5rem; line-height: 1.6; color: #000000;">
<div style="margin-bottom: 0.375rem;"><strong style="font-weight: 600;">Choice F (NO CHANGE - "For example,"):</strong> Stax isn't an example of studios using sheet music; it's the opposite.</div>
<div style="margin-bottom: 0.375rem;"><strong style="font-weight: 600;">Choice H ("Likewise,"):</strong> Suggests similarity, but Stax's method was different.</div>
<div><strong style="font-weight: 600;">Choice J ("Besides,"):</strong> Adds information but doesn't emphasize the contrast.</div>
</div>
</div>`
  },
  {
    test: 3,
    question: 73,
    explanation: `<div style="line-height: 1.6; margin-bottom: 0.75rem; color: #000000;">
The correct answer is <strong style="font-weight: 600;">B (from)</strong> because "emerged from the collaboration" is the correct idiom. Songs emerge or arise from collaborative work.
</div>

<div>
<strong style="font-size: 0.9375rem; color: #000000; font-weight: 600;">Why Other Answers Are Wrong:</strong>
<div style="margin-top: 0.5rem; line-height: 1.6; color: #000000;">
<div style="margin-bottom: 0.375rem;"><strong style="font-weight: 600;">Choice A (NO CHANGE - "between"):</strong> "Emerged between" is not idiomatic; songs don't emerge between collaboration.</div>
<div style="margin-bottom: 0.375rem;"><strong style="font-weight: 600;">Choice C ("upon"):</strong> "Emerged upon" doesn't fit the meaning.</div>
<div><strong style="font-weight: 600;">Choice D ("to"):</strong> "Emerged to" is not the correct idiom.</div>
</div>
</div>`
  },
  {
    test: 3,
    question: 74,
    explanation: `<div style="line-height: 1.6; margin-bottom: 0.75rem; color: #000000;">
The correct answer is <strong style="font-weight: 600;">J (building)</strong> because no transitional word is needed. "Even the building helped" flows naturally as another example of what made Stax unique, continuing the discussion from previous paragraphs.
</div>

<div>
<strong style="font-size: 0.9375rem; color: #000000; font-weight: 600;">Why Other Answers Are Wrong:</strong>
<div style="margin-top: 0.5rem; line-height: 1.6; color: #000000;">
<div style="margin-bottom: 0.375rem;"><strong style="font-weight: 600;">Choice F (NO CHANGE - "building, for instance,"):</strong> "For instance" is unnecessary.</div>
<div style="margin-bottom: 0.375rem;"><strong style="font-weight: 600;">Choice G ("building, consequently,"):</strong> Incorrectly suggests the building was a result rather than another factor.</div>
<div><strong style="font-weight: 600;">Choice H ("building, however,"):</strong> "However" signals contrast that doesn't exist.</div>
</div>
</div>`
  },
  {
    test: 3,
    question: 75,
    explanation: `<div style="line-height: 1.6; margin-bottom: 0.75rem; color: #000000;">
The correct answer is <strong style="font-weight: 600;">D (Point D in Paragraph 5)</strong> because Point D comes right after mentioning the "rudimentary" recording equipment, setting up a contrast: despite rudimentary equipment that generally couldn't capture depth, the Stax building created exceptional sound quality.
</div>

<div>
<strong style="font-size: 0.9375rem; color: #000000; font-weight: 600;">Why Other Answers Are Wrong:</strong>
<div style="margin-top: 0.5rem; line-height: 1.6; color: #000000;">
<div style="margin-bottom: 0.375rem;"><strong style="font-weight: 600;">Choice A (Point A):</strong> Too early; recording quality hasn't been discussed yet.</div>
<div style="margin-bottom: 0.375rem;"><strong style="font-weight: 600;">Choice B (Point B):</strong> This section discusses the founders, not recording technology.</div>
<div><strong style="font-weight: 600;">Choice C (Point C):</strong> This section discusses integrated staff, not recording quality.</div>
</div>
</div>`
  }
];

async function addExplanations() {
  console.log(`📝 Adding ${EXPLANATIONS.length} Test 3 explanations...\n`);

  let successCount = 0;
  let errorCount = 0;

  for (const item of EXPLANATIONS) {
    try {
      const { data: questions, error: findError } = await supabase
        .from('practice_test_english_questions')
        .select('id, question_number, test_number')
        .eq('test_number', item.test)
        .eq('question_number', item.question)
        .single();

      if (findError || !questions) {
        console.error(`❌ Test ${item.test}, Q${item.question}: Not found`);
        errorCount++;
        continue;
      }

      const { error: updateError } = await supabase
        .from('practice_test_english_questions')
        .update({ explanation: item.explanation })
        .eq('id', questions.id);

      if (updateError) {
        console.error(`❌ Test ${item.test}, Q${item.question}: Update failed -`, updateError.message);
        errorCount++;
      } else {
        console.log(`✅ Test ${item.test}, Q${item.question}: Explanation added`);
        successCount++;
      }
    } catch (err) {
      console.error(`❌ Test ${item.test}, Q${item.question}: Error -`, err.message);
      errorCount++;
    }
  }

  console.log(`\n📊 Results:`);
  console.log(`  ✅ Success: ${successCount}`);
  console.log(`  ❌ Errors: ${errorCount}`);
}

addExplanations()
  .then(() => process.exit(0))
  .catch(err => {
    console.error('Fatal error:', err);
    process.exit(1);
  });
