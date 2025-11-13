const { createClient } = require('@supabase/supabase-js');
require('dotenv').config();

const supabase = createClient(process.env.REACT_APP_SUPABASE_URL, process.env.REACT_APP_SUPABASE_ANON_KEY);

// Manual explanations for each question following the simple pattern
const explanations = {
  'Identifying Sentence Fragments': {
    'A': 'This choice creates a sentence fragment. Without a verb, "Fair a new type" is incomplete.',
    'B': 'This choice creates a sentence fragment. A comma alone cannot connect these two parts.',
    'C': 'This choice creates a sentence fragment. A semicolon requires independent clauses on both sides.',
    'D': 'This choice creates a complete sentence by adding the verb "was" to connect the subject and predicate.'
  },

  'Comma + FANBOYS vs. Comma Splices': {
    'A': 'This choice creates a comma splice. "However" is not a FANBOYS conjunction and cannot be used with just a comma.',
    'B': 'This choice creates a comma splice. "Therefore" is not a FANBOYS conjunction and cannot be used with just a comma.',
    'C': 'This choice correctly uses the FANBOYS conjunction "and" to connect the two independent clauses.',
    'D': 'This choice creates a sentence fragment by removing the necessary connection between the clauses.'
  },

  'Fixing Comma Splices': {
    'A': 'This choice correctly fixes the comma splice by using ", but" (comma + FANBOYS) to show contrast.',
    'B': 'This choice creates a run-on sentence by removing the comma before "even though."',
    'C': 'This choice uses an illogical connector. "So" suggests cause-and-effect, but the sentence shows contrast.'
  },

  'Dependent Clauses Creating Fragments': {
    'A': 'This choice creates a sentence fragment. "While" makes this a dependent clause with no main clause.',
    'B': 'This choice creates a sentence fragment. "Having" creates a participial phrase without a main verb.',
    'C': 'This choice creates a sentence fragment. "With" creates a prepositional phrase without a main clause.',
    'D': 'This choice creates a complete sentence by providing an independent clause with subject and verb.'
  },

  'Fragment: Missing Subject': {
    'A': 'This choice creates a fragment. The sentence lacks a subject for the verb "was raining."',
    'B': 'This choice creates a complete sentence by adding the subject "it" before "was raining."',
    'C': 'This choice creates a fragment. "Raining" alone is not a complete verb phrase.',
    'D': 'This choice uses the wrong tense and still lacks a subject.'
  },

  'Simple Run-on Sentence': {
    'A': 'This choice creates a run-on sentence. Two independent clauses cannot be joined without punctuation or conjunction.',
    'B': 'This choice correctly fixes the run-on by using ", and the" (comma + FANBOYS).',
    'C': 'This choice uses a semicolon, which works but changes the relationship between the clauses.',
    'D': 'This choice creates a comma splice. A comma alone cannot connect two independent clauses.'
  },

  'Basic Comma Splice': {
    'A': 'This choice creates a comma splice. Two independent clauses cannot be connected with just a comma.',
    'B': 'This choice correctly uses a semicolon to connect two closely related independent clauses.',
    'C': 'This choice creates a run-on sentence by removing punctuation entirely.',
    'D': 'This choice could work but B is more concise for showing the close relationship.'
  },

  'Fragment: Missing Verb': {
    'A': 'This choice creates a fragment. "Studying" is a gerund, not a complete verb.',
    'B': 'This choice creates a complete sentence by using the complete verb phrase "are studying."',
    'C': 'This choice changes the meaning and suggests past action rather than ongoing action.',
    'D': 'This choice creates a fragment. An infinitive "to study" is not a complete verb.'
  },

  'FANBOYS: Basic Usage': {
    'A': 'This choice correctly uses a comma before the FANBOYS conjunction "but."',
    'B': 'This choice is missing the required comma before the FANBOYS conjunction.',
    'C': 'This choice incorrectly uses a semicolon. FANBOYS requires a comma, not a semicolon.',
    'D': 'This choice lacks punctuation and creates incorrect sentence structure.'
  },

  'Dependent Clause: After': {
    'A': 'This choice creates a run-on sentence. The dependent clause needs a comma after it.',
    'B': 'This choice correctly places a comma after the introductory dependent clause "After the game ended."',
    'C': 'This choice incorrectly places the comma inside the dependent clause, breaking its meaning.',
    'D': 'This choice changes the sentence structure and alters the emphasis of when the celebration occurred.'
  },

  'Simple Fragment Fix': {
    'A': 'This choice creates a fragment. "Which serves" creates a dependent clause without an independent clause.',
    'B': 'This choice creates a complete sentence by using "It serves" as an independent clause.',
    'C': 'This choice creates a fragment. "Serves" alone lacks a subject.',
    'D': 'This choice creates a fragment. "That serves" creates a dependent clause without an independent clause.'
  },

  'Comma Splice: However': {
    'A': 'This choice creates a comma splice. "However" is a conjunctive adverb, not a FANBOYS conjunction.',
    'B': 'This choice correctly uses a semicolon before "however" and a comma after it.',
    'C': 'This choice is incorrect. You cannot use "and however" together.',
    'D': 'This choice creates a run-on sentence by removing all punctuation.'
  },

  'Basic Subordinating Conjunction': {
    'A': 'This choice is correct. No comma is needed before "unless" when the dependent clause comes at the end.',
    'B': 'This choice incorrectly adds a comma. Dependent clauses at the end don\'t need a comma.',
    'C': 'This choice incorrectly uses a semicolon. Subordinating conjunctions don\'t require semicolons.',
    'D': 'This choice incorrectly places a comma after "unless," breaking up the dependent clause.'
  },

  'Fragment: Because': {
    'A': 'This choice creates a fragment. A sentence starting with "Because" needs to connect to the main clause.',
    'B': 'This choice still creates a fragment by not adding punctuation after the dependent clause.',
    'C': 'This choice correctly adds a comma after "closed," connecting the dependent clause to the main clause.',
    'D': 'This choice changes the meaning by removing "Because" and making it two separate thoughts.'
  },

  'Complex Comma Splice': {
    'A': 'This choice creates a comma splice. "Therefore" requires a semicolon before it, not just a comma.',
    'B': 'This choice correctly uses a semicolon before "therefore" and a comma after it.',
    'C': 'This choice is awkward. "And therefore" is not standard usage.',
    'D': 'This choice creates a run-on sentence by removing punctuation.'
  },

  'Multiple Dependent Clauses': {
    'A': 'This choice creates a run-on sentence. The dependent clause needs a comma after "learning."',
    'B': 'This choice correctly places a comma after the dependent clause "While some students preferred online learning."',
    'C': 'This choice incorrectly places a comma after "While," breaking up the dependent clause.',
    'D': 'This choice changes the emphasis and could be ambiguous about the contrast.'
  },

  'Semicolon vs. Comma': {
    'A': 'This choice incorrectly uses a semicolon. Items in a simple list should be separated by commas.',
    'B': 'This choice correctly uses a comma to separate items in a list.',
    'C': 'This choice creates a run-on by removing punctuation.',
    'D': 'This choice incorrectly uses a colon. Colons introduce lists but don\'t separate list items.'
  },

  'Run-on with Conjunctive Adverb': {
    'A': 'This choice creates a run-on sentence. Two independent clauses need proper punctuation.',
    'B': 'This choice creates a comma splice. "Consequently" needs a semicolon before it, not a comma.',
    'C': 'This choice correctly uses a semicolon before "consequently" and a comma after it.',
    'D': 'This choice could work but is less concise than using a semicolon with a conjunctive adverb.'
  },

  'Fragment with Participial Phrase': {
    'A': 'This choice is correct. "Having won" is a participial phrase that correctly modifies "documentary."',
    'B': 'This choice changes the structure unnecessarily. The participial phrase works fine.',
    'C': 'This choice creates ambiguity. "Winning" could imply ongoing action rather than completed action.',
    'D': 'This choice creates a fragment. "Won" alone is not a complete verb phrase here.'
  },

  'Embedded Dependent Clause': {
    'A': 'This choice is correct. "That the professor assigned" is a restrictive clause and needs no commas.',
    'B': 'This choice incorrectly adds commas around a restrictive clause.',
    'C': 'This choice uses "which" without commas, which is incorrect for non-restrictive clauses.',
    'D': 'This choice incorrectly treats the clause as non-restrictive when it\'s essential to the meaning.'
  },

  'Comma Splice with Transition': {
    'A': 'This choice creates a comma splice. "Meanwhile" is a conjunctive adverb, not a FANBOYS conjunction.',
    'B': 'This choice correctly uses a semicolon before "meanwhile" and a comma after it.',
    'C': 'This choice incorrectly combines "and" with "meanwhile."',
    'D': 'This choice is awkward and non-standard. "And meanwhile" should be avoided.'
  },

  'Complex Fragment': {
    'A': 'This choice creates a fragment. The dependent clause "Although..." needs to connect to an independent clause without a period.',
    'B': 'This choice correctly connects the dependent clause to the independent clause with a comma.',
    'C': 'This choice removes "Although," changing the meaning and relationship between the ideas.',
    'D': 'This choice creates a fragment. "Reviewing" creates a participial phrase without a main clause.'
  },

  'Colon with Independent Clauses': {
    'A': 'This choice correctly uses a colon to introduce an explanation or elaboration that follows.',
    'B': 'This choice creates a comma splice. Two independent clauses need stronger punctuation than a comma.',
    'C': 'This choice could work but the colon better shows that the second clause explains the first.',
    'D': 'This choice creates a run-on sentence by removing punctuation between independent clauses.'
  },

  'Misplaced Semicolon': {
    'A': 'This choice incorrectly uses a semicolon. The phrase "To succeed in this course" is not an independent clause.',
    'B': 'This choice creates awkward spacing but is grammatically possible.',
    'C': 'This choice correctly uses a comma after an introductory phrase.',
    'D': 'This choice uses a colon incorrectly. Colons introduce lists or explanations, not general continuations.'
  },

  'FANBOYS with Compound Predicate': {
    'A': 'This choice incorrectly uses a comma. There are not two independent clauses here, just two verbs sharing the same subject.',
    'B': 'This choice correctly removes the comma since "served it with pride" shares the subject "chef."',
    'C': 'This choice incorrectly uses a semicolon for a compound predicate.',
    'D': 'This choice is redundant with the unnecessary conjunction.'
  },

  'Non-restrictive Clause': {
    'A': 'This choice incorrectly lacks commas around the non-restrictive clause "who lives in Boston."',
    'B': 'This choice correctly uses commas to set off the non-restrictive information about where the sister lives.',
    'C': 'This choice uses "whom" incorrectly and lacks the necessary second comma.',
    'D': 'This choice is missing the opening comma before "who."'
  },

  'Run-on with Missing Conjunction': {
    'A': 'This choice creates a run-on sentence. Two independent clauses need a conjunction or proper punctuation.',
    'B': 'This choice creates a comma splice. A comma alone cannot join two independent clauses.',
    'C': 'This choice is missing the required comma before the FANBOYS conjunction "and."',
    'D': 'This choice correctly uses ", and the" (comma + FANBOYS) to connect the two independent clauses.'
  },

  'Fragment: Subordinate Clause Only': {
    'A': 'This choice creates a fragment. "When" makes this a subordinate clause that needs a main clause.',
    'B': 'This choice correctly creates a complete sentence by placing a comma after the dependent clause.',
    'C': 'This choice removes "When," creating two independent clauses but changing the time relationship.',
    'D': 'This choice incorrectly combines "When" with "and," creating awkward structure.'
  },

  'Colon vs. Semicolon': {
    'A': 'This choice incorrectly uses a semicolon. Semicolons connect independent clauses, not introduce lists.',
    'B': 'This choice correctly uses a colon to introduce the list of ingredients.',
    'C': 'This choice creates a run-on by removing punctuation.',
    'D': 'This choice creates a comma splice. The introduction needs stronger punctuation.'
  },

  'Comma Splice: Moreover': {
    'A': 'This choice creates a comma splice. "Moreover" is a conjunctive adverb that requires a semicolon.',
    'B': 'This choice correctly uses a semicolon before "moreover" and a comma after it.',
    'C': 'This choice incorrectly combines "and" with "moreover."',
    'D': 'This choice creates a run-on sentence by removing punctuation.'
  },

  'Fragment: Appositive': {
    'A': 'This choice is correct. The commas correctly set off the appositive "a renowned expert in marine biology."',
    'B': 'This choice removes necessary commas, making the sentence unclear.',
    'C': 'This choice is unnecessarily wordy. The appositive is more concise than a relative clause.',
    'D': 'This choice is missing the opening comma and unnecessarily uses a relative clause.'
  },

  'Dependent Clause: If': {
    'A': 'This choice is correct. No comma is needed when the dependent clause comes at the end.',
    'B': 'This choice incorrectly adds a comma. Dependent clauses at the end don\'t need commas.',
    'C': 'This choice incorrectly uses a semicolon with a subordinating conjunction.',
    'D': 'This choice incorrectly places a comma after "if," breaking up the dependent clause.'
  },

  'Run-on: Missing Punctuation': {
    'A': 'This choice creates a run-on sentence. Two independent clauses need proper punctuation.',
    'B': 'This choice creates a comma splice. A comma alone cannot join independent clauses.',
    'C': 'This choice correctly uses a semicolon to connect two closely related independent clauses.',
    'D': 'This choice could work but changes the emphasis by using a conjunction.'
  },

  'Fragment: Verbal Phrase': {
    'A': 'This choice creates a fragment. "To understand" is an infinitive phrase that needs a main clause.',
    'B': 'This choice correctly adds a comma after the introductory infinitive phrase.',
    'C': 'This choice changes the meaning by switching from infinitive to gerund.',
    'D': 'This choice is awkward and nonstandard phrasing.'
  },

  'Comma with Contrasting Element': {
    'A': 'This choice lacks the necessary comma before the contrasting element "not complicated."',
    'B': 'This choice correctly uses a comma before the contrasting element.',
    'C': 'This choice incorrectly uses a semicolon for a contrasting element within a sentence.',
    'D': 'This choice changes the contrast to a compound structure, which alters the emphasis.'
  },

  'Complex Sentence Structure': {
    'A': 'This choice lacks commas around the non-restrictive clause "which consisted of experienced professionals."',
    'B': 'This choice is missing the comma before "which."',
    'C': 'This choice correctly uses commas to set off the non-restrictive clause.',
    'D': 'This choice removes the necessary comma before "the building committee."'
  },

  'Embedded Clauses': {
    'A': 'This choice incorrectly uses "that" for non-restrictive information and lacks proper commas.',
    'B': 'This choice incorrectly lacks commas around the non-restrictive information.',
    'C': 'This choice incorrectly uses "that" for non-restrictive information.',
    'D': 'This choice correctly uses "which" with commas for the non-restrictive clause.'
  },

  'Semicolon with Complex Items': {
    'A': 'This choice correctly uses semicolons to separate complex list items that contain internal commas.',
    'B': 'This choice incorrectly uses a comma, which makes it unclear where one item ends and another begins.',
    'C': 'This choice incorrectly uses a colon to separate list items.',
    'D': 'This choice is missing necessary punctuation between list items.'
  },

  'Parallel Structure in Clauses': {
    'A': 'This choice maintains parallel structure by using "how...what...the factors" in a consistent pattern.',
    'B': 'This choice removes the comma, disrupting the parallel list structure.',
    'C': 'This choice breaks parallel structure by changing "what motivates" to a noun phrase.',
    'D': 'This choice breaks parallel structure with awkward phrasing.'
  },

  'Multiple Sentence Errors': {
    'A': 'This choice creates a run-on sentence and lacks proper punctuation between independent clauses.',
    'B': 'This choice has inconsistent punctuation with both a comma and semicolon.',
    'C': 'This choice is missing the comma after "fuels" but correctly uses a period.',
    'D': 'This choice correctly uses a comma after the dependent clause and a period between independent clauses.'
  },

  'Restrictive vs. Non-restrictive': {
    'A': 'This choice correctly treats "who completed the extra credit" as restrictive (essential) information with no commas.',
    'B': 'This choice incorrectly treats the clause as non-restrictive when it\'s essential to identify which students.',
    'C': 'This choice incorrectly uses "whom" when "who" is needed as the subject of "completed."',
    'D': 'This choice incorrectly adds commas around essential information.'
  },

  'Conjunctive Adverb Placement': {
    'A': 'This choice lacks commas around the conjunctive adverb "however."',
    'B': 'This choice correctly places commas around "however" when it appears mid-clause.',
    'C': 'This choice changes the sentence structure and alters the emphasis.',
    'D': 'This choice is missing the opening comma before "however."'
  },

  'Sophisticated Parallel Structure': {
    'A': 'This choice breaks parallel structure by using "because of the" instead of "for its."',
    'B': 'This choice maintains parallel structure with "not only for its...but also for its."',
    'C': 'This choice uses "for the" which breaks the parallelism with "for its" in the first part.',
    'D': 'This choice breaks parallel structure by mixing "for its" with "because of its."'
  },

  'Complex Appositive Structure': {
    'A': 'This choice correctly uses em dashes to set off the complex appositive phrase.',
    'B': 'This choice could work but em dashes better emphasize the dramatic nature of the discovery.',
    'C': 'This choice incorrectly uses a colon, which doesn\'t work for appositives mid-sentence.',
    'D': 'This choice lacks necessary punctuation to set off the appositive.'
  },

  'Nested Dependent Clauses': {
    'A': 'This choice correctly uses commas around the non-restrictive clause "which has transformed how we communicate."',
    'B': 'This choice incorrectly lacks commas around the non-restrictive information.',
    'C': 'This choice incorrectly uses "that" for non-restrictive information.',
    'D': 'This choice incorrectly uses "that" with commas (should use "which" for non-restrictive clauses).'
  },

  'Subtle Comma Splice': {
    'A': 'This choice breaks parallel structure by omitting "that" before "morality."',
    'B': 'This choice is unnecessarily wordy by adding "and" in a list that uses semicolons.',
    'C': 'This choice incorrectly uses commas in a list that requires semicolons for clarity.',
    'D': 'This choice maintains parallel structure with "that human...that reason...that morality."'
  },

  'Advanced Restrictive Clause': {
    'A': 'This choice correctly treats "who study behavioral patterns" as restrictive information (no commas).',
    'B': 'This choice incorrectly treats restrictive information as non-restrictive by adding commas.',
    'C': 'This choice incorrectly uses "that" for people instead of "who."',
    'D': 'This choice incorrectly treats restrictive information as non-restrictive.'
  },

  'Sophisticated Sentence Combining': {
    'A': 'This choice incorrectly uses an em dash before "which" and creates a comma splice with "these findings."',
    'B': 'This choice mixes punctuation styles awkwardly with commas and a semicolon.',
    'C': 'This choice correctly uses em dashes for the appositive and a period to separate independent clauses.',
    'D': 'This choice creates a run-on sentence by improperly connecting multiple clauses.'
  }
};

async function addExplanations() {
  try {
    console.log('Fetching sentence structure questions...');

    const { data: questions, error } = await supabase
      .from('lesson_examples')
      .select('*')
      .eq('lesson_id', 'a5fd241f-9832-4a5d-a7e9-90cb6232c4ac')
      .order('position', { ascending: true });

    if (error) {
      console.error('Error fetching questions:', error);
      return;
    }

    console.log(`Found ${questions.length} questions`);
    let updated = 0;

    for (const question of questions) {
      const title = question.title;

      if (!explanations[title]) {
        console.log(`⚠️  No explanations defined for: ${title}`);
        continue;
      }

      const updatedChoices = question.choices.map(choice => {
        const explanation = explanations[title][choice.letter];
        if (!explanation) {
          console.log(`⚠️  No explanation for ${title} - Choice ${choice.letter}`);
          return choice;
        }

        return {
          ...choice,
          explanation: explanation
        };
      });

      // Update the database
      const { error: updateError } = await supabase
        .from('lesson_examples')
        .update({ choices: updatedChoices })
        .eq('id', question.id);

      if (updateError) {
        console.error(`Error updating ${title}:`, updateError);
      } else {
        updated++;
        console.log(`✓ Updated: ${title}`);
      }
    }

    console.log(`\nComplete! Updated ${updated} questions with simple, specific explanations.`);

  } catch (err) {
    console.error('Unexpected error:', err);
  }
}

console.log('Adding simple, specific explanations to sentence structure questions...\n');
addExplanations();
