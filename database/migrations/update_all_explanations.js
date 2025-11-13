/**
 * Update all 50 practice questions with comprehensive explanations
 */

const { createClient } = require('@supabase/supabase-js');
require('dotenv').config();

const supabaseUrl = process.env.REACT_APP_SUPABASE_URL;
const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

const supabase = createClient(supabaseUrl, supabaseKey);

async function updateExplanations() {
  console.log('🚀 Updating explanations for all 50 questions...\n');

  const lessonId = 'a5fd241f-9832-4a5d-a7e9-90cb6232c4ac';

  const explanations = {
    1: 'The original sentence is a fragment because it lacks a main verb. "Fair was" adds the linking verb "was" that connects the subject to its complement, completing the sentence structure.',
    2: '"And" is a FANBOYS conjunction (For, And, Nor, But, Or, Yet, So) that properly connects two independent clauses when preceded by a comma. "However" and "therefore" are conjunctive adverbs, not coordinating conjunctions.',
    3: 'The original uses comma + "although," which creates a comma splice. "Sport, but" correctly uses comma + FANBOYS to join two independent clauses. The contrast between loving hockey and not skating well is properly conveyed with "but."',
    4: 'The word "While" at the beginning makes the entire sentence a dependent clause with no independent clause to complete it. Removing "While" creates an independent clause: "The bakery varies its types of bread..." with a clear subject and verb.',
    5: 'A complete sentence needs both a subject and a verb. "Was raining" lacks a subject. Adding "it" provides the necessary subject to make this a grammatically complete sentence.',
    6: 'Two independent clauses cannot be joined with just a space. The comma + FANBOYS word "and" properly connects "The concert was amazing" and "the band played for two hours."',
    7: 'A comma alone cannot join two independent clauses—this creates a comma splice. A semicolon is appropriate here because both clauses are independent and closely related in meaning.',
    8: '"Studying" is a present participle and cannot function as the main verb of a sentence. "Are studying" provides the complete verb phrase (helping verb + present participle) needed for a grammatically correct sentence.',
    9: 'When a FANBOYS conjunction connects two independent clauses, a comma must precede the conjunction. This is one of the fundamental rules of English punctuation.',
    10: 'When a dependent clause (introduced by "after," "before," "when," "if," etc.) begins a sentence, it must be followed by a comma before the independent clause starts.',
    11: 'The relative pronoun "which" creates a dependent clause fragment. Replacing it with the pronoun "it" creates an independent clause with its own subject and verb.',
    12: '"However" is a conjunctive adverb, not a coordinating conjunction. When joining independent clauses with a conjunctive adverb, use a semicolon before the adverb and a comma after it.',
    13: 'When a dependent clause follows an independent clause at the end of a sentence, no comma is needed before the subordinating conjunction ("unless," "if," "because," etc.).',
    14: 'A dependent clause beginning with "because" cannot stand alone as a sentence. It must be connected to the following independent clause with a comma, not separated with a period.',
    15: '"Therefore" is a conjunctive adverb requiring a semicolon before and a comma after when joining two independent clauses. This punctuation pattern applies to all conjunctive adverbs (however, moreover, consequently, etc.).',
    16: 'The dependent clause "While some students preferred online learning" must be separated from the independent clause "others found traditional classrooms more effective" with a comma.',
    17: 'In a simple list of three items with no internal commas, use regular commas to separate items. Semicolons are only necessary when list items themselves contain commas.',
    18: 'Conjunctive adverbs like "consequently" require stronger punctuation than coordinating conjunctions. Use a semicolon before the adverb and a comma after when connecting independent clauses.',
    19: '"Having won" is a participial phrase that correctly modifies "documentary." The sentence has a complete independent clause: "The documentary...will air on television next month." The participial phrase provides additional information.',
    20: 'This is a restrictive (essential) relative clause that identifies which specific research paper is being discussed. Restrictive clauses do not use commas. If it were non-restrictive (providing extra information), it would need commas.',
    21: '"Meanwhile" is a conjunctive adverb, requiring a semicolon before and comma after when connecting independent clauses. This distinguishes it from coordinating conjunctions which only need a comma.',
    22: 'The dependent clause "Although the committee reviewed..." must be attached to the main clause with a comma, not separated with a period. Removing "although" or changing the period to a comma fixes the fragment.',
    23: 'Semicolons can only connect two independent clauses. "To succeed in this course" is an introductory infinitive phrase, not an independent clause, so it requires a comma instead.',
    24: 'When "and" connects two verbs with the same subject (compound predicate), no comma is needed. A comma is only needed before "and" when it connects two independent clauses (each with its own subject and verb).',
    25: 'If this refers to your only sister, the clause is non-restrictive (extra information) and needs commas. If you have multiple sisters and this specifies which one, it\'s restrictive and needs no commas. Context typically suggests non-restrictive.',
    26: 'Two independent clauses require proper connection. Comma + FANBOYS ("and") creates that connection. Without both the comma and the conjunction, it\'s a run-on sentence.',
    27: 'The dependent clause "When the bell rang" needs to be properly connected to the independent clause "students rushed out" with a comma, creating a complete complex sentence.',
    28: 'A colon is used to introduce a list, explanation, or elaboration after a complete independent clause. A semicolon would incorrectly suggest two independent clauses.',
    29: '"Moreover" is a conjunctive adverb requiring a semicolon before and comma after when joining independent clauses. This creates proper separation between the two complete thoughts.',
    30: 'An appositive phrase ("a renowned expert in marine biology") renames or provides additional information about a noun and is correctly set off with commas on both sides.',
    31: 'When a dependent clause (starting with "if," "unless," "because," etc.) follows an independent clause, no comma is needed before the subordinating conjunction.',
    32: 'Two closely related independent clauses can be joined with a semicolon. This creates a stronger connection than a period but maintains proper separation between complete thoughts.',
    33: 'An introductory infinitive phrase ("To understand...") must be followed by a comma before the independent clause begins. A period creates a fragment.',
    34: 'A contrasting element introduced by "not" should be set off with a comma. This helps clarify the contrast being made: simple vs. complicated.',
    35: 'The dependent clause needs a comma after "innovative," and the non-restrictive clause "which consisted of experienced professionals" needs commas around it because it provides additional, non-essential information.',
    36: 'Use "which" (with commas) for non-restrictive clauses providing additional information. Use "that" (no commas) for restrictive clauses essential to meaning. Here, the approval timing is extra information, not essential identification.',
    37: 'When list items contain internal commas (like "Dr. Sarah Chen, a physicist from MIT"), semicolons must separate the major items to prevent confusion about where one item ends and another begins.',
    38: 'Parallel structure requires that items in a series match grammatically. Here, all three are noun clauses starting with question words: "how students learn," "what motivates them," and "the factors that..." (implied question).',
    39: 'The dependent clause beginning with "Despite" needs a comma after it. Additionally, the comma splice between "fossil fuels" and "this dependence" must be fixed with a period.',
    40: 'This is a restrictive clause—it specifies exactly which students (only those who completed the assignment). Restrictive clauses do not use commas. All students didn\'t receive higher grades, only those who completed it.',
    41: 'When a conjunctive adverb like "however" interrupts a clause (rather than joining two clauses), it should be set off with commas: "its profits, however, declined."',
    42: 'The sentence lacks a main verb. It has a subject ("The theory") and modifying clauses, but no predicate. Adding a verb phrase like "has been widely accepted" completes the sentence.',
    43: 'A colon can introduce an independent clause that explains or elaborates on the first independent clause. This is less common than using a colon for lists, but it\'s grammatically correct when the second clause explains the first.',
    44: 'The two parallel noun clauses "that filming would begin" and "that the cast should arrive early" are correctly structured without additional punctuation between them. They function as the compound object of "announced."',
    45: 'Parallel structure with "not only...but also" requires matching grammatical forms. "Not only for its...but also for its" maintains parallel structure with prepositional phrases.',
    46: 'Em dashes (—) provide stronger separation than commas and are appropriate for lengthy appositives that contain internal commas. They clearly mark the beginning and end of the appositive phrase.',
    47: 'The non-restrictive clause "which has transformed how we communicate" correctly interrupts the main clause and is properly set off with commas. It provides additional information about technology.',
    48: 'Parallel structure in a list requires consistency. The first two items use "that" to introduce clauses: "that human nature..." and "that reason..." The third must also use "that": "that morality..."',
    49: 'This restrictive clause specifies which economists are being discussed—not all economists, only those who study behavioral patterns. Restrictive clauses are not set off with commas.',
    50: 'The appositive needs a closing em dash, and the comma splice must be corrected. A period properly separates the two independent clauses: the discovery provided insights, and these findings challenged assumptions.'
  };

  try {
    // Get all questions
    const { data: questions } = await supabase
      .from('lesson_examples')
      .select('id, position')
      .eq('lesson_id', lessonId)
      .order('position');

    console.log(`Found ${questions.length} questions to update\n`);

    for (const question of questions) {
      const explanation = explanations[question.position];

      if (!explanation) {
        console.log(`  ⚠️  No explanation for position ${question.position}`);
        continue;
      }

      const { error } = await supabase
        .from('lesson_examples')
        .update({ answer_explanation: explanation })
        .eq('id', question.id);

      if (error) {
        console.error(`  ❌ Error updating position ${question.position}:`, error.message);
      } else {
        console.log(`  ✅ Updated position ${question.position}`);
      }
    }

    console.log('\n✅ All explanations updated successfully!');

  } catch (error) {
    console.error('\n❌ Error:', error);
    process.exit(1);
  }
}

updateExplanations();
