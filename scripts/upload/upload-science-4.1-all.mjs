import { createClient } from '@supabase/supabase-js';
import fs from 'fs';

const supabase = createClient(
  'https://rabavobdklnwvwsldbix.supabase.co',
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InJhYmF2b2Jka2xud3Z3c2xkYml4Iiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc1OTc2NTQ3OCwiZXhwIjoyMDc1MzQxNDc4fQ.81SeH703keXgF3IevQlRS7OYmn1J2GUVIkn3OJiviM4'
);

async function uploadAll() {
  // Upload lesson content
  const lessonContent = fs.readFileSync('science-4.1-water-knowledge.html', 'utf8');
  const { error: lessonError } = await supabase
    .from('lessons')
    .update({
      content: lessonContent,
      content_json: null,
      migrated_to_json: false
    })
    .eq('lesson_key', 'water-knowledge');

  if (lessonError) {
    console.error('Lesson upload error:', lessonError);
    process.exit(1);
  }
  console.log('✓ Science 4.1 Water Knowledge lesson uploaded');

  // Get lesson ID
  const { data: lesson } = await supabase
    .from('lessons')
    .select('id')
    .eq('lesson_key', 'water-knowledge')
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
      title: "Identifying States of Water at Different Temperatures",
      problem_text: `<p style="margin-bottom: 1.5rem; font-size: 16px; line-height: 1.6;">A scientist placed water samples in four different temperature-controlled chambers and observed their physical state after 1 hour.</p>

  <p style="font-weight: 700; font-size: 18px; margin-bottom: 1.2rem; color: #1f2937;">Table 1</p>
  <p style="margin-bottom: 1rem; font-size: 15px;"><strong>Description:</strong> Temperature and observed state of water samples.</p>
  <table style="width: auto; border-collapse: collapse; margin-top: 1.2rem; font-size: 14px;">
    <thead>
      <tr style="background-color: #374151;">
        <th style="padding: 0.6rem; border: 1px solid #1f2937; text-align: center; color: white; font-weight: 600;">Chamber</th>
        <th style="padding: 0.6rem; border: 1px solid #1f2937; text-align: center; color: white; font-weight: 600;">Temperature (°C)</th>
        <th style="padding: 0.6rem; border: 1px solid #1f2937; text-align: center; color: white; font-weight: 600;">Physical State</th>
      </tr>
    </thead>
    <tbody>
      <tr style="background-color: white;">
        <td style="padding: 0.5rem; border: 1px solid #d1d5db; text-align: center; font-weight: 600; font-size: 14px;">1</td>
        <td style="padding: 0.5rem; border: 1px solid #d1d5db; text-align: center; font-size: 14px;">-10</td>
        <td style="padding: 0.5rem; border: 1px solid #d1d5db; text-align: center; font-size: 14px;">Solid</td>
      </tr>
      <tr style="background-color: #f9fafb;">
        <td style="padding: 0.5rem; border: 1px solid #d1d5db; text-align: center; font-weight: 600; font-size: 14px;">2</td>
        <td style="padding: 0.5rem; border: 1px solid #d1d5db; text-align: center; font-size: 14px;">25</td>
        <td style="padding: 0.5rem; border: 1px solid #d1d5db; text-align: center; font-size: 14px;">Liquid</td>
      </tr>
      <tr style="background-color: white;">
        <td style="padding: 0.5rem; border: 1px solid #d1d5db; text-align: center; font-weight: 600; font-size: 14px;">3</td>
        <td style="padding: 0.5rem; border: 1px solid #d1d5db; text-align: center; font-size: 14px;">110</td>
        <td style="padding: 0.5rem; border: 1px solid #d1d5db; text-align: center; font-size: 14px;">Gas</td>
      </tr>
      <tr style="background-color: #f9fafb;">
        <td style="padding: 0.5rem; border: 1px solid #d1d5db; text-align: center; font-weight: 600; font-size: 14px;">4</td>
        <td style="padding: 0.5rem; border: 1px solid #d1d5db; text-align: center; font-size: 14px;">?</td>
        <td style="padding: 0.5rem; border: 1px solid #d1d5db; text-align: center; font-size: 14px;">Liquid</td>
      </tr>
    </tbody>
  </table>


<p style="margin-top: 2.5rem; font-weight: 600; font-size: 17px; color: #1f2937;">Based on the pattern in Table 1, the temperature in Chamber 4 was most likely:</p>`,
      choices: [
        { letter: "A", text: "below 0°C" },
        { letter: "B", text: "between 0°C and 100°C" },
        { letter: "C", text: "above 100°C" },
        { letter: "D", text: "exactly 0°C" }
      ],
      correct_answer: "B",
      solution_steps: [],
      answer_explanation: `**Step 1: Recall water's phase transition temperatures**
Water freezes at 0°C and boils at 100°C.
- Below 0°C → Solid (ice)
- Between 0°C and 100°C → Liquid
- Above 100°C → Gas (steam)

**Step 2: Verify the pattern with known chambers**
Chamber 1: -10°C → Solid ✓ (below 0°C)
Chamber 2: 25°C → Liquid ✓ (between 0°C and 100°C)
Chamber 3: 110°C → Gas ✓ (above 100°C)

The data confirms the expected pattern.

**Step 3: Apply knowledge to Chamber 4**
Chamber 4 shows: Physical State = Liquid

For water to be liquid, temperature must be between 0°C and 100°C.

**Step 4: Eliminate wrong answers**
A. Below 0°C → Would be solid, not liquid ✗
B. Between 0°C and 100°C → Would be liquid ✓
C. Above 100°C → Would be gas, not liquid ✗
D. Exactly 0°C → Transition point, could be solid or liquid (ambiguous) ✗

**The answer is B.**

The liquid state indicates the temperature was between water's freezing point (0°C) and boiling point (100°C).`,
      diagram_svg: null,
      is_worked_example: false
    },
    {
      lesson_id: lesson.id,
      position: 2,
      title: "Understanding Density and Floating",
      problem_text: `<p style="margin-bottom: 1.5rem; font-size: 16px; line-height: 1.6;">A student placed four different objects in a container of liquid water at 20°C and observed whether they floated or sank.</p>

  <p style="font-weight: 700; font-size: 18px; margin-bottom: 1.2rem; color: #1f2937;">Table 1</p>
  <p style="margin-bottom: 1rem; font-size: 15px;"><strong>Description:</strong> Density and floating behavior of different objects in water.</p>
  <table style="width: auto; border-collapse: collapse; margin-top: 1.2rem; font-size: 14px;">
    <thead>
      <tr style="background-color: #374151;">
        <th style="padding: 0.6rem; border: 1px solid #1f2937; text-align: center; color: white; font-weight: 600;">Object</th>
        <th style="padding: 0.6rem; border: 1px solid #1f2937; text-align: center; color: white; font-weight: 600;">Density (g/cm³)</th>
        <th style="padding: 0.6rem; border: 1px solid #1f2937; text-align: center; color: white; font-weight: 600;">Behavior</th>
      </tr>
    </thead>
    <tbody>
      <tr style="background-color: white;">
        <td style="padding: 0.5rem; border: 1px solid #d1d5db; text-align: center; font-weight: 600; font-size: 14px;">Ice cube</td>
        <td style="padding: 0.5rem; border: 1px solid #d1d5db; text-align: center; font-size: 14px;">0.92</td>
        <td style="padding: 0.5rem; border: 1px solid #d1d5db; text-align: center; font-size: 14px;">Floated</td>
      </tr>
      <tr style="background-color: #f9fafb;">
        <td style="padding: 0.5rem; border: 1px solid #d1d5db; text-align: center; font-weight: 600; font-size: 14px;">Wood block</td>
        <td style="padding: 0.5rem; border: 1px solid #d1d5db; text-align: center; font-size: 14px;">0.65</td>
        <td style="padding: 0.5rem; border: 1px solid #d1d5db; text-align: center; font-size: 14px;">Floated</td>
      </tr>
      <tr style="background-color: white;">
        <td style="padding: 0.5rem; border: 1px solid #d1d5db; text-align: center; font-weight: 600; font-size: 14px;">Iron nail</td>
        <td style="padding: 0.5rem; border: 1px solid #d1d5db; text-align: center; font-size: 14px;">7.87</td>
        <td style="padding: 0.5rem; border: 1px solid #d1d5db; text-align: center; font-size: 14px;">Sank</td>
      </tr>
      <tr style="background-color: #f9fafb;">
        <td style="padding: 0.5rem; border: 1px solid #d1d5db; text-align: center; font-weight: 600; font-size: 14px;">Glass marble</td>
        <td style="padding: 0.5rem; border: 1px solid #d1d5db; text-align: center; font-size: 14px;">2.50</td>
        <td style="padding: 0.5rem; border: 1px solid #d1d5db; text-align: center; font-size: 14px;">Sank</td>
      </tr>
    </tbody>
  </table>


<p style="margin-top: 2.5rem; font-weight: 600; font-size: 17px; color: #1f2937;">Based on Table 1, which statement best explains why ice floats in liquid water?</p>`,
      choices: [
        { letter: "A", text: "Ice has a higher density than liquid water" },
        { letter: "B", text: "Ice has a lower density than liquid water" },
        { letter: "C", text: "Ice has the same density as liquid water" },
        { letter: "D", text: "Ice has a density greater than 2.00 g/cm³" }
      ],
      correct_answer: "B",
      solution_steps: [],
      answer_explanation: `**Step 1: Recall the density of liquid water**
Water has a density of approximately 1.0 g/cm³ at room temperature (20°C).

**Step 2: Identify the pattern from the data**
Looking at Table 1:
- Ice cube: density = 0.92 g/cm³ → Floated
- Wood block: density = 0.65 g/cm³ → Floated
- Iron nail: density = 7.87 g/cm³ → Sank
- Glass marble: density = 2.50 g/cm³ → Sank

Pattern: Objects with density < 1.0 g/cm³ float, objects with density > 1.0 g/cm³ sink.

**Step 3: Compare ice density to water density**
Ice: 0.92 g/cm³
Liquid water: ~1.0 g/cm³

Ice has a LOWER density than liquid water (0.92 < 1.0)

**Step 4: Apply the floating principle**
Objects float when they are less dense than the liquid.
Objects sink when they are more dense than the liquid.

Since ice (0.92 g/cm³) is less dense than water (1.0 g/cm³), ice floats.

**Step 5: Evaluate answer choices**
A. Higher density → Would sink, not float ✗
B. Lower density → Would float ✓
C. Same density → Would neither float nor sink (neutral buoyancy) ✗
D. Density > 2.00 → Would definitely sink ✗

**The answer is B.**

Ice floats because it is less dense (0.92 g/cm³) than liquid water (1.0 g/cm³). This is an unusual property - most substances are denser in solid form than liquid form.`,
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

  console.log('\n✓ Science 4.1 Water Knowledge complete!');
}

uploadAll();
