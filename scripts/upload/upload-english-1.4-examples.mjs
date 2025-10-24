import { createClient } from '@supabase/supabase-js';

const supabase = createClient(
  'https://rabavobdklnwvwsldbix.supabase.co',
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InJhYmF2b2Jka2xud3Z3c2xkYml4Iiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc1OTc2NTQ3OCwiZXhwIjoyMDc1MzQxNDc4fQ.81SeH703keXgF3IevQlRS7OYmn1J2GUVIkn3OJiviM4'
);

const { data: lessonData, error: lessonError } = await supabase
  .from('lessons')
  .select('id')
  .eq('lesson_key', 'verbs')
  .single();

if (lessonError) {
  console.error('Error fetching lesson:', lessonError);
  process.exit(1);
}

console.log('Creating examples for Topic 1.4 - Verbs...\n');

// Create 4 examples (one per H3 section)
const examples = [
  {
    lesson_id: lessonData.id,
    position: 1,
    title: 'Subject-Verb Agreement with Prepositional Phrases',
    problem_text: 'The stable hand hired by the farm owners <u>groom</u> the horses every morning.',
    choices: [
      { letter: 'A', text: 'NO CHANGE' },
      { letter: 'B', text: 'grooms' },
      { letter: 'C', text: 'have groomed' },
      { letter: 'D', text: 'are grooming' }
    ],
    correct_answer: 'B',
    solution_steps: [],
    answer_explanation: `This tests subject-verb agreement with prepositional phrases between the subject and verb.

**Step 1: Identify the verb and find the subject**
The underlined portion is "groom," which is a verb. We need to find the subject to determine if the verb should be singular or plural.

**Step 2: Cross out prepositional phrases**
The sentence has the prepositional phrase "by the farm owners" between the subject and verb.

Remember: Prepositional phrases NEVER contain the subject. Cross it out:

"The stable hand hired by-the-farm-owners groom the horses every morning."

**Step 3: Identify the subject**
After crossing out the prepositional phrase, the subject is "stable hand" (singular).

The phrase "hired by the farm owners" is unnecessary information describing the stable hand, but the main subject is still "stable hand."

**Step 4: Match the verb to the subject**
Subject: "stable hand" (singular) → Verb must be singular

Plug in "he/she/it" to test: "He grooms the horses every morning." ✓ This sounds correct!

**Step 5: Test each choice**
- **A (NO CHANGE - "groom"):** This is plural. "The stable hand groom" doesn't match. Incorrect!

- **B ("grooms"):** This is singular. "The stable hand grooms the horses" matches perfectly! Correct!

- **C ("have groomed"):** This is plural (have = plural). Also introduces an unnecessary perfect tense. Incorrect!

- **D ("are grooming"):** This is plural (are = plural). "The stable hand are grooming" doesn't work. Incorrect!

**Why B is correct:**
The singular subject "stable hand" requires the singular verb "grooms."

The answer is **B**.`,
    is_worked_example: false
  },
  {
    lesson_id: lessonData.id,
    position: 2,
    title: 'Verb Tense Matching Context',
    problem_text: 'The car accident on the freeway delayed my commute and <u>causes</u> me to be late for the job interview.',
    choices: [
      { letter: 'A', text: 'NO CHANGE' },
      { letter: 'B', text: 'caused' },
      { letter: 'C', text: 'will cause' },
      { letter: 'D', text: 'has caused' }
    ],
    correct_answer: 'B',
    solution_steps: [],
    answer_explanation: `This tests whether you can match verb tense to the context of the sentence.

**Step 1: Look for context clues in the sentence**
The sentence has two verbs connected by "and":
- "delayed my commute"
- "causes me to be late"

These two actions are happening at the same time (both caused by the car accident).

**Step 2: Identify the tense of the first verb**
"delayed" is past tense

Since the two verbs are connected by "and" and describe two results of the same event (the car accident), they should be in the same tense.

**Step 3: Determine what tense is needed**
We need past tense to match "delayed."

**Step 4: Test each choice**
- **A (NO CHANGE - "causes"):** This is present tense. "delayed...and causes" mixes past and present tense. Incorrect!

- **B ("caused"):** This is past tense. "delayed my commute and caused me to be late" keeps both verbs in past tense. Correct!

- **C ("will cause"):** This is future tense. "delayed...and will cause" mixes past and future tense, which doesn't make sense. Incorrect!

- **D ("has caused"):** This is present perfect tense. While this could work in some contexts, it's unnecessarily complicated when simple past tense "caused" works perfectly. Remember: don't pick a complicated tense when a simple tense works! Incorrect!

**Why B is correct:**
The verb must match the past tense of "delayed" since both actions are connected by "and" and happened at the same time.

The answer is **B**.`,
    is_worked_example: false
  },
  {
    lesson_id: lessonData.id,
    position: 3,
    title: 'Irregular Verbs - "a" vs. "u" Rule',
    problem_text: 'Before I woke up, Chris had already <u>swam</u> twenty laps.',
    choices: [
      { letter: 'A', text: 'NO CHANGE' },
      { letter: 'B', text: 'swum' },
      { letter: 'C', text: 'swimming' },
      { letter: 'D', text: 'swims' }
    ],
    correct_answer: 'B',
    solution_steps: [],
    answer_explanation: `This tests the "a" vs. "u" rule for irregular verbs.

**Step 1: Identify the verb structure**
The sentence uses "had already" before the verb. This is perfect tense (had + verb).

**Step 2: Recall the "a" vs. "u" rule**
Many irregular verbs have an "a" version (swam, began, drank) and a "u" version (swum, begun, drunk).

The rule is simple:
- With "has," "have," or "had" (perfect tense) → Use the "u" version
- With no "has," "have," or "had" (past tense) → Use the "a" version

**Step 3: Apply the rule**
Since the sentence uses "had" (perfect tense), we need the "u" version: "swum"

**Step 4: Test each choice**
- **A (NO CHANGE - "swam"):** This is the "a" version, which is used for simple past tense without helping verbs. Example: "I swam twenty laps this morning." But here we have "had," so we need the "u" version. Incorrect!

- **B ("swum"):** This is the "u" version for perfect tense. "Chris had already swum twenty laps" follows the rule perfectly! Correct!

- **C ("swimming"):** This is the present participle form. "had already swimming" doesn't work grammatically. Incorrect!

- **D ("swims"):** This is present tense, third person singular. "had already swims" doesn't work. Incorrect!

**Why B is correct:**
With "had" (perfect tense), we must use the "u" version of the irregular verb: "swum."

The answer is **B**.`,
    is_worked_example: false
  },
  {
    lesson_id: lessonData.id,
    position: 4,
    title: 'Identifying Subject-Verb Agreement vs. Tense Questions',
    problem_text: 'The first row of the townhouses for sale in my neighborhood <u>has</u> the best view of the beach.',
    choices: [
      { letter: 'A', text: 'NO CHANGE' },
      { letter: 'B', text: 'having' },
      { letter: 'C', text: 'have' },
      { letter: 'D', text: 'would have' }
    ],
    correct_answer: 'A',
    solution_steps: [],
    answer_explanation: `This tests whether you can identify a subject-verb agreement question and apply the correct strategy.

**Step 1: Identify the question type by looking at answer choices**
Looking at the choices: has (singular), having, have (plural), would have (plural)

We see both singular ("has") and plural ("have") versions of the verb. This tells us the question is testing SUBJECT-VERB AGREEMENT, not verb tense.

**Step 2: Find the subject by crossing out prepositional phrases**
The sentence has two prepositional phrases:
- "of the townhouses"
- "for sale"
- "in my neighborhood"

Cross them all out: "The first row of-the-townhouses for-sale in-my-neighborhood has the best view of-the-beach."

**Step 3: Identify the subject**
After crossing out prepositional phrases, the subject is "row" (singular).

Don't be tricked by "townhouses"—that's inside a prepositional phrase and can't be the subject!

**Step 4: Match the verb to the subject**
Subject: "row" (singular) → Verb must be singular

Plug in "it" to test: "It has the best view of the beach." ✓ Sounds correct!

**Step 5: Test each choice**
- **A (NO CHANGE - "has"):** Singular verb matching singular subject "row." "The row has the best view" is correct! Correct!

- **B ("having"):** This is a participle, not a complete verb. "The row having the best view" is a fragment. Incorrect!

- **C ("have"):** This is plural. "The row have" doesn't match—row is singular. Incorrect!

- **D ("would have"):** This is plural conditional and changes the meaning unnecessarily. "The row would have" doesn't match and introduces a hypothetical that isn't needed. Incorrect!

**Why A is correct:**
The singular subject "row" requires the singular verb "has."

The answer is **A**.`,
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

console.log('\n✅ Topic 1.4 - Verbs examples complete!');
