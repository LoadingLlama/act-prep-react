const { createClient } = require('@supabase/supabase-js');
require('dotenv').config();

const supabase = createClient(
  process.env.REACT_APP_SUPABASE_URL,
  process.env.REACT_APP_SUPABASE_ANON_KEY
);

(async () => {
  const lessonId = '749af103-4c42-4b62-9b8b-5448836e8804';

  console.log('Checking lesson:', lessonId);
  console.log('=================================\n');

  // Check the lessons table structure
  const { data: lesson, error: lessonError } = await supabase
    .from('lessons')
    .select('*')
    .eq('id', lessonId)
    .single();

  if (lessonError) {
    console.log('Error fetching lesson:', lessonError);
  } else {
    console.log('Lesson data:');
    console.log('  Title:', lesson.title);
    console.log('  Subject:', lesson.subject);
    console.log('  Has content:', lesson.content ? 'YES' : 'NO');
    console.log('  Has video_url:', lesson.video_url ? 'YES' : 'NO');
    console.log('  Content length:', lesson.content?.length || 0, 'characters');
  }

  process.exit(0);
})();
