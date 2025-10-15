/**
 * Verify section creation from lesson content
 * Simulates what ProgressiveLessonRenderer does
 */

import { createClient } from '@supabase/supabase-js';
import dotenv from 'dotenv';

dotenv.config();

const supabase = createClient(
  process.env.REACT_APP_SUPABASE_URL,
  process.env.SUPABASE_SERVICE_ROLE_KEY
);

// Simulate splitIntoTextSections
const splitIntoTextSections = (content) => {
  if (!content || !content.trim()) {
    return [];
  }

  let cleanContent = content.trim();
  cleanContent = cleanContent.replace(/<h2[^>]*>.*?<\/h2>/gi, '');

  const sections = [];

  if (cleanContent.includes('<h3')) {
    const h3Parts = cleanContent.split(/(?=<h3[^>]*>)/);

    for (let part of h3Parts) {
      part = part.trim();
      if (!part || part.length < 50) continue;

      sections.push({
        type: 'text',
        content: part
      });
    }
  } else {
    sections.push({
      type: 'text',
      content: cleanContent
    });
  }

  return sections.length > 0 ? sections : [{ type: 'text', content: cleanContent }];
};

console.log('🔍 Verifying section creation...\n');

// Get lesson content
const { data: lesson } = await supabase
  .from('lessons')
  .select('id, content')
  .eq('lesson_key', 'geometry-angles')
  .single();

console.log('📄 Lesson ID:', lesson.id);
console.log('📄 Content length:', lesson.content.length);

// Get quizzes
const { data: quizzes } = await supabase
  .from('quizzes')
  .select('*')
  .eq('lesson_id', lesson.id)
  .order('position');

console.log('\n📝 Quizzes found:', quizzes?.length || 0);
if (quizzes && quizzes.length > 0) {
  quizzes.forEach((quiz, idx) => {
    console.log(`   Quiz ${idx + 1}: ${quiz.title} (position: ${quiz.position})`);
  });
}

// Split content into text sections
const textSections = splitIntoTextSections(lesson.content);
console.log('\n📚 Text sections created:', textSections.length);

// Build quizzes by position map
const quizzesByPosition = {};
quizzes?.forEach(quiz => {
  if (!quizzesByPosition[quiz.position]) {
    quizzesByPosition[quiz.position] = [];
  }
  quizzesByPosition[quiz.position].push(quiz);
});

// Interleave sections (same logic as ProgressiveLessonRenderer)
const processedSections = [];
let textIndex = 0;

while (textIndex < textSections.length) {
  processedSections.push(textSections[textIndex]);
  textIndex++;

  if (quizzesByPosition[textIndex]) {
    quizzesByPosition[textIndex].forEach(quiz => {
      processedSections.push({
        type: 'quiz',
        data: quiz,
        title: quiz.title
      });
    });
  }
}

// Add any quizzes positioned beyond the last text section
const maxPosition = Math.max(...Object.keys(quizzesByPosition).map(Number), textSections.length);
for (let pos = textSections.length; pos <= maxPosition; pos++) {
  if (quizzesByPosition[pos]) {
    quizzesByPosition[pos].forEach(quiz => {
      processedSections.push({
        type: 'quiz',
        data: quiz,
        title: quiz.title
      });
    });
  }
}

console.log('\n=== ALL SECTIONS ===');
console.log('Total sections:', processedSections.length);
console.log('');

processedSections.forEach((section, idx) => {
  if (section.type === 'text') {
    // Extract H3 title if present
    const h3Match = section.content.match(/<h3[^>]*>(.*?)<\/h3>/);
    const title = h3Match ? h3Match[1].replace(/<[^>]*>/g, '') : 'No H3 title';

    // Check if it's Key Takeaways
    const isKeyTakeaways = section.content.includes('Key Takeaways');
    const marker = isKeyTakeaways ? ' ⭐ KEY TAKEAWAYS' : '';

    console.log(`Section ${idx}: TEXT - "${title}"${marker}`);

    // Show first 150 chars of content (no HTML)
    const preview = section.content.substring(0, 150).replace(/<[^>]*>/g, '').trim();
    console.log(`          Preview: ${preview}...`);
  } else if (section.type === 'quiz') {
    console.log(`Section ${idx}: QUIZ - "${section.title}" 🎯`);
  }
  console.log('');
});

// Verify Key Takeaways exists in content
const hasKeyTakeaways = lesson.content.includes('Key Takeaways');
console.log('\n✓ Key Takeaways in content?', hasKeyTakeaways ? 'YES ✓' : 'NO ✗');

// Find which section has Key Takeaways
const keyTakeawaysSection = processedSections.findIndex(s =>
  s.type === 'text' && s.content.includes('Key Takeaways')
);
console.log('✓ Key Takeaways at section:', keyTakeawaysSection >= 0 ? keyTakeawaysSection : 'NOT FOUND');

// Find which section has quiz
const quizSection = processedSections.findIndex(s => s.type === 'quiz');
console.log('✓ Quiz at section:', quizSection >= 0 ? quizSection : 'NOT FOUND');

if (keyTakeawaysSection >= 0 && quizSection >= 0) {
  console.log('\n✓ Quiz comes BEFORE Key Takeaways?', quizSection < keyTakeawaysSection ? 'YES ✓' : 'NO ✗');
}
