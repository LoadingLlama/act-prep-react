/**
 * Add explanations to English questions in batches
 * Usage: Update the EXPLANATIONS object below, then run this script
 */

const { createClient } = require('@supabase/supabase-js');
require('dotenv').config();

const supabaseUrl = process.env.REACT_APP_SUPABASE_URL;
const supabaseKey = process.env.REACT_APP_SUPABASE_SERVICE_ROLE_KEY || process.env.REACT_APP_SUPABASE_ANON_KEY;
const supabase = createClient(supabaseUrl, supabaseKey);

// Add explanations here - format: test_number, question_number, explanation HTML
const EXPLANATIONS = [
  {
    test: 2,
    question: 1,
    explanation: `<div style="line-height: 1.6; margin-bottom: 0.75rem; color: #000000;">
The correct answer is <strong style="font-weight: 600;">C (of)</strong> because the idiomatic expression is "ways of doing something," not "ways by doing something." The preposition "of" is required after "ways" when describing methods or manners of accomplishing something.
</div>

<div>
<strong style="font-size: 0.9375rem; color: #000000; font-weight: 600;">Why Other Answers Are Wrong:</strong>
<div style="margin-top: 0.5rem; line-height: 1.6; color: #000000;">
<div style="margin-bottom: 0.375rem;"><strong style="font-weight: 600;">Choice A (NO CHANGE - "by"):</strong> "Ways by imitating" is not idiomatic English. The correct prepositional phrase is "ways of imitating."</div>
<div style="margin-bottom: 0.375rem;"><strong style="font-weight: 600;">Choice B ("with"):</strong> "Ways with imitating" is grammatically incorrect and not idiomatic.</div>
<div><strong style="font-weight: 600;">Choice D ("at"):</strong> "Ways at imitating" is not a standard English expression.</div>
</div>
</div>`
  },
  {
    test: 2,
    question: 2,
    explanation: `<div style="line-height: 1.6; margin-bottom: 0.75rem; color: #000000;">
The correct answer is <strong style="font-weight: 600;">H (is)</strong> because the subject "the genre" is singular and requires the simple present tense verb "is" to indicate a current state. The sentence describes a present fact about mouth music's popularity.
</div>

<div>
<strong style="font-size: 0.9375rem; color: #000000; font-weight: 600;">Why Other Answers Are Wrong:</strong>
<div style="margin-top: 0.5rem; line-height: 1.6; color: #000000;">
<div style="margin-bottom: 0.375rem;"><strong style="font-weight: 600;">Choice F (NO CHANGE - "being"):</strong> "Being particularly popular" creates an incomplete verb phrase that lacks the necessary helping verb or proper tense.</div>
<div style="margin-bottom: 0.375rem;"><strong style="font-weight: 600;">Choice G ("was being"):</strong> This past progressive tense incorrectly suggests a temporary state in the past, when the sentence describes a present reality.</div>
<div><strong style="font-weight: 600;">Choice J (DELETE):</strong> Deleting the verb entirely would create a sentence fragment without a main verb.</div>
</div>
</div>`
  },
  {
    test: 2,
    question: 3,
    explanation: `<div style="line-height: 1.6; margin-bottom: 0.75rem; color: #000000;">
The correct answer is <strong style="font-weight: 600;">B (more important than the lyrics)</strong> because it maintains the formal, academic tone established throughout the passage. This choice provides a clear, straightforward comparison between rhythm and lyrics without using informal or colloquial language.
</div>

<div>
<strong style="font-size: 0.9375rem; color: #000000; font-weight: 600;">Why Other Answers Are Wrong:</strong>
<div style="margin-top: 0.5rem; line-height: 1.6; color: #000000;">
<div style="margin-bottom: 0.375rem;"><strong style="font-weight: 600;">Choice A (NO CHANGE - "first-class and the words take a back seat"):</strong> This uses informal, colloquial expressions like "first-class" and "take a back seat" that clash with the passage's formal tone.</div>
<div style="margin-bottom: 0.375rem;"><strong style="font-weight: 600;">Choice C ("a bigger deal than the words"):</strong> "A bigger deal" is too casual and informal for this academic passage about musical traditions.</div>
<div><strong style="font-weight: 600;">Choice D ("way more vital than verse"):</strong> "Way more vital" is extremely informal slang, and "verse" doesn't accurately describe the lyrics being discussed.</div>
</div>
</div>`
  },
  {
    test: 2,
    question: 4,
    explanation: `<div style="line-height: 1.6; margin-bottom: 0.75rem; color: #000000;">
The correct answer is <strong style="font-weight: 600;">H (syllables, called vocables,)</strong> because the phrase "called vocables" is a nonrestrictive appositive that provides additional, non-essential information about the syllables. Nonrestrictive appositives require commas before and after to set them off from the main clause.
</div>

<div>
<strong style="font-size: 0.9375rem; color: #000000; font-weight: 600;">Why Other Answers Are Wrong:</strong>
<div style="margin-top: 0.5rem; line-height: 1.6; color: #000000;">
<div style="margin-bottom: 0.375rem;"><strong style="font-weight: 600;">Choice F (NO CHANGE - "syllables called vocables"):</strong> Without commas, this incorrectly suggests that only specific syllables called vocables are being discussed, rather than providing additional information about all the syllables.</div>
<div style="margin-bottom: 0.375rem;"><strong style="font-weight: 600;">Choice G ("syllables, called vocables,"):</strong> This is identical to choice H and would also be correct if it were a distinct option.</div>
<div><strong style="font-weight: 600;">Choice J ("syllables called, vocables,"):</strong> The comma placement is incorrect, breaking up the phrase "called vocables" inappropriately.</div>
</div>
</div>`
  },
  {
    test: 2,
    question: 5,
    explanation: `<div style="line-height: 1.6; margin-bottom: 0.75rem; color: #000000;">
The correct answer is <strong style="font-weight: 600;">C (that is easy)</strong> because the sentence is not making a comparison but rather describing a quality of the songs. The relative clause "that is easy to dance to" correctly modifies "way" to indicate the manner in which the songs flow.
</div>

<div>
<strong style="font-size: 0.9375rem; color: #000000; font-weight: 600;">Why Other Answers Are Wrong:</strong>
<div style="margin-top: 0.5rem; line-height: 1.6; color: #000000;">
<div style="margin-bottom: 0.375rem;"><strong style="font-weight: 600;">Choice A (NO CHANGE - "easier"):</strong> The comparative adjective "easier" requires a comparison ("easier than something"), but no comparison is being made here.</div>
<div style="margin-bottom: 0.375rem;"><strong style="font-weight: 600;">Choice B ("easily"):</strong> This adverb doesn't grammatically fit the structure of "in a way easily to dance to," which is awkward and unidiomatic.</div>
<div><strong style="font-weight: 600;">Choice D (DELETE):</strong> Deleting the underlined portion would result in "flow in a way to dance to," which is incomplete and doesn't properly describe the quality being discussed.</div>
</div>
</div>`
  },
  {
    test: 2,
    question: 6,
    explanation: `<div style="line-height: 1.6; margin-bottom: 0.75rem; color: #000000;">
The correct answer is <strong style="font-weight: 600;">F (a description that emphasizes the difficulty of puirt-a-beul)</strong> because the phrase "often tongue-twisting" directly communicates how challenging the lyrics are to perform, emphasizing the skill required to sing puirt-a-beul.
</div>

<div>
<strong style="font-size: 0.9375rem; color: #000000; font-weight: 600;">Why Other Answers Are Wrong:</strong>
<div style="margin-top: 0.5rem; line-height: 1.6; color: #000000;">
<div style="margin-bottom: 0.375rem;"><strong style="font-weight: 600;">Choice G:</strong> The phrase doesn't provide information about how to write lyrics for puirt-a-beul; it describes the difficulty of performing existing lyrics.</div>
<div style="margin-bottom: 0.375rem;"><strong style="font-weight: 600;">Choice H:</strong> The phrase doesn't indicate frequency of performance but rather describes the nature of the lyrics themselves.</div>
<div><strong style="font-weight: 600;">Choice J:</strong> This phrase is not an example of a training exercise; it's a description of the lyrics' challenging nature.</div>
</div>
</div>`
  },
  {
    test: 2,
    question: 7,
    explanation: `<div style="line-height: 1.6; margin-bottom: 0.75rem; color: #000000;">
The correct answer is <strong style="font-weight: 600;">A (NO CHANGE - "though")</strong> because "though" properly indicates a contrast between the difficulty of the "tongue-twisting lyrics" and an even greater challenge (learning when to breathe). This transition word effectively shows that breathing timing is the more significant difficulty.
</div>

<div>
<strong style="font-size: 0.9375rem; color: #000000; font-weight: 600;">Why Other Answers Are Wrong:</strong>
<div style="margin-top: 0.5rem; line-height: 1.6; color: #000000;">
<div style="margin-bottom: 0.375rem;"><strong style="font-weight: 600;">Choice B ("at the same time,"):</strong> This suggests simultaneity rather than contrast, which doesn't capture the relationship between the two challenges being discussed.</div>
<div style="margin-bottom: 0.375rem;"><strong style="font-weight: 600;">Choice C ("this time,"):</strong> This creates a confusing temporal reference that doesn't make logical sense in the context.</div>
<div><strong style="font-weight: 600;">Choice D ("still,"):</strong> While "still" can indicate contrast, it's less effective here than "though" and changes the emphasis of the sentence.</div>
</div>
</div>`
  },
  {
    test: 2,
    question: 8,
    explanation: `<div style="line-height: 1.6; margin-bottom: 0.75rem; color: #000000;">
The correct answer is <strong style="font-weight: 600;">G (dancers rely)</strong> because the clause is describing what the dancers do, not what the beat does. The dancers rely on the steady beat to help time their steps. Using "dancers" as the subject makes the meaning clear and specific.
</div>

<div>
<strong style="font-size: 0.9375rem; color: #000000; font-weight: 600;">Why Other Answers Are Wrong:</strong>
<div style="margin-top: 0.5rem; line-height: 1.6; color: #000000;">
<div style="margin-bottom: 0.375rem;"><strong style="font-weight: 600;">Choice F (NO CHANGE - "it relies"):</strong> The pronoun "it" is ambiguous and seems to refer to "beat," which doesn't make sense—the beat doesn't rely on helping the dancers.</div>
<div style="margin-bottom: 0.375rem;"><strong style="font-weight: 600;">Choice H ("they rely"):</strong> While "they" could refer to dancers, "dancers rely" is more direct and clear, avoiding any potential ambiguity.</div>
<div><strong style="font-weight: 600;">Choice J ("relied"):</strong> The past tense is inconsistent with the present tense used throughout the passage to describe ongoing practices.</div>
</div>
</div>`
  },
  {
    test: 2,
    question: 9,
    explanation: `<div style="line-height: 1.6; margin-bottom: 0.75rem; color: #000000;">
The correct answer is <strong style="font-weight: 600;">A (Puirt-a-beul was most likely invented out of necessity)</strong> because the paragraph goes on to explain the historical context of why puirt-a-beul emerged: instruments were expensive and scarce, so mouth music filled that void. This sentence effectively introduces the topic of the paragraph's historical explanation.
</div>

<div>
<strong style="font-size: 0.9375rem; color: #000000; font-weight: 600;">Why Other Answers Are Wrong:</strong>
<div style="margin-top: 0.5rem; line-height: 1.6; color: #000000;">
<div style="margin-bottom: 0.375rem;"><strong style="font-weight: 600;">Choice B:</strong> While rhythm is mentioned earlier, this paragraph focuses on the historical origins of puirt-a-beul, not the technical skills required to perform it.</div>
<div style="margin-bottom: 0.375rem;"><strong style="font-weight: 600;">Choice C:</strong> The paragraph doesn't discuss jazz or scat singing; it focuses on the historical reasons for puirt-a-beul's creation in Scotland.</div>
<div><strong style="font-weight: 600;">Choice D:</strong> The waulking song is not discussed in this paragraph, which focuses specifically on why puirt-a-beul was invented.</div>
</div>
</div>`
  },
  {
    test: 2,
    question: 10,
    explanation: `<div style="line-height: 1.6; margin-bottom: 0.75rem; color: #000000;">
The correct answer is <strong style="font-weight: 600;">H (villages. In)</strong> because the original creates a run-on sentence with two independent clauses. The period correctly separates "Instruments were prohibitively expensive and thus scarce in isolated Scottish villages" from "In order to fill the void, mouth music emerged," creating two complete, properly punctuated sentences.
</div>

<div>
<strong style="font-size: 0.9375rem; color: #000000; font-weight: 600;">Why Other Answers Are Wrong:</strong>
<div style="margin-top: 0.5rem; line-height: 1.6; color: #000000;">
<div style="margin-bottom: 0.375rem;"><strong style="font-weight: 600;">Choice F (NO CHANGE - "villages in"):</strong> This creates a run-on sentence by joining two independent clauses with only a preposition.</div>
<div style="margin-bottom: 0.375rem;"><strong style="font-weight: 600;">Choice G ("villages and in"):</strong> Using "and" here is illogical because "in order to fill the void" is not parallel to "in isolated Scottish villages."</div>
<div><strong style="font-weight: 600;">Choice J ("villages, in"):</strong> A comma alone is insufficient to separate two independent clauses, creating a comma splice error.</div>
</div>
</div>`
  },
  {
    test: 2,
    question: 11,
    explanation: `<div style="line-height: 1.6; margin-bottom: 0.75rem; color: #000000;">
The correct answer is <strong style="font-weight: 600;">D (who)</strong> because "who" is the correct relative pronoun for referring to people (anyone) and serves as the subject of the relative clause "who didn't read music."
</div>

<div>
<strong style="font-size: 0.9375rem; color: #000000; font-weight: 600;">Why Other Answers Are Wrong:</strong>
<div style="margin-top: 0.5rem; line-height: 1.6; color: #000000;">
<div style="margin-bottom: 0.375rem;"><strong style="font-weight: 600;">Choice A (NO CHANGE - "whomever"):</strong> "Whomever" is the object form of the pronoun, but here we need the subject form because the pronoun is performing the action "didn't read."</div>
<div style="margin-bottom: 0.375rem;"><strong style="font-weight: 600;">Choice B ("which"):</strong> "Which" is used for things, not people. Since "anyone" refers to people, "who" is required.</div>
<div><strong style="font-weight: 600;">Choice C ("whom"):</strong> "Whom" is the object form, but we need the subject form "who" because the pronoun is the subject of "didn't read music."</div>
</div>
</div>`
  },
  {
    test: 2,
    question: 12,
    explanation: `<div style="line-height: 1.6; margin-bottom: 0.75rem; color: #000000;">
The correct answer is <strong style="font-weight: 600;">G (this musical form)</strong> because it provides a clear, specific reference to Celtic mouth music. The vague pronoun "them" in the original is ambiguous and could potentially refer to multiple nouns in the previous sentence.
</div>

<div>
<strong style="font-size: 0.9375rem; color: #000000; font-weight: 600;">Why Other Answers Are Wrong:</strong>
<div style="margin-top: 0.5rem; line-height: 1.6; color: #000000;">
<div style="margin-bottom: 0.375rem;"><strong style="font-weight: 600;">Choice F (NO CHANGE - "them"):</strong> This pronoun is vague and could refer to the songs, the singers, or the musical form itself. Clarity requires a specific noun.</div>
<div style="margin-bottom: 0.375rem;"><strong style="font-weight: 600;">Choice H ("itself"):</strong> While "itself" is singular (which is correct), "this musical form" is more specific and clear about what is being referenced.</div>
<div><strong style="font-weight: 600;">Choice J ("one"):</strong> "One" is too vague and generic; it doesn't clearly indicate what is enduring.</div>
</div>
</div>`
  },
  {
    test: 2,
    question: 13,
    explanation: `<div style="line-height: 1.6; margin-bottom: 0.75rem; color: #000000;">
The correct answer is <strong style="font-weight: 600;">B (exposing audiences worldwide to Celtic mouth music)</strong> because it uses the correct word order and preposition. "Exposing audiences to music" is the idiomatic expression, and "worldwide" correctly modifies "audiences."
</div>

<div>
<strong style="font-size: 0.9375rem; color: #000000; font-weight: 600;">Why Other Answers Are Wrong:</strong>
<div style="margin-top: 0.5rem; line-height: 1.6; color: #000000;">
<div style="margin-bottom: 0.375rem;"><strong style="font-weight: 600;">Choice A (NO CHANGE - "exposing with audiences Celtic mouth music worldwide"):</strong> "Exposing with audiences" is unidiomatic; the correct preposition is "to" (exposing audiences to music). The word order is also awkward.</div>
<div style="margin-bottom: 0.375rem;"><strong style="font-weight: 600;">Choice C ("worldwide exposing Celtic mouth music to audiences"):</strong> The placement of "worldwide" at the beginning creates an awkward construction. It more naturally modifies "audiences."</div>
<div><strong style="font-weight: 600;">Choice D ("worldwide exposing Celtic mouth music audiences"):</strong> This is missing the preposition "to" and creates confusion about what is being exposed. The sentence structure is unclear.</div>
</div>
</div>`
  },
  {
    test: 2,
    question: 14,
    explanation: `<div style="line-height: 1.6; margin-bottom: 0.75rem; color: #000000;">
The correct answer is <strong style="font-weight: 600;">J (endures)</strong> because it is concise and precise, conveying the meaning that the bands' celebrity continues to exist without unnecessary words. The passage maintains a formal tone that values economy of expression.
</div>

<div>
<strong style="font-size: 0.9375rem; color: #000000; font-weight: 600;">Why Other Answers Are Wrong:</strong>
<div style="margin-top: 0.5rem; line-height: 1.6; color: #000000;">
<div style="margin-bottom: 0.375rem;"><strong style="font-weight: 600;">Choice F (NO CHANGE - "continually survives"):</strong> This is redundant because "continually" and "survives" both convey ongoing existence. "Endures" captures both meanings in one word.</div>
<div style="margin-bottom: 0.375rem;"><strong style="font-weight: 600;">Choice G ("still remains and carries on"):</strong> This is wordy and redundant, using three words ("still," "remains," and "carries on") to express what "endures" conveys in one word.</div>
<div><strong style="font-weight: 600;">Choice H ("stays sticking around"):</strong> This is informal and colloquial, with "sticking around" being too casual for the passage's academic tone.</div>
</div>
</div>`
  },
  {
    test: 2,
    question: 15,
    explanation: `<div style="line-height: 1.6; margin-bottom: 0.75rem; color: #000000;">
The correct answer is <strong style="font-weight: 600;">A (NO CHANGE - "combine traditional mouth music with modern rhythms")</strong> because it directly addresses the question's requirement to show how the bands incorporate both classic Celtic music and current influences. The phrase explicitly mentions both "traditional mouth music" and "modern rhythms."
</div>

<div>
<strong style="font-size: 0.9375rem; color: #000000; font-weight: 600;">Why Other Answers Are Wrong:</strong>
<div style="margin-top: 0.5rem; line-height: 1.6; color: #000000;">
<div style="margin-bottom: 0.375rem;"><strong style="font-weight: 600;">Choice B ("continue to produce new music and release new albums"):</strong> While this shows the bands are active, it doesn't specifically indicate that they combine traditional and modern elements.</div>
<div style="margin-bottom: 0.375rem;"><strong style="font-weight: 600;">Choice C ("put on concerts around the world"):</strong> This describes their performance activity but says nothing about incorporating both classic and current musical influences.</div>
<div><strong style="font-weight: 600;">Choice D ("sing and dance on stage"):</strong> This describes their performance style but doesn't address the blending of traditional and modern music that the question asks about.</div>
</div>
</div>`
  },
  {
    test: 2,
    question: 16,
    explanation: `<div style="line-height: 1.6; margin-bottom: 0.75rem; color: #000000;">
The correct answer is <strong style="font-weight: 600;">D (Romans called the Garamantes)</strong> because repeating "the" before "Romans" is redundant. The sentence should read: "a people the Romans called the Garamantes," where "the Romans called the Garamantes" is an appositive phrase that renames "a people."
</div>

<div>
<strong style="font-size: 0.9375rem; color: #000000; font-weight: 600;">Why Other Answers Are Wrong:</strong>
<div style="margin-top: 0.5rem; line-height: 1.6; color: #000000;">
<div style="margin-bottom: 0.375rem;"><strong style="font-weight: 600;">Choice A (NO CHANGE - "the Romans, called the Garamantes,"):</strong> The double "the" before "the Romans" is redundant and grammatically incorrect.</div>
<div style="margin-bottom: 0.375rem;"><strong style="font-weight: 600;">Choice B ("Romans called the Garamantes,"):</strong> This version is missing "the" before "Romans," which is needed for proper noun usage in this context.</div>
<div><strong style="font-weight: 600;">Choice C ("Romans called: the Garamantes"):</strong> The colon is inappropriate here; no punctuation or only a comma is needed in this appositive construction.</div>
</div>
</div>`
  },
  {
    test: 2,
    question: 17,
    explanation: `<div style="line-height: 1.6; margin-bottom: 0.75rem; color: #000000;">
The correct answer is <strong style="font-weight: 600;">C (manufactured cloth)</strong> because it maintains parallel structure with the other items in the list ("built towns," "manufactured cloth," "traded"). Using the simple past tense verb keeps the list concise and grammatically consistent.
</div>

<div>
<strong style="font-size: 0.9375rem; color: #000000; font-weight: 600;">Why Other Answers Are Wrong:</strong>
<div style="margin-top: 0.5rem; line-height: 1.6; color: #000000;">
<div style="margin-bottom: 0.375rem;"><strong style="font-weight: 600;">Choice A (NO CHANGE - "cloth was manufactured there"):</strong> This breaks the parallel structure of the list and uses passive voice, which is inconsistent with the active verbs "built" and "traded."</div>
<div style="margin-bottom: 0.375rem;"><strong style="font-weight: 600;">Choice B ("the manufacture of cloth took place"):</strong> This is wordy and breaks parallel structure. The list needs simple past tense verbs.</div>
<div><strong style="font-weight: 600;">Choice D ("cloth"):</strong> Just "cloth" without a verb doesn't make sense in the context. The sentence describes actions they performed, not just items.</div>
</div>
</div>`
  },
  {
    test: 2,
    question: 18,
    explanation: `<div style="line-height: 1.6; margin-bottom: 0.75rem; color: #000000;">
The correct answer is <strong style="font-weight: 600;">F (suggests the Garamantes were successful farmers in that they grew a variety of crops)</strong> because the preceding sentence lists the various crops they grew (wheat, dates, palms, grapes, figs, and melons), which demonstrates their agricultural success and variety. Deleting this sentence would remove this evidence of their farming achievements.
</div>

<div>
<strong style="font-size: 0.9375rem; color: #000000; font-weight: 600;">Why Other Answers Are Wrong:</strong>
<div style="margin-top: 0.5rem; line-height: 1.6; color: #000000;">
<div style="margin-bottom: 0.375rem;"><strong style="font-weight: 600;">Choice G:</strong> The sentence doesn't summarize all the information about the Garamantes; it specifically focuses on their crop diversity.</div>
<div style="margin-bottom: 0.375rem;"><strong style="font-weight: 600;">Choice H:</strong> The sentence doesn't mention exports to Rome; it lists crops they grew, not what they exported.</div>
<div><strong style="font-weight: 600;">Choice D:</strong> The sentence maintains focus on the Garamantes themselves, not on products they imported.</div>
</div>
</div>`
  },
  {
    test: 2,
    question: 19,
    explanation: `<div style="line-height: 1.6; margin-bottom: 0.75rem; color: #000000;">
The correct answer is <strong style="font-weight: 600;">A (NO CHANGE - "in the distant mountains")</strong> because this provides new, specific information about where the aquifer was located. The geographical detail helps readers understand the scale and engineering challenge of the foggara system.
</div>

<div>
<strong style="font-size: 0.9375rem; color: #000000; font-weight: 600;">Why Other Answers Are Wrong:</strong>
<div style="margin-top: 0.5rem; line-height: 1.6; color: #000000;">
<div style="margin-bottom: 0.375rem;"><strong style="font-weight: 600;">Choice B ("upon which they depended"):</strong> This doesn't provide new information; the essay already establishes that the Garamantes depended on water.</div>
<div style="margin-bottom: 0.375rem;"><strong style="font-weight: 600;">Choice C ("used by the Garamantes"):</strong> This is already clear from context and doesn't add new information.</div>
<div><strong style="font-weight: 600;">Choice D ("a key to their survival"):</strong> The passage already establishes this idea in the opening of the paragraph, so it's redundant rather than new information.</div>
</div>
</div>`
  },
  {
    test: 2,
    question: 20,
    explanation: `<div style="line-height: 1.6; margin-bottom: 0.75rem; color: #000000;">
The correct answer is <strong style="font-weight: 600;">F (NO CHANGE - "hand-dug")</strong> because it specifically indicates the method used to construct the tunnels—they were dug by hand. This detail emphasizes the remarkable engineering feat accomplished by the Garamantes without modern equipment.
</div>

<div>
<strong style="font-size: 0.9375rem; color: #000000; font-weight: 600;">Why Other Answers Are Wrong:</strong>
<div style="margin-top: 0.5rem; line-height: 1.6; color: #000000;">
<div style="margin-bottom: 0.375rem;"><strong style="font-weight: 600;">Choice G ("underground"):</strong> While accurate, this doesn't indicate the method; it describes the location, which is already established.</div>
<div style="margin-bottom: 0.375rem;"><strong style="font-weight: 600;">Choice H ("dimly lit"):</strong> This describes conditions inside the tunnels but doesn't indicate how they were built.</div>
<div><strong style="font-weight: 600;">Choice J ("desert"):</strong> This describes the location but not the construction method.</div>
</div>
</div>`
  },
  {
    test: 2,
    question: 21,
    explanation: `<div style="line-height: 1.6; margin-bottom: 0.75rem; color: #000000;">
The correct answer is <strong style="font-weight: 600;">B (more easily)</strong> because "easily" is an adverb that correctly modifies the adjective "accessible." The comparative form "more easily" is needed to show that surface canals are easier to access than deep underground tunnels.
</div>

<div>
<strong style="font-size: 0.9375rem; color: #000000; font-weight: 600;">Why Other Answers Are Wrong:</strong>
<div style="margin-top: 0.5rem; line-height: 1.6; color: #000000;">
<div style="margin-bottom: 0.375rem;"><strong style="font-weight: 600;">Choice A (NO CHANGE - "more easy accessible"):</strong> "Easy" is an adjective and cannot modify another adjective ("accessible"). An adverb is needed.</div>
<div style="margin-bottom: 0.375rem;"><strong style="font-weight: 600;">Choice C ("easier and"):</strong> Using "easier and accessible" creates a faulty parallel structure and doesn't make grammatical sense.</div>
<div><strong style="font-weight: 600;">Choice D ("easy and"):</strong> "Easy and accessible" doesn't convey the comparative meaning needed here—that surface canals were more accessible than the deep tunnels.</div>
</div>
</div>`
  },
  {
    test: 2,
    question: 22,
    explanation: `<div style="line-height: 1.6; margin-bottom: 0.75rem; color: #000000;">
The correct answer is <strong style="font-weight: 600;">J (Archaeologists)</strong> because it directly and concisely introduces the subject. The phrase "Having left no clues" creates a misplaced modifier—the Garamantes left no clues, not the archaeologists, so this phrase is illogical and should be deleted.
</div>

<div>
<strong style="font-size: 0.9375rem; color: #000000; font-weight: 600;">Why Other Answers Are Wrong:</strong>
<div style="margin-top: 0.5rem; line-height: 1.6; color: #000000;">
<div style="margin-bottom: 0.375rem;"><strong style="font-weight: 600;">Choice F (NO CHANGE - "Having left no clues, archaeologists"):</strong> This creates a misplaced modifier suggesting archaeologists left no clues, when it was the Garamantes who left no clues about their knowledge.</div>
<div style="margin-bottom: 0.375rem;"><strong style="font-weight: 600;">Choice G ("A genuine puzzle to scientists, archaeologists"):</strong> This is awkward and redundant since archaeologists are scientists. The phrasing is also unnecessarily complex.</div>
<div><strong style="font-weight: 600;">Choice H ("Giving no indication, archaeologists"):</strong> Like choice F, this creates a misplaced modifier. Archaeologists aren't giving no indication; rather, the Garamantes left no indication.</div>
</div>
</div>`
  },
  {
    test: 2,
    question: 23,
    explanation: `<div style="line-height: 1.6; margin-bottom: 0.75rem; color: #000000;">
The correct answer is <strong style="font-weight: 600;">B (than from)</strong> because "rather than" is the correct idiomatic expression when making a comparison. The full phrase should be "came from an aquifer rather than from rainfall."
</div>

<div>
<strong style="font-size: 0.9375rem; color: #000000; font-weight: 600;">Why Other Answers Are Wrong:</strong>
<div style="margin-top: 0.5rem; line-height: 1.6; color: #000000;">
<div style="margin-bottom: 0.375rem;"><strong style="font-weight: 600;">Choice A (NO CHANGE - "then from its"):</strong> "Then" is a time indicator, not the comparison word needed here. Additionally, "its" is possessive and doesn't make sense with "rainfall."</div>
<div style="margin-bottom: 0.375rem;"><strong style="font-weight: 600;">Choice C ("then"):</strong> "Then" indicates time sequence, not comparison. The correct word is "than" for comparisons.</div>
<div><strong style="font-weight: 600;">Choice D ("by"):</strong> "Rather by" is not idiomatic. The expression requires "rather than."</div>
</div>
</div>`
  },
  {
    test: 2,
    question: 24,
    explanation: `<div style="line-height: 1.6; margin-bottom: 0.75rem; color: #000000;">
The correct answer is <strong style="font-weight: 600;">H (could rely)</strong> because "could rely" is the correct verb form. "Could of" is a common error; the correct modal verb construction is "could" followed by the base form "rely."
</div>

<div>
<strong style="font-size: 0.9375rem; color: #000000; font-weight: 600;">Why Other Answers Are Wrong:</strong>
<div style="margin-top: 0.5rem; line-height: 1.6; color: #000000;">
<div style="margin-bottom: 0.375rem;"><strong style="font-weight: 600;">Choice F (NO CHANGE - "could of relied"):</strong> "Could of" is always incorrect; it's a mishearing of "could've" (could have). The correct form is "could rely" or "could have relied."</div>
<div style="margin-bottom: 0.375rem;"><strong style="font-weight: 600;">Choice G ("had to of relied"):</strong> This compounds the error with both "had to of" (should be "had to") and adds unnecessary complexity.</div>
<div><strong style="font-weight: 600;">Choice J ("relies"):</strong> The present tense is inconsistent with the past-tense narrative describing the Garamantes' historical practices.</div>
</div>
</div>`
  },
  {
    test: 2,
    question: 25,
    explanation: `<div style="line-height: 1.6; margin-bottom: 0.75rem; color: #000000;">
The correct answer is <strong style="font-weight: 600;">A (NO CHANGE - "Moreover")</strong> because it correctly introduces an additional benefit of the foggara system. The previous sentence discussed practical benefits (clean water, constant supply), and this sentence adds another advantage (air-conditioning), so "moreover" appropriately signals this addition.
</div>

<div>
<strong style="font-size: 0.9375rem; color: #000000; font-weight: 600;">Why Other Answers Are Wrong:</strong>
<div style="margin-top: 0.5rem; line-height: 1.6; color: #000000;">
<div style="margin-bottom: 0.375rem;"><strong style="font-weight: 600;">Choice B ("Nevertheless"):</strong> This indicates contrast, but the sentence is adding support, not contrasting with the previous point.</div>
<div style="margin-bottom: 0.375rem;"><strong style="font-weight: 600;">Choice C ("In contrast"):</strong> This explicitly signals opposition, which is incorrect since the sentence provides another benefit, not a contrasting point.</div>
<div><strong style="font-weight: 600;">Choice D ("Even so"):</strong> This suggests concession or contrast, which doesn't fit the additive relationship between the benefits being described.</div>
</div>
</div>`
  },
  {
    test: 2,
    question: 26,
    explanation: `<div style="line-height: 1.6; margin-bottom: 0.75rem; color: #000000;">
The correct answer is <strong style="font-weight: 600;">J (DELETE)</strong> because "who" creates an incomplete construction. The sentence should simply state "The Garamantes thrived until about 500 CE," making it a complete independent clause. The relative pronoun "who" would require a continuation that isn't provided.
</div>

<div>
<strong style="font-size: 0.9375rem; color: #000000; font-weight: 600;">Why Other Answers Are Wrong:</strong>
<div style="margin-top: 0.5rem; line-height: 1.6; color: #000000;">
<div style="margin-bottom: 0.375rem;"><strong style="font-weight: 600;">Choice F (NO CHANGE - "who"):</strong> "The Garamantes who thrived" suggests only some Garamantes thrived, and the construction is incomplete without additional clause structure.</div>
<div style="margin-bottom: 0.375rem;"><strong style="font-weight: 600;">Choice G ("many of whom"):</strong> This doesn't make sense because "The Garamantes" as a whole is being discussed, not a subset of them.</div>
<div><strong style="font-weight: 600;">Choice H ("having"):</strong> "The Garamantes having thrived" creates a participial phrase that doesn't function as a complete sentence.</div>
</div>
</div>`
  },
  {
    test: 2,
    question: 27,
    explanation: `<div style="line-height: 1.6; margin-bottom: 0.75rem; color: #000000;">
The correct answer is <strong style="font-weight: 600;">A (NO CHANGE - "As")</strong> because it establishes the temporal and causal relationship: at the same time the foggaras supplied less water, the population declined. "As" effectively indicates both the timing and the cause-effect connection.
</div>

<div>
<strong style="font-size: 0.9375rem; color: #000000; font-weight: 600;">Why Other Answers Are Wrong:</strong>
<div style="margin-top: 0.5rem; line-height: 1.6; color: #000000;">
<div style="margin-bottom: 0.375rem;"><strong style="font-weight: 600;">Choice B ("As to when"):</strong> This is awkward and changes the meaning to introduce uncertainty about timing, which is inappropriate here.</div>
<div style="margin-bottom: 0.375rem;"><strong style="font-weight: 600;">Choice C ("Whereas"):</strong> This indicates contrast, but the sentence is showing a causal relationship, not a contrast.</div>
<div><strong style="font-weight: 600;">Choice D ("Though"):</strong> This suggests concession or contrast, which doesn't fit the causal relationship being described.</div>
</div>
</div>`
  },
  {
    test: 2,
    question: 28,
    explanation: `<div style="line-height: 1.6; margin-bottom: 0.75rem; color: #000000;">
The correct answer is <strong style="font-weight: 600;">H (declined. Their)</strong> because this creates two properly separated sentences. The first sentence describes the population decline, and the second describes the civilization's collapse. A period is needed to separate these two independent clauses.
</div>

<div>
<strong style="font-size: 0.9375rem; color: #000000; font-weight: 600;">Why Other Answers Are Wrong:</strong>
<div style="margin-top: 0.5rem; line-height: 1.6; color: #000000;">
<div style="margin-bottom: 0.375rem;"><strong style="font-weight: 600;">Choice F (NO CHANGE - "declined, their"):</strong> This creates a comma splice, incorrectly joining two independent clauses with only a comma.</div>
<div style="margin-bottom: 0.375rem;"><strong style="font-weight: 600;">Choice G ("declined the Garamantes'"):</strong> This creates confusion by suggesting "declined" takes "civilization" as its direct object, which changes the meaning and creates an awkward construction.</div>
<div><strong style="font-weight: 600;">Choice J ("declined their"):</strong> Without punctuation, this creates a run-on sentence joining two independent clauses.</div>
</div>
</div>`
  },
  {
    test: 2,
    question: 29,
    explanation: `<div style="line-height: 1.6; margin-bottom: 0.75rem; color: #000000;">
The correct answer is <strong style="font-weight: 600;">D (DELETE and end with a period)</strong> because "where they can be seen even now" is redundant. The phrase "are still visible" already communicates that they can currently be seen, making the additional phrase wordy and unnecessary.
</div>

<div>
<strong style="font-size: 0.9375rem; color: #000000; font-weight: 600;">Why Other Answers Are Wrong:</strong>
<div style="margin-top: 0.5rem; line-height: 1.6; color: #000000;">
<div style="margin-bottom: 0.375rem;"><strong style="font-weight: 600;">Choice A (NO CHANGE - "where they can be seen even now"):</strong> This is redundant because "still visible" already conveys this information.</div>
<div style="margin-bottom: 0.375rem;"><strong style="font-weight: 600;">Choice B:</strong> This is extremely wordy and redundant, expressing the same idea multiple times.</div>
<div><strong style="font-weight: 600;">Choice C:</strong> Similarly wordy and redundant with phrases like "time gone by" that add no new information.</div>
</div>
</div>`
  },
  {
    test: 2,
    question: 30,
    explanation: `<div style="line-height: 1.6; margin-bottom: 0.75rem; color: #000000;">
The correct answer is <strong style="font-weight: 600;">G (Yes, because it describes the Garamantes' method of bringing water to an otherwise dry area, allowing the Garamantes to thrive there)</strong> because the essay's primary focus is on how the Garamantes overcame the obstacle of extreme desert conditions by creating an ingenious water system (foggaras) that enabled their civilization to survive and prosper.
</div>

<div>
<strong style="font-size: 0.9375rem; color: #000000; font-weight: 600;">Why Other Answers Are Wrong:</strong>
<div style="margin-top: 0.5rem; line-height: 1.6; color: #000000;">
<div style="margin-bottom: 0.375rem;"><strong style="font-weight: 600;">Choice F:</strong> While the essay mentions trade, this is not the primary focus. The natural obstacle and how they overcame it (the foggara system) is the central topic.</div>
<div style="margin-bottom: 0.375rem;"><strong style="font-weight: 600;">Choice H:</strong> Whether the foggaras were natural or man-made is irrelevant. The purpose is about overcoming a natural obstacle (lack of water), which they did through man-made foggaras.</div>
<div><strong style="font-weight: 600;">Choice J:</strong> The foggaras didn't lead to their downfall; depleting the aquifer did. The foggaras themselves were a successful solution that allowed the civilization to thrive for hundreds of years.</div>
</div>
</div>`
  },
  {
    test: 2,
    question: 31,
    explanation: `<div style="line-height: 1.6; margin-bottom: 0.75rem; color: #000000;">
The correct answer is <strong style="font-weight: 600;">D (DELETE)</strong> because "descend" already means "to go down," making "down" redundant. The sentence should simply read "cables descend 2,500 meters into the glacial terrain."
</div>

<div>
<strong style="font-size: 0.9375rem; color: #000000; font-weight: 600;">Why Other Answers Are Wrong:</strong>
<div style="margin-top: 0.5rem; line-height: 1.6; color: #000000;">
<div style="margin-bottom: 0.375rem;"><strong style="font-weight: 600;">Choice A (NO CHANGE - "down"):</strong> This is redundant because "descend" already incorporates the meaning of "down."</div>
<div style="margin-bottom: 0.375rem;"><strong style="font-weight: 600;">Choice B ("down below"):</strong> This compounds the redundancy with even more unnecessary words.</div>
<div><strong style="font-weight: 600;">Choice C ("downwards"):</strong> Like "down," this is redundant since "descend" already indicates downward movement.</div>
</div>
</div>`
  },
  {
    test: 2,
    question: 32,
    explanation: `<div style="line-height: 1.6; margin-bottom: 0.75rem; color: #000000;">
The correct answer is <strong style="font-weight: 600;">G ((DOMs), which are programmed)</strong> because the nonrestrictive relative clause "which are programmed to detect..." provides additional information about all the DOMs and requires a comma after the closing parenthesis. The phrase should not have internal commas that disrupt the abbreviation.
</div>

<div>
<strong style="font-size: 0.9375rem; color: #000000; font-weight: 600;">Why Other Answers Are Wrong:</strong>
<div style="margin-top: 0.5rem; line-height: 1.6; color: #000000;">
<div style="margin-bottom: 0.375rem;"><strong style="font-weight: 600;">Choice F (NO CHANGE - "(DOMs), which, are programmed,"):</strong> The commas around "which" are incorrect. "Which are programmed" is a complete relative clause that shouldn't be broken up.</div>
<div style="margin-bottom: 0.375rem;"><strong style="font-weight: 600;">Choice H ("(DOMs): which are programmed"):</strong> A colon is inappropriate here; a comma is needed to introduce the nonrestrictive clause.</div>
<div><strong style="font-weight: 600;">Choice J ("(DOMs); which are programmed"):</strong> A semicolon incorrectly treats this as two independent clauses when it's actually a dependent relative clause.</div>
</div>
</div>`
  },
  {
    test: 2,
    question: 33,
    explanation: `<div style="line-height: 1.6; margin-bottom: 0.75rem; color: #000000;">
The correct answer is <strong style="font-weight: 600;">B (radiation-)</strong> because the em dash is appropriate for setting off the appositive phrase "a veritable shock wave of photonic energy." The dash provides emphasis and clearly separates the explanatory phrase from the main clause.
</div>

<div>
<strong style="font-size: 0.9375rem; color: #000000; font-weight: 600;">Why Other Answers Are Wrong:</strong>
<div style="margin-top: 0.5rem; line-height: 1.6; color: #000000;">
<div style="margin-bottom: 0.375rem;"><strong style="font-weight: 600;">Choice A (NO CHANGE - "radiation :"):</strong> A colon following a space is inappropriate punctuation here. The colon doesn't fit the grammatical structure.</div>
<div style="margin-bottom: 0.375rem;"><strong style="font-weight: 600;">Choice C ("radiation;"):</strong> A semicolon is incorrect because what follows is not an independent clause.</div>
<div><strong style="font-weight: 600;">Choice D ("radiation"):</strong> Without punctuation, the appositive phrase runs directly into the main text without proper separation, making it confusing.</div>
</div>
</div>`
  },
  {
    test: 2,
    question: 34,
    explanation: `<div style="line-height: 1.6; margin-bottom: 0.75rem; color: #000000;">
The correct answer is <strong style="font-weight: 600;">J (emphasizes how numerous neutrinos are)</strong> because the parenthetical statement "fifty trillion neutrinos pass through your body every second" dramatically illustrates just how countless neutrinos are. This specific number emphasizes their abundance.
</div>

<div>
<strong style="font-size: 0.9375rem; color: #000000; font-weight: 600;">Why Other Answers Are Wrong:</strong>
<div style="margin-top: 0.5rem; line-height: 1.6; color: #000000;">
<div style="margin-bottom: 0.375rem;"><strong style="font-weight: 600;">Choice F:</strong> The parenthetical doesn't explain why neutrinos are weightless; it only demonstrates how many exist.</div>
<div style="margin-bottom: 0.375rem;"><strong style="font-weight: 600;">Choice G:</strong> The information doesn't explain the mechanism of how neutrinos pass through matter.</div>
<div><strong style="font-weight: 600;">Choice H:</strong> The statement doesn't indicate why there are so many neutrinos (the cause); it simply quantifies how many there are.</div>
</div>
</div>`
  },
  {
    test: 2,
    question: 35,
    explanation: `<div style="line-height: 1.6; margin-bottom: 0.75rem; color: #000000;">
The correct answer is <strong style="font-weight: 600;">D (In fact,)</strong> because it introduces a statement that reinforces and builds upon the previous information about neutrinos rarely being affected by matter. The sentence provides a logical consequence: because they're rarely affected, many have traveled unimpeded for billions of years.
</div>

<div>
<strong style="font-size: 0.9375rem; color: #000000; font-weight: 600;">Why Other Answers Are Wrong:</strong>
<div style="margin-top: 0.5rem; line-height: 1.6; color: #000000;">
<div style="margin-bottom: 0.375rem;"><strong style="font-weight: 600;">Choice A (NO CHANGE - "For this purpose"):</strong> This phrase suggests intent or goal, which doesn't make sense. Neutrinos don't travel for a "purpose."</div>
<div style="margin-bottom: 0.375rem;"><strong style="font-weight: 600;">Choice B ("In contrast,"):</strong> This signals opposition, but the sentence supports rather than contrasts with the previous point.</div>
<div><strong style="font-weight: 600;">Choice C ("Besides,"):</strong> While this could work, it suggests an addition of unrelated information rather than a logical consequence of what was just stated.</div>
</div>
</div>`
  },
  {
    test: 2,
    question: 36,
    explanation: `<div style="line-height: 1.6; margin-bottom: 0.75rem; color: #000000;">
The correct answer is <strong style="font-weight: 600;">G (occasions, however,)</strong> because "however" is a transitional adverb that requires commas on both sides when it appears in the middle of a sentence. This correctly punctuates the contrast between neutrinos rarely colliding and occasionally colliding.
</div>

<div>
<strong style="font-size: 0.9375rem; color: #000000; font-weight: 600;">Why Other Answers Are Wrong:</strong>
<div style="margin-top: 0.5rem; line-height: 1.6; color: #000000;">
<div style="margin-bottom: 0.375rem;"><strong style="font-weight: 600;">Choice F (NO CHANGE - "occasions however;"):</strong> A semicolon after "however" is incorrect; the word needs a comma after it when used as a transitional adverb.</div>
<div style="margin-bottom: 0.375rem;"><strong style="font-weight: 600;">Choice H ("occasions however;"):</strong> This lacks the comma before "however" and uses an incorrect semicolon after it.</div>
<div><strong style="font-weight: 600;">Choice J ("occasions, however"):</strong> While it has a comma before "however," it's missing the necessary comma after "however."</div>
</div>
</div>`
  },
  {
    test: 2,
    question: 37,
    explanation: `<div style="line-height: 1.6; margin-bottom: 0.75rem; color: #000000;">
The correct answer is <strong style="font-weight: 600;">C (No, because the information is unrelated to the discussion of why scientists selected the location of the IceCube Neutrino Observatory)</strong> because this paragraph focuses specifically on the features of the Antarctic location that make it ideal for detection (clear ice, low pressure). The 1956 experiment is historical context that doesn't explain the site selection.
</div>

<div>
<strong style="font-size: 0.9375rem; color: #000000; font-weight: 600;">Why Other Answers Are Wrong:</strong>
<div style="margin-top: 0.5rem; line-height: 1.6; color: #000000;">
<div style="margin-bottom: 0.375rem;"><strong style="font-weight: 600;">Choice A:</strong> The paragraph doesn't outline a history of neutrino detection; it explains why the IceCube location was chosen.</div>
<div style="margin-bottom: 0.375rem;"><strong style="font-weight: 600;">Choice B:</strong> The information about the 1956 experiment doesn't indicate anything about subzero altitude being essential.</div>
<div><strong style="font-weight: 600;">Choice D:</strong> The passage doesn't discuss zero-gravity conditions at all; it mentions subzero altitude and pressure.</div>
</div>
</div>`
  },
  {
    test: 2,
    question: 38,
    explanation: `<div style="line-height: 1.6; margin-bottom: 0.75rem; color: #000000;">
The correct answer is <strong style="font-weight: 600;">F (NO CHANGE - "Observatory to")</strong> because "selected the site of the IceCube Neutrino Observatory to facilitate the detection" is a complete, grammatically correct construction. The infinitive "to facilitate" properly expresses the purpose of the site selection.
</div>

<div>
<strong style="font-size: 0.9375rem; color: #000000; font-weight: 600;">Why Other Answers Are Wrong:</strong>
<div style="margin-top: 0.5rem; line-height: 1.6; color: #000000;">
<div style="margin-bottom: 0.375rem;"><strong style="font-weight: 600;">Choice G ("Observatory, and to"):</strong> The comma and "and" incorrectly suggest "to facilitate" is a separate, parallel element rather than the purpose of the selection.</div>
<div style="margin-bottom: 0.375rem;"><strong style="font-weight: 600;">Choice H ("Observatory. To"):</strong> This creates a sentence fragment. "To facilitate the detection" cannot stand alone as a complete sentence.</div>
<div><strong style="font-weight: 600;">Choice J ("Observatory; to"):</strong> A semicolon requires an independent clause to follow, but "to facilitate" is not an independent clause.</div>
</div>
</div>`
  },
  {
    test: 2,
    question: 39,
    explanation: `<div style="line-height: 1.6; margin-bottom: 0.75rem; color: #000000;">
The correct answer is <strong style="font-weight: 600;">C (its)</strong> because "its" is the possessive form of "it," referring to the ice's altitude. The sentence discusses the subzero altitude belonging to or characterizing the Antarctic ice.
</div>

<div>
<strong style="font-size: 0.9375rem; color: #000000; font-weight: 600;">Why Other Answers Are Wrong:</strong>
<div style="margin-top: 0.5rem; line-height: 1.6; color: #000000;">
<div style="margin-bottom: 0.375rem;"><strong style="font-weight: 600;">Choice A (NO CHANGE - "it's"):</strong> "It's" is a contraction meaning "it is," which doesn't make grammatical sense here. "Due to it is subzero altitude" is incorrect.</div>
<div style="margin-bottom: 0.375rem;"><strong style="font-weight: 600;">Choice B ("their"):</strong> "Their" is plural, but the antecedent is "ice," which is singular.</div>
<div><strong style="font-weight: 600;">Choice D ("its'"):</strong> This form doesn't exist. The possessive form of "it" is "its" without an apostrophe.</div>
</div>
</div>`
  },
  {
    test: 2,
    question: 40,
    explanation: `<div style="line-height: 1.6; margin-bottom: 0.75rem; color: #000000;">
The correct answer is <strong style="font-weight: 600;">F (NO CHANGE - "is")</strong> because the subject "origin" is singular, requiring the singular verb "is." The phrase "the origin of each of these neutrinos" takes a singular verb even though "neutrinos" is plural, because "origin" is the head noun.
</div>

<div>
<strong style="font-size: 0.9375rem; color: #000000; font-weight: 600;">Why Other Answers Are Wrong:</strong>
<div style="margin-top: 0.5rem; line-height: 1.6; color: #000000;">
<div style="margin-bottom: 0.375rem;"><strong style="font-weight: 600;">Choice G ("have been"):</strong> This is plural and past perfect tense, which doesn't agree with the singular subject "origin."</div>
<div style="margin-bottom: 0.375rem;"><strong style="font-weight: 600;">Choice H ("are being"):</strong> This is plural, which doesn't match the singular "origin."</div>
<div><strong style="font-weight: 600;">Choice J ("are"):</strong> This plural verb doesn't agree with the singular subject "origin."</div>
</div>
</div>`
  },
  {
    test: 2,
    question: 41,
    explanation: `<div style="line-height: 1.6; margin-bottom: 0.75rem; color: #000000;">
The correct answer is <strong style="font-weight: 600;">A (NO CHANGE - "Determining neutrinos' origins could provide scientists with new insights into the universe")</strong> because this directly introduces the paragraph's main idea: that understanding where neutrinos come from will help scientists learn about cosmic phenomena like supernovae.
</div>

<div>
<strong style="font-size: 0.9375rem; color: #000000; font-weight: 600;">Why Other Answers Are Wrong:</strong>
<div style="margin-top: 0.5rem; line-height: 1.6; color: #000000;">
<div style="margin-bottom: 0.375rem;"><strong style="font-weight: 600;">Choice B:</strong> The paragraph doesn't focus on gamma rays; it discusses neutrinos and what they can teach us about supernovae.</div>
<div style="margin-bottom: 0.375rem;"><strong style="font-weight: 600;">Choice C:</strong> While perhaps interesting, naming two neutrinos "Bert and Ernie" is a trivial detail that doesn't introduce the main idea about scientific insights.</div>
<div><strong style="font-weight: 600;">Choice D:</strong> The paragraph discusses detecting naturally occurring neutrinos, not creating them in laboratories.</div>
</div>
</div>`
  },
  {
    test: 2,
    question: 42,
    explanation: `<div style="line-height: 1.6; margin-bottom: 0.75rem; color: #000000;">
The correct answer is <strong style="font-weight: 600;">F (NO CHANGE - "(the collapsing of stars)")</strong> because the parenthetical definition stands alone as an explanation of "supernovae," and the sentence then continues with "The origins of these neutrinos." No additional punctuation is needed after the closing parenthesis.
</div>

<div>
<strong style="font-size: 0.9375rem; color: #000000; font-weight: 600;">Why Other Answers Are Wrong:</strong>
<div style="margin-top: 0.5rem; line-height: 1.6; color: #000000;">
<div style="margin-bottom: 0.375rem;"><strong style="font-weight: 600;">Choice G ("(the collapsing of stars) and the"):</strong> Adding "and the" incorrectly suggests a list or parallel structure that doesn't exist.</div>
<div style="margin-bottom: 0.375rem;"><strong style="font-weight: 600;">Choice H ("(the collapsing of stars), the"):</strong> The comma is unnecessary and interrupts the flow between sentences.</div>
<div><strong style="font-weight: 600;">Choice J ("(the collapsing of stars) the"):</strong> This creates a run-on by not properly separating the two sentences.</div>
</div>
</div>`
  },
  {
    test: 2,
    question: 43,
    explanation: `<div style="line-height: 1.6; margin-bottom: 0.75rem; color: #000000;">
The correct answer is <strong style="font-weight: 600;">B (invaluable)</strong> because it means "extremely valuable" or "priceless," which is appropriate for describing important scientific information about stellar collapse. The context requires a word indicating the information's great worth.
</div>

<div>
<strong style="font-size: 0.9375rem; color: #000000; font-weight: 600;">Why Other Answers Are Wrong:</strong>
<div style="margin-top: 0.5rem; line-height: 1.6; color: #000000;">
<div style="margin-bottom: 0.375rem;"><strong style="font-weight: 600;">Choice A (NO CHANGE - "opulent"):</strong> "Opulent" means luxurious or lavishly wealthy, which doesn't make sense when describing scientific information.</div>
<div style="margin-bottom: 0.375rem;"><strong style="font-weight: 600;">Choice C ("upscale"):</strong> "Upscale" refers to high quality or expensive products/services, not scientific data.</div>
<div><strong style="font-weight: 600;">Choice D ("lavish"):</strong> "Lavish" means extravagant or abundant in a luxurious way, which is inappropriate for describing information.</div>
</div>
</div>`
  },
  {
    test: 2,
    question: 44,
    explanation: `<div style="line-height: 1.6; margin-bottom: 0.75rem; color: #000000;">
The correct answer is <strong style="font-weight: 600;">F (NO CHANGE - "our galaxy—and galaxies beyond")</strong> because this phrase emphasizes the dramatic scope and far-reaching implications of the research. The reference to both our galaxy and galaxies beyond conveys how this could revolutionize our understanding of the entire universe.
</div>

<div>
<strong style="font-size: 0.9375rem; color: #000000; font-weight: 600;">Why Other Answers Are Wrong:</strong>
<div style="margin-top: 0.5rem; line-height: 1.6; color: #000000;">
<div style="margin-bottom: 0.375rem;"><strong style="font-weight: 600;">Choice G ("phenomena that have puzzled scientists over the last decade"):</strong> While this suggests importance, it limits the timeframe and doesn't emphasize the dramatic, universal scope as effectively.</div>
<div style="margin-bottom: 0.375rem;"><strong style="font-weight: 600;">Choice H ("common occurrences in space"):</strong> "Common occurrences" minimizes rather than emphasizes the dramatic effects of the research.</div>
<div><strong style="font-weight: 600;">Choice J ("the world around us"):</strong> This is too limited in scope, focusing on Earth rather than the universe, which undercuts the dramatic implications.</div>
</div>
</div>`
  },
  {
    test: 2,
    question: 45,
    explanation: `<div style="line-height: 1.6; margin-bottom: 0.75rem; color: #000000;">
The correct answer is <strong style="font-weight: 600;">C (No, because it describes instead how neutrinos are detected at an observatory and how these detections could benefit future scientific research)</strong> because the essay's focus is on the detection process at IceCube and the potential applications of that research, not on outlining a theory about neutrino origins.
</div>

<div>
<strong style="font-size: 0.9375rem; color: #000000; font-weight: 600;">Why Other Answers Are Wrong:</strong>
<div style="margin-top: 0.5rem; line-height: 1.6; color: #000000;">
<div style="margin-bottom: 0.375rem;"><strong style="font-weight: 600;">Choice A:</strong> The essay doesn't explain why neutrinos emit Cherenkov radiation; it simply states that they do when they collide with electrons.</div>
<div style="margin-bottom: 0.375rem;"><strong style="font-weight: 600;">Choice B:</strong> The essay doesn't discuss numerous collisions with matter. In fact, it emphasizes that neutrinos rarely collide, which is why detecting them is difficult.</div>
<div><strong style="font-weight: 600;">Choice D:</strong> The essay doesn't detail how research could contradict existing theories about supernovae; it discusses how neutrino detection could provide new information.</div>
</div>
</div>`
  },
  // Passage 4: Rafael Leonardo Black (Q46-60)
  {
    test: 2,
    question: 46,
    explanation: `<div style="line-height: 1.6; margin-bottom: 0.75rem; color: #000000;">
The correct answer is <strong style="font-weight: 600;">F (NO CHANGE - "who")</strong> because "who" is the correct relative pronoun for referring to a person (Rafael Leonardo Black) and serves as the subject of the relative clause "who had just been discovered."
</div>

<div>
<strong style="font-size: 0.9375rem; color: #000000; font-weight: 600;">Why Other Answers Are Wrong:</strong>
<div style="margin-top: 0.5rem; line-height: 1.6; color: #000000;">
<div style="margin-bottom: 0.375rem;"><strong style="font-weight: 600;">Choice G ("of whom"):</strong> This would require different sentence structure. "Of whom" doesn't fit grammatically here.</div>
<div style="margin-bottom: 0.375rem;"><strong style="font-weight: 600;">Choice H ("which"):</strong> "Which" is used for things, not people. Since we're referring to a person (Black), "who" is required.</div>
<div><strong style="font-weight: 600;">Choice J ("whom"):</strong> "Whom" is the object form, but here we need the subject form "who" because the pronoun is the subject of "had just been discovered."</div>
</div>
</div>`
  },
  {
    test: 2,
    question: 47,
    explanation: `<div style="line-height: 1.6; margin-bottom: 0.75rem; color: #000000;">
The correct answer is <strong style="font-weight: 600;">A (NO CHANGE - "a native of Aruba")</strong> because it provides concise, relevant information about Black's background without unnecessary details or redundancy. The phrase is properly set off with commas as a nonrestrictive appositive.
</div>

<div>
<strong style="font-size: 0.9375rem; color: #000000; font-weight: 600;">Why Other Answers Are Wrong:</strong>
<div style="margin-top: 0.5rem; line-height: 1.6; color: #000000;">
<div style="margin-bottom: 0.375rem;"><strong style="font-weight: 600;">Choice B ("originally from Aruba, for more than half his life"):</strong> The phrase "for more than half his life" is incomplete and unclear in this context.</div>
<div style="margin-bottom: 0.375rem;"><strong style="font-weight: 600;">Choice C ("living in Clinton Hill but a native of Aruba"):</strong> The fact that he lives in Clinton Hill was already established in the previous sentence, making this redundant.</div>
<div><strong style="font-weight: 600;">Choice D ("a newly found artist originally from Aruba"):</strong> "Newly found artist" is awkward phrasing and "discovered" was already mentioned in the previous sentence.</div>
</div>
</div>`
  },
  {
    test: 2,
    question: 48,
    explanation: `<div style="line-height: 1.6; margin-bottom: 0.75rem; color: #000000;">
The correct answer is <strong style="font-weight: 600;">F (NO CHANGE - "displayed sixteen of the artist's drawings in a solo show")</strong> because the following sentence discusses how the art sold, which directly connects to the fact that it was displayed in a show. This creates a logical transition.
</div>

<div>
<strong style="font-size: 0.9375rem; color: #000000; font-weight: 600;">Why Other Answers Are Wrong:</strong>
<div style="margin-top: 0.5rem; line-height: 1.6; color: #000000;">
<div style="margin-bottom: 0.375rem;"><strong style="font-weight: 600;">Choice G:</strong> Taking down another exhibition doesn't logically lead to discussing sales of Black's work.</div>
<div style="margin-bottom: 0.375rem;"><strong style="font-weight: 600;">Choice H:</strong> While relevant, this doesn't set up the sales information as effectively as mentioning the actual show.</div>
<div><strong style="font-weight: 600;">Choice J:</strong> This is similar to H but doesn't directly transition to the sales that resulted from the show.</div>
</div>
</div>`
  },
  {
    test: 2,
    question: 49,
    explanation: `<div style="line-height: 1.6; margin-bottom: 0.75rem; color: #000000;">
The correct answer is <strong style="font-weight: 600;">B (sold—for)</strong> because the em dash appropriately sets off the price information, creating emphasis and clarity. The dash indicates that what follows provides additional detail about the sales.
</div>

<div>
<strong style="font-size: 0.9375rem; color: #000000; font-weight: 600;">Why Other Answers Are Wrong:</strong>
<div style="margin-top: 0.5rem; line-height: 1.6; color: #000000;">
<div style="margin-bottom: 0.375rem;"><strong style="font-weight: 600;">Choice A (NO CHANGE - "sold for,"):</strong> A comma after "for" is incorrect and creates an awkward pause.</div>
<div style="margin-bottom: 0.375rem;"><strong style="font-weight: 600;">Choice C ("sold; for"):</strong> A semicolon requires an independent clause to follow, but "for prices ranging..." is not a complete sentence.</div>
<div><strong style="font-weight: 600;">Choice D ("sold for:"):</strong> While a colon can introduce lists or explanations, the em dash is more appropriate here for setting off supplementary information.</div>
</div>
</div>`
  },
  {
    test: 2,
    question: 50,
    explanation: `<div style="line-height: 1.6; margin-bottom: 0.75rem; color: #000000;">
The correct answer is <strong style="font-weight: 600;">G (board. They're)</strong> because these are two independent clauses that need to be separated by a period. "Black draws collages" is one complete thought, and "They're packed with depictions" is another.
</div>

<div>
<strong style="font-size: 0.9375rem; color: #000000; font-weight: 600;">Why Other Answers Are Wrong:</strong>
<div style="margin-top: 0.5rem; line-height: 1.6; color: #000000;">
<div style="margin-bottom: 0.375rem;"><strong style="font-weight: 600;">Choice F (NO CHANGE - "board and they're"):</strong> Using "and" creates a run-on sentence by improperly joining two independent clauses.</div>
<div style="margin-bottom: 0.375rem;"><strong style="font-weight: 600;">Choice H ("board, they're"):</strong> This creates a comma splice, which is incorrect for joining two independent clauses.</div>
<div><strong style="font-weight: 600;">Choice J ("board they're"):</strong> This creates a run-on sentence with no punctuation separating the independent clauses.</div>
</div>
</div>`
  },
  {
    test: 2,
    question: 51,
    explanation: `<div style="line-height: 1.6; margin-bottom: 0.75rem; color: #000000;">
The correct answer is <strong style="font-weight: 600;">D (depictions of)</strong> because it's concise and clear. "Packed with depictions of ancient myths" is direct and avoids redundancy.
</div>

<div>
<strong style="font-size: 0.9375rem; color: #000000; font-weight: 600;">Why Other Answers Are Wrong:</strong>
<div style="margin-top: 0.5rem; line-height: 1.6; color: #000000;">
<div style="margin-bottom: 0.375rem;"><strong style="font-weight: 600;">Choice A (NO CHANGE - "depictions, in the form of drawings, of"):</strong> This is wordy and redundant. The essay already stated he "draws," so "in the form of drawings" is unnecessary.</div>
<div style="margin-bottom: 0.375rem;"><strong style="font-weight: 600;">Choice B ("black pencil drawings that depict"):</strong> Also redundant since we already know he draws in black pencil.</div>
<div><strong style="font-weight: 600;">Choice C ("drawings that create collages of"):</strong> This is confusing because drawings don't create collages; artists do.</div>
</div>
</div>`
  },
  {
    test: 2,
    question: 52,
    explanation: `<div style="line-height: 1.6; margin-bottom: 0.75rem; color: #000000;">
The correct answer is <strong style="font-weight: 600;">J (painter Wilhelm Freddie)</strong> because the name "Wilhelm Freddie" is a restrictive appositive that specifies which Danish surrealist painter is being discussed. Restrictive appositives don't require commas.
</div>

<div>
<strong style="font-size: 0.9375rem; color: #000000; font-weight: 600;">Why Other Answers Are Wrong:</strong>
<div style="margin-top: 0.5rem; line-height: 1.6; color: #000000;">
<div style="margin-bottom: 0.375rem;"><strong style="font-weight: 600;">Choice F (NO CHANGE - "painter, Wilhelm Freddie,"):</strong> The commas suggest this is nonrestrictive information, but the name is essential to identify which painter.</div>
<div style="margin-bottom: 0.375rem;"><strong style="font-weight: 600;">Choice G ("painter Wilhelm Freddie,"):</strong> The comma after the name is incorrect without a comma before it.</div>
<div><strong style="font-weight: 600;">Choice H ("painter, Wilhelm Freddie"):</strong> Only one comma is incorrect; either both should be present (for nonrestrictive) or neither (for restrictive).</div>
</div>
</div>`
  },
  {
    test: 2,
    question: 53,
    explanation: `<div style="line-height: 1.6; margin-bottom: 0.75rem; color: #000000;">
The correct answer is <strong style="font-weight: 600;">A (NO CHANGE - "fit")</strong> because the sentence uses the past tense throughout ("wasn't sure," "could see"), so "fit" (past tense) is consistent with the narrative tense.
</div>

<div>
<strong style="font-size: 0.9375rem; color: #000000; font-weight: 600;">Why Other Answers Are Wrong:</strong>
<div style="margin-top: 0.5rem; line-height: 1.6; color: #000000;">
<div style="margin-bottom: 0.375rem;"><strong style="font-weight: 600;">Choice B ("has fit"):</strong> Present perfect tense is inconsistent with the past tense narrative.</div>
<div style="margin-bottom: 0.375rem;"><strong style="font-weight: 600;">Choice C ("is fit"):</strong> Present tense doesn't match the past tense used throughout the passage.</div>
<div><strong style="font-weight: 600;">Choice D ("fits"):</strong> Present tense is inconsistent with the past-tense narrative describing the narrator's experience.</div>
</div>
</div>`
  },
  {
    test: 2,
    question: 54,
    explanation: `<div style="line-height: 1.6; margin-bottom: 0.75rem; color: #000000;">
The correct answer is <strong style="font-weight: 600;">G (detail indicating that the narrator appreciated Black's collage even though he or she might not have understood its overall intent)</strong> because "but I liked that there was so much for me to puzzle over" shows the narrator enjoyed the complexity despite not fully understanding the logical connections.
</div>

<div>
<strong style="font-size: 0.9375rem; color: #000000; font-weight: 600;">Why Other Answers Are Wrong:</strong>
<div style="margin-top: 0.5rem; line-height: 1.6; color: #000000;">
<div style="margin-bottom: 0.375rem;"><strong style="font-weight: 600;">Choice F:</strong> The statement doesn't argue about why Naumann chose to show the art; it expresses the narrator's personal reaction.</div>
<div style="margin-bottom: 0.375rem;"><strong style="font-weight: 600;">Choice H:</strong> The narrator doesn't indicate enjoying only some of Black's art or express gladness about his discovery.</div>
<div><strong style="font-weight: 600;">Choice J:</strong> The statement doesn't reveal a belief about modern art in general, only the narrator's reaction to this specific piece.</div>
</div>
</div>`
  },
  {
    test: 2,
    question: 55,
    explanation: `<div style="line-height: 1.6; margin-bottom: 0.75rem; color: #000000;">
The correct answer is <strong style="font-weight: 600;">D (after the word "stir" and before the period)</strong> because "in May" refers to when Black's work created a stir (May 2013, when Naumann displayed it). The temporal phrase should be placed at the end of the clause it modifies.
</div>

<div>
<strong style="font-size: 0.9375rem; color: #000000; font-weight: 600;">Why Other Answers Are Wrong:</strong>
<div style="margin-top: 0.5rem; line-height: 1.6; color: #000000;">
<div style="margin-bottom: 0.375rem;"><strong style="font-weight: 600;">Choice A (where it is now):</strong> "In May" appears to modify "complexity," which doesn't make sense. Complexity doesn't happen "in May."</div>
<div style="margin-bottom: 0.375rem;"><strong style="font-weight: 600;">Choice B (after "Maybe"):</strong> This placement is awkward and suggests uncertainty about the timing rather than specifying when the stir occurred.</div>
<div><strong style="font-weight: 600;">Choice C (after "explain"):</strong> This creates confusion about what "in May" modifies.</div>
</div>
</div>`
  },
  {
    test: 2,
    question: 56,
    explanation: `<div style="line-height: 1.6; margin-bottom: 0.75rem; color: #000000;">
The correct answer is <strong style="font-weight: 600;">J (gives little thought to)</strong> because this phrase clearly establishes that Black is unmoved—he doesn't think much about the sudden interest. This directly conveys his indifference.
</div>

<div>
<strong style="font-size: 0.9375rem; color: #000000; font-weight: 600;">Why Other Answers Are Wrong:</strong>
<div style="margin-top: 0.5rem; line-height: 1.6; color: #000000;">
<div style="margin-bottom: 0.375rem;"><strong style="font-weight: 600;">Choice F (NO CHANGE - "is unmoved by"):</strong> While accurate, "gives little thought to" more clearly establishes the claim through active description of his response.</div>
<div style="margin-bottom: 0.375rem;"><strong style="font-weight: 600;">Choice G ("is nearly a celebrity in Clinton Hill due to"):</strong> This contradicts the idea that he's unmoved; it suggests he's affected by the attention.</div>
<div><strong style="font-weight: 600;">Choice H ("has benefited financially from"):</strong> This doesn't indicate whether he's emotionally moved or unmoved by the interest.</div>
</div>
</div>`
  },
  {
    test: 2,
    question: 57,
    explanation: `<div style="line-height: 1.6; margin-bottom: 0.75rem; color: #000000;">
The correct answer is <strong style="font-weight: 600;">C (Now that I know about him,)</strong> because it creates a logical transition from the previous sentence about Black's attitude to the narrator's future plans. "Now that I know about him" explains why the narrator will check for his next show.
</div>

<div>
<strong style="font-size: 0.9375rem; color: #000000; font-weight: 600;">Why Other Answers Are Wrong:</strong>
<div style="margin-top: 0.5rem; line-height: 1.6; color: #000000;">
<div style="margin-bottom: 0.375rem;"><strong style="font-weight: 600;">Choice A (NO CHANGE - "Given that I know the city"):</strong> Knowing the city doesn't logically connect to checking the Times for Black's shows.</div>
<div style="margin-bottom: 0.375rem;"><strong style="font-weight: 600;">Choice B ("Since I'm knowledgeable about art and books"):</strong> This doesn't create a clear transition; knowing about art generally doesn't specifically motivate following Black.</div>
<div><strong style="font-weight: 600;">Choice D ("Knowing that I like news"):</strong> Liking news in general doesn't explain the specific interest in Black's next show.</div>
</div>
</div>`
  },
  {
    test: 2,
    question: 58,
    explanation: `<div style="line-height: 1.6; margin-bottom: 0.75rem; color: #000000;">
The correct answer is <strong style="font-weight: 600;">J (Vintage tonight,)</strong> because it provides relevant temporal information concisely without introducing irrelevant details. The simple phrase keeps the focus on the narrator walking home and wondering about Black's location.
</div>

<div>
<strong style="font-size: 0.9375rem; color: #000000; font-weight: 600;">Why Other Answers Are Wrong:</strong>
<div style="margin-top: 0.5rem; line-height: 1.6; color: #000000;">
<div style="margin-bottom: 0.375rem;"><strong style="font-weight: 600;">Choice A (NO CHANGE):</strong> Information about the café's décor is irrelevant to the paragraph's focus on the narrator's interest in Black.</div>
<div style="margin-bottom: 0.375rem;"><strong style="font-weight: 600;">Choice B:</strong> Details about the laptop and messenger bag are unnecessary and distract from the main point.</div>
<div><strong style="font-weight: 600;">Choice C:</strong> The information about meeting a friend is irrelevant and interrupts the narrative flow.</div>
</div>
</div>`
  },
  {
    test: 2,
    question: 59,
    explanation: `<div style="line-height: 1.6; margin-bottom: 0.75rem; color: #000000;">
The correct answer is <strong style="font-weight: 600;">B (building where Black)</strong> because "where Black creates" is a restrictive relative clause that's essential to identifying which building. Restrictive clauses don't use commas.
</div>

<div>
<strong style="font-size: 0.9375rem; color: #000000; font-weight: 600;">Why Other Answers Are Wrong:</strong>
<div style="margin-top: 0.5rem; line-height: 1.6; color: #000000;">
<div style="margin-bottom: 0.375rem;"><strong style="font-weight: 600;">Choice A (NO CHANGE - "building where Black,"):</strong> The comma incorrectly sets off essential information. Without "where Black creates his art," we don't know which building.</div>
<div style="margin-bottom: 0.375rem;"><strong style="font-weight: 600;">Choice C ("building, where Black"):</strong> The comma before "where" incorrectly treats this as nonessential information.</div>
<div><strong style="font-weight: 600;">Choice D ("building: where Black"):</strong> A colon is inappropriate here; the clause is not an explanation or list.</div>
</div>
</div>`
  },
  {
    test: 2,
    question: 60,
    explanation: `<div style="line-height: 1.6; margin-bottom: 0.75rem; color: #000000;">
The correct answer is <strong style="font-weight: 600;">H (Point C in Paragraph 3)</strong> because Paragraph 3 discusses the Seven Lamps collage and mentions specific figures depicted in it. The sentence about a key identifying these people, places, and events would logically follow this discussion of the collage's complex imagery.
</div>

<div>
<strong style="font-size: 0.9375rem; color: #000000; font-weight: 600;">Why Other Answers Are Wrong:</strong>
<div style="margin-top: 0.5rem; line-height: 1.6; color: #000000;">
<div style="margin-bottom: 0.375rem;"><strong style="font-weight: 600;">Choice F (Point A in Paragraph 1):</strong> The collage hasn't been mentioned yet, so discussing a key to identify its elements would be premature.</div>
<div style="margin-bottom: 0.375rem;"><strong style="font-weight: 600;">Choice G (Point B in Paragraph 2):</strong> This paragraph discusses Black's background and career, not the specific collage that would need the identifying key.</div>
<div><strong style="font-weight: 600;">Choice J (Point D in Paragraph 4):</strong> This paragraph shifts focus to the narrator's reaction and future plans, not the detailed analysis of the collage.</div>
</div>
</div>`
  },
  // Passage 5: Homing Pigeons and Cher Ami (Q61-75)
  {
    test: 2,
    question: 61,
    explanation: `<div style="line-height: 1.6; margin-bottom: 0.75rem; color: #000000;">
The correct answer is <strong style="font-weight: 600;">D (than)</strong> because "more than" is a complete phrase that doesn't require additional punctuation. The sentence should flow: "considered little more than 'rats with wings.'"
</div>

<div>
<strong style="font-size: 0.9375rem; color: #000000; font-weight: 600;">Why Other Answers Are Wrong:</strong>
<div style="margin-top: 0.5rem; line-height: 1.6; color: #000000;">
<div style="margin-bottom: 0.375rem;"><strong style="font-weight: 600;">Choice A (NO CHANGE - "than,"):</strong> The comma incorrectly breaks up the phrase "more than."</div>
<div style="margin-bottom: 0.375rem;"><strong style="font-weight: 600;">Choice B ("than—"):</strong> An em dash is inappropriate here; it would incorrectly separate "more than" from the quotation.</div>
<div><strong style="font-weight: 600;">Choice C ("than;"):</strong> A semicolon requires an independent clause to follow, but the quotation is not an independent clause.</div>
</div>
</div>`
  },
  {
    test: 2,
    question: 62,
    explanation: `<div style="line-height: 1.6; margin-bottom: 0.75rem; color: #000000;">
The correct answer is <strong style="font-weight: 600;">F (NO CHANGE - "wings," blamed")</strong> because "blamed for spreading disease" is a participial phrase that modifies "rats with wings." The comma properly separates the quotation from the modifying phrase.
</div>

<div>
<strong style="font-size: 0.9375rem; color: #000000; font-weight: 600;">Why Other Answers Are Wrong:</strong>
<div style="margin-top: 0.5rem; line-height: 1.6; color: #000000;">
<div style="margin-bottom: 0.375rem;"><strong style="font-weight: 600;">Choice G ("wings" and they are blamed"):</strong> This creates awkward structure and unnecessarily changes the participial phrase to a full clause.</div>
<div style="margin-bottom: 0.375rem;"><strong style="font-weight: 600;">Choice H ("wings," they are blamed"):</strong> This creates a comma splice by joining two independent clauses with only a comma.</div>
<div><strong style="font-weight: 600;">Choice J ("wings." Blamed"):</strong> This creates a sentence fragment. "Blamed for spreading disease" cannot stand alone as a complete sentence.</div>
</div>
</div>`
  },
  {
    test: 2,
    question: 63,
    explanation: `<div style="line-height: 1.6; margin-bottom: 0.75rem; color: #000000;">
The correct answer is <strong style="font-weight: 600;">C (However,)</strong> because it signals a contrast between pigeons' poor reputation (mentioned in previous sentences) and the fact that the homing pigeon is among the best navigators. This transitional word indicates the shift to positive information.
</div>

<div>
<strong style="font-size: 0.9375rem; color: #000000; font-weight: 600;">Why Other Answers Are Wrong:</strong>
<div style="margin-top: 0.5rem; line-height: 1.6; color: #000000;">
<div style="margin-bottom: 0.375rem;"><strong style="font-weight: 600;">Choice A (NO CHANGE - "For example"):</strong> The homing pigeon isn't an example of pigeons with poor reputations; it's a contrast to that idea.</div>
<div style="margin-bottom: 0.375rem;"><strong style="font-weight: 600;">Choice B ("Similarly,"):</strong> This suggests similarity, but the sentence is introducing contrasting positive information.</div>
<div><strong style="font-weight: 600;">Choice D ("Thus,"):</strong> This indicates a logical consequence, but the homing pigeon's abilities don't result from the poor reputation.</div>
</div>
</div>`
  },
  {
    test: 2,
    question: 64,
    explanation: `<div style="line-height: 1.6; margin-bottom: 0.75rem; color: #000000;">
The correct answer is <strong style="font-weight: 600;">H (pigeon,)</strong> because "which is among the best navigators" would be a nonrestrictive clause requiring "which" and commas. However, since we're defining which species we're talking about, we should use just a comma without the relative pronoun to create an appositive.
</div>

<div>
<strong style="font-size: 0.9375rem; color: #000000; font-weight: 600;">Why Other Answers Are Wrong:</strong>
<div style="margin-top: 0.5rem; line-height: 1.6; color: #000000;">
<div style="margin-bottom: 0.375rem;"><strong style="font-weight: 600;">Choice F (NO CHANGE - "pigeon, which"):</strong> While "which" can introduce nonrestrictive clauses, in this context the clause should be an appositive phrase without "which."</div>
<div style="margin-bottom: 0.375rem;"><strong style="font-weight: 600;">Choice G ("pigeon that"):</strong> "That" introduces restrictive clauses and wouldn't use a comma, creating incorrect punctuation.</div>
<div><strong style="font-weight: 600;">Choice J ("pigeon"):</strong> Without a comma, the sentence lacks proper separation between "one species, the homing pigeon" and the descriptive phrase.</div>
</div>
</div>`
  },
  {
    test: 2,
    question: 65,
    explanation: `<div style="line-height: 1.6; margin-bottom: 0.75rem; color: #000000;">
The correct answer is <strong style="font-weight: 600;">D (Its)</strong> because "its" is the possessive form referring to the homing pigeon's navigational abilities. "Its navigational abilities" means "the abilities belonging to it (the homing pigeon)."
</div>

<div>
<strong style="font-size: 0.9375rem; color: #000000; font-weight: 600;">Why Other Answers Are Wrong:</strong>
<div style="margin-top: 0.5rem; line-height: 1.6; color: #000000;">
<div style="margin-bottom: 0.375rem;"><strong style="font-weight: 600;">Choice A (NO CHANGE - "There"):</strong> "There" is a location word or expletive, not a possessive pronoun.</div>
<div style="margin-bottom: 0.375rem;"><strong style="font-weight: 600;">Choice B ("They're"):</strong> "They're" means "they are," which doesn't make sense in "They are navigational abilities."</div>
<div><strong style="font-weight: 600;">Choice C ("It's"):</strong> "It's" means "it is," which doesn't work in "It is navigational abilities."</div>
</div>
</div>`
  },
  {
    test: 2,
    question: 66,
    explanation: `<div style="line-height: 1.6; margin-bottom: 0.75rem; color: #000000;">
The correct answer is <strong style="font-weight: 600;">G (Before)</strong> because the sentence discusses the period before modern technologies existed. "Before modern technologies like the radio or telephone" correctly indicates the historical timeframe.
</div>

<div>
<strong style="font-size: 0.9375rem; color: #000000; font-weight: 600;">Why Other Answers Are Wrong:</strong>
<div style="margin-top: 0.5rem; line-height: 1.6; color: #000000;">
<div style="margin-bottom: 0.375rem;"><strong style="font-weight: 600;">Choice F (NO CHANGE - "Former"):</strong> "Former" means "previous" or "earlier in time," but it's typically used to describe people's past roles, not time periods.</div>
<div style="margin-bottom: 0.375rem;"><strong style="font-weight: 600;">Choice H ("Earlier"):</strong> While closer in meaning, "earlier" alone is vague. "Before" more clearly indicates the temporal relationship.</div>
<div><strong style="font-weight: 600;">Choice J ("Prior"):</strong> "Prior" typically requires "to" (prior to), making this incomplete.</div>
</div>
</div>`
  },
  {
    test: 2,
    question: 67,
    explanation: `<div style="line-height: 1.6; margin-bottom: 0.75rem; color: #000000;">
The correct answer is <strong style="font-weight: 600;">A (Yes, because it offers a better indication of the circumstances that made communication difficult)</strong> because "especially across long distances and difficult terrain" provides specific details about when communication was most challenging, which helps explain why pigeons were useful.
</div>

<div>
<strong style="font-size: 0.9375rem; color: #000000; font-weight: 600;">Why Other Answers Are Wrong:</strong>
<div style="margin-top: 0.5rem; line-height: 1.6; color: #000000;">
<div style="margin-bottom: 0.375rem;"><strong style="font-weight: 600;">Choice B:</strong> The revision doesn't identify specific locations or exact distances; it describes general conditions.</div>
<div style="margin-bottom: 0.375rem;"><strong style="font-weight: 600;">Choice C:</strong> The information is relevant because it explains the context in which homing pigeons were valuable.</div>
<div><strong style="font-weight: 600;">Choice D:</strong> The revision doesn't suggest anything about whether pigeons are necessary today; it discusses historical circumstances.</div>
</div>
</div>`
  },
  {
    test: 2,
    question: 68,
    explanation: `<div style="line-height: 1.6; margin-bottom: 0.75rem; color: #000000;">
The correct answer is <strong style="font-weight: 600;">J (returned)</strong> because "returned" alone conveys the complete meaning. "Returned" already implies coming back, so adding "and came back" is redundant.
</div>

<div>
<strong style="font-size: 0.9375rem; color: #000000; font-weight: 600;">Why Other Answers Are Wrong:</strong>
<div style="margin-top: 0.5rem; line-height: 1.6; color: #000000;">
<div style="margin-bottom: 0.375rem;"><strong style="font-weight: 600;">Choice F (NO CHANGE - "returned and came back"):</strong> This is redundant because "returned" and "came back" mean the same thing.</div>
<div style="margin-bottom: 0.375rem;"><strong style="font-weight: 600;">Choice G ("speedily returned, coming home"):</strong> This is wordy and redundant, using multiple words to express what "returned" conveys alone.</div>
<div><strong style="font-weight: 600;">Choice H ("returned home"):</strong> While less redundant, "home" is still unnecessary since "returned to its home roost" in the next phrase already specifies the destination.</div>
</div>
</div>`
  },
  {
    test: 2,
    question: 69,
    explanation: `<div style="line-height: 1.6; margin-bottom: 0.75rem; color: #000000;">
The correct answer is <strong style="font-weight: 600;">D (Cher Ami flew twelve successful missions)</strong> because it uses clear, direct structure with proper subject-verb-object order. This is the most concise and natural phrasing.
</div>

<div>
<strong style="font-size: 0.9375rem; color: #000000; font-weight: 600;">Why Other Answers Are Wrong:</strong>
<div style="margin-top: 0.5rem; line-height: 1.6; color: #000000;">
<div style="margin-bottom: 0.375rem;"><strong style="font-weight: 600;">Choice A (NO CHANGE - "all twelve of Cher Ami's missions were deemed successful"):</strong> This uses passive voice and is wordier than necessary.</div>
<div style="margin-bottom: 0.375rem;"><strong style="font-weight: 600;">Choice B ("the twelve missions Cher Ami flew were successful"):</strong> While clearer than A, it's still more complex than D's direct structure.</div>
<div><strong style="font-weight: 600;">Choice C ("successful missions by Cher Ami numbered twelve"):</strong> This awkward construction puts the emphasis in the wrong place and sounds unnatural.</div>
</div>
</div>`
  },
  {
    test: 2,
    question: 70,
    explanation: `<div style="line-height: 1.6; margin-bottom: 0.75rem; color: #000000;">
The correct answer is <strong style="font-weight: 600;">J (DELETE)</strong> because "They were separated from other US forces" repeats information already stated in the previous sentence ("the 77th Infantry Division became separated from US forces"). This repetition is unnecessary.
</div>

<div>
<strong style="font-size: 0.9375rem; color: #000000; font-weight: 600;">Why Other Answers Are Wrong:</strong>
<div style="margin-top: 0.5rem; line-height: 1.6; color: #000000;">
<div style="margin-bottom: 0.375rem;"><strong style="font-weight: 600;">Choice F (NO CHANGE):</strong> This repeats the separation information, which is redundant.</div>
<div style="margin-bottom: 0.375rem;"><strong style="font-weight: 600;">Choice G ("German troops were all around them"):</strong> While this rephrases "surrounded by German troops" from the previous sentence, it's also redundant.</div>
<div><strong style="font-weight: 600;">Choice H ("They would soon be out of rations"):</strong> This repeats "rapidly running out of rations" from the previous sentence.</div>
</div>
</div>`
  },
  {
    test: 2,
    question: 71,
    explanation: `<div style="line-height: 1.6; margin-bottom: 0.75rem; color: #000000;">
The correct answer is <strong style="font-weight: 600;">B (headquarters:)</strong> because a colon is appropriate for introducing an explanation or specification. "They had but one link to headquarters: homing pigeons" uses the colon to specify what that link was.
</div>

<div>
<strong style="font-size: 0.9375rem; color: #000000; font-weight: 600;">Why Other Answers Are Wrong:</strong>
<div style="margin-top: 0.5rem; line-height: 1.6; color: #000000;">
<div style="margin-bottom: 0.375rem;"><strong style="font-weight: 600;">Choice A (NO CHANGE - no punctuation):</strong> Without punctuation, "headquarters homing pigeons" reads as a compound noun, which is confusing.</div>
<div style="margin-bottom: 0.375rem;"><strong style="font-weight: 600;">Choice C ("headquarters;"):</strong> A semicolon requires an independent clause to follow, but "homing pigeons" alone is not a complete sentence.</div>
<div><strong style="font-weight: 600;">Choice D ("headquarters,"):</strong> A comma doesn't provide enough separation or emphasis for this important specification.</div>
</div>
</div>`
  },
  {
    test: 2,
    question: 72,
    explanation: `<div style="line-height: 1.6; margin-bottom: 0.75rem; color: #000000;">
The correct answer is <strong style="font-weight: 600;">H (As it became)</strong> because "As" establishes the temporal relationship: as one thing was happening (it became clear), another thing happened (the situation grew dire). This creates a proper dependent clause followed by an independent clause.
</div>

<div>
<strong style="font-size: 0.9375rem; color: #000000; font-weight: 600;">Why Other Answers Are Wrong:</strong>
<div style="margin-top: 0.5rem; line-height: 1.6; color: #000000;">
<div style="margin-bottom: 0.375rem;"><strong style="font-weight: 600;">Choice F (NO CHANGE - "It was becoming"):</strong> This creates a run-on sentence with two independent clauses connected by only a comma.</div>
<div style="margin-bottom: 0.375rem;"><strong style="font-weight: 600;">Choice G ("Having become"):</strong> This participial phrase creates an awkward construction and doesn't establish the temporal relationship as clearly.</div>
<div><strong style="font-weight: 600;">Choice J ("It became"):</strong> This creates a comma splice by joining two independent clauses with only a comma.</div>
</div>
</div>`
  },
  {
    test: 2,
    question: 73,
    explanation: `<div style="line-height: 1.6; margin-bottom: 0.75rem; color: #000000;">
The correct answer is <strong style="font-weight: 600;">A (NO CHANGE - "medal, the")</strong> because "the War Cross" is an appositive that renames "medal." The comma properly introduces this nonrestrictive appositive, and "the" is needed before the specific name of the medal.
</div>

<div>
<strong style="font-size: 0.9375rem; color: #000000; font-weight: 600;">Why Other Answers Are Wrong:</strong>
<div style="margin-top: 0.5rem; line-height: 1.6; color: #000000;">
<div style="margin-bottom: 0.375rem;"><strong style="font-weight: 600;">Choice B ("medal, it was the"):</strong> Adding "it was" creates an awkward, wordy construction.</div>
<div style="margin-bottom: 0.375rem;"><strong style="font-weight: 600;">Choice C ("medal, that was"):</strong> "That was" is unnecessarily wordy for an appositive.</div>
<div><strong style="font-weight: 600;">Choice D ("medal. The"):</strong> Using a period creates two choppy sentences and loses the appositiverelationship.</div>
</div>
</div>`
  },
  {
    test: 2,
    question: 74,
    explanation: `<div style="line-height: 1.6; margin-bottom: 0.75rem; color: #000000;">
The correct answer is <strong style="font-weight: 600;">H (to)</strong> because the idiomatic expression is "the extent to which," not "the extent in which." The preposition "to" is required after "extent" in this context.
</div>

<div>
<strong style="font-size: 0.9375rem; color: #000000; font-weight: 600;">Why Other Answers Are Wrong:</strong>
<div style="margin-top: 0.5rem; line-height: 1.6; color: #000000;">
<div style="margin-bottom: 0.375rem;"><strong style="font-weight: 600;">Choice F (NO CHANGE - "in"):</strong> "The extent in which" is not idiomatic English. The correct phrase is "the extent to which."</div>
<div style="margin-bottom: 0.375rem;"><strong style="font-weight: 600;">Choice G ("of"):</strong> "The extent of which" doesn't work grammatically in this context.</div>
<div><strong style="font-weight: 600;">Choice J (DELETE):</strong> "The extent which" is grammatically incomplete; a preposition is needed.</div>
</div>
</div>`
  },
  {
    test: 2,
    question: 75,
    explanation: `<div style="line-height: 1.6; margin-bottom: 0.75rem; color: #000000;">
The correct answer is <strong style="font-weight: 600;">B (is testimony to the homing pigeon's navigational skill and instinct)</strong> because the passage focuses on the homing pigeon's remarkable navigation abilities, which Cher Ami's story exemplifies. This conclusion ties back to the main theme introduced at the beginning.
</div>

<div>
<strong style="font-size: 0.9375rem; color: #000000; font-weight: 600;">Why Other Answers Are Wrong:</strong>
<div style="margin-top: 0.5rem; line-height: 1.6; color: #000000;">
<div style="margin-bottom: 0.375rem;"><strong style="font-weight: 600;">Choice A (NO CHANGE - "proves that pigeons are unique"):</strong> This is too vague. The passage is specifically about homing pigeons' navigational abilities, not general uniqueness.</div>
<div style="margin-bottom: 0.375rem;"><strong style="font-weight: 600;">Choice C ("has made people reconsider the definition of heroism"):</strong> The passage doesn't discuss redefining heroism; it focuses on the pigeon's practical abilities.</div>
<div><strong style="font-weight: 600;">Choice D ("suggests that even birds can be brave"):</strong> While Cher Ami may have seemed brave, the passage emphasizes instinct and skill, not bravery or consciousness of mission.</div>
</div>
</div>`
  }
];

async function addExplanations() {
  console.log(`📝 Adding ${EXPLANATIONS.length} explanations...\n`);

  let successCount = 0;
  let errorCount = 0;

  for (const item of EXPLANATIONS) {
    try {
      // Find the question
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

      // Update with explanation
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
