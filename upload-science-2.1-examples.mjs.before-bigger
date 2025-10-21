import { createClient } from '@supabase/supabase-js';

const supabase = createClient(
  'https://rabavobdklnwvwsldbix.supabase.co',
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InJhYmF2b2Jka2xud3Z3c2xkYml4Iiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc1OTc2NTQ3OCwiZXhwIjoyMDc1MzQxNDc4fQ.81SeH703keXgF3IevQlRS7OYmn1J2GUVIkn3OJiviM4'
);

async function uploadExamples() {
  // Get the lesson ID for specific-data-point
  const { data: lesson, error: lessonError } = await supabase
    .from('lessons')
    .select('id')
    .eq('lesson_key', 'specific-data-point')
    .single();

  if (lessonError || !lesson) {
    console.error('Error finding lesson:', lessonError);
    return;
  }

  console.log(`Found lesson ID: ${lesson.id}`);

  await supabase
    .from('lesson_examples')
    .delete()
    .eq('lesson_id', lesson.id);

  console.log('✓ Deleted old examples');
  const examples = [
    {
      lesson_id: lesson.id,
      position: 1,
      title: "Reading Data from a Line Graph",
      problem_text: `The chart below shows the position of a bouncing ball over time after it is released at t=0 seconds.

**Figure 1:** Line graph with Height (feet) on the y-axis (ranging from 0 to 90) and Time (seconds) on the x-axis (ranging from 0 to 8). The curve shows:
- At t=0: height = 80 feet (starting position)
- At t=1: height = 0 feet (first bounce)
- At t=2: height ≈ 50 feet (peak of first bounce)
- At t=3: height = 0 feet (second bounce)
- At t=4: height ≈ 35 feet (peak of second bounce)
- At t=5: height = 0 feet (third bounce)
- At t=6: height ≈ 25 feet (peak of third bounce)
The ball continues bouncing with decreasing height.

Based on Figure 1, at 3 seconds, how high is the bouncy ball?`,
      choices: [
        { letter: "A", text: "0 feet" },
        { letter: "B", text: "35 feet" },
        { letter: "C", text: "50 feet" },
        { letter: "D", text: "80 feet" }
      ],
      correct_answer: "A",
      solution_steps: [],
      answer_explanation: `This is a straightforward specific data point question that tests your ability to read a value from a line graph.

**Step 1: Locate Figure 1**
The question explicitly says "Based on Figure 1," so we go directly to that figure. Don't look anywhere else!

**Step 2: Identify what we're looking for**
We need to find the height at exactly 3 seconds. The question asks "how high is the bouncy ball?" so we're looking for a height value.

**Step 3: Find the axes**
- x-axis (horizontal) = Time (seconds)
- y-axis (vertical) = Height (feet)

Make sure you don't confuse these—height is on the y-axis, not the x-axis!

**Step 4: Find the data point**
1. Locate 3 seconds on the x-axis (horizontal axis)
2. Trace straight up from 3 seconds until you hit the curve
3. From that point on the curve, trace horizontally to the y-axis to read the height

At t=3 seconds, the curve is at 0 feet on the y-axis. This is when the ball hits the ground for the second time after bouncing.

**Step 5: Match to answer choices**
The height is 0 feet, which corresponds to answer choice A.

**Common mistakes to avoid:**
- Don't confuse t=3 with t=2 (where height ≈ 50 feet, answer C)
- Don't pick the starting height of 80 feet (answer D)
- Don't pick 35 feet (answer B), which is approximately the height at t=4

**The answer is A.**`,
      diagram_svg: null,
      is_worked_example: false
    },
    {
      lesson_id: lesson.id,
      position: 2,
      title: "Reading Data from a Table",
      problem_text: `The figure below shows the average weight for 3 different groups of mice over a 5-week period. The weights of the mice were recorded at the end of each week.

**Figure 2:** Bar graph showing Weight (grams) on the y-axis (0-30) and Weeks (1-5) on the x-axis. Three bars are shown for each week representing:
- Group 1 (dark bar)
- Group 2 (medium bar)
- Group 3 (light bar)

Week 1: Group 1 = 5g, Group 2 = 10g, Group 3 = 15g
Week 2: Group 1 = 8g, Group 2 = 13g, Group 3 = 18g
Week 3: Group 1 = 12g, Group 2 = 16g, Group 3 = 22g
Week 4: Group 1 = 15g, Group 2 = 19g, Group 3 = 25g
Week 5: Group 1 = 20g, Group 2 = 23g, Group 3 = 28g

Based on Figure 2, after 1 week of the experiment, the mice in Group 2 weighed:`,
      choices: [
        { letter: "A", text: "5 g" },
        { letter: "B", text: "10 g" },
        { letter: "C", text: "15 g" },
        { letter: "D", text: "20 g" }
      ],
      correct_answer: "B",
      solution_steps: [],
      answer_explanation: `This question tests your ability to read specific data from a bar graph with multiple categories.

**Step 1: Locate Figure 2**
The question says "Based on Figure 2," so we look at Figure 2.

**Step 2: Identify what we're looking for**
We need:
- Week: 1
- Group: 2
- Measurement: Weight in grams

**Step 3: Locate the correct bar**
1. Find Week 1 on the x-axis (horizontal axis)
2. At Week 1, there are three bars representing the three groups
3. Identify which bar represents Group 2 (check the legend/key)
4. The medium-colored bar represents Group 2

**Step 4: Read the height of the bar**
Look at where the top of the Group 2 bar (at Week 1) reaches on the y-axis. It reaches up to 10 on the y-axis.

**Step 5: Match to answer choices**
The Group 2 bar at Week 1 shows 10 grams, which is answer choice B.

**Common mistakes to avoid:**
- Don't read the wrong group's bar (Group 1 = 5g [answer A], Group 3 = 15g [answer C])
- Don't read from the wrong week
- Make sure you're reading the correct unit (grams)

**Why the other answers are wrong:**
- A (5 g): This is Group 1 at Week 1, not Group 2
- C (15 g): This is Group 3 at Week 1, not Group 2
- D (20 g): This is Group 1 at Week 5, not Group 2 at Week 1

**The answer is B.**`,
      diagram_svg: null,
      is_worked_example: false
    }
  ];

  // Insert each example
  for (const example of examples) {
    const { error } = await supabase
      .from('lesson_examples')
      .insert(example);

    if (error) {
      console.error(`Error inserting "${example.title}":`, error);
    } else {
      console.log(`✓ Inserted: ${example.title}`);
    }
  }

  console.log('\n✓ All Science 2.1 examples uploaded!');
}

uploadExamples();
