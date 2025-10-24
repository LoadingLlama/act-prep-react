import { createClient } from '@supabase/supabase-js';

const supabase = createClient(
  'https://rabavobdklnwvwsldbix.supabase.co',
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InJhYmF2b2Jka2xud3Z3c2xkYml4Iiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc1OTc2NTQ3OCwiZXhwIjoyMDc1MzQxNDc4fQ.81SeH703keXgF3IevQlRS7OYmn1J2GUVIkn3OJiviM4'
);

async function uploadExamples() {
  // Get lesson ID for 2.1 Specific Data Point
  const { data: lesson } = await supabase
    .from('lessons')
    .select('id')
    .eq('lesson_key', 'specific-data-point')
    .single();

  console.log('Found lesson ID:', lesson.id);

  // Delete old examples first
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
      problem_text: `<p style="margin-bottom: 1rem; font-size: 16px; line-height: 1.6;">A bouncing ball was released and its height was recorded over 8 seconds.</p>

  <p style="font-weight: 700; font-size: 18px; margin-bottom: 1.2rem; color: #1f2937;">Figure 1</p>
  <p style="margin-bottom: 1rem; font-size: 15px;"><strong>Graph Description:</strong> Line graph showing Height (feet) on the y-axis and Time (seconds) on the x-axis. The curve shows the ball bouncing with decreasing height over time.</p>
  <table style="width: auto; border-collapse: collapse; margin-top: 1.2rem; font-size: 14px;">
    <thead>
      <tr style="background-color: #374151;">
        <th style="padding: 0.6rem; border: 1px solid #1f2937; text-align: center; color: white; font-weight: 600;">Time (seconds)</th>
        <th style="padding: 0.6rem; border: 1px solid #1f2937; text-align: center; color: white; font-weight: 600;">Height (feet)</th>
      </tr>
    </thead>
    <tbody>
      <tr style="background-color: white;">
        <td style="padding: 0.5rem; border: 1px solid #d1d5db; text-align: center; font-size: 14px;">0</td>
        <td style="padding: 0.5rem; border: 1px solid #d1d5db; text-align: center; font-size: 14px;">80</td>
      </tr>
      <tr style="background-color: #f9fafb;">
        <td style="padding: 0.5rem; border: 1px solid #d1d5db; text-align: center; font-size: 14px;">1</td>
        <td style="padding: 0.5rem; border: 1px solid #d1d5db; text-align: center; font-size: 14px;">0</td>
      </tr>
      <tr style="background-color: white;">
        <td style="padding: 0.5rem; border: 1px solid #d1d5db; text-align: center; font-size: 14px;">2</td>
        <td style="padding: 0.5rem; border: 1px solid #d1d5db; text-align: center; font-size: 14px;">50</td>
      </tr>
      <tr style="background-color: #f9fafb;">
        <td style="padding: 0.5rem; border: 1px solid #d1d5db; text-align: center; font-size: 14px;">3</td>
        <td style="padding: 0.5rem; border: 1px solid #d1d5db; text-align: center; font-size: 14px;">0</td>
      </tr>
      <tr style="background-color: white;">
        <td style="padding: 0.5rem; border: 1px solid #d1d5db; text-align: center; font-size: 14px;">4</td>
        <td style="padding: 0.5rem; border: 1px solid #d1d5db; text-align: center; font-size: 14px;">35</td>
      </tr>
      <tr style="background-color: #f9fafb;">
        <td style="padding: 0.5rem; border: 1px solid #d1d5db; text-align: center; font-size: 14px;">5</td>
        <td style="padding: 0.5rem; border: 1px solid #d1d5db; text-align: center; font-size: 14px;">0</td>
      </tr>
      <tr style="background-color: white;">
        <td style="padding: 0.5rem; border: 1px solid #d1d5db; text-align: center; font-size: 14px;">6</td>
        <td style="padding: 0.5rem; border: 1px solid #d1d5db; text-align: center; font-size: 14px;">25</td>
      </tr>
    </tbody>
  </table>


<p style="margin-top: 2.5rem; font-weight: 600; font-size: 17px; color: #1f2937;">Based on Figure 1, at 3 seconds, how high is the bouncy ball?</p>`,
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
The question explicitly says "Based on Figure 1," so we go directly to that figure.

**Step 2: Identify what we're looking for**
We need to find the height at exactly 3 seconds.

**Step 3: Find the axes**
- x-axis (horizontal) = Time (seconds)
- y-axis (vertical) = Height (feet)

**Step 4: Find the data point**
Looking at the table, at t=3 seconds, the height is 0 feet. This is when the ball hits the ground for the second time after bouncing.

**Step 5: Match to answer choices**
The height is 0 feet, which corresponds to answer choice A.

**Common mistakes to avoid:**
- Don't confuse t=3 with t=2 (where height = 50 feet, answer C)
- Don't pick the starting height of 80 feet (answer D)
- Don't pick 35 feet (answer B), which is the height at t=4

**The answer is A.**`,
      diagram_svg: null,
      is_worked_example: false
    },
    {
      lesson_id: lesson.id,
      position: 2,
      title: "Reading Data from a Table",
      problem_text: `<p style="margin-bottom: 1rem; font-size: 16px; line-height: 1.6;">Scientists measured the average weight of three different groups of mice over a 5-week period.</p>

  <p style="font-weight: 700; font-size: 18px; margin-bottom: 1.2rem; color: #1f2937;">Figure 2</p>
  <p style="margin-bottom: 1rem; font-size: 15px;"><strong>Table Description:</strong> Average weight (in grams) for three groups of mice measured at the end of each week.</p>
  <table style="width: auto; border-collapse: collapse; margin-top: 1.2rem; font-size: 14px;">
    <thead>
      <tr style="background-color: #374151;">
        <th style="padding: 0.6rem; border: 1px solid #1f2937; text-align: center; color: white; font-weight: 600;">Week</th>
        <th style="padding: 0.6rem; border: 1px solid #1f2937; text-align: center; color: white; font-weight: 600;">Group 1 (g)</th>
        <th style="padding: 0.6rem; border: 1px solid #1f2937; text-align: center; color: white; font-weight: 600;">Group 2 (g)</th>
        <th style="padding: 0.6rem; border: 1px solid #1f2937; text-align: center; color: white; font-weight: 600;">Group 3 (g)</th>
      </tr>
    </thead>
    <tbody>
      <tr style="background-color: white;">
        <td style="padding: 0.5rem; border: 1px solid #d1d5db; text-align: center; font-weight: 600; font-size: 14px;">1</td>
        <td style="padding: 0.5rem; border: 1px solid #d1d5db; text-align: center; font-size: 14px;">5</td>
        <td style="padding: 0.5rem; border: 1px solid #d1d5db; text-align: center; font-size: 14px;">10</td>
        <td style="padding: 0.5rem; border: 1px solid #d1d5db; text-align: center; font-size: 14px;">15</td>
      </tr>
      <tr style="background-color: #f9fafb;">
        <td style="padding: 0.5rem; border: 1px solid #d1d5db; text-align: center; font-weight: 600; font-size: 14px;">2</td>
        <td style="padding: 0.5rem; border: 1px solid #d1d5db; text-align: center; font-size: 14px;">8</td>
        <td style="padding: 0.5rem; border: 1px solid #d1d5db; text-align: center; font-size: 14px;">13</td>
        <td style="padding: 0.5rem; border: 1px solid #d1d5db; text-align: center; font-size: 14px;">18</td>
      </tr>
      <tr style="background-color: white;">
        <td style="padding: 0.5rem; border: 1px solid #d1d5db; text-align: center; font-weight: 600; font-size: 14px;">3</td>
        <td style="padding: 0.5rem; border: 1px solid #d1d5db; text-align: center; font-size: 14px;">12</td>
        <td style="padding: 0.5rem; border: 1px solid #d1d5db; text-align: center; font-size: 14px;">16</td>
        <td style="padding: 0.5rem; border: 1px solid #d1d5db; text-align: center; font-size: 14px;">22</td>
      </tr>
      <tr style="background-color: #f9fafb;">
        <td style="padding: 0.5rem; border: 1px solid #d1d5db; text-align: center; font-weight: 600; font-size: 14px;">4</td>
        <td style="padding: 0.5rem; border: 1px solid #d1d5db; text-align: center; font-size: 14px;">15</td>
        <td style="padding: 0.5rem; border: 1px solid #d1d5db; text-align: center; font-size: 14px;">19</td>
        <td style="padding: 0.5rem; border: 1px solid #d1d5db; text-align: center; font-size: 14px;">25</td>
      </tr>
      <tr style="background-color: white;">
        <td style="padding: 0.5rem; border: 1px solid #d1d5db; text-align: center; font-weight: 600; font-size: 14px;">5</td>
        <td style="padding: 0.5rem; border: 1px solid #d1d5db; text-align: center; font-size: 14px;">20</td>
        <td style="padding: 0.5rem; border: 1px solid #d1d5db; text-align: center; font-size: 14px;">23</td>
        <td style="padding: 0.5rem; border: 1px solid #d1d5db; text-align: center; font-size: 14px;">28</td>
      </tr>
    </tbody>
  </table>


<p style="margin-top: 2.5rem; font-weight: 600; font-size: 17px; color: #1f2937;">Based on Figure 2, after 1 week of the experiment, the mice in Group 2 weighed:</p>`,
      choices: [
        { letter: "A", text: "5 g" },
        { letter: "B", text: "10 g" },
        { letter: "C", text: "15 g" },
        { letter: "D", text: "20 g" }
      ],
      correct_answer: "B",
      solution_steps: [],
      answer_explanation: `This question tests your ability to read specific data from a table with multiple categories.

**Step 1: Locate Figure 2**
The question says "Based on Figure 2," so we look at Figure 2.

**Step 2: Identify what we're looking for**
We need:
- Week: 1
- Group: 2
- Measurement: Weight in grams

**Step 3: Find the correct cell**
1. Find Week 1 in the leftmost column
2. Move across that row to the "Group 2 (g)" column
3. The intersection shows 10 g

**Step 4: Match to answer choices**
10 g corresponds to answer choice B.

**Common mistakes to avoid:**
- Don't confuse Group 1 with Group 2 (Group 1 at Week 1 = 5 g, answer A)
- Don't confuse Group 3 with Group 2 (Group 3 at Week 1 = 15 g, answer C)
- Don't look at the wrong week (Group 2 at Week 5 = 23 g, not shown but close to answer D)

**How to read tables systematically:**
1. Identify the row (Week 1)
2. Identify the column (Group 2)
3. Find where they intersect
4. Read the value carefully

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

  console.log('\n✓ All Science 2.1 examples uploaded!');
}

uploadExamples();
