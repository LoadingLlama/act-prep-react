const { createClient } = require('@supabase/supabase-js');
require('dotenv').config();

const supabase = createClient(
  process.env.REACT_APP_SUPABASE_URL,
  process.env.REACT_APP_SUPABASE_ANON_KEY
);

async function getEnglishLessons() {
  console.log('=== ENGLISH LESSONS ===\n');

  const { data: lessons, error } = await supabase
    .from('lessons')
    .select('id, subject, lesson_key, title, order_index')
    .eq('subject', 'English')
    .order('order_index', { ascending: true });

  if (error) {
    console.error('Error:', error);
    return;
  }

  console.log(`Found ${lessons.length} English lessons:\n`);
  lessons.forEach((lesson, idx) => {
    console.log(`${idx + 1}. ${lesson.title}`);
    console.log(`   lesson_key: ${lesson.lesson_key}`);
    console.log(`   id: ${lesson.id}`);
    console.log(`   order_index: ${lesson.order_index}`);
    console.log();
  });

  // Based on ACT English chapters, here's the typical mapping:
  console.log('=== CHAPTER TO LESSON MAPPING (ACT English) ===\n');
  console.log('Chapter 1: Sentence Structure & Formation');
  console.log('Chapter 2: Punctuation (Commas, etc.)');
  console.log('Chapter 3: Grammar (Subject-Verb Agreement, Pronoun Agreement, etc.)');
  console.log('Chapter 4: Modifiers');
  console.log('Chapter 5: Verb Tense & Voice');
  console.log('Chapter 6: Style & Tone');
  console.log('Chapter 7: Organization');
  console.log('Chapter 8: Transitions');
  console.log('Chapter 9-15: Various specific topics');
  console.log('\nNote: Some questions have multiple chapters (e.g., "2, 3") meaning they test multiple concepts.');
}

getEnglishLessons().then(() => process.exit(0));
