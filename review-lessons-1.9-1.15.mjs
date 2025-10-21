import { createClient } from '@supabase/supabase-js';

const supabase = createClient(
  'https://rabavobdklnwvwsldbix.supabase.co',
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InJhYmF2b2Jka2xud3Z3c2xkYml4Iiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc1OTc2NTQ3OCwiZXhwIjoyMDc1MzQxNDc4fQ.81SeH703keXgF3IevQlRS7OYmn1J2GUVIkn3OJiviM4'
);

async function reviewLessons() {
  const lessons = [
    { key: 'grammar-review', num: '1.9', expectedSections: ['Complete Grammar Error Checklist', 'Systematic Error Recognition', 'Time Management', 'Test Day Strategies'] },
    { key: 'redundancy', num: '1.10', expectedSections: ['Redundancy', 'Wordiness', 'Irrelevance', 'How to Spot'] },
    { key: 'word-choice', num: '1.11', expectedSections: ['Identifying Word Choice', 'How to Approach', 'Vocabulary Strategy', 'Common Word Choice Patterns'] },
    { key: 'transitions', num: '1.12', expectedSections: ['How to Approach', 'Type 1: All Four Choices', 'Type 2: Three Transitions', 'Common Transition Categories'] },
    { key: 'which-choice', num: '1.13', expectedSections: [] },
    { key: 'adding-deleting', num: '1.14', expectedSections: [] },
    { key: 'logical-placement', num: '1.15', expectedSections: [] }
  ];

  for (const lesson of lessons) {
    console.log(`\n========== TOPIC ${lesson.num} (${lesson.key}) ==========`);

    const { data, error } = await supabase
      .from('lessons')
      .select('title, content, content_json, migrated_to_json')
      .eq('lesson_key', lesson.key)
      .single();

    if (error) {
      console.error(`❌ Error fetching ${lesson.key}:`, error);
      continue;
    }

    console.log(`Title: ${data.title}`);
    console.log(`Content length: ${data.content ? data.content.length : 'NULL'}`);
    console.log(`Content_json: ${data.content_json === null ? 'NULL ✓' : 'HAS VALUE ❌'}`);
    console.log(`Migrated_to_json: ${data.migrated_to_json === false ? 'false ✓' : data.migrated_to_json + ' ❌'}`);

    if (data.content) {
      console.log('\nChecking for expected sections:');
      for (const section of lesson.expectedSections) {
        const hasSection = data.content.includes(section);
        console.log(`  ${hasSection ? '✓' : '❌'} ${section}`);
      }

      // Check for new content markers
      const hasOldContent = data.content.includes('<html><head></head><body>');
      console.log(`\nOld HTML wrapper present: ${hasOldContent ? 'YES ❌' : 'NO ✓'}`);

      const hasNewTemplate = data.content.includes('LESSON TEMPLATE');
      console.log(`New template comment: ${hasNewTemplate ? 'YES ✓' : 'NO ❌'}`);

      console.log('\nFirst 200 chars:');
      console.log(data.content.substring(0, 200));
    }

    // Check examples count
    const { data: examples, error: exErr } = await supabase
      .from('lesson_examples')
      .select('id, title')
      .eq('lesson_id', data.id);

    if (!exErr) {
      console.log(`\nExamples: ${examples ? examples.length : 0}`);
      if (examples && examples.length > 0) {
        examples.forEach((ex, i) => console.log(`  ${i+1}. ${ex.title}`));
      }
    }
  }
}

reviewLessons();
