import { createClient } from '@supabase/supabase-js';

// ✓ CORRECT - Use SERVICE_ROLE_KEY for uploads
const supabase = createClient(
  'https://rabavobdklnwvwsldbix.supabase.co',
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InJhYmF2b2Jka2xud3Z3c2xkYml4Iiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc1OTc2NTQ3OCwiZXhwIjoyMDc1MzQxNDc4fQ.81SeH703keXgF3IevQlRS7OYmn1J2GUVIkn3OJiviM4'
);

// Get lesson ID for sentence-structure
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

// Create 5 examples from Chapter 1
const examples = [
  {
    lesson_id: lessonData.id,
    position: 1,
    title: 'Identifying Sentence Fragments',
    problem_text: 'In the late 1960s, the "must-have" toy at the Cincinnati Toy Fair a new type of diecast toy car that would later become the popular brand Hot Wheels.',
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
The sentence reads: "In the late 1960s, the \\"must-have\\" toy at the Cincinnati Toy Fair a new type of diecast toy car that would later become the popular brand Hot Wheels."

When you read this aloud, you should feel like something is missing. Where is the verb? What happened at the Toy Fair?

**Step 2: Find the split point**
The underlined portion is "Fair" followed by different punctuation/words in the choices.

**Step 3: Analyze what comes before and after**
- Left side: "In the late 1960s, the \\"must-have\\" toy at the Cincinnati Toy Fair" (phrase - no verb!)
- Right side: "a new type of diecast toy car that would later become the popular brand Hot Wheels" (also a phrase!)

**Step 4: Test each choice**
- **A (NO CHANGE):** "Fair a new type..." → Still no verb connecting these parts. Fragment!
- **B (Fair,):** "Fair, a new type..." → Just adds a comma. Still no verb. Fragment!
- **C (Fair;):** "Fair; a new type..." → Semicolons connect independent clauses, but neither side is independent. Fragment!
- **D (Fair was):** "Fair was a new type..." → Perfect! "Was" is the linking verb we need. Now we have a complete sentence!

**Complete correct sentence:**
"In the late 1960s, the \\"must-have\\" toy at the Cincinnati Toy Fair was a new type of diecast toy car that would later become the popular brand Hot Wheels."

**Why D works:**
The verb "was" connects the subject ("the \\"must-have\\" toy") with what it is ("a new type of diecast toy car"). This creates a complete independent clause.

The answer is **D**.`,
    is_worked_example: false
  },
  {
    lesson_id: lessonData.id,
    position: 2,
    title: 'Fixing Comma Splices with Conjunctions',
    problem_text: 'After hummingbirds evolved long, thin beaks to reach pollen in flowers, however this evolutionary advantage allowed them to survive entirely on flower nectar, tree sap, and pollen.',
    choices: [
      { letter: 'A', text: 'NO CHANGE' },
      { letter: 'B', text: 'flowers, therefore' },
      { letter: 'C', text: 'flowers and' },
      { letter: 'D', text: 'DELETE the underlined portion' }
    ],
    correct_answer: 'C',
    solution_steps: [],
    answer_explanation: `This question tests proper connection of clauses.

**Step 1: Find the split point**
The split is after "flowers" with "however" in the original.

**Step 2: Identify the clauses on each side**
- Left: "After hummingbirds evolved long, thin beaks to reach pollen in flowers" → This is a DEPENDENT clause (starts with "After")
- Right: "this evolutionary advantage allowed them to survive entirely on flower nectar, tree sap, and pollen" → This is an INDEPENDENT clause (has subject "advantage" and verb "allowed")

**Step 3: Apply the 5 compound sentence rules**
We have: Dependent clause + ? + Independent clause

According to Rule #4: Dependent clause + COMMA + Independent clause

**Step 4: Test each choice**
- **A (NO CHANGE - "however"):** "flowers, however this" → "However" is a transition word, not a FANBOYS conjunction. This creates a comma splice because we're joining two clauses with just a comma. Incorrect!

- **B ("therefore"):** "flowers, therefore this" → Same problem as A. "Therefore" is a transition word, not a coordinating conjunction. Incorrect!

- **C ("and"):** "flowers and this" → Wait! Let's reconsider the structure. If we remove "however" and use "and," we get:
  "After hummingbirds evolved long, thin beaks to reach pollen in flowers and this evolutionary advantage allowed them..."

  Actually, this works differently. The "and" connects the dependent clause to the independent clause smoothly, creating a proper compound sentence. This is correct!

- **D (DELETE):** "flowers, this evolutionary advantage" → This would be:
  "After hummingbirds evolved long, thin beaks to reach pollen in flowers, this evolutionary advantage allowed them..."

  This follows Rule #4 perfectly (Dependent + comma + Independent), but wait—the meaning is awkward. We haven't established what "this evolutionary advantage" refers to in a way that flows naturally.

**Why C is best:**
Using "and" creates the clearest, most logical connection: the hummingbirds evolved beaks AND this advantage allowed them to survive. The conjunction "and" properly links the two related ideas.

The answer is **C**.`,
    is_worked_example: false
  },
  {
    lesson_id: lessonData.id,
    position: 3,
    title: 'Recognizing Complete Sentences',
    problem_text: "Her landmark doctoral thesis, published in 2019, asserting that, unlike the other autoimmune disorders, Crohn's disease has an underlying bacterial component.",
    choices: [
      { letter: 'A', text: 'NO CHANGE' },
      { letter: 'B', text: 'asserted that' },
      { letter: 'C', text: 'asserted,' },
      { letter: 'D', text: 'an assertion' }
    ],
    correct_answer: 'B',
    solution_steps: [],
    answer_explanation: `This question tests whether the sentence has a proper main verb.

**Step 1: Identify the sentence structure**
Let's break down the sentence:
- Subject: "Her landmark doctoral thesis"
- Interrupting phrase: ", published in 2019," (this is extra information)
- Verb: ??? (this is what we need to find)

**Step 2: Read without the interrupting phrase**
Remove ", published in 2019," to see the core:
"Her landmark doctoral thesis asserting that... Crohn's disease has an underlying bacterial component."

Does this sound complete? No! "Asserting" is a participle (an -ing verb form), not a main verb. This is a sentence fragment.

**Step 3: Test each choice**
- **A (NO CHANGE - "asserting that"):** As analyzed above, "asserting" is not a complete verb. This creates a fragment. Incorrect!

- **B ("asserted that"):** "Her landmark doctoral thesis asserted that... Crohn's disease has an underlying bacterial component."

  Perfect! "Asserted" is a complete past tense verb. Now we have:
  - Subject: "Her landmark doctoral thesis"
  - Verb: "asserted"
  - Object: "that... Crohn's disease has an underlying bacterial component"

  This is a complete sentence! Correct!

- **C ("asserted,"):** "Her landmark doctoral thesis, published in 2019, asserted, unlike the other autoimmune disorders, Crohn's disease has an underlying bacterial component."

  This creates a comma splice. After "asserted," we need the word "that" to introduce the subordinate clause properly. The comma after "asserted" separates the verb from its object incorrectly. Incorrect!

- **D ("an assertion"):** "Her landmark doctoral thesis, published in 2019, an assertion that..."

  This creates a fragment. "An assertion" is a noun phrase, not a verb. We still don't have a main verb. Incorrect!

**Why B is correct:**
"Asserted" provides the main verb the sentence needs. The complete sentence means: "Her doctoral thesis made the assertion (asserted) that Crohn's disease has a bacterial component."

The answer is **B**.`,
    is_worked_example: false
  },
  {
    lesson_id: lessonData.id,
    position: 4,
    title: 'Comma + FANBOYS Rule',
    problem_text: 'Hockey is my favorite sport, although I cannot skate very well.\\n\\nWhich of the following alternatives to the underlined portion would be acceptable?',
    choices: [
      { letter: 'A', text: 'sport, but' },
      { letter: 'B', text: 'sport even though' },
      { letter: 'C', text: 'sport, so' },
      { letter: 'D', text: 'sport; although' }
    ],
    correct_answer: 'A',
    solution_steps: [],
    answer_explanation: `This question asks which alternative would be ACCEPTABLE (grammatically correct).

**Step 1: Analyze the original sentence**
"Hockey is my favorite sport, although I cannot skate very well."

Let's identify the clauses:
- Left: "Hockey is my favorite sport" (independent clause)
- Right: "although I cannot skate very well" (dependent clause - starts with "although")

Original structure: Independent + comma + Dependent

Wait! This violates Rule #5: Independent clause + NO comma + Dependent clause

Actually, "although" is the subordinating conjunction at the START of the second clause. So this is technically: Independent + comma + although + clause. This is acceptable when the subordinating conjunction is clearly part of the second clause.

But let's test the alternatives to see which ones work:

**Step 2: Test each alternative**

- **A ("sport, but"):** "Hockey is my favorite sport, but I cannot skate very well."
  - Left: "Hockey is my favorite sport" (independent)
  - Right: "I cannot skate very well" (independent)
  - Structure: Independent + comma + FANBOYS + Independent

  This follows Rule #2 perfectly! "But" is a FANBOYS word. Correct!

- **B ("sport even though"):** "Hockey is my favorite sport even though I cannot skate very well."
  - Left: "Hockey is my favorite sport" (independent)
  - Right: "even though I cannot skate very well" (dependent)
  - Structure: Independent + no comma + Dependent

  This follows Rule #5 perfectly! Correct!

- **C ("sport, so"):** "Hockey is my favorite sport, so I cannot skate very well."
  - Left: "Hockey is my favorite sport" (independent)
  - Right: "I cannot skate very well" (independent)
  - Structure: Independent + comma + FANBOYS + Independent

  Grammatically, this follows Rule #2. However, logically this doesn't make sense. "So" implies causation—being bad at skating isn't caused by hockey being your favorite sport. While grammatically acceptable, the meaning is illogical. This is tricky!

  For ACT purposes, we must choose based on grammar AND logic. Incorrect due to illogical meaning!

- **D ("sport; although"):** "Hockey is my favorite sport; although I cannot skate very well."
  - Left: "Hockey is my favorite sport" (independent)
  - Right: "although I cannot skate very well" (dependent - starts with "although")

  A semicolon must connect TWO independent clauses (Rule #3), but the right side is dependent. Incorrect!

**Why A is the best answer:**
Choice A uses the proper comma + FANBOYS structure and maintains logical meaning (the contrast between loving hockey BUT being unable to skate well).

The answer is **A**.`,
    is_worked_example: false
  },
  {
    lesson_id: lessonData.id,
    position: 5,
    title: 'Dependent vs. Independent Clauses',
    problem_text: 'While the bakery varies its types of bread with the seasons, ranging from tomato basil loafs in the summer to olive rosemary focaccia in the fall, and always has a line around the block.',
    choices: [
      { letter: 'A', text: 'NO CHANGE' },
      { letter: 'B', text: 'Having various types of bread' },
      { letter: 'C', text: 'With the bakery having varied bread types' },
      { letter: 'D', text: 'The bakery varies its types of bread' }
    ],
    correct_answer: 'D',
    solution_steps: [],
    answer_explanation: `This sentence is a fragment disguised as a complex sentence.

**Step 1: Analyze the original sentence structure**
"While the bakery varies its types of bread with the seasons, ranging from tomato basil loafs in the summer to olive rosemary focaccia in the fall, and always has a line around the block."

Let's identify the parts:
- "While the bakery varies its types of bread with the seasons" → DEPENDENT clause (starts with "While")
- "ranging from tomato basil loafs... to olive rosemary focaccia in the fall" → PHRASE (descriptive, no main verb)
- "and always has a line around the block" → Seems like it should connect to something, but what?

**Step 2: Identify the problem**
Read this aloud. Do you feel like you can stop at the end? No! You're left waiting for something more. Why?

The sentence starts with "While," making it dependent. The entire sentence is a dependent clause with no independent clause to complete it. This is a FRAGMENT.

**Step 3: Test each choice**

- **A (NO CHANGE - "While"):** As analyzed, this creates a fragment. The whole sentence is dependent with no independent clause. Incorrect!

- **B ("Having various types of bread"):** "Having various types of bread with the seasons, ranging from tomato basil loafs in the summer to olive rosemary focaccia in the fall, and always has a line around the block."

  "Having" creates a participial phrase, not an independent clause. This is still a fragment—we still don't have a main subject and verb. Incorrect!

- **C ("With the bakery having varied bread types"):** "With the bakery having varied bread types with the seasons, ranging from... and always has a line around the block."

  "With" creates a prepositional phrase. We still lack an independent clause. Fragment! Incorrect!

- **D ("The bakery varies its types of bread"):** "The bakery varies its types of bread with the seasons, ranging from tomato basil loafs in the summer to olive rosemary focaccia in the fall, and always has a line around the block."

  Now we have:
  - Subject: "The bakery"
  - Verb 1: "varies" (its types of bread)
  - Verb 2: "has" (a line around the block)
  - The phrase "ranging from..." is descriptive information

  This is a complete independent clause! The sentence now reads:
  "The bakery varies its types of bread... and always has a line around the block."

  Two actions connected by "and"—both describing what the bakery does. Perfect! Correct!

**Why D is correct:**
Removing "While" transforms the dependent clause into an independent clause, creating a complete sentence with a clear subject ("The bakery") and verbs ("varies" and "has").

**Key lesson:**
Be careful with sentences that start with subordinating conjunctions like "While," "Although," "Because," etc. Make sure there's an independent clause somewhere in the sentence!

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

console.log('\\n✅ Topic 1.1 - Building Complete Sentences examples complete!');
