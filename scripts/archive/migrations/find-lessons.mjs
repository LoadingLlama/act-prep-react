import fs from 'fs';

const perfectLessons = JSON.parse(fs.readFileSync('perfect-lessons.json', 'utf8'));

// Find an English lesson (sentence-structure)
const englishLesson = perfectLessons.find(l => l.title?.toLowerCase().includes('sentence') || l.title?.toLowerCase().includes('building'));

// Find a math lesson
const mathLesson = perfectLessons.find(l => l.subject === 'math');

console.log('=== ENGLISH LESSON ===');
if (englishLesson) {
  console.log('ID:', englishLesson.id);
  console.log('Title:', englishLesson.title);
  console.log('Subject:', englishLesson.subject);
  console.log('\nContent structure:');
  console.log('Has originalContent:', !!englishLesson.originalContent);
  console.log('Has reformattedContent:', !!englishLesson.reformattedContent);
  console.log('Has content:', !!englishLesson.content);

  const contentField = englishLesson.reformattedContent || englishLesson.content || englishLesson.originalContent;
  console.log('\nContent preview (first 2000 chars):');
  console.log(contentField?.substring(0, 2000));
} else {
  console.log('No English lesson found');
}

console.log('\n\n=== MATH LESSON ===');
if (mathLesson) {
  console.log('ID:', mathLesson.id);
  console.log('Title:', mathLesson.title);
  console.log('Subject:', mathLesson.subject);
  console.log('\nContent structure:');
  console.log('Has originalContent:', !!mathLesson.originalContent);
  console.log('Has reformattedContent:', !!mathLesson.reformattedContent);
  console.log('Has content:', !!mathLesson.content);

  const contentField = mathLesson.reformattedContent || mathLesson.content || mathLesson.originalContent;
  console.log('\nContent preview (first 2000 chars):');
  console.log(contentField?.substring(0, 2000));
} else {
  console.log('No math lesson found');
}

// Count lessons by subject
console.log('\n\n=== LESSON COUNTS ===');
const counts = {};
perfectLessons.forEach(l => {
  const subject = l.subject || 'unknown';
  counts[subject] = (counts[subject] || 0) + 1;
});
console.log(counts);
