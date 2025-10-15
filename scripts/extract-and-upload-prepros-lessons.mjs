import { createClient } from '@supabase/supabase-js';
import { readFileSync } from 'fs';
import dotenv from 'dotenv';

dotenv.config();

const SERVICE_ROLE_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InJhYmF2b2Jka2xud3Z3c2xkYml4Iiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc1OTc2NTQ3OCwiZXhwIjoyMDc1MzQxNDc4fQ.81SeH703keXgF3IevQlRS7OYmn1J2GUVIkn3OJiviM4';

const supabase = createClient(
  process.env.REACT_APP_SUPABASE_URL,
  SERVICE_ROLE_KEY
);

// Chapter definitions with line ranges
const chapters = [
  { num: 1, title: 'Backsolving', lessonKey: 'backsolving', start: 3348, end: 3515 },
  { num: 2, title: 'Substitution', lessonKey: 'substitution', start: 3936, end: 4061 },
  { num: 3, title: 'Geometry Part 1 - Angles', lessonKey: 'geometry-angles', start: 4416, end: 4636 },
  { num: 4, title: 'Geometry Part 2 - Shapes', lessonKey: 'geometry-shapes', start: 5346, end: 6130 },
  { num: 5, title: 'Lines', lessonKey: 'lines', start: 7586, end: 8005 },
  { num: 6, title: 'Fractions', lessonKey: 'fractions', start: 8806, end: 9360 },
  { num: 7, title: 'Algebra Skills', lessonKey: 'algebra-skills', start: 10337, end: 10796 },
  { num: 8, title: 'Number Theory', lessonKey: 'number-theory', start: 11420, end: 11974 },
  { num: 9, title: 'Percentages', lessonKey: 'percentages', start: 12685, end: 12822 },
  { num: 10, title: 'Ratios and Proportions', lessonKey: 'ratios-proportions', start: 14267, end: 14557 },
  { num: 11, title: 'Functions', lessonKey: 'functions', start: 15199, end: 15800 },
  { num: 12, title: 'Mean, Median, Mode, and Range', lessonKey: 'statistics-basics', start: 16628, end: 17105 },
  { num: 13, title: 'Exponents and Roots', lessonKey: 'exponents-roots', start: 18030, end: 18632 },
  { num: 14, title: 'Logarithms', lessonKey: 'logarithms', start: 19480, end: 19738 },
  { num: 15, title: 'Systems of Equations', lessonKey: 'systems-equations', start: 20293, end: 20482 },
  { num: 16, title: 'Quadratics', lessonKey: 'quadratics', start: 21109, end: 21784 },
  { num: 17, title: 'Trigonometry', lessonKey: 'trigonometry', start: 22399, end: 24198 },
  { num: 18, title: 'Absolute Value', lessonKey: 'absolute-value', start: 25648, end: 25979 },
  { num: 19, title: 'Matrices', lessonKey: 'matrices', start: 26522, end: 27222 },
  { num: 20, title: 'Repeating Patterns', lessonKey: 'repeating-patterns', start: 27967, end: 28367 },
  { num: 21, title: 'Circles, Ellipses, and Hyperbolas', lessonKey: 'circles-ellipses', start: 28621, end: 29278 },
  { num: 22, title: 'Probability', lessonKey: 'probability', start: 30149, end: 30844 },
  { num: 23, title: 'Factorial, Permutations, Combinations', lessonKey: 'permutations-combinations', start: 32070, end: 32761 },
  { num: 24, title: 'Sequences', lessonKey: 'sequences', start: 33596, end: 33985 },
  { num: 25, title: 'Complex Numbers', lessonKey: 'complex-numbers', start: 34336, end: 34727 },
  { num: 26, title: 'Word Problems', lessonKey: 'word-problems', start: 35320, end: 35368 },
  { num: 27, title: 'Inequalities', lessonKey: 'inequalities', start: 36225, end: 36558 },
  { num: 28, title: 'Exponential Growth and Decay', lessonKey: 'exponential-growth', start: 37123, end: 37499 },
  { num: 29, title: 'Unit Conversion', lessonKey: 'unit-conversion', start: 37868, end: 38224 },
  { num: 30, title: 'Scientific Notation', lessonKey: 'scientific-notation', start: 38825, end: 38937 },
  { num: 31, title: 'Arcs and Sectors', lessonKey: 'arcs-sectors', start: 39279, end: 39535 },
  { num: 32, title: 'Vectors', lessonKey: 'vectors', start: 40034, end: 40371 },
  { num: 33, title: 'Shifting and Transforming Functions', lessonKey: 'transforming-functions', start: 40748, end: 41279 },
  { num: 34, title: 'Statistics', lessonKey: 'statistics-advanced', start: 41641, end: 42260 },
  { num: 35, title: 'Miscellaneous Topics', lessonKey: 'miscellaneous-topics', start: 42938, end: 43871 }
];

// Read the PrepPros file
const filePath = '/Volumes/IMPORTANT/actprep copy/actclass.org/packets/PrepPros Complete Guide to ACT Math.txt';
console.log('Reading PrepPros file...\n');
const fileContent = readFileSync(filePath, 'utf-8');
const lines = fileContent.split('\n');

console.log(`Total lines in file: ${lines.length}\n`);

// Function to extract chapter content
function extractChapter(start, end) {
  const chapterLines = lines.slice(start - 1, end);
  return chapterLines.join('\n');
}

// Function to convert text to properly formatted HTML
function convertToHTML(rawText, chapterTitle) {
  // Just wrap the content in basic HTML structure
  // Keep the text mostly as-is since it's already well-formatted

  let html = '';
  const lines = rawText.split('\n');

  let inExample = false;
  let inList = false;
  let currentParagraph = '';

  for (let i = 0; i < lines.length; i++) {
    const line = lines[i];
    const trimmed = line.trim();

    // Skip empty lines outside of paragraphs
    if (trimmed === '') {
      if (currentParagraph) {
        // End current paragraph
        html += `<p class="lesson-text">${currentParagraph}</p>\n\n`;
        currentParagraph = '';
      }
      if (inList) {
        html += `</ol>\n\n`;
        inList = false;
      }
      continue;
    }

    // Detect section headings (usually short lines, often with colons or all caps)
    if (trimmed.length < 80 && (trimmed.includes(':') || trimmed === trimmed.toUpperCase()) && !trimmed.match(/^(Example|TIP|Step|Method)/)) {
      if (currentParagraph) {
        html += `<p class="lesson-text">${currentParagraph}</p>\n\n`;
        currentParagraph = '';
      }
      if (inList) {
        html += `</ol>\n\n`;
        inList = false;
      }

      // Remove any trailing dashes or em dashes
      const cleanHeading = trimmed.replace(/\s*[—\-]+\s*$/, '');
      html += `<h3 class="section-heading">${cleanHeading}</h3>\n\n`;
      continue;
    }

    // Detect numbered lists
    if (trimmed.match(/^\d+\./)) {
      if (currentParagraph) {
        html += `<p class="lesson-text">${currentParagraph}</p>\n\n`;
        currentParagraph = '';
      }
      if (!inList) {
        html += `<ol class="instruction-list">\n`;
        inList = true;
      }
      const listItemText = trimmed.replace(/^\d+\.\s*/, '');
      html += `<li>${listItemText}</li>\n`;
      continue;
    }

    // Detect examples
    if (trimmed.match(/^Example \d+/i)) {
      if (currentParagraph) {
        html += `<p class="lesson-text">${currentParagraph}</p>\n\n`;
        currentParagraph = '';
      }
      if (inList) {
        html += `</ol>\n\n`;
        inList = false;
      }
      html += `<div class="example-box">\n<h4>${trimmed}</h4>\n`;
      inExample = true;
      continue;
    }

    // Regular text lines - accumulate into paragraphs
    currentParagraph += (currentParagraph ? ' ' : '') + trimmed;
  }

  // Close any remaining open tags
  if (currentParagraph) {
    html += `<p class="lesson-text">${currentParagraph}</p>\n\n`;
  }
  if (inList) {
    html += `</ol>\n\n`;
  }
  if (inExample) {
    html += `</div>\n\n`;
  }

  // Wrap in main lesson structure
  const finalHTML = `
<div class="lesson-content">
  <h2 class="lesson-title">${chapterTitle}</h2>

  ${html}
</div>
  `.trim();

  return finalHTML;
}

// Test extraction on first chapter
async function testExtraction() {
  console.log('='.repeat(60));
  console.log('TESTING EXTRACTION - Chapter 1: Backsolving');
  console.log('='.repeat(60));

  const chapter = chapters[0];
  const rawContent = extractChapter(chapter.start, chapter.end);

  console.log('\nRaw content sample (first 500 chars):');
  console.log(rawContent.substring(0, 500));
  console.log('\n' + '='.repeat(60));

  const htmlContent = convertToHTML(rawContent, `Chapter ${chapter.num}: ${chapter.title}`);

  console.log('\nHTML content sample (first 800 chars):');
  console.log(htmlContent.substring(0, 800));
  console.log('\n' + '='.repeat(60));

  console.log(`\nTotal HTML length: ${htmlContent.length} characters`);
  console.log('Content preview looks good? (Check above)');

  return htmlContent;
}

// Extract all chapters
async function extractAllChapters() {
  console.log('\n' + '='.repeat(60));
  console.log('EXTRACTING ALL CHAPTERS');
  console.log('='.repeat(60) + '\n');

  const extractedLessons = [];

  for (const chapter of chapters) {
    console.log(`Extracting Chapter ${chapter.num}: ${chapter.title}...`);

    const rawContent = extractChapter(chapter.start, chapter.end);
    const htmlContent = convertToHTML(rawContent, `Chapter ${chapter.num}: ${chapter.title}`);

    extractedLessons.push({
      chapterNum: chapter.num,
      title: chapter.title,
      lessonKey: chapter.lessonKey,
      content: htmlContent,
      length: htmlContent.length
    });

    console.log(`  ✓ Extracted ${htmlContent.length} characters`);
  }

  console.log('\n' + '='.repeat(60));
  console.log('EXTRACTION COMPLETE');
  console.log('='.repeat(60));
  console.log(`\nTotal chapters extracted: ${extractedLessons.length}`);
  console.log(`Chapters with lesson_key: ${extractedLessons.filter(l => l.lessonKey).length}`);
  console.log(`Chapters WITHOUT lesson_key: ${extractedLessons.filter(l => !l.lessonKey).length}`);

  return extractedLessons;
}

// Upload to Supabase
async function uploadToSupabase(extractedLessons) {
  console.log('\n' + '='.repeat(60));
  console.log('UPLOADING TO SUPABASE');
  console.log('='.repeat(60) + '\n');

  const lessonsToUpdate = extractedLessons.filter(l => l.lessonKey);
  const lessonsSkipped = extractedLessons.filter(l => !l.lessonKey);

  console.log(`Lessons to update: ${lessonsToUpdate.length}`);
  console.log(`Lessons skipped (no lesson_key): ${lessonsSkipped.length}\n`);

  if (lessonsSkipped.length > 0) {
    console.log('Skipped chapters (no matching lesson_key):');
    lessonsSkipped.forEach(l => {
      console.log(`  - Chapter ${l.chapterNum}: ${l.title}`);
    });
    console.log('');
  }

  let successCount = 0;
  let errorCount = 0;

  for (const lesson of lessonsToUpdate) {
    try {
      const { data, error } = await supabase
        .from('lessons')
        .update({ content: lesson.content })
        .eq('lesson_key', lesson.lessonKey)
        .select();

      if (error) {
        console.log(`  ❌ Chapter ${lesson.chapterNum} (${lesson.lessonKey}): ${error.message}`);
        errorCount++;
      } else if (data && data.length > 0) {
        console.log(`  ✅ Chapter ${lesson.chapterNum}: ${lesson.title} (${lesson.lessonKey})`);
        successCount++;
      } else {
        console.log(`  ⚠️  Chapter ${lesson.chapterNum} (${lesson.lessonKey}): No matching lesson found`);
        errorCount++;
      }
    } catch (err) {
      console.log(`  ❌ Chapter ${lesson.chapterNum} (${lesson.lessonKey}): ${err.message}`);
      errorCount++;
    }
  }

  console.log('\n' + '='.repeat(60));
  console.log('UPLOAD COMPLETE');
  console.log('='.repeat(60));
  console.log(`\nSuccessfully updated: ${successCount} lessons`);
  console.log(`Errors: ${errorCount}`);
  console.log(`Skipped (no lesson_key): ${lessonsSkipped.length}`);
}

// Main execution
async function main() {
  console.log('\n' + '█'.repeat(60));
  console.log('PREPROS ACT MATH LESSON EXTRACTION & UPLOAD');
  console.log('█'.repeat(60) + '\n');

  // Step 1: Test extraction
  console.log('STEP 1: Testing extraction on Chapter 1...\n');
  await testExtraction();

  // Step 2: Extract all chapters
  console.log('\n\nSTEP 2: Extracting all 35 chapters...\n');
  const extractedLessons = await extractAllChapters();

  // Step 3: Upload to Supabase
  console.log('\n\nSTEP 3: Uploading to Supabase...\n');
  await uploadToSupabase(extractedLessons);

  console.log('\n' + '█'.repeat(60));
  console.log('ALL DONE!');
  console.log('█'.repeat(60) + '\n');
}

main();
