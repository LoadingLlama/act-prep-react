import { supabaseUrl, supabaseServiceKey } from './config.mjs';
import { createClient } from '@supabase/supabase-js';

const supabase = createClient(supabaseUrl, supabaseServiceKey);

async function checkLessonFormat(lessonKey) {
  const { data: lesson } = await supabase
    .from('lesson_metadata')
    .select('id, title, subject')
    .eq('lesson_key', lessonKey)
    .single();

  if (!lesson) {
    console.log('Lesson not found');
    return;
  }

  const { data: sections } = await supabase
    .from('lesson_sections')
    .select('id')
    .eq('lesson_id', lesson.id);

  if (!sections || sections.length === 0) {
    console.log('No sections');
    return;
  }

  const { data: content } = await supabase
    .from('section_content')
    .select('content')
    .eq('section_id', sections[0].id)
    .limit(1);

  if (!content || content.length === 0) {
    console.log('No content');
    return;
  }

  const html = content[0].content;

  console.log(`\n${lessonKey}: "${lesson.title}" (${lesson.subject})`);
  console.log('='.repeat(70));
  console.log(`Content length: ${html.length} chars\n`);

  // Check Golden Template compliance
  const checks = {
    'Opening paragraph': html.includes('<p style="font-size: 16px'),
    'Bold terms with styling': html.includes('color: #2563eb; font-weight: 600; text-decoration: underline'),
    'H3 sections': (html.match(/<h3/g) || []).length,
    'H4 subsections': (html.match(/<h4/g) || []).length,
    'Key Takeaways': html.includes('Key Takeaways') || html.includes('key takeaways'),
    'Green checkmarks': html.includes('#2e7d32') || html.includes('#4caf50'),
  };

  console.log('Golden Template Compliance:');
  Object.entries(checks).forEach(([check, result]) => {
    const icon = typeof result === 'boolean' ? (result ? '✅' : '❌') : '📊';
    const display = typeof result === 'number' ? `${result} found` : (result ? 'YES' : 'NO');
    console.log(`  ${icon} ${check}: ${display}`);
  });

  // Show first 500 chars
  console.log('\nFirst 500 characters:');
  console.log(html.substring(0, 500));
  console.log('...\n');
}

const lessonKey = process.argv[2] || 'sentence-structure';
checkLessonFormat(lessonKey).catch(err => {
  console.error('Failed:', err);
  process.exit(1);
});
