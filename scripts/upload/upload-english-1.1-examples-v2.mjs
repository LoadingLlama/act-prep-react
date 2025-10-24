import { createClient } from '@supabase/supabase-js';

const supabase = createClient(
  'https://rabavobdklnwvwsldbix.supabase.co',
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InJhYmF2b2Jka2xud3Z3c2xkYml4Iiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc1OTc2NTQ3OCwiZXhwIjoyMDc1MzQxNDc4fQ.81SeH703keXgF3IevQlRS7OYmn1J2GUVIkn3OJiviM4'
);

const { data: lessonData, error: lessonError } = await supabase
  .from('lessons')
  .select('id')
  .eq('lesson_key', 'sentence-structure')
  .single();

if (lessonError) {
  console.error('Error fetching lesson:', lessonError);
  process.exit(1);
}

console.log('Creating examples for Topic 1.1 - Building Complete Sentences...\\n');

// Create 4 examples (one per H3 section - NOT two in a row!)
const examples = [
  {
    lesson_id: lessonData.id,
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
  },
  {
    lesson_id: lessonData.id,
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
  },
  {
    lesson_id: lessonData.id,
    position: 3,
    title: 'Fixing Comma Splices',
    problem_text: 'Hockey is my favorite <u>sport, although</u> I cannot skate very well.\\n\\nWhich of the following alternatives to the underlined portion would be acceptable?',
    choices: [
      { letter: 'A', text: 'sport, but' },
      { letter: 'B', text: 'sport even though' },
      { letter: 'C', text: 'sport, so' },
      { letter: 'D', text: 'sport; although' }
    ],
    correct_answer: 'A',
    solution_steps: [],
    answer_explanation: `This asks which alternative is ACCEPTABLE (grammatically correct).

**Step 1: Analyze the structure**
- Left: "Hockey is my favorite sport" (independent)
- Right: "I cannot skate very well" (independent when we remove "although")

**Step 2: Test each choice**
- **A ("sport, but"):** Independent + comma + FANBOYS + Independent. Follows Rule #2 perfectly! Correct!

- **B ("sport even though"):** Independent + no comma + Dependent. This follows Rule #5! Also correct grammatically!

- **C ("sport, so"):** Grammatically this follows Rule #2, BUT logically it doesn't make sense. Being bad at skating isn't CAUSED by loving hockey. Incorrect due to illogical meaning.

- **D ("sport; although"):** Semicolons must connect TWO independent clauses, but "although I cannot skate very well" is dependent. Incorrect!

**Why A is the best answer:**
Choice A properly uses comma + FANBOYS and maintains logical meaning (contrast between loving hockey BUT being unable to skate).

The answer is **A**.`,
    is_worked_example: false
  },
  {
    lesson_id: lessonData.id,
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
  }
];

for (const example of examples) {
  const { error } = await supabase
    .from('lesson_examples')
    .insert(example);

  if (error) {
    console.error(`Error creating example at position ${example.position}:`, error.message);
  } else {
    console.log(`✓ Example ${example.position} created: ${example.title}`);
  }
}

console.log('\\n✅ Topic 1.1 - Building Complete Sentences examples complete (with underlines)!');
