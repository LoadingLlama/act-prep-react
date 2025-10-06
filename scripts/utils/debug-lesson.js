// Test to verify lesson content and quiz markers
const fs = require('fs');

// Read the allLessons.js file
const lessonFile = fs.readFileSync('./src/data/allLessons.js', 'utf8');

// Check for quiz markers
const quizMarkers = lessonFile.match(/<!-- QUIZ_\d+ -->/g);
console.log('Quiz markers found:', quizMarkers);

// Extract the sentence structure lesson content
const sentenceStructureMatch = lessonFile.match(/'sentence-structure':\s*{[\s\S]*?content:\s*`([\s\S]*?)`,[\s\S]*?}/);

if (sentenceStructureMatch) {
  const content = sentenceStructureMatch[1];
  console.log('\nLesson content length:', content.length);
  console.log('\nQuiz markers in sentence-structure lesson:');
  const markers = content.match(/<!-- QUIZ_\d+ -->/g);
  console.log(markers);

  console.log('\nContent around each quiz marker:');
  markers?.forEach(marker => {
    const index = content.indexOf(marker);
    const before = content.substring(Math.max(0, index - 50), index);
    const after = content.substring(index + marker.length, Math.min(content.length, index + marker.length + 50));
    console.log(`\n${marker}:`);
    console.log(`Before: "${before}"`);
    console.log(`After: "${after}"`);
  });
} else {
  console.log('Could not find sentence-structure lesson content');
}