const { createClient } = require('@supabase/supabase-js');
require('dotenv').config();

const supabase = createClient(process.env.REACT_APP_SUPABASE_URL, process.env.SUPABASE_SERVICE_ROLE_KEY);

// Specific explanations referencing exact subjects, verbs, and grammatical relationships
const specificExplanations = {
  'Identifying Sentence Fragments': {
    'A': 'This choice creates a fragment because there is no verb connecting "Fair" to "a new type of diecast toy car."',
    'B': 'This choice creates a fragment. A comma alone cannot connect "Fair" to "a new type" without a verb.',
    'C': 'This choice creates a fragment. A semicolon requires independent clauses on both sides, but "a new type" lacks a verb.',
    'D': 'This choice correctly adds the verb "was" to connect "the toy at the Cincinnati Toy Fair" with "a new type of diecast toy car."'
  },

  'Comma + FANBOYS vs. Comma Splices': {
    'A': 'This choice creates a comma splice. The conjunctive adverb "however" requires a semicolon before it when joining two independent clauses.',
    'B': 'This choice creates a comma splice. The conjunctive adverb "therefore" requires a semicolon before it when joining two independent clauses.',
    'C': 'This choice correctly uses the coordinating conjunction "and" to join the two clauses about the hummingbirds\' evolution.',
    'D': 'This choice removes the necessary connection between "After hummingbirds evolved long, thin beaks" and "this evolutionary advantage allowed them to survive."'
  },

  'Fixing Comma Splices': {
    'A': 'This choice correctly uses the comma + coordinating conjunction ", but" to show the contrast between "Hockey is my favorite sport" and "I cannot skate very well."',
    'B': 'This choice creates a run-on sentence by placing the subordinating conjunction "even though" without a comma before it.',
    'C': 'This choice incorrectly uses "so" which suggests causation when the relationship between "my favorite sport" and "cannot skate well" is actually contrast.'
  },

  'Dependent Clauses Creating Fragments': {
    'A': 'This choice creates a fragment. The subordinating conjunction "While" makes "the bakery varies its types of bread" a dependent clause that cannot stand alone.',
    'B': 'This choice creates a fragment. The participial phrase "Having various types of bread" cannot function as the main verb of the sentence.',
    'C': 'This choice creates a fragment. The prepositional phrase "With the bakery having varied bread types" cannot serve as an independent clause.',
    'D': 'This choice correctly creates a complete sentence with "The bakery" as the subject and "varies" as the main verb.'
  },

  'Fragment: Missing Subject': {
    'A': 'This choice creates a fragment because the verb phrase "was raining" lacks a subject.',
    'B': 'This choice correctly adds the impersonal subject "it" required for weather descriptions in English.',
    'C': 'This choice creates a fragment. The gerund "raining" cannot serve as the main verb without a helping verb.',
    'D': 'This choice creates a fragment because the verb phrase "had rained" lacks a subject.'
  },

  'Simple Run-on Sentence': {
    'A': 'This choice creates a run-on sentence by placing two independent clauses "The concert was amazing" and "the band played for two hours" next to each other without proper punctuation or conjunction.',
    'B': 'This choice correctly uses ", and the" (comma + FANBOYS conjunction) to properly join the two independent clauses.',
    'C': 'This choice uses a semicolon which is grammatically correct but weakens the additive relationship between the two positive statements.',
    'D': 'This choice creates a comma splice by using only a comma to join the two independent clauses.'
  },

  'Basic Comma Splice': {
    'A': 'This choice creates a comma splice by using only a comma to join the two independent clauses "She studied all night" and "she still felt unprepared."',
    'B': 'This choice correctly uses a semicolon to join the two closely related independent clauses.',
    'C': 'This choice creates a run-on sentence by removing all punctuation between the two independent clauses.',
    'D': 'This choice correctly uses ", and she" but the semicolon in B is more concise for closely related clauses.'
  },

  'Fragment: Missing Verb': {
    'A': 'This choice creates a fragment. The present participle "studying" requires a helping verb to function as the main verb of the sentence.',
    'B': 'This choice correctly uses the complete verb phrase "are studying" with the helping verb "are" and present participle "studying."',
    'C': 'This choice changes the meaning to past tense and suggests the studying is complete rather than ongoing.',
    'D': 'This choice creates a fragment. The infinitive "to study" cannot serve as the main verb of the sentence.'
  },

  'FANBOYS: Basic Usage': {
    'A': 'This choice correctly uses a comma before the coordinating conjunction "but" when joining two independent clauses "I wanted to go to the park" and "it started raining."',
    'B': 'This choice lacks the required comma before "but" when joining two independent clauses.',
    'C': 'This choice incorrectly uses a semicolon. FANBOYS conjunctions require a comma, not a semicolon.',
    'D': 'This choice lacks any punctuation before "but" when joining two independent clauses.'
  },

  'Dependent Clause: After': {
    'A': 'This choice creates a run-on sentence by not placing a comma after the introductory dependent clause "After the game ended."',
    'B': 'This choice correctly places a comma after the introductory dependent clause "After the game ended" to separate it from the independent clause "the fans celebrated."',
    'C': 'This choice incorrectly places the comma after "After" which breaks up the dependent clause.',
    'D': 'This choice changes the sentence structure and shifts emphasis away from the fans\' celebration.'
  },

  'Simple Fragment Fix': {
    'A': 'This choice creates a fragment. The relative pronoun "Which" creates a dependent clause that cannot stand alone as a sentence.',
    'B': 'This choice correctly transforms the fragment into an independent clause by using the subject "It" and verb "serves."',
    'C': 'This choice creates a fragment because the verb "Serves" lacks a subject.',
    'D': 'This choice creates a fragment. The relative pronoun "That" creates a dependent clause that cannot stand alone as a sentence.'
  },

  'Comma Splice: However': {
    'A': 'This choice creates a comma splice. The conjunctive adverb "however" requires a semicolon before it (not a comma) when joining two independent clauses.',
    'B': 'This choice correctly uses a semicolon before "however" and a comma after it when joining the two independent clauses about the weather.',
    'C': 'This choice incorrectly combines the coordinating conjunction "and" with the conjunctive adverb "however."',
    'D': 'This choice creates a run-on sentence by removing all punctuation before "however."'
  },

  'Basic Subordinating Conjunction': {
    'A': 'This choice is correct. When a dependent clause beginning with "unless" comes at the end of a sentence, no comma is needed before it.',
    'B': 'This choice incorrectly adds a comma before "unless." Commas are not needed before dependent clauses at the end of sentences.',
    'C': 'This choice incorrectly uses a semicolon. Semicolons join independent clauses, but "unless it rains" is a dependent clause.',
    'D': 'This choice incorrectly places a comma after "unless" which separates the subordinating conjunction from its clause.'
  },

  'Fragment: Because': {
    'A': 'This choice creates a fragment. The dependent clause "Because the library was closed" cannot stand alone as a complete sentence.',
    'B': 'This choice still creates a fragment by ending the dependent clause "Because the library was closed" with implied punctuation before the next sentence.',
    'C': 'This choice correctly places a comma after the introductory dependent clause "Because the library was closed" to connect it to the independent clause "we studied at the coffee shop."',
    'D': 'This choice changes the meaning by removing "Because" and eliminating the causal relationship between the library closing and studying elsewhere.'
  },

  'Complex Comma Splice': {
    'A': 'This choice creates a comma splice. The conjunctive adverb "therefore" requires a semicolon before it when joining two independent clauses.',
    'B': 'This choice correctly uses a semicolon before "therefore" and a comma after it to join the independent clauses about the scientist\'s experiments and findings.',
    'C': 'This choice awkwardly combines "and" with "therefore" creating redundancy.',
    'D': 'This choice creates a run-on sentence by removing all punctuation before "therefore."'
  },

  'Multiple Dependent Clauses': {
    'A': 'This choice creates a run-on sentence by not placing a comma after the dependent clause "While some students preferred online learning."',
    'B': 'This choice correctly places a comma after the dependent clause "While some students preferred online learning" to separate it from the independent clause "others found traditional classrooms more effective."',
    'C': 'This choice incorrectly places a comma after "While" which breaks up the dependent clause.',
    'D': 'This choice removes the subordinating conjunction "While" and changes the emphasis of the contrast.'
  },

  'Semicolon vs. Comma': {
    'A': 'This choice incorrectly uses a semicolon in a simple list. Semicolons are only needed when list items contain internal commas.',
    'B': 'This choice correctly uses commas to separate the simple list items: paintings, sculptures, and artifacts.',
    'C': 'This choice creates a run-on by removing punctuation between the list items.',
    'D': 'This choice incorrectly uses a colon. Colons introduce lists, but here we\'re already within the list.'
  },

  'Run-on with Conjunctive Adverb': {
    'A': 'This choice creates a run-on sentence by placing two independent clauses next to each other without punctuation before "consequently."',
    'B': 'This choice creates a comma splice. The conjunctive adverb "consequently" requires a semicolon before it, not a comma.',
    'C': 'This choice correctly uses a semicolon before "consequently" and a comma after it to join the two independent clauses about practice and winning.',
    'D': 'This choice could work with "; consequently they" but is less concise than C.'
  },

  'Fragment with Participial Phrase': {
    'A': 'This choice correctly uses the participial phrase "having won" to modify the subject "the team" in a complete sentence.',
    'B': 'This choice unnecessarily changes the structure and is wordier than the original.',
    'C': 'This choice creates ambiguity by using "winning" which could be misread as an incomplete verb.',
    'D': 'This choice creates a fragment. "Having won" cannot serve as the main verb of the sentence.'
  },

  'Embedded Dependent Clause': {
    'A': 'This choice correctly uses the restrictive relative clause "that painted the Sistine Chapel" without commas because it is essential to identifying which artist.',
    'B': 'This choice incorrectly adds commas around a restrictive clause. The information about painting the Sistine Chapel is essential to identifying Michelangelo.',
    'C': 'This choice incorrectly uses "which" for a restrictive clause. "Which" is typically used for non-restrictive clauses with commas.',
    'D': 'This choice incorrectly treats the restrictive clause as non-restrictive by adding commas.'
  },

  'Comma Splice with Transition': {
    'A': 'This choice creates a comma splice. The conjunctive adverb "meanwhile" requires a semicolon before it when joining independent clauses.',
    'B': 'This choice correctly uses a semicolon before "meanwhile" and a comma after it to join the two independent clauses.',
    'C': 'This choice incorrectly combines the coordinating conjunction "and" with the conjunctive adverb "meanwhile."',
    'D': 'This choice awkwardly combines "and meanwhile" creating redundancy.'
  },

  'Complex Fragment': {
    'A': 'This choice creates a fragment. The subordinating conjunction "Although" makes "the experiment failed multiple times" a dependent clause that cannot stand alone.',
    'B': 'This choice correctly places a comma after the dependent clause "Although the experiment failed multiple times" to connect it to the independent clause about the scientist continuing.',
    'C': 'This choice removes "Although" and eliminates the contrast between the failures and the scientist\'s persistence.',
    'D': 'This choice creates a fragment using the participial phrase "Having failed multiple times" without a main verb for the sentence.'
  },

  'Misplaced Semicolon': {
    'A': 'This choice incorrectly uses a semicolon after the introductory prepositional phrase "After careful consideration." Semicolons join independent clauses, not introductory phrases.',
    'B': 'This choice creates awkward spacing and structure.',
    'C': 'This choice correctly uses a comma after the introductory phrase "After careful consideration" to separate it from the main clause.',
    'D': 'This choice incorrectly uses a colon. Colons typically introduce lists or explanations, not main clauses.'
  },

  'FANBOYS with Compound Predicate': {
    'A': 'This choice incorrectly uses a comma before "and" when joining a compound predicate. The subject "Maria" performs two actions without needing a comma.',
    'B': 'This choice correctly omits the comma because "studied hard" and "passed the exam" share the same subject "Maria" forming a compound predicate.',
    'C': 'This choice incorrectly uses a semicolon for a compound predicate. Semicolons join independent clauses, but the second verb lacks a subject.',
    'D': 'This choice is redundant and unnecessary.'
  },

  'Non-restrictive Clause': {
    'A': 'This choice lacks commas around the non-restrictive clause "who lives in Boston." This additional information about my cousin is not essential to identifying him.',
    'B': 'This choice correctly uses commas to set off the non-restrictive clause "who lives in Boston" which provides additional but non-essential information.',
    'C': 'This choice incorrectly uses "whom" (which is for objects) when "who" (for subjects) is needed. It also lacks the closing comma.',
    'D': 'This choice lacks the opening comma before "who" to set off the non-restrictive clause.'
  },

  'Run-on with Missing Conjunction': {
    'A': 'This choice creates a run-on sentence by placing two independent clauses "The sun was setting" and "the sky turned orange" next to each other without punctuation or conjunction.',
    'B': 'This choice creates a comma splice by using only a comma to join the two independent clauses.',
    'C': 'This choice lacks the required comma before "and" when joining two independent clauses.',
    'D': 'This choice correctly uses ", and the" (comma + FANBOYS) to properly join the two independent clauses about the sunset.'
  },

  'Fragment: Subordinate Clause Only': {
    'A': 'This choice creates a fragment. The subordinating conjunction "When" makes "the bell rang" a dependent clause that cannot stand alone as a complete sentence.',
    'B': 'This choice correctly places a comma after the dependent clause "When the bell rang" to connect it to the independent clause "the students left."',
    'C': 'This choice removes "When" and changes the sentence to remove the time relationship between the bell ringing and students leaving.',
    'D': 'This choice awkwardly combines "When" with "and" creating an unclear structure.'
  },

  'Colon vs. Semicolon': {
    'A': 'This choice incorrectly uses a semicolon to introduce a list. Semicolons join independent clauses, they don\'t introduce lists.',
    'B': 'This choice correctly uses a colon after the independent clause "three countries" to introduce the list: France, Italy, and Spain.',
    'C': 'This choice creates a run-on by removing punctuation between the introduction and the list.',
    'D': 'This choice creates a comma splice by using only a comma before the list.'
  },

  'Comma Splice: Moreover': {
    'A': 'This choice creates a comma splice. The conjunctive adverb "moreover" requires a semicolon before it when joining two independent clauses.',
    'B': 'This choice correctly uses a semicolon before "moreover" and a comma after it to join the two independent clauses about the candidate.',
    'C': 'This choice incorrectly combines the coordinating conjunction "and" with the conjunctive adverb "moreover."',
    'D': 'This choice creates a run-on sentence by removing all punctuation before "moreover."'
  },

  'Fragment: Appositive': {
    'A': 'This choice correctly uses commas to set off the appositive phrase "a renowned physicist" which renames or provides additional information about "Dr. Smith."',
    'B': 'This choice removes the necessary commas that set off the non-essential appositive phrase.',
    'C': 'This choice is unnecessarily wordy compared to the concise appositive construction.',
    'D': 'This choice lacks the opening comma before the appositive phrase.'
  },

  'Dependent Clause: If': {
    'A': 'This choice is correct. When a dependent clause beginning with "if" comes at the end of a sentence, no comma is needed before it.',
    'B': 'This choice incorrectly adds a comma before "if." Commas are not needed before dependent clauses at the end of sentences.',
    'C': 'This choice incorrectly uses a semicolon. Semicolons join independent clauses, but "if you need help" is a dependent clause.',
    'D': 'This choice incorrectly places a comma after "if" which separates the subordinating conjunction from its clause.'
  },

  'Run-on: Missing Punctuation': {
    'A': 'This choice creates a run-on sentence by placing two independent clauses "The movie was entertaining" and "the plot was predictable" next to each other without punctuation.',
    'B': 'This choice creates a comma splice by using only a comma to join the two independent clauses.',
    'C': 'This choice correctly uses a semicolon to join the two closely related independent clauses that contrast entertainment with predictability.',
    'D': 'This choice could work but changes the relationship by using "but" to emphasize contrast more strongly.'
  },

  'Fragment: Verbal Phrase': {
    'A': 'This choice creates a fragment. The infinitive phrase "To complete the project on time" cannot stand alone without a main subject and verb.',
    'B': 'This choice correctly places a comma after the introductory infinitive phrase "To complete the project on time" to connect it to the independent clause "we worked late."',
    'C': 'This choice changes the meaning by using the gerund "Completing" which suggests the action is already happening.',
    'D': 'This choice is awkward and nonstandard in structure.'
  },

  'Comma with Contrasting Element': {
    'A': 'This choice lacks the comma needed before the contrasting element "not complicated." Contrasting elements should be set off with a comma.',
    'B': 'This choice correctly uses a comma before the contrasting phrase "not complicated" to set off the contrast with "simple."',
    'C': 'This choice incorrectly uses a semicolon. Semicolons join independent clauses, but "not complicated" is just a contrasting phrase.',
    'D': 'This choice changes the contrast to a compound structure which alters the emphasis.'
  },

  'Complex Sentence Structure': {
    'A': 'This choice lacks commas around the non-restrictive relative clause "which was completed in 2019" that provides additional but non-essential information about the building.',
    'B': 'This choice lacks the comma before "which" needed to introduce the non-restrictive clause.',
    'C': 'This choice correctly uses commas to set off the non-restrictive clause "which was completed in 2019" providing additional information about the building.',
    'D': 'This choice lacks the comma before the appositive phrase "the building committee."'
  },

  'Embedded Clauses': {
    'A': 'This choice incorrectly uses the restrictive relative pronoun "that" for non-essential information. The fact that Einstein developed relativity is additional info, not essential to identifying him.',
    'B': 'This choice lacks the commas needed to set off the non-restrictive information about Einstein developing relativity.',
    'C': 'This choice incorrectly uses "that" for non-restrictive information without commas.',
    'D': 'This choice correctly uses "which" with commas to set off the non-restrictive clause providing additional information about Einstein.'
  },

  'Semicolon with Complex Items': {
    'A': 'This choice correctly uses semicolons to separate complex list items that contain internal commas: "Paris, France," "Rome, Italy," and "Berlin, Germany."',
    'B': 'This choice incorrectly uses only commas, making it unclear where one city ends and the next begins in the list.',
    'C': 'This choice incorrectly uses colons to separate items within an already-introduced list.',
    'D': 'This choice lacks the necessary punctuation to separate the complex list items.'
  },

  'Parallel Structure in Clauses': {
    'A': 'This choice maintains parallel structure in the list of three noun clauses: "how plants grow," "what animals eat," and "the factors."',
    'B': 'This choice disrupts the parallel list structure.',
    'C': 'This choice breaks parallel structure by mixing noun clauses ("how plants grow," "what animals eat") with a different construction.',
    'D': 'This choice breaks parallel structure with awkward phrasing.'
  },

  'Multiple Sentence Errors': {
    'A': 'This choice creates a run-on sentence by placing two independent clauses next to each other and lacks proper punctuation between "renewable" and "such."',
    'B': 'This choice has inconsistent punctuation by mixing a comma and semicolon inappropriately.',
    'C': 'This choice lacks the comma needed after "fuels" to separate the list introduction from the list items.',
    'D': 'This choice correctly uses a comma after the list items and a period to properly end the sentence.'
  },

  'Restrictive vs. Non-restrictive': {
    'A': 'This choice correctly treats "who won the Nobel Prize" as a restrictive clause without commas because it is essential to identifying which author we\'re discussing.',
    'B': 'This choice incorrectly treats the restrictive clause "who won the Nobel Prize" as non-restrictive by adding commas.',
    'C': 'This choice incorrectly uses "whom" (object form) when "who" (subject form) is needed because the pronoun is the subject of "won."',
    'D': 'This choice incorrectly adds commas around essential information that restricts which author is being discussed.'
  },

  'Conjunctive Adverb Placement': {
    'A': 'This choice lacks the commas needed to set off the conjunctive adverb "however" when it interrupts the middle of an independent clause.',
    'B': 'This choice correctly places commas around "however" to set off the conjunctive adverb that interrupts the independent clause "The plan was not successful."',
    'C': 'This choice changes the sentence structure and emphasis by moving "however" to the beginning.',
    'D': 'This choice lacks the opening comma before "however" needed to set off the interrupting adverb.'
  },

  'Colon with Independent Clauses': {
    'A': 'This choice correctly uses a colon after the independent clause "one reason" to introduce the explanation "it saves time."',
    'B': 'This choice creates a comma splice by using only a comma to connect the two independent clauses.',
    'C': 'This choice could work with a semicolon but the colon better shows that the second clause explains the first.',
    'D': 'This choice creates a run-on sentence by removing all punctuation between the two independent clauses.'
  },

  'Multiple Dependent Clauses': {
    'A': 'This choice correctly maintains parallel structure in the series of three "that" clauses: "that education is important," "that hard work pays off," and "that success takes time."',
    'B': 'This choice awkwardly adds "and" in the series which disrupts the parallel structure.',
    'C': 'This choice incorrectly uses commas instead of semicolons, though for simple items commas are actually correct here. Choice A is better for parallelism.',
    'D': 'This choice also correctly maintains parallel structure with the three "that" clauses.'
  },

  'Sophisticated Parallel Structure': {
    'A': 'This choice breaks parallel structure by using "because of the" instead of "for its" in the second item.',
    'B': 'This choice correctly maintains parallel structure by using "for its" in both items: "for its beautiful beaches" and "for its delicious food."',
    'C': 'This choice breaks parallelism by changing "for its" to "for the" in the second item.',
    'D': 'This choice breaks parallel structure by mixing "for" and "because" constructions.'
  },

  'Complex Appositive Structure': {
    'A': 'This choice correctly uses em dashes to set off the complex appositive phrase "a process that takes millions of years" which renames or explains the noun phrase before it.',
    'B': 'This choice could work with commas but em dashes better emphasize the dramatic nature of the discovery and time scale.',
    'C': 'This choice incorrectly uses a colon for a mid-sentence appositive. Colons typically come after independent clauses.',
    'D': 'This choice lacks the necessary punctuation to set off the appositive phrase.'
  },

  'Nested Dependent Clauses': {
    'A': 'This choice correctly uses commas to set off the non-restrictive clause "which contains many rare species" that provides additional information about the forest.',
    'B': 'This choice lacks the commas needed to set off the non-restrictive information about the forest containing rare species.',
    'C': 'This choice incorrectly uses "that" for non-restrictive information. "That" introduces restrictive clauses without commas.',
    'D': 'This choice incorrectly uses "that" with commas. "That" clauses are restrictive and don\'t take commas.'
  },

  'Subtle Comma Splice': {
    'A': 'This choice breaks parallel structure by omitting "that" in the final clause. The series should maintain "that...that...that" structure.',
    'B': 'This choice is unnecessarily wordy by adding "and" in the series.',
    'C': 'This choice incorrectly suggests semicolons are needed, but commas are correct for separating items in a series of dependent clauses.',
    'D': 'This choice correctly maintains parallel structure with three "that" clauses: "that the weather was bad," "that traffic was heavy," and "that she still arrived on time."'
  },

  'Advanced Restrictive Clause': {
    'A': 'This choice correctly treats "who complete the program successfully" as a restrictive clause without commas because it specifies which students receive certificates.',
    'B': 'This choice incorrectly treats the restrictive clause as non-restrictive by adding commas. The clause is essential to identifying which students get certificates.',
    'C': 'This choice incorrectly uses "that" to refer to people. Use "who" for people and "that" for things.',
    'D': 'This choice incorrectly treats the restrictive clause as non-restrictive by adding commas.'
  },

  'Sophisticated Sentence Combining': {
    'A': 'This choice incorrectly mixes punctuation marks (em dash with "which" and comma splice) creating a confusing structure.',
    'B': 'This choice mixes punctuation awkwardly without clear separation between ideas.',
    'C': 'This choice correctly uses em dashes to set off the parenthetical information and a period to properly end the sentence before starting a new one.',
    'D': 'This choice creates a run-on by improperly connecting multiple independent clauses without appropriate punctuation.'
  }
};

async function addSpecificExplanations() {
  try {
    console.log('Adding specific Khan Academy-style explanations...\\n');

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

    console.log(`\\n✓ Complete! Updated ${updated}/50 questions with specific explanations.`);
    if (skipped > 0) {
      console.log(`⚠️  Skipped ${skipped} questions without explanations.`);
    }

  } catch (err) {
    console.error('Error:', err);
  }
}

addSpecificExplanations();
