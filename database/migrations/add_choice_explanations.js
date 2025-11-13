/**
 * Add simple, concise explanations for all answer choices (A, B, C, D)
 * Each choice gets its own explanation - not just the correct answer
 */

const { createClient } = require('@supabase/supabase-js');
require('dotenv').config();

const supabaseUrl = process.env.REACT_APP_SUPABASE_URL;
const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

const supabase = createClient(supabaseUrl, supabaseKey);

async function addChoiceExplanations() {
  console.log('🚀 Adding explanations for all answer choices...\n');

  const lessonId = 'a5fd241f-9832-4a5d-a7e9-90cb6232c4ac';

  // Simple, concise explanations for each choice
  const choiceExplanations = {
    1: {
      A: "Fragment - no verb connects 'Fair' to 'a new type.'",
      B: "Adding a comma doesn't fix the missing verb.",
      C: "Semicolon doesn't provide the needed verb.",
      D: "✓ Correct. 'Was' is the linking verb that completes the sentence."
    },
    2: {
      A: "'However' is not a FANBOYS conjunction.",
      B: "'Therefore' is not a FANBOYS conjunction.",
      C: "✓ Correct. 'And' is a FANBOYS word that properly connects the clauses.",
      D: "Deleting creates unclear connection between ideas."
    },
    3: {
      A: "✓ Correct. Comma + FANBOYS properly connects two independent clauses showing contrast.",
      B: "Missing comma before 'even though.'",
      C: "'So' changes the meaning incorrectly (implies result, not contrast)."
    },
    4: {
      A: "'While' at the start makes the entire sentence a dependent clause with no main clause.",
      B: "Participial phrase creates fragment.",
      C: "Prepositional phrase creates fragment.",
      D: "✓ Correct. Removing 'While' creates an independent clause with clear subject and verb."
    },
    5: {
      A: "'Was raining' lacks a subject.",
      B: "✓ Correct. 'It' provides the necessary subject for weather descriptions.",
      C: "Present tense 'raining' still needs helping verb and subject.",
      D: "Infinitive 'to rain' is not a complete verb form."
    },
    6: {
      A: "Run-on sentence - two independent clauses need proper connection.",
      B: "✓ Correct. Comma + FANBOYS 'and' properly connects two independent clauses.",
      C: "Semicolon works but 'and' better shows the positive relationship.",
      D: "'And' needs a comma before it when joining independent clauses."
    },
    7: {
      A: "Comma splice - two independent clauses can't be joined with just a comma.",
      B: "✓ Correct. Semicolon properly connects closely related independent clauses.",
      C: "Run-on - no punctuation between independent clauses.",
      D: "Creates run-on if no conjunction follows."
    },
    8: {
      A: "'Studying' is a participle, not a complete verb.",
      B: "✓ Correct. 'Are studying' provides the complete verb phrase (helping verb + participle).",
      C: "Simple past doesn't match the ongoing action context.",
      D: "Infinitive 'to study' is not a complete verb."
    },
    9: {
      A: "✓ Correct. FANBOYS conjunction needs comma before it when joining independent clauses.",
      B: "Missing required comma before coordinating conjunction.",
      C: "Semicolon + 'but' is incorrect - use either semicolon OR comma + but.",
      D: "Same as original - missing comma."
    },
    10: {
      A: "Dependent clause at sentence start needs comma after it.",
      B: "✓ Correct. Comma separates dependent clause from independent clause.",
      C: "Comma in wrong position.",
      D: "Changes word order incorrectly."
    },
    11: {
      A: "'Which' creates dependent clause fragment.",
      B: "✓ Correct. 'It serves' creates independent clause with subject and verb.",
      C: "Just the verb 'serves' lacks a subject.",
      D: "'That serves' still a fragment without independent clause."
    },
    12: {
      A: "Comma splice - 'however' needs stronger punctuation.",
      B: "✓ Correct. Semicolon before 'however' and comma after is the required pattern.",
      C: "'And however' is redundant and awkward.",
      D: "Missing punctuation creates run-on."
    },
    13: {
      A: "✓ Correct. Dependent clause following independent clause needs no comma.",
      B: "Unnecessary comma before 'unless.'",
      C: "Semicolon is incorrect here.",
      D: "Comma in wrong position."
    },
    14: {
      A: "Fragment - 'Because' clause can't stand alone as sentence.",
      B: "Still a fragment without connection to main clause.",
      C: "✓ Correct. Comma attaches dependent clause to independent clause.",
      D: "Changes meaning by removing contrast word 'because.'"
    },
    15: {
      A: "Comma splice with conjunctive adverb.",
      B: "✓ Correct. Semicolon before 'therefore,' comma after is required for conjunctive adverbs.",
      C: "'And therefore' is wordy and changes the relationship.",
      D: "Missing punctuation creates run-on."
    },
    16: {
      A: "Missing comma after dependent clause.",
      B: "✓ Correct. Comma separates introductory dependent clause from independent clause.",
      C: "Comma in wrong position.",
      D: "Removes important contrast word 'while.'"
    },
    17: {
      A: "Semicolons are for lists with internal commas; these items are simple.",
      B: "✓ Correct. Simple list items need regular commas, not semicolons.",
      C: "Missing punctuation.",
      D: "Colon doesn't work mid-list."
    },
    18: {
      A: "Run-on sentence.",
      B: "Comma splice - 'consequently' needs semicolon.",
      C: "✓ Correct. Semicolon before 'consequently,' comma after for conjunctive adverbs.",
      D: "'And consequently' is wordy."
    },
    19: {
      A: "✓ Correct. Participial phrase properly modifies 'documentary'; main clause is complete.",
      B: "Creates unnatural phrasing.",
      C: "Changes the tense incorrectly.",
      D: "Simple past 'won' changes meaning."
    },
    20: {
      A: "✓ Correct. Restrictive clause (essential info) needs no commas.",
      B: "Commas make it non-restrictive, changing the meaning.",
      C: "'Whom' is incorrect - 'which' is for things, not people.",
      D: "Comma makes it non-restrictive."
    },
    21: {
      A: "Comma splice.",
      B: "✓ Correct. Semicolon before 'meanwhile,' comma after for conjunctive adverbs.",
      C: "'And meanwhile' is redundant.",
      D: "Missing punctuation creates run-on."
    },
    22: {
      A: "Fragment - 'Although' makes entire sentence dependent with no main clause.",
      B: "✓ Correct. Comma connects dependent clause to independent clause.",
      C: "Removes 'although,' changing the meaning.",
      D: "Participial phrase creates fragment."
    },
    23: {
      A: "Semicolons join independent clauses only; 'To succeed' is a phrase, not a clause.",
      B: "Missing punctuation.",
      C: "✓ Correct. Infinitive phrase needs comma, not semicolon.",
      D: "Colon is incorrect after introductory phrase."
    },
    24: {
      A: "Comma is incorrect - this is compound predicate, not two independent clauses.",
      B: "✓ Correct. Compound predicate (same subject, two verbs) needs no comma.",
      C: "Semicolon is for independent clauses, not compound predicates.",
      D: "Same as A - incorrect comma."
    },
    25: {
      A: "Missing commas around non-restrictive clause.",
      B: "✓ Correct. Non-restrictive clause (extra info) needs commas around it.",
      C: "'Whom' is grammatically awkward here.",
      D: "Only one comma - needs both commas around the clause."
    },
    26: {
      A: "Run-on sentence.",
      B: "Comma alone creates comma splice.",
      C: "Missing comma before 'and.'",
      D: "✓ Correct. Comma + FANBOYS 'and' properly connects independent clauses."
    },
    27: {
      A: "'When' makes entire sentence dependent with no independent clause.",
      B: "✓ Correct. Comma separates dependent clause from independent clause.",
      C: "Removes word creating unnecessary fragment.",
      D: "'And' doesn't fix the dependent clause issue."
    },
    28: {
      A: "Semicolons join independent clauses; this introduces a list.",
      B: "✓ Correct. Colon introduces a list after complete independent clause.",
      C: "Missing punctuation between clause and list.",
      D: "Comma alone is too weak to introduce the list."
    },
    29: {
      A: "Comma splice.",
      B: "✓ Correct. Semicolon before 'moreover,' comma after for conjunctive adverbs.",
      C: "'And moreover' is redundant.",
      D: "Missing punctuation."
    },
    30: {
      A: "✓ Correct. Appositive (renaming phrase) set off with commas provides additional info.",
      B: "Missing commas makes sentence unclear.",
      C: "'Who is' makes it a relative clause instead of appositive.",
      D: "'Who is' without commas is incorrect."
    },
    31: {
      A: "✓ Correct. Dependent clause after independent clause needs no comma.",
      B: "Unnecessary comma.",
      C: "Semicolon is incorrect.",
      D: "Comma in wrong position."
    },
    32: {
      A: "Run-on sentence.",
      B: "Comma creates comma splice.",
      C: "✓ Correct. Semicolon properly connects closely related independent clauses.",
      D: "Comma + 'and' works but semicolon shows closer relationship."
    },
    33: {
      A: "Fragment - infinitive phrase can't stand alone.",
      B: "✓ Correct. Comma connects introductory infinitive phrase to main clause.",
      C: "Changes verb form awkwardly.",
      D: "Changes preposition, making it less clear."
    },
    34: {
      A: "Contrasting element needs comma.",
      B: "✓ Correct. Comma sets off contrasting element introduced by 'not.'",
      C: "Semicolon is too strong.",
      D: "'And not' changes the emphasis."
    },
    35: {
      A: "Missing comma after 'innovative.'",
      B: "Missing comma after non-restrictive clause.",
      C: "✓ Correct. Comma after dependent clause + commas around non-restrictive clause.",
      D: "Missing comma after 'innovative.'"
    },
    36: {
      A: "'That' makes it restrictive, but the info is non-essential.",
      B: "'Which' without commas is incorrect for non-restrictive clause.",
      C: "'That' doesn't take commas and implies essential info.",
      D: "✓ Correct. 'Which' with commas for non-restrictive (additional) information."
    },
    37: {
      A: "✓ Correct. List items with internal commas need semicolons to separate major items.",
      B: "Commas alone create confusion about where items begin/end.",
      C: "Colon doesn't work mid-list.",
      D: "'And' without semicolon creates confusion."
    },
    38: {
      A: "✓ Correct. Parallel noun clauses maintain consistent grammatical structure.",
      B: "Breaks parallel structure.",
      C: "Changes to noun phrase, breaking parallelism with clauses.",
      D: "Awkward phrasing breaks parallelism."
    },
    39: {
      A: "Missing comma after dependent clause.",
      B: "Fixes dependent clause but leaves comma splice.",
      C: "Fixes dependent clause but leaves comma splice.",
      D: "✓ Correct. Comma after dependent clause + period fixes comma splice."
    },
    40: {
      A: "✓ Correct. Restrictive clause (specifies which students) needs no commas.",
      B: "Commas make it non-restrictive, changing meaning to 'all students.'",
      C: "'Whom' is incorrect as subject of clause.",
      D: "One comma makes it non-restrictive."
    },
    41: {
      A: "'However' interrupting needs commas around it.",
      B: "✓ Correct. Interrupting conjunctive adverb gets commas around it.",
      C: "Only semicolon doesn't work mid-clause.",
      D: "Only one comma - needs both."
    },
    42: {
      A: "Fragment - has subject and modifiers but no main verb.",
      B: "Still missing main verb.",
      C: "Simplifies but still lacks main verb.",
      D: "✓ Correct. Adds verb phrase to complete the sentence."
    },
    43: {
      A: "✓ Correct. Colon can introduce independent clause that explains the first clause.",
      B: "Comma creates comma splice.",
      C: "Semicolon works but colon better shows explanation relationship.",
      D: "Missing punctuation creates run-on."
    },
    44: {
      A: "✓ Correct. Parallel noun clauses joined by 'and' need no extra punctuation.",
      B: "Comma disrupts parallel structure.",
      C: "Comma placement is awkward.",
      D: "Extra comma breaks parallel structure."
    },
    45: {
      A: "'Because of' breaks parallel structure with 'for its.'",
      B: "✓ Correct. 'For its' matches 'for its' - perfect parallel structure.",
      C: "Breaks parallel structure.",
      D: "Comma doesn't fix parallel structure issue."
    },
    46: {
      A: "✓ Correct. Em dashes set off complex appositive with internal commas.",
      B: "Commas would create confusion with internal commas.",
      C: "One em dash needs closing em dash.",
      D: "Parentheses are weaker than em dashes for this emphasis."
    },
    47: {
      A: "✓ Correct. Non-restrictive clause with commas provides additional info about technology.",
      B: "Restrictive 'that' changes meaning.",
      C: "Missing commas around non-restrictive clause.",
      D: "Only one comma - needs both."
    },
    48: {
      A: "Missing 'that' before 'morality' breaks parallel structure.",
      B: "Comma doesn't fix parallel structure.",
      C: "Adding extra 'that' in wrong place.",
      D: "✓ Correct. All three items start with 'that' - parallel structure maintained."
    },
    49: {
      A: "✓ Correct. Restrictive clause (specifies which economists) needs no commas.",
      B: "Commas make it non-restrictive, changing to 'all economists.'",
      C: "'That' works but 'who' is preferred for people.",
      D: "Commas make it non-restrictive."
    },
    50: {
      A: "Missing closing em dash and has comma splice.",
      B: "Fixes comma splice but mixes dash with comma incorrectly.",
      C: "✓ Correct. Closes em dash properly + period separates independent clauses.",
      D: "Keeps comma splice error."
    }
  };

  try {
    // Get all questions
    const { data: questions } = await supabase
      .from('lesson_examples')
      .select('id, position, title, choices')
      .eq('lesson_id', lessonId)
      .order('position');

    console.log(`📚 Updating ${questions.length} questions with choice explanations\n`);

    for (const question of questions) {
      const explanations = choiceExplanations[question.position];

      if (!explanations) {
        console.log(`  ⚠️  No explanations for position ${question.position}`);
        continue;
      }

      // Update the choices array to include explanations
      const choices = question.choices;
      const updatedChoices = choices.map(choice => {
        const letter = choice.letter;
        return {
          ...choice,
          explanation: explanations[letter] || ''
        };
      });

      const { error } = await supabase
        .from('lesson_examples')
        .update({ choices: updatedChoices })
        .eq('id', question.id);

      if (error) {
        console.error(`  ❌ Error updating position ${question.position}:`, error.message);
      } else {
        const label = question.position >= 45 ? '🧠' :
                     question.position >= 35 ? '🔥' :
                     question.position >= 15 ? '📘' : '✅';
        console.log(`  ${label} Position ${question.position}: ${question.title}`);
      }
    }

    console.log('\n✅ All choice explanations added!');

  } catch (error) {
    console.error('\n❌ Error:', error);
    process.exit(1);
  }
}

addChoiceExplanations();
