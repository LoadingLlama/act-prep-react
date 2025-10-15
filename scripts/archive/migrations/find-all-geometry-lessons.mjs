/**
 * Find All Geometry Lessons
 * Get complete list of all geometry lessons with their current state
 */

import { createClient } from '@supabase/supabase-js';
import dotenv from 'dotenv';

dotenv.config();

const supabase = createClient(
  process.env.REACT_APP_SUPABASE_URL,
  process.env.SUPABASE_SERVICE_ROLE_KEY
);

async function findAllGeometryLessons() {
  console.log('🔍 Finding all geometry lessons...\n');

  // Get specific geometry lessons from Chapter 2
  const geometryKeys = ['geometry-angles', 'geometry-shapes', 'lines', 'arcs-sectors', 'circles-ellipses'];

  const { data: lessons, error } = await supabase
    .from('lessons')
    .select('id, lesson_key, title, content')
    .in('lesson_key', geometryKeys);

  if (error) {
    console.error('❌ Error:', error);
    return;
  }

  console.log(`📚 Found ${lessons.length} geometry lessons\n`);
  console.log('═══════════════════════════════════════════════════════════\n');

  // Sort by the geometry keys order
  const keyOrder = ['geometry-angles', 'geometry-shapes', 'lines', 'arcs-sectors', 'circles-ellipses'];
  lessons.sort((a, b) => keyOrder.indexOf(a.lesson_key) - keyOrder.indexOf(b.lesson_key));

  for (const lesson of lessons) {
    console.log(`📝 ${lesson.title}`);
    console.log(`   Key: ${lesson.lesson_key}`);
    console.log(`   ID: ${lesson.id}`);

    // Analyze content
    const contentLength = lesson.content?.length || 0;
    const hasH3 = (lesson.content?.match(/<h3>/g) || []).length;
    const hasH4 = (lesson.content?.match(/<h4>/g) || []).length;
    const hasSvg = (lesson.content?.match(/<svg/g) || []).length;
    const hasTable = (lesson.content?.match(/<table/g) || []).length;

    console.log(`   Content: ${contentLength} chars`);
    console.log(`   Structure: ${hasH3} H3 sections, ${hasH4} H4 subsections`);
    console.log(`   Visuals: ${hasSvg} SVG diagrams, ${hasTable} tables`);

    // Check for quiz
    const { data: quizzes } = await supabase
      .from('quizzes')
      .select('id, title, quiz_type')
      .eq('lesson_id', lesson.id);

    if (quizzes && quizzes.length > 0) {
      console.log(`   Quizzes: ${quizzes.length}`);
      quizzes.forEach(q => {
        console.log(`     - ${q.title} (${q.quiz_type})`);
      });
    } else {
      console.log(`   ⚠️  NO QUIZ FOUND`);
    }

    console.log('');
  }

  console.log('═══════════════════════════════════════════════════════════\n');

  // Summary
  const lessonsWithQuiz = lessons.filter(async l => {
    const { data } = await supabase
      .from('quizzes')
      .select('id')
      .eq('lesson_id', l.id)
      .limit(1);
    return data && data.length > 0;
  });

  console.log('📊 SUMMARY:');
  console.log(`   Total geometry lessons: ${lessons.length}`);
  console.log(`   Total SVG diagrams: ${lessons.reduce((sum, l) => sum + (l.content?.match(/<svg/g) || []).length, 0)}`);
  console.log('\n✨ Analysis complete!\n');

  return lessons;
}

findAllGeometryLessons().catch(err => {
  console.error('❌ Error:', err);
});
