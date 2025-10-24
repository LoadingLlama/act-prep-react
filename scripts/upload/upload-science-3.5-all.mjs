import { createClient } from '@supabase/supabase-js';
import fs from 'fs';

const supabase = createClient(
  'https://rabavobdklnwvwsldbix.supabase.co',
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InJhYmF2b2Jka2xud3Z3c2xkYml4Iiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc1OTc2NTQ3OCwiZXhwIjoyMDc1MzQxNDc4fQ.81SeH703keXgF3IevQlRS7OYmn1J2GUVIkn3OJiviM4'
);

async function uploadAll() {
  // Upload lesson content
  const lessonContent = fs.readFileSync('science-3.5-math-on-science.html', 'utf8');
  const { error: lessonError } = await supabase
    .from('lessons')
    .update({
      content: lessonContent,
      content_json: null,
      migrated_to_json: false
    })
    .eq('lesson_key', 'math-on-science');

  if (lessonError) {
    console.error('Lesson upload error:', lessonError);
    process.exit(1);
  }
  console.log('✓ Science 3.5 Math on Science lesson uploaded');

  // Get lesson ID
  const { data: lesson } = await supabase
    .from('lessons')
    .select('id')
    .eq('lesson_key', 'math-on-science')
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
      title: "Finding the Difference Between Values",
      problem_text: `<p style="margin-bottom: 1.5rem; font-size: 16px; line-height: 1.6;">A scientist measured the mass of a chemical sample at different times during a reaction.</p>

  <p style="font-weight: 700; font-size: 18px; margin-bottom: 1.2rem; color: #1f2937;">Figure 1</p>
  <p style="margin-bottom: 1rem; font-size: 15px;"><strong>Graph Description:</strong> Mass of sample versus time during the reaction.</p>
  <table style="width: auto; border-collapse: collapse; margin-top: 1.2rem; font-size: 14px;">
    <thead>
      <tr style="background-color: #374151;">
        <th style="padding: 0.6rem; border: 1px solid #1f2937; text-align: center; color: white; font-weight: 600;">Time (min)</th>
        <th style="padding: 0.6rem; border: 1px solid #1f2937; text-align: center; color: white; font-weight: 600;">Mass (g)</th>
      </tr>
    </thead>
    <tbody>
      <tr style="background-color: white;">
        <td style="padding: 0.5rem; border: 1px solid #d1d5db; text-align: center; font-weight: 600; font-size: 14px;">0</td>
        <td style="padding: 0.5rem; border: 1px solid #d1d5db; text-align: center; font-size: 14px;">150</td>
      </tr>
      <tr style="background-color: #f9fafb;">
        <td style="padding: 0.5rem; border: 1px solid #d1d5db; text-align: center; font-weight: 600; font-size: 14px;">5</td>
        <td style="padding: 0.5rem; border: 1px solid #d1d5db; text-align: center; font-size: 14px;">125</td>
      </tr>
      <tr style="background-color: white;">
        <td style="padding: 0.5rem; border: 1px solid #d1d5db; text-align: center; font-weight: 600; font-size: 14px;">10</td>
        <td style="padding: 0.5rem; border: 1px solid #d1d5db; text-align: center; font-size: 14px;">95</td>
      </tr>
      <tr style="background-color: #f9fafb;">
        <td style="padding: 0.5rem; border: 1px solid #d1d5db; text-align: center; font-weight: 600; font-size: 14px;">15</td>
        <td style="padding: 0.5rem; border: 1px solid #d1d5db; text-align: center; font-size: 14px;">60</td>
      </tr>
    </tbody>
  </table>


<p style="margin-top: 2.5rem; font-weight: 600; font-size: 17px; color: #1f2937;">Based on Figure 1, by how many grams did the mass decrease from 0 minutes to 15 minutes?</p>`,
      choices: [
        { letter: "A", text: "30 g" },
        { letter: "B", text: "60 g" },
        { letter: "C", text: "90 g" },
        { letter: "D", text: "150 g" }
      ],
      correct_answer: "C",
      solution_steps: [],
      answer_explanation: `**Step 1: Identify what the question is asking**
The question asks: "by how many grams did the mass DECREASE?"

Key word: "decrease" means we need to find the DIFFERENCE (subtract).

**Step 2: Locate the correct values**
We need the mass at two time points:
- At 0 minutes: Mass = 150 g (initial)
- At 15 minutes: Mass = 60 g (final)

**Step 3: Determine the operation**
To find how much it decreased:
Decrease = Initial value - Final value
Decrease = 150 g - 60 g

**Step 4: Calculate**
150 - 60 = 90 g

**Step 5: Check the answer**
Does it make sense? Yes - the mass went from 150g down to 60g, so it lost 90g.
Are the units correct? Yes - the question asks for grams, and we're reporting grams.

**The answer is C (90 g).**

Common trap: Answer D (150 g) is the initial mass, not the decrease. Make sure you subtract to find the difference!`,
      diagram_svg: null,
      is_worked_example: false
    },
    {
      lesson_id: lesson.id,
      position: 2,
      title: "Calculating Average Values",
      problem_text: `<p style="margin-bottom: 1.5rem; font-size: 16px; line-height: 1.6;">A researcher measured the growth of plants under different light conditions over 4 weeks.</p>

  <p style="font-weight: 700; font-size: 18px; margin-bottom: 1.2rem; color: #1f2937;">Figure 1</p>
  <p style="margin-bottom: 1rem; font-size: 15px;"><strong>Graph Description:</strong> Plant height at the end of 4 weeks for four different trials.</p>
  <table style="width: auto; border-collapse: collapse; margin-top: 1.2rem; font-size: 14px;">
    <thead>
      <tr style="background-color: #374151;">
        <th style="padding: 0.6rem; border: 1px solid #1f2937; text-align: center; color: white; font-weight: 600;">Trial</th>
        <th style="padding: 0.6rem; border: 1px solid #1f2937; text-align: center; color: white; font-weight: 600;">Final Height (cm)</th>
      </tr>
    </thead>
    <tbody>
      <tr style="background-color: white;">
        <td style="padding: 0.5rem; border: 1px solid #d1d5db; text-align: center; font-weight: 600; font-size: 14px;">1</td>
        <td style="padding: 0.5rem; border: 1px solid #d1d5db; text-align: center; font-size: 14px;">12</td>
      </tr>
      <tr style="background-color: #f9fafb;">
        <td style="padding: 0.5rem; border: 1px solid #d1d5db; text-align: center; font-weight: 600; font-size: 14px;">2</td>
        <td style="padding: 0.5rem; border: 1px solid #d1d5db; text-align: center; font-size: 14px;">18</td>
      </tr>
      <tr style="background-color: white;">
        <td style="padding: 0.5rem; border: 1px solid #d1d5db; text-align: center; font-weight: 600; font-size: 14px;">3</td>
        <td style="padding: 0.5rem; border: 1px solid #d1d5db; text-align: center; font-size: 14px;">16</td>
      </tr>
      <tr style="background-color: #f9fafb;">
        <td style="padding: 0.5rem; border: 1px solid #d1d5db; text-align: center; font-weight: 600; font-size: 14px;">4</td>
        <td style="padding: 0.5rem; border: 1px solid #d1d5db; text-align: center; font-size: 14px;">14</td>
      </tr>
    </tbody>
  </table>


<p style="margin-top: 2.5rem; font-weight: 600; font-size: 17px; color: #1f2937;">Based on Figure 1, what is the average final height of the plants across all four trials?</p>`,
      choices: [
        { letter: "A", text: "12 cm" },
        { letter: "B", text: "14 cm" },
        { letter: "C", text: "15 cm" },
        { letter: "D", text: "16 cm" }
      ],
      correct_answer: "C",
      solution_steps: [],
      answer_explanation: `**Step 1: Identify what the question is asking**
The question asks: "what is the AVERAGE final height?"

Key word: "average" (or "mean") means add all values and divide by how many there are.

**Step 2: Locate all the values**
From Figure 1, the final heights are:
- Trial 1: 12 cm
- Trial 2: 18 cm
- Trial 3: 16 cm
- Trial 4: 14 cm

**Step 3: Set up the calculation**
Average = (Sum of all values) ÷ (Number of values)
Average = (12 + 18 + 16 + 14) ÷ 4

**Step 4: Calculate the sum**
12 + 18 + 16 + 14 = 60 cm

**Step 5: Divide by the number of trials**
60 ÷ 4 = 15 cm

**Step 6: Check the answer**
Does it make sense? Yes - 15 is between the minimum (12) and maximum (18), which is what we expect for an average.
Did we count all trials? Yes - we used all 4 values.

**The answer is C (15 cm).**

Common trap: Don't forget to divide by the NUMBER of values (4 trials), not just add them up!`,
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

  console.log('\n✓ Science 3.5 Math on Science complete!');
}

uploadAll();
