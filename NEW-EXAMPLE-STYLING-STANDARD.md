# NEW EXAMPLE STYLING STANDARD

## Problem: Current examples have:
- Container padding: 2rem (too small)
- Table font-size: 15px (too big, not ACT-like)
- Table cell padding: 0.875rem-1rem (too much)

## Solution: New ACT-Style Format

### Container (BIGGER - wider and taller):
```html
<div style="background-color: #f3f4f6; padding: 3.5rem 3rem; border: 2px solid #d1d5db; border-radius: 8px; margin: 2rem 0; max-width: 900px;">
```
Changes:
- Padding: `3.5rem 3rem` (vertical 56px, horizontal 48px) - was `2rem` (32px)
- Margin: `2rem 0` - was `1.5rem 0`
- Max-width: `900px` - prevents overly wide displays

### Table (SMALLER - more ACT-like):
```html
<table style="width: 100%; border-collapse: collapse; margin-top: 1.5rem; font-size: 13px;">
```
Changes:
- Font-size: `13px` - was `15px`

### Table Headers (Tighter):
```html
<th style="padding: 0.6rem; border: 1px solid #1f2937; text-align: left; color: white; font-weight: 600;">
```
Changes:
- Padding: `0.6rem` (9.6px) - was `1rem` (16px)
- Border: `1px` - was `2px`

### Table Cells (Compact):
```html
<td style="padding: 0.5rem; border: 1px solid #d1d5db; font-size: 13px;">
```
Changes:
- Padding: `0.5rem` (8px) - was `0.875rem` (14px)
- Font-size: `13px` explicitly set

### Figure Title (Slightly Bigger):
```html
<p style="font-weight: 700; font-size: 20px; margin-bottom: 1.5rem; color: #1f2937;">
```
Changes:
- Font-size: `20px` - was `18px`

### Graph Description (Keep same):
```html
<p style="margin-bottom: 1rem; font-size: 15px;"><strong>Graph Description:</strong> ...</p>
```
No change

## Result:
- Example containers feel more spacious and prominent
- Tables inside are compact and ACT-realistic
- Better visual hierarchy
