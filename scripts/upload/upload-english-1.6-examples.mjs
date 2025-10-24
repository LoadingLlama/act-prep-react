import { createClient } from '@supabase/supabase-js';

const supabase = createClient(
  'https://rabavobdklnwvwsldbix.supabase.co',
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InJhYmF2b2Jka2xud3Z3c2xkYml4Iiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc1OTc2NTQ3OCwiZXhwIjoyMDc1MzQxNDc4fQ.81SeH703keXgF3IevQlRS7OYmn1J2GUVIkn3OJiviM4'
);

const { data: lessonData } = await supabase
  .from('lessons')
  .select('id')
  .eq('lesson_key', 'modifiers')
  .single();

console.log('Creating examples for Topic 1.6 - Misplaced Modifiers...\n');

const examples = [
  {
    lesson_id: lessonData.id,
    position: 1,
    title: 'Basic Misplaced Modifier',
    problem_text: '<u>Consistently erupting, Jack</u> loves taking pictures of the Old Faithful geyser at Yellowstone National Park.',
    choices: [
      { letter: 'A', text: 'NO CHANGE' },
      { letter: 'B', text: 'Consistently erupting, the Old Faithful geyser at Yellowstone National Park' },
      { letter: 'C', text: 'Jack, consistently erupting,' },
      { letter: 'D', text: 'Erupting consistently, Jack' }
    ],
    correct_answer: 'B',
    solution_steps: [],
    answer_explanation: `This tests the basic concept of misplaced modifiers at the beginning of a sentence.

**Step 1: Identify the modifier**
"Consistently erupting" is a modifying phrase at the beginning of the sentence, separated by a comma.

**Step 2: Ask: What is "consistently erupting"?**
Is Jack consistently erupting? No! The Old Faithful geyser is consistently erupting.

**Step 3: Apply the "next-door neighbor" rule**
When a modifier is at the beginning of a sentence, the first noun after the comma must be what the modifier describes.

Currently, "Jack" is the first noun after the comma, but Jack isn't erupting.

**Step 4: Test each choice**
- **A (NO CHANGE):** "Consistently erupting, Jack loves..." This says Jack is consistently erupting. Incorrect!

- **B ("Consistently erupting, the Old Faithful geyser at Yellowstone National Park"):** Now the first noun after "consistently erupting" is "the Old Faithful geyser." The geyser IS consistently erupting, so the modifier is correctly placed! Correct!

- **C ("Jack, consistently erupting,"):** This places "consistently erupting" as a middle modifier describing Jack. Still says Jack is erupting. Incorrect!

- **D ("Erupting consistently, Jack"):** Same problem—Jack is still the first noun after the modifier. Incorrect!

**Why B is correct:**
The modifier "consistently erupting" must be right next-door to "the Old Faithful geyser," which is what's actually erupting.

The answer is **B**.`,
    is_worked_example: false
  },
  {
    lesson_id: lessonData.id,
    position: 2,
    title: 'Front Modifier with Multiple Nouns',
    problem_text: 'A brand new approach to automobile manufacturing, <u>Henry Ford and Ford Motor Company installed</u> the first moving assembly line in 1913.',
    choices: [
      { letter: 'A', text: 'NO CHANGE' },
      { letter: 'B', text: 'the Ford Motor Company, owned by Henry Ford, installed' },
      { letter: 'C', text: 'the first moving assembly line was installed by Henry Ford and Ford Motor Company in' },
      { letter: 'D', text: '1913 was the first year that Henry Ford and the Ford Motor Company installed' }
    ],
    correct_answer: 'C',
    solution_steps: [],
    answer_explanation: `This tests front modifiers where you need to identify what's being described.

**Step 1: Identify the modifier**
"A brand new approach to automobile manufacturing" is the modifying phrase at the beginning.

**Step 2: Ask: What is "a brand new approach to automobile manufacturing"?**
Is Henry Ford a brand new approach? No!
Is the Ford Motor Company a brand new approach? No!
Is the moving assembly line a brand new approach? Yes!

**Step 3: Find the first noun after the comma**
Currently: "Henry Ford and Ford Motor Company"

This is wrong—people are not "a brand new approach." The assembly line is the approach.

**Step 4: Test each choice**
- **A (NO CHANGE):** "A brand new approach...Henry Ford and Ford Motor Company installed..." This says Henry Ford and the company ARE a brand new approach. Incorrect!

- **B ("the Ford Motor Company, owned by Henry Ford, installed"):** Still puts "the Ford Motor Company" as the first noun. The company isn't the approach. Incorrect!

- **C ("the first moving assembly line was installed by Henry Ford and Ford Motor Company in"):** Now "the first moving assembly line" is the first noun after the modifier. The assembly line IS the brand new approach! Correct!

- **D ("1913 was the first year that Henry Ford and the Ford Motor Company installed"):** "1913" (a year) is now the first noun. A year isn't an approach. Incorrect!

**Why C is correct:**
The moving assembly line is the "brand new approach to automobile manufacturing," so it must be the first noun after the comma.

The answer is **C**.`,
    is_worked_example: false
  },
  {
    lesson_id: lessonData.id,
    position: 3,
    title: 'Middle/End Modifier with "which"',
    problem_text: 'The research team, <u>which arrived at their nesting grounds early this year,</u> tracked the movements of the blue storks.',
    choices: [
      { letter: 'A', text: 'NO CHANGE' },
      { letter: 'B', text: 'which tracked the movements of the blue storks,' },
      { letter: 'C', text: 'arriving at their nesting grounds early this year,' },
      { letter: 'D', text: 'having arrived early at the nesting grounds,' }
    ],
    correct_answer: 'B',
    solution_steps: [],
    answer_explanation: `This tests middle modifiers with "which."

**Step 1: Identify the modifier and what it's currently describing**
"Which arrived at their nesting grounds early this year" is placed right after "research team."

So it's currently describing the research team.

**Step 2: Ask: Does this make sense?**
Did the research team arrive at their nesting grounds early? No—the research team isn't nesting!

The blue storks arrived at their nesting grounds early.

**Step 3: Apply the "next-door neighbor" rule for middle modifiers**
Middle modifiers must come right after what they describe.

The modifier should be describing the blue storks, but it's placed after "research team."

**Step 4: Test each choice**
- **A (NO CHANGE):** Says the research team arrived at their (the team's?) nesting grounds. Teams don't have nesting grounds! Incorrect!

- **B ("which tracked the movements of the blue storks,"):** Changes the modifier to describe what the research team did (tracked movements). Now it correctly modifies "research team"! If we need to keep the modifier in the middle, we should change what it says. Correct!

- **C ("arriving at their nesting grounds early this year,"):** Still says the research team is arriving at nesting grounds. Same problem. Incorrect!

- **D ("having arrived early at the nesting grounds,"):** Still modifying research team and saying they arrived at nesting grounds. Incorrect!

**Why B is correct:**
Since we can\'t easily move the modifier to be after "blue storks" (given the answer choices), the best fix is to change the modifier to correctly describe what comes before it—the research team tracked the movements.

The answer is **B**.`,
    is_worked_example: false
  },
  {
    lesson_id: lessonData.id,
    position: 4,
    title: 'Modifier without Commas',
    problem_text: 'The dog <u>chasing the cat ran</u> into the street.',
    choices: [
      { letter: 'A', text: 'NO CHANGE' },
      { letter: 'B', text: 'chasing the cat, ran' },
      { letter: 'C', text: 'that was chasing the cat ran' },
      { letter: 'D', text: ', chasing the cat, ran' }
    ],
    correct_answer: 'A',
    solution_steps: [],
    answer_explanation: `This tests modifiers without commas using "-ing" words.

**Step 1: Identify the modifier**
"Chasing the cat" is a modifying phrase using an "-ing" word.

Notice: There are no commas separating it.

**Step 2: Find what it's modifying**
The phrase "chasing the cat" comes right after "dog."

So it's describing the dog. Does this make sense? Yes! The dog is chasing the cat.

**Step 3: Apply the "next-door neighbor" rule**
For modifiers without commas in the middle of the sentence, they must come right after what they describe.

"Chasing the cat" is right after "dog," and the dog IS doing the chasing. This is correct!

**Step 4: Test each choice**
- **A (NO CHANGE - "chasing the cat ran"):** "Chasing the cat" comes right after "dog" (correctly modifying it), and "ran" is the main verb. "The dog chasing the cat ran into the street" is grammatically correct! Correct!

- **B ("chasing the cat, ran"):** Adding a comma before "ran" creates a pause that doesn\'t belong. "Chasing the cat" is essential to identifying which dog we\'re talking about, so it shouldn\'t be set off by commas. Incorrect!

- **C ("that was chasing the cat ran"):** This changes the modifier to "that was chasing the cat." While this could work, it\'s wordier than necessary. The original is more concise. But wait—this has "ran" twice in effect. Actually, reading it: "The dog that was chasing the cat ran into the street" works, but the question asks about the underlined portion. This is actually grammatically acceptable but unnecessarily wordy. Let me reconsider...

Actually, looking more carefully: The issue is whether the original needs fixing. "The dog chasing the cat ran into the street" is perfectly correct. The modifier "chasing the cat" correctly describes "dog" and is properly placed. Incorrect!

- **D (", chasing the cat, ran"):** This sets off "chasing the cat" with commas as if it\'s unnecessary information. But it\'s essential—we need to know which dog. Also creates awkward punctuation. Incorrect!

**Why A is correct:**
The modifier "chasing the cat" is correctly placed right after "dog" (what it describes), and no commas are needed because it\'s an essential modifier.

The answer is **A**.`,
    is_worked_example: false
  }
];

for (const example of examples) {
  const { error } = await supabase.from('lesson_examples').insert(example);
  if (error) {
    console.error(`Error at position ${example.position}:`, error.message);
  } else {
    console.log(`✓ Example ${example.position}: ${example.title}`);
  }
}

console.log('\n✅ Topic 1.6 examples complete!');
