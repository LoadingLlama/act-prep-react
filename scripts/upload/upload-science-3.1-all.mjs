import { createClient } from '@supabase/supabase-js';
import fs from 'fs';

const supabase = createClient(
  'https://rabavobdklnwvwsldbix.supabase.co',
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InJhYmF2b2Jka2xud3Z3c2xkYml4Iiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc1OTc2NTQ3OCwiZXhwIjoyMDc1MzQxNDc4fQ.81SeH703keXgF3IevQlRS7OYmn1J2GUVIkn3OJiviM4'
);

async function uploadAll() {
  // Upload lesson content
  const lessonContent = fs.readFileSync('science-3.1-two-part-answers.html', 'utf8');
  const { error: lessonError } = await supabase
    .from('lessons')
    .update({
      content: lessonContent,
      content_json: null,
      migrated_to_json: false
    })
    .eq('lesson_key', 'two-part-answers');

  if (lessonError) {
    console.error('Lesson upload error:', lessonError);
    process.exit(1);
  }
  console.log('✓ Science 3.1 Two-Part Answers lesson uploaded');

  // Get lesson ID
  const { data: lesson } = await supabase
    .from('lessons')
    .select('id')
    .eq('lesson_key', 'two-part-answers')
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
      title: "Evaluating Claims About Combustibility",
      problem_text: `<p style="margin-bottom: 1.5rem; font-size: 16px; line-height: 1.6;">A science journal claimed that Acetone was the most likely to combust at 40°C.</p>

  <p style="font-weight: 700; font-size: 18px; margin-bottom: 1.2rem; color: #1f2937;">Figure 1</p>
  <p style="margin-bottom: 1rem; font-size: 15px;"><strong>Graph Description:</strong> Percent combustibility versus temperature for three solvents.</p>
  <table style="width: auto; border-collapse: collapse; margin-top: 1.2rem; font-size: 14px;">
    <thead>
      <tr style="background-color: #374151;">
        <th style="padding: 0.6rem; border: 1px solid #1f2937; text-align: center; color: white; font-weight: 600;">Temperature (°C)</th>
        <th style="padding: 0.6rem; border: 1px solid #1f2937; text-align: center; color: white; font-weight: 600;">Pentane (%)</th>
        <th style="padding: 0.6rem; border: 1px solid #1f2937; text-align: center; color: white; font-weight: 600;">Acetone (%)</th>
        <th style="padding: 0.6rem; border: 1px solid #1f2937; text-align: center; color: white; font-weight: 600;">Xylene (%)</th>
      </tr>
    </thead>
    <tbody>
      <tr style="background-color: white;">
        <td style="padding: 0.5rem; border: 1px solid #d1d5db; text-align: center; font-weight: 600; font-size: 14px;">0</td>
        <td style="padding: 0.5rem; border: 1px solid #d1d5db; text-align: center; font-size: 14px;">20</td>
        <td style="padding: 0.5rem; border: 1px solid #d1d5db; text-align: center; font-size: 14px;">25</td>
        <td style="padding: 0.5rem; border: 1px solid #d1d5db; text-align: center; font-size: 14px;">15</td>
      </tr>
      <tr style="background-color: #f9fafb;">
        <td style="padding: 0.5rem; border: 1px solid #d1d5db; text-align: center; font-weight: 600; font-size: 14px;">20</td>
        <td style="padding: 0.5rem; border: 1px solid #d1d5db; text-align: center; font-size: 14px;">40</td>
        <td style="padding: 0.5rem; border: 1px solid #d1d5db; text-align: center; font-size: 14px;">50</td>
        <td style="padding: 0.5rem; border: 1px solid #d1d5db; text-align: center; font-size: 14px;">30</td>
      </tr>
      <tr style="background-color: white;">
        <td style="padding: 0.5rem; border: 1px solid #d1d5db; text-align: center; font-weight: 600; font-size: 14px;">40</td>
        <td style="padding: 0.5rem; border: 1px solid #d1d5db; text-align: center; font-size: 14px;">60</td>
        <td style="padding: 0.5rem; border: 1px solid #d1d5db; text-align: center; font-size: 14px;">75</td>
        <td style="padding: 0.5rem; border: 1px solid #d1d5db; text-align: center; font-size: 14px;">45</td>
      </tr>
      <tr style="background-color: #f9fafb;">
        <td style="padding: 0.5rem; border: 1px solid #d1d5db; text-align: center; font-weight: 600; font-size: 14px;">60</td>
        <td style="padding: 0.5rem; border: 1px solid #d1d5db; text-align: center; font-size: 14px;">80</td>
        <td style="padding: 0.5rem; border: 1px solid #d1d5db; text-align: center; font-size: 14px;">90</td>
        <td style="padding: 0.5rem; border: 1px solid #d1d5db; text-align: center; font-size: 14px;">40</td>
      </tr>
    </tbody>
  </table>


<p style="margin-top: 2.5rem; font-weight: 600; font-size: 17px; color: #1f2937;">Does Figure 1 support this claim?</p>`,
      choices: [
        { letter: "A", text: "Yes, acetone has the highest percent combustibility at 40°C" },
        { letter: "B", text: "Yes, acetone has the lowest percent combustibility at 40°C" },
        { letter: "C", text: "No, acetone has the highest percent combustibility at 40°C" },
        { letter: "D", text: "No, acetone has the lowest percent combustibility at 40°C" }
      ],
      correct_answer: "A",
      solution_steps: [],
      answer_explanation: `**Step 1: Identify the pattern**
A/B both say "Yes", C/D both say "No"
A/C both say "highest", B/D both say "lowest"

**Step 2: Start with the explanation (easiest to check)**
Check if acetone has the highest or lowest percent combustibility at 40°C.
At 40°C: Pentane = 60%, Acetone = 75%, Xylene = 45%
Acetone has the HIGHEST (75%). So the correct explanation contains "highest".
Eliminate B and D (they say "lowest").

**Step 3: Now evaluate the claim between A and C**
The claim asks: Does the figure support that "acetone was the most likely to combust at 40°C"?
Since acetone has the highest combustibility (75%), YES, the figure supports this.

**Step 4: Match to remaining answers**
Between A and C (both have correct explanation "highest"):
- A says "Yes" ✓
- C says "No" ✗

**The answer is A.**`,
      diagram_svg: null,
      is_worked_example: false
    },
    {
      lesson_id: lesson.id,
      position: 2,
      title: "Using Two-Part Strategy on Trend Questions",
      problem_text: `<p style="margin-bottom: 1.5rem; font-size: 16px; line-height: 1.6;">A science journal claimed that for all compounds, percent combustibility increases as temperature increases.</p>

  <p style="font-weight: 700; font-size: 18px; margin-bottom: 1.2rem; color: #1f2937;">Figure 1</p>
  <p style="margin-bottom: 1rem; font-size: 15px;"><strong>Graph Description:</strong> Percent combustibility versus temperature for three solvents.</p>
  <table style="width: auto; border-collapse: collapse; margin-top: 1.2rem; font-size: 14px;">
    <thead>
      <tr style="background-color: #374151;">
        <th style="padding: 0.6rem; border: 1px solid #1f2937; text-align: center; color: white; font-weight: 600;">Temperature (°C)</th>
        <th style="padding: 0.6rem; border: 1px solid #1f2937; text-align: center; color: white; font-weight: 600;">Pentane (%)</th>
        <th style="padding: 0.6rem; border: 1px solid #1f2937; text-align: center; color: white; font-weight: 600;">Acetone (%)</th>
        <th style="padding: 0.6rem; border: 1px solid #1f2937; text-align: center; color: white; font-weight: 600;">Xylene (%)</th>
      </tr>
    </thead>
    <tbody>
      <tr style="background-color: white;">
        <td style="padding: 0.5rem; border: 1px solid #d1d5db; text-align: center; font-weight: 600; font-size: 14px;">0</td>
        <td style="padding: 0.5rem; border: 1px solid #d1d5db; text-align: center; font-size: 14px;">20</td>
        <td style="padding: 0.5rem; border: 1px solid #d1d5db; text-align: center; font-size: 14px;">25</td>
        <td style="padding: 0.5rem; border: 1px solid #d1d5db; text-align: center; font-size: 14px;">15</td>
      </tr>
      <tr style="background-color: #f9fafb;">
        <td style="padding: 0.5rem; border: 1px solid #d1d5db; text-align: center; font-weight: 600; font-size: 14px;">20</td>
        <td style="padding: 0.5rem; border: 1px solid #d1d5db; text-align: center; font-size: 14px;">40</td>
        <td style="padding: 0.5rem; border: 1px solid #d1d5db; text-align: center; font-size: 14px;">50</td>
        <td style="padding: 0.5rem; border: 1px solid #d1d5db; text-align: center; font-size: 14px;">30</td>
      </tr>
      <tr style="background-color: white;">
        <td style="padding: 0.5rem; border: 1px solid #d1d5db; text-align: center; font-weight: 600; font-size: 14px;">40</td>
        <td style="padding: 0.5rem; border: 1px solid #d1d5db; text-align: center; font-size: 14px;">60</td>
        <td style="padding: 0.5rem; border: 1px solid #d1d5db; text-align: center; font-size: 14px;">75</td>
        <td style="padding: 0.5rem; border: 1px solid #d1d5db; text-align: center; font-size: 14px;">45</td>
      </tr>
      <tr style="background-color: #f9fafb;">
        <td style="padding: 0.5rem; border: 1px solid #d1d5db; text-align: center; font-weight: 600; font-size: 14px;">60</td>
        <td style="padding: 0.5rem; border: 1px solid #d1d5db; text-align: center; font-size: 14px;">80</td>
        <td style="padding: 0.5rem; border: 1px solid #d1d5db; text-align: center; font-size: 14px;">90</td>
        <td style="padding: 0.5rem; border: 1px solid #d1d5db; text-align: center; font-size: 14px;">40</td>
      </tr>
    </tbody>
  </table>


<p style="margin-top: 2.5rem; font-weight: 600; font-size: 17px; color: #1f2937;">Does Figure 1 support this claim?</p>`,
      choices: [
        { letter: "A", text: "Yes, for all three compounds percent combustibility increases as temperature increases" },
        { letter: "B", text: "Yes, xylene's percent combustibility decreases as temperature increases" },
        { letter: "C", text: "No, for all three compounds percent combustibility increases as temperature increases" },
        { letter: "D", text: "No, xylene's percent combustibility decreases as temperature increases" }
      ],
      correct_answer: "D",
      solution_steps: [],
      answer_explanation: `**Step 1: Identify the pattern**
A/B both say "Yes", C/D both say "No"
A/C both say "for all three compounds...increases", B/D both say "xylene...decreases"

**Step 2: Start with the explanation**
Check if "for all three increases" OR "xylene decreases" is correct.

Pentane: 20→40→60→80 (increases) ✓
Acetone: 25→50→75→90 (increases) ✓
Xylene: 15→30→45→40 (increases then DECREASES at 60°C) ✓

Xylene does NOT always increase - it decreases from 45% to 40%. So "xylene decreases" is the correct explanation.
Eliminate A and C.

**Step 3: Evaluate the claim between B and D**
The claim asks: Does the figure support "for ALL compounds, percent combustibility increases"?
Since Xylene decreases at higher temperature, NO, not ALL compounds increase.

Between B and D (both have correct explanation about xylene):
- B says "Yes" ✗
- D says "No" ✓

**The answer is D.**`,
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

  console.log('\n✓ Science 3.1 Two-Part Answers complete!');
}

uploadAll();
