// Script to extract all lessons from all files and create comprehensive lessonContent object

// Read all lesson files
const fs = require('fs');
const path = require('path');

// Read the English lessons file
const englishContent = fs.readFileSync(path.join(__dirname, 'english-lessons-full.js'), 'utf8');

// Read the Math lessons file
const mathContent = fs.readFileSync(path.join(__dirname, 'math-lessons-full.js'), 'utf8');

// Read the Reading lessons file
const readingContent = fs.readFileSync(path.join(__dirname, 'reading-lessons-full.js'), 'utf8');

// Read the Science lessons file
const scienceContent = fs.readFileSync(path.join(__dirname, 'science-lessons-full.js'), 'utf8');

// Create comprehensive lesson content object
let comprehensiveLessonContent = {};

// Function to extract lessons from a file content
function extractLessonsFromContent(content, subjectPrefix = '') {
    const lessons = {};

    // Find all lesson objects using regex
    const lessonRegex = /['"`]([^'"`]+)['"`]\s*:\s*\{[\s\S]*?title\s*:\s*['"`]([^'"`]+)['"`][\s\S]*?content\s*:\s*`([\s\S]*?)`[\s\S]*?\}/g;

    let match;
    while ((match = lessonRegex.exec(content)) !== null) {
        const [, lessonId, title, contentText] = match;

        // Add subject prefix if provided
        const fullLessonId = subjectPrefix ? `${subjectPrefix}-${lessonId}` : lessonId;

        lessons[fullLessonId] = {
            title: title,
            content: contentText
        };
    }

    return lessons;
}

// Extract lessons from English file
console.log('Extracting English lessons...');
const englishLessons = extractLessonsFromContent(englishContent, 'english');

// Extract lessons from Math file
console.log('Extracting Math lessons...');
const mathLessons = extractLessonsFromContent(mathContent, 'math');

// Extract lessons from Reading file
console.log('Extracting Reading lessons...');
const readingLessons = extractLessonsFromContent(readingContent, 'reading');

// Extract lessons from Science file
console.log('Extracting Science lessons...');
const scienceLessons = extractLessonsFromContent(scienceContent, 'science');

// Combine all lessons
comprehensiveLessonContent = {
    ...englishLessons,
    ...mathLessons,
    ...readingLessons,
    ...scienceLessons
};

console.log(`Total lessons extracted: ${Object.keys(comprehensiveLessonContent).length}`);
console.log('English lessons:', Object.keys(englishLessons).length);
console.log('Math lessons:', Object.keys(mathLessons).length);
console.log('Reading lessons:', Object.keys(readingLessons).length);
console.log('Science lessons:', Object.keys(scienceLessons).length);

// Create the final output file
const outputContent = `// Comprehensive Lesson Content Object
// This file contains all lessons from English, Math, Reading, and Science subjects

const lessonContent = ${JSON.stringify(comprehensiveLessonContent, null, 4)};

// Export for use in React app
export default lessonContent;
`;

// Write to file
fs.writeFileSync(path.join(__dirname, 'comprehensive-lessons.js'), outputContent);
console.log('Comprehensive lessons file created: comprehensive-lessons.js');

// Also create a summary
const summary = {
    totalLessons: Object.keys(comprehensiveLessonContent).length,
    subjects: {
        english: Object.keys(englishLessons),
        math: Object.keys(mathLessons),
        reading: Object.keys(readingLessons),
        science: Object.keys(scienceLessons)
    }
};

fs.writeFileSync(path.join(__dirname, 'lessons-summary.json'), JSON.stringify(summary, null, 2));
console.log('Summary file created: lessons-summary.json');