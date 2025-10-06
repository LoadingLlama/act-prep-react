const fs = require('fs');

// Read the lesson file content
const lessonFile = fs.readFileSync('./src/data/allLessons.js', 'utf8');

// Extract the sentence-structure lesson content
const startPattern = /'sentence-structure':\s*{\s*title:[^,]*,\s*duration:[^,]*,\s*content:\s*`/;
const startMatch = lessonFile.match(startPattern);

if (!startMatch) {
  console.log('Could not find start pattern');
  process.exit(1);
}

const startIndex = startMatch.index + startMatch[0].length;
const contentStart = lessonFile.substring(startIndex);
const endMatch = contentStart.match(/`\s*}/);

if (!endMatch) {
  console.log('Could not find end pattern');
  process.exit(1);
}

const content = contentStart.substring(0, endMatch.index);

console.log('=== LESSON CONTENT LENGTH ===', content.length);

  // Split by quiz markers first
  const allParts = content.split(/(<!-- QUIZ_[1-4] -->)/);
  console.log('\n=== SPLIT BY QUIZ MARKERS ===');
  console.log('Total parts:', allParts.length);

  allParts.forEach((part, index) => {
    if (!part.trim()) return;

    const isQuiz = part.match(/<!-- QUIZ_(\d+) -->/);
    if (isQuiz) {
      console.log(`\nPart ${index}: QUIZ ${isQuiz[1]}`);
    } else {
      console.log(`\nPart ${index}: TEXT CONTENT (${part.length} chars)`);

      // Check if this part contains PRO TIP
      if (part.includes('PRO TIP')) {
        console.log('*** CONTAINS PRO TIP ***');
        const proTipIndex = part.indexOf('PRO TIP');
        console.log('PRO TIP starts at character:', proTipIndex);
        console.log('Content around PRO TIP:');
        console.log(part.substring(proTipIndex - 100, proTipIndex + 300));
      }

      // Show first and last 100 characters
      console.log('First 100 chars:', part.substring(0, 100));
      console.log('Last 100 chars:', part.substring(part.length - 100));
    }
  });