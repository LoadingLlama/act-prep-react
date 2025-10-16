import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

/**
 * Removes yellow gradient example boxes from lesson HTML files
 * Uses a simple regex that matches the pattern from h4 through the complete div structure
 */
function cleanExamplesFromHTML(htmlContent) {
  // Match pattern: <h4...>Example N:...</h4>\n\n<div...yellow gradient...>...</div>
  // The key is to match from h4 through the OUTER closing div of the yellow box

  // Use a greedy match that goes from h4 to </div></div> (two closing divs for nested structure)
  const examplePattern = /<h4[^>]*?border-left:\s*4px\s+solid\s+#b91c1c[^>]*?>Example \d+:[^<]*?<\/h4>\s*<div[^>]*?background:[^>]*?linear-gradient[^>]*?fef3c7[^>]*?>[\s\S]*?<\/div>\s*<\/div>/gi;

  const cleaned = htmlContent.replace(examplePattern, '');

  // Count removals
  const countBefore = (htmlContent.match(/Example \d+:/g) || []).length;
  const countAfter = (cleaned.match(/Example \d+:/g) || []).length;

  return {
    cleaned,
    removed: countBefore - countAfter
  };
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
  console.log('===========================================\n');

  const lessonFiles = getAllLessonFiles();
  let processedCount = 0;
  let totalRemoved = 0;

  for (const file of lessonFiles) {
    // Read HTML content
    const htmlContent = fs.readFileSync(file.path, 'utf8');

    // Clean examples
    const { cleaned, removed } = cleanExamplesFromHTML(htmlContent);

    if (removed > 0) {
      // Write cleaned content back to file
      fs.writeFileSync(file.path, cleaned, 'utf8');
      console.log(`✓ ${file.filename}: Removed ${removed} examples`);
      totalRemoved += removed;
      processedCount++;
    }
  }

  console.log('\n===========================================');
  console.log(`✅ CLEANUP COMPLETE!`);
  console.log(`   Processed ${processedCount} lessons`);
  console.log(`   Removed ${totalRemoved} example HTML blocks`);
}

// Run cleanup
cleanAllLessons();
