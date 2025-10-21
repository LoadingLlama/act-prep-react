# GOLDEN TEMPLATE FOR ACT SCIENCE LESSONS v3.0 - WITH EXAMPLES

## CRITICAL REQUIREMENTS

1. **HTML Content**: 2 sentences opening, bullet points, 4 H3 sections, 4 key takeaways
2. **Examples**: MUST be created separately and uploaded to `lesson_examples` table
3. **Example Placement**: Add HTML comments showing where examples appear
4. **Real ACT Style**: Examples must be authentic ACT Science questions with figures/data

---

## EXAMPLE DATABASE STRUCTURE

```javascript
{
  lesson_id: "[UUID from lessons table]",
  position: 1,  // Order in which example appears in lesson
  title: "Finding Data Points in Line Graphs",  // Descriptive title
  problem_text: "The chart below shows the height of a bouncing ball over time...\n\n[FIGURE/TABLE DESCRIPTION HERE]",
  choices: [
    { letter: "A", text: "0 feet" },
    { letter: "B", text: "35 feet" },
    { letter: "C", text: "50 feet" },
    { letter: "D", text: "80 feet" }
  ],
  correct_answer: "A",
  answer_explanation: "Detailed step-by-step explanation...",
  diagram_svg: null,  // Can be used for figures if needed
  is_worked_example: false
}
```

---

## EXAMPLE CREATION TEMPLATE FOR SCIENCE

For each Science lesson, create 2-4 examples that:
1. Use REAL data from ACT-style passages
2. Include figures/tables/graphs described in text
3. Show step-by-step problem solving
4. Match the question type being taught

### Example Upload Script Template

```javascript
import { createClient } from '@supabase/supabase-js';

const supabase = createClient(
  'https://rabavobdklnwvwsldbix.supabase.co',
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InJhYmF2b2Jka2xud3Z3c2xkYml4Iiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc1OTc2NTQ3OCwiZXhwIjoyMDc1MzQxNDc4fQ.81SeH703keXgF3IevQlRS7OYmn1J2GUVIkn3OJiviM4'
);

async function uploadExamples() {
  // First get the lesson ID
  const { data: lesson } = await supabase
    .from('lessons')
    .select('id')
    .eq('lesson_key', 'specific-data-point')
    .single();

  const examples = [
    {
      lesson_id: lesson.id,
      position: 1,
      title: "Reading Data from a Line Graph",
      problem_text: `The chart below shows the position of a bouncing ball over time after it is released at t=0 seconds.

[FIGURE 1: Line graph showing Height (feet) on y-axis (0-90) vs. Time (seconds) on x-axis (0-8). The ball starts at 80 feet at t=0, drops to 0 at t=1 second, bounces to ~50 feet at t=2, drops to 0 at t=3, bounces to ~35 feet at t=4, drops to 0 at t=5, and continues bouncing with decreasing height.]

Based on Figure 1, at 3 seconds, how high is the bouncy ball?`,
      choices: [
        { letter: "A", text: "0 feet" },
        { letter: "B", text: "35 feet" },
        { letter: "C", text: "50 feet" },
        { letter: "D", text: "80 feet" }
      ],
      correct_answer: "A",
      answer_explanation: `This is a straightforward specific data point question.

**Step 1: Locate Figure 1**
The question explicitly says "Based on Figure 1," so we go directly to that figure.

**Step 2: Identify what we're looking for**
We need the height at exactly 3 seconds.

**Step 3: Find the axes**
- x-axis = Time (seconds)
- y-axis = Height (feet)

**Step 4: Find the data point**
Locate 3 seconds on the x-axis and trace up to where the curve is at that exact moment. At t=3 seconds, the ball is at ground level (0 feet) — this is when it hits the ground for the second time after bouncing.

**Step 5: Match to answers**
The height is 0 feet, which matches answer choice A.

**The answer is A.**`,
      diagram_svg: null,
      is_worked_example: false
    },
    {
      lesson_id: lesson.id,
      position: 2,
      title: "Comparing Data Values",
      problem_text: `The chart below shows the position of a bouncing ball over time after it is released at t=0 seconds.

[FIGURE 1: Same line graph as Example 1]

Based on Figure 1, at 4 seconds, how much lower in feet is the ball from its starting position?`,
      choices: [
        { letter: "A", text: "0 feet" },
        { letter: "B", text: "10 feet" },
        { letter: "C", text: "70 feet" },
        { letter: "D", text: "80 feet" }
      ],
      correct_answer: "B",
      answer_explanation: `This question requires finding TWO values and calculating the difference.

**Step 1: Find the starting position**
At t=0 seconds, the ball is at 80 feet (read from the y-axis where the curve starts).

**Step 2: Find the position at 4 seconds**
At t=4 seconds, look at the curve. The ball appears to be at approximately 70 feet (near the peak of the third bounce, but we need to read the exact position at t=4, not at the peak).

Actually, looking more carefully at exactly t=4 seconds (not the peak), the ball is at about 70 feet.

**Step 3: Calculate the difference**
Starting position: 80 feet
Position at 4 seconds: 70 feet
Difference: 80 - 70 = 10 feet

The ball is 10 feet lower than its starting position.

**Step 4: Match to answers**
10 feet matches answer choice B.

**Important note:** This question asks "how much LOWER," which means we need to find the DIFFERENCE, not just read a single value. Always read questions carefully!

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
      console.error('Error inserting example:', error);
    } else {
      console.log(`✓ Inserted: ${example.title}`);
    }
  }

  console.log('\n✓ All examples uploaded!');
}

uploadExamples();
```

---

## HTML LESSON WITH EXAMPLE MARKERS

```html
<!--
LESSON TEMPLATE v4.0
Subject: Science
Topic Number: 2.1
Topic: Specific Data Point Questions
Lesson Key: specific-data-point
-->

<p style="font-size: 16px; line-height: 1.7; margin: 0.5rem 0 1rem 0;">
[EXACTLY 2 sentences]
</p>

<h3 style="margin-top: 5rem; margin-bottom: 0.75rem; font-weight: 700;">
1. [First Section]
</h3>

[Content with bullet points...]

<!-- Example 1 will be inserted here by ExampleCard component -->
<!-- Database: position=1, lesson_id=[UUID], title="Reading Data from a Line Graph" -->

<h3 style="margin-top: 5rem; margin-bottom: 0.75rem; font-weight: 700;">
2. [Second Section]
</h3>

[Content...]

<!-- Example 2 will be inserted here by ExampleCard component -->
<!-- Database: position=2, lesson_id=[UUID], title="Comparing Data Values" -->

[Rest of lesson...]

<h3 style="visibility: hidden; margin: 0; padding: 0; line-height: 0; height: 0;">
Hidden Separator
</h3>

<h3 style="color: #2e7d32; font-size: 1.4rem; font-weight: 700; margin: 3rem 0 1.5rem 0;">
Key Takeaways
</h3>

[4 green bullet points...]
```

---

## EXAMPLE TYPES BY LESSON

**2.1 Specific Data Point:**
- Reading single values from graphs
- Reading values from tables
- Comparing two values
- Finding data with multiple conditions

**2.2 Trends:**
- Identifying increasing/decreasing patterns
- Comparing trends across different categories
- Predicting trend continuation

**2.3 Approximation:**
- Bracketing (estimating between data points)
- Extending (extrapolating beyond shown data)

**2.4 Multiple Figures:**
- Using 2+ figures to answer one question
- Cross-referencing data between figures

**2.5 Figures + Text:**
- Finding definitions in text to interpret figures
- Using experimental descriptions with data

---

## CRITICAL REMINDERS

1. **Examples are SEPARATE**: Don't embed in HTML, upload to database
2. **2-4 examples per lesson**: Position them strategically after teaching concepts
3. **Real ACT style**: Use actual figures/tables from practice problems
4. **Step-by-step explanations**: Show how to find the answer systematically
5. **Include figure descriptions**: Since we can't embed images, describe the figure in problem_text

