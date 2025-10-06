const fs = require('fs');

// Read the lesson file content
const lessonFile = fs.readFileSync('./src/data/allLessons.js', 'utf8');

// Extract the sentence-structure lesson content using a more flexible approach
const contentMatch = lessonFile.match(/'sentence-structure':\s*{[^}]*content:\s*`([\s\S]*?)`[^}]*}/);

if (contentMatch) {
  const content = contentMatch[1];
  console.log('Found lesson content, length:', content.length);

  // Test the quiz processing logic
  console.log('\nTesting quiz processing logic...');

  // Split by ALL quiz markers at once
  const allParts = content.split(/(<!-- QUIZ_[1-4] -->)/);
  console.log('Split into parts:', allParts.length);

  let quizCount = 0;
  let textSectionCount = 0;

  allParts.forEach((part, index) => {
    if (!part.trim()) return;

    // Check if this part is a quiz marker
    const quizMatch = part.match(/<!-- QUIZ_(\d+) -->/);
    if (quizMatch) {
      const quizId = parseInt(quizMatch[1]);
      console.log(`Found QUIZ ${quizId} at index ${index}`);
      quizCount++;
    } else {
      // This is text content
      const wordCount = (part.match(/\b\w+\b/g) || []).length;
      console.log(`Text section ${index}: ${wordCount} words, first 50 chars: "${part.trim().substring(0, 50)}..."`);
      textSectionCount++;
    }
  });

  console.log(`\nSummary: Found ${quizCount} quizzes and ${textSectionCount} text sections`);

} else {
  console.log('Could not find sentence-structure lesson content');
}