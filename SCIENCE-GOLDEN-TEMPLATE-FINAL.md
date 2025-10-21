# Science Lesson Golden Template - FINAL VERSION

## Layout
- **Two-column layout**: Table/content on LEFT (60%), Question + Answer choices on RIGHT (35%)
- **Subtle separator**: 1px gray line between columns
- **Sticky positioning**: Right side stays visible when scrolling

## Example Format (Compact, Left-Aligned Tables)

```javascript
problem_text: `<p style="margin-bottom: 1.5rem; font-size: 16px; line-height: 1.6;">Intro paragraph</p>

  <p style="font-weight: 700; font-size: 18px; margin-bottom: 1.2rem; color: #1f2937;">Figure 1</p>
  <p style="margin-bottom: 1rem; font-size: 15px;"><strong>Graph Description:</strong> Description of the figure/table.</p>
  <table style="width: auto; border-collapse: collapse; margin-top: 1.2rem; font-size: 14px;">
    <thead>
      <tr style="background-color: #374151;">
        <th style="padding: 0.6rem; border: 1px solid #1f2937; text-align: center; color: white; font-weight: 600;">Header</th>
      </tr>
    </thead>
    <tbody>
      <tr style="background-color: white;">
        <td style="padding: 0.5rem; border: 1px solid #d1d5db; text-align: center; font-size: 14px;">Data</td>
      </tr>
      <tr style="background-color: #f9fafb;">
        <td style="padding: 0.5rem; border: 1px solid #d1d5db; text-align: center; font-size: 14px;">Data</td>
      </tr>
    </tbody>
  </table>


<p style="margin-top: 2.5rem; font-weight: 600; font-size: 17px; color: #1f2937;">Question text?</p>`
```

**IMPORTANT**: The question (last `<p>` tag) will be automatically extracted and displayed on the right side with answer choices.

## Key Spacing Values (COMPACT)

- Intro paragraph: `margin-bottom: 1.5rem` (was 2.5rem)
- Figure title: `margin-bottom: 1.2rem` (was 2rem)
- Description: `margin-bottom: 1rem` (was 1.5rem)
- Table: `margin-top: 1.2rem` (was 2rem)
- Question: `margin-top: 2.5rem` (was 3.5rem)
- Table width: `width: auto` (left-aligned, compact)
- Modal width: `maxWidth: 1200px, width: 90%` (was 1600px/95%)

## Lesson Format

```html
<!-- Science Lesson X.X: Title -->
<!-- ACT Science - Unit X: Unit Name -->
<!-- Lesson Key: lesson-key -->

<p style="font-size: 16px; line-height: 1.7; margin: 0.5rem 0 1rem 0;">
Opening paragraph (exactly 2 sentences).
</p>

<h3 style="margin-top: 5rem; margin-bottom: 0.75rem; font-weight: 700;">
1. Section Title
</h3>

<ul style="margin: 0.5rem 0 1rem 0; padding-left: 1.5rem; line-height: 1.7;">
  <li style="margin: 0.3rem 0;">Point with <strong style="color: #2563eb; font-weight: 600; text-decoration: underline;">key term</strong>
    <ul style="margin: 0.3rem 0; padding-left: 1.5rem;">
      <li style="margin: 0.2rem 0;">Sub-point</li>
    </ul>
  </li>
</ul>

<h3 style="color: #2e7d32; font-size: 1.4rem; font-weight: 700; margin: 3rem 0 1.5rem 0;">
Key Takeaways
</h3>

<ul style="list-style: none; padding: 0; margin: 0;">
  <li style="margin-bottom: 0.8rem; color: #2e7d32; font-size: 16px; line-height: 1.6;">
    <span style="color: #4caf50; font-weight: bold; margin-right: 0.5rem;">✓</span>Takeaway
  </li>
</ul>
```

## Critical Rules

✅ **DO:**
- Use black headers (NOT blue)
- Add blue underlined key terms
- Use green checkmarks for Key Takeaways
- Use `width: auto` for tables (left-aligned, compact)
- Use compact spacing (1-1.5rem margins)
- Remove white container div wrappers

❌ **DO NOT:**
- Use blue colored headers
- Forget blue underlined terms
- Use gradient boxes for takeaways
- Use `width: 100%` for tables
- Add excessive padding/margins
- Wrap tables in white background divs
