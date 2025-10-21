import { createClient } from '@supabase/supabase-js';
import fs from 'fs';

const supabase = createClient(
  'https://rabavobdklnwvwsldbix.supabase.co',
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InJhYmF2b2Jka2xud3Z3c2xkYml4Iiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc1OTc2NTQ3OCwiZXhwIjoyMDc1MzQxNDc4fQ.81SeH703keXgF3IevQlRS7OYmn1J2GUVIkn3OJiviM4'
);

async function uploadAll() {
  // Upload lesson content
  const lessonContent = fs.readFileSync('science-3.3-equations-as-answers.html', 'utf8');
  const { error: lessonError } = await supabase
    .from('lessons')
    .update({
      content: lessonContent,
      content_json: null,
      migrated_to_json: false
    })
    .eq('lesson_key', 'equations-as-answers');

  if (lessonError) {
    console.error('Lesson upload error:', lessonError);
    process.exit(1);
  }
  console.log('✓ Science 3.3 Equations as Answers lesson uploaded');

  // Get lesson ID
  const { data: lesson } = await supabase
    .from('lessons')
    .select('id')
    .eq('lesson_key', 'equations-as-answers')
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
      title: "Testing Equations with Simple Data Points",
      problem_text: `<p style="margin-bottom: 1.5rem; font-size: 16px; line-height: 1.6;">A study measured the temperature at different altitudes above sea level.</p>

  <p style="font-weight: 700; font-size: 18px; margin-bottom: 1.2rem; color: #1f2937;">Figure 1</p>
  <p style="margin-bottom: 1rem; font-size: 15px;"><strong>Graph Description:</strong> Temperature versus altitude for measurements taken on a clear day.</p>
  <table style="width: auto; border-collapse: collapse; margin-top: 1.2rem; font-size: 14px;">
    <thead>
      <tr style="background-color: #374151;">
        <th style="padding: 0.6rem; border: 1px solid #1f2937; text-align: center; color: white; font-weight: 600;">Altitude (km)</th>
        <th style="padding: 0.6rem; border: 1px solid #1f2937; text-align: center; color: white; font-weight: 600;">Temperature (°C)</th>
      </tr>
    </thead>
    <tbody>
      <tr style="background-color: white;">
        <td style="padding: 0.5rem; border: 1px solid #d1d5db; text-align: center; font-weight: 600; font-size: 14px;">0</td>
        <td style="padding: 0.5rem; border: 1px solid #d1d5db; text-align: center; font-size: 14px;">20</td>
      </tr>
      <tr style="background-color: #f9fafb;">
        <td style="padding: 0.5rem; border: 1px solid #d1d5db; text-align: center; font-weight: 600; font-size: 14px;">1</td>
        <td style="padding: 0.5rem; border: 1px solid #d1d5db; text-align: center; font-size: 14px;">15</td>
      </tr>
      <tr style="background-color: white;">
        <td style="padding: 0.5rem; border: 1px solid #d1d5db; text-align: center; font-weight: 600; font-size: 14px;">2</td>
        <td style="padding: 0.5rem; border: 1px solid #d1d5db; text-align: center; font-size: 14px;">10</td>
      </tr>
      <tr style="background-color: #f9fafb;">
        <td style="padding: 0.5rem; border: 1px solid #d1d5db; text-align: center; font-weight: 600; font-size: 14px;">4</td>
        <td style="padding: 0.5rem; border: 1px solid #d1d5db; text-align: center; font-size: 14px;">0</td>
      </tr>
    </tbody>
  </table>


<p style="margin-top: 2.5rem; font-weight: 600; font-size: 17px; color: #1f2937;">Which equation best represents the relationship between temperature (T) and altitude (h)?</p>`,
      choices: [
        { letter: "A", text: "T = 20 + 5h" },
        { letter: "B", text: "T = 20 - 5h" },
        { letter: "C", text: "T = 5h" },
        { letter: "D", text: "T = 100/h" }
      ],
      correct_answer: "B",
      solution_steps: [],
      answer_explanation: `**Step 1: Identify the variables**
T = temperature (°C)
h = altitude (km)

Looking at the data, as altitude increases, temperature decreases. This means we need a negative relationship (eliminate A and C which show positive relationships).

Remaining: B (T = 20 - 5h) or D (T = 100/h)

**Step 2: Test with h = 0 (easiest point)**
From the table: when h = 0, T = 20

Test B: T = 20 - 5(0) = 20 - 0 = 20 ✓ Matches!
Test D: T = 100/0 = undefined ✗ Doesn't work!

Equation B works for h = 0, but let's verify with another point to be sure.

**Step 3: Test with h = 1 (another simple point)**
From the table: when h = 1, T = 15

Test B: T = 20 - 5(1) = 20 - 5 = 15 ✓ Matches!

**Step 4: Verify with h = 2**
From the table: when h = 2, T = 10

Test B: T = 20 - 5(2) = 20 - 10 = 10 ✓ Matches!

**The answer is B.**

The pattern shows that for every 1 km increase in altitude, temperature decreases by 5°C, starting from 20°C at sea level (h = 0).`,
      diagram_svg: null,
      is_worked_example: false
    },
    {
      lesson_id: lesson.id,
      position: 2,
      title: "Identifying Inverse Relationships",
      problem_text: `<p style="margin-bottom: 1.5rem; font-size: 16px; line-height: 1.6;">A gas was compressed in a sealed container and the pressure was measured at different volumes.</p>

  <p style="font-weight: 700; font-size: 18px; margin-bottom: 1.2rem; color: #1f2937;">Figure 1</p>
  <p style="margin-bottom: 1rem; font-size: 15px;"><strong>Graph Description:</strong> Pressure versus volume for a gas at constant temperature.</p>
  <table style="width: auto; border-collapse: collapse; margin-top: 1.2rem; font-size: 14px;">
    <thead>
      <tr style="background-color: #374151;">
        <th style="padding: 0.6rem; border: 1px solid #1f2937; text-align: center; color: white; font-weight: 600;">Volume (L)</th>
        <th style="padding: 0.6rem; border: 1px solid #1f2937; text-align: center; color: white; font-weight: 600;">Pressure (atm)</th>
      </tr>
    </thead>
    <tbody>
      <tr style="background-color: white;">
        <td style="padding: 0.5rem; border: 1px solid #d1d5db; text-align: center; font-weight: 600; font-size: 14px;">1</td>
        <td style="padding: 0.5rem; border: 1px solid #d1d5db; text-align: center; font-size: 14px;">24</td>
      </tr>
      <tr style="background-color: #f9fafb;">
        <td style="padding: 0.5rem; border: 1px solid #d1d5db; text-align: center; font-weight: 600; font-size: 14px;">2</td>
        <td style="padding: 0.5rem; border: 1px solid #d1d5db; text-align: center; font-size: 14px;">12</td>
      </tr>
      <tr style="background-color: white;">
        <td style="padding: 0.5rem; border: 1px solid #d1d5db; text-align: center; font-weight: 600; font-size: 14px;">3</td>
        <td style="padding: 0.5rem; border: 1px solid #d1d5db; text-align: center; font-size: 14px;">8</td>
      </tr>
      <tr style="background-color: #f9fafb;">
        <td style="padding: 0.5rem; border: 1px solid #d1d5db; text-align: center; font-weight: 600; font-size: 14px;">4</td>
        <td style="padding: 0.5rem; border: 1px solid #d1d5db; text-align: center; font-size: 14px;">6</td>
      </tr>
    </tbody>
  </table>


<p style="margin-top: 2.5rem; font-weight: 600; font-size: 17px; color: #1f2937;">Which equation best represents the relationship between pressure (P) and volume (V)?</p>`,
      choices: [
        { letter: "A", text: "P = 24V" },
        { letter: "B", text: "P = 24 - 6V" },
        { letter: "C", text: "P = 24/V" },
        { letter: "D", text: "P = V/24" }
      ],
      correct_answer: "C",
      solution_steps: [],
      answer_explanation: `**Step 1: Check the direction of relationship**
Looking at the data: as V increases, P decreases
- V doubles from 1→2: P halves from 24→12
- V doubles from 2→4: P halves from 12→6

This is an inverse relationship (not linear), so eliminate A and B.

Remaining: C (P = 24/V) or D (P = V/24)

**Step 2: Test with V = 1 (simplest point)**
From the table: when V = 1, P = 24

Test C: P = 24/1 = 24 ✓ Matches!
Test D: P = 1/24 = 0.0417 ✗ Way too small!

Equation C is clearly correct, but let's verify with another point.

**Step 3: Verify with V = 2**
From the table: when V = 2, P = 12

Test C: P = 24/2 = 12 ✓ Matches perfectly!

**Step 4: Verify with V = 4**
From the table: when V = 4, P = 6

Test C: P = 24/4 = 6 ✓ Matches perfectly!

**The answer is C.**

This is Boyle's Law - the product P × V is constant (= 24). When volume increases, pressure decreases proportionally so that their product remains 24.`,
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

  console.log('\n✓ Science 3.3 Equations as Answers complete!');
}

uploadAll();
