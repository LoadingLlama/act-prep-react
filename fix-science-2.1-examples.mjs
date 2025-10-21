import { createClient } from '@supabase/supabase-js';

const supabase = createClient(
  'https://rabavobdklnwvwsldbix.supabase.co',
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InJhYmF2b2Jka2xud3Z3c2xkYml4Iiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc1OTc2NTQ3OCwiZXhwIjoyMDc1MzQxNDc4fQ.81SeH703keXgF3IevQlRS7OYmn1J2GUVIkn3OJiviM4'
);

async function fixExamples() {
  const { data: lesson } = await supabase
    .from('lessons')
    .select('id')
    .eq('lesson_key', 'specific-data-point')
    .single();

  // Delete old examples
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
      problem_text: `<p style="margin-bottom: 1rem;">The chart below shows the position of a bouncing ball over time after it is released at t=0 seconds.</p>

<div style="background-color: #f9fafb; padding: 1.5rem; border: 1px solid #e5e7eb; border-radius: 4px; margin: 1rem 0;">
  <p style="font-weight: 600; margin-bottom: 1rem;">Figure 1</p>
  <p style="margin-bottom: 0.5rem;"><strong>Graph Description:</strong> Line graph showing Height (feet) vs. Time (seconds)</p>
  <table style="width: 100%; border-collapse: collapse; margin-top: 1rem;">
    <thead>
      <tr style="background-color: #e5e7eb;">
        <th style="padding: 0.5rem; border: 1px solid #d1d5db; text-align: left;">Time (s)</th>
        <th style="padding: 0.5rem; border: 1px solid #d1d5db; text-align: left;">Height (feet)</th>
        <th style="padding: 0.5rem; border: 1px solid #d1d5db; text-align: left;">Note</th>
      </tr>
    </thead>
    <tbody>
      <tr>
        <td style="padding: 0.5rem; border: 1px solid #d1d5db;">0</td>
        <td style="padding: 0.5rem; border: 1px solid #d1d5db;">80</td>
        <td style="padding: 0.5rem; border: 1px solid #d1d5db;">Starting position</td>
      </tr>
      <tr style="background-color: #f9fafb;">
        <td style="padding: 0.5rem; border: 1px solid #d1d5db;">1</td>
        <td style="padding: 0.5rem; border: 1px solid #d1d5db;">0</td>
        <td style="padding: 0.5rem; border: 1px solid #d1d5db;">First bounce (ground)</td>
      </tr>
      <tr>
        <td style="padding: 0.5rem; border: 1px solid #d1d5db;">2</td>
        <td style="padding: 0.5rem; border: 1px solid #d1d5db;">50</td>
        <td style="padding: 0.5rem; border: 1px solid #d1d5db;">Peak of first bounce</td>
      </tr>
      <tr style="background-color: #f9fafb;">
        <td style="padding: 0.5rem; border: 1px solid #d1d5db;">3</td>
        <td style="padding: 0.5rem; border: 1px solid #d1d5db;">0</td>
        <td style="padding: 0.5rem; border: 1px solid #d1d5db;">Second bounce (ground)</td>
      </tr>
      <tr>
        <td style="padding: 0.5rem; border: 1px solid #d1d5db;">4</td>
        <td style="padding: 0.5rem; border: 1px solid #d1d5db;">35</td>
        <td style="padding: 0.5rem; border: 1px solid #d1d5db;">Peak of second bounce</td>
      </tr>
      <tr style="background-color: #f9fafb;">
        <td style="padding: 0.5rem; border: 1px solid #d1d5db;">5</td>
        <td style="padding: 0.5rem; border: 1px solid #d1d5db;">0</td>
        <td style="padding: 0.5rem; border: 1px solid #d1d5db;">Third bounce (ground)</td>
      </tr>
      <tr>
        <td style="padding: 0.5rem; border: 1px solid #d1d5db;">6</td>
        <td style="padding: 0.5rem; border: 1px solid #d1d5db;">25</td>
        <td style="padding: 0.5rem; border: 1px solid #d1d5db;">Peak of third bounce</td>
      </tr>
    </tbody>
  </table>
  <p style="margin-top: 0.5rem; font-size: 0.875rem; color: #6b7280;">The curve shows the ball bouncing with decreasing height over time.</p>
</div>

<p style="margin-top: 1.5rem; font-weight: 500;">Based on Figure 1, at 3 seconds, how high is the bouncy ball?</p>`,
      choices: [
        { letter: "A", text: "0 feet" },
        { letter: "B", text: "35 feet" },
        { letter: "C", text: "50 feet" },
        { letter: "D", text: "80 feet" }
      ],
      correct_answer: "A",
      solution_steps: [],
      answer_explanation: `This is a straightforward specific data point question testing your ability to read a value from a graph.

**Step 1: Locate Figure 1**
The question explicitly says "Based on Figure 1," so we go directly to that figure.

**Step 2: Identify what we're looking for**
We need the height at exactly t = 3 seconds.

**Step 3: Find the axes**
- x-axis (horizontal) = Time (seconds)
- y-axis (vertical) = Height (feet)

**Step 4: Find the data point**
Look at the table or trace on the graph:
- At t = 3 seconds, the height = 0 feet
- This is when the ball hits the ground for the second time

**Step 5: Match to answer choices**
Height = 0 feet → Answer A

**Common mistakes:**
- Don't confuse t=3 with t=2 (where height = 50 feet)
- Don't pick the starting height (80 feet)

**The answer is A.**`,
      diagram_svg: null,
      is_worked_example: false
    },
    {
      lesson_id: lesson.id,
      position: 2,
      title: "Reading Data from a Bar Graph",
      problem_text: `<p style="margin-bottom: 1rem;">The figure below shows the average weight for 3 different groups of mice over a 5-week period. The weights were recorded at the end of each week.</p>

<div style="background-color: #f9fafb; padding: 1.5rem; border: 1px solid #e5e7eb; border-radius: 4px; margin: 1rem 0;">
  <p style="font-weight: 600; margin-bottom: 1rem;">Figure 2</p>
  <p style="margin-bottom: 0.5rem;"><strong>Graph Description:</strong> Bar graph showing Weight (grams) vs. Week</p>
  <table style="width: 100%; border-collapse: collapse; margin-top: 1rem;">
    <thead>
      <tr style="background-color: #e5e7eb;">
        <th style="padding: 0.5rem; border: 1px solid #d1d5db; text-align: left;">Week</th>
        <th style="padding: 0.5rem; border: 1px solid #d1d5db; text-align: center;">Group 1 (g)</th>
        <th style="padding: 0.5rem; border: 1px solid #d1d5db; text-align: center;">Group 2 (g)</th>
        <th style="padding: 0.5rem; border: 1px solid #d1d5db; text-align: center;">Group 3 (g)</th>
      </tr>
    </thead>
    <tbody>
      <tr>
        <td style="padding: 0.5rem; border: 1px solid #d1d5db;">1</td>
        <td style="padding: 0.5rem; border: 1px solid #d1d5db; text-align: center;">5</td>
        <td style="padding: 0.5rem; border: 1px solid #d1d5db; text-align: center;">10</td>
        <td style="padding: 0.5rem; border: 1px solid #d1d5db; text-align: center;">15</td>
      </tr>
      <tr style="background-color: #f9fafb;">
        <td style="padding: 0.5rem; border: 1px solid #d1d5db;">2</td>
        <td style="padding: 0.5rem; border: 1px solid #d1d5db; text-align: center;">8</td>
        <td style="padding: 0.5rem; border: 1px solid #d1d5db; text-align: center;">13</td>
        <td style="padding: 0.5rem; border: 1px solid #d1d5db; text-align: center;">18</td>
      </tr>
      <tr>
        <td style="padding: 0.5rem; border: 1px solid #d1d5db;">3</td>
        <td style="padding: 0.5rem; border: 1px solid #d1d5db; text-align: center;">12</td>
        <td style="padding: 0.5rem; border: 1px solid #d1d5db; text-align: center;">16</td>
        <td style="padding: 0.5rem; border: 1px solid #d1d5db; text-align: center;">22</td>
      </tr>
      <tr style="background-color: #f9fafb;">
        <td style="padding: 0.5rem; border: 1px solid #d1d5db;">4</td>
        <td style="padding: 0.5rem; border: 1px solid #d1d5db; text-align: center;">15</td>
        <td style="padding: 0.5rem; border: 1px solid #d1d5db; text-align: center;">19</td>
        <td style="padding: 0.5rem; border: 1px solid #d1d5db; text-align: center;">25</td>
      </tr>
      <tr>
        <td style="padding: 0.5rem; border: 1px solid #d1d5db;">5</td>
        <td style="padding: 0.5rem; border: 1px solid #d1d5db; text-align: center;">20</td>
        <td style="padding: 0.5rem; border: 1px solid #d1d5db; text-align: center;">23</td>
        <td style="padding: 0.5rem; border: 1px solid #d1d5db; text-align: center;">28</td>
      </tr>
    </tbody>
  </table>
  <p style="margin-top: 0.5rem; font-size: 0.875rem; color: #6b7280;">All three groups show increasing weight over the 5-week period.</p>
</div>

<p style="margin-top: 1.5rem; font-weight: 500;">Based on Figure 2, after 1 week of the experiment, the mice in Group 2 weighed:</p>`,
      choices: [
        { letter: "A", text: "5 g" },
        { letter: "B", text: "10 g" },
        { letter: "C", text: "15 g" },
        { letter: "D", text: "20 g" }
      ],
      correct_answer: "B",
      solution_steps: [],
      answer_explanation: `This question tests reading specific data from a table with multiple categories.

**Step 1: Locate Figure 2**
The question says "Based on Figure 2," so we look at that figure.

**Step 2: Identify what we're looking for**
- Week: 1
- Group: 2
- Measurement: Weight in grams

**Step 3: Use the table**
Look at the table showing all the data:
- Find the row for Week 1
- Find the column for Group 2
- The intersection shows 10 g

**Step 4: Match to answer choices**
Group 2 at Week 1 = 10 g → Answer B

**Why other answers are wrong:**
- A (5 g): This is Group 1 at Week 1
- C (15 g): This is Group 3 at Week 1
- D (20 g): This is Group 1 at Week 5

**Key tip:** Always double-check you're reading the correct row AND column!

**The answer is B.**`,
      diagram_svg: null,
      is_worked_example: false
    }
  ];

  for (const example of examples) {
    const { error } = await supabase
      .from('lesson_examples')
      .insert(example);

    if (error) {
      console.error(`Error:`, error);
    } else {
      console.log(`✓ Inserted: ${example.title}`);
    }
  }

  console.log('\n✓ Fixed Science 2.1 examples with proper HTML tables!');
}

fixExamples();
