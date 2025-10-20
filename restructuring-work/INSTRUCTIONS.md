# Lesson Restructuring Instructions

## Task
Transform ACT prep lessons to match the structure and style of GOLDEN_TEMPLATE.html (the Backsolving lesson).

## Golden Template Structure

1. **Opening Paragraph** (3-4 sentences)
   - Practical hook
   - 3-5 key terms: <strong style="color: #2563eb; font-weight: 600; text-decoration: underline;">term</strong>

2. **Section 1: "What Is [Topic]?"**
   - Definition paragraph
   - Bullet points with advantages
   - Nested bullets

3. **Section 2: "The [Topic] Process"**
   - H4 for each step
   - Short paragraph + bullets per step

4. **Section 3: Examples**
   - Red-bordered H4: <h4 style="margin: 0 0 1rem 0; padding-left: 0.75rem; border-left: 4px solid #b91c1c; color: #000000; font-weight: 700;">Example 1: Title</h4>
   - Problem + solution (bullets)

5. **Section 4: "When NOT to..."**
   - Limitations
   - Bullet points

6. **Key Takeaways**
   - Green header with checkmarks

## Key Changes Needed

- ✅ Shorten opening to 3-4 sentences
- ✅ Convert long paragraphs → bullet points
- ✅ Extract examples → red-bordered boxes
- ✅ Create step-by-step processes (H4)
- ✅ Add numbered sections (1., 2., 3.)
- ✅ Ensure "When to Use" / "When NOT to" section
- ✅ Format Key Takeaways with checkmarks
- ✅ Make content scannable, not paragraph-heavy

## Styling

```html
<p style="font-size: 16px; line-height: 1.7; margin: 0.5rem 0 1rem 0;">
<h3 style="margin-top: 5rem; margin-bottom: 0.75rem; font-weight: 700;">1. Title</h3>
<h4 style="margin-top: 2rem; margin-bottom: 0.3rem; font-weight: 400;">Subtitle</h4>
<ul style="margin: 0.3rem 0 0.5rem 0; padding-left: 1.5rem; line-height: 1.5;">
<li style="margin: 0.15rem 0;">
```

## Process Each Lesson

1. Read current lesson HTML
2. Read GOLDEN_TEMPLATE.html for structure reference
3. Restructure to match template
4. Save as: restructured/[lesson_key].html
5. Create comparison file
