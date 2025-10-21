import { createClient } from '@supabase/supabase-js';
import fs from 'fs';

const supabase = createClient(
  'https://rabavobdklnwvwsldbix.supabase.co',
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InJhYmF2b2Jka2xud3Z3c2xkYml4Iiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc1OTc2NTQ3OCwiZXhwIjoyMDc1MzQxNDc4fQ.81SeH703keXgF3IevQlRS7OYmn1J2GUVIkn3OJiviM4'
);

async function uploadAll() {
  // Upload lesson content
  const lessonContent = fs.readFileSync('science-4.4-conflicting-viewpoints.html', 'utf8');
  const { error: lessonError } = await supabase
    .from('lessons')
    .update({
      content: lessonContent,
      content_json: null,
      migrated_to_json: false
    })
    .eq('lesson_key', 'conflicting-viewpoints');

  if (lessonError) {
    console.error('Lesson upload error:', lessonError);
    process.exit(1);
  }
  console.log('✓ Science 4.4 Conflicting Viewpoints lesson uploaded');

  // Get lesson ID
  const { data: lesson } = await supabase
    .from('lessons')
    .select('id')
    .eq('lesson_key', 'conflicting-viewpoints')
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
      title: "Comparing Two Viewpoints on Climate Change",
      problem_text: `<p style="margin-bottom: 1.5rem; font-size: 16px; line-height: 1.6;">Two scientists disagree about the primary cause of recent global temperature increases.</p>

  <p style="font-weight: 700; font-size: 16px; margin: 1.2rem 0 0.75rem 0; color: #1f2937;">Scientist 1</p>
  <p style="margin-bottom: 1rem; font-size: 15px; line-height: 1.6;">The primary cause of recent temperature increases is human activity, specifically the burning of fossil fuels. Carbon dioxide (CO₂) levels have increased by 40% since pre-industrial times, and CO₂ is a greenhouse gas that traps heat in the atmosphere. The timing of temperature increases matches perfectly with industrialization. Natural factors like solar activity and volcanic eruptions cannot account for the rapid warming we observe.</p>

  <p style="font-weight: 700; font-size: 16px; margin: 1.2rem 0 0.75rem 0; color: #1f2937;">Scientist 2</p>
  <p style="margin-bottom: 1rem; font-size: 15px; line-height: 1.6;">While CO₂ levels have increased, natural cycles are the primary driver of temperature changes. Earth has experienced many warming and cooling periods long before human industrialization. Solar radiation varies over time, and these variations can explain temperature fluctuations. The current warming trend is consistent with natural climate variability, not unprecedented.</p>


<p style="margin-top: 2.5rem; font-weight: 600; font-size: 17px; color: #1f2937;">On which of the following points do the scientists agree?</p>`,
      choices: [
        { letter: "A", text: "CO₂ levels have increased since pre-industrial times" },
        { letter: "B", text: "Human activity is the primary cause of warming" },
        { letter: "C", text: "Natural cycles cannot explain temperature changes" },
        { letter: "D", text: "The current warming is unprecedented" }
      ],
      correct_answer: "A",
      solution_steps: [],
      answer_explanation: `**Step 1: Identify what each scientist explicitly states**

Scientist 1 says:
- CO₂ levels increased by 40% ✓
- Human activity (fossil fuels) is the cause
- Natural factors cannot account for warming
- Timing matches industrialization

Scientist 2 says:
- CO₂ levels have increased ✓
- Natural cycles are the primary driver
- Solar radiation varies over time
- Current warming is NOT unprecedented

**Step 2: Find common ground**
Both scientists acknowledge that CO₂ levels have increased. This is a factual observation they both accept.

**Step 3: Evaluate each answer choice**

A. CO₂ levels have increased → Both scientists state this ✓
   - Scientist 1: "CO₂ levels have increased by 40%"
   - Scientist 2: "CO₂ levels have increased"

B. Human activity is primary cause → Only Scientist 1 believes this ✗
   - Scientist 1: Yes
   - Scientist 2: Disagrees (says natural cycles)

C. Natural cycles cannot explain changes → Only Scientist 1 believes this ✗
   - Scientist 1: "Natural factors cannot account for warming"
   - Scientist 2: Disagrees (says natural cycles ARE the cause)

D. Current warming is unprecedented → Only Scientist 1 implies this ✗
   - Scientist 1: Implies it's unusual ("rapid warming")
   - Scientist 2: "NOT unprecedented"

**The answer is A.**

Both scientists agree on the factual observation that CO₂ levels have increased since pre-industrial times. They disagree on whether this increase (or natural cycles) is the primary cause of warming.`,
      diagram_svg: null,
      is_worked_example: false
    },
    {
      lesson_id: lesson.id,
      position: 2,
      title: "Evaluating New Evidence Against Viewpoints",
      problem_text: `<p style="margin-bottom: 1.5rem; font-size: 16px; line-height: 1.6;">Two students disagree about why dinosaurs went extinct 66 million years ago.</p>

  <p style="font-weight: 700; font-size: 16px; margin: 1.2rem 0 0.75rem 0; color: #1f2937;">Student 1 (Asteroid Impact)</p>
  <p style="margin-bottom: 1rem; font-size: 15px; line-height: 1.6;">A massive asteroid struck Earth, creating a huge dust cloud that blocked sunlight for months. Without sunlight, plants died, causing herbivores to starve, followed by carnivores. The impact would have caused global fires and released toxic gases. Evidence includes a worldwide layer of iridium (rare on Earth but common in asteroids) dating to exactly 66 million years ago.</p>

  <p style="font-weight: 700; font-size: 16px; margin: 1.2rem 0 0.75rem 0; color: #1f2937;">Student 2 (Volcanic Activity)</p>
  <p style="margin-bottom: 1rem; font-size: 15px; line-height: 1.6;">Massive volcanic eruptions in India released enormous amounts of lava and toxic gases over thousands of years. These gases would have poisoned the atmosphere and caused acid rain. The gradual climate change from volcanic activity explains why some species survived while dinosaurs did not. Asteroid impacts occur frequently but don't always cause mass extinctions.</p>


<p style="margin-top: 2.5rem; font-weight: 600; font-size: 17px; color: #1f2937;">A scientist discovered a fossil site where dinosaur bones are found below the iridium layer, but no dinosaur bones are found above it. This finding most strongly supports:</p>`,
      choices: [
        { letter: "A", text: "Student 1's viewpoint only" },
        { letter: "B", text: "Student 2's viewpoint only" },
        { letter: "C", text: "Both students' viewpoints equally" },
        { letter: "D", text: "Neither viewpoint" }
      ],
      correct_answer: "A",
      solution_steps: [],
      answer_explanation: `**Step 1: Understand what the new evidence shows**
New finding: Dinosaur bones are found BELOW the iridium layer, but NOT above it.

This means:
- Dinosaurs existed before the iridium layer formed
- Dinosaurs disappeared after the iridium layer formed
- The iridium layer marks the extinction boundary

**Step 2: Test against Student 1's viewpoint (Asteroid)**
Student 1 claims:
- Asteroid impact deposited the iridium layer (66 million years ago)
- This impact caused dinosaur extinction

Prediction: If Student 1 is correct, we'd expect:
- Dinosaur bones BEFORE the iridium layer (when dinosaurs alive) ✓
- NO dinosaur bones AFTER the iridium layer (after extinction) ✓

The evidence MATCHES Student 1's prediction perfectly!

**Step 3: Test against Student 2's viewpoint (Volcanic)**
Student 2 claims:
- Volcanic activity occurred over thousands of years
- This gradual process caused extinction
- Asteroid impacts don't always cause mass extinctions

Prediction: If Student 2 is correct, we'd expect:
- Gradual disappearance of dinosaurs over time
- The iridium layer (if from an asteroid) wouldn't necessarily mark the extinction boundary

The evidence does NOT align as well with Student 2. The sharp boundary at the iridium layer suggests a sudden event, not a gradual volcanic process.

**Step 4: Evaluate answer choices**
A. Student 1 only → The iridium layer marking the exact extinction boundary strongly supports the asteroid impact theory ✓

B. Student 2 only → The evidence doesn't support a gradual volcanic extinction ✗

C. Both equally → No, the sharp boundary at the iridium layer favors Student 1's sudden impact over Student 2's gradual volcanism ✗

D. Neither → No, the evidence clearly supports Student 1 ✗

**The answer is A.**

The fossil evidence showing dinosaurs below but not above the iridium layer supports Student 1's asteroid impact theory. The iridium layer marks a sharp extinction boundary, which aligns with a sudden catastrophic event (asteroid) rather than gradual volcanic activity.`,
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

  console.log('\n✓ Science 4.4 Conflicting Viewpoints complete!');
}

uploadAll();
