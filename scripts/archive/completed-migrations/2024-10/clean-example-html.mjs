import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

/**
 * Removes yellow gradient example boxes from lesson HTML files
 * since examples now come from Supabase database
 */
function cleanExamplesFromHTML(htmlContent) {
  // Remove example blocks with yellow gradient background
  // Pattern matches: <h4>Example N:...</h4> through end of yellow div

  // Strategy: Find each example header, then find the matching yellow div that follows it
  // Use a more flexible approach that handles nested divs properly

  let cleaned = htmlContent;
  let foundExamples = 0;

  // First, match example headers
  const headerPattern = /<h4[^>]*border-left:\s*4px solid #b91c1c[^>]*>Example \d+:[^<]*<\/h4>/gi;
  const headers = [...cleaned.matchAll(headerPattern)];

  // For each header, find and remove the yellow gradient div that follows
  // Process in reverse order to maintain correct indices
  for (let i = headers.length - 1; i >= 0; i--) {
    const header = headers[i];
    const headerEnd = header.index + header[0].length;

    // Find the start of the yellow gradient div after this header
    const divPattern = /<div[^>]*background:[^>]*linear-gradient[^>]*fef3c7[^>]*>/i;
    const remainingContent = cleaned.substring(headerEnd);
    const divMatch = remainingContent.match(divPattern);

    if (divMatch) {
      const divStart = headerEnd + divMatch.index;

      // Now find the matching closing </div> by counting nested divs
      let depth = 1;
      let pos = divStart + divMatch[0].length;
      while (depth > 0 && pos < cleaned.length) {
        const openTag = cleaned.indexOf('<div', pos);
        const closeTag = cleaned.indexOf('</div>', pos);

        if (closeTag === -1) break; // No more closing tags

        if (openTag !== -1 && openTag < closeTag) {
          depth++;
          pos = openTag + 4;
        } else {
          depth--;
          pos = closeTag + 6;
        }
      }

      // Remove from header start to end of closing div tag
      cleaned = cleaned.substring(0, header.index) + cleaned.substring(pos);
      foundExamples++;
    }
  }

  return cleaned;
}

/**
 * Get all Math lesson HTML files
 */
function getAllLessonFiles() {
  const docsDir = path.join(__dirname, '..', 'docs');
  const files = fs.readdirSync(docsDir);
  return files
    .filter(f => f.startsWith('LESSON_') && f.endsWith('.html'))
    .map(f => ({
      filename: f,
      path: path.join(docsDir, f)
    }));
}

/**
 * Main cleanup function
 */
function cleanAllLessons() {
  console.log('🧹 CLEANING EXAMPLE HTML FROM LESSON FILES');
  console.log('================================================================================\n');

  const lessonFiles = getAllLessonFiles();
  let processedCount = 0;
  let removedCount = 0;

  for (const file of lessonFiles) {
    // Read HTML content
    const htmlContent = fs.readFileSync(file.path, 'utf8');

    // Count examples before
    const examplesBefore = (htmlContent.match(/Example \d+:/g) || []).length;

    // Clean examples
    const cleanedContent = cleanExamplesFromHTML(htmlContent);

    // Count examples after
    const examplesAfter = (cleanedContent.match(/Example \d+:/g) || []).length;

    const examplesRemoved = examplesBefore - examplesAfter;

    if (examplesRemoved > 0) {
      // Write cleaned content back to file
      fs.writeFileSync(file.path, cleanedContent, 'utf8');
      console.log(`✓ ${file.filename}: Removed ${examplesRemoved} example blocks`);
      removedCount += examplesRemoved;
      processedCount++;
    } else {
      console.log(`⏭️  ${file.filename}: No examples found`);
    }
  }

  console.log('\n================================================================================');
  console.log(`✅ CLEANUP COMPLETE!`);
  console.log(`   Processed ${processedCount} lessons`);
  console.log(`   Removed ${removedCount} example HTML blocks`);
  console.log(`\n   Examples now load from Supabase database via ExampleCard component`);
}

// Run cleanup
cleanAllLessons();
