const fs = require('fs');

// Read the lesson file content
const lessonFile = fs.readFileSync('./src/data/allLessons.js', 'utf8');

// Extract the sentence-structure lesson content using a more flexible approach
const contentMatch = lessonFile.match(/'sentence-structure':\s*{[^}]*content:\s*`([\s\S]*?)`[^}]*}/);

if (contentMatch) {
  const content = contentMatch[1];
  console.log('Found lesson content, length:', content.length);

  // Split by ALL quiz markers at once
  const allParts = content.split(/(<!-- QUIZ_[1-4] -->)/);
  console.log('Split into parts:', allParts.length);

  allParts.forEach((part, index) => {
    if (!part.trim()) return;

    // Check if this part is a quiz marker
    const quizMatch = part.match(/<!-- QUIZ_(\d+) -->/);
    if (quizMatch) {
      const quizId = parseInt(quizMatch[1]);
      console.log(`\n=== PART ${index}: QUIZ ${quizId} ===`);
    } else {
      // This is text content
      console.log(`\n=== PART ${index}: TEXT SECTION ===`);
      console.log('Length:', part.length);
      console.log('First 100 chars:', part.substring(0, 100));

      // Check for PRO TIP
      if (part.includes('PRO TIP')) {
        console.log('🔥🔥🔥 CONTAINS PRO TIP! 🔥🔥🔥');
        const proTipIndex = part.indexOf('PRO TIP');
        console.log('PRO TIP starts at character:', proTipIndex);

        // Show content around PRO TIP
        const start = Math.max(0, proTipIndex - 200);
        const end = Math.min(part.length, proTipIndex + 500);
        console.log('\n--- PRO TIP CONTEXT ---');
        console.log(part.substring(start, end));
        console.log('--- END PRO TIP CONTEXT ---\n');
      }
    }
  });

} else {
  console.log('Could not find sentence-structure lesson content');
}