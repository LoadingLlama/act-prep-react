const { createClient } = require('@supabase/supabase-js');
require('dotenv').config();

const supabaseUrl = process.env.REACT_APP_SUPABASE_URL;
const supabaseKey = process.env.REACT_APP_SUPABASE_ANON_KEY;
const supabase = createClient(supabaseUrl, supabaseKey);

async function getEnglishQuestions() {
  try {
    // Get lessons that are English-related
    const { data: lessons, error: lessonError } = await supabase
      .from('lessons')
      .select('id, title, section')
      .eq('section', 'english');

    if (lessonError) {
      console.error('Error fetching lessons:', lessonError);
      return;
    }

    const englishLessonIds = lessons.map(l => l.id);
    console.log(`Found ${englishLessonIds.length} English lessons`);

    // Get all examples for English lessons
    const { data, error } = await supabase
      .from('lesson_examples')
      .select('*')
      .in('lesson_id', englishLessonIds)
      .order('position', { ascending: true });

    if (error) {
      console.error('Error:', error);
      return;
    }

    console.log(`\nFound ${data.length} English practice questions\n`);
    console.log('='.repeat(80));

    data.forEach((q, index) => {
      console.log(`\n[${index + 1}] ID: ${q.id}`);
      console.log(`Title: ${q.title}`);
      console.log(`Problem: ${q.problem_text?.substring(0, 300)}...`);
      console.log(`\nChoices:`);
      q.choices?.forEach((c) => {
        const marker = c.letter === q.correct_answer ? '✓' : ' ';
        console.log(`  [${marker}] ${c.letter}: ${c.text}`);
      });
      console.log(`\nCorrect Answer: ${q.correct_answer}`);
      console.log('='.repeat(80));
    });

  } catch (err) {
    console.error('Unexpected error:', err);
  }
}

getEnglishQuestions();
