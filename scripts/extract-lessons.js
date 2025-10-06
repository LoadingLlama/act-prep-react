// Script to extract lessons from allLessons.js and convert to Supabase-ready JSON
const fs = require('fs');
const path = require('path');

// Import the lessons
const { allLessons } = require('../src/data/allLessons.js');

// Convert to array format for Supabase
const lessonsArray = Object.entries(allLessons).map(([key, lesson], index) => {
  return {
    lesson_key: key,
    title: lesson.title,
    duration: lesson.duration,
    subject: 'english', // You can modify this if you have other subjects
    category: lesson.category || null,
    content: lesson.content,
    order_index: index
  };
});

// Write to JSON file
const outputPath = path.join(__dirname, 'lessons-data.json');
fs.writeFileSync(outputPath, JSON.stringify(lessonsArray, null, 2));

console.log(`✅ Extracted ${lessonsArray.length} lessons`);
console.log(`📁 Saved to: ${outputPath}`);
console.log('\nNext steps:');
console.log('1. Go to your Supabase project dashboard');
console.log('2. Go to SQL Editor');
console.log('3. Run the migration script (supabase-migration.sql)');
console.log('4. Then import this data using the import script');
