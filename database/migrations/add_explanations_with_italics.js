const { createClient } = require('@supabase/supabase-js');
require('dotenv').config();

const supabase = createClient(process.env.REACT_APP_SUPABASE_URL, process.env.SUPABASE_SERVICE_ROLE_KEY);

// Specific explanations with italic formatting using <em> tags
const specificExplanations = {
  'Identifying Sentence Fragments': {
    'A': 'This choice creates a fragment because there is no verb connecting <em>"Fair"</em> to <em>"a new type of diecast toy car."</em>',
    'B': 'This choice creates a fragment. A comma alone cannot connect <em>"Fair"</em> to <em>"a new type"</em> without a verb.',
    'C': 'This choice creates a fragment. A semicolon requires independent clauses on both sides, but <em>"a new type"</em> lacks a verb.',
    'D': 'This choice correctly adds the verb <em>"was"</em> to connect <em>"the toy at the Cincinnati Toy Fair"</em> with <em>"a new type of diecast toy car."</em>'
  },

  'Comma + FANBOYS vs. Comma Splices': {
    'A': 'This choice creates a comma splice. The conjunctive adverb <em>"however"</em> requires a semicolon before it when joining two independent clauses.',
    'B': 'This choice creates a comma splice. The conjunctive adverb <em>"therefore"</em> requires a semicolon before it when joining two independent clauses.',
    'C': 'This choice correctly uses the coordinating conjunction <em>"and"</em> to join the two clauses about the hummingbirds\' evolution.',
    'D': 'This choice removes the necessary connection between <em>"After hummingbirds evolved long, thin beaks"</em> and <em>"this evolutionary advantage allowed them to survive."</em>'
  },

  'Fixing Comma Splices': {
    'A': 'This choice correctly uses the comma + coordinating conjunction <em>", but"</em> to show the contrast between <em>"Hockey is my favorite sport"</em> and <em>"I cannot skate very well."</em>',
    'B': 'This choice creates a run-on sentence by placing the subordinating conjunction <em>"even though"</em> without a comma before it.',
    'C': 'This choice incorrectly uses <em>"so"</em> which suggests causation when the relationship between <em>"my favorite sport"</em> and <em>"cannot skate well"</em> is actually contrast.'
  },

  'Dependent Clauses Creating Fragments': {
    'A': 'This choice creates a fragment. The subordinating conjunction <em>"While"</em> makes <em>"the bakery varies its types of bread"</em> a dependent clause that cannot stand alone.',
    'B': 'This choice creates a fragment. The participial phrase <em>"Having various types of bread"</em> cannot function as the main verb of the sentence.',
    'C': 'This choice creates a fragment. The prepositional phrase <em>"With the bakery having varied bread types"</em> cannot serve as an independent clause.',
    'D': 'This choice correctly creates a complete sentence with <em>"The bakery"</em> as the subject and <em>"varies"</em> as the main verb.'
  },

  'Fragment: Missing Subject': {
    'A': 'This choice creates a fragment because the verb phrase <em>"was raining"</em> lacks a subject.',
    'B': 'This choice correctly adds the impersonal subject <em>"it"</em> required for weather descriptions in English.',
    'C': 'This choice creates a fragment. The gerund <em>"raining"</em> cannot serve as the main verb without a helping verb.',
    'D': 'This choice creates a fragment because the verb phrase <em>"had rained"</em> lacks a subject.'
  },

  'Simple Run-on Sentence': {
    'A': 'This choice creates a run-on sentence by placing two independent clauses <em>"The concert was amazing"</em> and <em>"the band played for two hours"</em> next to each other without proper punctuation or conjunction.',
    'B': 'This choice correctly uses <em>", and the"</em> (comma + FANBOYS conjunction) to properly join the two independent clauses.',
    'C': 'This choice uses a semicolon which is grammatically correct but weakens the additive relationship between the two positive statements.',
    'D': 'This choice creates a comma splice by using only a comma to join the two independent clauses.'
  },

  'Basic Comma Splice': {
    'A': 'This choice creates a comma splice by using only a comma to join the two independent clauses <em>"She studied all night"</em> and <em>"she still felt unprepared."</em>',
    'B': 'This choice correctly uses a semicolon to join the two closely related independent clauses.',
    'C': 'This choice creates a run-on sentence by removing all punctuation between the two independent clauses.',
    'D': 'This choice correctly uses <em>", and she"</em> but the semicolon in B is more concise for closely related clauses.'
  },

  'Fragment: Missing Verb': {
    'A': 'This choice creates a fragment. The present participle <em>"studying"</em> requires a helping verb to function as the main verb of the sentence.',
    'B': 'This choice correctly uses the complete verb phrase <em>"are studying"</em> with the helping verb <em>"are"</em> and present participle <em>"studying."</em>',
    'C': 'This choice changes the meaning to past tense and suggests the studying is complete rather than ongoing.',
    'D': 'This choice creates a fragment. The infinitive <em>"to study"</em> cannot serve as the main verb of the sentence.'
  },

  'FANBOYS: Basic Usage': {
    'A': 'This choice correctly uses a comma before the coordinating conjunction <em>"but"</em> when joining two independent clauses <em>"I wanted to go to the park"</em> and <em>"it started raining."</em>',
    'B': 'This choice lacks the required comma before <em>"but"</em> when joining two independent clauses.',
    'C': 'This choice incorrectly uses a semicolon. FANBOYS conjunctions require a comma, not a semicolon.',
    'D': 'This choice lacks any punctuation before <em>"but"</em> when joining two independent clauses.'
  },

  'Dependent Clause: After': {
    'A': 'This choice creates a run-on sentence by not placing a comma after the introductory dependent clause <em>"After the game ended."</em>',
    'B': 'This choice correctly places a comma after the introductory dependent clause <em>"After the game ended"</em> to separate it from the independent clause <em>"the fans celebrated."</em>',
    'C': 'This choice incorrectly places the comma after <em>"After"</em> which breaks up the dependent clause.',
    'D': 'This choice changes the sentence structure and shifts emphasis away from the fans\' celebration.'
  },

  'Simple Fragment Fix': {
    'A': 'This choice creates a fragment. The relative pronoun <em>"Which"</em> creates a dependent clause that cannot stand alone as a sentence.',
    'B': 'This choice correctly transforms the fragment into an independent clause by using the subject <em>"It"</em> and verb <em>"serves."</em>',
    'C': 'This choice creates a fragment because the verb <em>"Serves"</em> lacks a subject.',
    'D': 'This choice creates a fragment. The relative pronoun <em>"That"</em> creates a dependent clause that cannot stand alone as a sentence.'
  },

  'Comma Splice: However': {
    'A': 'This choice creates a comma splice. The conjunctive adverb <em>"however"</em> requires a semicolon before it (not a comma) when joining two independent clauses.',
    'B': 'This choice correctly uses a semicolon before <em>"however"</em> and a comma after it when joining the two independent clauses about the weather.',
    'C': 'This choice incorrectly combines the coordinating conjunction <em>"and"</em> with the conjunctive adverb <em>"however."</em>',
    'D': 'This choice creates a run-on sentence by removing all punctuation before <em>"however."</em>'
  },

  'Basic Subordinating Conjunction': {
    'A': 'This choice is correct. When a dependent clause beginning with <em>"unless"</em> comes at the end of a sentence, no comma is needed before it.',
    'B': 'This choice incorrectly adds a comma before <em>"unless."</em> Commas are not needed before dependent clauses at the end of sentences.',
    'C': 'This choice incorrectly uses a semicolon. Semicolons join independent clauses, but <em>"unless it rains"</em> is a dependent clause.',
    'D': 'This choice incorrectly places a comma after <em>"unless"</em> which separates the subordinating conjunction from its clause.'
  },

  'Fragment: Because': {
    'A': 'This choice creates a fragment. The dependent clause <em>"Because the library was closed"</em> cannot stand alone as a complete sentence.',
    'B': 'This choice still creates a fragment by ending the dependent clause <em>"Because the library was closed"</em> with implied punctuation before the next sentence.',
    'C': 'This choice correctly places a comma after the introductory dependent clause <em>"Because the library was closed"</em> to connect it to the independent clause <em>"we studied at the coffee shop."</em>',
    'D': 'This choice changes the meaning by removing <em>"Because"</em> and eliminating the causal relationship between the library closing and studying elsewhere.'
  },

  'Complex Comma Splice': {
    'A': 'This choice creates a comma splice. The conjunctive adverb <em>"therefore"</em> requires a semicolon before it when joining two independent clauses.',
    'B': 'This choice correctly uses a semicolon before <em>"therefore"</em> and a comma after it to join the independent clauses about the scientist\'s experiments and findings.',
    'C': 'This choice awkwardly combines <em>"and"</em> with <em>"therefore"</em> creating redundancy.',
    'D': 'This choice creates a run-on sentence by removing all punctuation before <em>"therefore."</em>'
  },

  'Multiple Dependent Clauses': {
    'A': 'This choice creates a run-on sentence by not placing a comma after the dependent clause <em>"While some students preferred online learning."</em>',
    'B': 'This choice correctly places a comma after the dependent clause <em>"While some students preferred online learning"</em> to separate it from the independent clause <em>"others found traditional classrooms more effective."</em>',
    'C': 'This choice incorrectly places a comma after <em>"While"</em> which breaks up the dependent clause.',
    'D': 'This choice removes the subordinating conjunction <em>"While"</em> and changes the emphasis of the contrast.'
  },

  'Semicolon vs. Comma': {
    'A': 'This choice incorrectly uses a semicolon in a simple list. Semicolons are only needed when list items contain internal commas.',
    'B': 'This choice correctly uses commas to separate the simple list items: <em>paintings</em>, <em>sculptures</em>, and <em>artifacts</em>.',
    'C': 'This choice creates a run-on by removing punctuation between the list items.',
    'D': 'This choice incorrectly uses a colon. Colons introduce lists, but here we\'re already within the list.'
  },

  'Run-on with Conjunctive Adverb': {
    'A': 'This choice creates a run-on sentence by placing two independent clauses next to each other without punctuation before <em>"consequently."</em>',
    'B': 'This choice creates a comma splice. The conjunctive adverb <em>"consequently"</em> requires a semicolon before it, not a comma.',
    'C': 'This choice correctly uses a semicolon before <em>"consequently"</em> and a comma after it to join the two independent clauses about practice and winning.',
    'D': 'This choice could work with <em>"; consequently they"</em> but is less concise than C.'
  },

  'Fragment with Participial Phrase': {
    'A': 'This choice correctly uses the participial phrase <em>"having won"</em> to modify the subject <em>"the team"</em> in a complete sentence.',
    'B': 'This choice unnecessarily changes the structure and is wordier than the original.',
    'C': 'This choice creates ambiguity by using <em>"winning"</em> which could be misread as an incomplete verb.',
    'D': 'This choice creates a fragment. <em>"Having won"</em> cannot serve as the main verb of the sentence.'
  },

  'Embedded Dependent Clause': {
    'A': 'This choice correctly uses the restrictive relative clause <em>"that painted the Sistine Chapel"</em> without commas because it is essential to identifying which artist.',
    'B': 'This choice incorrectly adds commas around a restrictive clause. The information about painting the Sistine Chapel is essential to identifying Michelangelo.',
    'C': 'This choice incorrectly uses <em>"which"</em> for a restrictive clause. <em>"Which"</em> is typically used for non-restrictive clauses with commas.',
    'D': 'This choice incorrectly treats the restrictive clause as non-restrictive by adding commas.'
  },

  'Comma Splice with Transition': {
    'A': 'This choice creates a comma splice. The conjunctive adverb <em>"meanwhile"</em> requires a semicolon before it when joining independent clauses.',
    'B': 'This choice correctly uses a semicolon before <em>"meanwhile"</em> and a comma after it to join the two independent clauses.',
    'C': 'This choice incorrectly combines the coordinating conjunction <em>"and"</em> with the conjunctive adverb <em>"meanwhile."</em>',
    'D': 'This choice awkwardly combines <em>"and meanwhile"</em> creating redundancy.'
  },

  'Complex Fragment': {
    'A': 'This choice creates a fragment. The subordinating conjunction <em>"Although"</em> makes <em>"the experiment failed multiple times"</em> a dependent clause that cannot stand alone.',
    'B': 'This choice correctly places a comma after the dependent clause <em>"Although the experiment failed multiple times"</em> to connect it to the independent clause about the scientist continuing.',
    'C': 'This choice removes <em>"Although"</em> and eliminates the contrast between the failures and the scientist\'s persistence.',
    'D': 'This choice creates a fragment using the participial phrase <em>"Having failed multiple times"</em> without a main verb for the sentence.'
  },

  'Misplaced Semicolon': {
    'A': 'This choice incorrectly uses a semicolon after the introductory prepositional phrase <em>"After careful consideration."</em> Semicolons join independent clauses, not introductory phrases.',
    'B': 'This choice creates awkward spacing and structure.',
    'C': 'This choice correctly uses a comma after the introductory phrase <em>"After careful consideration"</em> to separate it from the main clause.',
    'D': 'This choice incorrectly uses a colon. Colons typically introduce lists or explanations, not main clauses.'
  },

  'FANBOYS with Compound Predicate': {
    'A': 'This choice incorrectly uses a comma before <em>"and"</em> when joining a compound predicate. The subject <em>"Maria"</em> performs two actions without needing a comma.',
    'B': 'This choice correctly omits the comma because <em>"studied hard"</em> and <em>"passed the exam"</em> share the same subject <em>"Maria"</em> forming a compound predicate.',
    'C': 'This choice incorrectly uses a semicolon for a compound predicate. Semicolons join independent clauses, but the second verb lacks a subject.',
    'D': 'This choice is redundant and unnecessary.'
  },

  'Non-restrictive Clause': {
    'A': 'This choice lacks commas around the non-restrictive clause <em>"who lives in Boston."</em> This additional information about my cousin is not essential to identifying him.',
    'B': 'This choice correctly uses commas to set off the non-restrictive clause <em>"who lives in Boston"</em> which provides additional but non-essential information.',
    'C': 'This choice incorrectly uses <em>"whom"</em> (which is for objects) when <em>"who"</em> (for subjects) is needed. It also lacks the closing comma.',
    'D': 'This choice lacks the opening comma before <em>"who"</em> to set off the non-restrictive clause.'
  },

  'Run-on with Missing Conjunction': {
    'A': 'This choice creates a run-on sentence by placing two independent clauses <em>"The sun was setting"</em> and <em>"the sky turned orange"</em> next to each other without punctuation or conjunction.',
    'B': 'This choice creates a comma splice by using only a comma to join the two independent clauses.',
    'C': 'This choice lacks the required comma before <em>"and"</em> when joining two independent clauses.',
    'D': 'This choice correctly uses <em>", and the"</em> (comma + FANBOYS) to properly join the two independent clauses about the sunset.'
  },

  'Fragment: Subordinate Clause Only': {
    'A': 'This choice creates a fragment. The subordinating conjunction <em>"When"</em> makes <em>"the bell rang"</em> a dependent clause that cannot stand alone as a complete sentence.',
    'B': 'This choice correctly places a comma after the dependent clause <em>"When the bell rang"</em> to connect it to the independent clause <em>"the students left."</em>',
    'C': 'This choice removes <em>"When"</em> and changes the sentence to remove the time relationship between the bell ringing and students leaving.',
    'D': 'This choice awkwardly combines <em>"When"</em> with <em>"and"</em> creating an unclear structure.'
  },

  'Colon vs. Semicolon': {
    'A': 'This choice incorrectly uses a semicolon to introduce a list. Semicolons join independent clauses, they don\'t introduce lists.',
    'B': 'This choice correctly uses a colon after the independent clause <em>"three countries"</em> to introduce the list: France, Italy, and Spain.',
    'C': 'This choice creates a run-on by removing punctuation between the introduction and the list.',
    'D': 'This choice creates a comma splice by using only a comma before the list.'
  },

  'Comma Splice: Moreover': {
    'A': 'This choice creates a comma splice. The conjunctive adverb <em>"moreover"</em> requires a semicolon before it when joining two independent clauses.',
    'B': 'This choice correctly uses a semicolon before <em>"moreover"</em> and a comma after it to join the two independent clauses about the candidate.',
    'C': 'This choice incorrectly combines the coordinating conjunction <em>"and"</em> with the conjunctive adverb <em>"moreover."</em>',
    'D': 'This choice creates a run-on sentence by removing all punctuation before <em>"moreover."</em>'
  },

  'Fragment: Appositive': {
    'A': 'This choice correctly uses commas to set off the appositive phrase <em>"a renowned physicist"</em> which renames or provides additional information about <em>"Dr. Smith."</em>',
    'B': 'This choice removes the necessary commas that set off the non-essential appositive phrase.',
    'C': 'This choice is unnecessarily wordy compared to the concise appositive construction.',
    'D': 'This choice lacks the opening comma before the appositive phrase.'
  },

  'Dependent Clause: If': {
    'A': 'This choice is correct. When a dependent clause beginning with <em>"if"</em> comes at the end of a sentence, no comma is needed before it.',
    'B': 'This choice incorrectly adds a comma before <em>"if."</em> Commas are not needed before dependent clauses at the end of sentences.',
    'C': 'This choice incorrectly uses a semicolon. Semicolons join independent clauses, but <em>"if you need help"</em> is a dependent clause.',
    'D': 'This choice incorrectly places a comma after <em>"if"</em> which separates the subordinating conjunction from its clause.'
  },

  'Run-on: Missing Punctuation': {
    'A': 'This choice creates a run-on sentence by placing two independent clauses <em>"The movie was entertaining"</em> and <em>"the plot was predictable"</em> next to each other without punctuation.',
    'B': 'This choice creates a comma splice by using only a comma to join the two independent clauses.',
    'C': 'This choice correctly uses a semicolon to join the two closely related independent clauses that contrast entertainment with predictability.',
    'D': 'This choice could work but changes the relationship by using <em>"but"</em> to emphasize contrast more strongly.'
  },

  'Fragment: Verbal Phrase': {
    'A': 'This choice creates a fragment. The infinitive phrase <em>"To complete the project on time"</em> cannot stand alone without a main subject and verb.',
    'B': 'This choice correctly places a comma after the introductory infinitive phrase <em>"To complete the project on time"</em> to connect it to the independent clause <em>"we worked late."</em>',
    'C': 'This choice changes the meaning by using the gerund <em>"Completing"</em> which suggests the action is already happening.',
    'D': 'This choice is awkward and nonstandard in structure.'
  },

  'Comma with Contrasting Element': {
    'A': 'This choice lacks the comma needed before the contrasting element <em>"not complicated."</em> Contrasting elements should be set off with a comma.',
    'B': 'This choice correctly uses a comma before the contrasting phrase <em>"not complicated"</em> to set off the contrast with <em>"simple."</em>',
    'C': 'This choice incorrectly uses a semicolon. Semicolons join independent clauses, but <em>"not complicated"</em> is just a contrasting phrase.',
    'D': 'This choice changes the contrast to a compound structure which alters the emphasis.'
  },

  'Complex Sentence Structure': {
    'A': 'This choice lacks commas around the non-restrictive relative clause <em>"which was completed in 2019"</em> that provides additional but non-essential information about the building.',
    'B': 'This choice lacks the comma before <em>"which"</em> needed to introduce the non-restrictive clause.',
    'C': 'This choice correctly uses commas to set off the non-restrictive clause <em>"which was completed in 2019"</em> providing additional information about the building.',
    'D': 'This choice lacks the comma before the appositive phrase <em>"the building committee."</em>'
  },

  'Embedded Clauses': {
    'A': 'This choice incorrectly uses the restrictive relative pronoun <em>"that"</em> for non-essential information. The fact that Einstein developed relativity is additional info, not essential to identifying him.',
    'B': 'This choice lacks the commas needed to set off the non-restrictive information about Einstein developing relativity.',
    'C': 'This choice incorrectly uses <em>"that"</em> for non-restrictive information without commas.',
    'D': 'This choice correctly uses <em>"which"</em> with commas to set off the non-restrictive clause providing additional information about Einstein.'
  },

  'Semicolon with Complex Items': {
    'A': 'This choice correctly uses semicolons to separate complex list items that contain internal commas: <em>"Paris, France,"</em> <em>"Rome, Italy,"</em> and <em>"Berlin, Germany."</em>',
    'B': 'This choice incorrectly uses only commas, making it unclear where one city ends and the next begins in the list.',
    'C': 'This choice incorrectly uses colons to separate items within an already-introduced list.',
    'D': 'This choice lacks the necessary punctuation to separate the complex list items.'
  },

  'Parallel Structure in Clauses': {
    'A': 'This choice maintains parallel structure in the list of three noun clauses: <em>"how plants grow,"</em> <em>"what animals eat,"</em> and <em>"the factors."</em>',
    'B': 'This choice disrupts the parallel list structure.',
    'C': 'This choice breaks parallel structure by mixing noun clauses (<em>"how plants grow,"</em> <em>"what animals eat"</em>) with a different construction.',
    'D': 'This choice breaks parallel structure with awkward phrasing.'
  },

  'Multiple Sentence Errors': {
    'A': 'This choice creates a run-on sentence by placing two independent clauses next to each other and lacks proper punctuation between <em>"renewable"</em> and <em>"such."</em>',
    'B': 'This choice has inconsistent punctuation by mixing a comma and semicolon inappropriately.',
    'C': 'This choice lacks the comma needed after <em>"fuels"</em> to separate the list introduction from the list items.',
    'D': 'This choice correctly uses a comma after the list items and a period to properly end the sentence.'
  },

  'Restrictive vs. Non-restrictive': {
    'A': 'This choice correctly treats <em>"who won the Nobel Prize"</em> as a restrictive clause without commas because it is essential to identifying which author we\'re discussing.',
    'B': 'This choice incorrectly treats the restrictive clause <em>"who won the Nobel Prize"</em> as non-restrictive by adding commas.',
    'C': 'This choice incorrectly uses <em>"whom"</em> (object form) when <em>"who"</em> (subject form) is needed because the pronoun is the subject of <em>"won."</em>',
    'D': 'This choice incorrectly adds commas around essential information that restricts which author is being discussed.'
  },

  'Conjunctive Adverb Placement': {
    'A': 'This choice lacks the commas needed to set off the conjunctive adverb <em>"however"</em> when it interrupts the middle of an independent clause.',
    'B': 'This choice correctly places commas around <em>"however"</em> to set off the conjunctive adverb that interrupts the independent clause <em>"The plan was not successful."</em>',
    'C': 'This choice changes the sentence structure and emphasis by moving <em>"however"</em> to the beginning.',
    'D': 'This choice lacks the opening comma before <em>"however"</em> needed to set off the interrupting adverb.'
  },

  'Colon with Independent Clauses': {
    'A': 'This choice correctly uses a colon after the independent clause <em>"one reason"</em> to introduce the explanation <em>"it saves time."</em>',
    'B': 'This choice creates a comma splice by using only a comma to connect the two independent clauses.',
    'C': 'This choice could work with a semicolon but the colon better shows that the second clause explains the first.',
    'D': 'This choice creates a run-on sentence by removing all punctuation between the two independent clauses.'
  },

  'Multiple Dependent Clauses': {
    'A': 'This choice correctly maintains parallel structure in the series of three <em>"that"</em> clauses: <em>"that education is important,"</em> <em>"that hard work pays off,"</em> and <em>"that success takes time."</em>',
    'B': 'This choice awkwardly adds <em>"and"</em> in the series which disrupts the parallel structure.',
    'C': 'This choice incorrectly uses commas instead of semicolons, though for simple items commas are actually correct here. Choice A is better for parallelism.',
    'D': 'This choice also correctly maintains parallel structure with the three <em>"that"</em> clauses.'
  },

  'Sophisticated Parallel Structure': {
    'A': 'This choice breaks parallel structure by using <em>"because of the"</em> instead of <em>"for its"</em> in the second item.',
    'B': 'This choice correctly maintains parallel structure by using <em>"for its"</em> in both items: <em>"for its beautiful beaches"</em> and <em>"for its delicious food."</em>',
    'C': 'This choice breaks parallelism by changing <em>"for its"</em> to <em>"for the"</em> in the second item.',
    'D': 'This choice breaks parallel structure by mixing <em>"for"</em> and <em>"because"</em> constructions.'
  },

  'Complex Appositive Structure': {
    'A': 'This choice correctly uses em dashes to set off the complex appositive phrase <em>"a process that takes millions of years"</em> which renames or explains the noun phrase before it.',
    'B': 'This choice could work with commas but em dashes better emphasize the dramatic nature of the discovery and time scale.',
    'C': 'This choice incorrectly uses a colon for a mid-sentence appositive. Colons typically come after independent clauses.',
    'D': 'This choice lacks the necessary punctuation to set off the appositive phrase.'
  },

  'Nested Dependent Clauses': {
    'A': 'This choice correctly uses commas to set off the non-restrictive clause <em>"which contains many rare species"</em> that provides additional information about the forest.',
    'B': 'This choice lacks the commas needed to set off the non-restrictive information about the forest containing rare species.',
    'C': 'This choice incorrectly uses <em>"that"</em> for non-restrictive information. <em>"That"</em> introduces restrictive clauses without commas.',
    'D': 'This choice incorrectly uses <em>"that"</em> with commas. <em>"That"</em> clauses are restrictive and don\'t take commas.'
  },

  'Subtle Comma Splice': {
    'A': 'This choice breaks parallel structure by omitting <em>"that"</em> in the final clause. The series should maintain <em>"that...that...that"</em> structure.',
    'B': 'This choice is unnecessarily wordy by adding <em>"and"</em> in the series.',
    'C': 'This choice incorrectly suggests semicolons are needed, but commas are correct for separating items in a series of dependent clauses.',
    'D': 'This choice correctly maintains parallel structure with three <em>"that"</em> clauses: <em>"that the weather was bad,"</em> <em>"that traffic was heavy,"</em> and <em>"that she still arrived on time."</em>'
  },

  'Advanced Restrictive Clause': {
    'A': 'This choice correctly treats <em>"who complete the program successfully"</em> as a restrictive clause without commas because it specifies which students receive certificates.',
    'B': 'This choice incorrectly treats the restrictive clause as non-restrictive by adding commas. The clause is essential to identifying which students get certificates.',
    'C': 'This choice incorrectly uses <em>"that"</em> to refer to people. Use <em>"who"</em> for people and <em>"that"</em> for things.',
    'D': 'This choice incorrectly treats the restrictive clause as non-restrictive by adding commas.'
  },

  'Sophisticated Sentence Combining': {
    'A': 'This choice incorrectly mixes punctuation marks (em dash with <em>"which"</em> and comma splice) creating a confusing structure.',
    'B': 'This choice mixes punctuation awkwardly without clear separation between ideas.',
    'C': 'This choice correctly uses em dashes to set off the parenthetical information and a period to properly end the sentence before starting a new one.',
    'D': 'This choice creates a run-on by improperly connecting multiple independent clauses without appropriate punctuation.'
  }
};

async function addExplanationsWithItalics() {
  try {
    console.log('Adding specific explanations with italic formatting...\\n');

    const { data: questions, error } = await supabase
      .from('lesson_examples')
      .select('*')
      .eq('lesson_id', 'a5fd241f-9832-4a5d-a7e9-90cb6232c4ac')
      .order('position', { ascending: true });

    if (error) {
      console.error('Error:', error);
      return;
    }

    let updated = 0;
    let skipped = 0;

    for (const question of questions) {
      const explanationSet = specificExplanations[question.title];

      if (!explanationSet) {
        console.log(`⚠️  No explanations for: ${question.title}`);
        skipped++;
        continue;
      }

      const updatedChoices = question.choices.map(choice => ({
        ...choice,
        explanation: explanationSet[choice.letter] || choice.explanation
      }));

      const { error: updateError } = await supabase
        .from('lesson_examples')
        .update({ choices: updatedChoices })
        .eq('id', question.id);

      if (updateError) {
        console.error(`Error updating ${question.title}:`, updateError);
      } else {
        updated++;
        console.log(`✓ ${question.title}`);
      }
    }

    console.log(`\\n✓ Complete! Updated ${updated}/50 questions with italic-formatted explanations.`);
    if (skipped > 0) {
      console.log(`⚠️  Skipped ${skipped} questions without explanations.`);
    }

  } catch (err) {
    console.error('Error:', err);
  }
}

addExplanationsWithItalics();
