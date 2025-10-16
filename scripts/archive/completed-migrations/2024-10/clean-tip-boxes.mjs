import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

/**
 * Removes large blue TIP boxes from English lesson HTML files
 * These boxes are inconsistent with the clean, simple design standard
 */
function cleanTipBoxesFromHTML(htmlContent) {
  // Match blue gradient tip boxes with structure:
  // <div style="background-color: #eff6ff; border-left: 4px solid #2563eb...">
  //   <h4 style="color: #2563eb...">💡 TIP: Title</h4>
  //   <p>Content...</p>
  // </div>

  // Strategy: Find blue background divs with 💡 TIP headers and remove entire block
  let cleaned = htmlContent;
  let removedCount = 0;

  // Pattern matches the blue box div structure
  const tipBoxPattern = /<div style="background-color:\s*#eff6ff;[^>]*border-left:\s*4px solid #2563eb[^>]*">[\s\S]*?💡 TIP:[^<]*<\/h4>[\s\S]*?<\/div>/gi;

  const matches = [...cleaned.matchAll(tipBoxPattern)];
  removedCount = matches.length;

  // Remove all tip boxes
  cleaned = cleaned.replace(tipBoxPattern, '');

  return {
    cleaned,
    removed: removedCount
  };
}

/**
 * Get all English lesson HTML files
 */
function getAllEnglishLessonFiles() {
  const docsDir = path.join(__dirname, '..', 'docs');
  const files = fs.readdirSync(docsDir);
  return files
    .filter(f => f.startsWith('CURRENT_') && f.endsWith('.html'))
    .map(f => ({
      filename: f,
      path: path.join(docsDir, f)
    }));
}

/**
 * Main cleanup function
 */
function cleanAllEnglishLessons() {
  console.log('🧹 CLEANING BLUE TIP BOXES FROM ENGLISH LESSONS');
  console.log('================================================\n');

  const lessonFiles = getAllEnglishLessonFiles();
  let processedCount = 0;
  let totalRemoved = 0;

  for (const file of lessonFiles) {
    // Read HTML content
    const htmlContent = fs.readFileSync(file.path, 'utf8');

    // Clean tip boxes
    const { cleaned, removed } = cleanTipBoxesFromHTML(htmlContent);

    if (removed > 0) {
      // Write cleaned content back to file
      fs.writeFileSync(file.path, cleaned, 'utf8');
      console.log(`✓ ${file.filename}: Removed ${removed} TIP boxes`);
      totalRemoved += removed;
      processedCount++;
    } else {
      console.log(`⏭️  ${file.filename}: No TIP boxes found`);
    }
  }

  console.log('\n================================================');
  console.log(`✅ CLEANUP COMPLETE!`);
  console.log(`   Processed ${processedCount} lessons`);
  console.log(`   Removed ${totalRemoved} TIP boxes`);
  console.log(`\n   English lessons now follow clean, consistent design standard`);
}

// Run cleanup
cleanAllEnglishLessons();
