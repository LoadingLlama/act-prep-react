import { createClient } from '@supabase/supabase-js';
import fs from 'fs';

const supabase = createClient(
  'https://rabavobdklnwvwsldbix.supabase.co',
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InJhYmF2b2Jka2xud3Z3c2xkYml4Iiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc1OTc2NTQ3OCwiZXhwIjoyMDc1MzQxNDc4fQ.81SeH703keXgF3IevQlRS7OYmn1J2GUVIkn3OJiviM4'
);

async function uploadAll() {
  // Upload lesson content
  const lessonContent = fs.readFileSync('science-4.2-experimental-setup.html', 'utf8');
  const { error: lessonError } = await supabase
    .from('lessons')
    .update({
      content: lessonContent,
      content_json: null,
      migrated_to_json: false
    })
    .eq('lesson_key', 'experimental-setup');

  if (lessonError) {
    console.error('Lesson upload error:', lessonError);
    process.exit(1);
  }
  console.log('✓ Science 4.2 Experimental Setup lesson uploaded');

  // Get lesson ID
  const { data: lesson } = await supabase
    .from('lessons')
    .select('id')
    .eq('lesson_key', 'experimental-setup')
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
      title: "Identifying Independent and Dependent Variables",
      problem_text: `<p style="margin-bottom: 1.5rem; font-size: 16px; line-height: 1.6;">A student investigated how the amount of fertilizer affected plant growth. Four identical plants were each given different amounts of fertilizer (0g, 5g, 10g, and 15g) while keeping all other conditions the same. After 4 weeks, the student measured the height of each plant.</p>

  <p style="font-weight: 700; font-size: 18px; margin-bottom: 1.2rem; color: #1f2937;">Table 1</p>
  <p style="margin-bottom: 1rem; font-size: 15px;"><strong>Description:</strong> Fertilizer amount and final plant height.</p>
  <table style="width: auto; border-collapse: collapse; margin-top: 1.2rem; font-size: 14px;">
    <thead>
      <tr style="background-color: #374151;">
        <th style="padding: 0.6rem; border: 1px solid #1f2937; text-align: center; color: white; font-weight: 600;">Plant</th>
        <th style="padding: 0.6rem; border: 1px solid #1f2937; text-align: center; color: white; font-weight: 600;">Fertilizer (g)</th>
        <th style="padding: 0.6rem; border: 1px solid #1f2937; text-align: center; color: white; font-weight: 600;">Final Height (cm)</th>
      </tr>
    </thead>
    <tbody>
      <tr style="background-color: white;">
        <td style="padding: 0.5rem; border: 1px solid #d1d5db; text-align: center; font-weight: 600; font-size: 14px;">1</td>
        <td style="padding: 0.5rem; border: 1px solid #d1d5db; text-align: center; font-size: 14px;">0</td>
        <td style="padding: 0.5rem; border: 1px solid #d1d5db; text-align: center; font-size: 14px;">12</td>
      </tr>
      <tr style="background-color: #f9fafb;">
        <td style="padding: 0.5rem; border: 1px solid #d1d5db; text-align: center; font-weight: 600; font-size: 14px;">2</td>
        <td style="padding: 0.5rem; border: 1px solid #d1d5db; text-align: center; font-size: 14px;">5</td>
        <td style="padding: 0.5rem; border: 1px solid #d1d5db; text-align: center; font-size: 14px;">18</td>
      </tr>
      <tr style="background-color: white;">
        <td style="padding: 0.5rem; border: 1px solid #d1d5db; text-align: center; font-weight: 600; font-size: 14px;">3</td>
        <td style="padding: 0.5rem; border: 1px solid #d1d5db; text-align: center; font-size: 14px;">10</td>
        <td style="padding: 0.5rem; border: 1px solid #d1d5db; text-align: center; font-size: 14px;">24</td>
      </tr>
      <tr style="background-color: #f9fafb;">
        <td style="padding: 0.5rem; border: 1px solid #d1d5db; text-align: center; font-weight: 600; font-size: 14px;">4</td>
        <td style="padding: 0.5rem; border: 1px solid #d1d5db; text-align: center; font-size: 14px;">15</td>
        <td style="padding: 0.5rem; border: 1px solid #d1d5db; text-align: center; font-size: 14px;">26</td>
      </tr>
    </tbody>
  </table>


<p style="margin-top: 2.5rem; font-weight: 600; font-size: 17px; color: #1f2937;">In this experiment, which variable was the independent variable?</p>`,
      choices: [
        { letter: "A", text: "The type of plant used" },
        { letter: "B", text: "The amount of fertilizer" },
        { letter: "C", text: "The final height of the plant" },
        { letter: "D", text: "The time period (4 weeks)" }
      ],
      correct_answer: "B",
      solution_steps: [],
      answer_explanation: `**Step 1: Define independent variable**
The independent variable is what the experimenter intentionally changes/controls.
- It's the variable that is manipulated to see its effect
- Often called the "cause" in cause-and-effect

**Step 2: Identify what was intentionally changed**
Looking at the experiment description and Table 1:
- The experimenter gave different amounts of fertilizer to different plants
- Plant 1 got 0g, Plant 2 got 5g, Plant 3 got 10g, Plant 4 got 15g
- This was done ON PURPOSE to test the effect

**Step 3: Identify what was measured**
The student measured the final height after 4 weeks.
- This is the DEPENDENT variable (what you measure)
- It depends on/responds to the amount of fertilizer

**Step 4: Evaluate answer choices**
A. Type of plant → The problem states "identical plants" - this was kept CONSTANT, not changed ✗
B. Amount of fertilizer → This was intentionally changed (0g, 5g, 10g, 15g) ✓
C. Final height → This was MEASURED, not changed. This is the dependent variable ✗
D. Time period → All plants were measured after 4 weeks - this was kept CONSTANT ✗

**The answer is B.**

The amount of fertilizer is the independent variable because it's what the experimenter deliberately changed to observe its effect on plant growth. The height is the dependent variable (what responds), and everything else (plant type, time) was kept constant.`,
      diagram_svg: null,
      is_worked_example: false
    },
    {
      lesson_id: lesson.id,
      position: 2,
      title: "Identifying the Control Group",
      problem_text: `<p style="margin-bottom: 1.5rem; font-size: 16px; line-height: 1.6;">A scientist tested whether a new drug reduced headache pain. Five groups of patients with headaches received different treatments, and pain levels were measured after 2 hours.</p>

  <p style="font-weight: 700; font-size: 18px; margin-bottom: 1.2rem; color: #1f2937;">Table 1</p>
  <p style="margin-bottom: 1rem; font-size: 15px;"><strong>Description:</strong> Treatment received and average pain level after 2 hours.</p>
  <table style="width: auto; border-collapse: collapse; margin-top: 1.2rem; font-size: 14px;">
    <thead>
      <tr style="background-color: #374151;">
        <th style="padding: 0.6rem; border: 1px solid #1f2937; text-align: center; color: white; font-weight: 600;">Group</th>
        <th style="padding: 0.6rem; border: 1px solid #1f2937; text-align: center; color: white; font-weight: 600;">Treatment</th>
        <th style="padding: 0.6rem; border: 1px solid #1f2937; text-align: center; color: white; font-weight: 600;">Avg Pain Level (1-10)</th>
      </tr>
    </thead>
    <tbody>
      <tr style="background-color: white;">
        <td style="padding: 0.5rem; border: 1px solid #d1d5db; text-align: center; font-weight: 600; font-size: 14px;">1</td>
        <td style="padding: 0.5rem; border: 1px solid #d1d5db; text-align: center; font-size: 14px;">50 mg new drug</td>
        <td style="padding: 0.5rem; border: 1px solid #d1d5db; text-align: center; font-size: 14px;">3.2</td>
      </tr>
      <tr style="background-color: #f9fafb;">
        <td style="padding: 0.5rem; border: 1px solid #d1d5db; text-align: center; font-weight: 600; font-size: 14px;">2</td>
        <td style="padding: 0.5rem; border: 1px solid #d1d5db; text-align: center; font-size: 14px;">100 mg new drug</td>
        <td style="padding: 0.5rem; border: 1px solid #d1d5db; text-align: center; font-size: 14px;">2.1</td>
      </tr>
      <tr style="background-color: white;">
        <td style="padding: 0.5rem; border: 1px solid #d1d5db; text-align: center; font-weight: 600; font-size: 14px;">3</td>
        <td style="padding: 0.5rem; border: 1px solid #d1d5db; text-align: center; font-size: 14px;">200 mg new drug</td>
        <td style="padding: 0.5rem; border: 1px solid #d1d5db; text-align: center; font-size: 14px;">1.5</td>
      </tr>
      <tr style="background-color: #f9fafb;">
        <td style="padding: 0.5rem; border: 1px solid #d1d5db; text-align: center; font-weight: 600; font-size: 14px;">4</td>
        <td style="padding: 0.5rem; border: 1px solid #d1d5db; text-align: center; font-size: 14px;">Existing headache medicine</td>
        <td style="padding: 0.5rem; border: 1px solid #d1d5db; text-align: center; font-size: 14px;">2.8</td>
      </tr>
      <tr style="background-color: white;">
        <td style="padding: 0.5rem; border: 1px solid #d1d5db; text-align: center; font-weight: 600; font-size: 14px;">5</td>
        <td style="padding: 0.5rem; border: 1px solid #d1d5db; text-align: center; font-size: 14px;">No treatment</td>
        <td style="padding: 0.5rem; border: 1px solid #d1d5db; text-align: center; font-size: 14px;">7.5</td>
      </tr>
    </tbody>
  </table>


<p style="margin-top: 2.5rem; font-weight: 600; font-size: 17px; color: #1f2937;">Which group served as the control group in this experiment?</p>`,
      choices: [
        { letter: "A", text: "Group 1" },
        { letter: "B", text: "Group 3" },
        { letter: "C", text: "Group 4" },
        { letter: "D", text: "Group 5" }
      ],
      correct_answer: "D",
      solution_steps: [],
      answer_explanation: `**Step 1: Define control group**
A control group:
- Does NOT receive the experimental treatment being tested
- Provides a baseline for comparison
- Shows what happens naturally without intervention
- Helps determine if the treatment actually had an effect

**Step 2: Identify what is being tested**
The experiment is testing a NEW DRUG for headaches.
We want to know: Does the new drug reduce pain?

**Step 3: Examine each group**
Group 1: 50 mg new drug → Receives the treatment being tested ✗
Group 2: 100 mg new drug → Receives the treatment being tested ✗
Group 3: 200 mg new drug → Receives the treatment being tested ✗
Group 4: Existing headache medicine → Receives a different treatment (comparison group, but not control) ✗
Group 5: No treatment → Receives NO treatment at all ✓

**Step 4: Determine which is the control**
Group 5 (No treatment) is the control group because:
- These patients did NOT receive the new drug being tested
- They show what happens to headache pain naturally (without any intervention)
- Pain level = 7.5 without treatment

By comparing Groups 1-3 to Group 5, we can see that the new drug actually reduced pain (from 7.5 down to 3.2, 2.1, and 1.5).

**Note about Group 4:**
Group 4 is a comparison group (not a control). It helps show how the new drug compares to existing medicine, but it's not the control because it still receives treatment.

**The answer is D.**

Group 5 is the control because it received no treatment, providing a baseline to determine if the new drug actually works.`,
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

  console.log('\n✓ Science 4.2 Experimental Setup complete!');
}

uploadAll();
