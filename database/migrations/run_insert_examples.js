/**
 * Insert Sentence Structure Examples into Database
 * Runs the SQL migration to insert 4 practice examples
 */

const { createClient } = require('@supabase/supabase-js');
const fs = require('fs');
const path = require('path');
require('dotenv').config();

const supabaseUrl = process.env.REACT_APP_SUPABASE_URL;
const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

if (!supabaseUrl || !supabaseKey) {
  console.error('❌ Missing Supabase credentials in .env file');
  process.exit(1);
}

const supabase = createClient(supabaseUrl, supabaseKey);

async function insertExamples() {
  console.log('🚀 Starting insertion of sentence-structure examples...\n');

  try {
    // Delete existing examples for sentence-structure
    console.log('📝 Deleting existing sentence-structure examples...');
    const lessonId = 'a5fd241f-9832-4a5d-a7e9-90cb6232c4ac'; // sentence-structure UUID
    const { error: deleteError } = await supabase
      .from('lesson_examples')
      .delete()
      .eq('lesson_id', lessonId);

    if (deleteError) {
      console.error('❌ Error deleting existing examples:', deleteError);
      throw deleteError;
    }
    console.log('✅ Deleted existing examples\n');

    // Example 1: Identifying Sentence Fragments
    console.log('📝 Inserting Example 1: Identifying Sentence Fragments...');
    const { error: error1 } = await supabase
      .from('lesson_examples')
      .insert({
        lesson_id: lessonId,
        position: 1,
        title: 'Identifying Sentence Fragments',
        problem_text: 'In the late 1960s, the "must-have" toy at the Cincinnati Toy <u>Fair a</u> new type of diecast toy car that would later become the popular brand Hot Wheels.',
        choices: [
          { letter: 'A', text: 'NO CHANGE' },
          { letter: 'B', text: 'Fair,' },
          { letter: 'C', text: 'Fair;' },
          { letter: 'D', text: 'Fair was' }
        ],
        correct_answer: 'D',
        solution_steps: [],
        answer_explanation: `The original sentence is a fragment because it lacks a main verb.

**Step 1: Read the sentence and identify the problem**
The sentence reads: "In the late 1960s, the \\"must-have\\" toy at the Cincinnati Toy Fair a new type of diecast toy car..."

When you read this aloud, you should feel like something is missing. Where is the verb? What happened at the Toy Fair?

**Step 2: Find the split point**
The underlined portion is "Fair a"—we need to determine what should come after "Fair"

**Step 3: Test each choice**
- **A (NO CHANGE - "Fair a"):** Still no verb connecting the subject to what it is. Fragment!
- **B ("Fair,"):** Adds a comma but still no verb. Fragment!
- **C ("Fair;"):** Semicolons connect independent clauses, but neither side is independent without a verb. Fragment!
- **D ("Fair was"):** Perfect! "Was" is the linking verb. Now we have: "The toy...Fair was a new type of diecast toy car." Complete sentence!

The answer is **D**.`,
        is_worked_example: false
      });

    if (error1) throw error1;
    console.log('✅ Inserted Example 1\n');

    // Example 2: Comma + FANBOYS vs. Comma Splices
    console.log('📝 Inserting Example 2: Comma + FANBOYS vs. Comma Splices...');
    const { error: error2 } = await supabase
      .from('lesson_examples')
      .insert({
        lesson_id: lessonId,
        position: 2,
        title: 'Comma + FANBOYS vs. Comma Splices',
        problem_text: 'After hummingbirds evolved long, thin beaks to reach pollen in flowers<u>, however this</u> evolutionary advantage allowed them to survive entirely on flower nectar, tree sap, and pollen.',
        choices: [
          { letter: 'A', text: 'NO CHANGE' },
          { letter: 'B', text: ', therefore this' },
          { letter: 'C', text: ' and this' },
          { letter: 'D', text: 'DELETE the underlined portion' }
        ],
        correct_answer: 'C',
        solution_steps: [],
        answer_explanation: `This tests proper connection between a dependent and independent clause.

**Step 1: Identify the clauses**
- Left: "After hummingbirds evolved long, thin beaks to reach pollen in flowers" → DEPENDENT (starts with "After")
- Right: "this evolutionary advantage allowed them to survive..." → INDEPENDENT

**Step 2: Apply the 5 compound sentence rules**
We have: Dependent + ? + Independent

**Step 3: Test each choice**
- **A ("however"):** "However" is a transition word, not a FANBOYS conjunction. With just a comma, this creates an error.
- **B ("therefore"):** Same problem—"therefore" isn't a FANBOYS word.
- **C ("and"):** "After hummingbirds evolved...flowers and this advantage allowed..." The FANBOYS word "and" properly connects these clauses. Correct!
- **D (DELETE):** This would create: "...flowers, this evolutionary advantage..." While this follows Rule #4 (Dependent + comma + Independent), the connection is unclear.

**Why C is best:**
The FANBOYS word "and" creates the clearest connection between the evolution and its result.

The answer is **C**.`,
        is_worked_example: false
      });

    if (error2) throw error2;
    console.log('✅ Inserted Example 2\n');

    // Example 3: Fixing Comma Splices
    console.log('📝 Inserting Example 3: Fixing Comma Splices...');
    const { error: error3 } = await supabase
      .from('lesson_examples')
      .insert({
        lesson_id: lessonId,
        position: 3,
        title: 'Fixing Comma Splices',
        problem_text: 'Hockey is my favorite <u>sport, although</u> I cannot skate very well.\n\nWhich of the following alternatives to the underlined portion would be acceptable?',
        choices: [
          { letter: 'A', text: 'sport, but' },
          { letter: 'B', text: 'sport even though' },
          { letter: 'C', text: 'sport, so' }
        ],
        correct_answer: 'A',
        solution_steps: [],
        answer_explanation: `This question asks which alternative works, so we test each one.

**Original:** "Hockey is my favorite sport, although I cannot skate very well."

This is CORRECT! "Although" makes the second clause dependent, and the comma properly connects them.

**Step 1: Test each alternative**

**A ("sport, but"):** "Hockey is my favorite sport, but I cannot skate very well."
- Left: "Hockey is my favorite sport" → INDEPENDENT
- Right: "I cannot skate very well" → INDEPENDENT
- Connection: comma + FANBOYS ("but")
- This follows the comma + FANBOYS rule! Correct!

**B ("sport even though"):** "Hockey is my favorite sport even though I cannot skate very well."
- Removes the comma before "even though"
- This doesn't work - needs a comma

**C ("sport, so"):** "Hockey is my favorite sport, so I cannot skate very well."
- This changes the meaning - "so" suggests the second clause is a result of the first, which doesn't make logical sense here

The answer is **A**.`,
        is_worked_example: false
      });

    if (error3) throw error3;
    console.log('✅ Inserted Example 3\n');

    // Example 4: Dependent Clauses Creating Fragments
    console.log('📝 Inserting Example 4: Dependent Clauses Creating Fragments...');
    const { error: error4 } = await supabase
      .from('lesson_examples')
      .insert({
        lesson_id: lessonId,
        position: 4,
        title: 'Dependent Clauses Creating Fragments',
        problem_text: '<u>While the bakery varies its types of bread</u> with the seasons, ranging from tomato basil loafs in the summer to olive rosemary focaccia in the fall, and always has a line around the block.',
        choices: [
          { letter: 'A', text: 'NO CHANGE' },
          { letter: 'B', text: 'Having various types of bread' },
          { letter: 'C', text: 'With the bakery having varied bread types' },
          { letter: 'D', text: 'The bakery varies its types of bread' }
        ],
        correct_answer: 'D',
        solution_steps: [],
        answer_explanation: `This sentence is a fragment disguised as a complex sentence.

**Step 1: Read the sentence aloud**
Do you feel like you can stop at the end? No! You're left waiting for more.

**Step 2: Identify the problem**
The sentence starts with "While," making the entire thing a dependent clause with no independent clause to complete it. This is a FRAGMENT.

**Step 3: Test each choice**
- **A ("While the bakery varies"):** The whole sentence is dependent with no independent clause. Fragment!

- **B ("Having various types of bread"):** "Having" creates a participial phrase, not an independent clause. Still a fragment!

- **C ("With the bakery having varied"):** "With" creates a prepositional phrase. Still no independent clause. Fragment!

- **D ("The bakery varies its types of bread"):** Now we have:
  - Subject: "The bakery"
  - Verbs: "varies" and "has"
  - Complete sentence: "The bakery varies its types of bread...and always has a line around the block."

  This is a complete independent clause! Correct!

**Why D is correct:**
Removing "While" transforms the dependent clause into an independent clause with a clear subject and verbs.

The answer is **D**.`,
        is_worked_example: false
      });

    if (error4) throw error4;
    console.log('✅ Inserted Example 4\n');

    // Verify inserts
    console.log('🔍 Verifying inserts...');
    const { data, error: selectError } = await supabase
      .from('lesson_examples')
      .select('lesson_id, position, title, correct_answer')
      .eq('lesson_id', lessonId)
      .order('position');

    if (selectError) throw selectError;

    console.log('\n✅ Successfully inserted examples:');
    console.table(data);

    console.log('\n🎉 All done! 4 examples inserted successfully.');
  } catch (error) {
    console.error('\n❌ Error:', error);
    process.exit(1);
  }
}

insertExamples();
