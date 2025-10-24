import { createClient } from '@supabase/supabase-js';

const supabase = createClient(
  'https://rabavobdklnwvwsldbix.supabase.co',
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InJhYmF2b2Jka2xud3Z3c2xkYml4Iiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc1OTc2NTQ3OCwiZXhwIjoyMDc1MzQxNDc4fQ.81SeH703keXgF3IevQlRS7OYmn1J2GUVIkn3OJiviM4'
);

const { data: lessonData, error: lessonError } = await supabase
  .from('lessons')
  .select('id')
  .eq('lesson_key', 'commas')
  .single();

if (lessonError) {
  console.error('Error fetching lesson:', lessonError);
  process.exit(1);
}

console.log('Creating examples for Topic 1.2 - Understanding Comma Usage...\\n');

// Create 4 examples (one per H3 section)
const examples = [
  {
    lesson_id: lessonData.id,
    position: 1,
    title: 'Identifying Comma + FANBOYS',
    problem_text: 'The debate team took first place in California<u>, and then</u> won the grand prize for the entire nation.',
    choices: [
      { letter: 'A', text: 'NO CHANGE' },
      { letter: 'B', text: ', and then it' },
      { letter: 'C', text: ' and then' },
      { letter: 'D', text: ', yet then it' }
    ],
    correct_answer: 'C',
    solution_steps: [],
    answer_explanation: `This tests whether a comma + FANBOYS is needed.

**Step 1: Identify the structure**
We have: "The debate team took first place in California" + [underlined portion] + "won the grand prize for the entire nation"

**Step 2: Check if both sides are independent clauses**
- Left: "The debate team took first place in California" (independent - has subject and verb)
- Right: "won the grand prize for the entire nation" (NOT independent - missing subject!)

The right side is not a complete sentence by itself. It shares the subject "The debate team" from the left side.

**Step 3: Apply the comma rules**
Since the right side is NOT an independent clause, we DON'T need comma + FANBOYS. This is just a list of two actions done by the same subject.

**Step 4: Test each choice**
- **A (NO CHANGE - ", and then"):** Comma + FANBOYS is only for joining two independent clauses. The right side isn't independent. Incorrect!

- **B (", and then it"):** Adding "it" makes the right side independent, but this creates a new error—"it" is vague and unclear. Incorrect!

- **C (" and then"):** No comma, just "and" connecting two verb phrases. This is a two-item list (took first place AND won grand prize), which doesn't need a comma. Correct!

- **D (", yet then it"):** "Yet" doesn't make logical sense here (no contrast), and "it" is vague. Incorrect!

**Why C is correct:**
This is a two-item list of actions by the same subject, not two independent clauses. Two-item lists don't need commas.

The answer is **C**.`,
    is_worked_example: false
  },
  {
    lesson_id: lessonData.id,
    position: 2,
    title: 'Unnecessary Information with Names',
    problem_text: 'Mr. Alvin<u> a very popular</u> teacher among the students cancelled the final exam.',
    choices: [
      { letter: 'A', text: 'NO CHANGE' },
      { letter: 'B', text: ', a very popular,' },
      { letter: 'C', text: ' a very popular,' },
      { letter: 'D', text: ', a very popular' }
    ],
    correct_answer: 'D',
    solution_steps: [],
    answer_explanation: `This tests commas with unnecessary information (appositives).

**Step 1: Identify the structure**
"Mr. Alvin" is followed by descriptive information "a very popular teacher among the students"

**Step 2: Is the information necessary or unnecessary?**
Remove "a very popular teacher among the students" → "Mr. Alvin cancelled the final exam"

This is still a complete sentence! The phrase is unnecessary information (an appositive) that adds extra detail about Mr. Alvin.

**Step 3: Apply the crossing-out trick**
Unnecessary information in the MIDDLE of a sentence needs commas on BOTH sides to set it apart.

**Step 4: Test each choice**
- **A (NO CHANGE):** No commas at all. This runs the appositive into the sentence without separating it. Incorrect!

- **B (", a very popular,"):** Two commas surround "a very popular," but this cuts off "teacher among the students" which is part of the appositive phrase. The full phrase is "a very popular teacher among the students." Incorrect!

- **C (" a very popular,"):** Comma after but not before. Unnecessary information in the middle needs commas on BOTH sides. Incorrect!

- **D (", a very popular"):** Wait, let's look at the full sentence with this choice:
  "Mr. Alvin, a very popular teacher among the students, cancelled the final exam."

  Actually, there must be a comma after "students" (not shown in the underlined portion). The underlined portion only shows where the FIRST comma goes. This correctly starts the appositive with a comma. Correct!

**Why D is correct:**
The appositive "a very popular teacher among the students" is unnecessary information that needs commas on both sides. D provides the opening comma.

The answer is **D**.`,
    is_worked_example: false
  },
  {
    lesson_id: lessonData.id,
    position: 3,
    title: 'Transitional Words (However)',
    problem_text: 'I expected to pay over $100 for my new hiking boots<u>; however,</u> I found a sale and got them for half of the original price.',
    choices: [
      { letter: 'A', text: 'NO CHANGE' },
      { letter: 'B', text: ', however,' },
      { letter: 'C', text: ', however' },
      { letter: 'D', text: '; however' }
    ],
    correct_answer: 'A',
    solution_steps: [],
    answer_explanation: `This tests punctuation of transitional words between independent clauses.

**Step 1: Identify the clauses**
- Left: "I expected to pay over $100 for my new hiking boots" (independent)
- Right: "I found a sale and got them for half of the original price" (independent)

We have two independent clauses with the transitional word "however" between them.

**Step 2: Recall the transitional word punctuation rules**
When a transitional word appears between two independent clauses:
- Use semicolon BEFORE the transitional word
- Use comma AFTER the transitional word

Structure: Independent clause + semicolon + transitional word + comma + Independent clause

**Step 3: Test each choice**
- **A (NO CHANGE - "; however,"):** Semicolon before, comma after. This matches the rule perfectly! Correct!

- **B (", however,"):** Comma before and after. This creates a comma splice—you can't join two independent clauses with just a comma. Incorrect!

- **C (", however"):** Comma before, no comma after. Still a comma splice, and missing the comma after "however." Incorrect!

- **D ("; however"):** Semicolon before, but missing the comma after. Transitional words between independent clauses need BOTH punctuation marks. Incorrect!

**Why A is correct:**
The semicolon before "however" properly separates the two independent clauses, and the comma after "however" is required for transitional words in this position.

The answer is **A**.`,
    is_worked_example: false
  },
  {
    lesson_id: lessonData.id,
    position: 4,
    title: 'Unnecessary Information (Crossing-Out Trick)',
    problem_text: 'Electric vehicles<u>, thousands of them,</u> already on the road in America, are one of the fastest growing industries in the world.',
    choices: [
      { letter: 'A', text: 'NO CHANGE' },
      { letter: 'B', text: ', thousands, of them' },
      { letter: 'C', text: ' thousands of them' },
      { letter: 'D', text: ' thousands of, them' }
    ],
    correct_answer: 'C',
    solution_steps: [],
    answer_explanation: `This is a classic unnecessary information comma question where all choices have the same words but different comma placement.

**Step 1: Read the complete sentence**
Notice there's ANOTHER comma after "America" that's NOT in the underlined portion. This is a major clue!

Full sentence: "Electric vehicles, thousands of them, already on the road in America, are one of the fastest growing industries in the world."

**Step 2: Use the crossing-out trick**
We need to figure out what phrase is unnecessary. Let's test different options:

Option 1: Cross out just "thousands of them"
"Electric vehicles already on the road in America, are one of the fastest growing industries"
This doesn't work—there's a comma after "America" that shouldn't be there.

Option 2: Cross out "thousands of them already on the road in America"
"Electric vehicles, are one of the fastest growing industries in the world"
This doesn't work either—unnecessary comma after "vehicles."

Option 3: Cross out "thousands of them already on the road in America"
Wait! The commas suggest this entire phrase is unnecessary. Let's test:
"Electric vehicles are one of the fastest growing industries in the world"
Perfect! This is a complete sentence!

**Step 3: Test each choice**
We need NO commas around "thousands of them" because the entire phrase (including the words after it) is one long unnecessary phrase separated by the commas before "thousands" and after "America."

- **A (", thousands of them,"):** Commas around just "thousands of them" would incorrectly break up the single phrase. Incorrect!

- **B (", thousands, of them"):** Comma in weird positions that break up the phrase incorrectly. Incorrect!

- **C (" thousands of them"):** No commas around these specific words, allowing the entire phrase "thousands of them already on the road in America" to be treated as one unit separated by commas. Correct!

- **D (" thousands of, them"):** Comma in the middle of "thousands of them" breaks it up incorrectly. Incorrect!

**Why C is correct:**
The unnecessary information is the ENTIRE phrase "thousands of them already on the road in America," which is separated by the comma after "vehicles" and the comma after "America." Within that phrase, we don't need additional commas.

The answer is **C**.`,
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

console.log('\\n✅ Topic 1.2 - Understanding Comma Usage examples complete!');
