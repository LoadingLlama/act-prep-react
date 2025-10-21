# SCIENCE EXAMPLE FORMAT REQUIREMENTS

## CRITICAL: All examples must use proper HTML formatting with tables

### BAD (Plain Text):
```
Figure 1: Line graph showing...
- At t=0: height = 80 feet
- At t=1: height = 0 feet
```

### GOOD (HTML with Tables):
```html
<div style="background-color: #f9fafb; padding: 1.5rem; border: 1px solid #e5e7eb; border-radius: 4px; margin: 1rem 0;">
  <p style="font-weight: 600; margin-bottom: 1rem;">Figure 1</p>
  <table style="width: 100%; border-collapse: collapse;">
    <thead>
      <tr style="background-color: #e5e7eb;">
        <th style="padding: 0.5rem; border: 1px solid #d1d5db;">Time (s)</th>
        <th style="padding: 0.5rem; border: 1px solid #d1d5db;">Height (feet)</th>
      </tr>
    </thead>
    <tbody>
      <tr>
        <td style="padding: 0.5rem; border: 1px solid #d1d5db;">0</td>
        <td style="padding: 0.5rem; border: 1px solid #d1d5db;">80</td>
      </tr>
      ...
    </tbody>
  </table>
</div>
```

## Example Structure Template

```javascript
{
  problem_text: `<p style="margin-bottom: 1rem;">[Introduction/context]</p>

<div style="background-color: #f9fafb; padding: 1.5rem; border: 1px solid #e5e7eb; border-radius: 4px; margin: 1rem 0;">
  <p style="font-weight: 600; margin-bottom: 1rem;">Figure [N]</p>
  <p style="margin-bottom: 0.5rem;"><strong>Graph Description:</strong> [Type of graph and what it shows]</p>

  <table style="width: 100%; border-collapse: collapse; margin-top: 1rem;">
    <thead>
      <tr style="background-color: #e5e7eb;">
        <th style="padding: 0.5rem; border: 1px solid #d1d5db; text-align: left;">[Column 1]</th>
        <th style="padding: 0.5rem; border: 1px solid #d1d5db; text-align: center;">[Column 2]</th>
      </tr>
    </thead>
    <tbody>
      <tr>
        <td style="padding: 0.5rem; border: 1px solid #d1d5db;">[Data]</td>
        <td style="padding: 0.5rem; border: 1px solid #d1d5db; text-align: center;">[Data]</td>
      </tr>
      <tr style="background-color: #f9fafb;">
        <td style="padding: 0.5rem; border: 1px solid #d1d5db;">[Data]</td>
        <td style="padding: 0.5rem; border: 1px solid #d1d5db; text-align: center;">[Data]</td>
      </tr>
    </tbody>
  </table>

  <p style="margin-top: 0.5rem; font-size: 0.875rem; color: #6b7280;">[Additional context or notes]</p>
</div>

<p style="margin-top: 1.5rem; font-weight: 500;">[Question text]</p>`,

  choices: [
    { letter: "A", text: "[option]" },
    { letter: "B", text: "[option]" },
    { letter: "C", text: "[option]" },
    { letter: "D", text: "[option]" }
  ],

  correct_answer: "A",
  solution_steps: [],

  answer_explanation: `[Step-by-step explanation with markdown formatting]

**Step 1: [Title]**
[Explanation]

**Step 2: [Title]**
[Explanation]

**The answer is A.**`
}
```

## Table Styling Guidelines

1. **Outer container:** Light gray background (#f9fafb), border, padding, rounded corners
2. **Figure title:** Bold, margin-bottom
3. **Table:** Full width, collapsed borders
4. **Header row:** Gray background (#e5e7eb), borders
5. **Body rows:** Alternate row colors (white and #f9fafb)
6. **Cells:** Padding 0.5rem, borders
7. **Text alignment:** Left for labels, center for numerical data

## Complete Example

```javascript
{
  lesson_id: "[UUID]",
  position: 1,
  title: "Reading Data from a Line Graph",
  problem_text: `<p style="margin-bottom: 1rem;">The chart below shows the position of a bouncing ball over time after it is released at t=0 seconds.</p>

<div style="background-color: #f9fafb; padding: 1.5rem; border: 1px solid #e5e7eb; border-radius: 4px; margin: 1rem 0;">
  <p style="font-weight: 600; margin-bottom: 1rem;">Figure 1</p>
  <p style="margin-bottom: 0.5rem;"><strong>Graph Description:</strong> Line graph showing Height (feet) vs. Time (seconds)</p>
  <table style="width: 100%; border-collapse: collapse; margin-top: 1rem;">
    <thead>
      <tr style="background-color: #e5e7eb;">
        <th style="padding: 0.5rem; border: 1px solid #d1d5db; text-align: left;">Time (s)</th>
        <th style="padding: 0.5rem; border: 1px solid #d1d5db; text-align: left;">Height (feet)</th>
      </tr>
    </thead>
    <tbody>
      <tr>
        <td style="padding: 0.5rem; border: 1px solid #d1d5db;">0</td>
        <td style="padding: 0.5rem; border: 1px solid #d1d5db;">80</td>
      </tr>
      <tr style="background-color: #f9fafb;">
        <td style="padding: 0.5rem; border: 1px solid #d1d5db;">3</td>
        <td style="padding: 0.5rem; border: 1px solid #d1d5db;">0</td>
      </tr>
    </tbody>
  </table>
</div>

<p style="margin-top: 1.5rem; font-weight: 500;">Based on Figure 1, at 3 seconds, how high is the bouncy ball?</p>`,
  choices: [
    { letter: "A", text: "0 feet" },
    { letter: "B", text: "35 feet" },
    { letter: "C", text: "50 feet" },
    { letter: "D", text: "80 feet" }
  ],
  correct_answer: "A",
  solution_steps: [],
  answer_explanation: `This tests reading values from a graph.

**Step 1: Locate Figure 1**
Go to the referenced figure.

**Step 2: Find t=3 seconds**
At t=3, height = 0 feet.

**The answer is A.**`
}
```

## Key Requirements

✓ Use HTML tables for ALL data presentation
✓ Use styled divs to contain figures
✓ Include graph/table descriptions
✓ Use proper styling (borders, padding, colors)
✓ Alternate row colors for readability
✓ Include notes/context below tables when helpful
✓ Bold the question at the end

✗ NO plain text bullet lists for data
✗ NO markdown tables
✗ NO unstyled content
