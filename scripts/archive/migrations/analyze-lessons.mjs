import fs from 'fs';

const perfectLessons = JSON.parse(fs.readFileSync('perfect-lessons.json', 'utf8'));

// Find first English lesson
const englishLesson = perfectLessons.find(l => l.section === 'english');

// Find first math lesson
const mathLesson = perfectLessons.find(l => l.section === 'math');

console.log('=== ENGLISH LESSON ===');
console.log('ID:', englishLesson?.id);
console.log('Title:', englishLesson?.title);
console.log('Section:', englishLesson?.section);
console.log('\nContent preview (first 3000 chars):');
console.log(englishLesson?.content?.substring(0, 3000));

console.log('\n\n=== MATH LESSON ===');
console.log('ID:', mathLesson?.id);
console.log('Title:', mathLesson?.title);
console.log('Section:', mathLesson?.section);
console.log('\nContent preview (first 3000 chars):');
console.log(mathLesson?.content?.substring(0, 3000));
