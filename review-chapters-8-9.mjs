import { createClient } from '@supabase/supabase-js';

const supabase = createClient(
  'https://rabavobdklnwvwsldbix.supabase.co',
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InJhYmF2b2Jka2xud3Z3c2xkYml4Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTk3NjU0NzgsImV4cCI6MjA3NTM0MTQ3OH0.z_1N3TG-cS9Bc1s7UAif91PkIjhBKvicrUqupiNP80Y'
);

async function reviewChapters() {
  // Check Chapter 8
  const { data: ch8, error: err8 } = await supabase
    .from('lessons')
    .select('lesson_key, title, content, topic_number')
    .eq('lesson_key', 'misc-topics')
    .single();

  if (err8) {
    console.error('Error fetching Chapter 8:', err8);
  } else {
    console.log('=== CHAPTER 8 (misc-topics) ===');
    console.log('Title:', ch8.title);
    console.log('Topic Number:', ch8.topic_number);
    console.log('Content length:', ch8.content ? ch8.content.length : 'NULL');

    if (ch8.content) {
      // Check if it contains the new content
      const hasAffectVsEffect = ch8.content.includes('Commonly Confused Words');
      const hasThanVsThen = ch8.content.includes('Than vs. Then');
      const hasHaveVsOf = ch8.content.includes('Have vs. Of');
      const hasCountable = ch8.content.includes('Countable vs. Non-countable');
      const hasActivePassive = ch8.content.includes('Active Voice vs. Passive Voice');
      const hasIdioms = ch8.content.includes('Prepositional Idioms');

      console.log('\n✓ New Chapter 8 Sections Found:');
      console.log('  - Commonly Confused Words:', hasAffectVsEffect ? '✓' : '✗');
      console.log('  - Than vs. Then:', hasThanVsThen ? '✓' : '✗');
      console.log('  - Have vs. Of:', hasHaveVsOf ? '✓' : '✗');
      console.log('  - Countable vs. Non-countable:', hasCountable ? '✓' : '✗');
      console.log('  - Active Voice vs. Passive Voice:', hasActivePassive ? '✓' : '✗');
      console.log('  - Prepositional Idioms:', hasIdioms ? '✓' : '✗');

      // Check for old content
      const hasOldContent = ch8.content.includes('Grammar Essentials');
      console.log('\n✗ Old content still present:', hasOldContent ? 'YES - PROBLEM!' : 'No - Good!');

      console.log('\nFirst 300 characters of content:');
      console.log(ch8.content.substring(0, 300));
    }
  }

  // Check Chapter 9
  const { data: ch9, error: err9 } = await supabase
    .from('lessons')
    .select('lesson_key, title, content, topic_number')
    .eq('lesson_key', 'grammar-review')
    .single();

  if (err9) {
    console.error('\nError fetching Chapter 9:', err9);
  } else {
    console.log('\n\n=== CHAPTER 9 (grammar-review) ===');
    console.log('Title:', ch9.title);
    console.log('Topic Number:', ch9.topic_number);
    console.log('Content length:', ch9.content ? ch9.content.length : 'NULL');

    if (ch9.content) {
      const hasCompleteGrammar = ch9.content.includes('Complete Grammar Error Checklist');
      const hasSystematic = ch9.content.includes('Systematic Error Recognition');
      const hasTimeManagement = ch9.content.includes('Time Management and Pacing');
      const hasTestDay = ch9.content.includes('Test Day Strategies');

      console.log('\n✓ Chapter 9 Sections Found:');
      console.log('  - Complete Grammar Error Checklist:', hasCompleteGrammar ? '✓' : '✗');
      console.log('  - Systematic Error Recognition:', hasSystematic ? '✓' : '✗');
      console.log('  - Time Management and Pacing:', hasTimeManagement ? '✓' : '✗');
      console.log('  - Test Day Strategies:', hasTestDay ? '✓' : '✗');

      console.log('\nFirst 300 characters of content:');
      console.log(ch9.content.substring(0, 300));
    }
  }

  // Check examples for Chapter 8
  const { data: examples, error: exErr } = await supabase
    .from('lesson_examples')
    .select('id, title, problem_text, correct_answer')
    .eq('lesson_id', ch8.id);

  if (exErr) {
    console.error('\nError fetching examples:', exErr);
  } else {
    console.log('\n\n=== CHAPTER 8 EXAMPLES ===');
    console.log('Total examples:', examples ? examples.length : 0);
    if (examples && examples.length > 0) {
      examples.forEach((ex, idx) => {
        console.log(`\n${idx + 1}. ${ex.title}`);
        console.log(`   Problem: ${ex.problem_text.substring(0, 100)}...`);
        console.log(`   Correct: ${ex.correct_answer}`);
      });
    }
  }
}

reviewChapters();
