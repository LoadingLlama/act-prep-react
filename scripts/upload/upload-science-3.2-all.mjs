import { createClient } from '@supabase/supabase-js';
import fs from 'fs';

const supabase = createClient(
  'https://rabavobdklnwvwsldbix.supabase.co',
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InJhYmF2b2Jka2xud3Z3c2xkYml4Iiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc1OTc2NTQ3OCwiZXhwIjoyMDc1MzQxNDc4fQ.81SeH703keXgF3IevQlRS7OYmn1J2GUVIkn3OJiviM4'
);

async function uploadAll() {
  // Upload lesson content
  const lessonContent = fs.readFileSync('science-3.2-cannot-be-determined.html', 'utf8');
  const { error: lessonError } = await supabase
    .from('lessons')
    .update({
      content: lessonContent,
      content_json: null,
      migrated_to_json: false
    })
    .eq('lesson_key', 'cannot-be-determined');

  if (lessonError) {
    console.error('Lesson upload error:', lessonError);
    process.exit(1);
  }
  console.log('✓ Science 3.2 Cannot Be Determined lesson uploaded');

  // Get lesson ID
  const { data: lesson } = await supabase
    .from('lessons')
    .select('id')
    .eq('lesson_key', 'cannot-be-determined')
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
      title: "Identifying Missing Data in Figures",
      problem_text: `<p style="margin-bottom: 1.5rem; font-size: 16px; line-height: 1.6;">A study tracked the total weight gain of 5 rats fed different amounts of food over 4 weeks.</p>

  <p style="font-weight: 700; font-size: 18px; margin-bottom: 1.2rem; color: #1f2937;">Figure 1</p>
  <p style="margin-bottom: 1rem; font-size: 15px;"><strong>Graph Description:</strong> Total weight gain (grams) versus time for 5 rats combined.</p>
  <table style="width: auto; border-collapse: collapse; margin-top: 1.2rem; font-size: 14px;">
    <thead>
      <tr style="background-color: #374151;">
        <th style="padding: 0.6rem; border: 1px solid #1f2937; text-align: center; color: white; font-weight: 600;">Week</th>
        <th style="padding: 0.6rem; border: 1px solid #1f2937; text-align: center; color: white; font-weight: 600;">Total Weight Gain (g)</th>
      </tr>
    </thead>
    <tbody>
      <tr style="background-color: white;">
        <td style="padding: 0.5rem; border: 1px solid #d1d5db; text-align: center; font-weight: 600; font-size: 14px;">1</td>
        <td style="padding: 0.5rem; border: 1px solid #d1d5db; text-align: center; font-size: 14px;">50</td>
      </tr>
      <tr style="background-color: #f9fafb;">
        <td style="padding: 0.5rem; border: 1px solid #d1d5db; text-align: center; font-weight: 600; font-size: 14px;">2</td>
        <td style="padding: 0.5rem; border: 1px solid #d1d5db; text-align: center; font-size: 14px;">110</td>
      </tr>
      <tr style="background-color: white;">
        <td style="padding: 0.5rem; border: 1px solid #d1d5db; text-align: center; font-weight: 600; font-size: 14px;">3</td>
        <td style="padding: 0.5rem; border: 1px solid #d1d5db; text-align: center; font-size: 14px;">175</td>
      </tr>
      <tr style="background-color: #f9fafb;">
        <td style="padding: 0.5rem; border: 1px solid #d1d5db; text-align: center; font-weight: 600; font-size: 14px;">4</td>
        <td style="padding: 0.5rem; border: 1px solid #d1d5db; text-align: center; font-size: 14px;">245</td>
      </tr>
    </tbody>
  </table>


<p style="margin-top: 2.5rem; font-weight: 600; font-size: 17px; color: #1f2937;">Based on Figure 1, how many grams of food per week were the rats fed?</p>`,
      choices: [
        { letter: "A", text: "50 grams per week" },
        { letter: "B", text: "60 grams per week" },
        { letter: "C", text: "70 grams per week" },
        { letter: "D", text: "Cannot be determined from the given information" }
      ],
      correct_answer: "D",
      solution_steps: [],
      answer_explanation: `**Step 1: Identify what the question asks for**
The question asks: "how many grams of food per week were the rats fed?"
- Variable needed: Food amount (grams)
- Units needed: Grams per week
- Time: Per week

**Step 2: Check what Figure 1 shows**
Looking at Figure 1:
- Y-axis shows: Total Weight Gain (g)
- X-axis shows: Week
- The figure shows WEIGHT GAIN, not FOOD CONSUMPTION

**Step 3: Search for food consumption data**
Check the figure: No information about food given to rats
Check the experimental text: Only mentions "different amounts of food" but doesn't specify the amounts
Check the table: Only shows weight gain data

**Step 4: Identify the mismatch**
Question asks for: grams of food per week
Figure provides: total weight gain in grams

These are completely different variables. Weight gain ≠ food consumption.

**Step 5: Conclusion**
Since the figure doesn't show food consumption data (only weight gain), and the experimental text doesn't provide specific food amounts, the answer cannot be determined from the given information.

**The answer is D.**`,
      diagram_svg: null,
      is_worked_example: false
    },
    {
      lesson_id: lesson.id,
      position: 2,
      title: "Aggregated vs Individual Data",
      problem_text: `<p style="margin-bottom: 1.5rem; font-size: 16px; line-height: 1.6;">A study tracked the total food remaining in a shared bowl for 5 dogs over 3 hours.</p>

  <p style="font-weight: 700; font-size: 18px; margin-bottom: 1.2rem; color: #1f2937;">Figure 1</p>
  <p style="margin-bottom: 1rem; font-size: 15px;"><strong>Graph Description:</strong> Total food remaining (grams) versus time for 5 dogs sharing one bowl.</p>
  <table style="width: auto; border-collapse: collapse; margin-top: 1.2rem; font-size: 14px;">
    <thead>
      <tr style="background-color: #374151;">
        <th style="padding: 0.6rem; border: 1px solid #1f2937; text-align: center; color: white; font-weight: 600;">Time (hours)</th>
        <th style="padding: 0.6rem; border: 1px solid #1f2937; text-align: center; color: white; font-weight: 600;">Total Food Remaining (g)</th>
      </tr>
    </thead>
    <tbody>
      <tr style="background-color: white;">
        <td style="padding: 0.5rem; border: 1px solid #d1d5db; text-align: center; font-weight: 600; font-size: 14px;">0</td>
        <td style="padding: 0.5rem; border: 1px solid #d1d5db; text-align: center; font-size: 14px;">1000</td>
      </tr>
      <tr style="background-color: #f9fafb;">
        <td style="padding: 0.5rem; border: 1px solid #d1d5db; text-align: center; font-weight: 600; font-size: 14px;">1</td>
        <td style="padding: 0.5rem; border: 1px solid #d1d5db; text-align: center; font-size: 14px;">750</td>
      </tr>
      <tr style="background-color: white;">
        <td style="padding: 0.5rem; border: 1px solid #d1d5db; text-align: center; font-weight: 600; font-size: 14px;">2</td>
        <td style="padding: 0.5rem; border: 1px solid #d1d5db; text-align: center; font-size: 14px;">500</td>
      </tr>
      <tr style="background-color: #f9fafb;">
        <td style="padding: 0.5rem; border: 1px solid #d1d5db; text-align: center; font-weight: 600; font-size: 14px;">3</td>
        <td style="padding: 0.5rem; border: 1px solid #d1d5db; text-align: center; font-size: 14px;">250</td>
      </tr>
    </tbody>
  </table>


<p style="margin-top: 2.5rem; font-weight: 600; font-size: 17px; color: #1f2937;">Based on Figure 1, how much food did one of the dogs consume after 3 hours?</p>`,
      choices: [
        { letter: "A", text: "150 grams" },
        { letter: "B", text: "250 grams" },
        { letter: "C", text: "750 grams" },
        { letter: "D", text: "Cannot be determined from the given information" }
      ],
      correct_answer: "D",
      solution_steps: [],
      answer_explanation: `**Step 1: Identify what the question asks for**
The question asks: "how much food did ONE of the dogs consume after 3 hours?"
- Subject: ONE individual dog (not all 5 dogs)
- Variable: Food consumed
- Time: After 3 hours

**Step 2: Check what Figure 1 shows**
Looking at Figure 1:
- Shows: Total food remaining for ALL 5 dogs combined
- From 0 to 3 hours: Total consumption = 1000g - 250g = 750g
- This is the TOTAL for ALL 5 dogs, not for one individual dog

**Step 3: Identify the aggregated data trap**
Question asks for: Individual dog consumption
Figure provides: Group total consumption (5 dogs combined)

To find individual consumption, we would need to divide: 750g ÷ 5 = 150g

BUT this assumes all dogs ate equally, which is NOT stated anywhere.

**Step 4: Check for individual dog data**
Check the figure: No breakdown by individual dog
Check the table: Only shows total for all 5 dogs
Check the experimental text: No information about individual consumption patterns

**Step 5: Conclusion**
The figure shows aggregated group data (total for 5 dogs), but the question asks for individual data (one dog). Without knowing how much each specific dog ate, we cannot determine the individual consumption.

Some dogs might have eaten more, some less. We have no way to break down the total into individual amounts.

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

  console.log('\n✓ Science 3.2 Cannot Be Determined complete!');
}

uploadAll();
