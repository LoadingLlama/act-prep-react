const { supabase } = require('./generate-and-insert-lesson');

async function checkAndCleanLessons() {
  console.log('Checking existing lesson content...\n');

  // Check lesson 2.2 content
  const { data: lesson22, error: error22 } = await supabase
    .from('lesson_metadata')
    .select(`
      id,
      lesson_key,
      title,
      lesson_sections (
        id,
        title,
        section_content (
          content
        )
      )
    `)
    .eq('lesson_key', '2.2')
    .single();

  if (error22) {
    console.log('Lesson 2.2 not found or error:', error22.message);
  } else {
    console.log('Lesson 2.2:', lesson22.title);
    if (lesson22.lesson_sections && lesson22.lesson_sections[0]) {
      const content = lesson22.lesson_sections[0].section_content[0]?.content || '';
      const preview = content.substring(0, 500);
      console.log('Content preview:', preview);

      if (content.includes('Repeating Patterns') || content.includes('repeating unit')) {
        console.log('\n⚠️  WARNING: Lesson 2.2 contains incorrect "Repeating Patterns" content!');
        console.log('This needs to be replaced with correct "Areas, Volumes & Triangles" content\n');
      }
    }
  }

  console.log('\n' + '='.repeat(60));
  console.log('Checking for lessons 2.3 and 2.4...\n');

  const { data: existing, error } = await supabase
    .from('lesson_metadata')
    .select('id, lesson_key, title')
    .in('lesson_key', ['2.3', '2.4']);

  if (error) {
    console.error('Error:', error.message);
    return;
  }

  if (existing && existing.length > 0) {
    console.log('⚠️  Found existing lessons that need to be deleted:');
    for (const lesson of existing) {
      console.log(`  - ${lesson.lesson_key}: ${lesson.title}`);
    }

    console.log('\nDeleting old lessons 2.3 and 2.4...');

    for (const lesson of existing) {
      // Delete in correct order due to foreign keys
      console.log(`\nDeleting lesson ${lesson.lesson_key}...`);

      // Get sections
      const { data: sections } = await supabase
        .from('lesson_sections')
        .select('id')
        .eq('lesson_id', lesson.id);

      if (sections) {
        for (const section of sections) {
          // Delete section content
          await supabase
            .from('section_content')
            .delete()
            .eq('section_id', section.id);
        }

        // Delete sections
        await supabase
          .from('lesson_sections')
          .delete()
          .eq('lesson_id', lesson.id);
      }

      // Get quiz
      const { data: quizzes } = await supabase
        .from('quizzes')
        .select('id')
        .eq('lesson_id', lesson.id);

      if (quizzes) {
        for (const quiz of quizzes) {
          // Get questions
          const { data: questions } = await supabase
            .from('quiz_questions')
            .select('id')
            .eq('quiz_id', quiz.id);

          if (questions) {
            for (const question of questions) {
              // Delete options
              await supabase
                .from('quiz_options')
                .delete()
                .eq('question_id', question.id);
            }

            // Delete questions
            await supabase
              .from('quiz_questions')
              .delete()
              .eq('quiz_id', quiz.id);
          }

          // Delete quiz
          await supabase
            .from('quizzes')
            .delete()
            .eq('id', quiz.id);
        }
      }

      // Finally delete lesson metadata
      await supabase
        .from('lesson_metadata')
        .delete()
        .eq('id', lesson.id);

      console.log(`✓ Deleted lesson ${lesson.lesson_key}`);
    }
  } else {
    console.log('✓ No existing lessons 2.3 or 2.4 found - ready for fresh insert');
  }

  console.log('\n' + '='.repeat(60));
  console.log('Database is ready for clean lesson insertion');
  console.log('='.repeat(60));
}

checkAndCleanLessons();
