# Science Lesson Golden Template V3.0

## CRITICAL FORMATTING RULES

### 1. Headers - NO BLUE COLORS
```html
<!-- CORRECT -->
<h3 style="margin-top: 5rem; margin-bottom: 0.75rem; font-weight: 700;">
Section Title
</h3>

<!-- WRONG - DO NOT USE BLUE -->
<h3 style="color: #1e40af; font-size: 1.5rem; border-bottom: 3px solid #3b82f6;">
</h3>
```

### 2. Blue Underlined Key Terms - REQUIRED
```html
<!-- Use for important scientific terms -->
<strong style="color: #2563eb; font-weight: 600; text-decoration: underline;">key term</strong>

<!-- Examples: -->
- <strong style="color: #2563eb; font-weight: 600; text-decoration: underline;">scatter plot</strong>
- <strong style="color: #2563eb; font-weight: 600; text-decoration: underline;">x-axis</strong>
- <strong style="color: #2563eb; font-weight: 600; text-decoration: underline;">positive correlation</strong>
- <strong style="color: #2563eb; font-weight: 600; text-decoration: underline;">inverse relationship</strong>
```

### 3. Key Takeaways - Green Checkmarks Only
```html
<h3 style="color: #2e7d32; font-size: 1.4rem; font-weight: 700; margin: 3rem 0 1.5rem 0;">
Key Takeaways
</h3>

<ul style="list-style: none; padding: 0; margin: 0;">
  <li style="margin-bottom: 0.8rem; color: #2e7d32; font-size: 16px; line-height: 1.6;">
    <span style="color: #4caf50; font-weight: bold; margin-right: 0.5rem;">✓</span>Key point here
  </li>
</ul>
```

### 4. Example Box Format - MORE WHITE SPACE
```javascript
problem_text: `<p style="margin-bottom: 2.5rem; font-size: 16px; line-height: 1.6;">Intro paragraph</p>

<div style="padding: 4rem 5rem; margin: 3rem 0; max-width: 100%; background-color: #ffffff; box-shadow: 0 1px 3px rgba(0,0,0,0.1);">
  <p style="font-weight: 700; font-size: 18px; margin-bottom: 2rem; color: #1f2937;">Figure 1</p>
  <p style="margin-bottom: 1.5rem; font-size: 14px;"><strong>Graph Description:</strong> ...</p>
  <table style="width: 100%; border-collapse: collapse; margin-top: 2rem; font-size: 13px;">
    <!-- ACT-style compact tables -->
  </table>
</div>

<p style="margin-top: 3.5rem; font-weight: 600; font-size: 17px; color: #1f2937;">Question text?</p>`
```

**Key spacing values:**
- Container padding: `4rem 5rem` (LOTS of white space)
- Container margin: `3rem 0`
- Figure title margin-bottom: `2rem`
- Description margin-bottom: `1.5rem`
- Table margin-top: `2rem`
- Question margin-top: `3.5rem` (big gap before question)
- Intro paragraph margin-bottom: `2.5rem`

### 5. Complete Lesson Structure

```html
<!-- Science Lesson X.X: Title -->
<!-- ACT Science - Unit X: Unit Name -->
<!-- Lesson Key: lesson-key -->

<p style="font-size: 16px; line-height: 1.7; margin: 0.5rem 0 1rem 0;">
Opening paragraph (exactly 2 sentences).
</p>

<h3 style="margin-top: 5rem; margin-bottom: 0.75rem; font-weight: 700;">
1. First Main Section
</h3>

<ul style="margin: 0.5rem 0 1rem 0; padding-left: 1.5rem; line-height: 1.7;">
  <li style="margin: 0.3rem 0;">Main point with <strong style="color: #2563eb; font-weight: 600; text-decoration: underline;">key term</strong>
    <ul style="margin: 0.3rem 0; padding-left: 1.5rem;">
      <li style="margin: 0.2rem 0;">Sub-point</li>
      <li style="margin: 0.2rem 0;">Sub-point</li>
    </ul>
  </li>
</ul>

<h3 style="margin-top: 5rem; margin-bottom: 0.75rem; font-weight: 700;">
2. Second Main Section
</h3>

<!-- ... continue for 4 total sections ... -->

<h3 style="color: #2e7d32; font-size: 1.4rem; font-weight: 700; margin: 3rem 0 1.5rem 0;">
Key Takeaways
</h3>

<ul style="list-style: none; padding: 0; margin: 0;">
  <li style="margin-bottom: 0.8rem; color: #2e7d32; font-size: 16px; line-height: 1.6;">
    <span style="color: #4caf50; font-weight: bold; margin-right: 0.5rem;">✓</span>Takeaway 1
  </li>
  <li style="margin-bottom: 0.8rem; color: #2e7d32; font-size: 16px; line-height: 1.6;">
    <span style="color: #4caf50; font-weight: bold; margin-right: 0.5rem;">✓</span>Takeaway 2
  </li>
</ul>
```

## COMMON MISTAKES TO AVOID

❌ **DO NOT:**
- Use blue colored headers (`color: #1e40af`)
- Use blue underlined borders on headers (`border-bottom: 3px solid #3b82f6`)
- Use gradient boxes for Key Takeaways
- Use `margin-left` for bullet indentation (use `padding-left` on `<ul>`)
- Use small padding on example boxes (need 4rem 5rem for white space)
- Forget blue underlined key terms

✅ **DO:**
- Use plain black headers with only `margin-top: 5rem; margin-bottom: 0.75rem; font-weight: 700;`
- Use green checkmarks for Key Takeaways
- Use nested `<ul>` with `padding-left: 1.5rem` for indentation
- Use `padding: 4rem 5rem` on example boxes for white space
- Add blue underlined formatting to all important scientific terms

## EXAMPLE FORMATTING SUMMARY

### Container (with LOTS of white space):
```html
<div style="padding: 4rem 5rem; margin: 3rem 0; max-width: 100%; background-color: #ffffff; box-shadow: 0 1px 3px rgba(0,0,0,0.1);">
```

### Tables (ACT-style compact):
```html
<table style="width: 100%; border-collapse: collapse; margin-top: 2rem; font-size: 13px;">
  <thead>
    <tr style="background-color: #374151;">
      <th style="padding: 0.6rem; border: 1px solid #1f2937; color: white;">Header</th>
    </tr>
  </thead>
  <tbody>
    <tr style="background-color: white;">
      <td style="padding: 0.5rem; border: 1px solid #d1d5db; font-size: 13px;">Data</td>
    </tr>
  </tbody>
</table>
```

### Question (with big margin for spacing):
```html
<p style="margin-top: 3.5rem; font-weight: 600; font-size: 17px; color: #1f2937;">Question text?</p>
```

## VERSION HISTORY

- **V3.0** (Current): Added MORE white space to examples (padding: 4rem 5rem), removed blue headers, added blue underlined terms requirement
- **V2.0**: Ultra-wide format, no gray backgrounds
- **V1.0**: Initial format with gray boxes
