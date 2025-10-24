import { createClient } from '@supabase/supabase-js';
import fs from 'fs';

const supabase = createClient(
  'https://rabavobdklnwvwsldbix.supabase.co',
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InJhYmF2b2Jka2xud3Z3c2xkYml4Iiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc1OTc2NTQ3OCwiZXhwIjoyMDc1MzQxNDc4fQ.81SeH703keXgF3IevQlRS7OYmn1J2GUVIkn3OJiviM4'
);

async function uploadAll() {
  // Upload lesson content
  const lessonContent = fs.readFileSync('science-4.3-other-outside-knowledge.html', 'utf8');
  const { error: lessonError } = await supabase
    .from('lessons')
    .update({
      content: lessonContent,
      content_json: null,
      migrated_to_json: false
    })
    .eq('lesson_key', 'outside-knowledge');

  if (lessonError) {
    console.error('Lesson upload error:', lessonError);
    process.exit(1);
  }
  console.log('✓ Science 4.3 Other Outside Knowledge lesson uploaded');

  // Get lesson ID
  const { data: lesson } = await supabase
    .from('lessons')
    .select('id')
    .eq('lesson_key', 'outside-knowledge')
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
      title: "Using pH Knowledge to Classify Substances",
      problem_text: `<p style="margin-bottom: 1.5rem; font-size: 16px; line-height: 1.6;">A chemistry student measured the pH of five common household substances using pH paper.</p>

  <p style="font-weight: 700; font-size: 18px; margin-bottom: 1.2rem; color: #1f2937;">Table 1</p>
  <p style="margin-bottom: 1rem; font-size: 15px;"><strong>Description:</strong> Measured pH values for household substances.</p>
  <table style="width: auto; border-collapse: collapse; margin-top: 1.2rem; font-size: 14px;">
    <thead>
      <tr style="background-color: #374151;">
        <th style="padding: 0.6rem; border: 1px solid #1f2937; text-align: center; color: white; font-weight: 600;">Substance</th>
        <th style="padding: 0.6rem; border: 1px solid #1f2937; text-align: center; color: white; font-weight: 600;">pH</th>
      </tr>
    </thead>
    <tbody>
      <tr style="background-color: white;">
        <td style="padding: 0.5rem; border: 1px solid #d1d5db; text-align: center; font-weight: 600; font-size: 14px;">Lemon juice</td>
        <td style="padding: 0.5rem; border: 1px solid #d1d5db; text-align: center; font-size: 14px;">2.3</td>
      </tr>
      <tr style="background-color: #f9fafb;">
        <td style="padding: 0.5rem; border: 1px solid #d1d5db; text-align: center; font-weight: 600; font-size: 14px;">Pure water</td>
        <td style="padding: 0.5rem; border: 1px solid #d1d5db; text-align: center; font-size: 14px;">7.0</td>
      </tr>
      <tr style="background-color: white;">
        <td style="padding: 0.5rem; border: 1px solid #d1d5db; text-align: center; font-weight: 600; font-size: 14px;">Baking soda solution</td>
        <td style="padding: 0.5rem; border: 1px solid #d1d5db; text-align: center; font-size: 14px;">8.5</td>
      </tr>
      <tr style="background-color: #f9fafb;">
        <td style="padding: 0.5rem; border: 1px solid #d1d5db; text-align: center; font-weight: 600; font-size: 14px;">Vinegar</td>
        <td style="padding: 0.5rem; border: 1px solid #d1d5db; text-align: center; font-size: 14px;">3.1</td>
      </tr>
      <tr style="background-color: white;">
        <td style="padding: 0.5rem; border: 1px solid #d1d5db; text-align: center; font-weight: 600; font-size: 14px;">Bleach</td>
        <td style="padding: 0.5rem; border: 1px solid #d1d5db; text-align: center; font-size: 14px;">12.5</td>
      </tr>
    </tbody>
  </table>


<p style="margin-top: 2.5rem; font-weight: 600; font-size: 17px; color: #1f2937;">Based on Table 1, which substances are classified as bases?</p>`,
      choices: [
        { letter: "A", text: "Lemon juice and vinegar only" },
        { letter: "B", text: "Pure water only" },
        { letter: "C", text: "Baking soda solution and bleach only" },
        { letter: "D", text: "All five substances" }
      ],
      correct_answer: "C",
      solution_steps: [],
      answer_explanation: `**Step 1: Recall pH scale basics**
The pH scale measures acidity and basicity:
- pH < 7 → Acidic
- pH = 7 → Neutral
- pH > 7 → Basic (also called alkaline)

**Step 2: Classify each substance**
Lemon juice: pH = 2.3 → Less than 7 → Acidic
Pure water: pH = 7.0 → Equal to 7 → Neutral
Baking soda solution: pH = 8.5 → Greater than 7 → Basic ✓
Vinegar: pH = 3.1 → Less than 7 → Acidic
Bleach: pH = 12.5 → Greater than 7 → Basic ✓

**Step 3: Identify which are bases**
Only substances with pH > 7 are bases:
- Baking soda solution (pH 8.5)
- Bleach (pH 12.5)

**Step 4: Evaluate answer choices**
A. Lemon juice and vinegar → Both are acidic (pH < 7), not basic ✗
B. Pure water → pH = 7 is neutral, not basic ✗
C. Baking soda and bleach → Both have pH > 7, so both are basic ✓
D. All five → No, lemon juice, water, and vinegar are not basic ✗

**The answer is C.**

Bases are substances with pH greater than 7. Only baking soda solution (8.5) and bleach (12.5) meet this criterion.`,
      diagram_svg: null,
      is_worked_example: false
    },
    {
      lesson_id: lesson.id,
      position: 2,
      title: "Applying Photosynthesis Knowledge",
      problem_text: `<p style="margin-bottom: 1.5rem; font-size: 16px; line-height: 1.6;">A scientist placed identical plants in four different environments and measured their growth after 2 weeks. All plants received the same amount of water.</p>

  <p style="font-weight: 700; font-size: 18px; margin-bottom: 1.2rem; color: #1f2937;">Table 1</p>
  <p style="margin-bottom: 1rem; font-size: 15px;"><strong>Description:</strong> Environmental conditions and plant growth.</p>
  <table style="width: auto; border-collapse: collapse; margin-top: 1.2rem; font-size: 14px;">
    <thead>
      <tr style="background-color: #374151;">
        <th style="padding: 0.6rem; border: 1px solid #1f2937; text-align: center; color: white; font-weight: 600;">Environment</th>
        <th style="padding: 0.6rem; border: 1px solid #1f2937; text-align: center; color: white; font-weight: 600;">Light Exposure</th>
        <th style="padding: 0.6rem; border: 1px solid #1f2937; text-align: center; color: white; font-weight: 600;">CO₂ Level</th>
        <th style="padding: 0.6rem; border: 1px solid #1f2937; text-align: center; color: white; font-weight: 600;">Growth (cm)</th>
      </tr>
    </thead>
    <tbody>
      <tr style="background-color: white;">
        <td style="padding: 0.5rem; border: 1px solid #d1d5db; text-align: center; font-weight: 600; font-size: 14px;">A</td>
        <td style="padding: 0.5rem; border: 1px solid #d1d5db; text-align: center; font-size: 14px;">High</td>
        <td style="padding: 0.5rem; border: 1px solid #d1d5db; text-align: center; font-size: 14px;">High</td>
        <td style="padding: 0.5rem; border: 1px solid #d1d5db; text-align: center; font-size: 14px;">18</td>
      </tr>
      <tr style="background-color: #f9fafb;">
        <td style="padding: 0.5rem; border: 1px solid #d1d5db; text-align: center; font-weight: 600; font-size: 14px;">B</td>
        <td style="padding: 0.5rem; border: 1px solid #d1d5db; text-align: center; font-size: 14px;">High</td>
        <td style="padding: 0.5rem; border: 1px solid #d1d5db; text-align: center; font-size: 14px;">Low</td>
        <td style="padding: 0.5rem; border: 1px solid #d1d5db; text-align: center; font-size: 14px;">12</td>
      </tr>
      <tr style="background-color: white;">
        <td style="padding: 0.5rem; border: 1px solid #d1d5db; text-align: center; font-weight: 600; font-size: 14px;">C</td>
        <td style="padding: 0.5rem; border: 1px solid #d1d5db; text-align: center; font-size: 14px;">Low</td>
        <td style="padding: 0.5rem; border: 1px solid #d1d5db; text-align: center; font-size: 14px;">High</td>
        <td style="padding: 0.5rem; border: 1px solid #d1d5db; text-align: center; font-size: 14px;">8</td>
      </tr>
      <tr style="background-color: #f9fafb;">
        <td style="padding: 0.5rem; border: 1px solid #d1d5db; text-align: center; font-weight: 600; font-size: 14px;">D</td>
        <td style="padding: 0.5rem; border: 1px solid #d1d5db; text-align: center; font-size: 14px;">None</td>
        <td style="padding: 0.5rem; border: 1px solid #d1d5db; text-align: center; font-size: 14px;">High</td>
        <td style="padding: 0.5rem; border: 1px solid #d1d5db; text-align: center; font-size: 14px;">1</td>
      </tr>
    </tbody>
  </table>


<p style="margin-top: 2.5rem; font-weight: 600; font-size: 17px; color: #1f2937;">Based on Table 1 and knowledge of photosynthesis, which statement best explains the results?</p>`,
      choices: [
        { letter: "A", text: "CO₂ level is the only factor affecting plant growth" },
        { letter: "B", text: "Light is essential for photosynthesis and plant growth" },
        { letter: "C", text: "Plants can grow equally well with or without light" },
        { letter: "D", text: "High CO₂ can compensate for lack of light" }
      ],
      correct_answer: "B",
      solution_steps: [],
      answer_explanation: `**Step 1: Recall photosynthesis basics**
Photosynthesis is the process plants use to make food:
- Requires: Light + CO₂ + H₂O
- Produces: Glucose (food) + O₂

Light is absolutely essential - without it, photosynthesis cannot occur.

**Step 2: Analyze the data for light's effect**
Compare environments with and without light:
- Environment A (High light, High CO₂): 18 cm growth
- Environment B (High light, Low CO₂): 12 cm growth
- Environment C (Low light, High CO₂): 8 cm growth
- Environment D (NO light, High CO₂): 1 cm growth

Pattern: As light decreases, growth decreases dramatically.

**Step 3: Focus on Environment D**
Environment D had:
- NO light
- High CO₂ (same as Environment A)
- Growth = only 1 cm (much less than Environment A's 18 cm)

Even though D had high CO₂, the lack of light resulted in almost no growth. This shows light cannot be replaced by CO₂.

**Step 4: Evaluate answer choices**
A. CO₂ is the only factor → False. Environment A and D both had high CO₂ but very different growth (18 vs 1 cm) ✗

B. Light is essential → True. Without light (Environment D), there was minimal growth even with high CO₂ ✓

C. Grow equally without light → False. Environment D (no light) had only 1 cm vs 18 cm in Environment A ✗

D. High CO₂ compensates for lack of light → False. Environment D had high CO₂ but no light, and grew only 1 cm ✗

**The answer is B.**

The data clearly shows that light is essential. Environment D with no light grew only 1 cm despite having high CO₂, while Environment A with high light grew 18 cm. This aligns with photosynthesis requiring light energy to function.`,
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

  console.log('\n✓ Science 4.3 Other Outside Knowledge complete!');
}

uploadAll();
