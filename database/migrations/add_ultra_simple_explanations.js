const { createClient } = require('@supabase/supabase-js');
require('dotenv').config();

const supabase = createClient(process.env.REACT_APP_SUPABASE_URL, process.env.SUPABASE_SERVICE_ROLE_KEY);

// Ultra-simple explanations matching the user's example format
const simpleExplanations = {
  'Identifying Sentence Fragments': {
    'A': 'This choice creates a sentence fragment by lacking a verb.',
    'B': 'This choice creates a sentence fragment with only a comma.',
    'C': 'This choice creates a sentence fragment with a semicolon.',
    'D': 'This choice correctly adds the verb "was" to create a complete sentence.'
  },

  'Comma + FANBOYS vs. Comma Splices': {
    'A': 'This choice creates a comma splice with "however."',
    'B': 'This choice creates a comma splice with "therefore."',
    'C': 'This choice correctly uses the FANBOYS conjunction "and."',
    'D': 'This choice removes the necessary connection between clauses.'
  },

  'Fixing Comma Splices': {
    'A': 'This choice correctly uses ", but" to show contrast between the two clauses.',
    'B': 'This choice creates a run-on sentence without the required comma.',
    'C': 'This choice uses illogical connector "so" when contrast is needed.'
  },

  'Dependent Clauses Creating Fragments': {
    'A': 'This choice creates a fragment with the dependent clause "While."',
    'B': 'This choice creates a fragment with the participial phrase "Having."',
    'C': 'This choice creates a fragment with the prepositional phrase "With."',
    'D': 'This choice creates a complete sentence with subject and verb.'
  },

  'Fragment: Missing Subject': {
    'A': 'This choice creates a fragment lacking a subject for "was raining."',
    'B': 'This choice correctly adds the subject "it."',
    'C': 'This choice creates a fragment with incomplete verb "raining."',
    'D': 'This choice uses wrong tense and lacks a subject.'
  },

  'Simple Run-on Sentence': {
    'A': 'This choice creates a run-on sentence without punctuation or conjunction.',
    'B': 'This choice correctly uses ", and the" (comma + FANBOYS).',
    'C': 'This choice uses a semicolon which works but changes the relationship.',
    'D': 'This choice creates a comma splice with only a comma.'
  },

  'Basic Comma Splice': {
    'A': 'This choice creates a comma splice between two independent clauses.',
    'B': 'This choice correctly uses a semicolon to connect the clauses.',
    'C': 'This choice creates a run-on sentence without punctuation.',
    'D': 'This choice could work but B is more concise.'
  },

  'Fragment: Missing Verb': {
    'A': 'This choice creates a fragment with gerund "studying" instead of a verb.',
    'B': 'This choice correctly uses the complete verb phrase "are studying."',
    'C': 'This choice changes meaning and suggests past action.',
    'D': 'This choice creates a fragment with infinitive "to study."'
  },

  'FANBOYS: Basic Usage': {
    'A': 'This choice correctly uses a comma before FANBOYS conjunction "but."',
    'B': 'This choice lacks the required comma before "but."',
    'C': 'This choice incorrectly uses a semicolon instead of comma.',
    'D': 'This choice lacks punctuation creating incorrect structure.'
  },

  'Dependent Clause: After': {
    'A': 'This choice creates a run-on without comma after the dependent clause.',
    'B': 'This choice correctly places comma after "After the game ended."',
    'C': 'This choice incorrectly places comma inside the dependent clause.',
    'D': 'This choice changes structure and alters emphasis.'
  },

  'Simple Fragment Fix': {
    'A': 'This choice creates a fragment with dependent clause "Which serves."',
    'B': 'This choice correctly creates independent clause with "It serves."',
    'C': 'This choice creates a fragment lacking a subject.',
    'D': 'This choice creates a fragment with dependent clause "That serves."'
  },

  'Comma Splice: However': {
    'A': 'This choice creates a comma splice with conjunctive adverb "however."',
    'B': 'This choice correctly uses semicolon before "however."',
    'C': 'This choice incorrectly combines "and however."',
    'D': 'This choice creates a run-on without punctuation.'
  },

  'Basic Subordinating Conjunction': {
    'A': 'This choice is correct with no comma before "unless" at the end.',
    'B': 'This choice incorrectly adds comma before "unless."',
    'C': 'This choice incorrectly uses semicolon with "unless."',
    'D': 'This choice incorrectly places comma after "unless."'
  },

  'Fragment: Because': {
    'A': 'This choice creates a fragment with "Because" needing connection.',
    'B': 'This choice still creates a fragment without comma after clause.',
    'C': 'This choice correctly adds comma after "closed."',
    'D': 'This choice changes meaning by removing "Because."'
  },

  'Complex Comma Splice': {
    'A': 'This choice creates a comma splice with "therefore."',
    'B': 'This choice correctly uses semicolon before "therefore."',
    'C': 'This choice awkwardly combines "and therefore."',
    'D': 'This choice creates a run-on without punctuation.'
  },

  'Multiple Dependent Clauses': {
    'A': 'This choice creates a run-on without comma after "learning."',
    'B': 'This choice correctly places comma after the dependent clause.',
    'C': 'This choice incorrectly places comma after "While."',
    'D': 'This choice changes emphasis and creates ambiguity.'
  },

  'Semicolon vs. Comma': {
    'A': 'This choice incorrectly uses semicolon in a simple list.',
    'B': 'This choice correctly uses comma to separate list items.',
    'C': 'This choice creates a run-on without punctuation.',
    'D': 'This choice incorrectly uses colon to separate items.'
  },

  'Run-on with Conjunctive Adverb': {
    'A': 'This choice creates a run-on without proper punctuation.',
    'B': 'This choice creates a comma splice with "consequently."',
    'C': 'This choice correctly uses semicolon before "consequently."',
    'D': 'This choice could work but is less concise.'
  },

  'Fragment with Participial Phrase': {
    'A': 'This choice correctly uses participial phrase "having won."',
    'B': 'This choice unnecessarily changes structure.',
    'C': 'This choice creates ambiguity with "winning."',
    'D': 'This choice creates a fragment with incomplete verb.'
  },

  'Embedded Dependent Clause': {
    'A': 'This choice correctly uses restrictive clause without commas.',
    'B': 'This choice incorrectly adds commas around restrictive clause.',
    'C': 'This choice incorrectly uses "which" without commas.',
    'D': 'This choice incorrectly treats restrictive as non-restrictive.'
  },

  'Comma Splice with Transition': {
    'A': 'This choice creates a comma splice with "meanwhile."',
    'B': 'This choice correctly uses semicolon before "meanwhile."',
    'C': 'This choice incorrectly combines "and meanwhile."',
    'D': 'This choice awkwardly uses "and meanwhile."'
  },

  'Complex Fragment': {
    'A': 'This choice creates a fragment with "Although" needing connection.',
    'B': 'This choice correctly connects dependent clause with comma.',
    'C': 'This choice changes meaning by removing "Although."',
    'D': 'This choice creates a fragment with participial phrase.'
  },

  'Misplaced Semicolon': {
    'A': 'This choice incorrectly uses semicolon after introductory phrase.',
    'B': 'This choice creates awkward spacing.',
    'C': 'This choice correctly uses comma after introductory phrase.',
    'D': 'This choice incorrectly uses colon.'
  },

  'FANBOYS with Compound Predicate': {
    'A': 'This choice incorrectly uses comma with compound predicate.',
    'B': 'This choice correctly removes comma for shared subject.',
    'C': 'This choice incorrectly uses semicolon for compound predicate.',
    'D': 'This choice is redundant with unnecessary conjunction.'
  },

  'Non-restrictive Clause': {
    'A': 'This choice lacks commas around non-restrictive clause.',
    'B': 'This choice correctly uses commas around "who lives in Boston."',
    'C': 'This choice incorrectly uses "whom" and lacks comma.',
    'D': 'This choice lacks opening comma before "who."'
  },

  'Run-on with Missing Conjunction': {
    'A': 'This choice creates a run-on without conjunction.',
    'B': 'This choice creates a comma splice with only comma.',
    'C': 'This choice lacks required comma before "and."',
    'D': 'This choice correctly uses ", and the" (comma + FANBOYS).'
  },

  'Fragment: Subordinate Clause Only': {
    'A': 'This choice creates a fragment with subordinate clause "When."',
    'B': 'This choice correctly adds comma after dependent clause.',
    'C': 'This choice removes "When" changing time relationship.',
    'D': 'This choice awkwardly combines "When" with "and."'
  },

  'Colon vs. Semicolon': {
    'A': 'This choice incorrectly uses semicolon to introduce list.',
    'B': 'This choice correctly uses colon to introduce list.',
    'C': 'This choice creates a run-on without punctuation.',
    'D': 'This choice creates a comma splice.'
  },

  'Comma Splice: Moreover': {
    'A': 'This choice creates a comma splice with "moreover."',
    'B': 'This choice correctly uses semicolon before "moreover."',
    'C': 'This choice incorrectly combines "and moreover."',
    'D': 'This choice creates a run-on without punctuation.'
  },

  'Fragment: Appositive': {
    'A': 'This choice correctly sets off appositive with commas.',
    'B': 'This choice removes necessary commas.',
    'C': 'This choice is unnecessarily wordy.',
    'D': 'This choice lacks opening comma.'
  },

  'Dependent Clause: If': {
    'A': 'This choice is correct with no comma before "if" at end.',
    'B': 'This choice incorrectly adds comma before "if."',
    'C': 'This choice incorrectly uses semicolon with "if."',
    'D': 'This choice incorrectly places comma after "if."'
  },

  'Run-on: Missing Punctuation': {
    'A': 'This choice creates a run-on without proper punctuation.',
    'B': 'This choice creates a comma splice with only comma.',
    'C': 'This choice correctly uses semicolon to connect clauses.',
    'D': 'This choice could work but changes emphasis.'
  },

  'Fragment: Verbal Phrase': {
    'A': 'This choice creates a fragment with infinitive phrase.',
    'B': 'This choice correctly adds comma after infinitive phrase.',
    'C': 'This choice changes meaning with gerund.',
    'D': 'This choice is awkward and nonstandard.'
  },

  'Comma with Contrasting Element': {
    'A': 'This choice lacks comma before contrasting element.',
    'B': 'This choice correctly uses comma before "not complicated."',
    'C': 'This choice incorrectly uses semicolon.',
    'D': 'This choice changes contrast to compound structure.'
  },

  'Complex Sentence Structure': {
    'A': 'This choice lacks commas around non-restrictive clause.',
    'B': 'This choice lacks comma before "which."',
    'C': 'This choice correctly uses commas around non-restrictive clause.',
    'D': 'This choice lacks comma before "the building committee."'
  },

  'Embedded Clauses': {
    'A': 'This choice incorrectly uses "that" for non-restrictive information.',
    'B': 'This choice lacks commas around non-restrictive information.',
    'C': 'This choice incorrectly uses "that" for non-restrictive information.',
    'D': 'This choice correctly uses "which" with commas.'
  },

  'Semicolon with Complex Items': {
    'A': 'This choice correctly uses semicolons for complex list items.',
    'B': 'This choice incorrectly uses comma making items unclear.',
    'C': 'This choice incorrectly uses colon to separate items.',
    'D': 'This choice lacks necessary punctuation.'
  },

  'Parallel Structure in Clauses': {
    'A': 'This choice maintains parallel structure with "how...what...the factors."',
    'B': 'This choice disrupts parallel list structure.',
    'C': 'This choice breaks parallel structure with noun phrase.',
    'D': 'This choice breaks parallel structure with awkward phrasing.'
  },

  'Multiple Sentence Errors': {
    'A': 'This choice creates a run-on and lacks proper punctuation.',
    'B': 'This choice has inconsistent punctuation with comma and semicolon.',
    'C': 'This choice lacks comma after "fuels."',
    'D': 'This choice correctly uses comma and period properly.'
  },

  'Restrictive vs. Non-restrictive': {
    'A': 'This choice correctly treats clause as restrictive without commas.',
    'B': 'This choice incorrectly treats restrictive as non-restrictive.',
    'C': 'This choice incorrectly uses "whom" instead of "who."',
    'D': 'This choice incorrectly adds commas around essential information.'
  },

  'Conjunctive Adverb Placement': {
    'A': 'This choice lacks commas around "however."',
    'B': 'This choice correctly places commas around "however."',
    'C': 'This choice changes sentence structure and emphasis.',
    'D': 'This choice lacks opening comma before "however."'
  },

  'Colon with Independent Clauses': {
    'A': 'This choice correctly uses colon to introduce explanation.',
    'B': 'This choice creates a comma splice.',
    'C': 'This choice could work but colon better shows explanation.',
    'D': 'This choice creates a run-on without punctuation.'
  },

  'Multiple Dependent Clauses': {
    'A': 'This choice correctly maintains parallel structure with "that...that...that."',
    'B': 'This choice awkwardly adds "and" in semicolon list.',
    'C': 'This choice incorrectly uses commas instead of semicolons.',
    'D': 'This choice correctly maintains parallel structure.'
  },

  'Sophisticated Parallel Structure': {
    'A': 'This choice breaks parallel structure with "because of the."',
    'B': 'This choice maintains parallel structure with "for its...for its."',
    'C': 'This choice breaks parallelism with "for the."',
    'D': 'This choice breaks parallel structure mixing "for" and "because."'
  },

  'Complex Appositive Structure': {
    'A': 'This choice correctly uses em dashes for complex appositive.',
    'B': 'This choice could work but dashes better emphasize discovery.',
    'C': 'This choice incorrectly uses colon for mid-sentence appositive.',
    'D': 'This choice lacks necessary punctuation.'
  },

  'Nested Dependent Clauses': {
    'A': 'This choice correctly uses commas around non-restrictive clause.',
    'B': 'This choice lacks commas around non-restrictive information.',
    'C': 'This choice incorrectly uses "that" for non-restrictive information.',
    'D': 'This choice incorrectly uses "that" with commas.'
  },

  'Subtle Comma Splice': {
    'A': 'This choice breaks parallel structure omitting "that."',
    'B': 'This choice is unnecessarily wordy with "and."',
    'C': 'This choice incorrectly uses commas needing semicolons.',
    'D': 'This choice maintains parallel structure with "that...that...that."'
  },

  'Advanced Restrictive Clause': {
    'A': 'This choice correctly treats clause as restrictive without commas.',
    'B': 'This choice incorrectly treats restrictive as non-restrictive.',
    'C': 'This choice incorrectly uses "that" for people.',
    'D': 'This choice incorrectly treats restrictive as non-restrictive.'
  },

  'Sophisticated Sentence Combining': {
    'A': 'This choice incorrectly uses em dash with "which" and comma splice.',
    'B': 'This choice mixes punctuation awkwardly.',
    'C': 'This choice correctly uses em dashes and period.',
    'D': 'This choice creates a run-on improperly connecting clauses.'
  }
};

async function addSimpleExplanations() {
  try {
    console.log('Adding ultra-simple explanations...\n');

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

    for (const question of questions) {
      const explanationSet = simpleExplanations[question.title];

      if (!explanationSet) {
        console.log(`⚠️  No explanations for: ${question.title}`);
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

    console.log(`\n✓ Complete! Updated ${updated}/50 questions with ultra-simple explanations.`);

  } catch (err) {
    console.error('Error:', err);
  }
}

addSimpleExplanations();
