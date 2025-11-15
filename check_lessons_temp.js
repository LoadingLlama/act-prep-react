const { createClient } = require('@supabase/supabase-js');

const supabase = createClient(
  process.env.REACT_APP_SUPABASE_URL,
  process.env.REACT_APP_SUPABASE_ANON_KEY
);

(async () => {
  const { data, error } = await supabase
    .from('lessons')
    .select('id, subject, title, order_index, topic_number, topic_title, full_topic_code, duration')
    .order('subject')
    .order('order_index');

  if (error) {
    console.error('Error:', error);
    return;
  }

  console.log('Total lessons:', data.length);
  
  // Group by subject
  const bySubject = {};
  data.forEach(l => {
    const subj = l.subject || 'unknown';
    if (!bySubject[subj]) {
      bySubject[subj] = [];
    }
    bySubject[subj].push(l);
  });
  
  console.log('\nLessons by subject:');
  Object.keys(bySubject).sort().forEach(subj => {
    console.log('\n' + subj.toUpperCase() + ': ' + bySubject[subj].length + ' lessons');
    bySubject[subj].slice(0, 5).forEach((l, i) => {
      const topicNum = l.topic_number || '?';
      const title = l.title.substring(0, 60);
      console.log('  ' + (i+1) + '. [' + topicNum + '] ' + title);
    });
  });
  
  // Look for intro lesson
  console.log('\n\nSearching for intro lesson...');
  const introLesson = data.find(l => 
    l.title.toLowerCase().includes('intro') || 
    l.title.toLowerCase().includes('introduction to act') ||
    l.title.toLowerCase().includes('getting started')
  );
  
  if (introLesson) {
    console.log('✅ Found intro lesson:', {
      id: introLesson.id,
      subject: introLesson.subject,
      title: introLesson.title,
      topic_number: introLesson.topic_number
    });
  } else {
    console.log('⚠️  No intro lesson found');
  }
})();
