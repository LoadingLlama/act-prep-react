# How to Add Images to Math and Science Questions

This guide explains how to upload images for specific questions in practice tests.

## Setup Required (One-Time)

### 1. Add image_url Column to Database

Run this SQL in your Supabase Dashboard > SQL Editor:

```sql
ALTER TABLE practice_test_math_questions ADD COLUMN IF NOT EXISTS image_url TEXT;
ALTER TABLE practice_test_science_questions ADD COLUMN IF NOT EXISTS image_url TEXT;
ALTER TABLE practice_test_science_passages ADD COLUMN IF NOT EXISTS image_url TEXT;
```

### 2. Create Storage Bucket

1. Go to Supabase Dashboard > Storage
2. Click "New bucket"
3. Name: `test-images`
4. Make it **Public**
5. Click "Create bucket"

## How to Upload Images

### Method 1: Using the Upload Script

```bash
node scripts/upload-question-image.mjs <section> <test_number> <question_number> <image_path>
```

**Examples:**

```bash
# Upload image for Math Test 1, Question 15
node scripts/upload-question-image.mjs math 1 15 ./math-diagram.png

# Upload image for Science Test 2, Question 8
node scripts/upload-question-image.mjs science 2 8 ./science-chart.jpg
```

### Method 2: Manual Upload via Supabase Dashboard

1. Go to Supabase Dashboard > Storage > test-images
2. Create folder structure: `math-questions/test1/` or `science-questions/test1/`
3. Upload your image
4. Click on the image and copy the public URL
5. Go to Table Editor > `practice_test_math_questions` or `practice_test_science_questions`
6. Find the row for your question (filter by `test_number` and `question_number`)
7. Paste the URL into the `image_url` column
8. Save

## How It Works

Once you upload an image and add the URL to a question:

1. The image will **automatically display** in the test when that question appears
2. The image shows up **above** the question text
3. Images are responsive and scale to fit the screen
4. Works on localhost and production

## Image Guidelines

- **Formats:** PNG, JPG, JPEG, GIF, WebP
- **Size:** Keep under 2MB for best performance
- **Dimensions:** 800-1200px width recommended
- **Content:** Diagrams, graphs, tables, charts, geometric figures

## Example Workflow

```bash
# 1. You have a math question that needs a diagram
# 2. Create the diagram image: triangle-diagram.png
# 3. Upload it:
node scripts/upload-question-image.mjs math 1 25 ./triangle-diagram.png

# 4. Done! The image now shows when students take Math Test 1, Question 25
```

## Troubleshooting

**Error: "Bucket not found"**
- Create the `test-images` bucket in Supabase Dashboard > Storage
- Make sure it's set to Public

**Error: "Failed to update question"**
- Check that the test_number and question_number exist in the database
- Verify you're using the correct section name ("math" or "science")

**Image doesn't show in test**
- Clear browser cache and reload
- Check that image_url column has a value in the database
- Verify the Supabase URL is correct and image is public

## Files Modified

- `/public/tests/practice-test.html` - Displays images from database
- `/public/tests/shared-test-styles.css` - Image styling
- `/scripts/upload-question-image.mjs` - Upload script
- `/scripts/setup/add-image-url-column.mjs` - Database migration
