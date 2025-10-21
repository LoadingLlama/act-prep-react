import { createClient } from '@supabase/supabase-js';

const supabase = createClient(
  'https://ckpnqiilogfmodwhoyqo.supabase.co',
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImNrcG5xaWlsb2dmbW9kd2hveXFvIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MzU2ODM4MjAsImV4cCI6MjA1MTI1OTgyMH0.CvbxOl7MgzAa2rv3fkD4MU_UnXHtFZr3XxqZNXjLSKU'
);

async function findLessonKeys() {
  const { data, error } = await supabase
    .from('lessons')
    .select('id, lesson_key, subject, topic_number')
    .eq('subject', 'english')
    .order('id');

  if (error) {
    console.error('Error:', error);
    process.exit(1);
  }

  console.log('English lessons:');
  data.forEach(lesson => {
    console.log(`ID: ${lesson.id}, Key: ${lesson.lesson_key}, Topic: ${lesson.topic_number}`);
  });
}

findLessonKeys();
